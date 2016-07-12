webpackJsonp([0,5],[
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(1);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(Vue) {/**
	 * Created by humorHan on 2016/7/4.
	 */
	var ve = new Vue({
	    el: '#demo',
	    data: {
	        message: 'hello vue-demo!',
	        todos: [
	            {
	                text: 'Add some todos'
	            }
	        ],
	        isTrue: 'true',
	        firstName:'li',
	        name:' yuan fang',
	        total: 'li yuan fang'
	    },
	    methods: {
	        changeMessage: function () {
	            this.message = this.message.split('').reverse().join('');
	            this.todos = this.todos.reverse();
	        },
	        add: function(){
	            this.todos.push({text:this.message});
	            this.isTrue = false;
	        },
	        deleteList: function(index){
	            this.todos.splice(index, 1);
	        },
	        changeTrueFalse: function(){
	            this.isTrue = this.isTrue ? false : true;
	        }
	    }
	});
	//$watch ������ֱ����computed
	ve.$watch('firstName', function (val) {
	    this.total = val + ' ' + this.name
	});
	
	//example
	var example = new Vue({
	    el: '#example',
	    data: {
	        a: 1,
	        b: 2
	    },
	    //computed��   ����   ���ᱻ������data�� ���Բ���
	    computed: {
	        // һ���������Ե� getter
	        c: function () {
	            // `this` ָ�� vm ʵ��
	            this.firstName = 'asd';
	            return this.a + 10
	        }
	    }
	});
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global, Vue) {/*!
	 * Vue.js v1.0.24
	 * (c) 2016 Evan You
	 * Released under the MIT License.
	 */
	(function (global, factory) {
	   true ? module.exports = factory() :
	  typeof define === 'function' && define.amd ? define(factory) :
	  (global.Vue = factory());
	}(this, function () { 'use strict';
	
	  function set(obj, key, val) {
	    if (hasOwn(obj, key)) {
	      obj[key] = val;
	      return;
	    }
	    if (obj._isVue) {
	      set(obj._data, key, val);
	      return;
	    }
	    var ob = obj.__ob__;
	    if (!ob) {
	      obj[key] = val;
	      return;
	    }
	    ob.convert(key, val);
	    ob.dep.notify();
	    if (ob.vms) {
	      var i = ob.vms.length;
	      while (i--) {
	        var vm = ob.vms[i];
	        vm._proxy(key);
	        vm._digest();
	      }
	    }
	    return val;
	  }
	
	  /**
	   * Delete a property and trigger change if necessary.
	   *
	   * @param {Object} obj
	   * @param {String} key
	   */
	
	  function del(obj, key) {
	    if (!hasOwn(obj, key)) {
	      return;
	    }
	    delete obj[key];
	    var ob = obj.__ob__;
	    if (!ob) {
	      if (obj._isVue) {
	        delete obj._data[key];
	        obj._digest();
	      }
	      return;
	    }
	    ob.dep.notify();
	    if (ob.vms) {
	      var i = ob.vms.length;
	      while (i--) {
	        var vm = ob.vms[i];
	        vm._unproxy(key);
	        vm._digest();
	      }
	    }
	  }
	
	  var hasOwnProperty = Object.prototype.hasOwnProperty;
	  /**
	   * Check whether the object has the property.
	   *
	   * @param {Object} obj
	   * @param {String} key
	   * @return {Boolean}
	   */
	
	  function hasOwn(obj, key) {
	    return hasOwnProperty.call(obj, key);
	  }
	
	  /**
	   * Check if an expression is a literal value.
	   *
	   * @param {String} exp
	   * @return {Boolean}
	   */
	
	  var literalValueRE = /^\s?(true|false|-?[\d\.]+|'[^']*'|"[^"]*")\s?$/;
	
	  function isLiteral(exp) {
	    return literalValueRE.test(exp);
	  }
	
	  /**
	   * Check if a string starts with $ or _
	   *
	   * @param {String} str
	   * @return {Boolean}
	   */
	
	  function isReserved(str) {
	    var c = (str + '').charCodeAt(0);
	    return c === 0x24 || c === 0x5F;
	  }
	
	  /**
	   * Guard text output, make sure undefined outputs
	   * empty string
	   *
	   * @param {*} value
	   * @return {String}
	   */
	
	  function _toString(value) {
	    return value == null ? '' : value.toString();
	  }
	
	  /**
	   * Check and convert possible numeric strings to numbers
	   * before setting back to data
	   *
	   * @param {*} value
	   * @return {*|Number}
	   */
	
	  function toNumber(value) {
	    if (typeof value !== 'string') {
	      return value;
	    } else {
	      var parsed = Number(value);
	      return isNaN(parsed) ? value : parsed;
	    }
	  }
	
	  /**
	   * Convert string boolean literals into real booleans.
	   *
	   * @param {*} value
	   * @return {*|Boolean}
	   */
	
	  function toBoolean(value) {
	    return value === 'true' ? true : value === 'false' ? false : value;
	  }
	
	  /**
	   * Strip quotes from a string
	   *
	   * @param {String} str
	   * @return {String | false}
	   */
	
	  function stripQuotes(str) {
	    var a = str.charCodeAt(0);
	    var b = str.charCodeAt(str.length - 1);
	    return a === b && (a === 0x22 || a === 0x27) ? str.slice(1, -1) : str;
	  }
	
	  /**
	   * Camelize a hyphen-delmited string.
	   *
	   * @param {String} str
	   * @return {String}
	   */
	
	  var camelizeRE = /-(\w)/g;
	
	  function camelize(str) {
	    return str.replace(camelizeRE, toUpper);
	  }
	
	  function toUpper(_, c) {
	    return c ? c.toUpperCase() : '';
	  }
	
	  /**
	   * Hyphenate a camelCase string.
	   *
	   * @param {String} str
	   * @return {String}
	   */
	
	  var hyphenateRE = /([a-z\d])([A-Z])/g;
	
	  function hyphenate(str) {
	    return str.replace(hyphenateRE, '$1-$2').toLowerCase();
	  }
	
	  /**
	   * Converts hyphen/underscore/slash delimitered names into
	   * camelized classNames.
	   *
	   * e.g. my-component => MyComponent
	   *      some_else    => SomeElse
	   *      some/comp    => SomeComp
	   *
	   * @param {String} str
	   * @return {String}
	   */
	
	  var classifyRE = /(?:^|[-_\/])(\w)/g;
	
	  function classify(str) {
	    return str.replace(classifyRE, toUpper);
	  }
	
	  /**
	   * Simple bind, faster than native
	   *
	   * @param {Function} fn
	   * @param {Object} ctx
	   * @return {Function}
	   */
	
	  function bind(fn, ctx) {
	    return function (a) {
	      var l = arguments.length;
	      return l ? l > 1 ? fn.apply(ctx, arguments) : fn.call(ctx, a) : fn.call(ctx);
	    };
	  }
	
	  /**
	   * Convert an Array-like object to a real Array.
	   *
	   * @param {Array-like} list
	   * @param {Number} [start] - start index
	   * @return {Array}
	   */
	
	  function toArray(list, start) {
	    start = start || 0;
	    var i = list.length - start;
	    var ret = new Array(i);
	    while (i--) {
	      ret[i] = list[i + start];
	    }
	    return ret;
	  }
	
	  /**
	   * Mix properties into target object.
	   *
	   * @param {Object} to
	   * @param {Object} from
	   */
	
	  function extend(to, from) {
	    var keys = Object.keys(from);
	    var i = keys.length;
	    while (i--) {
	      to[keys[i]] = from[keys[i]];
	    }
	    return to;
	  }
	
	  /**
	   * Quick object check - this is primarily used to tell
	   * Objects from primitive values when we know the value
	   * is a JSON-compliant type.
	   *
	   * @param {*} obj
	   * @return {Boolean}
	   */
	
	  function isObject(obj) {
	    return obj !== null && typeof obj === 'object';
	  }
	
	  /**
	   * Strict object type check. Only returns true
	   * for plain JavaScript objects.
	   *
	   * @param {*} obj
	   * @return {Boolean}
	   */
	
	  var toString = Object.prototype.toString;
	  var OBJECT_STRING = '[object Object]';
	
	  function isPlainObject(obj) {
	    return toString.call(obj) === OBJECT_STRING;
	  }
	
	  /**
	   * Array type check.
	   *
	   * @param {*} obj
	   * @return {Boolean}
	   */
	
	  var isArray = Array.isArray;
	
	  /**
	   * Define a property.
	   *
	   * @param {Object} obj
	   * @param {String} key
	   * @param {*} val
	   * @param {Boolean} [enumerable]
	   */
	
	  function def(obj, key, val, enumerable) {
	    Object.defineProperty(obj, key, {
	      value: val,
	      enumerable: !!enumerable,
	      writable: true,
	      configurable: true
	    });
	  }
	
	  /**
	   * Debounce a function so it only gets called after the
	   * input stops arriving after the given wait period.
	   *
	   * @param {Function} func
	   * @param {Number} wait
	   * @return {Function} - the debounced function
	   */
	
	  function _debounce(func, wait) {
	    var timeout, args, context, timestamp, result;
	    var later = function later() {
	      var last = Date.now() - timestamp;
	      if (last < wait && last >= 0) {
	        timeout = setTimeout(later, wait - last);
	      } else {
	        timeout = null;
	        result = func.apply(context, args);
	        if (!timeout) context = args = null;
	      }
	    };
	    return function () {
	      context = this;
	      args = arguments;
	      timestamp = Date.now();
	      if (!timeout) {
	        timeout = setTimeout(later, wait);
	      }
	      return result;
	    };
	  }
	
	  /**
	   * Manual indexOf because it's slightly faster than
	   * native.
	   *
	   * @param {Array} arr
	   * @param {*} obj
	   */
	
	  function indexOf(arr, obj) {
	    var i = arr.length;
	    while (i--) {
	      if (arr[i] === obj) return i;
	    }
	    return -1;
	  }
	
	  /**
	   * Make a cancellable version of an async callback.
	   *
	   * @param {Function} fn
	   * @return {Function}
	   */
	
	  function cancellable(fn) {
	    var cb = function cb() {
	      if (!cb.cancelled) {
	        return fn.apply(this, arguments);
	      }
	    };
	    cb.cancel = function () {
	      cb.cancelled = true;
	    };
	    return cb;
	  }
	
	  /**
	   * Check if two values are loosely equal - that is,
	   * if they are plain objects, do they have the same shape?
	   *
	   * @param {*} a
	   * @param {*} b
	   * @return {Boolean}
	   */
	
	  function looseEqual(a, b) {
	    /* eslint-disable eqeqeq */
	    return a == b || (isObject(a) && isObject(b) ? JSON.stringify(a) === JSON.stringify(b) : false);
	    /* eslint-enable eqeqeq */
	  }
	
	  var hasProto = ('__proto__' in {});
	
	  // Browser environment sniffing
	  var inBrowser = typeof window !== 'undefined' && Object.prototype.toString.call(window) !== '[object Object]';
	
	  // detect devtools
	  var devtools = inBrowser && window.__VUE_DEVTOOLS_GLOBAL_HOOK__;
	
	  // UA sniffing for working around browser-specific quirks
	  var UA = inBrowser && window.navigator.userAgent.toLowerCase();
	  var isIE9 = UA && UA.indexOf('msie 9.0') > 0;
	  var isAndroid = UA && UA.indexOf('android') > 0;
	  var isIos = UA && /(iphone|ipad|ipod|ios)/i.test(UA);
	  var isWechat = UA && UA.indexOf('micromessenger') > 0;
	
	  var transitionProp = undefined;
	  var transitionEndEvent = undefined;
	  var animationProp = undefined;
	  var animationEndEvent = undefined;
	
	  // Transition property/event sniffing
	  if (inBrowser && !isIE9) {
	    var isWebkitTrans = window.ontransitionend === undefined && window.onwebkittransitionend !== undefined;
	    var isWebkitAnim = window.onanimationend === undefined && window.onwebkitanimationend !== undefined;
	    transitionProp = isWebkitTrans ? 'WebkitTransition' : 'transition';
	    transitionEndEvent = isWebkitTrans ? 'webkitTransitionEnd' : 'transitionend';
	    animationProp = isWebkitAnim ? 'WebkitAnimation' : 'animation';
	    animationEndEvent = isWebkitAnim ? 'webkitAnimationEnd' : 'animationend';
	  }
	
	  /**
	   * Defer a task to execute it asynchronously. Ideally this
	   * should be executed as a microtask, so we leverage
	   * MutationObserver if it's available, and fallback to
	   * setTimeout(0).
	   *
	   * @param {Function} cb
	   * @param {Object} ctx
	   */
	
	  var nextTick = (function () {
	    var callbacks = [];
	    var pending = false;
	    var timerFunc;
	    function nextTickHandler() {
	      pending = false;
	      var copies = callbacks.slice(0);
	      callbacks = [];
	      for (var i = 0; i < copies.length; i++) {
	        copies[i]();
	      }
	    }
	
	    /* istanbul ignore if */
	    if (typeof MutationObserver !== 'undefined' && !(isWechat && isIos)) {
	      var counter = 1;
	      var observer = new MutationObserver(nextTickHandler);
	      var textNode = document.createTextNode(counter);
	      observer.observe(textNode, {
	        characterData: true
	      });
	      timerFunc = function () {
	        counter = (counter + 1) % 2;
	        textNode.data = counter;
	      };
	    } else {
	      // webpack attempts to inject a shim for setImmediate
	      // if it is used as a global, so we have to work around that to
	      // avoid bundling unnecessary code.
	      var context = inBrowser ? window : typeof global !== 'undefined' ? global : {};
	      timerFunc = context.setImmediate || setTimeout;
	    }
	    return function (cb, ctx) {
	      var func = ctx ? function () {
	        cb.call(ctx);
	      } : cb;
	      callbacks.push(func);
	      if (pending) return;
	      pending = true;
	      timerFunc(nextTickHandler, 0);
	    };
	  })();
	
	  var _Set = undefined;
	  /* istanbul ignore if */
	  if (typeof Set !== 'undefined' && Set.toString().match(/native code/)) {
	    // use native Set when available.
	    _Set = Set;
	  } else {
	    // a non-standard Set polyfill that only works with primitive keys.
	    _Set = function () {
	      this.set = Object.create(null);
	    };
	    _Set.prototype.has = function (key) {
	      return this.set[key] !== undefined;
	    };
	    _Set.prototype.add = function (key) {
	      this.set[key] = 1;
	    };
	    _Set.prototype.clear = function () {
	      this.set = Object.create(null);
	    };
	  }
	
	  function Cache(limit) {
	    this.size = 0;
	    this.limit = limit;
	    this.head = this.tail = undefined;
	    this._keymap = Object.create(null);
	  }
	
	  var p = Cache.prototype;
	
	  /**
	   * Put <value> into the cache associated with <key>.
	   * Returns the entry which was removed to make room for
	   * the new entry. Otherwise undefined is returned.
	   * (i.e. if there was enough room already).
	   *
	   * @param {String} key
	   * @param {*} value
	   * @return {Entry|undefined}
	   */
	
	  p.put = function (key, value) {
	    var removed;
	    if (this.size === this.limit) {
	      removed = this.shift();
	    }
	
	    var entry = this.get(key, true);
	    if (!entry) {
	      entry = {
	        key: key
	      };
	      this._keymap[key] = entry;
	      if (this.tail) {
	        this.tail.newer = entry;
	        entry.older = this.tail;
	      } else {
	        this.head = entry;
	      }
	      this.tail = entry;
	      this.size++;
	    }
	    entry.value = value;
	
	    return removed;
	  };
	
	  /**
	   * Purge the least recently used (oldest) entry from the
	   * cache. Returns the removed entry or undefined if the
	   * cache was empty.
	   */
	
	  p.shift = function () {
	    var entry = this.head;
	    if (entry) {
	      this.head = this.head.newer;
	      this.head.older = undefined;
	      entry.newer = entry.older = undefined;
	      this._keymap[entry.key] = undefined;
	      this.size--;
	    }
	    return entry;
	  };
	
	  /**
	   * Get and register recent use of <key>. Returns the value
	   * associated with <key> or undefined if not in cache.
	   *
	   * @param {String} key
	   * @param {Boolean} returnEntry
	   * @return {Entry|*}
	   */
	
	  p.get = function (key, returnEntry) {
	    var entry = this._keymap[key];
	    if (entry === undefined) return;
	    if (entry === this.tail) {
	      return returnEntry ? entry : entry.value;
	    }
	    // HEAD--------------TAIL
	    //   <.older   .newer>
	    //  <--- add direction --
	    //   A  B  C  <D>  E
	    if (entry.newer) {
	      if (entry === this.head) {
	        this.head = entry.newer;
	      }
	      entry.newer.older = entry.older; // C <-- E.
	    }
	    if (entry.older) {
	      entry.older.newer = entry.newer; // C. --> E
	    }
	    entry.newer = undefined; // D --x
	    entry.older = this.tail; // D. --> E
	    if (this.tail) {
	      this.tail.newer = entry; // E. <-- D
	    }
	    this.tail = entry;
	    return returnEntry ? entry : entry.value;
	  };
	
	  var cache$1 = new Cache(1000);
	  var filterTokenRE = /[^\s'"]+|'[^']*'|"[^"]*"/g;
	  var reservedArgRE = /^in$|^-?\d+/;
	
	  /**
	   * Parser state
	   */
	
	  var str;
	  var dir;
	  var c;
	  var prev;
	  var i;
	  var l;
	  var lastFilterIndex;
	  var inSingle;
	  var inDouble;
	  var curly;
	  var square;
	  var paren;
	  /**
	   * Push a filter to the current directive object
	   */
	
	  function pushFilter() {
	    var exp = str.slice(lastFilterIndex, i).trim();
	    var filter;
	    if (exp) {
	      filter = {};
	      var tokens = exp.match(filterTokenRE);
	      filter.name = tokens[0];
	      if (tokens.length > 1) {
	        filter.args = tokens.slice(1).map(processFilterArg);
	      }
	    }
	    if (filter) {
	      (dir.filters = dir.filters || []).push(filter);
	    }
	    lastFilterIndex = i + 1;
	  }
	
	  /**
	   * Check if an argument is dynamic and strip quotes.
	   *
	   * @param {String} arg
	   * @return {Object}
	   */
	
	  function processFilterArg(arg) {
	    if (reservedArgRE.test(arg)) {
	      return {
	        value: toNumber(arg),
	        dynamic: false
	      };
	    } else {
	      var stripped = stripQuotes(arg);
	      var dynamic = stripped === arg;
	      return {
	        value: dynamic ? arg : stripped,
	        dynamic: dynamic
	      };
	    }
	  }
	
	  /**
	   * Parse a directive value and extract the expression
	   * and its filters into a descriptor.
	   *
	   * Example:
	   *
	   * "a + 1 | uppercase" will yield:
	   * {
	   *   expression: 'a + 1',
	   *   filters: [
	   *     { name: 'uppercase', args: null }
	   *   ]
	   * }
	   *
	   * @param {String} s
	   * @return {Object}
	   */
	
	  function parseDirective(s) {
	    var hit = cache$1.get(s);
	    if (hit) {
	      return hit;
	    }
	
	    // reset parser state
	    str = s;
	    inSingle = inDouble = false;
	    curly = square = paren = 0;
	    lastFilterIndex = 0;
	    dir = {};
	
	    for (i = 0, l = str.length; i < l; i++) {
	      prev = c;
	      c = str.charCodeAt(i);
	      if (inSingle) {
	        // check single quote
	        if (c === 0x27 && prev !== 0x5C) inSingle = !inSingle;
	      } else if (inDouble) {
	        // check double quote
	        if (c === 0x22 && prev !== 0x5C) inDouble = !inDouble;
	      } else if (c === 0x7C && // pipe
	      str.charCodeAt(i + 1) !== 0x7C && str.charCodeAt(i - 1) !== 0x7C) {
	        if (dir.expression == null) {
	          // first filter, end of expression
	          lastFilterIndex = i + 1;
	          dir.expression = str.slice(0, i).trim();
	        } else {
	          // already has filter
	          pushFilter();
	        }
	      } else {
	        switch (c) {
	          case 0x22:
	            inDouble = true;break; // "
	          case 0x27:
	            inSingle = true;break; // '
	          case 0x28:
	            paren++;break; // (
	          case 0x29:
	            paren--;break; // )
	          case 0x5B:
	            square++;break; // [
	          case 0x5D:
	            square--;break; // ]
	          case 0x7B:
	            curly++;break; // {
	          case 0x7D:
	            curly--;break; // }
	        }
	      }
	    }
	
	    if (dir.expression == null) {
	      dir.expression = str.slice(0, i).trim();
	    } else if (lastFilterIndex !== 0) {
	      pushFilter();
	    }
	
	    cache$1.put(s, dir);
	    return dir;
	  }
	
	var directive = Object.freeze({
	    parseDirective: parseDirective
	  });
	
	  var regexEscapeRE = /[-.*+?^${}()|[\]\/\\]/g;
	  var cache = undefined;
	  var tagRE = undefined;
	  var htmlRE = undefined;
	  /**
	   * Escape a string so it can be used in a RegExp
	   * constructor.
	   *
	   * @param {String} str
	   */
	
	  function escapeRegex(str) {
	    return str.replace(regexEscapeRE, '\\$&');
	  }
	
	  function compileRegex() {
	    var open = escapeRegex(config.delimiters[0]);
	    var close = escapeRegex(config.delimiters[1]);
	    var unsafeOpen = escapeRegex(config.unsafeDelimiters[0]);
	    var unsafeClose = escapeRegex(config.unsafeDelimiters[1]);
	    tagRE = new RegExp(unsafeOpen + '((?:.|\\n)+?)' + unsafeClose + '|' + open + '((?:.|\\n)+?)' + close, 'g');
	    htmlRE = new RegExp('^' + unsafeOpen + '.*' + unsafeClose + '$');
	    // reset cache
	    cache = new Cache(1000);
	  }
	
	  /**
	   * Parse a template text string into an array of tokens.
	   *
	   * @param {String} text
	   * @return {Array<Object> | null}
	   *               - {String} type
	   *               - {String} value
	   *               - {Boolean} [html]
	   *               - {Boolean} [oneTime]
	   */
	
	  function parseText(text) {
	    if (!cache) {
	      compileRegex();
	    }
	    var hit = cache.get(text);
	    if (hit) {
	      return hit;
	    }
	    if (!tagRE.test(text)) {
	      return null;
	    }
	    var tokens = [];
	    var lastIndex = tagRE.lastIndex = 0;
	    var match, index, html, value, first, oneTime;
	    /* eslint-disable no-cond-assign */
	    while (match = tagRE.exec(text)) {
	      /* eslint-enable no-cond-assign */
	      index = match.index;
	      // push text token
	      if (index > lastIndex) {
	        tokens.push({
	          value: text.slice(lastIndex, index)
	        });
	      }
	      // tag token
	      html = htmlRE.test(match[0]);
	      value = html ? match[1] : match[2];
	      first = value.charCodeAt(0);
	      oneTime = first === 42; // *
	      value = oneTime ? value.slice(1) : value;
	      tokens.push({
	        tag: true,
	        value: value.trim(),
	        html: html,
	        oneTime: oneTime
	      });
	      lastIndex = index + match[0].length;
	    }
	    if (lastIndex < text.length) {
	      tokens.push({
	        value: text.slice(lastIndex)
	      });
	    }
	    cache.put(text, tokens);
	    return tokens;
	  }
	
	  /**
	   * Format a list of tokens into an expression.
	   * e.g. tokens parsed from 'a {{b}} c' can be serialized
	   * into one single expression as '"a " + b + " c"'.
	   *
	   * @param {Array} tokens
	   * @param {Vue} [vm]
	   * @return {String}
	   */
	
	  function tokensToExp(tokens, vm) {
	    if (tokens.length > 1) {
	      return tokens.map(function (token) {
	        return formatToken(token, vm);
	      }).join('+');
	    } else {
	      return formatToken(tokens[0], vm, true);
	    }
	  }
	
	  /**
	   * Format a single token.
	   *
	   * @param {Object} token
	   * @param {Vue} [vm]
	   * @param {Boolean} [single]
	   * @return {String}
	   */
	
	  function formatToken(token, vm, single) {
	    return token.tag ? token.oneTime && vm ? '"' + vm.$eval(token.value) + '"' : inlineFilters(token.value, single) : '"' + token.value + '"';
	  }
	
	  /**
	   * For an attribute with multiple interpolation tags,
	   * e.g. attr="some-{{thing | filter}}", in order to combine
	   * the whole thing into a single watchable expression, we
	   * have to inline those filters. This function does exactly
	   * that. This is a bit hacky but it avoids heavy changes
	   * to directive parser and watcher mechanism.
	   *
	   * @param {String} exp
	   * @param {Boolean} single
	   * @return {String}
	   */
	
	  var filterRE = /[^|]\|[^|]/;
	  function inlineFilters(exp, single) {
	    if (!filterRE.test(exp)) {
	      return single ? exp : '(' + exp + ')';
	    } else {
	      var dir = parseDirective(exp);
	      if (!dir.filters) {
	        return '(' + exp + ')';
	      } else {
	        return 'this._applyFilters(' + dir.expression + // value
	        ',null,' + // oldValue (null for read)
	        JSON.stringify(dir.filters) + // filter descriptors
	        ',false)'; // write?
	      }
	    }
	  }
	
	var text = Object.freeze({
	    compileRegex: compileRegex,
	    parseText: parseText,
	    tokensToExp: tokensToExp
	  });
	
	  var delimiters = ['{{', '}}'];
	  var unsafeDelimiters = ['{{{', '}}}'];
	
	  var config = Object.defineProperties({
	
	    /**
	     * Whether to print debug messages.
	     * Also enables stack trace for warnings.
	     *
	     * @type {Boolean}
	     */
	
	    debug: false,
	
	    /**
	     * Whether to suppress warnings.
	     *
	     * @type {Boolean}
	     */
	
	    silent: false,
	
	    /**
	     * Whether to use async rendering.
	     */
	
	    async: true,
	
	    /**
	     * Whether to warn against errors caught when evaluating
	     * expressions.
	     */
	
	    warnExpressionErrors: true,
	
	    /**
	     * Whether to allow devtools inspection.
	     * Disabled by default in production builds.
	     */
	
	    devtools: 'development' !== 'production',
	
	    /**
	     * Internal flag to indicate the delimiters have been
	     * changed.
	     *
	     * @type {Boolean}
	     */
	
	    _delimitersChanged: true,
	
	    /**
	     * List of asset types that a component can own.
	     *
	     * @type {Array}
	     */
	
	    _assetTypes: ['component', 'directive', 'elementDirective', 'filter', 'transition', 'partial'],
	
	    /**
	     * prop binding modes
	     */
	
	    _propBindingModes: {
	      ONE_WAY: 0,
	      TWO_WAY: 1,
	      ONE_TIME: 2
	    },
	
	    /**
	     * Max circular updates allowed in a batcher flush cycle.
	     */
	
	    _maxUpdateCount: 100
	
	  }, {
	    delimiters: { /**
	                   * Interpolation delimiters. Changing these would trigger
	                   * the text parser to re-compile the regular expressions.
	                   *
	                   * @type {Array<String>}
	                   */
	
	      get: function get() {
	        return delimiters;
	      },
	      set: function set(val) {
	        delimiters = val;
	        compileRegex();
	      },
	      configurable: true,
	      enumerable: true
	    },
	    unsafeDelimiters: {
	      get: function get() {
	        return unsafeDelimiters;
	      },
	      set: function set(val) {
	        unsafeDelimiters = val;
	        compileRegex();
	      },
	      configurable: true,
	      enumerable: true
	    }
	  });
	
	  var warn = undefined;
	  var formatComponentName = undefined;
	
	  if (true) {
	    (function () {
	      var hasConsole = typeof console !== 'undefined';
	
	      warn = function (msg, vm) {
	        if (hasConsole && !config.silent) {
	          console.error('[Vue warn]: ' + msg + (vm ? formatComponentName(vm) : ''));
	        }
	      };
	
	      formatComponentName = function (vm) {
	        var name = vm._isVue ? vm.$options.name : vm.name;
	        return name ? ' (found in component: <' + hyphenate(name) + '>)' : '';
	      };
	    })();
	  }
	
	  /**
	   * Append with transition.
	   *
	   * @param {Element} el
	   * @param {Element} target
	   * @param {Vue} vm
	   * @param {Function} [cb]
	   */
	
	  function appendWithTransition(el, target, vm, cb) {
	    applyTransition(el, 1, function () {
	      target.appendChild(el);
	    }, vm, cb);
	  }
	
	  /**
	   * InsertBefore with transition.
	   *
	   * @param {Element} el
	   * @param {Element} target
	   * @param {Vue} vm
	   * @param {Function} [cb]
	   */
	
	  function beforeWithTransition(el, target, vm, cb) {
	    applyTransition(el, 1, function () {
	      before(el, target);
	    }, vm, cb);
	  }
	
	  /**
	   * Remove with transition.
	   *
	   * @param {Element} el
	   * @param {Vue} vm
	   * @param {Function} [cb]
	   */
	
	  function removeWithTransition(el, vm, cb) {
	    applyTransition(el, -1, function () {
	      remove(el);
	    }, vm, cb);
	  }
	
	  /**
	   * Apply transitions with an operation callback.
	   *
	   * @param {Element} el
	   * @param {Number} direction
	   *                  1: enter
	   *                 -1: leave
	   * @param {Function} op - the actual DOM operation
	   * @param {Vue} vm
	   * @param {Function} [cb]
	   */
	
	  function applyTransition(el, direction, op, vm, cb) {
	    var transition = el.__v_trans;
	    if (!transition ||
	    // skip if there are no js hooks and CSS transition is
	    // not supported
	    !transition.hooks && !transitionEndEvent ||
	    // skip transitions for initial compile
	    !vm._isCompiled ||
	    // if the vm is being manipulated by a parent directive
	    // during the parent's compilation phase, skip the
	    // animation.
	    vm.$parent && !vm.$parent._isCompiled) {
	      op();
	      if (cb) cb();
	      return;
	    }
	    var action = direction > 0 ? 'enter' : 'leave';
	    transition[action](op, cb);
	  }
	
	var transition = Object.freeze({
	    appendWithTransition: appendWithTransition,
	    beforeWithTransition: beforeWithTransition,
	    removeWithTransition: removeWithTransition,
	    applyTransition: applyTransition
	  });
	
	  /**
	   * Query an element selector if it's not an element already.
	   *
	   * @param {String|Element} el
	   * @return {Element}
	   */
	
	  function query(el) {
	    if (typeof el === 'string') {
	      var selector = el;
	      el = document.querySelector(el);
	      if (!el) {
	        'development' !== 'production' && warn('Cannot find element: ' + selector);
	      }
	    }
	    return el;
	  }
	
	  /**
	   * Check if a node is in the document.
	   * Note: document.documentElement.contains should work here
	   * but always returns false for comment nodes in phantomjs,
	   * making unit tests difficult. This is fixed by doing the
	   * contains() check on the node's parentNode instead of
	   * the node itself.
	   *
	   * @param {Node} node
	   * @return {Boolean}
	   */
	
	  function inDoc(node) {
	    if (!node) return false;
	    var doc = node.ownerDocument.documentElement;
	    var parent = node.parentNode;
	    return doc === node || doc === parent || !!(parent && parent.nodeType === 1 && doc.contains(parent));
	  }
	
	  /**
	   * Get and remove an attribute from a node.
	   *
	   * @param {Node} node
	   * @param {String} _attr
	   */
	
	  function getAttr(node, _attr) {
	    var val = node.getAttribute(_attr);
	    if (val !== null) {
	      node.removeAttribute(_attr);
	    }
	    return val;
	  }
	
	  /**
	   * Get an attribute with colon or v-bind: prefix.
	   *
	   * @param {Node} node
	   * @param {String} name
	   * @return {String|null}
	   */
	
	  function getBindAttr(node, name) {
	    var val = getAttr(node, ':' + name);
	    if (val === null) {
	      val = getAttr(node, 'v-bind:' + name);
	    }
	    return val;
	  }
	
	  /**
	   * Check the presence of a bind attribute.
	   *
	   * @param {Node} node
	   * @param {String} name
	   * @return {Boolean}
	   */
	
	  function hasBindAttr(node, name) {
	    return node.hasAttribute(name) || node.hasAttribute(':' + name) || node.hasAttribute('v-bind:' + name);
	  }
	
	  /**
	   * Insert el before target
	   *
	   * @param {Element} el
	   * @param {Element} target
	   */
	
	  function before(el, target) {
	    target.parentNode.insertBefore(el, target);
	  }
	
	  /**
	   * Insert el after target
	   *
	   * @param {Element} el
	   * @param {Element} target
	   */
	
	  function after(el, target) {
	    if (target.nextSibling) {
	      before(el, target.nextSibling);
	    } else {
	      target.parentNode.appendChild(el);
	    }
	  }
	
	  /**
	   * Remove el from DOM
	   *
	   * @param {Element} el
	   */
	
	  function remove(el) {
	    el.parentNode.removeChild(el);
	  }
	
	  /**
	   * Prepend el to target
	   *
	   * @param {Element} el
	   * @param {Element} target
	   */
	
	  function prepend(el, target) {
	    if (target.firstChild) {
	      before(el, target.firstChild);
	    } else {
	      target.appendChild(el);
	    }
	  }
	
	  /**
	   * Replace target with el
	   *
	   * @param {Element} target
	   * @param {Element} el
	   */
	
	  function replace(target, el) {
	    var parent = target.parentNode;
	    if (parent) {
	      parent.replaceChild(el, target);
	    }
	  }
	
	  /**
	   * Add event listener shorthand.
	   *
	   * @param {Element} el
	   * @param {String} event
	   * @param {Function} cb
	   * @param {Boolean} [useCapture]
	   */
	
	  function on(el, event, cb, useCapture) {
	    el.addEventListener(event, cb, useCapture);
	  }
	
	  /**
	   * Remove event listener shorthand.
	   *
	   * @param {Element} el
	   * @param {String} event
	   * @param {Function} cb
	   */
	
	  function off(el, event, cb) {
	    el.removeEventListener(event, cb);
	  }
	
	  /**
	   * For IE9 compat: when both class and :class are present
	   * getAttribute('class') returns wrong value...
	   *
	   * @param {Element} el
	   * @return {String}
	   */
	
	  function getClass(el) {
	    var classname = el.className;
	    if (typeof classname === 'object') {
	      classname = classname.baseVal || '';
	    }
	    return classname;
	  }
	
	  /**
	   * In IE9, setAttribute('class') will result in empty class
	   * if the element also has the :class attribute; However in
	   * PhantomJS, setting `className` does not work on SVG elements...
	   * So we have to do a conditional check here.
	   *
	   * @param {Element} el
	   * @param {String} cls
	   */
	
	  function setClass(el, cls) {
	    /* istanbul ignore if */
	    if (isIE9 && !/svg$/.test(el.namespaceURI)) {
	      el.className = cls;
	    } else {
	      el.setAttribute('class', cls);
	    }
	  }
	
	  /**
	   * Add class with compatibility for IE & SVG
	   *
	   * @param {Element} el
	   * @param {String} cls
	   */
	
	  function addClass(el, cls) {
	    if (el.classList) {
	      el.classList.add(cls);
	    } else {
	      var cur = ' ' + getClass(el) + ' ';
	      if (cur.indexOf(' ' + cls + ' ') < 0) {
	        setClass(el, (cur + cls).trim());
	      }
	    }
	  }
	
	  /**
	   * Remove class with compatibility for IE & SVG
	   *
	   * @param {Element} el
	   * @param {String} cls
	   */
	
	  function removeClass(el, cls) {
	    if (el.classList) {
	      el.classList.remove(cls);
	    } else {
	      var cur = ' ' + getClass(el) + ' ';
	      var tar = ' ' + cls + ' ';
	      while (cur.indexOf(tar) >= 0) {
	        cur = cur.replace(tar, ' ');
	      }
	      setClass(el, cur.trim());
	    }
	    if (!el.className) {
	      el.removeAttribute('class');
	    }
	  }
	
	  /**
	   * Extract raw content inside an element into a temporary
	   * container div
	   *
	   * @param {Element} el
	   * @param {Boolean} asFragment
	   * @return {Element|DocumentFragment}
	   */
	
	  function extractContent(el, asFragment) {
	    var child;
	    var rawContent;
	    /* istanbul ignore if */
	    if (isTemplate(el) && isFragment(el.content)) {
	      el = el.content;
	    }
	    if (el.hasChildNodes()) {
	      trimNode(el);
	      rawContent = asFragment ? document.createDocumentFragment() : document.createElement('div');
	      /* eslint-disable no-cond-assign */
	      while (child = el.firstChild) {
	        /* eslint-enable no-cond-assign */
	        rawContent.appendChild(child);
	      }
	    }
	    return rawContent;
	  }
	
	  /**
	   * Trim possible empty head/tail text and comment
	   * nodes inside a parent.
	   *
	   * @param {Node} node
	   */
	
	  function trimNode(node) {
	    var child;
	    /* eslint-disable no-sequences */
	    while ((child = node.firstChild, isTrimmable(child))) {
	      node.removeChild(child);
	    }
	    while ((child = node.lastChild, isTrimmable(child))) {
	      node.removeChild(child);
	    }
	    /* eslint-enable no-sequences */
	  }
	
	  function isTrimmable(node) {
	    return node && (node.nodeType === 3 && !node.data.trim() || node.nodeType === 8);
	  }
	
	  /**
	   * Check if an element is a template tag.
	   * Note if the template appears inside an SVG its tagName
	   * will be in lowercase.
	   *
	   * @param {Element} el
	   */
	
	  function isTemplate(el) {
	    return el.tagName && el.tagName.toLowerCase() === 'template';
	  }
	
	  /**
	   * Create an "anchor" for performing dom insertion/removals.
	   * This is used in a number of scenarios:
	   * - fragment instance
	   * - v-html
	   * - v-if
	   * - v-for
	   * - component
	   *
	   * @param {String} content
	   * @param {Boolean} persist - IE trashes empty textNodes on
	   *                            cloneNode(true), so in certain
	   *                            cases the anchor needs to be
	   *                            non-empty to be persisted in
	   *                            templates.
	   * @return {Comment|Text}
	   */
	
	  function createAnchor(content, persist) {
	    var anchor = config.debug ? document.createComment(content) : document.createTextNode(persist ? ' ' : '');
	    anchor.__v_anchor = true;
	    return anchor;
	  }
	
	  /**
	   * Find a component ref attribute that starts with $.
	   *
	   * @param {Element} node
	   * @return {String|undefined}
	   */
	
	  var refRE = /^v-ref:/;
	
	  function findRef(node) {
	    if (node.hasAttributes()) {
	      var attrs = node.attributes;
	      for (var i = 0, l = attrs.length; i < l; i++) {
	        var name = attrs[i].name;
	        if (refRE.test(name)) {
	          return camelize(name.replace(refRE, ''));
	        }
	      }
	    }
	  }
	
	  /**
	   * Map a function to a range of nodes .
	   *
	   * @param {Node} node
	   * @param {Node} end
	   * @param {Function} op
	   */
	
	  function mapNodeRange(node, end, op) {
	    var next;
	    while (node !== end) {
	      next = node.nextSibling;
	      op(node);
	      node = next;
	    }
	    op(end);
	  }
	
	  /**
	   * Remove a range of nodes with transition, store
	   * the nodes in a fragment with correct ordering,
	   * and call callback when done.
	   *
	   * @param {Node} start
	   * @param {Node} end
	   * @param {Vue} vm
	   * @param {DocumentFragment} frag
	   * @param {Function} cb
	   */
	
	  function removeNodeRange(start, end, vm, frag, cb) {
	    var done = false;
	    var removed = 0;
	    var nodes = [];
	    mapNodeRange(start, end, function (node) {
	      if (node === end) done = true;
	      nodes.push(node);
	      removeWithTransition(node, vm, onRemoved);
	    });
	    function onRemoved() {
	      removed++;
	      if (done && removed >= nodes.length) {
	        for (var i = 0; i < nodes.length; i++) {
	          frag.appendChild(nodes[i]);
	        }
	        cb && cb();
	      }
	    }
	  }
	
	  /**
	   * Check if a node is a DocumentFragment.
	   *
	   * @param {Node} node
	   * @return {Boolean}
	   */
	
	  function isFragment(node) {
	    return node && node.nodeType === 11;
	  }
	
	  /**
	   * Get outerHTML of elements, taking care
	   * of SVG elements in IE as well.
	   *
	   * @param {Element} el
	   * @return {String}
	   */
	
	  function getOuterHTML(el) {
	    if (el.outerHTML) {
	      return el.outerHTML;
	    } else {
	      var container = document.createElement('div');
	      container.appendChild(el.cloneNode(true));
	      return container.innerHTML;
	    }
	  }
	
	  var commonTagRE = /^(div|p|span|img|a|b|i|br|ul|ol|li|h1|h2|h3|h4|h5|h6|code|pre|table|th|td|tr|form|label|input|select|option|nav|article|section|header|footer)$/i;
	  var reservedTagRE = /^(slot|partial|component)$/i;
	
	  var isUnknownElement = undefined;
	  if (true) {
	    isUnknownElement = function (el, tag) {
	      if (tag.indexOf('-') > -1) {
	        // http://stackoverflow.com/a/28210364/1070244
	        return el.constructor === window.HTMLUnknownElement || el.constructor === window.HTMLElement;
	      } else {
	        return (/HTMLUnknownElement/.test(el.toString()) &&
	          // Chrome returns unknown for several HTML5 elements.
	          // https://code.google.com/p/chromium/issues/detail?id=540526
	          !/^(data|time|rtc|rb)$/.test(tag)
	        );
	      }
	    };
	  }
	
	  /**
	   * Check if an element is a component, if yes return its
	   * component id.
	   *
	   * @param {Element} el
	   * @param {Object} options
	   * @return {Object|undefined}
	   */
	
	  function checkComponentAttr(el, options) {
	    var tag = el.tagName.toLowerCase();
	    var hasAttrs = el.hasAttributes();
	    if (!commonTagRE.test(tag) && !reservedTagRE.test(tag)) {
	      if (resolveAsset(options, 'components', tag)) {
	        return { id: tag };
	      } else {
	        var is = hasAttrs && getIsBinding(el, options);
	        if (is) {
	          return is;
	        } else if (true) {
	          var expectedTag = options._componentNameMap && options._componentNameMap[tag];
	          if (expectedTag) {
	            warn('Unknown custom element: <' + tag + '> - ' + 'did you mean <' + expectedTag + '>? ' + 'HTML is case-insensitive, remember to use kebab-case in templates.');
	          } else if (isUnknownElement(el, tag)) {
	            warn('Unknown custom element: <' + tag + '> - did you ' + 'register the component correctly? For recursive components, ' + 'make sure to provide the "name" option.');
	          }
	        }
	      }
	    } else if (hasAttrs) {
	      return getIsBinding(el, options);
	    }
	  }
	
	  /**
	   * Get "is" binding from an element.
	   *
	   * @param {Element} el
	   * @param {Object} options
	   * @return {Object|undefined}
	   */
	
	  function getIsBinding(el, options) {
	    // dynamic syntax
	    var exp = el.getAttribute('is');
	    if (exp != null) {
	      if (resolveAsset(options, 'components', exp)) {
	        el.removeAttribute('is');
	        return { id: exp };
	      }
	    } else {
	      exp = getBindAttr(el, 'is');
	      if (exp != null) {
	        return { id: exp, dynamic: true };
	      }
	    }
	  }
	
	  /**
	   * Option overwriting strategies are functions that handle
	   * how to merge a parent option value and a child option
	   * value into the final value.
	   *
	   * All strategy functions follow the same signature:
	   *
	   * @param {*} parentVal
	   * @param {*} childVal
	   * @param {Vue} [vm]
	   */
	
	  var strats = config.optionMergeStrategies = Object.create(null);
	
	  /**
	   * Helper that recursively merges two data objects together.
	   */
	
	  function mergeData(to, from) {
	    var key, toVal, fromVal;
	    for (key in from) {
	      toVal = to[key];
	      fromVal = from[key];
	      if (!hasOwn(to, key)) {
	        set(to, key, fromVal);
	      } else if (isObject(toVal) && isObject(fromVal)) {
	        mergeData(toVal, fromVal);
	      }
	    }
	    return to;
	  }
	
	  /**
	   * Data
	   */
	
	  strats.data = function (parentVal, childVal, vm) {
	    if (!vm) {
	      // in a Vue.extend merge, both should be functions
	      if (!childVal) {
	        return parentVal;
	      }
	      if (typeof childVal !== 'function') {
	        'development' !== 'production' && warn('The "data" option should be a function ' + 'that returns a per-instance value in component ' + 'definitions.', vm);
	        return parentVal;
	      }
	      if (!parentVal) {
	        return childVal;
	      }
	      // when parentVal & childVal are both present,
	      // we need to return a function that returns the
	      // merged result of both functions... no need to
	      // check if parentVal is a function here because
	      // it has to be a function to pass previous merges.
	      return function mergedDataFn() {
	        return mergeData(childVal.call(this), parentVal.call(this));
	      };
	    } else if (parentVal || childVal) {
	      return function mergedInstanceDataFn() {
	        // instance merge
	        var instanceData = typeof childVal === 'function' ? childVal.call(vm) : childVal;
	        var defaultData = typeof parentVal === 'function' ? parentVal.call(vm) : undefined;
	        if (instanceData) {
	          return mergeData(instanceData, defaultData);
	        } else {
	          return defaultData;
	        }
	      };
	    }
	  };
	
	  /**
	   * El
	   */
	
	  strats.el = function (parentVal, childVal, vm) {
	    if (!vm && childVal && typeof childVal !== 'function') {
	      'development' !== 'production' && warn('The "el" option should be a function ' + 'that returns a per-instance value in component ' + 'definitions.', vm);
	      return;
	    }
	    var ret = childVal || parentVal;
	    // invoke the element factory if this is instance merge
	    return vm && typeof ret === 'function' ? ret.call(vm) : ret;
	  };
	
	  /**
	   * Hooks and param attributes are merged as arrays.
	   */
	
	  strats.init = strats.created = strats.ready = strats.attached = strats.detached = strats.beforeCompile = strats.compiled = strats.beforeDestroy = strats.destroyed = strats.activate = function (parentVal, childVal) {
	    return childVal ? parentVal ? parentVal.concat(childVal) : isArray(childVal) ? childVal : [childVal] : parentVal;
	  };
	
	  /**
	   * Assets
	   *
	   * When a vm is present (instance creation), we need to do
	   * a three-way merge between constructor options, instance
	   * options and parent options.
	   */
	
	  function mergeAssets(parentVal, childVal) {
	    var res = Object.create(parentVal || null);
	    return childVal ? extend(res, guardArrayAssets(childVal)) : res;
	  }
	
	  config._assetTypes.forEach(function (type) {
	    strats[type + 's'] = mergeAssets;
	  });
	
	  /**
	   * Events & Watchers.
	   *
	   * Events & watchers hashes should not overwrite one
	   * another, so we merge them as arrays.
	   */
	
	  strats.watch = strats.events = function (parentVal, childVal) {
	    if (!childVal) return parentVal;
	    if (!parentVal) return childVal;
	    var ret = {};
	    extend(ret, parentVal);
	    for (var key in childVal) {
	      var parent = ret[key];
	      var child = childVal[key];
	      if (parent && !isArray(parent)) {
	        parent = [parent];
	      }
	      ret[key] = parent ? parent.concat(child) : [child];
	    }
	    return ret;
	  };
	
	  /**
	   * Other object hashes.
	   */
	
	  strats.props = strats.methods = strats.computed = function (parentVal, childVal) {
	    if (!childVal) return parentVal;
	    if (!parentVal) return childVal;
	    var ret = Object.create(null);
	    extend(ret, parentVal);
	    extend(ret, childVal);
	    return ret;
	  };
	
	  /**
	   * Default strategy.
	   */
	
	  var defaultStrat = function defaultStrat(parentVal, childVal) {
	    return childVal === undefined ? parentVal : childVal;
	  };
	
	  /**
	   * Make sure component options get converted to actual
	   * constructors.
	   *
	   * @param {Object} options
	   */
	
	  function guardComponents(options) {
	    if (options.components) {
	      var components = options.components = guardArrayAssets(options.components);
	      var ids = Object.keys(components);
	      var def;
	      if (true) {
	        var map = options._componentNameMap = {};
	      }
	      for (var i = 0, l = ids.length; i < l; i++) {
	        var key = ids[i];
	        if (commonTagRE.test(key) || reservedTagRE.test(key)) {
	          'development' !== 'production' && warn('Do not use built-in or reserved HTML elements as component ' + 'id: ' + key);
	          continue;
	        }
	        // record a all lowercase <-> kebab-case mapping for
	        // possible custom element case error warning
	        if (true) {
	          map[key.replace(/-/g, '').toLowerCase()] = hyphenate(key);
	        }
	        def = components[key];
	        if (isPlainObject(def)) {
	          components[key] = Vue.extend(def);
	        }
	      }
	    }
	  }
	
	  /**
	   * Ensure all props option syntax are normalized into the
	   * Object-based format.
	   *
	   * @param {Object} options
	   */
	
	  function guardProps(options) {
	    var props = options.props;
	    var i, val;
	    if (isArray(props)) {
	      options.props = {};
	      i = props.length;
	      while (i--) {
	        val = props[i];
	        if (typeof val === 'string') {
	          options.props[val] = null;
	        } else if (val.name) {
	          options.props[val.name] = val;
	        }
	      }
	    } else if (isPlainObject(props)) {
	      var keys = Object.keys(props);
	      i = keys.length;
	      while (i--) {
	        val = props[keys[i]];
	        if (typeof val === 'function') {
	          props[keys[i]] = { type: val };
	        }
	      }
	    }
	  }
	
	  /**
	   * Guard an Array-format assets option and converted it
	   * into the key-value Object format.
	   *
	   * @param {Object|Array} assets
	   * @return {Object}
	   */
	
	  function guardArrayAssets(assets) {
	    if (isArray(assets)) {
	      var res = {};
	      var i = assets.length;
	      var asset;
	      while (i--) {
	        asset = assets[i];
	        var id = typeof asset === 'function' ? asset.options && asset.options.name || asset.id : asset.name || asset.id;
	        if (!id) {
	          'development' !== 'production' && warn('Array-syntax assets must provide a "name" or "id" field.');
	        } else {
	          res[id] = asset;
	        }
	      }
	      return res;
	    }
	    return assets;
	  }
	
	  /**
	   * Merge two option objects into a new one.
	   * Core utility used in both instantiation and inheritance.
	   *
	   * @param {Object} parent
	   * @param {Object} child
	   * @param {Vue} [vm] - if vm is present, indicates this is
	   *                     an instantiation merge.
	   */
	
	  function mergeOptions(parent, child, vm) {
	    guardComponents(child);
	    guardProps(child);
	    if (true) {
	      if (child.propsData && !vm) {
	        warn('propsData can only be used as an instantiation option.');
	      }
	    }
	    var options = {};
	    var key;
	    if (child['extends']) {
	      parent = typeof child['extends'] === 'function' ? mergeOptions(parent, child['extends'].options, vm) : mergeOptions(parent, child['extends'], vm);
	    }
	    if (child.mixins) {
	      for (var i = 0, l = child.mixins.length; i < l; i++) {
	        parent = mergeOptions(parent, child.mixins[i], vm);
	      }
	    }
	    for (key in parent) {
	      mergeField(key);
	    }
	    for (key in child) {
	      if (!hasOwn(parent, key)) {
	        mergeField(key);
	      }
	    }
	    function mergeField(key) {
	      var strat = strats[key] || defaultStrat;
	      options[key] = strat(parent[key], child[key], vm, key);
	    }
	    return options;
	  }
	
	  /**
	   * Resolve an asset.
	   * This function is used because child instances need access
	   * to assets defined in its ancestor chain.
	   *
	   * @param {Object} options
	   * @param {String} type
	   * @param {String} id
	   * @param {Boolean} warnMissing
	   * @return {Object|Function}
	   */
	
	  function resolveAsset(options, type, id, warnMissing) {
	    /* istanbul ignore if */
	    if (typeof id !== 'string') {
	      return;
	    }
	    var assets = options[type];
	    var camelizedId;
	    var res = assets[id] ||
	    // camelCase ID
	    assets[camelizedId = camelize(id)] ||
	    // Pascal Case ID
	    assets[camelizedId.charAt(0).toUpperCase() + camelizedId.slice(1)];
	    if ('development' !== 'production' && warnMissing && !res) {
	      warn('Failed to resolve ' + type.slice(0, -1) + ': ' + id, options);
	    }
	    return res;
	  }
	
	  var uid$1 = 0;
	
	  /**
	   * A dep is an observable that can have multiple
	   * directives subscribing to it.
	   *
	   * @constructor
	   */
	  function Dep() {
	    this.id = uid$1++;
	    this.subs = [];
	  }
	
	  // the current target watcher being evaluated.
	  // this is globally unique because there could be only one
	  // watcher being evaluated at any time.
	  Dep.target = null;
	
	  /**
	   * Add a directive subscriber.
	   *
	   * @param {Directive} sub
	   */
	
	  Dep.prototype.addSub = function (sub) {
	    this.subs.push(sub);
	  };
	
	  /**
	   * Remove a directive subscriber.
	   *
	   * @param {Directive} sub
	   */
	
	  Dep.prototype.removeSub = function (sub) {
	    this.subs.$remove(sub);
	  };
	
	  /**
	   * Add self as a dependency to the target watcher.
	   */
	
	  Dep.prototype.depend = function () {
	    Dep.target.addDep(this);
	  };
	
	  /**
	   * Notify all subscribers of a new value.
	   */
	
	  Dep.prototype.notify = function () {
	    // stablize the subscriber list first
	    var subs = toArray(this.subs);
	    for (var i = 0, l = subs.length; i < l; i++) {
	      subs[i].update();
	    }
	  };
	
	  var arrayProto = Array.prototype;
	  var arrayMethods = Object.create(arrayProto)
	
	  /**
	   * Intercept mutating methods and emit events
	   */
	
	  ;['push', 'pop', 'shift', 'unshift', 'splice', 'sort', 'reverse'].forEach(function (method) {
	    // cache original method
	    var original = arrayProto[method];
	    def(arrayMethods, method, function mutator() {
	      // avoid leaking arguments:
	      // http://jsperf.com/closure-with-arguments
	      var i = arguments.length;
	      var args = new Array(i);
	      while (i--) {
	        args[i] = arguments[i];
	      }
	      var result = original.apply(this, args);
	      var ob = this.__ob__;
	      var inserted;
	      switch (method) {
	        case 'push':
	          inserted = args;
	          break;
	        case 'unshift':
	          inserted = args;
	          break;
	        case 'splice':
	          inserted = args.slice(2);
	          break;
	      }
	      if (inserted) ob.observeArray(inserted);
	      // notify change
	      ob.dep.notify();
	      return result;
	    });
	  });
	
	  /**
	   * Swap the element at the given index with a new value
	   * and emits corresponding event.
	   *
	   * @param {Number} index
	   * @param {*} val
	   * @return {*} - replaced element
	   */
	
	  def(arrayProto, '$set', function $set(index, val) {
	    if (index >= this.length) {
	      this.length = Number(index) + 1;
	    }
	    return this.splice(index, 1, val)[0];
	  });
	
	  /**
	   * Convenience method to remove the element at given index or target element reference.
	   *
	   * @param {*} item
	   */
	
	  def(arrayProto, '$remove', function $remove(item) {
	    /* istanbul ignore if */
	    if (!this.length) return;
	    var index = indexOf(this, item);
	    if (index > -1) {
	      return this.splice(index, 1);
	    }
	  });
	
	  var arrayKeys = Object.getOwnPropertyNames(arrayMethods);
	
	  /**
	   * By default, when a reactive property is set, the new value is
	   * also converted to become reactive. However in certain cases, e.g.
	   * v-for scope alias and props, we don't want to force conversion
	   * because the value may be a nested value under a frozen data structure.
	   *
	   * So whenever we want to set a reactive property without forcing
	   * conversion on the new value, we wrap that call inside this function.
	   */
	
	  var shouldConvert = true;
	
	  function withoutConversion(fn) {
	    shouldConvert = false;
	    fn();
	    shouldConvert = true;
	  }
	
	  /**
	   * Observer class that are attached to each observed
	   * object. Once attached, the observer converts target
	   * object's property keys into getter/setters that
	   * collect dependencies and dispatches updates.
	   *
	   * @param {Array|Object} value
	   * @constructor
	   */
	
	  function Observer(value) {
	    this.value = value;
	    this.dep = new Dep();
	    def(value, '__ob__', this);
	    if (isArray(value)) {
	      var augment = hasProto ? protoAugment : copyAugment;
	      augment(value, arrayMethods, arrayKeys);
	      this.observeArray(value);
	    } else {
	      this.walk(value);
	    }
	  }
	
	  // Instance methods
	
	  /**
	   * Walk through each property and convert them into
	   * getter/setters. This method should only be called when
	   * value type is Object.
	   *
	   * @param {Object} obj
	   */
	
	  Observer.prototype.walk = function (obj) {
	    var keys = Object.keys(obj);
	    for (var i = 0, l = keys.length; i < l; i++) {
	      this.convert(keys[i], obj[keys[i]]);
	    }
	  };
	
	  /**
	   * Observe a list of Array items.
	   *
	   * @param {Array} items
	   */
	
	  Observer.prototype.observeArray = function (items) {
	    for (var i = 0, l = items.length; i < l; i++) {
	      observe(items[i]);
	    }
	  };
	
	  /**
	   * Convert a property into getter/setter so we can emit
	   * the events when the property is accessed/changed.
	   *
	   * @param {String} key
	   * @param {*} val
	   */
	
	  Observer.prototype.convert = function (key, val) {
	    defineReactive(this.value, key, val);
	  };
	
	  /**
	   * Add an owner vm, so that when $set/$delete mutations
	   * happen we can notify owner vms to proxy the keys and
	   * digest the watchers. This is only called when the object
	   * is observed as an instance's root $data.
	   *
	   * @param {Vue} vm
	   */
	
	  Observer.prototype.addVm = function (vm) {
	    (this.vms || (this.vms = [])).push(vm);
	  };
	
	  /**
	   * Remove an owner vm. This is called when the object is
	   * swapped out as an instance's $data object.
	   *
	   * @param {Vue} vm
	   */
	
	  Observer.prototype.removeVm = function (vm) {
	    this.vms.$remove(vm);
	  };
	
	  // helpers
	
	  /**
	   * Augment an target Object or Array by intercepting
	   * the prototype chain using __proto__
	   *
	   * @param {Object|Array} target
	   * @param {Object} src
	   */
	
	  function protoAugment(target, src) {
	    /* eslint-disable no-proto */
	    target.__proto__ = src;
	    /* eslint-enable no-proto */
	  }
	
	  /**
	   * Augment an target Object or Array by defining
	   * hidden properties.
	   *
	   * @param {Object|Array} target
	   * @param {Object} proto
	   */
	
	  function copyAugment(target, src, keys) {
	    for (var i = 0, l = keys.length; i < l; i++) {
	      var key = keys[i];
	      def(target, key, src[key]);
	    }
	  }
	
	  /**
	   * Attempt to create an observer instance for a value,
	   * returns the new observer if successfully observed,
	   * or the existing observer if the value already has one.
	   *
	   * @param {*} value
	   * @param {Vue} [vm]
	   * @return {Observer|undefined}
	   * @static
	   */
	
	  function observe(value, vm) {
	    if (!value || typeof value !== 'object') {
	      return;
	    }
	    var ob;
	    if (hasOwn(value, '__ob__') && value.__ob__ instanceof Observer) {
	      ob = value.__ob__;
	    } else if (shouldConvert && (isArray(value) || isPlainObject(value)) && Object.isExtensible(value) && !value._isVue) {
	      ob = new Observer(value);
	    }
	    if (ob && vm) {
	      ob.addVm(vm);
	    }
	    return ob;
	  }
	
	  /**
	   * Define a reactive property on an Object.
	   *
	   * @param {Object} obj
	   * @param {String} key
	   * @param {*} val
	   */
	
	  function defineReactive(obj, key, val) {
	    var dep = new Dep();
	
	    var property = Object.getOwnPropertyDescriptor(obj, key);
	    if (property && property.configurable === false) {
	      return;
	    }
	
	    // cater for pre-defined getter/setters
	    var getter = property && property.get;
	    var setter = property && property.set;
	
	    var childOb = observe(val);
	    Object.defineProperty(obj, key, {
	      enumerable: true,
	      configurable: true,
	      get: function reactiveGetter() {
	        var value = getter ? getter.call(obj) : val;
	        if (Dep.target) {
	          dep.depend();
	          if (childOb) {
	            childOb.dep.depend();
	          }
	          if (isArray(value)) {
	            for (var e, i = 0, l = value.length; i < l; i++) {
	              e = value[i];
	              e && e.__ob__ && e.__ob__.dep.depend();
	            }
	          }
	        }
	        return value;
	      },
	      set: function reactiveSetter(newVal) {
	        var value = getter ? getter.call(obj) : val;
	        if (newVal === value) {
	          return;
	        }
	        if (setter) {
	          setter.call(obj, newVal);
	        } else {
	          val = newVal;
	        }
	        childOb = observe(newVal);
	        dep.notify();
	      }
	    });
	  }
	
	
	
	  var util = Object.freeze({
	  	defineReactive: defineReactive,
	  	set: set,
	  	del: del,
	  	hasOwn: hasOwn,
	  	isLiteral: isLiteral,
	  	isReserved: isReserved,
	  	_toString: _toString,
	  	toNumber: toNumber,
	  	toBoolean: toBoolean,
	  	stripQuotes: stripQuotes,
	  	camelize: camelize,
	  	hyphenate: hyphenate,
	  	classify: classify,
	  	bind: bind,
	  	toArray: toArray,
	  	extend: extend,
	  	isObject: isObject,
	  	isPlainObject: isPlainObject,
	  	def: def,
	  	debounce: _debounce,
	  	indexOf: indexOf,
	  	cancellable: cancellable,
	  	looseEqual: looseEqual,
	  	isArray: isArray,
	  	hasProto: hasProto,
	  	inBrowser: inBrowser,
	  	devtools: devtools,
	  	isIE9: isIE9,
	  	isAndroid: isAndroid,
	  	isIos: isIos,
	  	isWechat: isWechat,
	  	get transitionProp () { return transitionProp; },
	  	get transitionEndEvent () { return transitionEndEvent; },
	  	get animationProp () { return animationProp; },
	  	get animationEndEvent () { return animationEndEvent; },
	  	nextTick: nextTick,
	  	get _Set () { return _Set; },
	  	query: query,
	  	inDoc: inDoc,
	  	getAttr: getAttr,
	  	getBindAttr: getBindAttr,
	  	hasBindAttr: hasBindAttr,
	  	before: before,
	  	after: after,
	  	remove: remove,
	  	prepend: prepend,
	  	replace: replace,
	  	on: on,
	  	off: off,
	  	setClass: setClass,
	  	addClass: addClass,
	  	removeClass: removeClass,
	  	extractContent: extractContent,
	  	trimNode: trimNode,
	  	isTemplate: isTemplate,
	  	createAnchor: createAnchor,
	  	findRef: findRef,
	  	mapNodeRange: mapNodeRange,
	  	removeNodeRange: removeNodeRange,
	  	isFragment: isFragment,
	  	getOuterHTML: getOuterHTML,
	  	mergeOptions: mergeOptions,
	  	resolveAsset: resolveAsset,
	  	checkComponentAttr: checkComponentAttr,
	  	commonTagRE: commonTagRE,
	  	reservedTagRE: reservedTagRE,
	  	get warn () { return warn; }
	  });
	
	  var uid = 0;
	
	  function initMixin (Vue) {
	    /**
	     * The main init sequence. This is called for every
	     * instance, including ones that are created from extended
	     * constructors.
	     *
	     * @param {Object} options - this options object should be
	     *                           the result of merging class
	     *                           options and the options passed
	     *                           in to the constructor.
	     */
	
	    Vue.prototype._init = function (options) {
	      options = options || {};
	
	      this.$el = null;
	      this.$parent = options.parent;
	      this.$root = this.$parent ? this.$parent.$root : this;
	      this.$children = [];
	      this.$refs = {}; // child vm references
	      this.$els = {}; // element references
	      this._watchers = []; // all watchers as an array
	      this._directives = []; // all directives
	
	      // a uid
	      this._uid = uid++;
	
	      // a flag to avoid this being observed
	      this._isVue = true;
	
	      // events bookkeeping
	      this._events = {}; // registered callbacks
	      this._eventsCount = {}; // for $broadcast optimization
	
	      // fragment instance properties
	      this._isFragment = false;
	      this._fragment = // @type {DocumentFragment}
	      this._fragmentStart = // @type {Text|Comment}
	      this._fragmentEnd = null; // @type {Text|Comment}
	
	      // lifecycle state
	      this._isCompiled = this._isDestroyed = this._isReady = this._isAttached = this._isBeingDestroyed = this._vForRemoving = false;
	      this._unlinkFn = null;
	
	      // context:
	      // if this is a transcluded component, context
	      // will be the common parent vm of this instance
	      // and its host.
	      this._context = options._context || this.$parent;
	
	      // scope:
	      // if this is inside an inline v-for, the scope
	      // will be the intermediate scope created for this
	      // repeat fragment. this is used for linking props
	      // and container directives.
	      this._scope = options._scope;
	
	      // fragment:
	      // if this instance is compiled inside a Fragment, it
	      // needs to reigster itself as a child of that fragment
	      // for attach/detach to work properly.
	      this._frag = options._frag;
	      if (this._frag) {
	        this._frag.children.push(this);
	      }
	
	      // push self into parent / transclusion host
	      if (this.$parent) {
	        this.$parent.$children.push(this);
	      }
	
	      // merge options.
	      options = this.$options = mergeOptions(this.constructor.options, options, this);
	
	      // set ref
	      this._updateRef();
	
	      // initialize data as empty object.
	      // it will be filled up in _initData().
	      this._data = {};
	
	      // call init hook
	      this._callHook('init');
	
	      // initialize data observation and scope inheritance.
	      this._initState();
	
	      // setup event system and option events.
	      this._initEvents();
	
	      // call created hook
	      this._callHook('created');
	
	      // if `el` option is passed, start compilation.
	      if (options.el) {
	        this.$mount(options.el);
	      }
	    };
	  }
	
	  var pathCache = new Cache(1000);
	
	  // actions
	  var APPEND = 0;
	  var PUSH = 1;
	  var INC_SUB_PATH_DEPTH = 2;
	  var PUSH_SUB_PATH = 3;
	
	  // states
	  var BEFORE_PATH = 0;
	  var IN_PATH = 1;
	  var BEFORE_IDENT = 2;
	  var IN_IDENT = 3;
	  var IN_SUB_PATH = 4;
	  var IN_SINGLE_QUOTE = 5;
	  var IN_DOUBLE_QUOTE = 6;
	  var AFTER_PATH = 7;
	  var ERROR = 8;
	
	  var pathStateMachine = [];
	
	  pathStateMachine[BEFORE_PATH] = {
	    'ws': [BEFORE_PATH],
	    'ident': [IN_IDENT, APPEND],
	    '[': [IN_SUB_PATH],
	    'eof': [AFTER_PATH]
	  };
	
	  pathStateMachine[IN_PATH] = {
	    'ws': [IN_PATH],
	    '.': [BEFORE_IDENT],
	    '[': [IN_SUB_PATH],
	    'eof': [AFTER_PATH]
	  };
	
	  pathStateMachine[BEFORE_IDENT] = {
	    'ws': [BEFORE_IDENT],
	    'ident': [IN_IDENT, APPEND]
	  };
	
	  pathStateMachine[IN_IDENT] = {
	    'ident': [IN_IDENT, APPEND],
	    '0': [IN_IDENT, APPEND],
	    'number': [IN_IDENT, APPEND],
	    'ws': [IN_PATH, PUSH],
	    '.': [BEFORE_IDENT, PUSH],
	    '[': [IN_SUB_PATH, PUSH],
	    'eof': [AFTER_PATH, PUSH]
	  };
	
	  pathStateMachine[IN_SUB_PATH] = {
	    "'": [IN_SINGLE_QUOTE, APPEND],
	    '"': [IN_DOUBLE_QUOTE, APPEND],
	    '[': [IN_SUB_PATH, INC_SUB_PATH_DEPTH],
	    ']': [IN_PATH, PUSH_SUB_PATH],
	    'eof': ERROR,
	    'else': [IN_SUB_PATH, APPEND]
	  };
	
	  pathStateMachine[IN_SINGLE_QUOTE] = {
	    "'": [IN_SUB_PATH, APPEND],
	    'eof': ERROR,
	    'else': [IN_SINGLE_QUOTE, APPEND]
	  };
	
	  pathStateMachine[IN_DOUBLE_QUOTE] = {
	    '"': [IN_SUB_PATH, APPEND],
	    'eof': ERROR,
	    'else': [IN_DOUBLE_QUOTE, APPEND]
	  };
	
	  /**
	   * Determine the type of a character in a keypath.
	   *
	   * @param {Char} ch
	   * @return {String} type
	   */
	
	  function getPathCharType(ch) {
	    if (ch === undefined) {
	      return 'eof';
	    }
	
	    var code = ch.charCodeAt(0);
	
	    switch (code) {
	      case 0x5B: // [
	      case 0x5D: // ]
	      case 0x2E: // .
	      case 0x22: // "
	      case 0x27: // '
	      case 0x30:
	        // 0
	        return ch;
	
	      case 0x5F: // _
	      case 0x24:
	        // $
	        return 'ident';
	
	      case 0x20: // Space
	      case 0x09: // Tab
	      case 0x0A: // Newline
	      case 0x0D: // Return
	      case 0xA0: // No-break space
	      case 0xFEFF: // Byte Order Mark
	      case 0x2028: // Line Separator
	      case 0x2029:
	        // Paragraph Separator
	        return 'ws';
	    }
	
	    // a-z, A-Z
	    if (code >= 0x61 && code <= 0x7A || code >= 0x41 && code <= 0x5A) {
	      return 'ident';
	    }
	
	    // 1-9
	    if (code >= 0x31 && code <= 0x39) {
	      return 'number';
	    }
	
	    return 'else';
	  }
	
	  /**
	   * Format a subPath, return its plain form if it is
	   * a literal string or number. Otherwise prepend the
	   * dynamic indicator (*).
	   *
	   * @param {String} path
	   * @return {String}
	   */
	
	  function formatSubPath(path) {
	    var trimmed = path.trim();
	    // invalid leading 0
	    if (path.charAt(0) === '0' && isNaN(path)) {
	      return false;
	    }
	    return isLiteral(trimmed) ? stripQuotes(trimmed) : '*' + trimmed;
	  }
	
	  /**
	   * Parse a string path into an array of segments
	   *
	   * @param {String} path
	   * @return {Array|undefined}
	   */
	
	  function parse(path) {
	    var keys = [];
	    var index = -1;
	    var mode = BEFORE_PATH;
	    var subPathDepth = 0;
	    var c, newChar, key, type, transition, action, typeMap;
	
	    var actions = [];
	
	    actions[PUSH] = function () {
	      if (key !== undefined) {
	        keys.push(key);
	        key = undefined;
	      }
	    };
	
	    actions[APPEND] = function () {
	      if (key === undefined) {
	        key = newChar;
	      } else {
	        key += newChar;
	      }
	    };
	
	    actions[INC_SUB_PATH_DEPTH] = function () {
	      actions[APPEND]();
	      subPathDepth++;
	    };
	
	    actions[PUSH_SUB_PATH] = function () {
	      if (subPathDepth > 0) {
	        subPathDepth--;
	        mode = IN_SUB_PATH;
	        actions[APPEND]();
	      } else {
	        subPathDepth = 0;
	        key = formatSubPath(key);
	        if (key === false) {
	          return false;
	        } else {
	          actions[PUSH]();
	        }
	      }
	    };
	
	    function maybeUnescapeQuote() {
	      var nextChar = path[index + 1];
	      if (mode === IN_SINGLE_QUOTE && nextChar === "'" || mode === IN_DOUBLE_QUOTE && nextChar === '"') {
	        index++;
	        newChar = '\\' + nextChar;
	        actions[APPEND]();
	        return true;
	      }
	    }
	
	    while (mode != null) {
	      index++;
	      c = path[index];
	
	      if (c === '\\' && maybeUnescapeQuote()) {
	        continue;
	      }
	
	      type = getPathCharType(c);
	      typeMap = pathStateMachine[mode];
	      transition = typeMap[type] || typeMap['else'] || ERROR;
	
	      if (transition === ERROR) {
	        return; // parse error
	      }
	
	      mode = transition[0];
	      action = actions[transition[1]];
	      if (action) {
	        newChar = transition[2];
	        newChar = newChar === undefined ? c : newChar;
	        if (action() === false) {
	          return;
	        }
	      }
	
	      if (mode === AFTER_PATH) {
	        keys.raw = path;
	        return keys;
	      }
	    }
	  }
	
	  /**
	   * External parse that check for a cache hit first
	   *
	   * @param {String} path
	   * @return {Array|undefined}
	   */
	
	  function parsePath(path) {
	    var hit = pathCache.get(path);
	    if (!hit) {
	      hit = parse(path);
	      if (hit) {
	        pathCache.put(path, hit);
	      }
	    }
	    return hit;
	  }
	
	  /**
	   * Get from an object from a path string
	   *
	   * @param {Object} obj
	   * @param {String} path
	   */
	
	  function getPath(obj, path) {
	    return parseExpression(path).get(obj);
	  }
	
	  /**
	   * Warn against setting non-existent root path on a vm.
	   */
	
	  var warnNonExistent;
	  if (true) {
	    warnNonExistent = function (path, vm) {
	      warn('You are setting a non-existent path "' + path.raw + '" ' + 'on a vm instance. Consider pre-initializing the property ' + 'with the "data" option for more reliable reactivity ' + 'and better performance.', vm);
	    };
	  }
	
	  /**
	   * Set on an object from a path
	   *
	   * @param {Object} obj
	   * @param {String | Array} path
	   * @param {*} val
	   */
	
	  function setPath(obj, path, val) {
	    var original = obj;
	    if (typeof path === 'string') {
	      path = parse(path);
	    }
	    if (!path || !isObject(obj)) {
	      return false;
	    }
	    var last, key;
	    for (var i = 0, l = path.length; i < l; i++) {
	      last = obj;
	      key = path[i];
	      if (key.charAt(0) === '*') {
	        key = parseExpression(key.slice(1)).get.call(original, original);
	      }
	      if (i < l - 1) {
	        obj = obj[key];
	        if (!isObject(obj)) {
	          obj = {};
	          if ('development' !== 'production' && last._isVue) {
	            warnNonExistent(path, last);
	          }
	          set(last, key, obj);
	        }
	      } else {
	        if (isArray(obj)) {
	          obj.$set(key, val);
	        } else if (key in obj) {
	          obj[key] = val;
	        } else {
	          if ('development' !== 'production' && obj._isVue) {
	            warnNonExistent(path, obj);
	          }
	          set(obj, key, val);
	        }
	      }
	    }
	    return true;
	  }
	
	var path = Object.freeze({
	    parsePath: parsePath,
	    getPath: getPath,
	    setPath: setPath
	  });
	
	  var expressionCache = new Cache(1000);
	
	  var allowedKeywords = 'Math,Date,this,true,false,null,undefined,Infinity,NaN,' + 'isNaN,isFinite,decodeURI,decodeURIComponent,encodeURI,' + 'encodeURIComponent,parseInt,parseFloat';
	  var allowedKeywordsRE = new RegExp('^(' + allowedKeywords.replace(/,/g, '\\b|') + '\\b)');
	
	  // keywords that don't make sense inside expressions
	  var improperKeywords = 'break,case,class,catch,const,continue,debugger,default,' + 'delete,do,else,export,extends,finally,for,function,if,' + 'import,in,instanceof,let,return,super,switch,throw,try,' + 'var,while,with,yield,enum,await,implements,package,' + 'protected,static,interface,private,public';
	  var improperKeywordsRE = new RegExp('^(' + improperKeywords.replace(/,/g, '\\b|') + '\\b)');
	
	  var wsRE = /\s/g;
	  var newlineRE = /\n/g;
	  var saveRE = /[\{,]\s*[\w\$_]+\s*:|('(?:[^'\\]|\\.)*'|"(?:[^"\\]|\\.)*"|`(?:[^`\\]|\\.)*\$\{|\}(?:[^`\\]|\\.)*`|`(?:[^`\\]|\\.)*`)|new |typeof |void /g;
	  var restoreRE = /"(\d+)"/g;
	  var pathTestRE = /^[A-Za-z_$][\w$]*(?:\.[A-Za-z_$][\w$]*|\['.*?'\]|\[".*?"\]|\[\d+\]|\[[A-Za-z_$][\w$]*\])*$/;
	  var identRE = /[^\w$\.](?:[A-Za-z_$][\w$]*)/g;
	  var booleanLiteralRE = /^(?:true|false)$/;
	
	  /**
	   * Save / Rewrite / Restore
	   *
	   * When rewriting paths found in an expression, it is
	   * possible for the same letter sequences to be found in
	   * strings and Object literal property keys. Therefore we
	   * remove and store these parts in a temporary array, and
	   * restore them after the path rewrite.
	   */
	
	  var saved = [];
	
	  /**
	   * Save replacer
	   *
	   * The save regex can match two possible cases:
	   * 1. An opening object literal
	   * 2. A string
	   * If matched as a plain string, we need to escape its
	   * newlines, since the string needs to be preserved when
	   * generating the function body.
	   *
	   * @param {String} str
	   * @param {String} isString - str if matched as a string
	   * @return {String} - placeholder with index
	   */
	
	  function save(str, isString) {
	    var i = saved.length;
	    saved[i] = isString ? str.replace(newlineRE, '\\n') : str;
	    return '"' + i + '"';
	  }
	
	  /**
	   * Path rewrite replacer
	   *
	   * @param {String} raw
	   * @return {String}
	   */
	
	  function rewrite(raw) {
	    var c = raw.charAt(0);
	    var path = raw.slice(1);
	    if (allowedKeywordsRE.test(path)) {
	      return raw;
	    } else {
	      path = path.indexOf('"') > -1 ? path.replace(restoreRE, restore) : path;
	      return c + 'scope.' + path;
	    }
	  }
	
	  /**
	   * Restore replacer
	   *
	   * @param {String} str
	   * @param {String} i - matched save index
	   * @return {String}
	   */
	
	  function restore(str, i) {
	    return saved[i];
	  }
	
	  /**
	   * Rewrite an expression, prefixing all path accessors with
	   * `scope.` and generate getter/setter functions.
	   *
	   * @param {String} exp
	   * @return {Function}
	   */
	
	  function compileGetter(exp) {
	    if (improperKeywordsRE.test(exp)) {
	      'development' !== 'production' && warn('Avoid using reserved keywords in expression: ' + exp);
	    }
	    // reset state
	    saved.length = 0;
	    // save strings and object literal keys
	    var body = exp.replace(saveRE, save).replace(wsRE, '');
	    // rewrite all paths
	    // pad 1 space here becaue the regex matches 1 extra char
	    body = (' ' + body).replace(identRE, rewrite).replace(restoreRE, restore);
	    return makeGetterFn(body);
	  }
	
	  /**
	   * Build a getter function. Requires eval.
	   *
	   * We isolate the try/catch so it doesn't affect the
	   * optimization of the parse function when it is not called.
	   *
	   * @param {String} body
	   * @return {Function|undefined}
	   */
	
	  function makeGetterFn(body) {
	    try {
	      /* eslint-disable no-new-func */
	      return new Function('scope', 'return ' + body + ';');
	      /* eslint-enable no-new-func */
	    } catch (e) {
	      'development' !== 'production' && warn('Invalid expression. ' + 'Generated function body: ' + body);
	    }
	  }
	
	  /**
	   * Compile a setter function for the expression.
	   *
	   * @param {String} exp
	   * @return {Function|undefined}
	   */
	
	  function compileSetter(exp) {
	    var path = parsePath(exp);
	    if (path) {
	      return function (scope, val) {
	        setPath(scope, path, val);
	      };
	    } else {
	      'development' !== 'production' && warn('Invalid setter expression: ' + exp);
	    }
	  }
	
	  /**
	   * Parse an expression into re-written getter/setters.
	   *
	   * @param {String} exp
	   * @param {Boolean} needSet
	   * @return {Function}
	   */
	
	  function parseExpression(exp, needSet) {
	    exp = exp.trim();
	    // try cache
	    var hit = expressionCache.get(exp);
	    if (hit) {
	      if (needSet && !hit.set) {
	        hit.set = compileSetter(hit.exp);
	      }
	      return hit;
	    }
	    var res = { exp: exp };
	    res.get = isSimplePath(exp) && exp.indexOf('[') < 0
	    // optimized super simple getter
	    ? makeGetterFn('scope.' + exp)
	    // dynamic getter
	    : compileGetter(exp);
	    if (needSet) {
	      res.set = compileSetter(exp);
	    }
	    expressionCache.put(exp, res);
	    return res;
	  }
	
	  /**
	   * Check if an expression is a simple path.
	   *
	   * @param {String} exp
	   * @return {Boolean}
	   */
	
	  function isSimplePath(exp) {
	    return pathTestRE.test(exp) &&
	    // don't treat true/false as paths
	    !booleanLiteralRE.test(exp) &&
	    // Math constants e.g. Math.PI, Math.E etc.
	    exp.slice(0, 5) !== 'Math.';
	  }
	
	var expression = Object.freeze({
	    parseExpression: parseExpression,
	    isSimplePath: isSimplePath
	  });
	
	  // we have two separate queues: one for directive updates
	  // and one for user watcher registered via $watch().
	  // we want to guarantee directive updates to be called
	  // before user watchers so that when user watchers are
	  // triggered, the DOM would have already been in updated
	  // state.
	
	  var queue = [];
	  var userQueue = [];
	  var has = {};
	  var circular = {};
	  var waiting = false;
	
	  /**
	   * Reset the batcher's state.
	   */
	
	  function resetBatcherState() {
	    queue.length = 0;
	    userQueue.length = 0;
	    has = {};
	    circular = {};
	    waiting = false;
	  }
	
	  /**
	   * Flush both queues and run the watchers.
	   */
	
	  function flushBatcherQueue() {
	    var _again = true;
	
	    _function: while (_again) {
	      _again = false;
	
	      runBatcherQueue(queue);
	      runBatcherQueue(userQueue);
	      // user watchers triggered more watchers,
	      // keep flushing until it depletes
	      if (queue.length) {
	        _again = true;
	        continue _function;
	      }
	      // dev tool hook
	      /* istanbul ignore if */
	      if (devtools && config.devtools) {
	        devtools.emit('flush');
	      }
	      resetBatcherState();
	    }
	  }
	
	  /**
	   * Run the watchers in a single queue.
	   *
	   * @param {Array} queue
	   */
	
	  function runBatcherQueue(queue) {
	    // do not cache length because more watchers might be pushed
	    // as we run existing watchers
	    for (var i = 0; i < queue.length; i++) {
	      var watcher = queue[i];
	      var id = watcher.id;
	      has[id] = null;
	      watcher.run();
	      // in dev build, check and stop circular updates.
	      if ('development' !== 'production' && has[id] != null) {
	        circular[id] = (circular[id] || 0) + 1;
	        if (circular[id] > config._maxUpdateCount) {
	          warn('You may have an infinite update loop for watcher ' + 'with expression "' + watcher.expression + '"', watcher.vm);
	          break;
	        }
	      }
	    }
	    queue.length = 0;
	  }
	
	  /**
	   * Push a watcher into the watcher queue.
	   * Jobs with duplicate IDs will be skipped unless it's
	   * pushed when the queue is being flushed.
	   *
	   * @param {Watcher} watcher
	   *   properties:
	   *   - {Number} id
	   *   - {Function} run
	   */
	
	  function pushWatcher(watcher) {
	    var id = watcher.id;
	    if (has[id] == null) {
	      // push watcher into appropriate queue
	      var q = watcher.user ? userQueue : queue;
	      has[id] = q.length;
	      q.push(watcher);
	      // queue the flush
	      if (!waiting) {
	        waiting = true;
	        nextTick(flushBatcherQueue);
	      }
	    }
	  }
	
	  var uid$2 = 0;
	
	  /**
	   * A watcher parses an expression, collects dependencies,
	   * and fires callback when the expression value changes.
	   * This is used for both the $watch() api and directives.
	   *
	   * @param {Vue} vm
	   * @param {String|Function} expOrFn
	   * @param {Function} cb
	   * @param {Object} options
	   *                 - {Array} filters
	   *                 - {Boolean} twoWay
	   *                 - {Boolean} deep
	   *                 - {Boolean} user
	   *                 - {Boolean} sync
	   *                 - {Boolean} lazy
	   *                 - {Function} [preProcess]
	   *                 - {Function} [postProcess]
	   * @constructor
	   */
	  function Watcher(vm, expOrFn, cb, options) {
	    // mix in options
	    if (options) {
	      extend(this, options);
	    }
	    var isFn = typeof expOrFn === 'function';
	    this.vm = vm;
	    vm._watchers.push(this);
	    this.expression = expOrFn;
	    this.cb = cb;
	    this.id = ++uid$2; // uid for batching
	    this.active = true;
	    this.dirty = this.lazy; // for lazy watchers
	    this.deps = [];
	    this.newDeps = [];
	    this.depIds = new _Set();
	    this.newDepIds = new _Set();
	    this.prevError = null; // for async error stacks
	    // parse expression for getter/setter
	    if (isFn) {
	      this.getter = expOrFn;
	      this.setter = undefined;
	    } else {
	      var res = parseExpression(expOrFn, this.twoWay);
	      this.getter = res.get;
	      this.setter = res.set;
	    }
	    this.value = this.lazy ? undefined : this.get();
	    // state for avoiding false triggers for deep and Array
	    // watchers during vm._digest()
	    this.queued = this.shallow = false;
	  }
	
	  /**
	   * Evaluate the getter, and re-collect dependencies.
	   */
	
	  Watcher.prototype.get = function () {
	    this.beforeGet();
	    var scope = this.scope || this.vm;
	    var value;
	    try {
	      value = this.getter.call(scope, scope);
	    } catch (e) {
	      if ('development' !== 'production' && config.warnExpressionErrors) {
	        warn('Error when evaluating expression ' + '"' + this.expression + '": ' + e.toString(), this.vm);
	      }
	    }
	    // "touch" every property so they are all tracked as
	    // dependencies for deep watching
	    if (this.deep) {
	      traverse(value);
	    }
	    if (this.preProcess) {
	      value = this.preProcess(value);
	    }
	    if (this.filters) {
	      value = scope._applyFilters(value, null, this.filters, false);
	    }
	    if (this.postProcess) {
	      value = this.postProcess(value);
	    }
	    this.afterGet();
	    return value;
	  };
	
	  /**
	   * Set the corresponding value with the setter.
	   *
	   * @param {*} value
	   */
	
	  Watcher.prototype.set = function (value) {
	    var scope = this.scope || this.vm;
	    if (this.filters) {
	      value = scope._applyFilters(value, this.value, this.filters, true);
	    }
	    try {
	      this.setter.call(scope, scope, value);
	    } catch (e) {
	      if ('development' !== 'production' && config.warnExpressionErrors) {
	        warn('Error when evaluating setter ' + '"' + this.expression + '": ' + e.toString(), this.vm);
	      }
	    }
	    // two-way sync for v-for alias
	    var forContext = scope.$forContext;
	    if (forContext && forContext.alias === this.expression) {
	      if (forContext.filters) {
	        'development' !== 'production' && warn('It seems you are using two-way binding on ' + 'a v-for alias (' + this.expression + '), and the ' + 'v-for has filters. This will not work properly. ' + 'Either remove the filters or use an array of ' + 'objects and bind to object properties instead.', this.vm);
	        return;
	      }
	      forContext._withLock(function () {
	        if (scope.$key) {
	          // original is an object
	          forContext.rawValue[scope.$key] = value;
	        } else {
	          forContext.rawValue.$set(scope.$index, value);
	        }
	      });
	    }
	  };
	
	  /**
	   * Prepare for dependency collection.
	   */
	
	  Watcher.prototype.beforeGet = function () {
	    Dep.target = this;
	  };
	
	  /**
	   * Add a dependency to this directive.
	   *
	   * @param {Dep} dep
	   */
	
	  Watcher.prototype.addDep = function (dep) {
	    var id = dep.id;
	    if (!this.newDepIds.has(id)) {
	      this.newDepIds.add(id);
	      this.newDeps.push(dep);
	      if (!this.depIds.has(id)) {
	        dep.addSub(this);
	      }
	    }
	  };
	
	  /**
	   * Clean up for dependency collection.
	   */
	
	  Watcher.prototype.afterGet = function () {
	    Dep.target = null;
	    var i = this.deps.length;
	    while (i--) {
	      var dep = this.deps[i];
	      if (!this.newDepIds.has(dep.id)) {
	        dep.removeSub(this);
	      }
	    }
	    var tmp = this.depIds;
	    this.depIds = this.newDepIds;
	    this.newDepIds = tmp;
	    this.newDepIds.clear();
	    tmp = this.deps;
	    this.deps = this.newDeps;
	    this.newDeps = tmp;
	    this.newDeps.length = 0;
	  };
	
	  /**
	   * Subscriber interface.
	   * Will be called when a dependency changes.
	   *
	   * @param {Boolean} shallow
	   */
	
	  Watcher.prototype.update = function (shallow) {
	    if (this.lazy) {
	      this.dirty = true;
	    } else if (this.sync || !config.async) {
	      this.run();
	    } else {
	      // if queued, only overwrite shallow with non-shallow,
	      // but not the other way around.
	      this.shallow = this.queued ? shallow ? this.shallow : false : !!shallow;
	      this.queued = true;
	      // record before-push error stack in debug mode
	      /* istanbul ignore if */
	      if ('development' !== 'production' && config.debug) {
	        this.prevError = new Error('[vue] async stack trace');
	      }
	      pushWatcher(this);
	    }
	  };
	
	  /**
	   * Batcher job interface.
	   * Will be called by the batcher.
	   */
	
	  Watcher.prototype.run = function () {
	    if (this.active) {
	      var value = this.get();
	      if (value !== this.value ||
	      // Deep watchers and watchers on Object/Arrays should fire even
	      // when the value is the same, because the value may
	      // have mutated; but only do so if this is a
	      // non-shallow update (caused by a vm digest).
	      (isObject(value) || this.deep) && !this.shallow) {
	        // set new value
	        var oldValue = this.value;
	        this.value = value;
	        // in debug + async mode, when a watcher callbacks
	        // throws, we also throw the saved before-push error
	        // so the full cross-tick stack trace is available.
	        var prevError = this.prevError;
	        /* istanbul ignore if */
	        if ('development' !== 'production' && config.debug && prevError) {
	          this.prevError = null;
	          try {
	            this.cb.call(this.vm, value, oldValue);
	          } catch (e) {
	            nextTick(function () {
	              throw prevError;
	            }, 0);
	            throw e;
	          }
	        } else {
	          this.cb.call(this.vm, value, oldValue);
	        }
	      }
	      this.queued = this.shallow = false;
	    }
	  };
	
	  /**
	   * Evaluate the value of the watcher.
	   * This only gets called for lazy watchers.
	   */
	
	  Watcher.prototype.evaluate = function () {
	    // avoid overwriting another watcher that is being
	    // collected.
	    var current = Dep.target;
	    this.value = this.get();
	    this.dirty = false;
	    Dep.target = current;
	  };
	
	  /**
	   * Depend on all deps collected by this watcher.
	   */
	
	  Watcher.prototype.depend = function () {
	    var i = this.deps.length;
	    while (i--) {
	      this.deps[i].depend();
	    }
	  };
	
	  /**
	   * Remove self from all dependencies' subcriber list.
	   */
	
	  Watcher.prototype.teardown = function () {
	    if (this.active) {
	      // remove self from vm's watcher list
	      // this is a somewhat expensive operation so we skip it
	      // if the vm is being destroyed or is performing a v-for
	      // re-render (the watcher list is then filtered by v-for).
	      if (!this.vm._isBeingDestroyed && !this.vm._vForRemoving) {
	        this.vm._watchers.$remove(this);
	      }
	      var i = this.deps.length;
	      while (i--) {
	        this.deps[i].removeSub(this);
	      }
	      this.active = false;
	      this.vm = this.cb = this.value = null;
	    }
	  };
	
	  /**
	   * Recrusively traverse an object to evoke all converted
	   * getters, so that every nested property inside the object
	   * is collected as a "deep" dependency.
	   *
	   * @param {*} val
	   */
	
	  var seenObjects = new _Set();
	  function traverse(val, seen) {
	    var i = undefined,
	        keys = undefined;
	    if (!seen) {
	      seen = seenObjects;
	      seen.clear();
	    }
	    var isA = isArray(val);
	    var isO = isObject(val);
	    if (isA || isO) {
	      if (val.__ob__) {
	        var depId = val.__ob__.dep.id;
	        if (seen.has(depId)) {
	          return;
	        } else {
	          seen.add(depId);
	        }
	      }
	      if (isA) {
	        i = val.length;
	        while (i--) traverse(val[i], seen);
	      } else if (isO) {
	        keys = Object.keys(val);
	        i = keys.length;
	        while (i--) traverse(val[keys[i]], seen);
	      }
	    }
	  }
	
	  var text$1 = {
	
	    bind: function bind() {
	      this.attr = this.el.nodeType === 3 ? 'data' : 'textContent';
	    },
	
	    update: function update(value) {
	      this.el[this.attr] = _toString(value);
	    }
	  };
	
	  var templateCache = new Cache(1000);
	  var idSelectorCache = new Cache(1000);
	
	  var map = {
	    efault: [0, '', ''],
	    legend: [1, '<fieldset>', '</fieldset>'],
	    tr: [2, '<table><tbody>', '</tbody></table>'],
	    col: [2, '<table><tbody></tbody><colgroup>', '</colgroup></table>']
	  };
	
	  map.td = map.th = [3, '<table><tbody><tr>', '</tr></tbody></table>'];
	
	  map.option = map.optgroup = [1, '<select multiple="multiple">', '</select>'];
	
	  map.thead = map.tbody = map.colgroup = map.caption = map.tfoot = [1, '<table>', '</table>'];
	
	  map.g = map.defs = map.symbol = map.use = map.image = map.text = map.circle = map.ellipse = map.line = map.path = map.polygon = map.polyline = map.rect = [1, '<svg ' + 'xmlns="http://www.w3.org/2000/svg" ' + 'xmlns:xlink="http://www.w3.org/1999/xlink" ' + 'xmlns:ev="http://www.w3.org/2001/xml-events"' + 'version="1.1">', '</svg>'];
	
	  /**
	   * Check if a node is a supported template node with a
	   * DocumentFragment content.
	   *
	   * @param {Node} node
	   * @return {Boolean}
	   */
	
	  function isRealTemplate(node) {
	    return isTemplate(node) && isFragment(node.content);
	  }
	
	  var tagRE$1 = /<([\w:-]+)/;
	  var entityRE = /&#?\w+?;/;
	
	  /**
	   * Convert a string template to a DocumentFragment.
	   * Determines correct wrapping by tag types. Wrapping
	   * strategy found in jQuery & component/domify.
	   *
	   * @param {String} templateString
	   * @param {Boolean} raw
	   * @return {DocumentFragment}
	   */
	
	  function stringToFragment(templateString, raw) {
	    // try a cache hit first
	    var cacheKey = raw ? templateString : templateString.trim();
	    var hit = templateCache.get(cacheKey);
	    if (hit) {
	      return hit;
	    }
	
	    var frag = document.createDocumentFragment();
	    var tagMatch = templateString.match(tagRE$1);
	    var entityMatch = entityRE.test(templateString);
	
	    if (!tagMatch && !entityMatch) {
	      // text only, return a single text node.
	      frag.appendChild(document.createTextNode(templateString));
	    } else {
	      var tag = tagMatch && tagMatch[1];
	      var wrap = map[tag] || map.efault;
	      var depth = wrap[0];
	      var prefix = wrap[1];
	      var suffix = wrap[2];
	      var node = document.createElement('div');
	
	      node.innerHTML = prefix + templateString + suffix;
	      while (depth--) {
	        node = node.lastChild;
	      }
	
	      var child;
	      /* eslint-disable no-cond-assign */
	      while (child = node.firstChild) {
	        /* eslint-enable no-cond-assign */
	        frag.appendChild(child);
	      }
	    }
	    if (!raw) {
	      trimNode(frag);
	    }
	    templateCache.put(cacheKey, frag);
	    return frag;
	  }
	
	  /**
	   * Convert a template node to a DocumentFragment.
	   *
	   * @param {Node} node
	   * @return {DocumentFragment}
	   */
	
	  function nodeToFragment(node) {
	    // if its a template tag and the browser supports it,
	    // its content is already a document fragment. However, iOS Safari has
	    // bug when using directly cloned template content with touch
	    // events and can cause crashes when the nodes are removed from DOM, so we
	    // have to treat template elements as string templates. (#2805)
	    /* istanbul ignore if */
	    if (isRealTemplate(node)) {
	      return stringToFragment(node.innerHTML);
	    }
	    // script template
	    if (node.tagName === 'SCRIPT') {
	      return stringToFragment(node.textContent);
	    }
	    // normal node, clone it to avoid mutating the original
	    var clonedNode = cloneNode(node);
	    var frag = document.createDocumentFragment();
	    var child;
	    /* eslint-disable no-cond-assign */
	    while (child = clonedNode.firstChild) {
	      /* eslint-enable no-cond-assign */
	      frag.appendChild(child);
	    }
	    trimNode(frag);
	    return frag;
	  }
	
	  // Test for the presence of the Safari template cloning bug
	  // https://bugs.webkit.org/showug.cgi?id=137755
	  var hasBrokenTemplate = (function () {
	    /* istanbul ignore else */
	    if (inBrowser) {
	      var a = document.createElement('div');
	      a.innerHTML = '<template>1</template>';
	      return !a.cloneNode(true).firstChild.innerHTML;
	    } else {
	      return false;
	    }
	  })();
	
	  // Test for IE10/11 textarea placeholder clone bug
	  var hasTextareaCloneBug = (function () {
	    /* istanbul ignore else */
	    if (inBrowser) {
	      var t = document.createElement('textarea');
	      t.placeholder = 't';
	      return t.cloneNode(true).value === 't';
	    } else {
	      return false;
	    }
	  })();
	
	  /**
	   * 1. Deal with Safari cloning nested <template> bug by
	   *    manually cloning all template instances.
	   * 2. Deal with IE10/11 textarea placeholder bug by setting
	   *    the correct value after cloning.
	   *
	   * @param {Element|DocumentFragment} node
	   * @return {Element|DocumentFragment}
	   */
	
	  function cloneNode(node) {
	    /* istanbul ignore if */
	    if (!node.querySelectorAll) {
	      return node.cloneNode();
	    }
	    var res = node.cloneNode(true);
	    var i, original, cloned;
	    /* istanbul ignore if */
	    if (hasBrokenTemplate) {
	      var tempClone = res;
	      if (isRealTemplate(node)) {
	        node = node.content;
	        tempClone = res.content;
	      }
	      original = node.querySelectorAll('template');
	      if (original.length) {
	        cloned = tempClone.querySelectorAll('template');
	        i = cloned.length;
	        while (i--) {
	          cloned[i].parentNode.replaceChild(cloneNode(original[i]), cloned[i]);
	        }
	      }
	    }
	    /* istanbul ignore if */
	    if (hasTextareaCloneBug) {
	      if (node.tagName === 'TEXTAREA') {
	        res.value = node.value;
	      } else {
	        original = node.querySelectorAll('textarea');
	        if (original.length) {
	          cloned = res.querySelectorAll('textarea');
	          i = cloned.length;
	          while (i--) {
	            cloned[i].value = original[i].value;
	          }
	        }
	      }
	    }
	    return res;
	  }
	
	  /**
	   * Process the template option and normalizes it into a
	   * a DocumentFragment that can be used as a partial or a
	   * instance template.
	   *
	   * @param {*} template
	   *        Possible values include:
	   *        - DocumentFragment object
	   *        - Node object of type Template
	   *        - id selector: '#some-template-id'
	   *        - template string: '<div><span>{{msg}}</span></div>'
	   * @param {Boolean} shouldClone
	   * @param {Boolean} raw
	   *        inline HTML interpolation. Do not check for id
	   *        selector and keep whitespace in the string.
	   * @return {DocumentFragment|undefined}
	   */
	
	  function parseTemplate(template, shouldClone, raw) {
	    var node, frag;
	
	    // if the template is already a document fragment,
	    // do nothing
	    if (isFragment(template)) {
	      trimNode(template);
	      return shouldClone ? cloneNode(template) : template;
	    }
	
	    if (typeof template === 'string') {
	      // id selector
	      if (!raw && template.charAt(0) === '#') {
	        // id selector can be cached too
	        frag = idSelectorCache.get(template);
	        if (!frag) {
	          node = document.getElementById(template.slice(1));
	          if (node) {
	            frag = nodeToFragment(node);
	            // save selector to cache
	            idSelectorCache.put(template, frag);
	          }
	        }
	      } else {
	        // normal string template
	        frag = stringToFragment(template, raw);
	      }
	    } else if (template.nodeType) {
	      // a direct node
	      frag = nodeToFragment(template);
	    }
	
	    return frag && shouldClone ? cloneNode(frag) : frag;
	  }
	
	var template = Object.freeze({
	    cloneNode: cloneNode,
	    parseTemplate: parseTemplate
	  });
	
	  var html = {
	
	    bind: function bind() {
	      // a comment node means this is a binding for
	      // {{{ inline unescaped html }}}
	      if (this.el.nodeType === 8) {
	        // hold nodes
	        this.nodes = [];
	        // replace the placeholder with proper anchor
	        this.anchor = createAnchor('v-html');
	        replace(this.el, this.anchor);
	      }
	    },
	
	    update: function update(value) {
	      value = _toString(value);
	      if (this.nodes) {
	        this.swap(value);
	      } else {
	        this.el.innerHTML = value;
	      }
	    },
	
	    swap: function swap(value) {
	      // remove old nodes
	      var i = this.nodes.length;
	      while (i--) {
	        remove(this.nodes[i]);
	      }
	      // convert new value to a fragment
	      // do not attempt to retrieve from id selector
	      var frag = parseTemplate(value, true, true);
	      // save a reference to these nodes so we can remove later
	      this.nodes = toArray(frag.childNodes);
	      before(frag, this.anchor);
	    }
	  };
	
	  /**
	   * Abstraction for a partially-compiled fragment.
	   * Can optionally compile content with a child scope.
	   *
	   * @param {Function} linker
	   * @param {Vue} vm
	   * @param {DocumentFragment} frag
	   * @param {Vue} [host]
	   * @param {Object} [scope]
	   * @param {Fragment} [parentFrag]
	   */
	  function Fragment(linker, vm, frag, host, scope, parentFrag) {
	    this.children = [];
	    this.childFrags = [];
	    this.vm = vm;
	    this.scope = scope;
	    this.inserted = false;
	    this.parentFrag = parentFrag;
	    if (parentFrag) {
	      parentFrag.childFrags.push(this);
	    }
	    this.unlink = linker(vm, frag, host, scope, this);
	    var single = this.single = frag.childNodes.length === 1 &&
	    // do not go single mode if the only node is an anchor
	    !frag.childNodes[0].__v_anchor;
	    if (single) {
	      this.node = frag.childNodes[0];
	      this.before = singleBefore;
	      this.remove = singleRemove;
	    } else {
	      this.node = createAnchor('fragment-start');
	      this.end = createAnchor('fragment-end');
	      this.frag = frag;
	      prepend(this.node, frag);
	      frag.appendChild(this.end);
	      this.before = multiBefore;
	      this.remove = multiRemove;
	    }
	    this.node.__v_frag = this;
	  }
	
	  /**
	   * Call attach/detach for all components contained within
	   * this fragment. Also do so recursively for all child
	   * fragments.
	   *
	   * @param {Function} hook
	   */
	
	  Fragment.prototype.callHook = function (hook) {
	    var i, l;
	    for (i = 0, l = this.childFrags.length; i < l; i++) {
	      this.childFrags[i].callHook(hook);
	    }
	    for (i = 0, l = this.children.length; i < l; i++) {
	      hook(this.children[i]);
	    }
	  };
	
	  /**
	   * Insert fragment before target, single node version
	   *
	   * @param {Node} target
	   * @param {Boolean} withTransition
	   */
	
	  function singleBefore(target, withTransition) {
	    this.inserted = true;
	    var method = withTransition !== false ? beforeWithTransition : before;
	    method(this.node, target, this.vm);
	    if (inDoc(this.node)) {
	      this.callHook(attach);
	    }
	  }
	
	  /**
	   * Remove fragment, single node version
	   */
	
	  function singleRemove() {
	    this.inserted = false;
	    var shouldCallRemove = inDoc(this.node);
	    var self = this;
	    this.beforeRemove();
	    removeWithTransition(this.node, this.vm, function () {
	      if (shouldCallRemove) {
	        self.callHook(detach);
	      }
	      self.destroy();
	    });
	  }
	
	  /**
	   * Insert fragment before target, multi-nodes version
	   *
	   * @param {Node} target
	   * @param {Boolean} withTransition
	   */
	
	  function multiBefore(target, withTransition) {
	    this.inserted = true;
	    var vm = this.vm;
	    var method = withTransition !== false ? beforeWithTransition : before;
	    mapNodeRange(this.node, this.end, function (node) {
	      method(node, target, vm);
	    });
	    if (inDoc(this.node)) {
	      this.callHook(attach);
	    }
	  }
	
	  /**
	   * Remove fragment, multi-nodes version
	   */
	
	  function multiRemove() {
	    this.inserted = false;
	    var self = this;
	    var shouldCallRemove = inDoc(this.node);
	    this.beforeRemove();
	    removeNodeRange(this.node, this.end, this.vm, this.frag, function () {
	      if (shouldCallRemove) {
	        self.callHook(detach);
	      }
	      self.destroy();
	    });
	  }
	
	  /**
	   * Prepare the fragment for removal.
	   */
	
	  Fragment.prototype.beforeRemove = function () {
	    var i, l;
	    for (i = 0, l = this.childFrags.length; i < l; i++) {
	      // call the same method recursively on child
	      // fragments, depth-first
	      this.childFrags[i].beforeRemove(false);
	    }
	    for (i = 0, l = this.children.length; i < l; i++) {
	      // Call destroy for all contained instances,
	      // with remove:false and defer:true.
	      // Defer is necessary because we need to
	      // keep the children to call detach hooks
	      // on them.
	      this.children[i].$destroy(false, true);
	    }
	    var dirs = this.unlink.dirs;
	    for (i = 0, l = dirs.length; i < l; i++) {
	      // disable the watchers on all the directives
	      // so that the rendered content stays the same
	      // during removal.
	      dirs[i]._watcher && dirs[i]._watcher.teardown();
	    }
	  };
	
	  /**
	   * Destroy the fragment.
	   */
	
	  Fragment.prototype.destroy = function () {
	    if (this.parentFrag) {
	      this.parentFrag.childFrags.$remove(this);
	    }
	    this.node.__v_frag = null;
	    this.unlink();
	  };
	
	  /**
	   * Call attach hook for a Vue instance.
	   *
	   * @param {Vue} child
	   */
	
	  function attach(child) {
	    if (!child._isAttached && inDoc(child.$el)) {
	      child._callHook('attached');
	    }
	  }
	
	  /**
	   * Call detach hook for a Vue instance.
	   *
	   * @param {Vue} child
	   */
	
	  function detach(child) {
	    if (child._isAttached && !inDoc(child.$el)) {
	      child._callHook('detached');
	    }
	  }
	
	  var linkerCache = new Cache(5000);
	
	  /**
	   * A factory that can be used to create instances of a
	   * fragment. Caches the compiled linker if possible.
	   *
	   * @param {Vue} vm
	   * @param {Element|String} el
	   */
	  function FragmentFactory(vm, el) {
	    this.vm = vm;
	    var template;
	    var isString = typeof el === 'string';
	    if (isString || isTemplate(el) && !el.hasAttribute('v-if')) {
	      template = parseTemplate(el, true);
	    } else {
	      template = document.createDocumentFragment();
	      template.appendChild(el);
	    }
	    this.template = template;
	    // linker can be cached, but only for components
	    var linker;
	    var cid = vm.constructor.cid;
	    if (cid > 0) {
	      var cacheId = cid + (isString ? el : getOuterHTML(el));
	      linker = linkerCache.get(cacheId);
	      if (!linker) {
	        linker = compile(template, vm.$options, true);
	        linkerCache.put(cacheId, linker);
	      }
	    } else {
	      linker = compile(template, vm.$options, true);
	    }
	    this.linker = linker;
	  }
	
	  /**
	   * Create a fragment instance with given host and scope.
	   *
	   * @param {Vue} host
	   * @param {Object} scope
	   * @param {Fragment} parentFrag
	   */
	
	  FragmentFactory.prototype.create = function (host, scope, parentFrag) {
	    var frag = cloneNode(this.template);
	    return new Fragment(this.linker, this.vm, frag, host, scope, parentFrag);
	  };
	
	  var ON = 700;
	  var MODEL = 800;
	  var BIND = 850;
	  var TRANSITION = 1100;
	  var EL = 1500;
	  var COMPONENT = 1500;
	  var PARTIAL = 1750;
	  var IF = 2100;
	  var FOR = 2200;
	  var SLOT = 2300;
	
	  var uid$3 = 0;
	
	  var vFor = {
	
	    priority: FOR,
	    terminal: true,
	
	    params: ['track-by', 'stagger', 'enter-stagger', 'leave-stagger'],
	
	    bind: function bind() {
	      // support "item in/of items" syntax
	      var inMatch = this.expression.match(/(.*) (?:in|of) (.*)/);
	      if (inMatch) {
	        var itMatch = inMatch[1].match(/\((.*),(.*)\)/);
	        if (itMatch) {
	          this.iterator = itMatch[1].trim();
	          this.alias = itMatch[2].trim();
	        } else {
	          this.alias = inMatch[1].trim();
	        }
	        this.expression = inMatch[2];
	      }
	
	      if (!this.alias) {
	        'development' !== 'production' && warn('Invalid v-for expression "' + this.descriptor.raw + '": ' + 'alias is required.', this.vm);
	        return;
	      }
	
	      // uid as a cache identifier
	      this.id = '__v-for__' + ++uid$3;
	
	      // check if this is an option list,
	      // so that we know if we need to update the <select>'s
	      // v-model when the option list has changed.
	      // because v-model has a lower priority than v-for,
	      // the v-model is not bound here yet, so we have to
	      // retrive it in the actual updateModel() function.
	      var tag = this.el.tagName;
	      this.isOption = (tag === 'OPTION' || tag === 'OPTGROUP') && this.el.parentNode.tagName === 'SELECT';
	
	      // setup anchor nodes
	      this.start = createAnchor('v-for-start');
	      this.end = createAnchor('v-for-end');
	      replace(this.el, this.end);
	      before(this.start, this.end);
	
	      // cache
	      this.cache = Object.create(null);
	
	      // fragment factory
	      this.factory = new FragmentFactory(this.vm, this.el);
	    },
	
	    update: function update(data) {
	      this.diff(data);
	      this.updateRef();
	      this.updateModel();
	    },
	
	    /**
	     * Diff, based on new data and old data, determine the
	     * minimum amount of DOM manipulations needed to make the
	     * DOM reflect the new data Array.
	     *
	     * The algorithm diffs the new data Array by storing a
	     * hidden reference to an owner vm instance on previously
	     * seen data. This allows us to achieve O(n) which is
	     * better than a levenshtein distance based algorithm,
	     * which is O(m * n).
	     *
	     * @param {Array} data
	     */
	
	    diff: function diff(data) {
	      // check if the Array was converted from an Object
	      var item = data[0];
	      var convertedFromObject = this.fromObject = isObject(item) && hasOwn(item, '$key') && hasOwn(item, '$value');
	
	      var trackByKey = this.params.trackBy;
	      var oldFrags = this.frags;
	      var frags = this.frags = new Array(data.length);
	      var alias = this.alias;
	      var iterator = this.iterator;
	      var start = this.start;
	      var end = this.end;
	      var inDocument = inDoc(start);
	      var init = !oldFrags;
	      var i, l, frag, key, value, primitive;
	
	      // First pass, go through the new Array and fill up
	      // the new frags array. If a piece of data has a cached
	      // instance for it, we reuse it. Otherwise build a new
	      // instance.
	      for (i = 0, l = data.length; i < l; i++) {
	        item = data[i];
	        key = convertedFromObject ? item.$key : null;
	        value = convertedFromObject ? item.$value : item;
	        primitive = !isObject(value);
	        frag = !init && this.getCachedFrag(value, i, key);
	        if (frag) {
	          // reusable fragment
	          frag.reused = true;
	          // update $index
	          frag.scope.$index = i;
	          // update $key
	          if (key) {
	            frag.scope.$key = key;
	          }
	          // update iterator
	          if (iterator) {
	            frag.scope[iterator] = key !== null ? key : i;
	          }
	          // update data for track-by, object repeat &
	          // primitive values.
	          if (trackByKey || convertedFromObject || primitive) {
	            withoutConversion(function () {
	              frag.scope[alias] = value;
	            });
	          }
	        } else {
	          // new isntance
	          frag = this.create(value, alias, i, key);
	          frag.fresh = !init;
	        }
	        frags[i] = frag;
	        if (init) {
	          frag.before(end);
	        }
	      }
	
	      // we're done for the initial render.
	      if (init) {
	        return;
	      }
	
	      // Second pass, go through the old fragments and
	      // destroy those who are not reused (and remove them
	      // from cache)
	      var removalIndex = 0;
	      var totalRemoved = oldFrags.length - frags.length;
	      // when removing a large number of fragments, watcher removal
	      // turns out to be a perf bottleneck, so we batch the watcher
	      // removals into a single filter call!
	      this.vm._vForRemoving = true;
	      for (i = 0, l = oldFrags.length; i < l; i++) {
	        frag = oldFrags[i];
	        if (!frag.reused) {
	          this.deleteCachedFrag(frag);
	          this.remove(frag, removalIndex++, totalRemoved, inDocument);
	        }
	      }
	      this.vm._vForRemoving = false;
	      if (removalIndex) {
	        this.vm._watchers = this.vm._watchers.filter(function (w) {
	          return w.active;
	        });
	      }
	
	      // Final pass, move/insert new fragments into the
	      // right place.
	      var targetPrev, prevEl, currentPrev;
	      var insertionIndex = 0;
	      for (i = 0, l = frags.length; i < l; i++) {
	        frag = frags[i];
	        // this is the frag that we should be after
	        targetPrev = frags[i - 1];
	        prevEl = targetPrev ? targetPrev.staggerCb ? targetPrev.staggerAnchor : targetPrev.end || targetPrev.node : start;
	        if (frag.reused && !frag.staggerCb) {
	          currentPrev = findPrevFrag(frag, start, this.id);
	          if (currentPrev !== targetPrev && (!currentPrev ||
	          // optimization for moving a single item.
	          // thanks to suggestions by @livoras in #1807
	          findPrevFrag(currentPrev, start, this.id) !== targetPrev)) {
	            this.move(frag, prevEl);
	          }
	        } else {
	          // new instance, or still in stagger.
	          // insert with updated stagger index.
	          this.insert(frag, insertionIndex++, prevEl, inDocument);
	        }
	        frag.reused = frag.fresh = false;
	      }
	    },
	
	    /**
	     * Create a new fragment instance.
	     *
	     * @param {*} value
	     * @param {String} alias
	     * @param {Number} index
	     * @param {String} [key]
	     * @return {Fragment}
	     */
	
	    create: function create(value, alias, index, key) {
	      var host = this._host;
	      // create iteration scope
	      var parentScope = this._scope || this.vm;
	      var scope = Object.create(parentScope);
	      // ref holder for the scope
	      scope.$refs = Object.create(parentScope.$refs);
	      scope.$els = Object.create(parentScope.$els);
	      // make sure point $parent to parent scope
	      scope.$parent = parentScope;
	      // for two-way binding on alias
	      scope.$forContext = this;
	      // define scope properties
	      // important: define the scope alias without forced conversion
	      // so that frozen data structures remain non-reactive.
	      withoutConversion(function () {
	        defineReactive(scope, alias, value);
	      });
	      defineReactive(scope, '$index', index);
	      if (key) {
	        defineReactive(scope, '$key', key);
	      } else if (scope.$key) {
	        // avoid accidental fallback
	        def(scope, '$key', null);
	      }
	      if (this.iterator) {
	        defineReactive(scope, this.iterator, key !== null ? key : index);
	      }
	      var frag = this.factory.create(host, scope, this._frag);
	      frag.forId = this.id;
	      this.cacheFrag(value, frag, index, key);
	      return frag;
	    },
	
	    /**
	     * Update the v-ref on owner vm.
	     */
	
	    updateRef: function updateRef() {
	      var ref = this.descriptor.ref;
	      if (!ref) return;
	      var hash = (this._scope || this.vm).$refs;
	      var refs;
	      if (!this.fromObject) {
	        refs = this.frags.map(findVmFromFrag);
	      } else {
	        refs = {};
	        this.frags.forEach(function (frag) {
	          refs[frag.scope.$key] = findVmFromFrag(frag);
	        });
	      }
	      hash[ref] = refs;
	    },
	
	    /**
	     * For option lists, update the containing v-model on
	     * parent <select>.
	     */
	
	    updateModel: function updateModel() {
	      if (this.isOption) {
	        var parent = this.start.parentNode;
	        var model = parent && parent.__v_model;
	        if (model) {
	          model.forceUpdate();
	        }
	      }
	    },
	
	    /**
	     * Insert a fragment. Handles staggering.
	     *
	     * @param {Fragment} frag
	     * @param {Number} index
	     * @param {Node} prevEl
	     * @param {Boolean} inDocument
	     */
	
	    insert: function insert(frag, index, prevEl, inDocument) {
	      if (frag.staggerCb) {
	        frag.staggerCb.cancel();
	        frag.staggerCb = null;
	      }
	      var staggerAmount = this.getStagger(frag, index, null, 'enter');
	      if (inDocument && staggerAmount) {
	        // create an anchor and insert it synchronously,
	        // so that we can resolve the correct order without
	        // worrying about some elements not inserted yet
	        var anchor = frag.staggerAnchor;
	        if (!anchor) {
	          anchor = frag.staggerAnchor = createAnchor('stagger-anchor');
	          anchor.__v_frag = frag;
	        }
	        after(anchor, prevEl);
	        var op = frag.staggerCb = cancellable(function () {
	          frag.staggerCb = null;
	          frag.before(anchor);
	          remove(anchor);
	        });
	        setTimeout(op, staggerAmount);
	      } else {
	        var target = prevEl.nextSibling;
	        /* istanbul ignore if */
	        if (!target) {
	          // reset end anchor position in case the position was messed up
	          // by an external drag-n-drop library.
	          after(this.end, prevEl);
	          target = this.end;
	        }
	        frag.before(target);
	      }
	    },
	
	    /**
	     * Remove a fragment. Handles staggering.
	     *
	     * @param {Fragment} frag
	     * @param {Number} index
	     * @param {Number} total
	     * @param {Boolean} inDocument
	     */
	
	    remove: function remove(frag, index, total, inDocument) {
	      if (frag.staggerCb) {
	        frag.staggerCb.cancel();
	        frag.staggerCb = null;
	        // it's not possible for the same frag to be removed
	        // twice, so if we have a pending stagger callback,
	        // it means this frag is queued for enter but removed
	        // before its transition started. Since it is already
	        // destroyed, we can just leave it in detached state.
	        return;
	      }
	      var staggerAmount = this.getStagger(frag, index, total, 'leave');
	      if (inDocument && staggerAmount) {
	        var op = frag.staggerCb = cancellable(function () {
	          frag.staggerCb = null;
	          frag.remove();
	        });
	        setTimeout(op, staggerAmount);
	      } else {
	        frag.remove();
	      }
	    },
	
	    /**
	     * Move a fragment to a new position.
	     * Force no transition.
	     *
	     * @param {Fragment} frag
	     * @param {Node} prevEl
	     */
	
	    move: function move(frag, prevEl) {
	      // fix a common issue with Sortable:
	      // if prevEl doesn't have nextSibling, this means it's
	      // been dragged after the end anchor. Just re-position
	      // the end anchor to the end of the container.
	      /* istanbul ignore if */
	      if (!prevEl.nextSibling) {
	        this.end.parentNode.appendChild(this.end);
	      }
	      frag.before(prevEl.nextSibling, false);
	    },
	
	    /**
	     * Cache a fragment using track-by or the object key.
	     *
	     * @param {*} value
	     * @param {Fragment} frag
	     * @param {Number} index
	     * @param {String} [key]
	     */
	
	    cacheFrag: function cacheFrag(value, frag, index, key) {
	      var trackByKey = this.params.trackBy;
	      var cache = this.cache;
	      var primitive = !isObject(value);
	      var id;
	      if (key || trackByKey || primitive) {
	        id = getTrackByKey(index, key, value, trackByKey);
	        if (!cache[id]) {
	          cache[id] = frag;
	        } else if (trackByKey !== '$index') {
	          'development' !== 'production' && this.warnDuplicate(value);
	        }
	      } else {
	        id = this.id;
	        if (hasOwn(value, id)) {
	          if (value[id] === null) {
	            value[id] = frag;
	          } else {
	            'development' !== 'production' && this.warnDuplicate(value);
	          }
	        } else if (Object.isExtensible(value)) {
	          def(value, id, frag);
	        } else if (true) {
	          warn('Frozen v-for objects cannot be automatically tracked, make sure to ' + 'provide a track-by key.');
	        }
	      }
	      frag.raw = value;
	    },
	
	    /**
	     * Get a cached fragment from the value/index/key
	     *
	     * @param {*} value
	     * @param {Number} index
	     * @param {String} key
	     * @return {Fragment}
	     */
	
	    getCachedFrag: function getCachedFrag(value, index, key) {
	      var trackByKey = this.params.trackBy;
	      var primitive = !isObject(value);
	      var frag;
	      if (key || trackByKey || primitive) {
	        var id = getTrackByKey(index, key, value, trackByKey);
	        frag = this.cache[id];
	      } else {
	        frag = value[this.id];
	      }
	      if (frag && (frag.reused || frag.fresh)) {
	        'development' !== 'production' && this.warnDuplicate(value);
	      }
	      return frag;
	    },
	
	    /**
	     * Delete a fragment from cache.
	     *
	     * @param {Fragment} frag
	     */
	
	    deleteCachedFrag: function deleteCachedFrag(frag) {
	      var value = frag.raw;
	      var trackByKey = this.params.trackBy;
	      var scope = frag.scope;
	      var index = scope.$index;
	      // fix #948: avoid accidentally fall through to
	      // a parent repeater which happens to have $key.
	      var key = hasOwn(scope, '$key') && scope.$key;
	      var primitive = !isObject(value);
	      if (trackByKey || key || primitive) {
	        var id = getTrackByKey(index, key, value, trackByKey);
	        this.cache[id] = null;
	      } else {
	        value[this.id] = null;
	        frag.raw = null;
	      }
	    },
	
	    /**
	     * Get the stagger amount for an insertion/removal.
	     *
	     * @param {Fragment} frag
	     * @param {Number} index
	     * @param {Number} total
	     * @param {String} type
	     */
	
	    getStagger: function getStagger(frag, index, total, type) {
	      type = type + 'Stagger';
	      var trans = frag.node.__v_trans;
	      var hooks = trans && trans.hooks;
	      var hook = hooks && (hooks[type] || hooks.stagger);
	      return hook ? hook.call(frag, index, total) : index * parseInt(this.params[type] || this.params.stagger, 10);
	    },
	
	    /**
	     * Pre-process the value before piping it through the
	     * filters. This is passed to and called by the watcher.
	     */
	
	    _preProcess: function _preProcess(value) {
	      // regardless of type, store the un-filtered raw value.
	      this.rawValue = value;
	      return value;
	    },
	
	    /**
	     * Post-process the value after it has been piped through
	     * the filters. This is passed to and called by the watcher.
	     *
	     * It is necessary for this to be called during the
	     * wathcer's dependency collection phase because we want
	     * the v-for to update when the source Object is mutated.
	     */
	
	    _postProcess: function _postProcess(value) {
	      if (isArray(value)) {
	        return value;
	      } else if (isPlainObject(value)) {
	        // convert plain object to array.
	        var keys = Object.keys(value);
	        var i = keys.length;
	        var res = new Array(i);
	        var key;
	        while (i--) {
	          key = keys[i];
	          res[i] = {
	            $key: key,
	            $value: value[key]
	          };
	        }
	        return res;
	      } else {
	        if (typeof value === 'number' && !isNaN(value)) {
	          value = range(value);
	        }
	        return value || [];
	      }
	    },
	
	    unbind: function unbind() {
	      if (this.descriptor.ref) {
	        (this._scope || this.vm).$refs[this.descriptor.ref] = null;
	      }
	      if (this.frags) {
	        var i = this.frags.length;
	        var frag;
	        while (i--) {
	          frag = this.frags[i];
	          this.deleteCachedFrag(frag);
	          frag.destroy();
	        }
	      }
	    }
	  };
	
	  /**
	   * Helper to find the previous element that is a fragment
	   * anchor. This is necessary because a destroyed frag's
	   * element could still be lingering in the DOM before its
	   * leaving transition finishes, but its inserted flag
	   * should have been set to false so we can skip them.
	   *
	   * If this is a block repeat, we want to make sure we only
	   * return frag that is bound to this v-for. (see #929)
	   *
	   * @param {Fragment} frag
	   * @param {Comment|Text} anchor
	   * @param {String} id
	   * @return {Fragment}
	   */
	
	  function findPrevFrag(frag, anchor, id) {
	    var el = frag.node.previousSibling;
	    /* istanbul ignore if */
	    if (!el) return;
	    frag = el.__v_frag;
	    while ((!frag || frag.forId !== id || !frag.inserted) && el !== anchor) {
	      el = el.previousSibling;
	      /* istanbul ignore if */
	      if (!el) return;
	      frag = el.__v_frag;
	    }
	    return frag;
	  }
	
	  /**
	   * Find a vm from a fragment.
	   *
	   * @param {Fragment} frag
	   * @return {Vue|undefined}
	   */
	
	  function findVmFromFrag(frag) {
	    var node = frag.node;
	    // handle multi-node frag
	    if (frag.end) {
	      while (!node.__vue__ && node !== frag.end && node.nextSibling) {
	        node = node.nextSibling;
	      }
	    }
	    return node.__vue__;
	  }
	
	  /**
	   * Create a range array from given number.
	   *
	   * @param {Number} n
	   * @return {Array}
	   */
	
	  function range(n) {
	    var i = -1;
	    var ret = new Array(Math.floor(n));
	    while (++i < n) {
	      ret[i] = i;
	    }
	    return ret;
	  }
	
	  /**
	   * Get the track by key for an item.
	   *
	   * @param {Number} index
	   * @param {String} key
	   * @param {*} value
	   * @param {String} [trackByKey]
	   */
	
	  function getTrackByKey(index, key, value, trackByKey) {
	    return trackByKey ? trackByKey === '$index' ? index : trackByKey.charAt(0).match(/\w/) ? getPath(value, trackByKey) : value[trackByKey] : key || value;
	  }
	
	  if (true) {
	    vFor.warnDuplicate = function (value) {
	      warn('Duplicate value found in v-for="' + this.descriptor.raw + '": ' + JSON.stringify(value) + '. Use track-by="$index" if ' + 'you are expecting duplicate values.', this.vm);
	    };
	  }
	
	  var vIf = {
	
	    priority: IF,
	    terminal: true,
	
	    bind: function bind() {
	      var el = this.el;
	      if (!el.__vue__) {
	        // check else block
	        var next = el.nextElementSibling;
	        if (next && getAttr(next, 'v-else') !== null) {
	          remove(next);
	          this.elseEl = next;
	        }
	        // check main block
	        this.anchor = createAnchor('v-if');
	        replace(el, this.anchor);
	      } else {
	        'development' !== 'production' && warn('v-if="' + this.expression + '" cannot be ' + 'used on an instance root element.', this.vm);
	        this.invalid = true;
	      }
	    },
	
	    update: function update(value) {
	      if (this.invalid) return;
	      if (value) {
	        if (!this.frag) {
	          this.insert();
	        }
	      } else {
	        this.remove();
	      }
	    },
	
	    insert: function insert() {
	      if (this.elseFrag) {
	        this.elseFrag.remove();
	        this.elseFrag = null;
	      }
	      // lazy init factory
	      if (!this.factory) {
	        this.factory = new FragmentFactory(this.vm, this.el);
	      }
	      this.frag = this.factory.create(this._host, this._scope, this._frag);
	      this.frag.before(this.anchor);
	    },
	
	    remove: function remove() {
	      if (this.frag) {
	        this.frag.remove();
	        this.frag = null;
	      }
	      if (this.elseEl && !this.elseFrag) {
	        if (!this.elseFactory) {
	          this.elseFactory = new FragmentFactory(this.elseEl._context || this.vm, this.elseEl);
	        }
	        this.elseFrag = this.elseFactory.create(this._host, this._scope, this._frag);
	        this.elseFrag.before(this.anchor);
	      }
	    },
	
	    unbind: function unbind() {
	      if (this.frag) {
	        this.frag.destroy();
	      }
	      if (this.elseFrag) {
	        this.elseFrag.destroy();
	      }
	    }
	  };
	
	  var show = {
	
	    bind: function bind() {
	      // check else block
	      var next = this.el.nextElementSibling;
	      if (next && getAttr(next, 'v-else') !== null) {
	        this.elseEl = next;
	      }
	    },
	
	    update: function update(value) {
	      this.apply(this.el, value);
	      if (this.elseEl) {
	        this.apply(this.elseEl, !value);
	      }
	    },
	
	    apply: function apply(el, value) {
	      if (inDoc(el)) {
	        applyTransition(el, value ? 1 : -1, toggle, this.vm);
	      } else {
	        toggle();
	      }
	      function toggle() {
	        el.style.display = value ? '' : 'none';
	      }
	    }
	  };
	
	  var text$2 = {
	
	    bind: function bind() {
	      var self = this;
	      var el = this.el;
	      var isRange = el.type === 'range';
	      var lazy = this.params.lazy;
	      var number = this.params.number;
	      var debounce = this.params.debounce;
	
	      // handle composition events.
	      //   http://blog.evanyou.me/2014/01/03/composition-event/
	      // skip this for Android because it handles composition
	      // events quite differently. Android doesn't trigger
	      // composition events for language input methods e.g.
	      // Chinese, but instead triggers them for spelling
	      // suggestions... (see Discussion/#162)
	      var composing = false;
	      if (!isAndroid && !isRange) {
	        this.on('compositionstart', function () {
	          composing = true;
	        });
	        this.on('compositionend', function () {
	          composing = false;
	          // in IE11 the "compositionend" event fires AFTER
	          // the "input" event, so the input handler is blocked
	          // at the end... have to call it here.
	          //
	          // #1327: in lazy mode this is unecessary.
	          if (!lazy) {
	            self.listener();
	          }
	        });
	      }
	
	      // prevent messing with the input when user is typing,
	      // and force update on blur.
	      this.focused = false;
	      if (!isRange && !lazy) {
	        this.on('focus', function () {
	          self.focused = true;
	        });
	        this.on('blur', function () {
	          self.focused = false;
	          // do not sync value after fragment removal (#2017)
	          if (!self._frag || self._frag.inserted) {
	            self.rawListener();
	          }
	        });
	      }
	
	      // Now attach the main listener
	      this.listener = this.rawListener = function () {
	        if (composing || !self._bound) {
	          return;
	        }
	        var val = number || isRange ? toNumber(el.value) : el.value;
	        self.set(val);
	        // force update on next tick to avoid lock & same value
	        // also only update when user is not typing
	        nextTick(function () {
	          if (self._bound && !self.focused) {
	            self.update(self._watcher.value);
	          }
	        });
	      };
	
	      // apply debounce
	      if (debounce) {
	        this.listener = _debounce(this.listener, debounce);
	      }
	
	      // Support jQuery events, since jQuery.trigger() doesn't
	      // trigger native events in some cases and some plugins
	      // rely on $.trigger()
	      //
	      // We want to make sure if a listener is attached using
	      // jQuery, it is also removed with jQuery, that's why
	      // we do the check for each directive instance and
	      // store that check result on itself. This also allows
	      // easier test coverage control by unsetting the global
	      // jQuery variable in tests.
	      this.hasjQuery = typeof jQuery === 'function';
	      if (this.hasjQuery) {
	        var method = jQuery.fn.on ? 'on' : 'bind';
	        jQuery(el)[method]('change', this.rawListener);
	        if (!lazy) {
	          jQuery(el)[method]('input', this.listener);
	        }
	      } else {
	        this.on('change', this.rawListener);
	        if (!lazy) {
	          this.on('input', this.listener);
	        }
	      }
	
	      // IE9 doesn't fire input event on backspace/del/cut
	      if (!lazy && isIE9) {
	        this.on('cut', function () {
	          nextTick(self.listener);
	        });
	        this.on('keyup', function (e) {
	          if (e.keyCode === 46 || e.keyCode === 8) {
	            self.listener();
	          }
	        });
	      }
	
	      // set initial value if present
	      if (el.hasAttribute('value') || el.tagName === 'TEXTAREA' && el.value.trim()) {
	        this.afterBind = this.listener;
	      }
	    },
	
	    update: function update(value) {
	      this.el.value = _toString(value);
	    },
	
	    unbind: function unbind() {
	      var el = this.el;
	      if (this.hasjQuery) {
	        var method = jQuery.fn.off ? 'off' : 'unbind';
	        jQuery(el)[method]('change', this.listener);
	        jQuery(el)[method]('input', this.listener);
	      }
	    }
	  };
	
	  var radio = {
	
	    bind: function bind() {
	      var self = this;
	      var el = this.el;
	
	      this.getValue = function () {
	        // value overwrite via v-bind:value
	        if (el.hasOwnProperty('_value')) {
	          return el._value;
	        }
	        var val = el.value;
	        if (self.params.number) {
	          val = toNumber(val);
	        }
	        return val;
	      };
	
	      this.listener = function () {
	        self.set(self.getValue());
	      };
	      this.on('change', this.listener);
	
	      if (el.hasAttribute('checked')) {
	        this.afterBind = this.listener;
	      }
	    },
	
	    update: function update(value) {
	      this.el.checked = looseEqual(value, this.getValue());
	    }
	  };
	
	  var select = {
	
	    bind: function bind() {
	      var self = this;
	      var el = this.el;
	
	      // method to force update DOM using latest value.
	      this.forceUpdate = function () {
	        if (self._watcher) {
	          self.update(self._watcher.get());
	        }
	      };
	
	      // check if this is a multiple select
	      var multiple = this.multiple = el.hasAttribute('multiple');
	
	      // attach listener
	      this.listener = function () {
	        var value = getValue(el, multiple);
	        value = self.params.number ? isArray(value) ? value.map(toNumber) : toNumber(value) : value;
	        self.set(value);
	      };
	      this.on('change', this.listener);
	
	      // if has initial value, set afterBind
	      var initValue = getValue(el, multiple, true);
	      if (multiple && initValue.length || !multiple && initValue !== null) {
	        this.afterBind = this.listener;
	      }
	
	      // All major browsers except Firefox resets
	      // selectedIndex with value -1 to 0 when the element
	      // is appended to a new parent, therefore we have to
	      // force a DOM update whenever that happens...
	      this.vm.$on('hook:attached', this.forceUpdate);
	    },
	
	    update: function update(value) {
	      var el = this.el;
	      el.selectedIndex = -1;
	      var multi = this.multiple && isArray(value);
	      var options = el.options;
	      var i = options.length;
	      var op, val;
	      while (i--) {
	        op = options[i];
	        val = op.hasOwnProperty('_value') ? op._value : op.value;
	        /* eslint-disable eqeqeq */
	        op.selected = multi ? indexOf$1(value, val) > -1 : looseEqual(value, val);
	        /* eslint-enable eqeqeq */
	      }
	    },
	
	    unbind: function unbind() {
	      /* istanbul ignore next */
	      this.vm.$off('hook:attached', this.forceUpdate);
	    }
	  };
	
	  /**
	   * Get select value
	   *
	   * @param {SelectElement} el
	   * @param {Boolean} multi
	   * @param {Boolean} init
	   * @return {Array|*}
	   */
	
	  function getValue(el, multi, init) {
	    var res = multi ? [] : null;
	    var op, val, selected;
	    for (var i = 0, l = el.options.length; i < l; i++) {
	      op = el.options[i];
	      selected = init ? op.hasAttribute('selected') : op.selected;
	      if (selected) {
	        val = op.hasOwnProperty('_value') ? op._value : op.value;
	        if (multi) {
	          res.push(val);
	        } else {
	          return val;
	        }
	      }
	    }
	    return res;
	  }
	
	  /**
	   * Native Array.indexOf uses strict equal, but in this
	   * case we need to match string/numbers with custom equal.
	   *
	   * @param {Array} arr
	   * @param {*} val
	   */
	
	  function indexOf$1(arr, val) {
	    var i = arr.length;
	    while (i--) {
	      if (looseEqual(arr[i], val)) {
	        return i;
	      }
	    }
	    return -1;
	  }
	
	  var checkbox = {
	
	    bind: function bind() {
	      var self = this;
	      var el = this.el;
	
	      this.getValue = function () {
	        return el.hasOwnProperty('_value') ? el._value : self.params.number ? toNumber(el.value) : el.value;
	      };
	
	      function getBooleanValue() {
	        var val = el.checked;
	        if (val && el.hasOwnProperty('_trueValue')) {
	          return el._trueValue;
	        }
	        if (!val && el.hasOwnProperty('_falseValue')) {
	          return el._falseValue;
	        }
	        return val;
	      }
	
	      this.listener = function () {
	        var model = self._watcher.value;
	        if (isArray(model)) {
	          var val = self.getValue();
	          if (el.checked) {
	            if (indexOf(model, val) < 0) {
	              model.push(val);
	            }
	          } else {
	            model.$remove(val);
	          }
	        } else {
	          self.set(getBooleanValue());
	        }
	      };
	
	      this.on('change', this.listener);
	      if (el.hasAttribute('checked')) {
	        this.afterBind = this.listener;
	      }
	    },
	
	    update: function update(value) {
	      var el = this.el;
	      if (isArray(value)) {
	        el.checked = indexOf(value, this.getValue()) > -1;
	      } else {
	        if (el.hasOwnProperty('_trueValue')) {
	          el.checked = looseEqual(value, el._trueValue);
	        } else {
	          el.checked = !!value;
	        }
	      }
	    }
	  };
	
	  var handlers = {
	    text: text$2,
	    radio: radio,
	    select: select,
	    checkbox: checkbox
	  };
	
	  var model = {
	
	    priority: MODEL,
	    twoWay: true,
	    handlers: handlers,
	    params: ['lazy', 'number', 'debounce'],
	
	    /**
	     * Possible elements:
	     *   <select>
	     *   <textarea>
	     *   <input type="*">
	     *     - text
	     *     - checkbox
	     *     - radio
	     *     - number
	     */
	
	    bind: function bind() {
	      // friendly warning...
	      this.checkFilters();
	      if (this.hasRead && !this.hasWrite) {
	        'development' !== 'production' && warn('It seems you are using a read-only filter with ' + 'v-model="' + this.descriptor.raw + '". ' + 'You might want to use a two-way filter to ensure correct behavior.', this.vm);
	      }
	      var el = this.el;
	      var tag = el.tagName;
	      var handler;
	      if (tag === 'INPUT') {
	        handler = handlers[el.type] || handlers.text;
	      } else if (tag === 'SELECT') {
	        handler = handlers.select;
	      } else if (tag === 'TEXTAREA') {
	        handler = handlers.text;
	      } else {
	        'development' !== 'production' && warn('v-model does not support element type: ' + tag, this.vm);
	        return;
	      }
	      el.__v_model = this;
	      handler.bind.call(this);
	      this.update = handler.update;
	      this._unbind = handler.unbind;
	    },
	
	    /**
	     * Check read/write filter stats.
	     */
	
	    checkFilters: function checkFilters() {
	      var filters = this.filters;
	      if (!filters) return;
	      var i = filters.length;
	      while (i--) {
	        var filter = resolveAsset(this.vm.$options, 'filters', filters[i].name);
	        if (typeof filter === 'function' || filter.read) {
	          this.hasRead = true;
	        }
	        if (filter.write) {
	          this.hasWrite = true;
	        }
	      }
	    },
	
	    unbind: function unbind() {
	      this.el.__v_model = null;
	      this._unbind && this._unbind();
	    }
	  };
	
	  // keyCode aliases
	  var keyCodes = {
	    esc: 27,
	    tab: 9,
	    enter: 13,
	    space: 32,
	    'delete': [8, 46],
	    up: 38,
	    left: 37,
	    right: 39,
	    down: 40
	  };
	
	  function keyFilter(handler, keys) {
	    var codes = keys.map(function (key) {
	      var charCode = key.charCodeAt(0);
	      if (charCode > 47 && charCode < 58) {
	        return parseInt(key, 10);
	      }
	      if (key.length === 1) {
	        charCode = key.toUpperCase().charCodeAt(0);
	        if (charCode > 64 && charCode < 91) {
	          return charCode;
	        }
	      }
	      return keyCodes[key];
	    });
	    codes = [].concat.apply([], codes);
	    return function keyHandler(e) {
	      if (codes.indexOf(e.keyCode) > -1) {
	        return handler.call(this, e);
	      }
	    };
	  }
	
	  function stopFilter(handler) {
	    return function stopHandler(e) {
	      e.stopPropagation();
	      return handler.call(this, e);
	    };
	  }
	
	  function preventFilter(handler) {
	    return function preventHandler(e) {
	      e.preventDefault();
	      return handler.call(this, e);
	    };
	  }
	
	  function selfFilter(handler) {
	    return function selfHandler(e) {
	      if (e.target === e.currentTarget) {
	        return handler.call(this, e);
	      }
	    };
	  }
	
	  var on$1 = {
	
	    priority: ON,
	    acceptStatement: true,
	    keyCodes: keyCodes,
	
	    bind: function bind() {
	      // deal with iframes
	      if (this.el.tagName === 'IFRAME' && this.arg !== 'load') {
	        var self = this;
	        this.iframeBind = function () {
	          on(self.el.contentWindow, self.arg, self.handler, self.modifiers.capture);
	        };
	        this.on('load', this.iframeBind);
	      }
	    },
	
	    update: function update(handler) {
	      // stub a noop for v-on with no value,
	      // e.g. @mousedown.prevent
	      if (!this.descriptor.raw) {
	        handler = function () {};
	      }
	
	      if (typeof handler !== 'function') {
	        'development' !== 'production' && warn('v-on:' + this.arg + '="' + this.expression + '" expects a function value, ' + 'got ' + handler, this.vm);
	        return;
	      }
	
	      // apply modifiers
	      if (this.modifiers.stop) {
	        handler = stopFilter(handler);
	      }
	      if (this.modifiers.prevent) {
	        handler = preventFilter(handler);
	      }
	      if (this.modifiers.self) {
	        handler = selfFilter(handler);
	      }
	      // key filter
	      var keys = Object.keys(this.modifiers).filter(function (key) {
	        return key !== 'stop' && key !== 'prevent' && key !== 'self' && key !== 'capture';
	      });
	      if (keys.length) {
	        handler = keyFilter(handler, keys);
	      }
	
	      this.reset();
	      this.handler = handler;
	
	      if (this.iframeBind) {
	        this.iframeBind();
	      } else {
	        on(this.el, this.arg, this.handler, this.modifiers.capture);
	      }
	    },
	
	    reset: function reset() {
	      var el = this.iframeBind ? this.el.contentWindow : this.el;
	      if (this.handler) {
	        off(el, this.arg, this.handler);
	      }
	    },
	
	    unbind: function unbind() {
	      this.reset();
	    }
	  };
	
	  var prefixes = ['-webkit-', '-moz-', '-ms-'];
	  var camelPrefixes = ['Webkit', 'Moz', 'ms'];
	  var importantRE = /!important;?$/;
	  var propCache = Object.create(null);
	
	  var testEl = null;
	
	  var style = {
	
	    deep: true,
	
	    update: function update(value) {
	      if (typeof value === 'string') {
	        this.el.style.cssText = value;
	      } else if (isArray(value)) {
	        this.handleObject(value.reduce(extend, {}));
	      } else {
	        this.handleObject(value || {});
	      }
	    },
	
	    handleObject: function handleObject(value) {
	      // cache object styles so that only changed props
	      // are actually updated.
	      var cache = this.cache || (this.cache = {});
	      var name, val;
	      for (name in cache) {
	        if (!(name in value)) {
	          this.handleSingle(name, null);
	          delete cache[name];
	        }
	      }
	      for (name in value) {
	        val = value[name];
	        if (val !== cache[name]) {
	          cache[name] = val;
	          this.handleSingle(name, val);
	        }
	      }
	    },
	
	    handleSingle: function handleSingle(prop, value) {
	      prop = normalize(prop);
	      if (!prop) return; // unsupported prop
	      // cast possible numbers/booleans into strings
	      if (value != null) value += '';
	      if (value) {
	        var isImportant = importantRE.test(value) ? 'important' : '';
	        if (isImportant) {
	          /* istanbul ignore if */
	          if (true) {
	            warn('It\'s probably a bad idea to use !important with inline rules. ' + 'This feature will be deprecated in a future version of Vue.');
	          }
	          value = value.replace(importantRE, '').trim();
	          this.el.style.setProperty(prop.kebab, value, isImportant);
	        } else {
	          this.el.style[prop.camel] = value;
	        }
	      } else {
	        this.el.style[prop.camel] = '';
	      }
	    }
	
	  };
	
	  /**
	   * Normalize a CSS property name.
	   * - cache result
	   * - auto prefix
	   * - camelCase -> dash-case
	   *
	   * @param {String} prop
	   * @return {String}
	   */
	
	  function normalize(prop) {
	    if (propCache[prop]) {
	      return propCache[prop];
	    }
	    var res = prefix(prop);
	    propCache[prop] = propCache[res] = res;
	    return res;
	  }
	
	  /**
	   * Auto detect the appropriate prefix for a CSS property.
	   * https://gist.github.com/paulirish/523692
	   *
	   * @param {String} prop
	   * @return {String}
	   */
	
	  function prefix(prop) {
	    prop = hyphenate(prop);
	    var camel = camelize(prop);
	    var upper = camel.charAt(0).toUpperCase() + camel.slice(1);
	    if (!testEl) {
	      testEl = document.createElement('div');
	    }
	    var i = prefixes.length;
	    var prefixed;
	    if (camel !== 'filter' && camel in testEl.style) {
	      return {
	        kebab: prop,
	        camel: camel
	      };
	    }
	    while (i--) {
	      prefixed = camelPrefixes[i] + upper;
	      if (prefixed in testEl.style) {
	        return {
	          kebab: prefixes[i] + prop,
	          camel: prefixed
	        };
	      }
	    }
	  }
	
	  // xlink
	  var xlinkNS = 'http://www.w3.org/1999/xlink';
	  var xlinkRE = /^xlink:/;
	
	  // check for attributes that prohibit interpolations
	  var disallowedInterpAttrRE = /^v-|^:|^@|^(?:is|transition|transition-mode|debounce|track-by|stagger|enter-stagger|leave-stagger)$/;
	  // these attributes should also set their corresponding properties
	  // because they only affect the initial state of the element
	  var attrWithPropsRE = /^(?:value|checked|selected|muted)$/;
	  // these attributes expect enumrated values of "true" or "false"
	  // but are not boolean attributes
	  var enumeratedAttrRE = /^(?:draggable|contenteditable|spellcheck)$/;
	
	  // these attributes should set a hidden property for
	  // binding v-model to object values
	  var modelProps = {
	    value: '_value',
	    'true-value': '_trueValue',
	    'false-value': '_falseValue'
	  };
	
	  var bind$1 = {
	
	    priority: BIND,
	
	    bind: function bind() {
	      var attr = this.arg;
	      var tag = this.el.tagName;
	      // should be deep watch on object mode
	      if (!attr) {
	        this.deep = true;
	      }
	      // handle interpolation bindings
	      var descriptor = this.descriptor;
	      var tokens = descriptor.interp;
	      if (tokens) {
	        // handle interpolations with one-time tokens
	        if (descriptor.hasOneTime) {
	          this.expression = tokensToExp(tokens, this._scope || this.vm);
	        }
	
	        // only allow binding on native attributes
	        if (disallowedInterpAttrRE.test(attr) || attr === 'name' && (tag === 'PARTIAL' || tag === 'SLOT')) {
	          'development' !== 'production' && warn(attr + '="' + descriptor.raw + '": ' + 'attribute interpolation is not allowed in Vue.js ' + 'directives and special attributes.', this.vm);
	          this.el.removeAttribute(attr);
	          this.invalid = true;
	        }
	
	        /* istanbul ignore if */
	        if (true) {
	          var raw = attr + '="' + descriptor.raw + '": ';
	          // warn src
	          if (attr === 'src') {
	            warn(raw + 'interpolation in "src" attribute will cause ' + 'a 404 request. Use v-bind:src instead.', this.vm);
	          }
	
	          // warn style
	          if (attr === 'style') {
	            warn(raw + 'interpolation in "style" attribute will cause ' + 'the attribute to be discarded in Internet Explorer. ' + 'Use v-bind:style instead.', this.vm);
	          }
	        }
	      }
	    },
	
	    update: function update(value) {
	      if (this.invalid) {
	        return;
	      }
	      var attr = this.arg;
	      if (this.arg) {
	        this.handleSingle(attr, value);
	      } else {
	        this.handleObject(value || {});
	      }
	    },
	
	    // share object handler with v-bind:class
	    handleObject: style.handleObject,
	
	    handleSingle: function handleSingle(attr, value) {
	      var el = this.el;
	      var interp = this.descriptor.interp;
	      if (this.modifiers.camel) {
	        attr = camelize(attr);
	      }
	      if (!interp && attrWithPropsRE.test(attr) && attr in el) {
	        var attrValue = attr === 'value' ? value == null // IE9 will set input.value to "null" for null...
	        ? '' : value : value;
	
	        if (el[attr] !== attrValue) {
	          el[attr] = attrValue;
	        }
	      }
	      // set model props
	      var modelProp = modelProps[attr];
	      if (!interp && modelProp) {
	        el[modelProp] = value;
	        // update v-model if present
	        var model = el.__v_model;
	        if (model) {
	          model.listener();
	        }
	      }
	      // do not set value attribute for textarea
	      if (attr === 'value' && el.tagName === 'TEXTAREA') {
	        el.removeAttribute(attr);
	        return;
	      }
	      // update attribute
	      if (enumeratedAttrRE.test(attr)) {
	        el.setAttribute(attr, value ? 'true' : 'false');
	      } else if (value != null && value !== false) {
	        if (attr === 'class') {
	          // handle edge case #1960:
	          // class interpolation should not overwrite Vue transition class
	          if (el.__v_trans) {
	            value += ' ' + el.__v_trans.id + '-transition';
	          }
	          setClass(el, value);
	        } else if (xlinkRE.test(attr)) {
	          el.setAttributeNS(xlinkNS, attr, value === true ? '' : value);
	        } else {
	          el.setAttribute(attr, value === true ? '' : value);
	        }
	      } else {
	        el.removeAttribute(attr);
	      }
	    }
	  };
	
	  var el = {
	
	    priority: EL,
	
	    bind: function bind() {
	      /* istanbul ignore if */
	      if (!this.arg) {
	        return;
	      }
	      var id = this.id = camelize(this.arg);
	      var refs = (this._scope || this.vm).$els;
	      if (hasOwn(refs, id)) {
	        refs[id] = this.el;
	      } else {
	        defineReactive(refs, id, this.el);
	      }
	    },
	
	    unbind: function unbind() {
	      var refs = (this._scope || this.vm).$els;
	      if (refs[this.id] === this.el) {
	        refs[this.id] = null;
	      }
	    }
	  };
	
	  var ref = {
	    bind: function bind() {
	      'development' !== 'production' && warn('v-ref:' + this.arg + ' must be used on a child ' + 'component. Found on <' + this.el.tagName.toLowerCase() + '>.', this.vm);
	    }
	  };
	
	  var cloak = {
	    bind: function bind() {
	      var el = this.el;
	      this.vm.$once('pre-hook:compiled', function () {
	        el.removeAttribute('v-cloak');
	      });
	    }
	  };
	
	  // must export plain object
	  var directives = {
	    text: text$1,
	    html: html,
	    'for': vFor,
	    'if': vIf,
	    show: show,
	    model: model,
	    on: on$1,
	    bind: bind$1,
	    el: el,
	    ref: ref,
	    cloak: cloak
	  };
	
	  var vClass = {
	
	    deep: true,
	
	    update: function update(value) {
	      if (!value) {
	        this.cleanup();
	      } else if (typeof value === 'string') {
	        this.setClass(value.trim().split(/\s+/));
	      } else {
	        this.setClass(normalize$1(value));
	      }
	    },
	
	    setClass: function setClass(value) {
	      this.cleanup(value);
	      for (var i = 0, l = value.length; i < l; i++) {
	        var val = value[i];
	        if (val) {
	          apply(this.el, val, addClass);
	        }
	      }
	      this.prevKeys = value;
	    },
	
	    cleanup: function cleanup(value) {
	      var prevKeys = this.prevKeys;
	      if (!prevKeys) return;
	      var i = prevKeys.length;
	      while (i--) {
	        var key = prevKeys[i];
	        if (!value || value.indexOf(key) < 0) {
	          apply(this.el, key, removeClass);
	        }
	      }
	    }
	  };
	
	  /**
	   * Normalize objects and arrays (potentially containing objects)
	   * into array of strings.
	   *
	   * @param {Object|Array<String|Object>} value
	   * @return {Array<String>}
	   */
	
	  function normalize$1(value) {
	    var res = [];
	    if (isArray(value)) {
	      for (var i = 0, l = value.length; i < l; i++) {
	        var _key = value[i];
	        if (_key) {
	          if (typeof _key === 'string') {
	            res.push(_key);
	          } else {
	            for (var k in _key) {
	              if (_key[k]) res.push(k);
	            }
	          }
	        }
	      }
	    } else if (isObject(value)) {
	      for (var key in value) {
	        if (value[key]) res.push(key);
	      }
	    }
	    return res;
	  }
	
	  /**
	   * Add or remove a class/classes on an element
	   *
	   * @param {Element} el
	   * @param {String} key The class name. This may or may not
	   *                     contain a space character, in such a
	   *                     case we'll deal with multiple class
	   *                     names at once.
	   * @param {Function} fn
	   */
	
	  function apply(el, key, fn) {
	    key = key.trim();
	    if (key.indexOf(' ') === -1) {
	      fn(el, key);
	      return;
	    }
	    // The key contains one or more space characters.
	    // Since a class name doesn't accept such characters, we
	    // treat it as multiple classes.
	    var keys = key.split(/\s+/);
	    for (var i = 0, l = keys.length; i < l; i++) {
	      fn(el, keys[i]);
	    }
	  }
	
	  var component = {
	
	    priority: COMPONENT,
	
	    params: ['keep-alive', 'transition-mode', 'inline-template'],
	
	    /**
	     * Setup. Two possible usages:
	     *
	     * - static:
	     *   <comp> or <div v-component="comp">
	     *
	     * - dynamic:
	     *   <component :is="view">
	     */
	
	    bind: function bind() {
	      if (!this.el.__vue__) {
	        // keep-alive cache
	        this.keepAlive = this.params.keepAlive;
	        if (this.keepAlive) {
	          this.cache = {};
	        }
	        // check inline-template
	        if (this.params.inlineTemplate) {
	          // extract inline template as a DocumentFragment
	          this.inlineTemplate = extractContent(this.el, true);
	        }
	        // component resolution related state
	        this.pendingComponentCb = this.Component = null;
	        // transition related state
	        this.pendingRemovals = 0;
	        this.pendingRemovalCb = null;
	        // create a ref anchor
	        this.anchor = createAnchor('v-component');
	        replace(this.el, this.anchor);
	        // remove is attribute.
	        // this is removed during compilation, but because compilation is
	        // cached, when the component is used elsewhere this attribute
	        // will remain at link time.
	        this.el.removeAttribute('is');
	        this.el.removeAttribute(':is');
	        // remove ref, same as above
	        if (this.descriptor.ref) {
	          this.el.removeAttribute('v-ref:' + hyphenate(this.descriptor.ref));
	        }
	        // if static, build right now.
	        if (this.literal) {
	          this.setComponent(this.expression);
	        }
	      } else {
	        'development' !== 'production' && warn('cannot mount component "' + this.expression + '" ' + 'on already mounted element: ' + this.el);
	      }
	    },
	
	    /**
	     * Public update, called by the watcher in the dynamic
	     * literal scenario, e.g. <component :is="view">
	     */
	
	    update: function update(value) {
	      if (!this.literal) {
	        this.setComponent(value);
	      }
	    },
	
	    /**
	     * Switch dynamic components. May resolve the component
	     * asynchronously, and perform transition based on
	     * specified transition mode. Accepts a few additional
	     * arguments specifically for vue-router.
	     *
	     * The callback is called when the full transition is
	     * finished.
	     *
	     * @param {String} value
	     * @param {Function} [cb]
	     */
	
	    setComponent: function setComponent(value, cb) {
	      this.invalidatePending();
	      if (!value) {
	        // just remove current
	        this.unbuild(true);
	        this.remove(this.childVM, cb);
	        this.childVM = null;
	      } else {
	        var self = this;
	        this.resolveComponent(value, function () {
	          self.mountComponent(cb);
	        });
	      }
	    },
	
	    /**
	     * Resolve the component constructor to use when creating
	     * the child vm.
	     *
	     * @param {String|Function} value
	     * @param {Function} cb
	     */
	
	    resolveComponent: function resolveComponent(value, cb) {
	      var self = this;
	      this.pendingComponentCb = cancellable(function (Component) {
	        self.ComponentName = Component.options.name || (typeof value === 'string' ? value : null);
	        self.Component = Component;
	        cb();
	      });
	      this.vm._resolveComponent(value, this.pendingComponentCb);
	    },
	
	    /**
	     * Create a new instance using the current constructor and
	     * replace the existing instance. This method doesn't care
	     * whether the new component and the old one are actually
	     * the same.
	     *
	     * @param {Function} [cb]
	     */
	
	    mountComponent: function mountComponent(cb) {
	      // actual mount
	      this.unbuild(true);
	      var self = this;
	      var activateHooks = this.Component.options.activate;
	      var cached = this.getCached();
	      var newComponent = this.build();
	      if (activateHooks && !cached) {
	        this.waitingFor = newComponent;
	        callActivateHooks(activateHooks, newComponent, function () {
	          if (self.waitingFor !== newComponent) {
	            return;
	          }
	          self.waitingFor = null;
	          self.transition(newComponent, cb);
	        });
	      } else {
	        // update ref for kept-alive component
	        if (cached) {
	          newComponent._updateRef();
	        }
	        this.transition(newComponent, cb);
	      }
	    },
	
	    /**
	     * When the component changes or unbinds before an async
	     * constructor is resolved, we need to invalidate its
	     * pending callback.
	     */
	
	    invalidatePending: function invalidatePending() {
	      if (this.pendingComponentCb) {
	        this.pendingComponentCb.cancel();
	        this.pendingComponentCb = null;
	      }
	    },
	
	    /**
	     * Instantiate/insert a new child vm.
	     * If keep alive and has cached instance, insert that
	     * instance; otherwise build a new one and cache it.
	     *
	     * @param {Object} [extraOptions]
	     * @return {Vue} - the created instance
	     */
	
	    build: function build(extraOptions) {
	      var cached = this.getCached();
	      if (cached) {
	        return cached;
	      }
	      if (this.Component) {
	        // default options
	        var options = {
	          name: this.ComponentName,
	          el: cloneNode(this.el),
	          template: this.inlineTemplate,
	          // make sure to add the child with correct parent
	          // if this is a transcluded component, its parent
	          // should be the transclusion host.
	          parent: this._host || this.vm,
	          // if no inline-template, then the compiled
	          // linker can be cached for better performance.
	          _linkerCachable: !this.inlineTemplate,
	          _ref: this.descriptor.ref,
	          _asComponent: true,
	          _isRouterView: this._isRouterView,
	          // if this is a transcluded component, context
	          // will be the common parent vm of this instance
	          // and its host.
	          _context: this.vm,
	          // if this is inside an inline v-for, the scope
	          // will be the intermediate scope created for this
	          // repeat fragment. this is used for linking props
	          // and container directives.
	          _scope: this._scope,
	          // pass in the owner fragment of this component.
	          // this is necessary so that the fragment can keep
	          // track of its contained components in order to
	          // call attach/detach hooks for them.
	          _frag: this._frag
	        };
	        // extra options
	        // in 1.0.0 this is used by vue-router only
	        /* istanbul ignore if */
	        if (extraOptions) {
	          extend(options, extraOptions);
	        }
	        var child = new this.Component(options);
	        if (this.keepAlive) {
	          this.cache[this.Component.cid] = child;
	        }
	        /* istanbul ignore if */
	        if ('development' !== 'production' && this.el.hasAttribute('transition') && child._isFragment) {
	          warn('Transitions will not work on a fragment instance. ' + 'Template: ' + child.$options.template, child);
	        }
	        return child;
	      }
	    },
	
	    /**
	     * Try to get a cached instance of the current component.
	     *
	     * @return {Vue|undefined}
	     */
	
	    getCached: function getCached() {
	      return this.keepAlive && this.cache[this.Component.cid];
	    },
	
	    /**
	     * Teardown the current child, but defers cleanup so
	     * that we can separate the destroy and removal steps.
	     *
	     * @param {Boolean} defer
	     */
	
	    unbuild: function unbuild(defer) {
	      if (this.waitingFor) {
	        if (!this.keepAlive) {
	          this.waitingFor.$destroy();
	        }
	        this.waitingFor = null;
	      }
	      var child = this.childVM;
	      if (!child || this.keepAlive) {
	        if (child) {
	          // remove ref
	          child._inactive = true;
	          child._updateRef(true);
	        }
	        return;
	      }
	      // the sole purpose of `deferCleanup` is so that we can
	      // "deactivate" the vm right now and perform DOM removal
	      // later.
	      child.$destroy(false, defer);
	    },
	
	    /**
	     * Remove current destroyed child and manually do
	     * the cleanup after removal.
	     *
	     * @param {Function} cb
	     */
	
	    remove: function remove(child, cb) {
	      var keepAlive = this.keepAlive;
	      if (child) {
	        // we may have a component switch when a previous
	        // component is still being transitioned out.
	        // we want to trigger only one lastest insertion cb
	        // when the existing transition finishes. (#1119)
	        this.pendingRemovals++;
	        this.pendingRemovalCb = cb;
	        var self = this;
	        child.$remove(function () {
	          self.pendingRemovals--;
	          if (!keepAlive) child._cleanup();
	          if (!self.pendingRemovals && self.pendingRemovalCb) {
	            self.pendingRemovalCb();
	            self.pendingRemovalCb = null;
	          }
	        });
	      } else if (cb) {
	        cb();
	      }
	    },
	
	    /**
	     * Actually swap the components, depending on the
	     * transition mode. Defaults to simultaneous.
	     *
	     * @param {Vue} target
	     * @param {Function} [cb]
	     */
	
	    transition: function transition(target, cb) {
	      var self = this;
	      var current = this.childVM;
	      // for devtool inspection
	      if (current) current._inactive = true;
	      target._inactive = false;
	      this.childVM = target;
	      switch (self.params.transitionMode) {
	        case 'in-out':
	          target.$before(self.anchor, function () {
	            self.remove(current, cb);
	          });
	          break;
	        case 'out-in':
	          self.remove(current, function () {
	            target.$before(self.anchor, cb);
	          });
	          break;
	        default:
	          self.remove(current);
	          target.$before(self.anchor, cb);
	      }
	    },
	
	    /**
	     * Unbind.
	     */
	
	    unbind: function unbind() {
	      this.invalidatePending();
	      // Do not defer cleanup when unbinding
	      this.unbuild();
	      // destroy all keep-alive cached instances
	      if (this.cache) {
	        for (var key in this.cache) {
	          this.cache[key].$destroy();
	        }
	        this.cache = null;
	      }
	    }
	  };
	
	  /**
	   * Call activate hooks in order (asynchronous)
	   *
	   * @param {Array} hooks
	   * @param {Vue} vm
	   * @param {Function} cb
	   */
	
	  function callActivateHooks(hooks, vm, cb) {
	    var total = hooks.length;
	    var called = 0;
	    hooks[0].call(vm, next);
	    function next() {
	      if (++called >= total) {
	        cb();
	      } else {
	        hooks[called].call(vm, next);
	      }
	    }
	  }
	
	  var propBindingModes = config._propBindingModes;
	  var empty = {};
	
	  // regexes
	  var identRE$1 = /^[$_a-zA-Z]+[\w$]*$/;
	  var settablePathRE = /^[A-Za-z_$][\w$]*(\.[A-Za-z_$][\w$]*|\[[^\[\]]+\])*$/;
	
	  /**
	   * Compile props on a root element and return
	   * a props link function.
	   *
	   * @param {Element|DocumentFragment} el
	   * @param {Array} propOptions
	   * @param {Vue} vm
	   * @return {Function} propsLinkFn
	   */
	
	  function compileProps(el, propOptions, vm) {
	    var props = [];
	    var names = Object.keys(propOptions);
	    var i = names.length;
	    var options, name, attr, value, path, parsed, prop;
	    while (i--) {
	      name = names[i];
	      options = propOptions[name] || empty;
	
	      if ('development' !== 'production' && name === '$data') {
	        warn('Do not use $data as prop.', vm);
	        continue;
	      }
	
	      // props could contain dashes, which will be
	      // interpreted as minus calculations by the parser
	      // so we need to camelize the path here
	      path = camelize(name);
	      if (!identRE$1.test(path)) {
	        'development' !== 'production' && warn('Invalid prop key: "' + name + '". Prop keys ' + 'must be valid identifiers.', vm);
	        continue;
	      }
	
	      prop = {
	        name: name,
	        path: path,
	        options: options,
	        mode: propBindingModes.ONE_WAY,
	        raw: null
	      };
	
	      attr = hyphenate(name);
	      // first check dynamic version
	      if ((value = getBindAttr(el, attr)) === null) {
	        if ((value = getBindAttr(el, attr + '.sync')) !== null) {
	          prop.mode = propBindingModes.TWO_WAY;
	        } else if ((value = getBindAttr(el, attr + '.once')) !== null) {
	          prop.mode = propBindingModes.ONE_TIME;
	        }
	      }
	      if (value !== null) {
	        // has dynamic binding!
	        prop.raw = value;
	        parsed = parseDirective(value);
	        value = parsed.expression;
	        prop.filters = parsed.filters;
	        // check binding type
	        if (isLiteral(value) && !parsed.filters) {
	          // for expressions containing literal numbers and
	          // booleans, there's no need to setup a prop binding,
	          // so we can optimize them as a one-time set.
	          prop.optimizedLiteral = true;
	        } else {
	          prop.dynamic = true;
	          // check non-settable path for two-way bindings
	          if ('development' !== 'production' && prop.mode === propBindingModes.TWO_WAY && !settablePathRE.test(value)) {
	            prop.mode = propBindingModes.ONE_WAY;
	            warn('Cannot bind two-way prop with non-settable ' + 'parent path: ' + value, vm);
	          }
	        }
	        prop.parentPath = value;
	
	        // warn required two-way
	        if ('development' !== 'production' && options.twoWay && prop.mode !== propBindingModes.TWO_WAY) {
	          warn('Prop "' + name + '" expects a two-way binding type.', vm);
	        }
	      } else if ((value = getAttr(el, attr)) !== null) {
	        // has literal binding!
	        prop.raw = value;
	      } else if (true) {
	        // check possible camelCase prop usage
	        var lowerCaseName = path.toLowerCase();
	        value = /[A-Z\-]/.test(name) && (el.getAttribute(lowerCaseName) || el.getAttribute(':' + lowerCaseName) || el.getAttribute('v-bind:' + lowerCaseName) || el.getAttribute(':' + lowerCaseName + '.once') || el.getAttribute('v-bind:' + lowerCaseName + '.once') || el.getAttribute(':' + lowerCaseName + '.sync') || el.getAttribute('v-bind:' + lowerCaseName + '.sync'));
	        if (value) {
	          warn('Possible usage error for prop `' + lowerCaseName + '` - ' + 'did you mean `' + attr + '`? HTML is case-insensitive, remember to use ' + 'kebab-case for props in templates.', vm);
	        } else if (options.required) {
	          // warn missing required
	          warn('Missing required prop: ' + name, vm);
	        }
	      }
	      // push prop
	      props.push(prop);
	    }
	    return makePropsLinkFn(props);
	  }
	
	  /**
	   * Build a function that applies props to a vm.
	   *
	   * @param {Array} props
	   * @return {Function} propsLinkFn
	   */
	
	  function makePropsLinkFn(props) {
	    return function propsLinkFn(vm, scope) {
	      // store resolved props info
	      vm._props = {};
	      var inlineProps = vm.$options.propsData;
	      var i = props.length;
	      var prop, path, options, value, raw;
	      while (i--) {
	        prop = props[i];
	        raw = prop.raw;
	        path = prop.path;
	        options = prop.options;
	        vm._props[path] = prop;
	        if (inlineProps && hasOwn(inlineProps, path)) {
	          initProp(vm, prop, inlineProps[path]);
	        }if (raw === null) {
	          // initialize absent prop
	          initProp(vm, prop, undefined);
	        } else if (prop.dynamic) {
	          // dynamic prop
	          if (prop.mode === propBindingModes.ONE_TIME) {
	            // one time binding
	            value = (scope || vm._context || vm).$get(prop.parentPath);
	            initProp(vm, prop, value);
	          } else {
	            if (vm._context) {
	              // dynamic binding
	              vm._bindDir({
	                name: 'prop',
	                def: propDef,
	                prop: prop
	              }, null, null, scope); // el, host, scope
	            } else {
	                // root instance
	                initProp(vm, prop, vm.$get(prop.parentPath));
	              }
	          }
	        } else if (prop.optimizedLiteral) {
	          // optimized literal, cast it and just set once
	          var stripped = stripQuotes(raw);
	          value = stripped === raw ? toBoolean(toNumber(raw)) : stripped;
	          initProp(vm, prop, value);
	        } else {
	          // string literal, but we need to cater for
	          // Boolean props with no value, or with same
	          // literal value (e.g. disabled="disabled")
	          // see https://github.com/vuejs/vue-loader/issues/182
	          value = options.type === Boolean && (raw === '' || raw === hyphenate(prop.name)) ? true : raw;
	          initProp(vm, prop, value);
	        }
	      }
	    };
	  }
	
	  /**
	   * Process a prop with a rawValue, applying necessary coersions,
	   * default values & assertions and call the given callback with
	   * processed value.
	   *
	   * @param {Vue} vm
	   * @param {Object} prop
	   * @param {*} rawValue
	   * @param {Function} fn
	   */
	
	  function processPropValue(vm, prop, rawValue, fn) {
	    var isSimple = prop.dynamic && isSimplePath(prop.parentPath);
	    var value = rawValue;
	    if (value === undefined) {
	      value = getPropDefaultValue(vm, prop);
	    }
	    value = coerceProp(prop, value);
	    var coerced = value !== rawValue;
	    if (!assertProp(prop, value, vm)) {
	      value = undefined;
	    }
	    if (isSimple && !coerced) {
	      withoutConversion(function () {
	        fn(value);
	      });
	    } else {
	      fn(value);
	    }
	  }
	
	  /**
	   * Set a prop's initial value on a vm and its data object.
	   *
	   * @param {Vue} vm
	   * @param {Object} prop
	   * @param {*} value
	   */
	
	  function initProp(vm, prop, value) {
	    processPropValue(vm, prop, value, function (value) {
	      defineReactive(vm, prop.path, value);
	    });
	  }
	
	  /**
	   * Update a prop's value on a vm.
	   *
	   * @param {Vue} vm
	   * @param {Object} prop
	   * @param {*} value
	   */
	
	  function updateProp(vm, prop, value) {
	    processPropValue(vm, prop, value, function (value) {
	      vm[prop.path] = value;
	    });
	  }
	
	  /**
	   * Get the default value of a prop.
	   *
	   * @param {Vue} vm
	   * @param {Object} prop
	   * @return {*}
	   */
	
	  function getPropDefaultValue(vm, prop) {
	    // no default, return undefined
	    var options = prop.options;
	    if (!hasOwn(options, 'default')) {
	      // absent boolean value defaults to false
	      return options.type === Boolean ? false : undefined;
	    }
	    var def = options['default'];
	    // warn against non-factory defaults for Object & Array
	    if (isObject(def)) {
	      'development' !== 'production' && warn('Invalid default value for prop "' + prop.name + '": ' + 'Props with type Object/Array must use a factory function ' + 'to return the default value.', vm);
	    }
	    // call factory function for non-Function types
	    return typeof def === 'function' && options.type !== Function ? def.call(vm) : def;
	  }
	
	  /**
	   * Assert whether a prop is valid.
	   *
	   * @param {Object} prop
	   * @param {*} value
	   * @param {Vue} vm
	   */
	
	  function assertProp(prop, value, vm) {
	    if (!prop.options.required && ( // non-required
	    prop.raw === null || // abscent
	    value == null) // null or undefined
	    ) {
	        return true;
	      }
	    var options = prop.options;
	    var type = options.type;
	    var valid = !type;
	    var expectedTypes = [];
	    if (type) {
	      if (!isArray(type)) {
	        type = [type];
	      }
	      for (var i = 0; i < type.length && !valid; i++) {
	        var assertedType = assertType(value, type[i]);
	        expectedTypes.push(assertedType.expectedType);
	        valid = assertedType.valid;
	      }
	    }
	    if (!valid) {
	      if (true) {
	        warn('Invalid prop: type check failed for prop "' + prop.name + '".' + ' Expected ' + expectedTypes.map(formatType).join(', ') + ', got ' + formatValue(value) + '.', vm);
	      }
	      return false;
	    }
	    var validator = options.validator;
	    if (validator) {
	      if (!validator(value)) {
	        'development' !== 'production' && warn('Invalid prop: custom validator check failed for prop "' + prop.name + '".', vm);
	        return false;
	      }
	    }
	    return true;
	  }
	
	  /**
	   * Force parsing value with coerce option.
	   *
	   * @param {*} value
	   * @param {Object} options
	   * @return {*}
	   */
	
	  function coerceProp(prop, value) {
	    var coerce = prop.options.coerce;
	    if (!coerce) {
	      return value;
	    }
	    // coerce is a function
	    return coerce(value);
	  }
	
	  /**
	   * Assert the type of a value
	   *
	   * @param {*} value
	   * @param {Function} type
	   * @return {Object}
	   */
	
	  function assertType(value, type) {
	    var valid;
	    var expectedType;
	    if (type === String) {
	      expectedType = 'string';
	      valid = typeof value === expectedType;
	    } else if (type === Number) {
	      expectedType = 'number';
	      valid = typeof value === expectedType;
	    } else if (type === Boolean) {
	      expectedType = 'boolean';
	      valid = typeof value === expectedType;
	    } else if (type === Function) {
	      expectedType = 'function';
	      valid = typeof value === expectedType;
	    } else if (type === Object) {
	      expectedType = 'object';
	      valid = isPlainObject(value);
	    } else if (type === Array) {
	      expectedType = 'array';
	      valid = isArray(value);
	    } else {
	      valid = value instanceof type;
	    }
	    return {
	      valid: valid,
	      expectedType: expectedType
	    };
	  }
	
	  /**
	   * Format type for output
	   *
	   * @param {String} type
	   * @return {String}
	   */
	
	  function formatType(type) {
	    return type ? type.charAt(0).toUpperCase() + type.slice(1) : 'custom type';
	  }
	
	  /**
	   * Format value
	   *
	   * @param {*} value
	   * @return {String}
	   */
	
	  function formatValue(val) {
	    return Object.prototype.toString.call(val).slice(8, -1);
	  }
	
	  var bindingModes = config._propBindingModes;
	
	  var propDef = {
	
	    bind: function bind() {
	      var child = this.vm;
	      var parent = child._context;
	      // passed in from compiler directly
	      var prop = this.descriptor.prop;
	      var childKey = prop.path;
	      var parentKey = prop.parentPath;
	      var twoWay = prop.mode === bindingModes.TWO_WAY;
	
	      var parentWatcher = this.parentWatcher = new Watcher(parent, parentKey, function (val) {
	        updateProp(child, prop, val);
	      }, {
	        twoWay: twoWay,
	        filters: prop.filters,
	        // important: props need to be observed on the
	        // v-for scope if present
	        scope: this._scope
	      });
	
	      // set the child initial value.
	      initProp(child, prop, parentWatcher.value);
	
	      // setup two-way binding
	      if (twoWay) {
	        // important: defer the child watcher creation until
	        // the created hook (after data observation)
	        var self = this;
	        child.$once('pre-hook:created', function () {
	          self.childWatcher = new Watcher(child, childKey, function (val) {
	            parentWatcher.set(val);
	          }, {
	            // ensure sync upward before parent sync down.
	            // this is necessary in cases e.g. the child
	            // mutates a prop array, then replaces it. (#1683)
	            sync: true
	          });
	        });
	      }
	    },
	
	    unbind: function unbind() {
	      this.parentWatcher.teardown();
	      if (this.childWatcher) {
	        this.childWatcher.teardown();
	      }
	    }
	  };
	
	  var queue$1 = [];
	  var queued = false;
	
	  /**
	   * Push a job into the queue.
	   *
	   * @param {Function} job
	   */
	
	  function pushJob(job) {
	    queue$1.push(job);
	    if (!queued) {
	      queued = true;
	      nextTick(flush);
	    }
	  }
	
	  /**
	   * Flush the queue, and do one forced reflow before
	   * triggering transitions.
	   */
	
	  function flush() {
	    // Force layout
	    var f = document.documentElement.offsetHeight;
	    for (var i = 0; i < queue$1.length; i++) {
	      queue$1[i]();
	    }
	    queue$1 = [];
	    queued = false;
	    // dummy return, so js linters don't complain about
	    // unused variable f
	    return f;
	  }
	
	  var TYPE_TRANSITION = 'transition';
	  var TYPE_ANIMATION = 'animation';
	  var transDurationProp = transitionProp + 'Duration';
	  var animDurationProp = animationProp + 'Duration';
	
	  /**
	   * If a just-entered element is applied the
	   * leave class while its enter transition hasn't started yet,
	   * and the transitioned property has the same value for both
	   * enter/leave, then the leave transition will be skipped and
	   * the transitionend event never fires. This function ensures
	   * its callback to be called after a transition has started
	   * by waiting for double raf.
	   *
	   * It falls back to setTimeout on devices that support CSS
	   * transitions but not raf (e.g. Android 4.2 browser) - since
	   * these environments are usually slow, we are giving it a
	   * relatively large timeout.
	   */
	
	  var raf = inBrowser && window.requestAnimationFrame;
	  var waitForTransitionStart = raf
	  /* istanbul ignore next */
	  ? function (fn) {
	    raf(function () {
	      raf(fn);
	    });
	  } : function (fn) {
	    setTimeout(fn, 50);
	  };
	
	  /**
	   * A Transition object that encapsulates the state and logic
	   * of the transition.
	   *
	   * @param {Element} el
	   * @param {String} id
	   * @param {Object} hooks
	   * @param {Vue} vm
	   */
	  function Transition(el, id, hooks, vm) {
	    this.id = id;
	    this.el = el;
	    this.enterClass = hooks && hooks.enterClass || id + '-enter';
	    this.leaveClass = hooks && hooks.leaveClass || id + '-leave';
	    this.hooks = hooks;
	    this.vm = vm;
	    // async state
	    this.pendingCssEvent = this.pendingCssCb = this.cancel = this.pendingJsCb = this.op = this.cb = null;
	    this.justEntered = false;
	    this.entered = this.left = false;
	    this.typeCache = {};
	    // check css transition type
	    this.type = hooks && hooks.type;
	    /* istanbul ignore if */
	    if (true) {
	      if (this.type && this.type !== TYPE_TRANSITION && this.type !== TYPE_ANIMATION) {
	        warn('invalid CSS transition type for transition="' + this.id + '": ' + this.type, vm);
	      }
	    }
	    // bind
	    var self = this;['enterNextTick', 'enterDone', 'leaveNextTick', 'leaveDone'].forEach(function (m) {
	      self[m] = bind(self[m], self);
	    });
	  }
	
	  var p$1 = Transition.prototype;
	
	  /**
	   * Start an entering transition.
	   *
	   * 1. enter transition triggered
	   * 2. call beforeEnter hook
	   * 3. add enter class
	   * 4. insert/show element
	   * 5. call enter hook (with possible explicit js callback)
	   * 6. reflow
	   * 7. based on transition type:
	   *    - transition:
	   *        remove class now, wait for transitionend,
	   *        then done if there's no explicit js callback.
	   *    - animation:
	   *        wait for animationend, remove class,
	   *        then done if there's no explicit js callback.
	   *    - no css transition:
	   *        done now if there's no explicit js callback.
	   * 8. wait for either done or js callback, then call
	   *    afterEnter hook.
	   *
	   * @param {Function} op - insert/show the element
	   * @param {Function} [cb]
	   */
	
	  p$1.enter = function (op, cb) {
	    this.cancelPending();
	    this.callHook('beforeEnter');
	    this.cb = cb;
	    addClass(this.el, this.enterClass);
	    op();
	    this.entered = false;
	    this.callHookWithCb('enter');
	    if (this.entered) {
	      return; // user called done synchronously.
	    }
	    this.cancel = this.hooks && this.hooks.enterCancelled;
	    pushJob(this.enterNextTick);
	  };
	
	  /**
	   * The "nextTick" phase of an entering transition, which is
	   * to be pushed into a queue and executed after a reflow so
	   * that removing the class can trigger a CSS transition.
	   */
	
	  p$1.enterNextTick = function () {
	    var _this = this;
	
	    // prevent transition skipping
	    this.justEntered = true;
	    waitForTransitionStart(function () {
	      _this.justEntered = false;
	    });
	    var enterDone = this.enterDone;
	    var type = this.getCssTransitionType(this.enterClass);
	    if (!this.pendingJsCb) {
	      if (type === TYPE_TRANSITION) {
	        // trigger transition by removing enter class now
	        removeClass(this.el, this.enterClass);
	        this.setupCssCb(transitionEndEvent, enterDone);
	      } else if (type === TYPE_ANIMATION) {
	        this.setupCssCb(animationEndEvent, enterDone);
	      } else {
	        enterDone();
	      }
	    } else if (type === TYPE_TRANSITION) {
	      removeClass(this.el, this.enterClass);
	    }
	  };
	
	  /**
	   * The "cleanup" phase of an entering transition.
	   */
	
	  p$1.enterDone = function () {
	    this.entered = true;
	    this.cancel = this.pendingJsCb = null;
	    removeClass(this.el, this.enterClass);
	    this.callHook('afterEnter');
	    if (this.cb) this.cb();
	  };
	
	  /**
	   * Start a leaving transition.
	   *
	   * 1. leave transition triggered.
	   * 2. call beforeLeave hook
	   * 3. add leave class (trigger css transition)
	   * 4. call leave hook (with possible explicit js callback)
	   * 5. reflow if no explicit js callback is provided
	   * 6. based on transition type:
	   *    - transition or animation:
	   *        wait for end event, remove class, then done if
	   *        there's no explicit js callback.
	   *    - no css transition:
	   *        done if there's no explicit js callback.
	   * 7. wait for either done or js callback, then call
	   *    afterLeave hook.
	   *
	   * @param {Function} op - remove/hide the element
	   * @param {Function} [cb]
	   */
	
	  p$1.leave = function (op, cb) {
	    this.cancelPending();
	    this.callHook('beforeLeave');
	    this.op = op;
	    this.cb = cb;
	    addClass(this.el, this.leaveClass);
	    this.left = false;
	    this.callHookWithCb('leave');
	    if (this.left) {
	      return; // user called done synchronously.
	    }
	    this.cancel = this.hooks && this.hooks.leaveCancelled;
	    // only need to handle leaveDone if
	    // 1. the transition is already done (synchronously called
	    //    by the user, which causes this.op set to null)
	    // 2. there's no explicit js callback
	    if (this.op && !this.pendingJsCb) {
	      // if a CSS transition leaves immediately after enter,
	      // the transitionend event never fires. therefore we
	      // detect such cases and end the leave immediately.
	      if (this.justEntered) {
	        this.leaveDone();
	      } else {
	        pushJob(this.leaveNextTick);
	      }
	    }
	  };
	
	  /**
	   * The "nextTick" phase of a leaving transition.
	   */
	
	  p$1.leaveNextTick = function () {
	    var type = this.getCssTransitionType(this.leaveClass);
	    if (type) {
	      var event = type === TYPE_TRANSITION ? transitionEndEvent : animationEndEvent;
	      this.setupCssCb(event, this.leaveDone);
	    } else {
	      this.leaveDone();
	    }
	  };
	
	  /**
	   * The "cleanup" phase of a leaving transition.
	   */
	
	  p$1.leaveDone = function () {
	    this.left = true;
	    this.cancel = this.pendingJsCb = null;
	    this.op();
	    removeClass(this.el, this.leaveClass);
	    this.callHook('afterLeave');
	    if (this.cb) this.cb();
	    this.op = null;
	  };
	
	  /**
	   * Cancel any pending callbacks from a previously running
	   * but not finished transition.
	   */
	
	  p$1.cancelPending = function () {
	    this.op = this.cb = null;
	    var hasPending = false;
	    if (this.pendingCssCb) {
	      hasPending = true;
	      off(this.el, this.pendingCssEvent, this.pendingCssCb);
	      this.pendingCssEvent = this.pendingCssCb = null;
	    }
	    if (this.pendingJsCb) {
	      hasPending = true;
	      this.pendingJsCb.cancel();
	      this.pendingJsCb = null;
	    }
	    if (hasPending) {
	      removeClass(this.el, this.enterClass);
	      removeClass(this.el, this.leaveClass);
	    }
	    if (this.cancel) {
	      this.cancel.call(this.vm, this.el);
	      this.cancel = null;
	    }
	  };
	
	  /**
	   * Call a user-provided synchronous hook function.
	   *
	   * @param {String} type
	   */
	
	  p$1.callHook = function (type) {
	    if (this.hooks && this.hooks[type]) {
	      this.hooks[type].call(this.vm, this.el);
	    }
	  };
	
	  /**
	   * Call a user-provided, potentially-async hook function.
	   * We check for the length of arguments to see if the hook
	   * expects a `done` callback. If true, the transition's end
	   * will be determined by when the user calls that callback;
	   * otherwise, the end is determined by the CSS transition or
	   * animation.
	   *
	   * @param {String} type
	   */
	
	  p$1.callHookWithCb = function (type) {
	    var hook = this.hooks && this.hooks[type];
	    if (hook) {
	      if (hook.length > 1) {
	        this.pendingJsCb = cancellable(this[type + 'Done']);
	      }
	      hook.call(this.vm, this.el, this.pendingJsCb);
	    }
	  };
	
	  /**
	   * Get an element's transition type based on the
	   * calculated styles.
	   *
	   * @param {String} className
	   * @return {Number}
	   */
	
	  p$1.getCssTransitionType = function (className) {
	    /* istanbul ignore if */
	    if (!transitionEndEvent ||
	    // skip CSS transitions if page is not visible -
	    // this solves the issue of transitionend events not
	    // firing until the page is visible again.
	    // pageVisibility API is supported in IE10+, same as
	    // CSS transitions.
	    document.hidden ||
	    // explicit js-only transition
	    this.hooks && this.hooks.css === false ||
	    // element is hidden
	    isHidden(this.el)) {
	      return;
	    }
	    var type = this.type || this.typeCache[className];
	    if (type) return type;
	    var inlineStyles = this.el.style;
	    var computedStyles = window.getComputedStyle(this.el);
	    var transDuration = inlineStyles[transDurationProp] || computedStyles[transDurationProp];
	    if (transDuration && transDuration !== '0s') {
	      type = TYPE_TRANSITION;
	    } else {
	      var animDuration = inlineStyles[animDurationProp] || computedStyles[animDurationProp];
	      if (animDuration && animDuration !== '0s') {
	        type = TYPE_ANIMATION;
	      }
	    }
	    if (type) {
	      this.typeCache[className] = type;
	    }
	    return type;
	  };
	
	  /**
	   * Setup a CSS transitionend/animationend callback.
	   *
	   * @param {String} event
	   * @param {Function} cb
	   */
	
	  p$1.setupCssCb = function (event, cb) {
	    this.pendingCssEvent = event;
	    var self = this;
	    var el = this.el;
	    var onEnd = this.pendingCssCb = function (e) {
	      if (e.target === el) {
	        off(el, event, onEnd);
	        self.pendingCssEvent = self.pendingCssCb = null;
	        if (!self.pendingJsCb && cb) {
	          cb();
	        }
	      }
	    };
	    on(el, event, onEnd);
	  };
	
	  /**
	   * Check if an element is hidden - in that case we can just
	   * skip the transition alltogether.
	   *
	   * @param {Element} el
	   * @return {Boolean}
	   */
	
	  function isHidden(el) {
	    if (/svg$/.test(el.namespaceURI)) {
	      // SVG elements do not have offset(Width|Height)
	      // so we need to check the client rect
	      var rect = el.getBoundingClientRect();
	      return !(rect.width || rect.height);
	    } else {
	      return !(el.offsetWidth || el.offsetHeight || el.getClientRects().length);
	    }
	  }
	
	  var transition$1 = {
	
	    priority: TRANSITION,
	
	    update: function update(id, oldId) {
	      var el = this.el;
	      // resolve on owner vm
	      var hooks = resolveAsset(this.vm.$options, 'transitions', id);
	      id = id || 'v';
	      el.__v_trans = new Transition(el, id, hooks, this.vm);
	      if (oldId) {
	        removeClass(el, oldId + '-transition');
	      }
	      addClass(el, id + '-transition');
	    }
	  };
	
	  var internalDirectives = {
	    style: style,
	    'class': vClass,
	    component: component,
	    prop: propDef,
	    transition: transition$1
	  };
	
	  // special binding prefixes
	  var bindRE = /^v-bind:|^:/;
	  var onRE = /^v-on:|^@/;
	  var dirAttrRE = /^v-([^:]+)(?:$|:(.*)$)/;
	  var modifierRE = /\.[^\.]+/g;
	  var transitionRE = /^(v-bind:|:)?transition$/;
	
	  // default directive priority
	  var DEFAULT_PRIORITY = 1000;
	  var DEFAULT_TERMINAL_PRIORITY = 2000;
	
	  /**
	   * Compile a template and return a reusable composite link
	   * function, which recursively contains more link functions
	   * inside. This top level compile function would normally
	   * be called on instance root nodes, but can also be used
	   * for partial compilation if the partial argument is true.
	   *
	   * The returned composite link function, when called, will
	   * return an unlink function that tearsdown all directives
	   * created during the linking phase.
	   *
	   * @param {Element|DocumentFragment} el
	   * @param {Object} options
	   * @param {Boolean} partial
	   * @return {Function}
	   */
	
	  function compile(el, options, partial) {
	    // link function for the node itself.
	    var nodeLinkFn = partial || !options._asComponent ? compileNode(el, options) : null;
	    // link function for the childNodes
	    var childLinkFn = !(nodeLinkFn && nodeLinkFn.terminal) && !isScript(el) && el.hasChildNodes() ? compileNodeList(el.childNodes, options) : null;
	
	    /**
	     * A composite linker function to be called on a already
	     * compiled piece of DOM, which instantiates all directive
	     * instances.
	     *
	     * @param {Vue} vm
	     * @param {Element|DocumentFragment} el
	     * @param {Vue} [host] - host vm of transcluded content
	     * @param {Object} [scope] - v-for scope
	     * @param {Fragment} [frag] - link context fragment
	     * @return {Function|undefined}
	     */
	
	    return function compositeLinkFn(vm, el, host, scope, frag) {
	      // cache childNodes before linking parent, fix #657
	      var childNodes = toArray(el.childNodes);
	      // link
	      var dirs = linkAndCapture(function compositeLinkCapturer() {
	        if (nodeLinkFn) nodeLinkFn(vm, el, host, scope, frag);
	        if (childLinkFn) childLinkFn(vm, childNodes, host, scope, frag);
	      }, vm);
	      return makeUnlinkFn(vm, dirs);
	    };
	  }
	
	  /**
	   * Apply a linker to a vm/element pair and capture the
	   * directives created during the process.
	   *
	   * @param {Function} linker
	   * @param {Vue} vm
	   */
	
	  function linkAndCapture(linker, vm) {
	    /* istanbul ignore if */
	    if (false) {}
	    var originalDirCount = vm._directives.length;
	    linker();
	    var dirs = vm._directives.slice(originalDirCount);
	    dirs.sort(directiveComparator);
	    for (var i = 0, l = dirs.length; i < l; i++) {
	      dirs[i]._bind();
	    }
	    return dirs;
	  }
	
	  /**
	   * Directive priority sort comparator
	   *
	   * @param {Object} a
	   * @param {Object} b
	   */
	
	  function directiveComparator(a, b) {
	    a = a.descriptor.def.priority || DEFAULT_PRIORITY;
	    b = b.descriptor.def.priority || DEFAULT_PRIORITY;
	    return a > b ? -1 : a === b ? 0 : 1;
	  }
	
	  /**
	   * Linker functions return an unlink function that
	   * tearsdown all directives instances generated during
	   * the process.
	   *
	   * We create unlink functions with only the necessary
	   * information to avoid retaining additional closures.
	   *
	   * @param {Vue} vm
	   * @param {Array} dirs
	   * @param {Vue} [context]
	   * @param {Array} [contextDirs]
	   * @return {Function}
	   */
	
	  function makeUnlinkFn(vm, dirs, context, contextDirs) {
	    function unlink(destroying) {
	      teardownDirs(vm, dirs, destroying);
	      if (context && contextDirs) {
	        teardownDirs(context, contextDirs);
	      }
	    }
	    // expose linked directives
	    unlink.dirs = dirs;
	    return unlink;
	  }
	
	  /**
	   * Teardown partial linked directives.
	   *
	   * @param {Vue} vm
	   * @param {Array} dirs
	   * @param {Boolean} destroying
	   */
	
	  function teardownDirs(vm, dirs, destroying) {
	    var i = dirs.length;
	    while (i--) {
	      dirs[i]._teardown();
	      if ('development' !== 'production' && !destroying) {
	        vm._directives.$remove(dirs[i]);
	      }
	    }
	  }
	
	  /**
	   * Compile link props on an instance.
	   *
	   * @param {Vue} vm
	   * @param {Element} el
	   * @param {Object} props
	   * @param {Object} [scope]
	   * @return {Function}
	   */
	
	  function compileAndLinkProps(vm, el, props, scope) {
	    var propsLinkFn = compileProps(el, props, vm);
	    var propDirs = linkAndCapture(function () {
	      propsLinkFn(vm, scope);
	    }, vm);
	    return makeUnlinkFn(vm, propDirs);
	  }
	
	  /**
	   * Compile the root element of an instance.
	   *
	   * 1. attrs on context container (context scope)
	   * 2. attrs on the component template root node, if
	   *    replace:true (child scope)
	   *
	   * If this is a fragment instance, we only need to compile 1.
	   *
	   * @param {Element} el
	   * @param {Object} options
	   * @param {Object} contextOptions
	   * @return {Function}
	   */
	
	  function compileRoot(el, options, contextOptions) {
	    var containerAttrs = options._containerAttrs;
	    var replacerAttrs = options._replacerAttrs;
	    var contextLinkFn, replacerLinkFn;
	
	    // only need to compile other attributes for
	    // non-fragment instances
	    if (el.nodeType !== 11) {
	      // for components, container and replacer need to be
	      // compiled separately and linked in different scopes.
	      if (options._asComponent) {
	        // 2. container attributes
	        if (containerAttrs && contextOptions) {
	          contextLinkFn = compileDirectives(containerAttrs, contextOptions);
	        }
	        if (replacerAttrs) {
	          // 3. replacer attributes
	          replacerLinkFn = compileDirectives(replacerAttrs, options);
	        }
	      } else {
	        // non-component, just compile as a normal element.
	        replacerLinkFn = compileDirectives(el.attributes, options);
	      }
	    } else if ('development' !== 'production' && containerAttrs) {
	      // warn container directives for fragment instances
	      var names = containerAttrs.filter(function (attr) {
	        // allow vue-loader/vueify scoped css attributes
	        return attr.name.indexOf('_v-') < 0 &&
	        // allow event listeners
	        !onRE.test(attr.name) &&
	        // allow slots
	        attr.name !== 'slot';
	      }).map(function (attr) {
	        return '"' + attr.name + '"';
	      });
	      if (names.length) {
	        var plural = names.length > 1;
	        warn('Attribute' + (plural ? 's ' : ' ') + names.join(', ') + (plural ? ' are' : ' is') + ' ignored on component ' + '<' + options.el.tagName.toLowerCase() + '> because ' + 'the component is a fragment instance: ' + 'http://vuejs.org/guide/components.html#Fragment-Instance');
	      }
	    }
	
	    options._containerAttrs = options._replacerAttrs = null;
	    return function rootLinkFn(vm, el, scope) {
	      // link context scope dirs
	      var context = vm._context;
	      var contextDirs;
	      if (context && contextLinkFn) {
	        contextDirs = linkAndCapture(function () {
	          contextLinkFn(context, el, null, scope);
	        }, context);
	      }
	
	      // link self
	      var selfDirs = linkAndCapture(function () {
	        if (replacerLinkFn) replacerLinkFn(vm, el);
	      }, vm);
	
	      // return the unlink function that tearsdown context
	      // container directives.
	      return makeUnlinkFn(vm, selfDirs, context, contextDirs);
	    };
	  }
	
	  /**
	   * Compile a node and return a nodeLinkFn based on the
	   * node type.
	   *
	   * @param {Node} node
	   * @param {Object} options
	   * @return {Function|null}
	   */
	
	  function compileNode(node, options) {
	    var type = node.nodeType;
	    if (type === 1 && !isScript(node)) {
	      return compileElement(node, options);
	    } else if (type === 3 && node.data.trim()) {
	      return compileTextNode(node, options);
	    } else {
	      return null;
	    }
	  }
	
	  /**
	   * Compile an element and return a nodeLinkFn.
	   *
	   * @param {Element} el
	   * @param {Object} options
	   * @return {Function|null}
	   */
	
	  function compileElement(el, options) {
	    // preprocess textareas.
	    // textarea treats its text content as the initial value.
	    // just bind it as an attr directive for value.
	    if (el.tagName === 'TEXTAREA') {
	      var tokens = parseText(el.value);
	      if (tokens) {
	        el.setAttribute(':value', tokensToExp(tokens));
	        el.value = '';
	      }
	    }
	    var linkFn;
	    var hasAttrs = el.hasAttributes();
	    var attrs = hasAttrs && toArray(el.attributes);
	    // check terminal directives (for & if)
	    if (hasAttrs) {
	      linkFn = checkTerminalDirectives(el, attrs, options);
	    }
	    // check element directives
	    if (!linkFn) {
	      linkFn = checkElementDirectives(el, options);
	    }
	    // check component
	    if (!linkFn) {
	      linkFn = checkComponent(el, options);
	    }
	    // normal directives
	    if (!linkFn && hasAttrs) {
	      linkFn = compileDirectives(attrs, options);
	    }
	    return linkFn;
	  }
	
	  /**
	   * Compile a textNode and return a nodeLinkFn.
	   *
	   * @param {TextNode} node
	   * @param {Object} options
	   * @return {Function|null} textNodeLinkFn
	   */
	
	  function compileTextNode(node, options) {
	    // skip marked text nodes
	    if (node._skip) {
	      return removeText;
	    }
	
	    var tokens = parseText(node.wholeText);
	    if (!tokens) {
	      return null;
	    }
	
	    // mark adjacent text nodes as skipped,
	    // because we are using node.wholeText to compile
	    // all adjacent text nodes together. This fixes
	    // issues in IE where sometimes it splits up a single
	    // text node into multiple ones.
	    var next = node.nextSibling;
	    while (next && next.nodeType === 3) {
	      next._skip = true;
	      next = next.nextSibling;
	    }
	
	    var frag = document.createDocumentFragment();
	    var el, token;
	    for (var i = 0, l = tokens.length; i < l; i++) {
	      token = tokens[i];
	      el = token.tag ? processTextToken(token, options) : document.createTextNode(token.value);
	      frag.appendChild(el);
	    }
	    return makeTextNodeLinkFn(tokens, frag, options);
	  }
	
	  /**
	   * Linker for an skipped text node.
	   *
	   * @param {Vue} vm
	   * @param {Text} node
	   */
	
	  function removeText(vm, node) {
	    remove(node);
	  }
	
	  /**
	   * Process a single text token.
	   *
	   * @param {Object} token
	   * @param {Object} options
	   * @return {Node}
	   */
	
	  function processTextToken(token, options) {
	    var el;
	    if (token.oneTime) {
	      el = document.createTextNode(token.value);
	    } else {
	      if (token.html) {
	        el = document.createComment('v-html');
	        setTokenType('html');
	      } else {
	        // IE will clean up empty textNodes during
	        // frag.cloneNode(true), so we have to give it
	        // something here...
	        el = document.createTextNode(' ');
	        setTokenType('text');
	      }
	    }
	    function setTokenType(type) {
	      if (token.descriptor) return;
	      var parsed = parseDirective(token.value);
	      token.descriptor = {
	        name: type,
	        def: directives[type],
	        expression: parsed.expression,
	        filters: parsed.filters
	      };
	    }
	    return el;
	  }
	
	  /**
	   * Build a function that processes a textNode.
	   *
	   * @param {Array<Object>} tokens
	   * @param {DocumentFragment} frag
	   */
	
	  function makeTextNodeLinkFn(tokens, frag) {
	    return function textNodeLinkFn(vm, el, host, scope) {
	      var fragClone = frag.cloneNode(true);
	      var childNodes = toArray(fragClone.childNodes);
	      var token, value, node;
	      for (var i = 0, l = tokens.length; i < l; i++) {
	        token = tokens[i];
	        value = token.value;
	        if (token.tag) {
	          node = childNodes[i];
	          if (token.oneTime) {
	            value = (scope || vm).$eval(value);
	            if (token.html) {
	              replace(node, parseTemplate(value, true));
	            } else {
	              node.data = value;
	            }
	          } else {
	            vm._bindDir(token.descriptor, node, host, scope);
	          }
	        }
	      }
	      replace(el, fragClone);
	    };
	  }
	
	  /**
	   * Compile a node list and return a childLinkFn.
	   *
	   * @param {NodeList} nodeList
	   * @param {Object} options
	   * @return {Function|undefined}
	   */
	
	  function compileNodeList(nodeList, options) {
	    var linkFns = [];
	    var nodeLinkFn, childLinkFn, node;
	    for (var i = 0, l = nodeList.length; i < l; i++) {
	      node = nodeList[i];
	      nodeLinkFn = compileNode(node, options);
	      childLinkFn = !(nodeLinkFn && nodeLinkFn.terminal) && node.tagName !== 'SCRIPT' && node.hasChildNodes() ? compileNodeList(node.childNodes, options) : null;
	      linkFns.push(nodeLinkFn, childLinkFn);
	    }
	    return linkFns.length ? makeChildLinkFn(linkFns) : null;
	  }
	
	  /**
	   * Make a child link function for a node's childNodes.
	   *
	   * @param {Array<Function>} linkFns
	   * @return {Function} childLinkFn
	   */
	
	  function makeChildLinkFn(linkFns) {
	    return function childLinkFn(vm, nodes, host, scope, frag) {
	      var node, nodeLinkFn, childrenLinkFn;
	      for (var i = 0, n = 0, l = linkFns.length; i < l; n++) {
	        node = nodes[n];
	        nodeLinkFn = linkFns[i++];
	        childrenLinkFn = linkFns[i++];
	        // cache childNodes before linking parent, fix #657
	        var childNodes = toArray(node.childNodes);
	        if (nodeLinkFn) {
	          nodeLinkFn(vm, node, host, scope, frag);
	        }
	        if (childrenLinkFn) {
	          childrenLinkFn(vm, childNodes, host, scope, frag);
	        }
	      }
	    };
	  }
	
	  /**
	   * Check for element directives (custom elements that should
	   * be resovled as terminal directives).
	   *
	   * @param {Element} el
	   * @param {Object} options
	   */
	
	  function checkElementDirectives(el, options) {
	    var tag = el.tagName.toLowerCase();
	    if (commonTagRE.test(tag)) {
	      return;
	    }
	    var def = resolveAsset(options, 'elementDirectives', tag);
	    if (def) {
	      return makeTerminalNodeLinkFn(el, tag, '', options, def);
	    }
	  }
	
	  /**
	   * Check if an element is a component. If yes, return
	   * a component link function.
	   *
	   * @param {Element} el
	   * @param {Object} options
	   * @return {Function|undefined}
	   */
	
	  function checkComponent(el, options) {
	    var component = checkComponentAttr(el, options);
	    if (component) {
	      var ref = findRef(el);
	      var descriptor = {
	        name: 'component',
	        ref: ref,
	        expression: component.id,
	        def: internalDirectives.component,
	        modifiers: {
	          literal: !component.dynamic
	        }
	      };
	      var componentLinkFn = function componentLinkFn(vm, el, host, scope, frag) {
	        if (ref) {
	          defineReactive((scope || vm).$refs, ref, null);
	        }
	        vm._bindDir(descriptor, el, host, scope, frag);
	      };
	      componentLinkFn.terminal = true;
	      return componentLinkFn;
	    }
	  }
	
	  /**
	   * Check an element for terminal directives in fixed order.
	   * If it finds one, return a terminal link function.
	   *
	   * @param {Element} el
	   * @param {Array} attrs
	   * @param {Object} options
	   * @return {Function} terminalLinkFn
	   */
	
	  function checkTerminalDirectives(el, attrs, options) {
	    // skip v-pre
	    if (getAttr(el, 'v-pre') !== null) {
	      return skip;
	    }
	    // skip v-else block, but only if following v-if
	    if (el.hasAttribute('v-else')) {
	      var prev = el.previousElementSibling;
	      if (prev && prev.hasAttribute('v-if')) {
	        return skip;
	      }
	    }
	
	    var attr, name, value, modifiers, matched, dirName, rawName, arg, def, termDef;
	    for (var i = 0, j = attrs.length; i < j; i++) {
	      attr = attrs[i];
	      name = attr.name.replace(modifierRE, '');
	      if (matched = name.match(dirAttrRE)) {
	        def = resolveAsset(options, 'directives', matched[1]);
	        if (def && def.terminal) {
	          if (!termDef || (def.priority || DEFAULT_TERMINAL_PRIORITY) > termDef.priority) {
	            termDef = def;
	            rawName = attr.name;
	            modifiers = parseModifiers(attr.name);
	            value = attr.value;
	            dirName = matched[1];
	            arg = matched[2];
	          }
	        }
	      }
	    }
	
	    if (termDef) {
	      return makeTerminalNodeLinkFn(el, dirName, value, options, termDef, rawName, arg, modifiers);
	    }
	  }
	
	  function skip() {}
	  skip.terminal = true;
	
	  /**
	   * Build a node link function for a terminal directive.
	   * A terminal link function terminates the current
	   * compilation recursion and handles compilation of the
	   * subtree in the directive.
	   *
	   * @param {Element} el
	   * @param {String} dirName
	   * @param {String} value
	   * @param {Object} options
	   * @param {Object} def
	   * @param {String} [rawName]
	   * @param {String} [arg]
	   * @param {Object} [modifiers]
	   * @return {Function} terminalLinkFn
	   */
	
	  function makeTerminalNodeLinkFn(el, dirName, value, options, def, rawName, arg, modifiers) {
	    var parsed = parseDirective(value);
	    var descriptor = {
	      name: dirName,
	      arg: arg,
	      expression: parsed.expression,
	      filters: parsed.filters,
	      raw: value,
	      attr: rawName,
	      modifiers: modifiers,
	      def: def
	    };
	    // check ref for v-for and router-view
	    if (dirName === 'for' || dirName === 'router-view') {
	      descriptor.ref = findRef(el);
	    }
	    var fn = function terminalNodeLinkFn(vm, el, host, scope, frag) {
	      if (descriptor.ref) {
	        defineReactive((scope || vm).$refs, descriptor.ref, null);
	      }
	      vm._bindDir(descriptor, el, host, scope, frag);
	    };
	    fn.terminal = true;
	    return fn;
	  }
	
	  /**
	   * Compile the directives on an element and return a linker.
	   *
	   * @param {Array|NamedNodeMap} attrs
	   * @param {Object} options
	   * @return {Function}
	   */
	
	  function compileDirectives(attrs, options) {
	    var i = attrs.length;
	    var dirs = [];
	    var attr, name, value, rawName, rawValue, dirName, arg, modifiers, dirDef, tokens, matched;
	    while (i--) {
	      attr = attrs[i];
	      name = rawName = attr.name;
	      value = rawValue = attr.value;
	      tokens = parseText(value);
	      // reset arg
	      arg = null;
	      // check modifiers
	      modifiers = parseModifiers(name);
	      name = name.replace(modifierRE, '');
	
	      // attribute interpolations
	      if (tokens) {
	        value = tokensToExp(tokens);
	        arg = name;
	        pushDir('bind', directives.bind, tokens);
	        // warn against mixing mustaches with v-bind
	        if (true) {
	          if (name === 'class' && Array.prototype.some.call(attrs, function (attr) {
	            return attr.name === ':class' || attr.name === 'v-bind:class';
	          })) {
	            warn('class="' + rawValue + '": Do not mix mustache interpolation ' + 'and v-bind for "class" on the same element. Use one or the other.', options);
	          }
	        }
	      } else
	
	        // special attribute: transition
	        if (transitionRE.test(name)) {
	          modifiers.literal = !bindRE.test(name);
	          pushDir('transition', internalDirectives.transition);
	        } else
	
	          // event handlers
	          if (onRE.test(name)) {
	            arg = name.replace(onRE, '');
	            pushDir('on', directives.on);
	          } else
	
	            // attribute bindings
	            if (bindRE.test(name)) {
	              dirName = name.replace(bindRE, '');
	              if (dirName === 'style' || dirName === 'class') {
	                pushDir(dirName, internalDirectives[dirName]);
	              } else {
	                arg = dirName;
	                pushDir('bind', directives.bind);
	              }
	            } else
	
	              // normal directives
	              if (matched = name.match(dirAttrRE)) {
	                dirName = matched[1];
	                arg = matched[2];
	
	                // skip v-else (when used with v-show)
	                if (dirName === 'else') {
	                  continue;
	                }
	
	                dirDef = resolveAsset(options, 'directives', dirName, true);
	                if (dirDef) {
	                  pushDir(dirName, dirDef);
	                }
	              }
	    }
	
	    /**
	     * Push a directive.
	     *
	     * @param {String} dirName
	     * @param {Object|Function} def
	     * @param {Array} [interpTokens]
	     */
	
	    function pushDir(dirName, def, interpTokens) {
	      var hasOneTimeToken = interpTokens && hasOneTime(interpTokens);
	      var parsed = !hasOneTimeToken && parseDirective(value);
	      dirs.push({
	        name: dirName,
	        attr: rawName,
	        raw: rawValue,
	        def: def,
	        arg: arg,
	        modifiers: modifiers,
	        // conversion from interpolation strings with one-time token
	        // to expression is differed until directive bind time so that we
	        // have access to the actual vm context for one-time bindings.
	        expression: parsed && parsed.expression,
	        filters: parsed && parsed.filters,
	        interp: interpTokens,
	        hasOneTime: hasOneTimeToken
	      });
	    }
	
	    if (dirs.length) {
	      return makeNodeLinkFn(dirs);
	    }
	  }
	
	  /**
	   * Parse modifiers from directive attribute name.
	   *
	   * @param {String} name
	   * @return {Object}
	   */
	
	  function parseModifiers(name) {
	    var res = Object.create(null);
	    var match = name.match(modifierRE);
	    if (match) {
	      var i = match.length;
	      while (i--) {
	        res[match[i].slice(1)] = true;
	      }
	    }
	    return res;
	  }
	
	  /**
	   * Build a link function for all directives on a single node.
	   *
	   * @param {Array} directives
	   * @return {Function} directivesLinkFn
	   */
	
	  function makeNodeLinkFn(directives) {
	    return function nodeLinkFn(vm, el, host, scope, frag) {
	      // reverse apply because it's sorted low to high
	      var i = directives.length;
	      while (i--) {
	        vm._bindDir(directives[i], el, host, scope, frag);
	      }
	    };
	  }
	
	  /**
	   * Check if an interpolation string contains one-time tokens.
	   *
	   * @param {Array} tokens
	   * @return {Boolean}
	   */
	
	  function hasOneTime(tokens) {
	    var i = tokens.length;
	    while (i--) {
	      if (tokens[i].oneTime) return true;
	    }
	  }
	
	  function isScript(el) {
	    return el.tagName === 'SCRIPT' && (!el.hasAttribute('type') || el.getAttribute('type') === 'text/javascript');
	  }
	
	  var specialCharRE = /[^\w\-:\.]/;
	
	  /**
	   * Process an element or a DocumentFragment based on a
	   * instance option object. This allows us to transclude
	   * a template node/fragment before the instance is created,
	   * so the processed fragment can then be cloned and reused
	   * in v-for.
	   *
	   * @param {Element} el
	   * @param {Object} options
	   * @return {Element|DocumentFragment}
	   */
	
	  function transclude(el, options) {
	    // extract container attributes to pass them down
	    // to compiler, because they need to be compiled in
	    // parent scope. we are mutating the options object here
	    // assuming the same object will be used for compile
	    // right after this.
	    if (options) {
	      options._containerAttrs = extractAttrs(el);
	    }
	    // for template tags, what we want is its content as
	    // a documentFragment (for fragment instances)
	    if (isTemplate(el)) {
	      el = parseTemplate(el);
	    }
	    if (options) {
	      if (options._asComponent && !options.template) {
	        options.template = '<slot></slot>';
	      }
	      if (options.template) {
	        options._content = extractContent(el);
	        el = transcludeTemplate(el, options);
	      }
	    }
	    if (isFragment(el)) {
	      // anchors for fragment instance
	      // passing in `persist: true` to avoid them being
	      // discarded by IE during template cloning
	      prepend(createAnchor('v-start', true), el);
	      el.appendChild(createAnchor('v-end', true));
	    }
	    return el;
	  }
	
	  /**
	   * Process the template option.
	   * If the replace option is true this will swap the $el.
	   *
	   * @param {Element} el
	   * @param {Object} options
	   * @return {Element|DocumentFragment}
	   */
	
	  function transcludeTemplate(el, options) {
	    var template = options.template;
	    var frag = parseTemplate(template, true);
	    if (frag) {
	      var replacer = frag.firstChild;
	      var tag = replacer.tagName && replacer.tagName.toLowerCase();
	      if (options.replace) {
	        /* istanbul ignore if */
	        if (el === document.body) {
	          'development' !== 'production' && warn('You are mounting an instance with a template to ' + '<body>. This will replace <body> entirely. You ' + 'should probably use `replace: false` here.');
	        }
	        // there are many cases where the instance must
	        // become a fragment instance: basically anything that
	        // can create more than 1 root nodes.
	        if (
	        // multi-children template
	        frag.childNodes.length > 1 ||
	        // non-element template
	        replacer.nodeType !== 1 ||
	        // single nested component
	        tag === 'component' || resolveAsset(options, 'components', tag) || hasBindAttr(replacer, 'is') ||
	        // element directive
	        resolveAsset(options, 'elementDirectives', tag) ||
	        // for block
	        replacer.hasAttribute('v-for') ||
	        // if block
	        replacer.hasAttribute('v-if')) {
	          return frag;
	        } else {
	          options._replacerAttrs = extractAttrs(replacer);
	          mergeAttrs(el, replacer);
	          return replacer;
	        }
	      } else {
	        el.appendChild(frag);
	        return el;
	      }
	    } else {
	      'development' !== 'production' && warn('Invalid template option: ' + template);
	    }
	  }
	
	  /**
	   * Helper to extract a component container's attributes
	   * into a plain object array.
	   *
	   * @param {Element} el
	   * @return {Array}
	   */
	
	  function extractAttrs(el) {
	    if (el.nodeType === 1 && el.hasAttributes()) {
	      return toArray(el.attributes);
	    }
	  }
	
	  /**
	   * Merge the attributes of two elements, and make sure
	   * the class names are merged properly.
	   *
	   * @param {Element} from
	   * @param {Element} to
	   */
	
	  function mergeAttrs(from, to) {
	    var attrs = from.attributes;
	    var i = attrs.length;
	    var name, value;
	    while (i--) {
	      name = attrs[i].name;
	      value = attrs[i].value;
	      if (!to.hasAttribute(name) && !specialCharRE.test(name)) {
	        to.setAttribute(name, value);
	      } else if (name === 'class' && !parseText(value) && (value = value.trim())) {
	        value.split(/\s+/).forEach(function (cls) {
	          addClass(to, cls);
	        });
	      }
	    }
	  }
	
	  /**
	   * Scan and determine slot content distribution.
	   * We do this during transclusion instead at compile time so that
	   * the distribution is decoupled from the compilation order of
	   * the slots.
	   *
	   * @param {Element|DocumentFragment} template
	   * @param {Element} content
	   * @param {Vue} vm
	   */
	
	  function resolveSlots(vm, content) {
	    if (!content) {
	      return;
	    }
	    var contents = vm._slotContents = Object.create(null);
	    var el, name;
	    for (var i = 0, l = content.children.length; i < l; i++) {
	      el = content.children[i];
	      /* eslint-disable no-cond-assign */
	      if (name = el.getAttribute('slot')) {
	        (contents[name] || (contents[name] = [])).push(el);
	      }
	      /* eslint-enable no-cond-assign */
	      if ('development' !== 'production' && getBindAttr(el, 'slot')) {
	        warn('The "slot" attribute must be static.', vm.$parent);
	      }
	    }
	    for (name in contents) {
	      contents[name] = extractFragment(contents[name], content);
	    }
	    if (content.hasChildNodes()) {
	      var nodes = content.childNodes;
	      if (nodes.length === 1 && nodes[0].nodeType === 3 && !nodes[0].data.trim()) {
	        return;
	      }
	      contents['default'] = extractFragment(content.childNodes, content);
	    }
	  }
	
	  /**
	   * Extract qualified content nodes from a node list.
	   *
	   * @param {NodeList} nodes
	   * @return {DocumentFragment}
	   */
	
	  function extractFragment(nodes, parent) {
	    var frag = document.createDocumentFragment();
	    nodes = toArray(nodes);
	    for (var i = 0, l = nodes.length; i < l; i++) {
	      var node = nodes[i];
	      if (isTemplate(node) && !node.hasAttribute('v-if') && !node.hasAttribute('v-for')) {
	        parent.removeChild(node);
	        node = parseTemplate(node, true);
	      }
	      frag.appendChild(node);
	    }
	    return frag;
	  }
	
	
	
	  var compiler = Object.freeze({
	  	compile: compile,
	  	compileAndLinkProps: compileAndLinkProps,
	  	compileRoot: compileRoot,
	  	transclude: transclude,
	  	resolveSlots: resolveSlots
	  });
	
	  function stateMixin (Vue) {
	    /**
	     * Accessor for `$data` property, since setting $data
	     * requires observing the new object and updating
	     * proxied properties.
	     */
	
	    Object.defineProperty(Vue.prototype, '$data', {
	      get: function get() {
	        return this._data;
	      },
	      set: function set(newData) {
	        if (newData !== this._data) {
	          this._setData(newData);
	        }
	      }
	    });
	
	    /**
	     * Setup the scope of an instance, which contains:
	     * - observed data
	     * - computed properties
	     * - user methods
	     * - meta properties
	     */
	
	    Vue.prototype._initState = function () {
	      this._initProps();
	      this._initMeta();
	      this._initMethods();
	      this._initData();
	      this._initComputed();
	    };
	
	    /**
	     * Initialize props.
	     */
	
	    Vue.prototype._initProps = function () {
	      var options = this.$options;
	      var el = options.el;
	      var props = options.props;
	      if (props && !el) {
	        'development' !== 'production' && warn('Props will not be compiled if no `el` option is ' + 'provided at instantiation.', this);
	      }
	      // make sure to convert string selectors into element now
	      el = options.el = query(el);
	      this._propsUnlinkFn = el && el.nodeType === 1 && props
	      // props must be linked in proper scope if inside v-for
	      ? compileAndLinkProps(this, el, props, this._scope) : null;
	    };
	
	    /**
	     * Initialize the data.
	     */
	
	    Vue.prototype._initData = function () {
	      var dataFn = this.$options.data;
	      var data = this._data = dataFn ? dataFn() : {};
	      if (!isPlainObject(data)) {
	        data = {};
	        'development' !== 'production' && warn('data functions should return an object.', this);
	      }
	      var props = this._props;
	      // proxy data on instance
	      var keys = Object.keys(data);
	      var i, key;
	      i = keys.length;
	      while (i--) {
	        key = keys[i];
	        // there are two scenarios where we can proxy a data key:
	        // 1. it's not already defined as a prop
	        // 2. it's provided via a instantiation option AND there are no
	        //    template prop present
	        if (!props || !hasOwn(props, key)) {
	          this._proxy(key);
	        } else if (true) {
	          warn('Data field "' + key + '" is already defined ' + 'as a prop. To provide default value for a prop, use the "default" ' + 'prop option; if you want to pass prop values to an instantiation ' + 'call, use the "propsData" option.', this);
	        }
	      }
	      // observe data
	      observe(data, this);
	    };
	
	    /**
	     * Swap the instance's $data. Called in $data's setter.
	     *
	     * @param {Object} newData
	     */
	
	    Vue.prototype._setData = function (newData) {
	      newData = newData || {};
	      var oldData = this._data;
	      this._data = newData;
	      var keys, key, i;
	      // unproxy keys not present in new data
	      keys = Object.keys(oldData);
	      i = keys.length;
	      while (i--) {
	        key = keys[i];
	        if (!(key in newData)) {
	          this._unproxy(key);
	        }
	      }
	      // proxy keys not already proxied,
	      // and trigger change for changed values
	      keys = Object.keys(newData);
	      i = keys.length;
	      while (i--) {
	        key = keys[i];
	        if (!hasOwn(this, key)) {
	          // new property
	          this._proxy(key);
	        }
	      }
	      oldData.__ob__.removeVm(this);
	      observe(newData, this);
	      this._digest();
	    };
	
	    /**
	     * Proxy a property, so that
	     * vm.prop === vm._data.prop
	     *
	     * @param {String} key
	     */
	
	    Vue.prototype._proxy = function (key) {
	      if (!isReserved(key)) {
	        // need to store ref to self here
	        // because these getter/setters might
	        // be called by child scopes via
	        // prototype inheritance.
	        var self = this;
	        Object.defineProperty(self, key, {
	          configurable: true,
	          enumerable: true,
	          get: function proxyGetter() {
	            return self._data[key];
	          },
	          set: function proxySetter(val) {
	            self._data[key] = val;
	          }
	        });
	      }
	    };
	
	    /**
	     * Unproxy a property.
	     *
	     * @param {String} key
	     */
	
	    Vue.prototype._unproxy = function (key) {
	      if (!isReserved(key)) {
	        delete this[key];
	      }
	    };
	
	    /**
	     * Force update on every watcher in scope.
	     */
	
	    Vue.prototype._digest = function () {
	      for (var i = 0, l = this._watchers.length; i < l; i++) {
	        this._watchers[i].update(true); // shallow updates
	      }
	    };
	
	    /**
	     * Setup computed properties. They are essentially
	     * special getter/setters
	     */
	
	    function noop() {}
	    Vue.prototype._initComputed = function () {
	      var computed = this.$options.computed;
	      if (computed) {
	        for (var key in computed) {
	          var userDef = computed[key];
	          var def = {
	            enumerable: true,
	            configurable: true
	          };
	          if (typeof userDef === 'function') {
	            def.get = makeComputedGetter(userDef, this);
	            def.set = noop;
	          } else {
	            def.get = userDef.get ? userDef.cache !== false ? makeComputedGetter(userDef.get, this) : bind(userDef.get, this) : noop;
	            def.set = userDef.set ? bind(userDef.set, this) : noop;
	          }
	          Object.defineProperty(this, key, def);
	        }
	      }
	    };
	
	    function makeComputedGetter(getter, owner) {
	      var watcher = new Watcher(owner, getter, null, {
	        lazy: true
	      });
	      return function computedGetter() {
	        if (watcher.dirty) {
	          watcher.evaluate();
	        }
	        if (Dep.target) {
	          watcher.depend();
	        }
	        return watcher.value;
	      };
	    }
	
	    /**
	     * Setup instance methods. Methods must be bound to the
	     * instance since they might be passed down as a prop to
	     * child components.
	     */
	
	    Vue.prototype._initMethods = function () {
	      var methods = this.$options.methods;
	      if (methods) {
	        for (var key in methods) {
	          this[key] = bind(methods[key], this);
	        }
	      }
	    };
	
	    /**
	     * Initialize meta information like $index, $key & $value.
	     */
	
	    Vue.prototype._initMeta = function () {
	      var metas = this.$options._meta;
	      if (metas) {
	        for (var key in metas) {
	          defineReactive(this, key, metas[key]);
	        }
	      }
	    };
	  }
	
	  var eventRE = /^v-on:|^@/;
	
	  function eventsMixin (Vue) {
	    /**
	     * Setup the instance's option events & watchers.
	     * If the value is a string, we pull it from the
	     * instance's methods by name.
	     */
	
	    Vue.prototype._initEvents = function () {
	      var options = this.$options;
	      if (options._asComponent) {
	        registerComponentEvents(this, options.el);
	      }
	      registerCallbacks(this, '$on', options.events);
	      registerCallbacks(this, '$watch', options.watch);
	    };
	
	    /**
	     * Register v-on events on a child component
	     *
	     * @param {Vue} vm
	     * @param {Element} el
	     */
	
	    function registerComponentEvents(vm, el) {
	      var attrs = el.attributes;
	      var name, value, handler;
	      for (var i = 0, l = attrs.length; i < l; i++) {
	        name = attrs[i].name;
	        if (eventRE.test(name)) {
	          name = name.replace(eventRE, '');
	          // force the expression into a statement so that
	          // it always dynamically resolves the method to call (#2670)
	          // kinda ugly hack, but does the job.
	          value = attrs[i].value;
	          if (isSimplePath(value)) {
	            value += '.apply(this, $arguments)';
	          }
	          handler = (vm._scope || vm._context).$eval(value, true);
	          handler._fromParent = true;
	          vm.$on(name.replace(eventRE), handler);
	        }
	      }
	    }
	
	    /**
	     * Register callbacks for option events and watchers.
	     *
	     * @param {Vue} vm
	     * @param {String} action
	     * @param {Object} hash
	     */
	
	    function registerCallbacks(vm, action, hash) {
	      if (!hash) return;
	      var handlers, key, i, j;
	      for (key in hash) {
	        handlers = hash[key];
	        if (isArray(handlers)) {
	          for (i = 0, j = handlers.length; i < j; i++) {
	            register(vm, action, key, handlers[i]);
	          }
	        } else {
	          register(vm, action, key, handlers);
	        }
	      }
	    }
	
	    /**
	     * Helper to register an event/watch callback.
	     *
	     * @param {Vue} vm
	     * @param {String} action
	     * @param {String} key
	     * @param {Function|String|Object} handler
	     * @param {Object} [options]
	     */
	
	    function register(vm, action, key, handler, options) {
	      var type = typeof handler;
	      if (type === 'function') {
	        vm[action](key, handler, options);
	      } else if (type === 'string') {
	        var methods = vm.$options.methods;
	        var method = methods && methods[handler];
	        if (method) {
	          vm[action](key, method, options);
	        } else {
	          'development' !== 'production' && warn('Unknown method: "' + handler + '" when ' + 'registering callback for ' + action + ': "' + key + '".', vm);
	        }
	      } else if (handler && type === 'object') {
	        register(vm, action, key, handler.handler, handler);
	      }
	    }
	
	    /**
	     * Setup recursive attached/detached calls
	     */
	
	    Vue.prototype._initDOMHooks = function () {
	      this.$on('hook:attached', onAttached);
	      this.$on('hook:detached', onDetached);
	    };
	
	    /**
	     * Callback to recursively call attached hook on children
	     */
	
	    function onAttached() {
	      if (!this._isAttached) {
	        this._isAttached = true;
	        this.$children.forEach(callAttach);
	      }
	    }
	
	    /**
	     * Iterator to call attached hook
	     *
	     * @param {Vue} child
	     */
	
	    function callAttach(child) {
	      if (!child._isAttached && inDoc(child.$el)) {
	        child._callHook('attached');
	      }
	    }
	
	    /**
	     * Callback to recursively call detached hook on children
	     */
	
	    function onDetached() {
	      if (this._isAttached) {
	        this._isAttached = false;
	        this.$children.forEach(callDetach);
	      }
	    }
	
	    /**
	     * Iterator to call detached hook
	     *
	     * @param {Vue} child
	     */
	
	    function callDetach(child) {
	      if (child._isAttached && !inDoc(child.$el)) {
	        child._callHook('detached');
	      }
	    }
	
	    /**
	     * Trigger all handlers for a hook
	     *
	     * @param {String} hook
	     */
	
	    Vue.prototype._callHook = function (hook) {
	      this.$emit('pre-hook:' + hook);
	      var handlers = this.$options[hook];
	      if (handlers) {
	        for (var i = 0, j = handlers.length; i < j; i++) {
	          handlers[i].call(this);
	        }
	      }
	      this.$emit('hook:' + hook);
	    };
	  }
	
	  function noop() {}
	
	  /**
	   * A directive links a DOM element with a piece of data,
	   * which is the result of evaluating an expression.
	   * It registers a watcher with the expression and calls
	   * the DOM update function when a change is triggered.
	   *
	   * @param {Object} descriptor
	   *                 - {String} name
	   *                 - {Object} def
	   *                 - {String} expression
	   *                 - {Array<Object>} [filters]
	   *                 - {Object} [modifiers]
	   *                 - {Boolean} literal
	   *                 - {String} attr
	   *                 - {String} arg
	   *                 - {String} raw
	   *                 - {String} [ref]
	   *                 - {Array<Object>} [interp]
	   *                 - {Boolean} [hasOneTime]
	   * @param {Vue} vm
	   * @param {Node} el
	   * @param {Vue} [host] - transclusion host component
	   * @param {Object} [scope] - v-for scope
	   * @param {Fragment} [frag] - owner fragment
	   * @constructor
	   */
	  function Directive(descriptor, vm, el, host, scope, frag) {
	    this.vm = vm;
	    this.el = el;
	    // copy descriptor properties
	    this.descriptor = descriptor;
	    this.name = descriptor.name;
	    this.expression = descriptor.expression;
	    this.arg = descriptor.arg;
	    this.modifiers = descriptor.modifiers;
	    this.filters = descriptor.filters;
	    this.literal = this.modifiers && this.modifiers.literal;
	    // private
	    this._locked = false;
	    this._bound = false;
	    this._listeners = null;
	    // link context
	    this._host = host;
	    this._scope = scope;
	    this._frag = frag;
	    // store directives on node in dev mode
	    if ('development' !== 'production' && this.el) {
	      this.el._vue_directives = this.el._vue_directives || [];
	      this.el._vue_directives.push(this);
	    }
	  }
	
	  /**
	   * Initialize the directive, mixin definition properties,
	   * setup the watcher, call definition bind() and update()
	   * if present.
	   */
	
	  Directive.prototype._bind = function () {
	    var name = this.name;
	    var descriptor = this.descriptor;
	
	    // remove attribute
	    if ((name !== 'cloak' || this.vm._isCompiled) && this.el && this.el.removeAttribute) {
	      var attr = descriptor.attr || 'v-' + name;
	      this.el.removeAttribute(attr);
	    }
	
	    // copy def properties
	    var def = descriptor.def;
	    if (typeof def === 'function') {
	      this.update = def;
	    } else {
	      extend(this, def);
	    }
	
	    // setup directive params
	    this._setupParams();
	
	    // initial bind
	    if (this.bind) {
	      this.bind();
	    }
	    this._bound = true;
	
	    if (this.literal) {
	      this.update && this.update(descriptor.raw);
	    } else if ((this.expression || this.modifiers) && (this.update || this.twoWay) && !this._checkStatement()) {
	      // wrapped updater for context
	      var dir = this;
	      if (this.update) {
	        this._update = function (val, oldVal) {
	          if (!dir._locked) {
	            dir.update(val, oldVal);
	          }
	        };
	      } else {
	        this._update = noop;
	      }
	      var preProcess = this._preProcess ? bind(this._preProcess, this) : null;
	      var postProcess = this._postProcess ? bind(this._postProcess, this) : null;
	      var watcher = this._watcher = new Watcher(this.vm, this.expression, this._update, // callback
	      {
	        filters: this.filters,
	        twoWay: this.twoWay,
	        deep: this.deep,
	        preProcess: preProcess,
	        postProcess: postProcess,
	        scope: this._scope
	      });
	      // v-model with inital inline value need to sync back to
	      // model instead of update to DOM on init. They would
	      // set the afterBind hook to indicate that.
	      if (this.afterBind) {
	        this.afterBind();
	      } else if (this.update) {
	        this.update(watcher.value);
	      }
	    }
	  };
	
	  /**
	   * Setup all param attributes, e.g. track-by,
	   * transition-mode, etc...
	   */
	
	  Directive.prototype._setupParams = function () {
	    if (!this.params) {
	      return;
	    }
	    var params = this.params;
	    // swap the params array with a fresh object.
	    this.params = Object.create(null);
	    var i = params.length;
	    var key, val, mappedKey;
	    while (i--) {
	      key = hyphenate(params[i]);
	      mappedKey = camelize(key);
	      val = getBindAttr(this.el, key);
	      if (val != null) {
	        // dynamic
	        this._setupParamWatcher(mappedKey, val);
	      } else {
	        // static
	        val = getAttr(this.el, key);
	        if (val != null) {
	          this.params[mappedKey] = val === '' ? true : val;
	        }
	      }
	    }
	  };
	
	  /**
	   * Setup a watcher for a dynamic param.
	   *
	   * @param {String} key
	   * @param {String} expression
	   */
	
	  Directive.prototype._setupParamWatcher = function (key, expression) {
	    var self = this;
	    var called = false;
	    var unwatch = (this._scope || this.vm).$watch(expression, function (val, oldVal) {
	      self.params[key] = val;
	      // since we are in immediate mode,
	      // only call the param change callbacks if this is not the first update.
	      if (called) {
	        var cb = self.paramWatchers && self.paramWatchers[key];
	        if (cb) {
	          cb.call(self, val, oldVal);
	        }
	      } else {
	        called = true;
	      }
	    }, {
	      immediate: true,
	      user: false
	    });(this._paramUnwatchFns || (this._paramUnwatchFns = [])).push(unwatch);
	  };
	
	  /**
	   * Check if the directive is a function caller
	   * and if the expression is a callable one. If both true,
	   * we wrap up the expression and use it as the event
	   * handler.
	   *
	   * e.g. on-click="a++"
	   *
	   * @return {Boolean}
	   */
	
	  Directive.prototype._checkStatement = function () {
	    var expression = this.expression;
	    if (expression && this.acceptStatement && !isSimplePath(expression)) {
	      var fn = parseExpression(expression).get;
	      var scope = this._scope || this.vm;
	      var handler = function handler(e) {
	        scope.$event = e;
	        fn.call(scope, scope);
	        scope.$event = null;
	      };
	      if (this.filters) {
	        handler = scope._applyFilters(handler, null, this.filters);
	      }
	      this.update(handler);
	      return true;
	    }
	  };
	
	  /**
	   * Set the corresponding value with the setter.
	   * This should only be used in two-way directives
	   * e.g. v-model.
	   *
	   * @param {*} value
	   * @public
	   */
	
	  Directive.prototype.set = function (value) {
	    /* istanbul ignore else */
	    if (this.twoWay) {
	      this._withLock(function () {
	        this._watcher.set(value);
	      });
	    } else if (true) {
	      warn('Directive.set() can only be used inside twoWay' + 'directives.');
	    }
	  };
	
	  /**
	   * Execute a function while preventing that function from
	   * triggering updates on this directive instance.
	   *
	   * @param {Function} fn
	   */
	
	  Directive.prototype._withLock = function (fn) {
	    var self = this;
	    self._locked = true;
	    fn.call(self);
	    nextTick(function () {
	      self._locked = false;
	    });
	  };
	
	  /**
	   * Convenience method that attaches a DOM event listener
	   * to the directive element and autometically tears it down
	   * during unbind.
	   *
	   * @param {String} event
	   * @param {Function} handler
	   * @param {Boolean} [useCapture]
	   */
	
	  Directive.prototype.on = function (event, handler, useCapture) {
	    on(this.el, event, handler, useCapture);(this._listeners || (this._listeners = [])).push([event, handler]);
	  };
	
	  /**
	   * Teardown the watcher and call unbind.
	   */
	
	  Directive.prototype._teardown = function () {
	    if (this._bound) {
	      this._bound = false;
	      if (this.unbind) {
	        this.unbind();
	      }
	      if (this._watcher) {
	        this._watcher.teardown();
	      }
	      var listeners = this._listeners;
	      var i;
	      if (listeners) {
	        i = listeners.length;
	        while (i--) {
	          off(this.el, listeners[i][0], listeners[i][1]);
	        }
	      }
	      var unwatchFns = this._paramUnwatchFns;
	      if (unwatchFns) {
	        i = unwatchFns.length;
	        while (i--) {
	          unwatchFns[i]();
	        }
	      }
	      if ('development' !== 'production' && this.el) {
	        this.el._vue_directives.$remove(this);
	      }
	      this.vm = this.el = this._watcher = this._listeners = null;
	    }
	  };
	
	  function lifecycleMixin (Vue) {
	    /**
	     * Update v-ref for component.
	     *
	     * @param {Boolean} remove
	     */
	
	    Vue.prototype._updateRef = function (remove) {
	      var ref = this.$options._ref;
	      if (ref) {
	        var refs = (this._scope || this._context).$refs;
	        if (remove) {
	          if (refs[ref] === this) {
	            refs[ref] = null;
	          }
	        } else {
	          refs[ref] = this;
	        }
	      }
	    };
	
	    /**
	     * Transclude, compile and link element.
	     *
	     * If a pre-compiled linker is available, that means the
	     * passed in element will be pre-transcluded and compiled
	     * as well - all we need to do is to call the linker.
	     *
	     * Otherwise we need to call transclude/compile/link here.
	     *
	     * @param {Element} el
	     */
	
	    Vue.prototype._compile = function (el) {
	      var options = this.$options;
	
	      // transclude and init element
	      // transclude can potentially replace original
	      // so we need to keep reference; this step also injects
	      // the template and caches the original attributes
	      // on the container node and replacer node.
	      var original = el;
	      el = transclude(el, options);
	      this._initElement(el);
	
	      // handle v-pre on root node (#2026)
	      if (el.nodeType === 1 && getAttr(el, 'v-pre') !== null) {
	        return;
	      }
	
	      // root is always compiled per-instance, because
	      // container attrs and props can be different every time.
	      var contextOptions = this._context && this._context.$options;
	      var rootLinker = compileRoot(el, options, contextOptions);
	
	      // resolve slot distribution
	      resolveSlots(this, options._content);
	
	      // compile and link the rest
	      var contentLinkFn;
	      var ctor = this.constructor;
	      // component compilation can be cached
	      // as long as it's not using inline-template
	      if (options._linkerCachable) {
	        contentLinkFn = ctor.linker;
	        if (!contentLinkFn) {
	          contentLinkFn = ctor.linker = compile(el, options);
	        }
	      }
	
	      // link phase
	      // make sure to link root with prop scope!
	      var rootUnlinkFn = rootLinker(this, el, this._scope);
	      var contentUnlinkFn = contentLinkFn ? contentLinkFn(this, el) : compile(el, options)(this, el);
	
	      // register composite unlink function
	      // to be called during instance destruction
	      this._unlinkFn = function () {
	        rootUnlinkFn();
	        // passing destroying: true to avoid searching and
	        // splicing the directives
	        contentUnlinkFn(true);
	      };
	
	      // finally replace original
	      if (options.replace) {
	        replace(original, el);
	      }
	
	      this._isCompiled = true;
	      this._callHook('compiled');
	    };
	
	    /**
	     * Initialize instance element. Called in the public
	     * $mount() method.
	     *
	     * @param {Element} el
	     */
	
	    Vue.prototype._initElement = function (el) {
	      if (isFragment(el)) {
	        this._isFragment = true;
	        this.$el = this._fragmentStart = el.firstChild;
	        this._fragmentEnd = el.lastChild;
	        // set persisted text anchors to empty
	        if (this._fragmentStart.nodeType === 3) {
	          this._fragmentStart.data = this._fragmentEnd.data = '';
	        }
	        this._fragment = el;
	      } else {
	        this.$el = el;
	      }
	      this.$el.__vue__ = this;
	      this._callHook('beforeCompile');
	    };
	
	    /**
	     * Create and bind a directive to an element.
	     *
	     * @param {Object} descriptor - parsed directive descriptor
	     * @param {Node} node   - target node
	     * @param {Vue} [host] - transclusion host component
	     * @param {Object} [scope] - v-for scope
	     * @param {Fragment} [frag] - owner fragment
	     */
	
	    Vue.prototype._bindDir = function (descriptor, node, host, scope, frag) {
	      this._directives.push(new Directive(descriptor, this, node, host, scope, frag));
	    };
	
	    /**
	     * Teardown an instance, unobserves the data, unbind all the
	     * directives, turn off all the event listeners, etc.
	     *
	     * @param {Boolean} remove - whether to remove the DOM node.
	     * @param {Boolean} deferCleanup - if true, defer cleanup to
	     *                                 be called later
	     */
	
	    Vue.prototype._destroy = function (remove, deferCleanup) {
	      if (this._isBeingDestroyed) {
	        if (!deferCleanup) {
	          this._cleanup();
	        }
	        return;
	      }
	
	      var destroyReady;
	      var pendingRemoval;
	
	      var self = this;
	      // Cleanup should be called either synchronously or asynchronoysly as
	      // callback of this.$remove(), or if remove and deferCleanup are false.
	      // In any case it should be called after all other removing, unbinding and
	      // turning of is done
	      var cleanupIfPossible = function cleanupIfPossible() {
	        if (destroyReady && !pendingRemoval && !deferCleanup) {
	          self._cleanup();
	        }
	      };
	
	      // remove DOM element
	      if (remove && this.$el) {
	        pendingRemoval = true;
	        this.$remove(function () {
	          pendingRemoval = false;
	          cleanupIfPossible();
	        });
	      }
	
	      this._callHook('beforeDestroy');
	      this._isBeingDestroyed = true;
	      var i;
	      // remove self from parent. only necessary
	      // if parent is not being destroyed as well.
	      var parent = this.$parent;
	      if (parent && !parent._isBeingDestroyed) {
	        parent.$children.$remove(this);
	        // unregister ref (remove: true)
	        this._updateRef(true);
	      }
	      // destroy all children.
	      i = this.$children.length;
	      while (i--) {
	        this.$children[i].$destroy();
	      }
	      // teardown props
	      if (this._propsUnlinkFn) {
	        this._propsUnlinkFn();
	      }
	      // teardown all directives. this also tearsdown all
	      // directive-owned watchers.
	      if (this._unlinkFn) {
	        this._unlinkFn();
	      }
	      i = this._watchers.length;
	      while (i--) {
	        this._watchers[i].teardown();
	      }
	      // remove reference to self on $el
	      if (this.$el) {
	        this.$el.__vue__ = null;
	      }
	
	      destroyReady = true;
	      cleanupIfPossible();
	    };
	
	    /**
	     * Clean up to ensure garbage collection.
	     * This is called after the leave transition if there
	     * is any.
	     */
	
	    Vue.prototype._cleanup = function () {
	      if (this._isDestroyed) {
	        return;
	      }
	      // remove self from owner fragment
	      // do it in cleanup so that we can call $destroy with
	      // defer right when a fragment is about to be removed.
	      if (this._frag) {
	        this._frag.children.$remove(this);
	      }
	      // remove reference from data ob
	      // frozen object may not have observer.
	      if (this._data && this._data.__ob__) {
	        this._data.__ob__.removeVm(this);
	      }
	      // Clean up references to private properties and other
	      // instances. preserve reference to _data so that proxy
	      // accessors still work. The only potential side effect
	      // here is that mutating the instance after it's destroyed
	      // may affect the state of other components that are still
	      // observing the same object, but that seems to be a
	      // reasonable responsibility for the user rather than
	      // always throwing an error on them.
	      this.$el = this.$parent = this.$root = this.$children = this._watchers = this._context = this._scope = this._directives = null;
	      // call the last hook...
	      this._isDestroyed = true;
	      this._callHook('destroyed');
	      // turn off all instance listeners.
	      this.$off();
	    };
	  }
	
	  function miscMixin (Vue) {
	    /**
	     * Apply a list of filter (descriptors) to a value.
	     * Using plain for loops here because this will be called in
	     * the getter of any watcher with filters so it is very
	     * performance sensitive.
	     *
	     * @param {*} value
	     * @param {*} [oldValue]
	     * @param {Array} filters
	     * @param {Boolean} write
	     * @return {*}
	     */
	
	    Vue.prototype._applyFilters = function (value, oldValue, filters, write) {
	      var filter, fn, args, arg, offset, i, l, j, k;
	      for (i = 0, l = filters.length; i < l; i++) {
	        filter = filters[write ? l - i - 1 : i];
	        fn = resolveAsset(this.$options, 'filters', filter.name, true);
	        if (!fn) continue;
	        fn = write ? fn.write : fn.read || fn;
	        if (typeof fn !== 'function') continue;
	        args = write ? [value, oldValue] : [value];
	        offset = write ? 2 : 1;
	        if (filter.args) {
	          for (j = 0, k = filter.args.length; j < k; j++) {
	            arg = filter.args[j];
	            args[j + offset] = arg.dynamic ? this.$get(arg.value) : arg.value;
	          }
	        }
	        value = fn.apply(this, args);
	      }
	      return value;
	    };
	
	    /**
	     * Resolve a component, depending on whether the component
	     * is defined normally or using an async factory function.
	     * Resolves synchronously if already resolved, otherwise
	     * resolves asynchronously and caches the resolved
	     * constructor on the factory.
	     *
	     * @param {String|Function} value
	     * @param {Function} cb
	     */
	
	    Vue.prototype._resolveComponent = function (value, cb) {
	      var factory;
	      if (typeof value === 'function') {
	        factory = value;
	      } else {
	        factory = resolveAsset(this.$options, 'components', value, true);
	      }
	      /* istanbul ignore if */
	      if (!factory) {
	        return;
	      }
	      // async component factory
	      if (!factory.options) {
	        if (factory.resolved) {
	          // cached
	          cb(factory.resolved);
	        } else if (factory.requested) {
	          // pool callbacks
	          factory.pendingCallbacks.push(cb);
	        } else {
	          factory.requested = true;
	          var cbs = factory.pendingCallbacks = [cb];
	          factory.call(this, function resolve(res) {
	            if (isPlainObject(res)) {
	              res = Vue.extend(res);
	            }
	            // cache resolved
	            factory.resolved = res;
	            // invoke callbacks
	            for (var i = 0, l = cbs.length; i < l; i++) {
	              cbs[i](res);
	            }
	          }, function reject(reason) {
	            'development' !== 'production' && warn('Failed to resolve async component' + (typeof value === 'string' ? ': ' + value : '') + '. ' + (reason ? '\nReason: ' + reason : ''));
	          });
	        }
	      } else {
	        // normal component
	        cb(factory);
	      }
	    };
	  }
	
	  var filterRE$1 = /[^|]\|[^|]/;
	
	  function dataAPI (Vue) {
	    /**
	     * Get the value from an expression on this vm.
	     *
	     * @param {String} exp
	     * @param {Boolean} [asStatement]
	     * @return {*}
	     */
	
	    Vue.prototype.$get = function (exp, asStatement) {
	      var res = parseExpression(exp);
	      if (res) {
	        if (asStatement) {
	          var self = this;
	          return function statementHandler() {
	            self.$arguments = toArray(arguments);
	            var result = res.get.call(self, self);
	            self.$arguments = null;
	            return result;
	          };
	        } else {
	          try {
	            return res.get.call(this, this);
	          } catch (e) {}
	        }
	      }
	    };
	
	    /**
	     * Set the value from an expression on this vm.
	     * The expression must be a valid left-hand
	     * expression in an assignment.
	     *
	     * @param {String} exp
	     * @param {*} val
	     */
	
	    Vue.prototype.$set = function (exp, val) {
	      var res = parseExpression(exp, true);
	      if (res && res.set) {
	        res.set.call(this, this, val);
	      }
	    };
	
	    /**
	     * Delete a property on the VM
	     *
	     * @param {String} key
	     */
	
	    Vue.prototype.$delete = function (key) {
	      del(this._data, key);
	    };
	
	    /**
	     * Watch an expression, trigger callback when its
	     * value changes.
	     *
	     * @param {String|Function} expOrFn
	     * @param {Function} cb
	     * @param {Object} [options]
	     *                 - {Boolean} deep
	     *                 - {Boolean} immediate
	     * @return {Function} - unwatchFn
	     */
	
	    Vue.prototype.$watch = function (expOrFn, cb, options) {
	      var vm = this;
	      var parsed;
	      if (typeof expOrFn === 'string') {
	        parsed = parseDirective(expOrFn);
	        expOrFn = parsed.expression;
	      }
	      var watcher = new Watcher(vm, expOrFn, cb, {
	        deep: options && options.deep,
	        sync: options && options.sync,
	        filters: parsed && parsed.filters,
	        user: !options || options.user !== false
	      });
	      if (options && options.immediate) {
	        cb.call(vm, watcher.value);
	      }
	      return function unwatchFn() {
	        watcher.teardown();
	      };
	    };
	
	    /**
	     * Evaluate a text directive, including filters.
	     *
	     * @param {String} text
	     * @param {Boolean} [asStatement]
	     * @return {String}
	     */
	
	    Vue.prototype.$eval = function (text, asStatement) {
	      // check for filters.
	      if (filterRE$1.test(text)) {
	        var dir = parseDirective(text);
	        // the filter regex check might give false positive
	        // for pipes inside strings, so it's possible that
	        // we don't get any filters here
	        var val = this.$get(dir.expression, asStatement);
	        return dir.filters ? this._applyFilters(val, null, dir.filters) : val;
	      } else {
	        // no filter
	        return this.$get(text, asStatement);
	      }
	    };
	
	    /**
	     * Interpolate a piece of template text.
	     *
	     * @param {String} text
	     * @return {String}
	     */
	
	    Vue.prototype.$interpolate = function (text) {
	      var tokens = parseText(text);
	      var vm = this;
	      if (tokens) {
	        if (tokens.length === 1) {
	          return vm.$eval(tokens[0].value) + '';
	        } else {
	          return tokens.map(function (token) {
	            return token.tag ? vm.$eval(token.value) : token.value;
	          }).join('');
	        }
	      } else {
	        return text;
	      }
	    };
	
	    /**
	     * Log instance data as a plain JS object
	     * so that it is easier to inspect in console.
	     * This method assumes console is available.
	     *
	     * @param {String} [path]
	     */
	
	    Vue.prototype.$log = function (path) {
	      var data = path ? getPath(this._data, path) : this._data;
	      if (data) {
	        data = clean(data);
	      }
	      // include computed fields
	      if (!path) {
	        var key;
	        for (key in this.$options.computed) {
	          data[key] = clean(this[key]);
	        }
	        if (this._props) {
	          for (key in this._props) {
	            data[key] = clean(this[key]);
	          }
	        }
	      }
	      console.log(data);
	    };
	
	    /**
	     * "clean" a getter/setter converted object into a plain
	     * object copy.
	     *
	     * @param {Object} - obj
	     * @return {Object}
	     */
	
	    function clean(obj) {
	      return JSON.parse(JSON.stringify(obj));
	    }
	  }
	
	  function domAPI (Vue) {
	    /**
	     * Convenience on-instance nextTick. The callback is
	     * auto-bound to the instance, and this avoids component
	     * modules having to rely on the global Vue.
	     *
	     * @param {Function} fn
	     */
	
	    Vue.prototype.$nextTick = function (fn) {
	      nextTick(fn, this);
	    };
	
	    /**
	     * Append instance to target
	     *
	     * @param {Node} target
	     * @param {Function} [cb]
	     * @param {Boolean} [withTransition] - defaults to true
	     */
	
	    Vue.prototype.$appendTo = function (target, cb, withTransition) {
	      return insert(this, target, cb, withTransition, append, appendWithTransition);
	    };
	
	    /**
	     * Prepend instance to target
	     *
	     * @param {Node} target
	     * @param {Function} [cb]
	     * @param {Boolean} [withTransition] - defaults to true
	     */
	
	    Vue.prototype.$prependTo = function (target, cb, withTransition) {
	      target = query(target);
	      if (target.hasChildNodes()) {
	        this.$before(target.firstChild, cb, withTransition);
	      } else {
	        this.$appendTo(target, cb, withTransition);
	      }
	      return this;
	    };
	
	    /**
	     * Insert instance before target
	     *
	     * @param {Node} target
	     * @param {Function} [cb]
	     * @param {Boolean} [withTransition] - defaults to true
	     */
	
	    Vue.prototype.$before = function (target, cb, withTransition) {
	      return insert(this, target, cb, withTransition, beforeWithCb, beforeWithTransition);
	    };
	
	    /**
	     * Insert instance after target
	     *
	     * @param {Node} target
	     * @param {Function} [cb]
	     * @param {Boolean} [withTransition] - defaults to true
	     */
	
	    Vue.prototype.$after = function (target, cb, withTransition) {
	      target = query(target);
	      if (target.nextSibling) {
	        this.$before(target.nextSibling, cb, withTransition);
	      } else {
	        this.$appendTo(target.parentNode, cb, withTransition);
	      }
	      return this;
	    };
	
	    /**
	     * Remove instance from DOM
	     *
	     * @param {Function} [cb]
	     * @param {Boolean} [withTransition] - defaults to true
	     */
	
	    Vue.prototype.$remove = function (cb, withTransition) {
	      if (!this.$el.parentNode) {
	        return cb && cb();
	      }
	      var inDocument = this._isAttached && inDoc(this.$el);
	      // if we are not in document, no need to check
	      // for transitions
	      if (!inDocument) withTransition = false;
	      var self = this;
	      var realCb = function realCb() {
	        if (inDocument) self._callHook('detached');
	        if (cb) cb();
	      };
	      if (this._isFragment) {
	        removeNodeRange(this._fragmentStart, this._fragmentEnd, this, this._fragment, realCb);
	      } else {
	        var op = withTransition === false ? removeWithCb : removeWithTransition;
	        op(this.$el, this, realCb);
	      }
	      return this;
	    };
	
	    /**
	     * Shared DOM insertion function.
	     *
	     * @param {Vue} vm
	     * @param {Element} target
	     * @param {Function} [cb]
	     * @param {Boolean} [withTransition]
	     * @param {Function} op1 - op for non-transition insert
	     * @param {Function} op2 - op for transition insert
	     * @return vm
	     */
	
	    function insert(vm, target, cb, withTransition, op1, op2) {
	      target = query(target);
	      var targetIsDetached = !inDoc(target);
	      var op = withTransition === false || targetIsDetached ? op1 : op2;
	      var shouldCallHook = !targetIsDetached && !vm._isAttached && !inDoc(vm.$el);
	      if (vm._isFragment) {
	        mapNodeRange(vm._fragmentStart, vm._fragmentEnd, function (node) {
	          op(node, target, vm);
	        });
	        cb && cb();
	      } else {
	        op(vm.$el, target, vm, cb);
	      }
	      if (shouldCallHook) {
	        vm._callHook('attached');
	      }
	      return vm;
	    }
	
	    /**
	     * Check for selectors
	     *
	     * @param {String|Element} el
	     */
	
	    function query(el) {
	      return typeof el === 'string' ? document.querySelector(el) : el;
	    }
	
	    /**
	     * Append operation that takes a callback.
	     *
	     * @param {Node} el
	     * @param {Node} target
	     * @param {Vue} vm - unused
	     * @param {Function} [cb]
	     */
	
	    function append(el, target, vm, cb) {
	      target.appendChild(el);
	      if (cb) cb();
	    }
	
	    /**
	     * InsertBefore operation that takes a callback.
	     *
	     * @param {Node} el
	     * @param {Node} target
	     * @param {Vue} vm - unused
	     * @param {Function} [cb]
	     */
	
	    function beforeWithCb(el, target, vm, cb) {
	      before(el, target);
	      if (cb) cb();
	    }
	
	    /**
	     * Remove operation that takes a callback.
	     *
	     * @param {Node} el
	     * @param {Vue} vm - unused
	     * @param {Function} [cb]
	     */
	
	    function removeWithCb(el, vm, cb) {
	      remove(el);
	      if (cb) cb();
	    }
	  }
	
	  function eventsAPI (Vue) {
	    /**
	     * Listen on the given `event` with `fn`.
	     *
	     * @param {String} event
	     * @param {Function} fn
	     */
	
	    Vue.prototype.$on = function (event, fn) {
	      (this._events[event] || (this._events[event] = [])).push(fn);
	      modifyListenerCount(this, event, 1);
	      return this;
	    };
	
	    /**
	     * Adds an `event` listener that will be invoked a single
	     * time then automatically removed.
	     *
	     * @param {String} event
	     * @param {Function} fn
	     */
	
	    Vue.prototype.$once = function (event, fn) {
	      var self = this;
	      function on() {
	        self.$off(event, on);
	        fn.apply(this, arguments);
	      }
	      on.fn = fn;
	      this.$on(event, on);
	      return this;
	    };
	
	    /**
	     * Remove the given callback for `event` or all
	     * registered callbacks.
	     *
	     * @param {String} event
	     * @param {Function} fn
	     */
	
	    Vue.prototype.$off = function (event, fn) {
	      var cbs;
	      // all
	      if (!arguments.length) {
	        if (this.$parent) {
	          for (event in this._events) {
	            cbs = this._events[event];
	            if (cbs) {
	              modifyListenerCount(this, event, -cbs.length);
	            }
	          }
	        }
	        this._events = {};
	        return this;
	      }
	      // specific event
	      cbs = this._events[event];
	      if (!cbs) {
	        return this;
	      }
	      if (arguments.length === 1) {
	        modifyListenerCount(this, event, -cbs.length);
	        this._events[event] = null;
	        return this;
	      }
	      // specific handler
	      var cb;
	      var i = cbs.length;
	      while (i--) {
	        cb = cbs[i];
	        if (cb === fn || cb.fn === fn) {
	          modifyListenerCount(this, event, -1);
	          cbs.splice(i, 1);
	          break;
	        }
	      }
	      return this;
	    };
	
	    /**
	     * Trigger an event on self.
	     *
	     * @param {String|Object} event
	     * @return {Boolean} shouldPropagate
	     */
	
	    Vue.prototype.$emit = function (event) {
	      var isSource = typeof event === 'string';
	      event = isSource ? event : event.name;
	      var cbs = this._events[event];
	      var shouldPropagate = isSource || !cbs;
	      if (cbs) {
	        cbs = cbs.length > 1 ? toArray(cbs) : cbs;
	        // this is a somewhat hacky solution to the question raised
	        // in #2102: for an inline component listener like <comp @test="doThis">,
	        // the propagation handling is somewhat broken. Therefore we
	        // need to treat these inline callbacks differently.
	        var hasParentCbs = isSource && cbs.some(function (cb) {
	          return cb._fromParent;
	        });
	        if (hasParentCbs) {
	          shouldPropagate = false;
	        }
	        var args = toArray(arguments, 1);
	        for (var i = 0, l = cbs.length; i < l; i++) {
	          var cb = cbs[i];
	          var res = cb.apply(this, args);
	          if (res === true && (!hasParentCbs || cb._fromParent)) {
	            shouldPropagate = true;
	          }
	        }
	      }
	      return shouldPropagate;
	    };
	
	    /**
	     * Recursively broadcast an event to all children instances.
	     *
	     * @param {String|Object} event
	     * @param {...*} additional arguments
	     */
	
	    Vue.prototype.$broadcast = function (event) {
	      var isSource = typeof event === 'string';
	      event = isSource ? event : event.name;
	      // if no child has registered for this event,
	      // then there's no need to broadcast.
	      if (!this._eventsCount[event]) return;
	      var children = this.$children;
	      var args = toArray(arguments);
	      if (isSource) {
	        // use object event to indicate non-source emit
	        // on children
	        args[0] = { name: event, source: this };
	      }
	      for (var i = 0, l = children.length; i < l; i++) {
	        var child = children[i];
	        var shouldPropagate = child.$emit.apply(child, args);
	        if (shouldPropagate) {
	          child.$broadcast.apply(child, args);
	        }
	      }
	      return this;
	    };
	
	    /**
	     * Recursively propagate an event up the parent chain.
	     *
	     * @param {String} event
	     * @param {...*} additional arguments
	     */
	
	    Vue.prototype.$dispatch = function (event) {
	      var shouldPropagate = this.$emit.apply(this, arguments);
	      if (!shouldPropagate) return;
	      var parent = this.$parent;
	      var args = toArray(arguments);
	      // use object event to indicate non-source emit
	      // on parents
	      args[0] = { name: event, source: this };
	      while (parent) {
	        shouldPropagate = parent.$emit.apply(parent, args);
	        parent = shouldPropagate ? parent.$parent : null;
	      }
	      return this;
	    };
	
	    /**
	     * Modify the listener counts on all parents.
	     * This bookkeeping allows $broadcast to return early when
	     * no child has listened to a certain event.
	     *
	     * @param {Vue} vm
	     * @param {String} event
	     * @param {Number} count
	     */
	
	    var hookRE = /^hook:/;
	    function modifyListenerCount(vm, event, count) {
	      var parent = vm.$parent;
	      // hooks do not get broadcasted so no need
	      // to do bookkeeping for them
	      if (!parent || !count || hookRE.test(event)) return;
	      while (parent) {
	        parent._eventsCount[event] = (parent._eventsCount[event] || 0) + count;
	        parent = parent.$parent;
	      }
	    }
	  }
	
	  function lifecycleAPI (Vue) {
	    /**
	     * Set instance target element and kick off the compilation
	     * process. The passed in `el` can be a selector string, an
	     * existing Element, or a DocumentFragment (for block
	     * instances).
	     *
	     * @param {Element|DocumentFragment|string} el
	     * @public
	     */
	
	    Vue.prototype.$mount = function (el) {
	      if (this._isCompiled) {
	        'development' !== 'production' && warn('$mount() should be called only once.', this);
	        return;
	      }
	      el = query(el);
	      if (!el) {
	        el = document.createElement('div');
	      }
	      this._compile(el);
	      this._initDOMHooks();
	      if (inDoc(this.$el)) {
	        this._callHook('attached');
	        ready.call(this);
	      } else {
	        this.$once('hook:attached', ready);
	      }
	      return this;
	    };
	
	    /**
	     * Mark an instance as ready.
	     */
	
	    function ready() {
	      this._isAttached = true;
	      this._isReady = true;
	      this._callHook('ready');
	    }
	
	    /**
	     * Teardown the instance, simply delegate to the internal
	     * _destroy.
	     *
	     * @param {Boolean} remove
	     * @param {Boolean} deferCleanup
	     */
	
	    Vue.prototype.$destroy = function (remove, deferCleanup) {
	      this._destroy(remove, deferCleanup);
	    };
	
	    /**
	     * Partially compile a piece of DOM and return a
	     * decompile function.
	     *
	     * @param {Element|DocumentFragment} el
	     * @param {Vue} [host]
	     * @param {Object} [scope]
	     * @param {Fragment} [frag]
	     * @return {Function}
	     */
	
	    Vue.prototype.$compile = function (el, host, scope, frag) {
	      return compile(el, this.$options, true)(this, el, host, scope, frag);
	    };
	  }
	
	  /**
	   * The exposed Vue constructor.
	   *
	   * API conventions:
	   * - public API methods/properties are prefixed with `$`
	   * - internal methods/properties are prefixed with `_`
	   * - non-prefixed properties are assumed to be proxied user
	   *   data.
	   *
	   * @constructor
	   * @param {Object} [options]
	   * @public
	   */
	
	  function Vue(options) {
	    this._init(options);
	  }
	
	  // install internals
	  initMixin(Vue);
	  stateMixin(Vue);
	  eventsMixin(Vue);
	  lifecycleMixin(Vue);
	  miscMixin(Vue);
	
	  // install instance APIs
	  dataAPI(Vue);
	  domAPI(Vue);
	  eventsAPI(Vue);
	  lifecycleAPI(Vue);
	
	  var slot = {
	
	    priority: SLOT,
	    params: ['name'],
	
	    bind: function bind() {
	      // this was resolved during component transclusion
	      var name = this.params.name || 'default';
	      var content = this.vm._slotContents && this.vm._slotContents[name];
	      if (!content || !content.hasChildNodes()) {
	        this.fallback();
	      } else {
	        this.compile(content.cloneNode(true), this.vm._context, this.vm);
	      }
	    },
	
	    compile: function compile(content, context, host) {
	      if (content && context) {
	        if (this.el.hasChildNodes() && content.childNodes.length === 1 && content.childNodes[0].nodeType === 1 && content.childNodes[0].hasAttribute('v-if')) {
	          // if the inserted slot has v-if
	          // inject fallback content as the v-else
	          var elseBlock = document.createElement('template');
	          elseBlock.setAttribute('v-else', '');
	          elseBlock.innerHTML = this.el.innerHTML;
	          // the else block should be compiled in child scope
	          elseBlock._context = this.vm;
	          content.appendChild(elseBlock);
	        }
	        var scope = host ? host._scope : this._scope;
	        this.unlink = context.$compile(content, host, scope, this._frag);
	      }
	      if (content) {
	        replace(this.el, content);
	      } else {
	        remove(this.el);
	      }
	    },
	
	    fallback: function fallback() {
	      this.compile(extractContent(this.el, true), this.vm);
	    },
	
	    unbind: function unbind() {
	      if (this.unlink) {
	        this.unlink();
	      }
	    }
	  };
	
	  var partial = {
	
	    priority: PARTIAL,
	
	    params: ['name'],
	
	    // watch changes to name for dynamic partials
	    paramWatchers: {
	      name: function name(value) {
	        vIf.remove.call(this);
	        if (value) {
	          this.insert(value);
	        }
	      }
	    },
	
	    bind: function bind() {
	      this.anchor = createAnchor('v-partial');
	      replace(this.el, this.anchor);
	      this.insert(this.params.name);
	    },
	
	    insert: function insert(id) {
	      var partial = resolveAsset(this.vm.$options, 'partials', id, true);
	      if (partial) {
	        this.factory = new FragmentFactory(this.vm, partial);
	        vIf.insert.call(this);
	      }
	    },
	
	    unbind: function unbind() {
	      if (this.frag) {
	        this.frag.destroy();
	      }
	    }
	  };
	
	  var elementDirectives = {
	    slot: slot,
	    partial: partial
	  };
	
	  var convertArray = vFor._postProcess;
	
	  /**
	   * Limit filter for arrays
	   *
	   * @param {Number} n
	   * @param {Number} offset (Decimal expected)
	   */
	
	  function limitBy(arr, n, offset) {
	    offset = offset ? parseInt(offset, 10) : 0;
	    n = toNumber(n);
	    return typeof n === 'number' ? arr.slice(offset, offset + n) : arr;
	  }
	
	  /**
	   * Filter filter for arrays
	   *
	   * @param {String} search
	   * @param {String} [delimiter]
	   * @param {String} ...dataKeys
	   */
	
	  function filterBy(arr, search, delimiter) {
	    arr = convertArray(arr);
	    if (search == null) {
	      return arr;
	    }
	    if (typeof search === 'function') {
	      return arr.filter(search);
	    }
	    // cast to lowercase string
	    search = ('' + search).toLowerCase();
	    // allow optional `in` delimiter
	    // because why not
	    var n = delimiter === 'in' ? 3 : 2;
	    // extract and flatten keys
	    var keys = Array.prototype.concat.apply([], toArray(arguments, n));
	    var res = [];
	    var item, key, val, j;
	    for (var i = 0, l = arr.length; i < l; i++) {
	      item = arr[i];
	      val = item && item.$value || item;
	      j = keys.length;
	      if (j) {
	        while (j--) {
	          key = keys[j];
	          if (key === '$key' && contains(item.$key, search) || contains(getPath(val, key), search)) {
	            res.push(item);
	            break;
	          }
	        }
	      } else if (contains(item, search)) {
	        res.push(item);
	      }
	    }
	    return res;
	  }
	
	  /**
	   * Filter filter for arrays
	   *
	   * @param {String|Array<String>|Function} ...sortKeys
	   * @param {Number} [order]
	   */
	
	  function orderBy(arr) {
	    var comparator = null;
	    var sortKeys = undefined;
	    arr = convertArray(arr);
	
	    // determine order (last argument)
	    var args = toArray(arguments, 1);
	    var order = args[args.length - 1];
	    if (typeof order === 'number') {
	      order = order < 0 ? -1 : 1;
	      args = args.length > 1 ? args.slice(0, -1) : args;
	    } else {
	      order = 1;
	    }
	
	    // determine sortKeys & comparator
	    var firstArg = args[0];
	    if (!firstArg) {
	      return arr;
	    } else if (typeof firstArg === 'function') {
	      // custom comparator
	      comparator = function (a, b) {
	        return firstArg(a, b) * order;
	      };
	    } else {
	      // string keys. flatten first
	      sortKeys = Array.prototype.concat.apply([], args);
	      comparator = function (a, b, i) {
	        i = i || 0;
	        return i >= sortKeys.length - 1 ? baseCompare(a, b, i) : baseCompare(a, b, i) || comparator(a, b, i + 1);
	      };
	    }
	
	    function baseCompare(a, b, sortKeyIndex) {
	      var sortKey = sortKeys[sortKeyIndex];
	      if (sortKey) {
	        if (sortKey !== '$key') {
	          if (isObject(a) && '$value' in a) a = a.$value;
	          if (isObject(b) && '$value' in b) b = b.$value;
	        }
	        a = isObject(a) ? getPath(a, sortKey) : a;
	        b = isObject(b) ? getPath(b, sortKey) : b;
	      }
	      return a === b ? 0 : a > b ? order : -order;
	    }
	
	    // sort on a copy to avoid mutating original array
	    return arr.slice().sort(comparator);
	  }
	
	  /**
	   * String contain helper
	   *
	   * @param {*} val
	   * @param {String} search
	   */
	
	  function contains(val, search) {
	    var i;
	    if (isPlainObject(val)) {
	      var keys = Object.keys(val);
	      i = keys.length;
	      while (i--) {
	        if (contains(val[keys[i]], search)) {
	          return true;
	        }
	      }
	    } else if (isArray(val)) {
	      i = val.length;
	      while (i--) {
	        if (contains(val[i], search)) {
	          return true;
	        }
	      }
	    } else if (val != null) {
	      return val.toString().toLowerCase().indexOf(search) > -1;
	    }
	  }
	
	  var digitsRE = /(\d{3})(?=\d)/g;
	
	  // asset collections must be a plain object.
	  var filters = {
	
	    orderBy: orderBy,
	    filterBy: filterBy,
	    limitBy: limitBy,
	
	    /**
	     * Stringify value.
	     *
	     * @param {Number} indent
	     */
	
	    json: {
	      read: function read(value, indent) {
	        return typeof value === 'string' ? value : JSON.stringify(value, null, Number(indent) || 2);
	      },
	      write: function write(value) {
	        try {
	          return JSON.parse(value);
	        } catch (e) {
	          return value;
	        }
	      }
	    },
	
	    /**
	     * 'abc' => 'Abc'
	     */
	
	    capitalize: function capitalize(value) {
	      if (!value && value !== 0) return '';
	      value = value.toString();
	      return value.charAt(0).toUpperCase() + value.slice(1);
	    },
	
	    /**
	     * 'abc' => 'ABC'
	     */
	
	    uppercase: function uppercase(value) {
	      return value || value === 0 ? value.toString().toUpperCase() : '';
	    },
	
	    /**
	     * 'AbC' => 'abc'
	     */
	
	    lowercase: function lowercase(value) {
	      return value || value === 0 ? value.toString().toLowerCase() : '';
	    },
	
	    /**
	     * 12345 => $12,345.00
	     *
	     * @param {String} sign
	     * @param {Number} decimals Decimal places
	     */
	
	    currency: function currency(value, _currency, decimals) {
	      value = parseFloat(value);
	      if (!isFinite(value) || !value && value !== 0) return '';
	      _currency = _currency != null ? _currency : '$';
	      decimals = decimals != null ? decimals : 2;
	      var stringified = Math.abs(value).toFixed(decimals);
	      var _int = decimals ? stringified.slice(0, -1 - decimals) : stringified;
	      var i = _int.length % 3;
	      var head = i > 0 ? _int.slice(0, i) + (_int.length > 3 ? ',' : '') : '';
	      var _float = decimals ? stringified.slice(-1 - decimals) : '';
	      var sign = value < 0 ? '-' : '';
	      return sign + _currency + head + _int.slice(i).replace(digitsRE, '$1,') + _float;
	    },
	
	    /**
	     * 'item' => 'items'
	     *
	     * @params
	     *  an array of strings corresponding to
	     *  the single, double, triple ... forms of the word to
	     *  be pluralized. When the number to be pluralized
	     *  exceeds the length of the args, it will use the last
	     *  entry in the array.
	     *
	     *  e.g. ['single', 'double', 'triple', 'multiple']
	     */
	
	    pluralize: function pluralize(value) {
	      var args = toArray(arguments, 1);
	      return args.length > 1 ? args[value % 10 - 1] || args[args.length - 1] : args[0] + (value === 1 ? '' : 's');
	    },
	
	    /**
	     * Debounce a handler function.
	     *
	     * @param {Function} handler
	     * @param {Number} delay = 300
	     * @return {Function}
	     */
	
	    debounce: function debounce(handler, delay) {
	      if (!handler) return;
	      if (!delay) {
	        delay = 300;
	      }
	      return _debounce(handler, delay);
	    }
	  };
	
	  function installGlobalAPI (Vue) {
	    /**
	     * Vue and every constructor that extends Vue has an
	     * associated options object, which can be accessed during
	     * compilation steps as `this.constructor.options`.
	     *
	     * These can be seen as the default options of every
	     * Vue instance.
	     */
	
	    Vue.options = {
	      directives: directives,
	      elementDirectives: elementDirectives,
	      filters: filters,
	      transitions: {},
	      components: {},
	      partials: {},
	      replace: true
	    };
	
	    /**
	     * Expose useful internals
	     */
	
	    Vue.util = util;
	    Vue.config = config;
	    Vue.set = set;
	    Vue['delete'] = del;
	    Vue.nextTick = nextTick;
	
	    /**
	     * The following are exposed for advanced usage / plugins
	     */
	
	    Vue.compiler = compiler;
	    Vue.FragmentFactory = FragmentFactory;
	    Vue.internalDirectives = internalDirectives;
	    Vue.parsers = {
	      path: path,
	      text: text,
	      template: template,
	      directive: directive,
	      expression: expression
	    };
	
	    /**
	     * Each instance constructor, including Vue, has a unique
	     * cid. This enables us to create wrapped "child
	     * constructors" for prototypal inheritance and cache them.
	     */
	
	    Vue.cid = 0;
	    var cid = 1;
	
	    /**
	     * Class inheritance
	     *
	     * @param {Object} extendOptions
	     */
	
	    Vue.extend = function (extendOptions) {
	      extendOptions = extendOptions || {};
	      var Super = this;
	      var isFirstExtend = Super.cid === 0;
	      if (isFirstExtend && extendOptions._Ctor) {
	        return extendOptions._Ctor;
	      }
	      var name = extendOptions.name || Super.options.name;
	      if (true) {
	        if (!/^[a-zA-Z][\w-]*$/.test(name)) {
	          warn('Invalid component name: "' + name + '". Component names ' + 'can only contain alphanumeric characaters and the hyphen.');
	          name = null;
	        }
	      }
	      var Sub = createClass(name || 'VueComponent');
	      Sub.prototype = Object.create(Super.prototype);
	      Sub.prototype.constructor = Sub;
	      Sub.cid = cid++;
	      Sub.options = mergeOptions(Super.options, extendOptions);
	      Sub['super'] = Super;
	      // allow further extension
	      Sub.extend = Super.extend;
	      // create asset registers, so extended classes
	      // can have their private assets too.
	      config._assetTypes.forEach(function (type) {
	        Sub[type] = Super[type];
	      });
	      // enable recursive self-lookup
	      if (name) {
	        Sub.options.components[name] = Sub;
	      }
	      // cache constructor
	      if (isFirstExtend) {
	        extendOptions._Ctor = Sub;
	      }
	      return Sub;
	    };
	
	    /**
	     * A function that returns a sub-class constructor with the
	     * given name. This gives us much nicer output when
	     * logging instances in the console.
	     *
	     * @param {String} name
	     * @return {Function}
	     */
	
	    function createClass(name) {
	      /* eslint-disable no-new-func */
	      return new Function('return function ' + classify(name) + ' (options) { this._init(options) }')();
	      /* eslint-enable no-new-func */
	    }
	
	    /**
	     * Plugin system
	     *
	     * @param {Object} plugin
	     */
	
	    Vue.use = function (plugin) {
	      /* istanbul ignore if */
	      if (plugin.installed) {
	        return;
	      }
	      // additional parameters
	      var args = toArray(arguments, 1);
	      args.unshift(this);
	      if (typeof plugin.install === 'function') {
	        plugin.install.apply(plugin, args);
	      } else {
	        plugin.apply(null, args);
	      }
	      plugin.installed = true;
	      return this;
	    };
	
	    /**
	     * Apply a global mixin by merging it into the default
	     * options.
	     */
	
	    Vue.mixin = function (mixin) {
	      Vue.options = mergeOptions(Vue.options, mixin);
	    };
	
	    /**
	     * Create asset registration methods with the following
	     * signature:
	     *
	     * @param {String} id
	     * @param {*} definition
	     */
	
	    config._assetTypes.forEach(function (type) {
	      Vue[type] = function (id, definition) {
	        if (!definition) {
	          return this.options[type + 's'][id];
	        } else {
	          /* istanbul ignore if */
	          if (true) {
	            if (type === 'component' && (commonTagRE.test(id) || reservedTagRE.test(id))) {
	              warn('Do not use built-in or reserved HTML elements as component ' + 'id: ' + id);
	            }
	          }
	          if (type === 'component' && isPlainObject(definition)) {
	            definition.name = id;
	            definition = Vue.extend(definition);
	          }
	          this.options[type + 's'][id] = definition;
	          return definition;
	        }
	      };
	    });
	
	    // expose internal transition API
	    extend(Vue.transition, transition);
	  }
	
	  installGlobalAPI(Vue);
	
	  Vue.version = '1.0.24';
	
	  // devtools global hook
	  /* istanbul ignore next */
	  setTimeout(function () {
	    if (config.devtools) {
	      if (devtools) {
	        devtools.emit('init', Vue);
	      } else if ('development' !== 'production' && inBrowser && /Chrome\/\d+/.test(window.navigator.userAgent)) {
	        console.log('Download the Vue Devtools for a better development experience:\n' + 'https://github.com/vuejs/vue-devtools');
	      }
	    }
	  }, 0);
	
	  return Vue;
	
	}));
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }()), __webpack_require__(2)))

/***/ }
]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9qcy9kZW1vLmpzIiwid2VicGFjazovLy8uL2RlcC9WdWUuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVM7QUFDVDtBQUNBLDhCQUE2QixrQkFBa0I7QUFDL0M7QUFDQSxVQUFTO0FBQ1Q7QUFDQTtBQUNBLFVBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQSxFQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFDLEU7Ozs7Ozs7QUN2REQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBQyxvQkFBb0I7O0FBRXJCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsY0FBYSxPQUFPO0FBQ3BCLGNBQWEsT0FBTztBQUNwQjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYSxPQUFPO0FBQ3BCLGNBQWEsT0FBTztBQUNwQixlQUFjO0FBQ2Q7O0FBRUE7QUFDQTtBQUNBOztB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O0FBQ0EsTUFBSztBQUNMO0FBQ0E7QUFDQSxpQkFBZ0I7QUFDaEI7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYSxFQUFFO0FBQ2YsY0FBYSxFQUFFO0FBQ2YsY0FBYSxJQUFJO0FBQ2pCOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxJQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWEsT0FBTztBQUNwQjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0NBQXFDLE9BQU87QUFDNUM7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Q2hDLHlCQUF3QixRQUFRO0FBQ2hDLHlCQUF3QixRQUFRO0FBQ2hDLHlCQUF3QixTQUFTO0FBQ2pDLHlCQUF3QixTQUFTO0FBQ2pDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVCQUFzQjtBQUN0QjtBQUNBLDRCQUEyQjtBQUMzQjtBQUNBO0FBQ0E7QUFDQTtBQUNBLDJCQUEwQjtBQUMxQjtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsY0FBYSxFQUFFO0FBQ2Y7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBUztBQUNUO0FBQ0E7QUFDQSxRQUFPO0FBQ1A7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGNBQWEsSUFBSTtBQUNqQjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYSxRQUFRO0FBQ3JCOztBQUVBO0FBQ0E7QUFDQTtBQUNBLE1BQUs7QUFDTDtBQUNBLE1BQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdUJBQXNCO0FBQ3RCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFXO0FBQ1g7QUFDQTtBQUNBLGNBQWE7QUFDYjtBQUNBO0FBQ0EsVUFBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWEsRUFBRTtBQUNmOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQSxNQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYSxLQUFLO0FBQ2xCLGVBQWM7QUFDZDs7QUFFQTtB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RTtBQUNmLGNBQWEsT0FBTztBQUNwQjs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQU87QUFDUDtBQUNBO0FBQ0E7QUFDQSxNQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQU87QUFDUDtBQUNBO0FBQ0EsTUFBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBLFFBQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBUztBQUNUOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFTO0FBQ1Q7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFTO0FBQ1Q7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBUztBQUNUOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBSzs7QUFFTDtBQUNBO0FBQ0EsTUFBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsTUFBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGNBQWEsY0FBYztBQUMzQixjQUFhLFFBQVE7QUFDckIsY0FBYSxRQUFRO0FBQ3JCLGVBQWM7QUFDZDs7QUFFQTtBQUNBO0FBQ0E7QUFDQSwyQ0FBMEMsT0FBTztBQUNqRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYSxNQUFNO0FBQ25CLGNBQWEsRUFBRTtBQUNmOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFXO0FBQ1g7QUFDQTtBQUNBLFVBQVM7QUFDVDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBTztBQUNQO0FBQ0E7QUFDQSxVQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQU87QUFDUDtBQUNBLFFBQU87QUFDUDtBQUNBLFFBQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQUs7O0FBRUw7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQU87QUFDUDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsUUFBTztBQUNQO0FBQ0E7QUFDQSxNQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxpQ0FBZ0M7QUFDaEM7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsUUFBTztBQUNQLGtEQUFpRDtBQUNqRCxRQUFPO0FBQ1Asc0NBQXFDO0FBQ3JDO0FBQ0EsTUFBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQSxpREFBZ0Q7QUFDaEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQUs7O0FBRUw7QUFDQTtBQUNBLHlCQUF3QjtBQUN4QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBUztBQUNUO0FBQ0E7QUFDQSxRQUFPO0FBQ1A7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWEsT0FBTztBQUNwQixlQUFjO0FBQ2Q7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWEsT0FBTztBQUNwQixlQUFjO0FBQ2Q7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBTztBQUNQLHNDQUFxQztBQUNyQztBQUNBLE1BQUs7O0FBRUw7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFTO0FBQ1Q7QUFDQSxVQUFTO0FBQ1Q7QUFDQTtBQUNBLFFBQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNB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O0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFLO0FBQ0wsSUFBRztBQUNIO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFhLFFBQVE7QUFDckIsY0FBYSxPQUFPO0FBQ3BCLGNBQWEsT0FBTztBQUNwQixjQUFhLElBQUk7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBb0I7QUFDcEI7QUFDQSxNQUFLO0FBQ0w7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYSxTQUFTO0FBQ3RCLGNBQWEsU0FBUztBQUN0Qjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBTztBQUNQO0FBQ0EsUUFBTztBQUNQO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYSxTQUFTO0FBQ3RCLGNBQWEsU0FBUztBQUN0Qjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBTztBQUNQO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBSztBQUNMO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGNBQWEsT0FBTztBQUNwQjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFhLE9BQU87QUFDcEI7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYSxPQUFPO0FBQ3BCLGVBQWM7QUFDZDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxjQUFhLE9BQU87QUFDcEIsY0FBYSxTQUFTO0FBQ3RCOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWEsUUFBUTtBQUNyQixlQUFjO0FBQ2Q7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBSztBQUNMO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYSx5QkFBeUI7QUFDdEMsY0FBYSxPQUFPO0FBQ3BCLGNBQWEsUUFBUTtBQUNyQixlQUFjO0FBQ2Q7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0JBQWUsSUFBSTtBQUNuQixnQkFBZSx5QkFBeUI7QUFDeEMsZ0JBQWUsSUFBSTtBQUNuQixnQkFBZSxPQUFPO0FBQ3RCLGdCQUFlLFNBQVM7QUFDeEIsaUJBQWdCO0FBQ2hCOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBTztBQUNQO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWEsU0FBUztBQUN0QixjQUFhLElBQUk7QUFDakI7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQ0FBb0MsT0FBTztBQUMzQztBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxjQUFhLE9BQU87QUFDcEIsY0FBYSxPQUFPO0FBQ3BCOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWEsSUFBSTtBQUNqQixjQUFhLE1BQU07QUFDbkIsY0FBYSxJQUFJO0FBQ2pCLGNBQWEsTUFBTTtBQUNuQixlQUFjO0FBQ2Q7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxjQUFhLElBQUk7QUFDakIsY0FBYSxNQUFNO0FBQ25CLGNBQWEsUUFBUTtBQUNyQjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsY0FBYSxJQUFJO0FBQ2pCLGNBQWEsUUFBUTtBQUNyQixjQUFhLE9BQU87QUFDcEIsY0FBYSxPQUFPO0FBQ3BCLGVBQWM7QUFDZDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWEsUUFBUTtBQUNyQixjQUFhLE9BQU87QUFDcEIsY0FBYSxPQUFPO0FBQ3BCLGVBQWM7QUFDZDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBTztBQUNQO0FBQ0E7QUFDQTtBQUNBLE1BQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBTztBQUNQO0FBQ0EsUUFBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVM7QUFDVDs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxRQUFPOztBQUVQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFhLEtBQUs7QUFDbEIsY0FBYSxPQUFPO0FBQ3BCLGVBQWM7QUFDZDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQUs7QUFDTDtBQUNBLE1BQUs7QUFDTDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsY0FBYSxRQUFRO0FBQ3JCLGNBQWEsT0FBTztBQUNwQixlQUFjO0FBQ2Q7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxjQUFhLFNBQVM7QUFDdEIsY0FBYSxPQUFPO0FBQ3BCLGVBQWMsY0FBYztBQUM1Qjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSx1Q0FBc0MsT0FBTztBQUM3QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsY0FBYSxJQUFJO0FBQ2pCLGNBQWEsS0FBSztBQUNsQjs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsY0FBYSxPQUFPO0FBQ3BCLGNBQWEsT0FBTztBQUNwQixlQUFjO0FBQ2Q7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsUUFBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGNBQWEsY0FBYztBQUMzQixjQUFhLGlCQUFpQjtBQUM5Qjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EseUNBQXdDLE9BQU87QUFDL0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWE7QUFDYjtBQUNBO0FBQ0EsWUFBVztBQUNYO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGNBQWEsU0FBUztBQUN0QixjQUFhLE9BQU87QUFDcEIsZUFBYztBQUNkOztBQUVBO0FBQ0E7QUFDQTtBQUNBLHlDQUF3QyxPQUFPO0FBQy9DO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGNBQWEsZ0JBQWdCO0FBQzdCLGVBQWMsU0FBUztBQUN2Qjs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxpREFBZ0QsT0FBTztBQUN2RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYSxRQUFRO0FBQ3JCLGNBQWEsT0FBTztBQUNwQjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWEsUUFBUTtBQUNyQixjQUFhLE9BQU87QUFDcEIsZUFBYztBQUNkOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFhLFFBQVE7QUFDckIsY0FBYSxNQUFNO0FBQ25CLGNBQWEsT0FBTztBQUNwQixlQUFjLFNBQVM7QUFDdkI7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0Esc0NBQXFDLE9BQU87QUFDNUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFhLFFBQVE7QUFDckIsY0FBYSxPQUFPO0FBQ3BCLGNBQWEsT0FBTztBQUNwQixjQUFhLE9BQU87QUFDcEIsY0FBYSxPQUFPO0FBQ3BCLGNBQWEsT0FBTztBQUNwQixjQUFhLE9BQU87QUFDcEIsY0FBYSxPQUFPO0FBQ3BCLGVBQWMsU0FBUztBQUN2Qjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxjQUFhLG1CQUFtQjtBQUNoQyxjQUFhLE9BQU87QUFDcEIsZUFBYztBQUNkOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBVztBQUNYO0FBQ0E7QUFDQTtBQUNBLFFBQU87O0FBRVA7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFTOztBQUVUO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBVzs7QUFFWDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0JBQWU7QUFDZjtBQUNBO0FBQ0E7QUFDQSxjQUFhOztBQUViO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxnQkFBZSxPQUFPO0FBQ3RCLGdCQUFlLGdCQUFnQjtBQUMvQixnQkFBZSxNQUFNO0FBQ3JCOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFPO0FBQ1A7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsY0FBYSxPQUFPO0FBQ3BCLGVBQWM7QUFDZDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGNBQWEsTUFBTTtBQUNuQixlQUFjLFNBQVM7QUFDdkI7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGNBQWEsTUFBTTtBQUNuQixlQUFjO0FBQ2Q7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWEsUUFBUTtBQUNyQixjQUFhLE9BQU87QUFDcEIsZUFBYztBQUNkOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFhLFFBQVE7QUFDckIsY0FBYSxPQUFPO0FBQ3BCLGVBQWM7QUFDZDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQU87QUFDUDtBQUNBO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYSxRQUFRO0FBQ3JCLGVBQWM7QUFDZDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYSxRQUFRO0FBQ3JCLGNBQWEsUUFBUTtBQUNyQjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFPO0FBQ1A7QUFDQTtBQUNBLFVBQVM7QUFDVDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYSx5QkFBeUI7QUFDdEMsY0FBYSxRQUFRO0FBQ3JCLGNBQWEsSUFBSTtBQUNqQjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpREFBZ0QsT0FBTztBQUN2RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsY0FBYSxTQUFTO0FBQ3RCLGVBQWM7QUFDZDs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxzQ0FBcUMsT0FBTztBQUM1QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7QUFJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxRQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBUztBQUNULHFKQUFvSjtBQUNwSjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGdCQUFlLE9BQU87QUFDdEI7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdCQUFlLE9BQU87QUFDdEI7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBVztBQUNYO0FBQ0E7QUFDQTtBQUNBLFVBQVM7QUFDVDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGdCQUFlLE9BQU87QUFDdEI7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxpREFBZ0QsT0FBTztBQUN2RCx3Q0FBdUM7QUFDdkM7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxRQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsZ0JBQWUsSUFBSTtBQUNuQixnQkFBZSxRQUFRO0FBQ3ZCOztBQUVBO0FBQ0E7QUFDQTtBQUNBLHdDQUF1QyxPQUFPO0FBQzlDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGdCQUFlLElBQUk7QUFDbkIsZ0JBQWUsT0FBTztBQUN0QixnQkFBZSxPQUFPO0FBQ3RCOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDJDQUEwQyxPQUFPO0FBQ2pEO0FBQ0E7QUFDQSxVQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsZ0JBQWUsSUFBSTtBQUNuQixnQkFBZSxPQUFPO0FBQ3RCLGdCQUFlLE9BQU87QUFDdEIsZ0JBQWUsdUJBQXVCO0FBQ3RDLGdCQUFlLE9BQU87QUFDdEI7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFTO0FBQ1Q7QUFDQTtBQUNBLFFBQU87QUFDUDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsZ0JBQWUsSUFBSTtBQUNuQjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsZ0JBQWUsSUFBSTtBQUNuQjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGdCQUFlLE9BQU87QUFDdEI7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSw2Q0FBNEMsT0FBTztBQUNuRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYSxPQUFPO0FBQ3BCLHlCQUF3QixPQUFPO0FBQy9CLHlCQUF3QixPQUFPO0FBQy9CLHlCQUF3QixPQUFPO0FBQy9CLHlCQUF3QixjQUFjO0FBQ3RDLHlCQUF3QixPQUFPO0FBQy9CLHlCQUF3QixRQUFRO0FBQ2hDLHlCQUF3QixPQUFPO0FBQy9CLHlCQUF3QixPQUFPO0FBQy9CLHlCQUF3QixPQUFPO0FBQy9CLHlCQUF3QixPQUFPO0FBQy9CLHlCQUF3QixjQUFjO0FBQ3RDLHlCQUF3QixRQUFRO0FBQ2hDLGNBQWEsSUFBSTtBQUNqQixjQUFhLEtBQUs7QUFDbEIsY0FBYSxJQUFJO0FBQ2pCLGNBQWEsT0FBTztBQUNwQixjQUFhLFNBQVM7QUFDdEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLE1BQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBTztBQUNQO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsY0FBYSxPQUFPO0FBQ3BCLGNBQWEsT0FBTztBQUNwQjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFPO0FBQ1A7QUFDQTtBQUNBLE1BQUs7QUFDTDtBQUNBO0FBQ0EsTUFBSyxFQUFFO0FBQ1A7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGVBQWM7QUFDZDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFhLEVBQUU7QUFDZjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFPO0FBQ1AsTUFBSztBQUNMO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWEsU0FBUztBQUN0Qjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWEsT0FBTztBQUNwQixjQUFhLFNBQVM7QUFDdEIsY0FBYSxRQUFRO0FBQ3JCOztBQUVBO0FBQ0EsNkNBQTRDO0FBQzVDOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnQkFBZSxRQUFRO0FBQ3ZCOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0JBQWUsUUFBUTtBQUN2Qjs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSx1Q0FBc0M7QUFDdEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnQkFBZSxRQUFRO0FBQ3ZCOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsZ0JBQWUsT0FBTztBQUN0QixnQkFBZSxLQUFLO0FBQ3BCLGdCQUFlLElBQUk7QUFDbkIsZ0JBQWUsT0FBTztBQUN0QixnQkFBZSxTQUFTO0FBQ3hCOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdCQUFlLFFBQVE7QUFDdkIsZ0JBQWUsUUFBUTtBQUN2QjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7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QTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGdCQUFlLE9BQU87QUFDdEI7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0JBQWUsT0FBTztBQUN0QixpQkFBZ0I7QUFDaEI7O0FBRUE7QUFDQTtBQUNBLDhFQUE2RSxzQkFBc0I7QUFDbkc7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxnQkFBZSxPQUFPO0FBQ3RCOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0JBQWUsT0FBTztBQUN0QixnQkFBZSxFQUFFO0FBQ2pCOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFLOztBQUVMO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0EsSUFBRzs7QUFFSDs7QUFFQSxFQUFDLEciLCJmaWxlIjoiZGVtby5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxyXG4gKiBDcmVhdGVkIGJ5IGh1bW9ySGFuIG9uIDIwMTYvNy80LlxyXG4gKi9cclxudmFyIHZlID0gbmV3IFZ1ZSh7XHJcbiAgICBlbDogJyNkZW1vJyxcclxuICAgIGRhdGE6IHtcclxuICAgICAgICBtZXNzYWdlOiAnaGVsbG8gdnVlLWRlbW8hJyxcclxuICAgICAgICB0b2RvczogW1xyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB0ZXh0OiAnQWRkIHNvbWUgdG9kb3MnXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICBdLFxyXG4gICAgICAgIGlzVHJ1ZTogJ3RydWUnLFxyXG4gICAgICAgIGZpcnN0TmFtZTonbGknLFxyXG4gICAgICAgIG5hbWU6JyB5dWFuIGZhbmcnLFxyXG4gICAgICAgIHRvdGFsOiAnbGkgeXVhbiBmYW5nJ1xyXG4gICAgfSxcclxuICAgIG1ldGhvZHM6IHtcclxuICAgICAgICBjaGFuZ2VNZXNzYWdlOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHRoaXMubWVzc2FnZSA9IHRoaXMubWVzc2FnZS5zcGxpdCgnJykucmV2ZXJzZSgpLmpvaW4oJycpO1xyXG4gICAgICAgICAgICB0aGlzLnRvZG9zID0gdGhpcy50b2Rvcy5yZXZlcnNlKCk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBhZGQ6IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgIHRoaXMudG9kb3MucHVzaCh7dGV4dDp0aGlzLm1lc3NhZ2V9KTtcclxuICAgICAgICAgICAgdGhpcy5pc1RydWUgPSBmYWxzZTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIGRlbGV0ZUxpc3Q6IGZ1bmN0aW9uKGluZGV4KXtcclxuICAgICAgICAgICAgdGhpcy50b2Rvcy5zcGxpY2UoaW5kZXgsIDEpO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgY2hhbmdlVHJ1ZUZhbHNlOiBmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICB0aGlzLmlzVHJ1ZSA9IHRoaXMuaXNUcnVlID8gZmFsc2UgOiB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufSk7XHJcbi8vJHdhdGNoIO+/ve+/ve+/ve+/ve+/ve+/vdax77+977+977+977+9Y29tcHV0ZWRcclxudmUuJHdhdGNoKCdmaXJzdE5hbWUnLCBmdW5jdGlvbiAodmFsKSB7XHJcbiAgICB0aGlzLnRvdGFsID0gdmFsICsgJyAnICsgdGhpcy5uYW1lXHJcbn0pO1xyXG5cclxuLy9leGFtcGxlXHJcbnZhciBleGFtcGxlID0gbmV3IFZ1ZSh7XHJcbiAgICBlbDogJyNleGFtcGxlJyxcclxuICAgIGRhdGE6IHtcclxuICAgICAgICBhOiAxLFxyXG4gICAgICAgIGI6IDJcclxuICAgIH0sXHJcbiAgICAvL2NvbXB1dGVk77+977+9ICAg77+977+977+977+9ICAg77+977+977+94bG777+977+977+977+977+977+9ZGF0Ye+/ve+/vSDvv73vv73vv73Usu+/ve+/ve+/vVxyXG4gICAgY29tcHV0ZWQ6IHtcclxuICAgICAgICAvLyDSu++/ve+/ve+/ve+/ve+/ve+/ve+/ve+/ve+/vdS177+9IGdldHRlclxyXG4gICAgICAgIGM6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgLy8gYHRoaXNgINa477+977+9IHZtIMq177+977+9XHJcbiAgICAgICAgICAgIHRoaXMuZmlyc3ROYW1lID0gJ2FzZCc7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmEgKyAxMFxyXG4gICAgICAgIH1cclxuICAgIH1cclxufSk7XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL2pzL2RlbW8uanNcbiAqKiBtb2R1bGUgaWQgPSAxXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIvKiFcbiAqIFZ1ZS5qcyB2MS4wLjI0XG4gKiAoYykgMjAxNiBFdmFuIFlvdVxuICogUmVsZWFzZWQgdW5kZXIgdGhlIE1JVCBMaWNlbnNlLlxuICovXG4oZnVuY3Rpb24gKGdsb2JhbCwgZmFjdG9yeSkge1xuICB0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIG1vZHVsZSAhPT0gJ3VuZGVmaW5lZCcgPyBtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkoKSA6XG4gIHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZCA/IGRlZmluZShmYWN0b3J5KSA6XG4gIChnbG9iYWwuVnVlID0gZmFjdG9yeSgpKTtcbn0odGhpcywgZnVuY3Rpb24gKCkgeyAndXNlIHN0cmljdCc7XG5cbiAgZnVuY3Rpb24gc2V0KG9iaiwga2V5LCB2YWwpIHtcbiAgICBpZiAoaGFzT3duKG9iaiwga2V5KSkge1xuICAgICAgb2JqW2tleV0gPSB2YWw7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGlmIChvYmouX2lzVnVlKSB7XG4gICAgICBzZXQob2JqLl9kYXRhLCBrZXksIHZhbCk7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHZhciBvYiA9IG9iai5fX29iX187XG4gICAgaWYgKCFvYikge1xuICAgICAgb2JqW2tleV0gPSB2YWw7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIG9iLmNvbnZlcnQoa2V5LCB2YWwpO1xuICAgIG9iLmRlcC5ub3RpZnkoKTtcbiAgICBpZiAob2Iudm1zKSB7XG4gICAgICB2YXIgaSA9IG9iLnZtcy5sZW5ndGg7XG4gICAgICB3aGlsZSAoaS0tKSB7XG4gICAgICAgIHZhciB2bSA9IG9iLnZtc1tpXTtcbiAgICAgICAgdm0uX3Byb3h5KGtleSk7XG4gICAgICAgIHZtLl9kaWdlc3QoKTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHZhbDtcbiAgfVxuXG4gIC8qKlxuICAgKiBEZWxldGUgYSBwcm9wZXJ0eSBhbmQgdHJpZ2dlciBjaGFuZ2UgaWYgbmVjZXNzYXJ5LlxuICAgKlxuICAgKiBAcGFyYW0ge09iamVjdH0gb2JqXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBrZXlcbiAgICovXG5cbiAgZnVuY3Rpb24gZGVsKG9iaiwga2V5KSB7XG4gICAgaWYgKCFoYXNPd24ob2JqLCBrZXkpKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGRlbGV0ZSBvYmpba2V5XTtcbiAgICB2YXIgb2IgPSBvYmouX19vYl9fO1xuICAgIGlmICghb2IpIHtcbiAgICAgIGlmIChvYmouX2lzVnVlKSB7XG4gICAgICAgIGRlbGV0ZSBvYmouX2RhdGFba2V5XTtcbiAgICAgICAgb2JqLl9kaWdlc3QoKTtcbiAgICAgIH1cbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgb2IuZGVwLm5vdGlmeSgpO1xuICAgIGlmIChvYi52bXMpIHtcbiAgICAgIHZhciBpID0gb2Iudm1zLmxlbmd0aDtcbiAgICAgIHdoaWxlIChpLS0pIHtcbiAgICAgICAgdmFyIHZtID0gb2Iudm1zW2ldO1xuICAgICAgICB2bS5fdW5wcm94eShrZXkpO1xuICAgICAgICB2bS5fZGlnZXN0KCk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgdmFyIGhhc093blByb3BlcnR5ID0gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eTtcbiAgLyoqXG4gICAqIENoZWNrIHdoZXRoZXIgdGhlIG9iamVjdCBoYXMgdGhlIHByb3BlcnR5LlxuICAgKlxuICAgKiBAcGFyYW0ge09iamVjdH0gb2JqXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBrZXlcbiAgICogQHJldHVybiB7Qm9vbGVhbn1cbiAgICovXG5cbiAgZnVuY3Rpb24gaGFzT3duKG9iaiwga2V5KSB7XG4gICAgcmV0dXJuIGhhc093blByb3BlcnR5LmNhbGwob2JqLCBrZXkpO1xuICB9XG5cbiAgLyoqXG4gICAqIENoZWNrIGlmIGFuIGV4cHJlc3Npb24gaXMgYSBsaXRlcmFsIHZhbHVlLlxuICAgKlxuICAgKiBAcGFyYW0ge1N0cmluZ30gZXhwXG4gICAqIEByZXR1cm4ge0Jvb2xlYW59XG4gICAqL1xuXG4gIHZhciBsaXRlcmFsVmFsdWVSRSA9IC9eXFxzPyh0cnVlfGZhbHNlfC0/W1xcZFxcLl0rfCdbXiddKid8XCJbXlwiXSpcIilcXHM/JC87XG5cbiAgZnVuY3Rpb24gaXNMaXRlcmFsKGV4cCkge1xuICAgIHJldHVybiBsaXRlcmFsVmFsdWVSRS50ZXN0KGV4cCk7XG4gIH1cblxuICAvKipcbiAgICogQ2hlY2sgaWYgYSBzdHJpbmcgc3RhcnRzIHdpdGggJCBvciBfXG4gICAqXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBzdHJcbiAgICogQHJldHVybiB7Qm9vbGVhbn1cbiAgICovXG5cbiAgZnVuY3Rpb24gaXNSZXNlcnZlZChzdHIpIHtcbiAgICB2YXIgYyA9IChzdHIgKyAnJykuY2hhckNvZGVBdCgwKTtcbiAgICByZXR1cm4gYyA9PT0gMHgyNCB8fCBjID09PSAweDVGO1xuICB9XG5cbiAgLyoqXG4gICAqIEd1YXJkIHRleHQgb3V0cHV0LCBtYWtlIHN1cmUgdW5kZWZpbmVkIG91dHB1dHNcbiAgICogZW1wdHkgc3RyaW5nXG4gICAqXG4gICAqIEBwYXJhbSB7Kn0gdmFsdWVcbiAgICogQHJldHVybiB7U3RyaW5nfVxuICAgKi9cblxuICBmdW5jdGlvbiBfdG9TdHJpbmcodmFsdWUpIHtcbiAgICByZXR1cm4gdmFsdWUgPT0gbnVsbCA/ICcnIDogdmFsdWUudG9TdHJpbmcoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDaGVjayBhbmQgY29udmVydCBwb3NzaWJsZSBudW1lcmljIHN0cmluZ3MgdG8gbnVtYmVyc1xuICAgKiBiZWZvcmUgc2V0dGluZyBiYWNrIHRvIGRhdGFcbiAgICpcbiAgICogQHBhcmFtIHsqfSB2YWx1ZVxuICAgKiBAcmV0dXJuIHsqfE51bWJlcn1cbiAgICovXG5cbiAgZnVuY3Rpb24gdG9OdW1iZXIodmFsdWUpIHtcbiAgICBpZiAodHlwZW9mIHZhbHVlICE9PSAnc3RyaW5nJykge1xuICAgICAgcmV0dXJuIHZhbHVlO1xuICAgIH0gZWxzZSB7XG4gICAgICB2YXIgcGFyc2VkID0gTnVtYmVyKHZhbHVlKTtcbiAgICAgIHJldHVybiBpc05hTihwYXJzZWQpID8gdmFsdWUgOiBwYXJzZWQ7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIENvbnZlcnQgc3RyaW5nIGJvb2xlYW4gbGl0ZXJhbHMgaW50byByZWFsIGJvb2xlYW5zLlxuICAgKlxuICAgKiBAcGFyYW0geyp9IHZhbHVlXG4gICAqIEByZXR1cm4geyp8Qm9vbGVhbn1cbiAgICovXG5cbiAgZnVuY3Rpb24gdG9Cb29sZWFuKHZhbHVlKSB7XG4gICAgcmV0dXJuIHZhbHVlID09PSAndHJ1ZScgPyB0cnVlIDogdmFsdWUgPT09ICdmYWxzZScgPyBmYWxzZSA6IHZhbHVlO1xuICB9XG5cbiAgLyoqXG4gICAqIFN0cmlwIHF1b3RlcyBmcm9tIGEgc3RyaW5nXG4gICAqXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBzdHJcbiAgICogQHJldHVybiB7U3RyaW5nIHwgZmFsc2V9XG4gICAqL1xuXG4gIGZ1bmN0aW9uIHN0cmlwUXVvdGVzKHN0cikge1xuICAgIHZhciBhID0gc3RyLmNoYXJDb2RlQXQoMCk7XG4gICAgdmFyIGIgPSBzdHIuY2hhckNvZGVBdChzdHIubGVuZ3RoIC0gMSk7XG4gICAgcmV0dXJuIGEgPT09IGIgJiYgKGEgPT09IDB4MjIgfHwgYSA9PT0gMHgyNykgPyBzdHIuc2xpY2UoMSwgLTEpIDogc3RyO1xuICB9XG5cbiAgLyoqXG4gICAqIENhbWVsaXplIGEgaHlwaGVuLWRlbG1pdGVkIHN0cmluZy5cbiAgICpcbiAgICogQHBhcmFtIHtTdHJpbmd9IHN0clxuICAgKiBAcmV0dXJuIHtTdHJpbmd9XG4gICAqL1xuXG4gIHZhciBjYW1lbGl6ZVJFID0gLy0oXFx3KS9nO1xuXG4gIGZ1bmN0aW9uIGNhbWVsaXplKHN0cikge1xuICAgIHJldHVybiBzdHIucmVwbGFjZShjYW1lbGl6ZVJFLCB0b1VwcGVyKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHRvVXBwZXIoXywgYykge1xuICAgIHJldHVybiBjID8gYy50b1VwcGVyQ2FzZSgpIDogJyc7XG4gIH1cblxuICAvKipcbiAgICogSHlwaGVuYXRlIGEgY2FtZWxDYXNlIHN0cmluZy5cbiAgICpcbiAgICogQHBhcmFtIHtTdHJpbmd9IHN0clxuICAgKiBAcmV0dXJuIHtTdHJpbmd9XG4gICAqL1xuXG4gIHZhciBoeXBoZW5hdGVSRSA9IC8oW2EtelxcZF0pKFtBLVpdKS9nO1xuXG4gIGZ1bmN0aW9uIGh5cGhlbmF0ZShzdHIpIHtcbiAgICByZXR1cm4gc3RyLnJlcGxhY2UoaHlwaGVuYXRlUkUsICckMS0kMicpLnRvTG93ZXJDYXNlKCk7XG4gIH1cblxuICAvKipcbiAgICogQ29udmVydHMgaHlwaGVuL3VuZGVyc2NvcmUvc2xhc2ggZGVsaW1pdGVyZWQgbmFtZXMgaW50b1xuICAgKiBjYW1lbGl6ZWQgY2xhc3NOYW1lcy5cbiAgICpcbiAgICogZS5nLiBteS1jb21wb25lbnQgPT4gTXlDb21wb25lbnRcbiAgICogICAgICBzb21lX2Vsc2UgICAgPT4gU29tZUVsc2VcbiAgICogICAgICBzb21lL2NvbXAgICAgPT4gU29tZUNvbXBcbiAgICpcbiAgICogQHBhcmFtIHtTdHJpbmd9IHN0clxuICAgKiBAcmV0dXJuIHtTdHJpbmd9XG4gICAqL1xuXG4gIHZhciBjbGFzc2lmeVJFID0gLyg/Ol58Wy1fXFwvXSkoXFx3KS9nO1xuXG4gIGZ1bmN0aW9uIGNsYXNzaWZ5KHN0cikge1xuICAgIHJldHVybiBzdHIucmVwbGFjZShjbGFzc2lmeVJFLCB0b1VwcGVyKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTaW1wbGUgYmluZCwgZmFzdGVyIHRoYW4gbmF0aXZlXG4gICAqXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IGZuXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBjdHhcbiAgICogQHJldHVybiB7RnVuY3Rpb259XG4gICAqL1xuXG4gIGZ1bmN0aW9uIGJpbmQoZm4sIGN0eCkge1xuICAgIHJldHVybiBmdW5jdGlvbiAoYSkge1xuICAgICAgdmFyIGwgPSBhcmd1bWVudHMubGVuZ3RoO1xuICAgICAgcmV0dXJuIGwgPyBsID4gMSA/IGZuLmFwcGx5KGN0eCwgYXJndW1lbnRzKSA6IGZuLmNhbGwoY3R4LCBhKSA6IGZuLmNhbGwoY3R4KTtcbiAgICB9O1xuICB9XG5cbiAgLyoqXG4gICAqIENvbnZlcnQgYW4gQXJyYXktbGlrZSBvYmplY3QgdG8gYSByZWFsIEFycmF5LlxuICAgKlxuICAgKiBAcGFyYW0ge0FycmF5LWxpa2V9IGxpc3RcbiAgICogQHBhcmFtIHtOdW1iZXJ9IFtzdGFydF0gLSBzdGFydCBpbmRleFxuICAgKiBAcmV0dXJuIHtBcnJheX1cbiAgICovXG5cbiAgZnVuY3Rpb24gdG9BcnJheShsaXN0LCBzdGFydCkge1xuICAgIHN0YXJ0ID0gc3RhcnQgfHwgMDtcbiAgICB2YXIgaSA9IGxpc3QubGVuZ3RoIC0gc3RhcnQ7XG4gICAgdmFyIHJldCA9IG5ldyBBcnJheShpKTtcbiAgICB3aGlsZSAoaS0tKSB7XG4gICAgICByZXRbaV0gPSBsaXN0W2kgKyBzdGFydF07XG4gICAgfVxuICAgIHJldHVybiByZXQ7XG4gIH1cblxuICAvKipcbiAgICogTWl4IHByb3BlcnRpZXMgaW50byB0YXJnZXQgb2JqZWN0LlxuICAgKlxuICAgKiBAcGFyYW0ge09iamVjdH0gdG9cbiAgICogQHBhcmFtIHtPYmplY3R9IGZyb21cbiAgICovXG5cbiAgZnVuY3Rpb24gZXh0ZW5kKHRvLCBmcm9tKSB7XG4gICAgdmFyIGtleXMgPSBPYmplY3Qua2V5cyhmcm9tKTtcbiAgICB2YXIgaSA9IGtleXMubGVuZ3RoO1xuICAgIHdoaWxlIChpLS0pIHtcbiAgICAgIHRvW2tleXNbaV1dID0gZnJvbVtrZXlzW2ldXTtcbiAgICB9XG4gICAgcmV0dXJuIHRvO1xuICB9XG5cbiAgLyoqXG4gICAqIFF1aWNrIG9iamVjdCBjaGVjayAtIHRoaXMgaXMgcHJpbWFyaWx5IHVzZWQgdG8gdGVsbFxuICAgKiBPYmplY3RzIGZyb20gcHJpbWl0aXZlIHZhbHVlcyB3aGVuIHdlIGtub3cgdGhlIHZhbHVlXG4gICAqIGlzIGEgSlNPTi1jb21wbGlhbnQgdHlwZS5cbiAgICpcbiAgICogQHBhcmFtIHsqfSBvYmpcbiAgICogQHJldHVybiB7Qm9vbGVhbn1cbiAgICovXG5cbiAgZnVuY3Rpb24gaXNPYmplY3Qob2JqKSB7XG4gICAgcmV0dXJuIG9iaiAhPT0gbnVsbCAmJiB0eXBlb2Ygb2JqID09PSAnb2JqZWN0JztcbiAgfVxuXG4gIC8qKlxuICAgKiBTdHJpY3Qgb2JqZWN0IHR5cGUgY2hlY2suIE9ubHkgcmV0dXJucyB0cnVlXG4gICAqIGZvciBwbGFpbiBKYXZhU2NyaXB0IG9iamVjdHMuXG4gICAqXG4gICAqIEBwYXJhbSB7Kn0gb2JqXG4gICAqIEByZXR1cm4ge0Jvb2xlYW59XG4gICAqL1xuXG4gIHZhciB0b1N0cmluZyA9IE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmc7XG4gIHZhciBPQkpFQ1RfU1RSSU5HID0gJ1tvYmplY3QgT2JqZWN0XSc7XG5cbiAgZnVuY3Rpb24gaXNQbGFpbk9iamVjdChvYmopIHtcbiAgICByZXR1cm4gdG9TdHJpbmcuY2FsbChvYmopID09PSBPQkpFQ1RfU1RSSU5HO1xuICB9XG5cbiAgLyoqXG4gICAqIEFycmF5IHR5cGUgY2hlY2suXG4gICAqXG4gICAqIEBwYXJhbSB7Kn0gb2JqXG4gICAqIEByZXR1cm4ge0Jvb2xlYW59XG4gICAqL1xuXG4gIHZhciBpc0FycmF5ID0gQXJyYXkuaXNBcnJheTtcblxuICAvKipcbiAgICogRGVmaW5lIGEgcHJvcGVydHkuXG4gICAqXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBvYmpcbiAgICogQHBhcmFtIHtTdHJpbmd9IGtleVxuICAgKiBAcGFyYW0geyp9IHZhbFxuICAgKiBAcGFyYW0ge0Jvb2xlYW59IFtlbnVtZXJhYmxlXVxuICAgKi9cblxuICBmdW5jdGlvbiBkZWYob2JqLCBrZXksIHZhbCwgZW51bWVyYWJsZSkge1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvYmosIGtleSwge1xuICAgICAgdmFsdWU6IHZhbCxcbiAgICAgIGVudW1lcmFibGU6ICEhZW51bWVyYWJsZSxcbiAgICAgIHdyaXRhYmxlOiB0cnVlLFxuICAgICAgY29uZmlndXJhYmxlOiB0cnVlXG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogRGVib3VuY2UgYSBmdW5jdGlvbiBzbyBpdCBvbmx5IGdldHMgY2FsbGVkIGFmdGVyIHRoZVxuICAgKiBpbnB1dCBzdG9wcyBhcnJpdmluZyBhZnRlciB0aGUgZ2l2ZW4gd2FpdCBwZXJpb2QuXG4gICAqXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IGZ1bmNcbiAgICogQHBhcmFtIHtOdW1iZXJ9IHdhaXRcbiAgICogQHJldHVybiB7RnVuY3Rpb259IC0gdGhlIGRlYm91bmNlZCBmdW5jdGlvblxuICAgKi9cblxuICBmdW5jdGlvbiBfZGVib3VuY2UoZnVuYywgd2FpdCkge1xuICAgIHZhciB0aW1lb3V0LCBhcmdzLCBjb250ZXh0LCB0aW1lc3RhbXAsIHJlc3VsdDtcbiAgICB2YXIgbGF0ZXIgPSBmdW5jdGlvbiBsYXRlcigpIHtcbiAgICAgIHZhciBsYXN0ID0gRGF0ZS5ub3coKSAtIHRpbWVzdGFtcDtcbiAgICAgIGlmIChsYXN0IDwgd2FpdCAmJiBsYXN0ID49IDApIHtcbiAgICAgICAgdGltZW91dCA9IHNldFRpbWVvdXQobGF0ZXIsIHdhaXQgLSBsYXN0KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRpbWVvdXQgPSBudWxsO1xuICAgICAgICByZXN1bHQgPSBmdW5jLmFwcGx5KGNvbnRleHQsIGFyZ3MpO1xuICAgICAgICBpZiAoIXRpbWVvdXQpIGNvbnRleHQgPSBhcmdzID0gbnVsbDtcbiAgICAgIH1cbiAgICB9O1xuICAgIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgICBjb250ZXh0ID0gdGhpcztcbiAgICAgIGFyZ3MgPSBhcmd1bWVudHM7XG4gICAgICB0aW1lc3RhbXAgPSBEYXRlLm5vdygpO1xuICAgICAgaWYgKCF0aW1lb3V0KSB7XG4gICAgICAgIHRpbWVvdXQgPSBzZXRUaW1lb3V0KGxhdGVyLCB3YWl0KTtcbiAgICAgIH1cbiAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfTtcbiAgfVxuXG4gIC8qKlxuICAgKiBNYW51YWwgaW5kZXhPZiBiZWNhdXNlIGl0J3Mgc2xpZ2h0bHkgZmFzdGVyIHRoYW5cbiAgICogbmF0aXZlLlxuICAgKlxuICAgKiBAcGFyYW0ge0FycmF5fSBhcnJcbiAgICogQHBhcmFtIHsqfSBvYmpcbiAgICovXG5cbiAgZnVuY3Rpb24gaW5kZXhPZihhcnIsIG9iaikge1xuICAgIHZhciBpID0gYXJyLmxlbmd0aDtcbiAgICB3aGlsZSAoaS0tKSB7XG4gICAgICBpZiAoYXJyW2ldID09PSBvYmopIHJldHVybiBpO1xuICAgIH1cbiAgICByZXR1cm4gLTE7XG4gIH1cblxuICAvKipcbiAgICogTWFrZSBhIGNhbmNlbGxhYmxlIHZlcnNpb24gb2YgYW4gYXN5bmMgY2FsbGJhY2suXG4gICAqXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IGZuXG4gICAqIEByZXR1cm4ge0Z1bmN0aW9ufVxuICAgKi9cblxuICBmdW5jdGlvbiBjYW5jZWxsYWJsZShmbikge1xuICAgIHZhciBjYiA9IGZ1bmN0aW9uIGNiKCkge1xuICAgICAgaWYgKCFjYi5jYW5jZWxsZWQpIHtcbiAgICAgICAgcmV0dXJuIGZuLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgICB9XG4gICAgfTtcbiAgICBjYi5jYW5jZWwgPSBmdW5jdGlvbiAoKSB7XG4gICAgICBjYi5jYW5jZWxsZWQgPSB0cnVlO1xuICAgIH07XG4gICAgcmV0dXJuIGNiO1xuICB9XG5cbiAgLyoqXG4gICAqIENoZWNrIGlmIHR3byB2YWx1ZXMgYXJlIGxvb3NlbHkgZXF1YWwgLSB0aGF0IGlzLFxuICAgKiBpZiB0aGV5IGFyZSBwbGFpbiBvYmplY3RzLCBkbyB0aGV5IGhhdmUgdGhlIHNhbWUgc2hhcGU/XG4gICAqXG4gICAqIEBwYXJhbSB7Kn0gYVxuICAgKiBAcGFyYW0geyp9IGJcbiAgICogQHJldHVybiB7Qm9vbGVhbn1cbiAgICovXG5cbiAgZnVuY3Rpb24gbG9vc2VFcXVhbChhLCBiKSB7XG4gICAgLyogZXNsaW50LWRpc2FibGUgZXFlcWVxICovXG4gICAgcmV0dXJuIGEgPT0gYiB8fCAoaXNPYmplY3QoYSkgJiYgaXNPYmplY3QoYikgPyBKU09OLnN0cmluZ2lmeShhKSA9PT0gSlNPTi5zdHJpbmdpZnkoYikgOiBmYWxzZSk7XG4gICAgLyogZXNsaW50LWVuYWJsZSBlcWVxZXEgKi9cbiAgfVxuXG4gIHZhciBoYXNQcm90byA9ICgnX19wcm90b19fJyBpbiB7fSk7XG5cbiAgLy8gQnJvd3NlciBlbnZpcm9ubWVudCBzbmlmZmluZ1xuICB2YXIgaW5Ccm93c2VyID0gdHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcgJiYgT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKHdpbmRvdykgIT09ICdbb2JqZWN0IE9iamVjdF0nO1xuXG4gIC8vIGRldGVjdCBkZXZ0b29sc1xuICB2YXIgZGV2dG9vbHMgPSBpbkJyb3dzZXIgJiYgd2luZG93Ll9fVlVFX0RFVlRPT0xTX0dMT0JBTF9IT09LX187XG5cbiAgLy8gVUEgc25pZmZpbmcgZm9yIHdvcmtpbmcgYXJvdW5kIGJyb3dzZXItc3BlY2lmaWMgcXVpcmtzXG4gIHZhciBVQSA9IGluQnJvd3NlciAmJiB3aW5kb3cubmF2aWdhdG9yLnVzZXJBZ2VudC50b0xvd2VyQ2FzZSgpO1xuICB2YXIgaXNJRTkgPSBVQSAmJiBVQS5pbmRleE9mKCdtc2llIDkuMCcpID4gMDtcbiAgdmFyIGlzQW5kcm9pZCA9IFVBICYmIFVBLmluZGV4T2YoJ2FuZHJvaWQnKSA+IDA7XG4gIHZhciBpc0lvcyA9IFVBICYmIC8oaXBob25lfGlwYWR8aXBvZHxpb3MpL2kudGVzdChVQSk7XG4gIHZhciBpc1dlY2hhdCA9IFVBICYmIFVBLmluZGV4T2YoJ21pY3JvbWVzc2VuZ2VyJykgPiAwO1xuXG4gIHZhciB0cmFuc2l0aW9uUHJvcCA9IHVuZGVmaW5lZDtcbiAgdmFyIHRyYW5zaXRpb25FbmRFdmVudCA9IHVuZGVmaW5lZDtcbiAgdmFyIGFuaW1hdGlvblByb3AgPSB1bmRlZmluZWQ7XG4gIHZhciBhbmltYXRpb25FbmRFdmVudCA9IHVuZGVmaW5lZDtcblxuICAvLyBUcmFuc2l0aW9uIHByb3BlcnR5L2V2ZW50IHNuaWZmaW5nXG4gIGlmIChpbkJyb3dzZXIgJiYgIWlzSUU5KSB7XG4gICAgdmFyIGlzV2Via2l0VHJhbnMgPSB3aW5kb3cub250cmFuc2l0aW9uZW5kID09PSB1bmRlZmluZWQgJiYgd2luZG93Lm9ud2Via2l0dHJhbnNpdGlvbmVuZCAhPT0gdW5kZWZpbmVkO1xuICAgIHZhciBpc1dlYmtpdEFuaW0gPSB3aW5kb3cub25hbmltYXRpb25lbmQgPT09IHVuZGVmaW5lZCAmJiB3aW5kb3cub253ZWJraXRhbmltYXRpb25lbmQgIT09IHVuZGVmaW5lZDtcbiAgICB0cmFuc2l0aW9uUHJvcCA9IGlzV2Via2l0VHJhbnMgPyAnV2Via2l0VHJhbnNpdGlvbicgOiAndHJhbnNpdGlvbic7XG4gICAgdHJhbnNpdGlvbkVuZEV2ZW50ID0gaXNXZWJraXRUcmFucyA/ICd3ZWJraXRUcmFuc2l0aW9uRW5kJyA6ICd0cmFuc2l0aW9uZW5kJztcbiAgICBhbmltYXRpb25Qcm9wID0gaXNXZWJraXRBbmltID8gJ1dlYmtpdEFuaW1hdGlvbicgOiAnYW5pbWF0aW9uJztcbiAgICBhbmltYXRpb25FbmRFdmVudCA9IGlzV2Via2l0QW5pbSA/ICd3ZWJraXRBbmltYXRpb25FbmQnIDogJ2FuaW1hdGlvbmVuZCc7XG4gIH1cblxuICAvKipcbiAgICogRGVmZXIgYSB0YXNrIHRvIGV4ZWN1dGUgaXQgYXN5bmNocm9ub3VzbHkuIElkZWFsbHkgdGhpc1xuICAgKiBzaG91bGQgYmUgZXhlY3V0ZWQgYXMgYSBtaWNyb3Rhc2ssIHNvIHdlIGxldmVyYWdlXG4gICAqIE11dGF0aW9uT2JzZXJ2ZXIgaWYgaXQncyBhdmFpbGFibGUsIGFuZCBmYWxsYmFjayB0b1xuICAgKiBzZXRUaW1lb3V0KDApLlxuICAgKlxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBjYlxuICAgKiBAcGFyYW0ge09iamVjdH0gY3R4XG4gICAqL1xuXG4gIHZhciBuZXh0VGljayA9IChmdW5jdGlvbiAoKSB7XG4gICAgdmFyIGNhbGxiYWNrcyA9IFtdO1xuICAgIHZhciBwZW5kaW5nID0gZmFsc2U7XG4gICAgdmFyIHRpbWVyRnVuYztcbiAgICBmdW5jdGlvbiBuZXh0VGlja0hhbmRsZXIoKSB7XG4gICAgICBwZW5kaW5nID0gZmFsc2U7XG4gICAgICB2YXIgY29waWVzID0gY2FsbGJhY2tzLnNsaWNlKDApO1xuICAgICAgY2FsbGJhY2tzID0gW107XG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGNvcGllcy5sZW5ndGg7IGkrKykge1xuICAgICAgICBjb3BpZXNbaV0oKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgaWYgKi9cbiAgICBpZiAodHlwZW9mIE11dGF0aW9uT2JzZXJ2ZXIgIT09ICd1bmRlZmluZWQnICYmICEoaXNXZWNoYXQgJiYgaXNJb3MpKSB7XG4gICAgICB2YXIgY291bnRlciA9IDE7XG4gICAgICB2YXIgb2JzZXJ2ZXIgPSBuZXcgTXV0YXRpb25PYnNlcnZlcihuZXh0VGlja0hhbmRsZXIpO1xuICAgICAgdmFyIHRleHROb2RlID0gZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoY291bnRlcik7XG4gICAgICBvYnNlcnZlci5vYnNlcnZlKHRleHROb2RlLCB7XG4gICAgICAgIGNoYXJhY3RlckRhdGE6IHRydWVcbiAgICAgIH0pO1xuICAgICAgdGltZXJGdW5jID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBjb3VudGVyID0gKGNvdW50ZXIgKyAxKSAlIDI7XG4gICAgICAgIHRleHROb2RlLmRhdGEgPSBjb3VudGVyO1xuICAgICAgfTtcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gd2VicGFjayBhdHRlbXB0cyB0byBpbmplY3QgYSBzaGltIGZvciBzZXRJbW1lZGlhdGVcbiAgICAgIC8vIGlmIGl0IGlzIHVzZWQgYXMgYSBnbG9iYWwsIHNvIHdlIGhhdmUgdG8gd29yayBhcm91bmQgdGhhdCB0b1xuICAgICAgLy8gYXZvaWQgYnVuZGxpbmcgdW5uZWNlc3NhcnkgY29kZS5cbiAgICAgIHZhciBjb250ZXh0ID0gaW5Ccm93c2VyID8gd2luZG93IDogdHlwZW9mIGdsb2JhbCAhPT0gJ3VuZGVmaW5lZCcgPyBnbG9iYWwgOiB7fTtcbiAgICAgIHRpbWVyRnVuYyA9IGNvbnRleHQuc2V0SW1tZWRpYXRlIHx8IHNldFRpbWVvdXQ7XG4gICAgfVxuICAgIHJldHVybiBmdW5jdGlvbiAoY2IsIGN0eCkge1xuICAgICAgdmFyIGZ1bmMgPSBjdHggPyBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGNiLmNhbGwoY3R4KTtcbiAgICAgIH0gOiBjYjtcbiAgICAgIGNhbGxiYWNrcy5wdXNoKGZ1bmMpO1xuICAgICAgaWYgKHBlbmRpbmcpIHJldHVybjtcbiAgICAgIHBlbmRpbmcgPSB0cnVlO1xuICAgICAgdGltZXJGdW5jKG5leHRUaWNrSGFuZGxlciwgMCk7XG4gICAgfTtcbiAgfSkoKTtcblxuICB2YXIgX1NldCA9IHVuZGVmaW5lZDtcbiAgLyogaXN0YW5idWwgaWdub3JlIGlmICovXG4gIGlmICh0eXBlb2YgU2V0ICE9PSAndW5kZWZpbmVkJyAmJiBTZXQudG9TdHJpbmcoKS5tYXRjaCgvbmF0aXZlIGNvZGUvKSkge1xuICAgIC8vIHVzZSBuYXRpdmUgU2V0IHdoZW4gYXZhaWxhYmxlLlxuICAgIF9TZXQgPSBTZXQ7XG4gIH0gZWxzZSB7XG4gICAgLy8gYSBub24tc3RhbmRhcmQgU2V0IHBvbHlmaWxsIHRoYXQgb25seSB3b3JrcyB3aXRoIHByaW1pdGl2ZSBrZXlzLlxuICAgIF9TZXQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICB0aGlzLnNldCA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gICAgfTtcbiAgICBfU2V0LnByb3RvdHlwZS5oYXMgPSBmdW5jdGlvbiAoa2V5KSB7XG4gICAgICByZXR1cm4gdGhpcy5zZXRba2V5XSAhPT0gdW5kZWZpbmVkO1xuICAgIH07XG4gICAgX1NldC5wcm90b3R5cGUuYWRkID0gZnVuY3Rpb24gKGtleSkge1xuICAgICAgdGhpcy5zZXRba2V5XSA9IDE7XG4gICAgfTtcbiAgICBfU2V0LnByb3RvdHlwZS5jbGVhciA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIHRoaXMuc2V0ID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiAgICB9O1xuICB9XG5cbiAgZnVuY3Rpb24gQ2FjaGUobGltaXQpIHtcbiAgICB0aGlzLnNpemUgPSAwO1xuICAgIHRoaXMubGltaXQgPSBsaW1pdDtcbiAgICB0aGlzLmhlYWQgPSB0aGlzLnRhaWwgPSB1bmRlZmluZWQ7XG4gICAgdGhpcy5fa2V5bWFwID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiAgfVxuXG4gIHZhciBwID0gQ2FjaGUucHJvdG90eXBlO1xuXG4gIC8qKlxuICAgKiBQdXQgPHZhbHVlPiBpbnRvIHRoZSBjYWNoZSBhc3NvY2lhdGVkIHdpdGggPGtleT4uXG4gICAqIFJldHVybnMgdGhlIGVudHJ5IHdoaWNoIHdhcyByZW1vdmVkIHRvIG1ha2Ugcm9vbSBmb3JcbiAgICogdGhlIG5ldyBlbnRyeS4gT3RoZXJ3aXNlIHVuZGVmaW5lZCBpcyByZXR1cm5lZC5cbiAgICogKGkuZS4gaWYgdGhlcmUgd2FzIGVub3VnaCByb29tIGFscmVhZHkpLlxuICAgKlxuICAgKiBAcGFyYW0ge1N0cmluZ30ga2V5XG4gICAqIEBwYXJhbSB7Kn0gdmFsdWVcbiAgICogQHJldHVybiB7RW50cnl8dW5kZWZpbmVkfVxuICAgKi9cblxuICBwLnB1dCA9IGZ1bmN0aW9uIChrZXksIHZhbHVlKSB7XG4gICAgdmFyIHJlbW92ZWQ7XG4gICAgaWYgKHRoaXMuc2l6ZSA9PT0gdGhpcy5saW1pdCkge1xuICAgICAgcmVtb3ZlZCA9IHRoaXMuc2hpZnQoKTtcbiAgICB9XG5cbiAgICB2YXIgZW50cnkgPSB0aGlzLmdldChrZXksIHRydWUpO1xuICAgIGlmICghZW50cnkpIHtcbiAgICAgIGVudHJ5ID0ge1xuICAgICAgICBrZXk6IGtleVxuICAgICAgfTtcbiAgICAgIHRoaXMuX2tleW1hcFtrZXldID0gZW50cnk7XG4gICAgICBpZiAodGhpcy50YWlsKSB7XG4gICAgICAgIHRoaXMudGFpbC5uZXdlciA9IGVudHJ5O1xuICAgICAgICBlbnRyeS5vbGRlciA9IHRoaXMudGFpbDtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuaGVhZCA9IGVudHJ5O1xuICAgICAgfVxuICAgICAgdGhpcy50YWlsID0gZW50cnk7XG4gICAgICB0aGlzLnNpemUrKztcbiAgICB9XG4gICAgZW50cnkudmFsdWUgPSB2YWx1ZTtcblxuICAgIHJldHVybiByZW1vdmVkO1xuICB9O1xuXG4gIC8qKlxuICAgKiBQdXJnZSB0aGUgbGVhc3QgcmVjZW50bHkgdXNlZCAob2xkZXN0KSBlbnRyeSBmcm9tIHRoZVxuICAgKiBjYWNoZS4gUmV0dXJucyB0aGUgcmVtb3ZlZCBlbnRyeSBvciB1bmRlZmluZWQgaWYgdGhlXG4gICAqIGNhY2hlIHdhcyBlbXB0eS5cbiAgICovXG5cbiAgcC5zaGlmdCA9IGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgZW50cnkgPSB0aGlzLmhlYWQ7XG4gICAgaWYgKGVudHJ5KSB7XG4gICAgICB0aGlzLmhlYWQgPSB0aGlzLmhlYWQubmV3ZXI7XG4gICAgICB0aGlzLmhlYWQub2xkZXIgPSB1bmRlZmluZWQ7XG4gICAgICBlbnRyeS5uZXdlciA9IGVudHJ5Lm9sZGVyID0gdW5kZWZpbmVkO1xuICAgICAgdGhpcy5fa2V5bWFwW2VudHJ5LmtleV0gPSB1bmRlZmluZWQ7XG4gICAgICB0aGlzLnNpemUtLTtcbiAgICB9XG4gICAgcmV0dXJuIGVudHJ5O1xuICB9O1xuXG4gIC8qKlxuICAgKiBHZXQgYW5kIHJlZ2lzdGVyIHJlY2VudCB1c2Ugb2YgPGtleT4uIFJldHVybnMgdGhlIHZhbHVlXG4gICAqIGFzc29jaWF0ZWQgd2l0aCA8a2V5PiBvciB1bmRlZmluZWQgaWYgbm90IGluIGNhY2hlLlxuICAgKlxuICAgKiBAcGFyYW0ge1N0cmluZ30ga2V5XG4gICAqIEBwYXJhbSB7Qm9vbGVhbn0gcmV0dXJuRW50cnlcbiAgICogQHJldHVybiB7RW50cnl8Kn1cbiAgICovXG5cbiAgcC5nZXQgPSBmdW5jdGlvbiAoa2V5LCByZXR1cm5FbnRyeSkge1xuICAgIHZhciBlbnRyeSA9IHRoaXMuX2tleW1hcFtrZXldO1xuICAgIGlmIChlbnRyeSA9PT0gdW5kZWZpbmVkKSByZXR1cm47XG4gICAgaWYgKGVudHJ5ID09PSB0aGlzLnRhaWwpIHtcbiAgICAgIHJldHVybiByZXR1cm5FbnRyeSA/IGVudHJ5IDogZW50cnkudmFsdWU7XG4gICAgfVxuICAgIC8vIEhFQUQtLS0tLS0tLS0tLS0tLVRBSUxcbiAgICAvLyAgIDwub2xkZXIgICAubmV3ZXI+XG4gICAgLy8gIDwtLS0gYWRkIGRpcmVjdGlvbiAtLVxuICAgIC8vICAgQSAgQiAgQyAgPEQ+ICBFXG4gICAgaWYgKGVudHJ5Lm5ld2VyKSB7XG4gICAgICBpZiAoZW50cnkgPT09IHRoaXMuaGVhZCkge1xuICAgICAgICB0aGlzLmhlYWQgPSBlbnRyeS5uZXdlcjtcbiAgICAgIH1cbiAgICAgIGVudHJ5Lm5ld2VyLm9sZGVyID0gZW50cnkub2xkZXI7IC8vIEMgPC0tIEUuXG4gICAgfVxuICAgIGlmIChlbnRyeS5vbGRlcikge1xuICAgICAgZW50cnkub2xkZXIubmV3ZXIgPSBlbnRyeS5uZXdlcjsgLy8gQy4gLS0+IEVcbiAgICB9XG4gICAgZW50cnkubmV3ZXIgPSB1bmRlZmluZWQ7IC8vIEQgLS14XG4gICAgZW50cnkub2xkZXIgPSB0aGlzLnRhaWw7IC8vIEQuIC0tPiBFXG4gICAgaWYgKHRoaXMudGFpbCkge1xuICAgICAgdGhpcy50YWlsLm5ld2VyID0gZW50cnk7IC8vIEUuIDwtLSBEXG4gICAgfVxuICAgIHRoaXMudGFpbCA9IGVudHJ5O1xuICAgIHJldHVybiByZXR1cm5FbnRyeSA/IGVudHJ5IDogZW50cnkudmFsdWU7XG4gIH07XG5cbiAgdmFyIGNhY2hlJDEgPSBuZXcgQ2FjaGUoMTAwMCk7XG4gIHZhciBmaWx0ZXJUb2tlblJFID0gL1teXFxzJ1wiXSt8J1teJ10qJ3xcIlteXCJdKlwiL2c7XG4gIHZhciByZXNlcnZlZEFyZ1JFID0gL15pbiR8Xi0/XFxkKy87XG5cbiAgLyoqXG4gICAqIFBhcnNlciBzdGF0ZVxuICAgKi9cblxuICB2YXIgc3RyO1xuICB2YXIgZGlyO1xuICB2YXIgYztcbiAgdmFyIHByZXY7XG4gIHZhciBpO1xuICB2YXIgbDtcbiAgdmFyIGxhc3RGaWx0ZXJJbmRleDtcbiAgdmFyIGluU2luZ2xlO1xuICB2YXIgaW5Eb3VibGU7XG4gIHZhciBjdXJseTtcbiAgdmFyIHNxdWFyZTtcbiAgdmFyIHBhcmVuO1xuICAvKipcbiAgICogUHVzaCBhIGZpbHRlciB0byB0aGUgY3VycmVudCBkaXJlY3RpdmUgb2JqZWN0XG4gICAqL1xuXG4gIGZ1bmN0aW9uIHB1c2hGaWx0ZXIoKSB7XG4gICAgdmFyIGV4cCA9IHN0ci5zbGljZShsYXN0RmlsdGVySW5kZXgsIGkpLnRyaW0oKTtcbiAgICB2YXIgZmlsdGVyO1xuICAgIGlmIChleHApIHtcbiAgICAgIGZpbHRlciA9IHt9O1xuICAgICAgdmFyIHRva2VucyA9IGV4cC5tYXRjaChmaWx0ZXJUb2tlblJFKTtcbiAgICAgIGZpbHRlci5uYW1lID0gdG9rZW5zWzBdO1xuICAgICAgaWYgKHRva2Vucy5sZW5ndGggPiAxKSB7XG4gICAgICAgIGZpbHRlci5hcmdzID0gdG9rZW5zLnNsaWNlKDEpLm1hcChwcm9jZXNzRmlsdGVyQXJnKTtcbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKGZpbHRlcikge1xuICAgICAgKGRpci5maWx0ZXJzID0gZGlyLmZpbHRlcnMgfHwgW10pLnB1c2goZmlsdGVyKTtcbiAgICB9XG4gICAgbGFzdEZpbHRlckluZGV4ID0gaSArIDE7XG4gIH1cblxuICAvKipcbiAgICogQ2hlY2sgaWYgYW4gYXJndW1lbnQgaXMgZHluYW1pYyBhbmQgc3RyaXAgcXVvdGVzLlxuICAgKlxuICAgKiBAcGFyYW0ge1N0cmluZ30gYXJnXG4gICAqIEByZXR1cm4ge09iamVjdH1cbiAgICovXG5cbiAgZnVuY3Rpb24gcHJvY2Vzc0ZpbHRlckFyZyhhcmcpIHtcbiAgICBpZiAocmVzZXJ2ZWRBcmdSRS50ZXN0KGFyZykpIHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIHZhbHVlOiB0b051bWJlcihhcmcpLFxuICAgICAgICBkeW5hbWljOiBmYWxzZVxuICAgICAgfTtcbiAgICB9IGVsc2Uge1xuICAgICAgdmFyIHN0cmlwcGVkID0gc3RyaXBRdW90ZXMoYXJnKTtcbiAgICAgIHZhciBkeW5hbWljID0gc3RyaXBwZWQgPT09IGFyZztcbiAgICAgIHJldHVybiB7XG4gICAgICAgIHZhbHVlOiBkeW5hbWljID8gYXJnIDogc3RyaXBwZWQsXG4gICAgICAgIGR5bmFtaWM6IGR5bmFtaWNcbiAgICAgIH07XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFBhcnNlIGEgZGlyZWN0aXZlIHZhbHVlIGFuZCBleHRyYWN0IHRoZSBleHByZXNzaW9uXG4gICAqIGFuZCBpdHMgZmlsdGVycyBpbnRvIGEgZGVzY3JpcHRvci5cbiAgICpcbiAgICogRXhhbXBsZTpcbiAgICpcbiAgICogXCJhICsgMSB8IHVwcGVyY2FzZVwiIHdpbGwgeWllbGQ6XG4gICAqIHtcbiAgICogICBleHByZXNzaW9uOiAnYSArIDEnLFxuICAgKiAgIGZpbHRlcnM6IFtcbiAgICogICAgIHsgbmFtZTogJ3VwcGVyY2FzZScsIGFyZ3M6IG51bGwgfVxuICAgKiAgIF1cbiAgICogfVxuICAgKlxuICAgKiBAcGFyYW0ge1N0cmluZ30gc1xuICAgKiBAcmV0dXJuIHtPYmplY3R9XG4gICAqL1xuXG4gIGZ1bmN0aW9uIHBhcnNlRGlyZWN0aXZlKHMpIHtcbiAgICB2YXIgaGl0ID0gY2FjaGUkMS5nZXQocyk7XG4gICAgaWYgKGhpdCkge1xuICAgICAgcmV0dXJuIGhpdDtcbiAgICB9XG5cbiAgICAvLyByZXNldCBwYXJzZXIgc3RhdGVcbiAgICBzdHIgPSBzO1xuICAgIGluU2luZ2xlID0gaW5Eb3VibGUgPSBmYWxzZTtcbiAgICBjdXJseSA9IHNxdWFyZSA9IHBhcmVuID0gMDtcbiAgICBsYXN0RmlsdGVySW5kZXggPSAwO1xuICAgIGRpciA9IHt9O1xuXG4gICAgZm9yIChpID0gMCwgbCA9IHN0ci5sZW5ndGg7IGkgPCBsOyBpKyspIHtcbiAgICAgIHByZXYgPSBjO1xuICAgICAgYyA9IHN0ci5jaGFyQ29kZUF0KGkpO1xuICAgICAgaWYgKGluU2luZ2xlKSB7XG4gICAgICAgIC8vIGNoZWNrIHNpbmdsZSBxdW90ZVxuICAgICAgICBpZiAoYyA9PT0gMHgyNyAmJiBwcmV2ICE9PSAweDVDKSBpblNpbmdsZSA9ICFpblNpbmdsZTtcbiAgICAgIH0gZWxzZSBpZiAoaW5Eb3VibGUpIHtcbiAgICAgICAgLy8gY2hlY2sgZG91YmxlIHF1b3RlXG4gICAgICAgIGlmIChjID09PSAweDIyICYmIHByZXYgIT09IDB4NUMpIGluRG91YmxlID0gIWluRG91YmxlO1xuICAgICAgfSBlbHNlIGlmIChjID09PSAweDdDICYmIC8vIHBpcGVcbiAgICAgIHN0ci5jaGFyQ29kZUF0KGkgKyAxKSAhPT0gMHg3QyAmJiBzdHIuY2hhckNvZGVBdChpIC0gMSkgIT09IDB4N0MpIHtcbiAgICAgICAgaWYgKGRpci5leHByZXNzaW9uID09IG51bGwpIHtcbiAgICAgICAgICAvLyBmaXJzdCBmaWx0ZXIsIGVuZCBvZiBleHByZXNzaW9uXG4gICAgICAgICAgbGFzdEZpbHRlckluZGV4ID0gaSArIDE7XG4gICAgICAgICAgZGlyLmV4cHJlc3Npb24gPSBzdHIuc2xpY2UoMCwgaSkudHJpbSgpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIC8vIGFscmVhZHkgaGFzIGZpbHRlclxuICAgICAgICAgIHB1c2hGaWx0ZXIoKTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgc3dpdGNoIChjKSB7XG4gICAgICAgICAgY2FzZSAweDIyOlxuICAgICAgICAgICAgaW5Eb3VibGUgPSB0cnVlO2JyZWFrOyAvLyBcIlxuICAgICAgICAgIGNhc2UgMHgyNzpcbiAgICAgICAgICAgIGluU2luZ2xlID0gdHJ1ZTticmVhazsgLy8gJ1xuICAgICAgICAgIGNhc2UgMHgyODpcbiAgICAgICAgICAgIHBhcmVuKys7YnJlYWs7IC8vIChcbiAgICAgICAgICBjYXNlIDB4Mjk6XG4gICAgICAgICAgICBwYXJlbi0tO2JyZWFrOyAvLyApXG4gICAgICAgICAgY2FzZSAweDVCOlxuICAgICAgICAgICAgc3F1YXJlKys7YnJlYWs7IC8vIFtcbiAgICAgICAgICBjYXNlIDB4NUQ6XG4gICAgICAgICAgICBzcXVhcmUtLTticmVhazsgLy8gXVxuICAgICAgICAgIGNhc2UgMHg3QjpcbiAgICAgICAgICAgIGN1cmx5Kys7YnJlYWs7IC8vIHtcbiAgICAgICAgICBjYXNlIDB4N0Q6XG4gICAgICAgICAgICBjdXJseS0tO2JyZWFrOyAvLyB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoZGlyLmV4cHJlc3Npb24gPT0gbnVsbCkge1xuICAgICAgZGlyLmV4cHJlc3Npb24gPSBzdHIuc2xpY2UoMCwgaSkudHJpbSgpO1xuICAgIH0gZWxzZSBpZiAobGFzdEZpbHRlckluZGV4ICE9PSAwKSB7XG4gICAgICBwdXNoRmlsdGVyKCk7XG4gICAgfVxuXG4gICAgY2FjaGUkMS5wdXQocywgZGlyKTtcbiAgICByZXR1cm4gZGlyO1xuICB9XG5cbnZhciBkaXJlY3RpdmUgPSBPYmplY3QuZnJlZXplKHtcbiAgICBwYXJzZURpcmVjdGl2ZTogcGFyc2VEaXJlY3RpdmVcbiAgfSk7XG5cbiAgdmFyIHJlZ2V4RXNjYXBlUkUgPSAvWy0uKis/XiR7fSgpfFtcXF1cXC9cXFxcXS9nO1xuICB2YXIgY2FjaGUgPSB1bmRlZmluZWQ7XG4gIHZhciB0YWdSRSA9IHVuZGVmaW5lZDtcbiAgdmFyIGh0bWxSRSA9IHVuZGVmaW5lZDtcbiAgLyoqXG4gICAqIEVzY2FwZSBhIHN0cmluZyBzbyBpdCBjYW4gYmUgdXNlZCBpbiBhIFJlZ0V4cFxuICAgKiBjb25zdHJ1Y3Rvci5cbiAgICpcbiAgICogQHBhcmFtIHtTdHJpbmd9IHN0clxuICAgKi9cblxuICBmdW5jdGlvbiBlc2NhcGVSZWdleChzdHIpIHtcbiAgICByZXR1cm4gc3RyLnJlcGxhY2UocmVnZXhFc2NhcGVSRSwgJ1xcXFwkJicpO1xuICB9XG5cbiAgZnVuY3Rpb24gY29tcGlsZVJlZ2V4KCkge1xuICAgIHZhciBvcGVuID0gZXNjYXBlUmVnZXgoY29uZmlnLmRlbGltaXRlcnNbMF0pO1xuICAgIHZhciBjbG9zZSA9IGVzY2FwZVJlZ2V4KGNvbmZpZy5kZWxpbWl0ZXJzWzFdKTtcbiAgICB2YXIgdW5zYWZlT3BlbiA9IGVzY2FwZVJlZ2V4KGNvbmZpZy51bnNhZmVEZWxpbWl0ZXJzWzBdKTtcbiAgICB2YXIgdW5zYWZlQ2xvc2UgPSBlc2NhcGVSZWdleChjb25maWcudW5zYWZlRGVsaW1pdGVyc1sxXSk7XG4gICAgdGFnUkUgPSBuZXcgUmVnRXhwKHVuc2FmZU9wZW4gKyAnKCg/Oi58XFxcXG4pKz8pJyArIHVuc2FmZUNsb3NlICsgJ3wnICsgb3BlbiArICcoKD86LnxcXFxcbikrPyknICsgY2xvc2UsICdnJyk7XG4gICAgaHRtbFJFID0gbmV3IFJlZ0V4cCgnXicgKyB1bnNhZmVPcGVuICsgJy4qJyArIHVuc2FmZUNsb3NlICsgJyQnKTtcbiAgICAvLyByZXNldCBjYWNoZVxuICAgIGNhY2hlID0gbmV3IENhY2hlKDEwMDApO1xuICB9XG5cbiAgLyoqXG4gICAqIFBhcnNlIGEgdGVtcGxhdGUgdGV4dCBzdHJpbmcgaW50byBhbiBhcnJheSBvZiB0b2tlbnMuXG4gICAqXG4gICAqIEBwYXJhbSB7U3RyaW5nfSB0ZXh0XG4gICAqIEByZXR1cm4ge0FycmF5PE9iamVjdD4gfCBudWxsfVxuICAgKiAgICAgICAgICAgICAgIC0ge1N0cmluZ30gdHlwZVxuICAgKiAgICAgICAgICAgICAgIC0ge1N0cmluZ30gdmFsdWVcbiAgICogICAgICAgICAgICAgICAtIHtCb29sZWFufSBbaHRtbF1cbiAgICogICAgICAgICAgICAgICAtIHtCb29sZWFufSBbb25lVGltZV1cbiAgICovXG5cbiAgZnVuY3Rpb24gcGFyc2VUZXh0KHRleHQpIHtcbiAgICBpZiAoIWNhY2hlKSB7XG4gICAgICBjb21waWxlUmVnZXgoKTtcbiAgICB9XG4gICAgdmFyIGhpdCA9IGNhY2hlLmdldCh0ZXh0KTtcbiAgICBpZiAoaGl0KSB7XG4gICAgICByZXR1cm4gaGl0O1xuICAgIH1cbiAgICBpZiAoIXRhZ1JFLnRlc3QodGV4dCkpIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgICB2YXIgdG9rZW5zID0gW107XG4gICAgdmFyIGxhc3RJbmRleCA9IHRhZ1JFLmxhc3RJbmRleCA9IDA7XG4gICAgdmFyIG1hdGNoLCBpbmRleCwgaHRtbCwgdmFsdWUsIGZpcnN0LCBvbmVUaW1lO1xuICAgIC8qIGVzbGludC1kaXNhYmxlIG5vLWNvbmQtYXNzaWduICovXG4gICAgd2hpbGUgKG1hdGNoID0gdGFnUkUuZXhlYyh0ZXh0KSkge1xuICAgICAgLyogZXNsaW50LWVuYWJsZSBuby1jb25kLWFzc2lnbiAqL1xuICAgICAgaW5kZXggPSBtYXRjaC5pbmRleDtcbiAgICAgIC8vIHB1c2ggdGV4dCB0b2tlblxuICAgICAgaWYgKGluZGV4ID4gbGFzdEluZGV4KSB7XG4gICAgICAgIHRva2Vucy5wdXNoKHtcbiAgICAgICAgICB2YWx1ZTogdGV4dC5zbGljZShsYXN0SW5kZXgsIGluZGV4KVxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICAgIC8vIHRhZyB0b2tlblxuICAgICAgaHRtbCA9IGh0bWxSRS50ZXN0KG1hdGNoWzBdKTtcbiAgICAgIHZhbHVlID0gaHRtbCA/IG1hdGNoWzFdIDogbWF0Y2hbMl07XG4gICAgICBmaXJzdCA9IHZhbHVlLmNoYXJDb2RlQXQoMCk7XG4gICAgICBvbmVUaW1lID0gZmlyc3QgPT09IDQyOyAvLyAqXG4gICAgICB2YWx1ZSA9IG9uZVRpbWUgPyB2YWx1ZS5zbGljZSgxKSA6IHZhbHVlO1xuICAgICAgdG9rZW5zLnB1c2goe1xuICAgICAgICB0YWc6IHRydWUsXG4gICAgICAgIHZhbHVlOiB2YWx1ZS50cmltKCksXG4gICAgICAgIGh0bWw6IGh0bWwsXG4gICAgICAgIG9uZVRpbWU6IG9uZVRpbWVcbiAgICAgIH0pO1xuICAgICAgbGFzdEluZGV4ID0gaW5kZXggKyBtYXRjaFswXS5sZW5ndGg7XG4gICAgfVxuICAgIGlmIChsYXN0SW5kZXggPCB0ZXh0Lmxlbmd0aCkge1xuICAgICAgdG9rZW5zLnB1c2goe1xuICAgICAgICB2YWx1ZTogdGV4dC5zbGljZShsYXN0SW5kZXgpXG4gICAgICB9KTtcbiAgICB9XG4gICAgY2FjaGUucHV0KHRleHQsIHRva2Vucyk7XG4gICAgcmV0dXJuIHRva2VucztcbiAgfVxuXG4gIC8qKlxuICAgKiBGb3JtYXQgYSBsaXN0IG9mIHRva2VucyBpbnRvIGFuIGV4cHJlc3Npb24uXG4gICAqIGUuZy4gdG9rZW5zIHBhcnNlZCBmcm9tICdhIHt7Yn19IGMnIGNhbiBiZSBzZXJpYWxpemVkXG4gICAqIGludG8gb25lIHNpbmdsZSBleHByZXNzaW9uIGFzICdcImEgXCIgKyBiICsgXCIgY1wiJy5cbiAgICpcbiAgICogQHBhcmFtIHtBcnJheX0gdG9rZW5zXG4gICAqIEBwYXJhbSB7VnVlfSBbdm1dXG4gICAqIEByZXR1cm4ge1N0cmluZ31cbiAgICovXG5cbiAgZnVuY3Rpb24gdG9rZW5zVG9FeHAodG9rZW5zLCB2bSkge1xuICAgIGlmICh0b2tlbnMubGVuZ3RoID4gMSkge1xuICAgICAgcmV0dXJuIHRva2Vucy5tYXAoZnVuY3Rpb24gKHRva2VuKSB7XG4gICAgICAgIHJldHVybiBmb3JtYXRUb2tlbih0b2tlbiwgdm0pO1xuICAgICAgfSkuam9pbignKycpO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gZm9ybWF0VG9rZW4odG9rZW5zWzBdLCB2bSwgdHJ1ZSk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEZvcm1hdCBhIHNpbmdsZSB0b2tlbi5cbiAgICpcbiAgICogQHBhcmFtIHtPYmplY3R9IHRva2VuXG4gICAqIEBwYXJhbSB7VnVlfSBbdm1dXG4gICAqIEBwYXJhbSB7Qm9vbGVhbn0gW3NpbmdsZV1cbiAgICogQHJldHVybiB7U3RyaW5nfVxuICAgKi9cblxuICBmdW5jdGlvbiBmb3JtYXRUb2tlbih0b2tlbiwgdm0sIHNpbmdsZSkge1xuICAgIHJldHVybiB0b2tlbi50YWcgPyB0b2tlbi5vbmVUaW1lICYmIHZtID8gJ1wiJyArIHZtLiRldmFsKHRva2VuLnZhbHVlKSArICdcIicgOiBpbmxpbmVGaWx0ZXJzKHRva2VuLnZhbHVlLCBzaW5nbGUpIDogJ1wiJyArIHRva2VuLnZhbHVlICsgJ1wiJztcbiAgfVxuXG4gIC8qKlxuICAgKiBGb3IgYW4gYXR0cmlidXRlIHdpdGggbXVsdGlwbGUgaW50ZXJwb2xhdGlvbiB0YWdzLFxuICAgKiBlLmcuIGF0dHI9XCJzb21lLXt7dGhpbmcgfCBmaWx0ZXJ9fVwiLCBpbiBvcmRlciB0byBjb21iaW5lXG4gICAqIHRoZSB3aG9sZSB0aGluZyBpbnRvIGEgc2luZ2xlIHdhdGNoYWJsZSBleHByZXNzaW9uLCB3ZVxuICAgKiBoYXZlIHRvIGlubGluZSB0aG9zZSBmaWx0ZXJzLiBUaGlzIGZ1bmN0aW9uIGRvZXMgZXhhY3RseVxuICAgKiB0aGF0LiBUaGlzIGlzIGEgYml0IGhhY2t5IGJ1dCBpdCBhdm9pZHMgaGVhdnkgY2hhbmdlc1xuICAgKiB0byBkaXJlY3RpdmUgcGFyc2VyIGFuZCB3YXRjaGVyIG1lY2hhbmlzbS5cbiAgICpcbiAgICogQHBhcmFtIHtTdHJpbmd9IGV4cFxuICAgKiBAcGFyYW0ge0Jvb2xlYW59IHNpbmdsZVxuICAgKiBAcmV0dXJuIHtTdHJpbmd9XG4gICAqL1xuXG4gIHZhciBmaWx0ZXJSRSA9IC9bXnxdXFx8W158XS87XG4gIGZ1bmN0aW9uIGlubGluZUZpbHRlcnMoZXhwLCBzaW5nbGUpIHtcbiAgICBpZiAoIWZpbHRlclJFLnRlc3QoZXhwKSkge1xuICAgICAgcmV0dXJuIHNpbmdsZSA/IGV4cCA6ICcoJyArIGV4cCArICcpJztcbiAgICB9IGVsc2Uge1xuICAgICAgdmFyIGRpciA9IHBhcnNlRGlyZWN0aXZlKGV4cCk7XG4gICAgICBpZiAoIWRpci5maWx0ZXJzKSB7XG4gICAgICAgIHJldHVybiAnKCcgKyBleHAgKyAnKSc7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gJ3RoaXMuX2FwcGx5RmlsdGVycygnICsgZGlyLmV4cHJlc3Npb24gKyAvLyB2YWx1ZVxuICAgICAgICAnLG51bGwsJyArIC8vIG9sZFZhbHVlIChudWxsIGZvciByZWFkKVxuICAgICAgICBKU09OLnN0cmluZ2lmeShkaXIuZmlsdGVycykgKyAvLyBmaWx0ZXIgZGVzY3JpcHRvcnNcbiAgICAgICAgJyxmYWxzZSknOyAvLyB3cml0ZT9cbiAgICAgIH1cbiAgICB9XG4gIH1cblxudmFyIHRleHQgPSBPYmplY3QuZnJlZXplKHtcbiAgICBjb21waWxlUmVnZXg6IGNvbXBpbGVSZWdleCxcbiAgICBwYXJzZVRleHQ6IHBhcnNlVGV4dCxcbiAgICB0b2tlbnNUb0V4cDogdG9rZW5zVG9FeHBcbiAgfSk7XG5cbiAgdmFyIGRlbGltaXRlcnMgPSBbJ3t7JywgJ319J107XG4gIHZhciB1bnNhZmVEZWxpbWl0ZXJzID0gWyd7e3snLCAnfX19J107XG5cbiAgdmFyIGNvbmZpZyA9IE9iamVjdC5kZWZpbmVQcm9wZXJ0aWVzKHtcblxuICAgIC8qKlxuICAgICAqIFdoZXRoZXIgdG8gcHJpbnQgZGVidWcgbWVzc2FnZXMuXG4gICAgICogQWxzbyBlbmFibGVzIHN0YWNrIHRyYWNlIGZvciB3YXJuaW5ncy5cbiAgICAgKlxuICAgICAqIEB0eXBlIHtCb29sZWFufVxuICAgICAqL1xuXG4gICAgZGVidWc6IGZhbHNlLFxuXG4gICAgLyoqXG4gICAgICogV2hldGhlciB0byBzdXBwcmVzcyB3YXJuaW5ncy5cbiAgICAgKlxuICAgICAqIEB0eXBlIHtCb29sZWFufVxuICAgICAqL1xuXG4gICAgc2lsZW50OiBmYWxzZSxcblxuICAgIC8qKlxuICAgICAqIFdoZXRoZXIgdG8gdXNlIGFzeW5jIHJlbmRlcmluZy5cbiAgICAgKi9cblxuICAgIGFzeW5jOiB0cnVlLFxuXG4gICAgLyoqXG4gICAgICogV2hldGhlciB0byB3YXJuIGFnYWluc3QgZXJyb3JzIGNhdWdodCB3aGVuIGV2YWx1YXRpbmdcbiAgICAgKiBleHByZXNzaW9ucy5cbiAgICAgKi9cblxuICAgIHdhcm5FeHByZXNzaW9uRXJyb3JzOiB0cnVlLFxuXG4gICAgLyoqXG4gICAgICogV2hldGhlciB0byBhbGxvdyBkZXZ0b29scyBpbnNwZWN0aW9uLlxuICAgICAqIERpc2FibGVkIGJ5IGRlZmF1bHQgaW4gcHJvZHVjdGlvbiBidWlsZHMuXG4gICAgICovXG5cbiAgICBkZXZ0b29sczogJ2RldmVsb3BtZW50JyAhPT0gJ3Byb2R1Y3Rpb24nLFxuXG4gICAgLyoqXG4gICAgICogSW50ZXJuYWwgZmxhZyB0byBpbmRpY2F0ZSB0aGUgZGVsaW1pdGVycyBoYXZlIGJlZW5cbiAgICAgKiBjaGFuZ2VkLlxuICAgICAqXG4gICAgICogQHR5cGUge0Jvb2xlYW59XG4gICAgICovXG5cbiAgICBfZGVsaW1pdGVyc0NoYW5nZWQ6IHRydWUsXG5cbiAgICAvKipcbiAgICAgKiBMaXN0IG9mIGFzc2V0IHR5cGVzIHRoYXQgYSBjb21wb25lbnQgY2FuIG93bi5cbiAgICAgKlxuICAgICAqIEB0eXBlIHtBcnJheX1cbiAgICAgKi9cblxuICAgIF9hc3NldFR5cGVzOiBbJ2NvbXBvbmVudCcsICdkaXJlY3RpdmUnLCAnZWxlbWVudERpcmVjdGl2ZScsICdmaWx0ZXInLCAndHJhbnNpdGlvbicsICdwYXJ0aWFsJ10sXG5cbiAgICAvKipcbiAgICAgKiBwcm9wIGJpbmRpbmcgbW9kZXNcbiAgICAgKi9cblxuICAgIF9wcm9wQmluZGluZ01vZGVzOiB7XG4gICAgICBPTkVfV0FZOiAwLFxuICAgICAgVFdPX1dBWTogMSxcbiAgICAgIE9ORV9USU1FOiAyXG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIE1heCBjaXJjdWxhciB1cGRhdGVzIGFsbG93ZWQgaW4gYSBiYXRjaGVyIGZsdXNoIGN5Y2xlLlxuICAgICAqL1xuXG4gICAgX21heFVwZGF0ZUNvdW50OiAxMDBcblxuICB9LCB7XG4gICAgZGVsaW1pdGVyczogeyAvKipcbiAgICAgICAgICAgICAgICAgICAqIEludGVycG9sYXRpb24gZGVsaW1pdGVycy4gQ2hhbmdpbmcgdGhlc2Ugd291bGQgdHJpZ2dlclxuICAgICAgICAgICAgICAgICAgICogdGhlIHRleHQgcGFyc2VyIHRvIHJlLWNvbXBpbGUgdGhlIHJlZ3VsYXIgZXhwcmVzc2lvbnMuXG4gICAgICAgICAgICAgICAgICAgKlxuICAgICAgICAgICAgICAgICAgICogQHR5cGUge0FycmF5PFN0cmluZz59XG4gICAgICAgICAgICAgICAgICAgKi9cblxuICAgICAgZ2V0OiBmdW5jdGlvbiBnZXQoKSB7XG4gICAgICAgIHJldHVybiBkZWxpbWl0ZXJzO1xuICAgICAgfSxcbiAgICAgIHNldDogZnVuY3Rpb24gc2V0KHZhbCkge1xuICAgICAgICBkZWxpbWl0ZXJzID0gdmFsO1xuICAgICAgICBjb21waWxlUmVnZXgoKTtcbiAgICAgIH0sXG4gICAgICBjb25maWd1cmFibGU6IHRydWUsXG4gICAgICBlbnVtZXJhYmxlOiB0cnVlXG4gICAgfSxcbiAgICB1bnNhZmVEZWxpbWl0ZXJzOiB7XG4gICAgICBnZXQ6IGZ1bmN0aW9uIGdldCgpIHtcbiAgICAgICAgcmV0dXJuIHVuc2FmZURlbGltaXRlcnM7XG4gICAgICB9LFxuICAgICAgc2V0OiBmdW5jdGlvbiBzZXQodmFsKSB7XG4gICAgICAgIHVuc2FmZURlbGltaXRlcnMgPSB2YWw7XG4gICAgICAgIGNvbXBpbGVSZWdleCgpO1xuICAgICAgfSxcbiAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiAgICAgIGVudW1lcmFibGU6IHRydWVcbiAgICB9XG4gIH0pO1xuXG4gIHZhciB3YXJuID0gdW5kZWZpbmVkO1xuICB2YXIgZm9ybWF0Q29tcG9uZW50TmFtZSA9IHVuZGVmaW5lZDtcblxuICBpZiAoJ2RldmVsb3BtZW50JyAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgKGZ1bmN0aW9uICgpIHtcbiAgICAgIHZhciBoYXNDb25zb2xlID0gdHlwZW9mIGNvbnNvbGUgIT09ICd1bmRlZmluZWQnO1xuXG4gICAgICB3YXJuID0gZnVuY3Rpb24gKG1zZywgdm0pIHtcbiAgICAgICAgaWYgKGhhc0NvbnNvbGUgJiYgIWNvbmZpZy5zaWxlbnQpIHtcbiAgICAgICAgICBjb25zb2xlLmVycm9yKCdbVnVlIHdhcm5dOiAnICsgbXNnICsgKHZtID8gZm9ybWF0Q29tcG9uZW50TmFtZSh2bSkgOiAnJykpO1xuICAgICAgICB9XG4gICAgICB9O1xuXG4gICAgICBmb3JtYXRDb21wb25lbnROYW1lID0gZnVuY3Rpb24gKHZtKSB7XG4gICAgICAgIHZhciBuYW1lID0gdm0uX2lzVnVlID8gdm0uJG9wdGlvbnMubmFtZSA6IHZtLm5hbWU7XG4gICAgICAgIHJldHVybiBuYW1lID8gJyAoZm91bmQgaW4gY29tcG9uZW50OiA8JyArIGh5cGhlbmF0ZShuYW1lKSArICc+KScgOiAnJztcbiAgICAgIH07XG4gICAgfSkoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBcHBlbmQgd2l0aCB0cmFuc2l0aW9uLlxuICAgKlxuICAgKiBAcGFyYW0ge0VsZW1lbnR9IGVsXG4gICAqIEBwYXJhbSB7RWxlbWVudH0gdGFyZ2V0XG4gICAqIEBwYXJhbSB7VnVlfSB2bVxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBbY2JdXG4gICAqL1xuXG4gIGZ1bmN0aW9uIGFwcGVuZFdpdGhUcmFuc2l0aW9uKGVsLCB0YXJnZXQsIHZtLCBjYikge1xuICAgIGFwcGx5VHJhbnNpdGlvbihlbCwgMSwgZnVuY3Rpb24gKCkge1xuICAgICAgdGFyZ2V0LmFwcGVuZENoaWxkKGVsKTtcbiAgICB9LCB2bSwgY2IpO1xuICB9XG5cbiAgLyoqXG4gICAqIEluc2VydEJlZm9yZSB3aXRoIHRyYW5zaXRpb24uXG4gICAqXG4gICAqIEBwYXJhbSB7RWxlbWVudH0gZWxcbiAgICogQHBhcmFtIHtFbGVtZW50fSB0YXJnZXRcbiAgICogQHBhcmFtIHtWdWV9IHZtXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IFtjYl1cbiAgICovXG5cbiAgZnVuY3Rpb24gYmVmb3JlV2l0aFRyYW5zaXRpb24oZWwsIHRhcmdldCwgdm0sIGNiKSB7XG4gICAgYXBwbHlUcmFuc2l0aW9uKGVsLCAxLCBmdW5jdGlvbiAoKSB7XG4gICAgICBiZWZvcmUoZWwsIHRhcmdldCk7XG4gICAgfSwgdm0sIGNiKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZW1vdmUgd2l0aCB0cmFuc2l0aW9uLlxuICAgKlxuICAgKiBAcGFyYW0ge0VsZW1lbnR9IGVsXG4gICAqIEBwYXJhbSB7VnVlfSB2bVxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBbY2JdXG4gICAqL1xuXG4gIGZ1bmN0aW9uIHJlbW92ZVdpdGhUcmFuc2l0aW9uKGVsLCB2bSwgY2IpIHtcbiAgICBhcHBseVRyYW5zaXRpb24oZWwsIC0xLCBmdW5jdGlvbiAoKSB7XG4gICAgICByZW1vdmUoZWwpO1xuICAgIH0sIHZtLCBjYik7XG4gIH1cblxuICAvKipcbiAgICogQXBwbHkgdHJhbnNpdGlvbnMgd2l0aCBhbiBvcGVyYXRpb24gY2FsbGJhY2suXG4gICAqXG4gICAqIEBwYXJhbSB7RWxlbWVudH0gZWxcbiAgICogQHBhcmFtIHtOdW1iZXJ9IGRpcmVjdGlvblxuICAgKiAgICAgICAgICAgICAgICAgIDE6IGVudGVyXG4gICAqICAgICAgICAgICAgICAgICAtMTogbGVhdmVcbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gb3AgLSB0aGUgYWN0dWFsIERPTSBvcGVyYXRpb25cbiAgICogQHBhcmFtIHtWdWV9IHZtXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IFtjYl1cbiAgICovXG5cbiAgZnVuY3Rpb24gYXBwbHlUcmFuc2l0aW9uKGVsLCBkaXJlY3Rpb24sIG9wLCB2bSwgY2IpIHtcbiAgICB2YXIgdHJhbnNpdGlvbiA9IGVsLl9fdl90cmFucztcbiAgICBpZiAoIXRyYW5zaXRpb24gfHxcbiAgICAvLyBza2lwIGlmIHRoZXJlIGFyZSBubyBqcyBob29rcyBhbmQgQ1NTIHRyYW5zaXRpb24gaXNcbiAgICAvLyBub3Qgc3VwcG9ydGVkXG4gICAgIXRyYW5zaXRpb24uaG9va3MgJiYgIXRyYW5zaXRpb25FbmRFdmVudCB8fFxuICAgIC8vIHNraXAgdHJhbnNpdGlvbnMgZm9yIGluaXRpYWwgY29tcGlsZVxuICAgICF2bS5faXNDb21waWxlZCB8fFxuICAgIC8vIGlmIHRoZSB2bSBpcyBiZWluZyBtYW5pcHVsYXRlZCBieSBhIHBhcmVudCBkaXJlY3RpdmVcbiAgICAvLyBkdXJpbmcgdGhlIHBhcmVudCdzIGNvbXBpbGF0aW9uIHBoYXNlLCBza2lwIHRoZVxuICAgIC8vIGFuaW1hdGlvbi5cbiAgICB2bS4kcGFyZW50ICYmICF2bS4kcGFyZW50Ll9pc0NvbXBpbGVkKSB7XG4gICAgICBvcCgpO1xuICAgICAgaWYgKGNiKSBjYigpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB2YXIgYWN0aW9uID0gZGlyZWN0aW9uID4gMCA/ICdlbnRlcicgOiAnbGVhdmUnO1xuICAgIHRyYW5zaXRpb25bYWN0aW9uXShvcCwgY2IpO1xuICB9XG5cbnZhciB0cmFuc2l0aW9uID0gT2JqZWN0LmZyZWV6ZSh7XG4gICAgYXBwZW5kV2l0aFRyYW5zaXRpb246IGFwcGVuZFdpdGhUcmFuc2l0aW9uLFxuICAgIGJlZm9yZVdpdGhUcmFuc2l0aW9uOiBiZWZvcmVXaXRoVHJhbnNpdGlvbixcbiAgICByZW1vdmVXaXRoVHJhbnNpdGlvbjogcmVtb3ZlV2l0aFRyYW5zaXRpb24sXG4gICAgYXBwbHlUcmFuc2l0aW9uOiBhcHBseVRyYW5zaXRpb25cbiAgfSk7XG5cbiAgLyoqXG4gICAqIFF1ZXJ5IGFuIGVsZW1lbnQgc2VsZWN0b3IgaWYgaXQncyBub3QgYW4gZWxlbWVudCBhbHJlYWR5LlxuICAgKlxuICAgKiBAcGFyYW0ge1N0cmluZ3xFbGVtZW50fSBlbFxuICAgKiBAcmV0dXJuIHtFbGVtZW50fVxuICAgKi9cblxuICBmdW5jdGlvbiBxdWVyeShlbCkge1xuICAgIGlmICh0eXBlb2YgZWwgPT09ICdzdHJpbmcnKSB7XG4gICAgICB2YXIgc2VsZWN0b3IgPSBlbDtcbiAgICAgIGVsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihlbCk7XG4gICAgICBpZiAoIWVsKSB7XG4gICAgICAgICdkZXZlbG9wbWVudCcgIT09ICdwcm9kdWN0aW9uJyAmJiB3YXJuKCdDYW5ub3QgZmluZCBlbGVtZW50OiAnICsgc2VsZWN0b3IpO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gZWw7XG4gIH1cblxuICAvKipcbiAgICogQ2hlY2sgaWYgYSBub2RlIGlzIGluIHRoZSBkb2N1bWVudC5cbiAgICogTm90ZTogZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNvbnRhaW5zIHNob3VsZCB3b3JrIGhlcmVcbiAgICogYnV0IGFsd2F5cyByZXR1cm5zIGZhbHNlIGZvciBjb21tZW50IG5vZGVzIGluIHBoYW50b21qcyxcbiAgICogbWFraW5nIHVuaXQgdGVzdHMgZGlmZmljdWx0LiBUaGlzIGlzIGZpeGVkIGJ5IGRvaW5nIHRoZVxuICAgKiBjb250YWlucygpIGNoZWNrIG9uIHRoZSBub2RlJ3MgcGFyZW50Tm9kZSBpbnN0ZWFkIG9mXG4gICAqIHRoZSBub2RlIGl0c2VsZi5cbiAgICpcbiAgICogQHBhcmFtIHtOb2RlfSBub2RlXG4gICAqIEByZXR1cm4ge0Jvb2xlYW59XG4gICAqL1xuXG4gIGZ1bmN0aW9uIGluRG9jKG5vZGUpIHtcbiAgICBpZiAoIW5vZGUpIHJldHVybiBmYWxzZTtcbiAgICB2YXIgZG9jID0gbm9kZS5vd25lckRvY3VtZW50LmRvY3VtZW50RWxlbWVudDtcbiAgICB2YXIgcGFyZW50ID0gbm9kZS5wYXJlbnROb2RlO1xuICAgIHJldHVybiBkb2MgPT09IG5vZGUgfHwgZG9jID09PSBwYXJlbnQgfHwgISEocGFyZW50ICYmIHBhcmVudC5ub2RlVHlwZSA9PT0gMSAmJiBkb2MuY29udGFpbnMocGFyZW50KSk7XG4gIH1cblxuICAvKipcbiAgICogR2V0IGFuZCByZW1vdmUgYW4gYXR0cmlidXRlIGZyb20gYSBub2RlLlxuICAgKlxuICAgKiBAcGFyYW0ge05vZGV9IG5vZGVcbiAgICogQHBhcmFtIHtTdHJpbmd9IF9hdHRyXG4gICAqL1xuXG4gIGZ1bmN0aW9uIGdldEF0dHIobm9kZSwgX2F0dHIpIHtcbiAgICB2YXIgdmFsID0gbm9kZS5nZXRBdHRyaWJ1dGUoX2F0dHIpO1xuICAgIGlmICh2YWwgIT09IG51bGwpIHtcbiAgICAgIG5vZGUucmVtb3ZlQXR0cmlidXRlKF9hdHRyKTtcbiAgICB9XG4gICAgcmV0dXJuIHZhbDtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgYW4gYXR0cmlidXRlIHdpdGggY29sb24gb3Igdi1iaW5kOiBwcmVmaXguXG4gICAqXG4gICAqIEBwYXJhbSB7Tm9kZX0gbm9kZVxuICAgKiBAcGFyYW0ge1N0cmluZ30gbmFtZVxuICAgKiBAcmV0dXJuIHtTdHJpbmd8bnVsbH1cbiAgICovXG5cbiAgZnVuY3Rpb24gZ2V0QmluZEF0dHIobm9kZSwgbmFtZSkge1xuICAgIHZhciB2YWwgPSBnZXRBdHRyKG5vZGUsICc6JyArIG5hbWUpO1xuICAgIGlmICh2YWwgPT09IG51bGwpIHtcbiAgICAgIHZhbCA9IGdldEF0dHIobm9kZSwgJ3YtYmluZDonICsgbmFtZSk7XG4gICAgfVxuICAgIHJldHVybiB2YWw7XG4gIH1cblxuICAvKipcbiAgICogQ2hlY2sgdGhlIHByZXNlbmNlIG9mIGEgYmluZCBhdHRyaWJ1dGUuXG4gICAqXG4gICAqIEBwYXJhbSB7Tm9kZX0gbm9kZVxuICAgKiBAcGFyYW0ge1N0cmluZ30gbmFtZVxuICAgKiBAcmV0dXJuIHtCb29sZWFufVxuICAgKi9cblxuICBmdW5jdGlvbiBoYXNCaW5kQXR0cihub2RlLCBuYW1lKSB7XG4gICAgcmV0dXJuIG5vZGUuaGFzQXR0cmlidXRlKG5hbWUpIHx8IG5vZGUuaGFzQXR0cmlidXRlKCc6JyArIG5hbWUpIHx8IG5vZGUuaGFzQXR0cmlidXRlKCd2LWJpbmQ6JyArIG5hbWUpO1xuICB9XG5cbiAgLyoqXG4gICAqIEluc2VydCBlbCBiZWZvcmUgdGFyZ2V0XG4gICAqXG4gICAqIEBwYXJhbSB7RWxlbWVudH0gZWxcbiAgICogQHBhcmFtIHtFbGVtZW50fSB0YXJnZXRcbiAgICovXG5cbiAgZnVuY3Rpb24gYmVmb3JlKGVsLCB0YXJnZXQpIHtcbiAgICB0YXJnZXQucGFyZW50Tm9kZS5pbnNlcnRCZWZvcmUoZWwsIHRhcmdldCk7XG4gIH1cblxuICAvKipcbiAgICogSW5zZXJ0IGVsIGFmdGVyIHRhcmdldFxuICAgKlxuICAgKiBAcGFyYW0ge0VsZW1lbnR9IGVsXG4gICAqIEBwYXJhbSB7RWxlbWVudH0gdGFyZ2V0XG4gICAqL1xuXG4gIGZ1bmN0aW9uIGFmdGVyKGVsLCB0YXJnZXQpIHtcbiAgICBpZiAodGFyZ2V0Lm5leHRTaWJsaW5nKSB7XG4gICAgICBiZWZvcmUoZWwsIHRhcmdldC5uZXh0U2libGluZyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRhcmdldC5wYXJlbnROb2RlLmFwcGVuZENoaWxkKGVsKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogUmVtb3ZlIGVsIGZyb20gRE9NXG4gICAqXG4gICAqIEBwYXJhbSB7RWxlbWVudH0gZWxcbiAgICovXG5cbiAgZnVuY3Rpb24gcmVtb3ZlKGVsKSB7XG4gICAgZWwucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChlbCk7XG4gIH1cblxuICAvKipcbiAgICogUHJlcGVuZCBlbCB0byB0YXJnZXRcbiAgICpcbiAgICogQHBhcmFtIHtFbGVtZW50fSBlbFxuICAgKiBAcGFyYW0ge0VsZW1lbnR9IHRhcmdldFxuICAgKi9cblxuICBmdW5jdGlvbiBwcmVwZW5kKGVsLCB0YXJnZXQpIHtcbiAgICBpZiAodGFyZ2V0LmZpcnN0Q2hpbGQpIHtcbiAgICAgIGJlZm9yZShlbCwgdGFyZ2V0LmZpcnN0Q2hpbGQpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0YXJnZXQuYXBwZW5kQ2hpbGQoZWwpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBSZXBsYWNlIHRhcmdldCB3aXRoIGVsXG4gICAqXG4gICAqIEBwYXJhbSB7RWxlbWVudH0gdGFyZ2V0XG4gICAqIEBwYXJhbSB7RWxlbWVudH0gZWxcbiAgICovXG5cbiAgZnVuY3Rpb24gcmVwbGFjZSh0YXJnZXQsIGVsKSB7XG4gICAgdmFyIHBhcmVudCA9IHRhcmdldC5wYXJlbnROb2RlO1xuICAgIGlmIChwYXJlbnQpIHtcbiAgICAgIHBhcmVudC5yZXBsYWNlQ2hpbGQoZWwsIHRhcmdldCk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEFkZCBldmVudCBsaXN0ZW5lciBzaG9ydGhhbmQuXG4gICAqXG4gICAqIEBwYXJhbSB7RWxlbWVudH0gZWxcbiAgICogQHBhcmFtIHtTdHJpbmd9IGV2ZW50XG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IGNiXG4gICAqIEBwYXJhbSB7Qm9vbGVhbn0gW3VzZUNhcHR1cmVdXG4gICAqL1xuXG4gIGZ1bmN0aW9uIG9uKGVsLCBldmVudCwgY2IsIHVzZUNhcHR1cmUpIHtcbiAgICBlbC5hZGRFdmVudExpc3RlbmVyKGV2ZW50LCBjYiwgdXNlQ2FwdHVyZSk7XG4gIH1cblxuICAvKipcbiAgICogUmVtb3ZlIGV2ZW50IGxpc3RlbmVyIHNob3J0aGFuZC5cbiAgICpcbiAgICogQHBhcmFtIHtFbGVtZW50fSBlbFxuICAgKiBAcGFyYW0ge1N0cmluZ30gZXZlbnRcbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gY2JcbiAgICovXG5cbiAgZnVuY3Rpb24gb2ZmKGVsLCBldmVudCwgY2IpIHtcbiAgICBlbC5yZW1vdmVFdmVudExpc3RlbmVyKGV2ZW50LCBjYik7XG4gIH1cblxuICAvKipcbiAgICogRm9yIElFOSBjb21wYXQ6IHdoZW4gYm90aCBjbGFzcyBhbmQgOmNsYXNzIGFyZSBwcmVzZW50XG4gICAqIGdldEF0dHJpYnV0ZSgnY2xhc3MnKSByZXR1cm5zIHdyb25nIHZhbHVlLi4uXG4gICAqXG4gICAqIEBwYXJhbSB7RWxlbWVudH0gZWxcbiAgICogQHJldHVybiB7U3RyaW5nfVxuICAgKi9cblxuICBmdW5jdGlvbiBnZXRDbGFzcyhlbCkge1xuICAgIHZhciBjbGFzc25hbWUgPSBlbC5jbGFzc05hbWU7XG4gICAgaWYgKHR5cGVvZiBjbGFzc25hbWUgPT09ICdvYmplY3QnKSB7XG4gICAgICBjbGFzc25hbWUgPSBjbGFzc25hbWUuYmFzZVZhbCB8fCAnJztcbiAgICB9XG4gICAgcmV0dXJuIGNsYXNzbmFtZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBJbiBJRTksIHNldEF0dHJpYnV0ZSgnY2xhc3MnKSB3aWxsIHJlc3VsdCBpbiBlbXB0eSBjbGFzc1xuICAgKiBpZiB0aGUgZWxlbWVudCBhbHNvIGhhcyB0aGUgOmNsYXNzIGF0dHJpYnV0ZTsgSG93ZXZlciBpblxuICAgKiBQaGFudG9tSlMsIHNldHRpbmcgYGNsYXNzTmFtZWAgZG9lcyBub3Qgd29yayBvbiBTVkcgZWxlbWVudHMuLi5cbiAgICogU28gd2UgaGF2ZSB0byBkbyBhIGNvbmRpdGlvbmFsIGNoZWNrIGhlcmUuXG4gICAqXG4gICAqIEBwYXJhbSB7RWxlbWVudH0gZWxcbiAgICogQHBhcmFtIHtTdHJpbmd9IGNsc1xuICAgKi9cblxuICBmdW5jdGlvbiBzZXRDbGFzcyhlbCwgY2xzKSB7XG4gICAgLyogaXN0YW5idWwgaWdub3JlIGlmICovXG4gICAgaWYgKGlzSUU5ICYmICEvc3ZnJC8udGVzdChlbC5uYW1lc3BhY2VVUkkpKSB7XG4gICAgICBlbC5jbGFzc05hbWUgPSBjbHM7XG4gICAgfSBlbHNlIHtcbiAgICAgIGVsLnNldEF0dHJpYnV0ZSgnY2xhc3MnLCBjbHMpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBBZGQgY2xhc3Mgd2l0aCBjb21wYXRpYmlsaXR5IGZvciBJRSAmIFNWR1xuICAgKlxuICAgKiBAcGFyYW0ge0VsZW1lbnR9IGVsXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBjbHNcbiAgICovXG5cbiAgZnVuY3Rpb24gYWRkQ2xhc3MoZWwsIGNscykge1xuICAgIGlmIChlbC5jbGFzc0xpc3QpIHtcbiAgICAgIGVsLmNsYXNzTGlzdC5hZGQoY2xzKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdmFyIGN1ciA9ICcgJyArIGdldENsYXNzKGVsKSArICcgJztcbiAgICAgIGlmIChjdXIuaW5kZXhPZignICcgKyBjbHMgKyAnICcpIDwgMCkge1xuICAgICAgICBzZXRDbGFzcyhlbCwgKGN1ciArIGNscykudHJpbSgpKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogUmVtb3ZlIGNsYXNzIHdpdGggY29tcGF0aWJpbGl0eSBmb3IgSUUgJiBTVkdcbiAgICpcbiAgICogQHBhcmFtIHtFbGVtZW50fSBlbFxuICAgKiBAcGFyYW0ge1N0cmluZ30gY2xzXG4gICAqL1xuXG4gIGZ1bmN0aW9uIHJlbW92ZUNsYXNzKGVsLCBjbHMpIHtcbiAgICBpZiAoZWwuY2xhc3NMaXN0KSB7XG4gICAgICBlbC5jbGFzc0xpc3QucmVtb3ZlKGNscyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHZhciBjdXIgPSAnICcgKyBnZXRDbGFzcyhlbCkgKyAnICc7XG4gICAgICB2YXIgdGFyID0gJyAnICsgY2xzICsgJyAnO1xuICAgICAgd2hpbGUgKGN1ci5pbmRleE9mKHRhcikgPj0gMCkge1xuICAgICAgICBjdXIgPSBjdXIucmVwbGFjZSh0YXIsICcgJyk7XG4gICAgICB9XG4gICAgICBzZXRDbGFzcyhlbCwgY3VyLnRyaW0oKSk7XG4gICAgfVxuICAgIGlmICghZWwuY2xhc3NOYW1lKSB7XG4gICAgICBlbC5yZW1vdmVBdHRyaWJ1dGUoJ2NsYXNzJyk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEV4dHJhY3QgcmF3IGNvbnRlbnQgaW5zaWRlIGFuIGVsZW1lbnQgaW50byBhIHRlbXBvcmFyeVxuICAgKiBjb250YWluZXIgZGl2XG4gICAqXG4gICAqIEBwYXJhbSB7RWxlbWVudH0gZWxcbiAgICogQHBhcmFtIHtCb29sZWFufSBhc0ZyYWdtZW50XG4gICAqIEByZXR1cm4ge0VsZW1lbnR8RG9jdW1lbnRGcmFnbWVudH1cbiAgICovXG5cbiAgZnVuY3Rpb24gZXh0cmFjdENvbnRlbnQoZWwsIGFzRnJhZ21lbnQpIHtcbiAgICB2YXIgY2hpbGQ7XG4gICAgdmFyIHJhd0NvbnRlbnQ7XG4gICAgLyogaXN0YW5idWwgaWdub3JlIGlmICovXG4gICAgaWYgKGlzVGVtcGxhdGUoZWwpICYmIGlzRnJhZ21lbnQoZWwuY29udGVudCkpIHtcbiAgICAgIGVsID0gZWwuY29udGVudDtcbiAgICB9XG4gICAgaWYgKGVsLmhhc0NoaWxkTm9kZXMoKSkge1xuICAgICAgdHJpbU5vZGUoZWwpO1xuICAgICAgcmF3Q29udGVudCA9IGFzRnJhZ21lbnQgPyBkb2N1bWVudC5jcmVhdGVEb2N1bWVudEZyYWdtZW50KCkgOiBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgIC8qIGVzbGludC1kaXNhYmxlIG5vLWNvbmQtYXNzaWduICovXG4gICAgICB3aGlsZSAoY2hpbGQgPSBlbC5maXJzdENoaWxkKSB7XG4gICAgICAgIC8qIGVzbGludC1lbmFibGUgbm8tY29uZC1hc3NpZ24gKi9cbiAgICAgICAgcmF3Q29udGVudC5hcHBlbmRDaGlsZChjaGlsZCk7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiByYXdDb250ZW50O1xuICB9XG5cbiAgLyoqXG4gICAqIFRyaW0gcG9zc2libGUgZW1wdHkgaGVhZC90YWlsIHRleHQgYW5kIGNvbW1lbnRcbiAgICogbm9kZXMgaW5zaWRlIGEgcGFyZW50LlxuICAgKlxuICAgKiBAcGFyYW0ge05vZGV9IG5vZGVcbiAgICovXG5cbiAgZnVuY3Rpb24gdHJpbU5vZGUobm9kZSkge1xuICAgIHZhciBjaGlsZDtcbiAgICAvKiBlc2xpbnQtZGlzYWJsZSBuby1zZXF1ZW5jZXMgKi9cbiAgICB3aGlsZSAoKGNoaWxkID0gbm9kZS5maXJzdENoaWxkLCBpc1RyaW1tYWJsZShjaGlsZCkpKSB7XG4gICAgICBub2RlLnJlbW92ZUNoaWxkKGNoaWxkKTtcbiAgICB9XG4gICAgd2hpbGUgKChjaGlsZCA9IG5vZGUubGFzdENoaWxkLCBpc1RyaW1tYWJsZShjaGlsZCkpKSB7XG4gICAgICBub2RlLnJlbW92ZUNoaWxkKGNoaWxkKTtcbiAgICB9XG4gICAgLyogZXNsaW50LWVuYWJsZSBuby1zZXF1ZW5jZXMgKi9cbiAgfVxuXG4gIGZ1bmN0aW9uIGlzVHJpbW1hYmxlKG5vZGUpIHtcbiAgICByZXR1cm4gbm9kZSAmJiAobm9kZS5ub2RlVHlwZSA9PT0gMyAmJiAhbm9kZS5kYXRhLnRyaW0oKSB8fCBub2RlLm5vZGVUeXBlID09PSA4KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDaGVjayBpZiBhbiBlbGVtZW50IGlzIGEgdGVtcGxhdGUgdGFnLlxuICAgKiBOb3RlIGlmIHRoZSB0ZW1wbGF0ZSBhcHBlYXJzIGluc2lkZSBhbiBTVkcgaXRzIHRhZ05hbWVcbiAgICogd2lsbCBiZSBpbiBsb3dlcmNhc2UuXG4gICAqXG4gICAqIEBwYXJhbSB7RWxlbWVudH0gZWxcbiAgICovXG5cbiAgZnVuY3Rpb24gaXNUZW1wbGF0ZShlbCkge1xuICAgIHJldHVybiBlbC50YWdOYW1lICYmIGVsLnRhZ05hbWUudG9Mb3dlckNhc2UoKSA9PT0gJ3RlbXBsYXRlJztcbiAgfVxuXG4gIC8qKlxuICAgKiBDcmVhdGUgYW4gXCJhbmNob3JcIiBmb3IgcGVyZm9ybWluZyBkb20gaW5zZXJ0aW9uL3JlbW92YWxzLlxuICAgKiBUaGlzIGlzIHVzZWQgaW4gYSBudW1iZXIgb2Ygc2NlbmFyaW9zOlxuICAgKiAtIGZyYWdtZW50IGluc3RhbmNlXG4gICAqIC0gdi1odG1sXG4gICAqIC0gdi1pZlxuICAgKiAtIHYtZm9yXG4gICAqIC0gY29tcG9uZW50XG4gICAqXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBjb250ZW50XG4gICAqIEBwYXJhbSB7Qm9vbGVhbn0gcGVyc2lzdCAtIElFIHRyYXNoZXMgZW1wdHkgdGV4dE5vZGVzIG9uXG4gICAqICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsb25lTm9kZSh0cnVlKSwgc28gaW4gY2VydGFpblxuICAgKiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlcyB0aGUgYW5jaG9yIG5lZWRzIHRvIGJlXG4gICAqICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5vbi1lbXB0eSB0byBiZSBwZXJzaXN0ZWQgaW5cbiAgICogICAgICAgICAgICAgICAgICAgICAgICAgICAgdGVtcGxhdGVzLlxuICAgKiBAcmV0dXJuIHtDb21tZW50fFRleHR9XG4gICAqL1xuXG4gIGZ1bmN0aW9uIGNyZWF0ZUFuY2hvcihjb250ZW50LCBwZXJzaXN0KSB7XG4gICAgdmFyIGFuY2hvciA9IGNvbmZpZy5kZWJ1ZyA/IGRvY3VtZW50LmNyZWF0ZUNvbW1lbnQoY29udGVudCkgOiBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShwZXJzaXN0ID8gJyAnIDogJycpO1xuICAgIGFuY2hvci5fX3ZfYW5jaG9yID0gdHJ1ZTtcbiAgICByZXR1cm4gYW5jaG9yO1xuICB9XG5cbiAgLyoqXG4gICAqIEZpbmQgYSBjb21wb25lbnQgcmVmIGF0dHJpYnV0ZSB0aGF0IHN0YXJ0cyB3aXRoICQuXG4gICAqXG4gICAqIEBwYXJhbSB7RWxlbWVudH0gbm9kZVxuICAgKiBAcmV0dXJuIHtTdHJpbmd8dW5kZWZpbmVkfVxuICAgKi9cblxuICB2YXIgcmVmUkUgPSAvXnYtcmVmOi87XG5cbiAgZnVuY3Rpb24gZmluZFJlZihub2RlKSB7XG4gICAgaWYgKG5vZGUuaGFzQXR0cmlidXRlcygpKSB7XG4gICAgICB2YXIgYXR0cnMgPSBub2RlLmF0dHJpYnV0ZXM7XG4gICAgICBmb3IgKHZhciBpID0gMCwgbCA9IGF0dHJzLmxlbmd0aDsgaSA8IGw7IGkrKykge1xuICAgICAgICB2YXIgbmFtZSA9IGF0dHJzW2ldLm5hbWU7XG4gICAgICAgIGlmIChyZWZSRS50ZXN0KG5hbWUpKSB7XG4gICAgICAgICAgcmV0dXJuIGNhbWVsaXplKG5hbWUucmVwbGFjZShyZWZSRSwgJycpKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBNYXAgYSBmdW5jdGlvbiB0byBhIHJhbmdlIG9mIG5vZGVzIC5cbiAgICpcbiAgICogQHBhcmFtIHtOb2RlfSBub2RlXG4gICAqIEBwYXJhbSB7Tm9kZX0gZW5kXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IG9wXG4gICAqL1xuXG4gIGZ1bmN0aW9uIG1hcE5vZGVSYW5nZShub2RlLCBlbmQsIG9wKSB7XG4gICAgdmFyIG5leHQ7XG4gICAgd2hpbGUgKG5vZGUgIT09IGVuZCkge1xuICAgICAgbmV4dCA9IG5vZGUubmV4dFNpYmxpbmc7XG4gICAgICBvcChub2RlKTtcbiAgICAgIG5vZGUgPSBuZXh0O1xuICAgIH1cbiAgICBvcChlbmQpO1xuICB9XG5cbiAgLyoqXG4gICAqIFJlbW92ZSBhIHJhbmdlIG9mIG5vZGVzIHdpdGggdHJhbnNpdGlvbiwgc3RvcmVcbiAgICogdGhlIG5vZGVzIGluIGEgZnJhZ21lbnQgd2l0aCBjb3JyZWN0IG9yZGVyaW5nLFxuICAgKiBhbmQgY2FsbCBjYWxsYmFjayB3aGVuIGRvbmUuXG4gICAqXG4gICAqIEBwYXJhbSB7Tm9kZX0gc3RhcnRcbiAgICogQHBhcmFtIHtOb2RlfSBlbmRcbiAgICogQHBhcmFtIHtWdWV9IHZtXG4gICAqIEBwYXJhbSB7RG9jdW1lbnRGcmFnbWVudH0gZnJhZ1xuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBjYlxuICAgKi9cblxuICBmdW5jdGlvbiByZW1vdmVOb2RlUmFuZ2Uoc3RhcnQsIGVuZCwgdm0sIGZyYWcsIGNiKSB7XG4gICAgdmFyIGRvbmUgPSBmYWxzZTtcbiAgICB2YXIgcmVtb3ZlZCA9IDA7XG4gICAgdmFyIG5vZGVzID0gW107XG4gICAgbWFwTm9kZVJhbmdlKHN0YXJ0LCBlbmQsIGZ1bmN0aW9uIChub2RlKSB7XG4gICAgICBpZiAobm9kZSA9PT0gZW5kKSBkb25lID0gdHJ1ZTtcbiAgICAgIG5vZGVzLnB1c2gobm9kZSk7XG4gICAgICByZW1vdmVXaXRoVHJhbnNpdGlvbihub2RlLCB2bSwgb25SZW1vdmVkKTtcbiAgICB9KTtcbiAgICBmdW5jdGlvbiBvblJlbW92ZWQoKSB7XG4gICAgICByZW1vdmVkKys7XG4gICAgICBpZiAoZG9uZSAmJiByZW1vdmVkID49IG5vZGVzLmxlbmd0aCkge1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IG5vZGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgZnJhZy5hcHBlbmRDaGlsZChub2Rlc1tpXSk7XG4gICAgICAgIH1cbiAgICAgICAgY2IgJiYgY2IoKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQ2hlY2sgaWYgYSBub2RlIGlzIGEgRG9jdW1lbnRGcmFnbWVudC5cbiAgICpcbiAgICogQHBhcmFtIHtOb2RlfSBub2RlXG4gICAqIEByZXR1cm4ge0Jvb2xlYW59XG4gICAqL1xuXG4gIGZ1bmN0aW9uIGlzRnJhZ21lbnQobm9kZSkge1xuICAgIHJldHVybiBub2RlICYmIG5vZGUubm9kZVR5cGUgPT09IDExO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldCBvdXRlckhUTUwgb2YgZWxlbWVudHMsIHRha2luZyBjYXJlXG4gICAqIG9mIFNWRyBlbGVtZW50cyBpbiBJRSBhcyB3ZWxsLlxuICAgKlxuICAgKiBAcGFyYW0ge0VsZW1lbnR9IGVsXG4gICAqIEByZXR1cm4ge1N0cmluZ31cbiAgICovXG5cbiAgZnVuY3Rpb24gZ2V0T3V0ZXJIVE1MKGVsKSB7XG4gICAgaWYgKGVsLm91dGVySFRNTCkge1xuICAgICAgcmV0dXJuIGVsLm91dGVySFRNTDtcbiAgICB9IGVsc2Uge1xuICAgICAgdmFyIGNvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgY29udGFpbmVyLmFwcGVuZENoaWxkKGVsLmNsb25lTm9kZSh0cnVlKSk7XG4gICAgICByZXR1cm4gY29udGFpbmVyLmlubmVySFRNTDtcbiAgICB9XG4gIH1cblxuICB2YXIgY29tbW9uVGFnUkUgPSAvXihkaXZ8cHxzcGFufGltZ3xhfGJ8aXxicnx1bHxvbHxsaXxoMXxoMnxoM3xoNHxoNXxoNnxjb2RlfHByZXx0YWJsZXx0aHx0ZHx0cnxmb3JtfGxhYmVsfGlucHV0fHNlbGVjdHxvcHRpb258bmF2fGFydGljbGV8c2VjdGlvbnxoZWFkZXJ8Zm9vdGVyKSQvaTtcbiAgdmFyIHJlc2VydmVkVGFnUkUgPSAvXihzbG90fHBhcnRpYWx8Y29tcG9uZW50KSQvaTtcblxuICB2YXIgaXNVbmtub3duRWxlbWVudCA9IHVuZGVmaW5lZDtcbiAgaWYgKCdkZXZlbG9wbWVudCcgIT09ICdwcm9kdWN0aW9uJykge1xuICAgIGlzVW5rbm93bkVsZW1lbnQgPSBmdW5jdGlvbiAoZWwsIHRhZykge1xuICAgICAgaWYgKHRhZy5pbmRleE9mKCctJykgPiAtMSkge1xuICAgICAgICAvLyBodHRwOi8vc3RhY2tvdmVyZmxvdy5jb20vYS8yODIxMDM2NC8xMDcwMjQ0XG4gICAgICAgIHJldHVybiBlbC5jb25zdHJ1Y3RvciA9PT0gd2luZG93LkhUTUxVbmtub3duRWxlbWVudCB8fCBlbC5jb25zdHJ1Y3RvciA9PT0gd2luZG93LkhUTUxFbGVtZW50O1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuICgvSFRNTFVua25vd25FbGVtZW50Ly50ZXN0KGVsLnRvU3RyaW5nKCkpICYmXG4gICAgICAgICAgLy8gQ2hyb21lIHJldHVybnMgdW5rbm93biBmb3Igc2V2ZXJhbCBIVE1MNSBlbGVtZW50cy5cbiAgICAgICAgICAvLyBodHRwczovL2NvZGUuZ29vZ2xlLmNvbS9wL2Nocm9taXVtL2lzc3Vlcy9kZXRhaWw/aWQ9NTQwNTI2XG4gICAgICAgICAgIS9eKGRhdGF8dGltZXxydGN8cmIpJC8udGVzdCh0YWcpXG4gICAgICAgICk7XG4gICAgICB9XG4gICAgfTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDaGVjayBpZiBhbiBlbGVtZW50IGlzIGEgY29tcG9uZW50LCBpZiB5ZXMgcmV0dXJuIGl0c1xuICAgKiBjb21wb25lbnQgaWQuXG4gICAqXG4gICAqIEBwYXJhbSB7RWxlbWVudH0gZWxcbiAgICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnNcbiAgICogQHJldHVybiB7T2JqZWN0fHVuZGVmaW5lZH1cbiAgICovXG5cbiAgZnVuY3Rpb24gY2hlY2tDb21wb25lbnRBdHRyKGVsLCBvcHRpb25zKSB7XG4gICAgdmFyIHRhZyA9IGVsLnRhZ05hbWUudG9Mb3dlckNhc2UoKTtcbiAgICB2YXIgaGFzQXR0cnMgPSBlbC5oYXNBdHRyaWJ1dGVzKCk7XG4gICAgaWYgKCFjb21tb25UYWdSRS50ZXN0KHRhZykgJiYgIXJlc2VydmVkVGFnUkUudGVzdCh0YWcpKSB7XG4gICAgICBpZiAocmVzb2x2ZUFzc2V0KG9wdGlvbnMsICdjb21wb25lbnRzJywgdGFnKSkge1xuICAgICAgICByZXR1cm4geyBpZDogdGFnIH07XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB2YXIgaXMgPSBoYXNBdHRycyAmJiBnZXRJc0JpbmRpbmcoZWwsIG9wdGlvbnMpO1xuICAgICAgICBpZiAoaXMpIHtcbiAgICAgICAgICByZXR1cm4gaXM7XG4gICAgICAgIH0gZWxzZSBpZiAoJ2RldmVsb3BtZW50JyAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgICAgICAgdmFyIGV4cGVjdGVkVGFnID0gb3B0aW9ucy5fY29tcG9uZW50TmFtZU1hcCAmJiBvcHRpb25zLl9jb21wb25lbnROYW1lTWFwW3RhZ107XG4gICAgICAgICAgaWYgKGV4cGVjdGVkVGFnKSB7XG4gICAgICAgICAgICB3YXJuKCdVbmtub3duIGN1c3RvbSBlbGVtZW50OiA8JyArIHRhZyArICc+IC0gJyArICdkaWQgeW91IG1lYW4gPCcgKyBleHBlY3RlZFRhZyArICc+PyAnICsgJ0hUTUwgaXMgY2FzZS1pbnNlbnNpdGl2ZSwgcmVtZW1iZXIgdG8gdXNlIGtlYmFiLWNhc2UgaW4gdGVtcGxhdGVzLicpO1xuICAgICAgICAgIH0gZWxzZSBpZiAoaXNVbmtub3duRWxlbWVudChlbCwgdGFnKSkge1xuICAgICAgICAgICAgd2FybignVW5rbm93biBjdXN0b20gZWxlbWVudDogPCcgKyB0YWcgKyAnPiAtIGRpZCB5b3UgJyArICdyZWdpc3RlciB0aGUgY29tcG9uZW50IGNvcnJlY3RseT8gRm9yIHJlY3Vyc2l2ZSBjb21wb25lbnRzLCAnICsgJ21ha2Ugc3VyZSB0byBwcm92aWRlIHRoZSBcIm5hbWVcIiBvcHRpb24uJyk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSBlbHNlIGlmIChoYXNBdHRycykge1xuICAgICAgcmV0dXJuIGdldElzQmluZGluZyhlbCwgb3B0aW9ucyk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEdldCBcImlzXCIgYmluZGluZyBmcm9tIGFuIGVsZW1lbnQuXG4gICAqXG4gICAqIEBwYXJhbSB7RWxlbWVudH0gZWxcbiAgICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnNcbiAgICogQHJldHVybiB7T2JqZWN0fHVuZGVmaW5lZH1cbiAgICovXG5cbiAgZnVuY3Rpb24gZ2V0SXNCaW5kaW5nKGVsLCBvcHRpb25zKSB7XG4gICAgLy8gZHluYW1pYyBzeW50YXhcbiAgICB2YXIgZXhwID0gZWwuZ2V0QXR0cmlidXRlKCdpcycpO1xuICAgIGlmIChleHAgIT0gbnVsbCkge1xuICAgICAgaWYgKHJlc29sdmVBc3NldChvcHRpb25zLCAnY29tcG9uZW50cycsIGV4cCkpIHtcbiAgICAgICAgZWwucmVtb3ZlQXR0cmlidXRlKCdpcycpO1xuICAgICAgICByZXR1cm4geyBpZDogZXhwIH07XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGV4cCA9IGdldEJpbmRBdHRyKGVsLCAnaXMnKTtcbiAgICAgIGlmIChleHAgIT0gbnVsbCkge1xuICAgICAgICByZXR1cm4geyBpZDogZXhwLCBkeW5hbWljOiB0cnVlIH07XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIE9wdGlvbiBvdmVyd3JpdGluZyBzdHJhdGVnaWVzIGFyZSBmdW5jdGlvbnMgdGhhdCBoYW5kbGVcbiAgICogaG93IHRvIG1lcmdlIGEgcGFyZW50IG9wdGlvbiB2YWx1ZSBhbmQgYSBjaGlsZCBvcHRpb25cbiAgICogdmFsdWUgaW50byB0aGUgZmluYWwgdmFsdWUuXG4gICAqXG4gICAqIEFsbCBzdHJhdGVneSBmdW5jdGlvbnMgZm9sbG93IHRoZSBzYW1lIHNpZ25hdHVyZTpcbiAgICpcbiAgICogQHBhcmFtIHsqfSBwYXJlbnRWYWxcbiAgICogQHBhcmFtIHsqfSBjaGlsZFZhbFxuICAgKiBAcGFyYW0ge1Z1ZX0gW3ZtXVxuICAgKi9cblxuICB2YXIgc3RyYXRzID0gY29uZmlnLm9wdGlvbk1lcmdlU3RyYXRlZ2llcyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG5cbiAgLyoqXG4gICAqIEhlbHBlciB0aGF0IHJlY3Vyc2l2ZWx5IG1lcmdlcyB0d28gZGF0YSBvYmplY3RzIHRvZ2V0aGVyLlxuICAgKi9cblxuICBmdW5jdGlvbiBtZXJnZURhdGEodG8sIGZyb20pIHtcbiAgICB2YXIga2V5LCB0b1ZhbCwgZnJvbVZhbDtcbiAgICBmb3IgKGtleSBpbiBmcm9tKSB7XG4gICAgICB0b1ZhbCA9IHRvW2tleV07XG4gICAgICBmcm9tVmFsID0gZnJvbVtrZXldO1xuICAgICAgaWYgKCFoYXNPd24odG8sIGtleSkpIHtcbiAgICAgICAgc2V0KHRvLCBrZXksIGZyb21WYWwpO1xuICAgICAgfSBlbHNlIGlmIChpc09iamVjdCh0b1ZhbCkgJiYgaXNPYmplY3QoZnJvbVZhbCkpIHtcbiAgICAgICAgbWVyZ2VEYXRhKHRvVmFsLCBmcm9tVmFsKTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHRvO1xuICB9XG5cbiAgLyoqXG4gICAqIERhdGFcbiAgICovXG5cbiAgc3RyYXRzLmRhdGEgPSBmdW5jdGlvbiAocGFyZW50VmFsLCBjaGlsZFZhbCwgdm0pIHtcbiAgICBpZiAoIXZtKSB7XG4gICAgICAvLyBpbiBhIFZ1ZS5leHRlbmQgbWVyZ2UsIGJvdGggc2hvdWxkIGJlIGZ1bmN0aW9uc1xuICAgICAgaWYgKCFjaGlsZFZhbCkge1xuICAgICAgICByZXR1cm4gcGFyZW50VmFsO1xuICAgICAgfVxuICAgICAgaWYgKHR5cGVvZiBjaGlsZFZhbCAhPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAnZGV2ZWxvcG1lbnQnICE9PSAncHJvZHVjdGlvbicgJiYgd2FybignVGhlIFwiZGF0YVwiIG9wdGlvbiBzaG91bGQgYmUgYSBmdW5jdGlvbiAnICsgJ3RoYXQgcmV0dXJucyBhIHBlci1pbnN0YW5jZSB2YWx1ZSBpbiBjb21wb25lbnQgJyArICdkZWZpbml0aW9ucy4nLCB2bSk7XG4gICAgICAgIHJldHVybiBwYXJlbnRWYWw7XG4gICAgICB9XG4gICAgICBpZiAoIXBhcmVudFZhbCkge1xuICAgICAgICByZXR1cm4gY2hpbGRWYWw7XG4gICAgICB9XG4gICAgICAvLyB3aGVuIHBhcmVudFZhbCAmIGNoaWxkVmFsIGFyZSBib3RoIHByZXNlbnQsXG4gICAgICAvLyB3ZSBuZWVkIHRvIHJldHVybiBhIGZ1bmN0aW9uIHRoYXQgcmV0dXJucyB0aGVcbiAgICAgIC8vIG1lcmdlZCByZXN1bHQgb2YgYm90aCBmdW5jdGlvbnMuLi4gbm8gbmVlZCB0b1xuICAgICAgLy8gY2hlY2sgaWYgcGFyZW50VmFsIGlzIGEgZnVuY3Rpb24gaGVyZSBiZWNhdXNlXG4gICAgICAvLyBpdCBoYXMgdG8gYmUgYSBmdW5jdGlvbiB0byBwYXNzIHByZXZpb3VzIG1lcmdlcy5cbiAgICAgIHJldHVybiBmdW5jdGlvbiBtZXJnZWREYXRhRm4oKSB7XG4gICAgICAgIHJldHVybiBtZXJnZURhdGEoY2hpbGRWYWwuY2FsbCh0aGlzKSwgcGFyZW50VmFsLmNhbGwodGhpcykpO1xuICAgICAgfTtcbiAgICB9IGVsc2UgaWYgKHBhcmVudFZhbCB8fCBjaGlsZFZhbCkge1xuICAgICAgcmV0dXJuIGZ1bmN0aW9uIG1lcmdlZEluc3RhbmNlRGF0YUZuKCkge1xuICAgICAgICAvLyBpbnN0YW5jZSBtZXJnZVxuICAgICAgICB2YXIgaW5zdGFuY2VEYXRhID0gdHlwZW9mIGNoaWxkVmFsID09PSAnZnVuY3Rpb24nID8gY2hpbGRWYWwuY2FsbCh2bSkgOiBjaGlsZFZhbDtcbiAgICAgICAgdmFyIGRlZmF1bHREYXRhID0gdHlwZW9mIHBhcmVudFZhbCA9PT0gJ2Z1bmN0aW9uJyA/IHBhcmVudFZhbC5jYWxsKHZtKSA6IHVuZGVmaW5lZDtcbiAgICAgICAgaWYgKGluc3RhbmNlRGF0YSkge1xuICAgICAgICAgIHJldHVybiBtZXJnZURhdGEoaW5zdGFuY2VEYXRhLCBkZWZhdWx0RGF0YSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmV0dXJuIGRlZmF1bHREYXRhO1xuICAgICAgICB9XG4gICAgICB9O1xuICAgIH1cbiAgfTtcblxuICAvKipcbiAgICogRWxcbiAgICovXG5cbiAgc3RyYXRzLmVsID0gZnVuY3Rpb24gKHBhcmVudFZhbCwgY2hpbGRWYWwsIHZtKSB7XG4gICAgaWYgKCF2bSAmJiBjaGlsZFZhbCAmJiB0eXBlb2YgY2hpbGRWYWwgIT09ICdmdW5jdGlvbicpIHtcbiAgICAgICdkZXZlbG9wbWVudCcgIT09ICdwcm9kdWN0aW9uJyAmJiB3YXJuKCdUaGUgXCJlbFwiIG9wdGlvbiBzaG91bGQgYmUgYSBmdW5jdGlvbiAnICsgJ3RoYXQgcmV0dXJucyBhIHBlci1pbnN0YW5jZSB2YWx1ZSBpbiBjb21wb25lbnQgJyArICdkZWZpbml0aW9ucy4nLCB2bSk7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHZhciByZXQgPSBjaGlsZFZhbCB8fCBwYXJlbnRWYWw7XG4gICAgLy8gaW52b2tlIHRoZSBlbGVtZW50IGZhY3RvcnkgaWYgdGhpcyBpcyBpbnN0YW5jZSBtZXJnZVxuICAgIHJldHVybiB2bSAmJiB0eXBlb2YgcmV0ID09PSAnZnVuY3Rpb24nID8gcmV0LmNhbGwodm0pIDogcmV0O1xuICB9O1xuXG4gIC8qKlxuICAgKiBIb29rcyBhbmQgcGFyYW0gYXR0cmlidXRlcyBhcmUgbWVyZ2VkIGFzIGFycmF5cy5cbiAgICovXG5cbiAgc3RyYXRzLmluaXQgPSBzdHJhdHMuY3JlYXRlZCA9IHN0cmF0cy5yZWFkeSA9IHN0cmF0cy5hdHRhY2hlZCA9IHN0cmF0cy5kZXRhY2hlZCA9IHN0cmF0cy5iZWZvcmVDb21waWxlID0gc3RyYXRzLmNvbXBpbGVkID0gc3RyYXRzLmJlZm9yZURlc3Ryb3kgPSBzdHJhdHMuZGVzdHJveWVkID0gc3RyYXRzLmFjdGl2YXRlID0gZnVuY3Rpb24gKHBhcmVudFZhbCwgY2hpbGRWYWwpIHtcbiAgICByZXR1cm4gY2hpbGRWYWwgPyBwYXJlbnRWYWwgPyBwYXJlbnRWYWwuY29uY2F0KGNoaWxkVmFsKSA6IGlzQXJyYXkoY2hpbGRWYWwpID8gY2hpbGRWYWwgOiBbY2hpbGRWYWxdIDogcGFyZW50VmFsO1xuICB9O1xuXG4gIC8qKlxuICAgKiBBc3NldHNcbiAgICpcbiAgICogV2hlbiBhIHZtIGlzIHByZXNlbnQgKGluc3RhbmNlIGNyZWF0aW9uKSwgd2UgbmVlZCB0byBkb1xuICAgKiBhIHRocmVlLXdheSBtZXJnZSBiZXR3ZWVuIGNvbnN0cnVjdG9yIG9wdGlvbnMsIGluc3RhbmNlXG4gICAqIG9wdGlvbnMgYW5kIHBhcmVudCBvcHRpb25zLlxuICAgKi9cblxuICBmdW5jdGlvbiBtZXJnZUFzc2V0cyhwYXJlbnRWYWwsIGNoaWxkVmFsKSB7XG4gICAgdmFyIHJlcyA9IE9iamVjdC5jcmVhdGUocGFyZW50VmFsIHx8IG51bGwpO1xuICAgIHJldHVybiBjaGlsZFZhbCA/IGV4dGVuZChyZXMsIGd1YXJkQXJyYXlBc3NldHMoY2hpbGRWYWwpKSA6IHJlcztcbiAgfVxuXG4gIGNvbmZpZy5fYXNzZXRUeXBlcy5mb3JFYWNoKGZ1bmN0aW9uICh0eXBlKSB7XG4gICAgc3RyYXRzW3R5cGUgKyAncyddID0gbWVyZ2VBc3NldHM7XG4gIH0pO1xuXG4gIC8qKlxuICAgKiBFdmVudHMgJiBXYXRjaGVycy5cbiAgICpcbiAgICogRXZlbnRzICYgd2F0Y2hlcnMgaGFzaGVzIHNob3VsZCBub3Qgb3ZlcndyaXRlIG9uZVxuICAgKiBhbm90aGVyLCBzbyB3ZSBtZXJnZSB0aGVtIGFzIGFycmF5cy5cbiAgICovXG5cbiAgc3RyYXRzLndhdGNoID0gc3RyYXRzLmV2ZW50cyA9IGZ1bmN0aW9uIChwYXJlbnRWYWwsIGNoaWxkVmFsKSB7XG4gICAgaWYgKCFjaGlsZFZhbCkgcmV0dXJuIHBhcmVudFZhbDtcbiAgICBpZiAoIXBhcmVudFZhbCkgcmV0dXJuIGNoaWxkVmFsO1xuICAgIHZhciByZXQgPSB7fTtcbiAgICBleHRlbmQocmV0LCBwYXJlbnRWYWwpO1xuICAgIGZvciAodmFyIGtleSBpbiBjaGlsZFZhbCkge1xuICAgICAgdmFyIHBhcmVudCA9IHJldFtrZXldO1xuICAgICAgdmFyIGNoaWxkID0gY2hpbGRWYWxba2V5XTtcbiAgICAgIGlmIChwYXJlbnQgJiYgIWlzQXJyYXkocGFyZW50KSkge1xuICAgICAgICBwYXJlbnQgPSBbcGFyZW50XTtcbiAgICAgIH1cbiAgICAgIHJldFtrZXldID0gcGFyZW50ID8gcGFyZW50LmNvbmNhdChjaGlsZCkgOiBbY2hpbGRdO1xuICAgIH1cbiAgICByZXR1cm4gcmV0O1xuICB9O1xuXG4gIC8qKlxuICAgKiBPdGhlciBvYmplY3QgaGFzaGVzLlxuICAgKi9cblxuICBzdHJhdHMucHJvcHMgPSBzdHJhdHMubWV0aG9kcyA9IHN0cmF0cy5jb21wdXRlZCA9IGZ1bmN0aW9uIChwYXJlbnRWYWwsIGNoaWxkVmFsKSB7XG4gICAgaWYgKCFjaGlsZFZhbCkgcmV0dXJuIHBhcmVudFZhbDtcbiAgICBpZiAoIXBhcmVudFZhbCkgcmV0dXJuIGNoaWxkVmFsO1xuICAgIHZhciByZXQgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuICAgIGV4dGVuZChyZXQsIHBhcmVudFZhbCk7XG4gICAgZXh0ZW5kKHJldCwgY2hpbGRWYWwpO1xuICAgIHJldHVybiByZXQ7XG4gIH07XG5cbiAgLyoqXG4gICAqIERlZmF1bHQgc3RyYXRlZ3kuXG4gICAqL1xuXG4gIHZhciBkZWZhdWx0U3RyYXQgPSBmdW5jdGlvbiBkZWZhdWx0U3RyYXQocGFyZW50VmFsLCBjaGlsZFZhbCkge1xuICAgIHJldHVybiBjaGlsZFZhbCA9PT0gdW5kZWZpbmVkID8gcGFyZW50VmFsIDogY2hpbGRWYWw7XG4gIH07XG5cbiAgLyoqXG4gICAqIE1ha2Ugc3VyZSBjb21wb25lbnQgb3B0aW9ucyBnZXQgY29udmVydGVkIHRvIGFjdHVhbFxuICAgKiBjb25zdHJ1Y3RvcnMuXG4gICAqXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zXG4gICAqL1xuXG4gIGZ1bmN0aW9uIGd1YXJkQ29tcG9uZW50cyhvcHRpb25zKSB7XG4gICAgaWYgKG9wdGlvbnMuY29tcG9uZW50cykge1xuICAgICAgdmFyIGNvbXBvbmVudHMgPSBvcHRpb25zLmNvbXBvbmVudHMgPSBndWFyZEFycmF5QXNzZXRzKG9wdGlvbnMuY29tcG9uZW50cyk7XG4gICAgICB2YXIgaWRzID0gT2JqZWN0LmtleXMoY29tcG9uZW50cyk7XG4gICAgICB2YXIgZGVmO1xuICAgICAgaWYgKCdkZXZlbG9wbWVudCcgIT09ICdwcm9kdWN0aW9uJykge1xuICAgICAgICB2YXIgbWFwID0gb3B0aW9ucy5fY29tcG9uZW50TmFtZU1hcCA9IHt9O1xuICAgICAgfVxuICAgICAgZm9yICh2YXIgaSA9IDAsIGwgPSBpZHMubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG4gICAgICAgIHZhciBrZXkgPSBpZHNbaV07XG4gICAgICAgIGlmIChjb21tb25UYWdSRS50ZXN0KGtleSkgfHwgcmVzZXJ2ZWRUYWdSRS50ZXN0KGtleSkpIHtcbiAgICAgICAgICAnZGV2ZWxvcG1lbnQnICE9PSAncHJvZHVjdGlvbicgJiYgd2FybignRG8gbm90IHVzZSBidWlsdC1pbiBvciByZXNlcnZlZCBIVE1MIGVsZW1lbnRzIGFzIGNvbXBvbmVudCAnICsgJ2lkOiAnICsga2V5KTtcbiAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgfVxuICAgICAgICAvLyByZWNvcmQgYSBhbGwgbG93ZXJjYXNlIDwtPiBrZWJhYi1jYXNlIG1hcHBpbmcgZm9yXG4gICAgICAgIC8vIHBvc3NpYmxlIGN1c3RvbSBlbGVtZW50IGNhc2UgZXJyb3Igd2FybmluZ1xuICAgICAgICBpZiAoJ2RldmVsb3BtZW50JyAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgICAgICAgbWFwW2tleS5yZXBsYWNlKC8tL2csICcnKS50b0xvd2VyQ2FzZSgpXSA9IGh5cGhlbmF0ZShrZXkpO1xuICAgICAgICB9XG4gICAgICAgIGRlZiA9IGNvbXBvbmVudHNba2V5XTtcbiAgICAgICAgaWYgKGlzUGxhaW5PYmplY3QoZGVmKSkge1xuICAgICAgICAgIGNvbXBvbmVudHNba2V5XSA9IFZ1ZS5leHRlbmQoZGVmKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBFbnN1cmUgYWxsIHByb3BzIG9wdGlvbiBzeW50YXggYXJlIG5vcm1hbGl6ZWQgaW50byB0aGVcbiAgICogT2JqZWN0LWJhc2VkIGZvcm1hdC5cbiAgICpcbiAgICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnNcbiAgICovXG5cbiAgZnVuY3Rpb24gZ3VhcmRQcm9wcyhvcHRpb25zKSB7XG4gICAgdmFyIHByb3BzID0gb3B0aW9ucy5wcm9wcztcbiAgICB2YXIgaSwgdmFsO1xuICAgIGlmIChpc0FycmF5KHByb3BzKSkge1xuICAgICAgb3B0aW9ucy5wcm9wcyA9IHt9O1xuICAgICAgaSA9IHByb3BzLmxlbmd0aDtcbiAgICAgIHdoaWxlIChpLS0pIHtcbiAgICAgICAgdmFsID0gcHJvcHNbaV07XG4gICAgICAgIGlmICh0eXBlb2YgdmFsID09PSAnc3RyaW5nJykge1xuICAgICAgICAgIG9wdGlvbnMucHJvcHNbdmFsXSA9IG51bGw7XG4gICAgICAgIH0gZWxzZSBpZiAodmFsLm5hbWUpIHtcbiAgICAgICAgICBvcHRpb25zLnByb3BzW3ZhbC5uYW1lXSA9IHZhbDtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0gZWxzZSBpZiAoaXNQbGFpbk9iamVjdChwcm9wcykpIHtcbiAgICAgIHZhciBrZXlzID0gT2JqZWN0LmtleXMocHJvcHMpO1xuICAgICAgaSA9IGtleXMubGVuZ3RoO1xuICAgICAgd2hpbGUgKGktLSkge1xuICAgICAgICB2YWwgPSBwcm9wc1trZXlzW2ldXTtcbiAgICAgICAgaWYgKHR5cGVvZiB2YWwgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICBwcm9wc1trZXlzW2ldXSA9IHsgdHlwZTogdmFsIH07XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogR3VhcmQgYW4gQXJyYXktZm9ybWF0IGFzc2V0cyBvcHRpb24gYW5kIGNvbnZlcnRlZCBpdFxuICAgKiBpbnRvIHRoZSBrZXktdmFsdWUgT2JqZWN0IGZvcm1hdC5cbiAgICpcbiAgICogQHBhcmFtIHtPYmplY3R8QXJyYXl9IGFzc2V0c1xuICAgKiBAcmV0dXJuIHtPYmplY3R9XG4gICAqL1xuXG4gIGZ1bmN0aW9uIGd1YXJkQXJyYXlBc3NldHMoYXNzZXRzKSB7XG4gICAgaWYgKGlzQXJyYXkoYXNzZXRzKSkge1xuICAgICAgdmFyIHJlcyA9IHt9O1xuICAgICAgdmFyIGkgPSBhc3NldHMubGVuZ3RoO1xuICAgICAgdmFyIGFzc2V0O1xuICAgICAgd2hpbGUgKGktLSkge1xuICAgICAgICBhc3NldCA9IGFzc2V0c1tpXTtcbiAgICAgICAgdmFyIGlkID0gdHlwZW9mIGFzc2V0ID09PSAnZnVuY3Rpb24nID8gYXNzZXQub3B0aW9ucyAmJiBhc3NldC5vcHRpb25zLm5hbWUgfHwgYXNzZXQuaWQgOiBhc3NldC5uYW1lIHx8IGFzc2V0LmlkO1xuICAgICAgICBpZiAoIWlkKSB7XG4gICAgICAgICAgJ2RldmVsb3BtZW50JyAhPT0gJ3Byb2R1Y3Rpb24nICYmIHdhcm4oJ0FycmF5LXN5bnRheCBhc3NldHMgbXVzdCBwcm92aWRlIGEgXCJuYW1lXCIgb3IgXCJpZFwiIGZpZWxkLicpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJlc1tpZF0gPSBhc3NldDtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIHJlcztcbiAgICB9XG4gICAgcmV0dXJuIGFzc2V0cztcbiAgfVxuXG4gIC8qKlxuICAgKiBNZXJnZSB0d28gb3B0aW9uIG9iamVjdHMgaW50byBhIG5ldyBvbmUuXG4gICAqIENvcmUgdXRpbGl0eSB1c2VkIGluIGJvdGggaW5zdGFudGlhdGlvbiBhbmQgaW5oZXJpdGFuY2UuXG4gICAqXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBwYXJlbnRcbiAgICogQHBhcmFtIHtPYmplY3R9IGNoaWxkXG4gICAqIEBwYXJhbSB7VnVlfSBbdm1dIC0gaWYgdm0gaXMgcHJlc2VudCwgaW5kaWNhdGVzIHRoaXMgaXNcbiAgICogICAgICAgICAgICAgICAgICAgICBhbiBpbnN0YW50aWF0aW9uIG1lcmdlLlxuICAgKi9cblxuICBmdW5jdGlvbiBtZXJnZU9wdGlvbnMocGFyZW50LCBjaGlsZCwgdm0pIHtcbiAgICBndWFyZENvbXBvbmVudHMoY2hpbGQpO1xuICAgIGd1YXJkUHJvcHMoY2hpbGQpO1xuICAgIGlmICgnZGV2ZWxvcG1lbnQnICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICAgIGlmIChjaGlsZC5wcm9wc0RhdGEgJiYgIXZtKSB7XG4gICAgICAgIHdhcm4oJ3Byb3BzRGF0YSBjYW4gb25seSBiZSB1c2VkIGFzIGFuIGluc3RhbnRpYXRpb24gb3B0aW9uLicpO1xuICAgICAgfVxuICAgIH1cbiAgICB2YXIgb3B0aW9ucyA9IHt9O1xuICAgIHZhciBrZXk7XG4gICAgaWYgKGNoaWxkWydleHRlbmRzJ10pIHtcbiAgICAgIHBhcmVudCA9IHR5cGVvZiBjaGlsZFsnZXh0ZW5kcyddID09PSAnZnVuY3Rpb24nID8gbWVyZ2VPcHRpb25zKHBhcmVudCwgY2hpbGRbJ2V4dGVuZHMnXS5vcHRpb25zLCB2bSkgOiBtZXJnZU9wdGlvbnMocGFyZW50LCBjaGlsZFsnZXh0ZW5kcyddLCB2bSk7XG4gICAgfVxuICAgIGlmIChjaGlsZC5taXhpbnMpIHtcbiAgICAgIGZvciAodmFyIGkgPSAwLCBsID0gY2hpbGQubWl4aW5zLmxlbmd0aDsgaSA8IGw7IGkrKykge1xuICAgICAgICBwYXJlbnQgPSBtZXJnZU9wdGlvbnMocGFyZW50LCBjaGlsZC5taXhpbnNbaV0sIHZtKTtcbiAgICAgIH1cbiAgICB9XG4gICAgZm9yIChrZXkgaW4gcGFyZW50KSB7XG4gICAgICBtZXJnZUZpZWxkKGtleSk7XG4gICAgfVxuICAgIGZvciAoa2V5IGluIGNoaWxkKSB7XG4gICAgICBpZiAoIWhhc093bihwYXJlbnQsIGtleSkpIHtcbiAgICAgICAgbWVyZ2VGaWVsZChrZXkpO1xuICAgICAgfVxuICAgIH1cbiAgICBmdW5jdGlvbiBtZXJnZUZpZWxkKGtleSkge1xuICAgICAgdmFyIHN0cmF0ID0gc3RyYXRzW2tleV0gfHwgZGVmYXVsdFN0cmF0O1xuICAgICAgb3B0aW9uc1trZXldID0gc3RyYXQocGFyZW50W2tleV0sIGNoaWxkW2tleV0sIHZtLCBrZXkpO1xuICAgIH1cbiAgICByZXR1cm4gb3B0aW9ucztcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXNvbHZlIGFuIGFzc2V0LlxuICAgKiBUaGlzIGZ1bmN0aW9uIGlzIHVzZWQgYmVjYXVzZSBjaGlsZCBpbnN0YW5jZXMgbmVlZCBhY2Nlc3NcbiAgICogdG8gYXNzZXRzIGRlZmluZWQgaW4gaXRzIGFuY2VzdG9yIGNoYWluLlxuICAgKlxuICAgKiBAcGFyYW0ge09iamVjdH0gb3B0aW9uc1xuICAgKiBAcGFyYW0ge1N0cmluZ30gdHlwZVxuICAgKiBAcGFyYW0ge1N0cmluZ30gaWRcbiAgICogQHBhcmFtIHtCb29sZWFufSB3YXJuTWlzc2luZ1xuICAgKiBAcmV0dXJuIHtPYmplY3R8RnVuY3Rpb259XG4gICAqL1xuXG4gIGZ1bmN0aW9uIHJlc29sdmVBc3NldChvcHRpb25zLCB0eXBlLCBpZCwgd2Fybk1pc3NpbmcpIHtcbiAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgaWYgKi9cbiAgICBpZiAodHlwZW9mIGlkICE9PSAnc3RyaW5nJykge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB2YXIgYXNzZXRzID0gb3B0aW9uc1t0eXBlXTtcbiAgICB2YXIgY2FtZWxpemVkSWQ7XG4gICAgdmFyIHJlcyA9IGFzc2V0c1tpZF0gfHxcbiAgICAvLyBjYW1lbENhc2UgSURcbiAgICBhc3NldHNbY2FtZWxpemVkSWQgPSBjYW1lbGl6ZShpZCldIHx8XG4gICAgLy8gUGFzY2FsIENhc2UgSURcbiAgICBhc3NldHNbY2FtZWxpemVkSWQuY2hhckF0KDApLnRvVXBwZXJDYXNlKCkgKyBjYW1lbGl6ZWRJZC5zbGljZSgxKV07XG4gICAgaWYgKCdkZXZlbG9wbWVudCcgIT09ICdwcm9kdWN0aW9uJyAmJiB3YXJuTWlzc2luZyAmJiAhcmVzKSB7XG4gICAgICB3YXJuKCdGYWlsZWQgdG8gcmVzb2x2ZSAnICsgdHlwZS5zbGljZSgwLCAtMSkgKyAnOiAnICsgaWQsIG9wdGlvbnMpO1xuICAgIH1cbiAgICByZXR1cm4gcmVzO1xuICB9XG5cbiAgdmFyIHVpZCQxID0gMDtcblxuICAvKipcbiAgICogQSBkZXAgaXMgYW4gb2JzZXJ2YWJsZSB0aGF0IGNhbiBoYXZlIG11bHRpcGxlXG4gICAqIGRpcmVjdGl2ZXMgc3Vic2NyaWJpbmcgdG8gaXQuXG4gICAqXG4gICAqIEBjb25zdHJ1Y3RvclxuICAgKi9cbiAgZnVuY3Rpb24gRGVwKCkge1xuICAgIHRoaXMuaWQgPSB1aWQkMSsrO1xuICAgIHRoaXMuc3VicyA9IFtdO1xuICB9XG5cbiAgLy8gdGhlIGN1cnJlbnQgdGFyZ2V0IHdhdGNoZXIgYmVpbmcgZXZhbHVhdGVkLlxuICAvLyB0aGlzIGlzIGdsb2JhbGx5IHVuaXF1ZSBiZWNhdXNlIHRoZXJlIGNvdWxkIGJlIG9ubHkgb25lXG4gIC8vIHdhdGNoZXIgYmVpbmcgZXZhbHVhdGVkIGF0IGFueSB0aW1lLlxuICBEZXAudGFyZ2V0ID0gbnVsbDtcblxuICAvKipcbiAgICogQWRkIGEgZGlyZWN0aXZlIHN1YnNjcmliZXIuXG4gICAqXG4gICAqIEBwYXJhbSB7RGlyZWN0aXZlfSBzdWJcbiAgICovXG5cbiAgRGVwLnByb3RvdHlwZS5hZGRTdWIgPSBmdW5jdGlvbiAoc3ViKSB7XG4gICAgdGhpcy5zdWJzLnB1c2goc3ViKTtcbiAgfTtcblxuICAvKipcbiAgICogUmVtb3ZlIGEgZGlyZWN0aXZlIHN1YnNjcmliZXIuXG4gICAqXG4gICAqIEBwYXJhbSB7RGlyZWN0aXZlfSBzdWJcbiAgICovXG5cbiAgRGVwLnByb3RvdHlwZS5yZW1vdmVTdWIgPSBmdW5jdGlvbiAoc3ViKSB7XG4gICAgdGhpcy5zdWJzLiRyZW1vdmUoc3ViKTtcbiAgfTtcblxuICAvKipcbiAgICogQWRkIHNlbGYgYXMgYSBkZXBlbmRlbmN5IHRvIHRoZSB0YXJnZXQgd2F0Y2hlci5cbiAgICovXG5cbiAgRGVwLnByb3RvdHlwZS5kZXBlbmQgPSBmdW5jdGlvbiAoKSB7XG4gICAgRGVwLnRhcmdldC5hZGREZXAodGhpcyk7XG4gIH07XG5cbiAgLyoqXG4gICAqIE5vdGlmeSBhbGwgc3Vic2NyaWJlcnMgb2YgYSBuZXcgdmFsdWUuXG4gICAqL1xuXG4gIERlcC5wcm90b3R5cGUubm90aWZ5ID0gZnVuY3Rpb24gKCkge1xuICAgIC8vIHN0YWJsaXplIHRoZSBzdWJzY3JpYmVyIGxpc3QgZmlyc3RcbiAgICB2YXIgc3VicyA9IHRvQXJyYXkodGhpcy5zdWJzKTtcbiAgICBmb3IgKHZhciBpID0gMCwgbCA9IHN1YnMubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG4gICAgICBzdWJzW2ldLnVwZGF0ZSgpO1xuICAgIH1cbiAgfTtcblxuICB2YXIgYXJyYXlQcm90byA9IEFycmF5LnByb3RvdHlwZTtcbiAgdmFyIGFycmF5TWV0aG9kcyA9IE9iamVjdC5jcmVhdGUoYXJyYXlQcm90bylcblxuICAvKipcbiAgICogSW50ZXJjZXB0IG11dGF0aW5nIG1ldGhvZHMgYW5kIGVtaXQgZXZlbnRzXG4gICAqL1xuXG4gIDtbJ3B1c2gnLCAncG9wJywgJ3NoaWZ0JywgJ3Vuc2hpZnQnLCAnc3BsaWNlJywgJ3NvcnQnLCAncmV2ZXJzZSddLmZvckVhY2goZnVuY3Rpb24gKG1ldGhvZCkge1xuICAgIC8vIGNhY2hlIG9yaWdpbmFsIG1ldGhvZFxuICAgIHZhciBvcmlnaW5hbCA9IGFycmF5UHJvdG9bbWV0aG9kXTtcbiAgICBkZWYoYXJyYXlNZXRob2RzLCBtZXRob2QsIGZ1bmN0aW9uIG11dGF0b3IoKSB7XG4gICAgICAvLyBhdm9pZCBsZWFraW5nIGFyZ3VtZW50czpcbiAgICAgIC8vIGh0dHA6Ly9qc3BlcmYuY29tL2Nsb3N1cmUtd2l0aC1hcmd1bWVudHNcbiAgICAgIHZhciBpID0gYXJndW1lbnRzLmxlbmd0aDtcbiAgICAgIHZhciBhcmdzID0gbmV3IEFycmF5KGkpO1xuICAgICAgd2hpbGUgKGktLSkge1xuICAgICAgICBhcmdzW2ldID0gYXJndW1lbnRzW2ldO1xuICAgICAgfVxuICAgICAgdmFyIHJlc3VsdCA9IG9yaWdpbmFsLmFwcGx5KHRoaXMsIGFyZ3MpO1xuICAgICAgdmFyIG9iID0gdGhpcy5fX29iX187XG4gICAgICB2YXIgaW5zZXJ0ZWQ7XG4gICAgICBzd2l0Y2ggKG1ldGhvZCkge1xuICAgICAgICBjYXNlICdwdXNoJzpcbiAgICAgICAgICBpbnNlcnRlZCA9IGFyZ3M7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgJ3Vuc2hpZnQnOlxuICAgICAgICAgIGluc2VydGVkID0gYXJncztcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAnc3BsaWNlJzpcbiAgICAgICAgICBpbnNlcnRlZCA9IGFyZ3Muc2xpY2UoMik7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgICBpZiAoaW5zZXJ0ZWQpIG9iLm9ic2VydmVBcnJheShpbnNlcnRlZCk7XG4gICAgICAvLyBub3RpZnkgY2hhbmdlXG4gICAgICBvYi5kZXAubm90aWZ5KCk7XG4gICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH0pO1xuICB9KTtcblxuICAvKipcbiAgICogU3dhcCB0aGUgZWxlbWVudCBhdCB0aGUgZ2l2ZW4gaW5kZXggd2l0aCBhIG5ldyB2YWx1ZVxuICAgKiBhbmQgZW1pdHMgY29ycmVzcG9uZGluZyBldmVudC5cbiAgICpcbiAgICogQHBhcmFtIHtOdW1iZXJ9IGluZGV4XG4gICAqIEBwYXJhbSB7Kn0gdmFsXG4gICAqIEByZXR1cm4geyp9IC0gcmVwbGFjZWQgZWxlbWVudFxuICAgKi9cblxuICBkZWYoYXJyYXlQcm90bywgJyRzZXQnLCBmdW5jdGlvbiAkc2V0KGluZGV4LCB2YWwpIHtcbiAgICBpZiAoaW5kZXggPj0gdGhpcy5sZW5ndGgpIHtcbiAgICAgIHRoaXMubGVuZ3RoID0gTnVtYmVyKGluZGV4KSArIDE7XG4gICAgfVxuICAgIHJldHVybiB0aGlzLnNwbGljZShpbmRleCwgMSwgdmFsKVswXTtcbiAgfSk7XG5cbiAgLyoqXG4gICAqIENvbnZlbmllbmNlIG1ldGhvZCB0byByZW1vdmUgdGhlIGVsZW1lbnQgYXQgZ2l2ZW4gaW5kZXggb3IgdGFyZ2V0IGVsZW1lbnQgcmVmZXJlbmNlLlxuICAgKlxuICAgKiBAcGFyYW0geyp9IGl0ZW1cbiAgICovXG5cbiAgZGVmKGFycmF5UHJvdG8sICckcmVtb3ZlJywgZnVuY3Rpb24gJHJlbW92ZShpdGVtKSB7XG4gICAgLyogaXN0YW5idWwgaWdub3JlIGlmICovXG4gICAgaWYgKCF0aGlzLmxlbmd0aCkgcmV0dXJuO1xuICAgIHZhciBpbmRleCA9IGluZGV4T2YodGhpcywgaXRlbSk7XG4gICAgaWYgKGluZGV4ID4gLTEpIHtcbiAgICAgIHJldHVybiB0aGlzLnNwbGljZShpbmRleCwgMSk7XG4gICAgfVxuICB9KTtcblxuICB2YXIgYXJyYXlLZXlzID0gT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMoYXJyYXlNZXRob2RzKTtcblxuICAvKipcbiAgICogQnkgZGVmYXVsdCwgd2hlbiBhIHJlYWN0aXZlIHByb3BlcnR5IGlzIHNldCwgdGhlIG5ldyB2YWx1ZSBpc1xuICAgKiBhbHNvIGNvbnZlcnRlZCB0byBiZWNvbWUgcmVhY3RpdmUuIEhvd2V2ZXIgaW4gY2VydGFpbiBjYXNlcywgZS5nLlxuICAgKiB2LWZvciBzY29wZSBhbGlhcyBhbmQgcHJvcHMsIHdlIGRvbid0IHdhbnQgdG8gZm9yY2UgY29udmVyc2lvblxuICAgKiBiZWNhdXNlIHRoZSB2YWx1ZSBtYXkgYmUgYSBuZXN0ZWQgdmFsdWUgdW5kZXIgYSBmcm96ZW4gZGF0YSBzdHJ1Y3R1cmUuXG4gICAqXG4gICAqIFNvIHdoZW5ldmVyIHdlIHdhbnQgdG8gc2V0IGEgcmVhY3RpdmUgcHJvcGVydHkgd2l0aG91dCBmb3JjaW5nXG4gICAqIGNvbnZlcnNpb24gb24gdGhlIG5ldyB2YWx1ZSwgd2Ugd3JhcCB0aGF0IGNhbGwgaW5zaWRlIHRoaXMgZnVuY3Rpb24uXG4gICAqL1xuXG4gIHZhciBzaG91bGRDb252ZXJ0ID0gdHJ1ZTtcblxuICBmdW5jdGlvbiB3aXRob3V0Q29udmVyc2lvbihmbikge1xuICAgIHNob3VsZENvbnZlcnQgPSBmYWxzZTtcbiAgICBmbigpO1xuICAgIHNob3VsZENvbnZlcnQgPSB0cnVlO1xuICB9XG5cbiAgLyoqXG4gICAqIE9ic2VydmVyIGNsYXNzIHRoYXQgYXJlIGF0dGFjaGVkIHRvIGVhY2ggb2JzZXJ2ZWRcbiAgICogb2JqZWN0LiBPbmNlIGF0dGFjaGVkLCB0aGUgb2JzZXJ2ZXIgY29udmVydHMgdGFyZ2V0XG4gICAqIG9iamVjdCdzIHByb3BlcnR5IGtleXMgaW50byBnZXR0ZXIvc2V0dGVycyB0aGF0XG4gICAqIGNvbGxlY3QgZGVwZW5kZW5jaWVzIGFuZCBkaXNwYXRjaGVzIHVwZGF0ZXMuXG4gICAqXG4gICAqIEBwYXJhbSB7QXJyYXl8T2JqZWN0fSB2YWx1ZVxuICAgKiBAY29uc3RydWN0b3JcbiAgICovXG5cbiAgZnVuY3Rpb24gT2JzZXJ2ZXIodmFsdWUpIHtcbiAgICB0aGlzLnZhbHVlID0gdmFsdWU7XG4gICAgdGhpcy5kZXAgPSBuZXcgRGVwKCk7XG4gICAgZGVmKHZhbHVlLCAnX19vYl9fJywgdGhpcyk7XG4gICAgaWYgKGlzQXJyYXkodmFsdWUpKSB7XG4gICAgICB2YXIgYXVnbWVudCA9IGhhc1Byb3RvID8gcHJvdG9BdWdtZW50IDogY29weUF1Z21lbnQ7XG4gICAgICBhdWdtZW50KHZhbHVlLCBhcnJheU1ldGhvZHMsIGFycmF5S2V5cyk7XG4gICAgICB0aGlzLm9ic2VydmVBcnJheSh2YWx1ZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMud2Fsayh2YWx1ZSk7XG4gICAgfVxuICB9XG5cbiAgLy8gSW5zdGFuY2UgbWV0aG9kc1xuXG4gIC8qKlxuICAgKiBXYWxrIHRocm91Z2ggZWFjaCBwcm9wZXJ0eSBhbmQgY29udmVydCB0aGVtIGludG9cbiAgICogZ2V0dGVyL3NldHRlcnMuIFRoaXMgbWV0aG9kIHNob3VsZCBvbmx5IGJlIGNhbGxlZCB3aGVuXG4gICAqIHZhbHVlIHR5cGUgaXMgT2JqZWN0LlxuICAgKlxuICAgKiBAcGFyYW0ge09iamVjdH0gb2JqXG4gICAqL1xuXG4gIE9ic2VydmVyLnByb3RvdHlwZS53YWxrID0gZnVuY3Rpb24gKG9iaikge1xuICAgIHZhciBrZXlzID0gT2JqZWN0LmtleXMob2JqKTtcbiAgICBmb3IgKHZhciBpID0gMCwgbCA9IGtleXMubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG4gICAgICB0aGlzLmNvbnZlcnQoa2V5c1tpXSwgb2JqW2tleXNbaV1dKTtcbiAgICB9XG4gIH07XG5cbiAgLyoqXG4gICAqIE9ic2VydmUgYSBsaXN0IG9mIEFycmF5IGl0ZW1zLlxuICAgKlxuICAgKiBAcGFyYW0ge0FycmF5fSBpdGVtc1xuICAgKi9cblxuICBPYnNlcnZlci5wcm90b3R5cGUub2JzZXJ2ZUFycmF5ID0gZnVuY3Rpb24gKGl0ZW1zKSB7XG4gICAgZm9yICh2YXIgaSA9IDAsIGwgPSBpdGVtcy5sZW5ndGg7IGkgPCBsOyBpKyspIHtcbiAgICAgIG9ic2VydmUoaXRlbXNbaV0pO1xuICAgIH1cbiAgfTtcblxuICAvKipcbiAgICogQ29udmVydCBhIHByb3BlcnR5IGludG8gZ2V0dGVyL3NldHRlciBzbyB3ZSBjYW4gZW1pdFxuICAgKiB0aGUgZXZlbnRzIHdoZW4gdGhlIHByb3BlcnR5IGlzIGFjY2Vzc2VkL2NoYW5nZWQuXG4gICAqXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBrZXlcbiAgICogQHBhcmFtIHsqfSB2YWxcbiAgICovXG5cbiAgT2JzZXJ2ZXIucHJvdG90eXBlLmNvbnZlcnQgPSBmdW5jdGlvbiAoa2V5LCB2YWwpIHtcbiAgICBkZWZpbmVSZWFjdGl2ZSh0aGlzLnZhbHVlLCBrZXksIHZhbCk7XG4gIH07XG5cbiAgLyoqXG4gICAqIEFkZCBhbiBvd25lciB2bSwgc28gdGhhdCB3aGVuICRzZXQvJGRlbGV0ZSBtdXRhdGlvbnNcbiAgICogaGFwcGVuIHdlIGNhbiBub3RpZnkgb3duZXIgdm1zIHRvIHByb3h5IHRoZSBrZXlzIGFuZFxuICAgKiBkaWdlc3QgdGhlIHdhdGNoZXJzLiBUaGlzIGlzIG9ubHkgY2FsbGVkIHdoZW4gdGhlIG9iamVjdFxuICAgKiBpcyBvYnNlcnZlZCBhcyBhbiBpbnN0YW5jZSdzIHJvb3QgJGRhdGEuXG4gICAqXG4gICAqIEBwYXJhbSB7VnVlfSB2bVxuICAgKi9cblxuICBPYnNlcnZlci5wcm90b3R5cGUuYWRkVm0gPSBmdW5jdGlvbiAodm0pIHtcbiAgICAodGhpcy52bXMgfHwgKHRoaXMudm1zID0gW10pKS5wdXNoKHZtKTtcbiAgfTtcblxuICAvKipcbiAgICogUmVtb3ZlIGFuIG93bmVyIHZtLiBUaGlzIGlzIGNhbGxlZCB3aGVuIHRoZSBvYmplY3QgaXNcbiAgICogc3dhcHBlZCBvdXQgYXMgYW4gaW5zdGFuY2UncyAkZGF0YSBvYmplY3QuXG4gICAqXG4gICAqIEBwYXJhbSB7VnVlfSB2bVxuICAgKi9cblxuICBPYnNlcnZlci5wcm90b3R5cGUucmVtb3ZlVm0gPSBmdW5jdGlvbiAodm0pIHtcbiAgICB0aGlzLnZtcy4kcmVtb3ZlKHZtKTtcbiAgfTtcblxuICAvLyBoZWxwZXJzXG5cbiAgLyoqXG4gICAqIEF1Z21lbnQgYW4gdGFyZ2V0IE9iamVjdCBvciBBcnJheSBieSBpbnRlcmNlcHRpbmdcbiAgICogdGhlIHByb3RvdHlwZSBjaGFpbiB1c2luZyBfX3Byb3RvX19cbiAgICpcbiAgICogQHBhcmFtIHtPYmplY3R8QXJyYXl9IHRhcmdldFxuICAgKiBAcGFyYW0ge09iamVjdH0gc3JjXG4gICAqL1xuXG4gIGZ1bmN0aW9uIHByb3RvQXVnbWVudCh0YXJnZXQsIHNyYykge1xuICAgIC8qIGVzbGludC1kaXNhYmxlIG5vLXByb3RvICovXG4gICAgdGFyZ2V0Ll9fcHJvdG9fXyA9IHNyYztcbiAgICAvKiBlc2xpbnQtZW5hYmxlIG5vLXByb3RvICovXG4gIH1cblxuICAvKipcbiAgICogQXVnbWVudCBhbiB0YXJnZXQgT2JqZWN0IG9yIEFycmF5IGJ5IGRlZmluaW5nXG4gICAqIGhpZGRlbiBwcm9wZXJ0aWVzLlxuICAgKlxuICAgKiBAcGFyYW0ge09iamVjdHxBcnJheX0gdGFyZ2V0XG4gICAqIEBwYXJhbSB7T2JqZWN0fSBwcm90b1xuICAgKi9cblxuICBmdW5jdGlvbiBjb3B5QXVnbWVudCh0YXJnZXQsIHNyYywga2V5cykge1xuICAgIGZvciAodmFyIGkgPSAwLCBsID0ga2V5cy5sZW5ndGg7IGkgPCBsOyBpKyspIHtcbiAgICAgIHZhciBrZXkgPSBrZXlzW2ldO1xuICAgICAgZGVmKHRhcmdldCwga2V5LCBzcmNba2V5XSk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEF0dGVtcHQgdG8gY3JlYXRlIGFuIG9ic2VydmVyIGluc3RhbmNlIGZvciBhIHZhbHVlLFxuICAgKiByZXR1cm5zIHRoZSBuZXcgb2JzZXJ2ZXIgaWYgc3VjY2Vzc2Z1bGx5IG9ic2VydmVkLFxuICAgKiBvciB0aGUgZXhpc3Rpbmcgb2JzZXJ2ZXIgaWYgdGhlIHZhbHVlIGFscmVhZHkgaGFzIG9uZS5cbiAgICpcbiAgICogQHBhcmFtIHsqfSB2YWx1ZVxuICAgKiBAcGFyYW0ge1Z1ZX0gW3ZtXVxuICAgKiBAcmV0dXJuIHtPYnNlcnZlcnx1bmRlZmluZWR9XG4gICAqIEBzdGF0aWNcbiAgICovXG5cbiAgZnVuY3Rpb24gb2JzZXJ2ZSh2YWx1ZSwgdm0pIHtcbiAgICBpZiAoIXZhbHVlIHx8IHR5cGVvZiB2YWx1ZSAhPT0gJ29iamVjdCcpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdmFyIG9iO1xuICAgIGlmIChoYXNPd24odmFsdWUsICdfX29iX18nKSAmJiB2YWx1ZS5fX29iX18gaW5zdGFuY2VvZiBPYnNlcnZlcikge1xuICAgICAgb2IgPSB2YWx1ZS5fX29iX187XG4gICAgfSBlbHNlIGlmIChzaG91bGRDb252ZXJ0ICYmIChpc0FycmF5KHZhbHVlKSB8fCBpc1BsYWluT2JqZWN0KHZhbHVlKSkgJiYgT2JqZWN0LmlzRXh0ZW5zaWJsZSh2YWx1ZSkgJiYgIXZhbHVlLl9pc1Z1ZSkge1xuICAgICAgb2IgPSBuZXcgT2JzZXJ2ZXIodmFsdWUpO1xuICAgIH1cbiAgICBpZiAob2IgJiYgdm0pIHtcbiAgICAgIG9iLmFkZFZtKHZtKTtcbiAgICB9XG4gICAgcmV0dXJuIG9iO1xuICB9XG5cbiAgLyoqXG4gICAqIERlZmluZSBhIHJlYWN0aXZlIHByb3BlcnR5IG9uIGFuIE9iamVjdC5cbiAgICpcbiAgICogQHBhcmFtIHtPYmplY3R9IG9ialxuICAgKiBAcGFyYW0ge1N0cmluZ30ga2V5XG4gICAqIEBwYXJhbSB7Kn0gdmFsXG4gICAqL1xuXG4gIGZ1bmN0aW9uIGRlZmluZVJlYWN0aXZlKG9iaiwga2V5LCB2YWwpIHtcbiAgICB2YXIgZGVwID0gbmV3IERlcCgpO1xuXG4gICAgdmFyIHByb3BlcnR5ID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihvYmosIGtleSk7XG4gICAgaWYgKHByb3BlcnR5ICYmIHByb3BlcnR5LmNvbmZpZ3VyYWJsZSA9PT0gZmFsc2UpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICAvLyBjYXRlciBmb3IgcHJlLWRlZmluZWQgZ2V0dGVyL3NldHRlcnNcbiAgICB2YXIgZ2V0dGVyID0gcHJvcGVydHkgJiYgcHJvcGVydHkuZ2V0O1xuICAgIHZhciBzZXR0ZXIgPSBwcm9wZXJ0eSAmJiBwcm9wZXJ0eS5zZXQ7XG5cbiAgICB2YXIgY2hpbGRPYiA9IG9ic2VydmUodmFsKTtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkob2JqLCBrZXksIHtcbiAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICBjb25maWd1cmFibGU6IHRydWUsXG4gICAgICBnZXQ6IGZ1bmN0aW9uIHJlYWN0aXZlR2V0dGVyKCkge1xuICAgICAgICB2YXIgdmFsdWUgPSBnZXR0ZXIgPyBnZXR0ZXIuY2FsbChvYmopIDogdmFsO1xuICAgICAgICBpZiAoRGVwLnRhcmdldCkge1xuICAgICAgICAgIGRlcC5kZXBlbmQoKTtcbiAgICAgICAgICBpZiAoY2hpbGRPYikge1xuICAgICAgICAgICAgY2hpbGRPYi5kZXAuZGVwZW5kKCk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmIChpc0FycmF5KHZhbHVlKSkge1xuICAgICAgICAgICAgZm9yICh2YXIgZSwgaSA9IDAsIGwgPSB2YWx1ZS5sZW5ndGg7IGkgPCBsOyBpKyspIHtcbiAgICAgICAgICAgICAgZSA9IHZhbHVlW2ldO1xuICAgICAgICAgICAgICBlICYmIGUuX19vYl9fICYmIGUuX19vYl9fLmRlcC5kZXBlbmQoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHZhbHVlO1xuICAgICAgfSxcbiAgICAgIHNldDogZnVuY3Rpb24gcmVhY3RpdmVTZXR0ZXIobmV3VmFsKSB7XG4gICAgICAgIHZhciB2YWx1ZSA9IGdldHRlciA/IGdldHRlci5jYWxsKG9iaikgOiB2YWw7XG4gICAgICAgIGlmIChuZXdWYWwgPT09IHZhbHVlKSB7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGlmIChzZXR0ZXIpIHtcbiAgICAgICAgICBzZXR0ZXIuY2FsbChvYmosIG5ld1ZhbCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdmFsID0gbmV3VmFsO1xuICAgICAgICB9XG4gICAgICAgIGNoaWxkT2IgPSBvYnNlcnZlKG5ld1ZhbCk7XG4gICAgICAgIGRlcC5ub3RpZnkoKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG5cblxuICB2YXIgdXRpbCA9IE9iamVjdC5mcmVlemUoe1xuICBcdGRlZmluZVJlYWN0aXZlOiBkZWZpbmVSZWFjdGl2ZSxcbiAgXHRzZXQ6IHNldCxcbiAgXHRkZWw6IGRlbCxcbiAgXHRoYXNPd246IGhhc093bixcbiAgXHRpc0xpdGVyYWw6IGlzTGl0ZXJhbCxcbiAgXHRpc1Jlc2VydmVkOiBpc1Jlc2VydmVkLFxuICBcdF90b1N0cmluZzogX3RvU3RyaW5nLFxuICBcdHRvTnVtYmVyOiB0b051bWJlcixcbiAgXHR0b0Jvb2xlYW46IHRvQm9vbGVhbixcbiAgXHRzdHJpcFF1b3Rlczogc3RyaXBRdW90ZXMsXG4gIFx0Y2FtZWxpemU6IGNhbWVsaXplLFxuICBcdGh5cGhlbmF0ZTogaHlwaGVuYXRlLFxuICBcdGNsYXNzaWZ5OiBjbGFzc2lmeSxcbiAgXHRiaW5kOiBiaW5kLFxuICBcdHRvQXJyYXk6IHRvQXJyYXksXG4gIFx0ZXh0ZW5kOiBleHRlbmQsXG4gIFx0aXNPYmplY3Q6IGlzT2JqZWN0LFxuICBcdGlzUGxhaW5PYmplY3Q6IGlzUGxhaW5PYmplY3QsXG4gIFx0ZGVmOiBkZWYsXG4gIFx0ZGVib3VuY2U6IF9kZWJvdW5jZSxcbiAgXHRpbmRleE9mOiBpbmRleE9mLFxuICBcdGNhbmNlbGxhYmxlOiBjYW5jZWxsYWJsZSxcbiAgXHRsb29zZUVxdWFsOiBsb29zZUVxdWFsLFxuICBcdGlzQXJyYXk6IGlzQXJyYXksXG4gIFx0aGFzUHJvdG86IGhhc1Byb3RvLFxuICBcdGluQnJvd3NlcjogaW5Ccm93c2VyLFxuICBcdGRldnRvb2xzOiBkZXZ0b29scyxcbiAgXHRpc0lFOTogaXNJRTksXG4gIFx0aXNBbmRyb2lkOiBpc0FuZHJvaWQsXG4gIFx0aXNJb3M6IGlzSW9zLFxuICBcdGlzV2VjaGF0OiBpc1dlY2hhdCxcbiAgXHRnZXQgdHJhbnNpdGlvblByb3AgKCkgeyByZXR1cm4gdHJhbnNpdGlvblByb3A7IH0sXG4gIFx0Z2V0IHRyYW5zaXRpb25FbmRFdmVudCAoKSB7IHJldHVybiB0cmFuc2l0aW9uRW5kRXZlbnQ7IH0sXG4gIFx0Z2V0IGFuaW1hdGlvblByb3AgKCkgeyByZXR1cm4gYW5pbWF0aW9uUHJvcDsgfSxcbiAgXHRnZXQgYW5pbWF0aW9uRW5kRXZlbnQgKCkgeyByZXR1cm4gYW5pbWF0aW9uRW5kRXZlbnQ7IH0sXG4gIFx0bmV4dFRpY2s6IG5leHRUaWNrLFxuICBcdGdldCBfU2V0ICgpIHsgcmV0dXJuIF9TZXQ7IH0sXG4gIFx0cXVlcnk6IHF1ZXJ5LFxuICBcdGluRG9jOiBpbkRvYyxcbiAgXHRnZXRBdHRyOiBnZXRBdHRyLFxuICBcdGdldEJpbmRBdHRyOiBnZXRCaW5kQXR0cixcbiAgXHRoYXNCaW5kQXR0cjogaGFzQmluZEF0dHIsXG4gIFx0YmVmb3JlOiBiZWZvcmUsXG4gIFx0YWZ0ZXI6IGFmdGVyLFxuICBcdHJlbW92ZTogcmVtb3ZlLFxuICBcdHByZXBlbmQ6IHByZXBlbmQsXG4gIFx0cmVwbGFjZTogcmVwbGFjZSxcbiAgXHRvbjogb24sXG4gIFx0b2ZmOiBvZmYsXG4gIFx0c2V0Q2xhc3M6IHNldENsYXNzLFxuICBcdGFkZENsYXNzOiBhZGRDbGFzcyxcbiAgXHRyZW1vdmVDbGFzczogcmVtb3ZlQ2xhc3MsXG4gIFx0ZXh0cmFjdENvbnRlbnQ6IGV4dHJhY3RDb250ZW50LFxuICBcdHRyaW1Ob2RlOiB0cmltTm9kZSxcbiAgXHRpc1RlbXBsYXRlOiBpc1RlbXBsYXRlLFxuICBcdGNyZWF0ZUFuY2hvcjogY3JlYXRlQW5jaG9yLFxuICBcdGZpbmRSZWY6IGZpbmRSZWYsXG4gIFx0bWFwTm9kZVJhbmdlOiBtYXBOb2RlUmFuZ2UsXG4gIFx0cmVtb3ZlTm9kZVJhbmdlOiByZW1vdmVOb2RlUmFuZ2UsXG4gIFx0aXNGcmFnbWVudDogaXNGcmFnbWVudCxcbiAgXHRnZXRPdXRlckhUTUw6IGdldE91dGVySFRNTCxcbiAgXHRtZXJnZU9wdGlvbnM6IG1lcmdlT3B0aW9ucyxcbiAgXHRyZXNvbHZlQXNzZXQ6IHJlc29sdmVBc3NldCxcbiAgXHRjaGVja0NvbXBvbmVudEF0dHI6IGNoZWNrQ29tcG9uZW50QXR0cixcbiAgXHRjb21tb25UYWdSRTogY29tbW9uVGFnUkUsXG4gIFx0cmVzZXJ2ZWRUYWdSRTogcmVzZXJ2ZWRUYWdSRSxcbiAgXHRnZXQgd2FybiAoKSB7IHJldHVybiB3YXJuOyB9XG4gIH0pO1xuXG4gIHZhciB1aWQgPSAwO1xuXG4gIGZ1bmN0aW9uIGluaXRNaXhpbiAoVnVlKSB7XG4gICAgLyoqXG4gICAgICogVGhlIG1haW4gaW5pdCBzZXF1ZW5jZS4gVGhpcyBpcyBjYWxsZWQgZm9yIGV2ZXJ5XG4gICAgICogaW5zdGFuY2UsIGluY2x1ZGluZyBvbmVzIHRoYXQgYXJlIGNyZWF0ZWQgZnJvbSBleHRlbmRlZFxuICAgICAqIGNvbnN0cnVjdG9ycy5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zIC0gdGhpcyBvcHRpb25zIG9iamVjdCBzaG91bGQgYmVcbiAgICAgKiAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoZSByZXN1bHQgb2YgbWVyZ2luZyBjbGFzc1xuICAgICAqICAgICAgICAgICAgICAgICAgICAgICAgICAgb3B0aW9ucyBhbmQgdGhlIG9wdGlvbnMgcGFzc2VkXG4gICAgICogICAgICAgICAgICAgICAgICAgICAgICAgICBpbiB0byB0aGUgY29uc3RydWN0b3IuXG4gICAgICovXG5cbiAgICBWdWUucHJvdG90eXBlLl9pbml0ID0gZnVuY3Rpb24gKG9wdGlvbnMpIHtcbiAgICAgIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuXG4gICAgICB0aGlzLiRlbCA9IG51bGw7XG4gICAgICB0aGlzLiRwYXJlbnQgPSBvcHRpb25zLnBhcmVudDtcbiAgICAgIHRoaXMuJHJvb3QgPSB0aGlzLiRwYXJlbnQgPyB0aGlzLiRwYXJlbnQuJHJvb3QgOiB0aGlzO1xuICAgICAgdGhpcy4kY2hpbGRyZW4gPSBbXTtcbiAgICAgIHRoaXMuJHJlZnMgPSB7fTsgLy8gY2hpbGQgdm0gcmVmZXJlbmNlc1xuICAgICAgdGhpcy4kZWxzID0ge307IC8vIGVsZW1lbnQgcmVmZXJlbmNlc1xuICAgICAgdGhpcy5fd2F0Y2hlcnMgPSBbXTsgLy8gYWxsIHdhdGNoZXJzIGFzIGFuIGFycmF5XG4gICAgICB0aGlzLl9kaXJlY3RpdmVzID0gW107IC8vIGFsbCBkaXJlY3RpdmVzXG5cbiAgICAgIC8vIGEgdWlkXG4gICAgICB0aGlzLl91aWQgPSB1aWQrKztcblxuICAgICAgLy8gYSBmbGFnIHRvIGF2b2lkIHRoaXMgYmVpbmcgb2JzZXJ2ZWRcbiAgICAgIHRoaXMuX2lzVnVlID0gdHJ1ZTtcblxuICAgICAgLy8gZXZlbnRzIGJvb2trZWVwaW5nXG4gICAgICB0aGlzLl9ldmVudHMgPSB7fTsgLy8gcmVnaXN0ZXJlZCBjYWxsYmFja3NcbiAgICAgIHRoaXMuX2V2ZW50c0NvdW50ID0ge307IC8vIGZvciAkYnJvYWRjYXN0IG9wdGltaXphdGlvblxuXG4gICAgICAvLyBmcmFnbWVudCBpbnN0YW5jZSBwcm9wZXJ0aWVzXG4gICAgICB0aGlzLl9pc0ZyYWdtZW50ID0gZmFsc2U7XG4gICAgICB0aGlzLl9mcmFnbWVudCA9IC8vIEB0eXBlIHtEb2N1bWVudEZyYWdtZW50fVxuICAgICAgdGhpcy5fZnJhZ21lbnRTdGFydCA9IC8vIEB0eXBlIHtUZXh0fENvbW1lbnR9XG4gICAgICB0aGlzLl9mcmFnbWVudEVuZCA9IG51bGw7IC8vIEB0eXBlIHtUZXh0fENvbW1lbnR9XG5cbiAgICAgIC8vIGxpZmVjeWNsZSBzdGF0ZVxuICAgICAgdGhpcy5faXNDb21waWxlZCA9IHRoaXMuX2lzRGVzdHJveWVkID0gdGhpcy5faXNSZWFkeSA9IHRoaXMuX2lzQXR0YWNoZWQgPSB0aGlzLl9pc0JlaW5nRGVzdHJveWVkID0gdGhpcy5fdkZvclJlbW92aW5nID0gZmFsc2U7XG4gICAgICB0aGlzLl91bmxpbmtGbiA9IG51bGw7XG5cbiAgICAgIC8vIGNvbnRleHQ6XG4gICAgICAvLyBpZiB0aGlzIGlzIGEgdHJhbnNjbHVkZWQgY29tcG9uZW50LCBjb250ZXh0XG4gICAgICAvLyB3aWxsIGJlIHRoZSBjb21tb24gcGFyZW50IHZtIG9mIHRoaXMgaW5zdGFuY2VcbiAgICAgIC8vIGFuZCBpdHMgaG9zdC5cbiAgICAgIHRoaXMuX2NvbnRleHQgPSBvcHRpb25zLl9jb250ZXh0IHx8IHRoaXMuJHBhcmVudDtcblxuICAgICAgLy8gc2NvcGU6XG4gICAgICAvLyBpZiB0aGlzIGlzIGluc2lkZSBhbiBpbmxpbmUgdi1mb3IsIHRoZSBzY29wZVxuICAgICAgLy8gd2lsbCBiZSB0aGUgaW50ZXJtZWRpYXRlIHNjb3BlIGNyZWF0ZWQgZm9yIHRoaXNcbiAgICAgIC8vIHJlcGVhdCBmcmFnbWVudC4gdGhpcyBpcyB1c2VkIGZvciBsaW5raW5nIHByb3BzXG4gICAgICAvLyBhbmQgY29udGFpbmVyIGRpcmVjdGl2ZXMuXG4gICAgICB0aGlzLl9zY29wZSA9IG9wdGlvbnMuX3Njb3BlO1xuXG4gICAgICAvLyBmcmFnbWVudDpcbiAgICAgIC8vIGlmIHRoaXMgaW5zdGFuY2UgaXMgY29tcGlsZWQgaW5zaWRlIGEgRnJhZ21lbnQsIGl0XG4gICAgICAvLyBuZWVkcyB0byByZWlnc3RlciBpdHNlbGYgYXMgYSBjaGlsZCBvZiB0aGF0IGZyYWdtZW50XG4gICAgICAvLyBmb3IgYXR0YWNoL2RldGFjaCB0byB3b3JrIHByb3Blcmx5LlxuICAgICAgdGhpcy5fZnJhZyA9IG9wdGlvbnMuX2ZyYWc7XG4gICAgICBpZiAodGhpcy5fZnJhZykge1xuICAgICAgICB0aGlzLl9mcmFnLmNoaWxkcmVuLnB1c2godGhpcyk7XG4gICAgICB9XG5cbiAgICAgIC8vIHB1c2ggc2VsZiBpbnRvIHBhcmVudCAvIHRyYW5zY2x1c2lvbiBob3N0XG4gICAgICBpZiAodGhpcy4kcGFyZW50KSB7XG4gICAgICAgIHRoaXMuJHBhcmVudC4kY2hpbGRyZW4ucHVzaCh0aGlzKTtcbiAgICAgIH1cblxuICAgICAgLy8gbWVyZ2Ugb3B0aW9ucy5cbiAgICAgIG9wdGlvbnMgPSB0aGlzLiRvcHRpb25zID0gbWVyZ2VPcHRpb25zKHRoaXMuY29uc3RydWN0b3Iub3B0aW9ucywgb3B0aW9ucywgdGhpcyk7XG5cbiAgICAgIC8vIHNldCByZWZcbiAgICAgIHRoaXMuX3VwZGF0ZVJlZigpO1xuXG4gICAgICAvLyBpbml0aWFsaXplIGRhdGEgYXMgZW1wdHkgb2JqZWN0LlxuICAgICAgLy8gaXQgd2lsbCBiZSBmaWxsZWQgdXAgaW4gX2luaXREYXRhKCkuXG4gICAgICB0aGlzLl9kYXRhID0ge307XG5cbiAgICAgIC8vIGNhbGwgaW5pdCBob29rXG4gICAgICB0aGlzLl9jYWxsSG9vaygnaW5pdCcpO1xuXG4gICAgICAvLyBpbml0aWFsaXplIGRhdGEgb2JzZXJ2YXRpb24gYW5kIHNjb3BlIGluaGVyaXRhbmNlLlxuICAgICAgdGhpcy5faW5pdFN0YXRlKCk7XG5cbiAgICAgIC8vIHNldHVwIGV2ZW50IHN5c3RlbSBhbmQgb3B0aW9uIGV2ZW50cy5cbiAgICAgIHRoaXMuX2luaXRFdmVudHMoKTtcblxuICAgICAgLy8gY2FsbCBjcmVhdGVkIGhvb2tcbiAgICAgIHRoaXMuX2NhbGxIb29rKCdjcmVhdGVkJyk7XG5cbiAgICAgIC8vIGlmIGBlbGAgb3B0aW9uIGlzIHBhc3NlZCwgc3RhcnQgY29tcGlsYXRpb24uXG4gICAgICBpZiAob3B0aW9ucy5lbCkge1xuICAgICAgICB0aGlzLiRtb3VudChvcHRpb25zLmVsKTtcbiAgICAgIH1cbiAgICB9O1xuICB9XG5cbiAgdmFyIHBhdGhDYWNoZSA9IG5ldyBDYWNoZSgxMDAwKTtcblxuICAvLyBhY3Rpb25zXG4gIHZhciBBUFBFTkQgPSAwO1xuICB2YXIgUFVTSCA9IDE7XG4gIHZhciBJTkNfU1VCX1BBVEhfREVQVEggPSAyO1xuICB2YXIgUFVTSF9TVUJfUEFUSCA9IDM7XG5cbiAgLy8gc3RhdGVzXG4gIHZhciBCRUZPUkVfUEFUSCA9IDA7XG4gIHZhciBJTl9QQVRIID0gMTtcbiAgdmFyIEJFRk9SRV9JREVOVCA9IDI7XG4gIHZhciBJTl9JREVOVCA9IDM7XG4gIHZhciBJTl9TVUJfUEFUSCA9IDQ7XG4gIHZhciBJTl9TSU5HTEVfUVVPVEUgPSA1O1xuICB2YXIgSU5fRE9VQkxFX1FVT1RFID0gNjtcbiAgdmFyIEFGVEVSX1BBVEggPSA3O1xuICB2YXIgRVJST1IgPSA4O1xuXG4gIHZhciBwYXRoU3RhdGVNYWNoaW5lID0gW107XG5cbiAgcGF0aFN0YXRlTWFjaGluZVtCRUZPUkVfUEFUSF0gPSB7XG4gICAgJ3dzJzogW0JFRk9SRV9QQVRIXSxcbiAgICAnaWRlbnQnOiBbSU5fSURFTlQsIEFQUEVORF0sXG4gICAgJ1snOiBbSU5fU1VCX1BBVEhdLFxuICAgICdlb2YnOiBbQUZURVJfUEFUSF1cbiAgfTtcblxuICBwYXRoU3RhdGVNYWNoaW5lW0lOX1BBVEhdID0ge1xuICAgICd3cyc6IFtJTl9QQVRIXSxcbiAgICAnLic6IFtCRUZPUkVfSURFTlRdLFxuICAgICdbJzogW0lOX1NVQl9QQVRIXSxcbiAgICAnZW9mJzogW0FGVEVSX1BBVEhdXG4gIH07XG5cbiAgcGF0aFN0YXRlTWFjaGluZVtCRUZPUkVfSURFTlRdID0ge1xuICAgICd3cyc6IFtCRUZPUkVfSURFTlRdLFxuICAgICdpZGVudCc6IFtJTl9JREVOVCwgQVBQRU5EXVxuICB9O1xuXG4gIHBhdGhTdGF0ZU1hY2hpbmVbSU5fSURFTlRdID0ge1xuICAgICdpZGVudCc6IFtJTl9JREVOVCwgQVBQRU5EXSxcbiAgICAnMCc6IFtJTl9JREVOVCwgQVBQRU5EXSxcbiAgICAnbnVtYmVyJzogW0lOX0lERU5ULCBBUFBFTkRdLFxuICAgICd3cyc6IFtJTl9QQVRILCBQVVNIXSxcbiAgICAnLic6IFtCRUZPUkVfSURFTlQsIFBVU0hdLFxuICAgICdbJzogW0lOX1NVQl9QQVRILCBQVVNIXSxcbiAgICAnZW9mJzogW0FGVEVSX1BBVEgsIFBVU0hdXG4gIH07XG5cbiAgcGF0aFN0YXRlTWFjaGluZVtJTl9TVUJfUEFUSF0gPSB7XG4gICAgXCInXCI6IFtJTl9TSU5HTEVfUVVPVEUsIEFQUEVORF0sXG4gICAgJ1wiJzogW0lOX0RPVUJMRV9RVU9URSwgQVBQRU5EXSxcbiAgICAnWyc6IFtJTl9TVUJfUEFUSCwgSU5DX1NVQl9QQVRIX0RFUFRIXSxcbiAgICAnXSc6IFtJTl9QQVRILCBQVVNIX1NVQl9QQVRIXSxcbiAgICAnZW9mJzogRVJST1IsXG4gICAgJ2Vsc2UnOiBbSU5fU1VCX1BBVEgsIEFQUEVORF1cbiAgfTtcblxuICBwYXRoU3RhdGVNYWNoaW5lW0lOX1NJTkdMRV9RVU9URV0gPSB7XG4gICAgXCInXCI6IFtJTl9TVUJfUEFUSCwgQVBQRU5EXSxcbiAgICAnZW9mJzogRVJST1IsXG4gICAgJ2Vsc2UnOiBbSU5fU0lOR0xFX1FVT1RFLCBBUFBFTkRdXG4gIH07XG5cbiAgcGF0aFN0YXRlTWFjaGluZVtJTl9ET1VCTEVfUVVPVEVdID0ge1xuICAgICdcIic6IFtJTl9TVUJfUEFUSCwgQVBQRU5EXSxcbiAgICAnZW9mJzogRVJST1IsXG4gICAgJ2Vsc2UnOiBbSU5fRE9VQkxFX1FVT1RFLCBBUFBFTkRdXG4gIH07XG5cbiAgLyoqXG4gICAqIERldGVybWluZSB0aGUgdHlwZSBvZiBhIGNoYXJhY3RlciBpbiBhIGtleXBhdGguXG4gICAqXG4gICAqIEBwYXJhbSB7Q2hhcn0gY2hcbiAgICogQHJldHVybiB7U3RyaW5nfSB0eXBlXG4gICAqL1xuXG4gIGZ1bmN0aW9uIGdldFBhdGhDaGFyVHlwZShjaCkge1xuICAgIGlmIChjaCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICByZXR1cm4gJ2VvZic7XG4gICAgfVxuXG4gICAgdmFyIGNvZGUgPSBjaC5jaGFyQ29kZUF0KDApO1xuXG4gICAgc3dpdGNoIChjb2RlKSB7XG4gICAgICBjYXNlIDB4NUI6IC8vIFtcbiAgICAgIGNhc2UgMHg1RDogLy8gXVxuICAgICAgY2FzZSAweDJFOiAvLyAuXG4gICAgICBjYXNlIDB4MjI6IC8vIFwiXG4gICAgICBjYXNlIDB4Mjc6IC8vICdcbiAgICAgIGNhc2UgMHgzMDpcbiAgICAgICAgLy8gMFxuICAgICAgICByZXR1cm4gY2g7XG5cbiAgICAgIGNhc2UgMHg1RjogLy8gX1xuICAgICAgY2FzZSAweDI0OlxuICAgICAgICAvLyAkXG4gICAgICAgIHJldHVybiAnaWRlbnQnO1xuXG4gICAgICBjYXNlIDB4MjA6IC8vIFNwYWNlXG4gICAgICBjYXNlIDB4MDk6IC8vIFRhYlxuICAgICAgY2FzZSAweDBBOiAvLyBOZXdsaW5lXG4gICAgICBjYXNlIDB4MEQ6IC8vIFJldHVyblxuICAgICAgY2FzZSAweEEwOiAvLyBOby1icmVhayBzcGFjZVxuICAgICAgY2FzZSAweEZFRkY6IC8vIEJ5dGUgT3JkZXIgTWFya1xuICAgICAgY2FzZSAweDIwMjg6IC8vIExpbmUgU2VwYXJhdG9yXG4gICAgICBjYXNlIDB4MjAyOTpcbiAgICAgICAgLy8gUGFyYWdyYXBoIFNlcGFyYXRvclxuICAgICAgICByZXR1cm4gJ3dzJztcbiAgICB9XG5cbiAgICAvLyBhLXosIEEtWlxuICAgIGlmIChjb2RlID49IDB4NjEgJiYgY29kZSA8PSAweDdBIHx8IGNvZGUgPj0gMHg0MSAmJiBjb2RlIDw9IDB4NUEpIHtcbiAgICAgIHJldHVybiAnaWRlbnQnO1xuICAgIH1cblxuICAgIC8vIDEtOVxuICAgIGlmIChjb2RlID49IDB4MzEgJiYgY29kZSA8PSAweDM5KSB7XG4gICAgICByZXR1cm4gJ251bWJlcic7XG4gICAgfVxuXG4gICAgcmV0dXJuICdlbHNlJztcbiAgfVxuXG4gIC8qKlxuICAgKiBGb3JtYXQgYSBzdWJQYXRoLCByZXR1cm4gaXRzIHBsYWluIGZvcm0gaWYgaXQgaXNcbiAgICogYSBsaXRlcmFsIHN0cmluZyBvciBudW1iZXIuIE90aGVyd2lzZSBwcmVwZW5kIHRoZVxuICAgKiBkeW5hbWljIGluZGljYXRvciAoKikuXG4gICAqXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBwYXRoXG4gICAqIEByZXR1cm4ge1N0cmluZ31cbiAgICovXG5cbiAgZnVuY3Rpb24gZm9ybWF0U3ViUGF0aChwYXRoKSB7XG4gICAgdmFyIHRyaW1tZWQgPSBwYXRoLnRyaW0oKTtcbiAgICAvLyBpbnZhbGlkIGxlYWRpbmcgMFxuICAgIGlmIChwYXRoLmNoYXJBdCgwKSA9PT0gJzAnICYmIGlzTmFOKHBhdGgpKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIHJldHVybiBpc0xpdGVyYWwodHJpbW1lZCkgPyBzdHJpcFF1b3Rlcyh0cmltbWVkKSA6ICcqJyArIHRyaW1tZWQ7XG4gIH1cblxuICAvKipcbiAgICogUGFyc2UgYSBzdHJpbmcgcGF0aCBpbnRvIGFuIGFycmF5IG9mIHNlZ21lbnRzXG4gICAqXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBwYXRoXG4gICAqIEByZXR1cm4ge0FycmF5fHVuZGVmaW5lZH1cbiAgICovXG5cbiAgZnVuY3Rpb24gcGFyc2UocGF0aCkge1xuICAgIHZhciBrZXlzID0gW107XG4gICAgdmFyIGluZGV4ID0gLTE7XG4gICAgdmFyIG1vZGUgPSBCRUZPUkVfUEFUSDtcbiAgICB2YXIgc3ViUGF0aERlcHRoID0gMDtcbiAgICB2YXIgYywgbmV3Q2hhciwga2V5LCB0eXBlLCB0cmFuc2l0aW9uLCBhY3Rpb24sIHR5cGVNYXA7XG5cbiAgICB2YXIgYWN0aW9ucyA9IFtdO1xuXG4gICAgYWN0aW9uc1tQVVNIXSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIGlmIChrZXkgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICBrZXlzLnB1c2goa2V5KTtcbiAgICAgICAga2V5ID0gdW5kZWZpbmVkO1xuICAgICAgfVxuICAgIH07XG5cbiAgICBhY3Rpb25zW0FQUEVORF0gPSBmdW5jdGlvbiAoKSB7XG4gICAgICBpZiAoa2V5ID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAga2V5ID0gbmV3Q2hhcjtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGtleSArPSBuZXdDaGFyO1xuICAgICAgfVxuICAgIH07XG5cbiAgICBhY3Rpb25zW0lOQ19TVUJfUEFUSF9ERVBUSF0gPSBmdW5jdGlvbiAoKSB7XG4gICAgICBhY3Rpb25zW0FQUEVORF0oKTtcbiAgICAgIHN1YlBhdGhEZXB0aCsrO1xuICAgIH07XG5cbiAgICBhY3Rpb25zW1BVU0hfU1VCX1BBVEhdID0gZnVuY3Rpb24gKCkge1xuICAgICAgaWYgKHN1YlBhdGhEZXB0aCA+IDApIHtcbiAgICAgICAgc3ViUGF0aERlcHRoLS07XG4gICAgICAgIG1vZGUgPSBJTl9TVUJfUEFUSDtcbiAgICAgICAgYWN0aW9uc1tBUFBFTkRdKCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBzdWJQYXRoRGVwdGggPSAwO1xuICAgICAgICBrZXkgPSBmb3JtYXRTdWJQYXRoKGtleSk7XG4gICAgICAgIGlmIChrZXkgPT09IGZhbHNlKSB7XG4gICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGFjdGlvbnNbUFVTSF0oKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH07XG5cbiAgICBmdW5jdGlvbiBtYXliZVVuZXNjYXBlUXVvdGUoKSB7XG4gICAgICB2YXIgbmV4dENoYXIgPSBwYXRoW2luZGV4ICsgMV07XG4gICAgICBpZiAobW9kZSA9PT0gSU5fU0lOR0xFX1FVT1RFICYmIG5leHRDaGFyID09PSBcIidcIiB8fCBtb2RlID09PSBJTl9ET1VCTEVfUVVPVEUgJiYgbmV4dENoYXIgPT09ICdcIicpIHtcbiAgICAgICAgaW5kZXgrKztcbiAgICAgICAgbmV3Q2hhciA9ICdcXFxcJyArIG5leHRDaGFyO1xuICAgICAgICBhY3Rpb25zW0FQUEVORF0oKTtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9XG4gICAgfVxuXG4gICAgd2hpbGUgKG1vZGUgIT0gbnVsbCkge1xuICAgICAgaW5kZXgrKztcbiAgICAgIGMgPSBwYXRoW2luZGV4XTtcblxuICAgICAgaWYgKGMgPT09ICdcXFxcJyAmJiBtYXliZVVuZXNjYXBlUXVvdGUoKSkge1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cblxuICAgICAgdHlwZSA9IGdldFBhdGhDaGFyVHlwZShjKTtcbiAgICAgIHR5cGVNYXAgPSBwYXRoU3RhdGVNYWNoaW5lW21vZGVdO1xuICAgICAgdHJhbnNpdGlvbiA9IHR5cGVNYXBbdHlwZV0gfHwgdHlwZU1hcFsnZWxzZSddIHx8IEVSUk9SO1xuXG4gICAgICBpZiAodHJhbnNpdGlvbiA9PT0gRVJST1IpIHtcbiAgICAgICAgcmV0dXJuOyAvLyBwYXJzZSBlcnJvclxuICAgICAgfVxuXG4gICAgICBtb2RlID0gdHJhbnNpdGlvblswXTtcbiAgICAgIGFjdGlvbiA9IGFjdGlvbnNbdHJhbnNpdGlvblsxXV07XG4gICAgICBpZiAoYWN0aW9uKSB7XG4gICAgICAgIG5ld0NoYXIgPSB0cmFuc2l0aW9uWzJdO1xuICAgICAgICBuZXdDaGFyID0gbmV3Q2hhciA9PT0gdW5kZWZpbmVkID8gYyA6IG5ld0NoYXI7XG4gICAgICAgIGlmIChhY3Rpb24oKSA9PT0gZmFsc2UpIHtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYgKG1vZGUgPT09IEFGVEVSX1BBVEgpIHtcbiAgICAgICAga2V5cy5yYXcgPSBwYXRoO1xuICAgICAgICByZXR1cm4ga2V5cztcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogRXh0ZXJuYWwgcGFyc2UgdGhhdCBjaGVjayBmb3IgYSBjYWNoZSBoaXQgZmlyc3RcbiAgICpcbiAgICogQHBhcmFtIHtTdHJpbmd9IHBhdGhcbiAgICogQHJldHVybiB7QXJyYXl8dW5kZWZpbmVkfVxuICAgKi9cblxuICBmdW5jdGlvbiBwYXJzZVBhdGgocGF0aCkge1xuICAgIHZhciBoaXQgPSBwYXRoQ2FjaGUuZ2V0KHBhdGgpO1xuICAgIGlmICghaGl0KSB7XG4gICAgICBoaXQgPSBwYXJzZShwYXRoKTtcbiAgICAgIGlmIChoaXQpIHtcbiAgICAgICAgcGF0aENhY2hlLnB1dChwYXRoLCBoaXQpO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gaGl0O1xuICB9XG5cbiAgLyoqXG4gICAqIEdldCBmcm9tIGFuIG9iamVjdCBmcm9tIGEgcGF0aCBzdHJpbmdcbiAgICpcbiAgICogQHBhcmFtIHtPYmplY3R9IG9ialxuICAgKiBAcGFyYW0ge1N0cmluZ30gcGF0aFxuICAgKi9cblxuICBmdW5jdGlvbiBnZXRQYXRoKG9iaiwgcGF0aCkge1xuICAgIHJldHVybiBwYXJzZUV4cHJlc3Npb24ocGF0aCkuZ2V0KG9iaik7XG4gIH1cblxuICAvKipcbiAgICogV2FybiBhZ2FpbnN0IHNldHRpbmcgbm9uLWV4aXN0ZW50IHJvb3QgcGF0aCBvbiBhIHZtLlxuICAgKi9cblxuICB2YXIgd2Fybk5vbkV4aXN0ZW50O1xuICBpZiAoJ2RldmVsb3BtZW50JyAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgd2Fybk5vbkV4aXN0ZW50ID0gZnVuY3Rpb24gKHBhdGgsIHZtKSB7XG4gICAgICB3YXJuKCdZb3UgYXJlIHNldHRpbmcgYSBub24tZXhpc3RlbnQgcGF0aCBcIicgKyBwYXRoLnJhdyArICdcIiAnICsgJ29uIGEgdm0gaW5zdGFuY2UuIENvbnNpZGVyIHByZS1pbml0aWFsaXppbmcgdGhlIHByb3BlcnR5ICcgKyAnd2l0aCB0aGUgXCJkYXRhXCIgb3B0aW9uIGZvciBtb3JlIHJlbGlhYmxlIHJlYWN0aXZpdHkgJyArICdhbmQgYmV0dGVyIHBlcmZvcm1hbmNlLicsIHZtKTtcbiAgICB9O1xuICB9XG5cbiAgLyoqXG4gICAqIFNldCBvbiBhbiBvYmplY3QgZnJvbSBhIHBhdGhcbiAgICpcbiAgICogQHBhcmFtIHtPYmplY3R9IG9ialxuICAgKiBAcGFyYW0ge1N0cmluZyB8IEFycmF5fSBwYXRoXG4gICAqIEBwYXJhbSB7Kn0gdmFsXG4gICAqL1xuXG4gIGZ1bmN0aW9uIHNldFBhdGgob2JqLCBwYXRoLCB2YWwpIHtcbiAgICB2YXIgb3JpZ2luYWwgPSBvYmo7XG4gICAgaWYgKHR5cGVvZiBwYXRoID09PSAnc3RyaW5nJykge1xuICAgICAgcGF0aCA9IHBhcnNlKHBhdGgpO1xuICAgIH1cbiAgICBpZiAoIXBhdGggfHwgIWlzT2JqZWN0KG9iaikpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgdmFyIGxhc3QsIGtleTtcbiAgICBmb3IgKHZhciBpID0gMCwgbCA9IHBhdGgubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG4gICAgICBsYXN0ID0gb2JqO1xuICAgICAga2V5ID0gcGF0aFtpXTtcbiAgICAgIGlmIChrZXkuY2hhckF0KDApID09PSAnKicpIHtcbiAgICAgICAga2V5ID0gcGFyc2VFeHByZXNzaW9uKGtleS5zbGljZSgxKSkuZ2V0LmNhbGwob3JpZ2luYWwsIG9yaWdpbmFsKTtcbiAgICAgIH1cbiAgICAgIGlmIChpIDwgbCAtIDEpIHtcbiAgICAgICAgb2JqID0gb2JqW2tleV07XG4gICAgICAgIGlmICghaXNPYmplY3Qob2JqKSkge1xuICAgICAgICAgIG9iaiA9IHt9O1xuICAgICAgICAgIGlmICgnZGV2ZWxvcG1lbnQnICE9PSAncHJvZHVjdGlvbicgJiYgbGFzdC5faXNWdWUpIHtcbiAgICAgICAgICAgIHdhcm5Ob25FeGlzdGVudChwYXRoLCBsYXN0KTtcbiAgICAgICAgICB9XG4gICAgICAgICAgc2V0KGxhc3QsIGtleSwgb2JqKTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaWYgKGlzQXJyYXkob2JqKSkge1xuICAgICAgICAgIG9iai4kc2V0KGtleSwgdmFsKTtcbiAgICAgICAgfSBlbHNlIGlmIChrZXkgaW4gb2JqKSB7XG4gICAgICAgICAgb2JqW2tleV0gPSB2YWw7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaWYgKCdkZXZlbG9wbWVudCcgIT09ICdwcm9kdWN0aW9uJyAmJiBvYmouX2lzVnVlKSB7XG4gICAgICAgICAgICB3YXJuTm9uRXhpc3RlbnQocGF0aCwgb2JqKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgc2V0KG9iaiwga2V5LCB2YWwpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbnZhciBwYXRoID0gT2JqZWN0LmZyZWV6ZSh7XG4gICAgcGFyc2VQYXRoOiBwYXJzZVBhdGgsXG4gICAgZ2V0UGF0aDogZ2V0UGF0aCxcbiAgICBzZXRQYXRoOiBzZXRQYXRoXG4gIH0pO1xuXG4gIHZhciBleHByZXNzaW9uQ2FjaGUgPSBuZXcgQ2FjaGUoMTAwMCk7XG5cbiAgdmFyIGFsbG93ZWRLZXl3b3JkcyA9ICdNYXRoLERhdGUsdGhpcyx0cnVlLGZhbHNlLG51bGwsdW5kZWZpbmVkLEluZmluaXR5LE5hTiwnICsgJ2lzTmFOLGlzRmluaXRlLGRlY29kZVVSSSxkZWNvZGVVUklDb21wb25lbnQsZW5jb2RlVVJJLCcgKyAnZW5jb2RlVVJJQ29tcG9uZW50LHBhcnNlSW50LHBhcnNlRmxvYXQnO1xuICB2YXIgYWxsb3dlZEtleXdvcmRzUkUgPSBuZXcgUmVnRXhwKCdeKCcgKyBhbGxvd2VkS2V5d29yZHMucmVwbGFjZSgvLC9nLCAnXFxcXGJ8JykgKyAnXFxcXGIpJyk7XG5cbiAgLy8ga2V5d29yZHMgdGhhdCBkb24ndCBtYWtlIHNlbnNlIGluc2lkZSBleHByZXNzaW9uc1xuICB2YXIgaW1wcm9wZXJLZXl3b3JkcyA9ICdicmVhayxjYXNlLGNsYXNzLGNhdGNoLGNvbnN0LGNvbnRpbnVlLGRlYnVnZ2VyLGRlZmF1bHQsJyArICdkZWxldGUsZG8sZWxzZSxleHBvcnQsZXh0ZW5kcyxmaW5hbGx5LGZvcixmdW5jdGlvbixpZiwnICsgJ2ltcG9ydCxpbixpbnN0YW5jZW9mLGxldCxyZXR1cm4sc3VwZXIsc3dpdGNoLHRocm93LHRyeSwnICsgJ3Zhcix3aGlsZSx3aXRoLHlpZWxkLGVudW0sYXdhaXQsaW1wbGVtZW50cyxwYWNrYWdlLCcgKyAncHJvdGVjdGVkLHN0YXRpYyxpbnRlcmZhY2UscHJpdmF0ZSxwdWJsaWMnO1xuICB2YXIgaW1wcm9wZXJLZXl3b3Jkc1JFID0gbmV3IFJlZ0V4cCgnXignICsgaW1wcm9wZXJLZXl3b3Jkcy5yZXBsYWNlKC8sL2csICdcXFxcYnwnKSArICdcXFxcYiknKTtcblxuICB2YXIgd3NSRSA9IC9cXHMvZztcbiAgdmFyIG5ld2xpbmVSRSA9IC9cXG4vZztcbiAgdmFyIHNhdmVSRSA9IC9bXFx7LF1cXHMqW1xcd1xcJF9dK1xccyo6fCgnKD86W14nXFxcXF18XFxcXC4pKid8XCIoPzpbXlwiXFxcXF18XFxcXC4pKlwifGAoPzpbXmBcXFxcXXxcXFxcLikqXFwkXFx7fFxcfSg/OlteYFxcXFxdfFxcXFwuKSpgfGAoPzpbXmBcXFxcXXxcXFxcLikqYCl8bmV3IHx0eXBlb2YgfHZvaWQgL2c7XG4gIHZhciByZXN0b3JlUkUgPSAvXCIoXFxkKylcIi9nO1xuICB2YXIgcGF0aFRlc3RSRSA9IC9eW0EtWmEtel8kXVtcXHckXSooPzpcXC5bQS1aYS16XyRdW1xcdyRdKnxcXFsnLio/J1xcXXxcXFtcIi4qP1wiXFxdfFxcW1xcZCtcXF18XFxbW0EtWmEtel8kXVtcXHckXSpcXF0pKiQvO1xuICB2YXIgaWRlbnRSRSA9IC9bXlxcdyRcXC5dKD86W0EtWmEtel8kXVtcXHckXSopL2c7XG4gIHZhciBib29sZWFuTGl0ZXJhbFJFID0gL14oPzp0cnVlfGZhbHNlKSQvO1xuXG4gIC8qKlxuICAgKiBTYXZlIC8gUmV3cml0ZSAvIFJlc3RvcmVcbiAgICpcbiAgICogV2hlbiByZXdyaXRpbmcgcGF0aHMgZm91bmQgaW4gYW4gZXhwcmVzc2lvbiwgaXQgaXNcbiAgICogcG9zc2libGUgZm9yIHRoZSBzYW1lIGxldHRlciBzZXF1ZW5jZXMgdG8gYmUgZm91bmQgaW5cbiAgICogc3RyaW5ncyBhbmQgT2JqZWN0IGxpdGVyYWwgcHJvcGVydHkga2V5cy4gVGhlcmVmb3JlIHdlXG4gICAqIHJlbW92ZSBhbmQgc3RvcmUgdGhlc2UgcGFydHMgaW4gYSB0ZW1wb3JhcnkgYXJyYXksIGFuZFxuICAgKiByZXN0b3JlIHRoZW0gYWZ0ZXIgdGhlIHBhdGggcmV3cml0ZS5cbiAgICovXG5cbiAgdmFyIHNhdmVkID0gW107XG5cbiAgLyoqXG4gICAqIFNhdmUgcmVwbGFjZXJcbiAgICpcbiAgICogVGhlIHNhdmUgcmVnZXggY2FuIG1hdGNoIHR3byBwb3NzaWJsZSBjYXNlczpcbiAgICogMS4gQW4gb3BlbmluZyBvYmplY3QgbGl0ZXJhbFxuICAgKiAyLiBBIHN0cmluZ1xuICAgKiBJZiBtYXRjaGVkIGFzIGEgcGxhaW4gc3RyaW5nLCB3ZSBuZWVkIHRvIGVzY2FwZSBpdHNcbiAgICogbmV3bGluZXMsIHNpbmNlIHRoZSBzdHJpbmcgbmVlZHMgdG8gYmUgcHJlc2VydmVkIHdoZW5cbiAgICogZ2VuZXJhdGluZyB0aGUgZnVuY3Rpb24gYm9keS5cbiAgICpcbiAgICogQHBhcmFtIHtTdHJpbmd9IHN0clxuICAgKiBAcGFyYW0ge1N0cmluZ30gaXNTdHJpbmcgLSBzdHIgaWYgbWF0Y2hlZCBhcyBhIHN0cmluZ1xuICAgKiBAcmV0dXJuIHtTdHJpbmd9IC0gcGxhY2Vob2xkZXIgd2l0aCBpbmRleFxuICAgKi9cblxuICBmdW5jdGlvbiBzYXZlKHN0ciwgaXNTdHJpbmcpIHtcbiAgICB2YXIgaSA9IHNhdmVkLmxlbmd0aDtcbiAgICBzYXZlZFtpXSA9IGlzU3RyaW5nID8gc3RyLnJlcGxhY2UobmV3bGluZVJFLCAnXFxcXG4nKSA6IHN0cjtcbiAgICByZXR1cm4gJ1wiJyArIGkgKyAnXCInO1xuICB9XG5cbiAgLyoqXG4gICAqIFBhdGggcmV3cml0ZSByZXBsYWNlclxuICAgKlxuICAgKiBAcGFyYW0ge1N0cmluZ30gcmF3XG4gICAqIEByZXR1cm4ge1N0cmluZ31cbiAgICovXG5cbiAgZnVuY3Rpb24gcmV3cml0ZShyYXcpIHtcbiAgICB2YXIgYyA9IHJhdy5jaGFyQXQoMCk7XG4gICAgdmFyIHBhdGggPSByYXcuc2xpY2UoMSk7XG4gICAgaWYgKGFsbG93ZWRLZXl3b3Jkc1JFLnRlc3QocGF0aCkpIHtcbiAgICAgIHJldHVybiByYXc7XG4gICAgfSBlbHNlIHtcbiAgICAgIHBhdGggPSBwYXRoLmluZGV4T2YoJ1wiJykgPiAtMSA/IHBhdGgucmVwbGFjZShyZXN0b3JlUkUsIHJlc3RvcmUpIDogcGF0aDtcbiAgICAgIHJldHVybiBjICsgJ3Njb3BlLicgKyBwYXRoO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBSZXN0b3JlIHJlcGxhY2VyXG4gICAqXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBzdHJcbiAgICogQHBhcmFtIHtTdHJpbmd9IGkgLSBtYXRjaGVkIHNhdmUgaW5kZXhcbiAgICogQHJldHVybiB7U3RyaW5nfVxuICAgKi9cblxuICBmdW5jdGlvbiByZXN0b3JlKHN0ciwgaSkge1xuICAgIHJldHVybiBzYXZlZFtpXTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXdyaXRlIGFuIGV4cHJlc3Npb24sIHByZWZpeGluZyBhbGwgcGF0aCBhY2Nlc3NvcnMgd2l0aFxuICAgKiBgc2NvcGUuYCBhbmQgZ2VuZXJhdGUgZ2V0dGVyL3NldHRlciBmdW5jdGlvbnMuXG4gICAqXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBleHBcbiAgICogQHJldHVybiB7RnVuY3Rpb259XG4gICAqL1xuXG4gIGZ1bmN0aW9uIGNvbXBpbGVHZXR0ZXIoZXhwKSB7XG4gICAgaWYgKGltcHJvcGVyS2V5d29yZHNSRS50ZXN0KGV4cCkpIHtcbiAgICAgICdkZXZlbG9wbWVudCcgIT09ICdwcm9kdWN0aW9uJyAmJiB3YXJuKCdBdm9pZCB1c2luZyByZXNlcnZlZCBrZXl3b3JkcyBpbiBleHByZXNzaW9uOiAnICsgZXhwKTtcbiAgICB9XG4gICAgLy8gcmVzZXQgc3RhdGVcbiAgICBzYXZlZC5sZW5ndGggPSAwO1xuICAgIC8vIHNhdmUgc3RyaW5ncyBhbmQgb2JqZWN0IGxpdGVyYWwga2V5c1xuICAgIHZhciBib2R5ID0gZXhwLnJlcGxhY2Uoc2F2ZVJFLCBzYXZlKS5yZXBsYWNlKHdzUkUsICcnKTtcbiAgICAvLyByZXdyaXRlIGFsbCBwYXRoc1xuICAgIC8vIHBhZCAxIHNwYWNlIGhlcmUgYmVjYXVlIHRoZSByZWdleCBtYXRjaGVzIDEgZXh0cmEgY2hhclxuICAgIGJvZHkgPSAoJyAnICsgYm9keSkucmVwbGFjZShpZGVudFJFLCByZXdyaXRlKS5yZXBsYWNlKHJlc3RvcmVSRSwgcmVzdG9yZSk7XG4gICAgcmV0dXJuIG1ha2VHZXR0ZXJGbihib2R5KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBCdWlsZCBhIGdldHRlciBmdW5jdGlvbi4gUmVxdWlyZXMgZXZhbC5cbiAgICpcbiAgICogV2UgaXNvbGF0ZSB0aGUgdHJ5L2NhdGNoIHNvIGl0IGRvZXNuJ3QgYWZmZWN0IHRoZVxuICAgKiBvcHRpbWl6YXRpb24gb2YgdGhlIHBhcnNlIGZ1bmN0aW9uIHdoZW4gaXQgaXMgbm90IGNhbGxlZC5cbiAgICpcbiAgICogQHBhcmFtIHtTdHJpbmd9IGJvZHlcbiAgICogQHJldHVybiB7RnVuY3Rpb258dW5kZWZpbmVkfVxuICAgKi9cblxuICBmdW5jdGlvbiBtYWtlR2V0dGVyRm4oYm9keSkge1xuICAgIHRyeSB7XG4gICAgICAvKiBlc2xpbnQtZGlzYWJsZSBuby1uZXctZnVuYyAqL1xuICAgICAgcmV0dXJuIG5ldyBGdW5jdGlvbignc2NvcGUnLCAncmV0dXJuICcgKyBib2R5ICsgJzsnKTtcbiAgICAgIC8qIGVzbGludC1lbmFibGUgbm8tbmV3LWZ1bmMgKi9cbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICAnZGV2ZWxvcG1lbnQnICE9PSAncHJvZHVjdGlvbicgJiYgd2FybignSW52YWxpZCBleHByZXNzaW9uLiAnICsgJ0dlbmVyYXRlZCBmdW5jdGlvbiBib2R5OiAnICsgYm9keSk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIENvbXBpbGUgYSBzZXR0ZXIgZnVuY3Rpb24gZm9yIHRoZSBleHByZXNzaW9uLlxuICAgKlxuICAgKiBAcGFyYW0ge1N0cmluZ30gZXhwXG4gICAqIEByZXR1cm4ge0Z1bmN0aW9ufHVuZGVmaW5lZH1cbiAgICovXG5cbiAgZnVuY3Rpb24gY29tcGlsZVNldHRlcihleHApIHtcbiAgICB2YXIgcGF0aCA9IHBhcnNlUGF0aChleHApO1xuICAgIGlmIChwYXRoKSB7XG4gICAgICByZXR1cm4gZnVuY3Rpb24gKHNjb3BlLCB2YWwpIHtcbiAgICAgICAgc2V0UGF0aChzY29wZSwgcGF0aCwgdmFsKTtcbiAgICAgIH07XG4gICAgfSBlbHNlIHtcbiAgICAgICdkZXZlbG9wbWVudCcgIT09ICdwcm9kdWN0aW9uJyAmJiB3YXJuKCdJbnZhbGlkIHNldHRlciBleHByZXNzaW9uOiAnICsgZXhwKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogUGFyc2UgYW4gZXhwcmVzc2lvbiBpbnRvIHJlLXdyaXR0ZW4gZ2V0dGVyL3NldHRlcnMuXG4gICAqXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBleHBcbiAgICogQHBhcmFtIHtCb29sZWFufSBuZWVkU2V0XG4gICAqIEByZXR1cm4ge0Z1bmN0aW9ufVxuICAgKi9cblxuICBmdW5jdGlvbiBwYXJzZUV4cHJlc3Npb24oZXhwLCBuZWVkU2V0KSB7XG4gICAgZXhwID0gZXhwLnRyaW0oKTtcbiAgICAvLyB0cnkgY2FjaGVcbiAgICB2YXIgaGl0ID0gZXhwcmVzc2lvbkNhY2hlLmdldChleHApO1xuICAgIGlmIChoaXQpIHtcbiAgICAgIGlmIChuZWVkU2V0ICYmICFoaXQuc2V0KSB7XG4gICAgICAgIGhpdC5zZXQgPSBjb21waWxlU2V0dGVyKGhpdC5leHApO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGhpdDtcbiAgICB9XG4gICAgdmFyIHJlcyA9IHsgZXhwOiBleHAgfTtcbiAgICByZXMuZ2V0ID0gaXNTaW1wbGVQYXRoKGV4cCkgJiYgZXhwLmluZGV4T2YoJ1snKSA8IDBcbiAgICAvLyBvcHRpbWl6ZWQgc3VwZXIgc2ltcGxlIGdldHRlclxuICAgID8gbWFrZUdldHRlckZuKCdzY29wZS4nICsgZXhwKVxuICAgIC8vIGR5bmFtaWMgZ2V0dGVyXG4gICAgOiBjb21waWxlR2V0dGVyKGV4cCk7XG4gICAgaWYgKG5lZWRTZXQpIHtcbiAgICAgIHJlcy5zZXQgPSBjb21waWxlU2V0dGVyKGV4cCk7XG4gICAgfVxuICAgIGV4cHJlc3Npb25DYWNoZS5wdXQoZXhwLCByZXMpO1xuICAgIHJldHVybiByZXM7XG4gIH1cblxuICAvKipcbiAgICogQ2hlY2sgaWYgYW4gZXhwcmVzc2lvbiBpcyBhIHNpbXBsZSBwYXRoLlxuICAgKlxuICAgKiBAcGFyYW0ge1N0cmluZ30gZXhwXG4gICAqIEByZXR1cm4ge0Jvb2xlYW59XG4gICAqL1xuXG4gIGZ1bmN0aW9uIGlzU2ltcGxlUGF0aChleHApIHtcbiAgICByZXR1cm4gcGF0aFRlc3RSRS50ZXN0KGV4cCkgJiZcbiAgICAvLyBkb24ndCB0cmVhdCB0cnVlL2ZhbHNlIGFzIHBhdGhzXG4gICAgIWJvb2xlYW5MaXRlcmFsUkUudGVzdChleHApICYmXG4gICAgLy8gTWF0aCBjb25zdGFudHMgZS5nLiBNYXRoLlBJLCBNYXRoLkUgZXRjLlxuICAgIGV4cC5zbGljZSgwLCA1KSAhPT0gJ01hdGguJztcbiAgfVxuXG52YXIgZXhwcmVzc2lvbiA9IE9iamVjdC5mcmVlemUoe1xuICAgIHBhcnNlRXhwcmVzc2lvbjogcGFyc2VFeHByZXNzaW9uLFxuICAgIGlzU2ltcGxlUGF0aDogaXNTaW1wbGVQYXRoXG4gIH0pO1xuXG4gIC8vIHdlIGhhdmUgdHdvIHNlcGFyYXRlIHF1ZXVlczogb25lIGZvciBkaXJlY3RpdmUgdXBkYXRlc1xuICAvLyBhbmQgb25lIGZvciB1c2VyIHdhdGNoZXIgcmVnaXN0ZXJlZCB2aWEgJHdhdGNoKCkuXG4gIC8vIHdlIHdhbnQgdG8gZ3VhcmFudGVlIGRpcmVjdGl2ZSB1cGRhdGVzIHRvIGJlIGNhbGxlZFxuICAvLyBiZWZvcmUgdXNlciB3YXRjaGVycyBzbyB0aGF0IHdoZW4gdXNlciB3YXRjaGVycyBhcmVcbiAgLy8gdHJpZ2dlcmVkLCB0aGUgRE9NIHdvdWxkIGhhdmUgYWxyZWFkeSBiZWVuIGluIHVwZGF0ZWRcbiAgLy8gc3RhdGUuXG5cbiAgdmFyIHF1ZXVlID0gW107XG4gIHZhciB1c2VyUXVldWUgPSBbXTtcbiAgdmFyIGhhcyA9IHt9O1xuICB2YXIgY2lyY3VsYXIgPSB7fTtcbiAgdmFyIHdhaXRpbmcgPSBmYWxzZTtcblxuICAvKipcbiAgICogUmVzZXQgdGhlIGJhdGNoZXIncyBzdGF0ZS5cbiAgICovXG5cbiAgZnVuY3Rpb24gcmVzZXRCYXRjaGVyU3RhdGUoKSB7XG4gICAgcXVldWUubGVuZ3RoID0gMDtcbiAgICB1c2VyUXVldWUubGVuZ3RoID0gMDtcbiAgICBoYXMgPSB7fTtcbiAgICBjaXJjdWxhciA9IHt9O1xuICAgIHdhaXRpbmcgPSBmYWxzZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBGbHVzaCBib3RoIHF1ZXVlcyBhbmQgcnVuIHRoZSB3YXRjaGVycy5cbiAgICovXG5cbiAgZnVuY3Rpb24gZmx1c2hCYXRjaGVyUXVldWUoKSB7XG4gICAgdmFyIF9hZ2FpbiA9IHRydWU7XG5cbiAgICBfZnVuY3Rpb246IHdoaWxlIChfYWdhaW4pIHtcbiAgICAgIF9hZ2FpbiA9IGZhbHNlO1xuXG4gICAgICBydW5CYXRjaGVyUXVldWUocXVldWUpO1xuICAgICAgcnVuQmF0Y2hlclF1ZXVlKHVzZXJRdWV1ZSk7XG4gICAgICAvLyB1c2VyIHdhdGNoZXJzIHRyaWdnZXJlZCBtb3JlIHdhdGNoZXJzLFxuICAgICAgLy8ga2VlcCBmbHVzaGluZyB1bnRpbCBpdCBkZXBsZXRlc1xuICAgICAgaWYgKHF1ZXVlLmxlbmd0aCkge1xuICAgICAgICBfYWdhaW4gPSB0cnVlO1xuICAgICAgICBjb250aW51ZSBfZnVuY3Rpb247XG4gICAgICB9XG4gICAgICAvLyBkZXYgdG9vbCBob29rXG4gICAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgaWYgKi9cbiAgICAgIGlmIChkZXZ0b29scyAmJiBjb25maWcuZGV2dG9vbHMpIHtcbiAgICAgICAgZGV2dG9vbHMuZW1pdCgnZmx1c2gnKTtcbiAgICAgIH1cbiAgICAgIHJlc2V0QmF0Y2hlclN0YXRlKCk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFJ1biB0aGUgd2F0Y2hlcnMgaW4gYSBzaW5nbGUgcXVldWUuXG4gICAqXG4gICAqIEBwYXJhbSB7QXJyYXl9IHF1ZXVlXG4gICAqL1xuXG4gIGZ1bmN0aW9uIHJ1bkJhdGNoZXJRdWV1ZShxdWV1ZSkge1xuICAgIC8vIGRvIG5vdCBjYWNoZSBsZW5ndGggYmVjYXVzZSBtb3JlIHdhdGNoZXJzIG1pZ2h0IGJlIHB1c2hlZFxuICAgIC8vIGFzIHdlIHJ1biBleGlzdGluZyB3YXRjaGVyc1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgcXVldWUubGVuZ3RoOyBpKyspIHtcbiAgICAgIHZhciB3YXRjaGVyID0gcXVldWVbaV07XG4gICAgICB2YXIgaWQgPSB3YXRjaGVyLmlkO1xuICAgICAgaGFzW2lkXSA9IG51bGw7XG4gICAgICB3YXRjaGVyLnJ1bigpO1xuICAgICAgLy8gaW4gZGV2IGJ1aWxkLCBjaGVjayBhbmQgc3RvcCBjaXJjdWxhciB1cGRhdGVzLlxuICAgICAgaWYgKCdkZXZlbG9wbWVudCcgIT09ICdwcm9kdWN0aW9uJyAmJiBoYXNbaWRdICE9IG51bGwpIHtcbiAgICAgICAgY2lyY3VsYXJbaWRdID0gKGNpcmN1bGFyW2lkXSB8fCAwKSArIDE7XG4gICAgICAgIGlmIChjaXJjdWxhcltpZF0gPiBjb25maWcuX21heFVwZGF0ZUNvdW50KSB7XG4gICAgICAgICAgd2FybignWW91IG1heSBoYXZlIGFuIGluZmluaXRlIHVwZGF0ZSBsb29wIGZvciB3YXRjaGVyICcgKyAnd2l0aCBleHByZXNzaW9uIFwiJyArIHdhdGNoZXIuZXhwcmVzc2lvbiArICdcIicsIHdhdGNoZXIudm0pO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIHF1ZXVlLmxlbmd0aCA9IDA7XG4gIH1cblxuICAvKipcbiAgICogUHVzaCBhIHdhdGNoZXIgaW50byB0aGUgd2F0Y2hlciBxdWV1ZS5cbiAgICogSm9icyB3aXRoIGR1cGxpY2F0ZSBJRHMgd2lsbCBiZSBza2lwcGVkIHVubGVzcyBpdCdzXG4gICAqIHB1c2hlZCB3aGVuIHRoZSBxdWV1ZSBpcyBiZWluZyBmbHVzaGVkLlxuICAgKlxuICAgKiBAcGFyYW0ge1dhdGNoZXJ9IHdhdGNoZXJcbiAgICogICBwcm9wZXJ0aWVzOlxuICAgKiAgIC0ge051bWJlcn0gaWRcbiAgICogICAtIHtGdW5jdGlvbn0gcnVuXG4gICAqL1xuXG4gIGZ1bmN0aW9uIHB1c2hXYXRjaGVyKHdhdGNoZXIpIHtcbiAgICB2YXIgaWQgPSB3YXRjaGVyLmlkO1xuICAgIGlmIChoYXNbaWRdID09IG51bGwpIHtcbiAgICAgIC8vIHB1c2ggd2F0Y2hlciBpbnRvIGFwcHJvcHJpYXRlIHF1ZXVlXG4gICAgICB2YXIgcSA9IHdhdGNoZXIudXNlciA/IHVzZXJRdWV1ZSA6IHF1ZXVlO1xuICAgICAgaGFzW2lkXSA9IHEubGVuZ3RoO1xuICAgICAgcS5wdXNoKHdhdGNoZXIpO1xuICAgICAgLy8gcXVldWUgdGhlIGZsdXNoXG4gICAgICBpZiAoIXdhaXRpbmcpIHtcbiAgICAgICAgd2FpdGluZyA9IHRydWU7XG4gICAgICAgIG5leHRUaWNrKGZsdXNoQmF0Y2hlclF1ZXVlKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICB2YXIgdWlkJDIgPSAwO1xuXG4gIC8qKlxuICAgKiBBIHdhdGNoZXIgcGFyc2VzIGFuIGV4cHJlc3Npb24sIGNvbGxlY3RzIGRlcGVuZGVuY2llcyxcbiAgICogYW5kIGZpcmVzIGNhbGxiYWNrIHdoZW4gdGhlIGV4cHJlc3Npb24gdmFsdWUgY2hhbmdlcy5cbiAgICogVGhpcyBpcyB1c2VkIGZvciBib3RoIHRoZSAkd2F0Y2goKSBhcGkgYW5kIGRpcmVjdGl2ZXMuXG4gICAqXG4gICAqIEBwYXJhbSB7VnVlfSB2bVxuICAgKiBAcGFyYW0ge1N0cmluZ3xGdW5jdGlvbn0gZXhwT3JGblxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBjYlxuICAgKiBAcGFyYW0ge09iamVjdH0gb3B0aW9uc1xuICAgKiAgICAgICAgICAgICAgICAgLSB7QXJyYXl9IGZpbHRlcnNcbiAgICogICAgICAgICAgICAgICAgIC0ge0Jvb2xlYW59IHR3b1dheVxuICAgKiAgICAgICAgICAgICAgICAgLSB7Qm9vbGVhbn0gZGVlcFxuICAgKiAgICAgICAgICAgICAgICAgLSB7Qm9vbGVhbn0gdXNlclxuICAgKiAgICAgICAgICAgICAgICAgLSB7Qm9vbGVhbn0gc3luY1xuICAgKiAgICAgICAgICAgICAgICAgLSB7Qm9vbGVhbn0gbGF6eVxuICAgKiAgICAgICAgICAgICAgICAgLSB7RnVuY3Rpb259IFtwcmVQcm9jZXNzXVxuICAgKiAgICAgICAgICAgICAgICAgLSB7RnVuY3Rpb259IFtwb3N0UHJvY2Vzc11cbiAgICogQGNvbnN0cnVjdG9yXG4gICAqL1xuICBmdW5jdGlvbiBXYXRjaGVyKHZtLCBleHBPckZuLCBjYiwgb3B0aW9ucykge1xuICAgIC8vIG1peCBpbiBvcHRpb25zXG4gICAgaWYgKG9wdGlvbnMpIHtcbiAgICAgIGV4dGVuZCh0aGlzLCBvcHRpb25zKTtcbiAgICB9XG4gICAgdmFyIGlzRm4gPSB0eXBlb2YgZXhwT3JGbiA9PT0gJ2Z1bmN0aW9uJztcbiAgICB0aGlzLnZtID0gdm07XG4gICAgdm0uX3dhdGNoZXJzLnB1c2godGhpcyk7XG4gICAgdGhpcy5leHByZXNzaW9uID0gZXhwT3JGbjtcbiAgICB0aGlzLmNiID0gY2I7XG4gICAgdGhpcy5pZCA9ICsrdWlkJDI7IC8vIHVpZCBmb3IgYmF0Y2hpbmdcbiAgICB0aGlzLmFjdGl2ZSA9IHRydWU7XG4gICAgdGhpcy5kaXJ0eSA9IHRoaXMubGF6eTsgLy8gZm9yIGxhenkgd2F0Y2hlcnNcbiAgICB0aGlzLmRlcHMgPSBbXTtcbiAgICB0aGlzLm5ld0RlcHMgPSBbXTtcbiAgICB0aGlzLmRlcElkcyA9IG5ldyBfU2V0KCk7XG4gICAgdGhpcy5uZXdEZXBJZHMgPSBuZXcgX1NldCgpO1xuICAgIHRoaXMucHJldkVycm9yID0gbnVsbDsgLy8gZm9yIGFzeW5jIGVycm9yIHN0YWNrc1xuICAgIC8vIHBhcnNlIGV4cHJlc3Npb24gZm9yIGdldHRlci9zZXR0ZXJcbiAgICBpZiAoaXNGbikge1xuICAgICAgdGhpcy5nZXR0ZXIgPSBleHBPckZuO1xuICAgICAgdGhpcy5zZXR0ZXIgPSB1bmRlZmluZWQ7XG4gICAgfSBlbHNlIHtcbiAgICAgIHZhciByZXMgPSBwYXJzZUV4cHJlc3Npb24oZXhwT3JGbiwgdGhpcy50d29XYXkpO1xuICAgICAgdGhpcy5nZXR0ZXIgPSByZXMuZ2V0O1xuICAgICAgdGhpcy5zZXR0ZXIgPSByZXMuc2V0O1xuICAgIH1cbiAgICB0aGlzLnZhbHVlID0gdGhpcy5sYXp5ID8gdW5kZWZpbmVkIDogdGhpcy5nZXQoKTtcbiAgICAvLyBzdGF0ZSBmb3IgYXZvaWRpbmcgZmFsc2UgdHJpZ2dlcnMgZm9yIGRlZXAgYW5kIEFycmF5XG4gICAgLy8gd2F0Y2hlcnMgZHVyaW5nIHZtLl9kaWdlc3QoKVxuICAgIHRoaXMucXVldWVkID0gdGhpcy5zaGFsbG93ID0gZmFsc2U7XG4gIH1cblxuICAvKipcbiAgICogRXZhbHVhdGUgdGhlIGdldHRlciwgYW5kIHJlLWNvbGxlY3QgZGVwZW5kZW5jaWVzLlxuICAgKi9cblxuICBXYXRjaGVyLnByb3RvdHlwZS5nZXQgPSBmdW5jdGlvbiAoKSB7XG4gICAgdGhpcy5iZWZvcmVHZXQoKTtcbiAgICB2YXIgc2NvcGUgPSB0aGlzLnNjb3BlIHx8IHRoaXMudm07XG4gICAgdmFyIHZhbHVlO1xuICAgIHRyeSB7XG4gICAgICB2YWx1ZSA9IHRoaXMuZ2V0dGVyLmNhbGwoc2NvcGUsIHNjb3BlKTtcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICBpZiAoJ2RldmVsb3BtZW50JyAhPT0gJ3Byb2R1Y3Rpb24nICYmIGNvbmZpZy53YXJuRXhwcmVzc2lvbkVycm9ycykge1xuICAgICAgICB3YXJuKCdFcnJvciB3aGVuIGV2YWx1YXRpbmcgZXhwcmVzc2lvbiAnICsgJ1wiJyArIHRoaXMuZXhwcmVzc2lvbiArICdcIjogJyArIGUudG9TdHJpbmcoKSwgdGhpcy52bSk7XG4gICAgICB9XG4gICAgfVxuICAgIC8vIFwidG91Y2hcIiBldmVyeSBwcm9wZXJ0eSBzbyB0aGV5IGFyZSBhbGwgdHJhY2tlZCBhc1xuICAgIC8vIGRlcGVuZGVuY2llcyBmb3IgZGVlcCB3YXRjaGluZ1xuICAgIGlmICh0aGlzLmRlZXApIHtcbiAgICAgIHRyYXZlcnNlKHZhbHVlKTtcbiAgICB9XG4gICAgaWYgKHRoaXMucHJlUHJvY2Vzcykge1xuICAgICAgdmFsdWUgPSB0aGlzLnByZVByb2Nlc3ModmFsdWUpO1xuICAgIH1cbiAgICBpZiAodGhpcy5maWx0ZXJzKSB7XG4gICAgICB2YWx1ZSA9IHNjb3BlLl9hcHBseUZpbHRlcnModmFsdWUsIG51bGwsIHRoaXMuZmlsdGVycywgZmFsc2UpO1xuICAgIH1cbiAgICBpZiAodGhpcy5wb3N0UHJvY2Vzcykge1xuICAgICAgdmFsdWUgPSB0aGlzLnBvc3RQcm9jZXNzKHZhbHVlKTtcbiAgICB9XG4gICAgdGhpcy5hZnRlckdldCgpO1xuICAgIHJldHVybiB2YWx1ZTtcbiAgfTtcblxuICAvKipcbiAgICogU2V0IHRoZSBjb3JyZXNwb25kaW5nIHZhbHVlIHdpdGggdGhlIHNldHRlci5cbiAgICpcbiAgICogQHBhcmFtIHsqfSB2YWx1ZVxuICAgKi9cblxuICBXYXRjaGVyLnByb3RvdHlwZS5zZXQgPSBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICB2YXIgc2NvcGUgPSB0aGlzLnNjb3BlIHx8IHRoaXMudm07XG4gICAgaWYgKHRoaXMuZmlsdGVycykge1xuICAgICAgdmFsdWUgPSBzY29wZS5fYXBwbHlGaWx0ZXJzKHZhbHVlLCB0aGlzLnZhbHVlLCB0aGlzLmZpbHRlcnMsIHRydWUpO1xuICAgIH1cbiAgICB0cnkge1xuICAgICAgdGhpcy5zZXR0ZXIuY2FsbChzY29wZSwgc2NvcGUsIHZhbHVlKTtcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICBpZiAoJ2RldmVsb3BtZW50JyAhPT0gJ3Byb2R1Y3Rpb24nICYmIGNvbmZpZy53YXJuRXhwcmVzc2lvbkVycm9ycykge1xuICAgICAgICB3YXJuKCdFcnJvciB3aGVuIGV2YWx1YXRpbmcgc2V0dGVyICcgKyAnXCInICsgdGhpcy5leHByZXNzaW9uICsgJ1wiOiAnICsgZS50b1N0cmluZygpLCB0aGlzLnZtKTtcbiAgICAgIH1cbiAgICB9XG4gICAgLy8gdHdvLXdheSBzeW5jIGZvciB2LWZvciBhbGlhc1xuICAgIHZhciBmb3JDb250ZXh0ID0gc2NvcGUuJGZvckNvbnRleHQ7XG4gICAgaWYgKGZvckNvbnRleHQgJiYgZm9yQ29udGV4dC5hbGlhcyA9PT0gdGhpcy5leHByZXNzaW9uKSB7XG4gICAgICBpZiAoZm9yQ29udGV4dC5maWx0ZXJzKSB7XG4gICAgICAgICdkZXZlbG9wbWVudCcgIT09ICdwcm9kdWN0aW9uJyAmJiB3YXJuKCdJdCBzZWVtcyB5b3UgYXJlIHVzaW5nIHR3by13YXkgYmluZGluZyBvbiAnICsgJ2Egdi1mb3IgYWxpYXMgKCcgKyB0aGlzLmV4cHJlc3Npb24gKyAnKSwgYW5kIHRoZSAnICsgJ3YtZm9yIGhhcyBmaWx0ZXJzLiBUaGlzIHdpbGwgbm90IHdvcmsgcHJvcGVybHkuICcgKyAnRWl0aGVyIHJlbW92ZSB0aGUgZmlsdGVycyBvciB1c2UgYW4gYXJyYXkgb2YgJyArICdvYmplY3RzIGFuZCBiaW5kIHRvIG9iamVjdCBwcm9wZXJ0aWVzIGluc3RlYWQuJywgdGhpcy52bSk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIGZvckNvbnRleHQuX3dpdGhMb2NrKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKHNjb3BlLiRrZXkpIHtcbiAgICAgICAgICAvLyBvcmlnaW5hbCBpcyBhbiBvYmplY3RcbiAgICAgICAgICBmb3JDb250ZXh0LnJhd1ZhbHVlW3Njb3BlLiRrZXldID0gdmFsdWU7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgZm9yQ29udGV4dC5yYXdWYWx1ZS4kc2V0KHNjb3BlLiRpbmRleCwgdmFsdWUpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG4gIH07XG5cbiAgLyoqXG4gICAqIFByZXBhcmUgZm9yIGRlcGVuZGVuY3kgY29sbGVjdGlvbi5cbiAgICovXG5cbiAgV2F0Y2hlci5wcm90b3R5cGUuYmVmb3JlR2V0ID0gZnVuY3Rpb24gKCkge1xuICAgIERlcC50YXJnZXQgPSB0aGlzO1xuICB9O1xuXG4gIC8qKlxuICAgKiBBZGQgYSBkZXBlbmRlbmN5IHRvIHRoaXMgZGlyZWN0aXZlLlxuICAgKlxuICAgKiBAcGFyYW0ge0RlcH0gZGVwXG4gICAqL1xuXG4gIFdhdGNoZXIucHJvdG90eXBlLmFkZERlcCA9IGZ1bmN0aW9uIChkZXApIHtcbiAgICB2YXIgaWQgPSBkZXAuaWQ7XG4gICAgaWYgKCF0aGlzLm5ld0RlcElkcy5oYXMoaWQpKSB7XG4gICAgICB0aGlzLm5ld0RlcElkcy5hZGQoaWQpO1xuICAgICAgdGhpcy5uZXdEZXBzLnB1c2goZGVwKTtcbiAgICAgIGlmICghdGhpcy5kZXBJZHMuaGFzKGlkKSkge1xuICAgICAgICBkZXAuYWRkU3ViKHRoaXMpO1xuICAgICAgfVxuICAgIH1cbiAgfTtcblxuICAvKipcbiAgICogQ2xlYW4gdXAgZm9yIGRlcGVuZGVuY3kgY29sbGVjdGlvbi5cbiAgICovXG5cbiAgV2F0Y2hlci5wcm90b3R5cGUuYWZ0ZXJHZXQgPSBmdW5jdGlvbiAoKSB7XG4gICAgRGVwLnRhcmdldCA9IG51bGw7XG4gICAgdmFyIGkgPSB0aGlzLmRlcHMubGVuZ3RoO1xuICAgIHdoaWxlIChpLS0pIHtcbiAgICAgIHZhciBkZXAgPSB0aGlzLmRlcHNbaV07XG4gICAgICBpZiAoIXRoaXMubmV3RGVwSWRzLmhhcyhkZXAuaWQpKSB7XG4gICAgICAgIGRlcC5yZW1vdmVTdWIodGhpcyk7XG4gICAgICB9XG4gICAgfVxuICAgIHZhciB0bXAgPSB0aGlzLmRlcElkcztcbiAgICB0aGlzLmRlcElkcyA9IHRoaXMubmV3RGVwSWRzO1xuICAgIHRoaXMubmV3RGVwSWRzID0gdG1wO1xuICAgIHRoaXMubmV3RGVwSWRzLmNsZWFyKCk7XG4gICAgdG1wID0gdGhpcy5kZXBzO1xuICAgIHRoaXMuZGVwcyA9IHRoaXMubmV3RGVwcztcbiAgICB0aGlzLm5ld0RlcHMgPSB0bXA7XG4gICAgdGhpcy5uZXdEZXBzLmxlbmd0aCA9IDA7XG4gIH07XG5cbiAgLyoqXG4gICAqIFN1YnNjcmliZXIgaW50ZXJmYWNlLlxuICAgKiBXaWxsIGJlIGNhbGxlZCB3aGVuIGEgZGVwZW5kZW5jeSBjaGFuZ2VzLlxuICAgKlxuICAgKiBAcGFyYW0ge0Jvb2xlYW59IHNoYWxsb3dcbiAgICovXG5cbiAgV2F0Y2hlci5wcm90b3R5cGUudXBkYXRlID0gZnVuY3Rpb24gKHNoYWxsb3cpIHtcbiAgICBpZiAodGhpcy5sYXp5KSB7XG4gICAgICB0aGlzLmRpcnR5ID0gdHJ1ZTtcbiAgICB9IGVsc2UgaWYgKHRoaXMuc3luYyB8fCAhY29uZmlnLmFzeW5jKSB7XG4gICAgICB0aGlzLnJ1bigpO1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyBpZiBxdWV1ZWQsIG9ubHkgb3ZlcndyaXRlIHNoYWxsb3cgd2l0aCBub24tc2hhbGxvdyxcbiAgICAgIC8vIGJ1dCBub3QgdGhlIG90aGVyIHdheSBhcm91bmQuXG4gICAgICB0aGlzLnNoYWxsb3cgPSB0aGlzLnF1ZXVlZCA/IHNoYWxsb3cgPyB0aGlzLnNoYWxsb3cgOiBmYWxzZSA6ICEhc2hhbGxvdztcbiAgICAgIHRoaXMucXVldWVkID0gdHJ1ZTtcbiAgICAgIC8vIHJlY29yZCBiZWZvcmUtcHVzaCBlcnJvciBzdGFjayBpbiBkZWJ1ZyBtb2RlXG4gICAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgaWYgKi9cbiAgICAgIGlmICgnZGV2ZWxvcG1lbnQnICE9PSAncHJvZHVjdGlvbicgJiYgY29uZmlnLmRlYnVnKSB7XG4gICAgICAgIHRoaXMucHJldkVycm9yID0gbmV3IEVycm9yKCdbdnVlXSBhc3luYyBzdGFjayB0cmFjZScpO1xuICAgICAgfVxuICAgICAgcHVzaFdhdGNoZXIodGhpcyk7XG4gICAgfVxuICB9O1xuXG4gIC8qKlxuICAgKiBCYXRjaGVyIGpvYiBpbnRlcmZhY2UuXG4gICAqIFdpbGwgYmUgY2FsbGVkIGJ5IHRoZSBiYXRjaGVyLlxuICAgKi9cblxuICBXYXRjaGVyLnByb3RvdHlwZS5ydW4gPSBmdW5jdGlvbiAoKSB7XG4gICAgaWYgKHRoaXMuYWN0aXZlKSB7XG4gICAgICB2YXIgdmFsdWUgPSB0aGlzLmdldCgpO1xuICAgICAgaWYgKHZhbHVlICE9PSB0aGlzLnZhbHVlIHx8XG4gICAgICAvLyBEZWVwIHdhdGNoZXJzIGFuZCB3YXRjaGVycyBvbiBPYmplY3QvQXJyYXlzIHNob3VsZCBmaXJlIGV2ZW5cbiAgICAgIC8vIHdoZW4gdGhlIHZhbHVlIGlzIHRoZSBzYW1lLCBiZWNhdXNlIHRoZSB2YWx1ZSBtYXlcbiAgICAgIC8vIGhhdmUgbXV0YXRlZDsgYnV0IG9ubHkgZG8gc28gaWYgdGhpcyBpcyBhXG4gICAgICAvLyBub24tc2hhbGxvdyB1cGRhdGUgKGNhdXNlZCBieSBhIHZtIGRpZ2VzdCkuXG4gICAgICAoaXNPYmplY3QodmFsdWUpIHx8IHRoaXMuZGVlcCkgJiYgIXRoaXMuc2hhbGxvdykge1xuICAgICAgICAvLyBzZXQgbmV3IHZhbHVlXG4gICAgICAgIHZhciBvbGRWYWx1ZSA9IHRoaXMudmFsdWU7XG4gICAgICAgIHRoaXMudmFsdWUgPSB2YWx1ZTtcbiAgICAgICAgLy8gaW4gZGVidWcgKyBhc3luYyBtb2RlLCB3aGVuIGEgd2F0Y2hlciBjYWxsYmFja3NcbiAgICAgICAgLy8gdGhyb3dzLCB3ZSBhbHNvIHRocm93IHRoZSBzYXZlZCBiZWZvcmUtcHVzaCBlcnJvclxuICAgICAgICAvLyBzbyB0aGUgZnVsbCBjcm9zcy10aWNrIHN0YWNrIHRyYWNlIGlzIGF2YWlsYWJsZS5cbiAgICAgICAgdmFyIHByZXZFcnJvciA9IHRoaXMucHJldkVycm9yO1xuICAgICAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgaWYgKi9cbiAgICAgICAgaWYgKCdkZXZlbG9wbWVudCcgIT09ICdwcm9kdWN0aW9uJyAmJiBjb25maWcuZGVidWcgJiYgcHJldkVycm9yKSB7XG4gICAgICAgICAgdGhpcy5wcmV2RXJyb3IgPSBudWxsO1xuICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICB0aGlzLmNiLmNhbGwodGhpcy52bSwgdmFsdWUsIG9sZFZhbHVlKTtcbiAgICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgICBuZXh0VGljayhmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgIHRocm93IHByZXZFcnJvcjtcbiAgICAgICAgICAgIH0sIDApO1xuICAgICAgICAgICAgdGhyb3cgZTtcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhpcy5jYi5jYWxsKHRoaXMudm0sIHZhbHVlLCBvbGRWYWx1ZSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHRoaXMucXVldWVkID0gdGhpcy5zaGFsbG93ID0gZmFsc2U7XG4gICAgfVxuICB9O1xuXG4gIC8qKlxuICAgKiBFdmFsdWF0ZSB0aGUgdmFsdWUgb2YgdGhlIHdhdGNoZXIuXG4gICAqIFRoaXMgb25seSBnZXRzIGNhbGxlZCBmb3IgbGF6eSB3YXRjaGVycy5cbiAgICovXG5cbiAgV2F0Y2hlci5wcm90b3R5cGUuZXZhbHVhdGUgPSBmdW5jdGlvbiAoKSB7XG4gICAgLy8gYXZvaWQgb3ZlcndyaXRpbmcgYW5vdGhlciB3YXRjaGVyIHRoYXQgaXMgYmVpbmdcbiAgICAvLyBjb2xsZWN0ZWQuXG4gICAgdmFyIGN1cnJlbnQgPSBEZXAudGFyZ2V0O1xuICAgIHRoaXMudmFsdWUgPSB0aGlzLmdldCgpO1xuICAgIHRoaXMuZGlydHkgPSBmYWxzZTtcbiAgICBEZXAudGFyZ2V0ID0gY3VycmVudDtcbiAgfTtcblxuICAvKipcbiAgICogRGVwZW5kIG9uIGFsbCBkZXBzIGNvbGxlY3RlZCBieSB0aGlzIHdhdGNoZXIuXG4gICAqL1xuXG4gIFdhdGNoZXIucHJvdG90eXBlLmRlcGVuZCA9IGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgaSA9IHRoaXMuZGVwcy5sZW5ndGg7XG4gICAgd2hpbGUgKGktLSkge1xuICAgICAgdGhpcy5kZXBzW2ldLmRlcGVuZCgpO1xuICAgIH1cbiAgfTtcblxuICAvKipcbiAgICogUmVtb3ZlIHNlbGYgZnJvbSBhbGwgZGVwZW5kZW5jaWVzJyBzdWJjcmliZXIgbGlzdC5cbiAgICovXG5cbiAgV2F0Y2hlci5wcm90b3R5cGUudGVhcmRvd24gPSBmdW5jdGlvbiAoKSB7XG4gICAgaWYgKHRoaXMuYWN0aXZlKSB7XG4gICAgICAvLyByZW1vdmUgc2VsZiBmcm9tIHZtJ3Mgd2F0Y2hlciBsaXN0XG4gICAgICAvLyB0aGlzIGlzIGEgc29tZXdoYXQgZXhwZW5zaXZlIG9wZXJhdGlvbiBzbyB3ZSBza2lwIGl0XG4gICAgICAvLyBpZiB0aGUgdm0gaXMgYmVpbmcgZGVzdHJveWVkIG9yIGlzIHBlcmZvcm1pbmcgYSB2LWZvclxuICAgICAgLy8gcmUtcmVuZGVyICh0aGUgd2F0Y2hlciBsaXN0IGlzIHRoZW4gZmlsdGVyZWQgYnkgdi1mb3IpLlxuICAgICAgaWYgKCF0aGlzLnZtLl9pc0JlaW5nRGVzdHJveWVkICYmICF0aGlzLnZtLl92Rm9yUmVtb3ZpbmcpIHtcbiAgICAgICAgdGhpcy52bS5fd2F0Y2hlcnMuJHJlbW92ZSh0aGlzKTtcbiAgICAgIH1cbiAgICAgIHZhciBpID0gdGhpcy5kZXBzLmxlbmd0aDtcbiAgICAgIHdoaWxlIChpLS0pIHtcbiAgICAgICAgdGhpcy5kZXBzW2ldLnJlbW92ZVN1Yih0aGlzKTtcbiAgICAgIH1cbiAgICAgIHRoaXMuYWN0aXZlID0gZmFsc2U7XG4gICAgICB0aGlzLnZtID0gdGhpcy5jYiA9IHRoaXMudmFsdWUgPSBudWxsO1xuICAgIH1cbiAgfTtcblxuICAvKipcbiAgICogUmVjcnVzaXZlbHkgdHJhdmVyc2UgYW4gb2JqZWN0IHRvIGV2b2tlIGFsbCBjb252ZXJ0ZWRcbiAgICogZ2V0dGVycywgc28gdGhhdCBldmVyeSBuZXN0ZWQgcHJvcGVydHkgaW5zaWRlIHRoZSBvYmplY3RcbiAgICogaXMgY29sbGVjdGVkIGFzIGEgXCJkZWVwXCIgZGVwZW5kZW5jeS5cbiAgICpcbiAgICogQHBhcmFtIHsqfSB2YWxcbiAgICovXG5cbiAgdmFyIHNlZW5PYmplY3RzID0gbmV3IF9TZXQoKTtcbiAgZnVuY3Rpb24gdHJhdmVyc2UodmFsLCBzZWVuKSB7XG4gICAgdmFyIGkgPSB1bmRlZmluZWQsXG4gICAgICAgIGtleXMgPSB1bmRlZmluZWQ7XG4gICAgaWYgKCFzZWVuKSB7XG4gICAgICBzZWVuID0gc2Vlbk9iamVjdHM7XG4gICAgICBzZWVuLmNsZWFyKCk7XG4gICAgfVxuICAgIHZhciBpc0EgPSBpc0FycmF5KHZhbCk7XG4gICAgdmFyIGlzTyA9IGlzT2JqZWN0KHZhbCk7XG4gICAgaWYgKGlzQSB8fCBpc08pIHtcbiAgICAgIGlmICh2YWwuX19vYl9fKSB7XG4gICAgICAgIHZhciBkZXBJZCA9IHZhbC5fX29iX18uZGVwLmlkO1xuICAgICAgICBpZiAoc2Vlbi5oYXMoZGVwSWQpKSB7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHNlZW4uYWRkKGRlcElkKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKGlzQSkge1xuICAgICAgICBpID0gdmFsLmxlbmd0aDtcbiAgICAgICAgd2hpbGUgKGktLSkgdHJhdmVyc2UodmFsW2ldLCBzZWVuKTtcbiAgICAgIH0gZWxzZSBpZiAoaXNPKSB7XG4gICAgICAgIGtleXMgPSBPYmplY3Qua2V5cyh2YWwpO1xuICAgICAgICBpID0ga2V5cy5sZW5ndGg7XG4gICAgICAgIHdoaWxlIChpLS0pIHRyYXZlcnNlKHZhbFtrZXlzW2ldXSwgc2Vlbik7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgdmFyIHRleHQkMSA9IHtcblxuICAgIGJpbmQ6IGZ1bmN0aW9uIGJpbmQoKSB7XG4gICAgICB0aGlzLmF0dHIgPSB0aGlzLmVsLm5vZGVUeXBlID09PSAzID8gJ2RhdGEnIDogJ3RleHRDb250ZW50JztcbiAgICB9LFxuXG4gICAgdXBkYXRlOiBmdW5jdGlvbiB1cGRhdGUodmFsdWUpIHtcbiAgICAgIHRoaXMuZWxbdGhpcy5hdHRyXSA9IF90b1N0cmluZyh2YWx1ZSk7XG4gICAgfVxuICB9O1xuXG4gIHZhciB0ZW1wbGF0ZUNhY2hlID0gbmV3IENhY2hlKDEwMDApO1xuICB2YXIgaWRTZWxlY3RvckNhY2hlID0gbmV3IENhY2hlKDEwMDApO1xuXG4gIHZhciBtYXAgPSB7XG4gICAgZWZhdWx0OiBbMCwgJycsICcnXSxcbiAgICBsZWdlbmQ6IFsxLCAnPGZpZWxkc2V0PicsICc8L2ZpZWxkc2V0PiddLFxuICAgIHRyOiBbMiwgJzx0YWJsZT48dGJvZHk+JywgJzwvdGJvZHk+PC90YWJsZT4nXSxcbiAgICBjb2w6IFsyLCAnPHRhYmxlPjx0Ym9keT48L3Rib2R5Pjxjb2xncm91cD4nLCAnPC9jb2xncm91cD48L3RhYmxlPiddXG4gIH07XG5cbiAgbWFwLnRkID0gbWFwLnRoID0gWzMsICc8dGFibGU+PHRib2R5Pjx0cj4nLCAnPC90cj48L3Rib2R5PjwvdGFibGU+J107XG5cbiAgbWFwLm9wdGlvbiA9IG1hcC5vcHRncm91cCA9IFsxLCAnPHNlbGVjdCBtdWx0aXBsZT1cIm11bHRpcGxlXCI+JywgJzwvc2VsZWN0PiddO1xuXG4gIG1hcC50aGVhZCA9IG1hcC50Ym9keSA9IG1hcC5jb2xncm91cCA9IG1hcC5jYXB0aW9uID0gbWFwLnRmb290ID0gWzEsICc8dGFibGU+JywgJzwvdGFibGU+J107XG5cbiAgbWFwLmcgPSBtYXAuZGVmcyA9IG1hcC5zeW1ib2wgPSBtYXAudXNlID0gbWFwLmltYWdlID0gbWFwLnRleHQgPSBtYXAuY2lyY2xlID0gbWFwLmVsbGlwc2UgPSBtYXAubGluZSA9IG1hcC5wYXRoID0gbWFwLnBvbHlnb24gPSBtYXAucG9seWxpbmUgPSBtYXAucmVjdCA9IFsxLCAnPHN2ZyAnICsgJ3htbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiAnICsgJ3htbG5zOnhsaW5rPVwiaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGlua1wiICcgKyAneG1sbnM6ZXY9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAxL3htbC1ldmVudHNcIicgKyAndmVyc2lvbj1cIjEuMVwiPicsICc8L3N2Zz4nXTtcblxuICAvKipcbiAgICogQ2hlY2sgaWYgYSBub2RlIGlzIGEgc3VwcG9ydGVkIHRlbXBsYXRlIG5vZGUgd2l0aCBhXG4gICAqIERvY3VtZW50RnJhZ21lbnQgY29udGVudC5cbiAgICpcbiAgICogQHBhcmFtIHtOb2RlfSBub2RlXG4gICAqIEByZXR1cm4ge0Jvb2xlYW59XG4gICAqL1xuXG4gIGZ1bmN0aW9uIGlzUmVhbFRlbXBsYXRlKG5vZGUpIHtcbiAgICByZXR1cm4gaXNUZW1wbGF0ZShub2RlKSAmJiBpc0ZyYWdtZW50KG5vZGUuY29udGVudCk7XG4gIH1cblxuICB2YXIgdGFnUkUkMSA9IC88KFtcXHc6LV0rKS87XG4gIHZhciBlbnRpdHlSRSA9IC8mIz9cXHcrPzsvO1xuXG4gIC8qKlxuICAgKiBDb252ZXJ0IGEgc3RyaW5nIHRlbXBsYXRlIHRvIGEgRG9jdW1lbnRGcmFnbWVudC5cbiAgICogRGV0ZXJtaW5lcyBjb3JyZWN0IHdyYXBwaW5nIGJ5IHRhZyB0eXBlcy4gV3JhcHBpbmdcbiAgICogc3RyYXRlZ3kgZm91bmQgaW4galF1ZXJ5ICYgY29tcG9uZW50L2RvbWlmeS5cbiAgICpcbiAgICogQHBhcmFtIHtTdHJpbmd9IHRlbXBsYXRlU3RyaW5nXG4gICAqIEBwYXJhbSB7Qm9vbGVhbn0gcmF3XG4gICAqIEByZXR1cm4ge0RvY3VtZW50RnJhZ21lbnR9XG4gICAqL1xuXG4gIGZ1bmN0aW9uIHN0cmluZ1RvRnJhZ21lbnQodGVtcGxhdGVTdHJpbmcsIHJhdykge1xuICAgIC8vIHRyeSBhIGNhY2hlIGhpdCBmaXJzdFxuICAgIHZhciBjYWNoZUtleSA9IHJhdyA/IHRlbXBsYXRlU3RyaW5nIDogdGVtcGxhdGVTdHJpbmcudHJpbSgpO1xuICAgIHZhciBoaXQgPSB0ZW1wbGF0ZUNhY2hlLmdldChjYWNoZUtleSk7XG4gICAgaWYgKGhpdCkge1xuICAgICAgcmV0dXJuIGhpdDtcbiAgICB9XG5cbiAgICB2YXIgZnJhZyA9IGRvY3VtZW50LmNyZWF0ZURvY3VtZW50RnJhZ21lbnQoKTtcbiAgICB2YXIgdGFnTWF0Y2ggPSB0ZW1wbGF0ZVN0cmluZy5tYXRjaCh0YWdSRSQxKTtcbiAgICB2YXIgZW50aXR5TWF0Y2ggPSBlbnRpdHlSRS50ZXN0KHRlbXBsYXRlU3RyaW5nKTtcblxuICAgIGlmICghdGFnTWF0Y2ggJiYgIWVudGl0eU1hdGNoKSB7XG4gICAgICAvLyB0ZXh0IG9ubHksIHJldHVybiBhIHNpbmdsZSB0ZXh0IG5vZGUuXG4gICAgICBmcmFnLmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKHRlbXBsYXRlU3RyaW5nKSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHZhciB0YWcgPSB0YWdNYXRjaCAmJiB0YWdNYXRjaFsxXTtcbiAgICAgIHZhciB3cmFwID0gbWFwW3RhZ10gfHwgbWFwLmVmYXVsdDtcbiAgICAgIHZhciBkZXB0aCA9IHdyYXBbMF07XG4gICAgICB2YXIgcHJlZml4ID0gd3JhcFsxXTtcbiAgICAgIHZhciBzdWZmaXggPSB3cmFwWzJdO1xuICAgICAgdmFyIG5vZGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcblxuICAgICAgbm9kZS5pbm5lckhUTUwgPSBwcmVmaXggKyB0ZW1wbGF0ZVN0cmluZyArIHN1ZmZpeDtcbiAgICAgIHdoaWxlIChkZXB0aC0tKSB7XG4gICAgICAgIG5vZGUgPSBub2RlLmxhc3RDaGlsZDtcbiAgICAgIH1cblxuICAgICAgdmFyIGNoaWxkO1xuICAgICAgLyogZXNsaW50LWRpc2FibGUgbm8tY29uZC1hc3NpZ24gKi9cbiAgICAgIHdoaWxlIChjaGlsZCA9IG5vZGUuZmlyc3RDaGlsZCkge1xuICAgICAgICAvKiBlc2xpbnQtZW5hYmxlIG5vLWNvbmQtYXNzaWduICovXG4gICAgICAgIGZyYWcuYXBwZW5kQ2hpbGQoY2hpbGQpO1xuICAgICAgfVxuICAgIH1cbiAgICBpZiAoIXJhdykge1xuICAgICAgdHJpbU5vZGUoZnJhZyk7XG4gICAgfVxuICAgIHRlbXBsYXRlQ2FjaGUucHV0KGNhY2hlS2V5LCBmcmFnKTtcbiAgICByZXR1cm4gZnJhZztcbiAgfVxuXG4gIC8qKlxuICAgKiBDb252ZXJ0IGEgdGVtcGxhdGUgbm9kZSB0byBhIERvY3VtZW50RnJhZ21lbnQuXG4gICAqXG4gICAqIEBwYXJhbSB7Tm9kZX0gbm9kZVxuICAgKiBAcmV0dXJuIHtEb2N1bWVudEZyYWdtZW50fVxuICAgKi9cblxuICBmdW5jdGlvbiBub2RlVG9GcmFnbWVudChub2RlKSB7XG4gICAgLy8gaWYgaXRzIGEgdGVtcGxhdGUgdGFnIGFuZCB0aGUgYnJvd3NlciBzdXBwb3J0cyBpdCxcbiAgICAvLyBpdHMgY29udGVudCBpcyBhbHJlYWR5IGEgZG9jdW1lbnQgZnJhZ21lbnQuIEhvd2V2ZXIsIGlPUyBTYWZhcmkgaGFzXG4gICAgLy8gYnVnIHdoZW4gdXNpbmcgZGlyZWN0bHkgY2xvbmVkIHRlbXBsYXRlIGNvbnRlbnQgd2l0aCB0b3VjaFxuICAgIC8vIGV2ZW50cyBhbmQgY2FuIGNhdXNlIGNyYXNoZXMgd2hlbiB0aGUgbm9kZXMgYXJlIHJlbW92ZWQgZnJvbSBET00sIHNvIHdlXG4gICAgLy8gaGF2ZSB0byB0cmVhdCB0ZW1wbGF0ZSBlbGVtZW50cyBhcyBzdHJpbmcgdGVtcGxhdGVzLiAoIzI4MDUpXG4gICAgLyogaXN0YW5idWwgaWdub3JlIGlmICovXG4gICAgaWYgKGlzUmVhbFRlbXBsYXRlKG5vZGUpKSB7XG4gICAgICByZXR1cm4gc3RyaW5nVG9GcmFnbWVudChub2RlLmlubmVySFRNTCk7XG4gICAgfVxuICAgIC8vIHNjcmlwdCB0ZW1wbGF0ZVxuICAgIGlmIChub2RlLnRhZ05hbWUgPT09ICdTQ1JJUFQnKSB7XG4gICAgICByZXR1cm4gc3RyaW5nVG9GcmFnbWVudChub2RlLnRleHRDb250ZW50KTtcbiAgICB9XG4gICAgLy8gbm9ybWFsIG5vZGUsIGNsb25lIGl0IHRvIGF2b2lkIG11dGF0aW5nIHRoZSBvcmlnaW5hbFxuICAgIHZhciBjbG9uZWROb2RlID0gY2xvbmVOb2RlKG5vZGUpO1xuICAgIHZhciBmcmFnID0gZG9jdW1lbnQuY3JlYXRlRG9jdW1lbnRGcmFnbWVudCgpO1xuICAgIHZhciBjaGlsZDtcbiAgICAvKiBlc2xpbnQtZGlzYWJsZSBuby1jb25kLWFzc2lnbiAqL1xuICAgIHdoaWxlIChjaGlsZCA9IGNsb25lZE5vZGUuZmlyc3RDaGlsZCkge1xuICAgICAgLyogZXNsaW50LWVuYWJsZSBuby1jb25kLWFzc2lnbiAqL1xuICAgICAgZnJhZy5hcHBlbmRDaGlsZChjaGlsZCk7XG4gICAgfVxuICAgIHRyaW1Ob2RlKGZyYWcpO1xuICAgIHJldHVybiBmcmFnO1xuICB9XG5cbiAgLy8gVGVzdCBmb3IgdGhlIHByZXNlbmNlIG9mIHRoZSBTYWZhcmkgdGVtcGxhdGUgY2xvbmluZyBidWdcbiAgLy8gaHR0cHM6Ly9idWdzLndlYmtpdC5vcmcvc2hvd3VnLmNnaT9pZD0xMzc3NTVcbiAgdmFyIGhhc0Jyb2tlblRlbXBsYXRlID0gKGZ1bmN0aW9uICgpIHtcbiAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgZWxzZSAqL1xuICAgIGlmIChpbkJyb3dzZXIpIHtcbiAgICAgIHZhciBhID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICBhLmlubmVySFRNTCA9ICc8dGVtcGxhdGU+MTwvdGVtcGxhdGU+JztcbiAgICAgIHJldHVybiAhYS5jbG9uZU5vZGUodHJ1ZSkuZmlyc3RDaGlsZC5pbm5lckhUTUw7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gIH0pKCk7XG5cbiAgLy8gVGVzdCBmb3IgSUUxMC8xMSB0ZXh0YXJlYSBwbGFjZWhvbGRlciBjbG9uZSBidWdcbiAgdmFyIGhhc1RleHRhcmVhQ2xvbmVCdWcgPSAoZnVuY3Rpb24gKCkge1xuICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBlbHNlICovXG4gICAgaWYgKGluQnJvd3Nlcikge1xuICAgICAgdmFyIHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd0ZXh0YXJlYScpO1xuICAgICAgdC5wbGFjZWhvbGRlciA9ICd0JztcbiAgICAgIHJldHVybiB0LmNsb25lTm9kZSh0cnVlKS52YWx1ZSA9PT0gJ3QnO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICB9KSgpO1xuXG4gIC8qKlxuICAgKiAxLiBEZWFsIHdpdGggU2FmYXJpIGNsb25pbmcgbmVzdGVkIDx0ZW1wbGF0ZT4gYnVnIGJ5XG4gICAqICAgIG1hbnVhbGx5IGNsb25pbmcgYWxsIHRlbXBsYXRlIGluc3RhbmNlcy5cbiAgICogMi4gRGVhbCB3aXRoIElFMTAvMTEgdGV4dGFyZWEgcGxhY2Vob2xkZXIgYnVnIGJ5IHNldHRpbmdcbiAgICogICAgdGhlIGNvcnJlY3QgdmFsdWUgYWZ0ZXIgY2xvbmluZy5cbiAgICpcbiAgICogQHBhcmFtIHtFbGVtZW50fERvY3VtZW50RnJhZ21lbnR9IG5vZGVcbiAgICogQHJldHVybiB7RWxlbWVudHxEb2N1bWVudEZyYWdtZW50fVxuICAgKi9cblxuICBmdW5jdGlvbiBjbG9uZU5vZGUobm9kZSkge1xuICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBpZiAqL1xuICAgIGlmICghbm9kZS5xdWVyeVNlbGVjdG9yQWxsKSB7XG4gICAgICByZXR1cm4gbm9kZS5jbG9uZU5vZGUoKTtcbiAgICB9XG4gICAgdmFyIHJlcyA9IG5vZGUuY2xvbmVOb2RlKHRydWUpO1xuICAgIHZhciBpLCBvcmlnaW5hbCwgY2xvbmVkO1xuICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBpZiAqL1xuICAgIGlmIChoYXNCcm9rZW5UZW1wbGF0ZSkge1xuICAgICAgdmFyIHRlbXBDbG9uZSA9IHJlcztcbiAgICAgIGlmIChpc1JlYWxUZW1wbGF0ZShub2RlKSkge1xuICAgICAgICBub2RlID0gbm9kZS5jb250ZW50O1xuICAgICAgICB0ZW1wQ2xvbmUgPSByZXMuY29udGVudDtcbiAgICAgIH1cbiAgICAgIG9yaWdpbmFsID0gbm9kZS5xdWVyeVNlbGVjdG9yQWxsKCd0ZW1wbGF0ZScpO1xuICAgICAgaWYgKG9yaWdpbmFsLmxlbmd0aCkge1xuICAgICAgICBjbG9uZWQgPSB0ZW1wQ2xvbmUucXVlcnlTZWxlY3RvckFsbCgndGVtcGxhdGUnKTtcbiAgICAgICAgaSA9IGNsb25lZC5sZW5ndGg7XG4gICAgICAgIHdoaWxlIChpLS0pIHtcbiAgICAgICAgICBjbG9uZWRbaV0ucGFyZW50Tm9kZS5yZXBsYWNlQ2hpbGQoY2xvbmVOb2RlKG9yaWdpbmFsW2ldKSwgY2xvbmVkW2ldKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgaWYgKi9cbiAgICBpZiAoaGFzVGV4dGFyZWFDbG9uZUJ1Zykge1xuICAgICAgaWYgKG5vZGUudGFnTmFtZSA9PT0gJ1RFWFRBUkVBJykge1xuICAgICAgICByZXMudmFsdWUgPSBub2RlLnZhbHVlO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgb3JpZ2luYWwgPSBub2RlLnF1ZXJ5U2VsZWN0b3JBbGwoJ3RleHRhcmVhJyk7XG4gICAgICAgIGlmIChvcmlnaW5hbC5sZW5ndGgpIHtcbiAgICAgICAgICBjbG9uZWQgPSByZXMucXVlcnlTZWxlY3RvckFsbCgndGV4dGFyZWEnKTtcbiAgICAgICAgICBpID0gY2xvbmVkLmxlbmd0aDtcbiAgICAgICAgICB3aGlsZSAoaS0tKSB7XG4gICAgICAgICAgICBjbG9uZWRbaV0udmFsdWUgPSBvcmlnaW5hbFtpXS52YWx1ZTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHJlcztcbiAgfVxuXG4gIC8qKlxuICAgKiBQcm9jZXNzIHRoZSB0ZW1wbGF0ZSBvcHRpb24gYW5kIG5vcm1hbGl6ZXMgaXQgaW50byBhXG4gICAqIGEgRG9jdW1lbnRGcmFnbWVudCB0aGF0IGNhbiBiZSB1c2VkIGFzIGEgcGFydGlhbCBvciBhXG4gICAqIGluc3RhbmNlIHRlbXBsYXRlLlxuICAgKlxuICAgKiBAcGFyYW0geyp9IHRlbXBsYXRlXG4gICAqICAgICAgICBQb3NzaWJsZSB2YWx1ZXMgaW5jbHVkZTpcbiAgICogICAgICAgIC0gRG9jdW1lbnRGcmFnbWVudCBvYmplY3RcbiAgICogICAgICAgIC0gTm9kZSBvYmplY3Qgb2YgdHlwZSBUZW1wbGF0ZVxuICAgKiAgICAgICAgLSBpZCBzZWxlY3RvcjogJyNzb21lLXRlbXBsYXRlLWlkJ1xuICAgKiAgICAgICAgLSB0ZW1wbGF0ZSBzdHJpbmc6ICc8ZGl2PjxzcGFuPnt7bXNnfX08L3NwYW4+PC9kaXY+J1xuICAgKiBAcGFyYW0ge0Jvb2xlYW59IHNob3VsZENsb25lXG4gICAqIEBwYXJhbSB7Qm9vbGVhbn0gcmF3XG4gICAqICAgICAgICBpbmxpbmUgSFRNTCBpbnRlcnBvbGF0aW9uLiBEbyBub3QgY2hlY2sgZm9yIGlkXG4gICAqICAgICAgICBzZWxlY3RvciBhbmQga2VlcCB3aGl0ZXNwYWNlIGluIHRoZSBzdHJpbmcuXG4gICAqIEByZXR1cm4ge0RvY3VtZW50RnJhZ21lbnR8dW5kZWZpbmVkfVxuICAgKi9cblxuICBmdW5jdGlvbiBwYXJzZVRlbXBsYXRlKHRlbXBsYXRlLCBzaG91bGRDbG9uZSwgcmF3KSB7XG4gICAgdmFyIG5vZGUsIGZyYWc7XG5cbiAgICAvLyBpZiB0aGUgdGVtcGxhdGUgaXMgYWxyZWFkeSBhIGRvY3VtZW50IGZyYWdtZW50LFxuICAgIC8vIGRvIG5vdGhpbmdcbiAgICBpZiAoaXNGcmFnbWVudCh0ZW1wbGF0ZSkpIHtcbiAgICAgIHRyaW1Ob2RlKHRlbXBsYXRlKTtcbiAgICAgIHJldHVybiBzaG91bGRDbG9uZSA/IGNsb25lTm9kZSh0ZW1wbGF0ZSkgOiB0ZW1wbGF0ZTtcbiAgICB9XG5cbiAgICBpZiAodHlwZW9mIHRlbXBsYXRlID09PSAnc3RyaW5nJykge1xuICAgICAgLy8gaWQgc2VsZWN0b3JcbiAgICAgIGlmICghcmF3ICYmIHRlbXBsYXRlLmNoYXJBdCgwKSA9PT0gJyMnKSB7XG4gICAgICAgIC8vIGlkIHNlbGVjdG9yIGNhbiBiZSBjYWNoZWQgdG9vXG4gICAgICAgIGZyYWcgPSBpZFNlbGVjdG9yQ2FjaGUuZ2V0KHRlbXBsYXRlKTtcbiAgICAgICAgaWYgKCFmcmFnKSB7XG4gICAgICAgICAgbm9kZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHRlbXBsYXRlLnNsaWNlKDEpKTtcbiAgICAgICAgICBpZiAobm9kZSkge1xuICAgICAgICAgICAgZnJhZyA9IG5vZGVUb0ZyYWdtZW50KG5vZGUpO1xuICAgICAgICAgICAgLy8gc2F2ZSBzZWxlY3RvciB0byBjYWNoZVxuICAgICAgICAgICAgaWRTZWxlY3RvckNhY2hlLnB1dCh0ZW1wbGF0ZSwgZnJhZyk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvLyBub3JtYWwgc3RyaW5nIHRlbXBsYXRlXG4gICAgICAgIGZyYWcgPSBzdHJpbmdUb0ZyYWdtZW50KHRlbXBsYXRlLCByYXcpO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAodGVtcGxhdGUubm9kZVR5cGUpIHtcbiAgICAgIC8vIGEgZGlyZWN0IG5vZGVcbiAgICAgIGZyYWcgPSBub2RlVG9GcmFnbWVudCh0ZW1wbGF0ZSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGZyYWcgJiYgc2hvdWxkQ2xvbmUgPyBjbG9uZU5vZGUoZnJhZykgOiBmcmFnO1xuICB9XG5cbnZhciB0ZW1wbGF0ZSA9IE9iamVjdC5mcmVlemUoe1xuICAgIGNsb25lTm9kZTogY2xvbmVOb2RlLFxuICAgIHBhcnNlVGVtcGxhdGU6IHBhcnNlVGVtcGxhdGVcbiAgfSk7XG5cbiAgdmFyIGh0bWwgPSB7XG5cbiAgICBiaW5kOiBmdW5jdGlvbiBiaW5kKCkge1xuICAgICAgLy8gYSBjb21tZW50IG5vZGUgbWVhbnMgdGhpcyBpcyBhIGJpbmRpbmcgZm9yXG4gICAgICAvLyB7e3sgaW5saW5lIHVuZXNjYXBlZCBodG1sIH19fVxuICAgICAgaWYgKHRoaXMuZWwubm9kZVR5cGUgPT09IDgpIHtcbiAgICAgICAgLy8gaG9sZCBub2Rlc1xuICAgICAgICB0aGlzLm5vZGVzID0gW107XG4gICAgICAgIC8vIHJlcGxhY2UgdGhlIHBsYWNlaG9sZGVyIHdpdGggcHJvcGVyIGFuY2hvclxuICAgICAgICB0aGlzLmFuY2hvciA9IGNyZWF0ZUFuY2hvcigndi1odG1sJyk7XG4gICAgICAgIHJlcGxhY2UodGhpcy5lbCwgdGhpcy5hbmNob3IpO1xuICAgICAgfVxuICAgIH0sXG5cbiAgICB1cGRhdGU6IGZ1bmN0aW9uIHVwZGF0ZSh2YWx1ZSkge1xuICAgICAgdmFsdWUgPSBfdG9TdHJpbmcodmFsdWUpO1xuICAgICAgaWYgKHRoaXMubm9kZXMpIHtcbiAgICAgICAgdGhpcy5zd2FwKHZhbHVlKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuZWwuaW5uZXJIVE1MID0gdmFsdWU7XG4gICAgICB9XG4gICAgfSxcblxuICAgIHN3YXA6IGZ1bmN0aW9uIHN3YXAodmFsdWUpIHtcbiAgICAgIC8vIHJlbW92ZSBvbGQgbm9kZXNcbiAgICAgIHZhciBpID0gdGhpcy5ub2Rlcy5sZW5ndGg7XG4gICAgICB3aGlsZSAoaS0tKSB7XG4gICAgICAgIHJlbW92ZSh0aGlzLm5vZGVzW2ldKTtcbiAgICAgIH1cbiAgICAgIC8vIGNvbnZlcnQgbmV3IHZhbHVlIHRvIGEgZnJhZ21lbnRcbiAgICAgIC8vIGRvIG5vdCBhdHRlbXB0IHRvIHJldHJpZXZlIGZyb20gaWQgc2VsZWN0b3JcbiAgICAgIHZhciBmcmFnID0gcGFyc2VUZW1wbGF0ZSh2YWx1ZSwgdHJ1ZSwgdHJ1ZSk7XG4gICAgICAvLyBzYXZlIGEgcmVmZXJlbmNlIHRvIHRoZXNlIG5vZGVzIHNvIHdlIGNhbiByZW1vdmUgbGF0ZXJcbiAgICAgIHRoaXMubm9kZXMgPSB0b0FycmF5KGZyYWcuY2hpbGROb2Rlcyk7XG4gICAgICBiZWZvcmUoZnJhZywgdGhpcy5hbmNob3IpO1xuICAgIH1cbiAgfTtcblxuICAvKipcbiAgICogQWJzdHJhY3Rpb24gZm9yIGEgcGFydGlhbGx5LWNvbXBpbGVkIGZyYWdtZW50LlxuICAgKiBDYW4gb3B0aW9uYWxseSBjb21waWxlIGNvbnRlbnQgd2l0aCBhIGNoaWxkIHNjb3BlLlxuICAgKlxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBsaW5rZXJcbiAgICogQHBhcmFtIHtWdWV9IHZtXG4gICAqIEBwYXJhbSB7RG9jdW1lbnRGcmFnbWVudH0gZnJhZ1xuICAgKiBAcGFyYW0ge1Z1ZX0gW2hvc3RdXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBbc2NvcGVdXG4gICAqIEBwYXJhbSB7RnJhZ21lbnR9IFtwYXJlbnRGcmFnXVxuICAgKi9cbiAgZnVuY3Rpb24gRnJhZ21lbnQobGlua2VyLCB2bSwgZnJhZywgaG9zdCwgc2NvcGUsIHBhcmVudEZyYWcpIHtcbiAgICB0aGlzLmNoaWxkcmVuID0gW107XG4gICAgdGhpcy5jaGlsZEZyYWdzID0gW107XG4gICAgdGhpcy52bSA9IHZtO1xuICAgIHRoaXMuc2NvcGUgPSBzY29wZTtcbiAgICB0aGlzLmluc2VydGVkID0gZmFsc2U7XG4gICAgdGhpcy5wYXJlbnRGcmFnID0gcGFyZW50RnJhZztcbiAgICBpZiAocGFyZW50RnJhZykge1xuICAgICAgcGFyZW50RnJhZy5jaGlsZEZyYWdzLnB1c2godGhpcyk7XG4gICAgfVxuICAgIHRoaXMudW5saW5rID0gbGlua2VyKHZtLCBmcmFnLCBob3N0LCBzY29wZSwgdGhpcyk7XG4gICAgdmFyIHNpbmdsZSA9IHRoaXMuc2luZ2xlID0gZnJhZy5jaGlsZE5vZGVzLmxlbmd0aCA9PT0gMSAmJlxuICAgIC8vIGRvIG5vdCBnbyBzaW5nbGUgbW9kZSBpZiB0aGUgb25seSBub2RlIGlzIGFuIGFuY2hvclxuICAgICFmcmFnLmNoaWxkTm9kZXNbMF0uX192X2FuY2hvcjtcbiAgICBpZiAoc2luZ2xlKSB7XG4gICAgICB0aGlzLm5vZGUgPSBmcmFnLmNoaWxkTm9kZXNbMF07XG4gICAgICB0aGlzLmJlZm9yZSA9IHNpbmdsZUJlZm9yZTtcbiAgICAgIHRoaXMucmVtb3ZlID0gc2luZ2xlUmVtb3ZlO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLm5vZGUgPSBjcmVhdGVBbmNob3IoJ2ZyYWdtZW50LXN0YXJ0Jyk7XG4gICAgICB0aGlzLmVuZCA9IGNyZWF0ZUFuY2hvcignZnJhZ21lbnQtZW5kJyk7XG4gICAgICB0aGlzLmZyYWcgPSBmcmFnO1xuICAgICAgcHJlcGVuZCh0aGlzLm5vZGUsIGZyYWcpO1xuICAgICAgZnJhZy5hcHBlbmRDaGlsZCh0aGlzLmVuZCk7XG4gICAgICB0aGlzLmJlZm9yZSA9IG11bHRpQmVmb3JlO1xuICAgICAgdGhpcy5yZW1vdmUgPSBtdWx0aVJlbW92ZTtcbiAgICB9XG4gICAgdGhpcy5ub2RlLl9fdl9mcmFnID0gdGhpcztcbiAgfVxuXG4gIC8qKlxuICAgKiBDYWxsIGF0dGFjaC9kZXRhY2ggZm9yIGFsbCBjb21wb25lbnRzIGNvbnRhaW5lZCB3aXRoaW5cbiAgICogdGhpcyBmcmFnbWVudC4gQWxzbyBkbyBzbyByZWN1cnNpdmVseSBmb3IgYWxsIGNoaWxkXG4gICAqIGZyYWdtZW50cy5cbiAgICpcbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gaG9va1xuICAgKi9cblxuICBGcmFnbWVudC5wcm90b3R5cGUuY2FsbEhvb2sgPSBmdW5jdGlvbiAoaG9vaykge1xuICAgIHZhciBpLCBsO1xuICAgIGZvciAoaSA9IDAsIGwgPSB0aGlzLmNoaWxkRnJhZ3MubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG4gICAgICB0aGlzLmNoaWxkRnJhZ3NbaV0uY2FsbEhvb2soaG9vayk7XG4gICAgfVxuICAgIGZvciAoaSA9IDAsIGwgPSB0aGlzLmNoaWxkcmVuLmxlbmd0aDsgaSA8IGw7IGkrKykge1xuICAgICAgaG9vayh0aGlzLmNoaWxkcmVuW2ldKTtcbiAgICB9XG4gIH07XG5cbiAgLyoqXG4gICAqIEluc2VydCBmcmFnbWVudCBiZWZvcmUgdGFyZ2V0LCBzaW5nbGUgbm9kZSB2ZXJzaW9uXG4gICAqXG4gICAqIEBwYXJhbSB7Tm9kZX0gdGFyZ2V0XG4gICAqIEBwYXJhbSB7Qm9vbGVhbn0gd2l0aFRyYW5zaXRpb25cbiAgICovXG5cbiAgZnVuY3Rpb24gc2luZ2xlQmVmb3JlKHRhcmdldCwgd2l0aFRyYW5zaXRpb24pIHtcbiAgICB0aGlzLmluc2VydGVkID0gdHJ1ZTtcbiAgICB2YXIgbWV0aG9kID0gd2l0aFRyYW5zaXRpb24gIT09IGZhbHNlID8gYmVmb3JlV2l0aFRyYW5zaXRpb24gOiBiZWZvcmU7XG4gICAgbWV0aG9kKHRoaXMubm9kZSwgdGFyZ2V0LCB0aGlzLnZtKTtcbiAgICBpZiAoaW5Eb2ModGhpcy5ub2RlKSkge1xuICAgICAgdGhpcy5jYWxsSG9vayhhdHRhY2gpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBSZW1vdmUgZnJhZ21lbnQsIHNpbmdsZSBub2RlIHZlcnNpb25cbiAgICovXG5cbiAgZnVuY3Rpb24gc2luZ2xlUmVtb3ZlKCkge1xuICAgIHRoaXMuaW5zZXJ0ZWQgPSBmYWxzZTtcbiAgICB2YXIgc2hvdWxkQ2FsbFJlbW92ZSA9IGluRG9jKHRoaXMubm9kZSk7XG4gICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgIHRoaXMuYmVmb3JlUmVtb3ZlKCk7XG4gICAgcmVtb3ZlV2l0aFRyYW5zaXRpb24odGhpcy5ub2RlLCB0aGlzLnZtLCBmdW5jdGlvbiAoKSB7XG4gICAgICBpZiAoc2hvdWxkQ2FsbFJlbW92ZSkge1xuICAgICAgICBzZWxmLmNhbGxIb29rKGRldGFjaCk7XG4gICAgICB9XG4gICAgICBzZWxmLmRlc3Ryb3koKTtcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBJbnNlcnQgZnJhZ21lbnQgYmVmb3JlIHRhcmdldCwgbXVsdGktbm9kZXMgdmVyc2lvblxuICAgKlxuICAgKiBAcGFyYW0ge05vZGV9IHRhcmdldFxuICAgKiBAcGFyYW0ge0Jvb2xlYW59IHdpdGhUcmFuc2l0aW9uXG4gICAqL1xuXG4gIGZ1bmN0aW9uIG11bHRpQmVmb3JlKHRhcmdldCwgd2l0aFRyYW5zaXRpb24pIHtcbiAgICB0aGlzLmluc2VydGVkID0gdHJ1ZTtcbiAgICB2YXIgdm0gPSB0aGlzLnZtO1xuICAgIHZhciBtZXRob2QgPSB3aXRoVHJhbnNpdGlvbiAhPT0gZmFsc2UgPyBiZWZvcmVXaXRoVHJhbnNpdGlvbiA6IGJlZm9yZTtcbiAgICBtYXBOb2RlUmFuZ2UodGhpcy5ub2RlLCB0aGlzLmVuZCwgZnVuY3Rpb24gKG5vZGUpIHtcbiAgICAgIG1ldGhvZChub2RlLCB0YXJnZXQsIHZtKTtcbiAgICB9KTtcbiAgICBpZiAoaW5Eb2ModGhpcy5ub2RlKSkge1xuICAgICAgdGhpcy5jYWxsSG9vayhhdHRhY2gpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBSZW1vdmUgZnJhZ21lbnQsIG11bHRpLW5vZGVzIHZlcnNpb25cbiAgICovXG5cbiAgZnVuY3Rpb24gbXVsdGlSZW1vdmUoKSB7XG4gICAgdGhpcy5pbnNlcnRlZCA9IGZhbHNlO1xuICAgIHZhciBzZWxmID0gdGhpcztcbiAgICB2YXIgc2hvdWxkQ2FsbFJlbW92ZSA9IGluRG9jKHRoaXMubm9kZSk7XG4gICAgdGhpcy5iZWZvcmVSZW1vdmUoKTtcbiAgICByZW1vdmVOb2RlUmFuZ2UodGhpcy5ub2RlLCB0aGlzLmVuZCwgdGhpcy52bSwgdGhpcy5mcmFnLCBmdW5jdGlvbiAoKSB7XG4gICAgICBpZiAoc2hvdWxkQ2FsbFJlbW92ZSkge1xuICAgICAgICBzZWxmLmNhbGxIb29rKGRldGFjaCk7XG4gICAgICB9XG4gICAgICBzZWxmLmRlc3Ryb3koKTtcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBQcmVwYXJlIHRoZSBmcmFnbWVudCBmb3IgcmVtb3ZhbC5cbiAgICovXG5cbiAgRnJhZ21lbnQucHJvdG90eXBlLmJlZm9yZVJlbW92ZSA9IGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgaSwgbDtcbiAgICBmb3IgKGkgPSAwLCBsID0gdGhpcy5jaGlsZEZyYWdzLmxlbmd0aDsgaSA8IGw7IGkrKykge1xuICAgICAgLy8gY2FsbCB0aGUgc2FtZSBtZXRob2QgcmVjdXJzaXZlbHkgb24gY2hpbGRcbiAgICAgIC8vIGZyYWdtZW50cywgZGVwdGgtZmlyc3RcbiAgICAgIHRoaXMuY2hpbGRGcmFnc1tpXS5iZWZvcmVSZW1vdmUoZmFsc2UpO1xuICAgIH1cbiAgICBmb3IgKGkgPSAwLCBsID0gdGhpcy5jaGlsZHJlbi5sZW5ndGg7IGkgPCBsOyBpKyspIHtcbiAgICAgIC8vIENhbGwgZGVzdHJveSBmb3IgYWxsIGNvbnRhaW5lZCBpbnN0YW5jZXMsXG4gICAgICAvLyB3aXRoIHJlbW92ZTpmYWxzZSBhbmQgZGVmZXI6dHJ1ZS5cbiAgICAgIC8vIERlZmVyIGlzIG5lY2Vzc2FyeSBiZWNhdXNlIHdlIG5lZWQgdG9cbiAgICAgIC8vIGtlZXAgdGhlIGNoaWxkcmVuIHRvIGNhbGwgZGV0YWNoIGhvb2tzXG4gICAgICAvLyBvbiB0aGVtLlxuICAgICAgdGhpcy5jaGlsZHJlbltpXS4kZGVzdHJveShmYWxzZSwgdHJ1ZSk7XG4gICAgfVxuICAgIHZhciBkaXJzID0gdGhpcy51bmxpbmsuZGlycztcbiAgICBmb3IgKGkgPSAwLCBsID0gZGlycy5sZW5ndGg7IGkgPCBsOyBpKyspIHtcbiAgICAgIC8vIGRpc2FibGUgdGhlIHdhdGNoZXJzIG9uIGFsbCB0aGUgZGlyZWN0aXZlc1xuICAgICAgLy8gc28gdGhhdCB0aGUgcmVuZGVyZWQgY29udGVudCBzdGF5cyB0aGUgc2FtZVxuICAgICAgLy8gZHVyaW5nIHJlbW92YWwuXG4gICAgICBkaXJzW2ldLl93YXRjaGVyICYmIGRpcnNbaV0uX3dhdGNoZXIudGVhcmRvd24oKTtcbiAgICB9XG4gIH07XG5cbiAgLyoqXG4gICAqIERlc3Ryb3kgdGhlIGZyYWdtZW50LlxuICAgKi9cblxuICBGcmFnbWVudC5wcm90b3R5cGUuZGVzdHJveSA9IGZ1bmN0aW9uICgpIHtcbiAgICBpZiAodGhpcy5wYXJlbnRGcmFnKSB7XG4gICAgICB0aGlzLnBhcmVudEZyYWcuY2hpbGRGcmFncy4kcmVtb3ZlKHRoaXMpO1xuICAgIH1cbiAgICB0aGlzLm5vZGUuX192X2ZyYWcgPSBudWxsO1xuICAgIHRoaXMudW5saW5rKCk7XG4gIH07XG5cbiAgLyoqXG4gICAqIENhbGwgYXR0YWNoIGhvb2sgZm9yIGEgVnVlIGluc3RhbmNlLlxuICAgKlxuICAgKiBAcGFyYW0ge1Z1ZX0gY2hpbGRcbiAgICovXG5cbiAgZnVuY3Rpb24gYXR0YWNoKGNoaWxkKSB7XG4gICAgaWYgKCFjaGlsZC5faXNBdHRhY2hlZCAmJiBpbkRvYyhjaGlsZC4kZWwpKSB7XG4gICAgICBjaGlsZC5fY2FsbEhvb2soJ2F0dGFjaGVkJyk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIENhbGwgZGV0YWNoIGhvb2sgZm9yIGEgVnVlIGluc3RhbmNlLlxuICAgKlxuICAgKiBAcGFyYW0ge1Z1ZX0gY2hpbGRcbiAgICovXG5cbiAgZnVuY3Rpb24gZGV0YWNoKGNoaWxkKSB7XG4gICAgaWYgKGNoaWxkLl9pc0F0dGFjaGVkICYmICFpbkRvYyhjaGlsZC4kZWwpKSB7XG4gICAgICBjaGlsZC5fY2FsbEhvb2soJ2RldGFjaGVkJyk7XG4gICAgfVxuICB9XG5cbiAgdmFyIGxpbmtlckNhY2hlID0gbmV3IENhY2hlKDUwMDApO1xuXG4gIC8qKlxuICAgKiBBIGZhY3RvcnkgdGhhdCBjYW4gYmUgdXNlZCB0byBjcmVhdGUgaW5zdGFuY2VzIG9mIGFcbiAgICogZnJhZ21lbnQuIENhY2hlcyB0aGUgY29tcGlsZWQgbGlua2VyIGlmIHBvc3NpYmxlLlxuICAgKlxuICAgKiBAcGFyYW0ge1Z1ZX0gdm1cbiAgICogQHBhcmFtIHtFbGVtZW50fFN0cmluZ30gZWxcbiAgICovXG4gIGZ1bmN0aW9uIEZyYWdtZW50RmFjdG9yeSh2bSwgZWwpIHtcbiAgICB0aGlzLnZtID0gdm07XG4gICAgdmFyIHRlbXBsYXRlO1xuICAgIHZhciBpc1N0cmluZyA9IHR5cGVvZiBlbCA9PT0gJ3N0cmluZyc7XG4gICAgaWYgKGlzU3RyaW5nIHx8IGlzVGVtcGxhdGUoZWwpICYmICFlbC5oYXNBdHRyaWJ1dGUoJ3YtaWYnKSkge1xuICAgICAgdGVtcGxhdGUgPSBwYXJzZVRlbXBsYXRlKGVsLCB0cnVlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGVtcGxhdGUgPSBkb2N1bWVudC5jcmVhdGVEb2N1bWVudEZyYWdtZW50KCk7XG4gICAgICB0ZW1wbGF0ZS5hcHBlbmRDaGlsZChlbCk7XG4gICAgfVxuICAgIHRoaXMudGVtcGxhdGUgPSB0ZW1wbGF0ZTtcbiAgICAvLyBsaW5rZXIgY2FuIGJlIGNhY2hlZCwgYnV0IG9ubHkgZm9yIGNvbXBvbmVudHNcbiAgICB2YXIgbGlua2VyO1xuICAgIHZhciBjaWQgPSB2bS5jb25zdHJ1Y3Rvci5jaWQ7XG4gICAgaWYgKGNpZCA+IDApIHtcbiAgICAgIHZhciBjYWNoZUlkID0gY2lkICsgKGlzU3RyaW5nID8gZWwgOiBnZXRPdXRlckhUTUwoZWwpKTtcbiAgICAgIGxpbmtlciA9IGxpbmtlckNhY2hlLmdldChjYWNoZUlkKTtcbiAgICAgIGlmICghbGlua2VyKSB7XG4gICAgICAgIGxpbmtlciA9IGNvbXBpbGUodGVtcGxhdGUsIHZtLiRvcHRpb25zLCB0cnVlKTtcbiAgICAgICAgbGlua2VyQ2FjaGUucHV0KGNhY2hlSWQsIGxpbmtlcik7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGxpbmtlciA9IGNvbXBpbGUodGVtcGxhdGUsIHZtLiRvcHRpb25zLCB0cnVlKTtcbiAgICB9XG4gICAgdGhpcy5saW5rZXIgPSBsaW5rZXI7XG4gIH1cblxuICAvKipcbiAgICogQ3JlYXRlIGEgZnJhZ21lbnQgaW5zdGFuY2Ugd2l0aCBnaXZlbiBob3N0IGFuZCBzY29wZS5cbiAgICpcbiAgICogQHBhcmFtIHtWdWV9IGhvc3RcbiAgICogQHBhcmFtIHtPYmplY3R9IHNjb3BlXG4gICAqIEBwYXJhbSB7RnJhZ21lbnR9IHBhcmVudEZyYWdcbiAgICovXG5cbiAgRnJhZ21lbnRGYWN0b3J5LnByb3RvdHlwZS5jcmVhdGUgPSBmdW5jdGlvbiAoaG9zdCwgc2NvcGUsIHBhcmVudEZyYWcpIHtcbiAgICB2YXIgZnJhZyA9IGNsb25lTm9kZSh0aGlzLnRlbXBsYXRlKTtcbiAgICByZXR1cm4gbmV3IEZyYWdtZW50KHRoaXMubGlua2VyLCB0aGlzLnZtLCBmcmFnLCBob3N0LCBzY29wZSwgcGFyZW50RnJhZyk7XG4gIH07XG5cbiAgdmFyIE9OID0gNzAwO1xuICB2YXIgTU9ERUwgPSA4MDA7XG4gIHZhciBCSU5EID0gODUwO1xuICB2YXIgVFJBTlNJVElPTiA9IDExMDA7XG4gIHZhciBFTCA9IDE1MDA7XG4gIHZhciBDT01QT05FTlQgPSAxNTAwO1xuICB2YXIgUEFSVElBTCA9IDE3NTA7XG4gIHZhciBJRiA9IDIxMDA7XG4gIHZhciBGT1IgPSAyMjAwO1xuICB2YXIgU0xPVCA9IDIzMDA7XG5cbiAgdmFyIHVpZCQzID0gMDtcblxuICB2YXIgdkZvciA9IHtcblxuICAgIHByaW9yaXR5OiBGT1IsXG4gICAgdGVybWluYWw6IHRydWUsXG5cbiAgICBwYXJhbXM6IFsndHJhY2stYnknLCAnc3RhZ2dlcicsICdlbnRlci1zdGFnZ2VyJywgJ2xlYXZlLXN0YWdnZXInXSxcblxuICAgIGJpbmQ6IGZ1bmN0aW9uIGJpbmQoKSB7XG4gICAgICAvLyBzdXBwb3J0IFwiaXRlbSBpbi9vZiBpdGVtc1wiIHN5bnRheFxuICAgICAgdmFyIGluTWF0Y2ggPSB0aGlzLmV4cHJlc3Npb24ubWF0Y2goLyguKikgKD86aW58b2YpICguKikvKTtcbiAgICAgIGlmIChpbk1hdGNoKSB7XG4gICAgICAgIHZhciBpdE1hdGNoID0gaW5NYXRjaFsxXS5tYXRjaCgvXFwoKC4qKSwoLiopXFwpLyk7XG4gICAgICAgIGlmIChpdE1hdGNoKSB7XG4gICAgICAgICAgdGhpcy5pdGVyYXRvciA9IGl0TWF0Y2hbMV0udHJpbSgpO1xuICAgICAgICAgIHRoaXMuYWxpYXMgPSBpdE1hdGNoWzJdLnRyaW0oKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aGlzLmFsaWFzID0gaW5NYXRjaFsxXS50cmltKCk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5leHByZXNzaW9uID0gaW5NYXRjaFsyXTtcbiAgICAgIH1cblxuICAgICAgaWYgKCF0aGlzLmFsaWFzKSB7XG4gICAgICAgICdkZXZlbG9wbWVudCcgIT09ICdwcm9kdWN0aW9uJyAmJiB3YXJuKCdJbnZhbGlkIHYtZm9yIGV4cHJlc3Npb24gXCInICsgdGhpcy5kZXNjcmlwdG9yLnJhdyArICdcIjogJyArICdhbGlhcyBpcyByZXF1aXJlZC4nLCB0aGlzLnZtKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICAvLyB1aWQgYXMgYSBjYWNoZSBpZGVudGlmaWVyXG4gICAgICB0aGlzLmlkID0gJ19fdi1mb3JfXycgKyArK3VpZCQzO1xuXG4gICAgICAvLyBjaGVjayBpZiB0aGlzIGlzIGFuIG9wdGlvbiBsaXN0LFxuICAgICAgLy8gc28gdGhhdCB3ZSBrbm93IGlmIHdlIG5lZWQgdG8gdXBkYXRlIHRoZSA8c2VsZWN0PidzXG4gICAgICAvLyB2LW1vZGVsIHdoZW4gdGhlIG9wdGlvbiBsaXN0IGhhcyBjaGFuZ2VkLlxuICAgICAgLy8gYmVjYXVzZSB2LW1vZGVsIGhhcyBhIGxvd2VyIHByaW9yaXR5IHRoYW4gdi1mb3IsXG4gICAgICAvLyB0aGUgdi1tb2RlbCBpcyBub3QgYm91bmQgaGVyZSB5ZXQsIHNvIHdlIGhhdmUgdG9cbiAgICAgIC8vIHJldHJpdmUgaXQgaW4gdGhlIGFjdHVhbCB1cGRhdGVNb2RlbCgpIGZ1bmN0aW9uLlxuICAgICAgdmFyIHRhZyA9IHRoaXMuZWwudGFnTmFtZTtcbiAgICAgIHRoaXMuaXNPcHRpb24gPSAodGFnID09PSAnT1BUSU9OJyB8fCB0YWcgPT09ICdPUFRHUk9VUCcpICYmIHRoaXMuZWwucGFyZW50Tm9kZS50YWdOYW1lID09PSAnU0VMRUNUJztcblxuICAgICAgLy8gc2V0dXAgYW5jaG9yIG5vZGVzXG4gICAgICB0aGlzLnN0YXJ0ID0gY3JlYXRlQW5jaG9yKCd2LWZvci1zdGFydCcpO1xuICAgICAgdGhpcy5lbmQgPSBjcmVhdGVBbmNob3IoJ3YtZm9yLWVuZCcpO1xuICAgICAgcmVwbGFjZSh0aGlzLmVsLCB0aGlzLmVuZCk7XG4gICAgICBiZWZvcmUodGhpcy5zdGFydCwgdGhpcy5lbmQpO1xuXG4gICAgICAvLyBjYWNoZVxuICAgICAgdGhpcy5jYWNoZSA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG5cbiAgICAgIC8vIGZyYWdtZW50IGZhY3RvcnlcbiAgICAgIHRoaXMuZmFjdG9yeSA9IG5ldyBGcmFnbWVudEZhY3RvcnkodGhpcy52bSwgdGhpcy5lbCk7XG4gICAgfSxcblxuICAgIHVwZGF0ZTogZnVuY3Rpb24gdXBkYXRlKGRhdGEpIHtcbiAgICAgIHRoaXMuZGlmZihkYXRhKTtcbiAgICAgIHRoaXMudXBkYXRlUmVmKCk7XG4gICAgICB0aGlzLnVwZGF0ZU1vZGVsKCk7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIERpZmYsIGJhc2VkIG9uIG5ldyBkYXRhIGFuZCBvbGQgZGF0YSwgZGV0ZXJtaW5lIHRoZVxuICAgICAqIG1pbmltdW0gYW1vdW50IG9mIERPTSBtYW5pcHVsYXRpb25zIG5lZWRlZCB0byBtYWtlIHRoZVxuICAgICAqIERPTSByZWZsZWN0IHRoZSBuZXcgZGF0YSBBcnJheS5cbiAgICAgKlxuICAgICAqIFRoZSBhbGdvcml0aG0gZGlmZnMgdGhlIG5ldyBkYXRhIEFycmF5IGJ5IHN0b3JpbmcgYVxuICAgICAqIGhpZGRlbiByZWZlcmVuY2UgdG8gYW4gb3duZXIgdm0gaW5zdGFuY2Ugb24gcHJldmlvdXNseVxuICAgICAqIHNlZW4gZGF0YS4gVGhpcyBhbGxvd3MgdXMgdG8gYWNoaWV2ZSBPKG4pIHdoaWNoIGlzXG4gICAgICogYmV0dGVyIHRoYW4gYSBsZXZlbnNodGVpbiBkaXN0YW5jZSBiYXNlZCBhbGdvcml0aG0sXG4gICAgICogd2hpY2ggaXMgTyhtICogbikuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge0FycmF5fSBkYXRhXG4gICAgICovXG5cbiAgICBkaWZmOiBmdW5jdGlvbiBkaWZmKGRhdGEpIHtcbiAgICAgIC8vIGNoZWNrIGlmIHRoZSBBcnJheSB3YXMgY29udmVydGVkIGZyb20gYW4gT2JqZWN0XG4gICAgICB2YXIgaXRlbSA9IGRhdGFbMF07XG4gICAgICB2YXIgY29udmVydGVkRnJvbU9iamVjdCA9IHRoaXMuZnJvbU9iamVjdCA9IGlzT2JqZWN0KGl0ZW0pICYmIGhhc093bihpdGVtLCAnJGtleScpICYmIGhhc093bihpdGVtLCAnJHZhbHVlJyk7XG5cbiAgICAgIHZhciB0cmFja0J5S2V5ID0gdGhpcy5wYXJhbXMudHJhY2tCeTtcbiAgICAgIHZhciBvbGRGcmFncyA9IHRoaXMuZnJhZ3M7XG4gICAgICB2YXIgZnJhZ3MgPSB0aGlzLmZyYWdzID0gbmV3IEFycmF5KGRhdGEubGVuZ3RoKTtcbiAgICAgIHZhciBhbGlhcyA9IHRoaXMuYWxpYXM7XG4gICAgICB2YXIgaXRlcmF0b3IgPSB0aGlzLml0ZXJhdG9yO1xuICAgICAgdmFyIHN0YXJ0ID0gdGhpcy5zdGFydDtcbiAgICAgIHZhciBlbmQgPSB0aGlzLmVuZDtcbiAgICAgIHZhciBpbkRvY3VtZW50ID0gaW5Eb2Moc3RhcnQpO1xuICAgICAgdmFyIGluaXQgPSAhb2xkRnJhZ3M7XG4gICAgICB2YXIgaSwgbCwgZnJhZywga2V5LCB2YWx1ZSwgcHJpbWl0aXZlO1xuXG4gICAgICAvLyBGaXJzdCBwYXNzLCBnbyB0aHJvdWdoIHRoZSBuZXcgQXJyYXkgYW5kIGZpbGwgdXBcbiAgICAgIC8vIHRoZSBuZXcgZnJhZ3MgYXJyYXkuIElmIGEgcGllY2Ugb2YgZGF0YSBoYXMgYSBjYWNoZWRcbiAgICAgIC8vIGluc3RhbmNlIGZvciBpdCwgd2UgcmV1c2UgaXQuIE90aGVyd2lzZSBidWlsZCBhIG5ld1xuICAgICAgLy8gaW5zdGFuY2UuXG4gICAgICBmb3IgKGkgPSAwLCBsID0gZGF0YS5sZW5ndGg7IGkgPCBsOyBpKyspIHtcbiAgICAgICAgaXRlbSA9IGRhdGFbaV07XG4gICAgICAgIGtleSA9IGNvbnZlcnRlZEZyb21PYmplY3QgPyBpdGVtLiRrZXkgOiBudWxsO1xuICAgICAgICB2YWx1ZSA9IGNvbnZlcnRlZEZyb21PYmplY3QgPyBpdGVtLiR2YWx1ZSA6IGl0ZW07XG4gICAgICAgIHByaW1pdGl2ZSA9ICFpc09iamVjdCh2YWx1ZSk7XG4gICAgICAgIGZyYWcgPSAhaW5pdCAmJiB0aGlzLmdldENhY2hlZEZyYWcodmFsdWUsIGksIGtleSk7XG4gICAgICAgIGlmIChmcmFnKSB7XG4gICAgICAgICAgLy8gcmV1c2FibGUgZnJhZ21lbnRcbiAgICAgICAgICBmcmFnLnJldXNlZCA9IHRydWU7XG4gICAgICAgICAgLy8gdXBkYXRlICRpbmRleFxuICAgICAgICAgIGZyYWcuc2NvcGUuJGluZGV4ID0gaTtcbiAgICAgICAgICAvLyB1cGRhdGUgJGtleVxuICAgICAgICAgIGlmIChrZXkpIHtcbiAgICAgICAgICAgIGZyYWcuc2NvcGUuJGtleSA9IGtleTtcbiAgICAgICAgICB9XG4gICAgICAgICAgLy8gdXBkYXRlIGl0ZXJhdG9yXG4gICAgICAgICAgaWYgKGl0ZXJhdG9yKSB7XG4gICAgICAgICAgICBmcmFnLnNjb3BlW2l0ZXJhdG9yXSA9IGtleSAhPT0gbnVsbCA/IGtleSA6IGk7XG4gICAgICAgICAgfVxuICAgICAgICAgIC8vIHVwZGF0ZSBkYXRhIGZvciB0cmFjay1ieSwgb2JqZWN0IHJlcGVhdCAmXG4gICAgICAgICAgLy8gcHJpbWl0aXZlIHZhbHVlcy5cbiAgICAgICAgICBpZiAodHJhY2tCeUtleSB8fCBjb252ZXJ0ZWRGcm9tT2JqZWN0IHx8IHByaW1pdGl2ZSkge1xuICAgICAgICAgICAgd2l0aG91dENvbnZlcnNpb24oZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICBmcmFnLnNjb3BlW2FsaWFzXSA9IHZhbHVlO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIC8vIG5ldyBpc250YW5jZVxuICAgICAgICAgIGZyYWcgPSB0aGlzLmNyZWF0ZSh2YWx1ZSwgYWxpYXMsIGksIGtleSk7XG4gICAgICAgICAgZnJhZy5mcmVzaCA9ICFpbml0O1xuICAgICAgICB9XG4gICAgICAgIGZyYWdzW2ldID0gZnJhZztcbiAgICAgICAgaWYgKGluaXQpIHtcbiAgICAgICAgICBmcmFnLmJlZm9yZShlbmQpO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIC8vIHdlJ3JlIGRvbmUgZm9yIHRoZSBpbml0aWFsIHJlbmRlci5cbiAgICAgIGlmIChpbml0KSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgLy8gU2Vjb25kIHBhc3MsIGdvIHRocm91Z2ggdGhlIG9sZCBmcmFnbWVudHMgYW5kXG4gICAgICAvLyBkZXN0cm95IHRob3NlIHdobyBhcmUgbm90IHJldXNlZCAoYW5kIHJlbW92ZSB0aGVtXG4gICAgICAvLyBmcm9tIGNhY2hlKVxuICAgICAgdmFyIHJlbW92YWxJbmRleCA9IDA7XG4gICAgICB2YXIgdG90YWxSZW1vdmVkID0gb2xkRnJhZ3MubGVuZ3RoIC0gZnJhZ3MubGVuZ3RoO1xuICAgICAgLy8gd2hlbiByZW1vdmluZyBhIGxhcmdlIG51bWJlciBvZiBmcmFnbWVudHMsIHdhdGNoZXIgcmVtb3ZhbFxuICAgICAgLy8gdHVybnMgb3V0IHRvIGJlIGEgcGVyZiBib3R0bGVuZWNrLCBzbyB3ZSBiYXRjaCB0aGUgd2F0Y2hlclxuICAgICAgLy8gcmVtb3ZhbHMgaW50byBhIHNpbmdsZSBmaWx0ZXIgY2FsbCFcbiAgICAgIHRoaXMudm0uX3ZGb3JSZW1vdmluZyA9IHRydWU7XG4gICAgICBmb3IgKGkgPSAwLCBsID0gb2xkRnJhZ3MubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG4gICAgICAgIGZyYWcgPSBvbGRGcmFnc1tpXTtcbiAgICAgICAgaWYgKCFmcmFnLnJldXNlZCkge1xuICAgICAgICAgIHRoaXMuZGVsZXRlQ2FjaGVkRnJhZyhmcmFnKTtcbiAgICAgICAgICB0aGlzLnJlbW92ZShmcmFnLCByZW1vdmFsSW5kZXgrKywgdG90YWxSZW1vdmVkLCBpbkRvY3VtZW50KTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgdGhpcy52bS5fdkZvclJlbW92aW5nID0gZmFsc2U7XG4gICAgICBpZiAocmVtb3ZhbEluZGV4KSB7XG4gICAgICAgIHRoaXMudm0uX3dhdGNoZXJzID0gdGhpcy52bS5fd2F0Y2hlcnMuZmlsdGVyKGZ1bmN0aW9uICh3KSB7XG4gICAgICAgICAgcmV0dXJuIHcuYWN0aXZlO1xuICAgICAgICB9KTtcbiAgICAgIH1cblxuICAgICAgLy8gRmluYWwgcGFzcywgbW92ZS9pbnNlcnQgbmV3IGZyYWdtZW50cyBpbnRvIHRoZVxuICAgICAgLy8gcmlnaHQgcGxhY2UuXG4gICAgICB2YXIgdGFyZ2V0UHJldiwgcHJldkVsLCBjdXJyZW50UHJldjtcbiAgICAgIHZhciBpbnNlcnRpb25JbmRleCA9IDA7XG4gICAgICBmb3IgKGkgPSAwLCBsID0gZnJhZ3MubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG4gICAgICAgIGZyYWcgPSBmcmFnc1tpXTtcbiAgICAgICAgLy8gdGhpcyBpcyB0aGUgZnJhZyB0aGF0IHdlIHNob3VsZCBiZSBhZnRlclxuICAgICAgICB0YXJnZXRQcmV2ID0gZnJhZ3NbaSAtIDFdO1xuICAgICAgICBwcmV2RWwgPSB0YXJnZXRQcmV2ID8gdGFyZ2V0UHJldi5zdGFnZ2VyQ2IgPyB0YXJnZXRQcmV2LnN0YWdnZXJBbmNob3IgOiB0YXJnZXRQcmV2LmVuZCB8fCB0YXJnZXRQcmV2Lm5vZGUgOiBzdGFydDtcbiAgICAgICAgaWYgKGZyYWcucmV1c2VkICYmICFmcmFnLnN0YWdnZXJDYikge1xuICAgICAgICAgIGN1cnJlbnRQcmV2ID0gZmluZFByZXZGcmFnKGZyYWcsIHN0YXJ0LCB0aGlzLmlkKTtcbiAgICAgICAgICBpZiAoY3VycmVudFByZXYgIT09IHRhcmdldFByZXYgJiYgKCFjdXJyZW50UHJldiB8fFxuICAgICAgICAgIC8vIG9wdGltaXphdGlvbiBmb3IgbW92aW5nIGEgc2luZ2xlIGl0ZW0uXG4gICAgICAgICAgLy8gdGhhbmtzIHRvIHN1Z2dlc3Rpb25zIGJ5IEBsaXZvcmFzIGluICMxODA3XG4gICAgICAgICAgZmluZFByZXZGcmFnKGN1cnJlbnRQcmV2LCBzdGFydCwgdGhpcy5pZCkgIT09IHRhcmdldFByZXYpKSB7XG4gICAgICAgICAgICB0aGlzLm1vdmUoZnJhZywgcHJldkVsKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgLy8gbmV3IGluc3RhbmNlLCBvciBzdGlsbCBpbiBzdGFnZ2VyLlxuICAgICAgICAgIC8vIGluc2VydCB3aXRoIHVwZGF0ZWQgc3RhZ2dlciBpbmRleC5cbiAgICAgICAgICB0aGlzLmluc2VydChmcmFnLCBpbnNlcnRpb25JbmRleCsrLCBwcmV2RWwsIGluRG9jdW1lbnQpO1xuICAgICAgICB9XG4gICAgICAgIGZyYWcucmV1c2VkID0gZnJhZy5mcmVzaCA9IGZhbHNlO1xuICAgICAgfVxuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBDcmVhdGUgYSBuZXcgZnJhZ21lbnQgaW5zdGFuY2UuXG4gICAgICpcbiAgICAgKiBAcGFyYW0geyp9IHZhbHVlXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IGFsaWFzXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IGluZGV4XG4gICAgICogQHBhcmFtIHtTdHJpbmd9IFtrZXldXG4gICAgICogQHJldHVybiB7RnJhZ21lbnR9XG4gICAgICovXG5cbiAgICBjcmVhdGU6IGZ1bmN0aW9uIGNyZWF0ZSh2YWx1ZSwgYWxpYXMsIGluZGV4LCBrZXkpIHtcbiAgICAgIHZhciBob3N0ID0gdGhpcy5faG9zdDtcbiAgICAgIC8vIGNyZWF0ZSBpdGVyYXRpb24gc2NvcGVcbiAgICAgIHZhciBwYXJlbnRTY29wZSA9IHRoaXMuX3Njb3BlIHx8IHRoaXMudm07XG4gICAgICB2YXIgc2NvcGUgPSBPYmplY3QuY3JlYXRlKHBhcmVudFNjb3BlKTtcbiAgICAgIC8vIHJlZiBob2xkZXIgZm9yIHRoZSBzY29wZVxuICAgICAgc2NvcGUuJHJlZnMgPSBPYmplY3QuY3JlYXRlKHBhcmVudFNjb3BlLiRyZWZzKTtcbiAgICAgIHNjb3BlLiRlbHMgPSBPYmplY3QuY3JlYXRlKHBhcmVudFNjb3BlLiRlbHMpO1xuICAgICAgLy8gbWFrZSBzdXJlIHBvaW50ICRwYXJlbnQgdG8gcGFyZW50IHNjb3BlXG4gICAgICBzY29wZS4kcGFyZW50ID0gcGFyZW50U2NvcGU7XG4gICAgICAvLyBmb3IgdHdvLXdheSBiaW5kaW5nIG9uIGFsaWFzXG4gICAgICBzY29wZS4kZm9yQ29udGV4dCA9IHRoaXM7XG4gICAgICAvLyBkZWZpbmUgc2NvcGUgcHJvcGVydGllc1xuICAgICAgLy8gaW1wb3J0YW50OiBkZWZpbmUgdGhlIHNjb3BlIGFsaWFzIHdpdGhvdXQgZm9yY2VkIGNvbnZlcnNpb25cbiAgICAgIC8vIHNvIHRoYXQgZnJvemVuIGRhdGEgc3RydWN0dXJlcyByZW1haW4gbm9uLXJlYWN0aXZlLlxuICAgICAgd2l0aG91dENvbnZlcnNpb24oZnVuY3Rpb24gKCkge1xuICAgICAgICBkZWZpbmVSZWFjdGl2ZShzY29wZSwgYWxpYXMsIHZhbHVlKTtcbiAgICAgIH0pO1xuICAgICAgZGVmaW5lUmVhY3RpdmUoc2NvcGUsICckaW5kZXgnLCBpbmRleCk7XG4gICAgICBpZiAoa2V5KSB7XG4gICAgICAgIGRlZmluZVJlYWN0aXZlKHNjb3BlLCAnJGtleScsIGtleSk7XG4gICAgICB9IGVsc2UgaWYgKHNjb3BlLiRrZXkpIHtcbiAgICAgICAgLy8gYXZvaWQgYWNjaWRlbnRhbCBmYWxsYmFja1xuICAgICAgICBkZWYoc2NvcGUsICcka2V5JywgbnVsbCk7XG4gICAgICB9XG4gICAgICBpZiAodGhpcy5pdGVyYXRvcikge1xuICAgICAgICBkZWZpbmVSZWFjdGl2ZShzY29wZSwgdGhpcy5pdGVyYXRvciwga2V5ICE9PSBudWxsID8ga2V5IDogaW5kZXgpO1xuICAgICAgfVxuICAgICAgdmFyIGZyYWcgPSB0aGlzLmZhY3RvcnkuY3JlYXRlKGhvc3QsIHNjb3BlLCB0aGlzLl9mcmFnKTtcbiAgICAgIGZyYWcuZm9ySWQgPSB0aGlzLmlkO1xuICAgICAgdGhpcy5jYWNoZUZyYWcodmFsdWUsIGZyYWcsIGluZGV4LCBrZXkpO1xuICAgICAgcmV0dXJuIGZyYWc7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIFVwZGF0ZSB0aGUgdi1yZWYgb24gb3duZXIgdm0uXG4gICAgICovXG5cbiAgICB1cGRhdGVSZWY6IGZ1bmN0aW9uIHVwZGF0ZVJlZigpIHtcbiAgICAgIHZhciByZWYgPSB0aGlzLmRlc2NyaXB0b3IucmVmO1xuICAgICAgaWYgKCFyZWYpIHJldHVybjtcbiAgICAgIHZhciBoYXNoID0gKHRoaXMuX3Njb3BlIHx8IHRoaXMudm0pLiRyZWZzO1xuICAgICAgdmFyIHJlZnM7XG4gICAgICBpZiAoIXRoaXMuZnJvbU9iamVjdCkge1xuICAgICAgICByZWZzID0gdGhpcy5mcmFncy5tYXAoZmluZFZtRnJvbUZyYWcpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmVmcyA9IHt9O1xuICAgICAgICB0aGlzLmZyYWdzLmZvckVhY2goZnVuY3Rpb24gKGZyYWcpIHtcbiAgICAgICAgICByZWZzW2ZyYWcuc2NvcGUuJGtleV0gPSBmaW5kVm1Gcm9tRnJhZyhmcmFnKTtcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgICBoYXNoW3JlZl0gPSByZWZzO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBGb3Igb3B0aW9uIGxpc3RzLCB1cGRhdGUgdGhlIGNvbnRhaW5pbmcgdi1tb2RlbCBvblxuICAgICAqIHBhcmVudCA8c2VsZWN0Pi5cbiAgICAgKi9cblxuICAgIHVwZGF0ZU1vZGVsOiBmdW5jdGlvbiB1cGRhdGVNb2RlbCgpIHtcbiAgICAgIGlmICh0aGlzLmlzT3B0aW9uKSB7XG4gICAgICAgIHZhciBwYXJlbnQgPSB0aGlzLnN0YXJ0LnBhcmVudE5vZGU7XG4gICAgICAgIHZhciBtb2RlbCA9IHBhcmVudCAmJiBwYXJlbnQuX192X21vZGVsO1xuICAgICAgICBpZiAobW9kZWwpIHtcbiAgICAgICAgICBtb2RlbC5mb3JjZVVwZGF0ZSgpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIEluc2VydCBhIGZyYWdtZW50LiBIYW5kbGVzIHN0YWdnZXJpbmcuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge0ZyYWdtZW50fSBmcmFnXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IGluZGV4XG4gICAgICogQHBhcmFtIHtOb2RlfSBwcmV2RWxcbiAgICAgKiBAcGFyYW0ge0Jvb2xlYW59IGluRG9jdW1lbnRcbiAgICAgKi9cblxuICAgIGluc2VydDogZnVuY3Rpb24gaW5zZXJ0KGZyYWcsIGluZGV4LCBwcmV2RWwsIGluRG9jdW1lbnQpIHtcbiAgICAgIGlmIChmcmFnLnN0YWdnZXJDYikge1xuICAgICAgICBmcmFnLnN0YWdnZXJDYi5jYW5jZWwoKTtcbiAgICAgICAgZnJhZy5zdGFnZ2VyQ2IgPSBudWxsO1xuICAgICAgfVxuICAgICAgdmFyIHN0YWdnZXJBbW91bnQgPSB0aGlzLmdldFN0YWdnZXIoZnJhZywgaW5kZXgsIG51bGwsICdlbnRlcicpO1xuICAgICAgaWYgKGluRG9jdW1lbnQgJiYgc3RhZ2dlckFtb3VudCkge1xuICAgICAgICAvLyBjcmVhdGUgYW4gYW5jaG9yIGFuZCBpbnNlcnQgaXQgc3luY2hyb25vdXNseSxcbiAgICAgICAgLy8gc28gdGhhdCB3ZSBjYW4gcmVzb2x2ZSB0aGUgY29ycmVjdCBvcmRlciB3aXRob3V0XG4gICAgICAgIC8vIHdvcnJ5aW5nIGFib3V0IHNvbWUgZWxlbWVudHMgbm90IGluc2VydGVkIHlldFxuICAgICAgICB2YXIgYW5jaG9yID0gZnJhZy5zdGFnZ2VyQW5jaG9yO1xuICAgICAgICBpZiAoIWFuY2hvcikge1xuICAgICAgICAgIGFuY2hvciA9IGZyYWcuc3RhZ2dlckFuY2hvciA9IGNyZWF0ZUFuY2hvcignc3RhZ2dlci1hbmNob3InKTtcbiAgICAgICAgICBhbmNob3IuX192X2ZyYWcgPSBmcmFnO1xuICAgICAgICB9XG4gICAgICAgIGFmdGVyKGFuY2hvciwgcHJldkVsKTtcbiAgICAgICAgdmFyIG9wID0gZnJhZy5zdGFnZ2VyQ2IgPSBjYW5jZWxsYWJsZShmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgZnJhZy5zdGFnZ2VyQ2IgPSBudWxsO1xuICAgICAgICAgIGZyYWcuYmVmb3JlKGFuY2hvcik7XG4gICAgICAgICAgcmVtb3ZlKGFuY2hvcik7XG4gICAgICAgIH0pO1xuICAgICAgICBzZXRUaW1lb3V0KG9wLCBzdGFnZ2VyQW1vdW50KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHZhciB0YXJnZXQgPSBwcmV2RWwubmV4dFNpYmxpbmc7XG4gICAgICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBpZiAqL1xuICAgICAgICBpZiAoIXRhcmdldCkge1xuICAgICAgICAgIC8vIHJlc2V0IGVuZCBhbmNob3IgcG9zaXRpb24gaW4gY2FzZSB0aGUgcG9zaXRpb24gd2FzIG1lc3NlZCB1cFxuICAgICAgICAgIC8vIGJ5IGFuIGV4dGVybmFsIGRyYWctbi1kcm9wIGxpYnJhcnkuXG4gICAgICAgICAgYWZ0ZXIodGhpcy5lbmQsIHByZXZFbCk7XG4gICAgICAgICAgdGFyZ2V0ID0gdGhpcy5lbmQ7XG4gICAgICAgIH1cbiAgICAgICAgZnJhZy5iZWZvcmUodGFyZ2V0KTtcbiAgICAgIH1cbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogUmVtb3ZlIGEgZnJhZ21lbnQuIEhhbmRsZXMgc3RhZ2dlcmluZy5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7RnJhZ21lbnR9IGZyYWdcbiAgICAgKiBAcGFyYW0ge051bWJlcn0gaW5kZXhcbiAgICAgKiBAcGFyYW0ge051bWJlcn0gdG90YWxcbiAgICAgKiBAcGFyYW0ge0Jvb2xlYW59IGluRG9jdW1lbnRcbiAgICAgKi9cblxuICAgIHJlbW92ZTogZnVuY3Rpb24gcmVtb3ZlKGZyYWcsIGluZGV4LCB0b3RhbCwgaW5Eb2N1bWVudCkge1xuICAgICAgaWYgKGZyYWcuc3RhZ2dlckNiKSB7XG4gICAgICAgIGZyYWcuc3RhZ2dlckNiLmNhbmNlbCgpO1xuICAgICAgICBmcmFnLnN0YWdnZXJDYiA9IG51bGw7XG4gICAgICAgIC8vIGl0J3Mgbm90IHBvc3NpYmxlIGZvciB0aGUgc2FtZSBmcmFnIHRvIGJlIHJlbW92ZWRcbiAgICAgICAgLy8gdHdpY2UsIHNvIGlmIHdlIGhhdmUgYSBwZW5kaW5nIHN0YWdnZXIgY2FsbGJhY2ssXG4gICAgICAgIC8vIGl0IG1lYW5zIHRoaXMgZnJhZyBpcyBxdWV1ZWQgZm9yIGVudGVyIGJ1dCByZW1vdmVkXG4gICAgICAgIC8vIGJlZm9yZSBpdHMgdHJhbnNpdGlvbiBzdGFydGVkLiBTaW5jZSBpdCBpcyBhbHJlYWR5XG4gICAgICAgIC8vIGRlc3Ryb3llZCwgd2UgY2FuIGp1c3QgbGVhdmUgaXQgaW4gZGV0YWNoZWQgc3RhdGUuXG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIHZhciBzdGFnZ2VyQW1vdW50ID0gdGhpcy5nZXRTdGFnZ2VyKGZyYWcsIGluZGV4LCB0b3RhbCwgJ2xlYXZlJyk7XG4gICAgICBpZiAoaW5Eb2N1bWVudCAmJiBzdGFnZ2VyQW1vdW50KSB7XG4gICAgICAgIHZhciBvcCA9IGZyYWcuc3RhZ2dlckNiID0gY2FuY2VsbGFibGUoZnVuY3Rpb24gKCkge1xuICAgICAgICAgIGZyYWcuc3RhZ2dlckNiID0gbnVsbDtcbiAgICAgICAgICBmcmFnLnJlbW92ZSgpO1xuICAgICAgICB9KTtcbiAgICAgICAgc2V0VGltZW91dChvcCwgc3RhZ2dlckFtb3VudCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBmcmFnLnJlbW92ZSgpO1xuICAgICAgfVxuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBNb3ZlIGEgZnJhZ21lbnQgdG8gYSBuZXcgcG9zaXRpb24uXG4gICAgICogRm9yY2Ugbm8gdHJhbnNpdGlvbi5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7RnJhZ21lbnR9IGZyYWdcbiAgICAgKiBAcGFyYW0ge05vZGV9IHByZXZFbFxuICAgICAqL1xuXG4gICAgbW92ZTogZnVuY3Rpb24gbW92ZShmcmFnLCBwcmV2RWwpIHtcbiAgICAgIC8vIGZpeCBhIGNvbW1vbiBpc3N1ZSB3aXRoIFNvcnRhYmxlOlxuICAgICAgLy8gaWYgcHJldkVsIGRvZXNuJ3QgaGF2ZSBuZXh0U2libGluZywgdGhpcyBtZWFucyBpdCdzXG4gICAgICAvLyBiZWVuIGRyYWdnZWQgYWZ0ZXIgdGhlIGVuZCBhbmNob3IuIEp1c3QgcmUtcG9zaXRpb25cbiAgICAgIC8vIHRoZSBlbmQgYW5jaG9yIHRvIHRoZSBlbmQgb2YgdGhlIGNvbnRhaW5lci5cbiAgICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBpZiAqL1xuICAgICAgaWYgKCFwcmV2RWwubmV4dFNpYmxpbmcpIHtcbiAgICAgICAgdGhpcy5lbmQucGFyZW50Tm9kZS5hcHBlbmRDaGlsZCh0aGlzLmVuZCk7XG4gICAgICB9XG4gICAgICBmcmFnLmJlZm9yZShwcmV2RWwubmV4dFNpYmxpbmcsIGZhbHNlKTtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogQ2FjaGUgYSBmcmFnbWVudCB1c2luZyB0cmFjay1ieSBvciB0aGUgb2JqZWN0IGtleS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7Kn0gdmFsdWVcbiAgICAgKiBAcGFyYW0ge0ZyYWdtZW50fSBmcmFnXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IGluZGV4XG4gICAgICogQHBhcmFtIHtTdHJpbmd9IFtrZXldXG4gICAgICovXG5cbiAgICBjYWNoZUZyYWc6IGZ1bmN0aW9uIGNhY2hlRnJhZyh2YWx1ZSwgZnJhZywgaW5kZXgsIGtleSkge1xuICAgICAgdmFyIHRyYWNrQnlLZXkgPSB0aGlzLnBhcmFtcy50cmFja0J5O1xuICAgICAgdmFyIGNhY2hlID0gdGhpcy5jYWNoZTtcbiAgICAgIHZhciBwcmltaXRpdmUgPSAhaXNPYmplY3QodmFsdWUpO1xuICAgICAgdmFyIGlkO1xuICAgICAgaWYgKGtleSB8fCB0cmFja0J5S2V5IHx8IHByaW1pdGl2ZSkge1xuICAgICAgICBpZCA9IGdldFRyYWNrQnlLZXkoaW5kZXgsIGtleSwgdmFsdWUsIHRyYWNrQnlLZXkpO1xuICAgICAgICBpZiAoIWNhY2hlW2lkXSkge1xuICAgICAgICAgIGNhY2hlW2lkXSA9IGZyYWc7XG4gICAgICAgIH0gZWxzZSBpZiAodHJhY2tCeUtleSAhPT0gJyRpbmRleCcpIHtcbiAgICAgICAgICAnZGV2ZWxvcG1lbnQnICE9PSAncHJvZHVjdGlvbicgJiYgdGhpcy53YXJuRHVwbGljYXRlKHZhbHVlKTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaWQgPSB0aGlzLmlkO1xuICAgICAgICBpZiAoaGFzT3duKHZhbHVlLCBpZCkpIHtcbiAgICAgICAgICBpZiAodmFsdWVbaWRdID09PSBudWxsKSB7XG4gICAgICAgICAgICB2YWx1ZVtpZF0gPSBmcmFnO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAnZGV2ZWxvcG1lbnQnICE9PSAncHJvZHVjdGlvbicgJiYgdGhpcy53YXJuRHVwbGljYXRlKHZhbHVlKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSBpZiAoT2JqZWN0LmlzRXh0ZW5zaWJsZSh2YWx1ZSkpIHtcbiAgICAgICAgICBkZWYodmFsdWUsIGlkLCBmcmFnKTtcbiAgICAgICAgfSBlbHNlIGlmICgnZGV2ZWxvcG1lbnQnICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICAgICAgICB3YXJuKCdGcm96ZW4gdi1mb3Igb2JqZWN0cyBjYW5ub3QgYmUgYXV0b21hdGljYWxseSB0cmFja2VkLCBtYWtlIHN1cmUgdG8gJyArICdwcm92aWRlIGEgdHJhY2stYnkga2V5LicpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBmcmFnLnJhdyA9IHZhbHVlO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBHZXQgYSBjYWNoZWQgZnJhZ21lbnQgZnJvbSB0aGUgdmFsdWUvaW5kZXgva2V5XG4gICAgICpcbiAgICAgKiBAcGFyYW0geyp9IHZhbHVlXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IGluZGV4XG4gICAgICogQHBhcmFtIHtTdHJpbmd9IGtleVxuICAgICAqIEByZXR1cm4ge0ZyYWdtZW50fVxuICAgICAqL1xuXG4gICAgZ2V0Q2FjaGVkRnJhZzogZnVuY3Rpb24gZ2V0Q2FjaGVkRnJhZyh2YWx1ZSwgaW5kZXgsIGtleSkge1xuICAgICAgdmFyIHRyYWNrQnlLZXkgPSB0aGlzLnBhcmFtcy50cmFja0J5O1xuICAgICAgdmFyIHByaW1pdGl2ZSA9ICFpc09iamVjdCh2YWx1ZSk7XG4gICAgICB2YXIgZnJhZztcbiAgICAgIGlmIChrZXkgfHwgdHJhY2tCeUtleSB8fCBwcmltaXRpdmUpIHtcbiAgICAgICAgdmFyIGlkID0gZ2V0VHJhY2tCeUtleShpbmRleCwga2V5LCB2YWx1ZSwgdHJhY2tCeUtleSk7XG4gICAgICAgIGZyYWcgPSB0aGlzLmNhY2hlW2lkXTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGZyYWcgPSB2YWx1ZVt0aGlzLmlkXTtcbiAgICAgIH1cbiAgICAgIGlmIChmcmFnICYmIChmcmFnLnJldXNlZCB8fCBmcmFnLmZyZXNoKSkge1xuICAgICAgICAnZGV2ZWxvcG1lbnQnICE9PSAncHJvZHVjdGlvbicgJiYgdGhpcy53YXJuRHVwbGljYXRlKHZhbHVlKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBmcmFnO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBEZWxldGUgYSBmcmFnbWVudCBmcm9tIGNhY2hlLlxuICAgICAqXG4gICAgICogQHBhcmFtIHtGcmFnbWVudH0gZnJhZ1xuICAgICAqL1xuXG4gICAgZGVsZXRlQ2FjaGVkRnJhZzogZnVuY3Rpb24gZGVsZXRlQ2FjaGVkRnJhZyhmcmFnKSB7XG4gICAgICB2YXIgdmFsdWUgPSBmcmFnLnJhdztcbiAgICAgIHZhciB0cmFja0J5S2V5ID0gdGhpcy5wYXJhbXMudHJhY2tCeTtcbiAgICAgIHZhciBzY29wZSA9IGZyYWcuc2NvcGU7XG4gICAgICB2YXIgaW5kZXggPSBzY29wZS4kaW5kZXg7XG4gICAgICAvLyBmaXggIzk0ODogYXZvaWQgYWNjaWRlbnRhbGx5IGZhbGwgdGhyb3VnaCB0b1xuICAgICAgLy8gYSBwYXJlbnQgcmVwZWF0ZXIgd2hpY2ggaGFwcGVucyB0byBoYXZlICRrZXkuXG4gICAgICB2YXIga2V5ID0gaGFzT3duKHNjb3BlLCAnJGtleScpICYmIHNjb3BlLiRrZXk7XG4gICAgICB2YXIgcHJpbWl0aXZlID0gIWlzT2JqZWN0KHZhbHVlKTtcbiAgICAgIGlmICh0cmFja0J5S2V5IHx8IGtleSB8fCBwcmltaXRpdmUpIHtcbiAgICAgICAgdmFyIGlkID0gZ2V0VHJhY2tCeUtleShpbmRleCwga2V5LCB2YWx1ZSwgdHJhY2tCeUtleSk7XG4gICAgICAgIHRoaXMuY2FjaGVbaWRdID0gbnVsbDtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHZhbHVlW3RoaXMuaWRdID0gbnVsbDtcbiAgICAgICAgZnJhZy5yYXcgPSBudWxsO1xuICAgICAgfVxuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBHZXQgdGhlIHN0YWdnZXIgYW1vdW50IGZvciBhbiBpbnNlcnRpb24vcmVtb3ZhbC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7RnJhZ21lbnR9IGZyYWdcbiAgICAgKiBAcGFyYW0ge051bWJlcn0gaW5kZXhcbiAgICAgKiBAcGFyYW0ge051bWJlcn0gdG90YWxcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gdHlwZVxuICAgICAqL1xuXG4gICAgZ2V0U3RhZ2dlcjogZnVuY3Rpb24gZ2V0U3RhZ2dlcihmcmFnLCBpbmRleCwgdG90YWwsIHR5cGUpIHtcbiAgICAgIHR5cGUgPSB0eXBlICsgJ1N0YWdnZXInO1xuICAgICAgdmFyIHRyYW5zID0gZnJhZy5ub2RlLl9fdl90cmFucztcbiAgICAgIHZhciBob29rcyA9IHRyYW5zICYmIHRyYW5zLmhvb2tzO1xuICAgICAgdmFyIGhvb2sgPSBob29rcyAmJiAoaG9va3NbdHlwZV0gfHwgaG9va3Muc3RhZ2dlcik7XG4gICAgICByZXR1cm4gaG9vayA/IGhvb2suY2FsbChmcmFnLCBpbmRleCwgdG90YWwpIDogaW5kZXggKiBwYXJzZUludCh0aGlzLnBhcmFtc1t0eXBlXSB8fCB0aGlzLnBhcmFtcy5zdGFnZ2VyLCAxMCk7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIFByZS1wcm9jZXNzIHRoZSB2YWx1ZSBiZWZvcmUgcGlwaW5nIGl0IHRocm91Z2ggdGhlXG4gICAgICogZmlsdGVycy4gVGhpcyBpcyBwYXNzZWQgdG8gYW5kIGNhbGxlZCBieSB0aGUgd2F0Y2hlci5cbiAgICAgKi9cblxuICAgIF9wcmVQcm9jZXNzOiBmdW5jdGlvbiBfcHJlUHJvY2Vzcyh2YWx1ZSkge1xuICAgICAgLy8gcmVnYXJkbGVzcyBvZiB0eXBlLCBzdG9yZSB0aGUgdW4tZmlsdGVyZWQgcmF3IHZhbHVlLlxuICAgICAgdGhpcy5yYXdWYWx1ZSA9IHZhbHVlO1xuICAgICAgcmV0dXJuIHZhbHVlO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBQb3N0LXByb2Nlc3MgdGhlIHZhbHVlIGFmdGVyIGl0IGhhcyBiZWVuIHBpcGVkIHRocm91Z2hcbiAgICAgKiB0aGUgZmlsdGVycy4gVGhpcyBpcyBwYXNzZWQgdG8gYW5kIGNhbGxlZCBieSB0aGUgd2F0Y2hlci5cbiAgICAgKlxuICAgICAqIEl0IGlzIG5lY2Vzc2FyeSBmb3IgdGhpcyB0byBiZSBjYWxsZWQgZHVyaW5nIHRoZVxuICAgICAqIHdhdGhjZXIncyBkZXBlbmRlbmN5IGNvbGxlY3Rpb24gcGhhc2UgYmVjYXVzZSB3ZSB3YW50XG4gICAgICogdGhlIHYtZm9yIHRvIHVwZGF0ZSB3aGVuIHRoZSBzb3VyY2UgT2JqZWN0IGlzIG11dGF0ZWQuXG4gICAgICovXG5cbiAgICBfcG9zdFByb2Nlc3M6IGZ1bmN0aW9uIF9wb3N0UHJvY2Vzcyh2YWx1ZSkge1xuICAgICAgaWYgKGlzQXJyYXkodmFsdWUpKSB7XG4gICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICAgIH0gZWxzZSBpZiAoaXNQbGFpbk9iamVjdCh2YWx1ZSkpIHtcbiAgICAgICAgLy8gY29udmVydCBwbGFpbiBvYmplY3QgdG8gYXJyYXkuXG4gICAgICAgIHZhciBrZXlzID0gT2JqZWN0LmtleXModmFsdWUpO1xuICAgICAgICB2YXIgaSA9IGtleXMubGVuZ3RoO1xuICAgICAgICB2YXIgcmVzID0gbmV3IEFycmF5KGkpO1xuICAgICAgICB2YXIga2V5O1xuICAgICAgICB3aGlsZSAoaS0tKSB7XG4gICAgICAgICAga2V5ID0ga2V5c1tpXTtcbiAgICAgICAgICByZXNbaV0gPSB7XG4gICAgICAgICAgICAka2V5OiBrZXksXG4gICAgICAgICAgICAkdmFsdWU6IHZhbHVlW2tleV1cbiAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXM7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpZiAodHlwZW9mIHZhbHVlID09PSAnbnVtYmVyJyAmJiAhaXNOYU4odmFsdWUpKSB7XG4gICAgICAgICAgdmFsdWUgPSByYW5nZSh2YWx1ZSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHZhbHVlIHx8IFtdO1xuICAgICAgfVxuICAgIH0sXG5cbiAgICB1bmJpbmQ6IGZ1bmN0aW9uIHVuYmluZCgpIHtcbiAgICAgIGlmICh0aGlzLmRlc2NyaXB0b3IucmVmKSB7XG4gICAgICAgICh0aGlzLl9zY29wZSB8fCB0aGlzLnZtKS4kcmVmc1t0aGlzLmRlc2NyaXB0b3IucmVmXSA9IG51bGw7XG4gICAgICB9XG4gICAgICBpZiAodGhpcy5mcmFncykge1xuICAgICAgICB2YXIgaSA9IHRoaXMuZnJhZ3MubGVuZ3RoO1xuICAgICAgICB2YXIgZnJhZztcbiAgICAgICAgd2hpbGUgKGktLSkge1xuICAgICAgICAgIGZyYWcgPSB0aGlzLmZyYWdzW2ldO1xuICAgICAgICAgIHRoaXMuZGVsZXRlQ2FjaGVkRnJhZyhmcmFnKTtcbiAgICAgICAgICBmcmFnLmRlc3Ryb3koKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfTtcblxuICAvKipcbiAgICogSGVscGVyIHRvIGZpbmQgdGhlIHByZXZpb3VzIGVsZW1lbnQgdGhhdCBpcyBhIGZyYWdtZW50XG4gICAqIGFuY2hvci4gVGhpcyBpcyBuZWNlc3NhcnkgYmVjYXVzZSBhIGRlc3Ryb3llZCBmcmFnJ3NcbiAgICogZWxlbWVudCBjb3VsZCBzdGlsbCBiZSBsaW5nZXJpbmcgaW4gdGhlIERPTSBiZWZvcmUgaXRzXG4gICAqIGxlYXZpbmcgdHJhbnNpdGlvbiBmaW5pc2hlcywgYnV0IGl0cyBpbnNlcnRlZCBmbGFnXG4gICAqIHNob3VsZCBoYXZlIGJlZW4gc2V0IHRvIGZhbHNlIHNvIHdlIGNhbiBza2lwIHRoZW0uXG4gICAqXG4gICAqIElmIHRoaXMgaXMgYSBibG9jayByZXBlYXQsIHdlIHdhbnQgdG8gbWFrZSBzdXJlIHdlIG9ubHlcbiAgICogcmV0dXJuIGZyYWcgdGhhdCBpcyBib3VuZCB0byB0aGlzIHYtZm9yLiAoc2VlICM5MjkpXG4gICAqXG4gICAqIEBwYXJhbSB7RnJhZ21lbnR9IGZyYWdcbiAgICogQHBhcmFtIHtDb21tZW50fFRleHR9IGFuY2hvclxuICAgKiBAcGFyYW0ge1N0cmluZ30gaWRcbiAgICogQHJldHVybiB7RnJhZ21lbnR9XG4gICAqL1xuXG4gIGZ1bmN0aW9uIGZpbmRQcmV2RnJhZyhmcmFnLCBhbmNob3IsIGlkKSB7XG4gICAgdmFyIGVsID0gZnJhZy5ub2RlLnByZXZpb3VzU2libGluZztcbiAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgaWYgKi9cbiAgICBpZiAoIWVsKSByZXR1cm47XG4gICAgZnJhZyA9IGVsLl9fdl9mcmFnO1xuICAgIHdoaWxlICgoIWZyYWcgfHwgZnJhZy5mb3JJZCAhPT0gaWQgfHwgIWZyYWcuaW5zZXJ0ZWQpICYmIGVsICE9PSBhbmNob3IpIHtcbiAgICAgIGVsID0gZWwucHJldmlvdXNTaWJsaW5nO1xuICAgICAgLyogaXN0YW5idWwgaWdub3JlIGlmICovXG4gICAgICBpZiAoIWVsKSByZXR1cm47XG4gICAgICBmcmFnID0gZWwuX192X2ZyYWc7XG4gICAgfVxuICAgIHJldHVybiBmcmFnO1xuICB9XG5cbiAgLyoqXG4gICAqIEZpbmQgYSB2bSBmcm9tIGEgZnJhZ21lbnQuXG4gICAqXG4gICAqIEBwYXJhbSB7RnJhZ21lbnR9IGZyYWdcbiAgICogQHJldHVybiB7VnVlfHVuZGVmaW5lZH1cbiAgICovXG5cbiAgZnVuY3Rpb24gZmluZFZtRnJvbUZyYWcoZnJhZykge1xuICAgIHZhciBub2RlID0gZnJhZy5ub2RlO1xuICAgIC8vIGhhbmRsZSBtdWx0aS1ub2RlIGZyYWdcbiAgICBpZiAoZnJhZy5lbmQpIHtcbiAgICAgIHdoaWxlICghbm9kZS5fX3Z1ZV9fICYmIG5vZGUgIT09IGZyYWcuZW5kICYmIG5vZGUubmV4dFNpYmxpbmcpIHtcbiAgICAgICAgbm9kZSA9IG5vZGUubmV4dFNpYmxpbmc7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBub2RlLl9fdnVlX187XG4gIH1cblxuICAvKipcbiAgICogQ3JlYXRlIGEgcmFuZ2UgYXJyYXkgZnJvbSBnaXZlbiBudW1iZXIuXG4gICAqXG4gICAqIEBwYXJhbSB7TnVtYmVyfSBuXG4gICAqIEByZXR1cm4ge0FycmF5fVxuICAgKi9cblxuICBmdW5jdGlvbiByYW5nZShuKSB7XG4gICAgdmFyIGkgPSAtMTtcbiAgICB2YXIgcmV0ID0gbmV3IEFycmF5KE1hdGguZmxvb3IobikpO1xuICAgIHdoaWxlICgrK2kgPCBuKSB7XG4gICAgICByZXRbaV0gPSBpO1xuICAgIH1cbiAgICByZXR1cm4gcmV0O1xuICB9XG5cbiAgLyoqXG4gICAqIEdldCB0aGUgdHJhY2sgYnkga2V5IGZvciBhbiBpdGVtLlxuICAgKlxuICAgKiBAcGFyYW0ge051bWJlcn0gaW5kZXhcbiAgICogQHBhcmFtIHtTdHJpbmd9IGtleVxuICAgKiBAcGFyYW0geyp9IHZhbHVlXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBbdHJhY2tCeUtleV1cbiAgICovXG5cbiAgZnVuY3Rpb24gZ2V0VHJhY2tCeUtleShpbmRleCwga2V5LCB2YWx1ZSwgdHJhY2tCeUtleSkge1xuICAgIHJldHVybiB0cmFja0J5S2V5ID8gdHJhY2tCeUtleSA9PT0gJyRpbmRleCcgPyBpbmRleCA6IHRyYWNrQnlLZXkuY2hhckF0KDApLm1hdGNoKC9cXHcvKSA/IGdldFBhdGgodmFsdWUsIHRyYWNrQnlLZXkpIDogdmFsdWVbdHJhY2tCeUtleV0gOiBrZXkgfHwgdmFsdWU7XG4gIH1cblxuICBpZiAoJ2RldmVsb3BtZW50JyAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgdkZvci53YXJuRHVwbGljYXRlID0gZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICB3YXJuKCdEdXBsaWNhdGUgdmFsdWUgZm91bmQgaW4gdi1mb3I9XCInICsgdGhpcy5kZXNjcmlwdG9yLnJhdyArICdcIjogJyArIEpTT04uc3RyaW5naWZ5KHZhbHVlKSArICcuIFVzZSB0cmFjay1ieT1cIiRpbmRleFwiIGlmICcgKyAneW91IGFyZSBleHBlY3RpbmcgZHVwbGljYXRlIHZhbHVlcy4nLCB0aGlzLnZtKTtcbiAgICB9O1xuICB9XG5cbiAgdmFyIHZJZiA9IHtcblxuICAgIHByaW9yaXR5OiBJRixcbiAgICB0ZXJtaW5hbDogdHJ1ZSxcblxuICAgIGJpbmQ6IGZ1bmN0aW9uIGJpbmQoKSB7XG4gICAgICB2YXIgZWwgPSB0aGlzLmVsO1xuICAgICAgaWYgKCFlbC5fX3Z1ZV9fKSB7XG4gICAgICAgIC8vIGNoZWNrIGVsc2UgYmxvY2tcbiAgICAgICAgdmFyIG5leHQgPSBlbC5uZXh0RWxlbWVudFNpYmxpbmc7XG4gICAgICAgIGlmIChuZXh0ICYmIGdldEF0dHIobmV4dCwgJ3YtZWxzZScpICE9PSBudWxsKSB7XG4gICAgICAgICAgcmVtb3ZlKG5leHQpO1xuICAgICAgICAgIHRoaXMuZWxzZUVsID0gbmV4dDtcbiAgICAgICAgfVxuICAgICAgICAvLyBjaGVjayBtYWluIGJsb2NrXG4gICAgICAgIHRoaXMuYW5jaG9yID0gY3JlYXRlQW5jaG9yKCd2LWlmJyk7XG4gICAgICAgIHJlcGxhY2UoZWwsIHRoaXMuYW5jaG9yKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgICdkZXZlbG9wbWVudCcgIT09ICdwcm9kdWN0aW9uJyAmJiB3YXJuKCd2LWlmPVwiJyArIHRoaXMuZXhwcmVzc2lvbiArICdcIiBjYW5ub3QgYmUgJyArICd1c2VkIG9uIGFuIGluc3RhbmNlIHJvb3QgZWxlbWVudC4nLCB0aGlzLnZtKTtcbiAgICAgICAgdGhpcy5pbnZhbGlkID0gdHJ1ZTtcbiAgICAgIH1cbiAgICB9LFxuXG4gICAgdXBkYXRlOiBmdW5jdGlvbiB1cGRhdGUodmFsdWUpIHtcbiAgICAgIGlmICh0aGlzLmludmFsaWQpIHJldHVybjtcbiAgICAgIGlmICh2YWx1ZSkge1xuICAgICAgICBpZiAoIXRoaXMuZnJhZykge1xuICAgICAgICAgIHRoaXMuaW5zZXJ0KCk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMucmVtb3ZlKCk7XG4gICAgICB9XG4gICAgfSxcblxuICAgIGluc2VydDogZnVuY3Rpb24gaW5zZXJ0KCkge1xuICAgICAgaWYgKHRoaXMuZWxzZUZyYWcpIHtcbiAgICAgICAgdGhpcy5lbHNlRnJhZy5yZW1vdmUoKTtcbiAgICAgICAgdGhpcy5lbHNlRnJhZyA9IG51bGw7XG4gICAgICB9XG4gICAgICAvLyBsYXp5IGluaXQgZmFjdG9yeVxuICAgICAgaWYgKCF0aGlzLmZhY3RvcnkpIHtcbiAgICAgICAgdGhpcy5mYWN0b3J5ID0gbmV3IEZyYWdtZW50RmFjdG9yeSh0aGlzLnZtLCB0aGlzLmVsKTtcbiAgICAgIH1cbiAgICAgIHRoaXMuZnJhZyA9IHRoaXMuZmFjdG9yeS5jcmVhdGUodGhpcy5faG9zdCwgdGhpcy5fc2NvcGUsIHRoaXMuX2ZyYWcpO1xuICAgICAgdGhpcy5mcmFnLmJlZm9yZSh0aGlzLmFuY2hvcik7XG4gICAgfSxcblxuICAgIHJlbW92ZTogZnVuY3Rpb24gcmVtb3ZlKCkge1xuICAgICAgaWYgKHRoaXMuZnJhZykge1xuICAgICAgICB0aGlzLmZyYWcucmVtb3ZlKCk7XG4gICAgICAgIHRoaXMuZnJhZyA9IG51bGw7XG4gICAgICB9XG4gICAgICBpZiAodGhpcy5lbHNlRWwgJiYgIXRoaXMuZWxzZUZyYWcpIHtcbiAgICAgICAgaWYgKCF0aGlzLmVsc2VGYWN0b3J5KSB7XG4gICAgICAgICAgdGhpcy5lbHNlRmFjdG9yeSA9IG5ldyBGcmFnbWVudEZhY3RvcnkodGhpcy5lbHNlRWwuX2NvbnRleHQgfHwgdGhpcy52bSwgdGhpcy5lbHNlRWwpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuZWxzZUZyYWcgPSB0aGlzLmVsc2VGYWN0b3J5LmNyZWF0ZSh0aGlzLl9ob3N0LCB0aGlzLl9zY29wZSwgdGhpcy5fZnJhZyk7XG4gICAgICAgIHRoaXMuZWxzZUZyYWcuYmVmb3JlKHRoaXMuYW5jaG9yKTtcbiAgICAgIH1cbiAgICB9LFxuXG4gICAgdW5iaW5kOiBmdW5jdGlvbiB1bmJpbmQoKSB7XG4gICAgICBpZiAodGhpcy5mcmFnKSB7XG4gICAgICAgIHRoaXMuZnJhZy5kZXN0cm95KCk7XG4gICAgICB9XG4gICAgICBpZiAodGhpcy5lbHNlRnJhZykge1xuICAgICAgICB0aGlzLmVsc2VGcmFnLmRlc3Ryb3koKTtcbiAgICAgIH1cbiAgICB9XG4gIH07XG5cbiAgdmFyIHNob3cgPSB7XG5cbiAgICBiaW5kOiBmdW5jdGlvbiBiaW5kKCkge1xuICAgICAgLy8gY2hlY2sgZWxzZSBibG9ja1xuICAgICAgdmFyIG5leHQgPSB0aGlzLmVsLm5leHRFbGVtZW50U2libGluZztcbiAgICAgIGlmIChuZXh0ICYmIGdldEF0dHIobmV4dCwgJ3YtZWxzZScpICE9PSBudWxsKSB7XG4gICAgICAgIHRoaXMuZWxzZUVsID0gbmV4dDtcbiAgICAgIH1cbiAgICB9LFxuXG4gICAgdXBkYXRlOiBmdW5jdGlvbiB1cGRhdGUodmFsdWUpIHtcbiAgICAgIHRoaXMuYXBwbHkodGhpcy5lbCwgdmFsdWUpO1xuICAgICAgaWYgKHRoaXMuZWxzZUVsKSB7XG4gICAgICAgIHRoaXMuYXBwbHkodGhpcy5lbHNlRWwsICF2YWx1ZSk7XG4gICAgICB9XG4gICAgfSxcblxuICAgIGFwcGx5OiBmdW5jdGlvbiBhcHBseShlbCwgdmFsdWUpIHtcbiAgICAgIGlmIChpbkRvYyhlbCkpIHtcbiAgICAgICAgYXBwbHlUcmFuc2l0aW9uKGVsLCB2YWx1ZSA/IDEgOiAtMSwgdG9nZ2xlLCB0aGlzLnZtKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRvZ2dsZSgpO1xuICAgICAgfVxuICAgICAgZnVuY3Rpb24gdG9nZ2xlKCkge1xuICAgICAgICBlbC5zdHlsZS5kaXNwbGF5ID0gdmFsdWUgPyAnJyA6ICdub25lJztcbiAgICAgIH1cbiAgICB9XG4gIH07XG5cbiAgdmFyIHRleHQkMiA9IHtcblxuICAgIGJpbmQ6IGZ1bmN0aW9uIGJpbmQoKSB7XG4gICAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgICB2YXIgZWwgPSB0aGlzLmVsO1xuICAgICAgdmFyIGlzUmFuZ2UgPSBlbC50eXBlID09PSAncmFuZ2UnO1xuICAgICAgdmFyIGxhenkgPSB0aGlzLnBhcmFtcy5sYXp5O1xuICAgICAgdmFyIG51bWJlciA9IHRoaXMucGFyYW1zLm51bWJlcjtcbiAgICAgIHZhciBkZWJvdW5jZSA9IHRoaXMucGFyYW1zLmRlYm91bmNlO1xuXG4gICAgICAvLyBoYW5kbGUgY29tcG9zaXRpb24gZXZlbnRzLlxuICAgICAgLy8gICBodHRwOi8vYmxvZy5ldmFueW91Lm1lLzIwMTQvMDEvMDMvY29tcG9zaXRpb24tZXZlbnQvXG4gICAgICAvLyBza2lwIHRoaXMgZm9yIEFuZHJvaWQgYmVjYXVzZSBpdCBoYW5kbGVzIGNvbXBvc2l0aW9uXG4gICAgICAvLyBldmVudHMgcXVpdGUgZGlmZmVyZW50bHkuIEFuZHJvaWQgZG9lc24ndCB0cmlnZ2VyXG4gICAgICAvLyBjb21wb3NpdGlvbiBldmVudHMgZm9yIGxhbmd1YWdlIGlucHV0IG1ldGhvZHMgZS5nLlxuICAgICAgLy8gQ2hpbmVzZSwgYnV0IGluc3RlYWQgdHJpZ2dlcnMgdGhlbSBmb3Igc3BlbGxpbmdcbiAgICAgIC8vIHN1Z2dlc3Rpb25zLi4uIChzZWUgRGlzY3Vzc2lvbi8jMTYyKVxuICAgICAgdmFyIGNvbXBvc2luZyA9IGZhbHNlO1xuICAgICAgaWYgKCFpc0FuZHJvaWQgJiYgIWlzUmFuZ2UpIHtcbiAgICAgICAgdGhpcy5vbignY29tcG9zaXRpb25zdGFydCcsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICBjb21wb3NpbmcgPSB0cnVlO1xuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5vbignY29tcG9zaXRpb25lbmQnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgY29tcG9zaW5nID0gZmFsc2U7XG4gICAgICAgICAgLy8gaW4gSUUxMSB0aGUgXCJjb21wb3NpdGlvbmVuZFwiIGV2ZW50IGZpcmVzIEFGVEVSXG4gICAgICAgICAgLy8gdGhlIFwiaW5wdXRcIiBldmVudCwgc28gdGhlIGlucHV0IGhhbmRsZXIgaXMgYmxvY2tlZFxuICAgICAgICAgIC8vIGF0IHRoZSBlbmQuLi4gaGF2ZSB0byBjYWxsIGl0IGhlcmUuXG4gICAgICAgICAgLy9cbiAgICAgICAgICAvLyAjMTMyNzogaW4gbGF6eSBtb2RlIHRoaXMgaXMgdW5lY2Vzc2FyeS5cbiAgICAgICAgICBpZiAoIWxhenkpIHtcbiAgICAgICAgICAgIHNlbGYubGlzdGVuZXIoKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfVxuXG4gICAgICAvLyBwcmV2ZW50IG1lc3Npbmcgd2l0aCB0aGUgaW5wdXQgd2hlbiB1c2VyIGlzIHR5cGluZyxcbiAgICAgIC8vIGFuZCBmb3JjZSB1cGRhdGUgb24gYmx1ci5cbiAgICAgIHRoaXMuZm9jdXNlZCA9IGZhbHNlO1xuICAgICAgaWYgKCFpc1JhbmdlICYmICFsYXp5KSB7XG4gICAgICAgIHRoaXMub24oJ2ZvY3VzJywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgIHNlbGYuZm9jdXNlZCA9IHRydWU7XG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLm9uKCdibHVyJywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgIHNlbGYuZm9jdXNlZCA9IGZhbHNlO1xuICAgICAgICAgIC8vIGRvIG5vdCBzeW5jIHZhbHVlIGFmdGVyIGZyYWdtZW50IHJlbW92YWwgKCMyMDE3KVxuICAgICAgICAgIGlmICghc2VsZi5fZnJhZyB8fCBzZWxmLl9mcmFnLmluc2VydGVkKSB7XG4gICAgICAgICAgICBzZWxmLnJhd0xpc3RlbmVyKCk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH1cblxuICAgICAgLy8gTm93IGF0dGFjaCB0aGUgbWFpbiBsaXN0ZW5lclxuICAgICAgdGhpcy5saXN0ZW5lciA9IHRoaXMucmF3TGlzdGVuZXIgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmIChjb21wb3NpbmcgfHwgIXNlbGYuX2JvdW5kKSB7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHZhciB2YWwgPSBudW1iZXIgfHwgaXNSYW5nZSA/IHRvTnVtYmVyKGVsLnZhbHVlKSA6IGVsLnZhbHVlO1xuICAgICAgICBzZWxmLnNldCh2YWwpO1xuICAgICAgICAvLyBmb3JjZSB1cGRhdGUgb24gbmV4dCB0aWNrIHRvIGF2b2lkIGxvY2sgJiBzYW1lIHZhbHVlXG4gICAgICAgIC8vIGFsc28gb25seSB1cGRhdGUgd2hlbiB1c2VyIGlzIG5vdCB0eXBpbmdcbiAgICAgICAgbmV4dFRpY2soZnVuY3Rpb24gKCkge1xuICAgICAgICAgIGlmIChzZWxmLl9ib3VuZCAmJiAhc2VsZi5mb2N1c2VkKSB7XG4gICAgICAgICAgICBzZWxmLnVwZGF0ZShzZWxmLl93YXRjaGVyLnZhbHVlKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfTtcblxuICAgICAgLy8gYXBwbHkgZGVib3VuY2VcbiAgICAgIGlmIChkZWJvdW5jZSkge1xuICAgICAgICB0aGlzLmxpc3RlbmVyID0gX2RlYm91bmNlKHRoaXMubGlzdGVuZXIsIGRlYm91bmNlKTtcbiAgICAgIH1cblxuICAgICAgLy8gU3VwcG9ydCBqUXVlcnkgZXZlbnRzLCBzaW5jZSBqUXVlcnkudHJpZ2dlcigpIGRvZXNuJ3RcbiAgICAgIC8vIHRyaWdnZXIgbmF0aXZlIGV2ZW50cyBpbiBzb21lIGNhc2VzIGFuZCBzb21lIHBsdWdpbnNcbiAgICAgIC8vIHJlbHkgb24gJC50cmlnZ2VyKClcbiAgICAgIC8vXG4gICAgICAvLyBXZSB3YW50IHRvIG1ha2Ugc3VyZSBpZiBhIGxpc3RlbmVyIGlzIGF0dGFjaGVkIHVzaW5nXG4gICAgICAvLyBqUXVlcnksIGl0IGlzIGFsc28gcmVtb3ZlZCB3aXRoIGpRdWVyeSwgdGhhdCdzIHdoeVxuICAgICAgLy8gd2UgZG8gdGhlIGNoZWNrIGZvciBlYWNoIGRpcmVjdGl2ZSBpbnN0YW5jZSBhbmRcbiAgICAgIC8vIHN0b3JlIHRoYXQgY2hlY2sgcmVzdWx0IG9uIGl0c2VsZi4gVGhpcyBhbHNvIGFsbG93c1xuICAgICAgLy8gZWFzaWVyIHRlc3QgY292ZXJhZ2UgY29udHJvbCBieSB1bnNldHRpbmcgdGhlIGdsb2JhbFxuICAgICAgLy8galF1ZXJ5IHZhcmlhYmxlIGluIHRlc3RzLlxuICAgICAgdGhpcy5oYXNqUXVlcnkgPSB0eXBlb2YgalF1ZXJ5ID09PSAnZnVuY3Rpb24nO1xuICAgICAgaWYgKHRoaXMuaGFzalF1ZXJ5KSB7XG4gICAgICAgIHZhciBtZXRob2QgPSBqUXVlcnkuZm4ub24gPyAnb24nIDogJ2JpbmQnO1xuICAgICAgICBqUXVlcnkoZWwpW21ldGhvZF0oJ2NoYW5nZScsIHRoaXMucmF3TGlzdGVuZXIpO1xuICAgICAgICBpZiAoIWxhenkpIHtcbiAgICAgICAgICBqUXVlcnkoZWwpW21ldGhvZF0oJ2lucHV0JywgdGhpcy5saXN0ZW5lcik7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMub24oJ2NoYW5nZScsIHRoaXMucmF3TGlzdGVuZXIpO1xuICAgICAgICBpZiAoIWxhenkpIHtcbiAgICAgICAgICB0aGlzLm9uKCdpbnB1dCcsIHRoaXMubGlzdGVuZXIpO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIC8vIElFOSBkb2Vzbid0IGZpcmUgaW5wdXQgZXZlbnQgb24gYmFja3NwYWNlL2RlbC9jdXRcbiAgICAgIGlmICghbGF6eSAmJiBpc0lFOSkge1xuICAgICAgICB0aGlzLm9uKCdjdXQnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgbmV4dFRpY2soc2VsZi5saXN0ZW5lcik7XG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLm9uKCdrZXl1cCcsIGZ1bmN0aW9uIChlKSB7XG4gICAgICAgICAgaWYgKGUua2V5Q29kZSA9PT0gNDYgfHwgZS5rZXlDb2RlID09PSA4KSB7XG4gICAgICAgICAgICBzZWxmLmxpc3RlbmVyKCk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH1cblxuICAgICAgLy8gc2V0IGluaXRpYWwgdmFsdWUgaWYgcHJlc2VudFxuICAgICAgaWYgKGVsLmhhc0F0dHJpYnV0ZSgndmFsdWUnKSB8fCBlbC50YWdOYW1lID09PSAnVEVYVEFSRUEnICYmIGVsLnZhbHVlLnRyaW0oKSkge1xuICAgICAgICB0aGlzLmFmdGVyQmluZCA9IHRoaXMubGlzdGVuZXI7XG4gICAgICB9XG4gICAgfSxcblxuICAgIHVwZGF0ZTogZnVuY3Rpb24gdXBkYXRlKHZhbHVlKSB7XG4gICAgICB0aGlzLmVsLnZhbHVlID0gX3RvU3RyaW5nKHZhbHVlKTtcbiAgICB9LFxuXG4gICAgdW5iaW5kOiBmdW5jdGlvbiB1bmJpbmQoKSB7XG4gICAgICB2YXIgZWwgPSB0aGlzLmVsO1xuICAgICAgaWYgKHRoaXMuaGFzalF1ZXJ5KSB7XG4gICAgICAgIHZhciBtZXRob2QgPSBqUXVlcnkuZm4ub2ZmID8gJ29mZicgOiAndW5iaW5kJztcbiAgICAgICAgalF1ZXJ5KGVsKVttZXRob2RdKCdjaGFuZ2UnLCB0aGlzLmxpc3RlbmVyKTtcbiAgICAgICAgalF1ZXJ5KGVsKVttZXRob2RdKCdpbnB1dCcsIHRoaXMubGlzdGVuZXIpO1xuICAgICAgfVxuICAgIH1cbiAgfTtcblxuICB2YXIgcmFkaW8gPSB7XG5cbiAgICBiaW5kOiBmdW5jdGlvbiBiaW5kKCkge1xuICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgICAgdmFyIGVsID0gdGhpcy5lbDtcblxuICAgICAgdGhpcy5nZXRWYWx1ZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgLy8gdmFsdWUgb3ZlcndyaXRlIHZpYSB2LWJpbmQ6dmFsdWVcbiAgICAgICAgaWYgKGVsLmhhc093blByb3BlcnR5KCdfdmFsdWUnKSkge1xuICAgICAgICAgIHJldHVybiBlbC5fdmFsdWU7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIHZhbCA9IGVsLnZhbHVlO1xuICAgICAgICBpZiAoc2VsZi5wYXJhbXMubnVtYmVyKSB7XG4gICAgICAgICAgdmFsID0gdG9OdW1iZXIodmFsKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdmFsO1xuICAgICAgfTtcblxuICAgICAgdGhpcy5saXN0ZW5lciA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgc2VsZi5zZXQoc2VsZi5nZXRWYWx1ZSgpKTtcbiAgICAgIH07XG4gICAgICB0aGlzLm9uKCdjaGFuZ2UnLCB0aGlzLmxpc3RlbmVyKTtcblxuICAgICAgaWYgKGVsLmhhc0F0dHJpYnV0ZSgnY2hlY2tlZCcpKSB7XG4gICAgICAgIHRoaXMuYWZ0ZXJCaW5kID0gdGhpcy5saXN0ZW5lcjtcbiAgICAgIH1cbiAgICB9LFxuXG4gICAgdXBkYXRlOiBmdW5jdGlvbiB1cGRhdGUodmFsdWUpIHtcbiAgICAgIHRoaXMuZWwuY2hlY2tlZCA9IGxvb3NlRXF1YWwodmFsdWUsIHRoaXMuZ2V0VmFsdWUoKSk7XG4gICAgfVxuICB9O1xuXG4gIHZhciBzZWxlY3QgPSB7XG5cbiAgICBiaW5kOiBmdW5jdGlvbiBiaW5kKCkge1xuICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgICAgdmFyIGVsID0gdGhpcy5lbDtcblxuICAgICAgLy8gbWV0aG9kIHRvIGZvcmNlIHVwZGF0ZSBET00gdXNpbmcgbGF0ZXN0IHZhbHVlLlxuICAgICAgdGhpcy5mb3JjZVVwZGF0ZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKHNlbGYuX3dhdGNoZXIpIHtcbiAgICAgICAgICBzZWxmLnVwZGF0ZShzZWxmLl93YXRjaGVyLmdldCgpKTtcbiAgICAgICAgfVxuICAgICAgfTtcblxuICAgICAgLy8gY2hlY2sgaWYgdGhpcyBpcyBhIG11bHRpcGxlIHNlbGVjdFxuICAgICAgdmFyIG11bHRpcGxlID0gdGhpcy5tdWx0aXBsZSA9IGVsLmhhc0F0dHJpYnV0ZSgnbXVsdGlwbGUnKTtcblxuICAgICAgLy8gYXR0YWNoIGxpc3RlbmVyXG4gICAgICB0aGlzLmxpc3RlbmVyID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgdmFsdWUgPSBnZXRWYWx1ZShlbCwgbXVsdGlwbGUpO1xuICAgICAgICB2YWx1ZSA9IHNlbGYucGFyYW1zLm51bWJlciA/IGlzQXJyYXkodmFsdWUpID8gdmFsdWUubWFwKHRvTnVtYmVyKSA6IHRvTnVtYmVyKHZhbHVlKSA6IHZhbHVlO1xuICAgICAgICBzZWxmLnNldCh2YWx1ZSk7XG4gICAgICB9O1xuICAgICAgdGhpcy5vbignY2hhbmdlJywgdGhpcy5saXN0ZW5lcik7XG5cbiAgICAgIC8vIGlmIGhhcyBpbml0aWFsIHZhbHVlLCBzZXQgYWZ0ZXJCaW5kXG4gICAgICB2YXIgaW5pdFZhbHVlID0gZ2V0VmFsdWUoZWwsIG11bHRpcGxlLCB0cnVlKTtcbiAgICAgIGlmIChtdWx0aXBsZSAmJiBpbml0VmFsdWUubGVuZ3RoIHx8ICFtdWx0aXBsZSAmJiBpbml0VmFsdWUgIT09IG51bGwpIHtcbiAgICAgICAgdGhpcy5hZnRlckJpbmQgPSB0aGlzLmxpc3RlbmVyO1xuICAgICAgfVxuXG4gICAgICAvLyBBbGwgbWFqb3IgYnJvd3NlcnMgZXhjZXB0IEZpcmVmb3ggcmVzZXRzXG4gICAgICAvLyBzZWxlY3RlZEluZGV4IHdpdGggdmFsdWUgLTEgdG8gMCB3aGVuIHRoZSBlbGVtZW50XG4gICAgICAvLyBpcyBhcHBlbmRlZCB0byBhIG5ldyBwYXJlbnQsIHRoZXJlZm9yZSB3ZSBoYXZlIHRvXG4gICAgICAvLyBmb3JjZSBhIERPTSB1cGRhdGUgd2hlbmV2ZXIgdGhhdCBoYXBwZW5zLi4uXG4gICAgICB0aGlzLnZtLiRvbignaG9vazphdHRhY2hlZCcsIHRoaXMuZm9yY2VVcGRhdGUpO1xuICAgIH0sXG5cbiAgICB1cGRhdGU6IGZ1bmN0aW9uIHVwZGF0ZSh2YWx1ZSkge1xuICAgICAgdmFyIGVsID0gdGhpcy5lbDtcbiAgICAgIGVsLnNlbGVjdGVkSW5kZXggPSAtMTtcbiAgICAgIHZhciBtdWx0aSA9IHRoaXMubXVsdGlwbGUgJiYgaXNBcnJheSh2YWx1ZSk7XG4gICAgICB2YXIgb3B0aW9ucyA9IGVsLm9wdGlvbnM7XG4gICAgICB2YXIgaSA9IG9wdGlvbnMubGVuZ3RoO1xuICAgICAgdmFyIG9wLCB2YWw7XG4gICAgICB3aGlsZSAoaS0tKSB7XG4gICAgICAgIG9wID0gb3B0aW9uc1tpXTtcbiAgICAgICAgdmFsID0gb3AuaGFzT3duUHJvcGVydHkoJ192YWx1ZScpID8gb3AuX3ZhbHVlIDogb3AudmFsdWU7XG4gICAgICAgIC8qIGVzbGludC1kaXNhYmxlIGVxZXFlcSAqL1xuICAgICAgICBvcC5zZWxlY3RlZCA9IG11bHRpID8gaW5kZXhPZiQxKHZhbHVlLCB2YWwpID4gLTEgOiBsb29zZUVxdWFsKHZhbHVlLCB2YWwpO1xuICAgICAgICAvKiBlc2xpbnQtZW5hYmxlIGVxZXFlcSAqL1xuICAgICAgfVxuICAgIH0sXG5cbiAgICB1bmJpbmQ6IGZ1bmN0aW9uIHVuYmluZCgpIHtcbiAgICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXG4gICAgICB0aGlzLnZtLiRvZmYoJ2hvb2s6YXR0YWNoZWQnLCB0aGlzLmZvcmNlVXBkYXRlKTtcbiAgICB9XG4gIH07XG5cbiAgLyoqXG4gICAqIEdldCBzZWxlY3QgdmFsdWVcbiAgICpcbiAgICogQHBhcmFtIHtTZWxlY3RFbGVtZW50fSBlbFxuICAgKiBAcGFyYW0ge0Jvb2xlYW59IG11bHRpXG4gICAqIEBwYXJhbSB7Qm9vbGVhbn0gaW5pdFxuICAgKiBAcmV0dXJuIHtBcnJheXwqfVxuICAgKi9cblxuICBmdW5jdGlvbiBnZXRWYWx1ZShlbCwgbXVsdGksIGluaXQpIHtcbiAgICB2YXIgcmVzID0gbXVsdGkgPyBbXSA6IG51bGw7XG4gICAgdmFyIG9wLCB2YWwsIHNlbGVjdGVkO1xuICAgIGZvciAodmFyIGkgPSAwLCBsID0gZWwub3B0aW9ucy5sZW5ndGg7IGkgPCBsOyBpKyspIHtcbiAgICAgIG9wID0gZWwub3B0aW9uc1tpXTtcbiAgICAgIHNlbGVjdGVkID0gaW5pdCA/IG9wLmhhc0F0dHJpYnV0ZSgnc2VsZWN0ZWQnKSA6IG9wLnNlbGVjdGVkO1xuICAgICAgaWYgKHNlbGVjdGVkKSB7XG4gICAgICAgIHZhbCA9IG9wLmhhc093blByb3BlcnR5KCdfdmFsdWUnKSA/IG9wLl92YWx1ZSA6IG9wLnZhbHVlO1xuICAgICAgICBpZiAobXVsdGkpIHtcbiAgICAgICAgICByZXMucHVzaCh2YWwpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJldHVybiB2YWw7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHJlcztcbiAgfVxuXG4gIC8qKlxuICAgKiBOYXRpdmUgQXJyYXkuaW5kZXhPZiB1c2VzIHN0cmljdCBlcXVhbCwgYnV0IGluIHRoaXNcbiAgICogY2FzZSB3ZSBuZWVkIHRvIG1hdGNoIHN0cmluZy9udW1iZXJzIHdpdGggY3VzdG9tIGVxdWFsLlxuICAgKlxuICAgKiBAcGFyYW0ge0FycmF5fSBhcnJcbiAgICogQHBhcmFtIHsqfSB2YWxcbiAgICovXG5cbiAgZnVuY3Rpb24gaW5kZXhPZiQxKGFyciwgdmFsKSB7XG4gICAgdmFyIGkgPSBhcnIubGVuZ3RoO1xuICAgIHdoaWxlIChpLS0pIHtcbiAgICAgIGlmIChsb29zZUVxdWFsKGFycltpXSwgdmFsKSkge1xuICAgICAgICByZXR1cm4gaTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIC0xO1xuICB9XG5cbiAgdmFyIGNoZWNrYm94ID0ge1xuXG4gICAgYmluZDogZnVuY3Rpb24gYmluZCgpIHtcbiAgICAgIHZhciBzZWxmID0gdGhpcztcbiAgICAgIHZhciBlbCA9IHRoaXMuZWw7XG5cbiAgICAgIHRoaXMuZ2V0VmFsdWUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiBlbC5oYXNPd25Qcm9wZXJ0eSgnX3ZhbHVlJykgPyBlbC5fdmFsdWUgOiBzZWxmLnBhcmFtcy5udW1iZXIgPyB0b051bWJlcihlbC52YWx1ZSkgOiBlbC52YWx1ZTtcbiAgICAgIH07XG5cbiAgICAgIGZ1bmN0aW9uIGdldEJvb2xlYW5WYWx1ZSgpIHtcbiAgICAgICAgdmFyIHZhbCA9IGVsLmNoZWNrZWQ7XG4gICAgICAgIGlmICh2YWwgJiYgZWwuaGFzT3duUHJvcGVydHkoJ190cnVlVmFsdWUnKSkge1xuICAgICAgICAgIHJldHVybiBlbC5fdHJ1ZVZhbHVlO1xuICAgICAgICB9XG4gICAgICAgIGlmICghdmFsICYmIGVsLmhhc093blByb3BlcnR5KCdfZmFsc2VWYWx1ZScpKSB7XG4gICAgICAgICAgcmV0dXJuIGVsLl9mYWxzZVZhbHVlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB2YWw7XG4gICAgICB9XG5cbiAgICAgIHRoaXMubGlzdGVuZXIgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBtb2RlbCA9IHNlbGYuX3dhdGNoZXIudmFsdWU7XG4gICAgICAgIGlmIChpc0FycmF5KG1vZGVsKSkge1xuICAgICAgICAgIHZhciB2YWwgPSBzZWxmLmdldFZhbHVlKCk7XG4gICAgICAgICAgaWYgKGVsLmNoZWNrZWQpIHtcbiAgICAgICAgICAgIGlmIChpbmRleE9mKG1vZGVsLCB2YWwpIDwgMCkge1xuICAgICAgICAgICAgICBtb2RlbC5wdXNoKHZhbCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIG1vZGVsLiRyZW1vdmUodmFsKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgc2VsZi5zZXQoZ2V0Qm9vbGVhblZhbHVlKCkpO1xuICAgICAgICB9XG4gICAgICB9O1xuXG4gICAgICB0aGlzLm9uKCdjaGFuZ2UnLCB0aGlzLmxpc3RlbmVyKTtcbiAgICAgIGlmIChlbC5oYXNBdHRyaWJ1dGUoJ2NoZWNrZWQnKSkge1xuICAgICAgICB0aGlzLmFmdGVyQmluZCA9IHRoaXMubGlzdGVuZXI7XG4gICAgICB9XG4gICAgfSxcblxuICAgIHVwZGF0ZTogZnVuY3Rpb24gdXBkYXRlKHZhbHVlKSB7XG4gICAgICB2YXIgZWwgPSB0aGlzLmVsO1xuICAgICAgaWYgKGlzQXJyYXkodmFsdWUpKSB7XG4gICAgICAgIGVsLmNoZWNrZWQgPSBpbmRleE9mKHZhbHVlLCB0aGlzLmdldFZhbHVlKCkpID4gLTE7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpZiAoZWwuaGFzT3duUHJvcGVydHkoJ190cnVlVmFsdWUnKSkge1xuICAgICAgICAgIGVsLmNoZWNrZWQgPSBsb29zZUVxdWFsKHZhbHVlLCBlbC5fdHJ1ZVZhbHVlKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBlbC5jaGVja2VkID0gISF2YWx1ZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfTtcblxuICB2YXIgaGFuZGxlcnMgPSB7XG4gICAgdGV4dDogdGV4dCQyLFxuICAgIHJhZGlvOiByYWRpbyxcbiAgICBzZWxlY3Q6IHNlbGVjdCxcbiAgICBjaGVja2JveDogY2hlY2tib3hcbiAgfTtcblxuICB2YXIgbW9kZWwgPSB7XG5cbiAgICBwcmlvcml0eTogTU9ERUwsXG4gICAgdHdvV2F5OiB0cnVlLFxuICAgIGhhbmRsZXJzOiBoYW5kbGVycyxcbiAgICBwYXJhbXM6IFsnbGF6eScsICdudW1iZXInLCAnZGVib3VuY2UnXSxcblxuICAgIC8qKlxuICAgICAqIFBvc3NpYmxlIGVsZW1lbnRzOlxuICAgICAqICAgPHNlbGVjdD5cbiAgICAgKiAgIDx0ZXh0YXJlYT5cbiAgICAgKiAgIDxpbnB1dCB0eXBlPVwiKlwiPlxuICAgICAqICAgICAtIHRleHRcbiAgICAgKiAgICAgLSBjaGVja2JveFxuICAgICAqICAgICAtIHJhZGlvXG4gICAgICogICAgIC0gbnVtYmVyXG4gICAgICovXG5cbiAgICBiaW5kOiBmdW5jdGlvbiBiaW5kKCkge1xuICAgICAgLy8gZnJpZW5kbHkgd2FybmluZy4uLlxuICAgICAgdGhpcy5jaGVja0ZpbHRlcnMoKTtcbiAgICAgIGlmICh0aGlzLmhhc1JlYWQgJiYgIXRoaXMuaGFzV3JpdGUpIHtcbiAgICAgICAgJ2RldmVsb3BtZW50JyAhPT0gJ3Byb2R1Y3Rpb24nICYmIHdhcm4oJ0l0IHNlZW1zIHlvdSBhcmUgdXNpbmcgYSByZWFkLW9ubHkgZmlsdGVyIHdpdGggJyArICd2LW1vZGVsPVwiJyArIHRoaXMuZGVzY3JpcHRvci5yYXcgKyAnXCIuICcgKyAnWW91IG1pZ2h0IHdhbnQgdG8gdXNlIGEgdHdvLXdheSBmaWx0ZXIgdG8gZW5zdXJlIGNvcnJlY3QgYmVoYXZpb3IuJywgdGhpcy52bSk7XG4gICAgICB9XG4gICAgICB2YXIgZWwgPSB0aGlzLmVsO1xuICAgICAgdmFyIHRhZyA9IGVsLnRhZ05hbWU7XG4gICAgICB2YXIgaGFuZGxlcjtcbiAgICAgIGlmICh0YWcgPT09ICdJTlBVVCcpIHtcbiAgICAgICAgaGFuZGxlciA9IGhhbmRsZXJzW2VsLnR5cGVdIHx8IGhhbmRsZXJzLnRleHQ7XG4gICAgICB9IGVsc2UgaWYgKHRhZyA9PT0gJ1NFTEVDVCcpIHtcbiAgICAgICAgaGFuZGxlciA9IGhhbmRsZXJzLnNlbGVjdDtcbiAgICAgIH0gZWxzZSBpZiAodGFnID09PSAnVEVYVEFSRUEnKSB7XG4gICAgICAgIGhhbmRsZXIgPSBoYW5kbGVycy50ZXh0O1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgJ2RldmVsb3BtZW50JyAhPT0gJ3Byb2R1Y3Rpb24nICYmIHdhcm4oJ3YtbW9kZWwgZG9lcyBub3Qgc3VwcG9ydCBlbGVtZW50IHR5cGU6ICcgKyB0YWcsIHRoaXMudm0pO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBlbC5fX3ZfbW9kZWwgPSB0aGlzO1xuICAgICAgaGFuZGxlci5iaW5kLmNhbGwodGhpcyk7XG4gICAgICB0aGlzLnVwZGF0ZSA9IGhhbmRsZXIudXBkYXRlO1xuICAgICAgdGhpcy5fdW5iaW5kID0gaGFuZGxlci51bmJpbmQ7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIENoZWNrIHJlYWQvd3JpdGUgZmlsdGVyIHN0YXRzLlxuICAgICAqL1xuXG4gICAgY2hlY2tGaWx0ZXJzOiBmdW5jdGlvbiBjaGVja0ZpbHRlcnMoKSB7XG4gICAgICB2YXIgZmlsdGVycyA9IHRoaXMuZmlsdGVycztcbiAgICAgIGlmICghZmlsdGVycykgcmV0dXJuO1xuICAgICAgdmFyIGkgPSBmaWx0ZXJzLmxlbmd0aDtcbiAgICAgIHdoaWxlIChpLS0pIHtcbiAgICAgICAgdmFyIGZpbHRlciA9IHJlc29sdmVBc3NldCh0aGlzLnZtLiRvcHRpb25zLCAnZmlsdGVycycsIGZpbHRlcnNbaV0ubmFtZSk7XG4gICAgICAgIGlmICh0eXBlb2YgZmlsdGVyID09PSAnZnVuY3Rpb24nIHx8IGZpbHRlci5yZWFkKSB7XG4gICAgICAgICAgdGhpcy5oYXNSZWFkID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoZmlsdGVyLndyaXRlKSB7XG4gICAgICAgICAgdGhpcy5oYXNXcml0ZSA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9LFxuXG4gICAgdW5iaW5kOiBmdW5jdGlvbiB1bmJpbmQoKSB7XG4gICAgICB0aGlzLmVsLl9fdl9tb2RlbCA9IG51bGw7XG4gICAgICB0aGlzLl91bmJpbmQgJiYgdGhpcy5fdW5iaW5kKCk7XG4gICAgfVxuICB9O1xuXG4gIC8vIGtleUNvZGUgYWxpYXNlc1xuICB2YXIga2V5Q29kZXMgPSB7XG4gICAgZXNjOiAyNyxcbiAgICB0YWI6IDksXG4gICAgZW50ZXI6IDEzLFxuICAgIHNwYWNlOiAzMixcbiAgICAnZGVsZXRlJzogWzgsIDQ2XSxcbiAgICB1cDogMzgsXG4gICAgbGVmdDogMzcsXG4gICAgcmlnaHQ6IDM5LFxuICAgIGRvd246IDQwXG4gIH07XG5cbiAgZnVuY3Rpb24ga2V5RmlsdGVyKGhhbmRsZXIsIGtleXMpIHtcbiAgICB2YXIgY29kZXMgPSBrZXlzLm1hcChmdW5jdGlvbiAoa2V5KSB7XG4gICAgICB2YXIgY2hhckNvZGUgPSBrZXkuY2hhckNvZGVBdCgwKTtcbiAgICAgIGlmIChjaGFyQ29kZSA+IDQ3ICYmIGNoYXJDb2RlIDwgNTgpIHtcbiAgICAgICAgcmV0dXJuIHBhcnNlSW50KGtleSwgMTApO1xuICAgICAgfVxuICAgICAgaWYgKGtleS5sZW5ndGggPT09IDEpIHtcbiAgICAgICAgY2hhckNvZGUgPSBrZXkudG9VcHBlckNhc2UoKS5jaGFyQ29kZUF0KDApO1xuICAgICAgICBpZiAoY2hhckNvZGUgPiA2NCAmJiBjaGFyQ29kZSA8IDkxKSB7XG4gICAgICAgICAgcmV0dXJuIGNoYXJDb2RlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4ga2V5Q29kZXNba2V5XTtcbiAgICB9KTtcbiAgICBjb2RlcyA9IFtdLmNvbmNhdC5hcHBseShbXSwgY29kZXMpO1xuICAgIHJldHVybiBmdW5jdGlvbiBrZXlIYW5kbGVyKGUpIHtcbiAgICAgIGlmIChjb2Rlcy5pbmRleE9mKGUua2V5Q29kZSkgPiAtMSkge1xuICAgICAgICByZXR1cm4gaGFuZGxlci5jYWxsKHRoaXMsIGUpO1xuICAgICAgfVxuICAgIH07XG4gIH1cblxuICBmdW5jdGlvbiBzdG9wRmlsdGVyKGhhbmRsZXIpIHtcbiAgICByZXR1cm4gZnVuY3Rpb24gc3RvcEhhbmRsZXIoZSkge1xuICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgIHJldHVybiBoYW5kbGVyLmNhbGwodGhpcywgZSk7XG4gICAgfTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHByZXZlbnRGaWx0ZXIoaGFuZGxlcikge1xuICAgIHJldHVybiBmdW5jdGlvbiBwcmV2ZW50SGFuZGxlcihlKSB7XG4gICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICByZXR1cm4gaGFuZGxlci5jYWxsKHRoaXMsIGUpO1xuICAgIH07XG4gIH1cblxuICBmdW5jdGlvbiBzZWxmRmlsdGVyKGhhbmRsZXIpIHtcbiAgICByZXR1cm4gZnVuY3Rpb24gc2VsZkhhbmRsZXIoZSkge1xuICAgICAgaWYgKGUudGFyZ2V0ID09PSBlLmN1cnJlbnRUYXJnZXQpIHtcbiAgICAgICAgcmV0dXJuIGhhbmRsZXIuY2FsbCh0aGlzLCBlKTtcbiAgICAgIH1cbiAgICB9O1xuICB9XG5cbiAgdmFyIG9uJDEgPSB7XG5cbiAgICBwcmlvcml0eTogT04sXG4gICAgYWNjZXB0U3RhdGVtZW50OiB0cnVlLFxuICAgIGtleUNvZGVzOiBrZXlDb2RlcyxcblxuICAgIGJpbmQ6IGZ1bmN0aW9uIGJpbmQoKSB7XG4gICAgICAvLyBkZWFsIHdpdGggaWZyYW1lc1xuICAgICAgaWYgKHRoaXMuZWwudGFnTmFtZSA9PT0gJ0lGUkFNRScgJiYgdGhpcy5hcmcgIT09ICdsb2FkJykge1xuICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgICAgIHRoaXMuaWZyYW1lQmluZCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICBvbihzZWxmLmVsLmNvbnRlbnRXaW5kb3csIHNlbGYuYXJnLCBzZWxmLmhhbmRsZXIsIHNlbGYubW9kaWZpZXJzLmNhcHR1cmUpO1xuICAgICAgICB9O1xuICAgICAgICB0aGlzLm9uKCdsb2FkJywgdGhpcy5pZnJhbWVCaW5kKTtcbiAgICAgIH1cbiAgICB9LFxuXG4gICAgdXBkYXRlOiBmdW5jdGlvbiB1cGRhdGUoaGFuZGxlcikge1xuICAgICAgLy8gc3R1YiBhIG5vb3AgZm9yIHYtb24gd2l0aCBubyB2YWx1ZSxcbiAgICAgIC8vIGUuZy4gQG1vdXNlZG93bi5wcmV2ZW50XG4gICAgICBpZiAoIXRoaXMuZGVzY3JpcHRvci5yYXcpIHtcbiAgICAgICAgaGFuZGxlciA9IGZ1bmN0aW9uICgpIHt9O1xuICAgICAgfVxuXG4gICAgICBpZiAodHlwZW9mIGhhbmRsZXIgIT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgJ2RldmVsb3BtZW50JyAhPT0gJ3Byb2R1Y3Rpb24nICYmIHdhcm4oJ3Ytb246JyArIHRoaXMuYXJnICsgJz1cIicgKyB0aGlzLmV4cHJlc3Npb24gKyAnXCIgZXhwZWN0cyBhIGZ1bmN0aW9uIHZhbHVlLCAnICsgJ2dvdCAnICsgaGFuZGxlciwgdGhpcy52bSk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgLy8gYXBwbHkgbW9kaWZpZXJzXG4gICAgICBpZiAodGhpcy5tb2RpZmllcnMuc3RvcCkge1xuICAgICAgICBoYW5kbGVyID0gc3RvcEZpbHRlcihoYW5kbGVyKTtcbiAgICAgIH1cbiAgICAgIGlmICh0aGlzLm1vZGlmaWVycy5wcmV2ZW50KSB7XG4gICAgICAgIGhhbmRsZXIgPSBwcmV2ZW50RmlsdGVyKGhhbmRsZXIpO1xuICAgICAgfVxuICAgICAgaWYgKHRoaXMubW9kaWZpZXJzLnNlbGYpIHtcbiAgICAgICAgaGFuZGxlciA9IHNlbGZGaWx0ZXIoaGFuZGxlcik7XG4gICAgICB9XG4gICAgICAvLyBrZXkgZmlsdGVyXG4gICAgICB2YXIga2V5cyA9IE9iamVjdC5rZXlzKHRoaXMubW9kaWZpZXJzKS5maWx0ZXIoZnVuY3Rpb24gKGtleSkge1xuICAgICAgICByZXR1cm4ga2V5ICE9PSAnc3RvcCcgJiYga2V5ICE9PSAncHJldmVudCcgJiYga2V5ICE9PSAnc2VsZicgJiYga2V5ICE9PSAnY2FwdHVyZSc7XG4gICAgICB9KTtcbiAgICAgIGlmIChrZXlzLmxlbmd0aCkge1xuICAgICAgICBoYW5kbGVyID0ga2V5RmlsdGVyKGhhbmRsZXIsIGtleXMpO1xuICAgICAgfVxuXG4gICAgICB0aGlzLnJlc2V0KCk7XG4gICAgICB0aGlzLmhhbmRsZXIgPSBoYW5kbGVyO1xuXG4gICAgICBpZiAodGhpcy5pZnJhbWVCaW5kKSB7XG4gICAgICAgIHRoaXMuaWZyYW1lQmluZCgpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgb24odGhpcy5lbCwgdGhpcy5hcmcsIHRoaXMuaGFuZGxlciwgdGhpcy5tb2RpZmllcnMuY2FwdHVyZSk7XG4gICAgICB9XG4gICAgfSxcblxuICAgIHJlc2V0OiBmdW5jdGlvbiByZXNldCgpIHtcbiAgICAgIHZhciBlbCA9IHRoaXMuaWZyYW1lQmluZCA/IHRoaXMuZWwuY29udGVudFdpbmRvdyA6IHRoaXMuZWw7XG4gICAgICBpZiAodGhpcy5oYW5kbGVyKSB7XG4gICAgICAgIG9mZihlbCwgdGhpcy5hcmcsIHRoaXMuaGFuZGxlcik7XG4gICAgICB9XG4gICAgfSxcblxuICAgIHVuYmluZDogZnVuY3Rpb24gdW5iaW5kKCkge1xuICAgICAgdGhpcy5yZXNldCgpO1xuICAgIH1cbiAgfTtcblxuICB2YXIgcHJlZml4ZXMgPSBbJy13ZWJraXQtJywgJy1tb3otJywgJy1tcy0nXTtcbiAgdmFyIGNhbWVsUHJlZml4ZXMgPSBbJ1dlYmtpdCcsICdNb3onLCAnbXMnXTtcbiAgdmFyIGltcG9ydGFudFJFID0gLyFpbXBvcnRhbnQ7PyQvO1xuICB2YXIgcHJvcENhY2hlID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcblxuICB2YXIgdGVzdEVsID0gbnVsbDtcblxuICB2YXIgc3R5bGUgPSB7XG5cbiAgICBkZWVwOiB0cnVlLFxuXG4gICAgdXBkYXRlOiBmdW5jdGlvbiB1cGRhdGUodmFsdWUpIHtcbiAgICAgIGlmICh0eXBlb2YgdmFsdWUgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgIHRoaXMuZWwuc3R5bGUuY3NzVGV4dCA9IHZhbHVlO1xuICAgICAgfSBlbHNlIGlmIChpc0FycmF5KHZhbHVlKSkge1xuICAgICAgICB0aGlzLmhhbmRsZU9iamVjdCh2YWx1ZS5yZWR1Y2UoZXh0ZW5kLCB7fSkpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5oYW5kbGVPYmplY3QodmFsdWUgfHwge30pO1xuICAgICAgfVxuICAgIH0sXG5cbiAgICBoYW5kbGVPYmplY3Q6IGZ1bmN0aW9uIGhhbmRsZU9iamVjdCh2YWx1ZSkge1xuICAgICAgLy8gY2FjaGUgb2JqZWN0IHN0eWxlcyBzbyB0aGF0IG9ubHkgY2hhbmdlZCBwcm9wc1xuICAgICAgLy8gYXJlIGFjdHVhbGx5IHVwZGF0ZWQuXG4gICAgICB2YXIgY2FjaGUgPSB0aGlzLmNhY2hlIHx8ICh0aGlzLmNhY2hlID0ge30pO1xuICAgICAgdmFyIG5hbWUsIHZhbDtcbiAgICAgIGZvciAobmFtZSBpbiBjYWNoZSkge1xuICAgICAgICBpZiAoIShuYW1lIGluIHZhbHVlKSkge1xuICAgICAgICAgIHRoaXMuaGFuZGxlU2luZ2xlKG5hbWUsIG51bGwpO1xuICAgICAgICAgIGRlbGV0ZSBjYWNoZVtuYW1lXTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgZm9yIChuYW1lIGluIHZhbHVlKSB7XG4gICAgICAgIHZhbCA9IHZhbHVlW25hbWVdO1xuICAgICAgICBpZiAodmFsICE9PSBjYWNoZVtuYW1lXSkge1xuICAgICAgICAgIGNhY2hlW25hbWVdID0gdmFsO1xuICAgICAgICAgIHRoaXMuaGFuZGxlU2luZ2xlKG5hbWUsIHZhbCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9LFxuXG4gICAgaGFuZGxlU2luZ2xlOiBmdW5jdGlvbiBoYW5kbGVTaW5nbGUocHJvcCwgdmFsdWUpIHtcbiAgICAgIHByb3AgPSBub3JtYWxpemUocHJvcCk7XG4gICAgICBpZiAoIXByb3ApIHJldHVybjsgLy8gdW5zdXBwb3J0ZWQgcHJvcFxuICAgICAgLy8gY2FzdCBwb3NzaWJsZSBudW1iZXJzL2Jvb2xlYW5zIGludG8gc3RyaW5nc1xuICAgICAgaWYgKHZhbHVlICE9IG51bGwpIHZhbHVlICs9ICcnO1xuICAgICAgaWYgKHZhbHVlKSB7XG4gICAgICAgIHZhciBpc0ltcG9ydGFudCA9IGltcG9ydGFudFJFLnRlc3QodmFsdWUpID8gJ2ltcG9ydGFudCcgOiAnJztcbiAgICAgICAgaWYgKGlzSW1wb3J0YW50KSB7XG4gICAgICAgICAgLyogaXN0YW5idWwgaWdub3JlIGlmICovXG4gICAgICAgICAgaWYgKCdkZXZlbG9wbWVudCcgIT09ICdwcm9kdWN0aW9uJykge1xuICAgICAgICAgICAgd2FybignSXRcXCdzIHByb2JhYmx5IGEgYmFkIGlkZWEgdG8gdXNlICFpbXBvcnRhbnQgd2l0aCBpbmxpbmUgcnVsZXMuICcgKyAnVGhpcyBmZWF0dXJlIHdpbGwgYmUgZGVwcmVjYXRlZCBpbiBhIGZ1dHVyZSB2ZXJzaW9uIG9mIFZ1ZS4nKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgdmFsdWUgPSB2YWx1ZS5yZXBsYWNlKGltcG9ydGFudFJFLCAnJykudHJpbSgpO1xuICAgICAgICAgIHRoaXMuZWwuc3R5bGUuc2V0UHJvcGVydHkocHJvcC5rZWJhYiwgdmFsdWUsIGlzSW1wb3J0YW50KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aGlzLmVsLnN0eWxlW3Byb3AuY2FtZWxdID0gdmFsdWU7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuZWwuc3R5bGVbcHJvcC5jYW1lbF0gPSAnJztcbiAgICAgIH1cbiAgICB9XG5cbiAgfTtcblxuICAvKipcbiAgICogTm9ybWFsaXplIGEgQ1NTIHByb3BlcnR5IG5hbWUuXG4gICAqIC0gY2FjaGUgcmVzdWx0XG4gICAqIC0gYXV0byBwcmVmaXhcbiAgICogLSBjYW1lbENhc2UgLT4gZGFzaC1jYXNlXG4gICAqXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBwcm9wXG4gICAqIEByZXR1cm4ge1N0cmluZ31cbiAgICovXG5cbiAgZnVuY3Rpb24gbm9ybWFsaXplKHByb3ApIHtcbiAgICBpZiAocHJvcENhY2hlW3Byb3BdKSB7XG4gICAgICByZXR1cm4gcHJvcENhY2hlW3Byb3BdO1xuICAgIH1cbiAgICB2YXIgcmVzID0gcHJlZml4KHByb3ApO1xuICAgIHByb3BDYWNoZVtwcm9wXSA9IHByb3BDYWNoZVtyZXNdID0gcmVzO1xuICAgIHJldHVybiByZXM7XG4gIH1cblxuICAvKipcbiAgICogQXV0byBkZXRlY3QgdGhlIGFwcHJvcHJpYXRlIHByZWZpeCBmb3IgYSBDU1MgcHJvcGVydHkuXG4gICAqIGh0dHBzOi8vZ2lzdC5naXRodWIuY29tL3BhdWxpcmlzaC81MjM2OTJcbiAgICpcbiAgICogQHBhcmFtIHtTdHJpbmd9IHByb3BcbiAgICogQHJldHVybiB7U3RyaW5nfVxuICAgKi9cblxuICBmdW5jdGlvbiBwcmVmaXgocHJvcCkge1xuICAgIHByb3AgPSBoeXBoZW5hdGUocHJvcCk7XG4gICAgdmFyIGNhbWVsID0gY2FtZWxpemUocHJvcCk7XG4gICAgdmFyIHVwcGVyID0gY2FtZWwuY2hhckF0KDApLnRvVXBwZXJDYXNlKCkgKyBjYW1lbC5zbGljZSgxKTtcbiAgICBpZiAoIXRlc3RFbCkge1xuICAgICAgdGVzdEVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgfVxuICAgIHZhciBpID0gcHJlZml4ZXMubGVuZ3RoO1xuICAgIHZhciBwcmVmaXhlZDtcbiAgICBpZiAoY2FtZWwgIT09ICdmaWx0ZXInICYmIGNhbWVsIGluIHRlc3RFbC5zdHlsZSkge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAga2ViYWI6IHByb3AsXG4gICAgICAgIGNhbWVsOiBjYW1lbFxuICAgICAgfTtcbiAgICB9XG4gICAgd2hpbGUgKGktLSkge1xuICAgICAgcHJlZml4ZWQgPSBjYW1lbFByZWZpeGVzW2ldICsgdXBwZXI7XG4gICAgICBpZiAocHJlZml4ZWQgaW4gdGVzdEVsLnN0eWxlKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAga2ViYWI6IHByZWZpeGVzW2ldICsgcHJvcCxcbiAgICAgICAgICBjYW1lbDogcHJlZml4ZWRcbiAgICAgICAgfTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvLyB4bGlua1xuICB2YXIgeGxpbmtOUyA9ICdodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rJztcbiAgdmFyIHhsaW5rUkUgPSAvXnhsaW5rOi87XG5cbiAgLy8gY2hlY2sgZm9yIGF0dHJpYnV0ZXMgdGhhdCBwcm9oaWJpdCBpbnRlcnBvbGF0aW9uc1xuICB2YXIgZGlzYWxsb3dlZEludGVycEF0dHJSRSA9IC9edi18Xjp8XkB8Xig/OmlzfHRyYW5zaXRpb258dHJhbnNpdGlvbi1tb2RlfGRlYm91bmNlfHRyYWNrLWJ5fHN0YWdnZXJ8ZW50ZXItc3RhZ2dlcnxsZWF2ZS1zdGFnZ2VyKSQvO1xuICAvLyB0aGVzZSBhdHRyaWJ1dGVzIHNob3VsZCBhbHNvIHNldCB0aGVpciBjb3JyZXNwb25kaW5nIHByb3BlcnRpZXNcbiAgLy8gYmVjYXVzZSB0aGV5IG9ubHkgYWZmZWN0IHRoZSBpbml0aWFsIHN0YXRlIG9mIHRoZSBlbGVtZW50XG4gIHZhciBhdHRyV2l0aFByb3BzUkUgPSAvXig/OnZhbHVlfGNoZWNrZWR8c2VsZWN0ZWR8bXV0ZWQpJC87XG4gIC8vIHRoZXNlIGF0dHJpYnV0ZXMgZXhwZWN0IGVudW1yYXRlZCB2YWx1ZXMgb2YgXCJ0cnVlXCIgb3IgXCJmYWxzZVwiXG4gIC8vIGJ1dCBhcmUgbm90IGJvb2xlYW4gYXR0cmlidXRlc1xuICB2YXIgZW51bWVyYXRlZEF0dHJSRSA9IC9eKD86ZHJhZ2dhYmxlfGNvbnRlbnRlZGl0YWJsZXxzcGVsbGNoZWNrKSQvO1xuXG4gIC8vIHRoZXNlIGF0dHJpYnV0ZXMgc2hvdWxkIHNldCBhIGhpZGRlbiBwcm9wZXJ0eSBmb3JcbiAgLy8gYmluZGluZyB2LW1vZGVsIHRvIG9iamVjdCB2YWx1ZXNcbiAgdmFyIG1vZGVsUHJvcHMgPSB7XG4gICAgdmFsdWU6ICdfdmFsdWUnLFxuICAgICd0cnVlLXZhbHVlJzogJ190cnVlVmFsdWUnLFxuICAgICdmYWxzZS12YWx1ZSc6ICdfZmFsc2VWYWx1ZSdcbiAgfTtcblxuICB2YXIgYmluZCQxID0ge1xuXG4gICAgcHJpb3JpdHk6IEJJTkQsXG5cbiAgICBiaW5kOiBmdW5jdGlvbiBiaW5kKCkge1xuICAgICAgdmFyIGF0dHIgPSB0aGlzLmFyZztcbiAgICAgIHZhciB0YWcgPSB0aGlzLmVsLnRhZ05hbWU7XG4gICAgICAvLyBzaG91bGQgYmUgZGVlcCB3YXRjaCBvbiBvYmplY3QgbW9kZVxuICAgICAgaWYgKCFhdHRyKSB7XG4gICAgICAgIHRoaXMuZGVlcCA9IHRydWU7XG4gICAgICB9XG4gICAgICAvLyBoYW5kbGUgaW50ZXJwb2xhdGlvbiBiaW5kaW5nc1xuICAgICAgdmFyIGRlc2NyaXB0b3IgPSB0aGlzLmRlc2NyaXB0b3I7XG4gICAgICB2YXIgdG9rZW5zID0gZGVzY3JpcHRvci5pbnRlcnA7XG4gICAgICBpZiAodG9rZW5zKSB7XG4gICAgICAgIC8vIGhhbmRsZSBpbnRlcnBvbGF0aW9ucyB3aXRoIG9uZS10aW1lIHRva2Vuc1xuICAgICAgICBpZiAoZGVzY3JpcHRvci5oYXNPbmVUaW1lKSB7XG4gICAgICAgICAgdGhpcy5leHByZXNzaW9uID0gdG9rZW5zVG9FeHAodG9rZW5zLCB0aGlzLl9zY29wZSB8fCB0aGlzLnZtKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIG9ubHkgYWxsb3cgYmluZGluZyBvbiBuYXRpdmUgYXR0cmlidXRlc1xuICAgICAgICBpZiAoZGlzYWxsb3dlZEludGVycEF0dHJSRS50ZXN0KGF0dHIpIHx8IGF0dHIgPT09ICduYW1lJyAmJiAodGFnID09PSAnUEFSVElBTCcgfHwgdGFnID09PSAnU0xPVCcpKSB7XG4gICAgICAgICAgJ2RldmVsb3BtZW50JyAhPT0gJ3Byb2R1Y3Rpb24nICYmIHdhcm4oYXR0ciArICc9XCInICsgZGVzY3JpcHRvci5yYXcgKyAnXCI6ICcgKyAnYXR0cmlidXRlIGludGVycG9sYXRpb24gaXMgbm90IGFsbG93ZWQgaW4gVnVlLmpzICcgKyAnZGlyZWN0aXZlcyBhbmQgc3BlY2lhbCBhdHRyaWJ1dGVzLicsIHRoaXMudm0pO1xuICAgICAgICAgIHRoaXMuZWwucmVtb3ZlQXR0cmlidXRlKGF0dHIpO1xuICAgICAgICAgIHRoaXMuaW52YWxpZCA9IHRydWU7XG4gICAgICAgIH1cblxuICAgICAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgaWYgKi9cbiAgICAgICAgaWYgKCdkZXZlbG9wbWVudCcgIT09ICdwcm9kdWN0aW9uJykge1xuICAgICAgICAgIHZhciByYXcgPSBhdHRyICsgJz1cIicgKyBkZXNjcmlwdG9yLnJhdyArICdcIjogJztcbiAgICAgICAgICAvLyB3YXJuIHNyY1xuICAgICAgICAgIGlmIChhdHRyID09PSAnc3JjJykge1xuICAgICAgICAgICAgd2FybihyYXcgKyAnaW50ZXJwb2xhdGlvbiBpbiBcInNyY1wiIGF0dHJpYnV0ZSB3aWxsIGNhdXNlICcgKyAnYSA0MDQgcmVxdWVzdC4gVXNlIHYtYmluZDpzcmMgaW5zdGVhZC4nLCB0aGlzLnZtKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICAvLyB3YXJuIHN0eWxlXG4gICAgICAgICAgaWYgKGF0dHIgPT09ICdzdHlsZScpIHtcbiAgICAgICAgICAgIHdhcm4ocmF3ICsgJ2ludGVycG9sYXRpb24gaW4gXCJzdHlsZVwiIGF0dHJpYnV0ZSB3aWxsIGNhdXNlICcgKyAndGhlIGF0dHJpYnV0ZSB0byBiZSBkaXNjYXJkZWQgaW4gSW50ZXJuZXQgRXhwbG9yZXIuICcgKyAnVXNlIHYtYmluZDpzdHlsZSBpbnN0ZWFkLicsIHRoaXMudm0pO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0sXG5cbiAgICB1cGRhdGU6IGZ1bmN0aW9uIHVwZGF0ZSh2YWx1ZSkge1xuICAgICAgaWYgKHRoaXMuaW52YWxpZCkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICB2YXIgYXR0ciA9IHRoaXMuYXJnO1xuICAgICAgaWYgKHRoaXMuYXJnKSB7XG4gICAgICAgIHRoaXMuaGFuZGxlU2luZ2xlKGF0dHIsIHZhbHVlKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuaGFuZGxlT2JqZWN0KHZhbHVlIHx8IHt9KTtcbiAgICAgIH1cbiAgICB9LFxuXG4gICAgLy8gc2hhcmUgb2JqZWN0IGhhbmRsZXIgd2l0aCB2LWJpbmQ6Y2xhc3NcbiAgICBoYW5kbGVPYmplY3Q6IHN0eWxlLmhhbmRsZU9iamVjdCxcblxuICAgIGhhbmRsZVNpbmdsZTogZnVuY3Rpb24gaGFuZGxlU2luZ2xlKGF0dHIsIHZhbHVlKSB7XG4gICAgICB2YXIgZWwgPSB0aGlzLmVsO1xuICAgICAgdmFyIGludGVycCA9IHRoaXMuZGVzY3JpcHRvci5pbnRlcnA7XG4gICAgICBpZiAodGhpcy5tb2RpZmllcnMuY2FtZWwpIHtcbiAgICAgICAgYXR0ciA9IGNhbWVsaXplKGF0dHIpO1xuICAgICAgfVxuICAgICAgaWYgKCFpbnRlcnAgJiYgYXR0cldpdGhQcm9wc1JFLnRlc3QoYXR0cikgJiYgYXR0ciBpbiBlbCkge1xuICAgICAgICB2YXIgYXR0clZhbHVlID0gYXR0ciA9PT0gJ3ZhbHVlJyA/IHZhbHVlID09IG51bGwgLy8gSUU5IHdpbGwgc2V0IGlucHV0LnZhbHVlIHRvIFwibnVsbFwiIGZvciBudWxsLi4uXG4gICAgICAgID8gJycgOiB2YWx1ZSA6IHZhbHVlO1xuXG4gICAgICAgIGlmIChlbFthdHRyXSAhPT0gYXR0clZhbHVlKSB7XG4gICAgICAgICAgZWxbYXR0cl0gPSBhdHRyVmFsdWU7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIC8vIHNldCBtb2RlbCBwcm9wc1xuICAgICAgdmFyIG1vZGVsUHJvcCA9IG1vZGVsUHJvcHNbYXR0cl07XG4gICAgICBpZiAoIWludGVycCAmJiBtb2RlbFByb3ApIHtcbiAgICAgICAgZWxbbW9kZWxQcm9wXSA9IHZhbHVlO1xuICAgICAgICAvLyB1cGRhdGUgdi1tb2RlbCBpZiBwcmVzZW50XG4gICAgICAgIHZhciBtb2RlbCA9IGVsLl9fdl9tb2RlbDtcbiAgICAgICAgaWYgKG1vZGVsKSB7XG4gICAgICAgICAgbW9kZWwubGlzdGVuZXIoKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgLy8gZG8gbm90IHNldCB2YWx1ZSBhdHRyaWJ1dGUgZm9yIHRleHRhcmVhXG4gICAgICBpZiAoYXR0ciA9PT0gJ3ZhbHVlJyAmJiBlbC50YWdOYW1lID09PSAnVEVYVEFSRUEnKSB7XG4gICAgICAgIGVsLnJlbW92ZUF0dHJpYnV0ZShhdHRyKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgLy8gdXBkYXRlIGF0dHJpYnV0ZVxuICAgICAgaWYgKGVudW1lcmF0ZWRBdHRyUkUudGVzdChhdHRyKSkge1xuICAgICAgICBlbC5zZXRBdHRyaWJ1dGUoYXR0ciwgdmFsdWUgPyAndHJ1ZScgOiAnZmFsc2UnKTtcbiAgICAgIH0gZWxzZSBpZiAodmFsdWUgIT0gbnVsbCAmJiB2YWx1ZSAhPT0gZmFsc2UpIHtcbiAgICAgICAgaWYgKGF0dHIgPT09ICdjbGFzcycpIHtcbiAgICAgICAgICAvLyBoYW5kbGUgZWRnZSBjYXNlICMxOTYwOlxuICAgICAgICAgIC8vIGNsYXNzIGludGVycG9sYXRpb24gc2hvdWxkIG5vdCBvdmVyd3JpdGUgVnVlIHRyYW5zaXRpb24gY2xhc3NcbiAgICAgICAgICBpZiAoZWwuX192X3RyYW5zKSB7XG4gICAgICAgICAgICB2YWx1ZSArPSAnICcgKyBlbC5fX3ZfdHJhbnMuaWQgKyAnLXRyYW5zaXRpb24nO1xuICAgICAgICAgIH1cbiAgICAgICAgICBzZXRDbGFzcyhlbCwgdmFsdWUpO1xuICAgICAgICB9IGVsc2UgaWYgKHhsaW5rUkUudGVzdChhdHRyKSkge1xuICAgICAgICAgIGVsLnNldEF0dHJpYnV0ZU5TKHhsaW5rTlMsIGF0dHIsIHZhbHVlID09PSB0cnVlID8gJycgOiB2YWx1ZSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgZWwuc2V0QXR0cmlidXRlKGF0dHIsIHZhbHVlID09PSB0cnVlID8gJycgOiB2YWx1ZSk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGVsLnJlbW92ZUF0dHJpYnV0ZShhdHRyKTtcbiAgICAgIH1cbiAgICB9XG4gIH07XG5cbiAgdmFyIGVsID0ge1xuXG4gICAgcHJpb3JpdHk6IEVMLFxuXG4gICAgYmluZDogZnVuY3Rpb24gYmluZCgpIHtcbiAgICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBpZiAqL1xuICAgICAgaWYgKCF0aGlzLmFyZykge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICB2YXIgaWQgPSB0aGlzLmlkID0gY2FtZWxpemUodGhpcy5hcmcpO1xuICAgICAgdmFyIHJlZnMgPSAodGhpcy5fc2NvcGUgfHwgdGhpcy52bSkuJGVscztcbiAgICAgIGlmIChoYXNPd24ocmVmcywgaWQpKSB7XG4gICAgICAgIHJlZnNbaWRdID0gdGhpcy5lbDtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGRlZmluZVJlYWN0aXZlKHJlZnMsIGlkLCB0aGlzLmVsKTtcbiAgICAgIH1cbiAgICB9LFxuXG4gICAgdW5iaW5kOiBmdW5jdGlvbiB1bmJpbmQoKSB7XG4gICAgICB2YXIgcmVmcyA9ICh0aGlzLl9zY29wZSB8fCB0aGlzLnZtKS4kZWxzO1xuICAgICAgaWYgKHJlZnNbdGhpcy5pZF0gPT09IHRoaXMuZWwpIHtcbiAgICAgICAgcmVmc1t0aGlzLmlkXSA9IG51bGw7XG4gICAgICB9XG4gICAgfVxuICB9O1xuXG4gIHZhciByZWYgPSB7XG4gICAgYmluZDogZnVuY3Rpb24gYmluZCgpIHtcbiAgICAgICdkZXZlbG9wbWVudCcgIT09ICdwcm9kdWN0aW9uJyAmJiB3YXJuKCd2LXJlZjonICsgdGhpcy5hcmcgKyAnIG11c3QgYmUgdXNlZCBvbiBhIGNoaWxkICcgKyAnY29tcG9uZW50LiBGb3VuZCBvbiA8JyArIHRoaXMuZWwudGFnTmFtZS50b0xvd2VyQ2FzZSgpICsgJz4uJywgdGhpcy52bSk7XG4gICAgfVxuICB9O1xuXG4gIHZhciBjbG9hayA9IHtcbiAgICBiaW5kOiBmdW5jdGlvbiBiaW5kKCkge1xuICAgICAgdmFyIGVsID0gdGhpcy5lbDtcbiAgICAgIHRoaXMudm0uJG9uY2UoJ3ByZS1ob29rOmNvbXBpbGVkJywgZnVuY3Rpb24gKCkge1xuICAgICAgICBlbC5yZW1vdmVBdHRyaWJ1dGUoJ3YtY2xvYWsnKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfTtcblxuICAvLyBtdXN0IGV4cG9ydCBwbGFpbiBvYmplY3RcbiAgdmFyIGRpcmVjdGl2ZXMgPSB7XG4gICAgdGV4dDogdGV4dCQxLFxuICAgIGh0bWw6IGh0bWwsXG4gICAgJ2Zvcic6IHZGb3IsXG4gICAgJ2lmJzogdklmLFxuICAgIHNob3c6IHNob3csXG4gICAgbW9kZWw6IG1vZGVsLFxuICAgIG9uOiBvbiQxLFxuICAgIGJpbmQ6IGJpbmQkMSxcbiAgICBlbDogZWwsXG4gICAgcmVmOiByZWYsXG4gICAgY2xvYWs6IGNsb2FrXG4gIH07XG5cbiAgdmFyIHZDbGFzcyA9IHtcblxuICAgIGRlZXA6IHRydWUsXG5cbiAgICB1cGRhdGU6IGZ1bmN0aW9uIHVwZGF0ZSh2YWx1ZSkge1xuICAgICAgaWYgKCF2YWx1ZSkge1xuICAgICAgICB0aGlzLmNsZWFudXAoKTtcbiAgICAgIH0gZWxzZSBpZiAodHlwZW9mIHZhbHVlID09PSAnc3RyaW5nJykge1xuICAgICAgICB0aGlzLnNldENsYXNzKHZhbHVlLnRyaW0oKS5zcGxpdCgvXFxzKy8pKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuc2V0Q2xhc3Mobm9ybWFsaXplJDEodmFsdWUpKTtcbiAgICAgIH1cbiAgICB9LFxuXG4gICAgc2V0Q2xhc3M6IGZ1bmN0aW9uIHNldENsYXNzKHZhbHVlKSB7XG4gICAgICB0aGlzLmNsZWFudXAodmFsdWUpO1xuICAgICAgZm9yICh2YXIgaSA9IDAsIGwgPSB2YWx1ZS5sZW5ndGg7IGkgPCBsOyBpKyspIHtcbiAgICAgICAgdmFyIHZhbCA9IHZhbHVlW2ldO1xuICAgICAgICBpZiAodmFsKSB7XG4gICAgICAgICAgYXBwbHkodGhpcy5lbCwgdmFsLCBhZGRDbGFzcyk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHRoaXMucHJldktleXMgPSB2YWx1ZTtcbiAgICB9LFxuXG4gICAgY2xlYW51cDogZnVuY3Rpb24gY2xlYW51cCh2YWx1ZSkge1xuICAgICAgdmFyIHByZXZLZXlzID0gdGhpcy5wcmV2S2V5cztcbiAgICAgIGlmICghcHJldktleXMpIHJldHVybjtcbiAgICAgIHZhciBpID0gcHJldktleXMubGVuZ3RoO1xuICAgICAgd2hpbGUgKGktLSkge1xuICAgICAgICB2YXIga2V5ID0gcHJldktleXNbaV07XG4gICAgICAgIGlmICghdmFsdWUgfHwgdmFsdWUuaW5kZXhPZihrZXkpIDwgMCkge1xuICAgICAgICAgIGFwcGx5KHRoaXMuZWwsIGtleSwgcmVtb3ZlQ2xhc3MpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9O1xuXG4gIC8qKlxuICAgKiBOb3JtYWxpemUgb2JqZWN0cyBhbmQgYXJyYXlzIChwb3RlbnRpYWxseSBjb250YWluaW5nIG9iamVjdHMpXG4gICAqIGludG8gYXJyYXkgb2Ygc3RyaW5ncy5cbiAgICpcbiAgICogQHBhcmFtIHtPYmplY3R8QXJyYXk8U3RyaW5nfE9iamVjdD59IHZhbHVlXG4gICAqIEByZXR1cm4ge0FycmF5PFN0cmluZz59XG4gICAqL1xuXG4gIGZ1bmN0aW9uIG5vcm1hbGl6ZSQxKHZhbHVlKSB7XG4gICAgdmFyIHJlcyA9IFtdO1xuICAgIGlmIChpc0FycmF5KHZhbHVlKSkge1xuICAgICAgZm9yICh2YXIgaSA9IDAsIGwgPSB2YWx1ZS5sZW5ndGg7IGkgPCBsOyBpKyspIHtcbiAgICAgICAgdmFyIF9rZXkgPSB2YWx1ZVtpXTtcbiAgICAgICAgaWYgKF9rZXkpIHtcbiAgICAgICAgICBpZiAodHlwZW9mIF9rZXkgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICByZXMucHVzaChfa2V5KTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZm9yICh2YXIgayBpbiBfa2V5KSB7XG4gICAgICAgICAgICAgIGlmIChfa2V5W2tdKSByZXMucHVzaChrKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKGlzT2JqZWN0KHZhbHVlKSkge1xuICAgICAgZm9yICh2YXIga2V5IGluIHZhbHVlKSB7XG4gICAgICAgIGlmICh2YWx1ZVtrZXldKSByZXMucHVzaChrZXkpO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gcmVzO1xuICB9XG5cbiAgLyoqXG4gICAqIEFkZCBvciByZW1vdmUgYSBjbGFzcy9jbGFzc2VzIG9uIGFuIGVsZW1lbnRcbiAgICpcbiAgICogQHBhcmFtIHtFbGVtZW50fSBlbFxuICAgKiBAcGFyYW0ge1N0cmluZ30ga2V5IFRoZSBjbGFzcyBuYW1lLiBUaGlzIG1heSBvciBtYXkgbm90XG4gICAqICAgICAgICAgICAgICAgICAgICAgY29udGFpbiBhIHNwYWNlIGNoYXJhY3RlciwgaW4gc3VjaCBhXG4gICAqICAgICAgICAgICAgICAgICAgICAgY2FzZSB3ZSdsbCBkZWFsIHdpdGggbXVsdGlwbGUgY2xhc3NcbiAgICogICAgICAgICAgICAgICAgICAgICBuYW1lcyBhdCBvbmNlLlxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBmblxuICAgKi9cblxuICBmdW5jdGlvbiBhcHBseShlbCwga2V5LCBmbikge1xuICAgIGtleSA9IGtleS50cmltKCk7XG4gICAgaWYgKGtleS5pbmRleE9mKCcgJykgPT09IC0xKSB7XG4gICAgICBmbihlbCwga2V5KTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgLy8gVGhlIGtleSBjb250YWlucyBvbmUgb3IgbW9yZSBzcGFjZSBjaGFyYWN0ZXJzLlxuICAgIC8vIFNpbmNlIGEgY2xhc3MgbmFtZSBkb2Vzbid0IGFjY2VwdCBzdWNoIGNoYXJhY3RlcnMsIHdlXG4gICAgLy8gdHJlYXQgaXQgYXMgbXVsdGlwbGUgY2xhc3Nlcy5cbiAgICB2YXIga2V5cyA9IGtleS5zcGxpdCgvXFxzKy8pO1xuICAgIGZvciAodmFyIGkgPSAwLCBsID0ga2V5cy5sZW5ndGg7IGkgPCBsOyBpKyspIHtcbiAgICAgIGZuKGVsLCBrZXlzW2ldKTtcbiAgICB9XG4gIH1cblxuICB2YXIgY29tcG9uZW50ID0ge1xuXG4gICAgcHJpb3JpdHk6IENPTVBPTkVOVCxcblxuICAgIHBhcmFtczogWydrZWVwLWFsaXZlJywgJ3RyYW5zaXRpb24tbW9kZScsICdpbmxpbmUtdGVtcGxhdGUnXSxcblxuICAgIC8qKlxuICAgICAqIFNldHVwLiBUd28gcG9zc2libGUgdXNhZ2VzOlxuICAgICAqXG4gICAgICogLSBzdGF0aWM6XG4gICAgICogICA8Y29tcD4gb3IgPGRpdiB2LWNvbXBvbmVudD1cImNvbXBcIj5cbiAgICAgKlxuICAgICAqIC0gZHluYW1pYzpcbiAgICAgKiAgIDxjb21wb25lbnQgOmlzPVwidmlld1wiPlxuICAgICAqL1xuXG4gICAgYmluZDogZnVuY3Rpb24gYmluZCgpIHtcbiAgICAgIGlmICghdGhpcy5lbC5fX3Z1ZV9fKSB7XG4gICAgICAgIC8vIGtlZXAtYWxpdmUgY2FjaGVcbiAgICAgICAgdGhpcy5rZWVwQWxpdmUgPSB0aGlzLnBhcmFtcy5rZWVwQWxpdmU7XG4gICAgICAgIGlmICh0aGlzLmtlZXBBbGl2ZSkge1xuICAgICAgICAgIHRoaXMuY2FjaGUgPSB7fTtcbiAgICAgICAgfVxuICAgICAgICAvLyBjaGVjayBpbmxpbmUtdGVtcGxhdGVcbiAgICAgICAgaWYgKHRoaXMucGFyYW1zLmlubGluZVRlbXBsYXRlKSB7XG4gICAgICAgICAgLy8gZXh0cmFjdCBpbmxpbmUgdGVtcGxhdGUgYXMgYSBEb2N1bWVudEZyYWdtZW50XG4gICAgICAgICAgdGhpcy5pbmxpbmVUZW1wbGF0ZSA9IGV4dHJhY3RDb250ZW50KHRoaXMuZWwsIHRydWUpO1xuICAgICAgICB9XG4gICAgICAgIC8vIGNvbXBvbmVudCByZXNvbHV0aW9uIHJlbGF0ZWQgc3RhdGVcbiAgICAgICAgdGhpcy5wZW5kaW5nQ29tcG9uZW50Q2IgPSB0aGlzLkNvbXBvbmVudCA9IG51bGw7XG4gICAgICAgIC8vIHRyYW5zaXRpb24gcmVsYXRlZCBzdGF0ZVxuICAgICAgICB0aGlzLnBlbmRpbmdSZW1vdmFscyA9IDA7XG4gICAgICAgIHRoaXMucGVuZGluZ1JlbW92YWxDYiA9IG51bGw7XG4gICAgICAgIC8vIGNyZWF0ZSBhIHJlZiBhbmNob3JcbiAgICAgICAgdGhpcy5hbmNob3IgPSBjcmVhdGVBbmNob3IoJ3YtY29tcG9uZW50Jyk7XG4gICAgICAgIHJlcGxhY2UodGhpcy5lbCwgdGhpcy5hbmNob3IpO1xuICAgICAgICAvLyByZW1vdmUgaXMgYXR0cmlidXRlLlxuICAgICAgICAvLyB0aGlzIGlzIHJlbW92ZWQgZHVyaW5nIGNvbXBpbGF0aW9uLCBidXQgYmVjYXVzZSBjb21waWxhdGlvbiBpc1xuICAgICAgICAvLyBjYWNoZWQsIHdoZW4gdGhlIGNvbXBvbmVudCBpcyB1c2VkIGVsc2V3aGVyZSB0aGlzIGF0dHJpYnV0ZVxuICAgICAgICAvLyB3aWxsIHJlbWFpbiBhdCBsaW5rIHRpbWUuXG4gICAgICAgIHRoaXMuZWwucmVtb3ZlQXR0cmlidXRlKCdpcycpO1xuICAgICAgICB0aGlzLmVsLnJlbW92ZUF0dHJpYnV0ZSgnOmlzJyk7XG4gICAgICAgIC8vIHJlbW92ZSByZWYsIHNhbWUgYXMgYWJvdmVcbiAgICAgICAgaWYgKHRoaXMuZGVzY3JpcHRvci5yZWYpIHtcbiAgICAgICAgICB0aGlzLmVsLnJlbW92ZUF0dHJpYnV0ZSgndi1yZWY6JyArIGh5cGhlbmF0ZSh0aGlzLmRlc2NyaXB0b3IucmVmKSk7XG4gICAgICAgIH1cbiAgICAgICAgLy8gaWYgc3RhdGljLCBidWlsZCByaWdodCBub3cuXG4gICAgICAgIGlmICh0aGlzLmxpdGVyYWwpIHtcbiAgICAgICAgICB0aGlzLnNldENvbXBvbmVudCh0aGlzLmV4cHJlc3Npb24pO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAnZGV2ZWxvcG1lbnQnICE9PSAncHJvZHVjdGlvbicgJiYgd2FybignY2Fubm90IG1vdW50IGNvbXBvbmVudCBcIicgKyB0aGlzLmV4cHJlc3Npb24gKyAnXCIgJyArICdvbiBhbHJlYWR5IG1vdW50ZWQgZWxlbWVudDogJyArIHRoaXMuZWwpO1xuICAgICAgfVxuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBQdWJsaWMgdXBkYXRlLCBjYWxsZWQgYnkgdGhlIHdhdGNoZXIgaW4gdGhlIGR5bmFtaWNcbiAgICAgKiBsaXRlcmFsIHNjZW5hcmlvLCBlLmcuIDxjb21wb25lbnQgOmlzPVwidmlld1wiPlxuICAgICAqL1xuXG4gICAgdXBkYXRlOiBmdW5jdGlvbiB1cGRhdGUodmFsdWUpIHtcbiAgICAgIGlmICghdGhpcy5saXRlcmFsKSB7XG4gICAgICAgIHRoaXMuc2V0Q29tcG9uZW50KHZhbHVlKTtcbiAgICAgIH1cbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogU3dpdGNoIGR5bmFtaWMgY29tcG9uZW50cy4gTWF5IHJlc29sdmUgdGhlIGNvbXBvbmVudFxuICAgICAqIGFzeW5jaHJvbm91c2x5LCBhbmQgcGVyZm9ybSB0cmFuc2l0aW9uIGJhc2VkIG9uXG4gICAgICogc3BlY2lmaWVkIHRyYW5zaXRpb24gbW9kZS4gQWNjZXB0cyBhIGZldyBhZGRpdGlvbmFsXG4gICAgICogYXJndW1lbnRzIHNwZWNpZmljYWxseSBmb3IgdnVlLXJvdXRlci5cbiAgICAgKlxuICAgICAqIFRoZSBjYWxsYmFjayBpcyBjYWxsZWQgd2hlbiB0aGUgZnVsbCB0cmFuc2l0aW9uIGlzXG4gICAgICogZmluaXNoZWQuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gdmFsdWVcbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBbY2JdXG4gICAgICovXG5cbiAgICBzZXRDb21wb25lbnQ6IGZ1bmN0aW9uIHNldENvbXBvbmVudCh2YWx1ZSwgY2IpIHtcbiAgICAgIHRoaXMuaW52YWxpZGF0ZVBlbmRpbmcoKTtcbiAgICAgIGlmICghdmFsdWUpIHtcbiAgICAgICAgLy8ganVzdCByZW1vdmUgY3VycmVudFxuICAgICAgICB0aGlzLnVuYnVpbGQodHJ1ZSk7XG4gICAgICAgIHRoaXMucmVtb3ZlKHRoaXMuY2hpbGRWTSwgY2IpO1xuICAgICAgICB0aGlzLmNoaWxkVk0gPSBudWxsO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgICAgICB0aGlzLnJlc29sdmVDb21wb25lbnQodmFsdWUsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICBzZWxmLm1vdW50Q29tcG9uZW50KGNiKTtcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIFJlc29sdmUgdGhlIGNvbXBvbmVudCBjb25zdHJ1Y3RvciB0byB1c2Ugd2hlbiBjcmVhdGluZ1xuICAgICAqIHRoZSBjaGlsZCB2bS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7U3RyaW5nfEZ1bmN0aW9ufSB2YWx1ZVxuICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IGNiXG4gICAgICovXG5cbiAgICByZXNvbHZlQ29tcG9uZW50OiBmdW5jdGlvbiByZXNvbHZlQ29tcG9uZW50KHZhbHVlLCBjYikge1xuICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgICAgdGhpcy5wZW5kaW5nQ29tcG9uZW50Q2IgPSBjYW5jZWxsYWJsZShmdW5jdGlvbiAoQ29tcG9uZW50KSB7XG4gICAgICAgIHNlbGYuQ29tcG9uZW50TmFtZSA9IENvbXBvbmVudC5vcHRpb25zLm5hbWUgfHwgKHR5cGVvZiB2YWx1ZSA9PT0gJ3N0cmluZycgPyB2YWx1ZSA6IG51bGwpO1xuICAgICAgICBzZWxmLkNvbXBvbmVudCA9IENvbXBvbmVudDtcbiAgICAgICAgY2IoKTtcbiAgICAgIH0pO1xuICAgICAgdGhpcy52bS5fcmVzb2x2ZUNvbXBvbmVudCh2YWx1ZSwgdGhpcy5wZW5kaW5nQ29tcG9uZW50Q2IpO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBDcmVhdGUgYSBuZXcgaW5zdGFuY2UgdXNpbmcgdGhlIGN1cnJlbnQgY29uc3RydWN0b3IgYW5kXG4gICAgICogcmVwbGFjZSB0aGUgZXhpc3RpbmcgaW5zdGFuY2UuIFRoaXMgbWV0aG9kIGRvZXNuJ3QgY2FyZVxuICAgICAqIHdoZXRoZXIgdGhlIG5ldyBjb21wb25lbnQgYW5kIHRoZSBvbGQgb25lIGFyZSBhY3R1YWxseVxuICAgICAqIHRoZSBzYW1lLlxuICAgICAqXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gW2NiXVxuICAgICAqL1xuXG4gICAgbW91bnRDb21wb25lbnQ6IGZ1bmN0aW9uIG1vdW50Q29tcG9uZW50KGNiKSB7XG4gICAgICAvLyBhY3R1YWwgbW91bnRcbiAgICAgIHRoaXMudW5idWlsZCh0cnVlKTtcbiAgICAgIHZhciBzZWxmID0gdGhpcztcbiAgICAgIHZhciBhY3RpdmF0ZUhvb2tzID0gdGhpcy5Db21wb25lbnQub3B0aW9ucy5hY3RpdmF0ZTtcbiAgICAgIHZhciBjYWNoZWQgPSB0aGlzLmdldENhY2hlZCgpO1xuICAgICAgdmFyIG5ld0NvbXBvbmVudCA9IHRoaXMuYnVpbGQoKTtcbiAgICAgIGlmIChhY3RpdmF0ZUhvb2tzICYmICFjYWNoZWQpIHtcbiAgICAgICAgdGhpcy53YWl0aW5nRm9yID0gbmV3Q29tcG9uZW50O1xuICAgICAgICBjYWxsQWN0aXZhdGVIb29rcyhhY3RpdmF0ZUhvb2tzLCBuZXdDb21wb25lbnQsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICBpZiAoc2VsZi53YWl0aW5nRm9yICE9PSBuZXdDb21wb25lbnQpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICB9XG4gICAgICAgICAgc2VsZi53YWl0aW5nRm9yID0gbnVsbDtcbiAgICAgICAgICBzZWxmLnRyYW5zaXRpb24obmV3Q29tcG9uZW50LCBjYik7XG4gICAgICAgIH0pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgLy8gdXBkYXRlIHJlZiBmb3Iga2VwdC1hbGl2ZSBjb21wb25lbnRcbiAgICAgICAgaWYgKGNhY2hlZCkge1xuICAgICAgICAgIG5ld0NvbXBvbmVudC5fdXBkYXRlUmVmKCk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy50cmFuc2l0aW9uKG5ld0NvbXBvbmVudCwgY2IpO1xuICAgICAgfVxuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBXaGVuIHRoZSBjb21wb25lbnQgY2hhbmdlcyBvciB1bmJpbmRzIGJlZm9yZSBhbiBhc3luY1xuICAgICAqIGNvbnN0cnVjdG9yIGlzIHJlc29sdmVkLCB3ZSBuZWVkIHRvIGludmFsaWRhdGUgaXRzXG4gICAgICogcGVuZGluZyBjYWxsYmFjay5cbiAgICAgKi9cblxuICAgIGludmFsaWRhdGVQZW5kaW5nOiBmdW5jdGlvbiBpbnZhbGlkYXRlUGVuZGluZygpIHtcbiAgICAgIGlmICh0aGlzLnBlbmRpbmdDb21wb25lbnRDYikge1xuICAgICAgICB0aGlzLnBlbmRpbmdDb21wb25lbnRDYi5jYW5jZWwoKTtcbiAgICAgICAgdGhpcy5wZW5kaW5nQ29tcG9uZW50Q2IgPSBudWxsO1xuICAgICAgfVxuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBJbnN0YW50aWF0ZS9pbnNlcnQgYSBuZXcgY2hpbGQgdm0uXG4gICAgICogSWYga2VlcCBhbGl2ZSBhbmQgaGFzIGNhY2hlZCBpbnN0YW5jZSwgaW5zZXJ0IHRoYXRcbiAgICAgKiBpbnN0YW5jZTsgb3RoZXJ3aXNlIGJ1aWxkIGEgbmV3IG9uZSBhbmQgY2FjaGUgaXQuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gW2V4dHJhT3B0aW9uc11cbiAgICAgKiBAcmV0dXJuIHtWdWV9IC0gdGhlIGNyZWF0ZWQgaW5zdGFuY2VcbiAgICAgKi9cblxuICAgIGJ1aWxkOiBmdW5jdGlvbiBidWlsZChleHRyYU9wdGlvbnMpIHtcbiAgICAgIHZhciBjYWNoZWQgPSB0aGlzLmdldENhY2hlZCgpO1xuICAgICAgaWYgKGNhY2hlZCkge1xuICAgICAgICByZXR1cm4gY2FjaGVkO1xuICAgICAgfVxuICAgICAgaWYgKHRoaXMuQ29tcG9uZW50KSB7XG4gICAgICAgIC8vIGRlZmF1bHQgb3B0aW9uc1xuICAgICAgICB2YXIgb3B0aW9ucyA9IHtcbiAgICAgICAgICBuYW1lOiB0aGlzLkNvbXBvbmVudE5hbWUsXG4gICAgICAgICAgZWw6IGNsb25lTm9kZSh0aGlzLmVsKSxcbiAgICAgICAgICB0ZW1wbGF0ZTogdGhpcy5pbmxpbmVUZW1wbGF0ZSxcbiAgICAgICAgICAvLyBtYWtlIHN1cmUgdG8gYWRkIHRoZSBjaGlsZCB3aXRoIGNvcnJlY3QgcGFyZW50XG4gICAgICAgICAgLy8gaWYgdGhpcyBpcyBhIHRyYW5zY2x1ZGVkIGNvbXBvbmVudCwgaXRzIHBhcmVudFxuICAgICAgICAgIC8vIHNob3VsZCBiZSB0aGUgdHJhbnNjbHVzaW9uIGhvc3QuXG4gICAgICAgICAgcGFyZW50OiB0aGlzLl9ob3N0IHx8IHRoaXMudm0sXG4gICAgICAgICAgLy8gaWYgbm8gaW5saW5lLXRlbXBsYXRlLCB0aGVuIHRoZSBjb21waWxlZFxuICAgICAgICAgIC8vIGxpbmtlciBjYW4gYmUgY2FjaGVkIGZvciBiZXR0ZXIgcGVyZm9ybWFuY2UuXG4gICAgICAgICAgX2xpbmtlckNhY2hhYmxlOiAhdGhpcy5pbmxpbmVUZW1wbGF0ZSxcbiAgICAgICAgICBfcmVmOiB0aGlzLmRlc2NyaXB0b3IucmVmLFxuICAgICAgICAgIF9hc0NvbXBvbmVudDogdHJ1ZSxcbiAgICAgICAgICBfaXNSb3V0ZXJWaWV3OiB0aGlzLl9pc1JvdXRlclZpZXcsXG4gICAgICAgICAgLy8gaWYgdGhpcyBpcyBhIHRyYW5zY2x1ZGVkIGNvbXBvbmVudCwgY29udGV4dFxuICAgICAgICAgIC8vIHdpbGwgYmUgdGhlIGNvbW1vbiBwYXJlbnQgdm0gb2YgdGhpcyBpbnN0YW5jZVxuICAgICAgICAgIC8vIGFuZCBpdHMgaG9zdC5cbiAgICAgICAgICBfY29udGV4dDogdGhpcy52bSxcbiAgICAgICAgICAvLyBpZiB0aGlzIGlzIGluc2lkZSBhbiBpbmxpbmUgdi1mb3IsIHRoZSBzY29wZVxuICAgICAgICAgIC8vIHdpbGwgYmUgdGhlIGludGVybWVkaWF0ZSBzY29wZSBjcmVhdGVkIGZvciB0aGlzXG4gICAgICAgICAgLy8gcmVwZWF0IGZyYWdtZW50LiB0aGlzIGlzIHVzZWQgZm9yIGxpbmtpbmcgcHJvcHNcbiAgICAgICAgICAvLyBhbmQgY29udGFpbmVyIGRpcmVjdGl2ZXMuXG4gICAgICAgICAgX3Njb3BlOiB0aGlzLl9zY29wZSxcbiAgICAgICAgICAvLyBwYXNzIGluIHRoZSBvd25lciBmcmFnbWVudCBvZiB0aGlzIGNvbXBvbmVudC5cbiAgICAgICAgICAvLyB0aGlzIGlzIG5lY2Vzc2FyeSBzbyB0aGF0IHRoZSBmcmFnbWVudCBjYW4ga2VlcFxuICAgICAgICAgIC8vIHRyYWNrIG9mIGl0cyBjb250YWluZWQgY29tcG9uZW50cyBpbiBvcmRlciB0b1xuICAgICAgICAgIC8vIGNhbGwgYXR0YWNoL2RldGFjaCBob29rcyBmb3IgdGhlbS5cbiAgICAgICAgICBfZnJhZzogdGhpcy5fZnJhZ1xuICAgICAgICB9O1xuICAgICAgICAvLyBleHRyYSBvcHRpb25zXG4gICAgICAgIC8vIGluIDEuMC4wIHRoaXMgaXMgdXNlZCBieSB2dWUtcm91dGVyIG9ubHlcbiAgICAgICAgLyogaXN0YW5idWwgaWdub3JlIGlmICovXG4gICAgICAgIGlmIChleHRyYU9wdGlvbnMpIHtcbiAgICAgICAgICBleHRlbmQob3B0aW9ucywgZXh0cmFPcHRpb25zKTtcbiAgICAgICAgfVxuICAgICAgICB2YXIgY2hpbGQgPSBuZXcgdGhpcy5Db21wb25lbnQob3B0aW9ucyk7XG4gICAgICAgIGlmICh0aGlzLmtlZXBBbGl2ZSkge1xuICAgICAgICAgIHRoaXMuY2FjaGVbdGhpcy5Db21wb25lbnQuY2lkXSA9IGNoaWxkO1xuICAgICAgICB9XG4gICAgICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBpZiAqL1xuICAgICAgICBpZiAoJ2RldmVsb3BtZW50JyAhPT0gJ3Byb2R1Y3Rpb24nICYmIHRoaXMuZWwuaGFzQXR0cmlidXRlKCd0cmFuc2l0aW9uJykgJiYgY2hpbGQuX2lzRnJhZ21lbnQpIHtcbiAgICAgICAgICB3YXJuKCdUcmFuc2l0aW9ucyB3aWxsIG5vdCB3b3JrIG9uIGEgZnJhZ21lbnQgaW5zdGFuY2UuICcgKyAnVGVtcGxhdGU6ICcgKyBjaGlsZC4kb3B0aW9ucy50ZW1wbGF0ZSwgY2hpbGQpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBjaGlsZDtcbiAgICAgIH1cbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogVHJ5IHRvIGdldCBhIGNhY2hlZCBpbnN0YW5jZSBvZiB0aGUgY3VycmVudCBjb21wb25lbnQuXG4gICAgICpcbiAgICAgKiBAcmV0dXJuIHtWdWV8dW5kZWZpbmVkfVxuICAgICAqL1xuXG4gICAgZ2V0Q2FjaGVkOiBmdW5jdGlvbiBnZXRDYWNoZWQoKSB7XG4gICAgICByZXR1cm4gdGhpcy5rZWVwQWxpdmUgJiYgdGhpcy5jYWNoZVt0aGlzLkNvbXBvbmVudC5jaWRdO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBUZWFyZG93biB0aGUgY3VycmVudCBjaGlsZCwgYnV0IGRlZmVycyBjbGVhbnVwIHNvXG4gICAgICogdGhhdCB3ZSBjYW4gc2VwYXJhdGUgdGhlIGRlc3Ryb3kgYW5kIHJlbW92YWwgc3RlcHMuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge0Jvb2xlYW59IGRlZmVyXG4gICAgICovXG5cbiAgICB1bmJ1aWxkOiBmdW5jdGlvbiB1bmJ1aWxkKGRlZmVyKSB7XG4gICAgICBpZiAodGhpcy53YWl0aW5nRm9yKSB7XG4gICAgICAgIGlmICghdGhpcy5rZWVwQWxpdmUpIHtcbiAgICAgICAgICB0aGlzLndhaXRpbmdGb3IuJGRlc3Ryb3koKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLndhaXRpbmdGb3IgPSBudWxsO1xuICAgICAgfVxuICAgICAgdmFyIGNoaWxkID0gdGhpcy5jaGlsZFZNO1xuICAgICAgaWYgKCFjaGlsZCB8fCB0aGlzLmtlZXBBbGl2ZSkge1xuICAgICAgICBpZiAoY2hpbGQpIHtcbiAgICAgICAgICAvLyByZW1vdmUgcmVmXG4gICAgICAgICAgY2hpbGQuX2luYWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgICBjaGlsZC5fdXBkYXRlUmVmKHRydWUpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIC8vIHRoZSBzb2xlIHB1cnBvc2Ugb2YgYGRlZmVyQ2xlYW51cGAgaXMgc28gdGhhdCB3ZSBjYW5cbiAgICAgIC8vIFwiZGVhY3RpdmF0ZVwiIHRoZSB2bSByaWdodCBub3cgYW5kIHBlcmZvcm0gRE9NIHJlbW92YWxcbiAgICAgIC8vIGxhdGVyLlxuICAgICAgY2hpbGQuJGRlc3Ryb3koZmFsc2UsIGRlZmVyKTtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogUmVtb3ZlIGN1cnJlbnQgZGVzdHJveWVkIGNoaWxkIGFuZCBtYW51YWxseSBkb1xuICAgICAqIHRoZSBjbGVhbnVwIGFmdGVyIHJlbW92YWwuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBjYlxuICAgICAqL1xuXG4gICAgcmVtb3ZlOiBmdW5jdGlvbiByZW1vdmUoY2hpbGQsIGNiKSB7XG4gICAgICB2YXIga2VlcEFsaXZlID0gdGhpcy5rZWVwQWxpdmU7XG4gICAgICBpZiAoY2hpbGQpIHtcbiAgICAgICAgLy8gd2UgbWF5IGhhdmUgYSBjb21wb25lbnQgc3dpdGNoIHdoZW4gYSBwcmV2aW91c1xuICAgICAgICAvLyBjb21wb25lbnQgaXMgc3RpbGwgYmVpbmcgdHJhbnNpdGlvbmVkIG91dC5cbiAgICAgICAgLy8gd2Ugd2FudCB0byB0cmlnZ2VyIG9ubHkgb25lIGxhc3Rlc3QgaW5zZXJ0aW9uIGNiXG4gICAgICAgIC8vIHdoZW4gdGhlIGV4aXN0aW5nIHRyYW5zaXRpb24gZmluaXNoZXMuICgjMTExOSlcbiAgICAgICAgdGhpcy5wZW5kaW5nUmVtb3ZhbHMrKztcbiAgICAgICAgdGhpcy5wZW5kaW5nUmVtb3ZhbENiID0gY2I7XG4gICAgICAgIHZhciBzZWxmID0gdGhpcztcbiAgICAgICAgY2hpbGQuJHJlbW92ZShmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgc2VsZi5wZW5kaW5nUmVtb3ZhbHMtLTtcbiAgICAgICAgICBpZiAoIWtlZXBBbGl2ZSkgY2hpbGQuX2NsZWFudXAoKTtcbiAgICAgICAgICBpZiAoIXNlbGYucGVuZGluZ1JlbW92YWxzICYmIHNlbGYucGVuZGluZ1JlbW92YWxDYikge1xuICAgICAgICAgICAgc2VsZi5wZW5kaW5nUmVtb3ZhbENiKCk7XG4gICAgICAgICAgICBzZWxmLnBlbmRpbmdSZW1vdmFsQ2IgPSBudWxsO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICB9IGVsc2UgaWYgKGNiKSB7XG4gICAgICAgIGNiKCk7XG4gICAgICB9XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIEFjdHVhbGx5IHN3YXAgdGhlIGNvbXBvbmVudHMsIGRlcGVuZGluZyBvbiB0aGVcbiAgICAgKiB0cmFuc2l0aW9uIG1vZGUuIERlZmF1bHRzIHRvIHNpbXVsdGFuZW91cy5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7VnVlfSB0YXJnZXRcbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBbY2JdXG4gICAgICovXG5cbiAgICB0cmFuc2l0aW9uOiBmdW5jdGlvbiB0cmFuc2l0aW9uKHRhcmdldCwgY2IpIHtcbiAgICAgIHZhciBzZWxmID0gdGhpcztcbiAgICAgIHZhciBjdXJyZW50ID0gdGhpcy5jaGlsZFZNO1xuICAgICAgLy8gZm9yIGRldnRvb2wgaW5zcGVjdGlvblxuICAgICAgaWYgKGN1cnJlbnQpIGN1cnJlbnQuX2luYWN0aXZlID0gdHJ1ZTtcbiAgICAgIHRhcmdldC5faW5hY3RpdmUgPSBmYWxzZTtcbiAgICAgIHRoaXMuY2hpbGRWTSA9IHRhcmdldDtcbiAgICAgIHN3aXRjaCAoc2VsZi5wYXJhbXMudHJhbnNpdGlvbk1vZGUpIHtcbiAgICAgICAgY2FzZSAnaW4tb3V0JzpcbiAgICAgICAgICB0YXJnZXQuJGJlZm9yZShzZWxmLmFuY2hvciwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgc2VsZi5yZW1vdmUoY3VycmVudCwgY2IpO1xuICAgICAgICAgIH0pO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlICdvdXQtaW4nOlxuICAgICAgICAgIHNlbGYucmVtb3ZlKGN1cnJlbnQsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHRhcmdldC4kYmVmb3JlKHNlbGYuYW5jaG9yLCBjYik7XG4gICAgICAgICAgfSk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgc2VsZi5yZW1vdmUoY3VycmVudCk7XG4gICAgICAgICAgdGFyZ2V0LiRiZWZvcmUoc2VsZi5hbmNob3IsIGNiKTtcbiAgICAgIH1cbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogVW5iaW5kLlxuICAgICAqL1xuXG4gICAgdW5iaW5kOiBmdW5jdGlvbiB1bmJpbmQoKSB7XG4gICAgICB0aGlzLmludmFsaWRhdGVQZW5kaW5nKCk7XG4gICAgICAvLyBEbyBub3QgZGVmZXIgY2xlYW51cCB3aGVuIHVuYmluZGluZ1xuICAgICAgdGhpcy51bmJ1aWxkKCk7XG4gICAgICAvLyBkZXN0cm95IGFsbCBrZWVwLWFsaXZlIGNhY2hlZCBpbnN0YW5jZXNcbiAgICAgIGlmICh0aGlzLmNhY2hlKSB7XG4gICAgICAgIGZvciAodmFyIGtleSBpbiB0aGlzLmNhY2hlKSB7XG4gICAgICAgICAgdGhpcy5jYWNoZVtrZXldLiRkZXN0cm95KCk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5jYWNoZSA9IG51bGw7XG4gICAgICB9XG4gICAgfVxuICB9O1xuXG4gIC8qKlxuICAgKiBDYWxsIGFjdGl2YXRlIGhvb2tzIGluIG9yZGVyIChhc3luY2hyb25vdXMpXG4gICAqXG4gICAqIEBwYXJhbSB7QXJyYXl9IGhvb2tzXG4gICAqIEBwYXJhbSB7VnVlfSB2bVxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBjYlxuICAgKi9cblxuICBmdW5jdGlvbiBjYWxsQWN0aXZhdGVIb29rcyhob29rcywgdm0sIGNiKSB7XG4gICAgdmFyIHRvdGFsID0gaG9va3MubGVuZ3RoO1xuICAgIHZhciBjYWxsZWQgPSAwO1xuICAgIGhvb2tzWzBdLmNhbGwodm0sIG5leHQpO1xuICAgIGZ1bmN0aW9uIG5leHQoKSB7XG4gICAgICBpZiAoKytjYWxsZWQgPj0gdG90YWwpIHtcbiAgICAgICAgY2IoKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGhvb2tzW2NhbGxlZF0uY2FsbCh2bSwgbmV4dCk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgdmFyIHByb3BCaW5kaW5nTW9kZXMgPSBjb25maWcuX3Byb3BCaW5kaW5nTW9kZXM7XG4gIHZhciBlbXB0eSA9IHt9O1xuXG4gIC8vIHJlZ2V4ZXNcbiAgdmFyIGlkZW50UkUkMSA9IC9eWyRfYS16QS1aXStbXFx3JF0qJC87XG4gIHZhciBzZXR0YWJsZVBhdGhSRSA9IC9eW0EtWmEtel8kXVtcXHckXSooXFwuW0EtWmEtel8kXVtcXHckXSp8XFxbW15cXFtcXF1dK1xcXSkqJC87XG5cbiAgLyoqXG4gICAqIENvbXBpbGUgcHJvcHMgb24gYSByb290IGVsZW1lbnQgYW5kIHJldHVyblxuICAgKiBhIHByb3BzIGxpbmsgZnVuY3Rpb24uXG4gICAqXG4gICAqIEBwYXJhbSB7RWxlbWVudHxEb2N1bWVudEZyYWdtZW50fSBlbFxuICAgKiBAcGFyYW0ge0FycmF5fSBwcm9wT3B0aW9uc1xuICAgKiBAcGFyYW0ge1Z1ZX0gdm1cbiAgICogQHJldHVybiB7RnVuY3Rpb259IHByb3BzTGlua0ZuXG4gICAqL1xuXG4gIGZ1bmN0aW9uIGNvbXBpbGVQcm9wcyhlbCwgcHJvcE9wdGlvbnMsIHZtKSB7XG4gICAgdmFyIHByb3BzID0gW107XG4gICAgdmFyIG5hbWVzID0gT2JqZWN0LmtleXMocHJvcE9wdGlvbnMpO1xuICAgIHZhciBpID0gbmFtZXMubGVuZ3RoO1xuICAgIHZhciBvcHRpb25zLCBuYW1lLCBhdHRyLCB2YWx1ZSwgcGF0aCwgcGFyc2VkLCBwcm9wO1xuICAgIHdoaWxlIChpLS0pIHtcbiAgICAgIG5hbWUgPSBuYW1lc1tpXTtcbiAgICAgIG9wdGlvbnMgPSBwcm9wT3B0aW9uc1tuYW1lXSB8fCBlbXB0eTtcblxuICAgICAgaWYgKCdkZXZlbG9wbWVudCcgIT09ICdwcm9kdWN0aW9uJyAmJiBuYW1lID09PSAnJGRhdGEnKSB7XG4gICAgICAgIHdhcm4oJ0RvIG5vdCB1c2UgJGRhdGEgYXMgcHJvcC4nLCB2bSk7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuXG4gICAgICAvLyBwcm9wcyBjb3VsZCBjb250YWluIGRhc2hlcywgd2hpY2ggd2lsbCBiZVxuICAgICAgLy8gaW50ZXJwcmV0ZWQgYXMgbWludXMgY2FsY3VsYXRpb25zIGJ5IHRoZSBwYXJzZXJcbiAgICAgIC8vIHNvIHdlIG5lZWQgdG8gY2FtZWxpemUgdGhlIHBhdGggaGVyZVxuICAgICAgcGF0aCA9IGNhbWVsaXplKG5hbWUpO1xuICAgICAgaWYgKCFpZGVudFJFJDEudGVzdChwYXRoKSkge1xuICAgICAgICAnZGV2ZWxvcG1lbnQnICE9PSAncHJvZHVjdGlvbicgJiYgd2FybignSW52YWxpZCBwcm9wIGtleTogXCInICsgbmFtZSArICdcIi4gUHJvcCBrZXlzICcgKyAnbXVzdCBiZSB2YWxpZCBpZGVudGlmaWVycy4nLCB2bSk7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuXG4gICAgICBwcm9wID0ge1xuICAgICAgICBuYW1lOiBuYW1lLFxuICAgICAgICBwYXRoOiBwYXRoLFxuICAgICAgICBvcHRpb25zOiBvcHRpb25zLFxuICAgICAgICBtb2RlOiBwcm9wQmluZGluZ01vZGVzLk9ORV9XQVksXG4gICAgICAgIHJhdzogbnVsbFxuICAgICAgfTtcblxuICAgICAgYXR0ciA9IGh5cGhlbmF0ZShuYW1lKTtcbiAgICAgIC8vIGZpcnN0IGNoZWNrIGR5bmFtaWMgdmVyc2lvblxuICAgICAgaWYgKCh2YWx1ZSA9IGdldEJpbmRBdHRyKGVsLCBhdHRyKSkgPT09IG51bGwpIHtcbiAgICAgICAgaWYgKCh2YWx1ZSA9IGdldEJpbmRBdHRyKGVsLCBhdHRyICsgJy5zeW5jJykpICE9PSBudWxsKSB7XG4gICAgICAgICAgcHJvcC5tb2RlID0gcHJvcEJpbmRpbmdNb2Rlcy5UV09fV0FZO1xuICAgICAgICB9IGVsc2UgaWYgKCh2YWx1ZSA9IGdldEJpbmRBdHRyKGVsLCBhdHRyICsgJy5vbmNlJykpICE9PSBudWxsKSB7XG4gICAgICAgICAgcHJvcC5tb2RlID0gcHJvcEJpbmRpbmdNb2Rlcy5PTkVfVElNRTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKHZhbHVlICE9PSBudWxsKSB7XG4gICAgICAgIC8vIGhhcyBkeW5hbWljIGJpbmRpbmchXG4gICAgICAgIHByb3AucmF3ID0gdmFsdWU7XG4gICAgICAgIHBhcnNlZCA9IHBhcnNlRGlyZWN0aXZlKHZhbHVlKTtcbiAgICAgICAgdmFsdWUgPSBwYXJzZWQuZXhwcmVzc2lvbjtcbiAgICAgICAgcHJvcC5maWx0ZXJzID0gcGFyc2VkLmZpbHRlcnM7XG4gICAgICAgIC8vIGNoZWNrIGJpbmRpbmcgdHlwZVxuICAgICAgICBpZiAoaXNMaXRlcmFsKHZhbHVlKSAmJiAhcGFyc2VkLmZpbHRlcnMpIHtcbiAgICAgICAgICAvLyBmb3IgZXhwcmVzc2lvbnMgY29udGFpbmluZyBsaXRlcmFsIG51bWJlcnMgYW5kXG4gICAgICAgICAgLy8gYm9vbGVhbnMsIHRoZXJlJ3Mgbm8gbmVlZCB0byBzZXR1cCBhIHByb3AgYmluZGluZyxcbiAgICAgICAgICAvLyBzbyB3ZSBjYW4gb3B0aW1pemUgdGhlbSBhcyBhIG9uZS10aW1lIHNldC5cbiAgICAgICAgICBwcm9wLm9wdGltaXplZExpdGVyYWwgPSB0cnVlO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHByb3AuZHluYW1pYyA9IHRydWU7XG4gICAgICAgICAgLy8gY2hlY2sgbm9uLXNldHRhYmxlIHBhdGggZm9yIHR3by13YXkgYmluZGluZ3NcbiAgICAgICAgICBpZiAoJ2RldmVsb3BtZW50JyAhPT0gJ3Byb2R1Y3Rpb24nICYmIHByb3AubW9kZSA9PT0gcHJvcEJpbmRpbmdNb2Rlcy5UV09fV0FZICYmICFzZXR0YWJsZVBhdGhSRS50ZXN0KHZhbHVlKSkge1xuICAgICAgICAgICAgcHJvcC5tb2RlID0gcHJvcEJpbmRpbmdNb2Rlcy5PTkVfV0FZO1xuICAgICAgICAgICAgd2FybignQ2Fubm90IGJpbmQgdHdvLXdheSBwcm9wIHdpdGggbm9uLXNldHRhYmxlICcgKyAncGFyZW50IHBhdGg6ICcgKyB2YWx1ZSwgdm0pO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBwcm9wLnBhcmVudFBhdGggPSB2YWx1ZTtcblxuICAgICAgICAvLyB3YXJuIHJlcXVpcmVkIHR3by13YXlcbiAgICAgICAgaWYgKCdkZXZlbG9wbWVudCcgIT09ICdwcm9kdWN0aW9uJyAmJiBvcHRpb25zLnR3b1dheSAmJiBwcm9wLm1vZGUgIT09IHByb3BCaW5kaW5nTW9kZXMuVFdPX1dBWSkge1xuICAgICAgICAgIHdhcm4oJ1Byb3AgXCInICsgbmFtZSArICdcIiBleHBlY3RzIGEgdHdvLXdheSBiaW5kaW5nIHR5cGUuJywgdm0pO1xuICAgICAgICB9XG4gICAgICB9IGVsc2UgaWYgKCh2YWx1ZSA9IGdldEF0dHIoZWwsIGF0dHIpKSAhPT0gbnVsbCkge1xuICAgICAgICAvLyBoYXMgbGl0ZXJhbCBiaW5kaW5nIVxuICAgICAgICBwcm9wLnJhdyA9IHZhbHVlO1xuICAgICAgfSBlbHNlIGlmICgnZGV2ZWxvcG1lbnQnICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICAgICAgLy8gY2hlY2sgcG9zc2libGUgY2FtZWxDYXNlIHByb3AgdXNhZ2VcbiAgICAgICAgdmFyIGxvd2VyQ2FzZU5hbWUgPSBwYXRoLnRvTG93ZXJDYXNlKCk7XG4gICAgICAgIHZhbHVlID0gL1tBLVpcXC1dLy50ZXN0KG5hbWUpICYmIChlbC5nZXRBdHRyaWJ1dGUobG93ZXJDYXNlTmFtZSkgfHwgZWwuZ2V0QXR0cmlidXRlKCc6JyArIGxvd2VyQ2FzZU5hbWUpIHx8IGVsLmdldEF0dHJpYnV0ZSgndi1iaW5kOicgKyBsb3dlckNhc2VOYW1lKSB8fCBlbC5nZXRBdHRyaWJ1dGUoJzonICsgbG93ZXJDYXNlTmFtZSArICcub25jZScpIHx8IGVsLmdldEF0dHJpYnV0ZSgndi1iaW5kOicgKyBsb3dlckNhc2VOYW1lICsgJy5vbmNlJykgfHwgZWwuZ2V0QXR0cmlidXRlKCc6JyArIGxvd2VyQ2FzZU5hbWUgKyAnLnN5bmMnKSB8fCBlbC5nZXRBdHRyaWJ1dGUoJ3YtYmluZDonICsgbG93ZXJDYXNlTmFtZSArICcuc3luYycpKTtcbiAgICAgICAgaWYgKHZhbHVlKSB7XG4gICAgICAgICAgd2FybignUG9zc2libGUgdXNhZ2UgZXJyb3IgZm9yIHByb3AgYCcgKyBsb3dlckNhc2VOYW1lICsgJ2AgLSAnICsgJ2RpZCB5b3UgbWVhbiBgJyArIGF0dHIgKyAnYD8gSFRNTCBpcyBjYXNlLWluc2Vuc2l0aXZlLCByZW1lbWJlciB0byB1c2UgJyArICdrZWJhYi1jYXNlIGZvciBwcm9wcyBpbiB0ZW1wbGF0ZXMuJywgdm0pO1xuICAgICAgICB9IGVsc2UgaWYgKG9wdGlvbnMucmVxdWlyZWQpIHtcbiAgICAgICAgICAvLyB3YXJuIG1pc3NpbmcgcmVxdWlyZWRcbiAgICAgICAgICB3YXJuKCdNaXNzaW5nIHJlcXVpcmVkIHByb3A6ICcgKyBuYW1lLCB2bSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIC8vIHB1c2ggcHJvcFxuICAgICAgcHJvcHMucHVzaChwcm9wKTtcbiAgICB9XG4gICAgcmV0dXJuIG1ha2VQcm9wc0xpbmtGbihwcm9wcyk7XG4gIH1cblxuICAvKipcbiAgICogQnVpbGQgYSBmdW5jdGlvbiB0aGF0IGFwcGxpZXMgcHJvcHMgdG8gYSB2bS5cbiAgICpcbiAgICogQHBhcmFtIHtBcnJheX0gcHJvcHNcbiAgICogQHJldHVybiB7RnVuY3Rpb259IHByb3BzTGlua0ZuXG4gICAqL1xuXG4gIGZ1bmN0aW9uIG1ha2VQcm9wc0xpbmtGbihwcm9wcykge1xuICAgIHJldHVybiBmdW5jdGlvbiBwcm9wc0xpbmtGbih2bSwgc2NvcGUpIHtcbiAgICAgIC8vIHN0b3JlIHJlc29sdmVkIHByb3BzIGluZm9cbiAgICAgIHZtLl9wcm9wcyA9IHt9O1xuICAgICAgdmFyIGlubGluZVByb3BzID0gdm0uJG9wdGlvbnMucHJvcHNEYXRhO1xuICAgICAgdmFyIGkgPSBwcm9wcy5sZW5ndGg7XG4gICAgICB2YXIgcHJvcCwgcGF0aCwgb3B0aW9ucywgdmFsdWUsIHJhdztcbiAgICAgIHdoaWxlIChpLS0pIHtcbiAgICAgICAgcHJvcCA9IHByb3BzW2ldO1xuICAgICAgICByYXcgPSBwcm9wLnJhdztcbiAgICAgICAgcGF0aCA9IHByb3AucGF0aDtcbiAgICAgICAgb3B0aW9ucyA9IHByb3Aub3B0aW9ucztcbiAgICAgICAgdm0uX3Byb3BzW3BhdGhdID0gcHJvcDtcbiAgICAgICAgaWYgKGlubGluZVByb3BzICYmIGhhc093bihpbmxpbmVQcm9wcywgcGF0aCkpIHtcbiAgICAgICAgICBpbml0UHJvcCh2bSwgcHJvcCwgaW5saW5lUHJvcHNbcGF0aF0pO1xuICAgICAgICB9aWYgKHJhdyA9PT0gbnVsbCkge1xuICAgICAgICAgIC8vIGluaXRpYWxpemUgYWJzZW50IHByb3BcbiAgICAgICAgICBpbml0UHJvcCh2bSwgcHJvcCwgdW5kZWZpbmVkKTtcbiAgICAgICAgfSBlbHNlIGlmIChwcm9wLmR5bmFtaWMpIHtcbiAgICAgICAgICAvLyBkeW5hbWljIHByb3BcbiAgICAgICAgICBpZiAocHJvcC5tb2RlID09PSBwcm9wQmluZGluZ01vZGVzLk9ORV9USU1FKSB7XG4gICAgICAgICAgICAvLyBvbmUgdGltZSBiaW5kaW5nXG4gICAgICAgICAgICB2YWx1ZSA9IChzY29wZSB8fCB2bS5fY29udGV4dCB8fCB2bSkuJGdldChwcm9wLnBhcmVudFBhdGgpO1xuICAgICAgICAgICAgaW5pdFByb3Aodm0sIHByb3AsIHZhbHVlKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaWYgKHZtLl9jb250ZXh0KSB7XG4gICAgICAgICAgICAgIC8vIGR5bmFtaWMgYmluZGluZ1xuICAgICAgICAgICAgICB2bS5fYmluZERpcih7XG4gICAgICAgICAgICAgICAgbmFtZTogJ3Byb3AnLFxuICAgICAgICAgICAgICAgIGRlZjogcHJvcERlZixcbiAgICAgICAgICAgICAgICBwcm9wOiBwcm9wXG4gICAgICAgICAgICAgIH0sIG51bGwsIG51bGwsIHNjb3BlKTsgLy8gZWwsIGhvc3QsIHNjb3BlXG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIC8vIHJvb3QgaW5zdGFuY2VcbiAgICAgICAgICAgICAgICBpbml0UHJvcCh2bSwgcHJvcCwgdm0uJGdldChwcm9wLnBhcmVudFBhdGgpKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIGlmIChwcm9wLm9wdGltaXplZExpdGVyYWwpIHtcbiAgICAgICAgICAvLyBvcHRpbWl6ZWQgbGl0ZXJhbCwgY2FzdCBpdCBhbmQganVzdCBzZXQgb25jZVxuICAgICAgICAgIHZhciBzdHJpcHBlZCA9IHN0cmlwUXVvdGVzKHJhdyk7XG4gICAgICAgICAgdmFsdWUgPSBzdHJpcHBlZCA9PT0gcmF3ID8gdG9Cb29sZWFuKHRvTnVtYmVyKHJhdykpIDogc3RyaXBwZWQ7XG4gICAgICAgICAgaW5pdFByb3Aodm0sIHByb3AsIHZhbHVlKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAvLyBzdHJpbmcgbGl0ZXJhbCwgYnV0IHdlIG5lZWQgdG8gY2F0ZXIgZm9yXG4gICAgICAgICAgLy8gQm9vbGVhbiBwcm9wcyB3aXRoIG5vIHZhbHVlLCBvciB3aXRoIHNhbWVcbiAgICAgICAgICAvLyBsaXRlcmFsIHZhbHVlIChlLmcuIGRpc2FibGVkPVwiZGlzYWJsZWRcIilcbiAgICAgICAgICAvLyBzZWUgaHR0cHM6Ly9naXRodWIuY29tL3Z1ZWpzL3Z1ZS1sb2FkZXIvaXNzdWVzLzE4MlxuICAgICAgICAgIHZhbHVlID0gb3B0aW9ucy50eXBlID09PSBCb29sZWFuICYmIChyYXcgPT09ICcnIHx8IHJhdyA9PT0gaHlwaGVuYXRlKHByb3AubmFtZSkpID8gdHJ1ZSA6IHJhdztcbiAgICAgICAgICBpbml0UHJvcCh2bSwgcHJvcCwgdmFsdWUpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfTtcbiAgfVxuXG4gIC8qKlxuICAgKiBQcm9jZXNzIGEgcHJvcCB3aXRoIGEgcmF3VmFsdWUsIGFwcGx5aW5nIG5lY2Vzc2FyeSBjb2Vyc2lvbnMsXG4gICAqIGRlZmF1bHQgdmFsdWVzICYgYXNzZXJ0aW9ucyBhbmQgY2FsbCB0aGUgZ2l2ZW4gY2FsbGJhY2sgd2l0aFxuICAgKiBwcm9jZXNzZWQgdmFsdWUuXG4gICAqXG4gICAqIEBwYXJhbSB7VnVlfSB2bVxuICAgKiBAcGFyYW0ge09iamVjdH0gcHJvcFxuICAgKiBAcGFyYW0geyp9IHJhd1ZhbHVlXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IGZuXG4gICAqL1xuXG4gIGZ1bmN0aW9uIHByb2Nlc3NQcm9wVmFsdWUodm0sIHByb3AsIHJhd1ZhbHVlLCBmbikge1xuICAgIHZhciBpc1NpbXBsZSA9IHByb3AuZHluYW1pYyAmJiBpc1NpbXBsZVBhdGgocHJvcC5wYXJlbnRQYXRoKTtcbiAgICB2YXIgdmFsdWUgPSByYXdWYWx1ZTtcbiAgICBpZiAodmFsdWUgPT09IHVuZGVmaW5lZCkge1xuICAgICAgdmFsdWUgPSBnZXRQcm9wRGVmYXVsdFZhbHVlKHZtLCBwcm9wKTtcbiAgICB9XG4gICAgdmFsdWUgPSBjb2VyY2VQcm9wKHByb3AsIHZhbHVlKTtcbiAgICB2YXIgY29lcmNlZCA9IHZhbHVlICE9PSByYXdWYWx1ZTtcbiAgICBpZiAoIWFzc2VydFByb3AocHJvcCwgdmFsdWUsIHZtKSkge1xuICAgICAgdmFsdWUgPSB1bmRlZmluZWQ7XG4gICAgfVxuICAgIGlmIChpc1NpbXBsZSAmJiAhY29lcmNlZCkge1xuICAgICAgd2l0aG91dENvbnZlcnNpb24oZnVuY3Rpb24gKCkge1xuICAgICAgICBmbih2YWx1ZSk7XG4gICAgICB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgZm4odmFsdWUpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBTZXQgYSBwcm9wJ3MgaW5pdGlhbCB2YWx1ZSBvbiBhIHZtIGFuZCBpdHMgZGF0YSBvYmplY3QuXG4gICAqXG4gICAqIEBwYXJhbSB7VnVlfSB2bVxuICAgKiBAcGFyYW0ge09iamVjdH0gcHJvcFxuICAgKiBAcGFyYW0geyp9IHZhbHVlXG4gICAqL1xuXG4gIGZ1bmN0aW9uIGluaXRQcm9wKHZtLCBwcm9wLCB2YWx1ZSkge1xuICAgIHByb2Nlc3NQcm9wVmFsdWUodm0sIHByb3AsIHZhbHVlLCBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgIGRlZmluZVJlYWN0aXZlKHZtLCBwcm9wLnBhdGgsIHZhbHVlKTtcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBVcGRhdGUgYSBwcm9wJ3MgdmFsdWUgb24gYSB2bS5cbiAgICpcbiAgICogQHBhcmFtIHtWdWV9IHZtXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBwcm9wXG4gICAqIEBwYXJhbSB7Kn0gdmFsdWVcbiAgICovXG5cbiAgZnVuY3Rpb24gdXBkYXRlUHJvcCh2bSwgcHJvcCwgdmFsdWUpIHtcbiAgICBwcm9jZXNzUHJvcFZhbHVlKHZtLCBwcm9wLCB2YWx1ZSwgZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICB2bVtwcm9wLnBhdGhdID0gdmFsdWU7XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogR2V0IHRoZSBkZWZhdWx0IHZhbHVlIG9mIGEgcHJvcC5cbiAgICpcbiAgICogQHBhcmFtIHtWdWV9IHZtXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBwcm9wXG4gICAqIEByZXR1cm4geyp9XG4gICAqL1xuXG4gIGZ1bmN0aW9uIGdldFByb3BEZWZhdWx0VmFsdWUodm0sIHByb3ApIHtcbiAgICAvLyBubyBkZWZhdWx0LCByZXR1cm4gdW5kZWZpbmVkXG4gICAgdmFyIG9wdGlvbnMgPSBwcm9wLm9wdGlvbnM7XG4gICAgaWYgKCFoYXNPd24ob3B0aW9ucywgJ2RlZmF1bHQnKSkge1xuICAgICAgLy8gYWJzZW50IGJvb2xlYW4gdmFsdWUgZGVmYXVsdHMgdG8gZmFsc2VcbiAgICAgIHJldHVybiBvcHRpb25zLnR5cGUgPT09IEJvb2xlYW4gPyBmYWxzZSA6IHVuZGVmaW5lZDtcbiAgICB9XG4gICAgdmFyIGRlZiA9IG9wdGlvbnNbJ2RlZmF1bHQnXTtcbiAgICAvLyB3YXJuIGFnYWluc3Qgbm9uLWZhY3RvcnkgZGVmYXVsdHMgZm9yIE9iamVjdCAmIEFycmF5XG4gICAgaWYgKGlzT2JqZWN0KGRlZikpIHtcbiAgICAgICdkZXZlbG9wbWVudCcgIT09ICdwcm9kdWN0aW9uJyAmJiB3YXJuKCdJbnZhbGlkIGRlZmF1bHQgdmFsdWUgZm9yIHByb3AgXCInICsgcHJvcC5uYW1lICsgJ1wiOiAnICsgJ1Byb3BzIHdpdGggdHlwZSBPYmplY3QvQXJyYXkgbXVzdCB1c2UgYSBmYWN0b3J5IGZ1bmN0aW9uICcgKyAndG8gcmV0dXJuIHRoZSBkZWZhdWx0IHZhbHVlLicsIHZtKTtcbiAgICB9XG4gICAgLy8gY2FsbCBmYWN0b3J5IGZ1bmN0aW9uIGZvciBub24tRnVuY3Rpb24gdHlwZXNcbiAgICByZXR1cm4gdHlwZW9mIGRlZiA9PT0gJ2Z1bmN0aW9uJyAmJiBvcHRpb25zLnR5cGUgIT09IEZ1bmN0aW9uID8gZGVmLmNhbGwodm0pIDogZGVmO1xuICB9XG5cbiAgLyoqXG4gICAqIEFzc2VydCB3aGV0aGVyIGEgcHJvcCBpcyB2YWxpZC5cbiAgICpcbiAgICogQHBhcmFtIHtPYmplY3R9IHByb3BcbiAgICogQHBhcmFtIHsqfSB2YWx1ZVxuICAgKiBAcGFyYW0ge1Z1ZX0gdm1cbiAgICovXG5cbiAgZnVuY3Rpb24gYXNzZXJ0UHJvcChwcm9wLCB2YWx1ZSwgdm0pIHtcbiAgICBpZiAoIXByb3Aub3B0aW9ucy5yZXF1aXJlZCAmJiAoIC8vIG5vbi1yZXF1aXJlZFxuICAgIHByb3AucmF3ID09PSBudWxsIHx8IC8vIGFic2NlbnRcbiAgICB2YWx1ZSA9PSBudWxsKSAvLyBudWxsIG9yIHVuZGVmaW5lZFxuICAgICkge1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH1cbiAgICB2YXIgb3B0aW9ucyA9IHByb3Aub3B0aW9ucztcbiAgICB2YXIgdHlwZSA9IG9wdGlvbnMudHlwZTtcbiAgICB2YXIgdmFsaWQgPSAhdHlwZTtcbiAgICB2YXIgZXhwZWN0ZWRUeXBlcyA9IFtdO1xuICAgIGlmICh0eXBlKSB7XG4gICAgICBpZiAoIWlzQXJyYXkodHlwZSkpIHtcbiAgICAgICAgdHlwZSA9IFt0eXBlXTtcbiAgICAgIH1cbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdHlwZS5sZW5ndGggJiYgIXZhbGlkOyBpKyspIHtcbiAgICAgICAgdmFyIGFzc2VydGVkVHlwZSA9IGFzc2VydFR5cGUodmFsdWUsIHR5cGVbaV0pO1xuICAgICAgICBleHBlY3RlZFR5cGVzLnB1c2goYXNzZXJ0ZWRUeXBlLmV4cGVjdGVkVHlwZSk7XG4gICAgICAgIHZhbGlkID0gYXNzZXJ0ZWRUeXBlLnZhbGlkO1xuICAgICAgfVxuICAgIH1cbiAgICBpZiAoIXZhbGlkKSB7XG4gICAgICBpZiAoJ2RldmVsb3BtZW50JyAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgICAgIHdhcm4oJ0ludmFsaWQgcHJvcDogdHlwZSBjaGVjayBmYWlsZWQgZm9yIHByb3AgXCInICsgcHJvcC5uYW1lICsgJ1wiLicgKyAnIEV4cGVjdGVkICcgKyBleHBlY3RlZFR5cGVzLm1hcChmb3JtYXRUeXBlKS5qb2luKCcsICcpICsgJywgZ290ICcgKyBmb3JtYXRWYWx1ZSh2YWx1ZSkgKyAnLicsIHZtKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgdmFyIHZhbGlkYXRvciA9IG9wdGlvbnMudmFsaWRhdG9yO1xuICAgIGlmICh2YWxpZGF0b3IpIHtcbiAgICAgIGlmICghdmFsaWRhdG9yKHZhbHVlKSkge1xuICAgICAgICAnZGV2ZWxvcG1lbnQnICE9PSAncHJvZHVjdGlvbicgJiYgd2FybignSW52YWxpZCBwcm9wOiBjdXN0b20gdmFsaWRhdG9yIGNoZWNrIGZhaWxlZCBmb3IgcHJvcCBcIicgKyBwcm9wLm5hbWUgKyAnXCIuJywgdm0pO1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgLyoqXG4gICAqIEZvcmNlIHBhcnNpbmcgdmFsdWUgd2l0aCBjb2VyY2Ugb3B0aW9uLlxuICAgKlxuICAgKiBAcGFyYW0geyp9IHZhbHVlXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zXG4gICAqIEByZXR1cm4geyp9XG4gICAqL1xuXG4gIGZ1bmN0aW9uIGNvZXJjZVByb3AocHJvcCwgdmFsdWUpIHtcbiAgICB2YXIgY29lcmNlID0gcHJvcC5vcHRpb25zLmNvZXJjZTtcbiAgICBpZiAoIWNvZXJjZSkge1xuICAgICAgcmV0dXJuIHZhbHVlO1xuICAgIH1cbiAgICAvLyBjb2VyY2UgaXMgYSBmdW5jdGlvblxuICAgIHJldHVybiBjb2VyY2UodmFsdWUpO1xuICB9XG5cbiAgLyoqXG4gICAqIEFzc2VydCB0aGUgdHlwZSBvZiBhIHZhbHVlXG4gICAqXG4gICAqIEBwYXJhbSB7Kn0gdmFsdWVcbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gdHlwZVxuICAgKiBAcmV0dXJuIHtPYmplY3R9XG4gICAqL1xuXG4gIGZ1bmN0aW9uIGFzc2VydFR5cGUodmFsdWUsIHR5cGUpIHtcbiAgICB2YXIgdmFsaWQ7XG4gICAgdmFyIGV4cGVjdGVkVHlwZTtcbiAgICBpZiAodHlwZSA9PT0gU3RyaW5nKSB7XG4gICAgICBleHBlY3RlZFR5cGUgPSAnc3RyaW5nJztcbiAgICAgIHZhbGlkID0gdHlwZW9mIHZhbHVlID09PSBleHBlY3RlZFR5cGU7XG4gICAgfSBlbHNlIGlmICh0eXBlID09PSBOdW1iZXIpIHtcbiAgICAgIGV4cGVjdGVkVHlwZSA9ICdudW1iZXInO1xuICAgICAgdmFsaWQgPSB0eXBlb2YgdmFsdWUgPT09IGV4cGVjdGVkVHlwZTtcbiAgICB9IGVsc2UgaWYgKHR5cGUgPT09IEJvb2xlYW4pIHtcbiAgICAgIGV4cGVjdGVkVHlwZSA9ICdib29sZWFuJztcbiAgICAgIHZhbGlkID0gdHlwZW9mIHZhbHVlID09PSBleHBlY3RlZFR5cGU7XG4gICAgfSBlbHNlIGlmICh0eXBlID09PSBGdW5jdGlvbikge1xuICAgICAgZXhwZWN0ZWRUeXBlID0gJ2Z1bmN0aW9uJztcbiAgICAgIHZhbGlkID0gdHlwZW9mIHZhbHVlID09PSBleHBlY3RlZFR5cGU7XG4gICAgfSBlbHNlIGlmICh0eXBlID09PSBPYmplY3QpIHtcbiAgICAgIGV4cGVjdGVkVHlwZSA9ICdvYmplY3QnO1xuICAgICAgdmFsaWQgPSBpc1BsYWluT2JqZWN0KHZhbHVlKTtcbiAgICB9IGVsc2UgaWYgKHR5cGUgPT09IEFycmF5KSB7XG4gICAgICBleHBlY3RlZFR5cGUgPSAnYXJyYXknO1xuICAgICAgdmFsaWQgPSBpc0FycmF5KHZhbHVlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdmFsaWQgPSB2YWx1ZSBpbnN0YW5jZW9mIHR5cGU7XG4gICAgfVxuICAgIHJldHVybiB7XG4gICAgICB2YWxpZDogdmFsaWQsXG4gICAgICBleHBlY3RlZFR5cGU6IGV4cGVjdGVkVHlwZVxuICAgIH07XG4gIH1cblxuICAvKipcbiAgICogRm9ybWF0IHR5cGUgZm9yIG91dHB1dFxuICAgKlxuICAgKiBAcGFyYW0ge1N0cmluZ30gdHlwZVxuICAgKiBAcmV0dXJuIHtTdHJpbmd9XG4gICAqL1xuXG4gIGZ1bmN0aW9uIGZvcm1hdFR5cGUodHlwZSkge1xuICAgIHJldHVybiB0eXBlID8gdHlwZS5jaGFyQXQoMCkudG9VcHBlckNhc2UoKSArIHR5cGUuc2xpY2UoMSkgOiAnY3VzdG9tIHR5cGUnO1xuICB9XG5cbiAgLyoqXG4gICAqIEZvcm1hdCB2YWx1ZVxuICAgKlxuICAgKiBAcGFyYW0geyp9IHZhbHVlXG4gICAqIEByZXR1cm4ge1N0cmluZ31cbiAgICovXG5cbiAgZnVuY3Rpb24gZm9ybWF0VmFsdWUodmFsKSB7XG4gICAgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbCh2YWwpLnNsaWNlKDgsIC0xKTtcbiAgfVxuXG4gIHZhciBiaW5kaW5nTW9kZXMgPSBjb25maWcuX3Byb3BCaW5kaW5nTW9kZXM7XG5cbiAgdmFyIHByb3BEZWYgPSB7XG5cbiAgICBiaW5kOiBmdW5jdGlvbiBiaW5kKCkge1xuICAgICAgdmFyIGNoaWxkID0gdGhpcy52bTtcbiAgICAgIHZhciBwYXJlbnQgPSBjaGlsZC5fY29udGV4dDtcbiAgICAgIC8vIHBhc3NlZCBpbiBmcm9tIGNvbXBpbGVyIGRpcmVjdGx5XG4gICAgICB2YXIgcHJvcCA9IHRoaXMuZGVzY3JpcHRvci5wcm9wO1xuICAgICAgdmFyIGNoaWxkS2V5ID0gcHJvcC5wYXRoO1xuICAgICAgdmFyIHBhcmVudEtleSA9IHByb3AucGFyZW50UGF0aDtcbiAgICAgIHZhciB0d29XYXkgPSBwcm9wLm1vZGUgPT09IGJpbmRpbmdNb2Rlcy5UV09fV0FZO1xuXG4gICAgICB2YXIgcGFyZW50V2F0Y2hlciA9IHRoaXMucGFyZW50V2F0Y2hlciA9IG5ldyBXYXRjaGVyKHBhcmVudCwgcGFyZW50S2V5LCBmdW5jdGlvbiAodmFsKSB7XG4gICAgICAgIHVwZGF0ZVByb3AoY2hpbGQsIHByb3AsIHZhbCk7XG4gICAgICB9LCB7XG4gICAgICAgIHR3b1dheTogdHdvV2F5LFxuICAgICAgICBmaWx0ZXJzOiBwcm9wLmZpbHRlcnMsXG4gICAgICAgIC8vIGltcG9ydGFudDogcHJvcHMgbmVlZCB0byBiZSBvYnNlcnZlZCBvbiB0aGVcbiAgICAgICAgLy8gdi1mb3Igc2NvcGUgaWYgcHJlc2VudFxuICAgICAgICBzY29wZTogdGhpcy5fc2NvcGVcbiAgICAgIH0pO1xuXG4gICAgICAvLyBzZXQgdGhlIGNoaWxkIGluaXRpYWwgdmFsdWUuXG4gICAgICBpbml0UHJvcChjaGlsZCwgcHJvcCwgcGFyZW50V2F0Y2hlci52YWx1ZSk7XG5cbiAgICAgIC8vIHNldHVwIHR3by13YXkgYmluZGluZ1xuICAgICAgaWYgKHR3b1dheSkge1xuICAgICAgICAvLyBpbXBvcnRhbnQ6IGRlZmVyIHRoZSBjaGlsZCB3YXRjaGVyIGNyZWF0aW9uIHVudGlsXG4gICAgICAgIC8vIHRoZSBjcmVhdGVkIGhvb2sgKGFmdGVyIGRhdGEgb2JzZXJ2YXRpb24pXG4gICAgICAgIHZhciBzZWxmID0gdGhpcztcbiAgICAgICAgY2hpbGQuJG9uY2UoJ3ByZS1ob29rOmNyZWF0ZWQnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgc2VsZi5jaGlsZFdhdGNoZXIgPSBuZXcgV2F0Y2hlcihjaGlsZCwgY2hpbGRLZXksIGZ1bmN0aW9uICh2YWwpIHtcbiAgICAgICAgICAgIHBhcmVudFdhdGNoZXIuc2V0KHZhbCk7XG4gICAgICAgICAgfSwge1xuICAgICAgICAgICAgLy8gZW5zdXJlIHN5bmMgdXB3YXJkIGJlZm9yZSBwYXJlbnQgc3luYyBkb3duLlxuICAgICAgICAgICAgLy8gdGhpcyBpcyBuZWNlc3NhcnkgaW4gY2FzZXMgZS5nLiB0aGUgY2hpbGRcbiAgICAgICAgICAgIC8vIG11dGF0ZXMgYSBwcm9wIGFycmF5LCB0aGVuIHJlcGxhY2VzIGl0LiAoIzE2ODMpXG4gICAgICAgICAgICBzeW5jOiB0cnVlXG4gICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH0sXG5cbiAgICB1bmJpbmQ6IGZ1bmN0aW9uIHVuYmluZCgpIHtcbiAgICAgIHRoaXMucGFyZW50V2F0Y2hlci50ZWFyZG93bigpO1xuICAgICAgaWYgKHRoaXMuY2hpbGRXYXRjaGVyKSB7XG4gICAgICAgIHRoaXMuY2hpbGRXYXRjaGVyLnRlYXJkb3duKCk7XG4gICAgICB9XG4gICAgfVxuICB9O1xuXG4gIHZhciBxdWV1ZSQxID0gW107XG4gIHZhciBxdWV1ZWQgPSBmYWxzZTtcblxuICAvKipcbiAgICogUHVzaCBhIGpvYiBpbnRvIHRoZSBxdWV1ZS5cbiAgICpcbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gam9iXG4gICAqL1xuXG4gIGZ1bmN0aW9uIHB1c2hKb2Ioam9iKSB7XG4gICAgcXVldWUkMS5wdXNoKGpvYik7XG4gICAgaWYgKCFxdWV1ZWQpIHtcbiAgICAgIHF1ZXVlZCA9IHRydWU7XG4gICAgICBuZXh0VGljayhmbHVzaCk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEZsdXNoIHRoZSBxdWV1ZSwgYW5kIGRvIG9uZSBmb3JjZWQgcmVmbG93IGJlZm9yZVxuICAgKiB0cmlnZ2VyaW5nIHRyYW5zaXRpb25zLlxuICAgKi9cblxuICBmdW5jdGlvbiBmbHVzaCgpIHtcbiAgICAvLyBGb3JjZSBsYXlvdXRcbiAgICB2YXIgZiA9IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5vZmZzZXRIZWlnaHQ7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBxdWV1ZSQxLmxlbmd0aDsgaSsrKSB7XG4gICAgICBxdWV1ZSQxW2ldKCk7XG4gICAgfVxuICAgIHF1ZXVlJDEgPSBbXTtcbiAgICBxdWV1ZWQgPSBmYWxzZTtcbiAgICAvLyBkdW1teSByZXR1cm4sIHNvIGpzIGxpbnRlcnMgZG9uJ3QgY29tcGxhaW4gYWJvdXRcbiAgICAvLyB1bnVzZWQgdmFyaWFibGUgZlxuICAgIHJldHVybiBmO1xuICB9XG5cbiAgdmFyIFRZUEVfVFJBTlNJVElPTiA9ICd0cmFuc2l0aW9uJztcbiAgdmFyIFRZUEVfQU5JTUFUSU9OID0gJ2FuaW1hdGlvbic7XG4gIHZhciB0cmFuc0R1cmF0aW9uUHJvcCA9IHRyYW5zaXRpb25Qcm9wICsgJ0R1cmF0aW9uJztcbiAgdmFyIGFuaW1EdXJhdGlvblByb3AgPSBhbmltYXRpb25Qcm9wICsgJ0R1cmF0aW9uJztcblxuICAvKipcbiAgICogSWYgYSBqdXN0LWVudGVyZWQgZWxlbWVudCBpcyBhcHBsaWVkIHRoZVxuICAgKiBsZWF2ZSBjbGFzcyB3aGlsZSBpdHMgZW50ZXIgdHJhbnNpdGlvbiBoYXNuJ3Qgc3RhcnRlZCB5ZXQsXG4gICAqIGFuZCB0aGUgdHJhbnNpdGlvbmVkIHByb3BlcnR5IGhhcyB0aGUgc2FtZSB2YWx1ZSBmb3IgYm90aFxuICAgKiBlbnRlci9sZWF2ZSwgdGhlbiB0aGUgbGVhdmUgdHJhbnNpdGlvbiB3aWxsIGJlIHNraXBwZWQgYW5kXG4gICAqIHRoZSB0cmFuc2l0aW9uZW5kIGV2ZW50IG5ldmVyIGZpcmVzLiBUaGlzIGZ1bmN0aW9uIGVuc3VyZXNcbiAgICogaXRzIGNhbGxiYWNrIHRvIGJlIGNhbGxlZCBhZnRlciBhIHRyYW5zaXRpb24gaGFzIHN0YXJ0ZWRcbiAgICogYnkgd2FpdGluZyBmb3IgZG91YmxlIHJhZi5cbiAgICpcbiAgICogSXQgZmFsbHMgYmFjayB0byBzZXRUaW1lb3V0IG9uIGRldmljZXMgdGhhdCBzdXBwb3J0IENTU1xuICAgKiB0cmFuc2l0aW9ucyBidXQgbm90IHJhZiAoZS5nLiBBbmRyb2lkIDQuMiBicm93c2VyKSAtIHNpbmNlXG4gICAqIHRoZXNlIGVudmlyb25tZW50cyBhcmUgdXN1YWxseSBzbG93LCB3ZSBhcmUgZ2l2aW5nIGl0IGFcbiAgICogcmVsYXRpdmVseSBsYXJnZSB0aW1lb3V0LlxuICAgKi9cblxuICB2YXIgcmFmID0gaW5Ccm93c2VyICYmIHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWU7XG4gIHZhciB3YWl0Rm9yVHJhbnNpdGlvblN0YXJ0ID0gcmFmXG4gIC8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXG4gID8gZnVuY3Rpb24gKGZuKSB7XG4gICAgcmFmKGZ1bmN0aW9uICgpIHtcbiAgICAgIHJhZihmbik7XG4gICAgfSk7XG4gIH0gOiBmdW5jdGlvbiAoZm4pIHtcbiAgICBzZXRUaW1lb3V0KGZuLCA1MCk7XG4gIH07XG5cbiAgLyoqXG4gICAqIEEgVHJhbnNpdGlvbiBvYmplY3QgdGhhdCBlbmNhcHN1bGF0ZXMgdGhlIHN0YXRlIGFuZCBsb2dpY1xuICAgKiBvZiB0aGUgdHJhbnNpdGlvbi5cbiAgICpcbiAgICogQHBhcmFtIHtFbGVtZW50fSBlbFxuICAgKiBAcGFyYW0ge1N0cmluZ30gaWRcbiAgICogQHBhcmFtIHtPYmplY3R9IGhvb2tzXG4gICAqIEBwYXJhbSB7VnVlfSB2bVxuICAgKi9cbiAgZnVuY3Rpb24gVHJhbnNpdGlvbihlbCwgaWQsIGhvb2tzLCB2bSkge1xuICAgIHRoaXMuaWQgPSBpZDtcbiAgICB0aGlzLmVsID0gZWw7XG4gICAgdGhpcy5lbnRlckNsYXNzID0gaG9va3MgJiYgaG9va3MuZW50ZXJDbGFzcyB8fCBpZCArICctZW50ZXInO1xuICAgIHRoaXMubGVhdmVDbGFzcyA9IGhvb2tzICYmIGhvb2tzLmxlYXZlQ2xhc3MgfHwgaWQgKyAnLWxlYXZlJztcbiAgICB0aGlzLmhvb2tzID0gaG9va3M7XG4gICAgdGhpcy52bSA9IHZtO1xuICAgIC8vIGFzeW5jIHN0YXRlXG4gICAgdGhpcy5wZW5kaW5nQ3NzRXZlbnQgPSB0aGlzLnBlbmRpbmdDc3NDYiA9IHRoaXMuY2FuY2VsID0gdGhpcy5wZW5kaW5nSnNDYiA9IHRoaXMub3AgPSB0aGlzLmNiID0gbnVsbDtcbiAgICB0aGlzLmp1c3RFbnRlcmVkID0gZmFsc2U7XG4gICAgdGhpcy5lbnRlcmVkID0gdGhpcy5sZWZ0ID0gZmFsc2U7XG4gICAgdGhpcy50eXBlQ2FjaGUgPSB7fTtcbiAgICAvLyBjaGVjayBjc3MgdHJhbnNpdGlvbiB0eXBlXG4gICAgdGhpcy50eXBlID0gaG9va3MgJiYgaG9va3MudHlwZTtcbiAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgaWYgKi9cbiAgICBpZiAoJ2RldmVsb3BtZW50JyAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgICBpZiAodGhpcy50eXBlICYmIHRoaXMudHlwZSAhPT0gVFlQRV9UUkFOU0lUSU9OICYmIHRoaXMudHlwZSAhPT0gVFlQRV9BTklNQVRJT04pIHtcbiAgICAgICAgd2FybignaW52YWxpZCBDU1MgdHJhbnNpdGlvbiB0eXBlIGZvciB0cmFuc2l0aW9uPVwiJyArIHRoaXMuaWQgKyAnXCI6ICcgKyB0aGlzLnR5cGUsIHZtKTtcbiAgICAgIH1cbiAgICB9XG4gICAgLy8gYmluZFxuICAgIHZhciBzZWxmID0gdGhpcztbJ2VudGVyTmV4dFRpY2snLCAnZW50ZXJEb25lJywgJ2xlYXZlTmV4dFRpY2snLCAnbGVhdmVEb25lJ10uZm9yRWFjaChmdW5jdGlvbiAobSkge1xuICAgICAgc2VsZlttXSA9IGJpbmQoc2VsZlttXSwgc2VsZik7XG4gICAgfSk7XG4gIH1cblxuICB2YXIgcCQxID0gVHJhbnNpdGlvbi5wcm90b3R5cGU7XG5cbiAgLyoqXG4gICAqIFN0YXJ0IGFuIGVudGVyaW5nIHRyYW5zaXRpb24uXG4gICAqXG4gICAqIDEuIGVudGVyIHRyYW5zaXRpb24gdHJpZ2dlcmVkXG4gICAqIDIuIGNhbGwgYmVmb3JlRW50ZXIgaG9va1xuICAgKiAzLiBhZGQgZW50ZXIgY2xhc3NcbiAgICogNC4gaW5zZXJ0L3Nob3cgZWxlbWVudFxuICAgKiA1LiBjYWxsIGVudGVyIGhvb2sgKHdpdGggcG9zc2libGUgZXhwbGljaXQganMgY2FsbGJhY2spXG4gICAqIDYuIHJlZmxvd1xuICAgKiA3LiBiYXNlZCBvbiB0cmFuc2l0aW9uIHR5cGU6XG4gICAqICAgIC0gdHJhbnNpdGlvbjpcbiAgICogICAgICAgIHJlbW92ZSBjbGFzcyBub3csIHdhaXQgZm9yIHRyYW5zaXRpb25lbmQsXG4gICAqICAgICAgICB0aGVuIGRvbmUgaWYgdGhlcmUncyBubyBleHBsaWNpdCBqcyBjYWxsYmFjay5cbiAgICogICAgLSBhbmltYXRpb246XG4gICAqICAgICAgICB3YWl0IGZvciBhbmltYXRpb25lbmQsIHJlbW92ZSBjbGFzcyxcbiAgICogICAgICAgIHRoZW4gZG9uZSBpZiB0aGVyZSdzIG5vIGV4cGxpY2l0IGpzIGNhbGxiYWNrLlxuICAgKiAgICAtIG5vIGNzcyB0cmFuc2l0aW9uOlxuICAgKiAgICAgICAgZG9uZSBub3cgaWYgdGhlcmUncyBubyBleHBsaWNpdCBqcyBjYWxsYmFjay5cbiAgICogOC4gd2FpdCBmb3IgZWl0aGVyIGRvbmUgb3IganMgY2FsbGJhY2ssIHRoZW4gY2FsbFxuICAgKiAgICBhZnRlckVudGVyIGhvb2suXG4gICAqXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IG9wIC0gaW5zZXJ0L3Nob3cgdGhlIGVsZW1lbnRcbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gW2NiXVxuICAgKi9cblxuICBwJDEuZW50ZXIgPSBmdW5jdGlvbiAob3AsIGNiKSB7XG4gICAgdGhpcy5jYW5jZWxQZW5kaW5nKCk7XG4gICAgdGhpcy5jYWxsSG9vaygnYmVmb3JlRW50ZXInKTtcbiAgICB0aGlzLmNiID0gY2I7XG4gICAgYWRkQ2xhc3ModGhpcy5lbCwgdGhpcy5lbnRlckNsYXNzKTtcbiAgICBvcCgpO1xuICAgIHRoaXMuZW50ZXJlZCA9IGZhbHNlO1xuICAgIHRoaXMuY2FsbEhvb2tXaXRoQ2IoJ2VudGVyJyk7XG4gICAgaWYgKHRoaXMuZW50ZXJlZCkge1xuICAgICAgcmV0dXJuOyAvLyB1c2VyIGNhbGxlZCBkb25lIHN5bmNocm9ub3VzbHkuXG4gICAgfVxuICAgIHRoaXMuY2FuY2VsID0gdGhpcy5ob29rcyAmJiB0aGlzLmhvb2tzLmVudGVyQ2FuY2VsbGVkO1xuICAgIHB1c2hKb2IodGhpcy5lbnRlck5leHRUaWNrKTtcbiAgfTtcblxuICAvKipcbiAgICogVGhlIFwibmV4dFRpY2tcIiBwaGFzZSBvZiBhbiBlbnRlcmluZyB0cmFuc2l0aW9uLCB3aGljaCBpc1xuICAgKiB0byBiZSBwdXNoZWQgaW50byBhIHF1ZXVlIGFuZCBleGVjdXRlZCBhZnRlciBhIHJlZmxvdyBzb1xuICAgKiB0aGF0IHJlbW92aW5nIHRoZSBjbGFzcyBjYW4gdHJpZ2dlciBhIENTUyB0cmFuc2l0aW9uLlxuICAgKi9cblxuICBwJDEuZW50ZXJOZXh0VGljayA9IGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgX3RoaXMgPSB0aGlzO1xuXG4gICAgLy8gcHJldmVudCB0cmFuc2l0aW9uIHNraXBwaW5nXG4gICAgdGhpcy5qdXN0RW50ZXJlZCA9IHRydWU7XG4gICAgd2FpdEZvclRyYW5zaXRpb25TdGFydChmdW5jdGlvbiAoKSB7XG4gICAgICBfdGhpcy5qdXN0RW50ZXJlZCA9IGZhbHNlO1xuICAgIH0pO1xuICAgIHZhciBlbnRlckRvbmUgPSB0aGlzLmVudGVyRG9uZTtcbiAgICB2YXIgdHlwZSA9IHRoaXMuZ2V0Q3NzVHJhbnNpdGlvblR5cGUodGhpcy5lbnRlckNsYXNzKTtcbiAgICBpZiAoIXRoaXMucGVuZGluZ0pzQ2IpIHtcbiAgICAgIGlmICh0eXBlID09PSBUWVBFX1RSQU5TSVRJT04pIHtcbiAgICAgICAgLy8gdHJpZ2dlciB0cmFuc2l0aW9uIGJ5IHJlbW92aW5nIGVudGVyIGNsYXNzIG5vd1xuICAgICAgICByZW1vdmVDbGFzcyh0aGlzLmVsLCB0aGlzLmVudGVyQ2xhc3MpO1xuICAgICAgICB0aGlzLnNldHVwQ3NzQ2IodHJhbnNpdGlvbkVuZEV2ZW50LCBlbnRlckRvbmUpO1xuICAgICAgfSBlbHNlIGlmICh0eXBlID09PSBUWVBFX0FOSU1BVElPTikge1xuICAgICAgICB0aGlzLnNldHVwQ3NzQ2IoYW5pbWF0aW9uRW5kRXZlbnQsIGVudGVyRG9uZSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBlbnRlckRvbmUoKTtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKHR5cGUgPT09IFRZUEVfVFJBTlNJVElPTikge1xuICAgICAgcmVtb3ZlQ2xhc3ModGhpcy5lbCwgdGhpcy5lbnRlckNsYXNzKTtcbiAgICB9XG4gIH07XG5cbiAgLyoqXG4gICAqIFRoZSBcImNsZWFudXBcIiBwaGFzZSBvZiBhbiBlbnRlcmluZyB0cmFuc2l0aW9uLlxuICAgKi9cblxuICBwJDEuZW50ZXJEb25lID0gZnVuY3Rpb24gKCkge1xuICAgIHRoaXMuZW50ZXJlZCA9IHRydWU7XG4gICAgdGhpcy5jYW5jZWwgPSB0aGlzLnBlbmRpbmdKc0NiID0gbnVsbDtcbiAgICByZW1vdmVDbGFzcyh0aGlzLmVsLCB0aGlzLmVudGVyQ2xhc3MpO1xuICAgIHRoaXMuY2FsbEhvb2soJ2FmdGVyRW50ZXInKTtcbiAgICBpZiAodGhpcy5jYikgdGhpcy5jYigpO1xuICB9O1xuXG4gIC8qKlxuICAgKiBTdGFydCBhIGxlYXZpbmcgdHJhbnNpdGlvbi5cbiAgICpcbiAgICogMS4gbGVhdmUgdHJhbnNpdGlvbiB0cmlnZ2VyZWQuXG4gICAqIDIuIGNhbGwgYmVmb3JlTGVhdmUgaG9va1xuICAgKiAzLiBhZGQgbGVhdmUgY2xhc3MgKHRyaWdnZXIgY3NzIHRyYW5zaXRpb24pXG4gICAqIDQuIGNhbGwgbGVhdmUgaG9vayAod2l0aCBwb3NzaWJsZSBleHBsaWNpdCBqcyBjYWxsYmFjaylcbiAgICogNS4gcmVmbG93IGlmIG5vIGV4cGxpY2l0IGpzIGNhbGxiYWNrIGlzIHByb3ZpZGVkXG4gICAqIDYuIGJhc2VkIG9uIHRyYW5zaXRpb24gdHlwZTpcbiAgICogICAgLSB0cmFuc2l0aW9uIG9yIGFuaW1hdGlvbjpcbiAgICogICAgICAgIHdhaXQgZm9yIGVuZCBldmVudCwgcmVtb3ZlIGNsYXNzLCB0aGVuIGRvbmUgaWZcbiAgICogICAgICAgIHRoZXJlJ3Mgbm8gZXhwbGljaXQganMgY2FsbGJhY2suXG4gICAqICAgIC0gbm8gY3NzIHRyYW5zaXRpb246XG4gICAqICAgICAgICBkb25lIGlmIHRoZXJlJ3Mgbm8gZXhwbGljaXQganMgY2FsbGJhY2suXG4gICAqIDcuIHdhaXQgZm9yIGVpdGhlciBkb25lIG9yIGpzIGNhbGxiYWNrLCB0aGVuIGNhbGxcbiAgICogICAgYWZ0ZXJMZWF2ZSBob29rLlxuICAgKlxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBvcCAtIHJlbW92ZS9oaWRlIHRoZSBlbGVtZW50XG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IFtjYl1cbiAgICovXG5cbiAgcCQxLmxlYXZlID0gZnVuY3Rpb24gKG9wLCBjYikge1xuICAgIHRoaXMuY2FuY2VsUGVuZGluZygpO1xuICAgIHRoaXMuY2FsbEhvb2soJ2JlZm9yZUxlYXZlJyk7XG4gICAgdGhpcy5vcCA9IG9wO1xuICAgIHRoaXMuY2IgPSBjYjtcbiAgICBhZGRDbGFzcyh0aGlzLmVsLCB0aGlzLmxlYXZlQ2xhc3MpO1xuICAgIHRoaXMubGVmdCA9IGZhbHNlO1xuICAgIHRoaXMuY2FsbEhvb2tXaXRoQ2IoJ2xlYXZlJyk7XG4gICAgaWYgKHRoaXMubGVmdCkge1xuICAgICAgcmV0dXJuOyAvLyB1c2VyIGNhbGxlZCBkb25lIHN5bmNocm9ub3VzbHkuXG4gICAgfVxuICAgIHRoaXMuY2FuY2VsID0gdGhpcy5ob29rcyAmJiB0aGlzLmhvb2tzLmxlYXZlQ2FuY2VsbGVkO1xuICAgIC8vIG9ubHkgbmVlZCB0byBoYW5kbGUgbGVhdmVEb25lIGlmXG4gICAgLy8gMS4gdGhlIHRyYW5zaXRpb24gaXMgYWxyZWFkeSBkb25lIChzeW5jaHJvbm91c2x5IGNhbGxlZFxuICAgIC8vICAgIGJ5IHRoZSB1c2VyLCB3aGljaCBjYXVzZXMgdGhpcy5vcCBzZXQgdG8gbnVsbClcbiAgICAvLyAyLiB0aGVyZSdzIG5vIGV4cGxpY2l0IGpzIGNhbGxiYWNrXG4gICAgaWYgKHRoaXMub3AgJiYgIXRoaXMucGVuZGluZ0pzQ2IpIHtcbiAgICAgIC8vIGlmIGEgQ1NTIHRyYW5zaXRpb24gbGVhdmVzIGltbWVkaWF0ZWx5IGFmdGVyIGVudGVyLFxuICAgICAgLy8gdGhlIHRyYW5zaXRpb25lbmQgZXZlbnQgbmV2ZXIgZmlyZXMuIHRoZXJlZm9yZSB3ZVxuICAgICAgLy8gZGV0ZWN0IHN1Y2ggY2FzZXMgYW5kIGVuZCB0aGUgbGVhdmUgaW1tZWRpYXRlbHkuXG4gICAgICBpZiAodGhpcy5qdXN0RW50ZXJlZCkge1xuICAgICAgICB0aGlzLmxlYXZlRG9uZSgpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcHVzaEpvYih0aGlzLmxlYXZlTmV4dFRpY2spO1xuICAgICAgfVxuICAgIH1cbiAgfTtcblxuICAvKipcbiAgICogVGhlIFwibmV4dFRpY2tcIiBwaGFzZSBvZiBhIGxlYXZpbmcgdHJhbnNpdGlvbi5cbiAgICovXG5cbiAgcCQxLmxlYXZlTmV4dFRpY2sgPSBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIHR5cGUgPSB0aGlzLmdldENzc1RyYW5zaXRpb25UeXBlKHRoaXMubGVhdmVDbGFzcyk7XG4gICAgaWYgKHR5cGUpIHtcbiAgICAgIHZhciBldmVudCA9IHR5cGUgPT09IFRZUEVfVFJBTlNJVElPTiA/IHRyYW5zaXRpb25FbmRFdmVudCA6IGFuaW1hdGlvbkVuZEV2ZW50O1xuICAgICAgdGhpcy5zZXR1cENzc0NiKGV2ZW50LCB0aGlzLmxlYXZlRG9uZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMubGVhdmVEb25lKCk7XG4gICAgfVxuICB9O1xuXG4gIC8qKlxuICAgKiBUaGUgXCJjbGVhbnVwXCIgcGhhc2Ugb2YgYSBsZWF2aW5nIHRyYW5zaXRpb24uXG4gICAqL1xuXG4gIHAkMS5sZWF2ZURvbmUgPSBmdW5jdGlvbiAoKSB7XG4gICAgdGhpcy5sZWZ0ID0gdHJ1ZTtcbiAgICB0aGlzLmNhbmNlbCA9IHRoaXMucGVuZGluZ0pzQ2IgPSBudWxsO1xuICAgIHRoaXMub3AoKTtcbiAgICByZW1vdmVDbGFzcyh0aGlzLmVsLCB0aGlzLmxlYXZlQ2xhc3MpO1xuICAgIHRoaXMuY2FsbEhvb2soJ2FmdGVyTGVhdmUnKTtcbiAgICBpZiAodGhpcy5jYikgdGhpcy5jYigpO1xuICAgIHRoaXMub3AgPSBudWxsO1xuICB9O1xuXG4gIC8qKlxuICAgKiBDYW5jZWwgYW55IHBlbmRpbmcgY2FsbGJhY2tzIGZyb20gYSBwcmV2aW91c2x5IHJ1bm5pbmdcbiAgICogYnV0IG5vdCBmaW5pc2hlZCB0cmFuc2l0aW9uLlxuICAgKi9cblxuICBwJDEuY2FuY2VsUGVuZGluZyA9IGZ1bmN0aW9uICgpIHtcbiAgICB0aGlzLm9wID0gdGhpcy5jYiA9IG51bGw7XG4gICAgdmFyIGhhc1BlbmRpbmcgPSBmYWxzZTtcbiAgICBpZiAodGhpcy5wZW5kaW5nQ3NzQ2IpIHtcbiAgICAgIGhhc1BlbmRpbmcgPSB0cnVlO1xuICAgICAgb2ZmKHRoaXMuZWwsIHRoaXMucGVuZGluZ0Nzc0V2ZW50LCB0aGlzLnBlbmRpbmdDc3NDYik7XG4gICAgICB0aGlzLnBlbmRpbmdDc3NFdmVudCA9IHRoaXMucGVuZGluZ0Nzc0NiID0gbnVsbDtcbiAgICB9XG4gICAgaWYgKHRoaXMucGVuZGluZ0pzQ2IpIHtcbiAgICAgIGhhc1BlbmRpbmcgPSB0cnVlO1xuICAgICAgdGhpcy5wZW5kaW5nSnNDYi5jYW5jZWwoKTtcbiAgICAgIHRoaXMucGVuZGluZ0pzQ2IgPSBudWxsO1xuICAgIH1cbiAgICBpZiAoaGFzUGVuZGluZykge1xuICAgICAgcmVtb3ZlQ2xhc3ModGhpcy5lbCwgdGhpcy5lbnRlckNsYXNzKTtcbiAgICAgIHJlbW92ZUNsYXNzKHRoaXMuZWwsIHRoaXMubGVhdmVDbGFzcyk7XG4gICAgfVxuICAgIGlmICh0aGlzLmNhbmNlbCkge1xuICAgICAgdGhpcy5jYW5jZWwuY2FsbCh0aGlzLnZtLCB0aGlzLmVsKTtcbiAgICAgIHRoaXMuY2FuY2VsID0gbnVsbDtcbiAgICB9XG4gIH07XG5cbiAgLyoqXG4gICAqIENhbGwgYSB1c2VyLXByb3ZpZGVkIHN5bmNocm9ub3VzIGhvb2sgZnVuY3Rpb24uXG4gICAqXG4gICAqIEBwYXJhbSB7U3RyaW5nfSB0eXBlXG4gICAqL1xuXG4gIHAkMS5jYWxsSG9vayA9IGZ1bmN0aW9uICh0eXBlKSB7XG4gICAgaWYgKHRoaXMuaG9va3MgJiYgdGhpcy5ob29rc1t0eXBlXSkge1xuICAgICAgdGhpcy5ob29rc1t0eXBlXS5jYWxsKHRoaXMudm0sIHRoaXMuZWwpO1xuICAgIH1cbiAgfTtcblxuICAvKipcbiAgICogQ2FsbCBhIHVzZXItcHJvdmlkZWQsIHBvdGVudGlhbGx5LWFzeW5jIGhvb2sgZnVuY3Rpb24uXG4gICAqIFdlIGNoZWNrIGZvciB0aGUgbGVuZ3RoIG9mIGFyZ3VtZW50cyB0byBzZWUgaWYgdGhlIGhvb2tcbiAgICogZXhwZWN0cyBhIGBkb25lYCBjYWxsYmFjay4gSWYgdHJ1ZSwgdGhlIHRyYW5zaXRpb24ncyBlbmRcbiAgICogd2lsbCBiZSBkZXRlcm1pbmVkIGJ5IHdoZW4gdGhlIHVzZXIgY2FsbHMgdGhhdCBjYWxsYmFjaztcbiAgICogb3RoZXJ3aXNlLCB0aGUgZW5kIGlzIGRldGVybWluZWQgYnkgdGhlIENTUyB0cmFuc2l0aW9uIG9yXG4gICAqIGFuaW1hdGlvbi5cbiAgICpcbiAgICogQHBhcmFtIHtTdHJpbmd9IHR5cGVcbiAgICovXG5cbiAgcCQxLmNhbGxIb29rV2l0aENiID0gZnVuY3Rpb24gKHR5cGUpIHtcbiAgICB2YXIgaG9vayA9IHRoaXMuaG9va3MgJiYgdGhpcy5ob29rc1t0eXBlXTtcbiAgICBpZiAoaG9vaykge1xuICAgICAgaWYgKGhvb2subGVuZ3RoID4gMSkge1xuICAgICAgICB0aGlzLnBlbmRpbmdKc0NiID0gY2FuY2VsbGFibGUodGhpc1t0eXBlICsgJ0RvbmUnXSk7XG4gICAgICB9XG4gICAgICBob29rLmNhbGwodGhpcy52bSwgdGhpcy5lbCwgdGhpcy5wZW5kaW5nSnNDYik7XG4gICAgfVxuICB9O1xuXG4gIC8qKlxuICAgKiBHZXQgYW4gZWxlbWVudCdzIHRyYW5zaXRpb24gdHlwZSBiYXNlZCBvbiB0aGVcbiAgICogY2FsY3VsYXRlZCBzdHlsZXMuXG4gICAqXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBjbGFzc05hbWVcbiAgICogQHJldHVybiB7TnVtYmVyfVxuICAgKi9cblxuICBwJDEuZ2V0Q3NzVHJhbnNpdGlvblR5cGUgPSBmdW5jdGlvbiAoY2xhc3NOYW1lKSB7XG4gICAgLyogaXN0YW5idWwgaWdub3JlIGlmICovXG4gICAgaWYgKCF0cmFuc2l0aW9uRW5kRXZlbnQgfHxcbiAgICAvLyBza2lwIENTUyB0cmFuc2l0aW9ucyBpZiBwYWdlIGlzIG5vdCB2aXNpYmxlIC1cbiAgICAvLyB0aGlzIHNvbHZlcyB0aGUgaXNzdWUgb2YgdHJhbnNpdGlvbmVuZCBldmVudHMgbm90XG4gICAgLy8gZmlyaW5nIHVudGlsIHRoZSBwYWdlIGlzIHZpc2libGUgYWdhaW4uXG4gICAgLy8gcGFnZVZpc2liaWxpdHkgQVBJIGlzIHN1cHBvcnRlZCBpbiBJRTEwKywgc2FtZSBhc1xuICAgIC8vIENTUyB0cmFuc2l0aW9ucy5cbiAgICBkb2N1bWVudC5oaWRkZW4gfHxcbiAgICAvLyBleHBsaWNpdCBqcy1vbmx5IHRyYW5zaXRpb25cbiAgICB0aGlzLmhvb2tzICYmIHRoaXMuaG9va3MuY3NzID09PSBmYWxzZSB8fFxuICAgIC8vIGVsZW1lbnQgaXMgaGlkZGVuXG4gICAgaXNIaWRkZW4odGhpcy5lbCkpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdmFyIHR5cGUgPSB0aGlzLnR5cGUgfHwgdGhpcy50eXBlQ2FjaGVbY2xhc3NOYW1lXTtcbiAgICBpZiAodHlwZSkgcmV0dXJuIHR5cGU7XG4gICAgdmFyIGlubGluZVN0eWxlcyA9IHRoaXMuZWwuc3R5bGU7XG4gICAgdmFyIGNvbXB1dGVkU3R5bGVzID0gd2luZG93LmdldENvbXB1dGVkU3R5bGUodGhpcy5lbCk7XG4gICAgdmFyIHRyYW5zRHVyYXRpb24gPSBpbmxpbmVTdHlsZXNbdHJhbnNEdXJhdGlvblByb3BdIHx8IGNvbXB1dGVkU3R5bGVzW3RyYW5zRHVyYXRpb25Qcm9wXTtcbiAgICBpZiAodHJhbnNEdXJhdGlvbiAmJiB0cmFuc0R1cmF0aW9uICE9PSAnMHMnKSB7XG4gICAgICB0eXBlID0gVFlQRV9UUkFOU0lUSU9OO1xuICAgIH0gZWxzZSB7XG4gICAgICB2YXIgYW5pbUR1cmF0aW9uID0gaW5saW5lU3R5bGVzW2FuaW1EdXJhdGlvblByb3BdIHx8IGNvbXB1dGVkU3R5bGVzW2FuaW1EdXJhdGlvblByb3BdO1xuICAgICAgaWYgKGFuaW1EdXJhdGlvbiAmJiBhbmltRHVyYXRpb24gIT09ICcwcycpIHtcbiAgICAgICAgdHlwZSA9IFRZUEVfQU5JTUFUSU9OO1xuICAgICAgfVxuICAgIH1cbiAgICBpZiAodHlwZSkge1xuICAgICAgdGhpcy50eXBlQ2FjaGVbY2xhc3NOYW1lXSA9IHR5cGU7XG4gICAgfVxuICAgIHJldHVybiB0eXBlO1xuICB9O1xuXG4gIC8qKlxuICAgKiBTZXR1cCBhIENTUyB0cmFuc2l0aW9uZW5kL2FuaW1hdGlvbmVuZCBjYWxsYmFjay5cbiAgICpcbiAgICogQHBhcmFtIHtTdHJpbmd9IGV2ZW50XG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IGNiXG4gICAqL1xuXG4gIHAkMS5zZXR1cENzc0NiID0gZnVuY3Rpb24gKGV2ZW50LCBjYikge1xuICAgIHRoaXMucGVuZGluZ0Nzc0V2ZW50ID0gZXZlbnQ7XG4gICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgIHZhciBlbCA9IHRoaXMuZWw7XG4gICAgdmFyIG9uRW5kID0gdGhpcy5wZW5kaW5nQ3NzQ2IgPSBmdW5jdGlvbiAoZSkge1xuICAgICAgaWYgKGUudGFyZ2V0ID09PSBlbCkge1xuICAgICAgICBvZmYoZWwsIGV2ZW50LCBvbkVuZCk7XG4gICAgICAgIHNlbGYucGVuZGluZ0Nzc0V2ZW50ID0gc2VsZi5wZW5kaW5nQ3NzQ2IgPSBudWxsO1xuICAgICAgICBpZiAoIXNlbGYucGVuZGluZ0pzQ2IgJiYgY2IpIHtcbiAgICAgICAgICBjYigpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfTtcbiAgICBvbihlbCwgZXZlbnQsIG9uRW5kKTtcbiAgfTtcblxuICAvKipcbiAgICogQ2hlY2sgaWYgYW4gZWxlbWVudCBpcyBoaWRkZW4gLSBpbiB0aGF0IGNhc2Ugd2UgY2FuIGp1c3RcbiAgICogc2tpcCB0aGUgdHJhbnNpdGlvbiBhbGx0b2dldGhlci5cbiAgICpcbiAgICogQHBhcmFtIHtFbGVtZW50fSBlbFxuICAgKiBAcmV0dXJuIHtCb29sZWFufVxuICAgKi9cblxuICBmdW5jdGlvbiBpc0hpZGRlbihlbCkge1xuICAgIGlmICgvc3ZnJC8udGVzdChlbC5uYW1lc3BhY2VVUkkpKSB7XG4gICAgICAvLyBTVkcgZWxlbWVudHMgZG8gbm90IGhhdmUgb2Zmc2V0KFdpZHRofEhlaWdodClcbiAgICAgIC8vIHNvIHdlIG5lZWQgdG8gY2hlY2sgdGhlIGNsaWVudCByZWN0XG4gICAgICB2YXIgcmVjdCA9IGVsLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgICAgcmV0dXJuICEocmVjdC53aWR0aCB8fCByZWN0LmhlaWdodCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiAhKGVsLm9mZnNldFdpZHRoIHx8IGVsLm9mZnNldEhlaWdodCB8fCBlbC5nZXRDbGllbnRSZWN0cygpLmxlbmd0aCk7XG4gICAgfVxuICB9XG5cbiAgdmFyIHRyYW5zaXRpb24kMSA9IHtcblxuICAgIHByaW9yaXR5OiBUUkFOU0lUSU9OLFxuXG4gICAgdXBkYXRlOiBmdW5jdGlvbiB1cGRhdGUoaWQsIG9sZElkKSB7XG4gICAgICB2YXIgZWwgPSB0aGlzLmVsO1xuICAgICAgLy8gcmVzb2x2ZSBvbiBvd25lciB2bVxuICAgICAgdmFyIGhvb2tzID0gcmVzb2x2ZUFzc2V0KHRoaXMudm0uJG9wdGlvbnMsICd0cmFuc2l0aW9ucycsIGlkKTtcbiAgICAgIGlkID0gaWQgfHwgJ3YnO1xuICAgICAgZWwuX192X3RyYW5zID0gbmV3IFRyYW5zaXRpb24oZWwsIGlkLCBob29rcywgdGhpcy52bSk7XG4gICAgICBpZiAob2xkSWQpIHtcbiAgICAgICAgcmVtb3ZlQ2xhc3MoZWwsIG9sZElkICsgJy10cmFuc2l0aW9uJyk7XG4gICAgICB9XG4gICAgICBhZGRDbGFzcyhlbCwgaWQgKyAnLXRyYW5zaXRpb24nKTtcbiAgICB9XG4gIH07XG5cbiAgdmFyIGludGVybmFsRGlyZWN0aXZlcyA9IHtcbiAgICBzdHlsZTogc3R5bGUsXG4gICAgJ2NsYXNzJzogdkNsYXNzLFxuICAgIGNvbXBvbmVudDogY29tcG9uZW50LFxuICAgIHByb3A6IHByb3BEZWYsXG4gICAgdHJhbnNpdGlvbjogdHJhbnNpdGlvbiQxXG4gIH07XG5cbiAgLy8gc3BlY2lhbCBiaW5kaW5nIHByZWZpeGVzXG4gIHZhciBiaW5kUkUgPSAvXnYtYmluZDp8XjovO1xuICB2YXIgb25SRSA9IC9edi1vbjp8XkAvO1xuICB2YXIgZGlyQXR0clJFID0gL152LShbXjpdKykoPzokfDooLiopJCkvO1xuICB2YXIgbW9kaWZpZXJSRSA9IC9cXC5bXlxcLl0rL2c7XG4gIHZhciB0cmFuc2l0aW9uUkUgPSAvXih2LWJpbmQ6fDopP3RyYW5zaXRpb24kLztcblxuICAvLyBkZWZhdWx0IGRpcmVjdGl2ZSBwcmlvcml0eVxuICB2YXIgREVGQVVMVF9QUklPUklUWSA9IDEwMDA7XG4gIHZhciBERUZBVUxUX1RFUk1JTkFMX1BSSU9SSVRZID0gMjAwMDtcblxuICAvKipcbiAgICogQ29tcGlsZSBhIHRlbXBsYXRlIGFuZCByZXR1cm4gYSByZXVzYWJsZSBjb21wb3NpdGUgbGlua1xuICAgKiBmdW5jdGlvbiwgd2hpY2ggcmVjdXJzaXZlbHkgY29udGFpbnMgbW9yZSBsaW5rIGZ1bmN0aW9uc1xuICAgKiBpbnNpZGUuIFRoaXMgdG9wIGxldmVsIGNvbXBpbGUgZnVuY3Rpb24gd291bGQgbm9ybWFsbHlcbiAgICogYmUgY2FsbGVkIG9uIGluc3RhbmNlIHJvb3Qgbm9kZXMsIGJ1dCBjYW4gYWxzbyBiZSB1c2VkXG4gICAqIGZvciBwYXJ0aWFsIGNvbXBpbGF0aW9uIGlmIHRoZSBwYXJ0aWFsIGFyZ3VtZW50IGlzIHRydWUuXG4gICAqXG4gICAqIFRoZSByZXR1cm5lZCBjb21wb3NpdGUgbGluayBmdW5jdGlvbiwgd2hlbiBjYWxsZWQsIHdpbGxcbiAgICogcmV0dXJuIGFuIHVubGluayBmdW5jdGlvbiB0aGF0IHRlYXJzZG93biBhbGwgZGlyZWN0aXZlc1xuICAgKiBjcmVhdGVkIGR1cmluZyB0aGUgbGlua2luZyBwaGFzZS5cbiAgICpcbiAgICogQHBhcmFtIHtFbGVtZW50fERvY3VtZW50RnJhZ21lbnR9IGVsXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zXG4gICAqIEBwYXJhbSB7Qm9vbGVhbn0gcGFydGlhbFxuICAgKiBAcmV0dXJuIHtGdW5jdGlvbn1cbiAgICovXG5cbiAgZnVuY3Rpb24gY29tcGlsZShlbCwgb3B0aW9ucywgcGFydGlhbCkge1xuICAgIC8vIGxpbmsgZnVuY3Rpb24gZm9yIHRoZSBub2RlIGl0c2VsZi5cbiAgICB2YXIgbm9kZUxpbmtGbiA9IHBhcnRpYWwgfHwgIW9wdGlvbnMuX2FzQ29tcG9uZW50ID8gY29tcGlsZU5vZGUoZWwsIG9wdGlvbnMpIDogbnVsbDtcbiAgICAvLyBsaW5rIGZ1bmN0aW9uIGZvciB0aGUgY2hpbGROb2Rlc1xuICAgIHZhciBjaGlsZExpbmtGbiA9ICEobm9kZUxpbmtGbiAmJiBub2RlTGlua0ZuLnRlcm1pbmFsKSAmJiAhaXNTY3JpcHQoZWwpICYmIGVsLmhhc0NoaWxkTm9kZXMoKSA/IGNvbXBpbGVOb2RlTGlzdChlbC5jaGlsZE5vZGVzLCBvcHRpb25zKSA6IG51bGw7XG5cbiAgICAvKipcbiAgICAgKiBBIGNvbXBvc2l0ZSBsaW5rZXIgZnVuY3Rpb24gdG8gYmUgY2FsbGVkIG9uIGEgYWxyZWFkeVxuICAgICAqIGNvbXBpbGVkIHBpZWNlIG9mIERPTSwgd2hpY2ggaW5zdGFudGlhdGVzIGFsbCBkaXJlY3RpdmVcbiAgICAgKiBpbnN0YW5jZXMuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge1Z1ZX0gdm1cbiAgICAgKiBAcGFyYW0ge0VsZW1lbnR8RG9jdW1lbnRGcmFnbWVudH0gZWxcbiAgICAgKiBAcGFyYW0ge1Z1ZX0gW2hvc3RdIC0gaG9zdCB2bSBvZiB0cmFuc2NsdWRlZCBjb250ZW50XG4gICAgICogQHBhcmFtIHtPYmplY3R9IFtzY29wZV0gLSB2LWZvciBzY29wZVxuICAgICAqIEBwYXJhbSB7RnJhZ21lbnR9IFtmcmFnXSAtIGxpbmsgY29udGV4dCBmcmFnbWVudFxuICAgICAqIEByZXR1cm4ge0Z1bmN0aW9ufHVuZGVmaW5lZH1cbiAgICAgKi9cblxuICAgIHJldHVybiBmdW5jdGlvbiBjb21wb3NpdGVMaW5rRm4odm0sIGVsLCBob3N0LCBzY29wZSwgZnJhZykge1xuICAgICAgLy8gY2FjaGUgY2hpbGROb2RlcyBiZWZvcmUgbGlua2luZyBwYXJlbnQsIGZpeCAjNjU3XG4gICAgICB2YXIgY2hpbGROb2RlcyA9IHRvQXJyYXkoZWwuY2hpbGROb2Rlcyk7XG4gICAgICAvLyBsaW5rXG4gICAgICB2YXIgZGlycyA9IGxpbmtBbmRDYXB0dXJlKGZ1bmN0aW9uIGNvbXBvc2l0ZUxpbmtDYXB0dXJlcigpIHtcbiAgICAgICAgaWYgKG5vZGVMaW5rRm4pIG5vZGVMaW5rRm4odm0sIGVsLCBob3N0LCBzY29wZSwgZnJhZyk7XG4gICAgICAgIGlmIChjaGlsZExpbmtGbikgY2hpbGRMaW5rRm4odm0sIGNoaWxkTm9kZXMsIGhvc3QsIHNjb3BlLCBmcmFnKTtcbiAgICAgIH0sIHZtKTtcbiAgICAgIHJldHVybiBtYWtlVW5saW5rRm4odm0sIGRpcnMpO1xuICAgIH07XG4gIH1cblxuICAvKipcbiAgICogQXBwbHkgYSBsaW5rZXIgdG8gYSB2bS9lbGVtZW50IHBhaXIgYW5kIGNhcHR1cmUgdGhlXG4gICAqIGRpcmVjdGl2ZXMgY3JlYXRlZCBkdXJpbmcgdGhlIHByb2Nlc3MuXG4gICAqXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IGxpbmtlclxuICAgKiBAcGFyYW0ge1Z1ZX0gdm1cbiAgICovXG5cbiAgZnVuY3Rpb24gbGlua0FuZENhcHR1cmUobGlua2VyLCB2bSkge1xuICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBpZiAqL1xuICAgIGlmICgnZGV2ZWxvcG1lbnQnID09PSAncHJvZHVjdGlvbicpIHt9XG4gICAgdmFyIG9yaWdpbmFsRGlyQ291bnQgPSB2bS5fZGlyZWN0aXZlcy5sZW5ndGg7XG4gICAgbGlua2VyKCk7XG4gICAgdmFyIGRpcnMgPSB2bS5fZGlyZWN0aXZlcy5zbGljZShvcmlnaW5hbERpckNvdW50KTtcbiAgICBkaXJzLnNvcnQoZGlyZWN0aXZlQ29tcGFyYXRvcik7XG4gICAgZm9yICh2YXIgaSA9IDAsIGwgPSBkaXJzLmxlbmd0aDsgaSA8IGw7IGkrKykge1xuICAgICAgZGlyc1tpXS5fYmluZCgpO1xuICAgIH1cbiAgICByZXR1cm4gZGlycztcbiAgfVxuXG4gIC8qKlxuICAgKiBEaXJlY3RpdmUgcHJpb3JpdHkgc29ydCBjb21wYXJhdG9yXG4gICAqXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBhXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBiXG4gICAqL1xuXG4gIGZ1bmN0aW9uIGRpcmVjdGl2ZUNvbXBhcmF0b3IoYSwgYikge1xuICAgIGEgPSBhLmRlc2NyaXB0b3IuZGVmLnByaW9yaXR5IHx8IERFRkFVTFRfUFJJT1JJVFk7XG4gICAgYiA9IGIuZGVzY3JpcHRvci5kZWYucHJpb3JpdHkgfHwgREVGQVVMVF9QUklPUklUWTtcbiAgICByZXR1cm4gYSA+IGIgPyAtMSA6IGEgPT09IGIgPyAwIDogMTtcbiAgfVxuXG4gIC8qKlxuICAgKiBMaW5rZXIgZnVuY3Rpb25zIHJldHVybiBhbiB1bmxpbmsgZnVuY3Rpb24gdGhhdFxuICAgKiB0ZWFyc2Rvd24gYWxsIGRpcmVjdGl2ZXMgaW5zdGFuY2VzIGdlbmVyYXRlZCBkdXJpbmdcbiAgICogdGhlIHByb2Nlc3MuXG4gICAqXG4gICAqIFdlIGNyZWF0ZSB1bmxpbmsgZnVuY3Rpb25zIHdpdGggb25seSB0aGUgbmVjZXNzYXJ5XG4gICAqIGluZm9ybWF0aW9uIHRvIGF2b2lkIHJldGFpbmluZyBhZGRpdGlvbmFsIGNsb3N1cmVzLlxuICAgKlxuICAgKiBAcGFyYW0ge1Z1ZX0gdm1cbiAgICogQHBhcmFtIHtBcnJheX0gZGlyc1xuICAgKiBAcGFyYW0ge1Z1ZX0gW2NvbnRleHRdXG4gICAqIEBwYXJhbSB7QXJyYXl9IFtjb250ZXh0RGlyc11cbiAgICogQHJldHVybiB7RnVuY3Rpb259XG4gICAqL1xuXG4gIGZ1bmN0aW9uIG1ha2VVbmxpbmtGbih2bSwgZGlycywgY29udGV4dCwgY29udGV4dERpcnMpIHtcbiAgICBmdW5jdGlvbiB1bmxpbmsoZGVzdHJveWluZykge1xuICAgICAgdGVhcmRvd25EaXJzKHZtLCBkaXJzLCBkZXN0cm95aW5nKTtcbiAgICAgIGlmIChjb250ZXh0ICYmIGNvbnRleHREaXJzKSB7XG4gICAgICAgIHRlYXJkb3duRGlycyhjb250ZXh0LCBjb250ZXh0RGlycyk7XG4gICAgICB9XG4gICAgfVxuICAgIC8vIGV4cG9zZSBsaW5rZWQgZGlyZWN0aXZlc1xuICAgIHVubGluay5kaXJzID0gZGlycztcbiAgICByZXR1cm4gdW5saW5rO1xuICB9XG5cbiAgLyoqXG4gICAqIFRlYXJkb3duIHBhcnRpYWwgbGlua2VkIGRpcmVjdGl2ZXMuXG4gICAqXG4gICAqIEBwYXJhbSB7VnVlfSB2bVxuICAgKiBAcGFyYW0ge0FycmF5fSBkaXJzXG4gICAqIEBwYXJhbSB7Qm9vbGVhbn0gZGVzdHJveWluZ1xuICAgKi9cblxuICBmdW5jdGlvbiB0ZWFyZG93bkRpcnModm0sIGRpcnMsIGRlc3Ryb3lpbmcpIHtcbiAgICB2YXIgaSA9IGRpcnMubGVuZ3RoO1xuICAgIHdoaWxlIChpLS0pIHtcbiAgICAgIGRpcnNbaV0uX3RlYXJkb3duKCk7XG4gICAgICBpZiAoJ2RldmVsb3BtZW50JyAhPT0gJ3Byb2R1Y3Rpb24nICYmICFkZXN0cm95aW5nKSB7XG4gICAgICAgIHZtLl9kaXJlY3RpdmVzLiRyZW1vdmUoZGlyc1tpXSk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIENvbXBpbGUgbGluayBwcm9wcyBvbiBhbiBpbnN0YW5jZS5cbiAgICpcbiAgICogQHBhcmFtIHtWdWV9IHZtXG4gICAqIEBwYXJhbSB7RWxlbWVudH0gZWxcbiAgICogQHBhcmFtIHtPYmplY3R9IHByb3BzXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBbc2NvcGVdXG4gICAqIEByZXR1cm4ge0Z1bmN0aW9ufVxuICAgKi9cblxuICBmdW5jdGlvbiBjb21waWxlQW5kTGlua1Byb3BzKHZtLCBlbCwgcHJvcHMsIHNjb3BlKSB7XG4gICAgdmFyIHByb3BzTGlua0ZuID0gY29tcGlsZVByb3BzKGVsLCBwcm9wcywgdm0pO1xuICAgIHZhciBwcm9wRGlycyA9IGxpbmtBbmRDYXB0dXJlKGZ1bmN0aW9uICgpIHtcbiAgICAgIHByb3BzTGlua0ZuKHZtLCBzY29wZSk7XG4gICAgfSwgdm0pO1xuICAgIHJldHVybiBtYWtlVW5saW5rRm4odm0sIHByb3BEaXJzKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDb21waWxlIHRoZSByb290IGVsZW1lbnQgb2YgYW4gaW5zdGFuY2UuXG4gICAqXG4gICAqIDEuIGF0dHJzIG9uIGNvbnRleHQgY29udGFpbmVyIChjb250ZXh0IHNjb3BlKVxuICAgKiAyLiBhdHRycyBvbiB0aGUgY29tcG9uZW50IHRlbXBsYXRlIHJvb3Qgbm9kZSwgaWZcbiAgICogICAgcmVwbGFjZTp0cnVlIChjaGlsZCBzY29wZSlcbiAgICpcbiAgICogSWYgdGhpcyBpcyBhIGZyYWdtZW50IGluc3RhbmNlLCB3ZSBvbmx5IG5lZWQgdG8gY29tcGlsZSAxLlxuICAgKlxuICAgKiBAcGFyYW0ge0VsZW1lbnR9IGVsXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBjb250ZXh0T3B0aW9uc1xuICAgKiBAcmV0dXJuIHtGdW5jdGlvbn1cbiAgICovXG5cbiAgZnVuY3Rpb24gY29tcGlsZVJvb3QoZWwsIG9wdGlvbnMsIGNvbnRleHRPcHRpb25zKSB7XG4gICAgdmFyIGNvbnRhaW5lckF0dHJzID0gb3B0aW9ucy5fY29udGFpbmVyQXR0cnM7XG4gICAgdmFyIHJlcGxhY2VyQXR0cnMgPSBvcHRpb25zLl9yZXBsYWNlckF0dHJzO1xuICAgIHZhciBjb250ZXh0TGlua0ZuLCByZXBsYWNlckxpbmtGbjtcblxuICAgIC8vIG9ubHkgbmVlZCB0byBjb21waWxlIG90aGVyIGF0dHJpYnV0ZXMgZm9yXG4gICAgLy8gbm9uLWZyYWdtZW50IGluc3RhbmNlc1xuICAgIGlmIChlbC5ub2RlVHlwZSAhPT0gMTEpIHtcbiAgICAgIC8vIGZvciBjb21wb25lbnRzLCBjb250YWluZXIgYW5kIHJlcGxhY2VyIG5lZWQgdG8gYmVcbiAgICAgIC8vIGNvbXBpbGVkIHNlcGFyYXRlbHkgYW5kIGxpbmtlZCBpbiBkaWZmZXJlbnQgc2NvcGVzLlxuICAgICAgaWYgKG9wdGlvbnMuX2FzQ29tcG9uZW50KSB7XG4gICAgICAgIC8vIDIuIGNvbnRhaW5lciBhdHRyaWJ1dGVzXG4gICAgICAgIGlmIChjb250YWluZXJBdHRycyAmJiBjb250ZXh0T3B0aW9ucykge1xuICAgICAgICAgIGNvbnRleHRMaW5rRm4gPSBjb21waWxlRGlyZWN0aXZlcyhjb250YWluZXJBdHRycywgY29udGV4dE9wdGlvbnMpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChyZXBsYWNlckF0dHJzKSB7XG4gICAgICAgICAgLy8gMy4gcmVwbGFjZXIgYXR0cmlidXRlc1xuICAgICAgICAgIHJlcGxhY2VyTGlua0ZuID0gY29tcGlsZURpcmVjdGl2ZXMocmVwbGFjZXJBdHRycywgb3B0aW9ucyk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIG5vbi1jb21wb25lbnQsIGp1c3QgY29tcGlsZSBhcyBhIG5vcm1hbCBlbGVtZW50LlxuICAgICAgICByZXBsYWNlckxpbmtGbiA9IGNvbXBpbGVEaXJlY3RpdmVzKGVsLmF0dHJpYnV0ZXMsIG9wdGlvbnMpO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAoJ2RldmVsb3BtZW50JyAhPT0gJ3Byb2R1Y3Rpb24nICYmIGNvbnRhaW5lckF0dHJzKSB7XG4gICAgICAvLyB3YXJuIGNvbnRhaW5lciBkaXJlY3RpdmVzIGZvciBmcmFnbWVudCBpbnN0YW5jZXNcbiAgICAgIHZhciBuYW1lcyA9IGNvbnRhaW5lckF0dHJzLmZpbHRlcihmdW5jdGlvbiAoYXR0cikge1xuICAgICAgICAvLyBhbGxvdyB2dWUtbG9hZGVyL3Z1ZWlmeSBzY29wZWQgY3NzIGF0dHJpYnV0ZXNcbiAgICAgICAgcmV0dXJuIGF0dHIubmFtZS5pbmRleE9mKCdfdi0nKSA8IDAgJiZcbiAgICAgICAgLy8gYWxsb3cgZXZlbnQgbGlzdGVuZXJzXG4gICAgICAgICFvblJFLnRlc3QoYXR0ci5uYW1lKSAmJlxuICAgICAgICAvLyBhbGxvdyBzbG90c1xuICAgICAgICBhdHRyLm5hbWUgIT09ICdzbG90JztcbiAgICAgIH0pLm1hcChmdW5jdGlvbiAoYXR0cikge1xuICAgICAgICByZXR1cm4gJ1wiJyArIGF0dHIubmFtZSArICdcIic7XG4gICAgICB9KTtcbiAgICAgIGlmIChuYW1lcy5sZW5ndGgpIHtcbiAgICAgICAgdmFyIHBsdXJhbCA9IG5hbWVzLmxlbmd0aCA+IDE7XG4gICAgICAgIHdhcm4oJ0F0dHJpYnV0ZScgKyAocGx1cmFsID8gJ3MgJyA6ICcgJykgKyBuYW1lcy5qb2luKCcsICcpICsgKHBsdXJhbCA/ICcgYXJlJyA6ICcgaXMnKSArICcgaWdub3JlZCBvbiBjb21wb25lbnQgJyArICc8JyArIG9wdGlvbnMuZWwudGFnTmFtZS50b0xvd2VyQ2FzZSgpICsgJz4gYmVjYXVzZSAnICsgJ3RoZSBjb21wb25lbnQgaXMgYSBmcmFnbWVudCBpbnN0YW5jZTogJyArICdodHRwOi8vdnVlanMub3JnL2d1aWRlL2NvbXBvbmVudHMuaHRtbCNGcmFnbWVudC1JbnN0YW5jZScpO1xuICAgICAgfVxuICAgIH1cblxuICAgIG9wdGlvbnMuX2NvbnRhaW5lckF0dHJzID0gb3B0aW9ucy5fcmVwbGFjZXJBdHRycyA9IG51bGw7XG4gICAgcmV0dXJuIGZ1bmN0aW9uIHJvb3RMaW5rRm4odm0sIGVsLCBzY29wZSkge1xuICAgICAgLy8gbGluayBjb250ZXh0IHNjb3BlIGRpcnNcbiAgICAgIHZhciBjb250ZXh0ID0gdm0uX2NvbnRleHQ7XG4gICAgICB2YXIgY29udGV4dERpcnM7XG4gICAgICBpZiAoY29udGV4dCAmJiBjb250ZXh0TGlua0ZuKSB7XG4gICAgICAgIGNvbnRleHREaXJzID0gbGlua0FuZENhcHR1cmUoZnVuY3Rpb24gKCkge1xuICAgICAgICAgIGNvbnRleHRMaW5rRm4oY29udGV4dCwgZWwsIG51bGwsIHNjb3BlKTtcbiAgICAgICAgfSwgY29udGV4dCk7XG4gICAgICB9XG5cbiAgICAgIC8vIGxpbmsgc2VsZlxuICAgICAgdmFyIHNlbGZEaXJzID0gbGlua0FuZENhcHR1cmUoZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAocmVwbGFjZXJMaW5rRm4pIHJlcGxhY2VyTGlua0ZuKHZtLCBlbCk7XG4gICAgICB9LCB2bSk7XG5cbiAgICAgIC8vIHJldHVybiB0aGUgdW5saW5rIGZ1bmN0aW9uIHRoYXQgdGVhcnNkb3duIGNvbnRleHRcbiAgICAgIC8vIGNvbnRhaW5lciBkaXJlY3RpdmVzLlxuICAgICAgcmV0dXJuIG1ha2VVbmxpbmtGbih2bSwgc2VsZkRpcnMsIGNvbnRleHQsIGNvbnRleHREaXJzKTtcbiAgICB9O1xuICB9XG5cbiAgLyoqXG4gICAqIENvbXBpbGUgYSBub2RlIGFuZCByZXR1cm4gYSBub2RlTGlua0ZuIGJhc2VkIG9uIHRoZVxuICAgKiBub2RlIHR5cGUuXG4gICAqXG4gICAqIEBwYXJhbSB7Tm9kZX0gbm9kZVxuICAgKiBAcGFyYW0ge09iamVjdH0gb3B0aW9uc1xuICAgKiBAcmV0dXJuIHtGdW5jdGlvbnxudWxsfVxuICAgKi9cblxuICBmdW5jdGlvbiBjb21waWxlTm9kZShub2RlLCBvcHRpb25zKSB7XG4gICAgdmFyIHR5cGUgPSBub2RlLm5vZGVUeXBlO1xuICAgIGlmICh0eXBlID09PSAxICYmICFpc1NjcmlwdChub2RlKSkge1xuICAgICAgcmV0dXJuIGNvbXBpbGVFbGVtZW50KG5vZGUsIG9wdGlvbnMpO1xuICAgIH0gZWxzZSBpZiAodHlwZSA9PT0gMyAmJiBub2RlLmRhdGEudHJpbSgpKSB7XG4gICAgICByZXR1cm4gY29tcGlsZVRleHROb2RlKG5vZGUsIG9wdGlvbnMpO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQ29tcGlsZSBhbiBlbGVtZW50IGFuZCByZXR1cm4gYSBub2RlTGlua0ZuLlxuICAgKlxuICAgKiBAcGFyYW0ge0VsZW1lbnR9IGVsXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zXG4gICAqIEByZXR1cm4ge0Z1bmN0aW9ufG51bGx9XG4gICAqL1xuXG4gIGZ1bmN0aW9uIGNvbXBpbGVFbGVtZW50KGVsLCBvcHRpb25zKSB7XG4gICAgLy8gcHJlcHJvY2VzcyB0ZXh0YXJlYXMuXG4gICAgLy8gdGV4dGFyZWEgdHJlYXRzIGl0cyB0ZXh0IGNvbnRlbnQgYXMgdGhlIGluaXRpYWwgdmFsdWUuXG4gICAgLy8ganVzdCBiaW5kIGl0IGFzIGFuIGF0dHIgZGlyZWN0aXZlIGZvciB2YWx1ZS5cbiAgICBpZiAoZWwudGFnTmFtZSA9PT0gJ1RFWFRBUkVBJykge1xuICAgICAgdmFyIHRva2VucyA9IHBhcnNlVGV4dChlbC52YWx1ZSk7XG4gICAgICBpZiAodG9rZW5zKSB7XG4gICAgICAgIGVsLnNldEF0dHJpYnV0ZSgnOnZhbHVlJywgdG9rZW5zVG9FeHAodG9rZW5zKSk7XG4gICAgICAgIGVsLnZhbHVlID0gJyc7XG4gICAgICB9XG4gICAgfVxuICAgIHZhciBsaW5rRm47XG4gICAgdmFyIGhhc0F0dHJzID0gZWwuaGFzQXR0cmlidXRlcygpO1xuICAgIHZhciBhdHRycyA9IGhhc0F0dHJzICYmIHRvQXJyYXkoZWwuYXR0cmlidXRlcyk7XG4gICAgLy8gY2hlY2sgdGVybWluYWwgZGlyZWN0aXZlcyAoZm9yICYgaWYpXG4gICAgaWYgKGhhc0F0dHJzKSB7XG4gICAgICBsaW5rRm4gPSBjaGVja1Rlcm1pbmFsRGlyZWN0aXZlcyhlbCwgYXR0cnMsIG9wdGlvbnMpO1xuICAgIH1cbiAgICAvLyBjaGVjayBlbGVtZW50IGRpcmVjdGl2ZXNcbiAgICBpZiAoIWxpbmtGbikge1xuICAgICAgbGlua0ZuID0gY2hlY2tFbGVtZW50RGlyZWN0aXZlcyhlbCwgb3B0aW9ucyk7XG4gICAgfVxuICAgIC8vIGNoZWNrIGNvbXBvbmVudFxuICAgIGlmICghbGlua0ZuKSB7XG4gICAgICBsaW5rRm4gPSBjaGVja0NvbXBvbmVudChlbCwgb3B0aW9ucyk7XG4gICAgfVxuICAgIC8vIG5vcm1hbCBkaXJlY3RpdmVzXG4gICAgaWYgKCFsaW5rRm4gJiYgaGFzQXR0cnMpIHtcbiAgICAgIGxpbmtGbiA9IGNvbXBpbGVEaXJlY3RpdmVzKGF0dHJzLCBvcHRpb25zKTtcbiAgICB9XG4gICAgcmV0dXJuIGxpbmtGbjtcbiAgfVxuXG4gIC8qKlxuICAgKiBDb21waWxlIGEgdGV4dE5vZGUgYW5kIHJldHVybiBhIG5vZGVMaW5rRm4uXG4gICAqXG4gICAqIEBwYXJhbSB7VGV4dE5vZGV9IG5vZGVcbiAgICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnNcbiAgICogQHJldHVybiB7RnVuY3Rpb258bnVsbH0gdGV4dE5vZGVMaW5rRm5cbiAgICovXG5cbiAgZnVuY3Rpb24gY29tcGlsZVRleHROb2RlKG5vZGUsIG9wdGlvbnMpIHtcbiAgICAvLyBza2lwIG1hcmtlZCB0ZXh0IG5vZGVzXG4gICAgaWYgKG5vZGUuX3NraXApIHtcbiAgICAgIHJldHVybiByZW1vdmVUZXh0O1xuICAgIH1cblxuICAgIHZhciB0b2tlbnMgPSBwYXJzZVRleHQobm9kZS53aG9sZVRleHQpO1xuICAgIGlmICghdG9rZW5zKSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICAvLyBtYXJrIGFkamFjZW50IHRleHQgbm9kZXMgYXMgc2tpcHBlZCxcbiAgICAvLyBiZWNhdXNlIHdlIGFyZSB1c2luZyBub2RlLndob2xlVGV4dCB0byBjb21waWxlXG4gICAgLy8gYWxsIGFkamFjZW50IHRleHQgbm9kZXMgdG9nZXRoZXIuIFRoaXMgZml4ZXNcbiAgICAvLyBpc3N1ZXMgaW4gSUUgd2hlcmUgc29tZXRpbWVzIGl0IHNwbGl0cyB1cCBhIHNpbmdsZVxuICAgIC8vIHRleHQgbm9kZSBpbnRvIG11bHRpcGxlIG9uZXMuXG4gICAgdmFyIG5leHQgPSBub2RlLm5leHRTaWJsaW5nO1xuICAgIHdoaWxlIChuZXh0ICYmIG5leHQubm9kZVR5cGUgPT09IDMpIHtcbiAgICAgIG5leHQuX3NraXAgPSB0cnVlO1xuICAgICAgbmV4dCA9IG5leHQubmV4dFNpYmxpbmc7XG4gICAgfVxuXG4gICAgdmFyIGZyYWcgPSBkb2N1bWVudC5jcmVhdGVEb2N1bWVudEZyYWdtZW50KCk7XG4gICAgdmFyIGVsLCB0b2tlbjtcbiAgICBmb3IgKHZhciBpID0gMCwgbCA9IHRva2Vucy5sZW5ndGg7IGkgPCBsOyBpKyspIHtcbiAgICAgIHRva2VuID0gdG9rZW5zW2ldO1xuICAgICAgZWwgPSB0b2tlbi50YWcgPyBwcm9jZXNzVGV4dFRva2VuKHRva2VuLCBvcHRpb25zKSA6IGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKHRva2VuLnZhbHVlKTtcbiAgICAgIGZyYWcuYXBwZW5kQ2hpbGQoZWwpO1xuICAgIH1cbiAgICByZXR1cm4gbWFrZVRleHROb2RlTGlua0ZuKHRva2VucywgZnJhZywgb3B0aW9ucyk7XG4gIH1cblxuICAvKipcbiAgICogTGlua2VyIGZvciBhbiBza2lwcGVkIHRleHQgbm9kZS5cbiAgICpcbiAgICogQHBhcmFtIHtWdWV9IHZtXG4gICAqIEBwYXJhbSB7VGV4dH0gbm9kZVxuICAgKi9cblxuICBmdW5jdGlvbiByZW1vdmVUZXh0KHZtLCBub2RlKSB7XG4gICAgcmVtb3ZlKG5vZGUpO1xuICB9XG5cbiAgLyoqXG4gICAqIFByb2Nlc3MgYSBzaW5nbGUgdGV4dCB0b2tlbi5cbiAgICpcbiAgICogQHBhcmFtIHtPYmplY3R9IHRva2VuXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zXG4gICAqIEByZXR1cm4ge05vZGV9XG4gICAqL1xuXG4gIGZ1bmN0aW9uIHByb2Nlc3NUZXh0VG9rZW4odG9rZW4sIG9wdGlvbnMpIHtcbiAgICB2YXIgZWw7XG4gICAgaWYgKHRva2VuLm9uZVRpbWUpIHtcbiAgICAgIGVsID0gZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUodG9rZW4udmFsdWUpO1xuICAgIH0gZWxzZSB7XG4gICAgICBpZiAodG9rZW4uaHRtbCkge1xuICAgICAgICBlbCA9IGRvY3VtZW50LmNyZWF0ZUNvbW1lbnQoJ3YtaHRtbCcpO1xuICAgICAgICBzZXRUb2tlblR5cGUoJ2h0bWwnKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIElFIHdpbGwgY2xlYW4gdXAgZW1wdHkgdGV4dE5vZGVzIGR1cmluZ1xuICAgICAgICAvLyBmcmFnLmNsb25lTm9kZSh0cnVlKSwgc28gd2UgaGF2ZSB0byBnaXZlIGl0XG4gICAgICAgIC8vIHNvbWV0aGluZyBoZXJlLi4uXG4gICAgICAgIGVsID0gZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoJyAnKTtcbiAgICAgICAgc2V0VG9rZW5UeXBlKCd0ZXh0Jyk7XG4gICAgICB9XG4gICAgfVxuICAgIGZ1bmN0aW9uIHNldFRva2VuVHlwZSh0eXBlKSB7XG4gICAgICBpZiAodG9rZW4uZGVzY3JpcHRvcikgcmV0dXJuO1xuICAgICAgdmFyIHBhcnNlZCA9IHBhcnNlRGlyZWN0aXZlKHRva2VuLnZhbHVlKTtcbiAgICAgIHRva2VuLmRlc2NyaXB0b3IgPSB7XG4gICAgICAgIG5hbWU6IHR5cGUsXG4gICAgICAgIGRlZjogZGlyZWN0aXZlc1t0eXBlXSxcbiAgICAgICAgZXhwcmVzc2lvbjogcGFyc2VkLmV4cHJlc3Npb24sXG4gICAgICAgIGZpbHRlcnM6IHBhcnNlZC5maWx0ZXJzXG4gICAgICB9O1xuICAgIH1cbiAgICByZXR1cm4gZWw7XG4gIH1cblxuICAvKipcbiAgICogQnVpbGQgYSBmdW5jdGlvbiB0aGF0IHByb2Nlc3NlcyBhIHRleHROb2RlLlxuICAgKlxuICAgKiBAcGFyYW0ge0FycmF5PE9iamVjdD59IHRva2Vuc1xuICAgKiBAcGFyYW0ge0RvY3VtZW50RnJhZ21lbnR9IGZyYWdcbiAgICovXG5cbiAgZnVuY3Rpb24gbWFrZVRleHROb2RlTGlua0ZuKHRva2VucywgZnJhZykge1xuICAgIHJldHVybiBmdW5jdGlvbiB0ZXh0Tm9kZUxpbmtGbih2bSwgZWwsIGhvc3QsIHNjb3BlKSB7XG4gICAgICB2YXIgZnJhZ0Nsb25lID0gZnJhZy5jbG9uZU5vZGUodHJ1ZSk7XG4gICAgICB2YXIgY2hpbGROb2RlcyA9IHRvQXJyYXkoZnJhZ0Nsb25lLmNoaWxkTm9kZXMpO1xuICAgICAgdmFyIHRva2VuLCB2YWx1ZSwgbm9kZTtcbiAgICAgIGZvciAodmFyIGkgPSAwLCBsID0gdG9rZW5zLmxlbmd0aDsgaSA8IGw7IGkrKykge1xuICAgICAgICB0b2tlbiA9IHRva2Vuc1tpXTtcbiAgICAgICAgdmFsdWUgPSB0b2tlbi52YWx1ZTtcbiAgICAgICAgaWYgKHRva2VuLnRhZykge1xuICAgICAgICAgIG5vZGUgPSBjaGlsZE5vZGVzW2ldO1xuICAgICAgICAgIGlmICh0b2tlbi5vbmVUaW1lKSB7XG4gICAgICAgICAgICB2YWx1ZSA9IChzY29wZSB8fCB2bSkuJGV2YWwodmFsdWUpO1xuICAgICAgICAgICAgaWYgKHRva2VuLmh0bWwpIHtcbiAgICAgICAgICAgICAgcmVwbGFjZShub2RlLCBwYXJzZVRlbXBsYXRlKHZhbHVlLCB0cnVlKSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICBub2RlLmRhdGEgPSB2YWx1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdm0uX2JpbmREaXIodG9rZW4uZGVzY3JpcHRvciwgbm9kZSwgaG9zdCwgc2NvcGUpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmVwbGFjZShlbCwgZnJhZ0Nsb25lKTtcbiAgICB9O1xuICB9XG5cbiAgLyoqXG4gICAqIENvbXBpbGUgYSBub2RlIGxpc3QgYW5kIHJldHVybiBhIGNoaWxkTGlua0ZuLlxuICAgKlxuICAgKiBAcGFyYW0ge05vZGVMaXN0fSBub2RlTGlzdFxuICAgKiBAcGFyYW0ge09iamVjdH0gb3B0aW9uc1xuICAgKiBAcmV0dXJuIHtGdW5jdGlvbnx1bmRlZmluZWR9XG4gICAqL1xuXG4gIGZ1bmN0aW9uIGNvbXBpbGVOb2RlTGlzdChub2RlTGlzdCwgb3B0aW9ucykge1xuICAgIHZhciBsaW5rRm5zID0gW107XG4gICAgdmFyIG5vZGVMaW5rRm4sIGNoaWxkTGlua0ZuLCBub2RlO1xuICAgIGZvciAodmFyIGkgPSAwLCBsID0gbm9kZUxpc3QubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG4gICAgICBub2RlID0gbm9kZUxpc3RbaV07XG4gICAgICBub2RlTGlua0ZuID0gY29tcGlsZU5vZGUobm9kZSwgb3B0aW9ucyk7XG4gICAgICBjaGlsZExpbmtGbiA9ICEobm9kZUxpbmtGbiAmJiBub2RlTGlua0ZuLnRlcm1pbmFsKSAmJiBub2RlLnRhZ05hbWUgIT09ICdTQ1JJUFQnICYmIG5vZGUuaGFzQ2hpbGROb2RlcygpID8gY29tcGlsZU5vZGVMaXN0KG5vZGUuY2hpbGROb2Rlcywgb3B0aW9ucykgOiBudWxsO1xuICAgICAgbGlua0Zucy5wdXNoKG5vZGVMaW5rRm4sIGNoaWxkTGlua0ZuKTtcbiAgICB9XG4gICAgcmV0dXJuIGxpbmtGbnMubGVuZ3RoID8gbWFrZUNoaWxkTGlua0ZuKGxpbmtGbnMpIDogbnVsbDtcbiAgfVxuXG4gIC8qKlxuICAgKiBNYWtlIGEgY2hpbGQgbGluayBmdW5jdGlvbiBmb3IgYSBub2RlJ3MgY2hpbGROb2Rlcy5cbiAgICpcbiAgICogQHBhcmFtIHtBcnJheTxGdW5jdGlvbj59IGxpbmtGbnNcbiAgICogQHJldHVybiB7RnVuY3Rpb259IGNoaWxkTGlua0ZuXG4gICAqL1xuXG4gIGZ1bmN0aW9uIG1ha2VDaGlsZExpbmtGbihsaW5rRm5zKSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uIGNoaWxkTGlua0ZuKHZtLCBub2RlcywgaG9zdCwgc2NvcGUsIGZyYWcpIHtcbiAgICAgIHZhciBub2RlLCBub2RlTGlua0ZuLCBjaGlsZHJlbkxpbmtGbjtcbiAgICAgIGZvciAodmFyIGkgPSAwLCBuID0gMCwgbCA9IGxpbmtGbnMubGVuZ3RoOyBpIDwgbDsgbisrKSB7XG4gICAgICAgIG5vZGUgPSBub2Rlc1tuXTtcbiAgICAgICAgbm9kZUxpbmtGbiA9IGxpbmtGbnNbaSsrXTtcbiAgICAgICAgY2hpbGRyZW5MaW5rRm4gPSBsaW5rRm5zW2krK107XG4gICAgICAgIC8vIGNhY2hlIGNoaWxkTm9kZXMgYmVmb3JlIGxpbmtpbmcgcGFyZW50LCBmaXggIzY1N1xuICAgICAgICB2YXIgY2hpbGROb2RlcyA9IHRvQXJyYXkobm9kZS5jaGlsZE5vZGVzKTtcbiAgICAgICAgaWYgKG5vZGVMaW5rRm4pIHtcbiAgICAgICAgICBub2RlTGlua0ZuKHZtLCBub2RlLCBob3N0LCBzY29wZSwgZnJhZyk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGNoaWxkcmVuTGlua0ZuKSB7XG4gICAgICAgICAgY2hpbGRyZW5MaW5rRm4odm0sIGNoaWxkTm9kZXMsIGhvc3QsIHNjb3BlLCBmcmFnKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH07XG4gIH1cblxuICAvKipcbiAgICogQ2hlY2sgZm9yIGVsZW1lbnQgZGlyZWN0aXZlcyAoY3VzdG9tIGVsZW1lbnRzIHRoYXQgc2hvdWxkXG4gICAqIGJlIHJlc292bGVkIGFzIHRlcm1pbmFsIGRpcmVjdGl2ZXMpLlxuICAgKlxuICAgKiBAcGFyYW0ge0VsZW1lbnR9IGVsXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zXG4gICAqL1xuXG4gIGZ1bmN0aW9uIGNoZWNrRWxlbWVudERpcmVjdGl2ZXMoZWwsIG9wdGlvbnMpIHtcbiAgICB2YXIgdGFnID0gZWwudGFnTmFtZS50b0xvd2VyQ2FzZSgpO1xuICAgIGlmIChjb21tb25UYWdSRS50ZXN0KHRhZykpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdmFyIGRlZiA9IHJlc29sdmVBc3NldChvcHRpb25zLCAnZWxlbWVudERpcmVjdGl2ZXMnLCB0YWcpO1xuICAgIGlmIChkZWYpIHtcbiAgICAgIHJldHVybiBtYWtlVGVybWluYWxOb2RlTGlua0ZuKGVsLCB0YWcsICcnLCBvcHRpb25zLCBkZWYpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBDaGVjayBpZiBhbiBlbGVtZW50IGlzIGEgY29tcG9uZW50LiBJZiB5ZXMsIHJldHVyblxuICAgKiBhIGNvbXBvbmVudCBsaW5rIGZ1bmN0aW9uLlxuICAgKlxuICAgKiBAcGFyYW0ge0VsZW1lbnR9IGVsXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zXG4gICAqIEByZXR1cm4ge0Z1bmN0aW9ufHVuZGVmaW5lZH1cbiAgICovXG5cbiAgZnVuY3Rpb24gY2hlY2tDb21wb25lbnQoZWwsIG9wdGlvbnMpIHtcbiAgICB2YXIgY29tcG9uZW50ID0gY2hlY2tDb21wb25lbnRBdHRyKGVsLCBvcHRpb25zKTtcbiAgICBpZiAoY29tcG9uZW50KSB7XG4gICAgICB2YXIgcmVmID0gZmluZFJlZihlbCk7XG4gICAgICB2YXIgZGVzY3JpcHRvciA9IHtcbiAgICAgICAgbmFtZTogJ2NvbXBvbmVudCcsXG4gICAgICAgIHJlZjogcmVmLFxuICAgICAgICBleHByZXNzaW9uOiBjb21wb25lbnQuaWQsXG4gICAgICAgIGRlZjogaW50ZXJuYWxEaXJlY3RpdmVzLmNvbXBvbmVudCxcbiAgICAgICAgbW9kaWZpZXJzOiB7XG4gICAgICAgICAgbGl0ZXJhbDogIWNvbXBvbmVudC5keW5hbWljXG4gICAgICAgIH1cbiAgICAgIH07XG4gICAgICB2YXIgY29tcG9uZW50TGlua0ZuID0gZnVuY3Rpb24gY29tcG9uZW50TGlua0ZuKHZtLCBlbCwgaG9zdCwgc2NvcGUsIGZyYWcpIHtcbiAgICAgICAgaWYgKHJlZikge1xuICAgICAgICAgIGRlZmluZVJlYWN0aXZlKChzY29wZSB8fCB2bSkuJHJlZnMsIHJlZiwgbnVsbCk7XG4gICAgICAgIH1cbiAgICAgICAgdm0uX2JpbmREaXIoZGVzY3JpcHRvciwgZWwsIGhvc3QsIHNjb3BlLCBmcmFnKTtcbiAgICAgIH07XG4gICAgICBjb21wb25lbnRMaW5rRm4udGVybWluYWwgPSB0cnVlO1xuICAgICAgcmV0dXJuIGNvbXBvbmVudExpbmtGbjtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQ2hlY2sgYW4gZWxlbWVudCBmb3IgdGVybWluYWwgZGlyZWN0aXZlcyBpbiBmaXhlZCBvcmRlci5cbiAgICogSWYgaXQgZmluZHMgb25lLCByZXR1cm4gYSB0ZXJtaW5hbCBsaW5rIGZ1bmN0aW9uLlxuICAgKlxuICAgKiBAcGFyYW0ge0VsZW1lbnR9IGVsXG4gICAqIEBwYXJhbSB7QXJyYXl9IGF0dHJzXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zXG4gICAqIEByZXR1cm4ge0Z1bmN0aW9ufSB0ZXJtaW5hbExpbmtGblxuICAgKi9cblxuICBmdW5jdGlvbiBjaGVja1Rlcm1pbmFsRGlyZWN0aXZlcyhlbCwgYXR0cnMsIG9wdGlvbnMpIHtcbiAgICAvLyBza2lwIHYtcHJlXG4gICAgaWYgKGdldEF0dHIoZWwsICd2LXByZScpICE9PSBudWxsKSB7XG4gICAgICByZXR1cm4gc2tpcDtcbiAgICB9XG4gICAgLy8gc2tpcCB2LWVsc2UgYmxvY2ssIGJ1dCBvbmx5IGlmIGZvbGxvd2luZyB2LWlmXG4gICAgaWYgKGVsLmhhc0F0dHJpYnV0ZSgndi1lbHNlJykpIHtcbiAgICAgIHZhciBwcmV2ID0gZWwucHJldmlvdXNFbGVtZW50U2libGluZztcbiAgICAgIGlmIChwcmV2ICYmIHByZXYuaGFzQXR0cmlidXRlKCd2LWlmJykpIHtcbiAgICAgICAgcmV0dXJuIHNraXA7XG4gICAgICB9XG4gICAgfVxuXG4gICAgdmFyIGF0dHIsIG5hbWUsIHZhbHVlLCBtb2RpZmllcnMsIG1hdGNoZWQsIGRpck5hbWUsIHJhd05hbWUsIGFyZywgZGVmLCB0ZXJtRGVmO1xuICAgIGZvciAodmFyIGkgPSAwLCBqID0gYXR0cnMubGVuZ3RoOyBpIDwgajsgaSsrKSB7XG4gICAgICBhdHRyID0gYXR0cnNbaV07XG4gICAgICBuYW1lID0gYXR0ci5uYW1lLnJlcGxhY2UobW9kaWZpZXJSRSwgJycpO1xuICAgICAgaWYgKG1hdGNoZWQgPSBuYW1lLm1hdGNoKGRpckF0dHJSRSkpIHtcbiAgICAgICAgZGVmID0gcmVzb2x2ZUFzc2V0KG9wdGlvbnMsICdkaXJlY3RpdmVzJywgbWF0Y2hlZFsxXSk7XG4gICAgICAgIGlmIChkZWYgJiYgZGVmLnRlcm1pbmFsKSB7XG4gICAgICAgICAgaWYgKCF0ZXJtRGVmIHx8IChkZWYucHJpb3JpdHkgfHwgREVGQVVMVF9URVJNSU5BTF9QUklPUklUWSkgPiB0ZXJtRGVmLnByaW9yaXR5KSB7XG4gICAgICAgICAgICB0ZXJtRGVmID0gZGVmO1xuICAgICAgICAgICAgcmF3TmFtZSA9IGF0dHIubmFtZTtcbiAgICAgICAgICAgIG1vZGlmaWVycyA9IHBhcnNlTW9kaWZpZXJzKGF0dHIubmFtZSk7XG4gICAgICAgICAgICB2YWx1ZSA9IGF0dHIudmFsdWU7XG4gICAgICAgICAgICBkaXJOYW1lID0gbWF0Y2hlZFsxXTtcbiAgICAgICAgICAgIGFyZyA9IG1hdGNoZWRbMl07XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKHRlcm1EZWYpIHtcbiAgICAgIHJldHVybiBtYWtlVGVybWluYWxOb2RlTGlua0ZuKGVsLCBkaXJOYW1lLCB2YWx1ZSwgb3B0aW9ucywgdGVybURlZiwgcmF3TmFtZSwgYXJnLCBtb2RpZmllcnMpO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIHNraXAoKSB7fVxuICBza2lwLnRlcm1pbmFsID0gdHJ1ZTtcblxuICAvKipcbiAgICogQnVpbGQgYSBub2RlIGxpbmsgZnVuY3Rpb24gZm9yIGEgdGVybWluYWwgZGlyZWN0aXZlLlxuICAgKiBBIHRlcm1pbmFsIGxpbmsgZnVuY3Rpb24gdGVybWluYXRlcyB0aGUgY3VycmVudFxuICAgKiBjb21waWxhdGlvbiByZWN1cnNpb24gYW5kIGhhbmRsZXMgY29tcGlsYXRpb24gb2YgdGhlXG4gICAqIHN1YnRyZWUgaW4gdGhlIGRpcmVjdGl2ZS5cbiAgICpcbiAgICogQHBhcmFtIHtFbGVtZW50fSBlbFxuICAgKiBAcGFyYW0ge1N0cmluZ30gZGlyTmFtZVxuICAgKiBAcGFyYW0ge1N0cmluZ30gdmFsdWVcbiAgICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnNcbiAgICogQHBhcmFtIHtPYmplY3R9IGRlZlxuICAgKiBAcGFyYW0ge1N0cmluZ30gW3Jhd05hbWVdXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBbYXJnXVxuICAgKiBAcGFyYW0ge09iamVjdH0gW21vZGlmaWVyc11cbiAgICogQHJldHVybiB7RnVuY3Rpb259IHRlcm1pbmFsTGlua0ZuXG4gICAqL1xuXG4gIGZ1bmN0aW9uIG1ha2VUZXJtaW5hbE5vZGVMaW5rRm4oZWwsIGRpck5hbWUsIHZhbHVlLCBvcHRpb25zLCBkZWYsIHJhd05hbWUsIGFyZywgbW9kaWZpZXJzKSB7XG4gICAgdmFyIHBhcnNlZCA9IHBhcnNlRGlyZWN0aXZlKHZhbHVlKTtcbiAgICB2YXIgZGVzY3JpcHRvciA9IHtcbiAgICAgIG5hbWU6IGRpck5hbWUsXG4gICAgICBhcmc6IGFyZyxcbiAgICAgIGV4cHJlc3Npb246IHBhcnNlZC5leHByZXNzaW9uLFxuICAgICAgZmlsdGVyczogcGFyc2VkLmZpbHRlcnMsXG4gICAgICByYXc6IHZhbHVlLFxuICAgICAgYXR0cjogcmF3TmFtZSxcbiAgICAgIG1vZGlmaWVyczogbW9kaWZpZXJzLFxuICAgICAgZGVmOiBkZWZcbiAgICB9O1xuICAgIC8vIGNoZWNrIHJlZiBmb3Igdi1mb3IgYW5kIHJvdXRlci12aWV3XG4gICAgaWYgKGRpck5hbWUgPT09ICdmb3InIHx8IGRpck5hbWUgPT09ICdyb3V0ZXItdmlldycpIHtcbiAgICAgIGRlc2NyaXB0b3IucmVmID0gZmluZFJlZihlbCk7XG4gICAgfVxuICAgIHZhciBmbiA9IGZ1bmN0aW9uIHRlcm1pbmFsTm9kZUxpbmtGbih2bSwgZWwsIGhvc3QsIHNjb3BlLCBmcmFnKSB7XG4gICAgICBpZiAoZGVzY3JpcHRvci5yZWYpIHtcbiAgICAgICAgZGVmaW5lUmVhY3RpdmUoKHNjb3BlIHx8IHZtKS4kcmVmcywgZGVzY3JpcHRvci5yZWYsIG51bGwpO1xuICAgICAgfVxuICAgICAgdm0uX2JpbmREaXIoZGVzY3JpcHRvciwgZWwsIGhvc3QsIHNjb3BlLCBmcmFnKTtcbiAgICB9O1xuICAgIGZuLnRlcm1pbmFsID0gdHJ1ZTtcbiAgICByZXR1cm4gZm47XG4gIH1cblxuICAvKipcbiAgICogQ29tcGlsZSB0aGUgZGlyZWN0aXZlcyBvbiBhbiBlbGVtZW50IGFuZCByZXR1cm4gYSBsaW5rZXIuXG4gICAqXG4gICAqIEBwYXJhbSB7QXJyYXl8TmFtZWROb2RlTWFwfSBhdHRyc1xuICAgKiBAcGFyYW0ge09iamVjdH0gb3B0aW9uc1xuICAgKiBAcmV0dXJuIHtGdW5jdGlvbn1cbiAgICovXG5cbiAgZnVuY3Rpb24gY29tcGlsZURpcmVjdGl2ZXMoYXR0cnMsIG9wdGlvbnMpIHtcbiAgICB2YXIgaSA9IGF0dHJzLmxlbmd0aDtcbiAgICB2YXIgZGlycyA9IFtdO1xuICAgIHZhciBhdHRyLCBuYW1lLCB2YWx1ZSwgcmF3TmFtZSwgcmF3VmFsdWUsIGRpck5hbWUsIGFyZywgbW9kaWZpZXJzLCBkaXJEZWYsIHRva2VucywgbWF0Y2hlZDtcbiAgICB3aGlsZSAoaS0tKSB7XG4gICAgICBhdHRyID0gYXR0cnNbaV07XG4gICAgICBuYW1lID0gcmF3TmFtZSA9IGF0dHIubmFtZTtcbiAgICAgIHZhbHVlID0gcmF3VmFsdWUgPSBhdHRyLnZhbHVlO1xuICAgICAgdG9rZW5zID0gcGFyc2VUZXh0KHZhbHVlKTtcbiAgICAgIC8vIHJlc2V0IGFyZ1xuICAgICAgYXJnID0gbnVsbDtcbiAgICAgIC8vIGNoZWNrIG1vZGlmaWVyc1xuICAgICAgbW9kaWZpZXJzID0gcGFyc2VNb2RpZmllcnMobmFtZSk7XG4gICAgICBuYW1lID0gbmFtZS5yZXBsYWNlKG1vZGlmaWVyUkUsICcnKTtcblxuICAgICAgLy8gYXR0cmlidXRlIGludGVycG9sYXRpb25zXG4gICAgICBpZiAodG9rZW5zKSB7XG4gICAgICAgIHZhbHVlID0gdG9rZW5zVG9FeHAodG9rZW5zKTtcbiAgICAgICAgYXJnID0gbmFtZTtcbiAgICAgICAgcHVzaERpcignYmluZCcsIGRpcmVjdGl2ZXMuYmluZCwgdG9rZW5zKTtcbiAgICAgICAgLy8gd2FybiBhZ2FpbnN0IG1peGluZyBtdXN0YWNoZXMgd2l0aCB2LWJpbmRcbiAgICAgICAgaWYgKCdkZXZlbG9wbWVudCcgIT09ICdwcm9kdWN0aW9uJykge1xuICAgICAgICAgIGlmIChuYW1lID09PSAnY2xhc3MnICYmIEFycmF5LnByb3RvdHlwZS5zb21lLmNhbGwoYXR0cnMsIGZ1bmN0aW9uIChhdHRyKSB7XG4gICAgICAgICAgICByZXR1cm4gYXR0ci5uYW1lID09PSAnOmNsYXNzJyB8fCBhdHRyLm5hbWUgPT09ICd2LWJpbmQ6Y2xhc3MnO1xuICAgICAgICAgIH0pKSB7XG4gICAgICAgICAgICB3YXJuKCdjbGFzcz1cIicgKyByYXdWYWx1ZSArICdcIjogRG8gbm90IG1peCBtdXN0YWNoZSBpbnRlcnBvbGF0aW9uICcgKyAnYW5kIHYtYmluZCBmb3IgXCJjbGFzc1wiIG9uIHRoZSBzYW1lIGVsZW1lbnQuIFVzZSBvbmUgb3IgdGhlIG90aGVyLicsIG9wdGlvbnMpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSBlbHNlXG5cbiAgICAgICAgLy8gc3BlY2lhbCBhdHRyaWJ1dGU6IHRyYW5zaXRpb25cbiAgICAgICAgaWYgKHRyYW5zaXRpb25SRS50ZXN0KG5hbWUpKSB7XG4gICAgICAgICAgbW9kaWZpZXJzLmxpdGVyYWwgPSAhYmluZFJFLnRlc3QobmFtZSk7XG4gICAgICAgICAgcHVzaERpcigndHJhbnNpdGlvbicsIGludGVybmFsRGlyZWN0aXZlcy50cmFuc2l0aW9uKTtcbiAgICAgICAgfSBlbHNlXG5cbiAgICAgICAgICAvLyBldmVudCBoYW5kbGVyc1xuICAgICAgICAgIGlmIChvblJFLnRlc3QobmFtZSkpIHtcbiAgICAgICAgICAgIGFyZyA9IG5hbWUucmVwbGFjZShvblJFLCAnJyk7XG4gICAgICAgICAgICBwdXNoRGlyKCdvbicsIGRpcmVjdGl2ZXMub24pO1xuICAgICAgICAgIH0gZWxzZVxuXG4gICAgICAgICAgICAvLyBhdHRyaWJ1dGUgYmluZGluZ3NcbiAgICAgICAgICAgIGlmIChiaW5kUkUudGVzdChuYW1lKSkge1xuICAgICAgICAgICAgICBkaXJOYW1lID0gbmFtZS5yZXBsYWNlKGJpbmRSRSwgJycpO1xuICAgICAgICAgICAgICBpZiAoZGlyTmFtZSA9PT0gJ3N0eWxlJyB8fCBkaXJOYW1lID09PSAnY2xhc3MnKSB7XG4gICAgICAgICAgICAgICAgcHVzaERpcihkaXJOYW1lLCBpbnRlcm5hbERpcmVjdGl2ZXNbZGlyTmFtZV0pO1xuICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGFyZyA9IGRpck5hbWU7XG4gICAgICAgICAgICAgICAgcHVzaERpcignYmluZCcsIGRpcmVjdGl2ZXMuYmluZCk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZVxuXG4gICAgICAgICAgICAgIC8vIG5vcm1hbCBkaXJlY3RpdmVzXG4gICAgICAgICAgICAgIGlmIChtYXRjaGVkID0gbmFtZS5tYXRjaChkaXJBdHRyUkUpKSB7XG4gICAgICAgICAgICAgICAgZGlyTmFtZSA9IG1hdGNoZWRbMV07XG4gICAgICAgICAgICAgICAgYXJnID0gbWF0Y2hlZFsyXTtcblxuICAgICAgICAgICAgICAgIC8vIHNraXAgdi1lbHNlICh3aGVuIHVzZWQgd2l0aCB2LXNob3cpXG4gICAgICAgICAgICAgICAgaWYgKGRpck5hbWUgPT09ICdlbHNlJykge1xuICAgICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgZGlyRGVmID0gcmVzb2x2ZUFzc2V0KG9wdGlvbnMsICdkaXJlY3RpdmVzJywgZGlyTmFtZSwgdHJ1ZSk7XG4gICAgICAgICAgICAgICAgaWYgKGRpckRlZikge1xuICAgICAgICAgICAgICAgICAgcHVzaERpcihkaXJOYW1lLCBkaXJEZWYpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFB1c2ggYSBkaXJlY3RpdmUuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gZGlyTmFtZVxuICAgICAqIEBwYXJhbSB7T2JqZWN0fEZ1bmN0aW9ufSBkZWZcbiAgICAgKiBAcGFyYW0ge0FycmF5fSBbaW50ZXJwVG9rZW5zXVxuICAgICAqL1xuXG4gICAgZnVuY3Rpb24gcHVzaERpcihkaXJOYW1lLCBkZWYsIGludGVycFRva2Vucykge1xuICAgICAgdmFyIGhhc09uZVRpbWVUb2tlbiA9IGludGVycFRva2VucyAmJiBoYXNPbmVUaW1lKGludGVycFRva2Vucyk7XG4gICAgICB2YXIgcGFyc2VkID0gIWhhc09uZVRpbWVUb2tlbiAmJiBwYXJzZURpcmVjdGl2ZSh2YWx1ZSk7XG4gICAgICBkaXJzLnB1c2goe1xuICAgICAgICBuYW1lOiBkaXJOYW1lLFxuICAgICAgICBhdHRyOiByYXdOYW1lLFxuICAgICAgICByYXc6IHJhd1ZhbHVlLFxuICAgICAgICBkZWY6IGRlZixcbiAgICAgICAgYXJnOiBhcmcsXG4gICAgICAgIG1vZGlmaWVyczogbW9kaWZpZXJzLFxuICAgICAgICAvLyBjb252ZXJzaW9uIGZyb20gaW50ZXJwb2xhdGlvbiBzdHJpbmdzIHdpdGggb25lLXRpbWUgdG9rZW5cbiAgICAgICAgLy8gdG8gZXhwcmVzc2lvbiBpcyBkaWZmZXJlZCB1bnRpbCBkaXJlY3RpdmUgYmluZCB0aW1lIHNvIHRoYXQgd2VcbiAgICAgICAgLy8gaGF2ZSBhY2Nlc3MgdG8gdGhlIGFjdHVhbCB2bSBjb250ZXh0IGZvciBvbmUtdGltZSBiaW5kaW5ncy5cbiAgICAgICAgZXhwcmVzc2lvbjogcGFyc2VkICYmIHBhcnNlZC5leHByZXNzaW9uLFxuICAgICAgICBmaWx0ZXJzOiBwYXJzZWQgJiYgcGFyc2VkLmZpbHRlcnMsXG4gICAgICAgIGludGVycDogaW50ZXJwVG9rZW5zLFxuICAgICAgICBoYXNPbmVUaW1lOiBoYXNPbmVUaW1lVG9rZW5cbiAgICAgIH0pO1xuICAgIH1cblxuICAgIGlmIChkaXJzLmxlbmd0aCkge1xuICAgICAgcmV0dXJuIG1ha2VOb2RlTGlua0ZuKGRpcnMpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBQYXJzZSBtb2RpZmllcnMgZnJvbSBkaXJlY3RpdmUgYXR0cmlidXRlIG5hbWUuXG4gICAqXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBuYW1lXG4gICAqIEByZXR1cm4ge09iamVjdH1cbiAgICovXG5cbiAgZnVuY3Rpb24gcGFyc2VNb2RpZmllcnMobmFtZSkge1xuICAgIHZhciByZXMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuICAgIHZhciBtYXRjaCA9IG5hbWUubWF0Y2gobW9kaWZpZXJSRSk7XG4gICAgaWYgKG1hdGNoKSB7XG4gICAgICB2YXIgaSA9IG1hdGNoLmxlbmd0aDtcbiAgICAgIHdoaWxlIChpLS0pIHtcbiAgICAgICAgcmVzW21hdGNoW2ldLnNsaWNlKDEpXSA9IHRydWU7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiByZXM7XG4gIH1cblxuICAvKipcbiAgICogQnVpbGQgYSBsaW5rIGZ1bmN0aW9uIGZvciBhbGwgZGlyZWN0aXZlcyBvbiBhIHNpbmdsZSBub2RlLlxuICAgKlxuICAgKiBAcGFyYW0ge0FycmF5fSBkaXJlY3RpdmVzXG4gICAqIEByZXR1cm4ge0Z1bmN0aW9ufSBkaXJlY3RpdmVzTGlua0ZuXG4gICAqL1xuXG4gIGZ1bmN0aW9uIG1ha2VOb2RlTGlua0ZuKGRpcmVjdGl2ZXMpIHtcbiAgICByZXR1cm4gZnVuY3Rpb24gbm9kZUxpbmtGbih2bSwgZWwsIGhvc3QsIHNjb3BlLCBmcmFnKSB7XG4gICAgICAvLyByZXZlcnNlIGFwcGx5IGJlY2F1c2UgaXQncyBzb3J0ZWQgbG93IHRvIGhpZ2hcbiAgICAgIHZhciBpID0gZGlyZWN0aXZlcy5sZW5ndGg7XG4gICAgICB3aGlsZSAoaS0tKSB7XG4gICAgICAgIHZtLl9iaW5kRGlyKGRpcmVjdGl2ZXNbaV0sIGVsLCBob3N0LCBzY29wZSwgZnJhZyk7XG4gICAgICB9XG4gICAgfTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDaGVjayBpZiBhbiBpbnRlcnBvbGF0aW9uIHN0cmluZyBjb250YWlucyBvbmUtdGltZSB0b2tlbnMuXG4gICAqXG4gICAqIEBwYXJhbSB7QXJyYXl9IHRva2Vuc1xuICAgKiBAcmV0dXJuIHtCb29sZWFufVxuICAgKi9cblxuICBmdW5jdGlvbiBoYXNPbmVUaW1lKHRva2Vucykge1xuICAgIHZhciBpID0gdG9rZW5zLmxlbmd0aDtcbiAgICB3aGlsZSAoaS0tKSB7XG4gICAgICBpZiAodG9rZW5zW2ldLm9uZVRpbWUpIHJldHVybiB0cnVlO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIGlzU2NyaXB0KGVsKSB7XG4gICAgcmV0dXJuIGVsLnRhZ05hbWUgPT09ICdTQ1JJUFQnICYmICghZWwuaGFzQXR0cmlidXRlKCd0eXBlJykgfHwgZWwuZ2V0QXR0cmlidXRlKCd0eXBlJykgPT09ICd0ZXh0L2phdmFzY3JpcHQnKTtcbiAgfVxuXG4gIHZhciBzcGVjaWFsQ2hhclJFID0gL1teXFx3XFwtOlxcLl0vO1xuXG4gIC8qKlxuICAgKiBQcm9jZXNzIGFuIGVsZW1lbnQgb3IgYSBEb2N1bWVudEZyYWdtZW50IGJhc2VkIG9uIGFcbiAgICogaW5zdGFuY2Ugb3B0aW9uIG9iamVjdC4gVGhpcyBhbGxvd3MgdXMgdG8gdHJhbnNjbHVkZVxuICAgKiBhIHRlbXBsYXRlIG5vZGUvZnJhZ21lbnQgYmVmb3JlIHRoZSBpbnN0YW5jZSBpcyBjcmVhdGVkLFxuICAgKiBzbyB0aGUgcHJvY2Vzc2VkIGZyYWdtZW50IGNhbiB0aGVuIGJlIGNsb25lZCBhbmQgcmV1c2VkXG4gICAqIGluIHYtZm9yLlxuICAgKlxuICAgKiBAcGFyYW0ge0VsZW1lbnR9IGVsXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zXG4gICAqIEByZXR1cm4ge0VsZW1lbnR8RG9jdW1lbnRGcmFnbWVudH1cbiAgICovXG5cbiAgZnVuY3Rpb24gdHJhbnNjbHVkZShlbCwgb3B0aW9ucykge1xuICAgIC8vIGV4dHJhY3QgY29udGFpbmVyIGF0dHJpYnV0ZXMgdG8gcGFzcyB0aGVtIGRvd25cbiAgICAvLyB0byBjb21waWxlciwgYmVjYXVzZSB0aGV5IG5lZWQgdG8gYmUgY29tcGlsZWQgaW5cbiAgICAvLyBwYXJlbnQgc2NvcGUuIHdlIGFyZSBtdXRhdGluZyB0aGUgb3B0aW9ucyBvYmplY3QgaGVyZVxuICAgIC8vIGFzc3VtaW5nIHRoZSBzYW1lIG9iamVjdCB3aWxsIGJlIHVzZWQgZm9yIGNvbXBpbGVcbiAgICAvLyByaWdodCBhZnRlciB0aGlzLlxuICAgIGlmIChvcHRpb25zKSB7XG4gICAgICBvcHRpb25zLl9jb250YWluZXJBdHRycyA9IGV4dHJhY3RBdHRycyhlbCk7XG4gICAgfVxuICAgIC8vIGZvciB0ZW1wbGF0ZSB0YWdzLCB3aGF0IHdlIHdhbnQgaXMgaXRzIGNvbnRlbnQgYXNcbiAgICAvLyBhIGRvY3VtZW50RnJhZ21lbnQgKGZvciBmcmFnbWVudCBpbnN0YW5jZXMpXG4gICAgaWYgKGlzVGVtcGxhdGUoZWwpKSB7XG4gICAgICBlbCA9IHBhcnNlVGVtcGxhdGUoZWwpO1xuICAgIH1cbiAgICBpZiAob3B0aW9ucykge1xuICAgICAgaWYgKG9wdGlvbnMuX2FzQ29tcG9uZW50ICYmICFvcHRpb25zLnRlbXBsYXRlKSB7XG4gICAgICAgIG9wdGlvbnMudGVtcGxhdGUgPSAnPHNsb3Q+PC9zbG90Pic7XG4gICAgICB9XG4gICAgICBpZiAob3B0aW9ucy50ZW1wbGF0ZSkge1xuICAgICAgICBvcHRpb25zLl9jb250ZW50ID0gZXh0cmFjdENvbnRlbnQoZWwpO1xuICAgICAgICBlbCA9IHRyYW5zY2x1ZGVUZW1wbGF0ZShlbCwgb3B0aW9ucyk7XG4gICAgICB9XG4gICAgfVxuICAgIGlmIChpc0ZyYWdtZW50KGVsKSkge1xuICAgICAgLy8gYW5jaG9ycyBmb3IgZnJhZ21lbnQgaW5zdGFuY2VcbiAgICAgIC8vIHBhc3NpbmcgaW4gYHBlcnNpc3Q6IHRydWVgIHRvIGF2b2lkIHRoZW0gYmVpbmdcbiAgICAgIC8vIGRpc2NhcmRlZCBieSBJRSBkdXJpbmcgdGVtcGxhdGUgY2xvbmluZ1xuICAgICAgcHJlcGVuZChjcmVhdGVBbmNob3IoJ3Ytc3RhcnQnLCB0cnVlKSwgZWwpO1xuICAgICAgZWwuYXBwZW5kQ2hpbGQoY3JlYXRlQW5jaG9yKCd2LWVuZCcsIHRydWUpKTtcbiAgICB9XG4gICAgcmV0dXJuIGVsO1xuICB9XG5cbiAgLyoqXG4gICAqIFByb2Nlc3MgdGhlIHRlbXBsYXRlIG9wdGlvbi5cbiAgICogSWYgdGhlIHJlcGxhY2Ugb3B0aW9uIGlzIHRydWUgdGhpcyB3aWxsIHN3YXAgdGhlICRlbC5cbiAgICpcbiAgICogQHBhcmFtIHtFbGVtZW50fSBlbFxuICAgKiBAcGFyYW0ge09iamVjdH0gb3B0aW9uc1xuICAgKiBAcmV0dXJuIHtFbGVtZW50fERvY3VtZW50RnJhZ21lbnR9XG4gICAqL1xuXG4gIGZ1bmN0aW9uIHRyYW5zY2x1ZGVUZW1wbGF0ZShlbCwgb3B0aW9ucykge1xuICAgIHZhciB0ZW1wbGF0ZSA9IG9wdGlvbnMudGVtcGxhdGU7XG4gICAgdmFyIGZyYWcgPSBwYXJzZVRlbXBsYXRlKHRlbXBsYXRlLCB0cnVlKTtcbiAgICBpZiAoZnJhZykge1xuICAgICAgdmFyIHJlcGxhY2VyID0gZnJhZy5maXJzdENoaWxkO1xuICAgICAgdmFyIHRhZyA9IHJlcGxhY2VyLnRhZ05hbWUgJiYgcmVwbGFjZXIudGFnTmFtZS50b0xvd2VyQ2FzZSgpO1xuICAgICAgaWYgKG9wdGlvbnMucmVwbGFjZSkge1xuICAgICAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgaWYgKi9cbiAgICAgICAgaWYgKGVsID09PSBkb2N1bWVudC5ib2R5KSB7XG4gICAgICAgICAgJ2RldmVsb3BtZW50JyAhPT0gJ3Byb2R1Y3Rpb24nICYmIHdhcm4oJ1lvdSBhcmUgbW91bnRpbmcgYW4gaW5zdGFuY2Ugd2l0aCBhIHRlbXBsYXRlIHRvICcgKyAnPGJvZHk+LiBUaGlzIHdpbGwgcmVwbGFjZSA8Ym9keT4gZW50aXJlbHkuIFlvdSAnICsgJ3Nob3VsZCBwcm9iYWJseSB1c2UgYHJlcGxhY2U6IGZhbHNlYCBoZXJlLicpO1xuICAgICAgICB9XG4gICAgICAgIC8vIHRoZXJlIGFyZSBtYW55IGNhc2VzIHdoZXJlIHRoZSBpbnN0YW5jZSBtdXN0XG4gICAgICAgIC8vIGJlY29tZSBhIGZyYWdtZW50IGluc3RhbmNlOiBiYXNpY2FsbHkgYW55dGhpbmcgdGhhdFxuICAgICAgICAvLyBjYW4gY3JlYXRlIG1vcmUgdGhhbiAxIHJvb3Qgbm9kZXMuXG4gICAgICAgIGlmIChcbiAgICAgICAgLy8gbXVsdGktY2hpbGRyZW4gdGVtcGxhdGVcbiAgICAgICAgZnJhZy5jaGlsZE5vZGVzLmxlbmd0aCA+IDEgfHxcbiAgICAgICAgLy8gbm9uLWVsZW1lbnQgdGVtcGxhdGVcbiAgICAgICAgcmVwbGFjZXIubm9kZVR5cGUgIT09IDEgfHxcbiAgICAgICAgLy8gc2luZ2xlIG5lc3RlZCBjb21wb25lbnRcbiAgICAgICAgdGFnID09PSAnY29tcG9uZW50JyB8fCByZXNvbHZlQXNzZXQob3B0aW9ucywgJ2NvbXBvbmVudHMnLCB0YWcpIHx8IGhhc0JpbmRBdHRyKHJlcGxhY2VyLCAnaXMnKSB8fFxuICAgICAgICAvLyBlbGVtZW50IGRpcmVjdGl2ZVxuICAgICAgICByZXNvbHZlQXNzZXQob3B0aW9ucywgJ2VsZW1lbnREaXJlY3RpdmVzJywgdGFnKSB8fFxuICAgICAgICAvLyBmb3IgYmxvY2tcbiAgICAgICAgcmVwbGFjZXIuaGFzQXR0cmlidXRlKCd2LWZvcicpIHx8XG4gICAgICAgIC8vIGlmIGJsb2NrXG4gICAgICAgIHJlcGxhY2VyLmhhc0F0dHJpYnV0ZSgndi1pZicpKSB7XG4gICAgICAgICAgcmV0dXJuIGZyYWc7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgb3B0aW9ucy5fcmVwbGFjZXJBdHRycyA9IGV4dHJhY3RBdHRycyhyZXBsYWNlcik7XG4gICAgICAgICAgbWVyZ2VBdHRycyhlbCwgcmVwbGFjZXIpO1xuICAgICAgICAgIHJldHVybiByZXBsYWNlcjtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZWwuYXBwZW5kQ2hpbGQoZnJhZyk7XG4gICAgICAgIHJldHVybiBlbDtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgJ2RldmVsb3BtZW50JyAhPT0gJ3Byb2R1Y3Rpb24nICYmIHdhcm4oJ0ludmFsaWQgdGVtcGxhdGUgb3B0aW9uOiAnICsgdGVtcGxhdGUpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBIZWxwZXIgdG8gZXh0cmFjdCBhIGNvbXBvbmVudCBjb250YWluZXIncyBhdHRyaWJ1dGVzXG4gICAqIGludG8gYSBwbGFpbiBvYmplY3QgYXJyYXkuXG4gICAqXG4gICAqIEBwYXJhbSB7RWxlbWVudH0gZWxcbiAgICogQHJldHVybiB7QXJyYXl9XG4gICAqL1xuXG4gIGZ1bmN0aW9uIGV4dHJhY3RBdHRycyhlbCkge1xuICAgIGlmIChlbC5ub2RlVHlwZSA9PT0gMSAmJiBlbC5oYXNBdHRyaWJ1dGVzKCkpIHtcbiAgICAgIHJldHVybiB0b0FycmF5KGVsLmF0dHJpYnV0ZXMpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBNZXJnZSB0aGUgYXR0cmlidXRlcyBvZiB0d28gZWxlbWVudHMsIGFuZCBtYWtlIHN1cmVcbiAgICogdGhlIGNsYXNzIG5hbWVzIGFyZSBtZXJnZWQgcHJvcGVybHkuXG4gICAqXG4gICAqIEBwYXJhbSB7RWxlbWVudH0gZnJvbVxuICAgKiBAcGFyYW0ge0VsZW1lbnR9IHRvXG4gICAqL1xuXG4gIGZ1bmN0aW9uIG1lcmdlQXR0cnMoZnJvbSwgdG8pIHtcbiAgICB2YXIgYXR0cnMgPSBmcm9tLmF0dHJpYnV0ZXM7XG4gICAgdmFyIGkgPSBhdHRycy5sZW5ndGg7XG4gICAgdmFyIG5hbWUsIHZhbHVlO1xuICAgIHdoaWxlIChpLS0pIHtcbiAgICAgIG5hbWUgPSBhdHRyc1tpXS5uYW1lO1xuICAgICAgdmFsdWUgPSBhdHRyc1tpXS52YWx1ZTtcbiAgICAgIGlmICghdG8uaGFzQXR0cmlidXRlKG5hbWUpICYmICFzcGVjaWFsQ2hhclJFLnRlc3QobmFtZSkpIHtcbiAgICAgICAgdG8uc2V0QXR0cmlidXRlKG5hbWUsIHZhbHVlKTtcbiAgICAgIH0gZWxzZSBpZiAobmFtZSA9PT0gJ2NsYXNzJyAmJiAhcGFyc2VUZXh0KHZhbHVlKSAmJiAodmFsdWUgPSB2YWx1ZS50cmltKCkpKSB7XG4gICAgICAgIHZhbHVlLnNwbGl0KC9cXHMrLykuZm9yRWFjaChmdW5jdGlvbiAoY2xzKSB7XG4gICAgICAgICAgYWRkQ2xhc3ModG8sIGNscyk7XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBTY2FuIGFuZCBkZXRlcm1pbmUgc2xvdCBjb250ZW50IGRpc3RyaWJ1dGlvbi5cbiAgICogV2UgZG8gdGhpcyBkdXJpbmcgdHJhbnNjbHVzaW9uIGluc3RlYWQgYXQgY29tcGlsZSB0aW1lIHNvIHRoYXRcbiAgICogdGhlIGRpc3RyaWJ1dGlvbiBpcyBkZWNvdXBsZWQgZnJvbSB0aGUgY29tcGlsYXRpb24gb3JkZXIgb2ZcbiAgICogdGhlIHNsb3RzLlxuICAgKlxuICAgKiBAcGFyYW0ge0VsZW1lbnR8RG9jdW1lbnRGcmFnbWVudH0gdGVtcGxhdGVcbiAgICogQHBhcmFtIHtFbGVtZW50fSBjb250ZW50XG4gICAqIEBwYXJhbSB7VnVlfSB2bVxuICAgKi9cblxuICBmdW5jdGlvbiByZXNvbHZlU2xvdHModm0sIGNvbnRlbnQpIHtcbiAgICBpZiAoIWNvbnRlbnQpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdmFyIGNvbnRlbnRzID0gdm0uX3Nsb3RDb250ZW50cyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gICAgdmFyIGVsLCBuYW1lO1xuICAgIGZvciAodmFyIGkgPSAwLCBsID0gY29udGVudC5jaGlsZHJlbi5sZW5ndGg7IGkgPCBsOyBpKyspIHtcbiAgICAgIGVsID0gY29udGVudC5jaGlsZHJlbltpXTtcbiAgICAgIC8qIGVzbGludC1kaXNhYmxlIG5vLWNvbmQtYXNzaWduICovXG4gICAgICBpZiAobmFtZSA9IGVsLmdldEF0dHJpYnV0ZSgnc2xvdCcpKSB7XG4gICAgICAgIChjb250ZW50c1tuYW1lXSB8fCAoY29udGVudHNbbmFtZV0gPSBbXSkpLnB1c2goZWwpO1xuICAgICAgfVxuICAgICAgLyogZXNsaW50LWVuYWJsZSBuby1jb25kLWFzc2lnbiAqL1xuICAgICAgaWYgKCdkZXZlbG9wbWVudCcgIT09ICdwcm9kdWN0aW9uJyAmJiBnZXRCaW5kQXR0cihlbCwgJ3Nsb3QnKSkge1xuICAgICAgICB3YXJuKCdUaGUgXCJzbG90XCIgYXR0cmlidXRlIG11c3QgYmUgc3RhdGljLicsIHZtLiRwYXJlbnQpO1xuICAgICAgfVxuICAgIH1cbiAgICBmb3IgKG5hbWUgaW4gY29udGVudHMpIHtcbiAgICAgIGNvbnRlbnRzW25hbWVdID0gZXh0cmFjdEZyYWdtZW50KGNvbnRlbnRzW25hbWVdLCBjb250ZW50KTtcbiAgICB9XG4gICAgaWYgKGNvbnRlbnQuaGFzQ2hpbGROb2RlcygpKSB7XG4gICAgICB2YXIgbm9kZXMgPSBjb250ZW50LmNoaWxkTm9kZXM7XG4gICAgICBpZiAobm9kZXMubGVuZ3RoID09PSAxICYmIG5vZGVzWzBdLm5vZGVUeXBlID09PSAzICYmICFub2Rlc1swXS5kYXRhLnRyaW0oKSkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBjb250ZW50c1snZGVmYXVsdCddID0gZXh0cmFjdEZyYWdtZW50KGNvbnRlbnQuY2hpbGROb2RlcywgY29udGVudCk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEV4dHJhY3QgcXVhbGlmaWVkIGNvbnRlbnQgbm9kZXMgZnJvbSBhIG5vZGUgbGlzdC5cbiAgICpcbiAgICogQHBhcmFtIHtOb2RlTGlzdH0gbm9kZXNcbiAgICogQHJldHVybiB7RG9jdW1lbnRGcmFnbWVudH1cbiAgICovXG5cbiAgZnVuY3Rpb24gZXh0cmFjdEZyYWdtZW50KG5vZGVzLCBwYXJlbnQpIHtcbiAgICB2YXIgZnJhZyA9IGRvY3VtZW50LmNyZWF0ZURvY3VtZW50RnJhZ21lbnQoKTtcbiAgICBub2RlcyA9IHRvQXJyYXkobm9kZXMpO1xuICAgIGZvciAodmFyIGkgPSAwLCBsID0gbm9kZXMubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG4gICAgICB2YXIgbm9kZSA9IG5vZGVzW2ldO1xuICAgICAgaWYgKGlzVGVtcGxhdGUobm9kZSkgJiYgIW5vZGUuaGFzQXR0cmlidXRlKCd2LWlmJykgJiYgIW5vZGUuaGFzQXR0cmlidXRlKCd2LWZvcicpKSB7XG4gICAgICAgIHBhcmVudC5yZW1vdmVDaGlsZChub2RlKTtcbiAgICAgICAgbm9kZSA9IHBhcnNlVGVtcGxhdGUobm9kZSwgdHJ1ZSk7XG4gICAgICB9XG4gICAgICBmcmFnLmFwcGVuZENoaWxkKG5vZGUpO1xuICAgIH1cbiAgICByZXR1cm4gZnJhZztcbiAgfVxuXG5cblxuICB2YXIgY29tcGlsZXIgPSBPYmplY3QuZnJlZXplKHtcbiAgXHRjb21waWxlOiBjb21waWxlLFxuICBcdGNvbXBpbGVBbmRMaW5rUHJvcHM6IGNvbXBpbGVBbmRMaW5rUHJvcHMsXG4gIFx0Y29tcGlsZVJvb3Q6IGNvbXBpbGVSb290LFxuICBcdHRyYW5zY2x1ZGU6IHRyYW5zY2x1ZGUsXG4gIFx0cmVzb2x2ZVNsb3RzOiByZXNvbHZlU2xvdHNcbiAgfSk7XG5cbiAgZnVuY3Rpb24gc3RhdGVNaXhpbiAoVnVlKSB7XG4gICAgLyoqXG4gICAgICogQWNjZXNzb3IgZm9yIGAkZGF0YWAgcHJvcGVydHksIHNpbmNlIHNldHRpbmcgJGRhdGFcbiAgICAgKiByZXF1aXJlcyBvYnNlcnZpbmcgdGhlIG5ldyBvYmplY3QgYW5kIHVwZGF0aW5nXG4gICAgICogcHJveGllZCBwcm9wZXJ0aWVzLlxuICAgICAqL1xuXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KFZ1ZS5wcm90b3R5cGUsICckZGF0YScsIHtcbiAgICAgIGdldDogZnVuY3Rpb24gZ2V0KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fZGF0YTtcbiAgICAgIH0sXG4gICAgICBzZXQ6IGZ1bmN0aW9uIHNldChuZXdEYXRhKSB7XG4gICAgICAgIGlmIChuZXdEYXRhICE9PSB0aGlzLl9kYXRhKSB7XG4gICAgICAgICAgdGhpcy5fc2V0RGF0YShuZXdEYXRhKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pO1xuXG4gICAgLyoqXG4gICAgICogU2V0dXAgdGhlIHNjb3BlIG9mIGFuIGluc3RhbmNlLCB3aGljaCBjb250YWluczpcbiAgICAgKiAtIG9ic2VydmVkIGRhdGFcbiAgICAgKiAtIGNvbXB1dGVkIHByb3BlcnRpZXNcbiAgICAgKiAtIHVzZXIgbWV0aG9kc1xuICAgICAqIC0gbWV0YSBwcm9wZXJ0aWVzXG4gICAgICovXG5cbiAgICBWdWUucHJvdG90eXBlLl9pbml0U3RhdGUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICB0aGlzLl9pbml0UHJvcHMoKTtcbiAgICAgIHRoaXMuX2luaXRNZXRhKCk7XG4gICAgICB0aGlzLl9pbml0TWV0aG9kcygpO1xuICAgICAgdGhpcy5faW5pdERhdGEoKTtcbiAgICAgIHRoaXMuX2luaXRDb21wdXRlZCgpO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBJbml0aWFsaXplIHByb3BzLlxuICAgICAqL1xuXG4gICAgVnVlLnByb3RvdHlwZS5faW5pdFByb3BzID0gZnVuY3Rpb24gKCkge1xuICAgICAgdmFyIG9wdGlvbnMgPSB0aGlzLiRvcHRpb25zO1xuICAgICAgdmFyIGVsID0gb3B0aW9ucy5lbDtcbiAgICAgIHZhciBwcm9wcyA9IG9wdGlvbnMucHJvcHM7XG4gICAgICBpZiAocHJvcHMgJiYgIWVsKSB7XG4gICAgICAgICdkZXZlbG9wbWVudCcgIT09ICdwcm9kdWN0aW9uJyAmJiB3YXJuKCdQcm9wcyB3aWxsIG5vdCBiZSBjb21waWxlZCBpZiBubyBgZWxgIG9wdGlvbiBpcyAnICsgJ3Byb3ZpZGVkIGF0IGluc3RhbnRpYXRpb24uJywgdGhpcyk7XG4gICAgICB9XG4gICAgICAvLyBtYWtlIHN1cmUgdG8gY29udmVydCBzdHJpbmcgc2VsZWN0b3JzIGludG8gZWxlbWVudCBub3dcbiAgICAgIGVsID0gb3B0aW9ucy5lbCA9IHF1ZXJ5KGVsKTtcbiAgICAgIHRoaXMuX3Byb3BzVW5saW5rRm4gPSBlbCAmJiBlbC5ub2RlVHlwZSA9PT0gMSAmJiBwcm9wc1xuICAgICAgLy8gcHJvcHMgbXVzdCBiZSBsaW5rZWQgaW4gcHJvcGVyIHNjb3BlIGlmIGluc2lkZSB2LWZvclxuICAgICAgPyBjb21waWxlQW5kTGlua1Byb3BzKHRoaXMsIGVsLCBwcm9wcywgdGhpcy5fc2NvcGUpIDogbnVsbDtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogSW5pdGlhbGl6ZSB0aGUgZGF0YS5cbiAgICAgKi9cblxuICAgIFZ1ZS5wcm90b3R5cGUuX2luaXREYXRhID0gZnVuY3Rpb24gKCkge1xuICAgICAgdmFyIGRhdGFGbiA9IHRoaXMuJG9wdGlvbnMuZGF0YTtcbiAgICAgIHZhciBkYXRhID0gdGhpcy5fZGF0YSA9IGRhdGFGbiA/IGRhdGFGbigpIDoge307XG4gICAgICBpZiAoIWlzUGxhaW5PYmplY3QoZGF0YSkpIHtcbiAgICAgICAgZGF0YSA9IHt9O1xuICAgICAgICAnZGV2ZWxvcG1lbnQnICE9PSAncHJvZHVjdGlvbicgJiYgd2FybignZGF0YSBmdW5jdGlvbnMgc2hvdWxkIHJldHVybiBhbiBvYmplY3QuJywgdGhpcyk7XG4gICAgICB9XG4gICAgICB2YXIgcHJvcHMgPSB0aGlzLl9wcm9wcztcbiAgICAgIC8vIHByb3h5IGRhdGEgb24gaW5zdGFuY2VcbiAgICAgIHZhciBrZXlzID0gT2JqZWN0LmtleXMoZGF0YSk7XG4gICAgICB2YXIgaSwga2V5O1xuICAgICAgaSA9IGtleXMubGVuZ3RoO1xuICAgICAgd2hpbGUgKGktLSkge1xuICAgICAgICBrZXkgPSBrZXlzW2ldO1xuICAgICAgICAvLyB0aGVyZSBhcmUgdHdvIHNjZW5hcmlvcyB3aGVyZSB3ZSBjYW4gcHJveHkgYSBkYXRhIGtleTpcbiAgICAgICAgLy8gMS4gaXQncyBub3QgYWxyZWFkeSBkZWZpbmVkIGFzIGEgcHJvcFxuICAgICAgICAvLyAyLiBpdCdzIHByb3ZpZGVkIHZpYSBhIGluc3RhbnRpYXRpb24gb3B0aW9uIEFORCB0aGVyZSBhcmUgbm9cbiAgICAgICAgLy8gICAgdGVtcGxhdGUgcHJvcCBwcmVzZW50XG4gICAgICAgIGlmICghcHJvcHMgfHwgIWhhc093bihwcm9wcywga2V5KSkge1xuICAgICAgICAgIHRoaXMuX3Byb3h5KGtleSk7XG4gICAgICAgIH0gZWxzZSBpZiAoJ2RldmVsb3BtZW50JyAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgICAgICAgd2FybignRGF0YSBmaWVsZCBcIicgKyBrZXkgKyAnXCIgaXMgYWxyZWFkeSBkZWZpbmVkICcgKyAnYXMgYSBwcm9wLiBUbyBwcm92aWRlIGRlZmF1bHQgdmFsdWUgZm9yIGEgcHJvcCwgdXNlIHRoZSBcImRlZmF1bHRcIiAnICsgJ3Byb3Agb3B0aW9uOyBpZiB5b3Ugd2FudCB0byBwYXNzIHByb3AgdmFsdWVzIHRvIGFuIGluc3RhbnRpYXRpb24gJyArICdjYWxsLCB1c2UgdGhlIFwicHJvcHNEYXRhXCIgb3B0aW9uLicsIHRoaXMpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICAvLyBvYnNlcnZlIGRhdGFcbiAgICAgIG9ic2VydmUoZGF0YSwgdGhpcyk7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIFN3YXAgdGhlIGluc3RhbmNlJ3MgJGRhdGEuIENhbGxlZCBpbiAkZGF0YSdzIHNldHRlci5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBuZXdEYXRhXG4gICAgICovXG5cbiAgICBWdWUucHJvdG90eXBlLl9zZXREYXRhID0gZnVuY3Rpb24gKG5ld0RhdGEpIHtcbiAgICAgIG5ld0RhdGEgPSBuZXdEYXRhIHx8IHt9O1xuICAgICAgdmFyIG9sZERhdGEgPSB0aGlzLl9kYXRhO1xuICAgICAgdGhpcy5fZGF0YSA9IG5ld0RhdGE7XG4gICAgICB2YXIga2V5cywga2V5LCBpO1xuICAgICAgLy8gdW5wcm94eSBrZXlzIG5vdCBwcmVzZW50IGluIG5ldyBkYXRhXG4gICAgICBrZXlzID0gT2JqZWN0LmtleXMob2xkRGF0YSk7XG4gICAgICBpID0ga2V5cy5sZW5ndGg7XG4gICAgICB3aGlsZSAoaS0tKSB7XG4gICAgICAgIGtleSA9IGtleXNbaV07XG4gICAgICAgIGlmICghKGtleSBpbiBuZXdEYXRhKSkge1xuICAgICAgICAgIHRoaXMuX3VucHJveHkoa2V5KTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgLy8gcHJveHkga2V5cyBub3QgYWxyZWFkeSBwcm94aWVkLFxuICAgICAgLy8gYW5kIHRyaWdnZXIgY2hhbmdlIGZvciBjaGFuZ2VkIHZhbHVlc1xuICAgICAga2V5cyA9IE9iamVjdC5rZXlzKG5ld0RhdGEpO1xuICAgICAgaSA9IGtleXMubGVuZ3RoO1xuICAgICAgd2hpbGUgKGktLSkge1xuICAgICAgICBrZXkgPSBrZXlzW2ldO1xuICAgICAgICBpZiAoIWhhc093bih0aGlzLCBrZXkpKSB7XG4gICAgICAgICAgLy8gbmV3IHByb3BlcnR5XG4gICAgICAgICAgdGhpcy5fcHJveHkoa2V5KTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgb2xkRGF0YS5fX29iX18ucmVtb3ZlVm0odGhpcyk7XG4gICAgICBvYnNlcnZlKG5ld0RhdGEsIHRoaXMpO1xuICAgICAgdGhpcy5fZGlnZXN0KCk7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIFByb3h5IGEgcHJvcGVydHksIHNvIHRoYXRcbiAgICAgKiB2bS5wcm9wID09PSB2bS5fZGF0YS5wcm9wXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30ga2V5XG4gICAgICovXG5cbiAgICBWdWUucHJvdG90eXBlLl9wcm94eSA9IGZ1bmN0aW9uIChrZXkpIHtcbiAgICAgIGlmICghaXNSZXNlcnZlZChrZXkpKSB7XG4gICAgICAgIC8vIG5lZWQgdG8gc3RvcmUgcmVmIHRvIHNlbGYgaGVyZVxuICAgICAgICAvLyBiZWNhdXNlIHRoZXNlIGdldHRlci9zZXR0ZXJzIG1pZ2h0XG4gICAgICAgIC8vIGJlIGNhbGxlZCBieSBjaGlsZCBzY29wZXMgdmlhXG4gICAgICAgIC8vIHByb3RvdHlwZSBpbmhlcml0YW5jZS5cbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoc2VsZiwga2V5LCB7XG4gICAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlLFxuICAgICAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICAgICAgZ2V0OiBmdW5jdGlvbiBwcm94eUdldHRlcigpIHtcbiAgICAgICAgICAgIHJldHVybiBzZWxmLl9kYXRhW2tleV07XG4gICAgICAgICAgfSxcbiAgICAgICAgICBzZXQ6IGZ1bmN0aW9uIHByb3h5U2V0dGVyKHZhbCkge1xuICAgICAgICAgICAgc2VsZi5fZGF0YVtrZXldID0gdmFsO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIFVucHJveHkgYSBwcm9wZXJ0eS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBrZXlcbiAgICAgKi9cblxuICAgIFZ1ZS5wcm90b3R5cGUuX3VucHJveHkgPSBmdW5jdGlvbiAoa2V5KSB7XG4gICAgICBpZiAoIWlzUmVzZXJ2ZWQoa2V5KSkge1xuICAgICAgICBkZWxldGUgdGhpc1trZXldO1xuICAgICAgfVxuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBGb3JjZSB1cGRhdGUgb24gZXZlcnkgd2F0Y2hlciBpbiBzY29wZS5cbiAgICAgKi9cblxuICAgIFZ1ZS5wcm90b3R5cGUuX2RpZ2VzdCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIGZvciAodmFyIGkgPSAwLCBsID0gdGhpcy5fd2F0Y2hlcnMubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG4gICAgICAgIHRoaXMuX3dhdGNoZXJzW2ldLnVwZGF0ZSh0cnVlKTsgLy8gc2hhbGxvdyB1cGRhdGVzXG4gICAgICB9XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIFNldHVwIGNvbXB1dGVkIHByb3BlcnRpZXMuIFRoZXkgYXJlIGVzc2VudGlhbGx5XG4gICAgICogc3BlY2lhbCBnZXR0ZXIvc2V0dGVyc1xuICAgICAqL1xuXG4gICAgZnVuY3Rpb24gbm9vcCgpIHt9XG4gICAgVnVlLnByb3RvdHlwZS5faW5pdENvbXB1dGVkID0gZnVuY3Rpb24gKCkge1xuICAgICAgdmFyIGNvbXB1dGVkID0gdGhpcy4kb3B0aW9ucy5jb21wdXRlZDtcbiAgICAgIGlmIChjb21wdXRlZCkge1xuICAgICAgICBmb3IgKHZhciBrZXkgaW4gY29tcHV0ZWQpIHtcbiAgICAgICAgICB2YXIgdXNlckRlZiA9IGNvbXB1dGVkW2tleV07XG4gICAgICAgICAgdmFyIGRlZiA9IHtcbiAgICAgICAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICAgICAgICBjb25maWd1cmFibGU6IHRydWVcbiAgICAgICAgICB9O1xuICAgICAgICAgIGlmICh0eXBlb2YgdXNlckRlZiA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgZGVmLmdldCA9IG1ha2VDb21wdXRlZEdldHRlcih1c2VyRGVmLCB0aGlzKTtcbiAgICAgICAgICAgIGRlZi5zZXQgPSBub29wO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBkZWYuZ2V0ID0gdXNlckRlZi5nZXQgPyB1c2VyRGVmLmNhY2hlICE9PSBmYWxzZSA/IG1ha2VDb21wdXRlZEdldHRlcih1c2VyRGVmLmdldCwgdGhpcykgOiBiaW5kKHVzZXJEZWYuZ2V0LCB0aGlzKSA6IG5vb3A7XG4gICAgICAgICAgICBkZWYuc2V0ID0gdXNlckRlZi5zZXQgPyBiaW5kKHVzZXJEZWYuc2V0LCB0aGlzKSA6IG5vb3A7XG4gICAgICAgICAgfVxuICAgICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0aGlzLCBrZXksIGRlZik7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9O1xuXG4gICAgZnVuY3Rpb24gbWFrZUNvbXB1dGVkR2V0dGVyKGdldHRlciwgb3duZXIpIHtcbiAgICAgIHZhciB3YXRjaGVyID0gbmV3IFdhdGNoZXIob3duZXIsIGdldHRlciwgbnVsbCwge1xuICAgICAgICBsYXp5OiB0cnVlXG4gICAgICB9KTtcbiAgICAgIHJldHVybiBmdW5jdGlvbiBjb21wdXRlZEdldHRlcigpIHtcbiAgICAgICAgaWYgKHdhdGNoZXIuZGlydHkpIHtcbiAgICAgICAgICB3YXRjaGVyLmV2YWx1YXRlKCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKERlcC50YXJnZXQpIHtcbiAgICAgICAgICB3YXRjaGVyLmRlcGVuZCgpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB3YXRjaGVyLnZhbHVlO1xuICAgICAgfTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBTZXR1cCBpbnN0YW5jZSBtZXRob2RzLiBNZXRob2RzIG11c3QgYmUgYm91bmQgdG8gdGhlXG4gICAgICogaW5zdGFuY2Ugc2luY2UgdGhleSBtaWdodCBiZSBwYXNzZWQgZG93biBhcyBhIHByb3AgdG9cbiAgICAgKiBjaGlsZCBjb21wb25lbnRzLlxuICAgICAqL1xuXG4gICAgVnVlLnByb3RvdHlwZS5faW5pdE1ldGhvZHMgPSBmdW5jdGlvbiAoKSB7XG4gICAgICB2YXIgbWV0aG9kcyA9IHRoaXMuJG9wdGlvbnMubWV0aG9kcztcbiAgICAgIGlmIChtZXRob2RzKSB7XG4gICAgICAgIGZvciAodmFyIGtleSBpbiBtZXRob2RzKSB7XG4gICAgICAgICAgdGhpc1trZXldID0gYmluZChtZXRob2RzW2tleV0sIHRoaXMpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIEluaXRpYWxpemUgbWV0YSBpbmZvcm1hdGlvbiBsaWtlICRpbmRleCwgJGtleSAmICR2YWx1ZS5cbiAgICAgKi9cblxuICAgIFZ1ZS5wcm90b3R5cGUuX2luaXRNZXRhID0gZnVuY3Rpb24gKCkge1xuICAgICAgdmFyIG1ldGFzID0gdGhpcy4kb3B0aW9ucy5fbWV0YTtcbiAgICAgIGlmIChtZXRhcykge1xuICAgICAgICBmb3IgKHZhciBrZXkgaW4gbWV0YXMpIHtcbiAgICAgICAgICBkZWZpbmVSZWFjdGl2ZSh0aGlzLCBrZXksIG1ldGFzW2tleV0pO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfTtcbiAgfVxuXG4gIHZhciBldmVudFJFID0gL152LW9uOnxeQC87XG5cbiAgZnVuY3Rpb24gZXZlbnRzTWl4aW4gKFZ1ZSkge1xuICAgIC8qKlxuICAgICAqIFNldHVwIHRoZSBpbnN0YW5jZSdzIG9wdGlvbiBldmVudHMgJiB3YXRjaGVycy5cbiAgICAgKiBJZiB0aGUgdmFsdWUgaXMgYSBzdHJpbmcsIHdlIHB1bGwgaXQgZnJvbSB0aGVcbiAgICAgKiBpbnN0YW5jZSdzIG1ldGhvZHMgYnkgbmFtZS5cbiAgICAgKi9cblxuICAgIFZ1ZS5wcm90b3R5cGUuX2luaXRFdmVudHMgPSBmdW5jdGlvbiAoKSB7XG4gICAgICB2YXIgb3B0aW9ucyA9IHRoaXMuJG9wdGlvbnM7XG4gICAgICBpZiAob3B0aW9ucy5fYXNDb21wb25lbnQpIHtcbiAgICAgICAgcmVnaXN0ZXJDb21wb25lbnRFdmVudHModGhpcywgb3B0aW9ucy5lbCk7XG4gICAgICB9XG4gICAgICByZWdpc3RlckNhbGxiYWNrcyh0aGlzLCAnJG9uJywgb3B0aW9ucy5ldmVudHMpO1xuICAgICAgcmVnaXN0ZXJDYWxsYmFja3ModGhpcywgJyR3YXRjaCcsIG9wdGlvbnMud2F0Y2gpO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBSZWdpc3RlciB2LW9uIGV2ZW50cyBvbiBhIGNoaWxkIGNvbXBvbmVudFxuICAgICAqXG4gICAgICogQHBhcmFtIHtWdWV9IHZtXG4gICAgICogQHBhcmFtIHtFbGVtZW50fSBlbFxuICAgICAqL1xuXG4gICAgZnVuY3Rpb24gcmVnaXN0ZXJDb21wb25lbnRFdmVudHModm0sIGVsKSB7XG4gICAgICB2YXIgYXR0cnMgPSBlbC5hdHRyaWJ1dGVzO1xuICAgICAgdmFyIG5hbWUsIHZhbHVlLCBoYW5kbGVyO1xuICAgICAgZm9yICh2YXIgaSA9IDAsIGwgPSBhdHRycy5sZW5ndGg7IGkgPCBsOyBpKyspIHtcbiAgICAgICAgbmFtZSA9IGF0dHJzW2ldLm5hbWU7XG4gICAgICAgIGlmIChldmVudFJFLnRlc3QobmFtZSkpIHtcbiAgICAgICAgICBuYW1lID0gbmFtZS5yZXBsYWNlKGV2ZW50UkUsICcnKTtcbiAgICAgICAgICAvLyBmb3JjZSB0aGUgZXhwcmVzc2lvbiBpbnRvIGEgc3RhdGVtZW50IHNvIHRoYXRcbiAgICAgICAgICAvLyBpdCBhbHdheXMgZHluYW1pY2FsbHkgcmVzb2x2ZXMgdGhlIG1ldGhvZCB0byBjYWxsICgjMjY3MClcbiAgICAgICAgICAvLyBraW5kYSB1Z2x5IGhhY2ssIGJ1dCBkb2VzIHRoZSBqb2IuXG4gICAgICAgICAgdmFsdWUgPSBhdHRyc1tpXS52YWx1ZTtcbiAgICAgICAgICBpZiAoaXNTaW1wbGVQYXRoKHZhbHVlKSkge1xuICAgICAgICAgICAgdmFsdWUgKz0gJy5hcHBseSh0aGlzLCAkYXJndW1lbnRzKSc7XG4gICAgICAgICAgfVxuICAgICAgICAgIGhhbmRsZXIgPSAodm0uX3Njb3BlIHx8IHZtLl9jb250ZXh0KS4kZXZhbCh2YWx1ZSwgdHJ1ZSk7XG4gICAgICAgICAgaGFuZGxlci5fZnJvbVBhcmVudCA9IHRydWU7XG4gICAgICAgICAgdm0uJG9uKG5hbWUucmVwbGFjZShldmVudFJFKSwgaGFuZGxlcik7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZWdpc3RlciBjYWxsYmFja3MgZm9yIG9wdGlvbiBldmVudHMgYW5kIHdhdGNoZXJzLlxuICAgICAqXG4gICAgICogQHBhcmFtIHtWdWV9IHZtXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IGFjdGlvblxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBoYXNoXG4gICAgICovXG5cbiAgICBmdW5jdGlvbiByZWdpc3RlckNhbGxiYWNrcyh2bSwgYWN0aW9uLCBoYXNoKSB7XG4gICAgICBpZiAoIWhhc2gpIHJldHVybjtcbiAgICAgIHZhciBoYW5kbGVycywga2V5LCBpLCBqO1xuICAgICAgZm9yIChrZXkgaW4gaGFzaCkge1xuICAgICAgICBoYW5kbGVycyA9IGhhc2hba2V5XTtcbiAgICAgICAgaWYgKGlzQXJyYXkoaGFuZGxlcnMpKSB7XG4gICAgICAgICAgZm9yIChpID0gMCwgaiA9IGhhbmRsZXJzLmxlbmd0aDsgaSA8IGo7IGkrKykge1xuICAgICAgICAgICAgcmVnaXN0ZXIodm0sIGFjdGlvbiwga2V5LCBoYW5kbGVyc1tpXSk7XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJlZ2lzdGVyKHZtLCBhY3Rpb24sIGtleSwgaGFuZGxlcnMpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogSGVscGVyIHRvIHJlZ2lzdGVyIGFuIGV2ZW50L3dhdGNoIGNhbGxiYWNrLlxuICAgICAqXG4gICAgICogQHBhcmFtIHtWdWV9IHZtXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IGFjdGlvblxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBrZXlcbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufFN0cmluZ3xPYmplY3R9IGhhbmRsZXJcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gW29wdGlvbnNdXG4gICAgICovXG5cbiAgICBmdW5jdGlvbiByZWdpc3Rlcih2bSwgYWN0aW9uLCBrZXksIGhhbmRsZXIsIG9wdGlvbnMpIHtcbiAgICAgIHZhciB0eXBlID0gdHlwZW9mIGhhbmRsZXI7XG4gICAgICBpZiAodHlwZSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICB2bVthY3Rpb25dKGtleSwgaGFuZGxlciwgb3B0aW9ucyk7XG4gICAgICB9IGVsc2UgaWYgKHR5cGUgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgIHZhciBtZXRob2RzID0gdm0uJG9wdGlvbnMubWV0aG9kcztcbiAgICAgICAgdmFyIG1ldGhvZCA9IG1ldGhvZHMgJiYgbWV0aG9kc1toYW5kbGVyXTtcbiAgICAgICAgaWYgKG1ldGhvZCkge1xuICAgICAgICAgIHZtW2FjdGlvbl0oa2V5LCBtZXRob2QsIG9wdGlvbnMpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICdkZXZlbG9wbWVudCcgIT09ICdwcm9kdWN0aW9uJyAmJiB3YXJuKCdVbmtub3duIG1ldGhvZDogXCInICsgaGFuZGxlciArICdcIiB3aGVuICcgKyAncmVnaXN0ZXJpbmcgY2FsbGJhY2sgZm9yICcgKyBhY3Rpb24gKyAnOiBcIicgKyBrZXkgKyAnXCIuJywgdm0pO1xuICAgICAgICB9XG4gICAgICB9IGVsc2UgaWYgKGhhbmRsZXIgJiYgdHlwZSA9PT0gJ29iamVjdCcpIHtcbiAgICAgICAgcmVnaXN0ZXIodm0sIGFjdGlvbiwga2V5LCBoYW5kbGVyLmhhbmRsZXIsIGhhbmRsZXIpO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFNldHVwIHJlY3Vyc2l2ZSBhdHRhY2hlZC9kZXRhY2hlZCBjYWxsc1xuICAgICAqL1xuXG4gICAgVnVlLnByb3RvdHlwZS5faW5pdERPTUhvb2tzID0gZnVuY3Rpb24gKCkge1xuICAgICAgdGhpcy4kb24oJ2hvb2s6YXR0YWNoZWQnLCBvbkF0dGFjaGVkKTtcbiAgICAgIHRoaXMuJG9uKCdob29rOmRldGFjaGVkJywgb25EZXRhY2hlZCk7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIENhbGxiYWNrIHRvIHJlY3Vyc2l2ZWx5IGNhbGwgYXR0YWNoZWQgaG9vayBvbiBjaGlsZHJlblxuICAgICAqL1xuXG4gICAgZnVuY3Rpb24gb25BdHRhY2hlZCgpIHtcbiAgICAgIGlmICghdGhpcy5faXNBdHRhY2hlZCkge1xuICAgICAgICB0aGlzLl9pc0F0dGFjaGVkID0gdHJ1ZTtcbiAgICAgICAgdGhpcy4kY2hpbGRyZW4uZm9yRWFjaChjYWxsQXR0YWNoKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBJdGVyYXRvciB0byBjYWxsIGF0dGFjaGVkIGhvb2tcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7VnVlfSBjaGlsZFxuICAgICAqL1xuXG4gICAgZnVuY3Rpb24gY2FsbEF0dGFjaChjaGlsZCkge1xuICAgICAgaWYgKCFjaGlsZC5faXNBdHRhY2hlZCAmJiBpbkRvYyhjaGlsZC4kZWwpKSB7XG4gICAgICAgIGNoaWxkLl9jYWxsSG9vaygnYXR0YWNoZWQnKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDYWxsYmFjayB0byByZWN1cnNpdmVseSBjYWxsIGRldGFjaGVkIGhvb2sgb24gY2hpbGRyZW5cbiAgICAgKi9cblxuICAgIGZ1bmN0aW9uIG9uRGV0YWNoZWQoKSB7XG4gICAgICBpZiAodGhpcy5faXNBdHRhY2hlZCkge1xuICAgICAgICB0aGlzLl9pc0F0dGFjaGVkID0gZmFsc2U7XG4gICAgICAgIHRoaXMuJGNoaWxkcmVuLmZvckVhY2goY2FsbERldGFjaCk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogSXRlcmF0b3IgdG8gY2FsbCBkZXRhY2hlZCBob29rXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge1Z1ZX0gY2hpbGRcbiAgICAgKi9cblxuICAgIGZ1bmN0aW9uIGNhbGxEZXRhY2goY2hpbGQpIHtcbiAgICAgIGlmIChjaGlsZC5faXNBdHRhY2hlZCAmJiAhaW5Eb2MoY2hpbGQuJGVsKSkge1xuICAgICAgICBjaGlsZC5fY2FsbEhvb2soJ2RldGFjaGVkJyk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogVHJpZ2dlciBhbGwgaGFuZGxlcnMgZm9yIGEgaG9va1xuICAgICAqXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IGhvb2tcbiAgICAgKi9cblxuICAgIFZ1ZS5wcm90b3R5cGUuX2NhbGxIb29rID0gZnVuY3Rpb24gKGhvb2spIHtcbiAgICAgIHRoaXMuJGVtaXQoJ3ByZS1ob29rOicgKyBob29rKTtcbiAgICAgIHZhciBoYW5kbGVycyA9IHRoaXMuJG9wdGlvbnNbaG9va107XG4gICAgICBpZiAoaGFuZGxlcnMpIHtcbiAgICAgICAgZm9yICh2YXIgaSA9IDAsIGogPSBoYW5kbGVycy5sZW5ndGg7IGkgPCBqOyBpKyspIHtcbiAgICAgICAgICBoYW5kbGVyc1tpXS5jYWxsKHRoaXMpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICB0aGlzLiRlbWl0KCdob29rOicgKyBob29rKTtcbiAgICB9O1xuICB9XG5cbiAgZnVuY3Rpb24gbm9vcCgpIHt9XG5cbiAgLyoqXG4gICAqIEEgZGlyZWN0aXZlIGxpbmtzIGEgRE9NIGVsZW1lbnQgd2l0aCBhIHBpZWNlIG9mIGRhdGEsXG4gICAqIHdoaWNoIGlzIHRoZSByZXN1bHQgb2YgZXZhbHVhdGluZyBhbiBleHByZXNzaW9uLlxuICAgKiBJdCByZWdpc3RlcnMgYSB3YXRjaGVyIHdpdGggdGhlIGV4cHJlc3Npb24gYW5kIGNhbGxzXG4gICAqIHRoZSBET00gdXBkYXRlIGZ1bmN0aW9uIHdoZW4gYSBjaGFuZ2UgaXMgdHJpZ2dlcmVkLlxuICAgKlxuICAgKiBAcGFyYW0ge09iamVjdH0gZGVzY3JpcHRvclxuICAgKiAgICAgICAgICAgICAgICAgLSB7U3RyaW5nfSBuYW1lXG4gICAqICAgICAgICAgICAgICAgICAtIHtPYmplY3R9IGRlZlxuICAgKiAgICAgICAgICAgICAgICAgLSB7U3RyaW5nfSBleHByZXNzaW9uXG4gICAqICAgICAgICAgICAgICAgICAtIHtBcnJheTxPYmplY3Q+fSBbZmlsdGVyc11cbiAgICogICAgICAgICAgICAgICAgIC0ge09iamVjdH0gW21vZGlmaWVyc11cbiAgICogICAgICAgICAgICAgICAgIC0ge0Jvb2xlYW59IGxpdGVyYWxcbiAgICogICAgICAgICAgICAgICAgIC0ge1N0cmluZ30gYXR0clxuICAgKiAgICAgICAgICAgICAgICAgLSB7U3RyaW5nfSBhcmdcbiAgICogICAgICAgICAgICAgICAgIC0ge1N0cmluZ30gcmF3XG4gICAqICAgICAgICAgICAgICAgICAtIHtTdHJpbmd9IFtyZWZdXG4gICAqICAgICAgICAgICAgICAgICAtIHtBcnJheTxPYmplY3Q+fSBbaW50ZXJwXVxuICAgKiAgICAgICAgICAgICAgICAgLSB7Qm9vbGVhbn0gW2hhc09uZVRpbWVdXG4gICAqIEBwYXJhbSB7VnVlfSB2bVxuICAgKiBAcGFyYW0ge05vZGV9IGVsXG4gICAqIEBwYXJhbSB7VnVlfSBbaG9zdF0gLSB0cmFuc2NsdXNpb24gaG9zdCBjb21wb25lbnRcbiAgICogQHBhcmFtIHtPYmplY3R9IFtzY29wZV0gLSB2LWZvciBzY29wZVxuICAgKiBAcGFyYW0ge0ZyYWdtZW50fSBbZnJhZ10gLSBvd25lciBmcmFnbWVudFxuICAgKiBAY29uc3RydWN0b3JcbiAgICovXG4gIGZ1bmN0aW9uIERpcmVjdGl2ZShkZXNjcmlwdG9yLCB2bSwgZWwsIGhvc3QsIHNjb3BlLCBmcmFnKSB7XG4gICAgdGhpcy52bSA9IHZtO1xuICAgIHRoaXMuZWwgPSBlbDtcbiAgICAvLyBjb3B5IGRlc2NyaXB0b3IgcHJvcGVydGllc1xuICAgIHRoaXMuZGVzY3JpcHRvciA9IGRlc2NyaXB0b3I7XG4gICAgdGhpcy5uYW1lID0gZGVzY3JpcHRvci5uYW1lO1xuICAgIHRoaXMuZXhwcmVzc2lvbiA9IGRlc2NyaXB0b3IuZXhwcmVzc2lvbjtcbiAgICB0aGlzLmFyZyA9IGRlc2NyaXB0b3IuYXJnO1xuICAgIHRoaXMubW9kaWZpZXJzID0gZGVzY3JpcHRvci5tb2RpZmllcnM7XG4gICAgdGhpcy5maWx0ZXJzID0gZGVzY3JpcHRvci5maWx0ZXJzO1xuICAgIHRoaXMubGl0ZXJhbCA9IHRoaXMubW9kaWZpZXJzICYmIHRoaXMubW9kaWZpZXJzLmxpdGVyYWw7XG4gICAgLy8gcHJpdmF0ZVxuICAgIHRoaXMuX2xvY2tlZCA9IGZhbHNlO1xuICAgIHRoaXMuX2JvdW5kID0gZmFsc2U7XG4gICAgdGhpcy5fbGlzdGVuZXJzID0gbnVsbDtcbiAgICAvLyBsaW5rIGNvbnRleHRcbiAgICB0aGlzLl9ob3N0ID0gaG9zdDtcbiAgICB0aGlzLl9zY29wZSA9IHNjb3BlO1xuICAgIHRoaXMuX2ZyYWcgPSBmcmFnO1xuICAgIC8vIHN0b3JlIGRpcmVjdGl2ZXMgb24gbm9kZSBpbiBkZXYgbW9kZVxuICAgIGlmICgnZGV2ZWxvcG1lbnQnICE9PSAncHJvZHVjdGlvbicgJiYgdGhpcy5lbCkge1xuICAgICAgdGhpcy5lbC5fdnVlX2RpcmVjdGl2ZXMgPSB0aGlzLmVsLl92dWVfZGlyZWN0aXZlcyB8fCBbXTtcbiAgICAgIHRoaXMuZWwuX3Z1ZV9kaXJlY3RpdmVzLnB1c2godGhpcyk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEluaXRpYWxpemUgdGhlIGRpcmVjdGl2ZSwgbWl4aW4gZGVmaW5pdGlvbiBwcm9wZXJ0aWVzLFxuICAgKiBzZXR1cCB0aGUgd2F0Y2hlciwgY2FsbCBkZWZpbml0aW9uIGJpbmQoKSBhbmQgdXBkYXRlKClcbiAgICogaWYgcHJlc2VudC5cbiAgICovXG5cbiAgRGlyZWN0aXZlLnByb3RvdHlwZS5fYmluZCA9IGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgbmFtZSA9IHRoaXMubmFtZTtcbiAgICB2YXIgZGVzY3JpcHRvciA9IHRoaXMuZGVzY3JpcHRvcjtcblxuICAgIC8vIHJlbW92ZSBhdHRyaWJ1dGVcbiAgICBpZiAoKG5hbWUgIT09ICdjbG9haycgfHwgdGhpcy52bS5faXNDb21waWxlZCkgJiYgdGhpcy5lbCAmJiB0aGlzLmVsLnJlbW92ZUF0dHJpYnV0ZSkge1xuICAgICAgdmFyIGF0dHIgPSBkZXNjcmlwdG9yLmF0dHIgfHwgJ3YtJyArIG5hbWU7XG4gICAgICB0aGlzLmVsLnJlbW92ZUF0dHJpYnV0ZShhdHRyKTtcbiAgICB9XG5cbiAgICAvLyBjb3B5IGRlZiBwcm9wZXJ0aWVzXG4gICAgdmFyIGRlZiA9IGRlc2NyaXB0b3IuZGVmO1xuICAgIGlmICh0eXBlb2YgZGVmID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICB0aGlzLnVwZGF0ZSA9IGRlZjtcbiAgICB9IGVsc2Uge1xuICAgICAgZXh0ZW5kKHRoaXMsIGRlZik7XG4gICAgfVxuXG4gICAgLy8gc2V0dXAgZGlyZWN0aXZlIHBhcmFtc1xuICAgIHRoaXMuX3NldHVwUGFyYW1zKCk7XG5cbiAgICAvLyBpbml0aWFsIGJpbmRcbiAgICBpZiAodGhpcy5iaW5kKSB7XG4gICAgICB0aGlzLmJpbmQoKTtcbiAgICB9XG4gICAgdGhpcy5fYm91bmQgPSB0cnVlO1xuXG4gICAgaWYgKHRoaXMubGl0ZXJhbCkge1xuICAgICAgdGhpcy51cGRhdGUgJiYgdGhpcy51cGRhdGUoZGVzY3JpcHRvci5yYXcpO1xuICAgIH0gZWxzZSBpZiAoKHRoaXMuZXhwcmVzc2lvbiB8fCB0aGlzLm1vZGlmaWVycykgJiYgKHRoaXMudXBkYXRlIHx8IHRoaXMudHdvV2F5KSAmJiAhdGhpcy5fY2hlY2tTdGF0ZW1lbnQoKSkge1xuICAgICAgLy8gd3JhcHBlZCB1cGRhdGVyIGZvciBjb250ZXh0XG4gICAgICB2YXIgZGlyID0gdGhpcztcbiAgICAgIGlmICh0aGlzLnVwZGF0ZSkge1xuICAgICAgICB0aGlzLl91cGRhdGUgPSBmdW5jdGlvbiAodmFsLCBvbGRWYWwpIHtcbiAgICAgICAgICBpZiAoIWRpci5fbG9ja2VkKSB7XG4gICAgICAgICAgICBkaXIudXBkYXRlKHZhbCwgb2xkVmFsKTtcbiAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLl91cGRhdGUgPSBub29wO1xuICAgICAgfVxuICAgICAgdmFyIHByZVByb2Nlc3MgPSB0aGlzLl9wcmVQcm9jZXNzID8gYmluZCh0aGlzLl9wcmVQcm9jZXNzLCB0aGlzKSA6IG51bGw7XG4gICAgICB2YXIgcG9zdFByb2Nlc3MgPSB0aGlzLl9wb3N0UHJvY2VzcyA/IGJpbmQodGhpcy5fcG9zdFByb2Nlc3MsIHRoaXMpIDogbnVsbDtcbiAgICAgIHZhciB3YXRjaGVyID0gdGhpcy5fd2F0Y2hlciA9IG5ldyBXYXRjaGVyKHRoaXMudm0sIHRoaXMuZXhwcmVzc2lvbiwgdGhpcy5fdXBkYXRlLCAvLyBjYWxsYmFja1xuICAgICAge1xuICAgICAgICBmaWx0ZXJzOiB0aGlzLmZpbHRlcnMsXG4gICAgICAgIHR3b1dheTogdGhpcy50d29XYXksXG4gICAgICAgIGRlZXA6IHRoaXMuZGVlcCxcbiAgICAgICAgcHJlUHJvY2VzczogcHJlUHJvY2VzcyxcbiAgICAgICAgcG9zdFByb2Nlc3M6IHBvc3RQcm9jZXNzLFxuICAgICAgICBzY29wZTogdGhpcy5fc2NvcGVcbiAgICAgIH0pO1xuICAgICAgLy8gdi1tb2RlbCB3aXRoIGluaXRhbCBpbmxpbmUgdmFsdWUgbmVlZCB0byBzeW5jIGJhY2sgdG9cbiAgICAgIC8vIG1vZGVsIGluc3RlYWQgb2YgdXBkYXRlIHRvIERPTSBvbiBpbml0LiBUaGV5IHdvdWxkXG4gICAgICAvLyBzZXQgdGhlIGFmdGVyQmluZCBob29rIHRvIGluZGljYXRlIHRoYXQuXG4gICAgICBpZiAodGhpcy5hZnRlckJpbmQpIHtcbiAgICAgICAgdGhpcy5hZnRlckJpbmQoKTtcbiAgICAgIH0gZWxzZSBpZiAodGhpcy51cGRhdGUpIHtcbiAgICAgICAgdGhpcy51cGRhdGUod2F0Y2hlci52YWx1ZSk7XG4gICAgICB9XG4gICAgfVxuICB9O1xuXG4gIC8qKlxuICAgKiBTZXR1cCBhbGwgcGFyYW0gYXR0cmlidXRlcywgZS5nLiB0cmFjay1ieSxcbiAgICogdHJhbnNpdGlvbi1tb2RlLCBldGMuLi5cbiAgICovXG5cbiAgRGlyZWN0aXZlLnByb3RvdHlwZS5fc2V0dXBQYXJhbXMgPSBmdW5jdGlvbiAoKSB7XG4gICAgaWYgKCF0aGlzLnBhcmFtcykge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB2YXIgcGFyYW1zID0gdGhpcy5wYXJhbXM7XG4gICAgLy8gc3dhcCB0aGUgcGFyYW1zIGFycmF5IHdpdGggYSBmcmVzaCBvYmplY3QuXG4gICAgdGhpcy5wYXJhbXMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuICAgIHZhciBpID0gcGFyYW1zLmxlbmd0aDtcbiAgICB2YXIga2V5LCB2YWwsIG1hcHBlZEtleTtcbiAgICB3aGlsZSAoaS0tKSB7XG4gICAgICBrZXkgPSBoeXBoZW5hdGUocGFyYW1zW2ldKTtcbiAgICAgIG1hcHBlZEtleSA9IGNhbWVsaXplKGtleSk7XG4gICAgICB2YWwgPSBnZXRCaW5kQXR0cih0aGlzLmVsLCBrZXkpO1xuICAgICAgaWYgKHZhbCAhPSBudWxsKSB7XG4gICAgICAgIC8vIGR5bmFtaWNcbiAgICAgICAgdGhpcy5fc2V0dXBQYXJhbVdhdGNoZXIobWFwcGVkS2V5LCB2YWwpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgLy8gc3RhdGljXG4gICAgICAgIHZhbCA9IGdldEF0dHIodGhpcy5lbCwga2V5KTtcbiAgICAgICAgaWYgKHZhbCAhPSBudWxsKSB7XG4gICAgICAgICAgdGhpcy5wYXJhbXNbbWFwcGVkS2V5XSA9IHZhbCA9PT0gJycgPyB0cnVlIDogdmFsO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9O1xuXG4gIC8qKlxuICAgKiBTZXR1cCBhIHdhdGNoZXIgZm9yIGEgZHluYW1pYyBwYXJhbS5cbiAgICpcbiAgICogQHBhcmFtIHtTdHJpbmd9IGtleVxuICAgKiBAcGFyYW0ge1N0cmluZ30gZXhwcmVzc2lvblxuICAgKi9cblxuICBEaXJlY3RpdmUucHJvdG90eXBlLl9zZXR1cFBhcmFtV2F0Y2hlciA9IGZ1bmN0aW9uIChrZXksIGV4cHJlc3Npb24pIHtcbiAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgdmFyIGNhbGxlZCA9IGZhbHNlO1xuICAgIHZhciB1bndhdGNoID0gKHRoaXMuX3Njb3BlIHx8IHRoaXMudm0pLiR3YXRjaChleHByZXNzaW9uLCBmdW5jdGlvbiAodmFsLCBvbGRWYWwpIHtcbiAgICAgIHNlbGYucGFyYW1zW2tleV0gPSB2YWw7XG4gICAgICAvLyBzaW5jZSB3ZSBhcmUgaW4gaW1tZWRpYXRlIG1vZGUsXG4gICAgICAvLyBvbmx5IGNhbGwgdGhlIHBhcmFtIGNoYW5nZSBjYWxsYmFja3MgaWYgdGhpcyBpcyBub3QgdGhlIGZpcnN0IHVwZGF0ZS5cbiAgICAgIGlmIChjYWxsZWQpIHtcbiAgICAgICAgdmFyIGNiID0gc2VsZi5wYXJhbVdhdGNoZXJzICYmIHNlbGYucGFyYW1XYXRjaGVyc1trZXldO1xuICAgICAgICBpZiAoY2IpIHtcbiAgICAgICAgICBjYi5jYWxsKHNlbGYsIHZhbCwgb2xkVmFsKTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY2FsbGVkID0gdHJ1ZTtcbiAgICAgIH1cbiAgICB9LCB7XG4gICAgICBpbW1lZGlhdGU6IHRydWUsXG4gICAgICB1c2VyOiBmYWxzZVxuICAgIH0pOyh0aGlzLl9wYXJhbVVud2F0Y2hGbnMgfHwgKHRoaXMuX3BhcmFtVW53YXRjaEZucyA9IFtdKSkucHVzaCh1bndhdGNoKTtcbiAgfTtcblxuICAvKipcbiAgICogQ2hlY2sgaWYgdGhlIGRpcmVjdGl2ZSBpcyBhIGZ1bmN0aW9uIGNhbGxlclxuICAgKiBhbmQgaWYgdGhlIGV4cHJlc3Npb24gaXMgYSBjYWxsYWJsZSBvbmUuIElmIGJvdGggdHJ1ZSxcbiAgICogd2Ugd3JhcCB1cCB0aGUgZXhwcmVzc2lvbiBhbmQgdXNlIGl0IGFzIHRoZSBldmVudFxuICAgKiBoYW5kbGVyLlxuICAgKlxuICAgKiBlLmcuIG9uLWNsaWNrPVwiYSsrXCJcbiAgICpcbiAgICogQHJldHVybiB7Qm9vbGVhbn1cbiAgICovXG5cbiAgRGlyZWN0aXZlLnByb3RvdHlwZS5fY2hlY2tTdGF0ZW1lbnQgPSBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIGV4cHJlc3Npb24gPSB0aGlzLmV4cHJlc3Npb247XG4gICAgaWYgKGV4cHJlc3Npb24gJiYgdGhpcy5hY2NlcHRTdGF0ZW1lbnQgJiYgIWlzU2ltcGxlUGF0aChleHByZXNzaW9uKSkge1xuICAgICAgdmFyIGZuID0gcGFyc2VFeHByZXNzaW9uKGV4cHJlc3Npb24pLmdldDtcbiAgICAgIHZhciBzY29wZSA9IHRoaXMuX3Njb3BlIHx8IHRoaXMudm07XG4gICAgICB2YXIgaGFuZGxlciA9IGZ1bmN0aW9uIGhhbmRsZXIoZSkge1xuICAgICAgICBzY29wZS4kZXZlbnQgPSBlO1xuICAgICAgICBmbi5jYWxsKHNjb3BlLCBzY29wZSk7XG4gICAgICAgIHNjb3BlLiRldmVudCA9IG51bGw7XG4gICAgICB9O1xuICAgICAgaWYgKHRoaXMuZmlsdGVycykge1xuICAgICAgICBoYW5kbGVyID0gc2NvcGUuX2FwcGx5RmlsdGVycyhoYW5kbGVyLCBudWxsLCB0aGlzLmZpbHRlcnMpO1xuICAgICAgfVxuICAgICAgdGhpcy51cGRhdGUoaGFuZGxlcik7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gIH07XG5cbiAgLyoqXG4gICAqIFNldCB0aGUgY29ycmVzcG9uZGluZyB2YWx1ZSB3aXRoIHRoZSBzZXR0ZXIuXG4gICAqIFRoaXMgc2hvdWxkIG9ubHkgYmUgdXNlZCBpbiB0d28td2F5IGRpcmVjdGl2ZXNcbiAgICogZS5nLiB2LW1vZGVsLlxuICAgKlxuICAgKiBAcGFyYW0geyp9IHZhbHVlXG4gICAqIEBwdWJsaWNcbiAgICovXG5cbiAgRGlyZWN0aXZlLnByb3RvdHlwZS5zZXQgPSBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgZWxzZSAqL1xuICAgIGlmICh0aGlzLnR3b1dheSkge1xuICAgICAgdGhpcy5fd2l0aExvY2soZnVuY3Rpb24gKCkge1xuICAgICAgICB0aGlzLl93YXRjaGVyLnNldCh2YWx1ZSk7XG4gICAgICB9KTtcbiAgICB9IGVsc2UgaWYgKCdkZXZlbG9wbWVudCcgIT09ICdwcm9kdWN0aW9uJykge1xuICAgICAgd2FybignRGlyZWN0aXZlLnNldCgpIGNhbiBvbmx5IGJlIHVzZWQgaW5zaWRlIHR3b1dheScgKyAnZGlyZWN0aXZlcy4nKTtcbiAgICB9XG4gIH07XG5cbiAgLyoqXG4gICAqIEV4ZWN1dGUgYSBmdW5jdGlvbiB3aGlsZSBwcmV2ZW50aW5nIHRoYXQgZnVuY3Rpb24gZnJvbVxuICAgKiB0cmlnZ2VyaW5nIHVwZGF0ZXMgb24gdGhpcyBkaXJlY3RpdmUgaW5zdGFuY2UuXG4gICAqXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IGZuXG4gICAqL1xuXG4gIERpcmVjdGl2ZS5wcm90b3R5cGUuX3dpdGhMb2NrID0gZnVuY3Rpb24gKGZuKSB7XG4gICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgIHNlbGYuX2xvY2tlZCA9IHRydWU7XG4gICAgZm4uY2FsbChzZWxmKTtcbiAgICBuZXh0VGljayhmdW5jdGlvbiAoKSB7XG4gICAgICBzZWxmLl9sb2NrZWQgPSBmYWxzZTtcbiAgICB9KTtcbiAgfTtcblxuICAvKipcbiAgICogQ29udmVuaWVuY2UgbWV0aG9kIHRoYXQgYXR0YWNoZXMgYSBET00gZXZlbnQgbGlzdGVuZXJcbiAgICogdG8gdGhlIGRpcmVjdGl2ZSBlbGVtZW50IGFuZCBhdXRvbWV0aWNhbGx5IHRlYXJzIGl0IGRvd25cbiAgICogZHVyaW5nIHVuYmluZC5cbiAgICpcbiAgICogQHBhcmFtIHtTdHJpbmd9IGV2ZW50XG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IGhhbmRsZXJcbiAgICogQHBhcmFtIHtCb29sZWFufSBbdXNlQ2FwdHVyZV1cbiAgICovXG5cbiAgRGlyZWN0aXZlLnByb3RvdHlwZS5vbiA9IGZ1bmN0aW9uIChldmVudCwgaGFuZGxlciwgdXNlQ2FwdHVyZSkge1xuICAgIG9uKHRoaXMuZWwsIGV2ZW50LCBoYW5kbGVyLCB1c2VDYXB0dXJlKTsodGhpcy5fbGlzdGVuZXJzIHx8ICh0aGlzLl9saXN0ZW5lcnMgPSBbXSkpLnB1c2goW2V2ZW50LCBoYW5kbGVyXSk7XG4gIH07XG5cbiAgLyoqXG4gICAqIFRlYXJkb3duIHRoZSB3YXRjaGVyIGFuZCBjYWxsIHVuYmluZC5cbiAgICovXG5cbiAgRGlyZWN0aXZlLnByb3RvdHlwZS5fdGVhcmRvd24gPSBmdW5jdGlvbiAoKSB7XG4gICAgaWYgKHRoaXMuX2JvdW5kKSB7XG4gICAgICB0aGlzLl9ib3VuZCA9IGZhbHNlO1xuICAgICAgaWYgKHRoaXMudW5iaW5kKSB7XG4gICAgICAgIHRoaXMudW5iaW5kKCk7XG4gICAgICB9XG4gICAgICBpZiAodGhpcy5fd2F0Y2hlcikge1xuICAgICAgICB0aGlzLl93YXRjaGVyLnRlYXJkb3duKCk7XG4gICAgICB9XG4gICAgICB2YXIgbGlzdGVuZXJzID0gdGhpcy5fbGlzdGVuZXJzO1xuICAgICAgdmFyIGk7XG4gICAgICBpZiAobGlzdGVuZXJzKSB7XG4gICAgICAgIGkgPSBsaXN0ZW5lcnMubGVuZ3RoO1xuICAgICAgICB3aGlsZSAoaS0tKSB7XG4gICAgICAgICAgb2ZmKHRoaXMuZWwsIGxpc3RlbmVyc1tpXVswXSwgbGlzdGVuZXJzW2ldWzFdKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgdmFyIHVud2F0Y2hGbnMgPSB0aGlzLl9wYXJhbVVud2F0Y2hGbnM7XG4gICAgICBpZiAodW53YXRjaEZucykge1xuICAgICAgICBpID0gdW53YXRjaEZucy5sZW5ndGg7XG4gICAgICAgIHdoaWxlIChpLS0pIHtcbiAgICAgICAgICB1bndhdGNoRm5zW2ldKCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmICgnZGV2ZWxvcG1lbnQnICE9PSAncHJvZHVjdGlvbicgJiYgdGhpcy5lbCkge1xuICAgICAgICB0aGlzLmVsLl92dWVfZGlyZWN0aXZlcy4kcmVtb3ZlKHRoaXMpO1xuICAgICAgfVxuICAgICAgdGhpcy52bSA9IHRoaXMuZWwgPSB0aGlzLl93YXRjaGVyID0gdGhpcy5fbGlzdGVuZXJzID0gbnVsbDtcbiAgICB9XG4gIH07XG5cbiAgZnVuY3Rpb24gbGlmZWN5Y2xlTWl4aW4gKFZ1ZSkge1xuICAgIC8qKlxuICAgICAqIFVwZGF0ZSB2LXJlZiBmb3IgY29tcG9uZW50LlxuICAgICAqXG4gICAgICogQHBhcmFtIHtCb29sZWFufSByZW1vdmVcbiAgICAgKi9cblxuICAgIFZ1ZS5wcm90b3R5cGUuX3VwZGF0ZVJlZiA9IGZ1bmN0aW9uIChyZW1vdmUpIHtcbiAgICAgIHZhciByZWYgPSB0aGlzLiRvcHRpb25zLl9yZWY7XG4gICAgICBpZiAocmVmKSB7XG4gICAgICAgIHZhciByZWZzID0gKHRoaXMuX3Njb3BlIHx8IHRoaXMuX2NvbnRleHQpLiRyZWZzO1xuICAgICAgICBpZiAocmVtb3ZlKSB7XG4gICAgICAgICAgaWYgKHJlZnNbcmVmXSA9PT0gdGhpcykge1xuICAgICAgICAgICAgcmVmc1tyZWZdID0gbnVsbDtcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmVmc1tyZWZdID0gdGhpcztcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBUcmFuc2NsdWRlLCBjb21waWxlIGFuZCBsaW5rIGVsZW1lbnQuXG4gICAgICpcbiAgICAgKiBJZiBhIHByZS1jb21waWxlZCBsaW5rZXIgaXMgYXZhaWxhYmxlLCB0aGF0IG1lYW5zIHRoZVxuICAgICAqIHBhc3NlZCBpbiBlbGVtZW50IHdpbGwgYmUgcHJlLXRyYW5zY2x1ZGVkIGFuZCBjb21waWxlZFxuICAgICAqIGFzIHdlbGwgLSBhbGwgd2UgbmVlZCB0byBkbyBpcyB0byBjYWxsIHRoZSBsaW5rZXIuXG4gICAgICpcbiAgICAgKiBPdGhlcndpc2Ugd2UgbmVlZCB0byBjYWxsIHRyYW5zY2x1ZGUvY29tcGlsZS9saW5rIGhlcmUuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge0VsZW1lbnR9IGVsXG4gICAgICovXG5cbiAgICBWdWUucHJvdG90eXBlLl9jb21waWxlID0gZnVuY3Rpb24gKGVsKSB7XG4gICAgICB2YXIgb3B0aW9ucyA9IHRoaXMuJG9wdGlvbnM7XG5cbiAgICAgIC8vIHRyYW5zY2x1ZGUgYW5kIGluaXQgZWxlbWVudFxuICAgICAgLy8gdHJhbnNjbHVkZSBjYW4gcG90ZW50aWFsbHkgcmVwbGFjZSBvcmlnaW5hbFxuICAgICAgLy8gc28gd2UgbmVlZCB0byBrZWVwIHJlZmVyZW5jZTsgdGhpcyBzdGVwIGFsc28gaW5qZWN0c1xuICAgICAgLy8gdGhlIHRlbXBsYXRlIGFuZCBjYWNoZXMgdGhlIG9yaWdpbmFsIGF0dHJpYnV0ZXNcbiAgICAgIC8vIG9uIHRoZSBjb250YWluZXIgbm9kZSBhbmQgcmVwbGFjZXIgbm9kZS5cbiAgICAgIHZhciBvcmlnaW5hbCA9IGVsO1xuICAgICAgZWwgPSB0cmFuc2NsdWRlKGVsLCBvcHRpb25zKTtcbiAgICAgIHRoaXMuX2luaXRFbGVtZW50KGVsKTtcblxuICAgICAgLy8gaGFuZGxlIHYtcHJlIG9uIHJvb3Qgbm9kZSAoIzIwMjYpXG4gICAgICBpZiAoZWwubm9kZVR5cGUgPT09IDEgJiYgZ2V0QXR0cihlbCwgJ3YtcHJlJykgIT09IG51bGwpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICAvLyByb290IGlzIGFsd2F5cyBjb21waWxlZCBwZXItaW5zdGFuY2UsIGJlY2F1c2VcbiAgICAgIC8vIGNvbnRhaW5lciBhdHRycyBhbmQgcHJvcHMgY2FuIGJlIGRpZmZlcmVudCBldmVyeSB0aW1lLlxuICAgICAgdmFyIGNvbnRleHRPcHRpb25zID0gdGhpcy5fY29udGV4dCAmJiB0aGlzLl9jb250ZXh0LiRvcHRpb25zO1xuICAgICAgdmFyIHJvb3RMaW5rZXIgPSBjb21waWxlUm9vdChlbCwgb3B0aW9ucywgY29udGV4dE9wdGlvbnMpO1xuXG4gICAgICAvLyByZXNvbHZlIHNsb3QgZGlzdHJpYnV0aW9uXG4gICAgICByZXNvbHZlU2xvdHModGhpcywgb3B0aW9ucy5fY29udGVudCk7XG5cbiAgICAgIC8vIGNvbXBpbGUgYW5kIGxpbmsgdGhlIHJlc3RcbiAgICAgIHZhciBjb250ZW50TGlua0ZuO1xuICAgICAgdmFyIGN0b3IgPSB0aGlzLmNvbnN0cnVjdG9yO1xuICAgICAgLy8gY29tcG9uZW50IGNvbXBpbGF0aW9uIGNhbiBiZSBjYWNoZWRcbiAgICAgIC8vIGFzIGxvbmcgYXMgaXQncyBub3QgdXNpbmcgaW5saW5lLXRlbXBsYXRlXG4gICAgICBpZiAob3B0aW9ucy5fbGlua2VyQ2FjaGFibGUpIHtcbiAgICAgICAgY29udGVudExpbmtGbiA9IGN0b3IubGlua2VyO1xuICAgICAgICBpZiAoIWNvbnRlbnRMaW5rRm4pIHtcbiAgICAgICAgICBjb250ZW50TGlua0ZuID0gY3Rvci5saW5rZXIgPSBjb21waWxlKGVsLCBvcHRpb25zKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICAvLyBsaW5rIHBoYXNlXG4gICAgICAvLyBtYWtlIHN1cmUgdG8gbGluayByb290IHdpdGggcHJvcCBzY29wZSFcbiAgICAgIHZhciByb290VW5saW5rRm4gPSByb290TGlua2VyKHRoaXMsIGVsLCB0aGlzLl9zY29wZSk7XG4gICAgICB2YXIgY29udGVudFVubGlua0ZuID0gY29udGVudExpbmtGbiA/IGNvbnRlbnRMaW5rRm4odGhpcywgZWwpIDogY29tcGlsZShlbCwgb3B0aW9ucykodGhpcywgZWwpO1xuXG4gICAgICAvLyByZWdpc3RlciBjb21wb3NpdGUgdW5saW5rIGZ1bmN0aW9uXG4gICAgICAvLyB0byBiZSBjYWxsZWQgZHVyaW5nIGluc3RhbmNlIGRlc3RydWN0aW9uXG4gICAgICB0aGlzLl91bmxpbmtGbiA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcm9vdFVubGlua0ZuKCk7XG4gICAgICAgIC8vIHBhc3NpbmcgZGVzdHJveWluZzogdHJ1ZSB0byBhdm9pZCBzZWFyY2hpbmcgYW5kXG4gICAgICAgIC8vIHNwbGljaW5nIHRoZSBkaXJlY3RpdmVzXG4gICAgICAgIGNvbnRlbnRVbmxpbmtGbih0cnVlKTtcbiAgICAgIH07XG5cbiAgICAgIC8vIGZpbmFsbHkgcmVwbGFjZSBvcmlnaW5hbFxuICAgICAgaWYgKG9wdGlvbnMucmVwbGFjZSkge1xuICAgICAgICByZXBsYWNlKG9yaWdpbmFsLCBlbCk7XG4gICAgICB9XG5cbiAgICAgIHRoaXMuX2lzQ29tcGlsZWQgPSB0cnVlO1xuICAgICAgdGhpcy5fY2FsbEhvb2soJ2NvbXBpbGVkJyk7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIEluaXRpYWxpemUgaW5zdGFuY2UgZWxlbWVudC4gQ2FsbGVkIGluIHRoZSBwdWJsaWNcbiAgICAgKiAkbW91bnQoKSBtZXRob2QuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge0VsZW1lbnR9IGVsXG4gICAgICovXG5cbiAgICBWdWUucHJvdG90eXBlLl9pbml0RWxlbWVudCA9IGZ1bmN0aW9uIChlbCkge1xuICAgICAgaWYgKGlzRnJhZ21lbnQoZWwpKSB7XG4gICAgICAgIHRoaXMuX2lzRnJhZ21lbnQgPSB0cnVlO1xuICAgICAgICB0aGlzLiRlbCA9IHRoaXMuX2ZyYWdtZW50U3RhcnQgPSBlbC5maXJzdENoaWxkO1xuICAgICAgICB0aGlzLl9mcmFnbWVudEVuZCA9IGVsLmxhc3RDaGlsZDtcbiAgICAgICAgLy8gc2V0IHBlcnNpc3RlZCB0ZXh0IGFuY2hvcnMgdG8gZW1wdHlcbiAgICAgICAgaWYgKHRoaXMuX2ZyYWdtZW50U3RhcnQubm9kZVR5cGUgPT09IDMpIHtcbiAgICAgICAgICB0aGlzLl9mcmFnbWVudFN0YXJ0LmRhdGEgPSB0aGlzLl9mcmFnbWVudEVuZC5kYXRhID0gJyc7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fZnJhZ21lbnQgPSBlbDtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuJGVsID0gZWw7XG4gICAgICB9XG4gICAgICB0aGlzLiRlbC5fX3Z1ZV9fID0gdGhpcztcbiAgICAgIHRoaXMuX2NhbGxIb29rKCdiZWZvcmVDb21waWxlJyk7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIENyZWF0ZSBhbmQgYmluZCBhIGRpcmVjdGl2ZSB0byBhbiBlbGVtZW50LlxuICAgICAqXG4gICAgICogQHBhcmFtIHtPYmplY3R9IGRlc2NyaXB0b3IgLSBwYXJzZWQgZGlyZWN0aXZlIGRlc2NyaXB0b3JcbiAgICAgKiBAcGFyYW0ge05vZGV9IG5vZGUgICAtIHRhcmdldCBub2RlXG4gICAgICogQHBhcmFtIHtWdWV9IFtob3N0XSAtIHRyYW5zY2x1c2lvbiBob3N0IGNvbXBvbmVudFxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBbc2NvcGVdIC0gdi1mb3Igc2NvcGVcbiAgICAgKiBAcGFyYW0ge0ZyYWdtZW50fSBbZnJhZ10gLSBvd25lciBmcmFnbWVudFxuICAgICAqL1xuXG4gICAgVnVlLnByb3RvdHlwZS5fYmluZERpciA9IGZ1bmN0aW9uIChkZXNjcmlwdG9yLCBub2RlLCBob3N0LCBzY29wZSwgZnJhZykge1xuICAgICAgdGhpcy5fZGlyZWN0aXZlcy5wdXNoKG5ldyBEaXJlY3RpdmUoZGVzY3JpcHRvciwgdGhpcywgbm9kZSwgaG9zdCwgc2NvcGUsIGZyYWcpKTtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogVGVhcmRvd24gYW4gaW5zdGFuY2UsIHVub2JzZXJ2ZXMgdGhlIGRhdGEsIHVuYmluZCBhbGwgdGhlXG4gICAgICogZGlyZWN0aXZlcywgdHVybiBvZmYgYWxsIHRoZSBldmVudCBsaXN0ZW5lcnMsIGV0Yy5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7Qm9vbGVhbn0gcmVtb3ZlIC0gd2hldGhlciB0byByZW1vdmUgdGhlIERPTSBub2RlLlxuICAgICAqIEBwYXJhbSB7Qm9vbGVhbn0gZGVmZXJDbGVhbnVwIC0gaWYgdHJ1ZSwgZGVmZXIgY2xlYW51cCB0b1xuICAgICAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYmUgY2FsbGVkIGxhdGVyXG4gICAgICovXG5cbiAgICBWdWUucHJvdG90eXBlLl9kZXN0cm95ID0gZnVuY3Rpb24gKHJlbW92ZSwgZGVmZXJDbGVhbnVwKSB7XG4gICAgICBpZiAodGhpcy5faXNCZWluZ0Rlc3Ryb3llZCkge1xuICAgICAgICBpZiAoIWRlZmVyQ2xlYW51cCkge1xuICAgICAgICAgIHRoaXMuX2NsZWFudXAoKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIHZhciBkZXN0cm95UmVhZHk7XG4gICAgICB2YXIgcGVuZGluZ1JlbW92YWw7XG5cbiAgICAgIHZhciBzZWxmID0gdGhpcztcbiAgICAgIC8vIENsZWFudXAgc2hvdWxkIGJlIGNhbGxlZCBlaXRoZXIgc3luY2hyb25vdXNseSBvciBhc3luY2hyb25veXNseSBhc1xuICAgICAgLy8gY2FsbGJhY2sgb2YgdGhpcy4kcmVtb3ZlKCksIG9yIGlmIHJlbW92ZSBhbmQgZGVmZXJDbGVhbnVwIGFyZSBmYWxzZS5cbiAgICAgIC8vIEluIGFueSBjYXNlIGl0IHNob3VsZCBiZSBjYWxsZWQgYWZ0ZXIgYWxsIG90aGVyIHJlbW92aW5nLCB1bmJpbmRpbmcgYW5kXG4gICAgICAvLyB0dXJuaW5nIG9mIGlzIGRvbmVcbiAgICAgIHZhciBjbGVhbnVwSWZQb3NzaWJsZSA9IGZ1bmN0aW9uIGNsZWFudXBJZlBvc3NpYmxlKCkge1xuICAgICAgICBpZiAoZGVzdHJveVJlYWR5ICYmICFwZW5kaW5nUmVtb3ZhbCAmJiAhZGVmZXJDbGVhbnVwKSB7XG4gICAgICAgICAgc2VsZi5fY2xlYW51cCgpO1xuICAgICAgICB9XG4gICAgICB9O1xuXG4gICAgICAvLyByZW1vdmUgRE9NIGVsZW1lbnRcbiAgICAgIGlmIChyZW1vdmUgJiYgdGhpcy4kZWwpIHtcbiAgICAgICAgcGVuZGluZ1JlbW92YWwgPSB0cnVlO1xuICAgICAgICB0aGlzLiRyZW1vdmUoZnVuY3Rpb24gKCkge1xuICAgICAgICAgIHBlbmRpbmdSZW1vdmFsID0gZmFsc2U7XG4gICAgICAgICAgY2xlYW51cElmUG9zc2libGUoKTtcbiAgICAgICAgfSk7XG4gICAgICB9XG5cbiAgICAgIHRoaXMuX2NhbGxIb29rKCdiZWZvcmVEZXN0cm95Jyk7XG4gICAgICB0aGlzLl9pc0JlaW5nRGVzdHJveWVkID0gdHJ1ZTtcbiAgICAgIHZhciBpO1xuICAgICAgLy8gcmVtb3ZlIHNlbGYgZnJvbSBwYXJlbnQuIG9ubHkgbmVjZXNzYXJ5XG4gICAgICAvLyBpZiBwYXJlbnQgaXMgbm90IGJlaW5nIGRlc3Ryb3llZCBhcyB3ZWxsLlxuICAgICAgdmFyIHBhcmVudCA9IHRoaXMuJHBhcmVudDtcbiAgICAgIGlmIChwYXJlbnQgJiYgIXBhcmVudC5faXNCZWluZ0Rlc3Ryb3llZCkge1xuICAgICAgICBwYXJlbnQuJGNoaWxkcmVuLiRyZW1vdmUodGhpcyk7XG4gICAgICAgIC8vIHVucmVnaXN0ZXIgcmVmIChyZW1vdmU6IHRydWUpXG4gICAgICAgIHRoaXMuX3VwZGF0ZVJlZih0cnVlKTtcbiAgICAgIH1cbiAgICAgIC8vIGRlc3Ryb3kgYWxsIGNoaWxkcmVuLlxuICAgICAgaSA9IHRoaXMuJGNoaWxkcmVuLmxlbmd0aDtcbiAgICAgIHdoaWxlIChpLS0pIHtcbiAgICAgICAgdGhpcy4kY2hpbGRyZW5baV0uJGRlc3Ryb3koKTtcbiAgICAgIH1cbiAgICAgIC8vIHRlYXJkb3duIHByb3BzXG4gICAgICBpZiAodGhpcy5fcHJvcHNVbmxpbmtGbikge1xuICAgICAgICB0aGlzLl9wcm9wc1VubGlua0ZuKCk7XG4gICAgICB9XG4gICAgICAvLyB0ZWFyZG93biBhbGwgZGlyZWN0aXZlcy4gdGhpcyBhbHNvIHRlYXJzZG93biBhbGxcbiAgICAgIC8vIGRpcmVjdGl2ZS1vd25lZCB3YXRjaGVycy5cbiAgICAgIGlmICh0aGlzLl91bmxpbmtGbikge1xuICAgICAgICB0aGlzLl91bmxpbmtGbigpO1xuICAgICAgfVxuICAgICAgaSA9IHRoaXMuX3dhdGNoZXJzLmxlbmd0aDtcbiAgICAgIHdoaWxlIChpLS0pIHtcbiAgICAgICAgdGhpcy5fd2F0Y2hlcnNbaV0udGVhcmRvd24oKTtcbiAgICAgIH1cbiAgICAgIC8vIHJlbW92ZSByZWZlcmVuY2UgdG8gc2VsZiBvbiAkZWxcbiAgICAgIGlmICh0aGlzLiRlbCkge1xuICAgICAgICB0aGlzLiRlbC5fX3Z1ZV9fID0gbnVsbDtcbiAgICAgIH1cblxuICAgICAgZGVzdHJveVJlYWR5ID0gdHJ1ZTtcbiAgICAgIGNsZWFudXBJZlBvc3NpYmxlKCk7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIENsZWFuIHVwIHRvIGVuc3VyZSBnYXJiYWdlIGNvbGxlY3Rpb24uXG4gICAgICogVGhpcyBpcyBjYWxsZWQgYWZ0ZXIgdGhlIGxlYXZlIHRyYW5zaXRpb24gaWYgdGhlcmVcbiAgICAgKiBpcyBhbnkuXG4gICAgICovXG5cbiAgICBWdWUucHJvdG90eXBlLl9jbGVhbnVwID0gZnVuY3Rpb24gKCkge1xuICAgICAgaWYgKHRoaXMuX2lzRGVzdHJveWVkKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIC8vIHJlbW92ZSBzZWxmIGZyb20gb3duZXIgZnJhZ21lbnRcbiAgICAgIC8vIGRvIGl0IGluIGNsZWFudXAgc28gdGhhdCB3ZSBjYW4gY2FsbCAkZGVzdHJveSB3aXRoXG4gICAgICAvLyBkZWZlciByaWdodCB3aGVuIGEgZnJhZ21lbnQgaXMgYWJvdXQgdG8gYmUgcmVtb3ZlZC5cbiAgICAgIGlmICh0aGlzLl9mcmFnKSB7XG4gICAgICAgIHRoaXMuX2ZyYWcuY2hpbGRyZW4uJHJlbW92ZSh0aGlzKTtcbiAgICAgIH1cbiAgICAgIC8vIHJlbW92ZSByZWZlcmVuY2UgZnJvbSBkYXRhIG9iXG4gICAgICAvLyBmcm96ZW4gb2JqZWN0IG1heSBub3QgaGF2ZSBvYnNlcnZlci5cbiAgICAgIGlmICh0aGlzLl9kYXRhICYmIHRoaXMuX2RhdGEuX19vYl9fKSB7XG4gICAgICAgIHRoaXMuX2RhdGEuX19vYl9fLnJlbW92ZVZtKHRoaXMpO1xuICAgICAgfVxuICAgICAgLy8gQ2xlYW4gdXAgcmVmZXJlbmNlcyB0byBwcml2YXRlIHByb3BlcnRpZXMgYW5kIG90aGVyXG4gICAgICAvLyBpbnN0YW5jZXMuIHByZXNlcnZlIHJlZmVyZW5jZSB0byBfZGF0YSBzbyB0aGF0IHByb3h5XG4gICAgICAvLyBhY2Nlc3NvcnMgc3RpbGwgd29yay4gVGhlIG9ubHkgcG90ZW50aWFsIHNpZGUgZWZmZWN0XG4gICAgICAvLyBoZXJlIGlzIHRoYXQgbXV0YXRpbmcgdGhlIGluc3RhbmNlIGFmdGVyIGl0J3MgZGVzdHJveWVkXG4gICAgICAvLyBtYXkgYWZmZWN0IHRoZSBzdGF0ZSBvZiBvdGhlciBjb21wb25lbnRzIHRoYXQgYXJlIHN0aWxsXG4gICAgICAvLyBvYnNlcnZpbmcgdGhlIHNhbWUgb2JqZWN0LCBidXQgdGhhdCBzZWVtcyB0byBiZSBhXG4gICAgICAvLyByZWFzb25hYmxlIHJlc3BvbnNpYmlsaXR5IGZvciB0aGUgdXNlciByYXRoZXIgdGhhblxuICAgICAgLy8gYWx3YXlzIHRocm93aW5nIGFuIGVycm9yIG9uIHRoZW0uXG4gICAgICB0aGlzLiRlbCA9IHRoaXMuJHBhcmVudCA9IHRoaXMuJHJvb3QgPSB0aGlzLiRjaGlsZHJlbiA9IHRoaXMuX3dhdGNoZXJzID0gdGhpcy5fY29udGV4dCA9IHRoaXMuX3Njb3BlID0gdGhpcy5fZGlyZWN0aXZlcyA9IG51bGw7XG4gICAgICAvLyBjYWxsIHRoZSBsYXN0IGhvb2suLi5cbiAgICAgIHRoaXMuX2lzRGVzdHJveWVkID0gdHJ1ZTtcbiAgICAgIHRoaXMuX2NhbGxIb29rKCdkZXN0cm95ZWQnKTtcbiAgICAgIC8vIHR1cm4gb2ZmIGFsbCBpbnN0YW5jZSBsaXN0ZW5lcnMuXG4gICAgICB0aGlzLiRvZmYoKTtcbiAgICB9O1xuICB9XG5cbiAgZnVuY3Rpb24gbWlzY01peGluIChWdWUpIHtcbiAgICAvKipcbiAgICAgKiBBcHBseSBhIGxpc3Qgb2YgZmlsdGVyIChkZXNjcmlwdG9ycykgdG8gYSB2YWx1ZS5cbiAgICAgKiBVc2luZyBwbGFpbiBmb3IgbG9vcHMgaGVyZSBiZWNhdXNlIHRoaXMgd2lsbCBiZSBjYWxsZWQgaW5cbiAgICAgKiB0aGUgZ2V0dGVyIG9mIGFueSB3YXRjaGVyIHdpdGggZmlsdGVycyBzbyBpdCBpcyB2ZXJ5XG4gICAgICogcGVyZm9ybWFuY2Ugc2Vuc2l0aXZlLlxuICAgICAqXG4gICAgICogQHBhcmFtIHsqfSB2YWx1ZVxuICAgICAqIEBwYXJhbSB7Kn0gW29sZFZhbHVlXVxuICAgICAqIEBwYXJhbSB7QXJyYXl9IGZpbHRlcnNcbiAgICAgKiBAcGFyYW0ge0Jvb2xlYW59IHdyaXRlXG4gICAgICogQHJldHVybiB7Kn1cbiAgICAgKi9cblxuICAgIFZ1ZS5wcm90b3R5cGUuX2FwcGx5RmlsdGVycyA9IGZ1bmN0aW9uICh2YWx1ZSwgb2xkVmFsdWUsIGZpbHRlcnMsIHdyaXRlKSB7XG4gICAgICB2YXIgZmlsdGVyLCBmbiwgYXJncywgYXJnLCBvZmZzZXQsIGksIGwsIGosIGs7XG4gICAgICBmb3IgKGkgPSAwLCBsID0gZmlsdGVycy5sZW5ndGg7IGkgPCBsOyBpKyspIHtcbiAgICAgICAgZmlsdGVyID0gZmlsdGVyc1t3cml0ZSA/IGwgLSBpIC0gMSA6IGldO1xuICAgICAgICBmbiA9IHJlc29sdmVBc3NldCh0aGlzLiRvcHRpb25zLCAnZmlsdGVycycsIGZpbHRlci5uYW1lLCB0cnVlKTtcbiAgICAgICAgaWYgKCFmbikgY29udGludWU7XG4gICAgICAgIGZuID0gd3JpdGUgPyBmbi53cml0ZSA6IGZuLnJlYWQgfHwgZm47XG4gICAgICAgIGlmICh0eXBlb2YgZm4gIT09ICdmdW5jdGlvbicpIGNvbnRpbnVlO1xuICAgICAgICBhcmdzID0gd3JpdGUgPyBbdmFsdWUsIG9sZFZhbHVlXSA6IFt2YWx1ZV07XG4gICAgICAgIG9mZnNldCA9IHdyaXRlID8gMiA6IDE7XG4gICAgICAgIGlmIChmaWx0ZXIuYXJncykge1xuICAgICAgICAgIGZvciAoaiA9IDAsIGsgPSBmaWx0ZXIuYXJncy5sZW5ndGg7IGogPCBrOyBqKyspIHtcbiAgICAgICAgICAgIGFyZyA9IGZpbHRlci5hcmdzW2pdO1xuICAgICAgICAgICAgYXJnc1tqICsgb2Zmc2V0XSA9IGFyZy5keW5hbWljID8gdGhpcy4kZ2V0KGFyZy52YWx1ZSkgOiBhcmcudmFsdWU7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHZhbHVlID0gZm4uYXBwbHkodGhpcywgYXJncyk7XG4gICAgICB9XG4gICAgICByZXR1cm4gdmFsdWU7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIFJlc29sdmUgYSBjb21wb25lbnQsIGRlcGVuZGluZyBvbiB3aGV0aGVyIHRoZSBjb21wb25lbnRcbiAgICAgKiBpcyBkZWZpbmVkIG5vcm1hbGx5IG9yIHVzaW5nIGFuIGFzeW5jIGZhY3RvcnkgZnVuY3Rpb24uXG4gICAgICogUmVzb2x2ZXMgc3luY2hyb25vdXNseSBpZiBhbHJlYWR5IHJlc29sdmVkLCBvdGhlcndpc2VcbiAgICAgKiByZXNvbHZlcyBhc3luY2hyb25vdXNseSBhbmQgY2FjaGVzIHRoZSByZXNvbHZlZFxuICAgICAqIGNvbnN0cnVjdG9yIG9uIHRoZSBmYWN0b3J5LlxuICAgICAqXG4gICAgICogQHBhcmFtIHtTdHJpbmd8RnVuY3Rpb259IHZhbHVlXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gY2JcbiAgICAgKi9cblxuICAgIFZ1ZS5wcm90b3R5cGUuX3Jlc29sdmVDb21wb25lbnQgPSBmdW5jdGlvbiAodmFsdWUsIGNiKSB7XG4gICAgICB2YXIgZmFjdG9yeTtcbiAgICAgIGlmICh0eXBlb2YgdmFsdWUgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgZmFjdG9yeSA9IHZhbHVlO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZmFjdG9yeSA9IHJlc29sdmVBc3NldCh0aGlzLiRvcHRpb25zLCAnY29tcG9uZW50cycsIHZhbHVlLCB0cnVlKTtcbiAgICAgIH1cbiAgICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBpZiAqL1xuICAgICAgaWYgKCFmYWN0b3J5KSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIC8vIGFzeW5jIGNvbXBvbmVudCBmYWN0b3J5XG4gICAgICBpZiAoIWZhY3Rvcnkub3B0aW9ucykge1xuICAgICAgICBpZiAoZmFjdG9yeS5yZXNvbHZlZCkge1xuICAgICAgICAgIC8vIGNhY2hlZFxuICAgICAgICAgIGNiKGZhY3RvcnkucmVzb2x2ZWQpO1xuICAgICAgICB9IGVsc2UgaWYgKGZhY3RvcnkucmVxdWVzdGVkKSB7XG4gICAgICAgICAgLy8gcG9vbCBjYWxsYmFja3NcbiAgICAgICAgICBmYWN0b3J5LnBlbmRpbmdDYWxsYmFja3MucHVzaChjYik7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgZmFjdG9yeS5yZXF1ZXN0ZWQgPSB0cnVlO1xuICAgICAgICAgIHZhciBjYnMgPSBmYWN0b3J5LnBlbmRpbmdDYWxsYmFja3MgPSBbY2JdO1xuICAgICAgICAgIGZhY3RvcnkuY2FsbCh0aGlzLCBmdW5jdGlvbiByZXNvbHZlKHJlcykge1xuICAgICAgICAgICAgaWYgKGlzUGxhaW5PYmplY3QocmVzKSkge1xuICAgICAgICAgICAgICByZXMgPSBWdWUuZXh0ZW5kKHJlcyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBjYWNoZSByZXNvbHZlZFxuICAgICAgICAgICAgZmFjdG9yeS5yZXNvbHZlZCA9IHJlcztcbiAgICAgICAgICAgIC8vIGludm9rZSBjYWxsYmFja3NcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwLCBsID0gY2JzLmxlbmd0aDsgaSA8IGw7IGkrKykge1xuICAgICAgICAgICAgICBjYnNbaV0ocmVzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9LCBmdW5jdGlvbiByZWplY3QocmVhc29uKSB7XG4gICAgICAgICAgICAnZGV2ZWxvcG1lbnQnICE9PSAncHJvZHVjdGlvbicgJiYgd2FybignRmFpbGVkIHRvIHJlc29sdmUgYXN5bmMgY29tcG9uZW50JyArICh0eXBlb2YgdmFsdWUgPT09ICdzdHJpbmcnID8gJzogJyArIHZhbHVlIDogJycpICsgJy4gJyArIChyZWFzb24gPyAnXFxuUmVhc29uOiAnICsgcmVhc29uIDogJycpKTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgLy8gbm9ybWFsIGNvbXBvbmVudFxuICAgICAgICBjYihmYWN0b3J5KTtcbiAgICAgIH1cbiAgICB9O1xuICB9XG5cbiAgdmFyIGZpbHRlclJFJDEgPSAvW158XVxcfFtefF0vO1xuXG4gIGZ1bmN0aW9uIGRhdGFBUEkgKFZ1ZSkge1xuICAgIC8qKlxuICAgICAqIEdldCB0aGUgdmFsdWUgZnJvbSBhbiBleHByZXNzaW9uIG9uIHRoaXMgdm0uXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gZXhwXG4gICAgICogQHBhcmFtIHtCb29sZWFufSBbYXNTdGF0ZW1lbnRdXG4gICAgICogQHJldHVybiB7Kn1cbiAgICAgKi9cblxuICAgIFZ1ZS5wcm90b3R5cGUuJGdldCA9IGZ1bmN0aW9uIChleHAsIGFzU3RhdGVtZW50KSB7XG4gICAgICB2YXIgcmVzID0gcGFyc2VFeHByZXNzaW9uKGV4cCk7XG4gICAgICBpZiAocmVzKSB7XG4gICAgICAgIGlmIChhc1N0YXRlbWVudCkge1xuICAgICAgICAgIHZhciBzZWxmID0gdGhpcztcbiAgICAgICAgICByZXR1cm4gZnVuY3Rpb24gc3RhdGVtZW50SGFuZGxlcigpIHtcbiAgICAgICAgICAgIHNlbGYuJGFyZ3VtZW50cyA9IHRvQXJyYXkoYXJndW1lbnRzKTtcbiAgICAgICAgICAgIHZhciByZXN1bHQgPSByZXMuZ2V0LmNhbGwoc2VsZiwgc2VsZik7XG4gICAgICAgICAgICBzZWxmLiRhcmd1bWVudHMgPSBudWxsO1xuICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICAgICAgICB9O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICByZXR1cm4gcmVzLmdldC5jYWxsKHRoaXMsIHRoaXMpO1xuICAgICAgICAgIH0gY2F0Y2ggKGUpIHt9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogU2V0IHRoZSB2YWx1ZSBmcm9tIGFuIGV4cHJlc3Npb24gb24gdGhpcyB2bS5cbiAgICAgKiBUaGUgZXhwcmVzc2lvbiBtdXN0IGJlIGEgdmFsaWQgbGVmdC1oYW5kXG4gICAgICogZXhwcmVzc2lvbiBpbiBhbiBhc3NpZ25tZW50LlxuICAgICAqXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IGV4cFxuICAgICAqIEBwYXJhbSB7Kn0gdmFsXG4gICAgICovXG5cbiAgICBWdWUucHJvdG90eXBlLiRzZXQgPSBmdW5jdGlvbiAoZXhwLCB2YWwpIHtcbiAgICAgIHZhciByZXMgPSBwYXJzZUV4cHJlc3Npb24oZXhwLCB0cnVlKTtcbiAgICAgIGlmIChyZXMgJiYgcmVzLnNldCkge1xuICAgICAgICByZXMuc2V0LmNhbGwodGhpcywgdGhpcywgdmFsKTtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogRGVsZXRlIGEgcHJvcGVydHkgb24gdGhlIFZNXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30ga2V5XG4gICAgICovXG5cbiAgICBWdWUucHJvdG90eXBlLiRkZWxldGUgPSBmdW5jdGlvbiAoa2V5KSB7XG4gICAgICBkZWwodGhpcy5fZGF0YSwga2V5KTtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogV2F0Y2ggYW4gZXhwcmVzc2lvbiwgdHJpZ2dlciBjYWxsYmFjayB3aGVuIGl0c1xuICAgICAqIHZhbHVlIGNoYW5nZXMuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge1N0cmluZ3xGdW5jdGlvbn0gZXhwT3JGblxuICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IGNiXG4gICAgICogQHBhcmFtIHtPYmplY3R9IFtvcHRpb25zXVxuICAgICAqICAgICAgICAgICAgICAgICAtIHtCb29sZWFufSBkZWVwXG4gICAgICogICAgICAgICAgICAgICAgIC0ge0Jvb2xlYW59IGltbWVkaWF0ZVxuICAgICAqIEByZXR1cm4ge0Z1bmN0aW9ufSAtIHVud2F0Y2hGblxuICAgICAqL1xuXG4gICAgVnVlLnByb3RvdHlwZS4kd2F0Y2ggPSBmdW5jdGlvbiAoZXhwT3JGbiwgY2IsIG9wdGlvbnMpIHtcbiAgICAgIHZhciB2bSA9IHRoaXM7XG4gICAgICB2YXIgcGFyc2VkO1xuICAgICAgaWYgKHR5cGVvZiBleHBPckZuID09PSAnc3RyaW5nJykge1xuICAgICAgICBwYXJzZWQgPSBwYXJzZURpcmVjdGl2ZShleHBPckZuKTtcbiAgICAgICAgZXhwT3JGbiA9IHBhcnNlZC5leHByZXNzaW9uO1xuICAgICAgfVxuICAgICAgdmFyIHdhdGNoZXIgPSBuZXcgV2F0Y2hlcih2bSwgZXhwT3JGbiwgY2IsIHtcbiAgICAgICAgZGVlcDogb3B0aW9ucyAmJiBvcHRpb25zLmRlZXAsXG4gICAgICAgIHN5bmM6IG9wdGlvbnMgJiYgb3B0aW9ucy5zeW5jLFxuICAgICAgICBmaWx0ZXJzOiBwYXJzZWQgJiYgcGFyc2VkLmZpbHRlcnMsXG4gICAgICAgIHVzZXI6ICFvcHRpb25zIHx8IG9wdGlvbnMudXNlciAhPT0gZmFsc2VcbiAgICAgIH0pO1xuICAgICAgaWYgKG9wdGlvbnMgJiYgb3B0aW9ucy5pbW1lZGlhdGUpIHtcbiAgICAgICAgY2IuY2FsbCh2bSwgd2F0Y2hlci52YWx1ZSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gZnVuY3Rpb24gdW53YXRjaEZuKCkge1xuICAgICAgICB3YXRjaGVyLnRlYXJkb3duKCk7XG4gICAgICB9O1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBFdmFsdWF0ZSBhIHRleHQgZGlyZWN0aXZlLCBpbmNsdWRpbmcgZmlsdGVycy5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSB0ZXh0XG4gICAgICogQHBhcmFtIHtCb29sZWFufSBbYXNTdGF0ZW1lbnRdXG4gICAgICogQHJldHVybiB7U3RyaW5nfVxuICAgICAqL1xuXG4gICAgVnVlLnByb3RvdHlwZS4kZXZhbCA9IGZ1bmN0aW9uICh0ZXh0LCBhc1N0YXRlbWVudCkge1xuICAgICAgLy8gY2hlY2sgZm9yIGZpbHRlcnMuXG4gICAgICBpZiAoZmlsdGVyUkUkMS50ZXN0KHRleHQpKSB7XG4gICAgICAgIHZhciBkaXIgPSBwYXJzZURpcmVjdGl2ZSh0ZXh0KTtcbiAgICAgICAgLy8gdGhlIGZpbHRlciByZWdleCBjaGVjayBtaWdodCBnaXZlIGZhbHNlIHBvc2l0aXZlXG4gICAgICAgIC8vIGZvciBwaXBlcyBpbnNpZGUgc3RyaW5ncywgc28gaXQncyBwb3NzaWJsZSB0aGF0XG4gICAgICAgIC8vIHdlIGRvbid0IGdldCBhbnkgZmlsdGVycyBoZXJlXG4gICAgICAgIHZhciB2YWwgPSB0aGlzLiRnZXQoZGlyLmV4cHJlc3Npb24sIGFzU3RhdGVtZW50KTtcbiAgICAgICAgcmV0dXJuIGRpci5maWx0ZXJzID8gdGhpcy5fYXBwbHlGaWx0ZXJzKHZhbCwgbnVsbCwgZGlyLmZpbHRlcnMpIDogdmFsO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgLy8gbm8gZmlsdGVyXG4gICAgICAgIHJldHVybiB0aGlzLiRnZXQodGV4dCwgYXNTdGF0ZW1lbnQpO1xuICAgICAgfVxuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBJbnRlcnBvbGF0ZSBhIHBpZWNlIG9mIHRlbXBsYXRlIHRleHQuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gdGV4dFxuICAgICAqIEByZXR1cm4ge1N0cmluZ31cbiAgICAgKi9cblxuICAgIFZ1ZS5wcm90b3R5cGUuJGludGVycG9sYXRlID0gZnVuY3Rpb24gKHRleHQpIHtcbiAgICAgIHZhciB0b2tlbnMgPSBwYXJzZVRleHQodGV4dCk7XG4gICAgICB2YXIgdm0gPSB0aGlzO1xuICAgICAgaWYgKHRva2Vucykge1xuICAgICAgICBpZiAodG9rZW5zLmxlbmd0aCA9PT0gMSkge1xuICAgICAgICAgIHJldHVybiB2bS4kZXZhbCh0b2tlbnNbMF0udmFsdWUpICsgJyc7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmV0dXJuIHRva2Vucy5tYXAoZnVuY3Rpb24gKHRva2VuKSB7XG4gICAgICAgICAgICByZXR1cm4gdG9rZW4udGFnID8gdm0uJGV2YWwodG9rZW4udmFsdWUpIDogdG9rZW4udmFsdWU7XG4gICAgICAgICAgfSkuam9pbignJyk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiB0ZXh0O1xuICAgICAgfVxuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBMb2cgaW5zdGFuY2UgZGF0YSBhcyBhIHBsYWluIEpTIG9iamVjdFxuICAgICAqIHNvIHRoYXQgaXQgaXMgZWFzaWVyIHRvIGluc3BlY3QgaW4gY29uc29sZS5cbiAgICAgKiBUaGlzIG1ldGhvZCBhc3N1bWVzIGNvbnNvbGUgaXMgYXZhaWxhYmxlLlxuICAgICAqXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IFtwYXRoXVxuICAgICAqL1xuXG4gICAgVnVlLnByb3RvdHlwZS4kbG9nID0gZnVuY3Rpb24gKHBhdGgpIHtcbiAgICAgIHZhciBkYXRhID0gcGF0aCA/IGdldFBhdGgodGhpcy5fZGF0YSwgcGF0aCkgOiB0aGlzLl9kYXRhO1xuICAgICAgaWYgKGRhdGEpIHtcbiAgICAgICAgZGF0YSA9IGNsZWFuKGRhdGEpO1xuICAgICAgfVxuICAgICAgLy8gaW5jbHVkZSBjb21wdXRlZCBmaWVsZHNcbiAgICAgIGlmICghcGF0aCkge1xuICAgICAgICB2YXIga2V5O1xuICAgICAgICBmb3IgKGtleSBpbiB0aGlzLiRvcHRpb25zLmNvbXB1dGVkKSB7XG4gICAgICAgICAgZGF0YVtrZXldID0gY2xlYW4odGhpc1trZXldKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5fcHJvcHMpIHtcbiAgICAgICAgICBmb3IgKGtleSBpbiB0aGlzLl9wcm9wcykge1xuICAgICAgICAgICAgZGF0YVtrZXldID0gY2xlYW4odGhpc1trZXldKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGNvbnNvbGUubG9nKGRhdGEpO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBcImNsZWFuXCIgYSBnZXR0ZXIvc2V0dGVyIGNvbnZlcnRlZCBvYmplY3QgaW50byBhIHBsYWluXG4gICAgICogb2JqZWN0IGNvcHkuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gLSBvYmpcbiAgICAgKiBAcmV0dXJuIHtPYmplY3R9XG4gICAgICovXG5cbiAgICBmdW5jdGlvbiBjbGVhbihvYmopIHtcbiAgICAgIHJldHVybiBKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KG9iaikpO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIGRvbUFQSSAoVnVlKSB7XG4gICAgLyoqXG4gICAgICogQ29udmVuaWVuY2Ugb24taW5zdGFuY2UgbmV4dFRpY2suIFRoZSBjYWxsYmFjayBpc1xuICAgICAqIGF1dG8tYm91bmQgdG8gdGhlIGluc3RhbmNlLCBhbmQgdGhpcyBhdm9pZHMgY29tcG9uZW50XG4gICAgICogbW9kdWxlcyBoYXZpbmcgdG8gcmVseSBvbiB0aGUgZ2xvYmFsIFZ1ZS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IGZuXG4gICAgICovXG5cbiAgICBWdWUucHJvdG90eXBlLiRuZXh0VGljayA9IGZ1bmN0aW9uIChmbikge1xuICAgICAgbmV4dFRpY2soZm4sIHRoaXMpO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBBcHBlbmQgaW5zdGFuY2UgdG8gdGFyZ2V0XG4gICAgICpcbiAgICAgKiBAcGFyYW0ge05vZGV9IHRhcmdldFxuICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IFtjYl1cbiAgICAgKiBAcGFyYW0ge0Jvb2xlYW59IFt3aXRoVHJhbnNpdGlvbl0gLSBkZWZhdWx0cyB0byB0cnVlXG4gICAgICovXG5cbiAgICBWdWUucHJvdG90eXBlLiRhcHBlbmRUbyA9IGZ1bmN0aW9uICh0YXJnZXQsIGNiLCB3aXRoVHJhbnNpdGlvbikge1xuICAgICAgcmV0dXJuIGluc2VydCh0aGlzLCB0YXJnZXQsIGNiLCB3aXRoVHJhbnNpdGlvbiwgYXBwZW5kLCBhcHBlbmRXaXRoVHJhbnNpdGlvbik7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIFByZXBlbmQgaW5zdGFuY2UgdG8gdGFyZ2V0XG4gICAgICpcbiAgICAgKiBAcGFyYW0ge05vZGV9IHRhcmdldFxuICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IFtjYl1cbiAgICAgKiBAcGFyYW0ge0Jvb2xlYW59IFt3aXRoVHJhbnNpdGlvbl0gLSBkZWZhdWx0cyB0byB0cnVlXG4gICAgICovXG5cbiAgICBWdWUucHJvdG90eXBlLiRwcmVwZW5kVG8gPSBmdW5jdGlvbiAodGFyZ2V0LCBjYiwgd2l0aFRyYW5zaXRpb24pIHtcbiAgICAgIHRhcmdldCA9IHF1ZXJ5KHRhcmdldCk7XG4gICAgICBpZiAodGFyZ2V0Lmhhc0NoaWxkTm9kZXMoKSkge1xuICAgICAgICB0aGlzLiRiZWZvcmUodGFyZ2V0LmZpcnN0Q2hpbGQsIGNiLCB3aXRoVHJhbnNpdGlvbik7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLiRhcHBlbmRUbyh0YXJnZXQsIGNiLCB3aXRoVHJhbnNpdGlvbik7XG4gICAgICB9XG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogSW5zZXJ0IGluc3RhbmNlIGJlZm9yZSB0YXJnZXRcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7Tm9kZX0gdGFyZ2V0XG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gW2NiXVxuICAgICAqIEBwYXJhbSB7Qm9vbGVhbn0gW3dpdGhUcmFuc2l0aW9uXSAtIGRlZmF1bHRzIHRvIHRydWVcbiAgICAgKi9cblxuICAgIFZ1ZS5wcm90b3R5cGUuJGJlZm9yZSA9IGZ1bmN0aW9uICh0YXJnZXQsIGNiLCB3aXRoVHJhbnNpdGlvbikge1xuICAgICAgcmV0dXJuIGluc2VydCh0aGlzLCB0YXJnZXQsIGNiLCB3aXRoVHJhbnNpdGlvbiwgYmVmb3JlV2l0aENiLCBiZWZvcmVXaXRoVHJhbnNpdGlvbik7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIEluc2VydCBpbnN0YW5jZSBhZnRlciB0YXJnZXRcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7Tm9kZX0gdGFyZ2V0XG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gW2NiXVxuICAgICAqIEBwYXJhbSB7Qm9vbGVhbn0gW3dpdGhUcmFuc2l0aW9uXSAtIGRlZmF1bHRzIHRvIHRydWVcbiAgICAgKi9cblxuICAgIFZ1ZS5wcm90b3R5cGUuJGFmdGVyID0gZnVuY3Rpb24gKHRhcmdldCwgY2IsIHdpdGhUcmFuc2l0aW9uKSB7XG4gICAgICB0YXJnZXQgPSBxdWVyeSh0YXJnZXQpO1xuICAgICAgaWYgKHRhcmdldC5uZXh0U2libGluZykge1xuICAgICAgICB0aGlzLiRiZWZvcmUodGFyZ2V0Lm5leHRTaWJsaW5nLCBjYiwgd2l0aFRyYW5zaXRpb24pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy4kYXBwZW5kVG8odGFyZ2V0LnBhcmVudE5vZGUsIGNiLCB3aXRoVHJhbnNpdGlvbik7XG4gICAgICB9XG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogUmVtb3ZlIGluc3RhbmNlIGZyb20gRE9NXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBbY2JdXG4gICAgICogQHBhcmFtIHtCb29sZWFufSBbd2l0aFRyYW5zaXRpb25dIC0gZGVmYXVsdHMgdG8gdHJ1ZVxuICAgICAqL1xuXG4gICAgVnVlLnByb3RvdHlwZS4kcmVtb3ZlID0gZnVuY3Rpb24gKGNiLCB3aXRoVHJhbnNpdGlvbikge1xuICAgICAgaWYgKCF0aGlzLiRlbC5wYXJlbnROb2RlKSB7XG4gICAgICAgIHJldHVybiBjYiAmJiBjYigpO1xuICAgICAgfVxuICAgICAgdmFyIGluRG9jdW1lbnQgPSB0aGlzLl9pc0F0dGFjaGVkICYmIGluRG9jKHRoaXMuJGVsKTtcbiAgICAgIC8vIGlmIHdlIGFyZSBub3QgaW4gZG9jdW1lbnQsIG5vIG5lZWQgdG8gY2hlY2tcbiAgICAgIC8vIGZvciB0cmFuc2l0aW9uc1xuICAgICAgaWYgKCFpbkRvY3VtZW50KSB3aXRoVHJhbnNpdGlvbiA9IGZhbHNlO1xuICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgICAgdmFyIHJlYWxDYiA9IGZ1bmN0aW9uIHJlYWxDYigpIHtcbiAgICAgICAgaWYgKGluRG9jdW1lbnQpIHNlbGYuX2NhbGxIb29rKCdkZXRhY2hlZCcpO1xuICAgICAgICBpZiAoY2IpIGNiKCk7XG4gICAgICB9O1xuICAgICAgaWYgKHRoaXMuX2lzRnJhZ21lbnQpIHtcbiAgICAgICAgcmVtb3ZlTm9kZVJhbmdlKHRoaXMuX2ZyYWdtZW50U3RhcnQsIHRoaXMuX2ZyYWdtZW50RW5kLCB0aGlzLCB0aGlzLl9mcmFnbWVudCwgcmVhbENiKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHZhciBvcCA9IHdpdGhUcmFuc2l0aW9uID09PSBmYWxzZSA/IHJlbW92ZVdpdGhDYiA6IHJlbW92ZVdpdGhUcmFuc2l0aW9uO1xuICAgICAgICBvcCh0aGlzLiRlbCwgdGhpcywgcmVhbENiKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBTaGFyZWQgRE9NIGluc2VydGlvbiBmdW5jdGlvbi5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7VnVlfSB2bVxuICAgICAqIEBwYXJhbSB7RWxlbWVudH0gdGFyZ2V0XG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gW2NiXVxuICAgICAqIEBwYXJhbSB7Qm9vbGVhbn0gW3dpdGhUcmFuc2l0aW9uXVxuICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IG9wMSAtIG9wIGZvciBub24tdHJhbnNpdGlvbiBpbnNlcnRcbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBvcDIgLSBvcCBmb3IgdHJhbnNpdGlvbiBpbnNlcnRcbiAgICAgKiBAcmV0dXJuIHZtXG4gICAgICovXG5cbiAgICBmdW5jdGlvbiBpbnNlcnQodm0sIHRhcmdldCwgY2IsIHdpdGhUcmFuc2l0aW9uLCBvcDEsIG9wMikge1xuICAgICAgdGFyZ2V0ID0gcXVlcnkodGFyZ2V0KTtcbiAgICAgIHZhciB0YXJnZXRJc0RldGFjaGVkID0gIWluRG9jKHRhcmdldCk7XG4gICAgICB2YXIgb3AgPSB3aXRoVHJhbnNpdGlvbiA9PT0gZmFsc2UgfHwgdGFyZ2V0SXNEZXRhY2hlZCA/IG9wMSA6IG9wMjtcbiAgICAgIHZhciBzaG91bGRDYWxsSG9vayA9ICF0YXJnZXRJc0RldGFjaGVkICYmICF2bS5faXNBdHRhY2hlZCAmJiAhaW5Eb2Modm0uJGVsKTtcbiAgICAgIGlmICh2bS5faXNGcmFnbWVudCkge1xuICAgICAgICBtYXBOb2RlUmFuZ2Uodm0uX2ZyYWdtZW50U3RhcnQsIHZtLl9mcmFnbWVudEVuZCwgZnVuY3Rpb24gKG5vZGUpIHtcbiAgICAgICAgICBvcChub2RlLCB0YXJnZXQsIHZtKTtcbiAgICAgICAgfSk7XG4gICAgICAgIGNiICYmIGNiKCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBvcCh2bS4kZWwsIHRhcmdldCwgdm0sIGNiKTtcbiAgICAgIH1cbiAgICAgIGlmIChzaG91bGRDYWxsSG9vaykge1xuICAgICAgICB2bS5fY2FsbEhvb2soJ2F0dGFjaGVkJyk7XG4gICAgICB9XG4gICAgICByZXR1cm4gdm07XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ2hlY2sgZm9yIHNlbGVjdG9yc1xuICAgICAqXG4gICAgICogQHBhcmFtIHtTdHJpbmd8RWxlbWVudH0gZWxcbiAgICAgKi9cblxuICAgIGZ1bmN0aW9uIHF1ZXJ5KGVsKSB7XG4gICAgICByZXR1cm4gdHlwZW9mIGVsID09PSAnc3RyaW5nJyA/IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoZWwpIDogZWw7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQXBwZW5kIG9wZXJhdGlvbiB0aGF0IHRha2VzIGEgY2FsbGJhY2suXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge05vZGV9IGVsXG4gICAgICogQHBhcmFtIHtOb2RlfSB0YXJnZXRcbiAgICAgKiBAcGFyYW0ge1Z1ZX0gdm0gLSB1bnVzZWRcbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBbY2JdXG4gICAgICovXG5cbiAgICBmdW5jdGlvbiBhcHBlbmQoZWwsIHRhcmdldCwgdm0sIGNiKSB7XG4gICAgICB0YXJnZXQuYXBwZW5kQ2hpbGQoZWwpO1xuICAgICAgaWYgKGNiKSBjYigpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEluc2VydEJlZm9yZSBvcGVyYXRpb24gdGhhdCB0YWtlcyBhIGNhbGxiYWNrLlxuICAgICAqXG4gICAgICogQHBhcmFtIHtOb2RlfSBlbFxuICAgICAqIEBwYXJhbSB7Tm9kZX0gdGFyZ2V0XG4gICAgICogQHBhcmFtIHtWdWV9IHZtIC0gdW51c2VkXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gW2NiXVxuICAgICAqL1xuXG4gICAgZnVuY3Rpb24gYmVmb3JlV2l0aENiKGVsLCB0YXJnZXQsIHZtLCBjYikge1xuICAgICAgYmVmb3JlKGVsLCB0YXJnZXQpO1xuICAgICAgaWYgKGNiKSBjYigpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJlbW92ZSBvcGVyYXRpb24gdGhhdCB0YWtlcyBhIGNhbGxiYWNrLlxuICAgICAqXG4gICAgICogQHBhcmFtIHtOb2RlfSBlbFxuICAgICAqIEBwYXJhbSB7VnVlfSB2bSAtIHVudXNlZFxuICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IFtjYl1cbiAgICAgKi9cblxuICAgIGZ1bmN0aW9uIHJlbW92ZVdpdGhDYihlbCwgdm0sIGNiKSB7XG4gICAgICByZW1vdmUoZWwpO1xuICAgICAgaWYgKGNiKSBjYigpO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIGV2ZW50c0FQSSAoVnVlKSB7XG4gICAgLyoqXG4gICAgICogTGlzdGVuIG9uIHRoZSBnaXZlbiBgZXZlbnRgIHdpdGggYGZuYC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBldmVudFxuICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IGZuXG4gICAgICovXG5cbiAgICBWdWUucHJvdG90eXBlLiRvbiA9IGZ1bmN0aW9uIChldmVudCwgZm4pIHtcbiAgICAgICh0aGlzLl9ldmVudHNbZXZlbnRdIHx8ICh0aGlzLl9ldmVudHNbZXZlbnRdID0gW10pKS5wdXNoKGZuKTtcbiAgICAgIG1vZGlmeUxpc3RlbmVyQ291bnQodGhpcywgZXZlbnQsIDEpO1xuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIEFkZHMgYW4gYGV2ZW50YCBsaXN0ZW5lciB0aGF0IHdpbGwgYmUgaW52b2tlZCBhIHNpbmdsZVxuICAgICAqIHRpbWUgdGhlbiBhdXRvbWF0aWNhbGx5IHJlbW92ZWQuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gZXZlbnRcbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBmblxuICAgICAqL1xuXG4gICAgVnVlLnByb3RvdHlwZS4kb25jZSA9IGZ1bmN0aW9uIChldmVudCwgZm4pIHtcbiAgICAgIHZhciBzZWxmID0gdGhpcztcbiAgICAgIGZ1bmN0aW9uIG9uKCkge1xuICAgICAgICBzZWxmLiRvZmYoZXZlbnQsIG9uKTtcbiAgICAgICAgZm4uYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICAgIH1cbiAgICAgIG9uLmZuID0gZm47XG4gICAgICB0aGlzLiRvbihldmVudCwgb24pO1xuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIFJlbW92ZSB0aGUgZ2l2ZW4gY2FsbGJhY2sgZm9yIGBldmVudGAgb3IgYWxsXG4gICAgICogcmVnaXN0ZXJlZCBjYWxsYmFja3MuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gZXZlbnRcbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBmblxuICAgICAqL1xuXG4gICAgVnVlLnByb3RvdHlwZS4kb2ZmID0gZnVuY3Rpb24gKGV2ZW50LCBmbikge1xuICAgICAgdmFyIGNicztcbiAgICAgIC8vIGFsbFxuICAgICAgaWYgKCFhcmd1bWVudHMubGVuZ3RoKSB7XG4gICAgICAgIGlmICh0aGlzLiRwYXJlbnQpIHtcbiAgICAgICAgICBmb3IgKGV2ZW50IGluIHRoaXMuX2V2ZW50cykge1xuICAgICAgICAgICAgY2JzID0gdGhpcy5fZXZlbnRzW2V2ZW50XTtcbiAgICAgICAgICAgIGlmIChjYnMpIHtcbiAgICAgICAgICAgICAgbW9kaWZ5TGlzdGVuZXJDb3VudCh0aGlzLCBldmVudCwgLWNicy5sZW5ndGgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9ldmVudHMgPSB7fTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICB9XG4gICAgICAvLyBzcGVjaWZpYyBldmVudFxuICAgICAgY2JzID0gdGhpcy5fZXZlbnRzW2V2ZW50XTtcbiAgICAgIGlmICghY2JzKSB7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgfVxuICAgICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDEpIHtcbiAgICAgICAgbW9kaWZ5TGlzdGVuZXJDb3VudCh0aGlzLCBldmVudCwgLWNicy5sZW5ndGgpO1xuICAgICAgICB0aGlzLl9ldmVudHNbZXZlbnRdID0gbnVsbDtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICB9XG4gICAgICAvLyBzcGVjaWZpYyBoYW5kbGVyXG4gICAgICB2YXIgY2I7XG4gICAgICB2YXIgaSA9IGNicy5sZW5ndGg7XG4gICAgICB3aGlsZSAoaS0tKSB7XG4gICAgICAgIGNiID0gY2JzW2ldO1xuICAgICAgICBpZiAoY2IgPT09IGZuIHx8IGNiLmZuID09PSBmbikge1xuICAgICAgICAgIG1vZGlmeUxpc3RlbmVyQ291bnQodGhpcywgZXZlbnQsIC0xKTtcbiAgICAgICAgICBjYnMuc3BsaWNlKGksIDEpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogVHJpZ2dlciBhbiBldmVudCBvbiBzZWxmLlxuICAgICAqXG4gICAgICogQHBhcmFtIHtTdHJpbmd8T2JqZWN0fSBldmVudFxuICAgICAqIEByZXR1cm4ge0Jvb2xlYW59IHNob3VsZFByb3BhZ2F0ZVxuICAgICAqL1xuXG4gICAgVnVlLnByb3RvdHlwZS4kZW1pdCA9IGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgdmFyIGlzU291cmNlID0gdHlwZW9mIGV2ZW50ID09PSAnc3RyaW5nJztcbiAgICAgIGV2ZW50ID0gaXNTb3VyY2UgPyBldmVudCA6IGV2ZW50Lm5hbWU7XG4gICAgICB2YXIgY2JzID0gdGhpcy5fZXZlbnRzW2V2ZW50XTtcbiAgICAgIHZhciBzaG91bGRQcm9wYWdhdGUgPSBpc1NvdXJjZSB8fCAhY2JzO1xuICAgICAgaWYgKGNicykge1xuICAgICAgICBjYnMgPSBjYnMubGVuZ3RoID4gMSA/IHRvQXJyYXkoY2JzKSA6IGNicztcbiAgICAgICAgLy8gdGhpcyBpcyBhIHNvbWV3aGF0IGhhY2t5IHNvbHV0aW9uIHRvIHRoZSBxdWVzdGlvbiByYWlzZWRcbiAgICAgICAgLy8gaW4gIzIxMDI6IGZvciBhbiBpbmxpbmUgY29tcG9uZW50IGxpc3RlbmVyIGxpa2UgPGNvbXAgQHRlc3Q9XCJkb1RoaXNcIj4sXG4gICAgICAgIC8vIHRoZSBwcm9wYWdhdGlvbiBoYW5kbGluZyBpcyBzb21ld2hhdCBicm9rZW4uIFRoZXJlZm9yZSB3ZVxuICAgICAgICAvLyBuZWVkIHRvIHRyZWF0IHRoZXNlIGlubGluZSBjYWxsYmFja3MgZGlmZmVyZW50bHkuXG4gICAgICAgIHZhciBoYXNQYXJlbnRDYnMgPSBpc1NvdXJjZSAmJiBjYnMuc29tZShmdW5jdGlvbiAoY2IpIHtcbiAgICAgICAgICByZXR1cm4gY2IuX2Zyb21QYXJlbnQ7XG4gICAgICAgIH0pO1xuICAgICAgICBpZiAoaGFzUGFyZW50Q2JzKSB7XG4gICAgICAgICAgc2hvdWxkUHJvcGFnYXRlID0gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIGFyZ3MgPSB0b0FycmF5KGFyZ3VtZW50cywgMSk7XG4gICAgICAgIGZvciAodmFyIGkgPSAwLCBsID0gY2JzLmxlbmd0aDsgaSA8IGw7IGkrKykge1xuICAgICAgICAgIHZhciBjYiA9IGNic1tpXTtcbiAgICAgICAgICB2YXIgcmVzID0gY2IuYXBwbHkodGhpcywgYXJncyk7XG4gICAgICAgICAgaWYgKHJlcyA9PT0gdHJ1ZSAmJiAoIWhhc1BhcmVudENicyB8fCBjYi5fZnJvbVBhcmVudCkpIHtcbiAgICAgICAgICAgIHNob3VsZFByb3BhZ2F0ZSA9IHRydWU7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gc2hvdWxkUHJvcGFnYXRlO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBSZWN1cnNpdmVseSBicm9hZGNhc3QgYW4gZXZlbnQgdG8gYWxsIGNoaWxkcmVuIGluc3RhbmNlcy5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7U3RyaW5nfE9iamVjdH0gZXZlbnRcbiAgICAgKiBAcGFyYW0gey4uLip9IGFkZGl0aW9uYWwgYXJndW1lbnRzXG4gICAgICovXG5cbiAgICBWdWUucHJvdG90eXBlLiRicm9hZGNhc3QgPSBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgIHZhciBpc1NvdXJjZSA9IHR5cGVvZiBldmVudCA9PT0gJ3N0cmluZyc7XG4gICAgICBldmVudCA9IGlzU291cmNlID8gZXZlbnQgOiBldmVudC5uYW1lO1xuICAgICAgLy8gaWYgbm8gY2hpbGQgaGFzIHJlZ2lzdGVyZWQgZm9yIHRoaXMgZXZlbnQsXG4gICAgICAvLyB0aGVuIHRoZXJlJ3Mgbm8gbmVlZCB0byBicm9hZGNhc3QuXG4gICAgICBpZiAoIXRoaXMuX2V2ZW50c0NvdW50W2V2ZW50XSkgcmV0dXJuO1xuICAgICAgdmFyIGNoaWxkcmVuID0gdGhpcy4kY2hpbGRyZW47XG4gICAgICB2YXIgYXJncyA9IHRvQXJyYXkoYXJndW1lbnRzKTtcbiAgICAgIGlmIChpc1NvdXJjZSkge1xuICAgICAgICAvLyB1c2Ugb2JqZWN0IGV2ZW50IHRvIGluZGljYXRlIG5vbi1zb3VyY2UgZW1pdFxuICAgICAgICAvLyBvbiBjaGlsZHJlblxuICAgICAgICBhcmdzWzBdID0geyBuYW1lOiBldmVudCwgc291cmNlOiB0aGlzIH07XG4gICAgICB9XG4gICAgICBmb3IgKHZhciBpID0gMCwgbCA9IGNoaWxkcmVuLmxlbmd0aDsgaSA8IGw7IGkrKykge1xuICAgICAgICB2YXIgY2hpbGQgPSBjaGlsZHJlbltpXTtcbiAgICAgICAgdmFyIHNob3VsZFByb3BhZ2F0ZSA9IGNoaWxkLiRlbWl0LmFwcGx5KGNoaWxkLCBhcmdzKTtcbiAgICAgICAgaWYgKHNob3VsZFByb3BhZ2F0ZSkge1xuICAgICAgICAgIGNoaWxkLiRicm9hZGNhc3QuYXBwbHkoY2hpbGQsIGFyZ3MpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogUmVjdXJzaXZlbHkgcHJvcGFnYXRlIGFuIGV2ZW50IHVwIHRoZSBwYXJlbnQgY2hhaW4uXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gZXZlbnRcbiAgICAgKiBAcGFyYW0gey4uLip9IGFkZGl0aW9uYWwgYXJndW1lbnRzXG4gICAgICovXG5cbiAgICBWdWUucHJvdG90eXBlLiRkaXNwYXRjaCA9IGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgdmFyIHNob3VsZFByb3BhZ2F0ZSA9IHRoaXMuJGVtaXQuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICAgIGlmICghc2hvdWxkUHJvcGFnYXRlKSByZXR1cm47XG4gICAgICB2YXIgcGFyZW50ID0gdGhpcy4kcGFyZW50O1xuICAgICAgdmFyIGFyZ3MgPSB0b0FycmF5KGFyZ3VtZW50cyk7XG4gICAgICAvLyB1c2Ugb2JqZWN0IGV2ZW50IHRvIGluZGljYXRlIG5vbi1zb3VyY2UgZW1pdFxuICAgICAgLy8gb24gcGFyZW50c1xuICAgICAgYXJnc1swXSA9IHsgbmFtZTogZXZlbnQsIHNvdXJjZTogdGhpcyB9O1xuICAgICAgd2hpbGUgKHBhcmVudCkge1xuICAgICAgICBzaG91bGRQcm9wYWdhdGUgPSBwYXJlbnQuJGVtaXQuYXBwbHkocGFyZW50LCBhcmdzKTtcbiAgICAgICAgcGFyZW50ID0gc2hvdWxkUHJvcGFnYXRlID8gcGFyZW50LiRwYXJlbnQgOiBudWxsO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIE1vZGlmeSB0aGUgbGlzdGVuZXIgY291bnRzIG9uIGFsbCBwYXJlbnRzLlxuICAgICAqIFRoaXMgYm9va2tlZXBpbmcgYWxsb3dzICRicm9hZGNhc3QgdG8gcmV0dXJuIGVhcmx5IHdoZW5cbiAgICAgKiBubyBjaGlsZCBoYXMgbGlzdGVuZWQgdG8gYSBjZXJ0YWluIGV2ZW50LlxuICAgICAqXG4gICAgICogQHBhcmFtIHtWdWV9IHZtXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IGV2ZW50XG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IGNvdW50XG4gICAgICovXG5cbiAgICB2YXIgaG9va1JFID0gL15ob29rOi87XG4gICAgZnVuY3Rpb24gbW9kaWZ5TGlzdGVuZXJDb3VudCh2bSwgZXZlbnQsIGNvdW50KSB7XG4gICAgICB2YXIgcGFyZW50ID0gdm0uJHBhcmVudDtcbiAgICAgIC8vIGhvb2tzIGRvIG5vdCBnZXQgYnJvYWRjYXN0ZWQgc28gbm8gbmVlZFxuICAgICAgLy8gdG8gZG8gYm9va2tlZXBpbmcgZm9yIHRoZW1cbiAgICAgIGlmICghcGFyZW50IHx8ICFjb3VudCB8fCBob29rUkUudGVzdChldmVudCkpIHJldHVybjtcbiAgICAgIHdoaWxlIChwYXJlbnQpIHtcbiAgICAgICAgcGFyZW50Ll9ldmVudHNDb3VudFtldmVudF0gPSAocGFyZW50Ll9ldmVudHNDb3VudFtldmVudF0gfHwgMCkgKyBjb3VudDtcbiAgICAgICAgcGFyZW50ID0gcGFyZW50LiRwYXJlbnQ7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gbGlmZWN5Y2xlQVBJIChWdWUpIHtcbiAgICAvKipcbiAgICAgKiBTZXQgaW5zdGFuY2UgdGFyZ2V0IGVsZW1lbnQgYW5kIGtpY2sgb2ZmIHRoZSBjb21waWxhdGlvblxuICAgICAqIHByb2Nlc3MuIFRoZSBwYXNzZWQgaW4gYGVsYCBjYW4gYmUgYSBzZWxlY3RvciBzdHJpbmcsIGFuXG4gICAgICogZXhpc3RpbmcgRWxlbWVudCwgb3IgYSBEb2N1bWVudEZyYWdtZW50IChmb3IgYmxvY2tcbiAgICAgKiBpbnN0YW5jZXMpLlxuICAgICAqXG4gICAgICogQHBhcmFtIHtFbGVtZW50fERvY3VtZW50RnJhZ21lbnR8c3RyaW5nfSBlbFxuICAgICAqIEBwdWJsaWNcbiAgICAgKi9cblxuICAgIFZ1ZS5wcm90b3R5cGUuJG1vdW50ID0gZnVuY3Rpb24gKGVsKSB7XG4gICAgICBpZiAodGhpcy5faXNDb21waWxlZCkge1xuICAgICAgICAnZGV2ZWxvcG1lbnQnICE9PSAncHJvZHVjdGlvbicgJiYgd2FybignJG1vdW50KCkgc2hvdWxkIGJlIGNhbGxlZCBvbmx5IG9uY2UuJywgdGhpcyk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIGVsID0gcXVlcnkoZWwpO1xuICAgICAgaWYgKCFlbCkge1xuICAgICAgICBlbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgfVxuICAgICAgdGhpcy5fY29tcGlsZShlbCk7XG4gICAgICB0aGlzLl9pbml0RE9NSG9va3MoKTtcbiAgICAgIGlmIChpbkRvYyh0aGlzLiRlbCkpIHtcbiAgICAgICAgdGhpcy5fY2FsbEhvb2soJ2F0dGFjaGVkJyk7XG4gICAgICAgIHJlYWR5LmNhbGwodGhpcyk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLiRvbmNlKCdob29rOmF0dGFjaGVkJywgcmVhZHkpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIE1hcmsgYW4gaW5zdGFuY2UgYXMgcmVhZHkuXG4gICAgICovXG5cbiAgICBmdW5jdGlvbiByZWFkeSgpIHtcbiAgICAgIHRoaXMuX2lzQXR0YWNoZWQgPSB0cnVlO1xuICAgICAgdGhpcy5faXNSZWFkeSA9IHRydWU7XG4gICAgICB0aGlzLl9jYWxsSG9vaygncmVhZHknKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBUZWFyZG93biB0aGUgaW5zdGFuY2UsIHNpbXBseSBkZWxlZ2F0ZSB0byB0aGUgaW50ZXJuYWxcbiAgICAgKiBfZGVzdHJveS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7Qm9vbGVhbn0gcmVtb3ZlXG4gICAgICogQHBhcmFtIHtCb29sZWFufSBkZWZlckNsZWFudXBcbiAgICAgKi9cblxuICAgIFZ1ZS5wcm90b3R5cGUuJGRlc3Ryb3kgPSBmdW5jdGlvbiAocmVtb3ZlLCBkZWZlckNsZWFudXApIHtcbiAgICAgIHRoaXMuX2Rlc3Ryb3kocmVtb3ZlLCBkZWZlckNsZWFudXApO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBQYXJ0aWFsbHkgY29tcGlsZSBhIHBpZWNlIG9mIERPTSBhbmQgcmV0dXJuIGFcbiAgICAgKiBkZWNvbXBpbGUgZnVuY3Rpb24uXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge0VsZW1lbnR8RG9jdW1lbnRGcmFnbWVudH0gZWxcbiAgICAgKiBAcGFyYW0ge1Z1ZX0gW2hvc3RdXG4gICAgICogQHBhcmFtIHtPYmplY3R9IFtzY29wZV1cbiAgICAgKiBAcGFyYW0ge0ZyYWdtZW50fSBbZnJhZ11cbiAgICAgKiBAcmV0dXJuIHtGdW5jdGlvbn1cbiAgICAgKi9cblxuICAgIFZ1ZS5wcm90b3R5cGUuJGNvbXBpbGUgPSBmdW5jdGlvbiAoZWwsIGhvc3QsIHNjb3BlLCBmcmFnKSB7XG4gICAgICByZXR1cm4gY29tcGlsZShlbCwgdGhpcy4kb3B0aW9ucywgdHJ1ZSkodGhpcywgZWwsIGhvc3QsIHNjb3BlLCBmcmFnKTtcbiAgICB9O1xuICB9XG5cbiAgLyoqXG4gICAqIFRoZSBleHBvc2VkIFZ1ZSBjb25zdHJ1Y3Rvci5cbiAgICpcbiAgICogQVBJIGNvbnZlbnRpb25zOlxuICAgKiAtIHB1YmxpYyBBUEkgbWV0aG9kcy9wcm9wZXJ0aWVzIGFyZSBwcmVmaXhlZCB3aXRoIGAkYFxuICAgKiAtIGludGVybmFsIG1ldGhvZHMvcHJvcGVydGllcyBhcmUgcHJlZml4ZWQgd2l0aCBgX2BcbiAgICogLSBub24tcHJlZml4ZWQgcHJvcGVydGllcyBhcmUgYXNzdW1lZCB0byBiZSBwcm94aWVkIHVzZXJcbiAgICogICBkYXRhLlxuICAgKlxuICAgKiBAY29uc3RydWN0b3JcbiAgICogQHBhcmFtIHtPYmplY3R9IFtvcHRpb25zXVxuICAgKiBAcHVibGljXG4gICAqL1xuXG4gIGZ1bmN0aW9uIFZ1ZShvcHRpb25zKSB7XG4gICAgdGhpcy5faW5pdChvcHRpb25zKTtcbiAgfVxuXG4gIC8vIGluc3RhbGwgaW50ZXJuYWxzXG4gIGluaXRNaXhpbihWdWUpO1xuICBzdGF0ZU1peGluKFZ1ZSk7XG4gIGV2ZW50c01peGluKFZ1ZSk7XG4gIGxpZmVjeWNsZU1peGluKFZ1ZSk7XG4gIG1pc2NNaXhpbihWdWUpO1xuXG4gIC8vIGluc3RhbGwgaW5zdGFuY2UgQVBJc1xuICBkYXRhQVBJKFZ1ZSk7XG4gIGRvbUFQSShWdWUpO1xuICBldmVudHNBUEkoVnVlKTtcbiAgbGlmZWN5Y2xlQVBJKFZ1ZSk7XG5cbiAgdmFyIHNsb3QgPSB7XG5cbiAgICBwcmlvcml0eTogU0xPVCxcbiAgICBwYXJhbXM6IFsnbmFtZSddLFxuXG4gICAgYmluZDogZnVuY3Rpb24gYmluZCgpIHtcbiAgICAgIC8vIHRoaXMgd2FzIHJlc29sdmVkIGR1cmluZyBjb21wb25lbnQgdHJhbnNjbHVzaW9uXG4gICAgICB2YXIgbmFtZSA9IHRoaXMucGFyYW1zLm5hbWUgfHwgJ2RlZmF1bHQnO1xuICAgICAgdmFyIGNvbnRlbnQgPSB0aGlzLnZtLl9zbG90Q29udGVudHMgJiYgdGhpcy52bS5fc2xvdENvbnRlbnRzW25hbWVdO1xuICAgICAgaWYgKCFjb250ZW50IHx8ICFjb250ZW50Lmhhc0NoaWxkTm9kZXMoKSkge1xuICAgICAgICB0aGlzLmZhbGxiYWNrKCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLmNvbXBpbGUoY29udGVudC5jbG9uZU5vZGUodHJ1ZSksIHRoaXMudm0uX2NvbnRleHQsIHRoaXMudm0pO1xuICAgICAgfVxuICAgIH0sXG5cbiAgICBjb21waWxlOiBmdW5jdGlvbiBjb21waWxlKGNvbnRlbnQsIGNvbnRleHQsIGhvc3QpIHtcbiAgICAgIGlmIChjb250ZW50ICYmIGNvbnRleHQpIHtcbiAgICAgICAgaWYgKHRoaXMuZWwuaGFzQ2hpbGROb2RlcygpICYmIGNvbnRlbnQuY2hpbGROb2Rlcy5sZW5ndGggPT09IDEgJiYgY29udGVudC5jaGlsZE5vZGVzWzBdLm5vZGVUeXBlID09PSAxICYmIGNvbnRlbnQuY2hpbGROb2Rlc1swXS5oYXNBdHRyaWJ1dGUoJ3YtaWYnKSkge1xuICAgICAgICAgIC8vIGlmIHRoZSBpbnNlcnRlZCBzbG90IGhhcyB2LWlmXG4gICAgICAgICAgLy8gaW5qZWN0IGZhbGxiYWNrIGNvbnRlbnQgYXMgdGhlIHYtZWxzZVxuICAgICAgICAgIHZhciBlbHNlQmxvY2sgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd0ZW1wbGF0ZScpO1xuICAgICAgICAgIGVsc2VCbG9jay5zZXRBdHRyaWJ1dGUoJ3YtZWxzZScsICcnKTtcbiAgICAgICAgICBlbHNlQmxvY2suaW5uZXJIVE1MID0gdGhpcy5lbC5pbm5lckhUTUw7XG4gICAgICAgICAgLy8gdGhlIGVsc2UgYmxvY2sgc2hvdWxkIGJlIGNvbXBpbGVkIGluIGNoaWxkIHNjb3BlXG4gICAgICAgICAgZWxzZUJsb2NrLl9jb250ZXh0ID0gdGhpcy52bTtcbiAgICAgICAgICBjb250ZW50LmFwcGVuZENoaWxkKGVsc2VCbG9jayk7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIHNjb3BlID0gaG9zdCA/IGhvc3QuX3Njb3BlIDogdGhpcy5fc2NvcGU7XG4gICAgICAgIHRoaXMudW5saW5rID0gY29udGV4dC4kY29tcGlsZShjb250ZW50LCBob3N0LCBzY29wZSwgdGhpcy5fZnJhZyk7XG4gICAgICB9XG4gICAgICBpZiAoY29udGVudCkge1xuICAgICAgICByZXBsYWNlKHRoaXMuZWwsIGNvbnRlbnQpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmVtb3ZlKHRoaXMuZWwpO1xuICAgICAgfVxuICAgIH0sXG5cbiAgICBmYWxsYmFjazogZnVuY3Rpb24gZmFsbGJhY2soKSB7XG4gICAgICB0aGlzLmNvbXBpbGUoZXh0cmFjdENvbnRlbnQodGhpcy5lbCwgdHJ1ZSksIHRoaXMudm0pO1xuICAgIH0sXG5cbiAgICB1bmJpbmQ6IGZ1bmN0aW9uIHVuYmluZCgpIHtcbiAgICAgIGlmICh0aGlzLnVubGluaykge1xuICAgICAgICB0aGlzLnVubGluaygpO1xuICAgICAgfVxuICAgIH1cbiAgfTtcblxuICB2YXIgcGFydGlhbCA9IHtcblxuICAgIHByaW9yaXR5OiBQQVJUSUFMLFxuXG4gICAgcGFyYW1zOiBbJ25hbWUnXSxcblxuICAgIC8vIHdhdGNoIGNoYW5nZXMgdG8gbmFtZSBmb3IgZHluYW1pYyBwYXJ0aWFsc1xuICAgIHBhcmFtV2F0Y2hlcnM6IHtcbiAgICAgIG5hbWU6IGZ1bmN0aW9uIG5hbWUodmFsdWUpIHtcbiAgICAgICAgdklmLnJlbW92ZS5jYWxsKHRoaXMpO1xuICAgICAgICBpZiAodmFsdWUpIHtcbiAgICAgICAgICB0aGlzLmluc2VydCh2YWx1ZSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9LFxuXG4gICAgYmluZDogZnVuY3Rpb24gYmluZCgpIHtcbiAgICAgIHRoaXMuYW5jaG9yID0gY3JlYXRlQW5jaG9yKCd2LXBhcnRpYWwnKTtcbiAgICAgIHJlcGxhY2UodGhpcy5lbCwgdGhpcy5hbmNob3IpO1xuICAgICAgdGhpcy5pbnNlcnQodGhpcy5wYXJhbXMubmFtZSk7XG4gICAgfSxcblxuICAgIGluc2VydDogZnVuY3Rpb24gaW5zZXJ0KGlkKSB7XG4gICAgICB2YXIgcGFydGlhbCA9IHJlc29sdmVBc3NldCh0aGlzLnZtLiRvcHRpb25zLCAncGFydGlhbHMnLCBpZCwgdHJ1ZSk7XG4gICAgICBpZiAocGFydGlhbCkge1xuICAgICAgICB0aGlzLmZhY3RvcnkgPSBuZXcgRnJhZ21lbnRGYWN0b3J5KHRoaXMudm0sIHBhcnRpYWwpO1xuICAgICAgICB2SWYuaW5zZXJ0LmNhbGwodGhpcyk7XG4gICAgICB9XG4gICAgfSxcblxuICAgIHVuYmluZDogZnVuY3Rpb24gdW5iaW5kKCkge1xuICAgICAgaWYgKHRoaXMuZnJhZykge1xuICAgICAgICB0aGlzLmZyYWcuZGVzdHJveSgpO1xuICAgICAgfVxuICAgIH1cbiAgfTtcblxuICB2YXIgZWxlbWVudERpcmVjdGl2ZXMgPSB7XG4gICAgc2xvdDogc2xvdCxcbiAgICBwYXJ0aWFsOiBwYXJ0aWFsXG4gIH07XG5cbiAgdmFyIGNvbnZlcnRBcnJheSA9IHZGb3IuX3Bvc3RQcm9jZXNzO1xuXG4gIC8qKlxuICAgKiBMaW1pdCBmaWx0ZXIgZm9yIGFycmF5c1xuICAgKlxuICAgKiBAcGFyYW0ge051bWJlcn0gblxuICAgKiBAcGFyYW0ge051bWJlcn0gb2Zmc2V0IChEZWNpbWFsIGV4cGVjdGVkKVxuICAgKi9cblxuICBmdW5jdGlvbiBsaW1pdEJ5KGFyciwgbiwgb2Zmc2V0KSB7XG4gICAgb2Zmc2V0ID0gb2Zmc2V0ID8gcGFyc2VJbnQob2Zmc2V0LCAxMCkgOiAwO1xuICAgIG4gPSB0b051bWJlcihuKTtcbiAgICByZXR1cm4gdHlwZW9mIG4gPT09ICdudW1iZXInID8gYXJyLnNsaWNlKG9mZnNldCwgb2Zmc2V0ICsgbikgOiBhcnI7XG4gIH1cblxuICAvKipcbiAgICogRmlsdGVyIGZpbHRlciBmb3IgYXJyYXlzXG4gICAqXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBzZWFyY2hcbiAgICogQHBhcmFtIHtTdHJpbmd9IFtkZWxpbWl0ZXJdXG4gICAqIEBwYXJhbSB7U3RyaW5nfSAuLi5kYXRhS2V5c1xuICAgKi9cblxuICBmdW5jdGlvbiBmaWx0ZXJCeShhcnIsIHNlYXJjaCwgZGVsaW1pdGVyKSB7XG4gICAgYXJyID0gY29udmVydEFycmF5KGFycik7XG4gICAgaWYgKHNlYXJjaCA9PSBudWxsKSB7XG4gICAgICByZXR1cm4gYXJyO1xuICAgIH1cbiAgICBpZiAodHlwZW9mIHNlYXJjaCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgcmV0dXJuIGFyci5maWx0ZXIoc2VhcmNoKTtcbiAgICB9XG4gICAgLy8gY2FzdCB0byBsb3dlcmNhc2Ugc3RyaW5nXG4gICAgc2VhcmNoID0gKCcnICsgc2VhcmNoKS50b0xvd2VyQ2FzZSgpO1xuICAgIC8vIGFsbG93IG9wdGlvbmFsIGBpbmAgZGVsaW1pdGVyXG4gICAgLy8gYmVjYXVzZSB3aHkgbm90XG4gICAgdmFyIG4gPSBkZWxpbWl0ZXIgPT09ICdpbicgPyAzIDogMjtcbiAgICAvLyBleHRyYWN0IGFuZCBmbGF0dGVuIGtleXNcbiAgICB2YXIga2V5cyA9IEFycmF5LnByb3RvdHlwZS5jb25jYXQuYXBwbHkoW10sIHRvQXJyYXkoYXJndW1lbnRzLCBuKSk7XG4gICAgdmFyIHJlcyA9IFtdO1xuICAgIHZhciBpdGVtLCBrZXksIHZhbCwgajtcbiAgICBmb3IgKHZhciBpID0gMCwgbCA9IGFyci5sZW5ndGg7IGkgPCBsOyBpKyspIHtcbiAgICAgIGl0ZW0gPSBhcnJbaV07XG4gICAgICB2YWwgPSBpdGVtICYmIGl0ZW0uJHZhbHVlIHx8IGl0ZW07XG4gICAgICBqID0ga2V5cy5sZW5ndGg7XG4gICAgICBpZiAoaikge1xuICAgICAgICB3aGlsZSAoai0tKSB7XG4gICAgICAgICAga2V5ID0ga2V5c1tqXTtcbiAgICAgICAgICBpZiAoa2V5ID09PSAnJGtleScgJiYgY29udGFpbnMoaXRlbS4ka2V5LCBzZWFyY2gpIHx8IGNvbnRhaW5zKGdldFBhdGgodmFsLCBrZXkpLCBzZWFyY2gpKSB7XG4gICAgICAgICAgICByZXMucHVzaChpdGVtKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSBlbHNlIGlmIChjb250YWlucyhpdGVtLCBzZWFyY2gpKSB7XG4gICAgICAgIHJlcy5wdXNoKGl0ZW0pO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gcmVzO1xuICB9XG5cbiAgLyoqXG4gICAqIEZpbHRlciBmaWx0ZXIgZm9yIGFycmF5c1xuICAgKlxuICAgKiBAcGFyYW0ge1N0cmluZ3xBcnJheTxTdHJpbmc+fEZ1bmN0aW9ufSAuLi5zb3J0S2V5c1xuICAgKiBAcGFyYW0ge051bWJlcn0gW29yZGVyXVxuICAgKi9cblxuICBmdW5jdGlvbiBvcmRlckJ5KGFycikge1xuICAgIHZhciBjb21wYXJhdG9yID0gbnVsbDtcbiAgICB2YXIgc29ydEtleXMgPSB1bmRlZmluZWQ7XG4gICAgYXJyID0gY29udmVydEFycmF5KGFycik7XG5cbiAgICAvLyBkZXRlcm1pbmUgb3JkZXIgKGxhc3QgYXJndW1lbnQpXG4gICAgdmFyIGFyZ3MgPSB0b0FycmF5KGFyZ3VtZW50cywgMSk7XG4gICAgdmFyIG9yZGVyID0gYXJnc1thcmdzLmxlbmd0aCAtIDFdO1xuICAgIGlmICh0eXBlb2Ygb3JkZXIgPT09ICdudW1iZXInKSB7XG4gICAgICBvcmRlciA9IG9yZGVyIDwgMCA/IC0xIDogMTtcbiAgICAgIGFyZ3MgPSBhcmdzLmxlbmd0aCA+IDEgPyBhcmdzLnNsaWNlKDAsIC0xKSA6IGFyZ3M7XG4gICAgfSBlbHNlIHtcbiAgICAgIG9yZGVyID0gMTtcbiAgICB9XG5cbiAgICAvLyBkZXRlcm1pbmUgc29ydEtleXMgJiBjb21wYXJhdG9yXG4gICAgdmFyIGZpcnN0QXJnID0gYXJnc1swXTtcbiAgICBpZiAoIWZpcnN0QXJnKSB7XG4gICAgICByZXR1cm4gYXJyO1xuICAgIH0gZWxzZSBpZiAodHlwZW9mIGZpcnN0QXJnID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAvLyBjdXN0b20gY29tcGFyYXRvclxuICAgICAgY29tcGFyYXRvciA9IGZ1bmN0aW9uIChhLCBiKSB7XG4gICAgICAgIHJldHVybiBmaXJzdEFyZyhhLCBiKSAqIG9yZGVyO1xuICAgICAgfTtcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gc3RyaW5nIGtleXMuIGZsYXR0ZW4gZmlyc3RcbiAgICAgIHNvcnRLZXlzID0gQXJyYXkucHJvdG90eXBlLmNvbmNhdC5hcHBseShbXSwgYXJncyk7XG4gICAgICBjb21wYXJhdG9yID0gZnVuY3Rpb24gKGEsIGIsIGkpIHtcbiAgICAgICAgaSA9IGkgfHwgMDtcbiAgICAgICAgcmV0dXJuIGkgPj0gc29ydEtleXMubGVuZ3RoIC0gMSA/IGJhc2VDb21wYXJlKGEsIGIsIGkpIDogYmFzZUNvbXBhcmUoYSwgYiwgaSkgfHwgY29tcGFyYXRvcihhLCBiLCBpICsgMSk7XG4gICAgICB9O1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGJhc2VDb21wYXJlKGEsIGIsIHNvcnRLZXlJbmRleCkge1xuICAgICAgdmFyIHNvcnRLZXkgPSBzb3J0S2V5c1tzb3J0S2V5SW5kZXhdO1xuICAgICAgaWYgKHNvcnRLZXkpIHtcbiAgICAgICAgaWYgKHNvcnRLZXkgIT09ICcka2V5Jykge1xuICAgICAgICAgIGlmIChpc09iamVjdChhKSAmJiAnJHZhbHVlJyBpbiBhKSBhID0gYS4kdmFsdWU7XG4gICAgICAgICAgaWYgKGlzT2JqZWN0KGIpICYmICckdmFsdWUnIGluIGIpIGIgPSBiLiR2YWx1ZTtcbiAgICAgICAgfVxuICAgICAgICBhID0gaXNPYmplY3QoYSkgPyBnZXRQYXRoKGEsIHNvcnRLZXkpIDogYTtcbiAgICAgICAgYiA9IGlzT2JqZWN0KGIpID8gZ2V0UGF0aChiLCBzb3J0S2V5KSA6IGI7XG4gICAgICB9XG4gICAgICByZXR1cm4gYSA9PT0gYiA/IDAgOiBhID4gYiA/IG9yZGVyIDogLW9yZGVyO1xuICAgIH1cblxuICAgIC8vIHNvcnQgb24gYSBjb3B5IHRvIGF2b2lkIG11dGF0aW5nIG9yaWdpbmFsIGFycmF5XG4gICAgcmV0dXJuIGFyci5zbGljZSgpLnNvcnQoY29tcGFyYXRvcik7XG4gIH1cblxuICAvKipcbiAgICogU3RyaW5nIGNvbnRhaW4gaGVscGVyXG4gICAqXG4gICAqIEBwYXJhbSB7Kn0gdmFsXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBzZWFyY2hcbiAgICovXG5cbiAgZnVuY3Rpb24gY29udGFpbnModmFsLCBzZWFyY2gpIHtcbiAgICB2YXIgaTtcbiAgICBpZiAoaXNQbGFpbk9iamVjdCh2YWwpKSB7XG4gICAgICB2YXIga2V5cyA9IE9iamVjdC5rZXlzKHZhbCk7XG4gICAgICBpID0ga2V5cy5sZW5ndGg7XG4gICAgICB3aGlsZSAoaS0tKSB7XG4gICAgICAgIGlmIChjb250YWlucyh2YWxba2V5c1tpXV0sIHNlYXJjaCkpIHtcbiAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0gZWxzZSBpZiAoaXNBcnJheSh2YWwpKSB7XG4gICAgICBpID0gdmFsLmxlbmd0aDtcbiAgICAgIHdoaWxlIChpLS0pIHtcbiAgICAgICAgaWYgKGNvbnRhaW5zKHZhbFtpXSwgc2VhcmNoKSkge1xuICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSBlbHNlIGlmICh2YWwgIT0gbnVsbCkge1xuICAgICAgcmV0dXJuIHZhbC50b1N0cmluZygpLnRvTG93ZXJDYXNlKCkuaW5kZXhPZihzZWFyY2gpID4gLTE7XG4gICAgfVxuICB9XG5cbiAgdmFyIGRpZ2l0c1JFID0gLyhcXGR7M30pKD89XFxkKS9nO1xuXG4gIC8vIGFzc2V0IGNvbGxlY3Rpb25zIG11c3QgYmUgYSBwbGFpbiBvYmplY3QuXG4gIHZhciBmaWx0ZXJzID0ge1xuXG4gICAgb3JkZXJCeTogb3JkZXJCeSxcbiAgICBmaWx0ZXJCeTogZmlsdGVyQnksXG4gICAgbGltaXRCeTogbGltaXRCeSxcblxuICAgIC8qKlxuICAgICAqIFN0cmluZ2lmeSB2YWx1ZS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSBpbmRlbnRcbiAgICAgKi9cblxuICAgIGpzb246IHtcbiAgICAgIHJlYWQ6IGZ1bmN0aW9uIHJlYWQodmFsdWUsIGluZGVudCkge1xuICAgICAgICByZXR1cm4gdHlwZW9mIHZhbHVlID09PSAnc3RyaW5nJyA/IHZhbHVlIDogSlNPTi5zdHJpbmdpZnkodmFsdWUsIG51bGwsIE51bWJlcihpbmRlbnQpIHx8IDIpO1xuICAgICAgfSxcbiAgICAgIHdyaXRlOiBmdW5jdGlvbiB3cml0ZSh2YWx1ZSkge1xuICAgICAgICB0cnkge1xuICAgICAgICAgIHJldHVybiBKU09OLnBhcnNlKHZhbHVlKTtcbiAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiAnYWJjJyA9PiAnQWJjJ1xuICAgICAqL1xuXG4gICAgY2FwaXRhbGl6ZTogZnVuY3Rpb24gY2FwaXRhbGl6ZSh2YWx1ZSkge1xuICAgICAgaWYgKCF2YWx1ZSAmJiB2YWx1ZSAhPT0gMCkgcmV0dXJuICcnO1xuICAgICAgdmFsdWUgPSB2YWx1ZS50b1N0cmluZygpO1xuICAgICAgcmV0dXJuIHZhbHVlLmNoYXJBdCgwKS50b1VwcGVyQ2FzZSgpICsgdmFsdWUuc2xpY2UoMSk7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqICdhYmMnID0+ICdBQkMnXG4gICAgICovXG5cbiAgICB1cHBlcmNhc2U6IGZ1bmN0aW9uIHVwcGVyY2FzZSh2YWx1ZSkge1xuICAgICAgcmV0dXJuIHZhbHVlIHx8IHZhbHVlID09PSAwID8gdmFsdWUudG9TdHJpbmcoKS50b1VwcGVyQ2FzZSgpIDogJyc7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqICdBYkMnID0+ICdhYmMnXG4gICAgICovXG5cbiAgICBsb3dlcmNhc2U6IGZ1bmN0aW9uIGxvd2VyY2FzZSh2YWx1ZSkge1xuICAgICAgcmV0dXJuIHZhbHVlIHx8IHZhbHVlID09PSAwID8gdmFsdWUudG9TdHJpbmcoKS50b0xvd2VyQ2FzZSgpIDogJyc7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIDEyMzQ1ID0+ICQxMiwzNDUuMDBcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBzaWduXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IGRlY2ltYWxzIERlY2ltYWwgcGxhY2VzXG4gICAgICovXG5cbiAgICBjdXJyZW5jeTogZnVuY3Rpb24gY3VycmVuY3kodmFsdWUsIF9jdXJyZW5jeSwgZGVjaW1hbHMpIHtcbiAgICAgIHZhbHVlID0gcGFyc2VGbG9hdCh2YWx1ZSk7XG4gICAgICBpZiAoIWlzRmluaXRlKHZhbHVlKSB8fCAhdmFsdWUgJiYgdmFsdWUgIT09IDApIHJldHVybiAnJztcbiAgICAgIF9jdXJyZW5jeSA9IF9jdXJyZW5jeSAhPSBudWxsID8gX2N1cnJlbmN5IDogJyQnO1xuICAgICAgZGVjaW1hbHMgPSBkZWNpbWFscyAhPSBudWxsID8gZGVjaW1hbHMgOiAyO1xuICAgICAgdmFyIHN0cmluZ2lmaWVkID0gTWF0aC5hYnModmFsdWUpLnRvRml4ZWQoZGVjaW1hbHMpO1xuICAgICAgdmFyIF9pbnQgPSBkZWNpbWFscyA/IHN0cmluZ2lmaWVkLnNsaWNlKDAsIC0xIC0gZGVjaW1hbHMpIDogc3RyaW5naWZpZWQ7XG4gICAgICB2YXIgaSA9IF9pbnQubGVuZ3RoICUgMztcbiAgICAgIHZhciBoZWFkID0gaSA+IDAgPyBfaW50LnNsaWNlKDAsIGkpICsgKF9pbnQubGVuZ3RoID4gMyA/ICcsJyA6ICcnKSA6ICcnO1xuICAgICAgdmFyIF9mbG9hdCA9IGRlY2ltYWxzID8gc3RyaW5naWZpZWQuc2xpY2UoLTEgLSBkZWNpbWFscykgOiAnJztcbiAgICAgIHZhciBzaWduID0gdmFsdWUgPCAwID8gJy0nIDogJyc7XG4gICAgICByZXR1cm4gc2lnbiArIF9jdXJyZW5jeSArIGhlYWQgKyBfaW50LnNsaWNlKGkpLnJlcGxhY2UoZGlnaXRzUkUsICckMSwnKSArIF9mbG9hdDtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogJ2l0ZW0nID0+ICdpdGVtcydcbiAgICAgKlxuICAgICAqIEBwYXJhbXNcbiAgICAgKiAgYW4gYXJyYXkgb2Ygc3RyaW5ncyBjb3JyZXNwb25kaW5nIHRvXG4gICAgICogIHRoZSBzaW5nbGUsIGRvdWJsZSwgdHJpcGxlIC4uLiBmb3JtcyBvZiB0aGUgd29yZCB0b1xuICAgICAqICBiZSBwbHVyYWxpemVkLiBXaGVuIHRoZSBudW1iZXIgdG8gYmUgcGx1cmFsaXplZFxuICAgICAqICBleGNlZWRzIHRoZSBsZW5ndGggb2YgdGhlIGFyZ3MsIGl0IHdpbGwgdXNlIHRoZSBsYXN0XG4gICAgICogIGVudHJ5IGluIHRoZSBhcnJheS5cbiAgICAgKlxuICAgICAqICBlLmcuIFsnc2luZ2xlJywgJ2RvdWJsZScsICd0cmlwbGUnLCAnbXVsdGlwbGUnXVxuICAgICAqL1xuXG4gICAgcGx1cmFsaXplOiBmdW5jdGlvbiBwbHVyYWxpemUodmFsdWUpIHtcbiAgICAgIHZhciBhcmdzID0gdG9BcnJheShhcmd1bWVudHMsIDEpO1xuICAgICAgcmV0dXJuIGFyZ3MubGVuZ3RoID4gMSA/IGFyZ3NbdmFsdWUgJSAxMCAtIDFdIHx8IGFyZ3NbYXJncy5sZW5ndGggLSAxXSA6IGFyZ3NbMF0gKyAodmFsdWUgPT09IDEgPyAnJyA6ICdzJyk7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIERlYm91bmNlIGEgaGFuZGxlciBmdW5jdGlvbi5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IGhhbmRsZXJcbiAgICAgKiBAcGFyYW0ge051bWJlcn0gZGVsYXkgPSAzMDBcbiAgICAgKiBAcmV0dXJuIHtGdW5jdGlvbn1cbiAgICAgKi9cblxuICAgIGRlYm91bmNlOiBmdW5jdGlvbiBkZWJvdW5jZShoYW5kbGVyLCBkZWxheSkge1xuICAgICAgaWYgKCFoYW5kbGVyKSByZXR1cm47XG4gICAgICBpZiAoIWRlbGF5KSB7XG4gICAgICAgIGRlbGF5ID0gMzAwO1xuICAgICAgfVxuICAgICAgcmV0dXJuIF9kZWJvdW5jZShoYW5kbGVyLCBkZWxheSk7XG4gICAgfVxuICB9O1xuXG4gIGZ1bmN0aW9uIGluc3RhbGxHbG9iYWxBUEkgKFZ1ZSkge1xuICAgIC8qKlxuICAgICAqIFZ1ZSBhbmQgZXZlcnkgY29uc3RydWN0b3IgdGhhdCBleHRlbmRzIFZ1ZSBoYXMgYW5cbiAgICAgKiBhc3NvY2lhdGVkIG9wdGlvbnMgb2JqZWN0LCB3aGljaCBjYW4gYmUgYWNjZXNzZWQgZHVyaW5nXG4gICAgICogY29tcGlsYXRpb24gc3RlcHMgYXMgYHRoaXMuY29uc3RydWN0b3Iub3B0aW9uc2AuXG4gICAgICpcbiAgICAgKiBUaGVzZSBjYW4gYmUgc2VlbiBhcyB0aGUgZGVmYXVsdCBvcHRpb25zIG9mIGV2ZXJ5XG4gICAgICogVnVlIGluc3RhbmNlLlxuICAgICAqL1xuXG4gICAgVnVlLm9wdGlvbnMgPSB7XG4gICAgICBkaXJlY3RpdmVzOiBkaXJlY3RpdmVzLFxuICAgICAgZWxlbWVudERpcmVjdGl2ZXM6IGVsZW1lbnREaXJlY3RpdmVzLFxuICAgICAgZmlsdGVyczogZmlsdGVycyxcbiAgICAgIHRyYW5zaXRpb25zOiB7fSxcbiAgICAgIGNvbXBvbmVudHM6IHt9LFxuICAgICAgcGFydGlhbHM6IHt9LFxuICAgICAgcmVwbGFjZTogdHJ1ZVxuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBFeHBvc2UgdXNlZnVsIGludGVybmFsc1xuICAgICAqL1xuXG4gICAgVnVlLnV0aWwgPSB1dGlsO1xuICAgIFZ1ZS5jb25maWcgPSBjb25maWc7XG4gICAgVnVlLnNldCA9IHNldDtcbiAgICBWdWVbJ2RlbGV0ZSddID0gZGVsO1xuICAgIFZ1ZS5uZXh0VGljayA9IG5leHRUaWNrO1xuXG4gICAgLyoqXG4gICAgICogVGhlIGZvbGxvd2luZyBhcmUgZXhwb3NlZCBmb3IgYWR2YW5jZWQgdXNhZ2UgLyBwbHVnaW5zXG4gICAgICovXG5cbiAgICBWdWUuY29tcGlsZXIgPSBjb21waWxlcjtcbiAgICBWdWUuRnJhZ21lbnRGYWN0b3J5ID0gRnJhZ21lbnRGYWN0b3J5O1xuICAgIFZ1ZS5pbnRlcm5hbERpcmVjdGl2ZXMgPSBpbnRlcm5hbERpcmVjdGl2ZXM7XG4gICAgVnVlLnBhcnNlcnMgPSB7XG4gICAgICBwYXRoOiBwYXRoLFxuICAgICAgdGV4dDogdGV4dCxcbiAgICAgIHRlbXBsYXRlOiB0ZW1wbGF0ZSxcbiAgICAgIGRpcmVjdGl2ZTogZGlyZWN0aXZlLFxuICAgICAgZXhwcmVzc2lvbjogZXhwcmVzc2lvblxuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBFYWNoIGluc3RhbmNlIGNvbnN0cnVjdG9yLCBpbmNsdWRpbmcgVnVlLCBoYXMgYSB1bmlxdWVcbiAgICAgKiBjaWQuIFRoaXMgZW5hYmxlcyB1cyB0byBjcmVhdGUgd3JhcHBlZCBcImNoaWxkXG4gICAgICogY29uc3RydWN0b3JzXCIgZm9yIHByb3RvdHlwYWwgaW5oZXJpdGFuY2UgYW5kIGNhY2hlIHRoZW0uXG4gICAgICovXG5cbiAgICBWdWUuY2lkID0gMDtcbiAgICB2YXIgY2lkID0gMTtcblxuICAgIC8qKlxuICAgICAqIENsYXNzIGluaGVyaXRhbmNlXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gZXh0ZW5kT3B0aW9uc1xuICAgICAqL1xuXG4gICAgVnVlLmV4dGVuZCA9IGZ1bmN0aW9uIChleHRlbmRPcHRpb25zKSB7XG4gICAgICBleHRlbmRPcHRpb25zID0gZXh0ZW5kT3B0aW9ucyB8fCB7fTtcbiAgICAgIHZhciBTdXBlciA9IHRoaXM7XG4gICAgICB2YXIgaXNGaXJzdEV4dGVuZCA9IFN1cGVyLmNpZCA9PT0gMDtcbiAgICAgIGlmIChpc0ZpcnN0RXh0ZW5kICYmIGV4dGVuZE9wdGlvbnMuX0N0b3IpIHtcbiAgICAgICAgcmV0dXJuIGV4dGVuZE9wdGlvbnMuX0N0b3I7XG4gICAgICB9XG4gICAgICB2YXIgbmFtZSA9IGV4dGVuZE9wdGlvbnMubmFtZSB8fCBTdXBlci5vcHRpb25zLm5hbWU7XG4gICAgICBpZiAoJ2RldmVsb3BtZW50JyAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgICAgIGlmICghL15bYS16QS1aXVtcXHctXSokLy50ZXN0KG5hbWUpKSB7XG4gICAgICAgICAgd2FybignSW52YWxpZCBjb21wb25lbnQgbmFtZTogXCInICsgbmFtZSArICdcIi4gQ29tcG9uZW50IG5hbWVzICcgKyAnY2FuIG9ubHkgY29udGFpbiBhbHBoYW51bWVyaWMgY2hhcmFjYXRlcnMgYW5kIHRoZSBoeXBoZW4uJyk7XG4gICAgICAgICAgbmFtZSA9IG51bGw7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHZhciBTdWIgPSBjcmVhdGVDbGFzcyhuYW1lIHx8ICdWdWVDb21wb25lbnQnKTtcbiAgICAgIFN1Yi5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKFN1cGVyLnByb3RvdHlwZSk7XG4gICAgICBTdWIucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gU3ViO1xuICAgICAgU3ViLmNpZCA9IGNpZCsrO1xuICAgICAgU3ViLm9wdGlvbnMgPSBtZXJnZU9wdGlvbnMoU3VwZXIub3B0aW9ucywgZXh0ZW5kT3B0aW9ucyk7XG4gICAgICBTdWJbJ3N1cGVyJ10gPSBTdXBlcjtcbiAgICAgIC8vIGFsbG93IGZ1cnRoZXIgZXh0ZW5zaW9uXG4gICAgICBTdWIuZXh0ZW5kID0gU3VwZXIuZXh0ZW5kO1xuICAgICAgLy8gY3JlYXRlIGFzc2V0IHJlZ2lzdGVycywgc28gZXh0ZW5kZWQgY2xhc3Nlc1xuICAgICAgLy8gY2FuIGhhdmUgdGhlaXIgcHJpdmF0ZSBhc3NldHMgdG9vLlxuICAgICAgY29uZmlnLl9hc3NldFR5cGVzLmZvckVhY2goZnVuY3Rpb24gKHR5cGUpIHtcbiAgICAgICAgU3ViW3R5cGVdID0gU3VwZXJbdHlwZV07XG4gICAgICB9KTtcbiAgICAgIC8vIGVuYWJsZSByZWN1cnNpdmUgc2VsZi1sb29rdXBcbiAgICAgIGlmIChuYW1lKSB7XG4gICAgICAgIFN1Yi5vcHRpb25zLmNvbXBvbmVudHNbbmFtZV0gPSBTdWI7XG4gICAgICB9XG4gICAgICAvLyBjYWNoZSBjb25zdHJ1Y3RvclxuICAgICAgaWYgKGlzRmlyc3RFeHRlbmQpIHtcbiAgICAgICAgZXh0ZW5kT3B0aW9ucy5fQ3RvciA9IFN1YjtcbiAgICAgIH1cbiAgICAgIHJldHVybiBTdWI7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIEEgZnVuY3Rpb24gdGhhdCByZXR1cm5zIGEgc3ViLWNsYXNzIGNvbnN0cnVjdG9yIHdpdGggdGhlXG4gICAgICogZ2l2ZW4gbmFtZS4gVGhpcyBnaXZlcyB1cyBtdWNoIG5pY2VyIG91dHB1dCB3aGVuXG4gICAgICogbG9nZ2luZyBpbnN0YW5jZXMgaW4gdGhlIGNvbnNvbGUuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gbmFtZVxuICAgICAqIEByZXR1cm4ge0Z1bmN0aW9ufVxuICAgICAqL1xuXG4gICAgZnVuY3Rpb24gY3JlYXRlQ2xhc3MobmFtZSkge1xuICAgICAgLyogZXNsaW50LWRpc2FibGUgbm8tbmV3LWZ1bmMgKi9cbiAgICAgIHJldHVybiBuZXcgRnVuY3Rpb24oJ3JldHVybiBmdW5jdGlvbiAnICsgY2xhc3NpZnkobmFtZSkgKyAnIChvcHRpb25zKSB7IHRoaXMuX2luaXQob3B0aW9ucykgfScpKCk7XG4gICAgICAvKiBlc2xpbnQtZW5hYmxlIG5vLW5ldy1mdW5jICovXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUGx1Z2luIHN5c3RlbVxuICAgICAqXG4gICAgICogQHBhcmFtIHtPYmplY3R9IHBsdWdpblxuICAgICAqL1xuXG4gICAgVnVlLnVzZSA9IGZ1bmN0aW9uIChwbHVnaW4pIHtcbiAgICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBpZiAqL1xuICAgICAgaWYgKHBsdWdpbi5pbnN0YWxsZWQpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgLy8gYWRkaXRpb25hbCBwYXJhbWV0ZXJzXG4gICAgICB2YXIgYXJncyA9IHRvQXJyYXkoYXJndW1lbnRzLCAxKTtcbiAgICAgIGFyZ3MudW5zaGlmdCh0aGlzKTtcbiAgICAgIGlmICh0eXBlb2YgcGx1Z2luLmluc3RhbGwgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgcGx1Z2luLmluc3RhbGwuYXBwbHkocGx1Z2luLCBhcmdzKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHBsdWdpbi5hcHBseShudWxsLCBhcmdzKTtcbiAgICAgIH1cbiAgICAgIHBsdWdpbi5pbnN0YWxsZWQgPSB0cnVlO1xuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIEFwcGx5IGEgZ2xvYmFsIG1peGluIGJ5IG1lcmdpbmcgaXQgaW50byB0aGUgZGVmYXVsdFxuICAgICAqIG9wdGlvbnMuXG4gICAgICovXG5cbiAgICBWdWUubWl4aW4gPSBmdW5jdGlvbiAobWl4aW4pIHtcbiAgICAgIFZ1ZS5vcHRpb25zID0gbWVyZ2VPcHRpb25zKFZ1ZS5vcHRpb25zLCBtaXhpbik7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIENyZWF0ZSBhc3NldCByZWdpc3RyYXRpb24gbWV0aG9kcyB3aXRoIHRoZSBmb2xsb3dpbmdcbiAgICAgKiBzaWduYXR1cmU6XG4gICAgICpcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gaWRcbiAgICAgKiBAcGFyYW0geyp9IGRlZmluaXRpb25cbiAgICAgKi9cblxuICAgIGNvbmZpZy5fYXNzZXRUeXBlcy5mb3JFYWNoKGZ1bmN0aW9uICh0eXBlKSB7XG4gICAgICBWdWVbdHlwZV0gPSBmdW5jdGlvbiAoaWQsIGRlZmluaXRpb24pIHtcbiAgICAgICAgaWYgKCFkZWZpbml0aW9uKSB7XG4gICAgICAgICAgcmV0dXJuIHRoaXMub3B0aW9uc1t0eXBlICsgJ3MnXVtpZF07XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgLyogaXN0YW5idWwgaWdub3JlIGlmICovXG4gICAgICAgICAgaWYgKCdkZXZlbG9wbWVudCcgIT09ICdwcm9kdWN0aW9uJykge1xuICAgICAgICAgICAgaWYgKHR5cGUgPT09ICdjb21wb25lbnQnICYmIChjb21tb25UYWdSRS50ZXN0KGlkKSB8fCByZXNlcnZlZFRhZ1JFLnRlc3QoaWQpKSkge1xuICAgICAgICAgICAgICB3YXJuKCdEbyBub3QgdXNlIGJ1aWx0LWluIG9yIHJlc2VydmVkIEhUTUwgZWxlbWVudHMgYXMgY29tcG9uZW50ICcgKyAnaWQ6ICcgKyBpZCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmICh0eXBlID09PSAnY29tcG9uZW50JyAmJiBpc1BsYWluT2JqZWN0KGRlZmluaXRpb24pKSB7XG4gICAgICAgICAgICBkZWZpbml0aW9uLm5hbWUgPSBpZDtcbiAgICAgICAgICAgIGRlZmluaXRpb24gPSBWdWUuZXh0ZW5kKGRlZmluaXRpb24pO1xuICAgICAgICAgIH1cbiAgICAgICAgICB0aGlzLm9wdGlvbnNbdHlwZSArICdzJ11baWRdID0gZGVmaW5pdGlvbjtcbiAgICAgICAgICByZXR1cm4gZGVmaW5pdGlvbjtcbiAgICAgICAgfVxuICAgICAgfTtcbiAgICB9KTtcblxuICAgIC8vIGV4cG9zZSBpbnRlcm5hbCB0cmFuc2l0aW9uIEFQSVxuICAgIGV4dGVuZChWdWUudHJhbnNpdGlvbiwgdHJhbnNpdGlvbik7XG4gIH1cblxuICBpbnN0YWxsR2xvYmFsQVBJKFZ1ZSk7XG5cbiAgVnVlLnZlcnNpb24gPSAnMS4wLjI0JztcblxuICAvLyBkZXZ0b29scyBnbG9iYWwgaG9va1xuICAvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xuICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICBpZiAoY29uZmlnLmRldnRvb2xzKSB7XG4gICAgICBpZiAoZGV2dG9vbHMpIHtcbiAgICAgICAgZGV2dG9vbHMuZW1pdCgnaW5pdCcsIFZ1ZSk7XG4gICAgICB9IGVsc2UgaWYgKCdkZXZlbG9wbWVudCcgIT09ICdwcm9kdWN0aW9uJyAmJiBpbkJyb3dzZXIgJiYgL0Nocm9tZVxcL1xcZCsvLnRlc3Qod2luZG93Lm5hdmlnYXRvci51c2VyQWdlbnQpKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdEb3dubG9hZCB0aGUgVnVlIERldnRvb2xzIGZvciBhIGJldHRlciBkZXZlbG9wbWVudCBleHBlcmllbmNlOlxcbicgKyAnaHR0cHM6Ly9naXRodWIuY29tL3Z1ZWpzL3Z1ZS1kZXZ0b29scycpO1xuICAgICAgfVxuICAgIH1cbiAgfSwgMCk7XG5cbiAgcmV0dXJuIFZ1ZTtcblxufSkpO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9kZXAvVnVlLmpzXG4gKiogbW9kdWxlIGlkID0gMlxuICoqIG1vZHVsZSBjaHVua3MgPSAwIDEgMiAzIDRcbiAqKi8iXSwic291cmNlUm9vdCI6IiJ9