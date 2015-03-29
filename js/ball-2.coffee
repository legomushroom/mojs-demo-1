# mojs = require './vendor/mo.js'

class FirstBall
  constructor:(@o={})-> @vars(); return @create()
  vars:->
    @S        = @o.S
    @path     = document.querySelector '#js-curve-1'
    @pathMask = document.querySelector '#js-curve-1-mask'
    @o2       = document.querySelector '#js-o2'
    @o2Line   = document.querySelector '#js-o2-line'
    @easing = @o.generateBezier(0.240, 0.725, 0.790, 0.395)

  create:->
    @o.BALL_2_ARCDUR = 800
    trail = new mojs.Transit
      bit:              @pathMask
      fill:             'transparent'
      strokeDasharray:  '100%'
      strokeDashoffset: '200%': '100%'
      strokeWidth:      4*@o.TRAIL_WIDTH
      stroke:           @o.BG
      isShowInit:       true
      isShowEnd:        true
      delay:            @o.BALL_2_START*@S
      duration:         @o.BALL_2_ARCDUR*@S
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
      delay:            (@o.BALL_2_START+(@o.BALL_2_ARCDUR/1.25))*@S
      duration:         @o.TRAIL_FADE*@S
      isRunLess:        @o.IS_RUNLESS

    mp = new mojs.MotionPath
      path:       @path
      el:         @o.mainBall.el
      isRunLess:  @o.IS_RUNLESS
      delay:      @o.BALL_2_START*@S
      duration:   @o.BALL_2_ARCDUR*@S
      easing:     @easing
      isAngle:    true
      angleOffset: 90

    burst = new mojs.Burst
      parent: @o.ctx
      x: 155, y: @o.bottomLineBurst
      degree:       180
      angle:        90
      radius:       { 10: 25 }
      type:         'line'
      stroke:       @o.PINK
      strokeWidth:  @o.STROKE_WIDTH
      delay:        (@o.BALL_2_START+@o.BALL_2_ARCDUR)*@S
      isRunLess:    @o.IS_RUNLESS
      childOptions: radius: { 7: 0 }

    burst2 = new mojs.Transit
      parent: @o.ctx
      x: 310,       y: @o.CHARS_TOP-10
      angle:        90
      radius:       { 5: 6 }
      fill:         'transparent'
      type:         'circle'
      stroke:       @o.CYAN
      strokeWidth:  @o.STROKE_WIDTH
      delay:        (@o.BALL_2_START+@o.BALL_2_ARCDUR+3*@o.BALL_3_ARCDUR)*@S
      duration:     300*@S
      isRunLess:    @o.IS_RUNLESS

    oDuration = @o.CHAR_DUR*@S
    oLineStagger = new mojs.Stagger
      els:          @o2Line
      duration:     oDuration
      isRunLess:    @o.IS_RUNLESS
      isShowEnd:    true
      delay:        "stagger(#{(@o.BALL_2_START)*@S}, 200)"
      easing:       'sinusoidal.out'
      stroke:       @o.STAGGER_COLORS
      strokeDasharray:  '0 100%': '100% 100%'
      strokeDashoffset: '50%': '200%'

    it = @
    translate = "translate(253, 174)"
    oDelay = (@o.BALL_2_START+400)*@S
    oEasing = 'sinusoidal.out'
    oStagger = new mojs.Stagger
      els:          @o2
      duration:     oDuration
      isRunLess:    @o.IS_RUNLESS
      isShowEnd:    true
      delay:        "stagger(#{oDelay}, 100)"
      easing:       oEasing
      stroke:       @o.STAGGER_COLORS
    tween = new mojs.Tween
    tween.add new mojs.Timeline
      duration:   oDuration
      delay:      oDelay
      easing:     oEasing
      onUpdate:(p)->
        transform = "#{translate} rotate(#{-135*(1-p)},33,33)"
        it.o2.setAttribute 'transform', transform


    @o.IS_RUNLESS or tween.start()

    [
      mp.tween, burst.tween, oStagger.tween,
      oLineStagger.tween, tween, trail.tween, trailFade.tween
    ]


module.exports = FirstBall