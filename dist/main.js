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

	var Ball_1, Ball_2, Ball_3, Ball_4, Ball_5, Ball_6, Ball_7, Main, mojs,
	  indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

	mojs = __webpack_require__(2);

	mojs.isDebug = false;

	Ball_1 = __webpack_require__(29);

	Ball_2 = __webpack_require__(30);

	Ball_3 = __webpack_require__(31);

	Ball_4 = __webpack_require__(32);

	Ball_5 = __webpack_require__(33);

	Ball_6 = __webpack_require__(34);

	Ball_7 = __webpack_require__(35);

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
	    this.TransitStagger = new mojs.Stagger(mojs.Transit);
	    this.STAGGER_COLORS = [this.PINK, this.CYAN, this.WHITE];
	    this.STAGGER_EASING = 'sin.out';
	    this.BG = '#333';
	    this.TRAIL_DASH = '4 4';
	    this.TRAIL_WIDTH = 1;
	    this.TRAIL_FADE = 400;
	    this.TRAIL_COLOR = 'white';
	    this.TRAIL_OPACITY = .5;
	    this.isIOS = this.isIOSSafari();
	    this.isOn = !this.isIOS;
	    !this.isIOS && this.sound.classList.add('is-on');
	    this.clickHandler = this.isIOS || this.isTouch() ? 'touchstart' : 'click';
	    this.tween = new mojs.Timeline({
	      onUpdate: (function(_this) {
	        return function(p) {
	          _this.progress = p;
	          if (_this.tween.state === 'play') {
	            return _this.slider.value = p * 100000;
	          }
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
	    return this.clickArea = new mojs.Transit({
	      type: 'circle',
	      fill: this.WHITE,
	      opacity: {
	        .5: 0
	      },
	      isRunLess: true,
	      radius: {
	        0: 25
	      },
	      parent: this.controls,
	      easing: 'cubic.out'
	    });
	  };

	  Main.prototype.isIOSSafari = function() {
	    var userAgent;
	    userAgent = window.navigator.userAgent;
	    return userAgent.match(/iPad/i) || userAgent.match(/iPhone/i);
	  };

	  Main.prototype.isTouch = function() {
	    var isIETouch;
	    isIETouch = navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0;
	    return indexOf.call(window, 'ontouchstart') >= 0 || isIETouch;
	  };

	  Main.prototype.listenSlider = function() {
	    var controlsStep, it;
	    it = this;
	    this.slider.addEventListener('input', function(e) {
	      if (it.tween.state === 'play') {
	        it.tween.pause();
	        it.bells1.stop();
	      }
	      return it.tween.setProgress(this.value / 100000);
	    });
	    controlsStep = 27;
	    this.addEvent(this.repeat, (function(_this) {
	      return function() {
	        _this.clickArea.run({
	          x: 12,
	          y: 10
	        });
	        _this.bells1.stop();
	        return _this.tween.restart();
	      };
	    })(this));
	    this.addEvent(this.pin, (function(_this) {
	      return function(e) {
	        _this.clickArea.run({
	          x: 12 + 1 * controlsStep,
	          y: 10
	        });
	        _this.pin.classList.toggle('is-pinned');
	        return _this.isPinned = !_this.isPinned;
	      };
	    })(this));
	    return this.addEvent(this.sound, (function(_this) {
	      return function(e) {
	        _this.clickArea.run({
	          x: 12 + 2 * controlsStep,
	          y: 10
	        });
	        if (!_this.isOn) {
	          _this.bells1.play().pos(_this.progress * 5.14858);
	        } else {
	          _this.bells1.stop();
	        }
	        _this.sound.classList.toggle('is-on');
	        return _this.isOn = !_this.isOn;
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
	    return this.tween.add(new Ball_7(this));
	  };

	  Main.prototype.isOpera = function() {
	    var userAgent;
	    userAgent = navigator.userAgent;
	    return /^Opera\//.test(userAgent) || /\x20OPR\//.test(userAgent);
	  };

	  Main.prototype.createSounds = function() {
	    var audioLink;
	    audioLink = this.isOpera() ? 'sounds/bells-1-half.wav' : 'sounds/bells-1-half.mp3';
	    return this.bells1 = new Howl({
	      urls: [audioLink],
	      onload: (function(_this) {
	        return function() {
	          return setTimeout((function() {
	            return _this.tween.start();
	          }), 500);
	        };
	      })(this)
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
	    this.addEvent(this.lego, (function(_this) {
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
	    return this.addEvent(this.mojs, (function(_this) {
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

	  Main.prototype.addEvent = function(el, handler) {
	    return el.addEventListener(this.clickHandler, handler);
	  };

	  Main.prototype.generateBezier = function(mX1, mY1, mX2, mY2) {
	    var A, B, C, NEWTON_ITERATIONS, NEWTON_MIN_SLOPE, SUBDIVISION_MAX_ITERATIONS, SUBDIVISION_PRECISION, _precomputed, binarySubdivide, calcBezier, calcSampleValues, f, float32ArraySupported, getSlope, getTForX, i, isNan, kSampleStepSize, kSplineTableSize, mSampleValues, newtonRaphsonIterate, precompute;
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
	      var currentT, currentX, i, isSubDiv;
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
	        isSubDiv = Math.abs(currentX) > SUBDIVISION_PRECISION;
	        if (!(isSubDiv && ++i < SUBDIVISION_MAX_ITERATIONS)) {
	          break;
	        }
	      }
	      return currentT;
	    };
	    getTForX = function(aX) {
	      var currentSample, dist, guessForT, initialSlope, intervalStart, lastSample, one;
	      intervalStart = 0.0;
	      currentSample = 1;
	      lastSample = kSplineTableSize - 1;
	      while (currentSample !== lastSample && mSampleValues[currentSample] <= aX) {
	        intervalStart += kSampleStepSize;
	        ++currentSample;
	      }
	      --currentSample;
	      one = (aX - mSampleValues[currentSample]) / (mSampleValues[currentSample + 1], dist = one - mSampleValues[currentSample]);
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
	      isNan = isNaN(arguments[i]);
	      if (typeof arguments[i] !== 'number' || isNan || !isFinite(arguments[i])) {
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

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function() {
	  var mojs;

	  mojs = {
	    revision: '0.146.9',
	    isDebug: true,
	    helpers: __webpack_require__(3),
	    Bit: __webpack_require__(4),
	    bitsMap: __webpack_require__(5),
	    Circle: __webpack_require__(6),
	    Cross: __webpack_require__(11),
	    Line: __webpack_require__(7),
	    Rect: __webpack_require__(9),
	    Polygon: __webpack_require__(10),
	    Equal: __webpack_require__(12),
	    Zigzag: __webpack_require__(8),
	    Burst: __webpack_require__(13),
	    Transit: __webpack_require__(14),
	    Swirl: __webpack_require__(24),
	    Stagger: __webpack_require__(25),
	    Spriter: __webpack_require__(26),
	    MotionPath: __webpack_require__(27),
	    Tween: __webpack_require__(15),
	    Timeline: __webpack_require__(23),
	    tweener: __webpack_require__(16),
	    easing: __webpack_require__(19)
	  };

	  mojs.h = mojs.helpers;

	  mojs.delta = mojs.h.delta;


	  /* istanbul ignore next */

	  if (true) {
	    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function() {
	      return mojs;
	    }.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	  }


	  /* istanbul ignore next */

	  if ((typeof module === "object") && (typeof module.exports === "object")) {
	    module.exports = mojs;
	  }


	  /* istanbul ignore next */

	  return typeof window !== "undefined" && window !== null ? window.mojs = mojs : void 0;

	}).call(this);


/***/ },
/* 3 */
/***/ function(module, exports) {

	(function() {
	  var Helpers, h;

	  Helpers = (function() {
	    Helpers.prototype.NS = 'http://www.w3.org/2000/svg';

	    Helpers.prototype.logBadgeCss = 'background:#3A0839;color:#FF512F;border-radius:5px; padding: 1px 5px 2px; border: 1px solid #FF512F;';

	    Helpers.prototype.shortColors = {
	      transparent: 'rgba(0,0,0,0)',
	      aqua: 'rgb(0,255,255)',
	      black: 'rgb(0,0,0)',
	      blue: 'rgb(0,0,255)',
	      fuchsia: 'rgb(255,0,255)',
	      gray: 'rgb(128,128,128)',
	      green: 'rgb(0,128,0)',
	      lime: 'rgb(0,255,0)',
	      maroon: 'rgb(128,0,0)',
	      navy: 'rgb(0,0,128)',
	      olive: 'rgb(128,128,0)',
	      purple: 'rgb(128,0,128)',
	      red: 'rgb(255,0,0)',
	      silver: 'rgb(192,192,192)',
	      teal: 'rgb(0,128,128)',
	      white: 'rgb(255,255,255)',
	      yellow: 'rgb(255,255,0)',
	      orange: 'rgb(255,128,0)'
	    };

	    Helpers.prototype.chainOptionMap = {
	      duration: 1,
	      delay: 1,
	      repeat: 1,
	      easing: 1,
	      yoyo: 1,
	      onStart: 1,
	      onComplete: 1,
	      onCompleteChain: 1,
	      onUpdate: 1,
	      points: 1
	    };

	    Helpers.prototype.callbacksMap = {
	      onStart: 1,
	      onComplete: 1,
	      onCompleteChain: 1,
	      onUpdate: 1
	    };

	    Helpers.prototype.tweenOptionMap = {
	      duration: 1,
	      delay: 1,
	      repeat: 1,
	      easing: 1,
	      yoyo: 1
	    };

	    Helpers.prototype.posPropsMap = {
	      x: 1,
	      y: 1,
	      shiftX: 1,
	      shiftY: 1,
	      burstX: 1,
	      burstY: 1,
	      burstShiftX: 1,
	      burstShiftY: 1
	    };

	    Helpers.prototype.strokeDashPropsMap = {
	      strokeDasharray: 1,
	      strokeDashoffset: 1
	    };

	    Helpers.prototype.RAD_TO_DEG = 180 / Math.PI;

	    function Helpers() {
	      this.vars();
	    }

	    Helpers.prototype.vars = function() {
	      var ua;
	      this.prefix = this.getPrefix();
	      this.getRemBase();
	      this.isFF = this.prefix.lowercase === 'moz';
	      this.isIE = this.prefix.lowercase === 'ms';
	      ua = navigator.userAgent;
	      this.isOldOpera = ua.match(/presto/gim);
	      this.isSafari = ua.indexOf('Safari') > -1;
	      this.isChrome = ua.indexOf('Chrome') > -1;
	      this.isOpera = ua.toLowerCase().indexOf("op") > -1;
	      this.isChrome && this.isSafari && (this.isSafari = false);
	      (ua.match(/PhantomJS/gim)) && (this.isSafari = false);
	      this.isChrome && this.isOpera && (this.isChrome = false);
	      this.is3d = this.checkIf3d();
	      this.uniqIDs = -1;
	      this.div = document.createElement('div');
	      return document.body.appendChild(this.div);
	    };

	    Helpers.prototype.cloneObj = function(obj, exclude) {
	      var i, key, keys, newObj;
	      keys = Object.keys(obj);
	      newObj = {};
	      i = keys.length;
	      while (i--) {
	        key = keys[i];
	        if (exclude != null) {
	          if (!exclude[key]) {
	            newObj[key] = obj[key];
	          }
	        } else {
	          newObj[key] = obj[key];
	        }
	      }
	      return newObj;
	    };

	    Helpers.prototype.extend = function(objTo, objFrom) {
	      var key, value;
	      for (key in objFrom) {
	        value = objFrom[key];
	        if (objTo[key] == null) {
	          objTo[key] = objFrom[key];
	        }
	      }
	      return objTo;
	    };

	    Helpers.prototype.getRemBase = function() {
	      var html, style;
	      html = document.querySelector('html');
	      style = getComputedStyle(html);
	      return this.remBase = parseFloat(style.fontSize);
	    };

	    Helpers.prototype.clamp = function(value, min, max) {
	      if (value < min) {
	        return min;
	      } else if (value > max) {
	        return max;
	      } else {
	        return value;
	      }
	    };

	    Helpers.prototype.setPrefixedStyle = function(el, name, value) {
	      var prefixedName, prefixedStyle;
	      prefixedName = "" + this.prefix.css + name;
	      prefixedStyle = el.style[prefixedName] != null ? prefixedName : name;
	      return el.style[prefixedStyle] = value;
	    };

	    Helpers.prototype.style = function(el, name, value) {
	      var key, keys, len, _results;
	      if (typeof name === 'object') {
	        keys = Object.keys(name);
	        len = keys.length;
	        _results = [];
	        while (len--) {
	          key = keys[len];
	          value = name[key];
	          _results.push(this.setPrefixedStyle(el, key, value));
	        }
	        return _results;
	      } else {
	        return this.setPrefixedStyle(el, name, value);
	      }
	    };

	    Helpers.prototype.prepareForLog = function(args) {
	      args = Array.prototype.slice.apply(args);
	      args.unshift('::');
	      args.unshift(this.logBadgeCss);
	      args.unshift('%cmo·js%c');
	      return args;
	    };

	    Helpers.prototype.log = function() {
	      if (mojs.isDebug === false) {
	        return;
	      }
	      return console.log.apply(console, this.prepareForLog(arguments));
	    };

	    Helpers.prototype.warn = function() {
	      if (mojs.isDebug === false) {
	        return;
	      }
	      return console.warn.apply(console, this.prepareForLog(arguments));
	    };

	    Helpers.prototype.error = function() {
	      if (mojs.isDebug === false) {
	        return;
	      }
	      return console.error.apply(console, this.prepareForLog(arguments));
	    };

	    Helpers.prototype.parseUnit = function(value) {
	      var amount, isStrict, regex, returnVal, unit, _ref;
	      if (typeof value === 'number') {
	        return returnVal = {
	          unit: 'px',
	          isStrict: false,
	          value: value,
	          string: "" + value + "px"
	        };
	      } else if (typeof value === 'string') {
	        regex = /px|%|rem|em|ex|cm|ch|mm|in|pt|pc|vh|vw|vmin/gim;
	        unit = (_ref = value.match(regex)) != null ? _ref[0] : void 0;
	        isStrict = true;
	        if (!unit) {
	          unit = 'px';
	          isStrict = false;
	        }
	        amount = parseFloat(value);
	        return returnVal = {
	          unit: unit,
	          isStrict: isStrict,
	          value: amount,
	          string: "" + amount + unit
	        };
	      }
	      return value;
	    };

	    Helpers.prototype.bind = function(func, context) {
	      var bindArgs, wrapper;
	      wrapper = function() {
	        var args, unshiftArgs;
	        args = Array.prototype.slice.call(arguments);
	        unshiftArgs = bindArgs.concat(args);
	        return func.apply(context, unshiftArgs);
	      };
	      bindArgs = Array.prototype.slice.call(arguments, 2);
	      return wrapper;
	    };

	    Helpers.prototype.getRadialPoint = function(o) {
	      var point, radAngle, radiusX, radiusY;
	      if (o == null) {
	        o = {};
	      }
	      if ((o.radius == null) || (o.angle == null) || (o.center == null)) {
	        return;
	      }
	      radAngle = (o.angle - 90) * (Math.PI / 180);
	      radiusX = o.radiusX != null ? o.radiusX : o.radius;
	      radiusY = o.radiusY != null ? o.radiusY : o.radius;
	      return point = {
	        x: o.center.x + (Math.cos(radAngle) * radiusX),
	        y: o.center.y + (Math.sin(radAngle) * radiusY)
	      };
	    };

	    Helpers.prototype.getPrefix = function() {
	      var dom, pre, styles, v;
	      styles = window.getComputedStyle(document.documentElement, "");
	      v = Array.prototype.slice.call(styles).join("").match(/-(moz|webkit|ms)-/);
	      pre = (v || (styles.OLink === "" && ["", "o"]))[1];
	      dom = "WebKit|Moz|MS|O".match(new RegExp("(" + pre + ")", "i"))[1];
	      return {
	        dom: dom,
	        lowercase: pre,
	        css: "-" + pre + "-",
	        js: pre[0].toUpperCase() + pre.substr(1)
	      };
	    };

	    Helpers.prototype.strToArr = function(string) {
	      var arr;
	      arr = [];
	      if (typeof string === 'number' && !isNaN(string)) {
	        arr.push(this.parseUnit(string));
	        return arr;
	      }
	      string.trim().split(/\s+/gim).forEach((function(_this) {
	        return function(str) {
	          return arr.push(_this.parseUnit(_this.parseIfRand(str)));
	        };
	      })(this));
	      return arr;
	    };

	    Helpers.prototype.calcArrDelta = function(arr1, arr2) {
	      var delta, i, num, _i, _len;
	      delta = [];
	      for (i = _i = 0, _len = arr1.length; _i < _len; i = ++_i) {
	        num = arr1[i];
	        delta[i] = this.parseUnit("" + (arr2[i].value - arr1[i].value) + arr2[i].unit);
	      }
	      return delta;
	    };

	    Helpers.prototype.isArray = function(variable) {
	      return variable instanceof Array;
	    };

	    Helpers.prototype.normDashArrays = function(arr1, arr2) {
	      var arr1Len, arr2Len, currItem, i, lenDiff, startI, _i, _j;
	      arr1Len = arr1.length;
	      arr2Len = arr2.length;
	      if (arr1Len > arr2Len) {
	        lenDiff = arr1Len - arr2Len;
	        startI = arr2.length;
	        for (i = _i = 0; 0 <= lenDiff ? _i < lenDiff : _i > lenDiff; i = 0 <= lenDiff ? ++_i : --_i) {
	          currItem = i + startI;
	          arr2.push(this.parseUnit("0" + arr1[currItem].unit));
	        }
	      } else if (arr2Len > arr1Len) {
	        lenDiff = arr2Len - arr1Len;
	        startI = arr1.length;
	        for (i = _j = 0; 0 <= lenDiff ? _j < lenDiff : _j > lenDiff; i = 0 <= lenDiff ? ++_j : --_j) {
	          currItem = i + startI;
	          arr1.push(this.parseUnit("0" + arr2[currItem].unit));
	        }
	      }
	      return [arr1, arr2];
	    };

	    Helpers.prototype.makeColorObj = function(color) {
	      var alpha, b, colorObj, g, isRgb, r, regexString1, regexString2, result, rgbColor, style;
	      if (color[0] === '#') {
	        result = /^#?([a-f\d]{1,2})([a-f\d]{1,2})([a-f\d]{1,2})$/i.exec(color);
	        colorObj = {};
	        if (result) {
	          r = result[1].length === 2 ? result[1] : result[1] + result[1];
	          g = result[2].length === 2 ? result[2] : result[2] + result[2];
	          b = result[3].length === 2 ? result[3] : result[3] + result[3];
	          colorObj = {
	            r: parseInt(r, 16),
	            g: parseInt(g, 16),
	            b: parseInt(b, 16),
	            a: 1
	          };
	        }
	      }
	      if (color[0] !== '#') {
	        isRgb = color[0] === 'r' && color[1] === 'g' && color[2] === 'b';
	        if (isRgb) {
	          rgbColor = color;
	        }
	        if (!isRgb) {
	          rgbColor = !this.shortColors[color] ? (this.div.style.color = color, this.isFF || this.isIE || this.isOldOpera ? (style = this.computedStyle(this.div), this.computedStyle(this.div).color) : this.div.style.color) : this.shortColors[color];
	        }
	        regexString1 = '^rgba?\\((\\d{1,3}),\\s?(\\d{1,3}),';
	        regexString2 = '\\s?(\\d{1,3}),?\\s?(\\d{1}|0?\\.\\d{1,})?\\)$';
	        result = new RegExp(regexString1 + regexString2, 'gi').exec(rgbColor);
	        colorObj = {};
	        alpha = parseFloat(result[4] || 1);
	        if (result) {
	          colorObj = {
	            r: parseInt(result[1], 10),
	            g: parseInt(result[2], 10),
	            b: parseInt(result[3], 10),
	            a: (alpha != null) && !isNaN(alpha) ? alpha : 1
	          };
	        }
	      }
	      return colorObj;
	    };

	    Helpers.prototype.computedStyle = function(el) {
	      return getComputedStyle(el);
	    };

	    Helpers.prototype.capitalize = function(str) {
	      if (typeof str !== 'string') {
	        throw Error('String expected - nothing to capitalize');
	      }
	      return str.charAt(0).toUpperCase() + str.substring(1);
	    };

	    Helpers.prototype.parseRand = function(string) {
	      var rand, randArr, units;
	      randArr = string.split(/rand\(|\,|\)/);
	      units = this.parseUnit(randArr[2]);
	      rand = this.rand(parseFloat(randArr[1]), parseFloat(randArr[2]));
	      if (units.unit && randArr[2].match(units.unit)) {
	        return rand + units.unit;
	      } else {
	        return rand;
	      }
	    };

	    Helpers.prototype.parseStagger = function(string, index) {
	      var base, number, splittedValue, unit, unitValue, value;
	      value = string.split(/stagger\(|\)$/)[1].toLowerCase();
	      splittedValue = value.split(/(rand\(.*?\)|[^\(,\s]+)(?=\s*,|\s*$)/gim);
	      value = splittedValue.length > 3 ? (base = this.parseUnit(this.parseIfRand(splittedValue[1])), splittedValue[3]) : (base = this.parseUnit(0), splittedValue[1]);
	      value = this.parseIfRand(value);
	      unitValue = this.parseUnit(value);
	      number = index * unitValue.value + base.value;
	      unit = base.isStrict ? base.unit : unitValue.isStrict ? unitValue.unit : '';
	      if (unit) {
	        return "" + number + unit;
	      } else {
	        return number;
	      }
	    };

	    Helpers.prototype.parseIfStagger = function(value, i) {
	      if (!(typeof value === 'string' && value.match(/stagger/g))) {
	        return value;
	      } else {
	        return this.parseStagger(value, i);
	      }
	    };

	    Helpers.prototype.parseIfRand = function(str) {
	      if (typeof str === 'string' && str.match(/rand\(/)) {
	        return this.parseRand(str);
	      } else {
	        return str;
	      }
	    };

	    Helpers.prototype.parseDelta = function(key, value) {
	      var delta, end, endArr, endColorObj, i, start, startArr, startColorObj, _i, _len;
	      start = Object.keys(value)[0];
	      end = value[start];
	      delta = {
	        start: start
	      };
	      if (isNaN(parseFloat(start)) && !start.match(/rand\(/)) {
	        if (key === 'strokeLinecap') {
	          this.warn("Sorry, stroke-linecap property is not animatable yet, using the start(" + start + ") value instead", value);
	          return delta;
	        }
	        startColorObj = this.makeColorObj(start);
	        endColorObj = this.makeColorObj(end);
	        delta = {
	          start: startColorObj,
	          end: endColorObj,
	          type: 'color',
	          delta: {
	            r: endColorObj.r - startColorObj.r,
	            g: endColorObj.g - startColorObj.g,
	            b: endColorObj.b - startColorObj.b,
	            a: endColorObj.a - startColorObj.a
	          }
	        };
	      } else if (key === 'strokeDasharray' || key === 'strokeDashoffset') {
	        startArr = this.strToArr(start);
	        endArr = this.strToArr(end);
	        this.normDashArrays(startArr, endArr);
	        for (i = _i = 0, _len = startArr.length; _i < _len; i = ++_i) {
	          start = startArr[i];
	          end = endArr[i];
	          this.mergeUnits(start, end, key);
	        }
	        delta = {
	          start: startArr,
	          end: endArr,
	          delta: this.calcArrDelta(startArr, endArr),
	          type: 'array'
	        };
	      } else {
	        if (!this.chainOptionMap[key]) {
	          if (this.posPropsMap[key]) {
	            end = this.parseUnit(this.parseIfRand(end));
	            start = this.parseUnit(this.parseIfRand(start));
	            this.mergeUnits(start, end, key);
	            delta = {
	              start: start,
	              end: end,
	              delta: end.value - start.value,
	              type: 'unit'
	            };
	          } else {
	            end = parseFloat(this.parseIfRand(end));
	            start = parseFloat(this.parseIfRand(start));
	            delta = {
	              start: start,
	              end: end,
	              delta: end - start,
	              type: 'number'
	            };
	          }
	        }
	      }
	      return delta;
	    };

	    Helpers.prototype.mergeUnits = function(start, end, key) {
	      if (!end.isStrict && start.isStrict) {
	        end.unit = start.unit;
	        return end.string = "" + end.value + end.unit;
	      } else if (end.isStrict && !start.isStrict) {
	        start.unit = end.unit;
	        return start.string = "" + start.value + start.unit;
	      } else if (end.isStrict && start.isStrict) {
	        if (end.unit !== start.unit) {
	          start.unit = end.unit;
	          start.string = "" + start.value + start.unit;
	          return this.warn("Two different units were specified on \"" + key + "\" delta property, mo · js will fallback to end \"" + end.unit + "\" unit ");
	        }
	      }
	    };

	    Helpers.prototype.rand = function(min, max) {
	      return (Math.random() * (max - min)) + min;
	    };

	    Helpers.prototype.isDOM = function(o) {
	      var isNode;
	      if (o == null) {
	        return false;
	      }
	      isNode = typeof o.nodeType === 'number' && typeof o.nodeName === 'string';
	      return typeof o === 'object' && isNode;
	    };

	    Helpers.prototype.getChildElements = function(element) {
	      var childNodes, children, i;
	      childNodes = element.childNodes;
	      children = [];
	      i = childNodes.length;
	      while (i--) {
	        if (childNodes[i].nodeType === 1) {
	          children.unshift(childNodes[i]);
	        }
	      }
	      return children;
	    };

	    Helpers.prototype.delta = function(start, end) {
	      var isType1, isType2, obj, type1, type2;
	      type1 = typeof start;
	      type2 = typeof end;
	      isType1 = type1 === 'string' || type1 === 'number' && !isNaN(start);
	      isType2 = type2 === 'string' || type2 === 'number' && !isNaN(end);
	      if (!isType1 || !isType2) {
	        this.error("delta method expects Strings or Numbers at input but got - " + start + ", " + end);
	        return;
	      }
	      obj = {};
	      obj[start] = end;
	      return obj;
	    };

	    Helpers.prototype.getUniqID = function() {
	      return ++this.uniqIDs;
	    };

	    Helpers.prototype.parsePath = function(path) {
	      var domPath;
	      if (typeof path === 'string') {
	        if (path.charAt(0).toLowerCase() === 'm') {
	          domPath = document.createElementNS(this.NS, 'path');
	          domPath.setAttributeNS(null, 'd', path);
	          return domPath;
	        } else {
	          return document.querySelector(path);
	        }
	      }
	      if (path.style) {
	        return path;
	      }
	    };

	    Helpers.prototype.closeEnough = function(num1, num2, eps) {
	      return Math.abs(num1 - num2) < eps;
	    };

	    Helpers.prototype.checkIf3d = function() {
	      var div, prefixed, style, tr;
	      div = document.createElement('div');
	      this.style(div, 'transform', 'translateZ(0)');
	      style = div.style;
	      prefixed = "" + this.prefix.css + "transform";
	      tr = style[prefixed] != null ? style[prefixed] : style.transform;
	      return tr !== '';
	    };

	    return Helpers;

	  })();

	  h = new Helpers;

	  module.exports = h;

	}).call(this);


/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	(function() {
	  var Bit, h;

	  h = __webpack_require__(3);

	  Bit = (function() {
	    Bit.prototype.ns = 'http://www.w3.org/2000/svg';

	    Bit.prototype.type = 'line';

	    Bit.prototype.ratio = 1;

	    Bit.prototype.defaults = {
	      radius: 50,
	      radiusX: void 0,
	      radiusY: void 0,
	      points: 3,
	      x: 0,
	      y: 0,
	      angle: 0,
	      'stroke': 'hotpink',
	      'stroke-width': 2,
	      'stroke-opacity': 1,
	      'fill': 'transparent',
	      'fill-opacity': 1,
	      'stroke-dasharray': '',
	      'stroke-dashoffset': '',
	      'stroke-linecap': ''
	    };

	    function Bit(o) {
	      this.o = o != null ? o : {};
	      this.init();
	      this;
	    }

	    Bit.prototype.init = function() {
	      this.vars();
	      this.render();
	      return this;
	    };

	    Bit.prototype.vars = function() {
	      if (this.o.ctx && this.o.ctx.tagName === 'svg') {
	        this.ctx = this.o.ctx;
	      } else if (!this.o.el) {
	        h.error('You should pass a real context(ctx) to the bit');
	      }
	      this.state = {};
	      this.drawMapLength = this.drawMap.length;
	      this.extendDefaults();
	      return this.calcTransform();
	    };

	    Bit.prototype.calcTransform = function() {
	      var rotate;
	      rotate = "rotate(" + this.props.angle + ", " + this.props.x + ", " + this.props.y + ")";
	      return this.props.transform = "" + rotate;
	    };

	    Bit.prototype.extendDefaults = function() {
	      var key, value, _ref, _results;
	      if (this.props == null) {
	        this.props = {};
	      }
	      _ref = this.defaults;
	      _results = [];
	      for (key in _ref) {
	        value = _ref[key];
	        _results.push(this.props[key] = this.o[key] != null ? this.o[key] : value);
	      }
	      return _results;
	    };

	    Bit.prototype.setAttr = function(attr, value) {
	      var el, key, keys, len, val, _results;
	      if (typeof attr === 'object') {
	        keys = Object.keys(attr);
	        len = keys.length;
	        el = value || this.el;
	        _results = [];
	        while (len--) {
	          key = keys[len];
	          val = attr[key];
	          _results.push(el.setAttribute(key, val));
	        }
	        return _results;
	      } else {
	        return this.el.setAttribute(attr, value);
	      }
	    };

	    Bit.prototype.setProp = function(attr, value) {
	      var key, val, _results;
	      if (typeof attr === 'object') {
	        _results = [];
	        for (key in attr) {
	          val = attr[key];
	          _results.push(this.props[key] = val);
	        }
	        return _results;
	      } else {
	        return this.props[attr] = value;
	      }
	    };

	    Bit.prototype.render = function() {
	      this.isRendered = true;
	      if (this.o.el != null) {
	        this.el = this.o.el;
	        return this.isForeign = true;
	      } else {
	        this.el = document.createElementNS(this.ns, this.type || 'line');
	        !this.o.isDrawLess && this.draw();
	        return this.ctx.appendChild(this.el);
	      }
	    };

	    Bit.prototype.drawMap = ['stroke', 'stroke-width', 'stroke-opacity', 'stroke-dasharray', 'fill', 'stroke-dashoffset', 'stroke-linecap', 'fill-opacity', 'transform'];

	    Bit.prototype.draw = function() {
	      var len, name;
	      this.props.length = this.getLength();
	      len = this.drawMapLength;
	      while (len--) {
	        name = this.drawMap[len];
	        switch (name) {
	          case 'stroke-dasharray':
	          case 'stroke-dashoffset':
	            this.castStrokeDash(name);
	        }
	        this.setAttrsIfChanged(name, this.props[name]);
	      }
	      return this.state.radius = this.props.radius;
	    };

	    Bit.prototype.castStrokeDash = function(name) {
	      var cast, dash, i, stroke, _i, _len, _ref;
	      if (h.isArray(this.props[name])) {
	        stroke = '';
	        _ref = this.props[name];
	        for (i = _i = 0, _len = _ref.length; _i < _len; i = ++_i) {
	          dash = _ref[i];
	          cast = dash.unit === '%' ? this.castPercent(dash.value) : dash.value;
	          stroke += "" + cast + " ";
	        }
	        this.props[name] = stroke === '0 ' ? stroke = '' : stroke;
	        return this.props[name] = stroke;
	      }
	      if (typeof this.props[name] === 'object') {
	        stroke = this.props[name].unit === '%' ? this.castPercent(this.props[name].value) : this.props[name].value;
	        return this.props[name] = stroke === 0 ? stroke = '' : stroke;
	      }
	    };

	    Bit.prototype.castPercent = function(percent) {
	      return percent * (this.props.length / 100);
	    };

	    Bit.prototype.setAttrsIfChanged = function(name, value) {
	      var key, keys, len, _results;
	      if (typeof name === 'object') {
	        keys = Object.keys(name);
	        len = keys.length;
	        _results = [];
	        while (len--) {
	          key = keys[len];
	          value = name[key];
	          _results.push(this.setAttrIfChanged(key, value));
	        }
	        return _results;
	      } else {
	        if (value == null) {
	          value = this.props[name];
	        }
	        return this.setAttrIfChanged(name, value);
	      }
	    };

	    Bit.prototype.setAttrIfChanged = function(name, value) {
	      if (this.isChanged(name, value)) {
	        this.el.setAttribute(name, value);
	        return this.state[name] = value;
	      }
	    };

	    Bit.prototype.isChanged = function(name, value) {
	      if (value == null) {
	        value = this.props[name];
	      }
	      return this.state[name] !== value;
	    };

	    Bit.prototype.getLength = function() {
	      var _ref;
	      if ((((_ref = this.el) != null ? _ref.getTotalLength : void 0) != null) && this.el.getAttribute('d')) {
	        return this.el.getTotalLength();
	      } else {
	        return 2 * (this.props.radiusX != null ? this.props.radiusX : this.props.radius);
	      }
	    };

	    return Bit;

	  })();

	  module.exports = Bit;

	}).call(this);


/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	(function() {
	  var Bit, BitsMap, Circle, Cross, Equal, Line, Polygon, Rect, Zigzag, h;

	  Bit = __webpack_require__(4);

	  Circle = __webpack_require__(6);

	  Line = __webpack_require__(7);

	  Zigzag = __webpack_require__(8);

	  Rect = __webpack_require__(9);

	  Polygon = __webpack_require__(10);

	  Cross = __webpack_require__(11);

	  Equal = __webpack_require__(12);

	  h = __webpack_require__(3);

	  BitsMap = (function() {
	    function BitsMap() {}

	    BitsMap.prototype.h = h;

	    BitsMap.prototype.map = {
	      bit: Bit,
	      circle: Circle,
	      line: Line,
	      zigzag: Zigzag,
	      rect: Rect,
	      polygon: Polygon,
	      cross: Cross,
	      equal: Equal
	    };

	    BitsMap.prototype.getBit = function(name) {
	      return this.map[name] || this.h.error("no \"" + name + "\" shape available yet, please choose from this list:", this.map);
	    };

	    return BitsMap;

	  })();

	  module.exports = new BitsMap;

	}).call(this);


/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	
	/* istanbul ignore next */

	(function() {
	  var Bit, Circle,
	    __hasProp = {}.hasOwnProperty,
	    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

	  Bit = __webpack_require__(4);

	  Circle = (function(_super) {
	    __extends(Circle, _super);

	    function Circle() {
	      return Circle.__super__.constructor.apply(this, arguments);
	    }

	    Circle.prototype.type = 'ellipse';

	    Circle.prototype.draw = function() {
	      var rx, ry;
	      rx = this.props.radiusX != null ? this.props.radiusX : this.props.radius;
	      ry = this.props.radiusY != null ? this.props.radiusY : this.props.radius;
	      this.setAttrsIfChanged({
	        rx: rx,
	        ry: ry,
	        cx: this.props.x,
	        cy: this.props.y
	      });
	      return Circle.__super__.draw.apply(this, arguments);
	    };
	    Circle.prototype.getLength = function() {
	      var radiusX, radiusY;
	      radiusX = this.props.radiusX != null ? this.props.radiusX : this.props.radius;
	      radiusY = this.props.radiusY != null ? this.props.radiusY : this.props.radius;
	      return 2 * Math.PI * Math.sqrt((Math.pow(radiusX, 2) + Math.pow(radiusY, 2)) / 2);
	    };

	    return Circle;

	  })(Bit);

	  module.exports = Circle;

	}).call(this);


/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	
	/* istanbul ignore next */

	(function() {
	  var Bit, Line,
	    __hasProp = {}.hasOwnProperty,
	    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

	  Bit = __webpack_require__(4);

	  Line = (function(_super) {
	    __extends(Line, _super);

	    function Line() {
	      return Line.__super__.constructor.apply(this, arguments);
	    }

	    Line.prototype.draw = function() {
	      var radiusX;
	      radiusX = this.props.radiusX != null ? this.props.radiusX : this.props.radius;
	      this.setAttrsIfChanged({
	        x1: this.props.x - radiusX,
	        x2: this.props.x + radiusX,
	        y1: this.props.y,
	        y2: this.props.y
	      });
	      return Line.__super__.draw.apply(this, arguments);
	    };

	    return Line;

	  })(Bit);

	  module.exports = Line;

	}).call(this);


/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	
	/* istanbul ignore next */

	(function() {
	  var Bit, Zigzag,
	    __hasProp = {}.hasOwnProperty,
	    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

	  Bit = __webpack_require__(4);

	  Zigzag = (function(_super) {
	    __extends(Zigzag, _super);

	    function Zigzag() {
	      return Zigzag.__super__.constructor.apply(this, arguments);
	    }

	    Zigzag.prototype.type = 'path';

	    Zigzag.prototype.ratio = 1.43;

	    Zigzag.prototype.draw = function() {
	      var char, i, iX, iX2, iY, iY2, points, radiusX, radiusY, stepX, stepY, strokeWidth, xStart, yStart, _i, _ref;
	      if (!this.props.points) {
	        return;
	      }
	      radiusX = this.props.radiusX != null ? this.props.radiusX : this.props.radius;
	      radiusY = this.props.radiusY != null ? this.props.radiusY : this.props.radius;
	      points = '';
	      stepX = 2 * radiusX / this.props.points;
	      stepY = 2 * radiusY / this.props.points;
	      strokeWidth = this.props['stroke-width'];
	      xStart = this.props.x - radiusX;
	      yStart = this.props.y - radiusY;
	      for (i = _i = _ref = this.props.points; _ref <= 0 ? _i < 0 : _i > 0; i = _ref <= 0 ? ++_i : --_i) {
	        iX = xStart + i * stepX + strokeWidth;
	        iY = yStart + i * stepY + strokeWidth;
	        iX2 = xStart + (i - 1) * stepX + strokeWidth;
	        iY2 = yStart + (i - 1) * stepY + strokeWidth;
	        char = i === this.props.points ? 'M' : 'L';
	        points += "" + char + iX + "," + iY + " l0, -" + stepY + " l-" + stepX + ", 0";
	      }
	      this.setAttr({
	        d: points
	      });
	      return Zigzag.__super__.draw.apply(this, arguments);
	    };

	    return Zigzag;

	  })(Bit);

	  module.exports = Zigzag;

	}).call(this);


/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	
	/* istanbul ignore next */

	(function() {
	  var Bit, Rect,
	    __hasProp = {}.hasOwnProperty,
	    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

	  Bit = __webpack_require__(4);

	  Rect = (function(_super) {
	    __extends(Rect, _super);

	    function Rect() {
	      return Rect.__super__.constructor.apply(this, arguments);
	    }

	    Rect.prototype.type = 'rect';

	    Rect.prototype.ratio = 1.43;

	    Rect.prototype.draw = function() {
	      var radiusX, radiusY;
	      Rect.__super__.draw.apply(this, arguments);
	      radiusX = this.props.radiusX != null ? this.props.radiusX : this.props.radius;
	      radiusY = this.props.radiusY != null ? this.props.radiusY : this.props.radius;
	      return this.setAttrsIfChanged({
	        width: 2 * radiusX,
	        height: 2 * radiusY,
	        x: this.props.x - radiusX,
	        y: this.props.y - radiusY
	      });
	    };

	    Rect.prototype.getLength = function() {
	      var radiusX, radiusY;
	      radiusX = this.props.radiusX != null ? this.props.radiusX : this.props.radius;
	      radiusY = this.props.radiusY != null ? this.props.radiusY : this.props.radius;
	      return 2 * radiusX + 2 * radiusY;
	    };

	    return Rect;

	  })(Bit);

	  module.exports = Rect;

	}).call(this);


/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	
	/* istanbul ignore next */

	(function() {
	  var Bit, Polygon, h,
	    __hasProp = {}.hasOwnProperty,
	    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

	  Bit = __webpack_require__(4);

	  h = __webpack_require__(3);

	  Polygon = (function(_super) {
	    __extends(Polygon, _super);

	    function Polygon() {
	      return Polygon.__super__.constructor.apply(this, arguments);
	    }

	    Polygon.prototype.type = 'path';

	    Polygon.prototype.draw = function() {
	      this.drawShape();
	      return Polygon.__super__.draw.apply(this, arguments);
	    };

	    Polygon.prototype.drawShape = function() {
	      var char, d, i, point, step, _i, _j, _len, _ref, _ref1;
	      step = 360 / this.props.points;
	      this.radialPoints = [];
	      for (i = _i = 0, _ref = this.props.points; 0 <= _ref ? _i < _ref : _i > _ref; i = 0 <= _ref ? ++_i : --_i) {
	        this.radialPoints.push(h.getRadialPoint({
	          radius: this.props.radius,
	          radiusX: this.props.radiusX,
	          radiusY: this.props.radiusY,
	          angle: i * step,
	          center: {
	            x: this.props.x,
	            y: this.props.y
	          }
	        }));
	      }
	      d = '';
	      _ref1 = this.radialPoints;
	      for (i = _j = 0, _len = _ref1.length; _j < _len; i = ++_j) {
	        point = _ref1[i];
	        char = i === 0 ? 'M' : 'L';
	        d += "" + char + (point.x.toFixed(4)) + "," + (point.y.toFixed(4)) + " ";
	      }
	      return this.setAttr({
	        d: d += 'z'
	      });
	    };

	    Polygon.prototype.getLength = function() {
	      return this.el.getTotalLength();
	    };

	    return Polygon;

	  })(Bit);

	  module.exports = Polygon;

	}).call(this);


/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	
	/* istanbul ignore next */

	(function() {
	  var Bit, Cross,
	    __hasProp = {}.hasOwnProperty,
	    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

	  Bit = __webpack_require__(4);

	  Cross = (function(_super) {
	    __extends(Cross, _super);

	    function Cross() {
	      return Cross.__super__.constructor.apply(this, arguments);
	    }

	    Cross.prototype.type = 'path';

	    Cross.prototype.draw = function() {
	      var d, line1, line2, radiusX, radiusY, x1, x2, y1, y2;
	      Cross.__super__.draw.apply(this, arguments);
	      radiusX = this.props.radiusX != null ? this.props.radiusX : this.props.radius;
	      radiusY = this.props.radiusY != null ? this.props.radiusY : this.props.radius;
	      x1 = this.props.x - radiusX;
	      x2 = this.props.x + radiusX;
	      line1 = "M" + x1 + "," + this.props.y + " L" + x2 + "," + this.props.y;
	      y1 = this.props.y - radiusY;
	      y2 = this.props.y + radiusY;
	      line2 = "M" + this.props.x + "," + y1 + " L" + this.props.x + "," + y2;
	      d = "" + line1 + " " + line2;
	      return this.setAttr({
	        d: d
	      });
	    };

	    Cross.prototype.getLength = function() {
	      var radiusX, radiusY;
	      radiusX = this.props.radiusX != null ? this.props.radiusX : this.props.radius;
	      radiusY = this.props.radiusY != null ? this.props.radiusY : this.props.radius;
	      return 2 * (radiusX + radiusY);
	    };

	    return Cross;

	  })(Bit);

	  module.exports = Cross;

	}).call(this);


/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	
	/* istanbul ignore next */

	(function() {
	  var Bit, Equal,
	    __hasProp = {}.hasOwnProperty,
	    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

	  Bit = __webpack_require__(4);

	  Equal = (function(_super) {
	    __extends(Equal, _super);

	    function Equal() {
	      return Equal.__super__.constructor.apply(this, arguments);
	    }

	    Equal.prototype.type = 'path';

	    Equal.prototype.ratio = 1.43;

	    Equal.prototype.draw = function() {
	      var d, i, radiusX, radiusY, x1, x2, y, yStart, yStep, _i, _ref;
	      Equal.__super__.draw.apply(this, arguments);
	      if (!this.props.points) {
	        return;
	      }
	      radiusX = this.props.radiusX != null ? this.props.radiusX : this.props.radius;
	      radiusY = this.props.radiusY != null ? this.props.radiusY : this.props.radius;
	      x1 = this.props.x - radiusX;
	      x2 = this.props.x + radiusX;
	      d = '';
	      yStep = 2 * radiusY / (this.props.points - 1);
	      yStart = this.props.y - radiusY;
	      for (i = _i = 0, _ref = this.props.points; 0 <= _ref ? _i < _ref : _i > _ref; i = 0 <= _ref ? ++_i : --_i) {
	        y = "" + (i * yStep + yStart);
	        d += "M" + x1 + ", " + y + " L" + x2 + ", " + y + " ";
	      }
	      return this.setAttr({
	        d: d
	      });
	    };

	    Equal.prototype.getLength = function() {
	      return 2 * (this.props.radiusX != null ? this.props.radiusX : this.props.radius);
	    };

	    return Equal;

	  })(Bit);

	  module.exports = Equal;

	}).call(this);


/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	
	/* istanbul ignore next */

	(function() {
	  var Burst, Swirl, Transit, bitsMap, h,
	    __hasProp = {}.hasOwnProperty,
	    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

	  bitsMap = __webpack_require__(5);

	  Transit = __webpack_require__(14);

	  Swirl = __webpack_require__(24);

	  h = __webpack_require__(3);

	  Burst = (function(_super) {
	    __extends(Burst, _super);

	    function Burst() {
	      return Burst.__super__.constructor.apply(this, arguments);
	    }

	    Burst.prototype.skipProps = {
	      childOptions: 1
	    };

	    Burst.prototype.defaults = {
	      count: 5,
	      degree: 360,
	      opacity: 1,
	      randomAngle: 0,
	      randomRadius: 0,
	      x: 100,
	      y: 100,
	      shiftX: 0,
	      shiftY: 0,
	      easing: 'Linear.None',
	      radius: {
	        25: 75
	      },
	      radiusX: void 0,
	      radiusY: void 0,
	      angle: 0,
	      size: null,
	      sizeGap: 0,
	      duration: 600,
	      delay: 0,
	      onStart: null,
	      onComplete: null,
	      onCompleteChain: null,
	      onUpdate: null,
	      isResetAngles: false
	    };

	    Burst.prototype.childDefaults = {
	      radius: {
	        7: 0
	      },
	      radiusX: void 0,
	      radiusY: void 0,
	      angle: 0,
	      opacity: 1,
	      onStart: null,
	      onComplete: null,
	      onUpdate: null,
	      points: 3,
	      duration: 500,
	      delay: 0,
	      repeat: 0,
	      yoyo: false,
	      easing: 'Linear.None',
	      type: 'circle',
	      fill: 'deeppink',
	      fillOpacity: 1,
	      isSwirl: false,
	      swirlSize: 10,
	      swirlFrequency: 3,
	      stroke: 'transparent',
	      strokeWidth: 0,
	      strokeOpacity: 1,
	      strokeDasharray: '',
	      strokeDashoffset: '',
	      strokeLinecap: null
	    };

	    Burst.prototype.optionsIntersection = {
	      radius: 1,
	      radiusX: 1,
	      radiusY: 1,
	      angle: 1,
	      opacity: 1,
	      onStart: 1,
	      onComplete: 1,
	      onUpdate: 1
	    };

	    Burst.prototype.run = function(o) {
	      var i, key, keys, len, option, tr, _base, _i, _len, _ref, _ref1;
	      if ((o != null) && Object.keys(o).length) {
	        if (o.count || ((_ref = o.childOptions) != null ? _ref.count : void 0)) {
	          this.h.warn('Sorry, count can not be changed on run');
	        }
	        this.extendDefaults(o);
	        keys = Object.keys(o.childOptions || {});
	        if ((_base = this.o).childOptions == null) {
	          _base.childOptions = {};
	        }
	        for (i = _i = 0, _len = keys.length; _i < _len; i = ++_i) {
	          key = keys[i];
	          this.o.childOptions[key] = o.childOptions[key];
	        }
	        len = this.transits.length;
	        while (len--) {
	          option = this.getOption(len);
	          if ((((_ref1 = o.childOptions) != null ? _ref1.angle : void 0) == null) && (o.angleShift == null)) {
	            option.angle = this.transits[len].o.angle;
	          } else if (!o.isResetAngles) {
	            option.angle = this.getBitAngle(option.angle, len);
	          }
	          this.transits[len].tuneNewOption(option, true);
	        }
	        this.timeline.recalcDuration();
	      }
	      if (this.props.randomAngle || this.props.randomRadius) {
	        len = this.transits.length;
	        while (len--) {
	          tr = this.transits[len];
	          this.props.randomAngle && tr.setProp({
	            angleShift: this.generateRandomAngle()
	          });
	          this.props.randomRadius && tr.setProp({
	            radiusScale: this.generateRandomRadius()
	          });
	        }
	      }
	      return this.startTween();
	    };

	    Burst.prototype.createBit = function() {
	      var i, option, _i, _ref, _results;
	      this.transits = [];
	      _results = [];
	      for (i = _i = 0, _ref = this.props.count; 0 <= _ref ? _i < _ref : _i > _ref; i = 0 <= _ref ? ++_i : --_i) {
	        option = this.getOption(i);
	        option.ctx = this.ctx;
	        option.index = i;
	        option.isDrawLess = option.isRunLess = option.isTweenLess = true;
	        this.props.randomAngle && (option.angleShift = this.generateRandomAngle());
	        this.props.randomRadius && (option.radiusScale = this.generateRandomRadius());
	        _results.push(this.transits.push(new Swirl(option)));
	      }
	      return _results;
	    };

	    Burst.prototype.addBitOptions = function() {
	      var aShift, i, pointEnd, pointStart, points, step, transit, _i, _len, _ref, _results;
	      points = this.props.count;
	      this.degreeCnt = this.props.degree % 360 === 0 ? points : points - 1 || 1;
	      step = this.props.degree / this.degreeCnt;
	      _ref = this.transits;
	      _results = [];
	      for (i = _i = 0, _len = _ref.length; _i < _len; i = ++_i) {
	        transit = _ref[i];
	        aShift = transit.props.angleShift || 0;
	        pointStart = this.getSidePoint('start', i * step + aShift);
	        pointEnd = this.getSidePoint('end', i * step + aShift);
	        transit.o.x = this.getDeltaFromPoints('x', pointStart, pointEnd);
	        transit.o.y = this.getDeltaFromPoints('y', pointStart, pointEnd);
	        if (!this.props.isResetAngles) {
	          transit.o.angle = this.getBitAngle(transit.o.angle, i);
	        }
	        _results.push(transit.extendDefaults());
	      }
	      return _results;
	    };

	    Burst.prototype.getBitAngle = function(angle, i) {
	      var angleAddition, angleShift, curAngleShift, degCnt, delta, end, keys, newEnd, newStart, points, start, step;
	      points = this.props.count;
	      degCnt = this.props.degree % 360 === 0 ? points : points - 1 || 1;
	      step = this.props.degree / degCnt;
	      angleAddition = i * step + 90;
	      angleShift = this.transits[i].props.angleShift || 0;
	      angle = typeof angle !== 'object' ? angle + angleAddition + angleShift : (keys = Object.keys(angle), start = keys[0], end = angle[start], curAngleShift = angleAddition + angleShift, newStart = parseFloat(start) + curAngleShift, newEnd = parseFloat(end) + curAngleShift, delta = {}, delta[newStart] = newEnd, delta);
	      return angle;
	    };

	    Burst.prototype.getSidePoint = function(side, angle) {
	      var pointStart, sideRadius;
	      sideRadius = this.getSideRadius(side);
	      return pointStart = this.h.getRadialPoint({
	        radius: sideRadius.radius,
	        radiusX: sideRadius.radiusX,
	        radiusY: sideRadius.radiusY,
	        angle: angle,
	        center: {
	          x: this.props.center,
	          y: this.props.center
	        }
	      });
	    };

	    Burst.prototype.getSideRadius = function(side) {
	      return {
	        radius: this.getRadiusByKey('radius', side),
	        radiusX: this.getRadiusByKey('radiusX', side),
	        radiusY: this.getRadiusByKey('radiusY', side)
	      };
	    };

	    Burst.prototype.getRadiusByKey = function(key, side) {
	      if (this.deltas[key] != null) {
	        return this.deltas[key][side];
	      } else if (this.props[key] != null) {
	        return this.props[key];
	      }
	    };

	    Burst.prototype.getDeltaFromPoints = function(key, pointStart, pointEnd) {
	      var delta;
	      delta = {};
	      if (pointStart[key] === pointEnd[key]) {
	        return delta = pointStart[key];
	      } else {
	        delta[pointStart[key]] = pointEnd[key];
	        return delta;
	      }
	    };

	    Burst.prototype.draw = function(progress) {
	      return this.drawEl();
	    };

	    Burst.prototype.isNeedsTransform = function() {
	      return this.isPropChanged('shiftX') || this.isPropChanged('shiftY') || this.isPropChanged('angle');
	    };

	    Burst.prototype.fillTransform = function() {
	      return "rotate(" + this.props.angle + "deg) translate(" + this.props.shiftX + ", " + this.props.shiftY + ")";
	    };

	    Burst.prototype.createTween = function() {
	      var i, _results;
	      Burst.__super__.createTween.apply(this, arguments);
	      i = this.transits.length;
	      _results = [];
	      while (i--) {
	        _results.push(this.timeline.add(this.transits[i].tween));
	      }
	      return _results;
	    };

	    Burst.prototype.calcSize = function() {
	      var i, largestSize, radius, transit, _i, _len, _ref;
	      largestSize = -1;
	      _ref = this.transits;
	      for (i = _i = 0, _len = _ref.length; _i < _len; i = ++_i) {
	        transit = _ref[i];
	        transit.calcSize();
	        if (largestSize < transit.props.size) {
	          largestSize = transit.props.size;
	        }
	      }
	      radius = this.calcMaxRadius();
	      this.props.size = largestSize + 2 * radius;
	      this.props.size += 2 * this.props.sizeGap;
	      this.props.center = this.props.size / 2;
	      return this.addBitOptions();
	    };

	    Burst.prototype.getOption = function(i) {
	      var key, keys, len, option;
	      option = {};
	      keys = Object.keys(this.childDefaults);
	      len = keys.length;
	      while (len--) {
	        key = keys[len];
	        option[key] = this.getPropByMod({
	          key: key,
	          i: i,
	          from: this.o.childOptions
	        });
	        if (this.optionsIntersection[key]) {
	          if (option[key] == null) {
	            option[key] = this.getPropByMod({
	              key: key,
	              i: i,
	              from: this.childDefaults
	            });
	          }
	          continue;
	        }
	        if (option[key] == null) {
	          option[key] = this.getPropByMod({
	            key: key,
	            i: i,
	            from: this.o
	          });
	        }
	        if (option[key] == null) {
	          option[key] = this.getPropByMod({
	            key: key,
	            i: i,
	            from: this.childDefaults
	          });
	        }
	      }
	      return option;
	    };

	    Burst.prototype.getPropByMod = function(o) {
	      var prop, _ref;
	      prop = (_ref = o.from || this.o.childOptions) != null ? _ref[o.key] : void 0;
	      if (this.h.isArray(prop)) {
	        return prop[o.i % prop.length];
	      } else {
	        return prop;
	      }
	    };

	    Burst.prototype.generateRandomAngle = function(i) {
	      var randdomness, randomness;
	      randomness = parseFloat(this.props.randomAngle);
	      randdomness = randomness > 1 ? 1 : randomness < 0 ? 0 : void 0;
	      return this.h.rand(0, randomness ? randomness * 360 : 180);
	    };

	    Burst.prototype.generateRandomRadius = function(i) {
	      var randdomness, randomness, start;
	      randomness = parseFloat(this.props.randomRadius);
	      randdomness = randomness > 1 ? 1 : randomness < 0 ? 0 : void 0;
	      start = randomness ? (1 - randomness) * 100 : (1 - .5) * 100;
	      return this.h.rand(start, 100) / 100;
	    };

	    Burst.prototype.then = function(o) {
	      this.h.error("Burst's \"then\" method is under consideration, you can vote for it in github repo issues");
	      return this;
	    };

	    return Burst;

	  })(Transit);

	  module.exports = Burst;

	}).call(this);


/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	
	/* istanbul ignore next */

	(function() {
	  var Timeline, Transit, Tween, bitsMap, h,
	    __hasProp = {}.hasOwnProperty,
	    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

	  h = __webpack_require__(3);

	  bitsMap = __webpack_require__(5);

	  Tween = __webpack_require__(15);

	  Timeline = __webpack_require__(23);

	  Transit = (function(_super) {
	    __extends(Transit, _super);

	    function Transit() {
	      return Transit.__super__.constructor.apply(this, arguments);
	    }

	    Transit.prototype.progress = 0;

	    Transit.prototype.defaults = {
	      strokeWidth: 2,
	      strokeOpacity: 1,
	      strokeDasharray: 0,
	      strokeDashoffset: 0,
	      stroke: 'transparent',
	      fill: 'deeppink',
	      fillOpacity: 'transparent',
	      strokeLinecap: '',
	      points: 3,
	      x: 0,
	      y: 0,
	      shiftX: 0,
	      shiftY: 0,
	      opacity: 1,
	      radius: {
	        0: 50
	      },
	      radiusX: void 0,
	      radiusY: void 0,
	      angle: 0,
	      size: null,
	      sizeGap: 0,
	      onStart: null,
	      onComplete: null,
	      onUpdate: null,
	      duration: 500,
	      delay: 0,
	      repeat: 0,
	      yoyo: false,
	      easing: 'Linear.None'
	    };

	    Transit.prototype.vars = function() {
	      var o;
	      if (this.h == null) {
	        this.h = h;
	      }
	      if (this.lastSet == null) {
	        this.lastSet = {};
	      }
	      this.index = this.o.index || 0;
	      if (this.runCount == null) {
	        this.runCount = 0;
	      }
	      this.extendDefaults();
	      o = this.h.cloneObj(this.o);
	      this.h.extend(o, this.defaults);
	      this.history = [o];
	      this.isForeign = !!this.o.ctx;
	      this.isForeignBit = !!this.o.bit;
	      return this.timelines = [];
	    };

	    Transit.prototype.render = function() {
	      if (!this.isRendered) {
	        if (!this.isForeign && !this.isForeignBit) {
	          this.ctx = document.createElementNS(this.ns, 'svg');
	          this.ctx.style.position = 'absolute';
	          this.ctx.style.width = '100%';
	          this.ctx.style.height = '100%';
	          this.createBit();
	          this.calcSize();
	          this.el = document.createElement('div');
	          this.el.appendChild(this.ctx);
	          (this.o.parent || document.body).appendChild(this.el);
	        } else {
	          this.ctx = this.o.ctx;
	          this.createBit();
	          this.calcSize();
	        }
	        this.isRendered = true;
	      }
	      this.setElStyles();
	      this.setProgress(0, true);
	      this.createTween();
	      return this;
	    };

	    Transit.prototype.setElStyles = function() {
	      var marginSize, size, _ref;
	      if (!this.isForeign) {
	        size = "" + this.props.size + "px";
	        marginSize = "" + (-this.props.size / 2) + "px";
	        this.el.style.position = 'absolute';
	        this.el.style.top = this.props.y;
	        this.el.style.left = this.props.x;
	        this.el.style.width = size;
	        this.el.style.height = size;
	        this.el.style['margin-left'] = marginSize;
	        this.el.style['margin-top'] = marginSize;
	        this.el.style['marginLeft'] = marginSize;
	        this.el.style['marginTop'] = marginSize;
	      }
	      if ((_ref = this.el) != null) {
	        _ref.style.opacity = this.props.opacity;
	      }
	      if (this.o.isShowInit) {
	        return this.show();
	      } else {
	        return this.hide();
	      }
	    };

	    Transit.prototype.show = function() {
	      if (this.isShown || (this.el == null)) {
	        return;
	      }
	      this.el.style.display = 'block';
	      return this.isShown = true;
	    };

	    Transit.prototype.hide = function() {
	      if ((this.isShown === false) || (this.el == null)) {
	        return;
	      }
	      this.el.style.display = 'none';
	      return this.isShown = false;
	    };

	    Transit.prototype.draw = function() {      
	      this.bit.setProp({
	        x: this.origin.x,
	        y: this.origin.y,
	        stroke: this.props.stroke,
	        'stroke-width': this.props.strokeWidth,
	        'stroke-opacity': this.props.strokeOpacity,
	        'stroke-dasharray': this.props.strokeDasharray,
	        'stroke-dashoffset': this.props.strokeDashoffset,
	        'stroke-linecap': this.props.strokeLinecap,
	        fill: this.props.fill,
	        'fill-opacity': this.props.fillOpacity,
	        radius: this.props.radius,
	        radiusX: this.props.radiusX,
	        radiusY: this.props.radiusY,
	        points: this.props.points,
	        transform: this.calcTransform()
	      });
	      this.bit.draw();
	      return this.drawEl();
	    };

	    Transit.prototype.drawEl = function() {
	      if (this.el == null) {
	        return true;
	      }
	      this.isPropChanged('opacity') && (this.el.style.opacity = this.props.opacity);
	      if (!this.isForeign) {
	        this.isPropChanged('x') && (this.el.style.left = this.props.x);
	        this.isPropChanged('y') && (this.el.style.top = this.props.y);
	        if (this.isNeedsTransform()) {
	          return this.h.setPrefixedStyle(this.el, 'transform', this.fillTransform());
	        }
	      }
	    };

	    Transit.prototype.fillTransform = function() {
	      return "translate(" + this.props.shiftX + ", " + this.props.shiftY + ")";
	    };

	    Transit.prototype.isNeedsTransform = function() {
	      var isX, isY;
	      isX = this.isPropChanged('shiftX');
	      isY = this.isPropChanged('shiftY');
	      return isX || isY;
	    };

	    Transit.prototype.isPropChanged = function(name) {
	      var _base;
	      if ((_base = this.lastSet)[name] == null) {
	        _base[name] = {};
	      }
	      if (this.lastSet[name].value !== this.props[name]) {
	        this.lastSet[name].value = this.props[name];
	        return true;
	      } else {
	        return false;
	      }
	    };

	    Transit.prototype.calcTransform = function() {
	      return this.props.transform = "rotate(" + this.props.angle + "," + this.origin.x + "," + this.origin.y + ")";
	    };

	    Transit.prototype.calcSize = function() {
	      var dStroke, radius, stroke, _base;
	      if (this.o.size) {
	        return;
	      }
	      radius = this.calcMaxRadius();
	      dStroke = this.deltas['strokeWidth'];
	      stroke = dStroke != null ? Math.max(Math.abs(dStroke.start), Math.abs(dStroke.end)) : this.props.strokeWidth;
	      this.props.size = 2 * radius + 2 * stroke;
	      switch (typeof (_base = this.props.easing).toLowerCase === "function" ? _base.toLowerCase() : void 0) {
	        case 'elastic.out':
	        case 'elastic.inout':
	          this.props.size *= 1.25;
	          break;
	        case 'back.out':
	        case 'back.inout':
	          this.props.size *= 1.1;
	      }
	      this.props.size *= this.bit.ratio;
	      this.props.size += 2 * this.props.sizeGap;
	      return this.props.center = this.props.size / 2;
	    };

	    Transit.prototype.calcMaxRadius = function() {
	      var selfSize, selfSizeX, selfSizeY;
	      selfSize = this.getRadiusSize({
	        key: 'radius'
	      });
	      selfSizeX = this.getRadiusSize({
	        key: 'radiusX',
	        fallback: selfSize
	      });
	      selfSizeY = this.getRadiusSize({
	        key: 'radiusY',
	        fallback: selfSize
	      });
	      return Math.max(selfSizeX, selfSizeY);
	    };

	    Transit.prototype.getRadiusSize = function(o) {
	      if (this.deltas[o.key] != null) {
	        return Math.max(Math.abs(this.deltas[o.key].end), Math.abs(this.deltas[o.key].start));
	      } else if (this.props[o.key] != null) {
	        return parseFloat(this.props[o.key]);
	      } else {
	        return o.fallback || 0;
	      }
	    };

	    Transit.prototype.createBit = function() {
	      var bitClass;
	      bitClass = bitsMap.getBit(this.o.type || this.type);
	      this.bit = new bitClass({
	        ctx: this.ctx,
	        el: this.o.bit,
	        isDrawLess: true,
	      });
	      if (this.isForeign || this.isForeignBit) {
	        return this.el = this.bit.el;
	      }
	    };

	    Transit.prototype.setProgress = function(progress, isShow) {
	      if (!isShow) {
	        this.show();
	        if (typeof this.onUpdate === "function") {
	          this.onUpdate(progress);
	        }
	      }
	      this.progress = progress < 0 || !progress ? 0 : progress > 1 ? 1 : progress;
	      this.calcCurrentProps(progress);
	      this.calcOrigin();
	      this.draw(progress);
	      return this;
	    };

	    Transit.prototype.calcCurrentProps = function(progress) {
	      var a, b, dash, g, i, item, key, keys, len, r, stroke, units, value, _results;
	      keys = Object.keys(this.deltas);
	      len = keys.length;
	      _results = [];
	      while (len--) {
	        key = keys[len];
	        value = this.deltas[key];
	        _results.push(this.props[key] = (function() {
	          var _i, _len, _ref;
	          switch (value.type) {
	            case 'array':
	              stroke = [];
	              _ref = value.delta;
	              for (i = _i = 0, _len = _ref.length; _i < _len; i = ++_i) {
	                item = _ref[i];
	                dash = value.start[i].value + item.value * this.progress;
	                stroke.push({
	                  value: dash,
	                  unit: item.unit
	                });
	              }
	              return stroke;
	            case 'number':
	              return value.start + value.delta * progress;
	            case 'unit':
	              units = value.end.unit;
	              return "" + (value.start.value + value.delta * progress) + units;
	            case 'color':
	              r = parseInt(value.start.r + value.delta.r * progress, 10);
	              g = parseInt(value.start.g + value.delta.g * progress, 10);
	              b = parseInt(value.start.b + value.delta.b * progress, 10);
	              a = parseInt(value.start.a + value.delta.a * progress, 10);
	              return "rgba(" + r + "," + g + "," + b + "," + a + ")";
	          }
	        }).call(this));
	      }
	      return _results;
	    };

	    Transit.prototype.calcOrigin = function() {
	      return this.origin = this.o.ctx ? {
	        x: parseFloat(this.props.x),
	        y: parseFloat(this.props.y)
	      } : {
	        x: this.props.center,
	        y: this.props.center
	      };
	    };

	    Transit.prototype.extendDefaults = function(o) {
	      var array, defaultsValue, fromObject, i, key, keys, len, optionsValue, property, unit, value, _i, _len, _ref;
	      if (this.props == null) {
	        this.props = {};
	      }
	      fromObject = o || this.defaults;
	      (o == null) && (this.deltas = {});
	      keys = Object.keys(fromObject);
	      len = keys.length;
	      while (len--) {
	        key = keys[len];
	        defaultsValue = fromObject[key];
	        if ((_ref = this.skipProps) != null ? _ref[key] : void 0) {
	          continue;
	        }
	        if (o) {
	          this.o[key] = defaultsValue;
	          optionsValue = defaultsValue;
	          delete this.deltas[key];
	        } else {
	          optionsValue = this.o[key] != null ? this.o[key] : defaultsValue;
	        }
	        if (!this.isDelta(optionsValue)) {
	          if (typeof optionsValue === 'string') {
	            if (optionsValue.match(/stagger/)) {
	              optionsValue = this.h.parseStagger(optionsValue, this.index);
	            }
	          }
	          if (typeof optionsValue === 'string') {
	            if (optionsValue.match(/rand/)) {
	              optionsValue = this.h.parseRand(optionsValue);
	            }
	          }
	          this.props[key] = optionsValue;
	          if (key === 'radius') {
	            if (this.o.radiusX == null) {
	              this.props.radiusX = optionsValue;
	            }
	            if (this.o.radiusY == null) {
	              this.props.radiusY = optionsValue;
	            }
	          }
	          if (this.h.posPropsMap[key]) {
	            this.props[key] = this.h.parseUnit(this.props[key]).string;
	          }
	          if (this.h.strokeDashPropsMap[key]) {
	            property = this.props[key];
	            value = [];
	            switch (typeof property) {
	              case 'number':
	                value.push(this.h.parseUnit(property));
	                break;
	              case 'string':
	                array = this.props[key].split(' ');
	                for (i = _i = 0, _len = array.length; _i < _len; i = ++_i) {
	                  unit = array[i];
	                  value.push(this.h.parseUnit(unit));
	                }
	            }
	            this.props[key] = value;
	          }
	          continue;
	        }
	        this.isSkipDelta || this.getDelta(key, optionsValue);
	      }
	      return this.onUpdate = this.props.onUpdate;
	    };

	    Transit.prototype.isDelta = function(optionsValue) {
	      var isObject;
	      isObject = (optionsValue != null) && (typeof optionsValue === 'object');
	      isObject = isObject && !optionsValue.unit;
	      return !(!isObject || this.h.isArray(optionsValue) || h.isDOM(optionsValue));
	    };

	    Transit.prototype.getDelta = function(key, optionsValue) {
	      var delta, _ref;
	      if ((key === 'x' || key === 'y') && !this.o.ctx) {
	        this.h.warn('Consider to animate shiftX/shiftY properties instead of x/y, as it would be much more performant', optionsValue);
	      }
	      if ((_ref = this.skipPropsDelta) != null ? _ref[key] : void 0) {
	        return;
	      }
	      delta = this.h.parseDelta(key, optionsValue, this.defaults[key]);
	      if (delta.type != null) {
	        this.deltas[key] = delta;
	      }
	      return this.props[key] = delta.start;
	    };

	    Transit.prototype.mergeThenOptions = function(start, end) {
	      var endValue, i, isFunction, key, keys, o, startKey, startKeys, value;
	      o = {};
	      for (key in start) {
	        value = start[key];
	        if (!this.h.tweenOptionMap[key] && !this.h.callbacksMap[key] || key === 'duration') {
	          o[key] = value;
	        } else {
	          o[key] = key === 'easing' ? '' : void 0;
	        }
	      }
	      keys = Object.keys(end);
	      i = keys.length;
	      while (i--) {
	        key = keys[i];
	        endValue = end[key];
	        isFunction = typeof endValue === 'function';
	        if (this.h.tweenOptionMap[key] || typeof endValue === 'object' || isFunction) {
	          o[key] = endValue != null ? endValue : start[key];
	          continue;
	        }
	        startKey = start[key];
	        if (startKey == null) {
	          startKey = this.defaults[key];
	        }
	        if ((key === 'radiusX' || key === 'radiusY') && (startKey == null)) {
	          startKey = start.radius;
	        }
	        if (typeof startKey === 'object' && (startKey != null)) {
	          startKeys = Object.keys(startKey);
	          startKey = startKey[startKeys[0]];
	        }
	        if (endValue != null) {
	          o[key] = {};
	          o[key][startKey] = endValue;
	        }
	      }
	      return o;
	    };

	    Transit.prototype.then = function(o) {
	      var i, it, keys, len, merged, opts;
	      if ((o == null) || !Object.keys(o)) {
	        return;
	      }
	      merged = this.mergeThenOptions(this.history[this.history.length - 1], o);
	      this.history.push(merged);
	      keys = Object.keys(this.h.tweenOptionMap);
	      i = keys.length;
	      opts = {};
	      while (i--) {
	        opts[keys[i]] = merged[keys[i]];
	      }
	      it = this;
	      len = it.history.length;
	      (function(_this) {
	        return (function(len) {
	          opts.onUpdate = function(p) {
	            return _this.setProgress(p);
	          };
	          opts.onStart = function() {
	            var _ref;
	            return (_ref = _this.props.onStart) != null ? _ref.apply(_this) : void 0;
	          };
	          opts.onComplete = function() {
	            var _ref;
	            return (_ref = _this.props.onComplete) != null ? _ref.apply(_this) : void 0;
	          };
	          opts.onFirstUpdate = function() {
	            return it.tuneOptions(it.history[this.index]);
	          };
	          opts.isChained = !o.delay;
	          return _this.timeline.append(new Tween(opts));
	        });
	      })(this)(len);
	      return this;
	    };

	    Transit.prototype.tuneOptions = function(o) {
	      this.extendDefaults(o);
	      this.calcSize();
	      return this.setElStyles();
	    };

	    Transit.prototype.createTween = function() {
	      var it;
	      it = this;
	      this.createTimeline();
	      this.timeline = new Timeline({
	        onComplete: (function(_this) {
	          return function() {
	            var _ref;
	            !_this.o.isShowEnd && _this.hide();
	            return (_ref = _this.props.onComplete) != null ? _ref.apply(_this) : void 0;
	          };
	        })(this)
	      });
	      this.timeline.add(this.tween);
	      return !this.o.isRunLess && this.startTween();
	    };

	    Transit.prototype.createTimeline = function() {
	      return this.tween = new Tween({
	        duration: this.props.duration,
	        delay: this.props.delay,
	        repeat: this.props.repeat,
	        yoyo: this.props.yoyo,
	        easing: this.props.easing,
	        onUpdate: (function(_this) {
	          return function(p) {
	            return _this.setProgress(p);
	          };
	        })(this),
	        onStart: (function(_this) {
	          return function() {
	            var _ref;
	            _this.show();
	            return (_ref = _this.props.onStart) != null ? _ref.apply(_this) : void 0;
	          };
	        })(this),
	        onFirstUpdateBackward: (function(_this) {
	          return function() {
	            return _this.history.length > 1 && _this.tuneOptions(_this.history[0]);
	          };
	        })(this),
	        onReverseComplete: (function(_this) {
	          return function() {
	            var _ref;
	            !_this.o.isShowInit && _this.hide();
	            return (_ref = _this.props.onReverseComplete) != null ? _ref.apply(_this) : void 0;
	          };
	        })(this)
	      });
	    };

	    Transit.prototype.run = function(o) {
	      var key, keys, len;
	      this.runCount++;
	      if (o && Object.keys(o).length) {
	        if (this.history.length > 1) {
	          keys = Object.keys(o);
	          len = keys.length;
	          while (len--) {
	            key = keys[len];
	            if (h.callbacksMap[key] || h.tweenOptionMap[key]) {
	              h.warn("the property \"" + key + "\" property can not be overridden on run with \"then\" chain yet");
	              delete o[key];
	            }
	          }
	        }
	        this.transformHistory(o);
	        this.tuneNewOption(o);
	        o = this.h.cloneObj(this.o);
	        this.h.extend(o, this.defaults);
	        this.history[0] = o;
	        !this.o.isDrawLess && this.setProgress(0, true);
	      } else {
	        this.tuneNewOption(this.history[0]);
	      }
	      return this.startTween();
	    };

	    Transit.prototype.transformHistory = function(o) {
	      var historyLen, i, j, key, keys, len, optionRecord, value, value2, valueKeys, valueKeys2, _results;
	      keys = Object.keys(o);
	      i = -1;
	      len = keys.length;
	      historyLen = this.history.length;
	      _results = [];
	      while (++i < len) {
	        key = keys[i];
	        j = 0;
	        _results.push((function() {
	          var _results1;
	          _results1 = [];
	          while (++j < historyLen) {
	            optionRecord = this.history[j][key];
	            if (typeof optionRecord === 'object') {
	              valueKeys = Object.keys(optionRecord);
	              value = optionRecord[valueKeys[0]];
	              delete this.history[j][key][valueKeys[0]];
	              if (typeof o[key] === 'object') {
	                valueKeys2 = Object.keys(o[key]);
	                value2 = o[key][valueKeys2[0]];
	                this.history[j][key][value2] = value;
	              } else {
	                this.history[j][key][o[key]] = value;
	              }
	              break;
	            } else {
	              _results1.push(this.history[j][key] = o[key]);
	            }
	          }
	          return _results1;
	        }).call(this));
	      }
	      return _results;
	    };

	    Transit.prototype.tuneNewOption = function(o, isForeign) {
	      if ((o != null) && (o.type != null) && o.type !== (this.o.type || this.type)) {
	        this.h.warn('Sorry, type can not be changed on run');
	        delete o.type;
	      }
	      if ((o != null) && Object.keys(o).length) {
	        this.extendDefaults(o);
	        this.resetTimeline();
	        !isForeign && this.timeline.recalcDuration();
	        this.calcSize();
	        return !isForeign && this.setElStyles();
	      }
	    };

	    Transit.prototype.startTween = function() {
	      return setTimeout(((function(_this) {
	        return function() {
	          var _ref;
	          return (_ref = _this.timeline) != null ? _ref.start() : void 0;
	        };
	      })(this)), 1);
	    };

	    Transit.prototype.resetTimeline = function() {
	      var i, key, timelineOptions, _i, _len, _ref;
	      timelineOptions = {};
	      _ref = Object.keys(this.h.tweenOptionMap);
	      for (i = _i = 0, _len = _ref.length; _i < _len; i = ++_i) {
	        key = _ref[i];
	        timelineOptions[key] = this.props[key];
	      }
	      timelineOptions.onStart = this.props.onStart;
	      timelineOptions.onComplete = this.props.onComplete;
	      return this.tween.setProp(timelineOptions);
	    };

	    Transit.prototype.getBitLength = function() {
	      this.props.bitLength = this.bit.getLength();
	      return this.props.bitLength;
	    };

	    return Transit;

	  })(bitsMap.map.bit);

	  module.exports = Transit;

	}).call(this);


/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	(function() {
	  var Tween, easing, h, t;

	  h = __webpack_require__(3);

	  t = __webpack_require__(16);

	  easing = __webpack_require__(19);

	  Tween = (function() {
	    Tween.prototype.defaults = {
	      duration: 600,
	      delay: 0,
	      repeat: 0,
	      yoyo: false,
	      easing: 'Linear.None',
	      onStart: null,
	      onComplete: null,
	      onReverseComplete: null,
	      onFirstUpdate: null,
	      onUpdate: null,
	      onFirstUpdateBackward: null,
	      isChained: false
	    };

	    function Tween(o) {
	      this.o = o != null ? o : {};
	      this.extendDefaults();
	      this.vars();
	      this;
	    }

	    Tween.prototype.vars = function() {
	      this.h = h;
	      this.progress = 0;
	      this.prevTime = 0;
	      return this.calcDimentions();
	    };

	    Tween.prototype.calcDimentions = function() {
	      this.props.time = this.props.duration + this.props.delay;
	      return this.props.repeatTime = this.props.time * (this.props.repeat + 1);
	    };

	    Tween.prototype.extendDefaults = function() {
	      var key, value, _ref;
	      this.props = {};
	      _ref = this.defaults;
	      for (key in _ref) {
	        value = _ref[key];
	        this.props[key] = this.o[key] != null ? this.o[key] : value;
	      }
	      this.props.easing = easing.parseEasing(this.o.easing || this.defaults.easing);
	      return this.onUpdate = this.props.onUpdate;
	    };

	    Tween.prototype.start = function(time) {
	      this.isCompleted = false;
	      this.isStarted = false;
	      if (time == null) {
	        time = performance.now();
	      }
	      this.props.startTime = time + this.props.delay + (this.props.shiftTime || 0);
	      this.props.endTime = this.props.startTime + this.props.repeatTime - this.props.delay;
	      return this;
	    };

	    Tween.prototype.update = function(time, isGrow) {
	      var _ref, _ref1, _ref2, _ref3, _ref4;
	      if ((time >= this.props.startTime) && (time < this.props.endTime)) {
	        this.isOnReverseComplete = false;
	        this.isCompleted = false;
	        if (!this.isFirstUpdate) {
	          if ((_ref = this.props.onFirstUpdate) != null) {
	            _ref.apply(this);
	          }
	          this.isFirstUpdate = true;
	        }
	        if (!this.isStarted) {
	          if ((_ref1 = this.props.onStart) != null) {
	            _ref1.apply(this);
	          }
	          this.isStarted = true;
	        }
	        this._updateInActiveArea(time);
	        if (time < this.prevTime && !this.isFirstUpdateBackward) {
	          if ((_ref2 = this.props.onFirstUpdateBackward) != null) {
	            _ref2.apply(this);
	          }
	          this.isFirstUpdateBackward = true;
	        }
	      } else {
	        if (time >= this.props.endTime && !this.isCompleted) {
	          this._complete();
	        }
	        if (time > this.props.endTime) {
	          this.isFirstUpdate = false;
	        }
	        if (time > this.props.endTime) {
	          this.isFirstUpdateBackward = false;
	        }
	      }
	      if (time < this.prevTime && time <= this.props.startTime) {
	        if (!this.isFirstUpdateBackward) {
	          if ((_ref3 = this.props.onFirstUpdateBackward) != null) {
	            _ref3.apply(this);
	          }
	          this.isFirstUpdateBackward = true;
	        }
	        if (isGrow) {
	          this._complete();
	        } else if (!this.isOnReverseComplete && this.isFirstUpdate) {
	          this.isOnReverseComplete = true;
	          this.setProgress(0, !this.props.isChained);
	          if ((_ref4 = this.props.onReverseComplete) != null) {
	            _ref4.apply(this);
	          }
	        }
	        this.isFirstUpdate = false;
	      }
	      this.prevTime = time;
	      return this.isCompleted;
	    };

	    Tween.prototype._complete = function() {
	      var _ref;
	      this.setProgress(1);
	      if ((_ref = this.props.onComplete) != null) {
	        _ref.apply(this);
	      }
	      this.isCompleted = true;
	      this.isStarted = false;
	      return this.isOnReverseComplete = false;
	    };

	    Tween.prototype._updateInActiveArea = function(time) {
	      var cnt, elapsed, elapsed2, proc, startPoint;
	      startPoint = this.props.startTime - this.props.delay;
	      elapsed = (time - startPoint) % (this.props.delay + this.props.duration);
	      cnt = Math.floor((time - startPoint) / (this.props.delay + this.props.duration));
	      if (startPoint + elapsed >= this.props.startTime) {
	        elapsed2 = (time - this.props.startTime) % (this.props.delay + this.props.duration);
	        proc = elapsed2 / this.props.duration;
	        return this.setProgress(!this.props.yoyo ? proc : cnt % 2 === 0 ? proc : 1 - (proc === 1 ? 0 : proc));
	      } else {
	        return this.setProgress(this.prevTime < time ? 1 : 0);
	      }
	    };

	    Tween.prototype.setProgress = function(p, isCallback) {
	      if (isCallback == null) {
	        isCallback = true;
	      }
	      this.progress = p;
	      this.easedProgress = this.props.easing(this.progress);
	      if (this.props.prevEasedProgress !== this.easedProgress && isCallback) {
	        if (typeof this.onUpdate === "function") {
	          this.onUpdate(this.easedProgress, this.progress);
	        }
	      }
	      return this.props.prevEasedProgress = this.easedProgress;
	    };

	    Tween.prototype.setProp = function(obj, value) {
	      var key, val;
	      if (typeof obj === 'object') {
	        for (key in obj) {
	          val = obj[key];
	          this.props[key] = val;
	          if (key === 'easing') {
	            this.props.easing = easing.parseEasing(this.props.easing);
	          }
	        }
	      } else if (typeof obj === 'string') {
	        if (obj === 'easing') {
	          this.props.easing = easing.parseEasing(value);
	        } else {
	          this.props[obj] = value;
	        }
	      }
	      return this.calcDimentions();
	    };

	    Tween.prototype.run = function(time) {
	      this.start(time);
	      !time && (t.add(this));
	      return this;
	    };

	    Tween.prototype.stop = function() {
	      this.pause();
	      this.setProgress(0);
	      return this;
	    };

	    Tween.prototype.pause = function() {
	      this._removeFromTweener();
	      return this;
	    };

	    Tween.prototype._removeFromTweener = function() {
	      t.remove(this);
	      return this;
	    };

	    return Tween;

	  })();

	  module.exports = Tween;

	}).call(this);


/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	(function() {
	  var Tweener, h, i, t;

	  __webpack_require__(17);

	  __webpack_require__(18);

	  h = __webpack_require__(3);

	  i = 0;

	  Tweener = (function() {
	    function Tweener() {
	      this.vars();
	      this;
	    }

	    Tweener.prototype.vars = function() {
	      this.tweens = [];
	      return this.loop = h.bind(this.loop, this);
	    };

	    Tweener.prototype.loop = function() {
	      var time;
	      if (!this.isRunning) {
	        return false;
	      }
	      time = performance.now();
	      this.update(time);
	      if (!this.tweens.length) {
	        return this.isRunning = false;
	      }
	      requestAnimationFrame(this.loop);
	      return this;
	    };

	    Tweener.prototype.startLoop = function() {
	      if (this.isRunning) {
	        return;
	      }
	      this.isRunning = true;
	      return requestAnimationFrame(this.loop);
	    };

	    Tweener.prototype.stopLoop = function() {
	      return this.isRunning = false;
	    };

	    Tweener.prototype.update = function(time) {
	      var _results;
	      i = this.tweens.length;
	      _results = [];
	      while (i--) {
	        if (this.tweens[i].update(time) === true) {
	          _results.push(this.remove(i));
	        } else {
	          _results.push(void 0);
	        }
	      }
	      return _results;
	    };

	    Tweener.prototype.add = function(tween) {
	      this.tweens.push(tween);
	      return this.startLoop();
	    };

	    Tweener.prototype.removeAll = function() {
	      return this.tweens.length = 0;
	    };

	    Tweener.prototype.remove = function(tween) {
	      var index;
	      index = typeof tween === 'number' ? tween : this.tweens.indexOf(tween);
	      if (index !== -1) {
	        return this.tweens.splice(index, 1);
	      }
	    };

	    return Tweener;

	  })();

	  t = new Tweener;

	  module.exports = t;

	}).call(this);


/***/ },
/* 17 */
/***/ function(module, exports) {

	
	/* istanbul ignore next */

	(function() {
	  (function() {
	    'use strict';
	    var cancel, i, isOldBrowser, lastTime, vendors, vp, w;
	    vendors = ['webkit', 'moz'];
	    i = 0;
	    w = window;
	    while (i < vendors.length && !w.requestAnimationFrame) {
	      vp = vendors[i];
	      w.requestAnimationFrame = w[vp + 'RequestAnimationFrame'];
	      cancel = w[vp + 'CancelAnimationFrame'];
	      w.cancelAnimationFrame = cancel || w[vp + 'CancelRequestAnimationFrame'];
	      ++i;
	    }
	    isOldBrowser = !w.requestAnimationFrame || !w.cancelAnimationFrame;
	    if (/iP(ad|hone|od).*OS 6/.test(w.navigator.userAgent) || isOldBrowser) {
	      lastTime = 0;
	      w.requestAnimationFrame = function(callback) {
	        var nextTime, now;
	        now = Date.now();
	        nextTime = Math.max(lastTime + 16, now);
	        return setTimeout((function() {
	          callback(lastTime = nextTime);
	        }), nextTime - now);
	      };
	      w.cancelAnimationFrame = clearTimeout;
	    }
	  })();

	}).call(this);


/***/ },
/* 18 */
/***/ function(module, exports) {

	
	/* istanbul ignore next */

	(function() {
	  (function(root) {
	    var offset, _ref, _ref1;
	    if (root.performance == null) {
	      root.performance = {};
	    }
	    Date.now = Date.now || function() {
	      return (new Date).getTime();
	    };
	    if (root.performance.now == null) {
	      offset = ((_ref = root.performance) != null ? (_ref1 = _ref.timing) != null ? _ref1.navigationStart : void 0 : void 0) ? performance.timing.navigationStart : Date.now();
	      return root.performance.now = function() {
	        return Date.now() - offset;
	      };
	    }
	  })(window);

	}).call(this);


/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	(function() {
	  var Easing, PathEasing, bezier, easing, h, mix;

	  bezier = __webpack_require__(20);

	  PathEasing = __webpack_require__(21);

	  mix = __webpack_require__(22);

	  h = __webpack_require__(3);

	  Easing = (function() {
	    function Easing() {}

	    Easing.prototype.bezier = bezier;

	    Easing.prototype.PathEasing = PathEasing;

	    Easing.prototype.path = (new PathEasing('creator')).create;

	    Easing.prototype.inverse = function(p) {
	      return 1 - p;
	    };

	    Easing.prototype.linear = {
	      none: function(k) {
	        return k;
	      }
	    };

	    Easing.prototype.ease = {
	      "in": bezier.apply(Easing, [0.42, 0, 1, 1]),
	      out: bezier.apply(Easing, [0, 0, 0.58, 1]),
	      inout: bezier.apply(Easing, [0.42, 0, 0.58, 1])
	    };

	    Easing.prototype.quad = {
	      "in": function(k) {
	        return k * k;
	      },
	      out: function(k) {
	        return k * (2 - k);
	      },
	      inout: function(k) {
	        if ((k *= 2) < 1) {
	          return 0.5 * k * k;
	        }
	        return -0.5 * (--k * (k - 2) - 1);
	      }
	    };

	    Easing.prototype.cubic = {
	      "in": function(k) {
	        return k * k * k;
	      },
	      out: function(k) {
	        return --k * k * k + 1;
	      },
	      inout: function(k) {
	        if ((k *= 2) < 1) {
	          return 0.5 * k * k * k;
	        }
	        return 0.5 * ((k -= 2) * k * k + 2);
	      }
	    };

	    Easing.prototype.quart = {
	      "in": function(k) {
	        return k * k * k * k;
	      },
	      out: function(k) {
	        return 1 - (--k * k * k * k);
	      },
	      inout: function(k) {
	        if ((k *= 2) < 1) {
	          return 0.5 * k * k * k * k;
	        }
	        return -0.5 * ((k -= 2) * k * k * k - 2);
	      }
	    };

	    Easing.prototype.quint = {
	      "in": function(k) {
	        return k * k * k * k * k;
	      },
	      out: function(k) {
	        return --k * k * k * k * k + 1;
	      },
	      inout: function(k) {
	        if ((k *= 2) < 1) {
	          return 0.5 * k * k * k * k * k;
	        }
	        return 0.5 * ((k -= 2) * k * k * k * k + 2);
	      }
	    };

	    Easing.prototype.sin = {
	      "in": function(k) {
	        return 1 - Math.cos(k * Math.PI / 2);
	      },
	      out: function(k) {
	        return Math.sin(k * Math.PI / 2);
	      },
	      inout: function(k) {
	        return 0.5 * (1 - Math.cos(Math.PI * k));
	      }
	    };

	    Easing.prototype.expo = {
	      "in": function(k) {
	        if (k === 0) {
	          return 0;
	        } else {
	          return Math.pow(1024, k - 1);
	        }
	      },
	      out: function(k) {
	        if (k === 1) {
	          return 1;
	        } else {
	          return 1 - Math.pow(2, -10 * k);
	        }
	      },
	      inout: function(k) {
	        if (k === 0) {
	          return 0;
	        }
	        if (k === 1) {
	          return 1;
	        }
	        if ((k *= 2) < 1) {
	          return 0.5 * Math.pow(1024, k - 1);
	        }
	        return 0.5 * (-Math.pow(2, -10 * (k - 1)) + 2);
	      }
	    };

	    Easing.prototype.circ = {
	      "in": function(k) {
	        return 1 - Math.sqrt(1 - k * k);
	      },
	      out: function(k) {
	        return Math.sqrt(1 - (--k * k));
	      },
	      inout: function(k) {
	        if ((k *= 2) < 1) {
	          return -0.5 * (Math.sqrt(1 - k * k) - 1);
	        }
	        return 0.5 * (Math.sqrt(1 - (k -= 2) * k) + 1);
	      }
	    };

	    Easing.prototype.back = {
	      "in": function(k) {
	        var s;
	        s = 1.70158;
	        return k * k * ((s + 1) * k - s);
	      },
	      out: function(k) {
	        var s;
	        s = 1.70158;
	        return --k * k * ((s + 1) * k + s) + 1;
	      },
	      inout: function(k) {
	        var s;
	        s = 1.70158 * 1.525;
	        if ((k *= 2) < 1) {
	          return 0.5 * (k * k * ((s + 1) * k - s));
	        }
	        return 0.5 * ((k -= 2) * k * ((s + 1) * k + s) + 2);
	      }
	    };

	    Easing.prototype.elastic = {
	      "in": function(k) {
	        var a, p, s;
	        s = void 0;
	        p = 0.4;
	        if (k === 0) {
	          return 0;
	        }
	        if (k === 1) {
	          return 1;
	        }
	        a = 1;
	        s = p / 4;
	        return -(a * Math.pow(2, 10 * (k -= 1)) * Math.sin((k - s) * (2 * Math.PI) / p));
	      },
	      out: function(k) {
	        var a, p, s;
	        s = void 0;
	        p = 0.4;
	        if (k === 0) {
	          return 0;
	        }
	        if (k === 1) {
	          return 1;
	        }
	        a = 1;
	        s = p / 4;
	        return a * Math.pow(2, -10 * k) * Math.sin((k - s) * (2 * Math.PI) / p) + 1;
	      },
	      inout: function(k) {
	        var a, p, s;
	        s = void 0;
	        p = 0.4;
	        if (k === 0) {
	          return 0;
	        }
	        if (k === 1) {
	          return 1;
	        }
	        a = 1;
	        s = p / 4;
	        if ((k *= 2) < 1) {
	          return -0.5 * (a * Math.pow(2, 10 * (k -= 1)) * Math.sin((k - s) * (2 * Math.PI) / p));
	        }
	        return a * Math.pow(2, -10 * (k -= 1)) * Math.sin((k - s) * (2 * Math.PI) / p) * 0.5 + 1;
	      }
	    };

	    Easing.prototype.bounce = {
	      "in": function(k) {
	        return 1 - easing.bounce.out(1 - k);
	      },
	      out: function(k) {
	        if (k < (1 / 2.75)) {
	          return 7.5625 * k * k;
	        } else if (k < (2 / 2.75)) {
	          return 7.5625 * (k -= 1.5 / 2.75) * k + 0.75;
	        } else if (k < (2.5 / 2.75)) {
	          return 7.5625 * (k -= 2.25 / 2.75) * k + 0.9375;
	        } else {
	          return 7.5625 * (k -= 2.625 / 2.75) * k + 0.984375;
	        }
	      },
	      inout: function(k) {
	        if (k < 0.5) {
	          return easing.bounce["in"](k * 2) * 0.5;
	        }
	        return easing.bounce.out(k * 2 - 1) * 0.5 + 0.5;
	      }
	    };

	    Easing.prototype.parseEasing = function(easing) {
	      var type;
	      type = typeof easing;
	      if (type === 'string') {
	        if (easing.charAt(0).toLowerCase() === 'm') {
	          return this.path(easing);
	        } else {
	          easing = this._splitEasing(easing);
	          return this[easing[0]][easing[1]];
	        }
	      }
	      if (h.isArray(easing)) {
	        return this.bezier.apply(this, easing);
	      }
	      if ('function') {
	        return easing;
	      }
	    };

	    Easing.prototype._splitEasing = function(string) {
	      var firstPart, secondPart, split;
	      if (typeof string === 'function') {
	        return string;
	      }
	      if (typeof string === 'string' && string.length) {
	        split = string.split('.');
	        firstPart = split[0].toLowerCase() || 'linear';
	        secondPart = split[1].toLowerCase() || 'none';
	        return [firstPart, secondPart];
	      } else {
	        return ['linear', 'none'];
	      }
	    };

	    return Easing;

	  })();

	  easing = new Easing;

	  easing.mix = mix(easing);

	  module.exports = easing;

	}).call(this);


/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {(function() {
	  var BezierEasing, bezierEasing, h,
	    __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

	  h = __webpack_require__(3);


	  /**
	   * Copyright (c) 2014 Gaëtan Renaudeau http://goo.gl/El3k7u
	   * Adopted from https://github.com/gre/bezier-easing
	   */

	  BezierEasing = (function() {
	    function BezierEasing(o) {
	      this.vars();
	      return this.generate;
	    }

	    BezierEasing.prototype.vars = function() {
	      return this.generate = h.bind(this.generate, this);
	    };

	    BezierEasing.prototype.generate = function(mX1, mY1, mX2, mY2) {
	      var A, B, C, NEWTON_ITERATIONS, NEWTON_MIN_SLOPE, SUBDIVISION_MAX_ITERATIONS, SUBDIVISION_PRECISION, arg, binarySubdivide, calcBezier, calcSampleValues, f, float32ArraySupported, getSlope, getTForX, i, kSampleStepSize, kSplineTableSize, mSampleValues, newtonRaphsonIterate, precompute, str, _i, _precomputed;
	      if (arguments.length < 4) {
	        return this.error('Bezier function expects 4 arguments');
	      }
	      for (i = _i = 0; _i < 4; i = ++_i) {
	        arg = arguments[i];
	        if (typeof arg !== "number" || isNaN(arg) || !isFinite(arg)) {
	          return this.error('Bezier function expects 4 arguments');
	        }
	      }
	      if (mX1 < 0 || mX1 > 1 || mX2 < 0 || mX2 > 1) {
	        return this.error('Bezier x values should be > 0 and < 1');
	      }
	      NEWTON_ITERATIONS = 4;
	      NEWTON_MIN_SLOPE = 0.001;
	      SUBDIVISION_PRECISION = 0.0000001;
	      SUBDIVISION_MAX_ITERATIONS = 10;
	      kSplineTableSize = 11;
	      kSampleStepSize = 1.0 / (kSplineTableSize - 1.0);
	      float32ArraySupported = __indexOf.call(global, 'Float32Array') >= 0;
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
	        var currentSlope, currentX;
	        i = 0;
	        while (i < NEWTON_ITERATIONS) {
	          currentSlope = getSlope(aGuessT, mX1, mX2);

	          /* istanbul ignore if */
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
	        i = 0;
	        while (i < kSplineTableSize) {
	          mSampleValues[i] = calcBezier(i * kSampleStepSize, mX1, mX2);
	          ++i;
	        }
	      };

	      /* istanbul ignore next */
	      binarySubdivide = function(aX, aA, aB) {
	        var currentT, currentX, isBig;
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
	          isBig = Math.abs(currentX) > SUBDIVISION_PRECISION;
	          if (!(isBig && ++i < SUBDIVISION_MAX_ITERATIONS)) {
	            break;
	          }
	        }
	        return currentT;
	      };
	      getTForX = function(aX) {
	        var currentSample, delta, dist, guessForT, initialSlope, intervalStart, lastSample;
	        intervalStart = 0.0;
	        currentSample = 1;
	        lastSample = kSplineTableSize - 1;
	        while (currentSample !== lastSample && mSampleValues[currentSample] <= aX) {
	          intervalStart += kSampleStepSize;
	          ++currentSample;
	        }
	        --currentSample;
	        delta = mSampleValues[currentSample + 1] - mSampleValues[currentSample];
	        dist = (aX - mSampleValues[currentSample]) / delta;
	        guessForT = intervalStart + dist * kSampleStepSize;
	        initialSlope = getSlope(guessForT, mX1, mX2);
	        if (initialSlope >= NEWTON_MIN_SLOPE) {
	          return newtonRaphsonIterate(aX, guessForT);
	        } else {

	          /* istanbul ignore next */
	          if (initialSlope === 0.0) {
	            return guessForT;
	          } else {
	            return binarySubdivide(aX, intervalStart, intervalStart + kSampleStepSize);
	          }
	        }
	      };
	      precompute = function() {
	        var _precomputed;
	        _precomputed = true;
	        if (mX1 !== mY1 || mX2 !== mY2) {
	          return calcSampleValues();
	        }
	      };
	      mSampleValues = !float32ArraySupported ? new Array(kSplineTableSize) : new Float32Array(kSplineTableSize);
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
	      str = "bezier(" + [mX1, mY1, mX2, mY2] + ")";
	      f.toStr = function() {
	        return str;
	      };
	      return f;
	    };

	    BezierEasing.prototype.error = function(msg) {
	      return h.error(msg);
	    };

	    return BezierEasing;

	  })();

	  bezierEasing = new BezierEasing;

	  module.exports = bezierEasing;

	}).call(this);

	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	(function() {
	  var PathEasing, h;

	  h = __webpack_require__(3);

	  PathEasing = (function() {
	    PathEasing.prototype._vars = function() {
	      this._precompute = h.clamp(this.o.precompute || 140, 100, 10000);
	      this._step = 1 / this._precompute;
	      this._rect = this.o.rect || 100;
	      this._approximateMax = this.o.approximateMax || 5;
	      this._eps = this.o.eps || 0.01;
	      return this._boundsPrevProgress = -1;
	    };

	    function PathEasing(path, o) {
	      this.o = o != null ? o : {};
	      if (path === 'creator') {
	        return;
	      }
	      this.path = h.parsePath(path);
	      if (this.path == null) {
	        return h.error('Error while parsing the path');
	      }
	      this.path.setAttribute('d', this._normalizePath(this.path.getAttribute('d')));
	      this.pathLength = this.path.getTotalLength();
	      this.sample = h.bind(this.sample, this);
	      this._hardSample = h.bind(this._hardSample, this);
	      this._vars();
	      this._preSample();
	      this;
	    }

	    PathEasing.prototype._preSample = function() {
	      var i, length, point, progress, _i, _ref, _results;
	      this._samples = [];
	      _results = [];
	      for (i = _i = 0, _ref = this._precompute; 0 <= _ref ? _i <= _ref : _i >= _ref; i = 0 <= _ref ? ++_i : --_i) {
	        progress = i * this._step;
	        length = this.pathLength * progress;
	        point = this.path.getPointAtLength(length);
	        _results.push(this._samples[i] = {
	          point: point,
	          length: length,
	          progress: progress
	        });
	      }
	      return _results;
	    };

	    PathEasing.prototype._findBounds = function(array, p) {
	      var buffer, direction, end, i, len, loopEnd, pointP, pointX, start, value, _i, _ref;
	      if (p === this._boundsPrevProgress) {
	        return this._prevBounds;
	      }
	      if (this._boundsStartIndex == null) {
	        this._boundsStartIndex = 0;
	      }
	      len = array.length;
	      if (this._boundsPrevProgress > p) {
	        loopEnd = 0;
	        direction = 'reverse';
	      } else {
	        loopEnd = len;
	        direction = 'forward';
	      }
	      if (direction === 'forward') {
	        start = array[0];
	        end = array[array.length - 1];
	      } else {
	        start = array[array.length - 1];
	        end = array[0];
	      }
	      for (i = _i = _ref = this._boundsStartIndex; _ref <= loopEnd ? _i < loopEnd : _i > loopEnd; i = _ref <= loopEnd ? ++_i : --_i) {
	        value = array[i];
	        pointX = value.point.x / this._rect;
	        pointP = p;
	        if (direction === 'reverse') {
	          buffer = pointX;
	          pointX = pointP;
	          pointP = buffer;
	        }
	        if (pointX < pointP) {
	          start = value;
	          this._boundsStartIndex = i;
	        } else {
	          end = value;
	          break;
	        }
	      }
	      this._boundsPrevProgress = p;
	      return this._prevBounds = {
	        start: start,
	        end: end
	      };
	    };

	    PathEasing.prototype.sample = function(p) {
	      var bounds, res;
	      p = h.clamp(p, 0, 1);
	      bounds = this._findBounds(this._samples, p);
	      res = this._checkIfBoundsCloseEnough(p, bounds);
	      if (res != null) {
	        return res;
	      }
	      return this._findApproximate(p, bounds.start, bounds.end);
	    };

	    PathEasing.prototype._checkIfBoundsCloseEnough = function(p, bounds) {
	      var point, y;
	      point = void 0;
	      y = this._checkIfPointCloseEnough(p, bounds.start.point);
	      if (y != null) {
	        return y;
	      }
	      return this._checkIfPointCloseEnough(p, bounds.end.point);
	    };

	    PathEasing.prototype._checkIfPointCloseEnough = function(p, point) {
	      if (h.closeEnough(p, point.x / this._rect, this._eps)) {
	        return this._resolveY(point);
	      }
	    };

	    PathEasing.prototype._approximate = function(start, end, p) {
	      var deltaP, percentP;
	      deltaP = end.point.x - start.point.x;
	      percentP = (p - (start.point.x / 100)) / (deltaP / 100);
	      return start.length + percentP * (end.length - start.length);
	    };

	    PathEasing.prototype._findApproximate = function(p, start, end, approximateMax) {
	      var approximation, args, newPoint, point, x;
	      if (approximateMax == null) {
	        approximateMax = this._approximateMax;
	      }
	      approximation = this._approximate(start, end, p);
	      point = this.path.getPointAtLength(approximation);
	      x = point.x / 100;
	      if (h.closeEnough(p, x, this._eps)) {
	        return this._resolveY(point);
	      } else {
	        if (--approximateMax < 1) {
	          return this._resolveY(point);
	        }
	        newPoint = {
	          point: point,
	          length: approximation
	        };
	        args = p < x ? [p, start, newPoint, approximateMax] : [p, newPoint, end, approximateMax];
	        return this._findApproximate.apply(this, args);
	      }
	    };

	    PathEasing.prototype._resolveY = function(point) {
	      return 1 - (point.y / this._rect);
	    };

	    PathEasing.prototype._normalizePath = function(path) {
	      var commands, endIndex, normalizedPath, points, startIndex, svgCommandsRegexp;
	      svgCommandsRegexp = /[M|L|H|V|C|S|Q|T|A]/gim;
	      points = path.split(svgCommandsRegexp);
	      points.shift();
	      commands = path.match(svgCommandsRegexp);
	      startIndex = 0;
	      points[startIndex] = this._normalizeSegment(points[startIndex]);
	      endIndex = points.length - 1;
	      points[endIndex] = this._normalizeSegment(points[endIndex], this._rect || 100);
	      return normalizedPath = this._joinNormalizedPath(commands, points);
	    };

	    PathEasing.prototype._joinNormalizedPath = function(commands, points) {
	      var command, i, normalizedPath, space, _i, _len;
	      normalizedPath = '';
	      for (i = _i = 0, _len = commands.length; _i < _len; i = ++_i) {
	        command = commands[i];
	        space = i === 0 ? '' : ' ';
	        normalizedPath += "" + space + command + (points[i].trim());
	      }
	      return normalizedPath;
	    };

	    PathEasing.prototype._normalizeSegment = function(segment, value) {
	      var i, lastPoint, nRgx, pairs, parsedX, point, space, x, _i, _len;
	      if (value == null) {
	        value = 0;
	      }
	      segment = segment.trim();
	      nRgx = /(-|\+)?((\d+(\.(\d|\e(-|\+)?)+)?)|(\.?(\d|\e|(\-|\+))+))/gim;
	      pairs = this._getSegmentPairs(segment.match(nRgx));
	      lastPoint = pairs[pairs.length - 1];
	      x = lastPoint[0];
	      parsedX = Number(x);
	      if (parsedX !== value) {
	        segment = '';
	        lastPoint[0] = value;
	        for (i = _i = 0, _len = pairs.length; _i < _len; i = ++_i) {
	          point = pairs[i];
	          space = i === 0 ? '' : ' ';
	          segment += "" + space + point[0] + "," + point[1];
	        }
	      }
	      return segment;
	    };

	    PathEasing.prototype._getSegmentPairs = function(array) {
	      var i, newArray, pair, value, _i, _len;
	      if (array.length % 2 !== 0) {
	        h.error('Failed to parse the path - segment pairs are not even.', array);
	      }
	      newArray = [];
	      for (i = _i = 0, _len = array.length; _i < _len; i = _i += 2) {
	        value = array[i];
	        pair = [array[i], array[i + 1]];
	        newArray.push(pair);
	      }
	      return newArray;
	    };

	    PathEasing.prototype.create = function(path, o) {
	      var handler;
	      handler = new PathEasing(path, o);
	      handler.sample.path = handler.path;
	      return handler.sample;
	    };

	    return PathEasing;

	  })();

	  module.exports = PathEasing;

	}).call(this);


/***/ },
/* 22 */
/***/ function(module, exports) {

	(function() {
	  var create, easing, getNearest, mix, parseIfEasing, sort,
	    __slice = [].slice;

	  easing = null;

	  parseIfEasing = function(item) {
	    if (typeof item.value === 'number') {
	      return item.value;
	    } else {
	      return easing.parseEasing(item.value);
	    }
	  };

	  sort = function(a, b) {
	    var returnValue;
	    a.value = parseIfEasing(a);
	    b.value = parseIfEasing(b);
	    returnValue = 0;
	    a.to < b.to && (returnValue = -1);
	    a.to > b.to && (returnValue = 1);
	    return returnValue;
	  };

	  getNearest = function(array, progress) {
	    var i, index, value, _i, _len;
	    index = 0;
	    for (i = _i = 0, _len = array.length; _i < _len; i = ++_i) {
	      value = array[i];
	      index = i;
	      if (value.to > progress) {
	        break;
	      }
	    }
	    return index;
	  };

	  mix = function() {
	    var args;
	    args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
	    if (args.length > 1) {
	      args = args.sort(sort);
	    } else {
	      args[0].value = parseIfEasing(args[0]);
	    }
	    return function(progress) {
	      var index, value;
	      index = getNearest(args, progress);
	      if (index !== -1) {
	        value = args[index].value;
	        if (index === args.length - 1 && progress > args[index].to) {
	          return 1;
	        }
	        if (typeof value === 'function') {
	          return value(progress);
	        } else {
	          return value;
	        }
	      }
	    };
	  };

	  create = function(e) {
	    easing = e;
	    return mix;
	  };

	  module.exports = create;

	}).call(this);


/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	(function() {
	  var Timeline, h, t,
	    __slice = [].slice;

	  h = __webpack_require__(3);

	  t = __webpack_require__(16);

	  Timeline = (function() {
	    Timeline.prototype.state = 'stop';

	    Timeline.prototype.defaults = {
	      repeat: 0,
	      delay: 0
	    };

	    function Timeline(o) {
	      this.o = o != null ? o : {};
	      this.vars();
	      this._extendDefaults();
	      this;
	    }

	    Timeline.prototype.vars = function() {
	      this.timelines = [];
	      this.props = {
	        time: 0,
	        repeatTime: 0,
	        shiftedRepeatTime: 0
	      };
	      this.loop = h.bind(this.loop, this);
	      return this.onUpdate = this.o.onUpdate;
	    };

	    Timeline.prototype.add = function() {
	      var args;
	      args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
	      this.pushTimelineArray(args);
	      return this;
	    };

	    Timeline.prototype.pushTimelineArray = function(array) {
	      var i, tm, _i, _len, _results;
	      _results = [];
	      for (i = _i = 0, _len = array.length; _i < _len; i = ++_i) {
	        tm = array[i];
	        if (h.isArray(tm)) {
	          _results.push(this.pushTimelineArray(tm));
	        } else {
	          _results.push(this.pushTimeline(tm));
	        }
	      }
	      return _results;
	    };

	    Timeline.prototype._extendDefaults = function() {
	      var key, value, _ref, _results;
	      _ref = this.defaults;
	      _results = [];
	      for (key in _ref) {
	        value = _ref[key];
	        _results.push(this.props[key] = this.o[key] != null ? this.o[key] : value);
	      }
	      return _results;
	    };

	    Timeline.prototype.setProp = function(props) {
	      var key, value;
	      for (key in props) {
	        value = props[key];
	        this.props[key] = value;
	      }
	      return this.recalcDuration();
	    };

	    Timeline.prototype.pushTimeline = function(timeline, shift) {
	      if (timeline.timeline instanceof Timeline) {
	        timeline = timeline.timeline;
	      }
	      (shift != null) && timeline.setProp({
	        'shiftTime': shift
	      });
	      this.timelines.push(timeline);
	      return this._recalcTimelineDuration(timeline);
	    };

	    Timeline.prototype.remove = function(timeline) {
	      var index;
	      index = this.timelines.indexOf(timeline);
	      if (index !== -1) {
	        return this.timelines.splice(index, 1);
	      }
	    };

	    Timeline.prototype.append = function() {
	      var i, timeline, tm, _i, _len;
	      timeline = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
	      for (i = _i = 0, _len = timeline.length; _i < _len; i = ++_i) {
	        tm = timeline[i];
	        if (h.isArray(tm)) {
	          this._appendTimelineArray(tm);
	        } else {
	          this.appendTimeline(tm, this.timelines.length);
	        }
	      }
	      return this;
	    };

	    Timeline.prototype._appendTimelineArray = function(timelineArray) {
	      var i, len, time, _results;
	      i = timelineArray.length;
	      time = this.props.repeatTime - this.props.delay;
	      len = this.timelines.length;
	      _results = [];
	      while (i--) {
	        _results.push(this.appendTimeline(timelineArray[i], len, time));
	      }
	      return _results;
	    };

	    Timeline.prototype.appendTimeline = function(timeline, index, time) {
	      var shift;
	      shift = (time != null ? time : this.props.time);
	      shift += timeline.props.shiftTime || 0;
	      timeline.index = index;
	      return this.pushTimeline(timeline, shift);
	    };

	    Timeline.prototype.recalcDuration = function() {
	      var len, _results;
	      len = this.timelines.length;
	      this.props.time = 0;
	      this.props.repeatTime = 0;
	      this.props.shiftedRepeatTime = 0;
	      _results = [];
	      while (len--) {
	        _results.push(this._recalcTimelineDuration(this.timelines[len]));
	      }
	      return _results;
	    };

	    Timeline.prototype._recalcTimelineDuration = function(timeline) {
	      var timelineTime;
	      timelineTime = timeline.props.repeatTime + (timeline.props.shiftTime || 0);
	      this.props.time = Math.max(timelineTime, this.props.time);
	      this.props.repeatTime = (this.props.time + this.props.delay) * (this.props.repeat + 1);
	      this.props.shiftedRepeatTime = this.props.repeatTime + (this.props.shiftTime || 0);
	      return this.props.shiftedRepeatTime -= this.props.delay;
	    };

	    Timeline.prototype.update = function(time, isGrow) {
	      if (time > this.props.endTime) {
	        time = this.props.endTime;
	      }
	      this._updateTimelines(time, isGrow);
	      return this._checkCallbacks(time);
	    };

	    Timeline.prototype._updateTimelines = function(time, isGrow) {
	      var elapsed, i, len, startPoint, timeToTimelines;
	      startPoint = this.props.startTime - this.props.delay;
	      elapsed = (time - startPoint) % (this.props.delay + this.props.time);
	      timeToTimelines = time === this.props.endTime ? this.props.endTime : startPoint + elapsed >= this.props.startTime ? time >= this.props.endTime ? this.props.endTime : startPoint + elapsed : time > this.props.startTime + this.props.time ? this.props.startTime + this.props.time : null;
	      if (timeToTimelines != null) {
	        i = -1;
	        len = this.timelines.length - 1;
	        while (i++ < len) {
	          if (isGrow == null) {
	            isGrow = time > (this._previousUpdateTime || 0);
	          }
	          this.timelines[i].update(timeToTimelines, isGrow);
	        }
	      }
	      return this._previousUpdateTime = time;
	    };

	    Timeline.prototype._checkCallbacks = function(time) {
	      var _ref, _ref1, _ref2;
	      if (this.prevTime === time) {
	        return;
	      }
	      if (!this.prevTime || this.isCompleted && !this.isStarted) {
	        if ((_ref = this.o.onStart) != null) {
	          _ref.apply(this);
	        }
	        this.isStarted = true;
	        this.isCompleted = false;
	      }
	      if (time >= this.props.startTime && time < this.props.endTime) {
	        if (typeof this.onUpdate === "function") {
	          this.onUpdate((time - this.props.startTime) / this.props.repeatTime);
	        }
	      }
	      if (this.prevTime > time && time <= this.props.startTime) {
	        if ((_ref1 = this.o.onReverseComplete) != null) {
	          _ref1.apply(this);
	        }
	      }
	      this.prevTime = time;
	      if (time === this.props.endTime && !this.isCompleted) {
	        if (typeof this.onUpdate === "function") {
	          this.onUpdate(1);
	        }
	        if ((_ref2 = this.o.onComplete) != null) {
	          _ref2.apply(this);
	        }
	        this.isCompleted = true;
	        this.isStarted = false;
	        return true;
	      }
	    };

	    Timeline.prototype.start = function(time) {
	      this.setStartTime(time);
	      !time && (t.add(this), this.state = 'play');
	      return this;
	    };

	    Timeline.prototype.pause = function() {
	      this.removeFromTweener();
	      this.state = 'pause';
	      return this;
	    };

	    Timeline.prototype.stop = function() {
	      this.removeFromTweener();
	      this.setProgress(0);
	      this.state = 'stop';
	      return this;
	    };

	    Timeline.prototype.restart = function() {
	      this.stop();
	      return this.start();
	    };

	    Timeline.prototype.removeFromTweener = function() {
	      t.remove(this);
	      return this;
	    };

	    Timeline.prototype.setStartTime = function(time) {
	      this.getDimentions(time);
	      return this.startTimelines(this.props.startTime);
	    };

	    Timeline.prototype.startTimelines = function(time) {
	      var i, _results;
	      i = this.timelines.length;
	      (time == null) && (time = this.props.startTime);
	      _results = [];
	      while (i--) {
	        _results.push(this.timelines[i].start(time));
	      }
	      return _results;
	    };

	    Timeline.prototype.setProgress = function(progress) {
	      if (this.props.startTime == null) {
	        this.setStartTime();
	      }
	      progress = h.clamp(progress, 0, 1);
	      return this.update(this.props.startTime + progress * this.props.repeatTime);
	    };

	    Timeline.prototype.getDimentions = function(time) {
	      if (time == null) {
	        time = performance.now();
	      }
	      this.props.startTime = time + this.props.delay + (this.props.shiftTime || 0);
	      this.props.endTime = this.props.startTime + this.props.shiftedRepeatTime;
	      return this.props.endTime -= this.props.shiftTime || 0;
	    };

	    return Timeline;

	  })();

	  module.exports = Timeline;

	}).call(this);


/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	
	/* istanbul ignore next */

	(function() {
	  var Swirl, Transit,
	    __hasProp = {}.hasOwnProperty,
	    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

	  Transit = __webpack_require__(14);

	  Swirl = (function(_super) {
	    __extends(Swirl, _super);

	    function Swirl() {
	      return Swirl.__super__.constructor.apply(this, arguments);
	    }

	    Swirl.prototype.skipPropsDelta = {
	      x: 1,
	      y: 1
	    };

	    Swirl.prototype.vars = function() {
	      Swirl.__super__.vars.apply(this, arguments);
	      return !this.o.isSwirlLess && this.generateSwirl();
	    };

	    Swirl.prototype.extendDefaults = function() {
	      var angle, x, y, _base;
	      Swirl.__super__.extendDefaults.apply(this, arguments);
	      x = this.getPosValue('x');
	      y = this.getPosValue('y');
	      angle = 90 + Math.atan((y.delta / x.delta) || 0) * (180 / Math.PI);
	      if (x.delta < 0) {
	        angle += 180;
	      }
	      this.positionDelta = {
	        radius: Math.sqrt(x.delta * x.delta + y.delta * y.delta),
	        angle: angle,
	        x: x,
	        y: y
	      };
	      if ((_base = this.o).radiusScale == null) {
	        _base.radiusScale = 1;
	      }
	      this.props.angleShift = this.h.parseIfRand(this.o.angleShift || 0);
	      return this.props.radiusScale = this.h.parseIfRand(this.o.radiusScale);
	    };

	    Swirl.prototype.getPosValue = function(name) {
	      var optVal, val;
	      optVal = this.o[name];
	      if (optVal && typeof optVal === 'object') {
	        val = this.h.parseDelta(name, optVal);
	        return {
	          start: val.start.value,
	          end: val.end.value,
	          delta: val.delta,
	          units: val.end.unit
	        };
	      } else {
	        val = parseFloat(optVal || this.defaults[name]);
	        return {
	          start: val,
	          end: val,
	          delta: 0,
	          units: 'px'
	        };
	      }
	    };

	    Swirl.prototype.setProgress = function(progress) {
	      var angle, point, x, y;
	      angle = this.positionDelta.angle;
	      if (this.o.isSwirl) {
	        angle += this.getSwirl(progress);
	      }
	      point = this.h.getRadialPoint({
	        angle: angle,
	        radius: this.positionDelta.radius * progress * this.props.radiusScale,
	        center: {
	          x: this.positionDelta.x.start,
	          y: this.positionDelta.y.start
	        }
	      });
	      x = point.x.toFixed(4);
	      y = point.y.toFixed(4);
	      this.props.x = this.o.ctx ? x : x + this.positionDelta.x.units;
	      this.props.y = this.o.ctx ? y : y + this.positionDelta.y.units;
	      return Swirl.__super__.setProgress.apply(this, arguments);
	    };

	    Swirl.prototype.generateSwirl = function() {
	      var _base, _base1;
	      this.props.signRand = Math.round(this.h.rand(0, 1)) ? -1 : 1;
	      if ((_base = this.o).swirlSize == null) {
	        _base.swirlSize = 10;
	      }
	      if ((_base1 = this.o).swirlFrequency == null) {
	        _base1.swirlFrequency = 3;
	      }
	      this.props.swirlSize = this.h.parseIfRand(this.o.swirlSize);
	      return this.props.swirlFrequency = this.h.parseIfRand(this.o.swirlFrequency);
	    };

	    Swirl.prototype.getSwirl = function(progress) {
	      return this.props.signRand * this.props.swirlSize * Math.sin(this.props.swirlFrequency * progress);
	    };

	    return Swirl;

	  })(Transit);

	  module.exports = Swirl;

	}).call(this);


/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	
	/* istanbul ignore next */

	(function() {
	  var Stagger, StaggerWrapper, Timeline, h;

	  h = __webpack_require__(3);

	  Timeline = __webpack_require__(23);

	  Stagger = (function() {
	    function Stagger(options, Module) {
	      this.init(options, Module);
	    }

	    Stagger.prototype._getOptionByMod = function(name, i, store) {
	      var props, value;
	      props = store[name];
	      if (props + '' === '[object NodeList]') {
	        props = Array.prototype.slice.call(props, 0);
	      }
	      value = h.isArray(props) ? props[i % props.length] : props;
	      return h.parseIfStagger(value, i);
	    };

	    Stagger.prototype._getOptionByIndex = function(i, store) {
	      var key, options, value;
	      options = {};
	      for (key in store) {
	        value = store[key];
	        options[key] = this._getOptionByMod(key, i, store);
	      }
	      return options;
	    };

	    Stagger.prototype._getChildQuantity = function(name, store) {
	      var quantifier;
	      if (typeof name === 'number') {
	        return name;
	      }
	      quantifier = store[name];
	      if (h.isArray(quantifier)) {
	        return quantifier.length;
	      } else if (quantifier + '' === '[object NodeList]') {
	        return quantifier.length;
	      } else if (quantifier instanceof HTMLElement) {
	        return 1;
	      } else if (typeof quantifier === 'string') {
	        return 1;
	      }
	    };

	    Stagger.prototype._createTimeline = function(options) {
	      if (options == null) {
	        options = {};
	      }
	      return this.timeline = new Timeline({
	        onStart: options.onStaggerStart,
	        onUpdate: options.onStaggerUpdate,
	        onComplete: options.onStaggerComplete,
	        onReverseComplete: options.onStaggerReverseComplete,
	        delay: options.moduleDelay
	      });
	    };

	    Stagger.prototype.init = function(options, Module) {
	      var count, i, module, option, _i;
	      count = this._getChildQuantity(options.quantifier || 'el', options);
	      this._createTimeline(options);
	      this.childModules = [];
	      for (i = _i = 0; 0 <= count ? _i < count : _i > count; i = 0 <= count ? ++_i : --_i) {
	        option = this._getOptionByIndex(i, options);
	        option.isRunLess = true;
	        module = new Module(option);
	        this.childModules.push(module);
	        this.timeline.add(module);
	      }
	      return this;
	    };

	    Stagger.prototype.run = function() {
	      return this.timeline.start();
	    };

	    return Stagger;

	  })();

	  StaggerWrapper = (function() {
	    function StaggerWrapper(Module) {
	      var M;
	      M = Module;
	      return function(options) {
	        return new Stagger(options, M);
	      };
	    }

	    return StaggerWrapper;

	  })();

	  module.exports = StaggerWrapper;

	}).call(this);


/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	(function() {
	  var Spriter, Timeline, Tween, h;

	  h = __webpack_require__(3);

	  Tween = __webpack_require__(15);

	  Timeline = __webpack_require__(23);

	  Spriter = (function() {
	    Spriter.prototype._defaults = {
	      duration: 500,
	      delay: 0,
	      easing: 'linear.none',
	      repeat: 0,
	      yoyo: false,
	      isRunLess: false,
	      isShowEnd: false,
	      onStart: null,
	      onUpdate: null,
	      onComplete: null
	    };

	    function Spriter(o) {
	      this.o = o != null ? o : {};
	      if (this.o.el == null) {
	        return h.error('No "el" option specified, aborting');
	      }
	      this._vars();
	      this._extendDefaults();
	      this._parseFrames();
	      if (this._frames.length <= 2) {
	        h.warn("Spriter: only " + this._frames.length + " frames found");
	      }
	      if (this._frames.length < 1) {
	        h.error("Spriter: there is no frames to animate, aborting");
	      }
	      this._createTween();
	      this;
	    }

	    Spriter.prototype._vars = function() {
	      this._props = h.cloneObj(this.o);
	      this.el = this.o.el;
	      return this._frames = [];
	    };

	    Spriter.prototype.run = function(o) {
	      return this._timeline.start();
	    };

	    Spriter.prototype._extendDefaults = function() {
	      return h.extend(this._props, this._defaults);
	    };

	    Spriter.prototype._parseFrames = function() {
	      var frame, i, _i, _len, _ref;
	      this._frames = Array.prototype.slice.call(this.el.children, 0);
	      _ref = this._frames;
	      for (i = _i = 0, _len = _ref.length; _i < _len; i = ++_i) {
	        frame = _ref[i];
	        frame.style.opacity = 0;
	      }
	      return this._frameStep = 1 / this._frames.length;
	    };

	    Spriter.prototype._createTween = function() {
	      this._tween = new Tween({
	        duration: this._props.duration,
	        delay: this._props.delay,
	        yoyo: this._props.yoyo,
	        repeat: this._props.repeat,
	        easing: this._props.easing,
	        onStart: (function(_this) {
	          return function() {
	            var _base;
	            return typeof (_base = _this._props).onStart === "function" ? _base.onStart() : void 0;
	          };
	        })(this),
	        onComplete: (function(_this) {
	          return function() {
	            var _base;
	            return typeof (_base = _this._props).onComplete === "function" ? _base.onComplete() : void 0;
	          };
	        })(this),
	        onUpdate: (function(_this) {
	          return function(p) {
	            return _this._setProgress(p);
	          };
	        })(this)
	      });
	      this._timeline = new Timeline;
	      this._timeline.add(this._tween);
	      return !this._props.isRunLess && this._startTween();
	    };

	    Spriter.prototype._startTween = function() {
	      return setTimeout(((function(_this) {
	        return function() {
	          return _this._timeline.start();
	        };
	      })(this)), 1);
	    };

	    Spriter.prototype._setProgress = function(p) {
	      var currentNum, proc, _base, _ref, _ref1;
	      proc = Math.floor(p / this._frameStep);
	      if (this._prevFrame !== this._frames[proc]) {
	        if ((_ref = this._prevFrame) != null) {
	          _ref.style.opacity = 0;
	        }
	        currentNum = p === 1 && this._props.isShowEnd ? proc - 1 : proc;
	        if ((_ref1 = this._frames[currentNum]) != null) {
	          _ref1.style.opacity = 1;
	        }
	        this._prevFrame = this._frames[proc];
	      }
	      return typeof (_base = this._props).onUpdate === "function" ? _base.onUpdate(p) : void 0;
	    };

	    return Spriter;

	  })();

	  module.exports = Spriter;

	}).call(this);


/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	(function() {
	  var MotionPath, Timeline, Tween, h, resize,
	    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

	  h = __webpack_require__(3);

	  resize = __webpack_require__(28);

	  Tween = __webpack_require__(15);

	  Timeline = __webpack_require__(23);

	  MotionPath = (function() {
	    MotionPath.prototype.defaults = {
	      path: null,
	      curvature: {
	        x: '75%',
	        y: '50%'
	      },
	      isCompositeLayer: true,
	      delay: 0,
	      duration: 1000,
	      easing: null,
	      repeat: 0,
	      yoyo: false,
	      offsetX: 0,
	      offsetY: 0,
	      angleOffset: null,
	      pathStart: 0,
	      pathEnd: 1,
	      motionBlur: 0,
	      transformOrigin: null,
	      isAngle: false,
	      isReverse: false,
	      isRunLess: false,
	      isPresetPosition: true,
	      onStart: null,
	      onComplete: null,
	      onUpdate: null
	    };

	    function MotionPath(o) {
	      this.o = o != null ? o : {};
	      this.calcHeight = __bind(this.calcHeight, this);
	      if (this.vars()) {
	        return;
	      }
	      this.createTween();
	      this;
	    }

	    MotionPath.prototype.vars = function() {
	      this.getScaler = h.bind(this.getScaler, this);
	      this.resize = resize;
	      this.props = h.cloneObj(this.defaults);
	      this.extendOptions(this.o);
	      this.isMotionBlurReset = h.isSafari || h.isIE;
	      this.isMotionBlurReset && (this.props.motionBlur = 0);
	      this.history = [h.cloneObj(this.props)];
	      return this.postVars();
	    };

	    MotionPath.prototype.curveToPath = function(o) {
	      var angle, curvature, curvatureX, curvatureY, curvePoint, curveXPoint, dX, dY, endPoint, path, percent, radius, start;
	      path = document.createElementNS(h.NS, 'path');
	      start = o.start;
	      endPoint = {
	        x: start.x + o.shift.x,
	        y: start.x + o.shift.y
	      };
	      curvature = o.curvature;
	      dX = o.shift.x;
	      dY = o.shift.y;
	      radius = Math.sqrt(dX * dX + dY * dY);
	      percent = radius / 100;
	      angle = Math.atan(dY / dX) * (180 / Math.PI) + 90;
	      if (o.shift.x < 0) {
	        angle = angle + 180;
	      }
	      curvatureX = h.parseUnit(curvature.x);
	      curvatureX = curvatureX.unit === '%' ? curvatureX.value * percent : curvatureX.value;
	      curveXPoint = h.getRadialPoint({
	        center: {
	          x: start.x,
	          y: start.y
	        },
	        radius: curvatureX,
	        angle: angle
	      });
	      curvatureY = h.parseUnit(curvature.y);
	      curvatureY = curvatureY.unit === '%' ? curvatureY.value * percent : curvatureY.value;
	      curvePoint = h.getRadialPoint({
	        center: {
	          x: curveXPoint.x,
	          y: curveXPoint.y
	        },
	        radius: curvatureY,
	        angle: angle + 90
	      });
	      path.setAttribute('d', "M" + start.x + "," + start.y + " Q" + curvePoint.x + "," + curvePoint.y + " " + endPoint.x + "," + endPoint.y);
	      return path;
	    };

	    MotionPath.prototype.postVars = function() {
	      this.props.pathStart = h.clamp(this.props.pathStart, 0, 1);
	      this.props.pathEnd = h.clamp(this.props.pathEnd, this.props.pathStart, 1);
	      this.angle = 0;
	      this.speedX = 0;
	      this.speedY = 0;
	      this.blurX = 0;
	      this.blurY = 0;
	      this.prevCoords = {};
	      this.blurAmount = 20;
	      this.props.motionBlur = h.clamp(this.props.motionBlur, 0, 1);
	      this.onUpdate = this.props.onUpdate;
	      if (!this.o.el) {
	        h.error('Missed "el" option. It could be a selector, DOMNode or another module.');
	        return true;
	      }
	      this.el = this.parseEl(this.props.el);
	      this.props.motionBlur > 0 && this.createFilter();
	      this.path = this.getPath();
	      if (!this.path.getAttribute('d')) {
	        h.error('Path has no coordinates to work with, aborting');
	        return true;
	      }
	      this.len = this.path.getTotalLength();
	      this.slicedLen = this.len * (this.props.pathEnd - this.props.pathStart);
	      this.startLen = this.props.pathStart * this.len;
	      this.fill = this.props.fill;
	      if (this.fill != null) {
	        this.container = this.parseEl(this.props.fill.container);
	        this.fillRule = this.props.fill.fillRule || 'all';
	        this.getScaler();
	        if (this.container != null) {
	          this.removeEvent(this.container, 'onresize', this.getScaler);
	          return this.addEvent(this.container, 'onresize', this.getScaler);
	        }
	      }
	    };

	    MotionPath.prototype.addEvent = function(el, type, handler) {
	      return el.addEventListener(type, handler, false);
	    };

	    MotionPath.prototype.removeEvent = function(el, type, handler) {
	      return el.removeEventListener(type, handler, false);
	    };

	    MotionPath.prototype.createFilter = function() {
	      var div, svg;
	      div = document.createElement('div');
	      this.filterID = "filter-" + (h.getUniqID());
	      div.innerHTML = "<svg id=\"svg-" + this.filterID + "\"\n    style=\"visibility:hidden; width:0px; height:0px\">\n  <filter id=\"" + this.filterID + "\" y=\"-20\" x=\"-20\" width=\"40\" height=\"40\">\n    <feOffset\n      id=\"blur-offset\" in=\"SourceGraphic\"\n      dx=\"0\" dy=\"0\" result=\"offset2\"></feOffset>\n    <feGaussianblur\n      id=\"blur\" in=\"offset2\"\n      stdDeviation=\"0,0\" result=\"blur2\"></feGaussianblur>\n    <feMerge>\n      <feMergeNode in=\"SourceGraphic\"></feMergeNode>\n      <feMergeNode in=\"blur2\"></feMergeNode>\n    </feMerge>\n  </filter>\n</svg>";
	      svg = div.querySelector("#svg-" + this.filterID);
	      this.filter = svg.querySelector('#blur');
	      this.filterOffset = svg.querySelector('#blur-offset');
	      document.body.insertBefore(svg, document.body.firstChild);
	      this.el.style['filter'] = "url(#" + this.filterID + ")";
	      return this.el.style["" + h.prefix.css + "filter"] = "url(#" + this.filterID + ")";
	    };

	    MotionPath.prototype.parseEl = function(el) {
	      if (typeof el === 'string') {
	        return document.querySelector(el);
	      }
	      if (el instanceof HTMLElement) {
	        return el;
	      }
	      if (el.setProp != null) {
	        this.isModule = true;
	        return el;
	      }
	    };

	    MotionPath.prototype.getPath = function() {
	      var path;
	      path = h.parsePath(this.props.path);
	      if (path) {
	        return path;
	      }
	      if (this.props.path.x || this.props.path.y) {
	        return this.curveToPath({
	          start: {
	            x: 0,
	            y: 0
	          },
	          shift: {
	            x: this.props.path.x || 0,
	            y: this.props.path.y || 0
	          },
	          curvature: {
	            x: this.props.curvature.x || this.defaults.curvature.x,
	            y: this.props.curvature.y || this.defaults.curvature.y
	          }
	        });
	      }
	    };

	    MotionPath.prototype.getScaler = function() {
	      var end, size, start;
	      this.cSize = {
	        width: this.container.offsetWidth || 0,
	        height: this.container.offsetHeight || 0
	      };
	      start = this.path.getPointAtLength(0);
	      end = this.path.getPointAtLength(this.len);
	      size = {};
	      this.scaler = {};
	      size.width = end.x >= start.x ? end.x - start.x : start.x - end.x;
	      size.height = end.y >= start.y ? end.y - start.y : start.y - end.y;
	      switch (this.fillRule) {
	        case 'all':
	          this.calcWidth(size);
	          return this.calcHeight(size);
	        case 'width':
	          this.calcWidth(size);
	          return this.scaler.y = this.scaler.x;
	        case 'height':
	          this.calcHeight(size);
	          return this.scaler.x = this.scaler.y;
	      }
	    };

	    MotionPath.prototype.calcWidth = function(size) {
	      this.scaler.x = this.cSize.width / size.width;
	      return !isFinite(this.scaler.x) && (this.scaler.x = 1);
	    };

	    MotionPath.prototype.calcHeight = function(size) {
	      this.scaler.y = this.cSize.height / size.height;
	      return !isFinite(this.scaler.y) && (this.scaler.y = 1);
	    };

	    MotionPath.prototype.run = function(o) {
	      var fistItem, key, value;
	      if (o) {
	        fistItem = this.history[0];
	        for (key in o) {
	          value = o[key];
	          if (h.callbacksMap[key] || h.tweenOptionMap[key]) {
	            h.warn("the property \"" + key + "\" property can not be overridden on run yet");
	            delete o[key];
	          } else {
	            this.history[0][key] = value;
	          }
	        }
	        this.tuneOptions(o);
	      }
	      return this.startTween();
	    };

	    MotionPath.prototype.createTween = function() {
	      this.tween = new Tween({
	        duration: this.props.duration,
	        delay: this.props.delay,
	        yoyo: this.props.yoyo,
	        repeat: this.props.repeat,
	        easing: this.props.easing,
	        onStart: (function(_this) {
	          return function() {
	            var _ref;
	            return (_ref = _this.props.onStart) != null ? _ref.apply(_this) : void 0;
	          };
	        })(this),
	        onComplete: (function(_this) {
	          return function() {
	            var _ref;
	            _this.props.motionBlur && _this.setBlur({
	              blur: {
	                x: 0,
	                y: 0
	              },
	              offset: {
	                x: 0,
	                y: 0
	              }
	            });
	            return (_ref = _this.props.onComplete) != null ? _ref.apply(_this) : void 0;
	          };
	        })(this),
	        onUpdate: (function(_this) {
	          return function(p) {
	            return _this.setProgress(p);
	          };
	        })(this),
	        onFirstUpdateBackward: (function(_this) {
	          return function() {
	            return _this.history.length > 1 && _this.tuneOptions(_this.history[0]);
	          };
	        })(this)
	      });
	      this.timeline = new Timeline;
	      this.timeline.add(this.tween);
	      !this.props.isRunLess && this.startTween();
	      return this.props.isPresetPosition && this.setProgress(0, true);
	    };

	    MotionPath.prototype.startTween = function() {
	      return setTimeout(((function(_this) {
	        return function() {
	          var _ref;
	          return (_ref = _this.timeline) != null ? _ref.start() : void 0;
	        };
	      })(this)), 1);
	    };

	    MotionPath.prototype.setProgress = function(p, isInit) {
	      var len, point, x, y;
	      len = this.startLen + (!this.props.isReverse ? p * this.slicedLen : (1 - p) * this.slicedLen);
	      point = this.path.getPointAtLength(len);
	      x = point.x + this.props.offsetX;
	      y = point.y + this.props.offsetY;
	      this._getCurrentAngle(point, len, p);
	      this._setTransformOrigin(p);
	      this._setTransform(x, y, p, isInit);
	      return this.props.motionBlur && this.makeMotionBlur(x, y);
	    };

	    MotionPath.prototype.setElPosition = function(x, y, p) {
	      var composite, isComposite, rotate, transform;
	      rotate = this.angle !== 0 ? "rotate(" + this.angle + "deg)" : '';
	      isComposite = this.props.isCompositeLayer && h.is3d;
	      composite = isComposite ? 'translateZ(0)' : '';
	      transform = "translate(" + x + "px," + y + "px) " + rotate + " " + composite;
	      return h.setPrefixedStyle(this.el, 'transform', transform);
	    };

	    MotionPath.prototype.setModulePosition = function(x, y) {
	      this.el.setProp({
	        shiftX: "" + x + "px",
	        shiftY: "" + y + "px",
	        angle: this.angle
	      });
	      return this.el.draw();
	    };

	    MotionPath.prototype._getCurrentAngle = function(point, len, p) {
	      var atan, isTransformFunOrigin, prevPoint, x1, x2;
	      isTransformFunOrigin = typeof this.props.transformOrigin === 'function';
	      if (this.props.isAngle || (this.props.angleOffset != null) || isTransformFunOrigin) {
	        prevPoint = this.path.getPointAtLength(len - 1);
	        x1 = point.y - prevPoint.y;
	        x2 = point.x - prevPoint.x;
	        atan = Math.atan(x1 / x2);
	        !isFinite(atan) && (atan = 0);
	        this.angle = atan * h.RAD_TO_DEG;
	        if ((typeof this.props.angleOffset) !== 'function') {
	          return this.angle += this.props.angleOffset || 0;
	        } else {
	          return this.angle = this.props.angleOffset.call(this, this.angle, p);
	        }
	      } else {
	        return this.angle = 0;
	      }
	    };

	    MotionPath.prototype._setTransform = function(x, y, p, isInit) {
	      var transform;
	      if (this.scaler) {
	        x *= this.scaler.x;
	        y *= this.scaler.y;
	      }
	      transform = null;
	      if (!isInit) {
	        transform = typeof this.onUpdate === "function" ? this.onUpdate(p, {
	          x: x,
	          y: y,
	          angle: this.angle
	        }) : void 0;
	      }
	      if (this.isModule) {
	        return this.setModulePosition(x, y);
	      } else {
	        if (typeof transform !== 'string') {
	          return this.setElPosition(x, y, p);
	        } else {
	          return h.setPrefixedStyle(this.el, 'transform', transform);
	        }
	      }
	    };

	    MotionPath.prototype._setTransformOrigin = function(p) {
	      var isTransformFunOrigin, tOrigin;
	      if (this.props.transformOrigin) {
	        isTransformFunOrigin = typeof this.props.transformOrigin === 'function';
	        tOrigin = !isTransformFunOrigin ? this.props.transformOrigin : this.props.transformOrigin(this.angle, p);
	        return h.setPrefixedStyle(this.el, 'transform-origin', tOrigin);
	      }
	    };

	    MotionPath.prototype.makeMotionBlur = function(x, y) {
	      var absoluteAngle, coords, dX, dY, signX, signY, tailAngle;
	      tailAngle = 0;
	      signX = 1;
	      signY = 1;
	      if ((this.prevCoords.x == null) || (this.prevCoords.y == null)) {
	        this.speedX = 0;
	        this.speedY = 0;
	      } else {
	        dX = x - this.prevCoords.x;
	        dY = y - this.prevCoords.y;
	        if (dX > 0) {
	          signX = -1;
	        }
	        if (signX < 0) {
	          signY = -1;
	        }
	        this.speedX = Math.abs(dX);
	        this.speedY = Math.abs(dY);
	        tailAngle = Math.atan(dY / dX) * (180 / Math.PI) + 90;
	      }
	      absoluteAngle = tailAngle - this.angle;
	      coords = this.angToCoords(absoluteAngle);
	      this.blurX = h.clamp((this.speedX / 16) * this.props.motionBlur, 0, 1);
	      this.blurY = h.clamp((this.speedY / 16) * this.props.motionBlur, 0, 1);
	      this.setBlur({
	        blur: {
	          x: 3 * this.blurX * this.blurAmount * Math.abs(coords.x),
	          y: 3 * this.blurY * this.blurAmount * Math.abs(coords.y)
	        },
	        offset: {
	          x: 3 * signX * this.blurX * coords.x * this.blurAmount,
	          y: 3 * signY * this.blurY * coords.y * this.blurAmount
	        }
	      });
	      this.prevCoords.x = x;
	      return this.prevCoords.y = y;
	    };

	    MotionPath.prototype.setBlur = function(o) {
	      if (!this.isMotionBlurReset) {
	        this.filter.setAttribute('stdDeviation', "" + o.blur.x + "," + o.blur.y);
	        this.filterOffset.setAttribute('dx', o.offset.x);
	        return this.filterOffset.setAttribute('dy', o.offset.y);
	      }
	    };

	    MotionPath.prototype.extendDefaults = function(o) {
	      var key, value, _results;
	      _results = [];
	      for (key in o) {
	        value = o[key];
	        _results.push(this[key] = value);
	      }
	      return _results;
	    };

	    MotionPath.prototype.extendOptions = function(o) {
	      var key, value, _results;
	      _results = [];
	      for (key in o) {
	        value = o[key];
	        _results.push(this.props[key] = value);
	      }
	      return _results;
	    };

	    MotionPath.prototype.then = function(o) {
	      var it, key, opts, prevOptions, value;
	      prevOptions = this.history[this.history.length - 1];
	      opts = {};
	      for (key in prevOptions) {
	        value = prevOptions[key];
	        if (!h.callbacksMap[key] && !h.tweenOptionMap[key] || key === 'duration') {
	          if (o[key] == null) {
	            o[key] = value;
	          }
	        } else {
	          if (o[key] == null) {
	            o[key] = void 0;
	          }
	        }
	        if (h.tweenOptionMap[key]) {
	          opts[key] = key !== 'duration' ? o[key] : o[key] != null ? o[key] : prevOptions[key];
	        }
	      }
	      this.history.push(o);
	      it = this;
	      opts.onUpdate = (function(_this) {
	        return function(p) {
	          return _this.setProgress(p);
	        };
	      })(this);
	      opts.onStart = (function(_this) {
	        return function() {
	          var _ref;
	          return (_ref = _this.props.onStart) != null ? _ref.apply(_this) : void 0;
	        };
	      })(this);
	      opts.onComplete = (function(_this) {
	        return function() {
	          var _ref;
	          return (_ref = _this.props.onComplete) != null ? _ref.apply(_this) : void 0;
	        };
	      })(this);
	      opts.onFirstUpdate = function() {
	        return it.tuneOptions(it.history[this.index]);
	      };
	      opts.isChained = !o.delay;
	      this.timeline.append(new Tween(opts));
	      return this;
	    };

	    MotionPath.prototype.tuneOptions = function(o) {
	      this.extendOptions(o);
	      return this.postVars();
	    };

	    MotionPath.prototype.angToCoords = function(angle) {
	      var radAngle, x, y;
	      angle = angle % 360;
	      radAngle = ((angle - 90) * Math.PI) / 180;
	      x = Math.cos(radAngle);
	      y = Math.sin(radAngle);
	      x = x < 0 ? Math.max(x, -0.7) : Math.min(x, .7);
	      y = y < 0 ? Math.max(y, -0.7) : Math.min(y, .7);
	      return {
	        x: x * 1.428571429,
	        y: y * 1.428571429
	      };
	    };

	    return MotionPath;

	  })();

	  module.exports = MotionPath;

	}).call(this);


/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;
	/*!
	  LegoMushroom @legomushroom http://legomushroom.com
	  MIT License 2014
	 */


	/* istanbul ignore next */

	(function() {
	  (function() {
	    var Main;
	    Main = (function() {
	      function Main(o) {
	        this.o = o != null ? o : {};
	        if (window.isAnyResizeEventInited) {
	          return;
	        }
	        this.vars();
	        this.redefineProto();
	      }

	      Main.prototype.vars = function() {
	        window.isAnyResizeEventInited = true;
	        this.allowedProtos = [HTMLDivElement, HTMLFormElement, HTMLLinkElement, HTMLBodyElement, HTMLParagraphElement, HTMLFieldSetElement, HTMLLegendElement, HTMLLabelElement, HTMLButtonElement, HTMLUListElement, HTMLOListElement, HTMLLIElement, HTMLHeadingElement, HTMLQuoteElement, HTMLPreElement, HTMLBRElement, HTMLFontElement, HTMLHRElement, HTMLModElement, HTMLParamElement, HTMLMapElement, HTMLTableElement, HTMLTableCaptionElement, HTMLImageElement, HTMLTableCellElement, HTMLSelectElement, HTMLInputElement, HTMLTextAreaElement, HTMLAnchorElement, HTMLObjectElement, HTMLTableColElement, HTMLTableSectionElement, HTMLTableRowElement];
	        return this.timerElements = {
	          img: 1,
	          textarea: 1,
	          input: 1,
	          embed: 1,
	          object: 1,
	          svg: 1,
	          canvas: 1,
	          tr: 1,
	          tbody: 1,
	          thead: 1,
	          tfoot: 1,
	          a: 1,
	          select: 1,
	          option: 1,
	          optgroup: 1,
	          dl: 1,
	          dt: 1,
	          br: 1,
	          basefont: 1,
	          font: 1,
	          col: 1,
	          iframe: 1
	        };
	      };

	      Main.prototype.redefineProto = function() {
	        var i, it, proto, t;
	        it = this;
	        return t = (function() {
	          var _i, _len, _ref, _results;
	          _ref = this.allowedProtos;
	          _results = [];
	          for (i = _i = 0, _len = _ref.length; _i < _len; i = ++_i) {
	            proto = _ref[i];
	            if (proto.prototype == null) {
	              continue;
	            }
	            _results.push((function(proto) {
	              var listener, remover;
	              listener = proto.prototype.addEventListener || proto.prototype.attachEvent;
	              (function(listener) {
	                var wrappedListener;
	                wrappedListener = function() {
	                  var option;
	                  if (this !== window || this !== document) {
	                    option = arguments[0] === 'onresize' && !this.isAnyResizeEventInited;
	                    option && it.handleResize({
	                      args: arguments,
	                      that: this
	                    });
	                  }
	                  return listener.apply(this, arguments);
	                };
	                if (proto.prototype.addEventListener) {
	                  return proto.prototype.addEventListener = wrappedListener;
	                } else if (proto.prototype.attachEvent) {
	                  return proto.prototype.attachEvent = wrappedListener;
	                }
	              })(listener);
	              remover = proto.prototype.removeEventListener || proto.prototype.detachEvent;
	              return (function(remover) {
	                var wrappedRemover;
	                wrappedRemover = function() {
	                  this.isAnyResizeEventInited = false;
	                  this.iframe && this.removeChild(this.iframe);
	                  return remover.apply(this, arguments);
	                };
	                if (proto.prototype.removeEventListener) {
	                  return proto.prototype.removeEventListener = wrappedRemover;
	                } else if (proto.prototype.detachEvent) {
	                  return proto.prototype.detachEvent = wrappedListener;
	                }
	              })(remover);
	            })(proto));
	          }
	          return _results;
	        }).call(this);
	      };

	      Main.prototype.handleResize = function(args) {
	        var computedStyle, el, iframe, isEmpty, isNoPos, isStatic, _ref;
	        el = args.that;
	        if (!this.timerElements[el.tagName.toLowerCase()]) {
	          iframe = document.createElement('iframe');
	          el.appendChild(iframe);
	          iframe.style.width = '100%';
	          iframe.style.height = '100%';
	          iframe.style.position = 'absolute';
	          iframe.style.zIndex = -999;
	          iframe.style.opacity = 0;
	          iframe.style.top = 0;
	          iframe.style.left = 0;
	          computedStyle = window.getComputedStyle ? getComputedStyle(el) : el.currentStyle;
	          isNoPos = el.style.position === '';
	          isStatic = computedStyle.position === 'static' && isNoPos;
	          isEmpty = computedStyle.position === '' && el.style.position === '';
	          if (isStatic || isEmpty) {
	            el.style.position = 'relative';
	          }
	          if ((_ref = iframe.contentWindow) != null) {
	            _ref.onresize = (function(_this) {
	              return function(e) {
	                return _this.dispatchEvent(el);
	              };
	            })(this);
	          }
	          el.iframe = iframe;
	        } else {
	          this.initTimer(el);
	        }
	        return el.isAnyResizeEventInited = true;
	      };

	      Main.prototype.initTimer = function(el) {
	        var height, width;
	        width = 0;
	        height = 0;
	        return this.interval = setInterval((function(_this) {
	          return function() {
	            var newHeight, newWidth;
	            newWidth = el.offsetWidth;
	            newHeight = el.offsetHeight;
	            if (newWidth !== width || newHeight !== height) {
	              _this.dispatchEvent(el);
	              width = newWidth;
	              return height = newHeight;
	            }
	          };
	        })(this), this.o.interval || 62.5);
	      };

	      Main.prototype.dispatchEvent = function(el) {
	        var e;
	        if (document.createEvent) {
	          e = document.createEvent('HTMLEvents');
	          e.initEvent('onresize', false, false);
	          return el.dispatchEvent(e);
	        } else if (document.createEventObject) {
	          e = document.createEventObject();
	          return el.fireEvent('onresize', e);
	        } else {
	          return false;
	        }
	      };

	      Main.prototype.destroy = function() {
	        var i, it, proto, _i, _len, _ref, _results;
	        clearInterval(this.interval);
	        this.interval = null;
	        window.isAnyResizeEventInited = false;
	        it = this;
	        _ref = this.allowedProtos;
	        _results = [];
	        for (i = _i = 0, _len = _ref.length; _i < _len; i = ++_i) {
	          proto = _ref[i];
	          if (proto.prototype == null) {
	            continue;
	          }
	          _results.push((function(proto) {
	            var listener;
	            listener = proto.prototype.addEventListener || proto.prototype.attachEvent;
	            if (proto.prototype.addEventListener) {
	              proto.prototype.addEventListener = Element.prototype.addEventListener;
	            } else if (proto.prototype.attachEvent) {
	              proto.prototype.attachEvent = Element.prototype.attachEvent;
	            }
	            if (proto.prototype.removeEventListener) {
	              return proto.prototype.removeEventListener = Element.prototype.removeEventListener;
	            } else if (proto.prototype.detachEvent) {
	              return proto.prototype.detachEvent = Element.prototype.detachEvent;
	            }
	          })(proto));
	        }
	        return _results;
	      };

	      return Main;

	    })();
	    if (true) {
	      return !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function() {
	        return new Main;
	      }.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	    } else if ((typeof module === "object") && (typeof module.exports === "object")) {
	      return module.exports = new Main;
	    } else {
	      if (typeof window !== "undefined" && window !== null) {
	        window.AnyResizeEvent = Main;
	      }
	      return typeof window !== "undefined" && window !== null ? window.anyResizeEvent = new Main : void 0;
	    }
	  })();

	}).call(this);


/***/ },
/* 29 */
/***/ function(module, exports) {

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
	      duration: 100 * this.S,
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
	      delay: 400 * this.S
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
	      delay: 0 * this.S
	    }).then({
	      y: this.o.CIRCLE_RADIUS,
	      radiusX: 1.5 * this.o.CIRCLE_RADIUS,
	      radiusY: this.o.CIRCLE_RADIUS / 2,
	      duration: gooDur * this.S,
	      delay: (this.o.BALL_2_ARCDUR - 2 * gooDur) * this.S
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
	      tweens: [burst1, burst2, burst3, mp, ball, circle, trail1, trail2, trail3],
	      ball: ball
	    };
	  };

	  return FirstBall;

	})();

	module.exports = FirstBall;


/***/ },
/* 30 */
/***/ function(module, exports) {

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
	    var burst, burst2, mp, oDelay, oDuration, oLinetagger, oStagger, opacityDelta, trail, trailFade, tween;
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
	    oLinetagger = new this.o.TransitStagger({
	      bit: Array.prototype.slice.call(this.o2Line.children, 0),
	      quantifier: 'bit',
	      duration: oDuration,
	      isRunLess: this.o.IS_RUNLESS,
	      isShowEnd: true,
	      delay: "stagger(" + (this.o.BALL_2_START * this.S) + ", 200)",
	      easing: this.STAGGER_EASING,
	      stroke: this.o.STAGGER_COLORS,
	      strokeDasharray: {
	        '0 100%': '100% 100%'
	      },
	      strokeDashoffset: {
	        '50%': '200%'
	      }
	    });
	    oDelay = (this.o.BALL_2_START + 400) * this.S;
	    oStagger = new this.o.TransitStagger({
	      bit: Array.prototype.slice.call(this.o2.children, 0),
	      quantifier: 'bit',
	      duration: oDuration,
	      isRunLess: this.o.IS_RUNLESS,
	      isShowEnd: true,
	      delay: "stagger(" + oDelay + ", 100)",
	      easing: this.STAGGER_EASING,
	      fill: 'transparent',
	      stroke: this.o.STAGGER_COLORS,
	      strokeDasharray: {
	        '0 100%': '100% 100%'
	      }
	    });
	    tween = new mojs.Tween({
	      duration: oDuration,
	      delay: oDelay,
	      easing: this.STAGGER_EASING,
	      onUpdate: (function(_this) {
	        return function(p) {
	          var transform;
	          transform = "translate(253, 174) rotate(" + (-135 * (1 - p)) + ",33,33)";
	          return _this.o2.setAttribute('transform', transform);
	        };
	      })(this)
	    });
	    this.o.IS_RUNLESS || tween.start();
	    return [mp, burst, tween, trail, trailFade, oLinetagger, oStagger];
	  };

	  return FirstBall;

	})();

	module.exports = FirstBall;


/***/ },
/* 31 */
/***/ function(module, exports) {

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
	    var burst, burst2, burst3, it, mp, oDelay, oDuration, oLine1Stagger, oLine2Stagger, oStagger, opacityDelta, trail, trailFade, translate;
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
	    oDuration = 1000 * this.S;
	    oLine1Stagger = new this.o.TransitStagger({
	      bit: Array.prototype.slice.call(this.o1Line1.children, 0),
	      quantifier: 'bit',
	      duration: oDuration,
	      isRunLess: this.o.IS_RUNLESS,
	      isShowEnd: true,
	      delay: "stagger(" + (this.o.BALL_3_START * this.S) + ", 200)",
	      easing: this.STAGGER_EASING,
	      stroke: this.o.STAGGER_COLORS,
	      strokeDasharray: '100%',
	      strokeDashoffset: {
	        '100%': 0
	      }
	    });
	    oLine2Stagger = new this.o.TransitStagger({
	      bit: Array.prototype.slice.call(this.o1Line2.children, 0),
	      quantifier: 'bit',
	      duration: oDuration,
	      isRunLess: this.o.IS_RUNLESS,
	      isShowEnd: true,
	      delay: "stagger(" + ((this.o.BALL_3_START + 800) * this.S) + ", 200)",
	      easing: this.STAGGER_EASING,
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
	    oDelay = (this.o.BALL_3_START + 1200) * this.S;
	    oStagger = new this.o.TransitStagger({
	      bit: Array.prototype.slice.call(this.o1circle.children, 0),
	      quantifier: 'bit',
	      type: 'circle',
	      duration: oDuration,
	      isRunLess: this.o.IS_RUNLESS,
	      isShowEnd: true,
	      delay: "stagger(" + oDelay + ", 100)",
	      easing: this.o.STAGGER_EASING,
	      stroke: this.o.STAGGER_COLORS,
	      fill: 'transparent',
	      radius: 24,
	      radiusX: {
	        0: 24
	      },
	      strokeDashoffset: 0
	    });
	    return [trailFade, burst, mp, trail, trailFade, burst2, burst3, oLine1Stagger, oLine2Stagger, oStagger];
	  };

	  return FirstBall;

	})();

	module.exports = FirstBall;


/***/ },
/* 32 */
/***/ function(module, exports) {

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
	    return this.easing = mojs.easing.bezier(0.435, 0.715, 0.635, 0.395);
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
	    n1Stagger = new this.o.TransitStagger({
	      bit: Array.prototype.slice.call(this.n1.children, 0),
	      quantifier: 'bit',
	      duration: nDuration * this.S,
	      isRunLess: this.o.IS_RUNLESS,
	      isShowEnd: true,
	      delay: "stagger(" + (nDelay * this.S) + ", 200)",
	      easing: this.STAGGER_EASING,
	      stroke: this.o.STAGGER_COLORS,
	      fill: 'none',
	      strokeDasharray: '100%',
	      strokeDashoffset: {
	        '100%': '200%'
	      }
	    });
	    n2Stagger = new this.o.TransitStagger({
	      bit: Array.prototype.slice.call(this.n2.children, 0),
	      quantifier: 'bit',
	      duration: nDuration * this.S,
	      isRunLess: this.o.IS_RUNLESS,
	      isShowEnd: true,
	      delay: "stagger(" + (nDelay * this.S) + ", 200)",
	      easing: this.STAGGER_EASING,
	      stroke: this.o.STAGGER_COLORS,
	      fill: 'none',
	      strokeDasharray: '100%',
	      strokeDashoffset: {
	        '100%': '200%'
	      }
	    });
	    shift = 22.5;
	    it = this;
	    tween = new mojs.Tween({
	      duration: nDuration * this.S,
	      delay: nDelay * this.S,
	      easing: this.o.STAGGER_EASING,
	      onUpdate: function(p) {
	        it.n1.setAttribute('transform', "translate(" + (shift * p) + ")");
	        return it.n2.setAttribute('transform', "translate(" + (-shift * p) + ")");
	      }
	    });
	    this.o.IS_RUNLESS || tween.start();
	    return [tween, burst, n1Stagger, n2Stagger, mp, trail, trailFade];
	  };

	  return FirstBall;

	})();

	module.exports = FirstBall;


/***/ },
/* 33 */
/***/ function(module, exports) {

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
	    var burst, mp, oBottomEl, oBottomStagger, oTopEl, oTopStagger, opacityDelta, t1Stagger, t2Stagger, t3Stagger, tDelay, tDuration, trail, trailFade;
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
	    t1Stagger = new this.o.TransitStagger({
	      bit: Array.prototype.slice.call(this.line1.children, 0),
	      quantifier: 'bit',
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
	    t2Stagger = new this.o.TransitStagger({
	      bit: Array.prototype.slice.call(this.line2.children, 0),
	      quantifier: 'bit',
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
	    t3Stagger = new this.o.TransitStagger({
	      bit: Array.prototype.slice.call(this.line3.children, 0),
	      quantifier: 'bit',
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
	    oTopEl = document.querySelector('#js-circles-right-top');
	    oTopStagger = new this.o.TransitStagger({
	      bit: Array.prototype.slice.call(oTopEl.children, 0),
	      quantifier: 'bit',
	      duration: 300 * this.S,
	      isRunLess: this.o.IS_RUNLESS,
	      isShowEnd: true,
	      delay: "stagger(" + ((tDelay + tDuration / 2) * this.S) + ", 200)",
	      easing: this.o.STAGGER_EASING,
	      fill: 'none',
	      stroke: this.o.STAGGER_COLORS,
	      strokeWidth: 1.3,
	      strokeDasharray: '100%',
	      strokeDashoffset: {
	        '100%': '200%'
	      }
	    });
	    oBottomEl = document.querySelector('#js-circles-right-bottom');
	    oBottomStagger = new this.o.TransitStagger({
	      bit: Array.prototype.slice.call(oBottomEl.children, 0),
	      quantifier: 'bit',
	      duration: 300 * this.S,
	      isRunLess: this.o.IS_RUNLESS,
	      isShowEnd: true,
	      delay: "stagger(" + ((tDelay + tDuration / 2) * this.S) + ", 200)",
	      easing: this.o.STAGGER_EASING,
	      fill: 'none',
	      stroke: this.o.STAGGER_COLORS,
	      strokeWidth: 1.3,
	      strokeDasharray: '100%',
	      strokeDashoffset: {
	        '100%': '0%'
	      }
	    });
	    return [burst, mp, trail, trailFade, t1Stagger, t2Stagger, t3Stagger, oTopStagger, oBottomStagger];
	  };

	  return FirstBall;

	})();

	module.exports = FirstBall;


/***/ },
/* 34 */
/***/ function(module, exports) {

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
	    var burst, els, forBurst, forDelay, forDuration, forStagger, m1Stagger, m2Stagger, mDelay, mDuration, mp, opacityDelta, shift, trail, trailFade;
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
	      stroke: this.o.YELLOW,
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
	    m1Stagger = new this.o.TransitStagger({
	      bit: Array.prototype.slice.call(this.line1.children, 0),
	      quantifier: 'bit',
	      duration: mDuration * this.S,
	      isRunLess: this.o.IS_RUNLESS,
	      isShowEnd: true,
	      delay: "stagger(" + (mDelay * this.S) + ", 200)",
	      easing: this.o.STAGGER_EASING,
	      fill: 'transparent',
	      stroke: this.o.STAGGER_COLORS,
	      strokeDasharray: '100%',
	      strokeDashoffset: {
	        '100%': '200%'
	      }
	    });
	    forDelay = mDelay;
	    forDuration = mDuration;
	    els = document.querySelector('#js-for-the-web');
	    forStagger = new this.o.TransitStagger({
	      bit: Array.prototype.slice.call(els.children, 0),
	      quantifier: 'bit',
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
	    m2Stagger = new this.o.TransitStagger({
	      bit: Array.prototype.slice.call(this.line2.children, 0),
	      quantifier: 'bit',
	      duration: mDuration * this.S,
	      isRunLess: this.o.IS_RUNLESS,
	      isShowEnd: true,
	      delay: "stagger(" + (mDelay * this.S) + ", 200)",
	      easing: this.o.STAGGER_EASING,
	      fill: 'transparent',
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
	    return [burst, m1Stagger, m2Stagger, mp, trail, trailFade, forStagger, forBurst];
	  };

	  return FirstBall;

	})();

	module.exports = FirstBall;


/***/ },
/* 35 */
/***/ function(module, exports) {

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
	    var auroraStagger, circle, els, i1Stagger, i2Stagger, i3Stagger, iDelay, iDelay2, iDuration, iDuration2, mp, oBottomStagger, oTopStagger;
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
	    i1Stagger = new this.o.TransitStagger({
	      bit: Array.prototype.slice.call(this.line1.children, 0),
	      quantifier: 'bit',
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
	    i2Stagger = new this.o.TransitStagger({
	      bit: Array.prototype.slice.call(this.line2.children, 0),
	      quantifier: 'bit',
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
	    i3Stagger = new this.o.TransitStagger({
	      bit: Array.prototype.slice.call(this.line3.children, 0),
	      quantifier: 'bit',
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
	    els = document.querySelector('#js-circles-left-top');
	    oTopStagger = new this.o.TransitStagger({
	      bit: Array.prototype.slice.call(els.children, 0),
	      quantifier: 'bit',
	      duration: 300 * this.S,
	      isRunLess: this.o.IS_RUNLESS,
	      isShowEnd: true,
	      delay: "stagger(" + (iDelay * this.S) + ", 200)",
	      easing: this.o.STAGGER_EASING,
	      fill: 'transparent',
	      stroke: this.o.STAGGER_COLORS,
	      strokeWidth: 1.3,
	      strokeDasharray: '100%',
	      strokeDashoffset: {
	        '100%': '200%'
	      }
	    });
	    els = document.querySelector('#js-circles-left-bottom');
	    oBottomStagger = new this.o.TransitStagger({
	      bit: Array.prototype.slice.call(els.children, 0),
	      quantifier: 'bit',
	      duration: 300 * this.S,
	      isRunLess: this.o.IS_RUNLESS,
	      isShowEnd: true,
	      delay: "stagger(" + (iDelay * this.S) + ", 200)",
	      easing: this.o.STAGGER_EASING,
	      fill: 'transparent',
	      stroke: this.o.STAGGER_COLORS,
	      strokeWidth: 1.3,
	      strokeDasharray: '100%',
	      strokeDashoffset: {
	        '100%': '0%'
	      }
	    });
	    els = document.querySelector('#js-aurora');
	    auroraStagger = new this.o.TransitStagger({
	      bit: Array.prototype.slice.call(els.children, 0),
	      quantifier: 'bit',
	      duration: 300 * this.S,
	      isRunLess: this.o.IS_RUNLESS,
	      isShowEnd: true,
	      delay: "stagger(" + ((this.o.DELAY_START + 3000) * this.S) + ", 200)",
	      easing: this.STAGGER_EASING,
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
	    return [mp, i1Stagger, i2Stagger, i3Stagger, circle, auroraStagger, oTopStagger, oBottomStagger];
	  };

	  return Ball;

	})();

	module.exports = Ball;


/***/ }
/******/ ]);