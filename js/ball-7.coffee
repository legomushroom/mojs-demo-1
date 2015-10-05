# mojs = require './vendor/mo.js'

class Ball
  constructor:(@o={})-> @vars(); return @create()
  vars:->
    @S        = @o.S
    @line1    = document.querySelector '#js-i-line-1'
    @line2    = document.querySelector '#js-i-line-2'
    @line3    = document.querySelector '#js-i-line-3'

  create:->
    mp = new mojs.MotionPath
      path:         "M240.529297,234.470827 L240.529297,57"
      el:           @o.mainBall.el
      isRunLess:    @o.IS_RUNLESS
      delay:        @o.BALL_7_START*@S
      # duration:     (@o.BALL_7_ARCDUR)*@S
      easing:       'elastic.out'
      isAngle:      true
      angleOffset:  90
      pathEnd:      .38
      duration:     2800*@S

    iDuration = 800
    iDelay2 = @o.BALL_7_START + 100
    iDuration2 = 250
    iDelay = iDelay2 + iDuration2
    i1Stagger = new @o.TransitStagger
      bit:              Array.prototype.slice.call @line1.children, 0
      quantifier:       'bit'
      duration:         iDuration*@S
      isRunLess:        @o.IS_RUNLESS
      isShowEnd:        true
      delay:            "stagger(#{(iDelay)*@S}, 200)"
      easing:           @o.STAGGER_EASING
      stroke:           @o.STAGGER_COLORS
      strokeDasharray:  '100%'
      strokeDashoffset: '100%': 0

    i2Stagger = new @o.TransitStagger
      bit:              Array.prototype.slice.call @line2.children, 0
      quantifier:       'bit'
      duration:         iDuration*@S
      isRunLess:        @o.IS_RUNLESS
      isShowEnd:        true
      delay:            "stagger(#{(iDelay+100)*@S}, 200)"
      easing:           @o.STAGGER_EASING
      stroke:           @o.STAGGER_COLORS
      strokeDasharray:  '100%'
      strokeDashoffset: '100%': 0

    i3Stagger = new @o.TransitStagger
      bit:              Array.prototype.slice.call @line3.children, 0
      quantifier:       'bit'
      duration:         2400*@S
      isRunLess:        @o.IS_RUNLESS
      isShowEnd:        true
      delay:            "stagger(#{(iDelay2-75)*@S}, 25)"
      easing:           'elastic.out'
      stroke:           @o.STAGGER_COLORS
      strokeDasharray:  '100% 120%'
      strokeDashoffset: '120%': '71.5%'

    els = document.querySelector '#js-circles-left-top'
    oTopStagger = new @o.TransitStagger
      bit:              Array.prototype.slice.call els.children, 0
      quantifier:       'bit'
      duration:         300*@S
      isRunLess:        @o.IS_RUNLESS
      isShowEnd:        true
      delay:            "stagger(#{(iDelay)*@S}, 200)"
      easing:           @o.STAGGER_EASING
      fill:             'transparent'
      stroke:           @o.STAGGER_COLORS
      strokeWidth:      1.3
      strokeDasharray:  '100%'
      strokeDashoffset: '100%': '200%'

    els = document.querySelector '#js-circles-left-bottom'
    oBottomStagger = new @o.TransitStagger
      bit:              Array.prototype.slice.call els.children, 0
      quantifier:       'bit'
      duration:         300*@S
      isRunLess:        @o.IS_RUNLESS
      isShowEnd:        true
      delay:            "stagger(#{(iDelay)*@S}, 200)"
      easing:           @o.STAGGER_EASING
      fill:             'transparent'
      stroke:           @o.STAGGER_COLORS
      strokeWidth:      1.3
      strokeDasharray:  '100%'
      strokeDashoffset: '100%': '0%'

    els = document.querySelector '#js-aurora'
    auroraStagger = new @o.TransitStagger
      bit:              Array.prototype.slice.call els.children, 0
      quantifier:       'bit'
      duration:         300*@S
      isRunLess:        @o.IS_RUNLESS
      isShowEnd:        true
      delay:            "stagger(#{(@o.DELAY_START+3000)*@S}, 200)"
      # easing:           @o.STAGGER_EASING
      easing:           @STAGGER_EASING
      stroke:           [@o.YELLOW, @o.CYAN, @o.PINK]
      strokeWidth:      5:0
      strokeDasharray:  '20 100 40 50'
      strokeDashoffset: 0: '100'

    circle = new mojs.Transit
      parent:           @o.ctx
      x: @o.o2Left-46,  y: 167
      type:             'circle'
      radius:           3*@o.CIRCLE_RADIUS
      fill:             'transparent'
      strokeWidth:      @o.STROKE_WIDTH
      stroke:           @o.CYAN
      strokeDasharray:  '100% 200%'
      strokeDashoffset: {'100%': '50%'}
      angle:            180
      delay:            (@o.BALL_7_START+@o.BALL_7_ARCDUR+iDuration2)*@S
      duration:         300*@S
      isRunLess:        @o.IS_RUNLESS
    .then
      strokeDashoffset: '100%'
      angle:            360
      delay:            0

    [
      mp, i1Stagger, i2Stagger, i3Stagger,
      circle, auroraStagger, oTopStagger,
      oBottomStagger
    ]


module.exports = Ball