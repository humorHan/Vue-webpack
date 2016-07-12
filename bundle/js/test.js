webpackJsonp([4,5],[
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(16);


/***/ },
/* 1 */,
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

/***/ },
/* 3 */,
/* 4 */,
/* 5 */,
/* 6 */
/***/ function(module, exports) {

	/*!
	 * vue-resource v0.9.3
	 * https://github.com/vuejs/vue-resource
	 * Released under the MIT License.
	 */
	
	'use strict';
	
	/**
	 * Promises/A+ polyfill v1.1.4 (https://github.com/bramstein/promis)
	 */
	
	var RESOLVED = 0;
	var REJECTED = 1;
	var PENDING = 2;
	
	function Promise$2(executor) {
	
	    this.state = PENDING;
	    this.value = undefined;
	    this.deferred = [];
	
	    var promise = this;
	
	    try {
	        executor(function (x) {
	            promise.resolve(x);
	        }, function (r) {
	            promise.reject(r);
	        });
	    } catch (e) {
	        promise.reject(e);
	    }
	}
	
	Promise$2.reject = function (r) {
	    return new Promise$2(function (resolve, reject) {
	        reject(r);
	    });
	};
	
	Promise$2.resolve = function (x) {
	    return new Promise$2(function (resolve, reject) {
	        resolve(x);
	    });
	};
	
	Promise$2.all = function all(iterable) {
	    return new Promise$2(function (resolve, reject) {
	        var count = 0,
	            result = [];
	
	        if (iterable.length === 0) {
	            resolve(result);
	        }
	
	        function resolver(i) {
	            return function (x) {
	                result[i] = x;
	                count += 1;
	
	                if (count === iterable.length) {
	                    resolve(result);
	                }
	            };
	        }
	
	        for (var i = 0; i < iterable.length; i += 1) {
	            Promise$2.resolve(iterable[i]).then(resolver(i), reject);
	        }
	    });
	};
	
	Promise$2.race = function race(iterable) {
	    return new Promise$2(function (resolve, reject) {
	        for (var i = 0; i < iterable.length; i += 1) {
	            Promise$2.resolve(iterable[i]).then(resolve, reject);
	        }
	    });
	};
	
	var p$1 = Promise$2.prototype;
	
	p$1.resolve = function resolve(x) {
	    var promise = this;
	
	    if (promise.state === PENDING) {
	        if (x === promise) {
	            throw new TypeError('Promise settled with itself.');
	        }
	
	        var called = false;
	
	        try {
	            var then = x && x['then'];
	
	            if (x !== null && typeof x === 'object' && typeof then === 'function') {
	                then.call(x, function (x) {
	                    if (!called) {
	                        promise.resolve(x);
	                    }
	                    called = true;
	                }, function (r) {
	                    if (!called) {
	                        promise.reject(r);
	                    }
	                    called = true;
	                });
	                return;
	            }
	        } catch (e) {
	            if (!called) {
	                promise.reject(e);
	            }
	            return;
	        }
	
	        promise.state = RESOLVED;
	        promise.value = x;
	        promise.notify();
	    }
	};
	
	p$1.reject = function reject(reason) {
	    var promise = this;
	
	    if (promise.state === PENDING) {
	        if (reason === promise) {
	            throw new TypeError('Promise settled with itself.');
	        }
	
	        promise.state = REJECTED;
	        promise.value = reason;
	        promise.notify();
	    }
	};
	
	p$1.notify = function notify() {
	    var promise = this;
	
	    nextTick(function () {
	        if (promise.state !== PENDING) {
	            while (promise.deferred.length) {
	                var deferred = promise.deferred.shift(),
	                    onResolved = deferred[0],
	                    onRejected = deferred[1],
	                    resolve = deferred[2],
	                    reject = deferred[3];
	
	                try {
	                    if (promise.state === RESOLVED) {
	                        if (typeof onResolved === 'function') {
	                            resolve(onResolved.call(undefined, promise.value));
	                        } else {
	                            resolve(promise.value);
	                        }
	                    } else if (promise.state === REJECTED) {
	                        if (typeof onRejected === 'function') {
	                            resolve(onRejected.call(undefined, promise.value));
	                        } else {
	                            reject(promise.value);
	                        }
	                    }
	                } catch (e) {
	                    reject(e);
	                }
	            }
	        }
	    });
	};
	
	p$1.then = function then(onResolved, onRejected) {
	    var promise = this;
	
	    return new Promise$2(function (resolve, reject) {
	        promise.deferred.push([onResolved, onRejected, resolve, reject]);
	        promise.notify();
	    });
	};
	
	p$1.catch = function (onRejected) {
	    return this.then(undefined, onRejected);
	};
	
	var PromiseObj = window.Promise || Promise$2;
	
	function Promise$1(executor, context) {
	
	    if (executor instanceof PromiseObj) {
	        this.promise = executor;
	    } else {
	        this.promise = new PromiseObj(executor.bind(context));
	    }
	
	    this.context = context;
	}
	
	Promise$1.all = function (iterable, context) {
	    return new Promise$1(PromiseObj.all(iterable), context);
	};
	
	Promise$1.resolve = function (value, context) {
	    return new Promise$1(PromiseObj.resolve(value), context);
	};
	
	Promise$1.reject = function (reason, context) {
	    return new Promise$1(PromiseObj.reject(reason), context);
	};
	
	Promise$1.race = function (iterable, context) {
	    return new Promise$1(PromiseObj.race(iterable), context);
	};
	
	var p = Promise$1.prototype;
	
	p.bind = function (context) {
	    this.context = context;
	    return this;
	};
	
	p.then = function (fulfilled, rejected) {
	
	    if (fulfilled && fulfilled.bind && this.context) {
	        fulfilled = fulfilled.bind(this.context);
	    }
	
	    if (rejected && rejected.bind && this.context) {
	        rejected = rejected.bind(this.context);
	    }
	
	    return new Promise$1(this.promise.then(fulfilled, rejected), this.context);
	};
	
	p.catch = function (rejected) {
	
	    if (rejected && rejected.bind && this.context) {
	        rejected = rejected.bind(this.context);
	    }
	
	    return new Promise$1(this.promise.catch(rejected), this.context);
	};
	
	p.finally = function (callback) {
	
	    return this.then(function (value) {
	        callback.call(this);
	        return value;
	    }, function (reason) {
	        callback.call(this);
	        return PromiseObj.reject(reason);
	    });
	};
	
	var debug = false;
	var util = {};
	var array = [];
	function Util (Vue) {
	    util = Vue.util;
	    debug = Vue.config.debug || !Vue.config.silent;
	}
	
	function warn(msg) {
	    if (typeof console !== 'undefined' && debug) {
	        console.warn('[VueResource warn]: ' + msg);
	    }
	}
	
	function error(msg) {
	    if (typeof console !== 'undefined') {
	        console.error(msg);
	    }
	}
	
	function nextTick(cb, ctx) {
	    return util.nextTick(cb, ctx);
	}
	
	function trim(str) {
	    return str.replace(/^\s*|\s*$/g, '');
	}
	
	var isArray = Array.isArray;
	
	function isString(val) {
	    return typeof val === 'string';
	}
	
	function isBoolean(val) {
	    return val === true || val === false;
	}
	
	function isFunction(val) {
	    return typeof val === 'function';
	}
	
	function isObject(obj) {
	    return obj !== null && typeof obj === 'object';
	}
	
	function isPlainObject(obj) {
	    return isObject(obj) && Object.getPrototypeOf(obj) == Object.prototype;
	}
	
	function isFormData(obj) {
	    return typeof FormData !== 'undefined' && obj instanceof FormData;
	}
	
	function when(value, fulfilled, rejected) {
	
	    var promise = Promise$1.resolve(value);
	
	    if (arguments.length < 2) {
	        return promise;
	    }
	
	    return promise.then(fulfilled, rejected);
	}
	
	function options(fn, obj, opts) {
	
	    opts = opts || {};
	
	    if (isFunction(opts)) {
	        opts = opts.call(obj);
	    }
	
	    return merge(fn.bind({ $vm: obj, $options: opts }), fn, { $options: opts });
	}
	
	function each(obj, iterator) {
	
	    var i, key;
	
	    if (typeof obj.length == 'number') {
	        for (i = 0; i < obj.length; i++) {
	            iterator.call(obj[i], obj[i], i);
	        }
	    } else if (isObject(obj)) {
	        for (key in obj) {
	            if (obj.hasOwnProperty(key)) {
	                iterator.call(obj[key], obj[key], key);
	            }
	        }
	    }
	
	    return obj;
	}
	
	var assign = Object.assign || _assign;
	
	function merge(target) {
	
	    var args = array.slice.call(arguments, 1);
	
	    args.forEach(function (source) {
	        _merge(target, source, true);
	    });
	
	    return target;
	}
	
	function defaults(target) {
	
	    var args = array.slice.call(arguments, 1);
	
	    args.forEach(function (source) {
	
	        for (var key in source) {
	            if (target[key] === undefined) {
	                target[key] = source[key];
	            }
	        }
	    });
	
	    return target;
	}
	
	function _assign(target) {
	
	    var args = array.slice.call(arguments, 1);
	
	    args.forEach(function (source) {
	        _merge(target, source);
	    });
	
	    return target;
	}
	
	function _merge(target, source, deep) {
	    for (var key in source) {
	        if (deep && (isPlainObject(source[key]) || isArray(source[key]))) {
	            if (isPlainObject(source[key]) && !isPlainObject(target[key])) {
	                target[key] = {};
	            }
	            if (isArray(source[key]) && !isArray(target[key])) {
	                target[key] = [];
	            }
	            _merge(target[key], source[key], deep);
	        } else if (source[key] !== undefined) {
	            target[key] = source[key];
	        }
	    }
	}
	
	function root (options, next) {
	
	    var url = next(options);
	
	    if (isString(options.root) && !url.match(/^(https?:)?\//)) {
	        url = options.root + '/' + url;
	    }
	
	    return url;
	}
	
	function query (options, next) {
	
	    var urlParams = Object.keys(Url.options.params),
	        query = {},
	        url = next(options);
	
	    each(options.params, function (value, key) {
	        if (urlParams.indexOf(key) === -1) {
	            query[key] = value;
	        }
	    });
	
	    query = Url.params(query);
	
	    if (query) {
	        url += (url.indexOf('?') == -1 ? '?' : '&') + query;
	    }
	
	    return url;
	}
	
	/**
	 * URL Template v2.0.6 (https://github.com/bramstein/url-template)
	 */
	
	function expand(url, params, variables) {
	
	    var tmpl = parse(url),
	        expanded = tmpl.expand(params);
	
	    if (variables) {
	        variables.push.apply(variables, tmpl.vars);
	    }
	
	    return expanded;
	}
	
	function parse(template) {
	
	    var operators = ['+', '#', '.', '/', ';', '?', '&'],
	        variables = [];
	
	    return {
	        vars: variables,
	        expand: function (context) {
	            return template.replace(/\{([^\{\}]+)\}|([^\{\}]+)/g, function (_, expression, literal) {
	                if (expression) {
	
	                    var operator = null,
	                        values = [];
	
	                    if (operators.indexOf(expression.charAt(0)) !== -1) {
	                        operator = expression.charAt(0);
	                        expression = expression.substr(1);
	                    }
	
	                    expression.split(/,/g).forEach(function (variable) {
	                        var tmp = /([^:\*]*)(?::(\d+)|(\*))?/.exec(variable);
	                        values.push.apply(values, getValues(context, operator, tmp[1], tmp[2] || tmp[3]));
	                        variables.push(tmp[1]);
	                    });
	
	                    if (operator && operator !== '+') {
	
	                        var separator = ',';
	
	                        if (operator === '?') {
	                            separator = '&';
	                        } else if (operator !== '#') {
	                            separator = operator;
	                        }
	
	                        return (values.length !== 0 ? operator : '') + values.join(separator);
	                    } else {
	                        return values.join(',');
	                    }
	                } else {
	                    return encodeReserved(literal);
	                }
	            });
	        }
	    };
	}
	
	function getValues(context, operator, key, modifier) {
	
	    var value = context[key],
	        result = [];
	
	    if (isDefined(value) && value !== '') {
	        if (typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean') {
	            value = value.toString();
	
	            if (modifier && modifier !== '*') {
	                value = value.substring(0, parseInt(modifier, 10));
	            }
	
	            result.push(encodeValue(operator, value, isKeyOperator(operator) ? key : null));
	        } else {
	            if (modifier === '*') {
	                if (Array.isArray(value)) {
	                    value.filter(isDefined).forEach(function (value) {
	                        result.push(encodeValue(operator, value, isKeyOperator(operator) ? key : null));
	                    });
	                } else {
	                    Object.keys(value).forEach(function (k) {
	                        if (isDefined(value[k])) {
	                            result.push(encodeValue(operator, value[k], k));
	                        }
	                    });
	                }
	            } else {
	                var tmp = [];
	
	                if (Array.isArray(value)) {
	                    value.filter(isDefined).forEach(function (value) {
	                        tmp.push(encodeValue(operator, value));
	                    });
	                } else {
	                    Object.keys(value).forEach(function (k) {
	                        if (isDefined(value[k])) {
	                            tmp.push(encodeURIComponent(k));
	                            tmp.push(encodeValue(operator, value[k].toString()));
	                        }
	                    });
	                }
	
	                if (isKeyOperator(operator)) {
	                    result.push(encodeURIComponent(key) + '=' + tmp.join(','));
	                } else if (tmp.length !== 0) {
	                    result.push(tmp.join(','));
	                }
	            }
	        }
	    } else {
	        if (operator === ';') {
	            result.push(encodeURIComponent(key));
	        } else if (value === '' && (operator === '&' || operator === '?')) {
	            result.push(encodeURIComponent(key) + '=');
	        } else if (value === '') {
	            result.push('');
	        }
	    }
	
	    return result;
	}
	
	function isDefined(value) {
	    return value !== undefined && value !== null;
	}
	
	function isKeyOperator(operator) {
	    return operator === ';' || operator === '&' || operator === '?';
	}
	
	function encodeValue(operator, value, key) {
	
	    value = operator === '+' || operator === '#' ? encodeReserved(value) : encodeURIComponent(value);
	
	    if (key) {
	        return encodeURIComponent(key) + '=' + value;
	    } else {
	        return value;
	    }
	}
	
	function encodeReserved(str) {
	    return str.split(/(%[0-9A-Fa-f]{2})/g).map(function (part) {
	        if (!/%[0-9A-Fa-f]/.test(part)) {
	            part = encodeURI(part);
	        }
	        return part;
	    }).join('');
	}
	
	function template (options) {
	
	    var variables = [],
	        url = expand(options.url, options.params, variables);
	
	    variables.forEach(function (key) {
	        delete options.params[key];
	    });
	
	    return url;
	}
	
	/**
	 * Service for URL templating.
	 */
	
	var ie = document.documentMode;
	var el = document.createElement('a');
	
	function Url(url, params) {
	
	    var self = this || {},
	        options = url,
	        transform;
	
	    if (isString(url)) {
	        options = { url: url, params: params };
	    }
	
	    options = merge({}, Url.options, self.$options, options);
	
	    Url.transforms.forEach(function (handler) {
	        transform = factory(handler, transform, self.$vm);
	    });
	
	    return transform(options);
	}
	
	/**
	 * Url options.
	 */
	
	Url.options = {
	    url: '',
	    root: null,
	    params: {}
	};
	
	/**
	 * Url transforms.
	 */
	
	Url.transforms = [template, query, root];
	
	/**
	 * Encodes a Url parameter string.
	 *
	 * @param {Object} obj
	 */
	
	Url.params = function (obj) {
	
	    var params = [],
	        escape = encodeURIComponent;
	
	    params.add = function (key, value) {
	
	        if (isFunction(value)) {
	            value = value();
	        }
	
	        if (value === null) {
	            value = '';
	        }
	
	        this.push(escape(key) + '=' + escape(value));
	    };
	
	    serialize(params, obj);
	
	    return params.join('&').replace(/%20/g, '+');
	};
	
	/**
	 * Parse a URL and return its components.
	 *
	 * @param {String} url
	 */
	
	Url.parse = function (url) {
	
	    if (ie) {
	        el.href = url;
	        url = el.href;
	    }
	
	    el.href = url;
	
	    return {
	        href: el.href,
	        protocol: el.protocol ? el.protocol.replace(/:$/, '') : '',
	        port: el.port,
	        host: el.host,
	        hostname: el.hostname,
	        pathname: el.pathname.charAt(0) === '/' ? el.pathname : '/' + el.pathname,
	        search: el.search ? el.search.replace(/^\?/, '') : '',
	        hash: el.hash ? el.hash.replace(/^#/, '') : ''
	    };
	};
	
	function factory(handler, next, vm) {
	    return function (options) {
	        return handler.call(vm, options, next);
	    };
	}
	
	function serialize(params, obj, scope) {
	
	    var array = isArray(obj),
	        plain = isPlainObject(obj),
	        hash;
	
	    each(obj, function (value, key) {
	
	        hash = isObject(value) || isArray(value);
	
	        if (scope) {
	            key = scope + '[' + (plain || hash ? key : '') + ']';
	        }
	
	        if (!scope && array) {
	            params.add(value.name, value.value);
	        } else if (hash) {
	            serialize(params, value, key);
	        } else {
	            params.add(key, value);
	        }
	    });
	}
	
	function xdrClient (request) {
	    return new Promise$1(function (resolve) {
	
	        var xdr = new XDomainRequest(),
	            handler = function (event) {
	
	            var response = request.respondWith(xdr.responseText, {
	                status: xdr.status,
	                statusText: xdr.statusText
	            });
	
	            resolve(response);
	        };
	
	        request.abort = function () {
	            return xdr.abort();
	        };
	
	        xdr.open(request.method, request.getUrl(), true);
	        xdr.timeout = 0;
	        xdr.onload = handler;
	        xdr.onerror = handler;
	        xdr.ontimeout = function () {};
	        xdr.onprogress = function () {};
	        xdr.send(request.getBody());
	    });
	}
	
	var ORIGIN_URL = Url.parse(location.href);
	var SUPPORTS_CORS = 'withCredentials' in new XMLHttpRequest();
	
	function cors (request, next) {
	
	    if (!isBoolean(request.crossOrigin) && crossOrigin(request)) {
	        request.crossOrigin = true;
	    }
	
	    if (request.crossOrigin) {
	
	        if (!SUPPORTS_CORS) {
	            request.client = xdrClient;
	        }
	
	        delete request.emulateHTTP;
	    }
	
	    next();
	}
	
	function crossOrigin(request) {
	
	    var requestUrl = Url.parse(Url(request));
	
	    return requestUrl.protocol !== ORIGIN_URL.protocol || requestUrl.host !== ORIGIN_URL.host;
	}
	
	function body (request, next) {
	
	    if (request.emulateJSON && isPlainObject(request.body)) {
	        request.body = Url.params(request.body);
	        request.headers['Content-Type'] = 'application/x-www-form-urlencoded';
	    }
	
	    if (isFormData(request.body)) {
	        delete request.headers['Content-Type'];
	    }
	
	    if (isPlainObject(request.body)) {
	        request.body = JSON.stringify(request.body);
	    }
	
	    next(function (response) {
	
	        var contentType = response.headers['Content-Type'];
	
	        if (isString(contentType) && contentType.indexOf('application/json') === 0) {
	
	            try {
	                response.data = response.json();
	            } catch (e) {
	                response.data = null;
	            }
	        } else {
	            response.data = response.text();
	        }
	    });
	}
	
	function jsonpClient (request) {
	    return new Promise$1(function (resolve) {
	
	        var name = request.jsonp || 'callback',
	            callback = '_jsonp' + Math.random().toString(36).substr(2),
	            body = null,
	            handler,
	            script;
	
	        handler = function (event) {
	
	            var status = 0;
	
	            if (event.type === 'load' && body !== null) {
	                status = 200;
	            } else if (event.type === 'error') {
	                status = 404;
	            }
	
	            resolve(request.respondWith(body, { status: status }));
	
	            delete window[callback];
	            document.body.removeChild(script);
	        };
	
	        request.params[name] = callback;
	
	        window[callback] = function (result) {
	            body = JSON.stringify(result);
	        };
	
	        script = document.createElement('script');
	        script.src = request.getUrl();
	        script.type = 'text/javascript';
	        script.async = true;
	        script.onload = handler;
	        script.onerror = handler;
	
	        document.body.appendChild(script);
	    });
	}
	
	function jsonp (request, next) {
	
	    if (request.method == 'JSONP') {
	        request.client = jsonpClient;
	    }
	
	    next(function (response) {
	
	        if (request.method == 'JSONP') {
	            response.data = response.json();
	        }
	    });
	}
	
	function before (request, next) {
	
	    if (isFunction(request.before)) {
	        request.before.call(this, request);
	    }
	
	    next();
	}
	
	/**
	 * HTTP method override Interceptor.
	 */
	
	function method (request, next) {
	
	    if (request.emulateHTTP && /^(PUT|PATCH|DELETE)$/i.test(request.method)) {
	        request.headers['X-HTTP-Method-Override'] = request.method;
	        request.method = 'POST';
	    }
	
	    next();
	}
	
	function header (request, next) {
	
	    request.method = request.method.toUpperCase();
	    request.headers = assign({}, Http.headers.common, !request.crossOrigin ? Http.headers.custom : {}, Http.headers[request.method.toLowerCase()], request.headers);
	
	    next();
	}
	
	/**
	 * Timeout Interceptor.
	 */
	
	function timeout (request, next) {
	
	    var timeout;
	
	    if (request.timeout) {
	        timeout = setTimeout(function () {
	            request.abort();
	        }, request.timeout);
	    }
	
	    next(function (response) {
	
	        clearTimeout(timeout);
	    });
	}
	
	function xhrClient (request) {
	    return new Promise$1(function (resolve) {
	
	        var xhr = new XMLHttpRequest(),
	            handler = function (event) {
	
	            var response = request.respondWith('response' in xhr ? xhr.response : xhr.responseText, {
	                status: xhr.status === 1223 ? 204 : xhr.status, // IE9 status bug
	                statusText: xhr.status === 1223 ? 'No Content' : trim(xhr.statusText),
	                headers: parseHeaders(xhr.getAllResponseHeaders())
	            });
	
	            resolve(response);
	        };
	
	        request.abort = function () {
	            return xhr.abort();
	        };
	
	        xhr.open(request.method, request.getUrl(), true);
	        xhr.timeout = 0;
	        xhr.onload = handler;
	        xhr.onerror = handler;
	
	        if (request.progress) {
	            if (request.method === 'GET') {
	                xhr.addEventListener('progress', request.progress);
	            } else if (/^(POST|PUT)$/i.test(request.method)) {
	                xhr.upload.addEventListener('progress', request.progress);
	            }
	        }
	
	        if (request.credentials === true) {
	            xhr.withCredentials = true;
	        }
	
	        each(request.headers || {}, function (value, header) {
	            xhr.setRequestHeader(header, value);
	        });
	
	        xhr.send(request.getBody());
	    });
	}
	
	function parseHeaders(str) {
	
	    var headers = {},
	        value,
	        name,
	        i;
	
	    each(trim(str).split('\n'), function (row) {
	
	        i = row.indexOf(':');
	        name = trim(row.slice(0, i));
	        value = trim(row.slice(i + 1));
	
	        if (headers[name]) {
	
	            if (isArray(headers[name])) {
	                headers[name].push(value);
	            } else {
	                headers[name] = [headers[name], value];
	            }
	        } else {
	
	            headers[name] = value;
	        }
	    });
	
	    return headers;
	}
	
	function Client (context) {
	
	    var reqHandlers = [sendRequest],
	        resHandlers = [],
	        handler;
	
	    if (!isObject(context)) {
	        context = null;
	    }
	
	    function Client(request) {
	        return new Promise$1(function (resolve) {
	
	            function exec() {
	
	                handler = reqHandlers.pop();
	
	                if (isFunction(handler)) {
	                    handler.call(context, request, next);
	                } else {
	                    warn('Invalid interceptor of type ' + typeof handler + ', must be a function');
	                    next();
	                }
	            }
	
	            function next(response) {
	
	                if (isFunction(response)) {
	
	                    resHandlers.unshift(response);
	                } else if (isObject(response)) {
	
	                    resHandlers.forEach(function (handler) {
	                        response = when(response, function (response) {
	                            return handler.call(context, response) || response;
	                        });
	                    });
	
	                    when(response, resolve);
	
	                    return;
	                }
	
	                exec();
	            }
	
	            exec();
	        }, context);
	    }
	
	    Client.use = function (handler) {
	        reqHandlers.push(handler);
	    };
	
	    return Client;
	}
	
	function sendRequest(request, resolve) {
	
	    var client = request.client || xhrClient;
	
	    resolve(client(request));
	}
	
	var classCallCheck = function (instance, Constructor) {
	  if (!(instance instanceof Constructor)) {
	    throw new TypeError("Cannot call a class as a function");
	  }
	};
	
	/**
	 * HTTP Response.
	 */
	
	var Response = function () {
	    function Response(body, _ref) {
	        var url = _ref.url;
	        var headers = _ref.headers;
	        var status = _ref.status;
	        var statusText = _ref.statusText;
	        classCallCheck(this, Response);
	
	
	        this.url = url;
	        this.body = body;
	        this.headers = headers || {};
	        this.status = status || 0;
	        this.statusText = statusText || '';
	        this.ok = status >= 200 && status < 300;
	    }
	
	    Response.prototype.text = function text() {
	        return this.body;
	    };
	
	    Response.prototype.blob = function blob() {
	        return new Blob([this.body]);
	    };
	
	    Response.prototype.json = function json() {
	        return JSON.parse(this.body);
	    };
	
	    return Response;
	}();
	
	var Request = function () {
	    function Request(options) {
	        classCallCheck(this, Request);
	
	
	        this.method = 'GET';
	        this.body = null;
	        this.params = {};
	        this.headers = {};
	
	        assign(this, options);
	    }
	
	    Request.prototype.getUrl = function getUrl() {
	        return Url(this);
	    };
	
	    Request.prototype.getBody = function getBody() {
	        return this.body;
	    };
	
	    Request.prototype.respondWith = function respondWith(body, options) {
	        return new Response(body, assign(options || {}, { url: this.getUrl() }));
	    };
	
	    return Request;
	}();
	
	/**
	 * Service for sending network requests.
	 */
	
	var CUSTOM_HEADERS = { 'X-Requested-With': 'XMLHttpRequest' };
	var COMMON_HEADERS = { 'Accept': 'application/json, text/plain, */*' };
	var JSON_CONTENT_TYPE = { 'Content-Type': 'application/json;charset=utf-8' };
	
	function Http(options) {
	
	    var self = this || {},
	        client = Client(self.$vm);
	
	    defaults(options || {}, self.$options, Http.options);
	
	    Http.interceptors.forEach(function (handler) {
	        client.use(handler);
	    });
	
	    return client(new Request(options)).then(function (response) {
	
	        return response.ok ? response : Promise$1.reject(response);
	    }, function (response) {
	
	        if (response instanceof Error) {
	            error(response);
	        }
	
	        return Promise$1.reject(response);
	    });
	}
	
	Http.options = {};
	
	Http.headers = {
	    put: JSON_CONTENT_TYPE,
	    post: JSON_CONTENT_TYPE,
	    patch: JSON_CONTENT_TYPE,
	    delete: JSON_CONTENT_TYPE,
	    custom: CUSTOM_HEADERS,
	    common: COMMON_HEADERS
	};
	
	Http.interceptors = [before, timeout, method, body, jsonp, header, cors];
	
	['get', 'delete', 'head', 'jsonp'].forEach(function (method) {
	
	    Http[method] = function (url, options) {
	        return this(assign(options || {}, { url: url, method: method }));
	    };
	});
	
	['post', 'put', 'patch'].forEach(function (method) {
	
	    Http[method] = function (url, body, options) {
	        return this(assign(options || {}, { url: url, method: method, body: body }));
	    };
	});
	
	function Resource(url, params, actions, options) {
	
	    var self = this || {},
	        resource = {};
	
	    actions = assign({}, Resource.actions, actions);
	
	    each(actions, function (action, name) {
	
	        action = merge({ url: url, params: params || {} }, options, action);
	
	        resource[name] = function () {
	            return (self.$http || Http)(opts(action, arguments));
	        };
	    });
	
	    return resource;
	}
	
	function opts(action, args) {
	
	    var options = assign({}, action),
	        params = {},
	        body;
	
	    switch (args.length) {
	
	        case 2:
	
	            params = args[0];
	            body = args[1];
	
	            break;
	
	        case 1:
	
	            if (/^(POST|PUT|PATCH)$/i.test(options.method)) {
	                body = args[0];
	            } else {
	                params = args[0];
	            }
	
	            break;
	
	        case 0:
	
	            break;
	
	        default:
	
	            throw 'Expected up to 4 arguments [params, body], got ' + args.length + ' arguments';
	    }
	
	    options.body = body;
	    options.params = assign({}, options.params, params);
	
	    return options;
	}
	
	Resource.actions = {
	
	    get: { method: 'GET' },
	    save: { method: 'POST' },
	    query: { method: 'GET' },
	    update: { method: 'PUT' },
	    remove: { method: 'DELETE' },
	    delete: { method: 'DELETE' }
	
	};
	
	function plugin(Vue) {
	
	    if (plugin.installed) {
	        return;
	    }
	
	    Util(Vue);
	
	    Vue.url = Url;
	    Vue.http = Http;
	    Vue.resource = Resource;
	    Vue.Promise = Promise$1;
	
	    Object.defineProperties(Vue.prototype, {
	
	        $url: {
	            get: function () {
	                return options(Vue.url, this, this.$options.url);
	            }
	        },
	
	        $http: {
	            get: function () {
	                return options(Vue.http, this, this.$options.http);
	            }
	        },
	
	        $resource: {
	            get: function () {
	                return Vue.resource.bind(this);
	            }
	        },
	
	        $promise: {
	            get: function () {
	                var _this = this;
	
	                return function (executor) {
	                    return new Vue.Promise(executor, _this);
	                };
	            }
	        }
	
	    });
	}
	
	if (typeof window !== 'undefined' && window.Vue) {
	    window.Vue.use(plugin);
	}
	
	module.exports = plugin;

/***/ },
/* 7 */,
/* 8 */,
/* 9 */,
/* 10 */,
/* 11 */,
/* 12 */,
/* 13 */,
/* 14 */,
/* 15 */,
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(Vue) {/**
	 * Created by humorHan on 2016/7/5.
	 */
	var testVue = __webpack_require__(17);
	
	var menu = new Vue({
	    el: '#test',
	    data: {
	        firstName: '张',
	        lastName: '三',
	        age: '25',
	        sex: 'man',
	        items: [1,2,3]
	    },
	    template: '#self',
	    computed: {
	        fullName: function(){
	            return this.firstName + ' ' + this.lastName;
	        }
	    },
	    methods: {
	        sayHello: function(){
	            console.log('你好 ' + this.fullName);
	        }
	    }
	});
	
	/*同一个vue实例下，页面的模板(template)会覆盖掉组件的渲染，因为在父页面渲染的时候浏览器不认识组件的挂载点所以会忽略
	* 解决办法有两种，一种是在页面模板中写自定义标签(挂载点),另一种就是重新声明新的vue实例*/
	new Vue({
	    el: '#test2',
	    components: {
	        'menu': testVue
	    }
	});
	
	Vue.use(__webpack_require__(6));
	
	new Vue({
	    el: '#test3',
	    ready: function(){
	        this.$http.get('https://api.myjson.com/bins/r8mm').then(function(data){
	            console.log(data);
	        },function(data, status, request){
	            console.log('fail' + status + "," + request);
	        })
	    }
	});
	console.log(menu.$log());
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	__vue_script__ = __webpack_require__(18)
	if (__vue_script__ &&
	    __vue_script__.__esModule &&
	    Object.keys(__vue_script__).length > 1) {
	  console.warn("[vue-loader] app\\test.vue: named exports in *.vue files are ignored.")}
	__vue_template__ = __webpack_require__(19)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	if (__vue_template__) {
	(typeof module.exports === "function" ? (module.exports.options || (module.exports.options = {})) : module.exports).template = __vue_template__
	}
	if (false) {(function () {  module.hot.accept()
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  var id = "_v-d97a662a/test.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },
/* 18 */
/***/ function(module, exports) {

	'use strict';
	
	module.exports = {
	    data: function data() {
	        return {
	            arr: [123, 234, 345]
	        };
	    },
	    template: '#kid'
	};

/***/ },
/* 19 */
/***/ function(module, exports) {

	module.exports = "\n<div>\n    <ul v-for=\"item of arr\">\n        <li>{{item}}</li>\n    </ul>\n</div>\n";

/***/ }
]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9kZXAvVnVlLmpzPzk3ZGYqKioiLCJ3ZWJwYWNrOi8vLy4vfi92dWUtcmVzb3VyY2UvZGlzdC92dWUtcmVzb3VyY2UuY29tbW9uLmpzPzJmMTMiLCJ3ZWJwYWNrOi8vLy4vanMvdGVzdC5qcyIsIndlYnBhY2s6Ly8vLi9hcHAvdGVzdC52dWUiLCJ3ZWJwYWNrOi8vL3Rlc3QudnVlIiwid2VicGFjazovLy8uL2FwcC90ZXN0LnZ1ZT85MjgxIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUMsb0JBQW9COztBQUVyQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGNBQWEsT0FBTztBQUNwQixjQUFhLE9BQU87QUFDcEI7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWEsT0FBTztBQUNwQixjQUFhLE9BQU87QUFDcEIsZUFBYztBQUNkOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxjQUFhLE9BQU87QUFDcEIsZUFBYztBQUNkOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxjQUFhLE9BQU87QUFDcEIsZUFBYztBQUNkOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYSxFQUFFO0FBQ2YsZUFBYztBQUNk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QUNBO0FBQ0E7QUFDQSxRQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsSUFBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFhLE9BQU87QUFDcEI7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNDQUFxQyxPQUFPO0FBQzVDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFhLE9BQU87QUFDcEI7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFTO0FB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Q0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsY0FBYSxLQUFLO0FBQ2xCLGVBQWMsT0FBTztBQUNyQjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFhLE9BQU87QUFDcEIsZUFBYztBQUNkOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsY0FBYSxPQUFPO0FBQ3BCLGVBQWM7QUFDZDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFFBQU87QUFDUDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTs7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QSwyQkFBMEI7QUFDMUI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGNBQWEsRUFBRTtBQUNmOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVM7QUFDVDtBQUNBO0FBQ0EsUUFBTztBQUNQO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxjQUFhLElBQUk7QUFDakI7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWEsUUFBUTtBQUNyQjs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7QUFDQSxNQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVCQUFzQjtBQUN0QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBVztBQUNYO0FBQ0E7QUFDQSxjQUFhO0FBQ2I7QUFDQTtBQUNBLFVBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFhLEVBQUU7QUFDZjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0EsTUFBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWEsS0FBSztBQUNsQixlQUFjO0FBQ2Q7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0EsMkJBQTBCOztBQUUxQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYSxPQUFPO0FBQ3BCLGNBQWEsUUFBUTtBQUNyQixlQUFjO0FBQ2Q7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLE1BQUs7QUFDTDtB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Q0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxNQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0JBQWUsTUFBTTtBQUNyQjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1DQUFrQyxPQUFPO0FBQ3pDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFhO0FBQ2I7QUFDQSxVQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVDQUFzQyxPQUFPO0FBQzdDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBUztBQUNUOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0NBQW1DLE9BQU87QUFDMUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7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QUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFPO0FBQ1A7QUFDQTtBQUNBLE1BQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQSxRQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVM7QUFDVDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBUztBQUNUOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBUztBQUNUOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVM7QUFDVDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQUs7O0FBRUw7QUFDQTtBQUNBLE1BQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLE1BQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxjQUFhLGNBQWM7QUFDM0IsY0FBYSxRQUFRO0FBQ3JCLGNBQWEsUUFBUTtBQUNyQixlQUFjO0FBQ2Q7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsMkNBQTBDLE9BQU87QUFDakQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWEsTUFBTTtBQUNuQixjQUFhLEVBQUU7QUFDZjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBVztBQUNYO0FBQ0E7QUFDQSxVQUFTO0FBQ1Q7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQU87QUFDUDtBQUNBO0FBQ0EsVUFBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFPO0FBQ1A7QUFDQSxRQUFPO0FBQ1A7QUFDQSxRQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFLOztBQUVMO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFPO0FBQ1A7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLFFBQU87QUFDUDtBQUNBO0FBQ0EsTUFBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsaUNBQWdDO0FBQ2hDOztBQUVBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFFBQU87QUFDUCxrREFBaUQ7QUFDakQsUUFBTztBQUNQLHNDQUFxQztBQUNyQztBQUNBLE1BQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0EsaURBQWdEO0FBQ2hEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFLOztBQUVMO0FBQ0E7QUFDQSx5QkFBd0I7QUFDeEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVM7QUFDVDtBQUNBO0FBQ0EsUUFBTztBQUNQO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFhLE9BQU87QUFDcEIsZUFBYztBQUNkOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFhLE9BQU87QUFDcEIsZUFBYztBQUNkOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQU87QUFDUCxzQ0FBcUM7QUFDckM7QUFDQSxNQUFLOztBQUVMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBUztBQUNUO0FBQ0EsVUFBUztBQUNUO0FBQ0E7QUFDQSxRQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBTztBQUNQO0FBQ0E7QUFDQSxNQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQU87QUFDUDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7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T0FBTztBQUNwQixjQUFhLE9BQU87QUFDcEIsY0FBYSxJQUFJO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQW9CO0FBQ3BCO0FBQ0EsTUFBSztBQUNMOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWEsU0FBUztBQUN0QixjQUFhLFNBQVM7QUFDdEI7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQU87QUFDUDtBQUNBLFFBQU87QUFDUDtBQUNBO0FBQ0EsTUFBSztBQUNMO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWEsU0FBUztBQUN0QixjQUFhLFNBQVM7QUFDdEI7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQUs7QUFDTDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxjQUFhLE9BQU87QUFDcEI7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYSxPQUFPO0FBQ3BCOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWEsT0FBTztBQUNwQixlQUFjO0FBQ2Q7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsY0FBYSxPQUFPO0FBQ3BCLGNBQWEsU0FBUztBQUN0Qjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFhLFFBQVE7QUFDckIsZUFBYztBQUNkOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQUs7QUFDTDtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7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QUFDQSxnQkFBZSxPQUFPO0FBQ3RCOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnQkFBZSxPQUFPO0FBQ3RCOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQSxVQUFTO0FBQ1Q7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxnQkFBZSxPQUFPO0FBQ3RCOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0EsaURBQWdELE9BQU87QUFDdkQsd0NBQXVDO0FBQ3ZDO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsUUFBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGdCQUFlLElBQUk7QUFDbkIsZ0JB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QSxNQUFLO0FBQ0w7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBLDJCQUEwQiwyQkFBMkIsUUFBUSxpQkFBaUI7QUFDOUU7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQSxvQkFBbUIsZ0JBQWdCO0FBQ25DO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBLE1BQUs7O0FBRUw7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBSzs7QUFFTDtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQSxNQUFLOztBQUVMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQSxtQkFBa0I7QUFDbEI7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFLOztBQUVMOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBLDRDQUEyQztBQUMzQzs7QUFFQTtBQUNBO0FBQ0E7QUFDQSx3Q0FBdUMsS0FBSyxFQUFFLEtBQUssTUFBTSxFQUFFO0FBQzNEOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzQkFBcUI7O0FBRXJCOztBQUVBOztBQUVBO0FBQ0E7QUFDQSwwQkFBeUI7QUFDekI7QUFDQTs7QUFFQTtBQUNBLHNCQUFxQjtBQUNyQjtBQUNBO0FBQ0Esa0JBQWlCO0FBQ2pCO0FBQ0E7QUFDQSxjQUFhO0FBQ2I7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLFVBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNCQUFxQjtBQUNyQixrQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzQkFBcUI7QUFDckI7QUFDQSxjQUFhO0FBQ2I7O0FBRUE7QUFDQTtBQUNBO0FBQ0Esc0JBQXFCO0FBQ3JCLGtCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0JBQXFCO0FBQ3JCOztBQUVBO0FBQ0E7QUFDQSxrQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFLO0FBQ0wsNEJBQTJCO0FBQzNCO0FBQ0EsVUFBUztBQUNUO0FBQ0EsVUFBUztBQUNUO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDJCQUEwQjtBQUMxQjs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0EsTUFBSztBQUNMO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLHFDQUFvQyxFQUFFO0FBQ3RDO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBSztBQUNMOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLE1BQUs7O0FBRUw7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQSwwQkFBeUI7QUFDekI7QUFDQTs7QUFFQTtBQUNBLG9CQUFtQjtBQUNuQjs7QUFFQSx1QkFBc0I7O0FBRXRCO0FBQ0E7QUFDQSxNQUFLOztBQUVMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFlBQVcsT0FBTztBQUNsQjs7QUFFQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFlBQVcsT0FBTztBQUNsQjs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsVUFBUztBQUNUO0FBQ0EsVUFBUztBQUNUO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGNBQWE7O0FBRWI7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBLGNBQWE7QUFDYjtBQUNBO0FBQ0EsVUFBUztBQUNUO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQSxjQUFhO0FBQ2I7QUFDQTs7QUFFQSxnREFBK0MsaUJBQWlCOztBQUVoRTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLE1BQUs7QUFDTDs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsTUFBSztBQUNMOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0EsZ0NBQStCLHNFQUFzRTs7QUFFckc7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsVUFBUztBQUNUOztBQUVBOztBQUVBO0FBQ0EsTUFBSztBQUNMOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWE7O0FBRWI7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsY0FBYTtBQUNiO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUEsbUNBQWtDO0FBQ2xDO0FBQ0EsVUFBUzs7QUFFVDtBQUNBLE1BQUs7QUFDTDs7QUFFQTs7QUFFQSxxQkFBb0I7QUFDcEI7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0EsY0FBYTtBQUNiO0FBQ0E7QUFDQSxVQUFTOztBQUVUO0FBQ0E7QUFDQSxNQUFLOztBQUVMO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQSxrQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQSxrQkFBaUI7O0FBRWpCO0FBQ0E7QUFDQTtBQUNBLDBCQUF5QjtBQUN6QixzQkFBcUI7O0FBRXJCOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLFVBQVM7QUFDVDs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLEVBQUM7O0FBRUQ7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSx1REFBc0QsR0FBRyxxQkFBcUI7QUFDOUU7O0FBRUE7QUFDQSxFQUFDOztBQUVEO0FBQ0E7QUFDQTs7QUFFQSx1QkFBc0I7QUFDdEIsdUJBQXNCO0FBQ3RCLDBCQUF5QixtQ0FBbUM7O0FBRTVEOztBQUVBLDBCQUF5QjtBQUN6Qjs7QUFFQSwyQkFBMEI7O0FBRTFCO0FBQ0E7QUFDQSxNQUFLOztBQUVMOztBQUVBO0FBQ0EsTUFBSzs7QUFFTDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxNQUFLO0FBQ0w7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBLHlDQUF3QyxHQUFHLDJCQUEyQjtBQUN0RTtBQUNBLEVBQUM7O0FBRUQ7O0FBRUE7QUFDQSx5Q0FBd0MsR0FBRyx1Q0FBdUM7QUFDbEY7QUFDQSxFQUFDOztBQUVEOztBQUVBLDBCQUF5QjtBQUN6Qjs7QUFFQSx3QkFBdUI7O0FBRXZCOztBQUVBLHlCQUF3QiwrQkFBK0IsRUFBRTs7QUFFekQ7QUFDQTtBQUNBO0FBQ0EsTUFBSzs7QUFFTDtBQUNBOztBQUVBOztBQUVBLDRCQUEyQjtBQUMzQixvQkFBbUI7QUFDbkI7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0EsY0FBYTtBQUNiO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLCtCQUE4Qjs7QUFFOUI7QUFDQTs7QUFFQTs7QUFFQSxXQUFVLGdCQUFnQjtBQUMxQixZQUFXLGlCQUFpQjtBQUM1QixhQUFZLGdCQUFnQjtBQUM1QixjQUFhLGdCQUFnQjtBQUM3QixjQUFhLG1CQUFtQjtBQUNoQyxjQUFhOztBQUViOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVM7O0FBRVQ7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFTOztBQUVUO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBUzs7QUFFVDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxNQUFLO0FBQ0w7O0FBRUE7QUFDQTtBQUNBOztBQUVBLHlCOzs7Ozs7Ozs7Ozs7Ozs7QUMveENBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUM7O0FBRUQ7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVM7QUFDVDtBQUNBLFVBQVM7QUFDVDtBQUNBLEVBQUM7QUFDRCwwQjs7Ozs7OztBQ2hEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdHQUErRjtBQUMvRjtBQUNBLGFBQWlCLGNBQWM7QUFDL0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBRztBQUNIO0FBQ0E7QUFDQSxFQUFDLEk7Ozs7Ozs7O0FDZEQ7MkJBRUE7OzZCQUdBO0FBRkE7QUFHQTtlQUNBO0FBTkEsRzs7Ozs7O0FDVEEsMEVBQXlFLE1BQU0sNEIiLCJmaWxlIjoidGVzdC5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qIVxuICogVnVlLmpzIHYxLjAuMjRcbiAqIChjKSAyMDE2IEV2YW4gWW91XG4gKiBSZWxlYXNlZCB1bmRlciB0aGUgTUlUIExpY2Vuc2UuXG4gKi9cbihmdW5jdGlvbiAoZ2xvYmFsLCBmYWN0b3J5KSB7XG4gIHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgbW9kdWxlICE9PSAndW5kZWZpbmVkJyA/IG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeSgpIDpcbiAgdHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kID8gZGVmaW5lKGZhY3RvcnkpIDpcbiAgKGdsb2JhbC5WdWUgPSBmYWN0b3J5KCkpO1xufSh0aGlzLCBmdW5jdGlvbiAoKSB7ICd1c2Ugc3RyaWN0JztcblxuICBmdW5jdGlvbiBzZXQob2JqLCBrZXksIHZhbCkge1xuICAgIGlmIChoYXNPd24ob2JqLCBrZXkpKSB7XG4gICAgICBvYmpba2V5XSA9IHZhbDtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaWYgKG9iai5faXNWdWUpIHtcbiAgICAgIHNldChvYmouX2RhdGEsIGtleSwgdmFsKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdmFyIG9iID0gb2JqLl9fb2JfXztcbiAgICBpZiAoIW9iKSB7XG4gICAgICBvYmpba2V5XSA9IHZhbDtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgb2IuY29udmVydChrZXksIHZhbCk7XG4gICAgb2IuZGVwLm5vdGlmeSgpO1xuICAgIGlmIChvYi52bXMpIHtcbiAgICAgIHZhciBpID0gb2Iudm1zLmxlbmd0aDtcbiAgICAgIHdoaWxlIChpLS0pIHtcbiAgICAgICAgdmFyIHZtID0gb2Iudm1zW2ldO1xuICAgICAgICB2bS5fcHJveHkoa2V5KTtcbiAgICAgICAgdm0uX2RpZ2VzdCgpO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gdmFsO1xuICB9XG5cbiAgLyoqXG4gICAqIERlbGV0ZSBhIHByb3BlcnR5IGFuZCB0cmlnZ2VyIGNoYW5nZSBpZiBuZWNlc3NhcnkuXG4gICAqXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBvYmpcbiAgICogQHBhcmFtIHtTdHJpbmd9IGtleVxuICAgKi9cblxuICBmdW5jdGlvbiBkZWwob2JqLCBrZXkpIHtcbiAgICBpZiAoIWhhc093bihvYmosIGtleSkpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgZGVsZXRlIG9ialtrZXldO1xuICAgIHZhciBvYiA9IG9iai5fX29iX187XG4gICAgaWYgKCFvYikge1xuICAgICAgaWYgKG9iai5faXNWdWUpIHtcbiAgICAgICAgZGVsZXRlIG9iai5fZGF0YVtrZXldO1xuICAgICAgICBvYmouX2RpZ2VzdCgpO1xuICAgICAgfVxuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBvYi5kZXAubm90aWZ5KCk7XG4gICAgaWYgKG9iLnZtcykge1xuICAgICAgdmFyIGkgPSBvYi52bXMubGVuZ3RoO1xuICAgICAgd2hpbGUgKGktLSkge1xuICAgICAgICB2YXIgdm0gPSBvYi52bXNbaV07XG4gICAgICAgIHZtLl91bnByb3h5KGtleSk7XG4gICAgICAgIHZtLl9kaWdlc3QoKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICB2YXIgaGFzT3duUHJvcGVydHkgPSBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5O1xuICAvKipcbiAgICogQ2hlY2sgd2hldGhlciB0aGUgb2JqZWN0IGhhcyB0aGUgcHJvcGVydHkuXG4gICAqXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBvYmpcbiAgICogQHBhcmFtIHtTdHJpbmd9IGtleVxuICAgKiBAcmV0dXJuIHtCb29sZWFufVxuICAgKi9cblxuICBmdW5jdGlvbiBoYXNPd24ob2JqLCBrZXkpIHtcbiAgICByZXR1cm4gaGFzT3duUHJvcGVydHkuY2FsbChvYmosIGtleSk7XG4gIH1cblxuICAvKipcbiAgICogQ2hlY2sgaWYgYW4gZXhwcmVzc2lvbiBpcyBhIGxpdGVyYWwgdmFsdWUuXG4gICAqXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBleHBcbiAgICogQHJldHVybiB7Qm9vbGVhbn1cbiAgICovXG5cbiAgdmFyIGxpdGVyYWxWYWx1ZVJFID0gL15cXHM/KHRydWV8ZmFsc2V8LT9bXFxkXFwuXSt8J1teJ10qJ3xcIlteXCJdKlwiKVxccz8kLztcblxuICBmdW5jdGlvbiBpc0xpdGVyYWwoZXhwKSB7XG4gICAgcmV0dXJuIGxpdGVyYWxWYWx1ZVJFLnRlc3QoZXhwKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDaGVjayBpZiBhIHN0cmluZyBzdGFydHMgd2l0aCAkIG9yIF9cbiAgICpcbiAgICogQHBhcmFtIHtTdHJpbmd9IHN0clxuICAgKiBAcmV0dXJuIHtCb29sZWFufVxuICAgKi9cblxuICBmdW5jdGlvbiBpc1Jlc2VydmVkKHN0cikge1xuICAgIHZhciBjID0gKHN0ciArICcnKS5jaGFyQ29kZUF0KDApO1xuICAgIHJldHVybiBjID09PSAweDI0IHx8IGMgPT09IDB4NUY7XG4gIH1cblxuICAvKipcbiAgICogR3VhcmQgdGV4dCBvdXRwdXQsIG1ha2Ugc3VyZSB1bmRlZmluZWQgb3V0cHV0c1xuICAgKiBlbXB0eSBzdHJpbmdcbiAgICpcbiAgICogQHBhcmFtIHsqfSB2YWx1ZVxuICAgKiBAcmV0dXJuIHtTdHJpbmd9XG4gICAqL1xuXG4gIGZ1bmN0aW9uIF90b1N0cmluZyh2YWx1ZSkge1xuICAgIHJldHVybiB2YWx1ZSA9PSBudWxsID8gJycgOiB2YWx1ZS50b1N0cmluZygpO1xuICB9XG5cbiAgLyoqXG4gICAqIENoZWNrIGFuZCBjb252ZXJ0IHBvc3NpYmxlIG51bWVyaWMgc3RyaW5ncyB0byBudW1iZXJzXG4gICAqIGJlZm9yZSBzZXR0aW5nIGJhY2sgdG8gZGF0YVxuICAgKlxuICAgKiBAcGFyYW0geyp9IHZhbHVlXG4gICAqIEByZXR1cm4geyp8TnVtYmVyfVxuICAgKi9cblxuICBmdW5jdGlvbiB0b051bWJlcih2YWx1ZSkge1xuICAgIGlmICh0eXBlb2YgdmFsdWUgIT09ICdzdHJpbmcnKSB7XG4gICAgICByZXR1cm4gdmFsdWU7XG4gICAgfSBlbHNlIHtcbiAgICAgIHZhciBwYXJzZWQgPSBOdW1iZXIodmFsdWUpO1xuICAgICAgcmV0dXJuIGlzTmFOKHBhcnNlZCkgPyB2YWx1ZSA6IHBhcnNlZDtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQ29udmVydCBzdHJpbmcgYm9vbGVhbiBsaXRlcmFscyBpbnRvIHJlYWwgYm9vbGVhbnMuXG4gICAqXG4gICAqIEBwYXJhbSB7Kn0gdmFsdWVcbiAgICogQHJldHVybiB7KnxCb29sZWFufVxuICAgKi9cblxuICBmdW5jdGlvbiB0b0Jvb2xlYW4odmFsdWUpIHtcbiAgICByZXR1cm4gdmFsdWUgPT09ICd0cnVlJyA/IHRydWUgOiB2YWx1ZSA9PT0gJ2ZhbHNlJyA/IGZhbHNlIDogdmFsdWU7XG4gIH1cblxuICAvKipcbiAgICogU3RyaXAgcXVvdGVzIGZyb20gYSBzdHJpbmdcbiAgICpcbiAgICogQHBhcmFtIHtTdHJpbmd9IHN0clxuICAgKiBAcmV0dXJuIHtTdHJpbmcgfCBmYWxzZX1cbiAgICovXG5cbiAgZnVuY3Rpb24gc3RyaXBRdW90ZXMoc3RyKSB7XG4gICAgdmFyIGEgPSBzdHIuY2hhckNvZGVBdCgwKTtcbiAgICB2YXIgYiA9IHN0ci5jaGFyQ29kZUF0KHN0ci5sZW5ndGggLSAxKTtcbiAgICByZXR1cm4gYSA9PT0gYiAmJiAoYSA9PT0gMHgyMiB8fCBhID09PSAweDI3KSA/IHN0ci5zbGljZSgxLCAtMSkgOiBzdHI7XG4gIH1cblxuICAvKipcbiAgICogQ2FtZWxpemUgYSBoeXBoZW4tZGVsbWl0ZWQgc3RyaW5nLlxuICAgKlxuICAgKiBAcGFyYW0ge1N0cmluZ30gc3RyXG4gICAqIEByZXR1cm4ge1N0cmluZ31cbiAgICovXG5cbiAgdmFyIGNhbWVsaXplUkUgPSAvLShcXHcpL2c7XG5cbiAgZnVuY3Rpb24gY2FtZWxpemUoc3RyKSB7XG4gICAgcmV0dXJuIHN0ci5yZXBsYWNlKGNhbWVsaXplUkUsIHRvVXBwZXIpO1xuICB9XG5cbiAgZnVuY3Rpb24gdG9VcHBlcihfLCBjKSB7XG4gICAgcmV0dXJuIGMgPyBjLnRvVXBwZXJDYXNlKCkgOiAnJztcbiAgfVxuXG4gIC8qKlxuICAgKiBIeXBoZW5hdGUgYSBjYW1lbENhc2Ugc3RyaW5nLlxuICAgKlxuICAgKiBAcGFyYW0ge1N0cmluZ30gc3RyXG4gICAqIEByZXR1cm4ge1N0cmluZ31cbiAgICovXG5cbiAgdmFyIGh5cGhlbmF0ZVJFID0gLyhbYS16XFxkXSkoW0EtWl0pL2c7XG5cbiAgZnVuY3Rpb24gaHlwaGVuYXRlKHN0cikge1xuICAgIHJldHVybiBzdHIucmVwbGFjZShoeXBoZW5hdGVSRSwgJyQxLSQyJykudG9Mb3dlckNhc2UoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDb252ZXJ0cyBoeXBoZW4vdW5kZXJzY29yZS9zbGFzaCBkZWxpbWl0ZXJlZCBuYW1lcyBpbnRvXG4gICAqIGNhbWVsaXplZCBjbGFzc05hbWVzLlxuICAgKlxuICAgKiBlLmcuIG15LWNvbXBvbmVudCA9PiBNeUNvbXBvbmVudFxuICAgKiAgICAgIHNvbWVfZWxzZSAgICA9PiBTb21lRWxzZVxuICAgKiAgICAgIHNvbWUvY29tcCAgICA9PiBTb21lQ29tcFxuICAgKlxuICAgKiBAcGFyYW0ge1N0cmluZ30gc3RyXG4gICAqIEByZXR1cm4ge1N0cmluZ31cbiAgICovXG5cbiAgdmFyIGNsYXNzaWZ5UkUgPSAvKD86XnxbLV9cXC9dKShcXHcpL2c7XG5cbiAgZnVuY3Rpb24gY2xhc3NpZnkoc3RyKSB7XG4gICAgcmV0dXJuIHN0ci5yZXBsYWNlKGNsYXNzaWZ5UkUsIHRvVXBwZXIpO1xuICB9XG5cbiAgLyoqXG4gICAqIFNpbXBsZSBiaW5kLCBmYXN0ZXIgdGhhbiBuYXRpdmVcbiAgICpcbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gZm5cbiAgICogQHBhcmFtIHtPYmplY3R9IGN0eFxuICAgKiBAcmV0dXJuIHtGdW5jdGlvbn1cbiAgICovXG5cbiAgZnVuY3Rpb24gYmluZChmbiwgY3R4KSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uIChhKSB7XG4gICAgICB2YXIgbCA9IGFyZ3VtZW50cy5sZW5ndGg7XG4gICAgICByZXR1cm4gbCA/IGwgPiAxID8gZm4uYXBwbHkoY3R4LCBhcmd1bWVudHMpIDogZm4uY2FsbChjdHgsIGEpIDogZm4uY2FsbChjdHgpO1xuICAgIH07XG4gIH1cblxuICAvKipcbiAgICogQ29udmVydCBhbiBBcnJheS1saWtlIG9iamVjdCB0byBhIHJlYWwgQXJyYXkuXG4gICAqXG4gICAqIEBwYXJhbSB7QXJyYXktbGlrZX0gbGlzdFxuICAgKiBAcGFyYW0ge051bWJlcn0gW3N0YXJ0XSAtIHN0YXJ0IGluZGV4XG4gICAqIEByZXR1cm4ge0FycmF5fVxuICAgKi9cblxuICBmdW5jdGlvbiB0b0FycmF5KGxpc3QsIHN0YXJ0KSB7XG4gICAgc3RhcnQgPSBzdGFydCB8fCAwO1xuICAgIHZhciBpID0gbGlzdC5sZW5ndGggLSBzdGFydDtcbiAgICB2YXIgcmV0ID0gbmV3IEFycmF5KGkpO1xuICAgIHdoaWxlIChpLS0pIHtcbiAgICAgIHJldFtpXSA9IGxpc3RbaSArIHN0YXJ0XTtcbiAgICB9XG4gICAgcmV0dXJuIHJldDtcbiAgfVxuXG4gIC8qKlxuICAgKiBNaXggcHJvcGVydGllcyBpbnRvIHRhcmdldCBvYmplY3QuXG4gICAqXG4gICAqIEBwYXJhbSB7T2JqZWN0fSB0b1xuICAgKiBAcGFyYW0ge09iamVjdH0gZnJvbVxuICAgKi9cblxuICBmdW5jdGlvbiBleHRlbmQodG8sIGZyb20pIHtcbiAgICB2YXIga2V5cyA9IE9iamVjdC5rZXlzKGZyb20pO1xuICAgIHZhciBpID0ga2V5cy5sZW5ndGg7XG4gICAgd2hpbGUgKGktLSkge1xuICAgICAgdG9ba2V5c1tpXV0gPSBmcm9tW2tleXNbaV1dO1xuICAgIH1cbiAgICByZXR1cm4gdG87XG4gIH1cblxuICAvKipcbiAgICogUXVpY2sgb2JqZWN0IGNoZWNrIC0gdGhpcyBpcyBwcmltYXJpbHkgdXNlZCB0byB0ZWxsXG4gICAqIE9iamVjdHMgZnJvbSBwcmltaXRpdmUgdmFsdWVzIHdoZW4gd2Uga25vdyB0aGUgdmFsdWVcbiAgICogaXMgYSBKU09OLWNvbXBsaWFudCB0eXBlLlxuICAgKlxuICAgKiBAcGFyYW0geyp9IG9ialxuICAgKiBAcmV0dXJuIHtCb29sZWFufVxuICAgKi9cblxuICBmdW5jdGlvbiBpc09iamVjdChvYmopIHtcbiAgICByZXR1cm4gb2JqICE9PSBudWxsICYmIHR5cGVvZiBvYmogPT09ICdvYmplY3QnO1xuICB9XG5cbiAgLyoqXG4gICAqIFN0cmljdCBvYmplY3QgdHlwZSBjaGVjay4gT25seSByZXR1cm5zIHRydWVcbiAgICogZm9yIHBsYWluIEphdmFTY3JpcHQgb2JqZWN0cy5cbiAgICpcbiAgICogQHBhcmFtIHsqfSBvYmpcbiAgICogQHJldHVybiB7Qm9vbGVhbn1cbiAgICovXG5cbiAgdmFyIHRvU3RyaW5nID0gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZztcbiAgdmFyIE9CSkVDVF9TVFJJTkcgPSAnW29iamVjdCBPYmplY3RdJztcblxuICBmdW5jdGlvbiBpc1BsYWluT2JqZWN0KG9iaikge1xuICAgIHJldHVybiB0b1N0cmluZy5jYWxsKG9iaikgPT09IE9CSkVDVF9TVFJJTkc7XG4gIH1cblxuICAvKipcbiAgICogQXJyYXkgdHlwZSBjaGVjay5cbiAgICpcbiAgICogQHBhcmFtIHsqfSBvYmpcbiAgICogQHJldHVybiB7Qm9vbGVhbn1cbiAgICovXG5cbiAgdmFyIGlzQXJyYXkgPSBBcnJheS5pc0FycmF5O1xuXG4gIC8qKlxuICAgKiBEZWZpbmUgYSBwcm9wZXJ0eS5cbiAgICpcbiAgICogQHBhcmFtIHtPYmplY3R9IG9ialxuICAgKiBAcGFyYW0ge1N0cmluZ30ga2V5XG4gICAqIEBwYXJhbSB7Kn0gdmFsXG4gICAqIEBwYXJhbSB7Qm9vbGVhbn0gW2VudW1lcmFibGVdXG4gICAqL1xuXG4gIGZ1bmN0aW9uIGRlZihvYmosIGtleSwgdmFsLCBlbnVtZXJhYmxlKSB7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KG9iaiwga2V5LCB7XG4gICAgICB2YWx1ZTogdmFsLFxuICAgICAgZW51bWVyYWJsZTogISFlbnVtZXJhYmxlLFxuICAgICAgd3JpdGFibGU6IHRydWUsXG4gICAgICBjb25maWd1cmFibGU6IHRydWVcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBEZWJvdW5jZSBhIGZ1bmN0aW9uIHNvIGl0IG9ubHkgZ2V0cyBjYWxsZWQgYWZ0ZXIgdGhlXG4gICAqIGlucHV0IHN0b3BzIGFycml2aW5nIGFmdGVyIHRoZSBnaXZlbiB3YWl0IHBlcmlvZC5cbiAgICpcbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gZnVuY1xuICAgKiBAcGFyYW0ge051bWJlcn0gd2FpdFxuICAgKiBAcmV0dXJuIHtGdW5jdGlvbn0gLSB0aGUgZGVib3VuY2VkIGZ1bmN0aW9uXG4gICAqL1xuXG4gIGZ1bmN0aW9uIF9kZWJvdW5jZShmdW5jLCB3YWl0KSB7XG4gICAgdmFyIHRpbWVvdXQsIGFyZ3MsIGNvbnRleHQsIHRpbWVzdGFtcCwgcmVzdWx0O1xuICAgIHZhciBsYXRlciA9IGZ1bmN0aW9uIGxhdGVyKCkge1xuICAgICAgdmFyIGxhc3QgPSBEYXRlLm5vdygpIC0gdGltZXN0YW1wO1xuICAgICAgaWYgKGxhc3QgPCB3YWl0ICYmIGxhc3QgPj0gMCkge1xuICAgICAgICB0aW1lb3V0ID0gc2V0VGltZW91dChsYXRlciwgd2FpdCAtIGxhc3QpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGltZW91dCA9IG51bGw7XG4gICAgICAgIHJlc3VsdCA9IGZ1bmMuYXBwbHkoY29udGV4dCwgYXJncyk7XG4gICAgICAgIGlmICghdGltZW91dCkgY29udGV4dCA9IGFyZ3MgPSBudWxsO1xuICAgICAgfVxuICAgIH07XG4gICAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICAgIGNvbnRleHQgPSB0aGlzO1xuICAgICAgYXJncyA9IGFyZ3VtZW50cztcbiAgICAgIHRpbWVzdGFtcCA9IERhdGUubm93KCk7XG4gICAgICBpZiAoIXRpbWVvdXQpIHtcbiAgICAgICAgdGltZW91dCA9IHNldFRpbWVvdXQobGF0ZXIsIHdhaXQpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9O1xuICB9XG5cbiAgLyoqXG4gICAqIE1hbnVhbCBpbmRleE9mIGJlY2F1c2UgaXQncyBzbGlnaHRseSBmYXN0ZXIgdGhhblxuICAgKiBuYXRpdmUuXG4gICAqXG4gICAqIEBwYXJhbSB7QXJyYXl9IGFyclxuICAgKiBAcGFyYW0geyp9IG9ialxuICAgKi9cblxuICBmdW5jdGlvbiBpbmRleE9mKGFyciwgb2JqKSB7XG4gICAgdmFyIGkgPSBhcnIubGVuZ3RoO1xuICAgIHdoaWxlIChpLS0pIHtcbiAgICAgIGlmIChhcnJbaV0gPT09IG9iaikgcmV0dXJuIGk7XG4gICAgfVxuICAgIHJldHVybiAtMTtcbiAgfVxuXG4gIC8qKlxuICAgKiBNYWtlIGEgY2FuY2VsbGFibGUgdmVyc2lvbiBvZiBhbiBhc3luYyBjYWxsYmFjay5cbiAgICpcbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gZm5cbiAgICogQHJldHVybiB7RnVuY3Rpb259XG4gICAqL1xuXG4gIGZ1bmN0aW9uIGNhbmNlbGxhYmxlKGZuKSB7XG4gICAgdmFyIGNiID0gZnVuY3Rpb24gY2IoKSB7XG4gICAgICBpZiAoIWNiLmNhbmNlbGxlZCkge1xuICAgICAgICByZXR1cm4gZm4uYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICAgIH1cbiAgICB9O1xuICAgIGNiLmNhbmNlbCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIGNiLmNhbmNlbGxlZCA9IHRydWU7XG4gICAgfTtcbiAgICByZXR1cm4gY2I7XG4gIH1cblxuICAvKipcbiAgICogQ2hlY2sgaWYgdHdvIHZhbHVlcyBhcmUgbG9vc2VseSBlcXVhbCAtIHRoYXQgaXMsXG4gICAqIGlmIHRoZXkgYXJlIHBsYWluIG9iamVjdHMsIGRvIHRoZXkgaGF2ZSB0aGUgc2FtZSBzaGFwZT9cbiAgICpcbiAgICogQHBhcmFtIHsqfSBhXG4gICAqIEBwYXJhbSB7Kn0gYlxuICAgKiBAcmV0dXJuIHtCb29sZWFufVxuICAgKi9cblxuICBmdW5jdGlvbiBsb29zZUVxdWFsKGEsIGIpIHtcbiAgICAvKiBlc2xpbnQtZGlzYWJsZSBlcWVxZXEgKi9cbiAgICByZXR1cm4gYSA9PSBiIHx8IChpc09iamVjdChhKSAmJiBpc09iamVjdChiKSA/IEpTT04uc3RyaW5naWZ5KGEpID09PSBKU09OLnN0cmluZ2lmeShiKSA6IGZhbHNlKTtcbiAgICAvKiBlc2xpbnQtZW5hYmxlIGVxZXFlcSAqL1xuICB9XG5cbiAgdmFyIGhhc1Byb3RvID0gKCdfX3Byb3RvX18nIGluIHt9KTtcblxuICAvLyBCcm93c2VyIGVudmlyb25tZW50IHNuaWZmaW5nXG4gIHZhciBpbkJyb3dzZXIgPSB0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJyAmJiBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwod2luZG93KSAhPT0gJ1tvYmplY3QgT2JqZWN0XSc7XG5cbiAgLy8gZGV0ZWN0IGRldnRvb2xzXG4gIHZhciBkZXZ0b29scyA9IGluQnJvd3NlciAmJiB3aW5kb3cuX19WVUVfREVWVE9PTFNfR0xPQkFMX0hPT0tfXztcblxuICAvLyBVQSBzbmlmZmluZyBmb3Igd29ya2luZyBhcm91bmQgYnJvd3Nlci1zcGVjaWZpYyBxdWlya3NcbiAgdmFyIFVBID0gaW5Ccm93c2VyICYmIHdpbmRvdy5uYXZpZ2F0b3IudXNlckFnZW50LnRvTG93ZXJDYXNlKCk7XG4gIHZhciBpc0lFOSA9IFVBICYmIFVBLmluZGV4T2YoJ21zaWUgOS4wJykgPiAwO1xuICB2YXIgaXNBbmRyb2lkID0gVUEgJiYgVUEuaW5kZXhPZignYW5kcm9pZCcpID4gMDtcbiAgdmFyIGlzSW9zID0gVUEgJiYgLyhpcGhvbmV8aXBhZHxpcG9kfGlvcykvaS50ZXN0KFVBKTtcbiAgdmFyIGlzV2VjaGF0ID0gVUEgJiYgVUEuaW5kZXhPZignbWljcm9tZXNzZW5nZXInKSA+IDA7XG5cbiAgdmFyIHRyYW5zaXRpb25Qcm9wID0gdW5kZWZpbmVkO1xuICB2YXIgdHJhbnNpdGlvbkVuZEV2ZW50ID0gdW5kZWZpbmVkO1xuICB2YXIgYW5pbWF0aW9uUHJvcCA9IHVuZGVmaW5lZDtcbiAgdmFyIGFuaW1hdGlvbkVuZEV2ZW50ID0gdW5kZWZpbmVkO1xuXG4gIC8vIFRyYW5zaXRpb24gcHJvcGVydHkvZXZlbnQgc25pZmZpbmdcbiAgaWYgKGluQnJvd3NlciAmJiAhaXNJRTkpIHtcbiAgICB2YXIgaXNXZWJraXRUcmFucyA9IHdpbmRvdy5vbnRyYW5zaXRpb25lbmQgPT09IHVuZGVmaW5lZCAmJiB3aW5kb3cub253ZWJraXR0cmFuc2l0aW9uZW5kICE9PSB1bmRlZmluZWQ7XG4gICAgdmFyIGlzV2Via2l0QW5pbSA9IHdpbmRvdy5vbmFuaW1hdGlvbmVuZCA9PT0gdW5kZWZpbmVkICYmIHdpbmRvdy5vbndlYmtpdGFuaW1hdGlvbmVuZCAhPT0gdW5kZWZpbmVkO1xuICAgIHRyYW5zaXRpb25Qcm9wID0gaXNXZWJraXRUcmFucyA/ICdXZWJraXRUcmFuc2l0aW9uJyA6ICd0cmFuc2l0aW9uJztcbiAgICB0cmFuc2l0aW9uRW5kRXZlbnQgPSBpc1dlYmtpdFRyYW5zID8gJ3dlYmtpdFRyYW5zaXRpb25FbmQnIDogJ3RyYW5zaXRpb25lbmQnO1xuICAgIGFuaW1hdGlvblByb3AgPSBpc1dlYmtpdEFuaW0gPyAnV2Via2l0QW5pbWF0aW9uJyA6ICdhbmltYXRpb24nO1xuICAgIGFuaW1hdGlvbkVuZEV2ZW50ID0gaXNXZWJraXRBbmltID8gJ3dlYmtpdEFuaW1hdGlvbkVuZCcgOiAnYW5pbWF0aW9uZW5kJztcbiAgfVxuXG4gIC8qKlxuICAgKiBEZWZlciBhIHRhc2sgdG8gZXhlY3V0ZSBpdCBhc3luY2hyb25vdXNseS4gSWRlYWxseSB0aGlzXG4gICAqIHNob3VsZCBiZSBleGVjdXRlZCBhcyBhIG1pY3JvdGFzaywgc28gd2UgbGV2ZXJhZ2VcbiAgICogTXV0YXRpb25PYnNlcnZlciBpZiBpdCdzIGF2YWlsYWJsZSwgYW5kIGZhbGxiYWNrIHRvXG4gICAqIHNldFRpbWVvdXQoMCkuXG4gICAqXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IGNiXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBjdHhcbiAgICovXG5cbiAgdmFyIG5leHRUaWNrID0gKGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgY2FsbGJhY2tzID0gW107XG4gICAgdmFyIHBlbmRpbmcgPSBmYWxzZTtcbiAgICB2YXIgdGltZXJGdW5jO1xuICAgIGZ1bmN0aW9uIG5leHRUaWNrSGFuZGxlcigpIHtcbiAgICAgIHBlbmRpbmcgPSBmYWxzZTtcbiAgICAgIHZhciBjb3BpZXMgPSBjYWxsYmFja3Muc2xpY2UoMCk7XG4gICAgICBjYWxsYmFja3MgPSBbXTtcbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgY29waWVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGNvcGllc1tpXSgpO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBpZiAqL1xuICAgIGlmICh0eXBlb2YgTXV0YXRpb25PYnNlcnZlciAhPT0gJ3VuZGVmaW5lZCcgJiYgIShpc1dlY2hhdCAmJiBpc0lvcykpIHtcbiAgICAgIHZhciBjb3VudGVyID0gMTtcbiAgICAgIHZhciBvYnNlcnZlciA9IG5ldyBNdXRhdGlvbk9ic2VydmVyKG5leHRUaWNrSGFuZGxlcik7XG4gICAgICB2YXIgdGV4dE5vZGUgPSBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShjb3VudGVyKTtcbiAgICAgIG9ic2VydmVyLm9ic2VydmUodGV4dE5vZGUsIHtcbiAgICAgICAgY2hhcmFjdGVyRGF0YTogdHJ1ZVxuICAgICAgfSk7XG4gICAgICB0aW1lckZ1bmMgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGNvdW50ZXIgPSAoY291bnRlciArIDEpICUgMjtcbiAgICAgICAgdGV4dE5vZGUuZGF0YSA9IGNvdW50ZXI7XG4gICAgICB9O1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyB3ZWJwYWNrIGF0dGVtcHRzIHRvIGluamVjdCBhIHNoaW0gZm9yIHNldEltbWVkaWF0ZVxuICAgICAgLy8gaWYgaXQgaXMgdXNlZCBhcyBhIGdsb2JhbCwgc28gd2UgaGF2ZSB0byB3b3JrIGFyb3VuZCB0aGF0IHRvXG4gICAgICAvLyBhdm9pZCBidW5kbGluZyB1bm5lY2Vzc2FyeSBjb2RlLlxuICAgICAgdmFyIGNvbnRleHQgPSBpbkJyb3dzZXIgPyB3aW5kb3cgOiB0eXBlb2YgZ2xvYmFsICE9PSAndW5kZWZpbmVkJyA/IGdsb2JhbCA6IHt9O1xuICAgICAgdGltZXJGdW5jID0gY29udGV4dC5zZXRJbW1lZGlhdGUgfHwgc2V0VGltZW91dDtcbiAgICB9XG4gICAgcmV0dXJuIGZ1bmN0aW9uIChjYiwgY3R4KSB7XG4gICAgICB2YXIgZnVuYyA9IGN0eCA/IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgY2IuY2FsbChjdHgpO1xuICAgICAgfSA6IGNiO1xuICAgICAgY2FsbGJhY2tzLnB1c2goZnVuYyk7XG4gICAgICBpZiAocGVuZGluZykgcmV0dXJuO1xuICAgICAgcGVuZGluZyA9IHRydWU7XG4gICAgICB0aW1lckZ1bmMobmV4dFRpY2tIYW5kbGVyLCAwKTtcbiAgICB9O1xuICB9KSgpO1xuXG4gIHZhciBfU2V0ID0gdW5kZWZpbmVkO1xuICAvKiBpc3RhbmJ1bCBpZ25vcmUgaWYgKi9cbiAgaWYgKHR5cGVvZiBTZXQgIT09ICd1bmRlZmluZWQnICYmIFNldC50b1N0cmluZygpLm1hdGNoKC9uYXRpdmUgY29kZS8pKSB7XG4gICAgLy8gdXNlIG5hdGl2ZSBTZXQgd2hlbiBhdmFpbGFibGUuXG4gICAgX1NldCA9IFNldDtcbiAgfSBlbHNlIHtcbiAgICAvLyBhIG5vbi1zdGFuZGFyZCBTZXQgcG9seWZpbGwgdGhhdCBvbmx5IHdvcmtzIHdpdGggcHJpbWl0aXZlIGtleXMuXG4gICAgX1NldCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIHRoaXMuc2V0ID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiAgICB9O1xuICAgIF9TZXQucHJvdG90eXBlLmhhcyA9IGZ1bmN0aW9uIChrZXkpIHtcbiAgICAgIHJldHVybiB0aGlzLnNldFtrZXldICE9PSB1bmRlZmluZWQ7XG4gICAgfTtcbiAgICBfU2V0LnByb3RvdHlwZS5hZGQgPSBmdW5jdGlvbiAoa2V5KSB7XG4gICAgICB0aGlzLnNldFtrZXldID0gMTtcbiAgICB9O1xuICAgIF9TZXQucHJvdG90eXBlLmNsZWFyID0gZnVuY3Rpb24gKCkge1xuICAgICAgdGhpcy5zZXQgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuICAgIH07XG4gIH1cblxuICBmdW5jdGlvbiBDYWNoZShsaW1pdCkge1xuICAgIHRoaXMuc2l6ZSA9IDA7XG4gICAgdGhpcy5saW1pdCA9IGxpbWl0O1xuICAgIHRoaXMuaGVhZCA9IHRoaXMudGFpbCA9IHVuZGVmaW5lZDtcbiAgICB0aGlzLl9rZXltYXAgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuICB9XG5cbiAgdmFyIHAgPSBDYWNoZS5wcm90b3R5cGU7XG5cbiAgLyoqXG4gICAqIFB1dCA8dmFsdWU+IGludG8gdGhlIGNhY2hlIGFzc29jaWF0ZWQgd2l0aCA8a2V5Pi5cbiAgICogUmV0dXJucyB0aGUgZW50cnkgd2hpY2ggd2FzIHJlbW92ZWQgdG8gbWFrZSByb29tIGZvclxuICAgKiB0aGUgbmV3IGVudHJ5LiBPdGhlcndpc2UgdW5kZWZpbmVkIGlzIHJldHVybmVkLlxuICAgKiAoaS5lLiBpZiB0aGVyZSB3YXMgZW5vdWdoIHJvb20gYWxyZWFkeSkuXG4gICAqXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBrZXlcbiAgICogQHBhcmFtIHsqfSB2YWx1ZVxuICAgKiBAcmV0dXJuIHtFbnRyeXx1bmRlZmluZWR9XG4gICAqL1xuXG4gIHAucHV0ID0gZnVuY3Rpb24gKGtleSwgdmFsdWUpIHtcbiAgICB2YXIgcmVtb3ZlZDtcbiAgICBpZiAodGhpcy5zaXplID09PSB0aGlzLmxpbWl0KSB7XG4gICAgICByZW1vdmVkID0gdGhpcy5zaGlmdCgpO1xuICAgIH1cblxuICAgIHZhciBlbnRyeSA9IHRoaXMuZ2V0KGtleSwgdHJ1ZSk7XG4gICAgaWYgKCFlbnRyeSkge1xuICAgICAgZW50cnkgPSB7XG4gICAgICAgIGtleToga2V5XG4gICAgICB9O1xuICAgICAgdGhpcy5fa2V5bWFwW2tleV0gPSBlbnRyeTtcbiAgICAgIGlmICh0aGlzLnRhaWwpIHtcbiAgICAgICAgdGhpcy50YWlsLm5ld2VyID0gZW50cnk7XG4gICAgICAgIGVudHJ5Lm9sZGVyID0gdGhpcy50YWlsO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5oZWFkID0gZW50cnk7XG4gICAgICB9XG4gICAgICB0aGlzLnRhaWwgPSBlbnRyeTtcbiAgICAgIHRoaXMuc2l6ZSsrO1xuICAgIH1cbiAgICBlbnRyeS52YWx1ZSA9IHZhbHVlO1xuXG4gICAgcmV0dXJuIHJlbW92ZWQ7XG4gIH07XG5cbiAgLyoqXG4gICAqIFB1cmdlIHRoZSBsZWFzdCByZWNlbnRseSB1c2VkIChvbGRlc3QpIGVudHJ5IGZyb20gdGhlXG4gICAqIGNhY2hlLiBSZXR1cm5zIHRoZSByZW1vdmVkIGVudHJ5IG9yIHVuZGVmaW5lZCBpZiB0aGVcbiAgICogY2FjaGUgd2FzIGVtcHR5LlxuICAgKi9cblxuICBwLnNoaWZ0ID0gZnVuY3Rpb24gKCkge1xuICAgIHZhciBlbnRyeSA9IHRoaXMuaGVhZDtcbiAgICBpZiAoZW50cnkpIHtcbiAgICAgIHRoaXMuaGVhZCA9IHRoaXMuaGVhZC5uZXdlcjtcbiAgICAgIHRoaXMuaGVhZC5vbGRlciA9IHVuZGVmaW5lZDtcbiAgICAgIGVudHJ5Lm5ld2VyID0gZW50cnkub2xkZXIgPSB1bmRlZmluZWQ7XG4gICAgICB0aGlzLl9rZXltYXBbZW50cnkua2V5XSA9IHVuZGVmaW5lZDtcbiAgICAgIHRoaXMuc2l6ZS0tO1xuICAgIH1cbiAgICByZXR1cm4gZW50cnk7XG4gIH07XG5cbiAgLyoqXG4gICAqIEdldCBhbmQgcmVnaXN0ZXIgcmVjZW50IHVzZSBvZiA8a2V5Pi4gUmV0dXJucyB0aGUgdmFsdWVcbiAgICogYXNzb2NpYXRlZCB3aXRoIDxrZXk+IG9yIHVuZGVmaW5lZCBpZiBub3QgaW4gY2FjaGUuXG4gICAqXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBrZXlcbiAgICogQHBhcmFtIHtCb29sZWFufSByZXR1cm5FbnRyeVxuICAgKiBAcmV0dXJuIHtFbnRyeXwqfVxuICAgKi9cblxuICBwLmdldCA9IGZ1bmN0aW9uIChrZXksIHJldHVybkVudHJ5KSB7XG4gICAgdmFyIGVudHJ5ID0gdGhpcy5fa2V5bWFwW2tleV07XG4gICAgaWYgKGVudHJ5ID09PSB1bmRlZmluZWQpIHJldHVybjtcbiAgICBpZiAoZW50cnkgPT09IHRoaXMudGFpbCkge1xuICAgICAgcmV0dXJuIHJldHVybkVudHJ5ID8gZW50cnkgOiBlbnRyeS52YWx1ZTtcbiAgICB9XG4gICAgLy8gSEVBRC0tLS0tLS0tLS0tLS0tVEFJTFxuICAgIC8vICAgPC5vbGRlciAgIC5uZXdlcj5cbiAgICAvLyAgPC0tLSBhZGQgZGlyZWN0aW9uIC0tXG4gICAgLy8gICBBICBCICBDICA8RD4gIEVcbiAgICBpZiAoZW50cnkubmV3ZXIpIHtcbiAgICAgIGlmIChlbnRyeSA9PT0gdGhpcy5oZWFkKSB7XG4gICAgICAgIHRoaXMuaGVhZCA9IGVudHJ5Lm5ld2VyO1xuICAgICAgfVxuICAgICAgZW50cnkubmV3ZXIub2xkZXIgPSBlbnRyeS5vbGRlcjsgLy8gQyA8LS0gRS5cbiAgICB9XG4gICAgaWYgKGVudHJ5Lm9sZGVyKSB7XG4gICAgICBlbnRyeS5vbGRlci5uZXdlciA9IGVudHJ5Lm5ld2VyOyAvLyBDLiAtLT4gRVxuICAgIH1cbiAgICBlbnRyeS5uZXdlciA9IHVuZGVmaW5lZDsgLy8gRCAtLXhcbiAgICBlbnRyeS5vbGRlciA9IHRoaXMudGFpbDsgLy8gRC4gLS0+IEVcbiAgICBpZiAodGhpcy50YWlsKSB7XG4gICAgICB0aGlzLnRhaWwubmV3ZXIgPSBlbnRyeTsgLy8gRS4gPC0tIERcbiAgICB9XG4gICAgdGhpcy50YWlsID0gZW50cnk7XG4gICAgcmV0dXJuIHJldHVybkVudHJ5ID8gZW50cnkgOiBlbnRyeS52YWx1ZTtcbiAgfTtcblxuICB2YXIgY2FjaGUkMSA9IG5ldyBDYWNoZSgxMDAwKTtcbiAgdmFyIGZpbHRlclRva2VuUkUgPSAvW15cXHMnXCJdK3wnW14nXSonfFwiW15cIl0qXCIvZztcbiAgdmFyIHJlc2VydmVkQXJnUkUgPSAvXmluJHxeLT9cXGQrLztcblxuICAvKipcbiAgICogUGFyc2VyIHN0YXRlXG4gICAqL1xuXG4gIHZhciBzdHI7XG4gIHZhciBkaXI7XG4gIHZhciBjO1xuICB2YXIgcHJldjtcbiAgdmFyIGk7XG4gIHZhciBsO1xuICB2YXIgbGFzdEZpbHRlckluZGV4O1xuICB2YXIgaW5TaW5nbGU7XG4gIHZhciBpbkRvdWJsZTtcbiAgdmFyIGN1cmx5O1xuICB2YXIgc3F1YXJlO1xuICB2YXIgcGFyZW47XG4gIC8qKlxuICAgKiBQdXNoIGEgZmlsdGVyIHRvIHRoZSBjdXJyZW50IGRpcmVjdGl2ZSBvYmplY3RcbiAgICovXG5cbiAgZnVuY3Rpb24gcHVzaEZpbHRlcigpIHtcbiAgICB2YXIgZXhwID0gc3RyLnNsaWNlKGxhc3RGaWx0ZXJJbmRleCwgaSkudHJpbSgpO1xuICAgIHZhciBmaWx0ZXI7XG4gICAgaWYgKGV4cCkge1xuICAgICAgZmlsdGVyID0ge307XG4gICAgICB2YXIgdG9rZW5zID0gZXhwLm1hdGNoKGZpbHRlclRva2VuUkUpO1xuICAgICAgZmlsdGVyLm5hbWUgPSB0b2tlbnNbMF07XG4gICAgICBpZiAodG9rZW5zLmxlbmd0aCA+IDEpIHtcbiAgICAgICAgZmlsdGVyLmFyZ3MgPSB0b2tlbnMuc2xpY2UoMSkubWFwKHByb2Nlc3NGaWx0ZXJBcmcpO1xuICAgICAgfVxuICAgIH1cbiAgICBpZiAoZmlsdGVyKSB7XG4gICAgICAoZGlyLmZpbHRlcnMgPSBkaXIuZmlsdGVycyB8fCBbXSkucHVzaChmaWx0ZXIpO1xuICAgIH1cbiAgICBsYXN0RmlsdGVySW5kZXggPSBpICsgMTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDaGVjayBpZiBhbiBhcmd1bWVudCBpcyBkeW5hbWljIGFuZCBzdHJpcCBxdW90ZXMuXG4gICAqXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBhcmdcbiAgICogQHJldHVybiB7T2JqZWN0fVxuICAgKi9cblxuICBmdW5jdGlvbiBwcm9jZXNzRmlsdGVyQXJnKGFyZykge1xuICAgIGlmIChyZXNlcnZlZEFyZ1JFLnRlc3QoYXJnKSkge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgdmFsdWU6IHRvTnVtYmVyKGFyZyksXG4gICAgICAgIGR5bmFtaWM6IGZhbHNlXG4gICAgICB9O1xuICAgIH0gZWxzZSB7XG4gICAgICB2YXIgc3RyaXBwZWQgPSBzdHJpcFF1b3RlcyhhcmcpO1xuICAgICAgdmFyIGR5bmFtaWMgPSBzdHJpcHBlZCA9PT0gYXJnO1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgdmFsdWU6IGR5bmFtaWMgPyBhcmcgOiBzdHJpcHBlZCxcbiAgICAgICAgZHluYW1pYzogZHluYW1pY1xuICAgICAgfTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogUGFyc2UgYSBkaXJlY3RpdmUgdmFsdWUgYW5kIGV4dHJhY3QgdGhlIGV4cHJlc3Npb25cbiAgICogYW5kIGl0cyBmaWx0ZXJzIGludG8gYSBkZXNjcmlwdG9yLlxuICAgKlxuICAgKiBFeGFtcGxlOlxuICAgKlxuICAgKiBcImEgKyAxIHwgdXBwZXJjYXNlXCIgd2lsbCB5aWVsZDpcbiAgICoge1xuICAgKiAgIGV4cHJlc3Npb246ICdhICsgMScsXG4gICAqICAgZmlsdGVyczogW1xuICAgKiAgICAgeyBuYW1lOiAndXBwZXJjYXNlJywgYXJnczogbnVsbCB9XG4gICAqICAgXVxuICAgKiB9XG4gICAqXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBzXG4gICAqIEByZXR1cm4ge09iamVjdH1cbiAgICovXG5cbiAgZnVuY3Rpb24gcGFyc2VEaXJlY3RpdmUocykge1xuICAgIHZhciBoaXQgPSBjYWNoZSQxLmdldChzKTtcbiAgICBpZiAoaGl0KSB7XG4gICAgICByZXR1cm4gaGl0O1xuICAgIH1cblxuICAgIC8vIHJlc2V0IHBhcnNlciBzdGF0ZVxuICAgIHN0ciA9IHM7XG4gICAgaW5TaW5nbGUgPSBpbkRvdWJsZSA9IGZhbHNlO1xuICAgIGN1cmx5ID0gc3F1YXJlID0gcGFyZW4gPSAwO1xuICAgIGxhc3RGaWx0ZXJJbmRleCA9IDA7XG4gICAgZGlyID0ge307XG5cbiAgICBmb3IgKGkgPSAwLCBsID0gc3RyLmxlbmd0aDsgaSA8IGw7IGkrKykge1xuICAgICAgcHJldiA9IGM7XG4gICAgICBjID0gc3RyLmNoYXJDb2RlQXQoaSk7XG4gICAgICBpZiAoaW5TaW5nbGUpIHtcbiAgICAgICAgLy8gY2hlY2sgc2luZ2xlIHF1b3RlXG4gICAgICAgIGlmIChjID09PSAweDI3ICYmIHByZXYgIT09IDB4NUMpIGluU2luZ2xlID0gIWluU2luZ2xlO1xuICAgICAgfSBlbHNlIGlmIChpbkRvdWJsZSkge1xuICAgICAgICAvLyBjaGVjayBkb3VibGUgcXVvdGVcbiAgICAgICAgaWYgKGMgPT09IDB4MjIgJiYgcHJldiAhPT0gMHg1QykgaW5Eb3VibGUgPSAhaW5Eb3VibGU7XG4gICAgICB9IGVsc2UgaWYgKGMgPT09IDB4N0MgJiYgLy8gcGlwZVxuICAgICAgc3RyLmNoYXJDb2RlQXQoaSArIDEpICE9PSAweDdDICYmIHN0ci5jaGFyQ29kZUF0KGkgLSAxKSAhPT0gMHg3Qykge1xuICAgICAgICBpZiAoZGlyLmV4cHJlc3Npb24gPT0gbnVsbCkge1xuICAgICAgICAgIC8vIGZpcnN0IGZpbHRlciwgZW5kIG9mIGV4cHJlc3Npb25cbiAgICAgICAgICBsYXN0RmlsdGVySW5kZXggPSBpICsgMTtcbiAgICAgICAgICBkaXIuZXhwcmVzc2lvbiA9IHN0ci5zbGljZSgwLCBpKS50cmltKCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgLy8gYWxyZWFkeSBoYXMgZmlsdGVyXG4gICAgICAgICAgcHVzaEZpbHRlcigpO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBzd2l0Y2ggKGMpIHtcbiAgICAgICAgICBjYXNlIDB4MjI6XG4gICAgICAgICAgICBpbkRvdWJsZSA9IHRydWU7YnJlYWs7IC8vIFwiXG4gICAgICAgICAgY2FzZSAweDI3OlxuICAgICAgICAgICAgaW5TaW5nbGUgPSB0cnVlO2JyZWFrOyAvLyAnXG4gICAgICAgICAgY2FzZSAweDI4OlxuICAgICAgICAgICAgcGFyZW4rKzticmVhazsgLy8gKFxuICAgICAgICAgIGNhc2UgMHgyOTpcbiAgICAgICAgICAgIHBhcmVuLS07YnJlYWs7IC8vIClcbiAgICAgICAgICBjYXNlIDB4NUI6XG4gICAgICAgICAgICBzcXVhcmUrKzticmVhazsgLy8gW1xuICAgICAgICAgIGNhc2UgMHg1RDpcbiAgICAgICAgICAgIHNxdWFyZS0tO2JyZWFrOyAvLyBdXG4gICAgICAgICAgY2FzZSAweDdCOlxuICAgICAgICAgICAgY3VybHkrKzticmVhazsgLy8ge1xuICAgICAgICAgIGNhc2UgMHg3RDpcbiAgICAgICAgICAgIGN1cmx5LS07YnJlYWs7IC8vIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChkaXIuZXhwcmVzc2lvbiA9PSBudWxsKSB7XG4gICAgICBkaXIuZXhwcmVzc2lvbiA9IHN0ci5zbGljZSgwLCBpKS50cmltKCk7XG4gICAgfSBlbHNlIGlmIChsYXN0RmlsdGVySW5kZXggIT09IDApIHtcbiAgICAgIHB1c2hGaWx0ZXIoKTtcbiAgICB9XG5cbiAgICBjYWNoZSQxLnB1dChzLCBkaXIpO1xuICAgIHJldHVybiBkaXI7XG4gIH1cblxudmFyIGRpcmVjdGl2ZSA9IE9iamVjdC5mcmVlemUoe1xuICAgIHBhcnNlRGlyZWN0aXZlOiBwYXJzZURpcmVjdGl2ZVxuICB9KTtcblxuICB2YXIgcmVnZXhFc2NhcGVSRSA9IC9bLS4qKz9eJHt9KCl8W1xcXVxcL1xcXFxdL2c7XG4gIHZhciBjYWNoZSA9IHVuZGVmaW5lZDtcbiAgdmFyIHRhZ1JFID0gdW5kZWZpbmVkO1xuICB2YXIgaHRtbFJFID0gdW5kZWZpbmVkO1xuICAvKipcbiAgICogRXNjYXBlIGEgc3RyaW5nIHNvIGl0IGNhbiBiZSB1c2VkIGluIGEgUmVnRXhwXG4gICAqIGNvbnN0cnVjdG9yLlxuICAgKlxuICAgKiBAcGFyYW0ge1N0cmluZ30gc3RyXG4gICAqL1xuXG4gIGZ1bmN0aW9uIGVzY2FwZVJlZ2V4KHN0cikge1xuICAgIHJldHVybiBzdHIucmVwbGFjZShyZWdleEVzY2FwZVJFLCAnXFxcXCQmJyk7XG4gIH1cblxuICBmdW5jdGlvbiBjb21waWxlUmVnZXgoKSB7XG4gICAgdmFyIG9wZW4gPSBlc2NhcGVSZWdleChjb25maWcuZGVsaW1pdGVyc1swXSk7XG4gICAgdmFyIGNsb3NlID0gZXNjYXBlUmVnZXgoY29uZmlnLmRlbGltaXRlcnNbMV0pO1xuICAgIHZhciB1bnNhZmVPcGVuID0gZXNjYXBlUmVnZXgoY29uZmlnLnVuc2FmZURlbGltaXRlcnNbMF0pO1xuICAgIHZhciB1bnNhZmVDbG9zZSA9IGVzY2FwZVJlZ2V4KGNvbmZpZy51bnNhZmVEZWxpbWl0ZXJzWzFdKTtcbiAgICB0YWdSRSA9IG5ldyBSZWdFeHAodW5zYWZlT3BlbiArICcoKD86LnxcXFxcbikrPyknICsgdW5zYWZlQ2xvc2UgKyAnfCcgKyBvcGVuICsgJygoPzoufFxcXFxuKSs/KScgKyBjbG9zZSwgJ2cnKTtcbiAgICBodG1sUkUgPSBuZXcgUmVnRXhwKCdeJyArIHVuc2FmZU9wZW4gKyAnLionICsgdW5zYWZlQ2xvc2UgKyAnJCcpO1xuICAgIC8vIHJlc2V0IGNhY2hlXG4gICAgY2FjaGUgPSBuZXcgQ2FjaGUoMTAwMCk7XG4gIH1cblxuICAvKipcbiAgICogUGFyc2UgYSB0ZW1wbGF0ZSB0ZXh0IHN0cmluZyBpbnRvIGFuIGFycmF5IG9mIHRva2Vucy5cbiAgICpcbiAgICogQHBhcmFtIHtTdHJpbmd9IHRleHRcbiAgICogQHJldHVybiB7QXJyYXk8T2JqZWN0PiB8IG51bGx9XG4gICAqICAgICAgICAgICAgICAgLSB7U3RyaW5nfSB0eXBlXG4gICAqICAgICAgICAgICAgICAgLSB7U3RyaW5nfSB2YWx1ZVxuICAgKiAgICAgICAgICAgICAgIC0ge0Jvb2xlYW59IFtodG1sXVxuICAgKiAgICAgICAgICAgICAgIC0ge0Jvb2xlYW59IFtvbmVUaW1lXVxuICAgKi9cblxuICBmdW5jdGlvbiBwYXJzZVRleHQodGV4dCkge1xuICAgIGlmICghY2FjaGUpIHtcbiAgICAgIGNvbXBpbGVSZWdleCgpO1xuICAgIH1cbiAgICB2YXIgaGl0ID0gY2FjaGUuZ2V0KHRleHQpO1xuICAgIGlmIChoaXQpIHtcbiAgICAgIHJldHVybiBoaXQ7XG4gICAgfVxuICAgIGlmICghdGFnUkUudGVzdCh0ZXh0KSkge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIHZhciB0b2tlbnMgPSBbXTtcbiAgICB2YXIgbGFzdEluZGV4ID0gdGFnUkUubGFzdEluZGV4ID0gMDtcbiAgICB2YXIgbWF0Y2gsIGluZGV4LCBodG1sLCB2YWx1ZSwgZmlyc3QsIG9uZVRpbWU7XG4gICAgLyogZXNsaW50LWRpc2FibGUgbm8tY29uZC1hc3NpZ24gKi9cbiAgICB3aGlsZSAobWF0Y2ggPSB0YWdSRS5leGVjKHRleHQpKSB7XG4gICAgICAvKiBlc2xpbnQtZW5hYmxlIG5vLWNvbmQtYXNzaWduICovXG4gICAgICBpbmRleCA9IG1hdGNoLmluZGV4O1xuICAgICAgLy8gcHVzaCB0ZXh0IHRva2VuXG4gICAgICBpZiAoaW5kZXggPiBsYXN0SW5kZXgpIHtcbiAgICAgICAgdG9rZW5zLnB1c2goe1xuICAgICAgICAgIHZhbHVlOiB0ZXh0LnNsaWNlKGxhc3RJbmRleCwgaW5kZXgpXG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgICAgLy8gdGFnIHRva2VuXG4gICAgICBodG1sID0gaHRtbFJFLnRlc3QobWF0Y2hbMF0pO1xuICAgICAgdmFsdWUgPSBodG1sID8gbWF0Y2hbMV0gOiBtYXRjaFsyXTtcbiAgICAgIGZpcnN0ID0gdmFsdWUuY2hhckNvZGVBdCgwKTtcbiAgICAgIG9uZVRpbWUgPSBmaXJzdCA9PT0gNDI7IC8vICpcbiAgICAgIHZhbHVlID0gb25lVGltZSA/IHZhbHVlLnNsaWNlKDEpIDogdmFsdWU7XG4gICAgICB0b2tlbnMucHVzaCh7XG4gICAgICAgIHRhZzogdHJ1ZSxcbiAgICAgICAgdmFsdWU6IHZhbHVlLnRyaW0oKSxcbiAgICAgICAgaHRtbDogaHRtbCxcbiAgICAgICAgb25lVGltZTogb25lVGltZVxuICAgICAgfSk7XG4gICAgICBsYXN0SW5kZXggPSBpbmRleCArIG1hdGNoWzBdLmxlbmd0aDtcbiAgICB9XG4gICAgaWYgKGxhc3RJbmRleCA8IHRleHQubGVuZ3RoKSB7XG4gICAgICB0b2tlbnMucHVzaCh7XG4gICAgICAgIHZhbHVlOiB0ZXh0LnNsaWNlKGxhc3RJbmRleClcbiAgICAgIH0pO1xuICAgIH1cbiAgICBjYWNoZS5wdXQodGV4dCwgdG9rZW5zKTtcbiAgICByZXR1cm4gdG9rZW5zO1xuICB9XG5cbiAgLyoqXG4gICAqIEZvcm1hdCBhIGxpc3Qgb2YgdG9rZW5zIGludG8gYW4gZXhwcmVzc2lvbi5cbiAgICogZS5nLiB0b2tlbnMgcGFyc2VkIGZyb20gJ2Ege3tifX0gYycgY2FuIGJlIHNlcmlhbGl6ZWRcbiAgICogaW50byBvbmUgc2luZ2xlIGV4cHJlc3Npb24gYXMgJ1wiYSBcIiArIGIgKyBcIiBjXCInLlxuICAgKlxuICAgKiBAcGFyYW0ge0FycmF5fSB0b2tlbnNcbiAgICogQHBhcmFtIHtWdWV9IFt2bV1cbiAgICogQHJldHVybiB7U3RyaW5nfVxuICAgKi9cblxuICBmdW5jdGlvbiB0b2tlbnNUb0V4cCh0b2tlbnMsIHZtKSB7XG4gICAgaWYgKHRva2Vucy5sZW5ndGggPiAxKSB7XG4gICAgICByZXR1cm4gdG9rZW5zLm1hcChmdW5jdGlvbiAodG9rZW4pIHtcbiAgICAgICAgcmV0dXJuIGZvcm1hdFRva2VuKHRva2VuLCB2bSk7XG4gICAgICB9KS5qb2luKCcrJyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBmb3JtYXRUb2tlbih0b2tlbnNbMF0sIHZtLCB0cnVlKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogRm9ybWF0IGEgc2luZ2xlIHRva2VuLlxuICAgKlxuICAgKiBAcGFyYW0ge09iamVjdH0gdG9rZW5cbiAgICogQHBhcmFtIHtWdWV9IFt2bV1cbiAgICogQHBhcmFtIHtCb29sZWFufSBbc2luZ2xlXVxuICAgKiBAcmV0dXJuIHtTdHJpbmd9XG4gICAqL1xuXG4gIGZ1bmN0aW9uIGZvcm1hdFRva2VuKHRva2VuLCB2bSwgc2luZ2xlKSB7XG4gICAgcmV0dXJuIHRva2VuLnRhZyA/IHRva2VuLm9uZVRpbWUgJiYgdm0gPyAnXCInICsgdm0uJGV2YWwodG9rZW4udmFsdWUpICsgJ1wiJyA6IGlubGluZUZpbHRlcnModG9rZW4udmFsdWUsIHNpbmdsZSkgOiAnXCInICsgdG9rZW4udmFsdWUgKyAnXCInO1xuICB9XG5cbiAgLyoqXG4gICAqIEZvciBhbiBhdHRyaWJ1dGUgd2l0aCBtdWx0aXBsZSBpbnRlcnBvbGF0aW9uIHRhZ3MsXG4gICAqIGUuZy4gYXR0cj1cInNvbWUte3t0aGluZyB8IGZpbHRlcn19XCIsIGluIG9yZGVyIHRvIGNvbWJpbmVcbiAgICogdGhlIHdob2xlIHRoaW5nIGludG8gYSBzaW5nbGUgd2F0Y2hhYmxlIGV4cHJlc3Npb24sIHdlXG4gICAqIGhhdmUgdG8gaW5saW5lIHRob3NlIGZpbHRlcnMuIFRoaXMgZnVuY3Rpb24gZG9lcyBleGFjdGx5XG4gICAqIHRoYXQuIFRoaXMgaXMgYSBiaXQgaGFja3kgYnV0IGl0IGF2b2lkcyBoZWF2eSBjaGFuZ2VzXG4gICAqIHRvIGRpcmVjdGl2ZSBwYXJzZXIgYW5kIHdhdGNoZXIgbWVjaGFuaXNtLlxuICAgKlxuICAgKiBAcGFyYW0ge1N0cmluZ30gZXhwXG4gICAqIEBwYXJhbSB7Qm9vbGVhbn0gc2luZ2xlXG4gICAqIEByZXR1cm4ge1N0cmluZ31cbiAgICovXG5cbiAgdmFyIGZpbHRlclJFID0gL1tefF1cXHxbXnxdLztcbiAgZnVuY3Rpb24gaW5saW5lRmlsdGVycyhleHAsIHNpbmdsZSkge1xuICAgIGlmICghZmlsdGVyUkUudGVzdChleHApKSB7XG4gICAgICByZXR1cm4gc2luZ2xlID8gZXhwIDogJygnICsgZXhwICsgJyknO1xuICAgIH0gZWxzZSB7XG4gICAgICB2YXIgZGlyID0gcGFyc2VEaXJlY3RpdmUoZXhwKTtcbiAgICAgIGlmICghZGlyLmZpbHRlcnMpIHtcbiAgICAgICAgcmV0dXJuICcoJyArIGV4cCArICcpJztcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiAndGhpcy5fYXBwbHlGaWx0ZXJzKCcgKyBkaXIuZXhwcmVzc2lvbiArIC8vIHZhbHVlXG4gICAgICAgICcsbnVsbCwnICsgLy8gb2xkVmFsdWUgKG51bGwgZm9yIHJlYWQpXG4gICAgICAgIEpTT04uc3RyaW5naWZ5KGRpci5maWx0ZXJzKSArIC8vIGZpbHRlciBkZXNjcmlwdG9yc1xuICAgICAgICAnLGZhbHNlKSc7IC8vIHdyaXRlP1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG52YXIgdGV4dCA9IE9iamVjdC5mcmVlemUoe1xuICAgIGNvbXBpbGVSZWdleDogY29tcGlsZVJlZ2V4LFxuICAgIHBhcnNlVGV4dDogcGFyc2VUZXh0LFxuICAgIHRva2Vuc1RvRXhwOiB0b2tlbnNUb0V4cFxuICB9KTtcblxuICB2YXIgZGVsaW1pdGVycyA9IFsne3snLCAnfX0nXTtcbiAgdmFyIHVuc2FmZURlbGltaXRlcnMgPSBbJ3t7eycsICd9fX0nXTtcblxuICB2YXIgY29uZmlnID0gT2JqZWN0LmRlZmluZVByb3BlcnRpZXMoe1xuXG4gICAgLyoqXG4gICAgICogV2hldGhlciB0byBwcmludCBkZWJ1ZyBtZXNzYWdlcy5cbiAgICAgKiBBbHNvIGVuYWJsZXMgc3RhY2sgdHJhY2UgZm9yIHdhcm5pbmdzLlxuICAgICAqXG4gICAgICogQHR5cGUge0Jvb2xlYW59XG4gICAgICovXG5cbiAgICBkZWJ1ZzogZmFsc2UsXG5cbiAgICAvKipcbiAgICAgKiBXaGV0aGVyIHRvIHN1cHByZXNzIHdhcm5pbmdzLlxuICAgICAqXG4gICAgICogQHR5cGUge0Jvb2xlYW59XG4gICAgICovXG5cbiAgICBzaWxlbnQ6IGZhbHNlLFxuXG4gICAgLyoqXG4gICAgICogV2hldGhlciB0byB1c2UgYXN5bmMgcmVuZGVyaW5nLlxuICAgICAqL1xuXG4gICAgYXN5bmM6IHRydWUsXG5cbiAgICAvKipcbiAgICAgKiBXaGV0aGVyIHRvIHdhcm4gYWdhaW5zdCBlcnJvcnMgY2F1Z2h0IHdoZW4gZXZhbHVhdGluZ1xuICAgICAqIGV4cHJlc3Npb25zLlxuICAgICAqL1xuXG4gICAgd2FybkV4cHJlc3Npb25FcnJvcnM6IHRydWUsXG5cbiAgICAvKipcbiAgICAgKiBXaGV0aGVyIHRvIGFsbG93IGRldnRvb2xzIGluc3BlY3Rpb24uXG4gICAgICogRGlzYWJsZWQgYnkgZGVmYXVsdCBpbiBwcm9kdWN0aW9uIGJ1aWxkcy5cbiAgICAgKi9cblxuICAgIGRldnRvb2xzOiAnZGV2ZWxvcG1lbnQnICE9PSAncHJvZHVjdGlvbicsXG5cbiAgICAvKipcbiAgICAgKiBJbnRlcm5hbCBmbGFnIHRvIGluZGljYXRlIHRoZSBkZWxpbWl0ZXJzIGhhdmUgYmVlblxuICAgICAqIGNoYW5nZWQuXG4gICAgICpcbiAgICAgKiBAdHlwZSB7Qm9vbGVhbn1cbiAgICAgKi9cblxuICAgIF9kZWxpbWl0ZXJzQ2hhbmdlZDogdHJ1ZSxcblxuICAgIC8qKlxuICAgICAqIExpc3Qgb2YgYXNzZXQgdHlwZXMgdGhhdCBhIGNvbXBvbmVudCBjYW4gb3duLlxuICAgICAqXG4gICAgICogQHR5cGUge0FycmF5fVxuICAgICAqL1xuXG4gICAgX2Fzc2V0VHlwZXM6IFsnY29tcG9uZW50JywgJ2RpcmVjdGl2ZScsICdlbGVtZW50RGlyZWN0aXZlJywgJ2ZpbHRlcicsICd0cmFuc2l0aW9uJywgJ3BhcnRpYWwnXSxcblxuICAgIC8qKlxuICAgICAqIHByb3AgYmluZGluZyBtb2Rlc1xuICAgICAqL1xuXG4gICAgX3Byb3BCaW5kaW5nTW9kZXM6IHtcbiAgICAgIE9ORV9XQVk6IDAsXG4gICAgICBUV09fV0FZOiAxLFxuICAgICAgT05FX1RJTUU6IDJcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogTWF4IGNpcmN1bGFyIHVwZGF0ZXMgYWxsb3dlZCBpbiBhIGJhdGNoZXIgZmx1c2ggY3ljbGUuXG4gICAgICovXG5cbiAgICBfbWF4VXBkYXRlQ291bnQ6IDEwMFxuXG4gIH0sIHtcbiAgICBkZWxpbWl0ZXJzOiB7IC8qKlxuICAgICAgICAgICAgICAgICAgICogSW50ZXJwb2xhdGlvbiBkZWxpbWl0ZXJzLiBDaGFuZ2luZyB0aGVzZSB3b3VsZCB0cmlnZ2VyXG4gICAgICAgICAgICAgICAgICAgKiB0aGUgdGV4dCBwYXJzZXIgdG8gcmUtY29tcGlsZSB0aGUgcmVndWxhciBleHByZXNzaW9ucy5cbiAgICAgICAgICAgICAgICAgICAqXG4gICAgICAgICAgICAgICAgICAgKiBAdHlwZSB7QXJyYXk8U3RyaW5nPn1cbiAgICAgICAgICAgICAgICAgICAqL1xuXG4gICAgICBnZXQ6IGZ1bmN0aW9uIGdldCgpIHtcbiAgICAgICAgcmV0dXJuIGRlbGltaXRlcnM7XG4gICAgICB9LFxuICAgICAgc2V0OiBmdW5jdGlvbiBzZXQodmFsKSB7XG4gICAgICAgIGRlbGltaXRlcnMgPSB2YWw7XG4gICAgICAgIGNvbXBpbGVSZWdleCgpO1xuICAgICAgfSxcbiAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiAgICAgIGVudW1lcmFibGU6IHRydWVcbiAgICB9LFxuICAgIHVuc2FmZURlbGltaXRlcnM6IHtcbiAgICAgIGdldDogZnVuY3Rpb24gZ2V0KCkge1xuICAgICAgICByZXR1cm4gdW5zYWZlRGVsaW1pdGVycztcbiAgICAgIH0sXG4gICAgICBzZXQ6IGZ1bmN0aW9uIHNldCh2YWwpIHtcbiAgICAgICAgdW5zYWZlRGVsaW1pdGVycyA9IHZhbDtcbiAgICAgICAgY29tcGlsZVJlZ2V4KCk7XG4gICAgICB9LFxuICAgICAgY29uZmlndXJhYmxlOiB0cnVlLFxuICAgICAgZW51bWVyYWJsZTogdHJ1ZVxuICAgIH1cbiAgfSk7XG5cbiAgdmFyIHdhcm4gPSB1bmRlZmluZWQ7XG4gIHZhciBmb3JtYXRDb21wb25lbnROYW1lID0gdW5kZWZpbmVkO1xuXG4gIGlmICgnZGV2ZWxvcG1lbnQnICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICAoZnVuY3Rpb24gKCkge1xuICAgICAgdmFyIGhhc0NvbnNvbGUgPSB0eXBlb2YgY29uc29sZSAhPT0gJ3VuZGVmaW5lZCc7XG5cbiAgICAgIHdhcm4gPSBmdW5jdGlvbiAobXNnLCB2bSkge1xuICAgICAgICBpZiAoaGFzQ29uc29sZSAmJiAhY29uZmlnLnNpbGVudCkge1xuICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ1tWdWUgd2Fybl06ICcgKyBtc2cgKyAodm0gPyBmb3JtYXRDb21wb25lbnROYW1lKHZtKSA6ICcnKSk7XG4gICAgICAgIH1cbiAgICAgIH07XG5cbiAgICAgIGZvcm1hdENvbXBvbmVudE5hbWUgPSBmdW5jdGlvbiAodm0pIHtcbiAgICAgICAgdmFyIG5hbWUgPSB2bS5faXNWdWUgPyB2bS4kb3B0aW9ucy5uYW1lIDogdm0ubmFtZTtcbiAgICAgICAgcmV0dXJuIG5hbWUgPyAnIChmb3VuZCBpbiBjb21wb25lbnQ6IDwnICsgaHlwaGVuYXRlKG5hbWUpICsgJz4pJyA6ICcnO1xuICAgICAgfTtcbiAgICB9KSgpO1xuICB9XG5cbiAgLyoqXG4gICAqIEFwcGVuZCB3aXRoIHRyYW5zaXRpb24uXG4gICAqXG4gICAqIEBwYXJhbSB7RWxlbWVudH0gZWxcbiAgICogQHBhcmFtIHtFbGVtZW50fSB0YXJnZXRcbiAgICogQHBhcmFtIHtWdWV9IHZtXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IFtjYl1cbiAgICovXG5cbiAgZnVuY3Rpb24gYXBwZW5kV2l0aFRyYW5zaXRpb24oZWwsIHRhcmdldCwgdm0sIGNiKSB7XG4gICAgYXBwbHlUcmFuc2l0aW9uKGVsLCAxLCBmdW5jdGlvbiAoKSB7XG4gICAgICB0YXJnZXQuYXBwZW5kQ2hpbGQoZWwpO1xuICAgIH0sIHZtLCBjYik7XG4gIH1cblxuICAvKipcbiAgICogSW5zZXJ0QmVmb3JlIHdpdGggdHJhbnNpdGlvbi5cbiAgICpcbiAgICogQHBhcmFtIHtFbGVtZW50fSBlbFxuICAgKiBAcGFyYW0ge0VsZW1lbnR9IHRhcmdldFxuICAgKiBAcGFyYW0ge1Z1ZX0gdm1cbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gW2NiXVxuICAgKi9cblxuICBmdW5jdGlvbiBiZWZvcmVXaXRoVHJhbnNpdGlvbihlbCwgdGFyZ2V0LCB2bSwgY2IpIHtcbiAgICBhcHBseVRyYW5zaXRpb24oZWwsIDEsIGZ1bmN0aW9uICgpIHtcbiAgICAgIGJlZm9yZShlbCwgdGFyZ2V0KTtcbiAgICB9LCB2bSwgY2IpO1xuICB9XG5cbiAgLyoqXG4gICAqIFJlbW92ZSB3aXRoIHRyYW5zaXRpb24uXG4gICAqXG4gICAqIEBwYXJhbSB7RWxlbWVudH0gZWxcbiAgICogQHBhcmFtIHtWdWV9IHZtXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IFtjYl1cbiAgICovXG5cbiAgZnVuY3Rpb24gcmVtb3ZlV2l0aFRyYW5zaXRpb24oZWwsIHZtLCBjYikge1xuICAgIGFwcGx5VHJhbnNpdGlvbihlbCwgLTEsIGZ1bmN0aW9uICgpIHtcbiAgICAgIHJlbW92ZShlbCk7XG4gICAgfSwgdm0sIGNiKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBcHBseSB0cmFuc2l0aW9ucyB3aXRoIGFuIG9wZXJhdGlvbiBjYWxsYmFjay5cbiAgICpcbiAgICogQHBhcmFtIHtFbGVtZW50fSBlbFxuICAgKiBAcGFyYW0ge051bWJlcn0gZGlyZWN0aW9uXG4gICAqICAgICAgICAgICAgICAgICAgMTogZW50ZXJcbiAgICogICAgICAgICAgICAgICAgIC0xOiBsZWF2ZVxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBvcCAtIHRoZSBhY3R1YWwgRE9NIG9wZXJhdGlvblxuICAgKiBAcGFyYW0ge1Z1ZX0gdm1cbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gW2NiXVxuICAgKi9cblxuICBmdW5jdGlvbiBhcHBseVRyYW5zaXRpb24oZWwsIGRpcmVjdGlvbiwgb3AsIHZtLCBjYikge1xuICAgIHZhciB0cmFuc2l0aW9uID0gZWwuX192X3RyYW5zO1xuICAgIGlmICghdHJhbnNpdGlvbiB8fFxuICAgIC8vIHNraXAgaWYgdGhlcmUgYXJlIG5vIGpzIGhvb2tzIGFuZCBDU1MgdHJhbnNpdGlvbiBpc1xuICAgIC8vIG5vdCBzdXBwb3J0ZWRcbiAgICAhdHJhbnNpdGlvbi5ob29rcyAmJiAhdHJhbnNpdGlvbkVuZEV2ZW50IHx8XG4gICAgLy8gc2tpcCB0cmFuc2l0aW9ucyBmb3IgaW5pdGlhbCBjb21waWxlXG4gICAgIXZtLl9pc0NvbXBpbGVkIHx8XG4gICAgLy8gaWYgdGhlIHZtIGlzIGJlaW5nIG1hbmlwdWxhdGVkIGJ5IGEgcGFyZW50IGRpcmVjdGl2ZVxuICAgIC8vIGR1cmluZyB0aGUgcGFyZW50J3MgY29tcGlsYXRpb24gcGhhc2UsIHNraXAgdGhlXG4gICAgLy8gYW5pbWF0aW9uLlxuICAgIHZtLiRwYXJlbnQgJiYgIXZtLiRwYXJlbnQuX2lzQ29tcGlsZWQpIHtcbiAgICAgIG9wKCk7XG4gICAgICBpZiAoY2IpIGNiKCk7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHZhciBhY3Rpb24gPSBkaXJlY3Rpb24gPiAwID8gJ2VudGVyJyA6ICdsZWF2ZSc7XG4gICAgdHJhbnNpdGlvblthY3Rpb25dKG9wLCBjYik7XG4gIH1cblxudmFyIHRyYW5zaXRpb24gPSBPYmplY3QuZnJlZXplKHtcbiAgICBhcHBlbmRXaXRoVHJhbnNpdGlvbjogYXBwZW5kV2l0aFRyYW5zaXRpb24sXG4gICAgYmVmb3JlV2l0aFRyYW5zaXRpb246IGJlZm9yZVdpdGhUcmFuc2l0aW9uLFxuICAgIHJlbW92ZVdpdGhUcmFuc2l0aW9uOiByZW1vdmVXaXRoVHJhbnNpdGlvbixcbiAgICBhcHBseVRyYW5zaXRpb246IGFwcGx5VHJhbnNpdGlvblxuICB9KTtcblxuICAvKipcbiAgICogUXVlcnkgYW4gZWxlbWVudCBzZWxlY3RvciBpZiBpdCdzIG5vdCBhbiBlbGVtZW50IGFscmVhZHkuXG4gICAqXG4gICAqIEBwYXJhbSB7U3RyaW5nfEVsZW1lbnR9IGVsXG4gICAqIEByZXR1cm4ge0VsZW1lbnR9XG4gICAqL1xuXG4gIGZ1bmN0aW9uIHF1ZXJ5KGVsKSB7XG4gICAgaWYgKHR5cGVvZiBlbCA9PT0gJ3N0cmluZycpIHtcbiAgICAgIHZhciBzZWxlY3RvciA9IGVsO1xuICAgICAgZWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGVsKTtcbiAgICAgIGlmICghZWwpIHtcbiAgICAgICAgJ2RldmVsb3BtZW50JyAhPT0gJ3Byb2R1Y3Rpb24nICYmIHdhcm4oJ0Nhbm5vdCBmaW5kIGVsZW1lbnQ6ICcgKyBzZWxlY3Rvcik7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBlbDtcbiAgfVxuXG4gIC8qKlxuICAgKiBDaGVjayBpZiBhIG5vZGUgaXMgaW4gdGhlIGRvY3VtZW50LlxuICAgKiBOb3RlOiBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY29udGFpbnMgc2hvdWxkIHdvcmsgaGVyZVxuICAgKiBidXQgYWx3YXlzIHJldHVybnMgZmFsc2UgZm9yIGNvbW1lbnQgbm9kZXMgaW4gcGhhbnRvbWpzLFxuICAgKiBtYWtpbmcgdW5pdCB0ZXN0cyBkaWZmaWN1bHQuIFRoaXMgaXMgZml4ZWQgYnkgZG9pbmcgdGhlXG4gICAqIGNvbnRhaW5zKCkgY2hlY2sgb24gdGhlIG5vZGUncyBwYXJlbnROb2RlIGluc3RlYWQgb2ZcbiAgICogdGhlIG5vZGUgaXRzZWxmLlxuICAgKlxuICAgKiBAcGFyYW0ge05vZGV9IG5vZGVcbiAgICogQHJldHVybiB7Qm9vbGVhbn1cbiAgICovXG5cbiAgZnVuY3Rpb24gaW5Eb2Mobm9kZSkge1xuICAgIGlmICghbm9kZSkgcmV0dXJuIGZhbHNlO1xuICAgIHZhciBkb2MgPSBub2RlLm93bmVyRG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50O1xuICAgIHZhciBwYXJlbnQgPSBub2RlLnBhcmVudE5vZGU7XG4gICAgcmV0dXJuIGRvYyA9PT0gbm9kZSB8fCBkb2MgPT09IHBhcmVudCB8fCAhIShwYXJlbnQgJiYgcGFyZW50Lm5vZGVUeXBlID09PSAxICYmIGRvYy5jb250YWlucyhwYXJlbnQpKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgYW5kIHJlbW92ZSBhbiBhdHRyaWJ1dGUgZnJvbSBhIG5vZGUuXG4gICAqXG4gICAqIEBwYXJhbSB7Tm9kZX0gbm9kZVxuICAgKiBAcGFyYW0ge1N0cmluZ30gX2F0dHJcbiAgICovXG5cbiAgZnVuY3Rpb24gZ2V0QXR0cihub2RlLCBfYXR0cikge1xuICAgIHZhciB2YWwgPSBub2RlLmdldEF0dHJpYnV0ZShfYXR0cik7XG4gICAgaWYgKHZhbCAhPT0gbnVsbCkge1xuICAgICAgbm9kZS5yZW1vdmVBdHRyaWJ1dGUoX2F0dHIpO1xuICAgIH1cbiAgICByZXR1cm4gdmFsO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldCBhbiBhdHRyaWJ1dGUgd2l0aCBjb2xvbiBvciB2LWJpbmQ6IHByZWZpeC5cbiAgICpcbiAgICogQHBhcmFtIHtOb2RlfSBub2RlXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBuYW1lXG4gICAqIEByZXR1cm4ge1N0cmluZ3xudWxsfVxuICAgKi9cblxuICBmdW5jdGlvbiBnZXRCaW5kQXR0cihub2RlLCBuYW1lKSB7XG4gICAgdmFyIHZhbCA9IGdldEF0dHIobm9kZSwgJzonICsgbmFtZSk7XG4gICAgaWYgKHZhbCA9PT0gbnVsbCkge1xuICAgICAgdmFsID0gZ2V0QXR0cihub2RlLCAndi1iaW5kOicgKyBuYW1lKTtcbiAgICB9XG4gICAgcmV0dXJuIHZhbDtcbiAgfVxuXG4gIC8qKlxuICAgKiBDaGVjayB0aGUgcHJlc2VuY2Ugb2YgYSBiaW5kIGF0dHJpYnV0ZS5cbiAgICpcbiAgICogQHBhcmFtIHtOb2RlfSBub2RlXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBuYW1lXG4gICAqIEByZXR1cm4ge0Jvb2xlYW59XG4gICAqL1xuXG4gIGZ1bmN0aW9uIGhhc0JpbmRBdHRyKG5vZGUsIG5hbWUpIHtcbiAgICByZXR1cm4gbm9kZS5oYXNBdHRyaWJ1dGUobmFtZSkgfHwgbm9kZS5oYXNBdHRyaWJ1dGUoJzonICsgbmFtZSkgfHwgbm9kZS5oYXNBdHRyaWJ1dGUoJ3YtYmluZDonICsgbmFtZSk7XG4gIH1cblxuICAvKipcbiAgICogSW5zZXJ0IGVsIGJlZm9yZSB0YXJnZXRcbiAgICpcbiAgICogQHBhcmFtIHtFbGVtZW50fSBlbFxuICAgKiBAcGFyYW0ge0VsZW1lbnR9IHRhcmdldFxuICAgKi9cblxuICBmdW5jdGlvbiBiZWZvcmUoZWwsIHRhcmdldCkge1xuICAgIHRhcmdldC5wYXJlbnROb2RlLmluc2VydEJlZm9yZShlbCwgdGFyZ2V0KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBJbnNlcnQgZWwgYWZ0ZXIgdGFyZ2V0XG4gICAqXG4gICAqIEBwYXJhbSB7RWxlbWVudH0gZWxcbiAgICogQHBhcmFtIHtFbGVtZW50fSB0YXJnZXRcbiAgICovXG5cbiAgZnVuY3Rpb24gYWZ0ZXIoZWwsIHRhcmdldCkge1xuICAgIGlmICh0YXJnZXQubmV4dFNpYmxpbmcpIHtcbiAgICAgIGJlZm9yZShlbCwgdGFyZ2V0Lm5leHRTaWJsaW5nKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGFyZ2V0LnBhcmVudE5vZGUuYXBwZW5kQ2hpbGQoZWwpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBSZW1vdmUgZWwgZnJvbSBET01cbiAgICpcbiAgICogQHBhcmFtIHtFbGVtZW50fSBlbFxuICAgKi9cblxuICBmdW5jdGlvbiByZW1vdmUoZWwpIHtcbiAgICBlbC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKGVsKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBQcmVwZW5kIGVsIHRvIHRhcmdldFxuICAgKlxuICAgKiBAcGFyYW0ge0VsZW1lbnR9IGVsXG4gICAqIEBwYXJhbSB7RWxlbWVudH0gdGFyZ2V0XG4gICAqL1xuXG4gIGZ1bmN0aW9uIHByZXBlbmQoZWwsIHRhcmdldCkge1xuICAgIGlmICh0YXJnZXQuZmlyc3RDaGlsZCkge1xuICAgICAgYmVmb3JlKGVsLCB0YXJnZXQuZmlyc3RDaGlsZCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRhcmdldC5hcHBlbmRDaGlsZChlbCk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFJlcGxhY2UgdGFyZ2V0IHdpdGggZWxcbiAgICpcbiAgICogQHBhcmFtIHtFbGVtZW50fSB0YXJnZXRcbiAgICogQHBhcmFtIHtFbGVtZW50fSBlbFxuICAgKi9cblxuICBmdW5jdGlvbiByZXBsYWNlKHRhcmdldCwgZWwpIHtcbiAgICB2YXIgcGFyZW50ID0gdGFyZ2V0LnBhcmVudE5vZGU7XG4gICAgaWYgKHBhcmVudCkge1xuICAgICAgcGFyZW50LnJlcGxhY2VDaGlsZChlbCwgdGFyZ2V0KTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQWRkIGV2ZW50IGxpc3RlbmVyIHNob3J0aGFuZC5cbiAgICpcbiAgICogQHBhcmFtIHtFbGVtZW50fSBlbFxuICAgKiBAcGFyYW0ge1N0cmluZ30gZXZlbnRcbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gY2JcbiAgICogQHBhcmFtIHtCb29sZWFufSBbdXNlQ2FwdHVyZV1cbiAgICovXG5cbiAgZnVuY3Rpb24gb24oZWwsIGV2ZW50LCBjYiwgdXNlQ2FwdHVyZSkge1xuICAgIGVsLmFkZEV2ZW50TGlzdGVuZXIoZXZlbnQsIGNiLCB1c2VDYXB0dXJlKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZW1vdmUgZXZlbnQgbGlzdGVuZXIgc2hvcnRoYW5kLlxuICAgKlxuICAgKiBAcGFyYW0ge0VsZW1lbnR9IGVsXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBldmVudFxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBjYlxuICAgKi9cblxuICBmdW5jdGlvbiBvZmYoZWwsIGV2ZW50LCBjYikge1xuICAgIGVsLnJlbW92ZUV2ZW50TGlzdGVuZXIoZXZlbnQsIGNiKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBGb3IgSUU5IGNvbXBhdDogd2hlbiBib3RoIGNsYXNzIGFuZCA6Y2xhc3MgYXJlIHByZXNlbnRcbiAgICogZ2V0QXR0cmlidXRlKCdjbGFzcycpIHJldHVybnMgd3JvbmcgdmFsdWUuLi5cbiAgICpcbiAgICogQHBhcmFtIHtFbGVtZW50fSBlbFxuICAgKiBAcmV0dXJuIHtTdHJpbmd9XG4gICAqL1xuXG4gIGZ1bmN0aW9uIGdldENsYXNzKGVsKSB7XG4gICAgdmFyIGNsYXNzbmFtZSA9IGVsLmNsYXNzTmFtZTtcbiAgICBpZiAodHlwZW9mIGNsYXNzbmFtZSA9PT0gJ29iamVjdCcpIHtcbiAgICAgIGNsYXNzbmFtZSA9IGNsYXNzbmFtZS5iYXNlVmFsIHx8ICcnO1xuICAgIH1cbiAgICByZXR1cm4gY2xhc3NuYW1lO1xuICB9XG5cbiAgLyoqXG4gICAqIEluIElFOSwgc2V0QXR0cmlidXRlKCdjbGFzcycpIHdpbGwgcmVzdWx0IGluIGVtcHR5IGNsYXNzXG4gICAqIGlmIHRoZSBlbGVtZW50IGFsc28gaGFzIHRoZSA6Y2xhc3MgYXR0cmlidXRlOyBIb3dldmVyIGluXG4gICAqIFBoYW50b21KUywgc2V0dGluZyBgY2xhc3NOYW1lYCBkb2VzIG5vdCB3b3JrIG9uIFNWRyBlbGVtZW50cy4uLlxuICAgKiBTbyB3ZSBoYXZlIHRvIGRvIGEgY29uZGl0aW9uYWwgY2hlY2sgaGVyZS5cbiAgICpcbiAgICogQHBhcmFtIHtFbGVtZW50fSBlbFxuICAgKiBAcGFyYW0ge1N0cmluZ30gY2xzXG4gICAqL1xuXG4gIGZ1bmN0aW9uIHNldENsYXNzKGVsLCBjbHMpIHtcbiAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgaWYgKi9cbiAgICBpZiAoaXNJRTkgJiYgIS9zdmckLy50ZXN0KGVsLm5hbWVzcGFjZVVSSSkpIHtcbiAgICAgIGVsLmNsYXNzTmFtZSA9IGNscztcbiAgICB9IGVsc2Uge1xuICAgICAgZWwuc2V0QXR0cmlidXRlKCdjbGFzcycsIGNscyk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEFkZCBjbGFzcyB3aXRoIGNvbXBhdGliaWxpdHkgZm9yIElFICYgU1ZHXG4gICAqXG4gICAqIEBwYXJhbSB7RWxlbWVudH0gZWxcbiAgICogQHBhcmFtIHtTdHJpbmd9IGNsc1xuICAgKi9cblxuICBmdW5jdGlvbiBhZGRDbGFzcyhlbCwgY2xzKSB7XG4gICAgaWYgKGVsLmNsYXNzTGlzdCkge1xuICAgICAgZWwuY2xhc3NMaXN0LmFkZChjbHMpO1xuICAgIH0gZWxzZSB7XG4gICAgICB2YXIgY3VyID0gJyAnICsgZ2V0Q2xhc3MoZWwpICsgJyAnO1xuICAgICAgaWYgKGN1ci5pbmRleE9mKCcgJyArIGNscyArICcgJykgPCAwKSB7XG4gICAgICAgIHNldENsYXNzKGVsLCAoY3VyICsgY2xzKS50cmltKCkpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBSZW1vdmUgY2xhc3Mgd2l0aCBjb21wYXRpYmlsaXR5IGZvciBJRSAmIFNWR1xuICAgKlxuICAgKiBAcGFyYW0ge0VsZW1lbnR9IGVsXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBjbHNcbiAgICovXG5cbiAgZnVuY3Rpb24gcmVtb3ZlQ2xhc3MoZWwsIGNscykge1xuICAgIGlmIChlbC5jbGFzc0xpc3QpIHtcbiAgICAgIGVsLmNsYXNzTGlzdC5yZW1vdmUoY2xzKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdmFyIGN1ciA9ICcgJyArIGdldENsYXNzKGVsKSArICcgJztcbiAgICAgIHZhciB0YXIgPSAnICcgKyBjbHMgKyAnICc7XG4gICAgICB3aGlsZSAoY3VyLmluZGV4T2YodGFyKSA+PSAwKSB7XG4gICAgICAgIGN1ciA9IGN1ci5yZXBsYWNlKHRhciwgJyAnKTtcbiAgICAgIH1cbiAgICAgIHNldENsYXNzKGVsLCBjdXIudHJpbSgpKTtcbiAgICB9XG4gICAgaWYgKCFlbC5jbGFzc05hbWUpIHtcbiAgICAgIGVsLnJlbW92ZUF0dHJpYnV0ZSgnY2xhc3MnKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogRXh0cmFjdCByYXcgY29udGVudCBpbnNpZGUgYW4gZWxlbWVudCBpbnRvIGEgdGVtcG9yYXJ5XG4gICAqIGNvbnRhaW5lciBkaXZcbiAgICpcbiAgICogQHBhcmFtIHtFbGVtZW50fSBlbFxuICAgKiBAcGFyYW0ge0Jvb2xlYW59IGFzRnJhZ21lbnRcbiAgICogQHJldHVybiB7RWxlbWVudHxEb2N1bWVudEZyYWdtZW50fVxuICAgKi9cblxuICBmdW5jdGlvbiBleHRyYWN0Q29udGVudChlbCwgYXNGcmFnbWVudCkge1xuICAgIHZhciBjaGlsZDtcbiAgICB2YXIgcmF3Q29udGVudDtcbiAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgaWYgKi9cbiAgICBpZiAoaXNUZW1wbGF0ZShlbCkgJiYgaXNGcmFnbWVudChlbC5jb250ZW50KSkge1xuICAgICAgZWwgPSBlbC5jb250ZW50O1xuICAgIH1cbiAgICBpZiAoZWwuaGFzQ2hpbGROb2RlcygpKSB7XG4gICAgICB0cmltTm9kZShlbCk7XG4gICAgICByYXdDb250ZW50ID0gYXNGcmFnbWVudCA/IGRvY3VtZW50LmNyZWF0ZURvY3VtZW50RnJhZ21lbnQoKSA6IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgLyogZXNsaW50LWRpc2FibGUgbm8tY29uZC1hc3NpZ24gKi9cbiAgICAgIHdoaWxlIChjaGlsZCA9IGVsLmZpcnN0Q2hpbGQpIHtcbiAgICAgICAgLyogZXNsaW50LWVuYWJsZSBuby1jb25kLWFzc2lnbiAqL1xuICAgICAgICByYXdDb250ZW50LmFwcGVuZENoaWxkKGNoaWxkKTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHJhd0NvbnRlbnQ7XG4gIH1cblxuICAvKipcbiAgICogVHJpbSBwb3NzaWJsZSBlbXB0eSBoZWFkL3RhaWwgdGV4dCBhbmQgY29tbWVudFxuICAgKiBub2RlcyBpbnNpZGUgYSBwYXJlbnQuXG4gICAqXG4gICAqIEBwYXJhbSB7Tm9kZX0gbm9kZVxuICAgKi9cblxuICBmdW5jdGlvbiB0cmltTm9kZShub2RlKSB7XG4gICAgdmFyIGNoaWxkO1xuICAgIC8qIGVzbGludC1kaXNhYmxlIG5vLXNlcXVlbmNlcyAqL1xuICAgIHdoaWxlICgoY2hpbGQgPSBub2RlLmZpcnN0Q2hpbGQsIGlzVHJpbW1hYmxlKGNoaWxkKSkpIHtcbiAgICAgIG5vZGUucmVtb3ZlQ2hpbGQoY2hpbGQpO1xuICAgIH1cbiAgICB3aGlsZSAoKGNoaWxkID0gbm9kZS5sYXN0Q2hpbGQsIGlzVHJpbW1hYmxlKGNoaWxkKSkpIHtcbiAgICAgIG5vZGUucmVtb3ZlQ2hpbGQoY2hpbGQpO1xuICAgIH1cbiAgICAvKiBlc2xpbnQtZW5hYmxlIG5vLXNlcXVlbmNlcyAqL1xuICB9XG5cbiAgZnVuY3Rpb24gaXNUcmltbWFibGUobm9kZSkge1xuICAgIHJldHVybiBub2RlICYmIChub2RlLm5vZGVUeXBlID09PSAzICYmICFub2RlLmRhdGEudHJpbSgpIHx8IG5vZGUubm9kZVR5cGUgPT09IDgpO1xuICB9XG5cbiAgLyoqXG4gICAqIENoZWNrIGlmIGFuIGVsZW1lbnQgaXMgYSB0ZW1wbGF0ZSB0YWcuXG4gICAqIE5vdGUgaWYgdGhlIHRlbXBsYXRlIGFwcGVhcnMgaW5zaWRlIGFuIFNWRyBpdHMgdGFnTmFtZVxuICAgKiB3aWxsIGJlIGluIGxvd2VyY2FzZS5cbiAgICpcbiAgICogQHBhcmFtIHtFbGVtZW50fSBlbFxuICAgKi9cblxuICBmdW5jdGlvbiBpc1RlbXBsYXRlKGVsKSB7XG4gICAgcmV0dXJuIGVsLnRhZ05hbWUgJiYgZWwudGFnTmFtZS50b0xvd2VyQ2FzZSgpID09PSAndGVtcGxhdGUnO1xuICB9XG5cbiAgLyoqXG4gICAqIENyZWF0ZSBhbiBcImFuY2hvclwiIGZvciBwZXJmb3JtaW5nIGRvbSBpbnNlcnRpb24vcmVtb3ZhbHMuXG4gICAqIFRoaXMgaXMgdXNlZCBpbiBhIG51bWJlciBvZiBzY2VuYXJpb3M6XG4gICAqIC0gZnJhZ21lbnQgaW5zdGFuY2VcbiAgICogLSB2LWh0bWxcbiAgICogLSB2LWlmXG4gICAqIC0gdi1mb3JcbiAgICogLSBjb21wb25lbnRcbiAgICpcbiAgICogQHBhcmFtIHtTdHJpbmd9IGNvbnRlbnRcbiAgICogQHBhcmFtIHtCb29sZWFufSBwZXJzaXN0IC0gSUUgdHJhc2hlcyBlbXB0eSB0ZXh0Tm9kZXMgb25cbiAgICogICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xvbmVOb2RlKHRydWUpLCBzbyBpbiBjZXJ0YWluXG4gICAqICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2VzIHRoZSBhbmNob3IgbmVlZHMgdG8gYmVcbiAgICogICAgICAgICAgICAgICAgICAgICAgICAgICAgbm9uLWVtcHR5IHRvIGJlIHBlcnNpc3RlZCBpblxuICAgKiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0ZW1wbGF0ZXMuXG4gICAqIEByZXR1cm4ge0NvbW1lbnR8VGV4dH1cbiAgICovXG5cbiAgZnVuY3Rpb24gY3JlYXRlQW5jaG9yKGNvbnRlbnQsIHBlcnNpc3QpIHtcbiAgICB2YXIgYW5jaG9yID0gY29uZmlnLmRlYnVnID8gZG9jdW1lbnQuY3JlYXRlQ29tbWVudChjb250ZW50KSA6IGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKHBlcnNpc3QgPyAnICcgOiAnJyk7XG4gICAgYW5jaG9yLl9fdl9hbmNob3IgPSB0cnVlO1xuICAgIHJldHVybiBhbmNob3I7XG4gIH1cblxuICAvKipcbiAgICogRmluZCBhIGNvbXBvbmVudCByZWYgYXR0cmlidXRlIHRoYXQgc3RhcnRzIHdpdGggJC5cbiAgICpcbiAgICogQHBhcmFtIHtFbGVtZW50fSBub2RlXG4gICAqIEByZXR1cm4ge1N0cmluZ3x1bmRlZmluZWR9XG4gICAqL1xuXG4gIHZhciByZWZSRSA9IC9edi1yZWY6LztcblxuICBmdW5jdGlvbiBmaW5kUmVmKG5vZGUpIHtcbiAgICBpZiAobm9kZS5oYXNBdHRyaWJ1dGVzKCkpIHtcbiAgICAgIHZhciBhdHRycyA9IG5vZGUuYXR0cmlidXRlcztcbiAgICAgIGZvciAodmFyIGkgPSAwLCBsID0gYXR0cnMubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG4gICAgICAgIHZhciBuYW1lID0gYXR0cnNbaV0ubmFtZTtcbiAgICAgICAgaWYgKHJlZlJFLnRlc3QobmFtZSkpIHtcbiAgICAgICAgICByZXR1cm4gY2FtZWxpemUobmFtZS5yZXBsYWNlKHJlZlJFLCAnJykpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIE1hcCBhIGZ1bmN0aW9uIHRvIGEgcmFuZ2Ugb2Ygbm9kZXMgLlxuICAgKlxuICAgKiBAcGFyYW0ge05vZGV9IG5vZGVcbiAgICogQHBhcmFtIHtOb2RlfSBlbmRcbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gb3BcbiAgICovXG5cbiAgZnVuY3Rpb24gbWFwTm9kZVJhbmdlKG5vZGUsIGVuZCwgb3ApIHtcbiAgICB2YXIgbmV4dDtcbiAgICB3aGlsZSAobm9kZSAhPT0gZW5kKSB7XG4gICAgICBuZXh0ID0gbm9kZS5uZXh0U2libGluZztcbiAgICAgIG9wKG5vZGUpO1xuICAgICAgbm9kZSA9IG5leHQ7XG4gICAgfVxuICAgIG9wKGVuZCk7XG4gIH1cblxuICAvKipcbiAgICogUmVtb3ZlIGEgcmFuZ2Ugb2Ygbm9kZXMgd2l0aCB0cmFuc2l0aW9uLCBzdG9yZVxuICAgKiB0aGUgbm9kZXMgaW4gYSBmcmFnbWVudCB3aXRoIGNvcnJlY3Qgb3JkZXJpbmcsXG4gICAqIGFuZCBjYWxsIGNhbGxiYWNrIHdoZW4gZG9uZS5cbiAgICpcbiAgICogQHBhcmFtIHtOb2RlfSBzdGFydFxuICAgKiBAcGFyYW0ge05vZGV9IGVuZFxuICAgKiBAcGFyYW0ge1Z1ZX0gdm1cbiAgICogQHBhcmFtIHtEb2N1bWVudEZyYWdtZW50fSBmcmFnXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IGNiXG4gICAqL1xuXG4gIGZ1bmN0aW9uIHJlbW92ZU5vZGVSYW5nZShzdGFydCwgZW5kLCB2bSwgZnJhZywgY2IpIHtcbiAgICB2YXIgZG9uZSA9IGZhbHNlO1xuICAgIHZhciByZW1vdmVkID0gMDtcbiAgICB2YXIgbm9kZXMgPSBbXTtcbiAgICBtYXBOb2RlUmFuZ2Uoc3RhcnQsIGVuZCwgZnVuY3Rpb24gKG5vZGUpIHtcbiAgICAgIGlmIChub2RlID09PSBlbmQpIGRvbmUgPSB0cnVlO1xuICAgICAgbm9kZXMucHVzaChub2RlKTtcbiAgICAgIHJlbW92ZVdpdGhUcmFuc2l0aW9uKG5vZGUsIHZtLCBvblJlbW92ZWQpO1xuICAgIH0pO1xuICAgIGZ1bmN0aW9uIG9uUmVtb3ZlZCgpIHtcbiAgICAgIHJlbW92ZWQrKztcbiAgICAgIGlmIChkb25lICYmIHJlbW92ZWQgPj0gbm9kZXMubGVuZ3RoKSB7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbm9kZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICBmcmFnLmFwcGVuZENoaWxkKG5vZGVzW2ldKTtcbiAgICAgICAgfVxuICAgICAgICBjYiAmJiBjYigpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBDaGVjayBpZiBhIG5vZGUgaXMgYSBEb2N1bWVudEZyYWdtZW50LlxuICAgKlxuICAgKiBAcGFyYW0ge05vZGV9IG5vZGVcbiAgICogQHJldHVybiB7Qm9vbGVhbn1cbiAgICovXG5cbiAgZnVuY3Rpb24gaXNGcmFnbWVudChub2RlKSB7XG4gICAgcmV0dXJuIG5vZGUgJiYgbm9kZS5ub2RlVHlwZSA9PT0gMTE7XG4gIH1cblxuICAvKipcbiAgICogR2V0IG91dGVySFRNTCBvZiBlbGVtZW50cywgdGFraW5nIGNhcmVcbiAgICogb2YgU1ZHIGVsZW1lbnRzIGluIElFIGFzIHdlbGwuXG4gICAqXG4gICAqIEBwYXJhbSB7RWxlbWVudH0gZWxcbiAgICogQHJldHVybiB7U3RyaW5nfVxuICAgKi9cblxuICBmdW5jdGlvbiBnZXRPdXRlckhUTUwoZWwpIHtcbiAgICBpZiAoZWwub3V0ZXJIVE1MKSB7XG4gICAgICByZXR1cm4gZWwub3V0ZXJIVE1MO1xuICAgIH0gZWxzZSB7XG4gICAgICB2YXIgY29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICBjb250YWluZXIuYXBwZW5kQ2hpbGQoZWwuY2xvbmVOb2RlKHRydWUpKTtcbiAgICAgIHJldHVybiBjb250YWluZXIuaW5uZXJIVE1MO1xuICAgIH1cbiAgfVxuXG4gIHZhciBjb21tb25UYWdSRSA9IC9eKGRpdnxwfHNwYW58aW1nfGF8YnxpfGJyfHVsfG9sfGxpfGgxfGgyfGgzfGg0fGg1fGg2fGNvZGV8cHJlfHRhYmxlfHRofHRkfHRyfGZvcm18bGFiZWx8aW5wdXR8c2VsZWN0fG9wdGlvbnxuYXZ8YXJ0aWNsZXxzZWN0aW9ufGhlYWRlcnxmb290ZXIpJC9pO1xuICB2YXIgcmVzZXJ2ZWRUYWdSRSA9IC9eKHNsb3R8cGFydGlhbHxjb21wb25lbnQpJC9pO1xuXG4gIHZhciBpc1Vua25vd25FbGVtZW50ID0gdW5kZWZpbmVkO1xuICBpZiAoJ2RldmVsb3BtZW50JyAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgaXNVbmtub3duRWxlbWVudCA9IGZ1bmN0aW9uIChlbCwgdGFnKSB7XG4gICAgICBpZiAodGFnLmluZGV4T2YoJy0nKSA+IC0xKSB7XG4gICAgICAgIC8vIGh0dHA6Ly9zdGFja292ZXJmbG93LmNvbS9hLzI4MjEwMzY0LzEwNzAyNDRcbiAgICAgICAgcmV0dXJuIGVsLmNvbnN0cnVjdG9yID09PSB3aW5kb3cuSFRNTFVua25vd25FbGVtZW50IHx8IGVsLmNvbnN0cnVjdG9yID09PSB3aW5kb3cuSFRNTEVsZW1lbnQ7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gKC9IVE1MVW5rbm93bkVsZW1lbnQvLnRlc3QoZWwudG9TdHJpbmcoKSkgJiZcbiAgICAgICAgICAvLyBDaHJvbWUgcmV0dXJucyB1bmtub3duIGZvciBzZXZlcmFsIEhUTUw1IGVsZW1lbnRzLlxuICAgICAgICAgIC8vIGh0dHBzOi8vY29kZS5nb29nbGUuY29tL3AvY2hyb21pdW0vaXNzdWVzL2RldGFpbD9pZD01NDA1MjZcbiAgICAgICAgICAhL14oZGF0YXx0aW1lfHJ0Y3xyYikkLy50ZXN0KHRhZylcbiAgICAgICAgKTtcbiAgICAgIH1cbiAgICB9O1xuICB9XG5cbiAgLyoqXG4gICAqIENoZWNrIGlmIGFuIGVsZW1lbnQgaXMgYSBjb21wb25lbnQsIGlmIHllcyByZXR1cm4gaXRzXG4gICAqIGNvbXBvbmVudCBpZC5cbiAgICpcbiAgICogQHBhcmFtIHtFbGVtZW50fSBlbFxuICAgKiBAcGFyYW0ge09iamVjdH0gb3B0aW9uc1xuICAgKiBAcmV0dXJuIHtPYmplY3R8dW5kZWZpbmVkfVxuICAgKi9cblxuICBmdW5jdGlvbiBjaGVja0NvbXBvbmVudEF0dHIoZWwsIG9wdGlvbnMpIHtcbiAgICB2YXIgdGFnID0gZWwudGFnTmFtZS50b0xvd2VyQ2FzZSgpO1xuICAgIHZhciBoYXNBdHRycyA9IGVsLmhhc0F0dHJpYnV0ZXMoKTtcbiAgICBpZiAoIWNvbW1vblRhZ1JFLnRlc3QodGFnKSAmJiAhcmVzZXJ2ZWRUYWdSRS50ZXN0KHRhZykpIHtcbiAgICAgIGlmIChyZXNvbHZlQXNzZXQob3B0aW9ucywgJ2NvbXBvbmVudHMnLCB0YWcpKSB7XG4gICAgICAgIHJldHVybiB7IGlkOiB0YWcgfTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHZhciBpcyA9IGhhc0F0dHJzICYmIGdldElzQmluZGluZyhlbCwgb3B0aW9ucyk7XG4gICAgICAgIGlmIChpcykge1xuICAgICAgICAgIHJldHVybiBpcztcbiAgICAgICAgfSBlbHNlIGlmICgnZGV2ZWxvcG1lbnQnICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICAgICAgICB2YXIgZXhwZWN0ZWRUYWcgPSBvcHRpb25zLl9jb21wb25lbnROYW1lTWFwICYmIG9wdGlvbnMuX2NvbXBvbmVudE5hbWVNYXBbdGFnXTtcbiAgICAgICAgICBpZiAoZXhwZWN0ZWRUYWcpIHtcbiAgICAgICAgICAgIHdhcm4oJ1Vua25vd24gY3VzdG9tIGVsZW1lbnQ6IDwnICsgdGFnICsgJz4gLSAnICsgJ2RpZCB5b3UgbWVhbiA8JyArIGV4cGVjdGVkVGFnICsgJz4/ICcgKyAnSFRNTCBpcyBjYXNlLWluc2Vuc2l0aXZlLCByZW1lbWJlciB0byB1c2Uga2ViYWItY2FzZSBpbiB0ZW1wbGF0ZXMuJyk7XG4gICAgICAgICAgfSBlbHNlIGlmIChpc1Vua25vd25FbGVtZW50KGVsLCB0YWcpKSB7XG4gICAgICAgICAgICB3YXJuKCdVbmtub3duIGN1c3RvbSBlbGVtZW50OiA8JyArIHRhZyArICc+IC0gZGlkIHlvdSAnICsgJ3JlZ2lzdGVyIHRoZSBjb21wb25lbnQgY29ycmVjdGx5PyBGb3IgcmVjdXJzaXZlIGNvbXBvbmVudHMsICcgKyAnbWFrZSBzdXJlIHRvIHByb3ZpZGUgdGhlIFwibmFtZVwiIG9wdGlvbi4nKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKGhhc0F0dHJzKSB7XG4gICAgICByZXR1cm4gZ2V0SXNCaW5kaW5nKGVsLCBvcHRpb25zKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogR2V0IFwiaXNcIiBiaW5kaW5nIGZyb20gYW4gZWxlbWVudC5cbiAgICpcbiAgICogQHBhcmFtIHtFbGVtZW50fSBlbFxuICAgKiBAcGFyYW0ge09iamVjdH0gb3B0aW9uc1xuICAgKiBAcmV0dXJuIHtPYmplY3R8dW5kZWZpbmVkfVxuICAgKi9cblxuICBmdW5jdGlvbiBnZXRJc0JpbmRpbmcoZWwsIG9wdGlvbnMpIHtcbiAgICAvLyBkeW5hbWljIHN5bnRheFxuICAgIHZhciBleHAgPSBlbC5nZXRBdHRyaWJ1dGUoJ2lzJyk7XG4gICAgaWYgKGV4cCAhPSBudWxsKSB7XG4gICAgICBpZiAocmVzb2x2ZUFzc2V0KG9wdGlvbnMsICdjb21wb25lbnRzJywgZXhwKSkge1xuICAgICAgICBlbC5yZW1vdmVBdHRyaWJ1dGUoJ2lzJyk7XG4gICAgICAgIHJldHVybiB7IGlkOiBleHAgfTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgZXhwID0gZ2V0QmluZEF0dHIoZWwsICdpcycpO1xuICAgICAgaWYgKGV4cCAhPSBudWxsKSB7XG4gICAgICAgIHJldHVybiB7IGlkOiBleHAsIGR5bmFtaWM6IHRydWUgfTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogT3B0aW9uIG92ZXJ3cml0aW5nIHN0cmF0ZWdpZXMgYXJlIGZ1bmN0aW9ucyB0aGF0IGhhbmRsZVxuICAgKiBob3cgdG8gbWVyZ2UgYSBwYXJlbnQgb3B0aW9uIHZhbHVlIGFuZCBhIGNoaWxkIG9wdGlvblxuICAgKiB2YWx1ZSBpbnRvIHRoZSBmaW5hbCB2YWx1ZS5cbiAgICpcbiAgICogQWxsIHN0cmF0ZWd5IGZ1bmN0aW9ucyBmb2xsb3cgdGhlIHNhbWUgc2lnbmF0dXJlOlxuICAgKlxuICAgKiBAcGFyYW0geyp9IHBhcmVudFZhbFxuICAgKiBAcGFyYW0geyp9IGNoaWxkVmFsXG4gICAqIEBwYXJhbSB7VnVlfSBbdm1dXG4gICAqL1xuXG4gIHZhciBzdHJhdHMgPSBjb25maWcub3B0aW9uTWVyZ2VTdHJhdGVnaWVzID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcblxuICAvKipcbiAgICogSGVscGVyIHRoYXQgcmVjdXJzaXZlbHkgbWVyZ2VzIHR3byBkYXRhIG9iamVjdHMgdG9nZXRoZXIuXG4gICAqL1xuXG4gIGZ1bmN0aW9uIG1lcmdlRGF0YSh0bywgZnJvbSkge1xuICAgIHZhciBrZXksIHRvVmFsLCBmcm9tVmFsO1xuICAgIGZvciAoa2V5IGluIGZyb20pIHtcbiAgICAgIHRvVmFsID0gdG9ba2V5XTtcbiAgICAgIGZyb21WYWwgPSBmcm9tW2tleV07XG4gICAgICBpZiAoIWhhc093bih0bywga2V5KSkge1xuICAgICAgICBzZXQodG8sIGtleSwgZnJvbVZhbCk7XG4gICAgICB9IGVsc2UgaWYgKGlzT2JqZWN0KHRvVmFsKSAmJiBpc09iamVjdChmcm9tVmFsKSkge1xuICAgICAgICBtZXJnZURhdGEodG9WYWwsIGZyb21WYWwpO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gdG87XG4gIH1cblxuICAvKipcbiAgICogRGF0YVxuICAgKi9cblxuICBzdHJhdHMuZGF0YSA9IGZ1bmN0aW9uIChwYXJlbnRWYWwsIGNoaWxkVmFsLCB2bSkge1xuICAgIGlmICghdm0pIHtcbiAgICAgIC8vIGluIGEgVnVlLmV4dGVuZCBtZXJnZSwgYm90aCBzaG91bGQgYmUgZnVuY3Rpb25zXG4gICAgICBpZiAoIWNoaWxkVmFsKSB7XG4gICAgICAgIHJldHVybiBwYXJlbnRWYWw7XG4gICAgICB9XG4gICAgICBpZiAodHlwZW9mIGNoaWxkVmFsICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICdkZXZlbG9wbWVudCcgIT09ICdwcm9kdWN0aW9uJyAmJiB3YXJuKCdUaGUgXCJkYXRhXCIgb3B0aW9uIHNob3VsZCBiZSBhIGZ1bmN0aW9uICcgKyAndGhhdCByZXR1cm5zIGEgcGVyLWluc3RhbmNlIHZhbHVlIGluIGNvbXBvbmVudCAnICsgJ2RlZmluaXRpb25zLicsIHZtKTtcbiAgICAgICAgcmV0dXJuIHBhcmVudFZhbDtcbiAgICAgIH1cbiAgICAgIGlmICghcGFyZW50VmFsKSB7XG4gICAgICAgIHJldHVybiBjaGlsZFZhbDtcbiAgICAgIH1cbiAgICAgIC8vIHdoZW4gcGFyZW50VmFsICYgY2hpbGRWYWwgYXJlIGJvdGggcHJlc2VudCxcbiAgICAgIC8vIHdlIG5lZWQgdG8gcmV0dXJuIGEgZnVuY3Rpb24gdGhhdCByZXR1cm5zIHRoZVxuICAgICAgLy8gbWVyZ2VkIHJlc3VsdCBvZiBib3RoIGZ1bmN0aW9ucy4uLiBubyBuZWVkIHRvXG4gICAgICAvLyBjaGVjayBpZiBwYXJlbnRWYWwgaXMgYSBmdW5jdGlvbiBoZXJlIGJlY2F1c2VcbiAgICAgIC8vIGl0IGhhcyB0byBiZSBhIGZ1bmN0aW9uIHRvIHBhc3MgcHJldmlvdXMgbWVyZ2VzLlxuICAgICAgcmV0dXJuIGZ1bmN0aW9uIG1lcmdlZERhdGFGbigpIHtcbiAgICAgICAgcmV0dXJuIG1lcmdlRGF0YShjaGlsZFZhbC5jYWxsKHRoaXMpLCBwYXJlbnRWYWwuY2FsbCh0aGlzKSk7XG4gICAgICB9O1xuICAgIH0gZWxzZSBpZiAocGFyZW50VmFsIHx8IGNoaWxkVmFsKSB7XG4gICAgICByZXR1cm4gZnVuY3Rpb24gbWVyZ2VkSW5zdGFuY2VEYXRhRm4oKSB7XG4gICAgICAgIC8vIGluc3RhbmNlIG1lcmdlXG4gICAgICAgIHZhciBpbnN0YW5jZURhdGEgPSB0eXBlb2YgY2hpbGRWYWwgPT09ICdmdW5jdGlvbicgPyBjaGlsZFZhbC5jYWxsKHZtKSA6IGNoaWxkVmFsO1xuICAgICAgICB2YXIgZGVmYXVsdERhdGEgPSB0eXBlb2YgcGFyZW50VmFsID09PSAnZnVuY3Rpb24nID8gcGFyZW50VmFsLmNhbGwodm0pIDogdW5kZWZpbmVkO1xuICAgICAgICBpZiAoaW5zdGFuY2VEYXRhKSB7XG4gICAgICAgICAgcmV0dXJuIG1lcmdlRGF0YShpbnN0YW5jZURhdGEsIGRlZmF1bHREYXRhKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXR1cm4gZGVmYXVsdERhdGE7XG4gICAgICAgIH1cbiAgICAgIH07XG4gICAgfVxuICB9O1xuXG4gIC8qKlxuICAgKiBFbFxuICAgKi9cblxuICBzdHJhdHMuZWwgPSBmdW5jdGlvbiAocGFyZW50VmFsLCBjaGlsZFZhbCwgdm0pIHtcbiAgICBpZiAoIXZtICYmIGNoaWxkVmFsICYmIHR5cGVvZiBjaGlsZFZhbCAhPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgJ2RldmVsb3BtZW50JyAhPT0gJ3Byb2R1Y3Rpb24nICYmIHdhcm4oJ1RoZSBcImVsXCIgb3B0aW9uIHNob3VsZCBiZSBhIGZ1bmN0aW9uICcgKyAndGhhdCByZXR1cm5zIGEgcGVyLWluc3RhbmNlIHZhbHVlIGluIGNvbXBvbmVudCAnICsgJ2RlZmluaXRpb25zLicsIHZtKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdmFyIHJldCA9IGNoaWxkVmFsIHx8IHBhcmVudFZhbDtcbiAgICAvLyBpbnZva2UgdGhlIGVsZW1lbnQgZmFjdG9yeSBpZiB0aGlzIGlzIGluc3RhbmNlIG1lcmdlXG4gICAgcmV0dXJuIHZtICYmIHR5cGVvZiByZXQgPT09ICdmdW5jdGlvbicgPyByZXQuY2FsbCh2bSkgOiByZXQ7XG4gIH07XG5cbiAgLyoqXG4gICAqIEhvb2tzIGFuZCBwYXJhbSBhdHRyaWJ1dGVzIGFyZSBtZXJnZWQgYXMgYXJyYXlzLlxuICAgKi9cblxuICBzdHJhdHMuaW5pdCA9IHN0cmF0cy5jcmVhdGVkID0gc3RyYXRzLnJlYWR5ID0gc3RyYXRzLmF0dGFjaGVkID0gc3RyYXRzLmRldGFjaGVkID0gc3RyYXRzLmJlZm9yZUNvbXBpbGUgPSBzdHJhdHMuY29tcGlsZWQgPSBzdHJhdHMuYmVmb3JlRGVzdHJveSA9IHN0cmF0cy5kZXN0cm95ZWQgPSBzdHJhdHMuYWN0aXZhdGUgPSBmdW5jdGlvbiAocGFyZW50VmFsLCBjaGlsZFZhbCkge1xuICAgIHJldHVybiBjaGlsZFZhbCA/IHBhcmVudFZhbCA/IHBhcmVudFZhbC5jb25jYXQoY2hpbGRWYWwpIDogaXNBcnJheShjaGlsZFZhbCkgPyBjaGlsZFZhbCA6IFtjaGlsZFZhbF0gOiBwYXJlbnRWYWw7XG4gIH07XG5cbiAgLyoqXG4gICAqIEFzc2V0c1xuICAgKlxuICAgKiBXaGVuIGEgdm0gaXMgcHJlc2VudCAoaW5zdGFuY2UgY3JlYXRpb24pLCB3ZSBuZWVkIHRvIGRvXG4gICAqIGEgdGhyZWUtd2F5IG1lcmdlIGJldHdlZW4gY29uc3RydWN0b3Igb3B0aW9ucywgaW5zdGFuY2VcbiAgICogb3B0aW9ucyBhbmQgcGFyZW50IG9wdGlvbnMuXG4gICAqL1xuXG4gIGZ1bmN0aW9uIG1lcmdlQXNzZXRzKHBhcmVudFZhbCwgY2hpbGRWYWwpIHtcbiAgICB2YXIgcmVzID0gT2JqZWN0LmNyZWF0ZShwYXJlbnRWYWwgfHwgbnVsbCk7XG4gICAgcmV0dXJuIGNoaWxkVmFsID8gZXh0ZW5kKHJlcywgZ3VhcmRBcnJheUFzc2V0cyhjaGlsZFZhbCkpIDogcmVzO1xuICB9XG5cbiAgY29uZmlnLl9hc3NldFR5cGVzLmZvckVhY2goZnVuY3Rpb24gKHR5cGUpIHtcbiAgICBzdHJhdHNbdHlwZSArICdzJ10gPSBtZXJnZUFzc2V0cztcbiAgfSk7XG5cbiAgLyoqXG4gICAqIEV2ZW50cyAmIFdhdGNoZXJzLlxuICAgKlxuICAgKiBFdmVudHMgJiB3YXRjaGVycyBoYXNoZXMgc2hvdWxkIG5vdCBvdmVyd3JpdGUgb25lXG4gICAqIGFub3RoZXIsIHNvIHdlIG1lcmdlIHRoZW0gYXMgYXJyYXlzLlxuICAgKi9cblxuICBzdHJhdHMud2F0Y2ggPSBzdHJhdHMuZXZlbnRzID0gZnVuY3Rpb24gKHBhcmVudFZhbCwgY2hpbGRWYWwpIHtcbiAgICBpZiAoIWNoaWxkVmFsKSByZXR1cm4gcGFyZW50VmFsO1xuICAgIGlmICghcGFyZW50VmFsKSByZXR1cm4gY2hpbGRWYWw7XG4gICAgdmFyIHJldCA9IHt9O1xuICAgIGV4dGVuZChyZXQsIHBhcmVudFZhbCk7XG4gICAgZm9yICh2YXIga2V5IGluIGNoaWxkVmFsKSB7XG4gICAgICB2YXIgcGFyZW50ID0gcmV0W2tleV07XG4gICAgICB2YXIgY2hpbGQgPSBjaGlsZFZhbFtrZXldO1xuICAgICAgaWYgKHBhcmVudCAmJiAhaXNBcnJheShwYXJlbnQpKSB7XG4gICAgICAgIHBhcmVudCA9IFtwYXJlbnRdO1xuICAgICAgfVxuICAgICAgcmV0W2tleV0gPSBwYXJlbnQgPyBwYXJlbnQuY29uY2F0KGNoaWxkKSA6IFtjaGlsZF07XG4gICAgfVxuICAgIHJldHVybiByZXQ7XG4gIH07XG5cbiAgLyoqXG4gICAqIE90aGVyIG9iamVjdCBoYXNoZXMuXG4gICAqL1xuXG4gIHN0cmF0cy5wcm9wcyA9IHN0cmF0cy5tZXRob2RzID0gc3RyYXRzLmNvbXB1dGVkID0gZnVuY3Rpb24gKHBhcmVudFZhbCwgY2hpbGRWYWwpIHtcbiAgICBpZiAoIWNoaWxkVmFsKSByZXR1cm4gcGFyZW50VmFsO1xuICAgIGlmICghcGFyZW50VmFsKSByZXR1cm4gY2hpbGRWYWw7XG4gICAgdmFyIHJldCA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gICAgZXh0ZW5kKHJldCwgcGFyZW50VmFsKTtcbiAgICBleHRlbmQocmV0LCBjaGlsZFZhbCk7XG4gICAgcmV0dXJuIHJldDtcbiAgfTtcblxuICAvKipcbiAgICogRGVmYXVsdCBzdHJhdGVneS5cbiAgICovXG5cbiAgdmFyIGRlZmF1bHRTdHJhdCA9IGZ1bmN0aW9uIGRlZmF1bHRTdHJhdChwYXJlbnRWYWwsIGNoaWxkVmFsKSB7XG4gICAgcmV0dXJuIGNoaWxkVmFsID09PSB1bmRlZmluZWQgPyBwYXJlbnRWYWwgOiBjaGlsZFZhbDtcbiAgfTtcblxuICAvKipcbiAgICogTWFrZSBzdXJlIGNvbXBvbmVudCBvcHRpb25zIGdldCBjb252ZXJ0ZWQgdG8gYWN0dWFsXG4gICAqIGNvbnN0cnVjdG9ycy5cbiAgICpcbiAgICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnNcbiAgICovXG5cbiAgZnVuY3Rpb24gZ3VhcmRDb21wb25lbnRzKG9wdGlvbnMpIHtcbiAgICBpZiAob3B0aW9ucy5jb21wb25lbnRzKSB7XG4gICAgICB2YXIgY29tcG9uZW50cyA9IG9wdGlvbnMuY29tcG9uZW50cyA9IGd1YXJkQXJyYXlBc3NldHMob3B0aW9ucy5jb21wb25lbnRzKTtcbiAgICAgIHZhciBpZHMgPSBPYmplY3Qua2V5cyhjb21wb25lbnRzKTtcbiAgICAgIHZhciBkZWY7XG4gICAgICBpZiAoJ2RldmVsb3BtZW50JyAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgICAgIHZhciBtYXAgPSBvcHRpb25zLl9jb21wb25lbnROYW1lTWFwID0ge307XG4gICAgICB9XG4gICAgICBmb3IgKHZhciBpID0gMCwgbCA9IGlkcy5sZW5ndGg7IGkgPCBsOyBpKyspIHtcbiAgICAgICAgdmFyIGtleSA9IGlkc1tpXTtcbiAgICAgICAgaWYgKGNvbW1vblRhZ1JFLnRlc3Qoa2V5KSB8fCByZXNlcnZlZFRhZ1JFLnRlc3Qoa2V5KSkge1xuICAgICAgICAgICdkZXZlbG9wbWVudCcgIT09ICdwcm9kdWN0aW9uJyAmJiB3YXJuKCdEbyBub3QgdXNlIGJ1aWx0LWluIG9yIHJlc2VydmVkIEhUTUwgZWxlbWVudHMgYXMgY29tcG9uZW50ICcgKyAnaWQ6ICcgKyBrZXkpO1xuICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICB9XG4gICAgICAgIC8vIHJlY29yZCBhIGFsbCBsb3dlcmNhc2UgPC0+IGtlYmFiLWNhc2UgbWFwcGluZyBmb3JcbiAgICAgICAgLy8gcG9zc2libGUgY3VzdG9tIGVsZW1lbnQgY2FzZSBlcnJvciB3YXJuaW5nXG4gICAgICAgIGlmICgnZGV2ZWxvcG1lbnQnICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICAgICAgICBtYXBba2V5LnJlcGxhY2UoLy0vZywgJycpLnRvTG93ZXJDYXNlKCldID0gaHlwaGVuYXRlKGtleSk7XG4gICAgICAgIH1cbiAgICAgICAgZGVmID0gY29tcG9uZW50c1trZXldO1xuICAgICAgICBpZiAoaXNQbGFpbk9iamVjdChkZWYpKSB7XG4gICAgICAgICAgY29tcG9uZW50c1trZXldID0gVnVlLmV4dGVuZChkZWYpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEVuc3VyZSBhbGwgcHJvcHMgb3B0aW9uIHN5bnRheCBhcmUgbm9ybWFsaXplZCBpbnRvIHRoZVxuICAgKiBPYmplY3QtYmFzZWQgZm9ybWF0LlxuICAgKlxuICAgKiBAcGFyYW0ge09iamVjdH0gb3B0aW9uc1xuICAgKi9cblxuICBmdW5jdGlvbiBndWFyZFByb3BzKG9wdGlvbnMpIHtcbiAgICB2YXIgcHJvcHMgPSBvcHRpb25zLnByb3BzO1xuICAgIHZhciBpLCB2YWw7XG4gICAgaWYgKGlzQXJyYXkocHJvcHMpKSB7XG4gICAgICBvcHRpb25zLnByb3BzID0ge307XG4gICAgICBpID0gcHJvcHMubGVuZ3RoO1xuICAgICAgd2hpbGUgKGktLSkge1xuICAgICAgICB2YWwgPSBwcm9wc1tpXTtcbiAgICAgICAgaWYgKHR5cGVvZiB2YWwgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgb3B0aW9ucy5wcm9wc1t2YWxdID0gbnVsbDtcbiAgICAgICAgfSBlbHNlIGlmICh2YWwubmFtZSkge1xuICAgICAgICAgIG9wdGlvbnMucHJvcHNbdmFsLm5hbWVdID0gdmFsO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSBlbHNlIGlmIChpc1BsYWluT2JqZWN0KHByb3BzKSkge1xuICAgICAgdmFyIGtleXMgPSBPYmplY3Qua2V5cyhwcm9wcyk7XG4gICAgICBpID0ga2V5cy5sZW5ndGg7XG4gICAgICB3aGlsZSAoaS0tKSB7XG4gICAgICAgIHZhbCA9IHByb3BzW2tleXNbaV1dO1xuICAgICAgICBpZiAodHlwZW9mIHZhbCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgIHByb3BzW2tleXNbaV1dID0geyB0eXBlOiB2YWwgfTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBHdWFyZCBhbiBBcnJheS1mb3JtYXQgYXNzZXRzIG9wdGlvbiBhbmQgY29udmVydGVkIGl0XG4gICAqIGludG8gdGhlIGtleS12YWx1ZSBPYmplY3QgZm9ybWF0LlxuICAgKlxuICAgKiBAcGFyYW0ge09iamVjdHxBcnJheX0gYXNzZXRzXG4gICAqIEByZXR1cm4ge09iamVjdH1cbiAgICovXG5cbiAgZnVuY3Rpb24gZ3VhcmRBcnJheUFzc2V0cyhhc3NldHMpIHtcbiAgICBpZiAoaXNBcnJheShhc3NldHMpKSB7XG4gICAgICB2YXIgcmVzID0ge307XG4gICAgICB2YXIgaSA9IGFzc2V0cy5sZW5ndGg7XG4gICAgICB2YXIgYXNzZXQ7XG4gICAgICB3aGlsZSAoaS0tKSB7XG4gICAgICAgIGFzc2V0ID0gYXNzZXRzW2ldO1xuICAgICAgICB2YXIgaWQgPSB0eXBlb2YgYXNzZXQgPT09ICdmdW5jdGlvbicgPyBhc3NldC5vcHRpb25zICYmIGFzc2V0Lm9wdGlvbnMubmFtZSB8fCBhc3NldC5pZCA6IGFzc2V0Lm5hbWUgfHwgYXNzZXQuaWQ7XG4gICAgICAgIGlmICghaWQpIHtcbiAgICAgICAgICAnZGV2ZWxvcG1lbnQnICE9PSAncHJvZHVjdGlvbicgJiYgd2FybignQXJyYXktc3ludGF4IGFzc2V0cyBtdXN0IHByb3ZpZGUgYSBcIm5hbWVcIiBvciBcImlkXCIgZmllbGQuJyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmVzW2lkXSA9IGFzc2V0O1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gcmVzO1xuICAgIH1cbiAgICByZXR1cm4gYXNzZXRzO1xuICB9XG5cbiAgLyoqXG4gICAqIE1lcmdlIHR3byBvcHRpb24gb2JqZWN0cyBpbnRvIGEgbmV3IG9uZS5cbiAgICogQ29yZSB1dGlsaXR5IHVzZWQgaW4gYm90aCBpbnN0YW50aWF0aW9uIGFuZCBpbmhlcml0YW5jZS5cbiAgICpcbiAgICogQHBhcmFtIHtPYmplY3R9IHBhcmVudFxuICAgKiBAcGFyYW0ge09iamVjdH0gY2hpbGRcbiAgICogQHBhcmFtIHtWdWV9IFt2bV0gLSBpZiB2bSBpcyBwcmVzZW50LCBpbmRpY2F0ZXMgdGhpcyBpc1xuICAgKiAgICAgICAgICAgICAgICAgICAgIGFuIGluc3RhbnRpYXRpb24gbWVyZ2UuXG4gICAqL1xuXG4gIGZ1bmN0aW9uIG1lcmdlT3B0aW9ucyhwYXJlbnQsIGNoaWxkLCB2bSkge1xuICAgIGd1YXJkQ29tcG9uZW50cyhjaGlsZCk7XG4gICAgZ3VhcmRQcm9wcyhjaGlsZCk7XG4gICAgaWYgKCdkZXZlbG9wbWVudCcgIT09ICdwcm9kdWN0aW9uJykge1xuICAgICAgaWYgKGNoaWxkLnByb3BzRGF0YSAmJiAhdm0pIHtcbiAgICAgICAgd2FybigncHJvcHNEYXRhIGNhbiBvbmx5IGJlIHVzZWQgYXMgYW4gaW5zdGFudGlhdGlvbiBvcHRpb24uJyk7XG4gICAgICB9XG4gICAgfVxuICAgIHZhciBvcHRpb25zID0ge307XG4gICAgdmFyIGtleTtcbiAgICBpZiAoY2hpbGRbJ2V4dGVuZHMnXSkge1xuICAgICAgcGFyZW50ID0gdHlwZW9mIGNoaWxkWydleHRlbmRzJ10gPT09ICdmdW5jdGlvbicgPyBtZXJnZU9wdGlvbnMocGFyZW50LCBjaGlsZFsnZXh0ZW5kcyddLm9wdGlvbnMsIHZtKSA6IG1lcmdlT3B0aW9ucyhwYXJlbnQsIGNoaWxkWydleHRlbmRzJ10sIHZtKTtcbiAgICB9XG4gICAgaWYgKGNoaWxkLm1peGlucykge1xuICAgICAgZm9yICh2YXIgaSA9IDAsIGwgPSBjaGlsZC5taXhpbnMubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG4gICAgICAgIHBhcmVudCA9IG1lcmdlT3B0aW9ucyhwYXJlbnQsIGNoaWxkLm1peGluc1tpXSwgdm0pO1xuICAgICAgfVxuICAgIH1cbiAgICBmb3IgKGtleSBpbiBwYXJlbnQpIHtcbiAgICAgIG1lcmdlRmllbGQoa2V5KTtcbiAgICB9XG4gICAgZm9yIChrZXkgaW4gY2hpbGQpIHtcbiAgICAgIGlmICghaGFzT3duKHBhcmVudCwga2V5KSkge1xuICAgICAgICBtZXJnZUZpZWxkKGtleSk7XG4gICAgICB9XG4gICAgfVxuICAgIGZ1bmN0aW9uIG1lcmdlRmllbGQoa2V5KSB7XG4gICAgICB2YXIgc3RyYXQgPSBzdHJhdHNba2V5XSB8fCBkZWZhdWx0U3RyYXQ7XG4gICAgICBvcHRpb25zW2tleV0gPSBzdHJhdChwYXJlbnRba2V5XSwgY2hpbGRba2V5XSwgdm0sIGtleSk7XG4gICAgfVxuICAgIHJldHVybiBvcHRpb25zO1xuICB9XG5cbiAgLyoqXG4gICAqIFJlc29sdmUgYW4gYXNzZXQuXG4gICAqIFRoaXMgZnVuY3Rpb24gaXMgdXNlZCBiZWNhdXNlIGNoaWxkIGluc3RhbmNlcyBuZWVkIGFjY2Vzc1xuICAgKiB0byBhc3NldHMgZGVmaW5lZCBpbiBpdHMgYW5jZXN0b3IgY2hhaW4uXG4gICAqXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zXG4gICAqIEBwYXJhbSB7U3RyaW5nfSB0eXBlXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBpZFxuICAgKiBAcGFyYW0ge0Jvb2xlYW59IHdhcm5NaXNzaW5nXG4gICAqIEByZXR1cm4ge09iamVjdHxGdW5jdGlvbn1cbiAgICovXG5cbiAgZnVuY3Rpb24gcmVzb2x2ZUFzc2V0KG9wdGlvbnMsIHR5cGUsIGlkLCB3YXJuTWlzc2luZykge1xuICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBpZiAqL1xuICAgIGlmICh0eXBlb2YgaWQgIT09ICdzdHJpbmcnKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHZhciBhc3NldHMgPSBvcHRpb25zW3R5cGVdO1xuICAgIHZhciBjYW1lbGl6ZWRJZDtcbiAgICB2YXIgcmVzID0gYXNzZXRzW2lkXSB8fFxuICAgIC8vIGNhbWVsQ2FzZSBJRFxuICAgIGFzc2V0c1tjYW1lbGl6ZWRJZCA9IGNhbWVsaXplKGlkKV0gfHxcbiAgICAvLyBQYXNjYWwgQ2FzZSBJRFxuICAgIGFzc2V0c1tjYW1lbGl6ZWRJZC5jaGFyQXQoMCkudG9VcHBlckNhc2UoKSArIGNhbWVsaXplZElkLnNsaWNlKDEpXTtcbiAgICBpZiAoJ2RldmVsb3BtZW50JyAhPT0gJ3Byb2R1Y3Rpb24nICYmIHdhcm5NaXNzaW5nICYmICFyZXMpIHtcbiAgICAgIHdhcm4oJ0ZhaWxlZCB0byByZXNvbHZlICcgKyB0eXBlLnNsaWNlKDAsIC0xKSArICc6ICcgKyBpZCwgb3B0aW9ucyk7XG4gICAgfVxuICAgIHJldHVybiByZXM7XG4gIH1cblxuICB2YXIgdWlkJDEgPSAwO1xuXG4gIC8qKlxuICAgKiBBIGRlcCBpcyBhbiBvYnNlcnZhYmxlIHRoYXQgY2FuIGhhdmUgbXVsdGlwbGVcbiAgICogZGlyZWN0aXZlcyBzdWJzY3JpYmluZyB0byBpdC5cbiAgICpcbiAgICogQGNvbnN0cnVjdG9yXG4gICAqL1xuICBmdW5jdGlvbiBEZXAoKSB7XG4gICAgdGhpcy5pZCA9IHVpZCQxKys7XG4gICAgdGhpcy5zdWJzID0gW107XG4gIH1cblxuICAvLyB0aGUgY3VycmVudCB0YXJnZXQgd2F0Y2hlciBiZWluZyBldmFsdWF0ZWQuXG4gIC8vIHRoaXMgaXMgZ2xvYmFsbHkgdW5pcXVlIGJlY2F1c2UgdGhlcmUgY291bGQgYmUgb25seSBvbmVcbiAgLy8gd2F0Y2hlciBiZWluZyBldmFsdWF0ZWQgYXQgYW55IHRpbWUuXG4gIERlcC50YXJnZXQgPSBudWxsO1xuXG4gIC8qKlxuICAgKiBBZGQgYSBkaXJlY3RpdmUgc3Vic2NyaWJlci5cbiAgICpcbiAgICogQHBhcmFtIHtEaXJlY3RpdmV9IHN1YlxuICAgKi9cblxuICBEZXAucHJvdG90eXBlLmFkZFN1YiA9IGZ1bmN0aW9uIChzdWIpIHtcbiAgICB0aGlzLnN1YnMucHVzaChzdWIpO1xuICB9O1xuXG4gIC8qKlxuICAgKiBSZW1vdmUgYSBkaXJlY3RpdmUgc3Vic2NyaWJlci5cbiAgICpcbiAgICogQHBhcmFtIHtEaXJlY3RpdmV9IHN1YlxuICAgKi9cblxuICBEZXAucHJvdG90eXBlLnJlbW92ZVN1YiA9IGZ1bmN0aW9uIChzdWIpIHtcbiAgICB0aGlzLnN1YnMuJHJlbW92ZShzdWIpO1xuICB9O1xuXG4gIC8qKlxuICAgKiBBZGQgc2VsZiBhcyBhIGRlcGVuZGVuY3kgdG8gdGhlIHRhcmdldCB3YXRjaGVyLlxuICAgKi9cblxuICBEZXAucHJvdG90eXBlLmRlcGVuZCA9IGZ1bmN0aW9uICgpIHtcbiAgICBEZXAudGFyZ2V0LmFkZERlcCh0aGlzKTtcbiAgfTtcblxuICAvKipcbiAgICogTm90aWZ5IGFsbCBzdWJzY3JpYmVycyBvZiBhIG5ldyB2YWx1ZS5cbiAgICovXG5cbiAgRGVwLnByb3RvdHlwZS5ub3RpZnkgPSBmdW5jdGlvbiAoKSB7XG4gICAgLy8gc3RhYmxpemUgdGhlIHN1YnNjcmliZXIgbGlzdCBmaXJzdFxuICAgIHZhciBzdWJzID0gdG9BcnJheSh0aGlzLnN1YnMpO1xuICAgIGZvciAodmFyIGkgPSAwLCBsID0gc3Vicy5sZW5ndGg7IGkgPCBsOyBpKyspIHtcbiAgICAgIHN1YnNbaV0udXBkYXRlKCk7XG4gICAgfVxuICB9O1xuXG4gIHZhciBhcnJheVByb3RvID0gQXJyYXkucHJvdG90eXBlO1xuICB2YXIgYXJyYXlNZXRob2RzID0gT2JqZWN0LmNyZWF0ZShhcnJheVByb3RvKVxuXG4gIC8qKlxuICAgKiBJbnRlcmNlcHQgbXV0YXRpbmcgbWV0aG9kcyBhbmQgZW1pdCBldmVudHNcbiAgICovXG5cbiAgO1sncHVzaCcsICdwb3AnLCAnc2hpZnQnLCAndW5zaGlmdCcsICdzcGxpY2UnLCAnc29ydCcsICdyZXZlcnNlJ10uZm9yRWFjaChmdW5jdGlvbiAobWV0aG9kKSB7XG4gICAgLy8gY2FjaGUgb3JpZ2luYWwgbWV0aG9kXG4gICAgdmFyIG9yaWdpbmFsID0gYXJyYXlQcm90b1ttZXRob2RdO1xuICAgIGRlZihhcnJheU1ldGhvZHMsIG1ldGhvZCwgZnVuY3Rpb24gbXV0YXRvcigpIHtcbiAgICAgIC8vIGF2b2lkIGxlYWtpbmcgYXJndW1lbnRzOlxuICAgICAgLy8gaHR0cDovL2pzcGVyZi5jb20vY2xvc3VyZS13aXRoLWFyZ3VtZW50c1xuICAgICAgdmFyIGkgPSBhcmd1bWVudHMubGVuZ3RoO1xuICAgICAgdmFyIGFyZ3MgPSBuZXcgQXJyYXkoaSk7XG4gICAgICB3aGlsZSAoaS0tKSB7XG4gICAgICAgIGFyZ3NbaV0gPSBhcmd1bWVudHNbaV07XG4gICAgICB9XG4gICAgICB2YXIgcmVzdWx0ID0gb3JpZ2luYWwuYXBwbHkodGhpcywgYXJncyk7XG4gICAgICB2YXIgb2IgPSB0aGlzLl9fb2JfXztcbiAgICAgIHZhciBpbnNlcnRlZDtcbiAgICAgIHN3aXRjaCAobWV0aG9kKSB7XG4gICAgICAgIGNhc2UgJ3B1c2gnOlxuICAgICAgICAgIGluc2VydGVkID0gYXJncztcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAndW5zaGlmdCc6XG4gICAgICAgICAgaW5zZXJ0ZWQgPSBhcmdzO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlICdzcGxpY2UnOlxuICAgICAgICAgIGluc2VydGVkID0gYXJncy5zbGljZSgyKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICAgIGlmIChpbnNlcnRlZCkgb2Iub2JzZXJ2ZUFycmF5KGluc2VydGVkKTtcbiAgICAgIC8vIG5vdGlmeSBjaGFuZ2VcbiAgICAgIG9iLmRlcC5ub3RpZnkoKTtcbiAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfSk7XG4gIH0pO1xuXG4gIC8qKlxuICAgKiBTd2FwIHRoZSBlbGVtZW50IGF0IHRoZSBnaXZlbiBpbmRleCB3aXRoIGEgbmV3IHZhbHVlXG4gICAqIGFuZCBlbWl0cyBjb3JyZXNwb25kaW5nIGV2ZW50LlxuICAgKlxuICAgKiBAcGFyYW0ge051bWJlcn0gaW5kZXhcbiAgICogQHBhcmFtIHsqfSB2YWxcbiAgICogQHJldHVybiB7Kn0gLSByZXBsYWNlZCBlbGVtZW50XG4gICAqL1xuXG4gIGRlZihhcnJheVByb3RvLCAnJHNldCcsIGZ1bmN0aW9uICRzZXQoaW5kZXgsIHZhbCkge1xuICAgIGlmIChpbmRleCA+PSB0aGlzLmxlbmd0aCkge1xuICAgICAgdGhpcy5sZW5ndGggPSBOdW1iZXIoaW5kZXgpICsgMTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMuc3BsaWNlKGluZGV4LCAxLCB2YWwpWzBdO1xuICB9KTtcblxuICAvKipcbiAgICogQ29udmVuaWVuY2UgbWV0aG9kIHRvIHJlbW92ZSB0aGUgZWxlbWVudCBhdCBnaXZlbiBpbmRleCBvciB0YXJnZXQgZWxlbWVudCByZWZlcmVuY2UuXG4gICAqXG4gICAqIEBwYXJhbSB7Kn0gaXRlbVxuICAgKi9cblxuICBkZWYoYXJyYXlQcm90bywgJyRyZW1vdmUnLCBmdW5jdGlvbiAkcmVtb3ZlKGl0ZW0pIHtcbiAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgaWYgKi9cbiAgICBpZiAoIXRoaXMubGVuZ3RoKSByZXR1cm47XG4gICAgdmFyIGluZGV4ID0gaW5kZXhPZih0aGlzLCBpdGVtKTtcbiAgICBpZiAoaW5kZXggPiAtMSkge1xuICAgICAgcmV0dXJuIHRoaXMuc3BsaWNlKGluZGV4LCAxKTtcbiAgICB9XG4gIH0pO1xuXG4gIHZhciBhcnJheUtleXMgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyhhcnJheU1ldGhvZHMpO1xuXG4gIC8qKlxuICAgKiBCeSBkZWZhdWx0LCB3aGVuIGEgcmVhY3RpdmUgcHJvcGVydHkgaXMgc2V0LCB0aGUgbmV3IHZhbHVlIGlzXG4gICAqIGFsc28gY29udmVydGVkIHRvIGJlY29tZSByZWFjdGl2ZS4gSG93ZXZlciBpbiBjZXJ0YWluIGNhc2VzLCBlLmcuXG4gICAqIHYtZm9yIHNjb3BlIGFsaWFzIGFuZCBwcm9wcywgd2UgZG9uJ3Qgd2FudCB0byBmb3JjZSBjb252ZXJzaW9uXG4gICAqIGJlY2F1c2UgdGhlIHZhbHVlIG1heSBiZSBhIG5lc3RlZCB2YWx1ZSB1bmRlciBhIGZyb3plbiBkYXRhIHN0cnVjdHVyZS5cbiAgICpcbiAgICogU28gd2hlbmV2ZXIgd2Ugd2FudCB0byBzZXQgYSByZWFjdGl2ZSBwcm9wZXJ0eSB3aXRob3V0IGZvcmNpbmdcbiAgICogY29udmVyc2lvbiBvbiB0aGUgbmV3IHZhbHVlLCB3ZSB3cmFwIHRoYXQgY2FsbCBpbnNpZGUgdGhpcyBmdW5jdGlvbi5cbiAgICovXG5cbiAgdmFyIHNob3VsZENvbnZlcnQgPSB0cnVlO1xuXG4gIGZ1bmN0aW9uIHdpdGhvdXRDb252ZXJzaW9uKGZuKSB7XG4gICAgc2hvdWxkQ29udmVydCA9IGZhbHNlO1xuICAgIGZuKCk7XG4gICAgc2hvdWxkQ29udmVydCA9IHRydWU7XG4gIH1cblxuICAvKipcbiAgICogT2JzZXJ2ZXIgY2xhc3MgdGhhdCBhcmUgYXR0YWNoZWQgdG8gZWFjaCBvYnNlcnZlZFxuICAgKiBvYmplY3QuIE9uY2UgYXR0YWNoZWQsIHRoZSBvYnNlcnZlciBjb252ZXJ0cyB0YXJnZXRcbiAgICogb2JqZWN0J3MgcHJvcGVydHkga2V5cyBpbnRvIGdldHRlci9zZXR0ZXJzIHRoYXRcbiAgICogY29sbGVjdCBkZXBlbmRlbmNpZXMgYW5kIGRpc3BhdGNoZXMgdXBkYXRlcy5cbiAgICpcbiAgICogQHBhcmFtIHtBcnJheXxPYmplY3R9IHZhbHVlXG4gICAqIEBjb25zdHJ1Y3RvclxuICAgKi9cblxuICBmdW5jdGlvbiBPYnNlcnZlcih2YWx1ZSkge1xuICAgIHRoaXMudmFsdWUgPSB2YWx1ZTtcbiAgICB0aGlzLmRlcCA9IG5ldyBEZXAoKTtcbiAgICBkZWYodmFsdWUsICdfX29iX18nLCB0aGlzKTtcbiAgICBpZiAoaXNBcnJheSh2YWx1ZSkpIHtcbiAgICAgIHZhciBhdWdtZW50ID0gaGFzUHJvdG8gPyBwcm90b0F1Z21lbnQgOiBjb3B5QXVnbWVudDtcbiAgICAgIGF1Z21lbnQodmFsdWUsIGFycmF5TWV0aG9kcywgYXJyYXlLZXlzKTtcbiAgICAgIHRoaXMub2JzZXJ2ZUFycmF5KHZhbHVlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy53YWxrKHZhbHVlKTtcbiAgICB9XG4gIH1cblxuICAvLyBJbnN0YW5jZSBtZXRob2RzXG5cbiAgLyoqXG4gICAqIFdhbGsgdGhyb3VnaCBlYWNoIHByb3BlcnR5IGFuZCBjb252ZXJ0IHRoZW0gaW50b1xuICAgKiBnZXR0ZXIvc2V0dGVycy4gVGhpcyBtZXRob2Qgc2hvdWxkIG9ubHkgYmUgY2FsbGVkIHdoZW5cbiAgICogdmFsdWUgdHlwZSBpcyBPYmplY3QuXG4gICAqXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBvYmpcbiAgICovXG5cbiAgT2JzZXJ2ZXIucHJvdG90eXBlLndhbGsgPSBmdW5jdGlvbiAob2JqKSB7XG4gICAgdmFyIGtleXMgPSBPYmplY3Qua2V5cyhvYmopO1xuICAgIGZvciAodmFyIGkgPSAwLCBsID0ga2V5cy5sZW5ndGg7IGkgPCBsOyBpKyspIHtcbiAgICAgIHRoaXMuY29udmVydChrZXlzW2ldLCBvYmpba2V5c1tpXV0pO1xuICAgIH1cbiAgfTtcblxuICAvKipcbiAgICogT2JzZXJ2ZSBhIGxpc3Qgb2YgQXJyYXkgaXRlbXMuXG4gICAqXG4gICAqIEBwYXJhbSB7QXJyYXl9IGl0ZW1zXG4gICAqL1xuXG4gIE9ic2VydmVyLnByb3RvdHlwZS5vYnNlcnZlQXJyYXkgPSBmdW5jdGlvbiAoaXRlbXMpIHtcbiAgICBmb3IgKHZhciBpID0gMCwgbCA9IGl0ZW1zLmxlbmd0aDsgaSA8IGw7IGkrKykge1xuICAgICAgb2JzZXJ2ZShpdGVtc1tpXSk7XG4gICAgfVxuICB9O1xuXG4gIC8qKlxuICAgKiBDb252ZXJ0IGEgcHJvcGVydHkgaW50byBnZXR0ZXIvc2V0dGVyIHNvIHdlIGNhbiBlbWl0XG4gICAqIHRoZSBldmVudHMgd2hlbiB0aGUgcHJvcGVydHkgaXMgYWNjZXNzZWQvY2hhbmdlZC5cbiAgICpcbiAgICogQHBhcmFtIHtTdHJpbmd9IGtleVxuICAgKiBAcGFyYW0geyp9IHZhbFxuICAgKi9cblxuICBPYnNlcnZlci5wcm90b3R5cGUuY29udmVydCA9IGZ1bmN0aW9uIChrZXksIHZhbCkge1xuICAgIGRlZmluZVJlYWN0aXZlKHRoaXMudmFsdWUsIGtleSwgdmFsKTtcbiAgfTtcblxuICAvKipcbiAgICogQWRkIGFuIG93bmVyIHZtLCBzbyB0aGF0IHdoZW4gJHNldC8kZGVsZXRlIG11dGF0aW9uc1xuICAgKiBoYXBwZW4gd2UgY2FuIG5vdGlmeSBvd25lciB2bXMgdG8gcHJveHkgdGhlIGtleXMgYW5kXG4gICAqIGRpZ2VzdCB0aGUgd2F0Y2hlcnMuIFRoaXMgaXMgb25seSBjYWxsZWQgd2hlbiB0aGUgb2JqZWN0XG4gICAqIGlzIG9ic2VydmVkIGFzIGFuIGluc3RhbmNlJ3Mgcm9vdCAkZGF0YS5cbiAgICpcbiAgICogQHBhcmFtIHtWdWV9IHZtXG4gICAqL1xuXG4gIE9ic2VydmVyLnByb3RvdHlwZS5hZGRWbSA9IGZ1bmN0aW9uICh2bSkge1xuICAgICh0aGlzLnZtcyB8fCAodGhpcy52bXMgPSBbXSkpLnB1c2godm0pO1xuICB9O1xuXG4gIC8qKlxuICAgKiBSZW1vdmUgYW4gb3duZXIgdm0uIFRoaXMgaXMgY2FsbGVkIHdoZW4gdGhlIG9iamVjdCBpc1xuICAgKiBzd2FwcGVkIG91dCBhcyBhbiBpbnN0YW5jZSdzICRkYXRhIG9iamVjdC5cbiAgICpcbiAgICogQHBhcmFtIHtWdWV9IHZtXG4gICAqL1xuXG4gIE9ic2VydmVyLnByb3RvdHlwZS5yZW1vdmVWbSA9IGZ1bmN0aW9uICh2bSkge1xuICAgIHRoaXMudm1zLiRyZW1vdmUodm0pO1xuICB9O1xuXG4gIC8vIGhlbHBlcnNcblxuICAvKipcbiAgICogQXVnbWVudCBhbiB0YXJnZXQgT2JqZWN0IG9yIEFycmF5IGJ5IGludGVyY2VwdGluZ1xuICAgKiB0aGUgcHJvdG90eXBlIGNoYWluIHVzaW5nIF9fcHJvdG9fX1xuICAgKlxuICAgKiBAcGFyYW0ge09iamVjdHxBcnJheX0gdGFyZ2V0XG4gICAqIEBwYXJhbSB7T2JqZWN0fSBzcmNcbiAgICovXG5cbiAgZnVuY3Rpb24gcHJvdG9BdWdtZW50KHRhcmdldCwgc3JjKSB7XG4gICAgLyogZXNsaW50LWRpc2FibGUgbm8tcHJvdG8gKi9cbiAgICB0YXJnZXQuX19wcm90b19fID0gc3JjO1xuICAgIC8qIGVzbGludC1lbmFibGUgbm8tcHJvdG8gKi9cbiAgfVxuXG4gIC8qKlxuICAgKiBBdWdtZW50IGFuIHRhcmdldCBPYmplY3Qgb3IgQXJyYXkgYnkgZGVmaW5pbmdcbiAgICogaGlkZGVuIHByb3BlcnRpZXMuXG4gICAqXG4gICAqIEBwYXJhbSB7T2JqZWN0fEFycmF5fSB0YXJnZXRcbiAgICogQHBhcmFtIHtPYmplY3R9IHByb3RvXG4gICAqL1xuXG4gIGZ1bmN0aW9uIGNvcHlBdWdtZW50KHRhcmdldCwgc3JjLCBrZXlzKSB7XG4gICAgZm9yICh2YXIgaSA9IDAsIGwgPSBrZXlzLmxlbmd0aDsgaSA8IGw7IGkrKykge1xuICAgICAgdmFyIGtleSA9IGtleXNbaV07XG4gICAgICBkZWYodGFyZ2V0LCBrZXksIHNyY1trZXldKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQXR0ZW1wdCB0byBjcmVhdGUgYW4gb2JzZXJ2ZXIgaW5zdGFuY2UgZm9yIGEgdmFsdWUsXG4gICAqIHJldHVybnMgdGhlIG5ldyBvYnNlcnZlciBpZiBzdWNjZXNzZnVsbHkgb2JzZXJ2ZWQsXG4gICAqIG9yIHRoZSBleGlzdGluZyBvYnNlcnZlciBpZiB0aGUgdmFsdWUgYWxyZWFkeSBoYXMgb25lLlxuICAgKlxuICAgKiBAcGFyYW0geyp9IHZhbHVlXG4gICAqIEBwYXJhbSB7VnVlfSBbdm1dXG4gICAqIEByZXR1cm4ge09ic2VydmVyfHVuZGVmaW5lZH1cbiAgICogQHN0YXRpY1xuICAgKi9cblxuICBmdW5jdGlvbiBvYnNlcnZlKHZhbHVlLCB2bSkge1xuICAgIGlmICghdmFsdWUgfHwgdHlwZW9mIHZhbHVlICE9PSAnb2JqZWN0Jykge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB2YXIgb2I7XG4gICAgaWYgKGhhc093bih2YWx1ZSwgJ19fb2JfXycpICYmIHZhbHVlLl9fb2JfXyBpbnN0YW5jZW9mIE9ic2VydmVyKSB7XG4gICAgICBvYiA9IHZhbHVlLl9fb2JfXztcbiAgICB9IGVsc2UgaWYgKHNob3VsZENvbnZlcnQgJiYgKGlzQXJyYXkodmFsdWUpIHx8IGlzUGxhaW5PYmplY3QodmFsdWUpKSAmJiBPYmplY3QuaXNFeHRlbnNpYmxlKHZhbHVlKSAmJiAhdmFsdWUuX2lzVnVlKSB7XG4gICAgICBvYiA9IG5ldyBPYnNlcnZlcih2YWx1ZSk7XG4gICAgfVxuICAgIGlmIChvYiAmJiB2bSkge1xuICAgICAgb2IuYWRkVm0odm0pO1xuICAgIH1cbiAgICByZXR1cm4gb2I7XG4gIH1cblxuICAvKipcbiAgICogRGVmaW5lIGEgcmVhY3RpdmUgcHJvcGVydHkgb24gYW4gT2JqZWN0LlxuICAgKlxuICAgKiBAcGFyYW0ge09iamVjdH0gb2JqXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBrZXlcbiAgICogQHBhcmFtIHsqfSB2YWxcbiAgICovXG5cbiAgZnVuY3Rpb24gZGVmaW5lUmVhY3RpdmUob2JqLCBrZXksIHZhbCkge1xuICAgIHZhciBkZXAgPSBuZXcgRGVwKCk7XG5cbiAgICB2YXIgcHJvcGVydHkgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKG9iaiwga2V5KTtcbiAgICBpZiAocHJvcGVydHkgJiYgcHJvcGVydHkuY29uZmlndXJhYmxlID09PSBmYWxzZSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIC8vIGNhdGVyIGZvciBwcmUtZGVmaW5lZCBnZXR0ZXIvc2V0dGVyc1xuICAgIHZhciBnZXR0ZXIgPSBwcm9wZXJ0eSAmJiBwcm9wZXJ0eS5nZXQ7XG4gICAgdmFyIHNldHRlciA9IHByb3BlcnR5ICYmIHByb3BlcnR5LnNldDtcblxuICAgIHZhciBjaGlsZE9iID0gb2JzZXJ2ZSh2YWwpO1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvYmosIGtleSwge1xuICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiAgICAgIGdldDogZnVuY3Rpb24gcmVhY3RpdmVHZXR0ZXIoKSB7XG4gICAgICAgIHZhciB2YWx1ZSA9IGdldHRlciA/IGdldHRlci5jYWxsKG9iaikgOiB2YWw7XG4gICAgICAgIGlmIChEZXAudGFyZ2V0KSB7XG4gICAgICAgICAgZGVwLmRlcGVuZCgpO1xuICAgICAgICAgIGlmIChjaGlsZE9iKSB7XG4gICAgICAgICAgICBjaGlsZE9iLmRlcC5kZXBlbmQoKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKGlzQXJyYXkodmFsdWUpKSB7XG4gICAgICAgICAgICBmb3IgKHZhciBlLCBpID0gMCwgbCA9IHZhbHVlLmxlbmd0aDsgaSA8IGw7IGkrKykge1xuICAgICAgICAgICAgICBlID0gdmFsdWVbaV07XG4gICAgICAgICAgICAgIGUgJiYgZS5fX29iX18gJiYgZS5fX29iX18uZGVwLmRlcGVuZCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdmFsdWU7XG4gICAgICB9LFxuICAgICAgc2V0OiBmdW5jdGlvbiByZWFjdGl2ZVNldHRlcihuZXdWYWwpIHtcbiAgICAgICAgdmFyIHZhbHVlID0gZ2V0dGVyID8gZ2V0dGVyLmNhbGwob2JqKSA6IHZhbDtcbiAgICAgICAgaWYgKG5ld1ZhbCA9PT0gdmFsdWUpIHtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHNldHRlcikge1xuICAgICAgICAgIHNldHRlci5jYWxsKG9iaiwgbmV3VmFsKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB2YWwgPSBuZXdWYWw7XG4gICAgICAgIH1cbiAgICAgICAgY2hpbGRPYiA9IG9ic2VydmUobmV3VmFsKTtcbiAgICAgICAgZGVwLm5vdGlmeSgpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cblxuXG4gIHZhciB1dGlsID0gT2JqZWN0LmZyZWV6ZSh7XG4gIFx0ZGVmaW5lUmVhY3RpdmU6IGRlZmluZVJlYWN0aXZlLFxuICBcdHNldDogc2V0LFxuICBcdGRlbDogZGVsLFxuICBcdGhhc093bjogaGFzT3duLFxuICBcdGlzTGl0ZXJhbDogaXNMaXRlcmFsLFxuICBcdGlzUmVzZXJ2ZWQ6IGlzUmVzZXJ2ZWQsXG4gIFx0X3RvU3RyaW5nOiBfdG9TdHJpbmcsXG4gIFx0dG9OdW1iZXI6IHRvTnVtYmVyLFxuICBcdHRvQm9vbGVhbjogdG9Cb29sZWFuLFxuICBcdHN0cmlwUXVvdGVzOiBzdHJpcFF1b3RlcyxcbiAgXHRjYW1lbGl6ZTogY2FtZWxpemUsXG4gIFx0aHlwaGVuYXRlOiBoeXBoZW5hdGUsXG4gIFx0Y2xhc3NpZnk6IGNsYXNzaWZ5LFxuICBcdGJpbmQ6IGJpbmQsXG4gIFx0dG9BcnJheTogdG9BcnJheSxcbiAgXHRleHRlbmQ6IGV4dGVuZCxcbiAgXHRpc09iamVjdDogaXNPYmplY3QsXG4gIFx0aXNQbGFpbk9iamVjdDogaXNQbGFpbk9iamVjdCxcbiAgXHRkZWY6IGRlZixcbiAgXHRkZWJvdW5jZTogX2RlYm91bmNlLFxuICBcdGluZGV4T2Y6IGluZGV4T2YsXG4gIFx0Y2FuY2VsbGFibGU6IGNhbmNlbGxhYmxlLFxuICBcdGxvb3NlRXF1YWw6IGxvb3NlRXF1YWwsXG4gIFx0aXNBcnJheTogaXNBcnJheSxcbiAgXHRoYXNQcm90bzogaGFzUHJvdG8sXG4gIFx0aW5Ccm93c2VyOiBpbkJyb3dzZXIsXG4gIFx0ZGV2dG9vbHM6IGRldnRvb2xzLFxuICBcdGlzSUU5OiBpc0lFOSxcbiAgXHRpc0FuZHJvaWQ6IGlzQW5kcm9pZCxcbiAgXHRpc0lvczogaXNJb3MsXG4gIFx0aXNXZWNoYXQ6IGlzV2VjaGF0LFxuICBcdGdldCB0cmFuc2l0aW9uUHJvcCAoKSB7IHJldHVybiB0cmFuc2l0aW9uUHJvcDsgfSxcbiAgXHRnZXQgdHJhbnNpdGlvbkVuZEV2ZW50ICgpIHsgcmV0dXJuIHRyYW5zaXRpb25FbmRFdmVudDsgfSxcbiAgXHRnZXQgYW5pbWF0aW9uUHJvcCAoKSB7IHJldHVybiBhbmltYXRpb25Qcm9wOyB9LFxuICBcdGdldCBhbmltYXRpb25FbmRFdmVudCAoKSB7IHJldHVybiBhbmltYXRpb25FbmRFdmVudDsgfSxcbiAgXHRuZXh0VGljazogbmV4dFRpY2ssXG4gIFx0Z2V0IF9TZXQgKCkgeyByZXR1cm4gX1NldDsgfSxcbiAgXHRxdWVyeTogcXVlcnksXG4gIFx0aW5Eb2M6IGluRG9jLFxuICBcdGdldEF0dHI6IGdldEF0dHIsXG4gIFx0Z2V0QmluZEF0dHI6IGdldEJpbmRBdHRyLFxuICBcdGhhc0JpbmRBdHRyOiBoYXNCaW5kQXR0cixcbiAgXHRiZWZvcmU6IGJlZm9yZSxcbiAgXHRhZnRlcjogYWZ0ZXIsXG4gIFx0cmVtb3ZlOiByZW1vdmUsXG4gIFx0cHJlcGVuZDogcHJlcGVuZCxcbiAgXHRyZXBsYWNlOiByZXBsYWNlLFxuICBcdG9uOiBvbixcbiAgXHRvZmY6IG9mZixcbiAgXHRzZXRDbGFzczogc2V0Q2xhc3MsXG4gIFx0YWRkQ2xhc3M6IGFkZENsYXNzLFxuICBcdHJlbW92ZUNsYXNzOiByZW1vdmVDbGFzcyxcbiAgXHRleHRyYWN0Q29udGVudDogZXh0cmFjdENvbnRlbnQsXG4gIFx0dHJpbU5vZGU6IHRyaW1Ob2RlLFxuICBcdGlzVGVtcGxhdGU6IGlzVGVtcGxhdGUsXG4gIFx0Y3JlYXRlQW5jaG9yOiBjcmVhdGVBbmNob3IsXG4gIFx0ZmluZFJlZjogZmluZFJlZixcbiAgXHRtYXBOb2RlUmFuZ2U6IG1hcE5vZGVSYW5nZSxcbiAgXHRyZW1vdmVOb2RlUmFuZ2U6IHJlbW92ZU5vZGVSYW5nZSxcbiAgXHRpc0ZyYWdtZW50OiBpc0ZyYWdtZW50LFxuICBcdGdldE91dGVySFRNTDogZ2V0T3V0ZXJIVE1MLFxuICBcdG1lcmdlT3B0aW9uczogbWVyZ2VPcHRpb25zLFxuICBcdHJlc29sdmVBc3NldDogcmVzb2x2ZUFzc2V0LFxuICBcdGNoZWNrQ29tcG9uZW50QXR0cjogY2hlY2tDb21wb25lbnRBdHRyLFxuICBcdGNvbW1vblRhZ1JFOiBjb21tb25UYWdSRSxcbiAgXHRyZXNlcnZlZFRhZ1JFOiByZXNlcnZlZFRhZ1JFLFxuICBcdGdldCB3YXJuICgpIHsgcmV0dXJuIHdhcm47IH1cbiAgfSk7XG5cbiAgdmFyIHVpZCA9IDA7XG5cbiAgZnVuY3Rpb24gaW5pdE1peGluIChWdWUpIHtcbiAgICAvKipcbiAgICAgKiBUaGUgbWFpbiBpbml0IHNlcXVlbmNlLiBUaGlzIGlzIGNhbGxlZCBmb3IgZXZlcnlcbiAgICAgKiBpbnN0YW5jZSwgaW5jbHVkaW5nIG9uZXMgdGhhdCBhcmUgY3JlYXRlZCBmcm9tIGV4dGVuZGVkXG4gICAgICogY29uc3RydWN0b3JzLlxuICAgICAqXG4gICAgICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnMgLSB0aGlzIG9wdGlvbnMgb2JqZWN0IHNob3VsZCBiZVxuICAgICAqICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhlIHJlc3VsdCBvZiBtZXJnaW5nIGNsYXNzXG4gICAgICogICAgICAgICAgICAgICAgICAgICAgICAgICBvcHRpb25zIGFuZCB0aGUgb3B0aW9ucyBwYXNzZWRcbiAgICAgKiAgICAgICAgICAgICAgICAgICAgICAgICAgIGluIHRvIHRoZSBjb25zdHJ1Y3Rvci5cbiAgICAgKi9cblxuICAgIFZ1ZS5wcm90b3R5cGUuX2luaXQgPSBmdW5jdGlvbiAob3B0aW9ucykge1xuICAgICAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG5cbiAgICAgIHRoaXMuJGVsID0gbnVsbDtcbiAgICAgIHRoaXMuJHBhcmVudCA9IG9wdGlvbnMucGFyZW50O1xuICAgICAgdGhpcy4kcm9vdCA9IHRoaXMuJHBhcmVudCA/IHRoaXMuJHBhcmVudC4kcm9vdCA6IHRoaXM7XG4gICAgICB0aGlzLiRjaGlsZHJlbiA9IFtdO1xuICAgICAgdGhpcy4kcmVmcyA9IHt9OyAvLyBjaGlsZCB2bSByZWZlcmVuY2VzXG4gICAgICB0aGlzLiRlbHMgPSB7fTsgLy8gZWxlbWVudCByZWZlcmVuY2VzXG4gICAgICB0aGlzLl93YXRjaGVycyA9IFtdOyAvLyBhbGwgd2F0Y2hlcnMgYXMgYW4gYXJyYXlcbiAgICAgIHRoaXMuX2RpcmVjdGl2ZXMgPSBbXTsgLy8gYWxsIGRpcmVjdGl2ZXNcblxuICAgICAgLy8gYSB1aWRcbiAgICAgIHRoaXMuX3VpZCA9IHVpZCsrO1xuXG4gICAgICAvLyBhIGZsYWcgdG8gYXZvaWQgdGhpcyBiZWluZyBvYnNlcnZlZFxuICAgICAgdGhpcy5faXNWdWUgPSB0cnVlO1xuXG4gICAgICAvLyBldmVudHMgYm9va2tlZXBpbmdcbiAgICAgIHRoaXMuX2V2ZW50cyA9IHt9OyAvLyByZWdpc3RlcmVkIGNhbGxiYWNrc1xuICAgICAgdGhpcy5fZXZlbnRzQ291bnQgPSB7fTsgLy8gZm9yICRicm9hZGNhc3Qgb3B0aW1pemF0aW9uXG5cbiAgICAgIC8vIGZyYWdtZW50IGluc3RhbmNlIHByb3BlcnRpZXNcbiAgICAgIHRoaXMuX2lzRnJhZ21lbnQgPSBmYWxzZTtcbiAgICAgIHRoaXMuX2ZyYWdtZW50ID0gLy8gQHR5cGUge0RvY3VtZW50RnJhZ21lbnR9XG4gICAgICB0aGlzLl9mcmFnbWVudFN0YXJ0ID0gLy8gQHR5cGUge1RleHR8Q29tbWVudH1cbiAgICAgIHRoaXMuX2ZyYWdtZW50RW5kID0gbnVsbDsgLy8gQHR5cGUge1RleHR8Q29tbWVudH1cblxuICAgICAgLy8gbGlmZWN5Y2xlIHN0YXRlXG4gICAgICB0aGlzLl9pc0NvbXBpbGVkID0gdGhpcy5faXNEZXN0cm95ZWQgPSB0aGlzLl9pc1JlYWR5ID0gdGhpcy5faXNBdHRhY2hlZCA9IHRoaXMuX2lzQmVpbmdEZXN0cm95ZWQgPSB0aGlzLl92Rm9yUmVtb3ZpbmcgPSBmYWxzZTtcbiAgICAgIHRoaXMuX3VubGlua0ZuID0gbnVsbDtcblxuICAgICAgLy8gY29udGV4dDpcbiAgICAgIC8vIGlmIHRoaXMgaXMgYSB0cmFuc2NsdWRlZCBjb21wb25lbnQsIGNvbnRleHRcbiAgICAgIC8vIHdpbGwgYmUgdGhlIGNvbW1vbiBwYXJlbnQgdm0gb2YgdGhpcyBpbnN0YW5jZVxuICAgICAgLy8gYW5kIGl0cyBob3N0LlxuICAgICAgdGhpcy5fY29udGV4dCA9IG9wdGlvbnMuX2NvbnRleHQgfHwgdGhpcy4kcGFyZW50O1xuXG4gICAgICAvLyBzY29wZTpcbiAgICAgIC8vIGlmIHRoaXMgaXMgaW5zaWRlIGFuIGlubGluZSB2LWZvciwgdGhlIHNjb3BlXG4gICAgICAvLyB3aWxsIGJlIHRoZSBpbnRlcm1lZGlhdGUgc2NvcGUgY3JlYXRlZCBmb3IgdGhpc1xuICAgICAgLy8gcmVwZWF0IGZyYWdtZW50LiB0aGlzIGlzIHVzZWQgZm9yIGxpbmtpbmcgcHJvcHNcbiAgICAgIC8vIGFuZCBjb250YWluZXIgZGlyZWN0aXZlcy5cbiAgICAgIHRoaXMuX3Njb3BlID0gb3B0aW9ucy5fc2NvcGU7XG5cbiAgICAgIC8vIGZyYWdtZW50OlxuICAgICAgLy8gaWYgdGhpcyBpbnN0YW5jZSBpcyBjb21waWxlZCBpbnNpZGUgYSBGcmFnbWVudCwgaXRcbiAgICAgIC8vIG5lZWRzIHRvIHJlaWdzdGVyIGl0c2VsZiBhcyBhIGNoaWxkIG9mIHRoYXQgZnJhZ21lbnRcbiAgICAgIC8vIGZvciBhdHRhY2gvZGV0YWNoIHRvIHdvcmsgcHJvcGVybHkuXG4gICAgICB0aGlzLl9mcmFnID0gb3B0aW9ucy5fZnJhZztcbiAgICAgIGlmICh0aGlzLl9mcmFnKSB7XG4gICAgICAgIHRoaXMuX2ZyYWcuY2hpbGRyZW4ucHVzaCh0aGlzKTtcbiAgICAgIH1cblxuICAgICAgLy8gcHVzaCBzZWxmIGludG8gcGFyZW50IC8gdHJhbnNjbHVzaW9uIGhvc3RcbiAgICAgIGlmICh0aGlzLiRwYXJlbnQpIHtcbiAgICAgICAgdGhpcy4kcGFyZW50LiRjaGlsZHJlbi5wdXNoKHRoaXMpO1xuICAgICAgfVxuXG4gICAgICAvLyBtZXJnZSBvcHRpb25zLlxuICAgICAgb3B0aW9ucyA9IHRoaXMuJG9wdGlvbnMgPSBtZXJnZU9wdGlvbnModGhpcy5jb25zdHJ1Y3Rvci5vcHRpb25zLCBvcHRpb25zLCB0aGlzKTtcblxuICAgICAgLy8gc2V0IHJlZlxuICAgICAgdGhpcy5fdXBkYXRlUmVmKCk7XG5cbiAgICAgIC8vIGluaXRpYWxpemUgZGF0YSBhcyBlbXB0eSBvYmplY3QuXG4gICAgICAvLyBpdCB3aWxsIGJlIGZpbGxlZCB1cCBpbiBfaW5pdERhdGEoKS5cbiAgICAgIHRoaXMuX2RhdGEgPSB7fTtcblxuICAgICAgLy8gY2FsbCBpbml0IGhvb2tcbiAgICAgIHRoaXMuX2NhbGxIb29rKCdpbml0Jyk7XG5cbiAgICAgIC8vIGluaXRpYWxpemUgZGF0YSBvYnNlcnZhdGlvbiBhbmQgc2NvcGUgaW5oZXJpdGFuY2UuXG4gICAgICB0aGlzLl9pbml0U3RhdGUoKTtcblxuICAgICAgLy8gc2V0dXAgZXZlbnQgc3lzdGVtIGFuZCBvcHRpb24gZXZlbnRzLlxuICAgICAgdGhpcy5faW5pdEV2ZW50cygpO1xuXG4gICAgICAvLyBjYWxsIGNyZWF0ZWQgaG9va1xuICAgICAgdGhpcy5fY2FsbEhvb2soJ2NyZWF0ZWQnKTtcblxuICAgICAgLy8gaWYgYGVsYCBvcHRpb24gaXMgcGFzc2VkLCBzdGFydCBjb21waWxhdGlvbi5cbiAgICAgIGlmIChvcHRpb25zLmVsKSB7XG4gICAgICAgIHRoaXMuJG1vdW50KG9wdGlvbnMuZWwpO1xuICAgICAgfVxuICAgIH07XG4gIH1cblxuICB2YXIgcGF0aENhY2hlID0gbmV3IENhY2hlKDEwMDApO1xuXG4gIC8vIGFjdGlvbnNcbiAgdmFyIEFQUEVORCA9IDA7XG4gIHZhciBQVVNIID0gMTtcbiAgdmFyIElOQ19TVUJfUEFUSF9ERVBUSCA9IDI7XG4gIHZhciBQVVNIX1NVQl9QQVRIID0gMztcblxuICAvLyBzdGF0ZXNcbiAgdmFyIEJFRk9SRV9QQVRIID0gMDtcbiAgdmFyIElOX1BBVEggPSAxO1xuICB2YXIgQkVGT1JFX0lERU5UID0gMjtcbiAgdmFyIElOX0lERU5UID0gMztcbiAgdmFyIElOX1NVQl9QQVRIID0gNDtcbiAgdmFyIElOX1NJTkdMRV9RVU9URSA9IDU7XG4gIHZhciBJTl9ET1VCTEVfUVVPVEUgPSA2O1xuICB2YXIgQUZURVJfUEFUSCA9IDc7XG4gIHZhciBFUlJPUiA9IDg7XG5cbiAgdmFyIHBhdGhTdGF0ZU1hY2hpbmUgPSBbXTtcblxuICBwYXRoU3RhdGVNYWNoaW5lW0JFRk9SRV9QQVRIXSA9IHtcbiAgICAnd3MnOiBbQkVGT1JFX1BBVEhdLFxuICAgICdpZGVudCc6IFtJTl9JREVOVCwgQVBQRU5EXSxcbiAgICAnWyc6IFtJTl9TVUJfUEFUSF0sXG4gICAgJ2VvZic6IFtBRlRFUl9QQVRIXVxuICB9O1xuXG4gIHBhdGhTdGF0ZU1hY2hpbmVbSU5fUEFUSF0gPSB7XG4gICAgJ3dzJzogW0lOX1BBVEhdLFxuICAgICcuJzogW0JFRk9SRV9JREVOVF0sXG4gICAgJ1snOiBbSU5fU1VCX1BBVEhdLFxuICAgICdlb2YnOiBbQUZURVJfUEFUSF1cbiAgfTtcblxuICBwYXRoU3RhdGVNYWNoaW5lW0JFRk9SRV9JREVOVF0gPSB7XG4gICAgJ3dzJzogW0JFRk9SRV9JREVOVF0sXG4gICAgJ2lkZW50JzogW0lOX0lERU5ULCBBUFBFTkRdXG4gIH07XG5cbiAgcGF0aFN0YXRlTWFjaGluZVtJTl9JREVOVF0gPSB7XG4gICAgJ2lkZW50JzogW0lOX0lERU5ULCBBUFBFTkRdLFxuICAgICcwJzogW0lOX0lERU5ULCBBUFBFTkRdLFxuICAgICdudW1iZXInOiBbSU5fSURFTlQsIEFQUEVORF0sXG4gICAgJ3dzJzogW0lOX1BBVEgsIFBVU0hdLFxuICAgICcuJzogW0JFRk9SRV9JREVOVCwgUFVTSF0sXG4gICAgJ1snOiBbSU5fU1VCX1BBVEgsIFBVU0hdLFxuICAgICdlb2YnOiBbQUZURVJfUEFUSCwgUFVTSF1cbiAgfTtcblxuICBwYXRoU3RhdGVNYWNoaW5lW0lOX1NVQl9QQVRIXSA9IHtcbiAgICBcIidcIjogW0lOX1NJTkdMRV9RVU9URSwgQVBQRU5EXSxcbiAgICAnXCInOiBbSU5fRE9VQkxFX1FVT1RFLCBBUFBFTkRdLFxuICAgICdbJzogW0lOX1NVQl9QQVRILCBJTkNfU1VCX1BBVEhfREVQVEhdLFxuICAgICddJzogW0lOX1BBVEgsIFBVU0hfU1VCX1BBVEhdLFxuICAgICdlb2YnOiBFUlJPUixcbiAgICAnZWxzZSc6IFtJTl9TVUJfUEFUSCwgQVBQRU5EXVxuICB9O1xuXG4gIHBhdGhTdGF0ZU1hY2hpbmVbSU5fU0lOR0xFX1FVT1RFXSA9IHtcbiAgICBcIidcIjogW0lOX1NVQl9QQVRILCBBUFBFTkRdLFxuICAgICdlb2YnOiBFUlJPUixcbiAgICAnZWxzZSc6IFtJTl9TSU5HTEVfUVVPVEUsIEFQUEVORF1cbiAgfTtcblxuICBwYXRoU3RhdGVNYWNoaW5lW0lOX0RPVUJMRV9RVU9URV0gPSB7XG4gICAgJ1wiJzogW0lOX1NVQl9QQVRILCBBUFBFTkRdLFxuICAgICdlb2YnOiBFUlJPUixcbiAgICAnZWxzZSc6IFtJTl9ET1VCTEVfUVVPVEUsIEFQUEVORF1cbiAgfTtcblxuICAvKipcbiAgICogRGV0ZXJtaW5lIHRoZSB0eXBlIG9mIGEgY2hhcmFjdGVyIGluIGEga2V5cGF0aC5cbiAgICpcbiAgICogQHBhcmFtIHtDaGFyfSBjaFxuICAgKiBAcmV0dXJuIHtTdHJpbmd9IHR5cGVcbiAgICovXG5cbiAgZnVuY3Rpb24gZ2V0UGF0aENoYXJUeXBlKGNoKSB7XG4gICAgaWYgKGNoID09PSB1bmRlZmluZWQpIHtcbiAgICAgIHJldHVybiAnZW9mJztcbiAgICB9XG5cbiAgICB2YXIgY29kZSA9IGNoLmNoYXJDb2RlQXQoMCk7XG5cbiAgICBzd2l0Y2ggKGNvZGUpIHtcbiAgICAgIGNhc2UgMHg1QjogLy8gW1xuICAgICAgY2FzZSAweDVEOiAvLyBdXG4gICAgICBjYXNlIDB4MkU6IC8vIC5cbiAgICAgIGNhc2UgMHgyMjogLy8gXCJcbiAgICAgIGNhc2UgMHgyNzogLy8gJ1xuICAgICAgY2FzZSAweDMwOlxuICAgICAgICAvLyAwXG4gICAgICAgIHJldHVybiBjaDtcblxuICAgICAgY2FzZSAweDVGOiAvLyBfXG4gICAgICBjYXNlIDB4MjQ6XG4gICAgICAgIC8vICRcbiAgICAgICAgcmV0dXJuICdpZGVudCc7XG5cbiAgICAgIGNhc2UgMHgyMDogLy8gU3BhY2VcbiAgICAgIGNhc2UgMHgwOTogLy8gVGFiXG4gICAgICBjYXNlIDB4MEE6IC8vIE5ld2xpbmVcbiAgICAgIGNhc2UgMHgwRDogLy8gUmV0dXJuXG4gICAgICBjYXNlIDB4QTA6IC8vIE5vLWJyZWFrIHNwYWNlXG4gICAgICBjYXNlIDB4RkVGRjogLy8gQnl0ZSBPcmRlciBNYXJrXG4gICAgICBjYXNlIDB4MjAyODogLy8gTGluZSBTZXBhcmF0b3JcbiAgICAgIGNhc2UgMHgyMDI5OlxuICAgICAgICAvLyBQYXJhZ3JhcGggU2VwYXJhdG9yXG4gICAgICAgIHJldHVybiAnd3MnO1xuICAgIH1cblxuICAgIC8vIGEteiwgQS1aXG4gICAgaWYgKGNvZGUgPj0gMHg2MSAmJiBjb2RlIDw9IDB4N0EgfHwgY29kZSA+PSAweDQxICYmIGNvZGUgPD0gMHg1QSkge1xuICAgICAgcmV0dXJuICdpZGVudCc7XG4gICAgfVxuXG4gICAgLy8gMS05XG4gICAgaWYgKGNvZGUgPj0gMHgzMSAmJiBjb2RlIDw9IDB4MzkpIHtcbiAgICAgIHJldHVybiAnbnVtYmVyJztcbiAgICB9XG5cbiAgICByZXR1cm4gJ2Vsc2UnO1xuICB9XG5cbiAgLyoqXG4gICAqIEZvcm1hdCBhIHN1YlBhdGgsIHJldHVybiBpdHMgcGxhaW4gZm9ybSBpZiBpdCBpc1xuICAgKiBhIGxpdGVyYWwgc3RyaW5nIG9yIG51bWJlci4gT3RoZXJ3aXNlIHByZXBlbmQgdGhlXG4gICAqIGR5bmFtaWMgaW5kaWNhdG9yICgqKS5cbiAgICpcbiAgICogQHBhcmFtIHtTdHJpbmd9IHBhdGhcbiAgICogQHJldHVybiB7U3RyaW5nfVxuICAgKi9cblxuICBmdW5jdGlvbiBmb3JtYXRTdWJQYXRoKHBhdGgpIHtcbiAgICB2YXIgdHJpbW1lZCA9IHBhdGgudHJpbSgpO1xuICAgIC8vIGludmFsaWQgbGVhZGluZyAwXG4gICAgaWYgKHBhdGguY2hhckF0KDApID09PSAnMCcgJiYgaXNOYU4ocGF0aCkpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgcmV0dXJuIGlzTGl0ZXJhbCh0cmltbWVkKSA/IHN0cmlwUXVvdGVzKHRyaW1tZWQpIDogJyonICsgdHJpbW1lZDtcbiAgfVxuXG4gIC8qKlxuICAgKiBQYXJzZSBhIHN0cmluZyBwYXRoIGludG8gYW4gYXJyYXkgb2Ygc2VnbWVudHNcbiAgICpcbiAgICogQHBhcmFtIHtTdHJpbmd9IHBhdGhcbiAgICogQHJldHVybiB7QXJyYXl8dW5kZWZpbmVkfVxuICAgKi9cblxuICBmdW5jdGlvbiBwYXJzZShwYXRoKSB7XG4gICAgdmFyIGtleXMgPSBbXTtcbiAgICB2YXIgaW5kZXggPSAtMTtcbiAgICB2YXIgbW9kZSA9IEJFRk9SRV9QQVRIO1xuICAgIHZhciBzdWJQYXRoRGVwdGggPSAwO1xuICAgIHZhciBjLCBuZXdDaGFyLCBrZXksIHR5cGUsIHRyYW5zaXRpb24sIGFjdGlvbiwgdHlwZU1hcDtcblxuICAgIHZhciBhY3Rpb25zID0gW107XG5cbiAgICBhY3Rpb25zW1BVU0hdID0gZnVuY3Rpb24gKCkge1xuICAgICAgaWYgKGtleSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIGtleXMucHVzaChrZXkpO1xuICAgICAgICBrZXkgPSB1bmRlZmluZWQ7XG4gICAgICB9XG4gICAgfTtcblxuICAgIGFjdGlvbnNbQVBQRU5EXSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIGlmIChrZXkgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICBrZXkgPSBuZXdDaGFyO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAga2V5ICs9IG5ld0NoYXI7XG4gICAgICB9XG4gICAgfTtcblxuICAgIGFjdGlvbnNbSU5DX1NVQl9QQVRIX0RFUFRIXSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIGFjdGlvbnNbQVBQRU5EXSgpO1xuICAgICAgc3ViUGF0aERlcHRoKys7XG4gICAgfTtcblxuICAgIGFjdGlvbnNbUFVTSF9TVUJfUEFUSF0gPSBmdW5jdGlvbiAoKSB7XG4gICAgICBpZiAoc3ViUGF0aERlcHRoID4gMCkge1xuICAgICAgICBzdWJQYXRoRGVwdGgtLTtcbiAgICAgICAgbW9kZSA9IElOX1NVQl9QQVRIO1xuICAgICAgICBhY3Rpb25zW0FQUEVORF0oKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHN1YlBhdGhEZXB0aCA9IDA7XG4gICAgICAgIGtleSA9IGZvcm1hdFN1YlBhdGgoa2V5KTtcbiAgICAgICAgaWYgKGtleSA9PT0gZmFsc2UpIHtcbiAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgYWN0aW9uc1tQVVNIXSgpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfTtcblxuICAgIGZ1bmN0aW9uIG1heWJlVW5lc2NhcGVRdW90ZSgpIHtcbiAgICAgIHZhciBuZXh0Q2hhciA9IHBhdGhbaW5kZXggKyAxXTtcbiAgICAgIGlmIChtb2RlID09PSBJTl9TSU5HTEVfUVVPVEUgJiYgbmV4dENoYXIgPT09IFwiJ1wiIHx8IG1vZGUgPT09IElOX0RPVUJMRV9RVU9URSAmJiBuZXh0Q2hhciA9PT0gJ1wiJykge1xuICAgICAgICBpbmRleCsrO1xuICAgICAgICBuZXdDaGFyID0gJ1xcXFwnICsgbmV4dENoYXI7XG4gICAgICAgIGFjdGlvbnNbQVBQRU5EXSgpO1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICB3aGlsZSAobW9kZSAhPSBudWxsKSB7XG4gICAgICBpbmRleCsrO1xuICAgICAgYyA9IHBhdGhbaW5kZXhdO1xuXG4gICAgICBpZiAoYyA9PT0gJ1xcXFwnICYmIG1heWJlVW5lc2NhcGVRdW90ZSgpKSB7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuXG4gICAgICB0eXBlID0gZ2V0UGF0aENoYXJUeXBlKGMpO1xuICAgICAgdHlwZU1hcCA9IHBhdGhTdGF0ZU1hY2hpbmVbbW9kZV07XG4gICAgICB0cmFuc2l0aW9uID0gdHlwZU1hcFt0eXBlXSB8fCB0eXBlTWFwWydlbHNlJ10gfHwgRVJST1I7XG5cbiAgICAgIGlmICh0cmFuc2l0aW9uID09PSBFUlJPUikge1xuICAgICAgICByZXR1cm47IC8vIHBhcnNlIGVycm9yXG4gICAgICB9XG5cbiAgICAgIG1vZGUgPSB0cmFuc2l0aW9uWzBdO1xuICAgICAgYWN0aW9uID0gYWN0aW9uc1t0cmFuc2l0aW9uWzFdXTtcbiAgICAgIGlmIChhY3Rpb24pIHtcbiAgICAgICAgbmV3Q2hhciA9IHRyYW5zaXRpb25bMl07XG4gICAgICAgIG5ld0NoYXIgPSBuZXdDaGFyID09PSB1bmRlZmluZWQgPyBjIDogbmV3Q2hhcjtcbiAgICAgICAgaWYgKGFjdGlvbigpID09PSBmYWxzZSkge1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiAobW9kZSA9PT0gQUZURVJfUEFUSCkge1xuICAgICAgICBrZXlzLnJhdyA9IHBhdGg7XG4gICAgICAgIHJldHVybiBrZXlzO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBFeHRlcm5hbCBwYXJzZSB0aGF0IGNoZWNrIGZvciBhIGNhY2hlIGhpdCBmaXJzdFxuICAgKlxuICAgKiBAcGFyYW0ge1N0cmluZ30gcGF0aFxuICAgKiBAcmV0dXJuIHtBcnJheXx1bmRlZmluZWR9XG4gICAqL1xuXG4gIGZ1bmN0aW9uIHBhcnNlUGF0aChwYXRoKSB7XG4gICAgdmFyIGhpdCA9IHBhdGhDYWNoZS5nZXQocGF0aCk7XG4gICAgaWYgKCFoaXQpIHtcbiAgICAgIGhpdCA9IHBhcnNlKHBhdGgpO1xuICAgICAgaWYgKGhpdCkge1xuICAgICAgICBwYXRoQ2FjaGUucHV0KHBhdGgsIGhpdCk7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBoaXQ7XG4gIH1cblxuICAvKipcbiAgICogR2V0IGZyb20gYW4gb2JqZWN0IGZyb20gYSBwYXRoIHN0cmluZ1xuICAgKlxuICAgKiBAcGFyYW0ge09iamVjdH0gb2JqXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBwYXRoXG4gICAqL1xuXG4gIGZ1bmN0aW9uIGdldFBhdGgob2JqLCBwYXRoKSB7XG4gICAgcmV0dXJuIHBhcnNlRXhwcmVzc2lvbihwYXRoKS5nZXQob2JqKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBXYXJuIGFnYWluc3Qgc2V0dGluZyBub24tZXhpc3RlbnQgcm9vdCBwYXRoIG9uIGEgdm0uXG4gICAqL1xuXG4gIHZhciB3YXJuTm9uRXhpc3RlbnQ7XG4gIGlmICgnZGV2ZWxvcG1lbnQnICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICB3YXJuTm9uRXhpc3RlbnQgPSBmdW5jdGlvbiAocGF0aCwgdm0pIHtcbiAgICAgIHdhcm4oJ1lvdSBhcmUgc2V0dGluZyBhIG5vbi1leGlzdGVudCBwYXRoIFwiJyArIHBhdGgucmF3ICsgJ1wiICcgKyAnb24gYSB2bSBpbnN0YW5jZS4gQ29uc2lkZXIgcHJlLWluaXRpYWxpemluZyB0aGUgcHJvcGVydHkgJyArICd3aXRoIHRoZSBcImRhdGFcIiBvcHRpb24gZm9yIG1vcmUgcmVsaWFibGUgcmVhY3Rpdml0eSAnICsgJ2FuZCBiZXR0ZXIgcGVyZm9ybWFuY2UuJywgdm0pO1xuICAgIH07XG4gIH1cblxuICAvKipcbiAgICogU2V0IG9uIGFuIG9iamVjdCBmcm9tIGEgcGF0aFxuICAgKlxuICAgKiBAcGFyYW0ge09iamVjdH0gb2JqXG4gICAqIEBwYXJhbSB7U3RyaW5nIHwgQXJyYXl9IHBhdGhcbiAgICogQHBhcmFtIHsqfSB2YWxcbiAgICovXG5cbiAgZnVuY3Rpb24gc2V0UGF0aChvYmosIHBhdGgsIHZhbCkge1xuICAgIHZhciBvcmlnaW5hbCA9IG9iajtcbiAgICBpZiAodHlwZW9mIHBhdGggPT09ICdzdHJpbmcnKSB7XG4gICAgICBwYXRoID0gcGFyc2UocGF0aCk7XG4gICAgfVxuICAgIGlmICghcGF0aCB8fCAhaXNPYmplY3Qob2JqKSkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICB2YXIgbGFzdCwga2V5O1xuICAgIGZvciAodmFyIGkgPSAwLCBsID0gcGF0aC5sZW5ndGg7IGkgPCBsOyBpKyspIHtcbiAgICAgIGxhc3QgPSBvYmo7XG4gICAgICBrZXkgPSBwYXRoW2ldO1xuICAgICAgaWYgKGtleS5jaGFyQXQoMCkgPT09ICcqJykge1xuICAgICAgICBrZXkgPSBwYXJzZUV4cHJlc3Npb24oa2V5LnNsaWNlKDEpKS5nZXQuY2FsbChvcmlnaW5hbCwgb3JpZ2luYWwpO1xuICAgICAgfVxuICAgICAgaWYgKGkgPCBsIC0gMSkge1xuICAgICAgICBvYmogPSBvYmpba2V5XTtcbiAgICAgICAgaWYgKCFpc09iamVjdChvYmopKSB7XG4gICAgICAgICAgb2JqID0ge307XG4gICAgICAgICAgaWYgKCdkZXZlbG9wbWVudCcgIT09ICdwcm9kdWN0aW9uJyAmJiBsYXN0Ll9pc1Z1ZSkge1xuICAgICAgICAgICAgd2Fybk5vbkV4aXN0ZW50KHBhdGgsIGxhc3QpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBzZXQobGFzdCwga2V5LCBvYmopO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpZiAoaXNBcnJheShvYmopKSB7XG4gICAgICAgICAgb2JqLiRzZXQoa2V5LCB2YWwpO1xuICAgICAgICB9IGVsc2UgaWYgKGtleSBpbiBvYmopIHtcbiAgICAgICAgICBvYmpba2V5XSA9IHZhbDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpZiAoJ2RldmVsb3BtZW50JyAhPT0gJ3Byb2R1Y3Rpb24nICYmIG9iai5faXNWdWUpIHtcbiAgICAgICAgICAgIHdhcm5Ob25FeGlzdGVudChwYXRoLCBvYmopO1xuICAgICAgICAgIH1cbiAgICAgICAgICBzZXQob2JqLCBrZXksIHZhbCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxudmFyIHBhdGggPSBPYmplY3QuZnJlZXplKHtcbiAgICBwYXJzZVBhdGg6IHBhcnNlUGF0aCxcbiAgICBnZXRQYXRoOiBnZXRQYXRoLFxuICAgIHNldFBhdGg6IHNldFBhdGhcbiAgfSk7XG5cbiAgdmFyIGV4cHJlc3Npb25DYWNoZSA9IG5ldyBDYWNoZSgxMDAwKTtcblxuICB2YXIgYWxsb3dlZEtleXdvcmRzID0gJ01hdGgsRGF0ZSx0aGlzLHRydWUsZmFsc2UsbnVsbCx1bmRlZmluZWQsSW5maW5pdHksTmFOLCcgKyAnaXNOYU4saXNGaW5pdGUsZGVjb2RlVVJJLGRlY29kZVVSSUNvbXBvbmVudCxlbmNvZGVVUkksJyArICdlbmNvZGVVUklDb21wb25lbnQscGFyc2VJbnQscGFyc2VGbG9hdCc7XG4gIHZhciBhbGxvd2VkS2V5d29yZHNSRSA9IG5ldyBSZWdFeHAoJ14oJyArIGFsbG93ZWRLZXl3b3Jkcy5yZXBsYWNlKC8sL2csICdcXFxcYnwnKSArICdcXFxcYiknKTtcblxuICAvLyBrZXl3b3JkcyB0aGF0IGRvbid0IG1ha2Ugc2Vuc2UgaW5zaWRlIGV4cHJlc3Npb25zXG4gIHZhciBpbXByb3BlcktleXdvcmRzID0gJ2JyZWFrLGNhc2UsY2xhc3MsY2F0Y2gsY29uc3QsY29udGludWUsZGVidWdnZXIsZGVmYXVsdCwnICsgJ2RlbGV0ZSxkbyxlbHNlLGV4cG9ydCxleHRlbmRzLGZpbmFsbHksZm9yLGZ1bmN0aW9uLGlmLCcgKyAnaW1wb3J0LGluLGluc3RhbmNlb2YsbGV0LHJldHVybixzdXBlcixzd2l0Y2gsdGhyb3csdHJ5LCcgKyAndmFyLHdoaWxlLHdpdGgseWllbGQsZW51bSxhd2FpdCxpbXBsZW1lbnRzLHBhY2thZ2UsJyArICdwcm90ZWN0ZWQsc3RhdGljLGludGVyZmFjZSxwcml2YXRlLHB1YmxpYyc7XG4gIHZhciBpbXByb3BlcktleXdvcmRzUkUgPSBuZXcgUmVnRXhwKCdeKCcgKyBpbXByb3BlcktleXdvcmRzLnJlcGxhY2UoLywvZywgJ1xcXFxifCcpICsgJ1xcXFxiKScpO1xuXG4gIHZhciB3c1JFID0gL1xccy9nO1xuICB2YXIgbmV3bGluZVJFID0gL1xcbi9nO1xuICB2YXIgc2F2ZVJFID0gL1tcXHssXVxccypbXFx3XFwkX10rXFxzKjp8KCcoPzpbXidcXFxcXXxcXFxcLikqJ3xcIig/OlteXCJcXFxcXXxcXFxcLikqXCJ8YCg/OlteYFxcXFxdfFxcXFwuKSpcXCRcXHt8XFx9KD86W15gXFxcXF18XFxcXC4pKmB8YCg/OlteYFxcXFxdfFxcXFwuKSpgKXxuZXcgfHR5cGVvZiB8dm9pZCAvZztcbiAgdmFyIHJlc3RvcmVSRSA9IC9cIihcXGQrKVwiL2c7XG4gIHZhciBwYXRoVGVzdFJFID0gL15bQS1aYS16XyRdW1xcdyRdKig/OlxcLltBLVphLXpfJF1bXFx3JF0qfFxcWycuKj8nXFxdfFxcW1wiLio/XCJcXF18XFxbXFxkK1xcXXxcXFtbQS1aYS16XyRdW1xcdyRdKlxcXSkqJC87XG4gIHZhciBpZGVudFJFID0gL1teXFx3JFxcLl0oPzpbQS1aYS16XyRdW1xcdyRdKikvZztcbiAgdmFyIGJvb2xlYW5MaXRlcmFsUkUgPSAvXig/OnRydWV8ZmFsc2UpJC87XG5cbiAgLyoqXG4gICAqIFNhdmUgLyBSZXdyaXRlIC8gUmVzdG9yZVxuICAgKlxuICAgKiBXaGVuIHJld3JpdGluZyBwYXRocyBmb3VuZCBpbiBhbiBleHByZXNzaW9uLCBpdCBpc1xuICAgKiBwb3NzaWJsZSBmb3IgdGhlIHNhbWUgbGV0dGVyIHNlcXVlbmNlcyB0byBiZSBmb3VuZCBpblxuICAgKiBzdHJpbmdzIGFuZCBPYmplY3QgbGl0ZXJhbCBwcm9wZXJ0eSBrZXlzLiBUaGVyZWZvcmUgd2VcbiAgICogcmVtb3ZlIGFuZCBzdG9yZSB0aGVzZSBwYXJ0cyBpbiBhIHRlbXBvcmFyeSBhcnJheSwgYW5kXG4gICAqIHJlc3RvcmUgdGhlbSBhZnRlciB0aGUgcGF0aCByZXdyaXRlLlxuICAgKi9cblxuICB2YXIgc2F2ZWQgPSBbXTtcblxuICAvKipcbiAgICogU2F2ZSByZXBsYWNlclxuICAgKlxuICAgKiBUaGUgc2F2ZSByZWdleCBjYW4gbWF0Y2ggdHdvIHBvc3NpYmxlIGNhc2VzOlxuICAgKiAxLiBBbiBvcGVuaW5nIG9iamVjdCBsaXRlcmFsXG4gICAqIDIuIEEgc3RyaW5nXG4gICAqIElmIG1hdGNoZWQgYXMgYSBwbGFpbiBzdHJpbmcsIHdlIG5lZWQgdG8gZXNjYXBlIGl0c1xuICAgKiBuZXdsaW5lcywgc2luY2UgdGhlIHN0cmluZyBuZWVkcyB0byBiZSBwcmVzZXJ2ZWQgd2hlblxuICAgKiBnZW5lcmF0aW5nIHRoZSBmdW5jdGlvbiBib2R5LlxuICAgKlxuICAgKiBAcGFyYW0ge1N0cmluZ30gc3RyXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBpc1N0cmluZyAtIHN0ciBpZiBtYXRjaGVkIGFzIGEgc3RyaW5nXG4gICAqIEByZXR1cm4ge1N0cmluZ30gLSBwbGFjZWhvbGRlciB3aXRoIGluZGV4XG4gICAqL1xuXG4gIGZ1bmN0aW9uIHNhdmUoc3RyLCBpc1N0cmluZykge1xuICAgIHZhciBpID0gc2F2ZWQubGVuZ3RoO1xuICAgIHNhdmVkW2ldID0gaXNTdHJpbmcgPyBzdHIucmVwbGFjZShuZXdsaW5lUkUsICdcXFxcbicpIDogc3RyO1xuICAgIHJldHVybiAnXCInICsgaSArICdcIic7XG4gIH1cblxuICAvKipcbiAgICogUGF0aCByZXdyaXRlIHJlcGxhY2VyXG4gICAqXG4gICAqIEBwYXJhbSB7U3RyaW5nfSByYXdcbiAgICogQHJldHVybiB7U3RyaW5nfVxuICAgKi9cblxuICBmdW5jdGlvbiByZXdyaXRlKHJhdykge1xuICAgIHZhciBjID0gcmF3LmNoYXJBdCgwKTtcbiAgICB2YXIgcGF0aCA9IHJhdy5zbGljZSgxKTtcbiAgICBpZiAoYWxsb3dlZEtleXdvcmRzUkUudGVzdChwYXRoKSkge1xuICAgICAgcmV0dXJuIHJhdztcbiAgICB9IGVsc2Uge1xuICAgICAgcGF0aCA9IHBhdGguaW5kZXhPZignXCInKSA+IC0xID8gcGF0aC5yZXBsYWNlKHJlc3RvcmVSRSwgcmVzdG9yZSkgOiBwYXRoO1xuICAgICAgcmV0dXJuIGMgKyAnc2NvcGUuJyArIHBhdGg7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFJlc3RvcmUgcmVwbGFjZXJcbiAgICpcbiAgICogQHBhcmFtIHtTdHJpbmd9IHN0clxuICAgKiBAcGFyYW0ge1N0cmluZ30gaSAtIG1hdGNoZWQgc2F2ZSBpbmRleFxuICAgKiBAcmV0dXJuIHtTdHJpbmd9XG4gICAqL1xuXG4gIGZ1bmN0aW9uIHJlc3RvcmUoc3RyLCBpKSB7XG4gICAgcmV0dXJuIHNhdmVkW2ldO1xuICB9XG5cbiAgLyoqXG4gICAqIFJld3JpdGUgYW4gZXhwcmVzc2lvbiwgcHJlZml4aW5nIGFsbCBwYXRoIGFjY2Vzc29ycyB3aXRoXG4gICAqIGBzY29wZS5gIGFuZCBnZW5lcmF0ZSBnZXR0ZXIvc2V0dGVyIGZ1bmN0aW9ucy5cbiAgICpcbiAgICogQHBhcmFtIHtTdHJpbmd9IGV4cFxuICAgKiBAcmV0dXJuIHtGdW5jdGlvbn1cbiAgICovXG5cbiAgZnVuY3Rpb24gY29tcGlsZUdldHRlcihleHApIHtcbiAgICBpZiAoaW1wcm9wZXJLZXl3b3Jkc1JFLnRlc3QoZXhwKSkge1xuICAgICAgJ2RldmVsb3BtZW50JyAhPT0gJ3Byb2R1Y3Rpb24nICYmIHdhcm4oJ0F2b2lkIHVzaW5nIHJlc2VydmVkIGtleXdvcmRzIGluIGV4cHJlc3Npb246ICcgKyBleHApO1xuICAgIH1cbiAgICAvLyByZXNldCBzdGF0ZVxuICAgIHNhdmVkLmxlbmd0aCA9IDA7XG4gICAgLy8gc2F2ZSBzdHJpbmdzIGFuZCBvYmplY3QgbGl0ZXJhbCBrZXlzXG4gICAgdmFyIGJvZHkgPSBleHAucmVwbGFjZShzYXZlUkUsIHNhdmUpLnJlcGxhY2Uod3NSRSwgJycpO1xuICAgIC8vIHJld3JpdGUgYWxsIHBhdGhzXG4gICAgLy8gcGFkIDEgc3BhY2UgaGVyZSBiZWNhdWUgdGhlIHJlZ2V4IG1hdGNoZXMgMSBleHRyYSBjaGFyXG4gICAgYm9keSA9ICgnICcgKyBib2R5KS5yZXBsYWNlKGlkZW50UkUsIHJld3JpdGUpLnJlcGxhY2UocmVzdG9yZVJFLCByZXN0b3JlKTtcbiAgICByZXR1cm4gbWFrZUdldHRlckZuKGJvZHkpO1xuICB9XG5cbiAgLyoqXG4gICAqIEJ1aWxkIGEgZ2V0dGVyIGZ1bmN0aW9uLiBSZXF1aXJlcyBldmFsLlxuICAgKlxuICAgKiBXZSBpc29sYXRlIHRoZSB0cnkvY2F0Y2ggc28gaXQgZG9lc24ndCBhZmZlY3QgdGhlXG4gICAqIG9wdGltaXphdGlvbiBvZiB0aGUgcGFyc2UgZnVuY3Rpb24gd2hlbiBpdCBpcyBub3QgY2FsbGVkLlxuICAgKlxuICAgKiBAcGFyYW0ge1N0cmluZ30gYm9keVxuICAgKiBAcmV0dXJuIHtGdW5jdGlvbnx1bmRlZmluZWR9XG4gICAqL1xuXG4gIGZ1bmN0aW9uIG1ha2VHZXR0ZXJGbihib2R5KSB7XG4gICAgdHJ5IHtcbiAgICAgIC8qIGVzbGludC1kaXNhYmxlIG5vLW5ldy1mdW5jICovXG4gICAgICByZXR1cm4gbmV3IEZ1bmN0aW9uKCdzY29wZScsICdyZXR1cm4gJyArIGJvZHkgKyAnOycpO1xuICAgICAgLyogZXNsaW50LWVuYWJsZSBuby1uZXctZnVuYyAqL1xuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICdkZXZlbG9wbWVudCcgIT09ICdwcm9kdWN0aW9uJyAmJiB3YXJuKCdJbnZhbGlkIGV4cHJlc3Npb24uICcgKyAnR2VuZXJhdGVkIGZ1bmN0aW9uIGJvZHk6ICcgKyBib2R5KTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQ29tcGlsZSBhIHNldHRlciBmdW5jdGlvbiBmb3IgdGhlIGV4cHJlc3Npb24uXG4gICAqXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBleHBcbiAgICogQHJldHVybiB7RnVuY3Rpb258dW5kZWZpbmVkfVxuICAgKi9cblxuICBmdW5jdGlvbiBjb21waWxlU2V0dGVyKGV4cCkge1xuICAgIHZhciBwYXRoID0gcGFyc2VQYXRoKGV4cCk7XG4gICAgaWYgKHBhdGgpIHtcbiAgICAgIHJldHVybiBmdW5jdGlvbiAoc2NvcGUsIHZhbCkge1xuICAgICAgICBzZXRQYXRoKHNjb3BlLCBwYXRoLCB2YWwpO1xuICAgICAgfTtcbiAgICB9IGVsc2Uge1xuICAgICAgJ2RldmVsb3BtZW50JyAhPT0gJ3Byb2R1Y3Rpb24nICYmIHdhcm4oJ0ludmFsaWQgc2V0dGVyIGV4cHJlc3Npb246ICcgKyBleHApO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBQYXJzZSBhbiBleHByZXNzaW9uIGludG8gcmUtd3JpdHRlbiBnZXR0ZXIvc2V0dGVycy5cbiAgICpcbiAgICogQHBhcmFtIHtTdHJpbmd9IGV4cFxuICAgKiBAcGFyYW0ge0Jvb2xlYW59IG5lZWRTZXRcbiAgICogQHJldHVybiB7RnVuY3Rpb259XG4gICAqL1xuXG4gIGZ1bmN0aW9uIHBhcnNlRXhwcmVzc2lvbihleHAsIG5lZWRTZXQpIHtcbiAgICBleHAgPSBleHAudHJpbSgpO1xuICAgIC8vIHRyeSBjYWNoZVxuICAgIHZhciBoaXQgPSBleHByZXNzaW9uQ2FjaGUuZ2V0KGV4cCk7XG4gICAgaWYgKGhpdCkge1xuICAgICAgaWYgKG5lZWRTZXQgJiYgIWhpdC5zZXQpIHtcbiAgICAgICAgaGl0LnNldCA9IGNvbXBpbGVTZXR0ZXIoaGl0LmV4cCk7XG4gICAgICB9XG4gICAgICByZXR1cm4gaGl0O1xuICAgIH1cbiAgICB2YXIgcmVzID0geyBleHA6IGV4cCB9O1xuICAgIHJlcy5nZXQgPSBpc1NpbXBsZVBhdGgoZXhwKSAmJiBleHAuaW5kZXhPZignWycpIDwgMFxuICAgIC8vIG9wdGltaXplZCBzdXBlciBzaW1wbGUgZ2V0dGVyXG4gICAgPyBtYWtlR2V0dGVyRm4oJ3Njb3BlLicgKyBleHApXG4gICAgLy8gZHluYW1pYyBnZXR0ZXJcbiAgICA6IGNvbXBpbGVHZXR0ZXIoZXhwKTtcbiAgICBpZiAobmVlZFNldCkge1xuICAgICAgcmVzLnNldCA9IGNvbXBpbGVTZXR0ZXIoZXhwKTtcbiAgICB9XG4gICAgZXhwcmVzc2lvbkNhY2hlLnB1dChleHAsIHJlcyk7XG4gICAgcmV0dXJuIHJlcztcbiAgfVxuXG4gIC8qKlxuICAgKiBDaGVjayBpZiBhbiBleHByZXNzaW9uIGlzIGEgc2ltcGxlIHBhdGguXG4gICAqXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBleHBcbiAgICogQHJldHVybiB7Qm9vbGVhbn1cbiAgICovXG5cbiAgZnVuY3Rpb24gaXNTaW1wbGVQYXRoKGV4cCkge1xuICAgIHJldHVybiBwYXRoVGVzdFJFLnRlc3QoZXhwKSAmJlxuICAgIC8vIGRvbid0IHRyZWF0IHRydWUvZmFsc2UgYXMgcGF0aHNcbiAgICAhYm9vbGVhbkxpdGVyYWxSRS50ZXN0KGV4cCkgJiZcbiAgICAvLyBNYXRoIGNvbnN0YW50cyBlLmcuIE1hdGguUEksIE1hdGguRSBldGMuXG4gICAgZXhwLnNsaWNlKDAsIDUpICE9PSAnTWF0aC4nO1xuICB9XG5cbnZhciBleHByZXNzaW9uID0gT2JqZWN0LmZyZWV6ZSh7XG4gICAgcGFyc2VFeHByZXNzaW9uOiBwYXJzZUV4cHJlc3Npb24sXG4gICAgaXNTaW1wbGVQYXRoOiBpc1NpbXBsZVBhdGhcbiAgfSk7XG5cbiAgLy8gd2UgaGF2ZSB0d28gc2VwYXJhdGUgcXVldWVzOiBvbmUgZm9yIGRpcmVjdGl2ZSB1cGRhdGVzXG4gIC8vIGFuZCBvbmUgZm9yIHVzZXIgd2F0Y2hlciByZWdpc3RlcmVkIHZpYSAkd2F0Y2goKS5cbiAgLy8gd2Ugd2FudCB0byBndWFyYW50ZWUgZGlyZWN0aXZlIHVwZGF0ZXMgdG8gYmUgY2FsbGVkXG4gIC8vIGJlZm9yZSB1c2VyIHdhdGNoZXJzIHNvIHRoYXQgd2hlbiB1c2VyIHdhdGNoZXJzIGFyZVxuICAvLyB0cmlnZ2VyZWQsIHRoZSBET00gd291bGQgaGF2ZSBhbHJlYWR5IGJlZW4gaW4gdXBkYXRlZFxuICAvLyBzdGF0ZS5cblxuICB2YXIgcXVldWUgPSBbXTtcbiAgdmFyIHVzZXJRdWV1ZSA9IFtdO1xuICB2YXIgaGFzID0ge307XG4gIHZhciBjaXJjdWxhciA9IHt9O1xuICB2YXIgd2FpdGluZyA9IGZhbHNlO1xuXG4gIC8qKlxuICAgKiBSZXNldCB0aGUgYmF0Y2hlcidzIHN0YXRlLlxuICAgKi9cblxuICBmdW5jdGlvbiByZXNldEJhdGNoZXJTdGF0ZSgpIHtcbiAgICBxdWV1ZS5sZW5ndGggPSAwO1xuICAgIHVzZXJRdWV1ZS5sZW5ndGggPSAwO1xuICAgIGhhcyA9IHt9O1xuICAgIGNpcmN1bGFyID0ge307XG4gICAgd2FpdGluZyA9IGZhbHNlO1xuICB9XG5cbiAgLyoqXG4gICAqIEZsdXNoIGJvdGggcXVldWVzIGFuZCBydW4gdGhlIHdhdGNoZXJzLlxuICAgKi9cblxuICBmdW5jdGlvbiBmbHVzaEJhdGNoZXJRdWV1ZSgpIHtcbiAgICB2YXIgX2FnYWluID0gdHJ1ZTtcblxuICAgIF9mdW5jdGlvbjogd2hpbGUgKF9hZ2Fpbikge1xuICAgICAgX2FnYWluID0gZmFsc2U7XG5cbiAgICAgIHJ1bkJhdGNoZXJRdWV1ZShxdWV1ZSk7XG4gICAgICBydW5CYXRjaGVyUXVldWUodXNlclF1ZXVlKTtcbiAgICAgIC8vIHVzZXIgd2F0Y2hlcnMgdHJpZ2dlcmVkIG1vcmUgd2F0Y2hlcnMsXG4gICAgICAvLyBrZWVwIGZsdXNoaW5nIHVudGlsIGl0IGRlcGxldGVzXG4gICAgICBpZiAocXVldWUubGVuZ3RoKSB7XG4gICAgICAgIF9hZ2FpbiA9IHRydWU7XG4gICAgICAgIGNvbnRpbnVlIF9mdW5jdGlvbjtcbiAgICAgIH1cbiAgICAgIC8vIGRldiB0b29sIGhvb2tcbiAgICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBpZiAqL1xuICAgICAgaWYgKGRldnRvb2xzICYmIGNvbmZpZy5kZXZ0b29scykge1xuICAgICAgICBkZXZ0b29scy5lbWl0KCdmbHVzaCcpO1xuICAgICAgfVxuICAgICAgcmVzZXRCYXRjaGVyU3RhdGUoKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogUnVuIHRoZSB3YXRjaGVycyBpbiBhIHNpbmdsZSBxdWV1ZS5cbiAgICpcbiAgICogQHBhcmFtIHtBcnJheX0gcXVldWVcbiAgICovXG5cbiAgZnVuY3Rpb24gcnVuQmF0Y2hlclF1ZXVlKHF1ZXVlKSB7XG4gICAgLy8gZG8gbm90IGNhY2hlIGxlbmd0aCBiZWNhdXNlIG1vcmUgd2F0Y2hlcnMgbWlnaHQgYmUgcHVzaGVkXG4gICAgLy8gYXMgd2UgcnVuIGV4aXN0aW5nIHdhdGNoZXJzXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBxdWV1ZS5sZW5ndGg7IGkrKykge1xuICAgICAgdmFyIHdhdGNoZXIgPSBxdWV1ZVtpXTtcbiAgICAgIHZhciBpZCA9IHdhdGNoZXIuaWQ7XG4gICAgICBoYXNbaWRdID0gbnVsbDtcbiAgICAgIHdhdGNoZXIucnVuKCk7XG4gICAgICAvLyBpbiBkZXYgYnVpbGQsIGNoZWNrIGFuZCBzdG9wIGNpcmN1bGFyIHVwZGF0ZXMuXG4gICAgICBpZiAoJ2RldmVsb3BtZW50JyAhPT0gJ3Byb2R1Y3Rpb24nICYmIGhhc1tpZF0gIT0gbnVsbCkge1xuICAgICAgICBjaXJjdWxhcltpZF0gPSAoY2lyY3VsYXJbaWRdIHx8IDApICsgMTtcbiAgICAgICAgaWYgKGNpcmN1bGFyW2lkXSA+IGNvbmZpZy5fbWF4VXBkYXRlQ291bnQpIHtcbiAgICAgICAgICB3YXJuKCdZb3UgbWF5IGhhdmUgYW4gaW5maW5pdGUgdXBkYXRlIGxvb3AgZm9yIHdhdGNoZXIgJyArICd3aXRoIGV4cHJlc3Npb24gXCInICsgd2F0Y2hlci5leHByZXNzaW9uICsgJ1wiJywgd2F0Y2hlci52bSk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgcXVldWUubGVuZ3RoID0gMDtcbiAgfVxuXG4gIC8qKlxuICAgKiBQdXNoIGEgd2F0Y2hlciBpbnRvIHRoZSB3YXRjaGVyIHF1ZXVlLlxuICAgKiBKb2JzIHdpdGggZHVwbGljYXRlIElEcyB3aWxsIGJlIHNraXBwZWQgdW5sZXNzIGl0J3NcbiAgICogcHVzaGVkIHdoZW4gdGhlIHF1ZXVlIGlzIGJlaW5nIGZsdXNoZWQuXG4gICAqXG4gICAqIEBwYXJhbSB7V2F0Y2hlcn0gd2F0Y2hlclxuICAgKiAgIHByb3BlcnRpZXM6XG4gICAqICAgLSB7TnVtYmVyfSBpZFxuICAgKiAgIC0ge0Z1bmN0aW9ufSBydW5cbiAgICovXG5cbiAgZnVuY3Rpb24gcHVzaFdhdGNoZXIod2F0Y2hlcikge1xuICAgIHZhciBpZCA9IHdhdGNoZXIuaWQ7XG4gICAgaWYgKGhhc1tpZF0gPT0gbnVsbCkge1xuICAgICAgLy8gcHVzaCB3YXRjaGVyIGludG8gYXBwcm9wcmlhdGUgcXVldWVcbiAgICAgIHZhciBxID0gd2F0Y2hlci51c2VyID8gdXNlclF1ZXVlIDogcXVldWU7XG4gICAgICBoYXNbaWRdID0gcS5sZW5ndGg7XG4gICAgICBxLnB1c2god2F0Y2hlcik7XG4gICAgICAvLyBxdWV1ZSB0aGUgZmx1c2hcbiAgICAgIGlmICghd2FpdGluZykge1xuICAgICAgICB3YWl0aW5nID0gdHJ1ZTtcbiAgICAgICAgbmV4dFRpY2soZmx1c2hCYXRjaGVyUXVldWUpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHZhciB1aWQkMiA9IDA7XG5cbiAgLyoqXG4gICAqIEEgd2F0Y2hlciBwYXJzZXMgYW4gZXhwcmVzc2lvbiwgY29sbGVjdHMgZGVwZW5kZW5jaWVzLFxuICAgKiBhbmQgZmlyZXMgY2FsbGJhY2sgd2hlbiB0aGUgZXhwcmVzc2lvbiB2YWx1ZSBjaGFuZ2VzLlxuICAgKiBUaGlzIGlzIHVzZWQgZm9yIGJvdGggdGhlICR3YXRjaCgpIGFwaSBhbmQgZGlyZWN0aXZlcy5cbiAgICpcbiAgICogQHBhcmFtIHtWdWV9IHZtXG4gICAqIEBwYXJhbSB7U3RyaW5nfEZ1bmN0aW9ufSBleHBPckZuXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IGNiXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zXG4gICAqICAgICAgICAgICAgICAgICAtIHtBcnJheX0gZmlsdGVyc1xuICAgKiAgICAgICAgICAgICAgICAgLSB7Qm9vbGVhbn0gdHdvV2F5XG4gICAqICAgICAgICAgICAgICAgICAtIHtCb29sZWFufSBkZWVwXG4gICAqICAgICAgICAgICAgICAgICAtIHtCb29sZWFufSB1c2VyXG4gICAqICAgICAgICAgICAgICAgICAtIHtCb29sZWFufSBzeW5jXG4gICAqICAgICAgICAgICAgICAgICAtIHtCb29sZWFufSBsYXp5XG4gICAqICAgICAgICAgICAgICAgICAtIHtGdW5jdGlvbn0gW3ByZVByb2Nlc3NdXG4gICAqICAgICAgICAgICAgICAgICAtIHtGdW5jdGlvbn0gW3Bvc3RQcm9jZXNzXVxuICAgKiBAY29uc3RydWN0b3JcbiAgICovXG4gIGZ1bmN0aW9uIFdhdGNoZXIodm0sIGV4cE9yRm4sIGNiLCBvcHRpb25zKSB7XG4gICAgLy8gbWl4IGluIG9wdGlvbnNcbiAgICBpZiAob3B0aW9ucykge1xuICAgICAgZXh0ZW5kKHRoaXMsIG9wdGlvbnMpO1xuICAgIH1cbiAgICB2YXIgaXNGbiA9IHR5cGVvZiBleHBPckZuID09PSAnZnVuY3Rpb24nO1xuICAgIHRoaXMudm0gPSB2bTtcbiAgICB2bS5fd2F0Y2hlcnMucHVzaCh0aGlzKTtcbiAgICB0aGlzLmV4cHJlc3Npb24gPSBleHBPckZuO1xuICAgIHRoaXMuY2IgPSBjYjtcbiAgICB0aGlzLmlkID0gKyt1aWQkMjsgLy8gdWlkIGZvciBiYXRjaGluZ1xuICAgIHRoaXMuYWN0aXZlID0gdHJ1ZTtcbiAgICB0aGlzLmRpcnR5ID0gdGhpcy5sYXp5OyAvLyBmb3IgbGF6eSB3YXRjaGVyc1xuICAgIHRoaXMuZGVwcyA9IFtdO1xuICAgIHRoaXMubmV3RGVwcyA9IFtdO1xuICAgIHRoaXMuZGVwSWRzID0gbmV3IF9TZXQoKTtcbiAgICB0aGlzLm5ld0RlcElkcyA9IG5ldyBfU2V0KCk7XG4gICAgdGhpcy5wcmV2RXJyb3IgPSBudWxsOyAvLyBmb3IgYXN5bmMgZXJyb3Igc3RhY2tzXG4gICAgLy8gcGFyc2UgZXhwcmVzc2lvbiBmb3IgZ2V0dGVyL3NldHRlclxuICAgIGlmIChpc0ZuKSB7XG4gICAgICB0aGlzLmdldHRlciA9IGV4cE9yRm47XG4gICAgICB0aGlzLnNldHRlciA9IHVuZGVmaW5lZDtcbiAgICB9IGVsc2Uge1xuICAgICAgdmFyIHJlcyA9IHBhcnNlRXhwcmVzc2lvbihleHBPckZuLCB0aGlzLnR3b1dheSk7XG4gICAgICB0aGlzLmdldHRlciA9IHJlcy5nZXQ7XG4gICAgICB0aGlzLnNldHRlciA9IHJlcy5zZXQ7XG4gICAgfVxuICAgIHRoaXMudmFsdWUgPSB0aGlzLmxhenkgPyB1bmRlZmluZWQgOiB0aGlzLmdldCgpO1xuICAgIC8vIHN0YXRlIGZvciBhdm9pZGluZyBmYWxzZSB0cmlnZ2VycyBmb3IgZGVlcCBhbmQgQXJyYXlcbiAgICAvLyB3YXRjaGVycyBkdXJpbmcgdm0uX2RpZ2VzdCgpXG4gICAgdGhpcy5xdWV1ZWQgPSB0aGlzLnNoYWxsb3cgPSBmYWxzZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBFdmFsdWF0ZSB0aGUgZ2V0dGVyLCBhbmQgcmUtY29sbGVjdCBkZXBlbmRlbmNpZXMuXG4gICAqL1xuXG4gIFdhdGNoZXIucHJvdG90eXBlLmdldCA9IGZ1bmN0aW9uICgpIHtcbiAgICB0aGlzLmJlZm9yZUdldCgpO1xuICAgIHZhciBzY29wZSA9IHRoaXMuc2NvcGUgfHwgdGhpcy52bTtcbiAgICB2YXIgdmFsdWU7XG4gICAgdHJ5IHtcbiAgICAgIHZhbHVlID0gdGhpcy5nZXR0ZXIuY2FsbChzY29wZSwgc2NvcGUpO1xuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIGlmICgnZGV2ZWxvcG1lbnQnICE9PSAncHJvZHVjdGlvbicgJiYgY29uZmlnLndhcm5FeHByZXNzaW9uRXJyb3JzKSB7XG4gICAgICAgIHdhcm4oJ0Vycm9yIHdoZW4gZXZhbHVhdGluZyBleHByZXNzaW9uICcgKyAnXCInICsgdGhpcy5leHByZXNzaW9uICsgJ1wiOiAnICsgZS50b1N0cmluZygpLCB0aGlzLnZtKTtcbiAgICAgIH1cbiAgICB9XG4gICAgLy8gXCJ0b3VjaFwiIGV2ZXJ5IHByb3BlcnR5IHNvIHRoZXkgYXJlIGFsbCB0cmFja2VkIGFzXG4gICAgLy8gZGVwZW5kZW5jaWVzIGZvciBkZWVwIHdhdGNoaW5nXG4gICAgaWYgKHRoaXMuZGVlcCkge1xuICAgICAgdHJhdmVyc2UodmFsdWUpO1xuICAgIH1cbiAgICBpZiAodGhpcy5wcmVQcm9jZXNzKSB7XG4gICAgICB2YWx1ZSA9IHRoaXMucHJlUHJvY2Vzcyh2YWx1ZSk7XG4gICAgfVxuICAgIGlmICh0aGlzLmZpbHRlcnMpIHtcbiAgICAgIHZhbHVlID0gc2NvcGUuX2FwcGx5RmlsdGVycyh2YWx1ZSwgbnVsbCwgdGhpcy5maWx0ZXJzLCBmYWxzZSk7XG4gICAgfVxuICAgIGlmICh0aGlzLnBvc3RQcm9jZXNzKSB7XG4gICAgICB2YWx1ZSA9IHRoaXMucG9zdFByb2Nlc3ModmFsdWUpO1xuICAgIH1cbiAgICB0aGlzLmFmdGVyR2V0KCk7XG4gICAgcmV0dXJuIHZhbHVlO1xuICB9O1xuXG4gIC8qKlxuICAgKiBTZXQgdGhlIGNvcnJlc3BvbmRpbmcgdmFsdWUgd2l0aCB0aGUgc2V0dGVyLlxuICAgKlxuICAgKiBAcGFyYW0geyp9IHZhbHVlXG4gICAqL1xuXG4gIFdhdGNoZXIucHJvdG90eXBlLnNldCA9IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgIHZhciBzY29wZSA9IHRoaXMuc2NvcGUgfHwgdGhpcy52bTtcbiAgICBpZiAodGhpcy5maWx0ZXJzKSB7XG4gICAgICB2YWx1ZSA9IHNjb3BlLl9hcHBseUZpbHRlcnModmFsdWUsIHRoaXMudmFsdWUsIHRoaXMuZmlsdGVycywgdHJ1ZSk7XG4gICAgfVxuICAgIHRyeSB7XG4gICAgICB0aGlzLnNldHRlci5jYWxsKHNjb3BlLCBzY29wZSwgdmFsdWUpO1xuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIGlmICgnZGV2ZWxvcG1lbnQnICE9PSAncHJvZHVjdGlvbicgJiYgY29uZmlnLndhcm5FeHByZXNzaW9uRXJyb3JzKSB7XG4gICAgICAgIHdhcm4oJ0Vycm9yIHdoZW4gZXZhbHVhdGluZyBzZXR0ZXIgJyArICdcIicgKyB0aGlzLmV4cHJlc3Npb24gKyAnXCI6ICcgKyBlLnRvU3RyaW5nKCksIHRoaXMudm0pO1xuICAgICAgfVxuICAgIH1cbiAgICAvLyB0d28td2F5IHN5bmMgZm9yIHYtZm9yIGFsaWFzXG4gICAgdmFyIGZvckNvbnRleHQgPSBzY29wZS4kZm9yQ29udGV4dDtcbiAgICBpZiAoZm9yQ29udGV4dCAmJiBmb3JDb250ZXh0LmFsaWFzID09PSB0aGlzLmV4cHJlc3Npb24pIHtcbiAgICAgIGlmIChmb3JDb250ZXh0LmZpbHRlcnMpIHtcbiAgICAgICAgJ2RldmVsb3BtZW50JyAhPT0gJ3Byb2R1Y3Rpb24nICYmIHdhcm4oJ0l0IHNlZW1zIHlvdSBhcmUgdXNpbmcgdHdvLXdheSBiaW5kaW5nIG9uICcgKyAnYSB2LWZvciBhbGlhcyAoJyArIHRoaXMuZXhwcmVzc2lvbiArICcpLCBhbmQgdGhlICcgKyAndi1mb3IgaGFzIGZpbHRlcnMuIFRoaXMgd2lsbCBub3Qgd29yayBwcm9wZXJseS4gJyArICdFaXRoZXIgcmVtb3ZlIHRoZSBmaWx0ZXJzIG9yIHVzZSBhbiBhcnJheSBvZiAnICsgJ29iamVjdHMgYW5kIGJpbmQgdG8gb2JqZWN0IHByb3BlcnRpZXMgaW5zdGVhZC4nLCB0aGlzLnZtKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgZm9yQ29udGV4dC5fd2l0aExvY2soZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAoc2NvcGUuJGtleSkge1xuICAgICAgICAgIC8vIG9yaWdpbmFsIGlzIGFuIG9iamVjdFxuICAgICAgICAgIGZvckNvbnRleHQucmF3VmFsdWVbc2NvcGUuJGtleV0gPSB2YWx1ZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBmb3JDb250ZXh0LnJhd1ZhbHVlLiRzZXQoc2NvcGUuJGluZGV4LCB2YWx1ZSk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cbiAgfTtcblxuICAvKipcbiAgICogUHJlcGFyZSBmb3IgZGVwZW5kZW5jeSBjb2xsZWN0aW9uLlxuICAgKi9cblxuICBXYXRjaGVyLnByb3RvdHlwZS5iZWZvcmVHZXQgPSBmdW5jdGlvbiAoKSB7XG4gICAgRGVwLnRhcmdldCA9IHRoaXM7XG4gIH07XG5cbiAgLyoqXG4gICAqIEFkZCBhIGRlcGVuZGVuY3kgdG8gdGhpcyBkaXJlY3RpdmUuXG4gICAqXG4gICAqIEBwYXJhbSB7RGVwfSBkZXBcbiAgICovXG5cbiAgV2F0Y2hlci5wcm90b3R5cGUuYWRkRGVwID0gZnVuY3Rpb24gKGRlcCkge1xuICAgIHZhciBpZCA9IGRlcC5pZDtcbiAgICBpZiAoIXRoaXMubmV3RGVwSWRzLmhhcyhpZCkpIHtcbiAgICAgIHRoaXMubmV3RGVwSWRzLmFkZChpZCk7XG4gICAgICB0aGlzLm5ld0RlcHMucHVzaChkZXApO1xuICAgICAgaWYgKCF0aGlzLmRlcElkcy5oYXMoaWQpKSB7XG4gICAgICAgIGRlcC5hZGRTdWIodGhpcyk7XG4gICAgICB9XG4gICAgfVxuICB9O1xuXG4gIC8qKlxuICAgKiBDbGVhbiB1cCBmb3IgZGVwZW5kZW5jeSBjb2xsZWN0aW9uLlxuICAgKi9cblxuICBXYXRjaGVyLnByb3RvdHlwZS5hZnRlckdldCA9IGZ1bmN0aW9uICgpIHtcbiAgICBEZXAudGFyZ2V0ID0gbnVsbDtcbiAgICB2YXIgaSA9IHRoaXMuZGVwcy5sZW5ndGg7XG4gICAgd2hpbGUgKGktLSkge1xuICAgICAgdmFyIGRlcCA9IHRoaXMuZGVwc1tpXTtcbiAgICAgIGlmICghdGhpcy5uZXdEZXBJZHMuaGFzKGRlcC5pZCkpIHtcbiAgICAgICAgZGVwLnJlbW92ZVN1Yih0aGlzKTtcbiAgICAgIH1cbiAgICB9XG4gICAgdmFyIHRtcCA9IHRoaXMuZGVwSWRzO1xuICAgIHRoaXMuZGVwSWRzID0gdGhpcy5uZXdEZXBJZHM7XG4gICAgdGhpcy5uZXdEZXBJZHMgPSB0bXA7XG4gICAgdGhpcy5uZXdEZXBJZHMuY2xlYXIoKTtcbiAgICB0bXAgPSB0aGlzLmRlcHM7XG4gICAgdGhpcy5kZXBzID0gdGhpcy5uZXdEZXBzO1xuICAgIHRoaXMubmV3RGVwcyA9IHRtcDtcbiAgICB0aGlzLm5ld0RlcHMubGVuZ3RoID0gMDtcbiAgfTtcblxuICAvKipcbiAgICogU3Vic2NyaWJlciBpbnRlcmZhY2UuXG4gICAqIFdpbGwgYmUgY2FsbGVkIHdoZW4gYSBkZXBlbmRlbmN5IGNoYW5nZXMuXG4gICAqXG4gICAqIEBwYXJhbSB7Qm9vbGVhbn0gc2hhbGxvd1xuICAgKi9cblxuICBXYXRjaGVyLnByb3RvdHlwZS51cGRhdGUgPSBmdW5jdGlvbiAoc2hhbGxvdykge1xuICAgIGlmICh0aGlzLmxhenkpIHtcbiAgICAgIHRoaXMuZGlydHkgPSB0cnVlO1xuICAgIH0gZWxzZSBpZiAodGhpcy5zeW5jIHx8ICFjb25maWcuYXN5bmMpIHtcbiAgICAgIHRoaXMucnVuKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIGlmIHF1ZXVlZCwgb25seSBvdmVyd3JpdGUgc2hhbGxvdyB3aXRoIG5vbi1zaGFsbG93LFxuICAgICAgLy8gYnV0IG5vdCB0aGUgb3RoZXIgd2F5IGFyb3VuZC5cbiAgICAgIHRoaXMuc2hhbGxvdyA9IHRoaXMucXVldWVkID8gc2hhbGxvdyA/IHRoaXMuc2hhbGxvdyA6IGZhbHNlIDogISFzaGFsbG93O1xuICAgICAgdGhpcy5xdWV1ZWQgPSB0cnVlO1xuICAgICAgLy8gcmVjb3JkIGJlZm9yZS1wdXNoIGVycm9yIHN0YWNrIGluIGRlYnVnIG1vZGVcbiAgICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBpZiAqL1xuICAgICAgaWYgKCdkZXZlbG9wbWVudCcgIT09ICdwcm9kdWN0aW9uJyAmJiBjb25maWcuZGVidWcpIHtcbiAgICAgICAgdGhpcy5wcmV2RXJyb3IgPSBuZXcgRXJyb3IoJ1t2dWVdIGFzeW5jIHN0YWNrIHRyYWNlJyk7XG4gICAgICB9XG4gICAgICBwdXNoV2F0Y2hlcih0aGlzKTtcbiAgICB9XG4gIH07XG5cbiAgLyoqXG4gICAqIEJhdGNoZXIgam9iIGludGVyZmFjZS5cbiAgICogV2lsbCBiZSBjYWxsZWQgYnkgdGhlIGJhdGNoZXIuXG4gICAqL1xuXG4gIFdhdGNoZXIucHJvdG90eXBlLnJ1biA9IGZ1bmN0aW9uICgpIHtcbiAgICBpZiAodGhpcy5hY3RpdmUpIHtcbiAgICAgIHZhciB2YWx1ZSA9IHRoaXMuZ2V0KCk7XG4gICAgICBpZiAodmFsdWUgIT09IHRoaXMudmFsdWUgfHxcbiAgICAgIC8vIERlZXAgd2F0Y2hlcnMgYW5kIHdhdGNoZXJzIG9uIE9iamVjdC9BcnJheXMgc2hvdWxkIGZpcmUgZXZlblxuICAgICAgLy8gd2hlbiB0aGUgdmFsdWUgaXMgdGhlIHNhbWUsIGJlY2F1c2UgdGhlIHZhbHVlIG1heVxuICAgICAgLy8gaGF2ZSBtdXRhdGVkOyBidXQgb25seSBkbyBzbyBpZiB0aGlzIGlzIGFcbiAgICAgIC8vIG5vbi1zaGFsbG93IHVwZGF0ZSAoY2F1c2VkIGJ5IGEgdm0gZGlnZXN0KS5cbiAgICAgIChpc09iamVjdCh2YWx1ZSkgfHwgdGhpcy5kZWVwKSAmJiAhdGhpcy5zaGFsbG93KSB7XG4gICAgICAgIC8vIHNldCBuZXcgdmFsdWVcbiAgICAgICAgdmFyIG9sZFZhbHVlID0gdGhpcy52YWx1ZTtcbiAgICAgICAgdGhpcy52YWx1ZSA9IHZhbHVlO1xuICAgICAgICAvLyBpbiBkZWJ1ZyArIGFzeW5jIG1vZGUsIHdoZW4gYSB3YXRjaGVyIGNhbGxiYWNrc1xuICAgICAgICAvLyB0aHJvd3MsIHdlIGFsc28gdGhyb3cgdGhlIHNhdmVkIGJlZm9yZS1wdXNoIGVycm9yXG4gICAgICAgIC8vIHNvIHRoZSBmdWxsIGNyb3NzLXRpY2sgc3RhY2sgdHJhY2UgaXMgYXZhaWxhYmxlLlxuICAgICAgICB2YXIgcHJldkVycm9yID0gdGhpcy5wcmV2RXJyb3I7XG4gICAgICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBpZiAqL1xuICAgICAgICBpZiAoJ2RldmVsb3BtZW50JyAhPT0gJ3Byb2R1Y3Rpb24nICYmIGNvbmZpZy5kZWJ1ZyAmJiBwcmV2RXJyb3IpIHtcbiAgICAgICAgICB0aGlzLnByZXZFcnJvciA9IG51bGw7XG4gICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIHRoaXMuY2IuY2FsbCh0aGlzLnZtLCB2YWx1ZSwgb2xkVmFsdWUpO1xuICAgICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgIG5leHRUaWNrKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgdGhyb3cgcHJldkVycm9yO1xuICAgICAgICAgICAgfSwgMCk7XG4gICAgICAgICAgICB0aHJvdyBlO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aGlzLmNiLmNhbGwodGhpcy52bSwgdmFsdWUsIG9sZFZhbHVlKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgdGhpcy5xdWV1ZWQgPSB0aGlzLnNoYWxsb3cgPSBmYWxzZTtcbiAgICB9XG4gIH07XG5cbiAgLyoqXG4gICAqIEV2YWx1YXRlIHRoZSB2YWx1ZSBvZiB0aGUgd2F0Y2hlci5cbiAgICogVGhpcyBvbmx5IGdldHMgY2FsbGVkIGZvciBsYXp5IHdhdGNoZXJzLlxuICAgKi9cblxuICBXYXRjaGVyLnByb3RvdHlwZS5ldmFsdWF0ZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAvLyBhdm9pZCBvdmVyd3JpdGluZyBhbm90aGVyIHdhdGNoZXIgdGhhdCBpcyBiZWluZ1xuICAgIC8vIGNvbGxlY3RlZC5cbiAgICB2YXIgY3VycmVudCA9IERlcC50YXJnZXQ7XG4gICAgdGhpcy52YWx1ZSA9IHRoaXMuZ2V0KCk7XG4gICAgdGhpcy5kaXJ0eSA9IGZhbHNlO1xuICAgIERlcC50YXJnZXQgPSBjdXJyZW50O1xuICB9O1xuXG4gIC8qKlxuICAgKiBEZXBlbmQgb24gYWxsIGRlcHMgY29sbGVjdGVkIGJ5IHRoaXMgd2F0Y2hlci5cbiAgICovXG5cbiAgV2F0Y2hlci5wcm90b3R5cGUuZGVwZW5kID0gZnVuY3Rpb24gKCkge1xuICAgIHZhciBpID0gdGhpcy5kZXBzLmxlbmd0aDtcbiAgICB3aGlsZSAoaS0tKSB7XG4gICAgICB0aGlzLmRlcHNbaV0uZGVwZW5kKCk7XG4gICAgfVxuICB9O1xuXG4gIC8qKlxuICAgKiBSZW1vdmUgc2VsZiBmcm9tIGFsbCBkZXBlbmRlbmNpZXMnIHN1YmNyaWJlciBsaXN0LlxuICAgKi9cblxuICBXYXRjaGVyLnByb3RvdHlwZS50ZWFyZG93biA9IGZ1bmN0aW9uICgpIHtcbiAgICBpZiAodGhpcy5hY3RpdmUpIHtcbiAgICAgIC8vIHJlbW92ZSBzZWxmIGZyb20gdm0ncyB3YXRjaGVyIGxpc3RcbiAgICAgIC8vIHRoaXMgaXMgYSBzb21ld2hhdCBleHBlbnNpdmUgb3BlcmF0aW9uIHNvIHdlIHNraXAgaXRcbiAgICAgIC8vIGlmIHRoZSB2bSBpcyBiZWluZyBkZXN0cm95ZWQgb3IgaXMgcGVyZm9ybWluZyBhIHYtZm9yXG4gICAgICAvLyByZS1yZW5kZXIgKHRoZSB3YXRjaGVyIGxpc3QgaXMgdGhlbiBmaWx0ZXJlZCBieSB2LWZvcikuXG4gICAgICBpZiAoIXRoaXMudm0uX2lzQmVpbmdEZXN0cm95ZWQgJiYgIXRoaXMudm0uX3ZGb3JSZW1vdmluZykge1xuICAgICAgICB0aGlzLnZtLl93YXRjaGVycy4kcmVtb3ZlKHRoaXMpO1xuICAgICAgfVxuICAgICAgdmFyIGkgPSB0aGlzLmRlcHMubGVuZ3RoO1xuICAgICAgd2hpbGUgKGktLSkge1xuICAgICAgICB0aGlzLmRlcHNbaV0ucmVtb3ZlU3ViKHRoaXMpO1xuICAgICAgfVxuICAgICAgdGhpcy5hY3RpdmUgPSBmYWxzZTtcbiAgICAgIHRoaXMudm0gPSB0aGlzLmNiID0gdGhpcy52YWx1ZSA9IG51bGw7XG4gICAgfVxuICB9O1xuXG4gIC8qKlxuICAgKiBSZWNydXNpdmVseSB0cmF2ZXJzZSBhbiBvYmplY3QgdG8gZXZva2UgYWxsIGNvbnZlcnRlZFxuICAgKiBnZXR0ZXJzLCBzbyB0aGF0IGV2ZXJ5IG5lc3RlZCBwcm9wZXJ0eSBpbnNpZGUgdGhlIG9iamVjdFxuICAgKiBpcyBjb2xsZWN0ZWQgYXMgYSBcImRlZXBcIiBkZXBlbmRlbmN5LlxuICAgKlxuICAgKiBAcGFyYW0geyp9IHZhbFxuICAgKi9cblxuICB2YXIgc2Vlbk9iamVjdHMgPSBuZXcgX1NldCgpO1xuICBmdW5jdGlvbiB0cmF2ZXJzZSh2YWwsIHNlZW4pIHtcbiAgICB2YXIgaSA9IHVuZGVmaW5lZCxcbiAgICAgICAga2V5cyA9IHVuZGVmaW5lZDtcbiAgICBpZiAoIXNlZW4pIHtcbiAgICAgIHNlZW4gPSBzZWVuT2JqZWN0cztcbiAgICAgIHNlZW4uY2xlYXIoKTtcbiAgICB9XG4gICAgdmFyIGlzQSA9IGlzQXJyYXkodmFsKTtcbiAgICB2YXIgaXNPID0gaXNPYmplY3QodmFsKTtcbiAgICBpZiAoaXNBIHx8IGlzTykge1xuICAgICAgaWYgKHZhbC5fX29iX18pIHtcbiAgICAgICAgdmFyIGRlcElkID0gdmFsLl9fb2JfXy5kZXAuaWQ7XG4gICAgICAgIGlmIChzZWVuLmhhcyhkZXBJZCkpIHtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgc2Vlbi5hZGQoZGVwSWQpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAoaXNBKSB7XG4gICAgICAgIGkgPSB2YWwubGVuZ3RoO1xuICAgICAgICB3aGlsZSAoaS0tKSB0cmF2ZXJzZSh2YWxbaV0sIHNlZW4pO1xuICAgICAgfSBlbHNlIGlmIChpc08pIHtcbiAgICAgICAga2V5cyA9IE9iamVjdC5rZXlzKHZhbCk7XG4gICAgICAgIGkgPSBrZXlzLmxlbmd0aDtcbiAgICAgICAgd2hpbGUgKGktLSkgdHJhdmVyc2UodmFsW2tleXNbaV1dLCBzZWVuKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICB2YXIgdGV4dCQxID0ge1xuXG4gICAgYmluZDogZnVuY3Rpb24gYmluZCgpIHtcbiAgICAgIHRoaXMuYXR0ciA9IHRoaXMuZWwubm9kZVR5cGUgPT09IDMgPyAnZGF0YScgOiAndGV4dENvbnRlbnQnO1xuICAgIH0sXG5cbiAgICB1cGRhdGU6IGZ1bmN0aW9uIHVwZGF0ZSh2YWx1ZSkge1xuICAgICAgdGhpcy5lbFt0aGlzLmF0dHJdID0gX3RvU3RyaW5nKHZhbHVlKTtcbiAgICB9XG4gIH07XG5cbiAgdmFyIHRlbXBsYXRlQ2FjaGUgPSBuZXcgQ2FjaGUoMTAwMCk7XG4gIHZhciBpZFNlbGVjdG9yQ2FjaGUgPSBuZXcgQ2FjaGUoMTAwMCk7XG5cbiAgdmFyIG1hcCA9IHtcbiAgICBlZmF1bHQ6IFswLCAnJywgJyddLFxuICAgIGxlZ2VuZDogWzEsICc8ZmllbGRzZXQ+JywgJzwvZmllbGRzZXQ+J10sXG4gICAgdHI6IFsyLCAnPHRhYmxlPjx0Ym9keT4nLCAnPC90Ym9keT48L3RhYmxlPiddLFxuICAgIGNvbDogWzIsICc8dGFibGU+PHRib2R5PjwvdGJvZHk+PGNvbGdyb3VwPicsICc8L2NvbGdyb3VwPjwvdGFibGU+J11cbiAgfTtcblxuICBtYXAudGQgPSBtYXAudGggPSBbMywgJzx0YWJsZT48dGJvZHk+PHRyPicsICc8L3RyPjwvdGJvZHk+PC90YWJsZT4nXTtcblxuICBtYXAub3B0aW9uID0gbWFwLm9wdGdyb3VwID0gWzEsICc8c2VsZWN0IG11bHRpcGxlPVwibXVsdGlwbGVcIj4nLCAnPC9zZWxlY3Q+J107XG5cbiAgbWFwLnRoZWFkID0gbWFwLnRib2R5ID0gbWFwLmNvbGdyb3VwID0gbWFwLmNhcHRpb24gPSBtYXAudGZvb3QgPSBbMSwgJzx0YWJsZT4nLCAnPC90YWJsZT4nXTtcblxuICBtYXAuZyA9IG1hcC5kZWZzID0gbWFwLnN5bWJvbCA9IG1hcC51c2UgPSBtYXAuaW1hZ2UgPSBtYXAudGV4dCA9IG1hcC5jaXJjbGUgPSBtYXAuZWxsaXBzZSA9IG1hcC5saW5lID0gbWFwLnBhdGggPSBtYXAucG9seWdvbiA9IG1hcC5wb2x5bGluZSA9IG1hcC5yZWN0ID0gWzEsICc8c3ZnICcgKyAneG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiICcgKyAneG1sbnM6eGxpbms9XCJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rXCIgJyArICd4bWxuczpldj1cImh0dHA6Ly93d3cudzMub3JnLzIwMDEveG1sLWV2ZW50c1wiJyArICd2ZXJzaW9uPVwiMS4xXCI+JywgJzwvc3ZnPiddO1xuXG4gIC8qKlxuICAgKiBDaGVjayBpZiBhIG5vZGUgaXMgYSBzdXBwb3J0ZWQgdGVtcGxhdGUgbm9kZSB3aXRoIGFcbiAgICogRG9jdW1lbnRGcmFnbWVudCBjb250ZW50LlxuICAgKlxuICAgKiBAcGFyYW0ge05vZGV9IG5vZGVcbiAgICogQHJldHVybiB7Qm9vbGVhbn1cbiAgICovXG5cbiAgZnVuY3Rpb24gaXNSZWFsVGVtcGxhdGUobm9kZSkge1xuICAgIHJldHVybiBpc1RlbXBsYXRlKG5vZGUpICYmIGlzRnJhZ21lbnQobm9kZS5jb250ZW50KTtcbiAgfVxuXG4gIHZhciB0YWdSRSQxID0gLzwoW1xcdzotXSspLztcbiAgdmFyIGVudGl0eVJFID0gLyYjP1xcdys/Oy87XG5cbiAgLyoqXG4gICAqIENvbnZlcnQgYSBzdHJpbmcgdGVtcGxhdGUgdG8gYSBEb2N1bWVudEZyYWdtZW50LlxuICAgKiBEZXRlcm1pbmVzIGNvcnJlY3Qgd3JhcHBpbmcgYnkgdGFnIHR5cGVzLiBXcmFwcGluZ1xuICAgKiBzdHJhdGVneSBmb3VuZCBpbiBqUXVlcnkgJiBjb21wb25lbnQvZG9taWZ5LlxuICAgKlxuICAgKiBAcGFyYW0ge1N0cmluZ30gdGVtcGxhdGVTdHJpbmdcbiAgICogQHBhcmFtIHtCb29sZWFufSByYXdcbiAgICogQHJldHVybiB7RG9jdW1lbnRGcmFnbWVudH1cbiAgICovXG5cbiAgZnVuY3Rpb24gc3RyaW5nVG9GcmFnbWVudCh0ZW1wbGF0ZVN0cmluZywgcmF3KSB7XG4gICAgLy8gdHJ5IGEgY2FjaGUgaGl0IGZpcnN0XG4gICAgdmFyIGNhY2hlS2V5ID0gcmF3ID8gdGVtcGxhdGVTdHJpbmcgOiB0ZW1wbGF0ZVN0cmluZy50cmltKCk7XG4gICAgdmFyIGhpdCA9IHRlbXBsYXRlQ2FjaGUuZ2V0KGNhY2hlS2V5KTtcbiAgICBpZiAoaGl0KSB7XG4gICAgICByZXR1cm4gaGl0O1xuICAgIH1cblxuICAgIHZhciBmcmFnID0gZG9jdW1lbnQuY3JlYXRlRG9jdW1lbnRGcmFnbWVudCgpO1xuICAgIHZhciB0YWdNYXRjaCA9IHRlbXBsYXRlU3RyaW5nLm1hdGNoKHRhZ1JFJDEpO1xuICAgIHZhciBlbnRpdHlNYXRjaCA9IGVudGl0eVJFLnRlc3QodGVtcGxhdGVTdHJpbmcpO1xuXG4gICAgaWYgKCF0YWdNYXRjaCAmJiAhZW50aXR5TWF0Y2gpIHtcbiAgICAgIC8vIHRleHQgb25seSwgcmV0dXJuIGEgc2luZ2xlIHRleHQgbm9kZS5cbiAgICAgIGZyYWcuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUodGVtcGxhdGVTdHJpbmcpKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdmFyIHRhZyA9IHRhZ01hdGNoICYmIHRhZ01hdGNoWzFdO1xuICAgICAgdmFyIHdyYXAgPSBtYXBbdGFnXSB8fCBtYXAuZWZhdWx0O1xuICAgICAgdmFyIGRlcHRoID0gd3JhcFswXTtcbiAgICAgIHZhciBwcmVmaXggPSB3cmFwWzFdO1xuICAgICAgdmFyIHN1ZmZpeCA9IHdyYXBbMl07XG4gICAgICB2YXIgbm9kZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuXG4gICAgICBub2RlLmlubmVySFRNTCA9IHByZWZpeCArIHRlbXBsYXRlU3RyaW5nICsgc3VmZml4O1xuICAgICAgd2hpbGUgKGRlcHRoLS0pIHtcbiAgICAgICAgbm9kZSA9IG5vZGUubGFzdENoaWxkO1xuICAgICAgfVxuXG4gICAgICB2YXIgY2hpbGQ7XG4gICAgICAvKiBlc2xpbnQtZGlzYWJsZSBuby1jb25kLWFzc2lnbiAqL1xuICAgICAgd2hpbGUgKGNoaWxkID0gbm9kZS5maXJzdENoaWxkKSB7XG4gICAgICAgIC8qIGVzbGludC1lbmFibGUgbm8tY29uZC1hc3NpZ24gKi9cbiAgICAgICAgZnJhZy5hcHBlbmRDaGlsZChjaGlsZCk7XG4gICAgICB9XG4gICAgfVxuICAgIGlmICghcmF3KSB7XG4gICAgICB0cmltTm9kZShmcmFnKTtcbiAgICB9XG4gICAgdGVtcGxhdGVDYWNoZS5wdXQoY2FjaGVLZXksIGZyYWcpO1xuICAgIHJldHVybiBmcmFnO1xuICB9XG5cbiAgLyoqXG4gICAqIENvbnZlcnQgYSB0ZW1wbGF0ZSBub2RlIHRvIGEgRG9jdW1lbnRGcmFnbWVudC5cbiAgICpcbiAgICogQHBhcmFtIHtOb2RlfSBub2RlXG4gICAqIEByZXR1cm4ge0RvY3VtZW50RnJhZ21lbnR9XG4gICAqL1xuXG4gIGZ1bmN0aW9uIG5vZGVUb0ZyYWdtZW50KG5vZGUpIHtcbiAgICAvLyBpZiBpdHMgYSB0ZW1wbGF0ZSB0YWcgYW5kIHRoZSBicm93c2VyIHN1cHBvcnRzIGl0LFxuICAgIC8vIGl0cyBjb250ZW50IGlzIGFscmVhZHkgYSBkb2N1bWVudCBmcmFnbWVudC4gSG93ZXZlciwgaU9TIFNhZmFyaSBoYXNcbiAgICAvLyBidWcgd2hlbiB1c2luZyBkaXJlY3RseSBjbG9uZWQgdGVtcGxhdGUgY29udGVudCB3aXRoIHRvdWNoXG4gICAgLy8gZXZlbnRzIGFuZCBjYW4gY2F1c2UgY3Jhc2hlcyB3aGVuIHRoZSBub2RlcyBhcmUgcmVtb3ZlZCBmcm9tIERPTSwgc28gd2VcbiAgICAvLyBoYXZlIHRvIHRyZWF0IHRlbXBsYXRlIGVsZW1lbnRzIGFzIHN0cmluZyB0ZW1wbGF0ZXMuICgjMjgwNSlcbiAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgaWYgKi9cbiAgICBpZiAoaXNSZWFsVGVtcGxhdGUobm9kZSkpIHtcbiAgICAgIHJldHVybiBzdHJpbmdUb0ZyYWdtZW50KG5vZGUuaW5uZXJIVE1MKTtcbiAgICB9XG4gICAgLy8gc2NyaXB0IHRlbXBsYXRlXG4gICAgaWYgKG5vZGUudGFnTmFtZSA9PT0gJ1NDUklQVCcpIHtcbiAgICAgIHJldHVybiBzdHJpbmdUb0ZyYWdtZW50KG5vZGUudGV4dENvbnRlbnQpO1xuICAgIH1cbiAgICAvLyBub3JtYWwgbm9kZSwgY2xvbmUgaXQgdG8gYXZvaWQgbXV0YXRpbmcgdGhlIG9yaWdpbmFsXG4gICAgdmFyIGNsb25lZE5vZGUgPSBjbG9uZU5vZGUobm9kZSk7XG4gICAgdmFyIGZyYWcgPSBkb2N1bWVudC5jcmVhdGVEb2N1bWVudEZyYWdtZW50KCk7XG4gICAgdmFyIGNoaWxkO1xuICAgIC8qIGVzbGludC1kaXNhYmxlIG5vLWNvbmQtYXNzaWduICovXG4gICAgd2hpbGUgKGNoaWxkID0gY2xvbmVkTm9kZS5maXJzdENoaWxkKSB7XG4gICAgICAvKiBlc2xpbnQtZW5hYmxlIG5vLWNvbmQtYXNzaWduICovXG4gICAgICBmcmFnLmFwcGVuZENoaWxkKGNoaWxkKTtcbiAgICB9XG4gICAgdHJpbU5vZGUoZnJhZyk7XG4gICAgcmV0dXJuIGZyYWc7XG4gIH1cblxuICAvLyBUZXN0IGZvciB0aGUgcHJlc2VuY2Ugb2YgdGhlIFNhZmFyaSB0ZW1wbGF0ZSBjbG9uaW5nIGJ1Z1xuICAvLyBodHRwczovL2J1Z3Mud2Via2l0Lm9yZy9zaG93dWcuY2dpP2lkPTEzNzc1NVxuICB2YXIgaGFzQnJva2VuVGVtcGxhdGUgPSAoZnVuY3Rpb24gKCkge1xuICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBlbHNlICovXG4gICAgaWYgKGluQnJvd3Nlcikge1xuICAgICAgdmFyIGEgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgIGEuaW5uZXJIVE1MID0gJzx0ZW1wbGF0ZT4xPC90ZW1wbGF0ZT4nO1xuICAgICAgcmV0dXJuICFhLmNsb25lTm9kZSh0cnVlKS5maXJzdENoaWxkLmlubmVySFRNTDtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgfSkoKTtcblxuICAvLyBUZXN0IGZvciBJRTEwLzExIHRleHRhcmVhIHBsYWNlaG9sZGVyIGNsb25lIGJ1Z1xuICB2YXIgaGFzVGV4dGFyZWFDbG9uZUJ1ZyA9IChmdW5jdGlvbiAoKSB7XG4gICAgLyogaXN0YW5idWwgaWdub3JlIGVsc2UgKi9cbiAgICBpZiAoaW5Ccm93c2VyKSB7XG4gICAgICB2YXIgdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3RleHRhcmVhJyk7XG4gICAgICB0LnBsYWNlaG9sZGVyID0gJ3QnO1xuICAgICAgcmV0dXJuIHQuY2xvbmVOb2RlKHRydWUpLnZhbHVlID09PSAndCc7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gIH0pKCk7XG5cbiAgLyoqXG4gICAqIDEuIERlYWwgd2l0aCBTYWZhcmkgY2xvbmluZyBuZXN0ZWQgPHRlbXBsYXRlPiBidWcgYnlcbiAgICogICAgbWFudWFsbHkgY2xvbmluZyBhbGwgdGVtcGxhdGUgaW5zdGFuY2VzLlxuICAgKiAyLiBEZWFsIHdpdGggSUUxMC8xMSB0ZXh0YXJlYSBwbGFjZWhvbGRlciBidWcgYnkgc2V0dGluZ1xuICAgKiAgICB0aGUgY29ycmVjdCB2YWx1ZSBhZnRlciBjbG9uaW5nLlxuICAgKlxuICAgKiBAcGFyYW0ge0VsZW1lbnR8RG9jdW1lbnRGcmFnbWVudH0gbm9kZVxuICAgKiBAcmV0dXJuIHtFbGVtZW50fERvY3VtZW50RnJhZ21lbnR9XG4gICAqL1xuXG4gIGZ1bmN0aW9uIGNsb25lTm9kZShub2RlKSB7XG4gICAgLyogaXN0YW5idWwgaWdub3JlIGlmICovXG4gICAgaWYgKCFub2RlLnF1ZXJ5U2VsZWN0b3JBbGwpIHtcbiAgICAgIHJldHVybiBub2RlLmNsb25lTm9kZSgpO1xuICAgIH1cbiAgICB2YXIgcmVzID0gbm9kZS5jbG9uZU5vZGUodHJ1ZSk7XG4gICAgdmFyIGksIG9yaWdpbmFsLCBjbG9uZWQ7XG4gICAgLyogaXN0YW5idWwgaWdub3JlIGlmICovXG4gICAgaWYgKGhhc0Jyb2tlblRlbXBsYXRlKSB7XG4gICAgICB2YXIgdGVtcENsb25lID0gcmVzO1xuICAgICAgaWYgKGlzUmVhbFRlbXBsYXRlKG5vZGUpKSB7XG4gICAgICAgIG5vZGUgPSBub2RlLmNvbnRlbnQ7XG4gICAgICAgIHRlbXBDbG9uZSA9IHJlcy5jb250ZW50O1xuICAgICAgfVxuICAgICAgb3JpZ2luYWwgPSBub2RlLnF1ZXJ5U2VsZWN0b3JBbGwoJ3RlbXBsYXRlJyk7XG4gICAgICBpZiAob3JpZ2luYWwubGVuZ3RoKSB7XG4gICAgICAgIGNsb25lZCA9IHRlbXBDbG9uZS5xdWVyeVNlbGVjdG9yQWxsKCd0ZW1wbGF0ZScpO1xuICAgICAgICBpID0gY2xvbmVkLmxlbmd0aDtcbiAgICAgICAgd2hpbGUgKGktLSkge1xuICAgICAgICAgIGNsb25lZFtpXS5wYXJlbnROb2RlLnJlcGxhY2VDaGlsZChjbG9uZU5vZGUob3JpZ2luYWxbaV0pLCBjbG9uZWRbaV0pO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBpZiAqL1xuICAgIGlmIChoYXNUZXh0YXJlYUNsb25lQnVnKSB7XG4gICAgICBpZiAobm9kZS50YWdOYW1lID09PSAnVEVYVEFSRUEnKSB7XG4gICAgICAgIHJlcy52YWx1ZSA9IG5vZGUudmFsdWU7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBvcmlnaW5hbCA9IG5vZGUucXVlcnlTZWxlY3RvckFsbCgndGV4dGFyZWEnKTtcbiAgICAgICAgaWYgKG9yaWdpbmFsLmxlbmd0aCkge1xuICAgICAgICAgIGNsb25lZCA9IHJlcy5xdWVyeVNlbGVjdG9yQWxsKCd0ZXh0YXJlYScpO1xuICAgICAgICAgIGkgPSBjbG9uZWQubGVuZ3RoO1xuICAgICAgICAgIHdoaWxlIChpLS0pIHtcbiAgICAgICAgICAgIGNsb25lZFtpXS52YWx1ZSA9IG9yaWdpbmFsW2ldLnZhbHVlO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gcmVzO1xuICB9XG5cbiAgLyoqXG4gICAqIFByb2Nlc3MgdGhlIHRlbXBsYXRlIG9wdGlvbiBhbmQgbm9ybWFsaXplcyBpdCBpbnRvIGFcbiAgICogYSBEb2N1bWVudEZyYWdtZW50IHRoYXQgY2FuIGJlIHVzZWQgYXMgYSBwYXJ0aWFsIG9yIGFcbiAgICogaW5zdGFuY2UgdGVtcGxhdGUuXG4gICAqXG4gICAqIEBwYXJhbSB7Kn0gdGVtcGxhdGVcbiAgICogICAgICAgIFBvc3NpYmxlIHZhbHVlcyBpbmNsdWRlOlxuICAgKiAgICAgICAgLSBEb2N1bWVudEZyYWdtZW50IG9iamVjdFxuICAgKiAgICAgICAgLSBOb2RlIG9iamVjdCBvZiB0eXBlIFRlbXBsYXRlXG4gICAqICAgICAgICAtIGlkIHNlbGVjdG9yOiAnI3NvbWUtdGVtcGxhdGUtaWQnXG4gICAqICAgICAgICAtIHRlbXBsYXRlIHN0cmluZzogJzxkaXY+PHNwYW4+e3ttc2d9fTwvc3Bhbj48L2Rpdj4nXG4gICAqIEBwYXJhbSB7Qm9vbGVhbn0gc2hvdWxkQ2xvbmVcbiAgICogQHBhcmFtIHtCb29sZWFufSByYXdcbiAgICogICAgICAgIGlubGluZSBIVE1MIGludGVycG9sYXRpb24uIERvIG5vdCBjaGVjayBmb3IgaWRcbiAgICogICAgICAgIHNlbGVjdG9yIGFuZCBrZWVwIHdoaXRlc3BhY2UgaW4gdGhlIHN0cmluZy5cbiAgICogQHJldHVybiB7RG9jdW1lbnRGcmFnbWVudHx1bmRlZmluZWR9XG4gICAqL1xuXG4gIGZ1bmN0aW9uIHBhcnNlVGVtcGxhdGUodGVtcGxhdGUsIHNob3VsZENsb25lLCByYXcpIHtcbiAgICB2YXIgbm9kZSwgZnJhZztcblxuICAgIC8vIGlmIHRoZSB0ZW1wbGF0ZSBpcyBhbHJlYWR5IGEgZG9jdW1lbnQgZnJhZ21lbnQsXG4gICAgLy8gZG8gbm90aGluZ1xuICAgIGlmIChpc0ZyYWdtZW50KHRlbXBsYXRlKSkge1xuICAgICAgdHJpbU5vZGUodGVtcGxhdGUpO1xuICAgICAgcmV0dXJuIHNob3VsZENsb25lID8gY2xvbmVOb2RlKHRlbXBsYXRlKSA6IHRlbXBsYXRlO1xuICAgIH1cblxuICAgIGlmICh0eXBlb2YgdGVtcGxhdGUgPT09ICdzdHJpbmcnKSB7XG4gICAgICAvLyBpZCBzZWxlY3RvclxuICAgICAgaWYgKCFyYXcgJiYgdGVtcGxhdGUuY2hhckF0KDApID09PSAnIycpIHtcbiAgICAgICAgLy8gaWQgc2VsZWN0b3IgY2FuIGJlIGNhY2hlZCB0b29cbiAgICAgICAgZnJhZyA9IGlkU2VsZWN0b3JDYWNoZS5nZXQodGVtcGxhdGUpO1xuICAgICAgICBpZiAoIWZyYWcpIHtcbiAgICAgICAgICBub2RlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQodGVtcGxhdGUuc2xpY2UoMSkpO1xuICAgICAgICAgIGlmIChub2RlKSB7XG4gICAgICAgICAgICBmcmFnID0gbm9kZVRvRnJhZ21lbnQobm9kZSk7XG4gICAgICAgICAgICAvLyBzYXZlIHNlbGVjdG9yIHRvIGNhY2hlXG4gICAgICAgICAgICBpZFNlbGVjdG9yQ2FjaGUucHV0KHRlbXBsYXRlLCBmcmFnKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIG5vcm1hbCBzdHJpbmcgdGVtcGxhdGVcbiAgICAgICAgZnJhZyA9IHN0cmluZ1RvRnJhZ21lbnQodGVtcGxhdGUsIHJhdyk7XG4gICAgICB9XG4gICAgfSBlbHNlIGlmICh0ZW1wbGF0ZS5ub2RlVHlwZSkge1xuICAgICAgLy8gYSBkaXJlY3Qgbm9kZVxuICAgICAgZnJhZyA9IG5vZGVUb0ZyYWdtZW50KHRlbXBsYXRlKTtcbiAgICB9XG5cbiAgICByZXR1cm4gZnJhZyAmJiBzaG91bGRDbG9uZSA/IGNsb25lTm9kZShmcmFnKSA6IGZyYWc7XG4gIH1cblxudmFyIHRlbXBsYXRlID0gT2JqZWN0LmZyZWV6ZSh7XG4gICAgY2xvbmVOb2RlOiBjbG9uZU5vZGUsXG4gICAgcGFyc2VUZW1wbGF0ZTogcGFyc2VUZW1wbGF0ZVxuICB9KTtcblxuICB2YXIgaHRtbCA9IHtcblxuICAgIGJpbmQ6IGZ1bmN0aW9uIGJpbmQoKSB7XG4gICAgICAvLyBhIGNvbW1lbnQgbm9kZSBtZWFucyB0aGlzIGlzIGEgYmluZGluZyBmb3JcbiAgICAgIC8vIHt7eyBpbmxpbmUgdW5lc2NhcGVkIGh0bWwgfX19XG4gICAgICBpZiAodGhpcy5lbC5ub2RlVHlwZSA9PT0gOCkge1xuICAgICAgICAvLyBob2xkIG5vZGVzXG4gICAgICAgIHRoaXMubm9kZXMgPSBbXTtcbiAgICAgICAgLy8gcmVwbGFjZSB0aGUgcGxhY2Vob2xkZXIgd2l0aCBwcm9wZXIgYW5jaG9yXG4gICAgICAgIHRoaXMuYW5jaG9yID0gY3JlYXRlQW5jaG9yKCd2LWh0bWwnKTtcbiAgICAgICAgcmVwbGFjZSh0aGlzLmVsLCB0aGlzLmFuY2hvcik7XG4gICAgICB9XG4gICAgfSxcblxuICAgIHVwZGF0ZTogZnVuY3Rpb24gdXBkYXRlKHZhbHVlKSB7XG4gICAgICB2YWx1ZSA9IF90b1N0cmluZyh2YWx1ZSk7XG4gICAgICBpZiAodGhpcy5ub2Rlcykge1xuICAgICAgICB0aGlzLnN3YXAodmFsdWUpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5lbC5pbm5lckhUTUwgPSB2YWx1ZTtcbiAgICAgIH1cbiAgICB9LFxuXG4gICAgc3dhcDogZnVuY3Rpb24gc3dhcCh2YWx1ZSkge1xuICAgICAgLy8gcmVtb3ZlIG9sZCBub2Rlc1xuICAgICAgdmFyIGkgPSB0aGlzLm5vZGVzLmxlbmd0aDtcbiAgICAgIHdoaWxlIChpLS0pIHtcbiAgICAgICAgcmVtb3ZlKHRoaXMubm9kZXNbaV0pO1xuICAgICAgfVxuICAgICAgLy8gY29udmVydCBuZXcgdmFsdWUgdG8gYSBmcmFnbWVudFxuICAgICAgLy8gZG8gbm90IGF0dGVtcHQgdG8gcmV0cmlldmUgZnJvbSBpZCBzZWxlY3RvclxuICAgICAgdmFyIGZyYWcgPSBwYXJzZVRlbXBsYXRlKHZhbHVlLCB0cnVlLCB0cnVlKTtcbiAgICAgIC8vIHNhdmUgYSByZWZlcmVuY2UgdG8gdGhlc2Ugbm9kZXMgc28gd2UgY2FuIHJlbW92ZSBsYXRlclxuICAgICAgdGhpcy5ub2RlcyA9IHRvQXJyYXkoZnJhZy5jaGlsZE5vZGVzKTtcbiAgICAgIGJlZm9yZShmcmFnLCB0aGlzLmFuY2hvcik7XG4gICAgfVxuICB9O1xuXG4gIC8qKlxuICAgKiBBYnN0cmFjdGlvbiBmb3IgYSBwYXJ0aWFsbHktY29tcGlsZWQgZnJhZ21lbnQuXG4gICAqIENhbiBvcHRpb25hbGx5IGNvbXBpbGUgY29udGVudCB3aXRoIGEgY2hpbGQgc2NvcGUuXG4gICAqXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IGxpbmtlclxuICAgKiBAcGFyYW0ge1Z1ZX0gdm1cbiAgICogQHBhcmFtIHtEb2N1bWVudEZyYWdtZW50fSBmcmFnXG4gICAqIEBwYXJhbSB7VnVlfSBbaG9zdF1cbiAgICogQHBhcmFtIHtPYmplY3R9IFtzY29wZV1cbiAgICogQHBhcmFtIHtGcmFnbWVudH0gW3BhcmVudEZyYWddXG4gICAqL1xuICBmdW5jdGlvbiBGcmFnbWVudChsaW5rZXIsIHZtLCBmcmFnLCBob3N0LCBzY29wZSwgcGFyZW50RnJhZykge1xuICAgIHRoaXMuY2hpbGRyZW4gPSBbXTtcbiAgICB0aGlzLmNoaWxkRnJhZ3MgPSBbXTtcbiAgICB0aGlzLnZtID0gdm07XG4gICAgdGhpcy5zY29wZSA9IHNjb3BlO1xuICAgIHRoaXMuaW5zZXJ0ZWQgPSBmYWxzZTtcbiAgICB0aGlzLnBhcmVudEZyYWcgPSBwYXJlbnRGcmFnO1xuICAgIGlmIChwYXJlbnRGcmFnKSB7XG4gICAgICBwYXJlbnRGcmFnLmNoaWxkRnJhZ3MucHVzaCh0aGlzKTtcbiAgICB9XG4gICAgdGhpcy51bmxpbmsgPSBsaW5rZXIodm0sIGZyYWcsIGhvc3QsIHNjb3BlLCB0aGlzKTtcbiAgICB2YXIgc2luZ2xlID0gdGhpcy5zaW5nbGUgPSBmcmFnLmNoaWxkTm9kZXMubGVuZ3RoID09PSAxICYmXG4gICAgLy8gZG8gbm90IGdvIHNpbmdsZSBtb2RlIGlmIHRoZSBvbmx5IG5vZGUgaXMgYW4gYW5jaG9yXG4gICAgIWZyYWcuY2hpbGROb2Rlc1swXS5fX3ZfYW5jaG9yO1xuICAgIGlmIChzaW5nbGUpIHtcbiAgICAgIHRoaXMubm9kZSA9IGZyYWcuY2hpbGROb2Rlc1swXTtcbiAgICAgIHRoaXMuYmVmb3JlID0gc2luZ2xlQmVmb3JlO1xuICAgICAgdGhpcy5yZW1vdmUgPSBzaW5nbGVSZW1vdmU7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMubm9kZSA9IGNyZWF0ZUFuY2hvcignZnJhZ21lbnQtc3RhcnQnKTtcbiAgICAgIHRoaXMuZW5kID0gY3JlYXRlQW5jaG9yKCdmcmFnbWVudC1lbmQnKTtcbiAgICAgIHRoaXMuZnJhZyA9IGZyYWc7XG4gICAgICBwcmVwZW5kKHRoaXMubm9kZSwgZnJhZyk7XG4gICAgICBmcmFnLmFwcGVuZENoaWxkKHRoaXMuZW5kKTtcbiAgICAgIHRoaXMuYmVmb3JlID0gbXVsdGlCZWZvcmU7XG4gICAgICB0aGlzLnJlbW92ZSA9IG11bHRpUmVtb3ZlO1xuICAgIH1cbiAgICB0aGlzLm5vZGUuX192X2ZyYWcgPSB0aGlzO1xuICB9XG5cbiAgLyoqXG4gICAqIENhbGwgYXR0YWNoL2RldGFjaCBmb3IgYWxsIGNvbXBvbmVudHMgY29udGFpbmVkIHdpdGhpblxuICAgKiB0aGlzIGZyYWdtZW50LiBBbHNvIGRvIHNvIHJlY3Vyc2l2ZWx5IGZvciBhbGwgY2hpbGRcbiAgICogZnJhZ21lbnRzLlxuICAgKlxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBob29rXG4gICAqL1xuXG4gIEZyYWdtZW50LnByb3RvdHlwZS5jYWxsSG9vayA9IGZ1bmN0aW9uIChob29rKSB7XG4gICAgdmFyIGksIGw7XG4gICAgZm9yIChpID0gMCwgbCA9IHRoaXMuY2hpbGRGcmFncy5sZW5ndGg7IGkgPCBsOyBpKyspIHtcbiAgICAgIHRoaXMuY2hpbGRGcmFnc1tpXS5jYWxsSG9vayhob29rKTtcbiAgICB9XG4gICAgZm9yIChpID0gMCwgbCA9IHRoaXMuY2hpbGRyZW4ubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG4gICAgICBob29rKHRoaXMuY2hpbGRyZW5baV0pO1xuICAgIH1cbiAgfTtcblxuICAvKipcbiAgICogSW5zZXJ0IGZyYWdtZW50IGJlZm9yZSB0YXJnZXQsIHNpbmdsZSBub2RlIHZlcnNpb25cbiAgICpcbiAgICogQHBhcmFtIHtOb2RlfSB0YXJnZXRcbiAgICogQHBhcmFtIHtCb29sZWFufSB3aXRoVHJhbnNpdGlvblxuICAgKi9cblxuICBmdW5jdGlvbiBzaW5nbGVCZWZvcmUodGFyZ2V0LCB3aXRoVHJhbnNpdGlvbikge1xuICAgIHRoaXMuaW5zZXJ0ZWQgPSB0cnVlO1xuICAgIHZhciBtZXRob2QgPSB3aXRoVHJhbnNpdGlvbiAhPT0gZmFsc2UgPyBiZWZvcmVXaXRoVHJhbnNpdGlvbiA6IGJlZm9yZTtcbiAgICBtZXRob2QodGhpcy5ub2RlLCB0YXJnZXQsIHRoaXMudm0pO1xuICAgIGlmIChpbkRvYyh0aGlzLm5vZGUpKSB7XG4gICAgICB0aGlzLmNhbGxIb29rKGF0dGFjaCk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFJlbW92ZSBmcmFnbWVudCwgc2luZ2xlIG5vZGUgdmVyc2lvblxuICAgKi9cblxuICBmdW5jdGlvbiBzaW5nbGVSZW1vdmUoKSB7XG4gICAgdGhpcy5pbnNlcnRlZCA9IGZhbHNlO1xuICAgIHZhciBzaG91bGRDYWxsUmVtb3ZlID0gaW5Eb2ModGhpcy5ub2RlKTtcbiAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgdGhpcy5iZWZvcmVSZW1vdmUoKTtcbiAgICByZW1vdmVXaXRoVHJhbnNpdGlvbih0aGlzLm5vZGUsIHRoaXMudm0sIGZ1bmN0aW9uICgpIHtcbiAgICAgIGlmIChzaG91bGRDYWxsUmVtb3ZlKSB7XG4gICAgICAgIHNlbGYuY2FsbEhvb2soZGV0YWNoKTtcbiAgICAgIH1cbiAgICAgIHNlbGYuZGVzdHJveSgpO1xuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIEluc2VydCBmcmFnbWVudCBiZWZvcmUgdGFyZ2V0LCBtdWx0aS1ub2RlcyB2ZXJzaW9uXG4gICAqXG4gICAqIEBwYXJhbSB7Tm9kZX0gdGFyZ2V0XG4gICAqIEBwYXJhbSB7Qm9vbGVhbn0gd2l0aFRyYW5zaXRpb25cbiAgICovXG5cbiAgZnVuY3Rpb24gbXVsdGlCZWZvcmUodGFyZ2V0LCB3aXRoVHJhbnNpdGlvbikge1xuICAgIHRoaXMuaW5zZXJ0ZWQgPSB0cnVlO1xuICAgIHZhciB2bSA9IHRoaXMudm07XG4gICAgdmFyIG1ldGhvZCA9IHdpdGhUcmFuc2l0aW9uICE9PSBmYWxzZSA/IGJlZm9yZVdpdGhUcmFuc2l0aW9uIDogYmVmb3JlO1xuICAgIG1hcE5vZGVSYW5nZSh0aGlzLm5vZGUsIHRoaXMuZW5kLCBmdW5jdGlvbiAobm9kZSkge1xuICAgICAgbWV0aG9kKG5vZGUsIHRhcmdldCwgdm0pO1xuICAgIH0pO1xuICAgIGlmIChpbkRvYyh0aGlzLm5vZGUpKSB7XG4gICAgICB0aGlzLmNhbGxIb29rKGF0dGFjaCk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFJlbW92ZSBmcmFnbWVudCwgbXVsdGktbm9kZXMgdmVyc2lvblxuICAgKi9cblxuICBmdW5jdGlvbiBtdWx0aVJlbW92ZSgpIHtcbiAgICB0aGlzLmluc2VydGVkID0gZmFsc2U7XG4gICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgIHZhciBzaG91bGRDYWxsUmVtb3ZlID0gaW5Eb2ModGhpcy5ub2RlKTtcbiAgICB0aGlzLmJlZm9yZVJlbW92ZSgpO1xuICAgIHJlbW92ZU5vZGVSYW5nZSh0aGlzLm5vZGUsIHRoaXMuZW5kLCB0aGlzLnZtLCB0aGlzLmZyYWcsIGZ1bmN0aW9uICgpIHtcbiAgICAgIGlmIChzaG91bGRDYWxsUmVtb3ZlKSB7XG4gICAgICAgIHNlbGYuY2FsbEhvb2soZGV0YWNoKTtcbiAgICAgIH1cbiAgICAgIHNlbGYuZGVzdHJveSgpO1xuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIFByZXBhcmUgdGhlIGZyYWdtZW50IGZvciByZW1vdmFsLlxuICAgKi9cblxuICBGcmFnbWVudC5wcm90b3R5cGUuYmVmb3JlUmVtb3ZlID0gZnVuY3Rpb24gKCkge1xuICAgIHZhciBpLCBsO1xuICAgIGZvciAoaSA9IDAsIGwgPSB0aGlzLmNoaWxkRnJhZ3MubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG4gICAgICAvLyBjYWxsIHRoZSBzYW1lIG1ldGhvZCByZWN1cnNpdmVseSBvbiBjaGlsZFxuICAgICAgLy8gZnJhZ21lbnRzLCBkZXB0aC1maXJzdFxuICAgICAgdGhpcy5jaGlsZEZyYWdzW2ldLmJlZm9yZVJlbW92ZShmYWxzZSk7XG4gICAgfVxuICAgIGZvciAoaSA9IDAsIGwgPSB0aGlzLmNoaWxkcmVuLmxlbmd0aDsgaSA8IGw7IGkrKykge1xuICAgICAgLy8gQ2FsbCBkZXN0cm95IGZvciBhbGwgY29udGFpbmVkIGluc3RhbmNlcyxcbiAgICAgIC8vIHdpdGggcmVtb3ZlOmZhbHNlIGFuZCBkZWZlcjp0cnVlLlxuICAgICAgLy8gRGVmZXIgaXMgbmVjZXNzYXJ5IGJlY2F1c2Ugd2UgbmVlZCB0b1xuICAgICAgLy8ga2VlcCB0aGUgY2hpbGRyZW4gdG8gY2FsbCBkZXRhY2ggaG9va3NcbiAgICAgIC8vIG9uIHRoZW0uXG4gICAgICB0aGlzLmNoaWxkcmVuW2ldLiRkZXN0cm95KGZhbHNlLCB0cnVlKTtcbiAgICB9XG4gICAgdmFyIGRpcnMgPSB0aGlzLnVubGluay5kaXJzO1xuICAgIGZvciAoaSA9IDAsIGwgPSBkaXJzLmxlbmd0aDsgaSA8IGw7IGkrKykge1xuICAgICAgLy8gZGlzYWJsZSB0aGUgd2F0Y2hlcnMgb24gYWxsIHRoZSBkaXJlY3RpdmVzXG4gICAgICAvLyBzbyB0aGF0IHRoZSByZW5kZXJlZCBjb250ZW50IHN0YXlzIHRoZSBzYW1lXG4gICAgICAvLyBkdXJpbmcgcmVtb3ZhbC5cbiAgICAgIGRpcnNbaV0uX3dhdGNoZXIgJiYgZGlyc1tpXS5fd2F0Y2hlci50ZWFyZG93bigpO1xuICAgIH1cbiAgfTtcblxuICAvKipcbiAgICogRGVzdHJveSB0aGUgZnJhZ21lbnQuXG4gICAqL1xuXG4gIEZyYWdtZW50LnByb3RvdHlwZS5kZXN0cm95ID0gZnVuY3Rpb24gKCkge1xuICAgIGlmICh0aGlzLnBhcmVudEZyYWcpIHtcbiAgICAgIHRoaXMucGFyZW50RnJhZy5jaGlsZEZyYWdzLiRyZW1vdmUodGhpcyk7XG4gICAgfVxuICAgIHRoaXMubm9kZS5fX3ZfZnJhZyA9IG51bGw7XG4gICAgdGhpcy51bmxpbmsoKTtcbiAgfTtcblxuICAvKipcbiAgICogQ2FsbCBhdHRhY2ggaG9vayBmb3IgYSBWdWUgaW5zdGFuY2UuXG4gICAqXG4gICAqIEBwYXJhbSB7VnVlfSBjaGlsZFxuICAgKi9cblxuICBmdW5jdGlvbiBhdHRhY2goY2hpbGQpIHtcbiAgICBpZiAoIWNoaWxkLl9pc0F0dGFjaGVkICYmIGluRG9jKGNoaWxkLiRlbCkpIHtcbiAgICAgIGNoaWxkLl9jYWxsSG9vaygnYXR0YWNoZWQnKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQ2FsbCBkZXRhY2ggaG9vayBmb3IgYSBWdWUgaW5zdGFuY2UuXG4gICAqXG4gICAqIEBwYXJhbSB7VnVlfSBjaGlsZFxuICAgKi9cblxuICBmdW5jdGlvbiBkZXRhY2goY2hpbGQpIHtcbiAgICBpZiAoY2hpbGQuX2lzQXR0YWNoZWQgJiYgIWluRG9jKGNoaWxkLiRlbCkpIHtcbiAgICAgIGNoaWxkLl9jYWxsSG9vaygnZGV0YWNoZWQnKTtcbiAgICB9XG4gIH1cblxuICB2YXIgbGlua2VyQ2FjaGUgPSBuZXcgQ2FjaGUoNTAwMCk7XG5cbiAgLyoqXG4gICAqIEEgZmFjdG9yeSB0aGF0IGNhbiBiZSB1c2VkIHRvIGNyZWF0ZSBpbnN0YW5jZXMgb2YgYVxuICAgKiBmcmFnbWVudC4gQ2FjaGVzIHRoZSBjb21waWxlZCBsaW5rZXIgaWYgcG9zc2libGUuXG4gICAqXG4gICAqIEBwYXJhbSB7VnVlfSB2bVxuICAgKiBAcGFyYW0ge0VsZW1lbnR8U3RyaW5nfSBlbFxuICAgKi9cbiAgZnVuY3Rpb24gRnJhZ21lbnRGYWN0b3J5KHZtLCBlbCkge1xuICAgIHRoaXMudm0gPSB2bTtcbiAgICB2YXIgdGVtcGxhdGU7XG4gICAgdmFyIGlzU3RyaW5nID0gdHlwZW9mIGVsID09PSAnc3RyaW5nJztcbiAgICBpZiAoaXNTdHJpbmcgfHwgaXNUZW1wbGF0ZShlbCkgJiYgIWVsLmhhc0F0dHJpYnV0ZSgndi1pZicpKSB7XG4gICAgICB0ZW1wbGF0ZSA9IHBhcnNlVGVtcGxhdGUoZWwsIHRydWUpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0ZW1wbGF0ZSA9IGRvY3VtZW50LmNyZWF0ZURvY3VtZW50RnJhZ21lbnQoKTtcbiAgICAgIHRlbXBsYXRlLmFwcGVuZENoaWxkKGVsKTtcbiAgICB9XG4gICAgdGhpcy50ZW1wbGF0ZSA9IHRlbXBsYXRlO1xuICAgIC8vIGxpbmtlciBjYW4gYmUgY2FjaGVkLCBidXQgb25seSBmb3IgY29tcG9uZW50c1xuICAgIHZhciBsaW5rZXI7XG4gICAgdmFyIGNpZCA9IHZtLmNvbnN0cnVjdG9yLmNpZDtcbiAgICBpZiAoY2lkID4gMCkge1xuICAgICAgdmFyIGNhY2hlSWQgPSBjaWQgKyAoaXNTdHJpbmcgPyBlbCA6IGdldE91dGVySFRNTChlbCkpO1xuICAgICAgbGlua2VyID0gbGlua2VyQ2FjaGUuZ2V0KGNhY2hlSWQpO1xuICAgICAgaWYgKCFsaW5rZXIpIHtcbiAgICAgICAgbGlua2VyID0gY29tcGlsZSh0ZW1wbGF0ZSwgdm0uJG9wdGlvbnMsIHRydWUpO1xuICAgICAgICBsaW5rZXJDYWNoZS5wdXQoY2FjaGVJZCwgbGlua2VyKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgbGlua2VyID0gY29tcGlsZSh0ZW1wbGF0ZSwgdm0uJG9wdGlvbnMsIHRydWUpO1xuICAgIH1cbiAgICB0aGlzLmxpbmtlciA9IGxpbmtlcjtcbiAgfVxuXG4gIC8qKlxuICAgKiBDcmVhdGUgYSBmcmFnbWVudCBpbnN0YW5jZSB3aXRoIGdpdmVuIGhvc3QgYW5kIHNjb3BlLlxuICAgKlxuICAgKiBAcGFyYW0ge1Z1ZX0gaG9zdFxuICAgKiBAcGFyYW0ge09iamVjdH0gc2NvcGVcbiAgICogQHBhcmFtIHtGcmFnbWVudH0gcGFyZW50RnJhZ1xuICAgKi9cblxuICBGcmFnbWVudEZhY3RvcnkucHJvdG90eXBlLmNyZWF0ZSA9IGZ1bmN0aW9uIChob3N0LCBzY29wZSwgcGFyZW50RnJhZykge1xuICAgIHZhciBmcmFnID0gY2xvbmVOb2RlKHRoaXMudGVtcGxhdGUpO1xuICAgIHJldHVybiBuZXcgRnJhZ21lbnQodGhpcy5saW5rZXIsIHRoaXMudm0sIGZyYWcsIGhvc3QsIHNjb3BlLCBwYXJlbnRGcmFnKTtcbiAgfTtcblxuICB2YXIgT04gPSA3MDA7XG4gIHZhciBNT0RFTCA9IDgwMDtcbiAgdmFyIEJJTkQgPSA4NTA7XG4gIHZhciBUUkFOU0lUSU9OID0gMTEwMDtcbiAgdmFyIEVMID0gMTUwMDtcbiAgdmFyIENPTVBPTkVOVCA9IDE1MDA7XG4gIHZhciBQQVJUSUFMID0gMTc1MDtcbiAgdmFyIElGID0gMjEwMDtcbiAgdmFyIEZPUiA9IDIyMDA7XG4gIHZhciBTTE9UID0gMjMwMDtcblxuICB2YXIgdWlkJDMgPSAwO1xuXG4gIHZhciB2Rm9yID0ge1xuXG4gICAgcHJpb3JpdHk6IEZPUixcbiAgICB0ZXJtaW5hbDogdHJ1ZSxcblxuICAgIHBhcmFtczogWyd0cmFjay1ieScsICdzdGFnZ2VyJywgJ2VudGVyLXN0YWdnZXInLCAnbGVhdmUtc3RhZ2dlciddLFxuXG4gICAgYmluZDogZnVuY3Rpb24gYmluZCgpIHtcbiAgICAgIC8vIHN1cHBvcnQgXCJpdGVtIGluL29mIGl0ZW1zXCIgc3ludGF4XG4gICAgICB2YXIgaW5NYXRjaCA9IHRoaXMuZXhwcmVzc2lvbi5tYXRjaCgvKC4qKSAoPzppbnxvZikgKC4qKS8pO1xuICAgICAgaWYgKGluTWF0Y2gpIHtcbiAgICAgICAgdmFyIGl0TWF0Y2ggPSBpbk1hdGNoWzFdLm1hdGNoKC9cXCgoLiopLCguKilcXCkvKTtcbiAgICAgICAgaWYgKGl0TWF0Y2gpIHtcbiAgICAgICAgICB0aGlzLml0ZXJhdG9yID0gaXRNYXRjaFsxXS50cmltKCk7XG4gICAgICAgICAgdGhpcy5hbGlhcyA9IGl0TWF0Y2hbMl0udHJpbSgpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRoaXMuYWxpYXMgPSBpbk1hdGNoWzFdLnRyaW0oKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmV4cHJlc3Npb24gPSBpbk1hdGNoWzJdO1xuICAgICAgfVxuXG4gICAgICBpZiAoIXRoaXMuYWxpYXMpIHtcbiAgICAgICAgJ2RldmVsb3BtZW50JyAhPT0gJ3Byb2R1Y3Rpb24nICYmIHdhcm4oJ0ludmFsaWQgdi1mb3IgZXhwcmVzc2lvbiBcIicgKyB0aGlzLmRlc2NyaXB0b3IucmF3ICsgJ1wiOiAnICsgJ2FsaWFzIGlzIHJlcXVpcmVkLicsIHRoaXMudm0pO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIC8vIHVpZCBhcyBhIGNhY2hlIGlkZW50aWZpZXJcbiAgICAgIHRoaXMuaWQgPSAnX192LWZvcl9fJyArICsrdWlkJDM7XG5cbiAgICAgIC8vIGNoZWNrIGlmIHRoaXMgaXMgYW4gb3B0aW9uIGxpc3QsXG4gICAgICAvLyBzbyB0aGF0IHdlIGtub3cgaWYgd2UgbmVlZCB0byB1cGRhdGUgdGhlIDxzZWxlY3Q+J3NcbiAgICAgIC8vIHYtbW9kZWwgd2hlbiB0aGUgb3B0aW9uIGxpc3QgaGFzIGNoYW5nZWQuXG4gICAgICAvLyBiZWNhdXNlIHYtbW9kZWwgaGFzIGEgbG93ZXIgcHJpb3JpdHkgdGhhbiB2LWZvcixcbiAgICAgIC8vIHRoZSB2LW1vZGVsIGlzIG5vdCBib3VuZCBoZXJlIHlldCwgc28gd2UgaGF2ZSB0b1xuICAgICAgLy8gcmV0cml2ZSBpdCBpbiB0aGUgYWN0dWFsIHVwZGF0ZU1vZGVsKCkgZnVuY3Rpb24uXG4gICAgICB2YXIgdGFnID0gdGhpcy5lbC50YWdOYW1lO1xuICAgICAgdGhpcy5pc09wdGlvbiA9ICh0YWcgPT09ICdPUFRJT04nIHx8IHRhZyA9PT0gJ09QVEdST1VQJykgJiYgdGhpcy5lbC5wYXJlbnROb2RlLnRhZ05hbWUgPT09ICdTRUxFQ1QnO1xuXG4gICAgICAvLyBzZXR1cCBhbmNob3Igbm9kZXNcbiAgICAgIHRoaXMuc3RhcnQgPSBjcmVhdGVBbmNob3IoJ3YtZm9yLXN0YXJ0Jyk7XG4gICAgICB0aGlzLmVuZCA9IGNyZWF0ZUFuY2hvcigndi1mb3ItZW5kJyk7XG4gICAgICByZXBsYWNlKHRoaXMuZWwsIHRoaXMuZW5kKTtcbiAgICAgIGJlZm9yZSh0aGlzLnN0YXJ0LCB0aGlzLmVuZCk7XG5cbiAgICAgIC8vIGNhY2hlXG4gICAgICB0aGlzLmNhY2hlID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcblxuICAgICAgLy8gZnJhZ21lbnQgZmFjdG9yeVxuICAgICAgdGhpcy5mYWN0b3J5ID0gbmV3IEZyYWdtZW50RmFjdG9yeSh0aGlzLnZtLCB0aGlzLmVsKTtcbiAgICB9LFxuXG4gICAgdXBkYXRlOiBmdW5jdGlvbiB1cGRhdGUoZGF0YSkge1xuICAgICAgdGhpcy5kaWZmKGRhdGEpO1xuICAgICAgdGhpcy51cGRhdGVSZWYoKTtcbiAgICAgIHRoaXMudXBkYXRlTW9kZWwoKTtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogRGlmZiwgYmFzZWQgb24gbmV3IGRhdGEgYW5kIG9sZCBkYXRhLCBkZXRlcm1pbmUgdGhlXG4gICAgICogbWluaW11bSBhbW91bnQgb2YgRE9NIG1hbmlwdWxhdGlvbnMgbmVlZGVkIHRvIG1ha2UgdGhlXG4gICAgICogRE9NIHJlZmxlY3QgdGhlIG5ldyBkYXRhIEFycmF5LlxuICAgICAqXG4gICAgICogVGhlIGFsZ29yaXRobSBkaWZmcyB0aGUgbmV3IGRhdGEgQXJyYXkgYnkgc3RvcmluZyBhXG4gICAgICogaGlkZGVuIHJlZmVyZW5jZSB0byBhbiBvd25lciB2bSBpbnN0YW5jZSBvbiBwcmV2aW91c2x5XG4gICAgICogc2VlbiBkYXRhLiBUaGlzIGFsbG93cyB1cyB0byBhY2hpZXZlIE8obikgd2hpY2ggaXNcbiAgICAgKiBiZXR0ZXIgdGhhbiBhIGxldmVuc2h0ZWluIGRpc3RhbmNlIGJhc2VkIGFsZ29yaXRobSxcbiAgICAgKiB3aGljaCBpcyBPKG0gKiBuKS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7QXJyYXl9IGRhdGFcbiAgICAgKi9cblxuICAgIGRpZmY6IGZ1bmN0aW9uIGRpZmYoZGF0YSkge1xuICAgICAgLy8gY2hlY2sgaWYgdGhlIEFycmF5IHdhcyBjb252ZXJ0ZWQgZnJvbSBhbiBPYmplY3RcbiAgICAgIHZhciBpdGVtID0gZGF0YVswXTtcbiAgICAgIHZhciBjb252ZXJ0ZWRGcm9tT2JqZWN0ID0gdGhpcy5mcm9tT2JqZWN0ID0gaXNPYmplY3QoaXRlbSkgJiYgaGFzT3duKGl0ZW0sICcka2V5JykgJiYgaGFzT3duKGl0ZW0sICckdmFsdWUnKTtcblxuICAgICAgdmFyIHRyYWNrQnlLZXkgPSB0aGlzLnBhcmFtcy50cmFja0J5O1xuICAgICAgdmFyIG9sZEZyYWdzID0gdGhpcy5mcmFncztcbiAgICAgIHZhciBmcmFncyA9IHRoaXMuZnJhZ3MgPSBuZXcgQXJyYXkoZGF0YS5sZW5ndGgpO1xuICAgICAgdmFyIGFsaWFzID0gdGhpcy5hbGlhcztcbiAgICAgIHZhciBpdGVyYXRvciA9IHRoaXMuaXRlcmF0b3I7XG4gICAgICB2YXIgc3RhcnQgPSB0aGlzLnN0YXJ0O1xuICAgICAgdmFyIGVuZCA9IHRoaXMuZW5kO1xuICAgICAgdmFyIGluRG9jdW1lbnQgPSBpbkRvYyhzdGFydCk7XG4gICAgICB2YXIgaW5pdCA9ICFvbGRGcmFncztcbiAgICAgIHZhciBpLCBsLCBmcmFnLCBrZXksIHZhbHVlLCBwcmltaXRpdmU7XG5cbiAgICAgIC8vIEZpcnN0IHBhc3MsIGdvIHRocm91Z2ggdGhlIG5ldyBBcnJheSBhbmQgZmlsbCB1cFxuICAgICAgLy8gdGhlIG5ldyBmcmFncyBhcnJheS4gSWYgYSBwaWVjZSBvZiBkYXRhIGhhcyBhIGNhY2hlZFxuICAgICAgLy8gaW5zdGFuY2UgZm9yIGl0LCB3ZSByZXVzZSBpdC4gT3RoZXJ3aXNlIGJ1aWxkIGEgbmV3XG4gICAgICAvLyBpbnN0YW5jZS5cbiAgICAgIGZvciAoaSA9IDAsIGwgPSBkYXRhLmxlbmd0aDsgaSA8IGw7IGkrKykge1xuICAgICAgICBpdGVtID0gZGF0YVtpXTtcbiAgICAgICAga2V5ID0gY29udmVydGVkRnJvbU9iamVjdCA/IGl0ZW0uJGtleSA6IG51bGw7XG4gICAgICAgIHZhbHVlID0gY29udmVydGVkRnJvbU9iamVjdCA/IGl0ZW0uJHZhbHVlIDogaXRlbTtcbiAgICAgICAgcHJpbWl0aXZlID0gIWlzT2JqZWN0KHZhbHVlKTtcbiAgICAgICAgZnJhZyA9ICFpbml0ICYmIHRoaXMuZ2V0Q2FjaGVkRnJhZyh2YWx1ZSwgaSwga2V5KTtcbiAgICAgICAgaWYgKGZyYWcpIHtcbiAgICAgICAgICAvLyByZXVzYWJsZSBmcmFnbWVudFxuICAgICAgICAgIGZyYWcucmV1c2VkID0gdHJ1ZTtcbiAgICAgICAgICAvLyB1cGRhdGUgJGluZGV4XG4gICAgICAgICAgZnJhZy5zY29wZS4kaW5kZXggPSBpO1xuICAgICAgICAgIC8vIHVwZGF0ZSAka2V5XG4gICAgICAgICAgaWYgKGtleSkge1xuICAgICAgICAgICAgZnJhZy5zY29wZS4ka2V5ID0ga2V5O1xuICAgICAgICAgIH1cbiAgICAgICAgICAvLyB1cGRhdGUgaXRlcmF0b3JcbiAgICAgICAgICBpZiAoaXRlcmF0b3IpIHtcbiAgICAgICAgICAgIGZyYWcuc2NvcGVbaXRlcmF0b3JdID0ga2V5ICE9PSBudWxsID8ga2V5IDogaTtcbiAgICAgICAgICB9XG4gICAgICAgICAgLy8gdXBkYXRlIGRhdGEgZm9yIHRyYWNrLWJ5LCBvYmplY3QgcmVwZWF0ICZcbiAgICAgICAgICAvLyBwcmltaXRpdmUgdmFsdWVzLlxuICAgICAgICAgIGlmICh0cmFja0J5S2V5IHx8IGNvbnZlcnRlZEZyb21PYmplY3QgfHwgcHJpbWl0aXZlKSB7XG4gICAgICAgICAgICB3aXRob3V0Q29udmVyc2lvbihmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgIGZyYWcuc2NvcGVbYWxpYXNdID0gdmFsdWU7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgLy8gbmV3IGlzbnRhbmNlXG4gICAgICAgICAgZnJhZyA9IHRoaXMuY3JlYXRlKHZhbHVlLCBhbGlhcywgaSwga2V5KTtcbiAgICAgICAgICBmcmFnLmZyZXNoID0gIWluaXQ7XG4gICAgICAgIH1cbiAgICAgICAgZnJhZ3NbaV0gPSBmcmFnO1xuICAgICAgICBpZiAoaW5pdCkge1xuICAgICAgICAgIGZyYWcuYmVmb3JlKGVuZCk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgLy8gd2UncmUgZG9uZSBmb3IgdGhlIGluaXRpYWwgcmVuZGVyLlxuICAgICAgaWYgKGluaXQpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICAvLyBTZWNvbmQgcGFzcywgZ28gdGhyb3VnaCB0aGUgb2xkIGZyYWdtZW50cyBhbmRcbiAgICAgIC8vIGRlc3Ryb3kgdGhvc2Ugd2hvIGFyZSBub3QgcmV1c2VkIChhbmQgcmVtb3ZlIHRoZW1cbiAgICAgIC8vIGZyb20gY2FjaGUpXG4gICAgICB2YXIgcmVtb3ZhbEluZGV4ID0gMDtcbiAgICAgIHZhciB0b3RhbFJlbW92ZWQgPSBvbGRGcmFncy5sZW5ndGggLSBmcmFncy5sZW5ndGg7XG4gICAgICAvLyB3aGVuIHJlbW92aW5nIGEgbGFyZ2UgbnVtYmVyIG9mIGZyYWdtZW50cywgd2F0Y2hlciByZW1vdmFsXG4gICAgICAvLyB0dXJucyBvdXQgdG8gYmUgYSBwZXJmIGJvdHRsZW5lY2ssIHNvIHdlIGJhdGNoIHRoZSB3YXRjaGVyXG4gICAgICAvLyByZW1vdmFscyBpbnRvIGEgc2luZ2xlIGZpbHRlciBjYWxsIVxuICAgICAgdGhpcy52bS5fdkZvclJlbW92aW5nID0gdHJ1ZTtcbiAgICAgIGZvciAoaSA9IDAsIGwgPSBvbGRGcmFncy5sZW5ndGg7IGkgPCBsOyBpKyspIHtcbiAgICAgICAgZnJhZyA9IG9sZEZyYWdzW2ldO1xuICAgICAgICBpZiAoIWZyYWcucmV1c2VkKSB7XG4gICAgICAgICAgdGhpcy5kZWxldGVDYWNoZWRGcmFnKGZyYWcpO1xuICAgICAgICAgIHRoaXMucmVtb3ZlKGZyYWcsIHJlbW92YWxJbmRleCsrLCB0b3RhbFJlbW92ZWQsIGluRG9jdW1lbnQpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICB0aGlzLnZtLl92Rm9yUmVtb3ZpbmcgPSBmYWxzZTtcbiAgICAgIGlmIChyZW1vdmFsSW5kZXgpIHtcbiAgICAgICAgdGhpcy52bS5fd2F0Y2hlcnMgPSB0aGlzLnZtLl93YXRjaGVycy5maWx0ZXIoZnVuY3Rpb24gKHcpIHtcbiAgICAgICAgICByZXR1cm4gdy5hY3RpdmU7XG4gICAgICAgIH0pO1xuICAgICAgfVxuXG4gICAgICAvLyBGaW5hbCBwYXNzLCBtb3ZlL2luc2VydCBuZXcgZnJhZ21lbnRzIGludG8gdGhlXG4gICAgICAvLyByaWdodCBwbGFjZS5cbiAgICAgIHZhciB0YXJnZXRQcmV2LCBwcmV2RWwsIGN1cnJlbnRQcmV2O1xuICAgICAgdmFyIGluc2VydGlvbkluZGV4ID0gMDtcbiAgICAgIGZvciAoaSA9IDAsIGwgPSBmcmFncy5sZW5ndGg7IGkgPCBsOyBpKyspIHtcbiAgICAgICAgZnJhZyA9IGZyYWdzW2ldO1xuICAgICAgICAvLyB0aGlzIGlzIHRoZSBmcmFnIHRoYXQgd2Ugc2hvdWxkIGJlIGFmdGVyXG4gICAgICAgIHRhcmdldFByZXYgPSBmcmFnc1tpIC0gMV07XG4gICAgICAgIHByZXZFbCA9IHRhcmdldFByZXYgPyB0YXJnZXRQcmV2LnN0YWdnZXJDYiA/IHRhcmdldFByZXYuc3RhZ2dlckFuY2hvciA6IHRhcmdldFByZXYuZW5kIHx8IHRhcmdldFByZXYubm9kZSA6IHN0YXJ0O1xuICAgICAgICBpZiAoZnJhZy5yZXVzZWQgJiYgIWZyYWcuc3RhZ2dlckNiKSB7XG4gICAgICAgICAgY3VycmVudFByZXYgPSBmaW5kUHJldkZyYWcoZnJhZywgc3RhcnQsIHRoaXMuaWQpO1xuICAgICAgICAgIGlmIChjdXJyZW50UHJldiAhPT0gdGFyZ2V0UHJldiAmJiAoIWN1cnJlbnRQcmV2IHx8XG4gICAgICAgICAgLy8gb3B0aW1pemF0aW9uIGZvciBtb3ZpbmcgYSBzaW5nbGUgaXRlbS5cbiAgICAgICAgICAvLyB0aGFua3MgdG8gc3VnZ2VzdGlvbnMgYnkgQGxpdm9yYXMgaW4gIzE4MDdcbiAgICAgICAgICBmaW5kUHJldkZyYWcoY3VycmVudFByZXYsIHN0YXJ0LCB0aGlzLmlkKSAhPT0gdGFyZ2V0UHJldikpIHtcbiAgICAgICAgICAgIHRoaXMubW92ZShmcmFnLCBwcmV2RWwpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAvLyBuZXcgaW5zdGFuY2UsIG9yIHN0aWxsIGluIHN0YWdnZXIuXG4gICAgICAgICAgLy8gaW5zZXJ0IHdpdGggdXBkYXRlZCBzdGFnZ2VyIGluZGV4LlxuICAgICAgICAgIHRoaXMuaW5zZXJ0KGZyYWcsIGluc2VydGlvbkluZGV4KyssIHByZXZFbCwgaW5Eb2N1bWVudCk7XG4gICAgICAgIH1cbiAgICAgICAgZnJhZy5yZXVzZWQgPSBmcmFnLmZyZXNoID0gZmFsc2U7XG4gICAgICB9XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIENyZWF0ZSBhIG5ldyBmcmFnbWVudCBpbnN0YW5jZS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7Kn0gdmFsdWVcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gYWxpYXNcbiAgICAgKiBAcGFyYW0ge051bWJlcn0gaW5kZXhcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gW2tleV1cbiAgICAgKiBAcmV0dXJuIHtGcmFnbWVudH1cbiAgICAgKi9cblxuICAgIGNyZWF0ZTogZnVuY3Rpb24gY3JlYXRlKHZhbHVlLCBhbGlhcywgaW5kZXgsIGtleSkge1xuICAgICAgdmFyIGhvc3QgPSB0aGlzLl9ob3N0O1xuICAgICAgLy8gY3JlYXRlIGl0ZXJhdGlvbiBzY29wZVxuICAgICAgdmFyIHBhcmVudFNjb3BlID0gdGhpcy5fc2NvcGUgfHwgdGhpcy52bTtcbiAgICAgIHZhciBzY29wZSA9IE9iamVjdC5jcmVhdGUocGFyZW50U2NvcGUpO1xuICAgICAgLy8gcmVmIGhvbGRlciBmb3IgdGhlIHNjb3BlXG4gICAgICBzY29wZS4kcmVmcyA9IE9iamVjdC5jcmVhdGUocGFyZW50U2NvcGUuJHJlZnMpO1xuICAgICAgc2NvcGUuJGVscyA9IE9iamVjdC5jcmVhdGUocGFyZW50U2NvcGUuJGVscyk7XG4gICAgICAvLyBtYWtlIHN1cmUgcG9pbnQgJHBhcmVudCB0byBwYXJlbnQgc2NvcGVcbiAgICAgIHNjb3BlLiRwYXJlbnQgPSBwYXJlbnRTY29wZTtcbiAgICAgIC8vIGZvciB0d28td2F5IGJpbmRpbmcgb24gYWxpYXNcbiAgICAgIHNjb3BlLiRmb3JDb250ZXh0ID0gdGhpcztcbiAgICAgIC8vIGRlZmluZSBzY29wZSBwcm9wZXJ0aWVzXG4gICAgICAvLyBpbXBvcnRhbnQ6IGRlZmluZSB0aGUgc2NvcGUgYWxpYXMgd2l0aG91dCBmb3JjZWQgY29udmVyc2lvblxuICAgICAgLy8gc28gdGhhdCBmcm96ZW4gZGF0YSBzdHJ1Y3R1cmVzIHJlbWFpbiBub24tcmVhY3RpdmUuXG4gICAgICB3aXRob3V0Q29udmVyc2lvbihmdW5jdGlvbiAoKSB7XG4gICAgICAgIGRlZmluZVJlYWN0aXZlKHNjb3BlLCBhbGlhcywgdmFsdWUpO1xuICAgICAgfSk7XG4gICAgICBkZWZpbmVSZWFjdGl2ZShzY29wZSwgJyRpbmRleCcsIGluZGV4KTtcbiAgICAgIGlmIChrZXkpIHtcbiAgICAgICAgZGVmaW5lUmVhY3RpdmUoc2NvcGUsICcka2V5Jywga2V5KTtcbiAgICAgIH0gZWxzZSBpZiAoc2NvcGUuJGtleSkge1xuICAgICAgICAvLyBhdm9pZCBhY2NpZGVudGFsIGZhbGxiYWNrXG4gICAgICAgIGRlZihzY29wZSwgJyRrZXknLCBudWxsKTtcbiAgICAgIH1cbiAgICAgIGlmICh0aGlzLml0ZXJhdG9yKSB7XG4gICAgICAgIGRlZmluZVJlYWN0aXZlKHNjb3BlLCB0aGlzLml0ZXJhdG9yLCBrZXkgIT09IG51bGwgPyBrZXkgOiBpbmRleCk7XG4gICAgICB9XG4gICAgICB2YXIgZnJhZyA9IHRoaXMuZmFjdG9yeS5jcmVhdGUoaG9zdCwgc2NvcGUsIHRoaXMuX2ZyYWcpO1xuICAgICAgZnJhZy5mb3JJZCA9IHRoaXMuaWQ7XG4gICAgICB0aGlzLmNhY2hlRnJhZyh2YWx1ZSwgZnJhZywgaW5kZXgsIGtleSk7XG4gICAgICByZXR1cm4gZnJhZztcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogVXBkYXRlIHRoZSB2LXJlZiBvbiBvd25lciB2bS5cbiAgICAgKi9cblxuICAgIHVwZGF0ZVJlZjogZnVuY3Rpb24gdXBkYXRlUmVmKCkge1xuICAgICAgdmFyIHJlZiA9IHRoaXMuZGVzY3JpcHRvci5yZWY7XG4gICAgICBpZiAoIXJlZikgcmV0dXJuO1xuICAgICAgdmFyIGhhc2ggPSAodGhpcy5fc2NvcGUgfHwgdGhpcy52bSkuJHJlZnM7XG4gICAgICB2YXIgcmVmcztcbiAgICAgIGlmICghdGhpcy5mcm9tT2JqZWN0KSB7XG4gICAgICAgIHJlZnMgPSB0aGlzLmZyYWdzLm1hcChmaW5kVm1Gcm9tRnJhZyk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZWZzID0ge307XG4gICAgICAgIHRoaXMuZnJhZ3MuZm9yRWFjaChmdW5jdGlvbiAoZnJhZykge1xuICAgICAgICAgIHJlZnNbZnJhZy5zY29wZS4ka2V5XSA9IGZpbmRWbUZyb21GcmFnKGZyYWcpO1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICAgIGhhc2hbcmVmXSA9IHJlZnM7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIEZvciBvcHRpb24gbGlzdHMsIHVwZGF0ZSB0aGUgY29udGFpbmluZyB2LW1vZGVsIG9uXG4gICAgICogcGFyZW50IDxzZWxlY3Q+LlxuICAgICAqL1xuXG4gICAgdXBkYXRlTW9kZWw6IGZ1bmN0aW9uIHVwZGF0ZU1vZGVsKCkge1xuICAgICAgaWYgKHRoaXMuaXNPcHRpb24pIHtcbiAgICAgICAgdmFyIHBhcmVudCA9IHRoaXMuc3RhcnQucGFyZW50Tm9kZTtcbiAgICAgICAgdmFyIG1vZGVsID0gcGFyZW50ICYmIHBhcmVudC5fX3ZfbW9kZWw7XG4gICAgICAgIGlmIChtb2RlbCkge1xuICAgICAgICAgIG1vZGVsLmZvcmNlVXBkYXRlKCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogSW5zZXJ0IGEgZnJhZ21lbnQuIEhhbmRsZXMgc3RhZ2dlcmluZy5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7RnJhZ21lbnR9IGZyYWdcbiAgICAgKiBAcGFyYW0ge051bWJlcn0gaW5kZXhcbiAgICAgKiBAcGFyYW0ge05vZGV9IHByZXZFbFxuICAgICAqIEBwYXJhbSB7Qm9vbGVhbn0gaW5Eb2N1bWVudFxuICAgICAqL1xuXG4gICAgaW5zZXJ0OiBmdW5jdGlvbiBpbnNlcnQoZnJhZywgaW5kZXgsIHByZXZFbCwgaW5Eb2N1bWVudCkge1xuICAgICAgaWYgKGZyYWcuc3RhZ2dlckNiKSB7XG4gICAgICAgIGZyYWcuc3RhZ2dlckNiLmNhbmNlbCgpO1xuICAgICAgICBmcmFnLnN0YWdnZXJDYiA9IG51bGw7XG4gICAgICB9XG4gICAgICB2YXIgc3RhZ2dlckFtb3VudCA9IHRoaXMuZ2V0U3RhZ2dlcihmcmFnLCBpbmRleCwgbnVsbCwgJ2VudGVyJyk7XG4gICAgICBpZiAoaW5Eb2N1bWVudCAmJiBzdGFnZ2VyQW1vdW50KSB7XG4gICAgICAgIC8vIGNyZWF0ZSBhbiBhbmNob3IgYW5kIGluc2VydCBpdCBzeW5jaHJvbm91c2x5LFxuICAgICAgICAvLyBzbyB0aGF0IHdlIGNhbiByZXNvbHZlIHRoZSBjb3JyZWN0IG9yZGVyIHdpdGhvdXRcbiAgICAgICAgLy8gd29ycnlpbmcgYWJvdXQgc29tZSBlbGVtZW50cyBub3QgaW5zZXJ0ZWQgeWV0XG4gICAgICAgIHZhciBhbmNob3IgPSBmcmFnLnN0YWdnZXJBbmNob3I7XG4gICAgICAgIGlmICghYW5jaG9yKSB7XG4gICAgICAgICAgYW5jaG9yID0gZnJhZy5zdGFnZ2VyQW5jaG9yID0gY3JlYXRlQW5jaG9yKCdzdGFnZ2VyLWFuY2hvcicpO1xuICAgICAgICAgIGFuY2hvci5fX3ZfZnJhZyA9IGZyYWc7XG4gICAgICAgIH1cbiAgICAgICAgYWZ0ZXIoYW5jaG9yLCBwcmV2RWwpO1xuICAgICAgICB2YXIgb3AgPSBmcmFnLnN0YWdnZXJDYiA9IGNhbmNlbGxhYmxlKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICBmcmFnLnN0YWdnZXJDYiA9IG51bGw7XG4gICAgICAgICAgZnJhZy5iZWZvcmUoYW5jaG9yKTtcbiAgICAgICAgICByZW1vdmUoYW5jaG9yKTtcbiAgICAgICAgfSk7XG4gICAgICAgIHNldFRpbWVvdXQob3AsIHN0YWdnZXJBbW91bnQpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdmFyIHRhcmdldCA9IHByZXZFbC5uZXh0U2libGluZztcbiAgICAgICAgLyogaXN0YW5idWwgaWdub3JlIGlmICovXG4gICAgICAgIGlmICghdGFyZ2V0KSB7XG4gICAgICAgICAgLy8gcmVzZXQgZW5kIGFuY2hvciBwb3NpdGlvbiBpbiBjYXNlIHRoZSBwb3NpdGlvbiB3YXMgbWVzc2VkIHVwXG4gICAgICAgICAgLy8gYnkgYW4gZXh0ZXJuYWwgZHJhZy1uLWRyb3AgbGlicmFyeS5cbiAgICAgICAgICBhZnRlcih0aGlzLmVuZCwgcHJldkVsKTtcbiAgICAgICAgICB0YXJnZXQgPSB0aGlzLmVuZDtcbiAgICAgICAgfVxuICAgICAgICBmcmFnLmJlZm9yZSh0YXJnZXQpO1xuICAgICAgfVxuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBSZW1vdmUgYSBmcmFnbWVudC4gSGFuZGxlcyBzdGFnZ2VyaW5nLlxuICAgICAqXG4gICAgICogQHBhcmFtIHtGcmFnbWVudH0gZnJhZ1xuICAgICAqIEBwYXJhbSB7TnVtYmVyfSBpbmRleFxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSB0b3RhbFxuICAgICAqIEBwYXJhbSB7Qm9vbGVhbn0gaW5Eb2N1bWVudFxuICAgICAqL1xuXG4gICAgcmVtb3ZlOiBmdW5jdGlvbiByZW1vdmUoZnJhZywgaW5kZXgsIHRvdGFsLCBpbkRvY3VtZW50KSB7XG4gICAgICBpZiAoZnJhZy5zdGFnZ2VyQ2IpIHtcbiAgICAgICAgZnJhZy5zdGFnZ2VyQ2IuY2FuY2VsKCk7XG4gICAgICAgIGZyYWcuc3RhZ2dlckNiID0gbnVsbDtcbiAgICAgICAgLy8gaXQncyBub3QgcG9zc2libGUgZm9yIHRoZSBzYW1lIGZyYWcgdG8gYmUgcmVtb3ZlZFxuICAgICAgICAvLyB0d2ljZSwgc28gaWYgd2UgaGF2ZSBhIHBlbmRpbmcgc3RhZ2dlciBjYWxsYmFjayxcbiAgICAgICAgLy8gaXQgbWVhbnMgdGhpcyBmcmFnIGlzIHF1ZXVlZCBmb3IgZW50ZXIgYnV0IHJlbW92ZWRcbiAgICAgICAgLy8gYmVmb3JlIGl0cyB0cmFuc2l0aW9uIHN0YXJ0ZWQuIFNpbmNlIGl0IGlzIGFscmVhZHlcbiAgICAgICAgLy8gZGVzdHJveWVkLCB3ZSBjYW4ganVzdCBsZWF2ZSBpdCBpbiBkZXRhY2hlZCBzdGF0ZS5cbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgdmFyIHN0YWdnZXJBbW91bnQgPSB0aGlzLmdldFN0YWdnZXIoZnJhZywgaW5kZXgsIHRvdGFsLCAnbGVhdmUnKTtcbiAgICAgIGlmIChpbkRvY3VtZW50ICYmIHN0YWdnZXJBbW91bnQpIHtcbiAgICAgICAgdmFyIG9wID0gZnJhZy5zdGFnZ2VyQ2IgPSBjYW5jZWxsYWJsZShmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgZnJhZy5zdGFnZ2VyQ2IgPSBudWxsO1xuICAgICAgICAgIGZyYWcucmVtb3ZlKCk7XG4gICAgICAgIH0pO1xuICAgICAgICBzZXRUaW1lb3V0KG9wLCBzdGFnZ2VyQW1vdW50KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGZyYWcucmVtb3ZlKCk7XG4gICAgICB9XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIE1vdmUgYSBmcmFnbWVudCB0byBhIG5ldyBwb3NpdGlvbi5cbiAgICAgKiBGb3JjZSBubyB0cmFuc2l0aW9uLlxuICAgICAqXG4gICAgICogQHBhcmFtIHtGcmFnbWVudH0gZnJhZ1xuICAgICAqIEBwYXJhbSB7Tm9kZX0gcHJldkVsXG4gICAgICovXG5cbiAgICBtb3ZlOiBmdW5jdGlvbiBtb3ZlKGZyYWcsIHByZXZFbCkge1xuICAgICAgLy8gZml4IGEgY29tbW9uIGlzc3VlIHdpdGggU29ydGFibGU6XG4gICAgICAvLyBpZiBwcmV2RWwgZG9lc24ndCBoYXZlIG5leHRTaWJsaW5nLCB0aGlzIG1lYW5zIGl0J3NcbiAgICAgIC8vIGJlZW4gZHJhZ2dlZCBhZnRlciB0aGUgZW5kIGFuY2hvci4gSnVzdCByZS1wb3NpdGlvblxuICAgICAgLy8gdGhlIGVuZCBhbmNob3IgdG8gdGhlIGVuZCBvZiB0aGUgY29udGFpbmVyLlxuICAgICAgLyogaXN0YW5idWwgaWdub3JlIGlmICovXG4gICAgICBpZiAoIXByZXZFbC5uZXh0U2libGluZykge1xuICAgICAgICB0aGlzLmVuZC5wYXJlbnROb2RlLmFwcGVuZENoaWxkKHRoaXMuZW5kKTtcbiAgICAgIH1cbiAgICAgIGZyYWcuYmVmb3JlKHByZXZFbC5uZXh0U2libGluZywgZmFsc2UpO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBDYWNoZSBhIGZyYWdtZW50IHVzaW5nIHRyYWNrLWJ5IG9yIHRoZSBvYmplY3Qga2V5LlxuICAgICAqXG4gICAgICogQHBhcmFtIHsqfSB2YWx1ZVxuICAgICAqIEBwYXJhbSB7RnJhZ21lbnR9IGZyYWdcbiAgICAgKiBAcGFyYW0ge051bWJlcn0gaW5kZXhcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gW2tleV1cbiAgICAgKi9cblxuICAgIGNhY2hlRnJhZzogZnVuY3Rpb24gY2FjaGVGcmFnKHZhbHVlLCBmcmFnLCBpbmRleCwga2V5KSB7XG4gICAgICB2YXIgdHJhY2tCeUtleSA9IHRoaXMucGFyYW1zLnRyYWNrQnk7XG4gICAgICB2YXIgY2FjaGUgPSB0aGlzLmNhY2hlO1xuICAgICAgdmFyIHByaW1pdGl2ZSA9ICFpc09iamVjdCh2YWx1ZSk7XG4gICAgICB2YXIgaWQ7XG4gICAgICBpZiAoa2V5IHx8IHRyYWNrQnlLZXkgfHwgcHJpbWl0aXZlKSB7XG4gICAgICAgIGlkID0gZ2V0VHJhY2tCeUtleShpbmRleCwga2V5LCB2YWx1ZSwgdHJhY2tCeUtleSk7XG4gICAgICAgIGlmICghY2FjaGVbaWRdKSB7XG4gICAgICAgICAgY2FjaGVbaWRdID0gZnJhZztcbiAgICAgICAgfSBlbHNlIGlmICh0cmFja0J5S2V5ICE9PSAnJGluZGV4Jykge1xuICAgICAgICAgICdkZXZlbG9wbWVudCcgIT09ICdwcm9kdWN0aW9uJyAmJiB0aGlzLndhcm5EdXBsaWNhdGUodmFsdWUpO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpZCA9IHRoaXMuaWQ7XG4gICAgICAgIGlmIChoYXNPd24odmFsdWUsIGlkKSkge1xuICAgICAgICAgIGlmICh2YWx1ZVtpZF0gPT09IG51bGwpIHtcbiAgICAgICAgICAgIHZhbHVlW2lkXSA9IGZyYWc7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICdkZXZlbG9wbWVudCcgIT09ICdwcm9kdWN0aW9uJyAmJiB0aGlzLndhcm5EdXBsaWNhdGUodmFsdWUpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIGlmIChPYmplY3QuaXNFeHRlbnNpYmxlKHZhbHVlKSkge1xuICAgICAgICAgIGRlZih2YWx1ZSwgaWQsIGZyYWcpO1xuICAgICAgICB9IGVsc2UgaWYgKCdkZXZlbG9wbWVudCcgIT09ICdwcm9kdWN0aW9uJykge1xuICAgICAgICAgIHdhcm4oJ0Zyb3plbiB2LWZvciBvYmplY3RzIGNhbm5vdCBiZSBhdXRvbWF0aWNhbGx5IHRyYWNrZWQsIG1ha2Ugc3VyZSB0byAnICsgJ3Byb3ZpZGUgYSB0cmFjay1ieSBrZXkuJyk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGZyYWcucmF3ID0gdmFsdWU7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIEdldCBhIGNhY2hlZCBmcmFnbWVudCBmcm9tIHRoZSB2YWx1ZS9pbmRleC9rZXlcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7Kn0gdmFsdWVcbiAgICAgKiBAcGFyYW0ge051bWJlcn0gaW5kZXhcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30ga2V5XG4gICAgICogQHJldHVybiB7RnJhZ21lbnR9XG4gICAgICovXG5cbiAgICBnZXRDYWNoZWRGcmFnOiBmdW5jdGlvbiBnZXRDYWNoZWRGcmFnKHZhbHVlLCBpbmRleCwga2V5KSB7XG4gICAgICB2YXIgdHJhY2tCeUtleSA9IHRoaXMucGFyYW1zLnRyYWNrQnk7XG4gICAgICB2YXIgcHJpbWl0aXZlID0gIWlzT2JqZWN0KHZhbHVlKTtcbiAgICAgIHZhciBmcmFnO1xuICAgICAgaWYgKGtleSB8fCB0cmFja0J5S2V5IHx8IHByaW1pdGl2ZSkge1xuICAgICAgICB2YXIgaWQgPSBnZXRUcmFja0J5S2V5KGluZGV4LCBrZXksIHZhbHVlLCB0cmFja0J5S2V5KTtcbiAgICAgICAgZnJhZyA9IHRoaXMuY2FjaGVbaWRdO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZnJhZyA9IHZhbHVlW3RoaXMuaWRdO1xuICAgICAgfVxuICAgICAgaWYgKGZyYWcgJiYgKGZyYWcucmV1c2VkIHx8IGZyYWcuZnJlc2gpKSB7XG4gICAgICAgICdkZXZlbG9wbWVudCcgIT09ICdwcm9kdWN0aW9uJyAmJiB0aGlzLndhcm5EdXBsaWNhdGUodmFsdWUpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGZyYWc7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIERlbGV0ZSBhIGZyYWdtZW50IGZyb20gY2FjaGUuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge0ZyYWdtZW50fSBmcmFnXG4gICAgICovXG5cbiAgICBkZWxldGVDYWNoZWRGcmFnOiBmdW5jdGlvbiBkZWxldGVDYWNoZWRGcmFnKGZyYWcpIHtcbiAgICAgIHZhciB2YWx1ZSA9IGZyYWcucmF3O1xuICAgICAgdmFyIHRyYWNrQnlLZXkgPSB0aGlzLnBhcmFtcy50cmFja0J5O1xuICAgICAgdmFyIHNjb3BlID0gZnJhZy5zY29wZTtcbiAgICAgIHZhciBpbmRleCA9IHNjb3BlLiRpbmRleDtcbiAgICAgIC8vIGZpeCAjOTQ4OiBhdm9pZCBhY2NpZGVudGFsbHkgZmFsbCB0aHJvdWdoIHRvXG4gICAgICAvLyBhIHBhcmVudCByZXBlYXRlciB3aGljaCBoYXBwZW5zIHRvIGhhdmUgJGtleS5cbiAgICAgIHZhciBrZXkgPSBoYXNPd24oc2NvcGUsICcka2V5JykgJiYgc2NvcGUuJGtleTtcbiAgICAgIHZhciBwcmltaXRpdmUgPSAhaXNPYmplY3QodmFsdWUpO1xuICAgICAgaWYgKHRyYWNrQnlLZXkgfHwga2V5IHx8IHByaW1pdGl2ZSkge1xuICAgICAgICB2YXIgaWQgPSBnZXRUcmFja0J5S2V5KGluZGV4LCBrZXksIHZhbHVlLCB0cmFja0J5S2V5KTtcbiAgICAgICAgdGhpcy5jYWNoZVtpZF0gPSBudWxsO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdmFsdWVbdGhpcy5pZF0gPSBudWxsO1xuICAgICAgICBmcmFnLnJhdyA9IG51bGw7XG4gICAgICB9XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIEdldCB0aGUgc3RhZ2dlciBhbW91bnQgZm9yIGFuIGluc2VydGlvbi9yZW1vdmFsLlxuICAgICAqXG4gICAgICogQHBhcmFtIHtGcmFnbWVudH0gZnJhZ1xuICAgICAqIEBwYXJhbSB7TnVtYmVyfSBpbmRleFxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSB0b3RhbFxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSB0eXBlXG4gICAgICovXG5cbiAgICBnZXRTdGFnZ2VyOiBmdW5jdGlvbiBnZXRTdGFnZ2VyKGZyYWcsIGluZGV4LCB0b3RhbCwgdHlwZSkge1xuICAgICAgdHlwZSA9IHR5cGUgKyAnU3RhZ2dlcic7XG4gICAgICB2YXIgdHJhbnMgPSBmcmFnLm5vZGUuX192X3RyYW5zO1xuICAgICAgdmFyIGhvb2tzID0gdHJhbnMgJiYgdHJhbnMuaG9va3M7XG4gICAgICB2YXIgaG9vayA9IGhvb2tzICYmIChob29rc1t0eXBlXSB8fCBob29rcy5zdGFnZ2VyKTtcbiAgICAgIHJldHVybiBob29rID8gaG9vay5jYWxsKGZyYWcsIGluZGV4LCB0b3RhbCkgOiBpbmRleCAqIHBhcnNlSW50KHRoaXMucGFyYW1zW3R5cGVdIHx8IHRoaXMucGFyYW1zLnN0YWdnZXIsIDEwKTtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogUHJlLXByb2Nlc3MgdGhlIHZhbHVlIGJlZm9yZSBwaXBpbmcgaXQgdGhyb3VnaCB0aGVcbiAgICAgKiBmaWx0ZXJzLiBUaGlzIGlzIHBhc3NlZCB0byBhbmQgY2FsbGVkIGJ5IHRoZSB3YXRjaGVyLlxuICAgICAqL1xuXG4gICAgX3ByZVByb2Nlc3M6IGZ1bmN0aW9uIF9wcmVQcm9jZXNzKHZhbHVlKSB7XG4gICAgICAvLyByZWdhcmRsZXNzIG9mIHR5cGUsIHN0b3JlIHRoZSB1bi1maWx0ZXJlZCByYXcgdmFsdWUuXG4gICAgICB0aGlzLnJhd1ZhbHVlID0gdmFsdWU7XG4gICAgICByZXR1cm4gdmFsdWU7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIFBvc3QtcHJvY2VzcyB0aGUgdmFsdWUgYWZ0ZXIgaXQgaGFzIGJlZW4gcGlwZWQgdGhyb3VnaFxuICAgICAqIHRoZSBmaWx0ZXJzLiBUaGlzIGlzIHBhc3NlZCB0byBhbmQgY2FsbGVkIGJ5IHRoZSB3YXRjaGVyLlxuICAgICAqXG4gICAgICogSXQgaXMgbmVjZXNzYXJ5IGZvciB0aGlzIHRvIGJlIGNhbGxlZCBkdXJpbmcgdGhlXG4gICAgICogd2F0aGNlcidzIGRlcGVuZGVuY3kgY29sbGVjdGlvbiBwaGFzZSBiZWNhdXNlIHdlIHdhbnRcbiAgICAgKiB0aGUgdi1mb3IgdG8gdXBkYXRlIHdoZW4gdGhlIHNvdXJjZSBPYmplY3QgaXMgbXV0YXRlZC5cbiAgICAgKi9cblxuICAgIF9wb3N0UHJvY2VzczogZnVuY3Rpb24gX3Bvc3RQcm9jZXNzKHZhbHVlKSB7XG4gICAgICBpZiAoaXNBcnJheSh2YWx1ZSkpIHtcbiAgICAgICAgcmV0dXJuIHZhbHVlO1xuICAgICAgfSBlbHNlIGlmIChpc1BsYWluT2JqZWN0KHZhbHVlKSkge1xuICAgICAgICAvLyBjb252ZXJ0IHBsYWluIG9iamVjdCB0byBhcnJheS5cbiAgICAgICAgdmFyIGtleXMgPSBPYmplY3Qua2V5cyh2YWx1ZSk7XG4gICAgICAgIHZhciBpID0ga2V5cy5sZW5ndGg7XG4gICAgICAgIHZhciByZXMgPSBuZXcgQXJyYXkoaSk7XG4gICAgICAgIHZhciBrZXk7XG4gICAgICAgIHdoaWxlIChpLS0pIHtcbiAgICAgICAgICBrZXkgPSBrZXlzW2ldO1xuICAgICAgICAgIHJlc1tpXSA9IHtcbiAgICAgICAgICAgICRrZXk6IGtleSxcbiAgICAgICAgICAgICR2YWx1ZTogdmFsdWVba2V5XVxuICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJlcztcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGlmICh0eXBlb2YgdmFsdWUgPT09ICdudW1iZXInICYmICFpc05hTih2YWx1ZSkpIHtcbiAgICAgICAgICB2YWx1ZSA9IHJhbmdlKHZhbHVlKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdmFsdWUgfHwgW107XG4gICAgICB9XG4gICAgfSxcblxuICAgIHVuYmluZDogZnVuY3Rpb24gdW5iaW5kKCkge1xuICAgICAgaWYgKHRoaXMuZGVzY3JpcHRvci5yZWYpIHtcbiAgICAgICAgKHRoaXMuX3Njb3BlIHx8IHRoaXMudm0pLiRyZWZzW3RoaXMuZGVzY3JpcHRvci5yZWZdID0gbnVsbDtcbiAgICAgIH1cbiAgICAgIGlmICh0aGlzLmZyYWdzKSB7XG4gICAgICAgIHZhciBpID0gdGhpcy5mcmFncy5sZW5ndGg7XG4gICAgICAgIHZhciBmcmFnO1xuICAgICAgICB3aGlsZSAoaS0tKSB7XG4gICAgICAgICAgZnJhZyA9IHRoaXMuZnJhZ3NbaV07XG4gICAgICAgICAgdGhpcy5kZWxldGVDYWNoZWRGcmFnKGZyYWcpO1xuICAgICAgICAgIGZyYWcuZGVzdHJveSgpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9O1xuXG4gIC8qKlxuICAgKiBIZWxwZXIgdG8gZmluZCB0aGUgcHJldmlvdXMgZWxlbWVudCB0aGF0IGlzIGEgZnJhZ21lbnRcbiAgICogYW5jaG9yLiBUaGlzIGlzIG5lY2Vzc2FyeSBiZWNhdXNlIGEgZGVzdHJveWVkIGZyYWcnc1xuICAgKiBlbGVtZW50IGNvdWxkIHN0aWxsIGJlIGxpbmdlcmluZyBpbiB0aGUgRE9NIGJlZm9yZSBpdHNcbiAgICogbGVhdmluZyB0cmFuc2l0aW9uIGZpbmlzaGVzLCBidXQgaXRzIGluc2VydGVkIGZsYWdcbiAgICogc2hvdWxkIGhhdmUgYmVlbiBzZXQgdG8gZmFsc2Ugc28gd2UgY2FuIHNraXAgdGhlbS5cbiAgICpcbiAgICogSWYgdGhpcyBpcyBhIGJsb2NrIHJlcGVhdCwgd2Ugd2FudCB0byBtYWtlIHN1cmUgd2Ugb25seVxuICAgKiByZXR1cm4gZnJhZyB0aGF0IGlzIGJvdW5kIHRvIHRoaXMgdi1mb3IuIChzZWUgIzkyOSlcbiAgICpcbiAgICogQHBhcmFtIHtGcmFnbWVudH0gZnJhZ1xuICAgKiBAcGFyYW0ge0NvbW1lbnR8VGV4dH0gYW5jaG9yXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBpZFxuICAgKiBAcmV0dXJuIHtGcmFnbWVudH1cbiAgICovXG5cbiAgZnVuY3Rpb24gZmluZFByZXZGcmFnKGZyYWcsIGFuY2hvciwgaWQpIHtcbiAgICB2YXIgZWwgPSBmcmFnLm5vZGUucHJldmlvdXNTaWJsaW5nO1xuICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBpZiAqL1xuICAgIGlmICghZWwpIHJldHVybjtcbiAgICBmcmFnID0gZWwuX192X2ZyYWc7XG4gICAgd2hpbGUgKCghZnJhZyB8fCBmcmFnLmZvcklkICE9PSBpZCB8fCAhZnJhZy5pbnNlcnRlZCkgJiYgZWwgIT09IGFuY2hvcikge1xuICAgICAgZWwgPSBlbC5wcmV2aW91c1NpYmxpbmc7XG4gICAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgaWYgKi9cbiAgICAgIGlmICghZWwpIHJldHVybjtcbiAgICAgIGZyYWcgPSBlbC5fX3ZfZnJhZztcbiAgICB9XG4gICAgcmV0dXJuIGZyYWc7XG4gIH1cblxuICAvKipcbiAgICogRmluZCBhIHZtIGZyb20gYSBmcmFnbWVudC5cbiAgICpcbiAgICogQHBhcmFtIHtGcmFnbWVudH0gZnJhZ1xuICAgKiBAcmV0dXJuIHtWdWV8dW5kZWZpbmVkfVxuICAgKi9cblxuICBmdW5jdGlvbiBmaW5kVm1Gcm9tRnJhZyhmcmFnKSB7XG4gICAgdmFyIG5vZGUgPSBmcmFnLm5vZGU7XG4gICAgLy8gaGFuZGxlIG11bHRpLW5vZGUgZnJhZ1xuICAgIGlmIChmcmFnLmVuZCkge1xuICAgICAgd2hpbGUgKCFub2RlLl9fdnVlX18gJiYgbm9kZSAhPT0gZnJhZy5lbmQgJiYgbm9kZS5uZXh0U2libGluZykge1xuICAgICAgICBub2RlID0gbm9kZS5uZXh0U2libGluZztcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIG5vZGUuX192dWVfXztcbiAgfVxuXG4gIC8qKlxuICAgKiBDcmVhdGUgYSByYW5nZSBhcnJheSBmcm9tIGdpdmVuIG51bWJlci5cbiAgICpcbiAgICogQHBhcmFtIHtOdW1iZXJ9IG5cbiAgICogQHJldHVybiB7QXJyYXl9XG4gICAqL1xuXG4gIGZ1bmN0aW9uIHJhbmdlKG4pIHtcbiAgICB2YXIgaSA9IC0xO1xuICAgIHZhciByZXQgPSBuZXcgQXJyYXkoTWF0aC5mbG9vcihuKSk7XG4gICAgd2hpbGUgKCsraSA8IG4pIHtcbiAgICAgIHJldFtpXSA9IGk7XG4gICAgfVxuICAgIHJldHVybiByZXQ7XG4gIH1cblxuICAvKipcbiAgICogR2V0IHRoZSB0cmFjayBieSBrZXkgZm9yIGFuIGl0ZW0uXG4gICAqXG4gICAqIEBwYXJhbSB7TnVtYmVyfSBpbmRleFxuICAgKiBAcGFyYW0ge1N0cmluZ30ga2V5XG4gICAqIEBwYXJhbSB7Kn0gdmFsdWVcbiAgICogQHBhcmFtIHtTdHJpbmd9IFt0cmFja0J5S2V5XVxuICAgKi9cblxuICBmdW5jdGlvbiBnZXRUcmFja0J5S2V5KGluZGV4LCBrZXksIHZhbHVlLCB0cmFja0J5S2V5KSB7XG4gICAgcmV0dXJuIHRyYWNrQnlLZXkgPyB0cmFja0J5S2V5ID09PSAnJGluZGV4JyA/IGluZGV4IDogdHJhY2tCeUtleS5jaGFyQXQoMCkubWF0Y2goL1xcdy8pID8gZ2V0UGF0aCh2YWx1ZSwgdHJhY2tCeUtleSkgOiB2YWx1ZVt0cmFja0J5S2V5XSA6IGtleSB8fCB2YWx1ZTtcbiAgfVxuXG4gIGlmICgnZGV2ZWxvcG1lbnQnICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICB2Rm9yLndhcm5EdXBsaWNhdGUgPSBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgIHdhcm4oJ0R1cGxpY2F0ZSB2YWx1ZSBmb3VuZCBpbiB2LWZvcj1cIicgKyB0aGlzLmRlc2NyaXB0b3IucmF3ICsgJ1wiOiAnICsgSlNPTi5zdHJpbmdpZnkodmFsdWUpICsgJy4gVXNlIHRyYWNrLWJ5PVwiJGluZGV4XCIgaWYgJyArICd5b3UgYXJlIGV4cGVjdGluZyBkdXBsaWNhdGUgdmFsdWVzLicsIHRoaXMudm0pO1xuICAgIH07XG4gIH1cblxuICB2YXIgdklmID0ge1xuXG4gICAgcHJpb3JpdHk6IElGLFxuICAgIHRlcm1pbmFsOiB0cnVlLFxuXG4gICAgYmluZDogZnVuY3Rpb24gYmluZCgpIHtcbiAgICAgIHZhciBlbCA9IHRoaXMuZWw7XG4gICAgICBpZiAoIWVsLl9fdnVlX18pIHtcbiAgICAgICAgLy8gY2hlY2sgZWxzZSBibG9ja1xuICAgICAgICB2YXIgbmV4dCA9IGVsLm5leHRFbGVtZW50U2libGluZztcbiAgICAgICAgaWYgKG5leHQgJiYgZ2V0QXR0cihuZXh0LCAndi1lbHNlJykgIT09IG51bGwpIHtcbiAgICAgICAgICByZW1vdmUobmV4dCk7XG4gICAgICAgICAgdGhpcy5lbHNlRWwgPSBuZXh0O1xuICAgICAgICB9XG4gICAgICAgIC8vIGNoZWNrIG1haW4gYmxvY2tcbiAgICAgICAgdGhpcy5hbmNob3IgPSBjcmVhdGVBbmNob3IoJ3YtaWYnKTtcbiAgICAgICAgcmVwbGFjZShlbCwgdGhpcy5hbmNob3IpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgJ2RldmVsb3BtZW50JyAhPT0gJ3Byb2R1Y3Rpb24nICYmIHdhcm4oJ3YtaWY9XCInICsgdGhpcy5leHByZXNzaW9uICsgJ1wiIGNhbm5vdCBiZSAnICsgJ3VzZWQgb24gYW4gaW5zdGFuY2Ugcm9vdCBlbGVtZW50LicsIHRoaXMudm0pO1xuICAgICAgICB0aGlzLmludmFsaWQgPSB0cnVlO1xuICAgICAgfVxuICAgIH0sXG5cbiAgICB1cGRhdGU6IGZ1bmN0aW9uIHVwZGF0ZSh2YWx1ZSkge1xuICAgICAgaWYgKHRoaXMuaW52YWxpZCkgcmV0dXJuO1xuICAgICAgaWYgKHZhbHVlKSB7XG4gICAgICAgIGlmICghdGhpcy5mcmFnKSB7XG4gICAgICAgICAgdGhpcy5pbnNlcnQoKTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5yZW1vdmUoKTtcbiAgICAgIH1cbiAgICB9LFxuXG4gICAgaW5zZXJ0OiBmdW5jdGlvbiBpbnNlcnQoKSB7XG4gICAgICBpZiAodGhpcy5lbHNlRnJhZykge1xuICAgICAgICB0aGlzLmVsc2VGcmFnLnJlbW92ZSgpO1xuICAgICAgICB0aGlzLmVsc2VGcmFnID0gbnVsbDtcbiAgICAgIH1cbiAgICAgIC8vIGxhenkgaW5pdCBmYWN0b3J5XG4gICAgICBpZiAoIXRoaXMuZmFjdG9yeSkge1xuICAgICAgICB0aGlzLmZhY3RvcnkgPSBuZXcgRnJhZ21lbnRGYWN0b3J5KHRoaXMudm0sIHRoaXMuZWwpO1xuICAgICAgfVxuICAgICAgdGhpcy5mcmFnID0gdGhpcy5mYWN0b3J5LmNyZWF0ZSh0aGlzLl9ob3N0LCB0aGlzLl9zY29wZSwgdGhpcy5fZnJhZyk7XG4gICAgICB0aGlzLmZyYWcuYmVmb3JlKHRoaXMuYW5jaG9yKTtcbiAgICB9LFxuXG4gICAgcmVtb3ZlOiBmdW5jdGlvbiByZW1vdmUoKSB7XG4gICAgICBpZiAodGhpcy5mcmFnKSB7XG4gICAgICAgIHRoaXMuZnJhZy5yZW1vdmUoKTtcbiAgICAgICAgdGhpcy5mcmFnID0gbnVsbDtcbiAgICAgIH1cbiAgICAgIGlmICh0aGlzLmVsc2VFbCAmJiAhdGhpcy5lbHNlRnJhZykge1xuICAgICAgICBpZiAoIXRoaXMuZWxzZUZhY3RvcnkpIHtcbiAgICAgICAgICB0aGlzLmVsc2VGYWN0b3J5ID0gbmV3IEZyYWdtZW50RmFjdG9yeSh0aGlzLmVsc2VFbC5fY29udGV4dCB8fCB0aGlzLnZtLCB0aGlzLmVsc2VFbCk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5lbHNlRnJhZyA9IHRoaXMuZWxzZUZhY3RvcnkuY3JlYXRlKHRoaXMuX2hvc3QsIHRoaXMuX3Njb3BlLCB0aGlzLl9mcmFnKTtcbiAgICAgICAgdGhpcy5lbHNlRnJhZy5iZWZvcmUodGhpcy5hbmNob3IpO1xuICAgICAgfVxuICAgIH0sXG5cbiAgICB1bmJpbmQ6IGZ1bmN0aW9uIHVuYmluZCgpIHtcbiAgICAgIGlmICh0aGlzLmZyYWcpIHtcbiAgICAgICAgdGhpcy5mcmFnLmRlc3Ryb3koKTtcbiAgICAgIH1cbiAgICAgIGlmICh0aGlzLmVsc2VGcmFnKSB7XG4gICAgICAgIHRoaXMuZWxzZUZyYWcuZGVzdHJveSgpO1xuICAgICAgfVxuICAgIH1cbiAgfTtcblxuICB2YXIgc2hvdyA9IHtcblxuICAgIGJpbmQ6IGZ1bmN0aW9uIGJpbmQoKSB7XG4gICAgICAvLyBjaGVjayBlbHNlIGJsb2NrXG4gICAgICB2YXIgbmV4dCA9IHRoaXMuZWwubmV4dEVsZW1lbnRTaWJsaW5nO1xuICAgICAgaWYgKG5leHQgJiYgZ2V0QXR0cihuZXh0LCAndi1lbHNlJykgIT09IG51bGwpIHtcbiAgICAgICAgdGhpcy5lbHNlRWwgPSBuZXh0O1xuICAgICAgfVxuICAgIH0sXG5cbiAgICB1cGRhdGU6IGZ1bmN0aW9uIHVwZGF0ZSh2YWx1ZSkge1xuICAgICAgdGhpcy5hcHBseSh0aGlzLmVsLCB2YWx1ZSk7XG4gICAgICBpZiAodGhpcy5lbHNlRWwpIHtcbiAgICAgICAgdGhpcy5hcHBseSh0aGlzLmVsc2VFbCwgIXZhbHVlKTtcbiAgICAgIH1cbiAgICB9LFxuXG4gICAgYXBwbHk6IGZ1bmN0aW9uIGFwcGx5KGVsLCB2YWx1ZSkge1xuICAgICAgaWYgKGluRG9jKGVsKSkge1xuICAgICAgICBhcHBseVRyYW5zaXRpb24oZWwsIHZhbHVlID8gMSA6IC0xLCB0b2dnbGUsIHRoaXMudm0pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdG9nZ2xlKCk7XG4gICAgICB9XG4gICAgICBmdW5jdGlvbiB0b2dnbGUoKSB7XG4gICAgICAgIGVsLnN0eWxlLmRpc3BsYXkgPSB2YWx1ZSA/ICcnIDogJ25vbmUnO1xuICAgICAgfVxuICAgIH1cbiAgfTtcblxuICB2YXIgdGV4dCQyID0ge1xuXG4gICAgYmluZDogZnVuY3Rpb24gYmluZCgpIHtcbiAgICAgIHZhciBzZWxmID0gdGhpcztcbiAgICAgIHZhciBlbCA9IHRoaXMuZWw7XG4gICAgICB2YXIgaXNSYW5nZSA9IGVsLnR5cGUgPT09ICdyYW5nZSc7XG4gICAgICB2YXIgbGF6eSA9IHRoaXMucGFyYW1zLmxhenk7XG4gICAgICB2YXIgbnVtYmVyID0gdGhpcy5wYXJhbXMubnVtYmVyO1xuICAgICAgdmFyIGRlYm91bmNlID0gdGhpcy5wYXJhbXMuZGVib3VuY2U7XG5cbiAgICAgIC8vIGhhbmRsZSBjb21wb3NpdGlvbiBldmVudHMuXG4gICAgICAvLyAgIGh0dHA6Ly9ibG9nLmV2YW55b3UubWUvMjAxNC8wMS8wMy9jb21wb3NpdGlvbi1ldmVudC9cbiAgICAgIC8vIHNraXAgdGhpcyBmb3IgQW5kcm9pZCBiZWNhdXNlIGl0IGhhbmRsZXMgY29tcG9zaXRpb25cbiAgICAgIC8vIGV2ZW50cyBxdWl0ZSBkaWZmZXJlbnRseS4gQW5kcm9pZCBkb2Vzbid0IHRyaWdnZXJcbiAgICAgIC8vIGNvbXBvc2l0aW9uIGV2ZW50cyBmb3IgbGFuZ3VhZ2UgaW5wdXQgbWV0aG9kcyBlLmcuXG4gICAgICAvLyBDaGluZXNlLCBidXQgaW5zdGVhZCB0cmlnZ2VycyB0aGVtIGZvciBzcGVsbGluZ1xuICAgICAgLy8gc3VnZ2VzdGlvbnMuLi4gKHNlZSBEaXNjdXNzaW9uLyMxNjIpXG4gICAgICB2YXIgY29tcG9zaW5nID0gZmFsc2U7XG4gICAgICBpZiAoIWlzQW5kcm9pZCAmJiAhaXNSYW5nZSkge1xuICAgICAgICB0aGlzLm9uKCdjb21wb3NpdGlvbnN0YXJ0JywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgIGNvbXBvc2luZyA9IHRydWU7XG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLm9uKCdjb21wb3NpdGlvbmVuZCcsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICBjb21wb3NpbmcgPSBmYWxzZTtcbiAgICAgICAgICAvLyBpbiBJRTExIHRoZSBcImNvbXBvc2l0aW9uZW5kXCIgZXZlbnQgZmlyZXMgQUZURVJcbiAgICAgICAgICAvLyB0aGUgXCJpbnB1dFwiIGV2ZW50LCBzbyB0aGUgaW5wdXQgaGFuZGxlciBpcyBibG9ja2VkXG4gICAgICAgICAgLy8gYXQgdGhlIGVuZC4uLiBoYXZlIHRvIGNhbGwgaXQgaGVyZS5cbiAgICAgICAgICAvL1xuICAgICAgICAgIC8vICMxMzI3OiBpbiBsYXp5IG1vZGUgdGhpcyBpcyB1bmVjZXNzYXJ5LlxuICAgICAgICAgIGlmICghbGF6eSkge1xuICAgICAgICAgICAgc2VsZi5saXN0ZW5lcigpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICB9XG5cbiAgICAgIC8vIHByZXZlbnQgbWVzc2luZyB3aXRoIHRoZSBpbnB1dCB3aGVuIHVzZXIgaXMgdHlwaW5nLFxuICAgICAgLy8gYW5kIGZvcmNlIHVwZGF0ZSBvbiBibHVyLlxuICAgICAgdGhpcy5mb2N1c2VkID0gZmFsc2U7XG4gICAgICBpZiAoIWlzUmFuZ2UgJiYgIWxhenkpIHtcbiAgICAgICAgdGhpcy5vbignZm9jdXMnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgc2VsZi5mb2N1c2VkID0gdHJ1ZTtcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMub24oJ2JsdXInLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgc2VsZi5mb2N1c2VkID0gZmFsc2U7XG4gICAgICAgICAgLy8gZG8gbm90IHN5bmMgdmFsdWUgYWZ0ZXIgZnJhZ21lbnQgcmVtb3ZhbCAoIzIwMTcpXG4gICAgICAgICAgaWYgKCFzZWxmLl9mcmFnIHx8IHNlbGYuX2ZyYWcuaW5zZXJ0ZWQpIHtcbiAgICAgICAgICAgIHNlbGYucmF3TGlzdGVuZXIoKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfVxuXG4gICAgICAvLyBOb3cgYXR0YWNoIHRoZSBtYWluIGxpc3RlbmVyXG4gICAgICB0aGlzLmxpc3RlbmVyID0gdGhpcy5yYXdMaXN0ZW5lciA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKGNvbXBvc2luZyB8fCAhc2VsZi5fYm91bmQpIHtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdmFyIHZhbCA9IG51bWJlciB8fCBpc1JhbmdlID8gdG9OdW1iZXIoZWwudmFsdWUpIDogZWwudmFsdWU7XG4gICAgICAgIHNlbGYuc2V0KHZhbCk7XG4gICAgICAgIC8vIGZvcmNlIHVwZGF0ZSBvbiBuZXh0IHRpY2sgdG8gYXZvaWQgbG9jayAmIHNhbWUgdmFsdWVcbiAgICAgICAgLy8gYWxzbyBvbmx5IHVwZGF0ZSB3aGVuIHVzZXIgaXMgbm90IHR5cGluZ1xuICAgICAgICBuZXh0VGljayhmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgaWYgKHNlbGYuX2JvdW5kICYmICFzZWxmLmZvY3VzZWQpIHtcbiAgICAgICAgICAgIHNlbGYudXBkYXRlKHNlbGYuX3dhdGNoZXIudmFsdWUpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICB9O1xuXG4gICAgICAvLyBhcHBseSBkZWJvdW5jZVxuICAgICAgaWYgKGRlYm91bmNlKSB7XG4gICAgICAgIHRoaXMubGlzdGVuZXIgPSBfZGVib3VuY2UodGhpcy5saXN0ZW5lciwgZGVib3VuY2UpO1xuICAgICAgfVxuXG4gICAgICAvLyBTdXBwb3J0IGpRdWVyeSBldmVudHMsIHNpbmNlIGpRdWVyeS50cmlnZ2VyKCkgZG9lc24ndFxuICAgICAgLy8gdHJpZ2dlciBuYXRpdmUgZXZlbnRzIGluIHNvbWUgY2FzZXMgYW5kIHNvbWUgcGx1Z2luc1xuICAgICAgLy8gcmVseSBvbiAkLnRyaWdnZXIoKVxuICAgICAgLy9cbiAgICAgIC8vIFdlIHdhbnQgdG8gbWFrZSBzdXJlIGlmIGEgbGlzdGVuZXIgaXMgYXR0YWNoZWQgdXNpbmdcbiAgICAgIC8vIGpRdWVyeSwgaXQgaXMgYWxzbyByZW1vdmVkIHdpdGggalF1ZXJ5LCB0aGF0J3Mgd2h5XG4gICAgICAvLyB3ZSBkbyB0aGUgY2hlY2sgZm9yIGVhY2ggZGlyZWN0aXZlIGluc3RhbmNlIGFuZFxuICAgICAgLy8gc3RvcmUgdGhhdCBjaGVjayByZXN1bHQgb24gaXRzZWxmLiBUaGlzIGFsc28gYWxsb3dzXG4gICAgICAvLyBlYXNpZXIgdGVzdCBjb3ZlcmFnZSBjb250cm9sIGJ5IHVuc2V0dGluZyB0aGUgZ2xvYmFsXG4gICAgICAvLyBqUXVlcnkgdmFyaWFibGUgaW4gdGVzdHMuXG4gICAgICB0aGlzLmhhc2pRdWVyeSA9IHR5cGVvZiBqUXVlcnkgPT09ICdmdW5jdGlvbic7XG4gICAgICBpZiAodGhpcy5oYXNqUXVlcnkpIHtcbiAgICAgICAgdmFyIG1ldGhvZCA9IGpRdWVyeS5mbi5vbiA/ICdvbicgOiAnYmluZCc7XG4gICAgICAgIGpRdWVyeShlbClbbWV0aG9kXSgnY2hhbmdlJywgdGhpcy5yYXdMaXN0ZW5lcik7XG4gICAgICAgIGlmICghbGF6eSkge1xuICAgICAgICAgIGpRdWVyeShlbClbbWV0aG9kXSgnaW5wdXQnLCB0aGlzLmxpc3RlbmVyKTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5vbignY2hhbmdlJywgdGhpcy5yYXdMaXN0ZW5lcik7XG4gICAgICAgIGlmICghbGF6eSkge1xuICAgICAgICAgIHRoaXMub24oJ2lucHV0JywgdGhpcy5saXN0ZW5lcik7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgLy8gSUU5IGRvZXNuJ3QgZmlyZSBpbnB1dCBldmVudCBvbiBiYWNrc3BhY2UvZGVsL2N1dFxuICAgICAgaWYgKCFsYXp5ICYmIGlzSUU5KSB7XG4gICAgICAgIHRoaXMub24oJ2N1dCcsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICBuZXh0VGljayhzZWxmLmxpc3RlbmVyKTtcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMub24oJ2tleXVwJywgZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgICBpZiAoZS5rZXlDb2RlID09PSA0NiB8fCBlLmtleUNvZGUgPT09IDgpIHtcbiAgICAgICAgICAgIHNlbGYubGlzdGVuZXIoKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfVxuXG4gICAgICAvLyBzZXQgaW5pdGlhbCB2YWx1ZSBpZiBwcmVzZW50XG4gICAgICBpZiAoZWwuaGFzQXR0cmlidXRlKCd2YWx1ZScpIHx8IGVsLnRhZ05hbWUgPT09ICdURVhUQVJFQScgJiYgZWwudmFsdWUudHJpbSgpKSB7XG4gICAgICAgIHRoaXMuYWZ0ZXJCaW5kID0gdGhpcy5saXN0ZW5lcjtcbiAgICAgIH1cbiAgICB9LFxuXG4gICAgdXBkYXRlOiBmdW5jdGlvbiB1cGRhdGUodmFsdWUpIHtcbiAgICAgIHRoaXMuZWwudmFsdWUgPSBfdG9TdHJpbmcodmFsdWUpO1xuICAgIH0sXG5cbiAgICB1bmJpbmQ6IGZ1bmN0aW9uIHVuYmluZCgpIHtcbiAgICAgIHZhciBlbCA9IHRoaXMuZWw7XG4gICAgICBpZiAodGhpcy5oYXNqUXVlcnkpIHtcbiAgICAgICAgdmFyIG1ldGhvZCA9IGpRdWVyeS5mbi5vZmYgPyAnb2ZmJyA6ICd1bmJpbmQnO1xuICAgICAgICBqUXVlcnkoZWwpW21ldGhvZF0oJ2NoYW5nZScsIHRoaXMubGlzdGVuZXIpO1xuICAgICAgICBqUXVlcnkoZWwpW21ldGhvZF0oJ2lucHV0JywgdGhpcy5saXN0ZW5lcik7XG4gICAgICB9XG4gICAgfVxuICB9O1xuXG4gIHZhciByYWRpbyA9IHtcblxuICAgIGJpbmQ6IGZ1bmN0aW9uIGJpbmQoKSB7XG4gICAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgICB2YXIgZWwgPSB0aGlzLmVsO1xuXG4gICAgICB0aGlzLmdldFZhbHVlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAvLyB2YWx1ZSBvdmVyd3JpdGUgdmlhIHYtYmluZDp2YWx1ZVxuICAgICAgICBpZiAoZWwuaGFzT3duUHJvcGVydHkoJ192YWx1ZScpKSB7XG4gICAgICAgICAgcmV0dXJuIGVsLl92YWx1ZTtcbiAgICAgICAgfVxuICAgICAgICB2YXIgdmFsID0gZWwudmFsdWU7XG4gICAgICAgIGlmIChzZWxmLnBhcmFtcy5udW1iZXIpIHtcbiAgICAgICAgICB2YWwgPSB0b051bWJlcih2YWwpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB2YWw7XG4gICAgICB9O1xuXG4gICAgICB0aGlzLmxpc3RlbmVyID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBzZWxmLnNldChzZWxmLmdldFZhbHVlKCkpO1xuICAgICAgfTtcbiAgICAgIHRoaXMub24oJ2NoYW5nZScsIHRoaXMubGlzdGVuZXIpO1xuXG4gICAgICBpZiAoZWwuaGFzQXR0cmlidXRlKCdjaGVja2VkJykpIHtcbiAgICAgICAgdGhpcy5hZnRlckJpbmQgPSB0aGlzLmxpc3RlbmVyO1xuICAgICAgfVxuICAgIH0sXG5cbiAgICB1cGRhdGU6IGZ1bmN0aW9uIHVwZGF0ZSh2YWx1ZSkge1xuICAgICAgdGhpcy5lbC5jaGVja2VkID0gbG9vc2VFcXVhbCh2YWx1ZSwgdGhpcy5nZXRWYWx1ZSgpKTtcbiAgICB9XG4gIH07XG5cbiAgdmFyIHNlbGVjdCA9IHtcblxuICAgIGJpbmQ6IGZ1bmN0aW9uIGJpbmQoKSB7XG4gICAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgICB2YXIgZWwgPSB0aGlzLmVsO1xuXG4gICAgICAvLyBtZXRob2QgdG8gZm9yY2UgdXBkYXRlIERPTSB1c2luZyBsYXRlc3QgdmFsdWUuXG4gICAgICB0aGlzLmZvcmNlVXBkYXRlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAoc2VsZi5fd2F0Y2hlcikge1xuICAgICAgICAgIHNlbGYudXBkYXRlKHNlbGYuX3dhdGNoZXIuZ2V0KCkpO1xuICAgICAgICB9XG4gICAgICB9O1xuXG4gICAgICAvLyBjaGVjayBpZiB0aGlzIGlzIGEgbXVsdGlwbGUgc2VsZWN0XG4gICAgICB2YXIgbXVsdGlwbGUgPSB0aGlzLm11bHRpcGxlID0gZWwuaGFzQXR0cmlidXRlKCdtdWx0aXBsZScpO1xuXG4gICAgICAvLyBhdHRhY2ggbGlzdGVuZXJcbiAgICAgIHRoaXMubGlzdGVuZXIgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciB2YWx1ZSA9IGdldFZhbHVlKGVsLCBtdWx0aXBsZSk7XG4gICAgICAgIHZhbHVlID0gc2VsZi5wYXJhbXMubnVtYmVyID8gaXNBcnJheSh2YWx1ZSkgPyB2YWx1ZS5tYXAodG9OdW1iZXIpIDogdG9OdW1iZXIodmFsdWUpIDogdmFsdWU7XG4gICAgICAgIHNlbGYuc2V0KHZhbHVlKTtcbiAgICAgIH07XG4gICAgICB0aGlzLm9uKCdjaGFuZ2UnLCB0aGlzLmxpc3RlbmVyKTtcblxuICAgICAgLy8gaWYgaGFzIGluaXRpYWwgdmFsdWUsIHNldCBhZnRlckJpbmRcbiAgICAgIHZhciBpbml0VmFsdWUgPSBnZXRWYWx1ZShlbCwgbXVsdGlwbGUsIHRydWUpO1xuICAgICAgaWYgKG11bHRpcGxlICYmIGluaXRWYWx1ZS5sZW5ndGggfHwgIW11bHRpcGxlICYmIGluaXRWYWx1ZSAhPT0gbnVsbCkge1xuICAgICAgICB0aGlzLmFmdGVyQmluZCA9IHRoaXMubGlzdGVuZXI7XG4gICAgICB9XG5cbiAgICAgIC8vIEFsbCBtYWpvciBicm93c2VycyBleGNlcHQgRmlyZWZveCByZXNldHNcbiAgICAgIC8vIHNlbGVjdGVkSW5kZXggd2l0aCB2YWx1ZSAtMSB0byAwIHdoZW4gdGhlIGVsZW1lbnRcbiAgICAgIC8vIGlzIGFwcGVuZGVkIHRvIGEgbmV3IHBhcmVudCwgdGhlcmVmb3JlIHdlIGhhdmUgdG9cbiAgICAgIC8vIGZvcmNlIGEgRE9NIHVwZGF0ZSB3aGVuZXZlciB0aGF0IGhhcHBlbnMuLi5cbiAgICAgIHRoaXMudm0uJG9uKCdob29rOmF0dGFjaGVkJywgdGhpcy5mb3JjZVVwZGF0ZSk7XG4gICAgfSxcblxuICAgIHVwZGF0ZTogZnVuY3Rpb24gdXBkYXRlKHZhbHVlKSB7XG4gICAgICB2YXIgZWwgPSB0aGlzLmVsO1xuICAgICAgZWwuc2VsZWN0ZWRJbmRleCA9IC0xO1xuICAgICAgdmFyIG11bHRpID0gdGhpcy5tdWx0aXBsZSAmJiBpc0FycmF5KHZhbHVlKTtcbiAgICAgIHZhciBvcHRpb25zID0gZWwub3B0aW9ucztcbiAgICAgIHZhciBpID0gb3B0aW9ucy5sZW5ndGg7XG4gICAgICB2YXIgb3AsIHZhbDtcbiAgICAgIHdoaWxlIChpLS0pIHtcbiAgICAgICAgb3AgPSBvcHRpb25zW2ldO1xuICAgICAgICB2YWwgPSBvcC5oYXNPd25Qcm9wZXJ0eSgnX3ZhbHVlJykgPyBvcC5fdmFsdWUgOiBvcC52YWx1ZTtcbiAgICAgICAgLyogZXNsaW50LWRpc2FibGUgZXFlcWVxICovXG4gICAgICAgIG9wLnNlbGVjdGVkID0gbXVsdGkgPyBpbmRleE9mJDEodmFsdWUsIHZhbCkgPiAtMSA6IGxvb3NlRXF1YWwodmFsdWUsIHZhbCk7XG4gICAgICAgIC8qIGVzbGludC1lbmFibGUgZXFlcWVxICovXG4gICAgICB9XG4gICAgfSxcblxuICAgIHVuYmluZDogZnVuY3Rpb24gdW5iaW5kKCkge1xuICAgICAgLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cbiAgICAgIHRoaXMudm0uJG9mZignaG9vazphdHRhY2hlZCcsIHRoaXMuZm9yY2VVcGRhdGUpO1xuICAgIH1cbiAgfTtcblxuICAvKipcbiAgICogR2V0IHNlbGVjdCB2YWx1ZVxuICAgKlxuICAgKiBAcGFyYW0ge1NlbGVjdEVsZW1lbnR9IGVsXG4gICAqIEBwYXJhbSB7Qm9vbGVhbn0gbXVsdGlcbiAgICogQHBhcmFtIHtCb29sZWFufSBpbml0XG4gICAqIEByZXR1cm4ge0FycmF5fCp9XG4gICAqL1xuXG4gIGZ1bmN0aW9uIGdldFZhbHVlKGVsLCBtdWx0aSwgaW5pdCkge1xuICAgIHZhciByZXMgPSBtdWx0aSA/IFtdIDogbnVsbDtcbiAgICB2YXIgb3AsIHZhbCwgc2VsZWN0ZWQ7XG4gICAgZm9yICh2YXIgaSA9IDAsIGwgPSBlbC5vcHRpb25zLmxlbmd0aDsgaSA8IGw7IGkrKykge1xuICAgICAgb3AgPSBlbC5vcHRpb25zW2ldO1xuICAgICAgc2VsZWN0ZWQgPSBpbml0ID8gb3AuaGFzQXR0cmlidXRlKCdzZWxlY3RlZCcpIDogb3Auc2VsZWN0ZWQ7XG4gICAgICBpZiAoc2VsZWN0ZWQpIHtcbiAgICAgICAgdmFsID0gb3AuaGFzT3duUHJvcGVydHkoJ192YWx1ZScpID8gb3AuX3ZhbHVlIDogb3AudmFsdWU7XG4gICAgICAgIGlmIChtdWx0aSkge1xuICAgICAgICAgIHJlcy5wdXNoKHZhbCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmV0dXJuIHZhbDtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gcmVzO1xuICB9XG5cbiAgLyoqXG4gICAqIE5hdGl2ZSBBcnJheS5pbmRleE9mIHVzZXMgc3RyaWN0IGVxdWFsLCBidXQgaW4gdGhpc1xuICAgKiBjYXNlIHdlIG5lZWQgdG8gbWF0Y2ggc3RyaW5nL251bWJlcnMgd2l0aCBjdXN0b20gZXF1YWwuXG4gICAqXG4gICAqIEBwYXJhbSB7QXJyYXl9IGFyclxuICAgKiBAcGFyYW0geyp9IHZhbFxuICAgKi9cblxuICBmdW5jdGlvbiBpbmRleE9mJDEoYXJyLCB2YWwpIHtcbiAgICB2YXIgaSA9IGFyci5sZW5ndGg7XG4gICAgd2hpbGUgKGktLSkge1xuICAgICAgaWYgKGxvb3NlRXF1YWwoYXJyW2ldLCB2YWwpKSB7XG4gICAgICAgIHJldHVybiBpO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gLTE7XG4gIH1cblxuICB2YXIgY2hlY2tib3ggPSB7XG5cbiAgICBiaW5kOiBmdW5jdGlvbiBiaW5kKCkge1xuICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgICAgdmFyIGVsID0gdGhpcy5lbDtcblxuICAgICAgdGhpcy5nZXRWYWx1ZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIGVsLmhhc093blByb3BlcnR5KCdfdmFsdWUnKSA/IGVsLl92YWx1ZSA6IHNlbGYucGFyYW1zLm51bWJlciA/IHRvTnVtYmVyKGVsLnZhbHVlKSA6IGVsLnZhbHVlO1xuICAgICAgfTtcblxuICAgICAgZnVuY3Rpb24gZ2V0Qm9vbGVhblZhbHVlKCkge1xuICAgICAgICB2YXIgdmFsID0gZWwuY2hlY2tlZDtcbiAgICAgICAgaWYgKHZhbCAmJiBlbC5oYXNPd25Qcm9wZXJ0eSgnX3RydWVWYWx1ZScpKSB7XG4gICAgICAgICAgcmV0dXJuIGVsLl90cnVlVmFsdWU7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCF2YWwgJiYgZWwuaGFzT3duUHJvcGVydHkoJ19mYWxzZVZhbHVlJykpIHtcbiAgICAgICAgICByZXR1cm4gZWwuX2ZhbHNlVmFsdWU7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHZhbDtcbiAgICAgIH1cblxuICAgICAgdGhpcy5saXN0ZW5lciA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIG1vZGVsID0gc2VsZi5fd2F0Y2hlci52YWx1ZTtcbiAgICAgICAgaWYgKGlzQXJyYXkobW9kZWwpKSB7XG4gICAgICAgICAgdmFyIHZhbCA9IHNlbGYuZ2V0VmFsdWUoKTtcbiAgICAgICAgICBpZiAoZWwuY2hlY2tlZCkge1xuICAgICAgICAgICAgaWYgKGluZGV4T2YobW9kZWwsIHZhbCkgPCAwKSB7XG4gICAgICAgICAgICAgIG1vZGVsLnB1c2godmFsKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgbW9kZWwuJHJlbW92ZSh2YWwpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBzZWxmLnNldChnZXRCb29sZWFuVmFsdWUoKSk7XG4gICAgICAgIH1cbiAgICAgIH07XG5cbiAgICAgIHRoaXMub24oJ2NoYW5nZScsIHRoaXMubGlzdGVuZXIpO1xuICAgICAgaWYgKGVsLmhhc0F0dHJpYnV0ZSgnY2hlY2tlZCcpKSB7XG4gICAgICAgIHRoaXMuYWZ0ZXJCaW5kID0gdGhpcy5saXN0ZW5lcjtcbiAgICAgIH1cbiAgICB9LFxuXG4gICAgdXBkYXRlOiBmdW5jdGlvbiB1cGRhdGUodmFsdWUpIHtcbiAgICAgIHZhciBlbCA9IHRoaXMuZWw7XG4gICAgICBpZiAoaXNBcnJheSh2YWx1ZSkpIHtcbiAgICAgICAgZWwuY2hlY2tlZCA9IGluZGV4T2YodmFsdWUsIHRoaXMuZ2V0VmFsdWUoKSkgPiAtMTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGlmIChlbC5oYXNPd25Qcm9wZXJ0eSgnX3RydWVWYWx1ZScpKSB7XG4gICAgICAgICAgZWwuY2hlY2tlZCA9IGxvb3NlRXF1YWwodmFsdWUsIGVsLl90cnVlVmFsdWUpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGVsLmNoZWNrZWQgPSAhIXZhbHVlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9O1xuXG4gIHZhciBoYW5kbGVycyA9IHtcbiAgICB0ZXh0OiB0ZXh0JDIsXG4gICAgcmFkaW86IHJhZGlvLFxuICAgIHNlbGVjdDogc2VsZWN0LFxuICAgIGNoZWNrYm94OiBjaGVja2JveFxuICB9O1xuXG4gIHZhciBtb2RlbCA9IHtcblxuICAgIHByaW9yaXR5OiBNT0RFTCxcbiAgICB0d29XYXk6IHRydWUsXG4gICAgaGFuZGxlcnM6IGhhbmRsZXJzLFxuICAgIHBhcmFtczogWydsYXp5JywgJ251bWJlcicsICdkZWJvdW5jZSddLFxuXG4gICAgLyoqXG4gICAgICogUG9zc2libGUgZWxlbWVudHM6XG4gICAgICogICA8c2VsZWN0PlxuICAgICAqICAgPHRleHRhcmVhPlxuICAgICAqICAgPGlucHV0IHR5cGU9XCIqXCI+XG4gICAgICogICAgIC0gdGV4dFxuICAgICAqICAgICAtIGNoZWNrYm94XG4gICAgICogICAgIC0gcmFkaW9cbiAgICAgKiAgICAgLSBudW1iZXJcbiAgICAgKi9cblxuICAgIGJpbmQ6IGZ1bmN0aW9uIGJpbmQoKSB7XG4gICAgICAvLyBmcmllbmRseSB3YXJuaW5nLi4uXG4gICAgICB0aGlzLmNoZWNrRmlsdGVycygpO1xuICAgICAgaWYgKHRoaXMuaGFzUmVhZCAmJiAhdGhpcy5oYXNXcml0ZSkge1xuICAgICAgICAnZGV2ZWxvcG1lbnQnICE9PSAncHJvZHVjdGlvbicgJiYgd2FybignSXQgc2VlbXMgeW91IGFyZSB1c2luZyBhIHJlYWQtb25seSBmaWx0ZXIgd2l0aCAnICsgJ3YtbW9kZWw9XCInICsgdGhpcy5kZXNjcmlwdG9yLnJhdyArICdcIi4gJyArICdZb3UgbWlnaHQgd2FudCB0byB1c2UgYSB0d28td2F5IGZpbHRlciB0byBlbnN1cmUgY29ycmVjdCBiZWhhdmlvci4nLCB0aGlzLnZtKTtcbiAgICAgIH1cbiAgICAgIHZhciBlbCA9IHRoaXMuZWw7XG4gICAgICB2YXIgdGFnID0gZWwudGFnTmFtZTtcbiAgICAgIHZhciBoYW5kbGVyO1xuICAgICAgaWYgKHRhZyA9PT0gJ0lOUFVUJykge1xuICAgICAgICBoYW5kbGVyID0gaGFuZGxlcnNbZWwudHlwZV0gfHwgaGFuZGxlcnMudGV4dDtcbiAgICAgIH0gZWxzZSBpZiAodGFnID09PSAnU0VMRUNUJykge1xuICAgICAgICBoYW5kbGVyID0gaGFuZGxlcnMuc2VsZWN0O1xuICAgICAgfSBlbHNlIGlmICh0YWcgPT09ICdURVhUQVJFQScpIHtcbiAgICAgICAgaGFuZGxlciA9IGhhbmRsZXJzLnRleHQ7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAnZGV2ZWxvcG1lbnQnICE9PSAncHJvZHVjdGlvbicgJiYgd2Fybigndi1tb2RlbCBkb2VzIG5vdCBzdXBwb3J0IGVsZW1lbnQgdHlwZTogJyArIHRhZywgdGhpcy52bSk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIGVsLl9fdl9tb2RlbCA9IHRoaXM7XG4gICAgICBoYW5kbGVyLmJpbmQuY2FsbCh0aGlzKTtcbiAgICAgIHRoaXMudXBkYXRlID0gaGFuZGxlci51cGRhdGU7XG4gICAgICB0aGlzLl91bmJpbmQgPSBoYW5kbGVyLnVuYmluZDtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogQ2hlY2sgcmVhZC93cml0ZSBmaWx0ZXIgc3RhdHMuXG4gICAgICovXG5cbiAgICBjaGVja0ZpbHRlcnM6IGZ1bmN0aW9uIGNoZWNrRmlsdGVycygpIHtcbiAgICAgIHZhciBmaWx0ZXJzID0gdGhpcy5maWx0ZXJzO1xuICAgICAgaWYgKCFmaWx0ZXJzKSByZXR1cm47XG4gICAgICB2YXIgaSA9IGZpbHRlcnMubGVuZ3RoO1xuICAgICAgd2hpbGUgKGktLSkge1xuICAgICAgICB2YXIgZmlsdGVyID0gcmVzb2x2ZUFzc2V0KHRoaXMudm0uJG9wdGlvbnMsICdmaWx0ZXJzJywgZmlsdGVyc1tpXS5uYW1lKTtcbiAgICAgICAgaWYgKHR5cGVvZiBmaWx0ZXIgPT09ICdmdW5jdGlvbicgfHwgZmlsdGVyLnJlYWQpIHtcbiAgICAgICAgICB0aGlzLmhhc1JlYWQgPSB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIGlmIChmaWx0ZXIud3JpdGUpIHtcbiAgICAgICAgICB0aGlzLmhhc1dyaXRlID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0sXG5cbiAgICB1bmJpbmQ6IGZ1bmN0aW9uIHVuYmluZCgpIHtcbiAgICAgIHRoaXMuZWwuX192X21vZGVsID0gbnVsbDtcbiAgICAgIHRoaXMuX3VuYmluZCAmJiB0aGlzLl91bmJpbmQoKTtcbiAgICB9XG4gIH07XG5cbiAgLy8ga2V5Q29kZSBhbGlhc2VzXG4gIHZhciBrZXlDb2RlcyA9IHtcbiAgICBlc2M6IDI3LFxuICAgIHRhYjogOSxcbiAgICBlbnRlcjogMTMsXG4gICAgc3BhY2U6IDMyLFxuICAgICdkZWxldGUnOiBbOCwgNDZdLFxuICAgIHVwOiAzOCxcbiAgICBsZWZ0OiAzNyxcbiAgICByaWdodDogMzksXG4gICAgZG93bjogNDBcbiAgfTtcblxuICBmdW5jdGlvbiBrZXlGaWx0ZXIoaGFuZGxlciwga2V5cykge1xuICAgIHZhciBjb2RlcyA9IGtleXMubWFwKGZ1bmN0aW9uIChrZXkpIHtcbiAgICAgIHZhciBjaGFyQ29kZSA9IGtleS5jaGFyQ29kZUF0KDApO1xuICAgICAgaWYgKGNoYXJDb2RlID4gNDcgJiYgY2hhckNvZGUgPCA1OCkge1xuICAgICAgICByZXR1cm4gcGFyc2VJbnQoa2V5LCAxMCk7XG4gICAgICB9XG4gICAgICBpZiAoa2V5Lmxlbmd0aCA9PT0gMSkge1xuICAgICAgICBjaGFyQ29kZSA9IGtleS50b1VwcGVyQ2FzZSgpLmNoYXJDb2RlQXQoMCk7XG4gICAgICAgIGlmIChjaGFyQ29kZSA+IDY0ICYmIGNoYXJDb2RlIDwgOTEpIHtcbiAgICAgICAgICByZXR1cm4gY2hhckNvZGU7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiBrZXlDb2Rlc1trZXldO1xuICAgIH0pO1xuICAgIGNvZGVzID0gW10uY29uY2F0LmFwcGx5KFtdLCBjb2Rlcyk7XG4gICAgcmV0dXJuIGZ1bmN0aW9uIGtleUhhbmRsZXIoZSkge1xuICAgICAgaWYgKGNvZGVzLmluZGV4T2YoZS5rZXlDb2RlKSA+IC0xKSB7XG4gICAgICAgIHJldHVybiBoYW5kbGVyLmNhbGwodGhpcywgZSk7XG4gICAgICB9XG4gICAgfTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHN0b3BGaWx0ZXIoaGFuZGxlcikge1xuICAgIHJldHVybiBmdW5jdGlvbiBzdG9wSGFuZGxlcihlKSB7XG4gICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgcmV0dXJuIGhhbmRsZXIuY2FsbCh0aGlzLCBlKTtcbiAgICB9O1xuICB9XG5cbiAgZnVuY3Rpb24gcHJldmVudEZpbHRlcihoYW5kbGVyKSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uIHByZXZlbnRIYW5kbGVyKGUpIHtcbiAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgIHJldHVybiBoYW5kbGVyLmNhbGwodGhpcywgZSk7XG4gICAgfTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHNlbGZGaWx0ZXIoaGFuZGxlcikge1xuICAgIHJldHVybiBmdW5jdGlvbiBzZWxmSGFuZGxlcihlKSB7XG4gICAgICBpZiAoZS50YXJnZXQgPT09IGUuY3VycmVudFRhcmdldCkge1xuICAgICAgICByZXR1cm4gaGFuZGxlci5jYWxsKHRoaXMsIGUpO1xuICAgICAgfVxuICAgIH07XG4gIH1cblxuICB2YXIgb24kMSA9IHtcblxuICAgIHByaW9yaXR5OiBPTixcbiAgICBhY2NlcHRTdGF0ZW1lbnQ6IHRydWUsXG4gICAga2V5Q29kZXM6IGtleUNvZGVzLFxuXG4gICAgYmluZDogZnVuY3Rpb24gYmluZCgpIHtcbiAgICAgIC8vIGRlYWwgd2l0aCBpZnJhbWVzXG4gICAgICBpZiAodGhpcy5lbC50YWdOYW1lID09PSAnSUZSQU1FJyAmJiB0aGlzLmFyZyAhPT0gJ2xvYWQnKSB7XG4gICAgICAgIHZhciBzZWxmID0gdGhpcztcbiAgICAgICAgdGhpcy5pZnJhbWVCaW5kID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgIG9uKHNlbGYuZWwuY29udGVudFdpbmRvdywgc2VsZi5hcmcsIHNlbGYuaGFuZGxlciwgc2VsZi5tb2RpZmllcnMuY2FwdHVyZSk7XG4gICAgICAgIH07XG4gICAgICAgIHRoaXMub24oJ2xvYWQnLCB0aGlzLmlmcmFtZUJpbmQpO1xuICAgICAgfVxuICAgIH0sXG5cbiAgICB1cGRhdGU6IGZ1bmN0aW9uIHVwZGF0ZShoYW5kbGVyKSB7XG4gICAgICAvLyBzdHViIGEgbm9vcCBmb3Igdi1vbiB3aXRoIG5vIHZhbHVlLFxuICAgICAgLy8gZS5nLiBAbW91c2Vkb3duLnByZXZlbnRcbiAgICAgIGlmICghdGhpcy5kZXNjcmlwdG9yLnJhdykge1xuICAgICAgICBoYW5kbGVyID0gZnVuY3Rpb24gKCkge307XG4gICAgICB9XG5cbiAgICAgIGlmICh0eXBlb2YgaGFuZGxlciAhPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAnZGV2ZWxvcG1lbnQnICE9PSAncHJvZHVjdGlvbicgJiYgd2Fybigndi1vbjonICsgdGhpcy5hcmcgKyAnPVwiJyArIHRoaXMuZXhwcmVzc2lvbiArICdcIiBleHBlY3RzIGEgZnVuY3Rpb24gdmFsdWUsICcgKyAnZ290ICcgKyBoYW5kbGVyLCB0aGlzLnZtKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICAvLyBhcHBseSBtb2RpZmllcnNcbiAgICAgIGlmICh0aGlzLm1vZGlmaWVycy5zdG9wKSB7XG4gICAgICAgIGhhbmRsZXIgPSBzdG9wRmlsdGVyKGhhbmRsZXIpO1xuICAgICAgfVxuICAgICAgaWYgKHRoaXMubW9kaWZpZXJzLnByZXZlbnQpIHtcbiAgICAgICAgaGFuZGxlciA9IHByZXZlbnRGaWx0ZXIoaGFuZGxlcik7XG4gICAgICB9XG4gICAgICBpZiAodGhpcy5tb2RpZmllcnMuc2VsZikge1xuICAgICAgICBoYW5kbGVyID0gc2VsZkZpbHRlcihoYW5kbGVyKTtcbiAgICAgIH1cbiAgICAgIC8vIGtleSBmaWx0ZXJcbiAgICAgIHZhciBrZXlzID0gT2JqZWN0LmtleXModGhpcy5tb2RpZmllcnMpLmZpbHRlcihmdW5jdGlvbiAoa2V5KSB7XG4gICAgICAgIHJldHVybiBrZXkgIT09ICdzdG9wJyAmJiBrZXkgIT09ICdwcmV2ZW50JyAmJiBrZXkgIT09ICdzZWxmJyAmJiBrZXkgIT09ICdjYXB0dXJlJztcbiAgICAgIH0pO1xuICAgICAgaWYgKGtleXMubGVuZ3RoKSB7XG4gICAgICAgIGhhbmRsZXIgPSBrZXlGaWx0ZXIoaGFuZGxlciwga2V5cyk7XG4gICAgICB9XG5cbiAgICAgIHRoaXMucmVzZXQoKTtcbiAgICAgIHRoaXMuaGFuZGxlciA9IGhhbmRsZXI7XG5cbiAgICAgIGlmICh0aGlzLmlmcmFtZUJpbmQpIHtcbiAgICAgICAgdGhpcy5pZnJhbWVCaW5kKCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBvbih0aGlzLmVsLCB0aGlzLmFyZywgdGhpcy5oYW5kbGVyLCB0aGlzLm1vZGlmaWVycy5jYXB0dXJlKTtcbiAgICAgIH1cbiAgICB9LFxuXG4gICAgcmVzZXQ6IGZ1bmN0aW9uIHJlc2V0KCkge1xuICAgICAgdmFyIGVsID0gdGhpcy5pZnJhbWVCaW5kID8gdGhpcy5lbC5jb250ZW50V2luZG93IDogdGhpcy5lbDtcbiAgICAgIGlmICh0aGlzLmhhbmRsZXIpIHtcbiAgICAgICAgb2ZmKGVsLCB0aGlzLmFyZywgdGhpcy5oYW5kbGVyKTtcbiAgICAgIH1cbiAgICB9LFxuXG4gICAgdW5iaW5kOiBmdW5jdGlvbiB1bmJpbmQoKSB7XG4gICAgICB0aGlzLnJlc2V0KCk7XG4gICAgfVxuICB9O1xuXG4gIHZhciBwcmVmaXhlcyA9IFsnLXdlYmtpdC0nLCAnLW1vei0nLCAnLW1zLSddO1xuICB2YXIgY2FtZWxQcmVmaXhlcyA9IFsnV2Via2l0JywgJ01veicsICdtcyddO1xuICB2YXIgaW1wb3J0YW50UkUgPSAvIWltcG9ydGFudDs/JC87XG4gIHZhciBwcm9wQ2FjaGUgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuXG4gIHZhciB0ZXN0RWwgPSBudWxsO1xuXG4gIHZhciBzdHlsZSA9IHtcblxuICAgIGRlZXA6IHRydWUsXG5cbiAgICB1cGRhdGU6IGZ1bmN0aW9uIHVwZGF0ZSh2YWx1ZSkge1xuICAgICAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgdGhpcy5lbC5zdHlsZS5jc3NUZXh0ID0gdmFsdWU7XG4gICAgICB9IGVsc2UgaWYgKGlzQXJyYXkodmFsdWUpKSB7XG4gICAgICAgIHRoaXMuaGFuZGxlT2JqZWN0KHZhbHVlLnJlZHVjZShleHRlbmQsIHt9KSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLmhhbmRsZU9iamVjdCh2YWx1ZSB8fCB7fSk7XG4gICAgICB9XG4gICAgfSxcblxuICAgIGhhbmRsZU9iamVjdDogZnVuY3Rpb24gaGFuZGxlT2JqZWN0KHZhbHVlKSB7XG4gICAgICAvLyBjYWNoZSBvYmplY3Qgc3R5bGVzIHNvIHRoYXQgb25seSBjaGFuZ2VkIHByb3BzXG4gICAgICAvLyBhcmUgYWN0dWFsbHkgdXBkYXRlZC5cbiAgICAgIHZhciBjYWNoZSA9IHRoaXMuY2FjaGUgfHwgKHRoaXMuY2FjaGUgPSB7fSk7XG4gICAgICB2YXIgbmFtZSwgdmFsO1xuICAgICAgZm9yIChuYW1lIGluIGNhY2hlKSB7XG4gICAgICAgIGlmICghKG5hbWUgaW4gdmFsdWUpKSB7XG4gICAgICAgICAgdGhpcy5oYW5kbGVTaW5nbGUobmFtZSwgbnVsbCk7XG4gICAgICAgICAgZGVsZXRlIGNhY2hlW25hbWVdO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBmb3IgKG5hbWUgaW4gdmFsdWUpIHtcbiAgICAgICAgdmFsID0gdmFsdWVbbmFtZV07XG4gICAgICAgIGlmICh2YWwgIT09IGNhY2hlW25hbWVdKSB7XG4gICAgICAgICAgY2FjaGVbbmFtZV0gPSB2YWw7XG4gICAgICAgICAgdGhpcy5oYW5kbGVTaW5nbGUobmFtZSwgdmFsKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0sXG5cbiAgICBoYW5kbGVTaW5nbGU6IGZ1bmN0aW9uIGhhbmRsZVNpbmdsZShwcm9wLCB2YWx1ZSkge1xuICAgICAgcHJvcCA9IG5vcm1hbGl6ZShwcm9wKTtcbiAgICAgIGlmICghcHJvcCkgcmV0dXJuOyAvLyB1bnN1cHBvcnRlZCBwcm9wXG4gICAgICAvLyBjYXN0IHBvc3NpYmxlIG51bWJlcnMvYm9vbGVhbnMgaW50byBzdHJpbmdzXG4gICAgICBpZiAodmFsdWUgIT0gbnVsbCkgdmFsdWUgKz0gJyc7XG4gICAgICBpZiAodmFsdWUpIHtcbiAgICAgICAgdmFyIGlzSW1wb3J0YW50ID0gaW1wb3J0YW50UkUudGVzdCh2YWx1ZSkgPyAnaW1wb3J0YW50JyA6ICcnO1xuICAgICAgICBpZiAoaXNJbXBvcnRhbnQpIHtcbiAgICAgICAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgaWYgKi9cbiAgICAgICAgICBpZiAoJ2RldmVsb3BtZW50JyAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgICAgICAgICB3YXJuKCdJdFxcJ3MgcHJvYmFibHkgYSBiYWQgaWRlYSB0byB1c2UgIWltcG9ydGFudCB3aXRoIGlubGluZSBydWxlcy4gJyArICdUaGlzIGZlYXR1cmUgd2lsbCBiZSBkZXByZWNhdGVkIGluIGEgZnV0dXJlIHZlcnNpb24gb2YgVnVlLicpO1xuICAgICAgICAgIH1cbiAgICAgICAgICB2YWx1ZSA9IHZhbHVlLnJlcGxhY2UoaW1wb3J0YW50UkUsICcnKS50cmltKCk7XG4gICAgICAgICAgdGhpcy5lbC5zdHlsZS5zZXRQcm9wZXJ0eShwcm9wLmtlYmFiLCB2YWx1ZSwgaXNJbXBvcnRhbnQpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRoaXMuZWwuc3R5bGVbcHJvcC5jYW1lbF0gPSB2YWx1ZTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5lbC5zdHlsZVtwcm9wLmNhbWVsXSA9ICcnO1xuICAgICAgfVxuICAgIH1cblxuICB9O1xuXG4gIC8qKlxuICAgKiBOb3JtYWxpemUgYSBDU1MgcHJvcGVydHkgbmFtZS5cbiAgICogLSBjYWNoZSByZXN1bHRcbiAgICogLSBhdXRvIHByZWZpeFxuICAgKiAtIGNhbWVsQ2FzZSAtPiBkYXNoLWNhc2VcbiAgICpcbiAgICogQHBhcmFtIHtTdHJpbmd9IHByb3BcbiAgICogQHJldHVybiB7U3RyaW5nfVxuICAgKi9cblxuICBmdW5jdGlvbiBub3JtYWxpemUocHJvcCkge1xuICAgIGlmIChwcm9wQ2FjaGVbcHJvcF0pIHtcbiAgICAgIHJldHVybiBwcm9wQ2FjaGVbcHJvcF07XG4gICAgfVxuICAgIHZhciByZXMgPSBwcmVmaXgocHJvcCk7XG4gICAgcHJvcENhY2hlW3Byb3BdID0gcHJvcENhY2hlW3Jlc10gPSByZXM7XG4gICAgcmV0dXJuIHJlcztcbiAgfVxuXG4gIC8qKlxuICAgKiBBdXRvIGRldGVjdCB0aGUgYXBwcm9wcmlhdGUgcHJlZml4IGZvciBhIENTUyBwcm9wZXJ0eS5cbiAgICogaHR0cHM6Ly9naXN0LmdpdGh1Yi5jb20vcGF1bGlyaXNoLzUyMzY5MlxuICAgKlxuICAgKiBAcGFyYW0ge1N0cmluZ30gcHJvcFxuICAgKiBAcmV0dXJuIHtTdHJpbmd9XG4gICAqL1xuXG4gIGZ1bmN0aW9uIHByZWZpeChwcm9wKSB7XG4gICAgcHJvcCA9IGh5cGhlbmF0ZShwcm9wKTtcbiAgICB2YXIgY2FtZWwgPSBjYW1lbGl6ZShwcm9wKTtcbiAgICB2YXIgdXBwZXIgPSBjYW1lbC5jaGFyQXQoMCkudG9VcHBlckNhc2UoKSArIGNhbWVsLnNsaWNlKDEpO1xuICAgIGlmICghdGVzdEVsKSB7XG4gICAgICB0ZXN0RWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICB9XG4gICAgdmFyIGkgPSBwcmVmaXhlcy5sZW5ndGg7XG4gICAgdmFyIHByZWZpeGVkO1xuICAgIGlmIChjYW1lbCAhPT0gJ2ZpbHRlcicgJiYgY2FtZWwgaW4gdGVzdEVsLnN0eWxlKSB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICBrZWJhYjogcHJvcCxcbiAgICAgICAgY2FtZWw6IGNhbWVsXG4gICAgICB9O1xuICAgIH1cbiAgICB3aGlsZSAoaS0tKSB7XG4gICAgICBwcmVmaXhlZCA9IGNhbWVsUHJlZml4ZXNbaV0gKyB1cHBlcjtcbiAgICAgIGlmIChwcmVmaXhlZCBpbiB0ZXN0RWwuc3R5bGUpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICBrZWJhYjogcHJlZml4ZXNbaV0gKyBwcm9wLFxuICAgICAgICAgIGNhbWVsOiBwcmVmaXhlZFxuICAgICAgICB9O1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8vIHhsaW5rXG4gIHZhciB4bGlua05TID0gJ2h0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsnO1xuICB2YXIgeGxpbmtSRSA9IC9eeGxpbms6LztcblxuICAvLyBjaGVjayBmb3IgYXR0cmlidXRlcyB0aGF0IHByb2hpYml0IGludGVycG9sYXRpb25zXG4gIHZhciBkaXNhbGxvd2VkSW50ZXJwQXR0clJFID0gL152LXxeOnxeQHxeKD86aXN8dHJhbnNpdGlvbnx0cmFuc2l0aW9uLW1vZGV8ZGVib3VuY2V8dHJhY2stYnl8c3RhZ2dlcnxlbnRlci1zdGFnZ2VyfGxlYXZlLXN0YWdnZXIpJC87XG4gIC8vIHRoZXNlIGF0dHJpYnV0ZXMgc2hvdWxkIGFsc28gc2V0IHRoZWlyIGNvcnJlc3BvbmRpbmcgcHJvcGVydGllc1xuICAvLyBiZWNhdXNlIHRoZXkgb25seSBhZmZlY3QgdGhlIGluaXRpYWwgc3RhdGUgb2YgdGhlIGVsZW1lbnRcbiAgdmFyIGF0dHJXaXRoUHJvcHNSRSA9IC9eKD86dmFsdWV8Y2hlY2tlZHxzZWxlY3RlZHxtdXRlZCkkLztcbiAgLy8gdGhlc2UgYXR0cmlidXRlcyBleHBlY3QgZW51bXJhdGVkIHZhbHVlcyBvZiBcInRydWVcIiBvciBcImZhbHNlXCJcbiAgLy8gYnV0IGFyZSBub3QgYm9vbGVhbiBhdHRyaWJ1dGVzXG4gIHZhciBlbnVtZXJhdGVkQXR0clJFID0gL14oPzpkcmFnZ2FibGV8Y29udGVudGVkaXRhYmxlfHNwZWxsY2hlY2spJC87XG5cbiAgLy8gdGhlc2UgYXR0cmlidXRlcyBzaG91bGQgc2V0IGEgaGlkZGVuIHByb3BlcnR5IGZvclxuICAvLyBiaW5kaW5nIHYtbW9kZWwgdG8gb2JqZWN0IHZhbHVlc1xuICB2YXIgbW9kZWxQcm9wcyA9IHtcbiAgICB2YWx1ZTogJ192YWx1ZScsXG4gICAgJ3RydWUtdmFsdWUnOiAnX3RydWVWYWx1ZScsXG4gICAgJ2ZhbHNlLXZhbHVlJzogJ19mYWxzZVZhbHVlJ1xuICB9O1xuXG4gIHZhciBiaW5kJDEgPSB7XG5cbiAgICBwcmlvcml0eTogQklORCxcblxuICAgIGJpbmQ6IGZ1bmN0aW9uIGJpbmQoKSB7XG4gICAgICB2YXIgYXR0ciA9IHRoaXMuYXJnO1xuICAgICAgdmFyIHRhZyA9IHRoaXMuZWwudGFnTmFtZTtcbiAgICAgIC8vIHNob3VsZCBiZSBkZWVwIHdhdGNoIG9uIG9iamVjdCBtb2RlXG4gICAgICBpZiAoIWF0dHIpIHtcbiAgICAgICAgdGhpcy5kZWVwID0gdHJ1ZTtcbiAgICAgIH1cbiAgICAgIC8vIGhhbmRsZSBpbnRlcnBvbGF0aW9uIGJpbmRpbmdzXG4gICAgICB2YXIgZGVzY3JpcHRvciA9IHRoaXMuZGVzY3JpcHRvcjtcbiAgICAgIHZhciB0b2tlbnMgPSBkZXNjcmlwdG9yLmludGVycDtcbiAgICAgIGlmICh0b2tlbnMpIHtcbiAgICAgICAgLy8gaGFuZGxlIGludGVycG9sYXRpb25zIHdpdGggb25lLXRpbWUgdG9rZW5zXG4gICAgICAgIGlmIChkZXNjcmlwdG9yLmhhc09uZVRpbWUpIHtcbiAgICAgICAgICB0aGlzLmV4cHJlc3Npb24gPSB0b2tlbnNUb0V4cCh0b2tlbnMsIHRoaXMuX3Njb3BlIHx8IHRoaXMudm0pO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gb25seSBhbGxvdyBiaW5kaW5nIG9uIG5hdGl2ZSBhdHRyaWJ1dGVzXG4gICAgICAgIGlmIChkaXNhbGxvd2VkSW50ZXJwQXR0clJFLnRlc3QoYXR0cikgfHwgYXR0ciA9PT0gJ25hbWUnICYmICh0YWcgPT09ICdQQVJUSUFMJyB8fCB0YWcgPT09ICdTTE9UJykpIHtcbiAgICAgICAgICAnZGV2ZWxvcG1lbnQnICE9PSAncHJvZHVjdGlvbicgJiYgd2FybihhdHRyICsgJz1cIicgKyBkZXNjcmlwdG9yLnJhdyArICdcIjogJyArICdhdHRyaWJ1dGUgaW50ZXJwb2xhdGlvbiBpcyBub3QgYWxsb3dlZCBpbiBWdWUuanMgJyArICdkaXJlY3RpdmVzIGFuZCBzcGVjaWFsIGF0dHJpYnV0ZXMuJywgdGhpcy52bSk7XG4gICAgICAgICAgdGhpcy5lbC5yZW1vdmVBdHRyaWJ1dGUoYXR0cik7XG4gICAgICAgICAgdGhpcy5pbnZhbGlkID0gdHJ1ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBpZiAqL1xuICAgICAgICBpZiAoJ2RldmVsb3BtZW50JyAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgICAgICAgdmFyIHJhdyA9IGF0dHIgKyAnPVwiJyArIGRlc2NyaXB0b3IucmF3ICsgJ1wiOiAnO1xuICAgICAgICAgIC8vIHdhcm4gc3JjXG4gICAgICAgICAgaWYgKGF0dHIgPT09ICdzcmMnKSB7XG4gICAgICAgICAgICB3YXJuKHJhdyArICdpbnRlcnBvbGF0aW9uIGluIFwic3JjXCIgYXR0cmlidXRlIHdpbGwgY2F1c2UgJyArICdhIDQwNCByZXF1ZXN0LiBVc2Ugdi1iaW5kOnNyYyBpbnN0ZWFkLicsIHRoaXMudm0pO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIC8vIHdhcm4gc3R5bGVcbiAgICAgICAgICBpZiAoYXR0ciA9PT0gJ3N0eWxlJykge1xuICAgICAgICAgICAgd2FybihyYXcgKyAnaW50ZXJwb2xhdGlvbiBpbiBcInN0eWxlXCIgYXR0cmlidXRlIHdpbGwgY2F1c2UgJyArICd0aGUgYXR0cmlidXRlIHRvIGJlIGRpc2NhcmRlZCBpbiBJbnRlcm5ldCBFeHBsb3Jlci4gJyArICdVc2Ugdi1iaW5kOnN0eWxlIGluc3RlYWQuJywgdGhpcy52bSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSxcblxuICAgIHVwZGF0ZTogZnVuY3Rpb24gdXBkYXRlKHZhbHVlKSB7XG4gICAgICBpZiAodGhpcy5pbnZhbGlkKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIHZhciBhdHRyID0gdGhpcy5hcmc7XG4gICAgICBpZiAodGhpcy5hcmcpIHtcbiAgICAgICAgdGhpcy5oYW5kbGVTaW5nbGUoYXR0ciwgdmFsdWUpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5oYW5kbGVPYmplY3QodmFsdWUgfHwge30pO1xuICAgICAgfVxuICAgIH0sXG5cbiAgICAvLyBzaGFyZSBvYmplY3QgaGFuZGxlciB3aXRoIHYtYmluZDpjbGFzc1xuICAgIGhhbmRsZU9iamVjdDogc3R5bGUuaGFuZGxlT2JqZWN0LFxuXG4gICAgaGFuZGxlU2luZ2xlOiBmdW5jdGlvbiBoYW5kbGVTaW5nbGUoYXR0ciwgdmFsdWUpIHtcbiAgICAgIHZhciBlbCA9IHRoaXMuZWw7XG4gICAgICB2YXIgaW50ZXJwID0gdGhpcy5kZXNjcmlwdG9yLmludGVycDtcbiAgICAgIGlmICh0aGlzLm1vZGlmaWVycy5jYW1lbCkge1xuICAgICAgICBhdHRyID0gY2FtZWxpemUoYXR0cik7XG4gICAgICB9XG4gICAgICBpZiAoIWludGVycCAmJiBhdHRyV2l0aFByb3BzUkUudGVzdChhdHRyKSAmJiBhdHRyIGluIGVsKSB7XG4gICAgICAgIHZhciBhdHRyVmFsdWUgPSBhdHRyID09PSAndmFsdWUnID8gdmFsdWUgPT0gbnVsbCAvLyBJRTkgd2lsbCBzZXQgaW5wdXQudmFsdWUgdG8gXCJudWxsXCIgZm9yIG51bGwuLi5cbiAgICAgICAgPyAnJyA6IHZhbHVlIDogdmFsdWU7XG5cbiAgICAgICAgaWYgKGVsW2F0dHJdICE9PSBhdHRyVmFsdWUpIHtcbiAgICAgICAgICBlbFthdHRyXSA9IGF0dHJWYWx1ZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgLy8gc2V0IG1vZGVsIHByb3BzXG4gICAgICB2YXIgbW9kZWxQcm9wID0gbW9kZWxQcm9wc1thdHRyXTtcbiAgICAgIGlmICghaW50ZXJwICYmIG1vZGVsUHJvcCkge1xuICAgICAgICBlbFttb2RlbFByb3BdID0gdmFsdWU7XG4gICAgICAgIC8vIHVwZGF0ZSB2LW1vZGVsIGlmIHByZXNlbnRcbiAgICAgICAgdmFyIG1vZGVsID0gZWwuX192X21vZGVsO1xuICAgICAgICBpZiAobW9kZWwpIHtcbiAgICAgICAgICBtb2RlbC5saXN0ZW5lcigpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICAvLyBkbyBub3Qgc2V0IHZhbHVlIGF0dHJpYnV0ZSBmb3IgdGV4dGFyZWFcbiAgICAgIGlmIChhdHRyID09PSAndmFsdWUnICYmIGVsLnRhZ05hbWUgPT09ICdURVhUQVJFQScpIHtcbiAgICAgICAgZWwucmVtb3ZlQXR0cmlidXRlKGF0dHIpO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICAvLyB1cGRhdGUgYXR0cmlidXRlXG4gICAgICBpZiAoZW51bWVyYXRlZEF0dHJSRS50ZXN0KGF0dHIpKSB7XG4gICAgICAgIGVsLnNldEF0dHJpYnV0ZShhdHRyLCB2YWx1ZSA/ICd0cnVlJyA6ICdmYWxzZScpO1xuICAgICAgfSBlbHNlIGlmICh2YWx1ZSAhPSBudWxsICYmIHZhbHVlICE9PSBmYWxzZSkge1xuICAgICAgICBpZiAoYXR0ciA9PT0gJ2NsYXNzJykge1xuICAgICAgICAgIC8vIGhhbmRsZSBlZGdlIGNhc2UgIzE5NjA6XG4gICAgICAgICAgLy8gY2xhc3MgaW50ZXJwb2xhdGlvbiBzaG91bGQgbm90IG92ZXJ3cml0ZSBWdWUgdHJhbnNpdGlvbiBjbGFzc1xuICAgICAgICAgIGlmIChlbC5fX3ZfdHJhbnMpIHtcbiAgICAgICAgICAgIHZhbHVlICs9ICcgJyArIGVsLl9fdl90cmFucy5pZCArICctdHJhbnNpdGlvbic7XG4gICAgICAgICAgfVxuICAgICAgICAgIHNldENsYXNzKGVsLCB2YWx1ZSk7XG4gICAgICAgIH0gZWxzZSBpZiAoeGxpbmtSRS50ZXN0KGF0dHIpKSB7XG4gICAgICAgICAgZWwuc2V0QXR0cmlidXRlTlMoeGxpbmtOUywgYXR0ciwgdmFsdWUgPT09IHRydWUgPyAnJyA6IHZhbHVlKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBlbC5zZXRBdHRyaWJ1dGUoYXR0ciwgdmFsdWUgPT09IHRydWUgPyAnJyA6IHZhbHVlKTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZWwucmVtb3ZlQXR0cmlidXRlKGF0dHIpO1xuICAgICAgfVxuICAgIH1cbiAgfTtcblxuICB2YXIgZWwgPSB7XG5cbiAgICBwcmlvcml0eTogRUwsXG5cbiAgICBiaW5kOiBmdW5jdGlvbiBiaW5kKCkge1xuICAgICAgLyogaXN0YW5idWwgaWdub3JlIGlmICovXG4gICAgICBpZiAoIXRoaXMuYXJnKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIHZhciBpZCA9IHRoaXMuaWQgPSBjYW1lbGl6ZSh0aGlzLmFyZyk7XG4gICAgICB2YXIgcmVmcyA9ICh0aGlzLl9zY29wZSB8fCB0aGlzLnZtKS4kZWxzO1xuICAgICAgaWYgKGhhc093bihyZWZzLCBpZCkpIHtcbiAgICAgICAgcmVmc1tpZF0gPSB0aGlzLmVsO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZGVmaW5lUmVhY3RpdmUocmVmcywgaWQsIHRoaXMuZWwpO1xuICAgICAgfVxuICAgIH0sXG5cbiAgICB1bmJpbmQ6IGZ1bmN0aW9uIHVuYmluZCgpIHtcbiAgICAgIHZhciByZWZzID0gKHRoaXMuX3Njb3BlIHx8IHRoaXMudm0pLiRlbHM7XG4gICAgICBpZiAocmVmc1t0aGlzLmlkXSA9PT0gdGhpcy5lbCkge1xuICAgICAgICByZWZzW3RoaXMuaWRdID0gbnVsbDtcbiAgICAgIH1cbiAgICB9XG4gIH07XG5cbiAgdmFyIHJlZiA9IHtcbiAgICBiaW5kOiBmdW5jdGlvbiBiaW5kKCkge1xuICAgICAgJ2RldmVsb3BtZW50JyAhPT0gJ3Byb2R1Y3Rpb24nICYmIHdhcm4oJ3YtcmVmOicgKyB0aGlzLmFyZyArICcgbXVzdCBiZSB1c2VkIG9uIGEgY2hpbGQgJyArICdjb21wb25lbnQuIEZvdW5kIG9uIDwnICsgdGhpcy5lbC50YWdOYW1lLnRvTG93ZXJDYXNlKCkgKyAnPi4nLCB0aGlzLnZtKTtcbiAgICB9XG4gIH07XG5cbiAgdmFyIGNsb2FrID0ge1xuICAgIGJpbmQ6IGZ1bmN0aW9uIGJpbmQoKSB7XG4gICAgICB2YXIgZWwgPSB0aGlzLmVsO1xuICAgICAgdGhpcy52bS4kb25jZSgncHJlLWhvb2s6Y29tcGlsZWQnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGVsLnJlbW92ZUF0dHJpYnV0ZSgndi1jbG9haycpO1xuICAgICAgfSk7XG4gICAgfVxuICB9O1xuXG4gIC8vIG11c3QgZXhwb3J0IHBsYWluIG9iamVjdFxuICB2YXIgZGlyZWN0aXZlcyA9IHtcbiAgICB0ZXh0OiB0ZXh0JDEsXG4gICAgaHRtbDogaHRtbCxcbiAgICAnZm9yJzogdkZvcixcbiAgICAnaWYnOiB2SWYsXG4gICAgc2hvdzogc2hvdyxcbiAgICBtb2RlbDogbW9kZWwsXG4gICAgb246IG9uJDEsXG4gICAgYmluZDogYmluZCQxLFxuICAgIGVsOiBlbCxcbiAgICByZWY6IHJlZixcbiAgICBjbG9hazogY2xvYWtcbiAgfTtcblxuICB2YXIgdkNsYXNzID0ge1xuXG4gICAgZGVlcDogdHJ1ZSxcblxuICAgIHVwZGF0ZTogZnVuY3Rpb24gdXBkYXRlKHZhbHVlKSB7XG4gICAgICBpZiAoIXZhbHVlKSB7XG4gICAgICAgIHRoaXMuY2xlYW51cCgpO1xuICAgICAgfSBlbHNlIGlmICh0eXBlb2YgdmFsdWUgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgIHRoaXMuc2V0Q2xhc3ModmFsdWUudHJpbSgpLnNwbGl0KC9cXHMrLykpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5zZXRDbGFzcyhub3JtYWxpemUkMSh2YWx1ZSkpO1xuICAgICAgfVxuICAgIH0sXG5cbiAgICBzZXRDbGFzczogZnVuY3Rpb24gc2V0Q2xhc3ModmFsdWUpIHtcbiAgICAgIHRoaXMuY2xlYW51cCh2YWx1ZSk7XG4gICAgICBmb3IgKHZhciBpID0gMCwgbCA9IHZhbHVlLmxlbmd0aDsgaSA8IGw7IGkrKykge1xuICAgICAgICB2YXIgdmFsID0gdmFsdWVbaV07XG4gICAgICAgIGlmICh2YWwpIHtcbiAgICAgICAgICBhcHBseSh0aGlzLmVsLCB2YWwsIGFkZENsYXNzKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgdGhpcy5wcmV2S2V5cyA9IHZhbHVlO1xuICAgIH0sXG5cbiAgICBjbGVhbnVwOiBmdW5jdGlvbiBjbGVhbnVwKHZhbHVlKSB7XG4gICAgICB2YXIgcHJldktleXMgPSB0aGlzLnByZXZLZXlzO1xuICAgICAgaWYgKCFwcmV2S2V5cykgcmV0dXJuO1xuICAgICAgdmFyIGkgPSBwcmV2S2V5cy5sZW5ndGg7XG4gICAgICB3aGlsZSAoaS0tKSB7XG4gICAgICAgIHZhciBrZXkgPSBwcmV2S2V5c1tpXTtcbiAgICAgICAgaWYgKCF2YWx1ZSB8fCB2YWx1ZS5pbmRleE9mKGtleSkgPCAwKSB7XG4gICAgICAgICAgYXBwbHkodGhpcy5lbCwga2V5LCByZW1vdmVDbGFzcyk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH07XG5cbiAgLyoqXG4gICAqIE5vcm1hbGl6ZSBvYmplY3RzIGFuZCBhcnJheXMgKHBvdGVudGlhbGx5IGNvbnRhaW5pbmcgb2JqZWN0cylcbiAgICogaW50byBhcnJheSBvZiBzdHJpbmdzLlxuICAgKlxuICAgKiBAcGFyYW0ge09iamVjdHxBcnJheTxTdHJpbmd8T2JqZWN0Pn0gdmFsdWVcbiAgICogQHJldHVybiB7QXJyYXk8U3RyaW5nPn1cbiAgICovXG5cbiAgZnVuY3Rpb24gbm9ybWFsaXplJDEodmFsdWUpIHtcbiAgICB2YXIgcmVzID0gW107XG4gICAgaWYgKGlzQXJyYXkodmFsdWUpKSB7XG4gICAgICBmb3IgKHZhciBpID0gMCwgbCA9IHZhbHVlLmxlbmd0aDsgaSA8IGw7IGkrKykge1xuICAgICAgICB2YXIgX2tleSA9IHZhbHVlW2ldO1xuICAgICAgICBpZiAoX2tleSkge1xuICAgICAgICAgIGlmICh0eXBlb2YgX2tleSA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgIHJlcy5wdXNoKF9rZXkpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBmb3IgKHZhciBrIGluIF9rZXkpIHtcbiAgICAgICAgICAgICAgaWYgKF9rZXlba10pIHJlcy5wdXNoKGspO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0gZWxzZSBpZiAoaXNPYmplY3QodmFsdWUpKSB7XG4gICAgICBmb3IgKHZhciBrZXkgaW4gdmFsdWUpIHtcbiAgICAgICAgaWYgKHZhbHVlW2tleV0pIHJlcy5wdXNoKGtleSk7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiByZXM7XG4gIH1cblxuICAvKipcbiAgICogQWRkIG9yIHJlbW92ZSBhIGNsYXNzL2NsYXNzZXMgb24gYW4gZWxlbWVudFxuICAgKlxuICAgKiBAcGFyYW0ge0VsZW1lbnR9IGVsXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBrZXkgVGhlIGNsYXNzIG5hbWUuIFRoaXMgbWF5IG9yIG1heSBub3RcbiAgICogICAgICAgICAgICAgICAgICAgICBjb250YWluIGEgc3BhY2UgY2hhcmFjdGVyLCBpbiBzdWNoIGFcbiAgICogICAgICAgICAgICAgICAgICAgICBjYXNlIHdlJ2xsIGRlYWwgd2l0aCBtdWx0aXBsZSBjbGFzc1xuICAgKiAgICAgICAgICAgICAgICAgICAgIG5hbWVzIGF0IG9uY2UuXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IGZuXG4gICAqL1xuXG4gIGZ1bmN0aW9uIGFwcGx5KGVsLCBrZXksIGZuKSB7XG4gICAga2V5ID0ga2V5LnRyaW0oKTtcbiAgICBpZiAoa2V5LmluZGV4T2YoJyAnKSA9PT0gLTEpIHtcbiAgICAgIGZuKGVsLCBrZXkpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICAvLyBUaGUga2V5IGNvbnRhaW5zIG9uZSBvciBtb3JlIHNwYWNlIGNoYXJhY3RlcnMuXG4gICAgLy8gU2luY2UgYSBjbGFzcyBuYW1lIGRvZXNuJ3QgYWNjZXB0IHN1Y2ggY2hhcmFjdGVycywgd2VcbiAgICAvLyB0cmVhdCBpdCBhcyBtdWx0aXBsZSBjbGFzc2VzLlxuICAgIHZhciBrZXlzID0ga2V5LnNwbGl0KC9cXHMrLyk7XG4gICAgZm9yICh2YXIgaSA9IDAsIGwgPSBrZXlzLmxlbmd0aDsgaSA8IGw7IGkrKykge1xuICAgICAgZm4oZWwsIGtleXNbaV0pO1xuICAgIH1cbiAgfVxuXG4gIHZhciBjb21wb25lbnQgPSB7XG5cbiAgICBwcmlvcml0eTogQ09NUE9ORU5ULFxuXG4gICAgcGFyYW1zOiBbJ2tlZXAtYWxpdmUnLCAndHJhbnNpdGlvbi1tb2RlJywgJ2lubGluZS10ZW1wbGF0ZSddLFxuXG4gICAgLyoqXG4gICAgICogU2V0dXAuIFR3byBwb3NzaWJsZSB1c2FnZXM6XG4gICAgICpcbiAgICAgKiAtIHN0YXRpYzpcbiAgICAgKiAgIDxjb21wPiBvciA8ZGl2IHYtY29tcG9uZW50PVwiY29tcFwiPlxuICAgICAqXG4gICAgICogLSBkeW5hbWljOlxuICAgICAqICAgPGNvbXBvbmVudCA6aXM9XCJ2aWV3XCI+XG4gICAgICovXG5cbiAgICBiaW5kOiBmdW5jdGlvbiBiaW5kKCkge1xuICAgICAgaWYgKCF0aGlzLmVsLl9fdnVlX18pIHtcbiAgICAgICAgLy8ga2VlcC1hbGl2ZSBjYWNoZVxuICAgICAgICB0aGlzLmtlZXBBbGl2ZSA9IHRoaXMucGFyYW1zLmtlZXBBbGl2ZTtcbiAgICAgICAgaWYgKHRoaXMua2VlcEFsaXZlKSB7XG4gICAgICAgICAgdGhpcy5jYWNoZSA9IHt9O1xuICAgICAgICB9XG4gICAgICAgIC8vIGNoZWNrIGlubGluZS10ZW1wbGF0ZVxuICAgICAgICBpZiAodGhpcy5wYXJhbXMuaW5saW5lVGVtcGxhdGUpIHtcbiAgICAgICAgICAvLyBleHRyYWN0IGlubGluZSB0ZW1wbGF0ZSBhcyBhIERvY3VtZW50RnJhZ21lbnRcbiAgICAgICAgICB0aGlzLmlubGluZVRlbXBsYXRlID0gZXh0cmFjdENvbnRlbnQodGhpcy5lbCwgdHJ1ZSk7XG4gICAgICAgIH1cbiAgICAgICAgLy8gY29tcG9uZW50IHJlc29sdXRpb24gcmVsYXRlZCBzdGF0ZVxuICAgICAgICB0aGlzLnBlbmRpbmdDb21wb25lbnRDYiA9IHRoaXMuQ29tcG9uZW50ID0gbnVsbDtcbiAgICAgICAgLy8gdHJhbnNpdGlvbiByZWxhdGVkIHN0YXRlXG4gICAgICAgIHRoaXMucGVuZGluZ1JlbW92YWxzID0gMDtcbiAgICAgICAgdGhpcy5wZW5kaW5nUmVtb3ZhbENiID0gbnVsbDtcbiAgICAgICAgLy8gY3JlYXRlIGEgcmVmIGFuY2hvclxuICAgICAgICB0aGlzLmFuY2hvciA9IGNyZWF0ZUFuY2hvcigndi1jb21wb25lbnQnKTtcbiAgICAgICAgcmVwbGFjZSh0aGlzLmVsLCB0aGlzLmFuY2hvcik7XG4gICAgICAgIC8vIHJlbW92ZSBpcyBhdHRyaWJ1dGUuXG4gICAgICAgIC8vIHRoaXMgaXMgcmVtb3ZlZCBkdXJpbmcgY29tcGlsYXRpb24sIGJ1dCBiZWNhdXNlIGNvbXBpbGF0aW9uIGlzXG4gICAgICAgIC8vIGNhY2hlZCwgd2hlbiB0aGUgY29tcG9uZW50IGlzIHVzZWQgZWxzZXdoZXJlIHRoaXMgYXR0cmlidXRlXG4gICAgICAgIC8vIHdpbGwgcmVtYWluIGF0IGxpbmsgdGltZS5cbiAgICAgICAgdGhpcy5lbC5yZW1vdmVBdHRyaWJ1dGUoJ2lzJyk7XG4gICAgICAgIHRoaXMuZWwucmVtb3ZlQXR0cmlidXRlKCc6aXMnKTtcbiAgICAgICAgLy8gcmVtb3ZlIHJlZiwgc2FtZSBhcyBhYm92ZVxuICAgICAgICBpZiAodGhpcy5kZXNjcmlwdG9yLnJlZikge1xuICAgICAgICAgIHRoaXMuZWwucmVtb3ZlQXR0cmlidXRlKCd2LXJlZjonICsgaHlwaGVuYXRlKHRoaXMuZGVzY3JpcHRvci5yZWYpKTtcbiAgICAgICAgfVxuICAgICAgICAvLyBpZiBzdGF0aWMsIGJ1aWxkIHJpZ2h0IG5vdy5cbiAgICAgICAgaWYgKHRoaXMubGl0ZXJhbCkge1xuICAgICAgICAgIHRoaXMuc2V0Q29tcG9uZW50KHRoaXMuZXhwcmVzc2lvbik7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgICdkZXZlbG9wbWVudCcgIT09ICdwcm9kdWN0aW9uJyAmJiB3YXJuKCdjYW5ub3QgbW91bnQgY29tcG9uZW50IFwiJyArIHRoaXMuZXhwcmVzc2lvbiArICdcIiAnICsgJ29uIGFscmVhZHkgbW91bnRlZCBlbGVtZW50OiAnICsgdGhpcy5lbCk7XG4gICAgICB9XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIFB1YmxpYyB1cGRhdGUsIGNhbGxlZCBieSB0aGUgd2F0Y2hlciBpbiB0aGUgZHluYW1pY1xuICAgICAqIGxpdGVyYWwgc2NlbmFyaW8sIGUuZy4gPGNvbXBvbmVudCA6aXM9XCJ2aWV3XCI+XG4gICAgICovXG5cbiAgICB1cGRhdGU6IGZ1bmN0aW9uIHVwZGF0ZSh2YWx1ZSkge1xuICAgICAgaWYgKCF0aGlzLmxpdGVyYWwpIHtcbiAgICAgICAgdGhpcy5zZXRDb21wb25lbnQodmFsdWUpO1xuICAgICAgfVxuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBTd2l0Y2ggZHluYW1pYyBjb21wb25lbnRzLiBNYXkgcmVzb2x2ZSB0aGUgY29tcG9uZW50XG4gICAgICogYXN5bmNocm9ub3VzbHksIGFuZCBwZXJmb3JtIHRyYW5zaXRpb24gYmFzZWQgb25cbiAgICAgKiBzcGVjaWZpZWQgdHJhbnNpdGlvbiBtb2RlLiBBY2NlcHRzIGEgZmV3IGFkZGl0aW9uYWxcbiAgICAgKiBhcmd1bWVudHMgc3BlY2lmaWNhbGx5IGZvciB2dWUtcm91dGVyLlxuICAgICAqXG4gICAgICogVGhlIGNhbGxiYWNrIGlzIGNhbGxlZCB3aGVuIHRoZSBmdWxsIHRyYW5zaXRpb24gaXNcbiAgICAgKiBmaW5pc2hlZC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSB2YWx1ZVxuICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IFtjYl1cbiAgICAgKi9cblxuICAgIHNldENvbXBvbmVudDogZnVuY3Rpb24gc2V0Q29tcG9uZW50KHZhbHVlLCBjYikge1xuICAgICAgdGhpcy5pbnZhbGlkYXRlUGVuZGluZygpO1xuICAgICAgaWYgKCF2YWx1ZSkge1xuICAgICAgICAvLyBqdXN0IHJlbW92ZSBjdXJyZW50XG4gICAgICAgIHRoaXMudW5idWlsZCh0cnVlKTtcbiAgICAgICAgdGhpcy5yZW1vdmUodGhpcy5jaGlsZFZNLCBjYik7XG4gICAgICAgIHRoaXMuY2hpbGRWTSA9IG51bGw7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgICAgIHRoaXMucmVzb2x2ZUNvbXBvbmVudCh2YWx1ZSwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgIHNlbGYubW91bnRDb21wb25lbnQoY2IpO1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogUmVzb2x2ZSB0aGUgY29tcG9uZW50IGNvbnN0cnVjdG9yIHRvIHVzZSB3aGVuIGNyZWF0aW5nXG4gICAgICogdGhlIGNoaWxkIHZtLlxuICAgICAqXG4gICAgICogQHBhcmFtIHtTdHJpbmd8RnVuY3Rpb259IHZhbHVlXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gY2JcbiAgICAgKi9cblxuICAgIHJlc29sdmVDb21wb25lbnQ6IGZ1bmN0aW9uIHJlc29sdmVDb21wb25lbnQodmFsdWUsIGNiKSB7XG4gICAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgICB0aGlzLnBlbmRpbmdDb21wb25lbnRDYiA9IGNhbmNlbGxhYmxlKGZ1bmN0aW9uIChDb21wb25lbnQpIHtcbiAgICAgICAgc2VsZi5Db21wb25lbnROYW1lID0gQ29tcG9uZW50Lm9wdGlvbnMubmFtZSB8fCAodHlwZW9mIHZhbHVlID09PSAnc3RyaW5nJyA/IHZhbHVlIDogbnVsbCk7XG4gICAgICAgIHNlbGYuQ29tcG9uZW50ID0gQ29tcG9uZW50O1xuICAgICAgICBjYigpO1xuICAgICAgfSk7XG4gICAgICB0aGlzLnZtLl9yZXNvbHZlQ29tcG9uZW50KHZhbHVlLCB0aGlzLnBlbmRpbmdDb21wb25lbnRDYik7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIENyZWF0ZSBhIG5ldyBpbnN0YW5jZSB1c2luZyB0aGUgY3VycmVudCBjb25zdHJ1Y3RvciBhbmRcbiAgICAgKiByZXBsYWNlIHRoZSBleGlzdGluZyBpbnN0YW5jZS4gVGhpcyBtZXRob2QgZG9lc24ndCBjYXJlXG4gICAgICogd2hldGhlciB0aGUgbmV3IGNvbXBvbmVudCBhbmQgdGhlIG9sZCBvbmUgYXJlIGFjdHVhbGx5XG4gICAgICogdGhlIHNhbWUuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBbY2JdXG4gICAgICovXG5cbiAgICBtb3VudENvbXBvbmVudDogZnVuY3Rpb24gbW91bnRDb21wb25lbnQoY2IpIHtcbiAgICAgIC8vIGFjdHVhbCBtb3VudFxuICAgICAgdGhpcy51bmJ1aWxkKHRydWUpO1xuICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgICAgdmFyIGFjdGl2YXRlSG9va3MgPSB0aGlzLkNvbXBvbmVudC5vcHRpb25zLmFjdGl2YXRlO1xuICAgICAgdmFyIGNhY2hlZCA9IHRoaXMuZ2V0Q2FjaGVkKCk7XG4gICAgICB2YXIgbmV3Q29tcG9uZW50ID0gdGhpcy5idWlsZCgpO1xuICAgICAgaWYgKGFjdGl2YXRlSG9va3MgJiYgIWNhY2hlZCkge1xuICAgICAgICB0aGlzLndhaXRpbmdGb3IgPSBuZXdDb21wb25lbnQ7XG4gICAgICAgIGNhbGxBY3RpdmF0ZUhvb2tzKGFjdGl2YXRlSG9va3MsIG5ld0NvbXBvbmVudCwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgIGlmIChzZWxmLndhaXRpbmdGb3IgIT09IG5ld0NvbXBvbmVudCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgIH1cbiAgICAgICAgICBzZWxmLndhaXRpbmdGb3IgPSBudWxsO1xuICAgICAgICAgIHNlbGYudHJhbnNpdGlvbihuZXdDb21wb25lbnQsIGNiKTtcbiAgICAgICAgfSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvLyB1cGRhdGUgcmVmIGZvciBrZXB0LWFsaXZlIGNvbXBvbmVudFxuICAgICAgICBpZiAoY2FjaGVkKSB7XG4gICAgICAgICAgbmV3Q29tcG9uZW50Ll91cGRhdGVSZWYoKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnRyYW5zaXRpb24obmV3Q29tcG9uZW50LCBjYik7XG4gICAgICB9XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIFdoZW4gdGhlIGNvbXBvbmVudCBjaGFuZ2VzIG9yIHVuYmluZHMgYmVmb3JlIGFuIGFzeW5jXG4gICAgICogY29uc3RydWN0b3IgaXMgcmVzb2x2ZWQsIHdlIG5lZWQgdG8gaW52YWxpZGF0ZSBpdHNcbiAgICAgKiBwZW5kaW5nIGNhbGxiYWNrLlxuICAgICAqL1xuXG4gICAgaW52YWxpZGF0ZVBlbmRpbmc6IGZ1bmN0aW9uIGludmFsaWRhdGVQZW5kaW5nKCkge1xuICAgICAgaWYgKHRoaXMucGVuZGluZ0NvbXBvbmVudENiKSB7XG4gICAgICAgIHRoaXMucGVuZGluZ0NvbXBvbmVudENiLmNhbmNlbCgpO1xuICAgICAgICB0aGlzLnBlbmRpbmdDb21wb25lbnRDYiA9IG51bGw7XG4gICAgICB9XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIEluc3RhbnRpYXRlL2luc2VydCBhIG5ldyBjaGlsZCB2bS5cbiAgICAgKiBJZiBrZWVwIGFsaXZlIGFuZCBoYXMgY2FjaGVkIGluc3RhbmNlLCBpbnNlcnQgdGhhdFxuICAgICAqIGluc3RhbmNlOyBvdGhlcndpc2UgYnVpbGQgYSBuZXcgb25lIGFuZCBjYWNoZSBpdC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBbZXh0cmFPcHRpb25zXVxuICAgICAqIEByZXR1cm4ge1Z1ZX0gLSB0aGUgY3JlYXRlZCBpbnN0YW5jZVxuICAgICAqL1xuXG4gICAgYnVpbGQ6IGZ1bmN0aW9uIGJ1aWxkKGV4dHJhT3B0aW9ucykge1xuICAgICAgdmFyIGNhY2hlZCA9IHRoaXMuZ2V0Q2FjaGVkKCk7XG4gICAgICBpZiAoY2FjaGVkKSB7XG4gICAgICAgIHJldHVybiBjYWNoZWQ7XG4gICAgICB9XG4gICAgICBpZiAodGhpcy5Db21wb25lbnQpIHtcbiAgICAgICAgLy8gZGVmYXVsdCBvcHRpb25zXG4gICAgICAgIHZhciBvcHRpb25zID0ge1xuICAgICAgICAgIG5hbWU6IHRoaXMuQ29tcG9uZW50TmFtZSxcbiAgICAgICAgICBlbDogY2xvbmVOb2RlKHRoaXMuZWwpLFxuICAgICAgICAgIHRlbXBsYXRlOiB0aGlzLmlubGluZVRlbXBsYXRlLFxuICAgICAgICAgIC8vIG1ha2Ugc3VyZSB0byBhZGQgdGhlIGNoaWxkIHdpdGggY29ycmVjdCBwYXJlbnRcbiAgICAgICAgICAvLyBpZiB0aGlzIGlzIGEgdHJhbnNjbHVkZWQgY29tcG9uZW50LCBpdHMgcGFyZW50XG4gICAgICAgICAgLy8gc2hvdWxkIGJlIHRoZSB0cmFuc2NsdXNpb24gaG9zdC5cbiAgICAgICAgICBwYXJlbnQ6IHRoaXMuX2hvc3QgfHwgdGhpcy52bSxcbiAgICAgICAgICAvLyBpZiBubyBpbmxpbmUtdGVtcGxhdGUsIHRoZW4gdGhlIGNvbXBpbGVkXG4gICAgICAgICAgLy8gbGlua2VyIGNhbiBiZSBjYWNoZWQgZm9yIGJldHRlciBwZXJmb3JtYW5jZS5cbiAgICAgICAgICBfbGlua2VyQ2FjaGFibGU6ICF0aGlzLmlubGluZVRlbXBsYXRlLFxuICAgICAgICAgIF9yZWY6IHRoaXMuZGVzY3JpcHRvci5yZWYsXG4gICAgICAgICAgX2FzQ29tcG9uZW50OiB0cnVlLFxuICAgICAgICAgIF9pc1JvdXRlclZpZXc6IHRoaXMuX2lzUm91dGVyVmlldyxcbiAgICAgICAgICAvLyBpZiB0aGlzIGlzIGEgdHJhbnNjbHVkZWQgY29tcG9uZW50LCBjb250ZXh0XG4gICAgICAgICAgLy8gd2lsbCBiZSB0aGUgY29tbW9uIHBhcmVudCB2bSBvZiB0aGlzIGluc3RhbmNlXG4gICAgICAgICAgLy8gYW5kIGl0cyBob3N0LlxuICAgICAgICAgIF9jb250ZXh0OiB0aGlzLnZtLFxuICAgICAgICAgIC8vIGlmIHRoaXMgaXMgaW5zaWRlIGFuIGlubGluZSB2LWZvciwgdGhlIHNjb3BlXG4gICAgICAgICAgLy8gd2lsbCBiZSB0aGUgaW50ZXJtZWRpYXRlIHNjb3BlIGNyZWF0ZWQgZm9yIHRoaXNcbiAgICAgICAgICAvLyByZXBlYXQgZnJhZ21lbnQuIHRoaXMgaXMgdXNlZCBmb3IgbGlua2luZyBwcm9wc1xuICAgICAgICAgIC8vIGFuZCBjb250YWluZXIgZGlyZWN0aXZlcy5cbiAgICAgICAgICBfc2NvcGU6IHRoaXMuX3Njb3BlLFxuICAgICAgICAgIC8vIHBhc3MgaW4gdGhlIG93bmVyIGZyYWdtZW50IG9mIHRoaXMgY29tcG9uZW50LlxuICAgICAgICAgIC8vIHRoaXMgaXMgbmVjZXNzYXJ5IHNvIHRoYXQgdGhlIGZyYWdtZW50IGNhbiBrZWVwXG4gICAgICAgICAgLy8gdHJhY2sgb2YgaXRzIGNvbnRhaW5lZCBjb21wb25lbnRzIGluIG9yZGVyIHRvXG4gICAgICAgICAgLy8gY2FsbCBhdHRhY2gvZGV0YWNoIGhvb2tzIGZvciB0aGVtLlxuICAgICAgICAgIF9mcmFnOiB0aGlzLl9mcmFnXG4gICAgICAgIH07XG4gICAgICAgIC8vIGV4dHJhIG9wdGlvbnNcbiAgICAgICAgLy8gaW4gMS4wLjAgdGhpcyBpcyB1c2VkIGJ5IHZ1ZS1yb3V0ZXIgb25seVxuICAgICAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgaWYgKi9cbiAgICAgICAgaWYgKGV4dHJhT3B0aW9ucykge1xuICAgICAgICAgIGV4dGVuZChvcHRpb25zLCBleHRyYU9wdGlvbnMpO1xuICAgICAgICB9XG4gICAgICAgIHZhciBjaGlsZCA9IG5ldyB0aGlzLkNvbXBvbmVudChvcHRpb25zKTtcbiAgICAgICAgaWYgKHRoaXMua2VlcEFsaXZlKSB7XG4gICAgICAgICAgdGhpcy5jYWNoZVt0aGlzLkNvbXBvbmVudC5jaWRdID0gY2hpbGQ7XG4gICAgICAgIH1cbiAgICAgICAgLyogaXN0YW5idWwgaWdub3JlIGlmICovXG4gICAgICAgIGlmICgnZGV2ZWxvcG1lbnQnICE9PSAncHJvZHVjdGlvbicgJiYgdGhpcy5lbC5oYXNBdHRyaWJ1dGUoJ3RyYW5zaXRpb24nKSAmJiBjaGlsZC5faXNGcmFnbWVudCkge1xuICAgICAgICAgIHdhcm4oJ1RyYW5zaXRpb25zIHdpbGwgbm90IHdvcmsgb24gYSBmcmFnbWVudCBpbnN0YW5jZS4gJyArICdUZW1wbGF0ZTogJyArIGNoaWxkLiRvcHRpb25zLnRlbXBsYXRlLCBjaGlsZCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGNoaWxkO1xuICAgICAgfVxuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBUcnkgdG8gZ2V0IGEgY2FjaGVkIGluc3RhbmNlIG9mIHRoZSBjdXJyZW50IGNvbXBvbmVudC5cbiAgICAgKlxuICAgICAqIEByZXR1cm4ge1Z1ZXx1bmRlZmluZWR9XG4gICAgICovXG5cbiAgICBnZXRDYWNoZWQ6IGZ1bmN0aW9uIGdldENhY2hlZCgpIHtcbiAgICAgIHJldHVybiB0aGlzLmtlZXBBbGl2ZSAmJiB0aGlzLmNhY2hlW3RoaXMuQ29tcG9uZW50LmNpZF07XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIFRlYXJkb3duIHRoZSBjdXJyZW50IGNoaWxkLCBidXQgZGVmZXJzIGNsZWFudXAgc29cbiAgICAgKiB0aGF0IHdlIGNhbiBzZXBhcmF0ZSB0aGUgZGVzdHJveSBhbmQgcmVtb3ZhbCBzdGVwcy5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7Qm9vbGVhbn0gZGVmZXJcbiAgICAgKi9cblxuICAgIHVuYnVpbGQ6IGZ1bmN0aW9uIHVuYnVpbGQoZGVmZXIpIHtcbiAgICAgIGlmICh0aGlzLndhaXRpbmdGb3IpIHtcbiAgICAgICAgaWYgKCF0aGlzLmtlZXBBbGl2ZSkge1xuICAgICAgICAgIHRoaXMud2FpdGluZ0Zvci4kZGVzdHJveSgpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMud2FpdGluZ0ZvciA9IG51bGw7XG4gICAgICB9XG4gICAgICB2YXIgY2hpbGQgPSB0aGlzLmNoaWxkVk07XG4gICAgICBpZiAoIWNoaWxkIHx8IHRoaXMua2VlcEFsaXZlKSB7XG4gICAgICAgIGlmIChjaGlsZCkge1xuICAgICAgICAgIC8vIHJlbW92ZSByZWZcbiAgICAgICAgICBjaGlsZC5faW5hY3RpdmUgPSB0cnVlO1xuICAgICAgICAgIGNoaWxkLl91cGRhdGVSZWYodHJ1ZSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgLy8gdGhlIHNvbGUgcHVycG9zZSBvZiBgZGVmZXJDbGVhbnVwYCBpcyBzbyB0aGF0IHdlIGNhblxuICAgICAgLy8gXCJkZWFjdGl2YXRlXCIgdGhlIHZtIHJpZ2h0IG5vdyBhbmQgcGVyZm9ybSBET00gcmVtb3ZhbFxuICAgICAgLy8gbGF0ZXIuXG4gICAgICBjaGlsZC4kZGVzdHJveShmYWxzZSwgZGVmZXIpO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBSZW1vdmUgY3VycmVudCBkZXN0cm95ZWQgY2hpbGQgYW5kIG1hbnVhbGx5IGRvXG4gICAgICogdGhlIGNsZWFudXAgYWZ0ZXIgcmVtb3ZhbC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IGNiXG4gICAgICovXG5cbiAgICByZW1vdmU6IGZ1bmN0aW9uIHJlbW92ZShjaGlsZCwgY2IpIHtcbiAgICAgIHZhciBrZWVwQWxpdmUgPSB0aGlzLmtlZXBBbGl2ZTtcbiAgICAgIGlmIChjaGlsZCkge1xuICAgICAgICAvLyB3ZSBtYXkgaGF2ZSBhIGNvbXBvbmVudCBzd2l0Y2ggd2hlbiBhIHByZXZpb3VzXG4gICAgICAgIC8vIGNvbXBvbmVudCBpcyBzdGlsbCBiZWluZyB0cmFuc2l0aW9uZWQgb3V0LlxuICAgICAgICAvLyB3ZSB3YW50IHRvIHRyaWdnZXIgb25seSBvbmUgbGFzdGVzdCBpbnNlcnRpb24gY2JcbiAgICAgICAgLy8gd2hlbiB0aGUgZXhpc3RpbmcgdHJhbnNpdGlvbiBmaW5pc2hlcy4gKCMxMTE5KVxuICAgICAgICB0aGlzLnBlbmRpbmdSZW1vdmFscysrO1xuICAgICAgICB0aGlzLnBlbmRpbmdSZW1vdmFsQ2IgPSBjYjtcbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgICAgICBjaGlsZC4kcmVtb3ZlKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICBzZWxmLnBlbmRpbmdSZW1vdmFscy0tO1xuICAgICAgICAgIGlmICgha2VlcEFsaXZlKSBjaGlsZC5fY2xlYW51cCgpO1xuICAgICAgICAgIGlmICghc2VsZi5wZW5kaW5nUmVtb3ZhbHMgJiYgc2VsZi5wZW5kaW5nUmVtb3ZhbENiKSB7XG4gICAgICAgICAgICBzZWxmLnBlbmRpbmdSZW1vdmFsQ2IoKTtcbiAgICAgICAgICAgIHNlbGYucGVuZGluZ1JlbW92YWxDYiA9IG51bGw7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH0gZWxzZSBpZiAoY2IpIHtcbiAgICAgICAgY2IoKTtcbiAgICAgIH1cbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogQWN0dWFsbHkgc3dhcCB0aGUgY29tcG9uZW50cywgZGVwZW5kaW5nIG9uIHRoZVxuICAgICAqIHRyYW5zaXRpb24gbW9kZS4gRGVmYXVsdHMgdG8gc2ltdWx0YW5lb3VzLlxuICAgICAqXG4gICAgICogQHBhcmFtIHtWdWV9IHRhcmdldFxuICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IFtjYl1cbiAgICAgKi9cblxuICAgIHRyYW5zaXRpb246IGZ1bmN0aW9uIHRyYW5zaXRpb24odGFyZ2V0LCBjYikge1xuICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgICAgdmFyIGN1cnJlbnQgPSB0aGlzLmNoaWxkVk07XG4gICAgICAvLyBmb3IgZGV2dG9vbCBpbnNwZWN0aW9uXG4gICAgICBpZiAoY3VycmVudCkgY3VycmVudC5faW5hY3RpdmUgPSB0cnVlO1xuICAgICAgdGFyZ2V0Ll9pbmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgdGhpcy5jaGlsZFZNID0gdGFyZ2V0O1xuICAgICAgc3dpdGNoIChzZWxmLnBhcmFtcy50cmFuc2l0aW9uTW9kZSkge1xuICAgICAgICBjYXNlICdpbi1vdXQnOlxuICAgICAgICAgIHRhcmdldC4kYmVmb3JlKHNlbGYuYW5jaG9yLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBzZWxmLnJlbW92ZShjdXJyZW50LCBjYik7XG4gICAgICAgICAgfSk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgJ291dC1pbic6XG4gICAgICAgICAgc2VsZi5yZW1vdmUoY3VycmVudCwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdGFyZ2V0LiRiZWZvcmUoc2VsZi5hbmNob3IsIGNiKTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICBzZWxmLnJlbW92ZShjdXJyZW50KTtcbiAgICAgICAgICB0YXJnZXQuJGJlZm9yZShzZWxmLmFuY2hvciwgY2IpO1xuICAgICAgfVxuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBVbmJpbmQuXG4gICAgICovXG5cbiAgICB1bmJpbmQ6IGZ1bmN0aW9uIHVuYmluZCgpIHtcbiAgICAgIHRoaXMuaW52YWxpZGF0ZVBlbmRpbmcoKTtcbiAgICAgIC8vIERvIG5vdCBkZWZlciBjbGVhbnVwIHdoZW4gdW5iaW5kaW5nXG4gICAgICB0aGlzLnVuYnVpbGQoKTtcbiAgICAgIC8vIGRlc3Ryb3kgYWxsIGtlZXAtYWxpdmUgY2FjaGVkIGluc3RhbmNlc1xuICAgICAgaWYgKHRoaXMuY2FjaGUpIHtcbiAgICAgICAgZm9yICh2YXIga2V5IGluIHRoaXMuY2FjaGUpIHtcbiAgICAgICAgICB0aGlzLmNhY2hlW2tleV0uJGRlc3Ryb3koKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmNhY2hlID0gbnVsbDtcbiAgICAgIH1cbiAgICB9XG4gIH07XG5cbiAgLyoqXG4gICAqIENhbGwgYWN0aXZhdGUgaG9va3MgaW4gb3JkZXIgKGFzeW5jaHJvbm91cylcbiAgICpcbiAgICogQHBhcmFtIHtBcnJheX0gaG9va3NcbiAgICogQHBhcmFtIHtWdWV9IHZtXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IGNiXG4gICAqL1xuXG4gIGZ1bmN0aW9uIGNhbGxBY3RpdmF0ZUhvb2tzKGhvb2tzLCB2bSwgY2IpIHtcbiAgICB2YXIgdG90YWwgPSBob29rcy5sZW5ndGg7XG4gICAgdmFyIGNhbGxlZCA9IDA7XG4gICAgaG9va3NbMF0uY2FsbCh2bSwgbmV4dCk7XG4gICAgZnVuY3Rpb24gbmV4dCgpIHtcbiAgICAgIGlmICgrK2NhbGxlZCA+PSB0b3RhbCkge1xuICAgICAgICBjYigpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaG9va3NbY2FsbGVkXS5jYWxsKHZtLCBuZXh0KTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICB2YXIgcHJvcEJpbmRpbmdNb2RlcyA9IGNvbmZpZy5fcHJvcEJpbmRpbmdNb2RlcztcbiAgdmFyIGVtcHR5ID0ge307XG5cbiAgLy8gcmVnZXhlc1xuICB2YXIgaWRlbnRSRSQxID0gL15bJF9hLXpBLVpdK1tcXHckXSokLztcbiAgdmFyIHNldHRhYmxlUGF0aFJFID0gL15bQS1aYS16XyRdW1xcdyRdKihcXC5bQS1aYS16XyRdW1xcdyRdKnxcXFtbXlxcW1xcXV0rXFxdKSokLztcblxuICAvKipcbiAgICogQ29tcGlsZSBwcm9wcyBvbiBhIHJvb3QgZWxlbWVudCBhbmQgcmV0dXJuXG4gICAqIGEgcHJvcHMgbGluayBmdW5jdGlvbi5cbiAgICpcbiAgICogQHBhcmFtIHtFbGVtZW50fERvY3VtZW50RnJhZ21lbnR9IGVsXG4gICAqIEBwYXJhbSB7QXJyYXl9IHByb3BPcHRpb25zXG4gICAqIEBwYXJhbSB7VnVlfSB2bVxuICAgKiBAcmV0dXJuIHtGdW5jdGlvbn0gcHJvcHNMaW5rRm5cbiAgICovXG5cbiAgZnVuY3Rpb24gY29tcGlsZVByb3BzKGVsLCBwcm9wT3B0aW9ucywgdm0pIHtcbiAgICB2YXIgcHJvcHMgPSBbXTtcbiAgICB2YXIgbmFtZXMgPSBPYmplY3Qua2V5cyhwcm9wT3B0aW9ucyk7XG4gICAgdmFyIGkgPSBuYW1lcy5sZW5ndGg7XG4gICAgdmFyIG9wdGlvbnMsIG5hbWUsIGF0dHIsIHZhbHVlLCBwYXRoLCBwYXJzZWQsIHByb3A7XG4gICAgd2hpbGUgKGktLSkge1xuICAgICAgbmFtZSA9IG5hbWVzW2ldO1xuICAgICAgb3B0aW9ucyA9IHByb3BPcHRpb25zW25hbWVdIHx8IGVtcHR5O1xuXG4gICAgICBpZiAoJ2RldmVsb3BtZW50JyAhPT0gJ3Byb2R1Y3Rpb24nICYmIG5hbWUgPT09ICckZGF0YScpIHtcbiAgICAgICAgd2FybignRG8gbm90IHVzZSAkZGF0YSBhcyBwcm9wLicsIHZtKTtcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG5cbiAgICAgIC8vIHByb3BzIGNvdWxkIGNvbnRhaW4gZGFzaGVzLCB3aGljaCB3aWxsIGJlXG4gICAgICAvLyBpbnRlcnByZXRlZCBhcyBtaW51cyBjYWxjdWxhdGlvbnMgYnkgdGhlIHBhcnNlclxuICAgICAgLy8gc28gd2UgbmVlZCB0byBjYW1lbGl6ZSB0aGUgcGF0aCBoZXJlXG4gICAgICBwYXRoID0gY2FtZWxpemUobmFtZSk7XG4gICAgICBpZiAoIWlkZW50UkUkMS50ZXN0KHBhdGgpKSB7XG4gICAgICAgICdkZXZlbG9wbWVudCcgIT09ICdwcm9kdWN0aW9uJyAmJiB3YXJuKCdJbnZhbGlkIHByb3Aga2V5OiBcIicgKyBuYW1lICsgJ1wiLiBQcm9wIGtleXMgJyArICdtdXN0IGJlIHZhbGlkIGlkZW50aWZpZXJzLicsIHZtKTtcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG5cbiAgICAgIHByb3AgPSB7XG4gICAgICAgIG5hbWU6IG5hbWUsXG4gICAgICAgIHBhdGg6IHBhdGgsXG4gICAgICAgIG9wdGlvbnM6IG9wdGlvbnMsXG4gICAgICAgIG1vZGU6IHByb3BCaW5kaW5nTW9kZXMuT05FX1dBWSxcbiAgICAgICAgcmF3OiBudWxsXG4gICAgICB9O1xuXG4gICAgICBhdHRyID0gaHlwaGVuYXRlKG5hbWUpO1xuICAgICAgLy8gZmlyc3QgY2hlY2sgZHluYW1pYyB2ZXJzaW9uXG4gICAgICBpZiAoKHZhbHVlID0gZ2V0QmluZEF0dHIoZWwsIGF0dHIpKSA9PT0gbnVsbCkge1xuICAgICAgICBpZiAoKHZhbHVlID0gZ2V0QmluZEF0dHIoZWwsIGF0dHIgKyAnLnN5bmMnKSkgIT09IG51bGwpIHtcbiAgICAgICAgICBwcm9wLm1vZGUgPSBwcm9wQmluZGluZ01vZGVzLlRXT19XQVk7XG4gICAgICAgIH0gZWxzZSBpZiAoKHZhbHVlID0gZ2V0QmluZEF0dHIoZWwsIGF0dHIgKyAnLm9uY2UnKSkgIT09IG51bGwpIHtcbiAgICAgICAgICBwcm9wLm1vZGUgPSBwcm9wQmluZGluZ01vZGVzLk9ORV9USU1FO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAodmFsdWUgIT09IG51bGwpIHtcbiAgICAgICAgLy8gaGFzIGR5bmFtaWMgYmluZGluZyFcbiAgICAgICAgcHJvcC5yYXcgPSB2YWx1ZTtcbiAgICAgICAgcGFyc2VkID0gcGFyc2VEaXJlY3RpdmUodmFsdWUpO1xuICAgICAgICB2YWx1ZSA9IHBhcnNlZC5leHByZXNzaW9uO1xuICAgICAgICBwcm9wLmZpbHRlcnMgPSBwYXJzZWQuZmlsdGVycztcbiAgICAgICAgLy8gY2hlY2sgYmluZGluZyB0eXBlXG4gICAgICAgIGlmIChpc0xpdGVyYWwodmFsdWUpICYmICFwYXJzZWQuZmlsdGVycykge1xuICAgICAgICAgIC8vIGZvciBleHByZXNzaW9ucyBjb250YWluaW5nIGxpdGVyYWwgbnVtYmVycyBhbmRcbiAgICAgICAgICAvLyBib29sZWFucywgdGhlcmUncyBubyBuZWVkIHRvIHNldHVwIGEgcHJvcCBiaW5kaW5nLFxuICAgICAgICAgIC8vIHNvIHdlIGNhbiBvcHRpbWl6ZSB0aGVtIGFzIGEgb25lLXRpbWUgc2V0LlxuICAgICAgICAgIHByb3Aub3B0aW1pemVkTGl0ZXJhbCA9IHRydWU7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcHJvcC5keW5hbWljID0gdHJ1ZTtcbiAgICAgICAgICAvLyBjaGVjayBub24tc2V0dGFibGUgcGF0aCBmb3IgdHdvLXdheSBiaW5kaW5nc1xuICAgICAgICAgIGlmICgnZGV2ZWxvcG1lbnQnICE9PSAncHJvZHVjdGlvbicgJiYgcHJvcC5tb2RlID09PSBwcm9wQmluZGluZ01vZGVzLlRXT19XQVkgJiYgIXNldHRhYmxlUGF0aFJFLnRlc3QodmFsdWUpKSB7XG4gICAgICAgICAgICBwcm9wLm1vZGUgPSBwcm9wQmluZGluZ01vZGVzLk9ORV9XQVk7XG4gICAgICAgICAgICB3YXJuKCdDYW5ub3QgYmluZCB0d28td2F5IHByb3Agd2l0aCBub24tc2V0dGFibGUgJyArICdwYXJlbnQgcGF0aDogJyArIHZhbHVlLCB2bSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHByb3AucGFyZW50UGF0aCA9IHZhbHVlO1xuXG4gICAgICAgIC8vIHdhcm4gcmVxdWlyZWQgdHdvLXdheVxuICAgICAgICBpZiAoJ2RldmVsb3BtZW50JyAhPT0gJ3Byb2R1Y3Rpb24nICYmIG9wdGlvbnMudHdvV2F5ICYmIHByb3AubW9kZSAhPT0gcHJvcEJpbmRpbmdNb2Rlcy5UV09fV0FZKSB7XG4gICAgICAgICAgd2FybignUHJvcCBcIicgKyBuYW1lICsgJ1wiIGV4cGVjdHMgYSB0d28td2F5IGJpbmRpbmcgdHlwZS4nLCB2bSk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSBpZiAoKHZhbHVlID0gZ2V0QXR0cihlbCwgYXR0cikpICE9PSBudWxsKSB7XG4gICAgICAgIC8vIGhhcyBsaXRlcmFsIGJpbmRpbmchXG4gICAgICAgIHByb3AucmF3ID0gdmFsdWU7XG4gICAgICB9IGVsc2UgaWYgKCdkZXZlbG9wbWVudCcgIT09ICdwcm9kdWN0aW9uJykge1xuICAgICAgICAvLyBjaGVjayBwb3NzaWJsZSBjYW1lbENhc2UgcHJvcCB1c2FnZVxuICAgICAgICB2YXIgbG93ZXJDYXNlTmFtZSA9IHBhdGgudG9Mb3dlckNhc2UoKTtcbiAgICAgICAgdmFsdWUgPSAvW0EtWlxcLV0vLnRlc3QobmFtZSkgJiYgKGVsLmdldEF0dHJpYnV0ZShsb3dlckNhc2VOYW1lKSB8fCBlbC5nZXRBdHRyaWJ1dGUoJzonICsgbG93ZXJDYXNlTmFtZSkgfHwgZWwuZ2V0QXR0cmlidXRlKCd2LWJpbmQ6JyArIGxvd2VyQ2FzZU5hbWUpIHx8IGVsLmdldEF0dHJpYnV0ZSgnOicgKyBsb3dlckNhc2VOYW1lICsgJy5vbmNlJykgfHwgZWwuZ2V0QXR0cmlidXRlKCd2LWJpbmQ6JyArIGxvd2VyQ2FzZU5hbWUgKyAnLm9uY2UnKSB8fCBlbC5nZXRBdHRyaWJ1dGUoJzonICsgbG93ZXJDYXNlTmFtZSArICcuc3luYycpIHx8IGVsLmdldEF0dHJpYnV0ZSgndi1iaW5kOicgKyBsb3dlckNhc2VOYW1lICsgJy5zeW5jJykpO1xuICAgICAgICBpZiAodmFsdWUpIHtcbiAgICAgICAgICB3YXJuKCdQb3NzaWJsZSB1c2FnZSBlcnJvciBmb3IgcHJvcCBgJyArIGxvd2VyQ2FzZU5hbWUgKyAnYCAtICcgKyAnZGlkIHlvdSBtZWFuIGAnICsgYXR0ciArICdgPyBIVE1MIGlzIGNhc2UtaW5zZW5zaXRpdmUsIHJlbWVtYmVyIHRvIHVzZSAnICsgJ2tlYmFiLWNhc2UgZm9yIHByb3BzIGluIHRlbXBsYXRlcy4nLCB2bSk7XG4gICAgICAgIH0gZWxzZSBpZiAob3B0aW9ucy5yZXF1aXJlZCkge1xuICAgICAgICAgIC8vIHdhcm4gbWlzc2luZyByZXF1aXJlZFxuICAgICAgICAgIHdhcm4oJ01pc3NpbmcgcmVxdWlyZWQgcHJvcDogJyArIG5hbWUsIHZtKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgLy8gcHVzaCBwcm9wXG4gICAgICBwcm9wcy5wdXNoKHByb3ApO1xuICAgIH1cbiAgICByZXR1cm4gbWFrZVByb3BzTGlua0ZuKHByb3BzKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBCdWlsZCBhIGZ1bmN0aW9uIHRoYXQgYXBwbGllcyBwcm9wcyB0byBhIHZtLlxuICAgKlxuICAgKiBAcGFyYW0ge0FycmF5fSBwcm9wc1xuICAgKiBAcmV0dXJuIHtGdW5jdGlvbn0gcHJvcHNMaW5rRm5cbiAgICovXG5cbiAgZnVuY3Rpb24gbWFrZVByb3BzTGlua0ZuKHByb3BzKSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uIHByb3BzTGlua0ZuKHZtLCBzY29wZSkge1xuICAgICAgLy8gc3RvcmUgcmVzb2x2ZWQgcHJvcHMgaW5mb1xuICAgICAgdm0uX3Byb3BzID0ge307XG4gICAgICB2YXIgaW5saW5lUHJvcHMgPSB2bS4kb3B0aW9ucy5wcm9wc0RhdGE7XG4gICAgICB2YXIgaSA9IHByb3BzLmxlbmd0aDtcbiAgICAgIHZhciBwcm9wLCBwYXRoLCBvcHRpb25zLCB2YWx1ZSwgcmF3O1xuICAgICAgd2hpbGUgKGktLSkge1xuICAgICAgICBwcm9wID0gcHJvcHNbaV07XG4gICAgICAgIHJhdyA9IHByb3AucmF3O1xuICAgICAgICBwYXRoID0gcHJvcC5wYXRoO1xuICAgICAgICBvcHRpb25zID0gcHJvcC5vcHRpb25zO1xuICAgICAgICB2bS5fcHJvcHNbcGF0aF0gPSBwcm9wO1xuICAgICAgICBpZiAoaW5saW5lUHJvcHMgJiYgaGFzT3duKGlubGluZVByb3BzLCBwYXRoKSkge1xuICAgICAgICAgIGluaXRQcm9wKHZtLCBwcm9wLCBpbmxpbmVQcm9wc1twYXRoXSk7XG4gICAgICAgIH1pZiAocmF3ID09PSBudWxsKSB7XG4gICAgICAgICAgLy8gaW5pdGlhbGl6ZSBhYnNlbnQgcHJvcFxuICAgICAgICAgIGluaXRQcm9wKHZtLCBwcm9wLCB1bmRlZmluZWQpO1xuICAgICAgICB9IGVsc2UgaWYgKHByb3AuZHluYW1pYykge1xuICAgICAgICAgIC8vIGR5bmFtaWMgcHJvcFxuICAgICAgICAgIGlmIChwcm9wLm1vZGUgPT09IHByb3BCaW5kaW5nTW9kZXMuT05FX1RJTUUpIHtcbiAgICAgICAgICAgIC8vIG9uZSB0aW1lIGJpbmRpbmdcbiAgICAgICAgICAgIHZhbHVlID0gKHNjb3BlIHx8IHZtLl9jb250ZXh0IHx8IHZtKS4kZ2V0KHByb3AucGFyZW50UGF0aCk7XG4gICAgICAgICAgICBpbml0UHJvcCh2bSwgcHJvcCwgdmFsdWUpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBpZiAodm0uX2NvbnRleHQpIHtcbiAgICAgICAgICAgICAgLy8gZHluYW1pYyBiaW5kaW5nXG4gICAgICAgICAgICAgIHZtLl9iaW5kRGlyKHtcbiAgICAgICAgICAgICAgICBuYW1lOiAncHJvcCcsXG4gICAgICAgICAgICAgICAgZGVmOiBwcm9wRGVmLFxuICAgICAgICAgICAgICAgIHByb3A6IHByb3BcbiAgICAgICAgICAgICAgfSwgbnVsbCwgbnVsbCwgc2NvcGUpOyAvLyBlbCwgaG9zdCwgc2NvcGVcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgLy8gcm9vdCBpbnN0YW5jZVxuICAgICAgICAgICAgICAgIGluaXRQcm9wKHZtLCBwcm9wLCB2bS4kZ2V0KHByb3AucGFyZW50UGF0aCkpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2UgaWYgKHByb3Aub3B0aW1pemVkTGl0ZXJhbCkge1xuICAgICAgICAgIC8vIG9wdGltaXplZCBsaXRlcmFsLCBjYXN0IGl0IGFuZCBqdXN0IHNldCBvbmNlXG4gICAgICAgICAgdmFyIHN0cmlwcGVkID0gc3RyaXBRdW90ZXMocmF3KTtcbiAgICAgICAgICB2YWx1ZSA9IHN0cmlwcGVkID09PSByYXcgPyB0b0Jvb2xlYW4odG9OdW1iZXIocmF3KSkgOiBzdHJpcHBlZDtcbiAgICAgICAgICBpbml0UHJvcCh2bSwgcHJvcCwgdmFsdWUpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIC8vIHN0cmluZyBsaXRlcmFsLCBidXQgd2UgbmVlZCB0byBjYXRlciBmb3JcbiAgICAgICAgICAvLyBCb29sZWFuIHByb3BzIHdpdGggbm8gdmFsdWUsIG9yIHdpdGggc2FtZVxuICAgICAgICAgIC8vIGxpdGVyYWwgdmFsdWUgKGUuZy4gZGlzYWJsZWQ9XCJkaXNhYmxlZFwiKVxuICAgICAgICAgIC8vIHNlZSBodHRwczovL2dpdGh1Yi5jb20vdnVlanMvdnVlLWxvYWRlci9pc3N1ZXMvMTgyXG4gICAgICAgICAgdmFsdWUgPSBvcHRpb25zLnR5cGUgPT09IEJvb2xlYW4gJiYgKHJhdyA9PT0gJycgfHwgcmF3ID09PSBoeXBoZW5hdGUocHJvcC5uYW1lKSkgPyB0cnVlIDogcmF3O1xuICAgICAgICAgIGluaXRQcm9wKHZtLCBwcm9wLCB2YWx1ZSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9O1xuICB9XG5cbiAgLyoqXG4gICAqIFByb2Nlc3MgYSBwcm9wIHdpdGggYSByYXdWYWx1ZSwgYXBwbHlpbmcgbmVjZXNzYXJ5IGNvZXJzaW9ucyxcbiAgICogZGVmYXVsdCB2YWx1ZXMgJiBhc3NlcnRpb25zIGFuZCBjYWxsIHRoZSBnaXZlbiBjYWxsYmFjayB3aXRoXG4gICAqIHByb2Nlc3NlZCB2YWx1ZS5cbiAgICpcbiAgICogQHBhcmFtIHtWdWV9IHZtXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBwcm9wXG4gICAqIEBwYXJhbSB7Kn0gcmF3VmFsdWVcbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gZm5cbiAgICovXG5cbiAgZnVuY3Rpb24gcHJvY2Vzc1Byb3BWYWx1ZSh2bSwgcHJvcCwgcmF3VmFsdWUsIGZuKSB7XG4gICAgdmFyIGlzU2ltcGxlID0gcHJvcC5keW5hbWljICYmIGlzU2ltcGxlUGF0aChwcm9wLnBhcmVudFBhdGgpO1xuICAgIHZhciB2YWx1ZSA9IHJhd1ZhbHVlO1xuICAgIGlmICh2YWx1ZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICB2YWx1ZSA9IGdldFByb3BEZWZhdWx0VmFsdWUodm0sIHByb3ApO1xuICAgIH1cbiAgICB2YWx1ZSA9IGNvZXJjZVByb3AocHJvcCwgdmFsdWUpO1xuICAgIHZhciBjb2VyY2VkID0gdmFsdWUgIT09IHJhd1ZhbHVlO1xuICAgIGlmICghYXNzZXJ0UHJvcChwcm9wLCB2YWx1ZSwgdm0pKSB7XG4gICAgICB2YWx1ZSA9IHVuZGVmaW5lZDtcbiAgICB9XG4gICAgaWYgKGlzU2ltcGxlICYmICFjb2VyY2VkKSB7XG4gICAgICB3aXRob3V0Q29udmVyc2lvbihmdW5jdGlvbiAoKSB7XG4gICAgICAgIGZuKHZhbHVlKTtcbiAgICAgIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICBmbih2YWx1ZSk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFNldCBhIHByb3AncyBpbml0aWFsIHZhbHVlIG9uIGEgdm0gYW5kIGl0cyBkYXRhIG9iamVjdC5cbiAgICpcbiAgICogQHBhcmFtIHtWdWV9IHZtXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBwcm9wXG4gICAqIEBwYXJhbSB7Kn0gdmFsdWVcbiAgICovXG5cbiAgZnVuY3Rpb24gaW5pdFByb3Aodm0sIHByb3AsIHZhbHVlKSB7XG4gICAgcHJvY2Vzc1Byb3BWYWx1ZSh2bSwgcHJvcCwgdmFsdWUsIGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgZGVmaW5lUmVhY3RpdmUodm0sIHByb3AucGF0aCwgdmFsdWUpO1xuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIFVwZGF0ZSBhIHByb3AncyB2YWx1ZSBvbiBhIHZtLlxuICAgKlxuICAgKiBAcGFyYW0ge1Z1ZX0gdm1cbiAgICogQHBhcmFtIHtPYmplY3R9IHByb3BcbiAgICogQHBhcmFtIHsqfSB2YWx1ZVxuICAgKi9cblxuICBmdW5jdGlvbiB1cGRhdGVQcm9wKHZtLCBwcm9wLCB2YWx1ZSkge1xuICAgIHByb2Nlc3NQcm9wVmFsdWUodm0sIHByb3AsIHZhbHVlLCBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgIHZtW3Byb3AucGF0aF0gPSB2YWx1ZTtcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgdGhlIGRlZmF1bHQgdmFsdWUgb2YgYSBwcm9wLlxuICAgKlxuICAgKiBAcGFyYW0ge1Z1ZX0gdm1cbiAgICogQHBhcmFtIHtPYmplY3R9IHByb3BcbiAgICogQHJldHVybiB7Kn1cbiAgICovXG5cbiAgZnVuY3Rpb24gZ2V0UHJvcERlZmF1bHRWYWx1ZSh2bSwgcHJvcCkge1xuICAgIC8vIG5vIGRlZmF1bHQsIHJldHVybiB1bmRlZmluZWRcbiAgICB2YXIgb3B0aW9ucyA9IHByb3Aub3B0aW9ucztcbiAgICBpZiAoIWhhc093bihvcHRpb25zLCAnZGVmYXVsdCcpKSB7XG4gICAgICAvLyBhYnNlbnQgYm9vbGVhbiB2YWx1ZSBkZWZhdWx0cyB0byBmYWxzZVxuICAgICAgcmV0dXJuIG9wdGlvbnMudHlwZSA9PT0gQm9vbGVhbiA/IGZhbHNlIDogdW5kZWZpbmVkO1xuICAgIH1cbiAgICB2YXIgZGVmID0gb3B0aW9uc1snZGVmYXVsdCddO1xuICAgIC8vIHdhcm4gYWdhaW5zdCBub24tZmFjdG9yeSBkZWZhdWx0cyBmb3IgT2JqZWN0ICYgQXJyYXlcbiAgICBpZiAoaXNPYmplY3QoZGVmKSkge1xuICAgICAgJ2RldmVsb3BtZW50JyAhPT0gJ3Byb2R1Y3Rpb24nICYmIHdhcm4oJ0ludmFsaWQgZGVmYXVsdCB2YWx1ZSBmb3IgcHJvcCBcIicgKyBwcm9wLm5hbWUgKyAnXCI6ICcgKyAnUHJvcHMgd2l0aCB0eXBlIE9iamVjdC9BcnJheSBtdXN0IHVzZSBhIGZhY3RvcnkgZnVuY3Rpb24gJyArICd0byByZXR1cm4gdGhlIGRlZmF1bHQgdmFsdWUuJywgdm0pO1xuICAgIH1cbiAgICAvLyBjYWxsIGZhY3RvcnkgZnVuY3Rpb24gZm9yIG5vbi1GdW5jdGlvbiB0eXBlc1xuICAgIHJldHVybiB0eXBlb2YgZGVmID09PSAnZnVuY3Rpb24nICYmIG9wdGlvbnMudHlwZSAhPT0gRnVuY3Rpb24gPyBkZWYuY2FsbCh2bSkgOiBkZWY7XG4gIH1cblxuICAvKipcbiAgICogQXNzZXJ0IHdoZXRoZXIgYSBwcm9wIGlzIHZhbGlkLlxuICAgKlxuICAgKiBAcGFyYW0ge09iamVjdH0gcHJvcFxuICAgKiBAcGFyYW0geyp9IHZhbHVlXG4gICAqIEBwYXJhbSB7VnVlfSB2bVxuICAgKi9cblxuICBmdW5jdGlvbiBhc3NlcnRQcm9wKHByb3AsIHZhbHVlLCB2bSkge1xuICAgIGlmICghcHJvcC5vcHRpb25zLnJlcXVpcmVkICYmICggLy8gbm9uLXJlcXVpcmVkXG4gICAgcHJvcC5yYXcgPT09IG51bGwgfHwgLy8gYWJzY2VudFxuICAgIHZhbHVlID09IG51bGwpIC8vIG51bGwgb3IgdW5kZWZpbmVkXG4gICAgKSB7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfVxuICAgIHZhciBvcHRpb25zID0gcHJvcC5vcHRpb25zO1xuICAgIHZhciB0eXBlID0gb3B0aW9ucy50eXBlO1xuICAgIHZhciB2YWxpZCA9ICF0eXBlO1xuICAgIHZhciBleHBlY3RlZFR5cGVzID0gW107XG4gICAgaWYgKHR5cGUpIHtcbiAgICAgIGlmICghaXNBcnJheSh0eXBlKSkge1xuICAgICAgICB0eXBlID0gW3R5cGVdO1xuICAgICAgfVxuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0eXBlLmxlbmd0aCAmJiAhdmFsaWQ7IGkrKykge1xuICAgICAgICB2YXIgYXNzZXJ0ZWRUeXBlID0gYXNzZXJ0VHlwZSh2YWx1ZSwgdHlwZVtpXSk7XG4gICAgICAgIGV4cGVjdGVkVHlwZXMucHVzaChhc3NlcnRlZFR5cGUuZXhwZWN0ZWRUeXBlKTtcbiAgICAgICAgdmFsaWQgPSBhc3NlcnRlZFR5cGUudmFsaWQ7XG4gICAgICB9XG4gICAgfVxuICAgIGlmICghdmFsaWQpIHtcbiAgICAgIGlmICgnZGV2ZWxvcG1lbnQnICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICAgICAgd2FybignSW52YWxpZCBwcm9wOiB0eXBlIGNoZWNrIGZhaWxlZCBmb3IgcHJvcCBcIicgKyBwcm9wLm5hbWUgKyAnXCIuJyArICcgRXhwZWN0ZWQgJyArIGV4cGVjdGVkVHlwZXMubWFwKGZvcm1hdFR5cGUpLmpvaW4oJywgJykgKyAnLCBnb3QgJyArIGZvcm1hdFZhbHVlKHZhbHVlKSArICcuJywgdm0pO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICB2YXIgdmFsaWRhdG9yID0gb3B0aW9ucy52YWxpZGF0b3I7XG4gICAgaWYgKHZhbGlkYXRvcikge1xuICAgICAgaWYgKCF2YWxpZGF0b3IodmFsdWUpKSB7XG4gICAgICAgICdkZXZlbG9wbWVudCcgIT09ICdwcm9kdWN0aW9uJyAmJiB3YXJuKCdJbnZhbGlkIHByb3A6IGN1c3RvbSB2YWxpZGF0b3IgY2hlY2sgZmFpbGVkIGZvciBwcm9wIFwiJyArIHByb3AubmFtZSArICdcIi4nLCB2bSk7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuICAvKipcbiAgICogRm9yY2UgcGFyc2luZyB2YWx1ZSB3aXRoIGNvZXJjZSBvcHRpb24uXG4gICAqXG4gICAqIEBwYXJhbSB7Kn0gdmFsdWVcbiAgICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnNcbiAgICogQHJldHVybiB7Kn1cbiAgICovXG5cbiAgZnVuY3Rpb24gY29lcmNlUHJvcChwcm9wLCB2YWx1ZSkge1xuICAgIHZhciBjb2VyY2UgPSBwcm9wLm9wdGlvbnMuY29lcmNlO1xuICAgIGlmICghY29lcmNlKSB7XG4gICAgICByZXR1cm4gdmFsdWU7XG4gICAgfVxuICAgIC8vIGNvZXJjZSBpcyBhIGZ1bmN0aW9uXG4gICAgcmV0dXJuIGNvZXJjZSh2YWx1ZSk7XG4gIH1cblxuICAvKipcbiAgICogQXNzZXJ0IHRoZSB0eXBlIG9mIGEgdmFsdWVcbiAgICpcbiAgICogQHBhcmFtIHsqfSB2YWx1ZVxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSB0eXBlXG4gICAqIEByZXR1cm4ge09iamVjdH1cbiAgICovXG5cbiAgZnVuY3Rpb24gYXNzZXJ0VHlwZSh2YWx1ZSwgdHlwZSkge1xuICAgIHZhciB2YWxpZDtcbiAgICB2YXIgZXhwZWN0ZWRUeXBlO1xuICAgIGlmICh0eXBlID09PSBTdHJpbmcpIHtcbiAgICAgIGV4cGVjdGVkVHlwZSA9ICdzdHJpbmcnO1xuICAgICAgdmFsaWQgPSB0eXBlb2YgdmFsdWUgPT09IGV4cGVjdGVkVHlwZTtcbiAgICB9IGVsc2UgaWYgKHR5cGUgPT09IE51bWJlcikge1xuICAgICAgZXhwZWN0ZWRUeXBlID0gJ251bWJlcic7XG4gICAgICB2YWxpZCA9IHR5cGVvZiB2YWx1ZSA9PT0gZXhwZWN0ZWRUeXBlO1xuICAgIH0gZWxzZSBpZiAodHlwZSA9PT0gQm9vbGVhbikge1xuICAgICAgZXhwZWN0ZWRUeXBlID0gJ2Jvb2xlYW4nO1xuICAgICAgdmFsaWQgPSB0eXBlb2YgdmFsdWUgPT09IGV4cGVjdGVkVHlwZTtcbiAgICB9IGVsc2UgaWYgKHR5cGUgPT09IEZ1bmN0aW9uKSB7XG4gICAgICBleHBlY3RlZFR5cGUgPSAnZnVuY3Rpb24nO1xuICAgICAgdmFsaWQgPSB0eXBlb2YgdmFsdWUgPT09IGV4cGVjdGVkVHlwZTtcbiAgICB9IGVsc2UgaWYgKHR5cGUgPT09IE9iamVjdCkge1xuICAgICAgZXhwZWN0ZWRUeXBlID0gJ29iamVjdCc7XG4gICAgICB2YWxpZCA9IGlzUGxhaW5PYmplY3QodmFsdWUpO1xuICAgIH0gZWxzZSBpZiAodHlwZSA9PT0gQXJyYXkpIHtcbiAgICAgIGV4cGVjdGVkVHlwZSA9ICdhcnJheSc7XG4gICAgICB2YWxpZCA9IGlzQXJyYXkodmFsdWUpO1xuICAgIH0gZWxzZSB7XG4gICAgICB2YWxpZCA9IHZhbHVlIGluc3RhbmNlb2YgdHlwZTtcbiAgICB9XG4gICAgcmV0dXJuIHtcbiAgICAgIHZhbGlkOiB2YWxpZCxcbiAgICAgIGV4cGVjdGVkVHlwZTogZXhwZWN0ZWRUeXBlXG4gICAgfTtcbiAgfVxuXG4gIC8qKlxuICAgKiBGb3JtYXQgdHlwZSBmb3Igb3V0cHV0XG4gICAqXG4gICAqIEBwYXJhbSB7U3RyaW5nfSB0eXBlXG4gICAqIEByZXR1cm4ge1N0cmluZ31cbiAgICovXG5cbiAgZnVuY3Rpb24gZm9ybWF0VHlwZSh0eXBlKSB7XG4gICAgcmV0dXJuIHR5cGUgPyB0eXBlLmNoYXJBdCgwKS50b1VwcGVyQ2FzZSgpICsgdHlwZS5zbGljZSgxKSA6ICdjdXN0b20gdHlwZSc7XG4gIH1cblxuICAvKipcbiAgICogRm9ybWF0IHZhbHVlXG4gICAqXG4gICAqIEBwYXJhbSB7Kn0gdmFsdWVcbiAgICogQHJldHVybiB7U3RyaW5nfVxuICAgKi9cblxuICBmdW5jdGlvbiBmb3JtYXRWYWx1ZSh2YWwpIHtcbiAgICByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKHZhbCkuc2xpY2UoOCwgLTEpO1xuICB9XG5cbiAgdmFyIGJpbmRpbmdNb2RlcyA9IGNvbmZpZy5fcHJvcEJpbmRpbmdNb2RlcztcblxuICB2YXIgcHJvcERlZiA9IHtcblxuICAgIGJpbmQ6IGZ1bmN0aW9uIGJpbmQoKSB7XG4gICAgICB2YXIgY2hpbGQgPSB0aGlzLnZtO1xuICAgICAgdmFyIHBhcmVudCA9IGNoaWxkLl9jb250ZXh0O1xuICAgICAgLy8gcGFzc2VkIGluIGZyb20gY29tcGlsZXIgZGlyZWN0bHlcbiAgICAgIHZhciBwcm9wID0gdGhpcy5kZXNjcmlwdG9yLnByb3A7XG4gICAgICB2YXIgY2hpbGRLZXkgPSBwcm9wLnBhdGg7XG4gICAgICB2YXIgcGFyZW50S2V5ID0gcHJvcC5wYXJlbnRQYXRoO1xuICAgICAgdmFyIHR3b1dheSA9IHByb3AubW9kZSA9PT0gYmluZGluZ01vZGVzLlRXT19XQVk7XG5cbiAgICAgIHZhciBwYXJlbnRXYXRjaGVyID0gdGhpcy5wYXJlbnRXYXRjaGVyID0gbmV3IFdhdGNoZXIocGFyZW50LCBwYXJlbnRLZXksIGZ1bmN0aW9uICh2YWwpIHtcbiAgICAgICAgdXBkYXRlUHJvcChjaGlsZCwgcHJvcCwgdmFsKTtcbiAgICAgIH0sIHtcbiAgICAgICAgdHdvV2F5OiB0d29XYXksXG4gICAgICAgIGZpbHRlcnM6IHByb3AuZmlsdGVycyxcbiAgICAgICAgLy8gaW1wb3J0YW50OiBwcm9wcyBuZWVkIHRvIGJlIG9ic2VydmVkIG9uIHRoZVxuICAgICAgICAvLyB2LWZvciBzY29wZSBpZiBwcmVzZW50XG4gICAgICAgIHNjb3BlOiB0aGlzLl9zY29wZVxuICAgICAgfSk7XG5cbiAgICAgIC8vIHNldCB0aGUgY2hpbGQgaW5pdGlhbCB2YWx1ZS5cbiAgICAgIGluaXRQcm9wKGNoaWxkLCBwcm9wLCBwYXJlbnRXYXRjaGVyLnZhbHVlKTtcblxuICAgICAgLy8gc2V0dXAgdHdvLXdheSBiaW5kaW5nXG4gICAgICBpZiAodHdvV2F5KSB7XG4gICAgICAgIC8vIGltcG9ydGFudDogZGVmZXIgdGhlIGNoaWxkIHdhdGNoZXIgY3JlYXRpb24gdW50aWxcbiAgICAgICAgLy8gdGhlIGNyZWF0ZWQgaG9vayAoYWZ0ZXIgZGF0YSBvYnNlcnZhdGlvbilcbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgICAgICBjaGlsZC4kb25jZSgncHJlLWhvb2s6Y3JlYXRlZCcsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICBzZWxmLmNoaWxkV2F0Y2hlciA9IG5ldyBXYXRjaGVyKGNoaWxkLCBjaGlsZEtleSwgZnVuY3Rpb24gKHZhbCkge1xuICAgICAgICAgICAgcGFyZW50V2F0Y2hlci5zZXQodmFsKTtcbiAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAvLyBlbnN1cmUgc3luYyB1cHdhcmQgYmVmb3JlIHBhcmVudCBzeW5jIGRvd24uXG4gICAgICAgICAgICAvLyB0aGlzIGlzIG5lY2Vzc2FyeSBpbiBjYXNlcyBlLmcuIHRoZSBjaGlsZFxuICAgICAgICAgICAgLy8gbXV0YXRlcyBhIHByb3AgYXJyYXksIHRoZW4gcmVwbGFjZXMgaXQuICgjMTY4MylcbiAgICAgICAgICAgIHN5bmM6IHRydWVcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfSxcblxuICAgIHVuYmluZDogZnVuY3Rpb24gdW5iaW5kKCkge1xuICAgICAgdGhpcy5wYXJlbnRXYXRjaGVyLnRlYXJkb3duKCk7XG4gICAgICBpZiAodGhpcy5jaGlsZFdhdGNoZXIpIHtcbiAgICAgICAgdGhpcy5jaGlsZFdhdGNoZXIudGVhcmRvd24oKTtcbiAgICAgIH1cbiAgICB9XG4gIH07XG5cbiAgdmFyIHF1ZXVlJDEgPSBbXTtcbiAgdmFyIHF1ZXVlZCA9IGZhbHNlO1xuXG4gIC8qKlxuICAgKiBQdXNoIGEgam9iIGludG8gdGhlIHF1ZXVlLlxuICAgKlxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBqb2JcbiAgICovXG5cbiAgZnVuY3Rpb24gcHVzaEpvYihqb2IpIHtcbiAgICBxdWV1ZSQxLnB1c2goam9iKTtcbiAgICBpZiAoIXF1ZXVlZCkge1xuICAgICAgcXVldWVkID0gdHJ1ZTtcbiAgICAgIG5leHRUaWNrKGZsdXNoKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogRmx1c2ggdGhlIHF1ZXVlLCBhbmQgZG8gb25lIGZvcmNlZCByZWZsb3cgYmVmb3JlXG4gICAqIHRyaWdnZXJpbmcgdHJhbnNpdGlvbnMuXG4gICAqL1xuXG4gIGZ1bmN0aW9uIGZsdXNoKCkge1xuICAgIC8vIEZvcmNlIGxheW91dFxuICAgIHZhciBmID0gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50Lm9mZnNldEhlaWdodDtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHF1ZXVlJDEubGVuZ3RoOyBpKyspIHtcbiAgICAgIHF1ZXVlJDFbaV0oKTtcbiAgICB9XG4gICAgcXVldWUkMSA9IFtdO1xuICAgIHF1ZXVlZCA9IGZhbHNlO1xuICAgIC8vIGR1bW15IHJldHVybiwgc28ganMgbGludGVycyBkb24ndCBjb21wbGFpbiBhYm91dFxuICAgIC8vIHVudXNlZCB2YXJpYWJsZSBmXG4gICAgcmV0dXJuIGY7XG4gIH1cblxuICB2YXIgVFlQRV9UUkFOU0lUSU9OID0gJ3RyYW5zaXRpb24nO1xuICB2YXIgVFlQRV9BTklNQVRJT04gPSAnYW5pbWF0aW9uJztcbiAgdmFyIHRyYW5zRHVyYXRpb25Qcm9wID0gdHJhbnNpdGlvblByb3AgKyAnRHVyYXRpb24nO1xuICB2YXIgYW5pbUR1cmF0aW9uUHJvcCA9IGFuaW1hdGlvblByb3AgKyAnRHVyYXRpb24nO1xuXG4gIC8qKlxuICAgKiBJZiBhIGp1c3QtZW50ZXJlZCBlbGVtZW50IGlzIGFwcGxpZWQgdGhlXG4gICAqIGxlYXZlIGNsYXNzIHdoaWxlIGl0cyBlbnRlciB0cmFuc2l0aW9uIGhhc24ndCBzdGFydGVkIHlldCxcbiAgICogYW5kIHRoZSB0cmFuc2l0aW9uZWQgcHJvcGVydHkgaGFzIHRoZSBzYW1lIHZhbHVlIGZvciBib3RoXG4gICAqIGVudGVyL2xlYXZlLCB0aGVuIHRoZSBsZWF2ZSB0cmFuc2l0aW9uIHdpbGwgYmUgc2tpcHBlZCBhbmRcbiAgICogdGhlIHRyYW5zaXRpb25lbmQgZXZlbnQgbmV2ZXIgZmlyZXMuIFRoaXMgZnVuY3Rpb24gZW5zdXJlc1xuICAgKiBpdHMgY2FsbGJhY2sgdG8gYmUgY2FsbGVkIGFmdGVyIGEgdHJhbnNpdGlvbiBoYXMgc3RhcnRlZFxuICAgKiBieSB3YWl0aW5nIGZvciBkb3VibGUgcmFmLlxuICAgKlxuICAgKiBJdCBmYWxscyBiYWNrIHRvIHNldFRpbWVvdXQgb24gZGV2aWNlcyB0aGF0IHN1cHBvcnQgQ1NTXG4gICAqIHRyYW5zaXRpb25zIGJ1dCBub3QgcmFmIChlLmcuIEFuZHJvaWQgNC4yIGJyb3dzZXIpIC0gc2luY2VcbiAgICogdGhlc2UgZW52aXJvbm1lbnRzIGFyZSB1c3VhbGx5IHNsb3csIHdlIGFyZSBnaXZpbmcgaXQgYVxuICAgKiByZWxhdGl2ZWx5IGxhcmdlIHRpbWVvdXQuXG4gICAqL1xuXG4gIHZhciByYWYgPSBpbkJyb3dzZXIgJiYgd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZTtcbiAgdmFyIHdhaXRGb3JUcmFuc2l0aW9uU3RhcnQgPSByYWZcbiAgLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cbiAgPyBmdW5jdGlvbiAoZm4pIHtcbiAgICByYWYoZnVuY3Rpb24gKCkge1xuICAgICAgcmFmKGZuKTtcbiAgICB9KTtcbiAgfSA6IGZ1bmN0aW9uIChmbikge1xuICAgIHNldFRpbWVvdXQoZm4sIDUwKTtcbiAgfTtcblxuICAvKipcbiAgICogQSBUcmFuc2l0aW9uIG9iamVjdCB0aGF0IGVuY2Fwc3VsYXRlcyB0aGUgc3RhdGUgYW5kIGxvZ2ljXG4gICAqIG9mIHRoZSB0cmFuc2l0aW9uLlxuICAgKlxuICAgKiBAcGFyYW0ge0VsZW1lbnR9IGVsXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBpZFxuICAgKiBAcGFyYW0ge09iamVjdH0gaG9va3NcbiAgICogQHBhcmFtIHtWdWV9IHZtXG4gICAqL1xuICBmdW5jdGlvbiBUcmFuc2l0aW9uKGVsLCBpZCwgaG9va3MsIHZtKSB7XG4gICAgdGhpcy5pZCA9IGlkO1xuICAgIHRoaXMuZWwgPSBlbDtcbiAgICB0aGlzLmVudGVyQ2xhc3MgPSBob29rcyAmJiBob29rcy5lbnRlckNsYXNzIHx8IGlkICsgJy1lbnRlcic7XG4gICAgdGhpcy5sZWF2ZUNsYXNzID0gaG9va3MgJiYgaG9va3MubGVhdmVDbGFzcyB8fCBpZCArICctbGVhdmUnO1xuICAgIHRoaXMuaG9va3MgPSBob29rcztcbiAgICB0aGlzLnZtID0gdm07XG4gICAgLy8gYXN5bmMgc3RhdGVcbiAgICB0aGlzLnBlbmRpbmdDc3NFdmVudCA9IHRoaXMucGVuZGluZ0Nzc0NiID0gdGhpcy5jYW5jZWwgPSB0aGlzLnBlbmRpbmdKc0NiID0gdGhpcy5vcCA9IHRoaXMuY2IgPSBudWxsO1xuICAgIHRoaXMuanVzdEVudGVyZWQgPSBmYWxzZTtcbiAgICB0aGlzLmVudGVyZWQgPSB0aGlzLmxlZnQgPSBmYWxzZTtcbiAgICB0aGlzLnR5cGVDYWNoZSA9IHt9O1xuICAgIC8vIGNoZWNrIGNzcyB0cmFuc2l0aW9uIHR5cGVcbiAgICB0aGlzLnR5cGUgPSBob29rcyAmJiBob29rcy50eXBlO1xuICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBpZiAqL1xuICAgIGlmICgnZGV2ZWxvcG1lbnQnICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICAgIGlmICh0aGlzLnR5cGUgJiYgdGhpcy50eXBlICE9PSBUWVBFX1RSQU5TSVRJT04gJiYgdGhpcy50eXBlICE9PSBUWVBFX0FOSU1BVElPTikge1xuICAgICAgICB3YXJuKCdpbnZhbGlkIENTUyB0cmFuc2l0aW9uIHR5cGUgZm9yIHRyYW5zaXRpb249XCInICsgdGhpcy5pZCArICdcIjogJyArIHRoaXMudHlwZSwgdm0pO1xuICAgICAgfVxuICAgIH1cbiAgICAvLyBiaW5kXG4gICAgdmFyIHNlbGYgPSB0aGlzO1snZW50ZXJOZXh0VGljaycsICdlbnRlckRvbmUnLCAnbGVhdmVOZXh0VGljaycsICdsZWF2ZURvbmUnXS5mb3JFYWNoKGZ1bmN0aW9uIChtKSB7XG4gICAgICBzZWxmW21dID0gYmluZChzZWxmW21dLCBzZWxmKTtcbiAgICB9KTtcbiAgfVxuXG4gIHZhciBwJDEgPSBUcmFuc2l0aW9uLnByb3RvdHlwZTtcblxuICAvKipcbiAgICogU3RhcnQgYW4gZW50ZXJpbmcgdHJhbnNpdGlvbi5cbiAgICpcbiAgICogMS4gZW50ZXIgdHJhbnNpdGlvbiB0cmlnZ2VyZWRcbiAgICogMi4gY2FsbCBiZWZvcmVFbnRlciBob29rXG4gICAqIDMuIGFkZCBlbnRlciBjbGFzc1xuICAgKiA0LiBpbnNlcnQvc2hvdyBlbGVtZW50XG4gICAqIDUuIGNhbGwgZW50ZXIgaG9vayAod2l0aCBwb3NzaWJsZSBleHBsaWNpdCBqcyBjYWxsYmFjaylcbiAgICogNi4gcmVmbG93XG4gICAqIDcuIGJhc2VkIG9uIHRyYW5zaXRpb24gdHlwZTpcbiAgICogICAgLSB0cmFuc2l0aW9uOlxuICAgKiAgICAgICAgcmVtb3ZlIGNsYXNzIG5vdywgd2FpdCBmb3IgdHJhbnNpdGlvbmVuZCxcbiAgICogICAgICAgIHRoZW4gZG9uZSBpZiB0aGVyZSdzIG5vIGV4cGxpY2l0IGpzIGNhbGxiYWNrLlxuICAgKiAgICAtIGFuaW1hdGlvbjpcbiAgICogICAgICAgIHdhaXQgZm9yIGFuaW1hdGlvbmVuZCwgcmVtb3ZlIGNsYXNzLFxuICAgKiAgICAgICAgdGhlbiBkb25lIGlmIHRoZXJlJ3Mgbm8gZXhwbGljaXQganMgY2FsbGJhY2suXG4gICAqICAgIC0gbm8gY3NzIHRyYW5zaXRpb246XG4gICAqICAgICAgICBkb25lIG5vdyBpZiB0aGVyZSdzIG5vIGV4cGxpY2l0IGpzIGNhbGxiYWNrLlxuICAgKiA4LiB3YWl0IGZvciBlaXRoZXIgZG9uZSBvciBqcyBjYWxsYmFjaywgdGhlbiBjYWxsXG4gICAqICAgIGFmdGVyRW50ZXIgaG9vay5cbiAgICpcbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gb3AgLSBpbnNlcnQvc2hvdyB0aGUgZWxlbWVudFxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBbY2JdXG4gICAqL1xuXG4gIHAkMS5lbnRlciA9IGZ1bmN0aW9uIChvcCwgY2IpIHtcbiAgICB0aGlzLmNhbmNlbFBlbmRpbmcoKTtcbiAgICB0aGlzLmNhbGxIb29rKCdiZWZvcmVFbnRlcicpO1xuICAgIHRoaXMuY2IgPSBjYjtcbiAgICBhZGRDbGFzcyh0aGlzLmVsLCB0aGlzLmVudGVyQ2xhc3MpO1xuICAgIG9wKCk7XG4gICAgdGhpcy5lbnRlcmVkID0gZmFsc2U7XG4gICAgdGhpcy5jYWxsSG9va1dpdGhDYignZW50ZXInKTtcbiAgICBpZiAodGhpcy5lbnRlcmVkKSB7XG4gICAgICByZXR1cm47IC8vIHVzZXIgY2FsbGVkIGRvbmUgc3luY2hyb25vdXNseS5cbiAgICB9XG4gICAgdGhpcy5jYW5jZWwgPSB0aGlzLmhvb2tzICYmIHRoaXMuaG9va3MuZW50ZXJDYW5jZWxsZWQ7XG4gICAgcHVzaEpvYih0aGlzLmVudGVyTmV4dFRpY2spO1xuICB9O1xuXG4gIC8qKlxuICAgKiBUaGUgXCJuZXh0VGlja1wiIHBoYXNlIG9mIGFuIGVudGVyaW5nIHRyYW5zaXRpb24sIHdoaWNoIGlzXG4gICAqIHRvIGJlIHB1c2hlZCBpbnRvIGEgcXVldWUgYW5kIGV4ZWN1dGVkIGFmdGVyIGEgcmVmbG93IHNvXG4gICAqIHRoYXQgcmVtb3ZpbmcgdGhlIGNsYXNzIGNhbiB0cmlnZ2VyIGEgQ1NTIHRyYW5zaXRpb24uXG4gICAqL1xuXG4gIHAkMS5lbnRlck5leHRUaWNrID0gZnVuY3Rpb24gKCkge1xuICAgIHZhciBfdGhpcyA9IHRoaXM7XG5cbiAgICAvLyBwcmV2ZW50IHRyYW5zaXRpb24gc2tpcHBpbmdcbiAgICB0aGlzLmp1c3RFbnRlcmVkID0gdHJ1ZTtcbiAgICB3YWl0Rm9yVHJhbnNpdGlvblN0YXJ0KGZ1bmN0aW9uICgpIHtcbiAgICAgIF90aGlzLmp1c3RFbnRlcmVkID0gZmFsc2U7XG4gICAgfSk7XG4gICAgdmFyIGVudGVyRG9uZSA9IHRoaXMuZW50ZXJEb25lO1xuICAgIHZhciB0eXBlID0gdGhpcy5nZXRDc3NUcmFuc2l0aW9uVHlwZSh0aGlzLmVudGVyQ2xhc3MpO1xuICAgIGlmICghdGhpcy5wZW5kaW5nSnNDYikge1xuICAgICAgaWYgKHR5cGUgPT09IFRZUEVfVFJBTlNJVElPTikge1xuICAgICAgICAvLyB0cmlnZ2VyIHRyYW5zaXRpb24gYnkgcmVtb3ZpbmcgZW50ZXIgY2xhc3Mgbm93XG4gICAgICAgIHJlbW92ZUNsYXNzKHRoaXMuZWwsIHRoaXMuZW50ZXJDbGFzcyk7XG4gICAgICAgIHRoaXMuc2V0dXBDc3NDYih0cmFuc2l0aW9uRW5kRXZlbnQsIGVudGVyRG9uZSk7XG4gICAgICB9IGVsc2UgaWYgKHR5cGUgPT09IFRZUEVfQU5JTUFUSU9OKSB7XG4gICAgICAgIHRoaXMuc2V0dXBDc3NDYihhbmltYXRpb25FbmRFdmVudCwgZW50ZXJEb25lKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGVudGVyRG9uZSgpO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAodHlwZSA9PT0gVFlQRV9UUkFOU0lUSU9OKSB7XG4gICAgICByZW1vdmVDbGFzcyh0aGlzLmVsLCB0aGlzLmVudGVyQ2xhc3MpO1xuICAgIH1cbiAgfTtcblxuICAvKipcbiAgICogVGhlIFwiY2xlYW51cFwiIHBoYXNlIG9mIGFuIGVudGVyaW5nIHRyYW5zaXRpb24uXG4gICAqL1xuXG4gIHAkMS5lbnRlckRvbmUgPSBmdW5jdGlvbiAoKSB7XG4gICAgdGhpcy5lbnRlcmVkID0gdHJ1ZTtcbiAgICB0aGlzLmNhbmNlbCA9IHRoaXMucGVuZGluZ0pzQ2IgPSBudWxsO1xuICAgIHJlbW92ZUNsYXNzKHRoaXMuZWwsIHRoaXMuZW50ZXJDbGFzcyk7XG4gICAgdGhpcy5jYWxsSG9vaygnYWZ0ZXJFbnRlcicpO1xuICAgIGlmICh0aGlzLmNiKSB0aGlzLmNiKCk7XG4gIH07XG5cbiAgLyoqXG4gICAqIFN0YXJ0IGEgbGVhdmluZyB0cmFuc2l0aW9uLlxuICAgKlxuICAgKiAxLiBsZWF2ZSB0cmFuc2l0aW9uIHRyaWdnZXJlZC5cbiAgICogMi4gY2FsbCBiZWZvcmVMZWF2ZSBob29rXG4gICAqIDMuIGFkZCBsZWF2ZSBjbGFzcyAodHJpZ2dlciBjc3MgdHJhbnNpdGlvbilcbiAgICogNC4gY2FsbCBsZWF2ZSBob29rICh3aXRoIHBvc3NpYmxlIGV4cGxpY2l0IGpzIGNhbGxiYWNrKVxuICAgKiA1LiByZWZsb3cgaWYgbm8gZXhwbGljaXQganMgY2FsbGJhY2sgaXMgcHJvdmlkZWRcbiAgICogNi4gYmFzZWQgb24gdHJhbnNpdGlvbiB0eXBlOlxuICAgKiAgICAtIHRyYW5zaXRpb24gb3IgYW5pbWF0aW9uOlxuICAgKiAgICAgICAgd2FpdCBmb3IgZW5kIGV2ZW50LCByZW1vdmUgY2xhc3MsIHRoZW4gZG9uZSBpZlxuICAgKiAgICAgICAgdGhlcmUncyBubyBleHBsaWNpdCBqcyBjYWxsYmFjay5cbiAgICogICAgLSBubyBjc3MgdHJhbnNpdGlvbjpcbiAgICogICAgICAgIGRvbmUgaWYgdGhlcmUncyBubyBleHBsaWNpdCBqcyBjYWxsYmFjay5cbiAgICogNy4gd2FpdCBmb3IgZWl0aGVyIGRvbmUgb3IganMgY2FsbGJhY2ssIHRoZW4gY2FsbFxuICAgKiAgICBhZnRlckxlYXZlIGhvb2suXG4gICAqXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IG9wIC0gcmVtb3ZlL2hpZGUgdGhlIGVsZW1lbnRcbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gW2NiXVxuICAgKi9cblxuICBwJDEubGVhdmUgPSBmdW5jdGlvbiAob3AsIGNiKSB7XG4gICAgdGhpcy5jYW5jZWxQZW5kaW5nKCk7XG4gICAgdGhpcy5jYWxsSG9vaygnYmVmb3JlTGVhdmUnKTtcbiAgICB0aGlzLm9wID0gb3A7XG4gICAgdGhpcy5jYiA9IGNiO1xuICAgIGFkZENsYXNzKHRoaXMuZWwsIHRoaXMubGVhdmVDbGFzcyk7XG4gICAgdGhpcy5sZWZ0ID0gZmFsc2U7XG4gICAgdGhpcy5jYWxsSG9va1dpdGhDYignbGVhdmUnKTtcbiAgICBpZiAodGhpcy5sZWZ0KSB7XG4gICAgICByZXR1cm47IC8vIHVzZXIgY2FsbGVkIGRvbmUgc3luY2hyb25vdXNseS5cbiAgICB9XG4gICAgdGhpcy5jYW5jZWwgPSB0aGlzLmhvb2tzICYmIHRoaXMuaG9va3MubGVhdmVDYW5jZWxsZWQ7XG4gICAgLy8gb25seSBuZWVkIHRvIGhhbmRsZSBsZWF2ZURvbmUgaWZcbiAgICAvLyAxLiB0aGUgdHJhbnNpdGlvbiBpcyBhbHJlYWR5IGRvbmUgKHN5bmNocm9ub3VzbHkgY2FsbGVkXG4gICAgLy8gICAgYnkgdGhlIHVzZXIsIHdoaWNoIGNhdXNlcyB0aGlzLm9wIHNldCB0byBudWxsKVxuICAgIC8vIDIuIHRoZXJlJ3Mgbm8gZXhwbGljaXQganMgY2FsbGJhY2tcbiAgICBpZiAodGhpcy5vcCAmJiAhdGhpcy5wZW5kaW5nSnNDYikge1xuICAgICAgLy8gaWYgYSBDU1MgdHJhbnNpdGlvbiBsZWF2ZXMgaW1tZWRpYXRlbHkgYWZ0ZXIgZW50ZXIsXG4gICAgICAvLyB0aGUgdHJhbnNpdGlvbmVuZCBldmVudCBuZXZlciBmaXJlcy4gdGhlcmVmb3JlIHdlXG4gICAgICAvLyBkZXRlY3Qgc3VjaCBjYXNlcyBhbmQgZW5kIHRoZSBsZWF2ZSBpbW1lZGlhdGVseS5cbiAgICAgIGlmICh0aGlzLmp1c3RFbnRlcmVkKSB7XG4gICAgICAgIHRoaXMubGVhdmVEb25lKCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBwdXNoSm9iKHRoaXMubGVhdmVOZXh0VGljayk7XG4gICAgICB9XG4gICAgfVxuICB9O1xuXG4gIC8qKlxuICAgKiBUaGUgXCJuZXh0VGlja1wiIHBoYXNlIG9mIGEgbGVhdmluZyB0cmFuc2l0aW9uLlxuICAgKi9cblxuICBwJDEubGVhdmVOZXh0VGljayA9IGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgdHlwZSA9IHRoaXMuZ2V0Q3NzVHJhbnNpdGlvblR5cGUodGhpcy5sZWF2ZUNsYXNzKTtcbiAgICBpZiAodHlwZSkge1xuICAgICAgdmFyIGV2ZW50ID0gdHlwZSA9PT0gVFlQRV9UUkFOU0lUSU9OID8gdHJhbnNpdGlvbkVuZEV2ZW50IDogYW5pbWF0aW9uRW5kRXZlbnQ7XG4gICAgICB0aGlzLnNldHVwQ3NzQ2IoZXZlbnQsIHRoaXMubGVhdmVEb25lKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5sZWF2ZURvbmUoKTtcbiAgICB9XG4gIH07XG5cbiAgLyoqXG4gICAqIFRoZSBcImNsZWFudXBcIiBwaGFzZSBvZiBhIGxlYXZpbmcgdHJhbnNpdGlvbi5cbiAgICovXG5cbiAgcCQxLmxlYXZlRG9uZSA9IGZ1bmN0aW9uICgpIHtcbiAgICB0aGlzLmxlZnQgPSB0cnVlO1xuICAgIHRoaXMuY2FuY2VsID0gdGhpcy5wZW5kaW5nSnNDYiA9IG51bGw7XG4gICAgdGhpcy5vcCgpO1xuICAgIHJlbW92ZUNsYXNzKHRoaXMuZWwsIHRoaXMubGVhdmVDbGFzcyk7XG4gICAgdGhpcy5jYWxsSG9vaygnYWZ0ZXJMZWF2ZScpO1xuICAgIGlmICh0aGlzLmNiKSB0aGlzLmNiKCk7XG4gICAgdGhpcy5vcCA9IG51bGw7XG4gIH07XG5cbiAgLyoqXG4gICAqIENhbmNlbCBhbnkgcGVuZGluZyBjYWxsYmFja3MgZnJvbSBhIHByZXZpb3VzbHkgcnVubmluZ1xuICAgKiBidXQgbm90IGZpbmlzaGVkIHRyYW5zaXRpb24uXG4gICAqL1xuXG4gIHAkMS5jYW5jZWxQZW5kaW5nID0gZnVuY3Rpb24gKCkge1xuICAgIHRoaXMub3AgPSB0aGlzLmNiID0gbnVsbDtcbiAgICB2YXIgaGFzUGVuZGluZyA9IGZhbHNlO1xuICAgIGlmICh0aGlzLnBlbmRpbmdDc3NDYikge1xuICAgICAgaGFzUGVuZGluZyA9IHRydWU7XG4gICAgICBvZmYodGhpcy5lbCwgdGhpcy5wZW5kaW5nQ3NzRXZlbnQsIHRoaXMucGVuZGluZ0Nzc0NiKTtcbiAgICAgIHRoaXMucGVuZGluZ0Nzc0V2ZW50ID0gdGhpcy5wZW5kaW5nQ3NzQ2IgPSBudWxsO1xuICAgIH1cbiAgICBpZiAodGhpcy5wZW5kaW5nSnNDYikge1xuICAgICAgaGFzUGVuZGluZyA9IHRydWU7XG4gICAgICB0aGlzLnBlbmRpbmdKc0NiLmNhbmNlbCgpO1xuICAgICAgdGhpcy5wZW5kaW5nSnNDYiA9IG51bGw7XG4gICAgfVxuICAgIGlmIChoYXNQZW5kaW5nKSB7XG4gICAgICByZW1vdmVDbGFzcyh0aGlzLmVsLCB0aGlzLmVudGVyQ2xhc3MpO1xuICAgICAgcmVtb3ZlQ2xhc3ModGhpcy5lbCwgdGhpcy5sZWF2ZUNsYXNzKTtcbiAgICB9XG4gICAgaWYgKHRoaXMuY2FuY2VsKSB7XG4gICAgICB0aGlzLmNhbmNlbC5jYWxsKHRoaXMudm0sIHRoaXMuZWwpO1xuICAgICAgdGhpcy5jYW5jZWwgPSBudWxsO1xuICAgIH1cbiAgfTtcblxuICAvKipcbiAgICogQ2FsbCBhIHVzZXItcHJvdmlkZWQgc3luY2hyb25vdXMgaG9vayBmdW5jdGlvbi5cbiAgICpcbiAgICogQHBhcmFtIHtTdHJpbmd9IHR5cGVcbiAgICovXG5cbiAgcCQxLmNhbGxIb29rID0gZnVuY3Rpb24gKHR5cGUpIHtcbiAgICBpZiAodGhpcy5ob29rcyAmJiB0aGlzLmhvb2tzW3R5cGVdKSB7XG4gICAgICB0aGlzLmhvb2tzW3R5cGVdLmNhbGwodGhpcy52bSwgdGhpcy5lbCk7XG4gICAgfVxuICB9O1xuXG4gIC8qKlxuICAgKiBDYWxsIGEgdXNlci1wcm92aWRlZCwgcG90ZW50aWFsbHktYXN5bmMgaG9vayBmdW5jdGlvbi5cbiAgICogV2UgY2hlY2sgZm9yIHRoZSBsZW5ndGggb2YgYXJndW1lbnRzIHRvIHNlZSBpZiB0aGUgaG9va1xuICAgKiBleHBlY3RzIGEgYGRvbmVgIGNhbGxiYWNrLiBJZiB0cnVlLCB0aGUgdHJhbnNpdGlvbidzIGVuZFxuICAgKiB3aWxsIGJlIGRldGVybWluZWQgYnkgd2hlbiB0aGUgdXNlciBjYWxscyB0aGF0IGNhbGxiYWNrO1xuICAgKiBvdGhlcndpc2UsIHRoZSBlbmQgaXMgZGV0ZXJtaW5lZCBieSB0aGUgQ1NTIHRyYW5zaXRpb24gb3JcbiAgICogYW5pbWF0aW9uLlxuICAgKlxuICAgKiBAcGFyYW0ge1N0cmluZ30gdHlwZVxuICAgKi9cblxuICBwJDEuY2FsbEhvb2tXaXRoQ2IgPSBmdW5jdGlvbiAodHlwZSkge1xuICAgIHZhciBob29rID0gdGhpcy5ob29rcyAmJiB0aGlzLmhvb2tzW3R5cGVdO1xuICAgIGlmIChob29rKSB7XG4gICAgICBpZiAoaG9vay5sZW5ndGggPiAxKSB7XG4gICAgICAgIHRoaXMucGVuZGluZ0pzQ2IgPSBjYW5jZWxsYWJsZSh0aGlzW3R5cGUgKyAnRG9uZSddKTtcbiAgICAgIH1cbiAgICAgIGhvb2suY2FsbCh0aGlzLnZtLCB0aGlzLmVsLCB0aGlzLnBlbmRpbmdKc0NiKTtcbiAgICB9XG4gIH07XG5cbiAgLyoqXG4gICAqIEdldCBhbiBlbGVtZW50J3MgdHJhbnNpdGlvbiB0eXBlIGJhc2VkIG9uIHRoZVxuICAgKiBjYWxjdWxhdGVkIHN0eWxlcy5cbiAgICpcbiAgICogQHBhcmFtIHtTdHJpbmd9IGNsYXNzTmFtZVxuICAgKiBAcmV0dXJuIHtOdW1iZXJ9XG4gICAqL1xuXG4gIHAkMS5nZXRDc3NUcmFuc2l0aW9uVHlwZSA9IGZ1bmN0aW9uIChjbGFzc05hbWUpIHtcbiAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgaWYgKi9cbiAgICBpZiAoIXRyYW5zaXRpb25FbmRFdmVudCB8fFxuICAgIC8vIHNraXAgQ1NTIHRyYW5zaXRpb25zIGlmIHBhZ2UgaXMgbm90IHZpc2libGUgLVxuICAgIC8vIHRoaXMgc29sdmVzIHRoZSBpc3N1ZSBvZiB0cmFuc2l0aW9uZW5kIGV2ZW50cyBub3RcbiAgICAvLyBmaXJpbmcgdW50aWwgdGhlIHBhZ2UgaXMgdmlzaWJsZSBhZ2Fpbi5cbiAgICAvLyBwYWdlVmlzaWJpbGl0eSBBUEkgaXMgc3VwcG9ydGVkIGluIElFMTArLCBzYW1lIGFzXG4gICAgLy8gQ1NTIHRyYW5zaXRpb25zLlxuICAgIGRvY3VtZW50LmhpZGRlbiB8fFxuICAgIC8vIGV4cGxpY2l0IGpzLW9ubHkgdHJhbnNpdGlvblxuICAgIHRoaXMuaG9va3MgJiYgdGhpcy5ob29rcy5jc3MgPT09IGZhbHNlIHx8XG4gICAgLy8gZWxlbWVudCBpcyBoaWRkZW5cbiAgICBpc0hpZGRlbih0aGlzLmVsKSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB2YXIgdHlwZSA9IHRoaXMudHlwZSB8fCB0aGlzLnR5cGVDYWNoZVtjbGFzc05hbWVdO1xuICAgIGlmICh0eXBlKSByZXR1cm4gdHlwZTtcbiAgICB2YXIgaW5saW5lU3R5bGVzID0gdGhpcy5lbC5zdHlsZTtcbiAgICB2YXIgY29tcHV0ZWRTdHlsZXMgPSB3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZSh0aGlzLmVsKTtcbiAgICB2YXIgdHJhbnNEdXJhdGlvbiA9IGlubGluZVN0eWxlc1t0cmFuc0R1cmF0aW9uUHJvcF0gfHwgY29tcHV0ZWRTdHlsZXNbdHJhbnNEdXJhdGlvblByb3BdO1xuICAgIGlmICh0cmFuc0R1cmF0aW9uICYmIHRyYW5zRHVyYXRpb24gIT09ICcwcycpIHtcbiAgICAgIHR5cGUgPSBUWVBFX1RSQU5TSVRJT047XG4gICAgfSBlbHNlIHtcbiAgICAgIHZhciBhbmltRHVyYXRpb24gPSBpbmxpbmVTdHlsZXNbYW5pbUR1cmF0aW9uUHJvcF0gfHwgY29tcHV0ZWRTdHlsZXNbYW5pbUR1cmF0aW9uUHJvcF07XG4gICAgICBpZiAoYW5pbUR1cmF0aW9uICYmIGFuaW1EdXJhdGlvbiAhPT0gJzBzJykge1xuICAgICAgICB0eXBlID0gVFlQRV9BTklNQVRJT047XG4gICAgICB9XG4gICAgfVxuICAgIGlmICh0eXBlKSB7XG4gICAgICB0aGlzLnR5cGVDYWNoZVtjbGFzc05hbWVdID0gdHlwZTtcbiAgICB9XG4gICAgcmV0dXJuIHR5cGU7XG4gIH07XG5cbiAgLyoqXG4gICAqIFNldHVwIGEgQ1NTIHRyYW5zaXRpb25lbmQvYW5pbWF0aW9uZW5kIGNhbGxiYWNrLlxuICAgKlxuICAgKiBAcGFyYW0ge1N0cmluZ30gZXZlbnRcbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gY2JcbiAgICovXG5cbiAgcCQxLnNldHVwQ3NzQ2IgPSBmdW5jdGlvbiAoZXZlbnQsIGNiKSB7XG4gICAgdGhpcy5wZW5kaW5nQ3NzRXZlbnQgPSBldmVudDtcbiAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgdmFyIGVsID0gdGhpcy5lbDtcbiAgICB2YXIgb25FbmQgPSB0aGlzLnBlbmRpbmdDc3NDYiA9IGZ1bmN0aW9uIChlKSB7XG4gICAgICBpZiAoZS50YXJnZXQgPT09IGVsKSB7XG4gICAgICAgIG9mZihlbCwgZXZlbnQsIG9uRW5kKTtcbiAgICAgICAgc2VsZi5wZW5kaW5nQ3NzRXZlbnQgPSBzZWxmLnBlbmRpbmdDc3NDYiA9IG51bGw7XG4gICAgICAgIGlmICghc2VsZi5wZW5kaW5nSnNDYiAmJiBjYikge1xuICAgICAgICAgIGNiKCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9O1xuICAgIG9uKGVsLCBldmVudCwgb25FbmQpO1xuICB9O1xuXG4gIC8qKlxuICAgKiBDaGVjayBpZiBhbiBlbGVtZW50IGlzIGhpZGRlbiAtIGluIHRoYXQgY2FzZSB3ZSBjYW4ganVzdFxuICAgKiBza2lwIHRoZSB0cmFuc2l0aW9uIGFsbHRvZ2V0aGVyLlxuICAgKlxuICAgKiBAcGFyYW0ge0VsZW1lbnR9IGVsXG4gICAqIEByZXR1cm4ge0Jvb2xlYW59XG4gICAqL1xuXG4gIGZ1bmN0aW9uIGlzSGlkZGVuKGVsKSB7XG4gICAgaWYgKC9zdmckLy50ZXN0KGVsLm5hbWVzcGFjZVVSSSkpIHtcbiAgICAgIC8vIFNWRyBlbGVtZW50cyBkbyBub3QgaGF2ZSBvZmZzZXQoV2lkdGh8SGVpZ2h0KVxuICAgICAgLy8gc28gd2UgbmVlZCB0byBjaGVjayB0aGUgY2xpZW50IHJlY3RcbiAgICAgIHZhciByZWN0ID0gZWwuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgICByZXR1cm4gIShyZWN0LndpZHRoIHx8IHJlY3QuaGVpZ2h0KTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuICEoZWwub2Zmc2V0V2lkdGggfHwgZWwub2Zmc2V0SGVpZ2h0IHx8IGVsLmdldENsaWVudFJlY3RzKCkubGVuZ3RoKTtcbiAgICB9XG4gIH1cblxuICB2YXIgdHJhbnNpdGlvbiQxID0ge1xuXG4gICAgcHJpb3JpdHk6IFRSQU5TSVRJT04sXG5cbiAgICB1cGRhdGU6IGZ1bmN0aW9uIHVwZGF0ZShpZCwgb2xkSWQpIHtcbiAgICAgIHZhciBlbCA9IHRoaXMuZWw7XG4gICAgICAvLyByZXNvbHZlIG9uIG93bmVyIHZtXG4gICAgICB2YXIgaG9va3MgPSByZXNvbHZlQXNzZXQodGhpcy52bS4kb3B0aW9ucywgJ3RyYW5zaXRpb25zJywgaWQpO1xuICAgICAgaWQgPSBpZCB8fCAndic7XG4gICAgICBlbC5fX3ZfdHJhbnMgPSBuZXcgVHJhbnNpdGlvbihlbCwgaWQsIGhvb2tzLCB0aGlzLnZtKTtcbiAgICAgIGlmIChvbGRJZCkge1xuICAgICAgICByZW1vdmVDbGFzcyhlbCwgb2xkSWQgKyAnLXRyYW5zaXRpb24nKTtcbiAgICAgIH1cbiAgICAgIGFkZENsYXNzKGVsLCBpZCArICctdHJhbnNpdGlvbicpO1xuICAgIH1cbiAgfTtcblxuICB2YXIgaW50ZXJuYWxEaXJlY3RpdmVzID0ge1xuICAgIHN0eWxlOiBzdHlsZSxcbiAgICAnY2xhc3MnOiB2Q2xhc3MsXG4gICAgY29tcG9uZW50OiBjb21wb25lbnQsXG4gICAgcHJvcDogcHJvcERlZixcbiAgICB0cmFuc2l0aW9uOiB0cmFuc2l0aW9uJDFcbiAgfTtcblxuICAvLyBzcGVjaWFsIGJpbmRpbmcgcHJlZml4ZXNcbiAgdmFyIGJpbmRSRSA9IC9edi1iaW5kOnxeOi87XG4gIHZhciBvblJFID0gL152LW9uOnxeQC87XG4gIHZhciBkaXJBdHRyUkUgPSAvXnYtKFteOl0rKSg/OiR8OiguKikkKS87XG4gIHZhciBtb2RpZmllclJFID0gL1xcLlteXFwuXSsvZztcbiAgdmFyIHRyYW5zaXRpb25SRSA9IC9eKHYtYmluZDp8Oik/dHJhbnNpdGlvbiQvO1xuXG4gIC8vIGRlZmF1bHQgZGlyZWN0aXZlIHByaW9yaXR5XG4gIHZhciBERUZBVUxUX1BSSU9SSVRZID0gMTAwMDtcbiAgdmFyIERFRkFVTFRfVEVSTUlOQUxfUFJJT1JJVFkgPSAyMDAwO1xuXG4gIC8qKlxuICAgKiBDb21waWxlIGEgdGVtcGxhdGUgYW5kIHJldHVybiBhIHJldXNhYmxlIGNvbXBvc2l0ZSBsaW5rXG4gICAqIGZ1bmN0aW9uLCB3aGljaCByZWN1cnNpdmVseSBjb250YWlucyBtb3JlIGxpbmsgZnVuY3Rpb25zXG4gICAqIGluc2lkZS4gVGhpcyB0b3AgbGV2ZWwgY29tcGlsZSBmdW5jdGlvbiB3b3VsZCBub3JtYWxseVxuICAgKiBiZSBjYWxsZWQgb24gaW5zdGFuY2Ugcm9vdCBub2RlcywgYnV0IGNhbiBhbHNvIGJlIHVzZWRcbiAgICogZm9yIHBhcnRpYWwgY29tcGlsYXRpb24gaWYgdGhlIHBhcnRpYWwgYXJndW1lbnQgaXMgdHJ1ZS5cbiAgICpcbiAgICogVGhlIHJldHVybmVkIGNvbXBvc2l0ZSBsaW5rIGZ1bmN0aW9uLCB3aGVuIGNhbGxlZCwgd2lsbFxuICAgKiByZXR1cm4gYW4gdW5saW5rIGZ1bmN0aW9uIHRoYXQgdGVhcnNkb3duIGFsbCBkaXJlY3RpdmVzXG4gICAqIGNyZWF0ZWQgZHVyaW5nIHRoZSBsaW5raW5nIHBoYXNlLlxuICAgKlxuICAgKiBAcGFyYW0ge0VsZW1lbnR8RG9jdW1lbnRGcmFnbWVudH0gZWxcbiAgICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnNcbiAgICogQHBhcmFtIHtCb29sZWFufSBwYXJ0aWFsXG4gICAqIEByZXR1cm4ge0Z1bmN0aW9ufVxuICAgKi9cblxuICBmdW5jdGlvbiBjb21waWxlKGVsLCBvcHRpb25zLCBwYXJ0aWFsKSB7XG4gICAgLy8gbGluayBmdW5jdGlvbiBmb3IgdGhlIG5vZGUgaXRzZWxmLlxuICAgIHZhciBub2RlTGlua0ZuID0gcGFydGlhbCB8fCAhb3B0aW9ucy5fYXNDb21wb25lbnQgPyBjb21waWxlTm9kZShlbCwgb3B0aW9ucykgOiBudWxsO1xuICAgIC8vIGxpbmsgZnVuY3Rpb24gZm9yIHRoZSBjaGlsZE5vZGVzXG4gICAgdmFyIGNoaWxkTGlua0ZuID0gIShub2RlTGlua0ZuICYmIG5vZGVMaW5rRm4udGVybWluYWwpICYmICFpc1NjcmlwdChlbCkgJiYgZWwuaGFzQ2hpbGROb2RlcygpID8gY29tcGlsZU5vZGVMaXN0KGVsLmNoaWxkTm9kZXMsIG9wdGlvbnMpIDogbnVsbDtcblxuICAgIC8qKlxuICAgICAqIEEgY29tcG9zaXRlIGxpbmtlciBmdW5jdGlvbiB0byBiZSBjYWxsZWQgb24gYSBhbHJlYWR5XG4gICAgICogY29tcGlsZWQgcGllY2Ugb2YgRE9NLCB3aGljaCBpbnN0YW50aWF0ZXMgYWxsIGRpcmVjdGl2ZVxuICAgICAqIGluc3RhbmNlcy5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7VnVlfSB2bVxuICAgICAqIEBwYXJhbSB7RWxlbWVudHxEb2N1bWVudEZyYWdtZW50fSBlbFxuICAgICAqIEBwYXJhbSB7VnVlfSBbaG9zdF0gLSBob3N0IHZtIG9mIHRyYW5zY2x1ZGVkIGNvbnRlbnRcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gW3Njb3BlXSAtIHYtZm9yIHNjb3BlXG4gICAgICogQHBhcmFtIHtGcmFnbWVudH0gW2ZyYWddIC0gbGluayBjb250ZXh0IGZyYWdtZW50XG4gICAgICogQHJldHVybiB7RnVuY3Rpb258dW5kZWZpbmVkfVxuICAgICAqL1xuXG4gICAgcmV0dXJuIGZ1bmN0aW9uIGNvbXBvc2l0ZUxpbmtGbih2bSwgZWwsIGhvc3QsIHNjb3BlLCBmcmFnKSB7XG4gICAgICAvLyBjYWNoZSBjaGlsZE5vZGVzIGJlZm9yZSBsaW5raW5nIHBhcmVudCwgZml4ICM2NTdcbiAgICAgIHZhciBjaGlsZE5vZGVzID0gdG9BcnJheShlbC5jaGlsZE5vZGVzKTtcbiAgICAgIC8vIGxpbmtcbiAgICAgIHZhciBkaXJzID0gbGlua0FuZENhcHR1cmUoZnVuY3Rpb24gY29tcG9zaXRlTGlua0NhcHR1cmVyKCkge1xuICAgICAgICBpZiAobm9kZUxpbmtGbikgbm9kZUxpbmtGbih2bSwgZWwsIGhvc3QsIHNjb3BlLCBmcmFnKTtcbiAgICAgICAgaWYgKGNoaWxkTGlua0ZuKSBjaGlsZExpbmtGbih2bSwgY2hpbGROb2RlcywgaG9zdCwgc2NvcGUsIGZyYWcpO1xuICAgICAgfSwgdm0pO1xuICAgICAgcmV0dXJuIG1ha2VVbmxpbmtGbih2bSwgZGlycyk7XG4gICAgfTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBcHBseSBhIGxpbmtlciB0byBhIHZtL2VsZW1lbnQgcGFpciBhbmQgY2FwdHVyZSB0aGVcbiAgICogZGlyZWN0aXZlcyBjcmVhdGVkIGR1cmluZyB0aGUgcHJvY2Vzcy5cbiAgICpcbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gbGlua2VyXG4gICAqIEBwYXJhbSB7VnVlfSB2bVxuICAgKi9cblxuICBmdW5jdGlvbiBsaW5rQW5kQ2FwdHVyZShsaW5rZXIsIHZtKSB7XG4gICAgLyogaXN0YW5idWwgaWdub3JlIGlmICovXG4gICAgaWYgKCdkZXZlbG9wbWVudCcgPT09ICdwcm9kdWN0aW9uJykge31cbiAgICB2YXIgb3JpZ2luYWxEaXJDb3VudCA9IHZtLl9kaXJlY3RpdmVzLmxlbmd0aDtcbiAgICBsaW5rZXIoKTtcbiAgICB2YXIgZGlycyA9IHZtLl9kaXJlY3RpdmVzLnNsaWNlKG9yaWdpbmFsRGlyQ291bnQpO1xuICAgIGRpcnMuc29ydChkaXJlY3RpdmVDb21wYXJhdG9yKTtcbiAgICBmb3IgKHZhciBpID0gMCwgbCA9IGRpcnMubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG4gICAgICBkaXJzW2ldLl9iaW5kKCk7XG4gICAgfVxuICAgIHJldHVybiBkaXJzO1xuICB9XG5cbiAgLyoqXG4gICAqIERpcmVjdGl2ZSBwcmlvcml0eSBzb3J0IGNvbXBhcmF0b3JcbiAgICpcbiAgICogQHBhcmFtIHtPYmplY3R9IGFcbiAgICogQHBhcmFtIHtPYmplY3R9IGJcbiAgICovXG5cbiAgZnVuY3Rpb24gZGlyZWN0aXZlQ29tcGFyYXRvcihhLCBiKSB7XG4gICAgYSA9IGEuZGVzY3JpcHRvci5kZWYucHJpb3JpdHkgfHwgREVGQVVMVF9QUklPUklUWTtcbiAgICBiID0gYi5kZXNjcmlwdG9yLmRlZi5wcmlvcml0eSB8fCBERUZBVUxUX1BSSU9SSVRZO1xuICAgIHJldHVybiBhID4gYiA/IC0xIDogYSA9PT0gYiA/IDAgOiAxO1xuICB9XG5cbiAgLyoqXG4gICAqIExpbmtlciBmdW5jdGlvbnMgcmV0dXJuIGFuIHVubGluayBmdW5jdGlvbiB0aGF0XG4gICAqIHRlYXJzZG93biBhbGwgZGlyZWN0aXZlcyBpbnN0YW5jZXMgZ2VuZXJhdGVkIGR1cmluZ1xuICAgKiB0aGUgcHJvY2Vzcy5cbiAgICpcbiAgICogV2UgY3JlYXRlIHVubGluayBmdW5jdGlvbnMgd2l0aCBvbmx5IHRoZSBuZWNlc3NhcnlcbiAgICogaW5mb3JtYXRpb24gdG8gYXZvaWQgcmV0YWluaW5nIGFkZGl0aW9uYWwgY2xvc3VyZXMuXG4gICAqXG4gICAqIEBwYXJhbSB7VnVlfSB2bVxuICAgKiBAcGFyYW0ge0FycmF5fSBkaXJzXG4gICAqIEBwYXJhbSB7VnVlfSBbY29udGV4dF1cbiAgICogQHBhcmFtIHtBcnJheX0gW2NvbnRleHREaXJzXVxuICAgKiBAcmV0dXJuIHtGdW5jdGlvbn1cbiAgICovXG5cbiAgZnVuY3Rpb24gbWFrZVVubGlua0ZuKHZtLCBkaXJzLCBjb250ZXh0LCBjb250ZXh0RGlycykge1xuICAgIGZ1bmN0aW9uIHVubGluayhkZXN0cm95aW5nKSB7XG4gICAgICB0ZWFyZG93bkRpcnModm0sIGRpcnMsIGRlc3Ryb3lpbmcpO1xuICAgICAgaWYgKGNvbnRleHQgJiYgY29udGV4dERpcnMpIHtcbiAgICAgICAgdGVhcmRvd25EaXJzKGNvbnRleHQsIGNvbnRleHREaXJzKTtcbiAgICAgIH1cbiAgICB9XG4gICAgLy8gZXhwb3NlIGxpbmtlZCBkaXJlY3RpdmVzXG4gICAgdW5saW5rLmRpcnMgPSBkaXJzO1xuICAgIHJldHVybiB1bmxpbms7XG4gIH1cblxuICAvKipcbiAgICogVGVhcmRvd24gcGFydGlhbCBsaW5rZWQgZGlyZWN0aXZlcy5cbiAgICpcbiAgICogQHBhcmFtIHtWdWV9IHZtXG4gICAqIEBwYXJhbSB7QXJyYXl9IGRpcnNcbiAgICogQHBhcmFtIHtCb29sZWFufSBkZXN0cm95aW5nXG4gICAqL1xuXG4gIGZ1bmN0aW9uIHRlYXJkb3duRGlycyh2bSwgZGlycywgZGVzdHJveWluZykge1xuICAgIHZhciBpID0gZGlycy5sZW5ndGg7XG4gICAgd2hpbGUgKGktLSkge1xuICAgICAgZGlyc1tpXS5fdGVhcmRvd24oKTtcbiAgICAgIGlmICgnZGV2ZWxvcG1lbnQnICE9PSAncHJvZHVjdGlvbicgJiYgIWRlc3Ryb3lpbmcpIHtcbiAgICAgICAgdm0uX2RpcmVjdGl2ZXMuJHJlbW92ZShkaXJzW2ldKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQ29tcGlsZSBsaW5rIHByb3BzIG9uIGFuIGluc3RhbmNlLlxuICAgKlxuICAgKiBAcGFyYW0ge1Z1ZX0gdm1cbiAgICogQHBhcmFtIHtFbGVtZW50fSBlbFxuICAgKiBAcGFyYW0ge09iamVjdH0gcHJvcHNcbiAgICogQHBhcmFtIHtPYmplY3R9IFtzY29wZV1cbiAgICogQHJldHVybiB7RnVuY3Rpb259XG4gICAqL1xuXG4gIGZ1bmN0aW9uIGNvbXBpbGVBbmRMaW5rUHJvcHModm0sIGVsLCBwcm9wcywgc2NvcGUpIHtcbiAgICB2YXIgcHJvcHNMaW5rRm4gPSBjb21waWxlUHJvcHMoZWwsIHByb3BzLCB2bSk7XG4gICAgdmFyIHByb3BEaXJzID0gbGlua0FuZENhcHR1cmUoZnVuY3Rpb24gKCkge1xuICAgICAgcHJvcHNMaW5rRm4odm0sIHNjb3BlKTtcbiAgICB9LCB2bSk7XG4gICAgcmV0dXJuIG1ha2VVbmxpbmtGbih2bSwgcHJvcERpcnMpO1xuICB9XG5cbiAgLyoqXG4gICAqIENvbXBpbGUgdGhlIHJvb3QgZWxlbWVudCBvZiBhbiBpbnN0YW5jZS5cbiAgICpcbiAgICogMS4gYXR0cnMgb24gY29udGV4dCBjb250YWluZXIgKGNvbnRleHQgc2NvcGUpXG4gICAqIDIuIGF0dHJzIG9uIHRoZSBjb21wb25lbnQgdGVtcGxhdGUgcm9vdCBub2RlLCBpZlxuICAgKiAgICByZXBsYWNlOnRydWUgKGNoaWxkIHNjb3BlKVxuICAgKlxuICAgKiBJZiB0aGlzIGlzIGEgZnJhZ21lbnQgaW5zdGFuY2UsIHdlIG9ubHkgbmVlZCB0byBjb21waWxlIDEuXG4gICAqXG4gICAqIEBwYXJhbSB7RWxlbWVudH0gZWxcbiAgICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnNcbiAgICogQHBhcmFtIHtPYmplY3R9IGNvbnRleHRPcHRpb25zXG4gICAqIEByZXR1cm4ge0Z1bmN0aW9ufVxuICAgKi9cblxuICBmdW5jdGlvbiBjb21waWxlUm9vdChlbCwgb3B0aW9ucywgY29udGV4dE9wdGlvbnMpIHtcbiAgICB2YXIgY29udGFpbmVyQXR0cnMgPSBvcHRpb25zLl9jb250YWluZXJBdHRycztcbiAgICB2YXIgcmVwbGFjZXJBdHRycyA9IG9wdGlvbnMuX3JlcGxhY2VyQXR0cnM7XG4gICAgdmFyIGNvbnRleHRMaW5rRm4sIHJlcGxhY2VyTGlua0ZuO1xuXG4gICAgLy8gb25seSBuZWVkIHRvIGNvbXBpbGUgb3RoZXIgYXR0cmlidXRlcyBmb3JcbiAgICAvLyBub24tZnJhZ21lbnQgaW5zdGFuY2VzXG4gICAgaWYgKGVsLm5vZGVUeXBlICE9PSAxMSkge1xuICAgICAgLy8gZm9yIGNvbXBvbmVudHMsIGNvbnRhaW5lciBhbmQgcmVwbGFjZXIgbmVlZCB0byBiZVxuICAgICAgLy8gY29tcGlsZWQgc2VwYXJhdGVseSBhbmQgbGlua2VkIGluIGRpZmZlcmVudCBzY29wZXMuXG4gICAgICBpZiAob3B0aW9ucy5fYXNDb21wb25lbnQpIHtcbiAgICAgICAgLy8gMi4gY29udGFpbmVyIGF0dHJpYnV0ZXNcbiAgICAgICAgaWYgKGNvbnRhaW5lckF0dHJzICYmIGNvbnRleHRPcHRpb25zKSB7XG4gICAgICAgICAgY29udGV4dExpbmtGbiA9IGNvbXBpbGVEaXJlY3RpdmVzKGNvbnRhaW5lckF0dHJzLCBjb250ZXh0T3B0aW9ucyk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHJlcGxhY2VyQXR0cnMpIHtcbiAgICAgICAgICAvLyAzLiByZXBsYWNlciBhdHRyaWJ1dGVzXG4gICAgICAgICAgcmVwbGFjZXJMaW5rRm4gPSBjb21waWxlRGlyZWN0aXZlcyhyZXBsYWNlckF0dHJzLCBvcHRpb25zKTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgLy8gbm9uLWNvbXBvbmVudCwganVzdCBjb21waWxlIGFzIGEgbm9ybWFsIGVsZW1lbnQuXG4gICAgICAgIHJlcGxhY2VyTGlua0ZuID0gY29tcGlsZURpcmVjdGl2ZXMoZWwuYXR0cmlidXRlcywgb3B0aW9ucyk7XG4gICAgICB9XG4gICAgfSBlbHNlIGlmICgnZGV2ZWxvcG1lbnQnICE9PSAncHJvZHVjdGlvbicgJiYgY29udGFpbmVyQXR0cnMpIHtcbiAgICAgIC8vIHdhcm4gY29udGFpbmVyIGRpcmVjdGl2ZXMgZm9yIGZyYWdtZW50IGluc3RhbmNlc1xuICAgICAgdmFyIG5hbWVzID0gY29udGFpbmVyQXR0cnMuZmlsdGVyKGZ1bmN0aW9uIChhdHRyKSB7XG4gICAgICAgIC8vIGFsbG93IHZ1ZS1sb2FkZXIvdnVlaWZ5IHNjb3BlZCBjc3MgYXR0cmlidXRlc1xuICAgICAgICByZXR1cm4gYXR0ci5uYW1lLmluZGV4T2YoJ192LScpIDwgMCAmJlxuICAgICAgICAvLyBhbGxvdyBldmVudCBsaXN0ZW5lcnNcbiAgICAgICAgIW9uUkUudGVzdChhdHRyLm5hbWUpICYmXG4gICAgICAgIC8vIGFsbG93IHNsb3RzXG4gICAgICAgIGF0dHIubmFtZSAhPT0gJ3Nsb3QnO1xuICAgICAgfSkubWFwKGZ1bmN0aW9uIChhdHRyKSB7XG4gICAgICAgIHJldHVybiAnXCInICsgYXR0ci5uYW1lICsgJ1wiJztcbiAgICAgIH0pO1xuICAgICAgaWYgKG5hbWVzLmxlbmd0aCkge1xuICAgICAgICB2YXIgcGx1cmFsID0gbmFtZXMubGVuZ3RoID4gMTtcbiAgICAgICAgd2FybignQXR0cmlidXRlJyArIChwbHVyYWwgPyAncyAnIDogJyAnKSArIG5hbWVzLmpvaW4oJywgJykgKyAocGx1cmFsID8gJyBhcmUnIDogJyBpcycpICsgJyBpZ25vcmVkIG9uIGNvbXBvbmVudCAnICsgJzwnICsgb3B0aW9ucy5lbC50YWdOYW1lLnRvTG93ZXJDYXNlKCkgKyAnPiBiZWNhdXNlICcgKyAndGhlIGNvbXBvbmVudCBpcyBhIGZyYWdtZW50IGluc3RhbmNlOiAnICsgJ2h0dHA6Ly92dWVqcy5vcmcvZ3VpZGUvY29tcG9uZW50cy5odG1sI0ZyYWdtZW50LUluc3RhbmNlJyk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgb3B0aW9ucy5fY29udGFpbmVyQXR0cnMgPSBvcHRpb25zLl9yZXBsYWNlckF0dHJzID0gbnVsbDtcbiAgICByZXR1cm4gZnVuY3Rpb24gcm9vdExpbmtGbih2bSwgZWwsIHNjb3BlKSB7XG4gICAgICAvLyBsaW5rIGNvbnRleHQgc2NvcGUgZGlyc1xuICAgICAgdmFyIGNvbnRleHQgPSB2bS5fY29udGV4dDtcbiAgICAgIHZhciBjb250ZXh0RGlycztcbiAgICAgIGlmIChjb250ZXh0ICYmIGNvbnRleHRMaW5rRm4pIHtcbiAgICAgICAgY29udGV4dERpcnMgPSBsaW5rQW5kQ2FwdHVyZShmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgY29udGV4dExpbmtGbihjb250ZXh0LCBlbCwgbnVsbCwgc2NvcGUpO1xuICAgICAgICB9LCBjb250ZXh0KTtcbiAgICAgIH1cblxuICAgICAgLy8gbGluayBzZWxmXG4gICAgICB2YXIgc2VsZkRpcnMgPSBsaW5rQW5kQ2FwdHVyZShmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmIChyZXBsYWNlckxpbmtGbikgcmVwbGFjZXJMaW5rRm4odm0sIGVsKTtcbiAgICAgIH0sIHZtKTtcblxuICAgICAgLy8gcmV0dXJuIHRoZSB1bmxpbmsgZnVuY3Rpb24gdGhhdCB0ZWFyc2Rvd24gY29udGV4dFxuICAgICAgLy8gY29udGFpbmVyIGRpcmVjdGl2ZXMuXG4gICAgICByZXR1cm4gbWFrZVVubGlua0ZuKHZtLCBzZWxmRGlycywgY29udGV4dCwgY29udGV4dERpcnMpO1xuICAgIH07XG4gIH1cblxuICAvKipcbiAgICogQ29tcGlsZSBhIG5vZGUgYW5kIHJldHVybiBhIG5vZGVMaW5rRm4gYmFzZWQgb24gdGhlXG4gICAqIG5vZGUgdHlwZS5cbiAgICpcbiAgICogQHBhcmFtIHtOb2RlfSBub2RlXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zXG4gICAqIEByZXR1cm4ge0Z1bmN0aW9ufG51bGx9XG4gICAqL1xuXG4gIGZ1bmN0aW9uIGNvbXBpbGVOb2RlKG5vZGUsIG9wdGlvbnMpIHtcbiAgICB2YXIgdHlwZSA9IG5vZGUubm9kZVR5cGU7XG4gICAgaWYgKHR5cGUgPT09IDEgJiYgIWlzU2NyaXB0KG5vZGUpKSB7XG4gICAgICByZXR1cm4gY29tcGlsZUVsZW1lbnQobm9kZSwgb3B0aW9ucyk7XG4gICAgfSBlbHNlIGlmICh0eXBlID09PSAzICYmIG5vZGUuZGF0YS50cmltKCkpIHtcbiAgICAgIHJldHVybiBjb21waWxlVGV4dE5vZGUobm9kZSwgb3B0aW9ucyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBDb21waWxlIGFuIGVsZW1lbnQgYW5kIHJldHVybiBhIG5vZGVMaW5rRm4uXG4gICAqXG4gICAqIEBwYXJhbSB7RWxlbWVudH0gZWxcbiAgICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnNcbiAgICogQHJldHVybiB7RnVuY3Rpb258bnVsbH1cbiAgICovXG5cbiAgZnVuY3Rpb24gY29tcGlsZUVsZW1lbnQoZWwsIG9wdGlvbnMpIHtcbiAgICAvLyBwcmVwcm9jZXNzIHRleHRhcmVhcy5cbiAgICAvLyB0ZXh0YXJlYSB0cmVhdHMgaXRzIHRleHQgY29udGVudCBhcyB0aGUgaW5pdGlhbCB2YWx1ZS5cbiAgICAvLyBqdXN0IGJpbmQgaXQgYXMgYW4gYXR0ciBkaXJlY3RpdmUgZm9yIHZhbHVlLlxuICAgIGlmIChlbC50YWdOYW1lID09PSAnVEVYVEFSRUEnKSB7XG4gICAgICB2YXIgdG9rZW5zID0gcGFyc2VUZXh0KGVsLnZhbHVlKTtcbiAgICAgIGlmICh0b2tlbnMpIHtcbiAgICAgICAgZWwuc2V0QXR0cmlidXRlKCc6dmFsdWUnLCB0b2tlbnNUb0V4cCh0b2tlbnMpKTtcbiAgICAgICAgZWwudmFsdWUgPSAnJztcbiAgICAgIH1cbiAgICB9XG4gICAgdmFyIGxpbmtGbjtcbiAgICB2YXIgaGFzQXR0cnMgPSBlbC5oYXNBdHRyaWJ1dGVzKCk7XG4gICAgdmFyIGF0dHJzID0gaGFzQXR0cnMgJiYgdG9BcnJheShlbC5hdHRyaWJ1dGVzKTtcbiAgICAvLyBjaGVjayB0ZXJtaW5hbCBkaXJlY3RpdmVzIChmb3IgJiBpZilcbiAgICBpZiAoaGFzQXR0cnMpIHtcbiAgICAgIGxpbmtGbiA9IGNoZWNrVGVybWluYWxEaXJlY3RpdmVzKGVsLCBhdHRycywgb3B0aW9ucyk7XG4gICAgfVxuICAgIC8vIGNoZWNrIGVsZW1lbnQgZGlyZWN0aXZlc1xuICAgIGlmICghbGlua0ZuKSB7XG4gICAgICBsaW5rRm4gPSBjaGVja0VsZW1lbnREaXJlY3RpdmVzKGVsLCBvcHRpb25zKTtcbiAgICB9XG4gICAgLy8gY2hlY2sgY29tcG9uZW50XG4gICAgaWYgKCFsaW5rRm4pIHtcbiAgICAgIGxpbmtGbiA9IGNoZWNrQ29tcG9uZW50KGVsLCBvcHRpb25zKTtcbiAgICB9XG4gICAgLy8gbm9ybWFsIGRpcmVjdGl2ZXNcbiAgICBpZiAoIWxpbmtGbiAmJiBoYXNBdHRycykge1xuICAgICAgbGlua0ZuID0gY29tcGlsZURpcmVjdGl2ZXMoYXR0cnMsIG9wdGlvbnMpO1xuICAgIH1cbiAgICByZXR1cm4gbGlua0ZuO1xuICB9XG5cbiAgLyoqXG4gICAqIENvbXBpbGUgYSB0ZXh0Tm9kZSBhbmQgcmV0dXJuIGEgbm9kZUxpbmtGbi5cbiAgICpcbiAgICogQHBhcmFtIHtUZXh0Tm9kZX0gbm9kZVxuICAgKiBAcGFyYW0ge09iamVjdH0gb3B0aW9uc1xuICAgKiBAcmV0dXJuIHtGdW5jdGlvbnxudWxsfSB0ZXh0Tm9kZUxpbmtGblxuICAgKi9cblxuICBmdW5jdGlvbiBjb21waWxlVGV4dE5vZGUobm9kZSwgb3B0aW9ucykge1xuICAgIC8vIHNraXAgbWFya2VkIHRleHQgbm9kZXNcbiAgICBpZiAobm9kZS5fc2tpcCkge1xuICAgICAgcmV0dXJuIHJlbW92ZVRleHQ7XG4gICAgfVxuXG4gICAgdmFyIHRva2VucyA9IHBhcnNlVGV4dChub2RlLndob2xlVGV4dCk7XG4gICAgaWYgKCF0b2tlbnMpIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIC8vIG1hcmsgYWRqYWNlbnQgdGV4dCBub2RlcyBhcyBza2lwcGVkLFxuICAgIC8vIGJlY2F1c2Ugd2UgYXJlIHVzaW5nIG5vZGUud2hvbGVUZXh0IHRvIGNvbXBpbGVcbiAgICAvLyBhbGwgYWRqYWNlbnQgdGV4dCBub2RlcyB0b2dldGhlci4gVGhpcyBmaXhlc1xuICAgIC8vIGlzc3VlcyBpbiBJRSB3aGVyZSBzb21ldGltZXMgaXQgc3BsaXRzIHVwIGEgc2luZ2xlXG4gICAgLy8gdGV4dCBub2RlIGludG8gbXVsdGlwbGUgb25lcy5cbiAgICB2YXIgbmV4dCA9IG5vZGUubmV4dFNpYmxpbmc7XG4gICAgd2hpbGUgKG5leHQgJiYgbmV4dC5ub2RlVHlwZSA9PT0gMykge1xuICAgICAgbmV4dC5fc2tpcCA9IHRydWU7XG4gICAgICBuZXh0ID0gbmV4dC5uZXh0U2libGluZztcbiAgICB9XG5cbiAgICB2YXIgZnJhZyA9IGRvY3VtZW50LmNyZWF0ZURvY3VtZW50RnJhZ21lbnQoKTtcbiAgICB2YXIgZWwsIHRva2VuO1xuICAgIGZvciAodmFyIGkgPSAwLCBsID0gdG9rZW5zLmxlbmd0aDsgaSA8IGw7IGkrKykge1xuICAgICAgdG9rZW4gPSB0b2tlbnNbaV07XG4gICAgICBlbCA9IHRva2VuLnRhZyA/IHByb2Nlc3NUZXh0VG9rZW4odG9rZW4sIG9wdGlvbnMpIDogZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUodG9rZW4udmFsdWUpO1xuICAgICAgZnJhZy5hcHBlbmRDaGlsZChlbCk7XG4gICAgfVxuICAgIHJldHVybiBtYWtlVGV4dE5vZGVMaW5rRm4odG9rZW5zLCBmcmFnLCBvcHRpb25zKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBMaW5rZXIgZm9yIGFuIHNraXBwZWQgdGV4dCBub2RlLlxuICAgKlxuICAgKiBAcGFyYW0ge1Z1ZX0gdm1cbiAgICogQHBhcmFtIHtUZXh0fSBub2RlXG4gICAqL1xuXG4gIGZ1bmN0aW9uIHJlbW92ZVRleHQodm0sIG5vZGUpIHtcbiAgICByZW1vdmUobm9kZSk7XG4gIH1cblxuICAvKipcbiAgICogUHJvY2VzcyBhIHNpbmdsZSB0ZXh0IHRva2VuLlxuICAgKlxuICAgKiBAcGFyYW0ge09iamVjdH0gdG9rZW5cbiAgICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnNcbiAgICogQHJldHVybiB7Tm9kZX1cbiAgICovXG5cbiAgZnVuY3Rpb24gcHJvY2Vzc1RleHRUb2tlbih0b2tlbiwgb3B0aW9ucykge1xuICAgIHZhciBlbDtcbiAgICBpZiAodG9rZW4ub25lVGltZSkge1xuICAgICAgZWwgPSBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZSh0b2tlbi52YWx1ZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmICh0b2tlbi5odG1sKSB7XG4gICAgICAgIGVsID0gZG9jdW1lbnQuY3JlYXRlQ29tbWVudCgndi1odG1sJyk7XG4gICAgICAgIHNldFRva2VuVHlwZSgnaHRtbCcpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgLy8gSUUgd2lsbCBjbGVhbiB1cCBlbXB0eSB0ZXh0Tm9kZXMgZHVyaW5nXG4gICAgICAgIC8vIGZyYWcuY2xvbmVOb2RlKHRydWUpLCBzbyB3ZSBoYXZlIHRvIGdpdmUgaXRcbiAgICAgICAgLy8gc29tZXRoaW5nIGhlcmUuLi5cbiAgICAgICAgZWwgPSBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZSgnICcpO1xuICAgICAgICBzZXRUb2tlblR5cGUoJ3RleHQnKTtcbiAgICAgIH1cbiAgICB9XG4gICAgZnVuY3Rpb24gc2V0VG9rZW5UeXBlKHR5cGUpIHtcbiAgICAgIGlmICh0b2tlbi5kZXNjcmlwdG9yKSByZXR1cm47XG4gICAgICB2YXIgcGFyc2VkID0gcGFyc2VEaXJlY3RpdmUodG9rZW4udmFsdWUpO1xuICAgICAgdG9rZW4uZGVzY3JpcHRvciA9IHtcbiAgICAgICAgbmFtZTogdHlwZSxcbiAgICAgICAgZGVmOiBkaXJlY3RpdmVzW3R5cGVdLFxuICAgICAgICBleHByZXNzaW9uOiBwYXJzZWQuZXhwcmVzc2lvbixcbiAgICAgICAgZmlsdGVyczogcGFyc2VkLmZpbHRlcnNcbiAgICAgIH07XG4gICAgfVxuICAgIHJldHVybiBlbDtcbiAgfVxuXG4gIC8qKlxuICAgKiBCdWlsZCBhIGZ1bmN0aW9uIHRoYXQgcHJvY2Vzc2VzIGEgdGV4dE5vZGUuXG4gICAqXG4gICAqIEBwYXJhbSB7QXJyYXk8T2JqZWN0Pn0gdG9rZW5zXG4gICAqIEBwYXJhbSB7RG9jdW1lbnRGcmFnbWVudH0gZnJhZ1xuICAgKi9cblxuICBmdW5jdGlvbiBtYWtlVGV4dE5vZGVMaW5rRm4odG9rZW5zLCBmcmFnKSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uIHRleHROb2RlTGlua0ZuKHZtLCBlbCwgaG9zdCwgc2NvcGUpIHtcbiAgICAgIHZhciBmcmFnQ2xvbmUgPSBmcmFnLmNsb25lTm9kZSh0cnVlKTtcbiAgICAgIHZhciBjaGlsZE5vZGVzID0gdG9BcnJheShmcmFnQ2xvbmUuY2hpbGROb2Rlcyk7XG4gICAgICB2YXIgdG9rZW4sIHZhbHVlLCBub2RlO1xuICAgICAgZm9yICh2YXIgaSA9IDAsIGwgPSB0b2tlbnMubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG4gICAgICAgIHRva2VuID0gdG9rZW5zW2ldO1xuICAgICAgICB2YWx1ZSA9IHRva2VuLnZhbHVlO1xuICAgICAgICBpZiAodG9rZW4udGFnKSB7XG4gICAgICAgICAgbm9kZSA9IGNoaWxkTm9kZXNbaV07XG4gICAgICAgICAgaWYgKHRva2VuLm9uZVRpbWUpIHtcbiAgICAgICAgICAgIHZhbHVlID0gKHNjb3BlIHx8IHZtKS4kZXZhbCh2YWx1ZSk7XG4gICAgICAgICAgICBpZiAodG9rZW4uaHRtbCkge1xuICAgICAgICAgICAgICByZXBsYWNlKG5vZGUsIHBhcnNlVGVtcGxhdGUodmFsdWUsIHRydWUpKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIG5vZGUuZGF0YSA9IHZhbHVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB2bS5fYmluZERpcih0b2tlbi5kZXNjcmlwdG9yLCBub2RlLCBob3N0LCBzY29wZSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXBsYWNlKGVsLCBmcmFnQ2xvbmUpO1xuICAgIH07XG4gIH1cblxuICAvKipcbiAgICogQ29tcGlsZSBhIG5vZGUgbGlzdCBhbmQgcmV0dXJuIGEgY2hpbGRMaW5rRm4uXG4gICAqXG4gICAqIEBwYXJhbSB7Tm9kZUxpc3R9IG5vZGVMaXN0XG4gICAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zXG4gICAqIEByZXR1cm4ge0Z1bmN0aW9ufHVuZGVmaW5lZH1cbiAgICovXG5cbiAgZnVuY3Rpb24gY29tcGlsZU5vZGVMaXN0KG5vZGVMaXN0LCBvcHRpb25zKSB7XG4gICAgdmFyIGxpbmtGbnMgPSBbXTtcbiAgICB2YXIgbm9kZUxpbmtGbiwgY2hpbGRMaW5rRm4sIG5vZGU7XG4gICAgZm9yICh2YXIgaSA9IDAsIGwgPSBub2RlTGlzdC5sZW5ndGg7IGkgPCBsOyBpKyspIHtcbiAgICAgIG5vZGUgPSBub2RlTGlzdFtpXTtcbiAgICAgIG5vZGVMaW5rRm4gPSBjb21waWxlTm9kZShub2RlLCBvcHRpb25zKTtcbiAgICAgIGNoaWxkTGlua0ZuID0gIShub2RlTGlua0ZuICYmIG5vZGVMaW5rRm4udGVybWluYWwpICYmIG5vZGUudGFnTmFtZSAhPT0gJ1NDUklQVCcgJiYgbm9kZS5oYXNDaGlsZE5vZGVzKCkgPyBjb21waWxlTm9kZUxpc3Qobm9kZS5jaGlsZE5vZGVzLCBvcHRpb25zKSA6IG51bGw7XG4gICAgICBsaW5rRm5zLnB1c2gobm9kZUxpbmtGbiwgY2hpbGRMaW5rRm4pO1xuICAgIH1cbiAgICByZXR1cm4gbGlua0Zucy5sZW5ndGggPyBtYWtlQ2hpbGRMaW5rRm4obGlua0ZucykgOiBudWxsO1xuICB9XG5cbiAgLyoqXG4gICAqIE1ha2UgYSBjaGlsZCBsaW5rIGZ1bmN0aW9uIGZvciBhIG5vZGUncyBjaGlsZE5vZGVzLlxuICAgKlxuICAgKiBAcGFyYW0ge0FycmF5PEZ1bmN0aW9uPn0gbGlua0Zuc1xuICAgKiBAcmV0dXJuIHtGdW5jdGlvbn0gY2hpbGRMaW5rRm5cbiAgICovXG5cbiAgZnVuY3Rpb24gbWFrZUNoaWxkTGlua0ZuKGxpbmtGbnMpIHtcbiAgICByZXR1cm4gZnVuY3Rpb24gY2hpbGRMaW5rRm4odm0sIG5vZGVzLCBob3N0LCBzY29wZSwgZnJhZykge1xuICAgICAgdmFyIG5vZGUsIG5vZGVMaW5rRm4sIGNoaWxkcmVuTGlua0ZuO1xuICAgICAgZm9yICh2YXIgaSA9IDAsIG4gPSAwLCBsID0gbGlua0Zucy5sZW5ndGg7IGkgPCBsOyBuKyspIHtcbiAgICAgICAgbm9kZSA9IG5vZGVzW25dO1xuICAgICAgICBub2RlTGlua0ZuID0gbGlua0Zuc1tpKytdO1xuICAgICAgICBjaGlsZHJlbkxpbmtGbiA9IGxpbmtGbnNbaSsrXTtcbiAgICAgICAgLy8gY2FjaGUgY2hpbGROb2RlcyBiZWZvcmUgbGlua2luZyBwYXJlbnQsIGZpeCAjNjU3XG4gICAgICAgIHZhciBjaGlsZE5vZGVzID0gdG9BcnJheShub2RlLmNoaWxkTm9kZXMpO1xuICAgICAgICBpZiAobm9kZUxpbmtGbikge1xuICAgICAgICAgIG5vZGVMaW5rRm4odm0sIG5vZGUsIGhvc3QsIHNjb3BlLCBmcmFnKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoY2hpbGRyZW5MaW5rRm4pIHtcbiAgICAgICAgICBjaGlsZHJlbkxpbmtGbih2bSwgY2hpbGROb2RlcywgaG9zdCwgc2NvcGUsIGZyYWcpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDaGVjayBmb3IgZWxlbWVudCBkaXJlY3RpdmVzIChjdXN0b20gZWxlbWVudHMgdGhhdCBzaG91bGRcbiAgICogYmUgcmVzb3ZsZWQgYXMgdGVybWluYWwgZGlyZWN0aXZlcykuXG4gICAqXG4gICAqIEBwYXJhbSB7RWxlbWVudH0gZWxcbiAgICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnNcbiAgICovXG5cbiAgZnVuY3Rpb24gY2hlY2tFbGVtZW50RGlyZWN0aXZlcyhlbCwgb3B0aW9ucykge1xuICAgIHZhciB0YWcgPSBlbC50YWdOYW1lLnRvTG93ZXJDYXNlKCk7XG4gICAgaWYgKGNvbW1vblRhZ1JFLnRlc3QodGFnKSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB2YXIgZGVmID0gcmVzb2x2ZUFzc2V0KG9wdGlvbnMsICdlbGVtZW50RGlyZWN0aXZlcycsIHRhZyk7XG4gICAgaWYgKGRlZikge1xuICAgICAgcmV0dXJuIG1ha2VUZXJtaW5hbE5vZGVMaW5rRm4oZWwsIHRhZywgJycsIG9wdGlvbnMsIGRlZik7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIENoZWNrIGlmIGFuIGVsZW1lbnQgaXMgYSBjb21wb25lbnQuIElmIHllcywgcmV0dXJuXG4gICAqIGEgY29tcG9uZW50IGxpbmsgZnVuY3Rpb24uXG4gICAqXG4gICAqIEBwYXJhbSB7RWxlbWVudH0gZWxcbiAgICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnNcbiAgICogQHJldHVybiB7RnVuY3Rpb258dW5kZWZpbmVkfVxuICAgKi9cblxuICBmdW5jdGlvbiBjaGVja0NvbXBvbmVudChlbCwgb3B0aW9ucykge1xuICAgIHZhciBjb21wb25lbnQgPSBjaGVja0NvbXBvbmVudEF0dHIoZWwsIG9wdGlvbnMpO1xuICAgIGlmIChjb21wb25lbnQpIHtcbiAgICAgIHZhciByZWYgPSBmaW5kUmVmKGVsKTtcbiAgICAgIHZhciBkZXNjcmlwdG9yID0ge1xuICAgICAgICBuYW1lOiAnY29tcG9uZW50JyxcbiAgICAgICAgcmVmOiByZWYsXG4gICAgICAgIGV4cHJlc3Npb246IGNvbXBvbmVudC5pZCxcbiAgICAgICAgZGVmOiBpbnRlcm5hbERpcmVjdGl2ZXMuY29tcG9uZW50LFxuICAgICAgICBtb2RpZmllcnM6IHtcbiAgICAgICAgICBsaXRlcmFsOiAhY29tcG9uZW50LmR5bmFtaWNcbiAgICAgICAgfVxuICAgICAgfTtcbiAgICAgIHZhciBjb21wb25lbnRMaW5rRm4gPSBmdW5jdGlvbiBjb21wb25lbnRMaW5rRm4odm0sIGVsLCBob3N0LCBzY29wZSwgZnJhZykge1xuICAgICAgICBpZiAocmVmKSB7XG4gICAgICAgICAgZGVmaW5lUmVhY3RpdmUoKHNjb3BlIHx8IHZtKS4kcmVmcywgcmVmLCBudWxsKTtcbiAgICAgICAgfVxuICAgICAgICB2bS5fYmluZERpcihkZXNjcmlwdG9yLCBlbCwgaG9zdCwgc2NvcGUsIGZyYWcpO1xuICAgICAgfTtcbiAgICAgIGNvbXBvbmVudExpbmtGbi50ZXJtaW5hbCA9IHRydWU7XG4gICAgICByZXR1cm4gY29tcG9uZW50TGlua0ZuO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBDaGVjayBhbiBlbGVtZW50IGZvciB0ZXJtaW5hbCBkaXJlY3RpdmVzIGluIGZpeGVkIG9yZGVyLlxuICAgKiBJZiBpdCBmaW5kcyBvbmUsIHJldHVybiBhIHRlcm1pbmFsIGxpbmsgZnVuY3Rpb24uXG4gICAqXG4gICAqIEBwYXJhbSB7RWxlbWVudH0gZWxcbiAgICogQHBhcmFtIHtBcnJheX0gYXR0cnNcbiAgICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnNcbiAgICogQHJldHVybiB7RnVuY3Rpb259IHRlcm1pbmFsTGlua0ZuXG4gICAqL1xuXG4gIGZ1bmN0aW9uIGNoZWNrVGVybWluYWxEaXJlY3RpdmVzKGVsLCBhdHRycywgb3B0aW9ucykge1xuICAgIC8vIHNraXAgdi1wcmVcbiAgICBpZiAoZ2V0QXR0cihlbCwgJ3YtcHJlJykgIT09IG51bGwpIHtcbiAgICAgIHJldHVybiBza2lwO1xuICAgIH1cbiAgICAvLyBza2lwIHYtZWxzZSBibG9jaywgYnV0IG9ubHkgaWYgZm9sbG93aW5nIHYtaWZcbiAgICBpZiAoZWwuaGFzQXR0cmlidXRlKCd2LWVsc2UnKSkge1xuICAgICAgdmFyIHByZXYgPSBlbC5wcmV2aW91c0VsZW1lbnRTaWJsaW5nO1xuICAgICAgaWYgKHByZXYgJiYgcHJldi5oYXNBdHRyaWJ1dGUoJ3YtaWYnKSkge1xuICAgICAgICByZXR1cm4gc2tpcDtcbiAgICAgIH1cbiAgICB9XG5cbiAgICB2YXIgYXR0ciwgbmFtZSwgdmFsdWUsIG1vZGlmaWVycywgbWF0Y2hlZCwgZGlyTmFtZSwgcmF3TmFtZSwgYXJnLCBkZWYsIHRlcm1EZWY7XG4gICAgZm9yICh2YXIgaSA9IDAsIGogPSBhdHRycy5sZW5ndGg7IGkgPCBqOyBpKyspIHtcbiAgICAgIGF0dHIgPSBhdHRyc1tpXTtcbiAgICAgIG5hbWUgPSBhdHRyLm5hbWUucmVwbGFjZShtb2RpZmllclJFLCAnJyk7XG4gICAgICBpZiAobWF0Y2hlZCA9IG5hbWUubWF0Y2goZGlyQXR0clJFKSkge1xuICAgICAgICBkZWYgPSByZXNvbHZlQXNzZXQob3B0aW9ucywgJ2RpcmVjdGl2ZXMnLCBtYXRjaGVkWzFdKTtcbiAgICAgICAgaWYgKGRlZiAmJiBkZWYudGVybWluYWwpIHtcbiAgICAgICAgICBpZiAoIXRlcm1EZWYgfHwgKGRlZi5wcmlvcml0eSB8fCBERUZBVUxUX1RFUk1JTkFMX1BSSU9SSVRZKSA+IHRlcm1EZWYucHJpb3JpdHkpIHtcbiAgICAgICAgICAgIHRlcm1EZWYgPSBkZWY7XG4gICAgICAgICAgICByYXdOYW1lID0gYXR0ci5uYW1lO1xuICAgICAgICAgICAgbW9kaWZpZXJzID0gcGFyc2VNb2RpZmllcnMoYXR0ci5uYW1lKTtcbiAgICAgICAgICAgIHZhbHVlID0gYXR0ci52YWx1ZTtcbiAgICAgICAgICAgIGRpck5hbWUgPSBtYXRjaGVkWzFdO1xuICAgICAgICAgICAgYXJnID0gbWF0Y2hlZFsyXTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAodGVybURlZikge1xuICAgICAgcmV0dXJuIG1ha2VUZXJtaW5hbE5vZGVMaW5rRm4oZWwsIGRpck5hbWUsIHZhbHVlLCBvcHRpb25zLCB0ZXJtRGVmLCByYXdOYW1lLCBhcmcsIG1vZGlmaWVycyk7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gc2tpcCgpIHt9XG4gIHNraXAudGVybWluYWwgPSB0cnVlO1xuXG4gIC8qKlxuICAgKiBCdWlsZCBhIG5vZGUgbGluayBmdW5jdGlvbiBmb3IgYSB0ZXJtaW5hbCBkaXJlY3RpdmUuXG4gICAqIEEgdGVybWluYWwgbGluayBmdW5jdGlvbiB0ZXJtaW5hdGVzIHRoZSBjdXJyZW50XG4gICAqIGNvbXBpbGF0aW9uIHJlY3Vyc2lvbiBhbmQgaGFuZGxlcyBjb21waWxhdGlvbiBvZiB0aGVcbiAgICogc3VidHJlZSBpbiB0aGUgZGlyZWN0aXZlLlxuICAgKlxuICAgKiBAcGFyYW0ge0VsZW1lbnR9IGVsXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBkaXJOYW1lXG4gICAqIEBwYXJhbSB7U3RyaW5nfSB2YWx1ZVxuICAgKiBAcGFyYW0ge09iamVjdH0gb3B0aW9uc1xuICAgKiBAcGFyYW0ge09iamVjdH0gZGVmXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBbcmF3TmFtZV1cbiAgICogQHBhcmFtIHtTdHJpbmd9IFthcmddXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBbbW9kaWZpZXJzXVxuICAgKiBAcmV0dXJuIHtGdW5jdGlvbn0gdGVybWluYWxMaW5rRm5cbiAgICovXG5cbiAgZnVuY3Rpb24gbWFrZVRlcm1pbmFsTm9kZUxpbmtGbihlbCwgZGlyTmFtZSwgdmFsdWUsIG9wdGlvbnMsIGRlZiwgcmF3TmFtZSwgYXJnLCBtb2RpZmllcnMpIHtcbiAgICB2YXIgcGFyc2VkID0gcGFyc2VEaXJlY3RpdmUodmFsdWUpO1xuICAgIHZhciBkZXNjcmlwdG9yID0ge1xuICAgICAgbmFtZTogZGlyTmFtZSxcbiAgICAgIGFyZzogYXJnLFxuICAgICAgZXhwcmVzc2lvbjogcGFyc2VkLmV4cHJlc3Npb24sXG4gICAgICBmaWx0ZXJzOiBwYXJzZWQuZmlsdGVycyxcbiAgICAgIHJhdzogdmFsdWUsXG4gICAgICBhdHRyOiByYXdOYW1lLFxuICAgICAgbW9kaWZpZXJzOiBtb2RpZmllcnMsXG4gICAgICBkZWY6IGRlZlxuICAgIH07XG4gICAgLy8gY2hlY2sgcmVmIGZvciB2LWZvciBhbmQgcm91dGVyLXZpZXdcbiAgICBpZiAoZGlyTmFtZSA9PT0gJ2ZvcicgfHwgZGlyTmFtZSA9PT0gJ3JvdXRlci12aWV3Jykge1xuICAgICAgZGVzY3JpcHRvci5yZWYgPSBmaW5kUmVmKGVsKTtcbiAgICB9XG4gICAgdmFyIGZuID0gZnVuY3Rpb24gdGVybWluYWxOb2RlTGlua0ZuKHZtLCBlbCwgaG9zdCwgc2NvcGUsIGZyYWcpIHtcbiAgICAgIGlmIChkZXNjcmlwdG9yLnJlZikge1xuICAgICAgICBkZWZpbmVSZWFjdGl2ZSgoc2NvcGUgfHwgdm0pLiRyZWZzLCBkZXNjcmlwdG9yLnJlZiwgbnVsbCk7XG4gICAgICB9XG4gICAgICB2bS5fYmluZERpcihkZXNjcmlwdG9yLCBlbCwgaG9zdCwgc2NvcGUsIGZyYWcpO1xuICAgIH07XG4gICAgZm4udGVybWluYWwgPSB0cnVlO1xuICAgIHJldHVybiBmbjtcbiAgfVxuXG4gIC8qKlxuICAgKiBDb21waWxlIHRoZSBkaXJlY3RpdmVzIG9uIGFuIGVsZW1lbnQgYW5kIHJldHVybiBhIGxpbmtlci5cbiAgICpcbiAgICogQHBhcmFtIHtBcnJheXxOYW1lZE5vZGVNYXB9IGF0dHJzXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zXG4gICAqIEByZXR1cm4ge0Z1bmN0aW9ufVxuICAgKi9cblxuICBmdW5jdGlvbiBjb21waWxlRGlyZWN0aXZlcyhhdHRycywgb3B0aW9ucykge1xuICAgIHZhciBpID0gYXR0cnMubGVuZ3RoO1xuICAgIHZhciBkaXJzID0gW107XG4gICAgdmFyIGF0dHIsIG5hbWUsIHZhbHVlLCByYXdOYW1lLCByYXdWYWx1ZSwgZGlyTmFtZSwgYXJnLCBtb2RpZmllcnMsIGRpckRlZiwgdG9rZW5zLCBtYXRjaGVkO1xuICAgIHdoaWxlIChpLS0pIHtcbiAgICAgIGF0dHIgPSBhdHRyc1tpXTtcbiAgICAgIG5hbWUgPSByYXdOYW1lID0gYXR0ci5uYW1lO1xuICAgICAgdmFsdWUgPSByYXdWYWx1ZSA9IGF0dHIudmFsdWU7XG4gICAgICB0b2tlbnMgPSBwYXJzZVRleHQodmFsdWUpO1xuICAgICAgLy8gcmVzZXQgYXJnXG4gICAgICBhcmcgPSBudWxsO1xuICAgICAgLy8gY2hlY2sgbW9kaWZpZXJzXG4gICAgICBtb2RpZmllcnMgPSBwYXJzZU1vZGlmaWVycyhuYW1lKTtcbiAgICAgIG5hbWUgPSBuYW1lLnJlcGxhY2UobW9kaWZpZXJSRSwgJycpO1xuXG4gICAgICAvLyBhdHRyaWJ1dGUgaW50ZXJwb2xhdGlvbnNcbiAgICAgIGlmICh0b2tlbnMpIHtcbiAgICAgICAgdmFsdWUgPSB0b2tlbnNUb0V4cCh0b2tlbnMpO1xuICAgICAgICBhcmcgPSBuYW1lO1xuICAgICAgICBwdXNoRGlyKCdiaW5kJywgZGlyZWN0aXZlcy5iaW5kLCB0b2tlbnMpO1xuICAgICAgICAvLyB3YXJuIGFnYWluc3QgbWl4aW5nIG11c3RhY2hlcyB3aXRoIHYtYmluZFxuICAgICAgICBpZiAoJ2RldmVsb3BtZW50JyAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgICAgICAgaWYgKG5hbWUgPT09ICdjbGFzcycgJiYgQXJyYXkucHJvdG90eXBlLnNvbWUuY2FsbChhdHRycywgZnVuY3Rpb24gKGF0dHIpIHtcbiAgICAgICAgICAgIHJldHVybiBhdHRyLm5hbWUgPT09ICc6Y2xhc3MnIHx8IGF0dHIubmFtZSA9PT0gJ3YtYmluZDpjbGFzcyc7XG4gICAgICAgICAgfSkpIHtcbiAgICAgICAgICAgIHdhcm4oJ2NsYXNzPVwiJyArIHJhd1ZhbHVlICsgJ1wiOiBEbyBub3QgbWl4IG11c3RhY2hlIGludGVycG9sYXRpb24gJyArICdhbmQgdi1iaW5kIGZvciBcImNsYXNzXCIgb24gdGhlIHNhbWUgZWxlbWVudC4gVXNlIG9uZSBvciB0aGUgb3RoZXIuJywgb3B0aW9ucyk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9IGVsc2VcblxuICAgICAgICAvLyBzcGVjaWFsIGF0dHJpYnV0ZTogdHJhbnNpdGlvblxuICAgICAgICBpZiAodHJhbnNpdGlvblJFLnRlc3QobmFtZSkpIHtcbiAgICAgICAgICBtb2RpZmllcnMubGl0ZXJhbCA9ICFiaW5kUkUudGVzdChuYW1lKTtcbiAgICAgICAgICBwdXNoRGlyKCd0cmFuc2l0aW9uJywgaW50ZXJuYWxEaXJlY3RpdmVzLnRyYW5zaXRpb24pO1xuICAgICAgICB9IGVsc2VcblxuICAgICAgICAgIC8vIGV2ZW50IGhhbmRsZXJzXG4gICAgICAgICAgaWYgKG9uUkUudGVzdChuYW1lKSkge1xuICAgICAgICAgICAgYXJnID0gbmFtZS5yZXBsYWNlKG9uUkUsICcnKTtcbiAgICAgICAgICAgIHB1c2hEaXIoJ29uJywgZGlyZWN0aXZlcy5vbik7XG4gICAgICAgICAgfSBlbHNlXG5cbiAgICAgICAgICAgIC8vIGF0dHJpYnV0ZSBiaW5kaW5nc1xuICAgICAgICAgICAgaWYgKGJpbmRSRS50ZXN0KG5hbWUpKSB7XG4gICAgICAgICAgICAgIGRpck5hbWUgPSBuYW1lLnJlcGxhY2UoYmluZFJFLCAnJyk7XG4gICAgICAgICAgICAgIGlmIChkaXJOYW1lID09PSAnc3R5bGUnIHx8IGRpck5hbWUgPT09ICdjbGFzcycpIHtcbiAgICAgICAgICAgICAgICBwdXNoRGlyKGRpck5hbWUsIGludGVybmFsRGlyZWN0aXZlc1tkaXJOYW1lXSk7XG4gICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgYXJnID0gZGlyTmFtZTtcbiAgICAgICAgICAgICAgICBwdXNoRGlyKCdiaW5kJywgZGlyZWN0aXZlcy5iaW5kKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlXG5cbiAgICAgICAgICAgICAgLy8gbm9ybWFsIGRpcmVjdGl2ZXNcbiAgICAgICAgICAgICAgaWYgKG1hdGNoZWQgPSBuYW1lLm1hdGNoKGRpckF0dHJSRSkpIHtcbiAgICAgICAgICAgICAgICBkaXJOYW1lID0gbWF0Y2hlZFsxXTtcbiAgICAgICAgICAgICAgICBhcmcgPSBtYXRjaGVkWzJdO1xuXG4gICAgICAgICAgICAgICAgLy8gc2tpcCB2LWVsc2UgKHdoZW4gdXNlZCB3aXRoIHYtc2hvdylcbiAgICAgICAgICAgICAgICBpZiAoZGlyTmFtZSA9PT0gJ2Vsc2UnKSB7XG4gICAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBkaXJEZWYgPSByZXNvbHZlQXNzZXQob3B0aW9ucywgJ2RpcmVjdGl2ZXMnLCBkaXJOYW1lLCB0cnVlKTtcbiAgICAgICAgICAgICAgICBpZiAoZGlyRGVmKSB7XG4gICAgICAgICAgICAgICAgICBwdXNoRGlyKGRpck5hbWUsIGRpckRlZik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUHVzaCBhIGRpcmVjdGl2ZS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBkaXJOYW1lXG4gICAgICogQHBhcmFtIHtPYmplY3R8RnVuY3Rpb259IGRlZlxuICAgICAqIEBwYXJhbSB7QXJyYXl9IFtpbnRlcnBUb2tlbnNdXG4gICAgICovXG5cbiAgICBmdW5jdGlvbiBwdXNoRGlyKGRpck5hbWUsIGRlZiwgaW50ZXJwVG9rZW5zKSB7XG4gICAgICB2YXIgaGFzT25lVGltZVRva2VuID0gaW50ZXJwVG9rZW5zICYmIGhhc09uZVRpbWUoaW50ZXJwVG9rZW5zKTtcbiAgICAgIHZhciBwYXJzZWQgPSAhaGFzT25lVGltZVRva2VuICYmIHBhcnNlRGlyZWN0aXZlKHZhbHVlKTtcbiAgICAgIGRpcnMucHVzaCh7XG4gICAgICAgIG5hbWU6IGRpck5hbWUsXG4gICAgICAgIGF0dHI6IHJhd05hbWUsXG4gICAgICAgIHJhdzogcmF3VmFsdWUsXG4gICAgICAgIGRlZjogZGVmLFxuICAgICAgICBhcmc6IGFyZyxcbiAgICAgICAgbW9kaWZpZXJzOiBtb2RpZmllcnMsXG4gICAgICAgIC8vIGNvbnZlcnNpb24gZnJvbSBpbnRlcnBvbGF0aW9uIHN0cmluZ3Mgd2l0aCBvbmUtdGltZSB0b2tlblxuICAgICAgICAvLyB0byBleHByZXNzaW9uIGlzIGRpZmZlcmVkIHVudGlsIGRpcmVjdGl2ZSBiaW5kIHRpbWUgc28gdGhhdCB3ZVxuICAgICAgICAvLyBoYXZlIGFjY2VzcyB0byB0aGUgYWN0dWFsIHZtIGNvbnRleHQgZm9yIG9uZS10aW1lIGJpbmRpbmdzLlxuICAgICAgICBleHByZXNzaW9uOiBwYXJzZWQgJiYgcGFyc2VkLmV4cHJlc3Npb24sXG4gICAgICAgIGZpbHRlcnM6IHBhcnNlZCAmJiBwYXJzZWQuZmlsdGVycyxcbiAgICAgICAgaW50ZXJwOiBpbnRlcnBUb2tlbnMsXG4gICAgICAgIGhhc09uZVRpbWU6IGhhc09uZVRpbWVUb2tlblxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgaWYgKGRpcnMubGVuZ3RoKSB7XG4gICAgICByZXR1cm4gbWFrZU5vZGVMaW5rRm4oZGlycyk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFBhcnNlIG1vZGlmaWVycyBmcm9tIGRpcmVjdGl2ZSBhdHRyaWJ1dGUgbmFtZS5cbiAgICpcbiAgICogQHBhcmFtIHtTdHJpbmd9IG5hbWVcbiAgICogQHJldHVybiB7T2JqZWN0fVxuICAgKi9cblxuICBmdW5jdGlvbiBwYXJzZU1vZGlmaWVycyhuYW1lKSB7XG4gICAgdmFyIHJlcyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gICAgdmFyIG1hdGNoID0gbmFtZS5tYXRjaChtb2RpZmllclJFKTtcbiAgICBpZiAobWF0Y2gpIHtcbiAgICAgIHZhciBpID0gbWF0Y2gubGVuZ3RoO1xuICAgICAgd2hpbGUgKGktLSkge1xuICAgICAgICByZXNbbWF0Y2hbaV0uc2xpY2UoMSldID0gdHJ1ZTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHJlcztcbiAgfVxuXG4gIC8qKlxuICAgKiBCdWlsZCBhIGxpbmsgZnVuY3Rpb24gZm9yIGFsbCBkaXJlY3RpdmVzIG9uIGEgc2luZ2xlIG5vZGUuXG4gICAqXG4gICAqIEBwYXJhbSB7QXJyYXl9IGRpcmVjdGl2ZXNcbiAgICogQHJldHVybiB7RnVuY3Rpb259IGRpcmVjdGl2ZXNMaW5rRm5cbiAgICovXG5cbiAgZnVuY3Rpb24gbWFrZU5vZGVMaW5rRm4oZGlyZWN0aXZlcykge1xuICAgIHJldHVybiBmdW5jdGlvbiBub2RlTGlua0ZuKHZtLCBlbCwgaG9zdCwgc2NvcGUsIGZyYWcpIHtcbiAgICAgIC8vIHJldmVyc2UgYXBwbHkgYmVjYXVzZSBpdCdzIHNvcnRlZCBsb3cgdG8gaGlnaFxuICAgICAgdmFyIGkgPSBkaXJlY3RpdmVzLmxlbmd0aDtcbiAgICAgIHdoaWxlIChpLS0pIHtcbiAgICAgICAgdm0uX2JpbmREaXIoZGlyZWN0aXZlc1tpXSwgZWwsIGhvc3QsIHNjb3BlLCBmcmFnKTtcbiAgICAgIH1cbiAgICB9O1xuICB9XG5cbiAgLyoqXG4gICAqIENoZWNrIGlmIGFuIGludGVycG9sYXRpb24gc3RyaW5nIGNvbnRhaW5zIG9uZS10aW1lIHRva2Vucy5cbiAgICpcbiAgICogQHBhcmFtIHtBcnJheX0gdG9rZW5zXG4gICAqIEByZXR1cm4ge0Jvb2xlYW59XG4gICAqL1xuXG4gIGZ1bmN0aW9uIGhhc09uZVRpbWUodG9rZW5zKSB7XG4gICAgdmFyIGkgPSB0b2tlbnMubGVuZ3RoO1xuICAgIHdoaWxlIChpLS0pIHtcbiAgICAgIGlmICh0b2tlbnNbaV0ub25lVGltZSkgcmV0dXJuIHRydWU7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gaXNTY3JpcHQoZWwpIHtcbiAgICByZXR1cm4gZWwudGFnTmFtZSA9PT0gJ1NDUklQVCcgJiYgKCFlbC5oYXNBdHRyaWJ1dGUoJ3R5cGUnKSB8fCBlbC5nZXRBdHRyaWJ1dGUoJ3R5cGUnKSA9PT0gJ3RleHQvamF2YXNjcmlwdCcpO1xuICB9XG5cbiAgdmFyIHNwZWNpYWxDaGFyUkUgPSAvW15cXHdcXC06XFwuXS87XG5cbiAgLyoqXG4gICAqIFByb2Nlc3MgYW4gZWxlbWVudCBvciBhIERvY3VtZW50RnJhZ21lbnQgYmFzZWQgb24gYVxuICAgKiBpbnN0YW5jZSBvcHRpb24gb2JqZWN0LiBUaGlzIGFsbG93cyB1cyB0byB0cmFuc2NsdWRlXG4gICAqIGEgdGVtcGxhdGUgbm9kZS9mcmFnbWVudCBiZWZvcmUgdGhlIGluc3RhbmNlIGlzIGNyZWF0ZWQsXG4gICAqIHNvIHRoZSBwcm9jZXNzZWQgZnJhZ21lbnQgY2FuIHRoZW4gYmUgY2xvbmVkIGFuZCByZXVzZWRcbiAgICogaW4gdi1mb3IuXG4gICAqXG4gICAqIEBwYXJhbSB7RWxlbWVudH0gZWxcbiAgICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnNcbiAgICogQHJldHVybiB7RWxlbWVudHxEb2N1bWVudEZyYWdtZW50fVxuICAgKi9cblxuICBmdW5jdGlvbiB0cmFuc2NsdWRlKGVsLCBvcHRpb25zKSB7XG4gICAgLy8gZXh0cmFjdCBjb250YWluZXIgYXR0cmlidXRlcyB0byBwYXNzIHRoZW0gZG93blxuICAgIC8vIHRvIGNvbXBpbGVyLCBiZWNhdXNlIHRoZXkgbmVlZCB0byBiZSBjb21waWxlZCBpblxuICAgIC8vIHBhcmVudCBzY29wZS4gd2UgYXJlIG11dGF0aW5nIHRoZSBvcHRpb25zIG9iamVjdCBoZXJlXG4gICAgLy8gYXNzdW1pbmcgdGhlIHNhbWUgb2JqZWN0IHdpbGwgYmUgdXNlZCBmb3IgY29tcGlsZVxuICAgIC8vIHJpZ2h0IGFmdGVyIHRoaXMuXG4gICAgaWYgKG9wdGlvbnMpIHtcbiAgICAgIG9wdGlvbnMuX2NvbnRhaW5lckF0dHJzID0gZXh0cmFjdEF0dHJzKGVsKTtcbiAgICB9XG4gICAgLy8gZm9yIHRlbXBsYXRlIHRhZ3MsIHdoYXQgd2Ugd2FudCBpcyBpdHMgY29udGVudCBhc1xuICAgIC8vIGEgZG9jdW1lbnRGcmFnbWVudCAoZm9yIGZyYWdtZW50IGluc3RhbmNlcylcbiAgICBpZiAoaXNUZW1wbGF0ZShlbCkpIHtcbiAgICAgIGVsID0gcGFyc2VUZW1wbGF0ZShlbCk7XG4gICAgfVxuICAgIGlmIChvcHRpb25zKSB7XG4gICAgICBpZiAob3B0aW9ucy5fYXNDb21wb25lbnQgJiYgIW9wdGlvbnMudGVtcGxhdGUpIHtcbiAgICAgICAgb3B0aW9ucy50ZW1wbGF0ZSA9ICc8c2xvdD48L3Nsb3Q+JztcbiAgICAgIH1cbiAgICAgIGlmIChvcHRpb25zLnRlbXBsYXRlKSB7XG4gICAgICAgIG9wdGlvbnMuX2NvbnRlbnQgPSBleHRyYWN0Q29udGVudChlbCk7XG4gICAgICAgIGVsID0gdHJhbnNjbHVkZVRlbXBsYXRlKGVsLCBvcHRpb25zKTtcbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKGlzRnJhZ21lbnQoZWwpKSB7XG4gICAgICAvLyBhbmNob3JzIGZvciBmcmFnbWVudCBpbnN0YW5jZVxuICAgICAgLy8gcGFzc2luZyBpbiBgcGVyc2lzdDogdHJ1ZWAgdG8gYXZvaWQgdGhlbSBiZWluZ1xuICAgICAgLy8gZGlzY2FyZGVkIGJ5IElFIGR1cmluZyB0ZW1wbGF0ZSBjbG9uaW5nXG4gICAgICBwcmVwZW5kKGNyZWF0ZUFuY2hvcigndi1zdGFydCcsIHRydWUpLCBlbCk7XG4gICAgICBlbC5hcHBlbmRDaGlsZChjcmVhdGVBbmNob3IoJ3YtZW5kJywgdHJ1ZSkpO1xuICAgIH1cbiAgICByZXR1cm4gZWw7XG4gIH1cblxuICAvKipcbiAgICogUHJvY2VzcyB0aGUgdGVtcGxhdGUgb3B0aW9uLlxuICAgKiBJZiB0aGUgcmVwbGFjZSBvcHRpb24gaXMgdHJ1ZSB0aGlzIHdpbGwgc3dhcCB0aGUgJGVsLlxuICAgKlxuICAgKiBAcGFyYW0ge0VsZW1lbnR9IGVsXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zXG4gICAqIEByZXR1cm4ge0VsZW1lbnR8RG9jdW1lbnRGcmFnbWVudH1cbiAgICovXG5cbiAgZnVuY3Rpb24gdHJhbnNjbHVkZVRlbXBsYXRlKGVsLCBvcHRpb25zKSB7XG4gICAgdmFyIHRlbXBsYXRlID0gb3B0aW9ucy50ZW1wbGF0ZTtcbiAgICB2YXIgZnJhZyA9IHBhcnNlVGVtcGxhdGUodGVtcGxhdGUsIHRydWUpO1xuICAgIGlmIChmcmFnKSB7XG4gICAgICB2YXIgcmVwbGFjZXIgPSBmcmFnLmZpcnN0Q2hpbGQ7XG4gICAgICB2YXIgdGFnID0gcmVwbGFjZXIudGFnTmFtZSAmJiByZXBsYWNlci50YWdOYW1lLnRvTG93ZXJDYXNlKCk7XG4gICAgICBpZiAob3B0aW9ucy5yZXBsYWNlKSB7XG4gICAgICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBpZiAqL1xuICAgICAgICBpZiAoZWwgPT09IGRvY3VtZW50LmJvZHkpIHtcbiAgICAgICAgICAnZGV2ZWxvcG1lbnQnICE9PSAncHJvZHVjdGlvbicgJiYgd2FybignWW91IGFyZSBtb3VudGluZyBhbiBpbnN0YW5jZSB3aXRoIGEgdGVtcGxhdGUgdG8gJyArICc8Ym9keT4uIFRoaXMgd2lsbCByZXBsYWNlIDxib2R5PiBlbnRpcmVseS4gWW91ICcgKyAnc2hvdWxkIHByb2JhYmx5IHVzZSBgcmVwbGFjZTogZmFsc2VgIGhlcmUuJyk7XG4gICAgICAgIH1cbiAgICAgICAgLy8gdGhlcmUgYXJlIG1hbnkgY2FzZXMgd2hlcmUgdGhlIGluc3RhbmNlIG11c3RcbiAgICAgICAgLy8gYmVjb21lIGEgZnJhZ21lbnQgaW5zdGFuY2U6IGJhc2ljYWxseSBhbnl0aGluZyB0aGF0XG4gICAgICAgIC8vIGNhbiBjcmVhdGUgbW9yZSB0aGFuIDEgcm9vdCBub2Rlcy5cbiAgICAgICAgaWYgKFxuICAgICAgICAvLyBtdWx0aS1jaGlsZHJlbiB0ZW1wbGF0ZVxuICAgICAgICBmcmFnLmNoaWxkTm9kZXMubGVuZ3RoID4gMSB8fFxuICAgICAgICAvLyBub24tZWxlbWVudCB0ZW1wbGF0ZVxuICAgICAgICByZXBsYWNlci5ub2RlVHlwZSAhPT0gMSB8fFxuICAgICAgICAvLyBzaW5nbGUgbmVzdGVkIGNvbXBvbmVudFxuICAgICAgICB0YWcgPT09ICdjb21wb25lbnQnIHx8IHJlc29sdmVBc3NldChvcHRpb25zLCAnY29tcG9uZW50cycsIHRhZykgfHwgaGFzQmluZEF0dHIocmVwbGFjZXIsICdpcycpIHx8XG4gICAgICAgIC8vIGVsZW1lbnQgZGlyZWN0aXZlXG4gICAgICAgIHJlc29sdmVBc3NldChvcHRpb25zLCAnZWxlbWVudERpcmVjdGl2ZXMnLCB0YWcpIHx8XG4gICAgICAgIC8vIGZvciBibG9ja1xuICAgICAgICByZXBsYWNlci5oYXNBdHRyaWJ1dGUoJ3YtZm9yJykgfHxcbiAgICAgICAgLy8gaWYgYmxvY2tcbiAgICAgICAgcmVwbGFjZXIuaGFzQXR0cmlidXRlKCd2LWlmJykpIHtcbiAgICAgICAgICByZXR1cm4gZnJhZztcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBvcHRpb25zLl9yZXBsYWNlckF0dHJzID0gZXh0cmFjdEF0dHJzKHJlcGxhY2VyKTtcbiAgICAgICAgICBtZXJnZUF0dHJzKGVsLCByZXBsYWNlcik7XG4gICAgICAgICAgcmV0dXJuIHJlcGxhY2VyO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBlbC5hcHBlbmRDaGlsZChmcmFnKTtcbiAgICAgICAgcmV0dXJuIGVsO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICAnZGV2ZWxvcG1lbnQnICE9PSAncHJvZHVjdGlvbicgJiYgd2FybignSW52YWxpZCB0ZW1wbGF0ZSBvcHRpb246ICcgKyB0ZW1wbGF0ZSk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEhlbHBlciB0byBleHRyYWN0IGEgY29tcG9uZW50IGNvbnRhaW5lcidzIGF0dHJpYnV0ZXNcbiAgICogaW50byBhIHBsYWluIG9iamVjdCBhcnJheS5cbiAgICpcbiAgICogQHBhcmFtIHtFbGVtZW50fSBlbFxuICAgKiBAcmV0dXJuIHtBcnJheX1cbiAgICovXG5cbiAgZnVuY3Rpb24gZXh0cmFjdEF0dHJzKGVsKSB7XG4gICAgaWYgKGVsLm5vZGVUeXBlID09PSAxICYmIGVsLmhhc0F0dHJpYnV0ZXMoKSkge1xuICAgICAgcmV0dXJuIHRvQXJyYXkoZWwuYXR0cmlidXRlcyk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIE1lcmdlIHRoZSBhdHRyaWJ1dGVzIG9mIHR3byBlbGVtZW50cywgYW5kIG1ha2Ugc3VyZVxuICAgKiB0aGUgY2xhc3MgbmFtZXMgYXJlIG1lcmdlZCBwcm9wZXJseS5cbiAgICpcbiAgICogQHBhcmFtIHtFbGVtZW50fSBmcm9tXG4gICAqIEBwYXJhbSB7RWxlbWVudH0gdG9cbiAgICovXG5cbiAgZnVuY3Rpb24gbWVyZ2VBdHRycyhmcm9tLCB0bykge1xuICAgIHZhciBhdHRycyA9IGZyb20uYXR0cmlidXRlcztcbiAgICB2YXIgaSA9IGF0dHJzLmxlbmd0aDtcbiAgICB2YXIgbmFtZSwgdmFsdWU7XG4gICAgd2hpbGUgKGktLSkge1xuICAgICAgbmFtZSA9IGF0dHJzW2ldLm5hbWU7XG4gICAgICB2YWx1ZSA9IGF0dHJzW2ldLnZhbHVlO1xuICAgICAgaWYgKCF0by5oYXNBdHRyaWJ1dGUobmFtZSkgJiYgIXNwZWNpYWxDaGFyUkUudGVzdChuYW1lKSkge1xuICAgICAgICB0by5zZXRBdHRyaWJ1dGUobmFtZSwgdmFsdWUpO1xuICAgICAgfSBlbHNlIGlmIChuYW1lID09PSAnY2xhc3MnICYmICFwYXJzZVRleHQodmFsdWUpICYmICh2YWx1ZSA9IHZhbHVlLnRyaW0oKSkpIHtcbiAgICAgICAgdmFsdWUuc3BsaXQoL1xccysvKS5mb3JFYWNoKGZ1bmN0aW9uIChjbHMpIHtcbiAgICAgICAgICBhZGRDbGFzcyh0bywgY2xzKTtcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFNjYW4gYW5kIGRldGVybWluZSBzbG90IGNvbnRlbnQgZGlzdHJpYnV0aW9uLlxuICAgKiBXZSBkbyB0aGlzIGR1cmluZyB0cmFuc2NsdXNpb24gaW5zdGVhZCBhdCBjb21waWxlIHRpbWUgc28gdGhhdFxuICAgKiB0aGUgZGlzdHJpYnV0aW9uIGlzIGRlY291cGxlZCBmcm9tIHRoZSBjb21waWxhdGlvbiBvcmRlciBvZlxuICAgKiB0aGUgc2xvdHMuXG4gICAqXG4gICAqIEBwYXJhbSB7RWxlbWVudHxEb2N1bWVudEZyYWdtZW50fSB0ZW1wbGF0ZVxuICAgKiBAcGFyYW0ge0VsZW1lbnR9IGNvbnRlbnRcbiAgICogQHBhcmFtIHtWdWV9IHZtXG4gICAqL1xuXG4gIGZ1bmN0aW9uIHJlc29sdmVTbG90cyh2bSwgY29udGVudCkge1xuICAgIGlmICghY29udGVudCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB2YXIgY29udGVudHMgPSB2bS5fc2xvdENvbnRlbnRzID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiAgICB2YXIgZWwsIG5hbWU7XG4gICAgZm9yICh2YXIgaSA9IDAsIGwgPSBjb250ZW50LmNoaWxkcmVuLmxlbmd0aDsgaSA8IGw7IGkrKykge1xuICAgICAgZWwgPSBjb250ZW50LmNoaWxkcmVuW2ldO1xuICAgICAgLyogZXNsaW50LWRpc2FibGUgbm8tY29uZC1hc3NpZ24gKi9cbiAgICAgIGlmIChuYW1lID0gZWwuZ2V0QXR0cmlidXRlKCdzbG90JykpIHtcbiAgICAgICAgKGNvbnRlbnRzW25hbWVdIHx8IChjb250ZW50c1tuYW1lXSA9IFtdKSkucHVzaChlbCk7XG4gICAgICB9XG4gICAgICAvKiBlc2xpbnQtZW5hYmxlIG5vLWNvbmQtYXNzaWduICovXG4gICAgICBpZiAoJ2RldmVsb3BtZW50JyAhPT0gJ3Byb2R1Y3Rpb24nICYmIGdldEJpbmRBdHRyKGVsLCAnc2xvdCcpKSB7XG4gICAgICAgIHdhcm4oJ1RoZSBcInNsb3RcIiBhdHRyaWJ1dGUgbXVzdCBiZSBzdGF0aWMuJywgdm0uJHBhcmVudCk7XG4gICAgICB9XG4gICAgfVxuICAgIGZvciAobmFtZSBpbiBjb250ZW50cykge1xuICAgICAgY29udGVudHNbbmFtZV0gPSBleHRyYWN0RnJhZ21lbnQoY29udGVudHNbbmFtZV0sIGNvbnRlbnQpO1xuICAgIH1cbiAgICBpZiAoY29udGVudC5oYXNDaGlsZE5vZGVzKCkpIHtcbiAgICAgIHZhciBub2RlcyA9IGNvbnRlbnQuY2hpbGROb2RlcztcbiAgICAgIGlmIChub2Rlcy5sZW5ndGggPT09IDEgJiYgbm9kZXNbMF0ubm9kZVR5cGUgPT09IDMgJiYgIW5vZGVzWzBdLmRhdGEudHJpbSgpKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIGNvbnRlbnRzWydkZWZhdWx0J10gPSBleHRyYWN0RnJhZ21lbnQoY29udGVudC5jaGlsZE5vZGVzLCBjb250ZW50KTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogRXh0cmFjdCBxdWFsaWZpZWQgY29udGVudCBub2RlcyBmcm9tIGEgbm9kZSBsaXN0LlxuICAgKlxuICAgKiBAcGFyYW0ge05vZGVMaXN0fSBub2Rlc1xuICAgKiBAcmV0dXJuIHtEb2N1bWVudEZyYWdtZW50fVxuICAgKi9cblxuICBmdW5jdGlvbiBleHRyYWN0RnJhZ21lbnQobm9kZXMsIHBhcmVudCkge1xuICAgIHZhciBmcmFnID0gZG9jdW1lbnQuY3JlYXRlRG9jdW1lbnRGcmFnbWVudCgpO1xuICAgIG5vZGVzID0gdG9BcnJheShub2Rlcyk7XG4gICAgZm9yICh2YXIgaSA9IDAsIGwgPSBub2Rlcy5sZW5ndGg7IGkgPCBsOyBpKyspIHtcbiAgICAgIHZhciBub2RlID0gbm9kZXNbaV07XG4gICAgICBpZiAoaXNUZW1wbGF0ZShub2RlKSAmJiAhbm9kZS5oYXNBdHRyaWJ1dGUoJ3YtaWYnKSAmJiAhbm9kZS5oYXNBdHRyaWJ1dGUoJ3YtZm9yJykpIHtcbiAgICAgICAgcGFyZW50LnJlbW92ZUNoaWxkKG5vZGUpO1xuICAgICAgICBub2RlID0gcGFyc2VUZW1wbGF0ZShub2RlLCB0cnVlKTtcbiAgICAgIH1cbiAgICAgIGZyYWcuYXBwZW5kQ2hpbGQobm9kZSk7XG4gICAgfVxuICAgIHJldHVybiBmcmFnO1xuICB9XG5cblxuXG4gIHZhciBjb21waWxlciA9IE9iamVjdC5mcmVlemUoe1xuICBcdGNvbXBpbGU6IGNvbXBpbGUsXG4gIFx0Y29tcGlsZUFuZExpbmtQcm9wczogY29tcGlsZUFuZExpbmtQcm9wcyxcbiAgXHRjb21waWxlUm9vdDogY29tcGlsZVJvb3QsXG4gIFx0dHJhbnNjbHVkZTogdHJhbnNjbHVkZSxcbiAgXHRyZXNvbHZlU2xvdHM6IHJlc29sdmVTbG90c1xuICB9KTtcblxuICBmdW5jdGlvbiBzdGF0ZU1peGluIChWdWUpIHtcbiAgICAvKipcbiAgICAgKiBBY2Nlc3NvciBmb3IgYCRkYXRhYCBwcm9wZXJ0eSwgc2luY2Ugc2V0dGluZyAkZGF0YVxuICAgICAqIHJlcXVpcmVzIG9ic2VydmluZyB0aGUgbmV3IG9iamVjdCBhbmQgdXBkYXRpbmdcbiAgICAgKiBwcm94aWVkIHByb3BlcnRpZXMuXG4gICAgICovXG5cbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoVnVlLnByb3RvdHlwZSwgJyRkYXRhJywge1xuICAgICAgZ2V0OiBmdW5jdGlvbiBnZXQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9kYXRhO1xuICAgICAgfSxcbiAgICAgIHNldDogZnVuY3Rpb24gc2V0KG5ld0RhdGEpIHtcbiAgICAgICAgaWYgKG5ld0RhdGEgIT09IHRoaXMuX2RhdGEpIHtcbiAgICAgICAgICB0aGlzLl9zZXREYXRhKG5ld0RhdGEpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICAvKipcbiAgICAgKiBTZXR1cCB0aGUgc2NvcGUgb2YgYW4gaW5zdGFuY2UsIHdoaWNoIGNvbnRhaW5zOlxuICAgICAqIC0gb2JzZXJ2ZWQgZGF0YVxuICAgICAqIC0gY29tcHV0ZWQgcHJvcGVydGllc1xuICAgICAqIC0gdXNlciBtZXRob2RzXG4gICAgICogLSBtZXRhIHByb3BlcnRpZXNcbiAgICAgKi9cblxuICAgIFZ1ZS5wcm90b3R5cGUuX2luaXRTdGF0ZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIHRoaXMuX2luaXRQcm9wcygpO1xuICAgICAgdGhpcy5faW5pdE1ldGEoKTtcbiAgICAgIHRoaXMuX2luaXRNZXRob2RzKCk7XG4gICAgICB0aGlzLl9pbml0RGF0YSgpO1xuICAgICAgdGhpcy5faW5pdENvbXB1dGVkKCk7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIEluaXRpYWxpemUgcHJvcHMuXG4gICAgICovXG5cbiAgICBWdWUucHJvdG90eXBlLl9pbml0UHJvcHMgPSBmdW5jdGlvbiAoKSB7XG4gICAgICB2YXIgb3B0aW9ucyA9IHRoaXMuJG9wdGlvbnM7XG4gICAgICB2YXIgZWwgPSBvcHRpb25zLmVsO1xuICAgICAgdmFyIHByb3BzID0gb3B0aW9ucy5wcm9wcztcbiAgICAgIGlmIChwcm9wcyAmJiAhZWwpIHtcbiAgICAgICAgJ2RldmVsb3BtZW50JyAhPT0gJ3Byb2R1Y3Rpb24nICYmIHdhcm4oJ1Byb3BzIHdpbGwgbm90IGJlIGNvbXBpbGVkIGlmIG5vIGBlbGAgb3B0aW9uIGlzICcgKyAncHJvdmlkZWQgYXQgaW5zdGFudGlhdGlvbi4nLCB0aGlzKTtcbiAgICAgIH1cbiAgICAgIC8vIG1ha2Ugc3VyZSB0byBjb252ZXJ0IHN0cmluZyBzZWxlY3RvcnMgaW50byBlbGVtZW50IG5vd1xuICAgICAgZWwgPSBvcHRpb25zLmVsID0gcXVlcnkoZWwpO1xuICAgICAgdGhpcy5fcHJvcHNVbmxpbmtGbiA9IGVsICYmIGVsLm5vZGVUeXBlID09PSAxICYmIHByb3BzXG4gICAgICAvLyBwcm9wcyBtdXN0IGJlIGxpbmtlZCBpbiBwcm9wZXIgc2NvcGUgaWYgaW5zaWRlIHYtZm9yXG4gICAgICA/IGNvbXBpbGVBbmRMaW5rUHJvcHModGhpcywgZWwsIHByb3BzLCB0aGlzLl9zY29wZSkgOiBudWxsO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBJbml0aWFsaXplIHRoZSBkYXRhLlxuICAgICAqL1xuXG4gICAgVnVlLnByb3RvdHlwZS5faW5pdERhdGEgPSBmdW5jdGlvbiAoKSB7XG4gICAgICB2YXIgZGF0YUZuID0gdGhpcy4kb3B0aW9ucy5kYXRhO1xuICAgICAgdmFyIGRhdGEgPSB0aGlzLl9kYXRhID0gZGF0YUZuID8gZGF0YUZuKCkgOiB7fTtcbiAgICAgIGlmICghaXNQbGFpbk9iamVjdChkYXRhKSkge1xuICAgICAgICBkYXRhID0ge307XG4gICAgICAgICdkZXZlbG9wbWVudCcgIT09ICdwcm9kdWN0aW9uJyAmJiB3YXJuKCdkYXRhIGZ1bmN0aW9ucyBzaG91bGQgcmV0dXJuIGFuIG9iamVjdC4nLCB0aGlzKTtcbiAgICAgIH1cbiAgICAgIHZhciBwcm9wcyA9IHRoaXMuX3Byb3BzO1xuICAgICAgLy8gcHJveHkgZGF0YSBvbiBpbnN0YW5jZVxuICAgICAgdmFyIGtleXMgPSBPYmplY3Qua2V5cyhkYXRhKTtcbiAgICAgIHZhciBpLCBrZXk7XG4gICAgICBpID0ga2V5cy5sZW5ndGg7XG4gICAgICB3aGlsZSAoaS0tKSB7XG4gICAgICAgIGtleSA9IGtleXNbaV07XG4gICAgICAgIC8vIHRoZXJlIGFyZSB0d28gc2NlbmFyaW9zIHdoZXJlIHdlIGNhbiBwcm94eSBhIGRhdGEga2V5OlxuICAgICAgICAvLyAxLiBpdCdzIG5vdCBhbHJlYWR5IGRlZmluZWQgYXMgYSBwcm9wXG4gICAgICAgIC8vIDIuIGl0J3MgcHJvdmlkZWQgdmlhIGEgaW5zdGFudGlhdGlvbiBvcHRpb24gQU5EIHRoZXJlIGFyZSBub1xuICAgICAgICAvLyAgICB0ZW1wbGF0ZSBwcm9wIHByZXNlbnRcbiAgICAgICAgaWYgKCFwcm9wcyB8fCAhaGFzT3duKHByb3BzLCBrZXkpKSB7XG4gICAgICAgICAgdGhpcy5fcHJveHkoa2V5KTtcbiAgICAgICAgfSBlbHNlIGlmICgnZGV2ZWxvcG1lbnQnICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICAgICAgICB3YXJuKCdEYXRhIGZpZWxkIFwiJyArIGtleSArICdcIiBpcyBhbHJlYWR5IGRlZmluZWQgJyArICdhcyBhIHByb3AuIFRvIHByb3ZpZGUgZGVmYXVsdCB2YWx1ZSBmb3IgYSBwcm9wLCB1c2UgdGhlIFwiZGVmYXVsdFwiICcgKyAncHJvcCBvcHRpb247IGlmIHlvdSB3YW50IHRvIHBhc3MgcHJvcCB2YWx1ZXMgdG8gYW4gaW5zdGFudGlhdGlvbiAnICsgJ2NhbGwsIHVzZSB0aGUgXCJwcm9wc0RhdGFcIiBvcHRpb24uJywgdGhpcyk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIC8vIG9ic2VydmUgZGF0YVxuICAgICAgb2JzZXJ2ZShkYXRhLCB0aGlzKTtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogU3dhcCB0aGUgaW5zdGFuY2UncyAkZGF0YS4gQ2FsbGVkIGluICRkYXRhJ3Mgc2V0dGVyLlxuICAgICAqXG4gICAgICogQHBhcmFtIHtPYmplY3R9IG5ld0RhdGFcbiAgICAgKi9cblxuICAgIFZ1ZS5wcm90b3R5cGUuX3NldERhdGEgPSBmdW5jdGlvbiAobmV3RGF0YSkge1xuICAgICAgbmV3RGF0YSA9IG5ld0RhdGEgfHwge307XG4gICAgICB2YXIgb2xkRGF0YSA9IHRoaXMuX2RhdGE7XG4gICAgICB0aGlzLl9kYXRhID0gbmV3RGF0YTtcbiAgICAgIHZhciBrZXlzLCBrZXksIGk7XG4gICAgICAvLyB1bnByb3h5IGtleXMgbm90IHByZXNlbnQgaW4gbmV3IGRhdGFcbiAgICAgIGtleXMgPSBPYmplY3Qua2V5cyhvbGREYXRhKTtcbiAgICAgIGkgPSBrZXlzLmxlbmd0aDtcbiAgICAgIHdoaWxlIChpLS0pIHtcbiAgICAgICAga2V5ID0ga2V5c1tpXTtcbiAgICAgICAgaWYgKCEoa2V5IGluIG5ld0RhdGEpKSB7XG4gICAgICAgICAgdGhpcy5fdW5wcm94eShrZXkpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICAvLyBwcm94eSBrZXlzIG5vdCBhbHJlYWR5IHByb3hpZWQsXG4gICAgICAvLyBhbmQgdHJpZ2dlciBjaGFuZ2UgZm9yIGNoYW5nZWQgdmFsdWVzXG4gICAgICBrZXlzID0gT2JqZWN0LmtleXMobmV3RGF0YSk7XG4gICAgICBpID0ga2V5cy5sZW5ndGg7XG4gICAgICB3aGlsZSAoaS0tKSB7XG4gICAgICAgIGtleSA9IGtleXNbaV07XG4gICAgICAgIGlmICghaGFzT3duKHRoaXMsIGtleSkpIHtcbiAgICAgICAgICAvLyBuZXcgcHJvcGVydHlcbiAgICAgICAgICB0aGlzLl9wcm94eShrZXkpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBvbGREYXRhLl9fb2JfXy5yZW1vdmVWbSh0aGlzKTtcbiAgICAgIG9ic2VydmUobmV3RGF0YSwgdGhpcyk7XG4gICAgICB0aGlzLl9kaWdlc3QoKTtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogUHJveHkgYSBwcm9wZXJ0eSwgc28gdGhhdFxuICAgICAqIHZtLnByb3AgPT09IHZtLl9kYXRhLnByb3BcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBrZXlcbiAgICAgKi9cblxuICAgIFZ1ZS5wcm90b3R5cGUuX3Byb3h5ID0gZnVuY3Rpb24gKGtleSkge1xuICAgICAgaWYgKCFpc1Jlc2VydmVkKGtleSkpIHtcbiAgICAgICAgLy8gbmVlZCB0byBzdG9yZSByZWYgdG8gc2VsZiBoZXJlXG4gICAgICAgIC8vIGJlY2F1c2UgdGhlc2UgZ2V0dGVyL3NldHRlcnMgbWlnaHRcbiAgICAgICAgLy8gYmUgY2FsbGVkIGJ5IGNoaWxkIHNjb3BlcyB2aWFcbiAgICAgICAgLy8gcHJvdG90eXBlIGluaGVyaXRhbmNlLlxuICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShzZWxmLCBrZXksIHtcbiAgICAgICAgICBjb25maWd1cmFibGU6IHRydWUsXG4gICAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgICAgICBnZXQ6IGZ1bmN0aW9uIHByb3h5R2V0dGVyKCkge1xuICAgICAgICAgICAgcmV0dXJuIHNlbGYuX2RhdGFba2V5XTtcbiAgICAgICAgICB9LFxuICAgICAgICAgIHNldDogZnVuY3Rpb24gcHJveHlTZXR0ZXIodmFsKSB7XG4gICAgICAgICAgICBzZWxmLl9kYXRhW2tleV0gPSB2YWw7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogVW5wcm94eSBhIHByb3BlcnR5LlxuICAgICAqXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IGtleVxuICAgICAqL1xuXG4gICAgVnVlLnByb3RvdHlwZS5fdW5wcm94eSA9IGZ1bmN0aW9uIChrZXkpIHtcbiAgICAgIGlmICghaXNSZXNlcnZlZChrZXkpKSB7XG4gICAgICAgIGRlbGV0ZSB0aGlzW2tleV07XG4gICAgICB9XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIEZvcmNlIHVwZGF0ZSBvbiBldmVyeSB3YXRjaGVyIGluIHNjb3BlLlxuICAgICAqL1xuXG4gICAgVnVlLnByb3RvdHlwZS5fZGlnZXN0ID0gZnVuY3Rpb24gKCkge1xuICAgICAgZm9yICh2YXIgaSA9IDAsIGwgPSB0aGlzLl93YXRjaGVycy5sZW5ndGg7IGkgPCBsOyBpKyspIHtcbiAgICAgICAgdGhpcy5fd2F0Y2hlcnNbaV0udXBkYXRlKHRydWUpOyAvLyBzaGFsbG93IHVwZGF0ZXNcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogU2V0dXAgY29tcHV0ZWQgcHJvcGVydGllcy4gVGhleSBhcmUgZXNzZW50aWFsbHlcbiAgICAgKiBzcGVjaWFsIGdldHRlci9zZXR0ZXJzXG4gICAgICovXG5cbiAgICBmdW5jdGlvbiBub29wKCkge31cbiAgICBWdWUucHJvdG90eXBlLl9pbml0Q29tcHV0ZWQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICB2YXIgY29tcHV0ZWQgPSB0aGlzLiRvcHRpb25zLmNvbXB1dGVkO1xuICAgICAgaWYgKGNvbXB1dGVkKSB7XG4gICAgICAgIGZvciAodmFyIGtleSBpbiBjb21wdXRlZCkge1xuICAgICAgICAgIHZhciB1c2VyRGVmID0gY29tcHV0ZWRba2V5XTtcbiAgICAgICAgICB2YXIgZGVmID0ge1xuICAgICAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICAgICAgICAgIH07XG4gICAgICAgICAgaWYgKHR5cGVvZiB1c2VyRGVmID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICBkZWYuZ2V0ID0gbWFrZUNvbXB1dGVkR2V0dGVyKHVzZXJEZWYsIHRoaXMpO1xuICAgICAgICAgICAgZGVmLnNldCA9IG5vb3A7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGRlZi5nZXQgPSB1c2VyRGVmLmdldCA/IHVzZXJEZWYuY2FjaGUgIT09IGZhbHNlID8gbWFrZUNvbXB1dGVkR2V0dGVyKHVzZXJEZWYuZ2V0LCB0aGlzKSA6IGJpbmQodXNlckRlZi5nZXQsIHRoaXMpIDogbm9vcDtcbiAgICAgICAgICAgIGRlZi5zZXQgPSB1c2VyRGVmLnNldCA/IGJpbmQodXNlckRlZi5zZXQsIHRoaXMpIDogbm9vcDtcbiAgICAgICAgICB9XG4gICAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRoaXMsIGtleSwgZGVmKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH07XG5cbiAgICBmdW5jdGlvbiBtYWtlQ29tcHV0ZWRHZXR0ZXIoZ2V0dGVyLCBvd25lcikge1xuICAgICAgdmFyIHdhdGNoZXIgPSBuZXcgV2F0Y2hlcihvd25lciwgZ2V0dGVyLCBudWxsLCB7XG4gICAgICAgIGxhenk6IHRydWVcbiAgICAgIH0pO1xuICAgICAgcmV0dXJuIGZ1bmN0aW9uIGNvbXB1dGVkR2V0dGVyKCkge1xuICAgICAgICBpZiAod2F0Y2hlci5kaXJ0eSkge1xuICAgICAgICAgIHdhdGNoZXIuZXZhbHVhdGUoKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoRGVwLnRhcmdldCkge1xuICAgICAgICAgIHdhdGNoZXIuZGVwZW5kKCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHdhdGNoZXIudmFsdWU7XG4gICAgICB9O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFNldHVwIGluc3RhbmNlIG1ldGhvZHMuIE1ldGhvZHMgbXVzdCBiZSBib3VuZCB0byB0aGVcbiAgICAgKiBpbnN0YW5jZSBzaW5jZSB0aGV5IG1pZ2h0IGJlIHBhc3NlZCBkb3duIGFzIGEgcHJvcCB0b1xuICAgICAqIGNoaWxkIGNvbXBvbmVudHMuXG4gICAgICovXG5cbiAgICBWdWUucHJvdG90eXBlLl9pbml0TWV0aG9kcyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIHZhciBtZXRob2RzID0gdGhpcy4kb3B0aW9ucy5tZXRob2RzO1xuICAgICAgaWYgKG1ldGhvZHMpIHtcbiAgICAgICAgZm9yICh2YXIga2V5IGluIG1ldGhvZHMpIHtcbiAgICAgICAgICB0aGlzW2tleV0gPSBiaW5kKG1ldGhvZHNba2V5XSwgdGhpcyk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogSW5pdGlhbGl6ZSBtZXRhIGluZm9ybWF0aW9uIGxpa2UgJGluZGV4LCAka2V5ICYgJHZhbHVlLlxuICAgICAqL1xuXG4gICAgVnVlLnByb3RvdHlwZS5faW5pdE1ldGEgPSBmdW5jdGlvbiAoKSB7XG4gICAgICB2YXIgbWV0YXMgPSB0aGlzLiRvcHRpb25zLl9tZXRhO1xuICAgICAgaWYgKG1ldGFzKSB7XG4gICAgICAgIGZvciAodmFyIGtleSBpbiBtZXRhcykge1xuICAgICAgICAgIGRlZmluZVJlYWN0aXZlKHRoaXMsIGtleSwgbWV0YXNba2V5XSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9O1xuICB9XG5cbiAgdmFyIGV2ZW50UkUgPSAvXnYtb246fF5ALztcblxuICBmdW5jdGlvbiBldmVudHNNaXhpbiAoVnVlKSB7XG4gICAgLyoqXG4gICAgICogU2V0dXAgdGhlIGluc3RhbmNlJ3Mgb3B0aW9uIGV2ZW50cyAmIHdhdGNoZXJzLlxuICAgICAqIElmIHRoZSB2YWx1ZSBpcyBhIHN0cmluZywgd2UgcHVsbCBpdCBmcm9tIHRoZVxuICAgICAqIGluc3RhbmNlJ3MgbWV0aG9kcyBieSBuYW1lLlxuICAgICAqL1xuXG4gICAgVnVlLnByb3RvdHlwZS5faW5pdEV2ZW50cyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIHZhciBvcHRpb25zID0gdGhpcy4kb3B0aW9ucztcbiAgICAgIGlmIChvcHRpb25zLl9hc0NvbXBvbmVudCkge1xuICAgICAgICByZWdpc3RlckNvbXBvbmVudEV2ZW50cyh0aGlzLCBvcHRpb25zLmVsKTtcbiAgICAgIH1cbiAgICAgIHJlZ2lzdGVyQ2FsbGJhY2tzKHRoaXMsICckb24nLCBvcHRpb25zLmV2ZW50cyk7XG4gICAgICByZWdpc3RlckNhbGxiYWNrcyh0aGlzLCAnJHdhdGNoJywgb3B0aW9ucy53YXRjaCk7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIFJlZ2lzdGVyIHYtb24gZXZlbnRzIG9uIGEgY2hpbGQgY29tcG9uZW50XG4gICAgICpcbiAgICAgKiBAcGFyYW0ge1Z1ZX0gdm1cbiAgICAgKiBAcGFyYW0ge0VsZW1lbnR9IGVsXG4gICAgICovXG5cbiAgICBmdW5jdGlvbiByZWdpc3RlckNvbXBvbmVudEV2ZW50cyh2bSwgZWwpIHtcbiAgICAgIHZhciBhdHRycyA9IGVsLmF0dHJpYnV0ZXM7XG4gICAgICB2YXIgbmFtZSwgdmFsdWUsIGhhbmRsZXI7XG4gICAgICBmb3IgKHZhciBpID0gMCwgbCA9IGF0dHJzLmxlbmd0aDsgaSA8IGw7IGkrKykge1xuICAgICAgICBuYW1lID0gYXR0cnNbaV0ubmFtZTtcbiAgICAgICAgaWYgKGV2ZW50UkUudGVzdChuYW1lKSkge1xuICAgICAgICAgIG5hbWUgPSBuYW1lLnJlcGxhY2UoZXZlbnRSRSwgJycpO1xuICAgICAgICAgIC8vIGZvcmNlIHRoZSBleHByZXNzaW9uIGludG8gYSBzdGF0ZW1lbnQgc28gdGhhdFxuICAgICAgICAgIC8vIGl0IGFsd2F5cyBkeW5hbWljYWxseSByZXNvbHZlcyB0aGUgbWV0aG9kIHRvIGNhbGwgKCMyNjcwKVxuICAgICAgICAgIC8vIGtpbmRhIHVnbHkgaGFjaywgYnV0IGRvZXMgdGhlIGpvYi5cbiAgICAgICAgICB2YWx1ZSA9IGF0dHJzW2ldLnZhbHVlO1xuICAgICAgICAgIGlmIChpc1NpbXBsZVBhdGgodmFsdWUpKSB7XG4gICAgICAgICAgICB2YWx1ZSArPSAnLmFwcGx5KHRoaXMsICRhcmd1bWVudHMpJztcbiAgICAgICAgICB9XG4gICAgICAgICAgaGFuZGxlciA9ICh2bS5fc2NvcGUgfHwgdm0uX2NvbnRleHQpLiRldmFsKHZhbHVlLCB0cnVlKTtcbiAgICAgICAgICBoYW5kbGVyLl9mcm9tUGFyZW50ID0gdHJ1ZTtcbiAgICAgICAgICB2bS4kb24obmFtZS5yZXBsYWNlKGV2ZW50UkUpLCBoYW5kbGVyKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJlZ2lzdGVyIGNhbGxiYWNrcyBmb3Igb3B0aW9uIGV2ZW50cyBhbmQgd2F0Y2hlcnMuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge1Z1ZX0gdm1cbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gYWN0aW9uXG4gICAgICogQHBhcmFtIHtPYmplY3R9IGhhc2hcbiAgICAgKi9cblxuICAgIGZ1bmN0aW9uIHJlZ2lzdGVyQ2FsbGJhY2tzKHZtLCBhY3Rpb24sIGhhc2gpIHtcbiAgICAgIGlmICghaGFzaCkgcmV0dXJuO1xuICAgICAgdmFyIGhhbmRsZXJzLCBrZXksIGksIGo7XG4gICAgICBmb3IgKGtleSBpbiBoYXNoKSB7XG4gICAgICAgIGhhbmRsZXJzID0gaGFzaFtrZXldO1xuICAgICAgICBpZiAoaXNBcnJheShoYW5kbGVycykpIHtcbiAgICAgICAgICBmb3IgKGkgPSAwLCBqID0gaGFuZGxlcnMubGVuZ3RoOyBpIDwgajsgaSsrKSB7XG4gICAgICAgICAgICByZWdpc3Rlcih2bSwgYWN0aW9uLCBrZXksIGhhbmRsZXJzW2ldKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmVnaXN0ZXIodm0sIGFjdGlvbiwga2V5LCBoYW5kbGVycyk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBIZWxwZXIgdG8gcmVnaXN0ZXIgYW4gZXZlbnQvd2F0Y2ggY2FsbGJhY2suXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge1Z1ZX0gdm1cbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gYWN0aW9uXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IGtleVxuICAgICAqIEBwYXJhbSB7RnVuY3Rpb258U3RyaW5nfE9iamVjdH0gaGFuZGxlclxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBbb3B0aW9uc11cbiAgICAgKi9cblxuICAgIGZ1bmN0aW9uIHJlZ2lzdGVyKHZtLCBhY3Rpb24sIGtleSwgaGFuZGxlciwgb3B0aW9ucykge1xuICAgICAgdmFyIHR5cGUgPSB0eXBlb2YgaGFuZGxlcjtcbiAgICAgIGlmICh0eXBlID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIHZtW2FjdGlvbl0oa2V5LCBoYW5kbGVyLCBvcHRpb25zKTtcbiAgICAgIH0gZWxzZSBpZiAodHlwZSA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgdmFyIG1ldGhvZHMgPSB2bS4kb3B0aW9ucy5tZXRob2RzO1xuICAgICAgICB2YXIgbWV0aG9kID0gbWV0aG9kcyAmJiBtZXRob2RzW2hhbmRsZXJdO1xuICAgICAgICBpZiAobWV0aG9kKSB7XG4gICAgICAgICAgdm1bYWN0aW9uXShrZXksIG1ldGhvZCwgb3B0aW9ucyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgJ2RldmVsb3BtZW50JyAhPT0gJ3Byb2R1Y3Rpb24nICYmIHdhcm4oJ1Vua25vd24gbWV0aG9kOiBcIicgKyBoYW5kbGVyICsgJ1wiIHdoZW4gJyArICdyZWdpc3RlcmluZyBjYWxsYmFjayBmb3IgJyArIGFjdGlvbiArICc6IFwiJyArIGtleSArICdcIi4nLCB2bSk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSBpZiAoaGFuZGxlciAmJiB0eXBlID09PSAnb2JqZWN0Jykge1xuICAgICAgICByZWdpc3Rlcih2bSwgYWN0aW9uLCBrZXksIGhhbmRsZXIuaGFuZGxlciwgaGFuZGxlcik7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogU2V0dXAgcmVjdXJzaXZlIGF0dGFjaGVkL2RldGFjaGVkIGNhbGxzXG4gICAgICovXG5cbiAgICBWdWUucHJvdG90eXBlLl9pbml0RE9NSG9va3MgPSBmdW5jdGlvbiAoKSB7XG4gICAgICB0aGlzLiRvbignaG9vazphdHRhY2hlZCcsIG9uQXR0YWNoZWQpO1xuICAgICAgdGhpcy4kb24oJ2hvb2s6ZGV0YWNoZWQnLCBvbkRldGFjaGVkKTtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogQ2FsbGJhY2sgdG8gcmVjdXJzaXZlbHkgY2FsbCBhdHRhY2hlZCBob29rIG9uIGNoaWxkcmVuXG4gICAgICovXG5cbiAgICBmdW5jdGlvbiBvbkF0dGFjaGVkKCkge1xuICAgICAgaWYgKCF0aGlzLl9pc0F0dGFjaGVkKSB7XG4gICAgICAgIHRoaXMuX2lzQXR0YWNoZWQgPSB0cnVlO1xuICAgICAgICB0aGlzLiRjaGlsZHJlbi5mb3JFYWNoKGNhbGxBdHRhY2gpO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEl0ZXJhdG9yIHRvIGNhbGwgYXR0YWNoZWQgaG9va1xuICAgICAqXG4gICAgICogQHBhcmFtIHtWdWV9IGNoaWxkXG4gICAgICovXG5cbiAgICBmdW5jdGlvbiBjYWxsQXR0YWNoKGNoaWxkKSB7XG4gICAgICBpZiAoIWNoaWxkLl9pc0F0dGFjaGVkICYmIGluRG9jKGNoaWxkLiRlbCkpIHtcbiAgICAgICAgY2hpbGQuX2NhbGxIb29rKCdhdHRhY2hlZCcpO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENhbGxiYWNrIHRvIHJlY3Vyc2l2ZWx5IGNhbGwgZGV0YWNoZWQgaG9vayBvbiBjaGlsZHJlblxuICAgICAqL1xuXG4gICAgZnVuY3Rpb24gb25EZXRhY2hlZCgpIHtcbiAgICAgIGlmICh0aGlzLl9pc0F0dGFjaGVkKSB7XG4gICAgICAgIHRoaXMuX2lzQXR0YWNoZWQgPSBmYWxzZTtcbiAgICAgICAgdGhpcy4kY2hpbGRyZW4uZm9yRWFjaChjYWxsRGV0YWNoKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBJdGVyYXRvciB0byBjYWxsIGRldGFjaGVkIGhvb2tcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7VnVlfSBjaGlsZFxuICAgICAqL1xuXG4gICAgZnVuY3Rpb24gY2FsbERldGFjaChjaGlsZCkge1xuICAgICAgaWYgKGNoaWxkLl9pc0F0dGFjaGVkICYmICFpbkRvYyhjaGlsZC4kZWwpKSB7XG4gICAgICAgIGNoaWxkLl9jYWxsSG9vaygnZGV0YWNoZWQnKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBUcmlnZ2VyIGFsbCBoYW5kbGVycyBmb3IgYSBob29rXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gaG9va1xuICAgICAqL1xuXG4gICAgVnVlLnByb3RvdHlwZS5fY2FsbEhvb2sgPSBmdW5jdGlvbiAoaG9vaykge1xuICAgICAgdGhpcy4kZW1pdCgncHJlLWhvb2s6JyArIGhvb2spO1xuICAgICAgdmFyIGhhbmRsZXJzID0gdGhpcy4kb3B0aW9uc1tob29rXTtcbiAgICAgIGlmIChoYW5kbGVycykge1xuICAgICAgICBmb3IgKHZhciBpID0gMCwgaiA9IGhhbmRsZXJzLmxlbmd0aDsgaSA8IGo7IGkrKykge1xuICAgICAgICAgIGhhbmRsZXJzW2ldLmNhbGwodGhpcyk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHRoaXMuJGVtaXQoJ2hvb2s6JyArIGhvb2spO1xuICAgIH07XG4gIH1cblxuICBmdW5jdGlvbiBub29wKCkge31cblxuICAvKipcbiAgICogQSBkaXJlY3RpdmUgbGlua3MgYSBET00gZWxlbWVudCB3aXRoIGEgcGllY2Ugb2YgZGF0YSxcbiAgICogd2hpY2ggaXMgdGhlIHJlc3VsdCBvZiBldmFsdWF0aW5nIGFuIGV4cHJlc3Npb24uXG4gICAqIEl0IHJlZ2lzdGVycyBhIHdhdGNoZXIgd2l0aCB0aGUgZXhwcmVzc2lvbiBhbmQgY2FsbHNcbiAgICogdGhlIERPTSB1cGRhdGUgZnVuY3Rpb24gd2hlbiBhIGNoYW5nZSBpcyB0cmlnZ2VyZWQuXG4gICAqXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBkZXNjcmlwdG9yXG4gICAqICAgICAgICAgICAgICAgICAtIHtTdHJpbmd9IG5hbWVcbiAgICogICAgICAgICAgICAgICAgIC0ge09iamVjdH0gZGVmXG4gICAqICAgICAgICAgICAgICAgICAtIHtTdHJpbmd9IGV4cHJlc3Npb25cbiAgICogICAgICAgICAgICAgICAgIC0ge0FycmF5PE9iamVjdD59IFtmaWx0ZXJzXVxuICAgKiAgICAgICAgICAgICAgICAgLSB7T2JqZWN0fSBbbW9kaWZpZXJzXVxuICAgKiAgICAgICAgICAgICAgICAgLSB7Qm9vbGVhbn0gbGl0ZXJhbFxuICAgKiAgICAgICAgICAgICAgICAgLSB7U3RyaW5nfSBhdHRyXG4gICAqICAgICAgICAgICAgICAgICAtIHtTdHJpbmd9IGFyZ1xuICAgKiAgICAgICAgICAgICAgICAgLSB7U3RyaW5nfSByYXdcbiAgICogICAgICAgICAgICAgICAgIC0ge1N0cmluZ30gW3JlZl1cbiAgICogICAgICAgICAgICAgICAgIC0ge0FycmF5PE9iamVjdD59IFtpbnRlcnBdXG4gICAqICAgICAgICAgICAgICAgICAtIHtCb29sZWFufSBbaGFzT25lVGltZV1cbiAgICogQHBhcmFtIHtWdWV9IHZtXG4gICAqIEBwYXJhbSB7Tm9kZX0gZWxcbiAgICogQHBhcmFtIHtWdWV9IFtob3N0XSAtIHRyYW5zY2x1c2lvbiBob3N0IGNvbXBvbmVudFxuICAgKiBAcGFyYW0ge09iamVjdH0gW3Njb3BlXSAtIHYtZm9yIHNjb3BlXG4gICAqIEBwYXJhbSB7RnJhZ21lbnR9IFtmcmFnXSAtIG93bmVyIGZyYWdtZW50XG4gICAqIEBjb25zdHJ1Y3RvclxuICAgKi9cbiAgZnVuY3Rpb24gRGlyZWN0aXZlKGRlc2NyaXB0b3IsIHZtLCBlbCwgaG9zdCwgc2NvcGUsIGZyYWcpIHtcbiAgICB0aGlzLnZtID0gdm07XG4gICAgdGhpcy5lbCA9IGVsO1xuICAgIC8vIGNvcHkgZGVzY3JpcHRvciBwcm9wZXJ0aWVzXG4gICAgdGhpcy5kZXNjcmlwdG9yID0gZGVzY3JpcHRvcjtcbiAgICB0aGlzLm5hbWUgPSBkZXNjcmlwdG9yLm5hbWU7XG4gICAgdGhpcy5leHByZXNzaW9uID0gZGVzY3JpcHRvci5leHByZXNzaW9uO1xuICAgIHRoaXMuYXJnID0gZGVzY3JpcHRvci5hcmc7XG4gICAgdGhpcy5tb2RpZmllcnMgPSBkZXNjcmlwdG9yLm1vZGlmaWVycztcbiAgICB0aGlzLmZpbHRlcnMgPSBkZXNjcmlwdG9yLmZpbHRlcnM7XG4gICAgdGhpcy5saXRlcmFsID0gdGhpcy5tb2RpZmllcnMgJiYgdGhpcy5tb2RpZmllcnMubGl0ZXJhbDtcbiAgICAvLyBwcml2YXRlXG4gICAgdGhpcy5fbG9ja2VkID0gZmFsc2U7XG4gICAgdGhpcy5fYm91bmQgPSBmYWxzZTtcbiAgICB0aGlzLl9saXN0ZW5lcnMgPSBudWxsO1xuICAgIC8vIGxpbmsgY29udGV4dFxuICAgIHRoaXMuX2hvc3QgPSBob3N0O1xuICAgIHRoaXMuX3Njb3BlID0gc2NvcGU7XG4gICAgdGhpcy5fZnJhZyA9IGZyYWc7XG4gICAgLy8gc3RvcmUgZGlyZWN0aXZlcyBvbiBub2RlIGluIGRldiBtb2RlXG4gICAgaWYgKCdkZXZlbG9wbWVudCcgIT09ICdwcm9kdWN0aW9uJyAmJiB0aGlzLmVsKSB7XG4gICAgICB0aGlzLmVsLl92dWVfZGlyZWN0aXZlcyA9IHRoaXMuZWwuX3Z1ZV9kaXJlY3RpdmVzIHx8IFtdO1xuICAgICAgdGhpcy5lbC5fdnVlX2RpcmVjdGl2ZXMucHVzaCh0aGlzKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogSW5pdGlhbGl6ZSB0aGUgZGlyZWN0aXZlLCBtaXhpbiBkZWZpbml0aW9uIHByb3BlcnRpZXMsXG4gICAqIHNldHVwIHRoZSB3YXRjaGVyLCBjYWxsIGRlZmluaXRpb24gYmluZCgpIGFuZCB1cGRhdGUoKVxuICAgKiBpZiBwcmVzZW50LlxuICAgKi9cblxuICBEaXJlY3RpdmUucHJvdG90eXBlLl9iaW5kID0gZnVuY3Rpb24gKCkge1xuICAgIHZhciBuYW1lID0gdGhpcy5uYW1lO1xuICAgIHZhciBkZXNjcmlwdG9yID0gdGhpcy5kZXNjcmlwdG9yO1xuXG4gICAgLy8gcmVtb3ZlIGF0dHJpYnV0ZVxuICAgIGlmICgobmFtZSAhPT0gJ2Nsb2FrJyB8fCB0aGlzLnZtLl9pc0NvbXBpbGVkKSAmJiB0aGlzLmVsICYmIHRoaXMuZWwucmVtb3ZlQXR0cmlidXRlKSB7XG4gICAgICB2YXIgYXR0ciA9IGRlc2NyaXB0b3IuYXR0ciB8fCAndi0nICsgbmFtZTtcbiAgICAgIHRoaXMuZWwucmVtb3ZlQXR0cmlidXRlKGF0dHIpO1xuICAgIH1cblxuICAgIC8vIGNvcHkgZGVmIHByb3BlcnRpZXNcbiAgICB2YXIgZGVmID0gZGVzY3JpcHRvci5kZWY7XG4gICAgaWYgKHR5cGVvZiBkZWYgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIHRoaXMudXBkYXRlID0gZGVmO1xuICAgIH0gZWxzZSB7XG4gICAgICBleHRlbmQodGhpcywgZGVmKTtcbiAgICB9XG5cbiAgICAvLyBzZXR1cCBkaXJlY3RpdmUgcGFyYW1zXG4gICAgdGhpcy5fc2V0dXBQYXJhbXMoKTtcblxuICAgIC8vIGluaXRpYWwgYmluZFxuICAgIGlmICh0aGlzLmJpbmQpIHtcbiAgICAgIHRoaXMuYmluZCgpO1xuICAgIH1cbiAgICB0aGlzLl9ib3VuZCA9IHRydWU7XG5cbiAgICBpZiAodGhpcy5saXRlcmFsKSB7XG4gICAgICB0aGlzLnVwZGF0ZSAmJiB0aGlzLnVwZGF0ZShkZXNjcmlwdG9yLnJhdyk7XG4gICAgfSBlbHNlIGlmICgodGhpcy5leHByZXNzaW9uIHx8IHRoaXMubW9kaWZpZXJzKSAmJiAodGhpcy51cGRhdGUgfHwgdGhpcy50d29XYXkpICYmICF0aGlzLl9jaGVja1N0YXRlbWVudCgpKSB7XG4gICAgICAvLyB3cmFwcGVkIHVwZGF0ZXIgZm9yIGNvbnRleHRcbiAgICAgIHZhciBkaXIgPSB0aGlzO1xuICAgICAgaWYgKHRoaXMudXBkYXRlKSB7XG4gICAgICAgIHRoaXMuX3VwZGF0ZSA9IGZ1bmN0aW9uICh2YWwsIG9sZFZhbCkge1xuICAgICAgICAgIGlmICghZGlyLl9sb2NrZWQpIHtcbiAgICAgICAgICAgIGRpci51cGRhdGUodmFsLCBvbGRWYWwpO1xuICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuX3VwZGF0ZSA9IG5vb3A7XG4gICAgICB9XG4gICAgICB2YXIgcHJlUHJvY2VzcyA9IHRoaXMuX3ByZVByb2Nlc3MgPyBiaW5kKHRoaXMuX3ByZVByb2Nlc3MsIHRoaXMpIDogbnVsbDtcbiAgICAgIHZhciBwb3N0UHJvY2VzcyA9IHRoaXMuX3Bvc3RQcm9jZXNzID8gYmluZCh0aGlzLl9wb3N0UHJvY2VzcywgdGhpcykgOiBudWxsO1xuICAgICAgdmFyIHdhdGNoZXIgPSB0aGlzLl93YXRjaGVyID0gbmV3IFdhdGNoZXIodGhpcy52bSwgdGhpcy5leHByZXNzaW9uLCB0aGlzLl91cGRhdGUsIC8vIGNhbGxiYWNrXG4gICAgICB7XG4gICAgICAgIGZpbHRlcnM6IHRoaXMuZmlsdGVycyxcbiAgICAgICAgdHdvV2F5OiB0aGlzLnR3b1dheSxcbiAgICAgICAgZGVlcDogdGhpcy5kZWVwLFxuICAgICAgICBwcmVQcm9jZXNzOiBwcmVQcm9jZXNzLFxuICAgICAgICBwb3N0UHJvY2VzczogcG9zdFByb2Nlc3MsXG4gICAgICAgIHNjb3BlOiB0aGlzLl9zY29wZVxuICAgICAgfSk7XG4gICAgICAvLyB2LW1vZGVsIHdpdGggaW5pdGFsIGlubGluZSB2YWx1ZSBuZWVkIHRvIHN5bmMgYmFjayB0b1xuICAgICAgLy8gbW9kZWwgaW5zdGVhZCBvZiB1cGRhdGUgdG8gRE9NIG9uIGluaXQuIFRoZXkgd291bGRcbiAgICAgIC8vIHNldCB0aGUgYWZ0ZXJCaW5kIGhvb2sgdG8gaW5kaWNhdGUgdGhhdC5cbiAgICAgIGlmICh0aGlzLmFmdGVyQmluZCkge1xuICAgICAgICB0aGlzLmFmdGVyQmluZCgpO1xuICAgICAgfSBlbHNlIGlmICh0aGlzLnVwZGF0ZSkge1xuICAgICAgICB0aGlzLnVwZGF0ZSh3YXRjaGVyLnZhbHVlKTtcbiAgICAgIH1cbiAgICB9XG4gIH07XG5cbiAgLyoqXG4gICAqIFNldHVwIGFsbCBwYXJhbSBhdHRyaWJ1dGVzLCBlLmcuIHRyYWNrLWJ5LFxuICAgKiB0cmFuc2l0aW9uLW1vZGUsIGV0Yy4uLlxuICAgKi9cblxuICBEaXJlY3RpdmUucHJvdG90eXBlLl9zZXR1cFBhcmFtcyA9IGZ1bmN0aW9uICgpIHtcbiAgICBpZiAoIXRoaXMucGFyYW1zKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHZhciBwYXJhbXMgPSB0aGlzLnBhcmFtcztcbiAgICAvLyBzd2FwIHRoZSBwYXJhbXMgYXJyYXkgd2l0aCBhIGZyZXNoIG9iamVjdC5cbiAgICB0aGlzLnBhcmFtcyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gICAgdmFyIGkgPSBwYXJhbXMubGVuZ3RoO1xuICAgIHZhciBrZXksIHZhbCwgbWFwcGVkS2V5O1xuICAgIHdoaWxlIChpLS0pIHtcbiAgICAgIGtleSA9IGh5cGhlbmF0ZShwYXJhbXNbaV0pO1xuICAgICAgbWFwcGVkS2V5ID0gY2FtZWxpemUoa2V5KTtcbiAgICAgIHZhbCA9IGdldEJpbmRBdHRyKHRoaXMuZWwsIGtleSk7XG4gICAgICBpZiAodmFsICE9IG51bGwpIHtcbiAgICAgICAgLy8gZHluYW1pY1xuICAgICAgICB0aGlzLl9zZXR1cFBhcmFtV2F0Y2hlcihtYXBwZWRLZXksIHZhbCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvLyBzdGF0aWNcbiAgICAgICAgdmFsID0gZ2V0QXR0cih0aGlzLmVsLCBrZXkpO1xuICAgICAgICBpZiAodmFsICE9IG51bGwpIHtcbiAgICAgICAgICB0aGlzLnBhcmFtc1ttYXBwZWRLZXldID0gdmFsID09PSAnJyA/IHRydWUgOiB2YWw7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH07XG5cbiAgLyoqXG4gICAqIFNldHVwIGEgd2F0Y2hlciBmb3IgYSBkeW5hbWljIHBhcmFtLlxuICAgKlxuICAgKiBAcGFyYW0ge1N0cmluZ30ga2V5XG4gICAqIEBwYXJhbSB7U3RyaW5nfSBleHByZXNzaW9uXG4gICAqL1xuXG4gIERpcmVjdGl2ZS5wcm90b3R5cGUuX3NldHVwUGFyYW1XYXRjaGVyID0gZnVuY3Rpb24gKGtleSwgZXhwcmVzc2lvbikge1xuICAgIHZhciBzZWxmID0gdGhpcztcbiAgICB2YXIgY2FsbGVkID0gZmFsc2U7XG4gICAgdmFyIHVud2F0Y2ggPSAodGhpcy5fc2NvcGUgfHwgdGhpcy52bSkuJHdhdGNoKGV4cHJlc3Npb24sIGZ1bmN0aW9uICh2YWwsIG9sZFZhbCkge1xuICAgICAgc2VsZi5wYXJhbXNba2V5XSA9IHZhbDtcbiAgICAgIC8vIHNpbmNlIHdlIGFyZSBpbiBpbW1lZGlhdGUgbW9kZSxcbiAgICAgIC8vIG9ubHkgY2FsbCB0aGUgcGFyYW0gY2hhbmdlIGNhbGxiYWNrcyBpZiB0aGlzIGlzIG5vdCB0aGUgZmlyc3QgdXBkYXRlLlxuICAgICAgaWYgKGNhbGxlZCkge1xuICAgICAgICB2YXIgY2IgPSBzZWxmLnBhcmFtV2F0Y2hlcnMgJiYgc2VsZi5wYXJhbVdhdGNoZXJzW2tleV07XG4gICAgICAgIGlmIChjYikge1xuICAgICAgICAgIGNiLmNhbGwoc2VsZiwgdmFsLCBvbGRWYWwpO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjYWxsZWQgPSB0cnVlO1xuICAgICAgfVxuICAgIH0sIHtcbiAgICAgIGltbWVkaWF0ZTogdHJ1ZSxcbiAgICAgIHVzZXI6IGZhbHNlXG4gICAgfSk7KHRoaXMuX3BhcmFtVW53YXRjaEZucyB8fCAodGhpcy5fcGFyYW1VbndhdGNoRm5zID0gW10pKS5wdXNoKHVud2F0Y2gpO1xuICB9O1xuXG4gIC8qKlxuICAgKiBDaGVjayBpZiB0aGUgZGlyZWN0aXZlIGlzIGEgZnVuY3Rpb24gY2FsbGVyXG4gICAqIGFuZCBpZiB0aGUgZXhwcmVzc2lvbiBpcyBhIGNhbGxhYmxlIG9uZS4gSWYgYm90aCB0cnVlLFxuICAgKiB3ZSB3cmFwIHVwIHRoZSBleHByZXNzaW9uIGFuZCB1c2UgaXQgYXMgdGhlIGV2ZW50XG4gICAqIGhhbmRsZXIuXG4gICAqXG4gICAqIGUuZy4gb24tY2xpY2s9XCJhKytcIlxuICAgKlxuICAgKiBAcmV0dXJuIHtCb29sZWFufVxuICAgKi9cblxuICBEaXJlY3RpdmUucHJvdG90eXBlLl9jaGVja1N0YXRlbWVudCA9IGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgZXhwcmVzc2lvbiA9IHRoaXMuZXhwcmVzc2lvbjtcbiAgICBpZiAoZXhwcmVzc2lvbiAmJiB0aGlzLmFjY2VwdFN0YXRlbWVudCAmJiAhaXNTaW1wbGVQYXRoKGV4cHJlc3Npb24pKSB7XG4gICAgICB2YXIgZm4gPSBwYXJzZUV4cHJlc3Npb24oZXhwcmVzc2lvbikuZ2V0O1xuICAgICAgdmFyIHNjb3BlID0gdGhpcy5fc2NvcGUgfHwgdGhpcy52bTtcbiAgICAgIHZhciBoYW5kbGVyID0gZnVuY3Rpb24gaGFuZGxlcihlKSB7XG4gICAgICAgIHNjb3BlLiRldmVudCA9IGU7XG4gICAgICAgIGZuLmNhbGwoc2NvcGUsIHNjb3BlKTtcbiAgICAgICAgc2NvcGUuJGV2ZW50ID0gbnVsbDtcbiAgICAgIH07XG4gICAgICBpZiAodGhpcy5maWx0ZXJzKSB7XG4gICAgICAgIGhhbmRsZXIgPSBzY29wZS5fYXBwbHlGaWx0ZXJzKGhhbmRsZXIsIG51bGwsIHRoaXMuZmlsdGVycyk7XG4gICAgICB9XG4gICAgICB0aGlzLnVwZGF0ZShoYW5kbGVyKTtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgfTtcblxuICAvKipcbiAgICogU2V0IHRoZSBjb3JyZXNwb25kaW5nIHZhbHVlIHdpdGggdGhlIHNldHRlci5cbiAgICogVGhpcyBzaG91bGQgb25seSBiZSB1c2VkIGluIHR3by13YXkgZGlyZWN0aXZlc1xuICAgKiBlLmcuIHYtbW9kZWwuXG4gICAqXG4gICAqIEBwYXJhbSB7Kn0gdmFsdWVcbiAgICogQHB1YmxpY1xuICAgKi9cblxuICBEaXJlY3RpdmUucHJvdG90eXBlLnNldCA9IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBlbHNlICovXG4gICAgaWYgKHRoaXMudHdvV2F5KSB7XG4gICAgICB0aGlzLl93aXRoTG9jayhmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoaXMuX3dhdGNoZXIuc2V0KHZhbHVlKTtcbiAgICAgIH0pO1xuICAgIH0gZWxzZSBpZiAoJ2RldmVsb3BtZW50JyAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgICB3YXJuKCdEaXJlY3RpdmUuc2V0KCkgY2FuIG9ubHkgYmUgdXNlZCBpbnNpZGUgdHdvV2F5JyArICdkaXJlY3RpdmVzLicpO1xuICAgIH1cbiAgfTtcblxuICAvKipcbiAgICogRXhlY3V0ZSBhIGZ1bmN0aW9uIHdoaWxlIHByZXZlbnRpbmcgdGhhdCBmdW5jdGlvbiBmcm9tXG4gICAqIHRyaWdnZXJpbmcgdXBkYXRlcyBvbiB0aGlzIGRpcmVjdGl2ZSBpbnN0YW5jZS5cbiAgICpcbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gZm5cbiAgICovXG5cbiAgRGlyZWN0aXZlLnByb3RvdHlwZS5fd2l0aExvY2sgPSBmdW5jdGlvbiAoZm4pIHtcbiAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgc2VsZi5fbG9ja2VkID0gdHJ1ZTtcbiAgICBmbi5jYWxsKHNlbGYpO1xuICAgIG5leHRUaWNrKGZ1bmN0aW9uICgpIHtcbiAgICAgIHNlbGYuX2xvY2tlZCA9IGZhbHNlO1xuICAgIH0pO1xuICB9O1xuXG4gIC8qKlxuICAgKiBDb252ZW5pZW5jZSBtZXRob2QgdGhhdCBhdHRhY2hlcyBhIERPTSBldmVudCBsaXN0ZW5lclxuICAgKiB0byB0aGUgZGlyZWN0aXZlIGVsZW1lbnQgYW5kIGF1dG9tZXRpY2FsbHkgdGVhcnMgaXQgZG93blxuICAgKiBkdXJpbmcgdW5iaW5kLlxuICAgKlxuICAgKiBAcGFyYW0ge1N0cmluZ30gZXZlbnRcbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gaGFuZGxlclxuICAgKiBAcGFyYW0ge0Jvb2xlYW59IFt1c2VDYXB0dXJlXVxuICAgKi9cblxuICBEaXJlY3RpdmUucHJvdG90eXBlLm9uID0gZnVuY3Rpb24gKGV2ZW50LCBoYW5kbGVyLCB1c2VDYXB0dXJlKSB7XG4gICAgb24odGhpcy5lbCwgZXZlbnQsIGhhbmRsZXIsIHVzZUNhcHR1cmUpOyh0aGlzLl9saXN0ZW5lcnMgfHwgKHRoaXMuX2xpc3RlbmVycyA9IFtdKSkucHVzaChbZXZlbnQsIGhhbmRsZXJdKTtcbiAgfTtcblxuICAvKipcbiAgICogVGVhcmRvd24gdGhlIHdhdGNoZXIgYW5kIGNhbGwgdW5iaW5kLlxuICAgKi9cblxuICBEaXJlY3RpdmUucHJvdG90eXBlLl90ZWFyZG93biA9IGZ1bmN0aW9uICgpIHtcbiAgICBpZiAodGhpcy5fYm91bmQpIHtcbiAgICAgIHRoaXMuX2JvdW5kID0gZmFsc2U7XG4gICAgICBpZiAodGhpcy51bmJpbmQpIHtcbiAgICAgICAgdGhpcy51bmJpbmQoKTtcbiAgICAgIH1cbiAgICAgIGlmICh0aGlzLl93YXRjaGVyKSB7XG4gICAgICAgIHRoaXMuX3dhdGNoZXIudGVhcmRvd24oKTtcbiAgICAgIH1cbiAgICAgIHZhciBsaXN0ZW5lcnMgPSB0aGlzLl9saXN0ZW5lcnM7XG4gICAgICB2YXIgaTtcbiAgICAgIGlmIChsaXN0ZW5lcnMpIHtcbiAgICAgICAgaSA9IGxpc3RlbmVycy5sZW5ndGg7XG4gICAgICAgIHdoaWxlIChpLS0pIHtcbiAgICAgICAgICBvZmYodGhpcy5lbCwgbGlzdGVuZXJzW2ldWzBdLCBsaXN0ZW5lcnNbaV1bMV0pO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICB2YXIgdW53YXRjaEZucyA9IHRoaXMuX3BhcmFtVW53YXRjaEZucztcbiAgICAgIGlmICh1bndhdGNoRm5zKSB7XG4gICAgICAgIGkgPSB1bndhdGNoRm5zLmxlbmd0aDtcbiAgICAgICAgd2hpbGUgKGktLSkge1xuICAgICAgICAgIHVud2F0Y2hGbnNbaV0oKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKCdkZXZlbG9wbWVudCcgIT09ICdwcm9kdWN0aW9uJyAmJiB0aGlzLmVsKSB7XG4gICAgICAgIHRoaXMuZWwuX3Z1ZV9kaXJlY3RpdmVzLiRyZW1vdmUodGhpcyk7XG4gICAgICB9XG4gICAgICB0aGlzLnZtID0gdGhpcy5lbCA9IHRoaXMuX3dhdGNoZXIgPSB0aGlzLl9saXN0ZW5lcnMgPSBudWxsO1xuICAgIH1cbiAgfTtcblxuICBmdW5jdGlvbiBsaWZlY3ljbGVNaXhpbiAoVnVlKSB7XG4gICAgLyoqXG4gICAgICogVXBkYXRlIHYtcmVmIGZvciBjb21wb25lbnQuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge0Jvb2xlYW59IHJlbW92ZVxuICAgICAqL1xuXG4gICAgVnVlLnByb3RvdHlwZS5fdXBkYXRlUmVmID0gZnVuY3Rpb24gKHJlbW92ZSkge1xuICAgICAgdmFyIHJlZiA9IHRoaXMuJG9wdGlvbnMuX3JlZjtcbiAgICAgIGlmIChyZWYpIHtcbiAgICAgICAgdmFyIHJlZnMgPSAodGhpcy5fc2NvcGUgfHwgdGhpcy5fY29udGV4dCkuJHJlZnM7XG4gICAgICAgIGlmIChyZW1vdmUpIHtcbiAgICAgICAgICBpZiAocmVmc1tyZWZdID09PSB0aGlzKSB7XG4gICAgICAgICAgICByZWZzW3JlZl0gPSBudWxsO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZWZzW3JlZl0gPSB0aGlzO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIFRyYW5zY2x1ZGUsIGNvbXBpbGUgYW5kIGxpbmsgZWxlbWVudC5cbiAgICAgKlxuICAgICAqIElmIGEgcHJlLWNvbXBpbGVkIGxpbmtlciBpcyBhdmFpbGFibGUsIHRoYXQgbWVhbnMgdGhlXG4gICAgICogcGFzc2VkIGluIGVsZW1lbnQgd2lsbCBiZSBwcmUtdHJhbnNjbHVkZWQgYW5kIGNvbXBpbGVkXG4gICAgICogYXMgd2VsbCAtIGFsbCB3ZSBuZWVkIHRvIGRvIGlzIHRvIGNhbGwgdGhlIGxpbmtlci5cbiAgICAgKlxuICAgICAqIE90aGVyd2lzZSB3ZSBuZWVkIHRvIGNhbGwgdHJhbnNjbHVkZS9jb21waWxlL2xpbmsgaGVyZS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7RWxlbWVudH0gZWxcbiAgICAgKi9cblxuICAgIFZ1ZS5wcm90b3R5cGUuX2NvbXBpbGUgPSBmdW5jdGlvbiAoZWwpIHtcbiAgICAgIHZhciBvcHRpb25zID0gdGhpcy4kb3B0aW9ucztcblxuICAgICAgLy8gdHJhbnNjbHVkZSBhbmQgaW5pdCBlbGVtZW50XG4gICAgICAvLyB0cmFuc2NsdWRlIGNhbiBwb3RlbnRpYWxseSByZXBsYWNlIG9yaWdpbmFsXG4gICAgICAvLyBzbyB3ZSBuZWVkIHRvIGtlZXAgcmVmZXJlbmNlOyB0aGlzIHN0ZXAgYWxzbyBpbmplY3RzXG4gICAgICAvLyB0aGUgdGVtcGxhdGUgYW5kIGNhY2hlcyB0aGUgb3JpZ2luYWwgYXR0cmlidXRlc1xuICAgICAgLy8gb24gdGhlIGNvbnRhaW5lciBub2RlIGFuZCByZXBsYWNlciBub2RlLlxuICAgICAgdmFyIG9yaWdpbmFsID0gZWw7XG4gICAgICBlbCA9IHRyYW5zY2x1ZGUoZWwsIG9wdGlvbnMpO1xuICAgICAgdGhpcy5faW5pdEVsZW1lbnQoZWwpO1xuXG4gICAgICAvLyBoYW5kbGUgdi1wcmUgb24gcm9vdCBub2RlICgjMjAyNilcbiAgICAgIGlmIChlbC5ub2RlVHlwZSA9PT0gMSAmJiBnZXRBdHRyKGVsLCAndi1wcmUnKSAhPT0gbnVsbCkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIC8vIHJvb3QgaXMgYWx3YXlzIGNvbXBpbGVkIHBlci1pbnN0YW5jZSwgYmVjYXVzZVxuICAgICAgLy8gY29udGFpbmVyIGF0dHJzIGFuZCBwcm9wcyBjYW4gYmUgZGlmZmVyZW50IGV2ZXJ5IHRpbWUuXG4gICAgICB2YXIgY29udGV4dE9wdGlvbnMgPSB0aGlzLl9jb250ZXh0ICYmIHRoaXMuX2NvbnRleHQuJG9wdGlvbnM7XG4gICAgICB2YXIgcm9vdExpbmtlciA9IGNvbXBpbGVSb290KGVsLCBvcHRpb25zLCBjb250ZXh0T3B0aW9ucyk7XG5cbiAgICAgIC8vIHJlc29sdmUgc2xvdCBkaXN0cmlidXRpb25cbiAgICAgIHJlc29sdmVTbG90cyh0aGlzLCBvcHRpb25zLl9jb250ZW50KTtcblxuICAgICAgLy8gY29tcGlsZSBhbmQgbGluayB0aGUgcmVzdFxuICAgICAgdmFyIGNvbnRlbnRMaW5rRm47XG4gICAgICB2YXIgY3RvciA9IHRoaXMuY29uc3RydWN0b3I7XG4gICAgICAvLyBjb21wb25lbnQgY29tcGlsYXRpb24gY2FuIGJlIGNhY2hlZFxuICAgICAgLy8gYXMgbG9uZyBhcyBpdCdzIG5vdCB1c2luZyBpbmxpbmUtdGVtcGxhdGVcbiAgICAgIGlmIChvcHRpb25zLl9saW5rZXJDYWNoYWJsZSkge1xuICAgICAgICBjb250ZW50TGlua0ZuID0gY3Rvci5saW5rZXI7XG4gICAgICAgIGlmICghY29udGVudExpbmtGbikge1xuICAgICAgICAgIGNvbnRlbnRMaW5rRm4gPSBjdG9yLmxpbmtlciA9IGNvbXBpbGUoZWwsIG9wdGlvbnMpO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIC8vIGxpbmsgcGhhc2VcbiAgICAgIC8vIG1ha2Ugc3VyZSB0byBsaW5rIHJvb3Qgd2l0aCBwcm9wIHNjb3BlIVxuICAgICAgdmFyIHJvb3RVbmxpbmtGbiA9IHJvb3RMaW5rZXIodGhpcywgZWwsIHRoaXMuX3Njb3BlKTtcbiAgICAgIHZhciBjb250ZW50VW5saW5rRm4gPSBjb250ZW50TGlua0ZuID8gY29udGVudExpbmtGbih0aGlzLCBlbCkgOiBjb21waWxlKGVsLCBvcHRpb25zKSh0aGlzLCBlbCk7XG5cbiAgICAgIC8vIHJlZ2lzdGVyIGNvbXBvc2l0ZSB1bmxpbmsgZnVuY3Rpb25cbiAgICAgIC8vIHRvIGJlIGNhbGxlZCBkdXJpbmcgaW5zdGFuY2UgZGVzdHJ1Y3Rpb25cbiAgICAgIHRoaXMuX3VubGlua0ZuID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByb290VW5saW5rRm4oKTtcbiAgICAgICAgLy8gcGFzc2luZyBkZXN0cm95aW5nOiB0cnVlIHRvIGF2b2lkIHNlYXJjaGluZyBhbmRcbiAgICAgICAgLy8gc3BsaWNpbmcgdGhlIGRpcmVjdGl2ZXNcbiAgICAgICAgY29udGVudFVubGlua0ZuKHRydWUpO1xuICAgICAgfTtcblxuICAgICAgLy8gZmluYWxseSByZXBsYWNlIG9yaWdpbmFsXG4gICAgICBpZiAob3B0aW9ucy5yZXBsYWNlKSB7XG4gICAgICAgIHJlcGxhY2Uob3JpZ2luYWwsIGVsKTtcbiAgICAgIH1cblxuICAgICAgdGhpcy5faXNDb21waWxlZCA9IHRydWU7XG4gICAgICB0aGlzLl9jYWxsSG9vaygnY29tcGlsZWQnKTtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogSW5pdGlhbGl6ZSBpbnN0YW5jZSBlbGVtZW50LiBDYWxsZWQgaW4gdGhlIHB1YmxpY1xuICAgICAqICRtb3VudCgpIG1ldGhvZC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7RWxlbWVudH0gZWxcbiAgICAgKi9cblxuICAgIFZ1ZS5wcm90b3R5cGUuX2luaXRFbGVtZW50ID0gZnVuY3Rpb24gKGVsKSB7XG4gICAgICBpZiAoaXNGcmFnbWVudChlbCkpIHtcbiAgICAgICAgdGhpcy5faXNGcmFnbWVudCA9IHRydWU7XG4gICAgICAgIHRoaXMuJGVsID0gdGhpcy5fZnJhZ21lbnRTdGFydCA9IGVsLmZpcnN0Q2hpbGQ7XG4gICAgICAgIHRoaXMuX2ZyYWdtZW50RW5kID0gZWwubGFzdENoaWxkO1xuICAgICAgICAvLyBzZXQgcGVyc2lzdGVkIHRleHQgYW5jaG9ycyB0byBlbXB0eVxuICAgICAgICBpZiAodGhpcy5fZnJhZ21lbnRTdGFydC5ub2RlVHlwZSA9PT0gMykge1xuICAgICAgICAgIHRoaXMuX2ZyYWdtZW50U3RhcnQuZGF0YSA9IHRoaXMuX2ZyYWdtZW50RW5kLmRhdGEgPSAnJztcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9mcmFnbWVudCA9IGVsO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy4kZWwgPSBlbDtcbiAgICAgIH1cbiAgICAgIHRoaXMuJGVsLl9fdnVlX18gPSB0aGlzO1xuICAgICAgdGhpcy5fY2FsbEhvb2soJ2JlZm9yZUNvbXBpbGUnKTtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogQ3JlYXRlIGFuZCBiaW5kIGEgZGlyZWN0aXZlIHRvIGFuIGVsZW1lbnQuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gZGVzY3JpcHRvciAtIHBhcnNlZCBkaXJlY3RpdmUgZGVzY3JpcHRvclxuICAgICAqIEBwYXJhbSB7Tm9kZX0gbm9kZSAgIC0gdGFyZ2V0IG5vZGVcbiAgICAgKiBAcGFyYW0ge1Z1ZX0gW2hvc3RdIC0gdHJhbnNjbHVzaW9uIGhvc3QgY29tcG9uZW50XG4gICAgICogQHBhcmFtIHtPYmplY3R9IFtzY29wZV0gLSB2LWZvciBzY29wZVxuICAgICAqIEBwYXJhbSB7RnJhZ21lbnR9IFtmcmFnXSAtIG93bmVyIGZyYWdtZW50XG4gICAgICovXG5cbiAgICBWdWUucHJvdG90eXBlLl9iaW5kRGlyID0gZnVuY3Rpb24gKGRlc2NyaXB0b3IsIG5vZGUsIGhvc3QsIHNjb3BlLCBmcmFnKSB7XG4gICAgICB0aGlzLl9kaXJlY3RpdmVzLnB1c2gobmV3IERpcmVjdGl2ZShkZXNjcmlwdG9yLCB0aGlzLCBub2RlLCBob3N0LCBzY29wZSwgZnJhZykpO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBUZWFyZG93biBhbiBpbnN0YW5jZSwgdW5vYnNlcnZlcyB0aGUgZGF0YSwgdW5iaW5kIGFsbCB0aGVcbiAgICAgKiBkaXJlY3RpdmVzLCB0dXJuIG9mZiBhbGwgdGhlIGV2ZW50IGxpc3RlbmVycywgZXRjLlxuICAgICAqXG4gICAgICogQHBhcmFtIHtCb29sZWFufSByZW1vdmUgLSB3aGV0aGVyIHRvIHJlbW92ZSB0aGUgRE9NIG5vZGUuXG4gICAgICogQHBhcmFtIHtCb29sZWFufSBkZWZlckNsZWFudXAgLSBpZiB0cnVlLCBkZWZlciBjbGVhbnVwIHRvXG4gICAgICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBiZSBjYWxsZWQgbGF0ZXJcbiAgICAgKi9cblxuICAgIFZ1ZS5wcm90b3R5cGUuX2Rlc3Ryb3kgPSBmdW5jdGlvbiAocmVtb3ZlLCBkZWZlckNsZWFudXApIHtcbiAgICAgIGlmICh0aGlzLl9pc0JlaW5nRGVzdHJveWVkKSB7XG4gICAgICAgIGlmICghZGVmZXJDbGVhbnVwKSB7XG4gICAgICAgICAgdGhpcy5fY2xlYW51cCgpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgdmFyIGRlc3Ryb3lSZWFkeTtcbiAgICAgIHZhciBwZW5kaW5nUmVtb3ZhbDtcblxuICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgICAgLy8gQ2xlYW51cCBzaG91bGQgYmUgY2FsbGVkIGVpdGhlciBzeW5jaHJvbm91c2x5IG9yIGFzeW5jaHJvbm95c2x5IGFzXG4gICAgICAvLyBjYWxsYmFjayBvZiB0aGlzLiRyZW1vdmUoKSwgb3IgaWYgcmVtb3ZlIGFuZCBkZWZlckNsZWFudXAgYXJlIGZhbHNlLlxuICAgICAgLy8gSW4gYW55IGNhc2UgaXQgc2hvdWxkIGJlIGNhbGxlZCBhZnRlciBhbGwgb3RoZXIgcmVtb3ZpbmcsIHVuYmluZGluZyBhbmRcbiAgICAgIC8vIHR1cm5pbmcgb2YgaXMgZG9uZVxuICAgICAgdmFyIGNsZWFudXBJZlBvc3NpYmxlID0gZnVuY3Rpb24gY2xlYW51cElmUG9zc2libGUoKSB7XG4gICAgICAgIGlmIChkZXN0cm95UmVhZHkgJiYgIXBlbmRpbmdSZW1vdmFsICYmICFkZWZlckNsZWFudXApIHtcbiAgICAgICAgICBzZWxmLl9jbGVhbnVwKCk7XG4gICAgICAgIH1cbiAgICAgIH07XG5cbiAgICAgIC8vIHJlbW92ZSBET00gZWxlbWVudFxuICAgICAgaWYgKHJlbW92ZSAmJiB0aGlzLiRlbCkge1xuICAgICAgICBwZW5kaW5nUmVtb3ZhbCA9IHRydWU7XG4gICAgICAgIHRoaXMuJHJlbW92ZShmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgcGVuZGluZ1JlbW92YWwgPSBmYWxzZTtcbiAgICAgICAgICBjbGVhbnVwSWZQb3NzaWJsZSgpO1xuICAgICAgICB9KTtcbiAgICAgIH1cblxuICAgICAgdGhpcy5fY2FsbEhvb2soJ2JlZm9yZURlc3Ryb3knKTtcbiAgICAgIHRoaXMuX2lzQmVpbmdEZXN0cm95ZWQgPSB0cnVlO1xuICAgICAgdmFyIGk7XG4gICAgICAvLyByZW1vdmUgc2VsZiBmcm9tIHBhcmVudC4gb25seSBuZWNlc3NhcnlcbiAgICAgIC8vIGlmIHBhcmVudCBpcyBub3QgYmVpbmcgZGVzdHJveWVkIGFzIHdlbGwuXG4gICAgICB2YXIgcGFyZW50ID0gdGhpcy4kcGFyZW50O1xuICAgICAgaWYgKHBhcmVudCAmJiAhcGFyZW50Ll9pc0JlaW5nRGVzdHJveWVkKSB7XG4gICAgICAgIHBhcmVudC4kY2hpbGRyZW4uJHJlbW92ZSh0aGlzKTtcbiAgICAgICAgLy8gdW5yZWdpc3RlciByZWYgKHJlbW92ZTogdHJ1ZSlcbiAgICAgICAgdGhpcy5fdXBkYXRlUmVmKHRydWUpO1xuICAgICAgfVxuICAgICAgLy8gZGVzdHJveSBhbGwgY2hpbGRyZW4uXG4gICAgICBpID0gdGhpcy4kY2hpbGRyZW4ubGVuZ3RoO1xuICAgICAgd2hpbGUgKGktLSkge1xuICAgICAgICB0aGlzLiRjaGlsZHJlbltpXS4kZGVzdHJveSgpO1xuICAgICAgfVxuICAgICAgLy8gdGVhcmRvd24gcHJvcHNcbiAgICAgIGlmICh0aGlzLl9wcm9wc1VubGlua0ZuKSB7XG4gICAgICAgIHRoaXMuX3Byb3BzVW5saW5rRm4oKTtcbiAgICAgIH1cbiAgICAgIC8vIHRlYXJkb3duIGFsbCBkaXJlY3RpdmVzLiB0aGlzIGFsc28gdGVhcnNkb3duIGFsbFxuICAgICAgLy8gZGlyZWN0aXZlLW93bmVkIHdhdGNoZXJzLlxuICAgICAgaWYgKHRoaXMuX3VubGlua0ZuKSB7XG4gICAgICAgIHRoaXMuX3VubGlua0ZuKCk7XG4gICAgICB9XG4gICAgICBpID0gdGhpcy5fd2F0Y2hlcnMubGVuZ3RoO1xuICAgICAgd2hpbGUgKGktLSkge1xuICAgICAgICB0aGlzLl93YXRjaGVyc1tpXS50ZWFyZG93bigpO1xuICAgICAgfVxuICAgICAgLy8gcmVtb3ZlIHJlZmVyZW5jZSB0byBzZWxmIG9uICRlbFxuICAgICAgaWYgKHRoaXMuJGVsKSB7XG4gICAgICAgIHRoaXMuJGVsLl9fdnVlX18gPSBudWxsO1xuICAgICAgfVxuXG4gICAgICBkZXN0cm95UmVhZHkgPSB0cnVlO1xuICAgICAgY2xlYW51cElmUG9zc2libGUoKTtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogQ2xlYW4gdXAgdG8gZW5zdXJlIGdhcmJhZ2UgY29sbGVjdGlvbi5cbiAgICAgKiBUaGlzIGlzIGNhbGxlZCBhZnRlciB0aGUgbGVhdmUgdHJhbnNpdGlvbiBpZiB0aGVyZVxuICAgICAqIGlzIGFueS5cbiAgICAgKi9cblxuICAgIFZ1ZS5wcm90b3R5cGUuX2NsZWFudXAgPSBmdW5jdGlvbiAoKSB7XG4gICAgICBpZiAodGhpcy5faXNEZXN0cm95ZWQpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgLy8gcmVtb3ZlIHNlbGYgZnJvbSBvd25lciBmcmFnbWVudFxuICAgICAgLy8gZG8gaXQgaW4gY2xlYW51cCBzbyB0aGF0IHdlIGNhbiBjYWxsICRkZXN0cm95IHdpdGhcbiAgICAgIC8vIGRlZmVyIHJpZ2h0IHdoZW4gYSBmcmFnbWVudCBpcyBhYm91dCB0byBiZSByZW1vdmVkLlxuICAgICAgaWYgKHRoaXMuX2ZyYWcpIHtcbiAgICAgICAgdGhpcy5fZnJhZy5jaGlsZHJlbi4kcmVtb3ZlKHRoaXMpO1xuICAgICAgfVxuICAgICAgLy8gcmVtb3ZlIHJlZmVyZW5jZSBmcm9tIGRhdGEgb2JcbiAgICAgIC8vIGZyb3plbiBvYmplY3QgbWF5IG5vdCBoYXZlIG9ic2VydmVyLlxuICAgICAgaWYgKHRoaXMuX2RhdGEgJiYgdGhpcy5fZGF0YS5fX29iX18pIHtcbiAgICAgICAgdGhpcy5fZGF0YS5fX29iX18ucmVtb3ZlVm0odGhpcyk7XG4gICAgICB9XG4gICAgICAvLyBDbGVhbiB1cCByZWZlcmVuY2VzIHRvIHByaXZhdGUgcHJvcGVydGllcyBhbmQgb3RoZXJcbiAgICAgIC8vIGluc3RhbmNlcy4gcHJlc2VydmUgcmVmZXJlbmNlIHRvIF9kYXRhIHNvIHRoYXQgcHJveHlcbiAgICAgIC8vIGFjY2Vzc29ycyBzdGlsbCB3b3JrLiBUaGUgb25seSBwb3RlbnRpYWwgc2lkZSBlZmZlY3RcbiAgICAgIC8vIGhlcmUgaXMgdGhhdCBtdXRhdGluZyB0aGUgaW5zdGFuY2UgYWZ0ZXIgaXQncyBkZXN0cm95ZWRcbiAgICAgIC8vIG1heSBhZmZlY3QgdGhlIHN0YXRlIG9mIG90aGVyIGNvbXBvbmVudHMgdGhhdCBhcmUgc3RpbGxcbiAgICAgIC8vIG9ic2VydmluZyB0aGUgc2FtZSBvYmplY3QsIGJ1dCB0aGF0IHNlZW1zIHRvIGJlIGFcbiAgICAgIC8vIHJlYXNvbmFibGUgcmVzcG9uc2liaWxpdHkgZm9yIHRoZSB1c2VyIHJhdGhlciB0aGFuXG4gICAgICAvLyBhbHdheXMgdGhyb3dpbmcgYW4gZXJyb3Igb24gdGhlbS5cbiAgICAgIHRoaXMuJGVsID0gdGhpcy4kcGFyZW50ID0gdGhpcy4kcm9vdCA9IHRoaXMuJGNoaWxkcmVuID0gdGhpcy5fd2F0Y2hlcnMgPSB0aGlzLl9jb250ZXh0ID0gdGhpcy5fc2NvcGUgPSB0aGlzLl9kaXJlY3RpdmVzID0gbnVsbDtcbiAgICAgIC8vIGNhbGwgdGhlIGxhc3QgaG9vay4uLlxuICAgICAgdGhpcy5faXNEZXN0cm95ZWQgPSB0cnVlO1xuICAgICAgdGhpcy5fY2FsbEhvb2soJ2Rlc3Ryb3llZCcpO1xuICAgICAgLy8gdHVybiBvZmYgYWxsIGluc3RhbmNlIGxpc3RlbmVycy5cbiAgICAgIHRoaXMuJG9mZigpO1xuICAgIH07XG4gIH1cblxuICBmdW5jdGlvbiBtaXNjTWl4aW4gKFZ1ZSkge1xuICAgIC8qKlxuICAgICAqIEFwcGx5IGEgbGlzdCBvZiBmaWx0ZXIgKGRlc2NyaXB0b3JzKSB0byBhIHZhbHVlLlxuICAgICAqIFVzaW5nIHBsYWluIGZvciBsb29wcyBoZXJlIGJlY2F1c2UgdGhpcyB3aWxsIGJlIGNhbGxlZCBpblxuICAgICAqIHRoZSBnZXR0ZXIgb2YgYW55IHdhdGNoZXIgd2l0aCBmaWx0ZXJzIHNvIGl0IGlzIHZlcnlcbiAgICAgKiBwZXJmb3JtYW5jZSBzZW5zaXRpdmUuXG4gICAgICpcbiAgICAgKiBAcGFyYW0geyp9IHZhbHVlXG4gICAgICogQHBhcmFtIHsqfSBbb2xkVmFsdWVdXG4gICAgICogQHBhcmFtIHtBcnJheX0gZmlsdGVyc1xuICAgICAqIEBwYXJhbSB7Qm9vbGVhbn0gd3JpdGVcbiAgICAgKiBAcmV0dXJuIHsqfVxuICAgICAqL1xuXG4gICAgVnVlLnByb3RvdHlwZS5fYXBwbHlGaWx0ZXJzID0gZnVuY3Rpb24gKHZhbHVlLCBvbGRWYWx1ZSwgZmlsdGVycywgd3JpdGUpIHtcbiAgICAgIHZhciBmaWx0ZXIsIGZuLCBhcmdzLCBhcmcsIG9mZnNldCwgaSwgbCwgaiwgaztcbiAgICAgIGZvciAoaSA9IDAsIGwgPSBmaWx0ZXJzLmxlbmd0aDsgaSA8IGw7IGkrKykge1xuICAgICAgICBmaWx0ZXIgPSBmaWx0ZXJzW3dyaXRlID8gbCAtIGkgLSAxIDogaV07XG4gICAgICAgIGZuID0gcmVzb2x2ZUFzc2V0KHRoaXMuJG9wdGlvbnMsICdmaWx0ZXJzJywgZmlsdGVyLm5hbWUsIHRydWUpO1xuICAgICAgICBpZiAoIWZuKSBjb250aW51ZTtcbiAgICAgICAgZm4gPSB3cml0ZSA/IGZuLndyaXRlIDogZm4ucmVhZCB8fCBmbjtcbiAgICAgICAgaWYgKHR5cGVvZiBmbiAhPT0gJ2Z1bmN0aW9uJykgY29udGludWU7XG4gICAgICAgIGFyZ3MgPSB3cml0ZSA/IFt2YWx1ZSwgb2xkVmFsdWVdIDogW3ZhbHVlXTtcbiAgICAgICAgb2Zmc2V0ID0gd3JpdGUgPyAyIDogMTtcbiAgICAgICAgaWYgKGZpbHRlci5hcmdzKSB7XG4gICAgICAgICAgZm9yIChqID0gMCwgayA9IGZpbHRlci5hcmdzLmxlbmd0aDsgaiA8IGs7IGorKykge1xuICAgICAgICAgICAgYXJnID0gZmlsdGVyLmFyZ3Nbal07XG4gICAgICAgICAgICBhcmdzW2ogKyBvZmZzZXRdID0gYXJnLmR5bmFtaWMgPyB0aGlzLiRnZXQoYXJnLnZhbHVlKSA6IGFyZy52YWx1ZTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgdmFsdWUgPSBmbi5hcHBseSh0aGlzLCBhcmdzKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiB2YWx1ZTtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogUmVzb2x2ZSBhIGNvbXBvbmVudCwgZGVwZW5kaW5nIG9uIHdoZXRoZXIgdGhlIGNvbXBvbmVudFxuICAgICAqIGlzIGRlZmluZWQgbm9ybWFsbHkgb3IgdXNpbmcgYW4gYXN5bmMgZmFjdG9yeSBmdW5jdGlvbi5cbiAgICAgKiBSZXNvbHZlcyBzeW5jaHJvbm91c2x5IGlmIGFscmVhZHkgcmVzb2x2ZWQsIG90aGVyd2lzZVxuICAgICAqIHJlc29sdmVzIGFzeW5jaHJvbm91c2x5IGFuZCBjYWNoZXMgdGhlIHJlc29sdmVkXG4gICAgICogY29uc3RydWN0b3Igb24gdGhlIGZhY3RvcnkuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge1N0cmluZ3xGdW5jdGlvbn0gdmFsdWVcbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBjYlxuICAgICAqL1xuXG4gICAgVnVlLnByb3RvdHlwZS5fcmVzb2x2ZUNvbXBvbmVudCA9IGZ1bmN0aW9uICh2YWx1ZSwgY2IpIHtcbiAgICAgIHZhciBmYWN0b3J5O1xuICAgICAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICBmYWN0b3J5ID0gdmFsdWU7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBmYWN0b3J5ID0gcmVzb2x2ZUFzc2V0KHRoaXMuJG9wdGlvbnMsICdjb21wb25lbnRzJywgdmFsdWUsIHRydWUpO1xuICAgICAgfVxuICAgICAgLyogaXN0YW5idWwgaWdub3JlIGlmICovXG4gICAgICBpZiAoIWZhY3RvcnkpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgLy8gYXN5bmMgY29tcG9uZW50IGZhY3RvcnlcbiAgICAgIGlmICghZmFjdG9yeS5vcHRpb25zKSB7XG4gICAgICAgIGlmIChmYWN0b3J5LnJlc29sdmVkKSB7XG4gICAgICAgICAgLy8gY2FjaGVkXG4gICAgICAgICAgY2IoZmFjdG9yeS5yZXNvbHZlZCk7XG4gICAgICAgIH0gZWxzZSBpZiAoZmFjdG9yeS5yZXF1ZXN0ZWQpIHtcbiAgICAgICAgICAvLyBwb29sIGNhbGxiYWNrc1xuICAgICAgICAgIGZhY3RvcnkucGVuZGluZ0NhbGxiYWNrcy5wdXNoKGNiKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBmYWN0b3J5LnJlcXVlc3RlZCA9IHRydWU7XG4gICAgICAgICAgdmFyIGNicyA9IGZhY3RvcnkucGVuZGluZ0NhbGxiYWNrcyA9IFtjYl07XG4gICAgICAgICAgZmFjdG9yeS5jYWxsKHRoaXMsIGZ1bmN0aW9uIHJlc29sdmUocmVzKSB7XG4gICAgICAgICAgICBpZiAoaXNQbGFpbk9iamVjdChyZXMpKSB7XG4gICAgICAgICAgICAgIHJlcyA9IFZ1ZS5leHRlbmQocmVzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIGNhY2hlIHJlc29sdmVkXG4gICAgICAgICAgICBmYWN0b3J5LnJlc29sdmVkID0gcmVzO1xuICAgICAgICAgICAgLy8gaW52b2tlIGNhbGxiYWNrc1xuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDAsIGwgPSBjYnMubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG4gICAgICAgICAgICAgIGNic1tpXShyZXMpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0sIGZ1bmN0aW9uIHJlamVjdChyZWFzb24pIHtcbiAgICAgICAgICAgICdkZXZlbG9wbWVudCcgIT09ICdwcm9kdWN0aW9uJyAmJiB3YXJuKCdGYWlsZWQgdG8gcmVzb2x2ZSBhc3luYyBjb21wb25lbnQnICsgKHR5cGVvZiB2YWx1ZSA9PT0gJ3N0cmluZycgPyAnOiAnICsgdmFsdWUgOiAnJykgKyAnLiAnICsgKHJlYXNvbiA/ICdcXG5SZWFzb246ICcgKyByZWFzb24gOiAnJykpO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvLyBub3JtYWwgY29tcG9uZW50XG4gICAgICAgIGNiKGZhY3RvcnkpO1xuICAgICAgfVxuICAgIH07XG4gIH1cblxuICB2YXIgZmlsdGVyUkUkMSA9IC9bXnxdXFx8W158XS87XG5cbiAgZnVuY3Rpb24gZGF0YUFQSSAoVnVlKSB7XG4gICAgLyoqXG4gICAgICogR2V0IHRoZSB2YWx1ZSBmcm9tIGFuIGV4cHJlc3Npb24gb24gdGhpcyB2bS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBleHBcbiAgICAgKiBAcGFyYW0ge0Jvb2xlYW59IFthc1N0YXRlbWVudF1cbiAgICAgKiBAcmV0dXJuIHsqfVxuICAgICAqL1xuXG4gICAgVnVlLnByb3RvdHlwZS4kZ2V0ID0gZnVuY3Rpb24gKGV4cCwgYXNTdGF0ZW1lbnQpIHtcbiAgICAgIHZhciByZXMgPSBwYXJzZUV4cHJlc3Npb24oZXhwKTtcbiAgICAgIGlmIChyZXMpIHtcbiAgICAgICAgaWYgKGFzU3RhdGVtZW50KSB7XG4gICAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgICAgICAgIHJldHVybiBmdW5jdGlvbiBzdGF0ZW1lbnRIYW5kbGVyKCkge1xuICAgICAgICAgICAgc2VsZi4kYXJndW1lbnRzID0gdG9BcnJheShhcmd1bWVudHMpO1xuICAgICAgICAgICAgdmFyIHJlc3VsdCA9IHJlcy5nZXQuY2FsbChzZWxmLCBzZWxmKTtcbiAgICAgICAgICAgIHNlbGYuJGFyZ3VtZW50cyA9IG51bGw7XG4gICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgICAgIH07XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIHJldHVybiByZXMuZ2V0LmNhbGwodGhpcywgdGhpcyk7XG4gICAgICAgICAgfSBjYXRjaCAoZSkge31cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBTZXQgdGhlIHZhbHVlIGZyb20gYW4gZXhwcmVzc2lvbiBvbiB0aGlzIHZtLlxuICAgICAqIFRoZSBleHByZXNzaW9uIG11c3QgYmUgYSB2YWxpZCBsZWZ0LWhhbmRcbiAgICAgKiBleHByZXNzaW9uIGluIGFuIGFzc2lnbm1lbnQuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gZXhwXG4gICAgICogQHBhcmFtIHsqfSB2YWxcbiAgICAgKi9cblxuICAgIFZ1ZS5wcm90b3R5cGUuJHNldCA9IGZ1bmN0aW9uIChleHAsIHZhbCkge1xuICAgICAgdmFyIHJlcyA9IHBhcnNlRXhwcmVzc2lvbihleHAsIHRydWUpO1xuICAgICAgaWYgKHJlcyAmJiByZXMuc2V0KSB7XG4gICAgICAgIHJlcy5zZXQuY2FsbCh0aGlzLCB0aGlzLCB2YWwpO1xuICAgICAgfVxuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBEZWxldGUgYSBwcm9wZXJ0eSBvbiB0aGUgVk1cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBrZXlcbiAgICAgKi9cblxuICAgIFZ1ZS5wcm90b3R5cGUuJGRlbGV0ZSA9IGZ1bmN0aW9uIChrZXkpIHtcbiAgICAgIGRlbCh0aGlzLl9kYXRhLCBrZXkpO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBXYXRjaCBhbiBleHByZXNzaW9uLCB0cmlnZ2VyIGNhbGxiYWNrIHdoZW4gaXRzXG4gICAgICogdmFsdWUgY2hhbmdlcy5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7U3RyaW5nfEZ1bmN0aW9ufSBleHBPckZuXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gY2JcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gW29wdGlvbnNdXG4gICAgICogICAgICAgICAgICAgICAgIC0ge0Jvb2xlYW59IGRlZXBcbiAgICAgKiAgICAgICAgICAgICAgICAgLSB7Qm9vbGVhbn0gaW1tZWRpYXRlXG4gICAgICogQHJldHVybiB7RnVuY3Rpb259IC0gdW53YXRjaEZuXG4gICAgICovXG5cbiAgICBWdWUucHJvdG90eXBlLiR3YXRjaCA9IGZ1bmN0aW9uIChleHBPckZuLCBjYiwgb3B0aW9ucykge1xuICAgICAgdmFyIHZtID0gdGhpcztcbiAgICAgIHZhciBwYXJzZWQ7XG4gICAgICBpZiAodHlwZW9mIGV4cE9yRm4gPT09ICdzdHJpbmcnKSB7XG4gICAgICAgIHBhcnNlZCA9IHBhcnNlRGlyZWN0aXZlKGV4cE9yRm4pO1xuICAgICAgICBleHBPckZuID0gcGFyc2VkLmV4cHJlc3Npb247XG4gICAgICB9XG4gICAgICB2YXIgd2F0Y2hlciA9IG5ldyBXYXRjaGVyKHZtLCBleHBPckZuLCBjYiwge1xuICAgICAgICBkZWVwOiBvcHRpb25zICYmIG9wdGlvbnMuZGVlcCxcbiAgICAgICAgc3luYzogb3B0aW9ucyAmJiBvcHRpb25zLnN5bmMsXG4gICAgICAgIGZpbHRlcnM6IHBhcnNlZCAmJiBwYXJzZWQuZmlsdGVycyxcbiAgICAgICAgdXNlcjogIW9wdGlvbnMgfHwgb3B0aW9ucy51c2VyICE9PSBmYWxzZVxuICAgICAgfSk7XG4gICAgICBpZiAob3B0aW9ucyAmJiBvcHRpb25zLmltbWVkaWF0ZSkge1xuICAgICAgICBjYi5jYWxsKHZtLCB3YXRjaGVyLnZhbHVlKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBmdW5jdGlvbiB1bndhdGNoRm4oKSB7XG4gICAgICAgIHdhdGNoZXIudGVhcmRvd24oKTtcbiAgICAgIH07XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIEV2YWx1YXRlIGEgdGV4dCBkaXJlY3RpdmUsIGluY2x1ZGluZyBmaWx0ZXJzLlxuICAgICAqXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IHRleHRcbiAgICAgKiBAcGFyYW0ge0Jvb2xlYW59IFthc1N0YXRlbWVudF1cbiAgICAgKiBAcmV0dXJuIHtTdHJpbmd9XG4gICAgICovXG5cbiAgICBWdWUucHJvdG90eXBlLiRldmFsID0gZnVuY3Rpb24gKHRleHQsIGFzU3RhdGVtZW50KSB7XG4gICAgICAvLyBjaGVjayBmb3IgZmlsdGVycy5cbiAgICAgIGlmIChmaWx0ZXJSRSQxLnRlc3QodGV4dCkpIHtcbiAgICAgICAgdmFyIGRpciA9IHBhcnNlRGlyZWN0aXZlKHRleHQpO1xuICAgICAgICAvLyB0aGUgZmlsdGVyIHJlZ2V4IGNoZWNrIG1pZ2h0IGdpdmUgZmFsc2UgcG9zaXRpdmVcbiAgICAgICAgLy8gZm9yIHBpcGVzIGluc2lkZSBzdHJpbmdzLCBzbyBpdCdzIHBvc3NpYmxlIHRoYXRcbiAgICAgICAgLy8gd2UgZG9uJ3QgZ2V0IGFueSBmaWx0ZXJzIGhlcmVcbiAgICAgICAgdmFyIHZhbCA9IHRoaXMuJGdldChkaXIuZXhwcmVzc2lvbiwgYXNTdGF0ZW1lbnQpO1xuICAgICAgICByZXR1cm4gZGlyLmZpbHRlcnMgPyB0aGlzLl9hcHBseUZpbHRlcnModmFsLCBudWxsLCBkaXIuZmlsdGVycykgOiB2YWw7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvLyBubyBmaWx0ZXJcbiAgICAgICAgcmV0dXJuIHRoaXMuJGdldCh0ZXh0LCBhc1N0YXRlbWVudCk7XG4gICAgICB9XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIEludGVycG9sYXRlIGEgcGllY2Ugb2YgdGVtcGxhdGUgdGV4dC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSB0ZXh0XG4gICAgICogQHJldHVybiB7U3RyaW5nfVxuICAgICAqL1xuXG4gICAgVnVlLnByb3RvdHlwZS4kaW50ZXJwb2xhdGUgPSBmdW5jdGlvbiAodGV4dCkge1xuICAgICAgdmFyIHRva2VucyA9IHBhcnNlVGV4dCh0ZXh0KTtcbiAgICAgIHZhciB2bSA9IHRoaXM7XG4gICAgICBpZiAodG9rZW5zKSB7XG4gICAgICAgIGlmICh0b2tlbnMubGVuZ3RoID09PSAxKSB7XG4gICAgICAgICAgcmV0dXJuIHZtLiRldmFsKHRva2Vuc1swXS52YWx1ZSkgKyAnJztcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXR1cm4gdG9rZW5zLm1hcChmdW5jdGlvbiAodG9rZW4pIHtcbiAgICAgICAgICAgIHJldHVybiB0b2tlbi50YWcgPyB2bS4kZXZhbCh0b2tlbi52YWx1ZSkgOiB0b2tlbi52YWx1ZTtcbiAgICAgICAgICB9KS5qb2luKCcnKTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIHRleHQ7XG4gICAgICB9XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIExvZyBpbnN0YW5jZSBkYXRhIGFzIGEgcGxhaW4gSlMgb2JqZWN0XG4gICAgICogc28gdGhhdCBpdCBpcyBlYXNpZXIgdG8gaW5zcGVjdCBpbiBjb25zb2xlLlxuICAgICAqIFRoaXMgbWV0aG9kIGFzc3VtZXMgY29uc29sZSBpcyBhdmFpbGFibGUuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gW3BhdGhdXG4gICAgICovXG5cbiAgICBWdWUucHJvdG90eXBlLiRsb2cgPSBmdW5jdGlvbiAocGF0aCkge1xuICAgICAgdmFyIGRhdGEgPSBwYXRoID8gZ2V0UGF0aCh0aGlzLl9kYXRhLCBwYXRoKSA6IHRoaXMuX2RhdGE7XG4gICAgICBpZiAoZGF0YSkge1xuICAgICAgICBkYXRhID0gY2xlYW4oZGF0YSk7XG4gICAgICB9XG4gICAgICAvLyBpbmNsdWRlIGNvbXB1dGVkIGZpZWxkc1xuICAgICAgaWYgKCFwYXRoKSB7XG4gICAgICAgIHZhciBrZXk7XG4gICAgICAgIGZvciAoa2V5IGluIHRoaXMuJG9wdGlvbnMuY29tcHV0ZWQpIHtcbiAgICAgICAgICBkYXRhW2tleV0gPSBjbGVhbih0aGlzW2tleV0pO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLl9wcm9wcykge1xuICAgICAgICAgIGZvciAoa2V5IGluIHRoaXMuX3Byb3BzKSB7XG4gICAgICAgICAgICBkYXRhW2tleV0gPSBjbGVhbih0aGlzW2tleV0pO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgY29uc29sZS5sb2coZGF0YSk7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIFwiY2xlYW5cIiBhIGdldHRlci9zZXR0ZXIgY29udmVydGVkIG9iamVjdCBpbnRvIGEgcGxhaW5cbiAgICAgKiBvYmplY3QgY29weS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSAtIG9ialxuICAgICAqIEByZXR1cm4ge09iamVjdH1cbiAgICAgKi9cblxuICAgIGZ1bmN0aW9uIGNsZWFuKG9iaikge1xuICAgICAgcmV0dXJuIEpTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkob2JqKSk7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gZG9tQVBJIChWdWUpIHtcbiAgICAvKipcbiAgICAgKiBDb252ZW5pZW5jZSBvbi1pbnN0YW5jZSBuZXh0VGljay4gVGhlIGNhbGxiYWNrIGlzXG4gICAgICogYXV0by1ib3VuZCB0byB0aGUgaW5zdGFuY2UsIGFuZCB0aGlzIGF2b2lkcyBjb21wb25lbnRcbiAgICAgKiBtb2R1bGVzIGhhdmluZyB0byByZWx5IG9uIHRoZSBnbG9iYWwgVnVlLlxuICAgICAqXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gZm5cbiAgICAgKi9cblxuICAgIFZ1ZS5wcm90b3R5cGUuJG5leHRUaWNrID0gZnVuY3Rpb24gKGZuKSB7XG4gICAgICBuZXh0VGljayhmbiwgdGhpcyk7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIEFwcGVuZCBpbnN0YW5jZSB0byB0YXJnZXRcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7Tm9kZX0gdGFyZ2V0XG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gW2NiXVxuICAgICAqIEBwYXJhbSB7Qm9vbGVhbn0gW3dpdGhUcmFuc2l0aW9uXSAtIGRlZmF1bHRzIHRvIHRydWVcbiAgICAgKi9cblxuICAgIFZ1ZS5wcm90b3R5cGUuJGFwcGVuZFRvID0gZnVuY3Rpb24gKHRhcmdldCwgY2IsIHdpdGhUcmFuc2l0aW9uKSB7XG4gICAgICByZXR1cm4gaW5zZXJ0KHRoaXMsIHRhcmdldCwgY2IsIHdpdGhUcmFuc2l0aW9uLCBhcHBlbmQsIGFwcGVuZFdpdGhUcmFuc2l0aW9uKTtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogUHJlcGVuZCBpbnN0YW5jZSB0byB0YXJnZXRcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7Tm9kZX0gdGFyZ2V0XG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gW2NiXVxuICAgICAqIEBwYXJhbSB7Qm9vbGVhbn0gW3dpdGhUcmFuc2l0aW9uXSAtIGRlZmF1bHRzIHRvIHRydWVcbiAgICAgKi9cblxuICAgIFZ1ZS5wcm90b3R5cGUuJHByZXBlbmRUbyA9IGZ1bmN0aW9uICh0YXJnZXQsIGNiLCB3aXRoVHJhbnNpdGlvbikge1xuICAgICAgdGFyZ2V0ID0gcXVlcnkodGFyZ2V0KTtcbiAgICAgIGlmICh0YXJnZXQuaGFzQ2hpbGROb2RlcygpKSB7XG4gICAgICAgIHRoaXMuJGJlZm9yZSh0YXJnZXQuZmlyc3RDaGlsZCwgY2IsIHdpdGhUcmFuc2l0aW9uKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuJGFwcGVuZFRvKHRhcmdldCwgY2IsIHdpdGhUcmFuc2l0aW9uKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBJbnNlcnQgaW5zdGFuY2UgYmVmb3JlIHRhcmdldFxuICAgICAqXG4gICAgICogQHBhcmFtIHtOb2RlfSB0YXJnZXRcbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBbY2JdXG4gICAgICogQHBhcmFtIHtCb29sZWFufSBbd2l0aFRyYW5zaXRpb25dIC0gZGVmYXVsdHMgdG8gdHJ1ZVxuICAgICAqL1xuXG4gICAgVnVlLnByb3RvdHlwZS4kYmVmb3JlID0gZnVuY3Rpb24gKHRhcmdldCwgY2IsIHdpdGhUcmFuc2l0aW9uKSB7XG4gICAgICByZXR1cm4gaW5zZXJ0KHRoaXMsIHRhcmdldCwgY2IsIHdpdGhUcmFuc2l0aW9uLCBiZWZvcmVXaXRoQ2IsIGJlZm9yZVdpdGhUcmFuc2l0aW9uKTtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogSW5zZXJ0IGluc3RhbmNlIGFmdGVyIHRhcmdldFxuICAgICAqXG4gICAgICogQHBhcmFtIHtOb2RlfSB0YXJnZXRcbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBbY2JdXG4gICAgICogQHBhcmFtIHtCb29sZWFufSBbd2l0aFRyYW5zaXRpb25dIC0gZGVmYXVsdHMgdG8gdHJ1ZVxuICAgICAqL1xuXG4gICAgVnVlLnByb3RvdHlwZS4kYWZ0ZXIgPSBmdW5jdGlvbiAodGFyZ2V0LCBjYiwgd2l0aFRyYW5zaXRpb24pIHtcbiAgICAgIHRhcmdldCA9IHF1ZXJ5KHRhcmdldCk7XG4gICAgICBpZiAodGFyZ2V0Lm5leHRTaWJsaW5nKSB7XG4gICAgICAgIHRoaXMuJGJlZm9yZSh0YXJnZXQubmV4dFNpYmxpbmcsIGNiLCB3aXRoVHJhbnNpdGlvbik7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLiRhcHBlbmRUbyh0YXJnZXQucGFyZW50Tm9kZSwgY2IsIHdpdGhUcmFuc2l0aW9uKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBSZW1vdmUgaW5zdGFuY2UgZnJvbSBET01cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IFtjYl1cbiAgICAgKiBAcGFyYW0ge0Jvb2xlYW59IFt3aXRoVHJhbnNpdGlvbl0gLSBkZWZhdWx0cyB0byB0cnVlXG4gICAgICovXG5cbiAgICBWdWUucHJvdG90eXBlLiRyZW1vdmUgPSBmdW5jdGlvbiAoY2IsIHdpdGhUcmFuc2l0aW9uKSB7XG4gICAgICBpZiAoIXRoaXMuJGVsLnBhcmVudE5vZGUpIHtcbiAgICAgICAgcmV0dXJuIGNiICYmIGNiKCk7XG4gICAgICB9XG4gICAgICB2YXIgaW5Eb2N1bWVudCA9IHRoaXMuX2lzQXR0YWNoZWQgJiYgaW5Eb2ModGhpcy4kZWwpO1xuICAgICAgLy8gaWYgd2UgYXJlIG5vdCBpbiBkb2N1bWVudCwgbm8gbmVlZCB0byBjaGVja1xuICAgICAgLy8gZm9yIHRyYW5zaXRpb25zXG4gICAgICBpZiAoIWluRG9jdW1lbnQpIHdpdGhUcmFuc2l0aW9uID0gZmFsc2U7XG4gICAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgICB2YXIgcmVhbENiID0gZnVuY3Rpb24gcmVhbENiKCkge1xuICAgICAgICBpZiAoaW5Eb2N1bWVudCkgc2VsZi5fY2FsbEhvb2soJ2RldGFjaGVkJyk7XG4gICAgICAgIGlmIChjYikgY2IoKTtcbiAgICAgIH07XG4gICAgICBpZiAodGhpcy5faXNGcmFnbWVudCkge1xuICAgICAgICByZW1vdmVOb2RlUmFuZ2UodGhpcy5fZnJhZ21lbnRTdGFydCwgdGhpcy5fZnJhZ21lbnRFbmQsIHRoaXMsIHRoaXMuX2ZyYWdtZW50LCByZWFsQ2IpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdmFyIG9wID0gd2l0aFRyYW5zaXRpb24gPT09IGZhbHNlID8gcmVtb3ZlV2l0aENiIDogcmVtb3ZlV2l0aFRyYW5zaXRpb247XG4gICAgICAgIG9wKHRoaXMuJGVsLCB0aGlzLCByZWFsQ2IpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIFNoYXJlZCBET00gaW5zZXJ0aW9uIGZ1bmN0aW9uLlxuICAgICAqXG4gICAgICogQHBhcmFtIHtWdWV9IHZtXG4gICAgICogQHBhcmFtIHtFbGVtZW50fSB0YXJnZXRcbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBbY2JdXG4gICAgICogQHBhcmFtIHtCb29sZWFufSBbd2l0aFRyYW5zaXRpb25dXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gb3AxIC0gb3AgZm9yIG5vbi10cmFuc2l0aW9uIGluc2VydFxuICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IG9wMiAtIG9wIGZvciB0cmFuc2l0aW9uIGluc2VydFxuICAgICAqIEByZXR1cm4gdm1cbiAgICAgKi9cblxuICAgIGZ1bmN0aW9uIGluc2VydCh2bSwgdGFyZ2V0LCBjYiwgd2l0aFRyYW5zaXRpb24sIG9wMSwgb3AyKSB7XG4gICAgICB0YXJnZXQgPSBxdWVyeSh0YXJnZXQpO1xuICAgICAgdmFyIHRhcmdldElzRGV0YWNoZWQgPSAhaW5Eb2ModGFyZ2V0KTtcbiAgICAgIHZhciBvcCA9IHdpdGhUcmFuc2l0aW9uID09PSBmYWxzZSB8fCB0YXJnZXRJc0RldGFjaGVkID8gb3AxIDogb3AyO1xuICAgICAgdmFyIHNob3VsZENhbGxIb29rID0gIXRhcmdldElzRGV0YWNoZWQgJiYgIXZtLl9pc0F0dGFjaGVkICYmICFpbkRvYyh2bS4kZWwpO1xuICAgICAgaWYgKHZtLl9pc0ZyYWdtZW50KSB7XG4gICAgICAgIG1hcE5vZGVSYW5nZSh2bS5fZnJhZ21lbnRTdGFydCwgdm0uX2ZyYWdtZW50RW5kLCBmdW5jdGlvbiAobm9kZSkge1xuICAgICAgICAgIG9wKG5vZGUsIHRhcmdldCwgdm0pO1xuICAgICAgICB9KTtcbiAgICAgICAgY2IgJiYgY2IoKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIG9wKHZtLiRlbCwgdGFyZ2V0LCB2bSwgY2IpO1xuICAgICAgfVxuICAgICAgaWYgKHNob3VsZENhbGxIb29rKSB7XG4gICAgICAgIHZtLl9jYWxsSG9vaygnYXR0YWNoZWQnKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiB2bTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDaGVjayBmb3Igc2VsZWN0b3JzXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge1N0cmluZ3xFbGVtZW50fSBlbFxuICAgICAqL1xuXG4gICAgZnVuY3Rpb24gcXVlcnkoZWwpIHtcbiAgICAgIHJldHVybiB0eXBlb2YgZWwgPT09ICdzdHJpbmcnID8gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihlbCkgOiBlbDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBBcHBlbmQgb3BlcmF0aW9uIHRoYXQgdGFrZXMgYSBjYWxsYmFjay5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7Tm9kZX0gZWxcbiAgICAgKiBAcGFyYW0ge05vZGV9IHRhcmdldFxuICAgICAqIEBwYXJhbSB7VnVlfSB2bSAtIHVudXNlZFxuICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IFtjYl1cbiAgICAgKi9cblxuICAgIGZ1bmN0aW9uIGFwcGVuZChlbCwgdGFyZ2V0LCB2bSwgY2IpIHtcbiAgICAgIHRhcmdldC5hcHBlbmRDaGlsZChlbCk7XG4gICAgICBpZiAoY2IpIGNiKCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogSW5zZXJ0QmVmb3JlIG9wZXJhdGlvbiB0aGF0IHRha2VzIGEgY2FsbGJhY2suXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge05vZGV9IGVsXG4gICAgICogQHBhcmFtIHtOb2RlfSB0YXJnZXRcbiAgICAgKiBAcGFyYW0ge1Z1ZX0gdm0gLSB1bnVzZWRcbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBbY2JdXG4gICAgICovXG5cbiAgICBmdW5jdGlvbiBiZWZvcmVXaXRoQ2IoZWwsIHRhcmdldCwgdm0sIGNiKSB7XG4gICAgICBiZWZvcmUoZWwsIHRhcmdldCk7XG4gICAgICBpZiAoY2IpIGNiKCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmVtb3ZlIG9wZXJhdGlvbiB0aGF0IHRha2VzIGEgY2FsbGJhY2suXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge05vZGV9IGVsXG4gICAgICogQHBhcmFtIHtWdWV9IHZtIC0gdW51c2VkXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gW2NiXVxuICAgICAqL1xuXG4gICAgZnVuY3Rpb24gcmVtb3ZlV2l0aENiKGVsLCB2bSwgY2IpIHtcbiAgICAgIHJlbW92ZShlbCk7XG4gICAgICBpZiAoY2IpIGNiKCk7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gZXZlbnRzQVBJIChWdWUpIHtcbiAgICAvKipcbiAgICAgKiBMaXN0ZW4gb24gdGhlIGdpdmVuIGBldmVudGAgd2l0aCBgZm5gLlxuICAgICAqXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IGV2ZW50XG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gZm5cbiAgICAgKi9cblxuICAgIFZ1ZS5wcm90b3R5cGUuJG9uID0gZnVuY3Rpb24gKGV2ZW50LCBmbikge1xuICAgICAgKHRoaXMuX2V2ZW50c1tldmVudF0gfHwgKHRoaXMuX2V2ZW50c1tldmVudF0gPSBbXSkpLnB1c2goZm4pO1xuICAgICAgbW9kaWZ5TGlzdGVuZXJDb3VudCh0aGlzLCBldmVudCwgMSk7XG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogQWRkcyBhbiBgZXZlbnRgIGxpc3RlbmVyIHRoYXQgd2lsbCBiZSBpbnZva2VkIGEgc2luZ2xlXG4gICAgICogdGltZSB0aGVuIGF1dG9tYXRpY2FsbHkgcmVtb3ZlZC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBldmVudFxuICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IGZuXG4gICAgICovXG5cbiAgICBWdWUucHJvdG90eXBlLiRvbmNlID0gZnVuY3Rpb24gKGV2ZW50LCBmbikge1xuICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgICAgZnVuY3Rpb24gb24oKSB7XG4gICAgICAgIHNlbGYuJG9mZihldmVudCwgb24pO1xuICAgICAgICBmbi5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgICAgfVxuICAgICAgb24uZm4gPSBmbjtcbiAgICAgIHRoaXMuJG9uKGV2ZW50LCBvbik7XG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogUmVtb3ZlIHRoZSBnaXZlbiBjYWxsYmFjayBmb3IgYGV2ZW50YCBvciBhbGxcbiAgICAgKiByZWdpc3RlcmVkIGNhbGxiYWNrcy5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBldmVudFxuICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IGZuXG4gICAgICovXG5cbiAgICBWdWUucHJvdG90eXBlLiRvZmYgPSBmdW5jdGlvbiAoZXZlbnQsIGZuKSB7XG4gICAgICB2YXIgY2JzO1xuICAgICAgLy8gYWxsXG4gICAgICBpZiAoIWFyZ3VtZW50cy5sZW5ndGgpIHtcbiAgICAgICAgaWYgKHRoaXMuJHBhcmVudCkge1xuICAgICAgICAgIGZvciAoZXZlbnQgaW4gdGhpcy5fZXZlbnRzKSB7XG4gICAgICAgICAgICBjYnMgPSB0aGlzLl9ldmVudHNbZXZlbnRdO1xuICAgICAgICAgICAgaWYgKGNicykge1xuICAgICAgICAgICAgICBtb2RpZnlMaXN0ZW5lckNvdW50KHRoaXMsIGV2ZW50LCAtY2JzLmxlbmd0aCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHRoaXMuX2V2ZW50cyA9IHt9O1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgIH1cbiAgICAgIC8vIHNwZWNpZmljIGV2ZW50XG4gICAgICBjYnMgPSB0aGlzLl9ldmVudHNbZXZlbnRdO1xuICAgICAgaWYgKCFjYnMpIHtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICB9XG4gICAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMSkge1xuICAgICAgICBtb2RpZnlMaXN0ZW5lckNvdW50KHRoaXMsIGV2ZW50LCAtY2JzLmxlbmd0aCk7XG4gICAgICAgIHRoaXMuX2V2ZW50c1tldmVudF0gPSBudWxsO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgIH1cbiAgICAgIC8vIHNwZWNpZmljIGhhbmRsZXJcbiAgICAgIHZhciBjYjtcbiAgICAgIHZhciBpID0gY2JzLmxlbmd0aDtcbiAgICAgIHdoaWxlIChpLS0pIHtcbiAgICAgICAgY2IgPSBjYnNbaV07XG4gICAgICAgIGlmIChjYiA9PT0gZm4gfHwgY2IuZm4gPT09IGZuKSB7XG4gICAgICAgICAgbW9kaWZ5TGlzdGVuZXJDb3VudCh0aGlzLCBldmVudCwgLTEpO1xuICAgICAgICAgIGNicy5zcGxpY2UoaSwgMSk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBUcmlnZ2VyIGFuIGV2ZW50IG9uIHNlbGYuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge1N0cmluZ3xPYmplY3R9IGV2ZW50XG4gICAgICogQHJldHVybiB7Qm9vbGVhbn0gc2hvdWxkUHJvcGFnYXRlXG4gICAgICovXG5cbiAgICBWdWUucHJvdG90eXBlLiRlbWl0ID0gZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICB2YXIgaXNTb3VyY2UgPSB0eXBlb2YgZXZlbnQgPT09ICdzdHJpbmcnO1xuICAgICAgZXZlbnQgPSBpc1NvdXJjZSA/IGV2ZW50IDogZXZlbnQubmFtZTtcbiAgICAgIHZhciBjYnMgPSB0aGlzLl9ldmVudHNbZXZlbnRdO1xuICAgICAgdmFyIHNob3VsZFByb3BhZ2F0ZSA9IGlzU291cmNlIHx8ICFjYnM7XG4gICAgICBpZiAoY2JzKSB7XG4gICAgICAgIGNicyA9IGNicy5sZW5ndGggPiAxID8gdG9BcnJheShjYnMpIDogY2JzO1xuICAgICAgICAvLyB0aGlzIGlzIGEgc29tZXdoYXQgaGFja3kgc29sdXRpb24gdG8gdGhlIHF1ZXN0aW9uIHJhaXNlZFxuICAgICAgICAvLyBpbiAjMjEwMjogZm9yIGFuIGlubGluZSBjb21wb25lbnQgbGlzdGVuZXIgbGlrZSA8Y29tcCBAdGVzdD1cImRvVGhpc1wiPixcbiAgICAgICAgLy8gdGhlIHByb3BhZ2F0aW9uIGhhbmRsaW5nIGlzIHNvbWV3aGF0IGJyb2tlbi4gVGhlcmVmb3JlIHdlXG4gICAgICAgIC8vIG5lZWQgdG8gdHJlYXQgdGhlc2UgaW5saW5lIGNhbGxiYWNrcyBkaWZmZXJlbnRseS5cbiAgICAgICAgdmFyIGhhc1BhcmVudENicyA9IGlzU291cmNlICYmIGNicy5zb21lKGZ1bmN0aW9uIChjYikge1xuICAgICAgICAgIHJldHVybiBjYi5fZnJvbVBhcmVudDtcbiAgICAgICAgfSk7XG4gICAgICAgIGlmIChoYXNQYXJlbnRDYnMpIHtcbiAgICAgICAgICBzaG91bGRQcm9wYWdhdGUgPSBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICB2YXIgYXJncyA9IHRvQXJyYXkoYXJndW1lbnRzLCAxKTtcbiAgICAgICAgZm9yICh2YXIgaSA9IDAsIGwgPSBjYnMubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG4gICAgICAgICAgdmFyIGNiID0gY2JzW2ldO1xuICAgICAgICAgIHZhciByZXMgPSBjYi5hcHBseSh0aGlzLCBhcmdzKTtcbiAgICAgICAgICBpZiAocmVzID09PSB0cnVlICYmICghaGFzUGFyZW50Q2JzIHx8IGNiLl9mcm9tUGFyZW50KSkge1xuICAgICAgICAgICAgc2hvdWxkUHJvcGFnYXRlID0gdHJ1ZTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiBzaG91bGRQcm9wYWdhdGU7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIFJlY3Vyc2l2ZWx5IGJyb2FkY2FzdCBhbiBldmVudCB0byBhbGwgY2hpbGRyZW4gaW5zdGFuY2VzLlxuICAgICAqXG4gICAgICogQHBhcmFtIHtTdHJpbmd8T2JqZWN0fSBldmVudFxuICAgICAqIEBwYXJhbSB7Li4uKn0gYWRkaXRpb25hbCBhcmd1bWVudHNcbiAgICAgKi9cblxuICAgIFZ1ZS5wcm90b3R5cGUuJGJyb2FkY2FzdCA9IGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgdmFyIGlzU291cmNlID0gdHlwZW9mIGV2ZW50ID09PSAnc3RyaW5nJztcbiAgICAgIGV2ZW50ID0gaXNTb3VyY2UgPyBldmVudCA6IGV2ZW50Lm5hbWU7XG4gICAgICAvLyBpZiBubyBjaGlsZCBoYXMgcmVnaXN0ZXJlZCBmb3IgdGhpcyBldmVudCxcbiAgICAgIC8vIHRoZW4gdGhlcmUncyBubyBuZWVkIHRvIGJyb2FkY2FzdC5cbiAgICAgIGlmICghdGhpcy5fZXZlbnRzQ291bnRbZXZlbnRdKSByZXR1cm47XG4gICAgICB2YXIgY2hpbGRyZW4gPSB0aGlzLiRjaGlsZHJlbjtcbiAgICAgIHZhciBhcmdzID0gdG9BcnJheShhcmd1bWVudHMpO1xuICAgICAgaWYgKGlzU291cmNlKSB7XG4gICAgICAgIC8vIHVzZSBvYmplY3QgZXZlbnQgdG8gaW5kaWNhdGUgbm9uLXNvdXJjZSBlbWl0XG4gICAgICAgIC8vIG9uIGNoaWxkcmVuXG4gICAgICAgIGFyZ3NbMF0gPSB7IG5hbWU6IGV2ZW50LCBzb3VyY2U6IHRoaXMgfTtcbiAgICAgIH1cbiAgICAgIGZvciAodmFyIGkgPSAwLCBsID0gY2hpbGRyZW4ubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG4gICAgICAgIHZhciBjaGlsZCA9IGNoaWxkcmVuW2ldO1xuICAgICAgICB2YXIgc2hvdWxkUHJvcGFnYXRlID0gY2hpbGQuJGVtaXQuYXBwbHkoY2hpbGQsIGFyZ3MpO1xuICAgICAgICBpZiAoc2hvdWxkUHJvcGFnYXRlKSB7XG4gICAgICAgICAgY2hpbGQuJGJyb2FkY2FzdC5hcHBseShjaGlsZCwgYXJncyk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBSZWN1cnNpdmVseSBwcm9wYWdhdGUgYW4gZXZlbnQgdXAgdGhlIHBhcmVudCBjaGFpbi5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBldmVudFxuICAgICAqIEBwYXJhbSB7Li4uKn0gYWRkaXRpb25hbCBhcmd1bWVudHNcbiAgICAgKi9cblxuICAgIFZ1ZS5wcm90b3R5cGUuJGRpc3BhdGNoID0gZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICB2YXIgc2hvdWxkUHJvcGFnYXRlID0gdGhpcy4kZW1pdC5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgICAgaWYgKCFzaG91bGRQcm9wYWdhdGUpIHJldHVybjtcbiAgICAgIHZhciBwYXJlbnQgPSB0aGlzLiRwYXJlbnQ7XG4gICAgICB2YXIgYXJncyA9IHRvQXJyYXkoYXJndW1lbnRzKTtcbiAgICAgIC8vIHVzZSBvYmplY3QgZXZlbnQgdG8gaW5kaWNhdGUgbm9uLXNvdXJjZSBlbWl0XG4gICAgICAvLyBvbiBwYXJlbnRzXG4gICAgICBhcmdzWzBdID0geyBuYW1lOiBldmVudCwgc291cmNlOiB0aGlzIH07XG4gICAgICB3aGlsZSAocGFyZW50KSB7XG4gICAgICAgIHNob3VsZFByb3BhZ2F0ZSA9IHBhcmVudC4kZW1pdC5hcHBseShwYXJlbnQsIGFyZ3MpO1xuICAgICAgICBwYXJlbnQgPSBzaG91bGRQcm9wYWdhdGUgPyBwYXJlbnQuJHBhcmVudCA6IG51bGw7XG4gICAgICB9XG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogTW9kaWZ5IHRoZSBsaXN0ZW5lciBjb3VudHMgb24gYWxsIHBhcmVudHMuXG4gICAgICogVGhpcyBib29ra2VlcGluZyBhbGxvd3MgJGJyb2FkY2FzdCB0byByZXR1cm4gZWFybHkgd2hlblxuICAgICAqIG5vIGNoaWxkIGhhcyBsaXN0ZW5lZCB0byBhIGNlcnRhaW4gZXZlbnQuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge1Z1ZX0gdm1cbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gZXZlbnRcbiAgICAgKiBAcGFyYW0ge051bWJlcn0gY291bnRcbiAgICAgKi9cblxuICAgIHZhciBob29rUkUgPSAvXmhvb2s6LztcbiAgICBmdW5jdGlvbiBtb2RpZnlMaXN0ZW5lckNvdW50KHZtLCBldmVudCwgY291bnQpIHtcbiAgICAgIHZhciBwYXJlbnQgPSB2bS4kcGFyZW50O1xuICAgICAgLy8gaG9va3MgZG8gbm90IGdldCBicm9hZGNhc3RlZCBzbyBubyBuZWVkXG4gICAgICAvLyB0byBkbyBib29ra2VlcGluZyBmb3IgdGhlbVxuICAgICAgaWYgKCFwYXJlbnQgfHwgIWNvdW50IHx8IGhvb2tSRS50ZXN0KGV2ZW50KSkgcmV0dXJuO1xuICAgICAgd2hpbGUgKHBhcmVudCkge1xuICAgICAgICBwYXJlbnQuX2V2ZW50c0NvdW50W2V2ZW50XSA9IChwYXJlbnQuX2V2ZW50c0NvdW50W2V2ZW50XSB8fCAwKSArIGNvdW50O1xuICAgICAgICBwYXJlbnQgPSBwYXJlbnQuJHBhcmVudDtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBsaWZlY3ljbGVBUEkgKFZ1ZSkge1xuICAgIC8qKlxuICAgICAqIFNldCBpbnN0YW5jZSB0YXJnZXQgZWxlbWVudCBhbmQga2ljayBvZmYgdGhlIGNvbXBpbGF0aW9uXG4gICAgICogcHJvY2Vzcy4gVGhlIHBhc3NlZCBpbiBgZWxgIGNhbiBiZSBhIHNlbGVjdG9yIHN0cmluZywgYW5cbiAgICAgKiBleGlzdGluZyBFbGVtZW50LCBvciBhIERvY3VtZW50RnJhZ21lbnQgKGZvciBibG9ja1xuICAgICAqIGluc3RhbmNlcykuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge0VsZW1lbnR8RG9jdW1lbnRGcmFnbWVudHxzdHJpbmd9IGVsXG4gICAgICogQHB1YmxpY1xuICAgICAqL1xuXG4gICAgVnVlLnByb3RvdHlwZS4kbW91bnQgPSBmdW5jdGlvbiAoZWwpIHtcbiAgICAgIGlmICh0aGlzLl9pc0NvbXBpbGVkKSB7XG4gICAgICAgICdkZXZlbG9wbWVudCcgIT09ICdwcm9kdWN0aW9uJyAmJiB3YXJuKCckbW91bnQoKSBzaG91bGQgYmUgY2FsbGVkIG9ubHkgb25jZS4nLCB0aGlzKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgZWwgPSBxdWVyeShlbCk7XG4gICAgICBpZiAoIWVsKSB7XG4gICAgICAgIGVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICB9XG4gICAgICB0aGlzLl9jb21waWxlKGVsKTtcbiAgICAgIHRoaXMuX2luaXRET01Ib29rcygpO1xuICAgICAgaWYgKGluRG9jKHRoaXMuJGVsKSkge1xuICAgICAgICB0aGlzLl9jYWxsSG9vaygnYXR0YWNoZWQnKTtcbiAgICAgICAgcmVhZHkuY2FsbCh0aGlzKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuJG9uY2UoJ2hvb2s6YXR0YWNoZWQnLCByZWFkeSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogTWFyayBhbiBpbnN0YW5jZSBhcyByZWFkeS5cbiAgICAgKi9cblxuICAgIGZ1bmN0aW9uIHJlYWR5KCkge1xuICAgICAgdGhpcy5faXNBdHRhY2hlZCA9IHRydWU7XG4gICAgICB0aGlzLl9pc1JlYWR5ID0gdHJ1ZTtcbiAgICAgIHRoaXMuX2NhbGxIb29rKCdyZWFkeScpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFRlYXJkb3duIHRoZSBpbnN0YW5jZSwgc2ltcGx5IGRlbGVnYXRlIHRvIHRoZSBpbnRlcm5hbFxuICAgICAqIF9kZXN0cm95LlxuICAgICAqXG4gICAgICogQHBhcmFtIHtCb29sZWFufSByZW1vdmVcbiAgICAgKiBAcGFyYW0ge0Jvb2xlYW59IGRlZmVyQ2xlYW51cFxuICAgICAqL1xuXG4gICAgVnVlLnByb3RvdHlwZS4kZGVzdHJveSA9IGZ1bmN0aW9uIChyZW1vdmUsIGRlZmVyQ2xlYW51cCkge1xuICAgICAgdGhpcy5fZGVzdHJveShyZW1vdmUsIGRlZmVyQ2xlYW51cCk7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIFBhcnRpYWxseSBjb21waWxlIGEgcGllY2Ugb2YgRE9NIGFuZCByZXR1cm4gYVxuICAgICAqIGRlY29tcGlsZSBmdW5jdGlvbi5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7RWxlbWVudHxEb2N1bWVudEZyYWdtZW50fSBlbFxuICAgICAqIEBwYXJhbSB7VnVlfSBbaG9zdF1cbiAgICAgKiBAcGFyYW0ge09iamVjdH0gW3Njb3BlXVxuICAgICAqIEBwYXJhbSB7RnJhZ21lbnR9IFtmcmFnXVxuICAgICAqIEByZXR1cm4ge0Z1bmN0aW9ufVxuICAgICAqL1xuXG4gICAgVnVlLnByb3RvdHlwZS4kY29tcGlsZSA9IGZ1bmN0aW9uIChlbCwgaG9zdCwgc2NvcGUsIGZyYWcpIHtcbiAgICAgIHJldHVybiBjb21waWxlKGVsLCB0aGlzLiRvcHRpb25zLCB0cnVlKSh0aGlzLCBlbCwgaG9zdCwgc2NvcGUsIGZyYWcpO1xuICAgIH07XG4gIH1cblxuICAvKipcbiAgICogVGhlIGV4cG9zZWQgVnVlIGNvbnN0cnVjdG9yLlxuICAgKlxuICAgKiBBUEkgY29udmVudGlvbnM6XG4gICAqIC0gcHVibGljIEFQSSBtZXRob2RzL3Byb3BlcnRpZXMgYXJlIHByZWZpeGVkIHdpdGggYCRgXG4gICAqIC0gaW50ZXJuYWwgbWV0aG9kcy9wcm9wZXJ0aWVzIGFyZSBwcmVmaXhlZCB3aXRoIGBfYFxuICAgKiAtIG5vbi1wcmVmaXhlZCBwcm9wZXJ0aWVzIGFyZSBhc3N1bWVkIHRvIGJlIHByb3hpZWQgdXNlclxuICAgKiAgIGRhdGEuXG4gICAqXG4gICAqIEBjb25zdHJ1Y3RvclxuICAgKiBAcGFyYW0ge09iamVjdH0gW29wdGlvbnNdXG4gICAqIEBwdWJsaWNcbiAgICovXG5cbiAgZnVuY3Rpb24gVnVlKG9wdGlvbnMpIHtcbiAgICB0aGlzLl9pbml0KG9wdGlvbnMpO1xuICB9XG5cbiAgLy8gaW5zdGFsbCBpbnRlcm5hbHNcbiAgaW5pdE1peGluKFZ1ZSk7XG4gIHN0YXRlTWl4aW4oVnVlKTtcbiAgZXZlbnRzTWl4aW4oVnVlKTtcbiAgbGlmZWN5Y2xlTWl4aW4oVnVlKTtcbiAgbWlzY01peGluKFZ1ZSk7XG5cbiAgLy8gaW5zdGFsbCBpbnN0YW5jZSBBUElzXG4gIGRhdGFBUEkoVnVlKTtcbiAgZG9tQVBJKFZ1ZSk7XG4gIGV2ZW50c0FQSShWdWUpO1xuICBsaWZlY3ljbGVBUEkoVnVlKTtcblxuICB2YXIgc2xvdCA9IHtcblxuICAgIHByaW9yaXR5OiBTTE9ULFxuICAgIHBhcmFtczogWyduYW1lJ10sXG5cbiAgICBiaW5kOiBmdW5jdGlvbiBiaW5kKCkge1xuICAgICAgLy8gdGhpcyB3YXMgcmVzb2x2ZWQgZHVyaW5nIGNvbXBvbmVudCB0cmFuc2NsdXNpb25cbiAgICAgIHZhciBuYW1lID0gdGhpcy5wYXJhbXMubmFtZSB8fCAnZGVmYXVsdCc7XG4gICAgICB2YXIgY29udGVudCA9IHRoaXMudm0uX3Nsb3RDb250ZW50cyAmJiB0aGlzLnZtLl9zbG90Q29udGVudHNbbmFtZV07XG4gICAgICBpZiAoIWNvbnRlbnQgfHwgIWNvbnRlbnQuaGFzQ2hpbGROb2RlcygpKSB7XG4gICAgICAgIHRoaXMuZmFsbGJhY2soKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuY29tcGlsZShjb250ZW50LmNsb25lTm9kZSh0cnVlKSwgdGhpcy52bS5fY29udGV4dCwgdGhpcy52bSk7XG4gICAgICB9XG4gICAgfSxcblxuICAgIGNvbXBpbGU6IGZ1bmN0aW9uIGNvbXBpbGUoY29udGVudCwgY29udGV4dCwgaG9zdCkge1xuICAgICAgaWYgKGNvbnRlbnQgJiYgY29udGV4dCkge1xuICAgICAgICBpZiAodGhpcy5lbC5oYXNDaGlsZE5vZGVzKCkgJiYgY29udGVudC5jaGlsZE5vZGVzLmxlbmd0aCA9PT0gMSAmJiBjb250ZW50LmNoaWxkTm9kZXNbMF0ubm9kZVR5cGUgPT09IDEgJiYgY29udGVudC5jaGlsZE5vZGVzWzBdLmhhc0F0dHJpYnV0ZSgndi1pZicpKSB7XG4gICAgICAgICAgLy8gaWYgdGhlIGluc2VydGVkIHNsb3QgaGFzIHYtaWZcbiAgICAgICAgICAvLyBpbmplY3QgZmFsbGJhY2sgY29udGVudCBhcyB0aGUgdi1lbHNlXG4gICAgICAgICAgdmFyIGVsc2VCbG9jayA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3RlbXBsYXRlJyk7XG4gICAgICAgICAgZWxzZUJsb2NrLnNldEF0dHJpYnV0ZSgndi1lbHNlJywgJycpO1xuICAgICAgICAgIGVsc2VCbG9jay5pbm5lckhUTUwgPSB0aGlzLmVsLmlubmVySFRNTDtcbiAgICAgICAgICAvLyB0aGUgZWxzZSBibG9jayBzaG91bGQgYmUgY29tcGlsZWQgaW4gY2hpbGQgc2NvcGVcbiAgICAgICAgICBlbHNlQmxvY2suX2NvbnRleHQgPSB0aGlzLnZtO1xuICAgICAgICAgIGNvbnRlbnQuYXBwZW5kQ2hpbGQoZWxzZUJsb2NrKTtcbiAgICAgICAgfVxuICAgICAgICB2YXIgc2NvcGUgPSBob3N0ID8gaG9zdC5fc2NvcGUgOiB0aGlzLl9zY29wZTtcbiAgICAgICAgdGhpcy51bmxpbmsgPSBjb250ZXh0LiRjb21waWxlKGNvbnRlbnQsIGhvc3QsIHNjb3BlLCB0aGlzLl9mcmFnKTtcbiAgICAgIH1cbiAgICAgIGlmIChjb250ZW50KSB7XG4gICAgICAgIHJlcGxhY2UodGhpcy5lbCwgY29udGVudCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZW1vdmUodGhpcy5lbCk7XG4gICAgICB9XG4gICAgfSxcblxuICAgIGZhbGxiYWNrOiBmdW5jdGlvbiBmYWxsYmFjaygpIHtcbiAgICAgIHRoaXMuY29tcGlsZShleHRyYWN0Q29udGVudCh0aGlzLmVsLCB0cnVlKSwgdGhpcy52bSk7XG4gICAgfSxcblxuICAgIHVuYmluZDogZnVuY3Rpb24gdW5iaW5kKCkge1xuICAgICAgaWYgKHRoaXMudW5saW5rKSB7XG4gICAgICAgIHRoaXMudW5saW5rKCk7XG4gICAgICB9XG4gICAgfVxuICB9O1xuXG4gIHZhciBwYXJ0aWFsID0ge1xuXG4gICAgcHJpb3JpdHk6IFBBUlRJQUwsXG5cbiAgICBwYXJhbXM6IFsnbmFtZSddLFxuXG4gICAgLy8gd2F0Y2ggY2hhbmdlcyB0byBuYW1lIGZvciBkeW5hbWljIHBhcnRpYWxzXG4gICAgcGFyYW1XYXRjaGVyczoge1xuICAgICAgbmFtZTogZnVuY3Rpb24gbmFtZSh2YWx1ZSkge1xuICAgICAgICB2SWYucmVtb3ZlLmNhbGwodGhpcyk7XG4gICAgICAgIGlmICh2YWx1ZSkge1xuICAgICAgICAgIHRoaXMuaW5zZXJ0KHZhbHVlKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0sXG5cbiAgICBiaW5kOiBmdW5jdGlvbiBiaW5kKCkge1xuICAgICAgdGhpcy5hbmNob3IgPSBjcmVhdGVBbmNob3IoJ3YtcGFydGlhbCcpO1xuICAgICAgcmVwbGFjZSh0aGlzLmVsLCB0aGlzLmFuY2hvcik7XG4gICAgICB0aGlzLmluc2VydCh0aGlzLnBhcmFtcy5uYW1lKTtcbiAgICB9LFxuXG4gICAgaW5zZXJ0OiBmdW5jdGlvbiBpbnNlcnQoaWQpIHtcbiAgICAgIHZhciBwYXJ0aWFsID0gcmVzb2x2ZUFzc2V0KHRoaXMudm0uJG9wdGlvbnMsICdwYXJ0aWFscycsIGlkLCB0cnVlKTtcbiAgICAgIGlmIChwYXJ0aWFsKSB7XG4gICAgICAgIHRoaXMuZmFjdG9yeSA9IG5ldyBGcmFnbWVudEZhY3RvcnkodGhpcy52bSwgcGFydGlhbCk7XG4gICAgICAgIHZJZi5pbnNlcnQuY2FsbCh0aGlzKTtcbiAgICAgIH1cbiAgICB9LFxuXG4gICAgdW5iaW5kOiBmdW5jdGlvbiB1bmJpbmQoKSB7XG4gICAgICBpZiAodGhpcy5mcmFnKSB7XG4gICAgICAgIHRoaXMuZnJhZy5kZXN0cm95KCk7XG4gICAgICB9XG4gICAgfVxuICB9O1xuXG4gIHZhciBlbGVtZW50RGlyZWN0aXZlcyA9IHtcbiAgICBzbG90OiBzbG90LFxuICAgIHBhcnRpYWw6IHBhcnRpYWxcbiAgfTtcblxuICB2YXIgY29udmVydEFycmF5ID0gdkZvci5fcG9zdFByb2Nlc3M7XG5cbiAgLyoqXG4gICAqIExpbWl0IGZpbHRlciBmb3IgYXJyYXlzXG4gICAqXG4gICAqIEBwYXJhbSB7TnVtYmVyfSBuXG4gICAqIEBwYXJhbSB7TnVtYmVyfSBvZmZzZXQgKERlY2ltYWwgZXhwZWN0ZWQpXG4gICAqL1xuXG4gIGZ1bmN0aW9uIGxpbWl0QnkoYXJyLCBuLCBvZmZzZXQpIHtcbiAgICBvZmZzZXQgPSBvZmZzZXQgPyBwYXJzZUludChvZmZzZXQsIDEwKSA6IDA7XG4gICAgbiA9IHRvTnVtYmVyKG4pO1xuICAgIHJldHVybiB0eXBlb2YgbiA9PT0gJ251bWJlcicgPyBhcnIuc2xpY2Uob2Zmc2V0LCBvZmZzZXQgKyBuKSA6IGFycjtcbiAgfVxuXG4gIC8qKlxuICAgKiBGaWx0ZXIgZmlsdGVyIGZvciBhcnJheXNcbiAgICpcbiAgICogQHBhcmFtIHtTdHJpbmd9IHNlYXJjaFxuICAgKiBAcGFyYW0ge1N0cmluZ30gW2RlbGltaXRlcl1cbiAgICogQHBhcmFtIHtTdHJpbmd9IC4uLmRhdGFLZXlzXG4gICAqL1xuXG4gIGZ1bmN0aW9uIGZpbHRlckJ5KGFyciwgc2VhcmNoLCBkZWxpbWl0ZXIpIHtcbiAgICBhcnIgPSBjb252ZXJ0QXJyYXkoYXJyKTtcbiAgICBpZiAoc2VhcmNoID09IG51bGwpIHtcbiAgICAgIHJldHVybiBhcnI7XG4gICAgfVxuICAgIGlmICh0eXBlb2Ygc2VhcmNoID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICByZXR1cm4gYXJyLmZpbHRlcihzZWFyY2gpO1xuICAgIH1cbiAgICAvLyBjYXN0IHRvIGxvd2VyY2FzZSBzdHJpbmdcbiAgICBzZWFyY2ggPSAoJycgKyBzZWFyY2gpLnRvTG93ZXJDYXNlKCk7XG4gICAgLy8gYWxsb3cgb3B0aW9uYWwgYGluYCBkZWxpbWl0ZXJcbiAgICAvLyBiZWNhdXNlIHdoeSBub3RcbiAgICB2YXIgbiA9IGRlbGltaXRlciA9PT0gJ2luJyA/IDMgOiAyO1xuICAgIC8vIGV4dHJhY3QgYW5kIGZsYXR0ZW4ga2V5c1xuICAgIHZhciBrZXlzID0gQXJyYXkucHJvdG90eXBlLmNvbmNhdC5hcHBseShbXSwgdG9BcnJheShhcmd1bWVudHMsIG4pKTtcbiAgICB2YXIgcmVzID0gW107XG4gICAgdmFyIGl0ZW0sIGtleSwgdmFsLCBqO1xuICAgIGZvciAodmFyIGkgPSAwLCBsID0gYXJyLmxlbmd0aDsgaSA8IGw7IGkrKykge1xuICAgICAgaXRlbSA9IGFycltpXTtcbiAgICAgIHZhbCA9IGl0ZW0gJiYgaXRlbS4kdmFsdWUgfHwgaXRlbTtcbiAgICAgIGogPSBrZXlzLmxlbmd0aDtcbiAgICAgIGlmIChqKSB7XG4gICAgICAgIHdoaWxlIChqLS0pIHtcbiAgICAgICAgICBrZXkgPSBrZXlzW2pdO1xuICAgICAgICAgIGlmIChrZXkgPT09ICcka2V5JyAmJiBjb250YWlucyhpdGVtLiRrZXksIHNlYXJjaCkgfHwgY29udGFpbnMoZ2V0UGF0aCh2YWwsIGtleSksIHNlYXJjaCkpIHtcbiAgICAgICAgICAgIHJlcy5wdXNoKGl0ZW0pO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9IGVsc2UgaWYgKGNvbnRhaW5zKGl0ZW0sIHNlYXJjaCkpIHtcbiAgICAgICAgcmVzLnB1c2goaXRlbSk7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiByZXM7XG4gIH1cblxuICAvKipcbiAgICogRmlsdGVyIGZpbHRlciBmb3IgYXJyYXlzXG4gICAqXG4gICAqIEBwYXJhbSB7U3RyaW5nfEFycmF5PFN0cmluZz58RnVuY3Rpb259IC4uLnNvcnRLZXlzXG4gICAqIEBwYXJhbSB7TnVtYmVyfSBbb3JkZXJdXG4gICAqL1xuXG4gIGZ1bmN0aW9uIG9yZGVyQnkoYXJyKSB7XG4gICAgdmFyIGNvbXBhcmF0b3IgPSBudWxsO1xuICAgIHZhciBzb3J0S2V5cyA9IHVuZGVmaW5lZDtcbiAgICBhcnIgPSBjb252ZXJ0QXJyYXkoYXJyKTtcblxuICAgIC8vIGRldGVybWluZSBvcmRlciAobGFzdCBhcmd1bWVudClcbiAgICB2YXIgYXJncyA9IHRvQXJyYXkoYXJndW1lbnRzLCAxKTtcbiAgICB2YXIgb3JkZXIgPSBhcmdzW2FyZ3MubGVuZ3RoIC0gMV07XG4gICAgaWYgKHR5cGVvZiBvcmRlciA9PT0gJ251bWJlcicpIHtcbiAgICAgIG9yZGVyID0gb3JkZXIgPCAwID8gLTEgOiAxO1xuICAgICAgYXJncyA9IGFyZ3MubGVuZ3RoID4gMSA/IGFyZ3Muc2xpY2UoMCwgLTEpIDogYXJncztcbiAgICB9IGVsc2Uge1xuICAgICAgb3JkZXIgPSAxO1xuICAgIH1cblxuICAgIC8vIGRldGVybWluZSBzb3J0S2V5cyAmIGNvbXBhcmF0b3JcbiAgICB2YXIgZmlyc3RBcmcgPSBhcmdzWzBdO1xuICAgIGlmICghZmlyc3RBcmcpIHtcbiAgICAgIHJldHVybiBhcnI7XG4gICAgfSBlbHNlIGlmICh0eXBlb2YgZmlyc3RBcmcgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIC8vIGN1c3RvbSBjb21wYXJhdG9yXG4gICAgICBjb21wYXJhdG9yID0gZnVuY3Rpb24gKGEsIGIpIHtcbiAgICAgICAgcmV0dXJuIGZpcnN0QXJnKGEsIGIpICogb3JkZXI7XG4gICAgICB9O1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyBzdHJpbmcga2V5cy4gZmxhdHRlbiBmaXJzdFxuICAgICAgc29ydEtleXMgPSBBcnJheS5wcm90b3R5cGUuY29uY2F0LmFwcGx5KFtdLCBhcmdzKTtcbiAgICAgIGNvbXBhcmF0b3IgPSBmdW5jdGlvbiAoYSwgYiwgaSkge1xuICAgICAgICBpID0gaSB8fCAwO1xuICAgICAgICByZXR1cm4gaSA+PSBzb3J0S2V5cy5sZW5ndGggLSAxID8gYmFzZUNvbXBhcmUoYSwgYiwgaSkgOiBiYXNlQ29tcGFyZShhLCBiLCBpKSB8fCBjb21wYXJhdG9yKGEsIGIsIGkgKyAxKTtcbiAgICAgIH07XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gYmFzZUNvbXBhcmUoYSwgYiwgc29ydEtleUluZGV4KSB7XG4gICAgICB2YXIgc29ydEtleSA9IHNvcnRLZXlzW3NvcnRLZXlJbmRleF07XG4gICAgICBpZiAoc29ydEtleSkge1xuICAgICAgICBpZiAoc29ydEtleSAhPT0gJyRrZXknKSB7XG4gICAgICAgICAgaWYgKGlzT2JqZWN0KGEpICYmICckdmFsdWUnIGluIGEpIGEgPSBhLiR2YWx1ZTtcbiAgICAgICAgICBpZiAoaXNPYmplY3QoYikgJiYgJyR2YWx1ZScgaW4gYikgYiA9IGIuJHZhbHVlO1xuICAgICAgICB9XG4gICAgICAgIGEgPSBpc09iamVjdChhKSA/IGdldFBhdGgoYSwgc29ydEtleSkgOiBhO1xuICAgICAgICBiID0gaXNPYmplY3QoYikgPyBnZXRQYXRoKGIsIHNvcnRLZXkpIDogYjtcbiAgICAgIH1cbiAgICAgIHJldHVybiBhID09PSBiID8gMCA6IGEgPiBiID8gb3JkZXIgOiAtb3JkZXI7XG4gICAgfVxuXG4gICAgLy8gc29ydCBvbiBhIGNvcHkgdG8gYXZvaWQgbXV0YXRpbmcgb3JpZ2luYWwgYXJyYXlcbiAgICByZXR1cm4gYXJyLnNsaWNlKCkuc29ydChjb21wYXJhdG9yKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTdHJpbmcgY29udGFpbiBoZWxwZXJcbiAgICpcbiAgICogQHBhcmFtIHsqfSB2YWxcbiAgICogQHBhcmFtIHtTdHJpbmd9IHNlYXJjaFxuICAgKi9cblxuICBmdW5jdGlvbiBjb250YWlucyh2YWwsIHNlYXJjaCkge1xuICAgIHZhciBpO1xuICAgIGlmIChpc1BsYWluT2JqZWN0KHZhbCkpIHtcbiAgICAgIHZhciBrZXlzID0gT2JqZWN0LmtleXModmFsKTtcbiAgICAgIGkgPSBrZXlzLmxlbmd0aDtcbiAgICAgIHdoaWxlIChpLS0pIHtcbiAgICAgICAgaWYgKGNvbnRhaW5zKHZhbFtrZXlzW2ldXSwgc2VhcmNoKSkge1xuICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSBlbHNlIGlmIChpc0FycmF5KHZhbCkpIHtcbiAgICAgIGkgPSB2YWwubGVuZ3RoO1xuICAgICAgd2hpbGUgKGktLSkge1xuICAgICAgICBpZiAoY29udGFpbnModmFsW2ldLCBzZWFyY2gpKSB7XG4gICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKHZhbCAhPSBudWxsKSB7XG4gICAgICByZXR1cm4gdmFsLnRvU3RyaW5nKCkudG9Mb3dlckNhc2UoKS5pbmRleE9mKHNlYXJjaCkgPiAtMTtcbiAgICB9XG4gIH1cblxuICB2YXIgZGlnaXRzUkUgPSAvKFxcZHszfSkoPz1cXGQpL2c7XG5cbiAgLy8gYXNzZXQgY29sbGVjdGlvbnMgbXVzdCBiZSBhIHBsYWluIG9iamVjdC5cbiAgdmFyIGZpbHRlcnMgPSB7XG5cbiAgICBvcmRlckJ5OiBvcmRlckJ5LFxuICAgIGZpbHRlckJ5OiBmaWx0ZXJCeSxcbiAgICBsaW1pdEJ5OiBsaW1pdEJ5LFxuXG4gICAgLyoqXG4gICAgICogU3RyaW5naWZ5IHZhbHVlLlxuICAgICAqXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IGluZGVudFxuICAgICAqL1xuXG4gICAganNvbjoge1xuICAgICAgcmVhZDogZnVuY3Rpb24gcmVhZCh2YWx1ZSwgaW5kZW50KSB7XG4gICAgICAgIHJldHVybiB0eXBlb2YgdmFsdWUgPT09ICdzdHJpbmcnID8gdmFsdWUgOiBKU09OLnN0cmluZ2lmeSh2YWx1ZSwgbnVsbCwgTnVtYmVyKGluZGVudCkgfHwgMik7XG4gICAgICB9LFxuICAgICAgd3JpdGU6IGZ1bmN0aW9uIHdyaXRlKHZhbHVlKSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgcmV0dXJuIEpTT04ucGFyc2UodmFsdWUpO1xuICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgcmV0dXJuIHZhbHVlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqICdhYmMnID0+ICdBYmMnXG4gICAgICovXG5cbiAgICBjYXBpdGFsaXplOiBmdW5jdGlvbiBjYXBpdGFsaXplKHZhbHVlKSB7XG4gICAgICBpZiAoIXZhbHVlICYmIHZhbHVlICE9PSAwKSByZXR1cm4gJyc7XG4gICAgICB2YWx1ZSA9IHZhbHVlLnRvU3RyaW5nKCk7XG4gICAgICByZXR1cm4gdmFsdWUuY2hhckF0KDApLnRvVXBwZXJDYXNlKCkgKyB2YWx1ZS5zbGljZSgxKTtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogJ2FiYycgPT4gJ0FCQydcbiAgICAgKi9cblxuICAgIHVwcGVyY2FzZTogZnVuY3Rpb24gdXBwZXJjYXNlKHZhbHVlKSB7XG4gICAgICByZXR1cm4gdmFsdWUgfHwgdmFsdWUgPT09IDAgPyB2YWx1ZS50b1N0cmluZygpLnRvVXBwZXJDYXNlKCkgOiAnJztcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogJ0FiQycgPT4gJ2FiYydcbiAgICAgKi9cblxuICAgIGxvd2VyY2FzZTogZnVuY3Rpb24gbG93ZXJjYXNlKHZhbHVlKSB7XG4gICAgICByZXR1cm4gdmFsdWUgfHwgdmFsdWUgPT09IDAgPyB2YWx1ZS50b1N0cmluZygpLnRvTG93ZXJDYXNlKCkgOiAnJztcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogMTIzNDUgPT4gJDEyLDM0NS4wMFxuICAgICAqXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IHNpZ25cbiAgICAgKiBAcGFyYW0ge051bWJlcn0gZGVjaW1hbHMgRGVjaW1hbCBwbGFjZXNcbiAgICAgKi9cblxuICAgIGN1cnJlbmN5OiBmdW5jdGlvbiBjdXJyZW5jeSh2YWx1ZSwgX2N1cnJlbmN5LCBkZWNpbWFscykge1xuICAgICAgdmFsdWUgPSBwYXJzZUZsb2F0KHZhbHVlKTtcbiAgICAgIGlmICghaXNGaW5pdGUodmFsdWUpIHx8ICF2YWx1ZSAmJiB2YWx1ZSAhPT0gMCkgcmV0dXJuICcnO1xuICAgICAgX2N1cnJlbmN5ID0gX2N1cnJlbmN5ICE9IG51bGwgPyBfY3VycmVuY3kgOiAnJCc7XG4gICAgICBkZWNpbWFscyA9IGRlY2ltYWxzICE9IG51bGwgPyBkZWNpbWFscyA6IDI7XG4gICAgICB2YXIgc3RyaW5naWZpZWQgPSBNYXRoLmFicyh2YWx1ZSkudG9GaXhlZChkZWNpbWFscyk7XG4gICAgICB2YXIgX2ludCA9IGRlY2ltYWxzID8gc3RyaW5naWZpZWQuc2xpY2UoMCwgLTEgLSBkZWNpbWFscykgOiBzdHJpbmdpZmllZDtcbiAgICAgIHZhciBpID0gX2ludC5sZW5ndGggJSAzO1xuICAgICAgdmFyIGhlYWQgPSBpID4gMCA/IF9pbnQuc2xpY2UoMCwgaSkgKyAoX2ludC5sZW5ndGggPiAzID8gJywnIDogJycpIDogJyc7XG4gICAgICB2YXIgX2Zsb2F0ID0gZGVjaW1hbHMgPyBzdHJpbmdpZmllZC5zbGljZSgtMSAtIGRlY2ltYWxzKSA6ICcnO1xuICAgICAgdmFyIHNpZ24gPSB2YWx1ZSA8IDAgPyAnLScgOiAnJztcbiAgICAgIHJldHVybiBzaWduICsgX2N1cnJlbmN5ICsgaGVhZCArIF9pbnQuc2xpY2UoaSkucmVwbGFjZShkaWdpdHNSRSwgJyQxLCcpICsgX2Zsb2F0O1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiAnaXRlbScgPT4gJ2l0ZW1zJ1xuICAgICAqXG4gICAgICogQHBhcmFtc1xuICAgICAqICBhbiBhcnJheSBvZiBzdHJpbmdzIGNvcnJlc3BvbmRpbmcgdG9cbiAgICAgKiAgdGhlIHNpbmdsZSwgZG91YmxlLCB0cmlwbGUgLi4uIGZvcm1zIG9mIHRoZSB3b3JkIHRvXG4gICAgICogIGJlIHBsdXJhbGl6ZWQuIFdoZW4gdGhlIG51bWJlciB0byBiZSBwbHVyYWxpemVkXG4gICAgICogIGV4Y2VlZHMgdGhlIGxlbmd0aCBvZiB0aGUgYXJncywgaXQgd2lsbCB1c2UgdGhlIGxhc3RcbiAgICAgKiAgZW50cnkgaW4gdGhlIGFycmF5LlxuICAgICAqXG4gICAgICogIGUuZy4gWydzaW5nbGUnLCAnZG91YmxlJywgJ3RyaXBsZScsICdtdWx0aXBsZSddXG4gICAgICovXG5cbiAgICBwbHVyYWxpemU6IGZ1bmN0aW9uIHBsdXJhbGl6ZSh2YWx1ZSkge1xuICAgICAgdmFyIGFyZ3MgPSB0b0FycmF5KGFyZ3VtZW50cywgMSk7XG4gICAgICByZXR1cm4gYXJncy5sZW5ndGggPiAxID8gYXJnc1t2YWx1ZSAlIDEwIC0gMV0gfHwgYXJnc1thcmdzLmxlbmd0aCAtIDFdIDogYXJnc1swXSArICh2YWx1ZSA9PT0gMSA/ICcnIDogJ3MnKTtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogRGVib3VuY2UgYSBoYW5kbGVyIGZ1bmN0aW9uLlxuICAgICAqXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gaGFuZGxlclxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSBkZWxheSA9IDMwMFxuICAgICAqIEByZXR1cm4ge0Z1bmN0aW9ufVxuICAgICAqL1xuXG4gICAgZGVib3VuY2U6IGZ1bmN0aW9uIGRlYm91bmNlKGhhbmRsZXIsIGRlbGF5KSB7XG4gICAgICBpZiAoIWhhbmRsZXIpIHJldHVybjtcbiAgICAgIGlmICghZGVsYXkpIHtcbiAgICAgICAgZGVsYXkgPSAzMDA7XG4gICAgICB9XG4gICAgICByZXR1cm4gX2RlYm91bmNlKGhhbmRsZXIsIGRlbGF5KTtcbiAgICB9XG4gIH07XG5cbiAgZnVuY3Rpb24gaW5zdGFsbEdsb2JhbEFQSSAoVnVlKSB7XG4gICAgLyoqXG4gICAgICogVnVlIGFuZCBldmVyeSBjb25zdHJ1Y3RvciB0aGF0IGV4dGVuZHMgVnVlIGhhcyBhblxuICAgICAqIGFzc29jaWF0ZWQgb3B0aW9ucyBvYmplY3QsIHdoaWNoIGNhbiBiZSBhY2Nlc3NlZCBkdXJpbmdcbiAgICAgKiBjb21waWxhdGlvbiBzdGVwcyBhcyBgdGhpcy5jb25zdHJ1Y3Rvci5vcHRpb25zYC5cbiAgICAgKlxuICAgICAqIFRoZXNlIGNhbiBiZSBzZWVuIGFzIHRoZSBkZWZhdWx0IG9wdGlvbnMgb2YgZXZlcnlcbiAgICAgKiBWdWUgaW5zdGFuY2UuXG4gICAgICovXG5cbiAgICBWdWUub3B0aW9ucyA9IHtcbiAgICAgIGRpcmVjdGl2ZXM6IGRpcmVjdGl2ZXMsXG4gICAgICBlbGVtZW50RGlyZWN0aXZlczogZWxlbWVudERpcmVjdGl2ZXMsXG4gICAgICBmaWx0ZXJzOiBmaWx0ZXJzLFxuICAgICAgdHJhbnNpdGlvbnM6IHt9LFxuICAgICAgY29tcG9uZW50czoge30sXG4gICAgICBwYXJ0aWFsczoge30sXG4gICAgICByZXBsYWNlOiB0cnVlXG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIEV4cG9zZSB1c2VmdWwgaW50ZXJuYWxzXG4gICAgICovXG5cbiAgICBWdWUudXRpbCA9IHV0aWw7XG4gICAgVnVlLmNvbmZpZyA9IGNvbmZpZztcbiAgICBWdWUuc2V0ID0gc2V0O1xuICAgIFZ1ZVsnZGVsZXRlJ10gPSBkZWw7XG4gICAgVnVlLm5leHRUaWNrID0gbmV4dFRpY2s7XG5cbiAgICAvKipcbiAgICAgKiBUaGUgZm9sbG93aW5nIGFyZSBleHBvc2VkIGZvciBhZHZhbmNlZCB1c2FnZSAvIHBsdWdpbnNcbiAgICAgKi9cblxuICAgIFZ1ZS5jb21waWxlciA9IGNvbXBpbGVyO1xuICAgIFZ1ZS5GcmFnbWVudEZhY3RvcnkgPSBGcmFnbWVudEZhY3Rvcnk7XG4gICAgVnVlLmludGVybmFsRGlyZWN0aXZlcyA9IGludGVybmFsRGlyZWN0aXZlcztcbiAgICBWdWUucGFyc2VycyA9IHtcbiAgICAgIHBhdGg6IHBhdGgsXG4gICAgICB0ZXh0OiB0ZXh0LFxuICAgICAgdGVtcGxhdGU6IHRlbXBsYXRlLFxuICAgICAgZGlyZWN0aXZlOiBkaXJlY3RpdmUsXG4gICAgICBleHByZXNzaW9uOiBleHByZXNzaW9uXG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIEVhY2ggaW5zdGFuY2UgY29uc3RydWN0b3IsIGluY2x1ZGluZyBWdWUsIGhhcyBhIHVuaXF1ZVxuICAgICAqIGNpZC4gVGhpcyBlbmFibGVzIHVzIHRvIGNyZWF0ZSB3cmFwcGVkIFwiY2hpbGRcbiAgICAgKiBjb25zdHJ1Y3RvcnNcIiBmb3IgcHJvdG90eXBhbCBpbmhlcml0YW5jZSBhbmQgY2FjaGUgdGhlbS5cbiAgICAgKi9cblxuICAgIFZ1ZS5jaWQgPSAwO1xuICAgIHZhciBjaWQgPSAxO1xuXG4gICAgLyoqXG4gICAgICogQ2xhc3MgaW5oZXJpdGFuY2VcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBleHRlbmRPcHRpb25zXG4gICAgICovXG5cbiAgICBWdWUuZXh0ZW5kID0gZnVuY3Rpb24gKGV4dGVuZE9wdGlvbnMpIHtcbiAgICAgIGV4dGVuZE9wdGlvbnMgPSBleHRlbmRPcHRpb25zIHx8IHt9O1xuICAgICAgdmFyIFN1cGVyID0gdGhpcztcbiAgICAgIHZhciBpc0ZpcnN0RXh0ZW5kID0gU3VwZXIuY2lkID09PSAwO1xuICAgICAgaWYgKGlzRmlyc3RFeHRlbmQgJiYgZXh0ZW5kT3B0aW9ucy5fQ3Rvcikge1xuICAgICAgICByZXR1cm4gZXh0ZW5kT3B0aW9ucy5fQ3RvcjtcbiAgICAgIH1cbiAgICAgIHZhciBuYW1lID0gZXh0ZW5kT3B0aW9ucy5uYW1lIHx8IFN1cGVyLm9wdGlvbnMubmFtZTtcbiAgICAgIGlmICgnZGV2ZWxvcG1lbnQnICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICAgICAgaWYgKCEvXlthLXpBLVpdW1xcdy1dKiQvLnRlc3QobmFtZSkpIHtcbiAgICAgICAgICB3YXJuKCdJbnZhbGlkIGNvbXBvbmVudCBuYW1lOiBcIicgKyBuYW1lICsgJ1wiLiBDb21wb25lbnQgbmFtZXMgJyArICdjYW4gb25seSBjb250YWluIGFscGhhbnVtZXJpYyBjaGFyYWNhdGVycyBhbmQgdGhlIGh5cGhlbi4nKTtcbiAgICAgICAgICBuYW1lID0gbnVsbDtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgdmFyIFN1YiA9IGNyZWF0ZUNsYXNzKG5hbWUgfHwgJ1Z1ZUNvbXBvbmVudCcpO1xuICAgICAgU3ViLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoU3VwZXIucHJvdG90eXBlKTtcbiAgICAgIFN1Yi5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBTdWI7XG4gICAgICBTdWIuY2lkID0gY2lkKys7XG4gICAgICBTdWIub3B0aW9ucyA9IG1lcmdlT3B0aW9ucyhTdXBlci5vcHRpb25zLCBleHRlbmRPcHRpb25zKTtcbiAgICAgIFN1Ylsnc3VwZXInXSA9IFN1cGVyO1xuICAgICAgLy8gYWxsb3cgZnVydGhlciBleHRlbnNpb25cbiAgICAgIFN1Yi5leHRlbmQgPSBTdXBlci5leHRlbmQ7XG4gICAgICAvLyBjcmVhdGUgYXNzZXQgcmVnaXN0ZXJzLCBzbyBleHRlbmRlZCBjbGFzc2VzXG4gICAgICAvLyBjYW4gaGF2ZSB0aGVpciBwcml2YXRlIGFzc2V0cyB0b28uXG4gICAgICBjb25maWcuX2Fzc2V0VHlwZXMuZm9yRWFjaChmdW5jdGlvbiAodHlwZSkge1xuICAgICAgICBTdWJbdHlwZV0gPSBTdXBlclt0eXBlXTtcbiAgICAgIH0pO1xuICAgICAgLy8gZW5hYmxlIHJlY3Vyc2l2ZSBzZWxmLWxvb2t1cFxuICAgICAgaWYgKG5hbWUpIHtcbiAgICAgICAgU3ViLm9wdGlvbnMuY29tcG9uZW50c1tuYW1lXSA9IFN1YjtcbiAgICAgIH1cbiAgICAgIC8vIGNhY2hlIGNvbnN0cnVjdG9yXG4gICAgICBpZiAoaXNGaXJzdEV4dGVuZCkge1xuICAgICAgICBleHRlbmRPcHRpb25zLl9DdG9yID0gU3ViO1xuICAgICAgfVxuICAgICAgcmV0dXJuIFN1YjtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogQSBmdW5jdGlvbiB0aGF0IHJldHVybnMgYSBzdWItY2xhc3MgY29uc3RydWN0b3Igd2l0aCB0aGVcbiAgICAgKiBnaXZlbiBuYW1lLiBUaGlzIGdpdmVzIHVzIG11Y2ggbmljZXIgb3V0cHV0IHdoZW5cbiAgICAgKiBsb2dnaW5nIGluc3RhbmNlcyBpbiB0aGUgY29uc29sZS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBuYW1lXG4gICAgICogQHJldHVybiB7RnVuY3Rpb259XG4gICAgICovXG5cbiAgICBmdW5jdGlvbiBjcmVhdGVDbGFzcyhuYW1lKSB7XG4gICAgICAvKiBlc2xpbnQtZGlzYWJsZSBuby1uZXctZnVuYyAqL1xuICAgICAgcmV0dXJuIG5ldyBGdW5jdGlvbigncmV0dXJuIGZ1bmN0aW9uICcgKyBjbGFzc2lmeShuYW1lKSArICcgKG9wdGlvbnMpIHsgdGhpcy5faW5pdChvcHRpb25zKSB9JykoKTtcbiAgICAgIC8qIGVzbGludC1lbmFibGUgbm8tbmV3LWZ1bmMgKi9cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBQbHVnaW4gc3lzdGVtXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gcGx1Z2luXG4gICAgICovXG5cbiAgICBWdWUudXNlID0gZnVuY3Rpb24gKHBsdWdpbikge1xuICAgICAgLyogaXN0YW5idWwgaWdub3JlIGlmICovXG4gICAgICBpZiAocGx1Z2luLmluc3RhbGxlZCkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICAvLyBhZGRpdGlvbmFsIHBhcmFtZXRlcnNcbiAgICAgIHZhciBhcmdzID0gdG9BcnJheShhcmd1bWVudHMsIDEpO1xuICAgICAgYXJncy51bnNoaWZ0KHRoaXMpO1xuICAgICAgaWYgKHR5cGVvZiBwbHVnaW4uaW5zdGFsbCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICBwbHVnaW4uaW5zdGFsbC5hcHBseShwbHVnaW4sIGFyZ3MpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcGx1Z2luLmFwcGx5KG51bGwsIGFyZ3MpO1xuICAgICAgfVxuICAgICAgcGx1Z2luLmluc3RhbGxlZCA9IHRydWU7XG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogQXBwbHkgYSBnbG9iYWwgbWl4aW4gYnkgbWVyZ2luZyBpdCBpbnRvIHRoZSBkZWZhdWx0XG4gICAgICogb3B0aW9ucy5cbiAgICAgKi9cblxuICAgIFZ1ZS5taXhpbiA9IGZ1bmN0aW9uIChtaXhpbikge1xuICAgICAgVnVlLm9wdGlvbnMgPSBtZXJnZU9wdGlvbnMoVnVlLm9wdGlvbnMsIG1peGluKTtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogQ3JlYXRlIGFzc2V0IHJlZ2lzdHJhdGlvbiBtZXRob2RzIHdpdGggdGhlIGZvbGxvd2luZ1xuICAgICAqIHNpZ25hdHVyZTpcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBpZFxuICAgICAqIEBwYXJhbSB7Kn0gZGVmaW5pdGlvblxuICAgICAqL1xuXG4gICAgY29uZmlnLl9hc3NldFR5cGVzLmZvckVhY2goZnVuY3Rpb24gKHR5cGUpIHtcbiAgICAgIFZ1ZVt0eXBlXSA9IGZ1bmN0aW9uIChpZCwgZGVmaW5pdGlvbikge1xuICAgICAgICBpZiAoIWRlZmluaXRpb24pIHtcbiAgICAgICAgICByZXR1cm4gdGhpcy5vcHRpb25zW3R5cGUgKyAncyddW2lkXTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgaWYgKi9cbiAgICAgICAgICBpZiAoJ2RldmVsb3BtZW50JyAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgICAgICAgICBpZiAodHlwZSA9PT0gJ2NvbXBvbmVudCcgJiYgKGNvbW1vblRhZ1JFLnRlc3QoaWQpIHx8IHJlc2VydmVkVGFnUkUudGVzdChpZCkpKSB7XG4gICAgICAgICAgICAgIHdhcm4oJ0RvIG5vdCB1c2UgYnVpbHQtaW4gb3IgcmVzZXJ2ZWQgSFRNTCBlbGVtZW50cyBhcyBjb21wb25lbnQgJyArICdpZDogJyArIGlkKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKHR5cGUgPT09ICdjb21wb25lbnQnICYmIGlzUGxhaW5PYmplY3QoZGVmaW5pdGlvbikpIHtcbiAgICAgICAgICAgIGRlZmluaXRpb24ubmFtZSA9IGlkO1xuICAgICAgICAgICAgZGVmaW5pdGlvbiA9IFZ1ZS5leHRlbmQoZGVmaW5pdGlvbik7XG4gICAgICAgICAgfVxuICAgICAgICAgIHRoaXMub3B0aW9uc1t0eXBlICsgJ3MnXVtpZF0gPSBkZWZpbml0aW9uO1xuICAgICAgICAgIHJldHVybiBkZWZpbml0aW9uO1xuICAgICAgICB9XG4gICAgICB9O1xuICAgIH0pO1xuXG4gICAgLy8gZXhwb3NlIGludGVybmFsIHRyYW5zaXRpb24gQVBJXG4gICAgZXh0ZW5kKFZ1ZS50cmFuc2l0aW9uLCB0cmFuc2l0aW9uKTtcbiAgfVxuXG4gIGluc3RhbGxHbG9iYWxBUEkoVnVlKTtcblxuICBWdWUudmVyc2lvbiA9ICcxLjAuMjQnO1xuXG4gIC8vIGRldnRvb2xzIGdsb2JhbCBob29rXG4gIC8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXG4gIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgIGlmIChjb25maWcuZGV2dG9vbHMpIHtcbiAgICAgIGlmIChkZXZ0b29scykge1xuICAgICAgICBkZXZ0b29scy5lbWl0KCdpbml0JywgVnVlKTtcbiAgICAgIH0gZWxzZSBpZiAoJ2RldmVsb3BtZW50JyAhPT0gJ3Byb2R1Y3Rpb24nICYmIGluQnJvd3NlciAmJiAvQ2hyb21lXFwvXFxkKy8udGVzdCh3aW5kb3cubmF2aWdhdG9yLnVzZXJBZ2VudCkpIHtcbiAgICAgICAgY29uc29sZS5sb2coJ0Rvd25sb2FkIHRoZSBWdWUgRGV2dG9vbHMgZm9yIGEgYmV0dGVyIGRldmVsb3BtZW50IGV4cGVyaWVuY2U6XFxuJyArICdodHRwczovL2dpdGh1Yi5jb20vdnVlanMvdnVlLWRldnRvb2xzJyk7XG4gICAgICB9XG4gICAgfVxuICB9LCAwKTtcblxuICByZXR1cm4gVnVlO1xuXG59KSk7XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL2RlcC9WdWUuanNcbiAqKiBtb2R1bGUgaWQgPSAyXG4gKiogbW9kdWxlIGNodW5rcyA9IDAgMSAyIDMgNFxuICoqLyIsIi8qIVxuICogdnVlLXJlc291cmNlIHYwLjkuM1xuICogaHR0cHM6Ly9naXRodWIuY29tL3Z1ZWpzL3Z1ZS1yZXNvdXJjZVxuICogUmVsZWFzZWQgdW5kZXIgdGhlIE1JVCBMaWNlbnNlLlxuICovXG5cbid1c2Ugc3RyaWN0JztcblxuLyoqXG4gKiBQcm9taXNlcy9BKyBwb2x5ZmlsbCB2MS4xLjQgKGh0dHBzOi8vZ2l0aHViLmNvbS9icmFtc3RlaW4vcHJvbWlzKVxuICovXG5cbnZhciBSRVNPTFZFRCA9IDA7XG52YXIgUkVKRUNURUQgPSAxO1xudmFyIFBFTkRJTkcgPSAyO1xuXG5mdW5jdGlvbiBQcm9taXNlJDIoZXhlY3V0b3IpIHtcblxuICAgIHRoaXMuc3RhdGUgPSBQRU5ESU5HO1xuICAgIHRoaXMudmFsdWUgPSB1bmRlZmluZWQ7XG4gICAgdGhpcy5kZWZlcnJlZCA9IFtdO1xuXG4gICAgdmFyIHByb21pc2UgPSB0aGlzO1xuXG4gICAgdHJ5IHtcbiAgICAgICAgZXhlY3V0b3IoZnVuY3Rpb24gKHgpIHtcbiAgICAgICAgICAgIHByb21pc2UucmVzb2x2ZSh4KTtcbiAgICAgICAgfSwgZnVuY3Rpb24gKHIpIHtcbiAgICAgICAgICAgIHByb21pc2UucmVqZWN0KHIpO1xuICAgICAgICB9KTtcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIHByb21pc2UucmVqZWN0KGUpO1xuICAgIH1cbn1cblxuUHJvbWlzZSQyLnJlamVjdCA9IGZ1bmN0aW9uIChyKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlJDIoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICByZWplY3Qocik7XG4gICAgfSk7XG59O1xuXG5Qcm9taXNlJDIucmVzb2x2ZSA9IGZ1bmN0aW9uICh4KSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlJDIoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICByZXNvbHZlKHgpO1xuICAgIH0pO1xufTtcblxuUHJvbWlzZSQyLmFsbCA9IGZ1bmN0aW9uIGFsbChpdGVyYWJsZSkge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSQyKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgdmFyIGNvdW50ID0gMCxcbiAgICAgICAgICAgIHJlc3VsdCA9IFtdO1xuXG4gICAgICAgIGlmIChpdGVyYWJsZS5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgIHJlc29sdmUocmVzdWx0KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGZ1bmN0aW9uIHJlc29sdmVyKGkpIHtcbiAgICAgICAgICAgIHJldHVybiBmdW5jdGlvbiAoeCkge1xuICAgICAgICAgICAgICAgIHJlc3VsdFtpXSA9IHg7XG4gICAgICAgICAgICAgICAgY291bnQgKz0gMTtcblxuICAgICAgICAgICAgICAgIGlmIChjb3VudCA9PT0gaXRlcmFibGUubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgICAgIHJlc29sdmUocmVzdWx0KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG5cbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBpdGVyYWJsZS5sZW5ndGg7IGkgKz0gMSkge1xuICAgICAgICAgICAgUHJvbWlzZSQyLnJlc29sdmUoaXRlcmFibGVbaV0pLnRoZW4ocmVzb2x2ZXIoaSksIHJlamVjdCk7XG4gICAgICAgIH1cbiAgICB9KTtcbn07XG5cblByb21pc2UkMi5yYWNlID0gZnVuY3Rpb24gcmFjZShpdGVyYWJsZSkge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSQyKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBpdGVyYWJsZS5sZW5ndGg7IGkgKz0gMSkge1xuICAgICAgICAgICAgUHJvbWlzZSQyLnJlc29sdmUoaXRlcmFibGVbaV0pLnRoZW4ocmVzb2x2ZSwgcmVqZWN0KTtcbiAgICAgICAgfVxuICAgIH0pO1xufTtcblxudmFyIHAkMSA9IFByb21pc2UkMi5wcm90b3R5cGU7XG5cbnAkMS5yZXNvbHZlID0gZnVuY3Rpb24gcmVzb2x2ZSh4KSB7XG4gICAgdmFyIHByb21pc2UgPSB0aGlzO1xuXG4gICAgaWYgKHByb21pc2Uuc3RhdGUgPT09IFBFTkRJTkcpIHtcbiAgICAgICAgaWYgKHggPT09IHByb21pc2UpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ1Byb21pc2Ugc2V0dGxlZCB3aXRoIGl0c2VsZi4nKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBjYWxsZWQgPSBmYWxzZTtcblxuICAgICAgICB0cnkge1xuICAgICAgICAgICAgdmFyIHRoZW4gPSB4ICYmIHhbJ3RoZW4nXTtcblxuICAgICAgICAgICAgaWYgKHggIT09IG51bGwgJiYgdHlwZW9mIHggPT09ICdvYmplY3QnICYmIHR5cGVvZiB0aGVuID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICAgICAgdGhlbi5jYWxsKHgsIGZ1bmN0aW9uICh4KSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICghY2FsbGVkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBwcm9taXNlLnJlc29sdmUoeCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgY2FsbGVkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9LCBmdW5jdGlvbiAocikge1xuICAgICAgICAgICAgICAgICAgICBpZiAoIWNhbGxlZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcHJvbWlzZS5yZWplY3Qocik7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgY2FsbGVkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgIGlmICghY2FsbGVkKSB7XG4gICAgICAgICAgICAgICAgcHJvbWlzZS5yZWplY3QoZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBwcm9taXNlLnN0YXRlID0gUkVTT0xWRUQ7XG4gICAgICAgIHByb21pc2UudmFsdWUgPSB4O1xuICAgICAgICBwcm9taXNlLm5vdGlmeSgpO1xuICAgIH1cbn07XG5cbnAkMS5yZWplY3QgPSBmdW5jdGlvbiByZWplY3QocmVhc29uKSB7XG4gICAgdmFyIHByb21pc2UgPSB0aGlzO1xuXG4gICAgaWYgKHByb21pc2Uuc3RhdGUgPT09IFBFTkRJTkcpIHtcbiAgICAgICAgaWYgKHJlYXNvbiA9PT0gcHJvbWlzZSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignUHJvbWlzZSBzZXR0bGVkIHdpdGggaXRzZWxmLicpO1xuICAgICAgICB9XG5cbiAgICAgICAgcHJvbWlzZS5zdGF0ZSA9IFJFSkVDVEVEO1xuICAgICAgICBwcm9taXNlLnZhbHVlID0gcmVhc29uO1xuICAgICAgICBwcm9taXNlLm5vdGlmeSgpO1xuICAgIH1cbn07XG5cbnAkMS5ub3RpZnkgPSBmdW5jdGlvbiBub3RpZnkoKSB7XG4gICAgdmFyIHByb21pc2UgPSB0aGlzO1xuXG4gICAgbmV4dFRpY2soZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAocHJvbWlzZS5zdGF0ZSAhPT0gUEVORElORykge1xuICAgICAgICAgICAgd2hpbGUgKHByb21pc2UuZGVmZXJyZWQubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgdmFyIGRlZmVycmVkID0gcHJvbWlzZS5kZWZlcnJlZC5zaGlmdCgpLFxuICAgICAgICAgICAgICAgICAgICBvblJlc29sdmVkID0gZGVmZXJyZWRbMF0sXG4gICAgICAgICAgICAgICAgICAgIG9uUmVqZWN0ZWQgPSBkZWZlcnJlZFsxXSxcbiAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZSA9IGRlZmVycmVkWzJdLFxuICAgICAgICAgICAgICAgICAgICByZWplY3QgPSBkZWZlcnJlZFszXTtcblxuICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChwcm9taXNlLnN0YXRlID09PSBSRVNPTFZFRCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBvblJlc29sdmVkID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShvblJlc29sdmVkLmNhbGwodW5kZWZpbmVkLCBwcm9taXNlLnZhbHVlKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUocHJvbWlzZS52YWx1ZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAocHJvbWlzZS5zdGF0ZSA9PT0gUkVKRUNURUQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0eXBlb2Ygb25SZWplY3RlZCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUob25SZWplY3RlZC5jYWxsKHVuZGVmaW5lZCwgcHJvbWlzZS52YWx1ZSkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWplY3QocHJvbWlzZS52YWx1ZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgICAgICAgICAgIHJlamVjdChlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9KTtcbn07XG5cbnAkMS50aGVuID0gZnVuY3Rpb24gdGhlbihvblJlc29sdmVkLCBvblJlamVjdGVkKSB7XG4gICAgdmFyIHByb21pc2UgPSB0aGlzO1xuXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlJDIoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICBwcm9taXNlLmRlZmVycmVkLnB1c2goW29uUmVzb2x2ZWQsIG9uUmVqZWN0ZWQsIHJlc29sdmUsIHJlamVjdF0pO1xuICAgICAgICBwcm9taXNlLm5vdGlmeSgpO1xuICAgIH0pO1xufTtcblxucCQxLmNhdGNoID0gZnVuY3Rpb24gKG9uUmVqZWN0ZWQpIHtcbiAgICByZXR1cm4gdGhpcy50aGVuKHVuZGVmaW5lZCwgb25SZWplY3RlZCk7XG59O1xuXG52YXIgUHJvbWlzZU9iaiA9IHdpbmRvdy5Qcm9taXNlIHx8IFByb21pc2UkMjtcblxuZnVuY3Rpb24gUHJvbWlzZSQxKGV4ZWN1dG9yLCBjb250ZXh0KSB7XG5cbiAgICBpZiAoZXhlY3V0b3IgaW5zdGFuY2VvZiBQcm9taXNlT2JqKSB7XG4gICAgICAgIHRoaXMucHJvbWlzZSA9IGV4ZWN1dG9yO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMucHJvbWlzZSA9IG5ldyBQcm9taXNlT2JqKGV4ZWN1dG9yLmJpbmQoY29udGV4dCkpO1xuICAgIH1cblxuICAgIHRoaXMuY29udGV4dCA9IGNvbnRleHQ7XG59XG5cblByb21pc2UkMS5hbGwgPSBmdW5jdGlvbiAoaXRlcmFibGUsIGNvbnRleHQpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UkMShQcm9taXNlT2JqLmFsbChpdGVyYWJsZSksIGNvbnRleHQpO1xufTtcblxuUHJvbWlzZSQxLnJlc29sdmUgPSBmdW5jdGlvbiAodmFsdWUsIGNvbnRleHQpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UkMShQcm9taXNlT2JqLnJlc29sdmUodmFsdWUpLCBjb250ZXh0KTtcbn07XG5cblByb21pc2UkMS5yZWplY3QgPSBmdW5jdGlvbiAocmVhc29uLCBjb250ZXh0KSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlJDEoUHJvbWlzZU9iai5yZWplY3QocmVhc29uKSwgY29udGV4dCk7XG59O1xuXG5Qcm9taXNlJDEucmFjZSA9IGZ1bmN0aW9uIChpdGVyYWJsZSwgY29udGV4dCkge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSQxKFByb21pc2VPYmoucmFjZShpdGVyYWJsZSksIGNvbnRleHQpO1xufTtcblxudmFyIHAgPSBQcm9taXNlJDEucHJvdG90eXBlO1xuXG5wLmJpbmQgPSBmdW5jdGlvbiAoY29udGV4dCkge1xuICAgIHRoaXMuY29udGV4dCA9IGNvbnRleHQ7XG4gICAgcmV0dXJuIHRoaXM7XG59O1xuXG5wLnRoZW4gPSBmdW5jdGlvbiAoZnVsZmlsbGVkLCByZWplY3RlZCkge1xuXG4gICAgaWYgKGZ1bGZpbGxlZCAmJiBmdWxmaWxsZWQuYmluZCAmJiB0aGlzLmNvbnRleHQpIHtcbiAgICAgICAgZnVsZmlsbGVkID0gZnVsZmlsbGVkLmJpbmQodGhpcy5jb250ZXh0KTtcbiAgICB9XG5cbiAgICBpZiAocmVqZWN0ZWQgJiYgcmVqZWN0ZWQuYmluZCAmJiB0aGlzLmNvbnRleHQpIHtcbiAgICAgICAgcmVqZWN0ZWQgPSByZWplY3RlZC5iaW5kKHRoaXMuY29udGV4dCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlJDEodGhpcy5wcm9taXNlLnRoZW4oZnVsZmlsbGVkLCByZWplY3RlZCksIHRoaXMuY29udGV4dCk7XG59O1xuXG5wLmNhdGNoID0gZnVuY3Rpb24gKHJlamVjdGVkKSB7XG5cbiAgICBpZiAocmVqZWN0ZWQgJiYgcmVqZWN0ZWQuYmluZCAmJiB0aGlzLmNvbnRleHQpIHtcbiAgICAgICAgcmVqZWN0ZWQgPSByZWplY3RlZC5iaW5kKHRoaXMuY29udGV4dCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlJDEodGhpcy5wcm9taXNlLmNhdGNoKHJlamVjdGVkKSwgdGhpcy5jb250ZXh0KTtcbn07XG5cbnAuZmluYWxseSA9IGZ1bmN0aW9uIChjYWxsYmFjaykge1xuXG4gICAgcmV0dXJuIHRoaXMudGhlbihmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgY2FsbGJhY2suY2FsbCh0aGlzKTtcbiAgICAgICAgcmV0dXJuIHZhbHVlO1xuICAgIH0sIGZ1bmN0aW9uIChyZWFzb24pIHtcbiAgICAgICAgY2FsbGJhY2suY2FsbCh0aGlzKTtcbiAgICAgICAgcmV0dXJuIFByb21pc2VPYmoucmVqZWN0KHJlYXNvbik7XG4gICAgfSk7XG59O1xuXG52YXIgZGVidWcgPSBmYWxzZTtcbnZhciB1dGlsID0ge307XG52YXIgYXJyYXkgPSBbXTtcbmZ1bmN0aW9uIFV0aWwgKFZ1ZSkge1xuICAgIHV0aWwgPSBWdWUudXRpbDtcbiAgICBkZWJ1ZyA9IFZ1ZS5jb25maWcuZGVidWcgfHwgIVZ1ZS5jb25maWcuc2lsZW50O1xufVxuXG5mdW5jdGlvbiB3YXJuKG1zZykge1xuICAgIGlmICh0eXBlb2YgY29uc29sZSAhPT0gJ3VuZGVmaW5lZCcgJiYgZGVidWcpIHtcbiAgICAgICAgY29uc29sZS53YXJuKCdbVnVlUmVzb3VyY2Ugd2Fybl06ICcgKyBtc2cpO1xuICAgIH1cbn1cblxuZnVuY3Rpb24gZXJyb3IobXNnKSB7XG4gICAgaWYgKHR5cGVvZiBjb25zb2xlICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICBjb25zb2xlLmVycm9yKG1zZyk7XG4gICAgfVxufVxuXG5mdW5jdGlvbiBuZXh0VGljayhjYiwgY3R4KSB7XG4gICAgcmV0dXJuIHV0aWwubmV4dFRpY2soY2IsIGN0eCk7XG59XG5cbmZ1bmN0aW9uIHRyaW0oc3RyKSB7XG4gICAgcmV0dXJuIHN0ci5yZXBsYWNlKC9eXFxzKnxcXHMqJC9nLCAnJyk7XG59XG5cbnZhciBpc0FycmF5ID0gQXJyYXkuaXNBcnJheTtcblxuZnVuY3Rpb24gaXNTdHJpbmcodmFsKSB7XG4gICAgcmV0dXJuIHR5cGVvZiB2YWwgPT09ICdzdHJpbmcnO1xufVxuXG5mdW5jdGlvbiBpc0Jvb2xlYW4odmFsKSB7XG4gICAgcmV0dXJuIHZhbCA9PT0gdHJ1ZSB8fCB2YWwgPT09IGZhbHNlO1xufVxuXG5mdW5jdGlvbiBpc0Z1bmN0aW9uKHZhbCkge1xuICAgIHJldHVybiB0eXBlb2YgdmFsID09PSAnZnVuY3Rpb24nO1xufVxuXG5mdW5jdGlvbiBpc09iamVjdChvYmopIHtcbiAgICByZXR1cm4gb2JqICE9PSBudWxsICYmIHR5cGVvZiBvYmogPT09ICdvYmplY3QnO1xufVxuXG5mdW5jdGlvbiBpc1BsYWluT2JqZWN0KG9iaikge1xuICAgIHJldHVybiBpc09iamVjdChvYmopICYmIE9iamVjdC5nZXRQcm90b3R5cGVPZihvYmopID09IE9iamVjdC5wcm90b3R5cGU7XG59XG5cbmZ1bmN0aW9uIGlzRm9ybURhdGEob2JqKSB7XG4gICAgcmV0dXJuIHR5cGVvZiBGb3JtRGF0YSAhPT0gJ3VuZGVmaW5lZCcgJiYgb2JqIGluc3RhbmNlb2YgRm9ybURhdGE7XG59XG5cbmZ1bmN0aW9uIHdoZW4odmFsdWUsIGZ1bGZpbGxlZCwgcmVqZWN0ZWQpIHtcblxuICAgIHZhciBwcm9taXNlID0gUHJvbWlzZSQxLnJlc29sdmUodmFsdWUpO1xuXG4gICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPCAyKSB7XG4gICAgICAgIHJldHVybiBwcm9taXNlO1xuICAgIH1cblxuICAgIHJldHVybiBwcm9taXNlLnRoZW4oZnVsZmlsbGVkLCByZWplY3RlZCk7XG59XG5cbmZ1bmN0aW9uIG9wdGlvbnMoZm4sIG9iaiwgb3B0cykge1xuXG4gICAgb3B0cyA9IG9wdHMgfHwge307XG5cbiAgICBpZiAoaXNGdW5jdGlvbihvcHRzKSkge1xuICAgICAgICBvcHRzID0gb3B0cy5jYWxsKG9iaik7XG4gICAgfVxuXG4gICAgcmV0dXJuIG1lcmdlKGZuLmJpbmQoeyAkdm06IG9iaiwgJG9wdGlvbnM6IG9wdHMgfSksIGZuLCB7ICRvcHRpb25zOiBvcHRzIH0pO1xufVxuXG5mdW5jdGlvbiBlYWNoKG9iaiwgaXRlcmF0b3IpIHtcblxuICAgIHZhciBpLCBrZXk7XG5cbiAgICBpZiAodHlwZW9mIG9iai5sZW5ndGggPT0gJ251bWJlcicpIHtcbiAgICAgICAgZm9yIChpID0gMDsgaSA8IG9iai5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgaXRlcmF0b3IuY2FsbChvYmpbaV0sIG9ialtpXSwgaSk7XG4gICAgICAgIH1cbiAgICB9IGVsc2UgaWYgKGlzT2JqZWN0KG9iaikpIHtcbiAgICAgICAgZm9yIChrZXkgaW4gb2JqKSB7XG4gICAgICAgICAgICBpZiAob2JqLmhhc093blByb3BlcnR5KGtleSkpIHtcbiAgICAgICAgICAgICAgICBpdGVyYXRvci5jYWxsKG9ialtrZXldLCBvYmpba2V5XSwga2V5KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBvYmo7XG59XG5cbnZhciBhc3NpZ24gPSBPYmplY3QuYXNzaWduIHx8IF9hc3NpZ247XG5cbmZ1bmN0aW9uIG1lcmdlKHRhcmdldCkge1xuXG4gICAgdmFyIGFyZ3MgPSBhcnJheS5zbGljZS5jYWxsKGFyZ3VtZW50cywgMSk7XG5cbiAgICBhcmdzLmZvckVhY2goZnVuY3Rpb24gKHNvdXJjZSkge1xuICAgICAgICBfbWVyZ2UodGFyZ2V0LCBzb3VyY2UsIHRydWUpO1xuICAgIH0pO1xuXG4gICAgcmV0dXJuIHRhcmdldDtcbn1cblxuZnVuY3Rpb24gZGVmYXVsdHModGFyZ2V0KSB7XG5cbiAgICB2YXIgYXJncyA9IGFycmF5LnNsaWNlLmNhbGwoYXJndW1lbnRzLCAxKTtcblxuICAgIGFyZ3MuZm9yRWFjaChmdW5jdGlvbiAoc291cmNlKSB7XG5cbiAgICAgICAgZm9yICh2YXIga2V5IGluIHNvdXJjZSkge1xuICAgICAgICAgICAgaWYgKHRhcmdldFtrZXldID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICB0YXJnZXRba2V5XSA9IHNvdXJjZVtrZXldO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICByZXR1cm4gdGFyZ2V0O1xufVxuXG5mdW5jdGlvbiBfYXNzaWduKHRhcmdldCkge1xuXG4gICAgdmFyIGFyZ3MgPSBhcnJheS5zbGljZS5jYWxsKGFyZ3VtZW50cywgMSk7XG5cbiAgICBhcmdzLmZvckVhY2goZnVuY3Rpb24gKHNvdXJjZSkge1xuICAgICAgICBfbWVyZ2UodGFyZ2V0LCBzb3VyY2UpO1xuICAgIH0pO1xuXG4gICAgcmV0dXJuIHRhcmdldDtcbn1cblxuZnVuY3Rpb24gX21lcmdlKHRhcmdldCwgc291cmNlLCBkZWVwKSB7XG4gICAgZm9yICh2YXIga2V5IGluIHNvdXJjZSkge1xuICAgICAgICBpZiAoZGVlcCAmJiAoaXNQbGFpbk9iamVjdChzb3VyY2Vba2V5XSkgfHwgaXNBcnJheShzb3VyY2Vba2V5XSkpKSB7XG4gICAgICAgICAgICBpZiAoaXNQbGFpbk9iamVjdChzb3VyY2Vba2V5XSkgJiYgIWlzUGxhaW5PYmplY3QodGFyZ2V0W2tleV0pKSB7XG4gICAgICAgICAgICAgICAgdGFyZ2V0W2tleV0gPSB7fTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChpc0FycmF5KHNvdXJjZVtrZXldKSAmJiAhaXNBcnJheSh0YXJnZXRba2V5XSkpIHtcbiAgICAgICAgICAgICAgICB0YXJnZXRba2V5XSA9IFtdO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgX21lcmdlKHRhcmdldFtrZXldLCBzb3VyY2Vba2V5XSwgZGVlcCk7XG4gICAgICAgIH0gZWxzZSBpZiAoc291cmNlW2tleV0gIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgdGFyZ2V0W2tleV0gPSBzb3VyY2Vba2V5XTtcbiAgICAgICAgfVxuICAgIH1cbn1cblxuZnVuY3Rpb24gcm9vdCAob3B0aW9ucywgbmV4dCkge1xuXG4gICAgdmFyIHVybCA9IG5leHQob3B0aW9ucyk7XG5cbiAgICBpZiAoaXNTdHJpbmcob3B0aW9ucy5yb290KSAmJiAhdXJsLm1hdGNoKC9eKGh0dHBzPzopP1xcLy8pKSB7XG4gICAgICAgIHVybCA9IG9wdGlvbnMucm9vdCArICcvJyArIHVybDtcbiAgICB9XG5cbiAgICByZXR1cm4gdXJsO1xufVxuXG5mdW5jdGlvbiBxdWVyeSAob3B0aW9ucywgbmV4dCkge1xuXG4gICAgdmFyIHVybFBhcmFtcyA9IE9iamVjdC5rZXlzKFVybC5vcHRpb25zLnBhcmFtcyksXG4gICAgICAgIHF1ZXJ5ID0ge30sXG4gICAgICAgIHVybCA9IG5leHQob3B0aW9ucyk7XG5cbiAgICBlYWNoKG9wdGlvbnMucGFyYW1zLCBmdW5jdGlvbiAodmFsdWUsIGtleSkge1xuICAgICAgICBpZiAodXJsUGFyYW1zLmluZGV4T2Yoa2V5KSA9PT0gLTEpIHtcbiAgICAgICAgICAgIHF1ZXJ5W2tleV0gPSB2YWx1ZTtcbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgcXVlcnkgPSBVcmwucGFyYW1zKHF1ZXJ5KTtcblxuICAgIGlmIChxdWVyeSkge1xuICAgICAgICB1cmwgKz0gKHVybC5pbmRleE9mKCc/JykgPT0gLTEgPyAnPycgOiAnJicpICsgcXVlcnk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHVybDtcbn1cblxuLyoqXG4gKiBVUkwgVGVtcGxhdGUgdjIuMC42IChodHRwczovL2dpdGh1Yi5jb20vYnJhbXN0ZWluL3VybC10ZW1wbGF0ZSlcbiAqL1xuXG5mdW5jdGlvbiBleHBhbmQodXJsLCBwYXJhbXMsIHZhcmlhYmxlcykge1xuXG4gICAgdmFyIHRtcGwgPSBwYXJzZSh1cmwpLFxuICAgICAgICBleHBhbmRlZCA9IHRtcGwuZXhwYW5kKHBhcmFtcyk7XG5cbiAgICBpZiAodmFyaWFibGVzKSB7XG4gICAgICAgIHZhcmlhYmxlcy5wdXNoLmFwcGx5KHZhcmlhYmxlcywgdG1wbC52YXJzKTtcbiAgICB9XG5cbiAgICByZXR1cm4gZXhwYW5kZWQ7XG59XG5cbmZ1bmN0aW9uIHBhcnNlKHRlbXBsYXRlKSB7XG5cbiAgICB2YXIgb3BlcmF0b3JzID0gWycrJywgJyMnLCAnLicsICcvJywgJzsnLCAnPycsICcmJ10sXG4gICAgICAgIHZhcmlhYmxlcyA9IFtdO1xuXG4gICAgcmV0dXJuIHtcbiAgICAgICAgdmFyczogdmFyaWFibGVzLFxuICAgICAgICBleHBhbmQ6IGZ1bmN0aW9uIChjb250ZXh0KSB7XG4gICAgICAgICAgICByZXR1cm4gdGVtcGxhdGUucmVwbGFjZSgvXFx7KFteXFx7XFx9XSspXFx9fChbXlxce1xcfV0rKS9nLCBmdW5jdGlvbiAoXywgZXhwcmVzc2lvbiwgbGl0ZXJhbCkge1xuICAgICAgICAgICAgICAgIGlmIChleHByZXNzaW9uKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgdmFyIG9wZXJhdG9yID0gbnVsbCxcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlcyA9IFtdO1xuXG4gICAgICAgICAgICAgICAgICAgIGlmIChvcGVyYXRvcnMuaW5kZXhPZihleHByZXNzaW9uLmNoYXJBdCgwKSkgIT09IC0xKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBvcGVyYXRvciA9IGV4cHJlc3Npb24uY2hhckF0KDApO1xuICAgICAgICAgICAgICAgICAgICAgICAgZXhwcmVzc2lvbiA9IGV4cHJlc3Npb24uc3Vic3RyKDEpO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgZXhwcmVzc2lvbi5zcGxpdCgvLC9nKS5mb3JFYWNoKGZ1bmN0aW9uICh2YXJpYWJsZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHRtcCA9IC8oW146XFwqXSopKD86OihcXGQrKXwoXFwqKSk/Ly5leGVjKHZhcmlhYmxlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlcy5wdXNoLmFwcGx5KHZhbHVlcywgZ2V0VmFsdWVzKGNvbnRleHQsIG9wZXJhdG9yLCB0bXBbMV0sIHRtcFsyXSB8fCB0bXBbM10pKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhcmlhYmxlcy5wdXNoKHRtcFsxXSk7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgICAgIGlmIChvcGVyYXRvciAmJiBvcGVyYXRvciAhPT0gJysnKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBzZXBhcmF0b3IgPSAnLCc7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChvcGVyYXRvciA9PT0gJz8nKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VwYXJhdG9yID0gJyYnO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChvcGVyYXRvciAhPT0gJyMnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VwYXJhdG9yID0gb3BlcmF0b3I7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAodmFsdWVzLmxlbmd0aCAhPT0gMCA/IG9wZXJhdG9yIDogJycpICsgdmFsdWVzLmpvaW4oc2VwYXJhdG9yKTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB2YWx1ZXMuam9pbignLCcpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGVuY29kZVJlc2VydmVkKGxpdGVyYWwpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfTtcbn1cblxuZnVuY3Rpb24gZ2V0VmFsdWVzKGNvbnRleHQsIG9wZXJhdG9yLCBrZXksIG1vZGlmaWVyKSB7XG5cbiAgICB2YXIgdmFsdWUgPSBjb250ZXh0W2tleV0sXG4gICAgICAgIHJlc3VsdCA9IFtdO1xuXG4gICAgaWYgKGlzRGVmaW5lZCh2YWx1ZSkgJiYgdmFsdWUgIT09ICcnKSB7XG4gICAgICAgIGlmICh0eXBlb2YgdmFsdWUgPT09ICdzdHJpbmcnIHx8IHR5cGVvZiB2YWx1ZSA9PT0gJ251bWJlcicgfHwgdHlwZW9mIHZhbHVlID09PSAnYm9vbGVhbicpIHtcbiAgICAgICAgICAgIHZhbHVlID0gdmFsdWUudG9TdHJpbmcoKTtcblxuICAgICAgICAgICAgaWYgKG1vZGlmaWVyICYmIG1vZGlmaWVyICE9PSAnKicpIHtcbiAgICAgICAgICAgICAgICB2YWx1ZSA9IHZhbHVlLnN1YnN0cmluZygwLCBwYXJzZUludChtb2RpZmllciwgMTApKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmVzdWx0LnB1c2goZW5jb2RlVmFsdWUob3BlcmF0b3IsIHZhbHVlLCBpc0tleU9wZXJhdG9yKG9wZXJhdG9yKSA/IGtleSA6IG51bGwpKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGlmIChtb2RpZmllciA9PT0gJyonKSB7XG4gICAgICAgICAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkodmFsdWUpKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhbHVlLmZpbHRlcihpc0RlZmluZWQpLmZvckVhY2goZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXN1bHQucHVzaChlbmNvZGVWYWx1ZShvcGVyYXRvciwgdmFsdWUsIGlzS2V5T3BlcmF0b3Iob3BlcmF0b3IpID8ga2V5IDogbnVsbCkpO1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBPYmplY3Qua2V5cyh2YWx1ZSkuZm9yRWFjaChmdW5jdGlvbiAoaykge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGlzRGVmaW5lZCh2YWx1ZVtrXSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXN1bHQucHVzaChlbmNvZGVWYWx1ZShvcGVyYXRvciwgdmFsdWVba10sIGspKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB2YXIgdG1wID0gW107XG5cbiAgICAgICAgICAgICAgICBpZiAoQXJyYXkuaXNBcnJheSh2YWx1ZSkpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFsdWUuZmlsdGVyKGlzRGVmaW5lZCkuZm9yRWFjaChmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRtcC5wdXNoKGVuY29kZVZhbHVlKG9wZXJhdG9yLCB2YWx1ZSkpO1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBPYmplY3Qua2V5cyh2YWx1ZSkuZm9yRWFjaChmdW5jdGlvbiAoaykge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGlzRGVmaW5lZCh2YWx1ZVtrXSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0bXAucHVzaChlbmNvZGVVUklDb21wb25lbnQoaykpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRtcC5wdXNoKGVuY29kZVZhbHVlKG9wZXJhdG9yLCB2YWx1ZVtrXS50b1N0cmluZygpKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmIChpc0tleU9wZXJhdG9yKG9wZXJhdG9yKSkge1xuICAgICAgICAgICAgICAgICAgICByZXN1bHQucHVzaChlbmNvZGVVUklDb21wb25lbnQoa2V5KSArICc9JyArIHRtcC5qb2luKCcsJykpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAodG1wLmxlbmd0aCAhPT0gMCkge1xuICAgICAgICAgICAgICAgICAgICByZXN1bHQucHVzaCh0bXAuam9pbignLCcpKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgICBpZiAob3BlcmF0b3IgPT09ICc7Jykge1xuICAgICAgICAgICAgcmVzdWx0LnB1c2goZW5jb2RlVVJJQ29tcG9uZW50KGtleSkpO1xuICAgICAgICB9IGVsc2UgaWYgKHZhbHVlID09PSAnJyAmJiAob3BlcmF0b3IgPT09ICcmJyB8fCBvcGVyYXRvciA9PT0gJz8nKSkge1xuICAgICAgICAgICAgcmVzdWx0LnB1c2goZW5jb2RlVVJJQ29tcG9uZW50KGtleSkgKyAnPScpO1xuICAgICAgICB9IGVsc2UgaWYgKHZhbHVlID09PSAnJykge1xuICAgICAgICAgICAgcmVzdWx0LnB1c2goJycpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHJlc3VsdDtcbn1cblxuZnVuY3Rpb24gaXNEZWZpbmVkKHZhbHVlKSB7XG4gICAgcmV0dXJuIHZhbHVlICE9PSB1bmRlZmluZWQgJiYgdmFsdWUgIT09IG51bGw7XG59XG5cbmZ1bmN0aW9uIGlzS2V5T3BlcmF0b3Iob3BlcmF0b3IpIHtcbiAgICByZXR1cm4gb3BlcmF0b3IgPT09ICc7JyB8fCBvcGVyYXRvciA9PT0gJyYnIHx8IG9wZXJhdG9yID09PSAnPyc7XG59XG5cbmZ1bmN0aW9uIGVuY29kZVZhbHVlKG9wZXJhdG9yLCB2YWx1ZSwga2V5KSB7XG5cbiAgICB2YWx1ZSA9IG9wZXJhdG9yID09PSAnKycgfHwgb3BlcmF0b3IgPT09ICcjJyA/IGVuY29kZVJlc2VydmVkKHZhbHVlKSA6IGVuY29kZVVSSUNvbXBvbmVudCh2YWx1ZSk7XG5cbiAgICBpZiAoa2V5KSB7XG4gICAgICAgIHJldHVybiBlbmNvZGVVUklDb21wb25lbnQoa2V5KSArICc9JyArIHZhbHVlO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICB9XG59XG5cbmZ1bmN0aW9uIGVuY29kZVJlc2VydmVkKHN0cikge1xuICAgIHJldHVybiBzdHIuc3BsaXQoLyglWzAtOUEtRmEtZl17Mn0pL2cpLm1hcChmdW5jdGlvbiAocGFydCkge1xuICAgICAgICBpZiAoIS8lWzAtOUEtRmEtZl0vLnRlc3QocGFydCkpIHtcbiAgICAgICAgICAgIHBhcnQgPSBlbmNvZGVVUkkocGFydCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHBhcnQ7XG4gICAgfSkuam9pbignJyk7XG59XG5cbmZ1bmN0aW9uIHRlbXBsYXRlIChvcHRpb25zKSB7XG5cbiAgICB2YXIgdmFyaWFibGVzID0gW10sXG4gICAgICAgIHVybCA9IGV4cGFuZChvcHRpb25zLnVybCwgb3B0aW9ucy5wYXJhbXMsIHZhcmlhYmxlcyk7XG5cbiAgICB2YXJpYWJsZXMuZm9yRWFjaChmdW5jdGlvbiAoa2V5KSB7XG4gICAgICAgIGRlbGV0ZSBvcHRpb25zLnBhcmFtc1trZXldO1xuICAgIH0pO1xuXG4gICAgcmV0dXJuIHVybDtcbn1cblxuLyoqXG4gKiBTZXJ2aWNlIGZvciBVUkwgdGVtcGxhdGluZy5cbiAqL1xuXG52YXIgaWUgPSBkb2N1bWVudC5kb2N1bWVudE1vZGU7XG52YXIgZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdhJyk7XG5cbmZ1bmN0aW9uIFVybCh1cmwsIHBhcmFtcykge1xuXG4gICAgdmFyIHNlbGYgPSB0aGlzIHx8IHt9LFxuICAgICAgICBvcHRpb25zID0gdXJsLFxuICAgICAgICB0cmFuc2Zvcm07XG5cbiAgICBpZiAoaXNTdHJpbmcodXJsKSkge1xuICAgICAgICBvcHRpb25zID0geyB1cmw6IHVybCwgcGFyYW1zOiBwYXJhbXMgfTtcbiAgICB9XG5cbiAgICBvcHRpb25zID0gbWVyZ2Uoe30sIFVybC5vcHRpb25zLCBzZWxmLiRvcHRpb25zLCBvcHRpb25zKTtcblxuICAgIFVybC50cmFuc2Zvcm1zLmZvckVhY2goZnVuY3Rpb24gKGhhbmRsZXIpIHtcbiAgICAgICAgdHJhbnNmb3JtID0gZmFjdG9yeShoYW5kbGVyLCB0cmFuc2Zvcm0sIHNlbGYuJHZtKTtcbiAgICB9KTtcblxuICAgIHJldHVybiB0cmFuc2Zvcm0ob3B0aW9ucyk7XG59XG5cbi8qKlxuICogVXJsIG9wdGlvbnMuXG4gKi9cblxuVXJsLm9wdGlvbnMgPSB7XG4gICAgdXJsOiAnJyxcbiAgICByb290OiBudWxsLFxuICAgIHBhcmFtczoge31cbn07XG5cbi8qKlxuICogVXJsIHRyYW5zZm9ybXMuXG4gKi9cblxuVXJsLnRyYW5zZm9ybXMgPSBbdGVtcGxhdGUsIHF1ZXJ5LCByb290XTtcblxuLyoqXG4gKiBFbmNvZGVzIGEgVXJsIHBhcmFtZXRlciBzdHJpbmcuXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IG9ialxuICovXG5cblVybC5wYXJhbXMgPSBmdW5jdGlvbiAob2JqKSB7XG5cbiAgICB2YXIgcGFyYW1zID0gW10sXG4gICAgICAgIGVzY2FwZSA9IGVuY29kZVVSSUNvbXBvbmVudDtcblxuICAgIHBhcmFtcy5hZGQgPSBmdW5jdGlvbiAoa2V5LCB2YWx1ZSkge1xuXG4gICAgICAgIGlmIChpc0Z1bmN0aW9uKHZhbHVlKSkge1xuICAgICAgICAgICAgdmFsdWUgPSB2YWx1ZSgpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHZhbHVlID09PSBudWxsKSB7XG4gICAgICAgICAgICB2YWx1ZSA9ICcnO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5wdXNoKGVzY2FwZShrZXkpICsgJz0nICsgZXNjYXBlKHZhbHVlKSk7XG4gICAgfTtcblxuICAgIHNlcmlhbGl6ZShwYXJhbXMsIG9iaik7XG5cbiAgICByZXR1cm4gcGFyYW1zLmpvaW4oJyYnKS5yZXBsYWNlKC8lMjAvZywgJysnKTtcbn07XG5cbi8qKlxuICogUGFyc2UgYSBVUkwgYW5kIHJldHVybiBpdHMgY29tcG9uZW50cy5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gdXJsXG4gKi9cblxuVXJsLnBhcnNlID0gZnVuY3Rpb24gKHVybCkge1xuXG4gICAgaWYgKGllKSB7XG4gICAgICAgIGVsLmhyZWYgPSB1cmw7XG4gICAgICAgIHVybCA9IGVsLmhyZWY7XG4gICAgfVxuXG4gICAgZWwuaHJlZiA9IHVybDtcblxuICAgIHJldHVybiB7XG4gICAgICAgIGhyZWY6IGVsLmhyZWYsXG4gICAgICAgIHByb3RvY29sOiBlbC5wcm90b2NvbCA/IGVsLnByb3RvY29sLnJlcGxhY2UoLzokLywgJycpIDogJycsXG4gICAgICAgIHBvcnQ6IGVsLnBvcnQsXG4gICAgICAgIGhvc3Q6IGVsLmhvc3QsXG4gICAgICAgIGhvc3RuYW1lOiBlbC5ob3N0bmFtZSxcbiAgICAgICAgcGF0aG5hbWU6IGVsLnBhdGhuYW1lLmNoYXJBdCgwKSA9PT0gJy8nID8gZWwucGF0aG5hbWUgOiAnLycgKyBlbC5wYXRobmFtZSxcbiAgICAgICAgc2VhcmNoOiBlbC5zZWFyY2ggPyBlbC5zZWFyY2gucmVwbGFjZSgvXlxcPy8sICcnKSA6ICcnLFxuICAgICAgICBoYXNoOiBlbC5oYXNoID8gZWwuaGFzaC5yZXBsYWNlKC9eIy8sICcnKSA6ICcnXG4gICAgfTtcbn07XG5cbmZ1bmN0aW9uIGZhY3RvcnkoaGFuZGxlciwgbmV4dCwgdm0pIHtcbiAgICByZXR1cm4gZnVuY3Rpb24gKG9wdGlvbnMpIHtcbiAgICAgICAgcmV0dXJuIGhhbmRsZXIuY2FsbCh2bSwgb3B0aW9ucywgbmV4dCk7XG4gICAgfTtcbn1cblxuZnVuY3Rpb24gc2VyaWFsaXplKHBhcmFtcywgb2JqLCBzY29wZSkge1xuXG4gICAgdmFyIGFycmF5ID0gaXNBcnJheShvYmopLFxuICAgICAgICBwbGFpbiA9IGlzUGxhaW5PYmplY3Qob2JqKSxcbiAgICAgICAgaGFzaDtcblxuICAgIGVhY2gob2JqLCBmdW5jdGlvbiAodmFsdWUsIGtleSkge1xuXG4gICAgICAgIGhhc2ggPSBpc09iamVjdCh2YWx1ZSkgfHwgaXNBcnJheSh2YWx1ZSk7XG5cbiAgICAgICAgaWYgKHNjb3BlKSB7XG4gICAgICAgICAgICBrZXkgPSBzY29wZSArICdbJyArIChwbGFpbiB8fCBoYXNoID8ga2V5IDogJycpICsgJ10nO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCFzY29wZSAmJiBhcnJheSkge1xuICAgICAgICAgICAgcGFyYW1zLmFkZCh2YWx1ZS5uYW1lLCB2YWx1ZS52YWx1ZSk7XG4gICAgICAgIH0gZWxzZSBpZiAoaGFzaCkge1xuICAgICAgICAgICAgc2VyaWFsaXplKHBhcmFtcywgdmFsdWUsIGtleSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBwYXJhbXMuYWRkKGtleSwgdmFsdWUpO1xuICAgICAgICB9XG4gICAgfSk7XG59XG5cbmZ1bmN0aW9uIHhkckNsaWVudCAocmVxdWVzdCkge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSQxKGZ1bmN0aW9uIChyZXNvbHZlKSB7XG5cbiAgICAgICAgdmFyIHhkciA9IG5ldyBYRG9tYWluUmVxdWVzdCgpLFxuICAgICAgICAgICAgaGFuZGxlciA9IGZ1bmN0aW9uIChldmVudCkge1xuXG4gICAgICAgICAgICB2YXIgcmVzcG9uc2UgPSByZXF1ZXN0LnJlc3BvbmRXaXRoKHhkci5yZXNwb25zZVRleHQsIHtcbiAgICAgICAgICAgICAgICBzdGF0dXM6IHhkci5zdGF0dXMsXG4gICAgICAgICAgICAgICAgc3RhdHVzVGV4dDogeGRyLnN0YXR1c1RleHRcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICByZXNvbHZlKHJlc3BvbnNlKTtcbiAgICAgICAgfTtcblxuICAgICAgICByZXF1ZXN0LmFib3J0ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIHhkci5hYm9ydCgpO1xuICAgICAgICB9O1xuXG4gICAgICAgIHhkci5vcGVuKHJlcXVlc3QubWV0aG9kLCByZXF1ZXN0LmdldFVybCgpLCB0cnVlKTtcbiAgICAgICAgeGRyLnRpbWVvdXQgPSAwO1xuICAgICAgICB4ZHIub25sb2FkID0gaGFuZGxlcjtcbiAgICAgICAgeGRyLm9uZXJyb3IgPSBoYW5kbGVyO1xuICAgICAgICB4ZHIub250aW1lb3V0ID0gZnVuY3Rpb24gKCkge307XG4gICAgICAgIHhkci5vbnByb2dyZXNzID0gZnVuY3Rpb24gKCkge307XG4gICAgICAgIHhkci5zZW5kKHJlcXVlc3QuZ2V0Qm9keSgpKTtcbiAgICB9KTtcbn1cblxudmFyIE9SSUdJTl9VUkwgPSBVcmwucGFyc2UobG9jYXRpb24uaHJlZik7XG52YXIgU1VQUE9SVFNfQ09SUyA9ICd3aXRoQ3JlZGVudGlhbHMnIGluIG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xuXG5mdW5jdGlvbiBjb3JzIChyZXF1ZXN0LCBuZXh0KSB7XG5cbiAgICBpZiAoIWlzQm9vbGVhbihyZXF1ZXN0LmNyb3NzT3JpZ2luKSAmJiBjcm9zc09yaWdpbihyZXF1ZXN0KSkge1xuICAgICAgICByZXF1ZXN0LmNyb3NzT3JpZ2luID0gdHJ1ZTtcbiAgICB9XG5cbiAgICBpZiAocmVxdWVzdC5jcm9zc09yaWdpbikge1xuXG4gICAgICAgIGlmICghU1VQUE9SVFNfQ09SUykge1xuICAgICAgICAgICAgcmVxdWVzdC5jbGllbnQgPSB4ZHJDbGllbnQ7XG4gICAgICAgIH1cblxuICAgICAgICBkZWxldGUgcmVxdWVzdC5lbXVsYXRlSFRUUDtcbiAgICB9XG5cbiAgICBuZXh0KCk7XG59XG5cbmZ1bmN0aW9uIGNyb3NzT3JpZ2luKHJlcXVlc3QpIHtcblxuICAgIHZhciByZXF1ZXN0VXJsID0gVXJsLnBhcnNlKFVybChyZXF1ZXN0KSk7XG5cbiAgICByZXR1cm4gcmVxdWVzdFVybC5wcm90b2NvbCAhPT0gT1JJR0lOX1VSTC5wcm90b2NvbCB8fCByZXF1ZXN0VXJsLmhvc3QgIT09IE9SSUdJTl9VUkwuaG9zdDtcbn1cblxuZnVuY3Rpb24gYm9keSAocmVxdWVzdCwgbmV4dCkge1xuXG4gICAgaWYgKHJlcXVlc3QuZW11bGF0ZUpTT04gJiYgaXNQbGFpbk9iamVjdChyZXF1ZXN0LmJvZHkpKSB7XG4gICAgICAgIHJlcXVlc3QuYm9keSA9IFVybC5wYXJhbXMocmVxdWVzdC5ib2R5KTtcbiAgICAgICAgcmVxdWVzdC5oZWFkZXJzWydDb250ZW50LVR5cGUnXSA9ICdhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWQnO1xuICAgIH1cblxuICAgIGlmIChpc0Zvcm1EYXRhKHJlcXVlc3QuYm9keSkpIHtcbiAgICAgICAgZGVsZXRlIHJlcXVlc3QuaGVhZGVyc1snQ29udGVudC1UeXBlJ107XG4gICAgfVxuXG4gICAgaWYgKGlzUGxhaW5PYmplY3QocmVxdWVzdC5ib2R5KSkge1xuICAgICAgICByZXF1ZXN0LmJvZHkgPSBKU09OLnN0cmluZ2lmeShyZXF1ZXN0LmJvZHkpO1xuICAgIH1cblxuICAgIG5leHQoZnVuY3Rpb24gKHJlc3BvbnNlKSB7XG5cbiAgICAgICAgdmFyIGNvbnRlbnRUeXBlID0gcmVzcG9uc2UuaGVhZGVyc1snQ29udGVudC1UeXBlJ107XG5cbiAgICAgICAgaWYgKGlzU3RyaW5nKGNvbnRlbnRUeXBlKSAmJiBjb250ZW50VHlwZS5pbmRleE9mKCdhcHBsaWNhdGlvbi9qc29uJykgPT09IDApIHtcblxuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICByZXNwb25zZS5kYXRhID0gcmVzcG9uc2UuanNvbigpO1xuICAgICAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgICAgICAgIHJlc3BvbnNlLmRhdGEgPSBudWxsO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmVzcG9uc2UuZGF0YSA9IHJlc3BvbnNlLnRleHQoKTtcbiAgICAgICAgfVxuICAgIH0pO1xufVxuXG5mdW5jdGlvbiBqc29ucENsaWVudCAocmVxdWVzdCkge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSQxKGZ1bmN0aW9uIChyZXNvbHZlKSB7XG5cbiAgICAgICAgdmFyIG5hbWUgPSByZXF1ZXN0Lmpzb25wIHx8ICdjYWxsYmFjaycsXG4gICAgICAgICAgICBjYWxsYmFjayA9ICdfanNvbnAnICsgTWF0aC5yYW5kb20oKS50b1N0cmluZygzNikuc3Vic3RyKDIpLFxuICAgICAgICAgICAgYm9keSA9IG51bGwsXG4gICAgICAgICAgICBoYW5kbGVyLFxuICAgICAgICAgICAgc2NyaXB0O1xuXG4gICAgICAgIGhhbmRsZXIgPSBmdW5jdGlvbiAoZXZlbnQpIHtcblxuICAgICAgICAgICAgdmFyIHN0YXR1cyA9IDA7XG5cbiAgICAgICAgICAgIGlmIChldmVudC50eXBlID09PSAnbG9hZCcgJiYgYm9keSAhPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIHN0YXR1cyA9IDIwMDtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoZXZlbnQudHlwZSA9PT0gJ2Vycm9yJykge1xuICAgICAgICAgICAgICAgIHN0YXR1cyA9IDQwNDtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmVzb2x2ZShyZXF1ZXN0LnJlc3BvbmRXaXRoKGJvZHksIHsgc3RhdHVzOiBzdGF0dXMgfSkpO1xuXG4gICAgICAgICAgICBkZWxldGUgd2luZG93W2NhbGxiYWNrXTtcbiAgICAgICAgICAgIGRvY3VtZW50LmJvZHkucmVtb3ZlQ2hpbGQoc2NyaXB0KTtcbiAgICAgICAgfTtcblxuICAgICAgICByZXF1ZXN0LnBhcmFtc1tuYW1lXSA9IGNhbGxiYWNrO1xuXG4gICAgICAgIHdpbmRvd1tjYWxsYmFja10gPSBmdW5jdGlvbiAocmVzdWx0KSB7XG4gICAgICAgICAgICBib2R5ID0gSlNPTi5zdHJpbmdpZnkocmVzdWx0KTtcbiAgICAgICAgfTtcblxuICAgICAgICBzY3JpcHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzY3JpcHQnKTtcbiAgICAgICAgc2NyaXB0LnNyYyA9IHJlcXVlc3QuZ2V0VXJsKCk7XG4gICAgICAgIHNjcmlwdC50eXBlID0gJ3RleHQvamF2YXNjcmlwdCc7XG4gICAgICAgIHNjcmlwdC5hc3luYyA9IHRydWU7XG4gICAgICAgIHNjcmlwdC5vbmxvYWQgPSBoYW5kbGVyO1xuICAgICAgICBzY3JpcHQub25lcnJvciA9IGhhbmRsZXI7XG5cbiAgICAgICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChzY3JpcHQpO1xuICAgIH0pO1xufVxuXG5mdW5jdGlvbiBqc29ucCAocmVxdWVzdCwgbmV4dCkge1xuXG4gICAgaWYgKHJlcXVlc3QubWV0aG9kID09ICdKU09OUCcpIHtcbiAgICAgICAgcmVxdWVzdC5jbGllbnQgPSBqc29ucENsaWVudDtcbiAgICB9XG5cbiAgICBuZXh0KGZ1bmN0aW9uIChyZXNwb25zZSkge1xuXG4gICAgICAgIGlmIChyZXF1ZXN0Lm1ldGhvZCA9PSAnSlNPTlAnKSB7XG4gICAgICAgICAgICByZXNwb25zZS5kYXRhID0gcmVzcG9uc2UuanNvbigpO1xuICAgICAgICB9XG4gICAgfSk7XG59XG5cbmZ1bmN0aW9uIGJlZm9yZSAocmVxdWVzdCwgbmV4dCkge1xuXG4gICAgaWYgKGlzRnVuY3Rpb24ocmVxdWVzdC5iZWZvcmUpKSB7XG4gICAgICAgIHJlcXVlc3QuYmVmb3JlLmNhbGwodGhpcywgcmVxdWVzdCk7XG4gICAgfVxuXG4gICAgbmV4dCgpO1xufVxuXG4vKipcbiAqIEhUVFAgbWV0aG9kIG92ZXJyaWRlIEludGVyY2VwdG9yLlxuICovXG5cbmZ1bmN0aW9uIG1ldGhvZCAocmVxdWVzdCwgbmV4dCkge1xuXG4gICAgaWYgKHJlcXVlc3QuZW11bGF0ZUhUVFAgJiYgL14oUFVUfFBBVENIfERFTEVURSkkL2kudGVzdChyZXF1ZXN0Lm1ldGhvZCkpIHtcbiAgICAgICAgcmVxdWVzdC5oZWFkZXJzWydYLUhUVFAtTWV0aG9kLU92ZXJyaWRlJ10gPSByZXF1ZXN0Lm1ldGhvZDtcbiAgICAgICAgcmVxdWVzdC5tZXRob2QgPSAnUE9TVCc7XG4gICAgfVxuXG4gICAgbmV4dCgpO1xufVxuXG5mdW5jdGlvbiBoZWFkZXIgKHJlcXVlc3QsIG5leHQpIHtcblxuICAgIHJlcXVlc3QubWV0aG9kID0gcmVxdWVzdC5tZXRob2QudG9VcHBlckNhc2UoKTtcbiAgICByZXF1ZXN0LmhlYWRlcnMgPSBhc3NpZ24oe30sIEh0dHAuaGVhZGVycy5jb21tb24sICFyZXF1ZXN0LmNyb3NzT3JpZ2luID8gSHR0cC5oZWFkZXJzLmN1c3RvbSA6IHt9LCBIdHRwLmhlYWRlcnNbcmVxdWVzdC5tZXRob2QudG9Mb3dlckNhc2UoKV0sIHJlcXVlc3QuaGVhZGVycyk7XG5cbiAgICBuZXh0KCk7XG59XG5cbi8qKlxuICogVGltZW91dCBJbnRlcmNlcHRvci5cbiAqL1xuXG5mdW5jdGlvbiB0aW1lb3V0IChyZXF1ZXN0LCBuZXh0KSB7XG5cbiAgICB2YXIgdGltZW91dDtcblxuICAgIGlmIChyZXF1ZXN0LnRpbWVvdXQpIHtcbiAgICAgICAgdGltZW91dCA9IHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmVxdWVzdC5hYm9ydCgpO1xuICAgICAgICB9LCByZXF1ZXN0LnRpbWVvdXQpO1xuICAgIH1cblxuICAgIG5leHQoZnVuY3Rpb24gKHJlc3BvbnNlKSB7XG5cbiAgICAgICAgY2xlYXJUaW1lb3V0KHRpbWVvdXQpO1xuICAgIH0pO1xufVxuXG5mdW5jdGlvbiB4aHJDbGllbnQgKHJlcXVlc3QpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UkMShmdW5jdGlvbiAocmVzb2x2ZSkge1xuXG4gICAgICAgIHZhciB4aHIgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKSxcbiAgICAgICAgICAgIGhhbmRsZXIgPSBmdW5jdGlvbiAoZXZlbnQpIHtcblxuICAgICAgICAgICAgdmFyIHJlc3BvbnNlID0gcmVxdWVzdC5yZXNwb25kV2l0aCgncmVzcG9uc2UnIGluIHhociA/IHhoci5yZXNwb25zZSA6IHhoci5yZXNwb25zZVRleHQsIHtcbiAgICAgICAgICAgICAgICBzdGF0dXM6IHhoci5zdGF0dXMgPT09IDEyMjMgPyAyMDQgOiB4aHIuc3RhdHVzLCAvLyBJRTkgc3RhdHVzIGJ1Z1xuICAgICAgICAgICAgICAgIHN0YXR1c1RleHQ6IHhoci5zdGF0dXMgPT09IDEyMjMgPyAnTm8gQ29udGVudCcgOiB0cmltKHhoci5zdGF0dXNUZXh0KSxcbiAgICAgICAgICAgICAgICBoZWFkZXJzOiBwYXJzZUhlYWRlcnMoeGhyLmdldEFsbFJlc3BvbnNlSGVhZGVycygpKVxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIHJlc29sdmUocmVzcG9uc2UpO1xuICAgICAgICB9O1xuXG4gICAgICAgIHJlcXVlc3QuYWJvcnQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4geGhyLmFib3J0KCk7XG4gICAgICAgIH07XG5cbiAgICAgICAgeGhyLm9wZW4ocmVxdWVzdC5tZXRob2QsIHJlcXVlc3QuZ2V0VXJsKCksIHRydWUpO1xuICAgICAgICB4aHIudGltZW91dCA9IDA7XG4gICAgICAgIHhoci5vbmxvYWQgPSBoYW5kbGVyO1xuICAgICAgICB4aHIub25lcnJvciA9IGhhbmRsZXI7XG5cbiAgICAgICAgaWYgKHJlcXVlc3QucHJvZ3Jlc3MpIHtcbiAgICAgICAgICAgIGlmIChyZXF1ZXN0Lm1ldGhvZCA9PT0gJ0dFVCcpIHtcbiAgICAgICAgICAgICAgICB4aHIuYWRkRXZlbnRMaXN0ZW5lcigncHJvZ3Jlc3MnLCByZXF1ZXN0LnByb2dyZXNzKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoL14oUE9TVHxQVVQpJC9pLnRlc3QocmVxdWVzdC5tZXRob2QpKSB7XG4gICAgICAgICAgICAgICAgeGhyLnVwbG9hZC5hZGRFdmVudExpc3RlbmVyKCdwcm9ncmVzcycsIHJlcXVlc3QucHJvZ3Jlc3MpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHJlcXVlc3QuY3JlZGVudGlhbHMgPT09IHRydWUpIHtcbiAgICAgICAgICAgIHhoci53aXRoQ3JlZGVudGlhbHMgPSB0cnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgZWFjaChyZXF1ZXN0LmhlYWRlcnMgfHwge30sIGZ1bmN0aW9uICh2YWx1ZSwgaGVhZGVyKSB7XG4gICAgICAgICAgICB4aHIuc2V0UmVxdWVzdEhlYWRlcihoZWFkZXIsIHZhbHVlKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgeGhyLnNlbmQocmVxdWVzdC5nZXRCb2R5KCkpO1xuICAgIH0pO1xufVxuXG5mdW5jdGlvbiBwYXJzZUhlYWRlcnMoc3RyKSB7XG5cbiAgICB2YXIgaGVhZGVycyA9IHt9LFxuICAgICAgICB2YWx1ZSxcbiAgICAgICAgbmFtZSxcbiAgICAgICAgaTtcblxuICAgIGVhY2godHJpbShzdHIpLnNwbGl0KCdcXG4nKSwgZnVuY3Rpb24gKHJvdykge1xuXG4gICAgICAgIGkgPSByb3cuaW5kZXhPZignOicpO1xuICAgICAgICBuYW1lID0gdHJpbShyb3cuc2xpY2UoMCwgaSkpO1xuICAgICAgICB2YWx1ZSA9IHRyaW0ocm93LnNsaWNlKGkgKyAxKSk7XG5cbiAgICAgICAgaWYgKGhlYWRlcnNbbmFtZV0pIHtcblxuICAgICAgICAgICAgaWYgKGlzQXJyYXkoaGVhZGVyc1tuYW1lXSkpIHtcbiAgICAgICAgICAgICAgICBoZWFkZXJzW25hbWVdLnB1c2godmFsdWUpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBoZWFkZXJzW25hbWVdID0gW2hlYWRlcnNbbmFtZV0sIHZhbHVlXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcblxuICAgICAgICAgICAgaGVhZGVyc1tuYW1lXSA9IHZhbHVlO1xuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICByZXR1cm4gaGVhZGVycztcbn1cblxuZnVuY3Rpb24gQ2xpZW50IChjb250ZXh0KSB7XG5cbiAgICB2YXIgcmVxSGFuZGxlcnMgPSBbc2VuZFJlcXVlc3RdLFxuICAgICAgICByZXNIYW5kbGVycyA9IFtdLFxuICAgICAgICBoYW5kbGVyO1xuXG4gICAgaWYgKCFpc09iamVjdChjb250ZXh0KSkge1xuICAgICAgICBjb250ZXh0ID0gbnVsbDtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBDbGllbnQocmVxdWVzdCkge1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UkMShmdW5jdGlvbiAocmVzb2x2ZSkge1xuXG4gICAgICAgICAgICBmdW5jdGlvbiBleGVjKCkge1xuXG4gICAgICAgICAgICAgICAgaGFuZGxlciA9IHJlcUhhbmRsZXJzLnBvcCgpO1xuXG4gICAgICAgICAgICAgICAgaWYgKGlzRnVuY3Rpb24oaGFuZGxlcikpIHtcbiAgICAgICAgICAgICAgICAgICAgaGFuZGxlci5jYWxsKGNvbnRleHQsIHJlcXVlc3QsIG5leHQpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHdhcm4oJ0ludmFsaWQgaW50ZXJjZXB0b3Igb2YgdHlwZSAnICsgdHlwZW9mIGhhbmRsZXIgKyAnLCBtdXN0IGJlIGEgZnVuY3Rpb24nKTtcbiAgICAgICAgICAgICAgICAgICAgbmV4dCgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgZnVuY3Rpb24gbmV4dChyZXNwb25zZSkge1xuXG4gICAgICAgICAgICAgICAgaWYgKGlzRnVuY3Rpb24ocmVzcG9uc2UpKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgcmVzSGFuZGxlcnMudW5zaGlmdChyZXNwb25zZSk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChpc09iamVjdChyZXNwb25zZSkpIHtcblxuICAgICAgICAgICAgICAgICAgICByZXNIYW5kbGVycy5mb3JFYWNoKGZ1bmN0aW9uIChoYW5kbGVyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXNwb25zZSA9IHdoZW4ocmVzcG9uc2UsIGZ1bmN0aW9uIChyZXNwb25zZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBoYW5kbGVyLmNhbGwoY29udGV4dCwgcmVzcG9uc2UpIHx8IHJlc3BvbnNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgICAgIHdoZW4ocmVzcG9uc2UsIHJlc29sdmUpO1xuXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBleGVjKCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGV4ZWMoKTtcbiAgICAgICAgfSwgY29udGV4dCk7XG4gICAgfVxuXG4gICAgQ2xpZW50LnVzZSA9IGZ1bmN0aW9uIChoYW5kbGVyKSB7XG4gICAgICAgIHJlcUhhbmRsZXJzLnB1c2goaGFuZGxlcik7XG4gICAgfTtcblxuICAgIHJldHVybiBDbGllbnQ7XG59XG5cbmZ1bmN0aW9uIHNlbmRSZXF1ZXN0KHJlcXVlc3QsIHJlc29sdmUpIHtcblxuICAgIHZhciBjbGllbnQgPSByZXF1ZXN0LmNsaWVudCB8fCB4aHJDbGllbnQ7XG5cbiAgICByZXNvbHZlKGNsaWVudChyZXF1ZXN0KSk7XG59XG5cbnZhciBjbGFzc0NhbGxDaGVjayA9IGZ1bmN0aW9uIChpbnN0YW5jZSwgQ29uc3RydWN0b3IpIHtcbiAgaWYgKCEoaW5zdGFuY2UgaW5zdGFuY2VvZiBDb25zdHJ1Y3RvcikpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IGNhbGwgYSBjbGFzcyBhcyBhIGZ1bmN0aW9uXCIpO1xuICB9XG59O1xuXG4vKipcbiAqIEhUVFAgUmVzcG9uc2UuXG4gKi9cblxudmFyIFJlc3BvbnNlID0gZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIFJlc3BvbnNlKGJvZHksIF9yZWYpIHtcbiAgICAgICAgdmFyIHVybCA9IF9yZWYudXJsO1xuICAgICAgICB2YXIgaGVhZGVycyA9IF9yZWYuaGVhZGVycztcbiAgICAgICAgdmFyIHN0YXR1cyA9IF9yZWYuc3RhdHVzO1xuICAgICAgICB2YXIgc3RhdHVzVGV4dCA9IF9yZWYuc3RhdHVzVGV4dDtcbiAgICAgICAgY2xhc3NDYWxsQ2hlY2sodGhpcywgUmVzcG9uc2UpO1xuXG5cbiAgICAgICAgdGhpcy51cmwgPSB1cmw7XG4gICAgICAgIHRoaXMuYm9keSA9IGJvZHk7XG4gICAgICAgIHRoaXMuaGVhZGVycyA9IGhlYWRlcnMgfHwge307XG4gICAgICAgIHRoaXMuc3RhdHVzID0gc3RhdHVzIHx8IDA7XG4gICAgICAgIHRoaXMuc3RhdHVzVGV4dCA9IHN0YXR1c1RleHQgfHwgJyc7XG4gICAgICAgIHRoaXMub2sgPSBzdGF0dXMgPj0gMjAwICYmIHN0YXR1cyA8IDMwMDtcbiAgICB9XG5cbiAgICBSZXNwb25zZS5wcm90b3R5cGUudGV4dCA9IGZ1bmN0aW9uIHRleHQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmJvZHk7XG4gICAgfTtcblxuICAgIFJlc3BvbnNlLnByb3RvdHlwZS5ibG9iID0gZnVuY3Rpb24gYmxvYigpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBCbG9iKFt0aGlzLmJvZHldKTtcbiAgICB9O1xuXG4gICAgUmVzcG9uc2UucHJvdG90eXBlLmpzb24gPSBmdW5jdGlvbiBqc29uKCkge1xuICAgICAgICByZXR1cm4gSlNPTi5wYXJzZSh0aGlzLmJvZHkpO1xuICAgIH07XG5cbiAgICByZXR1cm4gUmVzcG9uc2U7XG59KCk7XG5cbnZhciBSZXF1ZXN0ID0gZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIFJlcXVlc3Qob3B0aW9ucykge1xuICAgICAgICBjbGFzc0NhbGxDaGVjayh0aGlzLCBSZXF1ZXN0KTtcblxuXG4gICAgICAgIHRoaXMubWV0aG9kID0gJ0dFVCc7XG4gICAgICAgIHRoaXMuYm9keSA9IG51bGw7XG4gICAgICAgIHRoaXMucGFyYW1zID0ge307XG4gICAgICAgIHRoaXMuaGVhZGVycyA9IHt9O1xuXG4gICAgICAgIGFzc2lnbih0aGlzLCBvcHRpb25zKTtcbiAgICB9XG5cbiAgICBSZXF1ZXN0LnByb3RvdHlwZS5nZXRVcmwgPSBmdW5jdGlvbiBnZXRVcmwoKSB7XG4gICAgICAgIHJldHVybiBVcmwodGhpcyk7XG4gICAgfTtcblxuICAgIFJlcXVlc3QucHJvdG90eXBlLmdldEJvZHkgPSBmdW5jdGlvbiBnZXRCb2R5KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5ib2R5O1xuICAgIH07XG5cbiAgICBSZXF1ZXN0LnByb3RvdHlwZS5yZXNwb25kV2l0aCA9IGZ1bmN0aW9uIHJlc3BvbmRXaXRoKGJvZHksIG9wdGlvbnMpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBSZXNwb25zZShib2R5LCBhc3NpZ24ob3B0aW9ucyB8fCB7fSwgeyB1cmw6IHRoaXMuZ2V0VXJsKCkgfSkpO1xuICAgIH07XG5cbiAgICByZXR1cm4gUmVxdWVzdDtcbn0oKTtcblxuLyoqXG4gKiBTZXJ2aWNlIGZvciBzZW5kaW5nIG5ldHdvcmsgcmVxdWVzdHMuXG4gKi9cblxudmFyIENVU1RPTV9IRUFERVJTID0geyAnWC1SZXF1ZXN0ZWQtV2l0aCc6ICdYTUxIdHRwUmVxdWVzdCcgfTtcbnZhciBDT01NT05fSEVBREVSUyA9IHsgJ0FjY2VwdCc6ICdhcHBsaWNhdGlvbi9qc29uLCB0ZXh0L3BsYWluLCAqLyonIH07XG52YXIgSlNPTl9DT05URU5UX1RZUEUgPSB7ICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbjtjaGFyc2V0PXV0Zi04JyB9O1xuXG5mdW5jdGlvbiBIdHRwKG9wdGlvbnMpIHtcblxuICAgIHZhciBzZWxmID0gdGhpcyB8fCB7fSxcbiAgICAgICAgY2xpZW50ID0gQ2xpZW50KHNlbGYuJHZtKTtcblxuICAgIGRlZmF1bHRzKG9wdGlvbnMgfHwge30sIHNlbGYuJG9wdGlvbnMsIEh0dHAub3B0aW9ucyk7XG5cbiAgICBIdHRwLmludGVyY2VwdG9ycy5mb3JFYWNoKGZ1bmN0aW9uIChoYW5kbGVyKSB7XG4gICAgICAgIGNsaWVudC51c2UoaGFuZGxlcik7XG4gICAgfSk7XG5cbiAgICByZXR1cm4gY2xpZW50KG5ldyBSZXF1ZXN0KG9wdGlvbnMpKS50aGVuKGZ1bmN0aW9uIChyZXNwb25zZSkge1xuXG4gICAgICAgIHJldHVybiByZXNwb25zZS5vayA/IHJlc3BvbnNlIDogUHJvbWlzZSQxLnJlamVjdChyZXNwb25zZSk7XG4gICAgfSwgZnVuY3Rpb24gKHJlc3BvbnNlKSB7XG5cbiAgICAgICAgaWYgKHJlc3BvbnNlIGluc3RhbmNlb2YgRXJyb3IpIHtcbiAgICAgICAgICAgIGVycm9yKHJlc3BvbnNlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBQcm9taXNlJDEucmVqZWN0KHJlc3BvbnNlKTtcbiAgICB9KTtcbn1cblxuSHR0cC5vcHRpb25zID0ge307XG5cbkh0dHAuaGVhZGVycyA9IHtcbiAgICBwdXQ6IEpTT05fQ09OVEVOVF9UWVBFLFxuICAgIHBvc3Q6IEpTT05fQ09OVEVOVF9UWVBFLFxuICAgIHBhdGNoOiBKU09OX0NPTlRFTlRfVFlQRSxcbiAgICBkZWxldGU6IEpTT05fQ09OVEVOVF9UWVBFLFxuICAgIGN1c3RvbTogQ1VTVE9NX0hFQURFUlMsXG4gICAgY29tbW9uOiBDT01NT05fSEVBREVSU1xufTtcblxuSHR0cC5pbnRlcmNlcHRvcnMgPSBbYmVmb3JlLCB0aW1lb3V0LCBtZXRob2QsIGJvZHksIGpzb25wLCBoZWFkZXIsIGNvcnNdO1xuXG5bJ2dldCcsICdkZWxldGUnLCAnaGVhZCcsICdqc29ucCddLmZvckVhY2goZnVuY3Rpb24gKG1ldGhvZCkge1xuXG4gICAgSHR0cFttZXRob2RdID0gZnVuY3Rpb24gKHVybCwgb3B0aW9ucykge1xuICAgICAgICByZXR1cm4gdGhpcyhhc3NpZ24ob3B0aW9ucyB8fCB7fSwgeyB1cmw6IHVybCwgbWV0aG9kOiBtZXRob2QgfSkpO1xuICAgIH07XG59KTtcblxuWydwb3N0JywgJ3B1dCcsICdwYXRjaCddLmZvckVhY2goZnVuY3Rpb24gKG1ldGhvZCkge1xuXG4gICAgSHR0cFttZXRob2RdID0gZnVuY3Rpb24gKHVybCwgYm9keSwgb3B0aW9ucykge1xuICAgICAgICByZXR1cm4gdGhpcyhhc3NpZ24ob3B0aW9ucyB8fCB7fSwgeyB1cmw6IHVybCwgbWV0aG9kOiBtZXRob2QsIGJvZHk6IGJvZHkgfSkpO1xuICAgIH07XG59KTtcblxuZnVuY3Rpb24gUmVzb3VyY2UodXJsLCBwYXJhbXMsIGFjdGlvbnMsIG9wdGlvbnMpIHtcblxuICAgIHZhciBzZWxmID0gdGhpcyB8fCB7fSxcbiAgICAgICAgcmVzb3VyY2UgPSB7fTtcblxuICAgIGFjdGlvbnMgPSBhc3NpZ24oe30sIFJlc291cmNlLmFjdGlvbnMsIGFjdGlvbnMpO1xuXG4gICAgZWFjaChhY3Rpb25zLCBmdW5jdGlvbiAoYWN0aW9uLCBuYW1lKSB7XG5cbiAgICAgICAgYWN0aW9uID0gbWVyZ2UoeyB1cmw6IHVybCwgcGFyYW1zOiBwYXJhbXMgfHwge30gfSwgb3B0aW9ucywgYWN0aW9uKTtcblxuICAgICAgICByZXNvdXJjZVtuYW1lXSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiAoc2VsZi4kaHR0cCB8fCBIdHRwKShvcHRzKGFjdGlvbiwgYXJndW1lbnRzKSk7XG4gICAgICAgIH07XG4gICAgfSk7XG5cbiAgICByZXR1cm4gcmVzb3VyY2U7XG59XG5cbmZ1bmN0aW9uIG9wdHMoYWN0aW9uLCBhcmdzKSB7XG5cbiAgICB2YXIgb3B0aW9ucyA9IGFzc2lnbih7fSwgYWN0aW9uKSxcbiAgICAgICAgcGFyYW1zID0ge30sXG4gICAgICAgIGJvZHk7XG5cbiAgICBzd2l0Y2ggKGFyZ3MubGVuZ3RoKSB7XG5cbiAgICAgICAgY2FzZSAyOlxuXG4gICAgICAgICAgICBwYXJhbXMgPSBhcmdzWzBdO1xuICAgICAgICAgICAgYm9keSA9IGFyZ3NbMV07XG5cbiAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgIGNhc2UgMTpcblxuICAgICAgICAgICAgaWYgKC9eKFBPU1R8UFVUfFBBVENIKSQvaS50ZXN0KG9wdGlvbnMubWV0aG9kKSkge1xuICAgICAgICAgICAgICAgIGJvZHkgPSBhcmdzWzBdO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBwYXJhbXMgPSBhcmdzWzBdO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBicmVhaztcblxuICAgICAgICBjYXNlIDA6XG5cbiAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgIGRlZmF1bHQ6XG5cbiAgICAgICAgICAgIHRocm93ICdFeHBlY3RlZCB1cCB0byA0IGFyZ3VtZW50cyBbcGFyYW1zLCBib2R5XSwgZ290ICcgKyBhcmdzLmxlbmd0aCArICcgYXJndW1lbnRzJztcbiAgICB9XG5cbiAgICBvcHRpb25zLmJvZHkgPSBib2R5O1xuICAgIG9wdGlvbnMucGFyYW1zID0gYXNzaWduKHt9LCBvcHRpb25zLnBhcmFtcywgcGFyYW1zKTtcblxuICAgIHJldHVybiBvcHRpb25zO1xufVxuXG5SZXNvdXJjZS5hY3Rpb25zID0ge1xuXG4gICAgZ2V0OiB7IG1ldGhvZDogJ0dFVCcgfSxcbiAgICBzYXZlOiB7IG1ldGhvZDogJ1BPU1QnIH0sXG4gICAgcXVlcnk6IHsgbWV0aG9kOiAnR0VUJyB9LFxuICAgIHVwZGF0ZTogeyBtZXRob2Q6ICdQVVQnIH0sXG4gICAgcmVtb3ZlOiB7IG1ldGhvZDogJ0RFTEVURScgfSxcbiAgICBkZWxldGU6IHsgbWV0aG9kOiAnREVMRVRFJyB9XG5cbn07XG5cbmZ1bmN0aW9uIHBsdWdpbihWdWUpIHtcblxuICAgIGlmIChwbHVnaW4uaW5zdGFsbGVkKSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBVdGlsKFZ1ZSk7XG5cbiAgICBWdWUudXJsID0gVXJsO1xuICAgIFZ1ZS5odHRwID0gSHR0cDtcbiAgICBWdWUucmVzb3VyY2UgPSBSZXNvdXJjZTtcbiAgICBWdWUuUHJvbWlzZSA9IFByb21pc2UkMTtcblxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0aWVzKFZ1ZS5wcm90b3R5cGUsIHtcblxuICAgICAgICAkdXJsOiB7XG4gICAgICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gb3B0aW9ucyhWdWUudXJsLCB0aGlzLCB0aGlzLiRvcHRpb25zLnVybCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG5cbiAgICAgICAgJGh0dHA6IHtcbiAgICAgICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBvcHRpb25zKFZ1ZS5odHRwLCB0aGlzLCB0aGlzLiRvcHRpb25zLmh0dHApO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuXG4gICAgICAgICRyZXNvdXJjZToge1xuICAgICAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIFZ1ZS5yZXNvdXJjZS5iaW5kKHRoaXMpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuXG4gICAgICAgICRwcm9taXNlOiB7XG4gICAgICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZ1bmN0aW9uIChleGVjdXRvcikge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gbmV3IFZ1ZS5Qcm9taXNlKGV4ZWN1dG9yLCBfdGhpcyk7XG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgfSk7XG59XG5cbmlmICh0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJyAmJiB3aW5kb3cuVnVlKSB7XG4gICAgd2luZG93LlZ1ZS51c2UocGx1Z2luKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBwbHVnaW47XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vdnVlLXJlc291cmNlL2Rpc3QvdnVlLXJlc291cmNlLmNvbW1vbi5qc1xuICoqIG1vZHVsZSBpZCA9IDZcbiAqKiBtb2R1bGUgY2h1bmtzID0gMyA0XG4gKiovIiwiLyoqXG4gKiBDcmVhdGVkIGJ5IGh1bW9ySGFuIG9uIDIwMTYvNy81LlxuICovXG52YXIgdGVzdFZ1ZSA9IHJlcXVpcmUoXCIuLi9hcHAvdGVzdFwiKTtcblxudmFyIG1lbnUgPSBuZXcgVnVlKHtcbiAgICBlbDogJyN0ZXN0JyxcbiAgICBkYXRhOiB7XG4gICAgICAgIGZpcnN0TmFtZTogJ+W8oCcsXG4gICAgICAgIGxhc3ROYW1lOiAn5LiJJyxcbiAgICAgICAgYWdlOiAnMjUnLFxuICAgICAgICBzZXg6ICdtYW4nLFxuICAgICAgICBpdGVtczogWzEsMiwzXVxuICAgIH0sXG4gICAgdGVtcGxhdGU6ICcjc2VsZicsXG4gICAgY29tcHV0ZWQ6IHtcbiAgICAgICAgZnVsbE5hbWU6IGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5maXJzdE5hbWUgKyAnICcgKyB0aGlzLmxhc3ROYW1lO1xuICAgICAgICB9XG4gICAgfSxcbiAgICBtZXRob2RzOiB7XG4gICAgICAgIHNheUhlbGxvOiBmdW5jdGlvbigpe1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ+S9oOWlvSAnICsgdGhpcy5mdWxsTmFtZSk7XG4gICAgICAgIH1cbiAgICB9XG59KTtcblxuLyrlkIzkuIDkuKp2dWXlrp7kvovkuIvvvIzpobXpnaLnmoTmqKHmnb8odGVtcGxhdGUp5Lya6KaG55uW5o6J57uE5Lu255qE5riy5p+T77yM5Zug5Li65Zyo54i26aG16Z2i5riy5p+T55qE5pe25YCZ5rWP6KeI5Zmo5LiN6K6k6K+G57uE5Lu255qE5oyC6L2954K55omA5Lul5Lya5b+955WlXG4qIOino+WGs+WKnuazleacieS4pOenje+8jOS4gOenjeaYr+WcqOmhtemdouaooeadv+S4reWGmeiHquWumuS5ieagh+etvijmjILovb3ngrkpLOWPpuS4gOenjeWwseaYr+mHjeaWsOWjsOaYjuaWsOeahHZ1ZeWunuS+iyovXG5uZXcgVnVlKHtcbiAgICBlbDogJyN0ZXN0MicsXG4gICAgY29tcG9uZW50czoge1xuICAgICAgICAnbWVudSc6IHRlc3RWdWVcbiAgICB9XG59KTtcblxuVnVlLnVzZShyZXF1aXJlKCd2dWUtcmVzb3VyY2UnKSk7XG5cbm5ldyBWdWUoe1xuICAgIGVsOiAnI3Rlc3QzJyxcbiAgICByZWFkeTogZnVuY3Rpb24oKXtcbiAgICAgICAgdGhpcy4kaHR0cC5nZXQoJ2h0dHBzOi8vYXBpLm15anNvbi5jb20vYmlucy9yOG1tJykudGhlbihmdW5jdGlvbihkYXRhKXtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGRhdGEpO1xuICAgICAgICB9LGZ1bmN0aW9uKGRhdGEsIHN0YXR1cywgcmVxdWVzdCl7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygnZmFpbCcgKyBzdGF0dXMgKyBcIixcIiArIHJlcXVlc3QpO1xuICAgICAgICB9KVxuICAgIH1cbn0pO1xuY29uc29sZS5sb2cobWVudS4kbG9nKCkpO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9qcy90ZXN0LmpzXG4gKiogbW9kdWxlIGlkID0gMTZcbiAqKiBtb2R1bGUgY2h1bmtzID0gNFxuICoqLyIsInZhciBfX3Z1ZV9zY3JpcHRfXywgX192dWVfdGVtcGxhdGVfX1xuX192dWVfc2NyaXB0X18gPSByZXF1aXJlKFwiISFiYWJlbC1sb2FkZXI/cHJlc2V0c1tdPWVzMjAxNSZwbHVnaW5zW109dHJhbnNmb3JtLXJ1bnRpbWUmY29tbWVudHM9ZmFsc2UhLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc2VsZWN0b3IuanM/dHlwZT1zY3JpcHQmaW5kZXg9MCEuL3Rlc3QudnVlXCIpXG5pZiAoX192dWVfc2NyaXB0X18gJiZcbiAgICBfX3Z1ZV9zY3JpcHRfXy5fX2VzTW9kdWxlICYmXG4gICAgT2JqZWN0LmtleXMoX192dWVfc2NyaXB0X18pLmxlbmd0aCA+IDEpIHtcbiAgY29uc29sZS53YXJuKFwiW3Z1ZS1sb2FkZXJdIGFwcFxcXFx0ZXN0LnZ1ZTogbmFtZWQgZXhwb3J0cyBpbiAqLnZ1ZSBmaWxlcyBhcmUgaWdub3JlZC5cIil9XG5fX3Z1ZV90ZW1wbGF0ZV9fID0gcmVxdWlyZShcIiEhdnVlLWh0bWwtbG9hZGVyIS4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3NlbGVjdG9yLmpzP3R5cGU9dGVtcGxhdGUmaW5kZXg9MCEuL3Rlc3QudnVlXCIpXG5tb2R1bGUuZXhwb3J0cyA9IF9fdnVlX3NjcmlwdF9fIHx8IHt9XG5pZiAobW9kdWxlLmV4cG9ydHMuX19lc01vZHVsZSkgbW9kdWxlLmV4cG9ydHMgPSBtb2R1bGUuZXhwb3J0cy5kZWZhdWx0XG5pZiAoX192dWVfdGVtcGxhdGVfXykge1xuKHR5cGVvZiBtb2R1bGUuZXhwb3J0cyA9PT0gXCJmdW5jdGlvblwiID8gKG1vZHVsZS5leHBvcnRzLm9wdGlvbnMgfHwgKG1vZHVsZS5leHBvcnRzLm9wdGlvbnMgPSB7fSkpIDogbW9kdWxlLmV4cG9ydHMpLnRlbXBsYXRlID0gX192dWVfdGVtcGxhdGVfX1xufVxuaWYgKG1vZHVsZS5ob3QpIHsoZnVuY3Rpb24gKCkgeyAgbW9kdWxlLmhvdC5hY2NlcHQoKVxuICB2YXIgaG90QVBJID0gcmVxdWlyZShcInZ1ZS1ob3QtcmVsb2FkLWFwaVwiKVxuICBob3RBUEkuaW5zdGFsbChyZXF1aXJlKFwidnVlXCIpLCBmYWxzZSlcbiAgaWYgKCFob3RBUEkuY29tcGF0aWJsZSkgcmV0dXJuXG4gIHZhciBpZCA9IFwiX3YtZDk3YTY2MmEvdGVzdC52dWVcIlxuICBpZiAoIW1vZHVsZS5ob3QuZGF0YSkge1xuICAgIGhvdEFQSS5jcmVhdGVSZWNvcmQoaWQsIG1vZHVsZS5leHBvcnRzKVxuICB9IGVsc2Uge1xuICAgIGhvdEFQSS51cGRhdGUoaWQsIG1vZHVsZS5leHBvcnRzLCBfX3Z1ZV90ZW1wbGF0ZV9fKVxuICB9XG59KSgpfVxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9hcHAvdGVzdC52dWVcbiAqKiBtb2R1bGUgaWQgPSAxN1xuICoqIG1vZHVsZSBjaHVua3MgPSA0XG4gKiovIiwiPHRlbXBsYXRlIGlkPVwia2lkXCI+XHJcbiAgICA8ZGl2PlxyXG4gICAgICAgIDx1bCB2LWZvcj1cIml0ZW0gb2YgYXJyXCI+XHJcbiAgICAgICAgICAgIDxsaT57e2l0ZW19fTwvbGk+XHJcbiAgICAgICAgPC91bD5cclxuICAgIDwvZGl2PlxyXG48L3RlbXBsYXRlPlxyXG48c2NyaXB0PlxyXG4gICAgbW9kdWxlLmV4cG9ydHMgPSB7XHJcbiAgICAgICAgZGF0YTogZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgICAgIGFycjogWzEyMywyMzQsMzQ1XVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuICAgICAgICB0ZW1wbGF0ZTogJyNraWQnXHJcbiAgICB9XHJcbjwvc2NyaXB0PlxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIHRlc3QudnVlPzRiMzI3MDk0XG4gKiovIiwibW9kdWxlLmV4cG9ydHMgPSBcIlxcbjxkaXY+XFxuICAgIDx1bCB2LWZvcj1cXFwiaXRlbSBvZiBhcnJcXFwiPlxcbiAgICAgICAgPGxpPnt7aXRlbX19PC9saT5cXG4gICAgPC91bD5cXG48L2Rpdj5cXG5cIjtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi92dWUtaHRtbC1sb2FkZXIhLi9+L3Z1ZS1sb2FkZXIvbGliL3NlbGVjdG9yLmpzP3R5cGU9dGVtcGxhdGUmaW5kZXg9MCEuL2FwcC90ZXN0LnZ1ZVxuICoqIG1vZHVsZSBpZCA9IDE5XG4gKiogbW9kdWxlIGNodW5rcyA9IDRcbiAqKi8iXSwic291cmNlUm9vdCI6IiJ9