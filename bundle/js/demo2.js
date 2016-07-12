webpackJsonp([1,5],[
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(3);


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
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(Vue) {/**
	 * Created by humorHan on 2016/7/4.
	 */
	var vm = new Vue({
	    el: '#demo2',
	    data: function(){
	        return {msg: 'hello vue!'}
	    },
	    template: '#tpl'
	});
	
	var example2 = new Vue({
	    el: '#example-2',
	    data: {
	        parentMessage: 'Parent',
	        items: [
	            { message: 'Foo' },
	            { message: 'Bar' }
	        ]
	    }
	});
	
	var num = new Vue({
	    el: '.num',
	    methods:{
	        say: function (msg, event) {
	            // �������ǿ��Է���ԭ���¼�����
	            event.preventDefault();
	        },
	        doThis: function(){},
	        doThat: function(){},
	        submit: function(){}
	    }
	});
	
	var dom1 = new Vue({
	    el: '.dom1',
	    data: {
	        msg:'123',
	        age: '123'
	    }
	});
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

/***/ }
]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9kZXAvVnVlLmpzPzk3ZGYiLCJ3ZWJwYWNrOi8vLy4vanMvZGVtbzIuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBQyxvQkFBb0I7O0FBRXJCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsY0FBYSxPQUFPO0FBQ3BCLGNBQWEsT0FBTztBQUNwQjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYSxPQUFPO0FBQ3BCLGNBQWEsT0FBTztBQUNwQixlQUFjO0FBQ2Q7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGNBQWEsT0FBTztBQUNwQixlQUFjO0FBQ2Q7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGNBQWEsT0FBTztBQUNwQixlQUFjO0FBQ2Q7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFhLEVBQUU7QUFDZixlQUFjO0FBQ2Q7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYSxFQUFFO0FBQ2YsZUFBYztBQUNkOztBQUVBO0FBQ0E7QUFDQTtBQUNBLE1BQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxjQUFhLEVBQUU7QUFD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Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxJQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWEsT0FBTztBQUNwQjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0NBQXFDLE9BQU87QUFDNUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWEsT0FBTztBQUNwQjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDZCQUE0QjtBQUM1QjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWEsYUFBYTtBQUMxQixlQUFjO0FBQ2Q7O0FBRUE7QUFDQTtBQUNB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QUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsY0FBYSxFQUFFO0FBQ2Y7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBUztBQUNUO0FBQ0E7QUFDQSxRQUFPO0FBQ1A7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGNBQWEsSUFBSTtBQUNqQjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYSxRQUFRO0FBQ3JCOztBQUVBO0FBQ0E7QUFDQTtBQUNBLE1BQUs7QUFDTDtBQUNBLE1BQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdUJBQXNCO0FBQ3RCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFXO0FBQ1g7QUFDQTtBQUNBLGNBQWE7QUFDYjtBQUNBO0FBQ0EsVUFBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFD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Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBLFFBQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBUztBQUNUOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFTO0FBQ1Q7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFTO0FBQ1Q7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBUztBQUNUOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBSzs7QUFFTDtBQUNBO0FBQ0EsTUFBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsTUFBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGNBQWEsY0FBYztBQUMzQixjQUFhLFFBQVE7QUFDckIsY0FBYSxRQUFRO0FBQ3JCLGVBQWM7QUFDZDs7QUFFQTtBQUNBO0FBQ0E7QUFDQSwyQ0FBMEMsT0FBTztBQUNqRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYSxNQUFNO0FBQ25CLGNBQWEsRUFBRTtBQUNmOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFXO0FBQ1g7QUFDQTtBQUNBLFVBQVM7QUFDVDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBTztBQUNQO0FBQ0E7QUFDQSxVQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQU87QUFDUDtBQUNBLFFBQU87QUFDUDtBQUNBLFFBQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQUs7O0FBRUw7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQU87QUFDUDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsUUFBTztBQUNQO0FBQ0E7QUFDQSxNQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxpQ0FBZ0M7QUFDaEM7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsUUFBTztBQUNQLGtEQUFpRDtBQUNqRCxRQUFPO0FBQ1Asc0NBQXFDO0FBQ3JDO0FBQ0EsTUFBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQSxpREFBZ0Q7QUFDaEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQUs7O0FBRUw7QUFDQTtBQUNBLHlCQUF3QjtBQUN4QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBUztBQUNUO0FBQ0E7QUFDQSxRQUFPO0FBQ1A7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWEsT0FBTztBQUNwQixlQUFjO0FBQ2Q7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWEsT0FBTztBQUNwQixlQUFjO0FBQ2Q7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBTztBQUNQLHNDQUFxQztBQUNyQztBQUNBLE1BQUs7O0FBRUw7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFTO0FBQ1Q7QUFDQSxVQUFTO0FBQ1Q7QUFDQTtBQUNBLFFBQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFPO0FBQ1A7QUFDQTtBQUNBLE1BQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBTztBQUNQO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxRQUFPO0FBQ1A7QUFDQSxRQUFPO0FBQ1A7QUFDQTtBQUNBLE1BQUs7O0FBRUw7QUFDQTtBQUNBLHdDQUF1QyxPQUFPO0FBQzlDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYSw0QkFBNEI7QUFDekMsZUFBYztBQUNkOztBQUVBO0FBQ0E7QUFDQTtBQUNBLHdDQUF1QyxPQUFPO0FBQzlDO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBVztBQUNYO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsY0FBYSxRQUFRO0FBQ3JCLGNBQWEsT0FBTztBQUNwQjtBQUNBO0FBQ0E7QUFDQSxjQUFhLFNBQVM7QUFDdEI7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQ0FBb0MsT0FBTztBQUMzQztBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBTztBQUNQO0FBQ0E7QUFDQSxNQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnQkFBZSxPQUFPO0FBQ3RCLGdCQUFlLFNBQVM7QUFDeEI7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0EsVUFBUztBQUNUO0FBQ0EsTUFBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdCQUFlLGdCQUFnQjtBQUMvQixnQkFBZSxTQUFTO0FBQ3hCOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQU87QUFDUDtBQUNBLE1BQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0JBQWUsU0FBUztBQUN4Qjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFTO0FBQ1QsUUFBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQSxpQkFBZ0I7QUFDaEI7QUFDQSxnQkFBZSxPQUFPO0FBQ3RCLGlCQUFnQixJQUFJO0FBQ3BCOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQSxpQkFBZ0I7QUFDaEI7O0FBRUE7QUFDQTtBQUNBLE1BQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnQkFBZSxRQUFRO0FBQ3ZCOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0JBQWUsU0FBUztBQUN4Qjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBUztBQUNULFFBQU87QUFDUDtBQUNBO0FBQ0EsTUFBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdCQUFlLElBQUk7QUFDbkIsZ0JBQWUsU0FBUztBQUN4Qjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBVztBQUNYO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBVztBQUNYO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFLOztBQUVMO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxjQUFhLE1BQU07QUFDbkIsY0FBYSxJQUFJO0FBQ2pCLGNBQWEsU0FBUztBQUN0Qjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWEseUJBQXlCO0FBQ3RDLGNBQWEsTUFBTTtBQUNuQixjQUFhLElBQUk7QUFDakIsZUFBYyxTQUFTO0FBQ3ZCOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBTztBQUNQO0FBQ0E7QUFDQSxRQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsY0FBYSxNQUFNO0FBQ25CLGVBQWMsU0FBUztBQUN2Qjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFTO0FBQ1Q7QUFDQTtBQUNBLFVBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBVztBQUNYO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdCQUFlLHFCQUFxQjtBQUNwQyxjQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWEsSUFBSTtBQUNqQixjQUFhLE9BQU87QUFDcEIsY0FBYSxFQUFFO0FBQ2YsY0FBYSxTQUFTO0FBQ3RCOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFPO0FBQ1AsTUFBSztBQUNMO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxjQUFhLElBQUk7QUFDakIsY0FBYSxPQUFPO0FBQ3BCLGNBQWEsRUFBRTtBQUNmOztBQUVBO0FBQ0E7QUFDQTtBQUNBLE1BQUs7QUFDTDs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxjQUFhLElBQUk7QUFDakIsY0FBYSxPQUFPO0FBQ3BCLGNBQWEsRUFBRTtBQUNmOztBQUVBO0FBQ0E7QUFDQTtBQUNBLE1BQUs7QUFDTDs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxjQUFhLElBQUk7QUFDakIsY0FBYSxPQUFPO0FBQ3BCLGVBQWM7QUFDZDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsY0FBYSxPQUFPO0FBQ3BCLGNBQWEsRUFBRTtBQUNmLGNBQWEsSUFBSTtBQUNqQjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzQkFBcUIsMkJBQTJCO0FBQ2hEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsY0FBYSxFQUFFO0FBQ2YsY0FBYSxPQUFPO0FBQ3BCLGVBQWM7QUFDZDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGNBQWEsRUFBRTtBQUNmLGNBQWEsU0FBUztBQUN0QixlQUFjO0FBQ2Q7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBSztBQUNMO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7QUFDQTtBQUNBLE1BQUs7QUFDTDtBQUNBO0FBQ0EsTUFBSztBQUNMO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7QUFDQTtBQUNBLE1BQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxjQUFhLE9BQU87QUFDcEIsZUFBYztBQUNkOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxjQUFhLEVBQUU7QUFDZixlQUFjO0FBQ2Q7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLFFBQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBTzs7QUFFUDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFXO0FBQ1gsVUFBUztBQUNUO0FBQ0EsTUFBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGNBQWEsU0FBUztBQUN0Qjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxvQkFBbUIsb0JBQW9CO0FBQ3ZDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFLO0FBQ0wsSUFBRztBQUNIO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFhLFFBQVE7QUFDckIsY0FBYSxPQUFPO0FBQ3BCLGNBQWEsT0FBTztBQUNwQixjQUFhLElBQUk7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBb0I7QUFDcEI7QUFDQSxNQUFLO0FBQ0w7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYSxTQUFTO0FBQ3RCLGNBQWEsU0FBUztBQUN0Qjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBTztBQUNQO0FBQ0EsUUFBTztBQUNQO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYSxTQUFTO0FBQ3RCLGNBQWEsU0FBUztBQUN0Qjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBTztBQUNQO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBSztBQUNMO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGNBQWEsT0FBTztBQUNwQjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFhLE9BQU87QUFDcEI7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYSxPQUFPO0FBQ3BCLGVBQWM7QUFDZDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxjQUFhLE9BQU87QUFDcEIsY0FBYSxTQUFTO0FBQ3RCOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWEsUUFBUTtBQUNyQixlQUFjO0FBQ2Q7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBSztBQUNMO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNB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QTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnQkFBZSxRQUFRO0FBQ3ZCOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsZ0JBQWUsT0FBTztBQUN0QixnQkFBZSxLQUFLO0FBQ3BCLGdCQUFlLElBQUk7QUFDbkIsZ0JBQWUsT0FBTztBQUN0QixnQkFBZSxTQUFTO0FBQ3hCOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdCQUFlLFFBQVE7QUFDdkIsZ0JBQWUsUUFBUTtBQUN2QjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBUztBQUNUOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtB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QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxnQkFBZSxPQUFPO0FBQ3RCOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0JBQWUsT0FBTztBQUN0QixnQkFBZSxFQUFFO0FBQ2pCOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFLOztBQUVMO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0EsSUFBRzs7QUFFSDs7QUFFQSxFQUFDLEc7Ozs7Ozs7QUM1eVREO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFnQjtBQUNoQixNQUFLO0FBQ0w7QUFDQSxFQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFhLGlCQUFpQjtBQUM5QixjQUFhO0FBQ2I7QUFDQTtBQUNBLEVBQUM7O0FBRUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBUztBQUNULDZCQUE0QjtBQUM1Qiw2QkFBNEI7QUFDNUI7QUFDQTtBQUNBLEVBQUM7O0FBRUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBQyxFIiwiZmlsZSI6ImRlbW8yLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyohXG4gKiBWdWUuanMgdjEuMC4yNFxuICogKGMpIDIwMTYgRXZhbiBZb3VcbiAqIFJlbGVhc2VkIHVuZGVyIHRoZSBNSVQgTGljZW5zZS5cbiAqL1xuKGZ1bmN0aW9uIChnbG9iYWwsIGZhY3RvcnkpIHtcbiAgdHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnICYmIHR5cGVvZiBtb2R1bGUgIT09ICd1bmRlZmluZWQnID8gbW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KCkgOlxuICB0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQgPyBkZWZpbmUoZmFjdG9yeSkgOlxuICAoZ2xvYmFsLlZ1ZSA9IGZhY3RvcnkoKSk7XG59KHRoaXMsIGZ1bmN0aW9uICgpIHsgJ3VzZSBzdHJpY3QnO1xuXG4gIGZ1bmN0aW9uIHNldChvYmosIGtleSwgdmFsKSB7XG4gICAgaWYgKGhhc093bihvYmosIGtleSkpIHtcbiAgICAgIG9ialtrZXldID0gdmFsO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpZiAob2JqLl9pc1Z1ZSkge1xuICAgICAgc2V0KG9iai5fZGF0YSwga2V5LCB2YWwpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB2YXIgb2IgPSBvYmouX19vYl9fO1xuICAgIGlmICghb2IpIHtcbiAgICAgIG9ialtrZXldID0gdmFsO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBvYi5jb252ZXJ0KGtleSwgdmFsKTtcbiAgICBvYi5kZXAubm90aWZ5KCk7XG4gICAgaWYgKG9iLnZtcykge1xuICAgICAgdmFyIGkgPSBvYi52bXMubGVuZ3RoO1xuICAgICAgd2hpbGUgKGktLSkge1xuICAgICAgICB2YXIgdm0gPSBvYi52bXNbaV07XG4gICAgICAgIHZtLl9wcm94eShrZXkpO1xuICAgICAgICB2bS5fZGlnZXN0KCk7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiB2YWw7XG4gIH1cblxuICAvKipcbiAgICogRGVsZXRlIGEgcHJvcGVydHkgYW5kIHRyaWdnZXIgY2hhbmdlIGlmIG5lY2Vzc2FyeS5cbiAgICpcbiAgICogQHBhcmFtIHtPYmplY3R9IG9ialxuICAgKiBAcGFyYW0ge1N0cmluZ30ga2V5XG4gICAqL1xuXG4gIGZ1bmN0aW9uIGRlbChvYmosIGtleSkge1xuICAgIGlmICghaGFzT3duKG9iaiwga2V5KSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBkZWxldGUgb2JqW2tleV07XG4gICAgdmFyIG9iID0gb2JqLl9fb2JfXztcbiAgICBpZiAoIW9iKSB7XG4gICAgICBpZiAob2JqLl9pc1Z1ZSkge1xuICAgICAgICBkZWxldGUgb2JqLl9kYXRhW2tleV07XG4gICAgICAgIG9iai5fZGlnZXN0KCk7XG4gICAgICB9XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIG9iLmRlcC5ub3RpZnkoKTtcbiAgICBpZiAob2Iudm1zKSB7XG4gICAgICB2YXIgaSA9IG9iLnZtcy5sZW5ndGg7XG4gICAgICB3aGlsZSAoaS0tKSB7XG4gICAgICAgIHZhciB2bSA9IG9iLnZtc1tpXTtcbiAgICAgICAgdm0uX3VucHJveHkoa2V5KTtcbiAgICAgICAgdm0uX2RpZ2VzdCgpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHZhciBoYXNPd25Qcm9wZXJ0eSA9IE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHk7XG4gIC8qKlxuICAgKiBDaGVjayB3aGV0aGVyIHRoZSBvYmplY3QgaGFzIHRoZSBwcm9wZXJ0eS5cbiAgICpcbiAgICogQHBhcmFtIHtPYmplY3R9IG9ialxuICAgKiBAcGFyYW0ge1N0cmluZ30ga2V5XG4gICAqIEByZXR1cm4ge0Jvb2xlYW59XG4gICAqL1xuXG4gIGZ1bmN0aW9uIGhhc093bihvYmosIGtleSkge1xuICAgIHJldHVybiBoYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwga2V5KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDaGVjayBpZiBhbiBleHByZXNzaW9uIGlzIGEgbGl0ZXJhbCB2YWx1ZS5cbiAgICpcbiAgICogQHBhcmFtIHtTdHJpbmd9IGV4cFxuICAgKiBAcmV0dXJuIHtCb29sZWFufVxuICAgKi9cblxuICB2YXIgbGl0ZXJhbFZhbHVlUkUgPSAvXlxccz8odHJ1ZXxmYWxzZXwtP1tcXGRcXC5dK3wnW14nXSonfFwiW15cIl0qXCIpXFxzPyQvO1xuXG4gIGZ1bmN0aW9uIGlzTGl0ZXJhbChleHApIHtcbiAgICByZXR1cm4gbGl0ZXJhbFZhbHVlUkUudGVzdChleHApO1xuICB9XG5cbiAgLyoqXG4gICAqIENoZWNrIGlmIGEgc3RyaW5nIHN0YXJ0cyB3aXRoICQgb3IgX1xuICAgKlxuICAgKiBAcGFyYW0ge1N0cmluZ30gc3RyXG4gICAqIEByZXR1cm4ge0Jvb2xlYW59XG4gICAqL1xuXG4gIGZ1bmN0aW9uIGlzUmVzZXJ2ZWQoc3RyKSB7XG4gICAgdmFyIGMgPSAoc3RyICsgJycpLmNoYXJDb2RlQXQoMCk7XG4gICAgcmV0dXJuIGMgPT09IDB4MjQgfHwgYyA9PT0gMHg1RjtcbiAgfVxuXG4gIC8qKlxuICAgKiBHdWFyZCB0ZXh0IG91dHB1dCwgbWFrZSBzdXJlIHVuZGVmaW5lZCBvdXRwdXRzXG4gICAqIGVtcHR5IHN0cmluZ1xuICAgKlxuICAgKiBAcGFyYW0geyp9IHZhbHVlXG4gICAqIEByZXR1cm4ge1N0cmluZ31cbiAgICovXG5cbiAgZnVuY3Rpb24gX3RvU3RyaW5nKHZhbHVlKSB7XG4gICAgcmV0dXJuIHZhbHVlID09IG51bGwgPyAnJyA6IHZhbHVlLnRvU3RyaW5nKCk7XG4gIH1cblxuICAvKipcbiAgICogQ2hlY2sgYW5kIGNvbnZlcnQgcG9zc2libGUgbnVtZXJpYyBzdHJpbmdzIHRvIG51bWJlcnNcbiAgICogYmVmb3JlIHNldHRpbmcgYmFjayB0byBkYXRhXG4gICAqXG4gICAqIEBwYXJhbSB7Kn0gdmFsdWVcbiAgICogQHJldHVybiB7KnxOdW1iZXJ9XG4gICAqL1xuXG4gIGZ1bmN0aW9uIHRvTnVtYmVyKHZhbHVlKSB7XG4gICAgaWYgKHR5cGVvZiB2YWx1ZSAhPT0gJ3N0cmluZycpIHtcbiAgICAgIHJldHVybiB2YWx1ZTtcbiAgICB9IGVsc2Uge1xuICAgICAgdmFyIHBhcnNlZCA9IE51bWJlcih2YWx1ZSk7XG4gICAgICByZXR1cm4gaXNOYU4ocGFyc2VkKSA/IHZhbHVlIDogcGFyc2VkO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBDb252ZXJ0IHN0cmluZyBib29sZWFuIGxpdGVyYWxzIGludG8gcmVhbCBib29sZWFucy5cbiAgICpcbiAgICogQHBhcmFtIHsqfSB2YWx1ZVxuICAgKiBAcmV0dXJuIHsqfEJvb2xlYW59XG4gICAqL1xuXG4gIGZ1bmN0aW9uIHRvQm9vbGVhbih2YWx1ZSkge1xuICAgIHJldHVybiB2YWx1ZSA9PT0gJ3RydWUnID8gdHJ1ZSA6IHZhbHVlID09PSAnZmFsc2UnID8gZmFsc2UgOiB2YWx1ZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTdHJpcCBxdW90ZXMgZnJvbSBhIHN0cmluZ1xuICAgKlxuICAgKiBAcGFyYW0ge1N0cmluZ30gc3RyXG4gICAqIEByZXR1cm4ge1N0cmluZyB8IGZhbHNlfVxuICAgKi9cblxuICBmdW5jdGlvbiBzdHJpcFF1b3RlcyhzdHIpIHtcbiAgICB2YXIgYSA9IHN0ci5jaGFyQ29kZUF0KDApO1xuICAgIHZhciBiID0gc3RyLmNoYXJDb2RlQXQoc3RyLmxlbmd0aCAtIDEpO1xuICAgIHJldHVybiBhID09PSBiICYmIChhID09PSAweDIyIHx8IGEgPT09IDB4MjcpID8gc3RyLnNsaWNlKDEsIC0xKSA6IHN0cjtcbiAgfVxuXG4gIC8qKlxuICAgKiBDYW1lbGl6ZSBhIGh5cGhlbi1kZWxtaXRlZCBzdHJpbmcuXG4gICAqXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBzdHJcbiAgICogQHJldHVybiB7U3RyaW5nfVxuICAgKi9cblxuICB2YXIgY2FtZWxpemVSRSA9IC8tKFxcdykvZztcblxuICBmdW5jdGlvbiBjYW1lbGl6ZShzdHIpIHtcbiAgICByZXR1cm4gc3RyLnJlcGxhY2UoY2FtZWxpemVSRSwgdG9VcHBlcik7XG4gIH1cblxuICBmdW5jdGlvbiB0b1VwcGVyKF8sIGMpIHtcbiAgICByZXR1cm4gYyA/IGMudG9VcHBlckNhc2UoKSA6ICcnO1xuICB9XG5cbiAgLyoqXG4gICAqIEh5cGhlbmF0ZSBhIGNhbWVsQ2FzZSBzdHJpbmcuXG4gICAqXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBzdHJcbiAgICogQHJldHVybiB7U3RyaW5nfVxuICAgKi9cblxuICB2YXIgaHlwaGVuYXRlUkUgPSAvKFthLXpcXGRdKShbQS1aXSkvZztcblxuICBmdW5jdGlvbiBoeXBoZW5hdGUoc3RyKSB7XG4gICAgcmV0dXJuIHN0ci5yZXBsYWNlKGh5cGhlbmF0ZVJFLCAnJDEtJDInKS50b0xvd2VyQ2FzZSgpO1xuICB9XG5cbiAgLyoqXG4gICAqIENvbnZlcnRzIGh5cGhlbi91bmRlcnNjb3JlL3NsYXNoIGRlbGltaXRlcmVkIG5hbWVzIGludG9cbiAgICogY2FtZWxpemVkIGNsYXNzTmFtZXMuXG4gICAqXG4gICAqIGUuZy4gbXktY29tcG9uZW50ID0+IE15Q29tcG9uZW50XG4gICAqICAgICAgc29tZV9lbHNlICAgID0+IFNvbWVFbHNlXG4gICAqICAgICAgc29tZS9jb21wICAgID0+IFNvbWVDb21wXG4gICAqXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBzdHJcbiAgICogQHJldHVybiB7U3RyaW5nfVxuICAgKi9cblxuICB2YXIgY2xhc3NpZnlSRSA9IC8oPzpefFstX1xcL10pKFxcdykvZztcblxuICBmdW5jdGlvbiBjbGFzc2lmeShzdHIpIHtcbiAgICByZXR1cm4gc3RyLnJlcGxhY2UoY2xhc3NpZnlSRSwgdG9VcHBlcik7XG4gIH1cblxuICAvKipcbiAgICogU2ltcGxlIGJpbmQsIGZhc3RlciB0aGFuIG5hdGl2ZVxuICAgKlxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBmblxuICAgKiBAcGFyYW0ge09iamVjdH0gY3R4XG4gICAqIEByZXR1cm4ge0Z1bmN0aW9ufVxuICAgKi9cblxuICBmdW5jdGlvbiBiaW5kKGZuLCBjdHgpIHtcbiAgICByZXR1cm4gZnVuY3Rpb24gKGEpIHtcbiAgICAgIHZhciBsID0gYXJndW1lbnRzLmxlbmd0aDtcbiAgICAgIHJldHVybiBsID8gbCA+IDEgPyBmbi5hcHBseShjdHgsIGFyZ3VtZW50cykgOiBmbi5jYWxsKGN0eCwgYSkgOiBmbi5jYWxsKGN0eCk7XG4gICAgfTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDb252ZXJ0IGFuIEFycmF5LWxpa2Ugb2JqZWN0IHRvIGEgcmVhbCBBcnJheS5cbiAgICpcbiAgICogQHBhcmFtIHtBcnJheS1saWtlfSBsaXN0XG4gICAqIEBwYXJhbSB7TnVtYmVyfSBbc3RhcnRdIC0gc3RhcnQgaW5kZXhcbiAgICogQHJldHVybiB7QXJyYXl9XG4gICAqL1xuXG4gIGZ1bmN0aW9uIHRvQXJyYXkobGlzdCwgc3RhcnQpIHtcbiAgICBzdGFydCA9IHN0YXJ0IHx8IDA7XG4gICAgdmFyIGkgPSBsaXN0Lmxlbmd0aCAtIHN0YXJ0O1xuICAgIHZhciByZXQgPSBuZXcgQXJyYXkoaSk7XG4gICAgd2hpbGUgKGktLSkge1xuICAgICAgcmV0W2ldID0gbGlzdFtpICsgc3RhcnRdO1xuICAgIH1cbiAgICByZXR1cm4gcmV0O1xuICB9XG5cbiAgLyoqXG4gICAqIE1peCBwcm9wZXJ0aWVzIGludG8gdGFyZ2V0IG9iamVjdC5cbiAgICpcbiAgICogQHBhcmFtIHtPYmplY3R9IHRvXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBmcm9tXG4gICAqL1xuXG4gIGZ1bmN0aW9uIGV4dGVuZCh0bywgZnJvbSkge1xuICAgIHZhciBrZXlzID0gT2JqZWN0LmtleXMoZnJvbSk7XG4gICAgdmFyIGkgPSBrZXlzLmxlbmd0aDtcbiAgICB3aGlsZSAoaS0tKSB7XG4gICAgICB0b1trZXlzW2ldXSA9IGZyb21ba2V5c1tpXV07XG4gICAgfVxuICAgIHJldHVybiB0bztcbiAgfVxuXG4gIC8qKlxuICAgKiBRdWljayBvYmplY3QgY2hlY2sgLSB0aGlzIGlzIHByaW1hcmlseSB1c2VkIHRvIHRlbGxcbiAgICogT2JqZWN0cyBmcm9tIHByaW1pdGl2ZSB2YWx1ZXMgd2hlbiB3ZSBrbm93IHRoZSB2YWx1ZVxuICAgKiBpcyBhIEpTT04tY29tcGxpYW50IHR5cGUuXG4gICAqXG4gICAqIEBwYXJhbSB7Kn0gb2JqXG4gICAqIEByZXR1cm4ge0Jvb2xlYW59XG4gICAqL1xuXG4gIGZ1bmN0aW9uIGlzT2JqZWN0KG9iaikge1xuICAgIHJldHVybiBvYmogIT09IG51bGwgJiYgdHlwZW9mIG9iaiA9PT0gJ29iamVjdCc7XG4gIH1cblxuICAvKipcbiAgICogU3RyaWN0IG9iamVjdCB0eXBlIGNoZWNrLiBPbmx5IHJldHVybnMgdHJ1ZVxuICAgKiBmb3IgcGxhaW4gSmF2YVNjcmlwdCBvYmplY3RzLlxuICAgKlxuICAgKiBAcGFyYW0geyp9IG9ialxuICAgKiBAcmV0dXJuIHtCb29sZWFufVxuICAgKi9cblxuICB2YXIgdG9TdHJpbmcgPSBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nO1xuICB2YXIgT0JKRUNUX1NUUklORyA9ICdbb2JqZWN0IE9iamVjdF0nO1xuXG4gIGZ1bmN0aW9uIGlzUGxhaW5PYmplY3Qob2JqKSB7XG4gICAgcmV0dXJuIHRvU3RyaW5nLmNhbGwob2JqKSA9PT0gT0JKRUNUX1NUUklORztcbiAgfVxuXG4gIC8qKlxuICAgKiBBcnJheSB0eXBlIGNoZWNrLlxuICAgKlxuICAgKiBAcGFyYW0geyp9IG9ialxuICAgKiBAcmV0dXJuIHtCb29sZWFufVxuICAgKi9cblxuICB2YXIgaXNBcnJheSA9IEFycmF5LmlzQXJyYXk7XG5cbiAgLyoqXG4gICAqIERlZmluZSBhIHByb3BlcnR5LlxuICAgKlxuICAgKiBAcGFyYW0ge09iamVjdH0gb2JqXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBrZXlcbiAgICogQHBhcmFtIHsqfSB2YWxcbiAgICogQHBhcmFtIHtCb29sZWFufSBbZW51bWVyYWJsZV1cbiAgICovXG5cbiAgZnVuY3Rpb24gZGVmKG9iaiwga2V5LCB2YWwsIGVudW1lcmFibGUpIHtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkob2JqLCBrZXksIHtcbiAgICAgIHZhbHVlOiB2YWwsXG4gICAgICBlbnVtZXJhYmxlOiAhIWVudW1lcmFibGUsXG4gICAgICB3cml0YWJsZTogdHJ1ZSxcbiAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIERlYm91bmNlIGEgZnVuY3Rpb24gc28gaXQgb25seSBnZXRzIGNhbGxlZCBhZnRlciB0aGVcbiAgICogaW5wdXQgc3RvcHMgYXJyaXZpbmcgYWZ0ZXIgdGhlIGdpdmVuIHdhaXQgcGVyaW9kLlxuICAgKlxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBmdW5jXG4gICAqIEBwYXJhbSB7TnVtYmVyfSB3YWl0XG4gICAqIEByZXR1cm4ge0Z1bmN0aW9ufSAtIHRoZSBkZWJvdW5jZWQgZnVuY3Rpb25cbiAgICovXG5cbiAgZnVuY3Rpb24gX2RlYm91bmNlKGZ1bmMsIHdhaXQpIHtcbiAgICB2YXIgdGltZW91dCwgYXJncywgY29udGV4dCwgdGltZXN0YW1wLCByZXN1bHQ7XG4gICAgdmFyIGxhdGVyID0gZnVuY3Rpb24gbGF0ZXIoKSB7XG4gICAgICB2YXIgbGFzdCA9IERhdGUubm93KCkgLSB0aW1lc3RhbXA7XG4gICAgICBpZiAobGFzdCA8IHdhaXQgJiYgbGFzdCA+PSAwKSB7XG4gICAgICAgIHRpbWVvdXQgPSBzZXRUaW1lb3V0KGxhdGVyLCB3YWl0IC0gbGFzdCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aW1lb3V0ID0gbnVsbDtcbiAgICAgICAgcmVzdWx0ID0gZnVuYy5hcHBseShjb250ZXh0LCBhcmdzKTtcbiAgICAgICAgaWYgKCF0aW1lb3V0KSBjb250ZXh0ID0gYXJncyA9IG51bGw7XG4gICAgICB9XG4gICAgfTtcbiAgICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgICAgY29udGV4dCA9IHRoaXM7XG4gICAgICBhcmdzID0gYXJndW1lbnRzO1xuICAgICAgdGltZXN0YW1wID0gRGF0ZS5ub3coKTtcbiAgICAgIGlmICghdGltZW91dCkge1xuICAgICAgICB0aW1lb3V0ID0gc2V0VGltZW91dChsYXRlciwgd2FpdCk7XG4gICAgICB9XG4gICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH07XG4gIH1cblxuICAvKipcbiAgICogTWFudWFsIGluZGV4T2YgYmVjYXVzZSBpdCdzIHNsaWdodGx5IGZhc3RlciB0aGFuXG4gICAqIG5hdGl2ZS5cbiAgICpcbiAgICogQHBhcmFtIHtBcnJheX0gYXJyXG4gICAqIEBwYXJhbSB7Kn0gb2JqXG4gICAqL1xuXG4gIGZ1bmN0aW9uIGluZGV4T2YoYXJyLCBvYmopIHtcbiAgICB2YXIgaSA9IGFyci5sZW5ndGg7XG4gICAgd2hpbGUgKGktLSkge1xuICAgICAgaWYgKGFycltpXSA9PT0gb2JqKSByZXR1cm4gaTtcbiAgICB9XG4gICAgcmV0dXJuIC0xO1xuICB9XG5cbiAgLyoqXG4gICAqIE1ha2UgYSBjYW5jZWxsYWJsZSB2ZXJzaW9uIG9mIGFuIGFzeW5jIGNhbGxiYWNrLlxuICAgKlxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBmblxuICAgKiBAcmV0dXJuIHtGdW5jdGlvbn1cbiAgICovXG5cbiAgZnVuY3Rpb24gY2FuY2VsbGFibGUoZm4pIHtcbiAgICB2YXIgY2IgPSBmdW5jdGlvbiBjYigpIHtcbiAgICAgIGlmICghY2IuY2FuY2VsbGVkKSB7XG4gICAgICAgIHJldHVybiBmbi5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgICAgfVxuICAgIH07XG4gICAgY2IuY2FuY2VsID0gZnVuY3Rpb24gKCkge1xuICAgICAgY2IuY2FuY2VsbGVkID0gdHJ1ZTtcbiAgICB9O1xuICAgIHJldHVybiBjYjtcbiAgfVxuXG4gIC8qKlxuICAgKiBDaGVjayBpZiB0d28gdmFsdWVzIGFyZSBsb29zZWx5IGVxdWFsIC0gdGhhdCBpcyxcbiAgICogaWYgdGhleSBhcmUgcGxhaW4gb2JqZWN0cywgZG8gdGhleSBoYXZlIHRoZSBzYW1lIHNoYXBlP1xuICAgKlxuICAgKiBAcGFyYW0geyp9IGFcbiAgICogQHBhcmFtIHsqfSBiXG4gICAqIEByZXR1cm4ge0Jvb2xlYW59XG4gICAqL1xuXG4gIGZ1bmN0aW9uIGxvb3NlRXF1YWwoYSwgYikge1xuICAgIC8qIGVzbGludC1kaXNhYmxlIGVxZXFlcSAqL1xuICAgIHJldHVybiBhID09IGIgfHwgKGlzT2JqZWN0KGEpICYmIGlzT2JqZWN0KGIpID8gSlNPTi5zdHJpbmdpZnkoYSkgPT09IEpTT04uc3RyaW5naWZ5KGIpIDogZmFsc2UpO1xuICAgIC8qIGVzbGludC1lbmFibGUgZXFlcWVxICovXG4gIH1cblxuICB2YXIgaGFzUHJvdG8gPSAoJ19fcHJvdG9fXycgaW4ge30pO1xuXG4gIC8vIEJyb3dzZXIgZW52aXJvbm1lbnQgc25pZmZpbmdcbiAgdmFyIGluQnJvd3NlciA9IHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnICYmIE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbCh3aW5kb3cpICE9PSAnW29iamVjdCBPYmplY3RdJztcblxuICAvLyBkZXRlY3QgZGV2dG9vbHNcbiAgdmFyIGRldnRvb2xzID0gaW5Ccm93c2VyICYmIHdpbmRvdy5fX1ZVRV9ERVZUT09MU19HTE9CQUxfSE9PS19fO1xuXG4gIC8vIFVBIHNuaWZmaW5nIGZvciB3b3JraW5nIGFyb3VuZCBicm93c2VyLXNwZWNpZmljIHF1aXJrc1xuICB2YXIgVUEgPSBpbkJyb3dzZXIgJiYgd2luZG93Lm5hdmlnYXRvci51c2VyQWdlbnQudG9Mb3dlckNhc2UoKTtcbiAgdmFyIGlzSUU5ID0gVUEgJiYgVUEuaW5kZXhPZignbXNpZSA5LjAnKSA+IDA7XG4gIHZhciBpc0FuZHJvaWQgPSBVQSAmJiBVQS5pbmRleE9mKCdhbmRyb2lkJykgPiAwO1xuICB2YXIgaXNJb3MgPSBVQSAmJiAvKGlwaG9uZXxpcGFkfGlwb2R8aW9zKS9pLnRlc3QoVUEpO1xuICB2YXIgaXNXZWNoYXQgPSBVQSAmJiBVQS5pbmRleE9mKCdtaWNyb21lc3NlbmdlcicpID4gMDtcblxuICB2YXIgdHJhbnNpdGlvblByb3AgPSB1bmRlZmluZWQ7XG4gIHZhciB0cmFuc2l0aW9uRW5kRXZlbnQgPSB1bmRlZmluZWQ7XG4gIHZhciBhbmltYXRpb25Qcm9wID0gdW5kZWZpbmVkO1xuICB2YXIgYW5pbWF0aW9uRW5kRXZlbnQgPSB1bmRlZmluZWQ7XG5cbiAgLy8gVHJhbnNpdGlvbiBwcm9wZXJ0eS9ldmVudCBzbmlmZmluZ1xuICBpZiAoaW5Ccm93c2VyICYmICFpc0lFOSkge1xuICAgIHZhciBpc1dlYmtpdFRyYW5zID0gd2luZG93Lm9udHJhbnNpdGlvbmVuZCA9PT0gdW5kZWZpbmVkICYmIHdpbmRvdy5vbndlYmtpdHRyYW5zaXRpb25lbmQgIT09IHVuZGVmaW5lZDtcbiAgICB2YXIgaXNXZWJraXRBbmltID0gd2luZG93Lm9uYW5pbWF0aW9uZW5kID09PSB1bmRlZmluZWQgJiYgd2luZG93Lm9ud2Via2l0YW5pbWF0aW9uZW5kICE9PSB1bmRlZmluZWQ7XG4gICAgdHJhbnNpdGlvblByb3AgPSBpc1dlYmtpdFRyYW5zID8gJ1dlYmtpdFRyYW5zaXRpb24nIDogJ3RyYW5zaXRpb24nO1xuICAgIHRyYW5zaXRpb25FbmRFdmVudCA9IGlzV2Via2l0VHJhbnMgPyAnd2Via2l0VHJhbnNpdGlvbkVuZCcgOiAndHJhbnNpdGlvbmVuZCc7XG4gICAgYW5pbWF0aW9uUHJvcCA9IGlzV2Via2l0QW5pbSA/ICdXZWJraXRBbmltYXRpb24nIDogJ2FuaW1hdGlvbic7XG4gICAgYW5pbWF0aW9uRW5kRXZlbnQgPSBpc1dlYmtpdEFuaW0gPyAnd2Via2l0QW5pbWF0aW9uRW5kJyA6ICdhbmltYXRpb25lbmQnO1xuICB9XG5cbiAgLyoqXG4gICAqIERlZmVyIGEgdGFzayB0byBleGVjdXRlIGl0IGFzeW5jaHJvbm91c2x5LiBJZGVhbGx5IHRoaXNcbiAgICogc2hvdWxkIGJlIGV4ZWN1dGVkIGFzIGEgbWljcm90YXNrLCBzbyB3ZSBsZXZlcmFnZVxuICAgKiBNdXRhdGlvbk9ic2VydmVyIGlmIGl0J3MgYXZhaWxhYmxlLCBhbmQgZmFsbGJhY2sgdG9cbiAgICogc2V0VGltZW91dCgwKS5cbiAgICpcbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gY2JcbiAgICogQHBhcmFtIHtPYmplY3R9IGN0eFxuICAgKi9cblxuICB2YXIgbmV4dFRpY2sgPSAoZnVuY3Rpb24gKCkge1xuICAgIHZhciBjYWxsYmFja3MgPSBbXTtcbiAgICB2YXIgcGVuZGluZyA9IGZhbHNlO1xuICAgIHZhciB0aW1lckZ1bmM7XG4gICAgZnVuY3Rpb24gbmV4dFRpY2tIYW5kbGVyKCkge1xuICAgICAgcGVuZGluZyA9IGZhbHNlO1xuICAgICAgdmFyIGNvcGllcyA9IGNhbGxiYWNrcy5zbGljZSgwKTtcbiAgICAgIGNhbGxiYWNrcyA9IFtdO1xuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBjb3BpZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgY29waWVzW2ldKCk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLyogaXN0YW5idWwgaWdub3JlIGlmICovXG4gICAgaWYgKHR5cGVvZiBNdXRhdGlvbk9ic2VydmVyICE9PSAndW5kZWZpbmVkJyAmJiAhKGlzV2VjaGF0ICYmIGlzSW9zKSkge1xuICAgICAgdmFyIGNvdW50ZXIgPSAxO1xuICAgICAgdmFyIG9ic2VydmVyID0gbmV3IE11dGF0aW9uT2JzZXJ2ZXIobmV4dFRpY2tIYW5kbGVyKTtcbiAgICAgIHZhciB0ZXh0Tm9kZSA9IGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKGNvdW50ZXIpO1xuICAgICAgb2JzZXJ2ZXIub2JzZXJ2ZSh0ZXh0Tm9kZSwge1xuICAgICAgICBjaGFyYWN0ZXJEYXRhOiB0cnVlXG4gICAgICB9KTtcbiAgICAgIHRpbWVyRnVuYyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgY291bnRlciA9IChjb3VudGVyICsgMSkgJSAyO1xuICAgICAgICB0ZXh0Tm9kZS5kYXRhID0gY291bnRlcjtcbiAgICAgIH07XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIHdlYnBhY2sgYXR0ZW1wdHMgdG8gaW5qZWN0IGEgc2hpbSBmb3Igc2V0SW1tZWRpYXRlXG4gICAgICAvLyBpZiBpdCBpcyB1c2VkIGFzIGEgZ2xvYmFsLCBzbyB3ZSBoYXZlIHRvIHdvcmsgYXJvdW5kIHRoYXQgdG9cbiAgICAgIC8vIGF2b2lkIGJ1bmRsaW5nIHVubmVjZXNzYXJ5IGNvZGUuXG4gICAgICB2YXIgY29udGV4dCA9IGluQnJvd3NlciA/IHdpbmRvdyA6IHR5cGVvZiBnbG9iYWwgIT09ICd1bmRlZmluZWQnID8gZ2xvYmFsIDoge307XG4gICAgICB0aW1lckZ1bmMgPSBjb250ZXh0LnNldEltbWVkaWF0ZSB8fCBzZXRUaW1lb3V0O1xuICAgIH1cbiAgICByZXR1cm4gZnVuY3Rpb24gKGNiLCBjdHgpIHtcbiAgICAgIHZhciBmdW5jID0gY3R4ID8gZnVuY3Rpb24gKCkge1xuICAgICAgICBjYi5jYWxsKGN0eCk7XG4gICAgICB9IDogY2I7XG4gICAgICBjYWxsYmFja3MucHVzaChmdW5jKTtcbiAgICAgIGlmIChwZW5kaW5nKSByZXR1cm47XG4gICAgICBwZW5kaW5nID0gdHJ1ZTtcbiAgICAgIHRpbWVyRnVuYyhuZXh0VGlja0hhbmRsZXIsIDApO1xuICAgIH07XG4gIH0pKCk7XG5cbiAgdmFyIF9TZXQgPSB1bmRlZmluZWQ7XG4gIC8qIGlzdGFuYnVsIGlnbm9yZSBpZiAqL1xuICBpZiAodHlwZW9mIFNldCAhPT0gJ3VuZGVmaW5lZCcgJiYgU2V0LnRvU3RyaW5nKCkubWF0Y2goL25hdGl2ZSBjb2RlLykpIHtcbiAgICAvLyB1c2UgbmF0aXZlIFNldCB3aGVuIGF2YWlsYWJsZS5cbiAgICBfU2V0ID0gU2V0O1xuICB9IGVsc2Uge1xuICAgIC8vIGEgbm9uLXN0YW5kYXJkIFNldCBwb2x5ZmlsbCB0aGF0IG9ubHkgd29ya3Mgd2l0aCBwcmltaXRpdmUga2V5cy5cbiAgICBfU2V0ID0gZnVuY3Rpb24gKCkge1xuICAgICAgdGhpcy5zZXQgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuICAgIH07XG4gICAgX1NldC5wcm90b3R5cGUuaGFzID0gZnVuY3Rpb24gKGtleSkge1xuICAgICAgcmV0dXJuIHRoaXMuc2V0W2tleV0gIT09IHVuZGVmaW5lZDtcbiAgICB9O1xuICAgIF9TZXQucHJvdG90eXBlLmFkZCA9IGZ1bmN0aW9uIChrZXkpIHtcbiAgICAgIHRoaXMuc2V0W2tleV0gPSAxO1xuICAgIH07XG4gICAgX1NldC5wcm90b3R5cGUuY2xlYXIgPSBmdW5jdGlvbiAoKSB7XG4gICAgICB0aGlzLnNldCA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gICAgfTtcbiAgfVxuXG4gIGZ1bmN0aW9uIENhY2hlKGxpbWl0KSB7XG4gICAgdGhpcy5zaXplID0gMDtcbiAgICB0aGlzLmxpbWl0ID0gbGltaXQ7XG4gICAgdGhpcy5oZWFkID0gdGhpcy50YWlsID0gdW5kZWZpbmVkO1xuICAgIHRoaXMuX2tleW1hcCA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gIH1cblxuICB2YXIgcCA9IENhY2hlLnByb3RvdHlwZTtcblxuICAvKipcbiAgICogUHV0IDx2YWx1ZT4gaW50byB0aGUgY2FjaGUgYXNzb2NpYXRlZCB3aXRoIDxrZXk+LlxuICAgKiBSZXR1cm5zIHRoZSBlbnRyeSB3aGljaCB3YXMgcmVtb3ZlZCB0byBtYWtlIHJvb20gZm9yXG4gICAqIHRoZSBuZXcgZW50cnkuIE90aGVyd2lzZSB1bmRlZmluZWQgaXMgcmV0dXJuZWQuXG4gICAqIChpLmUuIGlmIHRoZXJlIHdhcyBlbm91Z2ggcm9vbSBhbHJlYWR5KS5cbiAgICpcbiAgICogQHBhcmFtIHtTdHJpbmd9IGtleVxuICAgKiBAcGFyYW0geyp9IHZhbHVlXG4gICAqIEByZXR1cm4ge0VudHJ5fHVuZGVmaW5lZH1cbiAgICovXG5cbiAgcC5wdXQgPSBmdW5jdGlvbiAoa2V5LCB2YWx1ZSkge1xuICAgIHZhciByZW1vdmVkO1xuICAgIGlmICh0aGlzLnNpemUgPT09IHRoaXMubGltaXQpIHtcbiAgICAgIHJlbW92ZWQgPSB0aGlzLnNoaWZ0KCk7XG4gICAgfVxuXG4gICAgdmFyIGVudHJ5ID0gdGhpcy5nZXQoa2V5LCB0cnVlKTtcbiAgICBpZiAoIWVudHJ5KSB7XG4gICAgICBlbnRyeSA9IHtcbiAgICAgICAga2V5OiBrZXlcbiAgICAgIH07XG4gICAgICB0aGlzLl9rZXltYXBba2V5XSA9IGVudHJ5O1xuICAgICAgaWYgKHRoaXMudGFpbCkge1xuICAgICAgICB0aGlzLnRhaWwubmV3ZXIgPSBlbnRyeTtcbiAgICAgICAgZW50cnkub2xkZXIgPSB0aGlzLnRhaWw7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLmhlYWQgPSBlbnRyeTtcbiAgICAgIH1cbiAgICAgIHRoaXMudGFpbCA9IGVudHJ5O1xuICAgICAgdGhpcy5zaXplKys7XG4gICAgfVxuICAgIGVudHJ5LnZhbHVlID0gdmFsdWU7XG5cbiAgICByZXR1cm4gcmVtb3ZlZDtcbiAgfTtcblxuICAvKipcbiAgICogUHVyZ2UgdGhlIGxlYXN0IHJlY2VudGx5IHVzZWQgKG9sZGVzdCkgZW50cnkgZnJvbSB0aGVcbiAgICogY2FjaGUuIFJldHVybnMgdGhlIHJlbW92ZWQgZW50cnkgb3IgdW5kZWZpbmVkIGlmIHRoZVxuICAgKiBjYWNoZSB3YXMgZW1wdHkuXG4gICAqL1xuXG4gIHAuc2hpZnQgPSBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIGVudHJ5ID0gdGhpcy5oZWFkO1xuICAgIGlmIChlbnRyeSkge1xuICAgICAgdGhpcy5oZWFkID0gdGhpcy5oZWFkLm5ld2VyO1xuICAgICAgdGhpcy5oZWFkLm9sZGVyID0gdW5kZWZpbmVkO1xuICAgICAgZW50cnkubmV3ZXIgPSBlbnRyeS5vbGRlciA9IHVuZGVmaW5lZDtcbiAgICAgIHRoaXMuX2tleW1hcFtlbnRyeS5rZXldID0gdW5kZWZpbmVkO1xuICAgICAgdGhpcy5zaXplLS07XG4gICAgfVxuICAgIHJldHVybiBlbnRyeTtcbiAgfTtcblxuICAvKipcbiAgICogR2V0IGFuZCByZWdpc3RlciByZWNlbnQgdXNlIG9mIDxrZXk+LiBSZXR1cm5zIHRoZSB2YWx1ZVxuICAgKiBhc3NvY2lhdGVkIHdpdGggPGtleT4gb3IgdW5kZWZpbmVkIGlmIG5vdCBpbiBjYWNoZS5cbiAgICpcbiAgICogQHBhcmFtIHtTdHJpbmd9IGtleVxuICAgKiBAcGFyYW0ge0Jvb2xlYW59IHJldHVybkVudHJ5XG4gICAqIEByZXR1cm4ge0VudHJ5fCp9XG4gICAqL1xuXG4gIHAuZ2V0ID0gZnVuY3Rpb24gKGtleSwgcmV0dXJuRW50cnkpIHtcbiAgICB2YXIgZW50cnkgPSB0aGlzLl9rZXltYXBba2V5XTtcbiAgICBpZiAoZW50cnkgPT09IHVuZGVmaW5lZCkgcmV0dXJuO1xuICAgIGlmIChlbnRyeSA9PT0gdGhpcy50YWlsKSB7XG4gICAgICByZXR1cm4gcmV0dXJuRW50cnkgPyBlbnRyeSA6IGVudHJ5LnZhbHVlO1xuICAgIH1cbiAgICAvLyBIRUFELS0tLS0tLS0tLS0tLS1UQUlMXG4gICAgLy8gICA8Lm9sZGVyICAgLm5ld2VyPlxuICAgIC8vICA8LS0tIGFkZCBkaXJlY3Rpb24gLS1cbiAgICAvLyAgIEEgIEIgIEMgIDxEPiAgRVxuICAgIGlmIChlbnRyeS5uZXdlcikge1xuICAgICAgaWYgKGVudHJ5ID09PSB0aGlzLmhlYWQpIHtcbiAgICAgICAgdGhpcy5oZWFkID0gZW50cnkubmV3ZXI7XG4gICAgICB9XG4gICAgICBlbnRyeS5uZXdlci5vbGRlciA9IGVudHJ5Lm9sZGVyOyAvLyBDIDwtLSBFLlxuICAgIH1cbiAgICBpZiAoZW50cnkub2xkZXIpIHtcbiAgICAgIGVudHJ5Lm9sZGVyLm5ld2VyID0gZW50cnkubmV3ZXI7IC8vIEMuIC0tPiBFXG4gICAgfVxuICAgIGVudHJ5Lm5ld2VyID0gdW5kZWZpbmVkOyAvLyBEIC0teFxuICAgIGVudHJ5Lm9sZGVyID0gdGhpcy50YWlsOyAvLyBELiAtLT4gRVxuICAgIGlmICh0aGlzLnRhaWwpIHtcbiAgICAgIHRoaXMudGFpbC5uZXdlciA9IGVudHJ5OyAvLyBFLiA8LS0gRFxuICAgIH1cbiAgICB0aGlzLnRhaWwgPSBlbnRyeTtcbiAgICByZXR1cm4gcmV0dXJuRW50cnkgPyBlbnRyeSA6IGVudHJ5LnZhbHVlO1xuICB9O1xuXG4gIHZhciBjYWNoZSQxID0gbmV3IENhY2hlKDEwMDApO1xuICB2YXIgZmlsdGVyVG9rZW5SRSA9IC9bXlxccydcIl0rfCdbXiddKid8XCJbXlwiXSpcIi9nO1xuICB2YXIgcmVzZXJ2ZWRBcmdSRSA9IC9eaW4kfF4tP1xcZCsvO1xuXG4gIC8qKlxuICAgKiBQYXJzZXIgc3RhdGVcbiAgICovXG5cbiAgdmFyIHN0cjtcbiAgdmFyIGRpcjtcbiAgdmFyIGM7XG4gIHZhciBwcmV2O1xuICB2YXIgaTtcbiAgdmFyIGw7XG4gIHZhciBsYXN0RmlsdGVySW5kZXg7XG4gIHZhciBpblNpbmdsZTtcbiAgdmFyIGluRG91YmxlO1xuICB2YXIgY3VybHk7XG4gIHZhciBzcXVhcmU7XG4gIHZhciBwYXJlbjtcbiAgLyoqXG4gICAqIFB1c2ggYSBmaWx0ZXIgdG8gdGhlIGN1cnJlbnQgZGlyZWN0aXZlIG9iamVjdFxuICAgKi9cblxuICBmdW5jdGlvbiBwdXNoRmlsdGVyKCkge1xuICAgIHZhciBleHAgPSBzdHIuc2xpY2UobGFzdEZpbHRlckluZGV4LCBpKS50cmltKCk7XG4gICAgdmFyIGZpbHRlcjtcbiAgICBpZiAoZXhwKSB7XG4gICAgICBmaWx0ZXIgPSB7fTtcbiAgICAgIHZhciB0b2tlbnMgPSBleHAubWF0Y2goZmlsdGVyVG9rZW5SRSk7XG4gICAgICBmaWx0ZXIubmFtZSA9IHRva2Vuc1swXTtcbiAgICAgIGlmICh0b2tlbnMubGVuZ3RoID4gMSkge1xuICAgICAgICBmaWx0ZXIuYXJncyA9IHRva2Vucy5zbGljZSgxKS5tYXAocHJvY2Vzc0ZpbHRlckFyZyk7XG4gICAgICB9XG4gICAgfVxuICAgIGlmIChmaWx0ZXIpIHtcbiAgICAgIChkaXIuZmlsdGVycyA9IGRpci5maWx0ZXJzIHx8IFtdKS5wdXNoKGZpbHRlcik7XG4gICAgfVxuICAgIGxhc3RGaWx0ZXJJbmRleCA9IGkgKyAxO1xuICB9XG5cbiAgLyoqXG4gICAqIENoZWNrIGlmIGFuIGFyZ3VtZW50IGlzIGR5bmFtaWMgYW5kIHN0cmlwIHF1b3Rlcy5cbiAgICpcbiAgICogQHBhcmFtIHtTdHJpbmd9IGFyZ1xuICAgKiBAcmV0dXJuIHtPYmplY3R9XG4gICAqL1xuXG4gIGZ1bmN0aW9uIHByb2Nlc3NGaWx0ZXJBcmcoYXJnKSB7XG4gICAgaWYgKHJlc2VydmVkQXJnUkUudGVzdChhcmcpKSB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICB2YWx1ZTogdG9OdW1iZXIoYXJnKSxcbiAgICAgICAgZHluYW1pYzogZmFsc2VcbiAgICAgIH07XG4gICAgfSBlbHNlIHtcbiAgICAgIHZhciBzdHJpcHBlZCA9IHN0cmlwUXVvdGVzKGFyZyk7XG4gICAgICB2YXIgZHluYW1pYyA9IHN0cmlwcGVkID09PSBhcmc7XG4gICAgICByZXR1cm4ge1xuICAgICAgICB2YWx1ZTogZHluYW1pYyA/IGFyZyA6IHN0cmlwcGVkLFxuICAgICAgICBkeW5hbWljOiBkeW5hbWljXG4gICAgICB9O1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBQYXJzZSBhIGRpcmVjdGl2ZSB2YWx1ZSBhbmQgZXh0cmFjdCB0aGUgZXhwcmVzc2lvblxuICAgKiBhbmQgaXRzIGZpbHRlcnMgaW50byBhIGRlc2NyaXB0b3IuXG4gICAqXG4gICAqIEV4YW1wbGU6XG4gICAqXG4gICAqIFwiYSArIDEgfCB1cHBlcmNhc2VcIiB3aWxsIHlpZWxkOlxuICAgKiB7XG4gICAqICAgZXhwcmVzc2lvbjogJ2EgKyAxJyxcbiAgICogICBmaWx0ZXJzOiBbXG4gICAqICAgICB7IG5hbWU6ICd1cHBlcmNhc2UnLCBhcmdzOiBudWxsIH1cbiAgICogICBdXG4gICAqIH1cbiAgICpcbiAgICogQHBhcmFtIHtTdHJpbmd9IHNcbiAgICogQHJldHVybiB7T2JqZWN0fVxuICAgKi9cblxuICBmdW5jdGlvbiBwYXJzZURpcmVjdGl2ZShzKSB7XG4gICAgdmFyIGhpdCA9IGNhY2hlJDEuZ2V0KHMpO1xuICAgIGlmIChoaXQpIHtcbiAgICAgIHJldHVybiBoaXQ7XG4gICAgfVxuXG4gICAgLy8gcmVzZXQgcGFyc2VyIHN0YXRlXG4gICAgc3RyID0gcztcbiAgICBpblNpbmdsZSA9IGluRG91YmxlID0gZmFsc2U7XG4gICAgY3VybHkgPSBzcXVhcmUgPSBwYXJlbiA9IDA7XG4gICAgbGFzdEZpbHRlckluZGV4ID0gMDtcbiAgICBkaXIgPSB7fTtcblxuICAgIGZvciAoaSA9IDAsIGwgPSBzdHIubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG4gICAgICBwcmV2ID0gYztcbiAgICAgIGMgPSBzdHIuY2hhckNvZGVBdChpKTtcbiAgICAgIGlmIChpblNpbmdsZSkge1xuICAgICAgICAvLyBjaGVjayBzaW5nbGUgcXVvdGVcbiAgICAgICAgaWYgKGMgPT09IDB4MjcgJiYgcHJldiAhPT0gMHg1QykgaW5TaW5nbGUgPSAhaW5TaW5nbGU7XG4gICAgICB9IGVsc2UgaWYgKGluRG91YmxlKSB7XG4gICAgICAgIC8vIGNoZWNrIGRvdWJsZSBxdW90ZVxuICAgICAgICBpZiAoYyA9PT0gMHgyMiAmJiBwcmV2ICE9PSAweDVDKSBpbkRvdWJsZSA9ICFpbkRvdWJsZTtcbiAgICAgIH0gZWxzZSBpZiAoYyA9PT0gMHg3QyAmJiAvLyBwaXBlXG4gICAgICBzdHIuY2hhckNvZGVBdChpICsgMSkgIT09IDB4N0MgJiYgc3RyLmNoYXJDb2RlQXQoaSAtIDEpICE9PSAweDdDKSB7XG4gICAgICAgIGlmIChkaXIuZXhwcmVzc2lvbiA9PSBudWxsKSB7XG4gICAgICAgICAgLy8gZmlyc3QgZmlsdGVyLCBlbmQgb2YgZXhwcmVzc2lvblxuICAgICAgICAgIGxhc3RGaWx0ZXJJbmRleCA9IGkgKyAxO1xuICAgICAgICAgIGRpci5leHByZXNzaW9uID0gc3RyLnNsaWNlKDAsIGkpLnRyaW0oKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAvLyBhbHJlYWR5IGhhcyBmaWx0ZXJcbiAgICAgICAgICBwdXNoRmlsdGVyKCk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHN3aXRjaCAoYykge1xuICAgICAgICAgIGNhc2UgMHgyMjpcbiAgICAgICAgICAgIGluRG91YmxlID0gdHJ1ZTticmVhazsgLy8gXCJcbiAgICAgICAgICBjYXNlIDB4Mjc6XG4gICAgICAgICAgICBpblNpbmdsZSA9IHRydWU7YnJlYWs7IC8vICdcbiAgICAgICAgICBjYXNlIDB4Mjg6XG4gICAgICAgICAgICBwYXJlbisrO2JyZWFrOyAvLyAoXG4gICAgICAgICAgY2FzZSAweDI5OlxuICAgICAgICAgICAgcGFyZW4tLTticmVhazsgLy8gKVxuICAgICAgICAgIGNhc2UgMHg1QjpcbiAgICAgICAgICAgIHNxdWFyZSsrO2JyZWFrOyAvLyBbXG4gICAgICAgICAgY2FzZSAweDVEOlxuICAgICAgICAgICAgc3F1YXJlLS07YnJlYWs7IC8vIF1cbiAgICAgICAgICBjYXNlIDB4N0I6XG4gICAgICAgICAgICBjdXJseSsrO2JyZWFrOyAvLyB7XG4gICAgICAgICAgY2FzZSAweDdEOlxuICAgICAgICAgICAgY3VybHktLTticmVhazsgLy8gfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKGRpci5leHByZXNzaW9uID09IG51bGwpIHtcbiAgICAgIGRpci5leHByZXNzaW9uID0gc3RyLnNsaWNlKDAsIGkpLnRyaW0oKTtcbiAgICB9IGVsc2UgaWYgKGxhc3RGaWx0ZXJJbmRleCAhPT0gMCkge1xuICAgICAgcHVzaEZpbHRlcigpO1xuICAgIH1cblxuICAgIGNhY2hlJDEucHV0KHMsIGRpcik7XG4gICAgcmV0dXJuIGRpcjtcbiAgfVxuXG52YXIgZGlyZWN0aXZlID0gT2JqZWN0LmZyZWV6ZSh7XG4gICAgcGFyc2VEaXJlY3RpdmU6IHBhcnNlRGlyZWN0aXZlXG4gIH0pO1xuXG4gIHZhciByZWdleEVzY2FwZVJFID0gL1stLiorP14ke30oKXxbXFxdXFwvXFxcXF0vZztcbiAgdmFyIGNhY2hlID0gdW5kZWZpbmVkO1xuICB2YXIgdGFnUkUgPSB1bmRlZmluZWQ7XG4gIHZhciBodG1sUkUgPSB1bmRlZmluZWQ7XG4gIC8qKlxuICAgKiBFc2NhcGUgYSBzdHJpbmcgc28gaXQgY2FuIGJlIHVzZWQgaW4gYSBSZWdFeHBcbiAgICogY29uc3RydWN0b3IuXG4gICAqXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBzdHJcbiAgICovXG5cbiAgZnVuY3Rpb24gZXNjYXBlUmVnZXgoc3RyKSB7XG4gICAgcmV0dXJuIHN0ci5yZXBsYWNlKHJlZ2V4RXNjYXBlUkUsICdcXFxcJCYnKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGNvbXBpbGVSZWdleCgpIHtcbiAgICB2YXIgb3BlbiA9IGVzY2FwZVJlZ2V4KGNvbmZpZy5kZWxpbWl0ZXJzWzBdKTtcbiAgICB2YXIgY2xvc2UgPSBlc2NhcGVSZWdleChjb25maWcuZGVsaW1pdGVyc1sxXSk7XG4gICAgdmFyIHVuc2FmZU9wZW4gPSBlc2NhcGVSZWdleChjb25maWcudW5zYWZlRGVsaW1pdGVyc1swXSk7XG4gICAgdmFyIHVuc2FmZUNsb3NlID0gZXNjYXBlUmVnZXgoY29uZmlnLnVuc2FmZURlbGltaXRlcnNbMV0pO1xuICAgIHRhZ1JFID0gbmV3IFJlZ0V4cCh1bnNhZmVPcGVuICsgJygoPzoufFxcXFxuKSs/KScgKyB1bnNhZmVDbG9zZSArICd8JyArIG9wZW4gKyAnKCg/Oi58XFxcXG4pKz8pJyArIGNsb3NlLCAnZycpO1xuICAgIGh0bWxSRSA9IG5ldyBSZWdFeHAoJ14nICsgdW5zYWZlT3BlbiArICcuKicgKyB1bnNhZmVDbG9zZSArICckJyk7XG4gICAgLy8gcmVzZXQgY2FjaGVcbiAgICBjYWNoZSA9IG5ldyBDYWNoZSgxMDAwKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBQYXJzZSBhIHRlbXBsYXRlIHRleHQgc3RyaW5nIGludG8gYW4gYXJyYXkgb2YgdG9rZW5zLlxuICAgKlxuICAgKiBAcGFyYW0ge1N0cmluZ30gdGV4dFxuICAgKiBAcmV0dXJuIHtBcnJheTxPYmplY3Q+IHwgbnVsbH1cbiAgICogICAgICAgICAgICAgICAtIHtTdHJpbmd9IHR5cGVcbiAgICogICAgICAgICAgICAgICAtIHtTdHJpbmd9IHZhbHVlXG4gICAqICAgICAgICAgICAgICAgLSB7Qm9vbGVhbn0gW2h0bWxdXG4gICAqICAgICAgICAgICAgICAgLSB7Qm9vbGVhbn0gW29uZVRpbWVdXG4gICAqL1xuXG4gIGZ1bmN0aW9uIHBhcnNlVGV4dCh0ZXh0KSB7XG4gICAgaWYgKCFjYWNoZSkge1xuICAgICAgY29tcGlsZVJlZ2V4KCk7XG4gICAgfVxuICAgIHZhciBoaXQgPSBjYWNoZS5nZXQodGV4dCk7XG4gICAgaWYgKGhpdCkge1xuICAgICAgcmV0dXJuIGhpdDtcbiAgICB9XG4gICAgaWYgKCF0YWdSRS50ZXN0KHRleHQpKSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gICAgdmFyIHRva2VucyA9IFtdO1xuICAgIHZhciBsYXN0SW5kZXggPSB0YWdSRS5sYXN0SW5kZXggPSAwO1xuICAgIHZhciBtYXRjaCwgaW5kZXgsIGh0bWwsIHZhbHVlLCBmaXJzdCwgb25lVGltZTtcbiAgICAvKiBlc2xpbnQtZGlzYWJsZSBuby1jb25kLWFzc2lnbiAqL1xuICAgIHdoaWxlIChtYXRjaCA9IHRhZ1JFLmV4ZWModGV4dCkpIHtcbiAgICAgIC8qIGVzbGludC1lbmFibGUgbm8tY29uZC1hc3NpZ24gKi9cbiAgICAgIGluZGV4ID0gbWF0Y2guaW5kZXg7XG4gICAgICAvLyBwdXNoIHRleHQgdG9rZW5cbiAgICAgIGlmIChpbmRleCA+IGxhc3RJbmRleCkge1xuICAgICAgICB0b2tlbnMucHVzaCh7XG4gICAgICAgICAgdmFsdWU6IHRleHQuc2xpY2UobGFzdEluZGV4LCBpbmRleClcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgICAvLyB0YWcgdG9rZW5cbiAgICAgIGh0bWwgPSBodG1sUkUudGVzdChtYXRjaFswXSk7XG4gICAgICB2YWx1ZSA9IGh0bWwgPyBtYXRjaFsxXSA6IG1hdGNoWzJdO1xuICAgICAgZmlyc3QgPSB2YWx1ZS5jaGFyQ29kZUF0KDApO1xuICAgICAgb25lVGltZSA9IGZpcnN0ID09PSA0MjsgLy8gKlxuICAgICAgdmFsdWUgPSBvbmVUaW1lID8gdmFsdWUuc2xpY2UoMSkgOiB2YWx1ZTtcbiAgICAgIHRva2Vucy5wdXNoKHtcbiAgICAgICAgdGFnOiB0cnVlLFxuICAgICAgICB2YWx1ZTogdmFsdWUudHJpbSgpLFxuICAgICAgICBodG1sOiBodG1sLFxuICAgICAgICBvbmVUaW1lOiBvbmVUaW1lXG4gICAgICB9KTtcbiAgICAgIGxhc3RJbmRleCA9IGluZGV4ICsgbWF0Y2hbMF0ubGVuZ3RoO1xuICAgIH1cbiAgICBpZiAobGFzdEluZGV4IDwgdGV4dC5sZW5ndGgpIHtcbiAgICAgIHRva2Vucy5wdXNoKHtcbiAgICAgICAgdmFsdWU6IHRleHQuc2xpY2UobGFzdEluZGV4KVxuICAgICAgfSk7XG4gICAgfVxuICAgIGNhY2hlLnB1dCh0ZXh0LCB0b2tlbnMpO1xuICAgIHJldHVybiB0b2tlbnM7XG4gIH1cblxuICAvKipcbiAgICogRm9ybWF0IGEgbGlzdCBvZiB0b2tlbnMgaW50byBhbiBleHByZXNzaW9uLlxuICAgKiBlLmcuIHRva2VucyBwYXJzZWQgZnJvbSAnYSB7e2J9fSBjJyBjYW4gYmUgc2VyaWFsaXplZFxuICAgKiBpbnRvIG9uZSBzaW5nbGUgZXhwcmVzc2lvbiBhcyAnXCJhIFwiICsgYiArIFwiIGNcIicuXG4gICAqXG4gICAqIEBwYXJhbSB7QXJyYXl9IHRva2Vuc1xuICAgKiBAcGFyYW0ge1Z1ZX0gW3ZtXVxuICAgKiBAcmV0dXJuIHtTdHJpbmd9XG4gICAqL1xuXG4gIGZ1bmN0aW9uIHRva2Vuc1RvRXhwKHRva2Vucywgdm0pIHtcbiAgICBpZiAodG9rZW5zLmxlbmd0aCA+IDEpIHtcbiAgICAgIHJldHVybiB0b2tlbnMubWFwKGZ1bmN0aW9uICh0b2tlbikge1xuICAgICAgICByZXR1cm4gZm9ybWF0VG9rZW4odG9rZW4sIHZtKTtcbiAgICAgIH0pLmpvaW4oJysnKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIGZvcm1hdFRva2VuKHRva2Vuc1swXSwgdm0sIHRydWUpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBGb3JtYXQgYSBzaW5nbGUgdG9rZW4uXG4gICAqXG4gICAqIEBwYXJhbSB7T2JqZWN0fSB0b2tlblxuICAgKiBAcGFyYW0ge1Z1ZX0gW3ZtXVxuICAgKiBAcGFyYW0ge0Jvb2xlYW59IFtzaW5nbGVdXG4gICAqIEByZXR1cm4ge1N0cmluZ31cbiAgICovXG5cbiAgZnVuY3Rpb24gZm9ybWF0VG9rZW4odG9rZW4sIHZtLCBzaW5nbGUpIHtcbiAgICByZXR1cm4gdG9rZW4udGFnID8gdG9rZW4ub25lVGltZSAmJiB2bSA/ICdcIicgKyB2bS4kZXZhbCh0b2tlbi52YWx1ZSkgKyAnXCInIDogaW5saW5lRmlsdGVycyh0b2tlbi52YWx1ZSwgc2luZ2xlKSA6ICdcIicgKyB0b2tlbi52YWx1ZSArICdcIic7XG4gIH1cblxuICAvKipcbiAgICogRm9yIGFuIGF0dHJpYnV0ZSB3aXRoIG11bHRpcGxlIGludGVycG9sYXRpb24gdGFncyxcbiAgICogZS5nLiBhdHRyPVwic29tZS17e3RoaW5nIHwgZmlsdGVyfX1cIiwgaW4gb3JkZXIgdG8gY29tYmluZVxuICAgKiB0aGUgd2hvbGUgdGhpbmcgaW50byBhIHNpbmdsZSB3YXRjaGFibGUgZXhwcmVzc2lvbiwgd2VcbiAgICogaGF2ZSB0byBpbmxpbmUgdGhvc2UgZmlsdGVycy4gVGhpcyBmdW5jdGlvbiBkb2VzIGV4YWN0bHlcbiAgICogdGhhdC4gVGhpcyBpcyBhIGJpdCBoYWNreSBidXQgaXQgYXZvaWRzIGhlYXZ5IGNoYW5nZXNcbiAgICogdG8gZGlyZWN0aXZlIHBhcnNlciBhbmQgd2F0Y2hlciBtZWNoYW5pc20uXG4gICAqXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBleHBcbiAgICogQHBhcmFtIHtCb29sZWFufSBzaW5nbGVcbiAgICogQHJldHVybiB7U3RyaW5nfVxuICAgKi9cblxuICB2YXIgZmlsdGVyUkUgPSAvW158XVxcfFtefF0vO1xuICBmdW5jdGlvbiBpbmxpbmVGaWx0ZXJzKGV4cCwgc2luZ2xlKSB7XG4gICAgaWYgKCFmaWx0ZXJSRS50ZXN0KGV4cCkpIHtcbiAgICAgIHJldHVybiBzaW5nbGUgPyBleHAgOiAnKCcgKyBleHAgKyAnKSc7XG4gICAgfSBlbHNlIHtcbiAgICAgIHZhciBkaXIgPSBwYXJzZURpcmVjdGl2ZShleHApO1xuICAgICAgaWYgKCFkaXIuZmlsdGVycykge1xuICAgICAgICByZXR1cm4gJygnICsgZXhwICsgJyknO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuICd0aGlzLl9hcHBseUZpbHRlcnMoJyArIGRpci5leHByZXNzaW9uICsgLy8gdmFsdWVcbiAgICAgICAgJyxudWxsLCcgKyAvLyBvbGRWYWx1ZSAobnVsbCBmb3IgcmVhZClcbiAgICAgICAgSlNPTi5zdHJpbmdpZnkoZGlyLmZpbHRlcnMpICsgLy8gZmlsdGVyIGRlc2NyaXB0b3JzXG4gICAgICAgICcsZmFsc2UpJzsgLy8gd3JpdGU/XG4gICAgICB9XG4gICAgfVxuICB9XG5cbnZhciB0ZXh0ID0gT2JqZWN0LmZyZWV6ZSh7XG4gICAgY29tcGlsZVJlZ2V4OiBjb21waWxlUmVnZXgsXG4gICAgcGFyc2VUZXh0OiBwYXJzZVRleHQsXG4gICAgdG9rZW5zVG9FeHA6IHRva2Vuc1RvRXhwXG4gIH0pO1xuXG4gIHZhciBkZWxpbWl0ZXJzID0gWyd7eycsICd9fSddO1xuICB2YXIgdW5zYWZlRGVsaW1pdGVycyA9IFsne3t7JywgJ319fSddO1xuXG4gIHZhciBjb25maWcgPSBPYmplY3QuZGVmaW5lUHJvcGVydGllcyh7XG5cbiAgICAvKipcbiAgICAgKiBXaGV0aGVyIHRvIHByaW50IGRlYnVnIG1lc3NhZ2VzLlxuICAgICAqIEFsc28gZW5hYmxlcyBzdGFjayB0cmFjZSBmb3Igd2FybmluZ3MuXG4gICAgICpcbiAgICAgKiBAdHlwZSB7Qm9vbGVhbn1cbiAgICAgKi9cblxuICAgIGRlYnVnOiBmYWxzZSxcblxuICAgIC8qKlxuICAgICAqIFdoZXRoZXIgdG8gc3VwcHJlc3Mgd2FybmluZ3MuXG4gICAgICpcbiAgICAgKiBAdHlwZSB7Qm9vbGVhbn1cbiAgICAgKi9cblxuICAgIHNpbGVudDogZmFsc2UsXG5cbiAgICAvKipcbiAgICAgKiBXaGV0aGVyIHRvIHVzZSBhc3luYyByZW5kZXJpbmcuXG4gICAgICovXG5cbiAgICBhc3luYzogdHJ1ZSxcblxuICAgIC8qKlxuICAgICAqIFdoZXRoZXIgdG8gd2FybiBhZ2FpbnN0IGVycm9ycyBjYXVnaHQgd2hlbiBldmFsdWF0aW5nXG4gICAgICogZXhwcmVzc2lvbnMuXG4gICAgICovXG5cbiAgICB3YXJuRXhwcmVzc2lvbkVycm9yczogdHJ1ZSxcblxuICAgIC8qKlxuICAgICAqIFdoZXRoZXIgdG8gYWxsb3cgZGV2dG9vbHMgaW5zcGVjdGlvbi5cbiAgICAgKiBEaXNhYmxlZCBieSBkZWZhdWx0IGluIHByb2R1Y3Rpb24gYnVpbGRzLlxuICAgICAqL1xuXG4gICAgZGV2dG9vbHM6ICdkZXZlbG9wbWVudCcgIT09ICdwcm9kdWN0aW9uJyxcblxuICAgIC8qKlxuICAgICAqIEludGVybmFsIGZsYWcgdG8gaW5kaWNhdGUgdGhlIGRlbGltaXRlcnMgaGF2ZSBiZWVuXG4gICAgICogY2hhbmdlZC5cbiAgICAgKlxuICAgICAqIEB0eXBlIHtCb29sZWFufVxuICAgICAqL1xuXG4gICAgX2RlbGltaXRlcnNDaGFuZ2VkOiB0cnVlLFxuXG4gICAgLyoqXG4gICAgICogTGlzdCBvZiBhc3NldCB0eXBlcyB0aGF0IGEgY29tcG9uZW50IGNhbiBvd24uXG4gICAgICpcbiAgICAgKiBAdHlwZSB7QXJyYXl9XG4gICAgICovXG5cbiAgICBfYXNzZXRUeXBlczogWydjb21wb25lbnQnLCAnZGlyZWN0aXZlJywgJ2VsZW1lbnREaXJlY3RpdmUnLCAnZmlsdGVyJywgJ3RyYW5zaXRpb24nLCAncGFydGlhbCddLFxuXG4gICAgLyoqXG4gICAgICogcHJvcCBiaW5kaW5nIG1vZGVzXG4gICAgICovXG5cbiAgICBfcHJvcEJpbmRpbmdNb2Rlczoge1xuICAgICAgT05FX1dBWTogMCxcbiAgICAgIFRXT19XQVk6IDEsXG4gICAgICBPTkVfVElNRTogMlxuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBNYXggY2lyY3VsYXIgdXBkYXRlcyBhbGxvd2VkIGluIGEgYmF0Y2hlciBmbHVzaCBjeWNsZS5cbiAgICAgKi9cblxuICAgIF9tYXhVcGRhdGVDb3VudDogMTAwXG5cbiAgfSwge1xuICAgIGRlbGltaXRlcnM6IHsgLyoqXG4gICAgICAgICAgICAgICAgICAgKiBJbnRlcnBvbGF0aW9uIGRlbGltaXRlcnMuIENoYW5naW5nIHRoZXNlIHdvdWxkIHRyaWdnZXJcbiAgICAgICAgICAgICAgICAgICAqIHRoZSB0ZXh0IHBhcnNlciB0byByZS1jb21waWxlIHRoZSByZWd1bGFyIGV4cHJlc3Npb25zLlxuICAgICAgICAgICAgICAgICAgICpcbiAgICAgICAgICAgICAgICAgICAqIEB0eXBlIHtBcnJheTxTdHJpbmc+fVxuICAgICAgICAgICAgICAgICAgICovXG5cbiAgICAgIGdldDogZnVuY3Rpb24gZ2V0KCkge1xuICAgICAgICByZXR1cm4gZGVsaW1pdGVycztcbiAgICAgIH0sXG4gICAgICBzZXQ6IGZ1bmN0aW9uIHNldCh2YWwpIHtcbiAgICAgICAgZGVsaW1pdGVycyA9IHZhbDtcbiAgICAgICAgY29tcGlsZVJlZ2V4KCk7XG4gICAgICB9LFxuICAgICAgY29uZmlndXJhYmxlOiB0cnVlLFxuICAgICAgZW51bWVyYWJsZTogdHJ1ZVxuICAgIH0sXG4gICAgdW5zYWZlRGVsaW1pdGVyczoge1xuICAgICAgZ2V0OiBmdW5jdGlvbiBnZXQoKSB7XG4gICAgICAgIHJldHVybiB1bnNhZmVEZWxpbWl0ZXJzO1xuICAgICAgfSxcbiAgICAgIHNldDogZnVuY3Rpb24gc2V0KHZhbCkge1xuICAgICAgICB1bnNhZmVEZWxpbWl0ZXJzID0gdmFsO1xuICAgICAgICBjb21waWxlUmVnZXgoKTtcbiAgICAgIH0sXG4gICAgICBjb25maWd1cmFibGU6IHRydWUsXG4gICAgICBlbnVtZXJhYmxlOiB0cnVlXG4gICAgfVxuICB9KTtcblxuICB2YXIgd2FybiA9IHVuZGVmaW5lZDtcbiAgdmFyIGZvcm1hdENvbXBvbmVudE5hbWUgPSB1bmRlZmluZWQ7XG5cbiAgaWYgKCdkZXZlbG9wbWVudCcgIT09ICdwcm9kdWN0aW9uJykge1xuICAgIChmdW5jdGlvbiAoKSB7XG4gICAgICB2YXIgaGFzQ29uc29sZSA9IHR5cGVvZiBjb25zb2xlICE9PSAndW5kZWZpbmVkJztcblxuICAgICAgd2FybiA9IGZ1bmN0aW9uIChtc2csIHZtKSB7XG4gICAgICAgIGlmIChoYXNDb25zb2xlICYmICFjb25maWcuc2lsZW50KSB7XG4gICAgICAgICAgY29uc29sZS5lcnJvcignW1Z1ZSB3YXJuXTogJyArIG1zZyArICh2bSA/IGZvcm1hdENvbXBvbmVudE5hbWUodm0pIDogJycpKTtcbiAgICAgICAgfVxuICAgICAgfTtcblxuICAgICAgZm9ybWF0Q29tcG9uZW50TmFtZSA9IGZ1bmN0aW9uICh2bSkge1xuICAgICAgICB2YXIgbmFtZSA9IHZtLl9pc1Z1ZSA/IHZtLiRvcHRpb25zLm5hbWUgOiB2bS5uYW1lO1xuICAgICAgICByZXR1cm4gbmFtZSA/ICcgKGZvdW5kIGluIGNvbXBvbmVudDogPCcgKyBoeXBoZW5hdGUobmFtZSkgKyAnPiknIDogJyc7XG4gICAgICB9O1xuICAgIH0pKCk7XG4gIH1cblxuICAvKipcbiAgICogQXBwZW5kIHdpdGggdHJhbnNpdGlvbi5cbiAgICpcbiAgICogQHBhcmFtIHtFbGVtZW50fSBlbFxuICAgKiBAcGFyYW0ge0VsZW1lbnR9IHRhcmdldFxuICAgKiBAcGFyYW0ge1Z1ZX0gdm1cbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gW2NiXVxuICAgKi9cblxuICBmdW5jdGlvbiBhcHBlbmRXaXRoVHJhbnNpdGlvbihlbCwgdGFyZ2V0LCB2bSwgY2IpIHtcbiAgICBhcHBseVRyYW5zaXRpb24oZWwsIDEsIGZ1bmN0aW9uICgpIHtcbiAgICAgIHRhcmdldC5hcHBlbmRDaGlsZChlbCk7XG4gICAgfSwgdm0sIGNiKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBJbnNlcnRCZWZvcmUgd2l0aCB0cmFuc2l0aW9uLlxuICAgKlxuICAgKiBAcGFyYW0ge0VsZW1lbnR9IGVsXG4gICAqIEBwYXJhbSB7RWxlbWVudH0gdGFyZ2V0XG4gICAqIEBwYXJhbSB7VnVlfSB2bVxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBbY2JdXG4gICAqL1xuXG4gIGZ1bmN0aW9uIGJlZm9yZVdpdGhUcmFuc2l0aW9uKGVsLCB0YXJnZXQsIHZtLCBjYikge1xuICAgIGFwcGx5VHJhbnNpdGlvbihlbCwgMSwgZnVuY3Rpb24gKCkge1xuICAgICAgYmVmb3JlKGVsLCB0YXJnZXQpO1xuICAgIH0sIHZtLCBjYik7XG4gIH1cblxuICAvKipcbiAgICogUmVtb3ZlIHdpdGggdHJhbnNpdGlvbi5cbiAgICpcbiAgICogQHBhcmFtIHtFbGVtZW50fSBlbFxuICAgKiBAcGFyYW0ge1Z1ZX0gdm1cbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gW2NiXVxuICAgKi9cblxuICBmdW5jdGlvbiByZW1vdmVXaXRoVHJhbnNpdGlvbihlbCwgdm0sIGNiKSB7XG4gICAgYXBwbHlUcmFuc2l0aW9uKGVsLCAtMSwgZnVuY3Rpb24gKCkge1xuICAgICAgcmVtb3ZlKGVsKTtcbiAgICB9LCB2bSwgY2IpO1xuICB9XG5cbiAgLyoqXG4gICAqIEFwcGx5IHRyYW5zaXRpb25zIHdpdGggYW4gb3BlcmF0aW9uIGNhbGxiYWNrLlxuICAgKlxuICAgKiBAcGFyYW0ge0VsZW1lbnR9IGVsXG4gICAqIEBwYXJhbSB7TnVtYmVyfSBkaXJlY3Rpb25cbiAgICogICAgICAgICAgICAgICAgICAxOiBlbnRlclxuICAgKiAgICAgICAgICAgICAgICAgLTE6IGxlYXZlXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IG9wIC0gdGhlIGFjdHVhbCBET00gb3BlcmF0aW9uXG4gICAqIEBwYXJhbSB7VnVlfSB2bVxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBbY2JdXG4gICAqL1xuXG4gIGZ1bmN0aW9uIGFwcGx5VHJhbnNpdGlvbihlbCwgZGlyZWN0aW9uLCBvcCwgdm0sIGNiKSB7XG4gICAgdmFyIHRyYW5zaXRpb24gPSBlbC5fX3ZfdHJhbnM7XG4gICAgaWYgKCF0cmFuc2l0aW9uIHx8XG4gICAgLy8gc2tpcCBpZiB0aGVyZSBhcmUgbm8ganMgaG9va3MgYW5kIENTUyB0cmFuc2l0aW9uIGlzXG4gICAgLy8gbm90IHN1cHBvcnRlZFxuICAgICF0cmFuc2l0aW9uLmhvb2tzICYmICF0cmFuc2l0aW9uRW5kRXZlbnQgfHxcbiAgICAvLyBza2lwIHRyYW5zaXRpb25zIGZvciBpbml0aWFsIGNvbXBpbGVcbiAgICAhdm0uX2lzQ29tcGlsZWQgfHxcbiAgICAvLyBpZiB0aGUgdm0gaXMgYmVpbmcgbWFuaXB1bGF0ZWQgYnkgYSBwYXJlbnQgZGlyZWN0aXZlXG4gICAgLy8gZHVyaW5nIHRoZSBwYXJlbnQncyBjb21waWxhdGlvbiBwaGFzZSwgc2tpcCB0aGVcbiAgICAvLyBhbmltYXRpb24uXG4gICAgdm0uJHBhcmVudCAmJiAhdm0uJHBhcmVudC5faXNDb21waWxlZCkge1xuICAgICAgb3AoKTtcbiAgICAgIGlmIChjYikgY2IoKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdmFyIGFjdGlvbiA9IGRpcmVjdGlvbiA+IDAgPyAnZW50ZXInIDogJ2xlYXZlJztcbiAgICB0cmFuc2l0aW9uW2FjdGlvbl0ob3AsIGNiKTtcbiAgfVxuXG52YXIgdHJhbnNpdGlvbiA9IE9iamVjdC5mcmVlemUoe1xuICAgIGFwcGVuZFdpdGhUcmFuc2l0aW9uOiBhcHBlbmRXaXRoVHJhbnNpdGlvbixcbiAgICBiZWZvcmVXaXRoVHJhbnNpdGlvbjogYmVmb3JlV2l0aFRyYW5zaXRpb24sXG4gICAgcmVtb3ZlV2l0aFRyYW5zaXRpb246IHJlbW92ZVdpdGhUcmFuc2l0aW9uLFxuICAgIGFwcGx5VHJhbnNpdGlvbjogYXBwbHlUcmFuc2l0aW9uXG4gIH0pO1xuXG4gIC8qKlxuICAgKiBRdWVyeSBhbiBlbGVtZW50IHNlbGVjdG9yIGlmIGl0J3Mgbm90IGFuIGVsZW1lbnQgYWxyZWFkeS5cbiAgICpcbiAgICogQHBhcmFtIHtTdHJpbmd8RWxlbWVudH0gZWxcbiAgICogQHJldHVybiB7RWxlbWVudH1cbiAgICovXG5cbiAgZnVuY3Rpb24gcXVlcnkoZWwpIHtcbiAgICBpZiAodHlwZW9mIGVsID09PSAnc3RyaW5nJykge1xuICAgICAgdmFyIHNlbGVjdG9yID0gZWw7XG4gICAgICBlbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoZWwpO1xuICAgICAgaWYgKCFlbCkge1xuICAgICAgICAnZGV2ZWxvcG1lbnQnICE9PSAncHJvZHVjdGlvbicgJiYgd2FybignQ2Fubm90IGZpbmQgZWxlbWVudDogJyArIHNlbGVjdG9yKTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGVsO1xuICB9XG5cbiAgLyoqXG4gICAqIENoZWNrIGlmIGEgbm9kZSBpcyBpbiB0aGUgZG9jdW1lbnQuXG4gICAqIE5vdGU6IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jb250YWlucyBzaG91bGQgd29yayBoZXJlXG4gICAqIGJ1dCBhbHdheXMgcmV0dXJucyBmYWxzZSBmb3IgY29tbWVudCBub2RlcyBpbiBwaGFudG9tanMsXG4gICAqIG1ha2luZyB1bml0IHRlc3RzIGRpZmZpY3VsdC4gVGhpcyBpcyBmaXhlZCBieSBkb2luZyB0aGVcbiAgICogY29udGFpbnMoKSBjaGVjayBvbiB0aGUgbm9kZSdzIHBhcmVudE5vZGUgaW5zdGVhZCBvZlxuICAgKiB0aGUgbm9kZSBpdHNlbGYuXG4gICAqXG4gICAqIEBwYXJhbSB7Tm9kZX0gbm9kZVxuICAgKiBAcmV0dXJuIHtCb29sZWFufVxuICAgKi9cblxuICBmdW5jdGlvbiBpbkRvYyhub2RlKSB7XG4gICAgaWYgKCFub2RlKSByZXR1cm4gZmFsc2U7XG4gICAgdmFyIGRvYyA9IG5vZGUub3duZXJEb2N1bWVudC5kb2N1bWVudEVsZW1lbnQ7XG4gICAgdmFyIHBhcmVudCA9IG5vZGUucGFyZW50Tm9kZTtcbiAgICByZXR1cm4gZG9jID09PSBub2RlIHx8IGRvYyA9PT0gcGFyZW50IHx8ICEhKHBhcmVudCAmJiBwYXJlbnQubm9kZVR5cGUgPT09IDEgJiYgZG9jLmNvbnRhaW5zKHBhcmVudCkpO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldCBhbmQgcmVtb3ZlIGFuIGF0dHJpYnV0ZSBmcm9tIGEgbm9kZS5cbiAgICpcbiAgICogQHBhcmFtIHtOb2RlfSBub2RlXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBfYXR0clxuICAgKi9cblxuICBmdW5jdGlvbiBnZXRBdHRyKG5vZGUsIF9hdHRyKSB7XG4gICAgdmFyIHZhbCA9IG5vZGUuZ2V0QXR0cmlidXRlKF9hdHRyKTtcbiAgICBpZiAodmFsICE9PSBudWxsKSB7XG4gICAgICBub2RlLnJlbW92ZUF0dHJpYnV0ZShfYXR0cik7XG4gICAgfVxuICAgIHJldHVybiB2YWw7XG4gIH1cblxuICAvKipcbiAgICogR2V0IGFuIGF0dHJpYnV0ZSB3aXRoIGNvbG9uIG9yIHYtYmluZDogcHJlZml4LlxuICAgKlxuICAgKiBAcGFyYW0ge05vZGV9IG5vZGVcbiAgICogQHBhcmFtIHtTdHJpbmd9IG5hbWVcbiAgICogQHJldHVybiB7U3RyaW5nfG51bGx9XG4gICAqL1xuXG4gIGZ1bmN0aW9uIGdldEJpbmRBdHRyKG5vZGUsIG5hbWUpIHtcbiAgICB2YXIgdmFsID0gZ2V0QXR0cihub2RlLCAnOicgKyBuYW1lKTtcbiAgICBpZiAodmFsID09PSBudWxsKSB7XG4gICAgICB2YWwgPSBnZXRBdHRyKG5vZGUsICd2LWJpbmQ6JyArIG5hbWUpO1xuICAgIH1cbiAgICByZXR1cm4gdmFsO1xuICB9XG5cbiAgLyoqXG4gICAqIENoZWNrIHRoZSBwcmVzZW5jZSBvZiBhIGJpbmQgYXR0cmlidXRlLlxuICAgKlxuICAgKiBAcGFyYW0ge05vZGV9IG5vZGVcbiAgICogQHBhcmFtIHtTdHJpbmd9IG5hbWVcbiAgICogQHJldHVybiB7Qm9vbGVhbn1cbiAgICovXG5cbiAgZnVuY3Rpb24gaGFzQmluZEF0dHIobm9kZSwgbmFtZSkge1xuICAgIHJldHVybiBub2RlLmhhc0F0dHJpYnV0ZShuYW1lKSB8fCBub2RlLmhhc0F0dHJpYnV0ZSgnOicgKyBuYW1lKSB8fCBub2RlLmhhc0F0dHJpYnV0ZSgndi1iaW5kOicgKyBuYW1lKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBJbnNlcnQgZWwgYmVmb3JlIHRhcmdldFxuICAgKlxuICAgKiBAcGFyYW0ge0VsZW1lbnR9IGVsXG4gICAqIEBwYXJhbSB7RWxlbWVudH0gdGFyZ2V0XG4gICAqL1xuXG4gIGZ1bmN0aW9uIGJlZm9yZShlbCwgdGFyZ2V0KSB7XG4gICAgdGFyZ2V0LnBhcmVudE5vZGUuaW5zZXJ0QmVmb3JlKGVsLCB0YXJnZXQpO1xuICB9XG5cbiAgLyoqXG4gICAqIEluc2VydCBlbCBhZnRlciB0YXJnZXRcbiAgICpcbiAgICogQHBhcmFtIHtFbGVtZW50fSBlbFxuICAgKiBAcGFyYW0ge0VsZW1lbnR9IHRhcmdldFxuICAgKi9cblxuICBmdW5jdGlvbiBhZnRlcihlbCwgdGFyZ2V0KSB7XG4gICAgaWYgKHRhcmdldC5uZXh0U2libGluZykge1xuICAgICAgYmVmb3JlKGVsLCB0YXJnZXQubmV4dFNpYmxpbmcpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0YXJnZXQucGFyZW50Tm9kZS5hcHBlbmRDaGlsZChlbCk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFJlbW92ZSBlbCBmcm9tIERPTVxuICAgKlxuICAgKiBAcGFyYW0ge0VsZW1lbnR9IGVsXG4gICAqL1xuXG4gIGZ1bmN0aW9uIHJlbW92ZShlbCkge1xuICAgIGVsLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoZWwpO1xuICB9XG5cbiAgLyoqXG4gICAqIFByZXBlbmQgZWwgdG8gdGFyZ2V0XG4gICAqXG4gICAqIEBwYXJhbSB7RWxlbWVudH0gZWxcbiAgICogQHBhcmFtIHtFbGVtZW50fSB0YXJnZXRcbiAgICovXG5cbiAgZnVuY3Rpb24gcHJlcGVuZChlbCwgdGFyZ2V0KSB7XG4gICAgaWYgKHRhcmdldC5maXJzdENoaWxkKSB7XG4gICAgICBiZWZvcmUoZWwsIHRhcmdldC5maXJzdENoaWxkKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGFyZ2V0LmFwcGVuZENoaWxkKGVsKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogUmVwbGFjZSB0YXJnZXQgd2l0aCBlbFxuICAgKlxuICAgKiBAcGFyYW0ge0VsZW1lbnR9IHRhcmdldFxuICAgKiBAcGFyYW0ge0VsZW1lbnR9IGVsXG4gICAqL1xuXG4gIGZ1bmN0aW9uIHJlcGxhY2UodGFyZ2V0LCBlbCkge1xuICAgIHZhciBwYXJlbnQgPSB0YXJnZXQucGFyZW50Tm9kZTtcbiAgICBpZiAocGFyZW50KSB7XG4gICAgICBwYXJlbnQucmVwbGFjZUNoaWxkKGVsLCB0YXJnZXQpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBBZGQgZXZlbnQgbGlzdGVuZXIgc2hvcnRoYW5kLlxuICAgKlxuICAgKiBAcGFyYW0ge0VsZW1lbnR9IGVsXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBldmVudFxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBjYlxuICAgKiBAcGFyYW0ge0Jvb2xlYW59IFt1c2VDYXB0dXJlXVxuICAgKi9cblxuICBmdW5jdGlvbiBvbihlbCwgZXZlbnQsIGNiLCB1c2VDYXB0dXJlKSB7XG4gICAgZWwuYWRkRXZlbnRMaXN0ZW5lcihldmVudCwgY2IsIHVzZUNhcHR1cmUpO1xuICB9XG5cbiAgLyoqXG4gICAqIFJlbW92ZSBldmVudCBsaXN0ZW5lciBzaG9ydGhhbmQuXG4gICAqXG4gICAqIEBwYXJhbSB7RWxlbWVudH0gZWxcbiAgICogQHBhcmFtIHtTdHJpbmd9IGV2ZW50XG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IGNiXG4gICAqL1xuXG4gIGZ1bmN0aW9uIG9mZihlbCwgZXZlbnQsIGNiKSB7XG4gICAgZWwucmVtb3ZlRXZlbnRMaXN0ZW5lcihldmVudCwgY2IpO1xuICB9XG5cbiAgLyoqXG4gICAqIEZvciBJRTkgY29tcGF0OiB3aGVuIGJvdGggY2xhc3MgYW5kIDpjbGFzcyBhcmUgcHJlc2VudFxuICAgKiBnZXRBdHRyaWJ1dGUoJ2NsYXNzJykgcmV0dXJucyB3cm9uZyB2YWx1ZS4uLlxuICAgKlxuICAgKiBAcGFyYW0ge0VsZW1lbnR9IGVsXG4gICAqIEByZXR1cm4ge1N0cmluZ31cbiAgICovXG5cbiAgZnVuY3Rpb24gZ2V0Q2xhc3MoZWwpIHtcbiAgICB2YXIgY2xhc3NuYW1lID0gZWwuY2xhc3NOYW1lO1xuICAgIGlmICh0eXBlb2YgY2xhc3NuYW1lID09PSAnb2JqZWN0Jykge1xuICAgICAgY2xhc3NuYW1lID0gY2xhc3NuYW1lLmJhc2VWYWwgfHwgJyc7XG4gICAgfVxuICAgIHJldHVybiBjbGFzc25hbWU7XG4gIH1cblxuICAvKipcbiAgICogSW4gSUU5LCBzZXRBdHRyaWJ1dGUoJ2NsYXNzJykgd2lsbCByZXN1bHQgaW4gZW1wdHkgY2xhc3NcbiAgICogaWYgdGhlIGVsZW1lbnQgYWxzbyBoYXMgdGhlIDpjbGFzcyBhdHRyaWJ1dGU7IEhvd2V2ZXIgaW5cbiAgICogUGhhbnRvbUpTLCBzZXR0aW5nIGBjbGFzc05hbWVgIGRvZXMgbm90IHdvcmsgb24gU1ZHIGVsZW1lbnRzLi4uXG4gICAqIFNvIHdlIGhhdmUgdG8gZG8gYSBjb25kaXRpb25hbCBjaGVjayBoZXJlLlxuICAgKlxuICAgKiBAcGFyYW0ge0VsZW1lbnR9IGVsXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBjbHNcbiAgICovXG5cbiAgZnVuY3Rpb24gc2V0Q2xhc3MoZWwsIGNscykge1xuICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBpZiAqL1xuICAgIGlmIChpc0lFOSAmJiAhL3N2ZyQvLnRlc3QoZWwubmFtZXNwYWNlVVJJKSkge1xuICAgICAgZWwuY2xhc3NOYW1lID0gY2xzO1xuICAgIH0gZWxzZSB7XG4gICAgICBlbC5zZXRBdHRyaWJ1dGUoJ2NsYXNzJywgY2xzKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQWRkIGNsYXNzIHdpdGggY29tcGF0aWJpbGl0eSBmb3IgSUUgJiBTVkdcbiAgICpcbiAgICogQHBhcmFtIHtFbGVtZW50fSBlbFxuICAgKiBAcGFyYW0ge1N0cmluZ30gY2xzXG4gICAqL1xuXG4gIGZ1bmN0aW9uIGFkZENsYXNzKGVsLCBjbHMpIHtcbiAgICBpZiAoZWwuY2xhc3NMaXN0KSB7XG4gICAgICBlbC5jbGFzc0xpc3QuYWRkKGNscyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHZhciBjdXIgPSAnICcgKyBnZXRDbGFzcyhlbCkgKyAnICc7XG4gICAgICBpZiAoY3VyLmluZGV4T2YoJyAnICsgY2xzICsgJyAnKSA8IDApIHtcbiAgICAgICAgc2V0Q2xhc3MoZWwsIChjdXIgKyBjbHMpLnRyaW0oKSk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFJlbW92ZSBjbGFzcyB3aXRoIGNvbXBhdGliaWxpdHkgZm9yIElFICYgU1ZHXG4gICAqXG4gICAqIEBwYXJhbSB7RWxlbWVudH0gZWxcbiAgICogQHBhcmFtIHtTdHJpbmd9IGNsc1xuICAgKi9cblxuICBmdW5jdGlvbiByZW1vdmVDbGFzcyhlbCwgY2xzKSB7XG4gICAgaWYgKGVsLmNsYXNzTGlzdCkge1xuICAgICAgZWwuY2xhc3NMaXN0LnJlbW92ZShjbHMpO1xuICAgIH0gZWxzZSB7XG4gICAgICB2YXIgY3VyID0gJyAnICsgZ2V0Q2xhc3MoZWwpICsgJyAnO1xuICAgICAgdmFyIHRhciA9ICcgJyArIGNscyArICcgJztcbiAgICAgIHdoaWxlIChjdXIuaW5kZXhPZih0YXIpID49IDApIHtcbiAgICAgICAgY3VyID0gY3VyLnJlcGxhY2UodGFyLCAnICcpO1xuICAgICAgfVxuICAgICAgc2V0Q2xhc3MoZWwsIGN1ci50cmltKCkpO1xuICAgIH1cbiAgICBpZiAoIWVsLmNsYXNzTmFtZSkge1xuICAgICAgZWwucmVtb3ZlQXR0cmlidXRlKCdjbGFzcycpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBFeHRyYWN0IHJhdyBjb250ZW50IGluc2lkZSBhbiBlbGVtZW50IGludG8gYSB0ZW1wb3JhcnlcbiAgICogY29udGFpbmVyIGRpdlxuICAgKlxuICAgKiBAcGFyYW0ge0VsZW1lbnR9IGVsXG4gICAqIEBwYXJhbSB7Qm9vbGVhbn0gYXNGcmFnbWVudFxuICAgKiBAcmV0dXJuIHtFbGVtZW50fERvY3VtZW50RnJhZ21lbnR9XG4gICAqL1xuXG4gIGZ1bmN0aW9uIGV4dHJhY3RDb250ZW50KGVsLCBhc0ZyYWdtZW50KSB7XG4gICAgdmFyIGNoaWxkO1xuICAgIHZhciByYXdDb250ZW50O1xuICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBpZiAqL1xuICAgIGlmIChpc1RlbXBsYXRlKGVsKSAmJiBpc0ZyYWdtZW50KGVsLmNvbnRlbnQpKSB7XG4gICAgICBlbCA9IGVsLmNvbnRlbnQ7XG4gICAgfVxuICAgIGlmIChlbC5oYXNDaGlsZE5vZGVzKCkpIHtcbiAgICAgIHRyaW1Ob2RlKGVsKTtcbiAgICAgIHJhd0NvbnRlbnQgPSBhc0ZyYWdtZW50ID8gZG9jdW1lbnQuY3JlYXRlRG9jdW1lbnRGcmFnbWVudCgpIDogZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAvKiBlc2xpbnQtZGlzYWJsZSBuby1jb25kLWFzc2lnbiAqL1xuICAgICAgd2hpbGUgKGNoaWxkID0gZWwuZmlyc3RDaGlsZCkge1xuICAgICAgICAvKiBlc2xpbnQtZW5hYmxlIG5vLWNvbmQtYXNzaWduICovXG4gICAgICAgIHJhd0NvbnRlbnQuYXBwZW5kQ2hpbGQoY2hpbGQpO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gcmF3Q29udGVudDtcbiAgfVxuXG4gIC8qKlxuICAgKiBUcmltIHBvc3NpYmxlIGVtcHR5IGhlYWQvdGFpbCB0ZXh0IGFuZCBjb21tZW50XG4gICAqIG5vZGVzIGluc2lkZSBhIHBhcmVudC5cbiAgICpcbiAgICogQHBhcmFtIHtOb2RlfSBub2RlXG4gICAqL1xuXG4gIGZ1bmN0aW9uIHRyaW1Ob2RlKG5vZGUpIHtcbiAgICB2YXIgY2hpbGQ7XG4gICAgLyogZXNsaW50LWRpc2FibGUgbm8tc2VxdWVuY2VzICovXG4gICAgd2hpbGUgKChjaGlsZCA9IG5vZGUuZmlyc3RDaGlsZCwgaXNUcmltbWFibGUoY2hpbGQpKSkge1xuICAgICAgbm9kZS5yZW1vdmVDaGlsZChjaGlsZCk7XG4gICAgfVxuICAgIHdoaWxlICgoY2hpbGQgPSBub2RlLmxhc3RDaGlsZCwgaXNUcmltbWFibGUoY2hpbGQpKSkge1xuICAgICAgbm9kZS5yZW1vdmVDaGlsZChjaGlsZCk7XG4gICAgfVxuICAgIC8qIGVzbGludC1lbmFibGUgbm8tc2VxdWVuY2VzICovXG4gIH1cblxuICBmdW5jdGlvbiBpc1RyaW1tYWJsZShub2RlKSB7XG4gICAgcmV0dXJuIG5vZGUgJiYgKG5vZGUubm9kZVR5cGUgPT09IDMgJiYgIW5vZGUuZGF0YS50cmltKCkgfHwgbm9kZS5ub2RlVHlwZSA9PT0gOCk7XG4gIH1cblxuICAvKipcbiAgICogQ2hlY2sgaWYgYW4gZWxlbWVudCBpcyBhIHRlbXBsYXRlIHRhZy5cbiAgICogTm90ZSBpZiB0aGUgdGVtcGxhdGUgYXBwZWFycyBpbnNpZGUgYW4gU1ZHIGl0cyB0YWdOYW1lXG4gICAqIHdpbGwgYmUgaW4gbG93ZXJjYXNlLlxuICAgKlxuICAgKiBAcGFyYW0ge0VsZW1lbnR9IGVsXG4gICAqL1xuXG4gIGZ1bmN0aW9uIGlzVGVtcGxhdGUoZWwpIHtcbiAgICByZXR1cm4gZWwudGFnTmFtZSAmJiBlbC50YWdOYW1lLnRvTG93ZXJDYXNlKCkgPT09ICd0ZW1wbGF0ZSc7XG4gIH1cblxuICAvKipcbiAgICogQ3JlYXRlIGFuIFwiYW5jaG9yXCIgZm9yIHBlcmZvcm1pbmcgZG9tIGluc2VydGlvbi9yZW1vdmFscy5cbiAgICogVGhpcyBpcyB1c2VkIGluIGEgbnVtYmVyIG9mIHNjZW5hcmlvczpcbiAgICogLSBmcmFnbWVudCBpbnN0YW5jZVxuICAgKiAtIHYtaHRtbFxuICAgKiAtIHYtaWZcbiAgICogLSB2LWZvclxuICAgKiAtIGNvbXBvbmVudFxuICAgKlxuICAgKiBAcGFyYW0ge1N0cmluZ30gY29udGVudFxuICAgKiBAcGFyYW0ge0Jvb2xlYW59IHBlcnNpc3QgLSBJRSB0cmFzaGVzIGVtcHR5IHRleHROb2RlcyBvblxuICAgKiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbG9uZU5vZGUodHJ1ZSksIHNvIGluIGNlcnRhaW5cbiAgICogICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZXMgdGhlIGFuY2hvciBuZWVkcyB0byBiZVxuICAgKiAgICAgICAgICAgICAgICAgICAgICAgICAgICBub24tZW1wdHkgdG8gYmUgcGVyc2lzdGVkIGluXG4gICAqICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRlbXBsYXRlcy5cbiAgICogQHJldHVybiB7Q29tbWVudHxUZXh0fVxuICAgKi9cblxuICBmdW5jdGlvbiBjcmVhdGVBbmNob3IoY29udGVudCwgcGVyc2lzdCkge1xuICAgIHZhciBhbmNob3IgPSBjb25maWcuZGVidWcgPyBkb2N1bWVudC5jcmVhdGVDb21tZW50KGNvbnRlbnQpIDogZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUocGVyc2lzdCA/ICcgJyA6ICcnKTtcbiAgICBhbmNob3IuX192X2FuY2hvciA9IHRydWU7XG4gICAgcmV0dXJuIGFuY2hvcjtcbiAgfVxuXG4gIC8qKlxuICAgKiBGaW5kIGEgY29tcG9uZW50IHJlZiBhdHRyaWJ1dGUgdGhhdCBzdGFydHMgd2l0aCAkLlxuICAgKlxuICAgKiBAcGFyYW0ge0VsZW1lbnR9IG5vZGVcbiAgICogQHJldHVybiB7U3RyaW5nfHVuZGVmaW5lZH1cbiAgICovXG5cbiAgdmFyIHJlZlJFID0gL152LXJlZjovO1xuXG4gIGZ1bmN0aW9uIGZpbmRSZWYobm9kZSkge1xuICAgIGlmIChub2RlLmhhc0F0dHJpYnV0ZXMoKSkge1xuICAgICAgdmFyIGF0dHJzID0gbm9kZS5hdHRyaWJ1dGVzO1xuICAgICAgZm9yICh2YXIgaSA9IDAsIGwgPSBhdHRycy5sZW5ndGg7IGkgPCBsOyBpKyspIHtcbiAgICAgICAgdmFyIG5hbWUgPSBhdHRyc1tpXS5uYW1lO1xuICAgICAgICBpZiAocmVmUkUudGVzdChuYW1lKSkge1xuICAgICAgICAgIHJldHVybiBjYW1lbGl6ZShuYW1lLnJlcGxhY2UocmVmUkUsICcnKSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogTWFwIGEgZnVuY3Rpb24gdG8gYSByYW5nZSBvZiBub2RlcyAuXG4gICAqXG4gICAqIEBwYXJhbSB7Tm9kZX0gbm9kZVxuICAgKiBAcGFyYW0ge05vZGV9IGVuZFxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBvcFxuICAgKi9cblxuICBmdW5jdGlvbiBtYXBOb2RlUmFuZ2Uobm9kZSwgZW5kLCBvcCkge1xuICAgIHZhciBuZXh0O1xuICAgIHdoaWxlIChub2RlICE9PSBlbmQpIHtcbiAgICAgIG5leHQgPSBub2RlLm5leHRTaWJsaW5nO1xuICAgICAgb3Aobm9kZSk7XG4gICAgICBub2RlID0gbmV4dDtcbiAgICB9XG4gICAgb3AoZW5kKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZW1vdmUgYSByYW5nZSBvZiBub2RlcyB3aXRoIHRyYW5zaXRpb24sIHN0b3JlXG4gICAqIHRoZSBub2RlcyBpbiBhIGZyYWdtZW50IHdpdGggY29ycmVjdCBvcmRlcmluZyxcbiAgICogYW5kIGNhbGwgY2FsbGJhY2sgd2hlbiBkb25lLlxuICAgKlxuICAgKiBAcGFyYW0ge05vZGV9IHN0YXJ0XG4gICAqIEBwYXJhbSB7Tm9kZX0gZW5kXG4gICAqIEBwYXJhbSB7VnVlfSB2bVxuICAgKiBAcGFyYW0ge0RvY3VtZW50RnJhZ21lbnR9IGZyYWdcbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gY2JcbiAgICovXG5cbiAgZnVuY3Rpb24gcmVtb3ZlTm9kZVJhbmdlKHN0YXJ0LCBlbmQsIHZtLCBmcmFnLCBjYikge1xuICAgIHZhciBkb25lID0gZmFsc2U7XG4gICAgdmFyIHJlbW92ZWQgPSAwO1xuICAgIHZhciBub2RlcyA9IFtdO1xuICAgIG1hcE5vZGVSYW5nZShzdGFydCwgZW5kLCBmdW5jdGlvbiAobm9kZSkge1xuICAgICAgaWYgKG5vZGUgPT09IGVuZCkgZG9uZSA9IHRydWU7XG4gICAgICBub2Rlcy5wdXNoKG5vZGUpO1xuICAgICAgcmVtb3ZlV2l0aFRyYW5zaXRpb24obm9kZSwgdm0sIG9uUmVtb3ZlZCk7XG4gICAgfSk7XG4gICAgZnVuY3Rpb24gb25SZW1vdmVkKCkge1xuICAgICAgcmVtb3ZlZCsrO1xuICAgICAgaWYgKGRvbmUgJiYgcmVtb3ZlZCA+PSBub2Rlcy5sZW5ndGgpIHtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBub2Rlcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgIGZyYWcuYXBwZW5kQ2hpbGQobm9kZXNbaV0pO1xuICAgICAgICB9XG4gICAgICAgIGNiICYmIGNiKCk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIENoZWNrIGlmIGEgbm9kZSBpcyBhIERvY3VtZW50RnJhZ21lbnQuXG4gICAqXG4gICAqIEBwYXJhbSB7Tm9kZX0gbm9kZVxuICAgKiBAcmV0dXJuIHtCb29sZWFufVxuICAgKi9cblxuICBmdW5jdGlvbiBpc0ZyYWdtZW50KG5vZGUpIHtcbiAgICByZXR1cm4gbm9kZSAmJiBub2RlLm5vZGVUeXBlID09PSAxMTtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgb3V0ZXJIVE1MIG9mIGVsZW1lbnRzLCB0YWtpbmcgY2FyZVxuICAgKiBvZiBTVkcgZWxlbWVudHMgaW4gSUUgYXMgd2VsbC5cbiAgICpcbiAgICogQHBhcmFtIHtFbGVtZW50fSBlbFxuICAgKiBAcmV0dXJuIHtTdHJpbmd9XG4gICAqL1xuXG4gIGZ1bmN0aW9uIGdldE91dGVySFRNTChlbCkge1xuICAgIGlmIChlbC5vdXRlckhUTUwpIHtcbiAgICAgIHJldHVybiBlbC5vdXRlckhUTUw7XG4gICAgfSBlbHNlIHtcbiAgICAgIHZhciBjb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgIGNvbnRhaW5lci5hcHBlbmRDaGlsZChlbC5jbG9uZU5vZGUodHJ1ZSkpO1xuICAgICAgcmV0dXJuIGNvbnRhaW5lci5pbm5lckhUTUw7XG4gICAgfVxuICB9XG5cbiAgdmFyIGNvbW1vblRhZ1JFID0gL14oZGl2fHB8c3BhbnxpbWd8YXxifGl8YnJ8dWx8b2x8bGl8aDF8aDJ8aDN8aDR8aDV8aDZ8Y29kZXxwcmV8dGFibGV8dGh8dGR8dHJ8Zm9ybXxsYWJlbHxpbnB1dHxzZWxlY3R8b3B0aW9ufG5hdnxhcnRpY2xlfHNlY3Rpb258aGVhZGVyfGZvb3RlcikkL2k7XG4gIHZhciByZXNlcnZlZFRhZ1JFID0gL14oc2xvdHxwYXJ0aWFsfGNvbXBvbmVudCkkL2k7XG5cbiAgdmFyIGlzVW5rbm93bkVsZW1lbnQgPSB1bmRlZmluZWQ7XG4gIGlmICgnZGV2ZWxvcG1lbnQnICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICBpc1Vua25vd25FbGVtZW50ID0gZnVuY3Rpb24gKGVsLCB0YWcpIHtcbiAgICAgIGlmICh0YWcuaW5kZXhPZignLScpID4gLTEpIHtcbiAgICAgICAgLy8gaHR0cDovL3N0YWNrb3ZlcmZsb3cuY29tL2EvMjgyMTAzNjQvMTA3MDI0NFxuICAgICAgICByZXR1cm4gZWwuY29uc3RydWN0b3IgPT09IHdpbmRvdy5IVE1MVW5rbm93bkVsZW1lbnQgfHwgZWwuY29uc3RydWN0b3IgPT09IHdpbmRvdy5IVE1MRWxlbWVudDtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiAoL0hUTUxVbmtub3duRWxlbWVudC8udGVzdChlbC50b1N0cmluZygpKSAmJlxuICAgICAgICAgIC8vIENocm9tZSByZXR1cm5zIHVua25vd24gZm9yIHNldmVyYWwgSFRNTDUgZWxlbWVudHMuXG4gICAgICAgICAgLy8gaHR0cHM6Ly9jb2RlLmdvb2dsZS5jb20vcC9jaHJvbWl1bS9pc3N1ZXMvZGV0YWlsP2lkPTU0MDUyNlxuICAgICAgICAgICEvXihkYXRhfHRpbWV8cnRjfHJiKSQvLnRlc3QodGFnKVxuICAgICAgICApO1xuICAgICAgfVxuICAgIH07XG4gIH1cblxuICAvKipcbiAgICogQ2hlY2sgaWYgYW4gZWxlbWVudCBpcyBhIGNvbXBvbmVudCwgaWYgeWVzIHJldHVybiBpdHNcbiAgICogY29tcG9uZW50IGlkLlxuICAgKlxuICAgKiBAcGFyYW0ge0VsZW1lbnR9IGVsXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zXG4gICAqIEByZXR1cm4ge09iamVjdHx1bmRlZmluZWR9XG4gICAqL1xuXG4gIGZ1bmN0aW9uIGNoZWNrQ29tcG9uZW50QXR0cihlbCwgb3B0aW9ucykge1xuICAgIHZhciB0YWcgPSBlbC50YWdOYW1lLnRvTG93ZXJDYXNlKCk7XG4gICAgdmFyIGhhc0F0dHJzID0gZWwuaGFzQXR0cmlidXRlcygpO1xuICAgIGlmICghY29tbW9uVGFnUkUudGVzdCh0YWcpICYmICFyZXNlcnZlZFRhZ1JFLnRlc3QodGFnKSkge1xuICAgICAgaWYgKHJlc29sdmVBc3NldChvcHRpb25zLCAnY29tcG9uZW50cycsIHRhZykpIHtcbiAgICAgICAgcmV0dXJuIHsgaWQ6IHRhZyB9O1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdmFyIGlzID0gaGFzQXR0cnMgJiYgZ2V0SXNCaW5kaW5nKGVsLCBvcHRpb25zKTtcbiAgICAgICAgaWYgKGlzKSB7XG4gICAgICAgICAgcmV0dXJuIGlzO1xuICAgICAgICB9IGVsc2UgaWYgKCdkZXZlbG9wbWVudCcgIT09ICdwcm9kdWN0aW9uJykge1xuICAgICAgICAgIHZhciBleHBlY3RlZFRhZyA9IG9wdGlvbnMuX2NvbXBvbmVudE5hbWVNYXAgJiYgb3B0aW9ucy5fY29tcG9uZW50TmFtZU1hcFt0YWddO1xuICAgICAgICAgIGlmIChleHBlY3RlZFRhZykge1xuICAgICAgICAgICAgd2FybignVW5rbm93biBjdXN0b20gZWxlbWVudDogPCcgKyB0YWcgKyAnPiAtICcgKyAnZGlkIHlvdSBtZWFuIDwnICsgZXhwZWN0ZWRUYWcgKyAnPj8gJyArICdIVE1MIGlzIGNhc2UtaW5zZW5zaXRpdmUsIHJlbWVtYmVyIHRvIHVzZSBrZWJhYi1jYXNlIGluIHRlbXBsYXRlcy4nKTtcbiAgICAgICAgICB9IGVsc2UgaWYgKGlzVW5rbm93bkVsZW1lbnQoZWwsIHRhZykpIHtcbiAgICAgICAgICAgIHdhcm4oJ1Vua25vd24gY3VzdG9tIGVsZW1lbnQ6IDwnICsgdGFnICsgJz4gLSBkaWQgeW91ICcgKyAncmVnaXN0ZXIgdGhlIGNvbXBvbmVudCBjb3JyZWN0bHk/IEZvciByZWN1cnNpdmUgY29tcG9uZW50cywgJyArICdtYWtlIHN1cmUgdG8gcHJvdmlkZSB0aGUgXCJuYW1lXCIgb3B0aW9uLicpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0gZWxzZSBpZiAoaGFzQXR0cnMpIHtcbiAgICAgIHJldHVybiBnZXRJc0JpbmRpbmcoZWwsIG9wdGlvbnMpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgXCJpc1wiIGJpbmRpbmcgZnJvbSBhbiBlbGVtZW50LlxuICAgKlxuICAgKiBAcGFyYW0ge0VsZW1lbnR9IGVsXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zXG4gICAqIEByZXR1cm4ge09iamVjdHx1bmRlZmluZWR9XG4gICAqL1xuXG4gIGZ1bmN0aW9uIGdldElzQmluZGluZyhlbCwgb3B0aW9ucykge1xuICAgIC8vIGR5bmFtaWMgc3ludGF4XG4gICAgdmFyIGV4cCA9IGVsLmdldEF0dHJpYnV0ZSgnaXMnKTtcbiAgICBpZiAoZXhwICE9IG51bGwpIHtcbiAgICAgIGlmIChyZXNvbHZlQXNzZXQob3B0aW9ucywgJ2NvbXBvbmVudHMnLCBleHApKSB7XG4gICAgICAgIGVsLnJlbW92ZUF0dHJpYnV0ZSgnaXMnKTtcbiAgICAgICAgcmV0dXJuIHsgaWQ6IGV4cCB9O1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBleHAgPSBnZXRCaW5kQXR0cihlbCwgJ2lzJyk7XG4gICAgICBpZiAoZXhwICE9IG51bGwpIHtcbiAgICAgICAgcmV0dXJuIHsgaWQ6IGV4cCwgZHluYW1pYzogdHJ1ZSB9O1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBPcHRpb24gb3ZlcndyaXRpbmcgc3RyYXRlZ2llcyBhcmUgZnVuY3Rpb25zIHRoYXQgaGFuZGxlXG4gICAqIGhvdyB0byBtZXJnZSBhIHBhcmVudCBvcHRpb24gdmFsdWUgYW5kIGEgY2hpbGQgb3B0aW9uXG4gICAqIHZhbHVlIGludG8gdGhlIGZpbmFsIHZhbHVlLlxuICAgKlxuICAgKiBBbGwgc3RyYXRlZ3kgZnVuY3Rpb25zIGZvbGxvdyB0aGUgc2FtZSBzaWduYXR1cmU6XG4gICAqXG4gICAqIEBwYXJhbSB7Kn0gcGFyZW50VmFsXG4gICAqIEBwYXJhbSB7Kn0gY2hpbGRWYWxcbiAgICogQHBhcmFtIHtWdWV9IFt2bV1cbiAgICovXG5cbiAgdmFyIHN0cmF0cyA9IGNvbmZpZy5vcHRpb25NZXJnZVN0cmF0ZWdpZXMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuXG4gIC8qKlxuICAgKiBIZWxwZXIgdGhhdCByZWN1cnNpdmVseSBtZXJnZXMgdHdvIGRhdGEgb2JqZWN0cyB0b2dldGhlci5cbiAgICovXG5cbiAgZnVuY3Rpb24gbWVyZ2VEYXRhKHRvLCBmcm9tKSB7XG4gICAgdmFyIGtleSwgdG9WYWwsIGZyb21WYWw7XG4gICAgZm9yIChrZXkgaW4gZnJvbSkge1xuICAgICAgdG9WYWwgPSB0b1trZXldO1xuICAgICAgZnJvbVZhbCA9IGZyb21ba2V5XTtcbiAgICAgIGlmICghaGFzT3duKHRvLCBrZXkpKSB7XG4gICAgICAgIHNldCh0bywga2V5LCBmcm9tVmFsKTtcbiAgICAgIH0gZWxzZSBpZiAoaXNPYmplY3QodG9WYWwpICYmIGlzT2JqZWN0KGZyb21WYWwpKSB7XG4gICAgICAgIG1lcmdlRGF0YSh0b1ZhbCwgZnJvbVZhbCk7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiB0bztcbiAgfVxuXG4gIC8qKlxuICAgKiBEYXRhXG4gICAqL1xuXG4gIHN0cmF0cy5kYXRhID0gZnVuY3Rpb24gKHBhcmVudFZhbCwgY2hpbGRWYWwsIHZtKSB7XG4gICAgaWYgKCF2bSkge1xuICAgICAgLy8gaW4gYSBWdWUuZXh0ZW5kIG1lcmdlLCBib3RoIHNob3VsZCBiZSBmdW5jdGlvbnNcbiAgICAgIGlmICghY2hpbGRWYWwpIHtcbiAgICAgICAgcmV0dXJuIHBhcmVudFZhbDtcbiAgICAgIH1cbiAgICAgIGlmICh0eXBlb2YgY2hpbGRWYWwgIT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgJ2RldmVsb3BtZW50JyAhPT0gJ3Byb2R1Y3Rpb24nICYmIHdhcm4oJ1RoZSBcImRhdGFcIiBvcHRpb24gc2hvdWxkIGJlIGEgZnVuY3Rpb24gJyArICd0aGF0IHJldHVybnMgYSBwZXItaW5zdGFuY2UgdmFsdWUgaW4gY29tcG9uZW50ICcgKyAnZGVmaW5pdGlvbnMuJywgdm0pO1xuICAgICAgICByZXR1cm4gcGFyZW50VmFsO1xuICAgICAgfVxuICAgICAgaWYgKCFwYXJlbnRWYWwpIHtcbiAgICAgICAgcmV0dXJuIGNoaWxkVmFsO1xuICAgICAgfVxuICAgICAgLy8gd2hlbiBwYXJlbnRWYWwgJiBjaGlsZFZhbCBhcmUgYm90aCBwcmVzZW50LFxuICAgICAgLy8gd2UgbmVlZCB0byByZXR1cm4gYSBmdW5jdGlvbiB0aGF0IHJldHVybnMgdGhlXG4gICAgICAvLyBtZXJnZWQgcmVzdWx0IG9mIGJvdGggZnVuY3Rpb25zLi4uIG5vIG5lZWQgdG9cbiAgICAgIC8vIGNoZWNrIGlmIHBhcmVudFZhbCBpcyBhIGZ1bmN0aW9uIGhlcmUgYmVjYXVzZVxuICAgICAgLy8gaXQgaGFzIHRvIGJlIGEgZnVuY3Rpb24gdG8gcGFzcyBwcmV2aW91cyBtZXJnZXMuXG4gICAgICByZXR1cm4gZnVuY3Rpb24gbWVyZ2VkRGF0YUZuKCkge1xuICAgICAgICByZXR1cm4gbWVyZ2VEYXRhKGNoaWxkVmFsLmNhbGwodGhpcyksIHBhcmVudFZhbC5jYWxsKHRoaXMpKTtcbiAgICAgIH07XG4gICAgfSBlbHNlIGlmIChwYXJlbnRWYWwgfHwgY2hpbGRWYWwpIHtcbiAgICAgIHJldHVybiBmdW5jdGlvbiBtZXJnZWRJbnN0YW5jZURhdGFGbigpIHtcbiAgICAgICAgLy8gaW5zdGFuY2UgbWVyZ2VcbiAgICAgICAgdmFyIGluc3RhbmNlRGF0YSA9IHR5cGVvZiBjaGlsZFZhbCA9PT0gJ2Z1bmN0aW9uJyA/IGNoaWxkVmFsLmNhbGwodm0pIDogY2hpbGRWYWw7XG4gICAgICAgIHZhciBkZWZhdWx0RGF0YSA9IHR5cGVvZiBwYXJlbnRWYWwgPT09ICdmdW5jdGlvbicgPyBwYXJlbnRWYWwuY2FsbCh2bSkgOiB1bmRlZmluZWQ7XG4gICAgICAgIGlmIChpbnN0YW5jZURhdGEpIHtcbiAgICAgICAgICByZXR1cm4gbWVyZ2VEYXRhKGluc3RhbmNlRGF0YSwgZGVmYXVsdERhdGEpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJldHVybiBkZWZhdWx0RGF0YTtcbiAgICAgICAgfVxuICAgICAgfTtcbiAgICB9XG4gIH07XG5cbiAgLyoqXG4gICAqIEVsXG4gICAqL1xuXG4gIHN0cmF0cy5lbCA9IGZ1bmN0aW9uIChwYXJlbnRWYWwsIGNoaWxkVmFsLCB2bSkge1xuICAgIGlmICghdm0gJiYgY2hpbGRWYWwgJiYgdHlwZW9mIGNoaWxkVmFsICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgICAnZGV2ZWxvcG1lbnQnICE9PSAncHJvZHVjdGlvbicgJiYgd2FybignVGhlIFwiZWxcIiBvcHRpb24gc2hvdWxkIGJlIGEgZnVuY3Rpb24gJyArICd0aGF0IHJldHVybnMgYSBwZXItaW5zdGFuY2UgdmFsdWUgaW4gY29tcG9uZW50ICcgKyAnZGVmaW5pdGlvbnMuJywgdm0pO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB2YXIgcmV0ID0gY2hpbGRWYWwgfHwgcGFyZW50VmFsO1xuICAgIC8vIGludm9rZSB0aGUgZWxlbWVudCBmYWN0b3J5IGlmIHRoaXMgaXMgaW5zdGFuY2UgbWVyZ2VcbiAgICByZXR1cm4gdm0gJiYgdHlwZW9mIHJldCA9PT0gJ2Z1bmN0aW9uJyA/IHJldC5jYWxsKHZtKSA6IHJldDtcbiAgfTtcblxuICAvKipcbiAgICogSG9va3MgYW5kIHBhcmFtIGF0dHJpYnV0ZXMgYXJlIG1lcmdlZCBhcyBhcnJheXMuXG4gICAqL1xuXG4gIHN0cmF0cy5pbml0ID0gc3RyYXRzLmNyZWF0ZWQgPSBzdHJhdHMucmVhZHkgPSBzdHJhdHMuYXR0YWNoZWQgPSBzdHJhdHMuZGV0YWNoZWQgPSBzdHJhdHMuYmVmb3JlQ29tcGlsZSA9IHN0cmF0cy5jb21waWxlZCA9IHN0cmF0cy5iZWZvcmVEZXN0cm95ID0gc3RyYXRzLmRlc3Ryb3llZCA9IHN0cmF0cy5hY3RpdmF0ZSA9IGZ1bmN0aW9uIChwYXJlbnRWYWwsIGNoaWxkVmFsKSB7XG4gICAgcmV0dXJuIGNoaWxkVmFsID8gcGFyZW50VmFsID8gcGFyZW50VmFsLmNvbmNhdChjaGlsZFZhbCkgOiBpc0FycmF5KGNoaWxkVmFsKSA/IGNoaWxkVmFsIDogW2NoaWxkVmFsXSA6IHBhcmVudFZhbDtcbiAgfTtcblxuICAvKipcbiAgICogQXNzZXRzXG4gICAqXG4gICAqIFdoZW4gYSB2bSBpcyBwcmVzZW50IChpbnN0YW5jZSBjcmVhdGlvbiksIHdlIG5lZWQgdG8gZG9cbiAgICogYSB0aHJlZS13YXkgbWVyZ2UgYmV0d2VlbiBjb25zdHJ1Y3RvciBvcHRpb25zLCBpbnN0YW5jZVxuICAgKiBvcHRpb25zIGFuZCBwYXJlbnQgb3B0aW9ucy5cbiAgICovXG5cbiAgZnVuY3Rpb24gbWVyZ2VBc3NldHMocGFyZW50VmFsLCBjaGlsZFZhbCkge1xuICAgIHZhciByZXMgPSBPYmplY3QuY3JlYXRlKHBhcmVudFZhbCB8fCBudWxsKTtcbiAgICByZXR1cm4gY2hpbGRWYWwgPyBleHRlbmQocmVzLCBndWFyZEFycmF5QXNzZXRzKGNoaWxkVmFsKSkgOiByZXM7XG4gIH1cblxuICBjb25maWcuX2Fzc2V0VHlwZXMuZm9yRWFjaChmdW5jdGlvbiAodHlwZSkge1xuICAgIHN0cmF0c1t0eXBlICsgJ3MnXSA9IG1lcmdlQXNzZXRzO1xuICB9KTtcblxuICAvKipcbiAgICogRXZlbnRzICYgV2F0Y2hlcnMuXG4gICAqXG4gICAqIEV2ZW50cyAmIHdhdGNoZXJzIGhhc2hlcyBzaG91bGQgbm90IG92ZXJ3cml0ZSBvbmVcbiAgICogYW5vdGhlciwgc28gd2UgbWVyZ2UgdGhlbSBhcyBhcnJheXMuXG4gICAqL1xuXG4gIHN0cmF0cy53YXRjaCA9IHN0cmF0cy5ldmVudHMgPSBmdW5jdGlvbiAocGFyZW50VmFsLCBjaGlsZFZhbCkge1xuICAgIGlmICghY2hpbGRWYWwpIHJldHVybiBwYXJlbnRWYWw7XG4gICAgaWYgKCFwYXJlbnRWYWwpIHJldHVybiBjaGlsZFZhbDtcbiAgICB2YXIgcmV0ID0ge307XG4gICAgZXh0ZW5kKHJldCwgcGFyZW50VmFsKTtcbiAgICBmb3IgKHZhciBrZXkgaW4gY2hpbGRWYWwpIHtcbiAgICAgIHZhciBwYXJlbnQgPSByZXRba2V5XTtcbiAgICAgIHZhciBjaGlsZCA9IGNoaWxkVmFsW2tleV07XG4gICAgICBpZiAocGFyZW50ICYmICFpc0FycmF5KHBhcmVudCkpIHtcbiAgICAgICAgcGFyZW50ID0gW3BhcmVudF07XG4gICAgICB9XG4gICAgICByZXRba2V5XSA9IHBhcmVudCA/IHBhcmVudC5jb25jYXQoY2hpbGQpIDogW2NoaWxkXTtcbiAgICB9XG4gICAgcmV0dXJuIHJldDtcbiAgfTtcblxuICAvKipcbiAgICogT3RoZXIgb2JqZWN0IGhhc2hlcy5cbiAgICovXG5cbiAgc3RyYXRzLnByb3BzID0gc3RyYXRzLm1ldGhvZHMgPSBzdHJhdHMuY29tcHV0ZWQgPSBmdW5jdGlvbiAocGFyZW50VmFsLCBjaGlsZFZhbCkge1xuICAgIGlmICghY2hpbGRWYWwpIHJldHVybiBwYXJlbnRWYWw7XG4gICAgaWYgKCFwYXJlbnRWYWwpIHJldHVybiBjaGlsZFZhbDtcbiAgICB2YXIgcmV0ID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiAgICBleHRlbmQocmV0LCBwYXJlbnRWYWwpO1xuICAgIGV4dGVuZChyZXQsIGNoaWxkVmFsKTtcbiAgICByZXR1cm4gcmV0O1xuICB9O1xuXG4gIC8qKlxuICAgKiBEZWZhdWx0IHN0cmF0ZWd5LlxuICAgKi9cblxuICB2YXIgZGVmYXVsdFN0cmF0ID0gZnVuY3Rpb24gZGVmYXVsdFN0cmF0KHBhcmVudFZhbCwgY2hpbGRWYWwpIHtcbiAgICByZXR1cm4gY2hpbGRWYWwgPT09IHVuZGVmaW5lZCA/IHBhcmVudFZhbCA6IGNoaWxkVmFsO1xuICB9O1xuXG4gIC8qKlxuICAgKiBNYWtlIHN1cmUgY29tcG9uZW50IG9wdGlvbnMgZ2V0IGNvbnZlcnRlZCB0byBhY3R1YWxcbiAgICogY29uc3RydWN0b3JzLlxuICAgKlxuICAgKiBAcGFyYW0ge09iamVjdH0gb3B0aW9uc1xuICAgKi9cblxuICBmdW5jdGlvbiBndWFyZENvbXBvbmVudHMob3B0aW9ucykge1xuICAgIGlmIChvcHRpb25zLmNvbXBvbmVudHMpIHtcbiAgICAgIHZhciBjb21wb25lbnRzID0gb3B0aW9ucy5jb21wb25lbnRzID0gZ3VhcmRBcnJheUFzc2V0cyhvcHRpb25zLmNvbXBvbmVudHMpO1xuICAgICAgdmFyIGlkcyA9IE9iamVjdC5rZXlzKGNvbXBvbmVudHMpO1xuICAgICAgdmFyIGRlZjtcbiAgICAgIGlmICgnZGV2ZWxvcG1lbnQnICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICAgICAgdmFyIG1hcCA9IG9wdGlvbnMuX2NvbXBvbmVudE5hbWVNYXAgPSB7fTtcbiAgICAgIH1cbiAgICAgIGZvciAodmFyIGkgPSAwLCBsID0gaWRzLmxlbmd0aDsgaSA8IGw7IGkrKykge1xuICAgICAgICB2YXIga2V5ID0gaWRzW2ldO1xuICAgICAgICBpZiAoY29tbW9uVGFnUkUudGVzdChrZXkpIHx8IHJlc2VydmVkVGFnUkUudGVzdChrZXkpKSB7XG4gICAgICAgICAgJ2RldmVsb3BtZW50JyAhPT0gJ3Byb2R1Y3Rpb24nICYmIHdhcm4oJ0RvIG5vdCB1c2UgYnVpbHQtaW4gb3IgcmVzZXJ2ZWQgSFRNTCBlbGVtZW50cyBhcyBjb21wb25lbnQgJyArICdpZDogJyArIGtleSk7XG4gICAgICAgICAgY29udGludWU7XG4gICAgICAgIH1cbiAgICAgICAgLy8gcmVjb3JkIGEgYWxsIGxvd2VyY2FzZSA8LT4ga2ViYWItY2FzZSBtYXBwaW5nIGZvclxuICAgICAgICAvLyBwb3NzaWJsZSBjdXN0b20gZWxlbWVudCBjYXNlIGVycm9yIHdhcm5pbmdcbiAgICAgICAgaWYgKCdkZXZlbG9wbWVudCcgIT09ICdwcm9kdWN0aW9uJykge1xuICAgICAgICAgIG1hcFtrZXkucmVwbGFjZSgvLS9nLCAnJykudG9Mb3dlckNhc2UoKV0gPSBoeXBoZW5hdGUoa2V5KTtcbiAgICAgICAgfVxuICAgICAgICBkZWYgPSBjb21wb25lbnRzW2tleV07XG4gICAgICAgIGlmIChpc1BsYWluT2JqZWN0KGRlZikpIHtcbiAgICAgICAgICBjb21wb25lbnRzW2tleV0gPSBWdWUuZXh0ZW5kKGRlZik7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogRW5zdXJlIGFsbCBwcm9wcyBvcHRpb24gc3ludGF4IGFyZSBub3JtYWxpemVkIGludG8gdGhlXG4gICAqIE9iamVjdC1iYXNlZCBmb3JtYXQuXG4gICAqXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zXG4gICAqL1xuXG4gIGZ1bmN0aW9uIGd1YXJkUHJvcHMob3B0aW9ucykge1xuICAgIHZhciBwcm9wcyA9IG9wdGlvbnMucHJvcHM7XG4gICAgdmFyIGksIHZhbDtcbiAgICBpZiAoaXNBcnJheShwcm9wcykpIHtcbiAgICAgIG9wdGlvbnMucHJvcHMgPSB7fTtcbiAgICAgIGkgPSBwcm9wcy5sZW5ndGg7XG4gICAgICB3aGlsZSAoaS0tKSB7XG4gICAgICAgIHZhbCA9IHByb3BzW2ldO1xuICAgICAgICBpZiAodHlwZW9mIHZhbCA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICBvcHRpb25zLnByb3BzW3ZhbF0gPSBudWxsO1xuICAgICAgICB9IGVsc2UgaWYgKHZhbC5uYW1lKSB7XG4gICAgICAgICAgb3B0aW9ucy5wcm9wc1t2YWwubmFtZV0gPSB2YWw7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKGlzUGxhaW5PYmplY3QocHJvcHMpKSB7XG4gICAgICB2YXIga2V5cyA9IE9iamVjdC5rZXlzKHByb3BzKTtcbiAgICAgIGkgPSBrZXlzLmxlbmd0aDtcbiAgICAgIHdoaWxlIChpLS0pIHtcbiAgICAgICAgdmFsID0gcHJvcHNba2V5c1tpXV07XG4gICAgICAgIGlmICh0eXBlb2YgdmFsID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgcHJvcHNba2V5c1tpXV0gPSB7IHR5cGU6IHZhbCB9O1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEd1YXJkIGFuIEFycmF5LWZvcm1hdCBhc3NldHMgb3B0aW9uIGFuZCBjb252ZXJ0ZWQgaXRcbiAgICogaW50byB0aGUga2V5LXZhbHVlIE9iamVjdCBmb3JtYXQuXG4gICAqXG4gICAqIEBwYXJhbSB7T2JqZWN0fEFycmF5fSBhc3NldHNcbiAgICogQHJldHVybiB7T2JqZWN0fVxuICAgKi9cblxuICBmdW5jdGlvbiBndWFyZEFycmF5QXNzZXRzKGFzc2V0cykge1xuICAgIGlmIChpc0FycmF5KGFzc2V0cykpIHtcbiAgICAgIHZhciByZXMgPSB7fTtcbiAgICAgIHZhciBpID0gYXNzZXRzLmxlbmd0aDtcbiAgICAgIHZhciBhc3NldDtcbiAgICAgIHdoaWxlIChpLS0pIHtcbiAgICAgICAgYXNzZXQgPSBhc3NldHNbaV07XG4gICAgICAgIHZhciBpZCA9IHR5cGVvZiBhc3NldCA9PT0gJ2Z1bmN0aW9uJyA/IGFzc2V0Lm9wdGlvbnMgJiYgYXNzZXQub3B0aW9ucy5uYW1lIHx8IGFzc2V0LmlkIDogYXNzZXQubmFtZSB8fCBhc3NldC5pZDtcbiAgICAgICAgaWYgKCFpZCkge1xuICAgICAgICAgICdkZXZlbG9wbWVudCcgIT09ICdwcm9kdWN0aW9uJyAmJiB3YXJuKCdBcnJheS1zeW50YXggYXNzZXRzIG11c3QgcHJvdmlkZSBhIFwibmFtZVwiIG9yIFwiaWRcIiBmaWVsZC4nKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXNbaWRdID0gYXNzZXQ7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiByZXM7XG4gICAgfVxuICAgIHJldHVybiBhc3NldHM7XG4gIH1cblxuICAvKipcbiAgICogTWVyZ2UgdHdvIG9wdGlvbiBvYmplY3RzIGludG8gYSBuZXcgb25lLlxuICAgKiBDb3JlIHV0aWxpdHkgdXNlZCBpbiBib3RoIGluc3RhbnRpYXRpb24gYW5kIGluaGVyaXRhbmNlLlxuICAgKlxuICAgKiBAcGFyYW0ge09iamVjdH0gcGFyZW50XG4gICAqIEBwYXJhbSB7T2JqZWN0fSBjaGlsZFxuICAgKiBAcGFyYW0ge1Z1ZX0gW3ZtXSAtIGlmIHZtIGlzIHByZXNlbnQsIGluZGljYXRlcyB0aGlzIGlzXG4gICAqICAgICAgICAgICAgICAgICAgICAgYW4gaW5zdGFudGlhdGlvbiBtZXJnZS5cbiAgICovXG5cbiAgZnVuY3Rpb24gbWVyZ2VPcHRpb25zKHBhcmVudCwgY2hpbGQsIHZtKSB7XG4gICAgZ3VhcmRDb21wb25lbnRzKGNoaWxkKTtcbiAgICBndWFyZFByb3BzKGNoaWxkKTtcbiAgICBpZiAoJ2RldmVsb3BtZW50JyAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgICBpZiAoY2hpbGQucHJvcHNEYXRhICYmICF2bSkge1xuICAgICAgICB3YXJuKCdwcm9wc0RhdGEgY2FuIG9ubHkgYmUgdXNlZCBhcyBhbiBpbnN0YW50aWF0aW9uIG9wdGlvbi4nKTtcbiAgICAgIH1cbiAgICB9XG4gICAgdmFyIG9wdGlvbnMgPSB7fTtcbiAgICB2YXIga2V5O1xuICAgIGlmIChjaGlsZFsnZXh0ZW5kcyddKSB7XG4gICAgICBwYXJlbnQgPSB0eXBlb2YgY2hpbGRbJ2V4dGVuZHMnXSA9PT0gJ2Z1bmN0aW9uJyA/IG1lcmdlT3B0aW9ucyhwYXJlbnQsIGNoaWxkWydleHRlbmRzJ10ub3B0aW9ucywgdm0pIDogbWVyZ2VPcHRpb25zKHBhcmVudCwgY2hpbGRbJ2V4dGVuZHMnXSwgdm0pO1xuICAgIH1cbiAgICBpZiAoY2hpbGQubWl4aW5zKSB7XG4gICAgICBmb3IgKHZhciBpID0gMCwgbCA9IGNoaWxkLm1peGlucy5sZW5ndGg7IGkgPCBsOyBpKyspIHtcbiAgICAgICAgcGFyZW50ID0gbWVyZ2VPcHRpb25zKHBhcmVudCwgY2hpbGQubWl4aW5zW2ldLCB2bSk7XG4gICAgICB9XG4gICAgfVxuICAgIGZvciAoa2V5IGluIHBhcmVudCkge1xuICAgICAgbWVyZ2VGaWVsZChrZXkpO1xuICAgIH1cbiAgICBmb3IgKGtleSBpbiBjaGlsZCkge1xuICAgICAgaWYgKCFoYXNPd24ocGFyZW50LCBrZXkpKSB7XG4gICAgICAgIG1lcmdlRmllbGQoa2V5KTtcbiAgICAgIH1cbiAgICB9XG4gICAgZnVuY3Rpb24gbWVyZ2VGaWVsZChrZXkpIHtcbiAgICAgIHZhciBzdHJhdCA9IHN0cmF0c1trZXldIHx8IGRlZmF1bHRTdHJhdDtcbiAgICAgIG9wdGlvbnNba2V5XSA9IHN0cmF0KHBhcmVudFtrZXldLCBjaGlsZFtrZXldLCB2bSwga2V5KTtcbiAgICB9XG4gICAgcmV0dXJuIG9wdGlvbnM7XG4gIH1cblxuICAvKipcbiAgICogUmVzb2x2ZSBhbiBhc3NldC5cbiAgICogVGhpcyBmdW5jdGlvbiBpcyB1c2VkIGJlY2F1c2UgY2hpbGQgaW5zdGFuY2VzIG5lZWQgYWNjZXNzXG4gICAqIHRvIGFzc2V0cyBkZWZpbmVkIGluIGl0cyBhbmNlc3RvciBjaGFpbi5cbiAgICpcbiAgICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnNcbiAgICogQHBhcmFtIHtTdHJpbmd9IHR5cGVcbiAgICogQHBhcmFtIHtTdHJpbmd9IGlkXG4gICAqIEBwYXJhbSB7Qm9vbGVhbn0gd2Fybk1pc3NpbmdcbiAgICogQHJldHVybiB7T2JqZWN0fEZ1bmN0aW9ufVxuICAgKi9cblxuICBmdW5jdGlvbiByZXNvbHZlQXNzZXQob3B0aW9ucywgdHlwZSwgaWQsIHdhcm5NaXNzaW5nKSB7XG4gICAgLyogaXN0YW5idWwgaWdub3JlIGlmICovXG4gICAgaWYgKHR5cGVvZiBpZCAhPT0gJ3N0cmluZycpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdmFyIGFzc2V0cyA9IG9wdGlvbnNbdHlwZV07XG4gICAgdmFyIGNhbWVsaXplZElkO1xuICAgIHZhciByZXMgPSBhc3NldHNbaWRdIHx8XG4gICAgLy8gY2FtZWxDYXNlIElEXG4gICAgYXNzZXRzW2NhbWVsaXplZElkID0gY2FtZWxpemUoaWQpXSB8fFxuICAgIC8vIFBhc2NhbCBDYXNlIElEXG4gICAgYXNzZXRzW2NhbWVsaXplZElkLmNoYXJBdCgwKS50b1VwcGVyQ2FzZSgpICsgY2FtZWxpemVkSWQuc2xpY2UoMSldO1xuICAgIGlmICgnZGV2ZWxvcG1lbnQnICE9PSAncHJvZHVjdGlvbicgJiYgd2Fybk1pc3NpbmcgJiYgIXJlcykge1xuICAgICAgd2FybignRmFpbGVkIHRvIHJlc29sdmUgJyArIHR5cGUuc2xpY2UoMCwgLTEpICsgJzogJyArIGlkLCBvcHRpb25zKTtcbiAgICB9XG4gICAgcmV0dXJuIHJlcztcbiAgfVxuXG4gIHZhciB1aWQkMSA9IDA7XG5cbiAgLyoqXG4gICAqIEEgZGVwIGlzIGFuIG9ic2VydmFibGUgdGhhdCBjYW4gaGF2ZSBtdWx0aXBsZVxuICAgKiBkaXJlY3RpdmVzIHN1YnNjcmliaW5nIHRvIGl0LlxuICAgKlxuICAgKiBAY29uc3RydWN0b3JcbiAgICovXG4gIGZ1bmN0aW9uIERlcCgpIHtcbiAgICB0aGlzLmlkID0gdWlkJDErKztcbiAgICB0aGlzLnN1YnMgPSBbXTtcbiAgfVxuXG4gIC8vIHRoZSBjdXJyZW50IHRhcmdldCB3YXRjaGVyIGJlaW5nIGV2YWx1YXRlZC5cbiAgLy8gdGhpcyBpcyBnbG9iYWxseSB1bmlxdWUgYmVjYXVzZSB0aGVyZSBjb3VsZCBiZSBvbmx5IG9uZVxuICAvLyB3YXRjaGVyIGJlaW5nIGV2YWx1YXRlZCBhdCBhbnkgdGltZS5cbiAgRGVwLnRhcmdldCA9IG51bGw7XG5cbiAgLyoqXG4gICAqIEFkZCBhIGRpcmVjdGl2ZSBzdWJzY3JpYmVyLlxuICAgKlxuICAgKiBAcGFyYW0ge0RpcmVjdGl2ZX0gc3ViXG4gICAqL1xuXG4gIERlcC5wcm90b3R5cGUuYWRkU3ViID0gZnVuY3Rpb24gKHN1Yikge1xuICAgIHRoaXMuc3Vicy5wdXNoKHN1Yik7XG4gIH07XG5cbiAgLyoqXG4gICAqIFJlbW92ZSBhIGRpcmVjdGl2ZSBzdWJzY3JpYmVyLlxuICAgKlxuICAgKiBAcGFyYW0ge0RpcmVjdGl2ZX0gc3ViXG4gICAqL1xuXG4gIERlcC5wcm90b3R5cGUucmVtb3ZlU3ViID0gZnVuY3Rpb24gKHN1Yikge1xuICAgIHRoaXMuc3Vicy4kcmVtb3ZlKHN1Yik7XG4gIH07XG5cbiAgLyoqXG4gICAqIEFkZCBzZWxmIGFzIGEgZGVwZW5kZW5jeSB0byB0aGUgdGFyZ2V0IHdhdGNoZXIuXG4gICAqL1xuXG4gIERlcC5wcm90b3R5cGUuZGVwZW5kID0gZnVuY3Rpb24gKCkge1xuICAgIERlcC50YXJnZXQuYWRkRGVwKHRoaXMpO1xuICB9O1xuXG4gIC8qKlxuICAgKiBOb3RpZnkgYWxsIHN1YnNjcmliZXJzIG9mIGEgbmV3IHZhbHVlLlxuICAgKi9cblxuICBEZXAucHJvdG90eXBlLm5vdGlmeSA9IGZ1bmN0aW9uICgpIHtcbiAgICAvLyBzdGFibGl6ZSB0aGUgc3Vic2NyaWJlciBsaXN0IGZpcnN0XG4gICAgdmFyIHN1YnMgPSB0b0FycmF5KHRoaXMuc3Vicyk7XG4gICAgZm9yICh2YXIgaSA9IDAsIGwgPSBzdWJzLmxlbmd0aDsgaSA8IGw7IGkrKykge1xuICAgICAgc3Vic1tpXS51cGRhdGUoKTtcbiAgICB9XG4gIH07XG5cbiAgdmFyIGFycmF5UHJvdG8gPSBBcnJheS5wcm90b3R5cGU7XG4gIHZhciBhcnJheU1ldGhvZHMgPSBPYmplY3QuY3JlYXRlKGFycmF5UHJvdG8pXG5cbiAgLyoqXG4gICAqIEludGVyY2VwdCBtdXRhdGluZyBtZXRob2RzIGFuZCBlbWl0IGV2ZW50c1xuICAgKi9cblxuICA7WydwdXNoJywgJ3BvcCcsICdzaGlmdCcsICd1bnNoaWZ0JywgJ3NwbGljZScsICdzb3J0JywgJ3JldmVyc2UnXS5mb3JFYWNoKGZ1bmN0aW9uIChtZXRob2QpIHtcbiAgICAvLyBjYWNoZSBvcmlnaW5hbCBtZXRob2RcbiAgICB2YXIgb3JpZ2luYWwgPSBhcnJheVByb3RvW21ldGhvZF07XG4gICAgZGVmKGFycmF5TWV0aG9kcywgbWV0aG9kLCBmdW5jdGlvbiBtdXRhdG9yKCkge1xuICAgICAgLy8gYXZvaWQgbGVha2luZyBhcmd1bWVudHM6XG4gICAgICAvLyBodHRwOi8vanNwZXJmLmNvbS9jbG9zdXJlLXdpdGgtYXJndW1lbnRzXG4gICAgICB2YXIgaSA9IGFyZ3VtZW50cy5sZW5ndGg7XG4gICAgICB2YXIgYXJncyA9IG5ldyBBcnJheShpKTtcbiAgICAgIHdoaWxlIChpLS0pIHtcbiAgICAgICAgYXJnc1tpXSA9IGFyZ3VtZW50c1tpXTtcbiAgICAgIH1cbiAgICAgIHZhciByZXN1bHQgPSBvcmlnaW5hbC5hcHBseSh0aGlzLCBhcmdzKTtcbiAgICAgIHZhciBvYiA9IHRoaXMuX19vYl9fO1xuICAgICAgdmFyIGluc2VydGVkO1xuICAgICAgc3dpdGNoIChtZXRob2QpIHtcbiAgICAgICAgY2FzZSAncHVzaCc6XG4gICAgICAgICAgaW5zZXJ0ZWQgPSBhcmdzO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlICd1bnNoaWZ0JzpcbiAgICAgICAgICBpbnNlcnRlZCA9IGFyZ3M7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgJ3NwbGljZSc6XG4gICAgICAgICAgaW5zZXJ0ZWQgPSBhcmdzLnNsaWNlKDIpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgICAgaWYgKGluc2VydGVkKSBvYi5vYnNlcnZlQXJyYXkoaW5zZXJ0ZWQpO1xuICAgICAgLy8gbm90aWZ5IGNoYW5nZVxuICAgICAgb2IuZGVwLm5vdGlmeSgpO1xuICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9KTtcbiAgfSk7XG5cbiAgLyoqXG4gICAqIFN3YXAgdGhlIGVsZW1lbnQgYXQgdGhlIGdpdmVuIGluZGV4IHdpdGggYSBuZXcgdmFsdWVcbiAgICogYW5kIGVtaXRzIGNvcnJlc3BvbmRpbmcgZXZlbnQuXG4gICAqXG4gICAqIEBwYXJhbSB7TnVtYmVyfSBpbmRleFxuICAgKiBAcGFyYW0geyp9IHZhbFxuICAgKiBAcmV0dXJuIHsqfSAtIHJlcGxhY2VkIGVsZW1lbnRcbiAgICovXG5cbiAgZGVmKGFycmF5UHJvdG8sICckc2V0JywgZnVuY3Rpb24gJHNldChpbmRleCwgdmFsKSB7XG4gICAgaWYgKGluZGV4ID49IHRoaXMubGVuZ3RoKSB7XG4gICAgICB0aGlzLmxlbmd0aCA9IE51bWJlcihpbmRleCkgKyAxO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5zcGxpY2UoaW5kZXgsIDEsIHZhbClbMF07XG4gIH0pO1xuXG4gIC8qKlxuICAgKiBDb252ZW5pZW5jZSBtZXRob2QgdG8gcmVtb3ZlIHRoZSBlbGVtZW50IGF0IGdpdmVuIGluZGV4IG9yIHRhcmdldCBlbGVtZW50IHJlZmVyZW5jZS5cbiAgICpcbiAgICogQHBhcmFtIHsqfSBpdGVtXG4gICAqL1xuXG4gIGRlZihhcnJheVByb3RvLCAnJHJlbW92ZScsIGZ1bmN0aW9uICRyZW1vdmUoaXRlbSkge1xuICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBpZiAqL1xuICAgIGlmICghdGhpcy5sZW5ndGgpIHJldHVybjtcbiAgICB2YXIgaW5kZXggPSBpbmRleE9mKHRoaXMsIGl0ZW0pO1xuICAgIGlmIChpbmRleCA+IC0xKSB7XG4gICAgICByZXR1cm4gdGhpcy5zcGxpY2UoaW5kZXgsIDEpO1xuICAgIH1cbiAgfSk7XG5cbiAgdmFyIGFycmF5S2V5cyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKGFycmF5TWV0aG9kcyk7XG5cbiAgLyoqXG4gICAqIEJ5IGRlZmF1bHQsIHdoZW4gYSByZWFjdGl2ZSBwcm9wZXJ0eSBpcyBzZXQsIHRoZSBuZXcgdmFsdWUgaXNcbiAgICogYWxzbyBjb252ZXJ0ZWQgdG8gYmVjb21lIHJlYWN0aXZlLiBIb3dldmVyIGluIGNlcnRhaW4gY2FzZXMsIGUuZy5cbiAgICogdi1mb3Igc2NvcGUgYWxpYXMgYW5kIHByb3BzLCB3ZSBkb24ndCB3YW50IHRvIGZvcmNlIGNvbnZlcnNpb25cbiAgICogYmVjYXVzZSB0aGUgdmFsdWUgbWF5IGJlIGEgbmVzdGVkIHZhbHVlIHVuZGVyIGEgZnJvemVuIGRhdGEgc3RydWN0dXJlLlxuICAgKlxuICAgKiBTbyB3aGVuZXZlciB3ZSB3YW50IHRvIHNldCBhIHJlYWN0aXZlIHByb3BlcnR5IHdpdGhvdXQgZm9yY2luZ1xuICAgKiBjb252ZXJzaW9uIG9uIHRoZSBuZXcgdmFsdWUsIHdlIHdyYXAgdGhhdCBjYWxsIGluc2lkZSB0aGlzIGZ1bmN0aW9uLlxuICAgKi9cblxuICB2YXIgc2hvdWxkQ29udmVydCA9IHRydWU7XG5cbiAgZnVuY3Rpb24gd2l0aG91dENvbnZlcnNpb24oZm4pIHtcbiAgICBzaG91bGRDb252ZXJ0ID0gZmFsc2U7XG4gICAgZm4oKTtcbiAgICBzaG91bGRDb252ZXJ0ID0gdHJ1ZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBPYnNlcnZlciBjbGFzcyB0aGF0IGFyZSBhdHRhY2hlZCB0byBlYWNoIG9ic2VydmVkXG4gICAqIG9iamVjdC4gT25jZSBhdHRhY2hlZCwgdGhlIG9ic2VydmVyIGNvbnZlcnRzIHRhcmdldFxuICAgKiBvYmplY3QncyBwcm9wZXJ0eSBrZXlzIGludG8gZ2V0dGVyL3NldHRlcnMgdGhhdFxuICAgKiBjb2xsZWN0IGRlcGVuZGVuY2llcyBhbmQgZGlzcGF0Y2hlcyB1cGRhdGVzLlxuICAgKlxuICAgKiBAcGFyYW0ge0FycmF5fE9iamVjdH0gdmFsdWVcbiAgICogQGNvbnN0cnVjdG9yXG4gICAqL1xuXG4gIGZ1bmN0aW9uIE9ic2VydmVyKHZhbHVlKSB7XG4gICAgdGhpcy52YWx1ZSA9IHZhbHVlO1xuICAgIHRoaXMuZGVwID0gbmV3IERlcCgpO1xuICAgIGRlZih2YWx1ZSwgJ19fb2JfXycsIHRoaXMpO1xuICAgIGlmIChpc0FycmF5KHZhbHVlKSkge1xuICAgICAgdmFyIGF1Z21lbnQgPSBoYXNQcm90byA/IHByb3RvQXVnbWVudCA6IGNvcHlBdWdtZW50O1xuICAgICAgYXVnbWVudCh2YWx1ZSwgYXJyYXlNZXRob2RzLCBhcnJheUtleXMpO1xuICAgICAgdGhpcy5vYnNlcnZlQXJyYXkodmFsdWUpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLndhbGsodmFsdWUpO1xuICAgIH1cbiAgfVxuXG4gIC8vIEluc3RhbmNlIG1ldGhvZHNcblxuICAvKipcbiAgICogV2FsayB0aHJvdWdoIGVhY2ggcHJvcGVydHkgYW5kIGNvbnZlcnQgdGhlbSBpbnRvXG4gICAqIGdldHRlci9zZXR0ZXJzLiBUaGlzIG1ldGhvZCBzaG91bGQgb25seSBiZSBjYWxsZWQgd2hlblxuICAgKiB2YWx1ZSB0eXBlIGlzIE9iamVjdC5cbiAgICpcbiAgICogQHBhcmFtIHtPYmplY3R9IG9ialxuICAgKi9cblxuICBPYnNlcnZlci5wcm90b3R5cGUud2FsayA9IGZ1bmN0aW9uIChvYmopIHtcbiAgICB2YXIga2V5cyA9IE9iamVjdC5rZXlzKG9iaik7XG4gICAgZm9yICh2YXIgaSA9IDAsIGwgPSBrZXlzLmxlbmd0aDsgaSA8IGw7IGkrKykge1xuICAgICAgdGhpcy5jb252ZXJ0KGtleXNbaV0sIG9ialtrZXlzW2ldXSk7XG4gICAgfVxuICB9O1xuXG4gIC8qKlxuICAgKiBPYnNlcnZlIGEgbGlzdCBvZiBBcnJheSBpdGVtcy5cbiAgICpcbiAgICogQHBhcmFtIHtBcnJheX0gaXRlbXNcbiAgICovXG5cbiAgT2JzZXJ2ZXIucHJvdG90eXBlLm9ic2VydmVBcnJheSA9IGZ1bmN0aW9uIChpdGVtcykge1xuICAgIGZvciAodmFyIGkgPSAwLCBsID0gaXRlbXMubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG4gICAgICBvYnNlcnZlKGl0ZW1zW2ldKTtcbiAgICB9XG4gIH07XG5cbiAgLyoqXG4gICAqIENvbnZlcnQgYSBwcm9wZXJ0eSBpbnRvIGdldHRlci9zZXR0ZXIgc28gd2UgY2FuIGVtaXRcbiAgICogdGhlIGV2ZW50cyB3aGVuIHRoZSBwcm9wZXJ0eSBpcyBhY2Nlc3NlZC9jaGFuZ2VkLlxuICAgKlxuICAgKiBAcGFyYW0ge1N0cmluZ30ga2V5XG4gICAqIEBwYXJhbSB7Kn0gdmFsXG4gICAqL1xuXG4gIE9ic2VydmVyLnByb3RvdHlwZS5jb252ZXJ0ID0gZnVuY3Rpb24gKGtleSwgdmFsKSB7XG4gICAgZGVmaW5lUmVhY3RpdmUodGhpcy52YWx1ZSwga2V5LCB2YWwpO1xuICB9O1xuXG4gIC8qKlxuICAgKiBBZGQgYW4gb3duZXIgdm0sIHNvIHRoYXQgd2hlbiAkc2V0LyRkZWxldGUgbXV0YXRpb25zXG4gICAqIGhhcHBlbiB3ZSBjYW4gbm90aWZ5IG93bmVyIHZtcyB0byBwcm94eSB0aGUga2V5cyBhbmRcbiAgICogZGlnZXN0IHRoZSB3YXRjaGVycy4gVGhpcyBpcyBvbmx5IGNhbGxlZCB3aGVuIHRoZSBvYmplY3RcbiAgICogaXMgb2JzZXJ2ZWQgYXMgYW4gaW5zdGFuY2UncyByb290ICRkYXRhLlxuICAgKlxuICAgKiBAcGFyYW0ge1Z1ZX0gdm1cbiAgICovXG5cbiAgT2JzZXJ2ZXIucHJvdG90eXBlLmFkZFZtID0gZnVuY3Rpb24gKHZtKSB7XG4gICAgKHRoaXMudm1zIHx8ICh0aGlzLnZtcyA9IFtdKSkucHVzaCh2bSk7XG4gIH07XG5cbiAgLyoqXG4gICAqIFJlbW92ZSBhbiBvd25lciB2bS4gVGhpcyBpcyBjYWxsZWQgd2hlbiB0aGUgb2JqZWN0IGlzXG4gICAqIHN3YXBwZWQgb3V0IGFzIGFuIGluc3RhbmNlJ3MgJGRhdGEgb2JqZWN0LlxuICAgKlxuICAgKiBAcGFyYW0ge1Z1ZX0gdm1cbiAgICovXG5cbiAgT2JzZXJ2ZXIucHJvdG90eXBlLnJlbW92ZVZtID0gZnVuY3Rpb24gKHZtKSB7XG4gICAgdGhpcy52bXMuJHJlbW92ZSh2bSk7XG4gIH07XG5cbiAgLy8gaGVscGVyc1xuXG4gIC8qKlxuICAgKiBBdWdtZW50IGFuIHRhcmdldCBPYmplY3Qgb3IgQXJyYXkgYnkgaW50ZXJjZXB0aW5nXG4gICAqIHRoZSBwcm90b3R5cGUgY2hhaW4gdXNpbmcgX19wcm90b19fXG4gICAqXG4gICAqIEBwYXJhbSB7T2JqZWN0fEFycmF5fSB0YXJnZXRcbiAgICogQHBhcmFtIHtPYmplY3R9IHNyY1xuICAgKi9cblxuICBmdW5jdGlvbiBwcm90b0F1Z21lbnQodGFyZ2V0LCBzcmMpIHtcbiAgICAvKiBlc2xpbnQtZGlzYWJsZSBuby1wcm90byAqL1xuICAgIHRhcmdldC5fX3Byb3RvX18gPSBzcmM7XG4gICAgLyogZXNsaW50LWVuYWJsZSBuby1wcm90byAqL1xuICB9XG5cbiAgLyoqXG4gICAqIEF1Z21lbnQgYW4gdGFyZ2V0IE9iamVjdCBvciBBcnJheSBieSBkZWZpbmluZ1xuICAgKiBoaWRkZW4gcHJvcGVydGllcy5cbiAgICpcbiAgICogQHBhcmFtIHtPYmplY3R8QXJyYXl9IHRhcmdldFxuICAgKiBAcGFyYW0ge09iamVjdH0gcHJvdG9cbiAgICovXG5cbiAgZnVuY3Rpb24gY29weUF1Z21lbnQodGFyZ2V0LCBzcmMsIGtleXMpIHtcbiAgICBmb3IgKHZhciBpID0gMCwgbCA9IGtleXMubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG4gICAgICB2YXIga2V5ID0ga2V5c1tpXTtcbiAgICAgIGRlZih0YXJnZXQsIGtleSwgc3JjW2tleV0pO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBBdHRlbXB0IHRvIGNyZWF0ZSBhbiBvYnNlcnZlciBpbnN0YW5jZSBmb3IgYSB2YWx1ZSxcbiAgICogcmV0dXJucyB0aGUgbmV3IG9ic2VydmVyIGlmIHN1Y2Nlc3NmdWxseSBvYnNlcnZlZCxcbiAgICogb3IgdGhlIGV4aXN0aW5nIG9ic2VydmVyIGlmIHRoZSB2YWx1ZSBhbHJlYWR5IGhhcyBvbmUuXG4gICAqXG4gICAqIEBwYXJhbSB7Kn0gdmFsdWVcbiAgICogQHBhcmFtIHtWdWV9IFt2bV1cbiAgICogQHJldHVybiB7T2JzZXJ2ZXJ8dW5kZWZpbmVkfVxuICAgKiBAc3RhdGljXG4gICAqL1xuXG4gIGZ1bmN0aW9uIG9ic2VydmUodmFsdWUsIHZtKSB7XG4gICAgaWYgKCF2YWx1ZSB8fCB0eXBlb2YgdmFsdWUgIT09ICdvYmplY3QnKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHZhciBvYjtcbiAgICBpZiAoaGFzT3duKHZhbHVlLCAnX19vYl9fJykgJiYgdmFsdWUuX19vYl9fIGluc3RhbmNlb2YgT2JzZXJ2ZXIpIHtcbiAgICAgIG9iID0gdmFsdWUuX19vYl9fO1xuICAgIH0gZWxzZSBpZiAoc2hvdWxkQ29udmVydCAmJiAoaXNBcnJheSh2YWx1ZSkgfHwgaXNQbGFpbk9iamVjdCh2YWx1ZSkpICYmIE9iamVjdC5pc0V4dGVuc2libGUodmFsdWUpICYmICF2YWx1ZS5faXNWdWUpIHtcbiAgICAgIG9iID0gbmV3IE9ic2VydmVyKHZhbHVlKTtcbiAgICB9XG4gICAgaWYgKG9iICYmIHZtKSB7XG4gICAgICBvYi5hZGRWbSh2bSk7XG4gICAgfVxuICAgIHJldHVybiBvYjtcbiAgfVxuXG4gIC8qKlxuICAgKiBEZWZpbmUgYSByZWFjdGl2ZSBwcm9wZXJ0eSBvbiBhbiBPYmplY3QuXG4gICAqXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBvYmpcbiAgICogQHBhcmFtIHtTdHJpbmd9IGtleVxuICAgKiBAcGFyYW0geyp9IHZhbFxuICAgKi9cblxuICBmdW5jdGlvbiBkZWZpbmVSZWFjdGl2ZShvYmosIGtleSwgdmFsKSB7XG4gICAgdmFyIGRlcCA9IG5ldyBEZXAoKTtcblxuICAgIHZhciBwcm9wZXJ0eSA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3Iob2JqLCBrZXkpO1xuICAgIGlmIChwcm9wZXJ0eSAmJiBwcm9wZXJ0eS5jb25maWd1cmFibGUgPT09IGZhbHNlKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgLy8gY2F0ZXIgZm9yIHByZS1kZWZpbmVkIGdldHRlci9zZXR0ZXJzXG4gICAgdmFyIGdldHRlciA9IHByb3BlcnR5ICYmIHByb3BlcnR5LmdldDtcbiAgICB2YXIgc2V0dGVyID0gcHJvcGVydHkgJiYgcHJvcGVydHkuc2V0O1xuXG4gICAgdmFyIGNoaWxkT2IgPSBvYnNlcnZlKHZhbCk7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KG9iaiwga2V5LCB7XG4gICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgY29uZmlndXJhYmxlOiB0cnVlLFxuICAgICAgZ2V0OiBmdW5jdGlvbiByZWFjdGl2ZUdldHRlcigpIHtcbiAgICAgICAgdmFyIHZhbHVlID0gZ2V0dGVyID8gZ2V0dGVyLmNhbGwob2JqKSA6IHZhbDtcbiAgICAgICAgaWYgKERlcC50YXJnZXQpIHtcbiAgICAgICAgICBkZXAuZGVwZW5kKCk7XG4gICAgICAgICAgaWYgKGNoaWxkT2IpIHtcbiAgICAgICAgICAgIGNoaWxkT2IuZGVwLmRlcGVuZCgpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAoaXNBcnJheSh2YWx1ZSkpIHtcbiAgICAgICAgICAgIGZvciAodmFyIGUsIGkgPSAwLCBsID0gdmFsdWUubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG4gICAgICAgICAgICAgIGUgPSB2YWx1ZVtpXTtcbiAgICAgICAgICAgICAgZSAmJiBlLl9fb2JfXyAmJiBlLl9fb2JfXy5kZXAuZGVwZW5kKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICAgIH0sXG4gICAgICBzZXQ6IGZ1bmN0aW9uIHJlYWN0aXZlU2V0dGVyKG5ld1ZhbCkge1xuICAgICAgICB2YXIgdmFsdWUgPSBnZXR0ZXIgPyBnZXR0ZXIuY2FsbChvYmopIDogdmFsO1xuICAgICAgICBpZiAobmV3VmFsID09PSB2YWx1ZSkge1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBpZiAoc2V0dGVyKSB7XG4gICAgICAgICAgc2V0dGVyLmNhbGwob2JqLCBuZXdWYWwpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHZhbCA9IG5ld1ZhbDtcbiAgICAgICAgfVxuICAgICAgICBjaGlsZE9iID0gb2JzZXJ2ZShuZXdWYWwpO1xuICAgICAgICBkZXAubm90aWZ5KCk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuXG5cbiAgdmFyIHV0aWwgPSBPYmplY3QuZnJlZXplKHtcbiAgXHRkZWZpbmVSZWFjdGl2ZTogZGVmaW5lUmVhY3RpdmUsXG4gIFx0c2V0OiBzZXQsXG4gIFx0ZGVsOiBkZWwsXG4gIFx0aGFzT3duOiBoYXNPd24sXG4gIFx0aXNMaXRlcmFsOiBpc0xpdGVyYWwsXG4gIFx0aXNSZXNlcnZlZDogaXNSZXNlcnZlZCxcbiAgXHRfdG9TdHJpbmc6IF90b1N0cmluZyxcbiAgXHR0b051bWJlcjogdG9OdW1iZXIsXG4gIFx0dG9Cb29sZWFuOiB0b0Jvb2xlYW4sXG4gIFx0c3RyaXBRdW90ZXM6IHN0cmlwUXVvdGVzLFxuICBcdGNhbWVsaXplOiBjYW1lbGl6ZSxcbiAgXHRoeXBoZW5hdGU6IGh5cGhlbmF0ZSxcbiAgXHRjbGFzc2lmeTogY2xhc3NpZnksXG4gIFx0YmluZDogYmluZCxcbiAgXHR0b0FycmF5OiB0b0FycmF5LFxuICBcdGV4dGVuZDogZXh0ZW5kLFxuICBcdGlzT2JqZWN0OiBpc09iamVjdCxcbiAgXHRpc1BsYWluT2JqZWN0OiBpc1BsYWluT2JqZWN0LFxuICBcdGRlZjogZGVmLFxuICBcdGRlYm91bmNlOiBfZGVib3VuY2UsXG4gIFx0aW5kZXhPZjogaW5kZXhPZixcbiAgXHRjYW5jZWxsYWJsZTogY2FuY2VsbGFibGUsXG4gIFx0bG9vc2VFcXVhbDogbG9vc2VFcXVhbCxcbiAgXHRpc0FycmF5OiBpc0FycmF5LFxuICBcdGhhc1Byb3RvOiBoYXNQcm90byxcbiAgXHRpbkJyb3dzZXI6IGluQnJvd3NlcixcbiAgXHRkZXZ0b29sczogZGV2dG9vbHMsXG4gIFx0aXNJRTk6IGlzSUU5LFxuICBcdGlzQW5kcm9pZDogaXNBbmRyb2lkLFxuICBcdGlzSW9zOiBpc0lvcyxcbiAgXHRpc1dlY2hhdDogaXNXZWNoYXQsXG4gIFx0Z2V0IHRyYW5zaXRpb25Qcm9wICgpIHsgcmV0dXJuIHRyYW5zaXRpb25Qcm9wOyB9LFxuICBcdGdldCB0cmFuc2l0aW9uRW5kRXZlbnQgKCkgeyByZXR1cm4gdHJhbnNpdGlvbkVuZEV2ZW50OyB9LFxuICBcdGdldCBhbmltYXRpb25Qcm9wICgpIHsgcmV0dXJuIGFuaW1hdGlvblByb3A7IH0sXG4gIFx0Z2V0IGFuaW1hdGlvbkVuZEV2ZW50ICgpIHsgcmV0dXJuIGFuaW1hdGlvbkVuZEV2ZW50OyB9LFxuICBcdG5leHRUaWNrOiBuZXh0VGljayxcbiAgXHRnZXQgX1NldCAoKSB7IHJldHVybiBfU2V0OyB9LFxuICBcdHF1ZXJ5OiBxdWVyeSxcbiAgXHRpbkRvYzogaW5Eb2MsXG4gIFx0Z2V0QXR0cjogZ2V0QXR0cixcbiAgXHRnZXRCaW5kQXR0cjogZ2V0QmluZEF0dHIsXG4gIFx0aGFzQmluZEF0dHI6IGhhc0JpbmRBdHRyLFxuICBcdGJlZm9yZTogYmVmb3JlLFxuICBcdGFmdGVyOiBhZnRlcixcbiAgXHRyZW1vdmU6IHJlbW92ZSxcbiAgXHRwcmVwZW5kOiBwcmVwZW5kLFxuICBcdHJlcGxhY2U6IHJlcGxhY2UsXG4gIFx0b246IG9uLFxuICBcdG9mZjogb2ZmLFxuICBcdHNldENsYXNzOiBzZXRDbGFzcyxcbiAgXHRhZGRDbGFzczogYWRkQ2xhc3MsXG4gIFx0cmVtb3ZlQ2xhc3M6IHJlbW92ZUNsYXNzLFxuICBcdGV4dHJhY3RDb250ZW50OiBleHRyYWN0Q29udGVudCxcbiAgXHR0cmltTm9kZTogdHJpbU5vZGUsXG4gIFx0aXNUZW1wbGF0ZTogaXNUZW1wbGF0ZSxcbiAgXHRjcmVhdGVBbmNob3I6IGNyZWF0ZUFuY2hvcixcbiAgXHRmaW5kUmVmOiBmaW5kUmVmLFxuICBcdG1hcE5vZGVSYW5nZTogbWFwTm9kZVJhbmdlLFxuICBcdHJlbW92ZU5vZGVSYW5nZTogcmVtb3ZlTm9kZVJhbmdlLFxuICBcdGlzRnJhZ21lbnQ6IGlzRnJhZ21lbnQsXG4gIFx0Z2V0T3V0ZXJIVE1MOiBnZXRPdXRlckhUTUwsXG4gIFx0bWVyZ2VPcHRpb25zOiBtZXJnZU9wdGlvbnMsXG4gIFx0cmVzb2x2ZUFzc2V0OiByZXNvbHZlQXNzZXQsXG4gIFx0Y2hlY2tDb21wb25lbnRBdHRyOiBjaGVja0NvbXBvbmVudEF0dHIsXG4gIFx0Y29tbW9uVGFnUkU6IGNvbW1vblRhZ1JFLFxuICBcdHJlc2VydmVkVGFnUkU6IHJlc2VydmVkVGFnUkUsXG4gIFx0Z2V0IHdhcm4gKCkgeyByZXR1cm4gd2FybjsgfVxuICB9KTtcblxuICB2YXIgdWlkID0gMDtcblxuICBmdW5jdGlvbiBpbml0TWl4aW4gKFZ1ZSkge1xuICAgIC8qKlxuICAgICAqIFRoZSBtYWluIGluaXQgc2VxdWVuY2UuIFRoaXMgaXMgY2FsbGVkIGZvciBldmVyeVxuICAgICAqIGluc3RhbmNlLCBpbmNsdWRpbmcgb25lcyB0aGF0IGFyZSBjcmVhdGVkIGZyb20gZXh0ZW5kZWRcbiAgICAgKiBjb25zdHJ1Y3RvcnMuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gb3B0aW9ucyAtIHRoaXMgb3B0aW9ucyBvYmplY3Qgc2hvdWxkIGJlXG4gICAgICogICAgICAgICAgICAgICAgICAgICAgICAgICB0aGUgcmVzdWx0IG9mIG1lcmdpbmcgY2xhc3NcbiAgICAgKiAgICAgICAgICAgICAgICAgICAgICAgICAgIG9wdGlvbnMgYW5kIHRoZSBvcHRpb25zIHBhc3NlZFxuICAgICAqICAgICAgICAgICAgICAgICAgICAgICAgICAgaW4gdG8gdGhlIGNvbnN0cnVjdG9yLlxuICAgICAqL1xuXG4gICAgVnVlLnByb3RvdHlwZS5faW5pdCA9IGZ1bmN0aW9uIChvcHRpb25zKSB7XG4gICAgICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcblxuICAgICAgdGhpcy4kZWwgPSBudWxsO1xuICAgICAgdGhpcy4kcGFyZW50ID0gb3B0aW9ucy5wYXJlbnQ7XG4gICAgICB0aGlzLiRyb290ID0gdGhpcy4kcGFyZW50ID8gdGhpcy4kcGFyZW50LiRyb290IDogdGhpcztcbiAgICAgIHRoaXMuJGNoaWxkcmVuID0gW107XG4gICAgICB0aGlzLiRyZWZzID0ge307IC8vIGNoaWxkIHZtIHJlZmVyZW5jZXNcbiAgICAgIHRoaXMuJGVscyA9IHt9OyAvLyBlbGVtZW50IHJlZmVyZW5jZXNcbiAgICAgIHRoaXMuX3dhdGNoZXJzID0gW107IC8vIGFsbCB3YXRjaGVycyBhcyBhbiBhcnJheVxuICAgICAgdGhpcy5fZGlyZWN0aXZlcyA9IFtdOyAvLyBhbGwgZGlyZWN0aXZlc1xuXG4gICAgICAvLyBhIHVpZFxuICAgICAgdGhpcy5fdWlkID0gdWlkKys7XG5cbiAgICAgIC8vIGEgZmxhZyB0byBhdm9pZCB0aGlzIGJlaW5nIG9ic2VydmVkXG4gICAgICB0aGlzLl9pc1Z1ZSA9IHRydWU7XG5cbiAgICAgIC8vIGV2ZW50cyBib29ra2VlcGluZ1xuICAgICAgdGhpcy5fZXZlbnRzID0ge307IC8vIHJlZ2lzdGVyZWQgY2FsbGJhY2tzXG4gICAgICB0aGlzLl9ldmVudHNDb3VudCA9IHt9OyAvLyBmb3IgJGJyb2FkY2FzdCBvcHRpbWl6YXRpb25cblxuICAgICAgLy8gZnJhZ21lbnQgaW5zdGFuY2UgcHJvcGVydGllc1xuICAgICAgdGhpcy5faXNGcmFnbWVudCA9IGZhbHNlO1xuICAgICAgdGhpcy5fZnJhZ21lbnQgPSAvLyBAdHlwZSB7RG9jdW1lbnRGcmFnbWVudH1cbiAgICAgIHRoaXMuX2ZyYWdtZW50U3RhcnQgPSAvLyBAdHlwZSB7VGV4dHxDb21tZW50fVxuICAgICAgdGhpcy5fZnJhZ21lbnRFbmQgPSBudWxsOyAvLyBAdHlwZSB7VGV4dHxDb21tZW50fVxuXG4gICAgICAvLyBsaWZlY3ljbGUgc3RhdGVcbiAgICAgIHRoaXMuX2lzQ29tcGlsZWQgPSB0aGlzLl9pc0Rlc3Ryb3llZCA9IHRoaXMuX2lzUmVhZHkgPSB0aGlzLl9pc0F0dGFjaGVkID0gdGhpcy5faXNCZWluZ0Rlc3Ryb3llZCA9IHRoaXMuX3ZGb3JSZW1vdmluZyA9IGZhbHNlO1xuICAgICAgdGhpcy5fdW5saW5rRm4gPSBudWxsO1xuXG4gICAgICAvLyBjb250ZXh0OlxuICAgICAgLy8gaWYgdGhpcyBpcyBhIHRyYW5zY2x1ZGVkIGNvbXBvbmVudCwgY29udGV4dFxuICAgICAgLy8gd2lsbCBiZSB0aGUgY29tbW9uIHBhcmVudCB2bSBvZiB0aGlzIGluc3RhbmNlXG4gICAgICAvLyBhbmQgaXRzIGhvc3QuXG4gICAgICB0aGlzLl9jb250ZXh0ID0gb3B0aW9ucy5fY29udGV4dCB8fCB0aGlzLiRwYXJlbnQ7XG5cbiAgICAgIC8vIHNjb3BlOlxuICAgICAgLy8gaWYgdGhpcyBpcyBpbnNpZGUgYW4gaW5saW5lIHYtZm9yLCB0aGUgc2NvcGVcbiAgICAgIC8vIHdpbGwgYmUgdGhlIGludGVybWVkaWF0ZSBzY29wZSBjcmVhdGVkIGZvciB0aGlzXG4gICAgICAvLyByZXBlYXQgZnJhZ21lbnQuIHRoaXMgaXMgdXNlZCBmb3IgbGlua2luZyBwcm9wc1xuICAgICAgLy8gYW5kIGNvbnRhaW5lciBkaXJlY3RpdmVzLlxuICAgICAgdGhpcy5fc2NvcGUgPSBvcHRpb25zLl9zY29wZTtcblxuICAgICAgLy8gZnJhZ21lbnQ6XG4gICAgICAvLyBpZiB0aGlzIGluc3RhbmNlIGlzIGNvbXBpbGVkIGluc2lkZSBhIEZyYWdtZW50LCBpdFxuICAgICAgLy8gbmVlZHMgdG8gcmVpZ3N0ZXIgaXRzZWxmIGFzIGEgY2hpbGQgb2YgdGhhdCBmcmFnbWVudFxuICAgICAgLy8gZm9yIGF0dGFjaC9kZXRhY2ggdG8gd29yayBwcm9wZXJseS5cbiAgICAgIHRoaXMuX2ZyYWcgPSBvcHRpb25zLl9mcmFnO1xuICAgICAgaWYgKHRoaXMuX2ZyYWcpIHtcbiAgICAgICAgdGhpcy5fZnJhZy5jaGlsZHJlbi5wdXNoKHRoaXMpO1xuICAgICAgfVxuXG4gICAgICAvLyBwdXNoIHNlbGYgaW50byBwYXJlbnQgLyB0cmFuc2NsdXNpb24gaG9zdFxuICAgICAgaWYgKHRoaXMuJHBhcmVudCkge1xuICAgICAgICB0aGlzLiRwYXJlbnQuJGNoaWxkcmVuLnB1c2godGhpcyk7XG4gICAgICB9XG5cbiAgICAgIC8vIG1lcmdlIG9wdGlvbnMuXG4gICAgICBvcHRpb25zID0gdGhpcy4kb3B0aW9ucyA9IG1lcmdlT3B0aW9ucyh0aGlzLmNvbnN0cnVjdG9yLm9wdGlvbnMsIG9wdGlvbnMsIHRoaXMpO1xuXG4gICAgICAvLyBzZXQgcmVmXG4gICAgICB0aGlzLl91cGRhdGVSZWYoKTtcblxuICAgICAgLy8gaW5pdGlhbGl6ZSBkYXRhIGFzIGVtcHR5IG9iamVjdC5cbiAgICAgIC8vIGl0IHdpbGwgYmUgZmlsbGVkIHVwIGluIF9pbml0RGF0YSgpLlxuICAgICAgdGhpcy5fZGF0YSA9IHt9O1xuXG4gICAgICAvLyBjYWxsIGluaXQgaG9va1xuICAgICAgdGhpcy5fY2FsbEhvb2soJ2luaXQnKTtcblxuICAgICAgLy8gaW5pdGlhbGl6ZSBkYXRhIG9ic2VydmF0aW9uIGFuZCBzY29wZSBpbmhlcml0YW5jZS5cbiAgICAgIHRoaXMuX2luaXRTdGF0ZSgpO1xuXG4gICAgICAvLyBzZXR1cCBldmVudCBzeXN0ZW0gYW5kIG9wdGlvbiBldmVudHMuXG4gICAgICB0aGlzLl9pbml0RXZlbnRzKCk7XG5cbiAgICAgIC8vIGNhbGwgY3JlYXRlZCBob29rXG4gICAgICB0aGlzLl9jYWxsSG9vaygnY3JlYXRlZCcpO1xuXG4gICAgICAvLyBpZiBgZWxgIG9wdGlvbiBpcyBwYXNzZWQsIHN0YXJ0IGNvbXBpbGF0aW9uLlxuICAgICAgaWYgKG9wdGlvbnMuZWwpIHtcbiAgICAgICAgdGhpcy4kbW91bnQob3B0aW9ucy5lbCk7XG4gICAgICB9XG4gICAgfTtcbiAgfVxuXG4gIHZhciBwYXRoQ2FjaGUgPSBuZXcgQ2FjaGUoMTAwMCk7XG5cbiAgLy8gYWN0aW9uc1xuICB2YXIgQVBQRU5EID0gMDtcbiAgdmFyIFBVU0ggPSAxO1xuICB2YXIgSU5DX1NVQl9QQVRIX0RFUFRIID0gMjtcbiAgdmFyIFBVU0hfU1VCX1BBVEggPSAzO1xuXG4gIC8vIHN0YXRlc1xuICB2YXIgQkVGT1JFX1BBVEggPSAwO1xuICB2YXIgSU5fUEFUSCA9IDE7XG4gIHZhciBCRUZPUkVfSURFTlQgPSAyO1xuICB2YXIgSU5fSURFTlQgPSAzO1xuICB2YXIgSU5fU1VCX1BBVEggPSA0O1xuICB2YXIgSU5fU0lOR0xFX1FVT1RFID0gNTtcbiAgdmFyIElOX0RPVUJMRV9RVU9URSA9IDY7XG4gIHZhciBBRlRFUl9QQVRIID0gNztcbiAgdmFyIEVSUk9SID0gODtcblxuICB2YXIgcGF0aFN0YXRlTWFjaGluZSA9IFtdO1xuXG4gIHBhdGhTdGF0ZU1hY2hpbmVbQkVGT1JFX1BBVEhdID0ge1xuICAgICd3cyc6IFtCRUZPUkVfUEFUSF0sXG4gICAgJ2lkZW50JzogW0lOX0lERU5ULCBBUFBFTkRdLFxuICAgICdbJzogW0lOX1NVQl9QQVRIXSxcbiAgICAnZW9mJzogW0FGVEVSX1BBVEhdXG4gIH07XG5cbiAgcGF0aFN0YXRlTWFjaGluZVtJTl9QQVRIXSA9IHtcbiAgICAnd3MnOiBbSU5fUEFUSF0sXG4gICAgJy4nOiBbQkVGT1JFX0lERU5UXSxcbiAgICAnWyc6IFtJTl9TVUJfUEFUSF0sXG4gICAgJ2VvZic6IFtBRlRFUl9QQVRIXVxuICB9O1xuXG4gIHBhdGhTdGF0ZU1hY2hpbmVbQkVGT1JFX0lERU5UXSA9IHtcbiAgICAnd3MnOiBbQkVGT1JFX0lERU5UXSxcbiAgICAnaWRlbnQnOiBbSU5fSURFTlQsIEFQUEVORF1cbiAgfTtcblxuICBwYXRoU3RhdGVNYWNoaW5lW0lOX0lERU5UXSA9IHtcbiAgICAnaWRlbnQnOiBbSU5fSURFTlQsIEFQUEVORF0sXG4gICAgJzAnOiBbSU5fSURFTlQsIEFQUEVORF0sXG4gICAgJ251bWJlcic6IFtJTl9JREVOVCwgQVBQRU5EXSxcbiAgICAnd3MnOiBbSU5fUEFUSCwgUFVTSF0sXG4gICAgJy4nOiBbQkVGT1JFX0lERU5ULCBQVVNIXSxcbiAgICAnWyc6IFtJTl9TVUJfUEFUSCwgUFVTSF0sXG4gICAgJ2VvZic6IFtBRlRFUl9QQVRILCBQVVNIXVxuICB9O1xuXG4gIHBhdGhTdGF0ZU1hY2hpbmVbSU5fU1VCX1BBVEhdID0ge1xuICAgIFwiJ1wiOiBbSU5fU0lOR0xFX1FVT1RFLCBBUFBFTkRdLFxuICAgICdcIic6IFtJTl9ET1VCTEVfUVVPVEUsIEFQUEVORF0sXG4gICAgJ1snOiBbSU5fU1VCX1BBVEgsIElOQ19TVUJfUEFUSF9ERVBUSF0sXG4gICAgJ10nOiBbSU5fUEFUSCwgUFVTSF9TVUJfUEFUSF0sXG4gICAgJ2VvZic6IEVSUk9SLFxuICAgICdlbHNlJzogW0lOX1NVQl9QQVRILCBBUFBFTkRdXG4gIH07XG5cbiAgcGF0aFN0YXRlTWFjaGluZVtJTl9TSU5HTEVfUVVPVEVdID0ge1xuICAgIFwiJ1wiOiBbSU5fU1VCX1BBVEgsIEFQUEVORF0sXG4gICAgJ2VvZic6IEVSUk9SLFxuICAgICdlbHNlJzogW0lOX1NJTkdMRV9RVU9URSwgQVBQRU5EXVxuICB9O1xuXG4gIHBhdGhTdGF0ZU1hY2hpbmVbSU5fRE9VQkxFX1FVT1RFXSA9IHtcbiAgICAnXCInOiBbSU5fU1VCX1BBVEgsIEFQUEVORF0sXG4gICAgJ2VvZic6IEVSUk9SLFxuICAgICdlbHNlJzogW0lOX0RPVUJMRV9RVU9URSwgQVBQRU5EXVxuICB9O1xuXG4gIC8qKlxuICAgKiBEZXRlcm1pbmUgdGhlIHR5cGUgb2YgYSBjaGFyYWN0ZXIgaW4gYSBrZXlwYXRoLlxuICAgKlxuICAgKiBAcGFyYW0ge0NoYXJ9IGNoXG4gICAqIEByZXR1cm4ge1N0cmluZ30gdHlwZVxuICAgKi9cblxuICBmdW5jdGlvbiBnZXRQYXRoQ2hhclR5cGUoY2gpIHtcbiAgICBpZiAoY2ggPT09IHVuZGVmaW5lZCkge1xuICAgICAgcmV0dXJuICdlb2YnO1xuICAgIH1cblxuICAgIHZhciBjb2RlID0gY2guY2hhckNvZGVBdCgwKTtcblxuICAgIHN3aXRjaCAoY29kZSkge1xuICAgICAgY2FzZSAweDVCOiAvLyBbXG4gICAgICBjYXNlIDB4NUQ6IC8vIF1cbiAgICAgIGNhc2UgMHgyRTogLy8gLlxuICAgICAgY2FzZSAweDIyOiAvLyBcIlxuICAgICAgY2FzZSAweDI3OiAvLyAnXG4gICAgICBjYXNlIDB4MzA6XG4gICAgICAgIC8vIDBcbiAgICAgICAgcmV0dXJuIGNoO1xuXG4gICAgICBjYXNlIDB4NUY6IC8vIF9cbiAgICAgIGNhc2UgMHgyNDpcbiAgICAgICAgLy8gJFxuICAgICAgICByZXR1cm4gJ2lkZW50JztcblxuICAgICAgY2FzZSAweDIwOiAvLyBTcGFjZVxuICAgICAgY2FzZSAweDA5OiAvLyBUYWJcbiAgICAgIGNhc2UgMHgwQTogLy8gTmV3bGluZVxuICAgICAgY2FzZSAweDBEOiAvLyBSZXR1cm5cbiAgICAgIGNhc2UgMHhBMDogLy8gTm8tYnJlYWsgc3BhY2VcbiAgICAgIGNhc2UgMHhGRUZGOiAvLyBCeXRlIE9yZGVyIE1hcmtcbiAgICAgIGNhc2UgMHgyMDI4OiAvLyBMaW5lIFNlcGFyYXRvclxuICAgICAgY2FzZSAweDIwMjk6XG4gICAgICAgIC8vIFBhcmFncmFwaCBTZXBhcmF0b3JcbiAgICAgICAgcmV0dXJuICd3cyc7XG4gICAgfVxuXG4gICAgLy8gYS16LCBBLVpcbiAgICBpZiAoY29kZSA+PSAweDYxICYmIGNvZGUgPD0gMHg3QSB8fCBjb2RlID49IDB4NDEgJiYgY29kZSA8PSAweDVBKSB7XG4gICAgICByZXR1cm4gJ2lkZW50JztcbiAgICB9XG5cbiAgICAvLyAxLTlcbiAgICBpZiAoY29kZSA+PSAweDMxICYmIGNvZGUgPD0gMHgzOSkge1xuICAgICAgcmV0dXJuICdudW1iZXInO1xuICAgIH1cblxuICAgIHJldHVybiAnZWxzZSc7XG4gIH1cblxuICAvKipcbiAgICogRm9ybWF0IGEgc3ViUGF0aCwgcmV0dXJuIGl0cyBwbGFpbiBmb3JtIGlmIGl0IGlzXG4gICAqIGEgbGl0ZXJhbCBzdHJpbmcgb3IgbnVtYmVyLiBPdGhlcndpc2UgcHJlcGVuZCB0aGVcbiAgICogZHluYW1pYyBpbmRpY2F0b3IgKCopLlxuICAgKlxuICAgKiBAcGFyYW0ge1N0cmluZ30gcGF0aFxuICAgKiBAcmV0dXJuIHtTdHJpbmd9XG4gICAqL1xuXG4gIGZ1bmN0aW9uIGZvcm1hdFN1YlBhdGgocGF0aCkge1xuICAgIHZhciB0cmltbWVkID0gcGF0aC50cmltKCk7XG4gICAgLy8gaW52YWxpZCBsZWFkaW5nIDBcbiAgICBpZiAocGF0aC5jaGFyQXQoMCkgPT09ICcwJyAmJiBpc05hTihwYXRoKSkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICByZXR1cm4gaXNMaXRlcmFsKHRyaW1tZWQpID8gc3RyaXBRdW90ZXModHJpbW1lZCkgOiAnKicgKyB0cmltbWVkO1xuICB9XG5cbiAgLyoqXG4gICAqIFBhcnNlIGEgc3RyaW5nIHBhdGggaW50byBhbiBhcnJheSBvZiBzZWdtZW50c1xuICAgKlxuICAgKiBAcGFyYW0ge1N0cmluZ30gcGF0aFxuICAgKiBAcmV0dXJuIHtBcnJheXx1bmRlZmluZWR9XG4gICAqL1xuXG4gIGZ1bmN0aW9uIHBhcnNlKHBhdGgpIHtcbiAgICB2YXIga2V5cyA9IFtdO1xuICAgIHZhciBpbmRleCA9IC0xO1xuICAgIHZhciBtb2RlID0gQkVGT1JFX1BBVEg7XG4gICAgdmFyIHN1YlBhdGhEZXB0aCA9IDA7XG4gICAgdmFyIGMsIG5ld0NoYXIsIGtleSwgdHlwZSwgdHJhbnNpdGlvbiwgYWN0aW9uLCB0eXBlTWFwO1xuXG4gICAgdmFyIGFjdGlvbnMgPSBbXTtcblxuICAgIGFjdGlvbnNbUFVTSF0gPSBmdW5jdGlvbiAoKSB7XG4gICAgICBpZiAoa2V5ICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAga2V5cy5wdXNoKGtleSk7XG4gICAgICAgIGtleSA9IHVuZGVmaW5lZDtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgYWN0aW9uc1tBUFBFTkRdID0gZnVuY3Rpb24gKCkge1xuICAgICAgaWYgKGtleSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIGtleSA9IG5ld0NoYXI7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBrZXkgKz0gbmV3Q2hhcjtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgYWN0aW9uc1tJTkNfU1VCX1BBVEhfREVQVEhdID0gZnVuY3Rpb24gKCkge1xuICAgICAgYWN0aW9uc1tBUFBFTkRdKCk7XG4gICAgICBzdWJQYXRoRGVwdGgrKztcbiAgICB9O1xuXG4gICAgYWN0aW9uc1tQVVNIX1NVQl9QQVRIXSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIGlmIChzdWJQYXRoRGVwdGggPiAwKSB7XG4gICAgICAgIHN1YlBhdGhEZXB0aC0tO1xuICAgICAgICBtb2RlID0gSU5fU1VCX1BBVEg7XG4gICAgICAgIGFjdGlvbnNbQVBQRU5EXSgpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgc3ViUGF0aERlcHRoID0gMDtcbiAgICAgICAga2V5ID0gZm9ybWF0U3ViUGF0aChrZXkpO1xuICAgICAgICBpZiAoa2V5ID09PSBmYWxzZSkge1xuICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBhY3Rpb25zW1BVU0hdKCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9O1xuXG4gICAgZnVuY3Rpb24gbWF5YmVVbmVzY2FwZVF1b3RlKCkge1xuICAgICAgdmFyIG5leHRDaGFyID0gcGF0aFtpbmRleCArIDFdO1xuICAgICAgaWYgKG1vZGUgPT09IElOX1NJTkdMRV9RVU9URSAmJiBuZXh0Q2hhciA9PT0gXCInXCIgfHwgbW9kZSA9PT0gSU5fRE9VQkxFX1FVT1RFICYmIG5leHRDaGFyID09PSAnXCInKSB7XG4gICAgICAgIGluZGV4Kys7XG4gICAgICAgIG5ld0NoYXIgPSAnXFxcXCcgKyBuZXh0Q2hhcjtcbiAgICAgICAgYWN0aW9uc1tBUFBFTkRdKCk7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfVxuICAgIH1cblxuICAgIHdoaWxlIChtb2RlICE9IG51bGwpIHtcbiAgICAgIGluZGV4Kys7XG4gICAgICBjID0gcGF0aFtpbmRleF07XG5cbiAgICAgIGlmIChjID09PSAnXFxcXCcgJiYgbWF5YmVVbmVzY2FwZVF1b3RlKCkpIHtcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG5cbiAgICAgIHR5cGUgPSBnZXRQYXRoQ2hhclR5cGUoYyk7XG4gICAgICB0eXBlTWFwID0gcGF0aFN0YXRlTWFjaGluZVttb2RlXTtcbiAgICAgIHRyYW5zaXRpb24gPSB0eXBlTWFwW3R5cGVdIHx8IHR5cGVNYXBbJ2Vsc2UnXSB8fCBFUlJPUjtcblxuICAgICAgaWYgKHRyYW5zaXRpb24gPT09IEVSUk9SKSB7XG4gICAgICAgIHJldHVybjsgLy8gcGFyc2UgZXJyb3JcbiAgICAgIH1cblxuICAgICAgbW9kZSA9IHRyYW5zaXRpb25bMF07XG4gICAgICBhY3Rpb24gPSBhY3Rpb25zW3RyYW5zaXRpb25bMV1dO1xuICAgICAgaWYgKGFjdGlvbikge1xuICAgICAgICBuZXdDaGFyID0gdHJhbnNpdGlvblsyXTtcbiAgICAgICAgbmV3Q2hhciA9IG5ld0NoYXIgPT09IHVuZGVmaW5lZCA/IGMgOiBuZXdDaGFyO1xuICAgICAgICBpZiAoYWN0aW9uKCkgPT09IGZhbHNlKSB7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmIChtb2RlID09PSBBRlRFUl9QQVRIKSB7XG4gICAgICAgIGtleXMucmF3ID0gcGF0aDtcbiAgICAgICAgcmV0dXJuIGtleXM7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEV4dGVybmFsIHBhcnNlIHRoYXQgY2hlY2sgZm9yIGEgY2FjaGUgaGl0IGZpcnN0XG4gICAqXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBwYXRoXG4gICAqIEByZXR1cm4ge0FycmF5fHVuZGVmaW5lZH1cbiAgICovXG5cbiAgZnVuY3Rpb24gcGFyc2VQYXRoKHBhdGgpIHtcbiAgICB2YXIgaGl0ID0gcGF0aENhY2hlLmdldChwYXRoKTtcbiAgICBpZiAoIWhpdCkge1xuICAgICAgaGl0ID0gcGFyc2UocGF0aCk7XG4gICAgICBpZiAoaGl0KSB7XG4gICAgICAgIHBhdGhDYWNoZS5wdXQocGF0aCwgaGl0KTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGhpdDtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgZnJvbSBhbiBvYmplY3QgZnJvbSBhIHBhdGggc3RyaW5nXG4gICAqXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBvYmpcbiAgICogQHBhcmFtIHtTdHJpbmd9IHBhdGhcbiAgICovXG5cbiAgZnVuY3Rpb24gZ2V0UGF0aChvYmosIHBhdGgpIHtcbiAgICByZXR1cm4gcGFyc2VFeHByZXNzaW9uKHBhdGgpLmdldChvYmopO1xuICB9XG5cbiAgLyoqXG4gICAqIFdhcm4gYWdhaW5zdCBzZXR0aW5nIG5vbi1leGlzdGVudCByb290IHBhdGggb24gYSB2bS5cbiAgICovXG5cbiAgdmFyIHdhcm5Ob25FeGlzdGVudDtcbiAgaWYgKCdkZXZlbG9wbWVudCcgIT09ICdwcm9kdWN0aW9uJykge1xuICAgIHdhcm5Ob25FeGlzdGVudCA9IGZ1bmN0aW9uIChwYXRoLCB2bSkge1xuICAgICAgd2FybignWW91IGFyZSBzZXR0aW5nIGEgbm9uLWV4aXN0ZW50IHBhdGggXCInICsgcGF0aC5yYXcgKyAnXCIgJyArICdvbiBhIHZtIGluc3RhbmNlLiBDb25zaWRlciBwcmUtaW5pdGlhbGl6aW5nIHRoZSBwcm9wZXJ0eSAnICsgJ3dpdGggdGhlIFwiZGF0YVwiIG9wdGlvbiBmb3IgbW9yZSByZWxpYWJsZSByZWFjdGl2aXR5ICcgKyAnYW5kIGJldHRlciBwZXJmb3JtYW5jZS4nLCB2bSk7XG4gICAgfTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTZXQgb24gYW4gb2JqZWN0IGZyb20gYSBwYXRoXG4gICAqXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBvYmpcbiAgICogQHBhcmFtIHtTdHJpbmcgfCBBcnJheX0gcGF0aFxuICAgKiBAcGFyYW0geyp9IHZhbFxuICAgKi9cblxuICBmdW5jdGlvbiBzZXRQYXRoKG9iaiwgcGF0aCwgdmFsKSB7XG4gICAgdmFyIG9yaWdpbmFsID0gb2JqO1xuICAgIGlmICh0eXBlb2YgcGF0aCA9PT0gJ3N0cmluZycpIHtcbiAgICAgIHBhdGggPSBwYXJzZShwYXRoKTtcbiAgICB9XG4gICAgaWYgKCFwYXRoIHx8ICFpc09iamVjdChvYmopKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIHZhciBsYXN0LCBrZXk7XG4gICAgZm9yICh2YXIgaSA9IDAsIGwgPSBwYXRoLmxlbmd0aDsgaSA8IGw7IGkrKykge1xuICAgICAgbGFzdCA9IG9iajtcbiAgICAgIGtleSA9IHBhdGhbaV07XG4gICAgICBpZiAoa2V5LmNoYXJBdCgwKSA9PT0gJyonKSB7XG4gICAgICAgIGtleSA9IHBhcnNlRXhwcmVzc2lvbihrZXkuc2xpY2UoMSkpLmdldC5jYWxsKG9yaWdpbmFsLCBvcmlnaW5hbCk7XG4gICAgICB9XG4gICAgICBpZiAoaSA8IGwgLSAxKSB7XG4gICAgICAgIG9iaiA9IG9ialtrZXldO1xuICAgICAgICBpZiAoIWlzT2JqZWN0KG9iaikpIHtcbiAgICAgICAgICBvYmogPSB7fTtcbiAgICAgICAgICBpZiAoJ2RldmVsb3BtZW50JyAhPT0gJ3Byb2R1Y3Rpb24nICYmIGxhc3QuX2lzVnVlKSB7XG4gICAgICAgICAgICB3YXJuTm9uRXhpc3RlbnQocGF0aCwgbGFzdCk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHNldChsYXN0LCBrZXksIG9iaik7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGlmIChpc0FycmF5KG9iaikpIHtcbiAgICAgICAgICBvYmouJHNldChrZXksIHZhbCk7XG4gICAgICAgIH0gZWxzZSBpZiAoa2V5IGluIG9iaikge1xuICAgICAgICAgIG9ialtrZXldID0gdmFsO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGlmICgnZGV2ZWxvcG1lbnQnICE9PSAncHJvZHVjdGlvbicgJiYgb2JqLl9pc1Z1ZSkge1xuICAgICAgICAgICAgd2Fybk5vbkV4aXN0ZW50KHBhdGgsIG9iaik7XG4gICAgICAgICAgfVxuICAgICAgICAgIHNldChvYmosIGtleSwgdmFsKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG52YXIgcGF0aCA9IE9iamVjdC5mcmVlemUoe1xuICAgIHBhcnNlUGF0aDogcGFyc2VQYXRoLFxuICAgIGdldFBhdGg6IGdldFBhdGgsXG4gICAgc2V0UGF0aDogc2V0UGF0aFxuICB9KTtcblxuICB2YXIgZXhwcmVzc2lvbkNhY2hlID0gbmV3IENhY2hlKDEwMDApO1xuXG4gIHZhciBhbGxvd2VkS2V5d29yZHMgPSAnTWF0aCxEYXRlLHRoaXMsdHJ1ZSxmYWxzZSxudWxsLHVuZGVmaW5lZCxJbmZpbml0eSxOYU4sJyArICdpc05hTixpc0Zpbml0ZSxkZWNvZGVVUkksZGVjb2RlVVJJQ29tcG9uZW50LGVuY29kZVVSSSwnICsgJ2VuY29kZVVSSUNvbXBvbmVudCxwYXJzZUludCxwYXJzZUZsb2F0JztcbiAgdmFyIGFsbG93ZWRLZXl3b3Jkc1JFID0gbmV3IFJlZ0V4cCgnXignICsgYWxsb3dlZEtleXdvcmRzLnJlcGxhY2UoLywvZywgJ1xcXFxifCcpICsgJ1xcXFxiKScpO1xuXG4gIC8vIGtleXdvcmRzIHRoYXQgZG9uJ3QgbWFrZSBzZW5zZSBpbnNpZGUgZXhwcmVzc2lvbnNcbiAgdmFyIGltcHJvcGVyS2V5d29yZHMgPSAnYnJlYWssY2FzZSxjbGFzcyxjYXRjaCxjb25zdCxjb250aW51ZSxkZWJ1Z2dlcixkZWZhdWx0LCcgKyAnZGVsZXRlLGRvLGVsc2UsZXhwb3J0LGV4dGVuZHMsZmluYWxseSxmb3IsZnVuY3Rpb24saWYsJyArICdpbXBvcnQsaW4saW5zdGFuY2VvZixsZXQscmV0dXJuLHN1cGVyLHN3aXRjaCx0aHJvdyx0cnksJyArICd2YXIsd2hpbGUsd2l0aCx5aWVsZCxlbnVtLGF3YWl0LGltcGxlbWVudHMscGFja2FnZSwnICsgJ3Byb3RlY3RlZCxzdGF0aWMsaW50ZXJmYWNlLHByaXZhdGUscHVibGljJztcbiAgdmFyIGltcHJvcGVyS2V5d29yZHNSRSA9IG5ldyBSZWdFeHAoJ14oJyArIGltcHJvcGVyS2V5d29yZHMucmVwbGFjZSgvLC9nLCAnXFxcXGJ8JykgKyAnXFxcXGIpJyk7XG5cbiAgdmFyIHdzUkUgPSAvXFxzL2c7XG4gIHZhciBuZXdsaW5lUkUgPSAvXFxuL2c7XG4gIHZhciBzYXZlUkUgPSAvW1xceyxdXFxzKltcXHdcXCRfXStcXHMqOnwoJyg/OlteJ1xcXFxdfFxcXFwuKSonfFwiKD86W15cIlxcXFxdfFxcXFwuKSpcInxgKD86W15gXFxcXF18XFxcXC4pKlxcJFxce3xcXH0oPzpbXmBcXFxcXXxcXFxcLikqYHxgKD86W15gXFxcXF18XFxcXC4pKmApfG5ldyB8dHlwZW9mIHx2b2lkIC9nO1xuICB2YXIgcmVzdG9yZVJFID0gL1wiKFxcZCspXCIvZztcbiAgdmFyIHBhdGhUZXN0UkUgPSAvXltBLVphLXpfJF1bXFx3JF0qKD86XFwuW0EtWmEtel8kXVtcXHckXSp8XFxbJy4qPydcXF18XFxbXCIuKj9cIlxcXXxcXFtcXGQrXFxdfFxcW1tBLVphLXpfJF1bXFx3JF0qXFxdKSokLztcbiAgdmFyIGlkZW50UkUgPSAvW15cXHckXFwuXSg/OltBLVphLXpfJF1bXFx3JF0qKS9nO1xuICB2YXIgYm9vbGVhbkxpdGVyYWxSRSA9IC9eKD86dHJ1ZXxmYWxzZSkkLztcblxuICAvKipcbiAgICogU2F2ZSAvIFJld3JpdGUgLyBSZXN0b3JlXG4gICAqXG4gICAqIFdoZW4gcmV3cml0aW5nIHBhdGhzIGZvdW5kIGluIGFuIGV4cHJlc3Npb24sIGl0IGlzXG4gICAqIHBvc3NpYmxlIGZvciB0aGUgc2FtZSBsZXR0ZXIgc2VxdWVuY2VzIHRvIGJlIGZvdW5kIGluXG4gICAqIHN0cmluZ3MgYW5kIE9iamVjdCBsaXRlcmFsIHByb3BlcnR5IGtleXMuIFRoZXJlZm9yZSB3ZVxuICAgKiByZW1vdmUgYW5kIHN0b3JlIHRoZXNlIHBhcnRzIGluIGEgdGVtcG9yYXJ5IGFycmF5LCBhbmRcbiAgICogcmVzdG9yZSB0aGVtIGFmdGVyIHRoZSBwYXRoIHJld3JpdGUuXG4gICAqL1xuXG4gIHZhciBzYXZlZCA9IFtdO1xuXG4gIC8qKlxuICAgKiBTYXZlIHJlcGxhY2VyXG4gICAqXG4gICAqIFRoZSBzYXZlIHJlZ2V4IGNhbiBtYXRjaCB0d28gcG9zc2libGUgY2FzZXM6XG4gICAqIDEuIEFuIG9wZW5pbmcgb2JqZWN0IGxpdGVyYWxcbiAgICogMi4gQSBzdHJpbmdcbiAgICogSWYgbWF0Y2hlZCBhcyBhIHBsYWluIHN0cmluZywgd2UgbmVlZCB0byBlc2NhcGUgaXRzXG4gICAqIG5ld2xpbmVzLCBzaW5jZSB0aGUgc3RyaW5nIG5lZWRzIHRvIGJlIHByZXNlcnZlZCB3aGVuXG4gICAqIGdlbmVyYXRpbmcgdGhlIGZ1bmN0aW9uIGJvZHkuXG4gICAqXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBzdHJcbiAgICogQHBhcmFtIHtTdHJpbmd9IGlzU3RyaW5nIC0gc3RyIGlmIG1hdGNoZWQgYXMgYSBzdHJpbmdcbiAgICogQHJldHVybiB7U3RyaW5nfSAtIHBsYWNlaG9sZGVyIHdpdGggaW5kZXhcbiAgICovXG5cbiAgZnVuY3Rpb24gc2F2ZShzdHIsIGlzU3RyaW5nKSB7XG4gICAgdmFyIGkgPSBzYXZlZC5sZW5ndGg7XG4gICAgc2F2ZWRbaV0gPSBpc1N0cmluZyA/IHN0ci5yZXBsYWNlKG5ld2xpbmVSRSwgJ1xcXFxuJykgOiBzdHI7XG4gICAgcmV0dXJuICdcIicgKyBpICsgJ1wiJztcbiAgfVxuXG4gIC8qKlxuICAgKiBQYXRoIHJld3JpdGUgcmVwbGFjZXJcbiAgICpcbiAgICogQHBhcmFtIHtTdHJpbmd9IHJhd1xuICAgKiBAcmV0dXJuIHtTdHJpbmd9XG4gICAqL1xuXG4gIGZ1bmN0aW9uIHJld3JpdGUocmF3KSB7XG4gICAgdmFyIGMgPSByYXcuY2hhckF0KDApO1xuICAgIHZhciBwYXRoID0gcmF3LnNsaWNlKDEpO1xuICAgIGlmIChhbGxvd2VkS2V5d29yZHNSRS50ZXN0KHBhdGgpKSB7XG4gICAgICByZXR1cm4gcmF3O1xuICAgIH0gZWxzZSB7XG4gICAgICBwYXRoID0gcGF0aC5pbmRleE9mKCdcIicpID4gLTEgPyBwYXRoLnJlcGxhY2UocmVzdG9yZVJFLCByZXN0b3JlKSA6IHBhdGg7XG4gICAgICByZXR1cm4gYyArICdzY29wZS4nICsgcGF0aDtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogUmVzdG9yZSByZXBsYWNlclxuICAgKlxuICAgKiBAcGFyYW0ge1N0cmluZ30gc3RyXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBpIC0gbWF0Y2hlZCBzYXZlIGluZGV4XG4gICAqIEByZXR1cm4ge1N0cmluZ31cbiAgICovXG5cbiAgZnVuY3Rpb24gcmVzdG9yZShzdHIsIGkpIHtcbiAgICByZXR1cm4gc2F2ZWRbaV07XG4gIH1cblxuICAvKipcbiAgICogUmV3cml0ZSBhbiBleHByZXNzaW9uLCBwcmVmaXhpbmcgYWxsIHBhdGggYWNjZXNzb3JzIHdpdGhcbiAgICogYHNjb3BlLmAgYW5kIGdlbmVyYXRlIGdldHRlci9zZXR0ZXIgZnVuY3Rpb25zLlxuICAgKlxuICAgKiBAcGFyYW0ge1N0cmluZ30gZXhwXG4gICAqIEByZXR1cm4ge0Z1bmN0aW9ufVxuICAgKi9cblxuICBmdW5jdGlvbiBjb21waWxlR2V0dGVyKGV4cCkge1xuICAgIGlmIChpbXByb3BlcktleXdvcmRzUkUudGVzdChleHApKSB7XG4gICAgICAnZGV2ZWxvcG1lbnQnICE9PSAncHJvZHVjdGlvbicgJiYgd2FybignQXZvaWQgdXNpbmcgcmVzZXJ2ZWQga2V5d29yZHMgaW4gZXhwcmVzc2lvbjogJyArIGV4cCk7XG4gICAgfVxuICAgIC8vIHJlc2V0IHN0YXRlXG4gICAgc2F2ZWQubGVuZ3RoID0gMDtcbiAgICAvLyBzYXZlIHN0cmluZ3MgYW5kIG9iamVjdCBsaXRlcmFsIGtleXNcbiAgICB2YXIgYm9keSA9IGV4cC5yZXBsYWNlKHNhdmVSRSwgc2F2ZSkucmVwbGFjZSh3c1JFLCAnJyk7XG4gICAgLy8gcmV3cml0ZSBhbGwgcGF0aHNcbiAgICAvLyBwYWQgMSBzcGFjZSBoZXJlIGJlY2F1ZSB0aGUgcmVnZXggbWF0Y2hlcyAxIGV4dHJhIGNoYXJcbiAgICBib2R5ID0gKCcgJyArIGJvZHkpLnJlcGxhY2UoaWRlbnRSRSwgcmV3cml0ZSkucmVwbGFjZShyZXN0b3JlUkUsIHJlc3RvcmUpO1xuICAgIHJldHVybiBtYWtlR2V0dGVyRm4oYm9keSk7XG4gIH1cblxuICAvKipcbiAgICogQnVpbGQgYSBnZXR0ZXIgZnVuY3Rpb24uIFJlcXVpcmVzIGV2YWwuXG4gICAqXG4gICAqIFdlIGlzb2xhdGUgdGhlIHRyeS9jYXRjaCBzbyBpdCBkb2Vzbid0IGFmZmVjdCB0aGVcbiAgICogb3B0aW1pemF0aW9uIG9mIHRoZSBwYXJzZSBmdW5jdGlvbiB3aGVuIGl0IGlzIG5vdCBjYWxsZWQuXG4gICAqXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBib2R5XG4gICAqIEByZXR1cm4ge0Z1bmN0aW9ufHVuZGVmaW5lZH1cbiAgICovXG5cbiAgZnVuY3Rpb24gbWFrZUdldHRlckZuKGJvZHkpIHtcbiAgICB0cnkge1xuICAgICAgLyogZXNsaW50LWRpc2FibGUgbm8tbmV3LWZ1bmMgKi9cbiAgICAgIHJldHVybiBuZXcgRnVuY3Rpb24oJ3Njb3BlJywgJ3JldHVybiAnICsgYm9keSArICc7Jyk7XG4gICAgICAvKiBlc2xpbnQtZW5hYmxlIG5vLW5ldy1mdW5jICovXG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgJ2RldmVsb3BtZW50JyAhPT0gJ3Byb2R1Y3Rpb24nICYmIHdhcm4oJ0ludmFsaWQgZXhwcmVzc2lvbi4gJyArICdHZW5lcmF0ZWQgZnVuY3Rpb24gYm9keTogJyArIGJvZHkpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBDb21waWxlIGEgc2V0dGVyIGZ1bmN0aW9uIGZvciB0aGUgZXhwcmVzc2lvbi5cbiAgICpcbiAgICogQHBhcmFtIHtTdHJpbmd9IGV4cFxuICAgKiBAcmV0dXJuIHtGdW5jdGlvbnx1bmRlZmluZWR9XG4gICAqL1xuXG4gIGZ1bmN0aW9uIGNvbXBpbGVTZXR0ZXIoZXhwKSB7XG4gICAgdmFyIHBhdGggPSBwYXJzZVBhdGgoZXhwKTtcbiAgICBpZiAocGF0aCkge1xuICAgICAgcmV0dXJuIGZ1bmN0aW9uIChzY29wZSwgdmFsKSB7XG4gICAgICAgIHNldFBhdGgoc2NvcGUsIHBhdGgsIHZhbCk7XG4gICAgICB9O1xuICAgIH0gZWxzZSB7XG4gICAgICAnZGV2ZWxvcG1lbnQnICE9PSAncHJvZHVjdGlvbicgJiYgd2FybignSW52YWxpZCBzZXR0ZXIgZXhwcmVzc2lvbjogJyArIGV4cCk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFBhcnNlIGFuIGV4cHJlc3Npb24gaW50byByZS13cml0dGVuIGdldHRlci9zZXR0ZXJzLlxuICAgKlxuICAgKiBAcGFyYW0ge1N0cmluZ30gZXhwXG4gICAqIEBwYXJhbSB7Qm9vbGVhbn0gbmVlZFNldFxuICAgKiBAcmV0dXJuIHtGdW5jdGlvbn1cbiAgICovXG5cbiAgZnVuY3Rpb24gcGFyc2VFeHByZXNzaW9uKGV4cCwgbmVlZFNldCkge1xuICAgIGV4cCA9IGV4cC50cmltKCk7XG4gICAgLy8gdHJ5IGNhY2hlXG4gICAgdmFyIGhpdCA9IGV4cHJlc3Npb25DYWNoZS5nZXQoZXhwKTtcbiAgICBpZiAoaGl0KSB7XG4gICAgICBpZiAobmVlZFNldCAmJiAhaGl0LnNldCkge1xuICAgICAgICBoaXQuc2V0ID0gY29tcGlsZVNldHRlcihoaXQuZXhwKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBoaXQ7XG4gICAgfVxuICAgIHZhciByZXMgPSB7IGV4cDogZXhwIH07XG4gICAgcmVzLmdldCA9IGlzU2ltcGxlUGF0aChleHApICYmIGV4cC5pbmRleE9mKCdbJykgPCAwXG4gICAgLy8gb3B0aW1pemVkIHN1cGVyIHNpbXBsZSBnZXR0ZXJcbiAgICA/IG1ha2VHZXR0ZXJGbignc2NvcGUuJyArIGV4cClcbiAgICAvLyBkeW5hbWljIGdldHRlclxuICAgIDogY29tcGlsZUdldHRlcihleHApO1xuICAgIGlmIChuZWVkU2V0KSB7XG4gICAgICByZXMuc2V0ID0gY29tcGlsZVNldHRlcihleHApO1xuICAgIH1cbiAgICBleHByZXNzaW9uQ2FjaGUucHV0KGV4cCwgcmVzKTtcbiAgICByZXR1cm4gcmVzO1xuICB9XG5cbiAgLyoqXG4gICAqIENoZWNrIGlmIGFuIGV4cHJlc3Npb24gaXMgYSBzaW1wbGUgcGF0aC5cbiAgICpcbiAgICogQHBhcmFtIHtTdHJpbmd9IGV4cFxuICAgKiBAcmV0dXJuIHtCb29sZWFufVxuICAgKi9cblxuICBmdW5jdGlvbiBpc1NpbXBsZVBhdGgoZXhwKSB7XG4gICAgcmV0dXJuIHBhdGhUZXN0UkUudGVzdChleHApICYmXG4gICAgLy8gZG9uJ3QgdHJlYXQgdHJ1ZS9mYWxzZSBhcyBwYXRoc1xuICAgICFib29sZWFuTGl0ZXJhbFJFLnRlc3QoZXhwKSAmJlxuICAgIC8vIE1hdGggY29uc3RhbnRzIGUuZy4gTWF0aC5QSSwgTWF0aC5FIGV0Yy5cbiAgICBleHAuc2xpY2UoMCwgNSkgIT09ICdNYXRoLic7XG4gIH1cblxudmFyIGV4cHJlc3Npb24gPSBPYmplY3QuZnJlZXplKHtcbiAgICBwYXJzZUV4cHJlc3Npb246IHBhcnNlRXhwcmVzc2lvbixcbiAgICBpc1NpbXBsZVBhdGg6IGlzU2ltcGxlUGF0aFxuICB9KTtcblxuICAvLyB3ZSBoYXZlIHR3byBzZXBhcmF0ZSBxdWV1ZXM6IG9uZSBmb3IgZGlyZWN0aXZlIHVwZGF0ZXNcbiAgLy8gYW5kIG9uZSBmb3IgdXNlciB3YXRjaGVyIHJlZ2lzdGVyZWQgdmlhICR3YXRjaCgpLlxuICAvLyB3ZSB3YW50IHRvIGd1YXJhbnRlZSBkaXJlY3RpdmUgdXBkYXRlcyB0byBiZSBjYWxsZWRcbiAgLy8gYmVmb3JlIHVzZXIgd2F0Y2hlcnMgc28gdGhhdCB3aGVuIHVzZXIgd2F0Y2hlcnMgYXJlXG4gIC8vIHRyaWdnZXJlZCwgdGhlIERPTSB3b3VsZCBoYXZlIGFscmVhZHkgYmVlbiBpbiB1cGRhdGVkXG4gIC8vIHN0YXRlLlxuXG4gIHZhciBxdWV1ZSA9IFtdO1xuICB2YXIgdXNlclF1ZXVlID0gW107XG4gIHZhciBoYXMgPSB7fTtcbiAgdmFyIGNpcmN1bGFyID0ge307XG4gIHZhciB3YWl0aW5nID0gZmFsc2U7XG5cbiAgLyoqXG4gICAqIFJlc2V0IHRoZSBiYXRjaGVyJ3Mgc3RhdGUuXG4gICAqL1xuXG4gIGZ1bmN0aW9uIHJlc2V0QmF0Y2hlclN0YXRlKCkge1xuICAgIHF1ZXVlLmxlbmd0aCA9IDA7XG4gICAgdXNlclF1ZXVlLmxlbmd0aCA9IDA7XG4gICAgaGFzID0ge307XG4gICAgY2lyY3VsYXIgPSB7fTtcbiAgICB3YWl0aW5nID0gZmFsc2U7XG4gIH1cblxuICAvKipcbiAgICogRmx1c2ggYm90aCBxdWV1ZXMgYW5kIHJ1biB0aGUgd2F0Y2hlcnMuXG4gICAqL1xuXG4gIGZ1bmN0aW9uIGZsdXNoQmF0Y2hlclF1ZXVlKCkge1xuICAgIHZhciBfYWdhaW4gPSB0cnVlO1xuXG4gICAgX2Z1bmN0aW9uOiB3aGlsZSAoX2FnYWluKSB7XG4gICAgICBfYWdhaW4gPSBmYWxzZTtcblxuICAgICAgcnVuQmF0Y2hlclF1ZXVlKHF1ZXVlKTtcbiAgICAgIHJ1bkJhdGNoZXJRdWV1ZSh1c2VyUXVldWUpO1xuICAgICAgLy8gdXNlciB3YXRjaGVycyB0cmlnZ2VyZWQgbW9yZSB3YXRjaGVycyxcbiAgICAgIC8vIGtlZXAgZmx1c2hpbmcgdW50aWwgaXQgZGVwbGV0ZXNcbiAgICAgIGlmIChxdWV1ZS5sZW5ndGgpIHtcbiAgICAgICAgX2FnYWluID0gdHJ1ZTtcbiAgICAgICAgY29udGludWUgX2Z1bmN0aW9uO1xuICAgICAgfVxuICAgICAgLy8gZGV2IHRvb2wgaG9va1xuICAgICAgLyogaXN0YW5idWwgaWdub3JlIGlmICovXG4gICAgICBpZiAoZGV2dG9vbHMgJiYgY29uZmlnLmRldnRvb2xzKSB7XG4gICAgICAgIGRldnRvb2xzLmVtaXQoJ2ZsdXNoJyk7XG4gICAgICB9XG4gICAgICByZXNldEJhdGNoZXJTdGF0ZSgpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBSdW4gdGhlIHdhdGNoZXJzIGluIGEgc2luZ2xlIHF1ZXVlLlxuICAgKlxuICAgKiBAcGFyYW0ge0FycmF5fSBxdWV1ZVxuICAgKi9cblxuICBmdW5jdGlvbiBydW5CYXRjaGVyUXVldWUocXVldWUpIHtcbiAgICAvLyBkbyBub3QgY2FjaGUgbGVuZ3RoIGJlY2F1c2UgbW9yZSB3YXRjaGVycyBtaWdodCBiZSBwdXNoZWRcbiAgICAvLyBhcyB3ZSBydW4gZXhpc3Rpbmcgd2F0Y2hlcnNcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHF1ZXVlLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgd2F0Y2hlciA9IHF1ZXVlW2ldO1xuICAgICAgdmFyIGlkID0gd2F0Y2hlci5pZDtcbiAgICAgIGhhc1tpZF0gPSBudWxsO1xuICAgICAgd2F0Y2hlci5ydW4oKTtcbiAgICAgIC8vIGluIGRldiBidWlsZCwgY2hlY2sgYW5kIHN0b3AgY2lyY3VsYXIgdXBkYXRlcy5cbiAgICAgIGlmICgnZGV2ZWxvcG1lbnQnICE9PSAncHJvZHVjdGlvbicgJiYgaGFzW2lkXSAhPSBudWxsKSB7XG4gICAgICAgIGNpcmN1bGFyW2lkXSA9IChjaXJjdWxhcltpZF0gfHwgMCkgKyAxO1xuICAgICAgICBpZiAoY2lyY3VsYXJbaWRdID4gY29uZmlnLl9tYXhVcGRhdGVDb3VudCkge1xuICAgICAgICAgIHdhcm4oJ1lvdSBtYXkgaGF2ZSBhbiBpbmZpbml0ZSB1cGRhdGUgbG9vcCBmb3Igd2F0Y2hlciAnICsgJ3dpdGggZXhwcmVzc2lvbiBcIicgKyB3YXRjaGVyLmV4cHJlc3Npb24gKyAnXCInLCB3YXRjaGVyLnZtKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICBxdWV1ZS5sZW5ndGggPSAwO1xuICB9XG5cbiAgLyoqXG4gICAqIFB1c2ggYSB3YXRjaGVyIGludG8gdGhlIHdhdGNoZXIgcXVldWUuXG4gICAqIEpvYnMgd2l0aCBkdXBsaWNhdGUgSURzIHdpbGwgYmUgc2tpcHBlZCB1bmxlc3MgaXQnc1xuICAgKiBwdXNoZWQgd2hlbiB0aGUgcXVldWUgaXMgYmVpbmcgZmx1c2hlZC5cbiAgICpcbiAgICogQHBhcmFtIHtXYXRjaGVyfSB3YXRjaGVyXG4gICAqICAgcHJvcGVydGllczpcbiAgICogICAtIHtOdW1iZXJ9IGlkXG4gICAqICAgLSB7RnVuY3Rpb259IHJ1blxuICAgKi9cblxuICBmdW5jdGlvbiBwdXNoV2F0Y2hlcih3YXRjaGVyKSB7XG4gICAgdmFyIGlkID0gd2F0Y2hlci5pZDtcbiAgICBpZiAoaGFzW2lkXSA9PSBudWxsKSB7XG4gICAgICAvLyBwdXNoIHdhdGNoZXIgaW50byBhcHByb3ByaWF0ZSBxdWV1ZVxuICAgICAgdmFyIHEgPSB3YXRjaGVyLnVzZXIgPyB1c2VyUXVldWUgOiBxdWV1ZTtcbiAgICAgIGhhc1tpZF0gPSBxLmxlbmd0aDtcbiAgICAgIHEucHVzaCh3YXRjaGVyKTtcbiAgICAgIC8vIHF1ZXVlIHRoZSBmbHVzaFxuICAgICAgaWYgKCF3YWl0aW5nKSB7XG4gICAgICAgIHdhaXRpbmcgPSB0cnVlO1xuICAgICAgICBuZXh0VGljayhmbHVzaEJhdGNoZXJRdWV1ZSk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgdmFyIHVpZCQyID0gMDtcblxuICAvKipcbiAgICogQSB3YXRjaGVyIHBhcnNlcyBhbiBleHByZXNzaW9uLCBjb2xsZWN0cyBkZXBlbmRlbmNpZXMsXG4gICAqIGFuZCBmaXJlcyBjYWxsYmFjayB3aGVuIHRoZSBleHByZXNzaW9uIHZhbHVlIGNoYW5nZXMuXG4gICAqIFRoaXMgaXMgdXNlZCBmb3IgYm90aCB0aGUgJHdhdGNoKCkgYXBpIGFuZCBkaXJlY3RpdmVzLlxuICAgKlxuICAgKiBAcGFyYW0ge1Z1ZX0gdm1cbiAgICogQHBhcmFtIHtTdHJpbmd8RnVuY3Rpb259IGV4cE9yRm5cbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gY2JcbiAgICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnNcbiAgICogICAgICAgICAgICAgICAgIC0ge0FycmF5fSBmaWx0ZXJzXG4gICAqICAgICAgICAgICAgICAgICAtIHtCb29sZWFufSB0d29XYXlcbiAgICogICAgICAgICAgICAgICAgIC0ge0Jvb2xlYW59IGRlZXBcbiAgICogICAgICAgICAgICAgICAgIC0ge0Jvb2xlYW59IHVzZXJcbiAgICogICAgICAgICAgICAgICAgIC0ge0Jvb2xlYW59IHN5bmNcbiAgICogICAgICAgICAgICAgICAgIC0ge0Jvb2xlYW59IGxhenlcbiAgICogICAgICAgICAgICAgICAgIC0ge0Z1bmN0aW9ufSBbcHJlUHJvY2Vzc11cbiAgICogICAgICAgICAgICAgICAgIC0ge0Z1bmN0aW9ufSBbcG9zdFByb2Nlc3NdXG4gICAqIEBjb25zdHJ1Y3RvclxuICAgKi9cbiAgZnVuY3Rpb24gV2F0Y2hlcih2bSwgZXhwT3JGbiwgY2IsIG9wdGlvbnMpIHtcbiAgICAvLyBtaXggaW4gb3B0aW9uc1xuICAgIGlmIChvcHRpb25zKSB7XG4gICAgICBleHRlbmQodGhpcywgb3B0aW9ucyk7XG4gICAgfVxuICAgIHZhciBpc0ZuID0gdHlwZW9mIGV4cE9yRm4gPT09ICdmdW5jdGlvbic7XG4gICAgdGhpcy52bSA9IHZtO1xuICAgIHZtLl93YXRjaGVycy5wdXNoKHRoaXMpO1xuICAgIHRoaXMuZXhwcmVzc2lvbiA9IGV4cE9yRm47XG4gICAgdGhpcy5jYiA9IGNiO1xuICAgIHRoaXMuaWQgPSArK3VpZCQyOyAvLyB1aWQgZm9yIGJhdGNoaW5nXG4gICAgdGhpcy5hY3RpdmUgPSB0cnVlO1xuICAgIHRoaXMuZGlydHkgPSB0aGlzLmxhenk7IC8vIGZvciBsYXp5IHdhdGNoZXJzXG4gICAgdGhpcy5kZXBzID0gW107XG4gICAgdGhpcy5uZXdEZXBzID0gW107XG4gICAgdGhpcy5kZXBJZHMgPSBuZXcgX1NldCgpO1xuICAgIHRoaXMubmV3RGVwSWRzID0gbmV3IF9TZXQoKTtcbiAgICB0aGlzLnByZXZFcnJvciA9IG51bGw7IC8vIGZvciBhc3luYyBlcnJvciBzdGFja3NcbiAgICAvLyBwYXJzZSBleHByZXNzaW9uIGZvciBnZXR0ZXIvc2V0dGVyXG4gICAgaWYgKGlzRm4pIHtcbiAgICAgIHRoaXMuZ2V0dGVyID0gZXhwT3JGbjtcbiAgICAgIHRoaXMuc2V0dGVyID0gdW5kZWZpbmVkO1xuICAgIH0gZWxzZSB7XG4gICAgICB2YXIgcmVzID0gcGFyc2VFeHByZXNzaW9uKGV4cE9yRm4sIHRoaXMudHdvV2F5KTtcbiAgICAgIHRoaXMuZ2V0dGVyID0gcmVzLmdldDtcbiAgICAgIHRoaXMuc2V0dGVyID0gcmVzLnNldDtcbiAgICB9XG4gICAgdGhpcy52YWx1ZSA9IHRoaXMubGF6eSA/IHVuZGVmaW5lZCA6IHRoaXMuZ2V0KCk7XG4gICAgLy8gc3RhdGUgZm9yIGF2b2lkaW5nIGZhbHNlIHRyaWdnZXJzIGZvciBkZWVwIGFuZCBBcnJheVxuICAgIC8vIHdhdGNoZXJzIGR1cmluZyB2bS5fZGlnZXN0KClcbiAgICB0aGlzLnF1ZXVlZCA9IHRoaXMuc2hhbGxvdyA9IGZhbHNlO1xuICB9XG5cbiAgLyoqXG4gICAqIEV2YWx1YXRlIHRoZSBnZXR0ZXIsIGFuZCByZS1jb2xsZWN0IGRlcGVuZGVuY2llcy5cbiAgICovXG5cbiAgV2F0Y2hlci5wcm90b3R5cGUuZ2V0ID0gZnVuY3Rpb24gKCkge1xuICAgIHRoaXMuYmVmb3JlR2V0KCk7XG4gICAgdmFyIHNjb3BlID0gdGhpcy5zY29wZSB8fCB0aGlzLnZtO1xuICAgIHZhciB2YWx1ZTtcbiAgICB0cnkge1xuICAgICAgdmFsdWUgPSB0aGlzLmdldHRlci5jYWxsKHNjb3BlLCBzY29wZSk7XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgaWYgKCdkZXZlbG9wbWVudCcgIT09ICdwcm9kdWN0aW9uJyAmJiBjb25maWcud2FybkV4cHJlc3Npb25FcnJvcnMpIHtcbiAgICAgICAgd2FybignRXJyb3Igd2hlbiBldmFsdWF0aW5nIGV4cHJlc3Npb24gJyArICdcIicgKyB0aGlzLmV4cHJlc3Npb24gKyAnXCI6ICcgKyBlLnRvU3RyaW5nKCksIHRoaXMudm0pO1xuICAgICAgfVxuICAgIH1cbiAgICAvLyBcInRvdWNoXCIgZXZlcnkgcHJvcGVydHkgc28gdGhleSBhcmUgYWxsIHRyYWNrZWQgYXNcbiAgICAvLyBkZXBlbmRlbmNpZXMgZm9yIGRlZXAgd2F0Y2hpbmdcbiAgICBpZiAodGhpcy5kZWVwKSB7XG4gICAgICB0cmF2ZXJzZSh2YWx1ZSk7XG4gICAgfVxuICAgIGlmICh0aGlzLnByZVByb2Nlc3MpIHtcbiAgICAgIHZhbHVlID0gdGhpcy5wcmVQcm9jZXNzKHZhbHVlKTtcbiAgICB9XG4gICAgaWYgKHRoaXMuZmlsdGVycykge1xuICAgICAgdmFsdWUgPSBzY29wZS5fYXBwbHlGaWx0ZXJzKHZhbHVlLCBudWxsLCB0aGlzLmZpbHRlcnMsIGZhbHNlKTtcbiAgICB9XG4gICAgaWYgKHRoaXMucG9zdFByb2Nlc3MpIHtcbiAgICAgIHZhbHVlID0gdGhpcy5wb3N0UHJvY2Vzcyh2YWx1ZSk7XG4gICAgfVxuICAgIHRoaXMuYWZ0ZXJHZXQoKTtcbiAgICByZXR1cm4gdmFsdWU7XG4gIH07XG5cbiAgLyoqXG4gICAqIFNldCB0aGUgY29ycmVzcG9uZGluZyB2YWx1ZSB3aXRoIHRoZSBzZXR0ZXIuXG4gICAqXG4gICAqIEBwYXJhbSB7Kn0gdmFsdWVcbiAgICovXG5cbiAgV2F0Y2hlci5wcm90b3R5cGUuc2V0ID0gZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgdmFyIHNjb3BlID0gdGhpcy5zY29wZSB8fCB0aGlzLnZtO1xuICAgIGlmICh0aGlzLmZpbHRlcnMpIHtcbiAgICAgIHZhbHVlID0gc2NvcGUuX2FwcGx5RmlsdGVycyh2YWx1ZSwgdGhpcy52YWx1ZSwgdGhpcy5maWx0ZXJzLCB0cnVlKTtcbiAgICB9XG4gICAgdHJ5IHtcbiAgICAgIHRoaXMuc2V0dGVyLmNhbGwoc2NvcGUsIHNjb3BlLCB2YWx1ZSk7XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgaWYgKCdkZXZlbG9wbWVudCcgIT09ICdwcm9kdWN0aW9uJyAmJiBjb25maWcud2FybkV4cHJlc3Npb25FcnJvcnMpIHtcbiAgICAgICAgd2FybignRXJyb3Igd2hlbiBldmFsdWF0aW5nIHNldHRlciAnICsgJ1wiJyArIHRoaXMuZXhwcmVzc2lvbiArICdcIjogJyArIGUudG9TdHJpbmcoKSwgdGhpcy52bSk7XG4gICAgICB9XG4gICAgfVxuICAgIC8vIHR3by13YXkgc3luYyBmb3Igdi1mb3IgYWxpYXNcbiAgICB2YXIgZm9yQ29udGV4dCA9IHNjb3BlLiRmb3JDb250ZXh0O1xuICAgIGlmIChmb3JDb250ZXh0ICYmIGZvckNvbnRleHQuYWxpYXMgPT09IHRoaXMuZXhwcmVzc2lvbikge1xuICAgICAgaWYgKGZvckNvbnRleHQuZmlsdGVycykge1xuICAgICAgICAnZGV2ZWxvcG1lbnQnICE9PSAncHJvZHVjdGlvbicgJiYgd2FybignSXQgc2VlbXMgeW91IGFyZSB1c2luZyB0d28td2F5IGJpbmRpbmcgb24gJyArICdhIHYtZm9yIGFsaWFzICgnICsgdGhpcy5leHByZXNzaW9uICsgJyksIGFuZCB0aGUgJyArICd2LWZvciBoYXMgZmlsdGVycy4gVGhpcyB3aWxsIG5vdCB3b3JrIHByb3Blcmx5LiAnICsgJ0VpdGhlciByZW1vdmUgdGhlIGZpbHRlcnMgb3IgdXNlIGFuIGFycmF5IG9mICcgKyAnb2JqZWN0cyBhbmQgYmluZCB0byBvYmplY3QgcHJvcGVydGllcyBpbnN0ZWFkLicsIHRoaXMudm0pO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBmb3JDb250ZXh0Ll93aXRoTG9jayhmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmIChzY29wZS4ka2V5KSB7XG4gICAgICAgICAgLy8gb3JpZ2luYWwgaXMgYW4gb2JqZWN0XG4gICAgICAgICAgZm9yQ29udGV4dC5yYXdWYWx1ZVtzY29wZS4ka2V5XSA9IHZhbHVlO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGZvckNvbnRleHQucmF3VmFsdWUuJHNldChzY29wZS4kaW5kZXgsIHZhbHVlKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuICB9O1xuXG4gIC8qKlxuICAgKiBQcmVwYXJlIGZvciBkZXBlbmRlbmN5IGNvbGxlY3Rpb24uXG4gICAqL1xuXG4gIFdhdGNoZXIucHJvdG90eXBlLmJlZm9yZUdldCA9IGZ1bmN0aW9uICgpIHtcbiAgICBEZXAudGFyZ2V0ID0gdGhpcztcbiAgfTtcblxuICAvKipcbiAgICogQWRkIGEgZGVwZW5kZW5jeSB0byB0aGlzIGRpcmVjdGl2ZS5cbiAgICpcbiAgICogQHBhcmFtIHtEZXB9IGRlcFxuICAgKi9cblxuICBXYXRjaGVyLnByb3RvdHlwZS5hZGREZXAgPSBmdW5jdGlvbiAoZGVwKSB7XG4gICAgdmFyIGlkID0gZGVwLmlkO1xuICAgIGlmICghdGhpcy5uZXdEZXBJZHMuaGFzKGlkKSkge1xuICAgICAgdGhpcy5uZXdEZXBJZHMuYWRkKGlkKTtcbiAgICAgIHRoaXMubmV3RGVwcy5wdXNoKGRlcCk7XG4gICAgICBpZiAoIXRoaXMuZGVwSWRzLmhhcyhpZCkpIHtcbiAgICAgICAgZGVwLmFkZFN1Yih0aGlzKTtcbiAgICAgIH1cbiAgICB9XG4gIH07XG5cbiAgLyoqXG4gICAqIENsZWFuIHVwIGZvciBkZXBlbmRlbmN5IGNvbGxlY3Rpb24uXG4gICAqL1xuXG4gIFdhdGNoZXIucHJvdG90eXBlLmFmdGVyR2V0ID0gZnVuY3Rpb24gKCkge1xuICAgIERlcC50YXJnZXQgPSBudWxsO1xuICAgIHZhciBpID0gdGhpcy5kZXBzLmxlbmd0aDtcbiAgICB3aGlsZSAoaS0tKSB7XG4gICAgICB2YXIgZGVwID0gdGhpcy5kZXBzW2ldO1xuICAgICAgaWYgKCF0aGlzLm5ld0RlcElkcy5oYXMoZGVwLmlkKSkge1xuICAgICAgICBkZXAucmVtb3ZlU3ViKHRoaXMpO1xuICAgICAgfVxuICAgIH1cbiAgICB2YXIgdG1wID0gdGhpcy5kZXBJZHM7XG4gICAgdGhpcy5kZXBJZHMgPSB0aGlzLm5ld0RlcElkcztcbiAgICB0aGlzLm5ld0RlcElkcyA9IHRtcDtcbiAgICB0aGlzLm5ld0RlcElkcy5jbGVhcigpO1xuICAgIHRtcCA9IHRoaXMuZGVwcztcbiAgICB0aGlzLmRlcHMgPSB0aGlzLm5ld0RlcHM7XG4gICAgdGhpcy5uZXdEZXBzID0gdG1wO1xuICAgIHRoaXMubmV3RGVwcy5sZW5ndGggPSAwO1xuICB9O1xuXG4gIC8qKlxuICAgKiBTdWJzY3JpYmVyIGludGVyZmFjZS5cbiAgICogV2lsbCBiZSBjYWxsZWQgd2hlbiBhIGRlcGVuZGVuY3kgY2hhbmdlcy5cbiAgICpcbiAgICogQHBhcmFtIHtCb29sZWFufSBzaGFsbG93XG4gICAqL1xuXG4gIFdhdGNoZXIucHJvdG90eXBlLnVwZGF0ZSA9IGZ1bmN0aW9uIChzaGFsbG93KSB7XG4gICAgaWYgKHRoaXMubGF6eSkge1xuICAgICAgdGhpcy5kaXJ0eSA9IHRydWU7XG4gICAgfSBlbHNlIGlmICh0aGlzLnN5bmMgfHwgIWNvbmZpZy5hc3luYykge1xuICAgICAgdGhpcy5ydW4oKTtcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gaWYgcXVldWVkLCBvbmx5IG92ZXJ3cml0ZSBzaGFsbG93IHdpdGggbm9uLXNoYWxsb3csXG4gICAgICAvLyBidXQgbm90IHRoZSBvdGhlciB3YXkgYXJvdW5kLlxuICAgICAgdGhpcy5zaGFsbG93ID0gdGhpcy5xdWV1ZWQgPyBzaGFsbG93ID8gdGhpcy5zaGFsbG93IDogZmFsc2UgOiAhIXNoYWxsb3c7XG4gICAgICB0aGlzLnF1ZXVlZCA9IHRydWU7XG4gICAgICAvLyByZWNvcmQgYmVmb3JlLXB1c2ggZXJyb3Igc3RhY2sgaW4gZGVidWcgbW9kZVxuICAgICAgLyogaXN0YW5idWwgaWdub3JlIGlmICovXG4gICAgICBpZiAoJ2RldmVsb3BtZW50JyAhPT0gJ3Byb2R1Y3Rpb24nICYmIGNvbmZpZy5kZWJ1Zykge1xuICAgICAgICB0aGlzLnByZXZFcnJvciA9IG5ldyBFcnJvcignW3Z1ZV0gYXN5bmMgc3RhY2sgdHJhY2UnKTtcbiAgICAgIH1cbiAgICAgIHB1c2hXYXRjaGVyKHRoaXMpO1xuICAgIH1cbiAgfTtcblxuICAvKipcbiAgICogQmF0Y2hlciBqb2IgaW50ZXJmYWNlLlxuICAgKiBXaWxsIGJlIGNhbGxlZCBieSB0aGUgYmF0Y2hlci5cbiAgICovXG5cbiAgV2F0Y2hlci5wcm90b3R5cGUucnVuID0gZnVuY3Rpb24gKCkge1xuICAgIGlmICh0aGlzLmFjdGl2ZSkge1xuICAgICAgdmFyIHZhbHVlID0gdGhpcy5nZXQoKTtcbiAgICAgIGlmICh2YWx1ZSAhPT0gdGhpcy52YWx1ZSB8fFxuICAgICAgLy8gRGVlcCB3YXRjaGVycyBhbmQgd2F0Y2hlcnMgb24gT2JqZWN0L0FycmF5cyBzaG91bGQgZmlyZSBldmVuXG4gICAgICAvLyB3aGVuIHRoZSB2YWx1ZSBpcyB0aGUgc2FtZSwgYmVjYXVzZSB0aGUgdmFsdWUgbWF5XG4gICAgICAvLyBoYXZlIG11dGF0ZWQ7IGJ1dCBvbmx5IGRvIHNvIGlmIHRoaXMgaXMgYVxuICAgICAgLy8gbm9uLXNoYWxsb3cgdXBkYXRlIChjYXVzZWQgYnkgYSB2bSBkaWdlc3QpLlxuICAgICAgKGlzT2JqZWN0KHZhbHVlKSB8fCB0aGlzLmRlZXApICYmICF0aGlzLnNoYWxsb3cpIHtcbiAgICAgICAgLy8gc2V0IG5ldyB2YWx1ZVxuICAgICAgICB2YXIgb2xkVmFsdWUgPSB0aGlzLnZhbHVlO1xuICAgICAgICB0aGlzLnZhbHVlID0gdmFsdWU7XG4gICAgICAgIC8vIGluIGRlYnVnICsgYXN5bmMgbW9kZSwgd2hlbiBhIHdhdGNoZXIgY2FsbGJhY2tzXG4gICAgICAgIC8vIHRocm93cywgd2UgYWxzbyB0aHJvdyB0aGUgc2F2ZWQgYmVmb3JlLXB1c2ggZXJyb3JcbiAgICAgICAgLy8gc28gdGhlIGZ1bGwgY3Jvc3MtdGljayBzdGFjayB0cmFjZSBpcyBhdmFpbGFibGUuXG4gICAgICAgIHZhciBwcmV2RXJyb3IgPSB0aGlzLnByZXZFcnJvcjtcbiAgICAgICAgLyogaXN0YW5idWwgaWdub3JlIGlmICovXG4gICAgICAgIGlmICgnZGV2ZWxvcG1lbnQnICE9PSAncHJvZHVjdGlvbicgJiYgY29uZmlnLmRlYnVnICYmIHByZXZFcnJvcikge1xuICAgICAgICAgIHRoaXMucHJldkVycm9yID0gbnVsbDtcbiAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgdGhpcy5jYi5jYWxsKHRoaXMudm0sIHZhbHVlLCBvbGRWYWx1ZSk7XG4gICAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgICAgbmV4dFRpY2soZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICB0aHJvdyBwcmV2RXJyb3I7XG4gICAgICAgICAgICB9LCAwKTtcbiAgICAgICAgICAgIHRocm93IGU7XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRoaXMuY2IuY2FsbCh0aGlzLnZtLCB2YWx1ZSwgb2xkVmFsdWUpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICB0aGlzLnF1ZXVlZCA9IHRoaXMuc2hhbGxvdyA9IGZhbHNlO1xuICAgIH1cbiAgfTtcblxuICAvKipcbiAgICogRXZhbHVhdGUgdGhlIHZhbHVlIG9mIHRoZSB3YXRjaGVyLlxuICAgKiBUaGlzIG9ubHkgZ2V0cyBjYWxsZWQgZm9yIGxhenkgd2F0Y2hlcnMuXG4gICAqL1xuXG4gIFdhdGNoZXIucHJvdG90eXBlLmV2YWx1YXRlID0gZnVuY3Rpb24gKCkge1xuICAgIC8vIGF2b2lkIG92ZXJ3cml0aW5nIGFub3RoZXIgd2F0Y2hlciB0aGF0IGlzIGJlaW5nXG4gICAgLy8gY29sbGVjdGVkLlxuICAgIHZhciBjdXJyZW50ID0gRGVwLnRhcmdldDtcbiAgICB0aGlzLnZhbHVlID0gdGhpcy5nZXQoKTtcbiAgICB0aGlzLmRpcnR5ID0gZmFsc2U7XG4gICAgRGVwLnRhcmdldCA9IGN1cnJlbnQ7XG4gIH07XG5cbiAgLyoqXG4gICAqIERlcGVuZCBvbiBhbGwgZGVwcyBjb2xsZWN0ZWQgYnkgdGhpcyB3YXRjaGVyLlxuICAgKi9cblxuICBXYXRjaGVyLnByb3RvdHlwZS5kZXBlbmQgPSBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIGkgPSB0aGlzLmRlcHMubGVuZ3RoO1xuICAgIHdoaWxlIChpLS0pIHtcbiAgICAgIHRoaXMuZGVwc1tpXS5kZXBlbmQoKTtcbiAgICB9XG4gIH07XG5cbiAgLyoqXG4gICAqIFJlbW92ZSBzZWxmIGZyb20gYWxsIGRlcGVuZGVuY2llcycgc3ViY3JpYmVyIGxpc3QuXG4gICAqL1xuXG4gIFdhdGNoZXIucHJvdG90eXBlLnRlYXJkb3duID0gZnVuY3Rpb24gKCkge1xuICAgIGlmICh0aGlzLmFjdGl2ZSkge1xuICAgICAgLy8gcmVtb3ZlIHNlbGYgZnJvbSB2bSdzIHdhdGNoZXIgbGlzdFxuICAgICAgLy8gdGhpcyBpcyBhIHNvbWV3aGF0IGV4cGVuc2l2ZSBvcGVyYXRpb24gc28gd2Ugc2tpcCBpdFxuICAgICAgLy8gaWYgdGhlIHZtIGlzIGJlaW5nIGRlc3Ryb3llZCBvciBpcyBwZXJmb3JtaW5nIGEgdi1mb3JcbiAgICAgIC8vIHJlLXJlbmRlciAodGhlIHdhdGNoZXIgbGlzdCBpcyB0aGVuIGZpbHRlcmVkIGJ5IHYtZm9yKS5cbiAgICAgIGlmICghdGhpcy52bS5faXNCZWluZ0Rlc3Ryb3llZCAmJiAhdGhpcy52bS5fdkZvclJlbW92aW5nKSB7XG4gICAgICAgIHRoaXMudm0uX3dhdGNoZXJzLiRyZW1vdmUodGhpcyk7XG4gICAgICB9XG4gICAgICB2YXIgaSA9IHRoaXMuZGVwcy5sZW5ndGg7XG4gICAgICB3aGlsZSAoaS0tKSB7XG4gICAgICAgIHRoaXMuZGVwc1tpXS5yZW1vdmVTdWIodGhpcyk7XG4gICAgICB9XG4gICAgICB0aGlzLmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgdGhpcy52bSA9IHRoaXMuY2IgPSB0aGlzLnZhbHVlID0gbnVsbDtcbiAgICB9XG4gIH07XG5cbiAgLyoqXG4gICAqIFJlY3J1c2l2ZWx5IHRyYXZlcnNlIGFuIG9iamVjdCB0byBldm9rZSBhbGwgY29udmVydGVkXG4gICAqIGdldHRlcnMsIHNvIHRoYXQgZXZlcnkgbmVzdGVkIHByb3BlcnR5IGluc2lkZSB0aGUgb2JqZWN0XG4gICAqIGlzIGNvbGxlY3RlZCBhcyBhIFwiZGVlcFwiIGRlcGVuZGVuY3kuXG4gICAqXG4gICAqIEBwYXJhbSB7Kn0gdmFsXG4gICAqL1xuXG4gIHZhciBzZWVuT2JqZWN0cyA9IG5ldyBfU2V0KCk7XG4gIGZ1bmN0aW9uIHRyYXZlcnNlKHZhbCwgc2Vlbikge1xuICAgIHZhciBpID0gdW5kZWZpbmVkLFxuICAgICAgICBrZXlzID0gdW5kZWZpbmVkO1xuICAgIGlmICghc2Vlbikge1xuICAgICAgc2VlbiA9IHNlZW5PYmplY3RzO1xuICAgICAgc2Vlbi5jbGVhcigpO1xuICAgIH1cbiAgICB2YXIgaXNBID0gaXNBcnJheSh2YWwpO1xuICAgIHZhciBpc08gPSBpc09iamVjdCh2YWwpO1xuICAgIGlmIChpc0EgfHwgaXNPKSB7XG4gICAgICBpZiAodmFsLl9fb2JfXykge1xuICAgICAgICB2YXIgZGVwSWQgPSB2YWwuX19vYl9fLmRlcC5pZDtcbiAgICAgICAgaWYgKHNlZW4uaGFzKGRlcElkKSkge1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBzZWVuLmFkZChkZXBJZCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmIChpc0EpIHtcbiAgICAgICAgaSA9IHZhbC5sZW5ndGg7XG4gICAgICAgIHdoaWxlIChpLS0pIHRyYXZlcnNlKHZhbFtpXSwgc2Vlbik7XG4gICAgICB9IGVsc2UgaWYgKGlzTykge1xuICAgICAgICBrZXlzID0gT2JqZWN0LmtleXModmFsKTtcbiAgICAgICAgaSA9IGtleXMubGVuZ3RoO1xuICAgICAgICB3aGlsZSAoaS0tKSB0cmF2ZXJzZSh2YWxba2V5c1tpXV0sIHNlZW4pO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHZhciB0ZXh0JDEgPSB7XG5cbiAgICBiaW5kOiBmdW5jdGlvbiBiaW5kKCkge1xuICAgICAgdGhpcy5hdHRyID0gdGhpcy5lbC5ub2RlVHlwZSA9PT0gMyA/ICdkYXRhJyA6ICd0ZXh0Q29udGVudCc7XG4gICAgfSxcblxuICAgIHVwZGF0ZTogZnVuY3Rpb24gdXBkYXRlKHZhbHVlKSB7XG4gICAgICB0aGlzLmVsW3RoaXMuYXR0cl0gPSBfdG9TdHJpbmcodmFsdWUpO1xuICAgIH1cbiAgfTtcblxuICB2YXIgdGVtcGxhdGVDYWNoZSA9IG5ldyBDYWNoZSgxMDAwKTtcbiAgdmFyIGlkU2VsZWN0b3JDYWNoZSA9IG5ldyBDYWNoZSgxMDAwKTtcblxuICB2YXIgbWFwID0ge1xuICAgIGVmYXVsdDogWzAsICcnLCAnJ10sXG4gICAgbGVnZW5kOiBbMSwgJzxmaWVsZHNldD4nLCAnPC9maWVsZHNldD4nXSxcbiAgICB0cjogWzIsICc8dGFibGU+PHRib2R5PicsICc8L3Rib2R5PjwvdGFibGU+J10sXG4gICAgY29sOiBbMiwgJzx0YWJsZT48dGJvZHk+PC90Ym9keT48Y29sZ3JvdXA+JywgJzwvY29sZ3JvdXA+PC90YWJsZT4nXVxuICB9O1xuXG4gIG1hcC50ZCA9IG1hcC50aCA9IFszLCAnPHRhYmxlPjx0Ym9keT48dHI+JywgJzwvdHI+PC90Ym9keT48L3RhYmxlPiddO1xuXG4gIG1hcC5vcHRpb24gPSBtYXAub3B0Z3JvdXAgPSBbMSwgJzxzZWxlY3QgbXVsdGlwbGU9XCJtdWx0aXBsZVwiPicsICc8L3NlbGVjdD4nXTtcblxuICBtYXAudGhlYWQgPSBtYXAudGJvZHkgPSBtYXAuY29sZ3JvdXAgPSBtYXAuY2FwdGlvbiA9IG1hcC50Zm9vdCA9IFsxLCAnPHRhYmxlPicsICc8L3RhYmxlPiddO1xuXG4gIG1hcC5nID0gbWFwLmRlZnMgPSBtYXAuc3ltYm9sID0gbWFwLnVzZSA9IG1hcC5pbWFnZSA9IG1hcC50ZXh0ID0gbWFwLmNpcmNsZSA9IG1hcC5lbGxpcHNlID0gbWFwLmxpbmUgPSBtYXAucGF0aCA9IG1hcC5wb2x5Z29uID0gbWFwLnBvbHlsaW5lID0gbWFwLnJlY3QgPSBbMSwgJzxzdmcgJyArICd4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIgJyArICd4bWxuczp4bGluaz1cImh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmtcIiAnICsgJ3htbG5zOmV2PVwiaHR0cDovL3d3dy53My5vcmcvMjAwMS94bWwtZXZlbnRzXCInICsgJ3ZlcnNpb249XCIxLjFcIj4nLCAnPC9zdmc+J107XG5cbiAgLyoqXG4gICAqIENoZWNrIGlmIGEgbm9kZSBpcyBhIHN1cHBvcnRlZCB0ZW1wbGF0ZSBub2RlIHdpdGggYVxuICAgKiBEb2N1bWVudEZyYWdtZW50IGNvbnRlbnQuXG4gICAqXG4gICAqIEBwYXJhbSB7Tm9kZX0gbm9kZVxuICAgKiBAcmV0dXJuIHtCb29sZWFufVxuICAgKi9cblxuICBmdW5jdGlvbiBpc1JlYWxUZW1wbGF0ZShub2RlKSB7XG4gICAgcmV0dXJuIGlzVGVtcGxhdGUobm9kZSkgJiYgaXNGcmFnbWVudChub2RlLmNvbnRlbnQpO1xuICB9XG5cbiAgdmFyIHRhZ1JFJDEgPSAvPChbXFx3Oi1dKykvO1xuICB2YXIgZW50aXR5UkUgPSAvJiM/XFx3Kz87LztcblxuICAvKipcbiAgICogQ29udmVydCBhIHN0cmluZyB0ZW1wbGF0ZSB0byBhIERvY3VtZW50RnJhZ21lbnQuXG4gICAqIERldGVybWluZXMgY29ycmVjdCB3cmFwcGluZyBieSB0YWcgdHlwZXMuIFdyYXBwaW5nXG4gICAqIHN0cmF0ZWd5IGZvdW5kIGluIGpRdWVyeSAmIGNvbXBvbmVudC9kb21pZnkuXG4gICAqXG4gICAqIEBwYXJhbSB7U3RyaW5nfSB0ZW1wbGF0ZVN0cmluZ1xuICAgKiBAcGFyYW0ge0Jvb2xlYW59IHJhd1xuICAgKiBAcmV0dXJuIHtEb2N1bWVudEZyYWdtZW50fVxuICAgKi9cblxuICBmdW5jdGlvbiBzdHJpbmdUb0ZyYWdtZW50KHRlbXBsYXRlU3RyaW5nLCByYXcpIHtcbiAgICAvLyB0cnkgYSBjYWNoZSBoaXQgZmlyc3RcbiAgICB2YXIgY2FjaGVLZXkgPSByYXcgPyB0ZW1wbGF0ZVN0cmluZyA6IHRlbXBsYXRlU3RyaW5nLnRyaW0oKTtcbiAgICB2YXIgaGl0ID0gdGVtcGxhdGVDYWNoZS5nZXQoY2FjaGVLZXkpO1xuICAgIGlmIChoaXQpIHtcbiAgICAgIHJldHVybiBoaXQ7XG4gICAgfVxuXG4gICAgdmFyIGZyYWcgPSBkb2N1bWVudC5jcmVhdGVEb2N1bWVudEZyYWdtZW50KCk7XG4gICAgdmFyIHRhZ01hdGNoID0gdGVtcGxhdGVTdHJpbmcubWF0Y2godGFnUkUkMSk7XG4gICAgdmFyIGVudGl0eU1hdGNoID0gZW50aXR5UkUudGVzdCh0ZW1wbGF0ZVN0cmluZyk7XG5cbiAgICBpZiAoIXRhZ01hdGNoICYmICFlbnRpdHlNYXRjaCkge1xuICAgICAgLy8gdGV4dCBvbmx5LCByZXR1cm4gYSBzaW5nbGUgdGV4dCBub2RlLlxuICAgICAgZnJhZy5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZSh0ZW1wbGF0ZVN0cmluZykpO1xuICAgIH0gZWxzZSB7XG4gICAgICB2YXIgdGFnID0gdGFnTWF0Y2ggJiYgdGFnTWF0Y2hbMV07XG4gICAgICB2YXIgd3JhcCA9IG1hcFt0YWddIHx8IG1hcC5lZmF1bHQ7XG4gICAgICB2YXIgZGVwdGggPSB3cmFwWzBdO1xuICAgICAgdmFyIHByZWZpeCA9IHdyYXBbMV07XG4gICAgICB2YXIgc3VmZml4ID0gd3JhcFsyXTtcbiAgICAgIHZhciBub2RlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG5cbiAgICAgIG5vZGUuaW5uZXJIVE1MID0gcHJlZml4ICsgdGVtcGxhdGVTdHJpbmcgKyBzdWZmaXg7XG4gICAgICB3aGlsZSAoZGVwdGgtLSkge1xuICAgICAgICBub2RlID0gbm9kZS5sYXN0Q2hpbGQ7XG4gICAgICB9XG5cbiAgICAgIHZhciBjaGlsZDtcbiAgICAgIC8qIGVzbGludC1kaXNhYmxlIG5vLWNvbmQtYXNzaWduICovXG4gICAgICB3aGlsZSAoY2hpbGQgPSBub2RlLmZpcnN0Q2hpbGQpIHtcbiAgICAgICAgLyogZXNsaW50LWVuYWJsZSBuby1jb25kLWFzc2lnbiAqL1xuICAgICAgICBmcmFnLmFwcGVuZENoaWxkKGNoaWxkKTtcbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKCFyYXcpIHtcbiAgICAgIHRyaW1Ob2RlKGZyYWcpO1xuICAgIH1cbiAgICB0ZW1wbGF0ZUNhY2hlLnB1dChjYWNoZUtleSwgZnJhZyk7XG4gICAgcmV0dXJuIGZyYWc7XG4gIH1cblxuICAvKipcbiAgICogQ29udmVydCBhIHRlbXBsYXRlIG5vZGUgdG8gYSBEb2N1bWVudEZyYWdtZW50LlxuICAgKlxuICAgKiBAcGFyYW0ge05vZGV9IG5vZGVcbiAgICogQHJldHVybiB7RG9jdW1lbnRGcmFnbWVudH1cbiAgICovXG5cbiAgZnVuY3Rpb24gbm9kZVRvRnJhZ21lbnQobm9kZSkge1xuICAgIC8vIGlmIGl0cyBhIHRlbXBsYXRlIHRhZyBhbmQgdGhlIGJyb3dzZXIgc3VwcG9ydHMgaXQsXG4gICAgLy8gaXRzIGNvbnRlbnQgaXMgYWxyZWFkeSBhIGRvY3VtZW50IGZyYWdtZW50LiBIb3dldmVyLCBpT1MgU2FmYXJpIGhhc1xuICAgIC8vIGJ1ZyB3aGVuIHVzaW5nIGRpcmVjdGx5IGNsb25lZCB0ZW1wbGF0ZSBjb250ZW50IHdpdGggdG91Y2hcbiAgICAvLyBldmVudHMgYW5kIGNhbiBjYXVzZSBjcmFzaGVzIHdoZW4gdGhlIG5vZGVzIGFyZSByZW1vdmVkIGZyb20gRE9NLCBzbyB3ZVxuICAgIC8vIGhhdmUgdG8gdHJlYXQgdGVtcGxhdGUgZWxlbWVudHMgYXMgc3RyaW5nIHRlbXBsYXRlcy4gKCMyODA1KVxuICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBpZiAqL1xuICAgIGlmIChpc1JlYWxUZW1wbGF0ZShub2RlKSkge1xuICAgICAgcmV0dXJuIHN0cmluZ1RvRnJhZ21lbnQobm9kZS5pbm5lckhUTUwpO1xuICAgIH1cbiAgICAvLyBzY3JpcHQgdGVtcGxhdGVcbiAgICBpZiAobm9kZS50YWdOYW1lID09PSAnU0NSSVBUJykge1xuICAgICAgcmV0dXJuIHN0cmluZ1RvRnJhZ21lbnQobm9kZS50ZXh0Q29udGVudCk7XG4gICAgfVxuICAgIC8vIG5vcm1hbCBub2RlLCBjbG9uZSBpdCB0byBhdm9pZCBtdXRhdGluZyB0aGUgb3JpZ2luYWxcbiAgICB2YXIgY2xvbmVkTm9kZSA9IGNsb25lTm9kZShub2RlKTtcbiAgICB2YXIgZnJhZyA9IGRvY3VtZW50LmNyZWF0ZURvY3VtZW50RnJhZ21lbnQoKTtcbiAgICB2YXIgY2hpbGQ7XG4gICAgLyogZXNsaW50LWRpc2FibGUgbm8tY29uZC1hc3NpZ24gKi9cbiAgICB3aGlsZSAoY2hpbGQgPSBjbG9uZWROb2RlLmZpcnN0Q2hpbGQpIHtcbiAgICAgIC8qIGVzbGludC1lbmFibGUgbm8tY29uZC1hc3NpZ24gKi9cbiAgICAgIGZyYWcuYXBwZW5kQ2hpbGQoY2hpbGQpO1xuICAgIH1cbiAgICB0cmltTm9kZShmcmFnKTtcbiAgICByZXR1cm4gZnJhZztcbiAgfVxuXG4gIC8vIFRlc3QgZm9yIHRoZSBwcmVzZW5jZSBvZiB0aGUgU2FmYXJpIHRlbXBsYXRlIGNsb25pbmcgYnVnXG4gIC8vIGh0dHBzOi8vYnVncy53ZWJraXQub3JnL3Nob3d1Zy5jZ2k/aWQ9MTM3NzU1XG4gIHZhciBoYXNCcm9rZW5UZW1wbGF0ZSA9IChmdW5jdGlvbiAoKSB7XG4gICAgLyogaXN0YW5idWwgaWdub3JlIGVsc2UgKi9cbiAgICBpZiAoaW5Ccm93c2VyKSB7XG4gICAgICB2YXIgYSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgYS5pbm5lckhUTUwgPSAnPHRlbXBsYXRlPjE8L3RlbXBsYXRlPic7XG4gICAgICByZXR1cm4gIWEuY2xvbmVOb2RlKHRydWUpLmZpcnN0Q2hpbGQuaW5uZXJIVE1MO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICB9KSgpO1xuXG4gIC8vIFRlc3QgZm9yIElFMTAvMTEgdGV4dGFyZWEgcGxhY2Vob2xkZXIgY2xvbmUgYnVnXG4gIHZhciBoYXNUZXh0YXJlYUNsb25lQnVnID0gKGZ1bmN0aW9uICgpIHtcbiAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgZWxzZSAqL1xuICAgIGlmIChpbkJyb3dzZXIpIHtcbiAgICAgIHZhciB0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndGV4dGFyZWEnKTtcbiAgICAgIHQucGxhY2Vob2xkZXIgPSAndCc7XG4gICAgICByZXR1cm4gdC5jbG9uZU5vZGUodHJ1ZSkudmFsdWUgPT09ICd0JztcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgfSkoKTtcblxuICAvKipcbiAgICogMS4gRGVhbCB3aXRoIFNhZmFyaSBjbG9uaW5nIG5lc3RlZCA8dGVtcGxhdGU+IGJ1ZyBieVxuICAgKiAgICBtYW51YWxseSBjbG9uaW5nIGFsbCB0ZW1wbGF0ZSBpbnN0YW5jZXMuXG4gICAqIDIuIERlYWwgd2l0aCBJRTEwLzExIHRleHRhcmVhIHBsYWNlaG9sZGVyIGJ1ZyBieSBzZXR0aW5nXG4gICAqICAgIHRoZSBjb3JyZWN0IHZhbHVlIGFmdGVyIGNsb25pbmcuXG4gICAqXG4gICAqIEBwYXJhbSB7RWxlbWVudHxEb2N1bWVudEZyYWdtZW50fSBub2RlXG4gICAqIEByZXR1cm4ge0VsZW1lbnR8RG9jdW1lbnRGcmFnbWVudH1cbiAgICovXG5cbiAgZnVuY3Rpb24gY2xvbmVOb2RlKG5vZGUpIHtcbiAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgaWYgKi9cbiAgICBpZiAoIW5vZGUucXVlcnlTZWxlY3RvckFsbCkge1xuICAgICAgcmV0dXJuIG5vZGUuY2xvbmVOb2RlKCk7XG4gICAgfVxuICAgIHZhciByZXMgPSBub2RlLmNsb25lTm9kZSh0cnVlKTtcbiAgICB2YXIgaSwgb3JpZ2luYWwsIGNsb25lZDtcbiAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgaWYgKi9cbiAgICBpZiAoaGFzQnJva2VuVGVtcGxhdGUpIHtcbiAgICAgIHZhciB0ZW1wQ2xvbmUgPSByZXM7XG4gICAgICBpZiAoaXNSZWFsVGVtcGxhdGUobm9kZSkpIHtcbiAgICAgICAgbm9kZSA9IG5vZGUuY29udGVudDtcbiAgICAgICAgdGVtcENsb25lID0gcmVzLmNvbnRlbnQ7XG4gICAgICB9XG4gICAgICBvcmlnaW5hbCA9IG5vZGUucXVlcnlTZWxlY3RvckFsbCgndGVtcGxhdGUnKTtcbiAgICAgIGlmIChvcmlnaW5hbC5sZW5ndGgpIHtcbiAgICAgICAgY2xvbmVkID0gdGVtcENsb25lLnF1ZXJ5U2VsZWN0b3JBbGwoJ3RlbXBsYXRlJyk7XG4gICAgICAgIGkgPSBjbG9uZWQubGVuZ3RoO1xuICAgICAgICB3aGlsZSAoaS0tKSB7XG4gICAgICAgICAgY2xvbmVkW2ldLnBhcmVudE5vZGUucmVwbGFjZUNoaWxkKGNsb25lTm9kZShvcmlnaW5hbFtpXSksIGNsb25lZFtpXSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgLyogaXN0YW5idWwgaWdub3JlIGlmICovXG4gICAgaWYgKGhhc1RleHRhcmVhQ2xvbmVCdWcpIHtcbiAgICAgIGlmIChub2RlLnRhZ05hbWUgPT09ICdURVhUQVJFQScpIHtcbiAgICAgICAgcmVzLnZhbHVlID0gbm9kZS52YWx1ZTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIG9yaWdpbmFsID0gbm9kZS5xdWVyeVNlbGVjdG9yQWxsKCd0ZXh0YXJlYScpO1xuICAgICAgICBpZiAob3JpZ2luYWwubGVuZ3RoKSB7XG4gICAgICAgICAgY2xvbmVkID0gcmVzLnF1ZXJ5U2VsZWN0b3JBbGwoJ3RleHRhcmVhJyk7XG4gICAgICAgICAgaSA9IGNsb25lZC5sZW5ndGg7XG4gICAgICAgICAgd2hpbGUgKGktLSkge1xuICAgICAgICAgICAgY2xvbmVkW2ldLnZhbHVlID0gb3JpZ2luYWxbaV0udmFsdWU7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiByZXM7XG4gIH1cblxuICAvKipcbiAgICogUHJvY2VzcyB0aGUgdGVtcGxhdGUgb3B0aW9uIGFuZCBub3JtYWxpemVzIGl0IGludG8gYVxuICAgKiBhIERvY3VtZW50RnJhZ21lbnQgdGhhdCBjYW4gYmUgdXNlZCBhcyBhIHBhcnRpYWwgb3IgYVxuICAgKiBpbnN0YW5jZSB0ZW1wbGF0ZS5cbiAgICpcbiAgICogQHBhcmFtIHsqfSB0ZW1wbGF0ZVxuICAgKiAgICAgICAgUG9zc2libGUgdmFsdWVzIGluY2x1ZGU6XG4gICAqICAgICAgICAtIERvY3VtZW50RnJhZ21lbnQgb2JqZWN0XG4gICAqICAgICAgICAtIE5vZGUgb2JqZWN0IG9mIHR5cGUgVGVtcGxhdGVcbiAgICogICAgICAgIC0gaWQgc2VsZWN0b3I6ICcjc29tZS10ZW1wbGF0ZS1pZCdcbiAgICogICAgICAgIC0gdGVtcGxhdGUgc3RyaW5nOiAnPGRpdj48c3Bhbj57e21zZ319PC9zcGFuPjwvZGl2PidcbiAgICogQHBhcmFtIHtCb29sZWFufSBzaG91bGRDbG9uZVxuICAgKiBAcGFyYW0ge0Jvb2xlYW59IHJhd1xuICAgKiAgICAgICAgaW5saW5lIEhUTUwgaW50ZXJwb2xhdGlvbi4gRG8gbm90IGNoZWNrIGZvciBpZFxuICAgKiAgICAgICAgc2VsZWN0b3IgYW5kIGtlZXAgd2hpdGVzcGFjZSBpbiB0aGUgc3RyaW5nLlxuICAgKiBAcmV0dXJuIHtEb2N1bWVudEZyYWdtZW50fHVuZGVmaW5lZH1cbiAgICovXG5cbiAgZnVuY3Rpb24gcGFyc2VUZW1wbGF0ZSh0ZW1wbGF0ZSwgc2hvdWxkQ2xvbmUsIHJhdykge1xuICAgIHZhciBub2RlLCBmcmFnO1xuXG4gICAgLy8gaWYgdGhlIHRlbXBsYXRlIGlzIGFscmVhZHkgYSBkb2N1bWVudCBmcmFnbWVudCxcbiAgICAvLyBkbyBub3RoaW5nXG4gICAgaWYgKGlzRnJhZ21lbnQodGVtcGxhdGUpKSB7XG4gICAgICB0cmltTm9kZSh0ZW1wbGF0ZSk7XG4gICAgICByZXR1cm4gc2hvdWxkQ2xvbmUgPyBjbG9uZU5vZGUodGVtcGxhdGUpIDogdGVtcGxhdGU7XG4gICAgfVxuXG4gICAgaWYgKHR5cGVvZiB0ZW1wbGF0ZSA9PT0gJ3N0cmluZycpIHtcbiAgICAgIC8vIGlkIHNlbGVjdG9yXG4gICAgICBpZiAoIXJhdyAmJiB0ZW1wbGF0ZS5jaGFyQXQoMCkgPT09ICcjJykge1xuICAgICAgICAvLyBpZCBzZWxlY3RvciBjYW4gYmUgY2FjaGVkIHRvb1xuICAgICAgICBmcmFnID0gaWRTZWxlY3RvckNhY2hlLmdldCh0ZW1wbGF0ZSk7XG4gICAgICAgIGlmICghZnJhZykge1xuICAgICAgICAgIG5vZGUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCh0ZW1wbGF0ZS5zbGljZSgxKSk7XG4gICAgICAgICAgaWYgKG5vZGUpIHtcbiAgICAgICAgICAgIGZyYWcgPSBub2RlVG9GcmFnbWVudChub2RlKTtcbiAgICAgICAgICAgIC8vIHNhdmUgc2VsZWN0b3IgdG8gY2FjaGVcbiAgICAgICAgICAgIGlkU2VsZWN0b3JDYWNoZS5wdXQodGVtcGxhdGUsIGZyYWcpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgLy8gbm9ybWFsIHN0cmluZyB0ZW1wbGF0ZVxuICAgICAgICBmcmFnID0gc3RyaW5nVG9GcmFnbWVudCh0ZW1wbGF0ZSwgcmF3KTtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKHRlbXBsYXRlLm5vZGVUeXBlKSB7XG4gICAgICAvLyBhIGRpcmVjdCBub2RlXG4gICAgICBmcmFnID0gbm9kZVRvRnJhZ21lbnQodGVtcGxhdGUpO1xuICAgIH1cblxuICAgIHJldHVybiBmcmFnICYmIHNob3VsZENsb25lID8gY2xvbmVOb2RlKGZyYWcpIDogZnJhZztcbiAgfVxuXG52YXIgdGVtcGxhdGUgPSBPYmplY3QuZnJlZXplKHtcbiAgICBjbG9uZU5vZGU6IGNsb25lTm9kZSxcbiAgICBwYXJzZVRlbXBsYXRlOiBwYXJzZVRlbXBsYXRlXG4gIH0pO1xuXG4gIHZhciBodG1sID0ge1xuXG4gICAgYmluZDogZnVuY3Rpb24gYmluZCgpIHtcbiAgICAgIC8vIGEgY29tbWVudCBub2RlIG1lYW5zIHRoaXMgaXMgYSBiaW5kaW5nIGZvclxuICAgICAgLy8ge3t7IGlubGluZSB1bmVzY2FwZWQgaHRtbCB9fX1cbiAgICAgIGlmICh0aGlzLmVsLm5vZGVUeXBlID09PSA4KSB7XG4gICAgICAgIC8vIGhvbGQgbm9kZXNcbiAgICAgICAgdGhpcy5ub2RlcyA9IFtdO1xuICAgICAgICAvLyByZXBsYWNlIHRoZSBwbGFjZWhvbGRlciB3aXRoIHByb3BlciBhbmNob3JcbiAgICAgICAgdGhpcy5hbmNob3IgPSBjcmVhdGVBbmNob3IoJ3YtaHRtbCcpO1xuICAgICAgICByZXBsYWNlKHRoaXMuZWwsIHRoaXMuYW5jaG9yKTtcbiAgICAgIH1cbiAgICB9LFxuXG4gICAgdXBkYXRlOiBmdW5jdGlvbiB1cGRhdGUodmFsdWUpIHtcbiAgICAgIHZhbHVlID0gX3RvU3RyaW5nKHZhbHVlKTtcbiAgICAgIGlmICh0aGlzLm5vZGVzKSB7XG4gICAgICAgIHRoaXMuc3dhcCh2YWx1ZSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLmVsLmlubmVySFRNTCA9IHZhbHVlO1xuICAgICAgfVxuICAgIH0sXG5cbiAgICBzd2FwOiBmdW5jdGlvbiBzd2FwKHZhbHVlKSB7XG4gICAgICAvLyByZW1vdmUgb2xkIG5vZGVzXG4gICAgICB2YXIgaSA9IHRoaXMubm9kZXMubGVuZ3RoO1xuICAgICAgd2hpbGUgKGktLSkge1xuICAgICAgICByZW1vdmUodGhpcy5ub2Rlc1tpXSk7XG4gICAgICB9XG4gICAgICAvLyBjb252ZXJ0IG5ldyB2YWx1ZSB0byBhIGZyYWdtZW50XG4gICAgICAvLyBkbyBub3QgYXR0ZW1wdCB0byByZXRyaWV2ZSBmcm9tIGlkIHNlbGVjdG9yXG4gICAgICB2YXIgZnJhZyA9IHBhcnNlVGVtcGxhdGUodmFsdWUsIHRydWUsIHRydWUpO1xuICAgICAgLy8gc2F2ZSBhIHJlZmVyZW5jZSB0byB0aGVzZSBub2RlcyBzbyB3ZSBjYW4gcmVtb3ZlIGxhdGVyXG4gICAgICB0aGlzLm5vZGVzID0gdG9BcnJheShmcmFnLmNoaWxkTm9kZXMpO1xuICAgICAgYmVmb3JlKGZyYWcsIHRoaXMuYW5jaG9yKTtcbiAgICB9XG4gIH07XG5cbiAgLyoqXG4gICAqIEFic3RyYWN0aW9uIGZvciBhIHBhcnRpYWxseS1jb21waWxlZCBmcmFnbWVudC5cbiAgICogQ2FuIG9wdGlvbmFsbHkgY29tcGlsZSBjb250ZW50IHdpdGggYSBjaGlsZCBzY29wZS5cbiAgICpcbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gbGlua2VyXG4gICAqIEBwYXJhbSB7VnVlfSB2bVxuICAgKiBAcGFyYW0ge0RvY3VtZW50RnJhZ21lbnR9IGZyYWdcbiAgICogQHBhcmFtIHtWdWV9IFtob3N0XVxuICAgKiBAcGFyYW0ge09iamVjdH0gW3Njb3BlXVxuICAgKiBAcGFyYW0ge0ZyYWdtZW50fSBbcGFyZW50RnJhZ11cbiAgICovXG4gIGZ1bmN0aW9uIEZyYWdtZW50KGxpbmtlciwgdm0sIGZyYWcsIGhvc3QsIHNjb3BlLCBwYXJlbnRGcmFnKSB7XG4gICAgdGhpcy5jaGlsZHJlbiA9IFtdO1xuICAgIHRoaXMuY2hpbGRGcmFncyA9IFtdO1xuICAgIHRoaXMudm0gPSB2bTtcbiAgICB0aGlzLnNjb3BlID0gc2NvcGU7XG4gICAgdGhpcy5pbnNlcnRlZCA9IGZhbHNlO1xuICAgIHRoaXMucGFyZW50RnJhZyA9IHBhcmVudEZyYWc7XG4gICAgaWYgKHBhcmVudEZyYWcpIHtcbiAgICAgIHBhcmVudEZyYWcuY2hpbGRGcmFncy5wdXNoKHRoaXMpO1xuICAgIH1cbiAgICB0aGlzLnVubGluayA9IGxpbmtlcih2bSwgZnJhZywgaG9zdCwgc2NvcGUsIHRoaXMpO1xuICAgIHZhciBzaW5nbGUgPSB0aGlzLnNpbmdsZSA9IGZyYWcuY2hpbGROb2Rlcy5sZW5ndGggPT09IDEgJiZcbiAgICAvLyBkbyBub3QgZ28gc2luZ2xlIG1vZGUgaWYgdGhlIG9ubHkgbm9kZSBpcyBhbiBhbmNob3JcbiAgICAhZnJhZy5jaGlsZE5vZGVzWzBdLl9fdl9hbmNob3I7XG4gICAgaWYgKHNpbmdsZSkge1xuICAgICAgdGhpcy5ub2RlID0gZnJhZy5jaGlsZE5vZGVzWzBdO1xuICAgICAgdGhpcy5iZWZvcmUgPSBzaW5nbGVCZWZvcmU7XG4gICAgICB0aGlzLnJlbW92ZSA9IHNpbmdsZVJlbW92ZTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5ub2RlID0gY3JlYXRlQW5jaG9yKCdmcmFnbWVudC1zdGFydCcpO1xuICAgICAgdGhpcy5lbmQgPSBjcmVhdGVBbmNob3IoJ2ZyYWdtZW50LWVuZCcpO1xuICAgICAgdGhpcy5mcmFnID0gZnJhZztcbiAgICAgIHByZXBlbmQodGhpcy5ub2RlLCBmcmFnKTtcbiAgICAgIGZyYWcuYXBwZW5kQ2hpbGQodGhpcy5lbmQpO1xuICAgICAgdGhpcy5iZWZvcmUgPSBtdWx0aUJlZm9yZTtcbiAgICAgIHRoaXMucmVtb3ZlID0gbXVsdGlSZW1vdmU7XG4gICAgfVxuICAgIHRoaXMubm9kZS5fX3ZfZnJhZyA9IHRoaXM7XG4gIH1cblxuICAvKipcbiAgICogQ2FsbCBhdHRhY2gvZGV0YWNoIGZvciBhbGwgY29tcG9uZW50cyBjb250YWluZWQgd2l0aGluXG4gICAqIHRoaXMgZnJhZ21lbnQuIEFsc28gZG8gc28gcmVjdXJzaXZlbHkgZm9yIGFsbCBjaGlsZFxuICAgKiBmcmFnbWVudHMuXG4gICAqXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IGhvb2tcbiAgICovXG5cbiAgRnJhZ21lbnQucHJvdG90eXBlLmNhbGxIb29rID0gZnVuY3Rpb24gKGhvb2spIHtcbiAgICB2YXIgaSwgbDtcbiAgICBmb3IgKGkgPSAwLCBsID0gdGhpcy5jaGlsZEZyYWdzLmxlbmd0aDsgaSA8IGw7IGkrKykge1xuICAgICAgdGhpcy5jaGlsZEZyYWdzW2ldLmNhbGxIb29rKGhvb2spO1xuICAgIH1cbiAgICBmb3IgKGkgPSAwLCBsID0gdGhpcy5jaGlsZHJlbi5sZW5ndGg7IGkgPCBsOyBpKyspIHtcbiAgICAgIGhvb2sodGhpcy5jaGlsZHJlbltpXSk7XG4gICAgfVxuICB9O1xuXG4gIC8qKlxuICAgKiBJbnNlcnQgZnJhZ21lbnQgYmVmb3JlIHRhcmdldCwgc2luZ2xlIG5vZGUgdmVyc2lvblxuICAgKlxuICAgKiBAcGFyYW0ge05vZGV9IHRhcmdldFxuICAgKiBAcGFyYW0ge0Jvb2xlYW59IHdpdGhUcmFuc2l0aW9uXG4gICAqL1xuXG4gIGZ1bmN0aW9uIHNpbmdsZUJlZm9yZSh0YXJnZXQsIHdpdGhUcmFuc2l0aW9uKSB7XG4gICAgdGhpcy5pbnNlcnRlZCA9IHRydWU7XG4gICAgdmFyIG1ldGhvZCA9IHdpdGhUcmFuc2l0aW9uICE9PSBmYWxzZSA/IGJlZm9yZVdpdGhUcmFuc2l0aW9uIDogYmVmb3JlO1xuICAgIG1ldGhvZCh0aGlzLm5vZGUsIHRhcmdldCwgdGhpcy52bSk7XG4gICAgaWYgKGluRG9jKHRoaXMubm9kZSkpIHtcbiAgICAgIHRoaXMuY2FsbEhvb2soYXR0YWNoKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogUmVtb3ZlIGZyYWdtZW50LCBzaW5nbGUgbm9kZSB2ZXJzaW9uXG4gICAqL1xuXG4gIGZ1bmN0aW9uIHNpbmdsZVJlbW92ZSgpIHtcbiAgICB0aGlzLmluc2VydGVkID0gZmFsc2U7XG4gICAgdmFyIHNob3VsZENhbGxSZW1vdmUgPSBpbkRvYyh0aGlzLm5vZGUpO1xuICAgIHZhciBzZWxmID0gdGhpcztcbiAgICB0aGlzLmJlZm9yZVJlbW92ZSgpO1xuICAgIHJlbW92ZVdpdGhUcmFuc2l0aW9uKHRoaXMubm9kZSwgdGhpcy52bSwgZnVuY3Rpb24gKCkge1xuICAgICAgaWYgKHNob3VsZENhbGxSZW1vdmUpIHtcbiAgICAgICAgc2VsZi5jYWxsSG9vayhkZXRhY2gpO1xuICAgICAgfVxuICAgICAgc2VsZi5kZXN0cm95KCk7XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogSW5zZXJ0IGZyYWdtZW50IGJlZm9yZSB0YXJnZXQsIG11bHRpLW5vZGVzIHZlcnNpb25cbiAgICpcbiAgICogQHBhcmFtIHtOb2RlfSB0YXJnZXRcbiAgICogQHBhcmFtIHtCb29sZWFufSB3aXRoVHJhbnNpdGlvblxuICAgKi9cblxuICBmdW5jdGlvbiBtdWx0aUJlZm9yZSh0YXJnZXQsIHdpdGhUcmFuc2l0aW9uKSB7XG4gICAgdGhpcy5pbnNlcnRlZCA9IHRydWU7XG4gICAgdmFyIHZtID0gdGhpcy52bTtcbiAgICB2YXIgbWV0aG9kID0gd2l0aFRyYW5zaXRpb24gIT09IGZhbHNlID8gYmVmb3JlV2l0aFRyYW5zaXRpb24gOiBiZWZvcmU7XG4gICAgbWFwTm9kZVJhbmdlKHRoaXMubm9kZSwgdGhpcy5lbmQsIGZ1bmN0aW9uIChub2RlKSB7XG4gICAgICBtZXRob2Qobm9kZSwgdGFyZ2V0LCB2bSk7XG4gICAgfSk7XG4gICAgaWYgKGluRG9jKHRoaXMubm9kZSkpIHtcbiAgICAgIHRoaXMuY2FsbEhvb2soYXR0YWNoKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogUmVtb3ZlIGZyYWdtZW50LCBtdWx0aS1ub2RlcyB2ZXJzaW9uXG4gICAqL1xuXG4gIGZ1bmN0aW9uIG11bHRpUmVtb3ZlKCkge1xuICAgIHRoaXMuaW5zZXJ0ZWQgPSBmYWxzZTtcbiAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgdmFyIHNob3VsZENhbGxSZW1vdmUgPSBpbkRvYyh0aGlzLm5vZGUpO1xuICAgIHRoaXMuYmVmb3JlUmVtb3ZlKCk7XG4gICAgcmVtb3ZlTm9kZVJhbmdlKHRoaXMubm9kZSwgdGhpcy5lbmQsIHRoaXMudm0sIHRoaXMuZnJhZywgZnVuY3Rpb24gKCkge1xuICAgICAgaWYgKHNob3VsZENhbGxSZW1vdmUpIHtcbiAgICAgICAgc2VsZi5jYWxsSG9vayhkZXRhY2gpO1xuICAgICAgfVxuICAgICAgc2VsZi5kZXN0cm95KCk7XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogUHJlcGFyZSB0aGUgZnJhZ21lbnQgZm9yIHJlbW92YWwuXG4gICAqL1xuXG4gIEZyYWdtZW50LnByb3RvdHlwZS5iZWZvcmVSZW1vdmUgPSBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIGksIGw7XG4gICAgZm9yIChpID0gMCwgbCA9IHRoaXMuY2hpbGRGcmFncy5sZW5ndGg7IGkgPCBsOyBpKyspIHtcbiAgICAgIC8vIGNhbGwgdGhlIHNhbWUgbWV0aG9kIHJlY3Vyc2l2ZWx5IG9uIGNoaWxkXG4gICAgICAvLyBmcmFnbWVudHMsIGRlcHRoLWZpcnN0XG4gICAgICB0aGlzLmNoaWxkRnJhZ3NbaV0uYmVmb3JlUmVtb3ZlKGZhbHNlKTtcbiAgICB9XG4gICAgZm9yIChpID0gMCwgbCA9IHRoaXMuY2hpbGRyZW4ubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG4gICAgICAvLyBDYWxsIGRlc3Ryb3kgZm9yIGFsbCBjb250YWluZWQgaW5zdGFuY2VzLFxuICAgICAgLy8gd2l0aCByZW1vdmU6ZmFsc2UgYW5kIGRlZmVyOnRydWUuXG4gICAgICAvLyBEZWZlciBpcyBuZWNlc3NhcnkgYmVjYXVzZSB3ZSBuZWVkIHRvXG4gICAgICAvLyBrZWVwIHRoZSBjaGlsZHJlbiB0byBjYWxsIGRldGFjaCBob29rc1xuICAgICAgLy8gb24gdGhlbS5cbiAgICAgIHRoaXMuY2hpbGRyZW5baV0uJGRlc3Ryb3koZmFsc2UsIHRydWUpO1xuICAgIH1cbiAgICB2YXIgZGlycyA9IHRoaXMudW5saW5rLmRpcnM7XG4gICAgZm9yIChpID0gMCwgbCA9IGRpcnMubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG4gICAgICAvLyBkaXNhYmxlIHRoZSB3YXRjaGVycyBvbiBhbGwgdGhlIGRpcmVjdGl2ZXNcbiAgICAgIC8vIHNvIHRoYXQgdGhlIHJlbmRlcmVkIGNvbnRlbnQgc3RheXMgdGhlIHNhbWVcbiAgICAgIC8vIGR1cmluZyByZW1vdmFsLlxuICAgICAgZGlyc1tpXS5fd2F0Y2hlciAmJiBkaXJzW2ldLl93YXRjaGVyLnRlYXJkb3duKCk7XG4gICAgfVxuICB9O1xuXG4gIC8qKlxuICAgKiBEZXN0cm95IHRoZSBmcmFnbWVudC5cbiAgICovXG5cbiAgRnJhZ21lbnQucHJvdG90eXBlLmRlc3Ryb3kgPSBmdW5jdGlvbiAoKSB7XG4gICAgaWYgKHRoaXMucGFyZW50RnJhZykge1xuICAgICAgdGhpcy5wYXJlbnRGcmFnLmNoaWxkRnJhZ3MuJHJlbW92ZSh0aGlzKTtcbiAgICB9XG4gICAgdGhpcy5ub2RlLl9fdl9mcmFnID0gbnVsbDtcbiAgICB0aGlzLnVubGluaygpO1xuICB9O1xuXG4gIC8qKlxuICAgKiBDYWxsIGF0dGFjaCBob29rIGZvciBhIFZ1ZSBpbnN0YW5jZS5cbiAgICpcbiAgICogQHBhcmFtIHtWdWV9IGNoaWxkXG4gICAqL1xuXG4gIGZ1bmN0aW9uIGF0dGFjaChjaGlsZCkge1xuICAgIGlmICghY2hpbGQuX2lzQXR0YWNoZWQgJiYgaW5Eb2MoY2hpbGQuJGVsKSkge1xuICAgICAgY2hpbGQuX2NhbGxIb29rKCdhdHRhY2hlZCcpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBDYWxsIGRldGFjaCBob29rIGZvciBhIFZ1ZSBpbnN0YW5jZS5cbiAgICpcbiAgICogQHBhcmFtIHtWdWV9IGNoaWxkXG4gICAqL1xuXG4gIGZ1bmN0aW9uIGRldGFjaChjaGlsZCkge1xuICAgIGlmIChjaGlsZC5faXNBdHRhY2hlZCAmJiAhaW5Eb2MoY2hpbGQuJGVsKSkge1xuICAgICAgY2hpbGQuX2NhbGxIb29rKCdkZXRhY2hlZCcpO1xuICAgIH1cbiAgfVxuXG4gIHZhciBsaW5rZXJDYWNoZSA9IG5ldyBDYWNoZSg1MDAwKTtcblxuICAvKipcbiAgICogQSBmYWN0b3J5IHRoYXQgY2FuIGJlIHVzZWQgdG8gY3JlYXRlIGluc3RhbmNlcyBvZiBhXG4gICAqIGZyYWdtZW50LiBDYWNoZXMgdGhlIGNvbXBpbGVkIGxpbmtlciBpZiBwb3NzaWJsZS5cbiAgICpcbiAgICogQHBhcmFtIHtWdWV9IHZtXG4gICAqIEBwYXJhbSB7RWxlbWVudHxTdHJpbmd9IGVsXG4gICAqL1xuICBmdW5jdGlvbiBGcmFnbWVudEZhY3Rvcnkodm0sIGVsKSB7XG4gICAgdGhpcy52bSA9IHZtO1xuICAgIHZhciB0ZW1wbGF0ZTtcbiAgICB2YXIgaXNTdHJpbmcgPSB0eXBlb2YgZWwgPT09ICdzdHJpbmcnO1xuICAgIGlmIChpc1N0cmluZyB8fCBpc1RlbXBsYXRlKGVsKSAmJiAhZWwuaGFzQXR0cmlidXRlKCd2LWlmJykpIHtcbiAgICAgIHRlbXBsYXRlID0gcGFyc2VUZW1wbGF0ZShlbCwgdHJ1ZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRlbXBsYXRlID0gZG9jdW1lbnQuY3JlYXRlRG9jdW1lbnRGcmFnbWVudCgpO1xuICAgICAgdGVtcGxhdGUuYXBwZW5kQ2hpbGQoZWwpO1xuICAgIH1cbiAgICB0aGlzLnRlbXBsYXRlID0gdGVtcGxhdGU7XG4gICAgLy8gbGlua2VyIGNhbiBiZSBjYWNoZWQsIGJ1dCBvbmx5IGZvciBjb21wb25lbnRzXG4gICAgdmFyIGxpbmtlcjtcbiAgICB2YXIgY2lkID0gdm0uY29uc3RydWN0b3IuY2lkO1xuICAgIGlmIChjaWQgPiAwKSB7XG4gICAgICB2YXIgY2FjaGVJZCA9IGNpZCArIChpc1N0cmluZyA/IGVsIDogZ2V0T3V0ZXJIVE1MKGVsKSk7XG4gICAgICBsaW5rZXIgPSBsaW5rZXJDYWNoZS5nZXQoY2FjaGVJZCk7XG4gICAgICBpZiAoIWxpbmtlcikge1xuICAgICAgICBsaW5rZXIgPSBjb21waWxlKHRlbXBsYXRlLCB2bS4kb3B0aW9ucywgdHJ1ZSk7XG4gICAgICAgIGxpbmtlckNhY2hlLnB1dChjYWNoZUlkLCBsaW5rZXIpO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBsaW5rZXIgPSBjb21waWxlKHRlbXBsYXRlLCB2bS4kb3B0aW9ucywgdHJ1ZSk7XG4gICAgfVxuICAgIHRoaXMubGlua2VyID0gbGlua2VyO1xuICB9XG5cbiAgLyoqXG4gICAqIENyZWF0ZSBhIGZyYWdtZW50IGluc3RhbmNlIHdpdGggZ2l2ZW4gaG9zdCBhbmQgc2NvcGUuXG4gICAqXG4gICAqIEBwYXJhbSB7VnVlfSBob3N0XG4gICAqIEBwYXJhbSB7T2JqZWN0fSBzY29wZVxuICAgKiBAcGFyYW0ge0ZyYWdtZW50fSBwYXJlbnRGcmFnXG4gICAqL1xuXG4gIEZyYWdtZW50RmFjdG9yeS5wcm90b3R5cGUuY3JlYXRlID0gZnVuY3Rpb24gKGhvc3QsIHNjb3BlLCBwYXJlbnRGcmFnKSB7XG4gICAgdmFyIGZyYWcgPSBjbG9uZU5vZGUodGhpcy50ZW1wbGF0ZSk7XG4gICAgcmV0dXJuIG5ldyBGcmFnbWVudCh0aGlzLmxpbmtlciwgdGhpcy52bSwgZnJhZywgaG9zdCwgc2NvcGUsIHBhcmVudEZyYWcpO1xuICB9O1xuXG4gIHZhciBPTiA9IDcwMDtcbiAgdmFyIE1PREVMID0gODAwO1xuICB2YXIgQklORCA9IDg1MDtcbiAgdmFyIFRSQU5TSVRJT04gPSAxMTAwO1xuICB2YXIgRUwgPSAxNTAwO1xuICB2YXIgQ09NUE9ORU5UID0gMTUwMDtcbiAgdmFyIFBBUlRJQUwgPSAxNzUwO1xuICB2YXIgSUYgPSAyMTAwO1xuICB2YXIgRk9SID0gMjIwMDtcbiAgdmFyIFNMT1QgPSAyMzAwO1xuXG4gIHZhciB1aWQkMyA9IDA7XG5cbiAgdmFyIHZGb3IgPSB7XG5cbiAgICBwcmlvcml0eTogRk9SLFxuICAgIHRlcm1pbmFsOiB0cnVlLFxuXG4gICAgcGFyYW1zOiBbJ3RyYWNrLWJ5JywgJ3N0YWdnZXInLCAnZW50ZXItc3RhZ2dlcicsICdsZWF2ZS1zdGFnZ2VyJ10sXG5cbiAgICBiaW5kOiBmdW5jdGlvbiBiaW5kKCkge1xuICAgICAgLy8gc3VwcG9ydCBcIml0ZW0gaW4vb2YgaXRlbXNcIiBzeW50YXhcbiAgICAgIHZhciBpbk1hdGNoID0gdGhpcy5leHByZXNzaW9uLm1hdGNoKC8oLiopICg/OmlufG9mKSAoLiopLyk7XG4gICAgICBpZiAoaW5NYXRjaCkge1xuICAgICAgICB2YXIgaXRNYXRjaCA9IGluTWF0Y2hbMV0ubWF0Y2goL1xcKCguKiksKC4qKVxcKS8pO1xuICAgICAgICBpZiAoaXRNYXRjaCkge1xuICAgICAgICAgIHRoaXMuaXRlcmF0b3IgPSBpdE1hdGNoWzFdLnRyaW0oKTtcbiAgICAgICAgICB0aGlzLmFsaWFzID0gaXRNYXRjaFsyXS50cmltKCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhpcy5hbGlhcyA9IGluTWF0Y2hbMV0udHJpbSgpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuZXhwcmVzc2lvbiA9IGluTWF0Y2hbMl07XG4gICAgICB9XG5cbiAgICAgIGlmICghdGhpcy5hbGlhcykge1xuICAgICAgICAnZGV2ZWxvcG1lbnQnICE9PSAncHJvZHVjdGlvbicgJiYgd2FybignSW52YWxpZCB2LWZvciBleHByZXNzaW9uIFwiJyArIHRoaXMuZGVzY3JpcHRvci5yYXcgKyAnXCI6ICcgKyAnYWxpYXMgaXMgcmVxdWlyZWQuJywgdGhpcy52bSk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgLy8gdWlkIGFzIGEgY2FjaGUgaWRlbnRpZmllclxuICAgICAgdGhpcy5pZCA9ICdfX3YtZm9yX18nICsgKyt1aWQkMztcblxuICAgICAgLy8gY2hlY2sgaWYgdGhpcyBpcyBhbiBvcHRpb24gbGlzdCxcbiAgICAgIC8vIHNvIHRoYXQgd2Uga25vdyBpZiB3ZSBuZWVkIHRvIHVwZGF0ZSB0aGUgPHNlbGVjdD4nc1xuICAgICAgLy8gdi1tb2RlbCB3aGVuIHRoZSBvcHRpb24gbGlzdCBoYXMgY2hhbmdlZC5cbiAgICAgIC8vIGJlY2F1c2Ugdi1tb2RlbCBoYXMgYSBsb3dlciBwcmlvcml0eSB0aGFuIHYtZm9yLFxuICAgICAgLy8gdGhlIHYtbW9kZWwgaXMgbm90IGJvdW5kIGhlcmUgeWV0LCBzbyB3ZSBoYXZlIHRvXG4gICAgICAvLyByZXRyaXZlIGl0IGluIHRoZSBhY3R1YWwgdXBkYXRlTW9kZWwoKSBmdW5jdGlvbi5cbiAgICAgIHZhciB0YWcgPSB0aGlzLmVsLnRhZ05hbWU7XG4gICAgICB0aGlzLmlzT3B0aW9uID0gKHRhZyA9PT0gJ09QVElPTicgfHwgdGFnID09PSAnT1BUR1JPVVAnKSAmJiB0aGlzLmVsLnBhcmVudE5vZGUudGFnTmFtZSA9PT0gJ1NFTEVDVCc7XG5cbiAgICAgIC8vIHNldHVwIGFuY2hvciBub2Rlc1xuICAgICAgdGhpcy5zdGFydCA9IGNyZWF0ZUFuY2hvcigndi1mb3Itc3RhcnQnKTtcbiAgICAgIHRoaXMuZW5kID0gY3JlYXRlQW5jaG9yKCd2LWZvci1lbmQnKTtcbiAgICAgIHJlcGxhY2UodGhpcy5lbCwgdGhpcy5lbmQpO1xuICAgICAgYmVmb3JlKHRoaXMuc3RhcnQsIHRoaXMuZW5kKTtcblxuICAgICAgLy8gY2FjaGVcbiAgICAgIHRoaXMuY2FjaGUgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuXG4gICAgICAvLyBmcmFnbWVudCBmYWN0b3J5XG4gICAgICB0aGlzLmZhY3RvcnkgPSBuZXcgRnJhZ21lbnRGYWN0b3J5KHRoaXMudm0sIHRoaXMuZWwpO1xuICAgIH0sXG5cbiAgICB1cGRhdGU6IGZ1bmN0aW9uIHVwZGF0ZShkYXRhKSB7XG4gICAgICB0aGlzLmRpZmYoZGF0YSk7XG4gICAgICB0aGlzLnVwZGF0ZVJlZigpO1xuICAgICAgdGhpcy51cGRhdGVNb2RlbCgpO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBEaWZmLCBiYXNlZCBvbiBuZXcgZGF0YSBhbmQgb2xkIGRhdGEsIGRldGVybWluZSB0aGVcbiAgICAgKiBtaW5pbXVtIGFtb3VudCBvZiBET00gbWFuaXB1bGF0aW9ucyBuZWVkZWQgdG8gbWFrZSB0aGVcbiAgICAgKiBET00gcmVmbGVjdCB0aGUgbmV3IGRhdGEgQXJyYXkuXG4gICAgICpcbiAgICAgKiBUaGUgYWxnb3JpdGhtIGRpZmZzIHRoZSBuZXcgZGF0YSBBcnJheSBieSBzdG9yaW5nIGFcbiAgICAgKiBoaWRkZW4gcmVmZXJlbmNlIHRvIGFuIG93bmVyIHZtIGluc3RhbmNlIG9uIHByZXZpb3VzbHlcbiAgICAgKiBzZWVuIGRhdGEuIFRoaXMgYWxsb3dzIHVzIHRvIGFjaGlldmUgTyhuKSB3aGljaCBpc1xuICAgICAqIGJldHRlciB0aGFuIGEgbGV2ZW5zaHRlaW4gZGlzdGFuY2UgYmFzZWQgYWxnb3JpdGhtLFxuICAgICAqIHdoaWNoIGlzIE8obSAqIG4pLlxuICAgICAqXG4gICAgICogQHBhcmFtIHtBcnJheX0gZGF0YVxuICAgICAqL1xuXG4gICAgZGlmZjogZnVuY3Rpb24gZGlmZihkYXRhKSB7XG4gICAgICAvLyBjaGVjayBpZiB0aGUgQXJyYXkgd2FzIGNvbnZlcnRlZCBmcm9tIGFuIE9iamVjdFxuICAgICAgdmFyIGl0ZW0gPSBkYXRhWzBdO1xuICAgICAgdmFyIGNvbnZlcnRlZEZyb21PYmplY3QgPSB0aGlzLmZyb21PYmplY3QgPSBpc09iamVjdChpdGVtKSAmJiBoYXNPd24oaXRlbSwgJyRrZXknKSAmJiBoYXNPd24oaXRlbSwgJyR2YWx1ZScpO1xuXG4gICAgICB2YXIgdHJhY2tCeUtleSA9IHRoaXMucGFyYW1zLnRyYWNrQnk7XG4gICAgICB2YXIgb2xkRnJhZ3MgPSB0aGlzLmZyYWdzO1xuICAgICAgdmFyIGZyYWdzID0gdGhpcy5mcmFncyA9IG5ldyBBcnJheShkYXRhLmxlbmd0aCk7XG4gICAgICB2YXIgYWxpYXMgPSB0aGlzLmFsaWFzO1xuICAgICAgdmFyIGl0ZXJhdG9yID0gdGhpcy5pdGVyYXRvcjtcbiAgICAgIHZhciBzdGFydCA9IHRoaXMuc3RhcnQ7XG4gICAgICB2YXIgZW5kID0gdGhpcy5lbmQ7XG4gICAgICB2YXIgaW5Eb2N1bWVudCA9IGluRG9jKHN0YXJ0KTtcbiAgICAgIHZhciBpbml0ID0gIW9sZEZyYWdzO1xuICAgICAgdmFyIGksIGwsIGZyYWcsIGtleSwgdmFsdWUsIHByaW1pdGl2ZTtcblxuICAgICAgLy8gRmlyc3QgcGFzcywgZ28gdGhyb3VnaCB0aGUgbmV3IEFycmF5IGFuZCBmaWxsIHVwXG4gICAgICAvLyB0aGUgbmV3IGZyYWdzIGFycmF5LiBJZiBhIHBpZWNlIG9mIGRhdGEgaGFzIGEgY2FjaGVkXG4gICAgICAvLyBpbnN0YW5jZSBmb3IgaXQsIHdlIHJldXNlIGl0LiBPdGhlcndpc2UgYnVpbGQgYSBuZXdcbiAgICAgIC8vIGluc3RhbmNlLlxuICAgICAgZm9yIChpID0gMCwgbCA9IGRhdGEubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG4gICAgICAgIGl0ZW0gPSBkYXRhW2ldO1xuICAgICAgICBrZXkgPSBjb252ZXJ0ZWRGcm9tT2JqZWN0ID8gaXRlbS4ka2V5IDogbnVsbDtcbiAgICAgICAgdmFsdWUgPSBjb252ZXJ0ZWRGcm9tT2JqZWN0ID8gaXRlbS4kdmFsdWUgOiBpdGVtO1xuICAgICAgICBwcmltaXRpdmUgPSAhaXNPYmplY3QodmFsdWUpO1xuICAgICAgICBmcmFnID0gIWluaXQgJiYgdGhpcy5nZXRDYWNoZWRGcmFnKHZhbHVlLCBpLCBrZXkpO1xuICAgICAgICBpZiAoZnJhZykge1xuICAgICAgICAgIC8vIHJldXNhYmxlIGZyYWdtZW50XG4gICAgICAgICAgZnJhZy5yZXVzZWQgPSB0cnVlO1xuICAgICAgICAgIC8vIHVwZGF0ZSAkaW5kZXhcbiAgICAgICAgICBmcmFnLnNjb3BlLiRpbmRleCA9IGk7XG4gICAgICAgICAgLy8gdXBkYXRlICRrZXlcbiAgICAgICAgICBpZiAoa2V5KSB7XG4gICAgICAgICAgICBmcmFnLnNjb3BlLiRrZXkgPSBrZXk7XG4gICAgICAgICAgfVxuICAgICAgICAgIC8vIHVwZGF0ZSBpdGVyYXRvclxuICAgICAgICAgIGlmIChpdGVyYXRvcikge1xuICAgICAgICAgICAgZnJhZy5zY29wZVtpdGVyYXRvcl0gPSBrZXkgIT09IG51bGwgPyBrZXkgOiBpO1xuICAgICAgICAgIH1cbiAgICAgICAgICAvLyB1cGRhdGUgZGF0YSBmb3IgdHJhY2stYnksIG9iamVjdCByZXBlYXQgJlxuICAgICAgICAgIC8vIHByaW1pdGl2ZSB2YWx1ZXMuXG4gICAgICAgICAgaWYgKHRyYWNrQnlLZXkgfHwgY29udmVydGVkRnJvbU9iamVjdCB8fCBwcmltaXRpdmUpIHtcbiAgICAgICAgICAgIHdpdGhvdXRDb252ZXJzaW9uKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgZnJhZy5zY29wZVthbGlhc10gPSB2YWx1ZTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAvLyBuZXcgaXNudGFuY2VcbiAgICAgICAgICBmcmFnID0gdGhpcy5jcmVhdGUodmFsdWUsIGFsaWFzLCBpLCBrZXkpO1xuICAgICAgICAgIGZyYWcuZnJlc2ggPSAhaW5pdDtcbiAgICAgICAgfVxuICAgICAgICBmcmFnc1tpXSA9IGZyYWc7XG4gICAgICAgIGlmIChpbml0KSB7XG4gICAgICAgICAgZnJhZy5iZWZvcmUoZW5kKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICAvLyB3ZSdyZSBkb25lIGZvciB0aGUgaW5pdGlhbCByZW5kZXIuXG4gICAgICBpZiAoaW5pdCkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIC8vIFNlY29uZCBwYXNzLCBnbyB0aHJvdWdoIHRoZSBvbGQgZnJhZ21lbnRzIGFuZFxuICAgICAgLy8gZGVzdHJveSB0aG9zZSB3aG8gYXJlIG5vdCByZXVzZWQgKGFuZCByZW1vdmUgdGhlbVxuICAgICAgLy8gZnJvbSBjYWNoZSlcbiAgICAgIHZhciByZW1vdmFsSW5kZXggPSAwO1xuICAgICAgdmFyIHRvdGFsUmVtb3ZlZCA9IG9sZEZyYWdzLmxlbmd0aCAtIGZyYWdzLmxlbmd0aDtcbiAgICAgIC8vIHdoZW4gcmVtb3ZpbmcgYSBsYXJnZSBudW1iZXIgb2YgZnJhZ21lbnRzLCB3YXRjaGVyIHJlbW92YWxcbiAgICAgIC8vIHR1cm5zIG91dCB0byBiZSBhIHBlcmYgYm90dGxlbmVjaywgc28gd2UgYmF0Y2ggdGhlIHdhdGNoZXJcbiAgICAgIC8vIHJlbW92YWxzIGludG8gYSBzaW5nbGUgZmlsdGVyIGNhbGwhXG4gICAgICB0aGlzLnZtLl92Rm9yUmVtb3ZpbmcgPSB0cnVlO1xuICAgICAgZm9yIChpID0gMCwgbCA9IG9sZEZyYWdzLmxlbmd0aDsgaSA8IGw7IGkrKykge1xuICAgICAgICBmcmFnID0gb2xkRnJhZ3NbaV07XG4gICAgICAgIGlmICghZnJhZy5yZXVzZWQpIHtcbiAgICAgICAgICB0aGlzLmRlbGV0ZUNhY2hlZEZyYWcoZnJhZyk7XG4gICAgICAgICAgdGhpcy5yZW1vdmUoZnJhZywgcmVtb3ZhbEluZGV4KyssIHRvdGFsUmVtb3ZlZCwgaW5Eb2N1bWVudCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHRoaXMudm0uX3ZGb3JSZW1vdmluZyA9IGZhbHNlO1xuICAgICAgaWYgKHJlbW92YWxJbmRleCkge1xuICAgICAgICB0aGlzLnZtLl93YXRjaGVycyA9IHRoaXMudm0uX3dhdGNoZXJzLmZpbHRlcihmdW5jdGlvbiAodykge1xuICAgICAgICAgIHJldHVybiB3LmFjdGl2ZTtcbiAgICAgICAgfSk7XG4gICAgICB9XG5cbiAgICAgIC8vIEZpbmFsIHBhc3MsIG1vdmUvaW5zZXJ0IG5ldyBmcmFnbWVudHMgaW50byB0aGVcbiAgICAgIC8vIHJpZ2h0IHBsYWNlLlxuICAgICAgdmFyIHRhcmdldFByZXYsIHByZXZFbCwgY3VycmVudFByZXY7XG4gICAgICB2YXIgaW5zZXJ0aW9uSW5kZXggPSAwO1xuICAgICAgZm9yIChpID0gMCwgbCA9IGZyYWdzLmxlbmd0aDsgaSA8IGw7IGkrKykge1xuICAgICAgICBmcmFnID0gZnJhZ3NbaV07XG4gICAgICAgIC8vIHRoaXMgaXMgdGhlIGZyYWcgdGhhdCB3ZSBzaG91bGQgYmUgYWZ0ZXJcbiAgICAgICAgdGFyZ2V0UHJldiA9IGZyYWdzW2kgLSAxXTtcbiAgICAgICAgcHJldkVsID0gdGFyZ2V0UHJldiA/IHRhcmdldFByZXYuc3RhZ2dlckNiID8gdGFyZ2V0UHJldi5zdGFnZ2VyQW5jaG9yIDogdGFyZ2V0UHJldi5lbmQgfHwgdGFyZ2V0UHJldi5ub2RlIDogc3RhcnQ7XG4gICAgICAgIGlmIChmcmFnLnJldXNlZCAmJiAhZnJhZy5zdGFnZ2VyQ2IpIHtcbiAgICAgICAgICBjdXJyZW50UHJldiA9IGZpbmRQcmV2RnJhZyhmcmFnLCBzdGFydCwgdGhpcy5pZCk7XG4gICAgICAgICAgaWYgKGN1cnJlbnRQcmV2ICE9PSB0YXJnZXRQcmV2ICYmICghY3VycmVudFByZXYgfHxcbiAgICAgICAgICAvLyBvcHRpbWl6YXRpb24gZm9yIG1vdmluZyBhIHNpbmdsZSBpdGVtLlxuICAgICAgICAgIC8vIHRoYW5rcyB0byBzdWdnZXN0aW9ucyBieSBAbGl2b3JhcyBpbiAjMTgwN1xuICAgICAgICAgIGZpbmRQcmV2RnJhZyhjdXJyZW50UHJldiwgc3RhcnQsIHRoaXMuaWQpICE9PSB0YXJnZXRQcmV2KSkge1xuICAgICAgICAgICAgdGhpcy5tb3ZlKGZyYWcsIHByZXZFbCk7XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIC8vIG5ldyBpbnN0YW5jZSwgb3Igc3RpbGwgaW4gc3RhZ2dlci5cbiAgICAgICAgICAvLyBpbnNlcnQgd2l0aCB1cGRhdGVkIHN0YWdnZXIgaW5kZXguXG4gICAgICAgICAgdGhpcy5pbnNlcnQoZnJhZywgaW5zZXJ0aW9uSW5kZXgrKywgcHJldkVsLCBpbkRvY3VtZW50KTtcbiAgICAgICAgfVxuICAgICAgICBmcmFnLnJldXNlZCA9IGZyYWcuZnJlc2ggPSBmYWxzZTtcbiAgICAgIH1cbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogQ3JlYXRlIGEgbmV3IGZyYWdtZW50IGluc3RhbmNlLlxuICAgICAqXG4gICAgICogQHBhcmFtIHsqfSB2YWx1ZVxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBhbGlhc1xuICAgICAqIEBwYXJhbSB7TnVtYmVyfSBpbmRleFxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBba2V5XVxuICAgICAqIEByZXR1cm4ge0ZyYWdtZW50fVxuICAgICAqL1xuXG4gICAgY3JlYXRlOiBmdW5jdGlvbiBjcmVhdGUodmFsdWUsIGFsaWFzLCBpbmRleCwga2V5KSB7XG4gICAgICB2YXIgaG9zdCA9IHRoaXMuX2hvc3Q7XG4gICAgICAvLyBjcmVhdGUgaXRlcmF0aW9uIHNjb3BlXG4gICAgICB2YXIgcGFyZW50U2NvcGUgPSB0aGlzLl9zY29wZSB8fCB0aGlzLnZtO1xuICAgICAgdmFyIHNjb3BlID0gT2JqZWN0LmNyZWF0ZShwYXJlbnRTY29wZSk7XG4gICAgICAvLyByZWYgaG9sZGVyIGZvciB0aGUgc2NvcGVcbiAgICAgIHNjb3BlLiRyZWZzID0gT2JqZWN0LmNyZWF0ZShwYXJlbnRTY29wZS4kcmVmcyk7XG4gICAgICBzY29wZS4kZWxzID0gT2JqZWN0LmNyZWF0ZShwYXJlbnRTY29wZS4kZWxzKTtcbiAgICAgIC8vIG1ha2Ugc3VyZSBwb2ludCAkcGFyZW50IHRvIHBhcmVudCBzY29wZVxuICAgICAgc2NvcGUuJHBhcmVudCA9IHBhcmVudFNjb3BlO1xuICAgICAgLy8gZm9yIHR3by13YXkgYmluZGluZyBvbiBhbGlhc1xuICAgICAgc2NvcGUuJGZvckNvbnRleHQgPSB0aGlzO1xuICAgICAgLy8gZGVmaW5lIHNjb3BlIHByb3BlcnRpZXNcbiAgICAgIC8vIGltcG9ydGFudDogZGVmaW5lIHRoZSBzY29wZSBhbGlhcyB3aXRob3V0IGZvcmNlZCBjb252ZXJzaW9uXG4gICAgICAvLyBzbyB0aGF0IGZyb3plbiBkYXRhIHN0cnVjdHVyZXMgcmVtYWluIG5vbi1yZWFjdGl2ZS5cbiAgICAgIHdpdGhvdXRDb252ZXJzaW9uKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgZGVmaW5lUmVhY3RpdmUoc2NvcGUsIGFsaWFzLCB2YWx1ZSk7XG4gICAgICB9KTtcbiAgICAgIGRlZmluZVJlYWN0aXZlKHNjb3BlLCAnJGluZGV4JywgaW5kZXgpO1xuICAgICAgaWYgKGtleSkge1xuICAgICAgICBkZWZpbmVSZWFjdGl2ZShzY29wZSwgJyRrZXknLCBrZXkpO1xuICAgICAgfSBlbHNlIGlmIChzY29wZS4ka2V5KSB7XG4gICAgICAgIC8vIGF2b2lkIGFjY2lkZW50YWwgZmFsbGJhY2tcbiAgICAgICAgZGVmKHNjb3BlLCAnJGtleScsIG51bGwpO1xuICAgICAgfVxuICAgICAgaWYgKHRoaXMuaXRlcmF0b3IpIHtcbiAgICAgICAgZGVmaW5lUmVhY3RpdmUoc2NvcGUsIHRoaXMuaXRlcmF0b3IsIGtleSAhPT0gbnVsbCA/IGtleSA6IGluZGV4KTtcbiAgICAgIH1cbiAgICAgIHZhciBmcmFnID0gdGhpcy5mYWN0b3J5LmNyZWF0ZShob3N0LCBzY29wZSwgdGhpcy5fZnJhZyk7XG4gICAgICBmcmFnLmZvcklkID0gdGhpcy5pZDtcbiAgICAgIHRoaXMuY2FjaGVGcmFnKHZhbHVlLCBmcmFnLCBpbmRleCwga2V5KTtcbiAgICAgIHJldHVybiBmcmFnO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBVcGRhdGUgdGhlIHYtcmVmIG9uIG93bmVyIHZtLlxuICAgICAqL1xuXG4gICAgdXBkYXRlUmVmOiBmdW5jdGlvbiB1cGRhdGVSZWYoKSB7XG4gICAgICB2YXIgcmVmID0gdGhpcy5kZXNjcmlwdG9yLnJlZjtcbiAgICAgIGlmICghcmVmKSByZXR1cm47XG4gICAgICB2YXIgaGFzaCA9ICh0aGlzLl9zY29wZSB8fCB0aGlzLnZtKS4kcmVmcztcbiAgICAgIHZhciByZWZzO1xuICAgICAgaWYgKCF0aGlzLmZyb21PYmplY3QpIHtcbiAgICAgICAgcmVmcyA9IHRoaXMuZnJhZ3MubWFwKGZpbmRWbUZyb21GcmFnKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJlZnMgPSB7fTtcbiAgICAgICAgdGhpcy5mcmFncy5mb3JFYWNoKGZ1bmN0aW9uIChmcmFnKSB7XG4gICAgICAgICAgcmVmc1tmcmFnLnNjb3BlLiRrZXldID0gZmluZFZtRnJvbUZyYWcoZnJhZyk7XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgICAgaGFzaFtyZWZdID0gcmVmcztcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogRm9yIG9wdGlvbiBsaXN0cywgdXBkYXRlIHRoZSBjb250YWluaW5nIHYtbW9kZWwgb25cbiAgICAgKiBwYXJlbnQgPHNlbGVjdD4uXG4gICAgICovXG5cbiAgICB1cGRhdGVNb2RlbDogZnVuY3Rpb24gdXBkYXRlTW9kZWwoKSB7XG4gICAgICBpZiAodGhpcy5pc09wdGlvbikge1xuICAgICAgICB2YXIgcGFyZW50ID0gdGhpcy5zdGFydC5wYXJlbnROb2RlO1xuICAgICAgICB2YXIgbW9kZWwgPSBwYXJlbnQgJiYgcGFyZW50Ll9fdl9tb2RlbDtcbiAgICAgICAgaWYgKG1vZGVsKSB7XG4gICAgICAgICAgbW9kZWwuZm9yY2VVcGRhdGUoKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBJbnNlcnQgYSBmcmFnbWVudC4gSGFuZGxlcyBzdGFnZ2VyaW5nLlxuICAgICAqXG4gICAgICogQHBhcmFtIHtGcmFnbWVudH0gZnJhZ1xuICAgICAqIEBwYXJhbSB7TnVtYmVyfSBpbmRleFxuICAgICAqIEBwYXJhbSB7Tm9kZX0gcHJldkVsXG4gICAgICogQHBhcmFtIHtCb29sZWFufSBpbkRvY3VtZW50XG4gICAgICovXG5cbiAgICBpbnNlcnQ6IGZ1bmN0aW9uIGluc2VydChmcmFnLCBpbmRleCwgcHJldkVsLCBpbkRvY3VtZW50KSB7XG4gICAgICBpZiAoZnJhZy5zdGFnZ2VyQ2IpIHtcbiAgICAgICAgZnJhZy5zdGFnZ2VyQ2IuY2FuY2VsKCk7XG4gICAgICAgIGZyYWcuc3RhZ2dlckNiID0gbnVsbDtcbiAgICAgIH1cbiAgICAgIHZhciBzdGFnZ2VyQW1vdW50ID0gdGhpcy5nZXRTdGFnZ2VyKGZyYWcsIGluZGV4LCBudWxsLCAnZW50ZXInKTtcbiAgICAgIGlmIChpbkRvY3VtZW50ICYmIHN0YWdnZXJBbW91bnQpIHtcbiAgICAgICAgLy8gY3JlYXRlIGFuIGFuY2hvciBhbmQgaW5zZXJ0IGl0IHN5bmNocm9ub3VzbHksXG4gICAgICAgIC8vIHNvIHRoYXQgd2UgY2FuIHJlc29sdmUgdGhlIGNvcnJlY3Qgb3JkZXIgd2l0aG91dFxuICAgICAgICAvLyB3b3JyeWluZyBhYm91dCBzb21lIGVsZW1lbnRzIG5vdCBpbnNlcnRlZCB5ZXRcbiAgICAgICAgdmFyIGFuY2hvciA9IGZyYWcuc3RhZ2dlckFuY2hvcjtcbiAgICAgICAgaWYgKCFhbmNob3IpIHtcbiAgICAgICAgICBhbmNob3IgPSBmcmFnLnN0YWdnZXJBbmNob3IgPSBjcmVhdGVBbmNob3IoJ3N0YWdnZXItYW5jaG9yJyk7XG4gICAgICAgICAgYW5jaG9yLl9fdl9mcmFnID0gZnJhZztcbiAgICAgICAgfVxuICAgICAgICBhZnRlcihhbmNob3IsIHByZXZFbCk7XG4gICAgICAgIHZhciBvcCA9IGZyYWcuc3RhZ2dlckNiID0gY2FuY2VsbGFibGUoZnVuY3Rpb24gKCkge1xuICAgICAgICAgIGZyYWcuc3RhZ2dlckNiID0gbnVsbDtcbiAgICAgICAgICBmcmFnLmJlZm9yZShhbmNob3IpO1xuICAgICAgICAgIHJlbW92ZShhbmNob3IpO1xuICAgICAgICB9KTtcbiAgICAgICAgc2V0VGltZW91dChvcCwgc3RhZ2dlckFtb3VudCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB2YXIgdGFyZ2V0ID0gcHJldkVsLm5leHRTaWJsaW5nO1xuICAgICAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgaWYgKi9cbiAgICAgICAgaWYgKCF0YXJnZXQpIHtcbiAgICAgICAgICAvLyByZXNldCBlbmQgYW5jaG9yIHBvc2l0aW9uIGluIGNhc2UgdGhlIHBvc2l0aW9uIHdhcyBtZXNzZWQgdXBcbiAgICAgICAgICAvLyBieSBhbiBleHRlcm5hbCBkcmFnLW4tZHJvcCBsaWJyYXJ5LlxuICAgICAgICAgIGFmdGVyKHRoaXMuZW5kLCBwcmV2RWwpO1xuICAgICAgICAgIHRhcmdldCA9IHRoaXMuZW5kO1xuICAgICAgICB9XG4gICAgICAgIGZyYWcuYmVmb3JlKHRhcmdldCk7XG4gICAgICB9XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIFJlbW92ZSBhIGZyYWdtZW50LiBIYW5kbGVzIHN0YWdnZXJpbmcuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge0ZyYWdtZW50fSBmcmFnXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IGluZGV4XG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IHRvdGFsXG4gICAgICogQHBhcmFtIHtCb29sZWFufSBpbkRvY3VtZW50XG4gICAgICovXG5cbiAgICByZW1vdmU6IGZ1bmN0aW9uIHJlbW92ZShmcmFnLCBpbmRleCwgdG90YWwsIGluRG9jdW1lbnQpIHtcbiAgICAgIGlmIChmcmFnLnN0YWdnZXJDYikge1xuICAgICAgICBmcmFnLnN0YWdnZXJDYi5jYW5jZWwoKTtcbiAgICAgICAgZnJhZy5zdGFnZ2VyQ2IgPSBudWxsO1xuICAgICAgICAvLyBpdCdzIG5vdCBwb3NzaWJsZSBmb3IgdGhlIHNhbWUgZnJhZyB0byBiZSByZW1vdmVkXG4gICAgICAgIC8vIHR3aWNlLCBzbyBpZiB3ZSBoYXZlIGEgcGVuZGluZyBzdGFnZ2VyIGNhbGxiYWNrLFxuICAgICAgICAvLyBpdCBtZWFucyB0aGlzIGZyYWcgaXMgcXVldWVkIGZvciBlbnRlciBidXQgcmVtb3ZlZFxuICAgICAgICAvLyBiZWZvcmUgaXRzIHRyYW5zaXRpb24gc3RhcnRlZC4gU2luY2UgaXQgaXMgYWxyZWFkeVxuICAgICAgICAvLyBkZXN0cm95ZWQsIHdlIGNhbiBqdXN0IGxlYXZlIGl0IGluIGRldGFjaGVkIHN0YXRlLlxuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICB2YXIgc3RhZ2dlckFtb3VudCA9IHRoaXMuZ2V0U3RhZ2dlcihmcmFnLCBpbmRleCwgdG90YWwsICdsZWF2ZScpO1xuICAgICAgaWYgKGluRG9jdW1lbnQgJiYgc3RhZ2dlckFtb3VudCkge1xuICAgICAgICB2YXIgb3AgPSBmcmFnLnN0YWdnZXJDYiA9IGNhbmNlbGxhYmxlKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICBmcmFnLnN0YWdnZXJDYiA9IG51bGw7XG4gICAgICAgICAgZnJhZy5yZW1vdmUoKTtcbiAgICAgICAgfSk7XG4gICAgICAgIHNldFRpbWVvdXQob3AsIHN0YWdnZXJBbW91bnQpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZnJhZy5yZW1vdmUoKTtcbiAgICAgIH1cbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogTW92ZSBhIGZyYWdtZW50IHRvIGEgbmV3IHBvc2l0aW9uLlxuICAgICAqIEZvcmNlIG5vIHRyYW5zaXRpb24uXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge0ZyYWdtZW50fSBmcmFnXG4gICAgICogQHBhcmFtIHtOb2RlfSBwcmV2RWxcbiAgICAgKi9cblxuICAgIG1vdmU6IGZ1bmN0aW9uIG1vdmUoZnJhZywgcHJldkVsKSB7XG4gICAgICAvLyBmaXggYSBjb21tb24gaXNzdWUgd2l0aCBTb3J0YWJsZTpcbiAgICAgIC8vIGlmIHByZXZFbCBkb2Vzbid0IGhhdmUgbmV4dFNpYmxpbmcsIHRoaXMgbWVhbnMgaXQnc1xuICAgICAgLy8gYmVlbiBkcmFnZ2VkIGFmdGVyIHRoZSBlbmQgYW5jaG9yLiBKdXN0IHJlLXBvc2l0aW9uXG4gICAgICAvLyB0aGUgZW5kIGFuY2hvciB0byB0aGUgZW5kIG9mIHRoZSBjb250YWluZXIuXG4gICAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgaWYgKi9cbiAgICAgIGlmICghcHJldkVsLm5leHRTaWJsaW5nKSB7XG4gICAgICAgIHRoaXMuZW5kLnBhcmVudE5vZGUuYXBwZW5kQ2hpbGQodGhpcy5lbmQpO1xuICAgICAgfVxuICAgICAgZnJhZy5iZWZvcmUocHJldkVsLm5leHRTaWJsaW5nLCBmYWxzZSk7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIENhY2hlIGEgZnJhZ21lbnQgdXNpbmcgdHJhY2stYnkgb3IgdGhlIG9iamVjdCBrZXkuXG4gICAgICpcbiAgICAgKiBAcGFyYW0geyp9IHZhbHVlXG4gICAgICogQHBhcmFtIHtGcmFnbWVudH0gZnJhZ1xuICAgICAqIEBwYXJhbSB7TnVtYmVyfSBpbmRleFxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBba2V5XVxuICAgICAqL1xuXG4gICAgY2FjaGVGcmFnOiBmdW5jdGlvbiBjYWNoZUZyYWcodmFsdWUsIGZyYWcsIGluZGV4LCBrZXkpIHtcbiAgICAgIHZhciB0cmFja0J5S2V5ID0gdGhpcy5wYXJhbXMudHJhY2tCeTtcbiAgICAgIHZhciBjYWNoZSA9IHRoaXMuY2FjaGU7XG4gICAgICB2YXIgcHJpbWl0aXZlID0gIWlzT2JqZWN0KHZhbHVlKTtcbiAgICAgIHZhciBpZDtcbiAgICAgIGlmIChrZXkgfHwgdHJhY2tCeUtleSB8fCBwcmltaXRpdmUpIHtcbiAgICAgICAgaWQgPSBnZXRUcmFja0J5S2V5KGluZGV4LCBrZXksIHZhbHVlLCB0cmFja0J5S2V5KTtcbiAgICAgICAgaWYgKCFjYWNoZVtpZF0pIHtcbiAgICAgICAgICBjYWNoZVtpZF0gPSBmcmFnO1xuICAgICAgICB9IGVsc2UgaWYgKHRyYWNrQnlLZXkgIT09ICckaW5kZXgnKSB7XG4gICAgICAgICAgJ2RldmVsb3BtZW50JyAhPT0gJ3Byb2R1Y3Rpb24nICYmIHRoaXMud2FybkR1cGxpY2F0ZSh2YWx1ZSk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGlkID0gdGhpcy5pZDtcbiAgICAgICAgaWYgKGhhc093bih2YWx1ZSwgaWQpKSB7XG4gICAgICAgICAgaWYgKHZhbHVlW2lkXSA9PT0gbnVsbCkge1xuICAgICAgICAgICAgdmFsdWVbaWRdID0gZnJhZztcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgJ2RldmVsb3BtZW50JyAhPT0gJ3Byb2R1Y3Rpb24nICYmIHRoaXMud2FybkR1cGxpY2F0ZSh2YWx1ZSk7XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2UgaWYgKE9iamVjdC5pc0V4dGVuc2libGUodmFsdWUpKSB7XG4gICAgICAgICAgZGVmKHZhbHVlLCBpZCwgZnJhZyk7XG4gICAgICAgIH0gZWxzZSBpZiAoJ2RldmVsb3BtZW50JyAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgICAgICAgd2FybignRnJvemVuIHYtZm9yIG9iamVjdHMgY2Fubm90IGJlIGF1dG9tYXRpY2FsbHkgdHJhY2tlZCwgbWFrZSBzdXJlIHRvICcgKyAncHJvdmlkZSBhIHRyYWNrLWJ5IGtleS4nKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgZnJhZy5yYXcgPSB2YWx1ZTtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogR2V0IGEgY2FjaGVkIGZyYWdtZW50IGZyb20gdGhlIHZhbHVlL2luZGV4L2tleVxuICAgICAqXG4gICAgICogQHBhcmFtIHsqfSB2YWx1ZVxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSBpbmRleFxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBrZXlcbiAgICAgKiBAcmV0dXJuIHtGcmFnbWVudH1cbiAgICAgKi9cblxuICAgIGdldENhY2hlZEZyYWc6IGZ1bmN0aW9uIGdldENhY2hlZEZyYWcodmFsdWUsIGluZGV4LCBrZXkpIHtcbiAgICAgIHZhciB0cmFja0J5S2V5ID0gdGhpcy5wYXJhbXMudHJhY2tCeTtcbiAgICAgIHZhciBwcmltaXRpdmUgPSAhaXNPYmplY3QodmFsdWUpO1xuICAgICAgdmFyIGZyYWc7XG4gICAgICBpZiAoa2V5IHx8IHRyYWNrQnlLZXkgfHwgcHJpbWl0aXZlKSB7XG4gICAgICAgIHZhciBpZCA9IGdldFRyYWNrQnlLZXkoaW5kZXgsIGtleSwgdmFsdWUsIHRyYWNrQnlLZXkpO1xuICAgICAgICBmcmFnID0gdGhpcy5jYWNoZVtpZF07XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBmcmFnID0gdmFsdWVbdGhpcy5pZF07XG4gICAgICB9XG4gICAgICBpZiAoZnJhZyAmJiAoZnJhZy5yZXVzZWQgfHwgZnJhZy5mcmVzaCkpIHtcbiAgICAgICAgJ2RldmVsb3BtZW50JyAhPT0gJ3Byb2R1Y3Rpb24nICYmIHRoaXMud2FybkR1cGxpY2F0ZSh2YWx1ZSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gZnJhZztcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogRGVsZXRlIGEgZnJhZ21lbnQgZnJvbSBjYWNoZS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7RnJhZ21lbnR9IGZyYWdcbiAgICAgKi9cblxuICAgIGRlbGV0ZUNhY2hlZEZyYWc6IGZ1bmN0aW9uIGRlbGV0ZUNhY2hlZEZyYWcoZnJhZykge1xuICAgICAgdmFyIHZhbHVlID0gZnJhZy5yYXc7XG4gICAgICB2YXIgdHJhY2tCeUtleSA9IHRoaXMucGFyYW1zLnRyYWNrQnk7XG4gICAgICB2YXIgc2NvcGUgPSBmcmFnLnNjb3BlO1xuICAgICAgdmFyIGluZGV4ID0gc2NvcGUuJGluZGV4O1xuICAgICAgLy8gZml4ICM5NDg6IGF2b2lkIGFjY2lkZW50YWxseSBmYWxsIHRocm91Z2ggdG9cbiAgICAgIC8vIGEgcGFyZW50IHJlcGVhdGVyIHdoaWNoIGhhcHBlbnMgdG8gaGF2ZSAka2V5LlxuICAgICAgdmFyIGtleSA9IGhhc093bihzY29wZSwgJyRrZXknKSAmJiBzY29wZS4ka2V5O1xuICAgICAgdmFyIHByaW1pdGl2ZSA9ICFpc09iamVjdCh2YWx1ZSk7XG4gICAgICBpZiAodHJhY2tCeUtleSB8fCBrZXkgfHwgcHJpbWl0aXZlKSB7XG4gICAgICAgIHZhciBpZCA9IGdldFRyYWNrQnlLZXkoaW5kZXgsIGtleSwgdmFsdWUsIHRyYWNrQnlLZXkpO1xuICAgICAgICB0aGlzLmNhY2hlW2lkXSA9IG51bGw7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB2YWx1ZVt0aGlzLmlkXSA9IG51bGw7XG4gICAgICAgIGZyYWcucmF3ID0gbnVsbDtcbiAgICAgIH1cbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogR2V0IHRoZSBzdGFnZ2VyIGFtb3VudCBmb3IgYW4gaW5zZXJ0aW9uL3JlbW92YWwuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge0ZyYWdtZW50fSBmcmFnXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IGluZGV4XG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IHRvdGFsXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IHR5cGVcbiAgICAgKi9cblxuICAgIGdldFN0YWdnZXI6IGZ1bmN0aW9uIGdldFN0YWdnZXIoZnJhZywgaW5kZXgsIHRvdGFsLCB0eXBlKSB7XG4gICAgICB0eXBlID0gdHlwZSArICdTdGFnZ2VyJztcbiAgICAgIHZhciB0cmFucyA9IGZyYWcubm9kZS5fX3ZfdHJhbnM7XG4gICAgICB2YXIgaG9va3MgPSB0cmFucyAmJiB0cmFucy5ob29rcztcbiAgICAgIHZhciBob29rID0gaG9va3MgJiYgKGhvb2tzW3R5cGVdIHx8IGhvb2tzLnN0YWdnZXIpO1xuICAgICAgcmV0dXJuIGhvb2sgPyBob29rLmNhbGwoZnJhZywgaW5kZXgsIHRvdGFsKSA6IGluZGV4ICogcGFyc2VJbnQodGhpcy5wYXJhbXNbdHlwZV0gfHwgdGhpcy5wYXJhbXMuc3RhZ2dlciwgMTApO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBQcmUtcHJvY2VzcyB0aGUgdmFsdWUgYmVmb3JlIHBpcGluZyBpdCB0aHJvdWdoIHRoZVxuICAgICAqIGZpbHRlcnMuIFRoaXMgaXMgcGFzc2VkIHRvIGFuZCBjYWxsZWQgYnkgdGhlIHdhdGNoZXIuXG4gICAgICovXG5cbiAgICBfcHJlUHJvY2VzczogZnVuY3Rpb24gX3ByZVByb2Nlc3ModmFsdWUpIHtcbiAgICAgIC8vIHJlZ2FyZGxlc3Mgb2YgdHlwZSwgc3RvcmUgdGhlIHVuLWZpbHRlcmVkIHJhdyB2YWx1ZS5cbiAgICAgIHRoaXMucmF3VmFsdWUgPSB2YWx1ZTtcbiAgICAgIHJldHVybiB2YWx1ZTtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogUG9zdC1wcm9jZXNzIHRoZSB2YWx1ZSBhZnRlciBpdCBoYXMgYmVlbiBwaXBlZCB0aHJvdWdoXG4gICAgICogdGhlIGZpbHRlcnMuIFRoaXMgaXMgcGFzc2VkIHRvIGFuZCBjYWxsZWQgYnkgdGhlIHdhdGNoZXIuXG4gICAgICpcbiAgICAgKiBJdCBpcyBuZWNlc3NhcnkgZm9yIHRoaXMgdG8gYmUgY2FsbGVkIGR1cmluZyB0aGVcbiAgICAgKiB3YXRoY2VyJ3MgZGVwZW5kZW5jeSBjb2xsZWN0aW9uIHBoYXNlIGJlY2F1c2Ugd2Ugd2FudFxuICAgICAqIHRoZSB2LWZvciB0byB1cGRhdGUgd2hlbiB0aGUgc291cmNlIE9iamVjdCBpcyBtdXRhdGVkLlxuICAgICAqL1xuXG4gICAgX3Bvc3RQcm9jZXNzOiBmdW5jdGlvbiBfcG9zdFByb2Nlc3ModmFsdWUpIHtcbiAgICAgIGlmIChpc0FycmF5KHZhbHVlKSkge1xuICAgICAgICByZXR1cm4gdmFsdWU7XG4gICAgICB9IGVsc2UgaWYgKGlzUGxhaW5PYmplY3QodmFsdWUpKSB7XG4gICAgICAgIC8vIGNvbnZlcnQgcGxhaW4gb2JqZWN0IHRvIGFycmF5LlxuICAgICAgICB2YXIga2V5cyA9IE9iamVjdC5rZXlzKHZhbHVlKTtcbiAgICAgICAgdmFyIGkgPSBrZXlzLmxlbmd0aDtcbiAgICAgICAgdmFyIHJlcyA9IG5ldyBBcnJheShpKTtcbiAgICAgICAgdmFyIGtleTtcbiAgICAgICAgd2hpbGUgKGktLSkge1xuICAgICAgICAgIGtleSA9IGtleXNbaV07XG4gICAgICAgICAgcmVzW2ldID0ge1xuICAgICAgICAgICAgJGtleToga2V5LFxuICAgICAgICAgICAgJHZhbHVlOiB2YWx1ZVtrZXldXG4gICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmVzO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ251bWJlcicgJiYgIWlzTmFOKHZhbHVlKSkge1xuICAgICAgICAgIHZhbHVlID0gcmFuZ2UodmFsdWUpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB2YWx1ZSB8fCBbXTtcbiAgICAgIH1cbiAgICB9LFxuXG4gICAgdW5iaW5kOiBmdW5jdGlvbiB1bmJpbmQoKSB7XG4gICAgICBpZiAodGhpcy5kZXNjcmlwdG9yLnJlZikge1xuICAgICAgICAodGhpcy5fc2NvcGUgfHwgdGhpcy52bSkuJHJlZnNbdGhpcy5kZXNjcmlwdG9yLnJlZl0gPSBudWxsO1xuICAgICAgfVxuICAgICAgaWYgKHRoaXMuZnJhZ3MpIHtcbiAgICAgICAgdmFyIGkgPSB0aGlzLmZyYWdzLmxlbmd0aDtcbiAgICAgICAgdmFyIGZyYWc7XG4gICAgICAgIHdoaWxlIChpLS0pIHtcbiAgICAgICAgICBmcmFnID0gdGhpcy5mcmFnc1tpXTtcbiAgICAgICAgICB0aGlzLmRlbGV0ZUNhY2hlZEZyYWcoZnJhZyk7XG4gICAgICAgICAgZnJhZy5kZXN0cm95KCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH07XG5cbiAgLyoqXG4gICAqIEhlbHBlciB0byBmaW5kIHRoZSBwcmV2aW91cyBlbGVtZW50IHRoYXQgaXMgYSBmcmFnbWVudFxuICAgKiBhbmNob3IuIFRoaXMgaXMgbmVjZXNzYXJ5IGJlY2F1c2UgYSBkZXN0cm95ZWQgZnJhZydzXG4gICAqIGVsZW1lbnQgY291bGQgc3RpbGwgYmUgbGluZ2VyaW5nIGluIHRoZSBET00gYmVmb3JlIGl0c1xuICAgKiBsZWF2aW5nIHRyYW5zaXRpb24gZmluaXNoZXMsIGJ1dCBpdHMgaW5zZXJ0ZWQgZmxhZ1xuICAgKiBzaG91bGQgaGF2ZSBiZWVuIHNldCB0byBmYWxzZSBzbyB3ZSBjYW4gc2tpcCB0aGVtLlxuICAgKlxuICAgKiBJZiB0aGlzIGlzIGEgYmxvY2sgcmVwZWF0LCB3ZSB3YW50IHRvIG1ha2Ugc3VyZSB3ZSBvbmx5XG4gICAqIHJldHVybiBmcmFnIHRoYXQgaXMgYm91bmQgdG8gdGhpcyB2LWZvci4gKHNlZSAjOTI5KVxuICAgKlxuICAgKiBAcGFyYW0ge0ZyYWdtZW50fSBmcmFnXG4gICAqIEBwYXJhbSB7Q29tbWVudHxUZXh0fSBhbmNob3JcbiAgICogQHBhcmFtIHtTdHJpbmd9IGlkXG4gICAqIEByZXR1cm4ge0ZyYWdtZW50fVxuICAgKi9cblxuICBmdW5jdGlvbiBmaW5kUHJldkZyYWcoZnJhZywgYW5jaG9yLCBpZCkge1xuICAgIHZhciBlbCA9IGZyYWcubm9kZS5wcmV2aW91c1NpYmxpbmc7XG4gICAgLyogaXN0YW5idWwgaWdub3JlIGlmICovXG4gICAgaWYgKCFlbCkgcmV0dXJuO1xuICAgIGZyYWcgPSBlbC5fX3ZfZnJhZztcbiAgICB3aGlsZSAoKCFmcmFnIHx8IGZyYWcuZm9ySWQgIT09IGlkIHx8ICFmcmFnLmluc2VydGVkKSAmJiBlbCAhPT0gYW5jaG9yKSB7XG4gICAgICBlbCA9IGVsLnByZXZpb3VzU2libGluZztcbiAgICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBpZiAqL1xuICAgICAgaWYgKCFlbCkgcmV0dXJuO1xuICAgICAgZnJhZyA9IGVsLl9fdl9mcmFnO1xuICAgIH1cbiAgICByZXR1cm4gZnJhZztcbiAgfVxuXG4gIC8qKlxuICAgKiBGaW5kIGEgdm0gZnJvbSBhIGZyYWdtZW50LlxuICAgKlxuICAgKiBAcGFyYW0ge0ZyYWdtZW50fSBmcmFnXG4gICAqIEByZXR1cm4ge1Z1ZXx1bmRlZmluZWR9XG4gICAqL1xuXG4gIGZ1bmN0aW9uIGZpbmRWbUZyb21GcmFnKGZyYWcpIHtcbiAgICB2YXIgbm9kZSA9IGZyYWcubm9kZTtcbiAgICAvLyBoYW5kbGUgbXVsdGktbm9kZSBmcmFnXG4gICAgaWYgKGZyYWcuZW5kKSB7XG4gICAgICB3aGlsZSAoIW5vZGUuX192dWVfXyAmJiBub2RlICE9PSBmcmFnLmVuZCAmJiBub2RlLm5leHRTaWJsaW5nKSB7XG4gICAgICAgIG5vZGUgPSBub2RlLm5leHRTaWJsaW5nO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gbm9kZS5fX3Z1ZV9fO1xuICB9XG5cbiAgLyoqXG4gICAqIENyZWF0ZSBhIHJhbmdlIGFycmF5IGZyb20gZ2l2ZW4gbnVtYmVyLlxuICAgKlxuICAgKiBAcGFyYW0ge051bWJlcn0gblxuICAgKiBAcmV0dXJuIHtBcnJheX1cbiAgICovXG5cbiAgZnVuY3Rpb24gcmFuZ2Uobikge1xuICAgIHZhciBpID0gLTE7XG4gICAgdmFyIHJldCA9IG5ldyBBcnJheShNYXRoLmZsb29yKG4pKTtcbiAgICB3aGlsZSAoKytpIDwgbikge1xuICAgICAgcmV0W2ldID0gaTtcbiAgICB9XG4gICAgcmV0dXJuIHJldDtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgdGhlIHRyYWNrIGJ5IGtleSBmb3IgYW4gaXRlbS5cbiAgICpcbiAgICogQHBhcmFtIHtOdW1iZXJ9IGluZGV4XG4gICAqIEBwYXJhbSB7U3RyaW5nfSBrZXlcbiAgICogQHBhcmFtIHsqfSB2YWx1ZVxuICAgKiBAcGFyYW0ge1N0cmluZ30gW3RyYWNrQnlLZXldXG4gICAqL1xuXG4gIGZ1bmN0aW9uIGdldFRyYWNrQnlLZXkoaW5kZXgsIGtleSwgdmFsdWUsIHRyYWNrQnlLZXkpIHtcbiAgICByZXR1cm4gdHJhY2tCeUtleSA/IHRyYWNrQnlLZXkgPT09ICckaW5kZXgnID8gaW5kZXggOiB0cmFja0J5S2V5LmNoYXJBdCgwKS5tYXRjaCgvXFx3LykgPyBnZXRQYXRoKHZhbHVlLCB0cmFja0J5S2V5KSA6IHZhbHVlW3RyYWNrQnlLZXldIDoga2V5IHx8IHZhbHVlO1xuICB9XG5cbiAgaWYgKCdkZXZlbG9wbWVudCcgIT09ICdwcm9kdWN0aW9uJykge1xuICAgIHZGb3Iud2FybkR1cGxpY2F0ZSA9IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgd2FybignRHVwbGljYXRlIHZhbHVlIGZvdW5kIGluIHYtZm9yPVwiJyArIHRoaXMuZGVzY3JpcHRvci5yYXcgKyAnXCI6ICcgKyBKU09OLnN0cmluZ2lmeSh2YWx1ZSkgKyAnLiBVc2UgdHJhY2stYnk9XCIkaW5kZXhcIiBpZiAnICsgJ3lvdSBhcmUgZXhwZWN0aW5nIGR1cGxpY2F0ZSB2YWx1ZXMuJywgdGhpcy52bSk7XG4gICAgfTtcbiAgfVxuXG4gIHZhciB2SWYgPSB7XG5cbiAgICBwcmlvcml0eTogSUYsXG4gICAgdGVybWluYWw6IHRydWUsXG5cbiAgICBiaW5kOiBmdW5jdGlvbiBiaW5kKCkge1xuICAgICAgdmFyIGVsID0gdGhpcy5lbDtcbiAgICAgIGlmICghZWwuX192dWVfXykge1xuICAgICAgICAvLyBjaGVjayBlbHNlIGJsb2NrXG4gICAgICAgIHZhciBuZXh0ID0gZWwubmV4dEVsZW1lbnRTaWJsaW5nO1xuICAgICAgICBpZiAobmV4dCAmJiBnZXRBdHRyKG5leHQsICd2LWVsc2UnKSAhPT0gbnVsbCkge1xuICAgICAgICAgIHJlbW92ZShuZXh0KTtcbiAgICAgICAgICB0aGlzLmVsc2VFbCA9IG5leHQ7XG4gICAgICAgIH1cbiAgICAgICAgLy8gY2hlY2sgbWFpbiBibG9ja1xuICAgICAgICB0aGlzLmFuY2hvciA9IGNyZWF0ZUFuY2hvcigndi1pZicpO1xuICAgICAgICByZXBsYWNlKGVsLCB0aGlzLmFuY2hvcik7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAnZGV2ZWxvcG1lbnQnICE9PSAncHJvZHVjdGlvbicgJiYgd2Fybigndi1pZj1cIicgKyB0aGlzLmV4cHJlc3Npb24gKyAnXCIgY2Fubm90IGJlICcgKyAndXNlZCBvbiBhbiBpbnN0YW5jZSByb290IGVsZW1lbnQuJywgdGhpcy52bSk7XG4gICAgICAgIHRoaXMuaW52YWxpZCA9IHRydWU7XG4gICAgICB9XG4gICAgfSxcblxuICAgIHVwZGF0ZTogZnVuY3Rpb24gdXBkYXRlKHZhbHVlKSB7XG4gICAgICBpZiAodGhpcy5pbnZhbGlkKSByZXR1cm47XG4gICAgICBpZiAodmFsdWUpIHtcbiAgICAgICAgaWYgKCF0aGlzLmZyYWcpIHtcbiAgICAgICAgICB0aGlzLmluc2VydCgpO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLnJlbW92ZSgpO1xuICAgICAgfVxuICAgIH0sXG5cbiAgICBpbnNlcnQ6IGZ1bmN0aW9uIGluc2VydCgpIHtcbiAgICAgIGlmICh0aGlzLmVsc2VGcmFnKSB7XG4gICAgICAgIHRoaXMuZWxzZUZyYWcucmVtb3ZlKCk7XG4gICAgICAgIHRoaXMuZWxzZUZyYWcgPSBudWxsO1xuICAgICAgfVxuICAgICAgLy8gbGF6eSBpbml0IGZhY3RvcnlcbiAgICAgIGlmICghdGhpcy5mYWN0b3J5KSB7XG4gICAgICAgIHRoaXMuZmFjdG9yeSA9IG5ldyBGcmFnbWVudEZhY3RvcnkodGhpcy52bSwgdGhpcy5lbCk7XG4gICAgICB9XG4gICAgICB0aGlzLmZyYWcgPSB0aGlzLmZhY3RvcnkuY3JlYXRlKHRoaXMuX2hvc3QsIHRoaXMuX3Njb3BlLCB0aGlzLl9mcmFnKTtcbiAgICAgIHRoaXMuZnJhZy5iZWZvcmUodGhpcy5hbmNob3IpO1xuICAgIH0sXG5cbiAgICByZW1vdmU6IGZ1bmN0aW9uIHJlbW92ZSgpIHtcbiAgICAgIGlmICh0aGlzLmZyYWcpIHtcbiAgICAgICAgdGhpcy5mcmFnLnJlbW92ZSgpO1xuICAgICAgICB0aGlzLmZyYWcgPSBudWxsO1xuICAgICAgfVxuICAgICAgaWYgKHRoaXMuZWxzZUVsICYmICF0aGlzLmVsc2VGcmFnKSB7XG4gICAgICAgIGlmICghdGhpcy5lbHNlRmFjdG9yeSkge1xuICAgICAgICAgIHRoaXMuZWxzZUZhY3RvcnkgPSBuZXcgRnJhZ21lbnRGYWN0b3J5KHRoaXMuZWxzZUVsLl9jb250ZXh0IHx8IHRoaXMudm0sIHRoaXMuZWxzZUVsKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmVsc2VGcmFnID0gdGhpcy5lbHNlRmFjdG9yeS5jcmVhdGUodGhpcy5faG9zdCwgdGhpcy5fc2NvcGUsIHRoaXMuX2ZyYWcpO1xuICAgICAgICB0aGlzLmVsc2VGcmFnLmJlZm9yZSh0aGlzLmFuY2hvcik7XG4gICAgICB9XG4gICAgfSxcblxuICAgIHVuYmluZDogZnVuY3Rpb24gdW5iaW5kKCkge1xuICAgICAgaWYgKHRoaXMuZnJhZykge1xuICAgICAgICB0aGlzLmZyYWcuZGVzdHJveSgpO1xuICAgICAgfVxuICAgICAgaWYgKHRoaXMuZWxzZUZyYWcpIHtcbiAgICAgICAgdGhpcy5lbHNlRnJhZy5kZXN0cm95KCk7XG4gICAgICB9XG4gICAgfVxuICB9O1xuXG4gIHZhciBzaG93ID0ge1xuXG4gICAgYmluZDogZnVuY3Rpb24gYmluZCgpIHtcbiAgICAgIC8vIGNoZWNrIGVsc2UgYmxvY2tcbiAgICAgIHZhciBuZXh0ID0gdGhpcy5lbC5uZXh0RWxlbWVudFNpYmxpbmc7XG4gICAgICBpZiAobmV4dCAmJiBnZXRBdHRyKG5leHQsICd2LWVsc2UnKSAhPT0gbnVsbCkge1xuICAgICAgICB0aGlzLmVsc2VFbCA9IG5leHQ7XG4gICAgICB9XG4gICAgfSxcblxuICAgIHVwZGF0ZTogZnVuY3Rpb24gdXBkYXRlKHZhbHVlKSB7XG4gICAgICB0aGlzLmFwcGx5KHRoaXMuZWwsIHZhbHVlKTtcbiAgICAgIGlmICh0aGlzLmVsc2VFbCkge1xuICAgICAgICB0aGlzLmFwcGx5KHRoaXMuZWxzZUVsLCAhdmFsdWUpO1xuICAgICAgfVxuICAgIH0sXG5cbiAgICBhcHBseTogZnVuY3Rpb24gYXBwbHkoZWwsIHZhbHVlKSB7XG4gICAgICBpZiAoaW5Eb2MoZWwpKSB7XG4gICAgICAgIGFwcGx5VHJhbnNpdGlvbihlbCwgdmFsdWUgPyAxIDogLTEsIHRvZ2dsZSwgdGhpcy52bSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0b2dnbGUoKTtcbiAgICAgIH1cbiAgICAgIGZ1bmN0aW9uIHRvZ2dsZSgpIHtcbiAgICAgICAgZWwuc3R5bGUuZGlzcGxheSA9IHZhbHVlID8gJycgOiAnbm9uZSc7XG4gICAgICB9XG4gICAgfVxuICB9O1xuXG4gIHZhciB0ZXh0JDIgPSB7XG5cbiAgICBiaW5kOiBmdW5jdGlvbiBiaW5kKCkge1xuICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgICAgdmFyIGVsID0gdGhpcy5lbDtcbiAgICAgIHZhciBpc1JhbmdlID0gZWwudHlwZSA9PT0gJ3JhbmdlJztcbiAgICAgIHZhciBsYXp5ID0gdGhpcy5wYXJhbXMubGF6eTtcbiAgICAgIHZhciBudW1iZXIgPSB0aGlzLnBhcmFtcy5udW1iZXI7XG4gICAgICB2YXIgZGVib3VuY2UgPSB0aGlzLnBhcmFtcy5kZWJvdW5jZTtcblxuICAgICAgLy8gaGFuZGxlIGNvbXBvc2l0aW9uIGV2ZW50cy5cbiAgICAgIC8vICAgaHR0cDovL2Jsb2cuZXZhbnlvdS5tZS8yMDE0LzAxLzAzL2NvbXBvc2l0aW9uLWV2ZW50L1xuICAgICAgLy8gc2tpcCB0aGlzIGZvciBBbmRyb2lkIGJlY2F1c2UgaXQgaGFuZGxlcyBjb21wb3NpdGlvblxuICAgICAgLy8gZXZlbnRzIHF1aXRlIGRpZmZlcmVudGx5LiBBbmRyb2lkIGRvZXNuJ3QgdHJpZ2dlclxuICAgICAgLy8gY29tcG9zaXRpb24gZXZlbnRzIGZvciBsYW5ndWFnZSBpbnB1dCBtZXRob2RzIGUuZy5cbiAgICAgIC8vIENoaW5lc2UsIGJ1dCBpbnN0ZWFkIHRyaWdnZXJzIHRoZW0gZm9yIHNwZWxsaW5nXG4gICAgICAvLyBzdWdnZXN0aW9ucy4uLiAoc2VlIERpc2N1c3Npb24vIzE2MilcbiAgICAgIHZhciBjb21wb3NpbmcgPSBmYWxzZTtcbiAgICAgIGlmICghaXNBbmRyb2lkICYmICFpc1JhbmdlKSB7XG4gICAgICAgIHRoaXMub24oJ2NvbXBvc2l0aW9uc3RhcnQnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgY29tcG9zaW5nID0gdHJ1ZTtcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMub24oJ2NvbXBvc2l0aW9uZW5kJywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgIGNvbXBvc2luZyA9IGZhbHNlO1xuICAgICAgICAgIC8vIGluIElFMTEgdGhlIFwiY29tcG9zaXRpb25lbmRcIiBldmVudCBmaXJlcyBBRlRFUlxuICAgICAgICAgIC8vIHRoZSBcImlucHV0XCIgZXZlbnQsIHNvIHRoZSBpbnB1dCBoYW5kbGVyIGlzIGJsb2NrZWRcbiAgICAgICAgICAvLyBhdCB0aGUgZW5kLi4uIGhhdmUgdG8gY2FsbCBpdCBoZXJlLlxuICAgICAgICAgIC8vXG4gICAgICAgICAgLy8gIzEzMjc6IGluIGxhenkgbW9kZSB0aGlzIGlzIHVuZWNlc3NhcnkuXG4gICAgICAgICAgaWYgKCFsYXp5KSB7XG4gICAgICAgICAgICBzZWxmLmxpc3RlbmVyKCk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH1cblxuICAgICAgLy8gcHJldmVudCBtZXNzaW5nIHdpdGggdGhlIGlucHV0IHdoZW4gdXNlciBpcyB0eXBpbmcsXG4gICAgICAvLyBhbmQgZm9yY2UgdXBkYXRlIG9uIGJsdXIuXG4gICAgICB0aGlzLmZvY3VzZWQgPSBmYWxzZTtcbiAgICAgIGlmICghaXNSYW5nZSAmJiAhbGF6eSkge1xuICAgICAgICB0aGlzLm9uKCdmb2N1cycsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICBzZWxmLmZvY3VzZWQgPSB0cnVlO1xuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5vbignYmx1cicsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICBzZWxmLmZvY3VzZWQgPSBmYWxzZTtcbiAgICAgICAgICAvLyBkbyBub3Qgc3luYyB2YWx1ZSBhZnRlciBmcmFnbWVudCByZW1vdmFsICgjMjAxNylcbiAgICAgICAgICBpZiAoIXNlbGYuX2ZyYWcgfHwgc2VsZi5fZnJhZy5pbnNlcnRlZCkge1xuICAgICAgICAgICAgc2VsZi5yYXdMaXN0ZW5lcigpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICB9XG5cbiAgICAgIC8vIE5vdyBhdHRhY2ggdGhlIG1haW4gbGlzdGVuZXJcbiAgICAgIHRoaXMubGlzdGVuZXIgPSB0aGlzLnJhd0xpc3RlbmVyID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAoY29tcG9zaW5nIHx8ICFzZWxmLl9ib3VuZCkge1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB2YXIgdmFsID0gbnVtYmVyIHx8IGlzUmFuZ2UgPyB0b051bWJlcihlbC52YWx1ZSkgOiBlbC52YWx1ZTtcbiAgICAgICAgc2VsZi5zZXQodmFsKTtcbiAgICAgICAgLy8gZm9yY2UgdXBkYXRlIG9uIG5leHQgdGljayB0byBhdm9pZCBsb2NrICYgc2FtZSB2YWx1ZVxuICAgICAgICAvLyBhbHNvIG9ubHkgdXBkYXRlIHdoZW4gdXNlciBpcyBub3QgdHlwaW5nXG4gICAgICAgIG5leHRUaWNrKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICBpZiAoc2VsZi5fYm91bmQgJiYgIXNlbGYuZm9jdXNlZCkge1xuICAgICAgICAgICAgc2VsZi51cGRhdGUoc2VsZi5fd2F0Y2hlci52YWx1ZSk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH07XG5cbiAgICAgIC8vIGFwcGx5IGRlYm91bmNlXG4gICAgICBpZiAoZGVib3VuY2UpIHtcbiAgICAgICAgdGhpcy5saXN0ZW5lciA9IF9kZWJvdW5jZSh0aGlzLmxpc3RlbmVyLCBkZWJvdW5jZSk7XG4gICAgICB9XG5cbiAgICAgIC8vIFN1cHBvcnQgalF1ZXJ5IGV2ZW50cywgc2luY2UgalF1ZXJ5LnRyaWdnZXIoKSBkb2Vzbid0XG4gICAgICAvLyB0cmlnZ2VyIG5hdGl2ZSBldmVudHMgaW4gc29tZSBjYXNlcyBhbmQgc29tZSBwbHVnaW5zXG4gICAgICAvLyByZWx5IG9uICQudHJpZ2dlcigpXG4gICAgICAvL1xuICAgICAgLy8gV2Ugd2FudCB0byBtYWtlIHN1cmUgaWYgYSBsaXN0ZW5lciBpcyBhdHRhY2hlZCB1c2luZ1xuICAgICAgLy8galF1ZXJ5LCBpdCBpcyBhbHNvIHJlbW92ZWQgd2l0aCBqUXVlcnksIHRoYXQncyB3aHlcbiAgICAgIC8vIHdlIGRvIHRoZSBjaGVjayBmb3IgZWFjaCBkaXJlY3RpdmUgaW5zdGFuY2UgYW5kXG4gICAgICAvLyBzdG9yZSB0aGF0IGNoZWNrIHJlc3VsdCBvbiBpdHNlbGYuIFRoaXMgYWxzbyBhbGxvd3NcbiAgICAgIC8vIGVhc2llciB0ZXN0IGNvdmVyYWdlIGNvbnRyb2wgYnkgdW5zZXR0aW5nIHRoZSBnbG9iYWxcbiAgICAgIC8vIGpRdWVyeSB2YXJpYWJsZSBpbiB0ZXN0cy5cbiAgICAgIHRoaXMuaGFzalF1ZXJ5ID0gdHlwZW9mIGpRdWVyeSA9PT0gJ2Z1bmN0aW9uJztcbiAgICAgIGlmICh0aGlzLmhhc2pRdWVyeSkge1xuICAgICAgICB2YXIgbWV0aG9kID0galF1ZXJ5LmZuLm9uID8gJ29uJyA6ICdiaW5kJztcbiAgICAgICAgalF1ZXJ5KGVsKVttZXRob2RdKCdjaGFuZ2UnLCB0aGlzLnJhd0xpc3RlbmVyKTtcbiAgICAgICAgaWYgKCFsYXp5KSB7XG4gICAgICAgICAgalF1ZXJ5KGVsKVttZXRob2RdKCdpbnB1dCcsIHRoaXMubGlzdGVuZXIpO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLm9uKCdjaGFuZ2UnLCB0aGlzLnJhd0xpc3RlbmVyKTtcbiAgICAgICAgaWYgKCFsYXp5KSB7XG4gICAgICAgICAgdGhpcy5vbignaW5wdXQnLCB0aGlzLmxpc3RlbmVyKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICAvLyBJRTkgZG9lc24ndCBmaXJlIGlucHV0IGV2ZW50IG9uIGJhY2tzcGFjZS9kZWwvY3V0XG4gICAgICBpZiAoIWxhenkgJiYgaXNJRTkpIHtcbiAgICAgICAgdGhpcy5vbignY3V0JywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgIG5leHRUaWNrKHNlbGYubGlzdGVuZXIpO1xuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5vbigna2V5dXAnLCBmdW5jdGlvbiAoZSkge1xuICAgICAgICAgIGlmIChlLmtleUNvZGUgPT09IDQ2IHx8IGUua2V5Q29kZSA9PT0gOCkge1xuICAgICAgICAgICAgc2VsZi5saXN0ZW5lcigpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICB9XG5cbiAgICAgIC8vIHNldCBpbml0aWFsIHZhbHVlIGlmIHByZXNlbnRcbiAgICAgIGlmIChlbC5oYXNBdHRyaWJ1dGUoJ3ZhbHVlJykgfHwgZWwudGFnTmFtZSA9PT0gJ1RFWFRBUkVBJyAmJiBlbC52YWx1ZS50cmltKCkpIHtcbiAgICAgICAgdGhpcy5hZnRlckJpbmQgPSB0aGlzLmxpc3RlbmVyO1xuICAgICAgfVxuICAgIH0sXG5cbiAgICB1cGRhdGU6IGZ1bmN0aW9uIHVwZGF0ZSh2YWx1ZSkge1xuICAgICAgdGhpcy5lbC52YWx1ZSA9IF90b1N0cmluZyh2YWx1ZSk7XG4gICAgfSxcblxuICAgIHVuYmluZDogZnVuY3Rpb24gdW5iaW5kKCkge1xuICAgICAgdmFyIGVsID0gdGhpcy5lbDtcbiAgICAgIGlmICh0aGlzLmhhc2pRdWVyeSkge1xuICAgICAgICB2YXIgbWV0aG9kID0galF1ZXJ5LmZuLm9mZiA/ICdvZmYnIDogJ3VuYmluZCc7XG4gICAgICAgIGpRdWVyeShlbClbbWV0aG9kXSgnY2hhbmdlJywgdGhpcy5saXN0ZW5lcik7XG4gICAgICAgIGpRdWVyeShlbClbbWV0aG9kXSgnaW5wdXQnLCB0aGlzLmxpc3RlbmVyKTtcbiAgICAgIH1cbiAgICB9XG4gIH07XG5cbiAgdmFyIHJhZGlvID0ge1xuXG4gICAgYmluZDogZnVuY3Rpb24gYmluZCgpIHtcbiAgICAgIHZhciBzZWxmID0gdGhpcztcbiAgICAgIHZhciBlbCA9IHRoaXMuZWw7XG5cbiAgICAgIHRoaXMuZ2V0VmFsdWUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIC8vIHZhbHVlIG92ZXJ3cml0ZSB2aWEgdi1iaW5kOnZhbHVlXG4gICAgICAgIGlmIChlbC5oYXNPd25Qcm9wZXJ0eSgnX3ZhbHVlJykpIHtcbiAgICAgICAgICByZXR1cm4gZWwuX3ZhbHVlO1xuICAgICAgICB9XG4gICAgICAgIHZhciB2YWwgPSBlbC52YWx1ZTtcbiAgICAgICAgaWYgKHNlbGYucGFyYW1zLm51bWJlcikge1xuICAgICAgICAgIHZhbCA9IHRvTnVtYmVyKHZhbCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHZhbDtcbiAgICAgIH07XG5cbiAgICAgIHRoaXMubGlzdGVuZXIgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHNlbGYuc2V0KHNlbGYuZ2V0VmFsdWUoKSk7XG4gICAgICB9O1xuICAgICAgdGhpcy5vbignY2hhbmdlJywgdGhpcy5saXN0ZW5lcik7XG5cbiAgICAgIGlmIChlbC5oYXNBdHRyaWJ1dGUoJ2NoZWNrZWQnKSkge1xuICAgICAgICB0aGlzLmFmdGVyQmluZCA9IHRoaXMubGlzdGVuZXI7XG4gICAgICB9XG4gICAgfSxcblxuICAgIHVwZGF0ZTogZnVuY3Rpb24gdXBkYXRlKHZhbHVlKSB7XG4gICAgICB0aGlzLmVsLmNoZWNrZWQgPSBsb29zZUVxdWFsKHZhbHVlLCB0aGlzLmdldFZhbHVlKCkpO1xuICAgIH1cbiAgfTtcblxuICB2YXIgc2VsZWN0ID0ge1xuXG4gICAgYmluZDogZnVuY3Rpb24gYmluZCgpIHtcbiAgICAgIHZhciBzZWxmID0gdGhpcztcbiAgICAgIHZhciBlbCA9IHRoaXMuZWw7XG5cbiAgICAgIC8vIG1ldGhvZCB0byBmb3JjZSB1cGRhdGUgRE9NIHVzaW5nIGxhdGVzdCB2YWx1ZS5cbiAgICAgIHRoaXMuZm9yY2VVcGRhdGUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmIChzZWxmLl93YXRjaGVyKSB7XG4gICAgICAgICAgc2VsZi51cGRhdGUoc2VsZi5fd2F0Y2hlci5nZXQoKSk7XG4gICAgICAgIH1cbiAgICAgIH07XG5cbiAgICAgIC8vIGNoZWNrIGlmIHRoaXMgaXMgYSBtdWx0aXBsZSBzZWxlY3RcbiAgICAgIHZhciBtdWx0aXBsZSA9IHRoaXMubXVsdGlwbGUgPSBlbC5oYXNBdHRyaWJ1dGUoJ211bHRpcGxlJyk7XG5cbiAgICAgIC8vIGF0dGFjaCBsaXN0ZW5lclxuICAgICAgdGhpcy5saXN0ZW5lciA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIHZhbHVlID0gZ2V0VmFsdWUoZWwsIG11bHRpcGxlKTtcbiAgICAgICAgdmFsdWUgPSBzZWxmLnBhcmFtcy5udW1iZXIgPyBpc0FycmF5KHZhbHVlKSA/IHZhbHVlLm1hcCh0b051bWJlcikgOiB0b051bWJlcih2YWx1ZSkgOiB2YWx1ZTtcbiAgICAgICAgc2VsZi5zZXQodmFsdWUpO1xuICAgICAgfTtcbiAgICAgIHRoaXMub24oJ2NoYW5nZScsIHRoaXMubGlzdGVuZXIpO1xuXG4gICAgICAvLyBpZiBoYXMgaW5pdGlhbCB2YWx1ZSwgc2V0IGFmdGVyQmluZFxuICAgICAgdmFyIGluaXRWYWx1ZSA9IGdldFZhbHVlKGVsLCBtdWx0aXBsZSwgdHJ1ZSk7XG4gICAgICBpZiAobXVsdGlwbGUgJiYgaW5pdFZhbHVlLmxlbmd0aCB8fCAhbXVsdGlwbGUgJiYgaW5pdFZhbHVlICE9PSBudWxsKSB7XG4gICAgICAgIHRoaXMuYWZ0ZXJCaW5kID0gdGhpcy5saXN0ZW5lcjtcbiAgICAgIH1cblxuICAgICAgLy8gQWxsIG1ham9yIGJyb3dzZXJzIGV4Y2VwdCBGaXJlZm94IHJlc2V0c1xuICAgICAgLy8gc2VsZWN0ZWRJbmRleCB3aXRoIHZhbHVlIC0xIHRvIDAgd2hlbiB0aGUgZWxlbWVudFxuICAgICAgLy8gaXMgYXBwZW5kZWQgdG8gYSBuZXcgcGFyZW50LCB0aGVyZWZvcmUgd2UgaGF2ZSB0b1xuICAgICAgLy8gZm9yY2UgYSBET00gdXBkYXRlIHdoZW5ldmVyIHRoYXQgaGFwcGVucy4uLlxuICAgICAgdGhpcy52bS4kb24oJ2hvb2s6YXR0YWNoZWQnLCB0aGlzLmZvcmNlVXBkYXRlKTtcbiAgICB9LFxuXG4gICAgdXBkYXRlOiBmdW5jdGlvbiB1cGRhdGUodmFsdWUpIHtcbiAgICAgIHZhciBlbCA9IHRoaXMuZWw7XG4gICAgICBlbC5zZWxlY3RlZEluZGV4ID0gLTE7XG4gICAgICB2YXIgbXVsdGkgPSB0aGlzLm11bHRpcGxlICYmIGlzQXJyYXkodmFsdWUpO1xuICAgICAgdmFyIG9wdGlvbnMgPSBlbC5vcHRpb25zO1xuICAgICAgdmFyIGkgPSBvcHRpb25zLmxlbmd0aDtcbiAgICAgIHZhciBvcCwgdmFsO1xuICAgICAgd2hpbGUgKGktLSkge1xuICAgICAgICBvcCA9IG9wdGlvbnNbaV07XG4gICAgICAgIHZhbCA9IG9wLmhhc093blByb3BlcnR5KCdfdmFsdWUnKSA/IG9wLl92YWx1ZSA6IG9wLnZhbHVlO1xuICAgICAgICAvKiBlc2xpbnQtZGlzYWJsZSBlcWVxZXEgKi9cbiAgICAgICAgb3Auc2VsZWN0ZWQgPSBtdWx0aSA/IGluZGV4T2YkMSh2YWx1ZSwgdmFsKSA+IC0xIDogbG9vc2VFcXVhbCh2YWx1ZSwgdmFsKTtcbiAgICAgICAgLyogZXNsaW50LWVuYWJsZSBlcWVxZXEgKi9cbiAgICAgIH1cbiAgICB9LFxuXG4gICAgdW5iaW5kOiBmdW5jdGlvbiB1bmJpbmQoKSB7XG4gICAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xuICAgICAgdGhpcy52bS4kb2ZmKCdob29rOmF0dGFjaGVkJywgdGhpcy5mb3JjZVVwZGF0ZSk7XG4gICAgfVxuICB9O1xuXG4gIC8qKlxuICAgKiBHZXQgc2VsZWN0IHZhbHVlXG4gICAqXG4gICAqIEBwYXJhbSB7U2VsZWN0RWxlbWVudH0gZWxcbiAgICogQHBhcmFtIHtCb29sZWFufSBtdWx0aVxuICAgKiBAcGFyYW0ge0Jvb2xlYW59IGluaXRcbiAgICogQHJldHVybiB7QXJyYXl8Kn1cbiAgICovXG5cbiAgZnVuY3Rpb24gZ2V0VmFsdWUoZWwsIG11bHRpLCBpbml0KSB7XG4gICAgdmFyIHJlcyA9IG11bHRpID8gW10gOiBudWxsO1xuICAgIHZhciBvcCwgdmFsLCBzZWxlY3RlZDtcbiAgICBmb3IgKHZhciBpID0gMCwgbCA9IGVsLm9wdGlvbnMubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG4gICAgICBvcCA9IGVsLm9wdGlvbnNbaV07XG4gICAgICBzZWxlY3RlZCA9IGluaXQgPyBvcC5oYXNBdHRyaWJ1dGUoJ3NlbGVjdGVkJykgOiBvcC5zZWxlY3RlZDtcbiAgICAgIGlmIChzZWxlY3RlZCkge1xuICAgICAgICB2YWwgPSBvcC5oYXNPd25Qcm9wZXJ0eSgnX3ZhbHVlJykgPyBvcC5fdmFsdWUgOiBvcC52YWx1ZTtcbiAgICAgICAgaWYgKG11bHRpKSB7XG4gICAgICAgICAgcmVzLnB1c2godmFsKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXR1cm4gdmFsO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiByZXM7XG4gIH1cblxuICAvKipcbiAgICogTmF0aXZlIEFycmF5LmluZGV4T2YgdXNlcyBzdHJpY3QgZXF1YWwsIGJ1dCBpbiB0aGlzXG4gICAqIGNhc2Ugd2UgbmVlZCB0byBtYXRjaCBzdHJpbmcvbnVtYmVycyB3aXRoIGN1c3RvbSBlcXVhbC5cbiAgICpcbiAgICogQHBhcmFtIHtBcnJheX0gYXJyXG4gICAqIEBwYXJhbSB7Kn0gdmFsXG4gICAqL1xuXG4gIGZ1bmN0aW9uIGluZGV4T2YkMShhcnIsIHZhbCkge1xuICAgIHZhciBpID0gYXJyLmxlbmd0aDtcbiAgICB3aGlsZSAoaS0tKSB7XG4gICAgICBpZiAobG9vc2VFcXVhbChhcnJbaV0sIHZhbCkpIHtcbiAgICAgICAgcmV0dXJuIGk7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiAtMTtcbiAgfVxuXG4gIHZhciBjaGVja2JveCA9IHtcblxuICAgIGJpbmQ6IGZ1bmN0aW9uIGJpbmQoKSB7XG4gICAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgICB2YXIgZWwgPSB0aGlzLmVsO1xuXG4gICAgICB0aGlzLmdldFZhbHVlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gZWwuaGFzT3duUHJvcGVydHkoJ192YWx1ZScpID8gZWwuX3ZhbHVlIDogc2VsZi5wYXJhbXMubnVtYmVyID8gdG9OdW1iZXIoZWwudmFsdWUpIDogZWwudmFsdWU7XG4gICAgICB9O1xuXG4gICAgICBmdW5jdGlvbiBnZXRCb29sZWFuVmFsdWUoKSB7XG4gICAgICAgIHZhciB2YWwgPSBlbC5jaGVja2VkO1xuICAgICAgICBpZiAodmFsICYmIGVsLmhhc093blByb3BlcnR5KCdfdHJ1ZVZhbHVlJykpIHtcbiAgICAgICAgICByZXR1cm4gZWwuX3RydWVWYWx1ZTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIXZhbCAmJiBlbC5oYXNPd25Qcm9wZXJ0eSgnX2ZhbHNlVmFsdWUnKSkge1xuICAgICAgICAgIHJldHVybiBlbC5fZmFsc2VWYWx1ZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdmFsO1xuICAgICAgfVxuXG4gICAgICB0aGlzLmxpc3RlbmVyID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgbW9kZWwgPSBzZWxmLl93YXRjaGVyLnZhbHVlO1xuICAgICAgICBpZiAoaXNBcnJheShtb2RlbCkpIHtcbiAgICAgICAgICB2YXIgdmFsID0gc2VsZi5nZXRWYWx1ZSgpO1xuICAgICAgICAgIGlmIChlbC5jaGVja2VkKSB7XG4gICAgICAgICAgICBpZiAoaW5kZXhPZihtb2RlbCwgdmFsKSA8IDApIHtcbiAgICAgICAgICAgICAgbW9kZWwucHVzaCh2YWwpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBtb2RlbC4kcmVtb3ZlKHZhbCk7XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHNlbGYuc2V0KGdldEJvb2xlYW5WYWx1ZSgpKTtcbiAgICAgICAgfVxuICAgICAgfTtcblxuICAgICAgdGhpcy5vbignY2hhbmdlJywgdGhpcy5saXN0ZW5lcik7XG4gICAgICBpZiAoZWwuaGFzQXR0cmlidXRlKCdjaGVja2VkJykpIHtcbiAgICAgICAgdGhpcy5hZnRlckJpbmQgPSB0aGlzLmxpc3RlbmVyO1xuICAgICAgfVxuICAgIH0sXG5cbiAgICB1cGRhdGU6IGZ1bmN0aW9uIHVwZGF0ZSh2YWx1ZSkge1xuICAgICAgdmFyIGVsID0gdGhpcy5lbDtcbiAgICAgIGlmIChpc0FycmF5KHZhbHVlKSkge1xuICAgICAgICBlbC5jaGVja2VkID0gaW5kZXhPZih2YWx1ZSwgdGhpcy5nZXRWYWx1ZSgpKSA+IC0xO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaWYgKGVsLmhhc093blByb3BlcnR5KCdfdHJ1ZVZhbHVlJykpIHtcbiAgICAgICAgICBlbC5jaGVja2VkID0gbG9vc2VFcXVhbCh2YWx1ZSwgZWwuX3RydWVWYWx1ZSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgZWwuY2hlY2tlZCA9ICEhdmFsdWU7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH07XG5cbiAgdmFyIGhhbmRsZXJzID0ge1xuICAgIHRleHQ6IHRleHQkMixcbiAgICByYWRpbzogcmFkaW8sXG4gICAgc2VsZWN0OiBzZWxlY3QsXG4gICAgY2hlY2tib3g6IGNoZWNrYm94XG4gIH07XG5cbiAgdmFyIG1vZGVsID0ge1xuXG4gICAgcHJpb3JpdHk6IE1PREVMLFxuICAgIHR3b1dheTogdHJ1ZSxcbiAgICBoYW5kbGVyczogaGFuZGxlcnMsXG4gICAgcGFyYW1zOiBbJ2xhenknLCAnbnVtYmVyJywgJ2RlYm91bmNlJ10sXG5cbiAgICAvKipcbiAgICAgKiBQb3NzaWJsZSBlbGVtZW50czpcbiAgICAgKiAgIDxzZWxlY3Q+XG4gICAgICogICA8dGV4dGFyZWE+XG4gICAgICogICA8aW5wdXQgdHlwZT1cIipcIj5cbiAgICAgKiAgICAgLSB0ZXh0XG4gICAgICogICAgIC0gY2hlY2tib3hcbiAgICAgKiAgICAgLSByYWRpb1xuICAgICAqICAgICAtIG51bWJlclxuICAgICAqL1xuXG4gICAgYmluZDogZnVuY3Rpb24gYmluZCgpIHtcbiAgICAgIC8vIGZyaWVuZGx5IHdhcm5pbmcuLi5cbiAgICAgIHRoaXMuY2hlY2tGaWx0ZXJzKCk7XG4gICAgICBpZiAodGhpcy5oYXNSZWFkICYmICF0aGlzLmhhc1dyaXRlKSB7XG4gICAgICAgICdkZXZlbG9wbWVudCcgIT09ICdwcm9kdWN0aW9uJyAmJiB3YXJuKCdJdCBzZWVtcyB5b3UgYXJlIHVzaW5nIGEgcmVhZC1vbmx5IGZpbHRlciB3aXRoICcgKyAndi1tb2RlbD1cIicgKyB0aGlzLmRlc2NyaXB0b3IucmF3ICsgJ1wiLiAnICsgJ1lvdSBtaWdodCB3YW50IHRvIHVzZSBhIHR3by13YXkgZmlsdGVyIHRvIGVuc3VyZSBjb3JyZWN0IGJlaGF2aW9yLicsIHRoaXMudm0pO1xuICAgICAgfVxuICAgICAgdmFyIGVsID0gdGhpcy5lbDtcbiAgICAgIHZhciB0YWcgPSBlbC50YWdOYW1lO1xuICAgICAgdmFyIGhhbmRsZXI7XG4gICAgICBpZiAodGFnID09PSAnSU5QVVQnKSB7XG4gICAgICAgIGhhbmRsZXIgPSBoYW5kbGVyc1tlbC50eXBlXSB8fCBoYW5kbGVycy50ZXh0O1xuICAgICAgfSBlbHNlIGlmICh0YWcgPT09ICdTRUxFQ1QnKSB7XG4gICAgICAgIGhhbmRsZXIgPSBoYW5kbGVycy5zZWxlY3Q7XG4gICAgICB9IGVsc2UgaWYgKHRhZyA9PT0gJ1RFWFRBUkVBJykge1xuICAgICAgICBoYW5kbGVyID0gaGFuZGxlcnMudGV4dDtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgICdkZXZlbG9wbWVudCcgIT09ICdwcm9kdWN0aW9uJyAmJiB3YXJuKCd2LW1vZGVsIGRvZXMgbm90IHN1cHBvcnQgZWxlbWVudCB0eXBlOiAnICsgdGFnLCB0aGlzLnZtKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgZWwuX192X21vZGVsID0gdGhpcztcbiAgICAgIGhhbmRsZXIuYmluZC5jYWxsKHRoaXMpO1xuICAgICAgdGhpcy51cGRhdGUgPSBoYW5kbGVyLnVwZGF0ZTtcbiAgICAgIHRoaXMuX3VuYmluZCA9IGhhbmRsZXIudW5iaW5kO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBDaGVjayByZWFkL3dyaXRlIGZpbHRlciBzdGF0cy5cbiAgICAgKi9cblxuICAgIGNoZWNrRmlsdGVyczogZnVuY3Rpb24gY2hlY2tGaWx0ZXJzKCkge1xuICAgICAgdmFyIGZpbHRlcnMgPSB0aGlzLmZpbHRlcnM7XG4gICAgICBpZiAoIWZpbHRlcnMpIHJldHVybjtcbiAgICAgIHZhciBpID0gZmlsdGVycy5sZW5ndGg7XG4gICAgICB3aGlsZSAoaS0tKSB7XG4gICAgICAgIHZhciBmaWx0ZXIgPSByZXNvbHZlQXNzZXQodGhpcy52bS4kb3B0aW9ucywgJ2ZpbHRlcnMnLCBmaWx0ZXJzW2ldLm5hbWUpO1xuICAgICAgICBpZiAodHlwZW9mIGZpbHRlciA9PT0gJ2Z1bmN0aW9uJyB8fCBmaWx0ZXIucmVhZCkge1xuICAgICAgICAgIHRoaXMuaGFzUmVhZCA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGZpbHRlci53cml0ZSkge1xuICAgICAgICAgIHRoaXMuaGFzV3JpdGUgPSB0cnVlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSxcblxuICAgIHVuYmluZDogZnVuY3Rpb24gdW5iaW5kKCkge1xuICAgICAgdGhpcy5lbC5fX3ZfbW9kZWwgPSBudWxsO1xuICAgICAgdGhpcy5fdW5iaW5kICYmIHRoaXMuX3VuYmluZCgpO1xuICAgIH1cbiAgfTtcblxuICAvLyBrZXlDb2RlIGFsaWFzZXNcbiAgdmFyIGtleUNvZGVzID0ge1xuICAgIGVzYzogMjcsXG4gICAgdGFiOiA5LFxuICAgIGVudGVyOiAxMyxcbiAgICBzcGFjZTogMzIsXG4gICAgJ2RlbGV0ZSc6IFs4LCA0Nl0sXG4gICAgdXA6IDM4LFxuICAgIGxlZnQ6IDM3LFxuICAgIHJpZ2h0OiAzOSxcbiAgICBkb3duOiA0MFxuICB9O1xuXG4gIGZ1bmN0aW9uIGtleUZpbHRlcihoYW5kbGVyLCBrZXlzKSB7XG4gICAgdmFyIGNvZGVzID0ga2V5cy5tYXAoZnVuY3Rpb24gKGtleSkge1xuICAgICAgdmFyIGNoYXJDb2RlID0ga2V5LmNoYXJDb2RlQXQoMCk7XG4gICAgICBpZiAoY2hhckNvZGUgPiA0NyAmJiBjaGFyQ29kZSA8IDU4KSB7XG4gICAgICAgIHJldHVybiBwYXJzZUludChrZXksIDEwKTtcbiAgICAgIH1cbiAgICAgIGlmIChrZXkubGVuZ3RoID09PSAxKSB7XG4gICAgICAgIGNoYXJDb2RlID0ga2V5LnRvVXBwZXJDYXNlKCkuY2hhckNvZGVBdCgwKTtcbiAgICAgICAgaWYgKGNoYXJDb2RlID4gNjQgJiYgY2hhckNvZGUgPCA5MSkge1xuICAgICAgICAgIHJldHVybiBjaGFyQ29kZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIGtleUNvZGVzW2tleV07XG4gICAgfSk7XG4gICAgY29kZXMgPSBbXS5jb25jYXQuYXBwbHkoW10sIGNvZGVzKTtcbiAgICByZXR1cm4gZnVuY3Rpb24ga2V5SGFuZGxlcihlKSB7XG4gICAgICBpZiAoY29kZXMuaW5kZXhPZihlLmtleUNvZGUpID4gLTEpIHtcbiAgICAgICAgcmV0dXJuIGhhbmRsZXIuY2FsbCh0aGlzLCBlKTtcbiAgICAgIH1cbiAgICB9O1xuICB9XG5cbiAgZnVuY3Rpb24gc3RvcEZpbHRlcihoYW5kbGVyKSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uIHN0b3BIYW5kbGVyKGUpIHtcbiAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICByZXR1cm4gaGFuZGxlci5jYWxsKHRoaXMsIGUpO1xuICAgIH07XG4gIH1cblxuICBmdW5jdGlvbiBwcmV2ZW50RmlsdGVyKGhhbmRsZXIpIHtcbiAgICByZXR1cm4gZnVuY3Rpb24gcHJldmVudEhhbmRsZXIoZSkge1xuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgcmV0dXJuIGhhbmRsZXIuY2FsbCh0aGlzLCBlKTtcbiAgICB9O1xuICB9XG5cbiAgZnVuY3Rpb24gc2VsZkZpbHRlcihoYW5kbGVyKSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uIHNlbGZIYW5kbGVyKGUpIHtcbiAgICAgIGlmIChlLnRhcmdldCA9PT0gZS5jdXJyZW50VGFyZ2V0KSB7XG4gICAgICAgIHJldHVybiBoYW5kbGVyLmNhbGwodGhpcywgZSk7XG4gICAgICB9XG4gICAgfTtcbiAgfVxuXG4gIHZhciBvbiQxID0ge1xuXG4gICAgcHJpb3JpdHk6IE9OLFxuICAgIGFjY2VwdFN0YXRlbWVudDogdHJ1ZSxcbiAgICBrZXlDb2Rlczoga2V5Q29kZXMsXG5cbiAgICBiaW5kOiBmdW5jdGlvbiBiaW5kKCkge1xuICAgICAgLy8gZGVhbCB3aXRoIGlmcmFtZXNcbiAgICAgIGlmICh0aGlzLmVsLnRhZ05hbWUgPT09ICdJRlJBTUUnICYmIHRoaXMuYXJnICE9PSAnbG9hZCcpIHtcbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgICAgICB0aGlzLmlmcmFtZUJpbmQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgb24oc2VsZi5lbC5jb250ZW50V2luZG93LCBzZWxmLmFyZywgc2VsZi5oYW5kbGVyLCBzZWxmLm1vZGlmaWVycy5jYXB0dXJlKTtcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5vbignbG9hZCcsIHRoaXMuaWZyYW1lQmluZCk7XG4gICAgICB9XG4gICAgfSxcblxuICAgIHVwZGF0ZTogZnVuY3Rpb24gdXBkYXRlKGhhbmRsZXIpIHtcbiAgICAgIC8vIHN0dWIgYSBub29wIGZvciB2LW9uIHdpdGggbm8gdmFsdWUsXG4gICAgICAvLyBlLmcuIEBtb3VzZWRvd24ucHJldmVudFxuICAgICAgaWYgKCF0aGlzLmRlc2NyaXB0b3IucmF3KSB7XG4gICAgICAgIGhhbmRsZXIgPSBmdW5jdGlvbiAoKSB7fTtcbiAgICAgIH1cblxuICAgICAgaWYgKHR5cGVvZiBoYW5kbGVyICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICdkZXZlbG9wbWVudCcgIT09ICdwcm9kdWN0aW9uJyAmJiB3YXJuKCd2LW9uOicgKyB0aGlzLmFyZyArICc9XCInICsgdGhpcy5leHByZXNzaW9uICsgJ1wiIGV4cGVjdHMgYSBmdW5jdGlvbiB2YWx1ZSwgJyArICdnb3QgJyArIGhhbmRsZXIsIHRoaXMudm0pO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIC8vIGFwcGx5IG1vZGlmaWVyc1xuICAgICAgaWYgKHRoaXMubW9kaWZpZXJzLnN0b3ApIHtcbiAgICAgICAgaGFuZGxlciA9IHN0b3BGaWx0ZXIoaGFuZGxlcik7XG4gICAgICB9XG4gICAgICBpZiAodGhpcy5tb2RpZmllcnMucHJldmVudCkge1xuICAgICAgICBoYW5kbGVyID0gcHJldmVudEZpbHRlcihoYW5kbGVyKTtcbiAgICAgIH1cbiAgICAgIGlmICh0aGlzLm1vZGlmaWVycy5zZWxmKSB7XG4gICAgICAgIGhhbmRsZXIgPSBzZWxmRmlsdGVyKGhhbmRsZXIpO1xuICAgICAgfVxuICAgICAgLy8ga2V5IGZpbHRlclxuICAgICAgdmFyIGtleXMgPSBPYmplY3Qua2V5cyh0aGlzLm1vZGlmaWVycykuZmlsdGVyKGZ1bmN0aW9uIChrZXkpIHtcbiAgICAgICAgcmV0dXJuIGtleSAhPT0gJ3N0b3AnICYmIGtleSAhPT0gJ3ByZXZlbnQnICYmIGtleSAhPT0gJ3NlbGYnICYmIGtleSAhPT0gJ2NhcHR1cmUnO1xuICAgICAgfSk7XG4gICAgICBpZiAoa2V5cy5sZW5ndGgpIHtcbiAgICAgICAgaGFuZGxlciA9IGtleUZpbHRlcihoYW5kbGVyLCBrZXlzKTtcbiAgICAgIH1cblxuICAgICAgdGhpcy5yZXNldCgpO1xuICAgICAgdGhpcy5oYW5kbGVyID0gaGFuZGxlcjtcblxuICAgICAgaWYgKHRoaXMuaWZyYW1lQmluZCkge1xuICAgICAgICB0aGlzLmlmcmFtZUJpbmQoKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIG9uKHRoaXMuZWwsIHRoaXMuYXJnLCB0aGlzLmhhbmRsZXIsIHRoaXMubW9kaWZpZXJzLmNhcHR1cmUpO1xuICAgICAgfVxuICAgIH0sXG5cbiAgICByZXNldDogZnVuY3Rpb24gcmVzZXQoKSB7XG4gICAgICB2YXIgZWwgPSB0aGlzLmlmcmFtZUJpbmQgPyB0aGlzLmVsLmNvbnRlbnRXaW5kb3cgOiB0aGlzLmVsO1xuICAgICAgaWYgKHRoaXMuaGFuZGxlcikge1xuICAgICAgICBvZmYoZWwsIHRoaXMuYXJnLCB0aGlzLmhhbmRsZXIpO1xuICAgICAgfVxuICAgIH0sXG5cbiAgICB1bmJpbmQ6IGZ1bmN0aW9uIHVuYmluZCgpIHtcbiAgICAgIHRoaXMucmVzZXQoKTtcbiAgICB9XG4gIH07XG5cbiAgdmFyIHByZWZpeGVzID0gWyctd2Via2l0LScsICctbW96LScsICctbXMtJ107XG4gIHZhciBjYW1lbFByZWZpeGVzID0gWydXZWJraXQnLCAnTW96JywgJ21zJ107XG4gIHZhciBpbXBvcnRhbnRSRSA9IC8haW1wb3J0YW50Oz8kLztcbiAgdmFyIHByb3BDYWNoZSA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG5cbiAgdmFyIHRlc3RFbCA9IG51bGw7XG5cbiAgdmFyIHN0eWxlID0ge1xuXG4gICAgZGVlcDogdHJ1ZSxcblxuICAgIHVwZGF0ZTogZnVuY3Rpb24gdXBkYXRlKHZhbHVlKSB7XG4gICAgICBpZiAodHlwZW9mIHZhbHVlID09PSAnc3RyaW5nJykge1xuICAgICAgICB0aGlzLmVsLnN0eWxlLmNzc1RleHQgPSB2YWx1ZTtcbiAgICAgIH0gZWxzZSBpZiAoaXNBcnJheSh2YWx1ZSkpIHtcbiAgICAgICAgdGhpcy5oYW5kbGVPYmplY3QodmFsdWUucmVkdWNlKGV4dGVuZCwge30pKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuaGFuZGxlT2JqZWN0KHZhbHVlIHx8IHt9KTtcbiAgICAgIH1cbiAgICB9LFxuXG4gICAgaGFuZGxlT2JqZWN0OiBmdW5jdGlvbiBoYW5kbGVPYmplY3QodmFsdWUpIHtcbiAgICAgIC8vIGNhY2hlIG9iamVjdCBzdHlsZXMgc28gdGhhdCBvbmx5IGNoYW5nZWQgcHJvcHNcbiAgICAgIC8vIGFyZSBhY3R1YWxseSB1cGRhdGVkLlxuICAgICAgdmFyIGNhY2hlID0gdGhpcy5jYWNoZSB8fCAodGhpcy5jYWNoZSA9IHt9KTtcbiAgICAgIHZhciBuYW1lLCB2YWw7XG4gICAgICBmb3IgKG5hbWUgaW4gY2FjaGUpIHtcbiAgICAgICAgaWYgKCEobmFtZSBpbiB2YWx1ZSkpIHtcbiAgICAgICAgICB0aGlzLmhhbmRsZVNpbmdsZShuYW1lLCBudWxsKTtcbiAgICAgICAgICBkZWxldGUgY2FjaGVbbmFtZV07XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGZvciAobmFtZSBpbiB2YWx1ZSkge1xuICAgICAgICB2YWwgPSB2YWx1ZVtuYW1lXTtcbiAgICAgICAgaWYgKHZhbCAhPT0gY2FjaGVbbmFtZV0pIHtcbiAgICAgICAgICBjYWNoZVtuYW1lXSA9IHZhbDtcbiAgICAgICAgICB0aGlzLmhhbmRsZVNpbmdsZShuYW1lLCB2YWwpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSxcblxuICAgIGhhbmRsZVNpbmdsZTogZnVuY3Rpb24gaGFuZGxlU2luZ2xlKHByb3AsIHZhbHVlKSB7XG4gICAgICBwcm9wID0gbm9ybWFsaXplKHByb3ApO1xuICAgICAgaWYgKCFwcm9wKSByZXR1cm47IC8vIHVuc3VwcG9ydGVkIHByb3BcbiAgICAgIC8vIGNhc3QgcG9zc2libGUgbnVtYmVycy9ib29sZWFucyBpbnRvIHN0cmluZ3NcbiAgICAgIGlmICh2YWx1ZSAhPSBudWxsKSB2YWx1ZSArPSAnJztcbiAgICAgIGlmICh2YWx1ZSkge1xuICAgICAgICB2YXIgaXNJbXBvcnRhbnQgPSBpbXBvcnRhbnRSRS50ZXN0KHZhbHVlKSA/ICdpbXBvcnRhbnQnIDogJyc7XG4gICAgICAgIGlmIChpc0ltcG9ydGFudCkge1xuICAgICAgICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBpZiAqL1xuICAgICAgICAgIGlmICgnZGV2ZWxvcG1lbnQnICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICAgICAgICAgIHdhcm4oJ0l0XFwncyBwcm9iYWJseSBhIGJhZCBpZGVhIHRvIHVzZSAhaW1wb3J0YW50IHdpdGggaW5saW5lIHJ1bGVzLiAnICsgJ1RoaXMgZmVhdHVyZSB3aWxsIGJlIGRlcHJlY2F0ZWQgaW4gYSBmdXR1cmUgdmVyc2lvbiBvZiBWdWUuJyk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHZhbHVlID0gdmFsdWUucmVwbGFjZShpbXBvcnRhbnRSRSwgJycpLnRyaW0oKTtcbiAgICAgICAgICB0aGlzLmVsLnN0eWxlLnNldFByb3BlcnR5KHByb3Aua2ViYWIsIHZhbHVlLCBpc0ltcG9ydGFudCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhpcy5lbC5zdHlsZVtwcm9wLmNhbWVsXSA9IHZhbHVlO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLmVsLnN0eWxlW3Byb3AuY2FtZWxdID0gJyc7XG4gICAgICB9XG4gICAgfVxuXG4gIH07XG5cbiAgLyoqXG4gICAqIE5vcm1hbGl6ZSBhIENTUyBwcm9wZXJ0eSBuYW1lLlxuICAgKiAtIGNhY2hlIHJlc3VsdFxuICAgKiAtIGF1dG8gcHJlZml4XG4gICAqIC0gY2FtZWxDYXNlIC0+IGRhc2gtY2FzZVxuICAgKlxuICAgKiBAcGFyYW0ge1N0cmluZ30gcHJvcFxuICAgKiBAcmV0dXJuIHtTdHJpbmd9XG4gICAqL1xuXG4gIGZ1bmN0aW9uIG5vcm1hbGl6ZShwcm9wKSB7XG4gICAgaWYgKHByb3BDYWNoZVtwcm9wXSkge1xuICAgICAgcmV0dXJuIHByb3BDYWNoZVtwcm9wXTtcbiAgICB9XG4gICAgdmFyIHJlcyA9IHByZWZpeChwcm9wKTtcbiAgICBwcm9wQ2FjaGVbcHJvcF0gPSBwcm9wQ2FjaGVbcmVzXSA9IHJlcztcbiAgICByZXR1cm4gcmVzO1xuICB9XG5cbiAgLyoqXG4gICAqIEF1dG8gZGV0ZWN0IHRoZSBhcHByb3ByaWF0ZSBwcmVmaXggZm9yIGEgQ1NTIHByb3BlcnR5LlxuICAgKiBodHRwczovL2dpc3QuZ2l0aHViLmNvbS9wYXVsaXJpc2gvNTIzNjkyXG4gICAqXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBwcm9wXG4gICAqIEByZXR1cm4ge1N0cmluZ31cbiAgICovXG5cbiAgZnVuY3Rpb24gcHJlZml4KHByb3ApIHtcbiAgICBwcm9wID0gaHlwaGVuYXRlKHByb3ApO1xuICAgIHZhciBjYW1lbCA9IGNhbWVsaXplKHByb3ApO1xuICAgIHZhciB1cHBlciA9IGNhbWVsLmNoYXJBdCgwKS50b1VwcGVyQ2FzZSgpICsgY2FtZWwuc2xpY2UoMSk7XG4gICAgaWYgKCF0ZXN0RWwpIHtcbiAgICAgIHRlc3RFbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIH1cbiAgICB2YXIgaSA9IHByZWZpeGVzLmxlbmd0aDtcbiAgICB2YXIgcHJlZml4ZWQ7XG4gICAgaWYgKGNhbWVsICE9PSAnZmlsdGVyJyAmJiBjYW1lbCBpbiB0ZXN0RWwuc3R5bGUpIHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIGtlYmFiOiBwcm9wLFxuICAgICAgICBjYW1lbDogY2FtZWxcbiAgICAgIH07XG4gICAgfVxuICAgIHdoaWxlIChpLS0pIHtcbiAgICAgIHByZWZpeGVkID0gY2FtZWxQcmVmaXhlc1tpXSArIHVwcGVyO1xuICAgICAgaWYgKHByZWZpeGVkIGluIHRlc3RFbC5zdHlsZSkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIGtlYmFiOiBwcmVmaXhlc1tpXSArIHByb3AsXG4gICAgICAgICAgY2FtZWw6IHByZWZpeGVkXG4gICAgICAgIH07XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLy8geGxpbmtcbiAgdmFyIHhsaW5rTlMgPSAnaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayc7XG4gIHZhciB4bGlua1JFID0gL154bGluazovO1xuXG4gIC8vIGNoZWNrIGZvciBhdHRyaWJ1dGVzIHRoYXQgcHJvaGliaXQgaW50ZXJwb2xhdGlvbnNcbiAgdmFyIGRpc2FsbG93ZWRJbnRlcnBBdHRyUkUgPSAvXnYtfF46fF5AfF4oPzppc3x0cmFuc2l0aW9ufHRyYW5zaXRpb24tbW9kZXxkZWJvdW5jZXx0cmFjay1ieXxzdGFnZ2VyfGVudGVyLXN0YWdnZXJ8bGVhdmUtc3RhZ2dlcikkLztcbiAgLy8gdGhlc2UgYXR0cmlidXRlcyBzaG91bGQgYWxzbyBzZXQgdGhlaXIgY29ycmVzcG9uZGluZyBwcm9wZXJ0aWVzXG4gIC8vIGJlY2F1c2UgdGhleSBvbmx5IGFmZmVjdCB0aGUgaW5pdGlhbCBzdGF0ZSBvZiB0aGUgZWxlbWVudFxuICB2YXIgYXR0cldpdGhQcm9wc1JFID0gL14oPzp2YWx1ZXxjaGVja2VkfHNlbGVjdGVkfG11dGVkKSQvO1xuICAvLyB0aGVzZSBhdHRyaWJ1dGVzIGV4cGVjdCBlbnVtcmF0ZWQgdmFsdWVzIG9mIFwidHJ1ZVwiIG9yIFwiZmFsc2VcIlxuICAvLyBidXQgYXJlIG5vdCBib29sZWFuIGF0dHJpYnV0ZXNcbiAgdmFyIGVudW1lcmF0ZWRBdHRyUkUgPSAvXig/OmRyYWdnYWJsZXxjb250ZW50ZWRpdGFibGV8c3BlbGxjaGVjaykkLztcblxuICAvLyB0aGVzZSBhdHRyaWJ1dGVzIHNob3VsZCBzZXQgYSBoaWRkZW4gcHJvcGVydHkgZm9yXG4gIC8vIGJpbmRpbmcgdi1tb2RlbCB0byBvYmplY3QgdmFsdWVzXG4gIHZhciBtb2RlbFByb3BzID0ge1xuICAgIHZhbHVlOiAnX3ZhbHVlJyxcbiAgICAndHJ1ZS12YWx1ZSc6ICdfdHJ1ZVZhbHVlJyxcbiAgICAnZmFsc2UtdmFsdWUnOiAnX2ZhbHNlVmFsdWUnXG4gIH07XG5cbiAgdmFyIGJpbmQkMSA9IHtcblxuICAgIHByaW9yaXR5OiBCSU5ELFxuXG4gICAgYmluZDogZnVuY3Rpb24gYmluZCgpIHtcbiAgICAgIHZhciBhdHRyID0gdGhpcy5hcmc7XG4gICAgICB2YXIgdGFnID0gdGhpcy5lbC50YWdOYW1lO1xuICAgICAgLy8gc2hvdWxkIGJlIGRlZXAgd2F0Y2ggb24gb2JqZWN0IG1vZGVcbiAgICAgIGlmICghYXR0cikge1xuICAgICAgICB0aGlzLmRlZXAgPSB0cnVlO1xuICAgICAgfVxuICAgICAgLy8gaGFuZGxlIGludGVycG9sYXRpb24gYmluZGluZ3NcbiAgICAgIHZhciBkZXNjcmlwdG9yID0gdGhpcy5kZXNjcmlwdG9yO1xuICAgICAgdmFyIHRva2VucyA9IGRlc2NyaXB0b3IuaW50ZXJwO1xuICAgICAgaWYgKHRva2Vucykge1xuICAgICAgICAvLyBoYW5kbGUgaW50ZXJwb2xhdGlvbnMgd2l0aCBvbmUtdGltZSB0b2tlbnNcbiAgICAgICAgaWYgKGRlc2NyaXB0b3IuaGFzT25lVGltZSkge1xuICAgICAgICAgIHRoaXMuZXhwcmVzc2lvbiA9IHRva2Vuc1RvRXhwKHRva2VucywgdGhpcy5fc2NvcGUgfHwgdGhpcy52bSk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBvbmx5IGFsbG93IGJpbmRpbmcgb24gbmF0aXZlIGF0dHJpYnV0ZXNcbiAgICAgICAgaWYgKGRpc2FsbG93ZWRJbnRlcnBBdHRyUkUudGVzdChhdHRyKSB8fCBhdHRyID09PSAnbmFtZScgJiYgKHRhZyA9PT0gJ1BBUlRJQUwnIHx8IHRhZyA9PT0gJ1NMT1QnKSkge1xuICAgICAgICAgICdkZXZlbG9wbWVudCcgIT09ICdwcm9kdWN0aW9uJyAmJiB3YXJuKGF0dHIgKyAnPVwiJyArIGRlc2NyaXB0b3IucmF3ICsgJ1wiOiAnICsgJ2F0dHJpYnV0ZSBpbnRlcnBvbGF0aW9uIGlzIG5vdCBhbGxvd2VkIGluIFZ1ZS5qcyAnICsgJ2RpcmVjdGl2ZXMgYW5kIHNwZWNpYWwgYXR0cmlidXRlcy4nLCB0aGlzLnZtKTtcbiAgICAgICAgICB0aGlzLmVsLnJlbW92ZUF0dHJpYnV0ZShhdHRyKTtcbiAgICAgICAgICB0aGlzLmludmFsaWQgPSB0cnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgLyogaXN0YW5idWwgaWdub3JlIGlmICovXG4gICAgICAgIGlmICgnZGV2ZWxvcG1lbnQnICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICAgICAgICB2YXIgcmF3ID0gYXR0ciArICc9XCInICsgZGVzY3JpcHRvci5yYXcgKyAnXCI6ICc7XG4gICAgICAgICAgLy8gd2FybiBzcmNcbiAgICAgICAgICBpZiAoYXR0ciA9PT0gJ3NyYycpIHtcbiAgICAgICAgICAgIHdhcm4ocmF3ICsgJ2ludGVycG9sYXRpb24gaW4gXCJzcmNcIiBhdHRyaWJ1dGUgd2lsbCBjYXVzZSAnICsgJ2EgNDA0IHJlcXVlc3QuIFVzZSB2LWJpbmQ6c3JjIGluc3RlYWQuJywgdGhpcy52bSk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgLy8gd2FybiBzdHlsZVxuICAgICAgICAgIGlmIChhdHRyID09PSAnc3R5bGUnKSB7XG4gICAgICAgICAgICB3YXJuKHJhdyArICdpbnRlcnBvbGF0aW9uIGluIFwic3R5bGVcIiBhdHRyaWJ1dGUgd2lsbCBjYXVzZSAnICsgJ3RoZSBhdHRyaWJ1dGUgdG8gYmUgZGlzY2FyZGVkIGluIEludGVybmV0IEV4cGxvcmVyLiAnICsgJ1VzZSB2LWJpbmQ6c3R5bGUgaW5zdGVhZC4nLCB0aGlzLnZtKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9LFxuXG4gICAgdXBkYXRlOiBmdW5jdGlvbiB1cGRhdGUodmFsdWUpIHtcbiAgICAgIGlmICh0aGlzLmludmFsaWQpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgdmFyIGF0dHIgPSB0aGlzLmFyZztcbiAgICAgIGlmICh0aGlzLmFyZykge1xuICAgICAgICB0aGlzLmhhbmRsZVNpbmdsZShhdHRyLCB2YWx1ZSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLmhhbmRsZU9iamVjdCh2YWx1ZSB8fCB7fSk7XG4gICAgICB9XG4gICAgfSxcblxuICAgIC8vIHNoYXJlIG9iamVjdCBoYW5kbGVyIHdpdGggdi1iaW5kOmNsYXNzXG4gICAgaGFuZGxlT2JqZWN0OiBzdHlsZS5oYW5kbGVPYmplY3QsXG5cbiAgICBoYW5kbGVTaW5nbGU6IGZ1bmN0aW9uIGhhbmRsZVNpbmdsZShhdHRyLCB2YWx1ZSkge1xuICAgICAgdmFyIGVsID0gdGhpcy5lbDtcbiAgICAgIHZhciBpbnRlcnAgPSB0aGlzLmRlc2NyaXB0b3IuaW50ZXJwO1xuICAgICAgaWYgKHRoaXMubW9kaWZpZXJzLmNhbWVsKSB7XG4gICAgICAgIGF0dHIgPSBjYW1lbGl6ZShhdHRyKTtcbiAgICAgIH1cbiAgICAgIGlmICghaW50ZXJwICYmIGF0dHJXaXRoUHJvcHNSRS50ZXN0KGF0dHIpICYmIGF0dHIgaW4gZWwpIHtcbiAgICAgICAgdmFyIGF0dHJWYWx1ZSA9IGF0dHIgPT09ICd2YWx1ZScgPyB2YWx1ZSA9PSBudWxsIC8vIElFOSB3aWxsIHNldCBpbnB1dC52YWx1ZSB0byBcIm51bGxcIiBmb3IgbnVsbC4uLlxuICAgICAgICA/ICcnIDogdmFsdWUgOiB2YWx1ZTtcblxuICAgICAgICBpZiAoZWxbYXR0cl0gIT09IGF0dHJWYWx1ZSkge1xuICAgICAgICAgIGVsW2F0dHJdID0gYXR0clZhbHVlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICAvLyBzZXQgbW9kZWwgcHJvcHNcbiAgICAgIHZhciBtb2RlbFByb3AgPSBtb2RlbFByb3BzW2F0dHJdO1xuICAgICAgaWYgKCFpbnRlcnAgJiYgbW9kZWxQcm9wKSB7XG4gICAgICAgIGVsW21vZGVsUHJvcF0gPSB2YWx1ZTtcbiAgICAgICAgLy8gdXBkYXRlIHYtbW9kZWwgaWYgcHJlc2VudFxuICAgICAgICB2YXIgbW9kZWwgPSBlbC5fX3ZfbW9kZWw7XG4gICAgICAgIGlmIChtb2RlbCkge1xuICAgICAgICAgIG1vZGVsLmxpc3RlbmVyKCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIC8vIGRvIG5vdCBzZXQgdmFsdWUgYXR0cmlidXRlIGZvciB0ZXh0YXJlYVxuICAgICAgaWYgKGF0dHIgPT09ICd2YWx1ZScgJiYgZWwudGFnTmFtZSA9PT0gJ1RFWFRBUkVBJykge1xuICAgICAgICBlbC5yZW1vdmVBdHRyaWJ1dGUoYXR0cik7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIC8vIHVwZGF0ZSBhdHRyaWJ1dGVcbiAgICAgIGlmIChlbnVtZXJhdGVkQXR0clJFLnRlc3QoYXR0cikpIHtcbiAgICAgICAgZWwuc2V0QXR0cmlidXRlKGF0dHIsIHZhbHVlID8gJ3RydWUnIDogJ2ZhbHNlJyk7XG4gICAgICB9IGVsc2UgaWYgKHZhbHVlICE9IG51bGwgJiYgdmFsdWUgIT09IGZhbHNlKSB7XG4gICAgICAgIGlmIChhdHRyID09PSAnY2xhc3MnKSB7XG4gICAgICAgICAgLy8gaGFuZGxlIGVkZ2UgY2FzZSAjMTk2MDpcbiAgICAgICAgICAvLyBjbGFzcyBpbnRlcnBvbGF0aW9uIHNob3VsZCBub3Qgb3ZlcndyaXRlIFZ1ZSB0cmFuc2l0aW9uIGNsYXNzXG4gICAgICAgICAgaWYgKGVsLl9fdl90cmFucykge1xuICAgICAgICAgICAgdmFsdWUgKz0gJyAnICsgZWwuX192X3RyYW5zLmlkICsgJy10cmFuc2l0aW9uJztcbiAgICAgICAgICB9XG4gICAgICAgICAgc2V0Q2xhc3MoZWwsIHZhbHVlKTtcbiAgICAgICAgfSBlbHNlIGlmICh4bGlua1JFLnRlc3QoYXR0cikpIHtcbiAgICAgICAgICBlbC5zZXRBdHRyaWJ1dGVOUyh4bGlua05TLCBhdHRyLCB2YWx1ZSA9PT0gdHJ1ZSA/ICcnIDogdmFsdWUpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGVsLnNldEF0dHJpYnV0ZShhdHRyLCB2YWx1ZSA9PT0gdHJ1ZSA/ICcnIDogdmFsdWUpO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBlbC5yZW1vdmVBdHRyaWJ1dGUoYXR0cik7XG4gICAgICB9XG4gICAgfVxuICB9O1xuXG4gIHZhciBlbCA9IHtcblxuICAgIHByaW9yaXR5OiBFTCxcblxuICAgIGJpbmQ6IGZ1bmN0aW9uIGJpbmQoKSB7XG4gICAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgaWYgKi9cbiAgICAgIGlmICghdGhpcy5hcmcpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgdmFyIGlkID0gdGhpcy5pZCA9IGNhbWVsaXplKHRoaXMuYXJnKTtcbiAgICAgIHZhciByZWZzID0gKHRoaXMuX3Njb3BlIHx8IHRoaXMudm0pLiRlbHM7XG4gICAgICBpZiAoaGFzT3duKHJlZnMsIGlkKSkge1xuICAgICAgICByZWZzW2lkXSA9IHRoaXMuZWw7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBkZWZpbmVSZWFjdGl2ZShyZWZzLCBpZCwgdGhpcy5lbCk7XG4gICAgICB9XG4gICAgfSxcblxuICAgIHVuYmluZDogZnVuY3Rpb24gdW5iaW5kKCkge1xuICAgICAgdmFyIHJlZnMgPSAodGhpcy5fc2NvcGUgfHwgdGhpcy52bSkuJGVscztcbiAgICAgIGlmIChyZWZzW3RoaXMuaWRdID09PSB0aGlzLmVsKSB7XG4gICAgICAgIHJlZnNbdGhpcy5pZF0gPSBudWxsO1xuICAgICAgfVxuICAgIH1cbiAgfTtcblxuICB2YXIgcmVmID0ge1xuICAgIGJpbmQ6IGZ1bmN0aW9uIGJpbmQoKSB7XG4gICAgICAnZGV2ZWxvcG1lbnQnICE9PSAncHJvZHVjdGlvbicgJiYgd2Fybigndi1yZWY6JyArIHRoaXMuYXJnICsgJyBtdXN0IGJlIHVzZWQgb24gYSBjaGlsZCAnICsgJ2NvbXBvbmVudC4gRm91bmQgb24gPCcgKyB0aGlzLmVsLnRhZ05hbWUudG9Mb3dlckNhc2UoKSArICc+LicsIHRoaXMudm0pO1xuICAgIH1cbiAgfTtcblxuICB2YXIgY2xvYWsgPSB7XG4gICAgYmluZDogZnVuY3Rpb24gYmluZCgpIHtcbiAgICAgIHZhciBlbCA9IHRoaXMuZWw7XG4gICAgICB0aGlzLnZtLiRvbmNlKCdwcmUtaG9vazpjb21waWxlZCcsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgZWwucmVtb3ZlQXR0cmlidXRlKCd2LWNsb2FrJyk7XG4gICAgICB9KTtcbiAgICB9XG4gIH07XG5cbiAgLy8gbXVzdCBleHBvcnQgcGxhaW4gb2JqZWN0XG4gIHZhciBkaXJlY3RpdmVzID0ge1xuICAgIHRleHQ6IHRleHQkMSxcbiAgICBodG1sOiBodG1sLFxuICAgICdmb3InOiB2Rm9yLFxuICAgICdpZic6IHZJZixcbiAgICBzaG93OiBzaG93LFxuICAgIG1vZGVsOiBtb2RlbCxcbiAgICBvbjogb24kMSxcbiAgICBiaW5kOiBiaW5kJDEsXG4gICAgZWw6IGVsLFxuICAgIHJlZjogcmVmLFxuICAgIGNsb2FrOiBjbG9ha1xuICB9O1xuXG4gIHZhciB2Q2xhc3MgPSB7XG5cbiAgICBkZWVwOiB0cnVlLFxuXG4gICAgdXBkYXRlOiBmdW5jdGlvbiB1cGRhdGUodmFsdWUpIHtcbiAgICAgIGlmICghdmFsdWUpIHtcbiAgICAgICAgdGhpcy5jbGVhbnVwKCk7XG4gICAgICB9IGVsc2UgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgdGhpcy5zZXRDbGFzcyh2YWx1ZS50cmltKCkuc3BsaXQoL1xccysvKSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLnNldENsYXNzKG5vcm1hbGl6ZSQxKHZhbHVlKSk7XG4gICAgICB9XG4gICAgfSxcblxuICAgIHNldENsYXNzOiBmdW5jdGlvbiBzZXRDbGFzcyh2YWx1ZSkge1xuICAgICAgdGhpcy5jbGVhbnVwKHZhbHVlKTtcbiAgICAgIGZvciAodmFyIGkgPSAwLCBsID0gdmFsdWUubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG4gICAgICAgIHZhciB2YWwgPSB2YWx1ZVtpXTtcbiAgICAgICAgaWYgKHZhbCkge1xuICAgICAgICAgIGFwcGx5KHRoaXMuZWwsIHZhbCwgYWRkQ2xhc3MpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICB0aGlzLnByZXZLZXlzID0gdmFsdWU7XG4gICAgfSxcblxuICAgIGNsZWFudXA6IGZ1bmN0aW9uIGNsZWFudXAodmFsdWUpIHtcbiAgICAgIHZhciBwcmV2S2V5cyA9IHRoaXMucHJldktleXM7XG4gICAgICBpZiAoIXByZXZLZXlzKSByZXR1cm47XG4gICAgICB2YXIgaSA9IHByZXZLZXlzLmxlbmd0aDtcbiAgICAgIHdoaWxlIChpLS0pIHtcbiAgICAgICAgdmFyIGtleSA9IHByZXZLZXlzW2ldO1xuICAgICAgICBpZiAoIXZhbHVlIHx8IHZhbHVlLmluZGV4T2Yoa2V5KSA8IDApIHtcbiAgICAgICAgICBhcHBseSh0aGlzLmVsLCBrZXksIHJlbW92ZUNsYXNzKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfTtcblxuICAvKipcbiAgICogTm9ybWFsaXplIG9iamVjdHMgYW5kIGFycmF5cyAocG90ZW50aWFsbHkgY29udGFpbmluZyBvYmplY3RzKVxuICAgKiBpbnRvIGFycmF5IG9mIHN0cmluZ3MuXG4gICAqXG4gICAqIEBwYXJhbSB7T2JqZWN0fEFycmF5PFN0cmluZ3xPYmplY3Q+fSB2YWx1ZVxuICAgKiBAcmV0dXJuIHtBcnJheTxTdHJpbmc+fVxuICAgKi9cblxuICBmdW5jdGlvbiBub3JtYWxpemUkMSh2YWx1ZSkge1xuICAgIHZhciByZXMgPSBbXTtcbiAgICBpZiAoaXNBcnJheSh2YWx1ZSkpIHtcbiAgICAgIGZvciAodmFyIGkgPSAwLCBsID0gdmFsdWUubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG4gICAgICAgIHZhciBfa2V5ID0gdmFsdWVbaV07XG4gICAgICAgIGlmIChfa2V5KSB7XG4gICAgICAgICAgaWYgKHR5cGVvZiBfa2V5ID09PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgcmVzLnB1c2goX2tleSk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGZvciAodmFyIGsgaW4gX2tleSkge1xuICAgICAgICAgICAgICBpZiAoX2tleVtrXSkgcmVzLnB1c2goayk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSBlbHNlIGlmIChpc09iamVjdCh2YWx1ZSkpIHtcbiAgICAgIGZvciAodmFyIGtleSBpbiB2YWx1ZSkge1xuICAgICAgICBpZiAodmFsdWVba2V5XSkgcmVzLnB1c2goa2V5KTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHJlcztcbiAgfVxuXG4gIC8qKlxuICAgKiBBZGQgb3IgcmVtb3ZlIGEgY2xhc3MvY2xhc3NlcyBvbiBhbiBlbGVtZW50XG4gICAqXG4gICAqIEBwYXJhbSB7RWxlbWVudH0gZWxcbiAgICogQHBhcmFtIHtTdHJpbmd9IGtleSBUaGUgY2xhc3MgbmFtZS4gVGhpcyBtYXkgb3IgbWF5IG5vdFxuICAgKiAgICAgICAgICAgICAgICAgICAgIGNvbnRhaW4gYSBzcGFjZSBjaGFyYWN0ZXIsIGluIHN1Y2ggYVxuICAgKiAgICAgICAgICAgICAgICAgICAgIGNhc2Ugd2UnbGwgZGVhbCB3aXRoIG11bHRpcGxlIGNsYXNzXG4gICAqICAgICAgICAgICAgICAgICAgICAgbmFtZXMgYXQgb25jZS5cbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gZm5cbiAgICovXG5cbiAgZnVuY3Rpb24gYXBwbHkoZWwsIGtleSwgZm4pIHtcbiAgICBrZXkgPSBrZXkudHJpbSgpO1xuICAgIGlmIChrZXkuaW5kZXhPZignICcpID09PSAtMSkge1xuICAgICAgZm4oZWwsIGtleSk7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIC8vIFRoZSBrZXkgY29udGFpbnMgb25lIG9yIG1vcmUgc3BhY2UgY2hhcmFjdGVycy5cbiAgICAvLyBTaW5jZSBhIGNsYXNzIG5hbWUgZG9lc24ndCBhY2NlcHQgc3VjaCBjaGFyYWN0ZXJzLCB3ZVxuICAgIC8vIHRyZWF0IGl0IGFzIG11bHRpcGxlIGNsYXNzZXMuXG4gICAgdmFyIGtleXMgPSBrZXkuc3BsaXQoL1xccysvKTtcbiAgICBmb3IgKHZhciBpID0gMCwgbCA9IGtleXMubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG4gICAgICBmbihlbCwga2V5c1tpXSk7XG4gICAgfVxuICB9XG5cbiAgdmFyIGNvbXBvbmVudCA9IHtcblxuICAgIHByaW9yaXR5OiBDT01QT05FTlQsXG5cbiAgICBwYXJhbXM6IFsna2VlcC1hbGl2ZScsICd0cmFuc2l0aW9uLW1vZGUnLCAnaW5saW5lLXRlbXBsYXRlJ10sXG5cbiAgICAvKipcbiAgICAgKiBTZXR1cC4gVHdvIHBvc3NpYmxlIHVzYWdlczpcbiAgICAgKlxuICAgICAqIC0gc3RhdGljOlxuICAgICAqICAgPGNvbXA+IG9yIDxkaXYgdi1jb21wb25lbnQ9XCJjb21wXCI+XG4gICAgICpcbiAgICAgKiAtIGR5bmFtaWM6XG4gICAgICogICA8Y29tcG9uZW50IDppcz1cInZpZXdcIj5cbiAgICAgKi9cblxuICAgIGJpbmQ6IGZ1bmN0aW9uIGJpbmQoKSB7XG4gICAgICBpZiAoIXRoaXMuZWwuX192dWVfXykge1xuICAgICAgICAvLyBrZWVwLWFsaXZlIGNhY2hlXG4gICAgICAgIHRoaXMua2VlcEFsaXZlID0gdGhpcy5wYXJhbXMua2VlcEFsaXZlO1xuICAgICAgICBpZiAodGhpcy5rZWVwQWxpdmUpIHtcbiAgICAgICAgICB0aGlzLmNhY2hlID0ge307XG4gICAgICAgIH1cbiAgICAgICAgLy8gY2hlY2sgaW5saW5lLXRlbXBsYXRlXG4gICAgICAgIGlmICh0aGlzLnBhcmFtcy5pbmxpbmVUZW1wbGF0ZSkge1xuICAgICAgICAgIC8vIGV4dHJhY3QgaW5saW5lIHRlbXBsYXRlIGFzIGEgRG9jdW1lbnRGcmFnbWVudFxuICAgICAgICAgIHRoaXMuaW5saW5lVGVtcGxhdGUgPSBleHRyYWN0Q29udGVudCh0aGlzLmVsLCB0cnVlKTtcbiAgICAgICAgfVxuICAgICAgICAvLyBjb21wb25lbnQgcmVzb2x1dGlvbiByZWxhdGVkIHN0YXRlXG4gICAgICAgIHRoaXMucGVuZGluZ0NvbXBvbmVudENiID0gdGhpcy5Db21wb25lbnQgPSBudWxsO1xuICAgICAgICAvLyB0cmFuc2l0aW9uIHJlbGF0ZWQgc3RhdGVcbiAgICAgICAgdGhpcy5wZW5kaW5nUmVtb3ZhbHMgPSAwO1xuICAgICAgICB0aGlzLnBlbmRpbmdSZW1vdmFsQ2IgPSBudWxsO1xuICAgICAgICAvLyBjcmVhdGUgYSByZWYgYW5jaG9yXG4gICAgICAgIHRoaXMuYW5jaG9yID0gY3JlYXRlQW5jaG9yKCd2LWNvbXBvbmVudCcpO1xuICAgICAgICByZXBsYWNlKHRoaXMuZWwsIHRoaXMuYW5jaG9yKTtcbiAgICAgICAgLy8gcmVtb3ZlIGlzIGF0dHJpYnV0ZS5cbiAgICAgICAgLy8gdGhpcyBpcyByZW1vdmVkIGR1cmluZyBjb21waWxhdGlvbiwgYnV0IGJlY2F1c2UgY29tcGlsYXRpb24gaXNcbiAgICAgICAgLy8gY2FjaGVkLCB3aGVuIHRoZSBjb21wb25lbnQgaXMgdXNlZCBlbHNld2hlcmUgdGhpcyBhdHRyaWJ1dGVcbiAgICAgICAgLy8gd2lsbCByZW1haW4gYXQgbGluayB0aW1lLlxuICAgICAgICB0aGlzLmVsLnJlbW92ZUF0dHJpYnV0ZSgnaXMnKTtcbiAgICAgICAgdGhpcy5lbC5yZW1vdmVBdHRyaWJ1dGUoJzppcycpO1xuICAgICAgICAvLyByZW1vdmUgcmVmLCBzYW1lIGFzIGFib3ZlXG4gICAgICAgIGlmICh0aGlzLmRlc2NyaXB0b3IucmVmKSB7XG4gICAgICAgICAgdGhpcy5lbC5yZW1vdmVBdHRyaWJ1dGUoJ3YtcmVmOicgKyBoeXBoZW5hdGUodGhpcy5kZXNjcmlwdG9yLnJlZikpO1xuICAgICAgICB9XG4gICAgICAgIC8vIGlmIHN0YXRpYywgYnVpbGQgcmlnaHQgbm93LlxuICAgICAgICBpZiAodGhpcy5saXRlcmFsKSB7XG4gICAgICAgICAgdGhpcy5zZXRDb21wb25lbnQodGhpcy5leHByZXNzaW9uKTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgJ2RldmVsb3BtZW50JyAhPT0gJ3Byb2R1Y3Rpb24nICYmIHdhcm4oJ2Nhbm5vdCBtb3VudCBjb21wb25lbnQgXCInICsgdGhpcy5leHByZXNzaW9uICsgJ1wiICcgKyAnb24gYWxyZWFkeSBtb3VudGVkIGVsZW1lbnQ6ICcgKyB0aGlzLmVsKTtcbiAgICAgIH1cbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogUHVibGljIHVwZGF0ZSwgY2FsbGVkIGJ5IHRoZSB3YXRjaGVyIGluIHRoZSBkeW5hbWljXG4gICAgICogbGl0ZXJhbCBzY2VuYXJpbywgZS5nLiA8Y29tcG9uZW50IDppcz1cInZpZXdcIj5cbiAgICAgKi9cblxuICAgIHVwZGF0ZTogZnVuY3Rpb24gdXBkYXRlKHZhbHVlKSB7XG4gICAgICBpZiAoIXRoaXMubGl0ZXJhbCkge1xuICAgICAgICB0aGlzLnNldENvbXBvbmVudCh2YWx1ZSk7XG4gICAgICB9XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIFN3aXRjaCBkeW5hbWljIGNvbXBvbmVudHMuIE1heSByZXNvbHZlIHRoZSBjb21wb25lbnRcbiAgICAgKiBhc3luY2hyb25vdXNseSwgYW5kIHBlcmZvcm0gdHJhbnNpdGlvbiBiYXNlZCBvblxuICAgICAqIHNwZWNpZmllZCB0cmFuc2l0aW9uIG1vZGUuIEFjY2VwdHMgYSBmZXcgYWRkaXRpb25hbFxuICAgICAqIGFyZ3VtZW50cyBzcGVjaWZpY2FsbHkgZm9yIHZ1ZS1yb3V0ZXIuXG4gICAgICpcbiAgICAgKiBUaGUgY2FsbGJhY2sgaXMgY2FsbGVkIHdoZW4gdGhlIGZ1bGwgdHJhbnNpdGlvbiBpc1xuICAgICAqIGZpbmlzaGVkLlxuICAgICAqXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IHZhbHVlXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gW2NiXVxuICAgICAqL1xuXG4gICAgc2V0Q29tcG9uZW50OiBmdW5jdGlvbiBzZXRDb21wb25lbnQodmFsdWUsIGNiKSB7XG4gICAgICB0aGlzLmludmFsaWRhdGVQZW5kaW5nKCk7XG4gICAgICBpZiAoIXZhbHVlKSB7XG4gICAgICAgIC8vIGp1c3QgcmVtb3ZlIGN1cnJlbnRcbiAgICAgICAgdGhpcy51bmJ1aWxkKHRydWUpO1xuICAgICAgICB0aGlzLnJlbW92ZSh0aGlzLmNoaWxkVk0sIGNiKTtcbiAgICAgICAgdGhpcy5jaGlsZFZNID0gbnVsbDtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHZhciBzZWxmID0gdGhpcztcbiAgICAgICAgdGhpcy5yZXNvbHZlQ29tcG9uZW50KHZhbHVlLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgc2VsZi5tb3VudENvbXBvbmVudChjYik7XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBSZXNvbHZlIHRoZSBjb21wb25lbnQgY29uc3RydWN0b3IgdG8gdXNlIHdoZW4gY3JlYXRpbmdcbiAgICAgKiB0aGUgY2hpbGQgdm0uXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge1N0cmluZ3xGdW5jdGlvbn0gdmFsdWVcbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBjYlxuICAgICAqL1xuXG4gICAgcmVzb2x2ZUNvbXBvbmVudDogZnVuY3Rpb24gcmVzb2x2ZUNvbXBvbmVudCh2YWx1ZSwgY2IpIHtcbiAgICAgIHZhciBzZWxmID0gdGhpcztcbiAgICAgIHRoaXMucGVuZGluZ0NvbXBvbmVudENiID0gY2FuY2VsbGFibGUoZnVuY3Rpb24gKENvbXBvbmVudCkge1xuICAgICAgICBzZWxmLkNvbXBvbmVudE5hbWUgPSBDb21wb25lbnQub3B0aW9ucy5uYW1lIHx8ICh0eXBlb2YgdmFsdWUgPT09ICdzdHJpbmcnID8gdmFsdWUgOiBudWxsKTtcbiAgICAgICAgc2VsZi5Db21wb25lbnQgPSBDb21wb25lbnQ7XG4gICAgICAgIGNiKCk7XG4gICAgICB9KTtcbiAgICAgIHRoaXMudm0uX3Jlc29sdmVDb21wb25lbnQodmFsdWUsIHRoaXMucGVuZGluZ0NvbXBvbmVudENiKTtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogQ3JlYXRlIGEgbmV3IGluc3RhbmNlIHVzaW5nIHRoZSBjdXJyZW50IGNvbnN0cnVjdG9yIGFuZFxuICAgICAqIHJlcGxhY2UgdGhlIGV4aXN0aW5nIGluc3RhbmNlLiBUaGlzIG1ldGhvZCBkb2Vzbid0IGNhcmVcbiAgICAgKiB3aGV0aGVyIHRoZSBuZXcgY29tcG9uZW50IGFuZCB0aGUgb2xkIG9uZSBhcmUgYWN0dWFsbHlcbiAgICAgKiB0aGUgc2FtZS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IFtjYl1cbiAgICAgKi9cblxuICAgIG1vdW50Q29tcG9uZW50OiBmdW5jdGlvbiBtb3VudENvbXBvbmVudChjYikge1xuICAgICAgLy8gYWN0dWFsIG1vdW50XG4gICAgICB0aGlzLnVuYnVpbGQodHJ1ZSk7XG4gICAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgICB2YXIgYWN0aXZhdGVIb29rcyA9IHRoaXMuQ29tcG9uZW50Lm9wdGlvbnMuYWN0aXZhdGU7XG4gICAgICB2YXIgY2FjaGVkID0gdGhpcy5nZXRDYWNoZWQoKTtcbiAgICAgIHZhciBuZXdDb21wb25lbnQgPSB0aGlzLmJ1aWxkKCk7XG4gICAgICBpZiAoYWN0aXZhdGVIb29rcyAmJiAhY2FjaGVkKSB7XG4gICAgICAgIHRoaXMud2FpdGluZ0ZvciA9IG5ld0NvbXBvbmVudDtcbiAgICAgICAgY2FsbEFjdGl2YXRlSG9va3MoYWN0aXZhdGVIb29rcywgbmV3Q29tcG9uZW50LCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgaWYgKHNlbGYud2FpdGluZ0ZvciAhPT0gbmV3Q29tcG9uZW50KSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgfVxuICAgICAgICAgIHNlbGYud2FpdGluZ0ZvciA9IG51bGw7XG4gICAgICAgICAgc2VsZi50cmFuc2l0aW9uKG5ld0NvbXBvbmVudCwgY2IpO1xuICAgICAgICB9KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIHVwZGF0ZSByZWYgZm9yIGtlcHQtYWxpdmUgY29tcG9uZW50XG4gICAgICAgIGlmIChjYWNoZWQpIHtcbiAgICAgICAgICBuZXdDb21wb25lbnQuX3VwZGF0ZVJlZigpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMudHJhbnNpdGlvbihuZXdDb21wb25lbnQsIGNiKTtcbiAgICAgIH1cbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogV2hlbiB0aGUgY29tcG9uZW50IGNoYW5nZXMgb3IgdW5iaW5kcyBiZWZvcmUgYW4gYXN5bmNcbiAgICAgKiBjb25zdHJ1Y3RvciBpcyByZXNvbHZlZCwgd2UgbmVlZCB0byBpbnZhbGlkYXRlIGl0c1xuICAgICAqIHBlbmRpbmcgY2FsbGJhY2suXG4gICAgICovXG5cbiAgICBpbnZhbGlkYXRlUGVuZGluZzogZnVuY3Rpb24gaW52YWxpZGF0ZVBlbmRpbmcoKSB7XG4gICAgICBpZiAodGhpcy5wZW5kaW5nQ29tcG9uZW50Q2IpIHtcbiAgICAgICAgdGhpcy5wZW5kaW5nQ29tcG9uZW50Q2IuY2FuY2VsKCk7XG4gICAgICAgIHRoaXMucGVuZGluZ0NvbXBvbmVudENiID0gbnVsbDtcbiAgICAgIH1cbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogSW5zdGFudGlhdGUvaW5zZXJ0IGEgbmV3IGNoaWxkIHZtLlxuICAgICAqIElmIGtlZXAgYWxpdmUgYW5kIGhhcyBjYWNoZWQgaW5zdGFuY2UsIGluc2VydCB0aGF0XG4gICAgICogaW5zdGFuY2U7IG90aGVyd2lzZSBidWlsZCBhIG5ldyBvbmUgYW5kIGNhY2hlIGl0LlxuICAgICAqXG4gICAgICogQHBhcmFtIHtPYmplY3R9IFtleHRyYU9wdGlvbnNdXG4gICAgICogQHJldHVybiB7VnVlfSAtIHRoZSBjcmVhdGVkIGluc3RhbmNlXG4gICAgICovXG5cbiAgICBidWlsZDogZnVuY3Rpb24gYnVpbGQoZXh0cmFPcHRpb25zKSB7XG4gICAgICB2YXIgY2FjaGVkID0gdGhpcy5nZXRDYWNoZWQoKTtcbiAgICAgIGlmIChjYWNoZWQpIHtcbiAgICAgICAgcmV0dXJuIGNhY2hlZDtcbiAgICAgIH1cbiAgICAgIGlmICh0aGlzLkNvbXBvbmVudCkge1xuICAgICAgICAvLyBkZWZhdWx0IG9wdGlvbnNcbiAgICAgICAgdmFyIG9wdGlvbnMgPSB7XG4gICAgICAgICAgbmFtZTogdGhpcy5Db21wb25lbnROYW1lLFxuICAgICAgICAgIGVsOiBjbG9uZU5vZGUodGhpcy5lbCksXG4gICAgICAgICAgdGVtcGxhdGU6IHRoaXMuaW5saW5lVGVtcGxhdGUsXG4gICAgICAgICAgLy8gbWFrZSBzdXJlIHRvIGFkZCB0aGUgY2hpbGQgd2l0aCBjb3JyZWN0IHBhcmVudFxuICAgICAgICAgIC8vIGlmIHRoaXMgaXMgYSB0cmFuc2NsdWRlZCBjb21wb25lbnQsIGl0cyBwYXJlbnRcbiAgICAgICAgICAvLyBzaG91bGQgYmUgdGhlIHRyYW5zY2x1c2lvbiBob3N0LlxuICAgICAgICAgIHBhcmVudDogdGhpcy5faG9zdCB8fCB0aGlzLnZtLFxuICAgICAgICAgIC8vIGlmIG5vIGlubGluZS10ZW1wbGF0ZSwgdGhlbiB0aGUgY29tcGlsZWRcbiAgICAgICAgICAvLyBsaW5rZXIgY2FuIGJlIGNhY2hlZCBmb3IgYmV0dGVyIHBlcmZvcm1hbmNlLlxuICAgICAgICAgIF9saW5rZXJDYWNoYWJsZTogIXRoaXMuaW5saW5lVGVtcGxhdGUsXG4gICAgICAgICAgX3JlZjogdGhpcy5kZXNjcmlwdG9yLnJlZixcbiAgICAgICAgICBfYXNDb21wb25lbnQ6IHRydWUsXG4gICAgICAgICAgX2lzUm91dGVyVmlldzogdGhpcy5faXNSb3V0ZXJWaWV3LFxuICAgICAgICAgIC8vIGlmIHRoaXMgaXMgYSB0cmFuc2NsdWRlZCBjb21wb25lbnQsIGNvbnRleHRcbiAgICAgICAgICAvLyB3aWxsIGJlIHRoZSBjb21tb24gcGFyZW50IHZtIG9mIHRoaXMgaW5zdGFuY2VcbiAgICAgICAgICAvLyBhbmQgaXRzIGhvc3QuXG4gICAgICAgICAgX2NvbnRleHQ6IHRoaXMudm0sXG4gICAgICAgICAgLy8gaWYgdGhpcyBpcyBpbnNpZGUgYW4gaW5saW5lIHYtZm9yLCB0aGUgc2NvcGVcbiAgICAgICAgICAvLyB3aWxsIGJlIHRoZSBpbnRlcm1lZGlhdGUgc2NvcGUgY3JlYXRlZCBmb3IgdGhpc1xuICAgICAgICAgIC8vIHJlcGVhdCBmcmFnbWVudC4gdGhpcyBpcyB1c2VkIGZvciBsaW5raW5nIHByb3BzXG4gICAgICAgICAgLy8gYW5kIGNvbnRhaW5lciBkaXJlY3RpdmVzLlxuICAgICAgICAgIF9zY29wZTogdGhpcy5fc2NvcGUsXG4gICAgICAgICAgLy8gcGFzcyBpbiB0aGUgb3duZXIgZnJhZ21lbnQgb2YgdGhpcyBjb21wb25lbnQuXG4gICAgICAgICAgLy8gdGhpcyBpcyBuZWNlc3Nhcnkgc28gdGhhdCB0aGUgZnJhZ21lbnQgY2FuIGtlZXBcbiAgICAgICAgICAvLyB0cmFjayBvZiBpdHMgY29udGFpbmVkIGNvbXBvbmVudHMgaW4gb3JkZXIgdG9cbiAgICAgICAgICAvLyBjYWxsIGF0dGFjaC9kZXRhY2ggaG9va3MgZm9yIHRoZW0uXG4gICAgICAgICAgX2ZyYWc6IHRoaXMuX2ZyYWdcbiAgICAgICAgfTtcbiAgICAgICAgLy8gZXh0cmEgb3B0aW9uc1xuICAgICAgICAvLyBpbiAxLjAuMCB0aGlzIGlzIHVzZWQgYnkgdnVlLXJvdXRlciBvbmx5XG4gICAgICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBpZiAqL1xuICAgICAgICBpZiAoZXh0cmFPcHRpb25zKSB7XG4gICAgICAgICAgZXh0ZW5kKG9wdGlvbnMsIGV4dHJhT3B0aW9ucyk7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIGNoaWxkID0gbmV3IHRoaXMuQ29tcG9uZW50KG9wdGlvbnMpO1xuICAgICAgICBpZiAodGhpcy5rZWVwQWxpdmUpIHtcbiAgICAgICAgICB0aGlzLmNhY2hlW3RoaXMuQ29tcG9uZW50LmNpZF0gPSBjaGlsZDtcbiAgICAgICAgfVxuICAgICAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgaWYgKi9cbiAgICAgICAgaWYgKCdkZXZlbG9wbWVudCcgIT09ICdwcm9kdWN0aW9uJyAmJiB0aGlzLmVsLmhhc0F0dHJpYnV0ZSgndHJhbnNpdGlvbicpICYmIGNoaWxkLl9pc0ZyYWdtZW50KSB7XG4gICAgICAgICAgd2FybignVHJhbnNpdGlvbnMgd2lsbCBub3Qgd29yayBvbiBhIGZyYWdtZW50IGluc3RhbmNlLiAnICsgJ1RlbXBsYXRlOiAnICsgY2hpbGQuJG9wdGlvbnMudGVtcGxhdGUsIGNoaWxkKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gY2hpbGQ7XG4gICAgICB9XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIFRyeSB0byBnZXQgYSBjYWNoZWQgaW5zdGFuY2Ugb2YgdGhlIGN1cnJlbnQgY29tcG9uZW50LlxuICAgICAqXG4gICAgICogQHJldHVybiB7VnVlfHVuZGVmaW5lZH1cbiAgICAgKi9cblxuICAgIGdldENhY2hlZDogZnVuY3Rpb24gZ2V0Q2FjaGVkKCkge1xuICAgICAgcmV0dXJuIHRoaXMua2VlcEFsaXZlICYmIHRoaXMuY2FjaGVbdGhpcy5Db21wb25lbnQuY2lkXTtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogVGVhcmRvd24gdGhlIGN1cnJlbnQgY2hpbGQsIGJ1dCBkZWZlcnMgY2xlYW51cCBzb1xuICAgICAqIHRoYXQgd2UgY2FuIHNlcGFyYXRlIHRoZSBkZXN0cm95IGFuZCByZW1vdmFsIHN0ZXBzLlxuICAgICAqXG4gICAgICogQHBhcmFtIHtCb29sZWFufSBkZWZlclxuICAgICAqL1xuXG4gICAgdW5idWlsZDogZnVuY3Rpb24gdW5idWlsZChkZWZlcikge1xuICAgICAgaWYgKHRoaXMud2FpdGluZ0Zvcikge1xuICAgICAgICBpZiAoIXRoaXMua2VlcEFsaXZlKSB7XG4gICAgICAgICAgdGhpcy53YWl0aW5nRm9yLiRkZXN0cm95KCk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy53YWl0aW5nRm9yID0gbnVsbDtcbiAgICAgIH1cbiAgICAgIHZhciBjaGlsZCA9IHRoaXMuY2hpbGRWTTtcbiAgICAgIGlmICghY2hpbGQgfHwgdGhpcy5rZWVwQWxpdmUpIHtcbiAgICAgICAgaWYgKGNoaWxkKSB7XG4gICAgICAgICAgLy8gcmVtb3ZlIHJlZlxuICAgICAgICAgIGNoaWxkLl9pbmFjdGl2ZSA9IHRydWU7XG4gICAgICAgICAgY2hpbGQuX3VwZGF0ZVJlZih0cnVlKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICAvLyB0aGUgc29sZSBwdXJwb3NlIG9mIGBkZWZlckNsZWFudXBgIGlzIHNvIHRoYXQgd2UgY2FuXG4gICAgICAvLyBcImRlYWN0aXZhdGVcIiB0aGUgdm0gcmlnaHQgbm93IGFuZCBwZXJmb3JtIERPTSByZW1vdmFsXG4gICAgICAvLyBsYXRlci5cbiAgICAgIGNoaWxkLiRkZXN0cm95KGZhbHNlLCBkZWZlcik7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIFJlbW92ZSBjdXJyZW50IGRlc3Ryb3llZCBjaGlsZCBhbmQgbWFudWFsbHkgZG9cbiAgICAgKiB0aGUgY2xlYW51cCBhZnRlciByZW1vdmFsLlxuICAgICAqXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gY2JcbiAgICAgKi9cblxuICAgIHJlbW92ZTogZnVuY3Rpb24gcmVtb3ZlKGNoaWxkLCBjYikge1xuICAgICAgdmFyIGtlZXBBbGl2ZSA9IHRoaXMua2VlcEFsaXZlO1xuICAgICAgaWYgKGNoaWxkKSB7XG4gICAgICAgIC8vIHdlIG1heSBoYXZlIGEgY29tcG9uZW50IHN3aXRjaCB3aGVuIGEgcHJldmlvdXNcbiAgICAgICAgLy8gY29tcG9uZW50IGlzIHN0aWxsIGJlaW5nIHRyYW5zaXRpb25lZCBvdXQuXG4gICAgICAgIC8vIHdlIHdhbnQgdG8gdHJpZ2dlciBvbmx5IG9uZSBsYXN0ZXN0IGluc2VydGlvbiBjYlxuICAgICAgICAvLyB3aGVuIHRoZSBleGlzdGluZyB0cmFuc2l0aW9uIGZpbmlzaGVzLiAoIzExMTkpXG4gICAgICAgIHRoaXMucGVuZGluZ1JlbW92YWxzKys7XG4gICAgICAgIHRoaXMucGVuZGluZ1JlbW92YWxDYiA9IGNiO1xuICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgICAgIGNoaWxkLiRyZW1vdmUoZnVuY3Rpb24gKCkge1xuICAgICAgICAgIHNlbGYucGVuZGluZ1JlbW92YWxzLS07XG4gICAgICAgICAgaWYgKCFrZWVwQWxpdmUpIGNoaWxkLl9jbGVhbnVwKCk7XG4gICAgICAgICAgaWYgKCFzZWxmLnBlbmRpbmdSZW1vdmFscyAmJiBzZWxmLnBlbmRpbmdSZW1vdmFsQ2IpIHtcbiAgICAgICAgICAgIHNlbGYucGVuZGluZ1JlbW92YWxDYigpO1xuICAgICAgICAgICAgc2VsZi5wZW5kaW5nUmVtb3ZhbENiID0gbnVsbDtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfSBlbHNlIGlmIChjYikge1xuICAgICAgICBjYigpO1xuICAgICAgfVxuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBBY3R1YWxseSBzd2FwIHRoZSBjb21wb25lbnRzLCBkZXBlbmRpbmcgb24gdGhlXG4gICAgICogdHJhbnNpdGlvbiBtb2RlLiBEZWZhdWx0cyB0byBzaW11bHRhbmVvdXMuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge1Z1ZX0gdGFyZ2V0XG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gW2NiXVxuICAgICAqL1xuXG4gICAgdHJhbnNpdGlvbjogZnVuY3Rpb24gdHJhbnNpdGlvbih0YXJnZXQsIGNiKSB7XG4gICAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgICB2YXIgY3VycmVudCA9IHRoaXMuY2hpbGRWTTtcbiAgICAgIC8vIGZvciBkZXZ0b29sIGluc3BlY3Rpb25cbiAgICAgIGlmIChjdXJyZW50KSBjdXJyZW50Ll9pbmFjdGl2ZSA9IHRydWU7XG4gICAgICB0YXJnZXQuX2luYWN0aXZlID0gZmFsc2U7XG4gICAgICB0aGlzLmNoaWxkVk0gPSB0YXJnZXQ7XG4gICAgICBzd2l0Y2ggKHNlbGYucGFyYW1zLnRyYW5zaXRpb25Nb2RlKSB7XG4gICAgICAgIGNhc2UgJ2luLW91dCc6XG4gICAgICAgICAgdGFyZ2V0LiRiZWZvcmUoc2VsZi5hbmNob3IsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHNlbGYucmVtb3ZlKGN1cnJlbnQsIGNiKTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAnb3V0LWluJzpcbiAgICAgICAgICBzZWxmLnJlbW92ZShjdXJyZW50LCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB0YXJnZXQuJGJlZm9yZShzZWxmLmFuY2hvciwgY2IpO1xuICAgICAgICAgIH0pO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgIHNlbGYucmVtb3ZlKGN1cnJlbnQpO1xuICAgICAgICAgIHRhcmdldC4kYmVmb3JlKHNlbGYuYW5jaG9yLCBjYik7XG4gICAgICB9XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIFVuYmluZC5cbiAgICAgKi9cblxuICAgIHVuYmluZDogZnVuY3Rpb24gdW5iaW5kKCkge1xuICAgICAgdGhpcy5pbnZhbGlkYXRlUGVuZGluZygpO1xuICAgICAgLy8gRG8gbm90IGRlZmVyIGNsZWFudXAgd2hlbiB1bmJpbmRpbmdcbiAgICAgIHRoaXMudW5idWlsZCgpO1xuICAgICAgLy8gZGVzdHJveSBhbGwga2VlcC1hbGl2ZSBjYWNoZWQgaW5zdGFuY2VzXG4gICAgICBpZiAodGhpcy5jYWNoZSkge1xuICAgICAgICBmb3IgKHZhciBrZXkgaW4gdGhpcy5jYWNoZSkge1xuICAgICAgICAgIHRoaXMuY2FjaGVba2V5XS4kZGVzdHJveSgpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuY2FjaGUgPSBudWxsO1xuICAgICAgfVxuICAgIH1cbiAgfTtcblxuICAvKipcbiAgICogQ2FsbCBhY3RpdmF0ZSBob29rcyBpbiBvcmRlciAoYXN5bmNocm9ub3VzKVxuICAgKlxuICAgKiBAcGFyYW0ge0FycmF5fSBob29rc1xuICAgKiBAcGFyYW0ge1Z1ZX0gdm1cbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gY2JcbiAgICovXG5cbiAgZnVuY3Rpb24gY2FsbEFjdGl2YXRlSG9va3MoaG9va3MsIHZtLCBjYikge1xuICAgIHZhciB0b3RhbCA9IGhvb2tzLmxlbmd0aDtcbiAgICB2YXIgY2FsbGVkID0gMDtcbiAgICBob29rc1swXS5jYWxsKHZtLCBuZXh0KTtcbiAgICBmdW5jdGlvbiBuZXh0KCkge1xuICAgICAgaWYgKCsrY2FsbGVkID49IHRvdGFsKSB7XG4gICAgICAgIGNiKCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBob29rc1tjYWxsZWRdLmNhbGwodm0sIG5leHQpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHZhciBwcm9wQmluZGluZ01vZGVzID0gY29uZmlnLl9wcm9wQmluZGluZ01vZGVzO1xuICB2YXIgZW1wdHkgPSB7fTtcblxuICAvLyByZWdleGVzXG4gIHZhciBpZGVudFJFJDEgPSAvXlskX2EtekEtWl0rW1xcdyRdKiQvO1xuICB2YXIgc2V0dGFibGVQYXRoUkUgPSAvXltBLVphLXpfJF1bXFx3JF0qKFxcLltBLVphLXpfJF1bXFx3JF0qfFxcW1teXFxbXFxdXStcXF0pKiQvO1xuXG4gIC8qKlxuICAgKiBDb21waWxlIHByb3BzIG9uIGEgcm9vdCBlbGVtZW50IGFuZCByZXR1cm5cbiAgICogYSBwcm9wcyBsaW5rIGZ1bmN0aW9uLlxuICAgKlxuICAgKiBAcGFyYW0ge0VsZW1lbnR8RG9jdW1lbnRGcmFnbWVudH0gZWxcbiAgICogQHBhcmFtIHtBcnJheX0gcHJvcE9wdGlvbnNcbiAgICogQHBhcmFtIHtWdWV9IHZtXG4gICAqIEByZXR1cm4ge0Z1bmN0aW9ufSBwcm9wc0xpbmtGblxuICAgKi9cblxuICBmdW5jdGlvbiBjb21waWxlUHJvcHMoZWwsIHByb3BPcHRpb25zLCB2bSkge1xuICAgIHZhciBwcm9wcyA9IFtdO1xuICAgIHZhciBuYW1lcyA9IE9iamVjdC5rZXlzKHByb3BPcHRpb25zKTtcbiAgICB2YXIgaSA9IG5hbWVzLmxlbmd0aDtcbiAgICB2YXIgb3B0aW9ucywgbmFtZSwgYXR0ciwgdmFsdWUsIHBhdGgsIHBhcnNlZCwgcHJvcDtcbiAgICB3aGlsZSAoaS0tKSB7XG4gICAgICBuYW1lID0gbmFtZXNbaV07XG4gICAgICBvcHRpb25zID0gcHJvcE9wdGlvbnNbbmFtZV0gfHwgZW1wdHk7XG5cbiAgICAgIGlmICgnZGV2ZWxvcG1lbnQnICE9PSAncHJvZHVjdGlvbicgJiYgbmFtZSA9PT0gJyRkYXRhJykge1xuICAgICAgICB3YXJuKCdEbyBub3QgdXNlICRkYXRhIGFzIHByb3AuJywgdm0pO1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cblxuICAgICAgLy8gcHJvcHMgY291bGQgY29udGFpbiBkYXNoZXMsIHdoaWNoIHdpbGwgYmVcbiAgICAgIC8vIGludGVycHJldGVkIGFzIG1pbnVzIGNhbGN1bGF0aW9ucyBieSB0aGUgcGFyc2VyXG4gICAgICAvLyBzbyB3ZSBuZWVkIHRvIGNhbWVsaXplIHRoZSBwYXRoIGhlcmVcbiAgICAgIHBhdGggPSBjYW1lbGl6ZShuYW1lKTtcbiAgICAgIGlmICghaWRlbnRSRSQxLnRlc3QocGF0aCkpIHtcbiAgICAgICAgJ2RldmVsb3BtZW50JyAhPT0gJ3Byb2R1Y3Rpb24nICYmIHdhcm4oJ0ludmFsaWQgcHJvcCBrZXk6IFwiJyArIG5hbWUgKyAnXCIuIFByb3Aga2V5cyAnICsgJ211c3QgYmUgdmFsaWQgaWRlbnRpZmllcnMuJywgdm0pO1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cblxuICAgICAgcHJvcCA9IHtcbiAgICAgICAgbmFtZTogbmFtZSxcbiAgICAgICAgcGF0aDogcGF0aCxcbiAgICAgICAgb3B0aW9uczogb3B0aW9ucyxcbiAgICAgICAgbW9kZTogcHJvcEJpbmRpbmdNb2Rlcy5PTkVfV0FZLFxuICAgICAgICByYXc6IG51bGxcbiAgICAgIH07XG5cbiAgICAgIGF0dHIgPSBoeXBoZW5hdGUobmFtZSk7XG4gICAgICAvLyBmaXJzdCBjaGVjayBkeW5hbWljIHZlcnNpb25cbiAgICAgIGlmICgodmFsdWUgPSBnZXRCaW5kQXR0cihlbCwgYXR0cikpID09PSBudWxsKSB7XG4gICAgICAgIGlmICgodmFsdWUgPSBnZXRCaW5kQXR0cihlbCwgYXR0ciArICcuc3luYycpKSAhPT0gbnVsbCkge1xuICAgICAgICAgIHByb3AubW9kZSA9IHByb3BCaW5kaW5nTW9kZXMuVFdPX1dBWTtcbiAgICAgICAgfSBlbHNlIGlmICgodmFsdWUgPSBnZXRCaW5kQXR0cihlbCwgYXR0ciArICcub25jZScpKSAhPT0gbnVsbCkge1xuICAgICAgICAgIHByb3AubW9kZSA9IHByb3BCaW5kaW5nTW9kZXMuT05FX1RJTUU7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmICh2YWx1ZSAhPT0gbnVsbCkge1xuICAgICAgICAvLyBoYXMgZHluYW1pYyBiaW5kaW5nIVxuICAgICAgICBwcm9wLnJhdyA9IHZhbHVlO1xuICAgICAgICBwYXJzZWQgPSBwYXJzZURpcmVjdGl2ZSh2YWx1ZSk7XG4gICAgICAgIHZhbHVlID0gcGFyc2VkLmV4cHJlc3Npb247XG4gICAgICAgIHByb3AuZmlsdGVycyA9IHBhcnNlZC5maWx0ZXJzO1xuICAgICAgICAvLyBjaGVjayBiaW5kaW5nIHR5cGVcbiAgICAgICAgaWYgKGlzTGl0ZXJhbCh2YWx1ZSkgJiYgIXBhcnNlZC5maWx0ZXJzKSB7XG4gICAgICAgICAgLy8gZm9yIGV4cHJlc3Npb25zIGNvbnRhaW5pbmcgbGl0ZXJhbCBudW1iZXJzIGFuZFxuICAgICAgICAgIC8vIGJvb2xlYW5zLCB0aGVyZSdzIG5vIG5lZWQgdG8gc2V0dXAgYSBwcm9wIGJpbmRpbmcsXG4gICAgICAgICAgLy8gc28gd2UgY2FuIG9wdGltaXplIHRoZW0gYXMgYSBvbmUtdGltZSBzZXQuXG4gICAgICAgICAgcHJvcC5vcHRpbWl6ZWRMaXRlcmFsID0gdHJ1ZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBwcm9wLmR5bmFtaWMgPSB0cnVlO1xuICAgICAgICAgIC8vIGNoZWNrIG5vbi1zZXR0YWJsZSBwYXRoIGZvciB0d28td2F5IGJpbmRpbmdzXG4gICAgICAgICAgaWYgKCdkZXZlbG9wbWVudCcgIT09ICdwcm9kdWN0aW9uJyAmJiBwcm9wLm1vZGUgPT09IHByb3BCaW5kaW5nTW9kZXMuVFdPX1dBWSAmJiAhc2V0dGFibGVQYXRoUkUudGVzdCh2YWx1ZSkpIHtcbiAgICAgICAgICAgIHByb3AubW9kZSA9IHByb3BCaW5kaW5nTW9kZXMuT05FX1dBWTtcbiAgICAgICAgICAgIHdhcm4oJ0Nhbm5vdCBiaW5kIHR3by13YXkgcHJvcCB3aXRoIG5vbi1zZXR0YWJsZSAnICsgJ3BhcmVudCBwYXRoOiAnICsgdmFsdWUsIHZtKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcHJvcC5wYXJlbnRQYXRoID0gdmFsdWU7XG5cbiAgICAgICAgLy8gd2FybiByZXF1aXJlZCB0d28td2F5XG4gICAgICAgIGlmICgnZGV2ZWxvcG1lbnQnICE9PSAncHJvZHVjdGlvbicgJiYgb3B0aW9ucy50d29XYXkgJiYgcHJvcC5tb2RlICE9PSBwcm9wQmluZGluZ01vZGVzLlRXT19XQVkpIHtcbiAgICAgICAgICB3YXJuKCdQcm9wIFwiJyArIG5hbWUgKyAnXCIgZXhwZWN0cyBhIHR3by13YXkgYmluZGluZyB0eXBlLicsIHZtKTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIGlmICgodmFsdWUgPSBnZXRBdHRyKGVsLCBhdHRyKSkgIT09IG51bGwpIHtcbiAgICAgICAgLy8gaGFzIGxpdGVyYWwgYmluZGluZyFcbiAgICAgICAgcHJvcC5yYXcgPSB2YWx1ZTtcbiAgICAgIH0gZWxzZSBpZiAoJ2RldmVsb3BtZW50JyAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgICAgIC8vIGNoZWNrIHBvc3NpYmxlIGNhbWVsQ2FzZSBwcm9wIHVzYWdlXG4gICAgICAgIHZhciBsb3dlckNhc2VOYW1lID0gcGF0aC50b0xvd2VyQ2FzZSgpO1xuICAgICAgICB2YWx1ZSA9IC9bQS1aXFwtXS8udGVzdChuYW1lKSAmJiAoZWwuZ2V0QXR0cmlidXRlKGxvd2VyQ2FzZU5hbWUpIHx8IGVsLmdldEF0dHJpYnV0ZSgnOicgKyBsb3dlckNhc2VOYW1lKSB8fCBlbC5nZXRBdHRyaWJ1dGUoJ3YtYmluZDonICsgbG93ZXJDYXNlTmFtZSkgfHwgZWwuZ2V0QXR0cmlidXRlKCc6JyArIGxvd2VyQ2FzZU5hbWUgKyAnLm9uY2UnKSB8fCBlbC5nZXRBdHRyaWJ1dGUoJ3YtYmluZDonICsgbG93ZXJDYXNlTmFtZSArICcub25jZScpIHx8IGVsLmdldEF0dHJpYnV0ZSgnOicgKyBsb3dlckNhc2VOYW1lICsgJy5zeW5jJykgfHwgZWwuZ2V0QXR0cmlidXRlKCd2LWJpbmQ6JyArIGxvd2VyQ2FzZU5hbWUgKyAnLnN5bmMnKSk7XG4gICAgICAgIGlmICh2YWx1ZSkge1xuICAgICAgICAgIHdhcm4oJ1Bvc3NpYmxlIHVzYWdlIGVycm9yIGZvciBwcm9wIGAnICsgbG93ZXJDYXNlTmFtZSArICdgIC0gJyArICdkaWQgeW91IG1lYW4gYCcgKyBhdHRyICsgJ2A/IEhUTUwgaXMgY2FzZS1pbnNlbnNpdGl2ZSwgcmVtZW1iZXIgdG8gdXNlICcgKyAna2ViYWItY2FzZSBmb3IgcHJvcHMgaW4gdGVtcGxhdGVzLicsIHZtKTtcbiAgICAgICAgfSBlbHNlIGlmIChvcHRpb25zLnJlcXVpcmVkKSB7XG4gICAgICAgICAgLy8gd2FybiBtaXNzaW5nIHJlcXVpcmVkXG4gICAgICAgICAgd2FybignTWlzc2luZyByZXF1aXJlZCBwcm9wOiAnICsgbmFtZSwgdm0pO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICAvLyBwdXNoIHByb3BcbiAgICAgIHByb3BzLnB1c2gocHJvcCk7XG4gICAgfVxuICAgIHJldHVybiBtYWtlUHJvcHNMaW5rRm4ocHJvcHMpO1xuICB9XG5cbiAgLyoqXG4gICAqIEJ1aWxkIGEgZnVuY3Rpb24gdGhhdCBhcHBsaWVzIHByb3BzIHRvIGEgdm0uXG4gICAqXG4gICAqIEBwYXJhbSB7QXJyYXl9IHByb3BzXG4gICAqIEByZXR1cm4ge0Z1bmN0aW9ufSBwcm9wc0xpbmtGblxuICAgKi9cblxuICBmdW5jdGlvbiBtYWtlUHJvcHNMaW5rRm4ocHJvcHMpIHtcbiAgICByZXR1cm4gZnVuY3Rpb24gcHJvcHNMaW5rRm4odm0sIHNjb3BlKSB7XG4gICAgICAvLyBzdG9yZSByZXNvbHZlZCBwcm9wcyBpbmZvXG4gICAgICB2bS5fcHJvcHMgPSB7fTtcbiAgICAgIHZhciBpbmxpbmVQcm9wcyA9IHZtLiRvcHRpb25zLnByb3BzRGF0YTtcbiAgICAgIHZhciBpID0gcHJvcHMubGVuZ3RoO1xuICAgICAgdmFyIHByb3AsIHBhdGgsIG9wdGlvbnMsIHZhbHVlLCByYXc7XG4gICAgICB3aGlsZSAoaS0tKSB7XG4gICAgICAgIHByb3AgPSBwcm9wc1tpXTtcbiAgICAgICAgcmF3ID0gcHJvcC5yYXc7XG4gICAgICAgIHBhdGggPSBwcm9wLnBhdGg7XG4gICAgICAgIG9wdGlvbnMgPSBwcm9wLm9wdGlvbnM7XG4gICAgICAgIHZtLl9wcm9wc1twYXRoXSA9IHByb3A7XG4gICAgICAgIGlmIChpbmxpbmVQcm9wcyAmJiBoYXNPd24oaW5saW5lUHJvcHMsIHBhdGgpKSB7XG4gICAgICAgICAgaW5pdFByb3Aodm0sIHByb3AsIGlubGluZVByb3BzW3BhdGhdKTtcbiAgICAgICAgfWlmIChyYXcgPT09IG51bGwpIHtcbiAgICAgICAgICAvLyBpbml0aWFsaXplIGFic2VudCBwcm9wXG4gICAgICAgICAgaW5pdFByb3Aodm0sIHByb3AsIHVuZGVmaW5lZCk7XG4gICAgICAgIH0gZWxzZSBpZiAocHJvcC5keW5hbWljKSB7XG4gICAgICAgICAgLy8gZHluYW1pYyBwcm9wXG4gICAgICAgICAgaWYgKHByb3AubW9kZSA9PT0gcHJvcEJpbmRpbmdNb2Rlcy5PTkVfVElNRSkge1xuICAgICAgICAgICAgLy8gb25lIHRpbWUgYmluZGluZ1xuICAgICAgICAgICAgdmFsdWUgPSAoc2NvcGUgfHwgdm0uX2NvbnRleHQgfHwgdm0pLiRnZXQocHJvcC5wYXJlbnRQYXRoKTtcbiAgICAgICAgICAgIGluaXRQcm9wKHZtLCBwcm9wLCB2YWx1ZSk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGlmICh2bS5fY29udGV4dCkge1xuICAgICAgICAgICAgICAvLyBkeW5hbWljIGJpbmRpbmdcbiAgICAgICAgICAgICAgdm0uX2JpbmREaXIoe1xuICAgICAgICAgICAgICAgIG5hbWU6ICdwcm9wJyxcbiAgICAgICAgICAgICAgICBkZWY6IHByb3BEZWYsXG4gICAgICAgICAgICAgICAgcHJvcDogcHJvcFxuICAgICAgICAgICAgICB9LCBudWxsLCBudWxsLCBzY29wZSk7IC8vIGVsLCBob3N0LCBzY29wZVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAvLyByb290IGluc3RhbmNlXG4gICAgICAgICAgICAgICAgaW5pdFByb3Aodm0sIHByb3AsIHZtLiRnZXQocHJvcC5wYXJlbnRQYXRoKSk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSBpZiAocHJvcC5vcHRpbWl6ZWRMaXRlcmFsKSB7XG4gICAgICAgICAgLy8gb3B0aW1pemVkIGxpdGVyYWwsIGNhc3QgaXQgYW5kIGp1c3Qgc2V0IG9uY2VcbiAgICAgICAgICB2YXIgc3RyaXBwZWQgPSBzdHJpcFF1b3RlcyhyYXcpO1xuICAgICAgICAgIHZhbHVlID0gc3RyaXBwZWQgPT09IHJhdyA/IHRvQm9vbGVhbih0b051bWJlcihyYXcpKSA6IHN0cmlwcGVkO1xuICAgICAgICAgIGluaXRQcm9wKHZtLCBwcm9wLCB2YWx1ZSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgLy8gc3RyaW5nIGxpdGVyYWwsIGJ1dCB3ZSBuZWVkIHRvIGNhdGVyIGZvclxuICAgICAgICAgIC8vIEJvb2xlYW4gcHJvcHMgd2l0aCBubyB2YWx1ZSwgb3Igd2l0aCBzYW1lXG4gICAgICAgICAgLy8gbGl0ZXJhbCB2YWx1ZSAoZS5nLiBkaXNhYmxlZD1cImRpc2FibGVkXCIpXG4gICAgICAgICAgLy8gc2VlIGh0dHBzOi8vZ2l0aHViLmNvbS92dWVqcy92dWUtbG9hZGVyL2lzc3Vlcy8xODJcbiAgICAgICAgICB2YWx1ZSA9IG9wdGlvbnMudHlwZSA9PT0gQm9vbGVhbiAmJiAocmF3ID09PSAnJyB8fCByYXcgPT09IGh5cGhlbmF0ZShwcm9wLm5hbWUpKSA/IHRydWUgOiByYXc7XG4gICAgICAgICAgaW5pdFByb3Aodm0sIHByb3AsIHZhbHVlKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH07XG4gIH1cblxuICAvKipcbiAgICogUHJvY2VzcyBhIHByb3Agd2l0aCBhIHJhd1ZhbHVlLCBhcHBseWluZyBuZWNlc3NhcnkgY29lcnNpb25zLFxuICAgKiBkZWZhdWx0IHZhbHVlcyAmIGFzc2VydGlvbnMgYW5kIGNhbGwgdGhlIGdpdmVuIGNhbGxiYWNrIHdpdGhcbiAgICogcHJvY2Vzc2VkIHZhbHVlLlxuICAgKlxuICAgKiBAcGFyYW0ge1Z1ZX0gdm1cbiAgICogQHBhcmFtIHtPYmplY3R9IHByb3BcbiAgICogQHBhcmFtIHsqfSByYXdWYWx1ZVxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBmblxuICAgKi9cblxuICBmdW5jdGlvbiBwcm9jZXNzUHJvcFZhbHVlKHZtLCBwcm9wLCByYXdWYWx1ZSwgZm4pIHtcbiAgICB2YXIgaXNTaW1wbGUgPSBwcm9wLmR5bmFtaWMgJiYgaXNTaW1wbGVQYXRoKHByb3AucGFyZW50UGF0aCk7XG4gICAgdmFyIHZhbHVlID0gcmF3VmFsdWU7XG4gICAgaWYgKHZhbHVlID09PSB1bmRlZmluZWQpIHtcbiAgICAgIHZhbHVlID0gZ2V0UHJvcERlZmF1bHRWYWx1ZSh2bSwgcHJvcCk7XG4gICAgfVxuICAgIHZhbHVlID0gY29lcmNlUHJvcChwcm9wLCB2YWx1ZSk7XG4gICAgdmFyIGNvZXJjZWQgPSB2YWx1ZSAhPT0gcmF3VmFsdWU7XG4gICAgaWYgKCFhc3NlcnRQcm9wKHByb3AsIHZhbHVlLCB2bSkpIHtcbiAgICAgIHZhbHVlID0gdW5kZWZpbmVkO1xuICAgIH1cbiAgICBpZiAoaXNTaW1wbGUgJiYgIWNvZXJjZWQpIHtcbiAgICAgIHdpdGhvdXRDb252ZXJzaW9uKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgZm4odmFsdWUpO1xuICAgICAgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGZuKHZhbHVlKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogU2V0IGEgcHJvcCdzIGluaXRpYWwgdmFsdWUgb24gYSB2bSBhbmQgaXRzIGRhdGEgb2JqZWN0LlxuICAgKlxuICAgKiBAcGFyYW0ge1Z1ZX0gdm1cbiAgICogQHBhcmFtIHtPYmplY3R9IHByb3BcbiAgICogQHBhcmFtIHsqfSB2YWx1ZVxuICAgKi9cblxuICBmdW5jdGlvbiBpbml0UHJvcCh2bSwgcHJvcCwgdmFsdWUpIHtcbiAgICBwcm9jZXNzUHJvcFZhbHVlKHZtLCBwcm9wLCB2YWx1ZSwgZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICBkZWZpbmVSZWFjdGl2ZSh2bSwgcHJvcC5wYXRoLCB2YWx1ZSk7XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogVXBkYXRlIGEgcHJvcCdzIHZhbHVlIG9uIGEgdm0uXG4gICAqXG4gICAqIEBwYXJhbSB7VnVlfSB2bVxuICAgKiBAcGFyYW0ge09iamVjdH0gcHJvcFxuICAgKiBAcGFyYW0geyp9IHZhbHVlXG4gICAqL1xuXG4gIGZ1bmN0aW9uIHVwZGF0ZVByb3Aodm0sIHByb3AsIHZhbHVlKSB7XG4gICAgcHJvY2Vzc1Byb3BWYWx1ZSh2bSwgcHJvcCwgdmFsdWUsIGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgdm1bcHJvcC5wYXRoXSA9IHZhbHVlO1xuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldCB0aGUgZGVmYXVsdCB2YWx1ZSBvZiBhIHByb3AuXG4gICAqXG4gICAqIEBwYXJhbSB7VnVlfSB2bVxuICAgKiBAcGFyYW0ge09iamVjdH0gcHJvcFxuICAgKiBAcmV0dXJuIHsqfVxuICAgKi9cblxuICBmdW5jdGlvbiBnZXRQcm9wRGVmYXVsdFZhbHVlKHZtLCBwcm9wKSB7XG4gICAgLy8gbm8gZGVmYXVsdCwgcmV0dXJuIHVuZGVmaW5lZFxuICAgIHZhciBvcHRpb25zID0gcHJvcC5vcHRpb25zO1xuICAgIGlmICghaGFzT3duKG9wdGlvbnMsICdkZWZhdWx0JykpIHtcbiAgICAgIC8vIGFic2VudCBib29sZWFuIHZhbHVlIGRlZmF1bHRzIHRvIGZhbHNlXG4gICAgICByZXR1cm4gb3B0aW9ucy50eXBlID09PSBCb29sZWFuID8gZmFsc2UgOiB1bmRlZmluZWQ7XG4gICAgfVxuICAgIHZhciBkZWYgPSBvcHRpb25zWydkZWZhdWx0J107XG4gICAgLy8gd2FybiBhZ2FpbnN0IG5vbi1mYWN0b3J5IGRlZmF1bHRzIGZvciBPYmplY3QgJiBBcnJheVxuICAgIGlmIChpc09iamVjdChkZWYpKSB7XG4gICAgICAnZGV2ZWxvcG1lbnQnICE9PSAncHJvZHVjdGlvbicgJiYgd2FybignSW52YWxpZCBkZWZhdWx0IHZhbHVlIGZvciBwcm9wIFwiJyArIHByb3AubmFtZSArICdcIjogJyArICdQcm9wcyB3aXRoIHR5cGUgT2JqZWN0L0FycmF5IG11c3QgdXNlIGEgZmFjdG9yeSBmdW5jdGlvbiAnICsgJ3RvIHJldHVybiB0aGUgZGVmYXVsdCB2YWx1ZS4nLCB2bSk7XG4gICAgfVxuICAgIC8vIGNhbGwgZmFjdG9yeSBmdW5jdGlvbiBmb3Igbm9uLUZ1bmN0aW9uIHR5cGVzXG4gICAgcmV0dXJuIHR5cGVvZiBkZWYgPT09ICdmdW5jdGlvbicgJiYgb3B0aW9ucy50eXBlICE9PSBGdW5jdGlvbiA/IGRlZi5jYWxsKHZtKSA6IGRlZjtcbiAgfVxuXG4gIC8qKlxuICAgKiBBc3NlcnQgd2hldGhlciBhIHByb3AgaXMgdmFsaWQuXG4gICAqXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBwcm9wXG4gICAqIEBwYXJhbSB7Kn0gdmFsdWVcbiAgICogQHBhcmFtIHtWdWV9IHZtXG4gICAqL1xuXG4gIGZ1bmN0aW9uIGFzc2VydFByb3AocHJvcCwgdmFsdWUsIHZtKSB7XG4gICAgaWYgKCFwcm9wLm9wdGlvbnMucmVxdWlyZWQgJiYgKCAvLyBub24tcmVxdWlyZWRcbiAgICBwcm9wLnJhdyA9PT0gbnVsbCB8fCAvLyBhYnNjZW50XG4gICAgdmFsdWUgPT0gbnVsbCkgLy8gbnVsbCBvciB1bmRlZmluZWRcbiAgICApIHtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9XG4gICAgdmFyIG9wdGlvbnMgPSBwcm9wLm9wdGlvbnM7XG4gICAgdmFyIHR5cGUgPSBvcHRpb25zLnR5cGU7XG4gICAgdmFyIHZhbGlkID0gIXR5cGU7XG4gICAgdmFyIGV4cGVjdGVkVHlwZXMgPSBbXTtcbiAgICBpZiAodHlwZSkge1xuICAgICAgaWYgKCFpc0FycmF5KHR5cGUpKSB7XG4gICAgICAgIHR5cGUgPSBbdHlwZV07XG4gICAgICB9XG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHR5cGUubGVuZ3RoICYmICF2YWxpZDsgaSsrKSB7XG4gICAgICAgIHZhciBhc3NlcnRlZFR5cGUgPSBhc3NlcnRUeXBlKHZhbHVlLCB0eXBlW2ldKTtcbiAgICAgICAgZXhwZWN0ZWRUeXBlcy5wdXNoKGFzc2VydGVkVHlwZS5leHBlY3RlZFR5cGUpO1xuICAgICAgICB2YWxpZCA9IGFzc2VydGVkVHlwZS52YWxpZDtcbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKCF2YWxpZCkge1xuICAgICAgaWYgKCdkZXZlbG9wbWVudCcgIT09ICdwcm9kdWN0aW9uJykge1xuICAgICAgICB3YXJuKCdJbnZhbGlkIHByb3A6IHR5cGUgY2hlY2sgZmFpbGVkIGZvciBwcm9wIFwiJyArIHByb3AubmFtZSArICdcIi4nICsgJyBFeHBlY3RlZCAnICsgZXhwZWN0ZWRUeXBlcy5tYXAoZm9ybWF0VHlwZSkuam9pbignLCAnKSArICcsIGdvdCAnICsgZm9ybWF0VmFsdWUodmFsdWUpICsgJy4nLCB2bSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIHZhciB2YWxpZGF0b3IgPSBvcHRpb25zLnZhbGlkYXRvcjtcbiAgICBpZiAodmFsaWRhdG9yKSB7XG4gICAgICBpZiAoIXZhbGlkYXRvcih2YWx1ZSkpIHtcbiAgICAgICAgJ2RldmVsb3BtZW50JyAhPT0gJ3Byb2R1Y3Rpb24nICYmIHdhcm4oJ0ludmFsaWQgcHJvcDogY3VzdG9tIHZhbGlkYXRvciBjaGVjayBmYWlsZWQgZm9yIHByb3AgXCInICsgcHJvcC5uYW1lICsgJ1wiLicsIHZtKTtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBGb3JjZSBwYXJzaW5nIHZhbHVlIHdpdGggY29lcmNlIG9wdGlvbi5cbiAgICpcbiAgICogQHBhcmFtIHsqfSB2YWx1ZVxuICAgKiBAcGFyYW0ge09iamVjdH0gb3B0aW9uc1xuICAgKiBAcmV0dXJuIHsqfVxuICAgKi9cblxuICBmdW5jdGlvbiBjb2VyY2VQcm9wKHByb3AsIHZhbHVlKSB7XG4gICAgdmFyIGNvZXJjZSA9IHByb3Aub3B0aW9ucy5jb2VyY2U7XG4gICAgaWYgKCFjb2VyY2UpIHtcbiAgICAgIHJldHVybiB2YWx1ZTtcbiAgICB9XG4gICAgLy8gY29lcmNlIGlzIGEgZnVuY3Rpb25cbiAgICByZXR1cm4gY29lcmNlKHZhbHVlKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBc3NlcnQgdGhlIHR5cGUgb2YgYSB2YWx1ZVxuICAgKlxuICAgKiBAcGFyYW0geyp9IHZhbHVlXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IHR5cGVcbiAgICogQHJldHVybiB7T2JqZWN0fVxuICAgKi9cblxuICBmdW5jdGlvbiBhc3NlcnRUeXBlKHZhbHVlLCB0eXBlKSB7XG4gICAgdmFyIHZhbGlkO1xuICAgIHZhciBleHBlY3RlZFR5cGU7XG4gICAgaWYgKHR5cGUgPT09IFN0cmluZykge1xuICAgICAgZXhwZWN0ZWRUeXBlID0gJ3N0cmluZyc7XG4gICAgICB2YWxpZCA9IHR5cGVvZiB2YWx1ZSA9PT0gZXhwZWN0ZWRUeXBlO1xuICAgIH0gZWxzZSBpZiAodHlwZSA9PT0gTnVtYmVyKSB7XG4gICAgICBleHBlY3RlZFR5cGUgPSAnbnVtYmVyJztcbiAgICAgIHZhbGlkID0gdHlwZW9mIHZhbHVlID09PSBleHBlY3RlZFR5cGU7XG4gICAgfSBlbHNlIGlmICh0eXBlID09PSBCb29sZWFuKSB7XG4gICAgICBleHBlY3RlZFR5cGUgPSAnYm9vbGVhbic7XG4gICAgICB2YWxpZCA9IHR5cGVvZiB2YWx1ZSA9PT0gZXhwZWN0ZWRUeXBlO1xuICAgIH0gZWxzZSBpZiAodHlwZSA9PT0gRnVuY3Rpb24pIHtcbiAgICAgIGV4cGVjdGVkVHlwZSA9ICdmdW5jdGlvbic7XG4gICAgICB2YWxpZCA9IHR5cGVvZiB2YWx1ZSA9PT0gZXhwZWN0ZWRUeXBlO1xuICAgIH0gZWxzZSBpZiAodHlwZSA9PT0gT2JqZWN0KSB7XG4gICAgICBleHBlY3RlZFR5cGUgPSAnb2JqZWN0JztcbiAgICAgIHZhbGlkID0gaXNQbGFpbk9iamVjdCh2YWx1ZSk7XG4gICAgfSBlbHNlIGlmICh0eXBlID09PSBBcnJheSkge1xuICAgICAgZXhwZWN0ZWRUeXBlID0gJ2FycmF5JztcbiAgICAgIHZhbGlkID0gaXNBcnJheSh2YWx1ZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHZhbGlkID0gdmFsdWUgaW5zdGFuY2VvZiB0eXBlO1xuICAgIH1cbiAgICByZXR1cm4ge1xuICAgICAgdmFsaWQ6IHZhbGlkLFxuICAgICAgZXhwZWN0ZWRUeXBlOiBleHBlY3RlZFR5cGVcbiAgICB9O1xuICB9XG5cbiAgLyoqXG4gICAqIEZvcm1hdCB0eXBlIGZvciBvdXRwdXRcbiAgICpcbiAgICogQHBhcmFtIHtTdHJpbmd9IHR5cGVcbiAgICogQHJldHVybiB7U3RyaW5nfVxuICAgKi9cblxuICBmdW5jdGlvbiBmb3JtYXRUeXBlKHR5cGUpIHtcbiAgICByZXR1cm4gdHlwZSA/IHR5cGUuY2hhckF0KDApLnRvVXBwZXJDYXNlKCkgKyB0eXBlLnNsaWNlKDEpIDogJ2N1c3RvbSB0eXBlJztcbiAgfVxuXG4gIC8qKlxuICAgKiBGb3JtYXQgdmFsdWVcbiAgICpcbiAgICogQHBhcmFtIHsqfSB2YWx1ZVxuICAgKiBAcmV0dXJuIHtTdHJpbmd9XG4gICAqL1xuXG4gIGZ1bmN0aW9uIGZvcm1hdFZhbHVlKHZhbCkge1xuICAgIHJldHVybiBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwodmFsKS5zbGljZSg4LCAtMSk7XG4gIH1cblxuICB2YXIgYmluZGluZ01vZGVzID0gY29uZmlnLl9wcm9wQmluZGluZ01vZGVzO1xuXG4gIHZhciBwcm9wRGVmID0ge1xuXG4gICAgYmluZDogZnVuY3Rpb24gYmluZCgpIHtcbiAgICAgIHZhciBjaGlsZCA9IHRoaXMudm07XG4gICAgICB2YXIgcGFyZW50ID0gY2hpbGQuX2NvbnRleHQ7XG4gICAgICAvLyBwYXNzZWQgaW4gZnJvbSBjb21waWxlciBkaXJlY3RseVxuICAgICAgdmFyIHByb3AgPSB0aGlzLmRlc2NyaXB0b3IucHJvcDtcbiAgICAgIHZhciBjaGlsZEtleSA9IHByb3AucGF0aDtcbiAgICAgIHZhciBwYXJlbnRLZXkgPSBwcm9wLnBhcmVudFBhdGg7XG4gICAgICB2YXIgdHdvV2F5ID0gcHJvcC5tb2RlID09PSBiaW5kaW5nTW9kZXMuVFdPX1dBWTtcblxuICAgICAgdmFyIHBhcmVudFdhdGNoZXIgPSB0aGlzLnBhcmVudFdhdGNoZXIgPSBuZXcgV2F0Y2hlcihwYXJlbnQsIHBhcmVudEtleSwgZnVuY3Rpb24gKHZhbCkge1xuICAgICAgICB1cGRhdGVQcm9wKGNoaWxkLCBwcm9wLCB2YWwpO1xuICAgICAgfSwge1xuICAgICAgICB0d29XYXk6IHR3b1dheSxcbiAgICAgICAgZmlsdGVyczogcHJvcC5maWx0ZXJzLFxuICAgICAgICAvLyBpbXBvcnRhbnQ6IHByb3BzIG5lZWQgdG8gYmUgb2JzZXJ2ZWQgb24gdGhlXG4gICAgICAgIC8vIHYtZm9yIHNjb3BlIGlmIHByZXNlbnRcbiAgICAgICAgc2NvcGU6IHRoaXMuX3Njb3BlXG4gICAgICB9KTtcblxuICAgICAgLy8gc2V0IHRoZSBjaGlsZCBpbml0aWFsIHZhbHVlLlxuICAgICAgaW5pdFByb3AoY2hpbGQsIHByb3AsIHBhcmVudFdhdGNoZXIudmFsdWUpO1xuXG4gICAgICAvLyBzZXR1cCB0d28td2F5IGJpbmRpbmdcbiAgICAgIGlmICh0d29XYXkpIHtcbiAgICAgICAgLy8gaW1wb3J0YW50OiBkZWZlciB0aGUgY2hpbGQgd2F0Y2hlciBjcmVhdGlvbiB1bnRpbFxuICAgICAgICAvLyB0aGUgY3JlYXRlZCBob29rIChhZnRlciBkYXRhIG9ic2VydmF0aW9uKVxuICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgICAgIGNoaWxkLiRvbmNlKCdwcmUtaG9vazpjcmVhdGVkJywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgIHNlbGYuY2hpbGRXYXRjaGVyID0gbmV3IFdhdGNoZXIoY2hpbGQsIGNoaWxkS2V5LCBmdW5jdGlvbiAodmFsKSB7XG4gICAgICAgICAgICBwYXJlbnRXYXRjaGVyLnNldCh2YWwpO1xuICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgIC8vIGVuc3VyZSBzeW5jIHVwd2FyZCBiZWZvcmUgcGFyZW50IHN5bmMgZG93bi5cbiAgICAgICAgICAgIC8vIHRoaXMgaXMgbmVjZXNzYXJ5IGluIGNhc2VzIGUuZy4gdGhlIGNoaWxkXG4gICAgICAgICAgICAvLyBtdXRhdGVzIGEgcHJvcCBhcnJheSwgdGhlbiByZXBsYWNlcyBpdC4gKCMxNjgzKVxuICAgICAgICAgICAgc3luYzogdHJ1ZVxuICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9LFxuXG4gICAgdW5iaW5kOiBmdW5jdGlvbiB1bmJpbmQoKSB7XG4gICAgICB0aGlzLnBhcmVudFdhdGNoZXIudGVhcmRvd24oKTtcbiAgICAgIGlmICh0aGlzLmNoaWxkV2F0Y2hlcikge1xuICAgICAgICB0aGlzLmNoaWxkV2F0Y2hlci50ZWFyZG93bigpO1xuICAgICAgfVxuICAgIH1cbiAgfTtcblxuICB2YXIgcXVldWUkMSA9IFtdO1xuICB2YXIgcXVldWVkID0gZmFsc2U7XG5cbiAgLyoqXG4gICAqIFB1c2ggYSBqb2IgaW50byB0aGUgcXVldWUuXG4gICAqXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IGpvYlxuICAgKi9cblxuICBmdW5jdGlvbiBwdXNoSm9iKGpvYikge1xuICAgIHF1ZXVlJDEucHVzaChqb2IpO1xuICAgIGlmICghcXVldWVkKSB7XG4gICAgICBxdWV1ZWQgPSB0cnVlO1xuICAgICAgbmV4dFRpY2soZmx1c2gpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBGbHVzaCB0aGUgcXVldWUsIGFuZCBkbyBvbmUgZm9yY2VkIHJlZmxvdyBiZWZvcmVcbiAgICogdHJpZ2dlcmluZyB0cmFuc2l0aW9ucy5cbiAgICovXG5cbiAgZnVuY3Rpb24gZmx1c2goKSB7XG4gICAgLy8gRm9yY2UgbGF5b3V0XG4gICAgdmFyIGYgPSBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQub2Zmc2V0SGVpZ2h0O1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgcXVldWUkMS5sZW5ndGg7IGkrKykge1xuICAgICAgcXVldWUkMVtpXSgpO1xuICAgIH1cbiAgICBxdWV1ZSQxID0gW107XG4gICAgcXVldWVkID0gZmFsc2U7XG4gICAgLy8gZHVtbXkgcmV0dXJuLCBzbyBqcyBsaW50ZXJzIGRvbid0IGNvbXBsYWluIGFib3V0XG4gICAgLy8gdW51c2VkIHZhcmlhYmxlIGZcbiAgICByZXR1cm4gZjtcbiAgfVxuXG4gIHZhciBUWVBFX1RSQU5TSVRJT04gPSAndHJhbnNpdGlvbic7XG4gIHZhciBUWVBFX0FOSU1BVElPTiA9ICdhbmltYXRpb24nO1xuICB2YXIgdHJhbnNEdXJhdGlvblByb3AgPSB0cmFuc2l0aW9uUHJvcCArICdEdXJhdGlvbic7XG4gIHZhciBhbmltRHVyYXRpb25Qcm9wID0gYW5pbWF0aW9uUHJvcCArICdEdXJhdGlvbic7XG5cbiAgLyoqXG4gICAqIElmIGEganVzdC1lbnRlcmVkIGVsZW1lbnQgaXMgYXBwbGllZCB0aGVcbiAgICogbGVhdmUgY2xhc3Mgd2hpbGUgaXRzIGVudGVyIHRyYW5zaXRpb24gaGFzbid0IHN0YXJ0ZWQgeWV0LFxuICAgKiBhbmQgdGhlIHRyYW5zaXRpb25lZCBwcm9wZXJ0eSBoYXMgdGhlIHNhbWUgdmFsdWUgZm9yIGJvdGhcbiAgICogZW50ZXIvbGVhdmUsIHRoZW4gdGhlIGxlYXZlIHRyYW5zaXRpb24gd2lsbCBiZSBza2lwcGVkIGFuZFxuICAgKiB0aGUgdHJhbnNpdGlvbmVuZCBldmVudCBuZXZlciBmaXJlcy4gVGhpcyBmdW5jdGlvbiBlbnN1cmVzXG4gICAqIGl0cyBjYWxsYmFjayB0byBiZSBjYWxsZWQgYWZ0ZXIgYSB0cmFuc2l0aW9uIGhhcyBzdGFydGVkXG4gICAqIGJ5IHdhaXRpbmcgZm9yIGRvdWJsZSByYWYuXG4gICAqXG4gICAqIEl0IGZhbGxzIGJhY2sgdG8gc2V0VGltZW91dCBvbiBkZXZpY2VzIHRoYXQgc3VwcG9ydCBDU1NcbiAgICogdHJhbnNpdGlvbnMgYnV0IG5vdCByYWYgKGUuZy4gQW5kcm9pZCA0LjIgYnJvd3NlcikgLSBzaW5jZVxuICAgKiB0aGVzZSBlbnZpcm9ubWVudHMgYXJlIHVzdWFsbHkgc2xvdywgd2UgYXJlIGdpdmluZyBpdCBhXG4gICAqIHJlbGF0aXZlbHkgbGFyZ2UgdGltZW91dC5cbiAgICovXG5cbiAgdmFyIHJhZiA9IGluQnJvd3NlciAmJiB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lO1xuICB2YXIgd2FpdEZvclRyYW5zaXRpb25TdGFydCA9IHJhZlxuICAvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xuICA/IGZ1bmN0aW9uIChmbikge1xuICAgIHJhZihmdW5jdGlvbiAoKSB7XG4gICAgICByYWYoZm4pO1xuICAgIH0pO1xuICB9IDogZnVuY3Rpb24gKGZuKSB7XG4gICAgc2V0VGltZW91dChmbiwgNTApO1xuICB9O1xuXG4gIC8qKlxuICAgKiBBIFRyYW5zaXRpb24gb2JqZWN0IHRoYXQgZW5jYXBzdWxhdGVzIHRoZSBzdGF0ZSBhbmQgbG9naWNcbiAgICogb2YgdGhlIHRyYW5zaXRpb24uXG4gICAqXG4gICAqIEBwYXJhbSB7RWxlbWVudH0gZWxcbiAgICogQHBhcmFtIHtTdHJpbmd9IGlkXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBob29rc1xuICAgKiBAcGFyYW0ge1Z1ZX0gdm1cbiAgICovXG4gIGZ1bmN0aW9uIFRyYW5zaXRpb24oZWwsIGlkLCBob29rcywgdm0pIHtcbiAgICB0aGlzLmlkID0gaWQ7XG4gICAgdGhpcy5lbCA9IGVsO1xuICAgIHRoaXMuZW50ZXJDbGFzcyA9IGhvb2tzICYmIGhvb2tzLmVudGVyQ2xhc3MgfHwgaWQgKyAnLWVudGVyJztcbiAgICB0aGlzLmxlYXZlQ2xhc3MgPSBob29rcyAmJiBob29rcy5sZWF2ZUNsYXNzIHx8IGlkICsgJy1sZWF2ZSc7XG4gICAgdGhpcy5ob29rcyA9IGhvb2tzO1xuICAgIHRoaXMudm0gPSB2bTtcbiAgICAvLyBhc3luYyBzdGF0ZVxuICAgIHRoaXMucGVuZGluZ0Nzc0V2ZW50ID0gdGhpcy5wZW5kaW5nQ3NzQ2IgPSB0aGlzLmNhbmNlbCA9IHRoaXMucGVuZGluZ0pzQ2IgPSB0aGlzLm9wID0gdGhpcy5jYiA9IG51bGw7XG4gICAgdGhpcy5qdXN0RW50ZXJlZCA9IGZhbHNlO1xuICAgIHRoaXMuZW50ZXJlZCA9IHRoaXMubGVmdCA9IGZhbHNlO1xuICAgIHRoaXMudHlwZUNhY2hlID0ge307XG4gICAgLy8gY2hlY2sgY3NzIHRyYW5zaXRpb24gdHlwZVxuICAgIHRoaXMudHlwZSA9IGhvb2tzICYmIGhvb2tzLnR5cGU7XG4gICAgLyogaXN0YW5idWwgaWdub3JlIGlmICovXG4gICAgaWYgKCdkZXZlbG9wbWVudCcgIT09ICdwcm9kdWN0aW9uJykge1xuICAgICAgaWYgKHRoaXMudHlwZSAmJiB0aGlzLnR5cGUgIT09IFRZUEVfVFJBTlNJVElPTiAmJiB0aGlzLnR5cGUgIT09IFRZUEVfQU5JTUFUSU9OKSB7XG4gICAgICAgIHdhcm4oJ2ludmFsaWQgQ1NTIHRyYW5zaXRpb24gdHlwZSBmb3IgdHJhbnNpdGlvbj1cIicgKyB0aGlzLmlkICsgJ1wiOiAnICsgdGhpcy50eXBlLCB2bSk7XG4gICAgICB9XG4gICAgfVxuICAgIC8vIGJpbmRcbiAgICB2YXIgc2VsZiA9IHRoaXM7WydlbnRlck5leHRUaWNrJywgJ2VudGVyRG9uZScsICdsZWF2ZU5leHRUaWNrJywgJ2xlYXZlRG9uZSddLmZvckVhY2goZnVuY3Rpb24gKG0pIHtcbiAgICAgIHNlbGZbbV0gPSBiaW5kKHNlbGZbbV0sIHNlbGYpO1xuICAgIH0pO1xuICB9XG5cbiAgdmFyIHAkMSA9IFRyYW5zaXRpb24ucHJvdG90eXBlO1xuXG4gIC8qKlxuICAgKiBTdGFydCBhbiBlbnRlcmluZyB0cmFuc2l0aW9uLlxuICAgKlxuICAgKiAxLiBlbnRlciB0cmFuc2l0aW9uIHRyaWdnZXJlZFxuICAgKiAyLiBjYWxsIGJlZm9yZUVudGVyIGhvb2tcbiAgICogMy4gYWRkIGVudGVyIGNsYXNzXG4gICAqIDQuIGluc2VydC9zaG93IGVsZW1lbnRcbiAgICogNS4gY2FsbCBlbnRlciBob29rICh3aXRoIHBvc3NpYmxlIGV4cGxpY2l0IGpzIGNhbGxiYWNrKVxuICAgKiA2LiByZWZsb3dcbiAgICogNy4gYmFzZWQgb24gdHJhbnNpdGlvbiB0eXBlOlxuICAgKiAgICAtIHRyYW5zaXRpb246XG4gICAqICAgICAgICByZW1vdmUgY2xhc3Mgbm93LCB3YWl0IGZvciB0cmFuc2l0aW9uZW5kLFxuICAgKiAgICAgICAgdGhlbiBkb25lIGlmIHRoZXJlJ3Mgbm8gZXhwbGljaXQganMgY2FsbGJhY2suXG4gICAqICAgIC0gYW5pbWF0aW9uOlxuICAgKiAgICAgICAgd2FpdCBmb3IgYW5pbWF0aW9uZW5kLCByZW1vdmUgY2xhc3MsXG4gICAqICAgICAgICB0aGVuIGRvbmUgaWYgdGhlcmUncyBubyBleHBsaWNpdCBqcyBjYWxsYmFjay5cbiAgICogICAgLSBubyBjc3MgdHJhbnNpdGlvbjpcbiAgICogICAgICAgIGRvbmUgbm93IGlmIHRoZXJlJ3Mgbm8gZXhwbGljaXQganMgY2FsbGJhY2suXG4gICAqIDguIHdhaXQgZm9yIGVpdGhlciBkb25lIG9yIGpzIGNhbGxiYWNrLCB0aGVuIGNhbGxcbiAgICogICAgYWZ0ZXJFbnRlciBob29rLlxuICAgKlxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBvcCAtIGluc2VydC9zaG93IHRoZSBlbGVtZW50XG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IFtjYl1cbiAgICovXG5cbiAgcCQxLmVudGVyID0gZnVuY3Rpb24gKG9wLCBjYikge1xuICAgIHRoaXMuY2FuY2VsUGVuZGluZygpO1xuICAgIHRoaXMuY2FsbEhvb2soJ2JlZm9yZUVudGVyJyk7XG4gICAgdGhpcy5jYiA9IGNiO1xuICAgIGFkZENsYXNzKHRoaXMuZWwsIHRoaXMuZW50ZXJDbGFzcyk7XG4gICAgb3AoKTtcbiAgICB0aGlzLmVudGVyZWQgPSBmYWxzZTtcbiAgICB0aGlzLmNhbGxIb29rV2l0aENiKCdlbnRlcicpO1xuICAgIGlmICh0aGlzLmVudGVyZWQpIHtcbiAgICAgIHJldHVybjsgLy8gdXNlciBjYWxsZWQgZG9uZSBzeW5jaHJvbm91c2x5LlxuICAgIH1cbiAgICB0aGlzLmNhbmNlbCA9IHRoaXMuaG9va3MgJiYgdGhpcy5ob29rcy5lbnRlckNhbmNlbGxlZDtcbiAgICBwdXNoSm9iKHRoaXMuZW50ZXJOZXh0VGljayk7XG4gIH07XG5cbiAgLyoqXG4gICAqIFRoZSBcIm5leHRUaWNrXCIgcGhhc2Ugb2YgYW4gZW50ZXJpbmcgdHJhbnNpdGlvbiwgd2hpY2ggaXNcbiAgICogdG8gYmUgcHVzaGVkIGludG8gYSBxdWV1ZSBhbmQgZXhlY3V0ZWQgYWZ0ZXIgYSByZWZsb3cgc29cbiAgICogdGhhdCByZW1vdmluZyB0aGUgY2xhc3MgY2FuIHRyaWdnZXIgYSBDU1MgdHJhbnNpdGlvbi5cbiAgICovXG5cbiAgcCQxLmVudGVyTmV4dFRpY2sgPSBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIF90aGlzID0gdGhpcztcblxuICAgIC8vIHByZXZlbnQgdHJhbnNpdGlvbiBza2lwcGluZ1xuICAgIHRoaXMuanVzdEVudGVyZWQgPSB0cnVlO1xuICAgIHdhaXRGb3JUcmFuc2l0aW9uU3RhcnQoZnVuY3Rpb24gKCkge1xuICAgICAgX3RoaXMuanVzdEVudGVyZWQgPSBmYWxzZTtcbiAgICB9KTtcbiAgICB2YXIgZW50ZXJEb25lID0gdGhpcy5lbnRlckRvbmU7XG4gICAgdmFyIHR5cGUgPSB0aGlzLmdldENzc1RyYW5zaXRpb25UeXBlKHRoaXMuZW50ZXJDbGFzcyk7XG4gICAgaWYgKCF0aGlzLnBlbmRpbmdKc0NiKSB7XG4gICAgICBpZiAodHlwZSA9PT0gVFlQRV9UUkFOU0lUSU9OKSB7XG4gICAgICAgIC8vIHRyaWdnZXIgdHJhbnNpdGlvbiBieSByZW1vdmluZyBlbnRlciBjbGFzcyBub3dcbiAgICAgICAgcmVtb3ZlQ2xhc3ModGhpcy5lbCwgdGhpcy5lbnRlckNsYXNzKTtcbiAgICAgICAgdGhpcy5zZXR1cENzc0NiKHRyYW5zaXRpb25FbmRFdmVudCwgZW50ZXJEb25lKTtcbiAgICAgIH0gZWxzZSBpZiAodHlwZSA9PT0gVFlQRV9BTklNQVRJT04pIHtcbiAgICAgICAgdGhpcy5zZXR1cENzc0NiKGFuaW1hdGlvbkVuZEV2ZW50LCBlbnRlckRvbmUpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZW50ZXJEb25lKCk7XG4gICAgICB9XG4gICAgfSBlbHNlIGlmICh0eXBlID09PSBUWVBFX1RSQU5TSVRJT04pIHtcbiAgICAgIHJlbW92ZUNsYXNzKHRoaXMuZWwsIHRoaXMuZW50ZXJDbGFzcyk7XG4gICAgfVxuICB9O1xuXG4gIC8qKlxuICAgKiBUaGUgXCJjbGVhbnVwXCIgcGhhc2Ugb2YgYW4gZW50ZXJpbmcgdHJhbnNpdGlvbi5cbiAgICovXG5cbiAgcCQxLmVudGVyRG9uZSA9IGZ1bmN0aW9uICgpIHtcbiAgICB0aGlzLmVudGVyZWQgPSB0cnVlO1xuICAgIHRoaXMuY2FuY2VsID0gdGhpcy5wZW5kaW5nSnNDYiA9IG51bGw7XG4gICAgcmVtb3ZlQ2xhc3ModGhpcy5lbCwgdGhpcy5lbnRlckNsYXNzKTtcbiAgICB0aGlzLmNhbGxIb29rKCdhZnRlckVudGVyJyk7XG4gICAgaWYgKHRoaXMuY2IpIHRoaXMuY2IoKTtcbiAgfTtcblxuICAvKipcbiAgICogU3RhcnQgYSBsZWF2aW5nIHRyYW5zaXRpb24uXG4gICAqXG4gICAqIDEuIGxlYXZlIHRyYW5zaXRpb24gdHJpZ2dlcmVkLlxuICAgKiAyLiBjYWxsIGJlZm9yZUxlYXZlIGhvb2tcbiAgICogMy4gYWRkIGxlYXZlIGNsYXNzICh0cmlnZ2VyIGNzcyB0cmFuc2l0aW9uKVxuICAgKiA0LiBjYWxsIGxlYXZlIGhvb2sgKHdpdGggcG9zc2libGUgZXhwbGljaXQganMgY2FsbGJhY2spXG4gICAqIDUuIHJlZmxvdyBpZiBubyBleHBsaWNpdCBqcyBjYWxsYmFjayBpcyBwcm92aWRlZFxuICAgKiA2LiBiYXNlZCBvbiB0cmFuc2l0aW9uIHR5cGU6XG4gICAqICAgIC0gdHJhbnNpdGlvbiBvciBhbmltYXRpb246XG4gICAqICAgICAgICB3YWl0IGZvciBlbmQgZXZlbnQsIHJlbW92ZSBjbGFzcywgdGhlbiBkb25lIGlmXG4gICAqICAgICAgICB0aGVyZSdzIG5vIGV4cGxpY2l0IGpzIGNhbGxiYWNrLlxuICAgKiAgICAtIG5vIGNzcyB0cmFuc2l0aW9uOlxuICAgKiAgICAgICAgZG9uZSBpZiB0aGVyZSdzIG5vIGV4cGxpY2l0IGpzIGNhbGxiYWNrLlxuICAgKiA3LiB3YWl0IGZvciBlaXRoZXIgZG9uZSBvciBqcyBjYWxsYmFjaywgdGhlbiBjYWxsXG4gICAqICAgIGFmdGVyTGVhdmUgaG9vay5cbiAgICpcbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gb3AgLSByZW1vdmUvaGlkZSB0aGUgZWxlbWVudFxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBbY2JdXG4gICAqL1xuXG4gIHAkMS5sZWF2ZSA9IGZ1bmN0aW9uIChvcCwgY2IpIHtcbiAgICB0aGlzLmNhbmNlbFBlbmRpbmcoKTtcbiAgICB0aGlzLmNhbGxIb29rKCdiZWZvcmVMZWF2ZScpO1xuICAgIHRoaXMub3AgPSBvcDtcbiAgICB0aGlzLmNiID0gY2I7XG4gICAgYWRkQ2xhc3ModGhpcy5lbCwgdGhpcy5sZWF2ZUNsYXNzKTtcbiAgICB0aGlzLmxlZnQgPSBmYWxzZTtcbiAgICB0aGlzLmNhbGxIb29rV2l0aENiKCdsZWF2ZScpO1xuICAgIGlmICh0aGlzLmxlZnQpIHtcbiAgICAgIHJldHVybjsgLy8gdXNlciBjYWxsZWQgZG9uZSBzeW5jaHJvbm91c2x5LlxuICAgIH1cbiAgICB0aGlzLmNhbmNlbCA9IHRoaXMuaG9va3MgJiYgdGhpcy5ob29rcy5sZWF2ZUNhbmNlbGxlZDtcbiAgICAvLyBvbmx5IG5lZWQgdG8gaGFuZGxlIGxlYXZlRG9uZSBpZlxuICAgIC8vIDEuIHRoZSB0cmFuc2l0aW9uIGlzIGFscmVhZHkgZG9uZSAoc3luY2hyb25vdXNseSBjYWxsZWRcbiAgICAvLyAgICBieSB0aGUgdXNlciwgd2hpY2ggY2F1c2VzIHRoaXMub3Agc2V0IHRvIG51bGwpXG4gICAgLy8gMi4gdGhlcmUncyBubyBleHBsaWNpdCBqcyBjYWxsYmFja1xuICAgIGlmICh0aGlzLm9wICYmICF0aGlzLnBlbmRpbmdKc0NiKSB7XG4gICAgICAvLyBpZiBhIENTUyB0cmFuc2l0aW9uIGxlYXZlcyBpbW1lZGlhdGVseSBhZnRlciBlbnRlcixcbiAgICAgIC8vIHRoZSB0cmFuc2l0aW9uZW5kIGV2ZW50IG5ldmVyIGZpcmVzLiB0aGVyZWZvcmUgd2VcbiAgICAgIC8vIGRldGVjdCBzdWNoIGNhc2VzIGFuZCBlbmQgdGhlIGxlYXZlIGltbWVkaWF0ZWx5LlxuICAgICAgaWYgKHRoaXMuanVzdEVudGVyZWQpIHtcbiAgICAgICAgdGhpcy5sZWF2ZURvbmUoKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHB1c2hKb2IodGhpcy5sZWF2ZU5leHRUaWNrKTtcbiAgICAgIH1cbiAgICB9XG4gIH07XG5cbiAgLyoqXG4gICAqIFRoZSBcIm5leHRUaWNrXCIgcGhhc2Ugb2YgYSBsZWF2aW5nIHRyYW5zaXRpb24uXG4gICAqL1xuXG4gIHAkMS5sZWF2ZU5leHRUaWNrID0gZnVuY3Rpb24gKCkge1xuICAgIHZhciB0eXBlID0gdGhpcy5nZXRDc3NUcmFuc2l0aW9uVHlwZSh0aGlzLmxlYXZlQ2xhc3MpO1xuICAgIGlmICh0eXBlKSB7XG4gICAgICB2YXIgZXZlbnQgPSB0eXBlID09PSBUWVBFX1RSQU5TSVRJT04gPyB0cmFuc2l0aW9uRW5kRXZlbnQgOiBhbmltYXRpb25FbmRFdmVudDtcbiAgICAgIHRoaXMuc2V0dXBDc3NDYihldmVudCwgdGhpcy5sZWF2ZURvbmUpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmxlYXZlRG9uZSgpO1xuICAgIH1cbiAgfTtcblxuICAvKipcbiAgICogVGhlIFwiY2xlYW51cFwiIHBoYXNlIG9mIGEgbGVhdmluZyB0cmFuc2l0aW9uLlxuICAgKi9cblxuICBwJDEubGVhdmVEb25lID0gZnVuY3Rpb24gKCkge1xuICAgIHRoaXMubGVmdCA9IHRydWU7XG4gICAgdGhpcy5jYW5jZWwgPSB0aGlzLnBlbmRpbmdKc0NiID0gbnVsbDtcbiAgICB0aGlzLm9wKCk7XG4gICAgcmVtb3ZlQ2xhc3ModGhpcy5lbCwgdGhpcy5sZWF2ZUNsYXNzKTtcbiAgICB0aGlzLmNhbGxIb29rKCdhZnRlckxlYXZlJyk7XG4gICAgaWYgKHRoaXMuY2IpIHRoaXMuY2IoKTtcbiAgICB0aGlzLm9wID0gbnVsbDtcbiAgfTtcblxuICAvKipcbiAgICogQ2FuY2VsIGFueSBwZW5kaW5nIGNhbGxiYWNrcyBmcm9tIGEgcHJldmlvdXNseSBydW5uaW5nXG4gICAqIGJ1dCBub3QgZmluaXNoZWQgdHJhbnNpdGlvbi5cbiAgICovXG5cbiAgcCQxLmNhbmNlbFBlbmRpbmcgPSBmdW5jdGlvbiAoKSB7XG4gICAgdGhpcy5vcCA9IHRoaXMuY2IgPSBudWxsO1xuICAgIHZhciBoYXNQZW5kaW5nID0gZmFsc2U7XG4gICAgaWYgKHRoaXMucGVuZGluZ0Nzc0NiKSB7XG4gICAgICBoYXNQZW5kaW5nID0gdHJ1ZTtcbiAgICAgIG9mZih0aGlzLmVsLCB0aGlzLnBlbmRpbmdDc3NFdmVudCwgdGhpcy5wZW5kaW5nQ3NzQ2IpO1xuICAgICAgdGhpcy5wZW5kaW5nQ3NzRXZlbnQgPSB0aGlzLnBlbmRpbmdDc3NDYiA9IG51bGw7XG4gICAgfVxuICAgIGlmICh0aGlzLnBlbmRpbmdKc0NiKSB7XG4gICAgICBoYXNQZW5kaW5nID0gdHJ1ZTtcbiAgICAgIHRoaXMucGVuZGluZ0pzQ2IuY2FuY2VsKCk7XG4gICAgICB0aGlzLnBlbmRpbmdKc0NiID0gbnVsbDtcbiAgICB9XG4gICAgaWYgKGhhc1BlbmRpbmcpIHtcbiAgICAgIHJlbW92ZUNsYXNzKHRoaXMuZWwsIHRoaXMuZW50ZXJDbGFzcyk7XG4gICAgICByZW1vdmVDbGFzcyh0aGlzLmVsLCB0aGlzLmxlYXZlQ2xhc3MpO1xuICAgIH1cbiAgICBpZiAodGhpcy5jYW5jZWwpIHtcbiAgICAgIHRoaXMuY2FuY2VsLmNhbGwodGhpcy52bSwgdGhpcy5lbCk7XG4gICAgICB0aGlzLmNhbmNlbCA9IG51bGw7XG4gICAgfVxuICB9O1xuXG4gIC8qKlxuICAgKiBDYWxsIGEgdXNlci1wcm92aWRlZCBzeW5jaHJvbm91cyBob29rIGZ1bmN0aW9uLlxuICAgKlxuICAgKiBAcGFyYW0ge1N0cmluZ30gdHlwZVxuICAgKi9cblxuICBwJDEuY2FsbEhvb2sgPSBmdW5jdGlvbiAodHlwZSkge1xuICAgIGlmICh0aGlzLmhvb2tzICYmIHRoaXMuaG9va3NbdHlwZV0pIHtcbiAgICAgIHRoaXMuaG9va3NbdHlwZV0uY2FsbCh0aGlzLnZtLCB0aGlzLmVsKTtcbiAgICB9XG4gIH07XG5cbiAgLyoqXG4gICAqIENhbGwgYSB1c2VyLXByb3ZpZGVkLCBwb3RlbnRpYWxseS1hc3luYyBob29rIGZ1bmN0aW9uLlxuICAgKiBXZSBjaGVjayBmb3IgdGhlIGxlbmd0aCBvZiBhcmd1bWVudHMgdG8gc2VlIGlmIHRoZSBob29rXG4gICAqIGV4cGVjdHMgYSBgZG9uZWAgY2FsbGJhY2suIElmIHRydWUsIHRoZSB0cmFuc2l0aW9uJ3MgZW5kXG4gICAqIHdpbGwgYmUgZGV0ZXJtaW5lZCBieSB3aGVuIHRoZSB1c2VyIGNhbGxzIHRoYXQgY2FsbGJhY2s7XG4gICAqIG90aGVyd2lzZSwgdGhlIGVuZCBpcyBkZXRlcm1pbmVkIGJ5IHRoZSBDU1MgdHJhbnNpdGlvbiBvclxuICAgKiBhbmltYXRpb24uXG4gICAqXG4gICAqIEBwYXJhbSB7U3RyaW5nfSB0eXBlXG4gICAqL1xuXG4gIHAkMS5jYWxsSG9va1dpdGhDYiA9IGZ1bmN0aW9uICh0eXBlKSB7XG4gICAgdmFyIGhvb2sgPSB0aGlzLmhvb2tzICYmIHRoaXMuaG9va3NbdHlwZV07XG4gICAgaWYgKGhvb2spIHtcbiAgICAgIGlmIChob29rLmxlbmd0aCA+IDEpIHtcbiAgICAgICAgdGhpcy5wZW5kaW5nSnNDYiA9IGNhbmNlbGxhYmxlKHRoaXNbdHlwZSArICdEb25lJ10pO1xuICAgICAgfVxuICAgICAgaG9vay5jYWxsKHRoaXMudm0sIHRoaXMuZWwsIHRoaXMucGVuZGluZ0pzQ2IpO1xuICAgIH1cbiAgfTtcblxuICAvKipcbiAgICogR2V0IGFuIGVsZW1lbnQncyB0cmFuc2l0aW9uIHR5cGUgYmFzZWQgb24gdGhlXG4gICAqIGNhbGN1bGF0ZWQgc3R5bGVzLlxuICAgKlxuICAgKiBAcGFyYW0ge1N0cmluZ30gY2xhc3NOYW1lXG4gICAqIEByZXR1cm4ge051bWJlcn1cbiAgICovXG5cbiAgcCQxLmdldENzc1RyYW5zaXRpb25UeXBlID0gZnVuY3Rpb24gKGNsYXNzTmFtZSkge1xuICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBpZiAqL1xuICAgIGlmICghdHJhbnNpdGlvbkVuZEV2ZW50IHx8XG4gICAgLy8gc2tpcCBDU1MgdHJhbnNpdGlvbnMgaWYgcGFnZSBpcyBub3QgdmlzaWJsZSAtXG4gICAgLy8gdGhpcyBzb2x2ZXMgdGhlIGlzc3VlIG9mIHRyYW5zaXRpb25lbmQgZXZlbnRzIG5vdFxuICAgIC8vIGZpcmluZyB1bnRpbCB0aGUgcGFnZSBpcyB2aXNpYmxlIGFnYWluLlxuICAgIC8vIHBhZ2VWaXNpYmlsaXR5IEFQSSBpcyBzdXBwb3J0ZWQgaW4gSUUxMCssIHNhbWUgYXNcbiAgICAvLyBDU1MgdHJhbnNpdGlvbnMuXG4gICAgZG9jdW1lbnQuaGlkZGVuIHx8XG4gICAgLy8gZXhwbGljaXQganMtb25seSB0cmFuc2l0aW9uXG4gICAgdGhpcy5ob29rcyAmJiB0aGlzLmhvb2tzLmNzcyA9PT0gZmFsc2UgfHxcbiAgICAvLyBlbGVtZW50IGlzIGhpZGRlblxuICAgIGlzSGlkZGVuKHRoaXMuZWwpKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHZhciB0eXBlID0gdGhpcy50eXBlIHx8IHRoaXMudHlwZUNhY2hlW2NsYXNzTmFtZV07XG4gICAgaWYgKHR5cGUpIHJldHVybiB0eXBlO1xuICAgIHZhciBpbmxpbmVTdHlsZXMgPSB0aGlzLmVsLnN0eWxlO1xuICAgIHZhciBjb21wdXRlZFN0eWxlcyA9IHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKHRoaXMuZWwpO1xuICAgIHZhciB0cmFuc0R1cmF0aW9uID0gaW5saW5lU3R5bGVzW3RyYW5zRHVyYXRpb25Qcm9wXSB8fCBjb21wdXRlZFN0eWxlc1t0cmFuc0R1cmF0aW9uUHJvcF07XG4gICAgaWYgKHRyYW5zRHVyYXRpb24gJiYgdHJhbnNEdXJhdGlvbiAhPT0gJzBzJykge1xuICAgICAgdHlwZSA9IFRZUEVfVFJBTlNJVElPTjtcbiAgICB9IGVsc2Uge1xuICAgICAgdmFyIGFuaW1EdXJhdGlvbiA9IGlubGluZVN0eWxlc1thbmltRHVyYXRpb25Qcm9wXSB8fCBjb21wdXRlZFN0eWxlc1thbmltRHVyYXRpb25Qcm9wXTtcbiAgICAgIGlmIChhbmltRHVyYXRpb24gJiYgYW5pbUR1cmF0aW9uICE9PSAnMHMnKSB7XG4gICAgICAgIHR5cGUgPSBUWVBFX0FOSU1BVElPTjtcbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKHR5cGUpIHtcbiAgICAgIHRoaXMudHlwZUNhY2hlW2NsYXNzTmFtZV0gPSB0eXBlO1xuICAgIH1cbiAgICByZXR1cm4gdHlwZTtcbiAgfTtcblxuICAvKipcbiAgICogU2V0dXAgYSBDU1MgdHJhbnNpdGlvbmVuZC9hbmltYXRpb25lbmQgY2FsbGJhY2suXG4gICAqXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBldmVudFxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBjYlxuICAgKi9cblxuICBwJDEuc2V0dXBDc3NDYiA9IGZ1bmN0aW9uIChldmVudCwgY2IpIHtcbiAgICB0aGlzLnBlbmRpbmdDc3NFdmVudCA9IGV2ZW50O1xuICAgIHZhciBzZWxmID0gdGhpcztcbiAgICB2YXIgZWwgPSB0aGlzLmVsO1xuICAgIHZhciBvbkVuZCA9IHRoaXMucGVuZGluZ0Nzc0NiID0gZnVuY3Rpb24gKGUpIHtcbiAgICAgIGlmIChlLnRhcmdldCA9PT0gZWwpIHtcbiAgICAgICAgb2ZmKGVsLCBldmVudCwgb25FbmQpO1xuICAgICAgICBzZWxmLnBlbmRpbmdDc3NFdmVudCA9IHNlbGYucGVuZGluZ0Nzc0NiID0gbnVsbDtcbiAgICAgICAgaWYgKCFzZWxmLnBlbmRpbmdKc0NiICYmIGNiKSB7XG4gICAgICAgICAgY2IoKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH07XG4gICAgb24oZWwsIGV2ZW50LCBvbkVuZCk7XG4gIH07XG5cbiAgLyoqXG4gICAqIENoZWNrIGlmIGFuIGVsZW1lbnQgaXMgaGlkZGVuIC0gaW4gdGhhdCBjYXNlIHdlIGNhbiBqdXN0XG4gICAqIHNraXAgdGhlIHRyYW5zaXRpb24gYWxsdG9nZXRoZXIuXG4gICAqXG4gICAqIEBwYXJhbSB7RWxlbWVudH0gZWxcbiAgICogQHJldHVybiB7Qm9vbGVhbn1cbiAgICovXG5cbiAgZnVuY3Rpb24gaXNIaWRkZW4oZWwpIHtcbiAgICBpZiAoL3N2ZyQvLnRlc3QoZWwubmFtZXNwYWNlVVJJKSkge1xuICAgICAgLy8gU1ZHIGVsZW1lbnRzIGRvIG5vdCBoYXZlIG9mZnNldChXaWR0aHxIZWlnaHQpXG4gICAgICAvLyBzbyB3ZSBuZWVkIHRvIGNoZWNrIHRoZSBjbGllbnQgcmVjdFxuICAgICAgdmFyIHJlY3QgPSBlbC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICAgIHJldHVybiAhKHJlY3Qud2lkdGggfHwgcmVjdC5oZWlnaHQpO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gIShlbC5vZmZzZXRXaWR0aCB8fCBlbC5vZmZzZXRIZWlnaHQgfHwgZWwuZ2V0Q2xpZW50UmVjdHMoKS5sZW5ndGgpO1xuICAgIH1cbiAgfVxuXG4gIHZhciB0cmFuc2l0aW9uJDEgPSB7XG5cbiAgICBwcmlvcml0eTogVFJBTlNJVElPTixcblxuICAgIHVwZGF0ZTogZnVuY3Rpb24gdXBkYXRlKGlkLCBvbGRJZCkge1xuICAgICAgdmFyIGVsID0gdGhpcy5lbDtcbiAgICAgIC8vIHJlc29sdmUgb24gb3duZXIgdm1cbiAgICAgIHZhciBob29rcyA9IHJlc29sdmVBc3NldCh0aGlzLnZtLiRvcHRpb25zLCAndHJhbnNpdGlvbnMnLCBpZCk7XG4gICAgICBpZCA9IGlkIHx8ICd2JztcbiAgICAgIGVsLl9fdl90cmFucyA9IG5ldyBUcmFuc2l0aW9uKGVsLCBpZCwgaG9va3MsIHRoaXMudm0pO1xuICAgICAgaWYgKG9sZElkKSB7XG4gICAgICAgIHJlbW92ZUNsYXNzKGVsLCBvbGRJZCArICctdHJhbnNpdGlvbicpO1xuICAgICAgfVxuICAgICAgYWRkQ2xhc3MoZWwsIGlkICsgJy10cmFuc2l0aW9uJyk7XG4gICAgfVxuICB9O1xuXG4gIHZhciBpbnRlcm5hbERpcmVjdGl2ZXMgPSB7XG4gICAgc3R5bGU6IHN0eWxlLFxuICAgICdjbGFzcyc6IHZDbGFzcyxcbiAgICBjb21wb25lbnQ6IGNvbXBvbmVudCxcbiAgICBwcm9wOiBwcm9wRGVmLFxuICAgIHRyYW5zaXRpb246IHRyYW5zaXRpb24kMVxuICB9O1xuXG4gIC8vIHNwZWNpYWwgYmluZGluZyBwcmVmaXhlc1xuICB2YXIgYmluZFJFID0gL152LWJpbmQ6fF46LztcbiAgdmFyIG9uUkUgPSAvXnYtb246fF5ALztcbiAgdmFyIGRpckF0dHJSRSA9IC9edi0oW146XSspKD86JHw6KC4qKSQpLztcbiAgdmFyIG1vZGlmaWVyUkUgPSAvXFwuW15cXC5dKy9nO1xuICB2YXIgdHJhbnNpdGlvblJFID0gL14odi1iaW5kOnw6KT90cmFuc2l0aW9uJC87XG5cbiAgLy8gZGVmYXVsdCBkaXJlY3RpdmUgcHJpb3JpdHlcbiAgdmFyIERFRkFVTFRfUFJJT1JJVFkgPSAxMDAwO1xuICB2YXIgREVGQVVMVF9URVJNSU5BTF9QUklPUklUWSA9IDIwMDA7XG5cbiAgLyoqXG4gICAqIENvbXBpbGUgYSB0ZW1wbGF0ZSBhbmQgcmV0dXJuIGEgcmV1c2FibGUgY29tcG9zaXRlIGxpbmtcbiAgICogZnVuY3Rpb24sIHdoaWNoIHJlY3Vyc2l2ZWx5IGNvbnRhaW5zIG1vcmUgbGluayBmdW5jdGlvbnNcbiAgICogaW5zaWRlLiBUaGlzIHRvcCBsZXZlbCBjb21waWxlIGZ1bmN0aW9uIHdvdWxkIG5vcm1hbGx5XG4gICAqIGJlIGNhbGxlZCBvbiBpbnN0YW5jZSByb290IG5vZGVzLCBidXQgY2FuIGFsc28gYmUgdXNlZFxuICAgKiBmb3IgcGFydGlhbCBjb21waWxhdGlvbiBpZiB0aGUgcGFydGlhbCBhcmd1bWVudCBpcyB0cnVlLlxuICAgKlxuICAgKiBUaGUgcmV0dXJuZWQgY29tcG9zaXRlIGxpbmsgZnVuY3Rpb24sIHdoZW4gY2FsbGVkLCB3aWxsXG4gICAqIHJldHVybiBhbiB1bmxpbmsgZnVuY3Rpb24gdGhhdCB0ZWFyc2Rvd24gYWxsIGRpcmVjdGl2ZXNcbiAgICogY3JlYXRlZCBkdXJpbmcgdGhlIGxpbmtpbmcgcGhhc2UuXG4gICAqXG4gICAqIEBwYXJhbSB7RWxlbWVudHxEb2N1bWVudEZyYWdtZW50fSBlbFxuICAgKiBAcGFyYW0ge09iamVjdH0gb3B0aW9uc1xuICAgKiBAcGFyYW0ge0Jvb2xlYW59IHBhcnRpYWxcbiAgICogQHJldHVybiB7RnVuY3Rpb259XG4gICAqL1xuXG4gIGZ1bmN0aW9uIGNvbXBpbGUoZWwsIG9wdGlvbnMsIHBhcnRpYWwpIHtcbiAgICAvLyBsaW5rIGZ1bmN0aW9uIGZvciB0aGUgbm9kZSBpdHNlbGYuXG4gICAgdmFyIG5vZGVMaW5rRm4gPSBwYXJ0aWFsIHx8ICFvcHRpb25zLl9hc0NvbXBvbmVudCA/IGNvbXBpbGVOb2RlKGVsLCBvcHRpb25zKSA6IG51bGw7XG4gICAgLy8gbGluayBmdW5jdGlvbiBmb3IgdGhlIGNoaWxkTm9kZXNcbiAgICB2YXIgY2hpbGRMaW5rRm4gPSAhKG5vZGVMaW5rRm4gJiYgbm9kZUxpbmtGbi50ZXJtaW5hbCkgJiYgIWlzU2NyaXB0KGVsKSAmJiBlbC5oYXNDaGlsZE5vZGVzKCkgPyBjb21waWxlTm9kZUxpc3QoZWwuY2hpbGROb2Rlcywgb3B0aW9ucykgOiBudWxsO1xuXG4gICAgLyoqXG4gICAgICogQSBjb21wb3NpdGUgbGlua2VyIGZ1bmN0aW9uIHRvIGJlIGNhbGxlZCBvbiBhIGFscmVhZHlcbiAgICAgKiBjb21waWxlZCBwaWVjZSBvZiBET00sIHdoaWNoIGluc3RhbnRpYXRlcyBhbGwgZGlyZWN0aXZlXG4gICAgICogaW5zdGFuY2VzLlxuICAgICAqXG4gICAgICogQHBhcmFtIHtWdWV9IHZtXG4gICAgICogQHBhcmFtIHtFbGVtZW50fERvY3VtZW50RnJhZ21lbnR9IGVsXG4gICAgICogQHBhcmFtIHtWdWV9IFtob3N0XSAtIGhvc3Qgdm0gb2YgdHJhbnNjbHVkZWQgY29udGVudFxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBbc2NvcGVdIC0gdi1mb3Igc2NvcGVcbiAgICAgKiBAcGFyYW0ge0ZyYWdtZW50fSBbZnJhZ10gLSBsaW5rIGNvbnRleHQgZnJhZ21lbnRcbiAgICAgKiBAcmV0dXJuIHtGdW5jdGlvbnx1bmRlZmluZWR9XG4gICAgICovXG5cbiAgICByZXR1cm4gZnVuY3Rpb24gY29tcG9zaXRlTGlua0ZuKHZtLCBlbCwgaG9zdCwgc2NvcGUsIGZyYWcpIHtcbiAgICAgIC8vIGNhY2hlIGNoaWxkTm9kZXMgYmVmb3JlIGxpbmtpbmcgcGFyZW50LCBmaXggIzY1N1xuICAgICAgdmFyIGNoaWxkTm9kZXMgPSB0b0FycmF5KGVsLmNoaWxkTm9kZXMpO1xuICAgICAgLy8gbGlua1xuICAgICAgdmFyIGRpcnMgPSBsaW5rQW5kQ2FwdHVyZShmdW5jdGlvbiBjb21wb3NpdGVMaW5rQ2FwdHVyZXIoKSB7XG4gICAgICAgIGlmIChub2RlTGlua0ZuKSBub2RlTGlua0ZuKHZtLCBlbCwgaG9zdCwgc2NvcGUsIGZyYWcpO1xuICAgICAgICBpZiAoY2hpbGRMaW5rRm4pIGNoaWxkTGlua0ZuKHZtLCBjaGlsZE5vZGVzLCBob3N0LCBzY29wZSwgZnJhZyk7XG4gICAgICB9LCB2bSk7XG4gICAgICByZXR1cm4gbWFrZVVubGlua0ZuKHZtLCBkaXJzKTtcbiAgICB9O1xuICB9XG5cbiAgLyoqXG4gICAqIEFwcGx5IGEgbGlua2VyIHRvIGEgdm0vZWxlbWVudCBwYWlyIGFuZCBjYXB0dXJlIHRoZVxuICAgKiBkaXJlY3RpdmVzIGNyZWF0ZWQgZHVyaW5nIHRoZSBwcm9jZXNzLlxuICAgKlxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBsaW5rZXJcbiAgICogQHBhcmFtIHtWdWV9IHZtXG4gICAqL1xuXG4gIGZ1bmN0aW9uIGxpbmtBbmRDYXB0dXJlKGxpbmtlciwgdm0pIHtcbiAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgaWYgKi9cbiAgICBpZiAoJ2RldmVsb3BtZW50JyA9PT0gJ3Byb2R1Y3Rpb24nKSB7fVxuICAgIHZhciBvcmlnaW5hbERpckNvdW50ID0gdm0uX2RpcmVjdGl2ZXMubGVuZ3RoO1xuICAgIGxpbmtlcigpO1xuICAgIHZhciBkaXJzID0gdm0uX2RpcmVjdGl2ZXMuc2xpY2Uob3JpZ2luYWxEaXJDb3VudCk7XG4gICAgZGlycy5zb3J0KGRpcmVjdGl2ZUNvbXBhcmF0b3IpO1xuICAgIGZvciAodmFyIGkgPSAwLCBsID0gZGlycy5sZW5ndGg7IGkgPCBsOyBpKyspIHtcbiAgICAgIGRpcnNbaV0uX2JpbmQoKTtcbiAgICB9XG4gICAgcmV0dXJuIGRpcnM7XG4gIH1cblxuICAvKipcbiAgICogRGlyZWN0aXZlIHByaW9yaXR5IHNvcnQgY29tcGFyYXRvclxuICAgKlxuICAgKiBAcGFyYW0ge09iamVjdH0gYVxuICAgKiBAcGFyYW0ge09iamVjdH0gYlxuICAgKi9cblxuICBmdW5jdGlvbiBkaXJlY3RpdmVDb21wYXJhdG9yKGEsIGIpIHtcbiAgICBhID0gYS5kZXNjcmlwdG9yLmRlZi5wcmlvcml0eSB8fCBERUZBVUxUX1BSSU9SSVRZO1xuICAgIGIgPSBiLmRlc2NyaXB0b3IuZGVmLnByaW9yaXR5IHx8IERFRkFVTFRfUFJJT1JJVFk7XG4gICAgcmV0dXJuIGEgPiBiID8gLTEgOiBhID09PSBiID8gMCA6IDE7XG4gIH1cblxuICAvKipcbiAgICogTGlua2VyIGZ1bmN0aW9ucyByZXR1cm4gYW4gdW5saW5rIGZ1bmN0aW9uIHRoYXRcbiAgICogdGVhcnNkb3duIGFsbCBkaXJlY3RpdmVzIGluc3RhbmNlcyBnZW5lcmF0ZWQgZHVyaW5nXG4gICAqIHRoZSBwcm9jZXNzLlxuICAgKlxuICAgKiBXZSBjcmVhdGUgdW5saW5rIGZ1bmN0aW9ucyB3aXRoIG9ubHkgdGhlIG5lY2Vzc2FyeVxuICAgKiBpbmZvcm1hdGlvbiB0byBhdm9pZCByZXRhaW5pbmcgYWRkaXRpb25hbCBjbG9zdXJlcy5cbiAgICpcbiAgICogQHBhcmFtIHtWdWV9IHZtXG4gICAqIEBwYXJhbSB7QXJyYXl9IGRpcnNcbiAgICogQHBhcmFtIHtWdWV9IFtjb250ZXh0XVxuICAgKiBAcGFyYW0ge0FycmF5fSBbY29udGV4dERpcnNdXG4gICAqIEByZXR1cm4ge0Z1bmN0aW9ufVxuICAgKi9cblxuICBmdW5jdGlvbiBtYWtlVW5saW5rRm4odm0sIGRpcnMsIGNvbnRleHQsIGNvbnRleHREaXJzKSB7XG4gICAgZnVuY3Rpb24gdW5saW5rKGRlc3Ryb3lpbmcpIHtcbiAgICAgIHRlYXJkb3duRGlycyh2bSwgZGlycywgZGVzdHJveWluZyk7XG4gICAgICBpZiAoY29udGV4dCAmJiBjb250ZXh0RGlycykge1xuICAgICAgICB0ZWFyZG93bkRpcnMoY29udGV4dCwgY29udGV4dERpcnMpO1xuICAgICAgfVxuICAgIH1cbiAgICAvLyBleHBvc2UgbGlua2VkIGRpcmVjdGl2ZXNcbiAgICB1bmxpbmsuZGlycyA9IGRpcnM7XG4gICAgcmV0dXJuIHVubGluaztcbiAgfVxuXG4gIC8qKlxuICAgKiBUZWFyZG93biBwYXJ0aWFsIGxpbmtlZCBkaXJlY3RpdmVzLlxuICAgKlxuICAgKiBAcGFyYW0ge1Z1ZX0gdm1cbiAgICogQHBhcmFtIHtBcnJheX0gZGlyc1xuICAgKiBAcGFyYW0ge0Jvb2xlYW59IGRlc3Ryb3lpbmdcbiAgICovXG5cbiAgZnVuY3Rpb24gdGVhcmRvd25EaXJzKHZtLCBkaXJzLCBkZXN0cm95aW5nKSB7XG4gICAgdmFyIGkgPSBkaXJzLmxlbmd0aDtcbiAgICB3aGlsZSAoaS0tKSB7XG4gICAgICBkaXJzW2ldLl90ZWFyZG93bigpO1xuICAgICAgaWYgKCdkZXZlbG9wbWVudCcgIT09ICdwcm9kdWN0aW9uJyAmJiAhZGVzdHJveWluZykge1xuICAgICAgICB2bS5fZGlyZWN0aXZlcy4kcmVtb3ZlKGRpcnNbaV0pO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBDb21waWxlIGxpbmsgcHJvcHMgb24gYW4gaW5zdGFuY2UuXG4gICAqXG4gICAqIEBwYXJhbSB7VnVlfSB2bVxuICAgKiBAcGFyYW0ge0VsZW1lbnR9IGVsXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBwcm9wc1xuICAgKiBAcGFyYW0ge09iamVjdH0gW3Njb3BlXVxuICAgKiBAcmV0dXJuIHtGdW5jdGlvbn1cbiAgICovXG5cbiAgZnVuY3Rpb24gY29tcGlsZUFuZExpbmtQcm9wcyh2bSwgZWwsIHByb3BzLCBzY29wZSkge1xuICAgIHZhciBwcm9wc0xpbmtGbiA9IGNvbXBpbGVQcm9wcyhlbCwgcHJvcHMsIHZtKTtcbiAgICB2YXIgcHJvcERpcnMgPSBsaW5rQW5kQ2FwdHVyZShmdW5jdGlvbiAoKSB7XG4gICAgICBwcm9wc0xpbmtGbih2bSwgc2NvcGUpO1xuICAgIH0sIHZtKTtcbiAgICByZXR1cm4gbWFrZVVubGlua0ZuKHZtLCBwcm9wRGlycyk7XG4gIH1cblxuICAvKipcbiAgICogQ29tcGlsZSB0aGUgcm9vdCBlbGVtZW50IG9mIGFuIGluc3RhbmNlLlxuICAgKlxuICAgKiAxLiBhdHRycyBvbiBjb250ZXh0IGNvbnRhaW5lciAoY29udGV4dCBzY29wZSlcbiAgICogMi4gYXR0cnMgb24gdGhlIGNvbXBvbmVudCB0ZW1wbGF0ZSByb290IG5vZGUsIGlmXG4gICAqICAgIHJlcGxhY2U6dHJ1ZSAoY2hpbGQgc2NvcGUpXG4gICAqXG4gICAqIElmIHRoaXMgaXMgYSBmcmFnbWVudCBpbnN0YW5jZSwgd2Ugb25seSBuZWVkIHRvIGNvbXBpbGUgMS5cbiAgICpcbiAgICogQHBhcmFtIHtFbGVtZW50fSBlbFxuICAgKiBAcGFyYW0ge09iamVjdH0gb3B0aW9uc1xuICAgKiBAcGFyYW0ge09iamVjdH0gY29udGV4dE9wdGlvbnNcbiAgICogQHJldHVybiB7RnVuY3Rpb259XG4gICAqL1xuXG4gIGZ1bmN0aW9uIGNvbXBpbGVSb290KGVsLCBvcHRpb25zLCBjb250ZXh0T3B0aW9ucykge1xuICAgIHZhciBjb250YWluZXJBdHRycyA9IG9wdGlvbnMuX2NvbnRhaW5lckF0dHJzO1xuICAgIHZhciByZXBsYWNlckF0dHJzID0gb3B0aW9ucy5fcmVwbGFjZXJBdHRycztcbiAgICB2YXIgY29udGV4dExpbmtGbiwgcmVwbGFjZXJMaW5rRm47XG5cbiAgICAvLyBvbmx5IG5lZWQgdG8gY29tcGlsZSBvdGhlciBhdHRyaWJ1dGVzIGZvclxuICAgIC8vIG5vbi1mcmFnbWVudCBpbnN0YW5jZXNcbiAgICBpZiAoZWwubm9kZVR5cGUgIT09IDExKSB7XG4gICAgICAvLyBmb3IgY29tcG9uZW50cywgY29udGFpbmVyIGFuZCByZXBsYWNlciBuZWVkIHRvIGJlXG4gICAgICAvLyBjb21waWxlZCBzZXBhcmF0ZWx5IGFuZCBsaW5rZWQgaW4gZGlmZmVyZW50IHNjb3Blcy5cbiAgICAgIGlmIChvcHRpb25zLl9hc0NvbXBvbmVudCkge1xuICAgICAgICAvLyAyLiBjb250YWluZXIgYXR0cmlidXRlc1xuICAgICAgICBpZiAoY29udGFpbmVyQXR0cnMgJiYgY29udGV4dE9wdGlvbnMpIHtcbiAgICAgICAgICBjb250ZXh0TGlua0ZuID0gY29tcGlsZURpcmVjdGl2ZXMoY29udGFpbmVyQXR0cnMsIGNvbnRleHRPcHRpb25zKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAocmVwbGFjZXJBdHRycykge1xuICAgICAgICAgIC8vIDMuIHJlcGxhY2VyIGF0dHJpYnV0ZXNcbiAgICAgICAgICByZXBsYWNlckxpbmtGbiA9IGNvbXBpbGVEaXJlY3RpdmVzKHJlcGxhY2VyQXR0cnMsIG9wdGlvbnMpO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvLyBub24tY29tcG9uZW50LCBqdXN0IGNvbXBpbGUgYXMgYSBub3JtYWwgZWxlbWVudC5cbiAgICAgICAgcmVwbGFjZXJMaW5rRm4gPSBjb21waWxlRGlyZWN0aXZlcyhlbC5hdHRyaWJ1dGVzLCBvcHRpb25zKTtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKCdkZXZlbG9wbWVudCcgIT09ICdwcm9kdWN0aW9uJyAmJiBjb250YWluZXJBdHRycykge1xuICAgICAgLy8gd2FybiBjb250YWluZXIgZGlyZWN0aXZlcyBmb3IgZnJhZ21lbnQgaW5zdGFuY2VzXG4gICAgICB2YXIgbmFtZXMgPSBjb250YWluZXJBdHRycy5maWx0ZXIoZnVuY3Rpb24gKGF0dHIpIHtcbiAgICAgICAgLy8gYWxsb3cgdnVlLWxvYWRlci92dWVpZnkgc2NvcGVkIGNzcyBhdHRyaWJ1dGVzXG4gICAgICAgIHJldHVybiBhdHRyLm5hbWUuaW5kZXhPZignX3YtJykgPCAwICYmXG4gICAgICAgIC8vIGFsbG93IGV2ZW50IGxpc3RlbmVyc1xuICAgICAgICAhb25SRS50ZXN0KGF0dHIubmFtZSkgJiZcbiAgICAgICAgLy8gYWxsb3cgc2xvdHNcbiAgICAgICAgYXR0ci5uYW1lICE9PSAnc2xvdCc7XG4gICAgICB9KS5tYXAoZnVuY3Rpb24gKGF0dHIpIHtcbiAgICAgICAgcmV0dXJuICdcIicgKyBhdHRyLm5hbWUgKyAnXCInO1xuICAgICAgfSk7XG4gICAgICBpZiAobmFtZXMubGVuZ3RoKSB7XG4gICAgICAgIHZhciBwbHVyYWwgPSBuYW1lcy5sZW5ndGggPiAxO1xuICAgICAgICB3YXJuKCdBdHRyaWJ1dGUnICsgKHBsdXJhbCA/ICdzICcgOiAnICcpICsgbmFtZXMuam9pbignLCAnKSArIChwbHVyYWwgPyAnIGFyZScgOiAnIGlzJykgKyAnIGlnbm9yZWQgb24gY29tcG9uZW50ICcgKyAnPCcgKyBvcHRpb25zLmVsLnRhZ05hbWUudG9Mb3dlckNhc2UoKSArICc+IGJlY2F1c2UgJyArICd0aGUgY29tcG9uZW50IGlzIGEgZnJhZ21lbnQgaW5zdGFuY2U6ICcgKyAnaHR0cDovL3Z1ZWpzLm9yZy9ndWlkZS9jb21wb25lbnRzLmh0bWwjRnJhZ21lbnQtSW5zdGFuY2UnKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBvcHRpb25zLl9jb250YWluZXJBdHRycyA9IG9wdGlvbnMuX3JlcGxhY2VyQXR0cnMgPSBudWxsO1xuICAgIHJldHVybiBmdW5jdGlvbiByb290TGlua0ZuKHZtLCBlbCwgc2NvcGUpIHtcbiAgICAgIC8vIGxpbmsgY29udGV4dCBzY29wZSBkaXJzXG4gICAgICB2YXIgY29udGV4dCA9IHZtLl9jb250ZXh0O1xuICAgICAgdmFyIGNvbnRleHREaXJzO1xuICAgICAgaWYgKGNvbnRleHQgJiYgY29udGV4dExpbmtGbikge1xuICAgICAgICBjb250ZXh0RGlycyA9IGxpbmtBbmRDYXB0dXJlKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICBjb250ZXh0TGlua0ZuKGNvbnRleHQsIGVsLCBudWxsLCBzY29wZSk7XG4gICAgICAgIH0sIGNvbnRleHQpO1xuICAgICAgfVxuXG4gICAgICAvLyBsaW5rIHNlbGZcbiAgICAgIHZhciBzZWxmRGlycyA9IGxpbmtBbmRDYXB0dXJlKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKHJlcGxhY2VyTGlua0ZuKSByZXBsYWNlckxpbmtGbih2bSwgZWwpO1xuICAgICAgfSwgdm0pO1xuXG4gICAgICAvLyByZXR1cm4gdGhlIHVubGluayBmdW5jdGlvbiB0aGF0IHRlYXJzZG93biBjb250ZXh0XG4gICAgICAvLyBjb250YWluZXIgZGlyZWN0aXZlcy5cbiAgICAgIHJldHVybiBtYWtlVW5saW5rRm4odm0sIHNlbGZEaXJzLCBjb250ZXh0LCBjb250ZXh0RGlycyk7XG4gICAgfTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDb21waWxlIGEgbm9kZSBhbmQgcmV0dXJuIGEgbm9kZUxpbmtGbiBiYXNlZCBvbiB0aGVcbiAgICogbm9kZSB0eXBlLlxuICAgKlxuICAgKiBAcGFyYW0ge05vZGV9IG5vZGVcbiAgICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnNcbiAgICogQHJldHVybiB7RnVuY3Rpb258bnVsbH1cbiAgICovXG5cbiAgZnVuY3Rpb24gY29tcGlsZU5vZGUobm9kZSwgb3B0aW9ucykge1xuICAgIHZhciB0eXBlID0gbm9kZS5ub2RlVHlwZTtcbiAgICBpZiAodHlwZSA9PT0gMSAmJiAhaXNTY3JpcHQobm9kZSkpIHtcbiAgICAgIHJldHVybiBjb21waWxlRWxlbWVudChub2RlLCBvcHRpb25zKTtcbiAgICB9IGVsc2UgaWYgKHR5cGUgPT09IDMgJiYgbm9kZS5kYXRhLnRyaW0oKSkge1xuICAgICAgcmV0dXJuIGNvbXBpbGVUZXh0Tm9kZShub2RlLCBvcHRpb25zKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIENvbXBpbGUgYW4gZWxlbWVudCBhbmQgcmV0dXJuIGEgbm9kZUxpbmtGbi5cbiAgICpcbiAgICogQHBhcmFtIHtFbGVtZW50fSBlbFxuICAgKiBAcGFyYW0ge09iamVjdH0gb3B0aW9uc1xuICAgKiBAcmV0dXJuIHtGdW5jdGlvbnxudWxsfVxuICAgKi9cblxuICBmdW5jdGlvbiBjb21waWxlRWxlbWVudChlbCwgb3B0aW9ucykge1xuICAgIC8vIHByZXByb2Nlc3MgdGV4dGFyZWFzLlxuICAgIC8vIHRleHRhcmVhIHRyZWF0cyBpdHMgdGV4dCBjb250ZW50IGFzIHRoZSBpbml0aWFsIHZhbHVlLlxuICAgIC8vIGp1c3QgYmluZCBpdCBhcyBhbiBhdHRyIGRpcmVjdGl2ZSBmb3IgdmFsdWUuXG4gICAgaWYgKGVsLnRhZ05hbWUgPT09ICdURVhUQVJFQScpIHtcbiAgICAgIHZhciB0b2tlbnMgPSBwYXJzZVRleHQoZWwudmFsdWUpO1xuICAgICAgaWYgKHRva2Vucykge1xuICAgICAgICBlbC5zZXRBdHRyaWJ1dGUoJzp2YWx1ZScsIHRva2Vuc1RvRXhwKHRva2VucykpO1xuICAgICAgICBlbC52YWx1ZSA9ICcnO1xuICAgICAgfVxuICAgIH1cbiAgICB2YXIgbGlua0ZuO1xuICAgIHZhciBoYXNBdHRycyA9IGVsLmhhc0F0dHJpYnV0ZXMoKTtcbiAgICB2YXIgYXR0cnMgPSBoYXNBdHRycyAmJiB0b0FycmF5KGVsLmF0dHJpYnV0ZXMpO1xuICAgIC8vIGNoZWNrIHRlcm1pbmFsIGRpcmVjdGl2ZXMgKGZvciAmIGlmKVxuICAgIGlmIChoYXNBdHRycykge1xuICAgICAgbGlua0ZuID0gY2hlY2tUZXJtaW5hbERpcmVjdGl2ZXMoZWwsIGF0dHJzLCBvcHRpb25zKTtcbiAgICB9XG4gICAgLy8gY2hlY2sgZWxlbWVudCBkaXJlY3RpdmVzXG4gICAgaWYgKCFsaW5rRm4pIHtcbiAgICAgIGxpbmtGbiA9IGNoZWNrRWxlbWVudERpcmVjdGl2ZXMoZWwsIG9wdGlvbnMpO1xuICAgIH1cbiAgICAvLyBjaGVjayBjb21wb25lbnRcbiAgICBpZiAoIWxpbmtGbikge1xuICAgICAgbGlua0ZuID0gY2hlY2tDb21wb25lbnQoZWwsIG9wdGlvbnMpO1xuICAgIH1cbiAgICAvLyBub3JtYWwgZGlyZWN0aXZlc1xuICAgIGlmICghbGlua0ZuICYmIGhhc0F0dHJzKSB7XG4gICAgICBsaW5rRm4gPSBjb21waWxlRGlyZWN0aXZlcyhhdHRycywgb3B0aW9ucyk7XG4gICAgfVxuICAgIHJldHVybiBsaW5rRm47XG4gIH1cblxuICAvKipcbiAgICogQ29tcGlsZSBhIHRleHROb2RlIGFuZCByZXR1cm4gYSBub2RlTGlua0ZuLlxuICAgKlxuICAgKiBAcGFyYW0ge1RleHROb2RlfSBub2RlXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zXG4gICAqIEByZXR1cm4ge0Z1bmN0aW9ufG51bGx9IHRleHROb2RlTGlua0ZuXG4gICAqL1xuXG4gIGZ1bmN0aW9uIGNvbXBpbGVUZXh0Tm9kZShub2RlLCBvcHRpb25zKSB7XG4gICAgLy8gc2tpcCBtYXJrZWQgdGV4dCBub2Rlc1xuICAgIGlmIChub2RlLl9za2lwKSB7XG4gICAgICByZXR1cm4gcmVtb3ZlVGV4dDtcbiAgICB9XG5cbiAgICB2YXIgdG9rZW5zID0gcGFyc2VUZXh0KG5vZGUud2hvbGVUZXh0KTtcbiAgICBpZiAoIXRva2Vucykge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgLy8gbWFyayBhZGphY2VudCB0ZXh0IG5vZGVzIGFzIHNraXBwZWQsXG4gICAgLy8gYmVjYXVzZSB3ZSBhcmUgdXNpbmcgbm9kZS53aG9sZVRleHQgdG8gY29tcGlsZVxuICAgIC8vIGFsbCBhZGphY2VudCB0ZXh0IG5vZGVzIHRvZ2V0aGVyLiBUaGlzIGZpeGVzXG4gICAgLy8gaXNzdWVzIGluIElFIHdoZXJlIHNvbWV0aW1lcyBpdCBzcGxpdHMgdXAgYSBzaW5nbGVcbiAgICAvLyB0ZXh0IG5vZGUgaW50byBtdWx0aXBsZSBvbmVzLlxuICAgIHZhciBuZXh0ID0gbm9kZS5uZXh0U2libGluZztcbiAgICB3aGlsZSAobmV4dCAmJiBuZXh0Lm5vZGVUeXBlID09PSAzKSB7XG4gICAgICBuZXh0Ll9za2lwID0gdHJ1ZTtcbiAgICAgIG5leHQgPSBuZXh0Lm5leHRTaWJsaW5nO1xuICAgIH1cblxuICAgIHZhciBmcmFnID0gZG9jdW1lbnQuY3JlYXRlRG9jdW1lbnRGcmFnbWVudCgpO1xuICAgIHZhciBlbCwgdG9rZW47XG4gICAgZm9yICh2YXIgaSA9IDAsIGwgPSB0b2tlbnMubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG4gICAgICB0b2tlbiA9IHRva2Vuc1tpXTtcbiAgICAgIGVsID0gdG9rZW4udGFnID8gcHJvY2Vzc1RleHRUb2tlbih0b2tlbiwgb3B0aW9ucykgOiBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZSh0b2tlbi52YWx1ZSk7XG4gICAgICBmcmFnLmFwcGVuZENoaWxkKGVsKTtcbiAgICB9XG4gICAgcmV0dXJuIG1ha2VUZXh0Tm9kZUxpbmtGbih0b2tlbnMsIGZyYWcsIG9wdGlvbnMpO1xuICB9XG5cbiAgLyoqXG4gICAqIExpbmtlciBmb3IgYW4gc2tpcHBlZCB0ZXh0IG5vZGUuXG4gICAqXG4gICAqIEBwYXJhbSB7VnVlfSB2bVxuICAgKiBAcGFyYW0ge1RleHR9IG5vZGVcbiAgICovXG5cbiAgZnVuY3Rpb24gcmVtb3ZlVGV4dCh2bSwgbm9kZSkge1xuICAgIHJlbW92ZShub2RlKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBQcm9jZXNzIGEgc2luZ2xlIHRleHQgdG9rZW4uXG4gICAqXG4gICAqIEBwYXJhbSB7T2JqZWN0fSB0b2tlblxuICAgKiBAcGFyYW0ge09iamVjdH0gb3B0aW9uc1xuICAgKiBAcmV0dXJuIHtOb2RlfVxuICAgKi9cblxuICBmdW5jdGlvbiBwcm9jZXNzVGV4dFRva2VuKHRva2VuLCBvcHRpb25zKSB7XG4gICAgdmFyIGVsO1xuICAgIGlmICh0b2tlbi5vbmVUaW1lKSB7XG4gICAgICBlbCA9IGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKHRva2VuLnZhbHVlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKHRva2VuLmh0bWwpIHtcbiAgICAgICAgZWwgPSBkb2N1bWVudC5jcmVhdGVDb21tZW50KCd2LWh0bWwnKTtcbiAgICAgICAgc2V0VG9rZW5UeXBlKCdodG1sJyk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvLyBJRSB3aWxsIGNsZWFuIHVwIGVtcHR5IHRleHROb2RlcyBkdXJpbmdcbiAgICAgICAgLy8gZnJhZy5jbG9uZU5vZGUodHJ1ZSksIHNvIHdlIGhhdmUgdG8gZ2l2ZSBpdFxuICAgICAgICAvLyBzb21ldGhpbmcgaGVyZS4uLlxuICAgICAgICBlbCA9IGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKCcgJyk7XG4gICAgICAgIHNldFRva2VuVHlwZSgndGV4dCcpO1xuICAgICAgfVxuICAgIH1cbiAgICBmdW5jdGlvbiBzZXRUb2tlblR5cGUodHlwZSkge1xuICAgICAgaWYgKHRva2VuLmRlc2NyaXB0b3IpIHJldHVybjtcbiAgICAgIHZhciBwYXJzZWQgPSBwYXJzZURpcmVjdGl2ZSh0b2tlbi52YWx1ZSk7XG4gICAgICB0b2tlbi5kZXNjcmlwdG9yID0ge1xuICAgICAgICBuYW1lOiB0eXBlLFxuICAgICAgICBkZWY6IGRpcmVjdGl2ZXNbdHlwZV0sXG4gICAgICAgIGV4cHJlc3Npb246IHBhcnNlZC5leHByZXNzaW9uLFxuICAgICAgICBmaWx0ZXJzOiBwYXJzZWQuZmlsdGVyc1xuICAgICAgfTtcbiAgICB9XG4gICAgcmV0dXJuIGVsO1xuICB9XG5cbiAgLyoqXG4gICAqIEJ1aWxkIGEgZnVuY3Rpb24gdGhhdCBwcm9jZXNzZXMgYSB0ZXh0Tm9kZS5cbiAgICpcbiAgICogQHBhcmFtIHtBcnJheTxPYmplY3Q+fSB0b2tlbnNcbiAgICogQHBhcmFtIHtEb2N1bWVudEZyYWdtZW50fSBmcmFnXG4gICAqL1xuXG4gIGZ1bmN0aW9uIG1ha2VUZXh0Tm9kZUxpbmtGbih0b2tlbnMsIGZyYWcpIHtcbiAgICByZXR1cm4gZnVuY3Rpb24gdGV4dE5vZGVMaW5rRm4odm0sIGVsLCBob3N0LCBzY29wZSkge1xuICAgICAgdmFyIGZyYWdDbG9uZSA9IGZyYWcuY2xvbmVOb2RlKHRydWUpO1xuICAgICAgdmFyIGNoaWxkTm9kZXMgPSB0b0FycmF5KGZyYWdDbG9uZS5jaGlsZE5vZGVzKTtcbiAgICAgIHZhciB0b2tlbiwgdmFsdWUsIG5vZGU7XG4gICAgICBmb3IgKHZhciBpID0gMCwgbCA9IHRva2Vucy5sZW5ndGg7IGkgPCBsOyBpKyspIHtcbiAgICAgICAgdG9rZW4gPSB0b2tlbnNbaV07XG4gICAgICAgIHZhbHVlID0gdG9rZW4udmFsdWU7XG4gICAgICAgIGlmICh0b2tlbi50YWcpIHtcbiAgICAgICAgICBub2RlID0gY2hpbGROb2Rlc1tpXTtcbiAgICAgICAgICBpZiAodG9rZW4ub25lVGltZSkge1xuICAgICAgICAgICAgdmFsdWUgPSAoc2NvcGUgfHwgdm0pLiRldmFsKHZhbHVlKTtcbiAgICAgICAgICAgIGlmICh0b2tlbi5odG1sKSB7XG4gICAgICAgICAgICAgIHJlcGxhY2Uobm9kZSwgcGFyc2VUZW1wbGF0ZSh2YWx1ZSwgdHJ1ZSkpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgbm9kZS5kYXRhID0gdmFsdWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHZtLl9iaW5kRGlyKHRva2VuLmRlc2NyaXB0b3IsIG5vZGUsIGhvc3QsIHNjb3BlKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJlcGxhY2UoZWwsIGZyYWdDbG9uZSk7XG4gICAgfTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDb21waWxlIGEgbm9kZSBsaXN0IGFuZCByZXR1cm4gYSBjaGlsZExpbmtGbi5cbiAgICpcbiAgICogQHBhcmFtIHtOb2RlTGlzdH0gbm9kZUxpc3RcbiAgICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnNcbiAgICogQHJldHVybiB7RnVuY3Rpb258dW5kZWZpbmVkfVxuICAgKi9cblxuICBmdW5jdGlvbiBjb21waWxlTm9kZUxpc3Qobm9kZUxpc3QsIG9wdGlvbnMpIHtcbiAgICB2YXIgbGlua0ZucyA9IFtdO1xuICAgIHZhciBub2RlTGlua0ZuLCBjaGlsZExpbmtGbiwgbm9kZTtcbiAgICBmb3IgKHZhciBpID0gMCwgbCA9IG5vZGVMaXN0Lmxlbmd0aDsgaSA8IGw7IGkrKykge1xuICAgICAgbm9kZSA9IG5vZGVMaXN0W2ldO1xuICAgICAgbm9kZUxpbmtGbiA9IGNvbXBpbGVOb2RlKG5vZGUsIG9wdGlvbnMpO1xuICAgICAgY2hpbGRMaW5rRm4gPSAhKG5vZGVMaW5rRm4gJiYgbm9kZUxpbmtGbi50ZXJtaW5hbCkgJiYgbm9kZS50YWdOYW1lICE9PSAnU0NSSVBUJyAmJiBub2RlLmhhc0NoaWxkTm9kZXMoKSA/IGNvbXBpbGVOb2RlTGlzdChub2RlLmNoaWxkTm9kZXMsIG9wdGlvbnMpIDogbnVsbDtcbiAgICAgIGxpbmtGbnMucHVzaChub2RlTGlua0ZuLCBjaGlsZExpbmtGbik7XG4gICAgfVxuICAgIHJldHVybiBsaW5rRm5zLmxlbmd0aCA/IG1ha2VDaGlsZExpbmtGbihsaW5rRm5zKSA6IG51bGw7XG4gIH1cblxuICAvKipcbiAgICogTWFrZSBhIGNoaWxkIGxpbmsgZnVuY3Rpb24gZm9yIGEgbm9kZSdzIGNoaWxkTm9kZXMuXG4gICAqXG4gICAqIEBwYXJhbSB7QXJyYXk8RnVuY3Rpb24+fSBsaW5rRm5zXG4gICAqIEByZXR1cm4ge0Z1bmN0aW9ufSBjaGlsZExpbmtGblxuICAgKi9cblxuICBmdW5jdGlvbiBtYWtlQ2hpbGRMaW5rRm4obGlua0Zucykge1xuICAgIHJldHVybiBmdW5jdGlvbiBjaGlsZExpbmtGbih2bSwgbm9kZXMsIGhvc3QsIHNjb3BlLCBmcmFnKSB7XG4gICAgICB2YXIgbm9kZSwgbm9kZUxpbmtGbiwgY2hpbGRyZW5MaW5rRm47XG4gICAgICBmb3IgKHZhciBpID0gMCwgbiA9IDAsIGwgPSBsaW5rRm5zLmxlbmd0aDsgaSA8IGw7IG4rKykge1xuICAgICAgICBub2RlID0gbm9kZXNbbl07XG4gICAgICAgIG5vZGVMaW5rRm4gPSBsaW5rRm5zW2krK107XG4gICAgICAgIGNoaWxkcmVuTGlua0ZuID0gbGlua0Zuc1tpKytdO1xuICAgICAgICAvLyBjYWNoZSBjaGlsZE5vZGVzIGJlZm9yZSBsaW5raW5nIHBhcmVudCwgZml4ICM2NTdcbiAgICAgICAgdmFyIGNoaWxkTm9kZXMgPSB0b0FycmF5KG5vZGUuY2hpbGROb2Rlcyk7XG4gICAgICAgIGlmIChub2RlTGlua0ZuKSB7XG4gICAgICAgICAgbm9kZUxpbmtGbih2bSwgbm9kZSwgaG9zdCwgc2NvcGUsIGZyYWcpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChjaGlsZHJlbkxpbmtGbikge1xuICAgICAgICAgIGNoaWxkcmVuTGlua0ZuKHZtLCBjaGlsZE5vZGVzLCBob3N0LCBzY29wZSwgZnJhZyk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9O1xuICB9XG5cbiAgLyoqXG4gICAqIENoZWNrIGZvciBlbGVtZW50IGRpcmVjdGl2ZXMgKGN1c3RvbSBlbGVtZW50cyB0aGF0IHNob3VsZFxuICAgKiBiZSByZXNvdmxlZCBhcyB0ZXJtaW5hbCBkaXJlY3RpdmVzKS5cbiAgICpcbiAgICogQHBhcmFtIHtFbGVtZW50fSBlbFxuICAgKiBAcGFyYW0ge09iamVjdH0gb3B0aW9uc1xuICAgKi9cblxuICBmdW5jdGlvbiBjaGVja0VsZW1lbnREaXJlY3RpdmVzKGVsLCBvcHRpb25zKSB7XG4gICAgdmFyIHRhZyA9IGVsLnRhZ05hbWUudG9Mb3dlckNhc2UoKTtcbiAgICBpZiAoY29tbW9uVGFnUkUudGVzdCh0YWcpKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHZhciBkZWYgPSByZXNvbHZlQXNzZXQob3B0aW9ucywgJ2VsZW1lbnREaXJlY3RpdmVzJywgdGFnKTtcbiAgICBpZiAoZGVmKSB7XG4gICAgICByZXR1cm4gbWFrZVRlcm1pbmFsTm9kZUxpbmtGbihlbCwgdGFnLCAnJywgb3B0aW9ucywgZGVmKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQ2hlY2sgaWYgYW4gZWxlbWVudCBpcyBhIGNvbXBvbmVudC4gSWYgeWVzLCByZXR1cm5cbiAgICogYSBjb21wb25lbnQgbGluayBmdW5jdGlvbi5cbiAgICpcbiAgICogQHBhcmFtIHtFbGVtZW50fSBlbFxuICAgKiBAcGFyYW0ge09iamVjdH0gb3B0aW9uc1xuICAgKiBAcmV0dXJuIHtGdW5jdGlvbnx1bmRlZmluZWR9XG4gICAqL1xuXG4gIGZ1bmN0aW9uIGNoZWNrQ29tcG9uZW50KGVsLCBvcHRpb25zKSB7XG4gICAgdmFyIGNvbXBvbmVudCA9IGNoZWNrQ29tcG9uZW50QXR0cihlbCwgb3B0aW9ucyk7XG4gICAgaWYgKGNvbXBvbmVudCkge1xuICAgICAgdmFyIHJlZiA9IGZpbmRSZWYoZWwpO1xuICAgICAgdmFyIGRlc2NyaXB0b3IgPSB7XG4gICAgICAgIG5hbWU6ICdjb21wb25lbnQnLFxuICAgICAgICByZWY6IHJlZixcbiAgICAgICAgZXhwcmVzc2lvbjogY29tcG9uZW50LmlkLFxuICAgICAgICBkZWY6IGludGVybmFsRGlyZWN0aXZlcy5jb21wb25lbnQsXG4gICAgICAgIG1vZGlmaWVyczoge1xuICAgICAgICAgIGxpdGVyYWw6ICFjb21wb25lbnQuZHluYW1pY1xuICAgICAgICB9XG4gICAgICB9O1xuICAgICAgdmFyIGNvbXBvbmVudExpbmtGbiA9IGZ1bmN0aW9uIGNvbXBvbmVudExpbmtGbih2bSwgZWwsIGhvc3QsIHNjb3BlLCBmcmFnKSB7XG4gICAgICAgIGlmIChyZWYpIHtcbiAgICAgICAgICBkZWZpbmVSZWFjdGl2ZSgoc2NvcGUgfHwgdm0pLiRyZWZzLCByZWYsIG51bGwpO1xuICAgICAgICB9XG4gICAgICAgIHZtLl9iaW5kRGlyKGRlc2NyaXB0b3IsIGVsLCBob3N0LCBzY29wZSwgZnJhZyk7XG4gICAgICB9O1xuICAgICAgY29tcG9uZW50TGlua0ZuLnRlcm1pbmFsID0gdHJ1ZTtcbiAgICAgIHJldHVybiBjb21wb25lbnRMaW5rRm47XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIENoZWNrIGFuIGVsZW1lbnQgZm9yIHRlcm1pbmFsIGRpcmVjdGl2ZXMgaW4gZml4ZWQgb3JkZXIuXG4gICAqIElmIGl0IGZpbmRzIG9uZSwgcmV0dXJuIGEgdGVybWluYWwgbGluayBmdW5jdGlvbi5cbiAgICpcbiAgICogQHBhcmFtIHtFbGVtZW50fSBlbFxuICAgKiBAcGFyYW0ge0FycmF5fSBhdHRyc1xuICAgKiBAcGFyYW0ge09iamVjdH0gb3B0aW9uc1xuICAgKiBAcmV0dXJuIHtGdW5jdGlvbn0gdGVybWluYWxMaW5rRm5cbiAgICovXG5cbiAgZnVuY3Rpb24gY2hlY2tUZXJtaW5hbERpcmVjdGl2ZXMoZWwsIGF0dHJzLCBvcHRpb25zKSB7XG4gICAgLy8gc2tpcCB2LXByZVxuICAgIGlmIChnZXRBdHRyKGVsLCAndi1wcmUnKSAhPT0gbnVsbCkge1xuICAgICAgcmV0dXJuIHNraXA7XG4gICAgfVxuICAgIC8vIHNraXAgdi1lbHNlIGJsb2NrLCBidXQgb25seSBpZiBmb2xsb3dpbmcgdi1pZlxuICAgIGlmIChlbC5oYXNBdHRyaWJ1dGUoJ3YtZWxzZScpKSB7XG4gICAgICB2YXIgcHJldiA9IGVsLnByZXZpb3VzRWxlbWVudFNpYmxpbmc7XG4gICAgICBpZiAocHJldiAmJiBwcmV2Lmhhc0F0dHJpYnV0ZSgndi1pZicpKSB7XG4gICAgICAgIHJldHVybiBza2lwO1xuICAgICAgfVxuICAgIH1cblxuICAgIHZhciBhdHRyLCBuYW1lLCB2YWx1ZSwgbW9kaWZpZXJzLCBtYXRjaGVkLCBkaXJOYW1lLCByYXdOYW1lLCBhcmcsIGRlZiwgdGVybURlZjtcbiAgICBmb3IgKHZhciBpID0gMCwgaiA9IGF0dHJzLmxlbmd0aDsgaSA8IGo7IGkrKykge1xuICAgICAgYXR0ciA9IGF0dHJzW2ldO1xuICAgICAgbmFtZSA9IGF0dHIubmFtZS5yZXBsYWNlKG1vZGlmaWVyUkUsICcnKTtcbiAgICAgIGlmIChtYXRjaGVkID0gbmFtZS5tYXRjaChkaXJBdHRyUkUpKSB7XG4gICAgICAgIGRlZiA9IHJlc29sdmVBc3NldChvcHRpb25zLCAnZGlyZWN0aXZlcycsIG1hdGNoZWRbMV0pO1xuICAgICAgICBpZiAoZGVmICYmIGRlZi50ZXJtaW5hbCkge1xuICAgICAgICAgIGlmICghdGVybURlZiB8fCAoZGVmLnByaW9yaXR5IHx8IERFRkFVTFRfVEVSTUlOQUxfUFJJT1JJVFkpID4gdGVybURlZi5wcmlvcml0eSkge1xuICAgICAgICAgICAgdGVybURlZiA9IGRlZjtcbiAgICAgICAgICAgIHJhd05hbWUgPSBhdHRyLm5hbWU7XG4gICAgICAgICAgICBtb2RpZmllcnMgPSBwYXJzZU1vZGlmaWVycyhhdHRyLm5hbWUpO1xuICAgICAgICAgICAgdmFsdWUgPSBhdHRyLnZhbHVlO1xuICAgICAgICAgICAgZGlyTmFtZSA9IG1hdGNoZWRbMV07XG4gICAgICAgICAgICBhcmcgPSBtYXRjaGVkWzJdO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIGlmICh0ZXJtRGVmKSB7XG4gICAgICByZXR1cm4gbWFrZVRlcm1pbmFsTm9kZUxpbmtGbihlbCwgZGlyTmFtZSwgdmFsdWUsIG9wdGlvbnMsIHRlcm1EZWYsIHJhd05hbWUsIGFyZywgbW9kaWZpZXJzKTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBza2lwKCkge31cbiAgc2tpcC50ZXJtaW5hbCA9IHRydWU7XG5cbiAgLyoqXG4gICAqIEJ1aWxkIGEgbm9kZSBsaW5rIGZ1bmN0aW9uIGZvciBhIHRlcm1pbmFsIGRpcmVjdGl2ZS5cbiAgICogQSB0ZXJtaW5hbCBsaW5rIGZ1bmN0aW9uIHRlcm1pbmF0ZXMgdGhlIGN1cnJlbnRcbiAgICogY29tcGlsYXRpb24gcmVjdXJzaW9uIGFuZCBoYW5kbGVzIGNvbXBpbGF0aW9uIG9mIHRoZVxuICAgKiBzdWJ0cmVlIGluIHRoZSBkaXJlY3RpdmUuXG4gICAqXG4gICAqIEBwYXJhbSB7RWxlbWVudH0gZWxcbiAgICogQHBhcmFtIHtTdHJpbmd9IGRpck5hbWVcbiAgICogQHBhcmFtIHtTdHJpbmd9IHZhbHVlXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBkZWZcbiAgICogQHBhcmFtIHtTdHJpbmd9IFtyYXdOYW1lXVxuICAgKiBAcGFyYW0ge1N0cmluZ30gW2FyZ11cbiAgICogQHBhcmFtIHtPYmplY3R9IFttb2RpZmllcnNdXG4gICAqIEByZXR1cm4ge0Z1bmN0aW9ufSB0ZXJtaW5hbExpbmtGblxuICAgKi9cblxuICBmdW5jdGlvbiBtYWtlVGVybWluYWxOb2RlTGlua0ZuKGVsLCBkaXJOYW1lLCB2YWx1ZSwgb3B0aW9ucywgZGVmLCByYXdOYW1lLCBhcmcsIG1vZGlmaWVycykge1xuICAgIHZhciBwYXJzZWQgPSBwYXJzZURpcmVjdGl2ZSh2YWx1ZSk7XG4gICAgdmFyIGRlc2NyaXB0b3IgPSB7XG4gICAgICBuYW1lOiBkaXJOYW1lLFxuICAgICAgYXJnOiBhcmcsXG4gICAgICBleHByZXNzaW9uOiBwYXJzZWQuZXhwcmVzc2lvbixcbiAgICAgIGZpbHRlcnM6IHBhcnNlZC5maWx0ZXJzLFxuICAgICAgcmF3OiB2YWx1ZSxcbiAgICAgIGF0dHI6IHJhd05hbWUsXG4gICAgICBtb2RpZmllcnM6IG1vZGlmaWVycyxcbiAgICAgIGRlZjogZGVmXG4gICAgfTtcbiAgICAvLyBjaGVjayByZWYgZm9yIHYtZm9yIGFuZCByb3V0ZXItdmlld1xuICAgIGlmIChkaXJOYW1lID09PSAnZm9yJyB8fCBkaXJOYW1lID09PSAncm91dGVyLXZpZXcnKSB7XG4gICAgICBkZXNjcmlwdG9yLnJlZiA9IGZpbmRSZWYoZWwpO1xuICAgIH1cbiAgICB2YXIgZm4gPSBmdW5jdGlvbiB0ZXJtaW5hbE5vZGVMaW5rRm4odm0sIGVsLCBob3N0LCBzY29wZSwgZnJhZykge1xuICAgICAgaWYgKGRlc2NyaXB0b3IucmVmKSB7XG4gICAgICAgIGRlZmluZVJlYWN0aXZlKChzY29wZSB8fCB2bSkuJHJlZnMsIGRlc2NyaXB0b3IucmVmLCBudWxsKTtcbiAgICAgIH1cbiAgICAgIHZtLl9iaW5kRGlyKGRlc2NyaXB0b3IsIGVsLCBob3N0LCBzY29wZSwgZnJhZyk7XG4gICAgfTtcbiAgICBmbi50ZXJtaW5hbCA9IHRydWU7XG4gICAgcmV0dXJuIGZuO1xuICB9XG5cbiAgLyoqXG4gICAqIENvbXBpbGUgdGhlIGRpcmVjdGl2ZXMgb24gYW4gZWxlbWVudCBhbmQgcmV0dXJuIGEgbGlua2VyLlxuICAgKlxuICAgKiBAcGFyYW0ge0FycmF5fE5hbWVkTm9kZU1hcH0gYXR0cnNcbiAgICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnNcbiAgICogQHJldHVybiB7RnVuY3Rpb259XG4gICAqL1xuXG4gIGZ1bmN0aW9uIGNvbXBpbGVEaXJlY3RpdmVzKGF0dHJzLCBvcHRpb25zKSB7XG4gICAgdmFyIGkgPSBhdHRycy5sZW5ndGg7XG4gICAgdmFyIGRpcnMgPSBbXTtcbiAgICB2YXIgYXR0ciwgbmFtZSwgdmFsdWUsIHJhd05hbWUsIHJhd1ZhbHVlLCBkaXJOYW1lLCBhcmcsIG1vZGlmaWVycywgZGlyRGVmLCB0b2tlbnMsIG1hdGNoZWQ7XG4gICAgd2hpbGUgKGktLSkge1xuICAgICAgYXR0ciA9IGF0dHJzW2ldO1xuICAgICAgbmFtZSA9IHJhd05hbWUgPSBhdHRyLm5hbWU7XG4gICAgICB2YWx1ZSA9IHJhd1ZhbHVlID0gYXR0ci52YWx1ZTtcbiAgICAgIHRva2VucyA9IHBhcnNlVGV4dCh2YWx1ZSk7XG4gICAgICAvLyByZXNldCBhcmdcbiAgICAgIGFyZyA9IG51bGw7XG4gICAgICAvLyBjaGVjayBtb2RpZmllcnNcbiAgICAgIG1vZGlmaWVycyA9IHBhcnNlTW9kaWZpZXJzKG5hbWUpO1xuICAgICAgbmFtZSA9IG5hbWUucmVwbGFjZShtb2RpZmllclJFLCAnJyk7XG5cbiAgICAgIC8vIGF0dHJpYnV0ZSBpbnRlcnBvbGF0aW9uc1xuICAgICAgaWYgKHRva2Vucykge1xuICAgICAgICB2YWx1ZSA9IHRva2Vuc1RvRXhwKHRva2Vucyk7XG4gICAgICAgIGFyZyA9IG5hbWU7XG4gICAgICAgIHB1c2hEaXIoJ2JpbmQnLCBkaXJlY3RpdmVzLmJpbmQsIHRva2Vucyk7XG4gICAgICAgIC8vIHdhcm4gYWdhaW5zdCBtaXhpbmcgbXVzdGFjaGVzIHdpdGggdi1iaW5kXG4gICAgICAgIGlmICgnZGV2ZWxvcG1lbnQnICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICAgICAgICBpZiAobmFtZSA9PT0gJ2NsYXNzJyAmJiBBcnJheS5wcm90b3R5cGUuc29tZS5jYWxsKGF0dHJzLCBmdW5jdGlvbiAoYXR0cikge1xuICAgICAgICAgICAgcmV0dXJuIGF0dHIubmFtZSA9PT0gJzpjbGFzcycgfHwgYXR0ci5uYW1lID09PSAndi1iaW5kOmNsYXNzJztcbiAgICAgICAgICB9KSkge1xuICAgICAgICAgICAgd2FybignY2xhc3M9XCInICsgcmF3VmFsdWUgKyAnXCI6IERvIG5vdCBtaXggbXVzdGFjaGUgaW50ZXJwb2xhdGlvbiAnICsgJ2FuZCB2LWJpbmQgZm9yIFwiY2xhc3NcIiBvbiB0aGUgc2FtZSBlbGVtZW50LiBVc2Ugb25lIG9yIHRoZSBvdGhlci4nLCBvcHRpb25zKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZVxuXG4gICAgICAgIC8vIHNwZWNpYWwgYXR0cmlidXRlOiB0cmFuc2l0aW9uXG4gICAgICAgIGlmICh0cmFuc2l0aW9uUkUudGVzdChuYW1lKSkge1xuICAgICAgICAgIG1vZGlmaWVycy5saXRlcmFsID0gIWJpbmRSRS50ZXN0KG5hbWUpO1xuICAgICAgICAgIHB1c2hEaXIoJ3RyYW5zaXRpb24nLCBpbnRlcm5hbERpcmVjdGl2ZXMudHJhbnNpdGlvbik7XG4gICAgICAgIH0gZWxzZVxuXG4gICAgICAgICAgLy8gZXZlbnQgaGFuZGxlcnNcbiAgICAgICAgICBpZiAob25SRS50ZXN0KG5hbWUpKSB7XG4gICAgICAgICAgICBhcmcgPSBuYW1lLnJlcGxhY2Uob25SRSwgJycpO1xuICAgICAgICAgICAgcHVzaERpcignb24nLCBkaXJlY3RpdmVzLm9uKTtcbiAgICAgICAgICB9IGVsc2VcblxuICAgICAgICAgICAgLy8gYXR0cmlidXRlIGJpbmRpbmdzXG4gICAgICAgICAgICBpZiAoYmluZFJFLnRlc3QobmFtZSkpIHtcbiAgICAgICAgICAgICAgZGlyTmFtZSA9IG5hbWUucmVwbGFjZShiaW5kUkUsICcnKTtcbiAgICAgICAgICAgICAgaWYgKGRpck5hbWUgPT09ICdzdHlsZScgfHwgZGlyTmFtZSA9PT0gJ2NsYXNzJykge1xuICAgICAgICAgICAgICAgIHB1c2hEaXIoZGlyTmFtZSwgaW50ZXJuYWxEaXJlY3RpdmVzW2Rpck5hbWVdKTtcbiAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBhcmcgPSBkaXJOYW1lO1xuICAgICAgICAgICAgICAgIHB1c2hEaXIoJ2JpbmQnLCBkaXJlY3RpdmVzLmJpbmQpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2VcblxuICAgICAgICAgICAgICAvLyBub3JtYWwgZGlyZWN0aXZlc1xuICAgICAgICAgICAgICBpZiAobWF0Y2hlZCA9IG5hbWUubWF0Y2goZGlyQXR0clJFKSkge1xuICAgICAgICAgICAgICAgIGRpck5hbWUgPSBtYXRjaGVkWzFdO1xuICAgICAgICAgICAgICAgIGFyZyA9IG1hdGNoZWRbMl07XG5cbiAgICAgICAgICAgICAgICAvLyBza2lwIHYtZWxzZSAod2hlbiB1c2VkIHdpdGggdi1zaG93KVxuICAgICAgICAgICAgICAgIGlmIChkaXJOYW1lID09PSAnZWxzZScpIHtcbiAgICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGRpckRlZiA9IHJlc29sdmVBc3NldChvcHRpb25zLCAnZGlyZWN0aXZlcycsIGRpck5hbWUsIHRydWUpO1xuICAgICAgICAgICAgICAgIGlmIChkaXJEZWYpIHtcbiAgICAgICAgICAgICAgICAgIHB1c2hEaXIoZGlyTmFtZSwgZGlyRGVmKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBQdXNoIGEgZGlyZWN0aXZlLlxuICAgICAqXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IGRpck5hbWVcbiAgICAgKiBAcGFyYW0ge09iamVjdHxGdW5jdGlvbn0gZGVmXG4gICAgICogQHBhcmFtIHtBcnJheX0gW2ludGVycFRva2Vuc11cbiAgICAgKi9cblxuICAgIGZ1bmN0aW9uIHB1c2hEaXIoZGlyTmFtZSwgZGVmLCBpbnRlcnBUb2tlbnMpIHtcbiAgICAgIHZhciBoYXNPbmVUaW1lVG9rZW4gPSBpbnRlcnBUb2tlbnMgJiYgaGFzT25lVGltZShpbnRlcnBUb2tlbnMpO1xuICAgICAgdmFyIHBhcnNlZCA9ICFoYXNPbmVUaW1lVG9rZW4gJiYgcGFyc2VEaXJlY3RpdmUodmFsdWUpO1xuICAgICAgZGlycy5wdXNoKHtcbiAgICAgICAgbmFtZTogZGlyTmFtZSxcbiAgICAgICAgYXR0cjogcmF3TmFtZSxcbiAgICAgICAgcmF3OiByYXdWYWx1ZSxcbiAgICAgICAgZGVmOiBkZWYsXG4gICAgICAgIGFyZzogYXJnLFxuICAgICAgICBtb2RpZmllcnM6IG1vZGlmaWVycyxcbiAgICAgICAgLy8gY29udmVyc2lvbiBmcm9tIGludGVycG9sYXRpb24gc3RyaW5ncyB3aXRoIG9uZS10aW1lIHRva2VuXG4gICAgICAgIC8vIHRvIGV4cHJlc3Npb24gaXMgZGlmZmVyZWQgdW50aWwgZGlyZWN0aXZlIGJpbmQgdGltZSBzbyB0aGF0IHdlXG4gICAgICAgIC8vIGhhdmUgYWNjZXNzIHRvIHRoZSBhY3R1YWwgdm0gY29udGV4dCBmb3Igb25lLXRpbWUgYmluZGluZ3MuXG4gICAgICAgIGV4cHJlc3Npb246IHBhcnNlZCAmJiBwYXJzZWQuZXhwcmVzc2lvbixcbiAgICAgICAgZmlsdGVyczogcGFyc2VkICYmIHBhcnNlZC5maWx0ZXJzLFxuICAgICAgICBpbnRlcnA6IGludGVycFRva2VucyxcbiAgICAgICAgaGFzT25lVGltZTogaGFzT25lVGltZVRva2VuXG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBpZiAoZGlycy5sZW5ndGgpIHtcbiAgICAgIHJldHVybiBtYWtlTm9kZUxpbmtGbihkaXJzKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogUGFyc2UgbW9kaWZpZXJzIGZyb20gZGlyZWN0aXZlIGF0dHJpYnV0ZSBuYW1lLlxuICAgKlxuICAgKiBAcGFyYW0ge1N0cmluZ30gbmFtZVxuICAgKiBAcmV0dXJuIHtPYmplY3R9XG4gICAqL1xuXG4gIGZ1bmN0aW9uIHBhcnNlTW9kaWZpZXJzKG5hbWUpIHtcbiAgICB2YXIgcmVzID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiAgICB2YXIgbWF0Y2ggPSBuYW1lLm1hdGNoKG1vZGlmaWVyUkUpO1xuICAgIGlmIChtYXRjaCkge1xuICAgICAgdmFyIGkgPSBtYXRjaC5sZW5ndGg7XG4gICAgICB3aGlsZSAoaS0tKSB7XG4gICAgICAgIHJlc1ttYXRjaFtpXS5zbGljZSgxKV0gPSB0cnVlO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gcmVzO1xuICB9XG5cbiAgLyoqXG4gICAqIEJ1aWxkIGEgbGluayBmdW5jdGlvbiBmb3IgYWxsIGRpcmVjdGl2ZXMgb24gYSBzaW5nbGUgbm9kZS5cbiAgICpcbiAgICogQHBhcmFtIHtBcnJheX0gZGlyZWN0aXZlc1xuICAgKiBAcmV0dXJuIHtGdW5jdGlvbn0gZGlyZWN0aXZlc0xpbmtGblxuICAgKi9cblxuICBmdW5jdGlvbiBtYWtlTm9kZUxpbmtGbihkaXJlY3RpdmVzKSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uIG5vZGVMaW5rRm4odm0sIGVsLCBob3N0LCBzY29wZSwgZnJhZykge1xuICAgICAgLy8gcmV2ZXJzZSBhcHBseSBiZWNhdXNlIGl0J3Mgc29ydGVkIGxvdyB0byBoaWdoXG4gICAgICB2YXIgaSA9IGRpcmVjdGl2ZXMubGVuZ3RoO1xuICAgICAgd2hpbGUgKGktLSkge1xuICAgICAgICB2bS5fYmluZERpcihkaXJlY3RpdmVzW2ldLCBlbCwgaG9zdCwgc2NvcGUsIGZyYWcpO1xuICAgICAgfVxuICAgIH07XG4gIH1cblxuICAvKipcbiAgICogQ2hlY2sgaWYgYW4gaW50ZXJwb2xhdGlvbiBzdHJpbmcgY29udGFpbnMgb25lLXRpbWUgdG9rZW5zLlxuICAgKlxuICAgKiBAcGFyYW0ge0FycmF5fSB0b2tlbnNcbiAgICogQHJldHVybiB7Qm9vbGVhbn1cbiAgICovXG5cbiAgZnVuY3Rpb24gaGFzT25lVGltZSh0b2tlbnMpIHtcbiAgICB2YXIgaSA9IHRva2Vucy5sZW5ndGg7XG4gICAgd2hpbGUgKGktLSkge1xuICAgICAgaWYgKHRva2Vuc1tpXS5vbmVUaW1lKSByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBpc1NjcmlwdChlbCkge1xuICAgIHJldHVybiBlbC50YWdOYW1lID09PSAnU0NSSVBUJyAmJiAoIWVsLmhhc0F0dHJpYnV0ZSgndHlwZScpIHx8IGVsLmdldEF0dHJpYnV0ZSgndHlwZScpID09PSAndGV4dC9qYXZhc2NyaXB0Jyk7XG4gIH1cblxuICB2YXIgc3BlY2lhbENoYXJSRSA9IC9bXlxcd1xcLTpcXC5dLztcblxuICAvKipcbiAgICogUHJvY2VzcyBhbiBlbGVtZW50IG9yIGEgRG9jdW1lbnRGcmFnbWVudCBiYXNlZCBvbiBhXG4gICAqIGluc3RhbmNlIG9wdGlvbiBvYmplY3QuIFRoaXMgYWxsb3dzIHVzIHRvIHRyYW5zY2x1ZGVcbiAgICogYSB0ZW1wbGF0ZSBub2RlL2ZyYWdtZW50IGJlZm9yZSB0aGUgaW5zdGFuY2UgaXMgY3JlYXRlZCxcbiAgICogc28gdGhlIHByb2Nlc3NlZCBmcmFnbWVudCBjYW4gdGhlbiBiZSBjbG9uZWQgYW5kIHJldXNlZFxuICAgKiBpbiB2LWZvci5cbiAgICpcbiAgICogQHBhcmFtIHtFbGVtZW50fSBlbFxuICAgKiBAcGFyYW0ge09iamVjdH0gb3B0aW9uc1xuICAgKiBAcmV0dXJuIHtFbGVtZW50fERvY3VtZW50RnJhZ21lbnR9XG4gICAqL1xuXG4gIGZ1bmN0aW9uIHRyYW5zY2x1ZGUoZWwsIG9wdGlvbnMpIHtcbiAgICAvLyBleHRyYWN0IGNvbnRhaW5lciBhdHRyaWJ1dGVzIHRvIHBhc3MgdGhlbSBkb3duXG4gICAgLy8gdG8gY29tcGlsZXIsIGJlY2F1c2UgdGhleSBuZWVkIHRvIGJlIGNvbXBpbGVkIGluXG4gICAgLy8gcGFyZW50IHNjb3BlLiB3ZSBhcmUgbXV0YXRpbmcgdGhlIG9wdGlvbnMgb2JqZWN0IGhlcmVcbiAgICAvLyBhc3N1bWluZyB0aGUgc2FtZSBvYmplY3Qgd2lsbCBiZSB1c2VkIGZvciBjb21waWxlXG4gICAgLy8gcmlnaHQgYWZ0ZXIgdGhpcy5cbiAgICBpZiAob3B0aW9ucykge1xuICAgICAgb3B0aW9ucy5fY29udGFpbmVyQXR0cnMgPSBleHRyYWN0QXR0cnMoZWwpO1xuICAgIH1cbiAgICAvLyBmb3IgdGVtcGxhdGUgdGFncywgd2hhdCB3ZSB3YW50IGlzIGl0cyBjb250ZW50IGFzXG4gICAgLy8gYSBkb2N1bWVudEZyYWdtZW50IChmb3IgZnJhZ21lbnQgaW5zdGFuY2VzKVxuICAgIGlmIChpc1RlbXBsYXRlKGVsKSkge1xuICAgICAgZWwgPSBwYXJzZVRlbXBsYXRlKGVsKTtcbiAgICB9XG4gICAgaWYgKG9wdGlvbnMpIHtcbiAgICAgIGlmIChvcHRpb25zLl9hc0NvbXBvbmVudCAmJiAhb3B0aW9ucy50ZW1wbGF0ZSkge1xuICAgICAgICBvcHRpb25zLnRlbXBsYXRlID0gJzxzbG90Pjwvc2xvdD4nO1xuICAgICAgfVxuICAgICAgaWYgKG9wdGlvbnMudGVtcGxhdGUpIHtcbiAgICAgICAgb3B0aW9ucy5fY29udGVudCA9IGV4dHJhY3RDb250ZW50KGVsKTtcbiAgICAgICAgZWwgPSB0cmFuc2NsdWRlVGVtcGxhdGUoZWwsIG9wdGlvbnMpO1xuICAgICAgfVxuICAgIH1cbiAgICBpZiAoaXNGcmFnbWVudChlbCkpIHtcbiAgICAgIC8vIGFuY2hvcnMgZm9yIGZyYWdtZW50IGluc3RhbmNlXG4gICAgICAvLyBwYXNzaW5nIGluIGBwZXJzaXN0OiB0cnVlYCB0byBhdm9pZCB0aGVtIGJlaW5nXG4gICAgICAvLyBkaXNjYXJkZWQgYnkgSUUgZHVyaW5nIHRlbXBsYXRlIGNsb25pbmdcbiAgICAgIHByZXBlbmQoY3JlYXRlQW5jaG9yKCd2LXN0YXJ0JywgdHJ1ZSksIGVsKTtcbiAgICAgIGVsLmFwcGVuZENoaWxkKGNyZWF0ZUFuY2hvcigndi1lbmQnLCB0cnVlKSk7XG4gICAgfVxuICAgIHJldHVybiBlbDtcbiAgfVxuXG4gIC8qKlxuICAgKiBQcm9jZXNzIHRoZSB0ZW1wbGF0ZSBvcHRpb24uXG4gICAqIElmIHRoZSByZXBsYWNlIG9wdGlvbiBpcyB0cnVlIHRoaXMgd2lsbCBzd2FwIHRoZSAkZWwuXG4gICAqXG4gICAqIEBwYXJhbSB7RWxlbWVudH0gZWxcbiAgICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnNcbiAgICogQHJldHVybiB7RWxlbWVudHxEb2N1bWVudEZyYWdtZW50fVxuICAgKi9cblxuICBmdW5jdGlvbiB0cmFuc2NsdWRlVGVtcGxhdGUoZWwsIG9wdGlvbnMpIHtcbiAgICB2YXIgdGVtcGxhdGUgPSBvcHRpb25zLnRlbXBsYXRlO1xuICAgIHZhciBmcmFnID0gcGFyc2VUZW1wbGF0ZSh0ZW1wbGF0ZSwgdHJ1ZSk7XG4gICAgaWYgKGZyYWcpIHtcbiAgICAgIHZhciByZXBsYWNlciA9IGZyYWcuZmlyc3RDaGlsZDtcbiAgICAgIHZhciB0YWcgPSByZXBsYWNlci50YWdOYW1lICYmIHJlcGxhY2VyLnRhZ05hbWUudG9Mb3dlckNhc2UoKTtcbiAgICAgIGlmIChvcHRpb25zLnJlcGxhY2UpIHtcbiAgICAgICAgLyogaXN0YW5idWwgaWdub3JlIGlmICovXG4gICAgICAgIGlmIChlbCA9PT0gZG9jdW1lbnQuYm9keSkge1xuICAgICAgICAgICdkZXZlbG9wbWVudCcgIT09ICdwcm9kdWN0aW9uJyAmJiB3YXJuKCdZb3UgYXJlIG1vdW50aW5nIGFuIGluc3RhbmNlIHdpdGggYSB0ZW1wbGF0ZSB0byAnICsgJzxib2R5Pi4gVGhpcyB3aWxsIHJlcGxhY2UgPGJvZHk+IGVudGlyZWx5LiBZb3UgJyArICdzaG91bGQgcHJvYmFibHkgdXNlIGByZXBsYWNlOiBmYWxzZWAgaGVyZS4nKTtcbiAgICAgICAgfVxuICAgICAgICAvLyB0aGVyZSBhcmUgbWFueSBjYXNlcyB3aGVyZSB0aGUgaW5zdGFuY2UgbXVzdFxuICAgICAgICAvLyBiZWNvbWUgYSBmcmFnbWVudCBpbnN0YW5jZTogYmFzaWNhbGx5IGFueXRoaW5nIHRoYXRcbiAgICAgICAgLy8gY2FuIGNyZWF0ZSBtb3JlIHRoYW4gMSByb290IG5vZGVzLlxuICAgICAgICBpZiAoXG4gICAgICAgIC8vIG11bHRpLWNoaWxkcmVuIHRlbXBsYXRlXG4gICAgICAgIGZyYWcuY2hpbGROb2Rlcy5sZW5ndGggPiAxIHx8XG4gICAgICAgIC8vIG5vbi1lbGVtZW50IHRlbXBsYXRlXG4gICAgICAgIHJlcGxhY2VyLm5vZGVUeXBlICE9PSAxIHx8XG4gICAgICAgIC8vIHNpbmdsZSBuZXN0ZWQgY29tcG9uZW50XG4gICAgICAgIHRhZyA9PT0gJ2NvbXBvbmVudCcgfHwgcmVzb2x2ZUFzc2V0KG9wdGlvbnMsICdjb21wb25lbnRzJywgdGFnKSB8fCBoYXNCaW5kQXR0cihyZXBsYWNlciwgJ2lzJykgfHxcbiAgICAgICAgLy8gZWxlbWVudCBkaXJlY3RpdmVcbiAgICAgICAgcmVzb2x2ZUFzc2V0KG9wdGlvbnMsICdlbGVtZW50RGlyZWN0aXZlcycsIHRhZykgfHxcbiAgICAgICAgLy8gZm9yIGJsb2NrXG4gICAgICAgIHJlcGxhY2VyLmhhc0F0dHJpYnV0ZSgndi1mb3InKSB8fFxuICAgICAgICAvLyBpZiBibG9ja1xuICAgICAgICByZXBsYWNlci5oYXNBdHRyaWJ1dGUoJ3YtaWYnKSkge1xuICAgICAgICAgIHJldHVybiBmcmFnO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIG9wdGlvbnMuX3JlcGxhY2VyQXR0cnMgPSBleHRyYWN0QXR0cnMocmVwbGFjZXIpO1xuICAgICAgICAgIG1lcmdlQXR0cnMoZWwsIHJlcGxhY2VyKTtcbiAgICAgICAgICByZXR1cm4gcmVwbGFjZXI7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGVsLmFwcGVuZENoaWxkKGZyYWcpO1xuICAgICAgICByZXR1cm4gZWw7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgICdkZXZlbG9wbWVudCcgIT09ICdwcm9kdWN0aW9uJyAmJiB3YXJuKCdJbnZhbGlkIHRlbXBsYXRlIG9wdGlvbjogJyArIHRlbXBsYXRlKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogSGVscGVyIHRvIGV4dHJhY3QgYSBjb21wb25lbnQgY29udGFpbmVyJ3MgYXR0cmlidXRlc1xuICAgKiBpbnRvIGEgcGxhaW4gb2JqZWN0IGFycmF5LlxuICAgKlxuICAgKiBAcGFyYW0ge0VsZW1lbnR9IGVsXG4gICAqIEByZXR1cm4ge0FycmF5fVxuICAgKi9cblxuICBmdW5jdGlvbiBleHRyYWN0QXR0cnMoZWwpIHtcbiAgICBpZiAoZWwubm9kZVR5cGUgPT09IDEgJiYgZWwuaGFzQXR0cmlidXRlcygpKSB7XG4gICAgICByZXR1cm4gdG9BcnJheShlbC5hdHRyaWJ1dGVzKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogTWVyZ2UgdGhlIGF0dHJpYnV0ZXMgb2YgdHdvIGVsZW1lbnRzLCBhbmQgbWFrZSBzdXJlXG4gICAqIHRoZSBjbGFzcyBuYW1lcyBhcmUgbWVyZ2VkIHByb3Blcmx5LlxuICAgKlxuICAgKiBAcGFyYW0ge0VsZW1lbnR9IGZyb21cbiAgICogQHBhcmFtIHtFbGVtZW50fSB0b1xuICAgKi9cblxuICBmdW5jdGlvbiBtZXJnZUF0dHJzKGZyb20sIHRvKSB7XG4gICAgdmFyIGF0dHJzID0gZnJvbS5hdHRyaWJ1dGVzO1xuICAgIHZhciBpID0gYXR0cnMubGVuZ3RoO1xuICAgIHZhciBuYW1lLCB2YWx1ZTtcbiAgICB3aGlsZSAoaS0tKSB7XG4gICAgICBuYW1lID0gYXR0cnNbaV0ubmFtZTtcbiAgICAgIHZhbHVlID0gYXR0cnNbaV0udmFsdWU7XG4gICAgICBpZiAoIXRvLmhhc0F0dHJpYnV0ZShuYW1lKSAmJiAhc3BlY2lhbENoYXJSRS50ZXN0KG5hbWUpKSB7XG4gICAgICAgIHRvLnNldEF0dHJpYnV0ZShuYW1lLCB2YWx1ZSk7XG4gICAgICB9IGVsc2UgaWYgKG5hbWUgPT09ICdjbGFzcycgJiYgIXBhcnNlVGV4dCh2YWx1ZSkgJiYgKHZhbHVlID0gdmFsdWUudHJpbSgpKSkge1xuICAgICAgICB2YWx1ZS5zcGxpdCgvXFxzKy8pLmZvckVhY2goZnVuY3Rpb24gKGNscykge1xuICAgICAgICAgIGFkZENsYXNzKHRvLCBjbHMpO1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogU2NhbiBhbmQgZGV0ZXJtaW5lIHNsb3QgY29udGVudCBkaXN0cmlidXRpb24uXG4gICAqIFdlIGRvIHRoaXMgZHVyaW5nIHRyYW5zY2x1c2lvbiBpbnN0ZWFkIGF0IGNvbXBpbGUgdGltZSBzbyB0aGF0XG4gICAqIHRoZSBkaXN0cmlidXRpb24gaXMgZGVjb3VwbGVkIGZyb20gdGhlIGNvbXBpbGF0aW9uIG9yZGVyIG9mXG4gICAqIHRoZSBzbG90cy5cbiAgICpcbiAgICogQHBhcmFtIHtFbGVtZW50fERvY3VtZW50RnJhZ21lbnR9IHRlbXBsYXRlXG4gICAqIEBwYXJhbSB7RWxlbWVudH0gY29udGVudFxuICAgKiBAcGFyYW0ge1Z1ZX0gdm1cbiAgICovXG5cbiAgZnVuY3Rpb24gcmVzb2x2ZVNsb3RzKHZtLCBjb250ZW50KSB7XG4gICAgaWYgKCFjb250ZW50KSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHZhciBjb250ZW50cyA9IHZtLl9zbG90Q29udGVudHMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuICAgIHZhciBlbCwgbmFtZTtcbiAgICBmb3IgKHZhciBpID0gMCwgbCA9IGNvbnRlbnQuY2hpbGRyZW4ubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG4gICAgICBlbCA9IGNvbnRlbnQuY2hpbGRyZW5baV07XG4gICAgICAvKiBlc2xpbnQtZGlzYWJsZSBuby1jb25kLWFzc2lnbiAqL1xuICAgICAgaWYgKG5hbWUgPSBlbC5nZXRBdHRyaWJ1dGUoJ3Nsb3QnKSkge1xuICAgICAgICAoY29udGVudHNbbmFtZV0gfHwgKGNvbnRlbnRzW25hbWVdID0gW10pKS5wdXNoKGVsKTtcbiAgICAgIH1cbiAgICAgIC8qIGVzbGludC1lbmFibGUgbm8tY29uZC1hc3NpZ24gKi9cbiAgICAgIGlmICgnZGV2ZWxvcG1lbnQnICE9PSAncHJvZHVjdGlvbicgJiYgZ2V0QmluZEF0dHIoZWwsICdzbG90JykpIHtcbiAgICAgICAgd2FybignVGhlIFwic2xvdFwiIGF0dHJpYnV0ZSBtdXN0IGJlIHN0YXRpYy4nLCB2bS4kcGFyZW50KTtcbiAgICAgIH1cbiAgICB9XG4gICAgZm9yIChuYW1lIGluIGNvbnRlbnRzKSB7XG4gICAgICBjb250ZW50c1tuYW1lXSA9IGV4dHJhY3RGcmFnbWVudChjb250ZW50c1tuYW1lXSwgY29udGVudCk7XG4gICAgfVxuICAgIGlmIChjb250ZW50Lmhhc0NoaWxkTm9kZXMoKSkge1xuICAgICAgdmFyIG5vZGVzID0gY29udGVudC5jaGlsZE5vZGVzO1xuICAgICAgaWYgKG5vZGVzLmxlbmd0aCA9PT0gMSAmJiBub2Rlc1swXS5ub2RlVHlwZSA9PT0gMyAmJiAhbm9kZXNbMF0uZGF0YS50cmltKCkpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgY29udGVudHNbJ2RlZmF1bHQnXSA9IGV4dHJhY3RGcmFnbWVudChjb250ZW50LmNoaWxkTm9kZXMsIGNvbnRlbnQpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBFeHRyYWN0IHF1YWxpZmllZCBjb250ZW50IG5vZGVzIGZyb20gYSBub2RlIGxpc3QuXG4gICAqXG4gICAqIEBwYXJhbSB7Tm9kZUxpc3R9IG5vZGVzXG4gICAqIEByZXR1cm4ge0RvY3VtZW50RnJhZ21lbnR9XG4gICAqL1xuXG4gIGZ1bmN0aW9uIGV4dHJhY3RGcmFnbWVudChub2RlcywgcGFyZW50KSB7XG4gICAgdmFyIGZyYWcgPSBkb2N1bWVudC5jcmVhdGVEb2N1bWVudEZyYWdtZW50KCk7XG4gICAgbm9kZXMgPSB0b0FycmF5KG5vZGVzKTtcbiAgICBmb3IgKHZhciBpID0gMCwgbCA9IG5vZGVzLmxlbmd0aDsgaSA8IGw7IGkrKykge1xuICAgICAgdmFyIG5vZGUgPSBub2Rlc1tpXTtcbiAgICAgIGlmIChpc1RlbXBsYXRlKG5vZGUpICYmICFub2RlLmhhc0F0dHJpYnV0ZSgndi1pZicpICYmICFub2RlLmhhc0F0dHJpYnV0ZSgndi1mb3InKSkge1xuICAgICAgICBwYXJlbnQucmVtb3ZlQ2hpbGQobm9kZSk7XG4gICAgICAgIG5vZGUgPSBwYXJzZVRlbXBsYXRlKG5vZGUsIHRydWUpO1xuICAgICAgfVxuICAgICAgZnJhZy5hcHBlbmRDaGlsZChub2RlKTtcbiAgICB9XG4gICAgcmV0dXJuIGZyYWc7XG4gIH1cblxuXG5cbiAgdmFyIGNvbXBpbGVyID0gT2JqZWN0LmZyZWV6ZSh7XG4gIFx0Y29tcGlsZTogY29tcGlsZSxcbiAgXHRjb21waWxlQW5kTGlua1Byb3BzOiBjb21waWxlQW5kTGlua1Byb3BzLFxuICBcdGNvbXBpbGVSb290OiBjb21waWxlUm9vdCxcbiAgXHR0cmFuc2NsdWRlOiB0cmFuc2NsdWRlLFxuICBcdHJlc29sdmVTbG90czogcmVzb2x2ZVNsb3RzXG4gIH0pO1xuXG4gIGZ1bmN0aW9uIHN0YXRlTWl4aW4gKFZ1ZSkge1xuICAgIC8qKlxuICAgICAqIEFjY2Vzc29yIGZvciBgJGRhdGFgIHByb3BlcnR5LCBzaW5jZSBzZXR0aW5nICRkYXRhXG4gICAgICogcmVxdWlyZXMgb2JzZXJ2aW5nIHRoZSBuZXcgb2JqZWN0IGFuZCB1cGRhdGluZ1xuICAgICAqIHByb3hpZWQgcHJvcGVydGllcy5cbiAgICAgKi9cblxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShWdWUucHJvdG90eXBlLCAnJGRhdGEnLCB7XG4gICAgICBnZXQ6IGZ1bmN0aW9uIGdldCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2RhdGE7XG4gICAgICB9LFxuICAgICAgc2V0OiBmdW5jdGlvbiBzZXQobmV3RGF0YSkge1xuICAgICAgICBpZiAobmV3RGF0YSAhPT0gdGhpcy5fZGF0YSkge1xuICAgICAgICAgIHRoaXMuX3NldERhdGEobmV3RGF0YSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KTtcblxuICAgIC8qKlxuICAgICAqIFNldHVwIHRoZSBzY29wZSBvZiBhbiBpbnN0YW5jZSwgd2hpY2ggY29udGFpbnM6XG4gICAgICogLSBvYnNlcnZlZCBkYXRhXG4gICAgICogLSBjb21wdXRlZCBwcm9wZXJ0aWVzXG4gICAgICogLSB1c2VyIG1ldGhvZHNcbiAgICAgKiAtIG1ldGEgcHJvcGVydGllc1xuICAgICAqL1xuXG4gICAgVnVlLnByb3RvdHlwZS5faW5pdFN0YXRlID0gZnVuY3Rpb24gKCkge1xuICAgICAgdGhpcy5faW5pdFByb3BzKCk7XG4gICAgICB0aGlzLl9pbml0TWV0YSgpO1xuICAgICAgdGhpcy5faW5pdE1ldGhvZHMoKTtcbiAgICAgIHRoaXMuX2luaXREYXRhKCk7XG4gICAgICB0aGlzLl9pbml0Q29tcHV0ZWQoKTtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogSW5pdGlhbGl6ZSBwcm9wcy5cbiAgICAgKi9cblxuICAgIFZ1ZS5wcm90b3R5cGUuX2luaXRQcm9wcyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIHZhciBvcHRpb25zID0gdGhpcy4kb3B0aW9ucztcbiAgICAgIHZhciBlbCA9IG9wdGlvbnMuZWw7XG4gICAgICB2YXIgcHJvcHMgPSBvcHRpb25zLnByb3BzO1xuICAgICAgaWYgKHByb3BzICYmICFlbCkge1xuICAgICAgICAnZGV2ZWxvcG1lbnQnICE9PSAncHJvZHVjdGlvbicgJiYgd2FybignUHJvcHMgd2lsbCBub3QgYmUgY29tcGlsZWQgaWYgbm8gYGVsYCBvcHRpb24gaXMgJyArICdwcm92aWRlZCBhdCBpbnN0YW50aWF0aW9uLicsIHRoaXMpO1xuICAgICAgfVxuICAgICAgLy8gbWFrZSBzdXJlIHRvIGNvbnZlcnQgc3RyaW5nIHNlbGVjdG9ycyBpbnRvIGVsZW1lbnQgbm93XG4gICAgICBlbCA9IG9wdGlvbnMuZWwgPSBxdWVyeShlbCk7XG4gICAgICB0aGlzLl9wcm9wc1VubGlua0ZuID0gZWwgJiYgZWwubm9kZVR5cGUgPT09IDEgJiYgcHJvcHNcbiAgICAgIC8vIHByb3BzIG11c3QgYmUgbGlua2VkIGluIHByb3BlciBzY29wZSBpZiBpbnNpZGUgdi1mb3JcbiAgICAgID8gY29tcGlsZUFuZExpbmtQcm9wcyh0aGlzLCBlbCwgcHJvcHMsIHRoaXMuX3Njb3BlKSA6IG51bGw7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIEluaXRpYWxpemUgdGhlIGRhdGEuXG4gICAgICovXG5cbiAgICBWdWUucHJvdG90eXBlLl9pbml0RGF0YSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIHZhciBkYXRhRm4gPSB0aGlzLiRvcHRpb25zLmRhdGE7XG4gICAgICB2YXIgZGF0YSA9IHRoaXMuX2RhdGEgPSBkYXRhRm4gPyBkYXRhRm4oKSA6IHt9O1xuICAgICAgaWYgKCFpc1BsYWluT2JqZWN0KGRhdGEpKSB7XG4gICAgICAgIGRhdGEgPSB7fTtcbiAgICAgICAgJ2RldmVsb3BtZW50JyAhPT0gJ3Byb2R1Y3Rpb24nICYmIHdhcm4oJ2RhdGEgZnVuY3Rpb25zIHNob3VsZCByZXR1cm4gYW4gb2JqZWN0LicsIHRoaXMpO1xuICAgICAgfVxuICAgICAgdmFyIHByb3BzID0gdGhpcy5fcHJvcHM7XG4gICAgICAvLyBwcm94eSBkYXRhIG9uIGluc3RhbmNlXG4gICAgICB2YXIga2V5cyA9IE9iamVjdC5rZXlzKGRhdGEpO1xuICAgICAgdmFyIGksIGtleTtcbiAgICAgIGkgPSBrZXlzLmxlbmd0aDtcbiAgICAgIHdoaWxlIChpLS0pIHtcbiAgICAgICAga2V5ID0ga2V5c1tpXTtcbiAgICAgICAgLy8gdGhlcmUgYXJlIHR3byBzY2VuYXJpb3Mgd2hlcmUgd2UgY2FuIHByb3h5IGEgZGF0YSBrZXk6XG4gICAgICAgIC8vIDEuIGl0J3Mgbm90IGFscmVhZHkgZGVmaW5lZCBhcyBhIHByb3BcbiAgICAgICAgLy8gMi4gaXQncyBwcm92aWRlZCB2aWEgYSBpbnN0YW50aWF0aW9uIG9wdGlvbiBBTkQgdGhlcmUgYXJlIG5vXG4gICAgICAgIC8vICAgIHRlbXBsYXRlIHByb3AgcHJlc2VudFxuICAgICAgICBpZiAoIXByb3BzIHx8ICFoYXNPd24ocHJvcHMsIGtleSkpIHtcbiAgICAgICAgICB0aGlzLl9wcm94eShrZXkpO1xuICAgICAgICB9IGVsc2UgaWYgKCdkZXZlbG9wbWVudCcgIT09ICdwcm9kdWN0aW9uJykge1xuICAgICAgICAgIHdhcm4oJ0RhdGEgZmllbGQgXCInICsga2V5ICsgJ1wiIGlzIGFscmVhZHkgZGVmaW5lZCAnICsgJ2FzIGEgcHJvcC4gVG8gcHJvdmlkZSBkZWZhdWx0IHZhbHVlIGZvciBhIHByb3AsIHVzZSB0aGUgXCJkZWZhdWx0XCIgJyArICdwcm9wIG9wdGlvbjsgaWYgeW91IHdhbnQgdG8gcGFzcyBwcm9wIHZhbHVlcyB0byBhbiBpbnN0YW50aWF0aW9uICcgKyAnY2FsbCwgdXNlIHRoZSBcInByb3BzRGF0YVwiIG9wdGlvbi4nLCB0aGlzKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgLy8gb2JzZXJ2ZSBkYXRhXG4gICAgICBvYnNlcnZlKGRhdGEsIHRoaXMpO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBTd2FwIHRoZSBpbnN0YW5jZSdzICRkYXRhLiBDYWxsZWQgaW4gJGRhdGEncyBzZXR0ZXIuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gbmV3RGF0YVxuICAgICAqL1xuXG4gICAgVnVlLnByb3RvdHlwZS5fc2V0RGF0YSA9IGZ1bmN0aW9uIChuZXdEYXRhKSB7XG4gICAgICBuZXdEYXRhID0gbmV3RGF0YSB8fCB7fTtcbiAgICAgIHZhciBvbGREYXRhID0gdGhpcy5fZGF0YTtcbiAgICAgIHRoaXMuX2RhdGEgPSBuZXdEYXRhO1xuICAgICAgdmFyIGtleXMsIGtleSwgaTtcbiAgICAgIC8vIHVucHJveHkga2V5cyBub3QgcHJlc2VudCBpbiBuZXcgZGF0YVxuICAgICAga2V5cyA9IE9iamVjdC5rZXlzKG9sZERhdGEpO1xuICAgICAgaSA9IGtleXMubGVuZ3RoO1xuICAgICAgd2hpbGUgKGktLSkge1xuICAgICAgICBrZXkgPSBrZXlzW2ldO1xuICAgICAgICBpZiAoIShrZXkgaW4gbmV3RGF0YSkpIHtcbiAgICAgICAgICB0aGlzLl91bnByb3h5KGtleSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIC8vIHByb3h5IGtleXMgbm90IGFscmVhZHkgcHJveGllZCxcbiAgICAgIC8vIGFuZCB0cmlnZ2VyIGNoYW5nZSBmb3IgY2hhbmdlZCB2YWx1ZXNcbiAgICAgIGtleXMgPSBPYmplY3Qua2V5cyhuZXdEYXRhKTtcbiAgICAgIGkgPSBrZXlzLmxlbmd0aDtcbiAgICAgIHdoaWxlIChpLS0pIHtcbiAgICAgICAga2V5ID0ga2V5c1tpXTtcbiAgICAgICAgaWYgKCFoYXNPd24odGhpcywga2V5KSkge1xuICAgICAgICAgIC8vIG5ldyBwcm9wZXJ0eVxuICAgICAgICAgIHRoaXMuX3Byb3h5KGtleSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIG9sZERhdGEuX19vYl9fLnJlbW92ZVZtKHRoaXMpO1xuICAgICAgb2JzZXJ2ZShuZXdEYXRhLCB0aGlzKTtcbiAgICAgIHRoaXMuX2RpZ2VzdCgpO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBQcm94eSBhIHByb3BlcnR5LCBzbyB0aGF0XG4gICAgICogdm0ucHJvcCA9PT0gdm0uX2RhdGEucHJvcFxuICAgICAqXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IGtleVxuICAgICAqL1xuXG4gICAgVnVlLnByb3RvdHlwZS5fcHJveHkgPSBmdW5jdGlvbiAoa2V5KSB7XG4gICAgICBpZiAoIWlzUmVzZXJ2ZWQoa2V5KSkge1xuICAgICAgICAvLyBuZWVkIHRvIHN0b3JlIHJlZiB0byBzZWxmIGhlcmVcbiAgICAgICAgLy8gYmVjYXVzZSB0aGVzZSBnZXR0ZXIvc2V0dGVycyBtaWdodFxuICAgICAgICAvLyBiZSBjYWxsZWQgYnkgY2hpbGQgc2NvcGVzIHZpYVxuICAgICAgICAvLyBwcm90b3R5cGUgaW5oZXJpdGFuY2UuXG4gICAgICAgIHZhciBzZWxmID0gdGhpcztcbiAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHNlbGYsIGtleSwge1xuICAgICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiAgICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgICAgIGdldDogZnVuY3Rpb24gcHJveHlHZXR0ZXIoKSB7XG4gICAgICAgICAgICByZXR1cm4gc2VsZi5fZGF0YVtrZXldO1xuICAgICAgICAgIH0sXG4gICAgICAgICAgc2V0OiBmdW5jdGlvbiBwcm94eVNldHRlcih2YWwpIHtcbiAgICAgICAgICAgIHNlbGYuX2RhdGFba2V5XSA9IHZhbDtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBVbnByb3h5IGEgcHJvcGVydHkuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30ga2V5XG4gICAgICovXG5cbiAgICBWdWUucHJvdG90eXBlLl91bnByb3h5ID0gZnVuY3Rpb24gKGtleSkge1xuICAgICAgaWYgKCFpc1Jlc2VydmVkKGtleSkpIHtcbiAgICAgICAgZGVsZXRlIHRoaXNba2V5XTtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogRm9yY2UgdXBkYXRlIG9uIGV2ZXJ5IHdhdGNoZXIgaW4gc2NvcGUuXG4gICAgICovXG5cbiAgICBWdWUucHJvdG90eXBlLl9kaWdlc3QgPSBmdW5jdGlvbiAoKSB7XG4gICAgICBmb3IgKHZhciBpID0gMCwgbCA9IHRoaXMuX3dhdGNoZXJzLmxlbmd0aDsgaSA8IGw7IGkrKykge1xuICAgICAgICB0aGlzLl93YXRjaGVyc1tpXS51cGRhdGUodHJ1ZSk7IC8vIHNoYWxsb3cgdXBkYXRlc1xuICAgICAgfVxuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBTZXR1cCBjb21wdXRlZCBwcm9wZXJ0aWVzLiBUaGV5IGFyZSBlc3NlbnRpYWxseVxuICAgICAqIHNwZWNpYWwgZ2V0dGVyL3NldHRlcnNcbiAgICAgKi9cblxuICAgIGZ1bmN0aW9uIG5vb3AoKSB7fVxuICAgIFZ1ZS5wcm90b3R5cGUuX2luaXRDb21wdXRlZCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIHZhciBjb21wdXRlZCA9IHRoaXMuJG9wdGlvbnMuY29tcHV0ZWQ7XG4gICAgICBpZiAoY29tcHV0ZWQpIHtcbiAgICAgICAgZm9yICh2YXIga2V5IGluIGNvbXB1dGVkKSB7XG4gICAgICAgICAgdmFyIHVzZXJEZWYgPSBjb21wdXRlZFtrZXldO1xuICAgICAgICAgIHZhciBkZWYgPSB7XG4gICAgICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXG4gICAgICAgICAgfTtcbiAgICAgICAgICBpZiAodHlwZW9mIHVzZXJEZWYgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIGRlZi5nZXQgPSBtYWtlQ29tcHV0ZWRHZXR0ZXIodXNlckRlZiwgdGhpcyk7XG4gICAgICAgICAgICBkZWYuc2V0ID0gbm9vcDtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZGVmLmdldCA9IHVzZXJEZWYuZ2V0ID8gdXNlckRlZi5jYWNoZSAhPT0gZmFsc2UgPyBtYWtlQ29tcHV0ZWRHZXR0ZXIodXNlckRlZi5nZXQsIHRoaXMpIDogYmluZCh1c2VyRGVmLmdldCwgdGhpcykgOiBub29wO1xuICAgICAgICAgICAgZGVmLnNldCA9IHVzZXJEZWYuc2V0ID8gYmluZCh1c2VyRGVmLnNldCwgdGhpcykgOiBub29wO1xuICAgICAgICAgIH1cbiAgICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkodGhpcywga2V5LCBkZWYpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfTtcblxuICAgIGZ1bmN0aW9uIG1ha2VDb21wdXRlZEdldHRlcihnZXR0ZXIsIG93bmVyKSB7XG4gICAgICB2YXIgd2F0Y2hlciA9IG5ldyBXYXRjaGVyKG93bmVyLCBnZXR0ZXIsIG51bGwsIHtcbiAgICAgICAgbGF6eTogdHJ1ZVxuICAgICAgfSk7XG4gICAgICByZXR1cm4gZnVuY3Rpb24gY29tcHV0ZWRHZXR0ZXIoKSB7XG4gICAgICAgIGlmICh3YXRjaGVyLmRpcnR5KSB7XG4gICAgICAgICAgd2F0Y2hlci5ldmFsdWF0ZSgpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChEZXAudGFyZ2V0KSB7XG4gICAgICAgICAgd2F0Y2hlci5kZXBlbmQoKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gd2F0Y2hlci52YWx1ZTtcbiAgICAgIH07XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogU2V0dXAgaW5zdGFuY2UgbWV0aG9kcy4gTWV0aG9kcyBtdXN0IGJlIGJvdW5kIHRvIHRoZVxuICAgICAqIGluc3RhbmNlIHNpbmNlIHRoZXkgbWlnaHQgYmUgcGFzc2VkIGRvd24gYXMgYSBwcm9wIHRvXG4gICAgICogY2hpbGQgY29tcG9uZW50cy5cbiAgICAgKi9cblxuICAgIFZ1ZS5wcm90b3R5cGUuX2luaXRNZXRob2RzID0gZnVuY3Rpb24gKCkge1xuICAgICAgdmFyIG1ldGhvZHMgPSB0aGlzLiRvcHRpb25zLm1ldGhvZHM7XG4gICAgICBpZiAobWV0aG9kcykge1xuICAgICAgICBmb3IgKHZhciBrZXkgaW4gbWV0aG9kcykge1xuICAgICAgICAgIHRoaXNba2V5XSA9IGJpbmQobWV0aG9kc1trZXldLCB0aGlzKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBJbml0aWFsaXplIG1ldGEgaW5mb3JtYXRpb24gbGlrZSAkaW5kZXgsICRrZXkgJiAkdmFsdWUuXG4gICAgICovXG5cbiAgICBWdWUucHJvdG90eXBlLl9pbml0TWV0YSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIHZhciBtZXRhcyA9IHRoaXMuJG9wdGlvbnMuX21ldGE7XG4gICAgICBpZiAobWV0YXMpIHtcbiAgICAgICAgZm9yICh2YXIga2V5IGluIG1ldGFzKSB7XG4gICAgICAgICAgZGVmaW5lUmVhY3RpdmUodGhpcywga2V5LCBtZXRhc1trZXldKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH07XG4gIH1cblxuICB2YXIgZXZlbnRSRSA9IC9edi1vbjp8XkAvO1xuXG4gIGZ1bmN0aW9uIGV2ZW50c01peGluIChWdWUpIHtcbiAgICAvKipcbiAgICAgKiBTZXR1cCB0aGUgaW5zdGFuY2UncyBvcHRpb24gZXZlbnRzICYgd2F0Y2hlcnMuXG4gICAgICogSWYgdGhlIHZhbHVlIGlzIGEgc3RyaW5nLCB3ZSBwdWxsIGl0IGZyb20gdGhlXG4gICAgICogaW5zdGFuY2UncyBtZXRob2RzIGJ5IG5hbWUuXG4gICAgICovXG5cbiAgICBWdWUucHJvdG90eXBlLl9pbml0RXZlbnRzID0gZnVuY3Rpb24gKCkge1xuICAgICAgdmFyIG9wdGlvbnMgPSB0aGlzLiRvcHRpb25zO1xuICAgICAgaWYgKG9wdGlvbnMuX2FzQ29tcG9uZW50KSB7XG4gICAgICAgIHJlZ2lzdGVyQ29tcG9uZW50RXZlbnRzKHRoaXMsIG9wdGlvbnMuZWwpO1xuICAgICAgfVxuICAgICAgcmVnaXN0ZXJDYWxsYmFja3ModGhpcywgJyRvbicsIG9wdGlvbnMuZXZlbnRzKTtcbiAgICAgIHJlZ2lzdGVyQ2FsbGJhY2tzKHRoaXMsICckd2F0Y2gnLCBvcHRpb25zLndhdGNoKTtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogUmVnaXN0ZXIgdi1vbiBldmVudHMgb24gYSBjaGlsZCBjb21wb25lbnRcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7VnVlfSB2bVxuICAgICAqIEBwYXJhbSB7RWxlbWVudH0gZWxcbiAgICAgKi9cblxuICAgIGZ1bmN0aW9uIHJlZ2lzdGVyQ29tcG9uZW50RXZlbnRzKHZtLCBlbCkge1xuICAgICAgdmFyIGF0dHJzID0gZWwuYXR0cmlidXRlcztcbiAgICAgIHZhciBuYW1lLCB2YWx1ZSwgaGFuZGxlcjtcbiAgICAgIGZvciAodmFyIGkgPSAwLCBsID0gYXR0cnMubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG4gICAgICAgIG5hbWUgPSBhdHRyc1tpXS5uYW1lO1xuICAgICAgICBpZiAoZXZlbnRSRS50ZXN0KG5hbWUpKSB7XG4gICAgICAgICAgbmFtZSA9IG5hbWUucmVwbGFjZShldmVudFJFLCAnJyk7XG4gICAgICAgICAgLy8gZm9yY2UgdGhlIGV4cHJlc3Npb24gaW50byBhIHN0YXRlbWVudCBzbyB0aGF0XG4gICAgICAgICAgLy8gaXQgYWx3YXlzIGR5bmFtaWNhbGx5IHJlc29sdmVzIHRoZSBtZXRob2QgdG8gY2FsbCAoIzI2NzApXG4gICAgICAgICAgLy8ga2luZGEgdWdseSBoYWNrLCBidXQgZG9lcyB0aGUgam9iLlxuICAgICAgICAgIHZhbHVlID0gYXR0cnNbaV0udmFsdWU7XG4gICAgICAgICAgaWYgKGlzU2ltcGxlUGF0aCh2YWx1ZSkpIHtcbiAgICAgICAgICAgIHZhbHVlICs9ICcuYXBwbHkodGhpcywgJGFyZ3VtZW50cyknO1xuICAgICAgICAgIH1cbiAgICAgICAgICBoYW5kbGVyID0gKHZtLl9zY29wZSB8fCB2bS5fY29udGV4dCkuJGV2YWwodmFsdWUsIHRydWUpO1xuICAgICAgICAgIGhhbmRsZXIuX2Zyb21QYXJlbnQgPSB0cnVlO1xuICAgICAgICAgIHZtLiRvbihuYW1lLnJlcGxhY2UoZXZlbnRSRSksIGhhbmRsZXIpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmVnaXN0ZXIgY2FsbGJhY2tzIGZvciBvcHRpb24gZXZlbnRzIGFuZCB3YXRjaGVycy5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7VnVlfSB2bVxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBhY3Rpb25cbiAgICAgKiBAcGFyYW0ge09iamVjdH0gaGFzaFxuICAgICAqL1xuXG4gICAgZnVuY3Rpb24gcmVnaXN0ZXJDYWxsYmFja3Modm0sIGFjdGlvbiwgaGFzaCkge1xuICAgICAgaWYgKCFoYXNoKSByZXR1cm47XG4gICAgICB2YXIgaGFuZGxlcnMsIGtleSwgaSwgajtcbiAgICAgIGZvciAoa2V5IGluIGhhc2gpIHtcbiAgICAgICAgaGFuZGxlcnMgPSBoYXNoW2tleV07XG4gICAgICAgIGlmIChpc0FycmF5KGhhbmRsZXJzKSkge1xuICAgICAgICAgIGZvciAoaSA9IDAsIGogPSBoYW5kbGVycy5sZW5ndGg7IGkgPCBqOyBpKyspIHtcbiAgICAgICAgICAgIHJlZ2lzdGVyKHZtLCBhY3Rpb24sIGtleSwgaGFuZGxlcnNbaV0pO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZWdpc3Rlcih2bSwgYWN0aW9uLCBrZXksIGhhbmRsZXJzKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEhlbHBlciB0byByZWdpc3RlciBhbiBldmVudC93YXRjaCBjYWxsYmFjay5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7VnVlfSB2bVxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBhY3Rpb25cbiAgICAgKiBAcGFyYW0ge1N0cmluZ30ga2V5XG4gICAgICogQHBhcmFtIHtGdW5jdGlvbnxTdHJpbmd8T2JqZWN0fSBoYW5kbGVyXG4gICAgICogQHBhcmFtIHtPYmplY3R9IFtvcHRpb25zXVxuICAgICAqL1xuXG4gICAgZnVuY3Rpb24gcmVnaXN0ZXIodm0sIGFjdGlvbiwga2V5LCBoYW5kbGVyLCBvcHRpb25zKSB7XG4gICAgICB2YXIgdHlwZSA9IHR5cGVvZiBoYW5kbGVyO1xuICAgICAgaWYgKHR5cGUgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgdm1bYWN0aW9uXShrZXksIGhhbmRsZXIsIG9wdGlvbnMpO1xuICAgICAgfSBlbHNlIGlmICh0eXBlID09PSAnc3RyaW5nJykge1xuICAgICAgICB2YXIgbWV0aG9kcyA9IHZtLiRvcHRpb25zLm1ldGhvZHM7XG4gICAgICAgIHZhciBtZXRob2QgPSBtZXRob2RzICYmIG1ldGhvZHNbaGFuZGxlcl07XG4gICAgICAgIGlmIChtZXRob2QpIHtcbiAgICAgICAgICB2bVthY3Rpb25dKGtleSwgbWV0aG9kLCBvcHRpb25zKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAnZGV2ZWxvcG1lbnQnICE9PSAncHJvZHVjdGlvbicgJiYgd2FybignVW5rbm93biBtZXRob2Q6IFwiJyArIGhhbmRsZXIgKyAnXCIgd2hlbiAnICsgJ3JlZ2lzdGVyaW5nIGNhbGxiYWNrIGZvciAnICsgYWN0aW9uICsgJzogXCInICsga2V5ICsgJ1wiLicsIHZtKTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIGlmIChoYW5kbGVyICYmIHR5cGUgPT09ICdvYmplY3QnKSB7XG4gICAgICAgIHJlZ2lzdGVyKHZtLCBhY3Rpb24sIGtleSwgaGFuZGxlci5oYW5kbGVyLCBoYW5kbGVyKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBTZXR1cCByZWN1cnNpdmUgYXR0YWNoZWQvZGV0YWNoZWQgY2FsbHNcbiAgICAgKi9cblxuICAgIFZ1ZS5wcm90b3R5cGUuX2luaXRET01Ib29rcyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIHRoaXMuJG9uKCdob29rOmF0dGFjaGVkJywgb25BdHRhY2hlZCk7XG4gICAgICB0aGlzLiRvbignaG9vazpkZXRhY2hlZCcsIG9uRGV0YWNoZWQpO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBDYWxsYmFjayB0byByZWN1cnNpdmVseSBjYWxsIGF0dGFjaGVkIGhvb2sgb24gY2hpbGRyZW5cbiAgICAgKi9cblxuICAgIGZ1bmN0aW9uIG9uQXR0YWNoZWQoKSB7XG4gICAgICBpZiAoIXRoaXMuX2lzQXR0YWNoZWQpIHtcbiAgICAgICAgdGhpcy5faXNBdHRhY2hlZCA9IHRydWU7XG4gICAgICAgIHRoaXMuJGNoaWxkcmVuLmZvckVhY2goY2FsbEF0dGFjaCk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogSXRlcmF0b3IgdG8gY2FsbCBhdHRhY2hlZCBob29rXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge1Z1ZX0gY2hpbGRcbiAgICAgKi9cblxuICAgIGZ1bmN0aW9uIGNhbGxBdHRhY2goY2hpbGQpIHtcbiAgICAgIGlmICghY2hpbGQuX2lzQXR0YWNoZWQgJiYgaW5Eb2MoY2hpbGQuJGVsKSkge1xuICAgICAgICBjaGlsZC5fY2FsbEhvb2soJ2F0dGFjaGVkJyk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ2FsbGJhY2sgdG8gcmVjdXJzaXZlbHkgY2FsbCBkZXRhY2hlZCBob29rIG9uIGNoaWxkcmVuXG4gICAgICovXG5cbiAgICBmdW5jdGlvbiBvbkRldGFjaGVkKCkge1xuICAgICAgaWYgKHRoaXMuX2lzQXR0YWNoZWQpIHtcbiAgICAgICAgdGhpcy5faXNBdHRhY2hlZCA9IGZhbHNlO1xuICAgICAgICB0aGlzLiRjaGlsZHJlbi5mb3JFYWNoKGNhbGxEZXRhY2gpO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEl0ZXJhdG9yIHRvIGNhbGwgZGV0YWNoZWQgaG9va1xuICAgICAqXG4gICAgICogQHBhcmFtIHtWdWV9IGNoaWxkXG4gICAgICovXG5cbiAgICBmdW5jdGlvbiBjYWxsRGV0YWNoKGNoaWxkKSB7XG4gICAgICBpZiAoY2hpbGQuX2lzQXR0YWNoZWQgJiYgIWluRG9jKGNoaWxkLiRlbCkpIHtcbiAgICAgICAgY2hpbGQuX2NhbGxIb29rKCdkZXRhY2hlZCcpO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFRyaWdnZXIgYWxsIGhhbmRsZXJzIGZvciBhIGhvb2tcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBob29rXG4gICAgICovXG5cbiAgICBWdWUucHJvdG90eXBlLl9jYWxsSG9vayA9IGZ1bmN0aW9uIChob29rKSB7XG4gICAgICB0aGlzLiRlbWl0KCdwcmUtaG9vazonICsgaG9vayk7XG4gICAgICB2YXIgaGFuZGxlcnMgPSB0aGlzLiRvcHRpb25zW2hvb2tdO1xuICAgICAgaWYgKGhhbmRsZXJzKSB7XG4gICAgICAgIGZvciAodmFyIGkgPSAwLCBqID0gaGFuZGxlcnMubGVuZ3RoOyBpIDwgajsgaSsrKSB7XG4gICAgICAgICAgaGFuZGxlcnNbaV0uY2FsbCh0aGlzKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgdGhpcy4kZW1pdCgnaG9vazonICsgaG9vayk7XG4gICAgfTtcbiAgfVxuXG4gIGZ1bmN0aW9uIG5vb3AoKSB7fVxuXG4gIC8qKlxuICAgKiBBIGRpcmVjdGl2ZSBsaW5rcyBhIERPTSBlbGVtZW50IHdpdGggYSBwaWVjZSBvZiBkYXRhLFxuICAgKiB3aGljaCBpcyB0aGUgcmVzdWx0IG9mIGV2YWx1YXRpbmcgYW4gZXhwcmVzc2lvbi5cbiAgICogSXQgcmVnaXN0ZXJzIGEgd2F0Y2hlciB3aXRoIHRoZSBleHByZXNzaW9uIGFuZCBjYWxsc1xuICAgKiB0aGUgRE9NIHVwZGF0ZSBmdW5jdGlvbiB3aGVuIGEgY2hhbmdlIGlzIHRyaWdnZXJlZC5cbiAgICpcbiAgICogQHBhcmFtIHtPYmplY3R9IGRlc2NyaXB0b3JcbiAgICogICAgICAgICAgICAgICAgIC0ge1N0cmluZ30gbmFtZVxuICAgKiAgICAgICAgICAgICAgICAgLSB7T2JqZWN0fSBkZWZcbiAgICogICAgICAgICAgICAgICAgIC0ge1N0cmluZ30gZXhwcmVzc2lvblxuICAgKiAgICAgICAgICAgICAgICAgLSB7QXJyYXk8T2JqZWN0Pn0gW2ZpbHRlcnNdXG4gICAqICAgICAgICAgICAgICAgICAtIHtPYmplY3R9IFttb2RpZmllcnNdXG4gICAqICAgICAgICAgICAgICAgICAtIHtCb29sZWFufSBsaXRlcmFsXG4gICAqICAgICAgICAgICAgICAgICAtIHtTdHJpbmd9IGF0dHJcbiAgICogICAgICAgICAgICAgICAgIC0ge1N0cmluZ30gYXJnXG4gICAqICAgICAgICAgICAgICAgICAtIHtTdHJpbmd9IHJhd1xuICAgKiAgICAgICAgICAgICAgICAgLSB7U3RyaW5nfSBbcmVmXVxuICAgKiAgICAgICAgICAgICAgICAgLSB7QXJyYXk8T2JqZWN0Pn0gW2ludGVycF1cbiAgICogICAgICAgICAgICAgICAgIC0ge0Jvb2xlYW59IFtoYXNPbmVUaW1lXVxuICAgKiBAcGFyYW0ge1Z1ZX0gdm1cbiAgICogQHBhcmFtIHtOb2RlfSBlbFxuICAgKiBAcGFyYW0ge1Z1ZX0gW2hvc3RdIC0gdHJhbnNjbHVzaW9uIGhvc3QgY29tcG9uZW50XG4gICAqIEBwYXJhbSB7T2JqZWN0fSBbc2NvcGVdIC0gdi1mb3Igc2NvcGVcbiAgICogQHBhcmFtIHtGcmFnbWVudH0gW2ZyYWddIC0gb3duZXIgZnJhZ21lbnRcbiAgICogQGNvbnN0cnVjdG9yXG4gICAqL1xuICBmdW5jdGlvbiBEaXJlY3RpdmUoZGVzY3JpcHRvciwgdm0sIGVsLCBob3N0LCBzY29wZSwgZnJhZykge1xuICAgIHRoaXMudm0gPSB2bTtcbiAgICB0aGlzLmVsID0gZWw7XG4gICAgLy8gY29weSBkZXNjcmlwdG9yIHByb3BlcnRpZXNcbiAgICB0aGlzLmRlc2NyaXB0b3IgPSBkZXNjcmlwdG9yO1xuICAgIHRoaXMubmFtZSA9IGRlc2NyaXB0b3IubmFtZTtcbiAgICB0aGlzLmV4cHJlc3Npb24gPSBkZXNjcmlwdG9yLmV4cHJlc3Npb247XG4gICAgdGhpcy5hcmcgPSBkZXNjcmlwdG9yLmFyZztcbiAgICB0aGlzLm1vZGlmaWVycyA9IGRlc2NyaXB0b3IubW9kaWZpZXJzO1xuICAgIHRoaXMuZmlsdGVycyA9IGRlc2NyaXB0b3IuZmlsdGVycztcbiAgICB0aGlzLmxpdGVyYWwgPSB0aGlzLm1vZGlmaWVycyAmJiB0aGlzLm1vZGlmaWVycy5saXRlcmFsO1xuICAgIC8vIHByaXZhdGVcbiAgICB0aGlzLl9sb2NrZWQgPSBmYWxzZTtcbiAgICB0aGlzLl9ib3VuZCA9IGZhbHNlO1xuICAgIHRoaXMuX2xpc3RlbmVycyA9IG51bGw7XG4gICAgLy8gbGluayBjb250ZXh0XG4gICAgdGhpcy5faG9zdCA9IGhvc3Q7XG4gICAgdGhpcy5fc2NvcGUgPSBzY29wZTtcbiAgICB0aGlzLl9mcmFnID0gZnJhZztcbiAgICAvLyBzdG9yZSBkaXJlY3RpdmVzIG9uIG5vZGUgaW4gZGV2IG1vZGVcbiAgICBpZiAoJ2RldmVsb3BtZW50JyAhPT0gJ3Byb2R1Y3Rpb24nICYmIHRoaXMuZWwpIHtcbiAgICAgIHRoaXMuZWwuX3Z1ZV9kaXJlY3RpdmVzID0gdGhpcy5lbC5fdnVlX2RpcmVjdGl2ZXMgfHwgW107XG4gICAgICB0aGlzLmVsLl92dWVfZGlyZWN0aXZlcy5wdXNoKHRoaXMpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBJbml0aWFsaXplIHRoZSBkaXJlY3RpdmUsIG1peGluIGRlZmluaXRpb24gcHJvcGVydGllcyxcbiAgICogc2V0dXAgdGhlIHdhdGNoZXIsIGNhbGwgZGVmaW5pdGlvbiBiaW5kKCkgYW5kIHVwZGF0ZSgpXG4gICAqIGlmIHByZXNlbnQuXG4gICAqL1xuXG4gIERpcmVjdGl2ZS5wcm90b3R5cGUuX2JpbmQgPSBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIG5hbWUgPSB0aGlzLm5hbWU7XG4gICAgdmFyIGRlc2NyaXB0b3IgPSB0aGlzLmRlc2NyaXB0b3I7XG5cbiAgICAvLyByZW1vdmUgYXR0cmlidXRlXG4gICAgaWYgKChuYW1lICE9PSAnY2xvYWsnIHx8IHRoaXMudm0uX2lzQ29tcGlsZWQpICYmIHRoaXMuZWwgJiYgdGhpcy5lbC5yZW1vdmVBdHRyaWJ1dGUpIHtcbiAgICAgIHZhciBhdHRyID0gZGVzY3JpcHRvci5hdHRyIHx8ICd2LScgKyBuYW1lO1xuICAgICAgdGhpcy5lbC5yZW1vdmVBdHRyaWJ1dGUoYXR0cik7XG4gICAgfVxuXG4gICAgLy8gY29weSBkZWYgcHJvcGVydGllc1xuICAgIHZhciBkZWYgPSBkZXNjcmlwdG9yLmRlZjtcbiAgICBpZiAodHlwZW9mIGRlZiA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgdGhpcy51cGRhdGUgPSBkZWY7XG4gICAgfSBlbHNlIHtcbiAgICAgIGV4dGVuZCh0aGlzLCBkZWYpO1xuICAgIH1cblxuICAgIC8vIHNldHVwIGRpcmVjdGl2ZSBwYXJhbXNcbiAgICB0aGlzLl9zZXR1cFBhcmFtcygpO1xuXG4gICAgLy8gaW5pdGlhbCBiaW5kXG4gICAgaWYgKHRoaXMuYmluZCkge1xuICAgICAgdGhpcy5iaW5kKCk7XG4gICAgfVxuICAgIHRoaXMuX2JvdW5kID0gdHJ1ZTtcblxuICAgIGlmICh0aGlzLmxpdGVyYWwpIHtcbiAgICAgIHRoaXMudXBkYXRlICYmIHRoaXMudXBkYXRlKGRlc2NyaXB0b3IucmF3KTtcbiAgICB9IGVsc2UgaWYgKCh0aGlzLmV4cHJlc3Npb24gfHwgdGhpcy5tb2RpZmllcnMpICYmICh0aGlzLnVwZGF0ZSB8fCB0aGlzLnR3b1dheSkgJiYgIXRoaXMuX2NoZWNrU3RhdGVtZW50KCkpIHtcbiAgICAgIC8vIHdyYXBwZWQgdXBkYXRlciBmb3IgY29udGV4dFxuICAgICAgdmFyIGRpciA9IHRoaXM7XG4gICAgICBpZiAodGhpcy51cGRhdGUpIHtcbiAgICAgICAgdGhpcy5fdXBkYXRlID0gZnVuY3Rpb24gKHZhbCwgb2xkVmFsKSB7XG4gICAgICAgICAgaWYgKCFkaXIuX2xvY2tlZCkge1xuICAgICAgICAgICAgZGlyLnVwZGF0ZSh2YWwsIG9sZFZhbCk7XG4gICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5fdXBkYXRlID0gbm9vcDtcbiAgICAgIH1cbiAgICAgIHZhciBwcmVQcm9jZXNzID0gdGhpcy5fcHJlUHJvY2VzcyA/IGJpbmQodGhpcy5fcHJlUHJvY2VzcywgdGhpcykgOiBudWxsO1xuICAgICAgdmFyIHBvc3RQcm9jZXNzID0gdGhpcy5fcG9zdFByb2Nlc3MgPyBiaW5kKHRoaXMuX3Bvc3RQcm9jZXNzLCB0aGlzKSA6IG51bGw7XG4gICAgICB2YXIgd2F0Y2hlciA9IHRoaXMuX3dhdGNoZXIgPSBuZXcgV2F0Y2hlcih0aGlzLnZtLCB0aGlzLmV4cHJlc3Npb24sIHRoaXMuX3VwZGF0ZSwgLy8gY2FsbGJhY2tcbiAgICAgIHtcbiAgICAgICAgZmlsdGVyczogdGhpcy5maWx0ZXJzLFxuICAgICAgICB0d29XYXk6IHRoaXMudHdvV2F5LFxuICAgICAgICBkZWVwOiB0aGlzLmRlZXAsXG4gICAgICAgIHByZVByb2Nlc3M6IHByZVByb2Nlc3MsXG4gICAgICAgIHBvc3RQcm9jZXNzOiBwb3N0UHJvY2VzcyxcbiAgICAgICAgc2NvcGU6IHRoaXMuX3Njb3BlXG4gICAgICB9KTtcbiAgICAgIC8vIHYtbW9kZWwgd2l0aCBpbml0YWwgaW5saW5lIHZhbHVlIG5lZWQgdG8gc3luYyBiYWNrIHRvXG4gICAgICAvLyBtb2RlbCBpbnN0ZWFkIG9mIHVwZGF0ZSB0byBET00gb24gaW5pdC4gVGhleSB3b3VsZFxuICAgICAgLy8gc2V0IHRoZSBhZnRlckJpbmQgaG9vayB0byBpbmRpY2F0ZSB0aGF0LlxuICAgICAgaWYgKHRoaXMuYWZ0ZXJCaW5kKSB7XG4gICAgICAgIHRoaXMuYWZ0ZXJCaW5kKCk7XG4gICAgICB9IGVsc2UgaWYgKHRoaXMudXBkYXRlKSB7XG4gICAgICAgIHRoaXMudXBkYXRlKHdhdGNoZXIudmFsdWUpO1xuICAgICAgfVxuICAgIH1cbiAgfTtcblxuICAvKipcbiAgICogU2V0dXAgYWxsIHBhcmFtIGF0dHJpYnV0ZXMsIGUuZy4gdHJhY2stYnksXG4gICAqIHRyYW5zaXRpb24tbW9kZSwgZXRjLi4uXG4gICAqL1xuXG4gIERpcmVjdGl2ZS5wcm90b3R5cGUuX3NldHVwUGFyYW1zID0gZnVuY3Rpb24gKCkge1xuICAgIGlmICghdGhpcy5wYXJhbXMpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdmFyIHBhcmFtcyA9IHRoaXMucGFyYW1zO1xuICAgIC8vIHN3YXAgdGhlIHBhcmFtcyBhcnJheSB3aXRoIGEgZnJlc2ggb2JqZWN0LlxuICAgIHRoaXMucGFyYW1zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiAgICB2YXIgaSA9IHBhcmFtcy5sZW5ndGg7XG4gICAgdmFyIGtleSwgdmFsLCBtYXBwZWRLZXk7XG4gICAgd2hpbGUgKGktLSkge1xuICAgICAga2V5ID0gaHlwaGVuYXRlKHBhcmFtc1tpXSk7XG4gICAgICBtYXBwZWRLZXkgPSBjYW1lbGl6ZShrZXkpO1xuICAgICAgdmFsID0gZ2V0QmluZEF0dHIodGhpcy5lbCwga2V5KTtcbiAgICAgIGlmICh2YWwgIT0gbnVsbCkge1xuICAgICAgICAvLyBkeW5hbWljXG4gICAgICAgIHRoaXMuX3NldHVwUGFyYW1XYXRjaGVyKG1hcHBlZEtleSwgdmFsKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIHN0YXRpY1xuICAgICAgICB2YWwgPSBnZXRBdHRyKHRoaXMuZWwsIGtleSk7XG4gICAgICAgIGlmICh2YWwgIT0gbnVsbCkge1xuICAgICAgICAgIHRoaXMucGFyYW1zW21hcHBlZEtleV0gPSB2YWwgPT09ICcnID8gdHJ1ZSA6IHZhbDtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfTtcblxuICAvKipcbiAgICogU2V0dXAgYSB3YXRjaGVyIGZvciBhIGR5bmFtaWMgcGFyYW0uXG4gICAqXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBrZXlcbiAgICogQHBhcmFtIHtTdHJpbmd9IGV4cHJlc3Npb25cbiAgICovXG5cbiAgRGlyZWN0aXZlLnByb3RvdHlwZS5fc2V0dXBQYXJhbVdhdGNoZXIgPSBmdW5jdGlvbiAoa2V5LCBleHByZXNzaW9uKSB7XG4gICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgIHZhciBjYWxsZWQgPSBmYWxzZTtcbiAgICB2YXIgdW53YXRjaCA9ICh0aGlzLl9zY29wZSB8fCB0aGlzLnZtKS4kd2F0Y2goZXhwcmVzc2lvbiwgZnVuY3Rpb24gKHZhbCwgb2xkVmFsKSB7XG4gICAgICBzZWxmLnBhcmFtc1trZXldID0gdmFsO1xuICAgICAgLy8gc2luY2Ugd2UgYXJlIGluIGltbWVkaWF0ZSBtb2RlLFxuICAgICAgLy8gb25seSBjYWxsIHRoZSBwYXJhbSBjaGFuZ2UgY2FsbGJhY2tzIGlmIHRoaXMgaXMgbm90IHRoZSBmaXJzdCB1cGRhdGUuXG4gICAgICBpZiAoY2FsbGVkKSB7XG4gICAgICAgIHZhciBjYiA9IHNlbGYucGFyYW1XYXRjaGVycyAmJiBzZWxmLnBhcmFtV2F0Y2hlcnNba2V5XTtcbiAgICAgICAgaWYgKGNiKSB7XG4gICAgICAgICAgY2IuY2FsbChzZWxmLCB2YWwsIG9sZFZhbCk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNhbGxlZCA9IHRydWU7XG4gICAgICB9XG4gICAgfSwge1xuICAgICAgaW1tZWRpYXRlOiB0cnVlLFxuICAgICAgdXNlcjogZmFsc2VcbiAgICB9KTsodGhpcy5fcGFyYW1VbndhdGNoRm5zIHx8ICh0aGlzLl9wYXJhbVVud2F0Y2hGbnMgPSBbXSkpLnB1c2godW53YXRjaCk7XG4gIH07XG5cbiAgLyoqXG4gICAqIENoZWNrIGlmIHRoZSBkaXJlY3RpdmUgaXMgYSBmdW5jdGlvbiBjYWxsZXJcbiAgICogYW5kIGlmIHRoZSBleHByZXNzaW9uIGlzIGEgY2FsbGFibGUgb25lLiBJZiBib3RoIHRydWUsXG4gICAqIHdlIHdyYXAgdXAgdGhlIGV4cHJlc3Npb24gYW5kIHVzZSBpdCBhcyB0aGUgZXZlbnRcbiAgICogaGFuZGxlci5cbiAgICpcbiAgICogZS5nLiBvbi1jbGljaz1cImErK1wiXG4gICAqXG4gICAqIEByZXR1cm4ge0Jvb2xlYW59XG4gICAqL1xuXG4gIERpcmVjdGl2ZS5wcm90b3R5cGUuX2NoZWNrU3RhdGVtZW50ID0gZnVuY3Rpb24gKCkge1xuICAgIHZhciBleHByZXNzaW9uID0gdGhpcy5leHByZXNzaW9uO1xuICAgIGlmIChleHByZXNzaW9uICYmIHRoaXMuYWNjZXB0U3RhdGVtZW50ICYmICFpc1NpbXBsZVBhdGgoZXhwcmVzc2lvbikpIHtcbiAgICAgIHZhciBmbiA9IHBhcnNlRXhwcmVzc2lvbihleHByZXNzaW9uKS5nZXQ7XG4gICAgICB2YXIgc2NvcGUgPSB0aGlzLl9zY29wZSB8fCB0aGlzLnZtO1xuICAgICAgdmFyIGhhbmRsZXIgPSBmdW5jdGlvbiBoYW5kbGVyKGUpIHtcbiAgICAgICAgc2NvcGUuJGV2ZW50ID0gZTtcbiAgICAgICAgZm4uY2FsbChzY29wZSwgc2NvcGUpO1xuICAgICAgICBzY29wZS4kZXZlbnQgPSBudWxsO1xuICAgICAgfTtcbiAgICAgIGlmICh0aGlzLmZpbHRlcnMpIHtcbiAgICAgICAgaGFuZGxlciA9IHNjb3BlLl9hcHBseUZpbHRlcnMoaGFuZGxlciwgbnVsbCwgdGhpcy5maWx0ZXJzKTtcbiAgICAgIH1cbiAgICAgIHRoaXMudXBkYXRlKGhhbmRsZXIpO1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICB9O1xuXG4gIC8qKlxuICAgKiBTZXQgdGhlIGNvcnJlc3BvbmRpbmcgdmFsdWUgd2l0aCB0aGUgc2V0dGVyLlxuICAgKiBUaGlzIHNob3VsZCBvbmx5IGJlIHVzZWQgaW4gdHdvLXdheSBkaXJlY3RpdmVzXG4gICAqIGUuZy4gdi1tb2RlbC5cbiAgICpcbiAgICogQHBhcmFtIHsqfSB2YWx1ZVxuICAgKiBAcHVibGljXG4gICAqL1xuXG4gIERpcmVjdGl2ZS5wcm90b3R5cGUuc2V0ID0gZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgLyogaXN0YW5idWwgaWdub3JlIGVsc2UgKi9cbiAgICBpZiAodGhpcy50d29XYXkpIHtcbiAgICAgIHRoaXMuX3dpdGhMb2NrKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdGhpcy5fd2F0Y2hlci5zZXQodmFsdWUpO1xuICAgICAgfSk7XG4gICAgfSBlbHNlIGlmICgnZGV2ZWxvcG1lbnQnICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICAgIHdhcm4oJ0RpcmVjdGl2ZS5zZXQoKSBjYW4gb25seSBiZSB1c2VkIGluc2lkZSB0d29XYXknICsgJ2RpcmVjdGl2ZXMuJyk7XG4gICAgfVxuICB9O1xuXG4gIC8qKlxuICAgKiBFeGVjdXRlIGEgZnVuY3Rpb24gd2hpbGUgcHJldmVudGluZyB0aGF0IGZ1bmN0aW9uIGZyb21cbiAgICogdHJpZ2dlcmluZyB1cGRhdGVzIG9uIHRoaXMgZGlyZWN0aXZlIGluc3RhbmNlLlxuICAgKlxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBmblxuICAgKi9cblxuICBEaXJlY3RpdmUucHJvdG90eXBlLl93aXRoTG9jayA9IGZ1bmN0aW9uIChmbikge1xuICAgIHZhciBzZWxmID0gdGhpcztcbiAgICBzZWxmLl9sb2NrZWQgPSB0cnVlO1xuICAgIGZuLmNhbGwoc2VsZik7XG4gICAgbmV4dFRpY2soZnVuY3Rpb24gKCkge1xuICAgICAgc2VsZi5fbG9ja2VkID0gZmFsc2U7XG4gICAgfSk7XG4gIH07XG5cbiAgLyoqXG4gICAqIENvbnZlbmllbmNlIG1ldGhvZCB0aGF0IGF0dGFjaGVzIGEgRE9NIGV2ZW50IGxpc3RlbmVyXG4gICAqIHRvIHRoZSBkaXJlY3RpdmUgZWxlbWVudCBhbmQgYXV0b21ldGljYWxseSB0ZWFycyBpdCBkb3duXG4gICAqIGR1cmluZyB1bmJpbmQuXG4gICAqXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBldmVudFxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBoYW5kbGVyXG4gICAqIEBwYXJhbSB7Qm9vbGVhbn0gW3VzZUNhcHR1cmVdXG4gICAqL1xuXG4gIERpcmVjdGl2ZS5wcm90b3R5cGUub24gPSBmdW5jdGlvbiAoZXZlbnQsIGhhbmRsZXIsIHVzZUNhcHR1cmUpIHtcbiAgICBvbih0aGlzLmVsLCBldmVudCwgaGFuZGxlciwgdXNlQ2FwdHVyZSk7KHRoaXMuX2xpc3RlbmVycyB8fCAodGhpcy5fbGlzdGVuZXJzID0gW10pKS5wdXNoKFtldmVudCwgaGFuZGxlcl0pO1xuICB9O1xuXG4gIC8qKlxuICAgKiBUZWFyZG93biB0aGUgd2F0Y2hlciBhbmQgY2FsbCB1bmJpbmQuXG4gICAqL1xuXG4gIERpcmVjdGl2ZS5wcm90b3R5cGUuX3RlYXJkb3duID0gZnVuY3Rpb24gKCkge1xuICAgIGlmICh0aGlzLl9ib3VuZCkge1xuICAgICAgdGhpcy5fYm91bmQgPSBmYWxzZTtcbiAgICAgIGlmICh0aGlzLnVuYmluZCkge1xuICAgICAgICB0aGlzLnVuYmluZCgpO1xuICAgICAgfVxuICAgICAgaWYgKHRoaXMuX3dhdGNoZXIpIHtcbiAgICAgICAgdGhpcy5fd2F0Y2hlci50ZWFyZG93bigpO1xuICAgICAgfVxuICAgICAgdmFyIGxpc3RlbmVycyA9IHRoaXMuX2xpc3RlbmVycztcbiAgICAgIHZhciBpO1xuICAgICAgaWYgKGxpc3RlbmVycykge1xuICAgICAgICBpID0gbGlzdGVuZXJzLmxlbmd0aDtcbiAgICAgICAgd2hpbGUgKGktLSkge1xuICAgICAgICAgIG9mZih0aGlzLmVsLCBsaXN0ZW5lcnNbaV1bMF0sIGxpc3RlbmVyc1tpXVsxXSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHZhciB1bndhdGNoRm5zID0gdGhpcy5fcGFyYW1VbndhdGNoRm5zO1xuICAgICAgaWYgKHVud2F0Y2hGbnMpIHtcbiAgICAgICAgaSA9IHVud2F0Y2hGbnMubGVuZ3RoO1xuICAgICAgICB3aGlsZSAoaS0tKSB7XG4gICAgICAgICAgdW53YXRjaEZuc1tpXSgpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAoJ2RldmVsb3BtZW50JyAhPT0gJ3Byb2R1Y3Rpb24nICYmIHRoaXMuZWwpIHtcbiAgICAgICAgdGhpcy5lbC5fdnVlX2RpcmVjdGl2ZXMuJHJlbW92ZSh0aGlzKTtcbiAgICAgIH1cbiAgICAgIHRoaXMudm0gPSB0aGlzLmVsID0gdGhpcy5fd2F0Y2hlciA9IHRoaXMuX2xpc3RlbmVycyA9IG51bGw7XG4gICAgfVxuICB9O1xuXG4gIGZ1bmN0aW9uIGxpZmVjeWNsZU1peGluIChWdWUpIHtcbiAgICAvKipcbiAgICAgKiBVcGRhdGUgdi1yZWYgZm9yIGNvbXBvbmVudC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7Qm9vbGVhbn0gcmVtb3ZlXG4gICAgICovXG5cbiAgICBWdWUucHJvdG90eXBlLl91cGRhdGVSZWYgPSBmdW5jdGlvbiAocmVtb3ZlKSB7XG4gICAgICB2YXIgcmVmID0gdGhpcy4kb3B0aW9ucy5fcmVmO1xuICAgICAgaWYgKHJlZikge1xuICAgICAgICB2YXIgcmVmcyA9ICh0aGlzLl9zY29wZSB8fCB0aGlzLl9jb250ZXh0KS4kcmVmcztcbiAgICAgICAgaWYgKHJlbW92ZSkge1xuICAgICAgICAgIGlmIChyZWZzW3JlZl0gPT09IHRoaXMpIHtcbiAgICAgICAgICAgIHJlZnNbcmVmXSA9IG51bGw7XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJlZnNbcmVmXSA9IHRoaXM7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogVHJhbnNjbHVkZSwgY29tcGlsZSBhbmQgbGluayBlbGVtZW50LlxuICAgICAqXG4gICAgICogSWYgYSBwcmUtY29tcGlsZWQgbGlua2VyIGlzIGF2YWlsYWJsZSwgdGhhdCBtZWFucyB0aGVcbiAgICAgKiBwYXNzZWQgaW4gZWxlbWVudCB3aWxsIGJlIHByZS10cmFuc2NsdWRlZCBhbmQgY29tcGlsZWRcbiAgICAgKiBhcyB3ZWxsIC0gYWxsIHdlIG5lZWQgdG8gZG8gaXMgdG8gY2FsbCB0aGUgbGlua2VyLlxuICAgICAqXG4gICAgICogT3RoZXJ3aXNlIHdlIG5lZWQgdG8gY2FsbCB0cmFuc2NsdWRlL2NvbXBpbGUvbGluayBoZXJlLlxuICAgICAqXG4gICAgICogQHBhcmFtIHtFbGVtZW50fSBlbFxuICAgICAqL1xuXG4gICAgVnVlLnByb3RvdHlwZS5fY29tcGlsZSA9IGZ1bmN0aW9uIChlbCkge1xuICAgICAgdmFyIG9wdGlvbnMgPSB0aGlzLiRvcHRpb25zO1xuXG4gICAgICAvLyB0cmFuc2NsdWRlIGFuZCBpbml0IGVsZW1lbnRcbiAgICAgIC8vIHRyYW5zY2x1ZGUgY2FuIHBvdGVudGlhbGx5IHJlcGxhY2Ugb3JpZ2luYWxcbiAgICAgIC8vIHNvIHdlIG5lZWQgdG8ga2VlcCByZWZlcmVuY2U7IHRoaXMgc3RlcCBhbHNvIGluamVjdHNcbiAgICAgIC8vIHRoZSB0ZW1wbGF0ZSBhbmQgY2FjaGVzIHRoZSBvcmlnaW5hbCBhdHRyaWJ1dGVzXG4gICAgICAvLyBvbiB0aGUgY29udGFpbmVyIG5vZGUgYW5kIHJlcGxhY2VyIG5vZGUuXG4gICAgICB2YXIgb3JpZ2luYWwgPSBlbDtcbiAgICAgIGVsID0gdHJhbnNjbHVkZShlbCwgb3B0aW9ucyk7XG4gICAgICB0aGlzLl9pbml0RWxlbWVudChlbCk7XG5cbiAgICAgIC8vIGhhbmRsZSB2LXByZSBvbiByb290IG5vZGUgKCMyMDI2KVxuICAgICAgaWYgKGVsLm5vZGVUeXBlID09PSAxICYmIGdldEF0dHIoZWwsICd2LXByZScpICE9PSBudWxsKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgLy8gcm9vdCBpcyBhbHdheXMgY29tcGlsZWQgcGVyLWluc3RhbmNlLCBiZWNhdXNlXG4gICAgICAvLyBjb250YWluZXIgYXR0cnMgYW5kIHByb3BzIGNhbiBiZSBkaWZmZXJlbnQgZXZlcnkgdGltZS5cbiAgICAgIHZhciBjb250ZXh0T3B0aW9ucyA9IHRoaXMuX2NvbnRleHQgJiYgdGhpcy5fY29udGV4dC4kb3B0aW9ucztcbiAgICAgIHZhciByb290TGlua2VyID0gY29tcGlsZVJvb3QoZWwsIG9wdGlvbnMsIGNvbnRleHRPcHRpb25zKTtcblxuICAgICAgLy8gcmVzb2x2ZSBzbG90IGRpc3RyaWJ1dGlvblxuICAgICAgcmVzb2x2ZVNsb3RzKHRoaXMsIG9wdGlvbnMuX2NvbnRlbnQpO1xuXG4gICAgICAvLyBjb21waWxlIGFuZCBsaW5rIHRoZSByZXN0XG4gICAgICB2YXIgY29udGVudExpbmtGbjtcbiAgICAgIHZhciBjdG9yID0gdGhpcy5jb25zdHJ1Y3RvcjtcbiAgICAgIC8vIGNvbXBvbmVudCBjb21waWxhdGlvbiBjYW4gYmUgY2FjaGVkXG4gICAgICAvLyBhcyBsb25nIGFzIGl0J3Mgbm90IHVzaW5nIGlubGluZS10ZW1wbGF0ZVxuICAgICAgaWYgKG9wdGlvbnMuX2xpbmtlckNhY2hhYmxlKSB7XG4gICAgICAgIGNvbnRlbnRMaW5rRm4gPSBjdG9yLmxpbmtlcjtcbiAgICAgICAgaWYgKCFjb250ZW50TGlua0ZuKSB7XG4gICAgICAgICAgY29udGVudExpbmtGbiA9IGN0b3IubGlua2VyID0gY29tcGlsZShlbCwgb3B0aW9ucyk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgLy8gbGluayBwaGFzZVxuICAgICAgLy8gbWFrZSBzdXJlIHRvIGxpbmsgcm9vdCB3aXRoIHByb3Agc2NvcGUhXG4gICAgICB2YXIgcm9vdFVubGlua0ZuID0gcm9vdExpbmtlcih0aGlzLCBlbCwgdGhpcy5fc2NvcGUpO1xuICAgICAgdmFyIGNvbnRlbnRVbmxpbmtGbiA9IGNvbnRlbnRMaW5rRm4gPyBjb250ZW50TGlua0ZuKHRoaXMsIGVsKSA6IGNvbXBpbGUoZWwsIG9wdGlvbnMpKHRoaXMsIGVsKTtcblxuICAgICAgLy8gcmVnaXN0ZXIgY29tcG9zaXRlIHVubGluayBmdW5jdGlvblxuICAgICAgLy8gdG8gYmUgY2FsbGVkIGR1cmluZyBpbnN0YW5jZSBkZXN0cnVjdGlvblxuICAgICAgdGhpcy5fdW5saW5rRm4gPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJvb3RVbmxpbmtGbigpO1xuICAgICAgICAvLyBwYXNzaW5nIGRlc3Ryb3lpbmc6IHRydWUgdG8gYXZvaWQgc2VhcmNoaW5nIGFuZFxuICAgICAgICAvLyBzcGxpY2luZyB0aGUgZGlyZWN0aXZlc1xuICAgICAgICBjb250ZW50VW5saW5rRm4odHJ1ZSk7XG4gICAgICB9O1xuXG4gICAgICAvLyBmaW5hbGx5IHJlcGxhY2Ugb3JpZ2luYWxcbiAgICAgIGlmIChvcHRpb25zLnJlcGxhY2UpIHtcbiAgICAgICAgcmVwbGFjZShvcmlnaW5hbCwgZWwpO1xuICAgICAgfVxuXG4gICAgICB0aGlzLl9pc0NvbXBpbGVkID0gdHJ1ZTtcbiAgICAgIHRoaXMuX2NhbGxIb29rKCdjb21waWxlZCcpO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBJbml0aWFsaXplIGluc3RhbmNlIGVsZW1lbnQuIENhbGxlZCBpbiB0aGUgcHVibGljXG4gICAgICogJG1vdW50KCkgbWV0aG9kLlxuICAgICAqXG4gICAgICogQHBhcmFtIHtFbGVtZW50fSBlbFxuICAgICAqL1xuXG4gICAgVnVlLnByb3RvdHlwZS5faW5pdEVsZW1lbnQgPSBmdW5jdGlvbiAoZWwpIHtcbiAgICAgIGlmIChpc0ZyYWdtZW50KGVsKSkge1xuICAgICAgICB0aGlzLl9pc0ZyYWdtZW50ID0gdHJ1ZTtcbiAgICAgICAgdGhpcy4kZWwgPSB0aGlzLl9mcmFnbWVudFN0YXJ0ID0gZWwuZmlyc3RDaGlsZDtcbiAgICAgICAgdGhpcy5fZnJhZ21lbnRFbmQgPSBlbC5sYXN0Q2hpbGQ7XG4gICAgICAgIC8vIHNldCBwZXJzaXN0ZWQgdGV4dCBhbmNob3JzIHRvIGVtcHR5XG4gICAgICAgIGlmICh0aGlzLl9mcmFnbWVudFN0YXJ0Lm5vZGVUeXBlID09PSAzKSB7XG4gICAgICAgICAgdGhpcy5fZnJhZ21lbnRTdGFydC5kYXRhID0gdGhpcy5fZnJhZ21lbnRFbmQuZGF0YSA9ICcnO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX2ZyYWdtZW50ID0gZWw7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLiRlbCA9IGVsO1xuICAgICAgfVxuICAgICAgdGhpcy4kZWwuX192dWVfXyA9IHRoaXM7XG4gICAgICB0aGlzLl9jYWxsSG9vaygnYmVmb3JlQ29tcGlsZScpO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBDcmVhdGUgYW5kIGJpbmQgYSBkaXJlY3RpdmUgdG8gYW4gZWxlbWVudC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBkZXNjcmlwdG9yIC0gcGFyc2VkIGRpcmVjdGl2ZSBkZXNjcmlwdG9yXG4gICAgICogQHBhcmFtIHtOb2RlfSBub2RlICAgLSB0YXJnZXQgbm9kZVxuICAgICAqIEBwYXJhbSB7VnVlfSBbaG9zdF0gLSB0cmFuc2NsdXNpb24gaG9zdCBjb21wb25lbnRcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gW3Njb3BlXSAtIHYtZm9yIHNjb3BlXG4gICAgICogQHBhcmFtIHtGcmFnbWVudH0gW2ZyYWddIC0gb3duZXIgZnJhZ21lbnRcbiAgICAgKi9cblxuICAgIFZ1ZS5wcm90b3R5cGUuX2JpbmREaXIgPSBmdW5jdGlvbiAoZGVzY3JpcHRvciwgbm9kZSwgaG9zdCwgc2NvcGUsIGZyYWcpIHtcbiAgICAgIHRoaXMuX2RpcmVjdGl2ZXMucHVzaChuZXcgRGlyZWN0aXZlKGRlc2NyaXB0b3IsIHRoaXMsIG5vZGUsIGhvc3QsIHNjb3BlLCBmcmFnKSk7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIFRlYXJkb3duIGFuIGluc3RhbmNlLCB1bm9ic2VydmVzIHRoZSBkYXRhLCB1bmJpbmQgYWxsIHRoZVxuICAgICAqIGRpcmVjdGl2ZXMsIHR1cm4gb2ZmIGFsbCB0aGUgZXZlbnQgbGlzdGVuZXJzLCBldGMuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge0Jvb2xlYW59IHJlbW92ZSAtIHdoZXRoZXIgdG8gcmVtb3ZlIHRoZSBET00gbm9kZS5cbiAgICAgKiBAcGFyYW0ge0Jvb2xlYW59IGRlZmVyQ2xlYW51cCAtIGlmIHRydWUsIGRlZmVyIGNsZWFudXAgdG9cbiAgICAgKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJlIGNhbGxlZCBsYXRlclxuICAgICAqL1xuXG4gICAgVnVlLnByb3RvdHlwZS5fZGVzdHJveSA9IGZ1bmN0aW9uIChyZW1vdmUsIGRlZmVyQ2xlYW51cCkge1xuICAgICAgaWYgKHRoaXMuX2lzQmVpbmdEZXN0cm95ZWQpIHtcbiAgICAgICAgaWYgKCFkZWZlckNsZWFudXApIHtcbiAgICAgICAgICB0aGlzLl9jbGVhbnVwKCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICB2YXIgZGVzdHJveVJlYWR5O1xuICAgICAgdmFyIHBlbmRpbmdSZW1vdmFsO1xuXG4gICAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgICAvLyBDbGVhbnVwIHNob3VsZCBiZSBjYWxsZWQgZWl0aGVyIHN5bmNocm9ub3VzbHkgb3IgYXN5bmNocm9ub3lzbHkgYXNcbiAgICAgIC8vIGNhbGxiYWNrIG9mIHRoaXMuJHJlbW92ZSgpLCBvciBpZiByZW1vdmUgYW5kIGRlZmVyQ2xlYW51cCBhcmUgZmFsc2UuXG4gICAgICAvLyBJbiBhbnkgY2FzZSBpdCBzaG91bGQgYmUgY2FsbGVkIGFmdGVyIGFsbCBvdGhlciByZW1vdmluZywgdW5iaW5kaW5nIGFuZFxuICAgICAgLy8gdHVybmluZyBvZiBpcyBkb25lXG4gICAgICB2YXIgY2xlYW51cElmUG9zc2libGUgPSBmdW5jdGlvbiBjbGVhbnVwSWZQb3NzaWJsZSgpIHtcbiAgICAgICAgaWYgKGRlc3Ryb3lSZWFkeSAmJiAhcGVuZGluZ1JlbW92YWwgJiYgIWRlZmVyQ2xlYW51cCkge1xuICAgICAgICAgIHNlbGYuX2NsZWFudXAoKTtcbiAgICAgICAgfVxuICAgICAgfTtcblxuICAgICAgLy8gcmVtb3ZlIERPTSBlbGVtZW50XG4gICAgICBpZiAocmVtb3ZlICYmIHRoaXMuJGVsKSB7XG4gICAgICAgIHBlbmRpbmdSZW1vdmFsID0gdHJ1ZTtcbiAgICAgICAgdGhpcy4kcmVtb3ZlKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICBwZW5kaW5nUmVtb3ZhbCA9IGZhbHNlO1xuICAgICAgICAgIGNsZWFudXBJZlBvc3NpYmxlKCk7XG4gICAgICAgIH0pO1xuICAgICAgfVxuXG4gICAgICB0aGlzLl9jYWxsSG9vaygnYmVmb3JlRGVzdHJveScpO1xuICAgICAgdGhpcy5faXNCZWluZ0Rlc3Ryb3llZCA9IHRydWU7XG4gICAgICB2YXIgaTtcbiAgICAgIC8vIHJlbW92ZSBzZWxmIGZyb20gcGFyZW50LiBvbmx5IG5lY2Vzc2FyeVxuICAgICAgLy8gaWYgcGFyZW50IGlzIG5vdCBiZWluZyBkZXN0cm95ZWQgYXMgd2VsbC5cbiAgICAgIHZhciBwYXJlbnQgPSB0aGlzLiRwYXJlbnQ7XG4gICAgICBpZiAocGFyZW50ICYmICFwYXJlbnQuX2lzQmVpbmdEZXN0cm95ZWQpIHtcbiAgICAgICAgcGFyZW50LiRjaGlsZHJlbi4kcmVtb3ZlKHRoaXMpO1xuICAgICAgICAvLyB1bnJlZ2lzdGVyIHJlZiAocmVtb3ZlOiB0cnVlKVxuICAgICAgICB0aGlzLl91cGRhdGVSZWYodHJ1ZSk7XG4gICAgICB9XG4gICAgICAvLyBkZXN0cm95IGFsbCBjaGlsZHJlbi5cbiAgICAgIGkgPSB0aGlzLiRjaGlsZHJlbi5sZW5ndGg7XG4gICAgICB3aGlsZSAoaS0tKSB7XG4gICAgICAgIHRoaXMuJGNoaWxkcmVuW2ldLiRkZXN0cm95KCk7XG4gICAgICB9XG4gICAgICAvLyB0ZWFyZG93biBwcm9wc1xuICAgICAgaWYgKHRoaXMuX3Byb3BzVW5saW5rRm4pIHtcbiAgICAgICAgdGhpcy5fcHJvcHNVbmxpbmtGbigpO1xuICAgICAgfVxuICAgICAgLy8gdGVhcmRvd24gYWxsIGRpcmVjdGl2ZXMuIHRoaXMgYWxzbyB0ZWFyc2Rvd24gYWxsXG4gICAgICAvLyBkaXJlY3RpdmUtb3duZWQgd2F0Y2hlcnMuXG4gICAgICBpZiAodGhpcy5fdW5saW5rRm4pIHtcbiAgICAgICAgdGhpcy5fdW5saW5rRm4oKTtcbiAgICAgIH1cbiAgICAgIGkgPSB0aGlzLl93YXRjaGVycy5sZW5ndGg7XG4gICAgICB3aGlsZSAoaS0tKSB7XG4gICAgICAgIHRoaXMuX3dhdGNoZXJzW2ldLnRlYXJkb3duKCk7XG4gICAgICB9XG4gICAgICAvLyByZW1vdmUgcmVmZXJlbmNlIHRvIHNlbGYgb24gJGVsXG4gICAgICBpZiAodGhpcy4kZWwpIHtcbiAgICAgICAgdGhpcy4kZWwuX192dWVfXyA9IG51bGw7XG4gICAgICB9XG5cbiAgICAgIGRlc3Ryb3lSZWFkeSA9IHRydWU7XG4gICAgICBjbGVhbnVwSWZQb3NzaWJsZSgpO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBDbGVhbiB1cCB0byBlbnN1cmUgZ2FyYmFnZSBjb2xsZWN0aW9uLlxuICAgICAqIFRoaXMgaXMgY2FsbGVkIGFmdGVyIHRoZSBsZWF2ZSB0cmFuc2l0aW9uIGlmIHRoZXJlXG4gICAgICogaXMgYW55LlxuICAgICAqL1xuXG4gICAgVnVlLnByb3RvdHlwZS5fY2xlYW51cCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIGlmICh0aGlzLl9pc0Rlc3Ryb3llZCkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICAvLyByZW1vdmUgc2VsZiBmcm9tIG93bmVyIGZyYWdtZW50XG4gICAgICAvLyBkbyBpdCBpbiBjbGVhbnVwIHNvIHRoYXQgd2UgY2FuIGNhbGwgJGRlc3Ryb3kgd2l0aFxuICAgICAgLy8gZGVmZXIgcmlnaHQgd2hlbiBhIGZyYWdtZW50IGlzIGFib3V0IHRvIGJlIHJlbW92ZWQuXG4gICAgICBpZiAodGhpcy5fZnJhZykge1xuICAgICAgICB0aGlzLl9mcmFnLmNoaWxkcmVuLiRyZW1vdmUodGhpcyk7XG4gICAgICB9XG4gICAgICAvLyByZW1vdmUgcmVmZXJlbmNlIGZyb20gZGF0YSBvYlxuICAgICAgLy8gZnJvemVuIG9iamVjdCBtYXkgbm90IGhhdmUgb2JzZXJ2ZXIuXG4gICAgICBpZiAodGhpcy5fZGF0YSAmJiB0aGlzLl9kYXRhLl9fb2JfXykge1xuICAgICAgICB0aGlzLl9kYXRhLl9fb2JfXy5yZW1vdmVWbSh0aGlzKTtcbiAgICAgIH1cbiAgICAgIC8vIENsZWFuIHVwIHJlZmVyZW5jZXMgdG8gcHJpdmF0ZSBwcm9wZXJ0aWVzIGFuZCBvdGhlclxuICAgICAgLy8gaW5zdGFuY2VzLiBwcmVzZXJ2ZSByZWZlcmVuY2UgdG8gX2RhdGEgc28gdGhhdCBwcm94eVxuICAgICAgLy8gYWNjZXNzb3JzIHN0aWxsIHdvcmsuIFRoZSBvbmx5IHBvdGVudGlhbCBzaWRlIGVmZmVjdFxuICAgICAgLy8gaGVyZSBpcyB0aGF0IG11dGF0aW5nIHRoZSBpbnN0YW5jZSBhZnRlciBpdCdzIGRlc3Ryb3llZFxuICAgICAgLy8gbWF5IGFmZmVjdCB0aGUgc3RhdGUgb2Ygb3RoZXIgY29tcG9uZW50cyB0aGF0IGFyZSBzdGlsbFxuICAgICAgLy8gb2JzZXJ2aW5nIHRoZSBzYW1lIG9iamVjdCwgYnV0IHRoYXQgc2VlbXMgdG8gYmUgYVxuICAgICAgLy8gcmVhc29uYWJsZSByZXNwb25zaWJpbGl0eSBmb3IgdGhlIHVzZXIgcmF0aGVyIHRoYW5cbiAgICAgIC8vIGFsd2F5cyB0aHJvd2luZyBhbiBlcnJvciBvbiB0aGVtLlxuICAgICAgdGhpcy4kZWwgPSB0aGlzLiRwYXJlbnQgPSB0aGlzLiRyb290ID0gdGhpcy4kY2hpbGRyZW4gPSB0aGlzLl93YXRjaGVycyA9IHRoaXMuX2NvbnRleHQgPSB0aGlzLl9zY29wZSA9IHRoaXMuX2RpcmVjdGl2ZXMgPSBudWxsO1xuICAgICAgLy8gY2FsbCB0aGUgbGFzdCBob29rLi4uXG4gICAgICB0aGlzLl9pc0Rlc3Ryb3llZCA9IHRydWU7XG4gICAgICB0aGlzLl9jYWxsSG9vaygnZGVzdHJveWVkJyk7XG4gICAgICAvLyB0dXJuIG9mZiBhbGwgaW5zdGFuY2UgbGlzdGVuZXJzLlxuICAgICAgdGhpcy4kb2ZmKCk7XG4gICAgfTtcbiAgfVxuXG4gIGZ1bmN0aW9uIG1pc2NNaXhpbiAoVnVlKSB7XG4gICAgLyoqXG4gICAgICogQXBwbHkgYSBsaXN0IG9mIGZpbHRlciAoZGVzY3JpcHRvcnMpIHRvIGEgdmFsdWUuXG4gICAgICogVXNpbmcgcGxhaW4gZm9yIGxvb3BzIGhlcmUgYmVjYXVzZSB0aGlzIHdpbGwgYmUgY2FsbGVkIGluXG4gICAgICogdGhlIGdldHRlciBvZiBhbnkgd2F0Y2hlciB3aXRoIGZpbHRlcnMgc28gaXQgaXMgdmVyeVxuICAgICAqIHBlcmZvcm1hbmNlIHNlbnNpdGl2ZS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7Kn0gdmFsdWVcbiAgICAgKiBAcGFyYW0geyp9IFtvbGRWYWx1ZV1cbiAgICAgKiBAcGFyYW0ge0FycmF5fSBmaWx0ZXJzXG4gICAgICogQHBhcmFtIHtCb29sZWFufSB3cml0ZVxuICAgICAqIEByZXR1cm4geyp9XG4gICAgICovXG5cbiAgICBWdWUucHJvdG90eXBlLl9hcHBseUZpbHRlcnMgPSBmdW5jdGlvbiAodmFsdWUsIG9sZFZhbHVlLCBmaWx0ZXJzLCB3cml0ZSkge1xuICAgICAgdmFyIGZpbHRlciwgZm4sIGFyZ3MsIGFyZywgb2Zmc2V0LCBpLCBsLCBqLCBrO1xuICAgICAgZm9yIChpID0gMCwgbCA9IGZpbHRlcnMubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG4gICAgICAgIGZpbHRlciA9IGZpbHRlcnNbd3JpdGUgPyBsIC0gaSAtIDEgOiBpXTtcbiAgICAgICAgZm4gPSByZXNvbHZlQXNzZXQodGhpcy4kb3B0aW9ucywgJ2ZpbHRlcnMnLCBmaWx0ZXIubmFtZSwgdHJ1ZSk7XG4gICAgICAgIGlmICghZm4pIGNvbnRpbnVlO1xuICAgICAgICBmbiA9IHdyaXRlID8gZm4ud3JpdGUgOiBmbi5yZWFkIHx8IGZuO1xuICAgICAgICBpZiAodHlwZW9mIGZuICE9PSAnZnVuY3Rpb24nKSBjb250aW51ZTtcbiAgICAgICAgYXJncyA9IHdyaXRlID8gW3ZhbHVlLCBvbGRWYWx1ZV0gOiBbdmFsdWVdO1xuICAgICAgICBvZmZzZXQgPSB3cml0ZSA/IDIgOiAxO1xuICAgICAgICBpZiAoZmlsdGVyLmFyZ3MpIHtcbiAgICAgICAgICBmb3IgKGogPSAwLCBrID0gZmlsdGVyLmFyZ3MubGVuZ3RoOyBqIDwgazsgaisrKSB7XG4gICAgICAgICAgICBhcmcgPSBmaWx0ZXIuYXJnc1tqXTtcbiAgICAgICAgICAgIGFyZ3NbaiArIG9mZnNldF0gPSBhcmcuZHluYW1pYyA/IHRoaXMuJGdldChhcmcudmFsdWUpIDogYXJnLnZhbHVlO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICB2YWx1ZSA9IGZuLmFwcGx5KHRoaXMsIGFyZ3MpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHZhbHVlO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBSZXNvbHZlIGEgY29tcG9uZW50LCBkZXBlbmRpbmcgb24gd2hldGhlciB0aGUgY29tcG9uZW50XG4gICAgICogaXMgZGVmaW5lZCBub3JtYWxseSBvciB1c2luZyBhbiBhc3luYyBmYWN0b3J5IGZ1bmN0aW9uLlxuICAgICAqIFJlc29sdmVzIHN5bmNocm9ub3VzbHkgaWYgYWxyZWFkeSByZXNvbHZlZCwgb3RoZXJ3aXNlXG4gICAgICogcmVzb2x2ZXMgYXN5bmNocm9ub3VzbHkgYW5kIGNhY2hlcyB0aGUgcmVzb2x2ZWRcbiAgICAgKiBjb25zdHJ1Y3RvciBvbiB0aGUgZmFjdG9yeS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7U3RyaW5nfEZ1bmN0aW9ufSB2YWx1ZVxuICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IGNiXG4gICAgICovXG5cbiAgICBWdWUucHJvdG90eXBlLl9yZXNvbHZlQ29tcG9uZW50ID0gZnVuY3Rpb24gKHZhbHVlLCBjYikge1xuICAgICAgdmFyIGZhY3Rvcnk7XG4gICAgICBpZiAodHlwZW9mIHZhbHVlID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIGZhY3RvcnkgPSB2YWx1ZTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGZhY3RvcnkgPSByZXNvbHZlQXNzZXQodGhpcy4kb3B0aW9ucywgJ2NvbXBvbmVudHMnLCB2YWx1ZSwgdHJ1ZSk7XG4gICAgICB9XG4gICAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgaWYgKi9cbiAgICAgIGlmICghZmFjdG9yeSkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICAvLyBhc3luYyBjb21wb25lbnQgZmFjdG9yeVxuICAgICAgaWYgKCFmYWN0b3J5Lm9wdGlvbnMpIHtcbiAgICAgICAgaWYgKGZhY3RvcnkucmVzb2x2ZWQpIHtcbiAgICAgICAgICAvLyBjYWNoZWRcbiAgICAgICAgICBjYihmYWN0b3J5LnJlc29sdmVkKTtcbiAgICAgICAgfSBlbHNlIGlmIChmYWN0b3J5LnJlcXVlc3RlZCkge1xuICAgICAgICAgIC8vIHBvb2wgY2FsbGJhY2tzXG4gICAgICAgICAgZmFjdG9yeS5wZW5kaW5nQ2FsbGJhY2tzLnB1c2goY2IpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGZhY3RvcnkucmVxdWVzdGVkID0gdHJ1ZTtcbiAgICAgICAgICB2YXIgY2JzID0gZmFjdG9yeS5wZW5kaW5nQ2FsbGJhY2tzID0gW2NiXTtcbiAgICAgICAgICBmYWN0b3J5LmNhbGwodGhpcywgZnVuY3Rpb24gcmVzb2x2ZShyZXMpIHtcbiAgICAgICAgICAgIGlmIChpc1BsYWluT2JqZWN0KHJlcykpIHtcbiAgICAgICAgICAgICAgcmVzID0gVnVlLmV4dGVuZChyZXMpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gY2FjaGUgcmVzb2x2ZWRcbiAgICAgICAgICAgIGZhY3RvcnkucmVzb2x2ZWQgPSByZXM7XG4gICAgICAgICAgICAvLyBpbnZva2UgY2FsbGJhY2tzXG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMCwgbCA9IGNicy5sZW5ndGg7IGkgPCBsOyBpKyspIHtcbiAgICAgICAgICAgICAgY2JzW2ldKHJlcyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSwgZnVuY3Rpb24gcmVqZWN0KHJlYXNvbikge1xuICAgICAgICAgICAgJ2RldmVsb3BtZW50JyAhPT0gJ3Byb2R1Y3Rpb24nICYmIHdhcm4oJ0ZhaWxlZCB0byByZXNvbHZlIGFzeW5jIGNvbXBvbmVudCcgKyAodHlwZW9mIHZhbHVlID09PSAnc3RyaW5nJyA/ICc6ICcgKyB2YWx1ZSA6ICcnKSArICcuICcgKyAocmVhc29uID8gJ1xcblJlYXNvbjogJyArIHJlYXNvbiA6ICcnKSk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIG5vcm1hbCBjb21wb25lbnRcbiAgICAgICAgY2IoZmFjdG9yeSk7XG4gICAgICB9XG4gICAgfTtcbiAgfVxuXG4gIHZhciBmaWx0ZXJSRSQxID0gL1tefF1cXHxbXnxdLztcblxuICBmdW5jdGlvbiBkYXRhQVBJIChWdWUpIHtcbiAgICAvKipcbiAgICAgKiBHZXQgdGhlIHZhbHVlIGZyb20gYW4gZXhwcmVzc2lvbiBvbiB0aGlzIHZtLlxuICAgICAqXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IGV4cFxuICAgICAqIEBwYXJhbSB7Qm9vbGVhbn0gW2FzU3RhdGVtZW50XVxuICAgICAqIEByZXR1cm4geyp9XG4gICAgICovXG5cbiAgICBWdWUucHJvdG90eXBlLiRnZXQgPSBmdW5jdGlvbiAoZXhwLCBhc1N0YXRlbWVudCkge1xuICAgICAgdmFyIHJlcyA9IHBhcnNlRXhwcmVzc2lvbihleHApO1xuICAgICAgaWYgKHJlcykge1xuICAgICAgICBpZiAoYXNTdGF0ZW1lbnQpIHtcbiAgICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgICAgICAgcmV0dXJuIGZ1bmN0aW9uIHN0YXRlbWVudEhhbmRsZXIoKSB7XG4gICAgICAgICAgICBzZWxmLiRhcmd1bWVudHMgPSB0b0FycmF5KGFyZ3VtZW50cyk7XG4gICAgICAgICAgICB2YXIgcmVzdWx0ID0gcmVzLmdldC5jYWxsKHNlbGYsIHNlbGYpO1xuICAgICAgICAgICAgc2VsZi4kYXJndW1lbnRzID0gbnVsbDtcbiAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICAgICAgfTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgcmV0dXJuIHJlcy5nZXQuY2FsbCh0aGlzLCB0aGlzKTtcbiAgICAgICAgICB9IGNhdGNoIChlKSB7fVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIFNldCB0aGUgdmFsdWUgZnJvbSBhbiBleHByZXNzaW9uIG9uIHRoaXMgdm0uXG4gICAgICogVGhlIGV4cHJlc3Npb24gbXVzdCBiZSBhIHZhbGlkIGxlZnQtaGFuZFxuICAgICAqIGV4cHJlc3Npb24gaW4gYW4gYXNzaWdubWVudC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBleHBcbiAgICAgKiBAcGFyYW0geyp9IHZhbFxuICAgICAqL1xuXG4gICAgVnVlLnByb3RvdHlwZS4kc2V0ID0gZnVuY3Rpb24gKGV4cCwgdmFsKSB7XG4gICAgICB2YXIgcmVzID0gcGFyc2VFeHByZXNzaW9uKGV4cCwgdHJ1ZSk7XG4gICAgICBpZiAocmVzICYmIHJlcy5zZXQpIHtcbiAgICAgICAgcmVzLnNldC5jYWxsKHRoaXMsIHRoaXMsIHZhbCk7XG4gICAgICB9XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIERlbGV0ZSBhIHByb3BlcnR5IG9uIHRoZSBWTVxuICAgICAqXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IGtleVxuICAgICAqL1xuXG4gICAgVnVlLnByb3RvdHlwZS4kZGVsZXRlID0gZnVuY3Rpb24gKGtleSkge1xuICAgICAgZGVsKHRoaXMuX2RhdGEsIGtleSk7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIFdhdGNoIGFuIGV4cHJlc3Npb24sIHRyaWdnZXIgY2FsbGJhY2sgd2hlbiBpdHNcbiAgICAgKiB2YWx1ZSBjaGFuZ2VzLlxuICAgICAqXG4gICAgICogQHBhcmFtIHtTdHJpbmd8RnVuY3Rpb259IGV4cE9yRm5cbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBjYlxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBbb3B0aW9uc11cbiAgICAgKiAgICAgICAgICAgICAgICAgLSB7Qm9vbGVhbn0gZGVlcFxuICAgICAqICAgICAgICAgICAgICAgICAtIHtCb29sZWFufSBpbW1lZGlhdGVcbiAgICAgKiBAcmV0dXJuIHtGdW5jdGlvbn0gLSB1bndhdGNoRm5cbiAgICAgKi9cblxuICAgIFZ1ZS5wcm90b3R5cGUuJHdhdGNoID0gZnVuY3Rpb24gKGV4cE9yRm4sIGNiLCBvcHRpb25zKSB7XG4gICAgICB2YXIgdm0gPSB0aGlzO1xuICAgICAgdmFyIHBhcnNlZDtcbiAgICAgIGlmICh0eXBlb2YgZXhwT3JGbiA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgcGFyc2VkID0gcGFyc2VEaXJlY3RpdmUoZXhwT3JGbik7XG4gICAgICAgIGV4cE9yRm4gPSBwYXJzZWQuZXhwcmVzc2lvbjtcbiAgICAgIH1cbiAgICAgIHZhciB3YXRjaGVyID0gbmV3IFdhdGNoZXIodm0sIGV4cE9yRm4sIGNiLCB7XG4gICAgICAgIGRlZXA6IG9wdGlvbnMgJiYgb3B0aW9ucy5kZWVwLFxuICAgICAgICBzeW5jOiBvcHRpb25zICYmIG9wdGlvbnMuc3luYyxcbiAgICAgICAgZmlsdGVyczogcGFyc2VkICYmIHBhcnNlZC5maWx0ZXJzLFxuICAgICAgICB1c2VyOiAhb3B0aW9ucyB8fCBvcHRpb25zLnVzZXIgIT09IGZhbHNlXG4gICAgICB9KTtcbiAgICAgIGlmIChvcHRpb25zICYmIG9wdGlvbnMuaW1tZWRpYXRlKSB7XG4gICAgICAgIGNiLmNhbGwodm0sIHdhdGNoZXIudmFsdWUpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGZ1bmN0aW9uIHVud2F0Y2hGbigpIHtcbiAgICAgICAgd2F0Y2hlci50ZWFyZG93bigpO1xuICAgICAgfTtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogRXZhbHVhdGUgYSB0ZXh0IGRpcmVjdGl2ZSwgaW5jbHVkaW5nIGZpbHRlcnMuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gdGV4dFxuICAgICAqIEBwYXJhbSB7Qm9vbGVhbn0gW2FzU3RhdGVtZW50XVxuICAgICAqIEByZXR1cm4ge1N0cmluZ31cbiAgICAgKi9cblxuICAgIFZ1ZS5wcm90b3R5cGUuJGV2YWwgPSBmdW5jdGlvbiAodGV4dCwgYXNTdGF0ZW1lbnQpIHtcbiAgICAgIC8vIGNoZWNrIGZvciBmaWx0ZXJzLlxuICAgICAgaWYgKGZpbHRlclJFJDEudGVzdCh0ZXh0KSkge1xuICAgICAgICB2YXIgZGlyID0gcGFyc2VEaXJlY3RpdmUodGV4dCk7XG4gICAgICAgIC8vIHRoZSBmaWx0ZXIgcmVnZXggY2hlY2sgbWlnaHQgZ2l2ZSBmYWxzZSBwb3NpdGl2ZVxuICAgICAgICAvLyBmb3IgcGlwZXMgaW5zaWRlIHN0cmluZ3MsIHNvIGl0J3MgcG9zc2libGUgdGhhdFxuICAgICAgICAvLyB3ZSBkb24ndCBnZXQgYW55IGZpbHRlcnMgaGVyZVxuICAgICAgICB2YXIgdmFsID0gdGhpcy4kZ2V0KGRpci5leHByZXNzaW9uLCBhc1N0YXRlbWVudCk7XG4gICAgICAgIHJldHVybiBkaXIuZmlsdGVycyA/IHRoaXMuX2FwcGx5RmlsdGVycyh2YWwsIG51bGwsIGRpci5maWx0ZXJzKSA6IHZhbDtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIG5vIGZpbHRlclxuICAgICAgICByZXR1cm4gdGhpcy4kZ2V0KHRleHQsIGFzU3RhdGVtZW50KTtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogSW50ZXJwb2xhdGUgYSBwaWVjZSBvZiB0ZW1wbGF0ZSB0ZXh0LlxuICAgICAqXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IHRleHRcbiAgICAgKiBAcmV0dXJuIHtTdHJpbmd9XG4gICAgICovXG5cbiAgICBWdWUucHJvdG90eXBlLiRpbnRlcnBvbGF0ZSA9IGZ1bmN0aW9uICh0ZXh0KSB7XG4gICAgICB2YXIgdG9rZW5zID0gcGFyc2VUZXh0KHRleHQpO1xuICAgICAgdmFyIHZtID0gdGhpcztcbiAgICAgIGlmICh0b2tlbnMpIHtcbiAgICAgICAgaWYgKHRva2Vucy5sZW5ndGggPT09IDEpIHtcbiAgICAgICAgICByZXR1cm4gdm0uJGV2YWwodG9rZW5zWzBdLnZhbHVlKSArICcnO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJldHVybiB0b2tlbnMubWFwKGZ1bmN0aW9uICh0b2tlbikge1xuICAgICAgICAgICAgcmV0dXJuIHRva2VuLnRhZyA/IHZtLiRldmFsKHRva2VuLnZhbHVlKSA6IHRva2VuLnZhbHVlO1xuICAgICAgICAgIH0pLmpvaW4oJycpO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gdGV4dDtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogTG9nIGluc3RhbmNlIGRhdGEgYXMgYSBwbGFpbiBKUyBvYmplY3RcbiAgICAgKiBzbyB0aGF0IGl0IGlzIGVhc2llciB0byBpbnNwZWN0IGluIGNvbnNvbGUuXG4gICAgICogVGhpcyBtZXRob2QgYXNzdW1lcyBjb25zb2xlIGlzIGF2YWlsYWJsZS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBbcGF0aF1cbiAgICAgKi9cblxuICAgIFZ1ZS5wcm90b3R5cGUuJGxvZyA9IGZ1bmN0aW9uIChwYXRoKSB7XG4gICAgICB2YXIgZGF0YSA9IHBhdGggPyBnZXRQYXRoKHRoaXMuX2RhdGEsIHBhdGgpIDogdGhpcy5fZGF0YTtcbiAgICAgIGlmIChkYXRhKSB7XG4gICAgICAgIGRhdGEgPSBjbGVhbihkYXRhKTtcbiAgICAgIH1cbiAgICAgIC8vIGluY2x1ZGUgY29tcHV0ZWQgZmllbGRzXG4gICAgICBpZiAoIXBhdGgpIHtcbiAgICAgICAgdmFyIGtleTtcbiAgICAgICAgZm9yIChrZXkgaW4gdGhpcy4kb3B0aW9ucy5jb21wdXRlZCkge1xuICAgICAgICAgIGRhdGFba2V5XSA9IGNsZWFuKHRoaXNba2V5XSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuX3Byb3BzKSB7XG4gICAgICAgICAgZm9yIChrZXkgaW4gdGhpcy5fcHJvcHMpIHtcbiAgICAgICAgICAgIGRhdGFba2V5XSA9IGNsZWFuKHRoaXNba2V5XSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgICBjb25zb2xlLmxvZyhkYXRhKTtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogXCJjbGVhblwiIGEgZ2V0dGVyL3NldHRlciBjb252ZXJ0ZWQgb2JqZWN0IGludG8gYSBwbGFpblxuICAgICAqIG9iamVjdCBjb3B5LlxuICAgICAqXG4gICAgICogQHBhcmFtIHtPYmplY3R9IC0gb2JqXG4gICAgICogQHJldHVybiB7T2JqZWN0fVxuICAgICAqL1xuXG4gICAgZnVuY3Rpb24gY2xlYW4ob2JqKSB7XG4gICAgICByZXR1cm4gSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeShvYmopKTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBkb21BUEkgKFZ1ZSkge1xuICAgIC8qKlxuICAgICAqIENvbnZlbmllbmNlIG9uLWluc3RhbmNlIG5leHRUaWNrLiBUaGUgY2FsbGJhY2sgaXNcbiAgICAgKiBhdXRvLWJvdW5kIHRvIHRoZSBpbnN0YW5jZSwgYW5kIHRoaXMgYXZvaWRzIGNvbXBvbmVudFxuICAgICAqIG1vZHVsZXMgaGF2aW5nIHRvIHJlbHkgb24gdGhlIGdsb2JhbCBWdWUuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBmblxuICAgICAqL1xuXG4gICAgVnVlLnByb3RvdHlwZS4kbmV4dFRpY2sgPSBmdW5jdGlvbiAoZm4pIHtcbiAgICAgIG5leHRUaWNrKGZuLCB0aGlzKTtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogQXBwZW5kIGluc3RhbmNlIHRvIHRhcmdldFxuICAgICAqXG4gICAgICogQHBhcmFtIHtOb2RlfSB0YXJnZXRcbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBbY2JdXG4gICAgICogQHBhcmFtIHtCb29sZWFufSBbd2l0aFRyYW5zaXRpb25dIC0gZGVmYXVsdHMgdG8gdHJ1ZVxuICAgICAqL1xuXG4gICAgVnVlLnByb3RvdHlwZS4kYXBwZW5kVG8gPSBmdW5jdGlvbiAodGFyZ2V0LCBjYiwgd2l0aFRyYW5zaXRpb24pIHtcbiAgICAgIHJldHVybiBpbnNlcnQodGhpcywgdGFyZ2V0LCBjYiwgd2l0aFRyYW5zaXRpb24sIGFwcGVuZCwgYXBwZW5kV2l0aFRyYW5zaXRpb24pO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBQcmVwZW5kIGluc3RhbmNlIHRvIHRhcmdldFxuICAgICAqXG4gICAgICogQHBhcmFtIHtOb2RlfSB0YXJnZXRcbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBbY2JdXG4gICAgICogQHBhcmFtIHtCb29sZWFufSBbd2l0aFRyYW5zaXRpb25dIC0gZGVmYXVsdHMgdG8gdHJ1ZVxuICAgICAqL1xuXG4gICAgVnVlLnByb3RvdHlwZS4kcHJlcGVuZFRvID0gZnVuY3Rpb24gKHRhcmdldCwgY2IsIHdpdGhUcmFuc2l0aW9uKSB7XG4gICAgICB0YXJnZXQgPSBxdWVyeSh0YXJnZXQpO1xuICAgICAgaWYgKHRhcmdldC5oYXNDaGlsZE5vZGVzKCkpIHtcbiAgICAgICAgdGhpcy4kYmVmb3JlKHRhcmdldC5maXJzdENoaWxkLCBjYiwgd2l0aFRyYW5zaXRpb24pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy4kYXBwZW5kVG8odGFyZ2V0LCBjYiwgd2l0aFRyYW5zaXRpb24pO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIEluc2VydCBpbnN0YW5jZSBiZWZvcmUgdGFyZ2V0XG4gICAgICpcbiAgICAgKiBAcGFyYW0ge05vZGV9IHRhcmdldFxuICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IFtjYl1cbiAgICAgKiBAcGFyYW0ge0Jvb2xlYW59IFt3aXRoVHJhbnNpdGlvbl0gLSBkZWZhdWx0cyB0byB0cnVlXG4gICAgICovXG5cbiAgICBWdWUucHJvdG90eXBlLiRiZWZvcmUgPSBmdW5jdGlvbiAodGFyZ2V0LCBjYiwgd2l0aFRyYW5zaXRpb24pIHtcbiAgICAgIHJldHVybiBpbnNlcnQodGhpcywgdGFyZ2V0LCBjYiwgd2l0aFRyYW5zaXRpb24sIGJlZm9yZVdpdGhDYiwgYmVmb3JlV2l0aFRyYW5zaXRpb24pO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBJbnNlcnQgaW5zdGFuY2UgYWZ0ZXIgdGFyZ2V0XG4gICAgICpcbiAgICAgKiBAcGFyYW0ge05vZGV9IHRhcmdldFxuICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IFtjYl1cbiAgICAgKiBAcGFyYW0ge0Jvb2xlYW59IFt3aXRoVHJhbnNpdGlvbl0gLSBkZWZhdWx0cyB0byB0cnVlXG4gICAgICovXG5cbiAgICBWdWUucHJvdG90eXBlLiRhZnRlciA9IGZ1bmN0aW9uICh0YXJnZXQsIGNiLCB3aXRoVHJhbnNpdGlvbikge1xuICAgICAgdGFyZ2V0ID0gcXVlcnkodGFyZ2V0KTtcbiAgICAgIGlmICh0YXJnZXQubmV4dFNpYmxpbmcpIHtcbiAgICAgICAgdGhpcy4kYmVmb3JlKHRhcmdldC5uZXh0U2libGluZywgY2IsIHdpdGhUcmFuc2l0aW9uKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuJGFwcGVuZFRvKHRhcmdldC5wYXJlbnROb2RlLCBjYiwgd2l0aFRyYW5zaXRpb24pO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIFJlbW92ZSBpbnN0YW5jZSBmcm9tIERPTVxuICAgICAqXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gW2NiXVxuICAgICAqIEBwYXJhbSB7Qm9vbGVhbn0gW3dpdGhUcmFuc2l0aW9uXSAtIGRlZmF1bHRzIHRvIHRydWVcbiAgICAgKi9cblxuICAgIFZ1ZS5wcm90b3R5cGUuJHJlbW92ZSA9IGZ1bmN0aW9uIChjYiwgd2l0aFRyYW5zaXRpb24pIHtcbiAgICAgIGlmICghdGhpcy4kZWwucGFyZW50Tm9kZSkge1xuICAgICAgICByZXR1cm4gY2IgJiYgY2IoKTtcbiAgICAgIH1cbiAgICAgIHZhciBpbkRvY3VtZW50ID0gdGhpcy5faXNBdHRhY2hlZCAmJiBpbkRvYyh0aGlzLiRlbCk7XG4gICAgICAvLyBpZiB3ZSBhcmUgbm90IGluIGRvY3VtZW50LCBubyBuZWVkIHRvIGNoZWNrXG4gICAgICAvLyBmb3IgdHJhbnNpdGlvbnNcbiAgICAgIGlmICghaW5Eb2N1bWVudCkgd2l0aFRyYW5zaXRpb24gPSBmYWxzZTtcbiAgICAgIHZhciBzZWxmID0gdGhpcztcbiAgICAgIHZhciByZWFsQ2IgPSBmdW5jdGlvbiByZWFsQ2IoKSB7XG4gICAgICAgIGlmIChpbkRvY3VtZW50KSBzZWxmLl9jYWxsSG9vaygnZGV0YWNoZWQnKTtcbiAgICAgICAgaWYgKGNiKSBjYigpO1xuICAgICAgfTtcbiAgICAgIGlmICh0aGlzLl9pc0ZyYWdtZW50KSB7XG4gICAgICAgIHJlbW92ZU5vZGVSYW5nZSh0aGlzLl9mcmFnbWVudFN0YXJ0LCB0aGlzLl9mcmFnbWVudEVuZCwgdGhpcywgdGhpcy5fZnJhZ21lbnQsIHJlYWxDYik7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB2YXIgb3AgPSB3aXRoVHJhbnNpdGlvbiA9PT0gZmFsc2UgPyByZW1vdmVXaXRoQ2IgOiByZW1vdmVXaXRoVHJhbnNpdGlvbjtcbiAgICAgICAgb3AodGhpcy4kZWwsIHRoaXMsIHJlYWxDYik7XG4gICAgICB9XG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogU2hhcmVkIERPTSBpbnNlcnRpb24gZnVuY3Rpb24uXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge1Z1ZX0gdm1cbiAgICAgKiBAcGFyYW0ge0VsZW1lbnR9IHRhcmdldFxuICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IFtjYl1cbiAgICAgKiBAcGFyYW0ge0Jvb2xlYW59IFt3aXRoVHJhbnNpdGlvbl1cbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBvcDEgLSBvcCBmb3Igbm9uLXRyYW5zaXRpb24gaW5zZXJ0XG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gb3AyIC0gb3AgZm9yIHRyYW5zaXRpb24gaW5zZXJ0XG4gICAgICogQHJldHVybiB2bVxuICAgICAqL1xuXG4gICAgZnVuY3Rpb24gaW5zZXJ0KHZtLCB0YXJnZXQsIGNiLCB3aXRoVHJhbnNpdGlvbiwgb3AxLCBvcDIpIHtcbiAgICAgIHRhcmdldCA9IHF1ZXJ5KHRhcmdldCk7XG4gICAgICB2YXIgdGFyZ2V0SXNEZXRhY2hlZCA9ICFpbkRvYyh0YXJnZXQpO1xuICAgICAgdmFyIG9wID0gd2l0aFRyYW5zaXRpb24gPT09IGZhbHNlIHx8IHRhcmdldElzRGV0YWNoZWQgPyBvcDEgOiBvcDI7XG4gICAgICB2YXIgc2hvdWxkQ2FsbEhvb2sgPSAhdGFyZ2V0SXNEZXRhY2hlZCAmJiAhdm0uX2lzQXR0YWNoZWQgJiYgIWluRG9jKHZtLiRlbCk7XG4gICAgICBpZiAodm0uX2lzRnJhZ21lbnQpIHtcbiAgICAgICAgbWFwTm9kZVJhbmdlKHZtLl9mcmFnbWVudFN0YXJ0LCB2bS5fZnJhZ21lbnRFbmQsIGZ1bmN0aW9uIChub2RlKSB7XG4gICAgICAgICAgb3Aobm9kZSwgdGFyZ2V0LCB2bSk7XG4gICAgICAgIH0pO1xuICAgICAgICBjYiAmJiBjYigpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgb3Aodm0uJGVsLCB0YXJnZXQsIHZtLCBjYik7XG4gICAgICB9XG4gICAgICBpZiAoc2hvdWxkQ2FsbEhvb2spIHtcbiAgICAgICAgdm0uX2NhbGxIb29rKCdhdHRhY2hlZCcpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHZtO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENoZWNrIGZvciBzZWxlY3RvcnNcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7U3RyaW5nfEVsZW1lbnR9IGVsXG4gICAgICovXG5cbiAgICBmdW5jdGlvbiBxdWVyeShlbCkge1xuICAgICAgcmV0dXJuIHR5cGVvZiBlbCA9PT0gJ3N0cmluZycgPyBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGVsKSA6IGVsO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEFwcGVuZCBvcGVyYXRpb24gdGhhdCB0YWtlcyBhIGNhbGxiYWNrLlxuICAgICAqXG4gICAgICogQHBhcmFtIHtOb2RlfSBlbFxuICAgICAqIEBwYXJhbSB7Tm9kZX0gdGFyZ2V0XG4gICAgICogQHBhcmFtIHtWdWV9IHZtIC0gdW51c2VkXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gW2NiXVxuICAgICAqL1xuXG4gICAgZnVuY3Rpb24gYXBwZW5kKGVsLCB0YXJnZXQsIHZtLCBjYikge1xuICAgICAgdGFyZ2V0LmFwcGVuZENoaWxkKGVsKTtcbiAgICAgIGlmIChjYikgY2IoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBJbnNlcnRCZWZvcmUgb3BlcmF0aW9uIHRoYXQgdGFrZXMgYSBjYWxsYmFjay5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7Tm9kZX0gZWxcbiAgICAgKiBAcGFyYW0ge05vZGV9IHRhcmdldFxuICAgICAqIEBwYXJhbSB7VnVlfSB2bSAtIHVudXNlZFxuICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IFtjYl1cbiAgICAgKi9cblxuICAgIGZ1bmN0aW9uIGJlZm9yZVdpdGhDYihlbCwgdGFyZ2V0LCB2bSwgY2IpIHtcbiAgICAgIGJlZm9yZShlbCwgdGFyZ2V0KTtcbiAgICAgIGlmIChjYikgY2IoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZW1vdmUgb3BlcmF0aW9uIHRoYXQgdGFrZXMgYSBjYWxsYmFjay5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7Tm9kZX0gZWxcbiAgICAgKiBAcGFyYW0ge1Z1ZX0gdm0gLSB1bnVzZWRcbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBbY2JdXG4gICAgICovXG5cbiAgICBmdW5jdGlvbiByZW1vdmVXaXRoQ2IoZWwsIHZtLCBjYikge1xuICAgICAgcmVtb3ZlKGVsKTtcbiAgICAgIGlmIChjYikgY2IoKTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBldmVudHNBUEkgKFZ1ZSkge1xuICAgIC8qKlxuICAgICAqIExpc3RlbiBvbiB0aGUgZ2l2ZW4gYGV2ZW50YCB3aXRoIGBmbmAuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gZXZlbnRcbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBmblxuICAgICAqL1xuXG4gICAgVnVlLnByb3RvdHlwZS4kb24gPSBmdW5jdGlvbiAoZXZlbnQsIGZuKSB7XG4gICAgICAodGhpcy5fZXZlbnRzW2V2ZW50XSB8fCAodGhpcy5fZXZlbnRzW2V2ZW50XSA9IFtdKSkucHVzaChmbik7XG4gICAgICBtb2RpZnlMaXN0ZW5lckNvdW50KHRoaXMsIGV2ZW50LCAxKTtcbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBBZGRzIGFuIGBldmVudGAgbGlzdGVuZXIgdGhhdCB3aWxsIGJlIGludm9rZWQgYSBzaW5nbGVcbiAgICAgKiB0aW1lIHRoZW4gYXV0b21hdGljYWxseSByZW1vdmVkLlxuICAgICAqXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IGV2ZW50XG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gZm5cbiAgICAgKi9cblxuICAgIFZ1ZS5wcm90b3R5cGUuJG9uY2UgPSBmdW5jdGlvbiAoZXZlbnQsIGZuKSB7XG4gICAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgICBmdW5jdGlvbiBvbigpIHtcbiAgICAgICAgc2VsZi4kb2ZmKGV2ZW50LCBvbik7XG4gICAgICAgIGZuLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgICB9XG4gICAgICBvbi5mbiA9IGZuO1xuICAgICAgdGhpcy4kb24oZXZlbnQsIG9uKTtcbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBSZW1vdmUgdGhlIGdpdmVuIGNhbGxiYWNrIGZvciBgZXZlbnRgIG9yIGFsbFxuICAgICAqIHJlZ2lzdGVyZWQgY2FsbGJhY2tzLlxuICAgICAqXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IGV2ZW50XG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gZm5cbiAgICAgKi9cblxuICAgIFZ1ZS5wcm90b3R5cGUuJG9mZiA9IGZ1bmN0aW9uIChldmVudCwgZm4pIHtcbiAgICAgIHZhciBjYnM7XG4gICAgICAvLyBhbGxcbiAgICAgIGlmICghYXJndW1lbnRzLmxlbmd0aCkge1xuICAgICAgICBpZiAodGhpcy4kcGFyZW50KSB7XG4gICAgICAgICAgZm9yIChldmVudCBpbiB0aGlzLl9ldmVudHMpIHtcbiAgICAgICAgICAgIGNicyA9IHRoaXMuX2V2ZW50c1tldmVudF07XG4gICAgICAgICAgICBpZiAoY2JzKSB7XG4gICAgICAgICAgICAgIG1vZGlmeUxpc3RlbmVyQ291bnQodGhpcywgZXZlbnQsIC1jYnMubGVuZ3RoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fZXZlbnRzID0ge307XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgfVxuICAgICAgLy8gc3BlY2lmaWMgZXZlbnRcbiAgICAgIGNicyA9IHRoaXMuX2V2ZW50c1tldmVudF07XG4gICAgICBpZiAoIWNicykge1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgIH1cbiAgICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID09PSAxKSB7XG4gICAgICAgIG1vZGlmeUxpc3RlbmVyQ291bnQodGhpcywgZXZlbnQsIC1jYnMubGVuZ3RoKTtcbiAgICAgICAgdGhpcy5fZXZlbnRzW2V2ZW50XSA9IG51bGw7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgfVxuICAgICAgLy8gc3BlY2lmaWMgaGFuZGxlclxuICAgICAgdmFyIGNiO1xuICAgICAgdmFyIGkgPSBjYnMubGVuZ3RoO1xuICAgICAgd2hpbGUgKGktLSkge1xuICAgICAgICBjYiA9IGNic1tpXTtcbiAgICAgICAgaWYgKGNiID09PSBmbiB8fCBjYi5mbiA9PT0gZm4pIHtcbiAgICAgICAgICBtb2RpZnlMaXN0ZW5lckNvdW50KHRoaXMsIGV2ZW50LCAtMSk7XG4gICAgICAgICAgY2JzLnNwbGljZShpLCAxKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIFRyaWdnZXIgYW4gZXZlbnQgb24gc2VsZi5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7U3RyaW5nfE9iamVjdH0gZXZlbnRcbiAgICAgKiBAcmV0dXJuIHtCb29sZWFufSBzaG91bGRQcm9wYWdhdGVcbiAgICAgKi9cblxuICAgIFZ1ZS5wcm90b3R5cGUuJGVtaXQgPSBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgIHZhciBpc1NvdXJjZSA9IHR5cGVvZiBldmVudCA9PT0gJ3N0cmluZyc7XG4gICAgICBldmVudCA9IGlzU291cmNlID8gZXZlbnQgOiBldmVudC5uYW1lO1xuICAgICAgdmFyIGNicyA9IHRoaXMuX2V2ZW50c1tldmVudF07XG4gICAgICB2YXIgc2hvdWxkUHJvcGFnYXRlID0gaXNTb3VyY2UgfHwgIWNicztcbiAgICAgIGlmIChjYnMpIHtcbiAgICAgICAgY2JzID0gY2JzLmxlbmd0aCA+IDEgPyB0b0FycmF5KGNicykgOiBjYnM7XG4gICAgICAgIC8vIHRoaXMgaXMgYSBzb21ld2hhdCBoYWNreSBzb2x1dGlvbiB0byB0aGUgcXVlc3Rpb24gcmFpc2VkXG4gICAgICAgIC8vIGluICMyMTAyOiBmb3IgYW4gaW5saW5lIGNvbXBvbmVudCBsaXN0ZW5lciBsaWtlIDxjb21wIEB0ZXN0PVwiZG9UaGlzXCI+LFxuICAgICAgICAvLyB0aGUgcHJvcGFnYXRpb24gaGFuZGxpbmcgaXMgc29tZXdoYXQgYnJva2VuLiBUaGVyZWZvcmUgd2VcbiAgICAgICAgLy8gbmVlZCB0byB0cmVhdCB0aGVzZSBpbmxpbmUgY2FsbGJhY2tzIGRpZmZlcmVudGx5LlxuICAgICAgICB2YXIgaGFzUGFyZW50Q2JzID0gaXNTb3VyY2UgJiYgY2JzLnNvbWUoZnVuY3Rpb24gKGNiKSB7XG4gICAgICAgICAgcmV0dXJuIGNiLl9mcm9tUGFyZW50O1xuICAgICAgICB9KTtcbiAgICAgICAgaWYgKGhhc1BhcmVudENicykge1xuICAgICAgICAgIHNob3VsZFByb3BhZ2F0ZSA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIHZhciBhcmdzID0gdG9BcnJheShhcmd1bWVudHMsIDEpO1xuICAgICAgICBmb3IgKHZhciBpID0gMCwgbCA9IGNicy5sZW5ndGg7IGkgPCBsOyBpKyspIHtcbiAgICAgICAgICB2YXIgY2IgPSBjYnNbaV07XG4gICAgICAgICAgdmFyIHJlcyA9IGNiLmFwcGx5KHRoaXMsIGFyZ3MpO1xuICAgICAgICAgIGlmIChyZXMgPT09IHRydWUgJiYgKCFoYXNQYXJlbnRDYnMgfHwgY2IuX2Zyb21QYXJlbnQpKSB7XG4gICAgICAgICAgICBzaG91bGRQcm9wYWdhdGUgPSB0cnVlO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIHNob3VsZFByb3BhZ2F0ZTtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogUmVjdXJzaXZlbHkgYnJvYWRjYXN0IGFuIGV2ZW50IHRvIGFsbCBjaGlsZHJlbiBpbnN0YW5jZXMuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge1N0cmluZ3xPYmplY3R9IGV2ZW50XG4gICAgICogQHBhcmFtIHsuLi4qfSBhZGRpdGlvbmFsIGFyZ3VtZW50c1xuICAgICAqL1xuXG4gICAgVnVlLnByb3RvdHlwZS4kYnJvYWRjYXN0ID0gZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICB2YXIgaXNTb3VyY2UgPSB0eXBlb2YgZXZlbnQgPT09ICdzdHJpbmcnO1xuICAgICAgZXZlbnQgPSBpc1NvdXJjZSA/IGV2ZW50IDogZXZlbnQubmFtZTtcbiAgICAgIC8vIGlmIG5vIGNoaWxkIGhhcyByZWdpc3RlcmVkIGZvciB0aGlzIGV2ZW50LFxuICAgICAgLy8gdGhlbiB0aGVyZSdzIG5vIG5lZWQgdG8gYnJvYWRjYXN0LlxuICAgICAgaWYgKCF0aGlzLl9ldmVudHNDb3VudFtldmVudF0pIHJldHVybjtcbiAgICAgIHZhciBjaGlsZHJlbiA9IHRoaXMuJGNoaWxkcmVuO1xuICAgICAgdmFyIGFyZ3MgPSB0b0FycmF5KGFyZ3VtZW50cyk7XG4gICAgICBpZiAoaXNTb3VyY2UpIHtcbiAgICAgICAgLy8gdXNlIG9iamVjdCBldmVudCB0byBpbmRpY2F0ZSBub24tc291cmNlIGVtaXRcbiAgICAgICAgLy8gb24gY2hpbGRyZW5cbiAgICAgICAgYXJnc1swXSA9IHsgbmFtZTogZXZlbnQsIHNvdXJjZTogdGhpcyB9O1xuICAgICAgfVxuICAgICAgZm9yICh2YXIgaSA9IDAsIGwgPSBjaGlsZHJlbi5sZW5ndGg7IGkgPCBsOyBpKyspIHtcbiAgICAgICAgdmFyIGNoaWxkID0gY2hpbGRyZW5baV07XG4gICAgICAgIHZhciBzaG91bGRQcm9wYWdhdGUgPSBjaGlsZC4kZW1pdC5hcHBseShjaGlsZCwgYXJncyk7XG4gICAgICAgIGlmIChzaG91bGRQcm9wYWdhdGUpIHtcbiAgICAgICAgICBjaGlsZC4kYnJvYWRjYXN0LmFwcGx5KGNoaWxkLCBhcmdzKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIFJlY3Vyc2l2ZWx5IHByb3BhZ2F0ZSBhbiBldmVudCB1cCB0aGUgcGFyZW50IGNoYWluLlxuICAgICAqXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IGV2ZW50XG4gICAgICogQHBhcmFtIHsuLi4qfSBhZGRpdGlvbmFsIGFyZ3VtZW50c1xuICAgICAqL1xuXG4gICAgVnVlLnByb3RvdHlwZS4kZGlzcGF0Y2ggPSBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgIHZhciBzaG91bGRQcm9wYWdhdGUgPSB0aGlzLiRlbWl0LmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgICBpZiAoIXNob3VsZFByb3BhZ2F0ZSkgcmV0dXJuO1xuICAgICAgdmFyIHBhcmVudCA9IHRoaXMuJHBhcmVudDtcbiAgICAgIHZhciBhcmdzID0gdG9BcnJheShhcmd1bWVudHMpO1xuICAgICAgLy8gdXNlIG9iamVjdCBldmVudCB0byBpbmRpY2F0ZSBub24tc291cmNlIGVtaXRcbiAgICAgIC8vIG9uIHBhcmVudHNcbiAgICAgIGFyZ3NbMF0gPSB7IG5hbWU6IGV2ZW50LCBzb3VyY2U6IHRoaXMgfTtcbiAgICAgIHdoaWxlIChwYXJlbnQpIHtcbiAgICAgICAgc2hvdWxkUHJvcGFnYXRlID0gcGFyZW50LiRlbWl0LmFwcGx5KHBhcmVudCwgYXJncyk7XG4gICAgICAgIHBhcmVudCA9IHNob3VsZFByb3BhZ2F0ZSA/IHBhcmVudC4kcGFyZW50IDogbnVsbDtcbiAgICAgIH1cbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBNb2RpZnkgdGhlIGxpc3RlbmVyIGNvdW50cyBvbiBhbGwgcGFyZW50cy5cbiAgICAgKiBUaGlzIGJvb2trZWVwaW5nIGFsbG93cyAkYnJvYWRjYXN0IHRvIHJldHVybiBlYXJseSB3aGVuXG4gICAgICogbm8gY2hpbGQgaGFzIGxpc3RlbmVkIHRvIGEgY2VydGFpbiBldmVudC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7VnVlfSB2bVxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBldmVudFxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSBjb3VudFxuICAgICAqL1xuXG4gICAgdmFyIGhvb2tSRSA9IC9eaG9vazovO1xuICAgIGZ1bmN0aW9uIG1vZGlmeUxpc3RlbmVyQ291bnQodm0sIGV2ZW50LCBjb3VudCkge1xuICAgICAgdmFyIHBhcmVudCA9IHZtLiRwYXJlbnQ7XG4gICAgICAvLyBob29rcyBkbyBub3QgZ2V0IGJyb2FkY2FzdGVkIHNvIG5vIG5lZWRcbiAgICAgIC8vIHRvIGRvIGJvb2trZWVwaW5nIGZvciB0aGVtXG4gICAgICBpZiAoIXBhcmVudCB8fCAhY291bnQgfHwgaG9va1JFLnRlc3QoZXZlbnQpKSByZXR1cm47XG4gICAgICB3aGlsZSAocGFyZW50KSB7XG4gICAgICAgIHBhcmVudC5fZXZlbnRzQ291bnRbZXZlbnRdID0gKHBhcmVudC5fZXZlbnRzQ291bnRbZXZlbnRdIHx8IDApICsgY291bnQ7XG4gICAgICAgIHBhcmVudCA9IHBhcmVudC4kcGFyZW50O1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIGxpZmVjeWNsZUFQSSAoVnVlKSB7XG4gICAgLyoqXG4gICAgICogU2V0IGluc3RhbmNlIHRhcmdldCBlbGVtZW50IGFuZCBraWNrIG9mZiB0aGUgY29tcGlsYXRpb25cbiAgICAgKiBwcm9jZXNzLiBUaGUgcGFzc2VkIGluIGBlbGAgY2FuIGJlIGEgc2VsZWN0b3Igc3RyaW5nLCBhblxuICAgICAqIGV4aXN0aW5nIEVsZW1lbnQsIG9yIGEgRG9jdW1lbnRGcmFnbWVudCAoZm9yIGJsb2NrXG4gICAgICogaW5zdGFuY2VzKS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7RWxlbWVudHxEb2N1bWVudEZyYWdtZW50fHN0cmluZ30gZWxcbiAgICAgKiBAcHVibGljXG4gICAgICovXG5cbiAgICBWdWUucHJvdG90eXBlLiRtb3VudCA9IGZ1bmN0aW9uIChlbCkge1xuICAgICAgaWYgKHRoaXMuX2lzQ29tcGlsZWQpIHtcbiAgICAgICAgJ2RldmVsb3BtZW50JyAhPT0gJ3Byb2R1Y3Rpb24nICYmIHdhcm4oJyRtb3VudCgpIHNob3VsZCBiZSBjYWxsZWQgb25seSBvbmNlLicsIHRoaXMpO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBlbCA9IHF1ZXJ5KGVsKTtcbiAgICAgIGlmICghZWwpIHtcbiAgICAgICAgZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgIH1cbiAgICAgIHRoaXMuX2NvbXBpbGUoZWwpO1xuICAgICAgdGhpcy5faW5pdERPTUhvb2tzKCk7XG4gICAgICBpZiAoaW5Eb2ModGhpcy4kZWwpKSB7XG4gICAgICAgIHRoaXMuX2NhbGxIb29rKCdhdHRhY2hlZCcpO1xuICAgICAgICByZWFkeS5jYWxsKHRoaXMpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy4kb25jZSgnaG9vazphdHRhY2hlZCcsIHJlYWR5KTtcbiAgICAgIH1cbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBNYXJrIGFuIGluc3RhbmNlIGFzIHJlYWR5LlxuICAgICAqL1xuXG4gICAgZnVuY3Rpb24gcmVhZHkoKSB7XG4gICAgICB0aGlzLl9pc0F0dGFjaGVkID0gdHJ1ZTtcbiAgICAgIHRoaXMuX2lzUmVhZHkgPSB0cnVlO1xuICAgICAgdGhpcy5fY2FsbEhvb2soJ3JlYWR5Jyk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogVGVhcmRvd24gdGhlIGluc3RhbmNlLCBzaW1wbHkgZGVsZWdhdGUgdG8gdGhlIGludGVybmFsXG4gICAgICogX2Rlc3Ryb3kuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge0Jvb2xlYW59IHJlbW92ZVxuICAgICAqIEBwYXJhbSB7Qm9vbGVhbn0gZGVmZXJDbGVhbnVwXG4gICAgICovXG5cbiAgICBWdWUucHJvdG90eXBlLiRkZXN0cm95ID0gZnVuY3Rpb24gKHJlbW92ZSwgZGVmZXJDbGVhbnVwKSB7XG4gICAgICB0aGlzLl9kZXN0cm95KHJlbW92ZSwgZGVmZXJDbGVhbnVwKTtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogUGFydGlhbGx5IGNvbXBpbGUgYSBwaWVjZSBvZiBET00gYW5kIHJldHVybiBhXG4gICAgICogZGVjb21waWxlIGZ1bmN0aW9uLlxuICAgICAqXG4gICAgICogQHBhcmFtIHtFbGVtZW50fERvY3VtZW50RnJhZ21lbnR9IGVsXG4gICAgICogQHBhcmFtIHtWdWV9IFtob3N0XVxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBbc2NvcGVdXG4gICAgICogQHBhcmFtIHtGcmFnbWVudH0gW2ZyYWddXG4gICAgICogQHJldHVybiB7RnVuY3Rpb259XG4gICAgICovXG5cbiAgICBWdWUucHJvdG90eXBlLiRjb21waWxlID0gZnVuY3Rpb24gKGVsLCBob3N0LCBzY29wZSwgZnJhZykge1xuICAgICAgcmV0dXJuIGNvbXBpbGUoZWwsIHRoaXMuJG9wdGlvbnMsIHRydWUpKHRoaXMsIGVsLCBob3N0LCBzY29wZSwgZnJhZyk7XG4gICAgfTtcbiAgfVxuXG4gIC8qKlxuICAgKiBUaGUgZXhwb3NlZCBWdWUgY29uc3RydWN0b3IuXG4gICAqXG4gICAqIEFQSSBjb252ZW50aW9uczpcbiAgICogLSBwdWJsaWMgQVBJIG1ldGhvZHMvcHJvcGVydGllcyBhcmUgcHJlZml4ZWQgd2l0aCBgJGBcbiAgICogLSBpbnRlcm5hbCBtZXRob2RzL3Byb3BlcnRpZXMgYXJlIHByZWZpeGVkIHdpdGggYF9gXG4gICAqIC0gbm9uLXByZWZpeGVkIHByb3BlcnRpZXMgYXJlIGFzc3VtZWQgdG8gYmUgcHJveGllZCB1c2VyXG4gICAqICAgZGF0YS5cbiAgICpcbiAgICogQGNvbnN0cnVjdG9yXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBbb3B0aW9uc11cbiAgICogQHB1YmxpY1xuICAgKi9cblxuICBmdW5jdGlvbiBWdWUob3B0aW9ucykge1xuICAgIHRoaXMuX2luaXQob3B0aW9ucyk7XG4gIH1cblxuICAvLyBpbnN0YWxsIGludGVybmFsc1xuICBpbml0TWl4aW4oVnVlKTtcbiAgc3RhdGVNaXhpbihWdWUpO1xuICBldmVudHNNaXhpbihWdWUpO1xuICBsaWZlY3ljbGVNaXhpbihWdWUpO1xuICBtaXNjTWl4aW4oVnVlKTtcblxuICAvLyBpbnN0YWxsIGluc3RhbmNlIEFQSXNcbiAgZGF0YUFQSShWdWUpO1xuICBkb21BUEkoVnVlKTtcbiAgZXZlbnRzQVBJKFZ1ZSk7XG4gIGxpZmVjeWNsZUFQSShWdWUpO1xuXG4gIHZhciBzbG90ID0ge1xuXG4gICAgcHJpb3JpdHk6IFNMT1QsXG4gICAgcGFyYW1zOiBbJ25hbWUnXSxcblxuICAgIGJpbmQ6IGZ1bmN0aW9uIGJpbmQoKSB7XG4gICAgICAvLyB0aGlzIHdhcyByZXNvbHZlZCBkdXJpbmcgY29tcG9uZW50IHRyYW5zY2x1c2lvblxuICAgICAgdmFyIG5hbWUgPSB0aGlzLnBhcmFtcy5uYW1lIHx8ICdkZWZhdWx0JztcbiAgICAgIHZhciBjb250ZW50ID0gdGhpcy52bS5fc2xvdENvbnRlbnRzICYmIHRoaXMudm0uX3Nsb3RDb250ZW50c1tuYW1lXTtcbiAgICAgIGlmICghY29udGVudCB8fCAhY29udGVudC5oYXNDaGlsZE5vZGVzKCkpIHtcbiAgICAgICAgdGhpcy5mYWxsYmFjaygpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5jb21waWxlKGNvbnRlbnQuY2xvbmVOb2RlKHRydWUpLCB0aGlzLnZtLl9jb250ZXh0LCB0aGlzLnZtKTtcbiAgICAgIH1cbiAgICB9LFxuXG4gICAgY29tcGlsZTogZnVuY3Rpb24gY29tcGlsZShjb250ZW50LCBjb250ZXh0LCBob3N0KSB7XG4gICAgICBpZiAoY29udGVudCAmJiBjb250ZXh0KSB7XG4gICAgICAgIGlmICh0aGlzLmVsLmhhc0NoaWxkTm9kZXMoKSAmJiBjb250ZW50LmNoaWxkTm9kZXMubGVuZ3RoID09PSAxICYmIGNvbnRlbnQuY2hpbGROb2Rlc1swXS5ub2RlVHlwZSA9PT0gMSAmJiBjb250ZW50LmNoaWxkTm9kZXNbMF0uaGFzQXR0cmlidXRlKCd2LWlmJykpIHtcbiAgICAgICAgICAvLyBpZiB0aGUgaW5zZXJ0ZWQgc2xvdCBoYXMgdi1pZlxuICAgICAgICAgIC8vIGluamVjdCBmYWxsYmFjayBjb250ZW50IGFzIHRoZSB2LWVsc2VcbiAgICAgICAgICB2YXIgZWxzZUJsb2NrID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndGVtcGxhdGUnKTtcbiAgICAgICAgICBlbHNlQmxvY2suc2V0QXR0cmlidXRlKCd2LWVsc2UnLCAnJyk7XG4gICAgICAgICAgZWxzZUJsb2NrLmlubmVySFRNTCA9IHRoaXMuZWwuaW5uZXJIVE1MO1xuICAgICAgICAgIC8vIHRoZSBlbHNlIGJsb2NrIHNob3VsZCBiZSBjb21waWxlZCBpbiBjaGlsZCBzY29wZVxuICAgICAgICAgIGVsc2VCbG9jay5fY29udGV4dCA9IHRoaXMudm07XG4gICAgICAgICAgY29udGVudC5hcHBlbmRDaGlsZChlbHNlQmxvY2spO1xuICAgICAgICB9XG4gICAgICAgIHZhciBzY29wZSA9IGhvc3QgPyBob3N0Ll9zY29wZSA6IHRoaXMuX3Njb3BlO1xuICAgICAgICB0aGlzLnVubGluayA9IGNvbnRleHQuJGNvbXBpbGUoY29udGVudCwgaG9zdCwgc2NvcGUsIHRoaXMuX2ZyYWcpO1xuICAgICAgfVxuICAgICAgaWYgKGNvbnRlbnQpIHtcbiAgICAgICAgcmVwbGFjZSh0aGlzLmVsLCBjb250ZW50KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJlbW92ZSh0aGlzLmVsKTtcbiAgICAgIH1cbiAgICB9LFxuXG4gICAgZmFsbGJhY2s6IGZ1bmN0aW9uIGZhbGxiYWNrKCkge1xuICAgICAgdGhpcy5jb21waWxlKGV4dHJhY3RDb250ZW50KHRoaXMuZWwsIHRydWUpLCB0aGlzLnZtKTtcbiAgICB9LFxuXG4gICAgdW5iaW5kOiBmdW5jdGlvbiB1bmJpbmQoKSB7XG4gICAgICBpZiAodGhpcy51bmxpbmspIHtcbiAgICAgICAgdGhpcy51bmxpbmsoKTtcbiAgICAgIH1cbiAgICB9XG4gIH07XG5cbiAgdmFyIHBhcnRpYWwgPSB7XG5cbiAgICBwcmlvcml0eTogUEFSVElBTCxcblxuICAgIHBhcmFtczogWyduYW1lJ10sXG5cbiAgICAvLyB3YXRjaCBjaGFuZ2VzIHRvIG5hbWUgZm9yIGR5bmFtaWMgcGFydGlhbHNcbiAgICBwYXJhbVdhdGNoZXJzOiB7XG4gICAgICBuYW1lOiBmdW5jdGlvbiBuYW1lKHZhbHVlKSB7XG4gICAgICAgIHZJZi5yZW1vdmUuY2FsbCh0aGlzKTtcbiAgICAgICAgaWYgKHZhbHVlKSB7XG4gICAgICAgICAgdGhpcy5pbnNlcnQodmFsdWUpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSxcblxuICAgIGJpbmQ6IGZ1bmN0aW9uIGJpbmQoKSB7XG4gICAgICB0aGlzLmFuY2hvciA9IGNyZWF0ZUFuY2hvcigndi1wYXJ0aWFsJyk7XG4gICAgICByZXBsYWNlKHRoaXMuZWwsIHRoaXMuYW5jaG9yKTtcbiAgICAgIHRoaXMuaW5zZXJ0KHRoaXMucGFyYW1zLm5hbWUpO1xuICAgIH0sXG5cbiAgICBpbnNlcnQ6IGZ1bmN0aW9uIGluc2VydChpZCkge1xuICAgICAgdmFyIHBhcnRpYWwgPSByZXNvbHZlQXNzZXQodGhpcy52bS4kb3B0aW9ucywgJ3BhcnRpYWxzJywgaWQsIHRydWUpO1xuICAgICAgaWYgKHBhcnRpYWwpIHtcbiAgICAgICAgdGhpcy5mYWN0b3J5ID0gbmV3IEZyYWdtZW50RmFjdG9yeSh0aGlzLnZtLCBwYXJ0aWFsKTtcbiAgICAgICAgdklmLmluc2VydC5jYWxsKHRoaXMpO1xuICAgICAgfVxuICAgIH0sXG5cbiAgICB1bmJpbmQ6IGZ1bmN0aW9uIHVuYmluZCgpIHtcbiAgICAgIGlmICh0aGlzLmZyYWcpIHtcbiAgICAgICAgdGhpcy5mcmFnLmRlc3Ryb3koKTtcbiAgICAgIH1cbiAgICB9XG4gIH07XG5cbiAgdmFyIGVsZW1lbnREaXJlY3RpdmVzID0ge1xuICAgIHNsb3Q6IHNsb3QsXG4gICAgcGFydGlhbDogcGFydGlhbFxuICB9O1xuXG4gIHZhciBjb252ZXJ0QXJyYXkgPSB2Rm9yLl9wb3N0UHJvY2VzcztcblxuICAvKipcbiAgICogTGltaXQgZmlsdGVyIGZvciBhcnJheXNcbiAgICpcbiAgICogQHBhcmFtIHtOdW1iZXJ9IG5cbiAgICogQHBhcmFtIHtOdW1iZXJ9IG9mZnNldCAoRGVjaW1hbCBleHBlY3RlZClcbiAgICovXG5cbiAgZnVuY3Rpb24gbGltaXRCeShhcnIsIG4sIG9mZnNldCkge1xuICAgIG9mZnNldCA9IG9mZnNldCA/IHBhcnNlSW50KG9mZnNldCwgMTApIDogMDtcbiAgICBuID0gdG9OdW1iZXIobik7XG4gICAgcmV0dXJuIHR5cGVvZiBuID09PSAnbnVtYmVyJyA/IGFyci5zbGljZShvZmZzZXQsIG9mZnNldCArIG4pIDogYXJyO1xuICB9XG5cbiAgLyoqXG4gICAqIEZpbHRlciBmaWx0ZXIgZm9yIGFycmF5c1xuICAgKlxuICAgKiBAcGFyYW0ge1N0cmluZ30gc2VhcmNoXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBbZGVsaW1pdGVyXVxuICAgKiBAcGFyYW0ge1N0cmluZ30gLi4uZGF0YUtleXNcbiAgICovXG5cbiAgZnVuY3Rpb24gZmlsdGVyQnkoYXJyLCBzZWFyY2gsIGRlbGltaXRlcikge1xuICAgIGFyciA9IGNvbnZlcnRBcnJheShhcnIpO1xuICAgIGlmIChzZWFyY2ggPT0gbnVsbCkge1xuICAgICAgcmV0dXJuIGFycjtcbiAgICB9XG4gICAgaWYgKHR5cGVvZiBzZWFyY2ggPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIHJldHVybiBhcnIuZmlsdGVyKHNlYXJjaCk7XG4gICAgfVxuICAgIC8vIGNhc3QgdG8gbG93ZXJjYXNlIHN0cmluZ1xuICAgIHNlYXJjaCA9ICgnJyArIHNlYXJjaCkudG9Mb3dlckNhc2UoKTtcbiAgICAvLyBhbGxvdyBvcHRpb25hbCBgaW5gIGRlbGltaXRlclxuICAgIC8vIGJlY2F1c2Ugd2h5IG5vdFxuICAgIHZhciBuID0gZGVsaW1pdGVyID09PSAnaW4nID8gMyA6IDI7XG4gICAgLy8gZXh0cmFjdCBhbmQgZmxhdHRlbiBrZXlzXG4gICAgdmFyIGtleXMgPSBBcnJheS5wcm90b3R5cGUuY29uY2F0LmFwcGx5KFtdLCB0b0FycmF5KGFyZ3VtZW50cywgbikpO1xuICAgIHZhciByZXMgPSBbXTtcbiAgICB2YXIgaXRlbSwga2V5LCB2YWwsIGo7XG4gICAgZm9yICh2YXIgaSA9IDAsIGwgPSBhcnIubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG4gICAgICBpdGVtID0gYXJyW2ldO1xuICAgICAgdmFsID0gaXRlbSAmJiBpdGVtLiR2YWx1ZSB8fCBpdGVtO1xuICAgICAgaiA9IGtleXMubGVuZ3RoO1xuICAgICAgaWYgKGopIHtcbiAgICAgICAgd2hpbGUgKGotLSkge1xuICAgICAgICAgIGtleSA9IGtleXNbal07XG4gICAgICAgICAgaWYgKGtleSA9PT0gJyRrZXknICYmIGNvbnRhaW5zKGl0ZW0uJGtleSwgc2VhcmNoKSB8fCBjb250YWlucyhnZXRQYXRoKHZhbCwga2V5KSwgc2VhcmNoKSkge1xuICAgICAgICAgICAgcmVzLnB1c2goaXRlbSk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSBpZiAoY29udGFpbnMoaXRlbSwgc2VhcmNoKSkge1xuICAgICAgICByZXMucHVzaChpdGVtKTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHJlcztcbiAgfVxuXG4gIC8qKlxuICAgKiBGaWx0ZXIgZmlsdGVyIGZvciBhcnJheXNcbiAgICpcbiAgICogQHBhcmFtIHtTdHJpbmd8QXJyYXk8U3RyaW5nPnxGdW5jdGlvbn0gLi4uc29ydEtleXNcbiAgICogQHBhcmFtIHtOdW1iZXJ9IFtvcmRlcl1cbiAgICovXG5cbiAgZnVuY3Rpb24gb3JkZXJCeShhcnIpIHtcbiAgICB2YXIgY29tcGFyYXRvciA9IG51bGw7XG4gICAgdmFyIHNvcnRLZXlzID0gdW5kZWZpbmVkO1xuICAgIGFyciA9IGNvbnZlcnRBcnJheShhcnIpO1xuXG4gICAgLy8gZGV0ZXJtaW5lIG9yZGVyIChsYXN0IGFyZ3VtZW50KVxuICAgIHZhciBhcmdzID0gdG9BcnJheShhcmd1bWVudHMsIDEpO1xuICAgIHZhciBvcmRlciA9IGFyZ3NbYXJncy5sZW5ndGggLSAxXTtcbiAgICBpZiAodHlwZW9mIG9yZGVyID09PSAnbnVtYmVyJykge1xuICAgICAgb3JkZXIgPSBvcmRlciA8IDAgPyAtMSA6IDE7XG4gICAgICBhcmdzID0gYXJncy5sZW5ndGggPiAxID8gYXJncy5zbGljZSgwLCAtMSkgOiBhcmdzO1xuICAgIH0gZWxzZSB7XG4gICAgICBvcmRlciA9IDE7XG4gICAgfVxuXG4gICAgLy8gZGV0ZXJtaW5lIHNvcnRLZXlzICYgY29tcGFyYXRvclxuICAgIHZhciBmaXJzdEFyZyA9IGFyZ3NbMF07XG4gICAgaWYgKCFmaXJzdEFyZykge1xuICAgICAgcmV0dXJuIGFycjtcbiAgICB9IGVsc2UgaWYgKHR5cGVvZiBmaXJzdEFyZyA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgLy8gY3VzdG9tIGNvbXBhcmF0b3JcbiAgICAgIGNvbXBhcmF0b3IgPSBmdW5jdGlvbiAoYSwgYikge1xuICAgICAgICByZXR1cm4gZmlyc3RBcmcoYSwgYikgKiBvcmRlcjtcbiAgICAgIH07XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIHN0cmluZyBrZXlzLiBmbGF0dGVuIGZpcnN0XG4gICAgICBzb3J0S2V5cyA9IEFycmF5LnByb3RvdHlwZS5jb25jYXQuYXBwbHkoW10sIGFyZ3MpO1xuICAgICAgY29tcGFyYXRvciA9IGZ1bmN0aW9uIChhLCBiLCBpKSB7XG4gICAgICAgIGkgPSBpIHx8IDA7XG4gICAgICAgIHJldHVybiBpID49IHNvcnRLZXlzLmxlbmd0aCAtIDEgPyBiYXNlQ29tcGFyZShhLCBiLCBpKSA6IGJhc2VDb21wYXJlKGEsIGIsIGkpIHx8IGNvbXBhcmF0b3IoYSwgYiwgaSArIDEpO1xuICAgICAgfTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBiYXNlQ29tcGFyZShhLCBiLCBzb3J0S2V5SW5kZXgpIHtcbiAgICAgIHZhciBzb3J0S2V5ID0gc29ydEtleXNbc29ydEtleUluZGV4XTtcbiAgICAgIGlmIChzb3J0S2V5KSB7XG4gICAgICAgIGlmIChzb3J0S2V5ICE9PSAnJGtleScpIHtcbiAgICAgICAgICBpZiAoaXNPYmplY3QoYSkgJiYgJyR2YWx1ZScgaW4gYSkgYSA9IGEuJHZhbHVlO1xuICAgICAgICAgIGlmIChpc09iamVjdChiKSAmJiAnJHZhbHVlJyBpbiBiKSBiID0gYi4kdmFsdWU7XG4gICAgICAgIH1cbiAgICAgICAgYSA9IGlzT2JqZWN0KGEpID8gZ2V0UGF0aChhLCBzb3J0S2V5KSA6IGE7XG4gICAgICAgIGIgPSBpc09iamVjdChiKSA/IGdldFBhdGgoYiwgc29ydEtleSkgOiBiO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGEgPT09IGIgPyAwIDogYSA+IGIgPyBvcmRlciA6IC1vcmRlcjtcbiAgICB9XG5cbiAgICAvLyBzb3J0IG9uIGEgY29weSB0byBhdm9pZCBtdXRhdGluZyBvcmlnaW5hbCBhcnJheVxuICAgIHJldHVybiBhcnIuc2xpY2UoKS5zb3J0KGNvbXBhcmF0b3IpO1xuICB9XG5cbiAgLyoqXG4gICAqIFN0cmluZyBjb250YWluIGhlbHBlclxuICAgKlxuICAgKiBAcGFyYW0geyp9IHZhbFxuICAgKiBAcGFyYW0ge1N0cmluZ30gc2VhcmNoXG4gICAqL1xuXG4gIGZ1bmN0aW9uIGNvbnRhaW5zKHZhbCwgc2VhcmNoKSB7XG4gICAgdmFyIGk7XG4gICAgaWYgKGlzUGxhaW5PYmplY3QodmFsKSkge1xuICAgICAgdmFyIGtleXMgPSBPYmplY3Qua2V5cyh2YWwpO1xuICAgICAgaSA9IGtleXMubGVuZ3RoO1xuICAgICAgd2hpbGUgKGktLSkge1xuICAgICAgICBpZiAoY29udGFpbnModmFsW2tleXNbaV1dLCBzZWFyY2gpKSB7XG4gICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKGlzQXJyYXkodmFsKSkge1xuICAgICAgaSA9IHZhbC5sZW5ndGg7XG4gICAgICB3aGlsZSAoaS0tKSB7XG4gICAgICAgIGlmIChjb250YWlucyh2YWxbaV0sIHNlYXJjaCkpIHtcbiAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0gZWxzZSBpZiAodmFsICE9IG51bGwpIHtcbiAgICAgIHJldHVybiB2YWwudG9TdHJpbmcoKS50b0xvd2VyQ2FzZSgpLmluZGV4T2Yoc2VhcmNoKSA+IC0xO1xuICAgIH1cbiAgfVxuXG4gIHZhciBkaWdpdHNSRSA9IC8oXFxkezN9KSg/PVxcZCkvZztcblxuICAvLyBhc3NldCBjb2xsZWN0aW9ucyBtdXN0IGJlIGEgcGxhaW4gb2JqZWN0LlxuICB2YXIgZmlsdGVycyA9IHtcblxuICAgIG9yZGVyQnk6IG9yZGVyQnksXG4gICAgZmlsdGVyQnk6IGZpbHRlckJ5LFxuICAgIGxpbWl0Qnk6IGxpbWl0QnksXG5cbiAgICAvKipcbiAgICAgKiBTdHJpbmdpZnkgdmFsdWUuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge051bWJlcn0gaW5kZW50XG4gICAgICovXG5cbiAgICBqc29uOiB7XG4gICAgICByZWFkOiBmdW5jdGlvbiByZWFkKHZhbHVlLCBpbmRlbnQpIHtcbiAgICAgICAgcmV0dXJuIHR5cGVvZiB2YWx1ZSA9PT0gJ3N0cmluZycgPyB2YWx1ZSA6IEpTT04uc3RyaW5naWZ5KHZhbHVlLCBudWxsLCBOdW1iZXIoaW5kZW50KSB8fCAyKTtcbiAgICAgIH0sXG4gICAgICB3cml0ZTogZnVuY3Rpb24gd3JpdGUodmFsdWUpIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICByZXR1cm4gSlNPTi5wYXJzZSh2YWx1ZSk7XG4gICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICByZXR1cm4gdmFsdWU7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogJ2FiYycgPT4gJ0FiYydcbiAgICAgKi9cblxuICAgIGNhcGl0YWxpemU6IGZ1bmN0aW9uIGNhcGl0YWxpemUodmFsdWUpIHtcbiAgICAgIGlmICghdmFsdWUgJiYgdmFsdWUgIT09IDApIHJldHVybiAnJztcbiAgICAgIHZhbHVlID0gdmFsdWUudG9TdHJpbmcoKTtcbiAgICAgIHJldHVybiB2YWx1ZS5jaGFyQXQoMCkudG9VcHBlckNhc2UoKSArIHZhbHVlLnNsaWNlKDEpO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiAnYWJjJyA9PiAnQUJDJ1xuICAgICAqL1xuXG4gICAgdXBwZXJjYXNlOiBmdW5jdGlvbiB1cHBlcmNhc2UodmFsdWUpIHtcbiAgICAgIHJldHVybiB2YWx1ZSB8fCB2YWx1ZSA9PT0gMCA/IHZhbHVlLnRvU3RyaW5nKCkudG9VcHBlckNhc2UoKSA6ICcnO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiAnQWJDJyA9PiAnYWJjJ1xuICAgICAqL1xuXG4gICAgbG93ZXJjYXNlOiBmdW5jdGlvbiBsb3dlcmNhc2UodmFsdWUpIHtcbiAgICAgIHJldHVybiB2YWx1ZSB8fCB2YWx1ZSA9PT0gMCA/IHZhbHVlLnRvU3RyaW5nKCkudG9Mb3dlckNhc2UoKSA6ICcnO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiAxMjM0NSA9PiAkMTIsMzQ1LjAwXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gc2lnblxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSBkZWNpbWFscyBEZWNpbWFsIHBsYWNlc1xuICAgICAqL1xuXG4gICAgY3VycmVuY3k6IGZ1bmN0aW9uIGN1cnJlbmN5KHZhbHVlLCBfY3VycmVuY3ksIGRlY2ltYWxzKSB7XG4gICAgICB2YWx1ZSA9IHBhcnNlRmxvYXQodmFsdWUpO1xuICAgICAgaWYgKCFpc0Zpbml0ZSh2YWx1ZSkgfHwgIXZhbHVlICYmIHZhbHVlICE9PSAwKSByZXR1cm4gJyc7XG4gICAgICBfY3VycmVuY3kgPSBfY3VycmVuY3kgIT0gbnVsbCA/IF9jdXJyZW5jeSA6ICckJztcbiAgICAgIGRlY2ltYWxzID0gZGVjaW1hbHMgIT0gbnVsbCA/IGRlY2ltYWxzIDogMjtcbiAgICAgIHZhciBzdHJpbmdpZmllZCA9IE1hdGguYWJzKHZhbHVlKS50b0ZpeGVkKGRlY2ltYWxzKTtcbiAgICAgIHZhciBfaW50ID0gZGVjaW1hbHMgPyBzdHJpbmdpZmllZC5zbGljZSgwLCAtMSAtIGRlY2ltYWxzKSA6IHN0cmluZ2lmaWVkO1xuICAgICAgdmFyIGkgPSBfaW50Lmxlbmd0aCAlIDM7XG4gICAgICB2YXIgaGVhZCA9IGkgPiAwID8gX2ludC5zbGljZSgwLCBpKSArIChfaW50Lmxlbmd0aCA+IDMgPyAnLCcgOiAnJykgOiAnJztcbiAgICAgIHZhciBfZmxvYXQgPSBkZWNpbWFscyA/IHN0cmluZ2lmaWVkLnNsaWNlKC0xIC0gZGVjaW1hbHMpIDogJyc7XG4gICAgICB2YXIgc2lnbiA9IHZhbHVlIDwgMCA/ICctJyA6ICcnO1xuICAgICAgcmV0dXJuIHNpZ24gKyBfY3VycmVuY3kgKyBoZWFkICsgX2ludC5zbGljZShpKS5yZXBsYWNlKGRpZ2l0c1JFLCAnJDEsJykgKyBfZmxvYXQ7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqICdpdGVtJyA9PiAnaXRlbXMnXG4gICAgICpcbiAgICAgKiBAcGFyYW1zXG4gICAgICogIGFuIGFycmF5IG9mIHN0cmluZ3MgY29ycmVzcG9uZGluZyB0b1xuICAgICAqICB0aGUgc2luZ2xlLCBkb3VibGUsIHRyaXBsZSAuLi4gZm9ybXMgb2YgdGhlIHdvcmQgdG9cbiAgICAgKiAgYmUgcGx1cmFsaXplZC4gV2hlbiB0aGUgbnVtYmVyIHRvIGJlIHBsdXJhbGl6ZWRcbiAgICAgKiAgZXhjZWVkcyB0aGUgbGVuZ3RoIG9mIHRoZSBhcmdzLCBpdCB3aWxsIHVzZSB0aGUgbGFzdFxuICAgICAqICBlbnRyeSBpbiB0aGUgYXJyYXkuXG4gICAgICpcbiAgICAgKiAgZS5nLiBbJ3NpbmdsZScsICdkb3VibGUnLCAndHJpcGxlJywgJ211bHRpcGxlJ11cbiAgICAgKi9cblxuICAgIHBsdXJhbGl6ZTogZnVuY3Rpb24gcGx1cmFsaXplKHZhbHVlKSB7XG4gICAgICB2YXIgYXJncyA9IHRvQXJyYXkoYXJndW1lbnRzLCAxKTtcbiAgICAgIHJldHVybiBhcmdzLmxlbmd0aCA+IDEgPyBhcmdzW3ZhbHVlICUgMTAgLSAxXSB8fCBhcmdzW2FyZ3MubGVuZ3RoIC0gMV0gOiBhcmdzWzBdICsgKHZhbHVlID09PSAxID8gJycgOiAncycpO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBEZWJvdW5jZSBhIGhhbmRsZXIgZnVuY3Rpb24uXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBoYW5kbGVyXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IGRlbGF5ID0gMzAwXG4gICAgICogQHJldHVybiB7RnVuY3Rpb259XG4gICAgICovXG5cbiAgICBkZWJvdW5jZTogZnVuY3Rpb24gZGVib3VuY2UoaGFuZGxlciwgZGVsYXkpIHtcbiAgICAgIGlmICghaGFuZGxlcikgcmV0dXJuO1xuICAgICAgaWYgKCFkZWxheSkge1xuICAgICAgICBkZWxheSA9IDMwMDtcbiAgICAgIH1cbiAgICAgIHJldHVybiBfZGVib3VuY2UoaGFuZGxlciwgZGVsYXkpO1xuICAgIH1cbiAgfTtcblxuICBmdW5jdGlvbiBpbnN0YWxsR2xvYmFsQVBJIChWdWUpIHtcbiAgICAvKipcbiAgICAgKiBWdWUgYW5kIGV2ZXJ5IGNvbnN0cnVjdG9yIHRoYXQgZXh0ZW5kcyBWdWUgaGFzIGFuXG4gICAgICogYXNzb2NpYXRlZCBvcHRpb25zIG9iamVjdCwgd2hpY2ggY2FuIGJlIGFjY2Vzc2VkIGR1cmluZ1xuICAgICAqIGNvbXBpbGF0aW9uIHN0ZXBzIGFzIGB0aGlzLmNvbnN0cnVjdG9yLm9wdGlvbnNgLlxuICAgICAqXG4gICAgICogVGhlc2UgY2FuIGJlIHNlZW4gYXMgdGhlIGRlZmF1bHQgb3B0aW9ucyBvZiBldmVyeVxuICAgICAqIFZ1ZSBpbnN0YW5jZS5cbiAgICAgKi9cblxuICAgIFZ1ZS5vcHRpb25zID0ge1xuICAgICAgZGlyZWN0aXZlczogZGlyZWN0aXZlcyxcbiAgICAgIGVsZW1lbnREaXJlY3RpdmVzOiBlbGVtZW50RGlyZWN0aXZlcyxcbiAgICAgIGZpbHRlcnM6IGZpbHRlcnMsXG4gICAgICB0cmFuc2l0aW9uczoge30sXG4gICAgICBjb21wb25lbnRzOiB7fSxcbiAgICAgIHBhcnRpYWxzOiB7fSxcbiAgICAgIHJlcGxhY2U6IHRydWVcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogRXhwb3NlIHVzZWZ1bCBpbnRlcm5hbHNcbiAgICAgKi9cblxuICAgIFZ1ZS51dGlsID0gdXRpbDtcbiAgICBWdWUuY29uZmlnID0gY29uZmlnO1xuICAgIFZ1ZS5zZXQgPSBzZXQ7XG4gICAgVnVlWydkZWxldGUnXSA9IGRlbDtcbiAgICBWdWUubmV4dFRpY2sgPSBuZXh0VGljaztcblxuICAgIC8qKlxuICAgICAqIFRoZSBmb2xsb3dpbmcgYXJlIGV4cG9zZWQgZm9yIGFkdmFuY2VkIHVzYWdlIC8gcGx1Z2luc1xuICAgICAqL1xuXG4gICAgVnVlLmNvbXBpbGVyID0gY29tcGlsZXI7XG4gICAgVnVlLkZyYWdtZW50RmFjdG9yeSA9IEZyYWdtZW50RmFjdG9yeTtcbiAgICBWdWUuaW50ZXJuYWxEaXJlY3RpdmVzID0gaW50ZXJuYWxEaXJlY3RpdmVzO1xuICAgIFZ1ZS5wYXJzZXJzID0ge1xuICAgICAgcGF0aDogcGF0aCxcbiAgICAgIHRleHQ6IHRleHQsXG4gICAgICB0ZW1wbGF0ZTogdGVtcGxhdGUsXG4gICAgICBkaXJlY3RpdmU6IGRpcmVjdGl2ZSxcbiAgICAgIGV4cHJlc3Npb246IGV4cHJlc3Npb25cbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogRWFjaCBpbnN0YW5jZSBjb25zdHJ1Y3RvciwgaW5jbHVkaW5nIFZ1ZSwgaGFzIGEgdW5pcXVlXG4gICAgICogY2lkLiBUaGlzIGVuYWJsZXMgdXMgdG8gY3JlYXRlIHdyYXBwZWQgXCJjaGlsZFxuICAgICAqIGNvbnN0cnVjdG9yc1wiIGZvciBwcm90b3R5cGFsIGluaGVyaXRhbmNlIGFuZCBjYWNoZSB0aGVtLlxuICAgICAqL1xuXG4gICAgVnVlLmNpZCA9IDA7XG4gICAgdmFyIGNpZCA9IDE7XG5cbiAgICAvKipcbiAgICAgKiBDbGFzcyBpbmhlcml0YW5jZVxuICAgICAqXG4gICAgICogQHBhcmFtIHtPYmplY3R9IGV4dGVuZE9wdGlvbnNcbiAgICAgKi9cblxuICAgIFZ1ZS5leHRlbmQgPSBmdW5jdGlvbiAoZXh0ZW5kT3B0aW9ucykge1xuICAgICAgZXh0ZW5kT3B0aW9ucyA9IGV4dGVuZE9wdGlvbnMgfHwge307XG4gICAgICB2YXIgU3VwZXIgPSB0aGlzO1xuICAgICAgdmFyIGlzRmlyc3RFeHRlbmQgPSBTdXBlci5jaWQgPT09IDA7XG4gICAgICBpZiAoaXNGaXJzdEV4dGVuZCAmJiBleHRlbmRPcHRpb25zLl9DdG9yKSB7XG4gICAgICAgIHJldHVybiBleHRlbmRPcHRpb25zLl9DdG9yO1xuICAgICAgfVxuICAgICAgdmFyIG5hbWUgPSBleHRlbmRPcHRpb25zLm5hbWUgfHwgU3VwZXIub3B0aW9ucy5uYW1lO1xuICAgICAgaWYgKCdkZXZlbG9wbWVudCcgIT09ICdwcm9kdWN0aW9uJykge1xuICAgICAgICBpZiAoIS9eW2EtekEtWl1bXFx3LV0qJC8udGVzdChuYW1lKSkge1xuICAgICAgICAgIHdhcm4oJ0ludmFsaWQgY29tcG9uZW50IG5hbWU6IFwiJyArIG5hbWUgKyAnXCIuIENvbXBvbmVudCBuYW1lcyAnICsgJ2NhbiBvbmx5IGNvbnRhaW4gYWxwaGFudW1lcmljIGNoYXJhY2F0ZXJzIGFuZCB0aGUgaHlwaGVuLicpO1xuICAgICAgICAgIG5hbWUgPSBudWxsO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICB2YXIgU3ViID0gY3JlYXRlQ2xhc3MobmFtZSB8fCAnVnVlQ29tcG9uZW50Jyk7XG4gICAgICBTdWIucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShTdXBlci5wcm90b3R5cGUpO1xuICAgICAgU3ViLnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IFN1YjtcbiAgICAgIFN1Yi5jaWQgPSBjaWQrKztcbiAgICAgIFN1Yi5vcHRpb25zID0gbWVyZ2VPcHRpb25zKFN1cGVyLm9wdGlvbnMsIGV4dGVuZE9wdGlvbnMpO1xuICAgICAgU3ViWydzdXBlciddID0gU3VwZXI7XG4gICAgICAvLyBhbGxvdyBmdXJ0aGVyIGV4dGVuc2lvblxuICAgICAgU3ViLmV4dGVuZCA9IFN1cGVyLmV4dGVuZDtcbiAgICAgIC8vIGNyZWF0ZSBhc3NldCByZWdpc3RlcnMsIHNvIGV4dGVuZGVkIGNsYXNzZXNcbiAgICAgIC8vIGNhbiBoYXZlIHRoZWlyIHByaXZhdGUgYXNzZXRzIHRvby5cbiAgICAgIGNvbmZpZy5fYXNzZXRUeXBlcy5mb3JFYWNoKGZ1bmN0aW9uICh0eXBlKSB7XG4gICAgICAgIFN1Ylt0eXBlXSA9IFN1cGVyW3R5cGVdO1xuICAgICAgfSk7XG4gICAgICAvLyBlbmFibGUgcmVjdXJzaXZlIHNlbGYtbG9va3VwXG4gICAgICBpZiAobmFtZSkge1xuICAgICAgICBTdWIub3B0aW9ucy5jb21wb25lbnRzW25hbWVdID0gU3ViO1xuICAgICAgfVxuICAgICAgLy8gY2FjaGUgY29uc3RydWN0b3JcbiAgICAgIGlmIChpc0ZpcnN0RXh0ZW5kKSB7XG4gICAgICAgIGV4dGVuZE9wdGlvbnMuX0N0b3IgPSBTdWI7XG4gICAgICB9XG4gICAgICByZXR1cm4gU3ViO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBBIGZ1bmN0aW9uIHRoYXQgcmV0dXJucyBhIHN1Yi1jbGFzcyBjb25zdHJ1Y3RvciB3aXRoIHRoZVxuICAgICAqIGdpdmVuIG5hbWUuIFRoaXMgZ2l2ZXMgdXMgbXVjaCBuaWNlciBvdXRwdXQgd2hlblxuICAgICAqIGxvZ2dpbmcgaW5zdGFuY2VzIGluIHRoZSBjb25zb2xlLlxuICAgICAqXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IG5hbWVcbiAgICAgKiBAcmV0dXJuIHtGdW5jdGlvbn1cbiAgICAgKi9cblxuICAgIGZ1bmN0aW9uIGNyZWF0ZUNsYXNzKG5hbWUpIHtcbiAgICAgIC8qIGVzbGludC1kaXNhYmxlIG5vLW5ldy1mdW5jICovXG4gICAgICByZXR1cm4gbmV3IEZ1bmN0aW9uKCdyZXR1cm4gZnVuY3Rpb24gJyArIGNsYXNzaWZ5KG5hbWUpICsgJyAob3B0aW9ucykgeyB0aGlzLl9pbml0KG9wdGlvbnMpIH0nKSgpO1xuICAgICAgLyogZXNsaW50LWVuYWJsZSBuby1uZXctZnVuYyAqL1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFBsdWdpbiBzeXN0ZW1cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBwbHVnaW5cbiAgICAgKi9cblxuICAgIFZ1ZS51c2UgPSBmdW5jdGlvbiAocGx1Z2luKSB7XG4gICAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgaWYgKi9cbiAgICAgIGlmIChwbHVnaW4uaW5zdGFsbGVkKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIC8vIGFkZGl0aW9uYWwgcGFyYW1ldGVyc1xuICAgICAgdmFyIGFyZ3MgPSB0b0FycmF5KGFyZ3VtZW50cywgMSk7XG4gICAgICBhcmdzLnVuc2hpZnQodGhpcyk7XG4gICAgICBpZiAodHlwZW9mIHBsdWdpbi5pbnN0YWxsID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIHBsdWdpbi5pbnN0YWxsLmFwcGx5KHBsdWdpbiwgYXJncyk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBwbHVnaW4uYXBwbHkobnVsbCwgYXJncyk7XG4gICAgICB9XG4gICAgICBwbHVnaW4uaW5zdGFsbGVkID0gdHJ1ZTtcbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBBcHBseSBhIGdsb2JhbCBtaXhpbiBieSBtZXJnaW5nIGl0IGludG8gdGhlIGRlZmF1bHRcbiAgICAgKiBvcHRpb25zLlxuICAgICAqL1xuXG4gICAgVnVlLm1peGluID0gZnVuY3Rpb24gKG1peGluKSB7XG4gICAgICBWdWUub3B0aW9ucyA9IG1lcmdlT3B0aW9ucyhWdWUub3B0aW9ucywgbWl4aW4pO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBDcmVhdGUgYXNzZXQgcmVnaXN0cmF0aW9uIG1ldGhvZHMgd2l0aCB0aGUgZm9sbG93aW5nXG4gICAgICogc2lnbmF0dXJlOlxuICAgICAqXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IGlkXG4gICAgICogQHBhcmFtIHsqfSBkZWZpbml0aW9uXG4gICAgICovXG5cbiAgICBjb25maWcuX2Fzc2V0VHlwZXMuZm9yRWFjaChmdW5jdGlvbiAodHlwZSkge1xuICAgICAgVnVlW3R5cGVdID0gZnVuY3Rpb24gKGlkLCBkZWZpbml0aW9uKSB7XG4gICAgICAgIGlmICghZGVmaW5pdGlvbikge1xuICAgICAgICAgIHJldHVybiB0aGlzLm9wdGlvbnNbdHlwZSArICdzJ11baWRdO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBpZiAqL1xuICAgICAgICAgIGlmICgnZGV2ZWxvcG1lbnQnICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICAgICAgICAgIGlmICh0eXBlID09PSAnY29tcG9uZW50JyAmJiAoY29tbW9uVGFnUkUudGVzdChpZCkgfHwgcmVzZXJ2ZWRUYWdSRS50ZXN0KGlkKSkpIHtcbiAgICAgICAgICAgICAgd2FybignRG8gbm90IHVzZSBidWlsdC1pbiBvciByZXNlcnZlZCBIVE1MIGVsZW1lbnRzIGFzIGNvbXBvbmVudCAnICsgJ2lkOiAnICsgaWQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAodHlwZSA9PT0gJ2NvbXBvbmVudCcgJiYgaXNQbGFpbk9iamVjdChkZWZpbml0aW9uKSkge1xuICAgICAgICAgICAgZGVmaW5pdGlvbi5uYW1lID0gaWQ7XG4gICAgICAgICAgICBkZWZpbml0aW9uID0gVnVlLmV4dGVuZChkZWZpbml0aW9uKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgdGhpcy5vcHRpb25zW3R5cGUgKyAncyddW2lkXSA9IGRlZmluaXRpb247XG4gICAgICAgICAgcmV0dXJuIGRlZmluaXRpb247XG4gICAgICAgIH1cbiAgICAgIH07XG4gICAgfSk7XG5cbiAgICAvLyBleHBvc2UgaW50ZXJuYWwgdHJhbnNpdGlvbiBBUElcbiAgICBleHRlbmQoVnVlLnRyYW5zaXRpb24sIHRyYW5zaXRpb24pO1xuICB9XG5cbiAgaW5zdGFsbEdsb2JhbEFQSShWdWUpO1xuXG4gIFZ1ZS52ZXJzaW9uID0gJzEuMC4yNCc7XG5cbiAgLy8gZGV2dG9vbHMgZ2xvYmFsIGhvb2tcbiAgLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cbiAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgaWYgKGNvbmZpZy5kZXZ0b29scykge1xuICAgICAgaWYgKGRldnRvb2xzKSB7XG4gICAgICAgIGRldnRvb2xzLmVtaXQoJ2luaXQnLCBWdWUpO1xuICAgICAgfSBlbHNlIGlmICgnZGV2ZWxvcG1lbnQnICE9PSAncHJvZHVjdGlvbicgJiYgaW5Ccm93c2VyICYmIC9DaHJvbWVcXC9cXGQrLy50ZXN0KHdpbmRvdy5uYXZpZ2F0b3IudXNlckFnZW50KSkge1xuICAgICAgICBjb25zb2xlLmxvZygnRG93bmxvYWQgdGhlIFZ1ZSBEZXZ0b29scyBmb3IgYSBiZXR0ZXIgZGV2ZWxvcG1lbnQgZXhwZXJpZW5jZTpcXG4nICsgJ2h0dHBzOi8vZ2l0aHViLmNvbS92dWVqcy92dWUtZGV2dG9vbHMnKTtcbiAgICAgIH1cbiAgICB9XG4gIH0sIDApO1xuXG4gIHJldHVybiBWdWU7XG5cbn0pKTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vZGVwL1Z1ZS5qc1xuICoqIG1vZHVsZSBpZCA9IDJcbiAqKiBtb2R1bGUgY2h1bmtzID0gMCAxIDIgMyA0XG4gKiovIiwiLyoqXHJcbiAqIENyZWF0ZWQgYnkgaHVtb3JIYW4gb24gMjAxNi83LzQuXHJcbiAqL1xyXG52YXIgdm0gPSBuZXcgVnVlKHtcclxuICAgIGVsOiAnI2RlbW8yJyxcclxuICAgIGRhdGE6IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgcmV0dXJuIHttc2c6ICdoZWxsbyB2dWUhJ31cclxuICAgIH0sXHJcbiAgICB0ZW1wbGF0ZTogJyN0cGwnXHJcbn0pO1xyXG5cclxudmFyIGV4YW1wbGUyID0gbmV3IFZ1ZSh7XHJcbiAgICBlbDogJyNleGFtcGxlLTInLFxyXG4gICAgZGF0YToge1xyXG4gICAgICAgIHBhcmVudE1lc3NhZ2U6ICdQYXJlbnQnLFxyXG4gICAgICAgIGl0ZW1zOiBbXHJcbiAgICAgICAgICAgIHsgbWVzc2FnZTogJ0ZvbycgfSxcclxuICAgICAgICAgICAgeyBtZXNzYWdlOiAnQmFyJyB9XHJcbiAgICAgICAgXVxyXG4gICAgfVxyXG59KTtcclxuXHJcbnZhciBudW0gPSBuZXcgVnVlKHtcclxuICAgIGVsOiAnLm51bScsXHJcbiAgICBtZXRob2RzOntcclxuICAgICAgICBzYXk6IGZ1bmN0aW9uIChtc2csIGV2ZW50KSB7XHJcbiAgICAgICAgICAgIC8vIO+/ve+/ve+/ve+/ve+/ve+/ve+/vce/77+977+91Lfvv73vv73vv73Ure+/ve+/ve+/vcK877+977+977+977+977+9XHJcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBkb1RoaXM6IGZ1bmN0aW9uKCl7fSxcclxuICAgICAgICBkb1RoYXQ6IGZ1bmN0aW9uKCl7fSxcclxuICAgICAgICBzdWJtaXQ6IGZ1bmN0aW9uKCl7fVxyXG4gICAgfVxyXG59KTtcclxuXHJcbnZhciBkb20xID0gbmV3IFZ1ZSh7XHJcbiAgICBlbDogJy5kb20xJyxcclxuICAgIGRhdGE6IHtcclxuICAgICAgICBtc2c6JzEyMycsXHJcbiAgICAgICAgYWdlOiAnMTIzJ1xyXG4gICAgfVxyXG59KTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vanMvZGVtbzIuanNcbiAqKiBtb2R1bGUgaWQgPSAzXG4gKiogbW9kdWxlIGNodW5rcyA9IDFcbiAqKi8iXSwic291cmNlUm9vdCI6IiJ9