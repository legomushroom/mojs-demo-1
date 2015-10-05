# mojs = require './vendor/mo.js'

class FirstBall
  constructor:(@o={})-> @vars(); return @create()
  vars:->
    @S        = @o.S
    @path     = document.querySelector '#js-curve-4'
    @pathMask = document.querySelector '#js-curve-4-mask'
    # @n1       = document.querySelector '#js-n-1'
    # @n2       = document.querySelector '#js-n-2'
    @line1    = document.querySelector '#js-t-line-1'
    @line2    = document.querySelector '#js-t-line-2'
    @line3    = document.querySelector '#js-t-line-3'
    @easing = @o.generateBezier(0.220, 0.665, 0.825, 0.430)

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
      delay:            @o.BALL_5_START*@S
      duration:         @o.BALL_5_ARCDUR*@S
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
      delay:            (@o.BALL_5_START+(@o.BALL_5_ARCDUR/1.25))*@S
      duration:         @o.TRAIL_FADE*@S
      isRunLess:        @o.IS_RUNLESS

    mp = new mojs.MotionPath
      path:         @path
      el:           @o.mainBall.el
      isRunLess:    @o.IS_RUNLESS
      delay:        @o.BALL_5_START*@S
      duration:     @o.BALL_5_ARCDUR*@S
      easing:       @easing
      isAngle:      true
      angleOffset:  90

    burst = new mojs.Burst
      parent: @o.ctx
      x: 89, y: @o.bottomLineBurst
      degree:       180
      angle:        90
      radius:       { 10: 25 }
      type:         'line'
      fill:         'none'
      stroke:       @o.PINK
      strokeWidth:  @o.STROKE_WIDTH
      delay:        (@o.BALL_5_START+@o.BALL_5_ARCDUR)*@S
      isRunLess:    @o.IS_RUNLESS
      childOptions: radius: { 7: 0 }
    
    tDuration = 1000; tDelay = @o.BALL_5_START+200
    t1Stagger = new @o.TransitStagger
      bit:              Array.prototype.slice.call @line1.children, 0
      quantifier:       'bit'
      duration:         tDuration*@S
      isRunLess:        @o.IS_RUNLESS
      isShowEnd:        true
      delay:            "stagger(#{(tDelay)*@S}, 200)"
      easing:           @o.STAGGER_EASING
      stroke:           @o.STAGGER_COLORS
      strokeDasharray:  '100%'
      strokeDashoffset: '100%': 0

    t2Stagger = new @o.TransitStagger
      bit:              Array.prototype.slice.call @line2.children, 0
      quantifier:       'bit'
      duration:         tDuration*@S
      isRunLess:        @o.IS_RUNLESS
      isShowEnd:        true
      delay:            "stagger(#{(tDelay+100)*@S}, 200)"
      easing:           @o.STAGGER_EASING
      stroke:           @o.STAGGER_COLORS
      strokeDasharray:  '100%'
      strokeDashoffset: '100%': 0

    t3Stagger = new @o.TransitStagger
      bit:              Array.prototype.slice.call @line3.children, 0
      quantifier:       'bit'
      duration:         tDuration*@S
      isRunLess:        @o.IS_RUNLESS
      isShowEnd:        true
      delay:            "stagger(#{(tDelay+100)*@S}, 200)"
      easing:           @o.STAGGER_EASING
      stroke:           @o.STAGGER_COLORS
      strokeDasharray:  '100%'
      strokeDashoffset: '100%': '200%'

    oTopEl = document.querySelector '#js-circles-right-top'
    oTopStagger = new @o.TransitStagger
      bit:              Array.prototype.slice.call oTopEl.children, 0
      quantifier:       'bit'
      duration:         300*@S
      isRunLess:        @o.IS_RUNLESS
      isShowEnd:        true
      delay:            "stagger(#{(tDelay+tDuration/2)*@S}, 200)"
      easing:           @o.STAGGER_EASING
      fill:             'none'
      stroke:           @o.STAGGER_COLORS
      strokeWidth:      1.3
      strokeDasharray:  '100%'
      strokeDashoffset: '100%': '200%'

    oBottomEl = document.querySelector '#js-circles-right-bottom'
    oBottomStagger = new @o.TransitStagger
      bit:              Array.prototype.slice.call oBottomEl.children, 0
      quantifier:       'bit'
      duration:         300*@S
      isRunLess:        @o.IS_RUNLESS
      isShowEnd:        true
      delay:            "stagger(#{(tDelay+tDuration/2)*@S}, 200)"
      easing:           @o.STAGGER_EASING
      fill:             'none'
      stroke:           @o.STAGGER_COLORS
      strokeWidth:      1.3
      strokeDasharray:  '100%'
      strokeDashoffset: '100%': '0%'

    [
      burst, mp, trail, trailFade,
      t1Stagger, t2Stagger, t3Stagger, oTopStagger, oBottomStagger
    ]


module.exports = FirstBall