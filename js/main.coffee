mojs = require './vendor/mo.js'
mojs.isDebug = false
Ball_1 = require './ball-1'
Ball_2 = require './ball-2'
Ball_3 = require './ball-3'
Ball_4 = require './ball-4'
Ball_5 = require './ball-5'
Ball_6 = require './ball-6'
Ball_7 = require './ball-7'

class Main
  YELLOW:       '#F9DD5E'
  CYAN:         '#11CDC5'
  PINK:         '#FC2D79'
  WHITE:        '#FDFDFD'
  S:            1
  # DELAY_START:  1500
  DELAY_START:  0
  STROKE_WIDTH: 2
  CIRCLE_RADIUS:5
  IS_RUNLESS:   false
  tween:        new mojs.Tween
  constructor:->
    @vars(); @listenSlider()
    @createBits()
  vars:->
    @slider = document.querySelector '#js-slider'
    @ctx    = document.querySelector '#js-svg-canvas'
    @ctxWidth   = 480; @ctxHeight = 400
    @centerX    = @ctxWidth/2; @centerY = @ctxHeight/2
    @o2Left     = 287; @topLine    = 65; @bottomLine = 240
    @bottomLineBurst = @bottomLine + 10
    @CHARS_TOP = @bottomLine - 70
    @DOWN_DUR  = 50
    @BALL_1_START   = @DELAY_START
    @BALL_2_START   = @BALL_1_START + 1800
    @BALL_2_ARCDUR  = 800
    @BALL_3_START   = @BALL_2_START + @BALL_2_ARCDUR + 100
    @BALL_3_ARCDUR  = 900
    @BALL_4_START   = @BALL_3_START + @BALL_3_ARCDUR + 100
    @BALL_4_ARCDUR  = 900
    @BALL_5_START   = @BALL_4_START + @BALL_4_ARCDUR + 100
    @BALL_5_ARCDUR  = 800
    @BALL_6_START   = @BALL_5_START + @BALL_5_ARCDUR + 100
    @BALL_6_ARCDUR  = 800
    @BALL_7_START   = @BALL_6_START + @BALL_6_ARCDUR + 100
    @BALL_7_ARCDUR  = 600

    @STAGGER_COLORS = [ @PINK, @CYAN, @WHITE ]
    @STAGGER_EASING = 'sinusoidal.out'
    @BG = '#333'
    @TRAIL_DASH  = '4 4'
    @TRAIL_WIDTH = 1
    @TRAIL_FADE  = 400
    @TRAIL_COLOR   = 'white'
    @TRAIL_OPACITY = .5
    # for i in [0..32]
    #   @TRAIL_DASH += '4 '
    # @TRAIL_DASH += '4'

  listenSlider:->
    it = @
    @slider.addEventListener 'input', (e)-> it.tween.setProgress (@value/100000)
  createBits:->
    @createBall_1(); @createBall_2()
  createBall_1:->
    ball_1 = new Ball_1(@); @tween.add(ball_1.tweens); @mainBall = ball_1.ball
  createBall_2:->
    @tween.add new Ball_2 @
    @tween.add new Ball_3 @
    @tween.add new Ball_4 @
    @tween.add new Ball_5 @
    @tween.add new Ball_6 @
    @tween.add new Ball_7 @


















  generateBezier: (mX1, mY1, mX2, mY2) ->
    NEWTON_ITERATIONS = 4
    NEWTON_MIN_SLOPE = 0.001
    SUBDIVISION_PRECISION = 0.0000001
    SUBDIVISION_MAX_ITERATIONS = 10
    kSplineTableSize = 11
    kSampleStepSize = 1.0 / (kSplineTableSize - 1.0)
    float32ArraySupported = 'Float32Array' in window

    ### Must contain four arguments. ###

    A = (aA1, aA2) ->
      1.0 - 3.0 * aA2 + 3.0 * aA1

    B = (aA1, aA2) ->
      3.0 * aA2 - 6.0 * aA1

    C = (aA1) ->
      3.0 * aA1

    calcBezier = (aT, aA1, aA2) ->
      ((A(aA1, aA2) * aT + B(aA1, aA2)) * aT + C(aA1)) * aT

    getSlope = (aT, aA1, aA2) ->
      3.0 * A(aA1, aA2) * aT * aT + 2.0 * B(aA1, aA2) * aT + C(aA1)

    newtonRaphsonIterate = (aX, aGuessT) ->
      i = 0
      while i < NEWTON_ITERATIONS
        currentSlope = getSlope(aGuessT, mX1, mX2)
        if currentSlope == 0.0
          return aGuessT
        currentX = calcBezier(aGuessT, mX1, mX2) - aX
        aGuessT -= currentX / currentSlope
        ++i
      aGuessT

    calcSampleValues = ->
      i = 0
      while i < kSplineTableSize
        mSampleValues[i] = calcBezier(i * kSampleStepSize, mX1, mX2)
        ++i
      return

    binarySubdivide = (aX, aA, aB) ->
      currentX = undefined
      currentT = undefined
      i = 0
      loop
        currentT = aA + (aB - aA) / 2.0
        currentX = calcBezier(currentT, mX1, mX2) - aX
        if currentX > 0.0
          aB = currentT
        else
          aA = currentT
        unless Math.abs(currentX) > SUBDIVISION_PRECISION and ++i < SUBDIVISION_MAX_ITERATIONS
          break
      currentT

    getTForX = (aX) ->
      intervalStart = 0.0
      currentSample = 1
      lastSample = kSplineTableSize - 1
      while currentSample != lastSample and mSampleValues[currentSample] <= aX
        intervalStart += kSampleStepSize
        ++currentSample
      --currentSample
      dist = (aX - mSampleValues[currentSample]) / (mSampleValues[currentSample + 1] - mSampleValues[currentSample])
      guessForT = intervalStart + dist * kSampleStepSize
      initialSlope = getSlope(guessForT, mX1, mX2)
      if initialSlope >= NEWTON_MIN_SLOPE
        newtonRaphsonIterate aX, guessForT
      else if initialSlope == 0.0
        guessForT
      else
        binarySubdivide aX, intervalStart, intervalStart + kSampleStepSize

    precompute = ->
      _precomputed = true
      if mX1 != mY1 or mX2 != mY2
        calcSampleValues()
      return

    if arguments.length != 4
      return false

    ### Arguments must be numbers. ###

    i = 0
    while i < 4
      if typeof arguments[i] != 'number' or isNaN(arguments[i]) or !isFinite(arguments[i])
        return false
      ++i

    ### X values must be in the [0, 1] range. ###

    mX1 = Math.min(mX1, 1)
    mX2 = Math.min(mX2, 1)
    mX1 = Math.max(mX1, 0)
    mX2 = Math.max(mX2, 0)
    mSampleValues = if float32ArraySupported then new Float32Array(kSplineTableSize) else new Array(kSplineTableSize)
    _precomputed = false

    f = (aX) ->
      if !_precomputed
        precompute()
      if mX1 == mY1 and mX2 == mY2
        return aX
      if aX == 0
        return 0
      if aX == 1
        return 1
      calcBezier getTForX(aX), mY1, mY2

    f.getControlPoints = ->
      [
        {
          x: mX1
          y: mY1
        }
        {
          x: mX2
          y: mY2
        }
      ]
    f

new Main

# # mainTween.add ball.tween
# # mainTween.add burst.tween
# # mainTween.add circle.tween
