# mojs = require './vendor/mo.js'

class FirstBall
  constructor:(@o={})-> @vars(); return @create()
  vars:->
    @S        = @o.S
    @path     = document.querySelector '#js-curve-2'
    @pathMask = document.querySelector '#js-curve-2-mask'
    @o1Line1   = document.querySelector '#js-o1-line-1'
    @o1Line2   = document.querySelector '#js-o1-line-2'
    @o1circle  = document.querySelector '#js-o1-circle'
    @easing = @o.generateBezier(0.435, 0.715, 0.635, 0.395)
    # @easing = @o.generateBezier(0.435, 0.715, 0.795, 0.570)

  create:->
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
      delay:            (@o.BALL_3_START+(@o.BALL_3_ARCDUR/1.25))*@S
      duration:         @o.TRAIL_FADE*@S
      isRunLess:        @o.IS_RUNLESS

    trail = new mojs.Transit
      bit:              @pathMask
      fill:             'transparent'
      strokeDasharray:  '100%'
      strokeDashoffset: '200%': '100%'
      strokeWidth:      4*@o.TRAIL_WIDTH
      stroke:           @o.BG
      isShowInit:       true
      isShowEnd:        true
      delay:            @o.BALL_3_START*@S
      duration:         @o.BALL_3_ARCDUR*@S
      easing:           @easing
      isRunLess:        @o.IS_RUNLESS
      strokeLinecap:    'round'

    mp = new mojs.MotionPath
      path:         @path
      el:           @o.mainBall.el
      isRunLess:    @o.IS_RUNLESS
      delay:        @o.BALL_3_START*@S
      duration:     @o.BALL_3_ARCDUR*@S
      easing:       @easing
      isAngle:      true
      angleOffset:  90

    burst = new mojs.Burst
      parent: @o.ctx
      x: 358, y: @o.bottomLineBurst
      degree:       180
      angle:        90
      radius:       { 10: 25 }
      type:         'line'
      fill:         'none'
      stroke:       @o.YELLOW
      strokeWidth:  @o.STROKE_WIDTH
      delay:        (@o.BALL_3_START+@o.BALL_3_ARCDUR)*@S
      isRunLess:    @o.IS_RUNLESS
      childOptions: radius: { 7: 0 }

    burst2 = new mojs.Transit
      parent: @o.ctx
      x: 125,       y: @o.CHARS_TOP
      angle:        90
      radius:       { 5: 6 }
      fill:         'transparent'
      type:         'circle'
      stroke:       @o.CYAN
      strokeWidth:  @o.STROKE_WIDTH
      delay:        (@o.BALL_3_START+400)*@S
      duration:     300*@S
      isRunLess:    @o.IS_RUNLESS

    burst3 = new mojs.Transit
      parent: @o.ctx
      x: 125,       y: @o.bottomLineBurst + 20
      angle:        90
      radius:       { 5: 6 }
      fill:         'transparent'
      type:         'rect'
      stroke:       @o.ORANGE
      strokeWidth:  @o.STROKE_WIDTH-.5
      delay:        (@o.BALL_3_START+@o.BALL_3_ARCDUR+400)*@S
      duration:     300*@S
      isRunLess:    @o.IS_RUNLESS

    oLine1Stagger = new mojs.Stagger
      els:              @o1Line1
      duration:         1000*@S
      isRunLess:        @o.IS_RUNLESS
      isShowEnd:        true
      delay:            "stagger(#{(@o.BALL_3_START)*@S}, 200)"
      easing:           'sinusoidal.out'
      stroke:           @o.STAGGER_COLORS
      strokeDasharray:  '100%'
      strokeDashoffset: '100%': 0

    oLine2Stagger = new mojs.Stagger
      els:              @o1Line2
      duration:         1000*@S
      isRunLess:        @o.IS_RUNLESS
      isShowEnd:        true
      delay:            "stagger(#{(@o.BALL_3_START+800)*@S}, 200)"
      easing:           'sinusoidal.out'
      stroke:           @o.STAGGER_COLORS
      strokeDasharray:  '0 100%': '100% 100%'
      strokeDashoffset: '50%': '200%'

    it = @
    translate = "translate(253, 174)"
    oDuration = 1000*@S; oDelay = (@o.BALL_3_START+1200)*@S
    oEasing = 'sinusoidal.out'
    oStagger = new mojs.Stagger
      type:         'circle'
      els:          @o1circle
      # fill:         'deeppink'
      duration:     oDuration
      isRunLess:    @o.IS_RUNLESS
      isShowEnd:    true
      delay:        "stagger(#{oDelay}, 100)"
      easing:       oEasing
      stroke:       @o.STAGGER_COLORS
      radius:       24
      radiusX:      0:24
      strokeDashoffset: 0

    [
      trailFade.tween, oStagger.tween, oLine1Stagger.tween, burst.tween,
      oLine2Stagger.tween, mp.tween, trail.tween, trailFade.tween,
      burst2.tween, burst3.tween
    ]


module.exports = FirstBall