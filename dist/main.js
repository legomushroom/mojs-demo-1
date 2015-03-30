/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(1);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	var Ball_1, Ball_2, Ball_3, Ball_4, Ball_5, Ball_6, Ball_7, Main,
	  indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

	mojs.isDebug = false;

	Ball_1 = __webpack_require__(2);

	Ball_2 = __webpack_require__(3);

	Ball_3 = __webpack_require__(4);

	Ball_4 = __webpack_require__(5);

	Ball_5 = __webpack_require__(6);

	Ball_6 = __webpack_require__(7);

	Ball_7 = __webpack_require__(8);

	Main = (function() {
	  Main.prototype.CYAN = '#11CDC5';

	  Main.prototype.PINK = '#FC2D79';

	  Main.prototype.YELLOW = '#F9DD5E';

	  Main.prototype.ORANGE = '#FCB635';

	  Main.prototype.WHITE = '#FDFDFD';

	  Main.prototype.S = .7;

	  Main.prototype.DELAY_START = 0;

	  Main.prototype.STROKE_WIDTH = 2;

	  Main.prototype.CIRCLE_RADIUS = 5;

	  Main.prototype.IS_RUNLESS = true;

	  Main.prototype.IS_SOUND = true;

	  function Main() {
	    this.vars();
	    this.listenSlider();
	    this.createBits();
	    this.createSounds();
	    this.listenLinks();
	  }

	  Main.prototype.vars = function() {
	    this.slider = document.querySelector('#js-slider');
	    this.ctx = document.querySelector('#js-svg-canvas');
	    this.repeat = document.querySelector('#js-repeat');
	    this.controls = document.querySelector('#js-controls');
	    this.pin = document.querySelector('#js-pin');
	    this.sound = document.querySelector('#js-sound');
	    this.ctxWidth = 480;
	    this.ctxHeight = 400;
	    this.centerX = this.ctxWidth / 2;
	    this.centerY = this.ctxHeight / 2;
	    this.o2Left = 287;
	    this.topLine = 65;
	    this.bottomLine = 240;
	    this.bottomLineBurst = this.bottomLine + 10;
	    this.CHARS_TOP = this.bottomLine - 70;
	    this.CHAR_DUR = 2500;
	    this.DOWN_DUR = 50;
	    this.BALL_1_START = this.DELAY_START;
	    this.BALL_1_ARCDUR = 1600;
	    this.BALL_2_START = this.BALL_1_START + this.BALL_1_ARCDUR;
	    this.BALL_2_ARCDUR = 800;
	    this.BALL_3_START = this.BALL_2_START + this.BALL_2_ARCDUR + 100;
	    this.BALL_3_ARCDUR = 800;
	    this.BALL_4_START = this.BALL_3_START + this.BALL_3_ARCDUR + 100;
	    this.BALL_4_ARCDUR = 800;
	    this.BALL_5_START = this.BALL_4_START + this.BALL_4_ARCDUR + 100;
	    this.BALL_5_ARCDUR = 800;
	    this.BALL_6_START = this.BALL_5_START + this.BALL_5_ARCDUR + 100;
	    this.BALL_6_ARCDUR = 800;
	    this.BALL_7_START = this.BALL_6_START + this.BALL_6_ARCDUR + 100;
	    this.BALL_7_ARCDUR = 600;
	    this.STAGGER_COLORS = [this.PINK, this.CYAN, this.WHITE];
	    this.STAGGER_EASING = 'sinusoidal.out';
	    this.BG = '#333';
	    this.TRAIL_DASH = '4 4';
	    this.TRAIL_WIDTH = 1;
	    this.TRAIL_FADE = 400;
	    this.TRAIL_COLOR = 'white';
	    this.TRAIL_OPACITY = .5;
	    this.isIOS = this.isIOSSafari();
	    this.isOn = !this.isIOS;
	    !this.isIOS && this.sound.classList.add('is-on');
	    return this.tween = new mojs.Tween({
	      onUpdate: (function(_this) {
	        return function(p) {
	          _this.progress = p;
	          return _this.slider.value = p * 100000;
	        };
	      })(this),
	      onStart: (function(_this) {
	        return function() {
	          return !_this.isPinned && _this.controls.classList.remove('is-shown');
	        };
	      })(this),
	      onComplete: (function(_this) {
	        return function() {
	          return _this.controls.classList.add('is-shown');
	        };
	      })(this)
	    });
	  };

	  Main.prototype.isIOSSafari = function() {
	    var userAgent;
	    userAgent = window.navigator.userAgent;
	    return userAgent.match(/iPad/i) || userAgent.match(/iPhone/i);
	  };

	  Main.prototype.listenSlider = function() {
	    var it;
	    it = this;
	    this.slider.addEventListener('input', function(e) {
	      if (it.tween.state === 'play') {
	        it.tween.pause();
	        it.bells1.stop();
	      }
	      return it.tween.setProgress(this.value / 100000);
	    });
	    this.repeat.addEventListener('click', (function(_this) {
	      return function() {
	        _this.bells1.stop();
	        return _this.tween.restart();
	      };
	    })(this));
	    this.pin.addEventListener('click', (function(_this) {
	      return function() {
	        _this.pin.classList.toggle('is-pinned');
	        return _this.isPinned = !_this.isPinned;
	      };
	    })(this));
	    return this.sound.addEventListener('click', (function(_this) {
	      return function() {
	        if (!_this.isOn) {
	          _this.bells1.play().pos(_this.progress * 5);
	          _this.sound.classList.toggle('is-on');
	          return _this.isOn = true;
	        } else {
	          _this.isOn = false;
	          return _this.bells1.stop();
	        }
	      };
	    })(this));
	  };

	  Main.prototype.createBits = function() {
	    this.createBall_1();
	    return this.createBalls();
	  };

	  Main.prototype.createBall_1 = function() {
	    var ball_1;
	    ball_1 = new Ball_1(this);
	    this.tween.add(ball_1.tweens);
	    return this.mainBall = ball_1.ball;
	  };

	  Main.prototype.createBalls = function() {
	    this.tween.add(new Ball_2(this));
	    this.tween.add(new Ball_3(this));
	    this.tween.add(new Ball_4(this));
	    this.tween.add(new Ball_5(this));
	    this.tween.add(new Ball_6(this));
	    this.tween.add(new Ball_7(this));
	    return setTimeout(((function(_this) {
	      return function() {
	        return _this.tween.start();
	      };
	    })(this)), 1500);
	  };

	  Main.prototype.createSounds = function() {
	    return this.bells1 = new Howl({
	      urls: ['sounds/bells-1-half.wav']
	    });
	  };

	  Main.prototype.playSound = function(audio) {
	    if (!this.isOn) {
	      return;
	    }
	    return audio.play();
	  };

	  Main.prototype.listenLinks = function() {
	    this.lego = document.querySelector('#js-by-logo');
	    this.legoSnowball = document.querySelector('#js-by-snowball');
	    this.lego.addEventListener('click', (function(_this) {
	      return function(e) {
	        var href;
	        e.preventDefault();
	        href = e.target.getAttribute('href');
	        _this.legoSnowball.classList.add('is-shown');
	        setTimeout(function() {
	          return window.location.href = href;
	        }, 200);
	        return false;
	      };
	    })(this));
	    this.mojs = document.querySelector('#js-with-logo');
	    this.mojsSnowball = document.querySelector('#js-with-snowball');
	    return this.mojs.addEventListener('click', (function(_this) {
	      return function(e) {
	        var href;
	        e.preventDefault();
	        href = e.target.getAttribute('href');
	        _this.mojsSnowball.classList.add('is-shown');
	        setTimeout(function() {
	          return window.location.href = href;
	        }, 200);
	        return false;
	      };
	    })(this));
	  };

	  Main.prototype.generateBezier = function(mX1, mY1, mX2, mY2) {
	    var A, B, C, NEWTON_ITERATIONS, NEWTON_MIN_SLOPE, SUBDIVISION_MAX_ITERATIONS, SUBDIVISION_PRECISION, _precomputed, binarySubdivide, calcBezier, calcSampleValues, f, float32ArraySupported, getSlope, getTForX, i, kSampleStepSize, kSplineTableSize, mSampleValues, newtonRaphsonIterate, precompute;
	    NEWTON_ITERATIONS = 4;
	    NEWTON_MIN_SLOPE = 0.001;
	    SUBDIVISION_PRECISION = 0.0000001;
	    SUBDIVISION_MAX_ITERATIONS = 10;
	    kSplineTableSize = 11;
	    kSampleStepSize = 1.0 / (kSplineTableSize - 1.0);
	    float32ArraySupported = indexOf.call(window, 'Float32Array') >= 0;

	    /* Must contain four arguments. */
	    A = function(aA1, aA2) {
	      return 1.0 - 3.0 * aA2 + 3.0 * aA1;
	    };
	    B = function(aA1, aA2) {
	      return 3.0 * aA2 - 6.0 * aA1;
	    };
	    C = function(aA1) {
	      return 3.0 * aA1;
	    };
	    calcBezier = function(aT, aA1, aA2) {
	      return ((A(aA1, aA2) * aT + B(aA1, aA2)) * aT + C(aA1)) * aT;
	    };
	    getSlope = function(aT, aA1, aA2) {
	      return 3.0 * A(aA1, aA2) * aT * aT + 2.0 * B(aA1, aA2) * aT + C(aA1);
	    };
	    newtonRaphsonIterate = function(aX, aGuessT) {
	      var currentSlope, currentX, i;
	      i = 0;
	      while (i < NEWTON_ITERATIONS) {
	        currentSlope = getSlope(aGuessT, mX1, mX2);
	        if (currentSlope === 0.0) {
	          return aGuessT;
	        }
	        currentX = calcBezier(aGuessT, mX1, mX2) - aX;
	        aGuessT -= currentX / currentSlope;
	        ++i;
	      }
	      return aGuessT;
	    };
	    calcSampleValues = function() {
	      var i;
	      i = 0;
	      while (i < kSplineTableSize) {
	        mSampleValues[i] = calcBezier(i * kSampleStepSize, mX1, mX2);
	        ++i;
	      }
	    };
	    binarySubdivide = function(aX, aA, aB) {
	      var currentT, currentX, i;
	      currentX = void 0;
	      currentT = void 0;
	      i = 0;
	      while (true) {
	        currentT = aA + (aB - aA) / 2.0;
	        currentX = calcBezier(currentT, mX1, mX2) - aX;
	        if (currentX > 0.0) {
	          aB = currentT;
	        } else {
	          aA = currentT;
	        }
	        if (!(Math.abs(currentX) > SUBDIVISION_PRECISION && ++i < SUBDIVISION_MAX_ITERATIONS)) {
	          break;
	        }
	      }
	      return currentT;
	    };
	    getTForX = function(aX) {
	      var currentSample, dist, guessForT, initialSlope, intervalStart, lastSample;
	      intervalStart = 0.0;
	      currentSample = 1;
	      lastSample = kSplineTableSize - 1;
	      while (currentSample !== lastSample && mSampleValues[currentSample] <= aX) {
	        intervalStart += kSampleStepSize;
	        ++currentSample;
	      }
	      --currentSample;
	      dist = (aX - mSampleValues[currentSample]) / (mSampleValues[currentSample + 1] - mSampleValues[currentSample]);
	      guessForT = intervalStart + dist * kSampleStepSize;
	      initialSlope = getSlope(guessForT, mX1, mX2);
	      if (initialSlope >= NEWTON_MIN_SLOPE) {
	        return newtonRaphsonIterate(aX, guessForT);
	      } else if (initialSlope === 0.0) {
	        return guessForT;
	      } else {
	        return binarySubdivide(aX, intervalStart, intervalStart + kSampleStepSize);
	      }
	    };
	    precompute = function() {
	      var _precomputed;
	      _precomputed = true;
	      if (mX1 !== mY1 || mX2 !== mY2) {
	        calcSampleValues();
	      }
	    };
	    if (arguments.length !== 4) {
	      return false;
	    }

	    /* Arguments must be numbers. */
	    i = 0;
	    while (i < 4) {
	      if (typeof arguments[i] !== 'number' || isNaN(arguments[i]) || !isFinite(arguments[i])) {
	        return false;
	      }
	      ++i;
	    }

	    /* X values must be in the [0, 1] range. */
	    mX1 = Math.min(mX1, 1);
	    mX2 = Math.min(mX2, 1);
	    mX1 = Math.max(mX1, 0);
	    mX2 = Math.max(mX2, 0);
	    mSampleValues = float32ArraySupported ? new Float32Array(kSplineTableSize) : new Array(kSplineTableSize);
	    _precomputed = false;
	    f = function(aX) {
	      if (!_precomputed) {
	        precompute();
	      }
	      if (mX1 === mY1 && mX2 === mY2) {
	        return aX;
	      }
	      if (aX === 0) {
	        return 0;
	      }
	      if (aX === 1) {
	        return 1;
	      }
	      return calcBezier(getTForX(aX), mY1, mY2);
	    };
	    f.getControlPoints = function() {
	      return [
	        {
	          x: mX1,
	          y: mY1
	        }, {
	          x: mX2,
	          y: mY2
	        }
	      ];
	    };
	    return f;
	  };

	  return Main;

	})();

	new Main;


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	var FirstBall;

	FirstBall = (function() {
	  function FirstBall(o) {
	    this.o = o != null ? o : {};
	    this.vars();
	    return this.create();
	  }

	  FirstBall.prototype.vars = function() {
	    this.S = this.o.S;
	    this.FALL_EASING = 'cubic.in';
	    return this.RISE_EASING = 'cubic.out';
	  };

	  FirstBall.prototype.create = function() {
	    var ball, ballStart, burst1, burst2, burst3, circle, gooDur, mp, radiusDeltaX, radiusDeltaY, retrunValue, trail1, trail2, trail3, yDelta;
	    radiusDeltaX = {};
	    radiusDeltaY = {};
	    radiusDeltaX[this.o.CIRCLE_RADIUS / 2] = 2 * this.o.CIRCLE_RADIUS;
	    radiusDeltaY[1.5 * this.o.CIRCLE_RADIUS] = this.o.CIRCLE_RADIUS / 2;
	    yDelta = {};
	    yDelta[0] = this.o.CIRCLE_RADIUS;
	    ballStart = -40;
	    trail1 = new mojs.Transit({
	      x: this.o.o2Left,
	      y: ballStart,
	      parent: this.o.ctx,
	      angle: 90,
	      delay: this.o.BALL_1_START * this.S,
	      duration: 600 * this.S,
	      isRunLess: this.o.IS_RUNLESS,
	      isShowInit: true,
	      isShowEnd: true,
	      strokeDasharray: this.o.TRAIL_DASH,
	      easing: this.FALL_EASING,
	      strokeWidth: 1,
	      opacity: this.o.TRAIL_OPACITY,
	      stroke: this.o.TRAIL_COLOR,
	      radius: {
	        0: 135
	      },
	      shiftY: {
	        0: 135
	      }
	    }).then({
	      opacity: 0,
	      duration: this.o.TRAIL_FADE * this.S,
	      delay: 0,
	      radius: 135,
	      shiftY: 135
	    });
	    trail2 = new mojs.Transit({
	      x: this.o.o2Left,
	      y: this.o.bottomLine - 92,
	      parent: this.o.ctx,
	      delay: (this.o.BALL_1_START + 700) * this.S,
	      duration: 400 * this.S,
	      isRunLess: this.o.IS_RUNLESS,
	      isShowInit: true,
	      isShowEnd: true,
	      strokeDasharray: this.o.TRAIL_DASH,
	      easing: this.RISE_EASING,
	      strokeWidth: 1,
	      opacity: this.o.TRAIL_OPACITY,
	      stroke: this.o.TRAIL_COLOR,
	      radius: {
	        0: 85
	      },
	      shiftY: {
	        85: 0
	      },
	      angle: 270
	    }).then({
	      opacity: 0,
	      duration: this.o.TRAIL_FADE * this.S,
	      delay: 0,
	      radius: 85,
	      shiftY: 0
	    });
	    trail3 = new mojs.Transit({
	      x: this.o.o2Left,
	      y: this.o.topLine,
	      parent: this.o.ctx,
	      delay: (this.o.BALL_1_START + 1150) * this.S,
	      duration: 375 * this.S,
	      isRunLess: this.o.IS_RUNLESS,
	      isShowInit: true,
	      isShowEnd: true,
	      strokeDasharray: this.o.TRAIL_DASH,
	      easing: this.FALL_EASING,
	      strokeWidth: 1,
	      opacity: this.o.TRAIL_OPACITY,
	      stroke: this.o.TRAIL_COLOR,
	      radius: {
	        0: 85
	      },
	      shiftY: {
	        0: 85
	      },
	      angle: 90
	    }).then({
	      opacity: 0,
	      duration: this.o.TRAIL_FADE * this.S,
	      delay: 0,
	      radius: 85,
	      shiftY: 85
	    });
	    gooDur = 50;
	    ball = new mojs.Transit({
	      parent: this.o.ctx,
	      type: 'circle',
	      stroke: 'white',
	      strokeWidth: this.STROKE_WIDTH,
	      fill: 'transparent',
	      radiusX: radiusDeltaX,
	      radiusY: radiusDeltaY,
	      isShowInit: true,
	      isShowEnd: true,
	      isRunLess: this.o.IS_RUNLESS,
	      delay: (this.o.BALL_1_START + 600) * this.S,
	      y: yDelta,
	      duration: gooDur * this.S
	    }).then({
	      y: 0,
	      radiusX: this.o.CIRCLE_RADIUS / 2,
	      radiusY: 1.5 * this.o.CIRCLE_RADIUS,
	      duration: 150 * this.S,
	      delay: 0
	    }).then({
	      radiusX: this.o.CIRCLE_RADIUS,
	      radiusY: this.o.CIRCLE_RADIUS,
	      duration: 150 * this.S,
	      delay: 0
	    }).then({
	      radiusX: this.o.CIRCLE_RADIUS / 2,
	      radiusY: 1.5 * this.o.CIRCLE_RADIUS,
	      duration: 150 * this.S,
	      delay: 350 * this.S
	    }).then({
	      y: this.o.CIRCLE_RADIUS,
	      radiusX: 1.5 * this.o.CIRCLE_RADIUS,
	      radiusY: this.o.CIRCLE_RADIUS / 2,
	      duration: gooDur * this.S,
	      delay: 50 * this.S
	    }).then({
	      y: 0,
	      radiusX: this.o.CIRCLE_RADIUS / 2,
	      radiusY: 1.5 * this.o.CIRCLE_RADIUS,
	      duration: 150 * this.S,
	      delay: 50 * this.S
	    }).then({
	      y: this.o.CIRCLE_RADIUS,
	      radiusX: 1.5 * this.o.CIRCLE_RADIUS,
	      radiusY: this.o.CIRCLE_RADIUS / 2,
	      duration: gooDur * this.S,
	      delay: (this.o.BALL_2_ARCDUR - 3 * gooDur) * this.S
	    }).then({
	      y: 0,
	      radiusX: this.o.CIRCLE_RADIUS / 2,
	      radiusY: 1.5 * this.o.CIRCLE_RADIUS,
	      duration: 150 * this.S,
	      delay: 0
	    }).then({
	      y: this.o.CIRCLE_RADIUS,
	      radiusX: 1.5 * this.o.CIRCLE_RADIUS,
	      radiusY: this.o.CIRCLE_RADIUS / 2,
	      duration: gooDur * this.S,
	      delay: (this.o.BALL_3_ARCDUR - 2 * gooDur) * this.S
	    }).then({
	      y: 0,
	      radiusX: this.o.CIRCLE_RADIUS / 2,
	      radiusY: 1.5 * this.o.CIRCLE_RADIUS,
	      duration: 150 * this.S,
	      delay: 0 * this.S
	    }).then({
	      y: this.o.CIRCLE_RADIUS,
	      radiusX: 1.5 * this.o.CIRCLE_RADIUS,
	      radiusY: this.o.CIRCLE_RADIUS / 2,
	      duration: gooDur * this.S,
	      delay: (this.o.BALL_4_ARCDUR - 2 * gooDur) * this.S
	    }).then({
	      y: 0,
	      radiusX: this.o.CIRCLE_RADIUS / 2,
	      radiusY: 1.5 * this.o.CIRCLE_RADIUS,
	      duration: 150 * this.S,
	      delay: 0 * this.S
	    }).then({
	      y: this.o.CIRCLE_RADIUS,
	      radiusX: 1.5 * this.o.CIRCLE_RADIUS,
	      radiusY: this.o.CIRCLE_RADIUS / 2,
	      duration: gooDur * this.S,
	      delay: (this.o.BALL_5_ARCDUR - 2 * gooDur) * this.S
	    }).then({
	      y: 0,
	      radiusX: this.o.CIRCLE_RADIUS / 2,
	      radiusY: 1.5 * this.o.CIRCLE_RADIUS,
	      duration: 150 * this.S,
	      delay: 0 * this.S
	    }).then({
	      y: this.o.CIRCLE_RADIUS,
	      radiusX: 1.5 * this.o.CIRCLE_RADIUS,
	      radiusY: this.o.CIRCLE_RADIUS / 2,
	      duration: gooDur * this.S,
	      delay: (this.o.BALL_6_ARCDUR - 2 * gooDur) * this.S
	    }).then({
	      y: 0,
	      radiusX: this.o.CIRCLE_RADIUS / 2,
	      radiusY: 1.5 * this.o.CIRCLE_RADIUS,
	      duration: (this.o.BALL_7_ARCDUR / 3) * this.S,
	      delay: 0
	    }).then({
	      radiusX: this.o.CIRCLE_RADIUS,
	      radiusY: this.o.CIRCLE_RADIUS,
	      duration: (3 * this.o.BALL_7_ARCDUR) * this.S,
	      delay: 0,
	      easing: 'elastic.out'
	    });
	    ball.el.style.opacity = 0;
	    mp = new mojs.MotionPath({
	      path: "M" + this.o.o2Left + "," + ballStart + " L" + this.o.o2Left + ", " + (this.o.bottomLine - this.o.CIRCLE_RADIUS),
	      el: ball.el,
	      duration: 600 * this.S,
	      easing: this.FALL_EASING,
	      delay: this.o.BALL_1_START * this.S,
	      isRunLess: this.o.IS_RUNLESS,
	      onUpdate: function(p) {
	        return ball.el.style.opacity = 5 * p;
	      }
	    }).then({
	      isReverse: true,
	      pathStart: .35,
	      easing: this.RISE_EASING,
	      delay: (this.o.DOWN_DUR + gooDur) * this.S,
	      duration: 400 * this.S
	    }).then({
	      isReverse: false,
	      easing: this.FALL_EASING,
	      delay: 0
	    });
	    burst1 = new mojs.Burst({
	      parent: this.o.ctx,
	      x: this.o.o2Left,
	      y: this.o.bottomLineBurst,
	      degree: 180,
	      angle: 90,
	      radius: {
	        10: 25
	      },
	      type: 'line',
	      stroke: this.o.YELLOW,
	      strokeWidth: this.o.STROKE_WIDTH,
	      delay: (this.o.BALL_1_START + 600) * this.S,
	      isRunLess: this.o.IS_RUNLESS,
	      childOptions: {
	        radius: {
	          7: 0
	        }
	      },
	      onStart: (function(_this) {
	        return function() {
	          return _this.o.playSound(_this.o.bells1);
	        };
	      })(this)
	    });
	    circle = new mojs.Transit({
	      parent: this.o.ctx,
	      x: this.o.o2Left,
	      y: 55,
	      type: 'circle',
	      radius: 3 * this.o.CIRCLE_RADIUS,
	      fill: 'transparent',
	      strokeWidth: this.o.STROKE_WIDTH,
	      stroke: this.o.PINK,
	      strokeDasharray: '100% 200%',
	      strokeDashoffset: {
	        '100%': '50%'
	      },
	      angle: 180,
	      delay: (this.o.BALL_1_START + 700) * this.S,
	      duration: 300 * this.S,
	      isRunLess: this.o.IS_RUNLESS
	    }).then({
	      strokeDashoffset: '100%',
	      angle: 360,
	      delay: 0
	    });
	    burst2 = new mojs.Burst({
	      parent: this.o.ctx,
	      x: this.o.o2Left,
	      y: this.o.bottomLineBurst,
	      degree: 180,
	      angle: 90,
	      radius: {
	        10: 25
	      },
	      type: 'line',
	      stroke: this.o.CYAN,
	      strokeWidth: this.o.STROKE_WIDTH,
	      delay: (this.o.BALL_1_START + this.o.BALL_1_ARCDUR - gooDur) * this.S,
	      isRunLess: this.o.IS_RUNLESS,
	      childOptions: {
	        radius: {
	          7: 0
	        }
	      }
	    });
	    burst3 = new mojs.Burst({
	      parent: this.o.ctx,
	      x: this.o.o2Left + 30,
	      y: this.o.bottomLineBurst + 15,
	      angle: 90,
	      radius: {
	        4: 20
	      },
	      type: 'line',
	      count: 4,
	      degree: 360,
	      stroke: this.o.PINK,
	      strokeWidth: this.o.STROKE_WIDTH,
	      delay: (this.o.BALL_2_START + 1200) * this.S,
	      isRunLess: this.o.IS_RUNLESS
	    });
	    return retrunValue = {
	      tweens: [burst1.tween, burst2.tween, burst3.tween, mp.tween, ball.tween, circle.tween, trail1.tween, trail2.tween, trail3.tween],
	      ball: ball
	    };
	  };

	  return FirstBall;

	})();

	module.exports = FirstBall;


/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	var FirstBall;

	FirstBall = (function() {
	  function FirstBall(o) {
	    this.o = o != null ? o : {};
	    this.vars();
	    return this.create();
	  }

	  FirstBall.prototype.vars = function() {
	    this.S = this.o.S;
	    this.path = document.querySelector('#js-curve-1');
	    this.pathMask = document.querySelector('#js-curve-1-mask');
	    this.o2 = document.querySelector('#js-o2');
	    this.o2Line = document.querySelector('#js-o2-line');
	    return this.easing = this.o.generateBezier(0.240, 0.725, 0.790, 0.395);
	  };

	  FirstBall.prototype.create = function() {
	    var burst, burst2, it, mp, oDelay, oDuration, oEasing, oLineStagger, oStagger, opacityDelta, trail, trailFade, translate, tween;
	    this.o.BALL_2_ARCDUR = 800;
	    trail = new mojs.Transit({
	      bit: this.pathMask,
	      fill: 'transparent',
	      strokeDasharray: '100%',
	      strokeDashoffset: {
	        '200%': '100%'
	      },
	      strokeWidth: 4 * this.o.TRAIL_WIDTH,
	      stroke: this.o.BG,
	      isShowInit: true,
	      isShowEnd: true,
	      delay: this.o.BALL_2_START * this.S,
	      duration: this.o.BALL_2_ARCDUR * this.S,
	      easing: this.easing,
	      isRunLess: this.o.IS_RUNLESS,
	      strokeLinecap: 'round'
	    });
	    opacityDelta = {};
	    opacityDelta[this.o.TRAIL_OPACITY] = 0;
	    trailFade = new mojs.Transit({
	      bit: this.path,
	      fill: 'transparent',
	      strokeDasharray: this.o.TRAIL_DASH,
	      strokeWidth: this.o.TRAIL_WIDTH,
	      stroke: this.o.TRAIL_COLOR,
	      opacity: opacityDelta,
	      isShowInit: true,
	      isShowEnd: true,
	      delay: (this.o.BALL_2_START + (this.o.BALL_2_ARCDUR / 1.25)) * this.S,
	      duration: this.o.TRAIL_FADE * this.S,
	      isRunLess: this.o.IS_RUNLESS
	    });
	    mp = new mojs.MotionPath({
	      path: this.path,
	      el: this.o.mainBall.el,
	      isRunLess: this.o.IS_RUNLESS,
	      delay: this.o.BALL_2_START * this.S,
	      duration: this.o.BALL_2_ARCDUR * this.S,
	      easing: this.easing,
	      isAngle: true,
	      angleOffset: 90
	    });
	    burst = new mojs.Burst({
	      parent: this.o.ctx,
	      x: 155,
	      y: this.o.bottomLineBurst,
	      degree: 180,
	      angle: 90,
	      radius: {
	        10: 25
	      },
	      type: 'line',
	      stroke: this.o.PINK,
	      strokeWidth: this.o.STROKE_WIDTH,
	      delay: (this.o.BALL_2_START + this.o.BALL_2_ARCDUR) * this.S,
	      isRunLess: this.o.IS_RUNLESS,
	      childOptions: {
	        radius: {
	          7: 0
	        }
	      }
	    });
	    burst2 = new mojs.Transit({
	      parent: this.o.ctx,
	      x: 310,
	      y: this.o.CHARS_TOP - 10,
	      angle: 90,
	      radius: {
	        5: 6
	      },
	      fill: 'transparent',
	      type: 'circle',
	      stroke: this.o.CYAN,
	      strokeWidth: this.o.STROKE_WIDTH,
	      delay: (this.o.BALL_2_START + this.o.BALL_2_ARCDUR + 3 * this.o.BALL_3_ARCDUR) * this.S,
	      duration: 300 * this.S,
	      isRunLess: this.o.IS_RUNLESS
	    });
	    oDuration = this.o.CHAR_DUR * this.S;
	    oLineStagger = new mojs.Stagger({
	      els: this.o2Line,
	      duration: oDuration,
	      isRunLess: this.o.IS_RUNLESS,
	      isShowEnd: true,
	      delay: "stagger(" + (this.o.BALL_2_START * this.S) + ", 200)",
	      easing: 'sinusoidal.out',
	      stroke: this.o.STAGGER_COLORS,
	      strokeDasharray: {
	        '0 100%': '100% 100%'
	      },
	      strokeDashoffset: {
	        '50%': '200%'
	      }
	    });
	    it = this;
	    translate = "translate(253, 174)";
	    oDelay = (this.o.BALL_2_START + 400) * this.S;
	    oEasing = 'sinusoidal.out';
	    oStagger = new mojs.Stagger({
	      els: this.o2,
	      duration: oDuration,
	      isRunLess: this.o.IS_RUNLESS,
	      isShowEnd: true,
	      delay: "stagger(" + oDelay + ", 100)",
	      easing: oEasing,
	      stroke: this.o.STAGGER_COLORS
	    });
	    tween = new mojs.Tween;
	    tween.add(new mojs.Timeline({
	      duration: oDuration,
	      delay: oDelay,
	      easing: oEasing,
	      onUpdate: function(p) {
	        var transform;
	        transform = translate + " rotate(" + (-135 * (1 - p)) + ",33,33)";
	        return it.o2.setAttribute('transform', transform);
	      }
	    }));
	    this.o.IS_RUNLESS || tween.start();
	    return [mp.tween, burst.tween, oStagger.tween, oLineStagger.tween, tween, trail.tween, trailFade.tween];
	  };

	  return FirstBall;

	})();

	module.exports = FirstBall;


/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	var FirstBall;

	FirstBall = (function() {
	  function FirstBall(o) {
	    this.o = o != null ? o : {};
	    this.vars();
	    return this.create();
	  }

	  FirstBall.prototype.vars = function() {
	    this.S = this.o.S;
	    this.path = document.querySelector('#js-curve-2');
	    this.pathMask = document.querySelector('#js-curve-2-mask');
	    this.o1Line1 = document.querySelector('#js-o1-line-1');
	    this.o1Line2 = document.querySelector('#js-o1-line-2');
	    this.o1circle = document.querySelector('#js-o1-circle');
	    return this.easing = this.o.generateBezier(0.435, 0.715, 0.635, 0.395);
	  };

	  FirstBall.prototype.create = function() {
	    var burst, burst2, burst3, it, mp, oDelay, oDuration, oEasing, oLine1Stagger, oLine2Stagger, oStagger, opacityDelta, trail, trailFade, translate;
	    opacityDelta = {};
	    opacityDelta[this.o.TRAIL_OPACITY] = 0;
	    trailFade = new mojs.Transit({
	      bit: this.path,
	      fill: 'transparent',
	      strokeDasharray: this.o.TRAIL_DASH,
	      strokeWidth: this.o.TRAIL_WIDTH,
	      stroke: this.o.TRAIL_COLOR,
	      opacity: opacityDelta,
	      isShowInit: true,
	      isShowEnd: true,
	      delay: (this.o.BALL_3_START + (this.o.BALL_3_ARCDUR / 1.25)) * this.S,
	      duration: this.o.TRAIL_FADE * this.S,
	      isRunLess: this.o.IS_RUNLESS
	    });
	    trail = new mojs.Transit({
	      bit: this.pathMask,
	      fill: 'transparent',
	      strokeDasharray: '100%',
	      strokeDashoffset: {
	        '200%': '100%'
	      },
	      strokeWidth: 4 * this.o.TRAIL_WIDTH,
	      stroke: this.o.BG,
	      isShowInit: true,
	      isShowEnd: true,
	      delay: this.o.BALL_3_START * this.S,
	      duration: this.o.BALL_3_ARCDUR * this.S,
	      easing: this.easing,
	      isRunLess: this.o.IS_RUNLESS,
	      strokeLinecap: 'round'
	    });
	    mp = new mojs.MotionPath({
	      path: this.path,
	      el: this.o.mainBall.el,
	      isRunLess: this.o.IS_RUNLESS,
	      delay: this.o.BALL_3_START * this.S,
	      duration: this.o.BALL_3_ARCDUR * this.S,
	      easing: this.easing,
	      isAngle: true,
	      angleOffset: 90
	    });
	    burst = new mojs.Burst({
	      parent: this.o.ctx,
	      x: 358,
	      y: this.o.bottomLineBurst,
	      degree: 180,
	      angle: 90,
	      radius: {
	        10: 25
	      },
	      type: 'line',
	      fill: 'none',
	      stroke: this.o.YELLOW,
	      strokeWidth: this.o.STROKE_WIDTH,
	      delay: (this.o.BALL_3_START + this.o.BALL_3_ARCDUR) * this.S,
	      isRunLess: this.o.IS_RUNLESS,
	      childOptions: {
	        radius: {
	          7: 0
	        }
	      }
	    });
	    burst2 = new mojs.Transit({
	      parent: this.o.ctx,
	      x: 125,
	      y: this.o.CHARS_TOP,
	      angle: 90,
	      radius: {
	        5: 6
	      },
	      fill: 'transparent',
	      type: 'circle',
	      stroke: this.o.CYAN,
	      strokeWidth: this.o.STROKE_WIDTH,
	      delay: (this.o.BALL_3_START + 400) * this.S,
	      duration: 300 * this.S,
	      isRunLess: this.o.IS_RUNLESS
	    });
	    burst3 = new mojs.Transit({
	      parent: this.o.ctx,
	      x: 125,
	      y: this.o.bottomLineBurst + 20,
	      angle: 90,
	      radius: {
	        5: 6
	      },
	      fill: 'transparent',
	      type: 'rect',
	      stroke: this.o.ORANGE,
	      strokeWidth: this.o.STROKE_WIDTH - .5,
	      delay: (this.o.BALL_3_START + this.o.BALL_3_ARCDUR + 400) * this.S,
	      duration: 300 * this.S,
	      isRunLess: this.o.IS_RUNLESS
	    });
	    oLine1Stagger = new mojs.Stagger({
	      els: this.o1Line1,
	      duration: 1000 * this.S,
	      isRunLess: this.o.IS_RUNLESS,
	      isShowEnd: true,
	      delay: "stagger(" + (this.o.BALL_3_START * this.S) + ", 200)",
	      easing: 'sinusoidal.out',
	      stroke: this.o.STAGGER_COLORS,
	      strokeDasharray: '100%',
	      strokeDashoffset: {
	        '100%': 0
	      }
	    });
	    oLine2Stagger = new mojs.Stagger({
	      els: this.o1Line2,
	      duration: 1000 * this.S,
	      isRunLess: this.o.IS_RUNLESS,
	      isShowEnd: true,
	      delay: "stagger(" + ((this.o.BALL_3_START + 800) * this.S) + ", 200)",
	      easing: 'sinusoidal.out',
	      stroke: this.o.STAGGER_COLORS,
	      strokeDasharray: {
	        '0 100%': '100% 100%'
	      },
	      strokeDashoffset: {
	        '50%': '200%'
	      }
	    });
	    it = this;
	    translate = "translate(253, 174)";
	    oDuration = 1000 * this.S;
	    oDelay = (this.o.BALL_3_START + 1200) * this.S;
	    oEasing = 'sinusoidal.out';
	    oStagger = new mojs.Stagger({
	      type: 'circle',
	      els: this.o1circle,
	      duration: oDuration,
	      isRunLess: this.o.IS_RUNLESS,
	      isShowEnd: true,
	      delay: "stagger(" + oDelay + ", 100)",
	      easing: oEasing,
	      stroke: this.o.STAGGER_COLORS,
	      radius: 24,
	      radiusX: {
	        0: 24
	      },
	      strokeDashoffset: 0
	    });
	    return [trailFade.tween, oStagger.tween, oLine1Stagger.tween, burst.tween, oLine2Stagger.tween, mp.tween, trail.tween, trailFade.tween, burst2.tween, burst3.tween];
	  };

	  return FirstBall;

	})();

	module.exports = FirstBall;


/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	var FirstBall;

	FirstBall = (function() {
	  function FirstBall(o) {
	    this.o = o != null ? o : {};
	    this.vars();
	    return this.create();
	  }

	  FirstBall.prototype.vars = function() {
	    this.S = this.o.S;
	    this.path = document.querySelector('#js-curve-3');
	    this.pathMask = document.querySelector('#js-curve-3-mask');
	    this.n1 = document.querySelector('#js-n-1');
	    this.n2 = document.querySelector('#js-n-2');
	    return this.easing = this.o.generateBezier(0.435, 0.715, 0.635, 0.395);
	  };

	  FirstBall.prototype.create = function() {
	    var burst, burst2, it, mp, n1Stagger, n2Stagger, nDelay, nDuration, opacityDelta, shift, trail, trailFade, tween;
	    trail = new mojs.Transit({
	      bit: this.pathMask,
	      fill: 'transparent',
	      strokeDasharray: '100%',
	      strokeDashoffset: {
	        '200%': '100%'
	      },
	      strokeWidth: 4 * this.o.TRAIL_WIDTH,
	      stroke: this.o.BG,
	      isShowInit: true,
	      isShowEnd: true,
	      delay: this.o.BALL_4_START * this.S,
	      duration: this.o.BALL_4_ARCDUR * this.S,
	      easing: this.easing,
	      isRunLess: this.o.IS_RUNLESS,
	      strokeLinecap: 'round'
	    });
	    opacityDelta = {};
	    opacityDelta[this.o.TRAIL_OPACITY] = 0;
	    trailFade = new mojs.Transit({
	      bit: this.path,
	      fill: 'transparent',
	      strokeDasharray: this.o.TRAIL_DASH,
	      strokeWidth: this.o.TRAIL_WIDTH,
	      stroke: this.o.TRAIL_COLOR,
	      opacity: opacityDelta,
	      isShowInit: true,
	      isShowEnd: true,
	      delay: (this.o.BALL_4_START + (this.o.BALL_4_ARCDUR / 1.25)) * this.S,
	      duration: this.o.TRAIL_FADE * this.S,
	      isRunLess: this.o.IS_RUNLESS
	    });
	    mp = new mojs.MotionPath({
	      path: this.path,
	      el: this.o.mainBall.el,
	      isRunLess: this.o.IS_RUNLESS,
	      delay: this.o.BALL_4_START * this.S,
	      duration: this.o.BALL_4_ARCDUR * this.S,
	      easing: this.easing,
	      isAngle: true,
	      angleOffset: 90
	    });
	    burst = new mojs.Burst({
	      parent: this.o.ctx,
	      x: 209,
	      y: this.o.bottomLineBurst,
	      degree: 180,
	      angle: 90,
	      radius: {
	        10: 25
	      },
	      type: 'line',
	      fill: 'none',
	      stroke: this.o.CYAN,
	      strokeWidth: this.o.STROKE_WIDTH,
	      delay: (this.o.BALL_4_START + this.o.BALL_4_ARCDUR + 10) * this.S,
	      isRunLess: this.o.IS_RUNLESS,
	      childOptions: {
	        radius: {
	          7: 0
	        }
	      }
	    });
	    burst2 = new mojs.Burst({
	      parent: this.o.ctx,
	      x: 395,
	      y: this.o.CHARS_TOP,
	      count: 3,
	      degree: 220,
	      angle: -50,
	      radius: {
	        4: 20
	      },
	      fill: 'transparent',
	      type: 'line',
	      stroke: this.o.YELLOW,
	      strokeWidth: this.o.STROKE_WIDTH,
	      delay: (this.o.BALL_4_START + 900) * this.S,
	      duration: 600 * this.S,
	      isRunLess: this.o.IS_RUNLESS
	    });
	    nDuration = this.o.CHAR_DUR;
	    nDelay = this.o.BALL_4_START + 200;
	    n1Stagger = new mojs.Stagger({
	      els: this.n1,
	      duration: nDuration * this.S,
	      isRunLess: this.o.IS_RUNLESS,
	      isShowEnd: true,
	      delay: "stagger(" + (nDelay * this.S) + ", 200)",
	      easing: this.o.STAGGER_EASING,
	      stroke: this.o.STAGGER_COLORS,
	      strokeDasharray: '100%',
	      strokeDashoffset: {
	        '100%': '200%'
	      }
	    });
	    n2Stagger = new mojs.Stagger({
	      els: this.n2,
	      duration: nDuration * this.S,
	      isRunLess: this.o.IS_RUNLESS,
	      isShowEnd: true,
	      delay: "stagger(" + (nDelay * this.S) + ", 200)",
	      easing: this.o.STAGGER_EASING,
	      stroke: this.o.STAGGER_COLORS,
	      strokeDasharray: '100%',
	      strokeDashoffset: {
	        '100%': '200%'
	      }
	    });
	    tween = new mojs.Tween;
	    shift = 22.5;
	    it = this;
	    tween.add(new mojs.Timeline({
	      duration: nDuration * this.S,
	      delay: nDelay * this.S,
	      easing: this.o.STAGGER_EASING,
	      onUpdate: function(p) {
	        it.n1.setAttribute('transform', "translate(" + (shift * p) + ")");
	        return it.n2.setAttribute('transform', "translate(" + (-shift * p) + ")");
	      }
	    }));
	    this.o.IS_RUNLESS || tween.start();
	    return [tween, n1Stagger.tween, n2Stagger.tween, burst.tween, mp.tween, trail.tween, trailFade.tween];
	  };

	  return FirstBall;

	})();

	module.exports = FirstBall;


/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	var FirstBall;

	FirstBall = (function() {
	  function FirstBall(o) {
	    this.o = o != null ? o : {};
	    this.vars();
	    return this.create();
	  }

	  FirstBall.prototype.vars = function() {
	    this.S = this.o.S;
	    this.path = document.querySelector('#js-curve-4');
	    this.pathMask = document.querySelector('#js-curve-4-mask');
	    this.line1 = document.querySelector('#js-t-line-1');
	    this.line2 = document.querySelector('#js-t-line-2');
	    this.line3 = document.querySelector('#js-t-line-3');
	    return this.easing = this.o.generateBezier(0.220, 0.665, 0.825, 0.430);
	  };

	  FirstBall.prototype.create = function() {
	    var burst, mp, oBottomStagger, oTopStagger, opacityDelta, t1Stagger, t2Stagger, t3Stagger, tDelay, tDuration, trail, trailFade;
	    trail = new mojs.Transit({
	      bit: this.pathMask,
	      fill: 'transparent',
	      strokeDasharray: '100%',
	      strokeDashoffset: {
	        '200%': '100%'
	      },
	      strokeWidth: 4 * this.o.TRAIL_WIDTH,
	      stroke: this.o.BG,
	      isShowInit: true,
	      isShowEnd: true,
	      delay: this.o.BALL_5_START * this.S,
	      duration: this.o.BALL_5_ARCDUR * this.S,
	      easing: this.easing,
	      isRunLess: this.o.IS_RUNLESS,
	      strokeLinecap: 'round'
	    });
	    opacityDelta = {};
	    opacityDelta[this.o.TRAIL_OPACITY] = 0;
	    trailFade = new mojs.Transit({
	      bit: this.path,
	      fill: 'transparent',
	      strokeDasharray: this.o.TRAIL_DASH,
	      strokeWidth: this.o.TRAIL_WIDTH,
	      stroke: this.o.TRAIL_COLOR,
	      opacity: opacityDelta,
	      isShowInit: true,
	      isShowEnd: true,
	      delay: (this.o.BALL_5_START + (this.o.BALL_5_ARCDUR / 1.25)) * this.S,
	      duration: this.o.TRAIL_FADE * this.S,
	      isRunLess: this.o.IS_RUNLESS
	    });
	    mp = new mojs.MotionPath({
	      path: this.path,
	      el: this.o.mainBall.el,
	      isRunLess: this.o.IS_RUNLESS,
	      delay: this.o.BALL_5_START * this.S,
	      duration: this.o.BALL_5_ARCDUR * this.S,
	      easing: this.easing,
	      isAngle: true,
	      angleOffset: 90
	    });
	    burst = new mojs.Burst({
	      parent: this.o.ctx,
	      x: 89,
	      y: this.o.bottomLineBurst,
	      degree: 180,
	      angle: 90,
	      radius: {
	        10: 25
	      },
	      type: 'line',
	      fill: 'none',
	      stroke: this.o.PINK,
	      strokeWidth: this.o.STROKE_WIDTH,
	      delay: (this.o.BALL_5_START + this.o.BALL_5_ARCDUR) * this.S,
	      isRunLess: this.o.IS_RUNLESS,
	      childOptions: {
	        radius: {
	          7: 0
	        }
	      }
	    });
	    tDuration = 1000;
	    tDelay = this.o.BALL_5_START + 200;
	    t1Stagger = new mojs.Stagger({
	      els: this.line1,
	      duration: tDuration * this.S,
	      isRunLess: this.o.IS_RUNLESS,
	      isShowEnd: true,
	      delay: "stagger(" + (tDelay * this.S) + ", 200)",
	      easing: this.o.STAGGER_EASING,
	      stroke: this.o.STAGGER_COLORS,
	      strokeDasharray: '100%',
	      strokeDashoffset: {
	        '100%': 0
	      }
	    });
	    t2Stagger = new mojs.Stagger({
	      els: this.line2,
	      duration: tDuration * this.S,
	      isRunLess: this.o.IS_RUNLESS,
	      isShowEnd: true,
	      delay: "stagger(" + ((tDelay + 100) * this.S) + ", 200)",
	      easing: this.o.STAGGER_EASING,
	      stroke: this.o.STAGGER_COLORS,
	      strokeDasharray: '100%',
	      strokeDashoffset: {
	        '100%': 0
	      }
	    });
	    t3Stagger = new mojs.Stagger({
	      els: this.line3,
	      duration: tDuration * this.S,
	      isRunLess: this.o.IS_RUNLESS,
	      isShowEnd: true,
	      delay: "stagger(" + ((tDelay + 100) * this.S) + ", 200)",
	      easing: this.o.STAGGER_EASING,
	      stroke: this.o.STAGGER_COLORS,
	      strokeDasharray: '100%',
	      strokeDashoffset: {
	        '100%': '200%'
	      }
	    });
	    oTopStagger = new mojs.Stagger({
	      els: '#js-circles-right-top',
	      duration: 300 * this.S,
	      isRunLess: this.o.IS_RUNLESS,
	      isShowEnd: true,
	      delay: "stagger(" + ((tDelay + tDuration / 2) * this.S) + ", 200)",
	      easing: this.o.STAGGER_EASING,
	      stroke: this.o.STAGGER_COLORS,
	      strokeWidth: 1.3,
	      strokeDasharray: '100%',
	      strokeDashoffset: {
	        '100%': '200%'
	      }
	    });
	    oBottomStagger = new mojs.Stagger({
	      els: '#js-circles-right-bottom',
	      duration: 300 * this.S,
	      isRunLess: this.o.IS_RUNLESS,
	      isShowEnd: true,
	      delay: "stagger(" + ((tDelay + tDuration / 2) * this.S) + ", 200)",
	      easing: this.o.STAGGER_EASING,
	      stroke: this.o.STAGGER_COLORS,
	      strokeWidth: 1.3,
	      strokeDasharray: '100%',
	      strokeDashoffset: {
	        '100%': '0%'
	      }
	    });
	    return [t1Stagger.tween, t2Stagger.tween, t3Stagger.tween, burst.tween, mp.tween, trail.tween, trailFade.tween, oTopStagger.tween, oBottomStagger.tween];
	  };

	  return FirstBall;

	})();

	module.exports = FirstBall;


/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	var FirstBall;

	FirstBall = (function() {
	  function FirstBall(o) {
	    this.o = o != null ? o : {};
	    this.vars();
	    return this.create();
	  }

	  FirstBall.prototype.vars = function() {
	    this.S = this.o.S;
	    this.path = document.querySelector('#js-curve-5');
	    this.pathMask = document.querySelector('#js-curve-5-mask');
	    this.line1 = document.querySelector('#js-m-line-1');
	    this.line2 = document.querySelector('#js-m-line-2');
	    return this.easing = this.o.generateBezier(0.435, 0.715, 0.635, 0.395);
	  };

	  FirstBall.prototype.create = function() {
	    var burst, forBurst, forDelay, forDuration, forStagger, m1Stagger, m2Stagger, mDelay, mDuration, mp, opacityDelta, shift, trail, trailFade;
	    trail = new mojs.Transit({
	      bit: this.pathMask,
	      fill: 'transparent',
	      strokeDasharray: '100%',
	      strokeDashoffset: {
	        '200%': '100%'
	      },
	      strokeWidth: 4 * this.o.TRAIL_WIDTH,
	      stroke: this.o.BG,
	      isShowInit: true,
	      isShowEnd: true,
	      delay: this.o.BALL_6_START * this.S,
	      duration: this.o.BALL_6_ARCDUR * this.S,
	      easing: this.easing,
	      isRunLess: this.o.IS_RUNLESS,
	      strokeLinecap: 'round'
	    });
	    opacityDelta = {};
	    opacityDelta[this.o.TRAIL_OPACITY] = 0;
	    trailFade = new mojs.Transit({
	      bit: this.path,
	      fill: 'transparent',
	      strokeDasharray: this.o.TRAIL_DASH,
	      strokeWidth: this.o.TRAIL_WIDTH,
	      stroke: this.o.TRAIL_COLOR,
	      opacity: opacityDelta,
	      isShowInit: true,
	      isShowEnd: true,
	      delay: (this.o.BALL_6_START + (this.o.BALL_6_ARCDUR / 1.25)) * this.S,
	      duration: this.o.TRAIL_FADE * this.S,
	      isRunLess: this.o.IS_RUNLESS
	    });
	    mp = new mojs.MotionPath({
	      path: this.path,
	      el: this.o.mainBall.el,
	      isRunLess: this.o.IS_RUNLESS,
	      delay: this.o.BALL_6_START * this.S,
	      duration: this.o.BALL_6_ARCDUR * this.S,
	      easing: this.easing,
	      isAngle: true,
	      angleOffset: 90
	    });
	    burst = new mojs.Burst({
	      parent: this.o.ctx,
	      x: 240,
	      y: this.o.bottomLineBurst,
	      degree: 180,
	      angle: 90,
	      radius: {
	        10: 25
	      },
	      type: 'line',
	      fill: 'none',
	      stroke: this.o.PINK,
	      strokeWidth: this.o.STROKE_WIDTH,
	      delay: (this.o.BALL_6_START + this.o.BALL_6_ARCDUR + 50) * this.S,
	      isRunLess: this.o.IS_RUNLESS,
	      childOptions: {
	        radius: {
	          7: 0
	        }
	      }
	    });
	    mDuration = 1000;
	    mDelay = this.o.BALL_6_START + 200;
	    m1Stagger = new mojs.Stagger({
	      els: this.line1,
	      duration: mDuration * this.S,
	      isRunLess: this.o.IS_RUNLESS,
	      isShowEnd: true,
	      delay: "stagger(" + (mDelay * this.S) + ", 200)",
	      easing: this.o.STAGGER_EASING,
	      stroke: this.o.STAGGER_COLORS,
	      strokeDasharray: '100%',
	      strokeDashoffset: {
	        '100%': '200%'
	      }
	    });
	    forDelay = mDelay;
	    forDuration = mDuration;
	    forStagger = new mojs.Stagger({
	      els: '#js-for-the-web',
	      duration: forDuration * this.S,
	      isRunLess: this.o.IS_RUNLESS,
	      isShowEnd: true,
	      delay: "stagger(" + (forDelay * this.S) + ", 100)",
	      easing: this.o.STAGGER_EASING,
	      stroke: this.o.WHITE,
	      strokeWidth: .5,
	      strokeDasharray: '',
	      strokeDashoffset: 0,
	      fill: this.o.WHITE,
	      opacity: {
	        0: 1
	      }
	    });
	    forBurst = new mojs.Burst({
	      parent: this.o.ctx,
	      x: 413,
	      y: this.o.bottomLineBurst + 25,
	      angle: 15,
	      radius: {
	        8: 15
	      },
	      type: 'line',
	      fill: 'none',
	      stroke: [this.o.PINK, this.o.CYAN],
	      strokeWidth: 1,
	      delay: (forDelay + forDuration + 300) * this.S,
	      count: 4,
	      isRunLess: this.o.IS_RUNLESS,
	      childOptions: {
	        radius: {
	          'rand(2,4)': 0
	        }
	      }
	    });
	    shift = 15;
	    m2Stagger = new mojs.Stagger({
	      els: this.line2,
	      duration: mDuration * this.S,
	      isRunLess: this.o.IS_RUNLESS,
	      isShowEnd: true,
	      delay: "stagger(" + (mDelay * this.S) + ", 200)",
	      easing: this.o.STAGGER_EASING,
	      stroke: this.o.STAGGER_COLORS,
	      strokeDasharray: '100%',
	      strokeDashoffset: {
	        '100%': '200%'
	      },
	      onUpdate: [
	        ((function(_this) {
	          return function(p) {
	            _this.line1.setAttribute('transform', "translate(" + (shift * p) + ")");
	            return _this.line2.setAttribute('transform', "translate(" + (-shift * p) + ")");
	          };
	        })(this)), null, null
	      ]
	    });
	    return [burst.tween, m1Stagger.tween, m2Stagger.tween, mp.tween, trail.tween, trailFade.tween, forStagger.tween, forBurst.tween];
	  };

	  return FirstBall;

	})();

	module.exports = FirstBall;


/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	var Ball;

	Ball = (function() {
	  function Ball(o) {
	    this.o = o != null ? o : {};
	    this.vars();
	    return this.create();
	  }

	  Ball.prototype.vars = function() {
	    this.S = this.o.S;
	    this.line1 = document.querySelector('#js-i-line-1');
	    this.line2 = document.querySelector('#js-i-line-2');
	    return this.line3 = document.querySelector('#js-i-line-3');
	  };

	  Ball.prototype.create = function() {
	    var auroraStagger, circle, i1Stagger, i2Stagger, i3Stagger, iDelay, iDelay2, iDuration, iDuration2, mp, oBottomStagger, oTopStagger;
	    mp = new mojs.MotionPath({
	      path: "M240.529297,234.470827 L240.529297,57",
	      el: this.o.mainBall.el,
	      isRunLess: this.o.IS_RUNLESS,
	      delay: this.o.BALL_7_START * this.S,
	      easing: 'elastic.out',
	      isAngle: true,
	      angleOffset: 90,
	      pathEnd: .38,
	      duration: 2800 * this.S
	    });
	    iDuration = 800;
	    iDelay2 = this.o.BALL_7_START + 100;
	    iDuration2 = 250;
	    iDelay = iDelay2 + iDuration2;
	    i1Stagger = new mojs.Stagger({
	      els: this.line1,
	      duration: iDuration * this.S,
	      isRunLess: this.o.IS_RUNLESS,
	      isShowEnd: true,
	      delay: "stagger(" + (iDelay * this.S) + ", 200)",
	      easing: this.o.STAGGER_EASING,
	      stroke: this.o.STAGGER_COLORS,
	      strokeDasharray: '100%',
	      strokeDashoffset: {
	        '100%': 0
	      }
	    });
	    i2Stagger = new mojs.Stagger({
	      els: this.line2,
	      duration: iDuration * this.S,
	      isRunLess: this.o.IS_RUNLESS,
	      isShowEnd: true,
	      delay: "stagger(" + ((iDelay + 100) * this.S) + ", 200)",
	      easing: this.o.STAGGER_EASING,
	      stroke: this.o.STAGGER_COLORS,
	      strokeDasharray: '100%',
	      strokeDashoffset: {
	        '100%': 0
	      }
	    });
	    i3Stagger = new mojs.Stagger({
	      els: this.line3,
	      duration: 2400 * this.S,
	      isRunLess: this.o.IS_RUNLESS,
	      isShowEnd: true,
	      delay: "stagger(" + ((iDelay2 - 75) * this.S) + ", 25)",
	      easing: 'elastic.out',
	      stroke: this.o.STAGGER_COLORS,
	      strokeDasharray: '100% 120%',
	      strokeDashoffset: {
	        '120%': '71.5%'
	      }
	    });
	    oTopStagger = new mojs.Stagger({
	      els: '#js-circles-left-top',
	      duration: 300 * this.S,
	      isRunLess: this.o.IS_RUNLESS,
	      isShowEnd: true,
	      delay: "stagger(" + (iDelay * this.S) + ", 200)",
	      easing: this.o.STAGGER_EASING,
	      stroke: this.o.STAGGER_COLORS,
	      strokeWidth: 1.3,
	      strokeDasharray: '100%',
	      strokeDashoffset: {
	        '100%': '200%'
	      }
	    });
	    oBottomStagger = new mojs.Stagger({
	      els: '#js-circles-left-bottom',
	      duration: 300 * this.S,
	      isRunLess: this.o.IS_RUNLESS,
	      isShowEnd: true,
	      delay: "stagger(" + (iDelay * this.S) + ", 200)",
	      easing: this.o.STAGGER_EASING,
	      stroke: this.o.STAGGER_COLORS,
	      strokeWidth: 1.3,
	      strokeDasharray: '100%',
	      strokeDashoffset: {
	        '100%': '0%'
	      }
	    });
	    auroraStagger = new mojs.Stagger({
	      els: '#js-aurora',
	      duration: 300 * this.S,
	      isRunLess: this.o.IS_RUNLESS,
	      isShowEnd: true,
	      delay: "stagger(" + ((this.o.DELAY_START + 3000) * this.S) + ", 200)",
	      easing: 'sinusoidal.out',
	      stroke: [this.o.YELLOW, this.o.CYAN, this.o.PINK],
	      strokeWidth: {
	        5: 0
	      },
	      strokeDasharray: '20 100 40 50',
	      strokeDashoffset: {
	        0: '100'
	      }
	    });
	    circle = new mojs.Transit({
	      parent: this.o.ctx,
	      x: this.o.o2Left - 46,
	      y: 167,
	      type: 'circle',
	      radius: 3 * this.o.CIRCLE_RADIUS,
	      fill: 'transparent',
	      strokeWidth: this.o.STROKE_WIDTH,
	      stroke: this.o.CYAN,
	      strokeDasharray: '100% 200%',
	      strokeDashoffset: {
	        '100%': '50%'
	      },
	      angle: 180,
	      delay: (this.o.BALL_7_START + this.o.BALL_7_ARCDUR + iDuration2) * this.S,
	      duration: 300 * this.S,
	      isRunLess: this.o.IS_RUNLESS
	    }).then({
	      strokeDashoffset: '100%',
	      angle: 360,
	      delay: 0
	    });
	    return [mp.tween, i1Stagger.tween, i2Stagger.tween, i3Stagger.tween, circle.tween, auroraStagger.tween, oTopStagger.tween, oBottomStagger.tween];
	  };

	  return Ball;

	})();

	module.exports = Ball;


/***/ }
/******/ ]);