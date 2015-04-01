# mojs = require './vendor/mo.js'

class FirstBall
  constructor:(@o={})-> @vars(); return @create()
  vars:->
    @S            =   @o.S
    @FALL_EASING  =   'cubic.in'
    @RISE_EASING  =   'cubic.out'

  create:->
    radiusDeltaX = {}; radiusDeltaY = {}
    radiusDeltaX[@o.CIRCLE_RADIUS/2] = 2*@o.CIRCLE_RADIUS
    radiusDeltaY[1.5*@o.CIRCLE_RADIUS] = @o.CIRCLE_RADIUS/2
    yDelta = {}; yDelta[0] = @o.CIRCLE_RADIUS

    ballStart = -40
    trail1 = new mojs.Transit
      x: @o.o2Left,     y: ballStart
      parent:           @o.ctx
      angle:            90
      delay:            @o.BALL_1_START*@S
      duration:         600*@S
      isRunLess:        @o.IS_RUNLESS
      isShowInit:       true
      isShowEnd:        true
      strokeDasharray:  @o.TRAIL_DASH
      easing:           @FALL_EASING
      strokeWidth:      1
      opacity:          @o.TRAIL_OPACITY
      stroke:           @o.TRAIL_COLOR
      radius:           {0: 135}
      shiftY:           {0: 135}
    .then
      opacity:          0
      duration:         @o.TRAIL_FADE*@S
      delay:            0
      radius:           135
      shiftY:           135

    trail2 = new mojs.Transit
      x: @o.o2Left, y: @o.bottomLine - 92
      parent:           @o.ctx
      delay:            (@o.BALL_1_START+700)*@S
      duration:         400*@S
      isRunLess:        @o.IS_RUNLESS
      isShowInit:       true
      isShowEnd:        true
      strokeDasharray:  @o.TRAIL_DASH
      easing:           @RISE_EASING
      strokeWidth:      1
      opacity:          @o.TRAIL_OPACITY
      stroke:           @o.TRAIL_COLOR
      radius:           {0: 85}
      shiftY:           {85: 0}
      angle:            270
    .then
      opacity: 0
      duration: @o.TRAIL_FADE*@S
      delay:  0
      radius: 85
      shiftY: 0

    trail3 = new mojs.Transit
      x: @o.o2Left, y: @o.topLine
      parent:           @o.ctx
      delay:            (@o.BALL_1_START+1150)*@S
      duration:         375*@S
      isRunLess:        @o.IS_RUNLESS
      isShowInit:       true
      isShowEnd:        true
      strokeDasharray:  @o.TRAIL_DASH
      easing:           @FALL_EASING
      strokeWidth:      1
      opacity:          @o.TRAIL_OPACITY
      stroke:           @o.TRAIL_COLOR
      radius:           {0: 85}
      shiftY:           {0: 85}
      angle:            90
    .then
      opacity:  0
      duration: @o.TRAIL_FADE*@S
      delay:    0
      radius:   85
      shiftY:   85

    gooDur = 50
    ball = new mojs.Transit
      parent:       @o.ctx
      type:         'circle'
      stroke:       'white'
      strokeWidth:  @STROKE_WIDTH
      fill:         'transparent'
      radiusX:      radiusDeltaX
      radiusY:      radiusDeltaY
      isShowInit:   true
      isShowEnd:    true
      isRunLess:    @o.IS_RUNLESS
      delay:        (@o.BALL_1_START + 600)*@S
      y:            yDelta
      duration:     gooDur*@S
    .then
      y:            0
      radiusX:      @o.CIRCLE_RADIUS/2
      radiusY:      1.5*@o.CIRCLE_RADIUS
      duration:     100*@S
      delay:        0
    .then
      radiusX:      @o.CIRCLE_RADIUS
      radiusY:      @o.CIRCLE_RADIUS
      duration:     150*@S
      delay:        0
    # fall 2
    .then
      radiusX:      @o.CIRCLE_RADIUS/2
      radiusY:      1.5*@o.CIRCLE_RADIUS
      duration:     150*@S
      delay:        400*@S
    .then
      y:            @o.CIRCLE_RADIUS
      radiusX:      1.5*@o.CIRCLE_RADIUS
      radiusY:      @o.CIRCLE_RADIUS/2
      duration:     gooDur*@S
      delay:        50*@S
    # ball 2 start: jump
    .then
      y:            0
      radiusX:      @o.CIRCLE_RADIUS/2
      radiusY:      1.5*@o.CIRCLE_RADIUS
      duration:     150*@S
      delay:        0*@S
    .then
      y:            @o.CIRCLE_RADIUS
      radiusX:      1.5*@o.CIRCLE_RADIUS
      radiusY:      @o.CIRCLE_RADIUS/2
      duration:     gooDur*@S
      delay:        (@o.BALL_2_ARCDUR-2*gooDur)*@S
    # # ball 3
    .then
      y:            0
      radiusX:      @o.CIRCLE_RADIUS/2
      radiusY:      1.5*@o.CIRCLE_RADIUS
      duration:     150*@S
      delay:        0
    .then
      y:            @o.CIRCLE_RADIUS
      radiusX:      1.5*@o.CIRCLE_RADIUS
      radiusY:      @o.CIRCLE_RADIUS/2
      duration:     gooDur*@S
      delay:        (@o.BALL_3_ARCDUR-2*gooDur)*@S
    # ball 4
    .then
      y:            0
      radiusX:      @o.CIRCLE_RADIUS/2
      radiusY:      1.5*@o.CIRCLE_RADIUS
      duration:     150*@S
      delay:        0*@S
    .then
      y:            @o.CIRCLE_RADIUS
      radiusX:      1.5*@o.CIRCLE_RADIUS
      radiusY:      @o.CIRCLE_RADIUS/2
      duration:     gooDur*@S
      delay:        (@o.BALL_4_ARCDUR-2*gooDur)*@S
    # ball 5
    .then
      y:            0
      radiusX:      @o.CIRCLE_RADIUS/2
      radiusY:      1.5*@o.CIRCLE_RADIUS
      duration:     150*@S
      delay:        0*@S
    .then
      y:            @o.CIRCLE_RADIUS
      radiusX:      1.5*@o.CIRCLE_RADIUS
      radiusY:      @o.CIRCLE_RADIUS/2
      duration:     gooDur*@S
      delay:        (@o.BALL_5_ARCDUR-2*gooDur)*@S
    # ball 6
    .then
      y:            0
      radiusX:      @o.CIRCLE_RADIUS/2
      radiusY:      1.5*@o.CIRCLE_RADIUS
      duration:     150*@S
      delay:        0*@S
    .then
      y:            @o.CIRCLE_RADIUS
      radiusX:      1.5*@o.CIRCLE_RADIUS
      radiusY:      @o.CIRCLE_RADIUS/2
      duration:     gooDur*@S
      delay:        (@o.BALL_6_ARCDUR-2*gooDur)*@S
    # ball 7
    .then
      y:            0
      radiusX:      @o.CIRCLE_RADIUS/2
      radiusY:      1.5*@o.CIRCLE_RADIUS
      duration:     (@o.BALL_7_ARCDUR/3)*@S
      delay:        0
    .then
      radiusX:      @o.CIRCLE_RADIUS
      radiusY:      @o.CIRCLE_RADIUS
      duration:     (3*@o.BALL_7_ARCDUR)*@S
      delay:        0
      easing:       'elastic.out'
    
    ball.el.style.opacity = 0
    mp = new mojs.MotionPath
      path:       "M#{@o.o2Left},#{ballStart} L#{@o.o2Left},
                   #{@o.bottomLine-@o.CIRCLE_RADIUS}"
      el:         ball.el
      duration:   600*@S
      easing:     @FALL_EASING
      delay:      @o.BALL_1_START*@S
      isRunLess:  @o.IS_RUNLESS
      onUpdate:(p)-> ball.el.style.opacity = 5*p
    .then
      isReverse:  true
      pathStart:  .35
      easing:     @RISE_EASING
      delay:      (@o.DOWN_DUR+gooDur)*@S
      duration:   400*@S
    .then
      isReverse:  false
      easing:     @FALL_EASING
      delay:      0

    burst1 = new mojs.Burst
      parent: @o.ctx
      x: @o.o2Left, y: @o.bottomLineBurst
      degree: 180
      angle:  90
      radius: { 10: 25 }
      type: 'line'
      stroke: @o.YELLOW
      strokeWidth: @o.STROKE_WIDTH
      delay: (@o.BALL_1_START+600)*@S
      isRunLess: @o.IS_RUNLESS
      childOptions: radius: { 7: 0 }
      onStart:=> @o.playSound @o.bells1

    circle = new mojs.Transit
      parent:           @o.ctx
      x: @o.o2Left,     y: 55
      type:             'circle'
      radius:           3*@o.CIRCLE_RADIUS
      fill:             'transparent'
      strokeWidth:      @o.STROKE_WIDTH
      stroke:           @o.PINK
      strokeDasharray:  '100% 200%'
      strokeDashoffset: {'100%': '50%'}
      angle:            180
      delay:            (@o.BALL_1_START+700)*@S
      duration:         300*@S
      isRunLess:        @o.IS_RUNLESS
    .then
      strokeDashoffset: '100%'
      angle:            360
      delay:            0

    burst2 = new mojs.Burst
      parent: @o.ctx
      x: @o.o2Left, y: @o.bottomLineBurst
      degree: 180
      angle:  90
      radius: { 10: 25 }
      type: 'line'
      stroke: @o.CYAN
      strokeWidth: @o.STROKE_WIDTH
      delay: (@o.BALL_1_START+@o.BALL_1_ARCDUR-gooDur)*@S
      isRunLess: @o.IS_RUNLESS
      childOptions: radius: { 7: 0 }

    burst3 = new mojs.Burst
      parent:       @o.ctx
      x: @o.o2Left+30, y: @o.bottomLineBurst+15
      angle:        90
      radius:       { 4: 20 }
      type:         'line'
      count:        4
      degree:       360
      stroke:       @o.PINK
      strokeWidth:  @o.STROKE_WIDTH
      delay:        (@o.BALL_2_START+1200)*@S
      isRunLess:    @o.IS_RUNLESS
      # childOptions: radius: { 5: 0 }

    retrunValue =
      tweens: [
        burst1.tween, burst2.tween, burst3.tween,
        mp.tween,
        ball.tween, circle.tween,
        trail1.tween, trail2.tween, trail3.tween
      ]
      ball: ball


module.exports = FirstBall