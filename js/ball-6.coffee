mojs = require './vendor/mo.js'

class FirstBall
  constructor:(@o={})-> @vars(); return @create()
  vars:->
    @S        = @o.S
    @path     = document.querySelector '#js-curve-5'
    @pathMask = document.querySelector '#js-curve-5-mask'
    @line1    = document.querySelector '#js-m-line-1'
    @line2    = document.querySelector '#js-m-line-2'
    @easing = @o.generateBezier(0.435, 0.715, 0.635, 0.395)

  create:->
    trail = new mojs.Transit
      bit:              @pathMask
      fill:             'transparent'
      strokeDasharray:  '100%'
      strokeDashoffset: '200%': '100%'
      strokeWidth:      2
      stroke:           @o.BG
      isShowInit:       true
      isShowEnd:        true
      delay:            @o.BALL_6_START*@S
      duration:         @o.BALL_6_ARCDUR*@S
      easing:           @easing

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
      delay:            (@o.BALL_6_START+(@o.BALL_6_ARCDUR/1.25))*@S
      duration:         @o.TRAIL_FADE*@S

    mp = new mojs.MotionPath
      path:         @path
      el:           @o.mainBall.el
      isRunLess:    @o.IS_RUNLESS
      delay:        @o.BALL_6_START*@S
      duration:     @o.BALL_6_ARCDUR*@S
      easing:       @easing
      isAngle:      true
      angleOffset:  90

    burst = new mojs.Burst
      parent: @o.ctx
      x: 240, y: @o.bottomLineBurst
      degree:       180
      angle:        90
      radius:       { 10: 25 }
      type:         'line'
      fill:         'none'
      stroke:       @o.PINK
      strokeWidth:  @o.STROKE_WIDTH
      delay:        (@o.BALL_6_START+@o.BALL_6_ARCDUR)*@S
      isRunLess:    @o.IS_RUNLESS
      childOptions: radius: { 7: 0 }

    
    mDuration = 1000; mDelay = @o.BALL_6_START+200
    n1Stagger = new mojs.Stagger
      els:              @line1
      duration:         mDuration*@S
      isRunLess:        @o.IS_RUNLESS
      isShowEnd:        true
      delay:            "stagger(#{(mDelay)*@S}, 200)"
      easing:           @o.STAGGER_EASING
      stroke:           @o.STAGGER_COLORS
      strokeDasharray:  '100%'
      strokeDashoffset: '100%': '200%'

    shift = 15
    n2Stagger = new mojs.Stagger
      els:              @line2
      duration:         mDuration*@S
      isRunLess:        @o.IS_RUNLESS
      isShowEnd:        true
      delay:            "stagger(#{(mDelay)*@S}, 200)"
      easing:           @o.STAGGER_EASING
      stroke:           @o.STAGGER_COLORS
      strokeDasharray:  '100%'
      strokeDashoffset: '100%': '200%'
      onUpdate: [((p)=>
        @line1.setAttribute 'transform', "translate(#{shift*p})"
        @line2.setAttribute 'transform', "translate(#{-shift*p})"
        ), null, null]

    [
      burst.tween, n1Stagger.tween, n2Stagger.tween,
      mp.tween, trail.tween, trailFade.tween
    ]


module.exports = FirstBall