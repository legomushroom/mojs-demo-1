mojs = require 'mo-js'
mojs.isDebug = false

Ball_1 = require './ball-1'
Ball_2 = require './ball-2'
Ball_3 = require './ball-3'
Ball_4 = require './ball-4'
Ball_5 = require './ball-5'
Ball_6 = require './ball-6'
Ball_7 = require './ball-7'

class Main
  CYAN:           '#11CDC5'
  PINK:           '#FC2D79'
  YELLOW:         '#F9DD5E'
  ORANGE:         '#FCB635'
  WHITE:          '#FDFDFD'
  S:              .7
  # DELAY_START:    1500
  DELAY_START:    0
  STROKE_WIDTH:   2
  CIRCLE_RADIUS:  5
  IS_RUNLESS:     true
  constructor:->
    @vars(); @listenSlider()
    @createBits(); @createSounds()
    @listenLinks()
  vars:->
    @slider   = document.querySelector '#js-slider'
    @ctx      = document.querySelector '#js-svg-canvas'
    @repeat   = document.querySelector '#js-repeat'
    @controls = document.querySelector '#js-controls'
    @pin      = document.querySelector '#js-pin'
    @sound    = document.querySelector '#js-sound'
    @ctxWidth   = 480; @ctxHeight = 400
    @centerX    = @ctxWidth/2; @centerY = @ctxHeight/2
    @o2Left     = 287; @topLine    = 65; @bottomLine = 240
    @bottomLineBurst = @bottomLine + 10
    @CHARS_TOP = @bottomLine - 70
    @CHAR_DUR  = 2500
    @DOWN_DUR  = 50
    @BALL_1_START   = @DELAY_START
    @BALL_1_ARCDUR  = 1600
    @BALL_2_START   = @BALL_1_START + @BALL_1_ARCDUR
    @BALL_2_ARCDUR  = 800
    @BALL_3_START   = @BALL_2_START + @BALL_2_ARCDUR + 100
    @BALL_3_ARCDUR  = 800
    @BALL_4_START   = @BALL_3_START + @BALL_3_ARCDUR + 100
    @BALL_4_ARCDUR  = 800
    @BALL_5_START   = @BALL_4_START + @BALL_4_ARCDUR + 100
    @BALL_5_ARCDUR  = 800
    @BALL_6_START   = @BALL_5_START + @BALL_5_ARCDUR + 100
    @BALL_6_ARCDUR  = 800
    @BALL_7_START   = @BALL_6_START + @BALL_6_ARCDUR + 100
    @BALL_7_ARCDUR  = 600

    @TransitStagger = new mojs.Stagger mojs.Transit

    @STAGGER_COLORS = [ @PINK, @CYAN, @WHITE ]
    @STAGGER_EASING = 'sin.out'
    @BG = '#333'
    # @BG = 'deeppink'
    @TRAIL_DASH  = '4 4'
    @TRAIL_WIDTH = 1
    @TRAIL_FADE  = 400
    @TRAIL_COLOR   = 'white'
    @TRAIL_OPACITY = .5
    @isIOS = @isIOSSafari()
    @isOn = !@isIOS
    !@isIOS and @sound.classList.add 'is-on'
    @clickHandler = if @isIOS or @isTouch() then 'touchstart' else 'click'

    @tween = new mojs.Timeline
      onUpdate:(p)=>
        @progress = p
        @slider.value = p*100000 if @tween.state is 'play'

      onStart:=>    !@isPinned and @controls.classList.remove 'is-shown'
      onComplete:=> @controls.classList.add 'is-shown'

    @clickArea = new mojs.Transit
      type:      'circle'
      fill:      @WHITE
      opacity:   .5: 0
      isRunLess: true
      radius:    0: 25
      parent:    @controls
      easing:   'cubic.out'

  isIOSSafari:->
    userAgent = window.navigator.userAgent
    userAgent.match(/iPad/i) || userAgent.match(/iPhone/i)

  isTouch:->
    isIETouch = navigator.maxTouchPoints > 0 or navigator.msMaxTouchPoints > 0
    'ontouchstart' in window or isIETouch

  listenSlider:->
    it = @
    @slider.addEventListener 'input', (e)->
      if it.tween.state is 'play' then it.tween.pause(); it.bells1.stop()
      it.tween.setProgress (@value/100000)

    controlsStep = 27
    @addEvent @repeat, =>
      @clickArea.run(x: 12, y: 10)
      @bells1.stop(); @tween.restart()
    @addEvent @pin, (e)=>
      @clickArea.run(x: 12+1*controlsStep, y: 10)
      @pin.classList.toggle 'is-pinned'
      @isPinned = !@isPinned
    @addEvent @sound, (e)=>
      @clickArea.run(x: 12+2*controlsStep, y: 10)
      if !@isOn then @bells1.play().pos(@progress*5.14858)
      else @bells1.stop()
      @sound.classList.toggle 'is-on'
      @isOn = !@isOn

  createBits:-> @createBall_1(); @createBalls()
  createBall_1:->
    ball_1 = new Ball_1(@); @tween.add(ball_1.tweens); @mainBall = ball_1.ball
  createBalls:->
    @tween.add new Ball_2 @
    @tween.add new Ball_3 @
    @tween.add new Ball_4 @
    @tween.add new Ball_5 @
    # @tween.add new Ball_6 @
    # @tween.add new Ball_7 @

  isOpera:->
    userAgent = navigator.userAgent
    /^Opera\//.test(userAgent) or /\x20OPR\//.test(userAgent)

  createSounds:->
    audioLink = if @isOpera() then 'sounds/bells-1-half.wav'
    else 'sounds/bells-1-half.mp3'
    @bells1 = new Howl
      urls: [audioLink]
      onload:=> setTimeout (=> @tween.start()), 500

  playSound:(audio)-> return if !@isOn; audio.play()

  listenLinks:->
    @lego = document.querySelector '#js-by-logo'
    @legoSnowball = document.querySelector '#js-by-snowball'

    @addEvent @lego, (e)=>
      e.preventDefault()
      href = e.target.getAttribute 'href'
      @legoSnowball.classList.add 'is-shown'
      setTimeout ->
        window.location.href = href
      , 200
      false

    @mojs = document.querySelector '#js-with-logo'
    @mojsSnowball = document.querySelector '#js-with-snowball'
    @addEvent @mojs, (e)=>
      e.preventDefault()
      href = e.target.getAttribute 'href'
      @mojsSnowball.classList.add 'is-shown'
      setTimeout ->
        window.location.href = href
      , 200
      false

  addEvent:(el, handler)->
    el.addEventListener @clickHandler, handler








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
        isSubDiv = Math.abs(currentX) > SUBDIVISION_PRECISION
        unless isSubDiv and ++i < SUBDIVISION_MAX_ITERATIONS
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
      one = (aX-mSampleValues[currentSample])/(mSampleValues[currentSample + 1]
      dist = one - mSampleValues[currentSample])
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
      isNan = isNaN(arguments[i])
      if typeof arguments[i] != 'number' or isNan or !isFinite(arguments[i])
        return false
      ++i

    ### X values must be in the [0, 1] range. ###

    mX1 = Math.min(mX1, 1)
    mX2 = Math.min(mX2, 1)
    mX1 = Math.max(mX1, 0)
    mX2 = Math.max(mX2, 0)
    mSampleValues = if float32ArraySupported
      new Float32Array(kSplineTableSize)
    else new Array(kSplineTableSize)
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
