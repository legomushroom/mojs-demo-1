# mojs = require './vendor/mo.js'

class FirstBall
  constructor:(@o={})-> @vars(); return @create()
  vars:->
    @S        = @o.S
    @path     = document.querySelector '#js-curve-3'
    @pathMask = document.querySelector '#js-curve-3-mask'
    @n1       = document.querySelector '#js-n-1'
    @n2       = document.querySelector '#js-n-2'
    @easing = @o.generateBezier(0.435, 0.715, 0.635, 0.395)
    # @easing = @o.generateBezier(0.435, 0.715, 0.795, 0.570)

  create:->
    trail = new mojs.Transit
      bit:              @pathMask
      fill:             'transparent'
      strokeDasharray:  '100%'
      strokeDashoffset: '200%': '100%'
      strokeWidth:      4*@o.TRAIL_WIDTH
      stroke:           @o.BG
      isShowInit:       true
      isShowEnd:        true
      delay:            @o.BALL_4_START*@S
      duration:         @o.BALL_4_ARCDUR*@S
      easing:           @easing
      isRunLess:        @o.IS_RUNLESS
      strokeLinecap:    'round'

    opacityDelta = {}; opacityDelta[@o.TRAIL_OPACITY] = 0
    trailFade = new mojs.Transit
      bit:              @path
      fill:             'transparent'
      strokeDasharray:  @o.TRAIL_DASH
      strokeWidth:      @o.TRAIL_WIDTH
      stroke:           @o.TRAIL_COLOR
      opacity:          opacityDelta
      isShowInit:       true
      isShowEnd:        true
      delay:            (@o.BALL_4_START+(@o.BALL_4_ARCDUR/1.25))*@S
      duration:         @o.TRAIL_FADE*@S
      isRunLess:        @o.IS_RUNLESS

    mp = new mojs.MotionPath
      path:         @path
      el:           @o.mainBall.el
      isRunLess:    @o.IS_RUNLESS
      delay:        @o.BALL_4_START*@S
      duration:     @o.BALL_4_ARCDUR*@S
      easing:       @easing
      isAngle:      true
      angleOffset:  90

    burst = new mojs.Burst
      parent: @o.ctx
      x: 209, y: @o.bottomLineBurst
      degree:       180
      angle:        90
      radius:       { 10: 25 }
      type:         'line'
      fill:         'none'
      stroke:       @o.CYAN
      strokeWidth:  @o.STROKE_WIDTH
      delay:        (@o.BALL_4_START+@o.BALL_4_ARCDUR+10)*@S
      isRunLess:    @o.IS_RUNLESS
      childOptions: radius: { 7: 0 }

    burst2 = new mojs.Burst
      parent: @o.ctx
      x: 395,       y: @o.CHARS_TOP
      count:        3
      degree:       220
      angle:        -50
      radius:       { 4: 20 }
      fill:         'transparent'
      type:         'line'
      stroke:       @o.YELLOW
      strokeWidth:  @o.STROKE_WIDTH
      delay:        (@o.BALL_4_START+900)*@S
      duration:     600*@S
      isRunLess:    @o.IS_RUNLESS

    nDuration = @o.CHAR_DUR; nDelay = @o.BALL_4_START+200
    n1Stagger = new mojs.Stagger
      els:              @n1
      duration:         nDuration*@S
      isRunLess:        @o.IS_RUNLESS
      isShowEnd:        true
      delay:            "stagger(#{(nDelay)*@S}, 200)"
      easing:           @o.STAGGER_EASING
      stroke:           @o.STAGGER_COLORS
      strokeDasharray:  '100%'
      # strokeDashoffset: '100%': 0
      strokeDashoffset: '100%': '200%'

    n2Stagger = new mojs.Stagger
      els:              @n2
      duration:         nDuration*@S
      isRunLess:        @o.IS_RUNLESS
      isShowEnd:        true
      delay:            "stagger(#{(nDelay)*@S}, 200)"
      easing:           @o.STAGGER_EASING
      stroke:           @o.STAGGER_COLORS
      strokeDasharray:  '100%'
      strokeDashoffset: '100%': '200%'
    
    tween = new mojs.Tween; shift = 22.5; it = @
    tween.add new mojs.Timeline
      duration:   nDuration*@S
      delay:      nDelay*@S
      easing:     @o.STAGGER_EASING
      onUpdate:(p)->
        # nP = 1 - p
        it.n1.setAttribute 'transform', "translate(#{shift*p})"
        it.n2.setAttribute 'transform', "translate(#{-shift*p})"

    @o.IS_RUNLESS or tween.start()

    [
      tween, n1Stagger.tween, n2Stagger.tween, burst.tween,
      mp.tween, trail.tween, trailFade.tween
    ]


module.exports = FirstBall