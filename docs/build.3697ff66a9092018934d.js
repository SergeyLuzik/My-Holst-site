/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/ansi-html-community/index.js":
/*!***************************************************!*\
  !*** ./node_modules/ansi-html-community/index.js ***!
  \***************************************************/
/***/ ((module) => {

"use strict";


module.exports = ansiHTML

// Reference to https://github.com/sindresorhus/ansi-regex
var _regANSI = /(?:(?:\u001b\[)|\u009b)(?:(?:[0-9]{1,3})?(?:(?:;[0-9]{0,3})*)?[A-M|f-m])|\u001b[A-M]/

var _defColors = {
  reset: ['fff', '000'], // [FOREGROUD_COLOR, BACKGROUND_COLOR]
  black: '000',
  red: 'ff0000',
  green: '209805',
  yellow: 'e8bf03',
  blue: '0000ff',
  magenta: 'ff00ff',
  cyan: '00ffee',
  lightgrey: 'f0f0f0',
  darkgrey: '888'
}
var _styles = {
  30: 'black',
  31: 'red',
  32: 'green',
  33: 'yellow',
  34: 'blue',
  35: 'magenta',
  36: 'cyan',
  37: 'lightgrey'
}
var _openTags = {
  '1': 'font-weight:bold', // bold
  '2': 'opacity:0.5', // dim
  '3': '<i>', // italic
  '4': '<u>', // underscore
  '8': 'display:none', // hidden
  '9': '<del>' // delete
}
var _closeTags = {
  '23': '</i>', // reset italic
  '24': '</u>', // reset underscore
  '29': '</del>' // reset delete
}

;[0, 21, 22, 27, 28, 39, 49].forEach(function (n) {
  _closeTags[n] = '</span>'
})

/**
 * Converts text with ANSI color codes to HTML markup.
 * @param {String} text
 * @returns {*}
 */
function ansiHTML (text) {
  // Returns the text if the string has no ANSI escape code.
  if (!_regANSI.test(text)) {
    return text
  }

  // Cache opened sequence.
  var ansiCodes = []
  // Replace with markup.
  var ret = text.replace(/\033\[(\d+)m/g, function (match, seq) {
    var ot = _openTags[seq]
    if (ot) {
      // If current sequence has been opened, close it.
      if (!!~ansiCodes.indexOf(seq)) { // eslint-disable-line no-extra-boolean-cast
        ansiCodes.pop()
        return '</span>'
      }
      // Open tag.
      ansiCodes.push(seq)
      return ot[0] === '<' ? ot : '<span style="' + ot + ';">'
    }

    var ct = _closeTags[seq]
    if (ct) {
      // Pop sequence
      ansiCodes.pop()
      return ct
    }
    return ''
  })

  // Make sure tags are closed.
  var l = ansiCodes.length
  ;(l > 0) && (ret += Array(l + 1).join('</span>'))

  return ret
}

/**
 * Customize colors.
 * @param {Object} colors reference to _defColors
 */
ansiHTML.setColors = function (colors) {
  if (typeof colors !== 'object') {
    throw new Error('`colors` parameter must be an Object.')
  }

  var _finalColors = {}
  for (var key in _defColors) {
    var hex = colors.hasOwnProperty(key) ? colors[key] : null
    if (!hex) {
      _finalColors[key] = _defColors[key]
      continue
    }
    if ('reset' === key) {
      if (typeof hex === 'string') {
        hex = [hex]
      }
      if (!Array.isArray(hex) || hex.length === 0 || hex.some(function (h) {
        return typeof h !== 'string'
      })) {
        throw new Error('The value of `' + key + '` property must be an Array and each item could only be a hex string, e.g.: FF0000')
      }
      var defHexColor = _defColors[key]
      if (!hex[0]) {
        hex[0] = defHexColor[0]
      }
      if (hex.length === 1 || !hex[1]) {
        hex = [hex[0]]
        hex.push(defHexColor[1])
      }

      hex = hex.slice(0, 2)
    } else if (typeof hex !== 'string') {
      throw new Error('The value of `' + key + '` property must be a hex string, e.g.: FF0000')
    }
    _finalColors[key] = hex
  }
  _setTags(_finalColors)
}

/**
 * Reset colors.
 */
ansiHTML.reset = function () {
  _setTags(_defColors)
}

/**
 * Expose tags, including open and close.
 * @type {Object}
 */
ansiHTML.tags = {}

if (Object.defineProperty) {
  Object.defineProperty(ansiHTML.tags, 'open', {
    get: function () { return _openTags }
  })
  Object.defineProperty(ansiHTML.tags, 'close', {
    get: function () { return _closeTags }
  })
} else {
  ansiHTML.tags.open = _openTags
  ansiHTML.tags.close = _closeTags
}

function _setTags (colors) {
  // reset all
  _openTags['0'] = 'font-weight:normal;opacity:1;color:#' + colors.reset[0] + ';background:#' + colors.reset[1]
  // inverse
  _openTags['7'] = 'color:#' + colors.reset[1] + ';background:#' + colors.reset[0]
  // dark grey
  _openTags['90'] = 'color:#' + colors.darkgrey

  for (var code in _styles) {
    var color = _styles[code]
    var oriColor = colors[color] || '000'
    _openTags[code] = 'color:#' + oriColor
    code = parseInt(code)
    _openTags[(code + 10).toString()] = 'background:#' + oriColor
  }
}

ansiHTML.reset()


/***/ }),

/***/ "./node_modules/events/events.js":
/*!***************************************!*\
  !*** ./node_modules/events/events.js ***!
  \***************************************/
/***/ ((module) => {

"use strict";
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.



var R = typeof Reflect === 'object' ? Reflect : null
var ReflectApply = R && typeof R.apply === 'function'
  ? R.apply
  : function ReflectApply(target, receiver, args) {
    return Function.prototype.apply.call(target, receiver, args);
  }

var ReflectOwnKeys
if (R && typeof R.ownKeys === 'function') {
  ReflectOwnKeys = R.ownKeys
} else if (Object.getOwnPropertySymbols) {
  ReflectOwnKeys = function ReflectOwnKeys(target) {
    return Object.getOwnPropertyNames(target)
      .concat(Object.getOwnPropertySymbols(target));
  };
} else {
  ReflectOwnKeys = function ReflectOwnKeys(target) {
    return Object.getOwnPropertyNames(target);
  };
}

function ProcessEmitWarning(warning) {
  if (console && console.warn) console.warn(warning);
}

var NumberIsNaN = Number.isNaN || function NumberIsNaN(value) {
  return value !== value;
}

function EventEmitter() {
  EventEmitter.init.call(this);
}
module.exports = EventEmitter;
module.exports.once = once;

// Backwards-compat with node 0.10.x
EventEmitter.EventEmitter = EventEmitter;

EventEmitter.prototype._events = undefined;
EventEmitter.prototype._eventsCount = 0;
EventEmitter.prototype._maxListeners = undefined;

// By default EventEmitters will print a warning if more than 10 listeners are
// added to it. This is a useful default which helps finding memory leaks.
var defaultMaxListeners = 10;

function checkListener(listener) {
  if (typeof listener !== 'function') {
    throw new TypeError('The "listener" argument must be of type Function. Received type ' + typeof listener);
  }
}

Object.defineProperty(EventEmitter, 'defaultMaxListeners', {
  enumerable: true,
  get: function() {
    return defaultMaxListeners;
  },
  set: function(arg) {
    if (typeof arg !== 'number' || arg < 0 || NumberIsNaN(arg)) {
      throw new RangeError('The value of "defaultMaxListeners" is out of range. It must be a non-negative number. Received ' + arg + '.');
    }
    defaultMaxListeners = arg;
  }
});

EventEmitter.init = function() {

  if (this._events === undefined ||
      this._events === Object.getPrototypeOf(this)._events) {
    this._events = Object.create(null);
    this._eventsCount = 0;
  }

  this._maxListeners = this._maxListeners || undefined;
};

// Obviously not all Emitters should be limited to 10. This function allows
// that to be increased. Set to zero for unlimited.
EventEmitter.prototype.setMaxListeners = function setMaxListeners(n) {
  if (typeof n !== 'number' || n < 0 || NumberIsNaN(n)) {
    throw new RangeError('The value of "n" is out of range. It must be a non-negative number. Received ' + n + '.');
  }
  this._maxListeners = n;
  return this;
};

function _getMaxListeners(that) {
  if (that._maxListeners === undefined)
    return EventEmitter.defaultMaxListeners;
  return that._maxListeners;
}

EventEmitter.prototype.getMaxListeners = function getMaxListeners() {
  return _getMaxListeners(this);
};

EventEmitter.prototype.emit = function emit(type) {
  var args = [];
  for (var i = 1; i < arguments.length; i++) args.push(arguments[i]);
  var doError = (type === 'error');

  var events = this._events;
  if (events !== undefined)
    doError = (doError && events.error === undefined);
  else if (!doError)
    return false;

  // If there is no 'error' event listener then throw.
  if (doError) {
    var er;
    if (args.length > 0)
      er = args[0];
    if (er instanceof Error) {
      // Note: The comments on the `throw` lines are intentional, they show
      // up in Node's output if this results in an unhandled exception.
      throw er; // Unhandled 'error' event
    }
    // At least give some kind of context to the user
    var err = new Error('Unhandled error.' + (er ? ' (' + er.message + ')' : ''));
    err.context = er;
    throw err; // Unhandled 'error' event
  }

  var handler = events[type];

  if (handler === undefined)
    return false;

  if (typeof handler === 'function') {
    ReflectApply(handler, this, args);
  } else {
    var len = handler.length;
    var listeners = arrayClone(handler, len);
    for (var i = 0; i < len; ++i)
      ReflectApply(listeners[i], this, args);
  }

  return true;
};

function _addListener(target, type, listener, prepend) {
  var m;
  var events;
  var existing;

  checkListener(listener);

  events = target._events;
  if (events === undefined) {
    events = target._events = Object.create(null);
    target._eventsCount = 0;
  } else {
    // To avoid recursion in the case that type === "newListener"! Before
    // adding it to the listeners, first emit "newListener".
    if (events.newListener !== undefined) {
      target.emit('newListener', type,
                  listener.listener ? listener.listener : listener);

      // Re-assign `events` because a newListener handler could have caused the
      // this._events to be assigned to a new object
      events = target._events;
    }
    existing = events[type];
  }

  if (existing === undefined) {
    // Optimize the case of one listener. Don't need the extra array object.
    existing = events[type] = listener;
    ++target._eventsCount;
  } else {
    if (typeof existing === 'function') {
      // Adding the second element, need to change to array.
      existing = events[type] =
        prepend ? [listener, existing] : [existing, listener];
      // If we've already got an array, just append.
    } else if (prepend) {
      existing.unshift(listener);
    } else {
      existing.push(listener);
    }

    // Check for listener leak
    m = _getMaxListeners(target);
    if (m > 0 && existing.length > m && !existing.warned) {
      existing.warned = true;
      // No error code for this since it is a Warning
      // eslint-disable-next-line no-restricted-syntax
      var w = new Error('Possible EventEmitter memory leak detected. ' +
                          existing.length + ' ' + String(type) + ' listeners ' +
                          'added. Use emitter.setMaxListeners() to ' +
                          'increase limit');
      w.name = 'MaxListenersExceededWarning';
      w.emitter = target;
      w.type = type;
      w.count = existing.length;
      ProcessEmitWarning(w);
    }
  }

  return target;
}

EventEmitter.prototype.addListener = function addListener(type, listener) {
  return _addListener(this, type, listener, false);
};

EventEmitter.prototype.on = EventEmitter.prototype.addListener;

EventEmitter.prototype.prependListener =
    function prependListener(type, listener) {
      return _addListener(this, type, listener, true);
    };

function onceWrapper() {
  if (!this.fired) {
    this.target.removeListener(this.type, this.wrapFn);
    this.fired = true;
    if (arguments.length === 0)
      return this.listener.call(this.target);
    return this.listener.apply(this.target, arguments);
  }
}

function _onceWrap(target, type, listener) {
  var state = { fired: false, wrapFn: undefined, target: target, type: type, listener: listener };
  var wrapped = onceWrapper.bind(state);
  wrapped.listener = listener;
  state.wrapFn = wrapped;
  return wrapped;
}

EventEmitter.prototype.once = function once(type, listener) {
  checkListener(listener);
  this.on(type, _onceWrap(this, type, listener));
  return this;
};

EventEmitter.prototype.prependOnceListener =
    function prependOnceListener(type, listener) {
      checkListener(listener);
      this.prependListener(type, _onceWrap(this, type, listener));
      return this;
    };

// Emits a 'removeListener' event if and only if the listener was removed.
EventEmitter.prototype.removeListener =
    function removeListener(type, listener) {
      var list, events, position, i, originalListener;

      checkListener(listener);

      events = this._events;
      if (events === undefined)
        return this;

      list = events[type];
      if (list === undefined)
        return this;

      if (list === listener || list.listener === listener) {
        if (--this._eventsCount === 0)
          this._events = Object.create(null);
        else {
          delete events[type];
          if (events.removeListener)
            this.emit('removeListener', type, list.listener || listener);
        }
      } else if (typeof list !== 'function') {
        position = -1;

        for (i = list.length - 1; i >= 0; i--) {
          if (list[i] === listener || list[i].listener === listener) {
            originalListener = list[i].listener;
            position = i;
            break;
          }
        }

        if (position < 0)
          return this;

        if (position === 0)
          list.shift();
        else {
          spliceOne(list, position);
        }

        if (list.length === 1)
          events[type] = list[0];

        if (events.removeListener !== undefined)
          this.emit('removeListener', type, originalListener || listener);
      }

      return this;
    };

EventEmitter.prototype.off = EventEmitter.prototype.removeListener;

EventEmitter.prototype.removeAllListeners =
    function removeAllListeners(type) {
      var listeners, events, i;

      events = this._events;
      if (events === undefined)
        return this;

      // not listening for removeListener, no need to emit
      if (events.removeListener === undefined) {
        if (arguments.length === 0) {
          this._events = Object.create(null);
          this._eventsCount = 0;
        } else if (events[type] !== undefined) {
          if (--this._eventsCount === 0)
            this._events = Object.create(null);
          else
            delete events[type];
        }
        return this;
      }

      // emit removeListener for all listeners on all events
      if (arguments.length === 0) {
        var keys = Object.keys(events);
        var key;
        for (i = 0; i < keys.length; ++i) {
          key = keys[i];
          if (key === 'removeListener') continue;
          this.removeAllListeners(key);
        }
        this.removeAllListeners('removeListener');
        this._events = Object.create(null);
        this._eventsCount = 0;
        return this;
      }

      listeners = events[type];

      if (typeof listeners === 'function') {
        this.removeListener(type, listeners);
      } else if (listeners !== undefined) {
        // LIFO order
        for (i = listeners.length - 1; i >= 0; i--) {
          this.removeListener(type, listeners[i]);
        }
      }

      return this;
    };

function _listeners(target, type, unwrap) {
  var events = target._events;

  if (events === undefined)
    return [];

  var evlistener = events[type];
  if (evlistener === undefined)
    return [];

  if (typeof evlistener === 'function')
    return unwrap ? [evlistener.listener || evlistener] : [evlistener];

  return unwrap ?
    unwrapListeners(evlistener) : arrayClone(evlistener, evlistener.length);
}

EventEmitter.prototype.listeners = function listeners(type) {
  return _listeners(this, type, true);
};

EventEmitter.prototype.rawListeners = function rawListeners(type) {
  return _listeners(this, type, false);
};

EventEmitter.listenerCount = function(emitter, type) {
  if (typeof emitter.listenerCount === 'function') {
    return emitter.listenerCount(type);
  } else {
    return listenerCount.call(emitter, type);
  }
};

EventEmitter.prototype.listenerCount = listenerCount;
function listenerCount(type) {
  var events = this._events;

  if (events !== undefined) {
    var evlistener = events[type];

    if (typeof evlistener === 'function') {
      return 1;
    } else if (evlistener !== undefined) {
      return evlistener.length;
    }
  }

  return 0;
}

EventEmitter.prototype.eventNames = function eventNames() {
  return this._eventsCount > 0 ? ReflectOwnKeys(this._events) : [];
};

function arrayClone(arr, n) {
  var copy = new Array(n);
  for (var i = 0; i < n; ++i)
    copy[i] = arr[i];
  return copy;
}

function spliceOne(list, index) {
  for (; index + 1 < list.length; index++)
    list[index] = list[index + 1];
  list.pop();
}

function unwrapListeners(arr) {
  var ret = new Array(arr.length);
  for (var i = 0; i < ret.length; ++i) {
    ret[i] = arr[i].listener || arr[i];
  }
  return ret;
}

function once(emitter, name) {
  return new Promise(function (resolve, reject) {
    function errorListener(err) {
      emitter.removeListener(name, resolver);
      reject(err);
    }

    function resolver() {
      if (typeof emitter.removeListener === 'function') {
        emitter.removeListener('error', errorListener);
      }
      resolve([].slice.call(arguments));
    };

    eventTargetAgnosticAddListener(emitter, name, resolver, { once: true });
    if (name !== 'error') {
      addErrorHandlerIfEventEmitter(emitter, errorListener, { once: true });
    }
  });
}

function addErrorHandlerIfEventEmitter(emitter, handler, flags) {
  if (typeof emitter.on === 'function') {
    eventTargetAgnosticAddListener(emitter, 'error', handler, flags);
  }
}

function eventTargetAgnosticAddListener(emitter, name, listener, flags) {
  if (typeof emitter.on === 'function') {
    if (flags.once) {
      emitter.once(name, listener);
    } else {
      emitter.on(name, listener);
    }
  } else if (typeof emitter.addEventListener === 'function') {
    // EventTarget does not have `error` event semantics like Node
    // EventEmitters, we do not listen for `error` events here.
    emitter.addEventListener(name, function wrapListener(arg) {
      // IE does not have builtin `{ once: true }` support so we
      // have to do it manually.
      if (flags.once) {
        emitter.removeEventListener(name, wrapListener);
      }
      listener(arg);
    });
  } else {
    throw new TypeError('The "emitter" argument must be of type EventEmitter. Received type ' + typeof emitter);
  }
}


/***/ }),

/***/ "./node_modules/html-entities/lib/index.js":
/*!*************************************************!*\
  !*** ./node_modules/html-entities/lib/index.js ***!
  \*************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";
var __assign=this&&this.__assign||function(){__assign=Object.assign||function(t){for(var s,i=1,n=arguments.length;i<n;i++){s=arguments[i];for(var p in s)if(Object.prototype.hasOwnProperty.call(s,p))t[p]=s[p]}return t};return __assign.apply(this,arguments)};Object.defineProperty(exports, "__esModule", ({value:true}));var named_references_1=__webpack_require__(/*! ./named-references */ "./node_modules/html-entities/lib/named-references.js");var numeric_unicode_map_1=__webpack_require__(/*! ./numeric-unicode-map */ "./node_modules/html-entities/lib/numeric-unicode-map.js");var surrogate_pairs_1=__webpack_require__(/*! ./surrogate-pairs */ "./node_modules/html-entities/lib/surrogate-pairs.js");var allNamedReferences=__assign(__assign({},named_references_1.namedReferences),{all:named_references_1.namedReferences.html5});function replaceUsingRegExp(macroText,macroRegExp,macroReplacer){macroRegExp.lastIndex=0;var replaceMatch=macroRegExp.exec(macroText);var replaceResult;if(replaceMatch){replaceResult="";var replaceLastIndex=0;do{if(replaceLastIndex!==replaceMatch.index){replaceResult+=macroText.substring(replaceLastIndex,replaceMatch.index)}var replaceInput=replaceMatch[0];replaceResult+=macroReplacer(replaceInput);replaceLastIndex=replaceMatch.index+replaceInput.length}while(replaceMatch=macroRegExp.exec(macroText));if(replaceLastIndex!==macroText.length){replaceResult+=macroText.substring(replaceLastIndex)}}else{replaceResult=macroText}return replaceResult}var encodeRegExps={specialChars:/[<>'"&]/g,nonAscii:/[<>'"&\u0080-\uD7FF\uE000-\uFFFF]|[\uD800-\uDBFF][\uDC00-\uDFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF]/g,nonAsciiPrintable:/[<>'"&\x01-\x08\x11-\x15\x17-\x1F\x7f-\uD7FF\uE000-\uFFFF]|[\uD800-\uDBFF][\uDC00-\uDFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF]/g,nonAsciiPrintableOnly:/[\x01-\x08\x11-\x15\x17-\x1F\x7f-\uD7FF\uE000-\uFFFF]|[\uD800-\uDBFF][\uDC00-\uDFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF]/g,extensive:/[\x01-\x0c\x0e-\x1f\x21-\x2c\x2e-\x2f\x3a-\x40\x5b-\x60\x7b-\x7d\x7f-\uD7FF\uE000-\uFFFF]|[\uD800-\uDBFF][\uDC00-\uDFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF]/g};var defaultEncodeOptions={mode:"specialChars",level:"all",numeric:"decimal"};function encode(text,_a){var _b=_a===void 0?defaultEncodeOptions:_a,_c=_b.mode,mode=_c===void 0?"specialChars":_c,_d=_b.numeric,numeric=_d===void 0?"decimal":_d,_e=_b.level,level=_e===void 0?"all":_e;if(!text){return""}var encodeRegExp=encodeRegExps[mode];var references=allNamedReferences[level].characters;var isHex=numeric==="hexadecimal";return replaceUsingRegExp(text,encodeRegExp,(function(input){var result=references[input];if(!result){var code=input.length>1?surrogate_pairs_1.getCodePoint(input,0):input.charCodeAt(0);result=(isHex?"&#x"+code.toString(16):"&#"+code)+";"}return result}))}exports.encode=encode;var defaultDecodeOptions={scope:"body",level:"all"};var strict=/&(?:#\d+|#[xX][\da-fA-F]+|[0-9a-zA-Z]+);/g;var attribute=/&(?:#\d+|#[xX][\da-fA-F]+|[0-9a-zA-Z]+)[;=]?/g;var baseDecodeRegExps={xml:{strict:strict,attribute:attribute,body:named_references_1.bodyRegExps.xml},html4:{strict:strict,attribute:attribute,body:named_references_1.bodyRegExps.html4},html5:{strict:strict,attribute:attribute,body:named_references_1.bodyRegExps.html5}};var decodeRegExps=__assign(__assign({},baseDecodeRegExps),{all:baseDecodeRegExps.html5});var fromCharCode=String.fromCharCode;var outOfBoundsChar=fromCharCode(65533);var defaultDecodeEntityOptions={level:"all"};function getDecodedEntity(entity,references,isAttribute,isStrict){var decodeResult=entity;var decodeEntityLastChar=entity[entity.length-1];if(isAttribute&&decodeEntityLastChar==="="){decodeResult=entity}else if(isStrict&&decodeEntityLastChar!==";"){decodeResult=entity}else{var decodeResultByReference=references[entity];if(decodeResultByReference){decodeResult=decodeResultByReference}else if(entity[0]==="&"&&entity[1]==="#"){var decodeSecondChar=entity[2];var decodeCode=decodeSecondChar=="x"||decodeSecondChar=="X"?parseInt(entity.substr(3),16):parseInt(entity.substr(2));decodeResult=decodeCode>=1114111?outOfBoundsChar:decodeCode>65535?surrogate_pairs_1.fromCodePoint(decodeCode):fromCharCode(numeric_unicode_map_1.numericUnicodeMap[decodeCode]||decodeCode)}}return decodeResult}function decodeEntity(entity,_a){var _b=(_a===void 0?defaultDecodeEntityOptions:_a).level,level=_b===void 0?"all":_b;if(!entity){return""}return getDecodedEntity(entity,allNamedReferences[level].entities,false,false)}exports.decodeEntity=decodeEntity;function decode(text,_a){var _b=_a===void 0?defaultDecodeOptions:_a,_c=_b.level,level=_c===void 0?"all":_c,_d=_b.scope,scope=_d===void 0?level==="xml"?"strict":"body":_d;if(!text){return""}var decodeRegExp=decodeRegExps[level][scope];var references=allNamedReferences[level].entities;var isAttribute=scope==="attribute";var isStrict=scope==="strict";return replaceUsingRegExp(text,decodeRegExp,(function(entity){return getDecodedEntity(entity,references,isAttribute,isStrict)}))}exports.decode=decode;
//# sourceMappingURL=./index.js.map

/***/ }),

/***/ "./node_modules/html-entities/lib/named-references.js":
/*!************************************************************!*\
  !*** ./node_modules/html-entities/lib/named-references.js ***!
  \************************************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";
Object.defineProperty(exports, "__esModule", ({value:true}));exports.bodyRegExps={xml:/&(?:#\d+|#[xX][\da-fA-F]+|[0-9a-zA-Z]+);?/g,html4:/&notin;|&(?:nbsp|iexcl|cent|pound|curren|yen|brvbar|sect|uml|copy|ordf|laquo|not|shy|reg|macr|deg|plusmn|sup2|sup3|acute|micro|para|middot|cedil|sup1|ordm|raquo|frac14|frac12|frac34|iquest|Agrave|Aacute|Acirc|Atilde|Auml|Aring|AElig|Ccedil|Egrave|Eacute|Ecirc|Euml|Igrave|Iacute|Icirc|Iuml|ETH|Ntilde|Ograve|Oacute|Ocirc|Otilde|Ouml|times|Oslash|Ugrave|Uacute|Ucirc|Uuml|Yacute|THORN|szlig|agrave|aacute|acirc|atilde|auml|aring|aelig|ccedil|egrave|eacute|ecirc|euml|igrave|iacute|icirc|iuml|eth|ntilde|ograve|oacute|ocirc|otilde|ouml|divide|oslash|ugrave|uacute|ucirc|uuml|yacute|thorn|yuml|quot|amp|lt|gt|#\d+|#[xX][\da-fA-F]+|[0-9a-zA-Z]+);?/g,html5:/&centerdot;|&copysr;|&divideontimes;|&gtcc;|&gtcir;|&gtdot;|&gtlPar;|&gtquest;|&gtrapprox;|&gtrarr;|&gtrdot;|&gtreqless;|&gtreqqless;|&gtrless;|&gtrsim;|&ltcc;|&ltcir;|&ltdot;|&lthree;|&ltimes;|&ltlarr;|&ltquest;|&ltrPar;|&ltri;|&ltrie;|&ltrif;|&notin;|&notinE;|&notindot;|&notinva;|&notinvb;|&notinvc;|&notni;|&notniva;|&notnivb;|&notnivc;|&parallel;|&timesb;|&timesbar;|&timesd;|&(?:AElig|AMP|Aacute|Acirc|Agrave|Aring|Atilde|Auml|COPY|Ccedil|ETH|Eacute|Ecirc|Egrave|Euml|GT|Iacute|Icirc|Igrave|Iuml|LT|Ntilde|Oacute|Ocirc|Ograve|Oslash|Otilde|Ouml|QUOT|REG|THORN|Uacute|Ucirc|Ugrave|Uuml|Yacute|aacute|acirc|acute|aelig|agrave|amp|aring|atilde|auml|brvbar|ccedil|cedil|cent|copy|curren|deg|divide|eacute|ecirc|egrave|eth|euml|frac12|frac14|frac34|gt|iacute|icirc|iexcl|igrave|iquest|iuml|laquo|lt|macr|micro|middot|nbsp|not|ntilde|oacute|ocirc|ograve|ordf|ordm|oslash|otilde|ouml|para|plusmn|pound|quot|raquo|reg|sect|shy|sup1|sup2|sup3|szlig|thorn|times|uacute|ucirc|ugrave|uml|uuml|yacute|yen|yuml|#\d+|#[xX][\da-fA-F]+|[0-9a-zA-Z]+);?/g};exports.namedReferences={xml:{entities:{"&lt;":"<","&gt;":">","&quot;":'"',"&apos;":"'","&amp;":"&"},characters:{"<":"&lt;",">":"&gt;",'"':"&quot;","'":"&apos;","&":"&amp;"}},html4:{entities:{"&apos;":"'","&nbsp":" ","&nbsp;":" ","&iexcl":"¡","&iexcl;":"¡","&cent":"¢","&cent;":"¢","&pound":"£","&pound;":"£","&curren":"¤","&curren;":"¤","&yen":"¥","&yen;":"¥","&brvbar":"¦","&brvbar;":"¦","&sect":"§","&sect;":"§","&uml":"¨","&uml;":"¨","&copy":"©","&copy;":"©","&ordf":"ª","&ordf;":"ª","&laquo":"«","&laquo;":"«","&not":"¬","&not;":"¬","&shy":"­","&shy;":"­","&reg":"®","&reg;":"®","&macr":"¯","&macr;":"¯","&deg":"°","&deg;":"°","&plusmn":"±","&plusmn;":"±","&sup2":"²","&sup2;":"²","&sup3":"³","&sup3;":"³","&acute":"´","&acute;":"´","&micro":"µ","&micro;":"µ","&para":"¶","&para;":"¶","&middot":"·","&middot;":"·","&cedil":"¸","&cedil;":"¸","&sup1":"¹","&sup1;":"¹","&ordm":"º","&ordm;":"º","&raquo":"»","&raquo;":"»","&frac14":"¼","&frac14;":"¼","&frac12":"½","&frac12;":"½","&frac34":"¾","&frac34;":"¾","&iquest":"¿","&iquest;":"¿","&Agrave":"À","&Agrave;":"À","&Aacute":"Á","&Aacute;":"Á","&Acirc":"Â","&Acirc;":"Â","&Atilde":"Ã","&Atilde;":"Ã","&Auml":"Ä","&Auml;":"Ä","&Aring":"Å","&Aring;":"Å","&AElig":"Æ","&AElig;":"Æ","&Ccedil":"Ç","&Ccedil;":"Ç","&Egrave":"È","&Egrave;":"È","&Eacute":"É","&Eacute;":"É","&Ecirc":"Ê","&Ecirc;":"Ê","&Euml":"Ë","&Euml;":"Ë","&Igrave":"Ì","&Igrave;":"Ì","&Iacute":"Í","&Iacute;":"Í","&Icirc":"Î","&Icirc;":"Î","&Iuml":"Ï","&Iuml;":"Ï","&ETH":"Ð","&ETH;":"Ð","&Ntilde":"Ñ","&Ntilde;":"Ñ","&Ograve":"Ò","&Ograve;":"Ò","&Oacute":"Ó","&Oacute;":"Ó","&Ocirc":"Ô","&Ocirc;":"Ô","&Otilde":"Õ","&Otilde;":"Õ","&Ouml":"Ö","&Ouml;":"Ö","&times":"×","&times;":"×","&Oslash":"Ø","&Oslash;":"Ø","&Ugrave":"Ù","&Ugrave;":"Ù","&Uacute":"Ú","&Uacute;":"Ú","&Ucirc":"Û","&Ucirc;":"Û","&Uuml":"Ü","&Uuml;":"Ü","&Yacute":"Ý","&Yacute;":"Ý","&THORN":"Þ","&THORN;":"Þ","&szlig":"ß","&szlig;":"ß","&agrave":"à","&agrave;":"à","&aacute":"á","&aacute;":"á","&acirc":"â","&acirc;":"â","&atilde":"ã","&atilde;":"ã","&auml":"ä","&auml;":"ä","&aring":"å","&aring;":"å","&aelig":"æ","&aelig;":"æ","&ccedil":"ç","&ccedil;":"ç","&egrave":"è","&egrave;":"è","&eacute":"é","&eacute;":"é","&ecirc":"ê","&ecirc;":"ê","&euml":"ë","&euml;":"ë","&igrave":"ì","&igrave;":"ì","&iacute":"í","&iacute;":"í","&icirc":"î","&icirc;":"î","&iuml":"ï","&iuml;":"ï","&eth":"ð","&eth;":"ð","&ntilde":"ñ","&ntilde;":"ñ","&ograve":"ò","&ograve;":"ò","&oacute":"ó","&oacute;":"ó","&ocirc":"ô","&ocirc;":"ô","&otilde":"õ","&otilde;":"õ","&ouml":"ö","&ouml;":"ö","&divide":"÷","&divide;":"÷","&oslash":"ø","&oslash;":"ø","&ugrave":"ù","&ugrave;":"ù","&uacute":"ú","&uacute;":"ú","&ucirc":"û","&ucirc;":"û","&uuml":"ü","&uuml;":"ü","&yacute":"ý","&yacute;":"ý","&thorn":"þ","&thorn;":"þ","&yuml":"ÿ","&yuml;":"ÿ","&quot":'"',"&quot;":'"',"&amp":"&","&amp;":"&","&lt":"<","&lt;":"<","&gt":">","&gt;":">","&OElig;":"Œ","&oelig;":"œ","&Scaron;":"Š","&scaron;":"š","&Yuml;":"Ÿ","&circ;":"ˆ","&tilde;":"˜","&ensp;":" ","&emsp;":" ","&thinsp;":" ","&zwnj;":"‌","&zwj;":"‍","&lrm;":"‎","&rlm;":"‏","&ndash;":"–","&mdash;":"—","&lsquo;":"‘","&rsquo;":"’","&sbquo;":"‚","&ldquo;":"“","&rdquo;":"”","&bdquo;":"„","&dagger;":"†","&Dagger;":"‡","&permil;":"‰","&lsaquo;":"‹","&rsaquo;":"›","&euro;":"€","&fnof;":"ƒ","&Alpha;":"Α","&Beta;":"Β","&Gamma;":"Γ","&Delta;":"Δ","&Epsilon;":"Ε","&Zeta;":"Ζ","&Eta;":"Η","&Theta;":"Θ","&Iota;":"Ι","&Kappa;":"Κ","&Lambda;":"Λ","&Mu;":"Μ","&Nu;":"Ν","&Xi;":"Ξ","&Omicron;":"Ο","&Pi;":"Π","&Rho;":"Ρ","&Sigma;":"Σ","&Tau;":"Τ","&Upsilon;":"Υ","&Phi;":"Φ","&Chi;":"Χ","&Psi;":"Ψ","&Omega;":"Ω","&alpha;":"α","&beta;":"β","&gamma;":"γ","&delta;":"δ","&epsilon;":"ε","&zeta;":"ζ","&eta;":"η","&theta;":"θ","&iota;":"ι","&kappa;":"κ","&lambda;":"λ","&mu;":"μ","&nu;":"ν","&xi;":"ξ","&omicron;":"ο","&pi;":"π","&rho;":"ρ","&sigmaf;":"ς","&sigma;":"σ","&tau;":"τ","&upsilon;":"υ","&phi;":"φ","&chi;":"χ","&psi;":"ψ","&omega;":"ω","&thetasym;":"ϑ","&upsih;":"ϒ","&piv;":"ϖ","&bull;":"•","&hellip;":"…","&prime;":"′","&Prime;":"″","&oline;":"‾","&frasl;":"⁄","&weierp;":"℘","&image;":"ℑ","&real;":"ℜ","&trade;":"™","&alefsym;":"ℵ","&larr;":"←","&uarr;":"↑","&rarr;":"→","&darr;":"↓","&harr;":"↔","&crarr;":"↵","&lArr;":"⇐","&uArr;":"⇑","&rArr;":"⇒","&dArr;":"⇓","&hArr;":"⇔","&forall;":"∀","&part;":"∂","&exist;":"∃","&empty;":"∅","&nabla;":"∇","&isin;":"∈","&notin;":"∉","&ni;":"∋","&prod;":"∏","&sum;":"∑","&minus;":"−","&lowast;":"∗","&radic;":"√","&prop;":"∝","&infin;":"∞","&ang;":"∠","&and;":"∧","&or;":"∨","&cap;":"∩","&cup;":"∪","&int;":"∫","&there4;":"∴","&sim;":"∼","&cong;":"≅","&asymp;":"≈","&ne;":"≠","&equiv;":"≡","&le;":"≤","&ge;":"≥","&sub;":"⊂","&sup;":"⊃","&nsub;":"⊄","&sube;":"⊆","&supe;":"⊇","&oplus;":"⊕","&otimes;":"⊗","&perp;":"⊥","&sdot;":"⋅","&lceil;":"⌈","&rceil;":"⌉","&lfloor;":"⌊","&rfloor;":"⌋","&lang;":"〈","&rang;":"〉","&loz;":"◊","&spades;":"♠","&clubs;":"♣","&hearts;":"♥","&diams;":"♦"},characters:{"'":"&apos;"," ":"&nbsp;","¡":"&iexcl;","¢":"&cent;","£":"&pound;","¤":"&curren;","¥":"&yen;","¦":"&brvbar;","§":"&sect;","¨":"&uml;","©":"&copy;","ª":"&ordf;","«":"&laquo;","¬":"&not;","­":"&shy;","®":"&reg;","¯":"&macr;","°":"&deg;","±":"&plusmn;","²":"&sup2;","³":"&sup3;","´":"&acute;","µ":"&micro;","¶":"&para;","·":"&middot;","¸":"&cedil;","¹":"&sup1;","º":"&ordm;","»":"&raquo;","¼":"&frac14;","½":"&frac12;","¾":"&frac34;","¿":"&iquest;","À":"&Agrave;","Á":"&Aacute;","Â":"&Acirc;","Ã":"&Atilde;","Ä":"&Auml;","Å":"&Aring;","Æ":"&AElig;","Ç":"&Ccedil;","È":"&Egrave;","É":"&Eacute;","Ê":"&Ecirc;","Ë":"&Euml;","Ì":"&Igrave;","Í":"&Iacute;","Î":"&Icirc;","Ï":"&Iuml;","Ð":"&ETH;","Ñ":"&Ntilde;","Ò":"&Ograve;","Ó":"&Oacute;","Ô":"&Ocirc;","Õ":"&Otilde;","Ö":"&Ouml;","×":"&times;","Ø":"&Oslash;","Ù":"&Ugrave;","Ú":"&Uacute;","Û":"&Ucirc;","Ü":"&Uuml;","Ý":"&Yacute;","Þ":"&THORN;","ß":"&szlig;","à":"&agrave;","á":"&aacute;","â":"&acirc;","ã":"&atilde;","ä":"&auml;","å":"&aring;","æ":"&aelig;","ç":"&ccedil;","è":"&egrave;","é":"&eacute;","ê":"&ecirc;","ë":"&euml;","ì":"&igrave;","í":"&iacute;","î":"&icirc;","ï":"&iuml;","ð":"&eth;","ñ":"&ntilde;","ò":"&ograve;","ó":"&oacute;","ô":"&ocirc;","õ":"&otilde;","ö":"&ouml;","÷":"&divide;","ø":"&oslash;","ù":"&ugrave;","ú":"&uacute;","û":"&ucirc;","ü":"&uuml;","ý":"&yacute;","þ":"&thorn;","ÿ":"&yuml;",'"':"&quot;","&":"&amp;","<":"&lt;",">":"&gt;","Œ":"&OElig;","œ":"&oelig;","Š":"&Scaron;","š":"&scaron;","Ÿ":"&Yuml;","ˆ":"&circ;","˜":"&tilde;"," ":"&ensp;"," ":"&emsp;"," ":"&thinsp;","‌":"&zwnj;","‍":"&zwj;","‎":"&lrm;","‏":"&rlm;","–":"&ndash;","—":"&mdash;","‘":"&lsquo;","’":"&rsquo;","‚":"&sbquo;","“":"&ldquo;","”":"&rdquo;","„":"&bdquo;","†":"&dagger;","‡":"&Dagger;","‰":"&permil;","‹":"&lsaquo;","›":"&rsaquo;","€":"&euro;","ƒ":"&fnof;","Α":"&Alpha;","Β":"&Beta;","Γ":"&Gamma;","Δ":"&Delta;","Ε":"&Epsilon;","Ζ":"&Zeta;","Η":"&Eta;","Θ":"&Theta;","Ι":"&Iota;","Κ":"&Kappa;","Λ":"&Lambda;","Μ":"&Mu;","Ν":"&Nu;","Ξ":"&Xi;","Ο":"&Omicron;","Π":"&Pi;","Ρ":"&Rho;","Σ":"&Sigma;","Τ":"&Tau;","Υ":"&Upsilon;","Φ":"&Phi;","Χ":"&Chi;","Ψ":"&Psi;","Ω":"&Omega;","α":"&alpha;","β":"&beta;","γ":"&gamma;","δ":"&delta;","ε":"&epsilon;","ζ":"&zeta;","η":"&eta;","θ":"&theta;","ι":"&iota;","κ":"&kappa;","λ":"&lambda;","μ":"&mu;","ν":"&nu;","ξ":"&xi;","ο":"&omicron;","π":"&pi;","ρ":"&rho;","ς":"&sigmaf;","σ":"&sigma;","τ":"&tau;","υ":"&upsilon;","φ":"&phi;","χ":"&chi;","ψ":"&psi;","ω":"&omega;","ϑ":"&thetasym;","ϒ":"&upsih;","ϖ":"&piv;","•":"&bull;","…":"&hellip;","′":"&prime;","″":"&Prime;","‾":"&oline;","⁄":"&frasl;","℘":"&weierp;","ℑ":"&image;","ℜ":"&real;","™":"&trade;","ℵ":"&alefsym;","←":"&larr;","↑":"&uarr;","→":"&rarr;","↓":"&darr;","↔":"&harr;","↵":"&crarr;","⇐":"&lArr;","⇑":"&uArr;","⇒":"&rArr;","⇓":"&dArr;","⇔":"&hArr;","∀":"&forall;","∂":"&part;","∃":"&exist;","∅":"&empty;","∇":"&nabla;","∈":"&isin;","∉":"&notin;","∋":"&ni;","∏":"&prod;","∑":"&sum;","−":"&minus;","∗":"&lowast;","√":"&radic;","∝":"&prop;","∞":"&infin;","∠":"&ang;","∧":"&and;","∨":"&or;","∩":"&cap;","∪":"&cup;","∫":"&int;","∴":"&there4;","∼":"&sim;","≅":"&cong;","≈":"&asymp;","≠":"&ne;","≡":"&equiv;","≤":"&le;","≥":"&ge;","⊂":"&sub;","⊃":"&sup;","⊄":"&nsub;","⊆":"&sube;","⊇":"&supe;","⊕":"&oplus;","⊗":"&otimes;","⊥":"&perp;","⋅":"&sdot;","⌈":"&lceil;","⌉":"&rceil;","⌊":"&lfloor;","⌋":"&rfloor;","〈":"&lang;","〉":"&rang;","◊":"&loz;","♠":"&spades;","♣":"&clubs;","♥":"&hearts;","♦":"&diams;"}},html5:{entities:{"&AElig":"Æ","&AElig;":"Æ","&AMP":"&","&AMP;":"&","&Aacute":"Á","&Aacute;":"Á","&Abreve;":"Ă","&Acirc":"Â","&Acirc;":"Â","&Acy;":"А","&Afr;":"𝔄","&Agrave":"À","&Agrave;":"À","&Alpha;":"Α","&Amacr;":"Ā","&And;":"⩓","&Aogon;":"Ą","&Aopf;":"𝔸","&ApplyFunction;":"⁡","&Aring":"Å","&Aring;":"Å","&Ascr;":"𝒜","&Assign;":"≔","&Atilde":"Ã","&Atilde;":"Ã","&Auml":"Ä","&Auml;":"Ä","&Backslash;":"∖","&Barv;":"⫧","&Barwed;":"⌆","&Bcy;":"Б","&Because;":"∵","&Bernoullis;":"ℬ","&Beta;":"Β","&Bfr;":"𝔅","&Bopf;":"𝔹","&Breve;":"˘","&Bscr;":"ℬ","&Bumpeq;":"≎","&CHcy;":"Ч","&COPY":"©","&COPY;":"©","&Cacute;":"Ć","&Cap;":"⋒","&CapitalDifferentialD;":"ⅅ","&Cayleys;":"ℭ","&Ccaron;":"Č","&Ccedil":"Ç","&Ccedil;":"Ç","&Ccirc;":"Ĉ","&Cconint;":"∰","&Cdot;":"Ċ","&Cedilla;":"¸","&CenterDot;":"·","&Cfr;":"ℭ","&Chi;":"Χ","&CircleDot;":"⊙","&CircleMinus;":"⊖","&CirclePlus;":"⊕","&CircleTimes;":"⊗","&ClockwiseContourIntegral;":"∲","&CloseCurlyDoubleQuote;":"”","&CloseCurlyQuote;":"’","&Colon;":"∷","&Colone;":"⩴","&Congruent;":"≡","&Conint;":"∯","&ContourIntegral;":"∮","&Copf;":"ℂ","&Coproduct;":"∐","&CounterClockwiseContourIntegral;":"∳","&Cross;":"⨯","&Cscr;":"𝒞","&Cup;":"⋓","&CupCap;":"≍","&DD;":"ⅅ","&DDotrahd;":"⤑","&DJcy;":"Ђ","&DScy;":"Ѕ","&DZcy;":"Џ","&Dagger;":"‡","&Darr;":"↡","&Dashv;":"⫤","&Dcaron;":"Ď","&Dcy;":"Д","&Del;":"∇","&Delta;":"Δ","&Dfr;":"𝔇","&DiacriticalAcute;":"´","&DiacriticalDot;":"˙","&DiacriticalDoubleAcute;":"˝","&DiacriticalGrave;":"`","&DiacriticalTilde;":"˜","&Diamond;":"⋄","&DifferentialD;":"ⅆ","&Dopf;":"𝔻","&Dot;":"¨","&DotDot;":"⃜","&DotEqual;":"≐","&DoubleContourIntegral;":"∯","&DoubleDot;":"¨","&DoubleDownArrow;":"⇓","&DoubleLeftArrow;":"⇐","&DoubleLeftRightArrow;":"⇔","&DoubleLeftTee;":"⫤","&DoubleLongLeftArrow;":"⟸","&DoubleLongLeftRightArrow;":"⟺","&DoubleLongRightArrow;":"⟹","&DoubleRightArrow;":"⇒","&DoubleRightTee;":"⊨","&DoubleUpArrow;":"⇑","&DoubleUpDownArrow;":"⇕","&DoubleVerticalBar;":"∥","&DownArrow;":"↓","&DownArrowBar;":"⤓","&DownArrowUpArrow;":"⇵","&DownBreve;":"̑","&DownLeftRightVector;":"⥐","&DownLeftTeeVector;":"⥞","&DownLeftVector;":"↽","&DownLeftVectorBar;":"⥖","&DownRightTeeVector;":"⥟","&DownRightVector;":"⇁","&DownRightVectorBar;":"⥗","&DownTee;":"⊤","&DownTeeArrow;":"↧","&Downarrow;":"⇓","&Dscr;":"𝒟","&Dstrok;":"Đ","&ENG;":"Ŋ","&ETH":"Ð","&ETH;":"Ð","&Eacute":"É","&Eacute;":"É","&Ecaron;":"Ě","&Ecirc":"Ê","&Ecirc;":"Ê","&Ecy;":"Э","&Edot;":"Ė","&Efr;":"𝔈","&Egrave":"È","&Egrave;":"È","&Element;":"∈","&Emacr;":"Ē","&EmptySmallSquare;":"◻","&EmptyVerySmallSquare;":"▫","&Eogon;":"Ę","&Eopf;":"𝔼","&Epsilon;":"Ε","&Equal;":"⩵","&EqualTilde;":"≂","&Equilibrium;":"⇌","&Escr;":"ℰ","&Esim;":"⩳","&Eta;":"Η","&Euml":"Ë","&Euml;":"Ë","&Exists;":"∃","&ExponentialE;":"ⅇ","&Fcy;":"Ф","&Ffr;":"𝔉","&FilledSmallSquare;":"◼","&FilledVerySmallSquare;":"▪","&Fopf;":"𝔽","&ForAll;":"∀","&Fouriertrf;":"ℱ","&Fscr;":"ℱ","&GJcy;":"Ѓ","&GT":">","&GT;":">","&Gamma;":"Γ","&Gammad;":"Ϝ","&Gbreve;":"Ğ","&Gcedil;":"Ģ","&Gcirc;":"Ĝ","&Gcy;":"Г","&Gdot;":"Ġ","&Gfr;":"𝔊","&Gg;":"⋙","&Gopf;":"𝔾","&GreaterEqual;":"≥","&GreaterEqualLess;":"⋛","&GreaterFullEqual;":"≧","&GreaterGreater;":"⪢","&GreaterLess;":"≷","&GreaterSlantEqual;":"⩾","&GreaterTilde;":"≳","&Gscr;":"𝒢","&Gt;":"≫","&HARDcy;":"Ъ","&Hacek;":"ˇ","&Hat;":"^","&Hcirc;":"Ĥ","&Hfr;":"ℌ","&HilbertSpace;":"ℋ","&Hopf;":"ℍ","&HorizontalLine;":"─","&Hscr;":"ℋ","&Hstrok;":"Ħ","&HumpDownHump;":"≎","&HumpEqual;":"≏","&IEcy;":"Е","&IJlig;":"Ĳ","&IOcy;":"Ё","&Iacute":"Í","&Iacute;":"Í","&Icirc":"Î","&Icirc;":"Î","&Icy;":"И","&Idot;":"İ","&Ifr;":"ℑ","&Igrave":"Ì","&Igrave;":"Ì","&Im;":"ℑ","&Imacr;":"Ī","&ImaginaryI;":"ⅈ","&Implies;":"⇒","&Int;":"∬","&Integral;":"∫","&Intersection;":"⋂","&InvisibleComma;":"⁣","&InvisibleTimes;":"⁢","&Iogon;":"Į","&Iopf;":"𝕀","&Iota;":"Ι","&Iscr;":"ℐ","&Itilde;":"Ĩ","&Iukcy;":"І","&Iuml":"Ï","&Iuml;":"Ï","&Jcirc;":"Ĵ","&Jcy;":"Й","&Jfr;":"𝔍","&Jopf;":"𝕁","&Jscr;":"𝒥","&Jsercy;":"Ј","&Jukcy;":"Є","&KHcy;":"Х","&KJcy;":"Ќ","&Kappa;":"Κ","&Kcedil;":"Ķ","&Kcy;":"К","&Kfr;":"𝔎","&Kopf;":"𝕂","&Kscr;":"𝒦","&LJcy;":"Љ","&LT":"<","&LT;":"<","&Lacute;":"Ĺ","&Lambda;":"Λ","&Lang;":"⟪","&Laplacetrf;":"ℒ","&Larr;":"↞","&Lcaron;":"Ľ","&Lcedil;":"Ļ","&Lcy;":"Л","&LeftAngleBracket;":"⟨","&LeftArrow;":"←","&LeftArrowBar;":"⇤","&LeftArrowRightArrow;":"⇆","&LeftCeiling;":"⌈","&LeftDoubleBracket;":"⟦","&LeftDownTeeVector;":"⥡","&LeftDownVector;":"⇃","&LeftDownVectorBar;":"⥙","&LeftFloor;":"⌊","&LeftRightArrow;":"↔","&LeftRightVector;":"⥎","&LeftTee;":"⊣","&LeftTeeArrow;":"↤","&LeftTeeVector;":"⥚","&LeftTriangle;":"⊲","&LeftTriangleBar;":"⧏","&LeftTriangleEqual;":"⊴","&LeftUpDownVector;":"⥑","&LeftUpTeeVector;":"⥠","&LeftUpVector;":"↿","&LeftUpVectorBar;":"⥘","&LeftVector;":"↼","&LeftVectorBar;":"⥒","&Leftarrow;":"⇐","&Leftrightarrow;":"⇔","&LessEqualGreater;":"⋚","&LessFullEqual;":"≦","&LessGreater;":"≶","&LessLess;":"⪡","&LessSlantEqual;":"⩽","&LessTilde;":"≲","&Lfr;":"𝔏","&Ll;":"⋘","&Lleftarrow;":"⇚","&Lmidot;":"Ŀ","&LongLeftArrow;":"⟵","&LongLeftRightArrow;":"⟷","&LongRightArrow;":"⟶","&Longleftarrow;":"⟸","&Longleftrightarrow;":"⟺","&Longrightarrow;":"⟹","&Lopf;":"𝕃","&LowerLeftArrow;":"↙","&LowerRightArrow;":"↘","&Lscr;":"ℒ","&Lsh;":"↰","&Lstrok;":"Ł","&Lt;":"≪","&Map;":"⤅","&Mcy;":"М","&MediumSpace;":" ","&Mellintrf;":"ℳ","&Mfr;":"𝔐","&MinusPlus;":"∓","&Mopf;":"𝕄","&Mscr;":"ℳ","&Mu;":"Μ","&NJcy;":"Њ","&Nacute;":"Ń","&Ncaron;":"Ň","&Ncedil;":"Ņ","&Ncy;":"Н","&NegativeMediumSpace;":"​","&NegativeThickSpace;":"​","&NegativeThinSpace;":"​","&NegativeVeryThinSpace;":"​","&NestedGreaterGreater;":"≫","&NestedLessLess;":"≪","&NewLine;":"\n","&Nfr;":"𝔑","&NoBreak;":"⁠","&NonBreakingSpace;":" ","&Nopf;":"ℕ","&Not;":"⫬","&NotCongruent;":"≢","&NotCupCap;":"≭","&NotDoubleVerticalBar;":"∦","&NotElement;":"∉","&NotEqual;":"≠","&NotEqualTilde;":"≂̸","&NotExists;":"∄","&NotGreater;":"≯","&NotGreaterEqual;":"≱","&NotGreaterFullEqual;":"≧̸","&NotGreaterGreater;":"≫̸","&NotGreaterLess;":"≹","&NotGreaterSlantEqual;":"⩾̸","&NotGreaterTilde;":"≵","&NotHumpDownHump;":"≎̸","&NotHumpEqual;":"≏̸","&NotLeftTriangle;":"⋪","&NotLeftTriangleBar;":"⧏̸","&NotLeftTriangleEqual;":"⋬","&NotLess;":"≮","&NotLessEqual;":"≰","&NotLessGreater;":"≸","&NotLessLess;":"≪̸","&NotLessSlantEqual;":"⩽̸","&NotLessTilde;":"≴","&NotNestedGreaterGreater;":"⪢̸","&NotNestedLessLess;":"⪡̸","&NotPrecedes;":"⊀","&NotPrecedesEqual;":"⪯̸","&NotPrecedesSlantEqual;":"⋠","&NotReverseElement;":"∌","&NotRightTriangle;":"⋫","&NotRightTriangleBar;":"⧐̸","&NotRightTriangleEqual;":"⋭","&NotSquareSubset;":"⊏̸","&NotSquareSubsetEqual;":"⋢","&NotSquareSuperset;":"⊐̸","&NotSquareSupersetEqual;":"⋣","&NotSubset;":"⊂⃒","&NotSubsetEqual;":"⊈","&NotSucceeds;":"⊁","&NotSucceedsEqual;":"⪰̸","&NotSucceedsSlantEqual;":"⋡","&NotSucceedsTilde;":"≿̸","&NotSuperset;":"⊃⃒","&NotSupersetEqual;":"⊉","&NotTilde;":"≁","&NotTildeEqual;":"≄","&NotTildeFullEqual;":"≇","&NotTildeTilde;":"≉","&NotVerticalBar;":"∤","&Nscr;":"𝒩","&Ntilde":"Ñ","&Ntilde;":"Ñ","&Nu;":"Ν","&OElig;":"Œ","&Oacute":"Ó","&Oacute;":"Ó","&Ocirc":"Ô","&Ocirc;":"Ô","&Ocy;":"О","&Odblac;":"Ő","&Ofr;":"𝔒","&Ograve":"Ò","&Ograve;":"Ò","&Omacr;":"Ō","&Omega;":"Ω","&Omicron;":"Ο","&Oopf;":"𝕆","&OpenCurlyDoubleQuote;":"“","&OpenCurlyQuote;":"‘","&Or;":"⩔","&Oscr;":"𝒪","&Oslash":"Ø","&Oslash;":"Ø","&Otilde":"Õ","&Otilde;":"Õ","&Otimes;":"⨷","&Ouml":"Ö","&Ouml;":"Ö","&OverBar;":"‾","&OverBrace;":"⏞","&OverBracket;":"⎴","&OverParenthesis;":"⏜","&PartialD;":"∂","&Pcy;":"П","&Pfr;":"𝔓","&Phi;":"Φ","&Pi;":"Π","&PlusMinus;":"±","&Poincareplane;":"ℌ","&Popf;":"ℙ","&Pr;":"⪻","&Precedes;":"≺","&PrecedesEqual;":"⪯","&PrecedesSlantEqual;":"≼","&PrecedesTilde;":"≾","&Prime;":"″","&Product;":"∏","&Proportion;":"∷","&Proportional;":"∝","&Pscr;":"𝒫","&Psi;":"Ψ","&QUOT":'"',"&QUOT;":'"',"&Qfr;":"𝔔","&Qopf;":"ℚ","&Qscr;":"𝒬","&RBarr;":"⤐","&REG":"®","&REG;":"®","&Racute;":"Ŕ","&Rang;":"⟫","&Rarr;":"↠","&Rarrtl;":"⤖","&Rcaron;":"Ř","&Rcedil;":"Ŗ","&Rcy;":"Р","&Re;":"ℜ","&ReverseElement;":"∋","&ReverseEquilibrium;":"⇋","&ReverseUpEquilibrium;":"⥯","&Rfr;":"ℜ","&Rho;":"Ρ","&RightAngleBracket;":"⟩","&RightArrow;":"→","&RightArrowBar;":"⇥","&RightArrowLeftArrow;":"⇄","&RightCeiling;":"⌉","&RightDoubleBracket;":"⟧","&RightDownTeeVector;":"⥝","&RightDownVector;":"⇂","&RightDownVectorBar;":"⥕","&RightFloor;":"⌋","&RightTee;":"⊢","&RightTeeArrow;":"↦","&RightTeeVector;":"⥛","&RightTriangle;":"⊳","&RightTriangleBar;":"⧐","&RightTriangleEqual;":"⊵","&RightUpDownVector;":"⥏","&RightUpTeeVector;":"⥜","&RightUpVector;":"↾","&RightUpVectorBar;":"⥔","&RightVector;":"⇀","&RightVectorBar;":"⥓","&Rightarrow;":"⇒","&Ropf;":"ℝ","&RoundImplies;":"⥰","&Rrightarrow;":"⇛","&Rscr;":"ℛ","&Rsh;":"↱","&RuleDelayed;":"⧴","&SHCHcy;":"Щ","&SHcy;":"Ш","&SOFTcy;":"Ь","&Sacute;":"Ś","&Sc;":"⪼","&Scaron;":"Š","&Scedil;":"Ş","&Scirc;":"Ŝ","&Scy;":"С","&Sfr;":"𝔖","&ShortDownArrow;":"↓","&ShortLeftArrow;":"←","&ShortRightArrow;":"→","&ShortUpArrow;":"↑","&Sigma;":"Σ","&SmallCircle;":"∘","&Sopf;":"𝕊","&Sqrt;":"√","&Square;":"□","&SquareIntersection;":"⊓","&SquareSubset;":"⊏","&SquareSubsetEqual;":"⊑","&SquareSuperset;":"⊐","&SquareSupersetEqual;":"⊒","&SquareUnion;":"⊔","&Sscr;":"𝒮","&Star;":"⋆","&Sub;":"⋐","&Subset;":"⋐","&SubsetEqual;":"⊆","&Succeeds;":"≻","&SucceedsEqual;":"⪰","&SucceedsSlantEqual;":"≽","&SucceedsTilde;":"≿","&SuchThat;":"∋","&Sum;":"∑","&Sup;":"⋑","&Superset;":"⊃","&SupersetEqual;":"⊇","&Supset;":"⋑","&THORN":"Þ","&THORN;":"Þ","&TRADE;":"™","&TSHcy;":"Ћ","&TScy;":"Ц","&Tab;":"\t","&Tau;":"Τ","&Tcaron;":"Ť","&Tcedil;":"Ţ","&Tcy;":"Т","&Tfr;":"𝔗","&Therefore;":"∴","&Theta;":"Θ","&ThickSpace;":"  ","&ThinSpace;":" ","&Tilde;":"∼","&TildeEqual;":"≃","&TildeFullEqual;":"≅","&TildeTilde;":"≈","&Topf;":"𝕋","&TripleDot;":"⃛","&Tscr;":"𝒯","&Tstrok;":"Ŧ","&Uacute":"Ú","&Uacute;":"Ú","&Uarr;":"↟","&Uarrocir;":"⥉","&Ubrcy;":"Ў","&Ubreve;":"Ŭ","&Ucirc":"Û","&Ucirc;":"Û","&Ucy;":"У","&Udblac;":"Ű","&Ufr;":"𝔘","&Ugrave":"Ù","&Ugrave;":"Ù","&Umacr;":"Ū","&UnderBar;":"_","&UnderBrace;":"⏟","&UnderBracket;":"⎵","&UnderParenthesis;":"⏝","&Union;":"⋃","&UnionPlus;":"⊎","&Uogon;":"Ų","&Uopf;":"𝕌","&UpArrow;":"↑","&UpArrowBar;":"⤒","&UpArrowDownArrow;":"⇅","&UpDownArrow;":"↕","&UpEquilibrium;":"⥮","&UpTee;":"⊥","&UpTeeArrow;":"↥","&Uparrow;":"⇑","&Updownarrow;":"⇕","&UpperLeftArrow;":"↖","&UpperRightArrow;":"↗","&Upsi;":"ϒ","&Upsilon;":"Υ","&Uring;":"Ů","&Uscr;":"𝒰","&Utilde;":"Ũ","&Uuml":"Ü","&Uuml;":"Ü","&VDash;":"⊫","&Vbar;":"⫫","&Vcy;":"В","&Vdash;":"⊩","&Vdashl;":"⫦","&Vee;":"⋁","&Verbar;":"‖","&Vert;":"‖","&VerticalBar;":"∣","&VerticalLine;":"|","&VerticalSeparator;":"❘","&VerticalTilde;":"≀","&VeryThinSpace;":" ","&Vfr;":"𝔙","&Vopf;":"𝕍","&Vscr;":"𝒱","&Vvdash;":"⊪","&Wcirc;":"Ŵ","&Wedge;":"⋀","&Wfr;":"𝔚","&Wopf;":"𝕎","&Wscr;":"𝒲","&Xfr;":"𝔛","&Xi;":"Ξ","&Xopf;":"𝕏","&Xscr;":"𝒳","&YAcy;":"Я","&YIcy;":"Ї","&YUcy;":"Ю","&Yacute":"Ý","&Yacute;":"Ý","&Ycirc;":"Ŷ","&Ycy;":"Ы","&Yfr;":"𝔜","&Yopf;":"𝕐","&Yscr;":"𝒴","&Yuml;":"Ÿ","&ZHcy;":"Ж","&Zacute;":"Ź","&Zcaron;":"Ž","&Zcy;":"З","&Zdot;":"Ż","&ZeroWidthSpace;":"​","&Zeta;":"Ζ","&Zfr;":"ℨ","&Zopf;":"ℤ","&Zscr;":"𝒵","&aacute":"á","&aacute;":"á","&abreve;":"ă","&ac;":"∾","&acE;":"∾̳","&acd;":"∿","&acirc":"â","&acirc;":"â","&acute":"´","&acute;":"´","&acy;":"а","&aelig":"æ","&aelig;":"æ","&af;":"⁡","&afr;":"𝔞","&agrave":"à","&agrave;":"à","&alefsym;":"ℵ","&aleph;":"ℵ","&alpha;":"α","&amacr;":"ā","&amalg;":"⨿","&amp":"&","&amp;":"&","&and;":"∧","&andand;":"⩕","&andd;":"⩜","&andslope;":"⩘","&andv;":"⩚","&ang;":"∠","&ange;":"⦤","&angle;":"∠","&angmsd;":"∡","&angmsdaa;":"⦨","&angmsdab;":"⦩","&angmsdac;":"⦪","&angmsdad;":"⦫","&angmsdae;":"⦬","&angmsdaf;":"⦭","&angmsdag;":"⦮","&angmsdah;":"⦯","&angrt;":"∟","&angrtvb;":"⊾","&angrtvbd;":"⦝","&angsph;":"∢","&angst;":"Å","&angzarr;":"⍼","&aogon;":"ą","&aopf;":"𝕒","&ap;":"≈","&apE;":"⩰","&apacir;":"⩯","&ape;":"≊","&apid;":"≋","&apos;":"'","&approx;":"≈","&approxeq;":"≊","&aring":"å","&aring;":"å","&ascr;":"𝒶","&ast;":"*","&asymp;":"≈","&asympeq;":"≍","&atilde":"ã","&atilde;":"ã","&auml":"ä","&auml;":"ä","&awconint;":"∳","&awint;":"⨑","&bNot;":"⫭","&backcong;":"≌","&backepsilon;":"϶","&backprime;":"‵","&backsim;":"∽","&backsimeq;":"⋍","&barvee;":"⊽","&barwed;":"⌅","&barwedge;":"⌅","&bbrk;":"⎵","&bbrktbrk;":"⎶","&bcong;":"≌","&bcy;":"б","&bdquo;":"„","&becaus;":"∵","&because;":"∵","&bemptyv;":"⦰","&bepsi;":"϶","&bernou;":"ℬ","&beta;":"β","&beth;":"ℶ","&between;":"≬","&bfr;":"𝔟","&bigcap;":"⋂","&bigcirc;":"◯","&bigcup;":"⋃","&bigodot;":"⨀","&bigoplus;":"⨁","&bigotimes;":"⨂","&bigsqcup;":"⨆","&bigstar;":"★","&bigtriangledown;":"▽","&bigtriangleup;":"△","&biguplus;":"⨄","&bigvee;":"⋁","&bigwedge;":"⋀","&bkarow;":"⤍","&blacklozenge;":"⧫","&blacksquare;":"▪","&blacktriangle;":"▴","&blacktriangledown;":"▾","&blacktriangleleft;":"◂","&blacktriangleright;":"▸","&blank;":"␣","&blk12;":"▒","&blk14;":"░","&blk34;":"▓","&block;":"█","&bne;":"=⃥","&bnequiv;":"≡⃥","&bnot;":"⌐","&bopf;":"𝕓","&bot;":"⊥","&bottom;":"⊥","&bowtie;":"⋈","&boxDL;":"╗","&boxDR;":"╔","&boxDl;":"╖","&boxDr;":"╓","&boxH;":"═","&boxHD;":"╦","&boxHU;":"╩","&boxHd;":"╤","&boxHu;":"╧","&boxUL;":"╝","&boxUR;":"╚","&boxUl;":"╜","&boxUr;":"╙","&boxV;":"║","&boxVH;":"╬","&boxVL;":"╣","&boxVR;":"╠","&boxVh;":"╫","&boxVl;":"╢","&boxVr;":"╟","&boxbox;":"⧉","&boxdL;":"╕","&boxdR;":"╒","&boxdl;":"┐","&boxdr;":"┌","&boxh;":"─","&boxhD;":"╥","&boxhU;":"╨","&boxhd;":"┬","&boxhu;":"┴","&boxminus;":"⊟","&boxplus;":"⊞","&boxtimes;":"⊠","&boxuL;":"╛","&boxuR;":"╘","&boxul;":"┘","&boxur;":"└","&boxv;":"│","&boxvH;":"╪","&boxvL;":"╡","&boxvR;":"╞","&boxvh;":"┼","&boxvl;":"┤","&boxvr;":"├","&bprime;":"‵","&breve;":"˘","&brvbar":"¦","&brvbar;":"¦","&bscr;":"𝒷","&bsemi;":"⁏","&bsim;":"∽","&bsime;":"⋍","&bsol;":"\\","&bsolb;":"⧅","&bsolhsub;":"⟈","&bull;":"•","&bullet;":"•","&bump;":"≎","&bumpE;":"⪮","&bumpe;":"≏","&bumpeq;":"≏","&cacute;":"ć","&cap;":"∩","&capand;":"⩄","&capbrcup;":"⩉","&capcap;":"⩋","&capcup;":"⩇","&capdot;":"⩀","&caps;":"∩︀","&caret;":"⁁","&caron;":"ˇ","&ccaps;":"⩍","&ccaron;":"č","&ccedil":"ç","&ccedil;":"ç","&ccirc;":"ĉ","&ccups;":"⩌","&ccupssm;":"⩐","&cdot;":"ċ","&cedil":"¸","&cedil;":"¸","&cemptyv;":"⦲","&cent":"¢","&cent;":"¢","&centerdot;":"·","&cfr;":"𝔠","&chcy;":"ч","&check;":"✓","&checkmark;":"✓","&chi;":"χ","&cir;":"○","&cirE;":"⧃","&circ;":"ˆ","&circeq;":"≗","&circlearrowleft;":"↺","&circlearrowright;":"↻","&circledR;":"®","&circledS;":"Ⓢ","&circledast;":"⊛","&circledcirc;":"⊚","&circleddash;":"⊝","&cire;":"≗","&cirfnint;":"⨐","&cirmid;":"⫯","&cirscir;":"⧂","&clubs;":"♣","&clubsuit;":"♣","&colon;":":","&colone;":"≔","&coloneq;":"≔","&comma;":",","&commat;":"@","&comp;":"∁","&compfn;":"∘","&complement;":"∁","&complexes;":"ℂ","&cong;":"≅","&congdot;":"⩭","&conint;":"∮","&copf;":"𝕔","&coprod;":"∐","&copy":"©","&copy;":"©","&copysr;":"℗","&crarr;":"↵","&cross;":"✗","&cscr;":"𝒸","&csub;":"⫏","&csube;":"⫑","&csup;":"⫐","&csupe;":"⫒","&ctdot;":"⋯","&cudarrl;":"⤸","&cudarrr;":"⤵","&cuepr;":"⋞","&cuesc;":"⋟","&cularr;":"↶","&cularrp;":"⤽","&cup;":"∪","&cupbrcap;":"⩈","&cupcap;":"⩆","&cupcup;":"⩊","&cupdot;":"⊍","&cupor;":"⩅","&cups;":"∪︀","&curarr;":"↷","&curarrm;":"⤼","&curlyeqprec;":"⋞","&curlyeqsucc;":"⋟","&curlyvee;":"⋎","&curlywedge;":"⋏","&curren":"¤","&curren;":"¤","&curvearrowleft;":"↶","&curvearrowright;":"↷","&cuvee;":"⋎","&cuwed;":"⋏","&cwconint;":"∲","&cwint;":"∱","&cylcty;":"⌭","&dArr;":"⇓","&dHar;":"⥥","&dagger;":"†","&daleth;":"ℸ","&darr;":"↓","&dash;":"‐","&dashv;":"⊣","&dbkarow;":"⤏","&dblac;":"˝","&dcaron;":"ď","&dcy;":"д","&dd;":"ⅆ","&ddagger;":"‡","&ddarr;":"⇊","&ddotseq;":"⩷","&deg":"°","&deg;":"°","&delta;":"δ","&demptyv;":"⦱","&dfisht;":"⥿","&dfr;":"𝔡","&dharl;":"⇃","&dharr;":"⇂","&diam;":"⋄","&diamond;":"⋄","&diamondsuit;":"♦","&diams;":"♦","&die;":"¨","&digamma;":"ϝ","&disin;":"⋲","&div;":"÷","&divide":"÷","&divide;":"÷","&divideontimes;":"⋇","&divonx;":"⋇","&djcy;":"ђ","&dlcorn;":"⌞","&dlcrop;":"⌍","&dollar;":"$","&dopf;":"𝕕","&dot;":"˙","&doteq;":"≐","&doteqdot;":"≑","&dotminus;":"∸","&dotplus;":"∔","&dotsquare;":"⊡","&doublebarwedge;":"⌆","&downarrow;":"↓","&downdownarrows;":"⇊","&downharpoonleft;":"⇃","&downharpoonright;":"⇂","&drbkarow;":"⤐","&drcorn;":"⌟","&drcrop;":"⌌","&dscr;":"𝒹","&dscy;":"ѕ","&dsol;":"⧶","&dstrok;":"đ","&dtdot;":"⋱","&dtri;":"▿","&dtrif;":"▾","&duarr;":"⇵","&duhar;":"⥯","&dwangle;":"⦦","&dzcy;":"џ","&dzigrarr;":"⟿","&eDDot;":"⩷","&eDot;":"≑","&eacute":"é","&eacute;":"é","&easter;":"⩮","&ecaron;":"ě","&ecir;":"≖","&ecirc":"ê","&ecirc;":"ê","&ecolon;":"≕","&ecy;":"э","&edot;":"ė","&ee;":"ⅇ","&efDot;":"≒","&efr;":"𝔢","&eg;":"⪚","&egrave":"è","&egrave;":"è","&egs;":"⪖","&egsdot;":"⪘","&el;":"⪙","&elinters;":"⏧","&ell;":"ℓ","&els;":"⪕","&elsdot;":"⪗","&emacr;":"ē","&empty;":"∅","&emptyset;":"∅","&emptyv;":"∅","&emsp13;":" ","&emsp14;":" ","&emsp;":" ","&eng;":"ŋ","&ensp;":" ","&eogon;":"ę","&eopf;":"𝕖","&epar;":"⋕","&eparsl;":"⧣","&eplus;":"⩱","&epsi;":"ε","&epsilon;":"ε","&epsiv;":"ϵ","&eqcirc;":"≖","&eqcolon;":"≕","&eqsim;":"≂","&eqslantgtr;":"⪖","&eqslantless;":"⪕","&equals;":"=","&equest;":"≟","&equiv;":"≡","&equivDD;":"⩸","&eqvparsl;":"⧥","&erDot;":"≓","&erarr;":"⥱","&escr;":"ℯ","&esdot;":"≐","&esim;":"≂","&eta;":"η","&eth":"ð","&eth;":"ð","&euml":"ë","&euml;":"ë","&euro;":"€","&excl;":"!","&exist;":"∃","&expectation;":"ℰ","&exponentiale;":"ⅇ","&fallingdotseq;":"≒","&fcy;":"ф","&female;":"♀","&ffilig;":"ﬃ","&fflig;":"ﬀ","&ffllig;":"ﬄ","&ffr;":"𝔣","&filig;":"ﬁ","&fjlig;":"fj","&flat;":"♭","&fllig;":"ﬂ","&fltns;":"▱","&fnof;":"ƒ","&fopf;":"𝕗","&forall;":"∀","&fork;":"⋔","&forkv;":"⫙","&fpartint;":"⨍","&frac12":"½","&frac12;":"½","&frac13;":"⅓","&frac14":"¼","&frac14;":"¼","&frac15;":"⅕","&frac16;":"⅙","&frac18;":"⅛","&frac23;":"⅔","&frac25;":"⅖","&frac34":"¾","&frac34;":"¾","&frac35;":"⅗","&frac38;":"⅜","&frac45;":"⅘","&frac56;":"⅚","&frac58;":"⅝","&frac78;":"⅞","&frasl;":"⁄","&frown;":"⌢","&fscr;":"𝒻","&gE;":"≧","&gEl;":"⪌","&gacute;":"ǵ","&gamma;":"γ","&gammad;":"ϝ","&gap;":"⪆","&gbreve;":"ğ","&gcirc;":"ĝ","&gcy;":"г","&gdot;":"ġ","&ge;":"≥","&gel;":"⋛","&geq;":"≥","&geqq;":"≧","&geqslant;":"⩾","&ges;":"⩾","&gescc;":"⪩","&gesdot;":"⪀","&gesdoto;":"⪂","&gesdotol;":"⪄","&gesl;":"⋛︀","&gesles;":"⪔","&gfr;":"𝔤","&gg;":"≫","&ggg;":"⋙","&gimel;":"ℷ","&gjcy;":"ѓ","&gl;":"≷","&glE;":"⪒","&gla;":"⪥","&glj;":"⪤","&gnE;":"≩","&gnap;":"⪊","&gnapprox;":"⪊","&gne;":"⪈","&gneq;":"⪈","&gneqq;":"≩","&gnsim;":"⋧","&gopf;":"𝕘","&grave;":"`","&gscr;":"ℊ","&gsim;":"≳","&gsime;":"⪎","&gsiml;":"⪐","&gt":">","&gt;":">","&gtcc;":"⪧","&gtcir;":"⩺","&gtdot;":"⋗","&gtlPar;":"⦕","&gtquest;":"⩼","&gtrapprox;":"⪆","&gtrarr;":"⥸","&gtrdot;":"⋗","&gtreqless;":"⋛","&gtreqqless;":"⪌","&gtrless;":"≷","&gtrsim;":"≳","&gvertneqq;":"≩︀","&gvnE;":"≩︀","&hArr;":"⇔","&hairsp;":" ","&half;":"½","&hamilt;":"ℋ","&hardcy;":"ъ","&harr;":"↔","&harrcir;":"⥈","&harrw;":"↭","&hbar;":"ℏ","&hcirc;":"ĥ","&hearts;":"♥","&heartsuit;":"♥","&hellip;":"…","&hercon;":"⊹","&hfr;":"𝔥","&hksearow;":"⤥","&hkswarow;":"⤦","&hoarr;":"⇿","&homtht;":"∻","&hookleftarrow;":"↩","&hookrightarrow;":"↪","&hopf;":"𝕙","&horbar;":"―","&hscr;":"𝒽","&hslash;":"ℏ","&hstrok;":"ħ","&hybull;":"⁃","&hyphen;":"‐","&iacute":"í","&iacute;":"í","&ic;":"⁣","&icirc":"î","&icirc;":"î","&icy;":"и","&iecy;":"е","&iexcl":"¡","&iexcl;":"¡","&iff;":"⇔","&ifr;":"𝔦","&igrave":"ì","&igrave;":"ì","&ii;":"ⅈ","&iiiint;":"⨌","&iiint;":"∭","&iinfin;":"⧜","&iiota;":"℩","&ijlig;":"ĳ","&imacr;":"ī","&image;":"ℑ","&imagline;":"ℐ","&imagpart;":"ℑ","&imath;":"ı","&imof;":"⊷","&imped;":"Ƶ","&in;":"∈","&incare;":"℅","&infin;":"∞","&infintie;":"⧝","&inodot;":"ı","&int;":"∫","&intcal;":"⊺","&integers;":"ℤ","&intercal;":"⊺","&intlarhk;":"⨗","&intprod;":"⨼","&iocy;":"ё","&iogon;":"į","&iopf;":"𝕚","&iota;":"ι","&iprod;":"⨼","&iquest":"¿","&iquest;":"¿","&iscr;":"𝒾","&isin;":"∈","&isinE;":"⋹","&isindot;":"⋵","&isins;":"⋴","&isinsv;":"⋳","&isinv;":"∈","&it;":"⁢","&itilde;":"ĩ","&iukcy;":"і","&iuml":"ï","&iuml;":"ï","&jcirc;":"ĵ","&jcy;":"й","&jfr;":"𝔧","&jmath;":"ȷ","&jopf;":"𝕛","&jscr;":"𝒿","&jsercy;":"ј","&jukcy;":"є","&kappa;":"κ","&kappav;":"ϰ","&kcedil;":"ķ","&kcy;":"к","&kfr;":"𝔨","&kgreen;":"ĸ","&khcy;":"х","&kjcy;":"ќ","&kopf;":"𝕜","&kscr;":"𝓀","&lAarr;":"⇚","&lArr;":"⇐","&lAtail;":"⤛","&lBarr;":"⤎","&lE;":"≦","&lEg;":"⪋","&lHar;":"⥢","&lacute;":"ĺ","&laemptyv;":"⦴","&lagran;":"ℒ","&lambda;":"λ","&lang;":"⟨","&langd;":"⦑","&langle;":"⟨","&lap;":"⪅","&laquo":"«","&laquo;":"«","&larr;":"←","&larrb;":"⇤","&larrbfs;":"⤟","&larrfs;":"⤝","&larrhk;":"↩","&larrlp;":"↫","&larrpl;":"⤹","&larrsim;":"⥳","&larrtl;":"↢","&lat;":"⪫","&latail;":"⤙","&late;":"⪭","&lates;":"⪭︀","&lbarr;":"⤌","&lbbrk;":"❲","&lbrace;":"{","&lbrack;":"[","&lbrke;":"⦋","&lbrksld;":"⦏","&lbrkslu;":"⦍","&lcaron;":"ľ","&lcedil;":"ļ","&lceil;":"⌈","&lcub;":"{","&lcy;":"л","&ldca;":"⤶","&ldquo;":"“","&ldquor;":"„","&ldrdhar;":"⥧","&ldrushar;":"⥋","&ldsh;":"↲","&le;":"≤","&leftarrow;":"←","&leftarrowtail;":"↢","&leftharpoondown;":"↽","&leftharpoonup;":"↼","&leftleftarrows;":"⇇","&leftrightarrow;":"↔","&leftrightarrows;":"⇆","&leftrightharpoons;":"⇋","&leftrightsquigarrow;":"↭","&leftthreetimes;":"⋋","&leg;":"⋚","&leq;":"≤","&leqq;":"≦","&leqslant;":"⩽","&les;":"⩽","&lescc;":"⪨","&lesdot;":"⩿","&lesdoto;":"⪁","&lesdotor;":"⪃","&lesg;":"⋚︀","&lesges;":"⪓","&lessapprox;":"⪅","&lessdot;":"⋖","&lesseqgtr;":"⋚","&lesseqqgtr;":"⪋","&lessgtr;":"≶","&lesssim;":"≲","&lfisht;":"⥼","&lfloor;":"⌊","&lfr;":"𝔩","&lg;":"≶","&lgE;":"⪑","&lhard;":"↽","&lharu;":"↼","&lharul;":"⥪","&lhblk;":"▄","&ljcy;":"љ","&ll;":"≪","&llarr;":"⇇","&llcorner;":"⌞","&llhard;":"⥫","&lltri;":"◺","&lmidot;":"ŀ","&lmoust;":"⎰","&lmoustache;":"⎰","&lnE;":"≨","&lnap;":"⪉","&lnapprox;":"⪉","&lne;":"⪇","&lneq;":"⪇","&lneqq;":"≨","&lnsim;":"⋦","&loang;":"⟬","&loarr;":"⇽","&lobrk;":"⟦","&longleftarrow;":"⟵","&longleftrightarrow;":"⟷","&longmapsto;":"⟼","&longrightarrow;":"⟶","&looparrowleft;":"↫","&looparrowright;":"↬","&lopar;":"⦅","&lopf;":"𝕝","&loplus;":"⨭","&lotimes;":"⨴","&lowast;":"∗","&lowbar;":"_","&loz;":"◊","&lozenge;":"◊","&lozf;":"⧫","&lpar;":"(","&lparlt;":"⦓","&lrarr;":"⇆","&lrcorner;":"⌟","&lrhar;":"⇋","&lrhard;":"⥭","&lrm;":"‎","&lrtri;":"⊿","&lsaquo;":"‹","&lscr;":"𝓁","&lsh;":"↰","&lsim;":"≲","&lsime;":"⪍","&lsimg;":"⪏","&lsqb;":"[","&lsquo;":"‘","&lsquor;":"‚","&lstrok;":"ł","&lt":"<","&lt;":"<","&ltcc;":"⪦","&ltcir;":"⩹","&ltdot;":"⋖","&lthree;":"⋋","&ltimes;":"⋉","&ltlarr;":"⥶","&ltquest;":"⩻","&ltrPar;":"⦖","&ltri;":"◃","&ltrie;":"⊴","&ltrif;":"◂","&lurdshar;":"⥊","&luruhar;":"⥦","&lvertneqq;":"≨︀","&lvnE;":"≨︀","&mDDot;":"∺","&macr":"¯","&macr;":"¯","&male;":"♂","&malt;":"✠","&maltese;":"✠","&map;":"↦","&mapsto;":"↦","&mapstodown;":"↧","&mapstoleft;":"↤","&mapstoup;":"↥","&marker;":"▮","&mcomma;":"⨩","&mcy;":"м","&mdash;":"—","&measuredangle;":"∡","&mfr;":"𝔪","&mho;":"℧","&micro":"µ","&micro;":"µ","&mid;":"∣","&midast;":"*","&midcir;":"⫰","&middot":"·","&middot;":"·","&minus;":"−","&minusb;":"⊟","&minusd;":"∸","&minusdu;":"⨪","&mlcp;":"⫛","&mldr;":"…","&mnplus;":"∓","&models;":"⊧","&mopf;":"𝕞","&mp;":"∓","&mscr;":"𝓂","&mstpos;":"∾","&mu;":"μ","&multimap;":"⊸","&mumap;":"⊸","&nGg;":"⋙̸","&nGt;":"≫⃒","&nGtv;":"≫̸","&nLeftarrow;":"⇍","&nLeftrightarrow;":"⇎","&nLl;":"⋘̸","&nLt;":"≪⃒","&nLtv;":"≪̸","&nRightarrow;":"⇏","&nVDash;":"⊯","&nVdash;":"⊮","&nabla;":"∇","&nacute;":"ń","&nang;":"∠⃒","&nap;":"≉","&napE;":"⩰̸","&napid;":"≋̸","&napos;":"ŉ","&napprox;":"≉","&natur;":"♮","&natural;":"♮","&naturals;":"ℕ","&nbsp":" ","&nbsp;":" ","&nbump;":"≎̸","&nbumpe;":"≏̸","&ncap;":"⩃","&ncaron;":"ň","&ncedil;":"ņ","&ncong;":"≇","&ncongdot;":"⩭̸","&ncup;":"⩂","&ncy;":"н","&ndash;":"–","&ne;":"≠","&neArr;":"⇗","&nearhk;":"⤤","&nearr;":"↗","&nearrow;":"↗","&nedot;":"≐̸","&nequiv;":"≢","&nesear;":"⤨","&nesim;":"≂̸","&nexist;":"∄","&nexists;":"∄","&nfr;":"𝔫","&ngE;":"≧̸","&nge;":"≱","&ngeq;":"≱","&ngeqq;":"≧̸","&ngeqslant;":"⩾̸","&nges;":"⩾̸","&ngsim;":"≵","&ngt;":"≯","&ngtr;":"≯","&nhArr;":"⇎","&nharr;":"↮","&nhpar;":"⫲","&ni;":"∋","&nis;":"⋼","&nisd;":"⋺","&niv;":"∋","&njcy;":"њ","&nlArr;":"⇍","&nlE;":"≦̸","&nlarr;":"↚","&nldr;":"‥","&nle;":"≰","&nleftarrow;":"↚","&nleftrightarrow;":"↮","&nleq;":"≰","&nleqq;":"≦̸","&nleqslant;":"⩽̸","&nles;":"⩽̸","&nless;":"≮","&nlsim;":"≴","&nlt;":"≮","&nltri;":"⋪","&nltrie;":"⋬","&nmid;":"∤","&nopf;":"𝕟","&not":"¬","&not;":"¬","&notin;":"∉","&notinE;":"⋹̸","&notindot;":"⋵̸","&notinva;":"∉","&notinvb;":"⋷","&notinvc;":"⋶","&notni;":"∌","&notniva;":"∌","&notnivb;":"⋾","&notnivc;":"⋽","&npar;":"∦","&nparallel;":"∦","&nparsl;":"⫽⃥","&npart;":"∂̸","&npolint;":"⨔","&npr;":"⊀","&nprcue;":"⋠","&npre;":"⪯̸","&nprec;":"⊀","&npreceq;":"⪯̸","&nrArr;":"⇏","&nrarr;":"↛","&nrarrc;":"⤳̸","&nrarrw;":"↝̸","&nrightarrow;":"↛","&nrtri;":"⋫","&nrtrie;":"⋭","&nsc;":"⊁","&nsccue;":"⋡","&nsce;":"⪰̸","&nscr;":"𝓃","&nshortmid;":"∤","&nshortparallel;":"∦","&nsim;":"≁","&nsime;":"≄","&nsimeq;":"≄","&nsmid;":"∤","&nspar;":"∦","&nsqsube;":"⋢","&nsqsupe;":"⋣","&nsub;":"⊄","&nsubE;":"⫅̸","&nsube;":"⊈","&nsubset;":"⊂⃒","&nsubseteq;":"⊈","&nsubseteqq;":"⫅̸","&nsucc;":"⊁","&nsucceq;":"⪰̸","&nsup;":"⊅","&nsupE;":"⫆̸","&nsupe;":"⊉","&nsupset;":"⊃⃒","&nsupseteq;":"⊉","&nsupseteqq;":"⫆̸","&ntgl;":"≹","&ntilde":"ñ","&ntilde;":"ñ","&ntlg;":"≸","&ntriangleleft;":"⋪","&ntrianglelefteq;":"⋬","&ntriangleright;":"⋫","&ntrianglerighteq;":"⋭","&nu;":"ν","&num;":"#","&numero;":"№","&numsp;":" ","&nvDash;":"⊭","&nvHarr;":"⤄","&nvap;":"≍⃒","&nvdash;":"⊬","&nvge;":"≥⃒","&nvgt;":">⃒","&nvinfin;":"⧞","&nvlArr;":"⤂","&nvle;":"≤⃒","&nvlt;":"<⃒","&nvltrie;":"⊴⃒","&nvrArr;":"⤃","&nvrtrie;":"⊵⃒","&nvsim;":"∼⃒","&nwArr;":"⇖","&nwarhk;":"⤣","&nwarr;":"↖","&nwarrow;":"↖","&nwnear;":"⤧","&oS;":"Ⓢ","&oacute":"ó","&oacute;":"ó","&oast;":"⊛","&ocir;":"⊚","&ocirc":"ô","&ocirc;":"ô","&ocy;":"о","&odash;":"⊝","&odblac;":"ő","&odiv;":"⨸","&odot;":"⊙","&odsold;":"⦼","&oelig;":"œ","&ofcir;":"⦿","&ofr;":"𝔬","&ogon;":"˛","&ograve":"ò","&ograve;":"ò","&ogt;":"⧁","&ohbar;":"⦵","&ohm;":"Ω","&oint;":"∮","&olarr;":"↺","&olcir;":"⦾","&olcross;":"⦻","&oline;":"‾","&olt;":"⧀","&omacr;":"ō","&omega;":"ω","&omicron;":"ο","&omid;":"⦶","&ominus;":"⊖","&oopf;":"𝕠","&opar;":"⦷","&operp;":"⦹","&oplus;":"⊕","&or;":"∨","&orarr;":"↻","&ord;":"⩝","&order;":"ℴ","&orderof;":"ℴ","&ordf":"ª","&ordf;":"ª","&ordm":"º","&ordm;":"º","&origof;":"⊶","&oror;":"⩖","&orslope;":"⩗","&orv;":"⩛","&oscr;":"ℴ","&oslash":"ø","&oslash;":"ø","&osol;":"⊘","&otilde":"õ","&otilde;":"õ","&otimes;":"⊗","&otimesas;":"⨶","&ouml":"ö","&ouml;":"ö","&ovbar;":"⌽","&par;":"∥","&para":"¶","&para;":"¶","&parallel;":"∥","&parsim;":"⫳","&parsl;":"⫽","&part;":"∂","&pcy;":"п","&percnt;":"%","&period;":".","&permil;":"‰","&perp;":"⊥","&pertenk;":"‱","&pfr;":"𝔭","&phi;":"φ","&phiv;":"ϕ","&phmmat;":"ℳ","&phone;":"☎","&pi;":"π","&pitchfork;":"⋔","&piv;":"ϖ","&planck;":"ℏ","&planckh;":"ℎ","&plankv;":"ℏ","&plus;":"+","&plusacir;":"⨣","&plusb;":"⊞","&pluscir;":"⨢","&plusdo;":"∔","&plusdu;":"⨥","&pluse;":"⩲","&plusmn":"±","&plusmn;":"±","&plussim;":"⨦","&plustwo;":"⨧","&pm;":"±","&pointint;":"⨕","&popf;":"𝕡","&pound":"£","&pound;":"£","&pr;":"≺","&prE;":"⪳","&prap;":"⪷","&prcue;":"≼","&pre;":"⪯","&prec;":"≺","&precapprox;":"⪷","&preccurlyeq;":"≼","&preceq;":"⪯","&precnapprox;":"⪹","&precneqq;":"⪵","&precnsim;":"⋨","&precsim;":"≾","&prime;":"′","&primes;":"ℙ","&prnE;":"⪵","&prnap;":"⪹","&prnsim;":"⋨","&prod;":"∏","&profalar;":"⌮","&profline;":"⌒","&profsurf;":"⌓","&prop;":"∝","&propto;":"∝","&prsim;":"≾","&prurel;":"⊰","&pscr;":"𝓅","&psi;":"ψ","&puncsp;":" ","&qfr;":"𝔮","&qint;":"⨌","&qopf;":"𝕢","&qprime;":"⁗","&qscr;":"𝓆","&quaternions;":"ℍ","&quatint;":"⨖","&quest;":"?","&questeq;":"≟","&quot":'"',"&quot;":'"',"&rAarr;":"⇛","&rArr;":"⇒","&rAtail;":"⤜","&rBarr;":"⤏","&rHar;":"⥤","&race;":"∽̱","&racute;":"ŕ","&radic;":"√","&raemptyv;":"⦳","&rang;":"⟩","&rangd;":"⦒","&range;":"⦥","&rangle;":"⟩","&raquo":"»","&raquo;":"»","&rarr;":"→","&rarrap;":"⥵","&rarrb;":"⇥","&rarrbfs;":"⤠","&rarrc;":"⤳","&rarrfs;":"⤞","&rarrhk;":"↪","&rarrlp;":"↬","&rarrpl;":"⥅","&rarrsim;":"⥴","&rarrtl;":"↣","&rarrw;":"↝","&ratail;":"⤚","&ratio;":"∶","&rationals;":"ℚ","&rbarr;":"⤍","&rbbrk;":"❳","&rbrace;":"}","&rbrack;":"]","&rbrke;":"⦌","&rbrksld;":"⦎","&rbrkslu;":"⦐","&rcaron;":"ř","&rcedil;":"ŗ","&rceil;":"⌉","&rcub;":"}","&rcy;":"р","&rdca;":"⤷","&rdldhar;":"⥩","&rdquo;":"”","&rdquor;":"”","&rdsh;":"↳","&real;":"ℜ","&realine;":"ℛ","&realpart;":"ℜ","&reals;":"ℝ","&rect;":"▭","&reg":"®","&reg;":"®","&rfisht;":"⥽","&rfloor;":"⌋","&rfr;":"𝔯","&rhard;":"⇁","&rharu;":"⇀","&rharul;":"⥬","&rho;":"ρ","&rhov;":"ϱ","&rightarrow;":"→","&rightarrowtail;":"↣","&rightharpoondown;":"⇁","&rightharpoonup;":"⇀","&rightleftarrows;":"⇄","&rightleftharpoons;":"⇌","&rightrightarrows;":"⇉","&rightsquigarrow;":"↝","&rightthreetimes;":"⋌","&ring;":"˚","&risingdotseq;":"≓","&rlarr;":"⇄","&rlhar;":"⇌","&rlm;":"‏","&rmoust;":"⎱","&rmoustache;":"⎱","&rnmid;":"⫮","&roang;":"⟭","&roarr;":"⇾","&robrk;":"⟧","&ropar;":"⦆","&ropf;":"𝕣","&roplus;":"⨮","&rotimes;":"⨵","&rpar;":")","&rpargt;":"⦔","&rppolint;":"⨒","&rrarr;":"⇉","&rsaquo;":"›","&rscr;":"𝓇","&rsh;":"↱","&rsqb;":"]","&rsquo;":"’","&rsquor;":"’","&rthree;":"⋌","&rtimes;":"⋊","&rtri;":"▹","&rtrie;":"⊵","&rtrif;":"▸","&rtriltri;":"⧎","&ruluhar;":"⥨","&rx;":"℞","&sacute;":"ś","&sbquo;":"‚","&sc;":"≻","&scE;":"⪴","&scap;":"⪸","&scaron;":"š","&sccue;":"≽","&sce;":"⪰","&scedil;":"ş","&scirc;":"ŝ","&scnE;":"⪶","&scnap;":"⪺","&scnsim;":"⋩","&scpolint;":"⨓","&scsim;":"≿","&scy;":"с","&sdot;":"⋅","&sdotb;":"⊡","&sdote;":"⩦","&seArr;":"⇘","&searhk;":"⤥","&searr;":"↘","&searrow;":"↘","&sect":"§","&sect;":"§","&semi;":";","&seswar;":"⤩","&setminus;":"∖","&setmn;":"∖","&sext;":"✶","&sfr;":"𝔰","&sfrown;":"⌢","&sharp;":"♯","&shchcy;":"щ","&shcy;":"ш","&shortmid;":"∣","&shortparallel;":"∥","&shy":"­","&shy;":"­","&sigma;":"σ","&sigmaf;":"ς","&sigmav;":"ς","&sim;":"∼","&simdot;":"⩪","&sime;":"≃","&simeq;":"≃","&simg;":"⪞","&simgE;":"⪠","&siml;":"⪝","&simlE;":"⪟","&simne;":"≆","&simplus;":"⨤","&simrarr;":"⥲","&slarr;":"←","&smallsetminus;":"∖","&smashp;":"⨳","&smeparsl;":"⧤","&smid;":"∣","&smile;":"⌣","&smt;":"⪪","&smte;":"⪬","&smtes;":"⪬︀","&softcy;":"ь","&sol;":"/","&solb;":"⧄","&solbar;":"⌿","&sopf;":"𝕤","&spades;":"♠","&spadesuit;":"♠","&spar;":"∥","&sqcap;":"⊓","&sqcaps;":"⊓︀","&sqcup;":"⊔","&sqcups;":"⊔︀","&sqsub;":"⊏","&sqsube;":"⊑","&sqsubset;":"⊏","&sqsubseteq;":"⊑","&sqsup;":"⊐","&sqsupe;":"⊒","&sqsupset;":"⊐","&sqsupseteq;":"⊒","&squ;":"□","&square;":"□","&squarf;":"▪","&squf;":"▪","&srarr;":"→","&sscr;":"𝓈","&ssetmn;":"∖","&ssmile;":"⌣","&sstarf;":"⋆","&star;":"☆","&starf;":"★","&straightepsilon;":"ϵ","&straightphi;":"ϕ","&strns;":"¯","&sub;":"⊂","&subE;":"⫅","&subdot;":"⪽","&sube;":"⊆","&subedot;":"⫃","&submult;":"⫁","&subnE;":"⫋","&subne;":"⊊","&subplus;":"⪿","&subrarr;":"⥹","&subset;":"⊂","&subseteq;":"⊆","&subseteqq;":"⫅","&subsetneq;":"⊊","&subsetneqq;":"⫋","&subsim;":"⫇","&subsub;":"⫕","&subsup;":"⫓","&succ;":"≻","&succapprox;":"⪸","&succcurlyeq;":"≽","&succeq;":"⪰","&succnapprox;":"⪺","&succneqq;":"⪶","&succnsim;":"⋩","&succsim;":"≿","&sum;":"∑","&sung;":"♪","&sup1":"¹","&sup1;":"¹","&sup2":"²","&sup2;":"²","&sup3":"³","&sup3;":"³","&sup;":"⊃","&supE;":"⫆","&supdot;":"⪾","&supdsub;":"⫘","&supe;":"⊇","&supedot;":"⫄","&suphsol;":"⟉","&suphsub;":"⫗","&suplarr;":"⥻","&supmult;":"⫂","&supnE;":"⫌","&supne;":"⊋","&supplus;":"⫀","&supset;":"⊃","&supseteq;":"⊇","&supseteqq;":"⫆","&supsetneq;":"⊋","&supsetneqq;":"⫌","&supsim;":"⫈","&supsub;":"⫔","&supsup;":"⫖","&swArr;":"⇙","&swarhk;":"⤦","&swarr;":"↙","&swarrow;":"↙","&swnwar;":"⤪","&szlig":"ß","&szlig;":"ß","&target;":"⌖","&tau;":"τ","&tbrk;":"⎴","&tcaron;":"ť","&tcedil;":"ţ","&tcy;":"т","&tdot;":"⃛","&telrec;":"⌕","&tfr;":"𝔱","&there4;":"∴","&therefore;":"∴","&theta;":"θ","&thetasym;":"ϑ","&thetav;":"ϑ","&thickapprox;":"≈","&thicksim;":"∼","&thinsp;":" ","&thkap;":"≈","&thksim;":"∼","&thorn":"þ","&thorn;":"þ","&tilde;":"˜","&times":"×","&times;":"×","&timesb;":"⊠","&timesbar;":"⨱","&timesd;":"⨰","&tint;":"∭","&toea;":"⤨","&top;":"⊤","&topbot;":"⌶","&topcir;":"⫱","&topf;":"𝕥","&topfork;":"⫚","&tosa;":"⤩","&tprime;":"‴","&trade;":"™","&triangle;":"▵","&triangledown;":"▿","&triangleleft;":"◃","&trianglelefteq;":"⊴","&triangleq;":"≜","&triangleright;":"▹","&trianglerighteq;":"⊵","&tridot;":"◬","&trie;":"≜","&triminus;":"⨺","&triplus;":"⨹","&trisb;":"⧍","&tritime;":"⨻","&trpezium;":"⏢","&tscr;":"𝓉","&tscy;":"ц","&tshcy;":"ћ","&tstrok;":"ŧ","&twixt;":"≬","&twoheadleftarrow;":"↞","&twoheadrightarrow;":"↠","&uArr;":"⇑","&uHar;":"⥣","&uacute":"ú","&uacute;":"ú","&uarr;":"↑","&ubrcy;":"ў","&ubreve;":"ŭ","&ucirc":"û","&ucirc;":"û","&ucy;":"у","&udarr;":"⇅","&udblac;":"ű","&udhar;":"⥮","&ufisht;":"⥾","&ufr;":"𝔲","&ugrave":"ù","&ugrave;":"ù","&uharl;":"↿","&uharr;":"↾","&uhblk;":"▀","&ulcorn;":"⌜","&ulcorner;":"⌜","&ulcrop;":"⌏","&ultri;":"◸","&umacr;":"ū","&uml":"¨","&uml;":"¨","&uogon;":"ų","&uopf;":"𝕦","&uparrow;":"↑","&updownarrow;":"↕","&upharpoonleft;":"↿","&upharpoonright;":"↾","&uplus;":"⊎","&upsi;":"υ","&upsih;":"ϒ","&upsilon;":"υ","&upuparrows;":"⇈","&urcorn;":"⌝","&urcorner;":"⌝","&urcrop;":"⌎","&uring;":"ů","&urtri;":"◹","&uscr;":"𝓊","&utdot;":"⋰","&utilde;":"ũ","&utri;":"▵","&utrif;":"▴","&uuarr;":"⇈","&uuml":"ü","&uuml;":"ü","&uwangle;":"⦧","&vArr;":"⇕","&vBar;":"⫨","&vBarv;":"⫩","&vDash;":"⊨","&vangrt;":"⦜","&varepsilon;":"ϵ","&varkappa;":"ϰ","&varnothing;":"∅","&varphi;":"ϕ","&varpi;":"ϖ","&varpropto;":"∝","&varr;":"↕","&varrho;":"ϱ","&varsigma;":"ς","&varsubsetneq;":"⊊︀","&varsubsetneqq;":"⫋︀","&varsupsetneq;":"⊋︀","&varsupsetneqq;":"⫌︀","&vartheta;":"ϑ","&vartriangleleft;":"⊲","&vartriangleright;":"⊳","&vcy;":"в","&vdash;":"⊢","&vee;":"∨","&veebar;":"⊻","&veeeq;":"≚","&vellip;":"⋮","&verbar;":"|","&vert;":"|","&vfr;":"𝔳","&vltri;":"⊲","&vnsub;":"⊂⃒","&vnsup;":"⊃⃒","&vopf;":"𝕧","&vprop;":"∝","&vrtri;":"⊳","&vscr;":"𝓋","&vsubnE;":"⫋︀","&vsubne;":"⊊︀","&vsupnE;":"⫌︀","&vsupne;":"⊋︀","&vzigzag;":"⦚","&wcirc;":"ŵ","&wedbar;":"⩟","&wedge;":"∧","&wedgeq;":"≙","&weierp;":"℘","&wfr;":"𝔴","&wopf;":"𝕨","&wp;":"℘","&wr;":"≀","&wreath;":"≀","&wscr;":"𝓌","&xcap;":"⋂","&xcirc;":"◯","&xcup;":"⋃","&xdtri;":"▽","&xfr;":"𝔵","&xhArr;":"⟺","&xharr;":"⟷","&xi;":"ξ","&xlArr;":"⟸","&xlarr;":"⟵","&xmap;":"⟼","&xnis;":"⋻","&xodot;":"⨀","&xopf;":"𝕩","&xoplus;":"⨁","&xotime;":"⨂","&xrArr;":"⟹","&xrarr;":"⟶","&xscr;":"𝓍","&xsqcup;":"⨆","&xuplus;":"⨄","&xutri;":"△","&xvee;":"⋁","&xwedge;":"⋀","&yacute":"ý","&yacute;":"ý","&yacy;":"я","&ycirc;":"ŷ","&ycy;":"ы","&yen":"¥","&yen;":"¥","&yfr;":"𝔶","&yicy;":"ї","&yopf;":"𝕪","&yscr;":"𝓎","&yucy;":"ю","&yuml":"ÿ","&yuml;":"ÿ","&zacute;":"ź","&zcaron;":"ž","&zcy;":"з","&zdot;":"ż","&zeetrf;":"ℨ","&zeta;":"ζ","&zfr;":"𝔷","&zhcy;":"ж","&zigrarr;":"⇝","&zopf;":"𝕫","&zscr;":"𝓏","&zwj;":"‍","&zwnj;":"‌"},characters:{"Æ":"&AElig;","&":"&amp;","Á":"&Aacute;","Ă":"&Abreve;","Â":"&Acirc;","А":"&Acy;","𝔄":"&Afr;","À":"&Agrave;","Α":"&Alpha;","Ā":"&Amacr;","⩓":"&And;","Ą":"&Aogon;","𝔸":"&Aopf;","⁡":"&af;","Å":"&angst;","𝒜":"&Ascr;","≔":"&coloneq;","Ã":"&Atilde;","Ä":"&Auml;","∖":"&ssetmn;","⫧":"&Barv;","⌆":"&doublebarwedge;","Б":"&Bcy;","∵":"&because;","ℬ":"&bernou;","Β":"&Beta;","𝔅":"&Bfr;","𝔹":"&Bopf;","˘":"&breve;","≎":"&bump;","Ч":"&CHcy;","©":"&copy;","Ć":"&Cacute;","⋒":"&Cap;","ⅅ":"&DD;","ℭ":"&Cfr;","Č":"&Ccaron;","Ç":"&Ccedil;","Ĉ":"&Ccirc;","∰":"&Cconint;","Ċ":"&Cdot;","¸":"&cedil;","·":"&middot;","Χ":"&Chi;","⊙":"&odot;","⊖":"&ominus;","⊕":"&oplus;","⊗":"&otimes;","∲":"&cwconint;","”":"&rdquor;","’":"&rsquor;","∷":"&Proportion;","⩴":"&Colone;","≡":"&equiv;","∯":"&DoubleContourIntegral;","∮":"&oint;","ℂ":"&complexes;","∐":"&coprod;","∳":"&awconint;","⨯":"&Cross;","𝒞":"&Cscr;","⋓":"&Cup;","≍":"&asympeq;","⤑":"&DDotrahd;","Ђ":"&DJcy;","Ѕ":"&DScy;","Џ":"&DZcy;","‡":"&ddagger;","↡":"&Darr;","⫤":"&DoubleLeftTee;","Ď":"&Dcaron;","Д":"&Dcy;","∇":"&nabla;","Δ":"&Delta;","𝔇":"&Dfr;","´":"&acute;","˙":"&dot;","˝":"&dblac;","`":"&grave;","˜":"&tilde;","⋄":"&diamond;","ⅆ":"&dd;","𝔻":"&Dopf;","¨":"&uml;","⃜":"&DotDot;","≐":"&esdot;","⇓":"&dArr;","⇐":"&lArr;","⇔":"&iff;","⟸":"&xlArr;","⟺":"&xhArr;","⟹":"&xrArr;","⇒":"&rArr;","⊨":"&vDash;","⇑":"&uArr;","⇕":"&vArr;","∥":"&spar;","↓":"&downarrow;","⤓":"&DownArrowBar;","⇵":"&duarr;","̑":"&DownBreve;","⥐":"&DownLeftRightVector;","⥞":"&DownLeftTeeVector;","↽":"&lhard;","⥖":"&DownLeftVectorBar;","⥟":"&DownRightTeeVector;","⇁":"&rightharpoondown;","⥗":"&DownRightVectorBar;","⊤":"&top;","↧":"&mapstodown;","𝒟":"&Dscr;","Đ":"&Dstrok;","Ŋ":"&ENG;","Ð":"&ETH;","É":"&Eacute;","Ě":"&Ecaron;","Ê":"&Ecirc;","Э":"&Ecy;","Ė":"&Edot;","𝔈":"&Efr;","È":"&Egrave;","∈":"&isinv;","Ē":"&Emacr;","◻":"&EmptySmallSquare;","▫":"&EmptyVerySmallSquare;","Ę":"&Eogon;","𝔼":"&Eopf;","Ε":"&Epsilon;","⩵":"&Equal;","≂":"&esim;","⇌":"&rlhar;","ℰ":"&expectation;","⩳":"&Esim;","Η":"&Eta;","Ë":"&Euml;","∃":"&exist;","ⅇ":"&exponentiale;","Ф":"&Fcy;","𝔉":"&Ffr;","◼":"&FilledSmallSquare;","▪":"&squf;","𝔽":"&Fopf;","∀":"&forall;","ℱ":"&Fscr;","Ѓ":"&GJcy;",">":"&gt;","Γ":"&Gamma;","Ϝ":"&Gammad;","Ğ":"&Gbreve;","Ģ":"&Gcedil;","Ĝ":"&Gcirc;","Г":"&Gcy;","Ġ":"&Gdot;","𝔊":"&Gfr;","⋙":"&ggg;","𝔾":"&Gopf;","≥":"&geq;","⋛":"&gtreqless;","≧":"&geqq;","⪢":"&GreaterGreater;","≷":"&gtrless;","⩾":"&ges;","≳":"&gtrsim;","𝒢":"&Gscr;","≫":"&gg;","Ъ":"&HARDcy;","ˇ":"&caron;","^":"&Hat;","Ĥ":"&Hcirc;","ℌ":"&Poincareplane;","ℋ":"&hamilt;","ℍ":"&quaternions;","─":"&boxh;","Ħ":"&Hstrok;","≏":"&bumpeq;","Е":"&IEcy;","Ĳ":"&IJlig;","Ё":"&IOcy;","Í":"&Iacute;","Î":"&Icirc;","И":"&Icy;","İ":"&Idot;","ℑ":"&imagpart;","Ì":"&Igrave;","Ī":"&Imacr;","ⅈ":"&ii;","∬":"&Int;","∫":"&int;","⋂":"&xcap;","⁣":"&ic;","⁢":"&it;","Į":"&Iogon;","𝕀":"&Iopf;","Ι":"&Iota;","ℐ":"&imagline;","Ĩ":"&Itilde;","І":"&Iukcy;","Ï":"&Iuml;","Ĵ":"&Jcirc;","Й":"&Jcy;","𝔍":"&Jfr;","𝕁":"&Jopf;","𝒥":"&Jscr;","Ј":"&Jsercy;","Є":"&Jukcy;","Х":"&KHcy;","Ќ":"&KJcy;","Κ":"&Kappa;","Ķ":"&Kcedil;","К":"&Kcy;","𝔎":"&Kfr;","𝕂":"&Kopf;","𝒦":"&Kscr;","Љ":"&LJcy;","<":"&lt;","Ĺ":"&Lacute;","Λ":"&Lambda;","⟪":"&Lang;","ℒ":"&lagran;","↞":"&twoheadleftarrow;","Ľ":"&Lcaron;","Ļ":"&Lcedil;","Л":"&Lcy;","⟨":"&langle;","←":"&slarr;","⇤":"&larrb;","⇆":"&lrarr;","⌈":"&lceil;","⟦":"&lobrk;","⥡":"&LeftDownTeeVector;","⇃":"&downharpoonleft;","⥙":"&LeftDownVectorBar;","⌊":"&lfloor;","↔":"&leftrightarrow;","⥎":"&LeftRightVector;","⊣":"&dashv;","↤":"&mapstoleft;","⥚":"&LeftTeeVector;","⊲":"&vltri;","⧏":"&LeftTriangleBar;","⊴":"&trianglelefteq;","⥑":"&LeftUpDownVector;","⥠":"&LeftUpTeeVector;","↿":"&upharpoonleft;","⥘":"&LeftUpVectorBar;","↼":"&lharu;","⥒":"&LeftVectorBar;","⋚":"&lesseqgtr;","≦":"&leqq;","≶":"&lg;","⪡":"&LessLess;","⩽":"&les;","≲":"&lsim;","𝔏":"&Lfr;","⋘":"&Ll;","⇚":"&lAarr;","Ŀ":"&Lmidot;","⟵":"&xlarr;","⟷":"&xharr;","⟶":"&xrarr;","𝕃":"&Lopf;","↙":"&swarrow;","↘":"&searrow;","↰":"&lsh;","Ł":"&Lstrok;","≪":"&ll;","⤅":"&Map;","М":"&Mcy;"," ":"&MediumSpace;","ℳ":"&phmmat;","𝔐":"&Mfr;","∓":"&mp;","𝕄":"&Mopf;","Μ":"&Mu;","Њ":"&NJcy;","Ń":"&Nacute;","Ň":"&Ncaron;","Ņ":"&Ncedil;","Н":"&Ncy;","​":"&ZeroWidthSpace;","\n":"&NewLine;","𝔑":"&Nfr;","⁠":"&NoBreak;"," ":"&nbsp;","ℕ":"&naturals;","⫬":"&Not;","≢":"&nequiv;","≭":"&NotCupCap;","∦":"&nspar;","∉":"&notinva;","≠":"&ne;","≂̸":"&nesim;","∄":"&nexists;","≯":"&ngtr;","≱":"&ngeq;","≧̸":"&ngeqq;","≫̸":"&nGtv;","≹":"&ntgl;","⩾̸":"&nges;","≵":"&ngsim;","≎̸":"&nbump;","≏̸":"&nbumpe;","⋪":"&ntriangleleft;","⧏̸":"&NotLeftTriangleBar;","⋬":"&ntrianglelefteq;","≮":"&nlt;","≰":"&nleq;","≸":"&ntlg;","≪̸":"&nLtv;","⩽̸":"&nles;","≴":"&nlsim;","⪢̸":"&NotNestedGreaterGreater;","⪡̸":"&NotNestedLessLess;","⊀":"&nprec;","⪯̸":"&npreceq;","⋠":"&nprcue;","∌":"&notniva;","⋫":"&ntriangleright;","⧐̸":"&NotRightTriangleBar;","⋭":"&ntrianglerighteq;","⊏̸":"&NotSquareSubset;","⋢":"&nsqsube;","⊐̸":"&NotSquareSuperset;","⋣":"&nsqsupe;","⊂⃒":"&vnsub;","⊈":"&nsubseteq;","⊁":"&nsucc;","⪰̸":"&nsucceq;","⋡":"&nsccue;","≿̸":"&NotSucceedsTilde;","⊃⃒":"&vnsup;","⊉":"&nsupseteq;","≁":"&nsim;","≄":"&nsimeq;","≇":"&ncong;","≉":"&napprox;","∤":"&nsmid;","𝒩":"&Nscr;","Ñ":"&Ntilde;","Ν":"&Nu;","Œ":"&OElig;","Ó":"&Oacute;","Ô":"&Ocirc;","О":"&Ocy;","Ő":"&Odblac;","𝔒":"&Ofr;","Ò":"&Ograve;","Ō":"&Omacr;","Ω":"&ohm;","Ο":"&Omicron;","𝕆":"&Oopf;","“":"&ldquo;","‘":"&lsquo;","⩔":"&Or;","𝒪":"&Oscr;","Ø":"&Oslash;","Õ":"&Otilde;","⨷":"&Otimes;","Ö":"&Ouml;","‾":"&oline;","⏞":"&OverBrace;","⎴":"&tbrk;","⏜":"&OverParenthesis;","∂":"&part;","П":"&Pcy;","𝔓":"&Pfr;","Φ":"&Phi;","Π":"&Pi;","±":"&pm;","ℙ":"&primes;","⪻":"&Pr;","≺":"&prec;","⪯":"&preceq;","≼":"&preccurlyeq;","≾":"&prsim;","″":"&Prime;","∏":"&prod;","∝":"&vprop;","𝒫":"&Pscr;","Ψ":"&Psi;",'"':"&quot;","𝔔":"&Qfr;","ℚ":"&rationals;","𝒬":"&Qscr;","⤐":"&drbkarow;","®":"&reg;","Ŕ":"&Racute;","⟫":"&Rang;","↠":"&twoheadrightarrow;","⤖":"&Rarrtl;","Ř":"&Rcaron;","Ŗ":"&Rcedil;","Р":"&Rcy;","ℜ":"&realpart;","∋":"&niv;","⇋":"&lrhar;","⥯":"&duhar;","Ρ":"&Rho;","⟩":"&rangle;","→":"&srarr;","⇥":"&rarrb;","⇄":"&rlarr;","⌉":"&rceil;","⟧":"&robrk;","⥝":"&RightDownTeeVector;","⇂":"&downharpoonright;","⥕":"&RightDownVectorBar;","⌋":"&rfloor;","⊢":"&vdash;","↦":"&mapsto;","⥛":"&RightTeeVector;","⊳":"&vrtri;","⧐":"&RightTriangleBar;","⊵":"&trianglerighteq;","⥏":"&RightUpDownVector;","⥜":"&RightUpTeeVector;","↾":"&upharpoonright;","⥔":"&RightUpVectorBar;","⇀":"&rightharpoonup;","⥓":"&RightVectorBar;","ℝ":"&reals;","⥰":"&RoundImplies;","⇛":"&rAarr;","ℛ":"&realine;","↱":"&rsh;","⧴":"&RuleDelayed;","Щ":"&SHCHcy;","Ш":"&SHcy;","Ь":"&SOFTcy;","Ś":"&Sacute;","⪼":"&Sc;","Š":"&Scaron;","Ş":"&Scedil;","Ŝ":"&Scirc;","С":"&Scy;","𝔖":"&Sfr;","↑":"&uparrow;","Σ":"&Sigma;","∘":"&compfn;","𝕊":"&Sopf;","√":"&radic;","□":"&square;","⊓":"&sqcap;","⊏":"&sqsubset;","⊑":"&sqsubseteq;","⊐":"&sqsupset;","⊒":"&sqsupseteq;","⊔":"&sqcup;","𝒮":"&Sscr;","⋆":"&sstarf;","⋐":"&Subset;","⊆":"&subseteq;","≻":"&succ;","⪰":"&succeq;","≽":"&succcurlyeq;","≿":"&succsim;","∑":"&sum;","⋑":"&Supset;","⊃":"&supset;","⊇":"&supseteq;","Þ":"&THORN;","™":"&trade;","Ћ":"&TSHcy;","Ц":"&TScy;","\t":"&Tab;","Τ":"&Tau;","Ť":"&Tcaron;","Ţ":"&Tcedil;","Т":"&Tcy;","𝔗":"&Tfr;","∴":"&therefore;","Θ":"&Theta;","  ":"&ThickSpace;"," ":"&thinsp;","∼":"&thksim;","≃":"&simeq;","≅":"&cong;","≈":"&thkap;","𝕋":"&Topf;","⃛":"&tdot;","𝒯":"&Tscr;","Ŧ":"&Tstrok;","Ú":"&Uacute;","↟":"&Uarr;","⥉":"&Uarrocir;","Ў":"&Ubrcy;","Ŭ":"&Ubreve;","Û":"&Ucirc;","У":"&Ucy;","Ű":"&Udblac;","𝔘":"&Ufr;","Ù":"&Ugrave;","Ū":"&Umacr;",_:"&lowbar;","⏟":"&UnderBrace;","⎵":"&bbrk;","⏝":"&UnderParenthesis;","⋃":"&xcup;","⊎":"&uplus;","Ų":"&Uogon;","𝕌":"&Uopf;","⤒":"&UpArrowBar;","⇅":"&udarr;","↕":"&varr;","⥮":"&udhar;","⊥":"&perp;","↥":"&mapstoup;","↖":"&nwarrow;","↗":"&nearrow;","ϒ":"&upsih;","Υ":"&Upsilon;","Ů":"&Uring;","𝒰":"&Uscr;","Ũ":"&Utilde;","Ü":"&Uuml;","⊫":"&VDash;","⫫":"&Vbar;","В":"&Vcy;","⊩":"&Vdash;","⫦":"&Vdashl;","⋁":"&xvee;","‖":"&Vert;","∣":"&smid;","|":"&vert;","❘":"&VerticalSeparator;","≀":"&wreath;"," ":"&hairsp;","𝔙":"&Vfr;","𝕍":"&Vopf;","𝒱":"&Vscr;","⊪":"&Vvdash;","Ŵ":"&Wcirc;","⋀":"&xwedge;","𝔚":"&Wfr;","𝕎":"&Wopf;","𝒲":"&Wscr;","𝔛":"&Xfr;","Ξ":"&Xi;","𝕏":"&Xopf;","𝒳":"&Xscr;","Я":"&YAcy;","Ї":"&YIcy;","Ю":"&YUcy;","Ý":"&Yacute;","Ŷ":"&Ycirc;","Ы":"&Ycy;","𝔜":"&Yfr;","𝕐":"&Yopf;","𝒴":"&Yscr;","Ÿ":"&Yuml;","Ж":"&ZHcy;","Ź":"&Zacute;","Ž":"&Zcaron;","З":"&Zcy;","Ż":"&Zdot;","Ζ":"&Zeta;","ℨ":"&zeetrf;","ℤ":"&integers;","𝒵":"&Zscr;","á":"&aacute;","ă":"&abreve;","∾":"&mstpos;","∾̳":"&acE;","∿":"&acd;","â":"&acirc;","а":"&acy;","æ":"&aelig;","𝔞":"&afr;","à":"&agrave;","ℵ":"&aleph;","α":"&alpha;","ā":"&amacr;","⨿":"&amalg;","∧":"&wedge;","⩕":"&andand;","⩜":"&andd;","⩘":"&andslope;","⩚":"&andv;","∠":"&angle;","⦤":"&ange;","∡":"&measuredangle;","⦨":"&angmsdaa;","⦩":"&angmsdab;","⦪":"&angmsdac;","⦫":"&angmsdad;","⦬":"&angmsdae;","⦭":"&angmsdaf;","⦮":"&angmsdag;","⦯":"&angmsdah;","∟":"&angrt;","⊾":"&angrtvb;","⦝":"&angrtvbd;","∢":"&angsph;","⍼":"&angzarr;","ą":"&aogon;","𝕒":"&aopf;","⩰":"&apE;","⩯":"&apacir;","≊":"&approxeq;","≋":"&apid;","'":"&apos;","å":"&aring;","𝒶":"&ascr;","*":"&midast;","ã":"&atilde;","ä":"&auml;","⨑":"&awint;","⫭":"&bNot;","≌":"&bcong;","϶":"&bepsi;","‵":"&bprime;","∽":"&bsim;","⋍":"&bsime;","⊽":"&barvee;","⌅":"&barwedge;","⎶":"&bbrktbrk;","б":"&bcy;","„":"&ldquor;","⦰":"&bemptyv;","β":"&beta;","ℶ":"&beth;","≬":"&twixt;","𝔟":"&bfr;","◯":"&xcirc;","⨀":"&xodot;","⨁":"&xoplus;","⨂":"&xotime;","⨆":"&xsqcup;","★":"&starf;","▽":"&xdtri;","△":"&xutri;","⨄":"&xuplus;","⤍":"&rbarr;","⧫":"&lozf;","▴":"&utrif;","▾":"&dtrif;","◂":"&ltrif;","▸":"&rtrif;","␣":"&blank;","▒":"&blk12;","░":"&blk14;","▓":"&blk34;","█":"&block;","=⃥":"&bne;","≡⃥":"&bnequiv;","⌐":"&bnot;","𝕓":"&bopf;","⋈":"&bowtie;","╗":"&boxDL;","╔":"&boxDR;","╖":"&boxDl;","╓":"&boxDr;","═":"&boxH;","╦":"&boxHD;","╩":"&boxHU;","╤":"&boxHd;","╧":"&boxHu;","╝":"&boxUL;","╚":"&boxUR;","╜":"&boxUl;","╙":"&boxUr;","║":"&boxV;","╬":"&boxVH;","╣":"&boxVL;","╠":"&boxVR;","╫":"&boxVh;","╢":"&boxVl;","╟":"&boxVr;","⧉":"&boxbox;","╕":"&boxdL;","╒":"&boxdR;","┐":"&boxdl;","┌":"&boxdr;","╥":"&boxhD;","╨":"&boxhU;","┬":"&boxhd;","┴":"&boxhu;","⊟":"&minusb;","⊞":"&plusb;","⊠":"&timesb;","╛":"&boxuL;","╘":"&boxuR;","┘":"&boxul;","└":"&boxur;","│":"&boxv;","╪":"&boxvH;","╡":"&boxvL;","╞":"&boxvR;","┼":"&boxvh;","┤":"&boxvl;","├":"&boxvr;","¦":"&brvbar;","𝒷":"&bscr;","⁏":"&bsemi;","\\":"&bsol;","⧅":"&bsolb;","⟈":"&bsolhsub;","•":"&bullet;","⪮":"&bumpE;","ć":"&cacute;","∩":"&cap;","⩄":"&capand;","⩉":"&capbrcup;","⩋":"&capcap;","⩇":"&capcup;","⩀":"&capdot;","∩︀":"&caps;","⁁":"&caret;","⩍":"&ccaps;","č":"&ccaron;","ç":"&ccedil;","ĉ":"&ccirc;","⩌":"&ccups;","⩐":"&ccupssm;","ċ":"&cdot;","⦲":"&cemptyv;","¢":"&cent;","𝔠":"&cfr;","ч":"&chcy;","✓":"&checkmark;","χ":"&chi;","○":"&cir;","⧃":"&cirE;","ˆ":"&circ;","≗":"&cire;","↺":"&olarr;","↻":"&orarr;","Ⓢ":"&oS;","⊛":"&oast;","⊚":"&ocir;","⊝":"&odash;","⨐":"&cirfnint;","⫯":"&cirmid;","⧂":"&cirscir;","♣":"&clubsuit;",":":"&colon;",",":"&comma;","@":"&commat;","∁":"&complement;","⩭":"&congdot;","𝕔":"&copf;","℗":"&copysr;","↵":"&crarr;","✗":"&cross;","𝒸":"&cscr;","⫏":"&csub;","⫑":"&csube;","⫐":"&csup;","⫒":"&csupe;","⋯":"&ctdot;","⤸":"&cudarrl;","⤵":"&cudarrr;","⋞":"&curlyeqprec;","⋟":"&curlyeqsucc;","↶":"&curvearrowleft;","⤽":"&cularrp;","∪":"&cup;","⩈":"&cupbrcap;","⩆":"&cupcap;","⩊":"&cupcup;","⊍":"&cupdot;","⩅":"&cupor;","∪︀":"&cups;","↷":"&curvearrowright;","⤼":"&curarrm;","⋎":"&cuvee;","⋏":"&cuwed;","¤":"&curren;","∱":"&cwint;","⌭":"&cylcty;","⥥":"&dHar;","†":"&dagger;","ℸ":"&daleth;","‐":"&hyphen;","⤏":"&rBarr;","ď":"&dcaron;","д":"&dcy;","⇊":"&downdownarrows;","⩷":"&eDDot;","°":"&deg;","δ":"&delta;","⦱":"&demptyv;","⥿":"&dfisht;","𝔡":"&dfr;","♦":"&diams;","ϝ":"&gammad;","⋲":"&disin;","÷":"&divide;","⋇":"&divonx;","ђ":"&djcy;","⌞":"&llcorner;","⌍":"&dlcrop;",$:"&dollar;","𝕕":"&dopf;","≑":"&eDot;","∸":"&minusd;","∔":"&plusdo;","⊡":"&sdotb;","⌟":"&lrcorner;","⌌":"&drcrop;","𝒹":"&dscr;","ѕ":"&dscy;","⧶":"&dsol;","đ":"&dstrok;","⋱":"&dtdot;","▿":"&triangledown;","⦦":"&dwangle;","џ":"&dzcy;","⟿":"&dzigrarr;","é":"&eacute;","⩮":"&easter;","ě":"&ecaron;","≖":"&eqcirc;","ê":"&ecirc;","≕":"&eqcolon;","э":"&ecy;","ė":"&edot;","≒":"&fallingdotseq;","𝔢":"&efr;","⪚":"&eg;","è":"&egrave;","⪖":"&eqslantgtr;","⪘":"&egsdot;","⪙":"&el;","⏧":"&elinters;","ℓ":"&ell;","⪕":"&eqslantless;","⪗":"&elsdot;","ē":"&emacr;","∅":"&varnothing;"," ":"&emsp13;"," ":"&emsp14;"," ":"&emsp;","ŋ":"&eng;"," ":"&ensp;","ę":"&eogon;","𝕖":"&eopf;","⋕":"&epar;","⧣":"&eparsl;","⩱":"&eplus;","ε":"&epsilon;","ϵ":"&varepsilon;","=":"&equals;","≟":"&questeq;","⩸":"&equivDD;","⧥":"&eqvparsl;","≓":"&risingdotseq;","⥱":"&erarr;","ℯ":"&escr;","η":"&eta;","ð":"&eth;","ë":"&euml;","€":"&euro;","!":"&excl;","ф":"&fcy;","♀":"&female;","ﬃ":"&ffilig;","ﬀ":"&fflig;","ﬄ":"&ffllig;","𝔣":"&ffr;","ﬁ":"&filig;",fj:"&fjlig;","♭":"&flat;","ﬂ":"&fllig;","▱":"&fltns;","ƒ":"&fnof;","𝕗":"&fopf;","⋔":"&pitchfork;","⫙":"&forkv;","⨍":"&fpartint;","½":"&half;","⅓":"&frac13;","¼":"&frac14;","⅕":"&frac15;","⅙":"&frac16;","⅛":"&frac18;","⅔":"&frac23;","⅖":"&frac25;","¾":"&frac34;","⅗":"&frac35;","⅜":"&frac38;","⅘":"&frac45;","⅚":"&frac56;","⅝":"&frac58;","⅞":"&frac78;","⁄":"&frasl;","⌢":"&sfrown;","𝒻":"&fscr;","⪌":"&gtreqqless;","ǵ":"&gacute;","γ":"&gamma;","⪆":"&gtrapprox;","ğ":"&gbreve;","ĝ":"&gcirc;","г":"&gcy;","ġ":"&gdot;","⪩":"&gescc;","⪀":"&gesdot;","⪂":"&gesdoto;","⪄":"&gesdotol;","⋛︀":"&gesl;","⪔":"&gesles;","𝔤":"&gfr;","ℷ":"&gimel;","ѓ":"&gjcy;","⪒":"&glE;","⪥":"&gla;","⪤":"&glj;","≩":"&gneqq;","⪊":"&gnapprox;","⪈":"&gneq;","⋧":"&gnsim;","𝕘":"&gopf;","ℊ":"&gscr;","⪎":"&gsime;","⪐":"&gsiml;","⪧":"&gtcc;","⩺":"&gtcir;","⋗":"&gtrdot;","⦕":"&gtlPar;","⩼":"&gtquest;","⥸":"&gtrarr;","≩︀":"&gvnE;","ъ":"&hardcy;","⥈":"&harrcir;","↭":"&leftrightsquigarrow;","ℏ":"&plankv;","ĥ":"&hcirc;","♥":"&heartsuit;","…":"&mldr;","⊹":"&hercon;","𝔥":"&hfr;","⤥":"&searhk;","⤦":"&swarhk;","⇿":"&hoarr;","∻":"&homtht;","↩":"&larrhk;","↪":"&rarrhk;","𝕙":"&hopf;","―":"&horbar;","𝒽":"&hscr;","ħ":"&hstrok;","⁃":"&hybull;","í":"&iacute;","î":"&icirc;","и":"&icy;","е":"&iecy;","¡":"&iexcl;","𝔦":"&ifr;","ì":"&igrave;","⨌":"&qint;","∭":"&tint;","⧜":"&iinfin;","℩":"&iiota;","ĳ":"&ijlig;","ī":"&imacr;","ı":"&inodot;","⊷":"&imof;","Ƶ":"&imped;","℅":"&incare;","∞":"&infin;","⧝":"&infintie;","⊺":"&intercal;","⨗":"&intlarhk;","⨼":"&iprod;","ё":"&iocy;","į":"&iogon;","𝕚":"&iopf;","ι":"&iota;","¿":"&iquest;","𝒾":"&iscr;","⋹":"&isinE;","⋵":"&isindot;","⋴":"&isins;","⋳":"&isinsv;","ĩ":"&itilde;","і":"&iukcy;","ï":"&iuml;","ĵ":"&jcirc;","й":"&jcy;","𝔧":"&jfr;","ȷ":"&jmath;","𝕛":"&jopf;","𝒿":"&jscr;","ј":"&jsercy;","є":"&jukcy;","κ":"&kappa;","ϰ":"&varkappa;","ķ":"&kcedil;","к":"&kcy;","𝔨":"&kfr;","ĸ":"&kgreen;","х":"&khcy;","ќ":"&kjcy;","𝕜":"&kopf;","𝓀":"&kscr;","⤛":"&lAtail;","⤎":"&lBarr;","⪋":"&lesseqqgtr;","⥢":"&lHar;","ĺ":"&lacute;","⦴":"&laemptyv;","λ":"&lambda;","⦑":"&langd;","⪅":"&lessapprox;","«":"&laquo;","⤟":"&larrbfs;","⤝":"&larrfs;","↫":"&looparrowleft;","⤹":"&larrpl;","⥳":"&larrsim;","↢":"&leftarrowtail;","⪫":"&lat;","⤙":"&latail;","⪭":"&late;","⪭︀":"&lates;","⤌":"&lbarr;","❲":"&lbbrk;","{":"&lcub;","[":"&lsqb;","⦋":"&lbrke;","⦏":"&lbrksld;","⦍":"&lbrkslu;","ľ":"&lcaron;","ļ":"&lcedil;","л":"&lcy;","⤶":"&ldca;","⥧":"&ldrdhar;","⥋":"&ldrushar;","↲":"&ldsh;","≤":"&leq;","⇇":"&llarr;","⋋":"&lthree;","⪨":"&lescc;","⩿":"&lesdot;","⪁":"&lesdoto;","⪃":"&lesdotor;","⋚︀":"&lesg;","⪓":"&lesges;","⋖":"&ltdot;","⥼":"&lfisht;","𝔩":"&lfr;","⪑":"&lgE;","⥪":"&lharul;","▄":"&lhblk;","љ":"&ljcy;","⥫":"&llhard;","◺":"&lltri;","ŀ":"&lmidot;","⎰":"&lmoustache;","≨":"&lneqq;","⪉":"&lnapprox;","⪇":"&lneq;","⋦":"&lnsim;","⟬":"&loang;","⇽":"&loarr;","⟼":"&xmap;","↬":"&rarrlp;","⦅":"&lopar;","𝕝":"&lopf;","⨭":"&loplus;","⨴":"&lotimes;","∗":"&lowast;","◊":"&lozenge;","(":"&lpar;","⦓":"&lparlt;","⥭":"&lrhard;","‎":"&lrm;","⊿":"&lrtri;","‹":"&lsaquo;","𝓁":"&lscr;","⪍":"&lsime;","⪏":"&lsimg;","‚":"&sbquo;","ł":"&lstrok;","⪦":"&ltcc;","⩹":"&ltcir;","⋉":"&ltimes;","⥶":"&ltlarr;","⩻":"&ltquest;","⦖":"&ltrPar;","◃":"&triangleleft;","⥊":"&lurdshar;","⥦":"&luruhar;","≨︀":"&lvnE;","∺":"&mDDot;","¯":"&strns;","♂":"&male;","✠":"&maltese;","▮":"&marker;","⨩":"&mcomma;","м":"&mcy;","—":"&mdash;","𝔪":"&mfr;","℧":"&mho;","µ":"&micro;","⫰":"&midcir;","−":"&minus;","⨪":"&minusdu;","⫛":"&mlcp;","⊧":"&models;","𝕞":"&mopf;","𝓂":"&mscr;","μ":"&mu;","⊸":"&mumap;","⋙̸":"&nGg;","≫⃒":"&nGt;","⇍":"&nlArr;","⇎":"&nhArr;","⋘̸":"&nLl;","≪⃒":"&nLt;","⇏":"&nrArr;","⊯":"&nVDash;","⊮":"&nVdash;","ń":"&nacute;","∠⃒":"&nang;","⩰̸":"&napE;","≋̸":"&napid;","ŉ":"&napos;","♮":"&natural;","⩃":"&ncap;","ň":"&ncaron;","ņ":"&ncedil;","⩭̸":"&ncongdot;","⩂":"&ncup;","н":"&ncy;","–":"&ndash;","⇗":"&neArr;","⤤":"&nearhk;","≐̸":"&nedot;","⤨":"&toea;","𝔫":"&nfr;","↮":"&nleftrightarrow;","⫲":"&nhpar;","⋼":"&nis;","⋺":"&nisd;","њ":"&njcy;","≦̸":"&nleqq;","↚":"&nleftarrow;","‥":"&nldr;","𝕟":"&nopf;","¬":"&not;","⋹̸":"&notinE;","⋵̸":"&notindot;","⋷":"&notinvb;","⋶":"&notinvc;","⋾":"&notnivb;","⋽":"&notnivc;","⫽⃥":"&nparsl;","∂̸":"&npart;","⨔":"&npolint;","↛":"&nrightarrow;","⤳̸":"&nrarrc;","↝̸":"&nrarrw;","𝓃":"&nscr;","⊄":"&nsub;","⫅̸":"&nsubseteqq;","⊅":"&nsup;","⫆̸":"&nsupseteqq;","ñ":"&ntilde;","ν":"&nu;","#":"&num;","№":"&numero;"," ":"&numsp;","⊭":"&nvDash;","⤄":"&nvHarr;","≍⃒":"&nvap;","⊬":"&nvdash;","≥⃒":"&nvge;",">⃒":"&nvgt;","⧞":"&nvinfin;","⤂":"&nvlArr;","≤⃒":"&nvle;","<⃒":"&nvlt;","⊴⃒":"&nvltrie;","⤃":"&nvrArr;","⊵⃒":"&nvrtrie;","∼⃒":"&nvsim;","⇖":"&nwArr;","⤣":"&nwarhk;","⤧":"&nwnear;","ó":"&oacute;","ô":"&ocirc;","о":"&ocy;","ő":"&odblac;","⨸":"&odiv;","⦼":"&odsold;","œ":"&oelig;","⦿":"&ofcir;","𝔬":"&ofr;","˛":"&ogon;","ò":"&ograve;","⧁":"&ogt;","⦵":"&ohbar;","⦾":"&olcir;","⦻":"&olcross;","⧀":"&olt;","ō":"&omacr;","ω":"&omega;","ο":"&omicron;","⦶":"&omid;","𝕠":"&oopf;","⦷":"&opar;","⦹":"&operp;","∨":"&vee;","⩝":"&ord;","ℴ":"&oscr;","ª":"&ordf;","º":"&ordm;","⊶":"&origof;","⩖":"&oror;","⩗":"&orslope;","⩛":"&orv;","ø":"&oslash;","⊘":"&osol;","õ":"&otilde;","⨶":"&otimesas;","ö":"&ouml;","⌽":"&ovbar;","¶":"&para;","⫳":"&parsim;","⫽":"&parsl;","п":"&pcy;","%":"&percnt;",".":"&period;","‰":"&permil;","‱":"&pertenk;","𝔭":"&pfr;","φ":"&phi;","ϕ":"&varphi;","☎":"&phone;","π":"&pi;","ϖ":"&varpi;","ℎ":"&planckh;","+":"&plus;","⨣":"&plusacir;","⨢":"&pluscir;","⨥":"&plusdu;","⩲":"&pluse;","⨦":"&plussim;","⨧":"&plustwo;","⨕":"&pointint;","𝕡":"&popf;","£":"&pound;","⪳":"&prE;","⪷":"&precapprox;","⪹":"&prnap;","⪵":"&prnE;","⋨":"&prnsim;","′":"&prime;","⌮":"&profalar;","⌒":"&profline;","⌓":"&profsurf;","⊰":"&prurel;","𝓅":"&pscr;","ψ":"&psi;"," ":"&puncsp;","𝔮":"&qfr;","𝕢":"&qopf;","⁗":"&qprime;","𝓆":"&qscr;","⨖":"&quatint;","?":"&quest;","⤜":"&rAtail;","⥤":"&rHar;","∽̱":"&race;","ŕ":"&racute;","⦳":"&raemptyv;","⦒":"&rangd;","⦥":"&range;","»":"&raquo;","⥵":"&rarrap;","⤠":"&rarrbfs;","⤳":"&rarrc;","⤞":"&rarrfs;","⥅":"&rarrpl;","⥴":"&rarrsim;","↣":"&rightarrowtail;","↝":"&rightsquigarrow;","⤚":"&ratail;","∶":"&ratio;","❳":"&rbbrk;","}":"&rcub;","]":"&rsqb;","⦌":"&rbrke;","⦎":"&rbrksld;","⦐":"&rbrkslu;","ř":"&rcaron;","ŗ":"&rcedil;","р":"&rcy;","⤷":"&rdca;","⥩":"&rdldhar;","↳":"&rdsh;","▭":"&rect;","⥽":"&rfisht;","𝔯":"&rfr;","⥬":"&rharul;","ρ":"&rho;","ϱ":"&varrho;","⇉":"&rrarr;","⋌":"&rthree;","˚":"&ring;","‏":"&rlm;","⎱":"&rmoustache;","⫮":"&rnmid;","⟭":"&roang;","⇾":"&roarr;","⦆":"&ropar;","𝕣":"&ropf;","⨮":"&roplus;","⨵":"&rotimes;",")":"&rpar;","⦔":"&rpargt;","⨒":"&rppolint;","›":"&rsaquo;","𝓇":"&rscr;","⋊":"&rtimes;","▹":"&triangleright;","⧎":"&rtriltri;","⥨":"&ruluhar;","℞":"&rx;","ś":"&sacute;","⪴":"&scE;","⪸":"&succapprox;","š":"&scaron;","ş":"&scedil;","ŝ":"&scirc;","⪶":"&succneqq;","⪺":"&succnapprox;","⋩":"&succnsim;","⨓":"&scpolint;","с":"&scy;","⋅":"&sdot;","⩦":"&sdote;","⇘":"&seArr;","§":"&sect;",";":"&semi;","⤩":"&tosa;","✶":"&sext;","𝔰":"&sfr;","♯":"&sharp;","щ":"&shchcy;","ш":"&shcy;","­":"&shy;","σ":"&sigma;","ς":"&varsigma;","⩪":"&simdot;","⪞":"&simg;","⪠":"&simgE;","⪝":"&siml;","⪟":"&simlE;","≆":"&simne;","⨤":"&simplus;","⥲":"&simrarr;","⨳":"&smashp;","⧤":"&smeparsl;","⌣":"&ssmile;","⪪":"&smt;","⪬":"&smte;","⪬︀":"&smtes;","ь":"&softcy;","/":"&sol;","⧄":"&solb;","⌿":"&solbar;","𝕤":"&sopf;","♠":"&spadesuit;","⊓︀":"&sqcaps;","⊔︀":"&sqcups;","𝓈":"&sscr;","☆":"&star;","⊂":"&subset;","⫅":"&subseteqq;","⪽":"&subdot;","⫃":"&subedot;","⫁":"&submult;","⫋":"&subsetneqq;","⊊":"&subsetneq;","⪿":"&subplus;","⥹":"&subrarr;","⫇":"&subsim;","⫕":"&subsub;","⫓":"&subsup;","♪":"&sung;","¹":"&sup1;","²":"&sup2;","³":"&sup3;","⫆":"&supseteqq;","⪾":"&supdot;","⫘":"&supdsub;","⫄":"&supedot;","⟉":"&suphsol;","⫗":"&suphsub;","⥻":"&suplarr;","⫂":"&supmult;","⫌":"&supsetneqq;","⊋":"&supsetneq;","⫀":"&supplus;","⫈":"&supsim;","⫔":"&supsub;","⫖":"&supsup;","⇙":"&swArr;","⤪":"&swnwar;","ß":"&szlig;","⌖":"&target;","τ":"&tau;","ť":"&tcaron;","ţ":"&tcedil;","т":"&tcy;","⌕":"&telrec;","𝔱":"&tfr;","θ":"&theta;","ϑ":"&vartheta;","þ":"&thorn;","×":"&times;","⨱":"&timesbar;","⨰":"&timesd;","⌶":"&topbot;","⫱":"&topcir;","𝕥":"&topf;","⫚":"&topfork;","‴":"&tprime;","▵":"&utri;","≜":"&trie;","◬":"&tridot;","⨺":"&triminus;","⨹":"&triplus;","⧍":"&trisb;","⨻":"&tritime;","⏢":"&trpezium;","𝓉":"&tscr;","ц":"&tscy;","ћ":"&tshcy;","ŧ":"&tstrok;","⥣":"&uHar;","ú":"&uacute;","ў":"&ubrcy;","ŭ":"&ubreve;","û":"&ucirc;","у":"&ucy;","ű":"&udblac;","⥾":"&ufisht;","𝔲":"&ufr;","ù":"&ugrave;","▀":"&uhblk;","⌜":"&ulcorner;","⌏":"&ulcrop;","◸":"&ultri;","ū":"&umacr;","ų":"&uogon;","𝕦":"&uopf;","υ":"&upsilon;","⇈":"&uuarr;","⌝":"&urcorner;","⌎":"&urcrop;","ů":"&uring;","◹":"&urtri;","𝓊":"&uscr;","⋰":"&utdot;","ũ":"&utilde;","ü":"&uuml;","⦧":"&uwangle;","⫨":"&vBar;","⫩":"&vBarv;","⦜":"&vangrt;","⊊︀":"&vsubne;","⫋︀":"&vsubnE;","⊋︀":"&vsupne;","⫌︀":"&vsupnE;","в":"&vcy;","⊻":"&veebar;","≚":"&veeeq;","⋮":"&vellip;","𝔳":"&vfr;","𝕧":"&vopf;","𝓋":"&vscr;","⦚":"&vzigzag;","ŵ":"&wcirc;","⩟":"&wedbar;","≙":"&wedgeq;","℘":"&wp;","𝔴":"&wfr;","𝕨":"&wopf;","𝓌":"&wscr;","𝔵":"&xfr;","ξ":"&xi;","⋻":"&xnis;","𝕩":"&xopf;","𝓍":"&xscr;","ý":"&yacute;","я":"&yacy;","ŷ":"&ycirc;","ы":"&ycy;","¥":"&yen;","𝔶":"&yfr;","ї":"&yicy;","𝕪":"&yopf;","𝓎":"&yscr;","ю":"&yucy;","ÿ":"&yuml;","ź":"&zacute;","ž":"&zcaron;","з":"&zcy;","ż":"&zdot;","ζ":"&zeta;","𝔷":"&zfr;","ж":"&zhcy;","⇝":"&zigrarr;","𝕫":"&zopf;","𝓏":"&zscr;","‍":"&zwj;","‌":"&zwnj;"}}};
//# sourceMappingURL=./named-references.js.map

/***/ }),

/***/ "./node_modules/html-entities/lib/numeric-unicode-map.js":
/*!***************************************************************!*\
  !*** ./node_modules/html-entities/lib/numeric-unicode-map.js ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";
Object.defineProperty(exports, "__esModule", ({value:true}));exports.numericUnicodeMap={0:65533,128:8364,130:8218,131:402,132:8222,133:8230,134:8224,135:8225,136:710,137:8240,138:352,139:8249,140:338,142:381,145:8216,146:8217,147:8220,148:8221,149:8226,150:8211,151:8212,152:732,153:8482,154:353,155:8250,156:339,158:382,159:376};
//# sourceMappingURL=./numeric-unicode-map.js.map

/***/ }),

/***/ "./node_modules/html-entities/lib/surrogate-pairs.js":
/*!***********************************************************!*\
  !*** ./node_modules/html-entities/lib/surrogate-pairs.js ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";
Object.defineProperty(exports, "__esModule", ({value:true}));exports.fromCodePoint=String.fromCodePoint||function(astralCodePoint){return String.fromCharCode(Math.floor((astralCodePoint-65536)/1024)+55296,(astralCodePoint-65536)%1024+56320)};exports.getCodePoint=String.prototype.codePointAt?function(input,position){return input.codePointAt(position)}:function(input,position){return(input.charCodeAt(position)-55296)*1024+input.charCodeAt(position+1)-56320+65536};exports.highSurrogateFrom=55296;exports.highSurrogateTo=56319;
//# sourceMappingURL=./surrogate-pairs.js.map

/***/ }),

/***/ "./src/styles/index.css":
/*!******************************!*\
  !*** ./src/styles/index.css ***!
  \******************************/
/***/ (() => {

throw new Error("Module build failed (from ./node_modules/mini-css-extract-plugin/dist/loader.js):\nHookWebpackError: Cannot find module '../assets/images/ink-stroke.png'\n    at tryRunOrWebpackError (/workspaces/My-Holst-site/node_modules/webpack/lib/HookWebpackError.js:88:9)\n    at __webpack_require_module__ (/workspaces/My-Holst-site/node_modules/webpack/lib/Compilation.js:5241:12)\n    at __webpack_require__ (/workspaces/My-Holst-site/node_modules/webpack/lib/Compilation.js:5198:18)\n    at Module.<anonymous> (/workspaces/My-Holst-site/node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[1].use[1]!/workspaces/My-Holst-site/node_modules/postcss-loader/dist/cjs.js??ruleSet[1].rules[1].use[2]!/workspaces/My-Holst-site/src/styles/index.css:11:191)\n    at /workspaces/My-Holst-site/node_modules/webpack/lib/javascript/JavascriptModulesPlugin.js:452:10\n    at Hook.eval [as call] (eval at create (/workspaces/My-Holst-site/node_modules/tapable/lib/HookCodeFactory.js:19:10), <anonymous>:7:1)\n    at /workspaces/My-Holst-site/node_modules/webpack/lib/Compilation.js:5243:39\n    at tryRunOrWebpackError (/workspaces/My-Holst-site/node_modules/webpack/lib/HookWebpackError.js:83:7)\n    at __webpack_require_module__ (/workspaces/My-Holst-site/node_modules/webpack/lib/Compilation.js:5241:12)\n    at __webpack_require__ (/workspaces/My-Holst-site/node_modules/webpack/lib/Compilation.js:5198:18)\n-- inner error --\nError: Cannot find module '../assets/images/ink-stroke.png'\n    at webpackMissingModule (/workspaces/My-Holst-site/node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[1].use[1]!/workspaces/My-Holst-site/node_modules/postcss-loader/dist/cjs.js??ruleSet[1].rules[1].use[2]!/workspaces/My-Holst-site/src/styles/base.css:16:113)\n    at Module.<anonymous> (/workspaces/My-Holst-site/node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[1].use[1]!/workspaces/My-Holst-site/node_modules/postcss-loader/dist/cjs.js??ruleSet[1].rules[1].use[2]!/workspaces/My-Holst-site/src/styles/base.css:16:219)\n    at /workspaces/My-Holst-site/node_modules/webpack/lib/javascript/JavascriptModulesPlugin.js:452:10\n    at Hook.eval [as call] (eval at create (/workspaces/My-Holst-site/node_modules/tapable/lib/HookCodeFactory.js:19:10), <anonymous>:7:1)\n    at /workspaces/My-Holst-site/node_modules/webpack/lib/Compilation.js:5243:39\n    at tryRunOrWebpackError (/workspaces/My-Holst-site/node_modules/webpack/lib/HookWebpackError.js:83:7)\n    at __webpack_require_module__ (/workspaces/My-Holst-site/node_modules/webpack/lib/Compilation.js:5241:12)\n    at __webpack_require__ (/workspaces/My-Holst-site/node_modules/webpack/lib/Compilation.js:5198:18)\n    at Module.<anonymous> (/workspaces/My-Holst-site/node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[1].use[1]!/workspaces/My-Holst-site/node_modules/postcss-loader/dist/cjs.js??ruleSet[1].rules[1].use[2]!/workspaces/My-Holst-site/src/styles/index.css:11:191)\n    at /workspaces/My-Holst-site/node_modules/webpack/lib/javascript/JavascriptModulesPlugin.js:452:10\n\nGenerated code for /workspaces/My-Holst-site/node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[1].use[1]!/workspaces/My-Holst-site/node_modules/postcss-loader/dist/cjs.js??ruleSet[1].rules[1].use[2]!/workspaces/My-Holst-site/src/styles/base.css\n  1 | __webpack_require__.r(__webpack_exports__);\n  2 | /* harmony export */ __webpack_require__.d(__webpack_exports__, {\n  3 | /* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n  4 | /* harmony export */ });\n  5 | /* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/sourceMaps.js */ \"/workspaces/My-Holst-site/node_modules/css-loader/dist/runtime/sourceMaps.js\");\n  6 | /* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);\n  7 | /* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/api.js */ \"/workspaces/My-Holst-site/node_modules/css-loader/dist/runtime/api.js\");\n  8 | /* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);\n  9 | /* harmony import */ var _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/getUrl.js */ \"/workspaces/My-Holst-site/node_modules/css-loader/dist/runtime/getUrl.js\");\n 10 | /* harmony import */ var _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2__);\n 11 | // Imports\n 12 | \n 13 | \n 14 | \n 15 | var ___CSS_LOADER_URL_IMPORT_0___ = new URL(/* asset import */ __webpack_require__(/*! ../assets/fonts/Nunito-VariableFont_wght.woff2 */ \"asset/resource|/workspaces/My-Holst-site/src/assets/fonts/Nunito-VariableFont_wght.woff2\"), __webpack_require__.b);\n 16 | var ___CSS_LOADER_URL_IMPORT_1___ = new URL(/* asset import */ Object(function webpackMissingModule() { var e = new Error(\"Cannot find module '../assets/images/ink-stroke.png'\"); e.code = 'MODULE_NOT_FOUND'; throw e; }()), __webpack_require__.b);\n 17 | var ___CSS_LOADER_URL_IMPORT_2___ = new URL(/* asset import */ __webpack_require__(/*! ../assets/icons.svg */ \"asset/resource|/workspaces/My-Holst-site/src/assets/icons.svg\"), __webpack_require__.b);\n 18 | var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));\n 19 | var ___CSS_LOADER_URL_REPLACEMENT_0___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_0___);\n 20 | var ___CSS_LOADER_URL_REPLACEMENT_1___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_1___);\n 21 | var ___CSS_LOADER_URL_REPLACEMENT_2___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_2___, { hash: \"#arrow\" });\n 22 | // Module\n 23 | ___CSS_LOADER_EXPORT___.push([module.id, `@font-face {\n 24 |   font-family: \"Nunito\";\n 25 |   src: url(${___CSS_LOADER_URL_REPLACEMENT_0___})\n 26 |     format(\"woff2-variations\");\n 27 |   /*font-weight: 125 950;\n 28 |     font-stretch: 75% 125%;\n 29 |     font-style: normal;*/\n 30 | }\n 31 | \n 32 | html {\n 33 |   overflow-x: hidden; /*fix devtools adaptive preview scroll bug*/\n 34 | }\n 35 | \n 36 | body {\n 37 |   font-family: \"Nunito\", \"Arial\", sans-serif;\n 38 |   color: var(--black);\n 39 |   background-color: var(--white);\n 40 |   margin: 0;\n 41 |   display: grid;\n 42 |   grid-template-columns:\n 43 |     minmax(16px, 1fr)\n 44 |     minmax(300px, var(--content-width))\n 45 |     minmax(16px, 1fr);\n 46 |   grid-auto-rows: -webkit-min-content;\n 47 |   grid-auto-rows: min-content;\n 48 |   overflow-x: hidden;\n 49 | }\n 50 | \n 51 | .visually-hidden {\n 52 |   position: absolute;\n 53 |   width: 1px;\n 54 |   height: 1px;\n 55 |   margin: -1px;\n 56 |   border: 0;\n 57 |   padding: 0;\n 58 |   white-space: nowrap;\n 59 |   -webkit-clip-path: inset(100%);\n 60 |           clip-path: inset(100%);\n 61 |   clip: rect(0 0 0 0);\n 62 |   overflow: hidden;\n 63 | }\n 64 | \n 65 | .stop-scroll {\n 66 |   overflow-y: hidden;\n 67 | }\n 68 | \n 69 | .preloader {\n 70 |   position: fixed;\n 71 |   display: -webkit-box;\n 72 |   display: -webkit-flex;\n 73 |   display: flex;\n 74 |   -webkit-box-align: center;\n 75 |   -webkit-align-items: center;\n 76 |           align-items: center;\n 77 |   -webkit-box-pack: center;\n 78 |   -webkit-justify-content: center;\n 79 |           justify-content: center;\n 80 |   top: 0;\n 81 |   left: 0;\n 82 |   right: 0;\n 83 |   bottom: 0;\n 84 |   /*width: 100vw;\n 85 |   height: 100vh;*/\n 86 |   background-color: white; /*для ускорения загрузки preloder?*/\n 87 |   z-index: 10;\n 88 |   -webkit-transition: opacity 0.3s ease;\n 89 |   transition: opacity 0.3s ease;\n 90 | }\n 91 | \n 92 | .preloader__logo {\n 93 |   width: 10vh;\n 94 |   height: 10vh;\n 95 |   min-height: 80px;\n 96 |   min-width: 80px;\n 97 |   /* background-image: url(../assets/icons.svg#full-logo); /*logo-img-only  full-logo*/\n 98 |   -webkit-animation: preloader-bounce 3s infinite ease-in-out;\n 99 |           animation: preloader-bounce 3s infinite ease-in-out;\n100 | }\n101 | \n102 | @-webkit-keyframes preloader-bounce {\n103 |   0%,\n104 |   100% {\n105 |     -webkit-transform: scale(1);\n106 |             transform: scale(1);\n107 |   }\n108 | \n109 |   50% {\n110 |     -webkit-transform: scale(0.85);\n111 |             transform: scale(0.85);\n112 |   }\n113 | }\n114 | \n115 | @keyframes preloader-bounce {\n116 |   0%,\n117 |   100% {\n118 |     -webkit-transform: scale(1);\n119 |             transform: scale(1);\n120 |   }\n121 | \n122 |   50% {\n123 |     -webkit-transform: scale(0.85);\n124 |             transform: scale(0.85);\n125 |   }\n126 | }\n127 | \n128 | .preloader_hide {\n129 |   opacity: 0;\n130 | }\n131 | \n132 | picture img {\n133 |   -webkit-animation: 2s infinite pulse;\n134 |           animation: 2s infinite pulse;\n135 | }\n136 | picture[data-loaded] img {\n137 |   -webkit-animation: none 0s ease 0s 1 normal none running;\n138 |           animation: none 0s ease 0s 1 normal none running;\n139 |   -webkit-animation: initial;\n140 |           animation: initial;\n141 | }\n142 | \n143 | @-webkit-keyframes pulse {\n144 |   0% {\n145 |     -webkit-filter: blur(8px) opacity(75%);\n146 |             filter: blur(8px) opacity(75%);\n147 |   }\n148 |   50% {\n149 |     -webkit-filter: blur(8px) opacity(100%);\n150 |             filter: blur(8px) opacity(100%);\n151 |   }\n152 |   100% {\n153 |     -webkit-filter: blur(8px) opacity(75%);\n154 |             filter: blur(8px) opacity(75%);\n155 |   }\n156 | }\n157 | \n158 | @keyframes pulse {\n159 |   0% {\n160 |     -webkit-filter: blur(8px) opacity(75%);\n161 |             filter: blur(8px) opacity(75%);\n162 |   }\n163 |   50% {\n164 |     -webkit-filter: blur(8px) opacity(100%);\n165 |             filter: blur(8px) opacity(100%);\n166 |   }\n167 |   100% {\n168 |     -webkit-filter: blur(8px) opacity(75%);\n169 |             filter: blur(8px) opacity(75%);\n170 |   }\n171 | }\n172 | \n173 | .section-title {\n174 |   width: -webkit-calc(8vw + 216px);\n175 |   width: calc(8vw + 216px);\n176 |   margin-left: auto;\n177 |   margin-right: auto;\n178 |   position: relative;\n179 |   color: var(--white);\n180 |   font-size: var(--fs-xxl) /*clamp(1.5rem, 0.5rem + 2.5vw, 2.25rem)*/;\n181 |   font-weight: 700;\n182 |   line-height: var(--lh-title-bs);\n183 |   margin-top: 0;\n184 |   margin-bottom: var(--section-title-margin);\n185 |   text-align: center;\n186 | }\n187 | \n188 | .section-title::before {\n189 |   position: absolute;\n190 |   z-index: -1;\n191 |   content: \"\";\n192 |   top: -10%;\n193 |   left: -17%;\n194 |   width: 137%;\n195 |   height: 116%;\n196 |   background-image: url(${___CSS_LOADER_URL_REPLACEMENT_1___});\n197 |   background-size: cover;\n198 | }\n199 | \n200 | .page-header,\n201 | .page-footer {\n202 |   max-width: var(--content-width);\n203 |   /* height: 100px;*/\n204 |   padding-top: max(8px, min(2vh, 36px));\n205 |   padding-bottom: max(8px, min(2vh, 36px));\n206 |   grid-column-start: 2;\n207 | }\n208 | \n209 | .page-main {\n210 |   grid-column: span 3;\n211 |   display: grid;\n212 |   grid-template-columns:\n213 |     minmax(16px, 1fr)\n214 |     repeat(2, minmax(150px, -webkit-calc(var(--content-width) / 2)))\n215 |     minmax(16px, 1fr);\n216 |   grid-template-columns:\n217 |     minmax(16px, 1fr)\n218 |     repeat(2, minmax(150px, calc(var(--content-width) / 2)))\n219 |     minmax(16px, 1fr);\n220 |   /*var(--content-width) / 2\n221 |   repeat(2, minmax(min-content, 720px))*/\n222 |   /*justify-items: start;*/\n223 | }\n224 | \n225 | /* todo актуализировать */\n226 | [class*=\"_color_primary\"] {\n227 |   background: var(--primary);\n228 |   -webkit-background-clip: text;\n229 |           background-clip: text;\n230 |   -webkit-text-fill-color: transparent;\n231 | }\n232 | \n233 | a.order-button {\n234 |   display: inline-block;\n235 |   font-size: var(--fs-md) /*clamp(0.5rem, 0.3rem + 1.5vw, 1.25rem)*/;\n236 |   font-weight: 800;\n237 |   text-transform: uppercase;\n238 |   line-height: var(--lh-zero);\n239 |   color: var(--white);\n240 |   padding-left: 2em;\n241 |   padding-right: 2em;\n242 |   padding-top: 1em;\n243 |   padding-bottom: 1em;\n244 |   background: var(--primary);\n245 |   border-radius: 10% / 31%;\n246 | }\n247 | \n248 | a.order-button:hover {\n249 |   background: var(--secondary-light);\n250 | }\n251 | \n252 | .slider-button {\n253 |   /* width: 40px;*/\n254 |   width: var(--round-size);\n255 |   aspect-ratio: 1;\n256 |   background-color: var(--primary-light);\n257 |   -webkit-mask: url(${___CSS_LOADER_URL_REPLACEMENT_2___});\n258 |           mask: url(${___CSS_LOADER_URL_REPLACEMENT_2___});\n259 | \n260 |   padding: 0;\n261 |   border: none;\n262 |   -webkit-transition: background-color 0.3s ease, -webkit-transform 0.3s ease;\n263 |   transition: background-color 0.3s ease, -webkit-transform 0.3s ease;\n264 |   transition: background-color 0.3s ease, transform 0.3s ease;\n265 |   transition: background-color 0.3s ease, transform 0.3s ease, -webkit-transform 0.3s ease;\n266 |   cursor: pointer;\n267 | }\n268 | \n269 | .slider-button:active {\n270 |   -webkit-transform: scale(0.8);\n271 |           transform: scale(0.8);\n272 | }\n273 | \n274 | .slider-button_right {\n275 |   -webkit-transform: rotate(180deg);\n276 |           transform: rotate(180deg);\n277 | }\n278 | \n279 | .slider-button_right:active {\n280 |   -webkit-transform: rotate(180deg) scale(0.8);\n281 |           transform: rotate(180deg) scale(0.8);\n282 | }\n283 | \n284 | .slider-button:hover {\n285 |   background-color: var(--secondary-light);\n286 | }\n287 | \n288 | .animate {\n289 |   opacity: 0;\n290 |   /*transition: opacity 1.9s, transform 1.9s;*/\n291 | }\n292 | \n293 | /*.hide {\n294 |   opacity: 0;\n295 |   /* transition: opacity, transform 0.9s ease;*/\n296 | /*}\n297 | /*\n298 | .translate-left-20 {\n299 |   transform: translateX(-10%);\n300 | }\n301 | \n302 | .translate-right-110 {\n303 |   transform: translateX(110%);\n304 | }\n305 | .translate-up-20 {\n306 |   transform: translateY(-10%);\n307 | }\n308 | .show {\n309 |   opacity: 1;\n310 | }\n311 | \n312 | .js-scroll {\n313 |   opacity: 0;\n314 | }*/\n315 | \n316 | .scrolled-in.show {\n317 |   -webkit-animation: show var(--animation-time) ease-in-out both;\n318 |           animation: show var(--animation-time) ease-in-out both;\n319 | }\n320 | \n321 | @-webkit-keyframes show {\n322 |   from {\n323 |     opacity: 0;\n324 |   }\n325 |   to {\n326 |     opacity: 1;\n327 |   }\n328 | }\n329 | \n330 | @keyframes show {\n331 |   from {\n332 |     opacity: 0;\n333 |   }\n334 |   to {\n335 |     opacity: 1;\n336 |   }\n337 | }\n338 | \n339 | .scrolled-in.show-faster {\n340 |   -webkit-animation: show-faster var(--animation-time) ease-in-out both;\n341 |           animation: show-faster var(--animation-time) ease-in-out both;\n342 | }\n343 | \n344 | @-webkit-keyframes show-faster {\n345 |   0% {\n346 |     opacity: 0;\n347 |   }\n348 |   10% {\n349 |     opacity: 1;\n350 |   }\n351 |   100% {\n352 |     opacity: 1;\n353 |   }\n354 | }\n355 | \n356 | @keyframes show-faster {\n357 |   0% {\n358 |     opacity: 0;\n359 |   }\n360 |   10% {\n361 |     opacity: 1;\n362 |   }\n363 |   100% {\n364 |     opacity: 1;\n365 |   }\n366 | }\n367 | \n368 | .scrolled-in.show-from-up {\n369 |   -webkit-animation: show-from-up var(--animation-time) ease-in-out both;\n370 |           animation: show-from-up var(--animation-time) ease-in-out both;\n371 | }\n372 | \n373 | @-webkit-keyframes show-from-up {\n374 |   from {\n375 |     -webkit-transform: translateY(-10%);\n376 |             transform: translateY(-10%);\n377 |     opacity: 0;\n378 |   }\n379 |   to {\n380 |     -webkit-transform: translateY(0);\n381 |             transform: translateY(0);\n382 |     opacity: 1;\n383 |   }\n384 | }\n385 | \n386 | @keyframes show-from-up {\n387 |   from {\n388 |     -webkit-transform: translateY(-10%);\n389 |             transform: translateY(-10%);\n390 |     opacity: 0;\n391 |   }\n392 |   to {\n393 |     -webkit-transform: translateY(0);\n394 |             transform: translateY(0);\n395 |     opacity: 1;\n396 |   }\n397 | }\n398 | \n399 | .scrolled-in.show-from-left {\n400 |   -webkit-animation: show-from-left var(--animation-time) ease-in-out both;\n401 |           animation: show-from-left var(--animation-time) ease-in-out both;\n402 | }\n403 | \n404 | @-webkit-keyframes show-from-left {\n405 |   from {\n406 |     -webkit-transform: translateX(-10%);\n407 |             transform: translateX(-10%);\n408 |     opacity: 0;\n409 |   }\n410 |   to {\n411 |     -webkit-transform: translateX(0);\n412 |             transform: translateX(0);\n413 |     opacity: 1;\n414 |   }\n415 | }\n416 | \n417 | @keyframes show-from-left {\n418 |   from {\n419 |     -webkit-transform: translateX(-10%);\n420 |             transform: translateX(-10%);\n421 |     opacity: 0;\n422 |   }\n423 |   to {\n424 |     -webkit-transform: translateX(0);\n425 |             transform: translateX(0);\n426 |     opacity: 1;\n427 |   }\n428 | }\n429 | \n430 | .scrolled-in.show-from-right {\n431 |   -webkit-animation: show-from-right var(--animation-time) ease-in-out both;\n432 |           animation: show-from-right var(--animation-time) ease-in-out both;\n433 | }\n434 | \n435 | @-webkit-keyframes show-from-right {\n436 |   from {\n437 |     -webkit-transform: translateX(10%);\n438 |             transform: translateX(10%);\n439 |     opacity: 0;\n440 |   }\n441 |   to {\n442 |     -webkit-transform: translateX(0);\n443 |             transform: translateX(0);\n444 |     opacity: 1;\n445 |   }\n446 | }\n447 | \n448 | @keyframes show-from-right {\n449 |   from {\n450 |     -webkit-transform: translateX(10%);\n451 |             transform: translateX(10%);\n452 |     opacity: 0;\n453 |   }\n454 |   to {\n455 |     -webkit-transform: translateX(0);\n456 |             transform: translateX(0);\n457 |     opacity: 1;\n458 |   }\n459 | }\n460 | \n461 | .scrolled-in.show-from-down {\n462 |   -webkit-animation: show-from-down var(--animation-time) ease-in-out both;\n463 |           animation: show-from-down var(--animation-time) ease-in-out both;\n464 | }\n465 | \n466 | @-webkit-keyframes show-from-down {\n467 |   from {\n468 |     -webkit-transform: translateY(10%);\n469 |             transform: translateY(10%);\n470 |     opacity: 0;\n471 |   }\n472 |   to {\n473 |     -webkit-transform: translateY(0);\n474 |             transform: translateY(0);\n475 |     opacity: 1;\n476 |   }\n477 | }\n478 | \n479 | @keyframes show-from-down {\n480 |   from {\n481 |     -webkit-transform: translateY(10%);\n482 |             transform: translateY(10%);\n483 |     opacity: 0;\n484 |   }\n485 |   to {\n486 |     -webkit-transform: translateY(0);\n487 |             transform: translateY(0);\n488 |     opacity: 1;\n489 |   }\n490 | }\n491 | \n492 | .scrolled-in.roll-from-left {\n493 |   -webkit-animation: roll-from-left var(--animation-time) ease-in-out both;\n494 |           animation: roll-from-left var(--animation-time) ease-in-out both;\n495 | }\n496 | \n497 | @-webkit-keyframes roll-from-left {\n498 |   from {\n499 |     -webkit-transform: translateX(-110%);\n500 |             transform: translateX(-110%);\n501 |     opacity: 0;\n502 |   }\n503 |   to {\n504 |     -webkit-transform: translateX(0);\n505 |             transform: translateX(0);\n506 |     opacity: 1;\n507 |   }\n508 | }\n509 | \n510 | @keyframes roll-from-left {\n511 |   from {\n512 |     -webkit-transform: translateX(-110%);\n513 |             transform: translateX(-110%);\n514 |     opacity: 0;\n515 |   }\n516 |   to {\n517 |     -webkit-transform: translateX(0);\n518 |             transform: translateX(0);\n519 |     opacity: 1;\n520 |   }\n521 | }\n522 | \n523 | .scrolled-in.roll-from-right {\n524 |   -webkit-animation: roll-from-right var(--animation-time) ease-in-out both;\n525 |           animation: roll-from-right var(--animation-time) ease-in-out both;\n526 | }\n527 | \n528 | @-webkit-keyframes roll-from-right {\n529 |   from {\n530 |     -webkit-transform: translateX(110%);\n531 |             transform: translateX(110%);\n532 |     opacity: 0;\n533 |   }\n534 |   to {\n535 |     -webkit-transform: translateX(0);\n536 |             transform: translateX(0);\n537 |     opacity: 1;\n538 |   }\n539 | }\n540 | \n541 | @keyframes roll-from-right {\n542 |   from {\n543 |     -webkit-transform: translateX(110%);\n544 |             transform: translateX(110%);\n545 |     opacity: 0;\n546 |   }\n547 |   to {\n548 |     -webkit-transform: translateX(0);\n549 |             transform: translateX(0);\n550 |     opacity: 1;\n551 |   }\n552 | }\n553 | \n554 | .scrolled-in.show-zoom-in {\n555 |   -webkit-animation: show-zoom-in var(--animation-time) ease-in-out both;\n556 |           animation: show-zoom-in var(--animation-time) ease-in-out both;\n557 | }\n558 | \n559 | @-webkit-keyframes show-zoom-in {\n560 |   from {\n561 |     -webkit-transform: scale(0.9);\n562 |             transform: scale(0.9);\n563 |     opacity: 0;\n564 |   }\n565 |   to {\n566 |     -webkit-transform: scale(1);\n567 |             transform: scale(1);\n568 |     opacity: 1;\n569 |   }\n570 | }\n571 | \n572 | @keyframes show-zoom-in {\n573 |   from {\n574 |     -webkit-transform: scale(0.9);\n575 |             transform: scale(0.9);\n576 |     opacity: 0;\n577 |   }\n578 |   to {\n579 |     -webkit-transform: scale(1);\n580 |             transform: scale(1);\n581 |     opacity: 1;\n582 |   }\n583 | }\n584 | \n585 | .scrolled-in.zoom-in {\n586 |   -webkit-animation: zoom-in var(--animation-time) ease-in-out both;\n587 |           animation: zoom-in var(--animation-time) ease-in-out both;\n588 | }\n589 | \n590 | @-webkit-keyframes zoom-in {\n591 |   0% {\n592 |     -webkit-transform: scale(0.9);\n593 |             transform: scale(0.9);\n594 |     opacity: 1;\n595 |   }\n596 | \n597 |   100% {\n598 |     -webkit-transform: scale(1);\n599 |             transform: scale(1);\n600 |     opacity: 1;\n601 |   }\n602 | }\n603 | \n604 | @keyframes zoom-in {\n605 |   0% {\n606 |     -webkit-transform: scale(0.9);\n607 |             transform: scale(0.9);\n608 |     opacity: 1;\n609 |   }\n610 | \n611 |   100% {\n612 |     -webkit-transform: scale(1);\n613 |             transform: scale(1);\n614 |     opacity: 1;\n615 |   }\n616 | }\n617 | `, \"\",{\"version\":3,\"sources\":[\"webpack://./src/styles/base.css\"],\"names\":[],\"mappings\":\"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\",\"sourcesContent\":[\"@font-face {\\n  font-family: \\\"Nunito\\\";\\n  src: url(\\\"../assets/fonts/Nunito-VariableFont_wght.woff2\\\")\\n    format(\\\"woff2-variations\\\");\\n  /*font-weight: 125 950;\\n    font-stretch: 75% 125%;\\n    font-style: normal;*/\\n}\\n\\nhtml {\\n  overflow-x: hidden; /*fix devtools adaptive preview scroll bug*/\\n}\\n\\nbody {\\n  font-family: \\\"Nunito\\\", \\\"Arial\\\", sans-serif;\\n  color: var(--black);\\n  background-color: var(--white);\\n  margin: 0;\\n  display: grid;\\n  grid-template-columns:\\n    minmax(16px, 1fr)\\n    minmax(300px, var(--content-width))\\n    minmax(16px, 1fr);\\n  grid-auto-rows: min-content;\\n  overflow-x: hidden;\\n}\\n\\n.visually-hidden {\\n  position: absolute;\\n  width: 1px;\\n  height: 1px;\\n  margin: -1px;\\n  border: 0;\\n  padding: 0;\\n  white-space: nowrap;\\n  clip-path: inset(100%);\\n  clip: rect(0 0 0 0);\\n  overflow: hidden;\\n}\\n\\n.stop-scroll {\\n  overflow-y: hidden;\\n}\\n\\n.preloader {\\n  position: fixed;\\n  display: flex;\\n  align-items: center;\\n  justify-content: center;\\n  top: 0;\\n  left: 0;\\n  right: 0;\\n  bottom: 0;\\n  /*width: 100vw;\\n  height: 100vh;*/\\n  background-color: white; /*для ускорения загрузки preloder?*/\\n  z-index: 10;\\n  transition: opacity 0.3s ease;\\n}\\n\\n.preloader__logo {\\n  width: 10vh;\\n  height: 10vh;\\n  min-height: 80px;\\n  min-width: 80px;\\n  /* background-image: url(../assets/icons.svg#full-logo); /*logo-img-only  full-logo*/\\n  animation: preloader-bounce 3s infinite ease-in-out;\\n}\\n\\n@keyframes preloader-bounce {\\n  0%,\\n  100% {\\n    transform: scale(1);\\n  }\\n\\n  50% {\\n    transform: scale(0.85);\\n  }\\n}\\n\\n.preloader_hide {\\n  opacity: 0;\\n}\\n\\npicture img {\\n  animation: 2s infinite pulse;\\n}\\npicture[data-loaded] img {\\n  animation: unset;\\n}\\n\\n@keyframes pulse {\\n  0% {\\n    filter: blur(8px) opacity(75%);\\n  }\\n  50% {\\n    filter: blur(8px) opacity(100%);\\n  }\\n  100% {\\n    filter: blur(8px) opacity(75%);\\n  }\\n}\\n\\n.section-title {\\n  width: calc(8vw + 216px);\\n  margin-inline: auto;\\n  position: relative;\\n  color: var(--white);\\n  font-size: var(--fs-xxl) /*clamp(1.5rem, 0.5rem + 2.5vw, 2.25rem)*/;\\n  font-weight: 700;\\n  line-height: var(--lh-title-bs);\\n  margin-block: 0 var(--section-title-margin);\\n  text-align: center;\\n}\\n\\n.section-title::before {\\n  position: absolute;\\n  z-index: -1;\\n  content: \\\"\\\";\\n  top: -10%;\\n  left: -17%;\\n  width: 137%;\\n  height: 116%;\\n  background-image: url(../assets/images/ink-stroke.png);\\n  background-size: cover;\\n}\\n\\n.page-header,\\n.page-footer {\\n  max-width: var(--content-width);\\n  /* height: 100px;*/\\n  padding-block: clamp(8px, 2vh, 36px);\\n  grid-column-start: 2;\\n}\\n\\n.page-main {\\n  grid-column: span 3;\\n  display: grid;\\n  grid-template-columns:\\n    minmax(16px, 1fr)\\n    repeat(2, minmax(150px, calc(var(--content-width) / 2)))\\n    minmax(16px, 1fr);\\n  /*var(--content-width) / 2\\n  repeat(2, minmax(min-content, 720px))*/\\n  /*justify-items: start;*/\\n}\\n\\n/* todo актуализировать */\\n[class*=\\\"_color_primary\\\"] {\\n  background: var(--primary);\\n  background-clip: text;\\n  -webkit-text-fill-color: transparent;\\n}\\n\\na.order-button {\\n  display: inline-block;\\n  font-size: var(--fs-md) /*clamp(0.5rem, 0.3rem + 1.5vw, 1.25rem)*/;\\n  font-weight: 800;\\n  text-transform: uppercase;\\n  line-height: var(--lh-zero);\\n  color: var(--white);\\n  padding-inline: 2em;\\n  padding-block: 1em;\\n  background: var(--primary);\\n  border-radius: 10% / 31%;\\n}\\n\\na.order-button:hover {\\n  background: var(--secondary-light);\\n}\\n\\n.slider-button {\\n  /* width: 40px;*/\\n  width: var(--round-size);\\n  aspect-ratio: 1;\\n  background-color: var(--primary-light);\\n  mask: url(../assets/icons.svg#arrow);\\n\\n  padding: 0;\\n  border: none;\\n  transition: background-color 0.3s ease, transform 0.3s ease;\\n  cursor: pointer;\\n}\\n\\n.slider-button:active {\\n  transform: scale(0.8);\\n}\\n\\n.slider-button_right {\\n  transform: rotate(180deg);\\n}\\n\\n.slider-button_right:active {\\n  transform: rotate(180deg) scale(0.8);\\n}\\n\\n.slider-button:hover {\\n  background-color: var(--secondary-light);\\n}\\n\\n.animate {\\n  opacity: 0;\\n  /*transition: opacity 1.9s, transform 1.9s;*/\\n}\\n\\n/*.hide {\\n  opacity: 0;\\n  /* transition: opacity, transform 0.9s ease;*/\\n/*}\\n/*\\n.translate-left-20 {\\n  transform: translateX(-10%);\\n}\\n\\n.translate-right-110 {\\n  transform: translateX(110%);\\n}\\n.translate-up-20 {\\n  transform: translateY(-10%);\\n}\\n.show {\\n  opacity: 1;\\n}\\n\\n.js-scroll {\\n  opacity: 0;\\n}*/\\n\\n.scrolled-in.show {\\n  animation: show var(--animation-time) ease-in-out both;\\n}\\n\\n@keyframes show {\\n  from {\\n    opacity: 0;\\n  }\\n  to {\\n    opacity: 1;\\n  }\\n}\\n\\n.scrolled-in.show-faster {\\n  animation: show-faster var(--animation-time) ease-in-out both;\\n}\\n\\n@keyframes show-faster {\\n  0% {\\n    opacity: 0;\\n  }\\n  10% {\\n    opacity: 1;\\n  }\\n  100% {\\n    opacity: 1;\\n  }\\n}\\n\\n.scrolled-in.show-from-up {\\n  animation: show-from-up var(--animation-time) ease-in-out both;\\n}\\n\\n@keyframes show-from-up {\\n  from {\\n    transform: translateY(-10%);\\n    opacity: 0;\\n  }\\n  to {\\n    transform: translateY(0);\\n    opacity: 1;\\n  }\\n}\\n\\n.scrolled-in.show-from-left {\\n  animation: show-from-left var(--animation-time) ease-in-out both;\\n}\\n\\n@keyframes show-from-left {\\n  from {\\n    transform: translateX(-10%);\\n    opacity: 0;\\n  }\\n  to {\\n    transform: translateX(0);\\n    opacity: 1;\\n  }\\n}\\n\\n.scrolled-in.show-from-right {\\n  animation: show-from-right var(--animation-time) ease-in-out both;\\n}\\n\\n@keyframes show-from-right {\\n  from {\\n    transform: translateX(10%);\\n    opacity: 0;\\n  }\\n  to {\\n    transform: translateX(0);\\n    opacity: 1;\\n  }\\n}\\n\\n.scrolled-in.show-from-down {\\n  animation: show-from-down var(--animation-time) ease-in-out both;\\n}\\n\\n@keyframes show-from-down {\\n  from {\\n    transform: translateY(10%);\\n    opacity: 0;\\n  }\\n  to {\\n    transform: translateY(0);\\n    opacity: 1;\\n  }\\n}\\n\\n.scrolled-in.roll-from-left {\\n  animation: roll-from-left var(--animation-time) ease-in-out both;\\n}\\n\\n@keyframes roll-from-left {\\n  from {\\n    transform: translateX(-110%);\\n    opacity: 0;\\n  }\\n  to {\\n    transform: translateX(0);\\n    opacity: 1;\\n  }\\n}\\n\\n.scrolled-in.roll-from-right {\\n  animation: roll-from-right var(--animation-time) ease-in-out both;\\n}\\n\\n@keyframes roll-from-right {\\n  from {\\n    transform: translateX(110%);\\n    opacity: 0;\\n  }\\n  to {\\n    transform: translateX(0);\\n    opacity: 1;\\n  }\\n}\\n\\n.scrolled-in.show-zoom-in {\\n  animation: show-zoom-in var(--animation-time) ease-in-out both;\\n}\\n\\n@keyframes show-zoom-in {\\n  from {\\n    transform: scale(0.9);\\n    opacity: 0;\\n  }\\n  to {\\n    transform: scale(1);\\n    opacity: 1;\\n  }\\n}\\n\\n.scrolled-in.zoom-in {\\n  animation: zoom-in var(--animation-time) ease-in-out both;\\n}\\n\\n@keyframes zoom-in {\\n  0% {\\n    transform: scale(0.9);\\n    opacity: 1;\\n  }\\n\\n  100% {\\n    transform: scale(1);\\n    opacity: 1;\\n  }\\n}\\n\"],\"sourceRoot\":\"\"}]);\n618 | // Exports\n619 | /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);\n620 | \n\nGenerated code for /workspaces/My-Holst-site/node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[1].use[1]!/workspaces/My-Holst-site/node_modules/postcss-loader/dist/cjs.js??ruleSet[1].rules[1].use[2]!/workspaces/My-Holst-site/src/styles/index.css\n 1 | __webpack_require__.r(__webpack_exports__);\n 2 | /* harmony export */ __webpack_require__.d(__webpack_exports__, {\n 3 | /* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n 4 | /* harmony export */ });\n 5 | /* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/sourceMaps.js */ \"/workspaces/My-Holst-site/node_modules/css-loader/dist/runtime/sourceMaps.js\");\n 6 | /* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);\n 7 | /* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/api.js */ \"/workspaces/My-Holst-site/node_modules/css-loader/dist/runtime/api.js\");\n 8 | /* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);\n 9 | /* harmony import */ var _node_modules_css_loader_dist_cjs_js_ruleSet_1_rules_1_use_1_node_modules_postcss_loader_dist_cjs_js_ruleSet_1_rules_1_use_2_normalize_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! -!../../node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[1].use[1]!../../node_modules/postcss-loader/dist/cjs.js??ruleSet[1].rules[1].use[2]!./normalize.css */ \"/workspaces/My-Holst-site/node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[1].use[1]!/workspaces/My-Holst-site/node_modules/postcss-loader/dist/cjs.js??ruleSet[1].rules[1].use[2]!/workspaces/My-Holst-site/src/styles/normalize.css\");\n10 | /* harmony import */ var _node_modules_css_loader_dist_cjs_js_ruleSet_1_rules_1_use_1_node_modules_postcss_loader_dist_cjs_js_ruleSet_1_rules_1_use_2_variables_css__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! -!../../node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[1].use[1]!../../node_modules/postcss-loader/dist/cjs.js??ruleSet[1].rules[1].use[2]!./variables.css */ \"/workspaces/My-Holst-site/node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[1].use[1]!/workspaces/My-Holst-site/node_modules/postcss-loader/dist/cjs.js??ruleSet[1].rules[1].use[2]!/workspaces/My-Holst-site/src/styles/variables.css\");\n11 | /* harmony import */ var _node_modules_css_loader_dist_cjs_js_ruleSet_1_rules_1_use_1_node_modules_postcss_loader_dist_cjs_js_ruleSet_1_rules_1_use_2_base_css__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! -!../../node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[1].use[1]!../../node_modules/postcss-loader/dist/cjs.js??ruleSet[1].rules[1].use[2]!./base.css */ \"/workspaces/My-Holst-site/node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[1].use[1]!/workspaces/My-Holst-site/node_modules/postcss-loader/dist/cjs.js??ruleSet[1].rules[1].use[2]!/workspaces/My-Holst-site/src/styles/base.css\");\n12 | /* harmony import */ var _node_modules_css_loader_dist_cjs_js_ruleSet_1_rules_1_use_1_node_modules_postcss_loader_dist_cjs_js_ruleSet_1_rules_1_use_2_header_css__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! -!../../node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[1].use[1]!../../node_modules/postcss-loader/dist/cjs.js??ruleSet[1].rules[1].use[2]!./header.css */ \"/workspaces/My-Holst-site/node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[1].use[1]!/workspaces/My-Holst-site/node_modules/postcss-loader/dist/cjs.js??ruleSet[1].rules[1].use[2]!/workspaces/My-Holst-site/src/styles/header.css\");\n13 | /* harmony import */ var _node_modules_css_loader_dist_cjs_js_ruleSet_1_rules_1_use_1_node_modules_postcss_loader_dist_cjs_js_ruleSet_1_rules_1_use_2_hero_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! -!../../node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[1].use[1]!../../node_modules/postcss-loader/dist/cjs.js??ruleSet[1].rules[1].use[2]!./hero.css */ \"/workspaces/My-Holst-site/node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[1].use[1]!/workspaces/My-Holst-site/node_modules/postcss-loader/dist/cjs.js??ruleSet[1].rules[1].use[2]!/workspaces/My-Holst-site/src/styles/hero.css\");\n14 | /* harmony import */ var _node_modules_css_loader_dist_cjs_js_ruleSet_1_rules_1_use_1_node_modules_postcss_loader_dist_cjs_js_ruleSet_1_rules_1_use_2_advantages_css__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! -!../../node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[1].use[1]!../../node_modules/postcss-loader/dist/cjs.js??ruleSet[1].rules[1].use[2]!./advantages.css */ \"/workspaces/My-Holst-site/node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[1].use[1]!/workspaces/My-Holst-site/node_modules/postcss-loader/dist/cjs.js??ruleSet[1].rules[1].use[2]!/workspaces/My-Holst-site/src/styles/advantages.css\");\n15 | /* harmony import */ var _node_modules_css_loader_dist_cjs_js_ruleSet_1_rules_1_use_1_node_modules_postcss_loader_dist_cjs_js_ruleSet_1_rules_1_use_2_steps_css__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! -!../../node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[1].use[1]!../../node_modules/postcss-loader/dist/cjs.js??ruleSet[1].rules[1].use[2]!./steps.css */ \"/workspaces/My-Holst-site/node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[1].use[1]!/workspaces/My-Holst-site/node_modules/postcss-loader/dist/cjs.js??ruleSet[1].rules[1].use[2]!/workspaces/My-Holst-site/src/styles/steps.css\");\n16 | /* harmony import */ var _node_modules_css_loader_dist_cjs_js_ruleSet_1_rules_1_use_1_node_modules_postcss_loader_dist_cjs_js_ruleSet_1_rules_1_use_2_popular_sizes_css__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! -!../../node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[1].use[1]!../../node_modules/postcss-loader/dist/cjs.js??ruleSet[1].rules[1].use[2]!./popular-sizes.css */ \"/workspaces/My-Holst-site/node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[1].use[1]!/workspaces/My-Holst-site/node_modules/postcss-loader/dist/cjs.js??ruleSet[1].rules[1].use[2]!/workspaces/My-Holst-site/src/styles/popular-sizes.css\");\n17 | /* harmony import */ var _node_modules_css_loader_dist_cjs_js_ruleSet_1_rules_1_use_1_node_modules_postcss_loader_dist_cjs_js_ruleSet_1_rules_1_use_2_works_css__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! -!../../node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[1].use[1]!../../node_modules/postcss-loader/dist/cjs.js??ruleSet[1].rules[1].use[2]!./works.css */ \"/workspaces/My-Holst-site/node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[1].use[1]!/workspaces/My-Holst-site/node_modules/postcss-loader/dist/cjs.js??ruleSet[1].rules[1].use[2]!/workspaces/My-Holst-site/src/styles/works.css\");\n18 | /* harmony import */ var _node_modules_css_loader_dist_cjs_js_ruleSet_1_rules_1_use_1_node_modules_postcss_loader_dist_cjs_js_ruleSet_1_rules_1_use_2_feedback_css__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! -!../../node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[1].use[1]!../../node_modules/postcss-loader/dist/cjs.js??ruleSet[1].rules[1].use[2]!./feedback.css */ \"/workspaces/My-Holst-site/node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[1].use[1]!/workspaces/My-Holst-site/node_modules/postcss-loader/dist/cjs.js??ruleSet[1].rules[1].use[2]!/workspaces/My-Holst-site/src/styles/feedback.css\");\n19 | /* harmony import */ var _node_modules_css_loader_dist_cjs_js_ruleSet_1_rules_1_use_1_node_modules_postcss_loader_dist_cjs_js_ruleSet_1_rules_1_use_2_contacts_css__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! -!../../node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[1].use[1]!../../node_modules/postcss-loader/dist/cjs.js??ruleSet[1].rules[1].use[2]!./contacts.css */ \"/workspaces/My-Holst-site/node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[1].use[1]!/workspaces/My-Holst-site/node_modules/postcss-loader/dist/cjs.js??ruleSet[1].rules[1].use[2]!/workspaces/My-Holst-site/src/styles/contacts.css\");\n20 | /* harmony import */ var _node_modules_css_loader_dist_cjs_js_ruleSet_1_rules_1_use_1_node_modules_postcss_loader_dist_cjs_js_ruleSet_1_rules_1_use_2_footer_css__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! -!../../node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[1].use[1]!../../node_modules/postcss-loader/dist/cjs.js??ruleSet[1].rules[1].use[2]!./footer.css */ \"/workspaces/My-Holst-site/node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[1].use[1]!/workspaces/My-Holst-site/node_modules/postcss-loader/dist/cjs.js??ruleSet[1].rules[1].use[2]!/workspaces/My-Holst-site/src/styles/footer.css\");\n21 | /* harmony import */ var _node_modules_css_loader_dist_cjs_js_ruleSet_1_rules_1_use_1_node_modules_postcss_loader_dist_cjs_js_ruleSet_1_rules_1_use_2_media_queries_css__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! -!../../node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[1].use[1]!../../node_modules/postcss-loader/dist/cjs.js??ruleSet[1].rules[1].use[2]!./media-queries.css */ \"/workspaces/My-Holst-site/node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[1].use[1]!/workspaces/My-Holst-site/node_modules/postcss-loader/dist/cjs.js??ruleSet[1].rules[1].use[2]!/workspaces/My-Holst-site/src/styles/media-queries.css\");\n22 | // Imports\n23 | \n24 | \n25 | \n26 | \n27 | \n28 | \n29 | \n30 | \n31 | \n32 | \n33 | \n34 | \n35 | \n36 | \n37 | \n38 | var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));\n39 | ___CSS_LOADER_EXPORT___.i(_node_modules_css_loader_dist_cjs_js_ruleSet_1_rules_1_use_1_node_modules_postcss_loader_dist_cjs_js_ruleSet_1_rules_1_use_2_normalize_css__WEBPACK_IMPORTED_MODULE_2__[\"default\"]);\n40 | ___CSS_LOADER_EXPORT___.i(_node_modules_css_loader_dist_cjs_js_ruleSet_1_rules_1_use_1_node_modules_postcss_loader_dist_cjs_js_ruleSet_1_rules_1_use_2_variables_css__WEBPACK_IMPORTED_MODULE_3__[\"default\"]);\n41 | ___CSS_LOADER_EXPORT___.i(_node_modules_css_loader_dist_cjs_js_ruleSet_1_rules_1_use_1_node_modules_postcss_loader_dist_cjs_js_ruleSet_1_rules_1_use_2_base_css__WEBPACK_IMPORTED_MODULE_4__[\"default\"]);\n42 | ___CSS_LOADER_EXPORT___.i(_node_modules_css_loader_dist_cjs_js_ruleSet_1_rules_1_use_1_node_modules_postcss_loader_dist_cjs_js_ruleSet_1_rules_1_use_2_header_css__WEBPACK_IMPORTED_MODULE_5__[\"default\"]);\n43 | ___CSS_LOADER_EXPORT___.i(_node_modules_css_loader_dist_cjs_js_ruleSet_1_rules_1_use_1_node_modules_postcss_loader_dist_cjs_js_ruleSet_1_rules_1_use_2_hero_css__WEBPACK_IMPORTED_MODULE_6__[\"default\"]);\n44 | ___CSS_LOADER_EXPORT___.i(_node_modules_css_loader_dist_cjs_js_ruleSet_1_rules_1_use_1_node_modules_postcss_loader_dist_cjs_js_ruleSet_1_rules_1_use_2_advantages_css__WEBPACK_IMPORTED_MODULE_7__[\"default\"]);\n45 | ___CSS_LOADER_EXPORT___.i(_node_modules_css_loader_dist_cjs_js_ruleSet_1_rules_1_use_1_node_modules_postcss_loader_dist_cjs_js_ruleSet_1_rules_1_use_2_steps_css__WEBPACK_IMPORTED_MODULE_8__[\"default\"]);\n46 | ___CSS_LOADER_EXPORT___.i(_node_modules_css_loader_dist_cjs_js_ruleSet_1_rules_1_use_1_node_modules_postcss_loader_dist_cjs_js_ruleSet_1_rules_1_use_2_popular_sizes_css__WEBPACK_IMPORTED_MODULE_9__[\"default\"]);\n47 | ___CSS_LOADER_EXPORT___.i(_node_modules_css_loader_dist_cjs_js_ruleSet_1_rules_1_use_1_node_modules_postcss_loader_dist_cjs_js_ruleSet_1_rules_1_use_2_works_css__WEBPACK_IMPORTED_MODULE_10__[\"default\"]);\n48 | ___CSS_LOADER_EXPORT___.i(_node_modules_css_loader_dist_cjs_js_ruleSet_1_rules_1_use_1_node_modules_postcss_loader_dist_cjs_js_ruleSet_1_rules_1_use_2_feedback_css__WEBPACK_IMPORTED_MODULE_11__[\"default\"]);\n49 | ___CSS_LOADER_EXPORT___.i(_node_modules_css_loader_dist_cjs_js_ruleSet_1_rules_1_use_1_node_modules_postcss_loader_dist_cjs_js_ruleSet_1_rules_1_use_2_contacts_css__WEBPACK_IMPORTED_MODULE_12__[\"default\"]);\n50 | ___CSS_LOADER_EXPORT___.i(_node_modules_css_loader_dist_cjs_js_ruleSet_1_rules_1_use_1_node_modules_postcss_loader_dist_cjs_js_ruleSet_1_rules_1_use_2_footer_css__WEBPACK_IMPORTED_MODULE_13__[\"default\"]);\n51 | ___CSS_LOADER_EXPORT___.i(_node_modules_css_loader_dist_cjs_js_ruleSet_1_rules_1_use_1_node_modules_postcss_loader_dist_cjs_js_ruleSet_1_rules_1_use_2_media_queries_css__WEBPACK_IMPORTED_MODULE_14__[\"default\"]);\n52 | // Module\n53 | ___CSS_LOADER_EXPORT___.push([module.id, `\n54 | `, \"\",{\"version\":3,\"sources\":[],\"names\":[],\"mappings\":\"\",\"sourceRoot\":\"\"}]);\n55 | // Exports\n56 | /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);\n57 | ");

/***/ }),

/***/ "./node_modules/webpack-dev-server/client/clients/WebSocketClient.js":
/*!***************************************************************************!*\
  !*** ./node_modules/webpack-dev-server/client/clients/WebSocketClient.js ***!
  \***************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ WebSocketClient)
/* harmony export */ });
/* harmony import */ var _utils_log_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/log.js */ "./node_modules/webpack-dev-server/client/utils/log.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }

var WebSocketClient = /*#__PURE__*/function () {
  /**
   * @param {string} url
   */
  function WebSocketClient(url) {
    _classCallCheck(this, WebSocketClient);
    this.client = new WebSocket(url);
    this.client.onerror = function (error) {
      _utils_log_js__WEBPACK_IMPORTED_MODULE_0__.log.error(error);
    };
  }

  /**
   * @param {(...args: any[]) => void} f
   */
  return _createClass(WebSocketClient, [{
    key: "onOpen",
    value: function onOpen(f) {
      this.client.onopen = f;
    }

    /**
     * @param {(...args: any[]) => void} f
     */
  }, {
    key: "onClose",
    value: function onClose(f) {
      this.client.onclose = f;
    }

    // call f with the message string as the first argument
    /**
     * @param {(...args: any[]) => void} f
     */
  }, {
    key: "onMessage",
    value: function onMessage(f) {
      this.client.onmessage = function (e) {
        f(e.data);
      };
    }
  }]);
}();


/***/ }),

/***/ "./node_modules/webpack-dev-server/client/index.js?protocol=ws%3A&hostname=0.0.0.0&port=8080&pathname=%2Fws&logging=info&overlay=true&reconnect=10&hot=true&live-reload=true":
/*!***********************************************************************************************************************************************************************************!*\
  !*** ./node_modules/webpack-dev-server/client/index.js?protocol=ws%3A&hostname=0.0.0.0&port=8080&pathname=%2Fws&logging=info&overlay=true&reconnect=10&hot=true&live-reload=true ***!
  \***********************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
var __resourceQuery = "?protocol=ws%3A&hostname=0.0.0.0&port=8080&pathname=%2Fws&logging=info&overlay=true&reconnect=10&hot=true&live-reload=true";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var webpack_hot_log_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! webpack/hot/log.js */ "./node_modules/webpack/hot/log.js");
/* harmony import */ var webpack_hot_log_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(webpack_hot_log_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _utils_stripAnsi_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utils/stripAnsi.js */ "./node_modules/webpack-dev-server/client/utils/stripAnsi.js");
/* harmony import */ var _utils_parseURL_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./utils/parseURL.js */ "./node_modules/webpack-dev-server/client/utils/parseURL.js");
/* harmony import */ var _socket_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./socket.js */ "./node_modules/webpack-dev-server/client/socket.js");
/* harmony import */ var _overlay_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./overlay.js */ "./node_modules/webpack-dev-server/client/overlay.js");
/* harmony import */ var _utils_log_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./utils/log.js */ "./node_modules/webpack-dev-server/client/utils/log.js");
/* harmony import */ var _utils_sendMessage_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./utils/sendMessage.js */ "./node_modules/webpack-dev-server/client/utils/sendMessage.js");
/* harmony import */ var _utils_reloadApp_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./utils/reloadApp.js */ "./node_modules/webpack-dev-server/client/utils/reloadApp.js");
/* harmony import */ var _utils_createSocketURL_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./utils/createSocketURL.js */ "./node_modules/webpack-dev-server/client/utils/createSocketURL.js");
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
/* global __resourceQuery, __webpack_hash__ */
/// <reference types="webpack/module" />










/**
 * @typedef {Object} OverlayOptions
 * @property {boolean | (error: Error) => boolean} [warnings]
 * @property {boolean | (error: Error) => boolean} [errors]
 * @property {boolean | (error: Error) => boolean} [runtimeErrors]
 * @property {string} [trustedTypesPolicyName]
 */

/**
 * @typedef {Object} Options
 * @property {boolean} hot
 * @property {boolean} liveReload
 * @property {boolean} progress
 * @property {boolean | OverlayOptions} overlay
 * @property {string} [logging]
 * @property {number} [reconnect]
 */

/**
 * @typedef {Object} Status
 * @property {boolean} isUnloading
 * @property {string} currentHash
 * @property {string} [previousHash]
 */

/**
 * @param {boolean | { warnings?: boolean | string; errors?: boolean | string; runtimeErrors?: boolean | string; }} overlayOptions
 */
var decodeOverlayOptions = function decodeOverlayOptions(overlayOptions) {
  if (typeof overlayOptions === "object") {
    ["warnings", "errors", "runtimeErrors"].forEach(function (property) {
      if (typeof overlayOptions[property] === "string") {
        var overlayFilterFunctionString = decodeURIComponent(overlayOptions[property]);

        // eslint-disable-next-line no-new-func
        var overlayFilterFunction = new Function("message", "var callback = ".concat(overlayFilterFunctionString, "\n        return callback(message)"));
        overlayOptions[property] = overlayFilterFunction;
      }
    });
  }
};

/**
 * @type {Status}
 */
var status = {
  isUnloading: false,
  // eslint-disable-next-line camelcase
  currentHash: __webpack_require__.h()
};

/** @type {Options} */
var options = {
  hot: false,
  liveReload: false,
  progress: false,
  overlay: false
};
var parsedResourceQuery = (0,_utils_parseURL_js__WEBPACK_IMPORTED_MODULE_2__["default"])(__resourceQuery);
var enabledFeatures = {
  "Hot Module Replacement": false,
  "Live Reloading": false,
  Progress: false,
  Overlay: false
};
if (parsedResourceQuery.hot === "true") {
  options.hot = true;
  enabledFeatures["Hot Module Replacement"] = true;
}
if (parsedResourceQuery["live-reload"] === "true") {
  options.liveReload = true;
  enabledFeatures["Live Reloading"] = true;
}
if (parsedResourceQuery.progress === "true") {
  options.progress = true;
  enabledFeatures.Progress = true;
}
if (parsedResourceQuery.overlay) {
  try {
    options.overlay = JSON.parse(parsedResourceQuery.overlay);
  } catch (e) {
    _utils_log_js__WEBPACK_IMPORTED_MODULE_5__.log.error("Error parsing overlay options from resource query:", e);
  }

  // Fill in default "true" params for partially-specified objects.
  if (typeof options.overlay === "object") {
    options.overlay = _objectSpread({
      errors: true,
      warnings: true,
      runtimeErrors: true
    }, options.overlay);
    decodeOverlayOptions(options.overlay);
  }
  enabledFeatures.Overlay = true;
}
if (parsedResourceQuery.logging) {
  options.logging = parsedResourceQuery.logging;
}
if (typeof parsedResourceQuery.reconnect !== "undefined") {
  options.reconnect = Number(parsedResourceQuery.reconnect);
}

/**
 * @param {string} level
 */
function setAllLogLevel(level) {
  // This is needed because the HMR logger operate separately from dev server logger
  webpack_hot_log_js__WEBPACK_IMPORTED_MODULE_0___default().setLogLevel(level === "verbose" || level === "log" ? "info" : level);
  (0,_utils_log_js__WEBPACK_IMPORTED_MODULE_5__.setLogLevel)(level);
}
if (options.logging) {
  setAllLogLevel(options.logging);
}
(0,_utils_log_js__WEBPACK_IMPORTED_MODULE_5__.logEnabledFeatures)(enabledFeatures);
self.addEventListener("beforeunload", function () {
  status.isUnloading = true;
});
var overlay = typeof window !== "undefined" ? (0,_overlay_js__WEBPACK_IMPORTED_MODULE_4__.createOverlay)(typeof options.overlay === "object" ? {
  trustedTypesPolicyName: options.overlay.trustedTypesPolicyName,
  catchRuntimeError: options.overlay.runtimeErrors
} : {
  trustedTypesPolicyName: false,
  catchRuntimeError: options.overlay
}) : {
  send: function send() {}
};
var onSocketMessage = {
  hot: function hot() {
    if (parsedResourceQuery.hot === "false") {
      return;
    }
    options.hot = true;
  },
  liveReload: function liveReload() {
    if (parsedResourceQuery["live-reload"] === "false") {
      return;
    }
    options.liveReload = true;
  },
  invalid: function invalid() {
    _utils_log_js__WEBPACK_IMPORTED_MODULE_5__.log.info("App updated. Recompiling...");

    // Fixes #1042. overlay doesn't clear if errors are fixed but warnings remain.
    if (options.overlay) {
      overlay.send({
        type: "DISMISS"
      });
    }
    (0,_utils_sendMessage_js__WEBPACK_IMPORTED_MODULE_6__["default"])("Invalid");
  },
  /**
   * @param {string} hash
   */
  hash: function hash(_hash) {
    status.previousHash = status.currentHash;
    status.currentHash = _hash;
  },
  logging: setAllLogLevel,
  /**
   * @param {boolean} value
   */
  overlay: function overlay(value) {
    if (typeof document === "undefined") {
      return;
    }
    options.overlay = value;
    decodeOverlayOptions(options.overlay);
  },
  /**
   * @param {number} value
   */
  reconnect: function reconnect(value) {
    if (parsedResourceQuery.reconnect === "false") {
      return;
    }
    options.reconnect = value;
  },
  /**
   * @param {boolean} value
   */
  progress: function progress(value) {
    options.progress = value;
  },
  /**
   * @param {{ pluginName?: string, percent: number, msg: string }} data
   */
  "progress-update": function progressUpdate(data) {
    if (options.progress) {
      _utils_log_js__WEBPACK_IMPORTED_MODULE_5__.log.info("".concat(data.pluginName ? "[".concat(data.pluginName, "] ") : "").concat(data.percent, "% - ").concat(data.msg, "."));
    }
    (0,_utils_sendMessage_js__WEBPACK_IMPORTED_MODULE_6__["default"])("Progress", data);
  },
  "still-ok": function stillOk() {
    _utils_log_js__WEBPACK_IMPORTED_MODULE_5__.log.info("Nothing changed.");
    if (options.overlay) {
      overlay.send({
        type: "DISMISS"
      });
    }
    (0,_utils_sendMessage_js__WEBPACK_IMPORTED_MODULE_6__["default"])("StillOk");
  },
  ok: function ok() {
    (0,_utils_sendMessage_js__WEBPACK_IMPORTED_MODULE_6__["default"])("Ok");
    if (options.overlay) {
      overlay.send({
        type: "DISMISS"
      });
    }
    (0,_utils_reloadApp_js__WEBPACK_IMPORTED_MODULE_7__["default"])(options, status);
  },
  /**
   * @param {string} file
   */
  "static-changed": function staticChanged(file) {
    _utils_log_js__WEBPACK_IMPORTED_MODULE_5__.log.info("".concat(file ? "\"".concat(file, "\"") : "Content", " from static directory was changed. Reloading..."));
    self.location.reload();
  },
  /**
   * @param {Error[]} warnings
   * @param {any} params
   */
  warnings: function warnings(_warnings, params) {
    _utils_log_js__WEBPACK_IMPORTED_MODULE_5__.log.warn("Warnings while compiling.");
    var printableWarnings = _warnings.map(function (error) {
      var _formatProblem = (0,_overlay_js__WEBPACK_IMPORTED_MODULE_4__.formatProblem)("warning", error),
        header = _formatProblem.header,
        body = _formatProblem.body;
      return "".concat(header, "\n").concat((0,_utils_stripAnsi_js__WEBPACK_IMPORTED_MODULE_1__["default"])(body));
    });
    (0,_utils_sendMessage_js__WEBPACK_IMPORTED_MODULE_6__["default"])("Warnings", printableWarnings);
    for (var i = 0; i < printableWarnings.length; i++) {
      _utils_log_js__WEBPACK_IMPORTED_MODULE_5__.log.warn(printableWarnings[i]);
    }
    var overlayWarningsSetting = typeof options.overlay === "boolean" ? options.overlay : options.overlay && options.overlay.warnings;
    if (overlayWarningsSetting) {
      var warningsToDisplay = typeof overlayWarningsSetting === "function" ? _warnings.filter(overlayWarningsSetting) : _warnings;
      if (warningsToDisplay.length) {
        overlay.send({
          type: "BUILD_ERROR",
          level: "warning",
          messages: _warnings
        });
      }
    }
    if (params && params.preventReloading) {
      return;
    }
    (0,_utils_reloadApp_js__WEBPACK_IMPORTED_MODULE_7__["default"])(options, status);
  },
  /**
   * @param {Error[]} errors
   */
  errors: function errors(_errors) {
    _utils_log_js__WEBPACK_IMPORTED_MODULE_5__.log.error("Errors while compiling. Reload prevented.");
    var printableErrors = _errors.map(function (error) {
      var _formatProblem2 = (0,_overlay_js__WEBPACK_IMPORTED_MODULE_4__.formatProblem)("error", error),
        header = _formatProblem2.header,
        body = _formatProblem2.body;
      return "".concat(header, "\n").concat((0,_utils_stripAnsi_js__WEBPACK_IMPORTED_MODULE_1__["default"])(body));
    });
    (0,_utils_sendMessage_js__WEBPACK_IMPORTED_MODULE_6__["default"])("Errors", printableErrors);
    for (var i = 0; i < printableErrors.length; i++) {
      _utils_log_js__WEBPACK_IMPORTED_MODULE_5__.log.error(printableErrors[i]);
    }
    var overlayErrorsSettings = typeof options.overlay === "boolean" ? options.overlay : options.overlay && options.overlay.errors;
    if (overlayErrorsSettings) {
      var errorsToDisplay = typeof overlayErrorsSettings === "function" ? _errors.filter(overlayErrorsSettings) : _errors;
      if (errorsToDisplay.length) {
        overlay.send({
          type: "BUILD_ERROR",
          level: "error",
          messages: _errors
        });
      }
    }
  },
  /**
   * @param {Error} error
   */
  error: function error(_error) {
    _utils_log_js__WEBPACK_IMPORTED_MODULE_5__.log.error(_error);
  },
  close: function close() {
    _utils_log_js__WEBPACK_IMPORTED_MODULE_5__.log.info("Disconnected!");
    if (options.overlay) {
      overlay.send({
        type: "DISMISS"
      });
    }
    (0,_utils_sendMessage_js__WEBPACK_IMPORTED_MODULE_6__["default"])("Close");
  }
};
var socketURL = (0,_utils_createSocketURL_js__WEBPACK_IMPORTED_MODULE_8__["default"])(parsedResourceQuery);
(0,_socket_js__WEBPACK_IMPORTED_MODULE_3__["default"])(socketURL, onSocketMessage, options.reconnect);

/***/ }),

/***/ "./node_modules/webpack-dev-server/client/modules/logger/index.js":
/*!************************************************************************!*\
  !*** ./node_modules/webpack-dev-server/client/modules/logger/index.js ***!
  \************************************************************************/
/***/ ((__unused_webpack_module, exports) => {

/******/ (function() { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./client-src/modules/logger/tapable.js":
/*!**********************************************!*\
  !*** ./client-src/modules/logger/tapable.js ***!
  \**********************************************/
/***/ (function(__unused_webpack_module, __nested_webpack_exports__, __nested_webpack_require_372__) {

__nested_webpack_require_372__.r(__nested_webpack_exports__);
/* harmony export */ __nested_webpack_require_372__.d(__nested_webpack_exports__, {
/* harmony export */   SyncBailHook: function() { return /* binding */ SyncBailHook; }
/* harmony export */ });
function SyncBailHook() {
  return {
    call: function call() {}
  };
}

/**
 * Client stub for tapable SyncBailHook
 */
// eslint-disable-next-line import/prefer-default-export


/***/ }),

/***/ "./node_modules/webpack/lib/logging/Logger.js":
/*!****************************************************!*\
  !*** ./node_modules/webpack/lib/logging/Logger.js ***!
  \****************************************************/
/***/ (function(__unused_webpack_module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/



function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
}
function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}
function _iterableToArray(iter) {
  if (typeof (typeof Symbol !== "undefined" ? Symbol : function (i) { return i; }) !== "undefined" && iter[(typeof Symbol !== "undefined" ? Symbol : function (i) { return i; }).iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
}
function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) return _arrayLikeToArray(arr);
}
function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;
  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
  return arr2;
}
function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}
function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor);
  }
}
function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  Object.defineProperty(Constructor, "prototype", {
    writable: false
  });
  return Constructor;
}
function _toPropertyKey(t) {
  var i = _toPrimitive(t, "string");
  return "symbol" == typeof i ? i : i + "";
}
function _toPrimitive(t, r) {
  if ("object" != typeof t || !t) return t;
  var e = t[(typeof Symbol !== "undefined" ? Symbol : function (i) { return i; }).toPrimitive];
  if (void 0 !== e) {
    var i = e.call(t, r || "default");
    if ("object" != typeof i) return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r ? String : Number)(t);
}
var LogType = Object.freeze({
  error: ( /** @type {"error"} */"error"),
  // message, c style arguments
  warn: ( /** @type {"warn"} */"warn"),
  // message, c style arguments
  info: ( /** @type {"info"} */"info"),
  // message, c style arguments
  log: ( /** @type {"log"} */"log"),
  // message, c style arguments
  debug: ( /** @type {"debug"} */"debug"),
  // message, c style arguments

  trace: ( /** @type {"trace"} */"trace"),
  // no arguments

  group: ( /** @type {"group"} */"group"),
  // [label]
  groupCollapsed: ( /** @type {"groupCollapsed"} */"groupCollapsed"),
  // [label]
  groupEnd: ( /** @type {"groupEnd"} */"groupEnd"),
  // [label]

  profile: ( /** @type {"profile"} */"profile"),
  // [profileName]
  profileEnd: ( /** @type {"profileEnd"} */"profileEnd"),
  // [profileName]

  time: ( /** @type {"time"} */"time"),
  // name, time as [seconds, nanoseconds]

  clear: ( /** @type {"clear"} */"clear"),
  // no arguments
  status: ( /** @type {"status"} */"status") // message, arguments
});
exports.LogType = LogType;

/** @typedef {typeof LogType[keyof typeof LogType]} LogTypeEnum */

var LOG_SYMBOL = (typeof Symbol !== "undefined" ? Symbol : function (i) { return i; })("webpack logger raw log method");
var TIMERS_SYMBOL = (typeof Symbol !== "undefined" ? Symbol : function (i) { return i; })("webpack logger times");
var TIMERS_AGGREGATES_SYMBOL = (typeof Symbol !== "undefined" ? Symbol : function (i) { return i; })("webpack logger aggregated times");
var WebpackLogger = /*#__PURE__*/function () {
  /**
   * @param {function(LogTypeEnum, any[]=): void} log log function
   * @param {function(string | function(): string): WebpackLogger} getChildLogger function to create child logger
   */
  function WebpackLogger(log, getChildLogger) {
    _classCallCheck(this, WebpackLogger);
    this[LOG_SYMBOL] = log;
    this.getChildLogger = getChildLogger;
  }
  return _createClass(WebpackLogger, [{
    key: "error",
    value: function error() {
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }
      this[LOG_SYMBOL](LogType.error, args);
    }
  }, {
    key: "warn",
    value: function warn() {
      for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        args[_key2] = arguments[_key2];
      }
      this[LOG_SYMBOL](LogType.warn, args);
    }
  }, {
    key: "info",
    value: function info() {
      for (var _len3 = arguments.length, args = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
        args[_key3] = arguments[_key3];
      }
      this[LOG_SYMBOL](LogType.info, args);
    }
  }, {
    key: "log",
    value: function log() {
      for (var _len4 = arguments.length, args = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
        args[_key4] = arguments[_key4];
      }
      this[LOG_SYMBOL](LogType.log, args);
    }
  }, {
    key: "debug",
    value: function debug() {
      for (var _len5 = arguments.length, args = new Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
        args[_key5] = arguments[_key5];
      }
      this[LOG_SYMBOL](LogType.debug, args);
    }
  }, {
    key: "assert",
    value: function assert(assertion) {
      if (!assertion) {
        for (var _len6 = arguments.length, args = new Array(_len6 > 1 ? _len6 - 1 : 0), _key6 = 1; _key6 < _len6; _key6++) {
          args[_key6 - 1] = arguments[_key6];
        }
        this[LOG_SYMBOL](LogType.error, args);
      }
    }
  }, {
    key: "trace",
    value: function trace() {
      this[LOG_SYMBOL](LogType.trace, ["Trace"]);
    }
  }, {
    key: "clear",
    value: function clear() {
      this[LOG_SYMBOL](LogType.clear);
    }
  }, {
    key: "status",
    value: function status() {
      for (var _len7 = arguments.length, args = new Array(_len7), _key7 = 0; _key7 < _len7; _key7++) {
        args[_key7] = arguments[_key7];
      }
      this[LOG_SYMBOL](LogType.status, args);
    }
  }, {
    key: "group",
    value: function group() {
      for (var _len8 = arguments.length, args = new Array(_len8), _key8 = 0; _key8 < _len8; _key8++) {
        args[_key8] = arguments[_key8];
      }
      this[LOG_SYMBOL](LogType.group, args);
    }
  }, {
    key: "groupCollapsed",
    value: function groupCollapsed() {
      for (var _len9 = arguments.length, args = new Array(_len9), _key9 = 0; _key9 < _len9; _key9++) {
        args[_key9] = arguments[_key9];
      }
      this[LOG_SYMBOL](LogType.groupCollapsed, args);
    }
  }, {
    key: "groupEnd",
    value: function groupEnd() {
      for (var _len10 = arguments.length, args = new Array(_len10), _key10 = 0; _key10 < _len10; _key10++) {
        args[_key10] = arguments[_key10];
      }
      this[LOG_SYMBOL](LogType.groupEnd, args);
    }
  }, {
    key: "profile",
    value: function profile(label) {
      this[LOG_SYMBOL](LogType.profile, [label]);
    }
  }, {
    key: "profileEnd",
    value: function profileEnd(label) {
      this[LOG_SYMBOL](LogType.profileEnd, [label]);
    }
  }, {
    key: "time",
    value: function time(label) {
      this[TIMERS_SYMBOL] = this[TIMERS_SYMBOL] || new Map();
      this[TIMERS_SYMBOL].set(label, process.hrtime());
    }
  }, {
    key: "timeLog",
    value: function timeLog(label) {
      var prev = this[TIMERS_SYMBOL] && this[TIMERS_SYMBOL].get(label);
      if (!prev) {
        throw new Error("No such label '".concat(label, "' for WebpackLogger.timeLog()"));
      }
      var time = process.hrtime(prev);
      this[LOG_SYMBOL](LogType.time, [label].concat(_toConsumableArray(time)));
    }
  }, {
    key: "timeEnd",
    value: function timeEnd(label) {
      var prev = this[TIMERS_SYMBOL] && this[TIMERS_SYMBOL].get(label);
      if (!prev) {
        throw new Error("No such label '".concat(label, "' for WebpackLogger.timeEnd()"));
      }
      var time = process.hrtime(prev);
      this[TIMERS_SYMBOL].delete(label);
      this[LOG_SYMBOL](LogType.time, [label].concat(_toConsumableArray(time)));
    }
  }, {
    key: "timeAggregate",
    value: function timeAggregate(label) {
      var prev = this[TIMERS_SYMBOL] && this[TIMERS_SYMBOL].get(label);
      if (!prev) {
        throw new Error("No such label '".concat(label, "' for WebpackLogger.timeAggregate()"));
      }
      var time = process.hrtime(prev);
      this[TIMERS_SYMBOL].delete(label);
      this[TIMERS_AGGREGATES_SYMBOL] = this[TIMERS_AGGREGATES_SYMBOL] || new Map();
      var current = this[TIMERS_AGGREGATES_SYMBOL].get(label);
      if (current !== undefined) {
        if (time[1] + current[1] > 1e9) {
          time[0] += current[0] + 1;
          time[1] = time[1] - 1e9 + current[1];
        } else {
          time[0] += current[0];
          time[1] += current[1];
        }
      }
      this[TIMERS_AGGREGATES_SYMBOL].set(label, time);
    }
  }, {
    key: "timeAggregateEnd",
    value: function timeAggregateEnd(label) {
      if (this[TIMERS_AGGREGATES_SYMBOL] === undefined) return;
      var time = this[TIMERS_AGGREGATES_SYMBOL].get(label);
      if (time === undefined) return;
      this[TIMERS_AGGREGATES_SYMBOL].delete(label);
      this[LOG_SYMBOL](LogType.time, [label].concat(_toConsumableArray(time)));
    }
  }]);
}();
exports.Logger = WebpackLogger;

/***/ }),

/***/ "./node_modules/webpack/lib/logging/createConsoleLogger.js":
/*!*****************************************************************!*\
  !*** ./node_modules/webpack/lib/logging/createConsoleLogger.js ***!
  \*****************************************************************/
/***/ (function(module, __unused_webpack_exports, __nested_webpack_require_11499__) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/



function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
}
function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}
function _iterableToArray(iter) {
  if (typeof (typeof Symbol !== "undefined" ? Symbol : function (i) { return i; }) !== "undefined" && iter[(typeof Symbol !== "undefined" ? Symbol : function (i) { return i; }).iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
}
function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) return _arrayLikeToArray(arr);
}
function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;
  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
  return arr2;
}
var _require = __nested_webpack_require_11499__(/*! ./Logger */ "./node_modules/webpack/lib/logging/Logger.js"),
  LogType = _require.LogType;

/** @typedef {import("../../declarations/WebpackOptions").FilterItemTypes} FilterItemTypes */
/** @typedef {import("../../declarations/WebpackOptions").FilterTypes} FilterTypes */
/** @typedef {import("./Logger").LogTypeEnum} LogTypeEnum */

/** @typedef {function(string): boolean} FilterFunction */

/**
 * @typedef {Object} LoggerConsole
 * @property {function(): void} clear
 * @property {function(): void} trace
 * @property {(...args: any[]) => void} info
 * @property {(...args: any[]) => void} log
 * @property {(...args: any[]) => void} warn
 * @property {(...args: any[]) => void} error
 * @property {(...args: any[]) => void=} debug
 * @property {(...args: any[]) => void=} group
 * @property {(...args: any[]) => void=} groupCollapsed
 * @property {(...args: any[]) => void=} groupEnd
 * @property {(...args: any[]) => void=} status
 * @property {(...args: any[]) => void=} profile
 * @property {(...args: any[]) => void=} profileEnd
 * @property {(...args: any[]) => void=} logTime
 */

/**
 * @typedef {Object} LoggerOptions
 * @property {false|true|"none"|"error"|"warn"|"info"|"log"|"verbose"} level loglevel
 * @property {FilterTypes|boolean} debug filter for debug logging
 * @property {LoggerConsole} console the console to log to
 */

/**
 * @param {FilterItemTypes} item an input item
 * @returns {FilterFunction} filter function
 */
var filterToFunction = function filterToFunction(item) {
  if (typeof item === "string") {
    var regExp = new RegExp("[\\\\/]".concat(item.replace(/[-[\]{}()*+?.\\^$|]/g, "\\$&"), "([\\\\/]|$|!|\\?)"));
    return function (ident) {
      return regExp.test(ident);
    };
  }
  if (item && typeof item === "object" && typeof item.test === "function") {
    return function (ident) {
      return item.test(ident);
    };
  }
  if (typeof item === "function") {
    return item;
  }
  if (typeof item === "boolean") {
    return function () {
      return item;
    };
  }
};

/**
 * @enum {number}
 */
var LogLevel = {
  none: 6,
  false: 6,
  error: 5,
  warn: 4,
  info: 3,
  log: 2,
  true: 2,
  verbose: 1
};

/**
 * @param {LoggerOptions} options options object
 * @returns {function(string, LogTypeEnum, any[]): void} logging function
 */
module.exports = function (_ref) {
  var _ref$level = _ref.level,
    level = _ref$level === void 0 ? "info" : _ref$level,
    _ref$debug = _ref.debug,
    debug = _ref$debug === void 0 ? false : _ref$debug,
    console = _ref.console;
  var debugFilters = typeof debug === "boolean" ? [function () {
    return debug;
  }] : /** @type {FilterItemTypes[]} */[].concat(debug).map(filterToFunction);
  /** @type {number} */
  var loglevel = LogLevel["".concat(level)] || 0;

  /**
   * @param {string} name name of the logger
   * @param {LogTypeEnum} type type of the log entry
   * @param {any[]} args arguments of the log entry
   * @returns {void}
   */
  var logger = function logger(name, type, args) {
    var labeledArgs = function labeledArgs() {
      if (Array.isArray(args)) {
        if (args.length > 0 && typeof args[0] === "string") {
          return ["[".concat(name, "] ").concat(args[0])].concat(_toConsumableArray(args.slice(1)));
        } else {
          return ["[".concat(name, "]")].concat(_toConsumableArray(args));
        }
      } else {
        return [];
      }
    };
    var debug = debugFilters.some(function (f) {
      return f(name);
    });
    switch (type) {
      case LogType.debug:
        if (!debug) return;
        if (typeof console.debug === "function") {
          console.debug.apply(console, _toConsumableArray(labeledArgs()));
        } else {
          console.log.apply(console, _toConsumableArray(labeledArgs()));
        }
        break;
      case LogType.log:
        if (!debug && loglevel > LogLevel.log) return;
        console.log.apply(console, _toConsumableArray(labeledArgs()));
        break;
      case LogType.info:
        if (!debug && loglevel > LogLevel.info) return;
        console.info.apply(console, _toConsumableArray(labeledArgs()));
        break;
      case LogType.warn:
        if (!debug && loglevel > LogLevel.warn) return;
        console.warn.apply(console, _toConsumableArray(labeledArgs()));
        break;
      case LogType.error:
        if (!debug && loglevel > LogLevel.error) return;
        console.error.apply(console, _toConsumableArray(labeledArgs()));
        break;
      case LogType.trace:
        if (!debug) return;
        console.trace();
        break;
      case LogType.groupCollapsed:
        if (!debug && loglevel > LogLevel.log) return;
        if (!debug && loglevel > LogLevel.verbose) {
          if (typeof console.groupCollapsed === "function") {
            console.groupCollapsed.apply(console, _toConsumableArray(labeledArgs()));
          } else {
            console.log.apply(console, _toConsumableArray(labeledArgs()));
          }
          break;
        }
      // falls through
      case LogType.group:
        if (!debug && loglevel > LogLevel.log) return;
        if (typeof console.group === "function") {
          console.group.apply(console, _toConsumableArray(labeledArgs()));
        } else {
          console.log.apply(console, _toConsumableArray(labeledArgs()));
        }
        break;
      case LogType.groupEnd:
        if (!debug && loglevel > LogLevel.log) return;
        if (typeof console.groupEnd === "function") {
          console.groupEnd();
        }
        break;
      case LogType.time:
        {
          if (!debug && loglevel > LogLevel.log) return;
          var ms = args[1] * 1000 + args[2] / 1000000;
          var msg = "[".concat(name, "] ").concat(args[0], ": ").concat(ms, " ms");
          if (typeof console.logTime === "function") {
            console.logTime(msg);
          } else {
            console.log(msg);
          }
          break;
        }
      case LogType.profile:
        if (typeof console.profile === "function") {
          console.profile.apply(console, _toConsumableArray(labeledArgs()));
        }
        break;
      case LogType.profileEnd:
        if (typeof console.profileEnd === "function") {
          console.profileEnd.apply(console, _toConsumableArray(labeledArgs()));
        }
        break;
      case LogType.clear:
        if (!debug && loglevel > LogLevel.log) return;
        if (typeof console.clear === "function") {
          console.clear();
        }
        break;
      case LogType.status:
        if (!debug && loglevel > LogLevel.info) return;
        if (typeof console.status === "function") {
          if (args.length === 0) {
            console.status();
          } else {
            console.status.apply(console, _toConsumableArray(labeledArgs()));
          }
        } else {
          if (args.length !== 0) {
            console.info.apply(console, _toConsumableArray(labeledArgs()));
          }
        }
        break;
      default:
        throw new Error("Unexpected LogType ".concat(type));
    }
  };
  return logger;
};

/***/ }),

/***/ "./node_modules/webpack/lib/logging/runtime.js":
/*!*****************************************************!*\
  !*** ./node_modules/webpack/lib/logging/runtime.js ***!
  \*****************************************************/
/***/ (function(__unused_webpack_module, exports, __nested_webpack_require_20369__) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/



function _extends() {
  _extends = Object.assign ? Object.assign.bind() : function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };
  return _extends.apply(this, arguments);
}
var _require = __nested_webpack_require_20369__(/*! tapable */ "./client-src/modules/logger/tapable.js"),
  SyncBailHook = _require.SyncBailHook;
var _require2 = __nested_webpack_require_20369__(/*! ./Logger */ "./node_modules/webpack/lib/logging/Logger.js"),
  Logger = _require2.Logger;
var createConsoleLogger = __nested_webpack_require_20369__(/*! ./createConsoleLogger */ "./node_modules/webpack/lib/logging/createConsoleLogger.js");

/** @type {createConsoleLogger.LoggerOptions} */
var currentDefaultLoggerOptions = {
  level: "info",
  debug: false,
  console: console
};
var currentDefaultLogger = createConsoleLogger(currentDefaultLoggerOptions);

/**
 * @param {string} name name of the logger
 * @returns {Logger} a logger
 */
exports.getLogger = function (name) {
  return new Logger(function (type, args) {
    if (exports.hooks.log.call(name, type, args) === undefined) {
      currentDefaultLogger(name, type, args);
    }
  }, function (childName) {
    return exports.getLogger("".concat(name, "/").concat(childName));
  });
};

/**
 * @param {createConsoleLogger.LoggerOptions} options new options, merge with old options
 * @returns {void}
 */
exports.configureDefaultLogger = function (options) {
  _extends(currentDefaultLoggerOptions, options);
  currentDefaultLogger = createConsoleLogger(currentDefaultLoggerOptions);
};
exports.hooks = {
  log: new SyncBailHook(["origin", "type", "args"])
};

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __nested_webpack_require_22508__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __nested_webpack_require_22508__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	!function() {
/******/ 		// define getter functions for harmony exports
/******/ 		__nested_webpack_require_22508__.d = function(exports, definition) {
/******/ 			for(var key in definition) {
/******/ 				if(__nested_webpack_require_22508__.o(definition, key) && !__nested_webpack_require_22508__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	!function() {
/******/ 		__nested_webpack_require_22508__.o = function(obj, prop) { return Object.prototype.hasOwnProperty.call(obj, prop); }
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	!function() {
/******/ 		// define __esModule on exports
/******/ 		__nested_webpack_require_22508__.r = function(exports) {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	}();
/******/ 	
/************************************************************************/
var __nested_webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
!function() {
/*!********************************************!*\
  !*** ./client-src/modules/logger/index.js ***!
  \********************************************/
__nested_webpack_require_22508__.r(__nested_webpack_exports__);
/* harmony export */ __nested_webpack_require_22508__.d(__nested_webpack_exports__, {
/* harmony export */   "default": function() { return /* reexport default export from named module */ webpack_lib_logging_runtime_js__WEBPACK_IMPORTED_MODULE_0__; }
/* harmony export */ });
/* harmony import */ var webpack_lib_logging_runtime_js__WEBPACK_IMPORTED_MODULE_0__ = __nested_webpack_require_22508__(/*! webpack/lib/logging/runtime.js */ "./node_modules/webpack/lib/logging/runtime.js");

}();
var __webpack_export_target__ = exports;
for(var i in __nested_webpack_exports__) __webpack_export_target__[i] = __nested_webpack_exports__[i];
if(__nested_webpack_exports__.__esModule) Object.defineProperty(__webpack_export_target__, "__esModule", { value: true });
/******/ })()
;

/***/ }),

/***/ "./node_modules/webpack-dev-server/client/overlay.js":
/*!***********************************************************!*\
  !*** ./node_modules/webpack-dev-server/client/overlay.js ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   createOverlay: () => (/* binding */ createOverlay),
/* harmony export */   formatProblem: () => (/* binding */ formatProblem)
/* harmony export */ });
/* harmony import */ var ansi_html_community__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ansi-html-community */ "./node_modules/ansi-html-community/index.js");
/* harmony import */ var ansi_html_community__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(ansi_html_community__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var html_entities__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! html-entities */ "./node_modules/html-entities/lib/index.js");
/* harmony import */ var html_entities__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(html_entities__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _overlay_runtime_error_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./overlay/runtime-error.js */ "./node_modules/webpack-dev-server/client/overlay/runtime-error.js");
/* harmony import */ var _overlay_state_machine_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./overlay/state-machine.js */ "./node_modules/webpack-dev-server/client/overlay/state-machine.js");
/* harmony import */ var _overlay_styles_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./overlay/styles.js */ "./node_modules/webpack-dev-server/client/overlay/styles.js");
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
// The error overlay is inspired (and mostly copied) from Create React App (https://github.com/facebookincubator/create-react-app)
// They, in turn, got inspired by webpack-hot-middleware (https://github.com/glenjamin/webpack-hot-middleware).






var colors = {
  reset: ["transparent", "transparent"],
  black: "181818",
  red: "E36049",
  green: "B3CB74",
  yellow: "FFD080",
  blue: "7CAFC2",
  magenta: "7FACCA",
  cyan: "C3C2EF",
  lightgrey: "EBE7E3",
  darkgrey: "6D7891"
};
ansi_html_community__WEBPACK_IMPORTED_MODULE_0___default().setColors(colors);

/**
 * @param {string} type
 * @param {string  | { file?: string, moduleName?: string, loc?: string, message?: string; stack?: string[] }} item
 * @returns {{ header: string, body: string }}
 */
function formatProblem(type, item) {
  var header = type === "warning" ? "WARNING" : "ERROR";
  var body = "";
  if (typeof item === "string") {
    body += item;
  } else {
    var file = item.file || "";
    // eslint-disable-next-line no-nested-ternary
    var moduleName = item.moduleName ? item.moduleName.indexOf("!") !== -1 ? "".concat(item.moduleName.replace(/^(\s|\S)*!/, ""), " (").concat(item.moduleName, ")") : "".concat(item.moduleName) : "";
    var loc = item.loc;
    header += "".concat(moduleName || file ? " in ".concat(moduleName ? "".concat(moduleName).concat(file ? " (".concat(file, ")") : "") : file).concat(loc ? " ".concat(loc) : "") : "");
    body += item.message || "";
  }
  if (Array.isArray(item.stack)) {
    item.stack.forEach(function (stack) {
      if (typeof stack === "string") {
        body += "\r\n".concat(stack);
      }
    });
  }
  return {
    header: header,
    body: body
  };
}

/**
 * @typedef {Object} CreateOverlayOptions
 * @property {string | null} trustedTypesPolicyName
 * @property {boolean | (error: Error) => void} [catchRuntimeError]
 */

/**
 *
 * @param {CreateOverlayOptions} options
 */
var createOverlay = function createOverlay(options) {
  /** @type {HTMLIFrameElement | null | undefined} */
  var iframeContainerElement;
  /** @type {HTMLDivElement | null | undefined} */
  var containerElement;
  /** @type {HTMLDivElement | null | undefined} */
  var headerElement;
  /** @type {Array<(element: HTMLDivElement) => void>} */
  var onLoadQueue = [];
  /** @type {TrustedTypePolicy | undefined} */
  var overlayTrustedTypesPolicy;

  /**
   *
   * @param {HTMLElement} element
   * @param {CSSStyleDeclaration} style
   */
  function applyStyle(element, style) {
    Object.keys(style).forEach(function (prop) {
      element.style[prop] = style[prop];
    });
  }

  /**
   * @param {string | null} trustedTypesPolicyName
   */
  function createContainer(trustedTypesPolicyName) {
    // Enable Trusted Types if they are available in the current browser.
    if (window.trustedTypes) {
      overlayTrustedTypesPolicy = window.trustedTypes.createPolicy(trustedTypesPolicyName || "webpack-dev-server#overlay", {
        createHTML: function createHTML(value) {
          return value;
        }
      });
    }
    iframeContainerElement = document.createElement("iframe");
    iframeContainerElement.id = "webpack-dev-server-client-overlay";
    iframeContainerElement.src = "about:blank";
    applyStyle(iframeContainerElement, _overlay_styles_js__WEBPACK_IMPORTED_MODULE_3__.iframeStyle);
    iframeContainerElement.onload = function () {
      var contentElement = /** @type {Document} */
      ( /** @type {HTMLIFrameElement} */
      iframeContainerElement.contentDocument).createElement("div");
      containerElement = /** @type {Document} */
      ( /** @type {HTMLIFrameElement} */
      iframeContainerElement.contentDocument).createElement("div");
      contentElement.id = "webpack-dev-server-client-overlay-div";
      applyStyle(contentElement, _overlay_styles_js__WEBPACK_IMPORTED_MODULE_3__.containerStyle);
      headerElement = document.createElement("div");
      headerElement.innerText = "Compiled with problems:";
      applyStyle(headerElement, _overlay_styles_js__WEBPACK_IMPORTED_MODULE_3__.headerStyle);
      var closeButtonElement = document.createElement("button");
      applyStyle(closeButtonElement, _overlay_styles_js__WEBPACK_IMPORTED_MODULE_3__.dismissButtonStyle);
      closeButtonElement.innerText = "×";
      closeButtonElement.ariaLabel = "Dismiss";
      closeButtonElement.addEventListener("click", function () {
        // eslint-disable-next-line no-use-before-define
        overlayService.send({
          type: "DISMISS"
        });
      });
      contentElement.appendChild(headerElement);
      contentElement.appendChild(closeButtonElement);
      contentElement.appendChild(containerElement);

      /** @type {Document} */
      ( /** @type {HTMLIFrameElement} */
      iframeContainerElement.contentDocument).body.appendChild(contentElement);
      onLoadQueue.forEach(function (onLoad) {
        onLoad( /** @type {HTMLDivElement} */contentElement);
      });
      onLoadQueue = [];

      /** @type {HTMLIFrameElement} */
      iframeContainerElement.onload = null;
    };
    document.body.appendChild(iframeContainerElement);
  }

  /**
   * @param {(element: HTMLDivElement) => void} callback
   * @param {string | null} trustedTypesPolicyName
   */
  function ensureOverlayExists(callback, trustedTypesPolicyName) {
    if (containerElement) {
      containerElement.innerHTML = overlayTrustedTypesPolicy ? overlayTrustedTypesPolicy.createHTML("") : "";
      // Everything is ready, call the callback right away.
      callback(containerElement);
      return;
    }
    onLoadQueue.push(callback);
    if (iframeContainerElement) {
      return;
    }
    createContainer(trustedTypesPolicyName);
  }

  // Successful compilation.
  function hide() {
    if (!iframeContainerElement) {
      return;
    }

    // Clean up and reset internal state.
    document.body.removeChild(iframeContainerElement);
    iframeContainerElement = null;
    containerElement = null;
  }

  // Compilation with errors (e.g. syntax error or missing modules).
  /**
   * @param {string} type
   * @param {Array<string  | { moduleIdentifier?: string, moduleName?: string, loc?: string, message?: string }>} messages
   * @param {string | null} trustedTypesPolicyName
   * @param {'build' | 'runtime'} messageSource
   */
  function show(type, messages, trustedTypesPolicyName, messageSource) {
    ensureOverlayExists(function () {
      headerElement.innerText = messageSource === "runtime" ? "Uncaught runtime errors:" : "Compiled with problems:";
      messages.forEach(function (message) {
        var entryElement = document.createElement("div");
        var msgStyle = type === "warning" ? _overlay_styles_js__WEBPACK_IMPORTED_MODULE_3__.msgStyles.warning : _overlay_styles_js__WEBPACK_IMPORTED_MODULE_3__.msgStyles.error;
        applyStyle(entryElement, _objectSpread(_objectSpread({}, msgStyle), {}, {
          padding: "1rem 1rem 1.5rem 1rem"
        }));
        var typeElement = document.createElement("div");
        var _formatProblem = formatProblem(type, message),
          header = _formatProblem.header,
          body = _formatProblem.body;
        typeElement.innerText = header;
        applyStyle(typeElement, _overlay_styles_js__WEBPACK_IMPORTED_MODULE_3__.msgTypeStyle);
        if (message.moduleIdentifier) {
          applyStyle(typeElement, {
            cursor: "pointer"
          });
          // element.dataset not supported in IE
          typeElement.setAttribute("data-can-open", true);
          typeElement.addEventListener("click", function () {
            fetch("/webpack-dev-server/open-editor?fileName=".concat(message.moduleIdentifier));
          });
        }

        // Make it look similar to our terminal.
        var text = ansi_html_community__WEBPACK_IMPORTED_MODULE_0___default()((0,html_entities__WEBPACK_IMPORTED_MODULE_4__.encode)(body));
        var messageTextNode = document.createElement("div");
        applyStyle(messageTextNode, _overlay_styles_js__WEBPACK_IMPORTED_MODULE_3__.msgTextStyle);
        messageTextNode.innerHTML = overlayTrustedTypesPolicy ? overlayTrustedTypesPolicy.createHTML(text) : text;
        entryElement.appendChild(typeElement);
        entryElement.appendChild(messageTextNode);

        /** @type {HTMLDivElement} */
        containerElement.appendChild(entryElement);
      });
    }, trustedTypesPolicyName);
  }
  var overlayService = (0,_overlay_state_machine_js__WEBPACK_IMPORTED_MODULE_2__["default"])({
    showOverlay: function showOverlay(_ref) {
      var _ref$level = _ref.level,
        level = _ref$level === void 0 ? "error" : _ref$level,
        messages = _ref.messages,
        messageSource = _ref.messageSource;
      return show(level, messages, options.trustedTypesPolicyName, messageSource);
    },
    hideOverlay: hide
  });
  if (options.catchRuntimeError) {
    /**
     * @param {Error | undefined} error
     * @param {string} fallbackMessage
     */
    var handleError = function handleError(error, fallbackMessage) {
      var errorObject = error instanceof Error ? error : new Error(error || fallbackMessage);
      var shouldDisplay = typeof options.catchRuntimeError === "function" ? options.catchRuntimeError(errorObject) : true;
      if (shouldDisplay) {
        overlayService.send({
          type: "RUNTIME_ERROR",
          messages: [{
            message: errorObject.message,
            stack: (0,_overlay_runtime_error_js__WEBPACK_IMPORTED_MODULE_1__.parseErrorToStacks)(errorObject)
          }]
        });
      }
    };
    (0,_overlay_runtime_error_js__WEBPACK_IMPORTED_MODULE_1__.listenToRuntimeError)(function (errorEvent) {
      // error property may be empty in older browser like IE
      var error = errorEvent.error,
        message = errorEvent.message;
      if (!error && !message) {
        return;
      }
      handleError(error, message);
    });
    (0,_overlay_runtime_error_js__WEBPACK_IMPORTED_MODULE_1__.listenToUnhandledRejection)(function (promiseRejectionEvent) {
      var reason = promiseRejectionEvent.reason;
      handleError(reason, "Unknown promise rejection reason");
    });
  }
  return overlayService;
};


/***/ }),

/***/ "./node_modules/webpack-dev-server/client/overlay/fsm.js":
/*!***************************************************************!*\
  !*** ./node_modules/webpack-dev-server/client/overlay/fsm.js ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
/**
 * @typedef {Object} StateDefinitions
 * @property {{[event: string]: { target: string; actions?: Array<string> }}} [on]
 */

/**
 * @typedef {Object} Options
 * @property {{[state: string]: StateDefinitions}} states
 * @property {object} context;
 * @property {string} initial
 */

/**
 * @typedef {Object} Implementation
 * @property {{[actionName: string]: (ctx: object, event: any) => object}} actions
 */

/**
 * A simplified `createMachine` from `@xstate/fsm` with the following differences:
 *
 *  - the returned machine is technically a "service". No `interpret(machine).start()` is needed.
 *  - the state definition only support `on` and target must be declared with { target: 'nextState', actions: [] } explicitly.
 *  - event passed to `send` must be an object with `type` property.
 *  - actions implementation will be [assign action](https://xstate.js.org/docs/guides/context.html#assign-action) if you return any value.
 *  Do not return anything if you just want to invoke side effect.
 *
 * The goal of this custom function is to avoid installing the entire `'xstate/fsm'` package, while enabling modeling using
 * state machine. You can copy the first parameter into the editor at https://stately.ai/viz to visualize the state machine.
 *
 * @param {Options} options
 * @param {Implementation} implementation
 */
function createMachine(_ref, _ref2) {
  var states = _ref.states,
    context = _ref.context,
    initial = _ref.initial;
  var actions = _ref2.actions;
  var currentState = initial;
  var currentContext = context;
  return {
    send: function send(event) {
      var currentStateOn = states[currentState].on;
      var transitionConfig = currentStateOn && currentStateOn[event.type];
      if (transitionConfig) {
        currentState = transitionConfig.target;
        if (transitionConfig.actions) {
          transitionConfig.actions.forEach(function (actName) {
            var actionImpl = actions[actName];
            var nextContextValue = actionImpl && actionImpl(currentContext, event);
            if (nextContextValue) {
              currentContext = _objectSpread(_objectSpread({}, currentContext), nextContextValue);
            }
          });
        }
      }
    }
  };
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (createMachine);

/***/ }),

/***/ "./node_modules/webpack-dev-server/client/overlay/runtime-error.js":
/*!*************************************************************************!*\
  !*** ./node_modules/webpack-dev-server/client/overlay/runtime-error.js ***!
  \*************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   listenToRuntimeError: () => (/* binding */ listenToRuntimeError),
/* harmony export */   listenToUnhandledRejection: () => (/* binding */ listenToUnhandledRejection),
/* harmony export */   parseErrorToStacks: () => (/* binding */ parseErrorToStacks)
/* harmony export */ });
/**
 *
 * @param {Error} error
 */
function parseErrorToStacks(error) {
  if (!error || !(error instanceof Error)) {
    throw new Error("parseErrorToStacks expects Error object");
  }
  if (typeof error.stack === "string") {
    return error.stack.split("\n").filter(function (stack) {
      return stack !== "Error: ".concat(error.message);
    });
  }
}

/**
 * @callback ErrorCallback
 * @param {ErrorEvent} error
 * @returns {void}
 */

/**
 * @param {ErrorCallback} callback
 */
function listenToRuntimeError(callback) {
  window.addEventListener("error", callback);
  return function cleanup() {
    window.removeEventListener("error", callback);
  };
}

/**
 * @callback UnhandledRejectionCallback
 * @param {PromiseRejectionEvent} rejectionEvent
 * @returns {void}
 */

/**
 * @param {UnhandledRejectionCallback} callback
 */
function listenToUnhandledRejection(callback) {
  window.addEventListener("unhandledrejection", callback);
  return function cleanup() {
    window.removeEventListener("unhandledrejection", callback);
  };
}


/***/ }),

/***/ "./node_modules/webpack-dev-server/client/overlay/state-machine.js":
/*!*************************************************************************!*\
  !*** ./node_modules/webpack-dev-server/client/overlay/state-machine.js ***!
  \*************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _fsm_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./fsm.js */ "./node_modules/webpack-dev-server/client/overlay/fsm.js");


/**
 * @typedef {Object} ShowOverlayData
 * @property {'warning' | 'error'} level
 * @property {Array<string  | { moduleIdentifier?: string, moduleName?: string, loc?: string, message?: string }>} messages
 * @property {'build' | 'runtime'} messageSource
 */

/**
 * @typedef {Object} CreateOverlayMachineOptions
 * @property {(data: ShowOverlayData) => void} showOverlay
 * @property {() => void} hideOverlay
 */

/**
 * @param {CreateOverlayMachineOptions} options
 */
var createOverlayMachine = function createOverlayMachine(options) {
  var hideOverlay = options.hideOverlay,
    showOverlay = options.showOverlay;
  var overlayMachine = (0,_fsm_js__WEBPACK_IMPORTED_MODULE_0__["default"])({
    initial: "hidden",
    context: {
      level: "error",
      messages: [],
      messageSource: "build"
    },
    states: {
      hidden: {
        on: {
          BUILD_ERROR: {
            target: "displayBuildError",
            actions: ["setMessages", "showOverlay"]
          },
          RUNTIME_ERROR: {
            target: "displayRuntimeError",
            actions: ["setMessages", "showOverlay"]
          }
        }
      },
      displayBuildError: {
        on: {
          DISMISS: {
            target: "hidden",
            actions: ["dismissMessages", "hideOverlay"]
          },
          BUILD_ERROR: {
            target: "displayBuildError",
            actions: ["appendMessages", "showOverlay"]
          }
        }
      },
      displayRuntimeError: {
        on: {
          DISMISS: {
            target: "hidden",
            actions: ["dismissMessages", "hideOverlay"]
          },
          RUNTIME_ERROR: {
            target: "displayRuntimeError",
            actions: ["appendMessages", "showOverlay"]
          },
          BUILD_ERROR: {
            target: "displayBuildError",
            actions: ["setMessages", "showOverlay"]
          }
        }
      }
    }
  }, {
    actions: {
      dismissMessages: function dismissMessages() {
        return {
          messages: [],
          level: "error",
          messageSource: "build"
        };
      },
      appendMessages: function appendMessages(context, event) {
        return {
          messages: context.messages.concat(event.messages),
          level: event.level || context.level,
          messageSource: event.type === "RUNTIME_ERROR" ? "runtime" : "build"
        };
      },
      setMessages: function setMessages(context, event) {
        return {
          messages: event.messages,
          level: event.level || context.level,
          messageSource: event.type === "RUNTIME_ERROR" ? "runtime" : "build"
        };
      },
      hideOverlay: hideOverlay,
      showOverlay: showOverlay
    }
  });
  return overlayMachine;
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (createOverlayMachine);

/***/ }),

/***/ "./node_modules/webpack-dev-server/client/overlay/styles.js":
/*!******************************************************************!*\
  !*** ./node_modules/webpack-dev-server/client/overlay/styles.js ***!
  \******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   containerStyle: () => (/* binding */ containerStyle),
/* harmony export */   dismissButtonStyle: () => (/* binding */ dismissButtonStyle),
/* harmony export */   headerStyle: () => (/* binding */ headerStyle),
/* harmony export */   iframeStyle: () => (/* binding */ iframeStyle),
/* harmony export */   msgStyles: () => (/* binding */ msgStyles),
/* harmony export */   msgTextStyle: () => (/* binding */ msgTextStyle),
/* harmony export */   msgTypeStyle: () => (/* binding */ msgTypeStyle)
/* harmony export */ });
// styles are inspired by `react-error-overlay`

var msgStyles = {
  error: {
    backgroundColor: "rgba(206, 17, 38, 0.1)",
    color: "#fccfcf"
  },
  warning: {
    backgroundColor: "rgba(251, 245, 180, 0.1)",
    color: "#fbf5b4"
  }
};
var iframeStyle = {
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  width: "100vw",
  height: "100vh",
  border: "none",
  "z-index": 9999999999
};
var containerStyle = {
  position: "fixed",
  boxSizing: "border-box",
  left: 0,
  top: 0,
  right: 0,
  bottom: 0,
  width: "100vw",
  height: "100vh",
  fontSize: "large",
  padding: "2rem 2rem 4rem 2rem",
  lineHeight: "1.2",
  whiteSpace: "pre-wrap",
  overflow: "auto",
  backgroundColor: "rgba(0, 0, 0, 0.9)",
  color: "white"
};
var headerStyle = {
  color: "#e83b46",
  fontSize: "2em",
  whiteSpace: "pre-wrap",
  fontFamily: "sans-serif",
  margin: "0 2rem 2rem 0",
  flex: "0 0 auto",
  maxHeight: "50%",
  overflow: "auto"
};
var dismissButtonStyle = {
  color: "#ffffff",
  lineHeight: "1rem",
  fontSize: "1.5rem",
  padding: "1rem",
  cursor: "pointer",
  position: "absolute",
  right: 0,
  top: 0,
  backgroundColor: "transparent",
  border: "none"
};
var msgTypeStyle = {
  color: "#e83b46",
  fontSize: "1.2em",
  marginBottom: "1rem",
  fontFamily: "sans-serif"
};
var msgTextStyle = {
  lineHeight: "1.5",
  fontSize: "1rem",
  fontFamily: "Menlo, Consolas, monospace"
};


/***/ }),

/***/ "./node_modules/webpack-dev-server/client/socket.js":
/*!**********************************************************!*\
  !*** ./node_modules/webpack-dev-server/client/socket.js ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   client: () => (/* binding */ client),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _clients_WebSocketClient_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./clients/WebSocketClient.js */ "./node_modules/webpack-dev-server/client/clients/WebSocketClient.js");
/* harmony import */ var _utils_log_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utils/log.js */ "./node_modules/webpack-dev-server/client/utils/log.js");
/* provided dependency */ var __webpack_dev_server_client__ = __webpack_require__(/*! ./node_modules/webpack-dev-server/client/clients/WebSocketClient.js */ "./node_modules/webpack-dev-server/client/clients/WebSocketClient.js");
/* global __webpack_dev_server_client__ */




// this WebsocketClient is here as a default fallback, in case the client is not injected
/* eslint-disable camelcase */
var Client =
// eslint-disable-next-line no-nested-ternary
typeof __webpack_dev_server_client__ !== "undefined" ? typeof __webpack_dev_server_client__.default !== "undefined" ? __webpack_dev_server_client__.default : __webpack_dev_server_client__ : _clients_WebSocketClient_js__WEBPACK_IMPORTED_MODULE_0__["default"];
/* eslint-enable camelcase */

var retries = 0;
var maxRetries = 10;

// Initialized client is exported so external consumers can utilize the same instance
// It is mutable to enforce singleton
// eslint-disable-next-line import/no-mutable-exports
var client = null;

/**
 * @param {string} url
 * @param {{ [handler: string]: (data?: any, params?: any) => any }} handlers
 * @param {number} [reconnect]
 */
var socket = function initSocket(url, handlers, reconnect) {
  client = new Client(url);
  client.onOpen(function () {
    retries = 0;
    if (typeof reconnect !== "undefined") {
      maxRetries = reconnect;
    }
  });
  client.onClose(function () {
    if (retries === 0) {
      handlers.close();
    }

    // Try to reconnect.
    client = null;

    // After 10 retries stop trying, to prevent logspam.
    if (retries < maxRetries) {
      // Exponentially increase timeout to reconnect.
      // Respectfully copied from the package `got`.
      // eslint-disable-next-line no-restricted-properties
      var retryInMs = 1000 * Math.pow(2, retries) + Math.random() * 100;
      retries += 1;
      _utils_log_js__WEBPACK_IMPORTED_MODULE_1__.log.info("Trying to reconnect...");
      setTimeout(function () {
        socket(url, handlers, reconnect);
      }, retryInMs);
    }
  });
  client.onMessage(
  /**
   * @param {any} data
   */
  function (data) {
    var message = JSON.parse(data);
    if (handlers[message.type]) {
      handlers[message.type](message.data, message.params);
    }
  });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (socket);

/***/ }),

/***/ "./node_modules/webpack-dev-server/client/utils/createSocketURL.js":
/*!*************************************************************************!*\
  !*** ./node_modules/webpack-dev-server/client/utils/createSocketURL.js ***!
  \*************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/**
 * @param {{ protocol?: string, auth?: string, hostname?: string, port?: string, pathname?: string, search?: string, hash?: string, slashes?: boolean }} objURL
 * @returns {string}
 */
function format(objURL) {
  var protocol = objURL.protocol || "";
  if (protocol && protocol.substr(-1) !== ":") {
    protocol += ":";
  }
  var auth = objURL.auth || "";
  if (auth) {
    auth = encodeURIComponent(auth);
    auth = auth.replace(/%3A/i, ":");
    auth += "@";
  }
  var host = "";
  if (objURL.hostname) {
    host = auth + (objURL.hostname.indexOf(":") === -1 ? objURL.hostname : "[".concat(objURL.hostname, "]"));
    if (objURL.port) {
      host += ":".concat(objURL.port);
    }
  }
  var pathname = objURL.pathname || "";
  if (objURL.slashes) {
    host = "//".concat(host || "");
    if (pathname && pathname.charAt(0) !== "/") {
      pathname = "/".concat(pathname);
    }
  } else if (!host) {
    host = "";
  }
  var search = objURL.search || "";
  if (search && search.charAt(0) !== "?") {
    search = "?".concat(search);
  }
  var hash = objURL.hash || "";
  if (hash && hash.charAt(0) !== "#") {
    hash = "#".concat(hash);
  }
  pathname = pathname.replace(/[?#]/g,
  /**
   * @param {string} match
   * @returns {string}
   */
  function (match) {
    return encodeURIComponent(match);
  });
  search = search.replace("#", "%23");
  return "".concat(protocol).concat(host).concat(pathname).concat(search).concat(hash);
}

/**
 * @param {URL & { fromCurrentScript?: boolean }} parsedURL
 * @returns {string}
 */
function createSocketURL(parsedURL) {
  var hostname = parsedURL.hostname;

  // Node.js module parses it as `::`
  // `new URL(urlString, [baseURLString])` parses it as '[::]'
  var isInAddrAny = hostname === "0.0.0.0" || hostname === "::" || hostname === "[::]";

  // why do we need this check?
  // hostname n/a for file protocol (example, when using electron, ionic)
  // see: https://github.com/webpack/webpack-dev-server/pull/384
  if (isInAddrAny && self.location.hostname && self.location.protocol.indexOf("http") === 0) {
    hostname = self.location.hostname;
  }
  var socketURLProtocol = parsedURL.protocol || self.location.protocol;

  // When https is used in the app, secure web sockets are always necessary because the browser doesn't accept non-secure web sockets.
  if (socketURLProtocol === "auto:" || hostname && isInAddrAny && self.location.protocol === "https:") {
    socketURLProtocol = self.location.protocol;
  }
  socketURLProtocol = socketURLProtocol.replace(/^(?:http|.+-extension|file)/i, "ws");
  var socketURLAuth = "";

  // `new URL(urlString, [baseURLstring])` doesn't have `auth` property
  // Parse authentication credentials in case we need them
  if (parsedURL.username) {
    socketURLAuth = parsedURL.username;

    // Since HTTP basic authentication does not allow empty username,
    // we only include password if the username is not empty.
    if (parsedURL.password) {
      // Result: <username>:<password>
      socketURLAuth = socketURLAuth.concat(":", parsedURL.password);
    }
  }

  // In case the host is a raw IPv6 address, it can be enclosed in
  // the brackets as the brackets are needed in the final URL string.
  // Need to remove those as url.format blindly adds its own set of brackets
  // if the host string contains colons. That would lead to non-working
  // double brackets (e.g. [[::]]) host
  //
  // All of these web socket url params are optionally passed in through resourceQuery,
  // so we need to fall back to the default if they are not provided
  var socketURLHostname = (hostname || self.location.hostname || "localhost").replace(/^\[(.*)\]$/, "$1");
  var socketURLPort = parsedURL.port;
  if (!socketURLPort || socketURLPort === "0") {
    socketURLPort = self.location.port;
  }

  // If path is provided it'll be passed in via the resourceQuery as a
  // query param so it has to be parsed out of the querystring in order for the
  // client to open the socket to the correct location.
  var socketURLPathname = "/ws";
  if (parsedURL.pathname && !parsedURL.fromCurrentScript) {
    socketURLPathname = parsedURL.pathname;
  }
  return format({
    protocol: socketURLProtocol,
    auth: socketURLAuth,
    hostname: socketURLHostname,
    port: socketURLPort,
    pathname: socketURLPathname,
    slashes: true
  });
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (createSocketURL);

/***/ }),

/***/ "./node_modules/webpack-dev-server/client/utils/getCurrentScriptSource.js":
/*!********************************************************************************!*\
  !*** ./node_modules/webpack-dev-server/client/utils/getCurrentScriptSource.js ***!
  \********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/**
 * @returns {string}
 */
function getCurrentScriptSource() {
  // `document.currentScript` is the most accurate way to find the current script,
  // but is not supported in all browsers.
  if (document.currentScript) {
    return document.currentScript.getAttribute("src");
  }

  // Fallback to getting all scripts running in the document.
  var scriptElements = document.scripts || [];
  var scriptElementsWithSrc = Array.prototype.filter.call(scriptElements, function (element) {
    return element.getAttribute("src");
  });
  if (scriptElementsWithSrc.length > 0) {
    var currentScript = scriptElementsWithSrc[scriptElementsWithSrc.length - 1];
    return currentScript.getAttribute("src");
  }

  // Fail as there was no script to use.
  throw new Error("[webpack-dev-server] Failed to get current script source.");
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (getCurrentScriptSource);

/***/ }),

/***/ "./node_modules/webpack-dev-server/client/utils/log.js":
/*!*************************************************************!*\
  !*** ./node_modules/webpack-dev-server/client/utils/log.js ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   log: () => (/* binding */ log),
/* harmony export */   logEnabledFeatures: () => (/* binding */ logEnabledFeatures),
/* harmony export */   setLogLevel: () => (/* binding */ setLogLevel)
/* harmony export */ });
/* harmony import */ var _modules_logger_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../modules/logger/index.js */ "./node_modules/webpack-dev-server/client/modules/logger/index.js");
/* harmony import */ var _modules_logger_index_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_modules_logger_index_js__WEBPACK_IMPORTED_MODULE_0__);

var name = "webpack-dev-server";
// default level is set on the client side, so it does not need
// to be set by the CLI or API
var defaultLevel = "info";

// options new options, merge with old options
/**
 * @param {false | true | "none" | "error" | "warn" | "info" | "log" | "verbose"} level
 * @returns {void}
 */
function setLogLevel(level) {
  _modules_logger_index_js__WEBPACK_IMPORTED_MODULE_0___default().configureDefaultLogger({
    level: level
  });
}
setLogLevel(defaultLevel);
var log = _modules_logger_index_js__WEBPACK_IMPORTED_MODULE_0___default().getLogger(name);
var logEnabledFeatures = function logEnabledFeatures(features) {
  var enabledFeatures = Object.keys(features);
  if (!features || enabledFeatures.length === 0) {
    return;
  }
  var logString = "Server started:";

  // Server started: Hot Module Replacement enabled, Live Reloading enabled, Overlay disabled.
  for (var i = 0; i < enabledFeatures.length; i++) {
    var key = enabledFeatures[i];
    logString += " ".concat(key, " ").concat(features[key] ? "enabled" : "disabled", ",");
  }
  // replace last comma with a period
  logString = logString.slice(0, -1).concat(".");
  log.info(logString);
};


/***/ }),

/***/ "./node_modules/webpack-dev-server/client/utils/parseURL.js":
/*!******************************************************************!*\
  !*** ./node_modules/webpack-dev-server/client/utils/parseURL.js ***!
  \******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _getCurrentScriptSource_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./getCurrentScriptSource.js */ "./node_modules/webpack-dev-server/client/utils/getCurrentScriptSource.js");


/**
 * @param {string} resourceQuery
 * @returns {{ [key: string]: string | boolean }}
 */
function parseURL(resourceQuery) {
  /** @type {{ [key: string]: string }} */
  var options = {};
  if (typeof resourceQuery === "string" && resourceQuery !== "") {
    var searchParams = resourceQuery.slice(1).split("&");
    for (var i = 0; i < searchParams.length; i++) {
      var pair = searchParams[i].split("=");
      options[pair[0]] = decodeURIComponent(pair[1]);
    }
  } else {
    // Else, get the url from the <script> this file was called with.
    var scriptSource = (0,_getCurrentScriptSource_js__WEBPACK_IMPORTED_MODULE_0__["default"])();
    var scriptSourceURL;
    try {
      // The placeholder `baseURL` with `window.location.href`,
      // is to allow parsing of path-relative or protocol-relative URLs,
      // and will have no effect if `scriptSource` is a fully valid URL.
      scriptSourceURL = new URL(scriptSource, self.location.href);
    } catch (error) {
      // URL parsing failed, do nothing.
      // We will still proceed to see if we can recover using `resourceQuery`
    }
    if (scriptSourceURL) {
      options = scriptSourceURL;
      options.fromCurrentScript = true;
    }
  }
  return options;
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (parseURL);

/***/ }),

/***/ "./node_modules/webpack-dev-server/client/utils/reloadApp.js":
/*!*******************************************************************!*\
  !*** ./node_modules/webpack-dev-server/client/utils/reloadApp.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var webpack_hot_emitter_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! webpack/hot/emitter.js */ "./node_modules/webpack/hot/emitter.js");
/* harmony import */ var webpack_hot_emitter_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(webpack_hot_emitter_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _log_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./log.js */ "./node_modules/webpack-dev-server/client/utils/log.js");



/** @typedef {import("../index").Options} Options
/** @typedef {import("../index").Status} Status

/**
 * @param {Options} options
 * @param {Status} status
 */
function reloadApp(_ref, status) {
  var hot = _ref.hot,
    liveReload = _ref.liveReload;
  if (status.isUnloading) {
    return;
  }
  var currentHash = status.currentHash,
    previousHash = status.previousHash;
  var isInitial = currentHash.indexOf( /** @type {string} */previousHash) >= 0;
  if (isInitial) {
    return;
  }

  /**
   * @param {Window} rootWindow
   * @param {number} intervalId
   */
  function applyReload(rootWindow, intervalId) {
    clearInterval(intervalId);
    _log_js__WEBPACK_IMPORTED_MODULE_1__.log.info("App updated. Reloading...");
    rootWindow.location.reload();
  }
  var search = self.location.search.toLowerCase();
  var allowToHot = search.indexOf("webpack-dev-server-hot=false") === -1;
  var allowToLiveReload = search.indexOf("webpack-dev-server-live-reload=false") === -1;
  if (hot && allowToHot) {
    _log_js__WEBPACK_IMPORTED_MODULE_1__.log.info("App hot update...");
    webpack_hot_emitter_js__WEBPACK_IMPORTED_MODULE_0___default().emit("webpackHotUpdate", status.currentHash);
    if (typeof self !== "undefined" && self.window) {
      // broadcast update to window
      self.postMessage("webpackHotUpdate".concat(status.currentHash), "*");
    }
  }
  // allow refreshing the page only if liveReload isn't disabled
  else if (liveReload && allowToLiveReload) {
    var rootWindow = self;

    // use parent window for reload (in case we're in an iframe with no valid src)
    var intervalId = self.setInterval(function () {
      if (rootWindow.location.protocol !== "about:") {
        // reload immediately if protocol is valid
        applyReload(rootWindow, intervalId);
      } else {
        rootWindow = rootWindow.parent;
        if (rootWindow.parent === rootWindow) {
          // if parent equals current window we've reached the root which would continue forever, so trigger a reload anyways
          applyReload(rootWindow, intervalId);
        }
      }
    });
  }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (reloadApp);

/***/ }),

/***/ "./node_modules/webpack-dev-server/client/utils/sendMessage.js":
/*!*********************************************************************!*\
  !*** ./node_modules/webpack-dev-server/client/utils/sendMessage.js ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* global __resourceQuery WorkerGlobalScope */

// Send messages to the outside, so plugins can consume it.
/**
 * @param {string} type
 * @param {any} [data]
 */
function sendMsg(type, data) {
  if (typeof self !== "undefined" && (typeof WorkerGlobalScope === "undefined" || !(self instanceof WorkerGlobalScope))) {
    self.postMessage({
      type: "webpack".concat(type),
      data: data
    }, "*");
  }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (sendMsg);

/***/ }),

/***/ "./node_modules/webpack-dev-server/client/utils/stripAnsi.js":
/*!*******************************************************************!*\
  !*** ./node_modules/webpack-dev-server/client/utils/stripAnsi.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
var ansiRegex = new RegExp(["[\\u001B\\u009B][[\\]()#;?]*(?:(?:(?:(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]+)*|[a-zA-Z\\d]+(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]*)*)?\\u0007)", "(?:(?:\\d{1,4}(?:;\\d{0,4})*)?[\\dA-PR-TZcf-nq-uy=><~]))"].join("|"), "g");

/**
 *
 * Strip [ANSI escape codes](https://en.wikipedia.org/wiki/ANSI_escape_code) from a string.
 * Adapted from code originally released by Sindre Sorhus
 * Licensed the MIT License
 *
 * @param {string} string
 * @return {string}
 */
function stripAnsi(string) {
  if (typeof string !== "string") {
    throw new TypeError("Expected a `string`, got `".concat(typeof string, "`"));
  }
  return string.replace(ansiRegex, "");
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (stripAnsi);

/***/ }),

/***/ "./node_modules/webpack/hot/dev-server.js":
/*!************************************************!*\
  !*** ./node_modules/webpack/hot/dev-server.js ***!
  \************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
/* globals __webpack_hash__ */
if (true) {
	/** @type {undefined|string} */
	var lastHash;
	var upToDate = function upToDate() {
		return /** @type {string} */ (lastHash).indexOf(__webpack_require__.h()) >= 0;
	};
	var log = __webpack_require__(/*! ./log */ "./node_modules/webpack/hot/log.js");
	var check = function check() {
		module.hot
			.check(true)
			.then(function (updatedModules) {
				if (!updatedModules) {
					log(
						"warning",
						"[HMR] Cannot find update. " +
							(typeof window !== "undefined"
								? "Need to do a full reload!"
								: "Please reload manually!")
					);
					log(
						"warning",
						"[HMR] (Probably because of restarting the webpack-dev-server)"
					);
					if (typeof window !== "undefined") {
						window.location.reload();
					}
					return;
				}

				if (!upToDate()) {
					check();
				}

				__webpack_require__(/*! ./log-apply-result */ "./node_modules/webpack/hot/log-apply-result.js")(updatedModules, updatedModules);

				if (upToDate()) {
					log("info", "[HMR] App is up to date.");
				}
			})
			.catch(function (err) {
				var status = module.hot.status();
				if (["abort", "fail"].indexOf(status) >= 0) {
					log(
						"warning",
						"[HMR] Cannot apply update. " +
							(typeof window !== "undefined"
								? "Need to do a full reload!"
								: "Please reload manually!")
					);
					log("warning", "[HMR] " + log.formatError(err));
					if (typeof window !== "undefined") {
						window.location.reload();
					}
				} else {
					log("warning", "[HMR] Update failed: " + log.formatError(err));
				}
			});
	};
	var hotEmitter = __webpack_require__(/*! ./emitter */ "./node_modules/webpack/hot/emitter.js");
	hotEmitter.on("webpackHotUpdate", function (currentHash) {
		lastHash = currentHash;
		if (!upToDate() && module.hot.status() === "idle") {
			log("info", "[HMR] Checking for updates on the server...");
			check();
		}
	});
	log("info", "[HMR] Waiting for update signal from WDS...");
} else {}


/***/ }),

/***/ "./node_modules/webpack/hot/emitter.js":
/*!*********************************************!*\
  !*** ./node_modules/webpack/hot/emitter.js ***!
  \*********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var EventEmitter = __webpack_require__(/*! events */ "./node_modules/events/events.js");
module.exports = new EventEmitter();


/***/ }),

/***/ "./node_modules/webpack/hot/log-apply-result.js":
/*!******************************************************!*\
  !*** ./node_modules/webpack/hot/log-apply-result.js ***!
  \******************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/

/**
 * @param {(string | number)[]} updatedModules updated modules
 * @param {(string | number)[] | null} renewedModules renewed modules
 */
module.exports = function (updatedModules, renewedModules) {
	var unacceptedModules = updatedModules.filter(function (moduleId) {
		return renewedModules && renewedModules.indexOf(moduleId) < 0;
	});
	var log = __webpack_require__(/*! ./log */ "./node_modules/webpack/hot/log.js");

	if (unacceptedModules.length > 0) {
		log(
			"warning",
			"[HMR] The following modules couldn't be hot updated: (They would need a full reload!)"
		);
		unacceptedModules.forEach(function (moduleId) {
			log("warning", "[HMR]  - " + moduleId);
		});
	}

	if (!renewedModules || renewedModules.length === 0) {
		log("info", "[HMR] Nothing hot updated.");
	} else {
		log("info", "[HMR] Updated modules:");
		renewedModules.forEach(function (moduleId) {
			if (typeof moduleId === "string" && moduleId.indexOf("!") !== -1) {
				var parts = moduleId.split("!");
				log.groupCollapsed("info", "[HMR]  - " + parts.pop());
				log("info", "[HMR]  - " + moduleId);
				log.groupEnd("info");
			} else {
				log("info", "[HMR]  - " + moduleId);
			}
		});
		var numberIds = renewedModules.every(function (moduleId) {
			return typeof moduleId === "number";
		});
		if (numberIds)
			log(
				"info",
				'[HMR] Consider using the optimization.moduleIds: "named" for module names.'
			);
	}
};


/***/ }),

/***/ "./node_modules/webpack/hot/log.js":
/*!*****************************************!*\
  !*** ./node_modules/webpack/hot/log.js ***!
  \*****************************************/
/***/ ((module) => {

/** @typedef {"info" | "warning" | "error"} LogLevel */

/** @type {LogLevel} */
var logLevel = "info";

function dummy() {}

/**
 * @param {LogLevel} level log level
 * @returns {boolean} true, if should log
 */
function shouldLog(level) {
	var shouldLog =
		(logLevel === "info" && level === "info") ||
		(["info", "warning"].indexOf(logLevel) >= 0 && level === "warning") ||
		(["info", "warning", "error"].indexOf(logLevel) >= 0 && level === "error");
	return shouldLog;
}

/**
 * @param {(msg?: string) => void} logFn log function
 * @returns {(level: LogLevel, msg?: string) => void} function that logs when log level is sufficient
 */
function logGroup(logFn) {
	return function (level, msg) {
		if (shouldLog(level)) {
			logFn(msg);
		}
	};
}

/**
 * @param {LogLevel} level log level
 * @param {string|Error} msg message
 */
module.exports = function (level, msg) {
	if (shouldLog(level)) {
		if (level === "info") {
			console.log(msg);
		} else if (level === "warning") {
			console.warn(msg);
		} else if (level === "error") {
			console.error(msg);
		}
	}
};

var group = console.group || dummy;
var groupCollapsed = console.groupCollapsed || dummy;
var groupEnd = console.groupEnd || dummy;

module.exports.group = logGroup(group);

module.exports.groupCollapsed = logGroup(groupCollapsed);

module.exports.groupEnd = logGroup(groupEnd);

/**
 * @param {LogLevel} level log level
 */
module.exports.setLogLevel = function (level) {
	logLevel = level;
};

/**
 * @param {Error} err error
 * @returns {string} formatted error
 */
module.exports.formatError = function (err) {
	var message = err.message;
	var stack = err.stack;
	if (!stack) {
		return message;
	} else if (stack.indexOf(message) < 0) {
		return message + "\n" + stack;
	} else {
		return stack;
	}
};


/***/ }),

/***/ "./src/scripts/animations.js":
/*!***********************************!*\
  !*** ./src/scripts/animations.js ***!
  \***********************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   animateElements: () => (/* binding */ animateElements)
/* harmony export */ });
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils.js */ "./src/scripts/utils.js");
/* harmony import */ var _steps_track_curved_track_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./steps-track/curved-track.js */ "./src/scripts/steps-track/curved-track.js");
/* harmony import */ var _steps_track_straight_track_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./steps-track/straight-track.js */ "./src/scripts/steps-track/straight-track.js");
/* harmony import */ var _steps_track_steps_line_vars_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./steps-track/steps-line-vars.js */ "./src/scripts/steps-track/steps-line-vars.js");





//let stepsLine.startY, stepsLine.endY, stepsLine.pathLength;


function animNumber(numObj, duration) {
  const num = parseInt(numObj.innerHTML.replace(" ", ""), 10);
  let startTime;

  const step = (timestamp) => {
    if (startTime === undefined) startTime = timestamp;
    const progress = parseFloat(
      Math.min((timestamp - startTime) / duration, 1).toFixed(2)
    );
    numObj.innerHTML =
      Math.floor(progress * num).toLocaleString("ru-RU", {
        useGrouping: true,
      }) + "+";

    if (progress < 1) {
      window.requestAnimationFrame(step);
    }
  };
  window.requestAnimationFrame(step);
}

function animateElements(elements, targetPosition, handlerFunc) {
  let elementsClassesCount = {};
  elements.forEach((element) => {
    if (element.classList.contains("scrolled-in")) {
      return;
    }
   // const elementPosition = element.getBoundingClientRect().top;
    if ((0,_utils_js__WEBPACK_IMPORTED_MODULE_0__.inTarget)(element, targetPosition)/*elementPosition <= targetPosition*/) {
      const elementClass = element.classList[0];

      if (elementClass in elementsClassesCount) {
        setTimeout(() => {
          element.classList.add("scrolled-in");
        }, 100 * elementsClassesCount[elementClass]);
        elementsClassesCount[elementClass] += 1;
      } else {
        elementsClassesCount[elementClass] = 1;
        element.classList.add("scrolled-in");
      }

      if (element.classList.contains("promo__statistics")) {
        element
          .querySelectorAll(".promo__statistics-description")
          .forEach((el) => {
            animNumber(el, 2500);
          });
      }
      if (element.classList.contains("animate-childs")) {
        const children = element.children;
        for (let child of children) {
          /*if (child.classList.contains("line-start")) {
            const currentScrollPosition = window.scrollY;
            const animateArguments = [
              currentScrollPosition,
              stepsLine.startY,
              stepsLine.endY,
              stepsLine.pathLength,
            ];
            const animateFunction =
              getMainWidth() <= 1300
                ? animateStraightStepsTrack
                : animateCurvedStepsTrack;

            const throttledAnimateStepsTrack = throttle(() => {
              animateFunction(...animateArguments, throttledAnimateStepsTrack);
            }, 50);

            window.addEventListener("scroll", throttledAnimateStepsTrack);
          }*/
          child.classList.add("scrolled-in");
        }
      }
    }
    if (
      window.scrollY >
      document.documentElement.scrollHeight -
        document.documentElement.clientHeight * 1.2
    ) {
      elements[elements.length - 1].classList.add("scrolled-in");

      //window.removeEventListener("scroll", handlerFunc);
    }
  });
}


/***/ }),

/***/ "./src/scripts/burger-menu.js":
/*!************************************!*\
  !*** ./src/scripts/burger-menu.js ***!
  \************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   burgerMenuHandler: () => (/* binding */ burgerMenuHandler)
/* harmony export */ });
  const headerHeight = `${
    document.querySelector(".page-header").offsetHeight
  }px`;
  
  document
    .querySelector(":root")
    .style.setProperty("--header-hight", `${headerHeight}`);

  const burgerButton = document.querySelector(".page-header__burger-button");
  function menuHandler(menuSelector) {
    menu.onclick = (e) => {
      document.documentElement.classList.remove("stop-scroll");
      menu.classList.toggle(`${menuSelector}_open`);
      burgerButton.classList.toggle("page-header__burger-button_open");
      e.preventDefault();
      const targetId = e.target.getAttribute("href");
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: "smooth" });
      }
    };
  }

  function burgerMenuHandler(mainWidth) {
  burgerButton.addEventListener(
    "click",
    (e) => {
      console.log("клик на кнопку в обработчике кнопки");
      const menu =
      mainWidth <= 680
          ? document.querySelector(".page-header__menu")
          : document.querySelector(".page-header__nav");
      //menu.style.top = headerHeight;
      /*e.stopPropagation(); // todo такое себе решение (при клике на кнопку вешать обработчик на document и уже в нем обрабатывать и кнопку и тап по ссылке и окну?)
    burgerButton.classList.toggle("page-header__burger-button_open"); // вынести в функцию menuToggle
    document.documentElement.classList.toggle("stop-scroll");
    menu.classList.toggle(`${menu.classList[0]}_open`);*/
      //burgerButton.onclick = null;
      document.addEventListener(
        "click",
        (e) => {
          console.log("событие click в обработчике документа");
          if (
            !e.target.closest(".page-header__burger-button") &&
            !menu.classList.contains(`${menu.classList[0]}_open`)
          ) {
            console.log("клик не на кнопку при закрытом меню");
            return;
          }
          // todo при клике после открытия срабатывает со 2го раза
          burgerButton.classList.toggle("page-header__burger-button_open");
          document.documentElement.classList.toggle("stop-scroll");
          menu.classList.toggle(`${menu.classList[0]}_open`);

          if (e.target.closest(".page-header__nav-list")) {
            console.log("клик на ссылку в меню");
            e.preventDefault();
            document
              .querySelector(e.target.getAttribute("href"))
              .scrollIntoView({ behavior: "smooth" });
          }
        }
        //{ once: true }
      );
    },
    { once: true }
  );
 }

/***/ }),

/***/ "./src/scripts/feedback-slider.js":
/*!****************************************!*\
  !*** ./src/scripts/feedback-slider.js ***!
  \****************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   feedbackSliderHandler: () => (/* binding */ feedbackSliderHandler)
/* harmony export */ });
const slidesList = document.querySelector(".feedback__list"),
slides = slidesList.children,
leftButton = document.querySelector(".feedback >.slider-button_left"),
rightButton = document.querySelector(".feedback > .slider-button_right"),
transitionTime = "1s";

let inAction = false;

function movLeft(amountSlidesOnList, offset, gapValue) {
slidesList.ontransitionend = () => {
  slidesList.ontransitionend = null;
  slidesList.style.transition = "none";

  for (let i = 0; i < amountSlidesOnList; i++) {
    slidesList.append(slides[0]);
  }
  slidesList.style.transform = `translateX(${-offset}px)`;

  inAction = false;
};
slidesList.style.transition = transitionTime;
slidesList.style.transform = `translateX(${-offset * 2 - gapValue}px)`;
}
function movRight(amountSlidesOnList, offset, gapValue) {
slidesList.ontransitionend = () => {
  slidesList.ontransitionend = null;
  slidesList.style.transition = "none";

  for (let i = 0; i < amountSlidesOnList; i++) {
    slidesList.prepend(slidesList.lastElementChild);
  }
  slidesList.style.transform = `translateX(${-offset}px)`;

  inAction = false;
};

slidesList.style.transition = transitionTime;
slidesList.style.transform = `translateX(${gapValue}px)`;
}

function feedbackSliderHandler() {
//let MutObserver = new MutationObserver (() => {
 const slideWidth = slides[0].offsetWidth,
  slidesListWidth = slidesList.offsetWidth,
  gapValue =
    (slidesListWidth / 100) *
    parseFloat(getComputedStyle(slidesList).gap),
  amountSlidesOnList = Math.floor(slidesListWidth / (slideWidth + gapValue)),
  /*slideListsAmount = Math.ceil(slides.length / amountSlidesOnList),*/
  offset = 4 * slideWidth + 3 * gapValue;

  // Initialize slider start position
slidesList.style.transform = `translateX(${-offset}px)`;

  rightButton.onclick = () => { // todo повторяется от hero slider? унифицировать через отдельный модуль?
    if (inAction) return;
    inAction = true;
    movLeft(amountSlidesOnList, offset, gapValue);
  };
  leftButton.onclick = () => { // todo повторяется от hero slider? унифицировать через отдельный модуль?
    if (inAction) return;
    inAction = true;
    movRight(amountSlidesOnList, offset, gapValue);
  };
  //})

 // MutObserver.observe(document.documentElement, {attributeFilter: ["class"]});
}



/***/ }),

/***/ "./src/scripts/hero-slider.js":
/*!************************************!*\
  !*** ./src/scripts/hero-slider.js ***!
  \************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   heroSliderHandler: () => (/* binding */ heroSliderHandler)
/* harmony export */ });
const slidesWrapper = document.querySelector(".slider__slides-list"),
  activSlideWidth = parseInt(
    getComputedStyle(
      document.querySelector(".hero__slider")
    ).gridTemplateColumns.split(" ")[0],
    10
  ),
  gapValue = parseInt(getComputedStyle(slidesWrapper).gap),
  slides = slidesWrapper.children,
  slideWidth = slides[0].offsetWidth,
  initialOffset = slideWidth * 2 + gapValue - activSlideWidth,
  offset = slideWidth + gapValue,
  transitionTime = "0.3s",
  slideScale =
    "translate(-12.5%, calc(12.5% - 16px)) scale(1.25)",
  left = document.querySelector(".slider-button_left"),
  right = document.querySelector(".slider-button_right");

let inAction = false;

function movLeft(slidesWrapper, offset) {
  slidesWrapper.ontransitionend = () => {
    slidesWrapper.ontransitionend = null;
    slidesWrapper.style.transition = "none";
    slides[0].removeAttribute("style");

    slidesWrapper.append(slides[0]);
    slidesWrapper.style.transform = `translateX(${-initialOffset}px)`;

    inAction = false;
  };
  slidesWrapper.style.transition = transitionTime; //todo задавать transition через запятую всем сразу?
  slidesWrapper.style.transform = `translateX(${-offset - initialOffset}px)`;

  slides[1].style.transition = transitionTime;
  slides[1].style.opacity = 0;
  slides[1].style.transform = "translate(0)"; // scale(0.3)

  slides[2].style.transition = transitionTime;
  slides[2].style.transform = slideScale;
  slides[2].style.transitionTimingFunction = "cubic-bezier(.72,.07,.95,.7)"; //.75,0,1,.02 ease-in
}
function movRight(slidesWrapper, offset) {
  slidesWrapper.ontransitionend = () => {
    slidesWrapper.ontransitionend = null;
    slidesWrapper.style.transition = "none";
    slides[1].removeAttribute("style");

    slidesWrapper.lastElementChild.style.opacity = 0;
    slidesWrapper.prepend(slidesWrapper.lastElementChild);
    slidesWrapper.style.transform = `translateX(${-initialOffset}px)`;

    inAction = false;
  };
  slidesWrapper.style.transition = transitionTime;
  slidesWrapper.style.transform = `translateX(${offset - initialOffset}px)`;

  slides[0].style.transition = transitionTime;
  slides[0].style.opacity = 1;
  slides[0].style.transform = slideScale;
  slides[0].style.transitionTimingFunction = "ease-in";

  slides[1].style.transition = transitionTime;
  slides[1].style.transform = "translate(0) scale(1)";
  slides[1].style.transitionTimingFunction = "cubic-bezier(0,.75,.02,1)"; //0,.75,.02,1  // 0,0,.02,1 // .75,0,1,.02
}

function heroSliderHandler() {
  // Initialize slider start position
  slidesWrapper.style.transform = `translateX(${-initialOffset}px)`;
  slides[0].style.opacity = 0;
  slides[1].style.transform = slideScale;

  left.onclick = () => {
    if (inAction) return;
    inAction = true;
    movRight(slidesWrapper, offset);
  };
  right.onclick = () => {
    if (inAction) return;
    inAction = true;
    movLeft(slidesWrapper, offset);
  };
}


/***/ }),

/***/ "./src/scripts/img-thumbnails.js":
/*!***************************************!*\
  !*** ./src/scripts/img-thumbnails.js ***!
  \***************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   imgThumbnailsHandler: () => (/* binding */ imgThumbnailsHandler)
/* harmony export */ });
function swapPlaceholder(picture) {
  const img = picture.querySelector("img");
  const sources = picture.querySelectorAll("source");

  img.onload = () => {
    picture.dataset.loaded = true;
    //img. removeAttribute("")
  };
  img.onerror = () => {
    picture.dataset.loaded = false;
  };
  sources.forEach((source) => {
    source.srcset = source.dataset.srcset;
    source.sizes = source.dataset.sizes;
  });
  img.srcset = img.dataset.srcset;
  img.sizes = img.dataset.sizes;
  //img.src = img.dataset.srcset.match(/, (.*) .+$/)[1]; // todo при единственном варианте выбрасывает null
  const srcsetArr = img.dataset.srcset.split(" ");
  img.src = srcsetArr[srcsetArr.length - 2];
  //console.log(srcsetArr, srcsetArr[srcsetArr.length - 2]);
}

const pictures = document.querySelectorAll("picture");

const callback = (entries, observer) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      swapPlaceholder(entry.target);
      //console.log(entry.target);
      observer.unobserve(entry.target);
    }
  });
};

function imgThumbnailsHandler() {
  const observer = new IntersectionObserver(callback);

pictures.forEach((picture) => {
  observer.observe(picture);
});
}

/***/ }),

/***/ "./src/scripts/index.js":
/*!******************************!*\
  !*** ./src/scripts/index.js ***!
  \******************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils.js */ "./src/scripts/utils.js");
/* harmony import */ var _animations_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./animations.js */ "./src/scripts/animations.js");
/* harmony import */ var _steps_track_curved_track_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./steps-track/curved-track.js */ "./src/scripts/steps-track/curved-track.js");
/* harmony import */ var _steps_track_straight_track_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./steps-track/straight-track.js */ "./src/scripts/steps-track/straight-track.js");
/* harmony import */ var _img_thumbnails_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./img-thumbnails.js */ "./src/scripts/img-thumbnails.js");
/* harmony import */ var _burger_menu_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./burger-menu.js */ "./src/scripts/burger-menu.js");
/* harmony import */ var _hero_slider_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./hero-slider.js */ "./src/scripts/hero-slider.js");
/* harmony import */ var _feedback_slider_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./feedback-slider.js */ "./src/scripts/feedback-slider.js");
/* harmony import */ var _steps_track_steps_line_vars_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./steps-track/steps-line-vars.js */ "./src/scripts/steps-track/steps-line-vars.js");













const mainWidth = (0,_utils_js__WEBPACK_IMPORTED_MODULE_0__.getMainWidth)();

(0,_img_thumbnails_js__WEBPACK_IMPORTED_MODULE_4__.imgThumbnailsHandler)();

window.addEventListener("load", () => {
  const preloader = document.querySelector(".preloader");

  preloader.ontransitionend = () => {
    preloader.ontransitionend = null;
    document.documentElement.classList.remove("stop-scroll");
    preloader.remove();

    if (mainWidth <= 1300) {
      (0,_steps_track_straight_track_js__WEBPACK_IMPORTED_MODULE_3__.addStraightTrack)();
    } else {
      (0,_steps_track_curved_track_js__WEBPACK_IMPORTED_MODULE_2__.addCurvedTrack)();
    }
    if (mainWidth <= 1250) {
      (0,_burger_menu_js__WEBPACK_IMPORTED_MODULE_5__.burgerMenuHandler)(mainWidth);
    }
    if (mainWidth > 1200) {
      (0,_feedback_slider_js__WEBPACK_IMPORTED_MODULE_7__.feedbackSliderHandler)();
    }
    if (mainWidth > 800) {
      (0,_hero_slider_js__WEBPACK_IMPORTED_MODULE_6__.heroSliderHandler)();
    }

    /*const er = () => {
      console.log("error");
    };

    window.addEventListener("scroll", () => {
      er();
    });*/

    // Инициализация анимаций
    const animationElements = document.querySelectorAll(".animate"); // todo? поменять на byclassname :not scrolled чтобы коллекция обновлялась сама?
    const targetPosition = document.documentElement.clientHeight * 0.8;

    (0,_animations_js__WEBPACK_IMPORTED_MODULE_1__.animateElements)(animationElements, targetPosition);

    const stepsTrackAnimateFunction =
    mainWidth <= 1300
      ? _steps_track_straight_track_js__WEBPACK_IMPORTED_MODULE_3__.animateStraightStepsTrack
      : _steps_track_curved_track_js__WEBPACK_IMPORTED_MODULE_2__.animateCurvedStepsTrack;

    const throttledScrollAnimationHandler = (0,_utils_js__WEBPACK_IMPORTED_MODULE_0__.throttle)(() => {

      const scroll = (0,_utils_js__WEBPACK_IMPORTED_MODULE_0__.scrollData)();
      if(scroll.direction === "down"){
        (0,_utils_js__WEBPACK_IMPORTED_MODULE_0__.throttle)((0,_animations_js__WEBPACK_IMPORTED_MODULE_1__.animateElements)(
          animationElements,
          targetPosition), 100)
      }
      if((0,_utils_js__WEBPACK_IMPORTED_MODULE_0__.inTarget)(document.querySelector(".line-start"), targetPosition)){
        console.log("Сработал start-lite");
        stepsTrackAnimateFunction(_steps_track_steps_line_vars_js__WEBPACK_IMPORTED_MODULE_8__.stepsLine.startY - targetPosition, _steps_track_steps_line_vars_js__WEBPACK_IMPORTED_MODULE_8__.stepsLine.startY,
          _steps_track_steps_line_vars_js__WEBPACK_IMPORTED_MODULE_8__.stepsLine.endY,
          _steps_track_steps_line_vars_js__WEBPACK_IMPORTED_MODULE_8__.stepsLine.pathLength);
      }
    }, 50);
    
      window.addEventListener("scroll", throttledScrollAnimationHandler);

    //let lastScrollPosition = 0;
    /*const throttledAnimateElements = throttle(animateElements, 200);*/

    /*const throttledAnimateElements = throttle(() => {
      console.log(scrollData());
      // todo вынести проверку направления скролла, тут должна быть только функция
      const currentScrollPosition = window.scrollY;
      if (currentScrollPosition > lastScrollPosition) {
        animateElements(
          animationElements,
          targetPosition,
          throttledAnimateElements
        );
      }
      lastScrollPosition = currentScrollPosition;
    }, 100);

    window.addEventListener("scroll", throttledAnimateElements);
    */
  };
  preloader.classList.add("preloader_hide"); //todo перенести после transitionend? потому что сначала запускаем анимацию а потом только добавляем событие?
});

//window.onload = ;


/***/ }),

/***/ "./src/scripts/steps-track/curved-track.js":
/*!*************************************************!*\
  !*** ./src/scripts/steps-track/curved-track.js ***!
  \*************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   addCurvedTrack: () => (/* binding */ addCurvedTrack),
/* harmony export */   animateCurvedStepsTrack: () => (/* binding */ animateCurvedStepsTrack)
/* harmony export */ });
/* harmony import */ var _triangle_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./triangle.js */ "./src/scripts/steps-track/triangle.js");
/* harmony import */ var _steps_line_vars_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./steps-line-vars.js */ "./src/scripts/steps-track/steps-line-vars.js");


function addCurvedTrack() {
    const stepsSection = document.querySelector(".steps");
    const initialX = stepsSection.getBoundingClientRect().x;
    const initialY = stepsSection.getBoundingClientRect().y + window.scrollY;
    const controlPointOffsetY = 533;
    const markers = document.querySelectorAll(".marker");
    const markersCenterCoords = [];
  
    markers.forEach((marker) => {
      // todo передавать уже getBoundingClientRect чтобы каждый раз не вызывать
      const markerRect = marker.getBoundingClientRect();
      let centerCoords = {};
  
      centerCoords.x = markerRect.x - initialX + markerRect.width / 2;
      centerCoords.y =
        markerRect.y - initialY + markerRect.height / 2 + window.scrollY;
  
      markersCenterCoords.push(centerCoords); // todo пушить сразу {} без создания переменных
    });
    _steps_line_vars_js__WEBPACK_IMPORTED_MODULE_1__.stepsLine.startY = markersCenterCoords[0].y + initialY;
    _steps_line_vars_js__WEBPACK_IMPORTED_MODULE_1__.stepsLine.endY =
      markersCenterCoords[markersCenterCoords.length - 1].y + initialY;
  
    const NSstring = "http://www.w3.org/2000/svg";
    const svg = document.createElementNS(NSstring, "svg");
    svg.setAttribute("class", "steps__track");
    const path = document.createElementNS(NSstring, "path");
    path.setAttribute("class", "steps__main-track");
    let d = `M ${markersCenterCoords[0].x} ${markersCenterCoords[0].y}`;
    for (let i = 1; i < markersCenterCoords.length; i++) {
      d += `C${markersCenterCoords[i - 1].x} ${
        markersCenterCoords[i - 1].y + controlPointOffsetY
      } ${markersCenterCoords[i].x} ${
        markersCenterCoords[i].y - controlPointOffsetY
      } ${markersCenterCoords[i].x} ${markersCenterCoords[i].y}`;
    }
    path.setAttribute("d", d);
    path.setAttribute("fill", "none");
    _steps_line_vars_js__WEBPACK_IMPORTED_MODULE_1__.stepsLine.pathLength = Math.round(path.getTotalLength());
    path.setAttribute("stroke-dasharray", _steps_line_vars_js__WEBPACK_IMPORTED_MODULE_1__.stepsLine.pathLength);
    path.setAttribute("stroke-dashoffset", _steps_line_vars_js__WEBPACK_IMPORTED_MODULE_1__.stepsLine.pathLength);
    svg.appendChild(path);
    svg.appendChild(
      (0,_triangle_js__WEBPACK_IMPORTED_MODULE_0__.addTriangle)(
        markersCenterCoords[0].x,
        markersCenterCoords[0].y,
        15 /*, svg*/
      )
    );
  
    stepsSection.appendChild(svg);
  }

  function animateCurvedStepsTrack(
    startScrollPosition,
    startPoint,
    endPoint,
    pathLenght,
    handlerFunc
  ) {
    const trackPath = document.querySelector(".steps__main-track");
    const lineHeight = endPoint - startPoint;
    const lineScrollProgres = (window.scrollY - startScrollPosition) / lineHeight;
    
    console.log("window.scrollY " + window.scrollY);
    console.log("startScrollPosition " + startScrollPosition);
    console.log("lineHeight " + lineHeight);
    console.log("lineScrollProgres " + lineScrollProgres);
    console.log("-------------------------------------");
    let offset = pathLenght * (1 - lineScrollProgres);
  
    if (offset < 0) {
      offset = 0;
      //window.removeEventListener("scroll", handlerFunc);
    }
    trackPath.setAttribute("stroke-dashoffset", offset);
    (0,_triangle_js__WEBPACK_IMPORTED_MODULE_0__.moveTriangleAlongCurve)(
      document.querySelector(".steps__track-arrow"),
      trackPath,
      pathLenght,
      offset
    );
  }

/***/ }),

/***/ "./src/scripts/steps-track/steps-line-vars.js":
/*!****************************************************!*\
  !*** ./src/scripts/steps-track/steps-line-vars.js ***!
  \****************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   stepsLine: () => (/* binding */ stepsLine)
/* harmony export */ });
let stepsLine = {startY: "", endY:"", pathLength:""};

/***/ }),

/***/ "./src/scripts/steps-track/straight-track.js":
/*!***************************************************!*\
  !*** ./src/scripts/steps-track/straight-track.js ***!
  \***************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   addStraightTrack: () => (/* binding */ addStraightTrack),
/* harmony export */   animateStraightStepsTrack: () => (/* binding */ animateStraightStepsTrack)
/* harmony export */ });
/* harmony import */ var _triangle_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./triangle.js */ "./src/scripts/steps-track/triangle.js");
/* harmony import */ var _steps_line_vars_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./steps-line-vars.js */ "./src/scripts/steps-track/steps-line-vars.js");


function addStraightTrack() {
    const stepsSection = document.querySelector(".steps");
    const gap = parseInt(
      window
        .getComputedStyle(stepsSection.querySelector(".steps__list"))
        .getPropertyValue("gap")
    );
    const initialX = stepsSection.getBoundingClientRect().x;
    const initialY = stepsSection.getBoundingClientRect().y + window.scrollY;
    //console.log(stepsSection.getBoundingClientRect(), window.scrollY);
    let markersRect = [];
    const markersCoords = [];
  
    const firstMarkerRect = document
      .querySelector(".marker")
      .getBoundingClientRect();
    markersRect.push(firstMarkerRect);
  
    const linePadding = firstMarkerRect.height / 2 - 5; // todo отнимание 5 убирает зазор между линией и маркером (костыльно)
  
    /*const firstMarkerCoords = {
      x: firstMarkerRect.x - initialX + firstMarkerRect.width / 2,
      y: firstMarkerRect.y - initialY,
    };
    firstMarkerCoords.push(markersCoords);*/
  
    const lastMarkerRect = document
      .querySelector(".steps__item:last-child >.marker")
      .getBoundingClientRect();
    markersRect.push(lastMarkerRect);
  
    /* const lastMarkerCoords = {
      x: lastMarkerRect.x - initialX + lastMarkerRect.width / 2,
      y: lastMarkerRect.y - initialY,
    };
    lastMarkerCoords.push(markersCoords);*/
  
    markersRect.forEach((markerRect) => {
      /*const markerRect = marker.getBoundingClientRect();
      let centerCoords = {};
  
      centerCoords.x = markerRect.x - initialX + markerRect.width / 2;
      centerCoords.y = markerRect.y - initialY + markerRect.height / 2;
  */
      markersCoords.push({
        x: markerRect.x - initialX + markerRect.width / 2,
        y: markerRect.y - initialY + markerRect.height / 2 + window.scrollY,
      });
    });
    _steps_line_vars_js__WEBPACK_IMPORTED_MODULE_1__.stepsLine.startY = markersCoords[0].y + initialY;
    _steps_line_vars_js__WEBPACK_IMPORTED_MODULE_1__.stepsLine.endY = markersCoords[markersCoords.length - 1].y + initialY;
    console.log(initialX, initialY, markersRect, markersCoords);
    const NSstring = "http://www.w3.org/2000/svg";
    const svg = document.createElementNS(NSstring, "svg");
    svg.setAttribute("class", "steps__track");
    const mainTrack = document.createElementNS(NSstring, "path");
    let d = `M ${markersCoords[0].x} ${markersCoords[0].y} L ${markersCoords[1].x} ${markersCoords[1].y}`;
    /* for (let i = 1; i < markersCoords.length; i++) {
      d += `C${markersCoords[i - 1].x} ${
        markersCoords[i - 1].y + controlPointOffsetY
      } ${markersCoords[i].x} ${
        markersCoords[i].y - controlPointOffsetY
      } ${markersCoords[i].x} ${markersCoords[i].y}`;
    }*/
    const stepsItems = document.querySelectorAll(".steps__item");
    let offsetArray = [0];
    const dashLenght = gap - linePadding;
    // todo округлять значения dashLenght и itemHeight в большую сторону?
    stepsItems.forEach((item, i) => {
      const itemHeight = parseInt(
        window.getComputedStyle(item).getPropertyValue("height")
      );
      if (i === 0) {
        offsetArray.push(itemHeight);
      } else {
        offsetArray.push(itemHeight + linePadding);
      }
      offsetArray.push(dashLenght);
    });
    mainTrack.setAttribute("class", "steps__main-track");
    mainTrack.setAttribute("d", d);
    mainTrack.setAttribute("fill", "none");
    _steps_line_vars_js__WEBPACK_IMPORTED_MODULE_1__.stepsLine.pathLength = Math.round(mainTrack.getTotalLength());
    mainTrack.setAttribute("stroke-dasharray", offsetArray.join(" "));
    // path.setAttribute("stroke-dashoffset", stepsLine.pathLength);
    svg.appendChild(mainTrack);
    const trackMask = document.createElementNS(NSstring, "path");
    trackMask.setAttribute("class", "steps__track-mask");
    trackMask.setAttribute("d", d);
    trackMask.setAttribute("fill", "none");
    trackMask.setAttribute("stroke-dasharray", _steps_line_vars_js__WEBPACK_IMPORTED_MODULE_1__.stepsLine.pathLength);
    trackMask.setAttribute("stroke-dashoffset", 0);
  
    svg.appendChild(trackMask);
  
    /*use.setAttribute("class", "steps__track--mask");
    use.setAttribute("stroke-dasharray", stepsLine.pathLength);
    use.setAttribute("stroke-dashoffset", 0);
    svg.appendChild(use);*/
    svg.appendChild(
      (0,_triangle_js__WEBPACK_IMPORTED_MODULE_0__.addTriangle)(markersCoords[0].x, markersCoords[0].y, 15 /*, svg*/)
    );
    const triangleMask = document.createElementNS(NSstring, "path");
    triangleMask.setAttribute("class", "steps__triangle-mask");
    triangleMask.setAttribute("d", d);
    triangleMask.setAttribute("fill", "none");
    triangleMask.setAttribute(
      "stroke-width",
      "20px"
    ); /* 20px для перекрытия треугольника в 15px */
    triangleMask.setAttribute("stroke-dasharray", offsetArray.slice(1).join(" "));
    triangleMask.setAttribute("stroke-dashoffset", 0);
    svg.appendChild(triangleMask);
  
    stepsSection.appendChild(svg);
  }

  function animateStraightStepsTrack(
    startScrollPosition,
    startPoint,
    endPoint,
    pathLenght,
    handlerFunc
  ) {
    const trackPath = document.querySelector(".steps__track-mask");
    const lineHeight = endPoint - startPoint;
    const lineScrollProgres = (window.scrollY - startScrollPosition) / lineHeight;
    let offset = -pathLenght * lineScrollProgres;
  
    if (offset < -pathLenght) {
      offset = -pathLenght;
      //window.removeEventListener("scroll", handlerFunc);
    }
    trackPath.setAttribute("stroke-dashoffset", offset);
    (0,_triangle_js__WEBPACK_IMPORTED_MODULE_0__.moveTriangleAlongStraight)(
      document.querySelector(".steps__track-arrow"),
      trackPath,
      offset,
      document.querySelector(".steps__main-track")
    );
  }

/***/ }),

/***/ "./src/scripts/steps-track/triangle.js":
/*!*********************************************!*\
  !*** ./src/scripts/steps-track/triangle.js ***!
  \*********************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   addTriangle: () => (/* binding */ addTriangle),
/* harmony export */   moveTriangleAlongCurve: () => (/* binding */ moveTriangleAlongCurve),
/* harmony export */   moveTriangleAlongStraight: () => (/* binding */ moveTriangleAlongStraight)
/* harmony export */ });
function addTriangle(initialX, initialY, sideLenght /*, parentNode*/) {
    const triangle = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "polygon"
    );
    triangle.setAttribute("class", "steps__track-arrow"); //zoom-in show  animate show-faster
    //(Math.sqrt(3) / 2) = 0,866
    triangle.setAttribute("style", "opacity: 0;");
    triangle.setAttribute(
      "points",
      `${initialX - sideLenght / 2},${initialY} ${initialX},${
        initialY + (Math.sqrt(3) / 2) * sideLenght
      } ${initialX + sideLenght / 2},${initialY}`
    );
    //  parentNode.appendChild(triangle);
    return triangle;
  }
  
  function moveTriangleAlongCurve(triangle, path, totalPathLenght, offset) {
    const currentLenght = totalPathLenght - offset;
    const initialPoint = path.getPointAtLength(0);
    const currentPoint = path.getPointAtLength(currentLenght);
    const triangleHeightPoints = triangle
      .getAttribute("points")
      .match(/\S+,(\S+)\s.\S+,(\S+)/);
    const futurePoint = path.getPointAtLength(
      currentLenght + (triangleHeightPoints[2] - triangleHeightPoints[1])
    );
    const angle =
      (Math.atan2(
        futurePoint.y - currentPoint.y,
        futurePoint.x - currentPoint.x
      ) -
        Math.atan2(0, currentPoint.x + 1)) *
        (180 / Math.PI) -
      90;
  
    triangle.setAttribute(
      "transform",
      `translate(${currentPoint.x - initialPoint.x}, ${
        currentPoint.y - initialPoint.y
      }) rotate(${angle} ${initialPoint.x} ${initialPoint.y})`
    );
    triangle.setAttribute("style", "opacity: 1;");
  }
  
  function moveTriangleAlongStraight(triangle, maskTrack, offset, mainTrack) {
    const currentLenght = -offset;
    const initialPoint = maskTrack.getPointAtLength(0);
    const currentPoint = maskTrack.getPointAtLength(currentLenght);
    //const dashesArray = mainTrack.getAttribute("stroke-dasharray").split(" ");
    /* console.log(currentLenght);
    let sum = 0;
    let i = 0;
    while (sum < currentLenght) {
      i++;
      sum += Number(dashesArray[i]);
      console.log(i, sum);
    }
    if (i % 2 === 0) {
      triangle.setAttribute(
        "transform",
        `translate(${currentPoint.x - initialPoint.x}, ${
          currentPoint.y - initialPoint.y
        })`
      );
    }*/
    triangle.setAttribute(
      "transform",
      `translate(${currentPoint.x - initialPoint.x}, ${
        currentPoint.y - initialPoint.y
      })`
    );
    triangle.setAttribute("style", "opacity: 1;");
  }

/***/ }),

/***/ "./src/scripts/utils.js":
/*!******************************!*\
  !*** ./src/scripts/utils.js ***!
  \******************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getMainWidth: () => (/* binding */ getMainWidth),
/* harmony export */   inTarget: () => (/* binding */ inTarget),
/* harmony export */   scrollData: () => (/* binding */ scrollData),
/* harmony export */   throttle: () => (/* binding */ throttle)
/* harmony export */ });
let lastScrollPosition = 0;

function scrollData() {
  let result = { position: window.scrollY, direction: "" };
  result.direction = result.position > lastScrollPosition ? "down" : "up";
  lastScrollPosition = result.position;
  return result;
}

function inTarget(element, target) {
  const elementPosition = element.getBoundingClientRect().top;
  if (elementPosition <= target) {
    return true;
  } else {
    return false;
  }
}

function getMainWidth() {
  return document.querySelector(".page-main").offsetWidth;
}

function throttle(func, ms) {
  let isThrottled = false,
    savedArgs,
    savedThis;

  function wrapper() {
    if (isThrottled) {
      savedArgs = arguments;
      savedThis = this;
      return;
    }

    func.apply(this, arguments);

    isThrottled = true;

    setTimeout(function () {
      isThrottled = false;
      if (savedArgs) {
        wrapper.apply(savedThis, savedArgs);
        savedArgs = savedThis = null;
      }
    }, ms);
  }

  return wrapper;
}


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		var execOptions = { id: moduleId, module: module, factory: __webpack_modules__[moduleId], require: __webpack_require__ };
/******/ 		__webpack_require__.i.forEach(function(handler) { handler(execOptions); });
/******/ 		module = execOptions.module;
/******/ 		execOptions.factory.call(module.exports, module, module.exports, execOptions.require);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = __webpack_module_cache__;
/******/ 	
/******/ 	// expose the module execution interceptor
/******/ 	__webpack_require__.i = [];
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/get javascript update chunk filename */
/******/ 	(() => {
/******/ 		// This function allow to reference all chunks
/******/ 		__webpack_require__.hu = (chunkId) => {
/******/ 			// return url for filenames based on template
/******/ 			return "" + chunkId + "." + __webpack_require__.h() + ".hot-update.js";
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/get mini-css chunk filename */
/******/ 	(() => {
/******/ 		// This function allow to reference async chunks
/******/ 		__webpack_require__.miniCssF = (chunkId) => {
/******/ 			// return url for filenames based on template
/******/ 			return undefined;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/get update manifest filename */
/******/ 	(() => {
/******/ 		__webpack_require__.hmrF = () => ("main." + __webpack_require__.h() + ".hot-update.json");
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/getFullHash */
/******/ 	(() => {
/******/ 		__webpack_require__.h = () => ("78cfd4b85e0e53a59fe2")
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/load script */
/******/ 	(() => {
/******/ 		var inProgress = {};
/******/ 		var dataWebpackPrefix = "my-holst-site:";
/******/ 		// loadScript function to load a script via script tag
/******/ 		__webpack_require__.l = (url, done, key, chunkId) => {
/******/ 			if(inProgress[url]) { inProgress[url].push(done); return; }
/******/ 			var script, needAttach;
/******/ 			if(key !== undefined) {
/******/ 				var scripts = document.getElementsByTagName("script");
/******/ 				for(var i = 0; i < scripts.length; i++) {
/******/ 					var s = scripts[i];
/******/ 					if(s.getAttribute("src") == url || s.getAttribute("data-webpack") == dataWebpackPrefix + key) { script = s; break; }
/******/ 				}
/******/ 			}
/******/ 			if(!script) {
/******/ 				needAttach = true;
/******/ 				script = document.createElement('script');
/******/ 		
/******/ 				script.charset = 'utf-8';
/******/ 				script.timeout = 120;
/******/ 				if (__webpack_require__.nc) {
/******/ 					script.setAttribute("nonce", __webpack_require__.nc);
/******/ 				}
/******/ 				script.setAttribute("data-webpack", dataWebpackPrefix + key);
/******/ 		
/******/ 				script.src = url;
/******/ 			}
/******/ 			inProgress[url] = [done];
/******/ 			var onScriptComplete = (prev, event) => {
/******/ 				// avoid mem leaks in IE.
/******/ 				script.onerror = script.onload = null;
/******/ 				clearTimeout(timeout);
/******/ 				var doneFns = inProgress[url];
/******/ 				delete inProgress[url];
/******/ 				script.parentNode && script.parentNode.removeChild(script);
/******/ 				doneFns && doneFns.forEach((fn) => (fn(event)));
/******/ 				if(prev) return prev(event);
/******/ 			}
/******/ 			var timeout = setTimeout(onScriptComplete.bind(null, undefined, { type: 'timeout', target: script }), 120000);
/******/ 			script.onerror = onScriptComplete.bind(null, script.onerror);
/******/ 			script.onload = onScriptComplete.bind(null, script.onload);
/******/ 			needAttach && document.head.appendChild(script);
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hot module replacement */
/******/ 	(() => {
/******/ 		var currentModuleData = {};
/******/ 		var installedModules = __webpack_require__.c;
/******/ 		
/******/ 		// module and require creation
/******/ 		var currentChildModule;
/******/ 		var currentParents = [];
/******/ 		
/******/ 		// status
/******/ 		var registeredStatusHandlers = [];
/******/ 		var currentStatus = "idle";
/******/ 		
/******/ 		// while downloading
/******/ 		var blockingPromises = 0;
/******/ 		var blockingPromisesWaiting = [];
/******/ 		
/******/ 		// The update info
/******/ 		var currentUpdateApplyHandlers;
/******/ 		var queuedInvalidatedModules;
/******/ 		
/******/ 		__webpack_require__.hmrD = currentModuleData;
/******/ 		
/******/ 		__webpack_require__.i.push(function (options) {
/******/ 			var module = options.module;
/******/ 			var require = createRequire(options.require, options.id);
/******/ 			module.hot = createModuleHotObject(options.id, module);
/******/ 			module.parents = currentParents;
/******/ 			module.children = [];
/******/ 			currentParents = [];
/******/ 			options.require = require;
/******/ 		});
/******/ 		
/******/ 		__webpack_require__.hmrC = {};
/******/ 		__webpack_require__.hmrI = {};
/******/ 		
/******/ 		function createRequire(require, moduleId) {
/******/ 			var me = installedModules[moduleId];
/******/ 			if (!me) return require;
/******/ 			var fn = function (request) {
/******/ 				if (me.hot.active) {
/******/ 					if (installedModules[request]) {
/******/ 						var parents = installedModules[request].parents;
/******/ 						if (parents.indexOf(moduleId) === -1) {
/******/ 							parents.push(moduleId);
/******/ 						}
/******/ 					} else {
/******/ 						currentParents = [moduleId];
/******/ 						currentChildModule = request;
/******/ 					}
/******/ 					if (me.children.indexOf(request) === -1) {
/******/ 						me.children.push(request);
/******/ 					}
/******/ 				} else {
/******/ 					console.warn(
/******/ 						"[HMR] unexpected require(" +
/******/ 							request +
/******/ 							") from disposed module " +
/******/ 							moduleId
/******/ 					);
/******/ 					currentParents = [];
/******/ 				}
/******/ 				return require(request);
/******/ 			};
/******/ 			var createPropertyDescriptor = function (name) {
/******/ 				return {
/******/ 					configurable: true,
/******/ 					enumerable: true,
/******/ 					get: function () {
/******/ 						return require[name];
/******/ 					},
/******/ 					set: function (value) {
/******/ 						require[name] = value;
/******/ 					}
/******/ 				};
/******/ 			};
/******/ 			for (var name in require) {
/******/ 				if (Object.prototype.hasOwnProperty.call(require, name) && name !== "e") {
/******/ 					Object.defineProperty(fn, name, createPropertyDescriptor(name));
/******/ 				}
/******/ 			}
/******/ 			fn.e = function (chunkId, fetchPriority) {
/******/ 				return trackBlockingPromise(require.e(chunkId, fetchPriority));
/******/ 			};
/******/ 			return fn;
/******/ 		}
/******/ 		
/******/ 		function createModuleHotObject(moduleId, me) {
/******/ 			var _main = currentChildModule !== moduleId;
/******/ 			var hot = {
/******/ 				// private stuff
/******/ 				_acceptedDependencies: {},
/******/ 				_acceptedErrorHandlers: {},
/******/ 				_declinedDependencies: {},
/******/ 				_selfAccepted: false,
/******/ 				_selfDeclined: false,
/******/ 				_selfInvalidated: false,
/******/ 				_disposeHandlers: [],
/******/ 				_main: _main,
/******/ 				_requireSelf: function () {
/******/ 					currentParents = me.parents.slice();
/******/ 					currentChildModule = _main ? undefined : moduleId;
/******/ 					__webpack_require__(moduleId);
/******/ 				},
/******/ 		
/******/ 				// Module API
/******/ 				active: true,
/******/ 				accept: function (dep, callback, errorHandler) {
/******/ 					if (dep === undefined) hot._selfAccepted = true;
/******/ 					else if (typeof dep === "function") hot._selfAccepted = dep;
/******/ 					else if (typeof dep === "object" && dep !== null) {
/******/ 						for (var i = 0; i < dep.length; i++) {
/******/ 							hot._acceptedDependencies[dep[i]] = callback || function () {};
/******/ 							hot._acceptedErrorHandlers[dep[i]] = errorHandler;
/******/ 						}
/******/ 					} else {
/******/ 						hot._acceptedDependencies[dep] = callback || function () {};
/******/ 						hot._acceptedErrorHandlers[dep] = errorHandler;
/******/ 					}
/******/ 				},
/******/ 				decline: function (dep) {
/******/ 					if (dep === undefined) hot._selfDeclined = true;
/******/ 					else if (typeof dep === "object" && dep !== null)
/******/ 						for (var i = 0; i < dep.length; i++)
/******/ 							hot._declinedDependencies[dep[i]] = true;
/******/ 					else hot._declinedDependencies[dep] = true;
/******/ 				},
/******/ 				dispose: function (callback) {
/******/ 					hot._disposeHandlers.push(callback);
/******/ 				},
/******/ 				addDisposeHandler: function (callback) {
/******/ 					hot._disposeHandlers.push(callback);
/******/ 				},
/******/ 				removeDisposeHandler: function (callback) {
/******/ 					var idx = hot._disposeHandlers.indexOf(callback);
/******/ 					if (idx >= 0) hot._disposeHandlers.splice(idx, 1);
/******/ 				},
/******/ 				invalidate: function () {
/******/ 					this._selfInvalidated = true;
/******/ 					switch (currentStatus) {
/******/ 						case "idle":
/******/ 							currentUpdateApplyHandlers = [];
/******/ 							Object.keys(__webpack_require__.hmrI).forEach(function (key) {
/******/ 								__webpack_require__.hmrI[key](
/******/ 									moduleId,
/******/ 									currentUpdateApplyHandlers
/******/ 								);
/******/ 							});
/******/ 							setStatus("ready");
/******/ 							break;
/******/ 						case "ready":
/******/ 							Object.keys(__webpack_require__.hmrI).forEach(function (key) {
/******/ 								__webpack_require__.hmrI[key](
/******/ 									moduleId,
/******/ 									currentUpdateApplyHandlers
/******/ 								);
/******/ 							});
/******/ 							break;
/******/ 						case "prepare":
/******/ 						case "check":
/******/ 						case "dispose":
/******/ 						case "apply":
/******/ 							(queuedInvalidatedModules = queuedInvalidatedModules || []).push(
/******/ 								moduleId
/******/ 							);
/******/ 							break;
/******/ 						default:
/******/ 							// ignore requests in error states
/******/ 							break;
/******/ 					}
/******/ 				},
/******/ 		
/******/ 				// Management API
/******/ 				check: hotCheck,
/******/ 				apply: hotApply,
/******/ 				status: function (l) {
/******/ 					if (!l) return currentStatus;
/******/ 					registeredStatusHandlers.push(l);
/******/ 				},
/******/ 				addStatusHandler: function (l) {
/******/ 					registeredStatusHandlers.push(l);
/******/ 				},
/******/ 				removeStatusHandler: function (l) {
/******/ 					var idx = registeredStatusHandlers.indexOf(l);
/******/ 					if (idx >= 0) registeredStatusHandlers.splice(idx, 1);
/******/ 				},
/******/ 		
/******/ 				//inherit from previous dispose call
/******/ 				data: currentModuleData[moduleId]
/******/ 			};
/******/ 			currentChildModule = undefined;
/******/ 			return hot;
/******/ 		}
/******/ 		
/******/ 		function setStatus(newStatus) {
/******/ 			currentStatus = newStatus;
/******/ 			var results = [];
/******/ 		
/******/ 			for (var i = 0; i < registeredStatusHandlers.length; i++)
/******/ 				results[i] = registeredStatusHandlers[i].call(null, newStatus);
/******/ 		
/******/ 			return Promise.all(results).then(function () {});
/******/ 		}
/******/ 		
/******/ 		function unblock() {
/******/ 			if (--blockingPromises === 0) {
/******/ 				setStatus("ready").then(function () {
/******/ 					if (blockingPromises === 0) {
/******/ 						var list = blockingPromisesWaiting;
/******/ 						blockingPromisesWaiting = [];
/******/ 						for (var i = 0; i < list.length; i++) {
/******/ 							list[i]();
/******/ 						}
/******/ 					}
/******/ 				});
/******/ 			}
/******/ 		}
/******/ 		
/******/ 		function trackBlockingPromise(promise) {
/******/ 			switch (currentStatus) {
/******/ 				case "ready":
/******/ 					setStatus("prepare");
/******/ 				/* fallthrough */
/******/ 				case "prepare":
/******/ 					blockingPromises++;
/******/ 					promise.then(unblock, unblock);
/******/ 					return promise;
/******/ 				default:
/******/ 					return promise;
/******/ 			}
/******/ 		}
/******/ 		
/******/ 		function waitForBlockingPromises(fn) {
/******/ 			if (blockingPromises === 0) return fn();
/******/ 			return new Promise(function (resolve) {
/******/ 				blockingPromisesWaiting.push(function () {
/******/ 					resolve(fn());
/******/ 				});
/******/ 			});
/******/ 		}
/******/ 		
/******/ 		function hotCheck(applyOnUpdate) {
/******/ 			if (currentStatus !== "idle") {
/******/ 				throw new Error("check() is only allowed in idle status");
/******/ 			}
/******/ 			return setStatus("check")
/******/ 				.then(__webpack_require__.hmrM)
/******/ 				.then(function (update) {
/******/ 					if (!update) {
/******/ 						return setStatus(applyInvalidatedModules() ? "ready" : "idle").then(
/******/ 							function () {
/******/ 								return null;
/******/ 							}
/******/ 						);
/******/ 					}
/******/ 		
/******/ 					return setStatus("prepare").then(function () {
/******/ 						var updatedModules = [];
/******/ 						currentUpdateApplyHandlers = [];
/******/ 		
/******/ 						return Promise.all(
/******/ 							Object.keys(__webpack_require__.hmrC).reduce(function (
/******/ 								promises,
/******/ 								key
/******/ 							) {
/******/ 								__webpack_require__.hmrC[key](
/******/ 									update.c,
/******/ 									update.r,
/******/ 									update.m,
/******/ 									promises,
/******/ 									currentUpdateApplyHandlers,
/******/ 									updatedModules
/******/ 								);
/******/ 								return promises;
/******/ 							}, [])
/******/ 						).then(function () {
/******/ 							return waitForBlockingPromises(function () {
/******/ 								if (applyOnUpdate) {
/******/ 									return internalApply(applyOnUpdate);
/******/ 								} else {
/******/ 									return setStatus("ready").then(function () {
/******/ 										return updatedModules;
/******/ 									});
/******/ 								}
/******/ 							});
/******/ 						});
/******/ 					});
/******/ 				});
/******/ 		}
/******/ 		
/******/ 		function hotApply(options) {
/******/ 			if (currentStatus !== "ready") {
/******/ 				return Promise.resolve().then(function () {
/******/ 					throw new Error(
/******/ 						"apply() is only allowed in ready status (state: " +
/******/ 							currentStatus +
/******/ 							")"
/******/ 					);
/******/ 				});
/******/ 			}
/******/ 			return internalApply(options);
/******/ 		}
/******/ 		
/******/ 		function internalApply(options) {
/******/ 			options = options || {};
/******/ 		
/******/ 			applyInvalidatedModules();
/******/ 		
/******/ 			var results = currentUpdateApplyHandlers.map(function (handler) {
/******/ 				return handler(options);
/******/ 			});
/******/ 			currentUpdateApplyHandlers = undefined;
/******/ 		
/******/ 			var errors = results
/******/ 				.map(function (r) {
/******/ 					return r.error;
/******/ 				})
/******/ 				.filter(Boolean);
/******/ 		
/******/ 			if (errors.length > 0) {
/******/ 				return setStatus("abort").then(function () {
/******/ 					throw errors[0];
/******/ 				});
/******/ 			}
/******/ 		
/******/ 			// Now in "dispose" phase
/******/ 			var disposePromise = setStatus("dispose");
/******/ 		
/******/ 			results.forEach(function (result) {
/******/ 				if (result.dispose) result.dispose();
/******/ 			});
/******/ 		
/******/ 			// Now in "apply" phase
/******/ 			var applyPromise = setStatus("apply");
/******/ 		
/******/ 			var error;
/******/ 			var reportError = function (err) {
/******/ 				if (!error) error = err;
/******/ 			};
/******/ 		
/******/ 			var outdatedModules = [];
/******/ 			results.forEach(function (result) {
/******/ 				if (result.apply) {
/******/ 					var modules = result.apply(reportError);
/******/ 					if (modules) {
/******/ 						for (var i = 0; i < modules.length; i++) {
/******/ 							outdatedModules.push(modules[i]);
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 			});
/******/ 		
/******/ 			return Promise.all([disposePromise, applyPromise]).then(function () {
/******/ 				// handle errors in accept handlers and self accepted module load
/******/ 				if (error) {
/******/ 					return setStatus("fail").then(function () {
/******/ 						throw error;
/******/ 					});
/******/ 				}
/******/ 		
/******/ 				if (queuedInvalidatedModules) {
/******/ 					return internalApply(options).then(function (list) {
/******/ 						outdatedModules.forEach(function (moduleId) {
/******/ 							if (list.indexOf(moduleId) < 0) list.push(moduleId);
/******/ 						});
/******/ 						return list;
/******/ 					});
/******/ 				}
/******/ 		
/******/ 				return setStatus("idle").then(function () {
/******/ 					return outdatedModules;
/******/ 				});
/******/ 			});
/******/ 		}
/******/ 		
/******/ 		function applyInvalidatedModules() {
/******/ 			if (queuedInvalidatedModules) {
/******/ 				if (!currentUpdateApplyHandlers) currentUpdateApplyHandlers = [];
/******/ 				Object.keys(__webpack_require__.hmrI).forEach(function (key) {
/******/ 					queuedInvalidatedModules.forEach(function (moduleId) {
/******/ 						__webpack_require__.hmrI[key](
/******/ 							moduleId,
/******/ 							currentUpdateApplyHandlers
/******/ 						);
/******/ 					});
/******/ 				});
/******/ 				queuedInvalidatedModules = undefined;
/******/ 				return true;
/******/ 			}
/******/ 		}
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/publicPath */
/******/ 	(() => {
/******/ 		var scriptUrl;
/******/ 		if (__webpack_require__.g.importScripts) scriptUrl = __webpack_require__.g.location + "";
/******/ 		var document = __webpack_require__.g.document;
/******/ 		if (!scriptUrl && document) {
/******/ 			if (document.currentScript)
/******/ 				scriptUrl = document.currentScript.src;
/******/ 			if (!scriptUrl) {
/******/ 				var scripts = document.getElementsByTagName("script");
/******/ 				if(scripts.length) {
/******/ 					var i = scripts.length - 1;
/******/ 					while (i > -1 && (!scriptUrl || !/^http(s?):/.test(scriptUrl))) scriptUrl = scripts[i--].src;
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 		// When supporting browsers where an automatic publicPath is not supported you must specify an output.publicPath manually via configuration
/******/ 		// or pass an empty string ("") and set the __webpack_public_path__ variable from your code to use your own logic.
/******/ 		if (!scriptUrl) throw new Error("Automatic publicPath is not supported in this browser");
/******/ 		scriptUrl = scriptUrl.replace(/#.*$/, "").replace(/\?.*$/, "").replace(/\/[^\/]+$/, "/");
/******/ 		__webpack_require__.p = scriptUrl;
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/css loading */
/******/ 	(() => {
/******/ 		if (typeof document === "undefined") return;
/******/ 		var createStylesheet = (chunkId, fullhref, oldTag, resolve, reject) => {
/******/ 			var linkTag = document.createElement("link");
/******/ 		
/******/ 			linkTag.rel = "stylesheet";
/******/ 			linkTag.type = "text/css";
/******/ 			if (__webpack_require__.nc) {
/******/ 				linkTag.nonce = __webpack_require__.nc;
/******/ 			}
/******/ 			var onLinkComplete = (event) => {
/******/ 				// avoid mem leaks.
/******/ 				linkTag.onerror = linkTag.onload = null;
/******/ 				if (event.type === 'load') {
/******/ 					resolve();
/******/ 				} else {
/******/ 					var errorType = event && event.type;
/******/ 					var realHref = event && event.target && event.target.href || fullhref;
/******/ 					var err = new Error("Loading CSS chunk " + chunkId + " failed.\n(" + errorType + ": " + realHref + ")");
/******/ 					err.name = "ChunkLoadError";
/******/ 					err.code = "CSS_CHUNK_LOAD_FAILED";
/******/ 					err.type = errorType;
/******/ 					err.request = realHref;
/******/ 					if (linkTag.parentNode) linkTag.parentNode.removeChild(linkTag)
/******/ 					reject(err);
/******/ 				}
/******/ 			}
/******/ 			linkTag.onerror = linkTag.onload = onLinkComplete;
/******/ 			linkTag.href = fullhref;
/******/ 		
/******/ 		
/******/ 			if (oldTag) {
/******/ 				oldTag.parentNode.insertBefore(linkTag, oldTag.nextSibling);
/******/ 			} else {
/******/ 				document.head.appendChild(linkTag);
/******/ 			}
/******/ 			return linkTag;
/******/ 		};
/******/ 		var findStylesheet = (href, fullhref) => {
/******/ 			var existingLinkTags = document.getElementsByTagName("link");
/******/ 			for(var i = 0; i < existingLinkTags.length; i++) {
/******/ 				var tag = existingLinkTags[i];
/******/ 				var dataHref = tag.getAttribute("data-href") || tag.getAttribute("href");
/******/ 				if(tag.rel === "stylesheet" && (dataHref === href || dataHref === fullhref)) return tag;
/******/ 			}
/******/ 			var existingStyleTags = document.getElementsByTagName("style");
/******/ 			for(var i = 0; i < existingStyleTags.length; i++) {
/******/ 				var tag = existingStyleTags[i];
/******/ 				var dataHref = tag.getAttribute("data-href");
/******/ 				if(dataHref === href || dataHref === fullhref) return tag;
/******/ 			}
/******/ 		};
/******/ 		var loadStylesheet = (chunkId) => {
/******/ 			return new Promise((resolve, reject) => {
/******/ 				var href = __webpack_require__.miniCssF(chunkId);
/******/ 				var fullhref = __webpack_require__.p + href;
/******/ 				if(findStylesheet(href, fullhref)) return resolve();
/******/ 				createStylesheet(chunkId, fullhref, null, resolve, reject);
/******/ 			});
/******/ 		}
/******/ 		// no chunk loading
/******/ 		
/******/ 		var oldTags = [];
/******/ 		var newTags = [];
/******/ 		var applyHandler = (options) => {
/******/ 			return { dispose: () => {
/******/ 				for(var i = 0; i < oldTags.length; i++) {
/******/ 					var oldTag = oldTags[i];
/******/ 					if(oldTag.parentNode) oldTag.parentNode.removeChild(oldTag);
/******/ 				}
/******/ 				oldTags.length = 0;
/******/ 			}, apply: () => {
/******/ 				for(var i = 0; i < newTags.length; i++) newTags[i].rel = "stylesheet";
/******/ 				newTags.length = 0;
/******/ 			} };
/******/ 		}
/******/ 		__webpack_require__.hmrC.miniCss = (chunkIds, removedChunks, removedModules, promises, applyHandlers, updatedModulesList) => {
/******/ 			applyHandlers.push(applyHandler);
/******/ 			chunkIds.forEach((chunkId) => {
/******/ 				var href = __webpack_require__.miniCssF(chunkId);
/******/ 				var fullhref = __webpack_require__.p + href;
/******/ 				var oldTag = findStylesheet(href, fullhref);
/******/ 				if(!oldTag) return;
/******/ 				promises.push(new Promise((resolve, reject) => {
/******/ 					var tag = createStylesheet(chunkId, fullhref, oldTag, () => {
/******/ 						tag.as = "style";
/******/ 						tag.rel = "preload";
/******/ 						resolve();
/******/ 					}, reject);
/******/ 					oldTags.push(oldTag);
/******/ 					newTags.push(tag);
/******/ 				}));
/******/ 			});
/******/ 		}
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = __webpack_require__.hmrS_jsonp = __webpack_require__.hmrS_jsonp || {
/******/ 			"main": 0
/******/ 		};
/******/ 		
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		var currentUpdatedModulesList;
/******/ 		var waitingUpdateResolves = {};
/******/ 		function loadUpdateChunk(chunkId, updatedModulesList) {
/******/ 			currentUpdatedModulesList = updatedModulesList;
/******/ 			return new Promise((resolve, reject) => {
/******/ 				waitingUpdateResolves[chunkId] = resolve;
/******/ 				// start update chunk loading
/******/ 				var url = __webpack_require__.p + __webpack_require__.hu(chunkId);
/******/ 				// create error before stack unwound to get useful stacktrace later
/******/ 				var error = new Error();
/******/ 				var loadingEnded = (event) => {
/******/ 					if(waitingUpdateResolves[chunkId]) {
/******/ 						waitingUpdateResolves[chunkId] = undefined
/******/ 						var errorType = event && (event.type === 'load' ? 'missing' : event.type);
/******/ 						var realSrc = event && event.target && event.target.src;
/******/ 						error.message = 'Loading hot update chunk ' + chunkId + ' failed.\n(' + errorType + ': ' + realSrc + ')';
/******/ 						error.name = 'ChunkLoadError';
/******/ 						error.type = errorType;
/******/ 						error.request = realSrc;
/******/ 						reject(error);
/******/ 					}
/******/ 				};
/******/ 				__webpack_require__.l(url, loadingEnded);
/******/ 			});
/******/ 		}
/******/ 		
/******/ 		self["webpackHotUpdatemy_holst_site"] = (chunkId, moreModules, runtime) => {
/******/ 			for(var moduleId in moreModules) {
/******/ 				if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 					currentUpdate[moduleId] = moreModules[moduleId];
/******/ 					if(currentUpdatedModulesList) currentUpdatedModulesList.push(moduleId);
/******/ 				}
/******/ 			}
/******/ 			if(runtime) currentUpdateRuntime.push(runtime);
/******/ 			if(waitingUpdateResolves[chunkId]) {
/******/ 				waitingUpdateResolves[chunkId]();
/******/ 				waitingUpdateResolves[chunkId] = undefined;
/******/ 			}
/******/ 		};
/******/ 		
/******/ 		var currentUpdateChunks;
/******/ 		var currentUpdate;
/******/ 		var currentUpdateRemovedChunks;
/******/ 		var currentUpdateRuntime;
/******/ 		function applyHandler(options) {
/******/ 			if (__webpack_require__.f) delete __webpack_require__.f.jsonpHmr;
/******/ 			currentUpdateChunks = undefined;
/******/ 			function getAffectedModuleEffects(updateModuleId) {
/******/ 				var outdatedModules = [updateModuleId];
/******/ 				var outdatedDependencies = {};
/******/ 		
/******/ 				var queue = outdatedModules.map(function (id) {
/******/ 					return {
/******/ 						chain: [id],
/******/ 						id: id
/******/ 					};
/******/ 				});
/******/ 				while (queue.length > 0) {
/******/ 					var queueItem = queue.pop();
/******/ 					var moduleId = queueItem.id;
/******/ 					var chain = queueItem.chain;
/******/ 					var module = __webpack_require__.c[moduleId];
/******/ 					if (
/******/ 						!module ||
/******/ 						(module.hot._selfAccepted && !module.hot._selfInvalidated)
/******/ 					)
/******/ 						continue;
/******/ 					if (module.hot._selfDeclined) {
/******/ 						return {
/******/ 							type: "self-declined",
/******/ 							chain: chain,
/******/ 							moduleId: moduleId
/******/ 						};
/******/ 					}
/******/ 					if (module.hot._main) {
/******/ 						return {
/******/ 							type: "unaccepted",
/******/ 							chain: chain,
/******/ 							moduleId: moduleId
/******/ 						};
/******/ 					}
/******/ 					for (var i = 0; i < module.parents.length; i++) {
/******/ 						var parentId = module.parents[i];
/******/ 						var parent = __webpack_require__.c[parentId];
/******/ 						if (!parent) continue;
/******/ 						if (parent.hot._declinedDependencies[moduleId]) {
/******/ 							return {
/******/ 								type: "declined",
/******/ 								chain: chain.concat([parentId]),
/******/ 								moduleId: moduleId,
/******/ 								parentId: parentId
/******/ 							};
/******/ 						}
/******/ 						if (outdatedModules.indexOf(parentId) !== -1) continue;
/******/ 						if (parent.hot._acceptedDependencies[moduleId]) {
/******/ 							if (!outdatedDependencies[parentId])
/******/ 								outdatedDependencies[parentId] = [];
/******/ 							addAllToSet(outdatedDependencies[parentId], [moduleId]);
/******/ 							continue;
/******/ 						}
/******/ 						delete outdatedDependencies[parentId];
/******/ 						outdatedModules.push(parentId);
/******/ 						queue.push({
/******/ 							chain: chain.concat([parentId]),
/******/ 							id: parentId
/******/ 						});
/******/ 					}
/******/ 				}
/******/ 		
/******/ 				return {
/******/ 					type: "accepted",
/******/ 					moduleId: updateModuleId,
/******/ 					outdatedModules: outdatedModules,
/******/ 					outdatedDependencies: outdatedDependencies
/******/ 				};
/******/ 			}
/******/ 		
/******/ 			function addAllToSet(a, b) {
/******/ 				for (var i = 0; i < b.length; i++) {
/******/ 					var item = b[i];
/******/ 					if (a.indexOf(item) === -1) a.push(item);
/******/ 				}
/******/ 			}
/******/ 		
/******/ 			// at begin all updates modules are outdated
/******/ 			// the "outdated" status can propagate to parents if they don't accept the children
/******/ 			var outdatedDependencies = {};
/******/ 			var outdatedModules = [];
/******/ 			var appliedUpdate = {};
/******/ 		
/******/ 			var warnUnexpectedRequire = function warnUnexpectedRequire(module) {
/******/ 				console.warn(
/******/ 					"[HMR] unexpected require(" + module.id + ") to disposed module"
/******/ 				);
/******/ 			};
/******/ 		
/******/ 			for (var moduleId in currentUpdate) {
/******/ 				if (__webpack_require__.o(currentUpdate, moduleId)) {
/******/ 					var newModuleFactory = currentUpdate[moduleId];
/******/ 					/** @type {TODO} */
/******/ 					var result;
/******/ 					if (newModuleFactory) {
/******/ 						result = getAffectedModuleEffects(moduleId);
/******/ 					} else {
/******/ 						result = {
/******/ 							type: "disposed",
/******/ 							moduleId: moduleId
/******/ 						};
/******/ 					}
/******/ 					/** @type {Error|false} */
/******/ 					var abortError = false;
/******/ 					var doApply = false;
/******/ 					var doDispose = false;
/******/ 					var chainInfo = "";
/******/ 					if (result.chain) {
/******/ 						chainInfo = "\nUpdate propagation: " + result.chain.join(" -> ");
/******/ 					}
/******/ 					switch (result.type) {
/******/ 						case "self-declined":
/******/ 							if (options.onDeclined) options.onDeclined(result);
/******/ 							if (!options.ignoreDeclined)
/******/ 								abortError = new Error(
/******/ 									"Aborted because of self decline: " +
/******/ 										result.moduleId +
/******/ 										chainInfo
/******/ 								);
/******/ 							break;
/******/ 						case "declined":
/******/ 							if (options.onDeclined) options.onDeclined(result);
/******/ 							if (!options.ignoreDeclined)
/******/ 								abortError = new Error(
/******/ 									"Aborted because of declined dependency: " +
/******/ 										result.moduleId +
/******/ 										" in " +
/******/ 										result.parentId +
/******/ 										chainInfo
/******/ 								);
/******/ 							break;
/******/ 						case "unaccepted":
/******/ 							if (options.onUnaccepted) options.onUnaccepted(result);
/******/ 							if (!options.ignoreUnaccepted)
/******/ 								abortError = new Error(
/******/ 									"Aborted because " + moduleId + " is not accepted" + chainInfo
/******/ 								);
/******/ 							break;
/******/ 						case "accepted":
/******/ 							if (options.onAccepted) options.onAccepted(result);
/******/ 							doApply = true;
/******/ 							break;
/******/ 						case "disposed":
/******/ 							if (options.onDisposed) options.onDisposed(result);
/******/ 							doDispose = true;
/******/ 							break;
/******/ 						default:
/******/ 							throw new Error("Unexception type " + result.type);
/******/ 					}
/******/ 					if (abortError) {
/******/ 						return {
/******/ 							error: abortError
/******/ 						};
/******/ 					}
/******/ 					if (doApply) {
/******/ 						appliedUpdate[moduleId] = newModuleFactory;
/******/ 						addAllToSet(outdatedModules, result.outdatedModules);
/******/ 						for (moduleId in result.outdatedDependencies) {
/******/ 							if (__webpack_require__.o(result.outdatedDependencies, moduleId)) {
/******/ 								if (!outdatedDependencies[moduleId])
/******/ 									outdatedDependencies[moduleId] = [];
/******/ 								addAllToSet(
/******/ 									outdatedDependencies[moduleId],
/******/ 									result.outdatedDependencies[moduleId]
/******/ 								);
/******/ 							}
/******/ 						}
/******/ 					}
/******/ 					if (doDispose) {
/******/ 						addAllToSet(outdatedModules, [result.moduleId]);
/******/ 						appliedUpdate[moduleId] = warnUnexpectedRequire;
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 			currentUpdate = undefined;
/******/ 		
/******/ 			// Store self accepted outdated modules to require them later by the module system
/******/ 			var outdatedSelfAcceptedModules = [];
/******/ 			for (var j = 0; j < outdatedModules.length; j++) {
/******/ 				var outdatedModuleId = outdatedModules[j];
/******/ 				var module = __webpack_require__.c[outdatedModuleId];
/******/ 				if (
/******/ 					module &&
/******/ 					(module.hot._selfAccepted || module.hot._main) &&
/******/ 					// removed self-accepted modules should not be required
/******/ 					appliedUpdate[outdatedModuleId] !== warnUnexpectedRequire &&
/******/ 					// when called invalidate self-accepting is not possible
/******/ 					!module.hot._selfInvalidated
/******/ 				) {
/******/ 					outdatedSelfAcceptedModules.push({
/******/ 						module: outdatedModuleId,
/******/ 						require: module.hot._requireSelf,
/******/ 						errorHandler: module.hot._selfAccepted
/******/ 					});
/******/ 				}
/******/ 			}
/******/ 		
/******/ 			var moduleOutdatedDependencies;
/******/ 		
/******/ 			return {
/******/ 				dispose: function () {
/******/ 					currentUpdateRemovedChunks.forEach(function (chunkId) {
/******/ 						delete installedChunks[chunkId];
/******/ 					});
/******/ 					currentUpdateRemovedChunks = undefined;
/******/ 		
/******/ 					var idx;
/******/ 					var queue = outdatedModules.slice();
/******/ 					while (queue.length > 0) {
/******/ 						var moduleId = queue.pop();
/******/ 						var module = __webpack_require__.c[moduleId];
/******/ 						if (!module) continue;
/******/ 		
/******/ 						var data = {};
/******/ 		
/******/ 						// Call dispose handlers
/******/ 						var disposeHandlers = module.hot._disposeHandlers;
/******/ 						for (j = 0; j < disposeHandlers.length; j++) {
/******/ 							disposeHandlers[j].call(null, data);
/******/ 						}
/******/ 						__webpack_require__.hmrD[moduleId] = data;
/******/ 		
/******/ 						// disable module (this disables requires from this module)
/******/ 						module.hot.active = false;
/******/ 		
/******/ 						// remove module from cache
/******/ 						delete __webpack_require__.c[moduleId];
/******/ 		
/******/ 						// when disposing there is no need to call dispose handler
/******/ 						delete outdatedDependencies[moduleId];
/******/ 		
/******/ 						// remove "parents" references from all children
/******/ 						for (j = 0; j < module.children.length; j++) {
/******/ 							var child = __webpack_require__.c[module.children[j]];
/******/ 							if (!child) continue;
/******/ 							idx = child.parents.indexOf(moduleId);
/******/ 							if (idx >= 0) {
/******/ 								child.parents.splice(idx, 1);
/******/ 							}
/******/ 						}
/******/ 					}
/******/ 		
/******/ 					// remove outdated dependency from module children
/******/ 					var dependency;
/******/ 					for (var outdatedModuleId in outdatedDependencies) {
/******/ 						if (__webpack_require__.o(outdatedDependencies, outdatedModuleId)) {
/******/ 							module = __webpack_require__.c[outdatedModuleId];
/******/ 							if (module) {
/******/ 								moduleOutdatedDependencies =
/******/ 									outdatedDependencies[outdatedModuleId];
/******/ 								for (j = 0; j < moduleOutdatedDependencies.length; j++) {
/******/ 									dependency = moduleOutdatedDependencies[j];
/******/ 									idx = module.children.indexOf(dependency);
/******/ 									if (idx >= 0) module.children.splice(idx, 1);
/******/ 								}
/******/ 							}
/******/ 						}
/******/ 					}
/******/ 				},
/******/ 				apply: function (reportError) {
/******/ 					// insert new code
/******/ 					for (var updateModuleId in appliedUpdate) {
/******/ 						if (__webpack_require__.o(appliedUpdate, updateModuleId)) {
/******/ 							__webpack_require__.m[updateModuleId] = appliedUpdate[updateModuleId];
/******/ 						}
/******/ 					}
/******/ 		
/******/ 					// run new runtime modules
/******/ 					for (var i = 0; i < currentUpdateRuntime.length; i++) {
/******/ 						currentUpdateRuntime[i](__webpack_require__);
/******/ 					}
/******/ 		
/******/ 					// call accept handlers
/******/ 					for (var outdatedModuleId in outdatedDependencies) {
/******/ 						if (__webpack_require__.o(outdatedDependencies, outdatedModuleId)) {
/******/ 							var module = __webpack_require__.c[outdatedModuleId];
/******/ 							if (module) {
/******/ 								moduleOutdatedDependencies =
/******/ 									outdatedDependencies[outdatedModuleId];
/******/ 								var callbacks = [];
/******/ 								var errorHandlers = [];
/******/ 								var dependenciesForCallbacks = [];
/******/ 								for (var j = 0; j < moduleOutdatedDependencies.length; j++) {
/******/ 									var dependency = moduleOutdatedDependencies[j];
/******/ 									var acceptCallback =
/******/ 										module.hot._acceptedDependencies[dependency];
/******/ 									var errorHandler =
/******/ 										module.hot._acceptedErrorHandlers[dependency];
/******/ 									if (acceptCallback) {
/******/ 										if (callbacks.indexOf(acceptCallback) !== -1) continue;
/******/ 										callbacks.push(acceptCallback);
/******/ 										errorHandlers.push(errorHandler);
/******/ 										dependenciesForCallbacks.push(dependency);
/******/ 									}
/******/ 								}
/******/ 								for (var k = 0; k < callbacks.length; k++) {
/******/ 									try {
/******/ 										callbacks[k].call(null, moduleOutdatedDependencies);
/******/ 									} catch (err) {
/******/ 										if (typeof errorHandlers[k] === "function") {
/******/ 											try {
/******/ 												errorHandlers[k](err, {
/******/ 													moduleId: outdatedModuleId,
/******/ 													dependencyId: dependenciesForCallbacks[k]
/******/ 												});
/******/ 											} catch (err2) {
/******/ 												if (options.onErrored) {
/******/ 													options.onErrored({
/******/ 														type: "accept-error-handler-errored",
/******/ 														moduleId: outdatedModuleId,
/******/ 														dependencyId: dependenciesForCallbacks[k],
/******/ 														error: err2,
/******/ 														originalError: err
/******/ 													});
/******/ 												}
/******/ 												if (!options.ignoreErrored) {
/******/ 													reportError(err2);
/******/ 													reportError(err);
/******/ 												}
/******/ 											}
/******/ 										} else {
/******/ 											if (options.onErrored) {
/******/ 												options.onErrored({
/******/ 													type: "accept-errored",
/******/ 													moduleId: outdatedModuleId,
/******/ 													dependencyId: dependenciesForCallbacks[k],
/******/ 													error: err
/******/ 												});
/******/ 											}
/******/ 											if (!options.ignoreErrored) {
/******/ 												reportError(err);
/******/ 											}
/******/ 										}
/******/ 									}
/******/ 								}
/******/ 							}
/******/ 						}
/******/ 					}
/******/ 		
/******/ 					// Load self accepted modules
/******/ 					for (var o = 0; o < outdatedSelfAcceptedModules.length; o++) {
/******/ 						var item = outdatedSelfAcceptedModules[o];
/******/ 						var moduleId = item.module;
/******/ 						try {
/******/ 							item.require(moduleId);
/******/ 						} catch (err) {
/******/ 							if (typeof item.errorHandler === "function") {
/******/ 								try {
/******/ 									item.errorHandler(err, {
/******/ 										moduleId: moduleId,
/******/ 										module: __webpack_require__.c[moduleId]
/******/ 									});
/******/ 								} catch (err2) {
/******/ 									if (options.onErrored) {
/******/ 										options.onErrored({
/******/ 											type: "self-accept-error-handler-errored",
/******/ 											moduleId: moduleId,
/******/ 											error: err2,
/******/ 											originalError: err
/******/ 										});
/******/ 									}
/******/ 									if (!options.ignoreErrored) {
/******/ 										reportError(err2);
/******/ 										reportError(err);
/******/ 									}
/******/ 								}
/******/ 							} else {
/******/ 								if (options.onErrored) {
/******/ 									options.onErrored({
/******/ 										type: "self-accept-errored",
/******/ 										moduleId: moduleId,
/******/ 										error: err
/******/ 									});
/******/ 								}
/******/ 								if (!options.ignoreErrored) {
/******/ 									reportError(err);
/******/ 								}
/******/ 							}
/******/ 						}
/******/ 					}
/******/ 		
/******/ 					return outdatedModules;
/******/ 				}
/******/ 			};
/******/ 		}
/******/ 		__webpack_require__.hmrI.jsonp = function (moduleId, applyHandlers) {
/******/ 			if (!currentUpdate) {
/******/ 				currentUpdate = {};
/******/ 				currentUpdateRuntime = [];
/******/ 				currentUpdateRemovedChunks = [];
/******/ 				applyHandlers.push(applyHandler);
/******/ 			}
/******/ 			if (!__webpack_require__.o(currentUpdate, moduleId)) {
/******/ 				currentUpdate[moduleId] = __webpack_require__.m[moduleId];
/******/ 			}
/******/ 		};
/******/ 		__webpack_require__.hmrC.jsonp = function (
/******/ 			chunkIds,
/******/ 			removedChunks,
/******/ 			removedModules,
/******/ 			promises,
/******/ 			applyHandlers,
/******/ 			updatedModulesList
/******/ 		) {
/******/ 			applyHandlers.push(applyHandler);
/******/ 			currentUpdateChunks = {};
/******/ 			currentUpdateRemovedChunks = removedChunks;
/******/ 			currentUpdate = removedModules.reduce(function (obj, key) {
/******/ 				obj[key] = false;
/******/ 				return obj;
/******/ 			}, {});
/******/ 			currentUpdateRuntime = [];
/******/ 			chunkIds.forEach(function (chunkId) {
/******/ 				if (
/******/ 					__webpack_require__.o(installedChunks, chunkId) &&
/******/ 					installedChunks[chunkId] !== undefined
/******/ 				) {
/******/ 					promises.push(loadUpdateChunk(chunkId, updatedModulesList));
/******/ 					currentUpdateChunks[chunkId] = true;
/******/ 				} else {
/******/ 					currentUpdateChunks[chunkId] = false;
/******/ 				}
/******/ 			});
/******/ 			if (__webpack_require__.f) {
/******/ 				__webpack_require__.f.jsonpHmr = function (chunkId, promises) {
/******/ 					if (
/******/ 						currentUpdateChunks &&
/******/ 						__webpack_require__.o(currentUpdateChunks, chunkId) &&
/******/ 						!currentUpdateChunks[chunkId]
/******/ 					) {
/******/ 						promises.push(loadUpdateChunk(chunkId));
/******/ 						currentUpdateChunks[chunkId] = true;
/******/ 					}
/******/ 				};
/******/ 			}
/******/ 		};
/******/ 		
/******/ 		__webpack_require__.hmrM = () => {
/******/ 			if (typeof fetch === "undefined") throw new Error("No browser support: need fetch API");
/******/ 			return fetch(__webpack_require__.p + __webpack_require__.hmrF()).then((response) => {
/******/ 				if(response.status === 404) return; // no update available
/******/ 				if(!response.ok) throw new Error("Failed to fetch update manifest " + response.statusText);
/******/ 				return response.json();
/******/ 			});
/******/ 		};
/******/ 		
/******/ 		// no on chunks loaded
/******/ 		
/******/ 		// no jsonp function
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// module cache are used so entry inlining is disabled
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	__webpack_require__("./node_modules/webpack-dev-server/client/index.js?protocol=ws%3A&hostname=0.0.0.0&port=8080&pathname=%2Fws&logging=info&overlay=true&reconnect=10&hot=true&live-reload=true");
/******/ 	__webpack_require__("./node_modules/webpack/hot/dev-server.js");
/******/ 	__webpack_require__("./src/scripts/index.js");
/******/ 	var __webpack_exports__ = __webpack_require__("./src/styles/index.css");
/******/ 	
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Q0o7QUFDQTtBQUNBLG9CQUFvQixTQUFTO0FBQzdCO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxnQkFBZ0I7QUFDaEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFRO0FBQ1I7O0FBRUEsa0NBQWtDLFFBQVE7QUFDMUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDVjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FB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QXlCLDZCQUE2QiwyQkFBMkIseUJBQXlCLHlCQUF5Qix1QkFBdUIscUJBQXFCLHFCQUFxQixjQUFjLGNBQWMsZUFBZSxlQUFlLGFBQWEsYUFBYSxjQUFjLGFBQWEsYUFBYSxlQUFlLGFBQWEsWUFBWSxZQUFZLFlBQVksY0FBYyxjQUFjLGNBQWMsY0FBYyxjQUFjLGNBQWMsY0FBYyxjQUFjLGVBQWUsZUFBZSxlQUFlLGVBQWUsZUFBZSxhQUFhLGFBQWEsY0FBYyxhQUFhLGNBQWMsY0FBYyxnQkFBZ0IsYUFBYSxZQUFZLGNBQWMsYUFBYSxjQUFjLGVBQWUsV0FBVyxXQUFXLFdBQVcsZ0JBQWdCLFdBQVcsWUFBWSxjQUFjLFlBQVksZ0JBQWdCLFlBQVksWUFBWSxZQUFZLGNBQWMsY0FBYyxhQUFhLGNBQWMsY0FBYyxnQkFBZ0IsYUFBYSxZQUFZLGNBQWMsYUFBYSxjQUFjLGVBQWUsV0FBVyxXQUFXLFdBQVcsZ0JBQWdCLFdBQVcsWUFBWSxlQUFlLGNBQWMsWUFBWSxnQkFBZ0IsWUFBWSxZQUFZLFlBQVksY0FBYyxpQkFBaUIsY0FBYyxZQUFZLGFBQWEsZUFBZSxjQUFjLGNBQWMsY0FBYyxjQUFjLGVBQWUsY0FBYyxhQUFhLGNBQWMsZ0JBQWdCLGFBQWEsYUFBYSxhQUFhLGFBQWEsYUFBYSxjQUFjLGFBQWEsYUFBYSxhQUFhLGFBQWEsYUFBYSxlQUFlLGFBQWEsY0FBYyxjQUFjLGNBQWMsYUFBYSxjQUFjLFdBQVcsYUFBYSxZQUFZLGNBQWMsZUFBZSxjQUFjLGFBQWEsY0FBYyxZQUFZLFlBQVksV0FBVyxZQUFZLFlBQVksWUFBWSxlQUFlLFlBQVksYUFBYSxjQUFjLFdBQVcsY0FBYyxXQUFXLFdBQVcsWUFBWSxZQUFZLGFBQWEsYUFBYSxhQUFhLGNBQWMsZUFBZSxhQUFhLGFBQWEsY0FBYyxjQUFjLGVBQWUsZUFBZSxhQUFhLGFBQWEsWUFBWSxlQUFlLGNBQWMsZUFBZSxjQUFjLE1BQU0sYUFBYSxXQUFXLGFBQWEsY0FBYyxhQUFhLGNBQWMsZUFBZSxZQUFZLGVBQWUsYUFBYSxZQUFZLGFBQWEsYUFBYSxjQUFjLFlBQVksWUFBWSxZQUFZLGFBQWEsWUFBWSxlQUFlLGFBQWEsYUFBYSxjQUFjLGNBQWMsYUFBYSxlQUFlLGNBQWMsYUFBYSxhQUFhLGNBQWMsZUFBZSxlQUFlLGVBQWUsZUFBZSxlQUFlLGVBQWUsY0FBYyxlQUFlLGFBQWEsY0FBYyxjQUFjLGVBQWUsZUFBZSxlQUFlLGNBQWMsYUFBYSxlQUFlLGVBQWUsY0FBYyxhQUFhLFlBQVksZUFBZSxlQUFlLGVBQWUsY0FBYyxlQUFlLGFBQWEsY0FBYyxlQUFlLGVBQWUsZUFBZSxjQUFjLGFBQWEsZUFBZSxjQUFjLGNBQWMsZUFBZSxlQUFlLGNBQWMsZUFBZSxhQUFhLGNBQWMsY0FBYyxlQUFlLGVBQWUsZUFBZSxjQUFjLGFBQWEsZUFBZSxlQUFlLGNBQWMsYUFBYSxZQUFZLGVBQWUsZUFBZSxlQUFlLGNBQWMsZUFBZSxhQUFhLGVBQWUsZUFBZSxlQUFlLGVBQWUsY0FBYyxhQUFhLGVBQWUsY0FBYyxhQUFhLGFBQWEsWUFBWSxXQUFXLFdBQVcsY0FBYyxjQUFjLGVBQWUsZUFBZSxhQUFhLGFBQWEsY0FBYyxhQUFhLGFBQWEsZUFBZSxhQUFhLFlBQVksWUFBWSxZQUFZLGNBQWMsY0FBYyxjQUFjLGNBQWMsY0FBYyxjQUFjLGNBQWMsY0FBYyxlQUFlLGVBQWUsZUFBZSxlQUFlLGVBQWUsYUFBYSxhQUFhLGNBQWMsYUFBYSxjQUFjLGNBQWMsZ0JBQWdCLGFBQWEsWUFBWSxjQUFjLGFBQWEsY0FBYyxlQUFlLFdBQVcsV0FBVyxXQUFXLGdCQUFnQixXQUFXLFlBQVksY0FBYyxZQUFZLGdCQUFnQixZQUFZLFlBQVksWUFBWSxjQUFjLGNBQWMsYUFBYSxjQUFjLGNBQWMsZ0JBQWdCLGFBQWEsWUFBWSxjQUFjLGFBQWEsY0FBYyxlQUFlLFdBQVcsV0FBVyxXQUFXLGdCQUFnQixXQUFXLFlBQVksZUFBZSxjQUFjLFlBQVksZ0JBQWdCLFlBQVksWUFBWSxZQUFZLGNBQWMsaUJBQWlCLGNBQWMsWUFBWSxhQUFhLGVBQWUsY0FBYyxjQUFjLGNBQWMsY0FBYyxlQUFlLGNB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YUFBYSxjQUFjLGNBQWMsY0FBYyxtQkFBbUIsY0FBYyxhQUFhLGNBQWMsYUFBYSxpQkFBaUIsZ0JBQWdCLGdCQUFnQixjQUFjLGdCQUFnQixjQUFjLGNBQWMsZUFBZSxhQUFhLGNBQWMsYUFBYSxZQUFZLGNBQWMsZUFBZSxhQUFhLGFBQWEsYUFBYSxhQUFhLDBCQUEwQixlQUFlLGVBQWUsYUFBYSxjQUFjLGNBQWMsZUFBZSxjQUFjLGVBQWUsYUFBYSxjQUFjLGNBQWMsYUFBYSxXQUFXLGNBQWMsY0FBYyxhQUFhLGFBQWEsYUFBYSxlQUFlLGNBQWMsWUFBWSxhQUFhLGNBQWMsY0FBYyxhQUFhLGFBQWEsZUFBZSxlQUFlLFlBQVksYUFBYSxhQUFhLGVBQWUsaUJBQWlCLGNBQWMsZUFBZSxlQUFlLGVBQWUsYUFBYSxZQUFZLGNBQWMsWUFBWSxjQUFjLGFBQWEsZUFBZSxjQUFjLGNBQWMsY0FBYyxjQUFjLGNBQWMsZUFBZSxhQUFhLGlCQUFpQixhQUFhLGNBQWMsYUFBYSxzQkFBc0IsaUJBQWlCLGlCQUFpQixpQkFBaUIsaUJBQWlCLGlCQUFpQixpQkFBaUIsaUJBQWlCLGlCQUFpQixjQUFjLGdCQUFnQixpQkFBaUIsZUFBZSxnQkFBZ0IsY0FBYyxjQUFjLFlBQVksZUFBZSxpQkFBaUIsYUFBYSxhQUFhLGNBQWMsY0FBYyxlQUFlLGVBQWUsYUFBYSxjQUFjLGFBQWEsY0FBYyxjQUFjLGVBQWUsYUFBYSxjQUFjLGVBQWUsaUJBQWlCLGlCQUFpQixZQUFZLGVBQWUsZ0JBQWdCLGFBQWEsYUFBYSxjQUFjLGFBQWEsY0FBYyxjQUFjLGVBQWUsZUFBZSxlQUFlLGNBQWMsY0FBYyxjQUFjLGVBQWUsY0FBYyxhQUFhLGNBQWMsY0FBYyxjQUFjLGNBQWMsY0FBYyxjQUFjLGNBQWMsY0FBYyxjQUFjLGFBQWEsaUJBQWlCLGFBQWEsY0FBYyxlQUFlLGNBQWMsY0FBYyxjQUFjLGNBQWMsYUFBYSxjQUFjLGNBQWMsY0FBYyxjQUFjLGNBQWMsY0FBYyxjQUFjLGNBQWMsYUFBYSxjQUFjLGNBQWMsY0FBYyxjQUFjLGNBQWMsY0FBYyxlQUFlLGNBQWMsY0FBYyxjQUFjLGNBQWMsY0FBYyxjQUFjLGNBQWMsY0FBYyxlQUFlLGNBQWMsZUFBZSxjQUFjLGNBQWMsY0FBYyxjQUFjLGFBQWEsY0FBYyxjQUFjLGNBQWMsY0FBYyxjQUFjLGNBQWMsZUFBZSxjQUFjLGNBQWMsY0FBYyxjQUFjLGlCQUFpQixlQUFlLGNBQWMsZUFBZSxZQUFZLGVBQWUsaUJBQWlCLGVBQWUsZUFBZSxlQUFlLGNBQWMsY0FBYyxjQUFjLGVBQWUsZUFBZSxjQUFjLGNBQWMsZ0JBQWdCLGFBQWEsZ0JBQWdCLGFBQWEsYUFBYSxhQUFhLGtCQUFrQixZQUFZLFlBQVksYUFBYSxhQUFhLGFBQWEsY0FBYyxjQUFjLFdBQVcsYUFBYSxhQUFhLGNBQWMsaUJBQWlCLGVBQWUsZ0JBQWdCLGlCQUFpQixjQUFjLGNBQWMsZUFBZSxtQkFBbUIsZ0JBQWdCLGNBQWMsZUFBZSxjQUFjLGNBQWMsY0FBYyxhQUFhLGNBQWMsYUFBYSxjQUFjLGNBQWMsZ0JBQWdCLGdCQUFnQixvQkFBb0Isb0JBQW9CLHVCQUF1QixnQkFBZ0IsWUFBWSxpQkFBaUIsZUFBZSxlQUFlLGVBQWUsY0FBYyxjQUFjLHdCQUF3QixnQkFBZ0IsY0FBYyxjQUFjLGVBQWUsY0FBYyxlQUFlLGFBQWEsZUFBZSxlQUFlLGVBQWUsY0FBYyxlQUFlLFlBQVksdUJBQXVCLGNBQWMsWUFBWSxjQUFjLGdCQUFnQixlQUFlLGFBQWEsY0FBYyxlQUFlLGNBQWMsZUFBZSxlQUFlLGFBQWEsaUJBQWlCLGVBQWUsYUFBYSxjQUFjLGFBQWEsZUFBZSxlQUFlLGNBQWMsaUJBQWlCLGVBQWUsY0FBYyxhQUFhLGFBQWEsZUFBZSxjQUFjLHFCQUFxQixnQkFBZ0IsYUFBYSxpQkFBaUIsZUFBZSxlQUFlLGVBQWUsZUFBZSxjQUFjLGdCQUFnQixZQUFZLGFBQWEsc0JBQXNCLGFBQWEsV0FBVyxlQUFlLG1CQUFtQixlQUFlLFdBQVcsaUJBQWlCLFlBQVksb0JBQW9CLGVBQWUsY0FBYyxtQkFBbUIsZUFBZSxlQUFlLGFBQWEsWUFBWSxhQUFhLGNBQWMsY0FBYyxhQUFhLGVBQWUsY0FBYyxnQkFBZ0IsbUJBQW1CLGVBQWUsZ0JBQWdCLGdCQUFnQixpQkFBaUIscUJBQXFCLGNBQWMsYUFBYSxZQUFZLFlBQVksYUFBYSxhQUFhLGFBQWEsWUFBWSxlQUFlLGVBQWUsY0FBYyxlQUFlLGFBQWEsY0FBYyxhQUFhLGFBQWEsY0FBYyxjQUFjLGFBQWEsY0FBYyxrQkFBa0IsY0FBYyxpQkFBaUIsYUFBYSxlQUFlLGVBQWUsZUFBZSxlQUFlLGVBQWUsZUFBZSxlQUFlLGVBQWUsZUFBZSxlQUFlLGVBQWUsZUFBZSxlQUFlLGVBQWUsY0FBYyxlQUFlLGNBQWMsbUJBQW1CLGVBQWUsY0FBYyxrQkFBa0IsZUFBZSxjQUFjLFlBQVksYUFBYSxjQUFjLGVBQWUsZ0JBQWdCLGlCQUFpQixjQUFjLGVBQWUsYUFBYSxjQUFjLGFBQWEsWUFBWSxZQUFZLFlBQVksY0FBYyxpQkFBaUIsYUFBYSxjQUFjLGNBQWMsYUFBYSxjQUFjLGNBQWMsYUFBYSxjQUFjLGVBQWUsZUFBZSxnQkFBZ0IsZUFBZSxjQUFjLGVBQWUsZ0JBQWdCLDRCQUE0QixlQUFlLGNBQWMsa0JBQWtCLGFBQWEsZUFBZSxhQUFhLGVBQWUsZUFBZSxjQUFjLGVBQWUsZUFBZSxlQUFlLGNBQWMsZUFBZSxjQUFjLGVBQWUsZUFBZSxlQUFlLGNBQWMsWUFBWSxhQUFhLGNBQWMsYUFBYSxlQUFlLGFBQWEsYUFBYSxlQUFlLGNBQWMsY0FBYyxjQUFjLGVBQWUsYUFBYSxjQUFjLGVBQWUsY0FBYyxpQkFBaUIsaUJBQWlCLGlCQUFpQixjQUFjLGFBQWEsY0FBYyxjQUFjLGFBQWEsZUFBZSxjQUFjLGNBQWMsZ0JBQWdCLGNBQWMsZUFBZSxlQUFlLGNBQWMsYUFBYSxjQUFjLFlBQVksYUFBYSxjQUFjLGNBQWMsY0FBYyxlQUFlLGNBQWMsY0FBYyxpQkFBaUIsZUFBZSxZQUFZLGFBQWEsZUFBZSxhQUFhLGFBQWEsY0FBYyxjQUFjLGVBQWUsY0FBYyxtQkFBbUIsYUFBYSxlQUFlLGlCQUFpQixlQUFlLGNBQWMsbUJBQW1CLGNBQWMsZ0JBQWdCLGVBQWUsc0JBQXNCLGVBQWUsZ0JBQWdCLHNCQUFzQixZQUFZLGVBQWUsYUFBYSxlQUFlLGNBQWMsY0FBYyxJQUFJLFNBQVMsYUFBYSxjQUFjLGdCQUFnQixnQkFBZ0IsZUFBZSxlQUFlLFlBQVksYUFBYSxnQkFBZ0IsaUJBQWlCLGFBQWEsWUFBWSxjQUFjLGVBQWUsY0FBYyxlQUFlLGdCQUFnQixpQkFBaUIsY0FBYyxlQUFlLGNBQWMsZUFBZSxhQUFhLFlBQVksZUFBZSxjQUFjLGFBQWEsZUFBZSxjQUFjLGVBQWUsbUJBQW1CLGNBQWMsaUJBQWlCLGFBQWEsY0FBYyxjQUFjLGNBQWMsYUFBYSxlQUFlLGNBQWMsY0FBYyxlQUFlLGdCQUFnQixlQUFlLGdCQUFnQixhQUFhLGVBQWUsZUFBZSxZQUFZLGNBQWMsZUFBZSxjQUFjLGNBQWMsY0FBYyxjQUFjLGVBQWUsYUFBYSxjQUFjLGVBQWUsZUFBZSxnQkFBZ0IsZUFBZSxxQkFBcUIsaUJBQWlCLGdCQUFnQixjQUFjLGNBQWMsY0FBYyxhQUFhLGdCQUFnQixlQUFlLGVBQWUsWUFBWSxjQUFjLGFBQWEsWUFBWSxjQUFjLGVBQWUsY0FBYyxnQkFBZ0IsYUFBYSxlQUFlLGNBQWMsY0FBYyxXQUFXLGNBQWMsYUFBYSxhQUFhLGNBQWMsY0FBYyxhQUFhLGFBQWEsY0FBYyxlQUFlLGVBQWUsZUFBZSxjQUFjLGNBQWMsZUFBZSxjQUFjLGdCQUFnQixhQUFhLGVBQWUsZUFBZSxrQkFBa0IsYUFBYSxZQUFZLGNBQWMsY0FBYyxlQUFlLGVBQWUsYUFBYSxhQUFhLHdCQUF3QixjQUFjLFlBQVksYUFBYSxhQUFhLGVBQWUsbUJBQW1CLGFBQWEsY0FBYyxZQUFZLGdCQUFnQixrQkFBa0IsZ0JBQWdCLGdCQUFnQixnQkFBZ0IsZ0JBQWdCLGdCQUFnQixlQUFlLGdCQUFnQixvQkFBb0IsZ0JBQWdCLGdCQUFnQixjQUFjLGFBQWEsb0JBQW9CLGFBQWEsb0JBQW9CLGVBQWUsV0FBVyxZQUFZLGVBQWUsY0FBYyxlQUFlLGVBQWUsY0FBYyxlQUFlLGNBQWMsY0FBYyxnQkFBZ0IsZUFBZSxjQUFjLGNBQWMsaUJBQWlCLGVBQWUsaUJBQWlCLGVBQWUsY0FBYyxlQUFlLGVBQWUsZUFBZSxjQUFjLFlBQVksZUFBZSxhQUFhLGVBQWUsY0FBYyxjQUFjLGFBQWEsYUFBYSxlQUFlLFlBQVksY0FBYyxjQUFjLGdCQUFnQixZQUFZLGNBQWMsY0FBYyxnQkFBZ0IsYUFBYSxjQUFjLGFBQWEsY0FBYyxZQUFZLFlBQVksYUFBYSxhQUFhLGFBQWEsZUFBZSxhQUFhLGdCQUFnQixZQUFZLGVBQWUsYUFBYSxlQUFlLGlCQUFpQixhQUFhLGNBQWMsYUFBYSxlQUFlLGNBQWMsWUFBWSxlQUFlLGVBQWUsZUFBZSxnQkFBZ0IsYUFBYSxZQUFZLGVBQWUsY0FBYyxXQUFXLGNBQWMsZ0JBQWdCLGFBQWEsaUJBQWlCLGdCQUFnQixlQUFlLGNBQWMsZ0JBQWdCLGdCQUFnQixpQkFBaUIsY0FBYyxjQUFjLFlBQVksbUJBQW1CLGNBQWMsYUFBYSxlQUFlLGNBQWMsaUJBQWlCLGlCQUFpQixpQkFBaUIsZUFBZSxjQUFjLFlBQVksZUFBZSxhQUFhLGNBQWMsZUFBZSxjQUFjLGdCQUFnQixjQUFjLGVBQWUsYUFBYSxjQUFjLGVBQWUsaUJBQWlCLGNBQWMsY0FBYyxjQUFjLGVBQWUsZ0JBQWdCLGNBQWMsZUFBZSxlQUFlLGdCQUFnQix1QkFBdUIsd0JBQXdCLGVBQWUsY0FBYyxjQUFjLElBQUksU0FBUyxhQUFhLGNBQWMsZ0JBQWdCLGdCQUFnQixlQUFlLGVBQWUsWUFBWSxhQUFhLGdCQUFnQixhQUFhLGFBQWEsZUFBZSxhQUFhLGVBQWUsWUFBWSxlQUFlLGNBQWMsZUFBZSxhQUFhLFlBQVksbUJBQW1CLGNBQWMsY0FBYyxjQUFjLGNBQWMsY0FBYyxlQUFlLGdCQUFnQixhQUFhLGVBQWUsaUJBQWlCLGVBQWUsY0FBYyxlQUFlLHNCQUFzQixpQkFBaUIsZ0JBQWdCLFdBQVcsZUFBZSxZQUFZLG1CQUFtQixlQUFlLGVBQWUsY0FBYyxpQkFBaUIsb0JBQW9CLGlCQUFpQixpQkFBaUIsWUFBWSxhQUFhLGNBQWMsY0FBYyxhQUFhLElBQUksU0FBUyxhQUFhLGFBQWEsYUFBYSxjQUFjLGVBQWUsYUFBYSxZQUFZLGNBQWMsaUJBQWlCLGVBQWUsYUFBYSxjQUFjLGFBQWEsY0FBYyxjQUFjLGdCQUFnQixnQkFBZ0IsZUFBZSxpQkFBaUIsZUFBZSxZQUFZLGFBQWEsZUFBZSxlQUFlLFlBQVksYUFBYSxlQUFlLGNBQWMsa0JBQWtCLGdCQUFnQixnQkFBZ0IsY0FBYyxhQUFhLGVBQWUsa0JBQWtCLGVBQWUsZ0JBQWdCLGdCQUFnQixtQkFBbUIsa0JBQWtCLGdCQUFnQixnQkFBZ0IsZUFBZSxlQUFlLGVBQWUsYUFBYSxhQUFhLGFBQWEsYUFBYSxrQkFBa0IsZUFBZSxnQkFBZ0IsZ0JBQWdCLGdCQUFnQixnQkFBZ0IsZ0JBQWdCLGdCQUFnQixtQkFBbUIsa0JBQWtCLGdCQUFnQixlQUFlLGVBQWUsZUFBZSxjQUFjLGVBQWUsY0FBYyxlQUFlLFlBQVksZUFBZSxlQUFlLFlBQVksZUFBZSxhQUFhLGNBQWMsaUJBQWlCLGNBQWMsY0FBYyxpQkFBaUIsZUFBZSxlQUFlLGVBQWUsY0FBYyxnQkFBZ0IsZUFBZSxhQUFhLGFBQWEsZUFBZSxpQkFBaUIsZ0JBQWdCLGNBQWMsZ0JBQWdCLGlCQUFpQixjQUFjLGFBQWEsY0FBYyxlQUFlLGFBQWEsZUFBZSxjQUFjLGVBQWUsY0FBYyxZQUFZLGVBQWUsZUFBZSxhQUFhLGVBQWUsY0FBYyxpQkFBaUIsZUFBZSxjQUFjLGNBQWMsY0FBYyxjQUFjLGdCQUFnQixjQUFjLGlCQUFpQixlQUFlLGNBQWMsY0FBYyxjQUFjLGNBQWMsZUFBZSxhQUFhLGdCQUFnQixhQUFhLGNBQWMsZUFBZSxnQkFBZ0IsZ0JBQWdCLGdCQUFnQixnQkFBZ0IsWUFBWSxlQUFlLGNBQWMsZUFBZSxhQUFhLGNBQWMsY0FBYyxnQkFBZ0IsY0FBYyxlQUFlLGVBQWUsV0FBVyxhQUFhLGNBQWMsY0FBYyxhQUFhLFdBQVcsYUFBYSxjQUFjLGNBQWMsZUFBZSxhQUFhLGNBQWMsWUFBWSxZQUFZLGFBQWEsYUFBYSxj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QTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLEVBQUU7V0FDRjs7V0FFQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTs7V0FFQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTs7V0FFQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EsR0FBRztXQUNIO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLG1CQUFtQiwyQkFBMkI7V0FDOUM7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLEtBQUs7V0FDTDtXQUNBOztXQUVBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBOztXQUVBO1dBQ0Esa0JBQWtCLGNBQWM7V0FDaEM7V0FDQTtXQUNBO1dBQ0E7O1dBRUE7V0FDQTtXQUNBO1dBQ0E7V0FDQTs7V0FFQTtXQUNBO1dBQ0E7V0FDQTtXQUNBOztXQUVBO1dBQ0E7V0FDQTtXQUNBLGNBQWMsTUFBTTtXQUNwQjtXQUNBO1dBQ0E7V0FDQSxLQUFLO1dBQ0w7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLGNBQWMsYUFBYTtXQUMzQjtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7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bm9kZV9tb2R1bGVzL2Fuc2ktaHRtbC1jb21tdW5pdHkvaW5kZXguanMiLCJ3ZWJwYWNrOi8vbXktaG9sc3Qtc2l0ZS8uL25vZGVfbW9kdWxlcy9ldmVudHMvZXZlbnRzLmpzIiwid2VicGFjazovL215LWhvbHN0LXNpdGUvLi9ub2RlX21vZHVsZXMvaHRtbC1lbnRpdGllcy9saWIvaW5kZXguanMiLCJ3ZWJwYWNrOi8vbXktaG9sc3Qtc2l0ZS8uL25vZGVfbW9kdWxlcy9odG1sLWVudGl0aWVzL2xpYi9uYW1lZC1yZWZlcmVuY2VzLmpzIiwid2VicGFjazovL215LWhvbHN0LXNpdGUvLi9ub2RlX21vZHVsZXMvaHRtbC1lbnRpdGllcy9saWIvbnVtZXJpYy11bmljb2RlLW1hcC5qcyIsIndlYnBhY2s6Ly9teS1ob2xzdC1zaXRlLy4vbm9kZV9tb2R1bGVzL2h0bWwtZW50aXRpZXMvbGliL3N1cnJvZ2F0ZS1wYWlycy5qcyIsIndlYnBhY2s6Ly9teS1ob2xzdC1zaXRlLy4vbm9kZV9tb2R1bGVzL3dlYnBhY2stZGV2LXNlcnZlci9jbGllbnQvY2xpZW50cy9XZWJTb2NrZXRDbGllbnQuanMiLCJ3ZWJwYWNrOi8vbXktaG9sc3Qtc2l0ZS8uL25vZGVfbW9kdWxlcy93ZWJwYWNrLWRldi1zZXJ2ZXIvY2xpZW50L2luZGV4LmpzIiwid2VicGFjazovL215LWhvbHN0LXNpdGUvLi9ub2RlX21vZHVsZXMvd2VicGFjay1kZXYtc2VydmVyL2NsaWVudC9tb2R1bGVzL2xvZ2dlci9pbmRleC5qcyIsIndlYnBhY2s6Ly9teS1ob2xzdC1zaXRlLy4vbm9kZV9tb2R1bGVzL3dlYnBhY2stZGV2LXNlcnZlci9jbGllbnQvb3ZlcmxheS5qcyIsIndlYnBhY2s6Ly9teS1ob2xzdC1zaXRlLy4vbm9kZV9tb2R1bGVzL3dlYnBhY2stZGV2LXNlcnZlci9jbGllbnQvb3ZlcmxheS9mc20uanMiLCJ3ZWJwYWNrOi8vbXktaG9sc3Qtc2l0ZS8uL25vZGVfbW9kdWxlcy93ZWJwYWNrLWRldi1zZXJ2ZXIvY2xpZW50L292ZXJsYXkvcnVudGltZS1lcnJvci5qcyIsIndlYnBhY2s6Ly9teS1ob2xzdC1zaXRlLy4vbm9kZV9tb2R1bGVzL3dlYnBhY2stZGV2LXNlcnZlci9jbGllbnQvb3ZlcmxheS9zdGF0ZS1tYWNoaW5lLmpzIiwid2VicGFjazovL215LWhvbHN0LXNpdGUvLi9ub2RlX21vZHVsZXMvd2VicGFjay1kZXYtc2VydmVyL2NsaWVudC9vdmVybGF5L3N0eWxlcy5qcyIsIndlYnBhY2s6Ly9teS1ob2xzdC1zaXRlLy4vbm9kZV9tb2R1bGVzL3dlYnBhY2stZGV2LXNlcnZlci9jbGllbnQvc29ja2V0LmpzIiwid2VicGFjazovL215LWhvbHN0LXNpdGUvLi9ub2RlX21vZHVsZXMvd2VicGFjay1kZXYtc2VydmVyL2NsaWVudC91dGlscy9jcmVhdGVTb2NrZXRVUkwuanMiLCJ3ZWJwYWNrOi8vbXktaG9sc3Qtc2l0ZS8uL25vZGVfbW9kdWxlcy93ZWJwYWNrLWRldi1zZXJ2ZXIvY2xpZW50L3V0aWxzL2dldEN1cnJlbnRTY3JpcHRTb3VyY2UuanMiLCJ3ZWJwYWNrOi8vbXktaG9sc3Qtc2l0ZS8uL25vZGVfbW9kdWxlcy93ZWJwYWNrLWRldi1zZXJ2ZXIvY2xpZW50L3V0aWxzL2xvZy5qcyIsIndlYnBhY2s6Ly9teS1ob2xzdC1zaXRlLy4vbm9kZV9tb2R1bGVzL3dlYnBhY2stZGV2LXNlcnZlci9jbGllbnQvdXRpbHMvcGFyc2VVUkwuanMiLCJ3ZWJwYWNrOi8vbXktaG9sc3Qtc2l0ZS8uL25vZGVfbW9kdWxlcy93ZWJwYWNrLWRldi1zZXJ2ZXIvY2xpZW50L3V0aWxzL3JlbG9hZEFwcC5qcyIsIndlYnBhY2s6Ly9teS1ob2xzdC1zaXRlLy4vbm9kZV9tb2R1bGVzL3dlYnBhY2stZGV2LXNlcnZlci9jbGllbnQvdXRpbHMvc2VuZE1lc3NhZ2UuanMiLCJ3ZWJwYWNrOi8vbXktaG9sc3Qtc2l0ZS8uL25vZGVfbW9kdWxlcy93ZWJwYWNrLWRldi1zZXJ2ZXIvY2xpZW50L3V0aWxzL3N0cmlwQW5zaS5qcyIsIndlYnBhY2s6Ly9teS1ob2xzdC1zaXRlLy4vbm9kZV9tb2R1bGVzL3dlYnBhY2svaG90L2Rldi1zZXJ2ZXIuanMiLCJ3ZWJwYWNrOi8vbXktaG9sc3Qtc2l0ZS8uL25vZGVfbW9kdWxlcy93ZWJwYWNrL2hvdC9lbWl0dGVyLmpzIiwid2VicGFjazovL215LWhvbHN0LXNpdGUvLi9ub2RlX21vZHVsZXMvd2VicGFjay9ob3QvbG9nLWFwcGx5LXJlc3VsdC5qcyIsIndlYnBhY2s6Ly9teS1ob2xzdC1zaXRlLy4vbm9kZV9tb2R1bGVzL3dlYnBhY2svaG90L2xvZy5qcyIsIndlYnBhY2s6Ly9teS1ob2xzdC1zaXRlLy4vc3JjL3NjcmlwdHMvYW5pbWF0aW9ucy5qcyIsIndlYnBhY2s6Ly9teS1ob2xzdC1zaXRlLy4vc3JjL3NjcmlwdHMvYnVyZ2VyLW1lbnUuanMiLCJ3ZWJwYWNrOi8vbXktaG9sc3Qtc2l0ZS8uL3NyYy9zY3JpcHRzL2ZlZWRiYWNrLXNsaWRlci5qcyIsIndlYnBhY2s6Ly9teS1ob2xzdC1zaXRlLy4vc3JjL3NjcmlwdHMvaGVyby1zbGlkZXIuanMiLCJ3ZWJwYWNrOi8vbXktaG9sc3Qtc2l0ZS8uL3NyYy9zY3JpcHRzL2ltZy10aHVtYm5haWxzLmpzIiwid2VicGFjazovL215LWhvbHN0LXNpdGUvLi9zcmMvc2NyaXB0cy9pbmRleC5qcyIsIndlYnBhY2s6Ly9teS1ob2xzdC1zaXRlLy4vc3JjL3NjcmlwdHMvc3RlcHMtdHJhY2svY3VydmVkLXRyYWNrLmpzIiwid2VicGFjazovL215LWhvbHN0LXNpdGUvLi9zcmMvc2NyaXB0cy9zdGVwcy10cmFjay9zdGVwcy1saW5lLXZhcnMuanMiLCJ3ZWJwYWNrOi8vbXktaG9sc3Qtc2l0ZS8uL3NyYy9zY3JpcHRzL3N0ZXBzLXRyYWNrL3N0cmFpZ2h0LXRyYWNrLmpzIiwid2VicGFjazovL215LWhvbHN0LXNpdGUvLi9zcmMvc2NyaXB0cy9zdGVwcy10cmFjay90cmlhbmdsZS5qcyIsIndlYnBhY2s6Ly9teS1ob2xzdC1zaXRlLy4vc3JjL3NjcmlwdHMvdXRpbHMuanMiLCJ3ZWJwYWNrOi8vbXktaG9sc3Qtc2l0ZS93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9teS1ob2xzdC1zaXRlL3dlYnBhY2svcnVudGltZS9jb21wYXQgZ2V0IGRlZmF1bHQgZXhwb3J0Iiwid2VicGFjazovL215LWhvbHN0LXNpdGUvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL215LWhvbHN0LXNpdGUvd2VicGFjay9ydW50aW1lL2dldCBqYXZhc2NyaXB0IHVwZGF0ZSBjaHVuayBmaWxlbmFtZSIsIndlYnBhY2s6Ly9teS1ob2xzdC1zaXRlL3dlYnBhY2svcnVudGltZS9nZXQgbWluaS1jc3MgY2h1bmsgZmlsZW5hbWUiLCJ3ZWJwYWNrOi8vbXktaG9sc3Qtc2l0ZS93ZWJwYWNrL3J1bnRpbWUvZ2V0IHVwZGF0ZSBtYW5pZmVzdCBmaWxlbmFtZSIsIndlYnBhY2s6Ly9teS1ob2xzdC1zaXRlL3dlYnBhY2svcnVudGltZS9nZXRGdWxsSGFzaCIsIndlYnBhY2s6Ly9teS1ob2xzdC1zaXRlL3dlYnBhY2svcnVudGltZS9nbG9iYWwiLCJ3ZWJwYWNrOi8vbXktaG9sc3Qtc2l0ZS93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL215LWhvbHN0LXNpdGUvd2VicGFjay9ydW50aW1lL2xvYWQgc2NyaXB0Iiwid2VicGFjazovL215LWhvbHN0LXNpdGUvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9teS1ob2xzdC1zaXRlL3dlYnBhY2svcnVudGltZS9ob3QgbW9kdWxlIHJlcGxhY2VtZW50Iiwid2VicGFjazovL215LWhvbHN0LXNpdGUvd2VicGFjay9ydW50aW1lL3B1YmxpY1BhdGgiLCJ3ZWJwYWNrOi8vbXktaG9sc3Qtc2l0ZS93ZWJwYWNrL3J1bnRpbWUvY3NzIGxvYWRpbmciLCJ3ZWJwYWNrOi8vbXktaG9sc3Qtc2l0ZS93ZWJwYWNrL3J1bnRpbWUvanNvbnAgY2h1bmsgbG9hZGluZyIsIndlYnBhY2s6Ly9teS1ob2xzdC1zaXRlL3dlYnBhY2svYmVmb3JlLXN0YXJ0dXAiLCJ3ZWJwYWNrOi8vbXktaG9sc3Qtc2l0ZS93ZWJwYWNrL3N0YXJ0dXAiLCJ3ZWJwYWNrOi8vbXktaG9sc3Qtc2l0ZS93ZWJwYWNrL2FmdGVyLXN0YXJ0dXAiXSwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnXG5cbm1vZHVsZS5leHBvcnRzID0gYW5zaUhUTUxcblxuLy8gUmVmZXJlbmNlIHRvIGh0dHBzOi8vZ2l0aHViLmNvbS9zaW5kcmVzb3JodXMvYW5zaS1yZWdleFxudmFyIF9yZWdBTlNJID0gLyg/Oig/OlxcdTAwMWJcXFspfFxcdTAwOWIpKD86KD86WzAtOV17MSwzfSk/KD86KD86O1swLTldezAsM30pKik/W0EtTXxmLW1dKXxcXHUwMDFiW0EtTV0vXG5cbnZhciBfZGVmQ29sb3JzID0ge1xuICByZXNldDogWydmZmYnLCAnMDAwJ10sIC8vIFtGT1JFR1JPVURfQ09MT1IsIEJBQ0tHUk9VTkRfQ09MT1JdXG4gIGJsYWNrOiAnMDAwJyxcbiAgcmVkOiAnZmYwMDAwJyxcbiAgZ3JlZW46ICcyMDk4MDUnLFxuICB5ZWxsb3c6ICdlOGJmMDMnLFxuICBibHVlOiAnMDAwMGZmJyxcbiAgbWFnZW50YTogJ2ZmMDBmZicsXG4gIGN5YW46ICcwMGZmZWUnLFxuICBsaWdodGdyZXk6ICdmMGYwZjAnLFxuICBkYXJrZ3JleTogJzg4OCdcbn1cbnZhciBfc3R5bGVzID0ge1xuICAzMDogJ2JsYWNrJyxcbiAgMzE6ICdyZWQnLFxuICAzMjogJ2dyZWVuJyxcbiAgMzM6ICd5ZWxsb3cnLFxuICAzNDogJ2JsdWUnLFxuICAzNTogJ21hZ2VudGEnLFxuICAzNjogJ2N5YW4nLFxuICAzNzogJ2xpZ2h0Z3JleSdcbn1cbnZhciBfb3BlblRhZ3MgPSB7XG4gICcxJzogJ2ZvbnQtd2VpZ2h0OmJvbGQnLCAvLyBib2xkXG4gICcyJzogJ29wYWNpdHk6MC41JywgLy8gZGltXG4gICczJzogJzxpPicsIC8vIGl0YWxpY1xuICAnNCc6ICc8dT4nLCAvLyB1bmRlcnNjb3JlXG4gICc4JzogJ2Rpc3BsYXk6bm9uZScsIC8vIGhpZGRlblxuICAnOSc6ICc8ZGVsPicgLy8gZGVsZXRlXG59XG52YXIgX2Nsb3NlVGFncyA9IHtcbiAgJzIzJzogJzwvaT4nLCAvLyByZXNldCBpdGFsaWNcbiAgJzI0JzogJzwvdT4nLCAvLyByZXNldCB1bmRlcnNjb3JlXG4gICcyOSc6ICc8L2RlbD4nIC8vIHJlc2V0IGRlbGV0ZVxufVxuXG47WzAsIDIxLCAyMiwgMjcsIDI4LCAzOSwgNDldLmZvckVhY2goZnVuY3Rpb24gKG4pIHtcbiAgX2Nsb3NlVGFnc1tuXSA9ICc8L3NwYW4+J1xufSlcblxuLyoqXG4gKiBDb252ZXJ0cyB0ZXh0IHdpdGggQU5TSSBjb2xvciBjb2RlcyB0byBIVE1MIG1hcmt1cC5cbiAqIEBwYXJhbSB7U3RyaW5nfSB0ZXh0XG4gKiBAcmV0dXJucyB7Kn1cbiAqL1xuZnVuY3Rpb24gYW5zaUhUTUwgKHRleHQpIHtcbiAgLy8gUmV0dXJucyB0aGUgdGV4dCBpZiB0aGUgc3RyaW5nIGhhcyBubyBBTlNJIGVzY2FwZSBjb2RlLlxuICBpZiAoIV9yZWdBTlNJLnRlc3QodGV4dCkpIHtcbiAgICByZXR1cm4gdGV4dFxuICB9XG5cbiAgLy8gQ2FjaGUgb3BlbmVkIHNlcXVlbmNlLlxuICB2YXIgYW5zaUNvZGVzID0gW11cbiAgLy8gUmVwbGFjZSB3aXRoIG1hcmt1cC5cbiAgdmFyIHJldCA9IHRleHQucmVwbGFjZSgvXFwwMzNcXFsoXFxkKyltL2csIGZ1bmN0aW9uIChtYXRjaCwgc2VxKSB7XG4gICAgdmFyIG90ID0gX29wZW5UYWdzW3NlcV1cbiAgICBpZiAob3QpIHtcbiAgICAgIC8vIElmIGN1cnJlbnQgc2VxdWVuY2UgaGFzIGJlZW4gb3BlbmVkLCBjbG9zZSBpdC5cbiAgICAgIGlmICghIX5hbnNpQ29kZXMuaW5kZXhPZihzZXEpKSB7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tZXh0cmEtYm9vbGVhbi1jYXN0XG4gICAgICAgIGFuc2lDb2Rlcy5wb3AoKVxuICAgICAgICByZXR1cm4gJzwvc3Bhbj4nXG4gICAgICB9XG4gICAgICAvLyBPcGVuIHRhZy5cbiAgICAgIGFuc2lDb2Rlcy5wdXNoKHNlcSlcbiAgICAgIHJldHVybiBvdFswXSA9PT0gJzwnID8gb3QgOiAnPHNwYW4gc3R5bGU9XCInICsgb3QgKyAnO1wiPidcbiAgICB9XG5cbiAgICB2YXIgY3QgPSBfY2xvc2VUYWdzW3NlcV1cbiAgICBpZiAoY3QpIHtcbiAgICAgIC8vIFBvcCBzZXF1ZW5jZVxuICAgICAgYW5zaUNvZGVzLnBvcCgpXG4gICAgICByZXR1cm4gY3RcbiAgICB9XG4gICAgcmV0dXJuICcnXG4gIH0pXG5cbiAgLy8gTWFrZSBzdXJlIHRhZ3MgYXJlIGNsb3NlZC5cbiAgdmFyIGwgPSBhbnNpQ29kZXMubGVuZ3RoXG4gIDsobCA+IDApICYmIChyZXQgKz0gQXJyYXkobCArIDEpLmpvaW4oJzwvc3Bhbj4nKSlcblxuICByZXR1cm4gcmV0XG59XG5cbi8qKlxuICogQ3VzdG9taXplIGNvbG9ycy5cbiAqIEBwYXJhbSB7T2JqZWN0fSBjb2xvcnMgcmVmZXJlbmNlIHRvIF9kZWZDb2xvcnNcbiAqL1xuYW5zaUhUTUwuc2V0Q29sb3JzID0gZnVuY3Rpb24gKGNvbG9ycykge1xuICBpZiAodHlwZW9mIGNvbG9ycyAhPT0gJ29iamVjdCcpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ2Bjb2xvcnNgIHBhcmFtZXRlciBtdXN0IGJlIGFuIE9iamVjdC4nKVxuICB9XG5cbiAgdmFyIF9maW5hbENvbG9ycyA9IHt9XG4gIGZvciAodmFyIGtleSBpbiBfZGVmQ29sb3JzKSB7XG4gICAgdmFyIGhleCA9IGNvbG9ycy5oYXNPd25Qcm9wZXJ0eShrZXkpID8gY29sb3JzW2tleV0gOiBudWxsXG4gICAgaWYgKCFoZXgpIHtcbiAgICAgIF9maW5hbENvbG9yc1trZXldID0gX2RlZkNvbG9yc1trZXldXG4gICAgICBjb250aW51ZVxuICAgIH1cbiAgICBpZiAoJ3Jlc2V0JyA9PT0ga2V5KSB7XG4gICAgICBpZiAodHlwZW9mIGhleCA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgaGV4ID0gW2hleF1cbiAgICAgIH1cbiAgICAgIGlmICghQXJyYXkuaXNBcnJheShoZXgpIHx8IGhleC5sZW5ndGggPT09IDAgfHwgaGV4LnNvbWUoZnVuY3Rpb24gKGgpIHtcbiAgICAgICAgcmV0dXJuIHR5cGVvZiBoICE9PSAnc3RyaW5nJ1xuICAgICAgfSkpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdUaGUgdmFsdWUgb2YgYCcgKyBrZXkgKyAnYCBwcm9wZXJ0eSBtdXN0IGJlIGFuIEFycmF5IGFuZCBlYWNoIGl0ZW0gY291bGQgb25seSBiZSBhIGhleCBzdHJpbmcsIGUuZy46IEZGMDAwMCcpXG4gICAgICB9XG4gICAgICB2YXIgZGVmSGV4Q29sb3IgPSBfZGVmQ29sb3JzW2tleV1cbiAgICAgIGlmICghaGV4WzBdKSB7XG4gICAgICAgIGhleFswXSA9IGRlZkhleENvbG9yWzBdXG4gICAgICB9XG4gICAgICBpZiAoaGV4Lmxlbmd0aCA9PT0gMSB8fCAhaGV4WzFdKSB7XG4gICAgICAgIGhleCA9IFtoZXhbMF1dXG4gICAgICAgIGhleC5wdXNoKGRlZkhleENvbG9yWzFdKVxuICAgICAgfVxuXG4gICAgICBoZXggPSBoZXguc2xpY2UoMCwgMilcbiAgICB9IGVsc2UgaWYgKHR5cGVvZiBoZXggIT09ICdzdHJpbmcnKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ1RoZSB2YWx1ZSBvZiBgJyArIGtleSArICdgIHByb3BlcnR5IG11c3QgYmUgYSBoZXggc3RyaW5nLCBlLmcuOiBGRjAwMDAnKVxuICAgIH1cbiAgICBfZmluYWxDb2xvcnNba2V5XSA9IGhleFxuICB9XG4gIF9zZXRUYWdzKF9maW5hbENvbG9ycylcbn1cblxuLyoqXG4gKiBSZXNldCBjb2xvcnMuXG4gKi9cbmFuc2lIVE1MLnJlc2V0ID0gZnVuY3Rpb24gKCkge1xuICBfc2V0VGFncyhfZGVmQ29sb3JzKVxufVxuXG4vKipcbiAqIEV4cG9zZSB0YWdzLCBpbmNsdWRpbmcgb3BlbiBhbmQgY2xvc2UuXG4gKiBAdHlwZSB7T2JqZWN0fVxuICovXG5hbnNpSFRNTC50YWdzID0ge31cblxuaWYgKE9iamVjdC5kZWZpbmVQcm9wZXJ0eSkge1xuICBPYmplY3QuZGVmaW5lUHJvcGVydHkoYW5zaUhUTUwudGFncywgJ29wZW4nLCB7XG4gICAgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiBfb3BlblRhZ3MgfVxuICB9KVxuICBPYmplY3QuZGVmaW5lUHJvcGVydHkoYW5zaUhUTUwudGFncywgJ2Nsb3NlJywge1xuICAgIGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gX2Nsb3NlVGFncyB9XG4gIH0pXG59IGVsc2Uge1xuICBhbnNpSFRNTC50YWdzLm9wZW4gPSBfb3BlblRhZ3NcbiAgYW5zaUhUTUwudGFncy5jbG9zZSA9IF9jbG9zZVRhZ3Ncbn1cblxuZnVuY3Rpb24gX3NldFRhZ3MgKGNvbG9ycykge1xuICAvLyByZXNldCBhbGxcbiAgX29wZW5UYWdzWycwJ10gPSAnZm9udC13ZWlnaHQ6bm9ybWFsO29wYWNpdHk6MTtjb2xvcjojJyArIGNvbG9ycy5yZXNldFswXSArICc7YmFja2dyb3VuZDojJyArIGNvbG9ycy5yZXNldFsxXVxuICAvLyBpbnZlcnNlXG4gIF9vcGVuVGFnc1snNyddID0gJ2NvbG9yOiMnICsgY29sb3JzLnJlc2V0WzFdICsgJztiYWNrZ3JvdW5kOiMnICsgY29sb3JzLnJlc2V0WzBdXG4gIC8vIGRhcmsgZ3JleVxuICBfb3BlblRhZ3NbJzkwJ10gPSAnY29sb3I6IycgKyBjb2xvcnMuZGFya2dyZXlcblxuICBmb3IgKHZhciBjb2RlIGluIF9zdHlsZXMpIHtcbiAgICB2YXIgY29sb3IgPSBfc3R5bGVzW2NvZGVdXG4gICAgdmFyIG9yaUNvbG9yID0gY29sb3JzW2NvbG9yXSB8fCAnMDAwJ1xuICAgIF9vcGVuVGFnc1tjb2RlXSA9ICdjb2xvcjojJyArIG9yaUNvbG9yXG4gICAgY29kZSA9IHBhcnNlSW50KGNvZGUpXG4gICAgX29wZW5UYWdzWyhjb2RlICsgMTApLnRvU3RyaW5nKCldID0gJ2JhY2tncm91bmQ6IycgKyBvcmlDb2xvclxuICB9XG59XG5cbmFuc2lIVE1MLnJlc2V0KClcbiIsIi8vIENvcHlyaWdodCBKb3llbnQsIEluYy4gYW5kIG90aGVyIE5vZGUgY29udHJpYnV0b3JzLlxuLy9cbi8vIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhXG4vLyBjb3B5IG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlXG4vLyBcIlNvZnR3YXJlXCIpLCB0byBkZWFsIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmdcbi8vIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCxcbi8vIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXRcbi8vIHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXMgZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZVxuLy8gZm9sbG93aW5nIGNvbmRpdGlvbnM6XG4vL1xuLy8gVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWRcbi8vIGluIGFsbCBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuLy9cbi8vIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1Ncbi8vIE9SIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0Zcbi8vIE1FUkNIQU5UQUJJTElUWSwgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU5cbi8vIE5PIEVWRU5UIFNIQUxMIFRIRSBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLFxuLy8gREFNQUdFUyBPUiBPVEhFUiBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SXG4vLyBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSwgT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFXG4vLyBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU4gVEhFIFNPRlRXQVJFLlxuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBSID0gdHlwZW9mIFJlZmxlY3QgPT09ICdvYmplY3QnID8gUmVmbGVjdCA6IG51bGxcbnZhciBSZWZsZWN0QXBwbHkgPSBSICYmIHR5cGVvZiBSLmFwcGx5ID09PSAnZnVuY3Rpb24nXG4gID8gUi5hcHBseVxuICA6IGZ1bmN0aW9uIFJlZmxlY3RBcHBseSh0YXJnZXQsIHJlY2VpdmVyLCBhcmdzKSB7XG4gICAgcmV0dXJuIEZ1bmN0aW9uLnByb3RvdHlwZS5hcHBseS5jYWxsKHRhcmdldCwgcmVjZWl2ZXIsIGFyZ3MpO1xuICB9XG5cbnZhciBSZWZsZWN0T3duS2V5c1xuaWYgKFIgJiYgdHlwZW9mIFIub3duS2V5cyA9PT0gJ2Z1bmN0aW9uJykge1xuICBSZWZsZWN0T3duS2V5cyA9IFIub3duS2V5c1xufSBlbHNlIGlmIChPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzKSB7XG4gIFJlZmxlY3RPd25LZXlzID0gZnVuY3Rpb24gUmVmbGVjdE93bktleXModGFyZ2V0KSB7XG4gICAgcmV0dXJuIE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKHRhcmdldClcbiAgICAgIC5jb25jYXQoT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyh0YXJnZXQpKTtcbiAgfTtcbn0gZWxzZSB7XG4gIFJlZmxlY3RPd25LZXlzID0gZnVuY3Rpb24gUmVmbGVjdE93bktleXModGFyZ2V0KSB7XG4gICAgcmV0dXJuIE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKHRhcmdldCk7XG4gIH07XG59XG5cbmZ1bmN0aW9uIFByb2Nlc3NFbWl0V2FybmluZyh3YXJuaW5nKSB7XG4gIGlmIChjb25zb2xlICYmIGNvbnNvbGUud2FybikgY29uc29sZS53YXJuKHdhcm5pbmcpO1xufVxuXG52YXIgTnVtYmVySXNOYU4gPSBOdW1iZXIuaXNOYU4gfHwgZnVuY3Rpb24gTnVtYmVySXNOYU4odmFsdWUpIHtcbiAgcmV0dXJuIHZhbHVlICE9PSB2YWx1ZTtcbn1cblxuZnVuY3Rpb24gRXZlbnRFbWl0dGVyKCkge1xuICBFdmVudEVtaXR0ZXIuaW5pdC5jYWxsKHRoaXMpO1xufVxubW9kdWxlLmV4cG9ydHMgPSBFdmVudEVtaXR0ZXI7XG5tb2R1bGUuZXhwb3J0cy5vbmNlID0gb25jZTtcblxuLy8gQmFja3dhcmRzLWNvbXBhdCB3aXRoIG5vZGUgMC4xMC54XG5FdmVudEVtaXR0ZXIuRXZlbnRFbWl0dGVyID0gRXZlbnRFbWl0dGVyO1xuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLl9ldmVudHMgPSB1bmRlZmluZWQ7XG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLl9ldmVudHNDb3VudCA9IDA7XG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLl9tYXhMaXN0ZW5lcnMgPSB1bmRlZmluZWQ7XG5cbi8vIEJ5IGRlZmF1bHQgRXZlbnRFbWl0dGVycyB3aWxsIHByaW50IGEgd2FybmluZyBpZiBtb3JlIHRoYW4gMTAgbGlzdGVuZXJzIGFyZVxuLy8gYWRkZWQgdG8gaXQuIFRoaXMgaXMgYSB1c2VmdWwgZGVmYXVsdCB3aGljaCBoZWxwcyBmaW5kaW5nIG1lbW9yeSBsZWFrcy5cbnZhciBkZWZhdWx0TWF4TGlzdGVuZXJzID0gMTA7XG5cbmZ1bmN0aW9uIGNoZWNrTGlzdGVuZXIobGlzdGVuZXIpIHtcbiAgaWYgKHR5cGVvZiBsaXN0ZW5lciAhPT0gJ2Z1bmN0aW9uJykge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ1RoZSBcImxpc3RlbmVyXCIgYXJndW1lbnQgbXVzdCBiZSBvZiB0eXBlIEZ1bmN0aW9uLiBSZWNlaXZlZCB0eXBlICcgKyB0eXBlb2YgbGlzdGVuZXIpO1xuICB9XG59XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShFdmVudEVtaXR0ZXIsICdkZWZhdWx0TWF4TGlzdGVuZXJzJywge1xuICBlbnVtZXJhYmxlOiB0cnVlLFxuICBnZXQ6IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiBkZWZhdWx0TWF4TGlzdGVuZXJzO1xuICB9LFxuICBzZXQ6IGZ1bmN0aW9uKGFyZykge1xuICAgIGlmICh0eXBlb2YgYXJnICE9PSAnbnVtYmVyJyB8fCBhcmcgPCAwIHx8IE51bWJlcklzTmFOKGFyZykpIHtcbiAgICAgIHRocm93IG5ldyBSYW5nZUVycm9yKCdUaGUgdmFsdWUgb2YgXCJkZWZhdWx0TWF4TGlzdGVuZXJzXCIgaXMgb3V0IG9mIHJhbmdlLiBJdCBtdXN0IGJlIGEgbm9uLW5lZ2F0aXZlIG51bWJlci4gUmVjZWl2ZWQgJyArIGFyZyArICcuJyk7XG4gICAgfVxuICAgIGRlZmF1bHRNYXhMaXN0ZW5lcnMgPSBhcmc7XG4gIH1cbn0pO1xuXG5FdmVudEVtaXR0ZXIuaW5pdCA9IGZ1bmN0aW9uKCkge1xuXG4gIGlmICh0aGlzLl9ldmVudHMgPT09IHVuZGVmaW5lZCB8fFxuICAgICAgdGhpcy5fZXZlbnRzID09PSBPYmplY3QuZ2V0UHJvdG90eXBlT2YodGhpcykuX2V2ZW50cykge1xuICAgIHRoaXMuX2V2ZW50cyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gICAgdGhpcy5fZXZlbnRzQ291bnQgPSAwO1xuICB9XG5cbiAgdGhpcy5fbWF4TGlzdGVuZXJzID0gdGhpcy5fbWF4TGlzdGVuZXJzIHx8IHVuZGVmaW5lZDtcbn07XG5cbi8vIE9idmlvdXNseSBub3QgYWxsIEVtaXR0ZXJzIHNob3VsZCBiZSBsaW1pdGVkIHRvIDEwLiBUaGlzIGZ1bmN0aW9uIGFsbG93c1xuLy8gdGhhdCB0byBiZSBpbmNyZWFzZWQuIFNldCB0byB6ZXJvIGZvciB1bmxpbWl0ZWQuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLnNldE1heExpc3RlbmVycyA9IGZ1bmN0aW9uIHNldE1heExpc3RlbmVycyhuKSB7XG4gIGlmICh0eXBlb2YgbiAhPT0gJ251bWJlcicgfHwgbiA8IDAgfHwgTnVtYmVySXNOYU4obikpIHtcbiAgICB0aHJvdyBuZXcgUmFuZ2VFcnJvcignVGhlIHZhbHVlIG9mIFwiblwiIGlzIG91dCBvZiByYW5nZS4gSXQgbXVzdCBiZSBhIG5vbi1uZWdhdGl2ZSBudW1iZXIuIFJlY2VpdmVkICcgKyBuICsgJy4nKTtcbiAgfVxuICB0aGlzLl9tYXhMaXN0ZW5lcnMgPSBuO1xuICByZXR1cm4gdGhpcztcbn07XG5cbmZ1bmN0aW9uIF9nZXRNYXhMaXN0ZW5lcnModGhhdCkge1xuICBpZiAodGhhdC5fbWF4TGlzdGVuZXJzID09PSB1bmRlZmluZWQpXG4gICAgcmV0dXJuIEV2ZW50RW1pdHRlci5kZWZhdWx0TWF4TGlzdGVuZXJzO1xuICByZXR1cm4gdGhhdC5fbWF4TGlzdGVuZXJzO1xufVxuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLmdldE1heExpc3RlbmVycyA9IGZ1bmN0aW9uIGdldE1heExpc3RlbmVycygpIHtcbiAgcmV0dXJuIF9nZXRNYXhMaXN0ZW5lcnModGhpcyk7XG59O1xuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLmVtaXQgPSBmdW5jdGlvbiBlbWl0KHR5cGUpIHtcbiAgdmFyIGFyZ3MgPSBbXTtcbiAgZm9yICh2YXIgaSA9IDE7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIGFyZ3MucHVzaChhcmd1bWVudHNbaV0pO1xuICB2YXIgZG9FcnJvciA9ICh0eXBlID09PSAnZXJyb3InKTtcblxuICB2YXIgZXZlbnRzID0gdGhpcy5fZXZlbnRzO1xuICBpZiAoZXZlbnRzICE9PSB1bmRlZmluZWQpXG4gICAgZG9FcnJvciA9IChkb0Vycm9yICYmIGV2ZW50cy5lcnJvciA9PT0gdW5kZWZpbmVkKTtcbiAgZWxzZSBpZiAoIWRvRXJyb3IpXG4gICAgcmV0dXJuIGZhbHNlO1xuXG4gIC8vIElmIHRoZXJlIGlzIG5vICdlcnJvcicgZXZlbnQgbGlzdGVuZXIgdGhlbiB0aHJvdy5cbiAgaWYgKGRvRXJyb3IpIHtcbiAgICB2YXIgZXI7XG4gICAgaWYgKGFyZ3MubGVuZ3RoID4gMClcbiAgICAgIGVyID0gYXJnc1swXTtcbiAgICBpZiAoZXIgaW5zdGFuY2VvZiBFcnJvcikge1xuICAgICAgLy8gTm90ZTogVGhlIGNvbW1lbnRzIG9uIHRoZSBgdGhyb3dgIGxpbmVzIGFyZSBpbnRlbnRpb25hbCwgdGhleSBzaG93XG4gICAgICAvLyB1cCBpbiBOb2RlJ3Mgb3V0cHV0IGlmIHRoaXMgcmVzdWx0cyBpbiBhbiB1bmhhbmRsZWQgZXhjZXB0aW9uLlxuICAgICAgdGhyb3cgZXI7IC8vIFVuaGFuZGxlZCAnZXJyb3InIGV2ZW50XG4gICAgfVxuICAgIC8vIEF0IGxlYXN0IGdpdmUgc29tZSBraW5kIG9mIGNvbnRleHQgdG8gdGhlIHVzZXJcbiAgICB2YXIgZXJyID0gbmV3IEVycm9yKCdVbmhhbmRsZWQgZXJyb3IuJyArIChlciA/ICcgKCcgKyBlci5tZXNzYWdlICsgJyknIDogJycpKTtcbiAgICBlcnIuY29udGV4dCA9IGVyO1xuICAgIHRocm93IGVycjsgLy8gVW5oYW5kbGVkICdlcnJvcicgZXZlbnRcbiAgfVxuXG4gIHZhciBoYW5kbGVyID0gZXZlbnRzW3R5cGVdO1xuXG4gIGlmIChoYW5kbGVyID09PSB1bmRlZmluZWQpXG4gICAgcmV0dXJuIGZhbHNlO1xuXG4gIGlmICh0eXBlb2YgaGFuZGxlciA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIFJlZmxlY3RBcHBseShoYW5kbGVyLCB0aGlzLCBhcmdzKTtcbiAgfSBlbHNlIHtcbiAgICB2YXIgbGVuID0gaGFuZGxlci5sZW5ndGg7XG4gICAgdmFyIGxpc3RlbmVycyA9IGFycmF5Q2xvbmUoaGFuZGxlciwgbGVuKTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxlbjsgKytpKVxuICAgICAgUmVmbGVjdEFwcGx5KGxpc3RlbmVyc1tpXSwgdGhpcywgYXJncyk7XG4gIH1cblxuICByZXR1cm4gdHJ1ZTtcbn07XG5cbmZ1bmN0aW9uIF9hZGRMaXN0ZW5lcih0YXJnZXQsIHR5cGUsIGxpc3RlbmVyLCBwcmVwZW5kKSB7XG4gIHZhciBtO1xuICB2YXIgZXZlbnRzO1xuICB2YXIgZXhpc3Rpbmc7XG5cbiAgY2hlY2tMaXN0ZW5lcihsaXN0ZW5lcik7XG5cbiAgZXZlbnRzID0gdGFyZ2V0Ll9ldmVudHM7XG4gIGlmIChldmVudHMgPT09IHVuZGVmaW5lZCkge1xuICAgIGV2ZW50cyA9IHRhcmdldC5fZXZlbnRzID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiAgICB0YXJnZXQuX2V2ZW50c0NvdW50ID0gMDtcbiAgfSBlbHNlIHtcbiAgICAvLyBUbyBhdm9pZCByZWN1cnNpb24gaW4gdGhlIGNhc2UgdGhhdCB0eXBlID09PSBcIm5ld0xpc3RlbmVyXCIhIEJlZm9yZVxuICAgIC8vIGFkZGluZyBpdCB0byB0aGUgbGlzdGVuZXJzLCBmaXJzdCBlbWl0IFwibmV3TGlzdGVuZXJcIi5cbiAgICBpZiAoZXZlbnRzLm5ld0xpc3RlbmVyICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIHRhcmdldC5lbWl0KCduZXdMaXN0ZW5lcicsIHR5cGUsXG4gICAgICAgICAgICAgICAgICBsaXN0ZW5lci5saXN0ZW5lciA/IGxpc3RlbmVyLmxpc3RlbmVyIDogbGlzdGVuZXIpO1xuXG4gICAgICAvLyBSZS1hc3NpZ24gYGV2ZW50c2AgYmVjYXVzZSBhIG5ld0xpc3RlbmVyIGhhbmRsZXIgY291bGQgaGF2ZSBjYXVzZWQgdGhlXG4gICAgICAvLyB0aGlzLl9ldmVudHMgdG8gYmUgYXNzaWduZWQgdG8gYSBuZXcgb2JqZWN0XG4gICAgICBldmVudHMgPSB0YXJnZXQuX2V2ZW50cztcbiAgICB9XG4gICAgZXhpc3RpbmcgPSBldmVudHNbdHlwZV07XG4gIH1cblxuICBpZiAoZXhpc3RpbmcgPT09IHVuZGVmaW5lZCkge1xuICAgIC8vIE9wdGltaXplIHRoZSBjYXNlIG9mIG9uZSBsaXN0ZW5lci4gRG9uJ3QgbmVlZCB0aGUgZXh0cmEgYXJyYXkgb2JqZWN0LlxuICAgIGV4aXN0aW5nID0gZXZlbnRzW3R5cGVdID0gbGlzdGVuZXI7XG4gICAgKyt0YXJnZXQuX2V2ZW50c0NvdW50O1xuICB9IGVsc2Uge1xuICAgIGlmICh0eXBlb2YgZXhpc3RpbmcgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIC8vIEFkZGluZyB0aGUgc2Vjb25kIGVsZW1lbnQsIG5lZWQgdG8gY2hhbmdlIHRvIGFycmF5LlxuICAgICAgZXhpc3RpbmcgPSBldmVudHNbdHlwZV0gPVxuICAgICAgICBwcmVwZW5kID8gW2xpc3RlbmVyLCBleGlzdGluZ10gOiBbZXhpc3RpbmcsIGxpc3RlbmVyXTtcbiAgICAgIC8vIElmIHdlJ3ZlIGFscmVhZHkgZ290IGFuIGFycmF5LCBqdXN0IGFwcGVuZC5cbiAgICB9IGVsc2UgaWYgKHByZXBlbmQpIHtcbiAgICAgIGV4aXN0aW5nLnVuc2hpZnQobGlzdGVuZXIpO1xuICAgIH0gZWxzZSB7XG4gICAgICBleGlzdGluZy5wdXNoKGxpc3RlbmVyKTtcbiAgICB9XG5cbiAgICAvLyBDaGVjayBmb3IgbGlzdGVuZXIgbGVha1xuICAgIG0gPSBfZ2V0TWF4TGlzdGVuZXJzKHRhcmdldCk7XG4gICAgaWYgKG0gPiAwICYmIGV4aXN0aW5nLmxlbmd0aCA+IG0gJiYgIWV4aXN0aW5nLndhcm5lZCkge1xuICAgICAgZXhpc3Rpbmcud2FybmVkID0gdHJ1ZTtcbiAgICAgIC8vIE5vIGVycm9yIGNvZGUgZm9yIHRoaXMgc2luY2UgaXQgaXMgYSBXYXJuaW5nXG4gICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tcmVzdHJpY3RlZC1zeW50YXhcbiAgICAgIHZhciB3ID0gbmV3IEVycm9yKCdQb3NzaWJsZSBFdmVudEVtaXR0ZXIgbWVtb3J5IGxlYWsgZGV0ZWN0ZWQuICcgK1xuICAgICAgICAgICAgICAgICAgICAgICAgICBleGlzdGluZy5sZW5ndGggKyAnICcgKyBTdHJpbmcodHlwZSkgKyAnIGxpc3RlbmVycyAnICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgJ2FkZGVkLiBVc2UgZW1pdHRlci5zZXRNYXhMaXN0ZW5lcnMoKSB0byAnICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgJ2luY3JlYXNlIGxpbWl0Jyk7XG4gICAgICB3Lm5hbWUgPSAnTWF4TGlzdGVuZXJzRXhjZWVkZWRXYXJuaW5nJztcbiAgICAgIHcuZW1pdHRlciA9IHRhcmdldDtcbiAgICAgIHcudHlwZSA9IHR5cGU7XG4gICAgICB3LmNvdW50ID0gZXhpc3RpbmcubGVuZ3RoO1xuICAgICAgUHJvY2Vzc0VtaXRXYXJuaW5nKHcpO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiB0YXJnZXQ7XG59XG5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUuYWRkTGlzdGVuZXIgPSBmdW5jdGlvbiBhZGRMaXN0ZW5lcih0eXBlLCBsaXN0ZW5lcikge1xuICByZXR1cm4gX2FkZExpc3RlbmVyKHRoaXMsIHR5cGUsIGxpc3RlbmVyLCBmYWxzZSk7XG59O1xuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLm9uID0gRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5hZGRMaXN0ZW5lcjtcblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5wcmVwZW5kTGlzdGVuZXIgPVxuICAgIGZ1bmN0aW9uIHByZXBlbmRMaXN0ZW5lcih0eXBlLCBsaXN0ZW5lcikge1xuICAgICAgcmV0dXJuIF9hZGRMaXN0ZW5lcih0aGlzLCB0eXBlLCBsaXN0ZW5lciwgdHJ1ZSk7XG4gICAgfTtcblxuZnVuY3Rpb24gb25jZVdyYXBwZXIoKSB7XG4gIGlmICghdGhpcy5maXJlZCkge1xuICAgIHRoaXMudGFyZ2V0LnJlbW92ZUxpc3RlbmVyKHRoaXMudHlwZSwgdGhpcy53cmFwRm4pO1xuICAgIHRoaXMuZmlyZWQgPSB0cnVlO1xuICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID09PSAwKVxuICAgICAgcmV0dXJuIHRoaXMubGlzdGVuZXIuY2FsbCh0aGlzLnRhcmdldCk7XG4gICAgcmV0dXJuIHRoaXMubGlzdGVuZXIuYXBwbHkodGhpcy50YXJnZXQsIGFyZ3VtZW50cyk7XG4gIH1cbn1cblxuZnVuY3Rpb24gX29uY2VXcmFwKHRhcmdldCwgdHlwZSwgbGlzdGVuZXIpIHtcbiAgdmFyIHN0YXRlID0geyBmaXJlZDogZmFsc2UsIHdyYXBGbjogdW5kZWZpbmVkLCB0YXJnZXQ6IHRhcmdldCwgdHlwZTogdHlwZSwgbGlzdGVuZXI6IGxpc3RlbmVyIH07XG4gIHZhciB3cmFwcGVkID0gb25jZVdyYXBwZXIuYmluZChzdGF0ZSk7XG4gIHdyYXBwZWQubGlzdGVuZXIgPSBsaXN0ZW5lcjtcbiAgc3RhdGUud3JhcEZuID0gd3JhcHBlZDtcbiAgcmV0dXJuIHdyYXBwZWQ7XG59XG5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUub25jZSA9IGZ1bmN0aW9uIG9uY2UodHlwZSwgbGlzdGVuZXIpIHtcbiAgY2hlY2tMaXN0ZW5lcihsaXN0ZW5lcik7XG4gIHRoaXMub24odHlwZSwgX29uY2VXcmFwKHRoaXMsIHR5cGUsIGxpc3RlbmVyKSk7XG4gIHJldHVybiB0aGlzO1xufTtcblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5wcmVwZW5kT25jZUxpc3RlbmVyID1cbiAgICBmdW5jdGlvbiBwcmVwZW5kT25jZUxpc3RlbmVyKHR5cGUsIGxpc3RlbmVyKSB7XG4gICAgICBjaGVja0xpc3RlbmVyKGxpc3RlbmVyKTtcbiAgICAgIHRoaXMucHJlcGVuZExpc3RlbmVyKHR5cGUsIF9vbmNlV3JhcCh0aGlzLCB0eXBlLCBsaXN0ZW5lcikpO1xuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfTtcblxuLy8gRW1pdHMgYSAncmVtb3ZlTGlzdGVuZXInIGV2ZW50IGlmIGFuZCBvbmx5IGlmIHRoZSBsaXN0ZW5lciB3YXMgcmVtb3ZlZC5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUucmVtb3ZlTGlzdGVuZXIgPVxuICAgIGZ1bmN0aW9uIHJlbW92ZUxpc3RlbmVyKHR5cGUsIGxpc3RlbmVyKSB7XG4gICAgICB2YXIgbGlzdCwgZXZlbnRzLCBwb3NpdGlvbiwgaSwgb3JpZ2luYWxMaXN0ZW5lcjtcblxuICAgICAgY2hlY2tMaXN0ZW5lcihsaXN0ZW5lcik7XG5cbiAgICAgIGV2ZW50cyA9IHRoaXMuX2V2ZW50cztcbiAgICAgIGlmIChldmVudHMgPT09IHVuZGVmaW5lZClcbiAgICAgICAgcmV0dXJuIHRoaXM7XG5cbiAgICAgIGxpc3QgPSBldmVudHNbdHlwZV07XG4gICAgICBpZiAobGlzdCA9PT0gdW5kZWZpbmVkKVxuICAgICAgICByZXR1cm4gdGhpcztcblxuICAgICAgaWYgKGxpc3QgPT09IGxpc3RlbmVyIHx8IGxpc3QubGlzdGVuZXIgPT09IGxpc3RlbmVyKSB7XG4gICAgICAgIGlmICgtLXRoaXMuX2V2ZW50c0NvdW50ID09PSAwKVxuICAgICAgICAgIHRoaXMuX2V2ZW50cyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgIGRlbGV0ZSBldmVudHNbdHlwZV07XG4gICAgICAgICAgaWYgKGV2ZW50cy5yZW1vdmVMaXN0ZW5lcilcbiAgICAgICAgICAgIHRoaXMuZW1pdCgncmVtb3ZlTGlzdGVuZXInLCB0eXBlLCBsaXN0Lmxpc3RlbmVyIHx8IGxpc3RlbmVyKTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIGlmICh0eXBlb2YgbGlzdCAhPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICBwb3NpdGlvbiA9IC0xO1xuXG4gICAgICAgIGZvciAoaSA9IGxpc3QubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcbiAgICAgICAgICBpZiAobGlzdFtpXSA9PT0gbGlzdGVuZXIgfHwgbGlzdFtpXS5saXN0ZW5lciA9PT0gbGlzdGVuZXIpIHtcbiAgICAgICAgICAgIG9yaWdpbmFsTGlzdGVuZXIgPSBsaXN0W2ldLmxpc3RlbmVyO1xuICAgICAgICAgICAgcG9zaXRpb24gPSBpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHBvc2l0aW9uIDwgMClcbiAgICAgICAgICByZXR1cm4gdGhpcztcblxuICAgICAgICBpZiAocG9zaXRpb24gPT09IDApXG4gICAgICAgICAgbGlzdC5zaGlmdCgpO1xuICAgICAgICBlbHNlIHtcbiAgICAgICAgICBzcGxpY2VPbmUobGlzdCwgcG9zaXRpb24pO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGxpc3QubGVuZ3RoID09PSAxKVxuICAgICAgICAgIGV2ZW50c1t0eXBlXSA9IGxpc3RbMF07XG5cbiAgICAgICAgaWYgKGV2ZW50cy5yZW1vdmVMaXN0ZW5lciAhPT0gdW5kZWZpbmVkKVxuICAgICAgICAgIHRoaXMuZW1pdCgncmVtb3ZlTGlzdGVuZXInLCB0eXBlLCBvcmlnaW5hbExpc3RlbmVyIHx8IGxpc3RlbmVyKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfTtcblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5vZmYgPSBFdmVudEVtaXR0ZXIucHJvdG90eXBlLnJlbW92ZUxpc3RlbmVyO1xuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLnJlbW92ZUFsbExpc3RlbmVycyA9XG4gICAgZnVuY3Rpb24gcmVtb3ZlQWxsTGlzdGVuZXJzKHR5cGUpIHtcbiAgICAgIHZhciBsaXN0ZW5lcnMsIGV2ZW50cywgaTtcblxuICAgICAgZXZlbnRzID0gdGhpcy5fZXZlbnRzO1xuICAgICAgaWYgKGV2ZW50cyA9PT0gdW5kZWZpbmVkKVxuICAgICAgICByZXR1cm4gdGhpcztcblxuICAgICAgLy8gbm90IGxpc3RlbmluZyBmb3IgcmVtb3ZlTGlzdGVuZXIsIG5vIG5lZWQgdG8gZW1pdFxuICAgICAgaWYgKGV2ZW50cy5yZW1vdmVMaXN0ZW5lciA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgdGhpcy5fZXZlbnRzID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiAgICAgICAgICB0aGlzLl9ldmVudHNDb3VudCA9IDA7XG4gICAgICAgIH0gZWxzZSBpZiAoZXZlbnRzW3R5cGVdICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICBpZiAoLS10aGlzLl9ldmVudHNDb3VudCA9PT0gMClcbiAgICAgICAgICAgIHRoaXMuX2V2ZW50cyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gICAgICAgICAgZWxzZVxuICAgICAgICAgICAgZGVsZXRlIGV2ZW50c1t0eXBlXTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgIH1cblxuICAgICAgLy8gZW1pdCByZW1vdmVMaXN0ZW5lciBmb3IgYWxsIGxpc3RlbmVycyBvbiBhbGwgZXZlbnRzXG4gICAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICB2YXIga2V5cyA9IE9iamVjdC5rZXlzKGV2ZW50cyk7XG4gICAgICAgIHZhciBrZXk7XG4gICAgICAgIGZvciAoaSA9IDA7IGkgPCBrZXlzLmxlbmd0aDsgKytpKSB7XG4gICAgICAgICAga2V5ID0ga2V5c1tpXTtcbiAgICAgICAgICBpZiAoa2V5ID09PSAncmVtb3ZlTGlzdGVuZXInKSBjb250aW51ZTtcbiAgICAgICAgICB0aGlzLnJlbW92ZUFsbExpc3RlbmVycyhrZXkpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMucmVtb3ZlQWxsTGlzdGVuZXJzKCdyZW1vdmVMaXN0ZW5lcicpO1xuICAgICAgICB0aGlzLl9ldmVudHMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuICAgICAgICB0aGlzLl9ldmVudHNDb3VudCA9IDA7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgfVxuXG4gICAgICBsaXN0ZW5lcnMgPSBldmVudHNbdHlwZV07XG5cbiAgICAgIGlmICh0eXBlb2YgbGlzdGVuZXJzID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIHRoaXMucmVtb3ZlTGlzdGVuZXIodHlwZSwgbGlzdGVuZXJzKTtcbiAgICAgIH0gZWxzZSBpZiAobGlzdGVuZXJzICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgLy8gTElGTyBvcmRlclxuICAgICAgICBmb3IgKGkgPSBsaXN0ZW5lcnMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcbiAgICAgICAgICB0aGlzLnJlbW92ZUxpc3RlbmVyKHR5cGUsIGxpc3RlbmVyc1tpXSk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfTtcblxuZnVuY3Rpb24gX2xpc3RlbmVycyh0YXJnZXQsIHR5cGUsIHVud3JhcCkge1xuICB2YXIgZXZlbnRzID0gdGFyZ2V0Ll9ldmVudHM7XG5cbiAgaWYgKGV2ZW50cyA9PT0gdW5kZWZpbmVkKVxuICAgIHJldHVybiBbXTtcblxuICB2YXIgZXZsaXN0ZW5lciA9IGV2ZW50c1t0eXBlXTtcbiAgaWYgKGV2bGlzdGVuZXIgPT09IHVuZGVmaW5lZClcbiAgICByZXR1cm4gW107XG5cbiAgaWYgKHR5cGVvZiBldmxpc3RlbmVyID09PSAnZnVuY3Rpb24nKVxuICAgIHJldHVybiB1bndyYXAgPyBbZXZsaXN0ZW5lci5saXN0ZW5lciB8fCBldmxpc3RlbmVyXSA6IFtldmxpc3RlbmVyXTtcblxuICByZXR1cm4gdW53cmFwID9cbiAgICB1bndyYXBMaXN0ZW5lcnMoZXZsaXN0ZW5lcikgOiBhcnJheUNsb25lKGV2bGlzdGVuZXIsIGV2bGlzdGVuZXIubGVuZ3RoKTtcbn1cblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5saXN0ZW5lcnMgPSBmdW5jdGlvbiBsaXN0ZW5lcnModHlwZSkge1xuICByZXR1cm4gX2xpc3RlbmVycyh0aGlzLCB0eXBlLCB0cnVlKTtcbn07XG5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUucmF3TGlzdGVuZXJzID0gZnVuY3Rpb24gcmF3TGlzdGVuZXJzKHR5cGUpIHtcbiAgcmV0dXJuIF9saXN0ZW5lcnModGhpcywgdHlwZSwgZmFsc2UpO1xufTtcblxuRXZlbnRFbWl0dGVyLmxpc3RlbmVyQ291bnQgPSBmdW5jdGlvbihlbWl0dGVyLCB0eXBlKSB7XG4gIGlmICh0eXBlb2YgZW1pdHRlci5saXN0ZW5lckNvdW50ID09PSAnZnVuY3Rpb24nKSB7XG4gICAgcmV0dXJuIGVtaXR0ZXIubGlzdGVuZXJDb3VudCh0eXBlKTtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gbGlzdGVuZXJDb3VudC5jYWxsKGVtaXR0ZXIsIHR5cGUpO1xuICB9XG59O1xuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLmxpc3RlbmVyQ291bnQgPSBsaXN0ZW5lckNvdW50O1xuZnVuY3Rpb24gbGlzdGVuZXJDb3VudCh0eXBlKSB7XG4gIHZhciBldmVudHMgPSB0aGlzLl9ldmVudHM7XG5cbiAgaWYgKGV2ZW50cyAhPT0gdW5kZWZpbmVkKSB7XG4gICAgdmFyIGV2bGlzdGVuZXIgPSBldmVudHNbdHlwZV07XG5cbiAgICBpZiAodHlwZW9mIGV2bGlzdGVuZXIgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIHJldHVybiAxO1xuICAgIH0gZWxzZSBpZiAoZXZsaXN0ZW5lciAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICByZXR1cm4gZXZsaXN0ZW5lci5sZW5ndGg7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIDA7XG59XG5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUuZXZlbnROYW1lcyA9IGZ1bmN0aW9uIGV2ZW50TmFtZXMoKSB7XG4gIHJldHVybiB0aGlzLl9ldmVudHNDb3VudCA+IDAgPyBSZWZsZWN0T3duS2V5cyh0aGlzLl9ldmVudHMpIDogW107XG59O1xuXG5mdW5jdGlvbiBhcnJheUNsb25lKGFyciwgbikge1xuICB2YXIgY29weSA9IG5ldyBBcnJheShuKTtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBuOyArK2kpXG4gICAgY29weVtpXSA9IGFycltpXTtcbiAgcmV0dXJuIGNvcHk7XG59XG5cbmZ1bmN0aW9uIHNwbGljZU9uZShsaXN0LCBpbmRleCkge1xuICBmb3IgKDsgaW5kZXggKyAxIDwgbGlzdC5sZW5ndGg7IGluZGV4KyspXG4gICAgbGlzdFtpbmRleF0gPSBsaXN0W2luZGV4ICsgMV07XG4gIGxpc3QucG9wKCk7XG59XG5cbmZ1bmN0aW9uIHVud3JhcExpc3RlbmVycyhhcnIpIHtcbiAgdmFyIHJldCA9IG5ldyBBcnJheShhcnIubGVuZ3RoKTtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCByZXQubGVuZ3RoOyArK2kpIHtcbiAgICByZXRbaV0gPSBhcnJbaV0ubGlzdGVuZXIgfHwgYXJyW2ldO1xuICB9XG4gIHJldHVybiByZXQ7XG59XG5cbmZ1bmN0aW9uIG9uY2UoZW1pdHRlciwgbmFtZSkge1xuICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgIGZ1bmN0aW9uIGVycm9yTGlzdGVuZXIoZXJyKSB7XG4gICAgICBlbWl0dGVyLnJlbW92ZUxpc3RlbmVyKG5hbWUsIHJlc29sdmVyKTtcbiAgICAgIHJlamVjdChlcnIpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHJlc29sdmVyKCkge1xuICAgICAgaWYgKHR5cGVvZiBlbWl0dGVyLnJlbW92ZUxpc3RlbmVyID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIGVtaXR0ZXIucmVtb3ZlTGlzdGVuZXIoJ2Vycm9yJywgZXJyb3JMaXN0ZW5lcik7XG4gICAgICB9XG4gICAgICByZXNvbHZlKFtdLnNsaWNlLmNhbGwoYXJndW1lbnRzKSk7XG4gICAgfTtcblxuICAgIGV2ZW50VGFyZ2V0QWdub3N0aWNBZGRMaXN0ZW5lcihlbWl0dGVyLCBuYW1lLCByZXNvbHZlciwgeyBvbmNlOiB0cnVlIH0pO1xuICAgIGlmIChuYW1lICE9PSAnZXJyb3InKSB7XG4gICAgICBhZGRFcnJvckhhbmRsZXJJZkV2ZW50RW1pdHRlcihlbWl0dGVyLCBlcnJvckxpc3RlbmVyLCB7IG9uY2U6IHRydWUgfSk7XG4gICAgfVxuICB9KTtcbn1cblxuZnVuY3Rpb24gYWRkRXJyb3JIYW5kbGVySWZFdmVudEVtaXR0ZXIoZW1pdHRlciwgaGFuZGxlciwgZmxhZ3MpIHtcbiAgaWYgKHR5cGVvZiBlbWl0dGVyLm9uID09PSAnZnVuY3Rpb24nKSB7XG4gICAgZXZlbnRUYXJnZXRBZ25vc3RpY0FkZExpc3RlbmVyKGVtaXR0ZXIsICdlcnJvcicsIGhhbmRsZXIsIGZsYWdzKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBldmVudFRhcmdldEFnbm9zdGljQWRkTGlzdGVuZXIoZW1pdHRlciwgbmFtZSwgbGlzdGVuZXIsIGZsYWdzKSB7XG4gIGlmICh0eXBlb2YgZW1pdHRlci5vbiA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIGlmIChmbGFncy5vbmNlKSB7XG4gICAgICBlbWl0dGVyLm9uY2UobmFtZSwgbGlzdGVuZXIpO1xuICAgIH0gZWxzZSB7XG4gICAgICBlbWl0dGVyLm9uKG5hbWUsIGxpc3RlbmVyKTtcbiAgICB9XG4gIH0gZWxzZSBpZiAodHlwZW9mIGVtaXR0ZXIuYWRkRXZlbnRMaXN0ZW5lciA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIC8vIEV2ZW50VGFyZ2V0IGRvZXMgbm90IGhhdmUgYGVycm9yYCBldmVudCBzZW1hbnRpY3MgbGlrZSBOb2RlXG4gICAgLy8gRXZlbnRFbWl0dGVycywgd2UgZG8gbm90IGxpc3RlbiBmb3IgYGVycm9yYCBldmVudHMgaGVyZS5cbiAgICBlbWl0dGVyLmFkZEV2ZW50TGlzdGVuZXIobmFtZSwgZnVuY3Rpb24gd3JhcExpc3RlbmVyKGFyZykge1xuICAgICAgLy8gSUUgZG9lcyBub3QgaGF2ZSBidWlsdGluIGB7IG9uY2U6IHRydWUgfWAgc3VwcG9ydCBzbyB3ZVxuICAgICAgLy8gaGF2ZSB0byBkbyBpdCBtYW51YWxseS5cbiAgICAgIGlmIChmbGFncy5vbmNlKSB7XG4gICAgICAgIGVtaXR0ZXIucmVtb3ZlRXZlbnRMaXN0ZW5lcihuYW1lLCB3cmFwTGlzdGVuZXIpO1xuICAgICAgfVxuICAgICAgbGlzdGVuZXIoYXJnKTtcbiAgICB9KTtcbiAgfSBlbHNlIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdUaGUgXCJlbWl0dGVyXCIgYXJndW1lbnQgbXVzdCBiZSBvZiB0eXBlIEV2ZW50RW1pdHRlci4gUmVjZWl2ZWQgdHlwZSAnICsgdHlwZW9mIGVtaXR0ZXIpO1xuICB9XG59XG4iLCJcInVzZSBzdHJpY3RcIjt2YXIgX19hc3NpZ249dGhpcyYmdGhpcy5fX2Fzc2lnbnx8ZnVuY3Rpb24oKXtfX2Fzc2lnbj1PYmplY3QuYXNzaWdufHxmdW5jdGlvbih0KXtmb3IodmFyIHMsaT0xLG49YXJndW1lbnRzLmxlbmd0aDtpPG47aSsrKXtzPWFyZ3VtZW50c1tpXTtmb3IodmFyIHAgaW4gcylpZihPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwocyxwKSl0W3BdPXNbcF19cmV0dXJuIHR9O3JldHVybiBfX2Fzc2lnbi5hcHBseSh0aGlzLGFyZ3VtZW50cyl9O09iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLFwiX19lc01vZHVsZVwiLHt2YWx1ZTp0cnVlfSk7dmFyIG5hbWVkX3JlZmVyZW5jZXNfMT1yZXF1aXJlKFwiLi9uYW1lZC1yZWZlcmVuY2VzXCIpO3ZhciBudW1lcmljX3VuaWNvZGVfbWFwXzE9cmVxdWlyZShcIi4vbnVtZXJpYy11bmljb2RlLW1hcFwiKTt2YXIgc3Vycm9nYXRlX3BhaXJzXzE9cmVxdWlyZShcIi4vc3Vycm9nYXRlLXBhaXJzXCIpO3ZhciBhbGxOYW1lZFJlZmVyZW5jZXM9X19hc3NpZ24oX19hc3NpZ24oe30sbmFtZWRfcmVmZXJlbmNlc18xLm5hbWVkUmVmZXJlbmNlcykse2FsbDpuYW1lZF9yZWZlcmVuY2VzXzEubmFtZWRSZWZlcmVuY2VzLmh0bWw1fSk7ZnVuY3Rpb24gcmVwbGFjZVVzaW5nUmVnRXhwKG1hY3JvVGV4dCxtYWNyb1JlZ0V4cCxtYWNyb1JlcGxhY2VyKXttYWNyb1JlZ0V4cC5sYXN0SW5kZXg9MDt2YXIgcmVwbGFjZU1hdGNoPW1hY3JvUmVnRXhwLmV4ZWMobWFjcm9UZXh0KTt2YXIgcmVwbGFjZVJlc3VsdDtpZihyZXBsYWNlTWF0Y2gpe3JlcGxhY2VSZXN1bHQ9XCJcIjt2YXIgcmVwbGFjZUxhc3RJbmRleD0wO2Rve2lmKHJlcGxhY2VMYXN0SW5kZXghPT1yZXBsYWNlTWF0Y2guaW5kZXgpe3JlcGxhY2VSZXN1bHQrPW1hY3JvVGV4dC5zdWJzdHJpbmcocmVwbGFjZUxhc3RJbmRleCxyZXBsYWNlTWF0Y2guaW5kZXgpfXZhciByZXBsYWNlSW5wdXQ9cmVwbGFjZU1hdGNoWzBdO3JlcGxhY2VSZXN1bHQrPW1hY3JvUmVwbGFjZXIocmVwbGFjZUlucHV0KTtyZXBsYWNlTGFzdEluZGV4PXJlcGxhY2VNYXRjaC5pbmRleCtyZXBsYWNlSW5wdXQubGVuZ3RofXdoaWxlKHJlcGxhY2VNYXRjaD1tYWNyb1JlZ0V4cC5leGVjKG1hY3JvVGV4dCkpO2lmKHJlcGxhY2VMYXN0SW5kZXghPT1tYWNyb1RleHQubGVuZ3RoKXtyZXBsYWNlUmVzdWx0Kz1tYWNyb1RleHQuc3Vic3RyaW5nKHJlcGxhY2VMYXN0SW5kZXgpfX1lbHNle3JlcGxhY2VSZXN1bHQ9bWFjcm9UZXh0fXJldHVybiByZXBsYWNlUmVzdWx0fXZhciBlbmNvZGVSZWdFeHBzPXtzcGVjaWFsQ2hhcnM6L1s8PidcIiZdL2csbm9uQXNjaWk6L1s8PidcIiZcXHUwMDgwLVxcdUQ3RkZcXHVFMDAwLVxcdUZGRkZdfFtcXHVEODAwLVxcdURCRkZdW1xcdURDMDAtXFx1REZGRl18W1xcdUQ4MDAtXFx1REJGRl0oPyFbXFx1REMwMC1cXHVERkZGXSl8KD86W15cXHVEODAwLVxcdURCRkZdfF4pW1xcdURDMDAtXFx1REZGRl0vZyxub25Bc2NpaVByaW50YWJsZTovWzw+J1wiJlxceDAxLVxceDA4XFx4MTEtXFx4MTVcXHgxNy1cXHgxRlxceDdmLVxcdUQ3RkZcXHVFMDAwLVxcdUZGRkZdfFtcXHVEODAwLVxcdURCRkZdW1xcdURDMDAtXFx1REZGRl18W1xcdUQ4MDAtXFx1REJGRl0oPyFbXFx1REMwMC1cXHVERkZGXSl8KD86W15cXHVEODAwLVxcdURCRkZdfF4pW1xcdURDMDAtXFx1REZGRl0vZyxub25Bc2NpaVByaW50YWJsZU9ubHk6L1tcXHgwMS1cXHgwOFxceDExLVxceDE1XFx4MTctXFx4MUZcXHg3Zi1cXHVEN0ZGXFx1RTAwMC1cXHVGRkZGXXxbXFx1RDgwMC1cXHVEQkZGXVtcXHVEQzAwLVxcdURGRkZdfFtcXHVEODAwLVxcdURCRkZdKD8hW1xcdURDMDAtXFx1REZGRl0pfCg/OlteXFx1RDgwMC1cXHVEQkZGXXxeKVtcXHVEQzAwLVxcdURGRkZdL2csZXh0ZW5zaXZlOi9bXFx4MDEtXFx4MGNcXHgwZS1cXHgxZlxceDIxLVxceDJjXFx4MmUtXFx4MmZcXHgzYS1cXHg0MFxceDViLVxceDYwXFx4N2ItXFx4N2RcXHg3Zi1cXHVEN0ZGXFx1RTAwMC1cXHVGRkZGXXxbXFx1RDgwMC1cXHVEQkZGXVtcXHVEQzAwLVxcdURGRkZdfFtcXHVEODAwLVxcdURCRkZdKD8hW1xcdURDMDAtXFx1REZGRl0pfCg/OlteXFx1RDgwMC1cXHVEQkZGXXxeKVtcXHVEQzAwLVxcdURGRkZdL2d9O3ZhciBkZWZhdWx0RW5jb2RlT3B0aW9ucz17bW9kZTpcInNwZWNpYWxDaGFyc1wiLGxldmVsOlwiYWxsXCIsbnVtZXJpYzpcImRlY2ltYWxcIn07ZnVuY3Rpb24gZW5jb2RlKHRleHQsX2Epe3ZhciBfYj1fYT09PXZvaWQgMD9kZWZhdWx0RW5jb2RlT3B0aW9uczpfYSxfYz1fYi5tb2RlLG1vZGU9X2M9PT12b2lkIDA/XCJzcGVjaWFsQ2hhcnNcIjpfYyxfZD1fYi5udW1lcmljLG51bWVyaWM9X2Q9PT12b2lkIDA/XCJkZWNpbWFsXCI6X2QsX2U9X2IubGV2ZWwsbGV2ZWw9X2U9PT12b2lkIDA/XCJhbGxcIjpfZTtpZighdGV4dCl7cmV0dXJuXCJcIn12YXIgZW5jb2RlUmVnRXhwPWVuY29kZVJlZ0V4cHNbbW9kZV07dmFyIHJlZmVyZW5jZXM9YWxsTmFtZWRSZWZlcmVuY2VzW2xldmVsXS5jaGFyYWN0ZXJzO3ZhciBpc0hleD1udW1lcmljPT09XCJoZXhhZGVjaW1hbFwiO3JldHVybiByZXBsYWNlVXNpbmdSZWdFeHAodGV4dCxlbmNvZGVSZWdFeHAsKGZ1bmN0aW9uKGlucHV0KXt2YXIgcmVzdWx0PXJlZmVyZW5jZXNbaW5wdXRdO2lmKCFyZXN1bHQpe3ZhciBjb2RlPWlucHV0Lmxlbmd0aD4xP3N1cnJvZ2F0ZV9wYWlyc18xLmdldENvZGVQb2ludChpbnB1dCwwKTppbnB1dC5jaGFyQ29kZUF0KDApO3Jlc3VsdD0oaXNIZXg/XCImI3hcIitjb2RlLnRvU3RyaW5nKDE2KTpcIiYjXCIrY29kZSkrXCI7XCJ9cmV0dXJuIHJlc3VsdH0pKX1leHBvcnRzLmVuY29kZT1lbmNvZGU7dmFyIGRlZmF1bHREZWNvZGVPcHRpb25zPXtzY29wZTpcImJvZHlcIixsZXZlbDpcImFsbFwifTt2YXIgc3RyaWN0PS8mKD86I1xcZCt8I1t4WF1bXFxkYS1mQS1GXSt8WzAtOWEtekEtWl0rKTsvZzt2YXIgYXR0cmlidXRlPS8mKD86I1xcZCt8I1t4WF1bXFxkYS1mQS1GXSt8WzAtOWEtekEtWl0rKVs7PV0/L2c7dmFyIGJhc2VEZWNvZGVSZWdFeHBzPXt4bWw6e3N0cmljdDpzdHJpY3QsYXR0cmlidXRlOmF0dHJpYnV0ZSxib2R5Om5hbWVkX3JlZmVyZW5jZXNfMS5ib2R5UmVnRXhwcy54bWx9LGh0bWw0OntzdHJpY3Q6c3RyaWN0LGF0dHJpYnV0ZTphdHRyaWJ1dGUsYm9keTpuYW1lZF9yZWZlcmVuY2VzXzEuYm9keVJlZ0V4cHMuaHRtbDR9LGh0bWw1OntzdHJpY3Q6c3RyaWN0LGF0dHJpYnV0ZTphdHRyaWJ1dGUsYm9keTpuYW1lZF9yZWZlcmVuY2VzXzEuYm9keVJlZ0V4cHMuaHRtbDV9fTt2YXIgZGVjb2RlUmVnRXhwcz1fX2Fzc2lnbihfX2Fzc2lnbih7fSxiYXNlRGVjb2RlUmVnRXhwcykse2FsbDpiYXNlRGVjb2RlUmVnRXhwcy5odG1sNX0pO3ZhciBmcm9tQ2hhckNvZGU9U3RyaW5nLmZyb21DaGFyQ29kZTt2YXIgb3V0T2ZCb3VuZHNDaGFyPWZyb21DaGFyQ29kZSg2NTUzMyk7dmFyIGRlZmF1bHREZWNvZGVFbnRpdHlPcHRpb25zPXtsZXZlbDpcImFsbFwifTtmdW5jdGlvbiBnZXREZWNvZGVkRW50aXR5KGVudGl0eSxyZWZlcmVuY2VzLGlzQXR0cmlidXRlLGlzU3RyaWN0KXt2YXIgZGVjb2RlUmVzdWx0PWVudGl0eTt2YXIgZGVjb2RlRW50aXR5TGFzdENoYXI9ZW50aXR5W2VudGl0eS5sZW5ndGgtMV07aWYoaXNBdHRyaWJ1dGUmJmRlY29kZUVudGl0eUxhc3RDaGFyPT09XCI9XCIpe2RlY29kZVJlc3VsdD1lbnRpdHl9ZWxzZSBpZihpc1N0cmljdCYmZGVjb2RlRW50aXR5TGFzdENoYXIhPT1cIjtcIil7ZGVjb2RlUmVzdWx0PWVudGl0eX1lbHNle3ZhciBkZWNvZGVSZXN1bHRCeVJlZmVyZW5jZT1yZWZlcmVuY2VzW2VudGl0eV07aWYoZGVjb2RlUmVzdWx0QnlSZWZlcmVuY2Upe2RlY29kZVJlc3VsdD1kZWNvZGVSZXN1bHRCeVJlZmVyZW5jZX1lbHNlIGlmKGVudGl0eVswXT09PVwiJlwiJiZlbnRpdHlbMV09PT1cIiNcIil7dmFyIGRlY29kZVNlY29uZENoYXI9ZW50aXR5WzJdO3ZhciBkZWNvZGVDb2RlPWRlY29kZVNlY29uZENoYXI9PVwieFwifHxkZWNvZGVTZWNvbmRDaGFyPT1cIlhcIj9wYXJzZUludChlbnRpdHkuc3Vic3RyKDMpLDE2KTpwYXJzZUludChlbnRpdHkuc3Vic3RyKDIpKTtkZWNvZGVSZXN1bHQ9ZGVjb2RlQ29kZT49MTExNDExMT9vdXRPZkJvdW5kc0NoYXI6ZGVjb2RlQ29kZT42NTUzNT9zdXJyb2dhdGVfcGFpcnNfMS5mcm9tQ29kZVBvaW50KGRlY29kZUNvZGUpOmZyb21DaGFyQ29kZShudW1lcmljX3VuaWNvZGVfbWFwXzEubnVtZXJpY1VuaWNvZGVNYXBbZGVjb2RlQ29kZV18fGRlY29kZUNvZGUpfX1yZXR1cm4gZGVjb2RlUmVzdWx0fWZ1bmN0aW9uIGRlY29kZUVudGl0eShlbnRpdHksX2Epe3ZhciBfYj0oX2E9PT12b2lkIDA/ZGVmYXVsdERlY29kZUVudGl0eU9wdGlvbnM6X2EpLmxldmVsLGxldmVsPV9iPT09dm9pZCAwP1wiYWxsXCI6X2I7aWYoIWVudGl0eSl7cmV0dXJuXCJcIn1yZXR1cm4gZ2V0RGVjb2RlZEVudGl0eShlbnRpdHksYWxsTmFtZWRSZWZlcmVuY2VzW2xldmVsXS5lbnRpdGllcyxmYWxzZSxmYWxzZSl9ZXhwb3J0cy5kZWNvZGVFbnRpdHk9ZGVjb2RlRW50aXR5O2Z1bmN0aW9uIGRlY29kZSh0ZXh0LF9hKXt2YXIgX2I9X2E9PT12b2lkIDA/ZGVmYXVsdERlY29kZU9wdGlvbnM6X2EsX2M9X2IubGV2ZWwsbGV2ZWw9X2M9PT12b2lkIDA/XCJhbGxcIjpfYyxfZD1fYi5zY29wZSxzY29wZT1fZD09PXZvaWQgMD9sZXZlbD09PVwieG1sXCI/XCJzdHJpY3RcIjpcImJvZHlcIjpfZDtpZighdGV4dCl7cmV0dXJuXCJcIn12YXIgZGVjb2RlUmVnRXhwPWRlY29kZVJlZ0V4cHNbbGV2ZWxdW3Njb3BlXTt2YXIgcmVmZXJlbmNlcz1hbGxOYW1lZFJlZmVyZW5jZXNbbGV2ZWxdLmVudGl0aWVzO3ZhciBpc0F0dHJpYnV0ZT1zY29wZT09PVwiYXR0cmlidXRlXCI7dmFyIGlzU3RyaWN0PXNjb3BlPT09XCJzdHJpY3RcIjtyZXR1cm4gcmVwbGFjZVVzaW5nUmVnRXhwKHRleHQsZGVjb2RlUmVnRXhwLChmdW5jdGlvbihlbnRpdHkpe3JldHVybiBnZXREZWNvZGVkRW50aXR5KGVudGl0eSxyZWZlcmVuY2VzLGlzQXR0cmlidXRlLGlzU3RyaWN0KX0pKX1leHBvcnRzLmRlY29kZT1kZWNvZGU7XG4vLyMgc291cmNlTWFwcGluZ1VSTD0uL2luZGV4LmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO09iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLFwiX19lc01vZHVsZVwiLHt2YWx1ZTp0cnVlfSk7ZXhwb3J0cy5ib2R5UmVnRXhwcz17eG1sOi8mKD86I1xcZCt8I1t4WF1bXFxkYS1mQS1GXSt8WzAtOWEtekEtWl0rKTs/L2csaHRtbDQ6LyZub3Rpbjt8Jig/Om5ic3B8aWV4Y2x8Y2VudHxwb3VuZHxjdXJyZW58eWVufGJydmJhcnxzZWN0fHVtbHxjb3B5fG9yZGZ8bGFxdW98bm90fHNoeXxyZWd8bWFjcnxkZWd8cGx1c21ufHN1cDJ8c3VwM3xhY3V0ZXxtaWNyb3xwYXJhfG1pZGRvdHxjZWRpbHxzdXAxfG9yZG18cmFxdW98ZnJhYzE0fGZyYWMxMnxmcmFjMzR8aXF1ZXN0fEFncmF2ZXxBYWN1dGV8QWNpcmN8QXRpbGRlfEF1bWx8QXJpbmd8QUVsaWd8Q2NlZGlsfEVncmF2ZXxFYWN1dGV8RWNpcmN8RXVtbHxJZ3JhdmV8SWFjdXRlfEljaXJjfEl1bWx8RVRIfE50aWxkZXxPZ3JhdmV8T2FjdXRlfE9jaXJjfE90aWxkZXxPdW1sfHRpbWVzfE9zbGFzaHxVZ3JhdmV8VWFjdXRlfFVjaXJjfFV1bWx8WWFjdXRlfFRIT1JOfHN6bGlnfGFncmF2ZXxhYWN1dGV8YWNpcmN8YXRpbGRlfGF1bWx8YXJpbmd8YWVsaWd8Y2NlZGlsfGVncmF2ZXxlYWN1dGV8ZWNpcmN8ZXVtbHxpZ3JhdmV8aWFjdXRlfGljaXJjfGl1bWx8ZXRofG50aWxkZXxvZ3JhdmV8b2FjdXRlfG9jaXJjfG90aWxkZXxvdW1sfGRpdmlkZXxvc2xhc2h8dWdyYXZlfHVhY3V0ZXx1Y2lyY3x1dW1sfHlhY3V0ZXx0aG9ybnx5dW1sfHF1b3R8YW1wfGx0fGd0fCNcXGQrfCNbeFhdW1xcZGEtZkEtRl0rfFswLTlhLXpBLVpdKyk7Py9nLGh0bWw1Oi8mY2VudGVyZG90O3wmY29weXNyO3wmZGl2aWRlb250aW1lczt8Jmd0Y2M7fCZndGNpcjt8Jmd0ZG90O3wmZ3RsUGFyO3wmZ3RxdWVzdDt8Jmd0cmFwcHJveDt8Jmd0cmFycjt8Jmd0cmRvdDt8Jmd0cmVxbGVzczt8Jmd0cmVxcWxlc3M7fCZndHJsZXNzO3wmZ3Ryc2ltO3wmbHRjYzt8Jmx0Y2lyO3wmbHRkb3Q7fCZsdGhyZWU7fCZsdGltZXM7fCZsdGxhcnI7fCZsdHF1ZXN0O3wmbHRyUGFyO3wmbHRyaTt8Jmx0cmllO3wmbHRyaWY7fCZub3Rpbjt8Jm5vdGluRTt8Jm5vdGluZG90O3wmbm90aW52YTt8Jm5vdGludmI7fCZub3RpbnZjO3wmbm90bmk7fCZub3RuaXZhO3wmbm90bml2Yjt8Jm5vdG5pdmM7fCZwYXJhbGxlbDt8JnRpbWVzYjt8JnRpbWVzYmFyO3wmdGltZXNkO3wmKD86QUVsaWd8QU1QfEFhY3V0ZXxBY2lyY3xBZ3JhdmV8QXJpbmd8QXRpbGRlfEF1bWx8Q09QWXxDY2VkaWx8RVRIfEVhY3V0ZXxFY2lyY3xFZ3JhdmV8RXVtbHxHVHxJYWN1dGV8SWNpcmN8SWdyYXZlfEl1bWx8TFR8TnRpbGRlfE9hY3V0ZXxPY2lyY3xPZ3JhdmV8T3NsYXNofE90aWxkZXxPdW1sfFFVT1R8UkVHfFRIT1JOfFVhY3V0ZXxVY2lyY3xVZ3JhdmV8VXVtbHxZYWN1dGV8YWFjdXRlfGFjaXJjfGFjdXRlfGFlbGlnfGFncmF2ZXxhbXB8YXJpbmd8YXRpbGRlfGF1bWx8YnJ2YmFyfGNjZWRpbHxjZWRpbHxjZW50fGNvcHl8Y3VycmVufGRlZ3xkaXZpZGV8ZWFjdXRlfGVjaXJjfGVncmF2ZXxldGh8ZXVtbHxmcmFjMTJ8ZnJhYzE0fGZyYWMzNHxndHxpYWN1dGV8aWNpcmN8aWV4Y2x8aWdyYXZlfGlxdWVzdHxpdW1sfGxhcXVvfGx0fG1hY3J8bWljcm98bWlkZG90fG5ic3B8bm90fG50aWxkZXxvYWN1dGV8b2NpcmN8b2dyYXZlfG9yZGZ8b3JkbXxvc2xhc2h8b3RpbGRlfG91bWx8cGFyYXxwbHVzbW58cG91bmR8cXVvdHxyYXF1b3xyZWd8c2VjdHxzaHl8c3VwMXxzdXAyfHN1cDN8c3psaWd8dGhvcm58dGltZXN8dWFjdXRlfHVjaXJjfHVncmF2ZXx1bWx8dXVtbHx5YWN1dGV8eWVufHl1bWx8I1xcZCt8I1t4WF1bXFxkYS1mQS1GXSt8WzAtOWEtekEtWl0rKTs/L2d9O2V4cG9ydHMubmFtZWRSZWZlcmVuY2VzPXt4bWw6e2VudGl0aWVzOntcIiZsdDtcIjpcIjxcIixcIiZndDtcIjpcIj5cIixcIiZxdW90O1wiOidcIicsXCImYXBvcztcIjpcIidcIixcIiZhbXA7XCI6XCImXCJ9LGNoYXJhY3RlcnM6e1wiPFwiOlwiJmx0O1wiLFwiPlwiOlwiJmd0O1wiLCdcIic6XCImcXVvdDtcIixcIidcIjpcIiZhcG9zO1wiLFwiJlwiOlwiJmFtcDtcIn19LGh0bWw0OntlbnRpdGllczp7XCImYXBvcztcIjpcIidcIixcIiZuYnNwXCI6XCLCoFwiLFwiJm5ic3A7XCI6XCLCoFwiLFwiJmlleGNsXCI6XCLCoVwiLFwiJmlleGNsO1wiOlwiwqFcIixcIiZjZW50XCI6XCLColwiLFwiJmNlbnQ7XCI6XCLColwiLFwiJnBvdW5kXCI6XCLCo1wiLFwiJnBvdW5kO1wiOlwiwqNcIixcIiZjdXJyZW5cIjpcIsKkXCIsXCImY3VycmVuO1wiOlwiwqRcIixcIiZ5ZW5cIjpcIsKlXCIsXCImeWVuO1wiOlwiwqVcIixcIiZicnZiYXJcIjpcIsKmXCIsXCImYnJ2YmFyO1wiOlwiwqZcIixcIiZzZWN0XCI6XCLCp1wiLFwiJnNlY3Q7XCI6XCLCp1wiLFwiJnVtbFwiOlwiwqhcIixcIiZ1bWw7XCI6XCLCqFwiLFwiJmNvcHlcIjpcIsKpXCIsXCImY29weTtcIjpcIsKpXCIsXCImb3JkZlwiOlwiwqpcIixcIiZvcmRmO1wiOlwiwqpcIixcIiZsYXF1b1wiOlwiwqtcIixcIiZsYXF1bztcIjpcIsKrXCIsXCImbm90XCI6XCLCrFwiLFwiJm5vdDtcIjpcIsKsXCIsXCImc2h5XCI6XCLCrVwiLFwiJnNoeTtcIjpcIsKtXCIsXCImcmVnXCI6XCLCrlwiLFwiJnJlZztcIjpcIsKuXCIsXCImbWFjclwiOlwiwq9cIixcIiZtYWNyO1wiOlwiwq9cIixcIiZkZWdcIjpcIsKwXCIsXCImZGVnO1wiOlwiwrBcIixcIiZwbHVzbW5cIjpcIsKxXCIsXCImcGx1c21uO1wiOlwiwrFcIixcIiZzdXAyXCI6XCLCslwiLFwiJnN1cDI7XCI6XCLCslwiLFwiJnN1cDNcIjpcIsKzXCIsXCImc3VwMztcIjpcIsKzXCIsXCImYWN1dGVcIjpcIsK0XCIsXCImYWN1dGU7XCI6XCLCtFwiLFwiJm1pY3JvXCI6XCLCtVwiLFwiJm1pY3JvO1wiOlwiwrVcIixcIiZwYXJhXCI6XCLCtlwiLFwiJnBhcmE7XCI6XCLCtlwiLFwiJm1pZGRvdFwiOlwiwrdcIixcIiZtaWRkb3Q7XCI6XCLCt1wiLFwiJmNlZGlsXCI6XCLCuFwiLFwiJmNlZGlsO1wiOlwiwrhcIixcIiZzdXAxXCI6XCLCuVwiLFwiJnN1cDE7XCI6XCLCuVwiLFwiJm9yZG1cIjpcIsK6XCIsXCImb3JkbTtcIjpcIsK6XCIsXCImcmFxdW9cIjpcIsK7XCIsXCImcmFxdW87XCI6XCLCu1wiLFwiJmZyYWMxNFwiOlwiwrxcIixcIiZmcmFjMTQ7XCI6XCLCvFwiLFwiJmZyYWMxMlwiOlwiwr1cIixcIiZmcmFjMTI7XCI6XCLCvVwiLFwiJmZyYWMzNFwiOlwiwr5cIixcIiZmcmFjMzQ7XCI6XCLCvlwiLFwiJmlxdWVzdFwiOlwiwr9cIixcIiZpcXVlc3Q7XCI6XCLCv1wiLFwiJkFncmF2ZVwiOlwiw4BcIixcIiZBZ3JhdmU7XCI6XCLDgFwiLFwiJkFhY3V0ZVwiOlwiw4FcIixcIiZBYWN1dGU7XCI6XCLDgVwiLFwiJkFjaXJjXCI6XCLDglwiLFwiJkFjaXJjO1wiOlwiw4JcIixcIiZBdGlsZGVcIjpcIsODXCIsXCImQXRpbGRlO1wiOlwiw4NcIixcIiZBdW1sXCI6XCLDhFwiLFwiJkF1bWw7XCI6XCLDhFwiLFwiJkFyaW5nXCI6XCLDhVwiLFwiJkFyaW5nO1wiOlwiw4VcIixcIiZBRWxpZ1wiOlwiw4ZcIixcIiZBRWxpZztcIjpcIsOGXCIsXCImQ2NlZGlsXCI6XCLDh1wiLFwiJkNjZWRpbDtcIjpcIsOHXCIsXCImRWdyYXZlXCI6XCLDiFwiLFwiJkVncmF2ZTtcIjpcIsOIXCIsXCImRWFjdXRlXCI6XCLDiVwiLFwiJkVhY3V0ZTtcIjpcIsOJXCIsXCImRWNpcmNcIjpcIsOKXCIsXCImRWNpcmM7XCI6XCLDilwiLFwiJkV1bWxcIjpcIsOLXCIsXCImRXVtbDtcIjpcIsOLXCIsXCImSWdyYXZlXCI6XCLDjFwiLFwiJklncmF2ZTtcIjpcIsOMXCIsXCImSWFjdXRlXCI6XCLDjVwiLFwiJklhY3V0ZTtcIjpcIsONXCIsXCImSWNpcmNcIjpcIsOOXCIsXCImSWNpcmM7XCI6XCLDjlwiLFwiJkl1bWxcIjpcIsOPXCIsXCImSXVtbDtcIjpcIsOPXCIsXCImRVRIXCI6XCLDkFwiLFwiJkVUSDtcIjpcIsOQXCIsXCImTnRpbGRlXCI6XCLDkVwiLFwiJk50aWxkZTtcIjpcIsORXCIsXCImT2dyYXZlXCI6XCLDklwiLFwiJk9ncmF2ZTtcIjpcIsOSXCIsXCImT2FjdXRlXCI6XCLDk1wiLFwiJk9hY3V0ZTtcIjpcIsOTXCIsXCImT2NpcmNcIjpcIsOUXCIsXCImT2NpcmM7XCI6XCLDlFwiLFwiJk90aWxkZVwiOlwiw5VcIixcIiZPdGlsZGU7XCI6XCLDlVwiLFwiJk91bWxcIjpcIsOWXCIsXCImT3VtbDtcIjpcIsOWXCIsXCImdGltZXNcIjpcIsOXXCIsXCImdGltZXM7XCI6XCLDl1wiLFwiJk9zbGFzaFwiOlwiw5hcIixcIiZPc2xhc2g7XCI6XCLDmFwiLFwiJlVncmF2ZVwiOlwiw5lcIixcIiZVZ3JhdmU7XCI6XCLDmVwiLFwiJlVhY3V0ZVwiOlwiw5pcIixcIiZVYWN1dGU7XCI6XCLDmlwiLFwiJlVjaXJjXCI6XCLDm1wiLFwiJlVjaXJjO1wiOlwiw5tcIixcIiZVdW1sXCI6XCLDnFwiLFwiJlV1bWw7XCI6XCLDnFwiLFwiJllhY3V0ZVwiOlwiw51cIixcIiZZYWN1dGU7XCI6XCLDnVwiLFwiJlRIT1JOXCI6XCLDnlwiLFwiJlRIT1JOO1wiOlwiw55cIixcIiZzemxpZ1wiOlwiw59cIixcIiZzemxpZztcIjpcIsOfXCIsXCImYWdyYXZlXCI6XCLDoFwiLFwiJmFncmF2ZTtcIjpcIsOgXCIsXCImYWFjdXRlXCI6XCLDoVwiLFwiJmFhY3V0ZTtcIjpcIsOhXCIsXCImYWNpcmNcIjpcIsOiXCIsXCImYWNpcmM7XCI6XCLDolwiLFwiJmF0aWxkZVwiOlwiw6NcIixcIiZhdGlsZGU7XCI6XCLDo1wiLFwiJmF1bWxcIjpcIsOkXCIsXCImYXVtbDtcIjpcIsOkXCIsXCImYXJpbmdcIjpcIsOlXCIsXCImYXJpbmc7XCI6XCLDpVwiLFwiJmFlbGlnXCI6XCLDplwiLFwiJmFlbGlnO1wiOlwiw6ZcIixcIiZjY2VkaWxcIjpcIsOnXCIsXCImY2NlZGlsO1wiOlwiw6dcIixcIiZlZ3JhdmVcIjpcIsOoXCIsXCImZWdyYXZlO1wiOlwiw6hcIixcIiZlYWN1dGVcIjpcIsOpXCIsXCImZWFjdXRlO1wiOlwiw6lcIixcIiZlY2lyY1wiOlwiw6pcIixcIiZlY2lyYztcIjpcIsOqXCIsXCImZXVtbFwiOlwiw6tcIixcIiZldW1sO1wiOlwiw6tcIixcIiZpZ3JhdmVcIjpcIsOsXCIsXCImaWdyYXZlO1wiOlwiw6xcIixcIiZpYWN1dGVcIjpcIsOtXCIsXCImaWFjdXRlO1wiOlwiw61cIixcIiZpY2lyY1wiOlwiw65cIixcIiZpY2lyYztcIjpcIsOuXCIsXCImaXVtbFwiOlwiw69cIixcIiZpdW1sO1wiOlwiw69cIixcIiZldGhcIjpcIsOwXCIsXCImZXRoO1wiOlwiw7BcIixcIiZudGlsZGVcIjpcIsOxXCIsXCImbnRpbGRlO1wiOlwiw7FcIixcIiZvZ3JhdmVcIjpcIsOyXCIsXCImb2dyYXZlO1wiOlwiw7JcIixcIiZvYWN1dGVcIjpcIsOzXCIsXCImb2FjdXRlO1wiOlwiw7NcIixcIiZvY2lyY1wiOlwiw7RcIixcIiZvY2lyYztcIjpcIsO0XCIsXCImb3RpbGRlXCI6XCLDtVwiLFwiJm90aWxkZTtcIjpcIsO1XCIsXCImb3VtbFwiOlwiw7ZcIixcIiZvdW1sO1wiOlwiw7ZcIixcIiZkaXZpZGVcIjpcIsO3XCIsXCImZGl2aWRlO1wiOlwiw7dcIixcIiZvc2xhc2hcIjpcIsO4XCIsXCImb3NsYXNoO1wiOlwiw7hcIixcIiZ1Z3JhdmVcIjpcIsO5XCIsXCImdWdyYXZlO1wiOlwiw7lcIixcIiZ1YWN1dGVcIjpcIsO6XCIsXCImdWFjdXRlO1wiOlwiw7pcIixcIiZ1Y2lyY1wiOlwiw7tcIixcIiZ1Y2lyYztcIjpcIsO7XCIsXCImdXVtbFwiOlwiw7xcIixcIiZ1dW1sO1wiOlwiw7xcIixcIiZ5YWN1dGVcIjpcIsO9XCIsXCImeWFjdXRlO1wiOlwiw71cIixcIiZ0aG9yblwiOlwiw75cIixcIiZ0aG9ybjtcIjpcIsO+XCIsXCImeXVtbFwiOlwiw79cIixcIiZ5dW1sO1wiOlwiw79cIixcIiZxdW90XCI6J1wiJyxcIiZxdW90O1wiOidcIicsXCImYW1wXCI6XCImXCIsXCImYW1wO1wiOlwiJlwiLFwiJmx0XCI6XCI8XCIsXCImbHQ7XCI6XCI8XCIsXCImZ3RcIjpcIj5cIixcIiZndDtcIjpcIj5cIixcIiZPRWxpZztcIjpcIsWSXCIsXCImb2VsaWc7XCI6XCLFk1wiLFwiJlNjYXJvbjtcIjpcIsWgXCIsXCImc2Nhcm9uO1wiOlwixaFcIixcIiZZdW1sO1wiOlwixbhcIixcIiZjaXJjO1wiOlwiy4ZcIixcIiZ0aWxkZTtcIjpcIsucXCIsXCImZW5zcDtcIjpcIuKAglwiLFwiJmVtc3A7XCI6XCLigINcIixcIiZ0aGluc3A7XCI6XCLigIlcIixcIiZ6d25qO1wiOlwi4oCMXCIsXCImendqO1wiOlwi4oCNXCIsXCImbHJtO1wiOlwi4oCOXCIsXCImcmxtO1wiOlwi4oCPXCIsXCImbmRhc2g7XCI6XCLigJNcIixcIiZtZGFzaDtcIjpcIuKAlFwiLFwiJmxzcXVvO1wiOlwi4oCYXCIsXCImcnNxdW87XCI6XCLigJlcIixcIiZzYnF1bztcIjpcIuKAmlwiLFwiJmxkcXVvO1wiOlwi4oCcXCIsXCImcmRxdW87XCI6XCLigJ1cIixcIiZiZHF1bztcIjpcIuKAnlwiLFwiJmRhZ2dlcjtcIjpcIuKAoFwiLFwiJkRhZ2dlcjtcIjpcIuKAoVwiLFwiJnBlcm1pbDtcIjpcIuKAsFwiLFwiJmxzYXF1bztcIjpcIuKAuVwiLFwiJnJzYXF1bztcIjpcIuKAulwiLFwiJmV1cm87XCI6XCLigqxcIixcIiZmbm9mO1wiOlwixpJcIixcIiZBbHBoYTtcIjpcIs6RXCIsXCImQmV0YTtcIjpcIs6SXCIsXCImR2FtbWE7XCI6XCLOk1wiLFwiJkRlbHRhO1wiOlwizpRcIixcIiZFcHNpbG9uO1wiOlwizpVcIixcIiZaZXRhO1wiOlwizpZcIixcIiZFdGE7XCI6XCLOl1wiLFwiJlRoZXRhO1wiOlwizphcIixcIiZJb3RhO1wiOlwizplcIixcIiZLYXBwYTtcIjpcIs6aXCIsXCImTGFtYmRhO1wiOlwizptcIixcIiZNdTtcIjpcIs6cXCIsXCImTnU7XCI6XCLOnVwiLFwiJlhpO1wiOlwizp5cIixcIiZPbWljcm9uO1wiOlwizp9cIixcIiZQaTtcIjpcIs6gXCIsXCImUmhvO1wiOlwizqFcIixcIiZTaWdtYTtcIjpcIs6jXCIsXCImVGF1O1wiOlwizqRcIixcIiZVcHNpbG9uO1wiOlwizqVcIixcIiZQaGk7XCI6XCLOplwiLFwiJkNoaTtcIjpcIs6nXCIsXCImUHNpO1wiOlwizqhcIixcIiZPbWVnYTtcIjpcIs6pXCIsXCImYWxwaGE7XCI6XCLOsVwiLFwiJmJldGE7XCI6XCLOslwiLFwiJmdhbW1hO1wiOlwizrNcIixcIiZkZWx0YTtcIjpcIs60XCIsXCImZXBzaWxvbjtcIjpcIs61XCIsXCImemV0YTtcIjpcIs62XCIsXCImZXRhO1wiOlwizrdcIixcIiZ0aGV0YTtcIjpcIs64XCIsXCImaW90YTtcIjpcIs65XCIsXCIma2FwcGE7XCI6XCLOulwiLFwiJmxhbWJkYTtcIjpcIs67XCIsXCImbXU7XCI6XCLOvFwiLFwiJm51O1wiOlwizr1cIixcIiZ4aTtcIjpcIs6+XCIsXCImb21pY3JvbjtcIjpcIs6/XCIsXCImcGk7XCI6XCLPgFwiLFwiJnJobztcIjpcIs+BXCIsXCImc2lnbWFmO1wiOlwiz4JcIixcIiZzaWdtYTtcIjpcIs+DXCIsXCImdGF1O1wiOlwiz4RcIixcIiZ1cHNpbG9uO1wiOlwiz4VcIixcIiZwaGk7XCI6XCLPhlwiLFwiJmNoaTtcIjpcIs+HXCIsXCImcHNpO1wiOlwiz4hcIixcIiZvbWVnYTtcIjpcIs+JXCIsXCImdGhldGFzeW07XCI6XCLPkVwiLFwiJnVwc2loO1wiOlwiz5JcIixcIiZwaXY7XCI6XCLPllwiLFwiJmJ1bGw7XCI6XCLigKJcIixcIiZoZWxsaXA7XCI6XCLigKZcIixcIiZwcmltZTtcIjpcIuKAslwiLFwiJlByaW1lO1wiOlwi4oCzXCIsXCImb2xpbmU7XCI6XCLigL5cIixcIiZmcmFzbDtcIjpcIuKBhFwiLFwiJndlaWVycDtcIjpcIuKEmFwiLFwiJmltYWdlO1wiOlwi4oSRXCIsXCImcmVhbDtcIjpcIuKEnFwiLFwiJnRyYWRlO1wiOlwi4oSiXCIsXCImYWxlZnN5bTtcIjpcIuKEtVwiLFwiJmxhcnI7XCI6XCLihpBcIixcIiZ1YXJyO1wiOlwi4oaRXCIsXCImcmFycjtcIjpcIuKGklwiLFwiJmRhcnI7XCI6XCLihpNcIixcIiZoYXJyO1wiOlwi4oaUXCIsXCImY3JhcnI7XCI6XCLihrVcIixcIiZsQXJyO1wiOlwi4oeQXCIsXCImdUFycjtcIjpcIuKHkVwiLFwiJnJBcnI7XCI6XCLih5JcIixcIiZkQXJyO1wiOlwi4oeTXCIsXCImaEFycjtcIjpcIuKHlFwiLFwiJmZvcmFsbDtcIjpcIuKIgFwiLFwiJnBhcnQ7XCI6XCLiiIJcIixcIiZleGlzdDtcIjpcIuKIg1wiLFwiJmVtcHR5O1wiOlwi4oiFXCIsXCImbmFibGE7XCI6XCLiiIdcIixcIiZpc2luO1wiOlwi4oiIXCIsXCImbm90aW47XCI6XCLiiIlcIixcIiZuaTtcIjpcIuKIi1wiLFwiJnByb2Q7XCI6XCLiiI9cIixcIiZzdW07XCI6XCLiiJFcIixcIiZtaW51cztcIjpcIuKIklwiLFwiJmxvd2FzdDtcIjpcIuKIl1wiLFwiJnJhZGljO1wiOlwi4oiaXCIsXCImcHJvcDtcIjpcIuKInVwiLFwiJmluZmluO1wiOlwi4oieXCIsXCImYW5nO1wiOlwi4oigXCIsXCImYW5kO1wiOlwi4oinXCIsXCImb3I7XCI6XCLiiKhcIixcIiZjYXA7XCI6XCLiiKlcIixcIiZjdXA7XCI6XCLiiKpcIixcIiZpbnQ7XCI6XCLiiKtcIixcIiZ0aGVyZTQ7XCI6XCLiiLRcIixcIiZzaW07XCI6XCLiiLxcIixcIiZjb25nO1wiOlwi4omFXCIsXCImYXN5bXA7XCI6XCLiiYhcIixcIiZuZTtcIjpcIuKJoFwiLFwiJmVxdWl2O1wiOlwi4omhXCIsXCImbGU7XCI6XCLiiaRcIixcIiZnZTtcIjpcIuKJpVwiLFwiJnN1YjtcIjpcIuKKglwiLFwiJnN1cDtcIjpcIuKKg1wiLFwiJm5zdWI7XCI6XCLiioRcIixcIiZzdWJlO1wiOlwi4oqGXCIsXCImc3VwZTtcIjpcIuKKh1wiLFwiJm9wbHVzO1wiOlwi4oqVXCIsXCImb3RpbWVzO1wiOlwi4oqXXCIsXCImcGVycDtcIjpcIuKKpVwiLFwiJnNkb3Q7XCI6XCLii4VcIixcIiZsY2VpbDtcIjpcIuKMiFwiLFwiJnJjZWlsO1wiOlwi4oyJXCIsXCImbGZsb29yO1wiOlwi4oyKXCIsXCImcmZsb29yO1wiOlwi4oyLXCIsXCImbGFuZztcIjpcIuKMqVwiLFwiJnJhbmc7XCI6XCLijKpcIixcIiZsb3o7XCI6XCLil4pcIixcIiZzcGFkZXM7XCI6XCLimaBcIixcIiZjbHVicztcIjpcIuKZo1wiLFwiJmhlYXJ0cztcIjpcIuKZpVwiLFwiJmRpYW1zO1wiOlwi4pmmXCJ9LGNoYXJhY3RlcnM6e1wiJ1wiOlwiJmFwb3M7XCIsXCLCoFwiOlwiJm5ic3A7XCIsXCLCoVwiOlwiJmlleGNsO1wiLFwiwqJcIjpcIiZjZW50O1wiLFwiwqNcIjpcIiZwb3VuZDtcIixcIsKkXCI6XCImY3VycmVuO1wiLFwiwqVcIjpcIiZ5ZW47XCIsXCLCplwiOlwiJmJydmJhcjtcIixcIsKnXCI6XCImc2VjdDtcIixcIsKoXCI6XCImdW1sO1wiLFwiwqlcIjpcIiZjb3B5O1wiLFwiwqpcIjpcIiZvcmRmO1wiLFwiwqtcIjpcIiZsYXF1bztcIixcIsKsXCI6XCImbm90O1wiLFwiwq1cIjpcIiZzaHk7XCIsXCLCrlwiOlwiJnJlZztcIixcIsKvXCI6XCImbWFjcjtcIixcIsKwXCI6XCImZGVnO1wiLFwiwrFcIjpcIiZwbHVzbW47XCIsXCLCslwiOlwiJnN1cDI7XCIsXCLCs1wiOlwiJnN1cDM7XCIsXCLCtFwiOlwiJmFjdXRlO1wiLFwiwrVcIjpcIiZtaWNybztcIixcIsK2XCI6XCImcGFyYTtcIixcIsK3XCI6XCImbWlkZG90O1wiLFwiwrhcIjpcIiZjZWRpbDtcIixcIsK5XCI6XCImc3VwMTtcIixcIsK6XCI6XCImb3JkbTtcIixcIsK7XCI6XCImcmFxdW87XCIsXCLCvFwiOlwiJmZyYWMxNDtcIixcIsK9XCI6XCImZnJhYzEyO1wiLFwiwr5cIjpcIiZmcmFjMzQ7XCIsXCLCv1wiOlwiJmlxdWVzdDtcIixcIsOAXCI6XCImQWdyYXZlO1wiLFwiw4FcIjpcIiZBYWN1dGU7XCIsXCLDglwiOlwiJkFjaXJjO1wiLFwiw4NcIjpcIiZBdGlsZGU7XCIsXCLDhFwiOlwiJkF1bWw7XCIsXCLDhVwiOlwiJkFyaW5nO1wiLFwiw4ZcIjpcIiZBRWxpZztcIixcIsOHXCI6XCImQ2NlZGlsO1wiLFwiw4hcIjpcIiZFZ3JhdmU7XCIsXCLDiVwiOlwiJkVhY3V0ZTtcIixcIsOKXCI6XCImRWNpcmM7XCIsXCLDi1wiOlwiJkV1bWw7XCIsXCLDjFwiOlwiJklncmF2ZTtcIixcIsONXCI6XCImSWFjdXRlO1wiLFwiw45cIjpcIiZJY2lyYztcIixcIsOPXCI6XCImSXVtbDtcIixcIsOQXCI6XCImRVRIO1wiLFwiw5FcIjpcIiZOdGlsZGU7XCIsXCLDklwiOlwiJk9ncmF2ZTtcIixcIsOTXCI6XCImT2FjdXRlO1wiLFwiw5RcIjpcIiZPY2lyYztcIixcIsOVXCI6XCImT3RpbGRlO1wiLFwiw5ZcIjpcIiZPdW1sO1wiLFwiw5dcIjpcIiZ0aW1lcztcIixcIsOYXCI6XCImT3NsYXNoO1wiLFwiw5lcIjpcIiZVZ3JhdmU7XCIsXCLDmlwiOlwiJlVhY3V0ZTtcIixcIsObXCI6XCImVWNpcmM7XCIsXCLDnFwiOlwiJlV1bWw7XCIsXCLDnVwiOlwiJllhY3V0ZTtcIixcIsOeXCI6XCImVEhPUk47XCIsXCLDn1wiOlwiJnN6bGlnO1wiLFwiw6BcIjpcIiZhZ3JhdmU7XCIsXCLDoVwiOlwiJmFhY3V0ZTtcIixcIsOiXCI6XCImYWNpcmM7XCIsXCLDo1wiOlwiJmF0aWxkZTtcIixcIsOkXCI6XCImYXVtbDtcIixcIsOlXCI6XCImYXJpbmc7XCIsXCLDplwiOlwiJmFlbGlnO1wiLFwiw6dcIjpcIiZjY2VkaWw7XCIsXCLDqFwiOlwiJmVncmF2ZTtcIixcIsOpXCI6XCImZWFjdXRlO1wiLFwiw6pcIjpcIiZlY2lyYztcIixcIsOrXCI6XCImZXVtbDtcIixcIsOsXCI6XCImaWdyYXZlO1wiLFwiw61cIjpcIiZpYWN1dGU7XCIsXCLDrlwiOlwiJmljaXJjO1wiLFwiw69cIjpcIiZpdW1sO1wiLFwiw7BcIjpcIiZldGg7XCIsXCLDsVwiOlwiJm50aWxkZTtcIixcIsOyXCI6XCImb2dyYXZlO1wiLFwiw7NcIjpcIiZvYWN1dGU7XCIsXCLDtFwiOlwiJm9jaXJjO1wiLFwiw7VcIjpcIiZvdGlsZGU7XCIsXCLDtlwiOlwiJm91bWw7XCIsXCLDt1wiOlwiJmRpdmlkZTtcIixcIsO4XCI6XCImb3NsYXNoO1wiLFwiw7lcIjpcIiZ1Z3JhdmU7XCIsXCLDulwiOlwiJnVhY3V0ZTtcIixcIsO7XCI6XCImdWNpcmM7XCIsXCLDvFwiOlwiJnV1bWw7XCIsXCLDvVwiOlwiJnlhY3V0ZTtcIixcIsO+XCI6XCImdGhvcm47XCIsXCLDv1wiOlwiJnl1bWw7XCIsJ1wiJzpcIiZxdW90O1wiLFwiJlwiOlwiJmFtcDtcIixcIjxcIjpcIiZsdDtcIixcIj5cIjpcIiZndDtcIixcIsWSXCI6XCImT0VsaWc7XCIsXCLFk1wiOlwiJm9lbGlnO1wiLFwixaBcIjpcIiZTY2Fyb247XCIsXCLFoVwiOlwiJnNjYXJvbjtcIixcIsW4XCI6XCImWXVtbDtcIixcIsuGXCI6XCImY2lyYztcIixcIsucXCI6XCImdGlsZGU7XCIsXCLigIJcIjpcIiZlbnNwO1wiLFwi4oCDXCI6XCImZW1zcDtcIixcIuKAiVwiOlwiJnRoaW5zcDtcIixcIuKAjFwiOlwiJnp3bmo7XCIsXCLigI1cIjpcIiZ6d2o7XCIsXCLigI5cIjpcIiZscm07XCIsXCLigI9cIjpcIiZybG07XCIsXCLigJNcIjpcIiZuZGFzaDtcIixcIuKAlFwiOlwiJm1kYXNoO1wiLFwi4oCYXCI6XCImbHNxdW87XCIsXCLigJlcIjpcIiZyc3F1bztcIixcIuKAmlwiOlwiJnNicXVvO1wiLFwi4oCcXCI6XCImbGRxdW87XCIsXCLigJ1cIjpcIiZyZHF1bztcIixcIuKAnlwiOlwiJmJkcXVvO1wiLFwi4oCgXCI6XCImZGFnZ2VyO1wiLFwi4oChXCI6XCImRGFnZ2VyO1wiLFwi4oCwXCI6XCImcGVybWlsO1wiLFwi4oC5XCI6XCImbHNhcXVvO1wiLFwi4oC6XCI6XCImcnNhcXVvO1wiLFwi4oKsXCI6XCImZXVybztcIixcIsaSXCI6XCImZm5vZjtcIixcIs6RXCI6XCImQWxwaGE7XCIsXCLOklwiOlwiJkJldGE7XCIsXCLOk1wiOlwiJkdhbW1hO1wiLFwizpRcIjpcIiZEZWx0YTtcIixcIs6VXCI6XCImRXBzaWxvbjtcIixcIs6WXCI6XCImWmV0YTtcIixcIs6XXCI6XCImRXRhO1wiLFwizphcIjpcIiZUaGV0YTtcIixcIs6ZXCI6XCImSW90YTtcIixcIs6aXCI6XCImS2FwcGE7XCIsXCLOm1wiOlwiJkxhbWJkYTtcIixcIs6cXCI6XCImTXU7XCIsXCLOnVwiOlwiJk51O1wiLFwizp5cIjpcIiZYaTtcIixcIs6fXCI6XCImT21pY3JvbjtcIixcIs6gXCI6XCImUGk7XCIsXCLOoVwiOlwiJlJobztcIixcIs6jXCI6XCImU2lnbWE7XCIsXCLOpFwiOlwiJlRhdTtcIixcIs6lXCI6XCImVXBzaWxvbjtcIixcIs6mXCI6XCImUGhpO1wiLFwizqdcIjpcIiZDaGk7XCIsXCLOqFwiOlwiJlBzaTtcIixcIs6pXCI6XCImT21lZ2E7XCIsXCLOsVwiOlwiJmFscGhhO1wiLFwizrJcIjpcIiZiZXRhO1wiLFwizrNcIjpcIiZnYW1tYTtcIixcIs60XCI6XCImZGVsdGE7XCIsXCLOtVwiOlwiJmVwc2lsb247XCIsXCLOtlwiOlwiJnpldGE7XCIsXCLOt1wiOlwiJmV0YTtcIixcIs64XCI6XCImdGhldGE7XCIsXCLOuVwiOlwiJmlvdGE7XCIsXCLOulwiOlwiJmthcHBhO1wiLFwizrtcIjpcIiZsYW1iZGE7XCIsXCLOvFwiOlwiJm11O1wiLFwizr1cIjpcIiZudTtcIixcIs6+XCI6XCImeGk7XCIsXCLOv1wiOlwiJm9taWNyb247XCIsXCLPgFwiOlwiJnBpO1wiLFwiz4FcIjpcIiZyaG87XCIsXCLPglwiOlwiJnNpZ21hZjtcIixcIs+DXCI6XCImc2lnbWE7XCIsXCLPhFwiOlwiJnRhdTtcIixcIs+FXCI6XCImdXBzaWxvbjtcIixcIs+GXCI6XCImcGhpO1wiLFwiz4dcIjpcIiZjaGk7XCIsXCLPiFwiOlwiJnBzaTtcIixcIs+JXCI6XCImb21lZ2E7XCIsXCLPkVwiOlwiJnRoZXRhc3ltO1wiLFwiz5JcIjpcIiZ1cHNpaDtcIixcIs+WXCI6XCImcGl2O1wiLFwi4oCiXCI6XCImYnVsbDtcIixcIuKAplwiOlwiJmhlbGxpcDtcIixcIuKAslwiOlwiJnByaW1lO1wiLFwi4oCzXCI6XCImUHJpbWU7XCIsXCLigL5cIjpcIiZvbGluZTtcIixcIuKBhFwiOlwiJmZyYXNsO1wiLFwi4oSYXCI6XCImd2VpZXJwO1wiLFwi4oSRXCI6XCImaW1hZ2U7XCIsXCLihJxcIjpcIiZyZWFsO1wiLFwi4oSiXCI6XCImdHJhZGU7XCIsXCLihLVcIjpcIiZhbGVmc3ltO1wiLFwi4oaQXCI6XCImbGFycjtcIixcIuKGkVwiOlwiJnVhcnI7XCIsXCLihpJcIjpcIiZyYXJyO1wiLFwi4oaTXCI6XCImZGFycjtcIixcIuKGlFwiOlwiJmhhcnI7XCIsXCLihrVcIjpcIiZjcmFycjtcIixcIuKHkFwiOlwiJmxBcnI7XCIsXCLih5FcIjpcIiZ1QXJyO1wiLFwi4oeSXCI6XCImckFycjtcIixcIuKHk1wiOlwiJmRBcnI7XCIsXCLih5RcIjpcIiZoQXJyO1wiLFwi4oiAXCI6XCImZm9yYWxsO1wiLFwi4oiCXCI6XCImcGFydDtcIixcIuKIg1wiOlwiJmV4aXN0O1wiLFwi4oiFXCI6XCImZW1wdHk7XCIsXCLiiIdcIjpcIiZuYWJsYTtcIixcIuKIiFwiOlwiJmlzaW47XCIsXCLiiIlcIjpcIiZub3RpbjtcIixcIuKIi1wiOlwiJm5pO1wiLFwi4oiPXCI6XCImcHJvZDtcIixcIuKIkVwiOlwiJnN1bTtcIixcIuKIklwiOlwiJm1pbnVzO1wiLFwi4oiXXCI6XCImbG93YXN0O1wiLFwi4oiaXCI6XCImcmFkaWM7XCIsXCLiiJ1cIjpcIiZwcm9wO1wiLFwi4oieXCI6XCImaW5maW47XCIsXCLiiKBcIjpcIiZhbmc7XCIsXCLiiKdcIjpcIiZhbmQ7XCIsXCLiiKhcIjpcIiZvcjtcIixcIuKIqVwiOlwiJmNhcDtcIixcIuKIqlwiOlwiJmN1cDtcIixcIuKIq1wiOlwiJmludDtcIixcIuKItFwiOlwiJnRoZXJlNDtcIixcIuKIvFwiOlwiJnNpbTtcIixcIuKJhVwiOlwiJmNvbmc7XCIsXCLiiYhcIjpcIiZhc3ltcDtcIixcIuKJoFwiOlwiJm5lO1wiLFwi4omhXCI6XCImZXF1aXY7XCIsXCLiiaRcIjpcIiZsZTtcIixcIuKJpVwiOlwiJmdlO1wiLFwi4oqCXCI6XCImc3ViO1wiLFwi4oqDXCI6XCImc3VwO1wiLFwi4oqEXCI6XCImbnN1YjtcIixcIuKKhlwiOlwiJnN1YmU7XCIsXCLiiodcIjpcIiZzdXBlO1wiLFwi4oqVXCI6XCImb3BsdXM7XCIsXCLiipdcIjpcIiZvdGltZXM7XCIsXCLiiqVcIjpcIiZwZXJwO1wiLFwi4ouFXCI6XCImc2RvdDtcIixcIuKMiFwiOlwiJmxjZWlsO1wiLFwi4oyJXCI6XCImcmNlaWw7XCIsXCLijIpcIjpcIiZsZmxvb3I7XCIsXCLijItcIjpcIiZyZmxvb3I7XCIsXCLijKlcIjpcIiZsYW5nO1wiLFwi4oyqXCI6XCImcmFuZztcIixcIuKXilwiOlwiJmxvejtcIixcIuKZoFwiOlwiJnNwYWRlcztcIixcIuKZo1wiOlwiJmNsdWJzO1wiLFwi4pmlXCI6XCImaGVhcnRzO1wiLFwi4pmmXCI6XCImZGlhbXM7XCJ9fSxodG1sNTp7ZW50aXRpZXM6e1wiJkFFbGlnXCI6XCLDhlwiLFwiJkFFbGlnO1wiOlwiw4ZcIixcIiZBTVBcIjpcIiZcIixcIiZBTVA7XCI6XCImXCIsXCImQWFjdXRlXCI6XCLDgVwiLFwiJkFhY3V0ZTtcIjpcIsOBXCIsXCImQWJyZXZlO1wiOlwixIJcIixcIiZBY2lyY1wiOlwiw4JcIixcIiZBY2lyYztcIjpcIsOCXCIsXCImQWN5O1wiOlwi0JBcIixcIiZBZnI7XCI6XCLwnZSEXCIsXCImQWdyYXZlXCI6XCLDgFwiLFwiJkFncmF2ZTtcIjpcIsOAXCIsXCImQWxwaGE7XCI6XCLOkVwiLFwiJkFtYWNyO1wiOlwixIBcIixcIiZBbmQ7XCI6XCLiqZNcIixcIiZBb2dvbjtcIjpcIsSEXCIsXCImQW9wZjtcIjpcIvCdlLhcIixcIiZBcHBseUZ1bmN0aW9uO1wiOlwi4oGhXCIsXCImQXJpbmdcIjpcIsOFXCIsXCImQXJpbmc7XCI6XCLDhVwiLFwiJkFzY3I7XCI6XCLwnZKcXCIsXCImQXNzaWduO1wiOlwi4omUXCIsXCImQXRpbGRlXCI6XCLDg1wiLFwiJkF0aWxkZTtcIjpcIsODXCIsXCImQXVtbFwiOlwiw4RcIixcIiZBdW1sO1wiOlwiw4RcIixcIiZCYWNrc2xhc2g7XCI6XCLiiJZcIixcIiZCYXJ2O1wiOlwi4qunXCIsXCImQmFyd2VkO1wiOlwi4oyGXCIsXCImQmN5O1wiOlwi0JFcIixcIiZCZWNhdXNlO1wiOlwi4oi1XCIsXCImQmVybm91bGxpcztcIjpcIuKErFwiLFwiJkJldGE7XCI6XCLOklwiLFwiJkJmcjtcIjpcIvCdlIVcIixcIiZCb3BmO1wiOlwi8J2UuVwiLFwiJkJyZXZlO1wiOlwiy5hcIixcIiZCc2NyO1wiOlwi4oSsXCIsXCImQnVtcGVxO1wiOlwi4omOXCIsXCImQ0hjeTtcIjpcItCnXCIsXCImQ09QWVwiOlwiwqlcIixcIiZDT1BZO1wiOlwiwqlcIixcIiZDYWN1dGU7XCI6XCLEhlwiLFwiJkNhcDtcIjpcIuKLklwiLFwiJkNhcGl0YWxEaWZmZXJlbnRpYWxEO1wiOlwi4oWFXCIsXCImQ2F5bGV5cztcIjpcIuKErVwiLFwiJkNjYXJvbjtcIjpcIsSMXCIsXCImQ2NlZGlsXCI6XCLDh1wiLFwiJkNjZWRpbDtcIjpcIsOHXCIsXCImQ2NpcmM7XCI6XCLEiFwiLFwiJkNjb25pbnQ7XCI6XCLiiLBcIixcIiZDZG90O1wiOlwixIpcIixcIiZDZWRpbGxhO1wiOlwiwrhcIixcIiZDZW50ZXJEb3Q7XCI6XCLCt1wiLFwiJkNmcjtcIjpcIuKErVwiLFwiJkNoaTtcIjpcIs6nXCIsXCImQ2lyY2xlRG90O1wiOlwi4oqZXCIsXCImQ2lyY2xlTWludXM7XCI6XCLiipZcIixcIiZDaXJjbGVQbHVzO1wiOlwi4oqVXCIsXCImQ2lyY2xlVGltZXM7XCI6XCLiipdcIixcIiZDbG9ja3dpc2VDb250b3VySW50ZWdyYWw7XCI6XCLiiLJcIixcIiZDbG9zZUN1cmx5RG91YmxlUXVvdGU7XCI6XCLigJ1cIixcIiZDbG9zZUN1cmx5UXVvdGU7XCI6XCLigJlcIixcIiZDb2xvbjtcIjpcIuKIt1wiLFwiJkNvbG9uZTtcIjpcIuKptFwiLFwiJkNvbmdydWVudDtcIjpcIuKJoVwiLFwiJkNvbmludDtcIjpcIuKIr1wiLFwiJkNvbnRvdXJJbnRlZ3JhbDtcIjpcIuKIrlwiLFwiJkNvcGY7XCI6XCLihIJcIixcIiZDb3Byb2R1Y3Q7XCI6XCLiiJBcIixcIiZDb3VudGVyQ2xvY2t3aXNlQ29udG91ckludGVncmFsO1wiOlwi4oizXCIsXCImQ3Jvc3M7XCI6XCLiqK9cIixcIiZDc2NyO1wiOlwi8J2SnlwiLFwiJkN1cDtcIjpcIuKLk1wiLFwiJkN1cENhcDtcIjpcIuKJjVwiLFwiJkREO1wiOlwi4oWFXCIsXCImRERvdHJhaGQ7XCI6XCLipJFcIixcIiZESmN5O1wiOlwi0IJcIixcIiZEU2N5O1wiOlwi0IVcIixcIiZEWmN5O1wiOlwi0I9cIixcIiZEYWdnZXI7XCI6XCLigKFcIixcIiZEYXJyO1wiOlwi4oahXCIsXCImRGFzaHY7XCI6XCLiq6RcIixcIiZEY2Fyb247XCI6XCLEjlwiLFwiJkRjeTtcIjpcItCUXCIsXCImRGVsO1wiOlwi4oiHXCIsXCImRGVsdGE7XCI6XCLOlFwiLFwiJkRmcjtcIjpcIvCdlIdcIixcIiZEaWFjcml0aWNhbEFjdXRlO1wiOlwiwrRcIixcIiZEaWFjcml0aWNhbERvdDtcIjpcIsuZXCIsXCImRGlhY3JpdGljYWxEb3VibGVBY3V0ZTtcIjpcIsudXCIsXCImRGlhY3JpdGljYWxHcmF2ZTtcIjpcImBcIixcIiZEaWFjcml0aWNhbFRpbGRlO1wiOlwiy5xcIixcIiZEaWFtb25kO1wiOlwi4ouEXCIsXCImRGlmZmVyZW50aWFsRDtcIjpcIuKFhlwiLFwiJkRvcGY7XCI6XCLwnZS7XCIsXCImRG90O1wiOlwiwqhcIixcIiZEb3REb3Q7XCI6XCLig5xcIixcIiZEb3RFcXVhbDtcIjpcIuKJkFwiLFwiJkRvdWJsZUNvbnRvdXJJbnRlZ3JhbDtcIjpcIuKIr1wiLFwiJkRvdWJsZURvdDtcIjpcIsKoXCIsXCImRG91YmxlRG93bkFycm93O1wiOlwi4oeTXCIsXCImRG91YmxlTGVmdEFycm93O1wiOlwi4oeQXCIsXCImRG91YmxlTGVmdFJpZ2h0QXJyb3c7XCI6XCLih5RcIixcIiZEb3VibGVMZWZ0VGVlO1wiOlwi4qukXCIsXCImRG91YmxlTG9uZ0xlZnRBcnJvdztcIjpcIuKfuFwiLFwiJkRvdWJsZUxvbmdMZWZ0UmlnaHRBcnJvdztcIjpcIuKfulwiLFwiJkRvdWJsZUxvbmdSaWdodEFycm93O1wiOlwi4p+5XCIsXCImRG91YmxlUmlnaHRBcnJvdztcIjpcIuKHklwiLFwiJkRvdWJsZVJpZ2h0VGVlO1wiOlwi4oqoXCIsXCImRG91YmxlVXBBcnJvdztcIjpcIuKHkVwiLFwiJkRvdWJsZVVwRG93bkFycm93O1wiOlwi4oeVXCIsXCImRG91YmxlVmVydGljYWxCYXI7XCI6XCLiiKVcIixcIiZEb3duQXJyb3c7XCI6XCLihpNcIixcIiZEb3duQXJyb3dCYXI7XCI6XCLipJNcIixcIiZEb3duQXJyb3dVcEFycm93O1wiOlwi4oe1XCIsXCImRG93bkJyZXZlO1wiOlwizJFcIixcIiZEb3duTGVmdFJpZ2h0VmVjdG9yO1wiOlwi4qWQXCIsXCImRG93bkxlZnRUZWVWZWN0b3I7XCI6XCLipZ5cIixcIiZEb3duTGVmdFZlY3RvcjtcIjpcIuKGvVwiLFwiJkRvd25MZWZ0VmVjdG9yQmFyO1wiOlwi4qWWXCIsXCImRG93blJpZ2h0VGVlVmVjdG9yO1wiOlwi4qWfXCIsXCImRG93blJpZ2h0VmVjdG9yO1wiOlwi4oeBXCIsXCImRG93blJpZ2h0VmVjdG9yQmFyO1wiOlwi4qWXXCIsXCImRG93blRlZTtcIjpcIuKKpFwiLFwiJkRvd25UZWVBcnJvdztcIjpcIuKGp1wiLFwiJkRvd25hcnJvdztcIjpcIuKHk1wiLFwiJkRzY3I7XCI6XCLwnZKfXCIsXCImRHN0cm9rO1wiOlwixJBcIixcIiZFTkc7XCI6XCLFilwiLFwiJkVUSFwiOlwiw5BcIixcIiZFVEg7XCI6XCLDkFwiLFwiJkVhY3V0ZVwiOlwiw4lcIixcIiZFYWN1dGU7XCI6XCLDiVwiLFwiJkVjYXJvbjtcIjpcIsSaXCIsXCImRWNpcmNcIjpcIsOKXCIsXCImRWNpcmM7XCI6XCLDilwiLFwiJkVjeTtcIjpcItCtXCIsXCImRWRvdDtcIjpcIsSWXCIsXCImRWZyO1wiOlwi8J2UiFwiLFwiJkVncmF2ZVwiOlwiw4hcIixcIiZFZ3JhdmU7XCI6XCLDiFwiLFwiJkVsZW1lbnQ7XCI6XCLiiIhcIixcIiZFbWFjcjtcIjpcIsSSXCIsXCImRW1wdHlTbWFsbFNxdWFyZTtcIjpcIuKXu1wiLFwiJkVtcHR5VmVyeVNtYWxsU3F1YXJlO1wiOlwi4parXCIsXCImRW9nb247XCI6XCLEmFwiLFwiJkVvcGY7XCI6XCLwnZS8XCIsXCImRXBzaWxvbjtcIjpcIs6VXCIsXCImRXF1YWw7XCI6XCLiqbVcIixcIiZFcXVhbFRpbGRlO1wiOlwi4omCXCIsXCImRXF1aWxpYnJpdW07XCI6XCLih4xcIixcIiZFc2NyO1wiOlwi4oSwXCIsXCImRXNpbTtcIjpcIuKps1wiLFwiJkV0YTtcIjpcIs6XXCIsXCImRXVtbFwiOlwiw4tcIixcIiZFdW1sO1wiOlwiw4tcIixcIiZFeGlzdHM7XCI6XCLiiINcIixcIiZFeHBvbmVudGlhbEU7XCI6XCLihYdcIixcIiZGY3k7XCI6XCLQpFwiLFwiJkZmcjtcIjpcIvCdlIlcIixcIiZGaWxsZWRTbWFsbFNxdWFyZTtcIjpcIuKXvFwiLFwiJkZpbGxlZFZlcnlTbWFsbFNxdWFyZTtcIjpcIuKWqlwiLFwiJkZvcGY7XCI6XCLwnZS9XCIsXCImRm9yQWxsO1wiOlwi4oiAXCIsXCImRm91cmllcnRyZjtcIjpcIuKEsVwiLFwiJkZzY3I7XCI6XCLihLFcIixcIiZHSmN5O1wiOlwi0INcIixcIiZHVFwiOlwiPlwiLFwiJkdUO1wiOlwiPlwiLFwiJkdhbW1hO1wiOlwizpNcIixcIiZHYW1tYWQ7XCI6XCLPnFwiLFwiJkdicmV2ZTtcIjpcIsSeXCIsXCImR2NlZGlsO1wiOlwixKJcIixcIiZHY2lyYztcIjpcIsScXCIsXCImR2N5O1wiOlwi0JNcIixcIiZHZG90O1wiOlwixKBcIixcIiZHZnI7XCI6XCLwnZSKXCIsXCImR2c7XCI6XCLii5lcIixcIiZHb3BmO1wiOlwi8J2UvlwiLFwiJkdyZWF0ZXJFcXVhbDtcIjpcIuKJpVwiLFwiJkdyZWF0ZXJFcXVhbExlc3M7XCI6XCLii5tcIixcIiZHcmVhdGVyRnVsbEVxdWFsO1wiOlwi4omnXCIsXCImR3JlYXRlckdyZWF0ZXI7XCI6XCLiqqJcIixcIiZHcmVhdGVyTGVzcztcIjpcIuKJt1wiLFwiJkdyZWF0ZXJTbGFudEVxdWFsO1wiOlwi4qm+XCIsXCImR3JlYXRlclRpbGRlO1wiOlwi4omzXCIsXCImR3NjcjtcIjpcIvCdkqJcIixcIiZHdDtcIjpcIuKJq1wiLFwiJkhBUkRjeTtcIjpcItCqXCIsXCImSGFjZWs7XCI6XCLLh1wiLFwiJkhhdDtcIjpcIl5cIixcIiZIY2lyYztcIjpcIsSkXCIsXCImSGZyO1wiOlwi4oSMXCIsXCImSGlsYmVydFNwYWNlO1wiOlwi4oSLXCIsXCImSG9wZjtcIjpcIuKEjVwiLFwiJkhvcml6b250YWxMaW5lO1wiOlwi4pSAXCIsXCImSHNjcjtcIjpcIuKEi1wiLFwiJkhzdHJvaztcIjpcIsSmXCIsXCImSHVtcERvd25IdW1wO1wiOlwi4omOXCIsXCImSHVtcEVxdWFsO1wiOlwi4omPXCIsXCImSUVjeTtcIjpcItCVXCIsXCImSUpsaWc7XCI6XCLEslwiLFwiJklPY3k7XCI6XCLQgVwiLFwiJklhY3V0ZVwiOlwiw41cIixcIiZJYWN1dGU7XCI6XCLDjVwiLFwiJkljaXJjXCI6XCLDjlwiLFwiJkljaXJjO1wiOlwiw45cIixcIiZJY3k7XCI6XCLQmFwiLFwiJklkb3Q7XCI6XCLEsFwiLFwiJklmcjtcIjpcIuKEkVwiLFwiJklncmF2ZVwiOlwiw4xcIixcIiZJZ3JhdmU7XCI6XCLDjFwiLFwiJkltO1wiOlwi4oSRXCIsXCImSW1hY3I7XCI6XCLEqlwiLFwiJkltYWdpbmFyeUk7XCI6XCLihYhcIixcIiZJbXBsaWVzO1wiOlwi4oeSXCIsXCImSW50O1wiOlwi4oisXCIsXCImSW50ZWdyYWw7XCI6XCLiiKtcIixcIiZJbnRlcnNlY3Rpb247XCI6XCLii4JcIixcIiZJbnZpc2libGVDb21tYTtcIjpcIuKBo1wiLFwiJkludmlzaWJsZVRpbWVzO1wiOlwi4oGiXCIsXCImSW9nb247XCI6XCLErlwiLFwiJklvcGY7XCI6XCLwnZWAXCIsXCImSW90YTtcIjpcIs6ZXCIsXCImSXNjcjtcIjpcIuKEkFwiLFwiJkl0aWxkZTtcIjpcIsSoXCIsXCImSXVrY3k7XCI6XCLQhlwiLFwiJkl1bWxcIjpcIsOPXCIsXCImSXVtbDtcIjpcIsOPXCIsXCImSmNpcmM7XCI6XCLEtFwiLFwiJkpjeTtcIjpcItCZXCIsXCImSmZyO1wiOlwi8J2UjVwiLFwiJkpvcGY7XCI6XCLwnZWBXCIsXCImSnNjcjtcIjpcIvCdkqVcIixcIiZKc2VyY3k7XCI6XCLQiFwiLFwiJkp1a2N5O1wiOlwi0IRcIixcIiZLSGN5O1wiOlwi0KVcIixcIiZLSmN5O1wiOlwi0IxcIixcIiZLYXBwYTtcIjpcIs6aXCIsXCImS2NlZGlsO1wiOlwixLZcIixcIiZLY3k7XCI6XCLQmlwiLFwiJktmcjtcIjpcIvCdlI5cIixcIiZLb3BmO1wiOlwi8J2VglwiLFwiJktzY3I7XCI6XCLwnZKmXCIsXCImTEpjeTtcIjpcItCJXCIsXCImTFRcIjpcIjxcIixcIiZMVDtcIjpcIjxcIixcIiZMYWN1dGU7XCI6XCLEuVwiLFwiJkxhbWJkYTtcIjpcIs6bXCIsXCImTGFuZztcIjpcIuKfqlwiLFwiJkxhcGxhY2V0cmY7XCI6XCLihJJcIixcIiZMYXJyO1wiOlwi4oaeXCIsXCImTGNhcm9uO1wiOlwixL1cIixcIiZMY2VkaWw7XCI6XCLEu1wiLFwiJkxjeTtcIjpcItCbXCIsXCImTGVmdEFuZ2xlQnJhY2tldDtcIjpcIuKfqFwiLFwiJkxlZnRBcnJvdztcIjpcIuKGkFwiLFwiJkxlZnRBcnJvd0JhcjtcIjpcIuKHpFwiLFwiJkxlZnRBcnJvd1JpZ2h0QXJyb3c7XCI6XCLih4ZcIixcIiZMZWZ0Q2VpbGluZztcIjpcIuKMiFwiLFwiJkxlZnREb3VibGVCcmFja2V0O1wiOlwi4p+mXCIsXCImTGVmdERvd25UZWVWZWN0b3I7XCI6XCLipaFcIixcIiZMZWZ0RG93blZlY3RvcjtcIjpcIuKHg1wiLFwiJkxlZnREb3duVmVjdG9yQmFyO1wiOlwi4qWZXCIsXCImTGVmdEZsb29yO1wiOlwi4oyKXCIsXCImTGVmdFJpZ2h0QXJyb3c7XCI6XCLihpRcIixcIiZMZWZ0UmlnaHRWZWN0b3I7XCI6XCLipY5cIixcIiZMZWZ0VGVlO1wiOlwi4oqjXCIsXCImTGVmdFRlZUFycm93O1wiOlwi4oakXCIsXCImTGVmdFRlZVZlY3RvcjtcIjpcIuKlmlwiLFwiJkxlZnRUcmlhbmdsZTtcIjpcIuKKslwiLFwiJkxlZnRUcmlhbmdsZUJhcjtcIjpcIuKnj1wiLFwiJkxlZnRUcmlhbmdsZUVxdWFsO1wiOlwi4oq0XCIsXCImTGVmdFVwRG93blZlY3RvcjtcIjpcIuKlkVwiLFwiJkxlZnRVcFRlZVZlY3RvcjtcIjpcIuKloFwiLFwiJkxlZnRVcFZlY3RvcjtcIjpcIuKGv1wiLFwiJkxlZnRVcFZlY3RvckJhcjtcIjpcIuKlmFwiLFwiJkxlZnRWZWN0b3I7XCI6XCLihrxcIixcIiZMZWZ0VmVjdG9yQmFyO1wiOlwi4qWSXCIsXCImTGVmdGFycm93O1wiOlwi4oeQXCIsXCImTGVmdHJpZ2h0YXJyb3c7XCI6XCLih5RcIixcIiZMZXNzRXF1YWxHcmVhdGVyO1wiOlwi4ouaXCIsXCImTGVzc0Z1bGxFcXVhbDtcIjpcIuKJplwiLFwiJkxlc3NHcmVhdGVyO1wiOlwi4om2XCIsXCImTGVzc0xlc3M7XCI6XCLiqqFcIixcIiZMZXNzU2xhbnRFcXVhbDtcIjpcIuKpvVwiLFwiJkxlc3NUaWxkZTtcIjpcIuKJslwiLFwiJkxmcjtcIjpcIvCdlI9cIixcIiZMbDtcIjpcIuKLmFwiLFwiJkxsZWZ0YXJyb3c7XCI6XCLih5pcIixcIiZMbWlkb3Q7XCI6XCLEv1wiLFwiJkxvbmdMZWZ0QXJyb3c7XCI6XCLin7VcIixcIiZMb25nTGVmdFJpZ2h0QXJyb3c7XCI6XCLin7dcIixcIiZMb25nUmlnaHRBcnJvdztcIjpcIuKftlwiLFwiJkxvbmdsZWZ0YXJyb3c7XCI6XCLin7hcIixcIiZMb25nbGVmdHJpZ2h0YXJyb3c7XCI6XCLin7pcIixcIiZMb25ncmlnaHRhcnJvdztcIjpcIuKfuVwiLFwiJkxvcGY7XCI6XCLwnZWDXCIsXCImTG93ZXJMZWZ0QXJyb3c7XCI6XCLihplcIixcIiZMb3dlclJpZ2h0QXJyb3c7XCI6XCLihphcIixcIiZMc2NyO1wiOlwi4oSSXCIsXCImTHNoO1wiOlwi4oawXCIsXCImTHN0cm9rO1wiOlwixYFcIixcIiZMdDtcIjpcIuKJqlwiLFwiJk1hcDtcIjpcIuKkhVwiLFwiJk1jeTtcIjpcItCcXCIsXCImTWVkaXVtU3BhY2U7XCI6XCLigZ9cIixcIiZNZWxsaW50cmY7XCI6XCLihLNcIixcIiZNZnI7XCI6XCLwnZSQXCIsXCImTWludXNQbHVzO1wiOlwi4oiTXCIsXCImTW9wZjtcIjpcIvCdlYRcIixcIiZNc2NyO1wiOlwi4oSzXCIsXCImTXU7XCI6XCLOnFwiLFwiJk5KY3k7XCI6XCLQilwiLFwiJk5hY3V0ZTtcIjpcIsWDXCIsXCImTmNhcm9uO1wiOlwixYdcIixcIiZOY2VkaWw7XCI6XCLFhVwiLFwiJk5jeTtcIjpcItCdXCIsXCImTmVnYXRpdmVNZWRpdW1TcGFjZTtcIjpcIuKAi1wiLFwiJk5lZ2F0aXZlVGhpY2tTcGFjZTtcIjpcIuKAi1wiLFwiJk5lZ2F0aXZlVGhpblNwYWNlO1wiOlwi4oCLXCIsXCImTmVnYXRpdmVWZXJ5VGhpblNwYWNlO1wiOlwi4oCLXCIsXCImTmVzdGVkR3JlYXRlckdyZWF0ZXI7XCI6XCLiiatcIixcIiZOZXN0ZWRMZXNzTGVzcztcIjpcIuKJqlwiLFwiJk5ld0xpbmU7XCI6XCJcXG5cIixcIiZOZnI7XCI6XCLwnZSRXCIsXCImTm9CcmVhaztcIjpcIuKBoFwiLFwiJk5vbkJyZWFraW5nU3BhY2U7XCI6XCLCoFwiLFwiJk5vcGY7XCI6XCLihJVcIixcIiZOb3Q7XCI6XCLiq6xcIixcIiZOb3RDb25ncnVlbnQ7XCI6XCLiiaJcIixcIiZOb3RDdXBDYXA7XCI6XCLiia1cIixcIiZOb3REb3VibGVWZXJ0aWNhbEJhcjtcIjpcIuKIplwiLFwiJk5vdEVsZW1lbnQ7XCI6XCLiiIlcIixcIiZOb3RFcXVhbDtcIjpcIuKJoFwiLFwiJk5vdEVxdWFsVGlsZGU7XCI6XCLiiYLMuFwiLFwiJk5vdEV4aXN0cztcIjpcIuKIhFwiLFwiJk5vdEdyZWF0ZXI7XCI6XCLiia9cIixcIiZOb3RHcmVhdGVyRXF1YWw7XCI6XCLiibFcIixcIiZOb3RHcmVhdGVyRnVsbEVxdWFsO1wiOlwi4omnzLhcIixcIiZOb3RHcmVhdGVyR3JlYXRlcjtcIjpcIuKJq8y4XCIsXCImTm90R3JlYXRlckxlc3M7XCI6XCLiiblcIixcIiZOb3RHcmVhdGVyU2xhbnRFcXVhbDtcIjpcIuKpvsy4XCIsXCImTm90R3JlYXRlclRpbGRlO1wiOlwi4om1XCIsXCImTm90SHVtcERvd25IdW1wO1wiOlwi4omOzLhcIixcIiZOb3RIdW1wRXF1YWw7XCI6XCLiiY/MuFwiLFwiJk5vdExlZnRUcmlhbmdsZTtcIjpcIuKLqlwiLFwiJk5vdExlZnRUcmlhbmdsZUJhcjtcIjpcIuKnj8y4XCIsXCImTm90TGVmdFRyaWFuZ2xlRXF1YWw7XCI6XCLii6xcIixcIiZOb3RMZXNzO1wiOlwi4omuXCIsXCImTm90TGVzc0VxdWFsO1wiOlwi4omwXCIsXCImTm90TGVzc0dyZWF0ZXI7XCI6XCLiibhcIixcIiZOb3RMZXNzTGVzcztcIjpcIuKJqsy4XCIsXCImTm90TGVzc1NsYW50RXF1YWw7XCI6XCLiqb3MuFwiLFwiJk5vdExlc3NUaWxkZTtcIjpcIuKJtFwiLFwiJk5vdE5lc3RlZEdyZWF0ZXJHcmVhdGVyO1wiOlwi4qqizLhcIixcIiZOb3ROZXN0ZWRMZXNzTGVzcztcIjpcIuKqocy4XCIsXCImTm90UHJlY2VkZXM7XCI6XCLiioBcIixcIiZOb3RQcmVjZWRlc0VxdWFsO1wiOlwi4qqvzLhcIixcIiZOb3RQcmVjZWRlc1NsYW50RXF1YWw7XCI6XCLii6BcIixcIiZOb3RSZXZlcnNlRWxlbWVudDtcIjpcIuKIjFwiLFwiJk5vdFJpZ2h0VHJpYW5nbGU7XCI6XCLii6tcIixcIiZOb3RSaWdodFRyaWFuZ2xlQmFyO1wiOlwi4qeQzLhcIixcIiZOb3RSaWdodFRyaWFuZ2xlRXF1YWw7XCI6XCLii61cIixcIiZOb3RTcXVhcmVTdWJzZXQ7XCI6XCLiio/MuFwiLFwiJk5vdFNxdWFyZVN1YnNldEVxdWFsO1wiOlwi4ouiXCIsXCImTm90U3F1YXJlU3VwZXJzZXQ7XCI6XCLiipDMuFwiLFwiJk5vdFNxdWFyZVN1cGVyc2V0RXF1YWw7XCI6XCLii6NcIixcIiZOb3RTdWJzZXQ7XCI6XCLiioLig5JcIixcIiZOb3RTdWJzZXRFcXVhbDtcIjpcIuKKiFwiLFwiJk5vdFN1Y2NlZWRzO1wiOlwi4oqBXCIsXCImTm90U3VjY2VlZHNFcXVhbDtcIjpcIuKqsMy4XCIsXCImTm90U3VjY2VlZHNTbGFudEVxdWFsO1wiOlwi4ouhXCIsXCImTm90U3VjY2VlZHNUaWxkZTtcIjpcIuKJv8y4XCIsXCImTm90U3VwZXJzZXQ7XCI6XCLiioPig5JcIixcIiZOb3RTdXBlcnNldEVxdWFsO1wiOlwi4oqJXCIsXCImTm90VGlsZGU7XCI6XCLiiYFcIixcIiZOb3RUaWxkZUVxdWFsO1wiOlwi4omEXCIsXCImTm90VGlsZGVGdWxsRXF1YWw7XCI6XCLiiYdcIixcIiZOb3RUaWxkZVRpbGRlO1wiOlwi4omJXCIsXCImTm90VmVydGljYWxCYXI7XCI6XCLiiKRcIixcIiZOc2NyO1wiOlwi8J2SqVwiLFwiJk50aWxkZVwiOlwiw5FcIixcIiZOdGlsZGU7XCI6XCLDkVwiLFwiJk51O1wiOlwizp1cIixcIiZPRWxpZztcIjpcIsWSXCIsXCImT2FjdXRlXCI6XCLDk1wiLFwiJk9hY3V0ZTtcIjpcIsOTXCIsXCImT2NpcmNcIjpcIsOUXCIsXCImT2NpcmM7XCI6XCLDlFwiLFwiJk9jeTtcIjpcItCeXCIsXCImT2RibGFjO1wiOlwixZBcIixcIiZPZnI7XCI6XCLwnZSSXCIsXCImT2dyYXZlXCI6XCLDklwiLFwiJk9ncmF2ZTtcIjpcIsOSXCIsXCImT21hY3I7XCI6XCLFjFwiLFwiJk9tZWdhO1wiOlwizqlcIixcIiZPbWljcm9uO1wiOlwizp9cIixcIiZPb3BmO1wiOlwi8J2VhlwiLFwiJk9wZW5DdXJseURvdWJsZVF1b3RlO1wiOlwi4oCcXCIsXCImT3BlbkN1cmx5UXVvdGU7XCI6XCLigJhcIixcIiZPcjtcIjpcIuKplFwiLFwiJk9zY3I7XCI6XCLwnZKqXCIsXCImT3NsYXNoXCI6XCLDmFwiLFwiJk9zbGFzaDtcIjpcIsOYXCIsXCImT3RpbGRlXCI6XCLDlVwiLFwiJk90aWxkZTtcIjpcIsOVXCIsXCImT3RpbWVzO1wiOlwi4qi3XCIsXCImT3VtbFwiOlwiw5ZcIixcIiZPdW1sO1wiOlwiw5ZcIixcIiZPdmVyQmFyO1wiOlwi4oC+XCIsXCImT3ZlckJyYWNlO1wiOlwi4o+eXCIsXCImT3ZlckJyYWNrZXQ7XCI6XCLijrRcIixcIiZPdmVyUGFyZW50aGVzaXM7XCI6XCLij5xcIixcIiZQYXJ0aWFsRDtcIjpcIuKIglwiLFwiJlBjeTtcIjpcItCfXCIsXCImUGZyO1wiOlwi8J2Uk1wiLFwiJlBoaTtcIjpcIs6mXCIsXCImUGk7XCI6XCLOoFwiLFwiJlBsdXNNaW51cztcIjpcIsKxXCIsXCImUG9pbmNhcmVwbGFuZTtcIjpcIuKEjFwiLFwiJlBvcGY7XCI6XCLihJlcIixcIiZQcjtcIjpcIuKqu1wiLFwiJlByZWNlZGVzO1wiOlwi4om6XCIsXCImUHJlY2VkZXNFcXVhbDtcIjpcIuKqr1wiLFwiJlByZWNlZGVzU2xhbnRFcXVhbDtcIjpcIuKJvFwiLFwiJlByZWNlZGVzVGlsZGU7XCI6XCLiib5cIixcIiZQcmltZTtcIjpcIuKAs1wiLFwiJlByb2R1Y3Q7XCI6XCLiiI9cIixcIiZQcm9wb3J0aW9uO1wiOlwi4oi3XCIsXCImUHJvcG9ydGlvbmFsO1wiOlwi4oidXCIsXCImUHNjcjtcIjpcIvCdkqtcIixcIiZQc2k7XCI6XCLOqFwiLFwiJlFVT1RcIjonXCInLFwiJlFVT1Q7XCI6J1wiJyxcIiZRZnI7XCI6XCLwnZSUXCIsXCImUW9wZjtcIjpcIuKEmlwiLFwiJlFzY3I7XCI6XCLwnZKsXCIsXCImUkJhcnI7XCI6XCLipJBcIixcIiZSRUdcIjpcIsKuXCIsXCImUkVHO1wiOlwiwq5cIixcIiZSYWN1dGU7XCI6XCLFlFwiLFwiJlJhbmc7XCI6XCLin6tcIixcIiZSYXJyO1wiOlwi4oagXCIsXCImUmFycnRsO1wiOlwi4qSWXCIsXCImUmNhcm9uO1wiOlwixZhcIixcIiZSY2VkaWw7XCI6XCLFllwiLFwiJlJjeTtcIjpcItCgXCIsXCImUmU7XCI6XCLihJxcIixcIiZSZXZlcnNlRWxlbWVudDtcIjpcIuKIi1wiLFwiJlJldmVyc2VFcXVpbGlicml1bTtcIjpcIuKHi1wiLFwiJlJldmVyc2VVcEVxdWlsaWJyaXVtO1wiOlwi4qWvXCIsXCImUmZyO1wiOlwi4oScXCIsXCImUmhvO1wiOlwizqFcIixcIiZSaWdodEFuZ2xlQnJhY2tldDtcIjpcIuKfqVwiLFwiJlJpZ2h0QXJyb3c7XCI6XCLihpJcIixcIiZSaWdodEFycm93QmFyO1wiOlwi4oelXCIsXCImUmlnaHRBcnJvd0xlZnRBcnJvdztcIjpcIuKHhFwiLFwiJlJpZ2h0Q2VpbGluZztcIjpcIuKMiVwiLFwiJlJpZ2h0RG91YmxlQnJhY2tldDtcIjpcIuKfp1wiLFwiJlJpZ2h0RG93blRlZVZlY3RvcjtcIjpcIuKlnVwiLFwiJlJpZ2h0RG93blZlY3RvcjtcIjpcIuKHglwiLFwiJlJpZ2h0RG93blZlY3RvckJhcjtcIjpcIuKllVwiLFwiJlJpZ2h0Rmxvb3I7XCI6XCLijItcIixcIiZSaWdodFRlZTtcIjpcIuKKolwiLFwiJlJpZ2h0VGVlQXJyb3c7XCI6XCLihqZcIixcIiZSaWdodFRlZVZlY3RvcjtcIjpcIuKlm1wiLFwiJlJpZ2h0VHJpYW5nbGU7XCI6XCLiirNcIixcIiZSaWdodFRyaWFuZ2xlQmFyO1wiOlwi4qeQXCIsXCImUmlnaHRUcmlhbmdsZUVxdWFsO1wiOlwi4oq1XCIsXCImUmlnaHRVcERvd25WZWN0b3I7XCI6XCLipY9cIixcIiZSaWdodFVwVGVlVmVjdG9yO1wiOlwi4qWcXCIsXCImUmlnaHRVcFZlY3RvcjtcIjpcIuKGvlwiLFwiJlJpZ2h0VXBWZWN0b3JCYXI7XCI6XCLipZRcIixcIiZSaWdodFZlY3RvcjtcIjpcIuKHgFwiLFwiJlJpZ2h0VmVjdG9yQmFyO1wiOlwi4qWTXCIsXCImUmlnaHRhcnJvdztcIjpcIuKHklwiLFwiJlJvcGY7XCI6XCLihJ1cIixcIiZSb3VuZEltcGxpZXM7XCI6XCLipbBcIixcIiZScmlnaHRhcnJvdztcIjpcIuKHm1wiLFwiJlJzY3I7XCI6XCLihJtcIixcIiZSc2g7XCI6XCLihrFcIixcIiZSdWxlRGVsYXllZDtcIjpcIuKntFwiLFwiJlNIQ0hjeTtcIjpcItCpXCIsXCImU0hjeTtcIjpcItCoXCIsXCImU09GVGN5O1wiOlwi0KxcIixcIiZTYWN1dGU7XCI6XCLFmlwiLFwiJlNjO1wiOlwi4qq8XCIsXCImU2Nhcm9uO1wiOlwixaBcIixcIiZTY2VkaWw7XCI6XCLFnlwiLFwiJlNjaXJjO1wiOlwixZxcIixcIiZTY3k7XCI6XCLQoVwiLFwiJlNmcjtcIjpcIvCdlJZcIixcIiZTaG9ydERvd25BcnJvdztcIjpcIuKGk1wiLFwiJlNob3J0TGVmdEFycm93O1wiOlwi4oaQXCIsXCImU2hvcnRSaWdodEFycm93O1wiOlwi4oaSXCIsXCImU2hvcnRVcEFycm93O1wiOlwi4oaRXCIsXCImU2lnbWE7XCI6XCLOo1wiLFwiJlNtYWxsQ2lyY2xlO1wiOlwi4oiYXCIsXCImU29wZjtcIjpcIvCdlYpcIixcIiZTcXJ0O1wiOlwi4oiaXCIsXCImU3F1YXJlO1wiOlwi4pahXCIsXCImU3F1YXJlSW50ZXJzZWN0aW9uO1wiOlwi4oqTXCIsXCImU3F1YXJlU3Vic2V0O1wiOlwi4oqPXCIsXCImU3F1YXJlU3Vic2V0RXF1YWw7XCI6XCLiipFcIixcIiZTcXVhcmVTdXBlcnNldDtcIjpcIuKKkFwiLFwiJlNxdWFyZVN1cGVyc2V0RXF1YWw7XCI6XCLiipJcIixcIiZTcXVhcmVVbmlvbjtcIjpcIuKKlFwiLFwiJlNzY3I7XCI6XCLwnZKuXCIsXCImU3RhcjtcIjpcIuKLhlwiLFwiJlN1YjtcIjpcIuKLkFwiLFwiJlN1YnNldDtcIjpcIuKLkFwiLFwiJlN1YnNldEVxdWFsO1wiOlwi4oqGXCIsXCImU3VjY2VlZHM7XCI6XCLiibtcIixcIiZTdWNjZWVkc0VxdWFsO1wiOlwi4qqwXCIsXCImU3VjY2VlZHNTbGFudEVxdWFsO1wiOlwi4om9XCIsXCImU3VjY2VlZHNUaWxkZTtcIjpcIuKJv1wiLFwiJlN1Y2hUaGF0O1wiOlwi4oiLXCIsXCImU3VtO1wiOlwi4oiRXCIsXCImU3VwO1wiOlwi4ouRXCIsXCImU3VwZXJzZXQ7XCI6XCLiioNcIixcIiZTdXBlcnNldEVxdWFsO1wiOlwi4oqHXCIsXCImU3Vwc2V0O1wiOlwi4ouRXCIsXCImVEhPUk5cIjpcIsOeXCIsXCImVEhPUk47XCI6XCLDnlwiLFwiJlRSQURFO1wiOlwi4oSiXCIsXCImVFNIY3k7XCI6XCLQi1wiLFwiJlRTY3k7XCI6XCLQplwiLFwiJlRhYjtcIjpcIlxcdFwiLFwiJlRhdTtcIjpcIs6kXCIsXCImVGNhcm9uO1wiOlwixaRcIixcIiZUY2VkaWw7XCI6XCLFolwiLFwiJlRjeTtcIjpcItCiXCIsXCImVGZyO1wiOlwi8J2Ul1wiLFwiJlRoZXJlZm9yZTtcIjpcIuKItFwiLFwiJlRoZXRhO1wiOlwizphcIixcIiZUaGlja1NwYWNlO1wiOlwi4oGf4oCKXCIsXCImVGhpblNwYWNlO1wiOlwi4oCJXCIsXCImVGlsZGU7XCI6XCLiiLxcIixcIiZUaWxkZUVxdWFsO1wiOlwi4omDXCIsXCImVGlsZGVGdWxsRXF1YWw7XCI6XCLiiYVcIixcIiZUaWxkZVRpbGRlO1wiOlwi4omIXCIsXCImVG9wZjtcIjpcIvCdlYtcIixcIiZUcmlwbGVEb3Q7XCI6XCLig5tcIixcIiZUc2NyO1wiOlwi8J2Sr1wiLFwiJlRzdHJvaztcIjpcIsWmXCIsXCImVWFjdXRlXCI6XCLDmlwiLFwiJlVhY3V0ZTtcIjpcIsOaXCIsXCImVWFycjtcIjpcIuKGn1wiLFwiJlVhcnJvY2lyO1wiOlwi4qWJXCIsXCImVWJyY3k7XCI6XCLQjlwiLFwiJlVicmV2ZTtcIjpcIsWsXCIsXCImVWNpcmNcIjpcIsObXCIsXCImVWNpcmM7XCI6XCLDm1wiLFwiJlVjeTtcIjpcItCjXCIsXCImVWRibGFjO1wiOlwixbBcIixcIiZVZnI7XCI6XCLwnZSYXCIsXCImVWdyYXZlXCI6XCLDmVwiLFwiJlVncmF2ZTtcIjpcIsOZXCIsXCImVW1hY3I7XCI6XCLFqlwiLFwiJlVuZGVyQmFyO1wiOlwiX1wiLFwiJlVuZGVyQnJhY2U7XCI6XCLij59cIixcIiZVbmRlckJyYWNrZXQ7XCI6XCLijrVcIixcIiZVbmRlclBhcmVudGhlc2lzO1wiOlwi4o+dXCIsXCImVW5pb247XCI6XCLii4NcIixcIiZVbmlvblBsdXM7XCI6XCLiio5cIixcIiZVb2dvbjtcIjpcIsWyXCIsXCImVW9wZjtcIjpcIvCdlYxcIixcIiZVcEFycm93O1wiOlwi4oaRXCIsXCImVXBBcnJvd0JhcjtcIjpcIuKkklwiLFwiJlVwQXJyb3dEb3duQXJyb3c7XCI6XCLih4VcIixcIiZVcERvd25BcnJvdztcIjpcIuKGlVwiLFwiJlVwRXF1aWxpYnJpdW07XCI6XCLipa5cIixcIiZVcFRlZTtcIjpcIuKKpVwiLFwiJlVwVGVlQXJyb3c7XCI6XCLihqVcIixcIiZVcGFycm93O1wiOlwi4oeRXCIsXCImVXBkb3duYXJyb3c7XCI6XCLih5VcIixcIiZVcHBlckxlZnRBcnJvdztcIjpcIuKGllwiLFwiJlVwcGVyUmlnaHRBcnJvdztcIjpcIuKGl1wiLFwiJlVwc2k7XCI6XCLPklwiLFwiJlVwc2lsb247XCI6XCLOpVwiLFwiJlVyaW5nO1wiOlwixa5cIixcIiZVc2NyO1wiOlwi8J2SsFwiLFwiJlV0aWxkZTtcIjpcIsWoXCIsXCImVXVtbFwiOlwiw5xcIixcIiZVdW1sO1wiOlwiw5xcIixcIiZWRGFzaDtcIjpcIuKKq1wiLFwiJlZiYXI7XCI6XCLiq6tcIixcIiZWY3k7XCI6XCLQklwiLFwiJlZkYXNoO1wiOlwi4oqpXCIsXCImVmRhc2hsO1wiOlwi4qumXCIsXCImVmVlO1wiOlwi4ouBXCIsXCImVmVyYmFyO1wiOlwi4oCWXCIsXCImVmVydDtcIjpcIuKAllwiLFwiJlZlcnRpY2FsQmFyO1wiOlwi4oijXCIsXCImVmVydGljYWxMaW5lO1wiOlwifFwiLFwiJlZlcnRpY2FsU2VwYXJhdG9yO1wiOlwi4p2YXCIsXCImVmVydGljYWxUaWxkZTtcIjpcIuKJgFwiLFwiJlZlcnlUaGluU3BhY2U7XCI6XCLigIpcIixcIiZWZnI7XCI6XCLwnZSZXCIsXCImVm9wZjtcIjpcIvCdlY1cIixcIiZWc2NyO1wiOlwi8J2SsVwiLFwiJlZ2ZGFzaDtcIjpcIuKKqlwiLFwiJldjaXJjO1wiOlwixbRcIixcIiZXZWRnZTtcIjpcIuKLgFwiLFwiJldmcjtcIjpcIvCdlJpcIixcIiZXb3BmO1wiOlwi8J2VjlwiLFwiJldzY3I7XCI6XCLwnZKyXCIsXCImWGZyO1wiOlwi8J2Um1wiLFwiJlhpO1wiOlwizp5cIixcIiZYb3BmO1wiOlwi8J2Vj1wiLFwiJlhzY3I7XCI6XCLwnZKzXCIsXCImWUFjeTtcIjpcItCvXCIsXCImWUljeTtcIjpcItCHXCIsXCImWVVjeTtcIjpcItCuXCIsXCImWWFjdXRlXCI6XCLDnVwiLFwiJllhY3V0ZTtcIjpcIsOdXCIsXCImWWNpcmM7XCI6XCLFtlwiLFwiJlljeTtcIjpcItCrXCIsXCImWWZyO1wiOlwi8J2UnFwiLFwiJllvcGY7XCI6XCLwnZWQXCIsXCImWXNjcjtcIjpcIvCdkrRcIixcIiZZdW1sO1wiOlwixbhcIixcIiZaSGN5O1wiOlwi0JZcIixcIiZaYWN1dGU7XCI6XCLFuVwiLFwiJlpjYXJvbjtcIjpcIsW9XCIsXCImWmN5O1wiOlwi0JdcIixcIiZaZG90O1wiOlwixbtcIixcIiZaZXJvV2lkdGhTcGFjZTtcIjpcIuKAi1wiLFwiJlpldGE7XCI6XCLOllwiLFwiJlpmcjtcIjpcIuKEqFwiLFwiJlpvcGY7XCI6XCLihKRcIixcIiZac2NyO1wiOlwi8J2StVwiLFwiJmFhY3V0ZVwiOlwiw6FcIixcIiZhYWN1dGU7XCI6XCLDoVwiLFwiJmFicmV2ZTtcIjpcIsSDXCIsXCImYWM7XCI6XCLiiL5cIixcIiZhY0U7XCI6XCLiiL7Ms1wiLFwiJmFjZDtcIjpcIuKIv1wiLFwiJmFjaXJjXCI6XCLDolwiLFwiJmFjaXJjO1wiOlwiw6JcIixcIiZhY3V0ZVwiOlwiwrRcIixcIiZhY3V0ZTtcIjpcIsK0XCIsXCImYWN5O1wiOlwi0LBcIixcIiZhZWxpZ1wiOlwiw6ZcIixcIiZhZWxpZztcIjpcIsOmXCIsXCImYWY7XCI6XCLigaFcIixcIiZhZnI7XCI6XCLwnZSeXCIsXCImYWdyYXZlXCI6XCLDoFwiLFwiJmFncmF2ZTtcIjpcIsOgXCIsXCImYWxlZnN5bTtcIjpcIuKEtVwiLFwiJmFsZXBoO1wiOlwi4oS1XCIsXCImYWxwaGE7XCI6XCLOsVwiLFwiJmFtYWNyO1wiOlwixIFcIixcIiZhbWFsZztcIjpcIuKov1wiLFwiJmFtcFwiOlwiJlwiLFwiJmFtcDtcIjpcIiZcIixcIiZhbmQ7XCI6XCLiiKdcIixcIiZhbmRhbmQ7XCI6XCLiqZVcIixcIiZhbmRkO1wiOlwi4qmcXCIsXCImYW5kc2xvcGU7XCI6XCLiqZhcIixcIiZhbmR2O1wiOlwi4qmaXCIsXCImYW5nO1wiOlwi4oigXCIsXCImYW5nZTtcIjpcIuKmpFwiLFwiJmFuZ2xlO1wiOlwi4oigXCIsXCImYW5nbXNkO1wiOlwi4oihXCIsXCImYW5nbXNkYWE7XCI6XCLipqhcIixcIiZhbmdtc2RhYjtcIjpcIuKmqVwiLFwiJmFuZ21zZGFjO1wiOlwi4qaqXCIsXCImYW5nbXNkYWQ7XCI6XCLipqtcIixcIiZhbmdtc2RhZTtcIjpcIuKmrFwiLFwiJmFuZ21zZGFmO1wiOlwi4qatXCIsXCImYW5nbXNkYWc7XCI6XCLipq5cIixcIiZhbmdtc2RhaDtcIjpcIuKmr1wiLFwiJmFuZ3J0O1wiOlwi4oifXCIsXCImYW5ncnR2YjtcIjpcIuKKvlwiLFwiJmFuZ3J0dmJkO1wiOlwi4qadXCIsXCImYW5nc3BoO1wiOlwi4oiiXCIsXCImYW5nc3Q7XCI6XCLDhVwiLFwiJmFuZ3phcnI7XCI6XCLijbxcIixcIiZhb2dvbjtcIjpcIsSFXCIsXCImYW9wZjtcIjpcIvCdlZJcIixcIiZhcDtcIjpcIuKJiFwiLFwiJmFwRTtcIjpcIuKpsFwiLFwiJmFwYWNpcjtcIjpcIuKpr1wiLFwiJmFwZTtcIjpcIuKJilwiLFwiJmFwaWQ7XCI6XCLiiYtcIixcIiZhcG9zO1wiOlwiJ1wiLFwiJmFwcHJveDtcIjpcIuKJiFwiLFwiJmFwcHJveGVxO1wiOlwi4omKXCIsXCImYXJpbmdcIjpcIsOlXCIsXCImYXJpbmc7XCI6XCLDpVwiLFwiJmFzY3I7XCI6XCLwnZK2XCIsXCImYXN0O1wiOlwiKlwiLFwiJmFzeW1wO1wiOlwi4omIXCIsXCImYXN5bXBlcTtcIjpcIuKJjVwiLFwiJmF0aWxkZVwiOlwiw6NcIixcIiZhdGlsZGU7XCI6XCLDo1wiLFwiJmF1bWxcIjpcIsOkXCIsXCImYXVtbDtcIjpcIsOkXCIsXCImYXdjb25pbnQ7XCI6XCLiiLNcIixcIiZhd2ludDtcIjpcIuKokVwiLFwiJmJOb3Q7XCI6XCLiq61cIixcIiZiYWNrY29uZztcIjpcIuKJjFwiLFwiJmJhY2tlcHNpbG9uO1wiOlwiz7ZcIixcIiZiYWNrcHJpbWU7XCI6XCLigLVcIixcIiZiYWNrc2ltO1wiOlwi4oi9XCIsXCImYmFja3NpbWVxO1wiOlwi4ouNXCIsXCImYmFydmVlO1wiOlwi4oq9XCIsXCImYmFyd2VkO1wiOlwi4oyFXCIsXCImYmFyd2VkZ2U7XCI6XCLijIVcIixcIiZiYnJrO1wiOlwi4o61XCIsXCImYmJya3Ricms7XCI6XCLijrZcIixcIiZiY29uZztcIjpcIuKJjFwiLFwiJmJjeTtcIjpcItCxXCIsXCImYmRxdW87XCI6XCLigJ5cIixcIiZiZWNhdXM7XCI6XCLiiLVcIixcIiZiZWNhdXNlO1wiOlwi4oi1XCIsXCImYmVtcHR5djtcIjpcIuKmsFwiLFwiJmJlcHNpO1wiOlwiz7ZcIixcIiZiZXJub3U7XCI6XCLihKxcIixcIiZiZXRhO1wiOlwizrJcIixcIiZiZXRoO1wiOlwi4oS2XCIsXCImYmV0d2VlbjtcIjpcIuKJrFwiLFwiJmJmcjtcIjpcIvCdlJ9cIixcIiZiaWdjYXA7XCI6XCLii4JcIixcIiZiaWdjaXJjO1wiOlwi4pevXCIsXCImYmlnY3VwO1wiOlwi4ouDXCIsXCImYmlnb2RvdDtcIjpcIuKogFwiLFwiJmJpZ29wbHVzO1wiOlwi4qiBXCIsXCImYmlnb3RpbWVzO1wiOlwi4qiCXCIsXCImYmlnc3FjdXA7XCI6XCLiqIZcIixcIiZiaWdzdGFyO1wiOlwi4piFXCIsXCImYmlndHJpYW5nbGVkb3duO1wiOlwi4pa9XCIsXCImYmlndHJpYW5nbGV1cDtcIjpcIuKWs1wiLFwiJmJpZ3VwbHVzO1wiOlwi4qiEXCIsXCImYmlndmVlO1wiOlwi4ouBXCIsXCImYmlnd2VkZ2U7XCI6XCLii4BcIixcIiZia2Fyb3c7XCI6XCLipI1cIixcIiZibGFja2xvemVuZ2U7XCI6XCLip6tcIixcIiZibGFja3NxdWFyZTtcIjpcIuKWqlwiLFwiJmJsYWNrdHJpYW5nbGU7XCI6XCLilrRcIixcIiZibGFja3RyaWFuZ2xlZG93bjtcIjpcIuKWvlwiLFwiJmJsYWNrdHJpYW5nbGVsZWZ0O1wiOlwi4peCXCIsXCImYmxhY2t0cmlhbmdsZXJpZ2h0O1wiOlwi4pa4XCIsXCImYmxhbms7XCI6XCLikKNcIixcIiZibGsxMjtcIjpcIuKWklwiLFwiJmJsazE0O1wiOlwi4paRXCIsXCImYmxrMzQ7XCI6XCLilpNcIixcIiZibG9jaztcIjpcIuKWiFwiLFwiJmJuZTtcIjpcIj3ig6VcIixcIiZibmVxdWl2O1wiOlwi4omh4oOlXCIsXCImYm5vdDtcIjpcIuKMkFwiLFwiJmJvcGY7XCI6XCLwnZWTXCIsXCImYm90O1wiOlwi4oqlXCIsXCImYm90dG9tO1wiOlwi4oqlXCIsXCImYm93dGllO1wiOlwi4ouIXCIsXCImYm94REw7XCI6XCLilZdcIixcIiZib3hEUjtcIjpcIuKVlFwiLFwiJmJveERsO1wiOlwi4pWWXCIsXCImYm94RHI7XCI6XCLilZNcIixcIiZib3hIO1wiOlwi4pWQXCIsXCImYm94SEQ7XCI6XCLilaZcIixcIiZib3hIVTtcIjpcIuKVqVwiLFwiJmJveEhkO1wiOlwi4pWkXCIsXCImYm94SHU7XCI6XCLiladcIixcIiZib3hVTDtcIjpcIuKVnVwiLFwiJmJveFVSO1wiOlwi4pWaXCIsXCImYm94VWw7XCI6XCLilZxcIixcIiZib3hVcjtcIjpcIuKVmVwiLFwiJmJveFY7XCI6XCLilZFcIixcIiZib3hWSDtcIjpcIuKVrFwiLFwiJmJveFZMO1wiOlwi4pWjXCIsXCImYm94VlI7XCI6XCLilaBcIixcIiZib3hWaDtcIjpcIuKVq1wiLFwiJmJveFZsO1wiOlwi4pWiXCIsXCImYm94VnI7XCI6XCLilZ9cIixcIiZib3hib3g7XCI6XCLip4lcIixcIiZib3hkTDtcIjpcIuKVlVwiLFwiJmJveGRSO1wiOlwi4pWSXCIsXCImYm94ZGw7XCI6XCLilJBcIixcIiZib3hkcjtcIjpcIuKUjFwiLFwiJmJveGg7XCI6XCLilIBcIixcIiZib3hoRDtcIjpcIuKVpVwiLFwiJmJveGhVO1wiOlwi4pWoXCIsXCImYm94aGQ7XCI6XCLilKxcIixcIiZib3hodTtcIjpcIuKUtFwiLFwiJmJveG1pbnVzO1wiOlwi4oqfXCIsXCImYm94cGx1cztcIjpcIuKKnlwiLFwiJmJveHRpbWVzO1wiOlwi4oqgXCIsXCImYm94dUw7XCI6XCLilZtcIixcIiZib3h1UjtcIjpcIuKVmFwiLFwiJmJveHVsO1wiOlwi4pSYXCIsXCImYm94dXI7XCI6XCLilJRcIixcIiZib3h2O1wiOlwi4pSCXCIsXCImYm94dkg7XCI6XCLilapcIixcIiZib3h2TDtcIjpcIuKVoVwiLFwiJmJveHZSO1wiOlwi4pWeXCIsXCImYm94dmg7XCI6XCLilLxcIixcIiZib3h2bDtcIjpcIuKUpFwiLFwiJmJveHZyO1wiOlwi4pScXCIsXCImYnByaW1lO1wiOlwi4oC1XCIsXCImYnJldmU7XCI6XCLLmFwiLFwiJmJydmJhclwiOlwiwqZcIixcIiZicnZiYXI7XCI6XCLCplwiLFwiJmJzY3I7XCI6XCLwnZK3XCIsXCImYnNlbWk7XCI6XCLigY9cIixcIiZic2ltO1wiOlwi4oi9XCIsXCImYnNpbWU7XCI6XCLii41cIixcIiZic29sO1wiOlwiXFxcXFwiLFwiJmJzb2xiO1wiOlwi4qeFXCIsXCImYnNvbGhzdWI7XCI6XCLin4hcIixcIiZidWxsO1wiOlwi4oCiXCIsXCImYnVsbGV0O1wiOlwi4oCiXCIsXCImYnVtcDtcIjpcIuKJjlwiLFwiJmJ1bXBFO1wiOlwi4qquXCIsXCImYnVtcGU7XCI6XCLiiY9cIixcIiZidW1wZXE7XCI6XCLiiY9cIixcIiZjYWN1dGU7XCI6XCLEh1wiLFwiJmNhcDtcIjpcIuKIqVwiLFwiJmNhcGFuZDtcIjpcIuKphFwiLFwiJmNhcGJyY3VwO1wiOlwi4qmJXCIsXCImY2FwY2FwO1wiOlwi4qmLXCIsXCImY2FwY3VwO1wiOlwi4qmHXCIsXCImY2FwZG90O1wiOlwi4qmAXCIsXCImY2FwcztcIjpcIuKIqe+4gFwiLFwiJmNhcmV0O1wiOlwi4oGBXCIsXCImY2Fyb247XCI6XCLLh1wiLFwiJmNjYXBzO1wiOlwi4qmNXCIsXCImY2Nhcm9uO1wiOlwixI1cIixcIiZjY2VkaWxcIjpcIsOnXCIsXCImY2NlZGlsO1wiOlwiw6dcIixcIiZjY2lyYztcIjpcIsSJXCIsXCImY2N1cHM7XCI6XCLiqYxcIixcIiZjY3Vwc3NtO1wiOlwi4qmQXCIsXCImY2RvdDtcIjpcIsSLXCIsXCImY2VkaWxcIjpcIsK4XCIsXCImY2VkaWw7XCI6XCLCuFwiLFwiJmNlbXB0eXY7XCI6XCLiprJcIixcIiZjZW50XCI6XCLColwiLFwiJmNlbnQ7XCI6XCLColwiLFwiJmNlbnRlcmRvdDtcIjpcIsK3XCIsXCImY2ZyO1wiOlwi8J2UoFwiLFwiJmNoY3k7XCI6XCLRh1wiLFwiJmNoZWNrO1wiOlwi4pyTXCIsXCImY2hlY2ttYXJrO1wiOlwi4pyTXCIsXCImY2hpO1wiOlwiz4dcIixcIiZjaXI7XCI6XCLil4tcIixcIiZjaXJFO1wiOlwi4qeDXCIsXCImY2lyYztcIjpcIsuGXCIsXCImY2lyY2VxO1wiOlwi4omXXCIsXCImY2lyY2xlYXJyb3dsZWZ0O1wiOlwi4oa6XCIsXCImY2lyY2xlYXJyb3dyaWdodDtcIjpcIuKGu1wiLFwiJmNpcmNsZWRSO1wiOlwiwq5cIixcIiZjaXJjbGVkUztcIjpcIuKTiFwiLFwiJmNpcmNsZWRhc3Q7XCI6XCLiiptcIixcIiZjaXJjbGVkY2lyYztcIjpcIuKKmlwiLFwiJmNpcmNsZWRkYXNoO1wiOlwi4oqdXCIsXCImY2lyZTtcIjpcIuKJl1wiLFwiJmNpcmZuaW50O1wiOlwi4qiQXCIsXCImY2lybWlkO1wiOlwi4quvXCIsXCImY2lyc2NpcjtcIjpcIuKnglwiLFwiJmNsdWJzO1wiOlwi4pmjXCIsXCImY2x1YnN1aXQ7XCI6XCLimaNcIixcIiZjb2xvbjtcIjpcIjpcIixcIiZjb2xvbmU7XCI6XCLiiZRcIixcIiZjb2xvbmVxO1wiOlwi4omUXCIsXCImY29tbWE7XCI6XCIsXCIsXCImY29tbWF0O1wiOlwiQFwiLFwiJmNvbXA7XCI6XCLiiIFcIixcIiZjb21wZm47XCI6XCLiiJhcIixcIiZjb21wbGVtZW50O1wiOlwi4oiBXCIsXCImY29tcGxleGVzO1wiOlwi4oSCXCIsXCImY29uZztcIjpcIuKJhVwiLFwiJmNvbmdkb3Q7XCI6XCLiqa1cIixcIiZjb25pbnQ7XCI6XCLiiK5cIixcIiZjb3BmO1wiOlwi8J2VlFwiLFwiJmNvcHJvZDtcIjpcIuKIkFwiLFwiJmNvcHlcIjpcIsKpXCIsXCImY29weTtcIjpcIsKpXCIsXCImY29weXNyO1wiOlwi4oSXXCIsXCImY3JhcnI7XCI6XCLihrVcIixcIiZjcm9zcztcIjpcIuKcl1wiLFwiJmNzY3I7XCI6XCLwnZK4XCIsXCImY3N1YjtcIjpcIuKrj1wiLFwiJmNzdWJlO1wiOlwi4quRXCIsXCImY3N1cDtcIjpcIuKrkFwiLFwiJmNzdXBlO1wiOlwi4quSXCIsXCImY3Rkb3Q7XCI6XCLii69cIixcIiZjdWRhcnJsO1wiOlwi4qS4XCIsXCImY3VkYXJycjtcIjpcIuKktVwiLFwiJmN1ZXByO1wiOlwi4oueXCIsXCImY3Vlc2M7XCI6XCLii59cIixcIiZjdWxhcnI7XCI6XCLihrZcIixcIiZjdWxhcnJwO1wiOlwi4qS9XCIsXCImY3VwO1wiOlwi4oiqXCIsXCImY3VwYnJjYXA7XCI6XCLiqYhcIixcIiZjdXBjYXA7XCI6XCLiqYZcIixcIiZjdXBjdXA7XCI6XCLiqYpcIixcIiZjdXBkb3Q7XCI6XCLiio1cIixcIiZjdXBvcjtcIjpcIuKphVwiLFwiJmN1cHM7XCI6XCLiiKrvuIBcIixcIiZjdXJhcnI7XCI6XCLihrdcIixcIiZjdXJhcnJtO1wiOlwi4qS8XCIsXCImY3VybHllcXByZWM7XCI6XCLii55cIixcIiZjdXJseWVxc3VjYztcIjpcIuKLn1wiLFwiJmN1cmx5dmVlO1wiOlwi4ouOXCIsXCImY3VybHl3ZWRnZTtcIjpcIuKLj1wiLFwiJmN1cnJlblwiOlwiwqRcIixcIiZjdXJyZW47XCI6XCLCpFwiLFwiJmN1cnZlYXJyb3dsZWZ0O1wiOlwi4oa2XCIsXCImY3VydmVhcnJvd3JpZ2h0O1wiOlwi4oa3XCIsXCImY3V2ZWU7XCI6XCLii45cIixcIiZjdXdlZDtcIjpcIuKLj1wiLFwiJmN3Y29uaW50O1wiOlwi4oiyXCIsXCImY3dpbnQ7XCI6XCLiiLFcIixcIiZjeWxjdHk7XCI6XCLijK1cIixcIiZkQXJyO1wiOlwi4oeTXCIsXCImZEhhcjtcIjpcIuKlpVwiLFwiJmRhZ2dlcjtcIjpcIuKAoFwiLFwiJmRhbGV0aDtcIjpcIuKEuFwiLFwiJmRhcnI7XCI6XCLihpNcIixcIiZkYXNoO1wiOlwi4oCQXCIsXCImZGFzaHY7XCI6XCLiiqNcIixcIiZkYmthcm93O1wiOlwi4qSPXCIsXCImZGJsYWM7XCI6XCLLnVwiLFwiJmRjYXJvbjtcIjpcIsSPXCIsXCImZGN5O1wiOlwi0LRcIixcIiZkZDtcIjpcIuKFhlwiLFwiJmRkYWdnZXI7XCI6XCLigKFcIixcIiZkZGFycjtcIjpcIuKHilwiLFwiJmRkb3RzZXE7XCI6XCLiqbdcIixcIiZkZWdcIjpcIsKwXCIsXCImZGVnO1wiOlwiwrBcIixcIiZkZWx0YTtcIjpcIs60XCIsXCImZGVtcHR5djtcIjpcIuKmsVwiLFwiJmRmaXNodDtcIjpcIuKlv1wiLFwiJmRmcjtcIjpcIvCdlKFcIixcIiZkaGFybDtcIjpcIuKHg1wiLFwiJmRoYXJyO1wiOlwi4oeCXCIsXCImZGlhbTtcIjpcIuKLhFwiLFwiJmRpYW1vbmQ7XCI6XCLii4RcIixcIiZkaWFtb25kc3VpdDtcIjpcIuKZplwiLFwiJmRpYW1zO1wiOlwi4pmmXCIsXCImZGllO1wiOlwiwqhcIixcIiZkaWdhbW1hO1wiOlwiz51cIixcIiZkaXNpbjtcIjpcIuKLslwiLFwiJmRpdjtcIjpcIsO3XCIsXCImZGl2aWRlXCI6XCLDt1wiLFwiJmRpdmlkZTtcIjpcIsO3XCIsXCImZGl2aWRlb250aW1lcztcIjpcIuKLh1wiLFwiJmRpdm9ueDtcIjpcIuKLh1wiLFwiJmRqY3k7XCI6XCLRklwiLFwiJmRsY29ybjtcIjpcIuKMnlwiLFwiJmRsY3JvcDtcIjpcIuKMjVwiLFwiJmRvbGxhcjtcIjpcIiRcIixcIiZkb3BmO1wiOlwi8J2VlVwiLFwiJmRvdDtcIjpcIsuZXCIsXCImZG90ZXE7XCI6XCLiiZBcIixcIiZkb3RlcWRvdDtcIjpcIuKJkVwiLFwiJmRvdG1pbnVzO1wiOlwi4oi4XCIsXCImZG90cGx1cztcIjpcIuKIlFwiLFwiJmRvdHNxdWFyZTtcIjpcIuKKoVwiLFwiJmRvdWJsZWJhcndlZGdlO1wiOlwi4oyGXCIsXCImZG93bmFycm93O1wiOlwi4oaTXCIsXCImZG93bmRvd25hcnJvd3M7XCI6XCLih4pcIixcIiZkb3duaGFycG9vbmxlZnQ7XCI6XCLih4NcIixcIiZkb3duaGFycG9vbnJpZ2h0O1wiOlwi4oeCXCIsXCImZHJia2Fyb3c7XCI6XCLipJBcIixcIiZkcmNvcm47XCI6XCLijJ9cIixcIiZkcmNyb3A7XCI6XCLijIxcIixcIiZkc2NyO1wiOlwi8J2SuVwiLFwiJmRzY3k7XCI6XCLRlVwiLFwiJmRzb2w7XCI6XCLip7ZcIixcIiZkc3Ryb2s7XCI6XCLEkVwiLFwiJmR0ZG90O1wiOlwi4ouxXCIsXCImZHRyaTtcIjpcIuKWv1wiLFwiJmR0cmlmO1wiOlwi4pa+XCIsXCImZHVhcnI7XCI6XCLih7VcIixcIiZkdWhhcjtcIjpcIuKlr1wiLFwiJmR3YW5nbGU7XCI6XCLipqZcIixcIiZkemN5O1wiOlwi0Z9cIixcIiZkemlncmFycjtcIjpcIuKfv1wiLFwiJmVERG90O1wiOlwi4qm3XCIsXCImZURvdDtcIjpcIuKJkVwiLFwiJmVhY3V0ZVwiOlwiw6lcIixcIiZlYWN1dGU7XCI6XCLDqVwiLFwiJmVhc3RlcjtcIjpcIuKprlwiLFwiJmVjYXJvbjtcIjpcIsSbXCIsXCImZWNpcjtcIjpcIuKJllwiLFwiJmVjaXJjXCI6XCLDqlwiLFwiJmVjaXJjO1wiOlwiw6pcIixcIiZlY29sb247XCI6XCLiiZVcIixcIiZlY3k7XCI6XCLRjVwiLFwiJmVkb3Q7XCI6XCLEl1wiLFwiJmVlO1wiOlwi4oWHXCIsXCImZWZEb3Q7XCI6XCLiiZJcIixcIiZlZnI7XCI6XCLwnZSiXCIsXCImZWc7XCI6XCLiqppcIixcIiZlZ3JhdmVcIjpcIsOoXCIsXCImZWdyYXZlO1wiOlwiw6hcIixcIiZlZ3M7XCI6XCLiqpZcIixcIiZlZ3Nkb3Q7XCI6XCLiqphcIixcIiZlbDtcIjpcIuKqmVwiLFwiJmVsaW50ZXJzO1wiOlwi4o+nXCIsXCImZWxsO1wiOlwi4oSTXCIsXCImZWxzO1wiOlwi4qqVXCIsXCImZWxzZG90O1wiOlwi4qqXXCIsXCImZW1hY3I7XCI6XCLEk1wiLFwiJmVtcHR5O1wiOlwi4oiFXCIsXCImZW1wdHlzZXQ7XCI6XCLiiIVcIixcIiZlbXB0eXY7XCI6XCLiiIVcIixcIiZlbXNwMTM7XCI6XCLigIRcIixcIiZlbXNwMTQ7XCI6XCLigIVcIixcIiZlbXNwO1wiOlwi4oCDXCIsXCImZW5nO1wiOlwixYtcIixcIiZlbnNwO1wiOlwi4oCCXCIsXCImZW9nb247XCI6XCLEmVwiLFwiJmVvcGY7XCI6XCLwnZWWXCIsXCImZXBhcjtcIjpcIuKLlVwiLFwiJmVwYXJzbDtcIjpcIuKno1wiLFwiJmVwbHVzO1wiOlwi4qmxXCIsXCImZXBzaTtcIjpcIs61XCIsXCImZXBzaWxvbjtcIjpcIs61XCIsXCImZXBzaXY7XCI6XCLPtVwiLFwiJmVxY2lyYztcIjpcIuKJllwiLFwiJmVxY29sb247XCI6XCLiiZVcIixcIiZlcXNpbTtcIjpcIuKJglwiLFwiJmVxc2xhbnRndHI7XCI6XCLiqpZcIixcIiZlcXNsYW50bGVzcztcIjpcIuKqlVwiLFwiJmVxdWFscztcIjpcIj1cIixcIiZlcXVlc3Q7XCI6XCLiiZ9cIixcIiZlcXVpdjtcIjpcIuKJoVwiLFwiJmVxdWl2REQ7XCI6XCLiqbhcIixcIiZlcXZwYXJzbDtcIjpcIuKnpVwiLFwiJmVyRG90O1wiOlwi4omTXCIsXCImZXJhcnI7XCI6XCLipbFcIixcIiZlc2NyO1wiOlwi4oSvXCIsXCImZXNkb3Q7XCI6XCLiiZBcIixcIiZlc2ltO1wiOlwi4omCXCIsXCImZXRhO1wiOlwizrdcIixcIiZldGhcIjpcIsOwXCIsXCImZXRoO1wiOlwiw7BcIixcIiZldW1sXCI6XCLDq1wiLFwiJmV1bWw7XCI6XCLDq1wiLFwiJmV1cm87XCI6XCLigqxcIixcIiZleGNsO1wiOlwiIVwiLFwiJmV4aXN0O1wiOlwi4oiDXCIsXCImZXhwZWN0YXRpb247XCI6XCLihLBcIixcIiZleHBvbmVudGlhbGU7XCI6XCLihYdcIixcIiZmYWxsaW5nZG90c2VxO1wiOlwi4omSXCIsXCImZmN5O1wiOlwi0YRcIixcIiZmZW1hbGU7XCI6XCLimYBcIixcIiZmZmlsaWc7XCI6XCLvrINcIixcIiZmZmxpZztcIjpcIu+sgFwiLFwiJmZmbGxpZztcIjpcIu+shFwiLFwiJmZmcjtcIjpcIvCdlKNcIixcIiZmaWxpZztcIjpcIu+sgVwiLFwiJmZqbGlnO1wiOlwiZmpcIixcIiZmbGF0O1wiOlwi4pmtXCIsXCImZmxsaWc7XCI6XCLvrIJcIixcIiZmbHRucztcIjpcIuKWsVwiLFwiJmZub2Y7XCI6XCLGklwiLFwiJmZvcGY7XCI6XCLwnZWXXCIsXCImZm9yYWxsO1wiOlwi4oiAXCIsXCImZm9yaztcIjpcIuKLlFwiLFwiJmZvcmt2O1wiOlwi4quZXCIsXCImZnBhcnRpbnQ7XCI6XCLiqI1cIixcIiZmcmFjMTJcIjpcIsK9XCIsXCImZnJhYzEyO1wiOlwiwr1cIixcIiZmcmFjMTM7XCI6XCLihZNcIixcIiZmcmFjMTRcIjpcIsK8XCIsXCImZnJhYzE0O1wiOlwiwrxcIixcIiZmcmFjMTU7XCI6XCLihZVcIixcIiZmcmFjMTY7XCI6XCLihZlcIixcIiZmcmFjMTg7XCI6XCLihZtcIixcIiZmcmFjMjM7XCI6XCLihZRcIixcIiZmcmFjMjU7XCI6XCLihZZcIixcIiZmcmFjMzRcIjpcIsK+XCIsXCImZnJhYzM0O1wiOlwiwr5cIixcIiZmcmFjMzU7XCI6XCLihZdcIixcIiZmcmFjMzg7XCI6XCLihZxcIixcIiZmcmFjNDU7XCI6XCLihZhcIixcIiZmcmFjNTY7XCI6XCLihZpcIixcIiZmcmFjNTg7XCI6XCLihZ1cIixcIiZmcmFjNzg7XCI6XCLihZ5cIixcIiZmcmFzbDtcIjpcIuKBhFwiLFwiJmZyb3duO1wiOlwi4oyiXCIsXCImZnNjcjtcIjpcIvCdkrtcIixcIiZnRTtcIjpcIuKJp1wiLFwiJmdFbDtcIjpcIuKqjFwiLFwiJmdhY3V0ZTtcIjpcIse1XCIsXCImZ2FtbWE7XCI6XCLOs1wiLFwiJmdhbW1hZDtcIjpcIs+dXCIsXCImZ2FwO1wiOlwi4qqGXCIsXCImZ2JyZXZlO1wiOlwixJ9cIixcIiZnY2lyYztcIjpcIsSdXCIsXCImZ2N5O1wiOlwi0LNcIixcIiZnZG90O1wiOlwixKFcIixcIiZnZTtcIjpcIuKJpVwiLFwiJmdlbDtcIjpcIuKLm1wiLFwiJmdlcTtcIjpcIuKJpVwiLFwiJmdlcXE7XCI6XCLiiadcIixcIiZnZXFzbGFudDtcIjpcIuKpvlwiLFwiJmdlcztcIjpcIuKpvlwiLFwiJmdlc2NjO1wiOlwi4qqpXCIsXCImZ2VzZG90O1wiOlwi4qqAXCIsXCImZ2VzZG90bztcIjpcIuKqglwiLFwiJmdlc2RvdG9sO1wiOlwi4qqEXCIsXCImZ2VzbDtcIjpcIuKLm++4gFwiLFwiJmdlc2xlcztcIjpcIuKqlFwiLFwiJmdmcjtcIjpcIvCdlKRcIixcIiZnZztcIjpcIuKJq1wiLFwiJmdnZztcIjpcIuKLmVwiLFwiJmdpbWVsO1wiOlwi4oS3XCIsXCImZ2pjeTtcIjpcItGTXCIsXCImZ2w7XCI6XCLiibdcIixcIiZnbEU7XCI6XCLiqpJcIixcIiZnbGE7XCI6XCLiqqVcIixcIiZnbGo7XCI6XCLiqqRcIixcIiZnbkU7XCI6XCLiialcIixcIiZnbmFwO1wiOlwi4qqKXCIsXCImZ25hcHByb3g7XCI6XCLiqopcIixcIiZnbmU7XCI6XCLiqohcIixcIiZnbmVxO1wiOlwi4qqIXCIsXCImZ25lcXE7XCI6XCLiialcIixcIiZnbnNpbTtcIjpcIuKLp1wiLFwiJmdvcGY7XCI6XCLwnZWYXCIsXCImZ3JhdmU7XCI6XCJgXCIsXCImZ3NjcjtcIjpcIuKEilwiLFwiJmdzaW07XCI6XCLiibNcIixcIiZnc2ltZTtcIjpcIuKqjlwiLFwiJmdzaW1sO1wiOlwi4qqQXCIsXCImZ3RcIjpcIj5cIixcIiZndDtcIjpcIj5cIixcIiZndGNjO1wiOlwi4qqnXCIsXCImZ3RjaXI7XCI6XCLiqbpcIixcIiZndGRvdDtcIjpcIuKLl1wiLFwiJmd0bFBhcjtcIjpcIuKmlVwiLFwiJmd0cXVlc3Q7XCI6XCLiqbxcIixcIiZndHJhcHByb3g7XCI6XCLiqoZcIixcIiZndHJhcnI7XCI6XCLipbhcIixcIiZndHJkb3Q7XCI6XCLii5dcIixcIiZndHJlcWxlc3M7XCI6XCLii5tcIixcIiZndHJlcXFsZXNzO1wiOlwi4qqMXCIsXCImZ3RybGVzcztcIjpcIuKJt1wiLFwiJmd0cnNpbTtcIjpcIuKJs1wiLFwiJmd2ZXJ0bmVxcTtcIjpcIuKJqe+4gFwiLFwiJmd2bkU7XCI6XCLiianvuIBcIixcIiZoQXJyO1wiOlwi4oeUXCIsXCImaGFpcnNwO1wiOlwi4oCKXCIsXCImaGFsZjtcIjpcIsK9XCIsXCImaGFtaWx0O1wiOlwi4oSLXCIsXCImaGFyZGN5O1wiOlwi0YpcIixcIiZoYXJyO1wiOlwi4oaUXCIsXCImaGFycmNpcjtcIjpcIuKliFwiLFwiJmhhcnJ3O1wiOlwi4oatXCIsXCImaGJhcjtcIjpcIuKEj1wiLFwiJmhjaXJjO1wiOlwixKVcIixcIiZoZWFydHM7XCI6XCLimaVcIixcIiZoZWFydHN1aXQ7XCI6XCLimaVcIixcIiZoZWxsaXA7XCI6XCLigKZcIixcIiZoZXJjb247XCI6XCLiirlcIixcIiZoZnI7XCI6XCLwnZSlXCIsXCImaGtzZWFyb3c7XCI6XCLipKVcIixcIiZoa3N3YXJvdztcIjpcIuKkplwiLFwiJmhvYXJyO1wiOlwi4oe/XCIsXCImaG9tdGh0O1wiOlwi4oi7XCIsXCImaG9va2xlZnRhcnJvdztcIjpcIuKGqVwiLFwiJmhvb2tyaWdodGFycm93O1wiOlwi4oaqXCIsXCImaG9wZjtcIjpcIvCdlZlcIixcIiZob3JiYXI7XCI6XCLigJVcIixcIiZoc2NyO1wiOlwi8J2SvVwiLFwiJmhzbGFzaDtcIjpcIuKEj1wiLFwiJmhzdHJvaztcIjpcIsSnXCIsXCImaHlidWxsO1wiOlwi4oGDXCIsXCImaHlwaGVuO1wiOlwi4oCQXCIsXCImaWFjdXRlXCI6XCLDrVwiLFwiJmlhY3V0ZTtcIjpcIsOtXCIsXCImaWM7XCI6XCLigaNcIixcIiZpY2lyY1wiOlwiw65cIixcIiZpY2lyYztcIjpcIsOuXCIsXCImaWN5O1wiOlwi0LhcIixcIiZpZWN5O1wiOlwi0LVcIixcIiZpZXhjbFwiOlwiwqFcIixcIiZpZXhjbDtcIjpcIsKhXCIsXCImaWZmO1wiOlwi4oeUXCIsXCImaWZyO1wiOlwi8J2UplwiLFwiJmlncmF2ZVwiOlwiw6xcIixcIiZpZ3JhdmU7XCI6XCLDrFwiLFwiJmlpO1wiOlwi4oWIXCIsXCImaWlpaW50O1wiOlwi4qiMXCIsXCImaWlpbnQ7XCI6XCLiiK1cIixcIiZpaW5maW47XCI6XCLip5xcIixcIiZpaW90YTtcIjpcIuKEqVwiLFwiJmlqbGlnO1wiOlwixLNcIixcIiZpbWFjcjtcIjpcIsSrXCIsXCImaW1hZ2U7XCI6XCLihJFcIixcIiZpbWFnbGluZTtcIjpcIuKEkFwiLFwiJmltYWdwYXJ0O1wiOlwi4oSRXCIsXCImaW1hdGg7XCI6XCLEsVwiLFwiJmltb2Y7XCI6XCLiirdcIixcIiZpbXBlZDtcIjpcIsa1XCIsXCImaW47XCI6XCLiiIhcIixcIiZpbmNhcmU7XCI6XCLihIVcIixcIiZpbmZpbjtcIjpcIuKInlwiLFwiJmluZmludGllO1wiOlwi4qedXCIsXCImaW5vZG90O1wiOlwixLFcIixcIiZpbnQ7XCI6XCLiiKtcIixcIiZpbnRjYWw7XCI6XCLiirpcIixcIiZpbnRlZ2VycztcIjpcIuKEpFwiLFwiJmludGVyY2FsO1wiOlwi4oq6XCIsXCImaW50bGFyaGs7XCI6XCLiqJdcIixcIiZpbnRwcm9kO1wiOlwi4qi8XCIsXCImaW9jeTtcIjpcItGRXCIsXCImaW9nb247XCI6XCLEr1wiLFwiJmlvcGY7XCI6XCLwnZWaXCIsXCImaW90YTtcIjpcIs65XCIsXCImaXByb2Q7XCI6XCLiqLxcIixcIiZpcXVlc3RcIjpcIsK/XCIsXCImaXF1ZXN0O1wiOlwiwr9cIixcIiZpc2NyO1wiOlwi8J2SvlwiLFwiJmlzaW47XCI6XCLiiIhcIixcIiZpc2luRTtcIjpcIuKLuVwiLFwiJmlzaW5kb3Q7XCI6XCLii7VcIixcIiZpc2lucztcIjpcIuKLtFwiLFwiJmlzaW5zdjtcIjpcIuKLs1wiLFwiJmlzaW52O1wiOlwi4oiIXCIsXCImaXQ7XCI6XCLigaJcIixcIiZpdGlsZGU7XCI6XCLEqVwiLFwiJml1a2N5O1wiOlwi0ZZcIixcIiZpdW1sXCI6XCLDr1wiLFwiJml1bWw7XCI6XCLDr1wiLFwiJmpjaXJjO1wiOlwixLVcIixcIiZqY3k7XCI6XCLQuVwiLFwiJmpmcjtcIjpcIvCdlKdcIixcIiZqbWF0aDtcIjpcIsi3XCIsXCImam9wZjtcIjpcIvCdlZtcIixcIiZqc2NyO1wiOlwi8J2Sv1wiLFwiJmpzZXJjeTtcIjpcItGYXCIsXCImanVrY3k7XCI6XCLRlFwiLFwiJmthcHBhO1wiOlwizrpcIixcIiZrYXBwYXY7XCI6XCLPsFwiLFwiJmtjZWRpbDtcIjpcIsS3XCIsXCIma2N5O1wiOlwi0LpcIixcIiZrZnI7XCI6XCLwnZSoXCIsXCIma2dyZWVuO1wiOlwixLhcIixcIiZraGN5O1wiOlwi0YVcIixcIiZramN5O1wiOlwi0ZxcIixcIiZrb3BmO1wiOlwi8J2VnFwiLFwiJmtzY3I7XCI6XCLwnZOAXCIsXCImbEFhcnI7XCI6XCLih5pcIixcIiZsQXJyO1wiOlwi4oeQXCIsXCImbEF0YWlsO1wiOlwi4qSbXCIsXCImbEJhcnI7XCI6XCLipI5cIixcIiZsRTtcIjpcIuKJplwiLFwiJmxFZztcIjpcIuKqi1wiLFwiJmxIYXI7XCI6XCLipaJcIixcIiZsYWN1dGU7XCI6XCLEulwiLFwiJmxhZW1wdHl2O1wiOlwi4qa0XCIsXCImbGFncmFuO1wiOlwi4oSSXCIsXCImbGFtYmRhO1wiOlwizrtcIixcIiZsYW5nO1wiOlwi4p+oXCIsXCImbGFuZ2Q7XCI6XCLippFcIixcIiZsYW5nbGU7XCI6XCLin6hcIixcIiZsYXA7XCI6XCLiqoVcIixcIiZsYXF1b1wiOlwiwqtcIixcIiZsYXF1bztcIjpcIsKrXCIsXCImbGFycjtcIjpcIuKGkFwiLFwiJmxhcnJiO1wiOlwi4oekXCIsXCImbGFycmJmcztcIjpcIuKkn1wiLFwiJmxhcnJmcztcIjpcIuKknVwiLFwiJmxhcnJoaztcIjpcIuKGqVwiLFwiJmxhcnJscDtcIjpcIuKGq1wiLFwiJmxhcnJwbDtcIjpcIuKkuVwiLFwiJmxhcnJzaW07XCI6XCLipbNcIixcIiZsYXJydGw7XCI6XCLihqJcIixcIiZsYXQ7XCI6XCLiqqtcIixcIiZsYXRhaWw7XCI6XCLipJlcIixcIiZsYXRlO1wiOlwi4qqtXCIsXCImbGF0ZXM7XCI6XCLiqq3vuIBcIixcIiZsYmFycjtcIjpcIuKkjFwiLFwiJmxiYnJrO1wiOlwi4p2yXCIsXCImbGJyYWNlO1wiOlwie1wiLFwiJmxicmFjaztcIjpcIltcIixcIiZsYnJrZTtcIjpcIuKmi1wiLFwiJmxicmtzbGQ7XCI6XCLipo9cIixcIiZsYnJrc2x1O1wiOlwi4qaNXCIsXCImbGNhcm9uO1wiOlwixL5cIixcIiZsY2VkaWw7XCI6XCLEvFwiLFwiJmxjZWlsO1wiOlwi4oyIXCIsXCImbGN1YjtcIjpcIntcIixcIiZsY3k7XCI6XCLQu1wiLFwiJmxkY2E7XCI6XCLipLZcIixcIiZsZHF1bztcIjpcIuKAnFwiLFwiJmxkcXVvcjtcIjpcIuKAnlwiLFwiJmxkcmRoYXI7XCI6XCLipadcIixcIiZsZHJ1c2hhcjtcIjpcIuKli1wiLFwiJmxkc2g7XCI6XCLihrJcIixcIiZsZTtcIjpcIuKJpFwiLFwiJmxlZnRhcnJvdztcIjpcIuKGkFwiLFwiJmxlZnRhcnJvd3RhaWw7XCI6XCLihqJcIixcIiZsZWZ0aGFycG9vbmRvd247XCI6XCLihr1cIixcIiZsZWZ0aGFycG9vbnVwO1wiOlwi4oa8XCIsXCImbGVmdGxlZnRhcnJvd3M7XCI6XCLih4dcIixcIiZsZWZ0cmlnaHRhcnJvdztcIjpcIuKGlFwiLFwiJmxlZnRyaWdodGFycm93cztcIjpcIuKHhlwiLFwiJmxlZnRyaWdodGhhcnBvb25zO1wiOlwi4oeLXCIsXCImbGVmdHJpZ2h0c3F1aWdhcnJvdztcIjpcIuKGrVwiLFwiJmxlZnR0aHJlZXRpbWVzO1wiOlwi4ouLXCIsXCImbGVnO1wiOlwi4ouaXCIsXCImbGVxO1wiOlwi4omkXCIsXCImbGVxcTtcIjpcIuKJplwiLFwiJmxlcXNsYW50O1wiOlwi4qm9XCIsXCImbGVzO1wiOlwi4qm9XCIsXCImbGVzY2M7XCI6XCLiqqhcIixcIiZsZXNkb3Q7XCI6XCLiqb9cIixcIiZsZXNkb3RvO1wiOlwi4qqBXCIsXCImbGVzZG90b3I7XCI6XCLiqoNcIixcIiZsZXNnO1wiOlwi4oua77iAXCIsXCImbGVzZ2VzO1wiOlwi4qqTXCIsXCImbGVzc2FwcHJveDtcIjpcIuKqhVwiLFwiJmxlc3Nkb3Q7XCI6XCLii5ZcIixcIiZsZXNzZXFndHI7XCI6XCLii5pcIixcIiZsZXNzZXFxZ3RyO1wiOlwi4qqLXCIsXCImbGVzc2d0cjtcIjpcIuKJtlwiLFwiJmxlc3NzaW07XCI6XCLiibJcIixcIiZsZmlzaHQ7XCI6XCLipbxcIixcIiZsZmxvb3I7XCI6XCLijIpcIixcIiZsZnI7XCI6XCLwnZSpXCIsXCImbGc7XCI6XCLiibZcIixcIiZsZ0U7XCI6XCLiqpFcIixcIiZsaGFyZDtcIjpcIuKGvVwiLFwiJmxoYXJ1O1wiOlwi4oa8XCIsXCImbGhhcnVsO1wiOlwi4qWqXCIsXCImbGhibGs7XCI6XCLiloRcIixcIiZsamN5O1wiOlwi0ZlcIixcIiZsbDtcIjpcIuKJqlwiLFwiJmxsYXJyO1wiOlwi4oeHXCIsXCImbGxjb3JuZXI7XCI6XCLijJ5cIixcIiZsbGhhcmQ7XCI6XCLipatcIixcIiZsbHRyaTtcIjpcIuKXulwiLFwiJmxtaWRvdDtcIjpcIsWAXCIsXCImbG1vdXN0O1wiOlwi4o6wXCIsXCImbG1vdXN0YWNoZTtcIjpcIuKOsFwiLFwiJmxuRTtcIjpcIuKJqFwiLFwiJmxuYXA7XCI6XCLiqolcIixcIiZsbmFwcHJveDtcIjpcIuKqiVwiLFwiJmxuZTtcIjpcIuKqh1wiLFwiJmxuZXE7XCI6XCLiqodcIixcIiZsbmVxcTtcIjpcIuKJqFwiLFwiJmxuc2ltO1wiOlwi4oumXCIsXCImbG9hbmc7XCI6XCLin6xcIixcIiZsb2FycjtcIjpcIuKHvVwiLFwiJmxvYnJrO1wiOlwi4p+mXCIsXCImbG9uZ2xlZnRhcnJvdztcIjpcIuKftVwiLFwiJmxvbmdsZWZ0cmlnaHRhcnJvdztcIjpcIuKft1wiLFwiJmxvbmdtYXBzdG87XCI6XCLin7xcIixcIiZsb25ncmlnaHRhcnJvdztcIjpcIuKftlwiLFwiJmxvb3BhcnJvd2xlZnQ7XCI6XCLihqtcIixcIiZsb29wYXJyb3dyaWdodDtcIjpcIuKGrFwiLFwiJmxvcGFyO1wiOlwi4qaFXCIsXCImbG9wZjtcIjpcIvCdlZ1cIixcIiZsb3BsdXM7XCI6XCLiqK1cIixcIiZsb3RpbWVzO1wiOlwi4qi0XCIsXCImbG93YXN0O1wiOlwi4oiXXCIsXCImbG93YmFyO1wiOlwiX1wiLFwiJmxvejtcIjpcIuKXilwiLFwiJmxvemVuZ2U7XCI6XCLil4pcIixcIiZsb3pmO1wiOlwi4qerXCIsXCImbHBhcjtcIjpcIihcIixcIiZscGFybHQ7XCI6XCLippNcIixcIiZscmFycjtcIjpcIuKHhlwiLFwiJmxyY29ybmVyO1wiOlwi4oyfXCIsXCImbHJoYXI7XCI6XCLih4tcIixcIiZscmhhcmQ7XCI6XCLipa1cIixcIiZscm07XCI6XCLigI5cIixcIiZscnRyaTtcIjpcIuKKv1wiLFwiJmxzYXF1bztcIjpcIuKAuVwiLFwiJmxzY3I7XCI6XCLwnZOBXCIsXCImbHNoO1wiOlwi4oawXCIsXCImbHNpbTtcIjpcIuKJslwiLFwiJmxzaW1lO1wiOlwi4qqNXCIsXCImbHNpbWc7XCI6XCLiqo9cIixcIiZsc3FiO1wiOlwiW1wiLFwiJmxzcXVvO1wiOlwi4oCYXCIsXCImbHNxdW9yO1wiOlwi4oCaXCIsXCImbHN0cm9rO1wiOlwixYJcIixcIiZsdFwiOlwiPFwiLFwiJmx0O1wiOlwiPFwiLFwiJmx0Y2M7XCI6XCLiqqZcIixcIiZsdGNpcjtcIjpcIuKpuVwiLFwiJmx0ZG90O1wiOlwi4ouWXCIsXCImbHRocmVlO1wiOlwi4ouLXCIsXCImbHRpbWVzO1wiOlwi4ouJXCIsXCImbHRsYXJyO1wiOlwi4qW2XCIsXCImbHRxdWVzdDtcIjpcIuKpu1wiLFwiJmx0clBhcjtcIjpcIuKmllwiLFwiJmx0cmk7XCI6XCLil4NcIixcIiZsdHJpZTtcIjpcIuKKtFwiLFwiJmx0cmlmO1wiOlwi4peCXCIsXCImbHVyZHNoYXI7XCI6XCLipYpcIixcIiZsdXJ1aGFyO1wiOlwi4qWmXCIsXCImbHZlcnRuZXFxO1wiOlwi4omo77iAXCIsXCImbHZuRTtcIjpcIuKJqO+4gFwiLFwiJm1ERG90O1wiOlwi4oi6XCIsXCImbWFjclwiOlwiwq9cIixcIiZtYWNyO1wiOlwiwq9cIixcIiZtYWxlO1wiOlwi4pmCXCIsXCImbWFsdDtcIjpcIuKcoFwiLFwiJm1hbHRlc2U7XCI6XCLinKBcIixcIiZtYXA7XCI6XCLihqZcIixcIiZtYXBzdG87XCI6XCLihqZcIixcIiZtYXBzdG9kb3duO1wiOlwi4oanXCIsXCImbWFwc3RvbGVmdDtcIjpcIuKGpFwiLFwiJm1hcHN0b3VwO1wiOlwi4oalXCIsXCImbWFya2VyO1wiOlwi4pauXCIsXCImbWNvbW1hO1wiOlwi4qipXCIsXCImbWN5O1wiOlwi0LxcIixcIiZtZGFzaDtcIjpcIuKAlFwiLFwiJm1lYXN1cmVkYW5nbGU7XCI6XCLiiKFcIixcIiZtZnI7XCI6XCLwnZSqXCIsXCImbWhvO1wiOlwi4oSnXCIsXCImbWljcm9cIjpcIsK1XCIsXCImbWljcm87XCI6XCLCtVwiLFwiJm1pZDtcIjpcIuKIo1wiLFwiJm1pZGFzdDtcIjpcIipcIixcIiZtaWRjaXI7XCI6XCLiq7BcIixcIiZtaWRkb3RcIjpcIsK3XCIsXCImbWlkZG90O1wiOlwiwrdcIixcIiZtaW51cztcIjpcIuKIklwiLFwiJm1pbnVzYjtcIjpcIuKKn1wiLFwiJm1pbnVzZDtcIjpcIuKIuFwiLFwiJm1pbnVzZHU7XCI6XCLiqKpcIixcIiZtbGNwO1wiOlwi4qubXCIsXCImbWxkcjtcIjpcIuKAplwiLFwiJm1ucGx1cztcIjpcIuKIk1wiLFwiJm1vZGVscztcIjpcIuKKp1wiLFwiJm1vcGY7XCI6XCLwnZWeXCIsXCImbXA7XCI6XCLiiJNcIixcIiZtc2NyO1wiOlwi8J2TglwiLFwiJm1zdHBvcztcIjpcIuKIvlwiLFwiJm11O1wiOlwizrxcIixcIiZtdWx0aW1hcDtcIjpcIuKKuFwiLFwiJm11bWFwO1wiOlwi4oq4XCIsXCImbkdnO1wiOlwi4ouZzLhcIixcIiZuR3Q7XCI6XCLiiavig5JcIixcIiZuR3R2O1wiOlwi4omrzLhcIixcIiZuTGVmdGFycm93O1wiOlwi4oeNXCIsXCImbkxlZnRyaWdodGFycm93O1wiOlwi4oeOXCIsXCImbkxsO1wiOlwi4ouYzLhcIixcIiZuTHQ7XCI6XCLiiarig5JcIixcIiZuTHR2O1wiOlwi4omqzLhcIixcIiZuUmlnaHRhcnJvdztcIjpcIuKHj1wiLFwiJm5WRGFzaDtcIjpcIuKKr1wiLFwiJm5WZGFzaDtcIjpcIuKKrlwiLFwiJm5hYmxhO1wiOlwi4oiHXCIsXCImbmFjdXRlO1wiOlwixYRcIixcIiZuYW5nO1wiOlwi4oig4oOSXCIsXCImbmFwO1wiOlwi4omJXCIsXCImbmFwRTtcIjpcIuKpsMy4XCIsXCImbmFwaWQ7XCI6XCLiiYvMuFwiLFwiJm5hcG9zO1wiOlwixYlcIixcIiZuYXBwcm94O1wiOlwi4omJXCIsXCImbmF0dXI7XCI6XCLima5cIixcIiZuYXR1cmFsO1wiOlwi4pmuXCIsXCImbmF0dXJhbHM7XCI6XCLihJVcIixcIiZuYnNwXCI6XCLCoFwiLFwiJm5ic3A7XCI6XCLCoFwiLFwiJm5idW1wO1wiOlwi4omOzLhcIixcIiZuYnVtcGU7XCI6XCLiiY/MuFwiLFwiJm5jYXA7XCI6XCLiqYNcIixcIiZuY2Fyb247XCI6XCLFiFwiLFwiJm5jZWRpbDtcIjpcIsWGXCIsXCImbmNvbmc7XCI6XCLiiYdcIixcIiZuY29uZ2RvdDtcIjpcIuKprcy4XCIsXCImbmN1cDtcIjpcIuKpglwiLFwiJm5jeTtcIjpcItC9XCIsXCImbmRhc2g7XCI6XCLigJNcIixcIiZuZTtcIjpcIuKJoFwiLFwiJm5lQXJyO1wiOlwi4oeXXCIsXCImbmVhcmhrO1wiOlwi4qSkXCIsXCImbmVhcnI7XCI6XCLihpdcIixcIiZuZWFycm93O1wiOlwi4oaXXCIsXCImbmVkb3Q7XCI6XCLiiZDMuFwiLFwiJm5lcXVpdjtcIjpcIuKJolwiLFwiJm5lc2VhcjtcIjpcIuKkqFwiLFwiJm5lc2ltO1wiOlwi4omCzLhcIixcIiZuZXhpc3Q7XCI6XCLiiIRcIixcIiZuZXhpc3RzO1wiOlwi4oiEXCIsXCImbmZyO1wiOlwi8J2Uq1wiLFwiJm5nRTtcIjpcIuKJp8y4XCIsXCImbmdlO1wiOlwi4omxXCIsXCImbmdlcTtcIjpcIuKJsVwiLFwiJm5nZXFxO1wiOlwi4omnzLhcIixcIiZuZ2Vxc2xhbnQ7XCI6XCLiqb7MuFwiLFwiJm5nZXM7XCI6XCLiqb7MuFwiLFwiJm5nc2ltO1wiOlwi4om1XCIsXCImbmd0O1wiOlwi4omvXCIsXCImbmd0cjtcIjpcIuKJr1wiLFwiJm5oQXJyO1wiOlwi4oeOXCIsXCImbmhhcnI7XCI6XCLihq5cIixcIiZuaHBhcjtcIjpcIuKrslwiLFwiJm5pO1wiOlwi4oiLXCIsXCImbmlzO1wiOlwi4ou8XCIsXCImbmlzZDtcIjpcIuKLulwiLFwiJm5pdjtcIjpcIuKIi1wiLFwiJm5qY3k7XCI6XCLRmlwiLFwiJm5sQXJyO1wiOlwi4oeNXCIsXCImbmxFO1wiOlwi4ommzLhcIixcIiZubGFycjtcIjpcIuKGmlwiLFwiJm5sZHI7XCI6XCLigKVcIixcIiZubGU7XCI6XCLiibBcIixcIiZubGVmdGFycm93O1wiOlwi4oaaXCIsXCImbmxlZnRyaWdodGFycm93O1wiOlwi4oauXCIsXCImbmxlcTtcIjpcIuKJsFwiLFwiJm5sZXFxO1wiOlwi4ommzLhcIixcIiZubGVxc2xhbnQ7XCI6XCLiqb3MuFwiLFwiJm5sZXM7XCI6XCLiqb3MuFwiLFwiJm5sZXNzO1wiOlwi4omuXCIsXCImbmxzaW07XCI6XCLiibRcIixcIiZubHQ7XCI6XCLiia5cIixcIiZubHRyaTtcIjpcIuKLqlwiLFwiJm5sdHJpZTtcIjpcIuKLrFwiLFwiJm5taWQ7XCI6XCLiiKRcIixcIiZub3BmO1wiOlwi8J2Vn1wiLFwiJm5vdFwiOlwiwqxcIixcIiZub3Q7XCI6XCLCrFwiLFwiJm5vdGluO1wiOlwi4oiJXCIsXCImbm90aW5FO1wiOlwi4ou5zLhcIixcIiZub3RpbmRvdDtcIjpcIuKLtcy4XCIsXCImbm90aW52YTtcIjpcIuKIiVwiLFwiJm5vdGludmI7XCI6XCLii7dcIixcIiZub3RpbnZjO1wiOlwi4ou2XCIsXCImbm90bmk7XCI6XCLiiIxcIixcIiZub3RuaXZhO1wiOlwi4oiMXCIsXCImbm90bml2YjtcIjpcIuKLvlwiLFwiJm5vdG5pdmM7XCI6XCLii71cIixcIiZucGFyO1wiOlwi4oimXCIsXCImbnBhcmFsbGVsO1wiOlwi4oimXCIsXCImbnBhcnNsO1wiOlwi4qu94oOlXCIsXCImbnBhcnQ7XCI6XCLiiILMuFwiLFwiJm5wb2xpbnQ7XCI6XCLiqJRcIixcIiZucHI7XCI6XCLiioBcIixcIiZucHJjdWU7XCI6XCLii6BcIixcIiZucHJlO1wiOlwi4qqvzLhcIixcIiZucHJlYztcIjpcIuKKgFwiLFwiJm5wcmVjZXE7XCI6XCLiqq/MuFwiLFwiJm5yQXJyO1wiOlwi4oePXCIsXCImbnJhcnI7XCI6XCLihptcIixcIiZucmFycmM7XCI6XCLipLPMuFwiLFwiJm5yYXJydztcIjpcIuKGncy4XCIsXCImbnJpZ2h0YXJyb3c7XCI6XCLihptcIixcIiZucnRyaTtcIjpcIuKLq1wiLFwiJm5ydHJpZTtcIjpcIuKLrVwiLFwiJm5zYztcIjpcIuKKgVwiLFwiJm5zY2N1ZTtcIjpcIuKLoVwiLFwiJm5zY2U7XCI6XCLiqrDMuFwiLFwiJm5zY3I7XCI6XCLwnZODXCIsXCImbnNob3J0bWlkO1wiOlwi4oikXCIsXCImbnNob3J0cGFyYWxsZWw7XCI6XCLiiKZcIixcIiZuc2ltO1wiOlwi4omBXCIsXCImbnNpbWU7XCI6XCLiiYRcIixcIiZuc2ltZXE7XCI6XCLiiYRcIixcIiZuc21pZDtcIjpcIuKIpFwiLFwiJm5zcGFyO1wiOlwi4oimXCIsXCImbnNxc3ViZTtcIjpcIuKLolwiLFwiJm5zcXN1cGU7XCI6XCLii6NcIixcIiZuc3ViO1wiOlwi4oqEXCIsXCImbnN1YkU7XCI6XCLiq4XMuFwiLFwiJm5zdWJlO1wiOlwi4oqIXCIsXCImbnN1YnNldDtcIjpcIuKKguKDklwiLFwiJm5zdWJzZXRlcTtcIjpcIuKKiFwiLFwiJm5zdWJzZXRlcXE7XCI6XCLiq4XMuFwiLFwiJm5zdWNjO1wiOlwi4oqBXCIsXCImbnN1Y2NlcTtcIjpcIuKqsMy4XCIsXCImbnN1cDtcIjpcIuKKhVwiLFwiJm5zdXBFO1wiOlwi4quGzLhcIixcIiZuc3VwZTtcIjpcIuKKiVwiLFwiJm5zdXBzZXQ7XCI6XCLiioPig5JcIixcIiZuc3Vwc2V0ZXE7XCI6XCLiiolcIixcIiZuc3Vwc2V0ZXFxO1wiOlwi4quGzLhcIixcIiZudGdsO1wiOlwi4om5XCIsXCImbnRpbGRlXCI6XCLDsVwiLFwiJm50aWxkZTtcIjpcIsOxXCIsXCImbnRsZztcIjpcIuKJuFwiLFwiJm50cmlhbmdsZWxlZnQ7XCI6XCLii6pcIixcIiZudHJpYW5nbGVsZWZ0ZXE7XCI6XCLii6xcIixcIiZudHJpYW5nbGVyaWdodDtcIjpcIuKLq1wiLFwiJm50cmlhbmdsZXJpZ2h0ZXE7XCI6XCLii61cIixcIiZudTtcIjpcIs69XCIsXCImbnVtO1wiOlwiI1wiLFwiJm51bWVybztcIjpcIuKEllwiLFwiJm51bXNwO1wiOlwi4oCHXCIsXCImbnZEYXNoO1wiOlwi4oqtXCIsXCImbnZIYXJyO1wiOlwi4qSEXCIsXCImbnZhcDtcIjpcIuKJjeKDklwiLFwiJm52ZGFzaDtcIjpcIuKKrFwiLFwiJm52Z2U7XCI6XCLiiaXig5JcIixcIiZudmd0O1wiOlwiPuKDklwiLFwiJm52aW5maW47XCI6XCLip55cIixcIiZudmxBcnI7XCI6XCLipIJcIixcIiZudmxlO1wiOlwi4omk4oOSXCIsXCImbnZsdDtcIjpcIjzig5JcIixcIiZudmx0cmllO1wiOlwi4oq04oOSXCIsXCImbnZyQXJyO1wiOlwi4qSDXCIsXCImbnZydHJpZTtcIjpcIuKKteKDklwiLFwiJm52c2ltO1wiOlwi4oi84oOSXCIsXCImbndBcnI7XCI6XCLih5ZcIixcIiZud2FyaGs7XCI6XCLipKNcIixcIiZud2FycjtcIjpcIuKGllwiLFwiJm53YXJyb3c7XCI6XCLihpZcIixcIiZud25lYXI7XCI6XCLipKdcIixcIiZvUztcIjpcIuKTiFwiLFwiJm9hY3V0ZVwiOlwiw7NcIixcIiZvYWN1dGU7XCI6XCLDs1wiLFwiJm9hc3Q7XCI6XCLiiptcIixcIiZvY2lyO1wiOlwi4oqaXCIsXCImb2NpcmNcIjpcIsO0XCIsXCImb2NpcmM7XCI6XCLDtFwiLFwiJm9jeTtcIjpcItC+XCIsXCImb2Rhc2g7XCI6XCLiip1cIixcIiZvZGJsYWM7XCI6XCLFkVwiLFwiJm9kaXY7XCI6XCLiqLhcIixcIiZvZG90O1wiOlwi4oqZXCIsXCImb2Rzb2xkO1wiOlwi4qa8XCIsXCImb2VsaWc7XCI6XCLFk1wiLFwiJm9mY2lyO1wiOlwi4qa/XCIsXCImb2ZyO1wiOlwi8J2UrFwiLFwiJm9nb247XCI6XCLLm1wiLFwiJm9ncmF2ZVwiOlwiw7JcIixcIiZvZ3JhdmU7XCI6XCLDslwiLFwiJm9ndDtcIjpcIuKngVwiLFwiJm9oYmFyO1wiOlwi4qa1XCIsXCImb2htO1wiOlwizqlcIixcIiZvaW50O1wiOlwi4oiuXCIsXCImb2xhcnI7XCI6XCLihrpcIixcIiZvbGNpcjtcIjpcIuKmvlwiLFwiJm9sY3Jvc3M7XCI6XCLiprtcIixcIiZvbGluZTtcIjpcIuKAvlwiLFwiJm9sdDtcIjpcIuKngFwiLFwiJm9tYWNyO1wiOlwixY1cIixcIiZvbWVnYTtcIjpcIs+JXCIsXCImb21pY3JvbjtcIjpcIs6/XCIsXCImb21pZDtcIjpcIuKmtlwiLFwiJm9taW51cztcIjpcIuKKllwiLFwiJm9vcGY7XCI6XCLwnZWgXCIsXCImb3BhcjtcIjpcIuKmt1wiLFwiJm9wZXJwO1wiOlwi4qa5XCIsXCImb3BsdXM7XCI6XCLiipVcIixcIiZvcjtcIjpcIuKIqFwiLFwiJm9yYXJyO1wiOlwi4oa7XCIsXCImb3JkO1wiOlwi4qmdXCIsXCImb3JkZXI7XCI6XCLihLRcIixcIiZvcmRlcm9mO1wiOlwi4oS0XCIsXCImb3JkZlwiOlwiwqpcIixcIiZvcmRmO1wiOlwiwqpcIixcIiZvcmRtXCI6XCLCulwiLFwiJm9yZG07XCI6XCLCulwiLFwiJm9yaWdvZjtcIjpcIuKKtlwiLFwiJm9yb3I7XCI6XCLiqZZcIixcIiZvcnNsb3BlO1wiOlwi4qmXXCIsXCImb3J2O1wiOlwi4qmbXCIsXCImb3NjcjtcIjpcIuKEtFwiLFwiJm9zbGFzaFwiOlwiw7hcIixcIiZvc2xhc2g7XCI6XCLDuFwiLFwiJm9zb2w7XCI6XCLiiphcIixcIiZvdGlsZGVcIjpcIsO1XCIsXCImb3RpbGRlO1wiOlwiw7VcIixcIiZvdGltZXM7XCI6XCLiipdcIixcIiZvdGltZXNhcztcIjpcIuKotlwiLFwiJm91bWxcIjpcIsO2XCIsXCImb3VtbDtcIjpcIsO2XCIsXCImb3ZiYXI7XCI6XCLijL1cIixcIiZwYXI7XCI6XCLiiKVcIixcIiZwYXJhXCI6XCLCtlwiLFwiJnBhcmE7XCI6XCLCtlwiLFwiJnBhcmFsbGVsO1wiOlwi4oilXCIsXCImcGFyc2ltO1wiOlwi4quzXCIsXCImcGFyc2w7XCI6XCLiq71cIixcIiZwYXJ0O1wiOlwi4oiCXCIsXCImcGN5O1wiOlwi0L9cIixcIiZwZXJjbnQ7XCI6XCIlXCIsXCImcGVyaW9kO1wiOlwiLlwiLFwiJnBlcm1pbDtcIjpcIuKAsFwiLFwiJnBlcnA7XCI6XCLiiqVcIixcIiZwZXJ0ZW5rO1wiOlwi4oCxXCIsXCImcGZyO1wiOlwi8J2UrVwiLFwiJnBoaTtcIjpcIs+GXCIsXCImcGhpdjtcIjpcIs+VXCIsXCImcGhtbWF0O1wiOlwi4oSzXCIsXCImcGhvbmU7XCI6XCLimI5cIixcIiZwaTtcIjpcIs+AXCIsXCImcGl0Y2hmb3JrO1wiOlwi4ouUXCIsXCImcGl2O1wiOlwiz5ZcIixcIiZwbGFuY2s7XCI6XCLihI9cIixcIiZwbGFuY2toO1wiOlwi4oSOXCIsXCImcGxhbmt2O1wiOlwi4oSPXCIsXCImcGx1cztcIjpcIitcIixcIiZwbHVzYWNpcjtcIjpcIuKoo1wiLFwiJnBsdXNiO1wiOlwi4oqeXCIsXCImcGx1c2NpcjtcIjpcIuKoolwiLFwiJnBsdXNkbztcIjpcIuKIlFwiLFwiJnBsdXNkdTtcIjpcIuKopVwiLFwiJnBsdXNlO1wiOlwi4qmyXCIsXCImcGx1c21uXCI6XCLCsVwiLFwiJnBsdXNtbjtcIjpcIsKxXCIsXCImcGx1c3NpbTtcIjpcIuKoplwiLFwiJnBsdXN0d287XCI6XCLiqKdcIixcIiZwbTtcIjpcIsKxXCIsXCImcG9pbnRpbnQ7XCI6XCLiqJVcIixcIiZwb3BmO1wiOlwi8J2VoVwiLFwiJnBvdW5kXCI6XCLCo1wiLFwiJnBvdW5kO1wiOlwiwqNcIixcIiZwcjtcIjpcIuKJulwiLFwiJnByRTtcIjpcIuKqs1wiLFwiJnByYXA7XCI6XCLiqrdcIixcIiZwcmN1ZTtcIjpcIuKJvFwiLFwiJnByZTtcIjpcIuKqr1wiLFwiJnByZWM7XCI6XCLiibpcIixcIiZwcmVjYXBwcm94O1wiOlwi4qq3XCIsXCImcHJlY2N1cmx5ZXE7XCI6XCLiibxcIixcIiZwcmVjZXE7XCI6XCLiqq9cIixcIiZwcmVjbmFwcHJveDtcIjpcIuKquVwiLFwiJnByZWNuZXFxO1wiOlwi4qq1XCIsXCImcHJlY25zaW07XCI6XCLii6hcIixcIiZwcmVjc2ltO1wiOlwi4om+XCIsXCImcHJpbWU7XCI6XCLigLJcIixcIiZwcmltZXM7XCI6XCLihJlcIixcIiZwcm5FO1wiOlwi4qq1XCIsXCImcHJuYXA7XCI6XCLiqrlcIixcIiZwcm5zaW07XCI6XCLii6hcIixcIiZwcm9kO1wiOlwi4oiPXCIsXCImcHJvZmFsYXI7XCI6XCLijK5cIixcIiZwcm9mbGluZTtcIjpcIuKMklwiLFwiJnByb2ZzdXJmO1wiOlwi4oyTXCIsXCImcHJvcDtcIjpcIuKInVwiLFwiJnByb3B0bztcIjpcIuKInVwiLFwiJnByc2ltO1wiOlwi4om+XCIsXCImcHJ1cmVsO1wiOlwi4oqwXCIsXCImcHNjcjtcIjpcIvCdk4VcIixcIiZwc2k7XCI6XCLPiFwiLFwiJnB1bmNzcDtcIjpcIuKAiFwiLFwiJnFmcjtcIjpcIvCdlK5cIixcIiZxaW50O1wiOlwi4qiMXCIsXCImcW9wZjtcIjpcIvCdlaJcIixcIiZxcHJpbWU7XCI6XCLigZdcIixcIiZxc2NyO1wiOlwi8J2ThlwiLFwiJnF1YXRlcm5pb25zO1wiOlwi4oSNXCIsXCImcXVhdGludDtcIjpcIuKollwiLFwiJnF1ZXN0O1wiOlwiP1wiLFwiJnF1ZXN0ZXE7XCI6XCLiiZ9cIixcIiZxdW90XCI6J1wiJyxcIiZxdW90O1wiOidcIicsXCImckFhcnI7XCI6XCLih5tcIixcIiZyQXJyO1wiOlwi4oeSXCIsXCImckF0YWlsO1wiOlwi4qScXCIsXCImckJhcnI7XCI6XCLipI9cIixcIiZySGFyO1wiOlwi4qWkXCIsXCImcmFjZTtcIjpcIuKIvcyxXCIsXCImcmFjdXRlO1wiOlwixZVcIixcIiZyYWRpYztcIjpcIuKImlwiLFwiJnJhZW1wdHl2O1wiOlwi4qazXCIsXCImcmFuZztcIjpcIuKfqVwiLFwiJnJhbmdkO1wiOlwi4qaSXCIsXCImcmFuZ2U7XCI6XCLipqVcIixcIiZyYW5nbGU7XCI6XCLin6lcIixcIiZyYXF1b1wiOlwiwrtcIixcIiZyYXF1bztcIjpcIsK7XCIsXCImcmFycjtcIjpcIuKGklwiLFwiJnJhcnJhcDtcIjpcIuKltVwiLFwiJnJhcnJiO1wiOlwi4oelXCIsXCImcmFycmJmcztcIjpcIuKkoFwiLFwiJnJhcnJjO1wiOlwi4qSzXCIsXCImcmFycmZzO1wiOlwi4qSeXCIsXCImcmFycmhrO1wiOlwi4oaqXCIsXCImcmFycmxwO1wiOlwi4oasXCIsXCImcmFycnBsO1wiOlwi4qWFXCIsXCImcmFycnNpbTtcIjpcIuKltFwiLFwiJnJhcnJ0bDtcIjpcIuKGo1wiLFwiJnJhcnJ3O1wiOlwi4oadXCIsXCImcmF0YWlsO1wiOlwi4qSaXCIsXCImcmF0aW87XCI6XCLiiLZcIixcIiZyYXRpb25hbHM7XCI6XCLihJpcIixcIiZyYmFycjtcIjpcIuKkjVwiLFwiJnJiYnJrO1wiOlwi4p2zXCIsXCImcmJyYWNlO1wiOlwifVwiLFwiJnJicmFjaztcIjpcIl1cIixcIiZyYnJrZTtcIjpcIuKmjFwiLFwiJnJicmtzbGQ7XCI6XCLipo5cIixcIiZyYnJrc2x1O1wiOlwi4qaQXCIsXCImcmNhcm9uO1wiOlwixZlcIixcIiZyY2VkaWw7XCI6XCLFl1wiLFwiJnJjZWlsO1wiOlwi4oyJXCIsXCImcmN1YjtcIjpcIn1cIixcIiZyY3k7XCI6XCLRgFwiLFwiJnJkY2E7XCI6XCLipLdcIixcIiZyZGxkaGFyO1wiOlwi4qWpXCIsXCImcmRxdW87XCI6XCLigJ1cIixcIiZyZHF1b3I7XCI6XCLigJ1cIixcIiZyZHNoO1wiOlwi4oazXCIsXCImcmVhbDtcIjpcIuKEnFwiLFwiJnJlYWxpbmU7XCI6XCLihJtcIixcIiZyZWFscGFydDtcIjpcIuKEnFwiLFwiJnJlYWxzO1wiOlwi4oSdXCIsXCImcmVjdDtcIjpcIuKWrVwiLFwiJnJlZ1wiOlwiwq5cIixcIiZyZWc7XCI6XCLCrlwiLFwiJnJmaXNodDtcIjpcIuKlvVwiLFwiJnJmbG9vcjtcIjpcIuKMi1wiLFwiJnJmcjtcIjpcIvCdlK9cIixcIiZyaGFyZDtcIjpcIuKHgVwiLFwiJnJoYXJ1O1wiOlwi4oeAXCIsXCImcmhhcnVsO1wiOlwi4qWsXCIsXCImcmhvO1wiOlwiz4FcIixcIiZyaG92O1wiOlwiz7FcIixcIiZyaWdodGFycm93O1wiOlwi4oaSXCIsXCImcmlnaHRhcnJvd3RhaWw7XCI6XCLihqNcIixcIiZyaWdodGhhcnBvb25kb3duO1wiOlwi4oeBXCIsXCImcmlnaHRoYXJwb29udXA7XCI6XCLih4BcIixcIiZyaWdodGxlZnRhcnJvd3M7XCI6XCLih4RcIixcIiZyaWdodGxlZnRoYXJwb29ucztcIjpcIuKHjFwiLFwiJnJpZ2h0cmlnaHRhcnJvd3M7XCI6XCLih4lcIixcIiZyaWdodHNxdWlnYXJyb3c7XCI6XCLihp1cIixcIiZyaWdodHRocmVldGltZXM7XCI6XCLii4xcIixcIiZyaW5nO1wiOlwiy5pcIixcIiZyaXNpbmdkb3RzZXE7XCI6XCLiiZNcIixcIiZybGFycjtcIjpcIuKHhFwiLFwiJnJsaGFyO1wiOlwi4oeMXCIsXCImcmxtO1wiOlwi4oCPXCIsXCImcm1vdXN0O1wiOlwi4o6xXCIsXCImcm1vdXN0YWNoZTtcIjpcIuKOsVwiLFwiJnJubWlkO1wiOlwi4quuXCIsXCImcm9hbmc7XCI6XCLin61cIixcIiZyb2FycjtcIjpcIuKHvlwiLFwiJnJvYnJrO1wiOlwi4p+nXCIsXCImcm9wYXI7XCI6XCLipoZcIixcIiZyb3BmO1wiOlwi8J2Vo1wiLFwiJnJvcGx1cztcIjpcIuKorlwiLFwiJnJvdGltZXM7XCI6XCLiqLVcIixcIiZycGFyO1wiOlwiKVwiLFwiJnJwYXJndDtcIjpcIuKmlFwiLFwiJnJwcG9saW50O1wiOlwi4qiSXCIsXCImcnJhcnI7XCI6XCLih4lcIixcIiZyc2FxdW87XCI6XCLigLpcIixcIiZyc2NyO1wiOlwi8J2Th1wiLFwiJnJzaDtcIjpcIuKGsVwiLFwiJnJzcWI7XCI6XCJdXCIsXCImcnNxdW87XCI6XCLigJlcIixcIiZyc3F1b3I7XCI6XCLigJlcIixcIiZydGhyZWU7XCI6XCLii4xcIixcIiZydGltZXM7XCI6XCLii4pcIixcIiZydHJpO1wiOlwi4pa5XCIsXCImcnRyaWU7XCI6XCLiirVcIixcIiZydHJpZjtcIjpcIuKWuFwiLFwiJnJ0cmlsdHJpO1wiOlwi4qeOXCIsXCImcnVsdWhhcjtcIjpcIuKlqFwiLFwiJnJ4O1wiOlwi4oSeXCIsXCImc2FjdXRlO1wiOlwixZtcIixcIiZzYnF1bztcIjpcIuKAmlwiLFwiJnNjO1wiOlwi4om7XCIsXCImc2NFO1wiOlwi4qq0XCIsXCImc2NhcDtcIjpcIuKquFwiLFwiJnNjYXJvbjtcIjpcIsWhXCIsXCImc2NjdWU7XCI6XCLiib1cIixcIiZzY2U7XCI6XCLiqrBcIixcIiZzY2VkaWw7XCI6XCLFn1wiLFwiJnNjaXJjO1wiOlwixZ1cIixcIiZzY25FO1wiOlwi4qq2XCIsXCImc2NuYXA7XCI6XCLiqrpcIixcIiZzY25zaW07XCI6XCLii6lcIixcIiZzY3BvbGludDtcIjpcIuKok1wiLFwiJnNjc2ltO1wiOlwi4om/XCIsXCImc2N5O1wiOlwi0YFcIixcIiZzZG90O1wiOlwi4ouFXCIsXCImc2RvdGI7XCI6XCLiiqFcIixcIiZzZG90ZTtcIjpcIuKpplwiLFwiJnNlQXJyO1wiOlwi4oeYXCIsXCImc2VhcmhrO1wiOlwi4qSlXCIsXCImc2VhcnI7XCI6XCLihphcIixcIiZzZWFycm93O1wiOlwi4oaYXCIsXCImc2VjdFwiOlwiwqdcIixcIiZzZWN0O1wiOlwiwqdcIixcIiZzZW1pO1wiOlwiO1wiLFwiJnNlc3dhcjtcIjpcIuKkqVwiLFwiJnNldG1pbnVzO1wiOlwi4oiWXCIsXCImc2V0bW47XCI6XCLiiJZcIixcIiZzZXh0O1wiOlwi4py2XCIsXCImc2ZyO1wiOlwi8J2UsFwiLFwiJnNmcm93bjtcIjpcIuKMolwiLFwiJnNoYXJwO1wiOlwi4pmvXCIsXCImc2hjaGN5O1wiOlwi0YlcIixcIiZzaGN5O1wiOlwi0YhcIixcIiZzaG9ydG1pZDtcIjpcIuKIo1wiLFwiJnNob3J0cGFyYWxsZWw7XCI6XCLiiKVcIixcIiZzaHlcIjpcIsKtXCIsXCImc2h5O1wiOlwiwq1cIixcIiZzaWdtYTtcIjpcIs+DXCIsXCImc2lnbWFmO1wiOlwiz4JcIixcIiZzaWdtYXY7XCI6XCLPglwiLFwiJnNpbTtcIjpcIuKIvFwiLFwiJnNpbWRvdDtcIjpcIuKpqlwiLFwiJnNpbWU7XCI6XCLiiYNcIixcIiZzaW1lcTtcIjpcIuKJg1wiLFwiJnNpbWc7XCI6XCLiqp5cIixcIiZzaW1nRTtcIjpcIuKqoFwiLFwiJnNpbWw7XCI6XCLiqp1cIixcIiZzaW1sRTtcIjpcIuKqn1wiLFwiJnNpbW5lO1wiOlwi4omGXCIsXCImc2ltcGx1cztcIjpcIuKopFwiLFwiJnNpbXJhcnI7XCI6XCLipbJcIixcIiZzbGFycjtcIjpcIuKGkFwiLFwiJnNtYWxsc2V0bWludXM7XCI6XCLiiJZcIixcIiZzbWFzaHA7XCI6XCLiqLNcIixcIiZzbWVwYXJzbDtcIjpcIuKnpFwiLFwiJnNtaWQ7XCI6XCLiiKNcIixcIiZzbWlsZTtcIjpcIuKMo1wiLFwiJnNtdDtcIjpcIuKqqlwiLFwiJnNtdGU7XCI6XCLiqqxcIixcIiZzbXRlcztcIjpcIuKqrO+4gFwiLFwiJnNvZnRjeTtcIjpcItGMXCIsXCImc29sO1wiOlwiL1wiLFwiJnNvbGI7XCI6XCLip4RcIixcIiZzb2xiYXI7XCI6XCLijL9cIixcIiZzb3BmO1wiOlwi8J2VpFwiLFwiJnNwYWRlcztcIjpcIuKZoFwiLFwiJnNwYWRlc3VpdDtcIjpcIuKZoFwiLFwiJnNwYXI7XCI6XCLiiKVcIixcIiZzcWNhcDtcIjpcIuKKk1wiLFwiJnNxY2FwcztcIjpcIuKKk++4gFwiLFwiJnNxY3VwO1wiOlwi4oqUXCIsXCImc3FjdXBzO1wiOlwi4oqU77iAXCIsXCImc3FzdWI7XCI6XCLiio9cIixcIiZzcXN1YmU7XCI6XCLiipFcIixcIiZzcXN1YnNldDtcIjpcIuKKj1wiLFwiJnNxc3Vic2V0ZXE7XCI6XCLiipFcIixcIiZzcXN1cDtcIjpcIuKKkFwiLFwiJnNxc3VwZTtcIjpcIuKKklwiLFwiJnNxc3Vwc2V0O1wiOlwi4oqQXCIsXCImc3FzdXBzZXRlcTtcIjpcIuKKklwiLFwiJnNxdTtcIjpcIuKWoVwiLFwiJnNxdWFyZTtcIjpcIuKWoVwiLFwiJnNxdWFyZjtcIjpcIuKWqlwiLFwiJnNxdWY7XCI6XCLilqpcIixcIiZzcmFycjtcIjpcIuKGklwiLFwiJnNzY3I7XCI6XCLwnZOIXCIsXCImc3NldG1uO1wiOlwi4oiWXCIsXCImc3NtaWxlO1wiOlwi4oyjXCIsXCImc3N0YXJmO1wiOlwi4ouGXCIsXCImc3RhcjtcIjpcIuKYhlwiLFwiJnN0YXJmO1wiOlwi4piFXCIsXCImc3RyYWlnaHRlcHNpbG9uO1wiOlwiz7VcIixcIiZzdHJhaWdodHBoaTtcIjpcIs+VXCIsXCImc3RybnM7XCI6XCLCr1wiLFwiJnN1YjtcIjpcIuKKglwiLFwiJnN1YkU7XCI6XCLiq4VcIixcIiZzdWJkb3Q7XCI6XCLiqr1cIixcIiZzdWJlO1wiOlwi4oqGXCIsXCImc3ViZWRvdDtcIjpcIuKrg1wiLFwiJnN1Ym11bHQ7XCI6XCLiq4FcIixcIiZzdWJuRTtcIjpcIuKri1wiLFwiJnN1Ym5lO1wiOlwi4oqKXCIsXCImc3VicGx1cztcIjpcIuKqv1wiLFwiJnN1YnJhcnI7XCI6XCLipblcIixcIiZzdWJzZXQ7XCI6XCLiioJcIixcIiZzdWJzZXRlcTtcIjpcIuKKhlwiLFwiJnN1YnNldGVxcTtcIjpcIuKrhVwiLFwiJnN1YnNldG5lcTtcIjpcIuKKilwiLFwiJnN1YnNldG5lcXE7XCI6XCLiq4tcIixcIiZzdWJzaW07XCI6XCLiq4dcIixcIiZzdWJzdWI7XCI6XCLiq5VcIixcIiZzdWJzdXA7XCI6XCLiq5NcIixcIiZzdWNjO1wiOlwi4om7XCIsXCImc3VjY2FwcHJveDtcIjpcIuKquFwiLFwiJnN1Y2NjdXJseWVxO1wiOlwi4om9XCIsXCImc3VjY2VxO1wiOlwi4qqwXCIsXCImc3VjY25hcHByb3g7XCI6XCLiqrpcIixcIiZzdWNjbmVxcTtcIjpcIuKqtlwiLFwiJnN1Y2Nuc2ltO1wiOlwi4oupXCIsXCImc3VjY3NpbTtcIjpcIuKJv1wiLFwiJnN1bTtcIjpcIuKIkVwiLFwiJnN1bmc7XCI6XCLimapcIixcIiZzdXAxXCI6XCLCuVwiLFwiJnN1cDE7XCI6XCLCuVwiLFwiJnN1cDJcIjpcIsKyXCIsXCImc3VwMjtcIjpcIsKyXCIsXCImc3VwM1wiOlwiwrNcIixcIiZzdXAzO1wiOlwiwrNcIixcIiZzdXA7XCI6XCLiioNcIixcIiZzdXBFO1wiOlwi4quGXCIsXCImc3VwZG90O1wiOlwi4qq+XCIsXCImc3VwZHN1YjtcIjpcIuKrmFwiLFwiJnN1cGU7XCI6XCLiiodcIixcIiZzdXBlZG90O1wiOlwi4quEXCIsXCImc3VwaHNvbDtcIjpcIuKfiVwiLFwiJnN1cGhzdWI7XCI6XCLiq5dcIixcIiZzdXBsYXJyO1wiOlwi4qW7XCIsXCImc3VwbXVsdDtcIjpcIuKrglwiLFwiJnN1cG5FO1wiOlwi4quMXCIsXCImc3VwbmU7XCI6XCLiiotcIixcIiZzdXBwbHVzO1wiOlwi4quAXCIsXCImc3Vwc2V0O1wiOlwi4oqDXCIsXCImc3Vwc2V0ZXE7XCI6XCLiiodcIixcIiZzdXBzZXRlcXE7XCI6XCLiq4ZcIixcIiZzdXBzZXRuZXE7XCI6XCLiiotcIixcIiZzdXBzZXRuZXFxO1wiOlwi4quMXCIsXCImc3Vwc2ltO1wiOlwi4quIXCIsXCImc3Vwc3ViO1wiOlwi4quUXCIsXCImc3Vwc3VwO1wiOlwi4quWXCIsXCImc3dBcnI7XCI6XCLih5lcIixcIiZzd2FyaGs7XCI6XCLipKZcIixcIiZzd2FycjtcIjpcIuKGmVwiLFwiJnN3YXJyb3c7XCI6XCLihplcIixcIiZzd253YXI7XCI6XCLipKpcIixcIiZzemxpZ1wiOlwiw59cIixcIiZzemxpZztcIjpcIsOfXCIsXCImdGFyZ2V0O1wiOlwi4oyWXCIsXCImdGF1O1wiOlwiz4RcIixcIiZ0YnJrO1wiOlwi4o60XCIsXCImdGNhcm9uO1wiOlwixaVcIixcIiZ0Y2VkaWw7XCI6XCLFo1wiLFwiJnRjeTtcIjpcItGCXCIsXCImdGRvdDtcIjpcIuKDm1wiLFwiJnRlbHJlYztcIjpcIuKMlVwiLFwiJnRmcjtcIjpcIvCdlLFcIixcIiZ0aGVyZTQ7XCI6XCLiiLRcIixcIiZ0aGVyZWZvcmU7XCI6XCLiiLRcIixcIiZ0aGV0YTtcIjpcIs64XCIsXCImdGhldGFzeW07XCI6XCLPkVwiLFwiJnRoZXRhdjtcIjpcIs+RXCIsXCImdGhpY2thcHByb3g7XCI6XCLiiYhcIixcIiZ0aGlja3NpbTtcIjpcIuKIvFwiLFwiJnRoaW5zcDtcIjpcIuKAiVwiLFwiJnRoa2FwO1wiOlwi4omIXCIsXCImdGhrc2ltO1wiOlwi4oi8XCIsXCImdGhvcm5cIjpcIsO+XCIsXCImdGhvcm47XCI6XCLDvlwiLFwiJnRpbGRlO1wiOlwiy5xcIixcIiZ0aW1lc1wiOlwiw5dcIixcIiZ0aW1lcztcIjpcIsOXXCIsXCImdGltZXNiO1wiOlwi4oqgXCIsXCImdGltZXNiYXI7XCI6XCLiqLFcIixcIiZ0aW1lc2Q7XCI6XCLiqLBcIixcIiZ0aW50O1wiOlwi4oitXCIsXCImdG9lYTtcIjpcIuKkqFwiLFwiJnRvcDtcIjpcIuKKpFwiLFwiJnRvcGJvdDtcIjpcIuKMtlwiLFwiJnRvcGNpcjtcIjpcIuKrsVwiLFwiJnRvcGY7XCI6XCLwnZWlXCIsXCImdG9wZm9yaztcIjpcIuKrmlwiLFwiJnRvc2E7XCI6XCLipKlcIixcIiZ0cHJpbWU7XCI6XCLigLRcIixcIiZ0cmFkZTtcIjpcIuKEolwiLFwiJnRyaWFuZ2xlO1wiOlwi4pa1XCIsXCImdHJpYW5nbGVkb3duO1wiOlwi4pa/XCIsXCImdHJpYW5nbGVsZWZ0O1wiOlwi4peDXCIsXCImdHJpYW5nbGVsZWZ0ZXE7XCI6XCLiirRcIixcIiZ0cmlhbmdsZXE7XCI6XCLiiZxcIixcIiZ0cmlhbmdsZXJpZ2h0O1wiOlwi4pa5XCIsXCImdHJpYW5nbGVyaWdodGVxO1wiOlwi4oq1XCIsXCImdHJpZG90O1wiOlwi4pesXCIsXCImdHJpZTtcIjpcIuKJnFwiLFwiJnRyaW1pbnVzO1wiOlwi4qi6XCIsXCImdHJpcGx1cztcIjpcIuKouVwiLFwiJnRyaXNiO1wiOlwi4qeNXCIsXCImdHJpdGltZTtcIjpcIuKou1wiLFwiJnRycGV6aXVtO1wiOlwi4o+iXCIsXCImdHNjcjtcIjpcIvCdk4lcIixcIiZ0c2N5O1wiOlwi0YZcIixcIiZ0c2hjeTtcIjpcItGbXCIsXCImdHN0cm9rO1wiOlwixadcIixcIiZ0d2l4dDtcIjpcIuKJrFwiLFwiJnR3b2hlYWRsZWZ0YXJyb3c7XCI6XCLihp5cIixcIiZ0d29oZWFkcmlnaHRhcnJvdztcIjpcIuKGoFwiLFwiJnVBcnI7XCI6XCLih5FcIixcIiZ1SGFyO1wiOlwi4qWjXCIsXCImdWFjdXRlXCI6XCLDulwiLFwiJnVhY3V0ZTtcIjpcIsO6XCIsXCImdWFycjtcIjpcIuKGkVwiLFwiJnVicmN5O1wiOlwi0Z5cIixcIiZ1YnJldmU7XCI6XCLFrVwiLFwiJnVjaXJjXCI6XCLDu1wiLFwiJnVjaXJjO1wiOlwiw7tcIixcIiZ1Y3k7XCI6XCLRg1wiLFwiJnVkYXJyO1wiOlwi4oeFXCIsXCImdWRibGFjO1wiOlwixbFcIixcIiZ1ZGhhcjtcIjpcIuKlrlwiLFwiJnVmaXNodDtcIjpcIuKlvlwiLFwiJnVmcjtcIjpcIvCdlLJcIixcIiZ1Z3JhdmVcIjpcIsO5XCIsXCImdWdyYXZlO1wiOlwiw7lcIixcIiZ1aGFybDtcIjpcIuKGv1wiLFwiJnVoYXJyO1wiOlwi4oa+XCIsXCImdWhibGs7XCI6XCLiloBcIixcIiZ1bGNvcm47XCI6XCLijJxcIixcIiZ1bGNvcm5lcjtcIjpcIuKMnFwiLFwiJnVsY3JvcDtcIjpcIuKMj1wiLFwiJnVsdHJpO1wiOlwi4pe4XCIsXCImdW1hY3I7XCI6XCLFq1wiLFwiJnVtbFwiOlwiwqhcIixcIiZ1bWw7XCI6XCLCqFwiLFwiJnVvZ29uO1wiOlwixbNcIixcIiZ1b3BmO1wiOlwi8J2VplwiLFwiJnVwYXJyb3c7XCI6XCLihpFcIixcIiZ1cGRvd25hcnJvdztcIjpcIuKGlVwiLFwiJnVwaGFycG9vbmxlZnQ7XCI6XCLihr9cIixcIiZ1cGhhcnBvb25yaWdodDtcIjpcIuKGvlwiLFwiJnVwbHVzO1wiOlwi4oqOXCIsXCImdXBzaTtcIjpcIs+FXCIsXCImdXBzaWg7XCI6XCLPklwiLFwiJnVwc2lsb247XCI6XCLPhVwiLFwiJnVwdXBhcnJvd3M7XCI6XCLih4hcIixcIiZ1cmNvcm47XCI6XCLijJ1cIixcIiZ1cmNvcm5lcjtcIjpcIuKMnVwiLFwiJnVyY3JvcDtcIjpcIuKMjlwiLFwiJnVyaW5nO1wiOlwixa9cIixcIiZ1cnRyaTtcIjpcIuKXuVwiLFwiJnVzY3I7XCI6XCLwnZOKXCIsXCImdXRkb3Q7XCI6XCLii7BcIixcIiZ1dGlsZGU7XCI6XCLFqVwiLFwiJnV0cmk7XCI6XCLilrVcIixcIiZ1dHJpZjtcIjpcIuKWtFwiLFwiJnV1YXJyO1wiOlwi4oeIXCIsXCImdXVtbFwiOlwiw7xcIixcIiZ1dW1sO1wiOlwiw7xcIixcIiZ1d2FuZ2xlO1wiOlwi4qanXCIsXCImdkFycjtcIjpcIuKHlVwiLFwiJnZCYXI7XCI6XCLiq6hcIixcIiZ2QmFydjtcIjpcIuKrqVwiLFwiJnZEYXNoO1wiOlwi4oqoXCIsXCImdmFuZ3J0O1wiOlwi4qacXCIsXCImdmFyZXBzaWxvbjtcIjpcIs+1XCIsXCImdmFya2FwcGE7XCI6XCLPsFwiLFwiJnZhcm5vdGhpbmc7XCI6XCLiiIVcIixcIiZ2YXJwaGk7XCI6XCLPlVwiLFwiJnZhcnBpO1wiOlwiz5ZcIixcIiZ2YXJwcm9wdG87XCI6XCLiiJ1cIixcIiZ2YXJyO1wiOlwi4oaVXCIsXCImdmFycmhvO1wiOlwiz7FcIixcIiZ2YXJzaWdtYTtcIjpcIs+CXCIsXCImdmFyc3Vic2V0bmVxO1wiOlwi4oqK77iAXCIsXCImdmFyc3Vic2V0bmVxcTtcIjpcIuKri++4gFwiLFwiJnZhcnN1cHNldG5lcTtcIjpcIuKKi++4gFwiLFwiJnZhcnN1cHNldG5lcXE7XCI6XCLiq4zvuIBcIixcIiZ2YXJ0aGV0YTtcIjpcIs+RXCIsXCImdmFydHJpYW5nbGVsZWZ0O1wiOlwi4oqyXCIsXCImdmFydHJpYW5nbGVyaWdodDtcIjpcIuKKs1wiLFwiJnZjeTtcIjpcItCyXCIsXCImdmRhc2g7XCI6XCLiiqJcIixcIiZ2ZWU7XCI6XCLiiKhcIixcIiZ2ZWViYXI7XCI6XCLiirtcIixcIiZ2ZWVlcTtcIjpcIuKJmlwiLFwiJnZlbGxpcDtcIjpcIuKLrlwiLFwiJnZlcmJhcjtcIjpcInxcIixcIiZ2ZXJ0O1wiOlwifFwiLFwiJnZmcjtcIjpcIvCdlLNcIixcIiZ2bHRyaTtcIjpcIuKKslwiLFwiJnZuc3ViO1wiOlwi4oqC4oOSXCIsXCImdm5zdXA7XCI6XCLiioPig5JcIixcIiZ2b3BmO1wiOlwi8J2Vp1wiLFwiJnZwcm9wO1wiOlwi4oidXCIsXCImdnJ0cmk7XCI6XCLiirNcIixcIiZ2c2NyO1wiOlwi8J2Ti1wiLFwiJnZzdWJuRTtcIjpcIuKri++4gFwiLFwiJnZzdWJuZTtcIjpcIuKKiu+4gFwiLFwiJnZzdXBuRTtcIjpcIuKrjO+4gFwiLFwiJnZzdXBuZTtcIjpcIuKKi++4gFwiLFwiJnZ6aWd6YWc7XCI6XCLipppcIixcIiZ3Y2lyYztcIjpcIsW1XCIsXCImd2VkYmFyO1wiOlwi4qmfXCIsXCImd2VkZ2U7XCI6XCLiiKdcIixcIiZ3ZWRnZXE7XCI6XCLiiZlcIixcIiZ3ZWllcnA7XCI6XCLihJhcIixcIiZ3ZnI7XCI6XCLwnZS0XCIsXCImd29wZjtcIjpcIvCdlahcIixcIiZ3cDtcIjpcIuKEmFwiLFwiJndyO1wiOlwi4omAXCIsXCImd3JlYXRoO1wiOlwi4omAXCIsXCImd3NjcjtcIjpcIvCdk4xcIixcIiZ4Y2FwO1wiOlwi4ouCXCIsXCImeGNpcmM7XCI6XCLil69cIixcIiZ4Y3VwO1wiOlwi4ouDXCIsXCImeGR0cmk7XCI6XCLilr1cIixcIiZ4ZnI7XCI6XCLwnZS1XCIsXCImeGhBcnI7XCI6XCLin7pcIixcIiZ4aGFycjtcIjpcIuKft1wiLFwiJnhpO1wiOlwizr5cIixcIiZ4bEFycjtcIjpcIuKfuFwiLFwiJnhsYXJyO1wiOlwi4p+1XCIsXCImeG1hcDtcIjpcIuKfvFwiLFwiJnhuaXM7XCI6XCLii7tcIixcIiZ4b2RvdDtcIjpcIuKogFwiLFwiJnhvcGY7XCI6XCLwnZWpXCIsXCImeG9wbHVzO1wiOlwi4qiBXCIsXCImeG90aW1lO1wiOlwi4qiCXCIsXCImeHJBcnI7XCI6XCLin7lcIixcIiZ4cmFycjtcIjpcIuKftlwiLFwiJnhzY3I7XCI6XCLwnZONXCIsXCImeHNxY3VwO1wiOlwi4qiGXCIsXCImeHVwbHVzO1wiOlwi4qiEXCIsXCImeHV0cmk7XCI6XCLilrNcIixcIiZ4dmVlO1wiOlwi4ouBXCIsXCImeHdlZGdlO1wiOlwi4ouAXCIsXCImeWFjdXRlXCI6XCLDvVwiLFwiJnlhY3V0ZTtcIjpcIsO9XCIsXCImeWFjeTtcIjpcItGPXCIsXCImeWNpcmM7XCI6XCLFt1wiLFwiJnljeTtcIjpcItGLXCIsXCImeWVuXCI6XCLCpVwiLFwiJnllbjtcIjpcIsKlXCIsXCImeWZyO1wiOlwi8J2UtlwiLFwiJnlpY3k7XCI6XCLRl1wiLFwiJnlvcGY7XCI6XCLwnZWqXCIsXCImeXNjcjtcIjpcIvCdk45cIixcIiZ5dWN5O1wiOlwi0Y5cIixcIiZ5dW1sXCI6XCLDv1wiLFwiJnl1bWw7XCI6XCLDv1wiLFwiJnphY3V0ZTtcIjpcIsW6XCIsXCImemNhcm9uO1wiOlwixb5cIixcIiZ6Y3k7XCI6XCLQt1wiLFwiJnpkb3Q7XCI6XCLFvFwiLFwiJnplZXRyZjtcIjpcIuKEqFwiLFwiJnpldGE7XCI6XCLOtlwiLFwiJnpmcjtcIjpcIvCdlLdcIixcIiZ6aGN5O1wiOlwi0LZcIixcIiZ6aWdyYXJyO1wiOlwi4oedXCIsXCImem9wZjtcIjpcIvCdlatcIixcIiZ6c2NyO1wiOlwi8J2Tj1wiLFwiJnp3ajtcIjpcIuKAjVwiLFwiJnp3bmo7XCI6XCLigIxcIn0sY2hhcmFjdGVyczp7XCLDhlwiOlwiJkFFbGlnO1wiLFwiJlwiOlwiJmFtcDtcIixcIsOBXCI6XCImQWFjdXRlO1wiLFwixIJcIjpcIiZBYnJldmU7XCIsXCLDglwiOlwiJkFjaXJjO1wiLFwi0JBcIjpcIiZBY3k7XCIsXCLwnZSEXCI6XCImQWZyO1wiLFwiw4BcIjpcIiZBZ3JhdmU7XCIsXCLOkVwiOlwiJkFscGhhO1wiLFwixIBcIjpcIiZBbWFjcjtcIixcIuKpk1wiOlwiJkFuZDtcIixcIsSEXCI6XCImQW9nb247XCIsXCLwnZS4XCI6XCImQW9wZjtcIixcIuKBoVwiOlwiJmFmO1wiLFwiw4VcIjpcIiZhbmdzdDtcIixcIvCdkpxcIjpcIiZBc2NyO1wiLFwi4omUXCI6XCImY29sb25lcTtcIixcIsODXCI6XCImQXRpbGRlO1wiLFwiw4RcIjpcIiZBdW1sO1wiLFwi4oiWXCI6XCImc3NldG1uO1wiLFwi4qunXCI6XCImQmFydjtcIixcIuKMhlwiOlwiJmRvdWJsZWJhcndlZGdlO1wiLFwi0JFcIjpcIiZCY3k7XCIsXCLiiLVcIjpcIiZiZWNhdXNlO1wiLFwi4oSsXCI6XCImYmVybm91O1wiLFwizpJcIjpcIiZCZXRhO1wiLFwi8J2UhVwiOlwiJkJmcjtcIixcIvCdlLlcIjpcIiZCb3BmO1wiLFwiy5hcIjpcIiZicmV2ZTtcIixcIuKJjlwiOlwiJmJ1bXA7XCIsXCLQp1wiOlwiJkNIY3k7XCIsXCLCqVwiOlwiJmNvcHk7XCIsXCLEhlwiOlwiJkNhY3V0ZTtcIixcIuKLklwiOlwiJkNhcDtcIixcIuKFhVwiOlwiJkREO1wiLFwi4oStXCI6XCImQ2ZyO1wiLFwixIxcIjpcIiZDY2Fyb247XCIsXCLDh1wiOlwiJkNjZWRpbDtcIixcIsSIXCI6XCImQ2NpcmM7XCIsXCLiiLBcIjpcIiZDY29uaW50O1wiLFwixIpcIjpcIiZDZG90O1wiLFwiwrhcIjpcIiZjZWRpbDtcIixcIsK3XCI6XCImbWlkZG90O1wiLFwizqdcIjpcIiZDaGk7XCIsXCLiiplcIjpcIiZvZG90O1wiLFwi4oqWXCI6XCImb21pbnVzO1wiLFwi4oqVXCI6XCImb3BsdXM7XCIsXCLiipdcIjpcIiZvdGltZXM7XCIsXCLiiLJcIjpcIiZjd2NvbmludDtcIixcIuKAnVwiOlwiJnJkcXVvcjtcIixcIuKAmVwiOlwiJnJzcXVvcjtcIixcIuKIt1wiOlwiJlByb3BvcnRpb247XCIsXCLiqbRcIjpcIiZDb2xvbmU7XCIsXCLiiaFcIjpcIiZlcXVpdjtcIixcIuKIr1wiOlwiJkRvdWJsZUNvbnRvdXJJbnRlZ3JhbDtcIixcIuKIrlwiOlwiJm9pbnQ7XCIsXCLihIJcIjpcIiZjb21wbGV4ZXM7XCIsXCLiiJBcIjpcIiZjb3Byb2Q7XCIsXCLiiLNcIjpcIiZhd2NvbmludDtcIixcIuKor1wiOlwiJkNyb3NzO1wiLFwi8J2SnlwiOlwiJkNzY3I7XCIsXCLii5NcIjpcIiZDdXA7XCIsXCLiiY1cIjpcIiZhc3ltcGVxO1wiLFwi4qSRXCI6XCImRERvdHJhaGQ7XCIsXCLQglwiOlwiJkRKY3k7XCIsXCLQhVwiOlwiJkRTY3k7XCIsXCLQj1wiOlwiJkRaY3k7XCIsXCLigKFcIjpcIiZkZGFnZ2VyO1wiLFwi4oahXCI6XCImRGFycjtcIixcIuKrpFwiOlwiJkRvdWJsZUxlZnRUZWU7XCIsXCLEjlwiOlwiJkRjYXJvbjtcIixcItCUXCI6XCImRGN5O1wiLFwi4oiHXCI6XCImbmFibGE7XCIsXCLOlFwiOlwiJkRlbHRhO1wiLFwi8J2Uh1wiOlwiJkRmcjtcIixcIsK0XCI6XCImYWN1dGU7XCIsXCLLmVwiOlwiJmRvdDtcIixcIsudXCI6XCImZGJsYWM7XCIsXCJgXCI6XCImZ3JhdmU7XCIsXCLLnFwiOlwiJnRpbGRlO1wiLFwi4ouEXCI6XCImZGlhbW9uZDtcIixcIuKFhlwiOlwiJmRkO1wiLFwi8J2Uu1wiOlwiJkRvcGY7XCIsXCLCqFwiOlwiJnVtbDtcIixcIuKDnFwiOlwiJkRvdERvdDtcIixcIuKJkFwiOlwiJmVzZG90O1wiLFwi4oeTXCI6XCImZEFycjtcIixcIuKHkFwiOlwiJmxBcnI7XCIsXCLih5RcIjpcIiZpZmY7XCIsXCLin7hcIjpcIiZ4bEFycjtcIixcIuKfulwiOlwiJnhoQXJyO1wiLFwi4p+5XCI6XCImeHJBcnI7XCIsXCLih5JcIjpcIiZyQXJyO1wiLFwi4oqoXCI6XCImdkRhc2g7XCIsXCLih5FcIjpcIiZ1QXJyO1wiLFwi4oeVXCI6XCImdkFycjtcIixcIuKIpVwiOlwiJnNwYXI7XCIsXCLihpNcIjpcIiZkb3duYXJyb3c7XCIsXCLipJNcIjpcIiZEb3duQXJyb3dCYXI7XCIsXCLih7VcIjpcIiZkdWFycjtcIixcIsyRXCI6XCImRG93bkJyZXZlO1wiLFwi4qWQXCI6XCImRG93bkxlZnRSaWdodFZlY3RvcjtcIixcIuKlnlwiOlwiJkRvd25MZWZ0VGVlVmVjdG9yO1wiLFwi4oa9XCI6XCImbGhhcmQ7XCIsXCLipZZcIjpcIiZEb3duTGVmdFZlY3RvckJhcjtcIixcIuKln1wiOlwiJkRvd25SaWdodFRlZVZlY3RvcjtcIixcIuKHgVwiOlwiJnJpZ2h0aGFycG9vbmRvd247XCIsXCLipZdcIjpcIiZEb3duUmlnaHRWZWN0b3JCYXI7XCIsXCLiiqRcIjpcIiZ0b3A7XCIsXCLihqdcIjpcIiZtYXBzdG9kb3duO1wiLFwi8J2Sn1wiOlwiJkRzY3I7XCIsXCLEkFwiOlwiJkRzdHJvaztcIixcIsWKXCI6XCImRU5HO1wiLFwiw5BcIjpcIiZFVEg7XCIsXCLDiVwiOlwiJkVhY3V0ZTtcIixcIsSaXCI6XCImRWNhcm9uO1wiLFwiw4pcIjpcIiZFY2lyYztcIixcItCtXCI6XCImRWN5O1wiLFwixJZcIjpcIiZFZG90O1wiLFwi8J2UiFwiOlwiJkVmcjtcIixcIsOIXCI6XCImRWdyYXZlO1wiLFwi4oiIXCI6XCImaXNpbnY7XCIsXCLEklwiOlwiJkVtYWNyO1wiLFwi4pe7XCI6XCImRW1wdHlTbWFsbFNxdWFyZTtcIixcIuKWq1wiOlwiJkVtcHR5VmVyeVNtYWxsU3F1YXJlO1wiLFwixJhcIjpcIiZFb2dvbjtcIixcIvCdlLxcIjpcIiZFb3BmO1wiLFwizpVcIjpcIiZFcHNpbG9uO1wiLFwi4qm1XCI6XCImRXF1YWw7XCIsXCLiiYJcIjpcIiZlc2ltO1wiLFwi4oeMXCI6XCImcmxoYXI7XCIsXCLihLBcIjpcIiZleHBlY3RhdGlvbjtcIixcIuKps1wiOlwiJkVzaW07XCIsXCLOl1wiOlwiJkV0YTtcIixcIsOLXCI6XCImRXVtbDtcIixcIuKIg1wiOlwiJmV4aXN0O1wiLFwi4oWHXCI6XCImZXhwb25lbnRpYWxlO1wiLFwi0KRcIjpcIiZGY3k7XCIsXCLwnZSJXCI6XCImRmZyO1wiLFwi4pe8XCI6XCImRmlsbGVkU21hbGxTcXVhcmU7XCIsXCLilqpcIjpcIiZzcXVmO1wiLFwi8J2UvVwiOlwiJkZvcGY7XCIsXCLiiIBcIjpcIiZmb3JhbGw7XCIsXCLihLFcIjpcIiZGc2NyO1wiLFwi0INcIjpcIiZHSmN5O1wiLFwiPlwiOlwiJmd0O1wiLFwizpNcIjpcIiZHYW1tYTtcIixcIs+cXCI6XCImR2FtbWFkO1wiLFwixJ5cIjpcIiZHYnJldmU7XCIsXCLEolwiOlwiJkdjZWRpbDtcIixcIsScXCI6XCImR2NpcmM7XCIsXCLQk1wiOlwiJkdjeTtcIixcIsSgXCI6XCImR2RvdDtcIixcIvCdlIpcIjpcIiZHZnI7XCIsXCLii5lcIjpcIiZnZ2c7XCIsXCLwnZS+XCI6XCImR29wZjtcIixcIuKJpVwiOlwiJmdlcTtcIixcIuKLm1wiOlwiJmd0cmVxbGVzcztcIixcIuKJp1wiOlwiJmdlcXE7XCIsXCLiqqJcIjpcIiZHcmVhdGVyR3JlYXRlcjtcIixcIuKJt1wiOlwiJmd0cmxlc3M7XCIsXCLiqb5cIjpcIiZnZXM7XCIsXCLiibNcIjpcIiZndHJzaW07XCIsXCLwnZKiXCI6XCImR3NjcjtcIixcIuKJq1wiOlwiJmdnO1wiLFwi0KpcIjpcIiZIQVJEY3k7XCIsXCLLh1wiOlwiJmNhcm9uO1wiLFwiXlwiOlwiJkhhdDtcIixcIsSkXCI6XCImSGNpcmM7XCIsXCLihIxcIjpcIiZQb2luY2FyZXBsYW5lO1wiLFwi4oSLXCI6XCImaGFtaWx0O1wiLFwi4oSNXCI6XCImcXVhdGVybmlvbnM7XCIsXCLilIBcIjpcIiZib3hoO1wiLFwixKZcIjpcIiZIc3Ryb2s7XCIsXCLiiY9cIjpcIiZidW1wZXE7XCIsXCLQlVwiOlwiJklFY3k7XCIsXCLEslwiOlwiJklKbGlnO1wiLFwi0IFcIjpcIiZJT2N5O1wiLFwiw41cIjpcIiZJYWN1dGU7XCIsXCLDjlwiOlwiJkljaXJjO1wiLFwi0JhcIjpcIiZJY3k7XCIsXCLEsFwiOlwiJklkb3Q7XCIsXCLihJFcIjpcIiZpbWFncGFydDtcIixcIsOMXCI6XCImSWdyYXZlO1wiLFwixKpcIjpcIiZJbWFjcjtcIixcIuKFiFwiOlwiJmlpO1wiLFwi4oisXCI6XCImSW50O1wiLFwi4oirXCI6XCImaW50O1wiLFwi4ouCXCI6XCImeGNhcDtcIixcIuKBo1wiOlwiJmljO1wiLFwi4oGiXCI6XCImaXQ7XCIsXCLErlwiOlwiJklvZ29uO1wiLFwi8J2VgFwiOlwiJklvcGY7XCIsXCLOmVwiOlwiJklvdGE7XCIsXCLihJBcIjpcIiZpbWFnbGluZTtcIixcIsSoXCI6XCImSXRpbGRlO1wiLFwi0IZcIjpcIiZJdWtjeTtcIixcIsOPXCI6XCImSXVtbDtcIixcIsS0XCI6XCImSmNpcmM7XCIsXCLQmVwiOlwiJkpjeTtcIixcIvCdlI1cIjpcIiZKZnI7XCIsXCLwnZWBXCI6XCImSm9wZjtcIixcIvCdkqVcIjpcIiZKc2NyO1wiLFwi0IhcIjpcIiZKc2VyY3k7XCIsXCLQhFwiOlwiJkp1a2N5O1wiLFwi0KVcIjpcIiZLSGN5O1wiLFwi0IxcIjpcIiZLSmN5O1wiLFwizppcIjpcIiZLYXBwYTtcIixcIsS2XCI6XCImS2NlZGlsO1wiLFwi0JpcIjpcIiZLY3k7XCIsXCLwnZSOXCI6XCImS2ZyO1wiLFwi8J2VglwiOlwiJktvcGY7XCIsXCLwnZKmXCI6XCImS3NjcjtcIixcItCJXCI6XCImTEpjeTtcIixcIjxcIjpcIiZsdDtcIixcIsS5XCI6XCImTGFjdXRlO1wiLFwizptcIjpcIiZMYW1iZGE7XCIsXCLin6pcIjpcIiZMYW5nO1wiLFwi4oSSXCI6XCImbGFncmFuO1wiLFwi4oaeXCI6XCImdHdvaGVhZGxlZnRhcnJvdztcIixcIsS9XCI6XCImTGNhcm9uO1wiLFwixLtcIjpcIiZMY2VkaWw7XCIsXCLQm1wiOlwiJkxjeTtcIixcIuKfqFwiOlwiJmxhbmdsZTtcIixcIuKGkFwiOlwiJnNsYXJyO1wiLFwi4oekXCI6XCImbGFycmI7XCIsXCLih4ZcIjpcIiZscmFycjtcIixcIuKMiFwiOlwiJmxjZWlsO1wiLFwi4p+mXCI6XCImbG9icms7XCIsXCLipaFcIjpcIiZMZWZ0RG93blRlZVZlY3RvcjtcIixcIuKHg1wiOlwiJmRvd25oYXJwb29ubGVmdDtcIixcIuKlmVwiOlwiJkxlZnREb3duVmVjdG9yQmFyO1wiLFwi4oyKXCI6XCImbGZsb29yO1wiLFwi4oaUXCI6XCImbGVmdHJpZ2h0YXJyb3c7XCIsXCLipY5cIjpcIiZMZWZ0UmlnaHRWZWN0b3I7XCIsXCLiiqNcIjpcIiZkYXNodjtcIixcIuKGpFwiOlwiJm1hcHN0b2xlZnQ7XCIsXCLipZpcIjpcIiZMZWZ0VGVlVmVjdG9yO1wiLFwi4oqyXCI6XCImdmx0cmk7XCIsXCLip49cIjpcIiZMZWZ0VHJpYW5nbGVCYXI7XCIsXCLiirRcIjpcIiZ0cmlhbmdsZWxlZnRlcTtcIixcIuKlkVwiOlwiJkxlZnRVcERvd25WZWN0b3I7XCIsXCLipaBcIjpcIiZMZWZ0VXBUZWVWZWN0b3I7XCIsXCLihr9cIjpcIiZ1cGhhcnBvb25sZWZ0O1wiLFwi4qWYXCI6XCImTGVmdFVwVmVjdG9yQmFyO1wiLFwi4oa8XCI6XCImbGhhcnU7XCIsXCLipZJcIjpcIiZMZWZ0VmVjdG9yQmFyO1wiLFwi4ouaXCI6XCImbGVzc2VxZ3RyO1wiLFwi4ommXCI6XCImbGVxcTtcIixcIuKJtlwiOlwiJmxnO1wiLFwi4qqhXCI6XCImTGVzc0xlc3M7XCIsXCLiqb1cIjpcIiZsZXM7XCIsXCLiibJcIjpcIiZsc2ltO1wiLFwi8J2Uj1wiOlwiJkxmcjtcIixcIuKLmFwiOlwiJkxsO1wiLFwi4oeaXCI6XCImbEFhcnI7XCIsXCLEv1wiOlwiJkxtaWRvdDtcIixcIuKftVwiOlwiJnhsYXJyO1wiLFwi4p+3XCI6XCImeGhhcnI7XCIsXCLin7ZcIjpcIiZ4cmFycjtcIixcIvCdlYNcIjpcIiZMb3BmO1wiLFwi4oaZXCI6XCImc3dhcnJvdztcIixcIuKGmFwiOlwiJnNlYXJyb3c7XCIsXCLihrBcIjpcIiZsc2g7XCIsXCLFgVwiOlwiJkxzdHJvaztcIixcIuKJqlwiOlwiJmxsO1wiLFwi4qSFXCI6XCImTWFwO1wiLFwi0JxcIjpcIiZNY3k7XCIsXCLigZ9cIjpcIiZNZWRpdW1TcGFjZTtcIixcIuKEs1wiOlwiJnBobW1hdDtcIixcIvCdlJBcIjpcIiZNZnI7XCIsXCLiiJNcIjpcIiZtcDtcIixcIvCdlYRcIjpcIiZNb3BmO1wiLFwizpxcIjpcIiZNdTtcIixcItCKXCI6XCImTkpjeTtcIixcIsWDXCI6XCImTmFjdXRlO1wiLFwixYdcIjpcIiZOY2Fyb247XCIsXCLFhVwiOlwiJk5jZWRpbDtcIixcItCdXCI6XCImTmN5O1wiLFwi4oCLXCI6XCImWmVyb1dpZHRoU3BhY2U7XCIsXCJcXG5cIjpcIiZOZXdMaW5lO1wiLFwi8J2UkVwiOlwiJk5mcjtcIixcIuKBoFwiOlwiJk5vQnJlYWs7XCIsXCLCoFwiOlwiJm5ic3A7XCIsXCLihJVcIjpcIiZuYXR1cmFscztcIixcIuKrrFwiOlwiJk5vdDtcIixcIuKJolwiOlwiJm5lcXVpdjtcIixcIuKJrVwiOlwiJk5vdEN1cENhcDtcIixcIuKIplwiOlwiJm5zcGFyO1wiLFwi4oiJXCI6XCImbm90aW52YTtcIixcIuKJoFwiOlwiJm5lO1wiLFwi4omCzLhcIjpcIiZuZXNpbTtcIixcIuKIhFwiOlwiJm5leGlzdHM7XCIsXCLiia9cIjpcIiZuZ3RyO1wiLFwi4omxXCI6XCImbmdlcTtcIixcIuKJp8y4XCI6XCImbmdlcXE7XCIsXCLiiavMuFwiOlwiJm5HdHY7XCIsXCLiiblcIjpcIiZudGdsO1wiLFwi4qm+zLhcIjpcIiZuZ2VzO1wiLFwi4om1XCI6XCImbmdzaW07XCIsXCLiiY7MuFwiOlwiJm5idW1wO1wiLFwi4omPzLhcIjpcIiZuYnVtcGU7XCIsXCLii6pcIjpcIiZudHJpYW5nbGVsZWZ0O1wiLFwi4qePzLhcIjpcIiZOb3RMZWZ0VHJpYW5nbGVCYXI7XCIsXCLii6xcIjpcIiZudHJpYW5nbGVsZWZ0ZXE7XCIsXCLiia5cIjpcIiZubHQ7XCIsXCLiibBcIjpcIiZubGVxO1wiLFwi4om4XCI6XCImbnRsZztcIixcIuKJqsy4XCI6XCImbkx0djtcIixcIuKpvcy4XCI6XCImbmxlcztcIixcIuKJtFwiOlwiJm5sc2ltO1wiLFwi4qqizLhcIjpcIiZOb3ROZXN0ZWRHcmVhdGVyR3JlYXRlcjtcIixcIuKqocy4XCI6XCImTm90TmVzdGVkTGVzc0xlc3M7XCIsXCLiioBcIjpcIiZucHJlYztcIixcIuKqr8y4XCI6XCImbnByZWNlcTtcIixcIuKLoFwiOlwiJm5wcmN1ZTtcIixcIuKIjFwiOlwiJm5vdG5pdmE7XCIsXCLii6tcIjpcIiZudHJpYW5nbGVyaWdodDtcIixcIuKnkMy4XCI6XCImTm90UmlnaHRUcmlhbmdsZUJhcjtcIixcIuKLrVwiOlwiJm50cmlhbmdsZXJpZ2h0ZXE7XCIsXCLiio/MuFwiOlwiJk5vdFNxdWFyZVN1YnNldDtcIixcIuKLolwiOlwiJm5zcXN1YmU7XCIsXCLiipDMuFwiOlwiJk5vdFNxdWFyZVN1cGVyc2V0O1wiLFwi4oujXCI6XCImbnNxc3VwZTtcIixcIuKKguKDklwiOlwiJnZuc3ViO1wiLFwi4oqIXCI6XCImbnN1YnNldGVxO1wiLFwi4oqBXCI6XCImbnN1Y2M7XCIsXCLiqrDMuFwiOlwiJm5zdWNjZXE7XCIsXCLii6FcIjpcIiZuc2NjdWU7XCIsXCLiib/MuFwiOlwiJk5vdFN1Y2NlZWRzVGlsZGU7XCIsXCLiioPig5JcIjpcIiZ2bnN1cDtcIixcIuKKiVwiOlwiJm5zdXBzZXRlcTtcIixcIuKJgVwiOlwiJm5zaW07XCIsXCLiiYRcIjpcIiZuc2ltZXE7XCIsXCLiiYdcIjpcIiZuY29uZztcIixcIuKJiVwiOlwiJm5hcHByb3g7XCIsXCLiiKRcIjpcIiZuc21pZDtcIixcIvCdkqlcIjpcIiZOc2NyO1wiLFwiw5FcIjpcIiZOdGlsZGU7XCIsXCLOnVwiOlwiJk51O1wiLFwixZJcIjpcIiZPRWxpZztcIixcIsOTXCI6XCImT2FjdXRlO1wiLFwiw5RcIjpcIiZPY2lyYztcIixcItCeXCI6XCImT2N5O1wiLFwixZBcIjpcIiZPZGJsYWM7XCIsXCLwnZSSXCI6XCImT2ZyO1wiLFwiw5JcIjpcIiZPZ3JhdmU7XCIsXCLFjFwiOlwiJk9tYWNyO1wiLFwizqlcIjpcIiZvaG07XCIsXCLOn1wiOlwiJk9taWNyb247XCIsXCLwnZWGXCI6XCImT29wZjtcIixcIuKAnFwiOlwiJmxkcXVvO1wiLFwi4oCYXCI6XCImbHNxdW87XCIsXCLiqZRcIjpcIiZPcjtcIixcIvCdkqpcIjpcIiZPc2NyO1wiLFwiw5hcIjpcIiZPc2xhc2g7XCIsXCLDlVwiOlwiJk90aWxkZTtcIixcIuKot1wiOlwiJk90aW1lcztcIixcIsOWXCI6XCImT3VtbDtcIixcIuKAvlwiOlwiJm9saW5lO1wiLFwi4o+eXCI6XCImT3ZlckJyYWNlO1wiLFwi4o60XCI6XCImdGJyaztcIixcIuKPnFwiOlwiJk92ZXJQYXJlbnRoZXNpcztcIixcIuKIglwiOlwiJnBhcnQ7XCIsXCLQn1wiOlwiJlBjeTtcIixcIvCdlJNcIjpcIiZQZnI7XCIsXCLOplwiOlwiJlBoaTtcIixcIs6gXCI6XCImUGk7XCIsXCLCsVwiOlwiJnBtO1wiLFwi4oSZXCI6XCImcHJpbWVzO1wiLFwi4qq7XCI6XCImUHI7XCIsXCLiibpcIjpcIiZwcmVjO1wiLFwi4qqvXCI6XCImcHJlY2VxO1wiLFwi4om8XCI6XCImcHJlY2N1cmx5ZXE7XCIsXCLiib5cIjpcIiZwcnNpbTtcIixcIuKAs1wiOlwiJlByaW1lO1wiLFwi4oiPXCI6XCImcHJvZDtcIixcIuKInVwiOlwiJnZwcm9wO1wiLFwi8J2Sq1wiOlwiJlBzY3I7XCIsXCLOqFwiOlwiJlBzaTtcIiwnXCInOlwiJnF1b3Q7XCIsXCLwnZSUXCI6XCImUWZyO1wiLFwi4oSaXCI6XCImcmF0aW9uYWxzO1wiLFwi8J2SrFwiOlwiJlFzY3I7XCIsXCLipJBcIjpcIiZkcmJrYXJvdztcIixcIsKuXCI6XCImcmVnO1wiLFwixZRcIjpcIiZSYWN1dGU7XCIsXCLin6tcIjpcIiZSYW5nO1wiLFwi4oagXCI6XCImdHdvaGVhZHJpZ2h0YXJyb3c7XCIsXCLipJZcIjpcIiZSYXJydGw7XCIsXCLFmFwiOlwiJlJjYXJvbjtcIixcIsWWXCI6XCImUmNlZGlsO1wiLFwi0KBcIjpcIiZSY3k7XCIsXCLihJxcIjpcIiZyZWFscGFydDtcIixcIuKIi1wiOlwiJm5pdjtcIixcIuKHi1wiOlwiJmxyaGFyO1wiLFwi4qWvXCI6XCImZHVoYXI7XCIsXCLOoVwiOlwiJlJobztcIixcIuKfqVwiOlwiJnJhbmdsZTtcIixcIuKGklwiOlwiJnNyYXJyO1wiLFwi4oelXCI6XCImcmFycmI7XCIsXCLih4RcIjpcIiZybGFycjtcIixcIuKMiVwiOlwiJnJjZWlsO1wiLFwi4p+nXCI6XCImcm9icms7XCIsXCLipZ1cIjpcIiZSaWdodERvd25UZWVWZWN0b3I7XCIsXCLih4JcIjpcIiZkb3duaGFycG9vbnJpZ2h0O1wiLFwi4qWVXCI6XCImUmlnaHREb3duVmVjdG9yQmFyO1wiLFwi4oyLXCI6XCImcmZsb29yO1wiLFwi4oqiXCI6XCImdmRhc2g7XCIsXCLihqZcIjpcIiZtYXBzdG87XCIsXCLipZtcIjpcIiZSaWdodFRlZVZlY3RvcjtcIixcIuKKs1wiOlwiJnZydHJpO1wiLFwi4qeQXCI6XCImUmlnaHRUcmlhbmdsZUJhcjtcIixcIuKKtVwiOlwiJnRyaWFuZ2xlcmlnaHRlcTtcIixcIuKlj1wiOlwiJlJpZ2h0VXBEb3duVmVjdG9yO1wiLFwi4qWcXCI6XCImUmlnaHRVcFRlZVZlY3RvcjtcIixcIuKGvlwiOlwiJnVwaGFycG9vbnJpZ2h0O1wiLFwi4qWUXCI6XCImUmlnaHRVcFZlY3RvckJhcjtcIixcIuKHgFwiOlwiJnJpZ2h0aGFycG9vbnVwO1wiLFwi4qWTXCI6XCImUmlnaHRWZWN0b3JCYXI7XCIsXCLihJ1cIjpcIiZyZWFscztcIixcIuKlsFwiOlwiJlJvdW5kSW1wbGllcztcIixcIuKHm1wiOlwiJnJBYXJyO1wiLFwi4oSbXCI6XCImcmVhbGluZTtcIixcIuKGsVwiOlwiJnJzaDtcIixcIuKntFwiOlwiJlJ1bGVEZWxheWVkO1wiLFwi0KlcIjpcIiZTSENIY3k7XCIsXCLQqFwiOlwiJlNIY3k7XCIsXCLQrFwiOlwiJlNPRlRjeTtcIixcIsWaXCI6XCImU2FjdXRlO1wiLFwi4qq8XCI6XCImU2M7XCIsXCLFoFwiOlwiJlNjYXJvbjtcIixcIsWeXCI6XCImU2NlZGlsO1wiLFwixZxcIjpcIiZTY2lyYztcIixcItChXCI6XCImU2N5O1wiLFwi8J2UllwiOlwiJlNmcjtcIixcIuKGkVwiOlwiJnVwYXJyb3c7XCIsXCLOo1wiOlwiJlNpZ21hO1wiLFwi4oiYXCI6XCImY29tcGZuO1wiLFwi8J2VilwiOlwiJlNvcGY7XCIsXCLiiJpcIjpcIiZyYWRpYztcIixcIuKWoVwiOlwiJnNxdWFyZTtcIixcIuKKk1wiOlwiJnNxY2FwO1wiLFwi4oqPXCI6XCImc3FzdWJzZXQ7XCIsXCLiipFcIjpcIiZzcXN1YnNldGVxO1wiLFwi4oqQXCI6XCImc3FzdXBzZXQ7XCIsXCLiipJcIjpcIiZzcXN1cHNldGVxO1wiLFwi4oqUXCI6XCImc3FjdXA7XCIsXCLwnZKuXCI6XCImU3NjcjtcIixcIuKLhlwiOlwiJnNzdGFyZjtcIixcIuKLkFwiOlwiJlN1YnNldDtcIixcIuKKhlwiOlwiJnN1YnNldGVxO1wiLFwi4om7XCI6XCImc3VjYztcIixcIuKqsFwiOlwiJnN1Y2NlcTtcIixcIuKJvVwiOlwiJnN1Y2NjdXJseWVxO1wiLFwi4om/XCI6XCImc3VjY3NpbTtcIixcIuKIkVwiOlwiJnN1bTtcIixcIuKLkVwiOlwiJlN1cHNldDtcIixcIuKKg1wiOlwiJnN1cHNldDtcIixcIuKKh1wiOlwiJnN1cHNldGVxO1wiLFwiw55cIjpcIiZUSE9STjtcIixcIuKEolwiOlwiJnRyYWRlO1wiLFwi0ItcIjpcIiZUU0hjeTtcIixcItCmXCI6XCImVFNjeTtcIixcIlxcdFwiOlwiJlRhYjtcIixcIs6kXCI6XCImVGF1O1wiLFwixaRcIjpcIiZUY2Fyb247XCIsXCLFolwiOlwiJlRjZWRpbDtcIixcItCiXCI6XCImVGN5O1wiLFwi8J2Ul1wiOlwiJlRmcjtcIixcIuKItFwiOlwiJnRoZXJlZm9yZTtcIixcIs6YXCI6XCImVGhldGE7XCIsXCLigZ/igIpcIjpcIiZUaGlja1NwYWNlO1wiLFwi4oCJXCI6XCImdGhpbnNwO1wiLFwi4oi8XCI6XCImdGhrc2ltO1wiLFwi4omDXCI6XCImc2ltZXE7XCIsXCLiiYVcIjpcIiZjb25nO1wiLFwi4omIXCI6XCImdGhrYXA7XCIsXCLwnZWLXCI6XCImVG9wZjtcIixcIuKDm1wiOlwiJnRkb3Q7XCIsXCLwnZKvXCI6XCImVHNjcjtcIixcIsWmXCI6XCImVHN0cm9rO1wiLFwiw5pcIjpcIiZVYWN1dGU7XCIsXCLihp9cIjpcIiZVYXJyO1wiLFwi4qWJXCI6XCImVWFycm9jaXI7XCIsXCLQjlwiOlwiJlVicmN5O1wiLFwixaxcIjpcIiZVYnJldmU7XCIsXCLDm1wiOlwiJlVjaXJjO1wiLFwi0KNcIjpcIiZVY3k7XCIsXCLFsFwiOlwiJlVkYmxhYztcIixcIvCdlJhcIjpcIiZVZnI7XCIsXCLDmVwiOlwiJlVncmF2ZTtcIixcIsWqXCI6XCImVW1hY3I7XCIsXzpcIiZsb3diYXI7XCIsXCLij59cIjpcIiZVbmRlckJyYWNlO1wiLFwi4o61XCI6XCImYmJyaztcIixcIuKPnVwiOlwiJlVuZGVyUGFyZW50aGVzaXM7XCIsXCLii4NcIjpcIiZ4Y3VwO1wiLFwi4oqOXCI6XCImdXBsdXM7XCIsXCLFslwiOlwiJlVvZ29uO1wiLFwi8J2VjFwiOlwiJlVvcGY7XCIsXCLipJJcIjpcIiZVcEFycm93QmFyO1wiLFwi4oeFXCI6XCImdWRhcnI7XCIsXCLihpVcIjpcIiZ2YXJyO1wiLFwi4qWuXCI6XCImdWRoYXI7XCIsXCLiiqVcIjpcIiZwZXJwO1wiLFwi4oalXCI6XCImbWFwc3RvdXA7XCIsXCLihpZcIjpcIiZud2Fycm93O1wiLFwi4oaXXCI6XCImbmVhcnJvdztcIixcIs+SXCI6XCImdXBzaWg7XCIsXCLOpVwiOlwiJlVwc2lsb247XCIsXCLFrlwiOlwiJlVyaW5nO1wiLFwi8J2SsFwiOlwiJlVzY3I7XCIsXCLFqFwiOlwiJlV0aWxkZTtcIixcIsOcXCI6XCImVXVtbDtcIixcIuKKq1wiOlwiJlZEYXNoO1wiLFwi4qurXCI6XCImVmJhcjtcIixcItCSXCI6XCImVmN5O1wiLFwi4oqpXCI6XCImVmRhc2g7XCIsXCLiq6ZcIjpcIiZWZGFzaGw7XCIsXCLii4FcIjpcIiZ4dmVlO1wiLFwi4oCWXCI6XCImVmVydDtcIixcIuKIo1wiOlwiJnNtaWQ7XCIsXCJ8XCI6XCImdmVydDtcIixcIuKdmFwiOlwiJlZlcnRpY2FsU2VwYXJhdG9yO1wiLFwi4omAXCI6XCImd3JlYXRoO1wiLFwi4oCKXCI6XCImaGFpcnNwO1wiLFwi8J2UmVwiOlwiJlZmcjtcIixcIvCdlY1cIjpcIiZWb3BmO1wiLFwi8J2SsVwiOlwiJlZzY3I7XCIsXCLiiqpcIjpcIiZWdmRhc2g7XCIsXCLFtFwiOlwiJldjaXJjO1wiLFwi4ouAXCI6XCImeHdlZGdlO1wiLFwi8J2UmlwiOlwiJldmcjtcIixcIvCdlY5cIjpcIiZXb3BmO1wiLFwi8J2SslwiOlwiJldzY3I7XCIsXCLwnZSbXCI6XCImWGZyO1wiLFwizp5cIjpcIiZYaTtcIixcIvCdlY9cIjpcIiZYb3BmO1wiLFwi8J2Ss1wiOlwiJlhzY3I7XCIsXCLQr1wiOlwiJllBY3k7XCIsXCLQh1wiOlwiJllJY3k7XCIsXCLQrlwiOlwiJllVY3k7XCIsXCLDnVwiOlwiJllhY3V0ZTtcIixcIsW2XCI6XCImWWNpcmM7XCIsXCLQq1wiOlwiJlljeTtcIixcIvCdlJxcIjpcIiZZZnI7XCIsXCLwnZWQXCI6XCImWW9wZjtcIixcIvCdkrRcIjpcIiZZc2NyO1wiLFwixbhcIjpcIiZZdW1sO1wiLFwi0JZcIjpcIiZaSGN5O1wiLFwixblcIjpcIiZaYWN1dGU7XCIsXCLFvVwiOlwiJlpjYXJvbjtcIixcItCXXCI6XCImWmN5O1wiLFwixbtcIjpcIiZaZG90O1wiLFwizpZcIjpcIiZaZXRhO1wiLFwi4oSoXCI6XCImemVldHJmO1wiLFwi4oSkXCI6XCImaW50ZWdlcnM7XCIsXCLwnZK1XCI6XCImWnNjcjtcIixcIsOhXCI6XCImYWFjdXRlO1wiLFwixINcIjpcIiZhYnJldmU7XCIsXCLiiL5cIjpcIiZtc3Rwb3M7XCIsXCLiiL7Ms1wiOlwiJmFjRTtcIixcIuKIv1wiOlwiJmFjZDtcIixcIsOiXCI6XCImYWNpcmM7XCIsXCLQsFwiOlwiJmFjeTtcIixcIsOmXCI6XCImYWVsaWc7XCIsXCLwnZSeXCI6XCImYWZyO1wiLFwiw6BcIjpcIiZhZ3JhdmU7XCIsXCLihLVcIjpcIiZhbGVwaDtcIixcIs6xXCI6XCImYWxwaGE7XCIsXCLEgVwiOlwiJmFtYWNyO1wiLFwi4qi/XCI6XCImYW1hbGc7XCIsXCLiiKdcIjpcIiZ3ZWRnZTtcIixcIuKplVwiOlwiJmFuZGFuZDtcIixcIuKpnFwiOlwiJmFuZGQ7XCIsXCLiqZhcIjpcIiZhbmRzbG9wZTtcIixcIuKpmlwiOlwiJmFuZHY7XCIsXCLiiKBcIjpcIiZhbmdsZTtcIixcIuKmpFwiOlwiJmFuZ2U7XCIsXCLiiKFcIjpcIiZtZWFzdXJlZGFuZ2xlO1wiLFwi4qaoXCI6XCImYW5nbXNkYWE7XCIsXCLipqlcIjpcIiZhbmdtc2RhYjtcIixcIuKmqlwiOlwiJmFuZ21zZGFjO1wiLFwi4qarXCI6XCImYW5nbXNkYWQ7XCIsXCLipqxcIjpcIiZhbmdtc2RhZTtcIixcIuKmrVwiOlwiJmFuZ21zZGFmO1wiLFwi4qauXCI6XCImYW5nbXNkYWc7XCIsXCLipq9cIjpcIiZhbmdtc2RhaDtcIixcIuKIn1wiOlwiJmFuZ3J0O1wiLFwi4oq+XCI6XCImYW5ncnR2YjtcIixcIuKmnVwiOlwiJmFuZ3J0dmJkO1wiLFwi4oiiXCI6XCImYW5nc3BoO1wiLFwi4o28XCI6XCImYW5nemFycjtcIixcIsSFXCI6XCImYW9nb247XCIsXCLwnZWSXCI6XCImYW9wZjtcIixcIuKpsFwiOlwiJmFwRTtcIixcIuKpr1wiOlwiJmFwYWNpcjtcIixcIuKJilwiOlwiJmFwcHJveGVxO1wiLFwi4omLXCI6XCImYXBpZDtcIixcIidcIjpcIiZhcG9zO1wiLFwiw6VcIjpcIiZhcmluZztcIixcIvCdkrZcIjpcIiZhc2NyO1wiLFwiKlwiOlwiJm1pZGFzdDtcIixcIsOjXCI6XCImYXRpbGRlO1wiLFwiw6RcIjpcIiZhdW1sO1wiLFwi4qiRXCI6XCImYXdpbnQ7XCIsXCLiq61cIjpcIiZiTm90O1wiLFwi4omMXCI6XCImYmNvbmc7XCIsXCLPtlwiOlwiJmJlcHNpO1wiLFwi4oC1XCI6XCImYnByaW1lO1wiLFwi4oi9XCI6XCImYnNpbTtcIixcIuKLjVwiOlwiJmJzaW1lO1wiLFwi4oq9XCI6XCImYmFydmVlO1wiLFwi4oyFXCI6XCImYmFyd2VkZ2U7XCIsXCLijrZcIjpcIiZiYnJrdGJyaztcIixcItCxXCI6XCImYmN5O1wiLFwi4oCeXCI6XCImbGRxdW9yO1wiLFwi4qawXCI6XCImYmVtcHR5djtcIixcIs6yXCI6XCImYmV0YTtcIixcIuKEtlwiOlwiJmJldGg7XCIsXCLiiaxcIjpcIiZ0d2l4dDtcIixcIvCdlJ9cIjpcIiZiZnI7XCIsXCLil69cIjpcIiZ4Y2lyYztcIixcIuKogFwiOlwiJnhvZG90O1wiLFwi4qiBXCI6XCImeG9wbHVzO1wiLFwi4qiCXCI6XCImeG90aW1lO1wiLFwi4qiGXCI6XCImeHNxY3VwO1wiLFwi4piFXCI6XCImc3RhcmY7XCIsXCLilr1cIjpcIiZ4ZHRyaTtcIixcIuKWs1wiOlwiJnh1dHJpO1wiLFwi4qiEXCI6XCImeHVwbHVzO1wiLFwi4qSNXCI6XCImcmJhcnI7XCIsXCLip6tcIjpcIiZsb3pmO1wiLFwi4pa0XCI6XCImdXRyaWY7XCIsXCLilr5cIjpcIiZkdHJpZjtcIixcIuKXglwiOlwiJmx0cmlmO1wiLFwi4pa4XCI6XCImcnRyaWY7XCIsXCLikKNcIjpcIiZibGFuaztcIixcIuKWklwiOlwiJmJsazEyO1wiLFwi4paRXCI6XCImYmxrMTQ7XCIsXCLilpNcIjpcIiZibGszNDtcIixcIuKWiFwiOlwiJmJsb2NrO1wiLFwiPeKDpVwiOlwiJmJuZTtcIixcIuKJoeKDpVwiOlwiJmJuZXF1aXY7XCIsXCLijJBcIjpcIiZibm90O1wiLFwi8J2Vk1wiOlwiJmJvcGY7XCIsXCLii4hcIjpcIiZib3d0aWU7XCIsXCLilZdcIjpcIiZib3hETDtcIixcIuKVlFwiOlwiJmJveERSO1wiLFwi4pWWXCI6XCImYm94RGw7XCIsXCLilZNcIjpcIiZib3hEcjtcIixcIuKVkFwiOlwiJmJveEg7XCIsXCLilaZcIjpcIiZib3hIRDtcIixcIuKVqVwiOlwiJmJveEhVO1wiLFwi4pWkXCI6XCImYm94SGQ7XCIsXCLiladcIjpcIiZib3hIdTtcIixcIuKVnVwiOlwiJmJveFVMO1wiLFwi4pWaXCI6XCImYm94VVI7XCIsXCLilZxcIjpcIiZib3hVbDtcIixcIuKVmVwiOlwiJmJveFVyO1wiLFwi4pWRXCI6XCImYm94VjtcIixcIuKVrFwiOlwiJmJveFZIO1wiLFwi4pWjXCI6XCImYm94Vkw7XCIsXCLilaBcIjpcIiZib3hWUjtcIixcIuKVq1wiOlwiJmJveFZoO1wiLFwi4pWiXCI6XCImYm94Vmw7XCIsXCLilZ9cIjpcIiZib3hWcjtcIixcIuKniVwiOlwiJmJveGJveDtcIixcIuKVlVwiOlwiJmJveGRMO1wiLFwi4pWSXCI6XCImYm94ZFI7XCIsXCLilJBcIjpcIiZib3hkbDtcIixcIuKUjFwiOlwiJmJveGRyO1wiLFwi4pWlXCI6XCImYm94aEQ7XCIsXCLilahcIjpcIiZib3hoVTtcIixcIuKUrFwiOlwiJmJveGhkO1wiLFwi4pS0XCI6XCImYm94aHU7XCIsXCLiip9cIjpcIiZtaW51c2I7XCIsXCLiip5cIjpcIiZwbHVzYjtcIixcIuKKoFwiOlwiJnRpbWVzYjtcIixcIuKVm1wiOlwiJmJveHVMO1wiLFwi4pWYXCI6XCImYm94dVI7XCIsXCLilJhcIjpcIiZib3h1bDtcIixcIuKUlFwiOlwiJmJveHVyO1wiLFwi4pSCXCI6XCImYm94djtcIixcIuKVqlwiOlwiJmJveHZIO1wiLFwi4pWhXCI6XCImYm94dkw7XCIsXCLilZ5cIjpcIiZib3h2UjtcIixcIuKUvFwiOlwiJmJveHZoO1wiLFwi4pSkXCI6XCImYm94dmw7XCIsXCLilJxcIjpcIiZib3h2cjtcIixcIsKmXCI6XCImYnJ2YmFyO1wiLFwi8J2St1wiOlwiJmJzY3I7XCIsXCLigY9cIjpcIiZic2VtaTtcIixcIlxcXFxcIjpcIiZic29sO1wiLFwi4qeFXCI6XCImYnNvbGI7XCIsXCLin4hcIjpcIiZic29saHN1YjtcIixcIuKAolwiOlwiJmJ1bGxldDtcIixcIuKqrlwiOlwiJmJ1bXBFO1wiLFwixIdcIjpcIiZjYWN1dGU7XCIsXCLiiKlcIjpcIiZjYXA7XCIsXCLiqYRcIjpcIiZjYXBhbmQ7XCIsXCLiqYlcIjpcIiZjYXBicmN1cDtcIixcIuKpi1wiOlwiJmNhcGNhcDtcIixcIuKph1wiOlwiJmNhcGN1cDtcIixcIuKpgFwiOlwiJmNhcGRvdDtcIixcIuKIqe+4gFwiOlwiJmNhcHM7XCIsXCLigYFcIjpcIiZjYXJldDtcIixcIuKpjVwiOlwiJmNjYXBzO1wiLFwixI1cIjpcIiZjY2Fyb247XCIsXCLDp1wiOlwiJmNjZWRpbDtcIixcIsSJXCI6XCImY2NpcmM7XCIsXCLiqYxcIjpcIiZjY3VwcztcIixcIuKpkFwiOlwiJmNjdXBzc207XCIsXCLEi1wiOlwiJmNkb3Q7XCIsXCLiprJcIjpcIiZjZW1wdHl2O1wiLFwiwqJcIjpcIiZjZW50O1wiLFwi8J2UoFwiOlwiJmNmcjtcIixcItGHXCI6XCImY2hjeTtcIixcIuKck1wiOlwiJmNoZWNrbWFyaztcIixcIs+HXCI6XCImY2hpO1wiLFwi4peLXCI6XCImY2lyO1wiLFwi4qeDXCI6XCImY2lyRTtcIixcIsuGXCI6XCImY2lyYztcIixcIuKJl1wiOlwiJmNpcmU7XCIsXCLihrpcIjpcIiZvbGFycjtcIixcIuKGu1wiOlwiJm9yYXJyO1wiLFwi4pOIXCI6XCImb1M7XCIsXCLiiptcIjpcIiZvYXN0O1wiLFwi4oqaXCI6XCImb2NpcjtcIixcIuKKnVwiOlwiJm9kYXNoO1wiLFwi4qiQXCI6XCImY2lyZm5pbnQ7XCIsXCLiq69cIjpcIiZjaXJtaWQ7XCIsXCLip4JcIjpcIiZjaXJzY2lyO1wiLFwi4pmjXCI6XCImY2x1YnN1aXQ7XCIsXCI6XCI6XCImY29sb247XCIsXCIsXCI6XCImY29tbWE7XCIsXCJAXCI6XCImY29tbWF0O1wiLFwi4oiBXCI6XCImY29tcGxlbWVudDtcIixcIuKprVwiOlwiJmNvbmdkb3Q7XCIsXCLwnZWUXCI6XCImY29wZjtcIixcIuKEl1wiOlwiJmNvcHlzcjtcIixcIuKGtVwiOlwiJmNyYXJyO1wiLFwi4pyXXCI6XCImY3Jvc3M7XCIsXCLwnZK4XCI6XCImY3NjcjtcIixcIuKrj1wiOlwiJmNzdWI7XCIsXCLiq5FcIjpcIiZjc3ViZTtcIixcIuKrkFwiOlwiJmNzdXA7XCIsXCLiq5JcIjpcIiZjc3VwZTtcIixcIuKLr1wiOlwiJmN0ZG90O1wiLFwi4qS4XCI6XCImY3VkYXJybDtcIixcIuKktVwiOlwiJmN1ZGFycnI7XCIsXCLii55cIjpcIiZjdXJseWVxcHJlYztcIixcIuKLn1wiOlwiJmN1cmx5ZXFzdWNjO1wiLFwi4oa2XCI6XCImY3VydmVhcnJvd2xlZnQ7XCIsXCLipL1cIjpcIiZjdWxhcnJwO1wiLFwi4oiqXCI6XCImY3VwO1wiLFwi4qmIXCI6XCImY3VwYnJjYXA7XCIsXCLiqYZcIjpcIiZjdXBjYXA7XCIsXCLiqYpcIjpcIiZjdXBjdXA7XCIsXCLiio1cIjpcIiZjdXBkb3Q7XCIsXCLiqYVcIjpcIiZjdXBvcjtcIixcIuKIqu+4gFwiOlwiJmN1cHM7XCIsXCLihrdcIjpcIiZjdXJ2ZWFycm93cmlnaHQ7XCIsXCLipLxcIjpcIiZjdXJhcnJtO1wiLFwi4ouOXCI6XCImY3V2ZWU7XCIsXCLii49cIjpcIiZjdXdlZDtcIixcIsKkXCI6XCImY3VycmVuO1wiLFwi4oixXCI6XCImY3dpbnQ7XCIsXCLijK1cIjpcIiZjeWxjdHk7XCIsXCLipaVcIjpcIiZkSGFyO1wiLFwi4oCgXCI6XCImZGFnZ2VyO1wiLFwi4oS4XCI6XCImZGFsZXRoO1wiLFwi4oCQXCI6XCImaHlwaGVuO1wiLFwi4qSPXCI6XCImckJhcnI7XCIsXCLEj1wiOlwiJmRjYXJvbjtcIixcItC0XCI6XCImZGN5O1wiLFwi4oeKXCI6XCImZG93bmRvd25hcnJvd3M7XCIsXCLiqbdcIjpcIiZlRERvdDtcIixcIsKwXCI6XCImZGVnO1wiLFwizrRcIjpcIiZkZWx0YTtcIixcIuKmsVwiOlwiJmRlbXB0eXY7XCIsXCLipb9cIjpcIiZkZmlzaHQ7XCIsXCLwnZShXCI6XCImZGZyO1wiLFwi4pmmXCI6XCImZGlhbXM7XCIsXCLPnVwiOlwiJmdhbW1hZDtcIixcIuKLslwiOlwiJmRpc2luO1wiLFwiw7dcIjpcIiZkaXZpZGU7XCIsXCLii4dcIjpcIiZkaXZvbng7XCIsXCLRklwiOlwiJmRqY3k7XCIsXCLijJ5cIjpcIiZsbGNvcm5lcjtcIixcIuKMjVwiOlwiJmRsY3JvcDtcIiwkOlwiJmRvbGxhcjtcIixcIvCdlZVcIjpcIiZkb3BmO1wiLFwi4omRXCI6XCImZURvdDtcIixcIuKIuFwiOlwiJm1pbnVzZDtcIixcIuKIlFwiOlwiJnBsdXNkbztcIixcIuKKoVwiOlwiJnNkb3RiO1wiLFwi4oyfXCI6XCImbHJjb3JuZXI7XCIsXCLijIxcIjpcIiZkcmNyb3A7XCIsXCLwnZK5XCI6XCImZHNjcjtcIixcItGVXCI6XCImZHNjeTtcIixcIuKntlwiOlwiJmRzb2w7XCIsXCLEkVwiOlwiJmRzdHJvaztcIixcIuKLsVwiOlwiJmR0ZG90O1wiLFwi4pa/XCI6XCImdHJpYW5nbGVkb3duO1wiLFwi4qamXCI6XCImZHdhbmdsZTtcIixcItGfXCI6XCImZHpjeTtcIixcIuKfv1wiOlwiJmR6aWdyYXJyO1wiLFwiw6lcIjpcIiZlYWN1dGU7XCIsXCLiqa5cIjpcIiZlYXN0ZXI7XCIsXCLEm1wiOlwiJmVjYXJvbjtcIixcIuKJllwiOlwiJmVxY2lyYztcIixcIsOqXCI6XCImZWNpcmM7XCIsXCLiiZVcIjpcIiZlcWNvbG9uO1wiLFwi0Y1cIjpcIiZlY3k7XCIsXCLEl1wiOlwiJmVkb3Q7XCIsXCLiiZJcIjpcIiZmYWxsaW5nZG90c2VxO1wiLFwi8J2UolwiOlwiJmVmcjtcIixcIuKqmlwiOlwiJmVnO1wiLFwiw6hcIjpcIiZlZ3JhdmU7XCIsXCLiqpZcIjpcIiZlcXNsYW50Z3RyO1wiLFwi4qqYXCI6XCImZWdzZG90O1wiLFwi4qqZXCI6XCImZWw7XCIsXCLij6dcIjpcIiZlbGludGVycztcIixcIuKEk1wiOlwiJmVsbDtcIixcIuKqlVwiOlwiJmVxc2xhbnRsZXNzO1wiLFwi4qqXXCI6XCImZWxzZG90O1wiLFwixJNcIjpcIiZlbWFjcjtcIixcIuKIhVwiOlwiJnZhcm5vdGhpbmc7XCIsXCLigIRcIjpcIiZlbXNwMTM7XCIsXCLigIVcIjpcIiZlbXNwMTQ7XCIsXCLigINcIjpcIiZlbXNwO1wiLFwixYtcIjpcIiZlbmc7XCIsXCLigIJcIjpcIiZlbnNwO1wiLFwixJlcIjpcIiZlb2dvbjtcIixcIvCdlZZcIjpcIiZlb3BmO1wiLFwi4ouVXCI6XCImZXBhcjtcIixcIuKno1wiOlwiJmVwYXJzbDtcIixcIuKpsVwiOlwiJmVwbHVzO1wiLFwizrVcIjpcIiZlcHNpbG9uO1wiLFwiz7VcIjpcIiZ2YXJlcHNpbG9uO1wiLFwiPVwiOlwiJmVxdWFscztcIixcIuKJn1wiOlwiJnF1ZXN0ZXE7XCIsXCLiqbhcIjpcIiZlcXVpdkREO1wiLFwi4qelXCI6XCImZXF2cGFyc2w7XCIsXCLiiZNcIjpcIiZyaXNpbmdkb3RzZXE7XCIsXCLipbFcIjpcIiZlcmFycjtcIixcIuKEr1wiOlwiJmVzY3I7XCIsXCLOt1wiOlwiJmV0YTtcIixcIsOwXCI6XCImZXRoO1wiLFwiw6tcIjpcIiZldW1sO1wiLFwi4oKsXCI6XCImZXVybztcIixcIiFcIjpcIiZleGNsO1wiLFwi0YRcIjpcIiZmY3k7XCIsXCLimYBcIjpcIiZmZW1hbGU7XCIsXCLvrINcIjpcIiZmZmlsaWc7XCIsXCLvrIBcIjpcIiZmZmxpZztcIixcIu+shFwiOlwiJmZmbGxpZztcIixcIvCdlKNcIjpcIiZmZnI7XCIsXCLvrIFcIjpcIiZmaWxpZztcIixmajpcIiZmamxpZztcIixcIuKZrVwiOlwiJmZsYXQ7XCIsXCLvrIJcIjpcIiZmbGxpZztcIixcIuKWsVwiOlwiJmZsdG5zO1wiLFwixpJcIjpcIiZmbm9mO1wiLFwi8J2Vl1wiOlwiJmZvcGY7XCIsXCLii5RcIjpcIiZwaXRjaGZvcms7XCIsXCLiq5lcIjpcIiZmb3JrdjtcIixcIuKojVwiOlwiJmZwYXJ0aW50O1wiLFwiwr1cIjpcIiZoYWxmO1wiLFwi4oWTXCI6XCImZnJhYzEzO1wiLFwiwrxcIjpcIiZmcmFjMTQ7XCIsXCLihZVcIjpcIiZmcmFjMTU7XCIsXCLihZlcIjpcIiZmcmFjMTY7XCIsXCLihZtcIjpcIiZmcmFjMTg7XCIsXCLihZRcIjpcIiZmcmFjMjM7XCIsXCLihZZcIjpcIiZmcmFjMjU7XCIsXCLCvlwiOlwiJmZyYWMzNDtcIixcIuKFl1wiOlwiJmZyYWMzNTtcIixcIuKFnFwiOlwiJmZyYWMzODtcIixcIuKFmFwiOlwiJmZyYWM0NTtcIixcIuKFmlwiOlwiJmZyYWM1NjtcIixcIuKFnVwiOlwiJmZyYWM1ODtcIixcIuKFnlwiOlwiJmZyYWM3ODtcIixcIuKBhFwiOlwiJmZyYXNsO1wiLFwi4oyiXCI6XCImc2Zyb3duO1wiLFwi8J2Su1wiOlwiJmZzY3I7XCIsXCLiqoxcIjpcIiZndHJlcXFsZXNzO1wiLFwix7VcIjpcIiZnYWN1dGU7XCIsXCLOs1wiOlwiJmdhbW1hO1wiLFwi4qqGXCI6XCImZ3RyYXBwcm94O1wiLFwixJ9cIjpcIiZnYnJldmU7XCIsXCLEnVwiOlwiJmdjaXJjO1wiLFwi0LNcIjpcIiZnY3k7XCIsXCLEoVwiOlwiJmdkb3Q7XCIsXCLiqqlcIjpcIiZnZXNjYztcIixcIuKqgFwiOlwiJmdlc2RvdDtcIixcIuKqglwiOlwiJmdlc2RvdG87XCIsXCLiqoRcIjpcIiZnZXNkb3RvbDtcIixcIuKLm++4gFwiOlwiJmdlc2w7XCIsXCLiqpRcIjpcIiZnZXNsZXM7XCIsXCLwnZSkXCI6XCImZ2ZyO1wiLFwi4oS3XCI6XCImZ2ltZWw7XCIsXCLRk1wiOlwiJmdqY3k7XCIsXCLiqpJcIjpcIiZnbEU7XCIsXCLiqqVcIjpcIiZnbGE7XCIsXCLiqqRcIjpcIiZnbGo7XCIsXCLiialcIjpcIiZnbmVxcTtcIixcIuKqilwiOlwiJmduYXBwcm94O1wiLFwi4qqIXCI6XCImZ25lcTtcIixcIuKLp1wiOlwiJmduc2ltO1wiLFwi8J2VmFwiOlwiJmdvcGY7XCIsXCLihIpcIjpcIiZnc2NyO1wiLFwi4qqOXCI6XCImZ3NpbWU7XCIsXCLiqpBcIjpcIiZnc2ltbDtcIixcIuKqp1wiOlwiJmd0Y2M7XCIsXCLiqbpcIjpcIiZndGNpcjtcIixcIuKLl1wiOlwiJmd0cmRvdDtcIixcIuKmlVwiOlwiJmd0bFBhcjtcIixcIuKpvFwiOlwiJmd0cXVlc3Q7XCIsXCLipbhcIjpcIiZndHJhcnI7XCIsXCLiianvuIBcIjpcIiZndm5FO1wiLFwi0YpcIjpcIiZoYXJkY3k7XCIsXCLipYhcIjpcIiZoYXJyY2lyO1wiLFwi4oatXCI6XCImbGVmdHJpZ2h0c3F1aWdhcnJvdztcIixcIuKEj1wiOlwiJnBsYW5rdjtcIixcIsSlXCI6XCImaGNpcmM7XCIsXCLimaVcIjpcIiZoZWFydHN1aXQ7XCIsXCLigKZcIjpcIiZtbGRyO1wiLFwi4oq5XCI6XCImaGVyY29uO1wiLFwi8J2UpVwiOlwiJmhmcjtcIixcIuKkpVwiOlwiJnNlYXJoaztcIixcIuKkplwiOlwiJnN3YXJoaztcIixcIuKHv1wiOlwiJmhvYXJyO1wiLFwi4oi7XCI6XCImaG9tdGh0O1wiLFwi4oapXCI6XCImbGFycmhrO1wiLFwi4oaqXCI6XCImcmFycmhrO1wiLFwi8J2VmVwiOlwiJmhvcGY7XCIsXCLigJVcIjpcIiZob3JiYXI7XCIsXCLwnZK9XCI6XCImaHNjcjtcIixcIsSnXCI6XCImaHN0cm9rO1wiLFwi4oGDXCI6XCImaHlidWxsO1wiLFwiw61cIjpcIiZpYWN1dGU7XCIsXCLDrlwiOlwiJmljaXJjO1wiLFwi0LhcIjpcIiZpY3k7XCIsXCLQtVwiOlwiJmllY3k7XCIsXCLCoVwiOlwiJmlleGNsO1wiLFwi8J2UplwiOlwiJmlmcjtcIixcIsOsXCI6XCImaWdyYXZlO1wiLFwi4qiMXCI6XCImcWludDtcIixcIuKIrVwiOlwiJnRpbnQ7XCIsXCLip5xcIjpcIiZpaW5maW47XCIsXCLihKlcIjpcIiZpaW90YTtcIixcIsSzXCI6XCImaWpsaWc7XCIsXCLEq1wiOlwiJmltYWNyO1wiLFwixLFcIjpcIiZpbm9kb3Q7XCIsXCLiirdcIjpcIiZpbW9mO1wiLFwixrVcIjpcIiZpbXBlZDtcIixcIuKEhVwiOlwiJmluY2FyZTtcIixcIuKInlwiOlwiJmluZmluO1wiLFwi4qedXCI6XCImaW5maW50aWU7XCIsXCLiirpcIjpcIiZpbnRlcmNhbDtcIixcIuKol1wiOlwiJmludGxhcmhrO1wiLFwi4qi8XCI6XCImaXByb2Q7XCIsXCLRkVwiOlwiJmlvY3k7XCIsXCLEr1wiOlwiJmlvZ29uO1wiLFwi8J2VmlwiOlwiJmlvcGY7XCIsXCLOuVwiOlwiJmlvdGE7XCIsXCLCv1wiOlwiJmlxdWVzdDtcIixcIvCdkr5cIjpcIiZpc2NyO1wiLFwi4ou5XCI6XCImaXNpbkU7XCIsXCLii7VcIjpcIiZpc2luZG90O1wiLFwi4ou0XCI6XCImaXNpbnM7XCIsXCLii7NcIjpcIiZpc2luc3Y7XCIsXCLEqVwiOlwiJml0aWxkZTtcIixcItGWXCI6XCImaXVrY3k7XCIsXCLDr1wiOlwiJml1bWw7XCIsXCLEtVwiOlwiJmpjaXJjO1wiLFwi0LlcIjpcIiZqY3k7XCIsXCLwnZSnXCI6XCImamZyO1wiLFwiyLdcIjpcIiZqbWF0aDtcIixcIvCdlZtcIjpcIiZqb3BmO1wiLFwi8J2Sv1wiOlwiJmpzY3I7XCIsXCLRmFwiOlwiJmpzZXJjeTtcIixcItGUXCI6XCImanVrY3k7XCIsXCLOulwiOlwiJmthcHBhO1wiLFwiz7BcIjpcIiZ2YXJrYXBwYTtcIixcIsS3XCI6XCIma2NlZGlsO1wiLFwi0LpcIjpcIiZrY3k7XCIsXCLwnZSoXCI6XCIma2ZyO1wiLFwixLhcIjpcIiZrZ3JlZW47XCIsXCLRhVwiOlwiJmtoY3k7XCIsXCLRnFwiOlwiJmtqY3k7XCIsXCLwnZWcXCI6XCIma29wZjtcIixcIvCdk4BcIjpcIiZrc2NyO1wiLFwi4qSbXCI6XCImbEF0YWlsO1wiLFwi4qSOXCI6XCImbEJhcnI7XCIsXCLiqotcIjpcIiZsZXNzZXFxZ3RyO1wiLFwi4qWiXCI6XCImbEhhcjtcIixcIsS6XCI6XCImbGFjdXRlO1wiLFwi4qa0XCI6XCImbGFlbXB0eXY7XCIsXCLOu1wiOlwiJmxhbWJkYTtcIixcIuKmkVwiOlwiJmxhbmdkO1wiLFwi4qqFXCI6XCImbGVzc2FwcHJveDtcIixcIsKrXCI6XCImbGFxdW87XCIsXCLipJ9cIjpcIiZsYXJyYmZzO1wiLFwi4qSdXCI6XCImbGFycmZzO1wiLFwi4oarXCI6XCImbG9vcGFycm93bGVmdDtcIixcIuKkuVwiOlwiJmxhcnJwbDtcIixcIuKls1wiOlwiJmxhcnJzaW07XCIsXCLihqJcIjpcIiZsZWZ0YXJyb3d0YWlsO1wiLFwi4qqrXCI6XCImbGF0O1wiLFwi4qSZXCI6XCImbGF0YWlsO1wiLFwi4qqtXCI6XCImbGF0ZTtcIixcIuKqre+4gFwiOlwiJmxhdGVzO1wiLFwi4qSMXCI6XCImbGJhcnI7XCIsXCLinbJcIjpcIiZsYmJyaztcIixcIntcIjpcIiZsY3ViO1wiLFwiW1wiOlwiJmxzcWI7XCIsXCLipotcIjpcIiZsYnJrZTtcIixcIuKmj1wiOlwiJmxicmtzbGQ7XCIsXCLipo1cIjpcIiZsYnJrc2x1O1wiLFwixL5cIjpcIiZsY2Fyb247XCIsXCLEvFwiOlwiJmxjZWRpbDtcIixcItC7XCI6XCImbGN5O1wiLFwi4qS2XCI6XCImbGRjYTtcIixcIuKlp1wiOlwiJmxkcmRoYXI7XCIsXCLipYtcIjpcIiZsZHJ1c2hhcjtcIixcIuKGslwiOlwiJmxkc2g7XCIsXCLiiaRcIjpcIiZsZXE7XCIsXCLih4dcIjpcIiZsbGFycjtcIixcIuKLi1wiOlwiJmx0aHJlZTtcIixcIuKqqFwiOlwiJmxlc2NjO1wiLFwi4qm/XCI6XCImbGVzZG90O1wiLFwi4qqBXCI6XCImbGVzZG90bztcIixcIuKqg1wiOlwiJmxlc2RvdG9yO1wiLFwi4oua77iAXCI6XCImbGVzZztcIixcIuKqk1wiOlwiJmxlc2dlcztcIixcIuKLllwiOlwiJmx0ZG90O1wiLFwi4qW8XCI6XCImbGZpc2h0O1wiLFwi8J2UqVwiOlwiJmxmcjtcIixcIuKqkVwiOlwiJmxnRTtcIixcIuKlqlwiOlwiJmxoYXJ1bDtcIixcIuKWhFwiOlwiJmxoYmxrO1wiLFwi0ZlcIjpcIiZsamN5O1wiLFwi4qWrXCI6XCImbGxoYXJkO1wiLFwi4pe6XCI6XCImbGx0cmk7XCIsXCLFgFwiOlwiJmxtaWRvdDtcIixcIuKOsFwiOlwiJmxtb3VzdGFjaGU7XCIsXCLiiahcIjpcIiZsbmVxcTtcIixcIuKqiVwiOlwiJmxuYXBwcm94O1wiLFwi4qqHXCI6XCImbG5lcTtcIixcIuKLplwiOlwiJmxuc2ltO1wiLFwi4p+sXCI6XCImbG9hbmc7XCIsXCLih71cIjpcIiZsb2FycjtcIixcIuKfvFwiOlwiJnhtYXA7XCIsXCLihqxcIjpcIiZyYXJybHA7XCIsXCLipoVcIjpcIiZsb3BhcjtcIixcIvCdlZ1cIjpcIiZsb3BmO1wiLFwi4qitXCI6XCImbG9wbHVzO1wiLFwi4qi0XCI6XCImbG90aW1lcztcIixcIuKIl1wiOlwiJmxvd2FzdDtcIixcIuKXilwiOlwiJmxvemVuZ2U7XCIsXCIoXCI6XCImbHBhcjtcIixcIuKmk1wiOlwiJmxwYXJsdDtcIixcIuKlrVwiOlwiJmxyaGFyZDtcIixcIuKAjlwiOlwiJmxybTtcIixcIuKKv1wiOlwiJmxydHJpO1wiLFwi4oC5XCI6XCImbHNhcXVvO1wiLFwi8J2TgVwiOlwiJmxzY3I7XCIsXCLiqo1cIjpcIiZsc2ltZTtcIixcIuKqj1wiOlwiJmxzaW1nO1wiLFwi4oCaXCI6XCImc2JxdW87XCIsXCLFglwiOlwiJmxzdHJvaztcIixcIuKqplwiOlwiJmx0Y2M7XCIsXCLiqblcIjpcIiZsdGNpcjtcIixcIuKLiVwiOlwiJmx0aW1lcztcIixcIuKltlwiOlwiJmx0bGFycjtcIixcIuKpu1wiOlwiJmx0cXVlc3Q7XCIsXCLippZcIjpcIiZsdHJQYXI7XCIsXCLil4NcIjpcIiZ0cmlhbmdsZWxlZnQ7XCIsXCLipYpcIjpcIiZsdXJkc2hhcjtcIixcIuKlplwiOlwiJmx1cnVoYXI7XCIsXCLiiajvuIBcIjpcIiZsdm5FO1wiLFwi4oi6XCI6XCImbUREb3Q7XCIsXCLCr1wiOlwiJnN0cm5zO1wiLFwi4pmCXCI6XCImbWFsZTtcIixcIuKcoFwiOlwiJm1hbHRlc2U7XCIsXCLilq5cIjpcIiZtYXJrZXI7XCIsXCLiqKlcIjpcIiZtY29tbWE7XCIsXCLQvFwiOlwiJm1jeTtcIixcIuKAlFwiOlwiJm1kYXNoO1wiLFwi8J2UqlwiOlwiJm1mcjtcIixcIuKEp1wiOlwiJm1obztcIixcIsK1XCI6XCImbWljcm87XCIsXCLiq7BcIjpcIiZtaWRjaXI7XCIsXCLiiJJcIjpcIiZtaW51cztcIixcIuKoqlwiOlwiJm1pbnVzZHU7XCIsXCLiq5tcIjpcIiZtbGNwO1wiLFwi4oqnXCI6XCImbW9kZWxzO1wiLFwi8J2VnlwiOlwiJm1vcGY7XCIsXCLwnZOCXCI6XCImbXNjcjtcIixcIs68XCI6XCImbXU7XCIsXCLiirhcIjpcIiZtdW1hcDtcIixcIuKLmcy4XCI6XCImbkdnO1wiLFwi4omr4oOSXCI6XCImbkd0O1wiLFwi4oeNXCI6XCImbmxBcnI7XCIsXCLih45cIjpcIiZuaEFycjtcIixcIuKLmMy4XCI6XCImbkxsO1wiLFwi4omq4oOSXCI6XCImbkx0O1wiLFwi4oePXCI6XCImbnJBcnI7XCIsXCLiiq9cIjpcIiZuVkRhc2g7XCIsXCLiiq5cIjpcIiZuVmRhc2g7XCIsXCLFhFwiOlwiJm5hY3V0ZTtcIixcIuKIoOKDklwiOlwiJm5hbmc7XCIsXCLiqbDMuFwiOlwiJm5hcEU7XCIsXCLiiYvMuFwiOlwiJm5hcGlkO1wiLFwixYlcIjpcIiZuYXBvcztcIixcIuKZrlwiOlwiJm5hdHVyYWw7XCIsXCLiqYNcIjpcIiZuY2FwO1wiLFwixYhcIjpcIiZuY2Fyb247XCIsXCLFhlwiOlwiJm5jZWRpbDtcIixcIuKprcy4XCI6XCImbmNvbmdkb3Q7XCIsXCLiqYJcIjpcIiZuY3VwO1wiLFwi0L1cIjpcIiZuY3k7XCIsXCLigJNcIjpcIiZuZGFzaDtcIixcIuKHl1wiOlwiJm5lQXJyO1wiLFwi4qSkXCI6XCImbmVhcmhrO1wiLFwi4omQzLhcIjpcIiZuZWRvdDtcIixcIuKkqFwiOlwiJnRvZWE7XCIsXCLwnZSrXCI6XCImbmZyO1wiLFwi4oauXCI6XCImbmxlZnRyaWdodGFycm93O1wiLFwi4quyXCI6XCImbmhwYXI7XCIsXCLii7xcIjpcIiZuaXM7XCIsXCLii7pcIjpcIiZuaXNkO1wiLFwi0ZpcIjpcIiZuamN5O1wiLFwi4ommzLhcIjpcIiZubGVxcTtcIixcIuKGmlwiOlwiJm5sZWZ0YXJyb3c7XCIsXCLigKVcIjpcIiZubGRyO1wiLFwi8J2Vn1wiOlwiJm5vcGY7XCIsXCLCrFwiOlwiJm5vdDtcIixcIuKLucy4XCI6XCImbm90aW5FO1wiLFwi4ou1zLhcIjpcIiZub3RpbmRvdDtcIixcIuKLt1wiOlwiJm5vdGludmI7XCIsXCLii7ZcIjpcIiZub3RpbnZjO1wiLFwi4ou+XCI6XCImbm90bml2YjtcIixcIuKLvVwiOlwiJm5vdG5pdmM7XCIsXCLiq73ig6VcIjpcIiZucGFyc2w7XCIsXCLiiILMuFwiOlwiJm5wYXJ0O1wiLFwi4qiUXCI6XCImbnBvbGludDtcIixcIuKGm1wiOlwiJm5yaWdodGFycm93O1wiLFwi4qSzzLhcIjpcIiZucmFycmM7XCIsXCLihp3MuFwiOlwiJm5yYXJydztcIixcIvCdk4NcIjpcIiZuc2NyO1wiLFwi4oqEXCI6XCImbnN1YjtcIixcIuKrhcy4XCI6XCImbnN1YnNldGVxcTtcIixcIuKKhVwiOlwiJm5zdXA7XCIsXCLiq4bMuFwiOlwiJm5zdXBzZXRlcXE7XCIsXCLDsVwiOlwiJm50aWxkZTtcIixcIs69XCI6XCImbnU7XCIsXCIjXCI6XCImbnVtO1wiLFwi4oSWXCI6XCImbnVtZXJvO1wiLFwi4oCHXCI6XCImbnVtc3A7XCIsXCLiiq1cIjpcIiZudkRhc2g7XCIsXCLipIRcIjpcIiZudkhhcnI7XCIsXCLiiY3ig5JcIjpcIiZudmFwO1wiLFwi4oqsXCI6XCImbnZkYXNoO1wiLFwi4oml4oOSXCI6XCImbnZnZTtcIixcIj7ig5JcIjpcIiZudmd0O1wiLFwi4qeeXCI6XCImbnZpbmZpbjtcIixcIuKkglwiOlwiJm52bEFycjtcIixcIuKJpOKDklwiOlwiJm52bGU7XCIsXCI84oOSXCI6XCImbnZsdDtcIixcIuKKtOKDklwiOlwiJm52bHRyaWU7XCIsXCLipINcIjpcIiZudnJBcnI7XCIsXCLiirXig5JcIjpcIiZudnJ0cmllO1wiLFwi4oi84oOSXCI6XCImbnZzaW07XCIsXCLih5ZcIjpcIiZud0FycjtcIixcIuKko1wiOlwiJm53YXJoaztcIixcIuKkp1wiOlwiJm53bmVhcjtcIixcIsOzXCI6XCImb2FjdXRlO1wiLFwiw7RcIjpcIiZvY2lyYztcIixcItC+XCI6XCImb2N5O1wiLFwixZFcIjpcIiZvZGJsYWM7XCIsXCLiqLhcIjpcIiZvZGl2O1wiLFwi4qa8XCI6XCImb2Rzb2xkO1wiLFwixZNcIjpcIiZvZWxpZztcIixcIuKmv1wiOlwiJm9mY2lyO1wiLFwi8J2UrFwiOlwiJm9mcjtcIixcIsubXCI6XCImb2dvbjtcIixcIsOyXCI6XCImb2dyYXZlO1wiLFwi4qeBXCI6XCImb2d0O1wiLFwi4qa1XCI6XCImb2hiYXI7XCIsXCLipr5cIjpcIiZvbGNpcjtcIixcIuKmu1wiOlwiJm9sY3Jvc3M7XCIsXCLip4BcIjpcIiZvbHQ7XCIsXCLFjVwiOlwiJm9tYWNyO1wiLFwiz4lcIjpcIiZvbWVnYTtcIixcIs6/XCI6XCImb21pY3JvbjtcIixcIuKmtlwiOlwiJm9taWQ7XCIsXCLwnZWgXCI6XCImb29wZjtcIixcIuKmt1wiOlwiJm9wYXI7XCIsXCLiprlcIjpcIiZvcGVycDtcIixcIuKIqFwiOlwiJnZlZTtcIixcIuKpnVwiOlwiJm9yZDtcIixcIuKEtFwiOlwiJm9zY3I7XCIsXCLCqlwiOlwiJm9yZGY7XCIsXCLCulwiOlwiJm9yZG07XCIsXCLiirZcIjpcIiZvcmlnb2Y7XCIsXCLiqZZcIjpcIiZvcm9yO1wiLFwi4qmXXCI6XCImb3JzbG9wZTtcIixcIuKpm1wiOlwiJm9ydjtcIixcIsO4XCI6XCImb3NsYXNoO1wiLFwi4oqYXCI6XCImb3NvbDtcIixcIsO1XCI6XCImb3RpbGRlO1wiLFwi4qi2XCI6XCImb3RpbWVzYXM7XCIsXCLDtlwiOlwiJm91bWw7XCIsXCLijL1cIjpcIiZvdmJhcjtcIixcIsK2XCI6XCImcGFyYTtcIixcIuKrs1wiOlwiJnBhcnNpbTtcIixcIuKrvVwiOlwiJnBhcnNsO1wiLFwi0L9cIjpcIiZwY3k7XCIsXCIlXCI6XCImcGVyY250O1wiLFwiLlwiOlwiJnBlcmlvZDtcIixcIuKAsFwiOlwiJnBlcm1pbDtcIixcIuKAsVwiOlwiJnBlcnRlbms7XCIsXCLwnZStXCI6XCImcGZyO1wiLFwiz4ZcIjpcIiZwaGk7XCIsXCLPlVwiOlwiJnZhcnBoaTtcIixcIuKYjlwiOlwiJnBob25lO1wiLFwiz4BcIjpcIiZwaTtcIixcIs+WXCI6XCImdmFycGk7XCIsXCLihI5cIjpcIiZwbGFuY2toO1wiLFwiK1wiOlwiJnBsdXM7XCIsXCLiqKNcIjpcIiZwbHVzYWNpcjtcIixcIuKoolwiOlwiJnBsdXNjaXI7XCIsXCLiqKVcIjpcIiZwbHVzZHU7XCIsXCLiqbJcIjpcIiZwbHVzZTtcIixcIuKoplwiOlwiJnBsdXNzaW07XCIsXCLiqKdcIjpcIiZwbHVzdHdvO1wiLFwi4qiVXCI6XCImcG9pbnRpbnQ7XCIsXCLwnZWhXCI6XCImcG9wZjtcIixcIsKjXCI6XCImcG91bmQ7XCIsXCLiqrNcIjpcIiZwckU7XCIsXCLiqrdcIjpcIiZwcmVjYXBwcm94O1wiLFwi4qq5XCI6XCImcHJuYXA7XCIsXCLiqrVcIjpcIiZwcm5FO1wiLFwi4ouoXCI6XCImcHJuc2ltO1wiLFwi4oCyXCI6XCImcHJpbWU7XCIsXCLijK5cIjpcIiZwcm9mYWxhcjtcIixcIuKMklwiOlwiJnByb2ZsaW5lO1wiLFwi4oyTXCI6XCImcHJvZnN1cmY7XCIsXCLiirBcIjpcIiZwcnVyZWw7XCIsXCLwnZOFXCI6XCImcHNjcjtcIixcIs+IXCI6XCImcHNpO1wiLFwi4oCIXCI6XCImcHVuY3NwO1wiLFwi8J2UrlwiOlwiJnFmcjtcIixcIvCdlaJcIjpcIiZxb3BmO1wiLFwi4oGXXCI6XCImcXByaW1lO1wiLFwi8J2ThlwiOlwiJnFzY3I7XCIsXCLiqJZcIjpcIiZxdWF0aW50O1wiLFwiP1wiOlwiJnF1ZXN0O1wiLFwi4qScXCI6XCImckF0YWlsO1wiLFwi4qWkXCI6XCImckhhcjtcIixcIuKIvcyxXCI6XCImcmFjZTtcIixcIsWVXCI6XCImcmFjdXRlO1wiLFwi4qazXCI6XCImcmFlbXB0eXY7XCIsXCLippJcIjpcIiZyYW5nZDtcIixcIuKmpVwiOlwiJnJhbmdlO1wiLFwiwrtcIjpcIiZyYXF1bztcIixcIuKltVwiOlwiJnJhcnJhcDtcIixcIuKkoFwiOlwiJnJhcnJiZnM7XCIsXCLipLNcIjpcIiZyYXJyYztcIixcIuKknlwiOlwiJnJhcnJmcztcIixcIuKlhVwiOlwiJnJhcnJwbDtcIixcIuKltFwiOlwiJnJhcnJzaW07XCIsXCLihqNcIjpcIiZyaWdodGFycm93dGFpbDtcIixcIuKGnVwiOlwiJnJpZ2h0c3F1aWdhcnJvdztcIixcIuKkmlwiOlwiJnJhdGFpbDtcIixcIuKItlwiOlwiJnJhdGlvO1wiLFwi4p2zXCI6XCImcmJicms7XCIsXCJ9XCI6XCImcmN1YjtcIixcIl1cIjpcIiZyc3FiO1wiLFwi4qaMXCI6XCImcmJya2U7XCIsXCLipo5cIjpcIiZyYnJrc2xkO1wiLFwi4qaQXCI6XCImcmJya3NsdTtcIixcIsWZXCI6XCImcmNhcm9uO1wiLFwixZdcIjpcIiZyY2VkaWw7XCIsXCLRgFwiOlwiJnJjeTtcIixcIuKkt1wiOlwiJnJkY2E7XCIsXCLipalcIjpcIiZyZGxkaGFyO1wiLFwi4oazXCI6XCImcmRzaDtcIixcIuKWrVwiOlwiJnJlY3Q7XCIsXCLipb1cIjpcIiZyZmlzaHQ7XCIsXCLwnZSvXCI6XCImcmZyO1wiLFwi4qWsXCI6XCImcmhhcnVsO1wiLFwiz4FcIjpcIiZyaG87XCIsXCLPsVwiOlwiJnZhcnJobztcIixcIuKHiVwiOlwiJnJyYXJyO1wiLFwi4ouMXCI6XCImcnRocmVlO1wiLFwiy5pcIjpcIiZyaW5nO1wiLFwi4oCPXCI6XCImcmxtO1wiLFwi4o6xXCI6XCImcm1vdXN0YWNoZTtcIixcIuKrrlwiOlwiJnJubWlkO1wiLFwi4p+tXCI6XCImcm9hbmc7XCIsXCLih75cIjpcIiZyb2FycjtcIixcIuKmhlwiOlwiJnJvcGFyO1wiLFwi8J2Vo1wiOlwiJnJvcGY7XCIsXCLiqK5cIjpcIiZyb3BsdXM7XCIsXCLiqLVcIjpcIiZyb3RpbWVzO1wiLFwiKVwiOlwiJnJwYXI7XCIsXCLippRcIjpcIiZycGFyZ3Q7XCIsXCLiqJJcIjpcIiZycHBvbGludDtcIixcIuKAulwiOlwiJnJzYXF1bztcIixcIvCdk4dcIjpcIiZyc2NyO1wiLFwi4ouKXCI6XCImcnRpbWVzO1wiLFwi4pa5XCI6XCImdHJpYW5nbGVyaWdodDtcIixcIuKnjlwiOlwiJnJ0cmlsdHJpO1wiLFwi4qWoXCI6XCImcnVsdWhhcjtcIixcIuKEnlwiOlwiJnJ4O1wiLFwixZtcIjpcIiZzYWN1dGU7XCIsXCLiqrRcIjpcIiZzY0U7XCIsXCLiqrhcIjpcIiZzdWNjYXBwcm94O1wiLFwixaFcIjpcIiZzY2Fyb247XCIsXCLFn1wiOlwiJnNjZWRpbDtcIixcIsWdXCI6XCImc2NpcmM7XCIsXCLiqrZcIjpcIiZzdWNjbmVxcTtcIixcIuKqulwiOlwiJnN1Y2NuYXBwcm94O1wiLFwi4oupXCI6XCImc3VjY25zaW07XCIsXCLiqJNcIjpcIiZzY3BvbGludDtcIixcItGBXCI6XCImc2N5O1wiLFwi4ouFXCI6XCImc2RvdDtcIixcIuKpplwiOlwiJnNkb3RlO1wiLFwi4oeYXCI6XCImc2VBcnI7XCIsXCLCp1wiOlwiJnNlY3Q7XCIsXCI7XCI6XCImc2VtaTtcIixcIuKkqVwiOlwiJnRvc2E7XCIsXCLinLZcIjpcIiZzZXh0O1wiLFwi8J2UsFwiOlwiJnNmcjtcIixcIuKZr1wiOlwiJnNoYXJwO1wiLFwi0YlcIjpcIiZzaGNoY3k7XCIsXCLRiFwiOlwiJnNoY3k7XCIsXCLCrVwiOlwiJnNoeTtcIixcIs+DXCI6XCImc2lnbWE7XCIsXCLPglwiOlwiJnZhcnNpZ21hO1wiLFwi4qmqXCI6XCImc2ltZG90O1wiLFwi4qqeXCI6XCImc2ltZztcIixcIuKqoFwiOlwiJnNpbWdFO1wiLFwi4qqdXCI6XCImc2ltbDtcIixcIuKqn1wiOlwiJnNpbWxFO1wiLFwi4omGXCI6XCImc2ltbmU7XCIsXCLiqKRcIjpcIiZzaW1wbHVzO1wiLFwi4qWyXCI6XCImc2ltcmFycjtcIixcIuKos1wiOlwiJnNtYXNocDtcIixcIuKnpFwiOlwiJnNtZXBhcnNsO1wiLFwi4oyjXCI6XCImc3NtaWxlO1wiLFwi4qqqXCI6XCImc210O1wiLFwi4qqsXCI6XCImc210ZTtcIixcIuKqrO+4gFwiOlwiJnNtdGVzO1wiLFwi0YxcIjpcIiZzb2Z0Y3k7XCIsXCIvXCI6XCImc29sO1wiLFwi4qeEXCI6XCImc29sYjtcIixcIuKMv1wiOlwiJnNvbGJhcjtcIixcIvCdlaRcIjpcIiZzb3BmO1wiLFwi4pmgXCI6XCImc3BhZGVzdWl0O1wiLFwi4oqT77iAXCI6XCImc3FjYXBzO1wiLFwi4oqU77iAXCI6XCImc3FjdXBzO1wiLFwi8J2TiFwiOlwiJnNzY3I7XCIsXCLimIZcIjpcIiZzdGFyO1wiLFwi4oqCXCI6XCImc3Vic2V0O1wiLFwi4quFXCI6XCImc3Vic2V0ZXFxO1wiLFwi4qq9XCI6XCImc3ViZG90O1wiLFwi4quDXCI6XCImc3ViZWRvdDtcIixcIuKrgVwiOlwiJnN1Ym11bHQ7XCIsXCLiq4tcIjpcIiZzdWJzZXRuZXFxO1wiLFwi4oqKXCI6XCImc3Vic2V0bmVxO1wiLFwi4qq/XCI6XCImc3VicGx1cztcIixcIuKluVwiOlwiJnN1YnJhcnI7XCIsXCLiq4dcIjpcIiZzdWJzaW07XCIsXCLiq5VcIjpcIiZzdWJzdWI7XCIsXCLiq5NcIjpcIiZzdWJzdXA7XCIsXCLimapcIjpcIiZzdW5nO1wiLFwiwrlcIjpcIiZzdXAxO1wiLFwiwrJcIjpcIiZzdXAyO1wiLFwiwrNcIjpcIiZzdXAzO1wiLFwi4quGXCI6XCImc3Vwc2V0ZXFxO1wiLFwi4qq+XCI6XCImc3VwZG90O1wiLFwi4quYXCI6XCImc3VwZHN1YjtcIixcIuKrhFwiOlwiJnN1cGVkb3Q7XCIsXCLin4lcIjpcIiZzdXBoc29sO1wiLFwi4quXXCI6XCImc3VwaHN1YjtcIixcIuKlu1wiOlwiJnN1cGxhcnI7XCIsXCLiq4JcIjpcIiZzdXBtdWx0O1wiLFwi4quMXCI6XCImc3Vwc2V0bmVxcTtcIixcIuKKi1wiOlwiJnN1cHNldG5lcTtcIixcIuKrgFwiOlwiJnN1cHBsdXM7XCIsXCLiq4hcIjpcIiZzdXBzaW07XCIsXCLiq5RcIjpcIiZzdXBzdWI7XCIsXCLiq5ZcIjpcIiZzdXBzdXA7XCIsXCLih5lcIjpcIiZzd0FycjtcIixcIuKkqlwiOlwiJnN3bndhcjtcIixcIsOfXCI6XCImc3psaWc7XCIsXCLijJZcIjpcIiZ0YXJnZXQ7XCIsXCLPhFwiOlwiJnRhdTtcIixcIsWlXCI6XCImdGNhcm9uO1wiLFwixaNcIjpcIiZ0Y2VkaWw7XCIsXCLRglwiOlwiJnRjeTtcIixcIuKMlVwiOlwiJnRlbHJlYztcIixcIvCdlLFcIjpcIiZ0ZnI7XCIsXCLOuFwiOlwiJnRoZXRhO1wiLFwiz5FcIjpcIiZ2YXJ0aGV0YTtcIixcIsO+XCI6XCImdGhvcm47XCIsXCLDl1wiOlwiJnRpbWVzO1wiLFwi4qixXCI6XCImdGltZXNiYXI7XCIsXCLiqLBcIjpcIiZ0aW1lc2Q7XCIsXCLijLZcIjpcIiZ0b3Bib3Q7XCIsXCLiq7FcIjpcIiZ0b3BjaXI7XCIsXCLwnZWlXCI6XCImdG9wZjtcIixcIuKrmlwiOlwiJnRvcGZvcms7XCIsXCLigLRcIjpcIiZ0cHJpbWU7XCIsXCLilrVcIjpcIiZ1dHJpO1wiLFwi4omcXCI6XCImdHJpZTtcIixcIuKXrFwiOlwiJnRyaWRvdDtcIixcIuKoulwiOlwiJnRyaW1pbnVzO1wiLFwi4qi5XCI6XCImdHJpcGx1cztcIixcIuKnjVwiOlwiJnRyaXNiO1wiLFwi4qi7XCI6XCImdHJpdGltZTtcIixcIuKPolwiOlwiJnRycGV6aXVtO1wiLFwi8J2TiVwiOlwiJnRzY3I7XCIsXCLRhlwiOlwiJnRzY3k7XCIsXCLRm1wiOlwiJnRzaGN5O1wiLFwixadcIjpcIiZ0c3Ryb2s7XCIsXCLipaNcIjpcIiZ1SGFyO1wiLFwiw7pcIjpcIiZ1YWN1dGU7XCIsXCLRnlwiOlwiJnVicmN5O1wiLFwixa1cIjpcIiZ1YnJldmU7XCIsXCLDu1wiOlwiJnVjaXJjO1wiLFwi0YNcIjpcIiZ1Y3k7XCIsXCLFsVwiOlwiJnVkYmxhYztcIixcIuKlvlwiOlwiJnVmaXNodDtcIixcIvCdlLJcIjpcIiZ1ZnI7XCIsXCLDuVwiOlwiJnVncmF2ZTtcIixcIuKWgFwiOlwiJnVoYmxrO1wiLFwi4oycXCI6XCImdWxjb3JuZXI7XCIsXCLijI9cIjpcIiZ1bGNyb3A7XCIsXCLil7hcIjpcIiZ1bHRyaTtcIixcIsWrXCI6XCImdW1hY3I7XCIsXCLFs1wiOlwiJnVvZ29uO1wiLFwi8J2VplwiOlwiJnVvcGY7XCIsXCLPhVwiOlwiJnVwc2lsb247XCIsXCLih4hcIjpcIiZ1dWFycjtcIixcIuKMnVwiOlwiJnVyY29ybmVyO1wiLFwi4oyOXCI6XCImdXJjcm9wO1wiLFwixa9cIjpcIiZ1cmluZztcIixcIuKXuVwiOlwiJnVydHJpO1wiLFwi8J2TilwiOlwiJnVzY3I7XCIsXCLii7BcIjpcIiZ1dGRvdDtcIixcIsWpXCI6XCImdXRpbGRlO1wiLFwiw7xcIjpcIiZ1dW1sO1wiLFwi4qanXCI6XCImdXdhbmdsZTtcIixcIuKrqFwiOlwiJnZCYXI7XCIsXCLiq6lcIjpcIiZ2QmFydjtcIixcIuKmnFwiOlwiJnZhbmdydDtcIixcIuKKiu+4gFwiOlwiJnZzdWJuZTtcIixcIuKri++4gFwiOlwiJnZzdWJuRTtcIixcIuKKi++4gFwiOlwiJnZzdXBuZTtcIixcIuKrjO+4gFwiOlwiJnZzdXBuRTtcIixcItCyXCI6XCImdmN5O1wiLFwi4oq7XCI6XCImdmVlYmFyO1wiLFwi4omaXCI6XCImdmVlZXE7XCIsXCLii65cIjpcIiZ2ZWxsaXA7XCIsXCLwnZSzXCI6XCImdmZyO1wiLFwi8J2Vp1wiOlwiJnZvcGY7XCIsXCLwnZOLXCI6XCImdnNjcjtcIixcIuKmmlwiOlwiJnZ6aWd6YWc7XCIsXCLFtVwiOlwiJndjaXJjO1wiLFwi4qmfXCI6XCImd2VkYmFyO1wiLFwi4omZXCI6XCImd2VkZ2VxO1wiLFwi4oSYXCI6XCImd3A7XCIsXCLwnZS0XCI6XCImd2ZyO1wiLFwi8J2VqFwiOlwiJndvcGY7XCIsXCLwnZOMXCI6XCImd3NjcjtcIixcIvCdlLVcIjpcIiZ4ZnI7XCIsXCLOvlwiOlwiJnhpO1wiLFwi4ou7XCI6XCImeG5pcztcIixcIvCdlalcIjpcIiZ4b3BmO1wiLFwi8J2TjVwiOlwiJnhzY3I7XCIsXCLDvVwiOlwiJnlhY3V0ZTtcIixcItGPXCI6XCImeWFjeTtcIixcIsW3XCI6XCImeWNpcmM7XCIsXCLRi1wiOlwiJnljeTtcIixcIsKlXCI6XCImeWVuO1wiLFwi8J2UtlwiOlwiJnlmcjtcIixcItGXXCI6XCImeWljeTtcIixcIvCdlapcIjpcIiZ5b3BmO1wiLFwi8J2TjlwiOlwiJnlzY3I7XCIsXCLRjlwiOlwiJnl1Y3k7XCIsXCLDv1wiOlwiJnl1bWw7XCIsXCLFulwiOlwiJnphY3V0ZTtcIixcIsW+XCI6XCImemNhcm9uO1wiLFwi0LdcIjpcIiZ6Y3k7XCIsXCLFvFwiOlwiJnpkb3Q7XCIsXCLOtlwiOlwiJnpldGE7XCIsXCLwnZS3XCI6XCImemZyO1wiLFwi0LZcIjpcIiZ6aGN5O1wiLFwi4oedXCI6XCImemlncmFycjtcIixcIvCdlatcIjpcIiZ6b3BmO1wiLFwi8J2Tj1wiOlwiJnpzY3I7XCIsXCLigI1cIjpcIiZ6d2o7XCIsXCLigIxcIjpcIiZ6d25qO1wifX19O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9Li9uYW1lZC1yZWZlcmVuY2VzLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO09iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLFwiX19lc01vZHVsZVwiLHt2YWx1ZTp0cnVlfSk7ZXhwb3J0cy5udW1lcmljVW5pY29kZU1hcD17MDo2NTUzMywxMjg6ODM2NCwxMzA6ODIxOCwxMzE6NDAyLDEzMjo4MjIyLDEzMzo4MjMwLDEzNDo4MjI0LDEzNTo4MjI1LDEzNjo3MTAsMTM3OjgyNDAsMTM4OjM1MiwxMzk6ODI0OSwxNDA6MzM4LDE0MjozODEsMTQ1OjgyMTYsMTQ2OjgyMTcsMTQ3OjgyMjAsMTQ4OjgyMjEsMTQ5OjgyMjYsMTUwOjgyMTEsMTUxOjgyMTIsMTUyOjczMiwxNTM6ODQ4MiwxNTQ6MzUzLDE1NTo4MjUwLDE1NjozMzksMTU4OjM4MiwxNTk6Mzc2fTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPS4vbnVtZXJpYy11bmljb2RlLW1hcC5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cyxcIl9fZXNNb2R1bGVcIix7dmFsdWU6dHJ1ZX0pO2V4cG9ydHMuZnJvbUNvZGVQb2ludD1TdHJpbmcuZnJvbUNvZGVQb2ludHx8ZnVuY3Rpb24oYXN0cmFsQ29kZVBvaW50KXtyZXR1cm4gU3RyaW5nLmZyb21DaGFyQ29kZShNYXRoLmZsb29yKChhc3RyYWxDb2RlUG9pbnQtNjU1MzYpLzEwMjQpKzU1Mjk2LChhc3RyYWxDb2RlUG9pbnQtNjU1MzYpJTEwMjQrNTYzMjApfTtleHBvcnRzLmdldENvZGVQb2ludD1TdHJpbmcucHJvdG90eXBlLmNvZGVQb2ludEF0P2Z1bmN0aW9uKGlucHV0LHBvc2l0aW9uKXtyZXR1cm4gaW5wdXQuY29kZVBvaW50QXQocG9zaXRpb24pfTpmdW5jdGlvbihpbnB1dCxwb3NpdGlvbil7cmV0dXJuKGlucHV0LmNoYXJDb2RlQXQocG9zaXRpb24pLTU1Mjk2KSoxMDI0K2lucHV0LmNoYXJDb2RlQXQocG9zaXRpb24rMSktNTYzMjArNjU1MzZ9O2V4cG9ydHMuaGlnaFN1cnJvZ2F0ZUZyb209NTUyOTY7ZXhwb3J0cy5oaWdoU3Vycm9nYXRlVG89NTYzMTk7XG4vLyMgc291cmNlTWFwcGluZ1VSTD0uL3N1cnJvZ2F0ZS1wYWlycy5qcy5tYXAiLCJmdW5jdGlvbiBfY2xhc3NDYWxsQ2hlY2soaW5zdGFuY2UsIENvbnN0cnVjdG9yKSB7IGlmICghKGluc3RhbmNlIGluc3RhbmNlb2YgQ29uc3RydWN0b3IpKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoXCJDYW5ub3QgY2FsbCBhIGNsYXNzIGFzIGEgZnVuY3Rpb25cIik7IH0gfVxuZnVuY3Rpb24gX2RlZmluZVByb3BlcnRpZXModGFyZ2V0LCBwcm9wcykgeyBmb3IgKHZhciBpID0gMDsgaSA8IHByb3BzLmxlbmd0aDsgaSsrKSB7IHZhciBkZXNjcmlwdG9yID0gcHJvcHNbaV07IGRlc2NyaXB0b3IuZW51bWVyYWJsZSA9IGRlc2NyaXB0b3IuZW51bWVyYWJsZSB8fCBmYWxzZTsgZGVzY3JpcHRvci5jb25maWd1cmFibGUgPSB0cnVlOyBpZiAoXCJ2YWx1ZVwiIGluIGRlc2NyaXB0b3IpIGRlc2NyaXB0b3Iud3JpdGFibGUgPSB0cnVlOyBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBfdG9Qcm9wZXJ0eUtleShkZXNjcmlwdG9yLmtleSksIGRlc2NyaXB0b3IpOyB9IH1cbmZ1bmN0aW9uIF9jcmVhdGVDbGFzcyhDb25zdHJ1Y3RvciwgcHJvdG9Qcm9wcywgc3RhdGljUHJvcHMpIHsgaWYgKHByb3RvUHJvcHMpIF9kZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLnByb3RvdHlwZSwgcHJvdG9Qcm9wcyk7IGlmIChzdGF0aWNQcm9wcykgX2RlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IsIHN0YXRpY1Byb3BzKTsgT2JqZWN0LmRlZmluZVByb3BlcnR5KENvbnN0cnVjdG9yLCBcInByb3RvdHlwZVwiLCB7IHdyaXRhYmxlOiBmYWxzZSB9KTsgcmV0dXJuIENvbnN0cnVjdG9yOyB9XG5mdW5jdGlvbiBfdG9Qcm9wZXJ0eUtleSh0KSB7IHZhciBpID0gX3RvUHJpbWl0aXZlKHQsIFwic3RyaW5nXCIpOyByZXR1cm4gXCJzeW1ib2xcIiA9PSB0eXBlb2YgaSA/IGkgOiBpICsgXCJcIjsgfVxuZnVuY3Rpb24gX3RvUHJpbWl0aXZlKHQsIHIpIHsgaWYgKFwib2JqZWN0XCIgIT0gdHlwZW9mIHQgfHwgIXQpIHJldHVybiB0OyB2YXIgZSA9IHRbU3ltYm9sLnRvUHJpbWl0aXZlXTsgaWYgKHZvaWQgMCAhPT0gZSkgeyB2YXIgaSA9IGUuY2FsbCh0LCByIHx8IFwiZGVmYXVsdFwiKTsgaWYgKFwib2JqZWN0XCIgIT0gdHlwZW9mIGkpIHJldHVybiBpOyB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQEB0b1ByaW1pdGl2ZSBtdXN0IHJldHVybiBhIHByaW1pdGl2ZSB2YWx1ZS5cIik7IH0gcmV0dXJuIChcInN0cmluZ1wiID09PSByID8gU3RyaW5nIDogTnVtYmVyKSh0KTsgfVxuaW1wb3J0IHsgbG9nIH0gZnJvbSBcIi4uL3V0aWxzL2xvZy5qc1wiO1xudmFyIFdlYlNvY2tldENsaWVudCA9IC8qI19fUFVSRV9fKi9mdW5jdGlvbiAoKSB7XG4gIC8qKlxuICAgKiBAcGFyYW0ge3N0cmluZ30gdXJsXG4gICAqL1xuICBmdW5jdGlvbiBXZWJTb2NrZXRDbGllbnQodXJsKSB7XG4gICAgX2NsYXNzQ2FsbENoZWNrKHRoaXMsIFdlYlNvY2tldENsaWVudCk7XG4gICAgdGhpcy5jbGllbnQgPSBuZXcgV2ViU29ja2V0KHVybCk7XG4gICAgdGhpcy5jbGllbnQub25lcnJvciA9IGZ1bmN0aW9uIChlcnJvcikge1xuICAgICAgbG9nLmVycm9yKGVycm9yKTtcbiAgICB9O1xuICB9XG5cbiAgLyoqXG4gICAqIEBwYXJhbSB7KC4uLmFyZ3M6IGFueVtdKSA9PiB2b2lkfSBmXG4gICAqL1xuICByZXR1cm4gX2NyZWF0ZUNsYXNzKFdlYlNvY2tldENsaWVudCwgW3tcbiAgICBrZXk6IFwib25PcGVuXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIG9uT3BlbihmKSB7XG4gICAgICB0aGlzLmNsaWVudC5vbm9wZW4gPSBmO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSB7KC4uLmFyZ3M6IGFueVtdKSA9PiB2b2lkfSBmXG4gICAgICovXG4gIH0sIHtcbiAgICBrZXk6IFwib25DbG9zZVwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBvbkNsb3NlKGYpIHtcbiAgICAgIHRoaXMuY2xpZW50Lm9uY2xvc2UgPSBmO1xuICAgIH1cblxuICAgIC8vIGNhbGwgZiB3aXRoIHRoZSBtZXNzYWdlIHN0cmluZyBhcyB0aGUgZmlyc3QgYXJndW1lbnRcbiAgICAvKipcbiAgICAgKiBAcGFyYW0geyguLi5hcmdzOiBhbnlbXSkgPT4gdm9pZH0gZlxuICAgICAqL1xuICB9LCB7XG4gICAga2V5OiBcIm9uTWVzc2FnZVwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBvbk1lc3NhZ2UoZikge1xuICAgICAgdGhpcy5jbGllbnQub25tZXNzYWdlID0gZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgZihlLmRhdGEpO1xuICAgICAgfTtcbiAgICB9XG4gIH1dKTtcbn0oKTtcbmV4cG9ydCB7IFdlYlNvY2tldENsaWVudCBhcyBkZWZhdWx0IH07IiwiZnVuY3Rpb24gb3duS2V5cyhlLCByKSB7IHZhciB0ID0gT2JqZWN0LmtleXMoZSk7IGlmIChPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzKSB7IHZhciBvID0gT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyhlKTsgciAmJiAobyA9IG8uZmlsdGVyKGZ1bmN0aW9uIChyKSB7IHJldHVybiBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKGUsIHIpLmVudW1lcmFibGU7IH0pKSwgdC5wdXNoLmFwcGx5KHQsIG8pOyB9IHJldHVybiB0OyB9XG5mdW5jdGlvbiBfb2JqZWN0U3ByZWFkKGUpIHsgZm9yICh2YXIgciA9IDE7IHIgPCBhcmd1bWVudHMubGVuZ3RoOyByKyspIHsgdmFyIHQgPSBudWxsICE9IGFyZ3VtZW50c1tyXSA/IGFyZ3VtZW50c1tyXSA6IHt9OyByICUgMiA/IG93bktleXMoT2JqZWN0KHQpLCAhMCkuZm9yRWFjaChmdW5jdGlvbiAocikgeyBfZGVmaW5lUHJvcGVydHkoZSwgciwgdFtyXSk7IH0pIDogT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcnMgPyBPYmplY3QuZGVmaW5lUHJvcGVydGllcyhlLCBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9ycyh0KSkgOiBvd25LZXlzKE9iamVjdCh0KSkuZm9yRWFjaChmdW5jdGlvbiAocikgeyBPYmplY3QuZGVmaW5lUHJvcGVydHkoZSwgciwgT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcih0LCByKSk7IH0pOyB9IHJldHVybiBlOyB9XG5mdW5jdGlvbiBfZGVmaW5lUHJvcGVydHkob2JqLCBrZXksIHZhbHVlKSB7IGtleSA9IF90b1Byb3BlcnR5S2V5KGtleSk7IGlmIChrZXkgaW4gb2JqKSB7IE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvYmosIGtleSwgeyB2YWx1ZTogdmFsdWUsIGVudW1lcmFibGU6IHRydWUsIGNvbmZpZ3VyYWJsZTogdHJ1ZSwgd3JpdGFibGU6IHRydWUgfSk7IH0gZWxzZSB7IG9ialtrZXldID0gdmFsdWU7IH0gcmV0dXJuIG9iajsgfVxuZnVuY3Rpb24gX3RvUHJvcGVydHlLZXkodCkgeyB2YXIgaSA9IF90b1ByaW1pdGl2ZSh0LCBcInN0cmluZ1wiKTsgcmV0dXJuIFwic3ltYm9sXCIgPT0gdHlwZW9mIGkgPyBpIDogaSArIFwiXCI7IH1cbmZ1bmN0aW9uIF90b1ByaW1pdGl2ZSh0LCByKSB7IGlmIChcIm9iamVjdFwiICE9IHR5cGVvZiB0IHx8ICF0KSByZXR1cm4gdDsgdmFyIGUgPSB0W1N5bWJvbC50b1ByaW1pdGl2ZV07IGlmICh2b2lkIDAgIT09IGUpIHsgdmFyIGkgPSBlLmNhbGwodCwgciB8fCBcImRlZmF1bHRcIik7IGlmIChcIm9iamVjdFwiICE9IHR5cGVvZiBpKSByZXR1cm4gaTsgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkBAdG9QcmltaXRpdmUgbXVzdCByZXR1cm4gYSBwcmltaXRpdmUgdmFsdWUuXCIpOyB9IHJldHVybiAoXCJzdHJpbmdcIiA9PT0gciA/IFN0cmluZyA6IE51bWJlcikodCk7IH1cbi8qIGdsb2JhbCBfX3Jlc291cmNlUXVlcnksIF9fd2VicGFja19oYXNoX18gKi9cbi8vLyA8cmVmZXJlbmNlIHR5cGVzPVwid2VicGFjay9tb2R1bGVcIiAvPlxuaW1wb3J0IHdlYnBhY2tIb3RMb2cgZnJvbSBcIndlYnBhY2svaG90L2xvZy5qc1wiO1xuaW1wb3J0IHN0cmlwQW5zaSBmcm9tIFwiLi91dGlscy9zdHJpcEFuc2kuanNcIjtcbmltcG9ydCBwYXJzZVVSTCBmcm9tIFwiLi91dGlscy9wYXJzZVVSTC5qc1wiO1xuaW1wb3J0IHNvY2tldCBmcm9tIFwiLi9zb2NrZXQuanNcIjtcbmltcG9ydCB7IGZvcm1hdFByb2JsZW0sIGNyZWF0ZU92ZXJsYXkgfSBmcm9tIFwiLi9vdmVybGF5LmpzXCI7XG5pbXBvcnQgeyBsb2csIGxvZ0VuYWJsZWRGZWF0dXJlcywgc2V0TG9nTGV2ZWwgfSBmcm9tIFwiLi91dGlscy9sb2cuanNcIjtcbmltcG9ydCBzZW5kTWVzc2FnZSBmcm9tIFwiLi91dGlscy9zZW5kTWVzc2FnZS5qc1wiO1xuaW1wb3J0IHJlbG9hZEFwcCBmcm9tIFwiLi91dGlscy9yZWxvYWRBcHAuanNcIjtcbmltcG9ydCBjcmVhdGVTb2NrZXRVUkwgZnJvbSBcIi4vdXRpbHMvY3JlYXRlU29ja2V0VVJMLmpzXCI7XG5cbi8qKlxuICogQHR5cGVkZWYge09iamVjdH0gT3ZlcmxheU9wdGlvbnNcbiAqIEBwcm9wZXJ0eSB7Ym9vbGVhbiB8IChlcnJvcjogRXJyb3IpID0+IGJvb2xlYW59IFt3YXJuaW5nc11cbiAqIEBwcm9wZXJ0eSB7Ym9vbGVhbiB8IChlcnJvcjogRXJyb3IpID0+IGJvb2xlYW59IFtlcnJvcnNdXG4gKiBAcHJvcGVydHkge2Jvb2xlYW4gfCAoZXJyb3I6IEVycm9yKSA9PiBib29sZWFufSBbcnVudGltZUVycm9yc11cbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBbdHJ1c3RlZFR5cGVzUG9saWN5TmFtZV1cbiAqL1xuXG4vKipcbiAqIEB0eXBlZGVmIHtPYmplY3R9IE9wdGlvbnNcbiAqIEBwcm9wZXJ0eSB7Ym9vbGVhbn0gaG90XG4gKiBAcHJvcGVydHkge2Jvb2xlYW59IGxpdmVSZWxvYWRcbiAqIEBwcm9wZXJ0eSB7Ym9vbGVhbn0gcHJvZ3Jlc3NcbiAqIEBwcm9wZXJ0eSB7Ym9vbGVhbiB8IE92ZXJsYXlPcHRpb25zfSBvdmVybGF5XG4gKiBAcHJvcGVydHkge3N0cmluZ30gW2xvZ2dpbmddXG4gKiBAcHJvcGVydHkge251bWJlcn0gW3JlY29ubmVjdF1cbiAqL1xuXG4vKipcbiAqIEB0eXBlZGVmIHtPYmplY3R9IFN0YXR1c1xuICogQHByb3BlcnR5IHtib29sZWFufSBpc1VubG9hZGluZ1xuICogQHByb3BlcnR5IHtzdHJpbmd9IGN1cnJlbnRIYXNoXG4gKiBAcHJvcGVydHkge3N0cmluZ30gW3ByZXZpb3VzSGFzaF1cbiAqL1xuXG4vKipcbiAqIEBwYXJhbSB7Ym9vbGVhbiB8IHsgd2FybmluZ3M/OiBib29sZWFuIHwgc3RyaW5nOyBlcnJvcnM/OiBib29sZWFuIHwgc3RyaW5nOyBydW50aW1lRXJyb3JzPzogYm9vbGVhbiB8IHN0cmluZzsgfX0gb3ZlcmxheU9wdGlvbnNcbiAqL1xudmFyIGRlY29kZU92ZXJsYXlPcHRpb25zID0gZnVuY3Rpb24gZGVjb2RlT3ZlcmxheU9wdGlvbnMob3ZlcmxheU9wdGlvbnMpIHtcbiAgaWYgKHR5cGVvZiBvdmVybGF5T3B0aW9ucyA9PT0gXCJvYmplY3RcIikge1xuICAgIFtcIndhcm5pbmdzXCIsIFwiZXJyb3JzXCIsIFwicnVudGltZUVycm9yc1wiXS5mb3JFYWNoKGZ1bmN0aW9uIChwcm9wZXJ0eSkge1xuICAgICAgaWYgKHR5cGVvZiBvdmVybGF5T3B0aW9uc1twcm9wZXJ0eV0gPT09IFwic3RyaW5nXCIpIHtcbiAgICAgICAgdmFyIG92ZXJsYXlGaWx0ZXJGdW5jdGlvblN0cmluZyA9IGRlY29kZVVSSUNvbXBvbmVudChvdmVybGF5T3B0aW9uc1twcm9wZXJ0eV0pO1xuXG4gICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1uZXctZnVuY1xuICAgICAgICB2YXIgb3ZlcmxheUZpbHRlckZ1bmN0aW9uID0gbmV3IEZ1bmN0aW9uKFwibWVzc2FnZVwiLCBcInZhciBjYWxsYmFjayA9IFwiLmNvbmNhdChvdmVybGF5RmlsdGVyRnVuY3Rpb25TdHJpbmcsIFwiXFxuICAgICAgICByZXR1cm4gY2FsbGJhY2sobWVzc2FnZSlcIikpO1xuICAgICAgICBvdmVybGF5T3B0aW9uc1twcm9wZXJ0eV0gPSBvdmVybGF5RmlsdGVyRnVuY3Rpb247XG4gICAgICB9XG4gICAgfSk7XG4gIH1cbn07XG5cbi8qKlxuICogQHR5cGUge1N0YXR1c31cbiAqL1xudmFyIHN0YXR1cyA9IHtcbiAgaXNVbmxvYWRpbmc6IGZhbHNlLFxuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgY2FtZWxjYXNlXG4gIGN1cnJlbnRIYXNoOiBfX3dlYnBhY2tfaGFzaF9fXG59O1xuXG4vKiogQHR5cGUge09wdGlvbnN9ICovXG52YXIgb3B0aW9ucyA9IHtcbiAgaG90OiBmYWxzZSxcbiAgbGl2ZVJlbG9hZDogZmFsc2UsXG4gIHByb2dyZXNzOiBmYWxzZSxcbiAgb3ZlcmxheTogZmFsc2Vcbn07XG52YXIgcGFyc2VkUmVzb3VyY2VRdWVyeSA9IHBhcnNlVVJMKF9fcmVzb3VyY2VRdWVyeSk7XG52YXIgZW5hYmxlZEZlYXR1cmVzID0ge1xuICBcIkhvdCBNb2R1bGUgUmVwbGFjZW1lbnRcIjogZmFsc2UsXG4gIFwiTGl2ZSBSZWxvYWRpbmdcIjogZmFsc2UsXG4gIFByb2dyZXNzOiBmYWxzZSxcbiAgT3ZlcmxheTogZmFsc2Vcbn07XG5pZiAocGFyc2VkUmVzb3VyY2VRdWVyeS5ob3QgPT09IFwidHJ1ZVwiKSB7XG4gIG9wdGlvbnMuaG90ID0gdHJ1ZTtcbiAgZW5hYmxlZEZlYXR1cmVzW1wiSG90IE1vZHVsZSBSZXBsYWNlbWVudFwiXSA9IHRydWU7XG59XG5pZiAocGFyc2VkUmVzb3VyY2VRdWVyeVtcImxpdmUtcmVsb2FkXCJdID09PSBcInRydWVcIikge1xuICBvcHRpb25zLmxpdmVSZWxvYWQgPSB0cnVlO1xuICBlbmFibGVkRmVhdHVyZXNbXCJMaXZlIFJlbG9hZGluZ1wiXSA9IHRydWU7XG59XG5pZiAocGFyc2VkUmVzb3VyY2VRdWVyeS5wcm9ncmVzcyA9PT0gXCJ0cnVlXCIpIHtcbiAgb3B0aW9ucy5wcm9ncmVzcyA9IHRydWU7XG4gIGVuYWJsZWRGZWF0dXJlcy5Qcm9ncmVzcyA9IHRydWU7XG59XG5pZiAocGFyc2VkUmVzb3VyY2VRdWVyeS5vdmVybGF5KSB7XG4gIHRyeSB7XG4gICAgb3B0aW9ucy5vdmVybGF5ID0gSlNPTi5wYXJzZShwYXJzZWRSZXNvdXJjZVF1ZXJ5Lm92ZXJsYXkpO1xuICB9IGNhdGNoIChlKSB7XG4gICAgbG9nLmVycm9yKFwiRXJyb3IgcGFyc2luZyBvdmVybGF5IG9wdGlvbnMgZnJvbSByZXNvdXJjZSBxdWVyeTpcIiwgZSk7XG4gIH1cblxuICAvLyBGaWxsIGluIGRlZmF1bHQgXCJ0cnVlXCIgcGFyYW1zIGZvciBwYXJ0aWFsbHktc3BlY2lmaWVkIG9iamVjdHMuXG4gIGlmICh0eXBlb2Ygb3B0aW9ucy5vdmVybGF5ID09PSBcIm9iamVjdFwiKSB7XG4gICAgb3B0aW9ucy5vdmVybGF5ID0gX29iamVjdFNwcmVhZCh7XG4gICAgICBlcnJvcnM6IHRydWUsXG4gICAgICB3YXJuaW5nczogdHJ1ZSxcbiAgICAgIHJ1bnRpbWVFcnJvcnM6IHRydWVcbiAgICB9LCBvcHRpb25zLm92ZXJsYXkpO1xuICAgIGRlY29kZU92ZXJsYXlPcHRpb25zKG9wdGlvbnMub3ZlcmxheSk7XG4gIH1cbiAgZW5hYmxlZEZlYXR1cmVzLk92ZXJsYXkgPSB0cnVlO1xufVxuaWYgKHBhcnNlZFJlc291cmNlUXVlcnkubG9nZ2luZykge1xuICBvcHRpb25zLmxvZ2dpbmcgPSBwYXJzZWRSZXNvdXJjZVF1ZXJ5LmxvZ2dpbmc7XG59XG5pZiAodHlwZW9mIHBhcnNlZFJlc291cmNlUXVlcnkucmVjb25uZWN0ICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gIG9wdGlvbnMucmVjb25uZWN0ID0gTnVtYmVyKHBhcnNlZFJlc291cmNlUXVlcnkucmVjb25uZWN0KTtcbn1cblxuLyoqXG4gKiBAcGFyYW0ge3N0cmluZ30gbGV2ZWxcbiAqL1xuZnVuY3Rpb24gc2V0QWxsTG9nTGV2ZWwobGV2ZWwpIHtcbiAgLy8gVGhpcyBpcyBuZWVkZWQgYmVjYXVzZSB0aGUgSE1SIGxvZ2dlciBvcGVyYXRlIHNlcGFyYXRlbHkgZnJvbSBkZXYgc2VydmVyIGxvZ2dlclxuICB3ZWJwYWNrSG90TG9nLnNldExvZ0xldmVsKGxldmVsID09PSBcInZlcmJvc2VcIiB8fCBsZXZlbCA9PT0gXCJsb2dcIiA/IFwiaW5mb1wiIDogbGV2ZWwpO1xuICBzZXRMb2dMZXZlbChsZXZlbCk7XG59XG5pZiAob3B0aW9ucy5sb2dnaW5nKSB7XG4gIHNldEFsbExvZ0xldmVsKG9wdGlvbnMubG9nZ2luZyk7XG59XG5sb2dFbmFibGVkRmVhdHVyZXMoZW5hYmxlZEZlYXR1cmVzKTtcbnNlbGYuYWRkRXZlbnRMaXN0ZW5lcihcImJlZm9yZXVubG9hZFwiLCBmdW5jdGlvbiAoKSB7XG4gIHN0YXR1cy5pc1VubG9hZGluZyA9IHRydWU7XG59KTtcbnZhciBvdmVybGF5ID0gdHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIiA/IGNyZWF0ZU92ZXJsYXkodHlwZW9mIG9wdGlvbnMub3ZlcmxheSA9PT0gXCJvYmplY3RcIiA/IHtcbiAgdHJ1c3RlZFR5cGVzUG9saWN5TmFtZTogb3B0aW9ucy5vdmVybGF5LnRydXN0ZWRUeXBlc1BvbGljeU5hbWUsXG4gIGNhdGNoUnVudGltZUVycm9yOiBvcHRpb25zLm92ZXJsYXkucnVudGltZUVycm9yc1xufSA6IHtcbiAgdHJ1c3RlZFR5cGVzUG9saWN5TmFtZTogZmFsc2UsXG4gIGNhdGNoUnVudGltZUVycm9yOiBvcHRpb25zLm92ZXJsYXlcbn0pIDoge1xuICBzZW5kOiBmdW5jdGlvbiBzZW5kKCkge31cbn07XG52YXIgb25Tb2NrZXRNZXNzYWdlID0ge1xuICBob3Q6IGZ1bmN0aW9uIGhvdCgpIHtcbiAgICBpZiAocGFyc2VkUmVzb3VyY2VRdWVyeS5ob3QgPT09IFwiZmFsc2VcIikge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBvcHRpb25zLmhvdCA9IHRydWU7XG4gIH0sXG4gIGxpdmVSZWxvYWQ6IGZ1bmN0aW9uIGxpdmVSZWxvYWQoKSB7XG4gICAgaWYgKHBhcnNlZFJlc291cmNlUXVlcnlbXCJsaXZlLXJlbG9hZFwiXSA9PT0gXCJmYWxzZVwiKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIG9wdGlvbnMubGl2ZVJlbG9hZCA9IHRydWU7XG4gIH0sXG4gIGludmFsaWQ6IGZ1bmN0aW9uIGludmFsaWQoKSB7XG4gICAgbG9nLmluZm8oXCJBcHAgdXBkYXRlZC4gUmVjb21waWxpbmcuLi5cIik7XG5cbiAgICAvLyBGaXhlcyAjMTA0Mi4gb3ZlcmxheSBkb2Vzbid0IGNsZWFyIGlmIGVycm9ycyBhcmUgZml4ZWQgYnV0IHdhcm5pbmdzIHJlbWFpbi5cbiAgICBpZiAob3B0aW9ucy5vdmVybGF5KSB7XG4gICAgICBvdmVybGF5LnNlbmQoe1xuICAgICAgICB0eXBlOiBcIkRJU01JU1NcIlxuICAgICAgfSk7XG4gICAgfVxuICAgIHNlbmRNZXNzYWdlKFwiSW52YWxpZFwiKTtcbiAgfSxcbiAgLyoqXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBoYXNoXG4gICAqL1xuICBoYXNoOiBmdW5jdGlvbiBoYXNoKF9oYXNoKSB7XG4gICAgc3RhdHVzLnByZXZpb3VzSGFzaCA9IHN0YXR1cy5jdXJyZW50SGFzaDtcbiAgICBzdGF0dXMuY3VycmVudEhhc2ggPSBfaGFzaDtcbiAgfSxcbiAgbG9nZ2luZzogc2V0QWxsTG9nTGV2ZWwsXG4gIC8qKlxuICAgKiBAcGFyYW0ge2Jvb2xlYW59IHZhbHVlXG4gICAqL1xuICBvdmVybGF5OiBmdW5jdGlvbiBvdmVybGF5KHZhbHVlKSB7XG4gICAgaWYgKHR5cGVvZiBkb2N1bWVudCA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBvcHRpb25zLm92ZXJsYXkgPSB2YWx1ZTtcbiAgICBkZWNvZGVPdmVybGF5T3B0aW9ucyhvcHRpb25zLm92ZXJsYXkpO1xuICB9LFxuICAvKipcbiAgICogQHBhcmFtIHtudW1iZXJ9IHZhbHVlXG4gICAqL1xuICByZWNvbm5lY3Q6IGZ1bmN0aW9uIHJlY29ubmVjdCh2YWx1ZSkge1xuICAgIGlmIChwYXJzZWRSZXNvdXJjZVF1ZXJ5LnJlY29ubmVjdCA9PT0gXCJmYWxzZVwiKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIG9wdGlvbnMucmVjb25uZWN0ID0gdmFsdWU7XG4gIH0sXG4gIC8qKlxuICAgKiBAcGFyYW0ge2Jvb2xlYW59IHZhbHVlXG4gICAqL1xuICBwcm9ncmVzczogZnVuY3Rpb24gcHJvZ3Jlc3ModmFsdWUpIHtcbiAgICBvcHRpb25zLnByb2dyZXNzID0gdmFsdWU7XG4gIH0sXG4gIC8qKlxuICAgKiBAcGFyYW0ge3sgcGx1Z2luTmFtZT86IHN0cmluZywgcGVyY2VudDogbnVtYmVyLCBtc2c6IHN0cmluZyB9fSBkYXRhXG4gICAqL1xuICBcInByb2dyZXNzLXVwZGF0ZVwiOiBmdW5jdGlvbiBwcm9ncmVzc1VwZGF0ZShkYXRhKSB7XG4gICAgaWYgKG9wdGlvbnMucHJvZ3Jlc3MpIHtcbiAgICAgIGxvZy5pbmZvKFwiXCIuY29uY2F0KGRhdGEucGx1Z2luTmFtZSA/IFwiW1wiLmNvbmNhdChkYXRhLnBsdWdpbk5hbWUsIFwiXSBcIikgOiBcIlwiKS5jb25jYXQoZGF0YS5wZXJjZW50LCBcIiUgLSBcIikuY29uY2F0KGRhdGEubXNnLCBcIi5cIikpO1xuICAgIH1cbiAgICBzZW5kTWVzc2FnZShcIlByb2dyZXNzXCIsIGRhdGEpO1xuICB9LFxuICBcInN0aWxsLW9rXCI6IGZ1bmN0aW9uIHN0aWxsT2soKSB7XG4gICAgbG9nLmluZm8oXCJOb3RoaW5nIGNoYW5nZWQuXCIpO1xuICAgIGlmIChvcHRpb25zLm92ZXJsYXkpIHtcbiAgICAgIG92ZXJsYXkuc2VuZCh7XG4gICAgICAgIHR5cGU6IFwiRElTTUlTU1wiXG4gICAgICB9KTtcbiAgICB9XG4gICAgc2VuZE1lc3NhZ2UoXCJTdGlsbE9rXCIpO1xuICB9LFxuICBvazogZnVuY3Rpb24gb2soKSB7XG4gICAgc2VuZE1lc3NhZ2UoXCJPa1wiKTtcbiAgICBpZiAob3B0aW9ucy5vdmVybGF5KSB7XG4gICAgICBvdmVybGF5LnNlbmQoe1xuICAgICAgICB0eXBlOiBcIkRJU01JU1NcIlxuICAgICAgfSk7XG4gICAgfVxuICAgIHJlbG9hZEFwcChvcHRpb25zLCBzdGF0dXMpO1xuICB9LFxuICAvKipcbiAgICogQHBhcmFtIHtzdHJpbmd9IGZpbGVcbiAgICovXG4gIFwic3RhdGljLWNoYW5nZWRcIjogZnVuY3Rpb24gc3RhdGljQ2hhbmdlZChmaWxlKSB7XG4gICAgbG9nLmluZm8oXCJcIi5jb25jYXQoZmlsZSA/IFwiXFxcIlwiLmNvbmNhdChmaWxlLCBcIlxcXCJcIikgOiBcIkNvbnRlbnRcIiwgXCIgZnJvbSBzdGF0aWMgZGlyZWN0b3J5IHdhcyBjaGFuZ2VkLiBSZWxvYWRpbmcuLi5cIikpO1xuICAgIHNlbGYubG9jYXRpb24ucmVsb2FkKCk7XG4gIH0sXG4gIC8qKlxuICAgKiBAcGFyYW0ge0Vycm9yW119IHdhcm5pbmdzXG4gICAqIEBwYXJhbSB7YW55fSBwYXJhbXNcbiAgICovXG4gIHdhcm5pbmdzOiBmdW5jdGlvbiB3YXJuaW5ncyhfd2FybmluZ3MsIHBhcmFtcykge1xuICAgIGxvZy53YXJuKFwiV2FybmluZ3Mgd2hpbGUgY29tcGlsaW5nLlwiKTtcbiAgICB2YXIgcHJpbnRhYmxlV2FybmluZ3MgPSBfd2FybmluZ3MubWFwKGZ1bmN0aW9uIChlcnJvcikge1xuICAgICAgdmFyIF9mb3JtYXRQcm9ibGVtID0gZm9ybWF0UHJvYmxlbShcIndhcm5pbmdcIiwgZXJyb3IpLFxuICAgICAgICBoZWFkZXIgPSBfZm9ybWF0UHJvYmxlbS5oZWFkZXIsXG4gICAgICAgIGJvZHkgPSBfZm9ybWF0UHJvYmxlbS5ib2R5O1xuICAgICAgcmV0dXJuIFwiXCIuY29uY2F0KGhlYWRlciwgXCJcXG5cIikuY29uY2F0KHN0cmlwQW5zaShib2R5KSk7XG4gICAgfSk7XG4gICAgc2VuZE1lc3NhZ2UoXCJXYXJuaW5nc1wiLCBwcmludGFibGVXYXJuaW5ncyk7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBwcmludGFibGVXYXJuaW5ncy5sZW5ndGg7IGkrKykge1xuICAgICAgbG9nLndhcm4ocHJpbnRhYmxlV2FybmluZ3NbaV0pO1xuICAgIH1cbiAgICB2YXIgb3ZlcmxheVdhcm5pbmdzU2V0dGluZyA9IHR5cGVvZiBvcHRpb25zLm92ZXJsYXkgPT09IFwiYm9vbGVhblwiID8gb3B0aW9ucy5vdmVybGF5IDogb3B0aW9ucy5vdmVybGF5ICYmIG9wdGlvbnMub3ZlcmxheS53YXJuaW5ncztcbiAgICBpZiAob3ZlcmxheVdhcm5pbmdzU2V0dGluZykge1xuICAgICAgdmFyIHdhcm5pbmdzVG9EaXNwbGF5ID0gdHlwZW9mIG92ZXJsYXlXYXJuaW5nc1NldHRpbmcgPT09IFwiZnVuY3Rpb25cIiA/IF93YXJuaW5ncy5maWx0ZXIob3ZlcmxheVdhcm5pbmdzU2V0dGluZykgOiBfd2FybmluZ3M7XG4gICAgICBpZiAod2FybmluZ3NUb0Rpc3BsYXkubGVuZ3RoKSB7XG4gICAgICAgIG92ZXJsYXkuc2VuZCh7XG4gICAgICAgICAgdHlwZTogXCJCVUlMRF9FUlJPUlwiLFxuICAgICAgICAgIGxldmVsOiBcIndhcm5pbmdcIixcbiAgICAgICAgICBtZXNzYWdlczogX3dhcm5pbmdzXG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH1cbiAgICBpZiAocGFyYW1zICYmIHBhcmFtcy5wcmV2ZW50UmVsb2FkaW5nKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHJlbG9hZEFwcChvcHRpb25zLCBzdGF0dXMpO1xuICB9LFxuICAvKipcbiAgICogQHBhcmFtIHtFcnJvcltdfSBlcnJvcnNcbiAgICovXG4gIGVycm9yczogZnVuY3Rpb24gZXJyb3JzKF9lcnJvcnMpIHtcbiAgICBsb2cuZXJyb3IoXCJFcnJvcnMgd2hpbGUgY29tcGlsaW5nLiBSZWxvYWQgcHJldmVudGVkLlwiKTtcbiAgICB2YXIgcHJpbnRhYmxlRXJyb3JzID0gX2Vycm9ycy5tYXAoZnVuY3Rpb24gKGVycm9yKSB7XG4gICAgICB2YXIgX2Zvcm1hdFByb2JsZW0yID0gZm9ybWF0UHJvYmxlbShcImVycm9yXCIsIGVycm9yKSxcbiAgICAgICAgaGVhZGVyID0gX2Zvcm1hdFByb2JsZW0yLmhlYWRlcixcbiAgICAgICAgYm9keSA9IF9mb3JtYXRQcm9ibGVtMi5ib2R5O1xuICAgICAgcmV0dXJuIFwiXCIuY29uY2F0KGhlYWRlciwgXCJcXG5cIikuY29uY2F0KHN0cmlwQW5zaShib2R5KSk7XG4gICAgfSk7XG4gICAgc2VuZE1lc3NhZ2UoXCJFcnJvcnNcIiwgcHJpbnRhYmxlRXJyb3JzKTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHByaW50YWJsZUVycm9ycy5sZW5ndGg7IGkrKykge1xuICAgICAgbG9nLmVycm9yKHByaW50YWJsZUVycm9yc1tpXSk7XG4gICAgfVxuICAgIHZhciBvdmVybGF5RXJyb3JzU2V0dGluZ3MgPSB0eXBlb2Ygb3B0aW9ucy5vdmVybGF5ID09PSBcImJvb2xlYW5cIiA/IG9wdGlvbnMub3ZlcmxheSA6IG9wdGlvbnMub3ZlcmxheSAmJiBvcHRpb25zLm92ZXJsYXkuZXJyb3JzO1xuICAgIGlmIChvdmVybGF5RXJyb3JzU2V0dGluZ3MpIHtcbiAgICAgIHZhciBlcnJvcnNUb0Rpc3BsYXkgPSB0eXBlb2Ygb3ZlcmxheUVycm9yc1NldHRpbmdzID09PSBcImZ1bmN0aW9uXCIgPyBfZXJyb3JzLmZpbHRlcihvdmVybGF5RXJyb3JzU2V0dGluZ3MpIDogX2Vycm9ycztcbiAgICAgIGlmIChlcnJvcnNUb0Rpc3BsYXkubGVuZ3RoKSB7XG4gICAgICAgIG92ZXJsYXkuc2VuZCh7XG4gICAgICAgICAgdHlwZTogXCJCVUlMRF9FUlJPUlwiLFxuICAgICAgICAgIGxldmVsOiBcImVycm9yXCIsXG4gICAgICAgICAgbWVzc2FnZXM6IF9lcnJvcnNcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfVxuICB9LFxuICAvKipcbiAgICogQHBhcmFtIHtFcnJvcn0gZXJyb3JcbiAgICovXG4gIGVycm9yOiBmdW5jdGlvbiBlcnJvcihfZXJyb3IpIHtcbiAgICBsb2cuZXJyb3IoX2Vycm9yKTtcbiAgfSxcbiAgY2xvc2U6IGZ1bmN0aW9uIGNsb3NlKCkge1xuICAgIGxvZy5pbmZvKFwiRGlzY29ubmVjdGVkIVwiKTtcbiAgICBpZiAob3B0aW9ucy5vdmVybGF5KSB7XG4gICAgICBvdmVybGF5LnNlbmQoe1xuICAgICAgICB0eXBlOiBcIkRJU01JU1NcIlxuICAgICAgfSk7XG4gICAgfVxuICAgIHNlbmRNZXNzYWdlKFwiQ2xvc2VcIik7XG4gIH1cbn07XG52YXIgc29ja2V0VVJMID0gY3JlYXRlU29ja2V0VVJMKHBhcnNlZFJlc291cmNlUXVlcnkpO1xuc29ja2V0KHNvY2tldFVSTCwgb25Tb2NrZXRNZXNzYWdlLCBvcHRpb25zLnJlY29ubmVjdCk7IiwiLyoqKioqKi8gKGZ1bmN0aW9uKCkgeyAvLyB3ZWJwYWNrQm9vdHN0cmFwXG4vKioqKioqLyBcdFwidXNlIHN0cmljdFwiO1xuLyoqKioqKi8gXHR2YXIgX193ZWJwYWNrX21vZHVsZXNfXyA9ICh7XG5cbi8qKiovIFwiLi9jbGllbnQtc3JjL21vZHVsZXMvbG9nZ2VyL3RhcGFibGUuanNcIjpcbi8qISoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiohKlxcXG4gICEqKiogLi9jbGllbnQtc3JjL21vZHVsZXMvbG9nZ2VyL3RhcGFibGUuanMgKioqIVxuICBcXCoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG4vKioqLyAoZnVuY3Rpb24oX191bnVzZWRfd2VicGFja19tb2R1bGUsIF9fd2VicGFja19leHBvcnRzX18sIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxuX193ZWJwYWNrX3JlcXVpcmVfXy5yKF9fd2VicGFja19leHBvcnRzX18pO1xuLyogaGFybW9ueSBleHBvcnQgKi8gX193ZWJwYWNrX3JlcXVpcmVfXy5kKF9fd2VicGFja19leHBvcnRzX18sIHtcbi8qIGhhcm1vbnkgZXhwb3J0ICovICAgU3luY0JhaWxIb29rOiBmdW5jdGlvbigpIHsgcmV0dXJuIC8qIGJpbmRpbmcgKi8gU3luY0JhaWxIb29rOyB9XG4vKiBoYXJtb255IGV4cG9ydCAqLyB9KTtcbmZ1bmN0aW9uIFN5bmNCYWlsSG9vaygpIHtcbiAgcmV0dXJuIHtcbiAgICBjYWxsOiBmdW5jdGlvbiBjYWxsKCkge31cbiAgfTtcbn1cblxuLyoqXG4gKiBDbGllbnQgc3R1YiBmb3IgdGFwYWJsZSBTeW5jQmFpbEhvb2tcbiAqL1xuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGltcG9ydC9wcmVmZXItZGVmYXVsdC1leHBvcnRcblxuXG4vKioqLyB9KSxcblxuLyoqKi8gXCIuL25vZGVfbW9kdWxlcy93ZWJwYWNrL2xpYi9sb2dnaW5nL0xvZ2dlci5qc1wiOlxuLyohKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiEqXFxcbiAgISoqKiAuL25vZGVfbW9kdWxlcy93ZWJwYWNrL2xpYi9sb2dnaW5nL0xvZ2dlci5qcyAqKiohXG4gIFxcKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cbi8qKiovIChmdW5jdGlvbihfX3VudXNlZF93ZWJwYWNrX21vZHVsZSwgZXhwb3J0cykge1xuXG4vKlxuXHRNSVQgTGljZW5zZSBodHRwOi8vd3d3Lm9wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL21pdC1saWNlbnNlLnBocFxuXHRBdXRob3IgVG9iaWFzIEtvcHBlcnMgQHNva3JhXG4qL1xuXG5cblxuZnVuY3Rpb24gX3RvQ29uc3VtYWJsZUFycmF5KGFycikge1xuICByZXR1cm4gX2FycmF5V2l0aG91dEhvbGVzKGFycikgfHwgX2l0ZXJhYmxlVG9BcnJheShhcnIpIHx8IF91bnN1cHBvcnRlZEl0ZXJhYmxlVG9BcnJheShhcnIpIHx8IF9ub25JdGVyYWJsZVNwcmVhZCgpO1xufVxuZnVuY3Rpb24gX25vbkl0ZXJhYmxlU3ByZWFkKCkge1xuICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiSW52YWxpZCBhdHRlbXB0IHRvIHNwcmVhZCBub24taXRlcmFibGUgaW5zdGFuY2UuXFxuSW4gb3JkZXIgdG8gYmUgaXRlcmFibGUsIG5vbi1hcnJheSBvYmplY3RzIG11c3QgaGF2ZSBhIFtTeW1ib2wuaXRlcmF0b3JdKCkgbWV0aG9kLlwiKTtcbn1cbmZ1bmN0aW9uIF91bnN1cHBvcnRlZEl0ZXJhYmxlVG9BcnJheShvLCBtaW5MZW4pIHtcbiAgaWYgKCFvKSByZXR1cm47XG4gIGlmICh0eXBlb2YgbyA9PT0gXCJzdHJpbmdcIikgcmV0dXJuIF9hcnJheUxpa2VUb0FycmF5KG8sIG1pbkxlbik7XG4gIHZhciBuID0gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKG8pLnNsaWNlKDgsIC0xKTtcbiAgaWYgKG4gPT09IFwiT2JqZWN0XCIgJiYgby5jb25zdHJ1Y3RvcikgbiA9IG8uY29uc3RydWN0b3IubmFtZTtcbiAgaWYgKG4gPT09IFwiTWFwXCIgfHwgbiA9PT0gXCJTZXRcIikgcmV0dXJuIEFycmF5LmZyb20obyk7XG4gIGlmIChuID09PSBcIkFyZ3VtZW50c1wiIHx8IC9eKD86VWl8SSludCg/Ojh8MTZ8MzIpKD86Q2xhbXBlZCk/QXJyYXkkLy50ZXN0KG4pKSByZXR1cm4gX2FycmF5TGlrZVRvQXJyYXkobywgbWluTGVuKTtcbn1cbmZ1bmN0aW9uIF9pdGVyYWJsZVRvQXJyYXkoaXRlcikge1xuICBpZiAodHlwZW9mICh0eXBlb2YgU3ltYm9sICE9PSBcInVuZGVmaW5lZFwiID8gU3ltYm9sIDogZnVuY3Rpb24gKGkpIHsgcmV0dXJuIGk7IH0pICE9PSBcInVuZGVmaW5lZFwiICYmIGl0ZXJbKHR5cGVvZiBTeW1ib2wgIT09IFwidW5kZWZpbmVkXCIgPyBTeW1ib2wgOiBmdW5jdGlvbiAoaSkgeyByZXR1cm4gaTsgfSkuaXRlcmF0b3JdICE9IG51bGwgfHwgaXRlcltcIkBAaXRlcmF0b3JcIl0gIT0gbnVsbCkgcmV0dXJuIEFycmF5LmZyb20oaXRlcik7XG59XG5mdW5jdGlvbiBfYXJyYXlXaXRob3V0SG9sZXMoYXJyKSB7XG4gIGlmIChBcnJheS5pc0FycmF5KGFycikpIHJldHVybiBfYXJyYXlMaWtlVG9BcnJheShhcnIpO1xufVxuZnVuY3Rpb24gX2FycmF5TGlrZVRvQXJyYXkoYXJyLCBsZW4pIHtcbiAgaWYgKGxlbiA9PSBudWxsIHx8IGxlbiA+IGFyci5sZW5ndGgpIGxlbiA9IGFyci5sZW5ndGg7XG4gIGZvciAodmFyIGkgPSAwLCBhcnIyID0gbmV3IEFycmF5KGxlbik7IGkgPCBsZW47IGkrKykgYXJyMltpXSA9IGFycltpXTtcbiAgcmV0dXJuIGFycjI7XG59XG5mdW5jdGlvbiBfY2xhc3NDYWxsQ2hlY2soaW5zdGFuY2UsIENvbnN0cnVjdG9yKSB7XG4gIGlmICghKGluc3RhbmNlIGluc3RhbmNlb2YgQ29uc3RydWN0b3IpKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCBjYWxsIGEgY2xhc3MgYXMgYSBmdW5jdGlvblwiKTtcbiAgfVxufVxuZnVuY3Rpb24gX2RlZmluZVByb3BlcnRpZXModGFyZ2V0LCBwcm9wcykge1xuICBmb3IgKHZhciBpID0gMDsgaSA8IHByb3BzLmxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIGRlc2NyaXB0b3IgPSBwcm9wc1tpXTtcbiAgICBkZXNjcmlwdG9yLmVudW1lcmFibGUgPSBkZXNjcmlwdG9yLmVudW1lcmFibGUgfHwgZmFsc2U7XG4gICAgZGVzY3JpcHRvci5jb25maWd1cmFibGUgPSB0cnVlO1xuICAgIGlmIChcInZhbHVlXCIgaW4gZGVzY3JpcHRvcikgZGVzY3JpcHRvci53cml0YWJsZSA9IHRydWU7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwgX3RvUHJvcGVydHlLZXkoZGVzY3JpcHRvci5rZXkpLCBkZXNjcmlwdG9yKTtcbiAgfVxufVxuZnVuY3Rpb24gX2NyZWF0ZUNsYXNzKENvbnN0cnVjdG9yLCBwcm90b1Byb3BzLCBzdGF0aWNQcm9wcykge1xuICBpZiAocHJvdG9Qcm9wcykgX2RlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IucHJvdG90eXBlLCBwcm90b1Byb3BzKTtcbiAgaWYgKHN0YXRpY1Byb3BzKSBfZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvciwgc3RhdGljUHJvcHMpO1xuICBPYmplY3QuZGVmaW5lUHJvcGVydHkoQ29uc3RydWN0b3IsIFwicHJvdG90eXBlXCIsIHtcbiAgICB3cml0YWJsZTogZmFsc2VcbiAgfSk7XG4gIHJldHVybiBDb25zdHJ1Y3Rvcjtcbn1cbmZ1bmN0aW9uIF90b1Byb3BlcnR5S2V5KHQpIHtcbiAgdmFyIGkgPSBfdG9QcmltaXRpdmUodCwgXCJzdHJpbmdcIik7XG4gIHJldHVybiBcInN5bWJvbFwiID09IHR5cGVvZiBpID8gaSA6IGkgKyBcIlwiO1xufVxuZnVuY3Rpb24gX3RvUHJpbWl0aXZlKHQsIHIpIHtcbiAgaWYgKFwib2JqZWN0XCIgIT0gdHlwZW9mIHQgfHwgIXQpIHJldHVybiB0O1xuICB2YXIgZSA9IHRbKHR5cGVvZiBTeW1ib2wgIT09IFwidW5kZWZpbmVkXCIgPyBTeW1ib2wgOiBmdW5jdGlvbiAoaSkgeyByZXR1cm4gaTsgfSkudG9QcmltaXRpdmVdO1xuICBpZiAodm9pZCAwICE9PSBlKSB7XG4gICAgdmFyIGkgPSBlLmNhbGwodCwgciB8fCBcImRlZmF1bHRcIik7XG4gICAgaWYgKFwib2JqZWN0XCIgIT0gdHlwZW9mIGkpIHJldHVybiBpO1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCJAQHRvUHJpbWl0aXZlIG11c3QgcmV0dXJuIGEgcHJpbWl0aXZlIHZhbHVlLlwiKTtcbiAgfVxuICByZXR1cm4gKFwic3RyaW5nXCIgPT09IHIgPyBTdHJpbmcgOiBOdW1iZXIpKHQpO1xufVxudmFyIExvZ1R5cGUgPSBPYmplY3QuZnJlZXplKHtcbiAgZXJyb3I6ICggLyoqIEB0eXBlIHtcImVycm9yXCJ9ICovXCJlcnJvclwiKSxcbiAgLy8gbWVzc2FnZSwgYyBzdHlsZSBhcmd1bWVudHNcbiAgd2FybjogKCAvKiogQHR5cGUge1wid2FyblwifSAqL1wid2FyblwiKSxcbiAgLy8gbWVzc2FnZSwgYyBzdHlsZSBhcmd1bWVudHNcbiAgaW5mbzogKCAvKiogQHR5cGUge1wiaW5mb1wifSAqL1wiaW5mb1wiKSxcbiAgLy8gbWVzc2FnZSwgYyBzdHlsZSBhcmd1bWVudHNcbiAgbG9nOiAoIC8qKiBAdHlwZSB7XCJsb2dcIn0gKi9cImxvZ1wiKSxcbiAgLy8gbWVzc2FnZSwgYyBzdHlsZSBhcmd1bWVudHNcbiAgZGVidWc6ICggLyoqIEB0eXBlIHtcImRlYnVnXCJ9ICovXCJkZWJ1Z1wiKSxcbiAgLy8gbWVzc2FnZSwgYyBzdHlsZSBhcmd1bWVudHNcblxuICB0cmFjZTogKCAvKiogQHR5cGUge1widHJhY2VcIn0gKi9cInRyYWNlXCIpLFxuICAvLyBubyBhcmd1bWVudHNcblxuICBncm91cDogKCAvKiogQHR5cGUge1wiZ3JvdXBcIn0gKi9cImdyb3VwXCIpLFxuICAvLyBbbGFiZWxdXG4gIGdyb3VwQ29sbGFwc2VkOiAoIC8qKiBAdHlwZSB7XCJncm91cENvbGxhcHNlZFwifSAqL1wiZ3JvdXBDb2xsYXBzZWRcIiksXG4gIC8vIFtsYWJlbF1cbiAgZ3JvdXBFbmQ6ICggLyoqIEB0eXBlIHtcImdyb3VwRW5kXCJ9ICovXCJncm91cEVuZFwiKSxcbiAgLy8gW2xhYmVsXVxuXG4gIHByb2ZpbGU6ICggLyoqIEB0eXBlIHtcInByb2ZpbGVcIn0gKi9cInByb2ZpbGVcIiksXG4gIC8vIFtwcm9maWxlTmFtZV1cbiAgcHJvZmlsZUVuZDogKCAvKiogQHR5cGUge1wicHJvZmlsZUVuZFwifSAqL1wicHJvZmlsZUVuZFwiKSxcbiAgLy8gW3Byb2ZpbGVOYW1lXVxuXG4gIHRpbWU6ICggLyoqIEB0eXBlIHtcInRpbWVcIn0gKi9cInRpbWVcIiksXG4gIC8vIG5hbWUsIHRpbWUgYXMgW3NlY29uZHMsIG5hbm9zZWNvbmRzXVxuXG4gIGNsZWFyOiAoIC8qKiBAdHlwZSB7XCJjbGVhclwifSAqL1wiY2xlYXJcIiksXG4gIC8vIG5vIGFyZ3VtZW50c1xuICBzdGF0dXM6ICggLyoqIEB0eXBlIHtcInN0YXR1c1wifSAqL1wic3RhdHVzXCIpIC8vIG1lc3NhZ2UsIGFyZ3VtZW50c1xufSk7XG5leHBvcnRzLkxvZ1R5cGUgPSBMb2dUeXBlO1xuXG4vKiogQHR5cGVkZWYge3R5cGVvZiBMb2dUeXBlW2tleW9mIHR5cGVvZiBMb2dUeXBlXX0gTG9nVHlwZUVudW0gKi9cblxudmFyIExPR19TWU1CT0wgPSAodHlwZW9mIFN5bWJvbCAhPT0gXCJ1bmRlZmluZWRcIiA/IFN5bWJvbCA6IGZ1bmN0aW9uIChpKSB7IHJldHVybiBpOyB9KShcIndlYnBhY2sgbG9nZ2VyIHJhdyBsb2cgbWV0aG9kXCIpO1xudmFyIFRJTUVSU19TWU1CT0wgPSAodHlwZW9mIFN5bWJvbCAhPT0gXCJ1bmRlZmluZWRcIiA/IFN5bWJvbCA6IGZ1bmN0aW9uIChpKSB7IHJldHVybiBpOyB9KShcIndlYnBhY2sgbG9nZ2VyIHRpbWVzXCIpO1xudmFyIFRJTUVSU19BR0dSRUdBVEVTX1NZTUJPTCA9ICh0eXBlb2YgU3ltYm9sICE9PSBcInVuZGVmaW5lZFwiID8gU3ltYm9sIDogZnVuY3Rpb24gKGkpIHsgcmV0dXJuIGk7IH0pKFwid2VicGFjayBsb2dnZXIgYWdncmVnYXRlZCB0aW1lc1wiKTtcbnZhciBXZWJwYWNrTG9nZ2VyID0gLyojX19QVVJFX18qL2Z1bmN0aW9uICgpIHtcbiAgLyoqXG4gICAqIEBwYXJhbSB7ZnVuY3Rpb24oTG9nVHlwZUVudW0sIGFueVtdPSk6IHZvaWR9IGxvZyBsb2cgZnVuY3Rpb25cbiAgICogQHBhcmFtIHtmdW5jdGlvbihzdHJpbmcgfCBmdW5jdGlvbigpOiBzdHJpbmcpOiBXZWJwYWNrTG9nZ2VyfSBnZXRDaGlsZExvZ2dlciBmdW5jdGlvbiB0byBjcmVhdGUgY2hpbGQgbG9nZ2VyXG4gICAqL1xuICBmdW5jdGlvbiBXZWJwYWNrTG9nZ2VyKGxvZywgZ2V0Q2hpbGRMb2dnZXIpIHtcbiAgICBfY2xhc3NDYWxsQ2hlY2sodGhpcywgV2VicGFja0xvZ2dlcik7XG4gICAgdGhpc1tMT0dfU1lNQk9MXSA9IGxvZztcbiAgICB0aGlzLmdldENoaWxkTG9nZ2VyID0gZ2V0Q2hpbGRMb2dnZXI7XG4gIH1cbiAgcmV0dXJuIF9jcmVhdGVDbGFzcyhXZWJwYWNrTG9nZ2VyLCBbe1xuICAgIGtleTogXCJlcnJvclwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBlcnJvcigpIHtcbiAgICAgIGZvciAodmFyIF9sZW4gPSBhcmd1bWVudHMubGVuZ3RoLCBhcmdzID0gbmV3IEFycmF5KF9sZW4pLCBfa2V5ID0gMDsgX2tleSA8IF9sZW47IF9rZXkrKykge1xuICAgICAgICBhcmdzW19rZXldID0gYXJndW1lbnRzW19rZXldO1xuICAgICAgfVxuICAgICAgdGhpc1tMT0dfU1lNQk9MXShMb2dUeXBlLmVycm9yLCBhcmdzKTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6IFwid2FyblwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiB3YXJuKCkge1xuICAgICAgZm9yICh2YXIgX2xlbjIgPSBhcmd1bWVudHMubGVuZ3RoLCBhcmdzID0gbmV3IEFycmF5KF9sZW4yKSwgX2tleTIgPSAwOyBfa2V5MiA8IF9sZW4yOyBfa2V5MisrKSB7XG4gICAgICAgIGFyZ3NbX2tleTJdID0gYXJndW1lbnRzW19rZXkyXTtcbiAgICAgIH1cbiAgICAgIHRoaXNbTE9HX1NZTUJPTF0oTG9nVHlwZS53YXJuLCBhcmdzKTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6IFwiaW5mb1wiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBpbmZvKCkge1xuICAgICAgZm9yICh2YXIgX2xlbjMgPSBhcmd1bWVudHMubGVuZ3RoLCBhcmdzID0gbmV3IEFycmF5KF9sZW4zKSwgX2tleTMgPSAwOyBfa2V5MyA8IF9sZW4zOyBfa2V5MysrKSB7XG4gICAgICAgIGFyZ3NbX2tleTNdID0gYXJndW1lbnRzW19rZXkzXTtcbiAgICAgIH1cbiAgICAgIHRoaXNbTE9HX1NZTUJPTF0oTG9nVHlwZS5pbmZvLCBhcmdzKTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6IFwibG9nXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGxvZygpIHtcbiAgICAgIGZvciAodmFyIF9sZW40ID0gYXJndW1lbnRzLmxlbmd0aCwgYXJncyA9IG5ldyBBcnJheShfbGVuNCksIF9rZXk0ID0gMDsgX2tleTQgPCBfbGVuNDsgX2tleTQrKykge1xuICAgICAgICBhcmdzW19rZXk0XSA9IGFyZ3VtZW50c1tfa2V5NF07XG4gICAgICB9XG4gICAgICB0aGlzW0xPR19TWU1CT0xdKExvZ1R5cGUubG9nLCBhcmdzKTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6IFwiZGVidWdcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gZGVidWcoKSB7XG4gICAgICBmb3IgKHZhciBfbGVuNSA9IGFyZ3VtZW50cy5sZW5ndGgsIGFyZ3MgPSBuZXcgQXJyYXkoX2xlbjUpLCBfa2V5NSA9IDA7IF9rZXk1IDwgX2xlbjU7IF9rZXk1KyspIHtcbiAgICAgICAgYXJnc1tfa2V5NV0gPSBhcmd1bWVudHNbX2tleTVdO1xuICAgICAgfVxuICAgICAgdGhpc1tMT0dfU1lNQk9MXShMb2dUeXBlLmRlYnVnLCBhcmdzKTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6IFwiYXNzZXJ0XCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGFzc2VydChhc3NlcnRpb24pIHtcbiAgICAgIGlmICghYXNzZXJ0aW9uKSB7XG4gICAgICAgIGZvciAodmFyIF9sZW42ID0gYXJndW1lbnRzLmxlbmd0aCwgYXJncyA9IG5ldyBBcnJheShfbGVuNiA+IDEgPyBfbGVuNiAtIDEgOiAwKSwgX2tleTYgPSAxOyBfa2V5NiA8IF9sZW42OyBfa2V5NisrKSB7XG4gICAgICAgICAgYXJnc1tfa2V5NiAtIDFdID0gYXJndW1lbnRzW19rZXk2XTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzW0xPR19TWU1CT0xdKExvZ1R5cGUuZXJyb3IsIGFyZ3MpO1xuICAgICAgfVxuICAgIH1cbiAgfSwge1xuICAgIGtleTogXCJ0cmFjZVwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiB0cmFjZSgpIHtcbiAgICAgIHRoaXNbTE9HX1NZTUJPTF0oTG9nVHlwZS50cmFjZSwgW1wiVHJhY2VcIl0pO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogXCJjbGVhclwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBjbGVhcigpIHtcbiAgICAgIHRoaXNbTE9HX1NZTUJPTF0oTG9nVHlwZS5jbGVhcik7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiBcInN0YXR1c1wiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBzdGF0dXMoKSB7XG4gICAgICBmb3IgKHZhciBfbGVuNyA9IGFyZ3VtZW50cy5sZW5ndGgsIGFyZ3MgPSBuZXcgQXJyYXkoX2xlbjcpLCBfa2V5NyA9IDA7IF9rZXk3IDwgX2xlbjc7IF9rZXk3KyspIHtcbiAgICAgICAgYXJnc1tfa2V5N10gPSBhcmd1bWVudHNbX2tleTddO1xuICAgICAgfVxuICAgICAgdGhpc1tMT0dfU1lNQk9MXShMb2dUeXBlLnN0YXR1cywgYXJncyk7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiBcImdyb3VwXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGdyb3VwKCkge1xuICAgICAgZm9yICh2YXIgX2xlbjggPSBhcmd1bWVudHMubGVuZ3RoLCBhcmdzID0gbmV3IEFycmF5KF9sZW44KSwgX2tleTggPSAwOyBfa2V5OCA8IF9sZW44OyBfa2V5OCsrKSB7XG4gICAgICAgIGFyZ3NbX2tleThdID0gYXJndW1lbnRzW19rZXk4XTtcbiAgICAgIH1cbiAgICAgIHRoaXNbTE9HX1NZTUJPTF0oTG9nVHlwZS5ncm91cCwgYXJncyk7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiBcImdyb3VwQ29sbGFwc2VkXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGdyb3VwQ29sbGFwc2VkKCkge1xuICAgICAgZm9yICh2YXIgX2xlbjkgPSBhcmd1bWVudHMubGVuZ3RoLCBhcmdzID0gbmV3IEFycmF5KF9sZW45KSwgX2tleTkgPSAwOyBfa2V5OSA8IF9sZW45OyBfa2V5OSsrKSB7XG4gICAgICAgIGFyZ3NbX2tleTldID0gYXJndW1lbnRzW19rZXk5XTtcbiAgICAgIH1cbiAgICAgIHRoaXNbTE9HX1NZTUJPTF0oTG9nVHlwZS5ncm91cENvbGxhcHNlZCwgYXJncyk7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiBcImdyb3VwRW5kXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGdyb3VwRW5kKCkge1xuICAgICAgZm9yICh2YXIgX2xlbjEwID0gYXJndW1lbnRzLmxlbmd0aCwgYXJncyA9IG5ldyBBcnJheShfbGVuMTApLCBfa2V5MTAgPSAwOyBfa2V5MTAgPCBfbGVuMTA7IF9rZXkxMCsrKSB7XG4gICAgICAgIGFyZ3NbX2tleTEwXSA9IGFyZ3VtZW50c1tfa2V5MTBdO1xuICAgICAgfVxuICAgICAgdGhpc1tMT0dfU1lNQk9MXShMb2dUeXBlLmdyb3VwRW5kLCBhcmdzKTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6IFwicHJvZmlsZVwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBwcm9maWxlKGxhYmVsKSB7XG4gICAgICB0aGlzW0xPR19TWU1CT0xdKExvZ1R5cGUucHJvZmlsZSwgW2xhYmVsXSk7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiBcInByb2ZpbGVFbmRcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gcHJvZmlsZUVuZChsYWJlbCkge1xuICAgICAgdGhpc1tMT0dfU1lNQk9MXShMb2dUeXBlLnByb2ZpbGVFbmQsIFtsYWJlbF0pO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogXCJ0aW1lXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHRpbWUobGFiZWwpIHtcbiAgICAgIHRoaXNbVElNRVJTX1NZTUJPTF0gPSB0aGlzW1RJTUVSU19TWU1CT0xdIHx8IG5ldyBNYXAoKTtcbiAgICAgIHRoaXNbVElNRVJTX1NZTUJPTF0uc2V0KGxhYmVsLCBwcm9jZXNzLmhydGltZSgpKTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6IFwidGltZUxvZ1wiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiB0aW1lTG9nKGxhYmVsKSB7XG4gICAgICB2YXIgcHJldiA9IHRoaXNbVElNRVJTX1NZTUJPTF0gJiYgdGhpc1tUSU1FUlNfU1lNQk9MXS5nZXQobGFiZWwpO1xuICAgICAgaWYgKCFwcmV2KSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcIk5vIHN1Y2ggbGFiZWwgJ1wiLmNvbmNhdChsYWJlbCwgXCInIGZvciBXZWJwYWNrTG9nZ2VyLnRpbWVMb2coKVwiKSk7XG4gICAgICB9XG4gICAgICB2YXIgdGltZSA9IHByb2Nlc3MuaHJ0aW1lKHByZXYpO1xuICAgICAgdGhpc1tMT0dfU1lNQk9MXShMb2dUeXBlLnRpbWUsIFtsYWJlbF0uY29uY2F0KF90b0NvbnN1bWFibGVBcnJheSh0aW1lKSkpO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogXCJ0aW1lRW5kXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHRpbWVFbmQobGFiZWwpIHtcbiAgICAgIHZhciBwcmV2ID0gdGhpc1tUSU1FUlNfU1lNQk9MXSAmJiB0aGlzW1RJTUVSU19TWU1CT0xdLmdldChsYWJlbCk7XG4gICAgICBpZiAoIXByZXYpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiTm8gc3VjaCBsYWJlbCAnXCIuY29uY2F0KGxhYmVsLCBcIicgZm9yIFdlYnBhY2tMb2dnZXIudGltZUVuZCgpXCIpKTtcbiAgICAgIH1cbiAgICAgIHZhciB0aW1lID0gcHJvY2Vzcy5ocnRpbWUocHJldik7XG4gICAgICB0aGlzW1RJTUVSU19TWU1CT0xdLmRlbGV0ZShsYWJlbCk7XG4gICAgICB0aGlzW0xPR19TWU1CT0xdKExvZ1R5cGUudGltZSwgW2xhYmVsXS5jb25jYXQoX3RvQ29uc3VtYWJsZUFycmF5KHRpbWUpKSk7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiBcInRpbWVBZ2dyZWdhdGVcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gdGltZUFnZ3JlZ2F0ZShsYWJlbCkge1xuICAgICAgdmFyIHByZXYgPSB0aGlzW1RJTUVSU19TWU1CT0xdICYmIHRoaXNbVElNRVJTX1NZTUJPTF0uZ2V0KGxhYmVsKTtcbiAgICAgIGlmICghcHJldikge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJObyBzdWNoIGxhYmVsICdcIi5jb25jYXQobGFiZWwsIFwiJyBmb3IgV2VicGFja0xvZ2dlci50aW1lQWdncmVnYXRlKClcIikpO1xuICAgICAgfVxuICAgICAgdmFyIHRpbWUgPSBwcm9jZXNzLmhydGltZShwcmV2KTtcbiAgICAgIHRoaXNbVElNRVJTX1NZTUJPTF0uZGVsZXRlKGxhYmVsKTtcbiAgICAgIHRoaXNbVElNRVJTX0FHR1JFR0FURVNfU1lNQk9MXSA9IHRoaXNbVElNRVJTX0FHR1JFR0FURVNfU1lNQk9MXSB8fCBuZXcgTWFwKCk7XG4gICAgICB2YXIgY3VycmVudCA9IHRoaXNbVElNRVJTX0FHR1JFR0FURVNfU1lNQk9MXS5nZXQobGFiZWwpO1xuICAgICAgaWYgKGN1cnJlbnQgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICBpZiAodGltZVsxXSArIGN1cnJlbnRbMV0gPiAxZTkpIHtcbiAgICAgICAgICB0aW1lWzBdICs9IGN1cnJlbnRbMF0gKyAxO1xuICAgICAgICAgIHRpbWVbMV0gPSB0aW1lWzFdIC0gMWU5ICsgY3VycmVudFsxXTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aW1lWzBdICs9IGN1cnJlbnRbMF07XG4gICAgICAgICAgdGltZVsxXSArPSBjdXJyZW50WzFdO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICB0aGlzW1RJTUVSU19BR0dSRUdBVEVTX1NZTUJPTF0uc2V0KGxhYmVsLCB0aW1lKTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6IFwidGltZUFnZ3JlZ2F0ZUVuZFwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiB0aW1lQWdncmVnYXRlRW5kKGxhYmVsKSB7XG4gICAgICBpZiAodGhpc1tUSU1FUlNfQUdHUkVHQVRFU19TWU1CT0xdID09PSB1bmRlZmluZWQpIHJldHVybjtcbiAgICAgIHZhciB0aW1lID0gdGhpc1tUSU1FUlNfQUdHUkVHQVRFU19TWU1CT0xdLmdldChsYWJlbCk7XG4gICAgICBpZiAodGltZSA9PT0gdW5kZWZpbmVkKSByZXR1cm47XG4gICAgICB0aGlzW1RJTUVSU19BR0dSRUdBVEVTX1NZTUJPTF0uZGVsZXRlKGxhYmVsKTtcbiAgICAgIHRoaXNbTE9HX1NZTUJPTF0oTG9nVHlwZS50aW1lLCBbbGFiZWxdLmNvbmNhdChfdG9Db25zdW1hYmxlQXJyYXkodGltZSkpKTtcbiAgICB9XG4gIH1dKTtcbn0oKTtcbmV4cG9ydHMuTG9nZ2VyID0gV2VicGFja0xvZ2dlcjtcblxuLyoqKi8gfSksXG5cbi8qKiovIFwiLi9ub2RlX21vZHVsZXMvd2VicGFjay9saWIvbG9nZ2luZy9jcmVhdGVDb25zb2xlTG9nZ2VyLmpzXCI6XG4vKiEqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiEqXFxcbiAgISoqKiAuL25vZGVfbW9kdWxlcy93ZWJwYWNrL2xpYi9sb2dnaW5nL2NyZWF0ZUNvbnNvbGVMb2dnZXIuanMgKioqIVxuICBcXCoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuLyoqKi8gKGZ1bmN0aW9uKG1vZHVsZSwgX191bnVzZWRfd2VicGFja19leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cbi8qXG5cdE1JVCBMaWNlbnNlIGh0dHA6Ly93d3cub3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvbWl0LWxpY2Vuc2UucGhwXG5cdEF1dGhvciBUb2JpYXMgS29wcGVycyBAc29rcmFcbiovXG5cblxuXG5mdW5jdGlvbiBfdG9Db25zdW1hYmxlQXJyYXkoYXJyKSB7XG4gIHJldHVybiBfYXJyYXlXaXRob3V0SG9sZXMoYXJyKSB8fCBfaXRlcmFibGVUb0FycmF5KGFycikgfHwgX3Vuc3VwcG9ydGVkSXRlcmFibGVUb0FycmF5KGFycikgfHwgX25vbkl0ZXJhYmxlU3ByZWFkKCk7XG59XG5mdW5jdGlvbiBfbm9uSXRlcmFibGVTcHJlYWQoKSB7XG4gIHRocm93IG5ldyBUeXBlRXJyb3IoXCJJbnZhbGlkIGF0dGVtcHQgdG8gc3ByZWFkIG5vbi1pdGVyYWJsZSBpbnN0YW5jZS5cXG5JbiBvcmRlciB0byBiZSBpdGVyYWJsZSwgbm9uLWFycmF5IG9iamVjdHMgbXVzdCBoYXZlIGEgW1N5bWJvbC5pdGVyYXRvcl0oKSBtZXRob2QuXCIpO1xufVxuZnVuY3Rpb24gX3Vuc3VwcG9ydGVkSXRlcmFibGVUb0FycmF5KG8sIG1pbkxlbikge1xuICBpZiAoIW8pIHJldHVybjtcbiAgaWYgKHR5cGVvZiBvID09PSBcInN0cmluZ1wiKSByZXR1cm4gX2FycmF5TGlrZVRvQXJyYXkobywgbWluTGVuKTtcbiAgdmFyIG4gPSBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwobykuc2xpY2UoOCwgLTEpO1xuICBpZiAobiA9PT0gXCJPYmplY3RcIiAmJiBvLmNvbnN0cnVjdG9yKSBuID0gby5jb25zdHJ1Y3Rvci5uYW1lO1xuICBpZiAobiA9PT0gXCJNYXBcIiB8fCBuID09PSBcIlNldFwiKSByZXR1cm4gQXJyYXkuZnJvbShvKTtcbiAgaWYgKG4gPT09IFwiQXJndW1lbnRzXCIgfHwgL14oPzpVaXxJKW50KD86OHwxNnwzMikoPzpDbGFtcGVkKT9BcnJheSQvLnRlc3QobikpIHJldHVybiBfYXJyYXlMaWtlVG9BcnJheShvLCBtaW5MZW4pO1xufVxuZnVuY3Rpb24gX2l0ZXJhYmxlVG9BcnJheShpdGVyKSB7XG4gIGlmICh0eXBlb2YgKHR5cGVvZiBTeW1ib2wgIT09IFwidW5kZWZpbmVkXCIgPyBTeW1ib2wgOiBmdW5jdGlvbiAoaSkgeyByZXR1cm4gaTsgfSkgIT09IFwidW5kZWZpbmVkXCIgJiYgaXRlclsodHlwZW9mIFN5bWJvbCAhPT0gXCJ1bmRlZmluZWRcIiA/IFN5bWJvbCA6IGZ1bmN0aW9uIChpKSB7IHJldHVybiBpOyB9KS5pdGVyYXRvcl0gIT0gbnVsbCB8fCBpdGVyW1wiQEBpdGVyYXRvclwiXSAhPSBudWxsKSByZXR1cm4gQXJyYXkuZnJvbShpdGVyKTtcbn1cbmZ1bmN0aW9uIF9hcnJheVdpdGhvdXRIb2xlcyhhcnIpIHtcbiAgaWYgKEFycmF5LmlzQXJyYXkoYXJyKSkgcmV0dXJuIF9hcnJheUxpa2VUb0FycmF5KGFycik7XG59XG5mdW5jdGlvbiBfYXJyYXlMaWtlVG9BcnJheShhcnIsIGxlbikge1xuICBpZiAobGVuID09IG51bGwgfHwgbGVuID4gYXJyLmxlbmd0aCkgbGVuID0gYXJyLmxlbmd0aDtcbiAgZm9yICh2YXIgaSA9IDAsIGFycjIgPSBuZXcgQXJyYXkobGVuKTsgaSA8IGxlbjsgaSsrKSBhcnIyW2ldID0gYXJyW2ldO1xuICByZXR1cm4gYXJyMjtcbn1cbnZhciBfcmVxdWlyZSA9IF9fd2VicGFja19yZXF1aXJlX18oLyohIC4vTG9nZ2VyICovIFwiLi9ub2RlX21vZHVsZXMvd2VicGFjay9saWIvbG9nZ2luZy9Mb2dnZXIuanNcIiksXG4gIExvZ1R5cGUgPSBfcmVxdWlyZS5Mb2dUeXBlO1xuXG4vKiogQHR5cGVkZWYge2ltcG9ydChcIi4uLy4uL2RlY2xhcmF0aW9ucy9XZWJwYWNrT3B0aW9uc1wiKS5GaWx0ZXJJdGVtVHlwZXN9IEZpbHRlckl0ZW1UeXBlcyAqL1xuLyoqIEB0eXBlZGVmIHtpbXBvcnQoXCIuLi8uLi9kZWNsYXJhdGlvbnMvV2VicGFja09wdGlvbnNcIikuRmlsdGVyVHlwZXN9IEZpbHRlclR5cGVzICovXG4vKiogQHR5cGVkZWYge2ltcG9ydChcIi4vTG9nZ2VyXCIpLkxvZ1R5cGVFbnVtfSBMb2dUeXBlRW51bSAqL1xuXG4vKiogQHR5cGVkZWYge2Z1bmN0aW9uKHN0cmluZyk6IGJvb2xlYW59IEZpbHRlckZ1bmN0aW9uICovXG5cbi8qKlxuICogQHR5cGVkZWYge09iamVjdH0gTG9nZ2VyQ29uc29sZVxuICogQHByb3BlcnR5IHtmdW5jdGlvbigpOiB2b2lkfSBjbGVhclxuICogQHByb3BlcnR5IHtmdW5jdGlvbigpOiB2b2lkfSB0cmFjZVxuICogQHByb3BlcnR5IHsoLi4uYXJnczogYW55W10pID0+IHZvaWR9IGluZm9cbiAqIEBwcm9wZXJ0eSB7KC4uLmFyZ3M6IGFueVtdKSA9PiB2b2lkfSBsb2dcbiAqIEBwcm9wZXJ0eSB7KC4uLmFyZ3M6IGFueVtdKSA9PiB2b2lkfSB3YXJuXG4gKiBAcHJvcGVydHkgeyguLi5hcmdzOiBhbnlbXSkgPT4gdm9pZH0gZXJyb3JcbiAqIEBwcm9wZXJ0eSB7KC4uLmFyZ3M6IGFueVtdKSA9PiB2b2lkPX0gZGVidWdcbiAqIEBwcm9wZXJ0eSB7KC4uLmFyZ3M6IGFueVtdKSA9PiB2b2lkPX0gZ3JvdXBcbiAqIEBwcm9wZXJ0eSB7KC4uLmFyZ3M6IGFueVtdKSA9PiB2b2lkPX0gZ3JvdXBDb2xsYXBzZWRcbiAqIEBwcm9wZXJ0eSB7KC4uLmFyZ3M6IGFueVtdKSA9PiB2b2lkPX0gZ3JvdXBFbmRcbiAqIEBwcm9wZXJ0eSB7KC4uLmFyZ3M6IGFueVtdKSA9PiB2b2lkPX0gc3RhdHVzXG4gKiBAcHJvcGVydHkgeyguLi5hcmdzOiBhbnlbXSkgPT4gdm9pZD19IHByb2ZpbGVcbiAqIEBwcm9wZXJ0eSB7KC4uLmFyZ3M6IGFueVtdKSA9PiB2b2lkPX0gcHJvZmlsZUVuZFxuICogQHByb3BlcnR5IHsoLi4uYXJnczogYW55W10pID0+IHZvaWQ9fSBsb2dUaW1lXG4gKi9cblxuLyoqXG4gKiBAdHlwZWRlZiB7T2JqZWN0fSBMb2dnZXJPcHRpb25zXG4gKiBAcHJvcGVydHkge2ZhbHNlfHRydWV8XCJub25lXCJ8XCJlcnJvclwifFwid2FyblwifFwiaW5mb1wifFwibG9nXCJ8XCJ2ZXJib3NlXCJ9IGxldmVsIGxvZ2xldmVsXG4gKiBAcHJvcGVydHkge0ZpbHRlclR5cGVzfGJvb2xlYW59IGRlYnVnIGZpbHRlciBmb3IgZGVidWcgbG9nZ2luZ1xuICogQHByb3BlcnR5IHtMb2dnZXJDb25zb2xlfSBjb25zb2xlIHRoZSBjb25zb2xlIHRvIGxvZyB0b1xuICovXG5cbi8qKlxuICogQHBhcmFtIHtGaWx0ZXJJdGVtVHlwZXN9IGl0ZW0gYW4gaW5wdXQgaXRlbVxuICogQHJldHVybnMge0ZpbHRlckZ1bmN0aW9ufSBmaWx0ZXIgZnVuY3Rpb25cbiAqL1xudmFyIGZpbHRlclRvRnVuY3Rpb24gPSBmdW5jdGlvbiBmaWx0ZXJUb0Z1bmN0aW9uKGl0ZW0pIHtcbiAgaWYgKHR5cGVvZiBpdGVtID09PSBcInN0cmluZ1wiKSB7XG4gICAgdmFyIHJlZ0V4cCA9IG5ldyBSZWdFeHAoXCJbXFxcXFxcXFwvXVwiLmNvbmNhdChpdGVtLnJlcGxhY2UoL1stW1xcXXt9KCkqKz8uXFxcXF4kfF0vZywgXCJcXFxcJCZcIiksIFwiKFtcXFxcXFxcXC9dfCR8IXxcXFxcPylcIikpO1xuICAgIHJldHVybiBmdW5jdGlvbiAoaWRlbnQpIHtcbiAgICAgIHJldHVybiByZWdFeHAudGVzdChpZGVudCk7XG4gICAgfTtcbiAgfVxuICBpZiAoaXRlbSAmJiB0eXBlb2YgaXRlbSA9PT0gXCJvYmplY3RcIiAmJiB0eXBlb2YgaXRlbS50ZXN0ID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICByZXR1cm4gZnVuY3Rpb24gKGlkZW50KSB7XG4gICAgICByZXR1cm4gaXRlbS50ZXN0KGlkZW50KTtcbiAgICB9O1xuICB9XG4gIGlmICh0eXBlb2YgaXRlbSA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgcmV0dXJuIGl0ZW07XG4gIH1cbiAgaWYgKHR5cGVvZiBpdGVtID09PSBcImJvb2xlYW5cIikge1xuICAgIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgICByZXR1cm4gaXRlbTtcbiAgICB9O1xuICB9XG59O1xuXG4vKipcbiAqIEBlbnVtIHtudW1iZXJ9XG4gKi9cbnZhciBMb2dMZXZlbCA9IHtcbiAgbm9uZTogNixcbiAgZmFsc2U6IDYsXG4gIGVycm9yOiA1LFxuICB3YXJuOiA0LFxuICBpbmZvOiAzLFxuICBsb2c6IDIsXG4gIHRydWU6IDIsXG4gIHZlcmJvc2U6IDFcbn07XG5cbi8qKlxuICogQHBhcmFtIHtMb2dnZXJPcHRpb25zfSBvcHRpb25zIG9wdGlvbnMgb2JqZWN0XG4gKiBAcmV0dXJucyB7ZnVuY3Rpb24oc3RyaW5nLCBMb2dUeXBlRW51bSwgYW55W10pOiB2b2lkfSBsb2dnaW5nIGZ1bmN0aW9uXG4gKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKF9yZWYpIHtcbiAgdmFyIF9yZWYkbGV2ZWwgPSBfcmVmLmxldmVsLFxuICAgIGxldmVsID0gX3JlZiRsZXZlbCA9PT0gdm9pZCAwID8gXCJpbmZvXCIgOiBfcmVmJGxldmVsLFxuICAgIF9yZWYkZGVidWcgPSBfcmVmLmRlYnVnLFxuICAgIGRlYnVnID0gX3JlZiRkZWJ1ZyA9PT0gdm9pZCAwID8gZmFsc2UgOiBfcmVmJGRlYnVnLFxuICAgIGNvbnNvbGUgPSBfcmVmLmNvbnNvbGU7XG4gIHZhciBkZWJ1Z0ZpbHRlcnMgPSB0eXBlb2YgZGVidWcgPT09IFwiYm9vbGVhblwiID8gW2Z1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gZGVidWc7XG4gIH1dIDogLyoqIEB0eXBlIHtGaWx0ZXJJdGVtVHlwZXNbXX0gKi9bXS5jb25jYXQoZGVidWcpLm1hcChmaWx0ZXJUb0Z1bmN0aW9uKTtcbiAgLyoqIEB0eXBlIHtudW1iZXJ9ICovXG4gIHZhciBsb2dsZXZlbCA9IExvZ0xldmVsW1wiXCIuY29uY2F0KGxldmVsKV0gfHwgMDtcblxuICAvKipcbiAgICogQHBhcmFtIHtzdHJpbmd9IG5hbWUgbmFtZSBvZiB0aGUgbG9nZ2VyXG4gICAqIEBwYXJhbSB7TG9nVHlwZUVudW19IHR5cGUgdHlwZSBvZiB0aGUgbG9nIGVudHJ5XG4gICAqIEBwYXJhbSB7YW55W119IGFyZ3MgYXJndW1lbnRzIG9mIHRoZSBsb2cgZW50cnlcbiAgICogQHJldHVybnMge3ZvaWR9XG4gICAqL1xuICB2YXIgbG9nZ2VyID0gZnVuY3Rpb24gbG9nZ2VyKG5hbWUsIHR5cGUsIGFyZ3MpIHtcbiAgICB2YXIgbGFiZWxlZEFyZ3MgPSBmdW5jdGlvbiBsYWJlbGVkQXJncygpIHtcbiAgICAgIGlmIChBcnJheS5pc0FycmF5KGFyZ3MpKSB7XG4gICAgICAgIGlmIChhcmdzLmxlbmd0aCA+IDAgJiYgdHlwZW9mIGFyZ3NbMF0gPT09IFwic3RyaW5nXCIpIHtcbiAgICAgICAgICByZXR1cm4gW1wiW1wiLmNvbmNhdChuYW1lLCBcIl0gXCIpLmNvbmNhdChhcmdzWzBdKV0uY29uY2F0KF90b0NvbnN1bWFibGVBcnJheShhcmdzLnNsaWNlKDEpKSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmV0dXJuIFtcIltcIi5jb25jYXQobmFtZSwgXCJdXCIpXS5jb25jYXQoX3RvQ29uc3VtYWJsZUFycmF5KGFyZ3MpKTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIFtdO1xuICAgICAgfVxuICAgIH07XG4gICAgdmFyIGRlYnVnID0gZGVidWdGaWx0ZXJzLnNvbWUoZnVuY3Rpb24gKGYpIHtcbiAgICAgIHJldHVybiBmKG5hbWUpO1xuICAgIH0pO1xuICAgIHN3aXRjaCAodHlwZSkge1xuICAgICAgY2FzZSBMb2dUeXBlLmRlYnVnOlxuICAgICAgICBpZiAoIWRlYnVnKSByZXR1cm47XG4gICAgICAgIGlmICh0eXBlb2YgY29uc29sZS5kZWJ1ZyA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgICAgY29uc29sZS5kZWJ1Zy5hcHBseShjb25zb2xlLCBfdG9Db25zdW1hYmxlQXJyYXkobGFiZWxlZEFyZ3MoKSkpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGNvbnNvbGUubG9nLmFwcGx5KGNvbnNvbGUsIF90b0NvbnN1bWFibGVBcnJheShsYWJlbGVkQXJncygpKSk7XG4gICAgICAgIH1cbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIExvZ1R5cGUubG9nOlxuICAgICAgICBpZiAoIWRlYnVnICYmIGxvZ2xldmVsID4gTG9nTGV2ZWwubG9nKSByZXR1cm47XG4gICAgICAgIGNvbnNvbGUubG9nLmFwcGx5KGNvbnNvbGUsIF90b0NvbnN1bWFibGVBcnJheShsYWJlbGVkQXJncygpKSk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBMb2dUeXBlLmluZm86XG4gICAgICAgIGlmICghZGVidWcgJiYgbG9nbGV2ZWwgPiBMb2dMZXZlbC5pbmZvKSByZXR1cm47XG4gICAgICAgIGNvbnNvbGUuaW5mby5hcHBseShjb25zb2xlLCBfdG9Db25zdW1hYmxlQXJyYXkobGFiZWxlZEFyZ3MoKSkpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgTG9nVHlwZS53YXJuOlxuICAgICAgICBpZiAoIWRlYnVnICYmIGxvZ2xldmVsID4gTG9nTGV2ZWwud2FybikgcmV0dXJuO1xuICAgICAgICBjb25zb2xlLndhcm4uYXBwbHkoY29uc29sZSwgX3RvQ29uc3VtYWJsZUFycmF5KGxhYmVsZWRBcmdzKCkpKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIExvZ1R5cGUuZXJyb3I6XG4gICAgICAgIGlmICghZGVidWcgJiYgbG9nbGV2ZWwgPiBMb2dMZXZlbC5lcnJvcikgcmV0dXJuO1xuICAgICAgICBjb25zb2xlLmVycm9yLmFwcGx5KGNvbnNvbGUsIF90b0NvbnN1bWFibGVBcnJheShsYWJlbGVkQXJncygpKSk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBMb2dUeXBlLnRyYWNlOlxuICAgICAgICBpZiAoIWRlYnVnKSByZXR1cm47XG4gICAgICAgIGNvbnNvbGUudHJhY2UoKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIExvZ1R5cGUuZ3JvdXBDb2xsYXBzZWQ6XG4gICAgICAgIGlmICghZGVidWcgJiYgbG9nbGV2ZWwgPiBMb2dMZXZlbC5sb2cpIHJldHVybjtcbiAgICAgICAgaWYgKCFkZWJ1ZyAmJiBsb2dsZXZlbCA+IExvZ0xldmVsLnZlcmJvc2UpIHtcbiAgICAgICAgICBpZiAodHlwZW9mIGNvbnNvbGUuZ3JvdXBDb2xsYXBzZWQgPT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgICAgICAgY29uc29sZS5ncm91cENvbGxhcHNlZC5hcHBseShjb25zb2xlLCBfdG9Db25zdW1hYmxlQXJyYXkobGFiZWxlZEFyZ3MoKSkpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZy5hcHBseShjb25zb2xlLCBfdG9Db25zdW1hYmxlQXJyYXkobGFiZWxlZEFyZ3MoKSkpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgLy8gZmFsbHMgdGhyb3VnaFxuICAgICAgY2FzZSBMb2dUeXBlLmdyb3VwOlxuICAgICAgICBpZiAoIWRlYnVnICYmIGxvZ2xldmVsID4gTG9nTGV2ZWwubG9nKSByZXR1cm47XG4gICAgICAgIGlmICh0eXBlb2YgY29uc29sZS5ncm91cCA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgICAgY29uc29sZS5ncm91cC5hcHBseShjb25zb2xlLCBfdG9Db25zdW1hYmxlQXJyYXkobGFiZWxlZEFyZ3MoKSkpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGNvbnNvbGUubG9nLmFwcGx5KGNvbnNvbGUsIF90b0NvbnN1bWFibGVBcnJheShsYWJlbGVkQXJncygpKSk7XG4gICAgICAgIH1cbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIExvZ1R5cGUuZ3JvdXBFbmQ6XG4gICAgICAgIGlmICghZGVidWcgJiYgbG9nbGV2ZWwgPiBMb2dMZXZlbC5sb2cpIHJldHVybjtcbiAgICAgICAgaWYgKHR5cGVvZiBjb25zb2xlLmdyb3VwRW5kID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgICAgICBjb25zb2xlLmdyb3VwRW5kKCk7XG4gICAgICAgIH1cbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIExvZ1R5cGUudGltZTpcbiAgICAgICAge1xuICAgICAgICAgIGlmICghZGVidWcgJiYgbG9nbGV2ZWwgPiBMb2dMZXZlbC5sb2cpIHJldHVybjtcbiAgICAgICAgICB2YXIgbXMgPSBhcmdzWzFdICogMTAwMCArIGFyZ3NbMl0gLyAxMDAwMDAwO1xuICAgICAgICAgIHZhciBtc2cgPSBcIltcIi5jb25jYXQobmFtZSwgXCJdIFwiKS5jb25jYXQoYXJnc1swXSwgXCI6IFwiKS5jb25jYXQobXMsIFwiIG1zXCIpO1xuICAgICAgICAgIGlmICh0eXBlb2YgY29uc29sZS5sb2dUaW1lID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nVGltZShtc2cpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhtc2cpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgY2FzZSBMb2dUeXBlLnByb2ZpbGU6XG4gICAgICAgIGlmICh0eXBlb2YgY29uc29sZS5wcm9maWxlID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgICAgICBjb25zb2xlLnByb2ZpbGUuYXBwbHkoY29uc29sZSwgX3RvQ29uc3VtYWJsZUFycmF5KGxhYmVsZWRBcmdzKCkpKTtcbiAgICAgICAgfVxuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgTG9nVHlwZS5wcm9maWxlRW5kOlxuICAgICAgICBpZiAodHlwZW9mIGNvbnNvbGUucHJvZmlsZUVuZCA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgICAgY29uc29sZS5wcm9maWxlRW5kLmFwcGx5KGNvbnNvbGUsIF90b0NvbnN1bWFibGVBcnJheShsYWJlbGVkQXJncygpKSk7XG4gICAgICAgIH1cbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIExvZ1R5cGUuY2xlYXI6XG4gICAgICAgIGlmICghZGVidWcgJiYgbG9nbGV2ZWwgPiBMb2dMZXZlbC5sb2cpIHJldHVybjtcbiAgICAgICAgaWYgKHR5cGVvZiBjb25zb2xlLmNsZWFyID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgICAgICBjb25zb2xlLmNsZWFyKCk7XG4gICAgICAgIH1cbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIExvZ1R5cGUuc3RhdHVzOlxuICAgICAgICBpZiAoIWRlYnVnICYmIGxvZ2xldmVsID4gTG9nTGV2ZWwuaW5mbykgcmV0dXJuO1xuICAgICAgICBpZiAodHlwZW9mIGNvbnNvbGUuc3RhdHVzID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgICAgICBpZiAoYXJncy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgIGNvbnNvbGUuc3RhdHVzKCk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNvbnNvbGUuc3RhdHVzLmFwcGx5KGNvbnNvbGUsIF90b0NvbnN1bWFibGVBcnJheShsYWJlbGVkQXJncygpKSk7XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGlmIChhcmdzLmxlbmd0aCAhPT0gMCkge1xuICAgICAgICAgICAgY29uc29sZS5pbmZvLmFwcGx5KGNvbnNvbGUsIF90b0NvbnN1bWFibGVBcnJheShsYWJlbGVkQXJncygpKSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGJyZWFrO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiVW5leHBlY3RlZCBMb2dUeXBlIFwiLmNvbmNhdCh0eXBlKSk7XG4gICAgfVxuICB9O1xuICByZXR1cm4gbG9nZ2VyO1xufTtcblxuLyoqKi8gfSksXG5cbi8qKiovIFwiLi9ub2RlX21vZHVsZXMvd2VicGFjay9saWIvbG9nZ2luZy9ydW50aW1lLmpzXCI6XG4vKiEqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiEqXFxcbiAgISoqKiAuL25vZGVfbW9kdWxlcy93ZWJwYWNrL2xpYi9sb2dnaW5nL3J1bnRpbWUuanMgKioqIVxuICBcXCoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuLyoqKi8gKGZ1bmN0aW9uKF9fdW51c2VkX3dlYnBhY2tfbW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cbi8qXG5cdE1JVCBMaWNlbnNlIGh0dHA6Ly93d3cub3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvbWl0LWxpY2Vuc2UucGhwXG5cdEF1dGhvciBUb2JpYXMgS29wcGVycyBAc29rcmFcbiovXG5cblxuXG5mdW5jdGlvbiBfZXh0ZW5kcygpIHtcbiAgX2V4dGVuZHMgPSBPYmplY3QuYXNzaWduID8gT2JqZWN0LmFzc2lnbi5iaW5kKCkgOiBmdW5jdGlvbiAodGFyZ2V0KSB7XG4gICAgZm9yICh2YXIgaSA9IDE7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHZhciBzb3VyY2UgPSBhcmd1bWVudHNbaV07XG4gICAgICBmb3IgKHZhciBrZXkgaW4gc291cmNlKSB7XG4gICAgICAgIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoc291cmNlLCBrZXkpKSB7XG4gICAgICAgICAgdGFyZ2V0W2tleV0gPSBzb3VyY2Vba2V5XTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gdGFyZ2V0O1xuICB9O1xuICByZXR1cm4gX2V4dGVuZHMuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbn1cbnZhciBfcmVxdWlyZSA9IF9fd2VicGFja19yZXF1aXJlX18oLyohIHRhcGFibGUgKi8gXCIuL2NsaWVudC1zcmMvbW9kdWxlcy9sb2dnZXIvdGFwYWJsZS5qc1wiKSxcbiAgU3luY0JhaWxIb29rID0gX3JlcXVpcmUuU3luY0JhaWxIb29rO1xudmFyIF9yZXF1aXJlMiA9IF9fd2VicGFja19yZXF1aXJlX18oLyohIC4vTG9nZ2VyICovIFwiLi9ub2RlX21vZHVsZXMvd2VicGFjay9saWIvbG9nZ2luZy9Mb2dnZXIuanNcIiksXG4gIExvZ2dlciA9IF9yZXF1aXJlMi5Mb2dnZXI7XG52YXIgY3JlYXRlQ29uc29sZUxvZ2dlciA9IF9fd2VicGFja19yZXF1aXJlX18oLyohIC4vY3JlYXRlQ29uc29sZUxvZ2dlciAqLyBcIi4vbm9kZV9tb2R1bGVzL3dlYnBhY2svbGliL2xvZ2dpbmcvY3JlYXRlQ29uc29sZUxvZ2dlci5qc1wiKTtcblxuLyoqIEB0eXBlIHtjcmVhdGVDb25zb2xlTG9nZ2VyLkxvZ2dlck9wdGlvbnN9ICovXG52YXIgY3VycmVudERlZmF1bHRMb2dnZXJPcHRpb25zID0ge1xuICBsZXZlbDogXCJpbmZvXCIsXG4gIGRlYnVnOiBmYWxzZSxcbiAgY29uc29sZTogY29uc29sZVxufTtcbnZhciBjdXJyZW50RGVmYXVsdExvZ2dlciA9IGNyZWF0ZUNvbnNvbGVMb2dnZXIoY3VycmVudERlZmF1bHRMb2dnZXJPcHRpb25zKTtcblxuLyoqXG4gKiBAcGFyYW0ge3N0cmluZ30gbmFtZSBuYW1lIG9mIHRoZSBsb2dnZXJcbiAqIEByZXR1cm5zIHtMb2dnZXJ9IGEgbG9nZ2VyXG4gKi9cbmV4cG9ydHMuZ2V0TG9nZ2VyID0gZnVuY3Rpb24gKG5hbWUpIHtcbiAgcmV0dXJuIG5ldyBMb2dnZXIoZnVuY3Rpb24gKHR5cGUsIGFyZ3MpIHtcbiAgICBpZiAoZXhwb3J0cy5ob29rcy5sb2cuY2FsbChuYW1lLCB0eXBlLCBhcmdzKSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICBjdXJyZW50RGVmYXVsdExvZ2dlcihuYW1lLCB0eXBlLCBhcmdzKTtcbiAgICB9XG4gIH0sIGZ1bmN0aW9uIChjaGlsZE5hbWUpIHtcbiAgICByZXR1cm4gZXhwb3J0cy5nZXRMb2dnZXIoXCJcIi5jb25jYXQobmFtZSwgXCIvXCIpLmNvbmNhdChjaGlsZE5hbWUpKTtcbiAgfSk7XG59O1xuXG4vKipcbiAqIEBwYXJhbSB7Y3JlYXRlQ29uc29sZUxvZ2dlci5Mb2dnZXJPcHRpb25zfSBvcHRpb25zIG5ldyBvcHRpb25zLCBtZXJnZSB3aXRoIG9sZCBvcHRpb25zXG4gKiBAcmV0dXJucyB7dm9pZH1cbiAqL1xuZXhwb3J0cy5jb25maWd1cmVEZWZhdWx0TG9nZ2VyID0gZnVuY3Rpb24gKG9wdGlvbnMpIHtcbiAgX2V4dGVuZHMoY3VycmVudERlZmF1bHRMb2dnZXJPcHRpb25zLCBvcHRpb25zKTtcbiAgY3VycmVudERlZmF1bHRMb2dnZXIgPSBjcmVhdGVDb25zb2xlTG9nZ2VyKGN1cnJlbnREZWZhdWx0TG9nZ2VyT3B0aW9ucyk7XG59O1xuZXhwb3J0cy5ob29rcyA9IHtcbiAgbG9nOiBuZXcgU3luY0JhaWxIb29rKFtcIm9yaWdpblwiLCBcInR5cGVcIiwgXCJhcmdzXCJdKVxufTtcblxuLyoqKi8gfSlcblxuLyoqKioqKi8gXHR9KTtcbi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG4vKioqKioqLyBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbi8qKioqKiovIFx0dmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuLyoqKioqKi8gXHRcbi8qKioqKiovIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbi8qKioqKiovIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuLyoqKioqKi8gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuLyoqKioqKi8gXHRcdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuLyoqKioqKi8gXHRcdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuLyoqKioqKi8gXHRcdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuLyoqKioqKi8gXHRcdH1cbi8qKioqKiovIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuLyoqKioqKi8gXHRcdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuLyoqKioqKi8gXHRcdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuLyoqKioqKi8gXHRcdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcbi8qKioqKiovIFx0XHRcdGV4cG9ydHM6IHt9XG4vKioqKioqLyBcdFx0fTtcbi8qKioqKiovIFx0XG4vKioqKioqLyBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4vKioqKioqLyBcdFx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG4vKioqKioqLyBcdFxuLyoqKioqKi8gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4vKioqKioqLyBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuLyoqKioqKi8gXHR9XG4vKioqKioqLyBcdFxuLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cbi8qKioqKiovIFx0Lyogd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzICovXG4vKioqKioqLyBcdCFmdW5jdGlvbigpIHtcbi8qKioqKiovIFx0XHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG4vKioqKioqLyBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgZGVmaW5pdGlvbikge1xuLyoqKioqKi8gXHRcdFx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuLyoqKioqKi8gXHRcdFx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcbi8qKioqKiovIFx0XHRcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuLyoqKioqKi8gXHRcdFx0XHR9XG4vKioqKioqLyBcdFx0XHR9XG4vKioqKioqLyBcdFx0fTtcbi8qKioqKiovIFx0fSgpO1xuLyoqKioqKi8gXHRcbi8qKioqKiovIFx0Lyogd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCAqL1xuLyoqKioqKi8gXHQhZnVuY3Rpb24oKSB7XG4vKioqKioqLyBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqLCBwcm9wKSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKTsgfVxuLyoqKioqKi8gXHR9KCk7XG4vKioqKioqLyBcdFxuLyoqKioqKi8gXHQvKiB3ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0ICovXG4vKioqKioqLyBcdCFmdW5jdGlvbigpIHtcbi8qKioqKiovIFx0XHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4vKioqKioqLyBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuLyoqKioqKi8gXHRcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4vKioqKioqLyBcdFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuLyoqKioqKi8gXHRcdFx0fVxuLyoqKioqKi8gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbi8qKioqKiovIFx0XHR9O1xuLyoqKioqKi8gXHR9KCk7XG4vKioqKioqLyBcdFxuLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cbnZhciBfX3dlYnBhY2tfZXhwb3J0c19fID0ge307XG4vLyBUaGlzIGVudHJ5IG5lZWQgdG8gYmUgd3JhcHBlZCBpbiBhbiBJSUZFIGJlY2F1c2UgaXQgbmVlZCB0byBiZSBpc29sYXRlZCBhZ2FpbnN0IG90aGVyIG1vZHVsZXMgaW4gdGhlIGNodW5rLlxuIWZ1bmN0aW9uKCkge1xuLyohKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiohKlxcXG4gICEqKiogLi9jbGllbnQtc3JjL21vZHVsZXMvbG9nZ2VyL2luZGV4LmpzICoqKiFcbiAgXFwqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cbl9fd2VicGFja19yZXF1aXJlX18ucihfX3dlYnBhY2tfZXhwb3J0c19fKTtcbi8qIGhhcm1vbnkgZXhwb3J0ICovIF9fd2VicGFja19yZXF1aXJlX18uZChfX3dlYnBhY2tfZXhwb3J0c19fLCB7XG4vKiBoYXJtb255IGV4cG9ydCAqLyAgIFwiZGVmYXVsdFwiOiBmdW5jdGlvbigpIHsgcmV0dXJuIC8qIHJlZXhwb3J0IGRlZmF1bHQgZXhwb3J0IGZyb20gbmFtZWQgbW9kdWxlICovIHdlYnBhY2tfbGliX2xvZ2dpbmdfcnVudGltZV9qc19fV0VCUEFDS19JTVBPUlRFRF9NT0RVTEVfMF9fOyB9XG4vKiBoYXJtb255IGV4cG9ydCAqLyB9KTtcbi8qIGhhcm1vbnkgaW1wb3J0ICovIHZhciB3ZWJwYWNrX2xpYl9sb2dnaW5nX3J1bnRpbWVfanNfX1dFQlBBQ0tfSU1QT1JURURfTU9EVUxFXzBfXyA9IF9fd2VicGFja19yZXF1aXJlX18oLyohIHdlYnBhY2svbGliL2xvZ2dpbmcvcnVudGltZS5qcyAqLyBcIi4vbm9kZV9tb2R1bGVzL3dlYnBhY2svbGliL2xvZ2dpbmcvcnVudGltZS5qc1wiKTtcblxufSgpO1xudmFyIF9fd2VicGFja19leHBvcnRfdGFyZ2V0X18gPSBleHBvcnRzO1xuZm9yKHZhciBpIGluIF9fd2VicGFja19leHBvcnRzX18pIF9fd2VicGFja19leHBvcnRfdGFyZ2V0X19baV0gPSBfX3dlYnBhY2tfZXhwb3J0c19fW2ldO1xuaWYoX193ZWJwYWNrX2V4cG9ydHNfXy5fX2VzTW9kdWxlKSBPYmplY3QuZGVmaW5lUHJvcGVydHkoX193ZWJwYWNrX2V4cG9ydF90YXJnZXRfXywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG4vKioqKioqLyB9KSgpXG47IiwiZnVuY3Rpb24gb3duS2V5cyhlLCByKSB7IHZhciB0ID0gT2JqZWN0LmtleXMoZSk7IGlmIChPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzKSB7IHZhciBvID0gT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyhlKTsgciAmJiAobyA9IG8uZmlsdGVyKGZ1bmN0aW9uIChyKSB7IHJldHVybiBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKGUsIHIpLmVudW1lcmFibGU7IH0pKSwgdC5wdXNoLmFwcGx5KHQsIG8pOyB9IHJldHVybiB0OyB9XG5mdW5jdGlvbiBfb2JqZWN0U3ByZWFkKGUpIHsgZm9yICh2YXIgciA9IDE7IHIgPCBhcmd1bWVudHMubGVuZ3RoOyByKyspIHsgdmFyIHQgPSBudWxsICE9IGFyZ3VtZW50c1tyXSA/IGFyZ3VtZW50c1tyXSA6IHt9OyByICUgMiA/IG93bktleXMoT2JqZWN0KHQpLCAhMCkuZm9yRWFjaChmdW5jdGlvbiAocikgeyBfZGVmaW5lUHJvcGVydHkoZSwgciwgdFtyXSk7IH0pIDogT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcnMgPyBPYmplY3QuZGVmaW5lUHJvcGVydGllcyhlLCBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9ycyh0KSkgOiBvd25LZXlzKE9iamVjdCh0KSkuZm9yRWFjaChmdW5jdGlvbiAocikgeyBPYmplY3QuZGVmaW5lUHJvcGVydHkoZSwgciwgT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcih0LCByKSk7IH0pOyB9IHJldHVybiBlOyB9XG5mdW5jdGlvbiBfZGVmaW5lUHJvcGVydHkob2JqLCBrZXksIHZhbHVlKSB7IGtleSA9IF90b1Byb3BlcnR5S2V5KGtleSk7IGlmIChrZXkgaW4gb2JqKSB7IE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvYmosIGtleSwgeyB2YWx1ZTogdmFsdWUsIGVudW1lcmFibGU6IHRydWUsIGNvbmZpZ3VyYWJsZTogdHJ1ZSwgd3JpdGFibGU6IHRydWUgfSk7IH0gZWxzZSB7IG9ialtrZXldID0gdmFsdWU7IH0gcmV0dXJuIG9iajsgfVxuZnVuY3Rpb24gX3RvUHJvcGVydHlLZXkodCkgeyB2YXIgaSA9IF90b1ByaW1pdGl2ZSh0LCBcInN0cmluZ1wiKTsgcmV0dXJuIFwic3ltYm9sXCIgPT0gdHlwZW9mIGkgPyBpIDogaSArIFwiXCI7IH1cbmZ1bmN0aW9uIF90b1ByaW1pdGl2ZSh0LCByKSB7IGlmIChcIm9iamVjdFwiICE9IHR5cGVvZiB0IHx8ICF0KSByZXR1cm4gdDsgdmFyIGUgPSB0W1N5bWJvbC50b1ByaW1pdGl2ZV07IGlmICh2b2lkIDAgIT09IGUpIHsgdmFyIGkgPSBlLmNhbGwodCwgciB8fCBcImRlZmF1bHRcIik7IGlmIChcIm9iamVjdFwiICE9IHR5cGVvZiBpKSByZXR1cm4gaTsgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkBAdG9QcmltaXRpdmUgbXVzdCByZXR1cm4gYSBwcmltaXRpdmUgdmFsdWUuXCIpOyB9IHJldHVybiAoXCJzdHJpbmdcIiA9PT0gciA/IFN0cmluZyA6IE51bWJlcikodCk7IH1cbi8vIFRoZSBlcnJvciBvdmVybGF5IGlzIGluc3BpcmVkIChhbmQgbW9zdGx5IGNvcGllZCkgZnJvbSBDcmVhdGUgUmVhY3QgQXBwIChodHRwczovL2dpdGh1Yi5jb20vZmFjZWJvb2tpbmN1YmF0b3IvY3JlYXRlLXJlYWN0LWFwcClcbi8vIFRoZXksIGluIHR1cm4sIGdvdCBpbnNwaXJlZCBieSB3ZWJwYWNrLWhvdC1taWRkbGV3YXJlIChodHRwczovL2dpdGh1Yi5jb20vZ2xlbmphbWluL3dlYnBhY2staG90LW1pZGRsZXdhcmUpLlxuXG5pbXBvcnQgYW5zaUhUTUwgZnJvbSBcImFuc2ktaHRtbC1jb21tdW5pdHlcIjtcbmltcG9ydCB7IGVuY29kZSB9IGZyb20gXCJodG1sLWVudGl0aWVzXCI7XG5pbXBvcnQgeyBsaXN0ZW5Ub1J1bnRpbWVFcnJvciwgbGlzdGVuVG9VbmhhbmRsZWRSZWplY3Rpb24sIHBhcnNlRXJyb3JUb1N0YWNrcyB9IGZyb20gXCIuL292ZXJsYXkvcnVudGltZS1lcnJvci5qc1wiO1xuaW1wb3J0IGNyZWF0ZU92ZXJsYXlNYWNoaW5lIGZyb20gXCIuL292ZXJsYXkvc3RhdGUtbWFjaGluZS5qc1wiO1xuaW1wb3J0IHsgY29udGFpbmVyU3R5bGUsIGRpc21pc3NCdXR0b25TdHlsZSwgaGVhZGVyU3R5bGUsIGlmcmFtZVN0eWxlLCBtc2dTdHlsZXMsIG1zZ1RleHRTdHlsZSwgbXNnVHlwZVN0eWxlIH0gZnJvbSBcIi4vb3ZlcmxheS9zdHlsZXMuanNcIjtcbnZhciBjb2xvcnMgPSB7XG4gIHJlc2V0OiBbXCJ0cmFuc3BhcmVudFwiLCBcInRyYW5zcGFyZW50XCJdLFxuICBibGFjazogXCIxODE4MThcIixcbiAgcmVkOiBcIkUzNjA0OVwiLFxuICBncmVlbjogXCJCM0NCNzRcIixcbiAgeWVsbG93OiBcIkZGRDA4MFwiLFxuICBibHVlOiBcIjdDQUZDMlwiLFxuICBtYWdlbnRhOiBcIjdGQUNDQVwiLFxuICBjeWFuOiBcIkMzQzJFRlwiLFxuICBsaWdodGdyZXk6IFwiRUJFN0UzXCIsXG4gIGRhcmtncmV5OiBcIjZENzg5MVwiXG59O1xuYW5zaUhUTUwuc2V0Q29sb3JzKGNvbG9ycyk7XG5cbi8qKlxuICogQHBhcmFtIHtzdHJpbmd9IHR5cGVcbiAqIEBwYXJhbSB7c3RyaW5nICB8IHsgZmlsZT86IHN0cmluZywgbW9kdWxlTmFtZT86IHN0cmluZywgbG9jPzogc3RyaW5nLCBtZXNzYWdlPzogc3RyaW5nOyBzdGFjaz86IHN0cmluZ1tdIH19IGl0ZW1cbiAqIEByZXR1cm5zIHt7IGhlYWRlcjogc3RyaW5nLCBib2R5OiBzdHJpbmcgfX1cbiAqL1xuZnVuY3Rpb24gZm9ybWF0UHJvYmxlbSh0eXBlLCBpdGVtKSB7XG4gIHZhciBoZWFkZXIgPSB0eXBlID09PSBcIndhcm5pbmdcIiA/IFwiV0FSTklOR1wiIDogXCJFUlJPUlwiO1xuICB2YXIgYm9keSA9IFwiXCI7XG4gIGlmICh0eXBlb2YgaXRlbSA9PT0gXCJzdHJpbmdcIikge1xuICAgIGJvZHkgKz0gaXRlbTtcbiAgfSBlbHNlIHtcbiAgICB2YXIgZmlsZSA9IGl0ZW0uZmlsZSB8fCBcIlwiO1xuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1uZXN0ZWQtdGVybmFyeVxuICAgIHZhciBtb2R1bGVOYW1lID0gaXRlbS5tb2R1bGVOYW1lID8gaXRlbS5tb2R1bGVOYW1lLmluZGV4T2YoXCIhXCIpICE9PSAtMSA/IFwiXCIuY29uY2F0KGl0ZW0ubW9kdWxlTmFtZS5yZXBsYWNlKC9eKFxcc3xcXFMpKiEvLCBcIlwiKSwgXCIgKFwiKS5jb25jYXQoaXRlbS5tb2R1bGVOYW1lLCBcIilcIikgOiBcIlwiLmNvbmNhdChpdGVtLm1vZHVsZU5hbWUpIDogXCJcIjtcbiAgICB2YXIgbG9jID0gaXRlbS5sb2M7XG4gICAgaGVhZGVyICs9IFwiXCIuY29uY2F0KG1vZHVsZU5hbWUgfHwgZmlsZSA/IFwiIGluIFwiLmNvbmNhdChtb2R1bGVOYW1lID8gXCJcIi5jb25jYXQobW9kdWxlTmFtZSkuY29uY2F0KGZpbGUgPyBcIiAoXCIuY29uY2F0KGZpbGUsIFwiKVwiKSA6IFwiXCIpIDogZmlsZSkuY29uY2F0KGxvYyA/IFwiIFwiLmNvbmNhdChsb2MpIDogXCJcIikgOiBcIlwiKTtcbiAgICBib2R5ICs9IGl0ZW0ubWVzc2FnZSB8fCBcIlwiO1xuICB9XG4gIGlmIChBcnJheS5pc0FycmF5KGl0ZW0uc3RhY2spKSB7XG4gICAgaXRlbS5zdGFjay5mb3JFYWNoKGZ1bmN0aW9uIChzdGFjaykge1xuICAgICAgaWYgKHR5cGVvZiBzdGFjayA9PT0gXCJzdHJpbmdcIikge1xuICAgICAgICBib2R5ICs9IFwiXFxyXFxuXCIuY29uY2F0KHN0YWNrKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuICByZXR1cm4ge1xuICAgIGhlYWRlcjogaGVhZGVyLFxuICAgIGJvZHk6IGJvZHlcbiAgfTtcbn1cblxuLyoqXG4gKiBAdHlwZWRlZiB7T2JqZWN0fSBDcmVhdGVPdmVybGF5T3B0aW9uc1xuICogQHByb3BlcnR5IHtzdHJpbmcgfCBudWxsfSB0cnVzdGVkVHlwZXNQb2xpY3lOYW1lXG4gKiBAcHJvcGVydHkge2Jvb2xlYW4gfCAoZXJyb3I6IEVycm9yKSA9PiB2b2lkfSBbY2F0Y2hSdW50aW1lRXJyb3JdXG4gKi9cblxuLyoqXG4gKlxuICogQHBhcmFtIHtDcmVhdGVPdmVybGF5T3B0aW9uc30gb3B0aW9uc1xuICovXG52YXIgY3JlYXRlT3ZlcmxheSA9IGZ1bmN0aW9uIGNyZWF0ZU92ZXJsYXkob3B0aW9ucykge1xuICAvKiogQHR5cGUge0hUTUxJRnJhbWVFbGVtZW50IHwgbnVsbCB8IHVuZGVmaW5lZH0gKi9cbiAgdmFyIGlmcmFtZUNvbnRhaW5lckVsZW1lbnQ7XG4gIC8qKiBAdHlwZSB7SFRNTERpdkVsZW1lbnQgfCBudWxsIHwgdW5kZWZpbmVkfSAqL1xuICB2YXIgY29udGFpbmVyRWxlbWVudDtcbiAgLyoqIEB0eXBlIHtIVE1MRGl2RWxlbWVudCB8IG51bGwgfCB1bmRlZmluZWR9ICovXG4gIHZhciBoZWFkZXJFbGVtZW50O1xuICAvKiogQHR5cGUge0FycmF5PChlbGVtZW50OiBIVE1MRGl2RWxlbWVudCkgPT4gdm9pZD59ICovXG4gIHZhciBvbkxvYWRRdWV1ZSA9IFtdO1xuICAvKiogQHR5cGUge1RydXN0ZWRUeXBlUG9saWN5IHwgdW5kZWZpbmVkfSAqL1xuICB2YXIgb3ZlcmxheVRydXN0ZWRUeXBlc1BvbGljeTtcblxuICAvKipcbiAgICpcbiAgICogQHBhcmFtIHtIVE1MRWxlbWVudH0gZWxlbWVudFxuICAgKiBAcGFyYW0ge0NTU1N0eWxlRGVjbGFyYXRpb259IHN0eWxlXG4gICAqL1xuICBmdW5jdGlvbiBhcHBseVN0eWxlKGVsZW1lbnQsIHN0eWxlKSB7XG4gICAgT2JqZWN0LmtleXMoc3R5bGUpLmZvckVhY2goZnVuY3Rpb24gKHByb3ApIHtcbiAgICAgIGVsZW1lbnQuc3R5bGVbcHJvcF0gPSBzdHlsZVtwcm9wXTtcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAcGFyYW0ge3N0cmluZyB8IG51bGx9IHRydXN0ZWRUeXBlc1BvbGljeU5hbWVcbiAgICovXG4gIGZ1bmN0aW9uIGNyZWF0ZUNvbnRhaW5lcih0cnVzdGVkVHlwZXNQb2xpY3lOYW1lKSB7XG4gICAgLy8gRW5hYmxlIFRydXN0ZWQgVHlwZXMgaWYgdGhleSBhcmUgYXZhaWxhYmxlIGluIHRoZSBjdXJyZW50IGJyb3dzZXIuXG4gICAgaWYgKHdpbmRvdy50cnVzdGVkVHlwZXMpIHtcbiAgICAgIG92ZXJsYXlUcnVzdGVkVHlwZXNQb2xpY3kgPSB3aW5kb3cudHJ1c3RlZFR5cGVzLmNyZWF0ZVBvbGljeSh0cnVzdGVkVHlwZXNQb2xpY3lOYW1lIHx8IFwid2VicGFjay1kZXYtc2VydmVyI292ZXJsYXlcIiwge1xuICAgICAgICBjcmVhdGVIVE1MOiBmdW5jdGlvbiBjcmVhdGVIVE1MKHZhbHVlKSB7XG4gICAgICAgICAgcmV0dXJuIHZhbHVlO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG4gICAgaWZyYW1lQ29udGFpbmVyRWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpZnJhbWVcIik7XG4gICAgaWZyYW1lQ29udGFpbmVyRWxlbWVudC5pZCA9IFwid2VicGFjay1kZXYtc2VydmVyLWNsaWVudC1vdmVybGF5XCI7XG4gICAgaWZyYW1lQ29udGFpbmVyRWxlbWVudC5zcmMgPSBcImFib3V0OmJsYW5rXCI7XG4gICAgYXBwbHlTdHlsZShpZnJhbWVDb250YWluZXJFbGVtZW50LCBpZnJhbWVTdHlsZSk7XG4gICAgaWZyYW1lQ29udGFpbmVyRWxlbWVudC5vbmxvYWQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICB2YXIgY29udGVudEVsZW1lbnQgPSAvKiogQHR5cGUge0RvY3VtZW50fSAqL1xuICAgICAgKCAvKiogQHR5cGUge0hUTUxJRnJhbWVFbGVtZW50fSAqL1xuICAgICAgaWZyYW1lQ29udGFpbmVyRWxlbWVudC5jb250ZW50RG9jdW1lbnQpLmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgICBjb250YWluZXJFbGVtZW50ID0gLyoqIEB0eXBlIHtEb2N1bWVudH0gKi9cbiAgICAgICggLyoqIEB0eXBlIHtIVE1MSUZyYW1lRWxlbWVudH0gKi9cbiAgICAgIGlmcmFtZUNvbnRhaW5lckVsZW1lbnQuY29udGVudERvY3VtZW50KS5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgY29udGVudEVsZW1lbnQuaWQgPSBcIndlYnBhY2stZGV2LXNlcnZlci1jbGllbnQtb3ZlcmxheS1kaXZcIjtcbiAgICAgIGFwcGx5U3R5bGUoY29udGVudEVsZW1lbnQsIGNvbnRhaW5lclN0eWxlKTtcbiAgICAgIGhlYWRlckVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgaGVhZGVyRWxlbWVudC5pbm5lclRleHQgPSBcIkNvbXBpbGVkIHdpdGggcHJvYmxlbXM6XCI7XG4gICAgICBhcHBseVN0eWxlKGhlYWRlckVsZW1lbnQsIGhlYWRlclN0eWxlKTtcbiAgICAgIHZhciBjbG9zZUJ1dHRvbkVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpO1xuICAgICAgYXBwbHlTdHlsZShjbG9zZUJ1dHRvbkVsZW1lbnQsIGRpc21pc3NCdXR0b25TdHlsZSk7XG4gICAgICBjbG9zZUJ1dHRvbkVsZW1lbnQuaW5uZXJUZXh0ID0gXCLDl1wiO1xuICAgICAgY2xvc2VCdXR0b25FbGVtZW50LmFyaWFMYWJlbCA9IFwiRGlzbWlzc1wiO1xuICAgICAgY2xvc2VCdXR0b25FbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11c2UtYmVmb3JlLWRlZmluZVxuICAgICAgICBvdmVybGF5U2VydmljZS5zZW5kKHtcbiAgICAgICAgICB0eXBlOiBcIkRJU01JU1NcIlxuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgICAgY29udGVudEVsZW1lbnQuYXBwZW5kQ2hpbGQoaGVhZGVyRWxlbWVudCk7XG4gICAgICBjb250ZW50RWxlbWVudC5hcHBlbmRDaGlsZChjbG9zZUJ1dHRvbkVsZW1lbnQpO1xuICAgICAgY29udGVudEVsZW1lbnQuYXBwZW5kQ2hpbGQoY29udGFpbmVyRWxlbWVudCk7XG5cbiAgICAgIC8qKiBAdHlwZSB7RG9jdW1lbnR9ICovXG4gICAgICAoIC8qKiBAdHlwZSB7SFRNTElGcmFtZUVsZW1lbnR9ICovXG4gICAgICBpZnJhbWVDb250YWluZXJFbGVtZW50LmNvbnRlbnREb2N1bWVudCkuYm9keS5hcHBlbmRDaGlsZChjb250ZW50RWxlbWVudCk7XG4gICAgICBvbkxvYWRRdWV1ZS5mb3JFYWNoKGZ1bmN0aW9uIChvbkxvYWQpIHtcbiAgICAgICAgb25Mb2FkKCAvKiogQHR5cGUge0hUTUxEaXZFbGVtZW50fSAqL2NvbnRlbnRFbGVtZW50KTtcbiAgICAgIH0pO1xuICAgICAgb25Mb2FkUXVldWUgPSBbXTtcblxuICAgICAgLyoqIEB0eXBlIHtIVE1MSUZyYW1lRWxlbWVudH0gKi9cbiAgICAgIGlmcmFtZUNvbnRhaW5lckVsZW1lbnQub25sb2FkID0gbnVsbDtcbiAgICB9O1xuICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoaWZyYW1lQ29udGFpbmVyRWxlbWVudCk7XG4gIH1cblxuICAvKipcbiAgICogQHBhcmFtIHsoZWxlbWVudDogSFRNTERpdkVsZW1lbnQpID0+IHZvaWR9IGNhbGxiYWNrXG4gICAqIEBwYXJhbSB7c3RyaW5nIHwgbnVsbH0gdHJ1c3RlZFR5cGVzUG9saWN5TmFtZVxuICAgKi9cbiAgZnVuY3Rpb24gZW5zdXJlT3ZlcmxheUV4aXN0cyhjYWxsYmFjaywgdHJ1c3RlZFR5cGVzUG9saWN5TmFtZSkge1xuICAgIGlmIChjb250YWluZXJFbGVtZW50KSB7XG4gICAgICBjb250YWluZXJFbGVtZW50LmlubmVySFRNTCA9IG92ZXJsYXlUcnVzdGVkVHlwZXNQb2xpY3kgPyBvdmVybGF5VHJ1c3RlZFR5cGVzUG9saWN5LmNyZWF0ZUhUTUwoXCJcIikgOiBcIlwiO1xuICAgICAgLy8gRXZlcnl0aGluZyBpcyByZWFkeSwgY2FsbCB0aGUgY2FsbGJhY2sgcmlnaHQgYXdheS5cbiAgICAgIGNhbGxiYWNrKGNvbnRhaW5lckVsZW1lbnQpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBvbkxvYWRRdWV1ZS5wdXNoKGNhbGxiYWNrKTtcbiAgICBpZiAoaWZyYW1lQ29udGFpbmVyRWxlbWVudCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBjcmVhdGVDb250YWluZXIodHJ1c3RlZFR5cGVzUG9saWN5TmFtZSk7XG4gIH1cblxuICAvLyBTdWNjZXNzZnVsIGNvbXBpbGF0aW9uLlxuICBmdW5jdGlvbiBoaWRlKCkge1xuICAgIGlmICghaWZyYW1lQ29udGFpbmVyRWxlbWVudCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIC8vIENsZWFuIHVwIGFuZCByZXNldCBpbnRlcm5hbCBzdGF0ZS5cbiAgICBkb2N1bWVudC5ib2R5LnJlbW92ZUNoaWxkKGlmcmFtZUNvbnRhaW5lckVsZW1lbnQpO1xuICAgIGlmcmFtZUNvbnRhaW5lckVsZW1lbnQgPSBudWxsO1xuICAgIGNvbnRhaW5lckVsZW1lbnQgPSBudWxsO1xuICB9XG5cbiAgLy8gQ29tcGlsYXRpb24gd2l0aCBlcnJvcnMgKGUuZy4gc3ludGF4IGVycm9yIG9yIG1pc3NpbmcgbW9kdWxlcykuXG4gIC8qKlxuICAgKiBAcGFyYW0ge3N0cmluZ30gdHlwZVxuICAgKiBAcGFyYW0ge0FycmF5PHN0cmluZyAgfCB7IG1vZHVsZUlkZW50aWZpZXI/OiBzdHJpbmcsIG1vZHVsZU5hbWU/OiBzdHJpbmcsIGxvYz86IHN0cmluZywgbWVzc2FnZT86IHN0cmluZyB9Pn0gbWVzc2FnZXNcbiAgICogQHBhcmFtIHtzdHJpbmcgfCBudWxsfSB0cnVzdGVkVHlwZXNQb2xpY3lOYW1lXG4gICAqIEBwYXJhbSB7J2J1aWxkJyB8ICdydW50aW1lJ30gbWVzc2FnZVNvdXJjZVxuICAgKi9cbiAgZnVuY3Rpb24gc2hvdyh0eXBlLCBtZXNzYWdlcywgdHJ1c3RlZFR5cGVzUG9saWN5TmFtZSwgbWVzc2FnZVNvdXJjZSkge1xuICAgIGVuc3VyZU92ZXJsYXlFeGlzdHMoZnVuY3Rpb24gKCkge1xuICAgICAgaGVhZGVyRWxlbWVudC5pbm5lclRleHQgPSBtZXNzYWdlU291cmNlID09PSBcInJ1bnRpbWVcIiA/IFwiVW5jYXVnaHQgcnVudGltZSBlcnJvcnM6XCIgOiBcIkNvbXBpbGVkIHdpdGggcHJvYmxlbXM6XCI7XG4gICAgICBtZXNzYWdlcy5mb3JFYWNoKGZ1bmN0aW9uIChtZXNzYWdlKSB7XG4gICAgICAgIHZhciBlbnRyeUVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgICB2YXIgbXNnU3R5bGUgPSB0eXBlID09PSBcIndhcm5pbmdcIiA/IG1zZ1N0eWxlcy53YXJuaW5nIDogbXNnU3R5bGVzLmVycm9yO1xuICAgICAgICBhcHBseVN0eWxlKGVudHJ5RWxlbWVudCwgX29iamVjdFNwcmVhZChfb2JqZWN0U3ByZWFkKHt9LCBtc2dTdHlsZSksIHt9LCB7XG4gICAgICAgICAgcGFkZGluZzogXCIxcmVtIDFyZW0gMS41cmVtIDFyZW1cIlxuICAgICAgICB9KSk7XG4gICAgICAgIHZhciB0eXBlRWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgICAgIHZhciBfZm9ybWF0UHJvYmxlbSA9IGZvcm1hdFByb2JsZW0odHlwZSwgbWVzc2FnZSksXG4gICAgICAgICAgaGVhZGVyID0gX2Zvcm1hdFByb2JsZW0uaGVhZGVyLFxuICAgICAgICAgIGJvZHkgPSBfZm9ybWF0UHJvYmxlbS5ib2R5O1xuICAgICAgICB0eXBlRWxlbWVudC5pbm5lclRleHQgPSBoZWFkZXI7XG4gICAgICAgIGFwcGx5U3R5bGUodHlwZUVsZW1lbnQsIG1zZ1R5cGVTdHlsZSk7XG4gICAgICAgIGlmIChtZXNzYWdlLm1vZHVsZUlkZW50aWZpZXIpIHtcbiAgICAgICAgICBhcHBseVN0eWxlKHR5cGVFbGVtZW50LCB7XG4gICAgICAgICAgICBjdXJzb3I6IFwicG9pbnRlclwiXG4gICAgICAgICAgfSk7XG4gICAgICAgICAgLy8gZWxlbWVudC5kYXRhc2V0IG5vdCBzdXBwb3J0ZWQgaW4gSUVcbiAgICAgICAgICB0eXBlRWxlbWVudC5zZXRBdHRyaWJ1dGUoXCJkYXRhLWNhbi1vcGVuXCIsIHRydWUpO1xuICAgICAgICAgIHR5cGVFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBmZXRjaChcIi93ZWJwYWNrLWRldi1zZXJ2ZXIvb3Blbi1lZGl0b3I/ZmlsZU5hbWU9XCIuY29uY2F0KG1lc3NhZ2UubW9kdWxlSWRlbnRpZmllcikpO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gTWFrZSBpdCBsb29rIHNpbWlsYXIgdG8gb3VyIHRlcm1pbmFsLlxuICAgICAgICB2YXIgdGV4dCA9IGFuc2lIVE1MKGVuY29kZShib2R5KSk7XG4gICAgICAgIHZhciBtZXNzYWdlVGV4dE5vZGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgICBhcHBseVN0eWxlKG1lc3NhZ2VUZXh0Tm9kZSwgbXNnVGV4dFN0eWxlKTtcbiAgICAgICAgbWVzc2FnZVRleHROb2RlLmlubmVySFRNTCA9IG92ZXJsYXlUcnVzdGVkVHlwZXNQb2xpY3kgPyBvdmVybGF5VHJ1c3RlZFR5cGVzUG9saWN5LmNyZWF0ZUhUTUwodGV4dCkgOiB0ZXh0O1xuICAgICAgICBlbnRyeUVsZW1lbnQuYXBwZW5kQ2hpbGQodHlwZUVsZW1lbnQpO1xuICAgICAgICBlbnRyeUVsZW1lbnQuYXBwZW5kQ2hpbGQobWVzc2FnZVRleHROb2RlKTtcblxuICAgICAgICAvKiogQHR5cGUge0hUTUxEaXZFbGVtZW50fSAqL1xuICAgICAgICBjb250YWluZXJFbGVtZW50LmFwcGVuZENoaWxkKGVudHJ5RWxlbWVudCk7XG4gICAgICB9KTtcbiAgICB9LCB0cnVzdGVkVHlwZXNQb2xpY3lOYW1lKTtcbiAgfVxuICB2YXIgb3ZlcmxheVNlcnZpY2UgPSBjcmVhdGVPdmVybGF5TWFjaGluZSh7XG4gICAgc2hvd092ZXJsYXk6IGZ1bmN0aW9uIHNob3dPdmVybGF5KF9yZWYpIHtcbiAgICAgIHZhciBfcmVmJGxldmVsID0gX3JlZi5sZXZlbCxcbiAgICAgICAgbGV2ZWwgPSBfcmVmJGxldmVsID09PSB2b2lkIDAgPyBcImVycm9yXCIgOiBfcmVmJGxldmVsLFxuICAgICAgICBtZXNzYWdlcyA9IF9yZWYubWVzc2FnZXMsXG4gICAgICAgIG1lc3NhZ2VTb3VyY2UgPSBfcmVmLm1lc3NhZ2VTb3VyY2U7XG4gICAgICByZXR1cm4gc2hvdyhsZXZlbCwgbWVzc2FnZXMsIG9wdGlvbnMudHJ1c3RlZFR5cGVzUG9saWN5TmFtZSwgbWVzc2FnZVNvdXJjZSk7XG4gICAgfSxcbiAgICBoaWRlT3ZlcmxheTogaGlkZVxuICB9KTtcbiAgaWYgKG9wdGlvbnMuY2F0Y2hSdW50aW1lRXJyb3IpIHtcbiAgICAvKipcbiAgICAgKiBAcGFyYW0ge0Vycm9yIHwgdW5kZWZpbmVkfSBlcnJvclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBmYWxsYmFja01lc3NhZ2VcbiAgICAgKi9cbiAgICB2YXIgaGFuZGxlRXJyb3IgPSBmdW5jdGlvbiBoYW5kbGVFcnJvcihlcnJvciwgZmFsbGJhY2tNZXNzYWdlKSB7XG4gICAgICB2YXIgZXJyb3JPYmplY3QgPSBlcnJvciBpbnN0YW5jZW9mIEVycm9yID8gZXJyb3IgOiBuZXcgRXJyb3IoZXJyb3IgfHwgZmFsbGJhY2tNZXNzYWdlKTtcbiAgICAgIHZhciBzaG91bGREaXNwbGF5ID0gdHlwZW9mIG9wdGlvbnMuY2F0Y2hSdW50aW1lRXJyb3IgPT09IFwiZnVuY3Rpb25cIiA/IG9wdGlvbnMuY2F0Y2hSdW50aW1lRXJyb3IoZXJyb3JPYmplY3QpIDogdHJ1ZTtcbiAgICAgIGlmIChzaG91bGREaXNwbGF5KSB7XG4gICAgICAgIG92ZXJsYXlTZXJ2aWNlLnNlbmQoe1xuICAgICAgICAgIHR5cGU6IFwiUlVOVElNRV9FUlJPUlwiLFxuICAgICAgICAgIG1lc3NhZ2VzOiBbe1xuICAgICAgICAgICAgbWVzc2FnZTogZXJyb3JPYmplY3QubWVzc2FnZSxcbiAgICAgICAgICAgIHN0YWNrOiBwYXJzZUVycm9yVG9TdGFja3MoZXJyb3JPYmplY3QpXG4gICAgICAgICAgfV1cbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfTtcbiAgICBsaXN0ZW5Ub1J1bnRpbWVFcnJvcihmdW5jdGlvbiAoZXJyb3JFdmVudCkge1xuICAgICAgLy8gZXJyb3IgcHJvcGVydHkgbWF5IGJlIGVtcHR5IGluIG9sZGVyIGJyb3dzZXIgbGlrZSBJRVxuICAgICAgdmFyIGVycm9yID0gZXJyb3JFdmVudC5lcnJvcixcbiAgICAgICAgbWVzc2FnZSA9IGVycm9yRXZlbnQubWVzc2FnZTtcbiAgICAgIGlmICghZXJyb3IgJiYgIW1lc3NhZ2UpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgaGFuZGxlRXJyb3IoZXJyb3IsIG1lc3NhZ2UpO1xuICAgIH0pO1xuICAgIGxpc3RlblRvVW5oYW5kbGVkUmVqZWN0aW9uKGZ1bmN0aW9uIChwcm9taXNlUmVqZWN0aW9uRXZlbnQpIHtcbiAgICAgIHZhciByZWFzb24gPSBwcm9taXNlUmVqZWN0aW9uRXZlbnQucmVhc29uO1xuICAgICAgaGFuZGxlRXJyb3IocmVhc29uLCBcIlVua25vd24gcHJvbWlzZSByZWplY3Rpb24gcmVhc29uXCIpO1xuICAgIH0pO1xuICB9XG4gIHJldHVybiBvdmVybGF5U2VydmljZTtcbn07XG5leHBvcnQgeyBmb3JtYXRQcm9ibGVtLCBjcmVhdGVPdmVybGF5IH07IiwiZnVuY3Rpb24gb3duS2V5cyhlLCByKSB7IHZhciB0ID0gT2JqZWN0LmtleXMoZSk7IGlmIChPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzKSB7IHZhciBvID0gT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyhlKTsgciAmJiAobyA9IG8uZmlsdGVyKGZ1bmN0aW9uIChyKSB7IHJldHVybiBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKGUsIHIpLmVudW1lcmFibGU7IH0pKSwgdC5wdXNoLmFwcGx5KHQsIG8pOyB9IHJldHVybiB0OyB9XG5mdW5jdGlvbiBfb2JqZWN0U3ByZWFkKGUpIHsgZm9yICh2YXIgciA9IDE7IHIgPCBhcmd1bWVudHMubGVuZ3RoOyByKyspIHsgdmFyIHQgPSBudWxsICE9IGFyZ3VtZW50c1tyXSA/IGFyZ3VtZW50c1tyXSA6IHt9OyByICUgMiA/IG93bktleXMoT2JqZWN0KHQpLCAhMCkuZm9yRWFjaChmdW5jdGlvbiAocikgeyBfZGVmaW5lUHJvcGVydHkoZSwgciwgdFtyXSk7IH0pIDogT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcnMgPyBPYmplY3QuZGVmaW5lUHJvcGVydGllcyhlLCBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9ycyh0KSkgOiBvd25LZXlzKE9iamVjdCh0KSkuZm9yRWFjaChmdW5jdGlvbiAocikgeyBPYmplY3QuZGVmaW5lUHJvcGVydHkoZSwgciwgT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcih0LCByKSk7IH0pOyB9IHJldHVybiBlOyB9XG5mdW5jdGlvbiBfZGVmaW5lUHJvcGVydHkob2JqLCBrZXksIHZhbHVlKSB7IGtleSA9IF90b1Byb3BlcnR5S2V5KGtleSk7IGlmIChrZXkgaW4gb2JqKSB7IE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvYmosIGtleSwgeyB2YWx1ZTogdmFsdWUsIGVudW1lcmFibGU6IHRydWUsIGNvbmZpZ3VyYWJsZTogdHJ1ZSwgd3JpdGFibGU6IHRydWUgfSk7IH0gZWxzZSB7IG9ialtrZXldID0gdmFsdWU7IH0gcmV0dXJuIG9iajsgfVxuZnVuY3Rpb24gX3RvUHJvcGVydHlLZXkodCkgeyB2YXIgaSA9IF90b1ByaW1pdGl2ZSh0LCBcInN0cmluZ1wiKTsgcmV0dXJuIFwic3ltYm9sXCIgPT0gdHlwZW9mIGkgPyBpIDogaSArIFwiXCI7IH1cbmZ1bmN0aW9uIF90b1ByaW1pdGl2ZSh0LCByKSB7IGlmIChcIm9iamVjdFwiICE9IHR5cGVvZiB0IHx8ICF0KSByZXR1cm4gdDsgdmFyIGUgPSB0W1N5bWJvbC50b1ByaW1pdGl2ZV07IGlmICh2b2lkIDAgIT09IGUpIHsgdmFyIGkgPSBlLmNhbGwodCwgciB8fCBcImRlZmF1bHRcIik7IGlmIChcIm9iamVjdFwiICE9IHR5cGVvZiBpKSByZXR1cm4gaTsgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkBAdG9QcmltaXRpdmUgbXVzdCByZXR1cm4gYSBwcmltaXRpdmUgdmFsdWUuXCIpOyB9IHJldHVybiAoXCJzdHJpbmdcIiA9PT0gciA/IFN0cmluZyA6IE51bWJlcikodCk7IH1cbi8qKlxuICogQHR5cGVkZWYge09iamVjdH0gU3RhdGVEZWZpbml0aW9uc1xuICogQHByb3BlcnR5IHt7W2V2ZW50OiBzdHJpbmddOiB7IHRhcmdldDogc3RyaW5nOyBhY3Rpb25zPzogQXJyYXk8c3RyaW5nPiB9fX0gW29uXVxuICovXG5cbi8qKlxuICogQHR5cGVkZWYge09iamVjdH0gT3B0aW9uc1xuICogQHByb3BlcnR5IHt7W3N0YXRlOiBzdHJpbmddOiBTdGF0ZURlZmluaXRpb25zfX0gc3RhdGVzXG4gKiBAcHJvcGVydHkge29iamVjdH0gY29udGV4dDtcbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBpbml0aWFsXG4gKi9cblxuLyoqXG4gKiBAdHlwZWRlZiB7T2JqZWN0fSBJbXBsZW1lbnRhdGlvblxuICogQHByb3BlcnR5IHt7W2FjdGlvbk5hbWU6IHN0cmluZ106IChjdHg6IG9iamVjdCwgZXZlbnQ6IGFueSkgPT4gb2JqZWN0fX0gYWN0aW9uc1xuICovXG5cbi8qKlxuICogQSBzaW1wbGlmaWVkIGBjcmVhdGVNYWNoaW5lYCBmcm9tIGBAeHN0YXRlL2ZzbWAgd2l0aCB0aGUgZm9sbG93aW5nIGRpZmZlcmVuY2VzOlxuICpcbiAqICAtIHRoZSByZXR1cm5lZCBtYWNoaW5lIGlzIHRlY2huaWNhbGx5IGEgXCJzZXJ2aWNlXCIuIE5vIGBpbnRlcnByZXQobWFjaGluZSkuc3RhcnQoKWAgaXMgbmVlZGVkLlxuICogIC0gdGhlIHN0YXRlIGRlZmluaXRpb24gb25seSBzdXBwb3J0IGBvbmAgYW5kIHRhcmdldCBtdXN0IGJlIGRlY2xhcmVkIHdpdGggeyB0YXJnZXQ6ICduZXh0U3RhdGUnLCBhY3Rpb25zOiBbXSB9IGV4cGxpY2l0bHkuXG4gKiAgLSBldmVudCBwYXNzZWQgdG8gYHNlbmRgIG11c3QgYmUgYW4gb2JqZWN0IHdpdGggYHR5cGVgIHByb3BlcnR5LlxuICogIC0gYWN0aW9ucyBpbXBsZW1lbnRhdGlvbiB3aWxsIGJlIFthc3NpZ24gYWN0aW9uXShodHRwczovL3hzdGF0ZS5qcy5vcmcvZG9jcy9ndWlkZXMvY29udGV4dC5odG1sI2Fzc2lnbi1hY3Rpb24pIGlmIHlvdSByZXR1cm4gYW55IHZhbHVlLlxuICogIERvIG5vdCByZXR1cm4gYW55dGhpbmcgaWYgeW91IGp1c3Qgd2FudCB0byBpbnZva2Ugc2lkZSBlZmZlY3QuXG4gKlxuICogVGhlIGdvYWwgb2YgdGhpcyBjdXN0b20gZnVuY3Rpb24gaXMgdG8gYXZvaWQgaW5zdGFsbGluZyB0aGUgZW50aXJlIGAneHN0YXRlL2ZzbSdgIHBhY2thZ2UsIHdoaWxlIGVuYWJsaW5nIG1vZGVsaW5nIHVzaW5nXG4gKiBzdGF0ZSBtYWNoaW5lLiBZb3UgY2FuIGNvcHkgdGhlIGZpcnN0IHBhcmFtZXRlciBpbnRvIHRoZSBlZGl0b3IgYXQgaHR0cHM6Ly9zdGF0ZWx5LmFpL3ZpeiB0byB2aXN1YWxpemUgdGhlIHN0YXRlIG1hY2hpbmUuXG4gKlxuICogQHBhcmFtIHtPcHRpb25zfSBvcHRpb25zXG4gKiBAcGFyYW0ge0ltcGxlbWVudGF0aW9ufSBpbXBsZW1lbnRhdGlvblxuICovXG5mdW5jdGlvbiBjcmVhdGVNYWNoaW5lKF9yZWYsIF9yZWYyKSB7XG4gIHZhciBzdGF0ZXMgPSBfcmVmLnN0YXRlcyxcbiAgICBjb250ZXh0ID0gX3JlZi5jb250ZXh0LFxuICAgIGluaXRpYWwgPSBfcmVmLmluaXRpYWw7XG4gIHZhciBhY3Rpb25zID0gX3JlZjIuYWN0aW9ucztcbiAgdmFyIGN1cnJlbnRTdGF0ZSA9IGluaXRpYWw7XG4gIHZhciBjdXJyZW50Q29udGV4dCA9IGNvbnRleHQ7XG4gIHJldHVybiB7XG4gICAgc2VuZDogZnVuY3Rpb24gc2VuZChldmVudCkge1xuICAgICAgdmFyIGN1cnJlbnRTdGF0ZU9uID0gc3RhdGVzW2N1cnJlbnRTdGF0ZV0ub247XG4gICAgICB2YXIgdHJhbnNpdGlvbkNvbmZpZyA9IGN1cnJlbnRTdGF0ZU9uICYmIGN1cnJlbnRTdGF0ZU9uW2V2ZW50LnR5cGVdO1xuICAgICAgaWYgKHRyYW5zaXRpb25Db25maWcpIHtcbiAgICAgICAgY3VycmVudFN0YXRlID0gdHJhbnNpdGlvbkNvbmZpZy50YXJnZXQ7XG4gICAgICAgIGlmICh0cmFuc2l0aW9uQ29uZmlnLmFjdGlvbnMpIHtcbiAgICAgICAgICB0cmFuc2l0aW9uQ29uZmlnLmFjdGlvbnMuZm9yRWFjaChmdW5jdGlvbiAoYWN0TmFtZSkge1xuICAgICAgICAgICAgdmFyIGFjdGlvbkltcGwgPSBhY3Rpb25zW2FjdE5hbWVdO1xuICAgICAgICAgICAgdmFyIG5leHRDb250ZXh0VmFsdWUgPSBhY3Rpb25JbXBsICYmIGFjdGlvbkltcGwoY3VycmVudENvbnRleHQsIGV2ZW50KTtcbiAgICAgICAgICAgIGlmIChuZXh0Q29udGV4dFZhbHVlKSB7XG4gICAgICAgICAgICAgIGN1cnJlbnRDb250ZXh0ID0gX29iamVjdFNwcmVhZChfb2JqZWN0U3ByZWFkKHt9LCBjdXJyZW50Q29udGV4dCksIG5leHRDb250ZXh0VmFsdWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9O1xufVxuZXhwb3J0IGRlZmF1bHQgY3JlYXRlTWFjaGluZTsiLCIvKipcbiAqXG4gKiBAcGFyYW0ge0Vycm9yfSBlcnJvclxuICovXG5mdW5jdGlvbiBwYXJzZUVycm9yVG9TdGFja3MoZXJyb3IpIHtcbiAgaWYgKCFlcnJvciB8fCAhKGVycm9yIGluc3RhbmNlb2YgRXJyb3IpKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFwicGFyc2VFcnJvclRvU3RhY2tzIGV4cGVjdHMgRXJyb3Igb2JqZWN0XCIpO1xuICB9XG4gIGlmICh0eXBlb2YgZXJyb3Iuc3RhY2sgPT09IFwic3RyaW5nXCIpIHtcbiAgICByZXR1cm4gZXJyb3Iuc3RhY2suc3BsaXQoXCJcXG5cIikuZmlsdGVyKGZ1bmN0aW9uIChzdGFjaykge1xuICAgICAgcmV0dXJuIHN0YWNrICE9PSBcIkVycm9yOiBcIi5jb25jYXQoZXJyb3IubWVzc2FnZSk7XG4gICAgfSk7XG4gIH1cbn1cblxuLyoqXG4gKiBAY2FsbGJhY2sgRXJyb3JDYWxsYmFja1xuICogQHBhcmFtIHtFcnJvckV2ZW50fSBlcnJvclxuICogQHJldHVybnMge3ZvaWR9XG4gKi9cblxuLyoqXG4gKiBAcGFyYW0ge0Vycm9yQ2FsbGJhY2t9IGNhbGxiYWNrXG4gKi9cbmZ1bmN0aW9uIGxpc3RlblRvUnVudGltZUVycm9yKGNhbGxiYWNrKSB7XG4gIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwiZXJyb3JcIiwgY2FsbGJhY2spO1xuICByZXR1cm4gZnVuY3Rpb24gY2xlYW51cCgpIHtcbiAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcihcImVycm9yXCIsIGNhbGxiYWNrKTtcbiAgfTtcbn1cblxuLyoqXG4gKiBAY2FsbGJhY2sgVW5oYW5kbGVkUmVqZWN0aW9uQ2FsbGJhY2tcbiAqIEBwYXJhbSB7UHJvbWlzZVJlamVjdGlvbkV2ZW50fSByZWplY3Rpb25FdmVudFxuICogQHJldHVybnMge3ZvaWR9XG4gKi9cblxuLyoqXG4gKiBAcGFyYW0ge1VuaGFuZGxlZFJlamVjdGlvbkNhbGxiYWNrfSBjYWxsYmFja1xuICovXG5mdW5jdGlvbiBsaXN0ZW5Ub1VuaGFuZGxlZFJlamVjdGlvbihjYWxsYmFjaykge1xuICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcInVuaGFuZGxlZHJlamVjdGlvblwiLCBjYWxsYmFjayk7XG4gIHJldHVybiBmdW5jdGlvbiBjbGVhbnVwKCkge1xuICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKFwidW5oYW5kbGVkcmVqZWN0aW9uXCIsIGNhbGxiYWNrKTtcbiAgfTtcbn1cbmV4cG9ydCB7IGxpc3RlblRvUnVudGltZUVycm9yLCBsaXN0ZW5Ub1VuaGFuZGxlZFJlamVjdGlvbiwgcGFyc2VFcnJvclRvU3RhY2tzIH07IiwiaW1wb3J0IGNyZWF0ZU1hY2hpbmUgZnJvbSBcIi4vZnNtLmpzXCI7XG5cbi8qKlxuICogQHR5cGVkZWYge09iamVjdH0gU2hvd092ZXJsYXlEYXRhXG4gKiBAcHJvcGVydHkgeyd3YXJuaW5nJyB8ICdlcnJvcid9IGxldmVsXG4gKiBAcHJvcGVydHkge0FycmF5PHN0cmluZyAgfCB7IG1vZHVsZUlkZW50aWZpZXI/OiBzdHJpbmcsIG1vZHVsZU5hbWU/OiBzdHJpbmcsIGxvYz86IHN0cmluZywgbWVzc2FnZT86IHN0cmluZyB9Pn0gbWVzc2FnZXNcbiAqIEBwcm9wZXJ0eSB7J2J1aWxkJyB8ICdydW50aW1lJ30gbWVzc2FnZVNvdXJjZVxuICovXG5cbi8qKlxuICogQHR5cGVkZWYge09iamVjdH0gQ3JlYXRlT3ZlcmxheU1hY2hpbmVPcHRpb25zXG4gKiBAcHJvcGVydHkgeyhkYXRhOiBTaG93T3ZlcmxheURhdGEpID0+IHZvaWR9IHNob3dPdmVybGF5XG4gKiBAcHJvcGVydHkgeygpID0+IHZvaWR9IGhpZGVPdmVybGF5XG4gKi9cblxuLyoqXG4gKiBAcGFyYW0ge0NyZWF0ZU92ZXJsYXlNYWNoaW5lT3B0aW9uc30gb3B0aW9uc1xuICovXG52YXIgY3JlYXRlT3ZlcmxheU1hY2hpbmUgPSBmdW5jdGlvbiBjcmVhdGVPdmVybGF5TWFjaGluZShvcHRpb25zKSB7XG4gIHZhciBoaWRlT3ZlcmxheSA9IG9wdGlvbnMuaGlkZU92ZXJsYXksXG4gICAgc2hvd092ZXJsYXkgPSBvcHRpb25zLnNob3dPdmVybGF5O1xuICB2YXIgb3ZlcmxheU1hY2hpbmUgPSBjcmVhdGVNYWNoaW5lKHtcbiAgICBpbml0aWFsOiBcImhpZGRlblwiLFxuICAgIGNvbnRleHQ6IHtcbiAgICAgIGxldmVsOiBcImVycm9yXCIsXG4gICAgICBtZXNzYWdlczogW10sXG4gICAgICBtZXNzYWdlU291cmNlOiBcImJ1aWxkXCJcbiAgICB9LFxuICAgIHN0YXRlczoge1xuICAgICAgaGlkZGVuOiB7XG4gICAgICAgIG9uOiB7XG4gICAgICAgICAgQlVJTERfRVJST1I6IHtcbiAgICAgICAgICAgIHRhcmdldDogXCJkaXNwbGF5QnVpbGRFcnJvclwiLFxuICAgICAgICAgICAgYWN0aW9uczogW1wic2V0TWVzc2FnZXNcIiwgXCJzaG93T3ZlcmxheVwiXVxuICAgICAgICAgIH0sXG4gICAgICAgICAgUlVOVElNRV9FUlJPUjoge1xuICAgICAgICAgICAgdGFyZ2V0OiBcImRpc3BsYXlSdW50aW1lRXJyb3JcIixcbiAgICAgICAgICAgIGFjdGlvbnM6IFtcInNldE1lc3NhZ2VzXCIsIFwic2hvd092ZXJsYXlcIl1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBkaXNwbGF5QnVpbGRFcnJvcjoge1xuICAgICAgICBvbjoge1xuICAgICAgICAgIERJU01JU1M6IHtcbiAgICAgICAgICAgIHRhcmdldDogXCJoaWRkZW5cIixcbiAgICAgICAgICAgIGFjdGlvbnM6IFtcImRpc21pc3NNZXNzYWdlc1wiLCBcImhpZGVPdmVybGF5XCJdXG4gICAgICAgICAgfSxcbiAgICAgICAgICBCVUlMRF9FUlJPUjoge1xuICAgICAgICAgICAgdGFyZ2V0OiBcImRpc3BsYXlCdWlsZEVycm9yXCIsXG4gICAgICAgICAgICBhY3Rpb25zOiBbXCJhcHBlbmRNZXNzYWdlc1wiLCBcInNob3dPdmVybGF5XCJdXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgZGlzcGxheVJ1bnRpbWVFcnJvcjoge1xuICAgICAgICBvbjoge1xuICAgICAgICAgIERJU01JU1M6IHtcbiAgICAgICAgICAgIHRhcmdldDogXCJoaWRkZW5cIixcbiAgICAgICAgICAgIGFjdGlvbnM6IFtcImRpc21pc3NNZXNzYWdlc1wiLCBcImhpZGVPdmVybGF5XCJdXG4gICAgICAgICAgfSxcbiAgICAgICAgICBSVU5USU1FX0VSUk9SOiB7XG4gICAgICAgICAgICB0YXJnZXQ6IFwiZGlzcGxheVJ1bnRpbWVFcnJvclwiLFxuICAgICAgICAgICAgYWN0aW9uczogW1wiYXBwZW5kTWVzc2FnZXNcIiwgXCJzaG93T3ZlcmxheVwiXVxuICAgICAgICAgIH0sXG4gICAgICAgICAgQlVJTERfRVJST1I6IHtcbiAgICAgICAgICAgIHRhcmdldDogXCJkaXNwbGF5QnVpbGRFcnJvclwiLFxuICAgICAgICAgICAgYWN0aW9uczogW1wic2V0TWVzc2FnZXNcIiwgXCJzaG93T3ZlcmxheVwiXVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfSwge1xuICAgIGFjdGlvbnM6IHtcbiAgICAgIGRpc21pc3NNZXNzYWdlczogZnVuY3Rpb24gZGlzbWlzc01lc3NhZ2VzKCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIG1lc3NhZ2VzOiBbXSxcbiAgICAgICAgICBsZXZlbDogXCJlcnJvclwiLFxuICAgICAgICAgIG1lc3NhZ2VTb3VyY2U6IFwiYnVpbGRcIlxuICAgICAgICB9O1xuICAgICAgfSxcbiAgICAgIGFwcGVuZE1lc3NhZ2VzOiBmdW5jdGlvbiBhcHBlbmRNZXNzYWdlcyhjb250ZXh0LCBldmVudCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIG1lc3NhZ2VzOiBjb250ZXh0Lm1lc3NhZ2VzLmNvbmNhdChldmVudC5tZXNzYWdlcyksXG4gICAgICAgICAgbGV2ZWw6IGV2ZW50LmxldmVsIHx8IGNvbnRleHQubGV2ZWwsXG4gICAgICAgICAgbWVzc2FnZVNvdXJjZTogZXZlbnQudHlwZSA9PT0gXCJSVU5USU1FX0VSUk9SXCIgPyBcInJ1bnRpbWVcIiA6IFwiYnVpbGRcIlxuICAgICAgICB9O1xuICAgICAgfSxcbiAgICAgIHNldE1lc3NhZ2VzOiBmdW5jdGlvbiBzZXRNZXNzYWdlcyhjb250ZXh0LCBldmVudCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIG1lc3NhZ2VzOiBldmVudC5tZXNzYWdlcyxcbiAgICAgICAgICBsZXZlbDogZXZlbnQubGV2ZWwgfHwgY29udGV4dC5sZXZlbCxcbiAgICAgICAgICBtZXNzYWdlU291cmNlOiBldmVudC50eXBlID09PSBcIlJVTlRJTUVfRVJST1JcIiA/IFwicnVudGltZVwiIDogXCJidWlsZFwiXG4gICAgICAgIH07XG4gICAgICB9LFxuICAgICAgaGlkZU92ZXJsYXk6IGhpZGVPdmVybGF5LFxuICAgICAgc2hvd092ZXJsYXk6IHNob3dPdmVybGF5XG4gICAgfVxuICB9KTtcbiAgcmV0dXJuIG92ZXJsYXlNYWNoaW5lO1xufTtcbmV4cG9ydCBkZWZhdWx0IGNyZWF0ZU92ZXJsYXlNYWNoaW5lOyIsIi8vIHN0eWxlcyBhcmUgaW5zcGlyZWQgYnkgYHJlYWN0LWVycm9yLW92ZXJsYXlgXG5cbnZhciBtc2dTdHlsZXMgPSB7XG4gIGVycm9yOiB7XG4gICAgYmFja2dyb3VuZENvbG9yOiBcInJnYmEoMjA2LCAxNywgMzgsIDAuMSlcIixcbiAgICBjb2xvcjogXCIjZmNjZmNmXCJcbiAgfSxcbiAgd2FybmluZzoge1xuICAgIGJhY2tncm91bmRDb2xvcjogXCJyZ2JhKDI1MSwgMjQ1LCAxODAsIDAuMSlcIixcbiAgICBjb2xvcjogXCIjZmJmNWI0XCJcbiAgfVxufTtcbnZhciBpZnJhbWVTdHlsZSA9IHtcbiAgcG9zaXRpb246IFwiZml4ZWRcIixcbiAgdG9wOiAwLFxuICBsZWZ0OiAwLFxuICByaWdodDogMCxcbiAgYm90dG9tOiAwLFxuICB3aWR0aDogXCIxMDB2d1wiLFxuICBoZWlnaHQ6IFwiMTAwdmhcIixcbiAgYm9yZGVyOiBcIm5vbmVcIixcbiAgXCJ6LWluZGV4XCI6IDk5OTk5OTk5OTlcbn07XG52YXIgY29udGFpbmVyU3R5bGUgPSB7XG4gIHBvc2l0aW9uOiBcImZpeGVkXCIsXG4gIGJveFNpemluZzogXCJib3JkZXItYm94XCIsXG4gIGxlZnQ6IDAsXG4gIHRvcDogMCxcbiAgcmlnaHQ6IDAsXG4gIGJvdHRvbTogMCxcbiAgd2lkdGg6IFwiMTAwdndcIixcbiAgaGVpZ2h0OiBcIjEwMHZoXCIsXG4gIGZvbnRTaXplOiBcImxhcmdlXCIsXG4gIHBhZGRpbmc6IFwiMnJlbSAycmVtIDRyZW0gMnJlbVwiLFxuICBsaW5lSGVpZ2h0OiBcIjEuMlwiLFxuICB3aGl0ZVNwYWNlOiBcInByZS13cmFwXCIsXG4gIG92ZXJmbG93OiBcImF1dG9cIixcbiAgYmFja2dyb3VuZENvbG9yOiBcInJnYmEoMCwgMCwgMCwgMC45KVwiLFxuICBjb2xvcjogXCJ3aGl0ZVwiXG59O1xudmFyIGhlYWRlclN0eWxlID0ge1xuICBjb2xvcjogXCIjZTgzYjQ2XCIsXG4gIGZvbnRTaXplOiBcIjJlbVwiLFxuICB3aGl0ZVNwYWNlOiBcInByZS13cmFwXCIsXG4gIGZvbnRGYW1pbHk6IFwic2Fucy1zZXJpZlwiLFxuICBtYXJnaW46IFwiMCAycmVtIDJyZW0gMFwiLFxuICBmbGV4OiBcIjAgMCBhdXRvXCIsXG4gIG1heEhlaWdodDogXCI1MCVcIixcbiAgb3ZlcmZsb3c6IFwiYXV0b1wiXG59O1xudmFyIGRpc21pc3NCdXR0b25TdHlsZSA9IHtcbiAgY29sb3I6IFwiI2ZmZmZmZlwiLFxuICBsaW5lSGVpZ2h0OiBcIjFyZW1cIixcbiAgZm9udFNpemU6IFwiMS41cmVtXCIsXG4gIHBhZGRpbmc6IFwiMXJlbVwiLFxuICBjdXJzb3I6IFwicG9pbnRlclwiLFxuICBwb3NpdGlvbjogXCJhYnNvbHV0ZVwiLFxuICByaWdodDogMCxcbiAgdG9wOiAwLFxuICBiYWNrZ3JvdW5kQ29sb3I6IFwidHJhbnNwYXJlbnRcIixcbiAgYm9yZGVyOiBcIm5vbmVcIlxufTtcbnZhciBtc2dUeXBlU3R5bGUgPSB7XG4gIGNvbG9yOiBcIiNlODNiNDZcIixcbiAgZm9udFNpemU6IFwiMS4yZW1cIixcbiAgbWFyZ2luQm90dG9tOiBcIjFyZW1cIixcbiAgZm9udEZhbWlseTogXCJzYW5zLXNlcmlmXCJcbn07XG52YXIgbXNnVGV4dFN0eWxlID0ge1xuICBsaW5lSGVpZ2h0OiBcIjEuNVwiLFxuICBmb250U2l6ZTogXCIxcmVtXCIsXG4gIGZvbnRGYW1pbHk6IFwiTWVubG8sIENvbnNvbGFzLCBtb25vc3BhY2VcIlxufTtcbmV4cG9ydCB7IG1zZ1N0eWxlcywgaWZyYW1lU3R5bGUsIGNvbnRhaW5lclN0eWxlLCBoZWFkZXJTdHlsZSwgZGlzbWlzc0J1dHRvblN0eWxlLCBtc2dUeXBlU3R5bGUsIG1zZ1RleHRTdHlsZSB9OyIsIi8qIGdsb2JhbCBfX3dlYnBhY2tfZGV2X3NlcnZlcl9jbGllbnRfXyAqL1xuXG5pbXBvcnQgV2ViU29ja2V0Q2xpZW50IGZyb20gXCIuL2NsaWVudHMvV2ViU29ja2V0Q2xpZW50LmpzXCI7XG5pbXBvcnQgeyBsb2cgfSBmcm9tIFwiLi91dGlscy9sb2cuanNcIjtcblxuLy8gdGhpcyBXZWJzb2NrZXRDbGllbnQgaXMgaGVyZSBhcyBhIGRlZmF1bHQgZmFsbGJhY2ssIGluIGNhc2UgdGhlIGNsaWVudCBpcyBub3QgaW5qZWN0ZWRcbi8qIGVzbGludC1kaXNhYmxlIGNhbWVsY2FzZSAqL1xudmFyIENsaWVudCA9XG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tbmVzdGVkLXRlcm5hcnlcbnR5cGVvZiBfX3dlYnBhY2tfZGV2X3NlcnZlcl9jbGllbnRfXyAhPT0gXCJ1bmRlZmluZWRcIiA/IHR5cGVvZiBfX3dlYnBhY2tfZGV2X3NlcnZlcl9jbGllbnRfXy5kZWZhdWx0ICE9PSBcInVuZGVmaW5lZFwiID8gX193ZWJwYWNrX2Rldl9zZXJ2ZXJfY2xpZW50X18uZGVmYXVsdCA6IF9fd2VicGFja19kZXZfc2VydmVyX2NsaWVudF9fIDogV2ViU29ja2V0Q2xpZW50O1xuLyogZXNsaW50LWVuYWJsZSBjYW1lbGNhc2UgKi9cblxudmFyIHJldHJpZXMgPSAwO1xudmFyIG1heFJldHJpZXMgPSAxMDtcblxuLy8gSW5pdGlhbGl6ZWQgY2xpZW50IGlzIGV4cG9ydGVkIHNvIGV4dGVybmFsIGNvbnN1bWVycyBjYW4gdXRpbGl6ZSB0aGUgc2FtZSBpbnN0YW5jZVxuLy8gSXQgaXMgbXV0YWJsZSB0byBlbmZvcmNlIHNpbmdsZXRvblxuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGltcG9ydC9uby1tdXRhYmxlLWV4cG9ydHNcbmV4cG9ydCB2YXIgY2xpZW50ID0gbnVsbDtcblxuLyoqXG4gKiBAcGFyYW0ge3N0cmluZ30gdXJsXG4gKiBAcGFyYW0ge3sgW2hhbmRsZXI6IHN0cmluZ106IChkYXRhPzogYW55LCBwYXJhbXM/OiBhbnkpID0+IGFueSB9fSBoYW5kbGVyc1xuICogQHBhcmFtIHtudW1iZXJ9IFtyZWNvbm5lY3RdXG4gKi9cbnZhciBzb2NrZXQgPSBmdW5jdGlvbiBpbml0U29ja2V0KHVybCwgaGFuZGxlcnMsIHJlY29ubmVjdCkge1xuICBjbGllbnQgPSBuZXcgQ2xpZW50KHVybCk7XG4gIGNsaWVudC5vbk9wZW4oZnVuY3Rpb24gKCkge1xuICAgIHJldHJpZXMgPSAwO1xuICAgIGlmICh0eXBlb2YgcmVjb25uZWN0ICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICBtYXhSZXRyaWVzID0gcmVjb25uZWN0O1xuICAgIH1cbiAgfSk7XG4gIGNsaWVudC5vbkNsb3NlKGZ1bmN0aW9uICgpIHtcbiAgICBpZiAocmV0cmllcyA9PT0gMCkge1xuICAgICAgaGFuZGxlcnMuY2xvc2UoKTtcbiAgICB9XG5cbiAgICAvLyBUcnkgdG8gcmVjb25uZWN0LlxuICAgIGNsaWVudCA9IG51bGw7XG5cbiAgICAvLyBBZnRlciAxMCByZXRyaWVzIHN0b3AgdHJ5aW5nLCB0byBwcmV2ZW50IGxvZ3NwYW0uXG4gICAgaWYgKHJldHJpZXMgPCBtYXhSZXRyaWVzKSB7XG4gICAgICAvLyBFeHBvbmVudGlhbGx5IGluY3JlYXNlIHRpbWVvdXQgdG8gcmVjb25uZWN0LlxuICAgICAgLy8gUmVzcGVjdGZ1bGx5IGNvcGllZCBmcm9tIHRoZSBwYWNrYWdlIGBnb3RgLlxuICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXJlc3RyaWN0ZWQtcHJvcGVydGllc1xuICAgICAgdmFyIHJldHJ5SW5NcyA9IDEwMDAgKiBNYXRoLnBvdygyLCByZXRyaWVzKSArIE1hdGgucmFuZG9tKCkgKiAxMDA7XG4gICAgICByZXRyaWVzICs9IDE7XG4gICAgICBsb2cuaW5mbyhcIlRyeWluZyB0byByZWNvbm5lY3QuLi5cIik7XG4gICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgc29ja2V0KHVybCwgaGFuZGxlcnMsIHJlY29ubmVjdCk7XG4gICAgICB9LCByZXRyeUluTXMpO1xuICAgIH1cbiAgfSk7XG4gIGNsaWVudC5vbk1lc3NhZ2UoXG4gIC8qKlxuICAgKiBAcGFyYW0ge2FueX0gZGF0YVxuICAgKi9cbiAgZnVuY3Rpb24gKGRhdGEpIHtcbiAgICB2YXIgbWVzc2FnZSA9IEpTT04ucGFyc2UoZGF0YSk7XG4gICAgaWYgKGhhbmRsZXJzW21lc3NhZ2UudHlwZV0pIHtcbiAgICAgIGhhbmRsZXJzW21lc3NhZ2UudHlwZV0obWVzc2FnZS5kYXRhLCBtZXNzYWdlLnBhcmFtcyk7XG4gICAgfVxuICB9KTtcbn07XG5leHBvcnQgZGVmYXVsdCBzb2NrZXQ7IiwiLyoqXG4gKiBAcGFyYW0ge3sgcHJvdG9jb2w/OiBzdHJpbmcsIGF1dGg/OiBzdHJpbmcsIGhvc3RuYW1lPzogc3RyaW5nLCBwb3J0Pzogc3RyaW5nLCBwYXRobmFtZT86IHN0cmluZywgc2VhcmNoPzogc3RyaW5nLCBoYXNoPzogc3RyaW5nLCBzbGFzaGVzPzogYm9vbGVhbiB9fSBvYmpVUkxcbiAqIEByZXR1cm5zIHtzdHJpbmd9XG4gKi9cbmZ1bmN0aW9uIGZvcm1hdChvYmpVUkwpIHtcbiAgdmFyIHByb3RvY29sID0gb2JqVVJMLnByb3RvY29sIHx8IFwiXCI7XG4gIGlmIChwcm90b2NvbCAmJiBwcm90b2NvbC5zdWJzdHIoLTEpICE9PSBcIjpcIikge1xuICAgIHByb3RvY29sICs9IFwiOlwiO1xuICB9XG4gIHZhciBhdXRoID0gb2JqVVJMLmF1dGggfHwgXCJcIjtcbiAgaWYgKGF1dGgpIHtcbiAgICBhdXRoID0gZW5jb2RlVVJJQ29tcG9uZW50KGF1dGgpO1xuICAgIGF1dGggPSBhdXRoLnJlcGxhY2UoLyUzQS9pLCBcIjpcIik7XG4gICAgYXV0aCArPSBcIkBcIjtcbiAgfVxuICB2YXIgaG9zdCA9IFwiXCI7XG4gIGlmIChvYmpVUkwuaG9zdG5hbWUpIHtcbiAgICBob3N0ID0gYXV0aCArIChvYmpVUkwuaG9zdG5hbWUuaW5kZXhPZihcIjpcIikgPT09IC0xID8gb2JqVVJMLmhvc3RuYW1lIDogXCJbXCIuY29uY2F0KG9ialVSTC5ob3N0bmFtZSwgXCJdXCIpKTtcbiAgICBpZiAob2JqVVJMLnBvcnQpIHtcbiAgICAgIGhvc3QgKz0gXCI6XCIuY29uY2F0KG9ialVSTC5wb3J0KTtcbiAgICB9XG4gIH1cbiAgdmFyIHBhdGhuYW1lID0gb2JqVVJMLnBhdGhuYW1lIHx8IFwiXCI7XG4gIGlmIChvYmpVUkwuc2xhc2hlcykge1xuICAgIGhvc3QgPSBcIi8vXCIuY29uY2F0KGhvc3QgfHwgXCJcIik7XG4gICAgaWYgKHBhdGhuYW1lICYmIHBhdGhuYW1lLmNoYXJBdCgwKSAhPT0gXCIvXCIpIHtcbiAgICAgIHBhdGhuYW1lID0gXCIvXCIuY29uY2F0KHBhdGhuYW1lKTtcbiAgICB9XG4gIH0gZWxzZSBpZiAoIWhvc3QpIHtcbiAgICBob3N0ID0gXCJcIjtcbiAgfVxuICB2YXIgc2VhcmNoID0gb2JqVVJMLnNlYXJjaCB8fCBcIlwiO1xuICBpZiAoc2VhcmNoICYmIHNlYXJjaC5jaGFyQXQoMCkgIT09IFwiP1wiKSB7XG4gICAgc2VhcmNoID0gXCI/XCIuY29uY2F0KHNlYXJjaCk7XG4gIH1cbiAgdmFyIGhhc2ggPSBvYmpVUkwuaGFzaCB8fCBcIlwiO1xuICBpZiAoaGFzaCAmJiBoYXNoLmNoYXJBdCgwKSAhPT0gXCIjXCIpIHtcbiAgICBoYXNoID0gXCIjXCIuY29uY2F0KGhhc2gpO1xuICB9XG4gIHBhdGhuYW1lID0gcGF0aG5hbWUucmVwbGFjZSgvWz8jXS9nLFxuICAvKipcbiAgICogQHBhcmFtIHtzdHJpbmd9IG1hdGNoXG4gICAqIEByZXR1cm5zIHtzdHJpbmd9XG4gICAqL1xuICBmdW5jdGlvbiAobWF0Y2gpIHtcbiAgICByZXR1cm4gZW5jb2RlVVJJQ29tcG9uZW50KG1hdGNoKTtcbiAgfSk7XG4gIHNlYXJjaCA9IHNlYXJjaC5yZXBsYWNlKFwiI1wiLCBcIiUyM1wiKTtcbiAgcmV0dXJuIFwiXCIuY29uY2F0KHByb3RvY29sKS5jb25jYXQoaG9zdCkuY29uY2F0KHBhdGhuYW1lKS5jb25jYXQoc2VhcmNoKS5jb25jYXQoaGFzaCk7XG59XG5cbi8qKlxuICogQHBhcmFtIHtVUkwgJiB7IGZyb21DdXJyZW50U2NyaXB0PzogYm9vbGVhbiB9fSBwYXJzZWRVUkxcbiAqIEByZXR1cm5zIHtzdHJpbmd9XG4gKi9cbmZ1bmN0aW9uIGNyZWF0ZVNvY2tldFVSTChwYXJzZWRVUkwpIHtcbiAgdmFyIGhvc3RuYW1lID0gcGFyc2VkVVJMLmhvc3RuYW1lO1xuXG4gIC8vIE5vZGUuanMgbW9kdWxlIHBhcnNlcyBpdCBhcyBgOjpgXG4gIC8vIGBuZXcgVVJMKHVybFN0cmluZywgW2Jhc2VVUkxTdHJpbmddKWAgcGFyc2VzIGl0IGFzICdbOjpdJ1xuICB2YXIgaXNJbkFkZHJBbnkgPSBob3N0bmFtZSA9PT0gXCIwLjAuMC4wXCIgfHwgaG9zdG5hbWUgPT09IFwiOjpcIiB8fCBob3N0bmFtZSA9PT0gXCJbOjpdXCI7XG5cbiAgLy8gd2h5IGRvIHdlIG5lZWQgdGhpcyBjaGVjaz9cbiAgLy8gaG9zdG5hbWUgbi9hIGZvciBmaWxlIHByb3RvY29sIChleGFtcGxlLCB3aGVuIHVzaW5nIGVsZWN0cm9uLCBpb25pYylcbiAgLy8gc2VlOiBodHRwczovL2dpdGh1Yi5jb20vd2VicGFjay93ZWJwYWNrLWRldi1zZXJ2ZXIvcHVsbC8zODRcbiAgaWYgKGlzSW5BZGRyQW55ICYmIHNlbGYubG9jYXRpb24uaG9zdG5hbWUgJiYgc2VsZi5sb2NhdGlvbi5wcm90b2NvbC5pbmRleE9mKFwiaHR0cFwiKSA9PT0gMCkge1xuICAgIGhvc3RuYW1lID0gc2VsZi5sb2NhdGlvbi5ob3N0bmFtZTtcbiAgfVxuICB2YXIgc29ja2V0VVJMUHJvdG9jb2wgPSBwYXJzZWRVUkwucHJvdG9jb2wgfHwgc2VsZi5sb2NhdGlvbi5wcm90b2NvbDtcblxuICAvLyBXaGVuIGh0dHBzIGlzIHVzZWQgaW4gdGhlIGFwcCwgc2VjdXJlIHdlYiBzb2NrZXRzIGFyZSBhbHdheXMgbmVjZXNzYXJ5IGJlY2F1c2UgdGhlIGJyb3dzZXIgZG9lc24ndCBhY2NlcHQgbm9uLXNlY3VyZSB3ZWIgc29ja2V0cy5cbiAgaWYgKHNvY2tldFVSTFByb3RvY29sID09PSBcImF1dG86XCIgfHwgaG9zdG5hbWUgJiYgaXNJbkFkZHJBbnkgJiYgc2VsZi5sb2NhdGlvbi5wcm90b2NvbCA9PT0gXCJodHRwczpcIikge1xuICAgIHNvY2tldFVSTFByb3RvY29sID0gc2VsZi5sb2NhdGlvbi5wcm90b2NvbDtcbiAgfVxuICBzb2NrZXRVUkxQcm90b2NvbCA9IHNvY2tldFVSTFByb3RvY29sLnJlcGxhY2UoL14oPzpodHRwfC4rLWV4dGVuc2lvbnxmaWxlKS9pLCBcIndzXCIpO1xuICB2YXIgc29ja2V0VVJMQXV0aCA9IFwiXCI7XG5cbiAgLy8gYG5ldyBVUkwodXJsU3RyaW5nLCBbYmFzZVVSTHN0cmluZ10pYCBkb2Vzbid0IGhhdmUgYGF1dGhgIHByb3BlcnR5XG4gIC8vIFBhcnNlIGF1dGhlbnRpY2F0aW9uIGNyZWRlbnRpYWxzIGluIGNhc2Ugd2UgbmVlZCB0aGVtXG4gIGlmIChwYXJzZWRVUkwudXNlcm5hbWUpIHtcbiAgICBzb2NrZXRVUkxBdXRoID0gcGFyc2VkVVJMLnVzZXJuYW1lO1xuXG4gICAgLy8gU2luY2UgSFRUUCBiYXNpYyBhdXRoZW50aWNhdGlvbiBkb2VzIG5vdCBhbGxvdyBlbXB0eSB1c2VybmFtZSxcbiAgICAvLyB3ZSBvbmx5IGluY2x1ZGUgcGFzc3dvcmQgaWYgdGhlIHVzZXJuYW1lIGlzIG5vdCBlbXB0eS5cbiAgICBpZiAocGFyc2VkVVJMLnBhc3N3b3JkKSB7XG4gICAgICAvLyBSZXN1bHQ6IDx1c2VybmFtZT46PHBhc3N3b3JkPlxuICAgICAgc29ja2V0VVJMQXV0aCA9IHNvY2tldFVSTEF1dGguY29uY2F0KFwiOlwiLCBwYXJzZWRVUkwucGFzc3dvcmQpO1xuICAgIH1cbiAgfVxuXG4gIC8vIEluIGNhc2UgdGhlIGhvc3QgaXMgYSByYXcgSVB2NiBhZGRyZXNzLCBpdCBjYW4gYmUgZW5jbG9zZWQgaW5cbiAgLy8gdGhlIGJyYWNrZXRzIGFzIHRoZSBicmFja2V0cyBhcmUgbmVlZGVkIGluIHRoZSBmaW5hbCBVUkwgc3RyaW5nLlxuICAvLyBOZWVkIHRvIHJlbW92ZSB0aG9zZSBhcyB1cmwuZm9ybWF0IGJsaW5kbHkgYWRkcyBpdHMgb3duIHNldCBvZiBicmFja2V0c1xuICAvLyBpZiB0aGUgaG9zdCBzdHJpbmcgY29udGFpbnMgY29sb25zLiBUaGF0IHdvdWxkIGxlYWQgdG8gbm9uLXdvcmtpbmdcbiAgLy8gZG91YmxlIGJyYWNrZXRzIChlLmcuIFtbOjpdXSkgaG9zdFxuICAvL1xuICAvLyBBbGwgb2YgdGhlc2Ugd2ViIHNvY2tldCB1cmwgcGFyYW1zIGFyZSBvcHRpb25hbGx5IHBhc3NlZCBpbiB0aHJvdWdoIHJlc291cmNlUXVlcnksXG4gIC8vIHNvIHdlIG5lZWQgdG8gZmFsbCBiYWNrIHRvIHRoZSBkZWZhdWx0IGlmIHRoZXkgYXJlIG5vdCBwcm92aWRlZFxuICB2YXIgc29ja2V0VVJMSG9zdG5hbWUgPSAoaG9zdG5hbWUgfHwgc2VsZi5sb2NhdGlvbi5ob3N0bmFtZSB8fCBcImxvY2FsaG9zdFwiKS5yZXBsYWNlKC9eXFxbKC4qKVxcXSQvLCBcIiQxXCIpO1xuICB2YXIgc29ja2V0VVJMUG9ydCA9IHBhcnNlZFVSTC5wb3J0O1xuICBpZiAoIXNvY2tldFVSTFBvcnQgfHwgc29ja2V0VVJMUG9ydCA9PT0gXCIwXCIpIHtcbiAgICBzb2NrZXRVUkxQb3J0ID0gc2VsZi5sb2NhdGlvbi5wb3J0O1xuICB9XG5cbiAgLy8gSWYgcGF0aCBpcyBwcm92aWRlZCBpdCdsbCBiZSBwYXNzZWQgaW4gdmlhIHRoZSByZXNvdXJjZVF1ZXJ5IGFzIGFcbiAgLy8gcXVlcnkgcGFyYW0gc28gaXQgaGFzIHRvIGJlIHBhcnNlZCBvdXQgb2YgdGhlIHF1ZXJ5c3RyaW5nIGluIG9yZGVyIGZvciB0aGVcbiAgLy8gY2xpZW50IHRvIG9wZW4gdGhlIHNvY2tldCB0byB0aGUgY29ycmVjdCBsb2NhdGlvbi5cbiAgdmFyIHNvY2tldFVSTFBhdGhuYW1lID0gXCIvd3NcIjtcbiAgaWYgKHBhcnNlZFVSTC5wYXRobmFtZSAmJiAhcGFyc2VkVVJMLmZyb21DdXJyZW50U2NyaXB0KSB7XG4gICAgc29ja2V0VVJMUGF0aG5hbWUgPSBwYXJzZWRVUkwucGF0aG5hbWU7XG4gIH1cbiAgcmV0dXJuIGZvcm1hdCh7XG4gICAgcHJvdG9jb2w6IHNvY2tldFVSTFByb3RvY29sLFxuICAgIGF1dGg6IHNvY2tldFVSTEF1dGgsXG4gICAgaG9zdG5hbWU6IHNvY2tldFVSTEhvc3RuYW1lLFxuICAgIHBvcnQ6IHNvY2tldFVSTFBvcnQsXG4gICAgcGF0aG5hbWU6IHNvY2tldFVSTFBhdGhuYW1lLFxuICAgIHNsYXNoZXM6IHRydWVcbiAgfSk7XG59XG5leHBvcnQgZGVmYXVsdCBjcmVhdGVTb2NrZXRVUkw7IiwiLyoqXG4gKiBAcmV0dXJucyB7c3RyaW5nfVxuICovXG5mdW5jdGlvbiBnZXRDdXJyZW50U2NyaXB0U291cmNlKCkge1xuICAvLyBgZG9jdW1lbnQuY3VycmVudFNjcmlwdGAgaXMgdGhlIG1vc3QgYWNjdXJhdGUgd2F5IHRvIGZpbmQgdGhlIGN1cnJlbnQgc2NyaXB0LFxuICAvLyBidXQgaXMgbm90IHN1cHBvcnRlZCBpbiBhbGwgYnJvd3NlcnMuXG4gIGlmIChkb2N1bWVudC5jdXJyZW50U2NyaXB0KSB7XG4gICAgcmV0dXJuIGRvY3VtZW50LmN1cnJlbnRTY3JpcHQuZ2V0QXR0cmlidXRlKFwic3JjXCIpO1xuICB9XG5cbiAgLy8gRmFsbGJhY2sgdG8gZ2V0dGluZyBhbGwgc2NyaXB0cyBydW5uaW5nIGluIHRoZSBkb2N1bWVudC5cbiAgdmFyIHNjcmlwdEVsZW1lbnRzID0gZG9jdW1lbnQuc2NyaXB0cyB8fCBbXTtcbiAgdmFyIHNjcmlwdEVsZW1lbnRzV2l0aFNyYyA9IEFycmF5LnByb3RvdHlwZS5maWx0ZXIuY2FsbChzY3JpcHRFbGVtZW50cywgZnVuY3Rpb24gKGVsZW1lbnQpIHtcbiAgICByZXR1cm4gZWxlbWVudC5nZXRBdHRyaWJ1dGUoXCJzcmNcIik7XG4gIH0pO1xuICBpZiAoc2NyaXB0RWxlbWVudHNXaXRoU3JjLmxlbmd0aCA+IDApIHtcbiAgICB2YXIgY3VycmVudFNjcmlwdCA9IHNjcmlwdEVsZW1lbnRzV2l0aFNyY1tzY3JpcHRFbGVtZW50c1dpdGhTcmMubGVuZ3RoIC0gMV07XG4gICAgcmV0dXJuIGN1cnJlbnRTY3JpcHQuZ2V0QXR0cmlidXRlKFwic3JjXCIpO1xuICB9XG5cbiAgLy8gRmFpbCBhcyB0aGVyZSB3YXMgbm8gc2NyaXB0IHRvIHVzZS5cbiAgdGhyb3cgbmV3IEVycm9yKFwiW3dlYnBhY2stZGV2LXNlcnZlcl0gRmFpbGVkIHRvIGdldCBjdXJyZW50IHNjcmlwdCBzb3VyY2UuXCIpO1xufVxuZXhwb3J0IGRlZmF1bHQgZ2V0Q3VycmVudFNjcmlwdFNvdXJjZTsiLCJpbXBvcnQgbG9nZ2VyIGZyb20gXCIuLi9tb2R1bGVzL2xvZ2dlci9pbmRleC5qc1wiO1xudmFyIG5hbWUgPSBcIndlYnBhY2stZGV2LXNlcnZlclwiO1xuLy8gZGVmYXVsdCBsZXZlbCBpcyBzZXQgb24gdGhlIGNsaWVudCBzaWRlLCBzbyBpdCBkb2VzIG5vdCBuZWVkXG4vLyB0byBiZSBzZXQgYnkgdGhlIENMSSBvciBBUElcbnZhciBkZWZhdWx0TGV2ZWwgPSBcImluZm9cIjtcblxuLy8gb3B0aW9ucyBuZXcgb3B0aW9ucywgbWVyZ2Ugd2l0aCBvbGQgb3B0aW9uc1xuLyoqXG4gKiBAcGFyYW0ge2ZhbHNlIHwgdHJ1ZSB8IFwibm9uZVwiIHwgXCJlcnJvclwiIHwgXCJ3YXJuXCIgfCBcImluZm9cIiB8IFwibG9nXCIgfCBcInZlcmJvc2VcIn0gbGV2ZWxcbiAqIEByZXR1cm5zIHt2b2lkfVxuICovXG5mdW5jdGlvbiBzZXRMb2dMZXZlbChsZXZlbCkge1xuICBsb2dnZXIuY29uZmlndXJlRGVmYXVsdExvZ2dlcih7XG4gICAgbGV2ZWw6IGxldmVsXG4gIH0pO1xufVxuc2V0TG9nTGV2ZWwoZGVmYXVsdExldmVsKTtcbnZhciBsb2cgPSBsb2dnZXIuZ2V0TG9nZ2VyKG5hbWUpO1xudmFyIGxvZ0VuYWJsZWRGZWF0dXJlcyA9IGZ1bmN0aW9uIGxvZ0VuYWJsZWRGZWF0dXJlcyhmZWF0dXJlcykge1xuICB2YXIgZW5hYmxlZEZlYXR1cmVzID0gT2JqZWN0LmtleXMoZmVhdHVyZXMpO1xuICBpZiAoIWZlYXR1cmVzIHx8IGVuYWJsZWRGZWF0dXJlcy5sZW5ndGggPT09IDApIHtcbiAgICByZXR1cm47XG4gIH1cbiAgdmFyIGxvZ1N0cmluZyA9IFwiU2VydmVyIHN0YXJ0ZWQ6XCI7XG5cbiAgLy8gU2VydmVyIHN0YXJ0ZWQ6IEhvdCBNb2R1bGUgUmVwbGFjZW1lbnQgZW5hYmxlZCwgTGl2ZSBSZWxvYWRpbmcgZW5hYmxlZCwgT3ZlcmxheSBkaXNhYmxlZC5cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBlbmFibGVkRmVhdHVyZXMubGVuZ3RoOyBpKyspIHtcbiAgICB2YXIga2V5ID0gZW5hYmxlZEZlYXR1cmVzW2ldO1xuICAgIGxvZ1N0cmluZyArPSBcIiBcIi5jb25jYXQoa2V5LCBcIiBcIikuY29uY2F0KGZlYXR1cmVzW2tleV0gPyBcImVuYWJsZWRcIiA6IFwiZGlzYWJsZWRcIiwgXCIsXCIpO1xuICB9XG4gIC8vIHJlcGxhY2UgbGFzdCBjb21tYSB3aXRoIGEgcGVyaW9kXG4gIGxvZ1N0cmluZyA9IGxvZ1N0cmluZy5zbGljZSgwLCAtMSkuY29uY2F0KFwiLlwiKTtcbiAgbG9nLmluZm8obG9nU3RyaW5nKTtcbn07XG5leHBvcnQgeyBsb2csIGxvZ0VuYWJsZWRGZWF0dXJlcywgc2V0TG9nTGV2ZWwgfTsiLCJpbXBvcnQgZ2V0Q3VycmVudFNjcmlwdFNvdXJjZSBmcm9tIFwiLi9nZXRDdXJyZW50U2NyaXB0U291cmNlLmpzXCI7XG5cbi8qKlxuICogQHBhcmFtIHtzdHJpbmd9IHJlc291cmNlUXVlcnlcbiAqIEByZXR1cm5zIHt7IFtrZXk6IHN0cmluZ106IHN0cmluZyB8IGJvb2xlYW4gfX1cbiAqL1xuZnVuY3Rpb24gcGFyc2VVUkwocmVzb3VyY2VRdWVyeSkge1xuICAvKiogQHR5cGUge3sgW2tleTogc3RyaW5nXTogc3RyaW5nIH19ICovXG4gIHZhciBvcHRpb25zID0ge307XG4gIGlmICh0eXBlb2YgcmVzb3VyY2VRdWVyeSA9PT0gXCJzdHJpbmdcIiAmJiByZXNvdXJjZVF1ZXJ5ICE9PSBcIlwiKSB7XG4gICAgdmFyIHNlYXJjaFBhcmFtcyA9IHJlc291cmNlUXVlcnkuc2xpY2UoMSkuc3BsaXQoXCImXCIpO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgc2VhcmNoUGFyYW1zLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgcGFpciA9IHNlYXJjaFBhcmFtc1tpXS5zcGxpdChcIj1cIik7XG4gICAgICBvcHRpb25zW3BhaXJbMF1dID0gZGVjb2RlVVJJQ29tcG9uZW50KHBhaXJbMV0pO1xuICAgIH1cbiAgfSBlbHNlIHtcbiAgICAvLyBFbHNlLCBnZXQgdGhlIHVybCBmcm9tIHRoZSA8c2NyaXB0PiB0aGlzIGZpbGUgd2FzIGNhbGxlZCB3aXRoLlxuICAgIHZhciBzY3JpcHRTb3VyY2UgPSBnZXRDdXJyZW50U2NyaXB0U291cmNlKCk7XG4gICAgdmFyIHNjcmlwdFNvdXJjZVVSTDtcbiAgICB0cnkge1xuICAgICAgLy8gVGhlIHBsYWNlaG9sZGVyIGBiYXNlVVJMYCB3aXRoIGB3aW5kb3cubG9jYXRpb24uaHJlZmAsXG4gICAgICAvLyBpcyB0byBhbGxvdyBwYXJzaW5nIG9mIHBhdGgtcmVsYXRpdmUgb3IgcHJvdG9jb2wtcmVsYXRpdmUgVVJMcyxcbiAgICAgIC8vIGFuZCB3aWxsIGhhdmUgbm8gZWZmZWN0IGlmIGBzY3JpcHRTb3VyY2VgIGlzIGEgZnVsbHkgdmFsaWQgVVJMLlxuICAgICAgc2NyaXB0U291cmNlVVJMID0gbmV3IFVSTChzY3JpcHRTb3VyY2UsIHNlbGYubG9jYXRpb24uaHJlZik7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIC8vIFVSTCBwYXJzaW5nIGZhaWxlZCwgZG8gbm90aGluZy5cbiAgICAgIC8vIFdlIHdpbGwgc3RpbGwgcHJvY2VlZCB0byBzZWUgaWYgd2UgY2FuIHJlY292ZXIgdXNpbmcgYHJlc291cmNlUXVlcnlgXG4gICAgfVxuICAgIGlmIChzY3JpcHRTb3VyY2VVUkwpIHtcbiAgICAgIG9wdGlvbnMgPSBzY3JpcHRTb3VyY2VVUkw7XG4gICAgICBvcHRpb25zLmZyb21DdXJyZW50U2NyaXB0ID0gdHJ1ZTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIG9wdGlvbnM7XG59XG5leHBvcnQgZGVmYXVsdCBwYXJzZVVSTDsiLCJpbXBvcnQgaG90RW1pdHRlciBmcm9tIFwid2VicGFjay9ob3QvZW1pdHRlci5qc1wiO1xuaW1wb3J0IHsgbG9nIH0gZnJvbSBcIi4vbG9nLmpzXCI7XG5cbi8qKiBAdHlwZWRlZiB7aW1wb3J0KFwiLi4vaW5kZXhcIikuT3B0aW9uc30gT3B0aW9uc1xuLyoqIEB0eXBlZGVmIHtpbXBvcnQoXCIuLi9pbmRleFwiKS5TdGF0dXN9IFN0YXR1c1xuXG4vKipcbiAqIEBwYXJhbSB7T3B0aW9uc30gb3B0aW9uc1xuICogQHBhcmFtIHtTdGF0dXN9IHN0YXR1c1xuICovXG5mdW5jdGlvbiByZWxvYWRBcHAoX3JlZiwgc3RhdHVzKSB7XG4gIHZhciBob3QgPSBfcmVmLmhvdCxcbiAgICBsaXZlUmVsb2FkID0gX3JlZi5saXZlUmVsb2FkO1xuICBpZiAoc3RhdHVzLmlzVW5sb2FkaW5nKSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIHZhciBjdXJyZW50SGFzaCA9IHN0YXR1cy5jdXJyZW50SGFzaCxcbiAgICBwcmV2aW91c0hhc2ggPSBzdGF0dXMucHJldmlvdXNIYXNoO1xuICB2YXIgaXNJbml0aWFsID0gY3VycmVudEhhc2guaW5kZXhPZiggLyoqIEB0eXBlIHtzdHJpbmd9ICovcHJldmlvdXNIYXNoKSA+PSAwO1xuICBpZiAoaXNJbml0aWFsKSB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgLyoqXG4gICAqIEBwYXJhbSB7V2luZG93fSByb290V2luZG93XG4gICAqIEBwYXJhbSB7bnVtYmVyfSBpbnRlcnZhbElkXG4gICAqL1xuICBmdW5jdGlvbiBhcHBseVJlbG9hZChyb290V2luZG93LCBpbnRlcnZhbElkKSB7XG4gICAgY2xlYXJJbnRlcnZhbChpbnRlcnZhbElkKTtcbiAgICBsb2cuaW5mbyhcIkFwcCB1cGRhdGVkLiBSZWxvYWRpbmcuLi5cIik7XG4gICAgcm9vdFdpbmRvdy5sb2NhdGlvbi5yZWxvYWQoKTtcbiAgfVxuICB2YXIgc2VhcmNoID0gc2VsZi5sb2NhdGlvbi5zZWFyY2gudG9Mb3dlckNhc2UoKTtcbiAgdmFyIGFsbG93VG9Ib3QgPSBzZWFyY2guaW5kZXhPZihcIndlYnBhY2stZGV2LXNlcnZlci1ob3Q9ZmFsc2VcIikgPT09IC0xO1xuICB2YXIgYWxsb3dUb0xpdmVSZWxvYWQgPSBzZWFyY2guaW5kZXhPZihcIndlYnBhY2stZGV2LXNlcnZlci1saXZlLXJlbG9hZD1mYWxzZVwiKSA9PT0gLTE7XG4gIGlmIChob3QgJiYgYWxsb3dUb0hvdCkge1xuICAgIGxvZy5pbmZvKFwiQXBwIGhvdCB1cGRhdGUuLi5cIik7XG4gICAgaG90RW1pdHRlci5lbWl0KFwid2VicGFja0hvdFVwZGF0ZVwiLCBzdGF0dXMuY3VycmVudEhhc2gpO1xuICAgIGlmICh0eXBlb2Ygc2VsZiAhPT0gXCJ1bmRlZmluZWRcIiAmJiBzZWxmLndpbmRvdykge1xuICAgICAgLy8gYnJvYWRjYXN0IHVwZGF0ZSB0byB3aW5kb3dcbiAgICAgIHNlbGYucG9zdE1lc3NhZ2UoXCJ3ZWJwYWNrSG90VXBkYXRlXCIuY29uY2F0KHN0YXR1cy5jdXJyZW50SGFzaCksIFwiKlwiKTtcbiAgICB9XG4gIH1cbiAgLy8gYWxsb3cgcmVmcmVzaGluZyB0aGUgcGFnZSBvbmx5IGlmIGxpdmVSZWxvYWQgaXNuJ3QgZGlzYWJsZWRcbiAgZWxzZSBpZiAobGl2ZVJlbG9hZCAmJiBhbGxvd1RvTGl2ZVJlbG9hZCkge1xuICAgIHZhciByb290V2luZG93ID0gc2VsZjtcblxuICAgIC8vIHVzZSBwYXJlbnQgd2luZG93IGZvciByZWxvYWQgKGluIGNhc2Ugd2UncmUgaW4gYW4gaWZyYW1lIHdpdGggbm8gdmFsaWQgc3JjKVxuICAgIHZhciBpbnRlcnZhbElkID0gc2VsZi5zZXRJbnRlcnZhbChmdW5jdGlvbiAoKSB7XG4gICAgICBpZiAocm9vdFdpbmRvdy5sb2NhdGlvbi5wcm90b2NvbCAhPT0gXCJhYm91dDpcIikge1xuICAgICAgICAvLyByZWxvYWQgaW1tZWRpYXRlbHkgaWYgcHJvdG9jb2wgaXMgdmFsaWRcbiAgICAgICAgYXBwbHlSZWxvYWQocm9vdFdpbmRvdywgaW50ZXJ2YWxJZCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByb290V2luZG93ID0gcm9vdFdpbmRvdy5wYXJlbnQ7XG4gICAgICAgIGlmIChyb290V2luZG93LnBhcmVudCA9PT0gcm9vdFdpbmRvdykge1xuICAgICAgICAgIC8vIGlmIHBhcmVudCBlcXVhbHMgY3VycmVudCB3aW5kb3cgd2UndmUgcmVhY2hlZCB0aGUgcm9vdCB3aGljaCB3b3VsZCBjb250aW51ZSBmb3JldmVyLCBzbyB0cmlnZ2VyIGEgcmVsb2FkIGFueXdheXNcbiAgICAgICAgICBhcHBseVJlbG9hZChyb290V2luZG93LCBpbnRlcnZhbElkKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pO1xuICB9XG59XG5leHBvcnQgZGVmYXVsdCByZWxvYWRBcHA7IiwiLyogZ2xvYmFsIF9fcmVzb3VyY2VRdWVyeSBXb3JrZXJHbG9iYWxTY29wZSAqL1xuXG4vLyBTZW5kIG1lc3NhZ2VzIHRvIHRoZSBvdXRzaWRlLCBzbyBwbHVnaW5zIGNhbiBjb25zdW1lIGl0LlxuLyoqXG4gKiBAcGFyYW0ge3N0cmluZ30gdHlwZVxuICogQHBhcmFtIHthbnl9IFtkYXRhXVxuICovXG5mdW5jdGlvbiBzZW5kTXNnKHR5cGUsIGRhdGEpIHtcbiAgaWYgKHR5cGVvZiBzZWxmICE9PSBcInVuZGVmaW5lZFwiICYmICh0eXBlb2YgV29ya2VyR2xvYmFsU2NvcGUgPT09IFwidW5kZWZpbmVkXCIgfHwgIShzZWxmIGluc3RhbmNlb2YgV29ya2VyR2xvYmFsU2NvcGUpKSkge1xuICAgIHNlbGYucG9zdE1lc3NhZ2Uoe1xuICAgICAgdHlwZTogXCJ3ZWJwYWNrXCIuY29uY2F0KHR5cGUpLFxuICAgICAgZGF0YTogZGF0YVxuICAgIH0sIFwiKlwiKTtcbiAgfVxufVxuZXhwb3J0IGRlZmF1bHQgc2VuZE1zZzsiLCJ2YXIgYW5zaVJlZ2V4ID0gbmV3IFJlZ0V4cChbXCJbXFxcXHUwMDFCXFxcXHUwMDlCXVtbXFxcXF0oKSM7P10qKD86KD86KD86KD86O1stYS16QS1aXFxcXGRcXFxcLyMmLjo9PyVAfl9dKykqfFthLXpBLVpcXFxcZF0rKD86O1stYS16QS1aXFxcXGRcXFxcLyMmLjo9PyVAfl9dKikqKT9cXFxcdTAwMDcpXCIsIFwiKD86KD86XFxcXGR7MSw0fSg/OjtcXFxcZHswLDR9KSopP1tcXFxcZEEtUFItVFpjZi1ucS11eT0+PH5dKSlcIl0uam9pbihcInxcIiksIFwiZ1wiKTtcblxuLyoqXG4gKlxuICogU3RyaXAgW0FOU0kgZXNjYXBlIGNvZGVzXShodHRwczovL2VuLndpa2lwZWRpYS5vcmcvd2lraS9BTlNJX2VzY2FwZV9jb2RlKSBmcm9tIGEgc3RyaW5nLlxuICogQWRhcHRlZCBmcm9tIGNvZGUgb3JpZ2luYWxseSByZWxlYXNlZCBieSBTaW5kcmUgU29yaHVzXG4gKiBMaWNlbnNlZCB0aGUgTUlUIExpY2Vuc2VcbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gc3RyaW5nXG4gKiBAcmV0dXJuIHtzdHJpbmd9XG4gKi9cbmZ1bmN0aW9uIHN0cmlwQW5zaShzdHJpbmcpIHtcbiAgaWYgKHR5cGVvZiBzdHJpbmcgIT09IFwic3RyaW5nXCIpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiRXhwZWN0ZWQgYSBgc3RyaW5nYCwgZ290IGBcIi5jb25jYXQodHlwZW9mIHN0cmluZywgXCJgXCIpKTtcbiAgfVxuICByZXR1cm4gc3RyaW5nLnJlcGxhY2UoYW5zaVJlZ2V4LCBcIlwiKTtcbn1cbmV4cG9ydCBkZWZhdWx0IHN0cmlwQW5zaTsiLCIvKlxuXHRNSVQgTGljZW5zZSBodHRwOi8vd3d3Lm9wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL21pdC1saWNlbnNlLnBocFxuXHRBdXRob3IgVG9iaWFzIEtvcHBlcnMgQHNva3JhXG4qL1xuLyogZ2xvYmFscyBfX3dlYnBhY2tfaGFzaF9fICovXG5pZiAobW9kdWxlLmhvdCkge1xuXHQvKiogQHR5cGUge3VuZGVmaW5lZHxzdHJpbmd9ICovXG5cdHZhciBsYXN0SGFzaDtcblx0dmFyIHVwVG9EYXRlID0gZnVuY3Rpb24gdXBUb0RhdGUoKSB7XG5cdFx0cmV0dXJuIC8qKiBAdHlwZSB7c3RyaW5nfSAqLyAobGFzdEhhc2gpLmluZGV4T2YoX193ZWJwYWNrX2hhc2hfXykgPj0gMDtcblx0fTtcblx0dmFyIGxvZyA9IHJlcXVpcmUoXCIuL2xvZ1wiKTtcblx0dmFyIGNoZWNrID0gZnVuY3Rpb24gY2hlY2soKSB7XG5cdFx0bW9kdWxlLmhvdFxuXHRcdFx0LmNoZWNrKHRydWUpXG5cdFx0XHQudGhlbihmdW5jdGlvbiAodXBkYXRlZE1vZHVsZXMpIHtcblx0XHRcdFx0aWYgKCF1cGRhdGVkTW9kdWxlcykge1xuXHRcdFx0XHRcdGxvZyhcblx0XHRcdFx0XHRcdFwid2FybmluZ1wiLFxuXHRcdFx0XHRcdFx0XCJbSE1SXSBDYW5ub3QgZmluZCB1cGRhdGUuIFwiICtcblx0XHRcdFx0XHRcdFx0KHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCJcblx0XHRcdFx0XHRcdFx0XHQ/IFwiTmVlZCB0byBkbyBhIGZ1bGwgcmVsb2FkIVwiXG5cdFx0XHRcdFx0XHRcdFx0OiBcIlBsZWFzZSByZWxvYWQgbWFudWFsbHkhXCIpXG5cdFx0XHRcdFx0KTtcblx0XHRcdFx0XHRsb2coXG5cdFx0XHRcdFx0XHRcIndhcm5pbmdcIixcblx0XHRcdFx0XHRcdFwiW0hNUl0gKFByb2JhYmx5IGJlY2F1c2Ugb2YgcmVzdGFydGluZyB0aGUgd2VicGFjay1kZXYtc2VydmVyKVwiXG5cdFx0XHRcdFx0KTtcblx0XHRcdFx0XHRpZiAodHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIikge1xuXHRcdFx0XHRcdFx0d2luZG93LmxvY2F0aW9uLnJlbG9hZCgpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRyZXR1cm47XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRpZiAoIXVwVG9EYXRlKCkpIHtcblx0XHRcdFx0XHRjaGVjaygpO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0cmVxdWlyZShcIi4vbG9nLWFwcGx5LXJlc3VsdFwiKSh1cGRhdGVkTW9kdWxlcywgdXBkYXRlZE1vZHVsZXMpO1xuXG5cdFx0XHRcdGlmICh1cFRvRGF0ZSgpKSB7XG5cdFx0XHRcdFx0bG9nKFwiaW5mb1wiLCBcIltITVJdIEFwcCBpcyB1cCB0byBkYXRlLlwiKTtcblx0XHRcdFx0fVxuXHRcdFx0fSlcblx0XHRcdC5jYXRjaChmdW5jdGlvbiAoZXJyKSB7XG5cdFx0XHRcdHZhciBzdGF0dXMgPSBtb2R1bGUuaG90LnN0YXR1cygpO1xuXHRcdFx0XHRpZiAoW1wiYWJvcnRcIiwgXCJmYWlsXCJdLmluZGV4T2Yoc3RhdHVzKSA+PSAwKSB7XG5cdFx0XHRcdFx0bG9nKFxuXHRcdFx0XHRcdFx0XCJ3YXJuaW5nXCIsXG5cdFx0XHRcdFx0XHRcIltITVJdIENhbm5vdCBhcHBseSB1cGRhdGUuIFwiICtcblx0XHRcdFx0XHRcdFx0KHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCJcblx0XHRcdFx0XHRcdFx0XHQ/IFwiTmVlZCB0byBkbyBhIGZ1bGwgcmVsb2FkIVwiXG5cdFx0XHRcdFx0XHRcdFx0OiBcIlBsZWFzZSByZWxvYWQgbWFudWFsbHkhXCIpXG5cdFx0XHRcdFx0KTtcblx0XHRcdFx0XHRsb2coXCJ3YXJuaW5nXCIsIFwiW0hNUl0gXCIgKyBsb2cuZm9ybWF0RXJyb3IoZXJyKSk7XG5cdFx0XHRcdFx0aWYgKHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIpIHtcblx0XHRcdFx0XHRcdHdpbmRvdy5sb2NhdGlvbi5yZWxvYWQoKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0bG9nKFwid2FybmluZ1wiLCBcIltITVJdIFVwZGF0ZSBmYWlsZWQ6IFwiICsgbG9nLmZvcm1hdEVycm9yKGVycikpO1xuXHRcdFx0XHR9XG5cdFx0XHR9KTtcblx0fTtcblx0dmFyIGhvdEVtaXR0ZXIgPSByZXF1aXJlKFwiLi9lbWl0dGVyXCIpO1xuXHRob3RFbWl0dGVyLm9uKFwid2VicGFja0hvdFVwZGF0ZVwiLCBmdW5jdGlvbiAoY3VycmVudEhhc2gpIHtcblx0XHRsYXN0SGFzaCA9IGN1cnJlbnRIYXNoO1xuXHRcdGlmICghdXBUb0RhdGUoKSAmJiBtb2R1bGUuaG90LnN0YXR1cygpID09PSBcImlkbGVcIikge1xuXHRcdFx0bG9nKFwiaW5mb1wiLCBcIltITVJdIENoZWNraW5nIGZvciB1cGRhdGVzIG9uIHRoZSBzZXJ2ZXIuLi5cIik7XG5cdFx0XHRjaGVjaygpO1xuXHRcdH1cblx0fSk7XG5cdGxvZyhcImluZm9cIiwgXCJbSE1SXSBXYWl0aW5nIGZvciB1cGRhdGUgc2lnbmFsIGZyb20gV0RTLi4uXCIpO1xufSBlbHNlIHtcblx0dGhyb3cgbmV3IEVycm9yKFwiW0hNUl0gSG90IE1vZHVsZSBSZXBsYWNlbWVudCBpcyBkaXNhYmxlZC5cIik7XG59XG4iLCJ2YXIgRXZlbnRFbWl0dGVyID0gcmVxdWlyZShcImV2ZW50c1wiKTtcbm1vZHVsZS5leHBvcnRzID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuIiwiLypcblx0TUlUIExpY2Vuc2UgaHR0cDovL3d3dy5vcGVuc291cmNlLm9yZy9saWNlbnNlcy9taXQtbGljZW5zZS5waHBcblx0QXV0aG9yIFRvYmlhcyBLb3BwZXJzIEBzb2tyYVxuKi9cblxuLyoqXG4gKiBAcGFyYW0geyhzdHJpbmcgfCBudW1iZXIpW119IHVwZGF0ZWRNb2R1bGVzIHVwZGF0ZWQgbW9kdWxlc1xuICogQHBhcmFtIHsoc3RyaW5nIHwgbnVtYmVyKVtdIHwgbnVsbH0gcmVuZXdlZE1vZHVsZXMgcmVuZXdlZCBtb2R1bGVzXG4gKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKHVwZGF0ZWRNb2R1bGVzLCByZW5ld2VkTW9kdWxlcykge1xuXHR2YXIgdW5hY2NlcHRlZE1vZHVsZXMgPSB1cGRhdGVkTW9kdWxlcy5maWx0ZXIoZnVuY3Rpb24gKG1vZHVsZUlkKSB7XG5cdFx0cmV0dXJuIHJlbmV3ZWRNb2R1bGVzICYmIHJlbmV3ZWRNb2R1bGVzLmluZGV4T2YobW9kdWxlSWQpIDwgMDtcblx0fSk7XG5cdHZhciBsb2cgPSByZXF1aXJlKFwiLi9sb2dcIik7XG5cblx0aWYgKHVuYWNjZXB0ZWRNb2R1bGVzLmxlbmd0aCA+IDApIHtcblx0XHRsb2coXG5cdFx0XHRcIndhcm5pbmdcIixcblx0XHRcdFwiW0hNUl0gVGhlIGZvbGxvd2luZyBtb2R1bGVzIGNvdWxkbid0IGJlIGhvdCB1cGRhdGVkOiAoVGhleSB3b3VsZCBuZWVkIGEgZnVsbCByZWxvYWQhKVwiXG5cdFx0KTtcblx0XHR1bmFjY2VwdGVkTW9kdWxlcy5mb3JFYWNoKGZ1bmN0aW9uIChtb2R1bGVJZCkge1xuXHRcdFx0bG9nKFwid2FybmluZ1wiLCBcIltITVJdICAtIFwiICsgbW9kdWxlSWQpO1xuXHRcdH0pO1xuXHR9XG5cblx0aWYgKCFyZW5ld2VkTW9kdWxlcyB8fCByZW5ld2VkTW9kdWxlcy5sZW5ndGggPT09IDApIHtcblx0XHRsb2coXCJpbmZvXCIsIFwiW0hNUl0gTm90aGluZyBob3QgdXBkYXRlZC5cIik7XG5cdH0gZWxzZSB7XG5cdFx0bG9nKFwiaW5mb1wiLCBcIltITVJdIFVwZGF0ZWQgbW9kdWxlczpcIik7XG5cdFx0cmVuZXdlZE1vZHVsZXMuZm9yRWFjaChmdW5jdGlvbiAobW9kdWxlSWQpIHtcblx0XHRcdGlmICh0eXBlb2YgbW9kdWxlSWQgPT09IFwic3RyaW5nXCIgJiYgbW9kdWxlSWQuaW5kZXhPZihcIiFcIikgIT09IC0xKSB7XG5cdFx0XHRcdHZhciBwYXJ0cyA9IG1vZHVsZUlkLnNwbGl0KFwiIVwiKTtcblx0XHRcdFx0bG9nLmdyb3VwQ29sbGFwc2VkKFwiaW5mb1wiLCBcIltITVJdICAtIFwiICsgcGFydHMucG9wKCkpO1xuXHRcdFx0XHRsb2coXCJpbmZvXCIsIFwiW0hNUl0gIC0gXCIgKyBtb2R1bGVJZCk7XG5cdFx0XHRcdGxvZy5ncm91cEVuZChcImluZm9cIik7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRsb2coXCJpbmZvXCIsIFwiW0hNUl0gIC0gXCIgKyBtb2R1bGVJZCk7XG5cdFx0XHR9XG5cdFx0fSk7XG5cdFx0dmFyIG51bWJlcklkcyA9IHJlbmV3ZWRNb2R1bGVzLmV2ZXJ5KGZ1bmN0aW9uIChtb2R1bGVJZCkge1xuXHRcdFx0cmV0dXJuIHR5cGVvZiBtb2R1bGVJZCA9PT0gXCJudW1iZXJcIjtcblx0XHR9KTtcblx0XHRpZiAobnVtYmVySWRzKVxuXHRcdFx0bG9nKFxuXHRcdFx0XHRcImluZm9cIixcblx0XHRcdFx0J1tITVJdIENvbnNpZGVyIHVzaW5nIHRoZSBvcHRpbWl6YXRpb24ubW9kdWxlSWRzOiBcIm5hbWVkXCIgZm9yIG1vZHVsZSBuYW1lcy4nXG5cdFx0XHQpO1xuXHR9XG59O1xuIiwiLyoqIEB0eXBlZGVmIHtcImluZm9cIiB8IFwid2FybmluZ1wiIHwgXCJlcnJvclwifSBMb2dMZXZlbCAqL1xuXG4vKiogQHR5cGUge0xvZ0xldmVsfSAqL1xudmFyIGxvZ0xldmVsID0gXCJpbmZvXCI7XG5cbmZ1bmN0aW9uIGR1bW15KCkge31cblxuLyoqXG4gKiBAcGFyYW0ge0xvZ0xldmVsfSBsZXZlbCBsb2cgbGV2ZWxcbiAqIEByZXR1cm5zIHtib29sZWFufSB0cnVlLCBpZiBzaG91bGQgbG9nXG4gKi9cbmZ1bmN0aW9uIHNob3VsZExvZyhsZXZlbCkge1xuXHR2YXIgc2hvdWxkTG9nID1cblx0XHQobG9nTGV2ZWwgPT09IFwiaW5mb1wiICYmIGxldmVsID09PSBcImluZm9cIikgfHxcblx0XHQoW1wiaW5mb1wiLCBcIndhcm5pbmdcIl0uaW5kZXhPZihsb2dMZXZlbCkgPj0gMCAmJiBsZXZlbCA9PT0gXCJ3YXJuaW5nXCIpIHx8XG5cdFx0KFtcImluZm9cIiwgXCJ3YXJuaW5nXCIsIFwiZXJyb3JcIl0uaW5kZXhPZihsb2dMZXZlbCkgPj0gMCAmJiBsZXZlbCA9PT0gXCJlcnJvclwiKTtcblx0cmV0dXJuIHNob3VsZExvZztcbn1cblxuLyoqXG4gKiBAcGFyYW0geyhtc2c/OiBzdHJpbmcpID0+IHZvaWR9IGxvZ0ZuIGxvZyBmdW5jdGlvblxuICogQHJldHVybnMgeyhsZXZlbDogTG9nTGV2ZWwsIG1zZz86IHN0cmluZykgPT4gdm9pZH0gZnVuY3Rpb24gdGhhdCBsb2dzIHdoZW4gbG9nIGxldmVsIGlzIHN1ZmZpY2llbnRcbiAqL1xuZnVuY3Rpb24gbG9nR3JvdXAobG9nRm4pIHtcblx0cmV0dXJuIGZ1bmN0aW9uIChsZXZlbCwgbXNnKSB7XG5cdFx0aWYgKHNob3VsZExvZyhsZXZlbCkpIHtcblx0XHRcdGxvZ0ZuKG1zZyk7XG5cdFx0fVxuXHR9O1xufVxuXG4vKipcbiAqIEBwYXJhbSB7TG9nTGV2ZWx9IGxldmVsIGxvZyBsZXZlbFxuICogQHBhcmFtIHtzdHJpbmd8RXJyb3J9IG1zZyBtZXNzYWdlXG4gKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGxldmVsLCBtc2cpIHtcblx0aWYgKHNob3VsZExvZyhsZXZlbCkpIHtcblx0XHRpZiAobGV2ZWwgPT09IFwiaW5mb1wiKSB7XG5cdFx0XHRjb25zb2xlLmxvZyhtc2cpO1xuXHRcdH0gZWxzZSBpZiAobGV2ZWwgPT09IFwid2FybmluZ1wiKSB7XG5cdFx0XHRjb25zb2xlLndhcm4obXNnKTtcblx0XHR9IGVsc2UgaWYgKGxldmVsID09PSBcImVycm9yXCIpIHtcblx0XHRcdGNvbnNvbGUuZXJyb3IobXNnKTtcblx0XHR9XG5cdH1cbn07XG5cbnZhciBncm91cCA9IGNvbnNvbGUuZ3JvdXAgfHwgZHVtbXk7XG52YXIgZ3JvdXBDb2xsYXBzZWQgPSBjb25zb2xlLmdyb3VwQ29sbGFwc2VkIHx8IGR1bW15O1xudmFyIGdyb3VwRW5kID0gY29uc29sZS5ncm91cEVuZCB8fCBkdW1teTtcblxubW9kdWxlLmV4cG9ydHMuZ3JvdXAgPSBsb2dHcm91cChncm91cCk7XG5cbm1vZHVsZS5leHBvcnRzLmdyb3VwQ29sbGFwc2VkID0gbG9nR3JvdXAoZ3JvdXBDb2xsYXBzZWQpO1xuXG5tb2R1bGUuZXhwb3J0cy5ncm91cEVuZCA9IGxvZ0dyb3VwKGdyb3VwRW5kKTtcblxuLyoqXG4gKiBAcGFyYW0ge0xvZ0xldmVsfSBsZXZlbCBsb2cgbGV2ZWxcbiAqL1xubW9kdWxlLmV4cG9ydHMuc2V0TG9nTGV2ZWwgPSBmdW5jdGlvbiAobGV2ZWwpIHtcblx0bG9nTGV2ZWwgPSBsZXZlbDtcbn07XG5cbi8qKlxuICogQHBhcmFtIHtFcnJvcn0gZXJyIGVycm9yXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBmb3JtYXR0ZWQgZXJyb3JcbiAqL1xubW9kdWxlLmV4cG9ydHMuZm9ybWF0RXJyb3IgPSBmdW5jdGlvbiAoZXJyKSB7XG5cdHZhciBtZXNzYWdlID0gZXJyLm1lc3NhZ2U7XG5cdHZhciBzdGFjayA9IGVyci5zdGFjaztcblx0aWYgKCFzdGFjaykge1xuXHRcdHJldHVybiBtZXNzYWdlO1xuXHR9IGVsc2UgaWYgKHN0YWNrLmluZGV4T2YobWVzc2FnZSkgPCAwKSB7XG5cdFx0cmV0dXJuIG1lc3NhZ2UgKyBcIlxcblwiICsgc3RhY2s7XG5cdH0gZWxzZSB7XG5cdFx0cmV0dXJuIHN0YWNrO1xuXHR9XG59O1xuIiwiaW1wb3J0IHsgZ2V0TWFpbldpZHRoLCBpblRhcmdldCB9IGZyb20gXCIuL3V0aWxzLmpzXCI7XG5pbXBvcnQgeyB0aHJvdHRsZSB9IGZyb20gXCIuL3V0aWxzLmpzXCI7XG5pbXBvcnQgeyBhbmltYXRlQ3VydmVkU3RlcHNUcmFjayB9IGZyb20gXCIuL3N0ZXBzLXRyYWNrL2N1cnZlZC10cmFjay5qc1wiO1xuaW1wb3J0IHsgYW5pbWF0ZVN0cmFpZ2h0U3RlcHNUcmFjayB9IGZyb20gXCIuL3N0ZXBzLXRyYWNrL3N0cmFpZ2h0LXRyYWNrLmpzXCI7XG5pbXBvcnQgeyBzdGVwc0xpbmUgfSBmcm9tIFwiLi9zdGVwcy10cmFjay9zdGVwcy1saW5lLXZhcnMuanNcIjtcbi8vbGV0IHN0ZXBzTGluZS5zdGFydFksIHN0ZXBzTGluZS5lbmRZLCBzdGVwc0xpbmUucGF0aExlbmd0aDtcblxuXG5mdW5jdGlvbiBhbmltTnVtYmVyKG51bU9iaiwgZHVyYXRpb24pIHtcbiAgY29uc3QgbnVtID0gcGFyc2VJbnQobnVtT2JqLmlubmVySFRNTC5yZXBsYWNlKFwiIFwiLCBcIlwiKSwgMTApO1xuICBsZXQgc3RhcnRUaW1lO1xuXG4gIGNvbnN0IHN0ZXAgPSAodGltZXN0YW1wKSA9PiB7XG4gICAgaWYgKHN0YXJ0VGltZSA9PT0gdW5kZWZpbmVkKSBzdGFydFRpbWUgPSB0aW1lc3RhbXA7XG4gICAgY29uc3QgcHJvZ3Jlc3MgPSBwYXJzZUZsb2F0KFxuICAgICAgTWF0aC5taW4oKHRpbWVzdGFtcCAtIHN0YXJ0VGltZSkgLyBkdXJhdGlvbiwgMSkudG9GaXhlZCgyKVxuICAgICk7XG4gICAgbnVtT2JqLmlubmVySFRNTCA9XG4gICAgICBNYXRoLmZsb29yKHByb2dyZXNzICogbnVtKS50b0xvY2FsZVN0cmluZyhcInJ1LVJVXCIsIHtcbiAgICAgICAgdXNlR3JvdXBpbmc6IHRydWUsXG4gICAgICB9KSArIFwiK1wiO1xuXG4gICAgaWYgKHByb2dyZXNzIDwgMSkge1xuICAgICAgd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZShzdGVwKTtcbiAgICB9XG4gIH07XG4gIHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUoc3RlcCk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBhbmltYXRlRWxlbWVudHMoZWxlbWVudHMsIHRhcmdldFBvc2l0aW9uLCBoYW5kbGVyRnVuYykge1xuICBsZXQgZWxlbWVudHNDbGFzc2VzQ291bnQgPSB7fTtcbiAgZWxlbWVudHMuZm9yRWFjaCgoZWxlbWVudCkgPT4ge1xuICAgIGlmIChlbGVtZW50LmNsYXNzTGlzdC5jb250YWlucyhcInNjcm9sbGVkLWluXCIpKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgLy8gY29uc3QgZWxlbWVudFBvc2l0aW9uID0gZWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS50b3A7XG4gICAgaWYgKGluVGFyZ2V0KGVsZW1lbnQsIHRhcmdldFBvc2l0aW9uKS8qZWxlbWVudFBvc2l0aW9uIDw9IHRhcmdldFBvc2l0aW9uKi8pIHtcbiAgICAgIGNvbnN0IGVsZW1lbnRDbGFzcyA9IGVsZW1lbnQuY2xhc3NMaXN0WzBdO1xuXG4gICAgICBpZiAoZWxlbWVudENsYXNzIGluIGVsZW1lbnRzQ2xhc3Nlc0NvdW50KSB7XG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgIGVsZW1lbnQuY2xhc3NMaXN0LmFkZChcInNjcm9sbGVkLWluXCIpO1xuICAgICAgICB9LCAxMDAgKiBlbGVtZW50c0NsYXNzZXNDb3VudFtlbGVtZW50Q2xhc3NdKTtcbiAgICAgICAgZWxlbWVudHNDbGFzc2VzQ291bnRbZWxlbWVudENsYXNzXSArPSAxO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZWxlbWVudHNDbGFzc2VzQ291bnRbZWxlbWVudENsYXNzXSA9IDE7XG4gICAgICAgIGVsZW1lbnQuY2xhc3NMaXN0LmFkZChcInNjcm9sbGVkLWluXCIpO1xuICAgICAgfVxuXG4gICAgICBpZiAoZWxlbWVudC5jbGFzc0xpc3QuY29udGFpbnMoXCJwcm9tb19fc3RhdGlzdGljc1wiKSkge1xuICAgICAgICBlbGVtZW50XG4gICAgICAgICAgLnF1ZXJ5U2VsZWN0b3JBbGwoXCIucHJvbW9fX3N0YXRpc3RpY3MtZGVzY3JpcHRpb25cIilcbiAgICAgICAgICAuZm9yRWFjaCgoZWwpID0+IHtcbiAgICAgICAgICAgIGFuaW1OdW1iZXIoZWwsIDI1MDApO1xuICAgICAgICAgIH0pO1xuICAgICAgfVxuICAgICAgaWYgKGVsZW1lbnQuY2xhc3NMaXN0LmNvbnRhaW5zKFwiYW5pbWF0ZS1jaGlsZHNcIikpIHtcbiAgICAgICAgY29uc3QgY2hpbGRyZW4gPSBlbGVtZW50LmNoaWxkcmVuO1xuICAgICAgICBmb3IgKGxldCBjaGlsZCBvZiBjaGlsZHJlbikge1xuICAgICAgICAgIC8qaWYgKGNoaWxkLmNsYXNzTGlzdC5jb250YWlucyhcImxpbmUtc3RhcnRcIikpIHtcbiAgICAgICAgICAgIGNvbnN0IGN1cnJlbnRTY3JvbGxQb3NpdGlvbiA9IHdpbmRvdy5zY3JvbGxZO1xuICAgICAgICAgICAgY29uc3QgYW5pbWF0ZUFyZ3VtZW50cyA9IFtcbiAgICAgICAgICAgICAgY3VycmVudFNjcm9sbFBvc2l0aW9uLFxuICAgICAgICAgICAgICBzdGVwc0xpbmUuc3RhcnRZLFxuICAgICAgICAgICAgICBzdGVwc0xpbmUuZW5kWSxcbiAgICAgICAgICAgICAgc3RlcHNMaW5lLnBhdGhMZW5ndGgsXG4gICAgICAgICAgICBdO1xuICAgICAgICAgICAgY29uc3QgYW5pbWF0ZUZ1bmN0aW9uID1cbiAgICAgICAgICAgICAgZ2V0TWFpbldpZHRoKCkgPD0gMTMwMFxuICAgICAgICAgICAgICAgID8gYW5pbWF0ZVN0cmFpZ2h0U3RlcHNUcmFja1xuICAgICAgICAgICAgICAgIDogYW5pbWF0ZUN1cnZlZFN0ZXBzVHJhY2s7XG5cbiAgICAgICAgICAgIGNvbnN0IHRocm90dGxlZEFuaW1hdGVTdGVwc1RyYWNrID0gdGhyb3R0bGUoKCkgPT4ge1xuICAgICAgICAgICAgICBhbmltYXRlRnVuY3Rpb24oLi4uYW5pbWF0ZUFyZ3VtZW50cywgdGhyb3R0bGVkQW5pbWF0ZVN0ZXBzVHJhY2spO1xuICAgICAgICAgICAgfSwgNTApO1xuXG4gICAgICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcInNjcm9sbFwiLCB0aHJvdHRsZWRBbmltYXRlU3RlcHNUcmFjayk7XG4gICAgICAgICAgfSovXG4gICAgICAgICAgY2hpbGQuY2xhc3NMaXN0LmFkZChcInNjcm9sbGVkLWluXCIpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIGlmIChcbiAgICAgIHdpbmRvdy5zY3JvbGxZID5cbiAgICAgIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zY3JvbGxIZWlnaHQgLVxuICAgICAgICBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xpZW50SGVpZ2h0ICogMS4yXG4gICAgKSB7XG4gICAgICBlbGVtZW50c1tlbGVtZW50cy5sZW5ndGggLSAxXS5jbGFzc0xpc3QuYWRkKFwic2Nyb2xsZWQtaW5cIik7XG5cbiAgICAgIC8vd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJzY3JvbGxcIiwgaGFuZGxlckZ1bmMpO1xuICAgIH1cbiAgfSk7XG59XG4iLCIgIGNvbnN0IGhlYWRlckhlaWdodCA9IGAke1xuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucGFnZS1oZWFkZXJcIikub2Zmc2V0SGVpZ2h0XG4gIH1weGA7XG4gIFxuICBkb2N1bWVudFxuICAgIC5xdWVyeVNlbGVjdG9yKFwiOnJvb3RcIilcbiAgICAuc3R5bGUuc2V0UHJvcGVydHkoXCItLWhlYWRlci1oaWdodFwiLCBgJHtoZWFkZXJIZWlnaHR9YCk7XG5cbiAgY29uc3QgYnVyZ2VyQnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5wYWdlLWhlYWRlcl9fYnVyZ2VyLWJ1dHRvblwiKTtcbiAgZnVuY3Rpb24gbWVudUhhbmRsZXIobWVudVNlbGVjdG9yKSB7XG4gICAgbWVudS5vbmNsaWNrID0gKGUpID0+IHtcbiAgICAgIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKFwic3RvcC1zY3JvbGxcIik7XG4gICAgICBtZW51LmNsYXNzTGlzdC50b2dnbGUoYCR7bWVudVNlbGVjdG9yfV9vcGVuYCk7XG4gICAgICBidXJnZXJCdXR0b24uY2xhc3NMaXN0LnRvZ2dsZShcInBhZ2UtaGVhZGVyX19idXJnZXItYnV0dG9uX29wZW5cIik7XG4gICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICBjb25zdCB0YXJnZXRJZCA9IGUudGFyZ2V0LmdldEF0dHJpYnV0ZShcImhyZWZcIik7XG4gICAgICBjb25zdCB0YXJnZXRFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcih0YXJnZXRJZCk7XG4gICAgICBpZiAodGFyZ2V0RWxlbWVudCkge1xuICAgICAgICB0YXJnZXRFbGVtZW50LnNjcm9sbEludG9WaWV3KHsgYmVoYXZpb3I6IFwic21vb3RoXCIgfSk7XG4gICAgICB9XG4gICAgfTtcbiAgfVxuXG4gIGV4cG9ydCBmdW5jdGlvbiBidXJnZXJNZW51SGFuZGxlcihtYWluV2lkdGgpIHtcbiAgYnVyZ2VyQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXG4gICAgXCJjbGlja1wiLFxuICAgIChlKSA9PiB7XG4gICAgICBjb25zb2xlLmxvZyhcItC60LvQuNC6INC90LAg0LrQvdC+0L/QutGDINCyINC+0LHRgNCw0LHQvtGC0YfQuNC60LUg0LrQvdC+0L/QutC4XCIpO1xuICAgICAgY29uc3QgbWVudSA9XG4gICAgICBtYWluV2lkdGggPD0gNjgwXG4gICAgICAgICAgPyBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnBhZ2UtaGVhZGVyX19tZW51XCIpXG4gICAgICAgICAgOiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnBhZ2UtaGVhZGVyX19uYXZcIik7XG4gICAgICAvL21lbnUuc3R5bGUudG9wID0gaGVhZGVySGVpZ2h0O1xuICAgICAgLyplLnN0b3BQcm9wYWdhdGlvbigpOyAvLyB0b2RvINGC0LDQutC+0LUg0YHQtdCx0LUg0YDQtdGI0LXQvdC40LUgKNC/0YDQuCDQutC70LjQutC1INC90LAg0LrQvdC+0L/QutGDINCy0LXRiNCw0YLRjCDQvtCx0YDQsNCx0L7RgtGH0LjQuiDQvdCwIGRvY3VtZW50INC4INGD0LbQtSDQsiDQvdC10Lwg0L7QsdGA0LDQsdCw0YLRi9Cy0LDRgtGMINC4INC60L3QvtC/0LrRgyDQuCDRgtCw0L8g0L/QviDRgdGB0YvQu9C60LUg0Lgg0L7QutC90YM/KVxuICAgIGJ1cmdlckJ1dHRvbi5jbGFzc0xpc3QudG9nZ2xlKFwicGFnZS1oZWFkZXJfX2J1cmdlci1idXR0b25fb3BlblwiKTsgLy8g0LLRi9C90LXRgdGC0Lgg0LIg0YTRg9C90LrRhtC40Y4gbWVudVRvZ2dsZVxuICAgIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGFzc0xpc3QudG9nZ2xlKFwic3RvcC1zY3JvbGxcIik7XG4gICAgbWVudS5jbGFzc0xpc3QudG9nZ2xlKGAke21lbnUuY2xhc3NMaXN0WzBdfV9vcGVuYCk7Ki9cbiAgICAgIC8vYnVyZ2VyQnV0dG9uLm9uY2xpY2sgPSBudWxsO1xuICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcbiAgICAgICAgXCJjbGlja1wiLFxuICAgICAgICAoZSkgPT4ge1xuICAgICAgICAgIGNvbnNvbGUubG9nKFwi0YHQvtCx0YvRgtC40LUgY2xpY2sg0LIg0L7QsdGA0LDQsdC+0YLRh9C40LrQtSDQtNC+0LrRg9C80LXQvdGC0LBcIik7XG4gICAgICAgICAgaWYgKFxuICAgICAgICAgICAgIWUudGFyZ2V0LmNsb3Nlc3QoXCIucGFnZS1oZWFkZXJfX2J1cmdlci1idXR0b25cIikgJiZcbiAgICAgICAgICAgICFtZW51LmNsYXNzTGlzdC5jb250YWlucyhgJHttZW51LmNsYXNzTGlzdFswXX1fb3BlbmApXG4gICAgICAgICAgKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcItC60LvQuNC6INC90LUg0L3QsCDQutC90L7Qv9C60YMg0L/RgNC4INC30LDQutGA0YvRgtC+0Lwg0LzQtdC90Y5cIik7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgfVxuICAgICAgICAgIC8vIHRvZG8g0L/RgNC4INC60LvQuNC60LUg0L/QvtGB0LvQtSDQvtGC0LrRgNGL0YLQuNGPINGB0YDQsNCx0LDRgtGL0LLQsNC10YIg0YHQviAy0LPQviDRgNCw0LfQsFxuICAgICAgICAgIGJ1cmdlckJ1dHRvbi5jbGFzc0xpc3QudG9nZ2xlKFwicGFnZS1oZWFkZXJfX2J1cmdlci1idXR0b25fb3BlblwiKTtcbiAgICAgICAgICBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xhc3NMaXN0LnRvZ2dsZShcInN0b3Atc2Nyb2xsXCIpO1xuICAgICAgICAgIG1lbnUuY2xhc3NMaXN0LnRvZ2dsZShgJHttZW51LmNsYXNzTGlzdFswXX1fb3BlbmApO1xuXG4gICAgICAgICAgaWYgKGUudGFyZ2V0LmNsb3Nlc3QoXCIucGFnZS1oZWFkZXJfX25hdi1saXN0XCIpKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcItC60LvQuNC6INC90LAg0YHRgdGL0LvQutGDINCyINC80LXQvdGOXCIpO1xuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgZG9jdW1lbnRcbiAgICAgICAgICAgICAgLnF1ZXJ5U2VsZWN0b3IoZS50YXJnZXQuZ2V0QXR0cmlidXRlKFwiaHJlZlwiKSlcbiAgICAgICAgICAgICAgLnNjcm9sbEludG9WaWV3KHsgYmVoYXZpb3I6IFwic21vb3RoXCIgfSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIC8veyBvbmNlOiB0cnVlIH1cbiAgICAgICk7XG4gICAgfSxcbiAgICB7IG9uY2U6IHRydWUgfVxuICApO1xuIH0iLCJjb25zdCBzbGlkZXNMaXN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5mZWVkYmFja19fbGlzdFwiKSxcbnNsaWRlcyA9IHNsaWRlc0xpc3QuY2hpbGRyZW4sXG5sZWZ0QnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5mZWVkYmFjayA+LnNsaWRlci1idXR0b25fbGVmdFwiKSxcbnJpZ2h0QnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5mZWVkYmFjayA+IC5zbGlkZXItYnV0dG9uX3JpZ2h0XCIpLFxudHJhbnNpdGlvblRpbWUgPSBcIjFzXCI7XG5cbmxldCBpbkFjdGlvbiA9IGZhbHNlO1xuXG5mdW5jdGlvbiBtb3ZMZWZ0KGFtb3VudFNsaWRlc09uTGlzdCwgb2Zmc2V0LCBnYXBWYWx1ZSkge1xuc2xpZGVzTGlzdC5vbnRyYW5zaXRpb25lbmQgPSAoKSA9PiB7XG4gIHNsaWRlc0xpc3Qub250cmFuc2l0aW9uZW5kID0gbnVsbDtcbiAgc2xpZGVzTGlzdC5zdHlsZS50cmFuc2l0aW9uID0gXCJub25lXCI7XG5cbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBhbW91bnRTbGlkZXNPbkxpc3Q7IGkrKykge1xuICAgIHNsaWRlc0xpc3QuYXBwZW5kKHNsaWRlc1swXSk7XG4gIH1cbiAgc2xpZGVzTGlzdC5zdHlsZS50cmFuc2Zvcm0gPSBgdHJhbnNsYXRlWCgkey1vZmZzZXR9cHgpYDtcblxuICBpbkFjdGlvbiA9IGZhbHNlO1xufTtcbnNsaWRlc0xpc3Quc3R5bGUudHJhbnNpdGlvbiA9IHRyYW5zaXRpb25UaW1lO1xuc2xpZGVzTGlzdC5zdHlsZS50cmFuc2Zvcm0gPSBgdHJhbnNsYXRlWCgkey1vZmZzZXQgKiAyIC0gZ2FwVmFsdWV9cHgpYDtcbn1cbmZ1bmN0aW9uIG1vdlJpZ2h0KGFtb3VudFNsaWRlc09uTGlzdCwgb2Zmc2V0LCBnYXBWYWx1ZSkge1xuc2xpZGVzTGlzdC5vbnRyYW5zaXRpb25lbmQgPSAoKSA9PiB7XG4gIHNsaWRlc0xpc3Qub250cmFuc2l0aW9uZW5kID0gbnVsbDtcbiAgc2xpZGVzTGlzdC5zdHlsZS50cmFuc2l0aW9uID0gXCJub25lXCI7XG5cbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBhbW91bnRTbGlkZXNPbkxpc3Q7IGkrKykge1xuICAgIHNsaWRlc0xpc3QucHJlcGVuZChzbGlkZXNMaXN0Lmxhc3RFbGVtZW50Q2hpbGQpO1xuICB9XG4gIHNsaWRlc0xpc3Quc3R5bGUudHJhbnNmb3JtID0gYHRyYW5zbGF0ZVgoJHstb2Zmc2V0fXB4KWA7XG5cbiAgaW5BY3Rpb24gPSBmYWxzZTtcbn07XG5cbnNsaWRlc0xpc3Quc3R5bGUudHJhbnNpdGlvbiA9IHRyYW5zaXRpb25UaW1lO1xuc2xpZGVzTGlzdC5zdHlsZS50cmFuc2Zvcm0gPSBgdHJhbnNsYXRlWCgke2dhcFZhbHVlfXB4KWA7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBmZWVkYmFja1NsaWRlckhhbmRsZXIoKSB7XG4vL2xldCBNdXRPYnNlcnZlciA9IG5ldyBNdXRhdGlvbk9ic2VydmVyICgoKSA9PiB7XG4gY29uc3Qgc2xpZGVXaWR0aCA9IHNsaWRlc1swXS5vZmZzZXRXaWR0aCxcbiAgc2xpZGVzTGlzdFdpZHRoID0gc2xpZGVzTGlzdC5vZmZzZXRXaWR0aCxcbiAgZ2FwVmFsdWUgPVxuICAgIChzbGlkZXNMaXN0V2lkdGggLyAxMDApICpcbiAgICBwYXJzZUZsb2F0KGdldENvbXB1dGVkU3R5bGUoc2xpZGVzTGlzdCkuZ2FwKSxcbiAgYW1vdW50U2xpZGVzT25MaXN0ID0gTWF0aC5mbG9vcihzbGlkZXNMaXN0V2lkdGggLyAoc2xpZGVXaWR0aCArIGdhcFZhbHVlKSksXG4gIC8qc2xpZGVMaXN0c0Ftb3VudCA9IE1hdGguY2VpbChzbGlkZXMubGVuZ3RoIC8gYW1vdW50U2xpZGVzT25MaXN0KSwqL1xuICBvZmZzZXQgPSA0ICogc2xpZGVXaWR0aCArIDMgKiBnYXBWYWx1ZTtcblxuICAvLyBJbml0aWFsaXplIHNsaWRlciBzdGFydCBwb3NpdGlvblxuc2xpZGVzTGlzdC5zdHlsZS50cmFuc2Zvcm0gPSBgdHJhbnNsYXRlWCgkey1vZmZzZXR9cHgpYDtcblxuICByaWdodEJ1dHRvbi5vbmNsaWNrID0gKCkgPT4geyAvLyB0b2RvINC/0L7QstGC0L7RgNGP0LXRgtGB0Y8g0L7RgiBoZXJvIHNsaWRlcj8g0YPQvdC40YTQuNGG0LjRgNC+0LLQsNGC0Ywg0YfQtdGA0LXQtyDQvtGC0LTQtdC70YzQvdGL0Lkg0LzQvtC00YPQu9GMP1xuICAgIGlmIChpbkFjdGlvbikgcmV0dXJuO1xuICAgIGluQWN0aW9uID0gdHJ1ZTtcbiAgICBtb3ZMZWZ0KGFtb3VudFNsaWRlc09uTGlzdCwgb2Zmc2V0LCBnYXBWYWx1ZSk7XG4gIH07XG4gIGxlZnRCdXR0b24ub25jbGljayA9ICgpID0+IHsgLy8gdG9kbyDQv9C+0LLRgtC+0YDRj9C10YLRgdGPINC+0YIgaGVybyBzbGlkZXI/INGD0L3QuNGE0LjRhtC40YDQvtCy0LDRgtGMINGH0LXRgNC10Lcg0L7RgtC00LXQu9GM0L3Ri9C5INC80L7QtNGD0LvRjD9cbiAgICBpZiAoaW5BY3Rpb24pIHJldHVybjtcbiAgICBpbkFjdGlvbiA9IHRydWU7XG4gICAgbW92UmlnaHQoYW1vdW50U2xpZGVzT25MaXN0LCBvZmZzZXQsIGdhcFZhbHVlKTtcbiAgfTtcbiAgLy99KVxuXG4gLy8gTXV0T2JzZXJ2ZXIub2JzZXJ2ZShkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQsIHthdHRyaWJ1dGVGaWx0ZXI6IFtcImNsYXNzXCJdfSk7XG59XG5cbiIsImNvbnN0IHNsaWRlc1dyYXBwZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnNsaWRlcl9fc2xpZGVzLWxpc3RcIiksXG4gIGFjdGl2U2xpZGVXaWR0aCA9IHBhcnNlSW50KFxuICAgIGdldENvbXB1dGVkU3R5bGUoXG4gICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmhlcm9fX3NsaWRlclwiKVxuICAgICkuZ3JpZFRlbXBsYXRlQ29sdW1ucy5zcGxpdChcIiBcIilbMF0sXG4gICAgMTBcbiAgKSxcbiAgZ2FwVmFsdWUgPSBwYXJzZUludChnZXRDb21wdXRlZFN0eWxlKHNsaWRlc1dyYXBwZXIpLmdhcCksXG4gIHNsaWRlcyA9IHNsaWRlc1dyYXBwZXIuY2hpbGRyZW4sXG4gIHNsaWRlV2lkdGggPSBzbGlkZXNbMF0ub2Zmc2V0V2lkdGgsXG4gIGluaXRpYWxPZmZzZXQgPSBzbGlkZVdpZHRoICogMiArIGdhcFZhbHVlIC0gYWN0aXZTbGlkZVdpZHRoLFxuICBvZmZzZXQgPSBzbGlkZVdpZHRoICsgZ2FwVmFsdWUsXG4gIHRyYW5zaXRpb25UaW1lID0gXCIwLjNzXCIsXG4gIHNsaWRlU2NhbGUgPVxuICAgIFwidHJhbnNsYXRlKC0xMi41JSwgY2FsYygxMi41JSAtIDE2cHgpKSBzY2FsZSgxLjI1KVwiLFxuICBsZWZ0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5zbGlkZXItYnV0dG9uX2xlZnRcIiksXG4gIHJpZ2h0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5zbGlkZXItYnV0dG9uX3JpZ2h0XCIpO1xuXG5sZXQgaW5BY3Rpb24gPSBmYWxzZTtcblxuZnVuY3Rpb24gbW92TGVmdChzbGlkZXNXcmFwcGVyLCBvZmZzZXQpIHtcbiAgc2xpZGVzV3JhcHBlci5vbnRyYW5zaXRpb25lbmQgPSAoKSA9PiB7XG4gICAgc2xpZGVzV3JhcHBlci5vbnRyYW5zaXRpb25lbmQgPSBudWxsO1xuICAgIHNsaWRlc1dyYXBwZXIuc3R5bGUudHJhbnNpdGlvbiA9IFwibm9uZVwiO1xuICAgIHNsaWRlc1swXS5yZW1vdmVBdHRyaWJ1dGUoXCJzdHlsZVwiKTtcblxuICAgIHNsaWRlc1dyYXBwZXIuYXBwZW5kKHNsaWRlc1swXSk7XG4gICAgc2xpZGVzV3JhcHBlci5zdHlsZS50cmFuc2Zvcm0gPSBgdHJhbnNsYXRlWCgkey1pbml0aWFsT2Zmc2V0fXB4KWA7XG5cbiAgICBpbkFjdGlvbiA9IGZhbHNlO1xuICB9O1xuICBzbGlkZXNXcmFwcGVyLnN0eWxlLnRyYW5zaXRpb24gPSB0cmFuc2l0aW9uVGltZTsgLy90b2RvINC30LDQtNCw0LLQsNGC0YwgdHJhbnNpdGlvbiDRh9C10YDQtdC3INC30LDQv9GP0YLRg9GOINCy0YHQtdC8INGB0YDQsNC30YM/XG4gIHNsaWRlc1dyYXBwZXIuc3R5bGUudHJhbnNmb3JtID0gYHRyYW5zbGF0ZVgoJHstb2Zmc2V0IC0gaW5pdGlhbE9mZnNldH1weClgO1xuXG4gIHNsaWRlc1sxXS5zdHlsZS50cmFuc2l0aW9uID0gdHJhbnNpdGlvblRpbWU7XG4gIHNsaWRlc1sxXS5zdHlsZS5vcGFjaXR5ID0gMDtcbiAgc2xpZGVzWzFdLnN0eWxlLnRyYW5zZm9ybSA9IFwidHJhbnNsYXRlKDApXCI7IC8vIHNjYWxlKDAuMylcblxuICBzbGlkZXNbMl0uc3R5bGUudHJhbnNpdGlvbiA9IHRyYW5zaXRpb25UaW1lO1xuICBzbGlkZXNbMl0uc3R5bGUudHJhbnNmb3JtID0gc2xpZGVTY2FsZTtcbiAgc2xpZGVzWzJdLnN0eWxlLnRyYW5zaXRpb25UaW1pbmdGdW5jdGlvbiA9IFwiY3ViaWMtYmV6aWVyKC43MiwuMDcsLjk1LC43KVwiOyAvLy43NSwwLDEsLjAyIGVhc2UtaW5cbn1cbmZ1bmN0aW9uIG1vdlJpZ2h0KHNsaWRlc1dyYXBwZXIsIG9mZnNldCkge1xuICBzbGlkZXNXcmFwcGVyLm9udHJhbnNpdGlvbmVuZCA9ICgpID0+IHtcbiAgICBzbGlkZXNXcmFwcGVyLm9udHJhbnNpdGlvbmVuZCA9IG51bGw7XG4gICAgc2xpZGVzV3JhcHBlci5zdHlsZS50cmFuc2l0aW9uID0gXCJub25lXCI7XG4gICAgc2xpZGVzWzFdLnJlbW92ZUF0dHJpYnV0ZShcInN0eWxlXCIpO1xuXG4gICAgc2xpZGVzV3JhcHBlci5sYXN0RWxlbWVudENoaWxkLnN0eWxlLm9wYWNpdHkgPSAwO1xuICAgIHNsaWRlc1dyYXBwZXIucHJlcGVuZChzbGlkZXNXcmFwcGVyLmxhc3RFbGVtZW50Q2hpbGQpO1xuICAgIHNsaWRlc1dyYXBwZXIuc3R5bGUudHJhbnNmb3JtID0gYHRyYW5zbGF0ZVgoJHstaW5pdGlhbE9mZnNldH1weClgO1xuXG4gICAgaW5BY3Rpb24gPSBmYWxzZTtcbiAgfTtcbiAgc2xpZGVzV3JhcHBlci5zdHlsZS50cmFuc2l0aW9uID0gdHJhbnNpdGlvblRpbWU7XG4gIHNsaWRlc1dyYXBwZXIuc3R5bGUudHJhbnNmb3JtID0gYHRyYW5zbGF0ZVgoJHtvZmZzZXQgLSBpbml0aWFsT2Zmc2V0fXB4KWA7XG5cbiAgc2xpZGVzWzBdLnN0eWxlLnRyYW5zaXRpb24gPSB0cmFuc2l0aW9uVGltZTtcbiAgc2xpZGVzWzBdLnN0eWxlLm9wYWNpdHkgPSAxO1xuICBzbGlkZXNbMF0uc3R5bGUudHJhbnNmb3JtID0gc2xpZGVTY2FsZTtcbiAgc2xpZGVzWzBdLnN0eWxlLnRyYW5zaXRpb25UaW1pbmdGdW5jdGlvbiA9IFwiZWFzZS1pblwiO1xuXG4gIHNsaWRlc1sxXS5zdHlsZS50cmFuc2l0aW9uID0gdHJhbnNpdGlvblRpbWU7XG4gIHNsaWRlc1sxXS5zdHlsZS50cmFuc2Zvcm0gPSBcInRyYW5zbGF0ZSgwKSBzY2FsZSgxKVwiO1xuICBzbGlkZXNbMV0uc3R5bGUudHJhbnNpdGlvblRpbWluZ0Z1bmN0aW9uID0gXCJjdWJpYy1iZXppZXIoMCwuNzUsLjAyLDEpXCI7IC8vMCwuNzUsLjAyLDEgIC8vIDAsMCwuMDIsMSAvLyAuNzUsMCwxLC4wMlxufVxuXG5leHBvcnQgZnVuY3Rpb24gaGVyb1NsaWRlckhhbmRsZXIoKSB7XG4gIC8vIEluaXRpYWxpemUgc2xpZGVyIHN0YXJ0IHBvc2l0aW9uXG4gIHNsaWRlc1dyYXBwZXIuc3R5bGUudHJhbnNmb3JtID0gYHRyYW5zbGF0ZVgoJHstaW5pdGlhbE9mZnNldH1weClgO1xuICBzbGlkZXNbMF0uc3R5bGUub3BhY2l0eSA9IDA7XG4gIHNsaWRlc1sxXS5zdHlsZS50cmFuc2Zvcm0gPSBzbGlkZVNjYWxlO1xuXG4gIGxlZnQub25jbGljayA9ICgpID0+IHtcbiAgICBpZiAoaW5BY3Rpb24pIHJldHVybjtcbiAgICBpbkFjdGlvbiA9IHRydWU7XG4gICAgbW92UmlnaHQoc2xpZGVzV3JhcHBlciwgb2Zmc2V0KTtcbiAgfTtcbiAgcmlnaHQub25jbGljayA9ICgpID0+IHtcbiAgICBpZiAoaW5BY3Rpb24pIHJldHVybjtcbiAgICBpbkFjdGlvbiA9IHRydWU7XG4gICAgbW92TGVmdChzbGlkZXNXcmFwcGVyLCBvZmZzZXQpO1xuICB9O1xufVxuIiwiZnVuY3Rpb24gc3dhcFBsYWNlaG9sZGVyKHBpY3R1cmUpIHtcbiAgY29uc3QgaW1nID0gcGljdHVyZS5xdWVyeVNlbGVjdG9yKFwiaW1nXCIpO1xuICBjb25zdCBzb3VyY2VzID0gcGljdHVyZS5xdWVyeVNlbGVjdG9yQWxsKFwic291cmNlXCIpO1xuXG4gIGltZy5vbmxvYWQgPSAoKSA9PiB7XG4gICAgcGljdHVyZS5kYXRhc2V0LmxvYWRlZCA9IHRydWU7XG4gICAgLy9pbWcuIHJlbW92ZUF0dHJpYnV0ZShcIlwiKVxuICB9O1xuICBpbWcub25lcnJvciA9ICgpID0+IHtcbiAgICBwaWN0dXJlLmRhdGFzZXQubG9hZGVkID0gZmFsc2U7XG4gIH07XG4gIHNvdXJjZXMuZm9yRWFjaCgoc291cmNlKSA9PiB7XG4gICAgc291cmNlLnNyY3NldCA9IHNvdXJjZS5kYXRhc2V0LnNyY3NldDtcbiAgICBzb3VyY2Uuc2l6ZXMgPSBzb3VyY2UuZGF0YXNldC5zaXplcztcbiAgfSk7XG4gIGltZy5zcmNzZXQgPSBpbWcuZGF0YXNldC5zcmNzZXQ7XG4gIGltZy5zaXplcyA9IGltZy5kYXRhc2V0LnNpemVzO1xuICAvL2ltZy5zcmMgPSBpbWcuZGF0YXNldC5zcmNzZXQubWF0Y2goLywgKC4qKSAuKyQvKVsxXTsgLy8gdG9kbyDQv9GA0Lgg0LXQtNC40L3RgdGC0LLQtdC90L3QvtC8INCy0LDRgNC40LDQvdGC0LUg0LLRi9Cx0YDQsNGB0YvQstCw0LXRgiBudWxsXG4gIGNvbnN0IHNyY3NldEFyciA9IGltZy5kYXRhc2V0LnNyY3NldC5zcGxpdChcIiBcIik7XG4gIGltZy5zcmMgPSBzcmNzZXRBcnJbc3Jjc2V0QXJyLmxlbmd0aCAtIDJdO1xuICAvL2NvbnNvbGUubG9nKHNyY3NldEFyciwgc3Jjc2V0QXJyW3NyY3NldEFyci5sZW5ndGggLSAyXSk7XG59XG5cbmNvbnN0IHBpY3R1cmVzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcInBpY3R1cmVcIik7XG5cbmNvbnN0IGNhbGxiYWNrID0gKGVudHJpZXMsIG9ic2VydmVyKSA9PiB7XG4gIGVudHJpZXMuZm9yRWFjaCgoZW50cnkpID0+IHtcbiAgICBpZiAoZW50cnkuaXNJbnRlcnNlY3RpbmcpIHtcbiAgICAgIHN3YXBQbGFjZWhvbGRlcihlbnRyeS50YXJnZXQpO1xuICAgICAgLy9jb25zb2xlLmxvZyhlbnRyeS50YXJnZXQpO1xuICAgICAgb2JzZXJ2ZXIudW5vYnNlcnZlKGVudHJ5LnRhcmdldCk7XG4gICAgfVxuICB9KTtcbn07XG5cbmV4cG9ydCBmdW5jdGlvbiBpbWdUaHVtYm5haWxzSGFuZGxlcigpIHtcbiAgY29uc3Qgb2JzZXJ2ZXIgPSBuZXcgSW50ZXJzZWN0aW9uT2JzZXJ2ZXIoY2FsbGJhY2spO1xuXG5waWN0dXJlcy5mb3JFYWNoKChwaWN0dXJlKSA9PiB7XG4gIG9ic2VydmVyLm9ic2VydmUocGljdHVyZSk7XG59KTtcbn0iLCJpbXBvcnQgeyBnZXRNYWluV2lkdGgsIHNjcm9sbERhdGEsIGluVGFyZ2V0IH0gZnJvbSBcIi4vdXRpbHMuanNcIjtcbmltcG9ydCB7IHRocm90dGxlIH0gZnJvbSBcIi4vdXRpbHMuanNcIjtcbmltcG9ydCB7IGFuaW1hdGVFbGVtZW50cyB9IGZyb20gXCIuL2FuaW1hdGlvbnMuanNcIjtcbmltcG9ydCB7IGFkZEN1cnZlZFRyYWNrIH0gZnJvbSBcIi4vc3RlcHMtdHJhY2svY3VydmVkLXRyYWNrLmpzXCI7XG5pbXBvcnQgeyBhZGRTdHJhaWdodFRyYWNrIH0gZnJvbSBcIi4vc3RlcHMtdHJhY2svc3RyYWlnaHQtdHJhY2suanNcIjtcbmltcG9ydCB7IGltZ1RodW1ibmFpbHNIYW5kbGVyIH0gZnJvbSBcIi4vaW1nLXRodW1ibmFpbHMuanNcIjtcbmltcG9ydCB7IGJ1cmdlck1lbnVIYW5kbGVyIH0gZnJvbSBcIi4vYnVyZ2VyLW1lbnUuanNcIjtcbmltcG9ydCB7IGhlcm9TbGlkZXJIYW5kbGVyIH0gZnJvbSBcIi4vaGVyby1zbGlkZXIuanNcIjtcbmltcG9ydCB7IGZlZWRiYWNrU2xpZGVySGFuZGxlciB9IGZyb20gXCIuL2ZlZWRiYWNrLXNsaWRlci5qc1wiO1xuaW1wb3J0IHsgc3RlcHNMaW5lIH0gZnJvbSBcIi4vc3RlcHMtdHJhY2svc3RlcHMtbGluZS12YXJzLmpzXCI7XG5pbXBvcnQgeyBhbmltYXRlQ3VydmVkU3RlcHNUcmFjayB9IGZyb20gXCIuL3N0ZXBzLXRyYWNrL2N1cnZlZC10cmFjay5qc1wiO1xuaW1wb3J0IHsgYW5pbWF0ZVN0cmFpZ2h0U3RlcHNUcmFjayB9IGZyb20gXCIuL3N0ZXBzLXRyYWNrL3N0cmFpZ2h0LXRyYWNrLmpzXCI7XG5cbmNvbnN0IG1haW5XaWR0aCA9IGdldE1haW5XaWR0aCgpO1xuXG5pbWdUaHVtYm5haWxzSGFuZGxlcigpO1xuXG53aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcImxvYWRcIiwgKCkgPT4ge1xuICBjb25zdCBwcmVsb2FkZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnByZWxvYWRlclwiKTtcblxuICBwcmVsb2FkZXIub250cmFuc2l0aW9uZW5kID0gKCkgPT4ge1xuICAgIHByZWxvYWRlci5vbnRyYW5zaXRpb25lbmQgPSBudWxsO1xuICAgIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKFwic3RvcC1zY3JvbGxcIik7XG4gICAgcHJlbG9hZGVyLnJlbW92ZSgpO1xuXG4gICAgaWYgKG1haW5XaWR0aCA8PSAxMzAwKSB7XG4gICAgICBhZGRTdHJhaWdodFRyYWNrKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGFkZEN1cnZlZFRyYWNrKCk7XG4gICAgfVxuICAgIGlmIChtYWluV2lkdGggPD0gMTI1MCkge1xuICAgICAgYnVyZ2VyTWVudUhhbmRsZXIobWFpbldpZHRoKTtcbiAgICB9XG4gICAgaWYgKG1haW5XaWR0aCA+IDEyMDApIHtcbiAgICAgIGZlZWRiYWNrU2xpZGVySGFuZGxlcigpO1xuICAgIH1cbiAgICBpZiAobWFpbldpZHRoID4gODAwKSB7XG4gICAgICBoZXJvU2xpZGVySGFuZGxlcigpO1xuICAgIH1cblxuICAgIC8qY29uc3QgZXIgPSAoKSA9PiB7XG4gICAgICBjb25zb2xlLmxvZyhcImVycm9yXCIpO1xuICAgIH07XG5cbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcInNjcm9sbFwiLCAoKSA9PiB7XG4gICAgICBlcigpO1xuICAgIH0pOyovXG5cbiAgICAvLyDQmNC90LjRhtC40LDQu9C40LfQsNGG0LjRjyDQsNC90LjQvNCw0YbQuNC5XG4gICAgY29uc3QgYW5pbWF0aW9uRWxlbWVudHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLmFuaW1hdGVcIik7IC8vIHRvZG8/INC/0L7QvNC10L3Rj9GC0Ywg0L3QsCBieWNsYXNzbmFtZSA6bm90IHNjcm9sbGVkINGH0YLQvtCx0Ysg0LrQvtC70LvQtdC60YbQuNGPINC+0LHQvdC+0LLQu9GP0LvQsNGB0Ywg0YHQsNC80LA/XG4gICAgY29uc3QgdGFyZ2V0UG9zaXRpb24gPSBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xpZW50SGVpZ2h0ICogMC44O1xuXG4gICAgYW5pbWF0ZUVsZW1lbnRzKGFuaW1hdGlvbkVsZW1lbnRzLCB0YXJnZXRQb3NpdGlvbik7XG5cbiAgICBjb25zdCBzdGVwc1RyYWNrQW5pbWF0ZUZ1bmN0aW9uID1cbiAgICBtYWluV2lkdGggPD0gMTMwMFxuICAgICAgPyBhbmltYXRlU3RyYWlnaHRTdGVwc1RyYWNrXG4gICAgICA6IGFuaW1hdGVDdXJ2ZWRTdGVwc1RyYWNrO1xuXG4gICAgY29uc3QgdGhyb3R0bGVkU2Nyb2xsQW5pbWF0aW9uSGFuZGxlciA9IHRocm90dGxlKCgpID0+IHtcblxuICAgICAgY29uc3Qgc2Nyb2xsID0gc2Nyb2xsRGF0YSgpO1xuICAgICAgaWYoc2Nyb2xsLmRpcmVjdGlvbiA9PT0gXCJkb3duXCIpe1xuICAgICAgICB0aHJvdHRsZShhbmltYXRlRWxlbWVudHMoXG4gICAgICAgICAgYW5pbWF0aW9uRWxlbWVudHMsXG4gICAgICAgICAgdGFyZ2V0UG9zaXRpb24pLCAxMDApXG4gICAgICB9XG4gICAgICBpZihpblRhcmdldChkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmxpbmUtc3RhcnRcIiksIHRhcmdldFBvc2l0aW9uKSl7XG4gICAgICAgIGNvbnNvbGUubG9nKFwi0KHRgNCw0LHQvtGC0LDQuyBzdGFydC1saXRlXCIpO1xuICAgICAgICBzdGVwc1RyYWNrQW5pbWF0ZUZ1bmN0aW9uKHN0ZXBzTGluZS5zdGFydFkgLSB0YXJnZXRQb3NpdGlvbiwgc3RlcHNMaW5lLnN0YXJ0WSxcbiAgICAgICAgICBzdGVwc0xpbmUuZW5kWSxcbiAgICAgICAgICBzdGVwc0xpbmUucGF0aExlbmd0aCk7XG4gICAgICB9XG4gICAgfSwgNTApO1xuICAgIFxuICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJzY3JvbGxcIiwgdGhyb3R0bGVkU2Nyb2xsQW5pbWF0aW9uSGFuZGxlcik7XG5cbiAgICAvL2xldCBsYXN0U2Nyb2xsUG9zaXRpb24gPSAwO1xuICAgIC8qY29uc3QgdGhyb3R0bGVkQW5pbWF0ZUVsZW1lbnRzID0gdGhyb3R0bGUoYW5pbWF0ZUVsZW1lbnRzLCAyMDApOyovXG5cbiAgICAvKmNvbnN0IHRocm90dGxlZEFuaW1hdGVFbGVtZW50cyA9IHRocm90dGxlKCgpID0+IHtcbiAgICAgIGNvbnNvbGUubG9nKHNjcm9sbERhdGEoKSk7XG4gICAgICAvLyB0b2RvINCy0YvQvdC10YHRgtC4INC/0YDQvtCy0LXRgNC60YMg0L3QsNC/0YDQsNCy0LvQtdC90LjRjyDRgdC60YDQvtC70LvQsCwg0YLRg9GCINC00L7Qu9C20L3QsCDQsdGL0YLRjCDRgtC+0LvRjNC60L4g0YTRg9C90LrRhtC40Y9cbiAgICAgIGNvbnN0IGN1cnJlbnRTY3JvbGxQb3NpdGlvbiA9IHdpbmRvdy5zY3JvbGxZO1xuICAgICAgaWYgKGN1cnJlbnRTY3JvbGxQb3NpdGlvbiA+IGxhc3RTY3JvbGxQb3NpdGlvbikge1xuICAgICAgICBhbmltYXRlRWxlbWVudHMoXG4gICAgICAgICAgYW5pbWF0aW9uRWxlbWVudHMsXG4gICAgICAgICAgdGFyZ2V0UG9zaXRpb24sXG4gICAgICAgICAgdGhyb3R0bGVkQW5pbWF0ZUVsZW1lbnRzXG4gICAgICAgICk7XG4gICAgICB9XG4gICAgICBsYXN0U2Nyb2xsUG9zaXRpb24gPSBjdXJyZW50U2Nyb2xsUG9zaXRpb247XG4gICAgfSwgMTAwKTtcblxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwic2Nyb2xsXCIsIHRocm90dGxlZEFuaW1hdGVFbGVtZW50cyk7XG4gICAgKi9cbiAgfTtcbiAgcHJlbG9hZGVyLmNsYXNzTGlzdC5hZGQoXCJwcmVsb2FkZXJfaGlkZVwiKTsgLy90b2RvINC/0LXRgNC10L3QtdGB0YLQuCDQv9C+0YHQu9C1IHRyYW5zaXRpb25lbmQ/INC/0L7RgtC+0LzRgyDRh9GC0L4g0YHQvdCw0YfQsNC70LAg0LfQsNC/0YPRgdC60LDQtdC8INCw0L3QuNC80LDRhtC40Y4g0LAg0L/QvtGC0L7QvCDRgtC+0LvRjNC60L4g0LTQvtCx0LDQstC70Y/QtdC8INGB0L7QsdGL0YLQuNC1P1xufSk7XG5cbi8vd2luZG93Lm9ubG9hZCA9IDtcbiIsImltcG9ydCB7IGFkZFRyaWFuZ2xlLCBtb3ZlVHJpYW5nbGVBbG9uZ0N1cnZlIH0gZnJvbSBcIi4vdHJpYW5nbGUuanNcIjtcbmltcG9ydCB7IHN0ZXBzTGluZSB9IGZyb20gXCIuL3N0ZXBzLWxpbmUtdmFycy5qc1wiO1xuZXhwb3J0IGZ1bmN0aW9uIGFkZEN1cnZlZFRyYWNrKCkge1xuICAgIGNvbnN0IHN0ZXBzU2VjdGlvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuc3RlcHNcIik7XG4gICAgY29uc3QgaW5pdGlhbFggPSBzdGVwc1NlY3Rpb24uZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkueDtcbiAgICBjb25zdCBpbml0aWFsWSA9IHN0ZXBzU2VjdGlvbi5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS55ICsgd2luZG93LnNjcm9sbFk7XG4gICAgY29uc3QgY29udHJvbFBvaW50T2Zmc2V0WSA9IDUzMztcbiAgICBjb25zdCBtYXJrZXJzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5tYXJrZXJcIik7XG4gICAgY29uc3QgbWFya2Vyc0NlbnRlckNvb3JkcyA9IFtdO1xuICBcbiAgICBtYXJrZXJzLmZvckVhY2goKG1hcmtlcikgPT4ge1xuICAgICAgLy8gdG9kbyDQv9C10YDQtdC00LDQstCw0YLRjCDRg9C20LUgZ2V0Qm91bmRpbmdDbGllbnRSZWN0INGH0YLQvtCx0Ysg0LrQsNC20LTRi9C5INGA0LDQtyDQvdC1INCy0YvQt9GL0LLQsNGC0YxcbiAgICAgIGNvbnN0IG1hcmtlclJlY3QgPSBtYXJrZXIuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgICBsZXQgY2VudGVyQ29vcmRzID0ge307XG4gIFxuICAgICAgY2VudGVyQ29vcmRzLnggPSBtYXJrZXJSZWN0LnggLSBpbml0aWFsWCArIG1hcmtlclJlY3Qud2lkdGggLyAyO1xuICAgICAgY2VudGVyQ29vcmRzLnkgPVxuICAgICAgICBtYXJrZXJSZWN0LnkgLSBpbml0aWFsWSArIG1hcmtlclJlY3QuaGVpZ2h0IC8gMiArIHdpbmRvdy5zY3JvbGxZO1xuICBcbiAgICAgIG1hcmtlcnNDZW50ZXJDb29yZHMucHVzaChjZW50ZXJDb29yZHMpOyAvLyB0b2RvINC/0YPRiNC40YLRjCDRgdGA0LDQt9GDIHt9INCx0LXQtyDRgdC+0LfQtNCw0L3QuNGPINC/0LXRgNC10LzQtdC90L3Ri9GFXG4gICAgfSk7XG4gICAgc3RlcHNMaW5lLnN0YXJ0WSA9IG1hcmtlcnNDZW50ZXJDb29yZHNbMF0ueSArIGluaXRpYWxZO1xuICAgIHN0ZXBzTGluZS5lbmRZID1cbiAgICAgIG1hcmtlcnNDZW50ZXJDb29yZHNbbWFya2Vyc0NlbnRlckNvb3Jkcy5sZW5ndGggLSAxXS55ICsgaW5pdGlhbFk7XG4gIFxuICAgIGNvbnN0IE5Tc3RyaW5nID0gXCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiO1xuICAgIGNvbnN0IHN2ZyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnROUyhOU3N0cmluZywgXCJzdmdcIik7XG4gICAgc3ZnLnNldEF0dHJpYnV0ZShcImNsYXNzXCIsIFwic3RlcHNfX3RyYWNrXCIpO1xuICAgIGNvbnN0IHBhdGggPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50TlMoTlNzdHJpbmcsIFwicGF0aFwiKTtcbiAgICBwYXRoLnNldEF0dHJpYnV0ZShcImNsYXNzXCIsIFwic3RlcHNfX21haW4tdHJhY2tcIik7XG4gICAgbGV0IGQgPSBgTSAke21hcmtlcnNDZW50ZXJDb29yZHNbMF0ueH0gJHttYXJrZXJzQ2VudGVyQ29vcmRzWzBdLnl9YDtcbiAgICBmb3IgKGxldCBpID0gMTsgaSA8IG1hcmtlcnNDZW50ZXJDb29yZHMubGVuZ3RoOyBpKyspIHtcbiAgICAgIGQgKz0gYEMke21hcmtlcnNDZW50ZXJDb29yZHNbaSAtIDFdLnh9ICR7XG4gICAgICAgIG1hcmtlcnNDZW50ZXJDb29yZHNbaSAtIDFdLnkgKyBjb250cm9sUG9pbnRPZmZzZXRZXG4gICAgICB9ICR7bWFya2Vyc0NlbnRlckNvb3Jkc1tpXS54fSAke1xuICAgICAgICBtYXJrZXJzQ2VudGVyQ29vcmRzW2ldLnkgLSBjb250cm9sUG9pbnRPZmZzZXRZXG4gICAgICB9ICR7bWFya2Vyc0NlbnRlckNvb3Jkc1tpXS54fSAke21hcmtlcnNDZW50ZXJDb29yZHNbaV0ueX1gO1xuICAgIH1cbiAgICBwYXRoLnNldEF0dHJpYnV0ZShcImRcIiwgZCk7XG4gICAgcGF0aC5zZXRBdHRyaWJ1dGUoXCJmaWxsXCIsIFwibm9uZVwiKTtcbiAgICBzdGVwc0xpbmUucGF0aExlbmd0aCA9IE1hdGgucm91bmQocGF0aC5nZXRUb3RhbExlbmd0aCgpKTtcbiAgICBwYXRoLnNldEF0dHJpYnV0ZShcInN0cm9rZS1kYXNoYXJyYXlcIiwgc3RlcHNMaW5lLnBhdGhMZW5ndGgpO1xuICAgIHBhdGguc2V0QXR0cmlidXRlKFwic3Ryb2tlLWRhc2hvZmZzZXRcIiwgc3RlcHNMaW5lLnBhdGhMZW5ndGgpO1xuICAgIHN2Zy5hcHBlbmRDaGlsZChwYXRoKTtcbiAgICBzdmcuYXBwZW5kQ2hpbGQoXG4gICAgICBhZGRUcmlhbmdsZShcbiAgICAgICAgbWFya2Vyc0NlbnRlckNvb3Jkc1swXS54LFxuICAgICAgICBtYXJrZXJzQ2VudGVyQ29vcmRzWzBdLnksXG4gICAgICAgIDE1IC8qLCBzdmcqL1xuICAgICAgKVxuICAgICk7XG4gIFxuICAgIHN0ZXBzU2VjdGlvbi5hcHBlbmRDaGlsZChzdmcpO1xuICB9XG5cbiAgZXhwb3J0IGZ1bmN0aW9uIGFuaW1hdGVDdXJ2ZWRTdGVwc1RyYWNrKFxuICAgIHN0YXJ0U2Nyb2xsUG9zaXRpb24sXG4gICAgc3RhcnRQb2ludCxcbiAgICBlbmRQb2ludCxcbiAgICBwYXRoTGVuZ2h0LFxuICAgIGhhbmRsZXJGdW5jXG4gICkge1xuICAgIGNvbnN0IHRyYWNrUGF0aCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuc3RlcHNfX21haW4tdHJhY2tcIik7XG4gICAgY29uc3QgbGluZUhlaWdodCA9IGVuZFBvaW50IC0gc3RhcnRQb2ludDtcbiAgICBjb25zdCBsaW5lU2Nyb2xsUHJvZ3JlcyA9ICh3aW5kb3cuc2Nyb2xsWSAtIHN0YXJ0U2Nyb2xsUG9zaXRpb24pIC8gbGluZUhlaWdodDtcbiAgICBcbiAgICBjb25zb2xlLmxvZyhcIndpbmRvdy5zY3JvbGxZIFwiICsgd2luZG93LnNjcm9sbFkpO1xuICAgIGNvbnNvbGUubG9nKFwic3RhcnRTY3JvbGxQb3NpdGlvbiBcIiArIHN0YXJ0U2Nyb2xsUG9zaXRpb24pO1xuICAgIGNvbnNvbGUubG9nKFwibGluZUhlaWdodCBcIiArIGxpbmVIZWlnaHQpO1xuICAgIGNvbnNvbGUubG9nKFwibGluZVNjcm9sbFByb2dyZXMgXCIgKyBsaW5lU2Nyb2xsUHJvZ3Jlcyk7XG4gICAgY29uc29sZS5sb2coXCItLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXCIpO1xuICAgIGxldCBvZmZzZXQgPSBwYXRoTGVuZ2h0ICogKDEgLSBsaW5lU2Nyb2xsUHJvZ3Jlcyk7XG4gIFxuICAgIGlmIChvZmZzZXQgPCAwKSB7XG4gICAgICBvZmZzZXQgPSAwO1xuICAgICAgLy93aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcihcInNjcm9sbFwiLCBoYW5kbGVyRnVuYyk7XG4gICAgfVxuICAgIHRyYWNrUGF0aC5zZXRBdHRyaWJ1dGUoXCJzdHJva2UtZGFzaG9mZnNldFwiLCBvZmZzZXQpO1xuICAgIG1vdmVUcmlhbmdsZUFsb25nQ3VydmUoXG4gICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnN0ZXBzX190cmFjay1hcnJvd1wiKSxcbiAgICAgIHRyYWNrUGF0aCxcbiAgICAgIHBhdGhMZW5naHQsXG4gICAgICBvZmZzZXRcbiAgICApO1xuICB9IiwiZXhwb3J0IGxldCBzdGVwc0xpbmUgPSB7c3RhcnRZOiBcIlwiLCBlbmRZOlwiXCIsIHBhdGhMZW5ndGg6XCJcIn07IiwiaW1wb3J0IHsgYWRkVHJpYW5nbGUsIG1vdmVUcmlhbmdsZUFsb25nU3RyYWlnaHQgfSBmcm9tIFwiLi90cmlhbmdsZS5qc1wiO1xuaW1wb3J0IHsgc3RlcHNMaW5lIH0gZnJvbSBcIi4vc3RlcHMtbGluZS12YXJzLmpzXCI7XG5leHBvcnQgZnVuY3Rpb24gYWRkU3RyYWlnaHRUcmFjaygpIHtcbiAgICBjb25zdCBzdGVwc1NlY3Rpb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnN0ZXBzXCIpO1xuICAgIGNvbnN0IGdhcCA9IHBhcnNlSW50KFxuICAgICAgd2luZG93XG4gICAgICAgIC5nZXRDb21wdXRlZFN0eWxlKHN0ZXBzU2VjdGlvbi5xdWVyeVNlbGVjdG9yKFwiLnN0ZXBzX19saXN0XCIpKVxuICAgICAgICAuZ2V0UHJvcGVydHlWYWx1ZShcImdhcFwiKVxuICAgICk7XG4gICAgY29uc3QgaW5pdGlhbFggPSBzdGVwc1NlY3Rpb24uZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkueDtcbiAgICBjb25zdCBpbml0aWFsWSA9IHN0ZXBzU2VjdGlvbi5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS55ICsgd2luZG93LnNjcm9sbFk7XG4gICAgLy9jb25zb2xlLmxvZyhzdGVwc1NlY3Rpb24uZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCksIHdpbmRvdy5zY3JvbGxZKTtcbiAgICBsZXQgbWFya2Vyc1JlY3QgPSBbXTtcbiAgICBjb25zdCBtYXJrZXJzQ29vcmRzID0gW107XG4gIFxuICAgIGNvbnN0IGZpcnN0TWFya2VyUmVjdCA9IGRvY3VtZW50XG4gICAgICAucXVlcnlTZWxlY3RvcihcIi5tYXJrZXJcIilcbiAgICAgIC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICBtYXJrZXJzUmVjdC5wdXNoKGZpcnN0TWFya2VyUmVjdCk7XG4gIFxuICAgIGNvbnN0IGxpbmVQYWRkaW5nID0gZmlyc3RNYXJrZXJSZWN0LmhlaWdodCAvIDIgLSA1OyAvLyB0b2RvINC+0YLQvdC40LzQsNC90LjQtSA1INGD0LHQuNGA0LDQtdGCINC30LDQt9C+0YAg0LzQtdC20LTRgyDQu9C40L3QuNC10Lkg0Lgg0LzQsNGA0LrQtdGA0L7QvCAo0LrQvtGB0YLRi9C70YzQvdC+KVxuICBcbiAgICAvKmNvbnN0IGZpcnN0TWFya2VyQ29vcmRzID0ge1xuICAgICAgeDogZmlyc3RNYXJrZXJSZWN0LnggLSBpbml0aWFsWCArIGZpcnN0TWFya2VyUmVjdC53aWR0aCAvIDIsXG4gICAgICB5OiBmaXJzdE1hcmtlclJlY3QueSAtIGluaXRpYWxZLFxuICAgIH07XG4gICAgZmlyc3RNYXJrZXJDb29yZHMucHVzaChtYXJrZXJzQ29vcmRzKTsqL1xuICBcbiAgICBjb25zdCBsYXN0TWFya2VyUmVjdCA9IGRvY3VtZW50XG4gICAgICAucXVlcnlTZWxlY3RvcihcIi5zdGVwc19faXRlbTpsYXN0LWNoaWxkID4ubWFya2VyXCIpXG4gICAgICAuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgbWFya2Vyc1JlY3QucHVzaChsYXN0TWFya2VyUmVjdCk7XG4gIFxuICAgIC8qIGNvbnN0IGxhc3RNYXJrZXJDb29yZHMgPSB7XG4gICAgICB4OiBsYXN0TWFya2VyUmVjdC54IC0gaW5pdGlhbFggKyBsYXN0TWFya2VyUmVjdC53aWR0aCAvIDIsXG4gICAgICB5OiBsYXN0TWFya2VyUmVjdC55IC0gaW5pdGlhbFksXG4gICAgfTtcbiAgICBsYXN0TWFya2VyQ29vcmRzLnB1c2gobWFya2Vyc0Nvb3Jkcyk7Ki9cbiAgXG4gICAgbWFya2Vyc1JlY3QuZm9yRWFjaCgobWFya2VyUmVjdCkgPT4ge1xuICAgICAgLypjb25zdCBtYXJrZXJSZWN0ID0gbWFya2VyLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgICAgbGV0IGNlbnRlckNvb3JkcyA9IHt9O1xuICBcbiAgICAgIGNlbnRlckNvb3Jkcy54ID0gbWFya2VyUmVjdC54IC0gaW5pdGlhbFggKyBtYXJrZXJSZWN0LndpZHRoIC8gMjtcbiAgICAgIGNlbnRlckNvb3Jkcy55ID0gbWFya2VyUmVjdC55IC0gaW5pdGlhbFkgKyBtYXJrZXJSZWN0LmhlaWdodCAvIDI7XG4gICovXG4gICAgICBtYXJrZXJzQ29vcmRzLnB1c2goe1xuICAgICAgICB4OiBtYXJrZXJSZWN0LnggLSBpbml0aWFsWCArIG1hcmtlclJlY3Qud2lkdGggLyAyLFxuICAgICAgICB5OiBtYXJrZXJSZWN0LnkgLSBpbml0aWFsWSArIG1hcmtlclJlY3QuaGVpZ2h0IC8gMiArIHdpbmRvdy5zY3JvbGxZLFxuICAgICAgfSk7XG4gICAgfSk7XG4gICAgc3RlcHNMaW5lLnN0YXJ0WSA9IG1hcmtlcnNDb29yZHNbMF0ueSArIGluaXRpYWxZO1xuICAgIHN0ZXBzTGluZS5lbmRZID0gbWFya2Vyc0Nvb3Jkc1ttYXJrZXJzQ29vcmRzLmxlbmd0aCAtIDFdLnkgKyBpbml0aWFsWTtcbiAgICBjb25zb2xlLmxvZyhpbml0aWFsWCwgaW5pdGlhbFksIG1hcmtlcnNSZWN0LCBtYXJrZXJzQ29vcmRzKTtcbiAgICBjb25zdCBOU3N0cmluZyA9IFwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIjtcbiAgICBjb25zdCBzdmcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50TlMoTlNzdHJpbmcsIFwic3ZnXCIpO1xuICAgIHN2Zy5zZXRBdHRyaWJ1dGUoXCJjbGFzc1wiLCBcInN0ZXBzX190cmFja1wiKTtcbiAgICBjb25zdCBtYWluVHJhY2sgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50TlMoTlNzdHJpbmcsIFwicGF0aFwiKTtcbiAgICBsZXQgZCA9IGBNICR7bWFya2Vyc0Nvb3Jkc1swXS54fSAke21hcmtlcnNDb29yZHNbMF0ueX0gTCAke21hcmtlcnNDb29yZHNbMV0ueH0gJHttYXJrZXJzQ29vcmRzWzFdLnl9YDtcbiAgICAvKiBmb3IgKGxldCBpID0gMTsgaSA8IG1hcmtlcnNDb29yZHMubGVuZ3RoOyBpKyspIHtcbiAgICAgIGQgKz0gYEMke21hcmtlcnNDb29yZHNbaSAtIDFdLnh9ICR7XG4gICAgICAgIG1hcmtlcnNDb29yZHNbaSAtIDFdLnkgKyBjb250cm9sUG9pbnRPZmZzZXRZXG4gICAgICB9ICR7bWFya2Vyc0Nvb3Jkc1tpXS54fSAke1xuICAgICAgICBtYXJrZXJzQ29vcmRzW2ldLnkgLSBjb250cm9sUG9pbnRPZmZzZXRZXG4gICAgICB9ICR7bWFya2Vyc0Nvb3Jkc1tpXS54fSAke21hcmtlcnNDb29yZHNbaV0ueX1gO1xuICAgIH0qL1xuICAgIGNvbnN0IHN0ZXBzSXRlbXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLnN0ZXBzX19pdGVtXCIpO1xuICAgIGxldCBvZmZzZXRBcnJheSA9IFswXTtcbiAgICBjb25zdCBkYXNoTGVuZ2h0ID0gZ2FwIC0gbGluZVBhZGRpbmc7XG4gICAgLy8gdG9kbyDQvtC60YDRg9Cz0LvRj9GC0Ywg0LfQvdCw0YfQtdC90LjRjyBkYXNoTGVuZ2h0INC4IGl0ZW1IZWlnaHQg0LIg0LHQvtC70YzRiNGD0Y4g0YHRgtC+0YDQvtC90YM/XG4gICAgc3RlcHNJdGVtcy5mb3JFYWNoKChpdGVtLCBpKSA9PiB7XG4gICAgICBjb25zdCBpdGVtSGVpZ2h0ID0gcGFyc2VJbnQoXG4gICAgICAgIHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKGl0ZW0pLmdldFByb3BlcnR5VmFsdWUoXCJoZWlnaHRcIilcbiAgICAgICk7XG4gICAgICBpZiAoaSA9PT0gMCkge1xuICAgICAgICBvZmZzZXRBcnJheS5wdXNoKGl0ZW1IZWlnaHQpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgb2Zmc2V0QXJyYXkucHVzaChpdGVtSGVpZ2h0ICsgbGluZVBhZGRpbmcpO1xuICAgICAgfVxuICAgICAgb2Zmc2V0QXJyYXkucHVzaChkYXNoTGVuZ2h0KTtcbiAgICB9KTtcbiAgICBtYWluVHJhY2suc2V0QXR0cmlidXRlKFwiY2xhc3NcIiwgXCJzdGVwc19fbWFpbi10cmFja1wiKTtcbiAgICBtYWluVHJhY2suc2V0QXR0cmlidXRlKFwiZFwiLCBkKTtcbiAgICBtYWluVHJhY2suc2V0QXR0cmlidXRlKFwiZmlsbFwiLCBcIm5vbmVcIik7XG4gICAgc3RlcHNMaW5lLnBhdGhMZW5ndGggPSBNYXRoLnJvdW5kKG1haW5UcmFjay5nZXRUb3RhbExlbmd0aCgpKTtcbiAgICBtYWluVHJhY2suc2V0QXR0cmlidXRlKFwic3Ryb2tlLWRhc2hhcnJheVwiLCBvZmZzZXRBcnJheS5qb2luKFwiIFwiKSk7XG4gICAgLy8gcGF0aC5zZXRBdHRyaWJ1dGUoXCJzdHJva2UtZGFzaG9mZnNldFwiLCBzdGVwc0xpbmUucGF0aExlbmd0aCk7XG4gICAgc3ZnLmFwcGVuZENoaWxkKG1haW5UcmFjayk7XG4gICAgY29uc3QgdHJhY2tNYXNrID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudE5TKE5Tc3RyaW5nLCBcInBhdGhcIik7XG4gICAgdHJhY2tNYXNrLnNldEF0dHJpYnV0ZShcImNsYXNzXCIsIFwic3RlcHNfX3RyYWNrLW1hc2tcIik7XG4gICAgdHJhY2tNYXNrLnNldEF0dHJpYnV0ZShcImRcIiwgZCk7XG4gICAgdHJhY2tNYXNrLnNldEF0dHJpYnV0ZShcImZpbGxcIiwgXCJub25lXCIpO1xuICAgIHRyYWNrTWFzay5zZXRBdHRyaWJ1dGUoXCJzdHJva2UtZGFzaGFycmF5XCIsIHN0ZXBzTGluZS5wYXRoTGVuZ3RoKTtcbiAgICB0cmFja01hc2suc2V0QXR0cmlidXRlKFwic3Ryb2tlLWRhc2hvZmZzZXRcIiwgMCk7XG4gIFxuICAgIHN2Zy5hcHBlbmRDaGlsZCh0cmFja01hc2spO1xuICBcbiAgICAvKnVzZS5zZXRBdHRyaWJ1dGUoXCJjbGFzc1wiLCBcInN0ZXBzX190cmFjay0tbWFza1wiKTtcbiAgICB1c2Uuc2V0QXR0cmlidXRlKFwic3Ryb2tlLWRhc2hhcnJheVwiLCBzdGVwc0xpbmUucGF0aExlbmd0aCk7XG4gICAgdXNlLnNldEF0dHJpYnV0ZShcInN0cm9rZS1kYXNob2Zmc2V0XCIsIDApO1xuICAgIHN2Zy5hcHBlbmRDaGlsZCh1c2UpOyovXG4gICAgc3ZnLmFwcGVuZENoaWxkKFxuICAgICAgYWRkVHJpYW5nbGUobWFya2Vyc0Nvb3Jkc1swXS54LCBtYXJrZXJzQ29vcmRzWzBdLnksIDE1IC8qLCBzdmcqLylcbiAgICApO1xuICAgIGNvbnN0IHRyaWFuZ2xlTWFzayA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnROUyhOU3N0cmluZywgXCJwYXRoXCIpO1xuICAgIHRyaWFuZ2xlTWFzay5zZXRBdHRyaWJ1dGUoXCJjbGFzc1wiLCBcInN0ZXBzX190cmlhbmdsZS1tYXNrXCIpO1xuICAgIHRyaWFuZ2xlTWFzay5zZXRBdHRyaWJ1dGUoXCJkXCIsIGQpO1xuICAgIHRyaWFuZ2xlTWFzay5zZXRBdHRyaWJ1dGUoXCJmaWxsXCIsIFwibm9uZVwiKTtcbiAgICB0cmlhbmdsZU1hc2suc2V0QXR0cmlidXRlKFxuICAgICAgXCJzdHJva2Utd2lkdGhcIixcbiAgICAgIFwiMjBweFwiXG4gICAgKTsgLyogMjBweCDQtNC70Y8g0L/QtdGA0LXQutGA0YvRgtC40Y8g0YLRgNC10YPQs9C+0LvRjNC90LjQutCwINCyIDE1cHggKi9cbiAgICB0cmlhbmdsZU1hc2suc2V0QXR0cmlidXRlKFwic3Ryb2tlLWRhc2hhcnJheVwiLCBvZmZzZXRBcnJheS5zbGljZSgxKS5qb2luKFwiIFwiKSk7XG4gICAgdHJpYW5nbGVNYXNrLnNldEF0dHJpYnV0ZShcInN0cm9rZS1kYXNob2Zmc2V0XCIsIDApO1xuICAgIHN2Zy5hcHBlbmRDaGlsZCh0cmlhbmdsZU1hc2spO1xuICBcbiAgICBzdGVwc1NlY3Rpb24uYXBwZW5kQ2hpbGQoc3ZnKTtcbiAgfVxuXG4gIGV4cG9ydCBmdW5jdGlvbiBhbmltYXRlU3RyYWlnaHRTdGVwc1RyYWNrKFxuICAgIHN0YXJ0U2Nyb2xsUG9zaXRpb24sXG4gICAgc3RhcnRQb2ludCxcbiAgICBlbmRQb2ludCxcbiAgICBwYXRoTGVuZ2h0LFxuICAgIGhhbmRsZXJGdW5jXG4gICkge1xuICAgIGNvbnN0IHRyYWNrUGF0aCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuc3RlcHNfX3RyYWNrLW1hc2tcIik7XG4gICAgY29uc3QgbGluZUhlaWdodCA9IGVuZFBvaW50IC0gc3RhcnRQb2ludDtcbiAgICBjb25zdCBsaW5lU2Nyb2xsUHJvZ3JlcyA9ICh3aW5kb3cuc2Nyb2xsWSAtIHN0YXJ0U2Nyb2xsUG9zaXRpb24pIC8gbGluZUhlaWdodDtcbiAgICBsZXQgb2Zmc2V0ID0gLXBhdGhMZW5naHQgKiBsaW5lU2Nyb2xsUHJvZ3JlcztcbiAgXG4gICAgaWYgKG9mZnNldCA8IC1wYXRoTGVuZ2h0KSB7XG4gICAgICBvZmZzZXQgPSAtcGF0aExlbmdodDtcbiAgICAgIC8vd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJzY3JvbGxcIiwgaGFuZGxlckZ1bmMpO1xuICAgIH1cbiAgICB0cmFja1BhdGguc2V0QXR0cmlidXRlKFwic3Ryb2tlLWRhc2hvZmZzZXRcIiwgb2Zmc2V0KTtcbiAgICBtb3ZlVHJpYW5nbGVBbG9uZ1N0cmFpZ2h0KFxuICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5zdGVwc19fdHJhY2stYXJyb3dcIiksXG4gICAgICB0cmFja1BhdGgsXG4gICAgICBvZmZzZXQsXG4gICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnN0ZXBzX19tYWluLXRyYWNrXCIpXG4gICAgKTtcbiAgfSIsImV4cG9ydCBmdW5jdGlvbiBhZGRUcmlhbmdsZShpbml0aWFsWCwgaW5pdGlhbFksIHNpZGVMZW5naHQgLyosIHBhcmVudE5vZGUqLykge1xuICAgIGNvbnN0IHRyaWFuZ2xlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudE5TKFxuICAgICAgXCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiLFxuICAgICAgXCJwb2x5Z29uXCJcbiAgICApO1xuICAgIHRyaWFuZ2xlLnNldEF0dHJpYnV0ZShcImNsYXNzXCIsIFwic3RlcHNfX3RyYWNrLWFycm93XCIpOyAvL3pvb20taW4gc2hvdyAgYW5pbWF0ZSBzaG93LWZhc3RlclxuICAgIC8vKE1hdGguc3FydCgzKSAvIDIpID0gMCw4NjZcbiAgICB0cmlhbmdsZS5zZXRBdHRyaWJ1dGUoXCJzdHlsZVwiLCBcIm9wYWNpdHk6IDA7XCIpO1xuICAgIHRyaWFuZ2xlLnNldEF0dHJpYnV0ZShcbiAgICAgIFwicG9pbnRzXCIsXG4gICAgICBgJHtpbml0aWFsWCAtIHNpZGVMZW5naHQgLyAyfSwke2luaXRpYWxZfSAke2luaXRpYWxYfSwke1xuICAgICAgICBpbml0aWFsWSArIChNYXRoLnNxcnQoMykgLyAyKSAqIHNpZGVMZW5naHRcbiAgICAgIH0gJHtpbml0aWFsWCArIHNpZGVMZW5naHQgLyAyfSwke2luaXRpYWxZfWBcbiAgICApO1xuICAgIC8vICBwYXJlbnROb2RlLmFwcGVuZENoaWxkKHRyaWFuZ2xlKTtcbiAgICByZXR1cm4gdHJpYW5nbGU7XG4gIH1cbiAgXG4gIGV4cG9ydCBmdW5jdGlvbiBtb3ZlVHJpYW5nbGVBbG9uZ0N1cnZlKHRyaWFuZ2xlLCBwYXRoLCB0b3RhbFBhdGhMZW5naHQsIG9mZnNldCkge1xuICAgIGNvbnN0IGN1cnJlbnRMZW5naHQgPSB0b3RhbFBhdGhMZW5naHQgLSBvZmZzZXQ7XG4gICAgY29uc3QgaW5pdGlhbFBvaW50ID0gcGF0aC5nZXRQb2ludEF0TGVuZ3RoKDApO1xuICAgIGNvbnN0IGN1cnJlbnRQb2ludCA9IHBhdGguZ2V0UG9pbnRBdExlbmd0aChjdXJyZW50TGVuZ2h0KTtcbiAgICBjb25zdCB0cmlhbmdsZUhlaWdodFBvaW50cyA9IHRyaWFuZ2xlXG4gICAgICAuZ2V0QXR0cmlidXRlKFwicG9pbnRzXCIpXG4gICAgICAubWF0Y2goL1xcUyssKFxcUyspXFxzLlxcUyssKFxcUyspLyk7XG4gICAgY29uc3QgZnV0dXJlUG9pbnQgPSBwYXRoLmdldFBvaW50QXRMZW5ndGgoXG4gICAgICBjdXJyZW50TGVuZ2h0ICsgKHRyaWFuZ2xlSGVpZ2h0UG9pbnRzWzJdIC0gdHJpYW5nbGVIZWlnaHRQb2ludHNbMV0pXG4gICAgKTtcbiAgICBjb25zdCBhbmdsZSA9XG4gICAgICAoTWF0aC5hdGFuMihcbiAgICAgICAgZnV0dXJlUG9pbnQueSAtIGN1cnJlbnRQb2ludC55LFxuICAgICAgICBmdXR1cmVQb2ludC54IC0gY3VycmVudFBvaW50LnhcbiAgICAgICkgLVxuICAgICAgICBNYXRoLmF0YW4yKDAsIGN1cnJlbnRQb2ludC54ICsgMSkpICpcbiAgICAgICAgKDE4MCAvIE1hdGguUEkpIC1cbiAgICAgIDkwO1xuICBcbiAgICB0cmlhbmdsZS5zZXRBdHRyaWJ1dGUoXG4gICAgICBcInRyYW5zZm9ybVwiLFxuICAgICAgYHRyYW5zbGF0ZSgke2N1cnJlbnRQb2ludC54IC0gaW5pdGlhbFBvaW50Lnh9LCAke1xuICAgICAgICBjdXJyZW50UG9pbnQueSAtIGluaXRpYWxQb2ludC55XG4gICAgICB9KSByb3RhdGUoJHthbmdsZX0gJHtpbml0aWFsUG9pbnQueH0gJHtpbml0aWFsUG9pbnQueX0pYFxuICAgICk7XG4gICAgdHJpYW5nbGUuc2V0QXR0cmlidXRlKFwic3R5bGVcIiwgXCJvcGFjaXR5OiAxO1wiKTtcbiAgfVxuICBcbiAgZXhwb3J0IGZ1bmN0aW9uIG1vdmVUcmlhbmdsZUFsb25nU3RyYWlnaHQodHJpYW5nbGUsIG1hc2tUcmFjaywgb2Zmc2V0LCBtYWluVHJhY2spIHtcbiAgICBjb25zdCBjdXJyZW50TGVuZ2h0ID0gLW9mZnNldDtcbiAgICBjb25zdCBpbml0aWFsUG9pbnQgPSBtYXNrVHJhY2suZ2V0UG9pbnRBdExlbmd0aCgwKTtcbiAgICBjb25zdCBjdXJyZW50UG9pbnQgPSBtYXNrVHJhY2suZ2V0UG9pbnRBdExlbmd0aChjdXJyZW50TGVuZ2h0KTtcbiAgICAvL2NvbnN0IGRhc2hlc0FycmF5ID0gbWFpblRyYWNrLmdldEF0dHJpYnV0ZShcInN0cm9rZS1kYXNoYXJyYXlcIikuc3BsaXQoXCIgXCIpO1xuICAgIC8qIGNvbnNvbGUubG9nKGN1cnJlbnRMZW5naHQpO1xuICAgIGxldCBzdW0gPSAwO1xuICAgIGxldCBpID0gMDtcbiAgICB3aGlsZSAoc3VtIDwgY3VycmVudExlbmdodCkge1xuICAgICAgaSsrO1xuICAgICAgc3VtICs9IE51bWJlcihkYXNoZXNBcnJheVtpXSk7XG4gICAgICBjb25zb2xlLmxvZyhpLCBzdW0pO1xuICAgIH1cbiAgICBpZiAoaSAlIDIgPT09IDApIHtcbiAgICAgIHRyaWFuZ2xlLnNldEF0dHJpYnV0ZShcbiAgICAgICAgXCJ0cmFuc2Zvcm1cIixcbiAgICAgICAgYHRyYW5zbGF0ZSgke2N1cnJlbnRQb2ludC54IC0gaW5pdGlhbFBvaW50Lnh9LCAke1xuICAgICAgICAgIGN1cnJlbnRQb2ludC55IC0gaW5pdGlhbFBvaW50LnlcbiAgICAgICAgfSlgXG4gICAgICApO1xuICAgIH0qL1xuICAgIHRyaWFuZ2xlLnNldEF0dHJpYnV0ZShcbiAgICAgIFwidHJhbnNmb3JtXCIsXG4gICAgICBgdHJhbnNsYXRlKCR7Y3VycmVudFBvaW50LnggLSBpbml0aWFsUG9pbnQueH0sICR7XG4gICAgICAgIGN1cnJlbnRQb2ludC55IC0gaW5pdGlhbFBvaW50LnlcbiAgICAgIH0pYFxuICAgICk7XG4gICAgdHJpYW5nbGUuc2V0QXR0cmlidXRlKFwic3R5bGVcIiwgXCJvcGFjaXR5OiAxO1wiKTtcbiAgfSIsImxldCBsYXN0U2Nyb2xsUG9zaXRpb24gPSAwO1xuXG5leHBvcnQgZnVuY3Rpb24gc2Nyb2xsRGF0YSgpIHtcbiAgbGV0IHJlc3VsdCA9IHsgcG9zaXRpb246IHdpbmRvdy5zY3JvbGxZLCBkaXJlY3Rpb246IFwiXCIgfTtcbiAgcmVzdWx0LmRpcmVjdGlvbiA9IHJlc3VsdC5wb3NpdGlvbiA+IGxhc3RTY3JvbGxQb3NpdGlvbiA/IFwiZG93blwiIDogXCJ1cFwiO1xuICBsYXN0U2Nyb2xsUG9zaXRpb24gPSByZXN1bHQucG9zaXRpb247XG4gIHJldHVybiByZXN1bHQ7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpblRhcmdldChlbGVtZW50LCB0YXJnZXQpIHtcbiAgY29uc3QgZWxlbWVudFBvc2l0aW9uID0gZWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS50b3A7XG4gIGlmIChlbGVtZW50UG9zaXRpb24gPD0gdGFyZ2V0KSB7XG4gICAgcmV0dXJuIHRydWU7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRNYWluV2lkdGgoKSB7XG4gIHJldHVybiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnBhZ2UtbWFpblwiKS5vZmZzZXRXaWR0aDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHRocm90dGxlKGZ1bmMsIG1zKSB7XG4gIGxldCBpc1Rocm90dGxlZCA9IGZhbHNlLFxuICAgIHNhdmVkQXJncyxcbiAgICBzYXZlZFRoaXM7XG5cbiAgZnVuY3Rpb24gd3JhcHBlcigpIHtcbiAgICBpZiAoaXNUaHJvdHRsZWQpIHtcbiAgICAgIHNhdmVkQXJncyA9IGFyZ3VtZW50cztcbiAgICAgIHNhdmVkVGhpcyA9IHRoaXM7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgZnVuYy5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuXG4gICAgaXNUaHJvdHRsZWQgPSB0cnVlO1xuXG4gICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICBpc1Rocm90dGxlZCA9IGZhbHNlO1xuICAgICAgaWYgKHNhdmVkQXJncykge1xuICAgICAgICB3cmFwcGVyLmFwcGx5KHNhdmVkVGhpcywgc2F2ZWRBcmdzKTtcbiAgICAgICAgc2F2ZWRBcmdzID0gc2F2ZWRUaGlzID0gbnVsbDtcbiAgICAgIH1cbiAgICB9LCBtcyk7XG4gIH1cblxuICByZXR1cm4gd3JhcHBlcjtcbn1cbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0dmFyIGV4ZWNPcHRpb25zID0geyBpZDogbW9kdWxlSWQsIG1vZHVsZTogbW9kdWxlLCBmYWN0b3J5OiBfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXSwgcmVxdWlyZTogX193ZWJwYWNrX3JlcXVpcmVfXyB9O1xuXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmkuZm9yRWFjaChmdW5jdGlvbihoYW5kbGVyKSB7IGhhbmRsZXIoZXhlY09wdGlvbnMpOyB9KTtcblx0bW9kdWxlID0gZXhlY09wdGlvbnMubW9kdWxlO1xuXHRleGVjT3B0aW9ucy5mYWN0b3J5LmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIGV4ZWNPcHRpb25zLnJlcXVpcmUpO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuLy8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbl9fd2VicGFja19yZXF1aXJlX18ubSA9IF9fd2VicGFja19tb2R1bGVzX187XG5cbi8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX187XG5cbi8vIGV4cG9zZSB0aGUgbW9kdWxlIGV4ZWN1dGlvbiBpbnRlcmNlcHRvclxuX193ZWJwYWNrX3JlcXVpcmVfXy5pID0gW107XG5cbiIsIi8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSAobW9kdWxlKSA9PiB7XG5cdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuXHRcdCgpID0+IChtb2R1bGVbJ2RlZmF1bHQnXSkgOlxuXHRcdCgpID0+IChtb2R1bGUpO1xuXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCB7IGE6IGdldHRlciB9KTtcblx0cmV0dXJuIGdldHRlcjtcbn07IiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiLy8gVGhpcyBmdW5jdGlvbiBhbGxvdyB0byByZWZlcmVuY2UgYWxsIGNodW5rc1xuX193ZWJwYWNrX3JlcXVpcmVfXy5odSA9IChjaHVua0lkKSA9PiB7XG5cdC8vIHJldHVybiB1cmwgZm9yIGZpbGVuYW1lcyBiYXNlZCBvbiB0ZW1wbGF0ZVxuXHRyZXR1cm4gXCJcIiArIGNodW5rSWQgKyBcIi5cIiArIF9fd2VicGFja19yZXF1aXJlX18uaCgpICsgXCIuaG90LXVwZGF0ZS5qc1wiO1xufTsiLCIvLyBUaGlzIGZ1bmN0aW9uIGFsbG93IHRvIHJlZmVyZW5jZSBhc3luYyBjaHVua3Ncbl9fd2VicGFja19yZXF1aXJlX18ubWluaUNzc0YgPSAoY2h1bmtJZCkgPT4ge1xuXHQvLyByZXR1cm4gdXJsIGZvciBmaWxlbmFtZXMgYmFzZWQgb24gdGVtcGxhdGVcblx0cmV0dXJuIHVuZGVmaW5lZDtcbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5obXJGID0gKCkgPT4gKFwibWFpbi5cIiArIF9fd2VicGFja19yZXF1aXJlX18uaCgpICsgXCIuaG90LXVwZGF0ZS5qc29uXCIpOyIsIl9fd2VicGFja19yZXF1aXJlX18uaCA9ICgpID0+IChcIjc4Y2ZkNGI4NWUwZTUzYTU5ZmUyXCIpIiwiX193ZWJwYWNrX3JlcXVpcmVfXy5nID0gKGZ1bmN0aW9uKCkge1xuXHRpZiAodHlwZW9mIGdsb2JhbFRoaXMgPT09ICdvYmplY3QnKSByZXR1cm4gZ2xvYmFsVGhpcztcblx0dHJ5IHtcblx0XHRyZXR1cm4gdGhpcyB8fCBuZXcgRnVuY3Rpb24oJ3JldHVybiB0aGlzJykoKTtcblx0fSBjYXRjaCAoZSkge1xuXHRcdGlmICh0eXBlb2Ygd2luZG93ID09PSAnb2JqZWN0JykgcmV0dXJuIHdpbmRvdztcblx0fVxufSkoKTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwidmFyIGluUHJvZ3Jlc3MgPSB7fTtcbnZhciBkYXRhV2VicGFja1ByZWZpeCA9IFwibXktaG9sc3Qtc2l0ZTpcIjtcbi8vIGxvYWRTY3JpcHQgZnVuY3Rpb24gdG8gbG9hZCBhIHNjcmlwdCB2aWEgc2NyaXB0IHRhZ1xuX193ZWJwYWNrX3JlcXVpcmVfXy5sID0gKHVybCwgZG9uZSwga2V5LCBjaHVua0lkKSA9PiB7XG5cdGlmKGluUHJvZ3Jlc3NbdXJsXSkgeyBpblByb2dyZXNzW3VybF0ucHVzaChkb25lKTsgcmV0dXJuOyB9XG5cdHZhciBzY3JpcHQsIG5lZWRBdHRhY2g7XG5cdGlmKGtleSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0dmFyIHNjcmlwdHMgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZShcInNjcmlwdFwiKTtcblx0XHRmb3IodmFyIGkgPSAwOyBpIDwgc2NyaXB0cy5sZW5ndGg7IGkrKykge1xuXHRcdFx0dmFyIHMgPSBzY3JpcHRzW2ldO1xuXHRcdFx0aWYocy5nZXRBdHRyaWJ1dGUoXCJzcmNcIikgPT0gdXJsIHx8IHMuZ2V0QXR0cmlidXRlKFwiZGF0YS13ZWJwYWNrXCIpID09IGRhdGFXZWJwYWNrUHJlZml4ICsga2V5KSB7IHNjcmlwdCA9IHM7IGJyZWFrOyB9XG5cdFx0fVxuXHR9XG5cdGlmKCFzY3JpcHQpIHtcblx0XHRuZWVkQXR0YWNoID0gdHJ1ZTtcblx0XHRzY3JpcHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzY3JpcHQnKTtcblxuXHRcdHNjcmlwdC5jaGFyc2V0ID0gJ3V0Zi04Jztcblx0XHRzY3JpcHQudGltZW91dCA9IDEyMDtcblx0XHRpZiAoX193ZWJwYWNrX3JlcXVpcmVfXy5uYykge1xuXHRcdFx0c2NyaXB0LnNldEF0dHJpYnV0ZShcIm5vbmNlXCIsIF9fd2VicGFja19yZXF1aXJlX18ubmMpO1xuXHRcdH1cblx0XHRzY3JpcHQuc2V0QXR0cmlidXRlKFwiZGF0YS13ZWJwYWNrXCIsIGRhdGFXZWJwYWNrUHJlZml4ICsga2V5KTtcblxuXHRcdHNjcmlwdC5zcmMgPSB1cmw7XG5cdH1cblx0aW5Qcm9ncmVzc1t1cmxdID0gW2RvbmVdO1xuXHR2YXIgb25TY3JpcHRDb21wbGV0ZSA9IChwcmV2LCBldmVudCkgPT4ge1xuXHRcdC8vIGF2b2lkIG1lbSBsZWFrcyBpbiBJRS5cblx0XHRzY3JpcHQub25lcnJvciA9IHNjcmlwdC5vbmxvYWQgPSBudWxsO1xuXHRcdGNsZWFyVGltZW91dCh0aW1lb3V0KTtcblx0XHR2YXIgZG9uZUZucyA9IGluUHJvZ3Jlc3NbdXJsXTtcblx0XHRkZWxldGUgaW5Qcm9ncmVzc1t1cmxdO1xuXHRcdHNjcmlwdC5wYXJlbnROb2RlICYmIHNjcmlwdC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHNjcmlwdCk7XG5cdFx0ZG9uZUZucyAmJiBkb25lRm5zLmZvckVhY2goKGZuKSA9PiAoZm4oZXZlbnQpKSk7XG5cdFx0aWYocHJldikgcmV0dXJuIHByZXYoZXZlbnQpO1xuXHR9XG5cdHZhciB0aW1lb3V0ID0gc2V0VGltZW91dChvblNjcmlwdENvbXBsZXRlLmJpbmQobnVsbCwgdW5kZWZpbmVkLCB7IHR5cGU6ICd0aW1lb3V0JywgdGFyZ2V0OiBzY3JpcHQgfSksIDEyMDAwMCk7XG5cdHNjcmlwdC5vbmVycm9yID0gb25TY3JpcHRDb21wbGV0ZS5iaW5kKG51bGwsIHNjcmlwdC5vbmVycm9yKTtcblx0c2NyaXB0Lm9ubG9hZCA9IG9uU2NyaXB0Q29tcGxldGUuYmluZChudWxsLCBzY3JpcHQub25sb2FkKTtcblx0bmVlZEF0dGFjaCAmJiBkb2N1bWVudC5oZWFkLmFwcGVuZENoaWxkKHNjcmlwdCk7XG59OyIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsInZhciBjdXJyZW50TW9kdWxlRGF0YSA9IHt9O1xudmFyIGluc3RhbGxlZE1vZHVsZXMgPSBfX3dlYnBhY2tfcmVxdWlyZV9fLmM7XG5cbi8vIG1vZHVsZSBhbmQgcmVxdWlyZSBjcmVhdGlvblxudmFyIGN1cnJlbnRDaGlsZE1vZHVsZTtcbnZhciBjdXJyZW50UGFyZW50cyA9IFtdO1xuXG4vLyBzdGF0dXNcbnZhciByZWdpc3RlcmVkU3RhdHVzSGFuZGxlcnMgPSBbXTtcbnZhciBjdXJyZW50U3RhdHVzID0gXCJpZGxlXCI7XG5cbi8vIHdoaWxlIGRvd25sb2FkaW5nXG52YXIgYmxvY2tpbmdQcm9taXNlcyA9IDA7XG52YXIgYmxvY2tpbmdQcm9taXNlc1dhaXRpbmcgPSBbXTtcblxuLy8gVGhlIHVwZGF0ZSBpbmZvXG52YXIgY3VycmVudFVwZGF0ZUFwcGx5SGFuZGxlcnM7XG52YXIgcXVldWVkSW52YWxpZGF0ZWRNb2R1bGVzO1xuXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmhtckQgPSBjdXJyZW50TW9kdWxlRGF0YTtcblxuX193ZWJwYWNrX3JlcXVpcmVfXy5pLnB1c2goZnVuY3Rpb24gKG9wdGlvbnMpIHtcblx0dmFyIG1vZHVsZSA9IG9wdGlvbnMubW9kdWxlO1xuXHR2YXIgcmVxdWlyZSA9IGNyZWF0ZVJlcXVpcmUob3B0aW9ucy5yZXF1aXJlLCBvcHRpb25zLmlkKTtcblx0bW9kdWxlLmhvdCA9IGNyZWF0ZU1vZHVsZUhvdE9iamVjdChvcHRpb25zLmlkLCBtb2R1bGUpO1xuXHRtb2R1bGUucGFyZW50cyA9IGN1cnJlbnRQYXJlbnRzO1xuXHRtb2R1bGUuY2hpbGRyZW4gPSBbXTtcblx0Y3VycmVudFBhcmVudHMgPSBbXTtcblx0b3B0aW9ucy5yZXF1aXJlID0gcmVxdWlyZTtcbn0pO1xuXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmhtckMgPSB7fTtcbl9fd2VicGFja19yZXF1aXJlX18uaG1ySSA9IHt9O1xuXG5mdW5jdGlvbiBjcmVhdGVSZXF1aXJlKHJlcXVpcmUsIG1vZHVsZUlkKSB7XG5cdHZhciBtZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdO1xuXHRpZiAoIW1lKSByZXR1cm4gcmVxdWlyZTtcblx0dmFyIGZuID0gZnVuY3Rpb24gKHJlcXVlc3QpIHtcblx0XHRpZiAobWUuaG90LmFjdGl2ZSkge1xuXHRcdFx0aWYgKGluc3RhbGxlZE1vZHVsZXNbcmVxdWVzdF0pIHtcblx0XHRcdFx0dmFyIHBhcmVudHMgPSBpbnN0YWxsZWRNb2R1bGVzW3JlcXVlc3RdLnBhcmVudHM7XG5cdFx0XHRcdGlmIChwYXJlbnRzLmluZGV4T2YobW9kdWxlSWQpID09PSAtMSkge1xuXHRcdFx0XHRcdHBhcmVudHMucHVzaChtb2R1bGVJZCk7XG5cdFx0XHRcdH1cblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGN1cnJlbnRQYXJlbnRzID0gW21vZHVsZUlkXTtcblx0XHRcdFx0Y3VycmVudENoaWxkTW9kdWxlID0gcmVxdWVzdDtcblx0XHRcdH1cblx0XHRcdGlmIChtZS5jaGlsZHJlbi5pbmRleE9mKHJlcXVlc3QpID09PSAtMSkge1xuXHRcdFx0XHRtZS5jaGlsZHJlbi5wdXNoKHJlcXVlc3QpO1xuXHRcdFx0fVxuXHRcdH0gZWxzZSB7XG5cdFx0XHRjb25zb2xlLndhcm4oXG5cdFx0XHRcdFwiW0hNUl0gdW5leHBlY3RlZCByZXF1aXJlKFwiICtcblx0XHRcdFx0XHRyZXF1ZXN0ICtcblx0XHRcdFx0XHRcIikgZnJvbSBkaXNwb3NlZCBtb2R1bGUgXCIgK1xuXHRcdFx0XHRcdG1vZHVsZUlkXG5cdFx0XHQpO1xuXHRcdFx0Y3VycmVudFBhcmVudHMgPSBbXTtcblx0XHR9XG5cdFx0cmV0dXJuIHJlcXVpcmUocmVxdWVzdCk7XG5cdH07XG5cdHZhciBjcmVhdGVQcm9wZXJ0eURlc2NyaXB0b3IgPSBmdW5jdGlvbiAobmFtZSkge1xuXHRcdHJldHVybiB7XG5cdFx0XHRjb25maWd1cmFibGU6IHRydWUsXG5cdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuXHRcdFx0Z2V0OiBmdW5jdGlvbiAoKSB7XG5cdFx0XHRcdHJldHVybiByZXF1aXJlW25hbWVdO1xuXHRcdFx0fSxcblx0XHRcdHNldDogZnVuY3Rpb24gKHZhbHVlKSB7XG5cdFx0XHRcdHJlcXVpcmVbbmFtZV0gPSB2YWx1ZTtcblx0XHRcdH1cblx0XHR9O1xuXHR9O1xuXHRmb3IgKHZhciBuYW1lIGluIHJlcXVpcmUpIHtcblx0XHRpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHJlcXVpcmUsIG5hbWUpICYmIG5hbWUgIT09IFwiZVwiKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZm4sIG5hbWUsIGNyZWF0ZVByb3BlcnR5RGVzY3JpcHRvcihuYW1lKSk7XG5cdFx0fVxuXHR9XG5cdGZuLmUgPSBmdW5jdGlvbiAoY2h1bmtJZCwgZmV0Y2hQcmlvcml0eSkge1xuXHRcdHJldHVybiB0cmFja0Jsb2NraW5nUHJvbWlzZShyZXF1aXJlLmUoY2h1bmtJZCwgZmV0Y2hQcmlvcml0eSkpO1xuXHR9O1xuXHRyZXR1cm4gZm47XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZU1vZHVsZUhvdE9iamVjdChtb2R1bGVJZCwgbWUpIHtcblx0dmFyIF9tYWluID0gY3VycmVudENoaWxkTW9kdWxlICE9PSBtb2R1bGVJZDtcblx0dmFyIGhvdCA9IHtcblx0XHQvLyBwcml2YXRlIHN0dWZmXG5cdFx0X2FjY2VwdGVkRGVwZW5kZW5jaWVzOiB7fSxcblx0XHRfYWNjZXB0ZWRFcnJvckhhbmRsZXJzOiB7fSxcblx0XHRfZGVjbGluZWREZXBlbmRlbmNpZXM6IHt9LFxuXHRcdF9zZWxmQWNjZXB0ZWQ6IGZhbHNlLFxuXHRcdF9zZWxmRGVjbGluZWQ6IGZhbHNlLFxuXHRcdF9zZWxmSW52YWxpZGF0ZWQ6IGZhbHNlLFxuXHRcdF9kaXNwb3NlSGFuZGxlcnM6IFtdLFxuXHRcdF9tYWluOiBfbWFpbixcblx0XHRfcmVxdWlyZVNlbGY6IGZ1bmN0aW9uICgpIHtcblx0XHRcdGN1cnJlbnRQYXJlbnRzID0gbWUucGFyZW50cy5zbGljZSgpO1xuXHRcdFx0Y3VycmVudENoaWxkTW9kdWxlID0gX21haW4gPyB1bmRlZmluZWQgOiBtb2R1bGVJZDtcblx0XHRcdF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpO1xuXHRcdH0sXG5cblx0XHQvLyBNb2R1bGUgQVBJXG5cdFx0YWN0aXZlOiB0cnVlLFxuXHRcdGFjY2VwdDogZnVuY3Rpb24gKGRlcCwgY2FsbGJhY2ssIGVycm9ySGFuZGxlcikge1xuXHRcdFx0aWYgKGRlcCA9PT0gdW5kZWZpbmVkKSBob3QuX3NlbGZBY2NlcHRlZCA9IHRydWU7XG5cdFx0XHRlbHNlIGlmICh0eXBlb2YgZGVwID09PSBcImZ1bmN0aW9uXCIpIGhvdC5fc2VsZkFjY2VwdGVkID0gZGVwO1xuXHRcdFx0ZWxzZSBpZiAodHlwZW9mIGRlcCA9PT0gXCJvYmplY3RcIiAmJiBkZXAgIT09IG51bGwpIHtcblx0XHRcdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBkZXAubGVuZ3RoOyBpKyspIHtcblx0XHRcdFx0XHRob3QuX2FjY2VwdGVkRGVwZW5kZW5jaWVzW2RlcFtpXV0gPSBjYWxsYmFjayB8fCBmdW5jdGlvbiAoKSB7fTtcblx0XHRcdFx0XHRob3QuX2FjY2VwdGVkRXJyb3JIYW5kbGVyc1tkZXBbaV1dID0gZXJyb3JIYW5kbGVyO1xuXHRcdFx0XHR9XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRob3QuX2FjY2VwdGVkRGVwZW5kZW5jaWVzW2RlcF0gPSBjYWxsYmFjayB8fCBmdW5jdGlvbiAoKSB7fTtcblx0XHRcdFx0aG90Ll9hY2NlcHRlZEVycm9ySGFuZGxlcnNbZGVwXSA9IGVycm9ySGFuZGxlcjtcblx0XHRcdH1cblx0XHR9LFxuXHRcdGRlY2xpbmU6IGZ1bmN0aW9uIChkZXApIHtcblx0XHRcdGlmIChkZXAgPT09IHVuZGVmaW5lZCkgaG90Ll9zZWxmRGVjbGluZWQgPSB0cnVlO1xuXHRcdFx0ZWxzZSBpZiAodHlwZW9mIGRlcCA9PT0gXCJvYmplY3RcIiAmJiBkZXAgIT09IG51bGwpXG5cdFx0XHRcdGZvciAodmFyIGkgPSAwOyBpIDwgZGVwLmxlbmd0aDsgaSsrKVxuXHRcdFx0XHRcdGhvdC5fZGVjbGluZWREZXBlbmRlbmNpZXNbZGVwW2ldXSA9IHRydWU7XG5cdFx0XHRlbHNlIGhvdC5fZGVjbGluZWREZXBlbmRlbmNpZXNbZGVwXSA9IHRydWU7XG5cdFx0fSxcblx0XHRkaXNwb3NlOiBmdW5jdGlvbiAoY2FsbGJhY2spIHtcblx0XHRcdGhvdC5fZGlzcG9zZUhhbmRsZXJzLnB1c2goY2FsbGJhY2spO1xuXHRcdH0sXG5cdFx0YWRkRGlzcG9zZUhhbmRsZXI6IGZ1bmN0aW9uIChjYWxsYmFjaykge1xuXHRcdFx0aG90Ll9kaXNwb3NlSGFuZGxlcnMucHVzaChjYWxsYmFjayk7XG5cdFx0fSxcblx0XHRyZW1vdmVEaXNwb3NlSGFuZGxlcjogZnVuY3Rpb24gKGNhbGxiYWNrKSB7XG5cdFx0XHR2YXIgaWR4ID0gaG90Ll9kaXNwb3NlSGFuZGxlcnMuaW5kZXhPZihjYWxsYmFjayk7XG5cdFx0XHRpZiAoaWR4ID49IDApIGhvdC5fZGlzcG9zZUhhbmRsZXJzLnNwbGljZShpZHgsIDEpO1xuXHRcdH0sXG5cdFx0aW52YWxpZGF0ZTogZnVuY3Rpb24gKCkge1xuXHRcdFx0dGhpcy5fc2VsZkludmFsaWRhdGVkID0gdHJ1ZTtcblx0XHRcdHN3aXRjaCAoY3VycmVudFN0YXR1cykge1xuXHRcdFx0XHRjYXNlIFwiaWRsZVwiOlxuXHRcdFx0XHRcdGN1cnJlbnRVcGRhdGVBcHBseUhhbmRsZXJzID0gW107XG5cdFx0XHRcdFx0T2JqZWN0LmtleXMoX193ZWJwYWNrX3JlcXVpcmVfXy5obXJJKS5mb3JFYWNoKGZ1bmN0aW9uIChrZXkpIHtcblx0XHRcdFx0XHRcdF9fd2VicGFja19yZXF1aXJlX18uaG1ySVtrZXldKFxuXHRcdFx0XHRcdFx0XHRtb2R1bGVJZCxcblx0XHRcdFx0XHRcdFx0Y3VycmVudFVwZGF0ZUFwcGx5SGFuZGxlcnNcblx0XHRcdFx0XHRcdCk7XG5cdFx0XHRcdFx0fSk7XG5cdFx0XHRcdFx0c2V0U3RhdHVzKFwicmVhZHlcIik7XG5cdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdGNhc2UgXCJyZWFkeVwiOlxuXHRcdFx0XHRcdE9iamVjdC5rZXlzKF9fd2VicGFja19yZXF1aXJlX18uaG1ySSkuZm9yRWFjaChmdW5jdGlvbiAoa2V5KSB7XG5cdFx0XHRcdFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmhtcklba2V5XShcblx0XHRcdFx0XHRcdFx0bW9kdWxlSWQsXG5cdFx0XHRcdFx0XHRcdGN1cnJlbnRVcGRhdGVBcHBseUhhbmRsZXJzXG5cdFx0XHRcdFx0XHQpO1xuXHRcdFx0XHRcdH0pO1xuXHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRjYXNlIFwicHJlcGFyZVwiOlxuXHRcdFx0XHRjYXNlIFwiY2hlY2tcIjpcblx0XHRcdFx0Y2FzZSBcImRpc3Bvc2VcIjpcblx0XHRcdFx0Y2FzZSBcImFwcGx5XCI6XG5cdFx0XHRcdFx0KHF1ZXVlZEludmFsaWRhdGVkTW9kdWxlcyA9IHF1ZXVlZEludmFsaWRhdGVkTW9kdWxlcyB8fCBbXSkucHVzaChcblx0XHRcdFx0XHRcdG1vZHVsZUlkXG5cdFx0XHRcdFx0KTtcblx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0ZGVmYXVsdDpcblx0XHRcdFx0XHQvLyBpZ25vcmUgcmVxdWVzdHMgaW4gZXJyb3Igc3RhdGVzXG5cdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHR9XG5cdFx0fSxcblxuXHRcdC8vIE1hbmFnZW1lbnQgQVBJXG5cdFx0Y2hlY2s6IGhvdENoZWNrLFxuXHRcdGFwcGx5OiBob3RBcHBseSxcblx0XHRzdGF0dXM6IGZ1bmN0aW9uIChsKSB7XG5cdFx0XHRpZiAoIWwpIHJldHVybiBjdXJyZW50U3RhdHVzO1xuXHRcdFx0cmVnaXN0ZXJlZFN0YXR1c0hhbmRsZXJzLnB1c2gobCk7XG5cdFx0fSxcblx0XHRhZGRTdGF0dXNIYW5kbGVyOiBmdW5jdGlvbiAobCkge1xuXHRcdFx0cmVnaXN0ZXJlZFN0YXR1c0hhbmRsZXJzLnB1c2gobCk7XG5cdFx0fSxcblx0XHRyZW1vdmVTdGF0dXNIYW5kbGVyOiBmdW5jdGlvbiAobCkge1xuXHRcdFx0dmFyIGlkeCA9IHJlZ2lzdGVyZWRTdGF0dXNIYW5kbGVycy5pbmRleE9mKGwpO1xuXHRcdFx0aWYgKGlkeCA+PSAwKSByZWdpc3RlcmVkU3RhdHVzSGFuZGxlcnMuc3BsaWNlKGlkeCwgMSk7XG5cdFx0fSxcblxuXHRcdC8vaW5oZXJpdCBmcm9tIHByZXZpb3VzIGRpc3Bvc2UgY2FsbFxuXHRcdGRhdGE6IGN1cnJlbnRNb2R1bGVEYXRhW21vZHVsZUlkXVxuXHR9O1xuXHRjdXJyZW50Q2hpbGRNb2R1bGUgPSB1bmRlZmluZWQ7XG5cdHJldHVybiBob3Q7XG59XG5cbmZ1bmN0aW9uIHNldFN0YXR1cyhuZXdTdGF0dXMpIHtcblx0Y3VycmVudFN0YXR1cyA9IG5ld1N0YXR1cztcblx0dmFyIHJlc3VsdHMgPSBbXTtcblxuXHRmb3IgKHZhciBpID0gMDsgaSA8IHJlZ2lzdGVyZWRTdGF0dXNIYW5kbGVycy5sZW5ndGg7IGkrKylcblx0XHRyZXN1bHRzW2ldID0gcmVnaXN0ZXJlZFN0YXR1c0hhbmRsZXJzW2ldLmNhbGwobnVsbCwgbmV3U3RhdHVzKTtcblxuXHRyZXR1cm4gUHJvbWlzZS5hbGwocmVzdWx0cykudGhlbihmdW5jdGlvbiAoKSB7fSk7XG59XG5cbmZ1bmN0aW9uIHVuYmxvY2soKSB7XG5cdGlmICgtLWJsb2NraW5nUHJvbWlzZXMgPT09IDApIHtcblx0XHRzZXRTdGF0dXMoXCJyZWFkeVwiKS50aGVuKGZ1bmN0aW9uICgpIHtcblx0XHRcdGlmIChibG9ja2luZ1Byb21pc2VzID09PSAwKSB7XG5cdFx0XHRcdHZhciBsaXN0ID0gYmxvY2tpbmdQcm9taXNlc1dhaXRpbmc7XG5cdFx0XHRcdGJsb2NraW5nUHJvbWlzZXNXYWl0aW5nID0gW107XG5cdFx0XHRcdGZvciAodmFyIGkgPSAwOyBpIDwgbGlzdC5sZW5ndGg7IGkrKykge1xuXHRcdFx0XHRcdGxpc3RbaV0oKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH0pO1xuXHR9XG59XG5cbmZ1bmN0aW9uIHRyYWNrQmxvY2tpbmdQcm9taXNlKHByb21pc2UpIHtcblx0c3dpdGNoIChjdXJyZW50U3RhdHVzKSB7XG5cdFx0Y2FzZSBcInJlYWR5XCI6XG5cdFx0XHRzZXRTdGF0dXMoXCJwcmVwYXJlXCIpO1xuXHRcdC8qIGZhbGx0aHJvdWdoICovXG5cdFx0Y2FzZSBcInByZXBhcmVcIjpcblx0XHRcdGJsb2NraW5nUHJvbWlzZXMrKztcblx0XHRcdHByb21pc2UudGhlbih1bmJsb2NrLCB1bmJsb2NrKTtcblx0XHRcdHJldHVybiBwcm9taXNlO1xuXHRcdGRlZmF1bHQ6XG5cdFx0XHRyZXR1cm4gcHJvbWlzZTtcblx0fVxufVxuXG5mdW5jdGlvbiB3YWl0Rm9yQmxvY2tpbmdQcm9taXNlcyhmbikge1xuXHRpZiAoYmxvY2tpbmdQcm9taXNlcyA9PT0gMCkgcmV0dXJuIGZuKCk7XG5cdHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSkge1xuXHRcdGJsb2NraW5nUHJvbWlzZXNXYWl0aW5nLnB1c2goZnVuY3Rpb24gKCkge1xuXHRcdFx0cmVzb2x2ZShmbigpKTtcblx0XHR9KTtcblx0fSk7XG59XG5cbmZ1bmN0aW9uIGhvdENoZWNrKGFwcGx5T25VcGRhdGUpIHtcblx0aWYgKGN1cnJlbnRTdGF0dXMgIT09IFwiaWRsZVwiKSB7XG5cdFx0dGhyb3cgbmV3IEVycm9yKFwiY2hlY2soKSBpcyBvbmx5IGFsbG93ZWQgaW4gaWRsZSBzdGF0dXNcIik7XG5cdH1cblx0cmV0dXJuIHNldFN0YXR1cyhcImNoZWNrXCIpXG5cdFx0LnRoZW4oX193ZWJwYWNrX3JlcXVpcmVfXy5obXJNKVxuXHRcdC50aGVuKGZ1bmN0aW9uICh1cGRhdGUpIHtcblx0XHRcdGlmICghdXBkYXRlKSB7XG5cdFx0XHRcdHJldHVybiBzZXRTdGF0dXMoYXBwbHlJbnZhbGlkYXRlZE1vZHVsZXMoKSA/IFwicmVhZHlcIiA6IFwiaWRsZVwiKS50aGVuKFxuXHRcdFx0XHRcdGZ1bmN0aW9uICgpIHtcblx0XHRcdFx0XHRcdHJldHVybiBudWxsO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0KTtcblx0XHRcdH1cblxuXHRcdFx0cmV0dXJuIHNldFN0YXR1cyhcInByZXBhcmVcIikudGhlbihmdW5jdGlvbiAoKSB7XG5cdFx0XHRcdHZhciB1cGRhdGVkTW9kdWxlcyA9IFtdO1xuXHRcdFx0XHRjdXJyZW50VXBkYXRlQXBwbHlIYW5kbGVycyA9IFtdO1xuXG5cdFx0XHRcdHJldHVybiBQcm9taXNlLmFsbChcblx0XHRcdFx0XHRPYmplY3Qua2V5cyhfX3dlYnBhY2tfcmVxdWlyZV9fLmhtckMpLnJlZHVjZShmdW5jdGlvbiAoXG5cdFx0XHRcdFx0XHRwcm9taXNlcyxcblx0XHRcdFx0XHRcdGtleVxuXHRcdFx0XHRcdCkge1xuXHRcdFx0XHRcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5obXJDW2tleV0oXG5cdFx0XHRcdFx0XHRcdHVwZGF0ZS5jLFxuXHRcdFx0XHRcdFx0XHR1cGRhdGUucixcblx0XHRcdFx0XHRcdFx0dXBkYXRlLm0sXG5cdFx0XHRcdFx0XHRcdHByb21pc2VzLFxuXHRcdFx0XHRcdFx0XHRjdXJyZW50VXBkYXRlQXBwbHlIYW5kbGVycyxcblx0XHRcdFx0XHRcdFx0dXBkYXRlZE1vZHVsZXNcblx0XHRcdFx0XHRcdCk7XG5cdFx0XHRcdFx0XHRyZXR1cm4gcHJvbWlzZXM7XG5cdFx0XHRcdFx0fSwgW10pXG5cdFx0XHRcdCkudGhlbihmdW5jdGlvbiAoKSB7XG5cdFx0XHRcdFx0cmV0dXJuIHdhaXRGb3JCbG9ja2luZ1Byb21pc2VzKGZ1bmN0aW9uICgpIHtcblx0XHRcdFx0XHRcdGlmIChhcHBseU9uVXBkYXRlKSB7XG5cdFx0XHRcdFx0XHRcdHJldHVybiBpbnRlcm5hbEFwcGx5KGFwcGx5T25VcGRhdGUpO1xuXHRcdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdFx0cmV0dXJuIHNldFN0YXR1cyhcInJlYWR5XCIpLnRoZW4oZnVuY3Rpb24gKCkge1xuXHRcdFx0XHRcdFx0XHRcdHJldHVybiB1cGRhdGVkTW9kdWxlcztcblx0XHRcdFx0XHRcdFx0fSk7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fSk7XG5cdFx0XHRcdH0pO1xuXHRcdFx0fSk7XG5cdFx0fSk7XG59XG5cbmZ1bmN0aW9uIGhvdEFwcGx5KG9wdGlvbnMpIHtcblx0aWYgKGN1cnJlbnRTdGF0dXMgIT09IFwicmVhZHlcIikge1xuXHRcdHJldHVybiBQcm9taXNlLnJlc29sdmUoKS50aGVuKGZ1bmN0aW9uICgpIHtcblx0XHRcdHRocm93IG5ldyBFcnJvcihcblx0XHRcdFx0XCJhcHBseSgpIGlzIG9ubHkgYWxsb3dlZCBpbiByZWFkeSBzdGF0dXMgKHN0YXRlOiBcIiArXG5cdFx0XHRcdFx0Y3VycmVudFN0YXR1cyArXG5cdFx0XHRcdFx0XCIpXCJcblx0XHRcdCk7XG5cdFx0fSk7XG5cdH1cblx0cmV0dXJuIGludGVybmFsQXBwbHkob3B0aW9ucyk7XG59XG5cbmZ1bmN0aW9uIGludGVybmFsQXBwbHkob3B0aW9ucykge1xuXHRvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcblxuXHRhcHBseUludmFsaWRhdGVkTW9kdWxlcygpO1xuXG5cdHZhciByZXN1bHRzID0gY3VycmVudFVwZGF0ZUFwcGx5SGFuZGxlcnMubWFwKGZ1bmN0aW9uIChoYW5kbGVyKSB7XG5cdFx0cmV0dXJuIGhhbmRsZXIob3B0aW9ucyk7XG5cdH0pO1xuXHRjdXJyZW50VXBkYXRlQXBwbHlIYW5kbGVycyA9IHVuZGVmaW5lZDtcblxuXHR2YXIgZXJyb3JzID0gcmVzdWx0c1xuXHRcdC5tYXAoZnVuY3Rpb24gKHIpIHtcblx0XHRcdHJldHVybiByLmVycm9yO1xuXHRcdH0pXG5cdFx0LmZpbHRlcihCb29sZWFuKTtcblxuXHRpZiAoZXJyb3JzLmxlbmd0aCA+IDApIHtcblx0XHRyZXR1cm4gc2V0U3RhdHVzKFwiYWJvcnRcIikudGhlbihmdW5jdGlvbiAoKSB7XG5cdFx0XHR0aHJvdyBlcnJvcnNbMF07XG5cdFx0fSk7XG5cdH1cblxuXHQvLyBOb3cgaW4gXCJkaXNwb3NlXCIgcGhhc2Vcblx0dmFyIGRpc3Bvc2VQcm9taXNlID0gc2V0U3RhdHVzKFwiZGlzcG9zZVwiKTtcblxuXHRyZXN1bHRzLmZvckVhY2goZnVuY3Rpb24gKHJlc3VsdCkge1xuXHRcdGlmIChyZXN1bHQuZGlzcG9zZSkgcmVzdWx0LmRpc3Bvc2UoKTtcblx0fSk7XG5cblx0Ly8gTm93IGluIFwiYXBwbHlcIiBwaGFzZVxuXHR2YXIgYXBwbHlQcm9taXNlID0gc2V0U3RhdHVzKFwiYXBwbHlcIik7XG5cblx0dmFyIGVycm9yO1xuXHR2YXIgcmVwb3J0RXJyb3IgPSBmdW5jdGlvbiAoZXJyKSB7XG5cdFx0aWYgKCFlcnJvcikgZXJyb3IgPSBlcnI7XG5cdH07XG5cblx0dmFyIG91dGRhdGVkTW9kdWxlcyA9IFtdO1xuXHRyZXN1bHRzLmZvckVhY2goZnVuY3Rpb24gKHJlc3VsdCkge1xuXHRcdGlmIChyZXN1bHQuYXBwbHkpIHtcblx0XHRcdHZhciBtb2R1bGVzID0gcmVzdWx0LmFwcGx5KHJlcG9ydEVycm9yKTtcblx0XHRcdGlmIChtb2R1bGVzKSB7XG5cdFx0XHRcdGZvciAodmFyIGkgPSAwOyBpIDwgbW9kdWxlcy5sZW5ndGg7IGkrKykge1xuXHRcdFx0XHRcdG91dGRhdGVkTW9kdWxlcy5wdXNoKG1vZHVsZXNbaV0pO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXHR9KTtcblxuXHRyZXR1cm4gUHJvbWlzZS5hbGwoW2Rpc3Bvc2VQcm9taXNlLCBhcHBseVByb21pc2VdKS50aGVuKGZ1bmN0aW9uICgpIHtcblx0XHQvLyBoYW5kbGUgZXJyb3JzIGluIGFjY2VwdCBoYW5kbGVycyBhbmQgc2VsZiBhY2NlcHRlZCBtb2R1bGUgbG9hZFxuXHRcdGlmIChlcnJvcikge1xuXHRcdFx0cmV0dXJuIHNldFN0YXR1cyhcImZhaWxcIikudGhlbihmdW5jdGlvbiAoKSB7XG5cdFx0XHRcdHRocm93IGVycm9yO1xuXHRcdFx0fSk7XG5cdFx0fVxuXG5cdFx0aWYgKHF1ZXVlZEludmFsaWRhdGVkTW9kdWxlcykge1xuXHRcdFx0cmV0dXJuIGludGVybmFsQXBwbHkob3B0aW9ucykudGhlbihmdW5jdGlvbiAobGlzdCkge1xuXHRcdFx0XHRvdXRkYXRlZE1vZHVsZXMuZm9yRWFjaChmdW5jdGlvbiAobW9kdWxlSWQpIHtcblx0XHRcdFx0XHRpZiAobGlzdC5pbmRleE9mKG1vZHVsZUlkKSA8IDApIGxpc3QucHVzaChtb2R1bGVJZCk7XG5cdFx0XHRcdH0pO1xuXHRcdFx0XHRyZXR1cm4gbGlzdDtcblx0XHRcdH0pO1xuXHRcdH1cblxuXHRcdHJldHVybiBzZXRTdGF0dXMoXCJpZGxlXCIpLnRoZW4oZnVuY3Rpb24gKCkge1xuXHRcdFx0cmV0dXJuIG91dGRhdGVkTW9kdWxlcztcblx0XHR9KTtcblx0fSk7XG59XG5cbmZ1bmN0aW9uIGFwcGx5SW52YWxpZGF0ZWRNb2R1bGVzKCkge1xuXHRpZiAocXVldWVkSW52YWxpZGF0ZWRNb2R1bGVzKSB7XG5cdFx0aWYgKCFjdXJyZW50VXBkYXRlQXBwbHlIYW5kbGVycykgY3VycmVudFVwZGF0ZUFwcGx5SGFuZGxlcnMgPSBbXTtcblx0XHRPYmplY3Qua2V5cyhfX3dlYnBhY2tfcmVxdWlyZV9fLmhtckkpLmZvckVhY2goZnVuY3Rpb24gKGtleSkge1xuXHRcdFx0cXVldWVkSW52YWxpZGF0ZWRNb2R1bGVzLmZvckVhY2goZnVuY3Rpb24gKG1vZHVsZUlkKSB7XG5cdFx0XHRcdF9fd2VicGFja19yZXF1aXJlX18uaG1ySVtrZXldKFxuXHRcdFx0XHRcdG1vZHVsZUlkLFxuXHRcdFx0XHRcdGN1cnJlbnRVcGRhdGVBcHBseUhhbmRsZXJzXG5cdFx0XHRcdCk7XG5cdFx0XHR9KTtcblx0XHR9KTtcblx0XHRxdWV1ZWRJbnZhbGlkYXRlZE1vZHVsZXMgPSB1bmRlZmluZWQ7XG5cdFx0cmV0dXJuIHRydWU7XG5cdH1cbn0iLCJ2YXIgc2NyaXB0VXJsO1xuaWYgKF9fd2VicGFja19yZXF1aXJlX18uZy5pbXBvcnRTY3JpcHRzKSBzY3JpcHRVcmwgPSBfX3dlYnBhY2tfcmVxdWlyZV9fLmcubG9jYXRpb24gKyBcIlwiO1xudmFyIGRvY3VtZW50ID0gX193ZWJwYWNrX3JlcXVpcmVfXy5nLmRvY3VtZW50O1xuaWYgKCFzY3JpcHRVcmwgJiYgZG9jdW1lbnQpIHtcblx0aWYgKGRvY3VtZW50LmN1cnJlbnRTY3JpcHQpXG5cdFx0c2NyaXB0VXJsID0gZG9jdW1lbnQuY3VycmVudFNjcmlwdC5zcmM7XG5cdGlmICghc2NyaXB0VXJsKSB7XG5cdFx0dmFyIHNjcmlwdHMgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZShcInNjcmlwdFwiKTtcblx0XHRpZihzY3JpcHRzLmxlbmd0aCkge1xuXHRcdFx0dmFyIGkgPSBzY3JpcHRzLmxlbmd0aCAtIDE7XG5cdFx0XHR3aGlsZSAoaSA+IC0xICYmICghc2NyaXB0VXJsIHx8ICEvXmh0dHAocz8pOi8udGVzdChzY3JpcHRVcmwpKSkgc2NyaXB0VXJsID0gc2NyaXB0c1tpLS1dLnNyYztcblx0XHR9XG5cdH1cbn1cbi8vIFdoZW4gc3VwcG9ydGluZyBicm93c2VycyB3aGVyZSBhbiBhdXRvbWF0aWMgcHVibGljUGF0aCBpcyBub3Qgc3VwcG9ydGVkIHlvdSBtdXN0IHNwZWNpZnkgYW4gb3V0cHV0LnB1YmxpY1BhdGggbWFudWFsbHkgdmlhIGNvbmZpZ3VyYXRpb25cbi8vIG9yIHBhc3MgYW4gZW1wdHkgc3RyaW5nIChcIlwiKSBhbmQgc2V0IHRoZSBfX3dlYnBhY2tfcHVibGljX3BhdGhfXyB2YXJpYWJsZSBmcm9tIHlvdXIgY29kZSB0byB1c2UgeW91ciBvd24gbG9naWMuXG5pZiAoIXNjcmlwdFVybCkgdGhyb3cgbmV3IEVycm9yKFwiQXV0b21hdGljIHB1YmxpY1BhdGggaXMgbm90IHN1cHBvcnRlZCBpbiB0aGlzIGJyb3dzZXJcIik7XG5zY3JpcHRVcmwgPSBzY3JpcHRVcmwucmVwbGFjZSgvIy4qJC8sIFwiXCIpLnJlcGxhY2UoL1xcPy4qJC8sIFwiXCIpLnJlcGxhY2UoL1xcL1teXFwvXSskLywgXCIvXCIpO1xuX193ZWJwYWNrX3JlcXVpcmVfXy5wID0gc2NyaXB0VXJsOyIsImlmICh0eXBlb2YgZG9jdW1lbnQgPT09IFwidW5kZWZpbmVkXCIpIHJldHVybjtcbnZhciBjcmVhdGVTdHlsZXNoZWV0ID0gKGNodW5rSWQsIGZ1bGxocmVmLCBvbGRUYWcsIHJlc29sdmUsIHJlamVjdCkgPT4ge1xuXHR2YXIgbGlua1RhZyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJsaW5rXCIpO1xuXG5cdGxpbmtUYWcucmVsID0gXCJzdHlsZXNoZWV0XCI7XG5cdGxpbmtUYWcudHlwZSA9IFwidGV4dC9jc3NcIjtcblx0aWYgKF9fd2VicGFja19yZXF1aXJlX18ubmMpIHtcblx0XHRsaW5rVGFnLm5vbmNlID0gX193ZWJwYWNrX3JlcXVpcmVfXy5uYztcblx0fVxuXHR2YXIgb25MaW5rQ29tcGxldGUgPSAoZXZlbnQpID0+IHtcblx0XHQvLyBhdm9pZCBtZW0gbGVha3MuXG5cdFx0bGlua1RhZy5vbmVycm9yID0gbGlua1RhZy5vbmxvYWQgPSBudWxsO1xuXHRcdGlmIChldmVudC50eXBlID09PSAnbG9hZCcpIHtcblx0XHRcdHJlc29sdmUoKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0dmFyIGVycm9yVHlwZSA9IGV2ZW50ICYmIGV2ZW50LnR5cGU7XG5cdFx0XHR2YXIgcmVhbEhyZWYgPSBldmVudCAmJiBldmVudC50YXJnZXQgJiYgZXZlbnQudGFyZ2V0LmhyZWYgfHwgZnVsbGhyZWY7XG5cdFx0XHR2YXIgZXJyID0gbmV3IEVycm9yKFwiTG9hZGluZyBDU1MgY2h1bmsgXCIgKyBjaHVua0lkICsgXCIgZmFpbGVkLlxcbihcIiArIGVycm9yVHlwZSArIFwiOiBcIiArIHJlYWxIcmVmICsgXCIpXCIpO1xuXHRcdFx0ZXJyLm5hbWUgPSBcIkNodW5rTG9hZEVycm9yXCI7XG5cdFx0XHRlcnIuY29kZSA9IFwiQ1NTX0NIVU5LX0xPQURfRkFJTEVEXCI7XG5cdFx0XHRlcnIudHlwZSA9IGVycm9yVHlwZTtcblx0XHRcdGVyci5yZXF1ZXN0ID0gcmVhbEhyZWY7XG5cdFx0XHRpZiAobGlua1RhZy5wYXJlbnROb2RlKSBsaW5rVGFnLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQobGlua1RhZylcblx0XHRcdHJlamVjdChlcnIpO1xuXHRcdH1cblx0fVxuXHRsaW5rVGFnLm9uZXJyb3IgPSBsaW5rVGFnLm9ubG9hZCA9IG9uTGlua0NvbXBsZXRlO1xuXHRsaW5rVGFnLmhyZWYgPSBmdWxsaHJlZjtcblxuXG5cdGlmIChvbGRUYWcpIHtcblx0XHRvbGRUYWcucGFyZW50Tm9kZS5pbnNlcnRCZWZvcmUobGlua1RhZywgb2xkVGFnLm5leHRTaWJsaW5nKTtcblx0fSBlbHNlIHtcblx0XHRkb2N1bWVudC5oZWFkLmFwcGVuZENoaWxkKGxpbmtUYWcpO1xuXHR9XG5cdHJldHVybiBsaW5rVGFnO1xufTtcbnZhciBmaW5kU3R5bGVzaGVldCA9IChocmVmLCBmdWxsaHJlZikgPT4ge1xuXHR2YXIgZXhpc3RpbmdMaW5rVGFncyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKFwibGlua1wiKTtcblx0Zm9yKHZhciBpID0gMDsgaSA8IGV4aXN0aW5nTGlua1RhZ3MubGVuZ3RoOyBpKyspIHtcblx0XHR2YXIgdGFnID0gZXhpc3RpbmdMaW5rVGFnc1tpXTtcblx0XHR2YXIgZGF0YUhyZWYgPSB0YWcuZ2V0QXR0cmlidXRlKFwiZGF0YS1ocmVmXCIpIHx8IHRhZy5nZXRBdHRyaWJ1dGUoXCJocmVmXCIpO1xuXHRcdGlmKHRhZy5yZWwgPT09IFwic3R5bGVzaGVldFwiICYmIChkYXRhSHJlZiA9PT0gaHJlZiB8fCBkYXRhSHJlZiA9PT0gZnVsbGhyZWYpKSByZXR1cm4gdGFnO1xuXHR9XG5cdHZhciBleGlzdGluZ1N0eWxlVGFncyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKFwic3R5bGVcIik7XG5cdGZvcih2YXIgaSA9IDA7IGkgPCBleGlzdGluZ1N0eWxlVGFncy5sZW5ndGg7IGkrKykge1xuXHRcdHZhciB0YWcgPSBleGlzdGluZ1N0eWxlVGFnc1tpXTtcblx0XHR2YXIgZGF0YUhyZWYgPSB0YWcuZ2V0QXR0cmlidXRlKFwiZGF0YS1ocmVmXCIpO1xuXHRcdGlmKGRhdGFIcmVmID09PSBocmVmIHx8IGRhdGFIcmVmID09PSBmdWxsaHJlZikgcmV0dXJuIHRhZztcblx0fVxufTtcbnZhciBsb2FkU3R5bGVzaGVldCA9IChjaHVua0lkKSA9PiB7XG5cdHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG5cdFx0dmFyIGhyZWYgPSBfX3dlYnBhY2tfcmVxdWlyZV9fLm1pbmlDc3NGKGNodW5rSWQpO1xuXHRcdHZhciBmdWxsaHJlZiA9IF9fd2VicGFja19yZXF1aXJlX18ucCArIGhyZWY7XG5cdFx0aWYoZmluZFN0eWxlc2hlZXQoaHJlZiwgZnVsbGhyZWYpKSByZXR1cm4gcmVzb2x2ZSgpO1xuXHRcdGNyZWF0ZVN0eWxlc2hlZXQoY2h1bmtJZCwgZnVsbGhyZWYsIG51bGwsIHJlc29sdmUsIHJlamVjdCk7XG5cdH0pO1xufVxuLy8gbm8gY2h1bmsgbG9hZGluZ1xuXG52YXIgb2xkVGFncyA9IFtdO1xudmFyIG5ld1RhZ3MgPSBbXTtcbnZhciBhcHBseUhhbmRsZXIgPSAob3B0aW9ucykgPT4ge1xuXHRyZXR1cm4geyBkaXNwb3NlOiAoKSA9PiB7XG5cdFx0Zm9yKHZhciBpID0gMDsgaSA8IG9sZFRhZ3MubGVuZ3RoOyBpKyspIHtcblx0XHRcdHZhciBvbGRUYWcgPSBvbGRUYWdzW2ldO1xuXHRcdFx0aWYob2xkVGFnLnBhcmVudE5vZGUpIG9sZFRhZy5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKG9sZFRhZyk7XG5cdFx0fVxuXHRcdG9sZFRhZ3MubGVuZ3RoID0gMDtcblx0fSwgYXBwbHk6ICgpID0+IHtcblx0XHRmb3IodmFyIGkgPSAwOyBpIDwgbmV3VGFncy5sZW5ndGg7IGkrKykgbmV3VGFnc1tpXS5yZWwgPSBcInN0eWxlc2hlZXRcIjtcblx0XHRuZXdUYWdzLmxlbmd0aCA9IDA7XG5cdH0gfTtcbn1cbl9fd2VicGFja19yZXF1aXJlX18uaG1yQy5taW5pQ3NzID0gKGNodW5rSWRzLCByZW1vdmVkQ2h1bmtzLCByZW1vdmVkTW9kdWxlcywgcHJvbWlzZXMsIGFwcGx5SGFuZGxlcnMsIHVwZGF0ZWRNb2R1bGVzTGlzdCkgPT4ge1xuXHRhcHBseUhhbmRsZXJzLnB1c2goYXBwbHlIYW5kbGVyKTtcblx0Y2h1bmtJZHMuZm9yRWFjaCgoY2h1bmtJZCkgPT4ge1xuXHRcdHZhciBocmVmID0gX193ZWJwYWNrX3JlcXVpcmVfXy5taW5pQ3NzRihjaHVua0lkKTtcblx0XHR2YXIgZnVsbGhyZWYgPSBfX3dlYnBhY2tfcmVxdWlyZV9fLnAgKyBocmVmO1xuXHRcdHZhciBvbGRUYWcgPSBmaW5kU3R5bGVzaGVldChocmVmLCBmdWxsaHJlZik7XG5cdFx0aWYoIW9sZFRhZykgcmV0dXJuO1xuXHRcdHByb21pc2VzLnB1c2gobmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuXHRcdFx0dmFyIHRhZyA9IGNyZWF0ZVN0eWxlc2hlZXQoY2h1bmtJZCwgZnVsbGhyZWYsIG9sZFRhZywgKCkgPT4ge1xuXHRcdFx0XHR0YWcuYXMgPSBcInN0eWxlXCI7XG5cdFx0XHRcdHRhZy5yZWwgPSBcInByZWxvYWRcIjtcblx0XHRcdFx0cmVzb2x2ZSgpO1xuXHRcdFx0fSwgcmVqZWN0KTtcblx0XHRcdG9sZFRhZ3MucHVzaChvbGRUYWcpO1xuXHRcdFx0bmV3VGFncy5wdXNoKHRhZyk7XG5cdFx0fSkpO1xuXHR9KTtcbn0iLCIvLyBubyBiYXNlVVJJXG5cbi8vIG9iamVjdCB0byBzdG9yZSBsb2FkZWQgYW5kIGxvYWRpbmcgY2h1bmtzXG4vLyB1bmRlZmluZWQgPSBjaHVuayBub3QgbG9hZGVkLCBudWxsID0gY2h1bmsgcHJlbG9hZGVkL3ByZWZldGNoZWRcbi8vIFtyZXNvbHZlLCByZWplY3QsIFByb21pc2VdID0gY2h1bmsgbG9hZGluZywgMCA9IGNodW5rIGxvYWRlZFxudmFyIGluc3RhbGxlZENodW5rcyA9IF9fd2VicGFja19yZXF1aXJlX18uaG1yU19qc29ucCA9IF9fd2VicGFja19yZXF1aXJlX18uaG1yU19qc29ucCB8fCB7XG5cdFwibWFpblwiOiAwXG59O1xuXG4vLyBubyBjaHVuayBvbiBkZW1hbmQgbG9hZGluZ1xuXG4vLyBubyBwcmVmZXRjaGluZ1xuXG4vLyBubyBwcmVsb2FkZWRcblxudmFyIGN1cnJlbnRVcGRhdGVkTW9kdWxlc0xpc3Q7XG52YXIgd2FpdGluZ1VwZGF0ZVJlc29sdmVzID0ge307XG5mdW5jdGlvbiBsb2FkVXBkYXRlQ2h1bmsoY2h1bmtJZCwgdXBkYXRlZE1vZHVsZXNMaXN0KSB7XG5cdGN1cnJlbnRVcGRhdGVkTW9kdWxlc0xpc3QgPSB1cGRhdGVkTW9kdWxlc0xpc3Q7XG5cdHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG5cdFx0d2FpdGluZ1VwZGF0ZVJlc29sdmVzW2NodW5rSWRdID0gcmVzb2x2ZTtcblx0XHQvLyBzdGFydCB1cGRhdGUgY2h1bmsgbG9hZGluZ1xuXHRcdHZhciB1cmwgPSBfX3dlYnBhY2tfcmVxdWlyZV9fLnAgKyBfX3dlYnBhY2tfcmVxdWlyZV9fLmh1KGNodW5rSWQpO1xuXHRcdC8vIGNyZWF0ZSBlcnJvciBiZWZvcmUgc3RhY2sgdW53b3VuZCB0byBnZXQgdXNlZnVsIHN0YWNrdHJhY2UgbGF0ZXJcblx0XHR2YXIgZXJyb3IgPSBuZXcgRXJyb3IoKTtcblx0XHR2YXIgbG9hZGluZ0VuZGVkID0gKGV2ZW50KSA9PiB7XG5cdFx0XHRpZih3YWl0aW5nVXBkYXRlUmVzb2x2ZXNbY2h1bmtJZF0pIHtcblx0XHRcdFx0d2FpdGluZ1VwZGF0ZVJlc29sdmVzW2NodW5rSWRdID0gdW5kZWZpbmVkXG5cdFx0XHRcdHZhciBlcnJvclR5cGUgPSBldmVudCAmJiAoZXZlbnQudHlwZSA9PT0gJ2xvYWQnID8gJ21pc3NpbmcnIDogZXZlbnQudHlwZSk7XG5cdFx0XHRcdHZhciByZWFsU3JjID0gZXZlbnQgJiYgZXZlbnQudGFyZ2V0ICYmIGV2ZW50LnRhcmdldC5zcmM7XG5cdFx0XHRcdGVycm9yLm1lc3NhZ2UgPSAnTG9hZGluZyBob3QgdXBkYXRlIGNodW5rICcgKyBjaHVua0lkICsgJyBmYWlsZWQuXFxuKCcgKyBlcnJvclR5cGUgKyAnOiAnICsgcmVhbFNyYyArICcpJztcblx0XHRcdFx0ZXJyb3IubmFtZSA9ICdDaHVua0xvYWRFcnJvcic7XG5cdFx0XHRcdGVycm9yLnR5cGUgPSBlcnJvclR5cGU7XG5cdFx0XHRcdGVycm9yLnJlcXVlc3QgPSByZWFsU3JjO1xuXHRcdFx0XHRyZWplY3QoZXJyb3IpO1xuXHRcdFx0fVxuXHRcdH07XG5cdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5sKHVybCwgbG9hZGluZ0VuZGVkKTtcblx0fSk7XG59XG5cbnNlbGZbXCJ3ZWJwYWNrSG90VXBkYXRlbXlfaG9sc3Rfc2l0ZVwiXSA9IChjaHVua0lkLCBtb3JlTW9kdWxlcywgcnVudGltZSkgPT4ge1xuXHRmb3IodmFyIG1vZHVsZUlkIGluIG1vcmVNb2R1bGVzKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKG1vcmVNb2R1bGVzLCBtb2R1bGVJZCkpIHtcblx0XHRcdGN1cnJlbnRVcGRhdGVbbW9kdWxlSWRdID0gbW9yZU1vZHVsZXNbbW9kdWxlSWRdO1xuXHRcdFx0aWYoY3VycmVudFVwZGF0ZWRNb2R1bGVzTGlzdCkgY3VycmVudFVwZGF0ZWRNb2R1bGVzTGlzdC5wdXNoKG1vZHVsZUlkKTtcblx0XHR9XG5cdH1cblx0aWYocnVudGltZSkgY3VycmVudFVwZGF0ZVJ1bnRpbWUucHVzaChydW50aW1lKTtcblx0aWYod2FpdGluZ1VwZGF0ZVJlc29sdmVzW2NodW5rSWRdKSB7XG5cdFx0d2FpdGluZ1VwZGF0ZVJlc29sdmVzW2NodW5rSWRdKCk7XG5cdFx0d2FpdGluZ1VwZGF0ZVJlc29sdmVzW2NodW5rSWRdID0gdW5kZWZpbmVkO1xuXHR9XG59O1xuXG52YXIgY3VycmVudFVwZGF0ZUNodW5rcztcbnZhciBjdXJyZW50VXBkYXRlO1xudmFyIGN1cnJlbnRVcGRhdGVSZW1vdmVkQ2h1bmtzO1xudmFyIGN1cnJlbnRVcGRhdGVSdW50aW1lO1xuZnVuY3Rpb24gYXBwbHlIYW5kbGVyKG9wdGlvbnMpIHtcblx0aWYgKF9fd2VicGFja19yZXF1aXJlX18uZikgZGVsZXRlIF9fd2VicGFja19yZXF1aXJlX18uZi5qc29ucEhtcjtcblx0Y3VycmVudFVwZGF0ZUNodW5rcyA9IHVuZGVmaW5lZDtcblx0ZnVuY3Rpb24gZ2V0QWZmZWN0ZWRNb2R1bGVFZmZlY3RzKHVwZGF0ZU1vZHVsZUlkKSB7XG5cdFx0dmFyIG91dGRhdGVkTW9kdWxlcyA9IFt1cGRhdGVNb2R1bGVJZF07XG5cdFx0dmFyIG91dGRhdGVkRGVwZW5kZW5jaWVzID0ge307XG5cblx0XHR2YXIgcXVldWUgPSBvdXRkYXRlZE1vZHVsZXMubWFwKGZ1bmN0aW9uIChpZCkge1xuXHRcdFx0cmV0dXJuIHtcblx0XHRcdFx0Y2hhaW46IFtpZF0sXG5cdFx0XHRcdGlkOiBpZFxuXHRcdFx0fTtcblx0XHR9KTtcblx0XHR3aGlsZSAocXVldWUubGVuZ3RoID4gMCkge1xuXHRcdFx0dmFyIHF1ZXVlSXRlbSA9IHF1ZXVlLnBvcCgpO1xuXHRcdFx0dmFyIG1vZHVsZUlkID0gcXVldWVJdGVtLmlkO1xuXHRcdFx0dmFyIGNoYWluID0gcXVldWVJdGVtLmNoYWluO1xuXHRcdFx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19yZXF1aXJlX18uY1ttb2R1bGVJZF07XG5cdFx0XHRpZiAoXG5cdFx0XHRcdCFtb2R1bGUgfHxcblx0XHRcdFx0KG1vZHVsZS5ob3QuX3NlbGZBY2NlcHRlZCAmJiAhbW9kdWxlLmhvdC5fc2VsZkludmFsaWRhdGVkKVxuXHRcdFx0KVxuXHRcdFx0XHRjb250aW51ZTtcblx0XHRcdGlmIChtb2R1bGUuaG90Ll9zZWxmRGVjbGluZWQpIHtcblx0XHRcdFx0cmV0dXJuIHtcblx0XHRcdFx0XHR0eXBlOiBcInNlbGYtZGVjbGluZWRcIixcblx0XHRcdFx0XHRjaGFpbjogY2hhaW4sXG5cdFx0XHRcdFx0bW9kdWxlSWQ6IG1vZHVsZUlkXG5cdFx0XHRcdH07XG5cdFx0XHR9XG5cdFx0XHRpZiAobW9kdWxlLmhvdC5fbWFpbikge1xuXHRcdFx0XHRyZXR1cm4ge1xuXHRcdFx0XHRcdHR5cGU6IFwidW5hY2NlcHRlZFwiLFxuXHRcdFx0XHRcdGNoYWluOiBjaGFpbixcblx0XHRcdFx0XHRtb2R1bGVJZDogbW9kdWxlSWRcblx0XHRcdFx0fTtcblx0XHRcdH1cblx0XHRcdGZvciAodmFyIGkgPSAwOyBpIDwgbW9kdWxlLnBhcmVudHMubGVuZ3RoOyBpKyspIHtcblx0XHRcdFx0dmFyIHBhcmVudElkID0gbW9kdWxlLnBhcmVudHNbaV07XG5cdFx0XHRcdHZhciBwYXJlbnQgPSBfX3dlYnBhY2tfcmVxdWlyZV9fLmNbcGFyZW50SWRdO1xuXHRcdFx0XHRpZiAoIXBhcmVudCkgY29udGludWU7XG5cdFx0XHRcdGlmIChwYXJlbnQuaG90Ll9kZWNsaW5lZERlcGVuZGVuY2llc1ttb2R1bGVJZF0pIHtcblx0XHRcdFx0XHRyZXR1cm4ge1xuXHRcdFx0XHRcdFx0dHlwZTogXCJkZWNsaW5lZFwiLFxuXHRcdFx0XHRcdFx0Y2hhaW46IGNoYWluLmNvbmNhdChbcGFyZW50SWRdKSxcblx0XHRcdFx0XHRcdG1vZHVsZUlkOiBtb2R1bGVJZCxcblx0XHRcdFx0XHRcdHBhcmVudElkOiBwYXJlbnRJZFxuXHRcdFx0XHRcdH07XG5cdFx0XHRcdH1cblx0XHRcdFx0aWYgKG91dGRhdGVkTW9kdWxlcy5pbmRleE9mKHBhcmVudElkKSAhPT0gLTEpIGNvbnRpbnVlO1xuXHRcdFx0XHRpZiAocGFyZW50LmhvdC5fYWNjZXB0ZWREZXBlbmRlbmNpZXNbbW9kdWxlSWRdKSB7XG5cdFx0XHRcdFx0aWYgKCFvdXRkYXRlZERlcGVuZGVuY2llc1twYXJlbnRJZF0pXG5cdFx0XHRcdFx0XHRvdXRkYXRlZERlcGVuZGVuY2llc1twYXJlbnRJZF0gPSBbXTtcblx0XHRcdFx0XHRhZGRBbGxUb1NldChvdXRkYXRlZERlcGVuZGVuY2llc1twYXJlbnRJZF0sIFttb2R1bGVJZF0pO1xuXHRcdFx0XHRcdGNvbnRpbnVlO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGRlbGV0ZSBvdXRkYXRlZERlcGVuZGVuY2llc1twYXJlbnRJZF07XG5cdFx0XHRcdG91dGRhdGVkTW9kdWxlcy5wdXNoKHBhcmVudElkKTtcblx0XHRcdFx0cXVldWUucHVzaCh7XG5cdFx0XHRcdFx0Y2hhaW46IGNoYWluLmNvbmNhdChbcGFyZW50SWRdKSxcblx0XHRcdFx0XHRpZDogcGFyZW50SWRcblx0XHRcdFx0fSk7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0cmV0dXJuIHtcblx0XHRcdHR5cGU6IFwiYWNjZXB0ZWRcIixcblx0XHRcdG1vZHVsZUlkOiB1cGRhdGVNb2R1bGVJZCxcblx0XHRcdG91dGRhdGVkTW9kdWxlczogb3V0ZGF0ZWRNb2R1bGVzLFxuXHRcdFx0b3V0ZGF0ZWREZXBlbmRlbmNpZXM6IG91dGRhdGVkRGVwZW5kZW5jaWVzXG5cdFx0fTtcblx0fVxuXG5cdGZ1bmN0aW9uIGFkZEFsbFRvU2V0KGEsIGIpIHtcblx0XHRmb3IgKHZhciBpID0gMDsgaSA8IGIubGVuZ3RoOyBpKyspIHtcblx0XHRcdHZhciBpdGVtID0gYltpXTtcblx0XHRcdGlmIChhLmluZGV4T2YoaXRlbSkgPT09IC0xKSBhLnB1c2goaXRlbSk7XG5cdFx0fVxuXHR9XG5cblx0Ly8gYXQgYmVnaW4gYWxsIHVwZGF0ZXMgbW9kdWxlcyBhcmUgb3V0ZGF0ZWRcblx0Ly8gdGhlIFwib3V0ZGF0ZWRcIiBzdGF0dXMgY2FuIHByb3BhZ2F0ZSB0byBwYXJlbnRzIGlmIHRoZXkgZG9uJ3QgYWNjZXB0IHRoZSBjaGlsZHJlblxuXHR2YXIgb3V0ZGF0ZWREZXBlbmRlbmNpZXMgPSB7fTtcblx0dmFyIG91dGRhdGVkTW9kdWxlcyA9IFtdO1xuXHR2YXIgYXBwbGllZFVwZGF0ZSA9IHt9O1xuXG5cdHZhciB3YXJuVW5leHBlY3RlZFJlcXVpcmUgPSBmdW5jdGlvbiB3YXJuVW5leHBlY3RlZFJlcXVpcmUobW9kdWxlKSB7XG5cdFx0Y29uc29sZS53YXJuKFxuXHRcdFx0XCJbSE1SXSB1bmV4cGVjdGVkIHJlcXVpcmUoXCIgKyBtb2R1bGUuaWQgKyBcIikgdG8gZGlzcG9zZWQgbW9kdWxlXCJcblx0XHQpO1xuXHR9O1xuXG5cdGZvciAodmFyIG1vZHVsZUlkIGluIGN1cnJlbnRVcGRhdGUpIHtcblx0XHRpZiAoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGN1cnJlbnRVcGRhdGUsIG1vZHVsZUlkKSkge1xuXHRcdFx0dmFyIG5ld01vZHVsZUZhY3RvcnkgPSBjdXJyZW50VXBkYXRlW21vZHVsZUlkXTtcblx0XHRcdC8qKiBAdHlwZSB7VE9ET30gKi9cblx0XHRcdHZhciByZXN1bHQ7XG5cdFx0XHRpZiAobmV3TW9kdWxlRmFjdG9yeSkge1xuXHRcdFx0XHRyZXN1bHQgPSBnZXRBZmZlY3RlZE1vZHVsZUVmZmVjdHMobW9kdWxlSWQpO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0cmVzdWx0ID0ge1xuXHRcdFx0XHRcdHR5cGU6IFwiZGlzcG9zZWRcIixcblx0XHRcdFx0XHRtb2R1bGVJZDogbW9kdWxlSWRcblx0XHRcdFx0fTtcblx0XHRcdH1cblx0XHRcdC8qKiBAdHlwZSB7RXJyb3J8ZmFsc2V9ICovXG5cdFx0XHR2YXIgYWJvcnRFcnJvciA9IGZhbHNlO1xuXHRcdFx0dmFyIGRvQXBwbHkgPSBmYWxzZTtcblx0XHRcdHZhciBkb0Rpc3Bvc2UgPSBmYWxzZTtcblx0XHRcdHZhciBjaGFpbkluZm8gPSBcIlwiO1xuXHRcdFx0aWYgKHJlc3VsdC5jaGFpbikge1xuXHRcdFx0XHRjaGFpbkluZm8gPSBcIlxcblVwZGF0ZSBwcm9wYWdhdGlvbjogXCIgKyByZXN1bHQuY2hhaW4uam9pbihcIiAtPiBcIik7XG5cdFx0XHR9XG5cdFx0XHRzd2l0Y2ggKHJlc3VsdC50eXBlKSB7XG5cdFx0XHRcdGNhc2UgXCJzZWxmLWRlY2xpbmVkXCI6XG5cdFx0XHRcdFx0aWYgKG9wdGlvbnMub25EZWNsaW5lZCkgb3B0aW9ucy5vbkRlY2xpbmVkKHJlc3VsdCk7XG5cdFx0XHRcdFx0aWYgKCFvcHRpb25zLmlnbm9yZURlY2xpbmVkKVxuXHRcdFx0XHRcdFx0YWJvcnRFcnJvciA9IG5ldyBFcnJvcihcblx0XHRcdFx0XHRcdFx0XCJBYm9ydGVkIGJlY2F1c2Ugb2Ygc2VsZiBkZWNsaW5lOiBcIiArXG5cdFx0XHRcdFx0XHRcdFx0cmVzdWx0Lm1vZHVsZUlkICtcblx0XHRcdFx0XHRcdFx0XHRjaGFpbkluZm9cblx0XHRcdFx0XHRcdCk7XG5cdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdGNhc2UgXCJkZWNsaW5lZFwiOlxuXHRcdFx0XHRcdGlmIChvcHRpb25zLm9uRGVjbGluZWQpIG9wdGlvbnMub25EZWNsaW5lZChyZXN1bHQpO1xuXHRcdFx0XHRcdGlmICghb3B0aW9ucy5pZ25vcmVEZWNsaW5lZClcblx0XHRcdFx0XHRcdGFib3J0RXJyb3IgPSBuZXcgRXJyb3IoXG5cdFx0XHRcdFx0XHRcdFwiQWJvcnRlZCBiZWNhdXNlIG9mIGRlY2xpbmVkIGRlcGVuZGVuY3k6IFwiICtcblx0XHRcdFx0XHRcdFx0XHRyZXN1bHQubW9kdWxlSWQgK1xuXHRcdFx0XHRcdFx0XHRcdFwiIGluIFwiICtcblx0XHRcdFx0XHRcdFx0XHRyZXN1bHQucGFyZW50SWQgK1xuXHRcdFx0XHRcdFx0XHRcdGNoYWluSW5mb1xuXHRcdFx0XHRcdFx0KTtcblx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0Y2FzZSBcInVuYWNjZXB0ZWRcIjpcblx0XHRcdFx0XHRpZiAob3B0aW9ucy5vblVuYWNjZXB0ZWQpIG9wdGlvbnMub25VbmFjY2VwdGVkKHJlc3VsdCk7XG5cdFx0XHRcdFx0aWYgKCFvcHRpb25zLmlnbm9yZVVuYWNjZXB0ZWQpXG5cdFx0XHRcdFx0XHRhYm9ydEVycm9yID0gbmV3IEVycm9yKFxuXHRcdFx0XHRcdFx0XHRcIkFib3J0ZWQgYmVjYXVzZSBcIiArIG1vZHVsZUlkICsgXCIgaXMgbm90IGFjY2VwdGVkXCIgKyBjaGFpbkluZm9cblx0XHRcdFx0XHRcdCk7XG5cdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdGNhc2UgXCJhY2NlcHRlZFwiOlxuXHRcdFx0XHRcdGlmIChvcHRpb25zLm9uQWNjZXB0ZWQpIG9wdGlvbnMub25BY2NlcHRlZChyZXN1bHQpO1xuXHRcdFx0XHRcdGRvQXBwbHkgPSB0cnVlO1xuXHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRjYXNlIFwiZGlzcG9zZWRcIjpcblx0XHRcdFx0XHRpZiAob3B0aW9ucy5vbkRpc3Bvc2VkKSBvcHRpb25zLm9uRGlzcG9zZWQocmVzdWx0KTtcblx0XHRcdFx0XHRkb0Rpc3Bvc2UgPSB0cnVlO1xuXHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRkZWZhdWx0OlxuXHRcdFx0XHRcdHRocm93IG5ldyBFcnJvcihcIlVuZXhjZXB0aW9uIHR5cGUgXCIgKyByZXN1bHQudHlwZSk7XG5cdFx0XHR9XG5cdFx0XHRpZiAoYWJvcnRFcnJvcikge1xuXHRcdFx0XHRyZXR1cm4ge1xuXHRcdFx0XHRcdGVycm9yOiBhYm9ydEVycm9yXG5cdFx0XHRcdH07XG5cdFx0XHR9XG5cdFx0XHRpZiAoZG9BcHBseSkge1xuXHRcdFx0XHRhcHBsaWVkVXBkYXRlW21vZHVsZUlkXSA9IG5ld01vZHVsZUZhY3Rvcnk7XG5cdFx0XHRcdGFkZEFsbFRvU2V0KG91dGRhdGVkTW9kdWxlcywgcmVzdWx0Lm91dGRhdGVkTW9kdWxlcyk7XG5cdFx0XHRcdGZvciAobW9kdWxlSWQgaW4gcmVzdWx0Lm91dGRhdGVkRGVwZW5kZW5jaWVzKSB7XG5cdFx0XHRcdFx0aWYgKF9fd2VicGFja19yZXF1aXJlX18ubyhyZXN1bHQub3V0ZGF0ZWREZXBlbmRlbmNpZXMsIG1vZHVsZUlkKSkge1xuXHRcdFx0XHRcdFx0aWYgKCFvdXRkYXRlZERlcGVuZGVuY2llc1ttb2R1bGVJZF0pXG5cdFx0XHRcdFx0XHRcdG91dGRhdGVkRGVwZW5kZW5jaWVzW21vZHVsZUlkXSA9IFtdO1xuXHRcdFx0XHRcdFx0YWRkQWxsVG9TZXQoXG5cdFx0XHRcdFx0XHRcdG91dGRhdGVkRGVwZW5kZW5jaWVzW21vZHVsZUlkXSxcblx0XHRcdFx0XHRcdFx0cmVzdWx0Lm91dGRhdGVkRGVwZW5kZW5jaWVzW21vZHVsZUlkXVxuXHRcdFx0XHRcdFx0KTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHRcdGlmIChkb0Rpc3Bvc2UpIHtcblx0XHRcdFx0YWRkQWxsVG9TZXQob3V0ZGF0ZWRNb2R1bGVzLCBbcmVzdWx0Lm1vZHVsZUlkXSk7XG5cdFx0XHRcdGFwcGxpZWRVcGRhdGVbbW9kdWxlSWRdID0gd2FyblVuZXhwZWN0ZWRSZXF1aXJlO1xuXHRcdFx0fVxuXHRcdH1cblx0fVxuXHRjdXJyZW50VXBkYXRlID0gdW5kZWZpbmVkO1xuXG5cdC8vIFN0b3JlIHNlbGYgYWNjZXB0ZWQgb3V0ZGF0ZWQgbW9kdWxlcyB0byByZXF1aXJlIHRoZW0gbGF0ZXIgYnkgdGhlIG1vZHVsZSBzeXN0ZW1cblx0dmFyIG91dGRhdGVkU2VsZkFjY2VwdGVkTW9kdWxlcyA9IFtdO1xuXHRmb3IgKHZhciBqID0gMDsgaiA8IG91dGRhdGVkTW9kdWxlcy5sZW5ndGg7IGorKykge1xuXHRcdHZhciBvdXRkYXRlZE1vZHVsZUlkID0gb3V0ZGF0ZWRNb2R1bGVzW2pdO1xuXHRcdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fLmNbb3V0ZGF0ZWRNb2R1bGVJZF07XG5cdFx0aWYgKFxuXHRcdFx0bW9kdWxlICYmXG5cdFx0XHQobW9kdWxlLmhvdC5fc2VsZkFjY2VwdGVkIHx8IG1vZHVsZS5ob3QuX21haW4pICYmXG5cdFx0XHQvLyByZW1vdmVkIHNlbGYtYWNjZXB0ZWQgbW9kdWxlcyBzaG91bGQgbm90IGJlIHJlcXVpcmVkXG5cdFx0XHRhcHBsaWVkVXBkYXRlW291dGRhdGVkTW9kdWxlSWRdICE9PSB3YXJuVW5leHBlY3RlZFJlcXVpcmUgJiZcblx0XHRcdC8vIHdoZW4gY2FsbGVkIGludmFsaWRhdGUgc2VsZi1hY2NlcHRpbmcgaXMgbm90IHBvc3NpYmxlXG5cdFx0XHQhbW9kdWxlLmhvdC5fc2VsZkludmFsaWRhdGVkXG5cdFx0KSB7XG5cdFx0XHRvdXRkYXRlZFNlbGZBY2NlcHRlZE1vZHVsZXMucHVzaCh7XG5cdFx0XHRcdG1vZHVsZTogb3V0ZGF0ZWRNb2R1bGVJZCxcblx0XHRcdFx0cmVxdWlyZTogbW9kdWxlLmhvdC5fcmVxdWlyZVNlbGYsXG5cdFx0XHRcdGVycm9ySGFuZGxlcjogbW9kdWxlLmhvdC5fc2VsZkFjY2VwdGVkXG5cdFx0XHR9KTtcblx0XHR9XG5cdH1cblxuXHR2YXIgbW9kdWxlT3V0ZGF0ZWREZXBlbmRlbmNpZXM7XG5cblx0cmV0dXJuIHtcblx0XHRkaXNwb3NlOiBmdW5jdGlvbiAoKSB7XG5cdFx0XHRjdXJyZW50VXBkYXRlUmVtb3ZlZENodW5rcy5mb3JFYWNoKGZ1bmN0aW9uIChjaHVua0lkKSB7XG5cdFx0XHRcdGRlbGV0ZSBpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF07XG5cdFx0XHR9KTtcblx0XHRcdGN1cnJlbnRVcGRhdGVSZW1vdmVkQ2h1bmtzID0gdW5kZWZpbmVkO1xuXG5cdFx0XHR2YXIgaWR4O1xuXHRcdFx0dmFyIHF1ZXVlID0gb3V0ZGF0ZWRNb2R1bGVzLnNsaWNlKCk7XG5cdFx0XHR3aGlsZSAocXVldWUubGVuZ3RoID4gMCkge1xuXHRcdFx0XHR2YXIgbW9kdWxlSWQgPSBxdWV1ZS5wb3AoKTtcblx0XHRcdFx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19yZXF1aXJlX18uY1ttb2R1bGVJZF07XG5cdFx0XHRcdGlmICghbW9kdWxlKSBjb250aW51ZTtcblxuXHRcdFx0XHR2YXIgZGF0YSA9IHt9O1xuXG5cdFx0XHRcdC8vIENhbGwgZGlzcG9zZSBoYW5kbGVyc1xuXHRcdFx0XHR2YXIgZGlzcG9zZUhhbmRsZXJzID0gbW9kdWxlLmhvdC5fZGlzcG9zZUhhbmRsZXJzO1xuXHRcdFx0XHRmb3IgKGogPSAwOyBqIDwgZGlzcG9zZUhhbmRsZXJzLmxlbmd0aDsgaisrKSB7XG5cdFx0XHRcdFx0ZGlzcG9zZUhhbmRsZXJzW2pdLmNhbGwobnVsbCwgZGF0YSk7XG5cdFx0XHRcdH1cblx0XHRcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5obXJEW21vZHVsZUlkXSA9IGRhdGE7XG5cblx0XHRcdFx0Ly8gZGlzYWJsZSBtb2R1bGUgKHRoaXMgZGlzYWJsZXMgcmVxdWlyZXMgZnJvbSB0aGlzIG1vZHVsZSlcblx0XHRcdFx0bW9kdWxlLmhvdC5hY3RpdmUgPSBmYWxzZTtcblxuXHRcdFx0XHQvLyByZW1vdmUgbW9kdWxlIGZyb20gY2FjaGVcblx0XHRcdFx0ZGVsZXRlIF9fd2VicGFja19yZXF1aXJlX18uY1ttb2R1bGVJZF07XG5cblx0XHRcdFx0Ly8gd2hlbiBkaXNwb3NpbmcgdGhlcmUgaXMgbm8gbmVlZCB0byBjYWxsIGRpc3Bvc2UgaGFuZGxlclxuXHRcdFx0XHRkZWxldGUgb3V0ZGF0ZWREZXBlbmRlbmNpZXNbbW9kdWxlSWRdO1xuXG5cdFx0XHRcdC8vIHJlbW92ZSBcInBhcmVudHNcIiByZWZlcmVuY2VzIGZyb20gYWxsIGNoaWxkcmVuXG5cdFx0XHRcdGZvciAoaiA9IDA7IGogPCBtb2R1bGUuY2hpbGRyZW4ubGVuZ3RoOyBqKyspIHtcblx0XHRcdFx0XHR2YXIgY2hpbGQgPSBfX3dlYnBhY2tfcmVxdWlyZV9fLmNbbW9kdWxlLmNoaWxkcmVuW2pdXTtcblx0XHRcdFx0XHRpZiAoIWNoaWxkKSBjb250aW51ZTtcblx0XHRcdFx0XHRpZHggPSBjaGlsZC5wYXJlbnRzLmluZGV4T2YobW9kdWxlSWQpO1xuXHRcdFx0XHRcdGlmIChpZHggPj0gMCkge1xuXHRcdFx0XHRcdFx0Y2hpbGQucGFyZW50cy5zcGxpY2UoaWR4LCAxKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH1cblxuXHRcdFx0Ly8gcmVtb3ZlIG91dGRhdGVkIGRlcGVuZGVuY3kgZnJvbSBtb2R1bGUgY2hpbGRyZW5cblx0XHRcdHZhciBkZXBlbmRlbmN5O1xuXHRcdFx0Zm9yICh2YXIgb3V0ZGF0ZWRNb2R1bGVJZCBpbiBvdXRkYXRlZERlcGVuZGVuY2llcykge1xuXHRcdFx0XHRpZiAoX193ZWJwYWNrX3JlcXVpcmVfXy5vKG91dGRhdGVkRGVwZW5kZW5jaWVzLCBvdXRkYXRlZE1vZHVsZUlkKSkge1xuXHRcdFx0XHRcdG1vZHVsZSA9IF9fd2VicGFja19yZXF1aXJlX18uY1tvdXRkYXRlZE1vZHVsZUlkXTtcblx0XHRcdFx0XHRpZiAobW9kdWxlKSB7XG5cdFx0XHRcdFx0XHRtb2R1bGVPdXRkYXRlZERlcGVuZGVuY2llcyA9XG5cdFx0XHRcdFx0XHRcdG91dGRhdGVkRGVwZW5kZW5jaWVzW291dGRhdGVkTW9kdWxlSWRdO1xuXHRcdFx0XHRcdFx0Zm9yIChqID0gMDsgaiA8IG1vZHVsZU91dGRhdGVkRGVwZW5kZW5jaWVzLmxlbmd0aDsgaisrKSB7XG5cdFx0XHRcdFx0XHRcdGRlcGVuZGVuY3kgPSBtb2R1bGVPdXRkYXRlZERlcGVuZGVuY2llc1tqXTtcblx0XHRcdFx0XHRcdFx0aWR4ID0gbW9kdWxlLmNoaWxkcmVuLmluZGV4T2YoZGVwZW5kZW5jeSk7XG5cdFx0XHRcdFx0XHRcdGlmIChpZHggPj0gMCkgbW9kdWxlLmNoaWxkcmVuLnNwbGljZShpZHgsIDEpO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH0sXG5cdFx0YXBwbHk6IGZ1bmN0aW9uIChyZXBvcnRFcnJvcikge1xuXHRcdFx0Ly8gaW5zZXJ0IG5ldyBjb2RlXG5cdFx0XHRmb3IgKHZhciB1cGRhdGVNb2R1bGVJZCBpbiBhcHBsaWVkVXBkYXRlKSB7XG5cdFx0XHRcdGlmIChfX3dlYnBhY2tfcmVxdWlyZV9fLm8oYXBwbGllZFVwZGF0ZSwgdXBkYXRlTW9kdWxlSWQpKSB7XG5cdFx0XHRcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tW3VwZGF0ZU1vZHVsZUlkXSA9IGFwcGxpZWRVcGRhdGVbdXBkYXRlTW9kdWxlSWRdO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cblx0XHRcdC8vIHJ1biBuZXcgcnVudGltZSBtb2R1bGVzXG5cdFx0XHRmb3IgKHZhciBpID0gMDsgaSA8IGN1cnJlbnRVcGRhdGVSdW50aW1lLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHRcdGN1cnJlbnRVcGRhdGVSdW50aW1lW2ldKF9fd2VicGFja19yZXF1aXJlX18pO1xuXHRcdFx0fVxuXG5cdFx0XHQvLyBjYWxsIGFjY2VwdCBoYW5kbGVyc1xuXHRcdFx0Zm9yICh2YXIgb3V0ZGF0ZWRNb2R1bGVJZCBpbiBvdXRkYXRlZERlcGVuZGVuY2llcykge1xuXHRcdFx0XHRpZiAoX193ZWJwYWNrX3JlcXVpcmVfXy5vKG91dGRhdGVkRGVwZW5kZW5jaWVzLCBvdXRkYXRlZE1vZHVsZUlkKSkge1xuXHRcdFx0XHRcdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fLmNbb3V0ZGF0ZWRNb2R1bGVJZF07XG5cdFx0XHRcdFx0aWYgKG1vZHVsZSkge1xuXHRcdFx0XHRcdFx0bW9kdWxlT3V0ZGF0ZWREZXBlbmRlbmNpZXMgPVxuXHRcdFx0XHRcdFx0XHRvdXRkYXRlZERlcGVuZGVuY2llc1tvdXRkYXRlZE1vZHVsZUlkXTtcblx0XHRcdFx0XHRcdHZhciBjYWxsYmFja3MgPSBbXTtcblx0XHRcdFx0XHRcdHZhciBlcnJvckhhbmRsZXJzID0gW107XG5cdFx0XHRcdFx0XHR2YXIgZGVwZW5kZW5jaWVzRm9yQ2FsbGJhY2tzID0gW107XG5cdFx0XHRcdFx0XHRmb3IgKHZhciBqID0gMDsgaiA8IG1vZHVsZU91dGRhdGVkRGVwZW5kZW5jaWVzLmxlbmd0aDsgaisrKSB7XG5cdFx0XHRcdFx0XHRcdHZhciBkZXBlbmRlbmN5ID0gbW9kdWxlT3V0ZGF0ZWREZXBlbmRlbmNpZXNbal07XG5cdFx0XHRcdFx0XHRcdHZhciBhY2NlcHRDYWxsYmFjayA9XG5cdFx0XHRcdFx0XHRcdFx0bW9kdWxlLmhvdC5fYWNjZXB0ZWREZXBlbmRlbmNpZXNbZGVwZW5kZW5jeV07XG5cdFx0XHRcdFx0XHRcdHZhciBlcnJvckhhbmRsZXIgPVxuXHRcdFx0XHRcdFx0XHRcdG1vZHVsZS5ob3QuX2FjY2VwdGVkRXJyb3JIYW5kbGVyc1tkZXBlbmRlbmN5XTtcblx0XHRcdFx0XHRcdFx0aWYgKGFjY2VwdENhbGxiYWNrKSB7XG5cdFx0XHRcdFx0XHRcdFx0aWYgKGNhbGxiYWNrcy5pbmRleE9mKGFjY2VwdENhbGxiYWNrKSAhPT0gLTEpIGNvbnRpbnVlO1xuXHRcdFx0XHRcdFx0XHRcdGNhbGxiYWNrcy5wdXNoKGFjY2VwdENhbGxiYWNrKTtcblx0XHRcdFx0XHRcdFx0XHRlcnJvckhhbmRsZXJzLnB1c2goZXJyb3JIYW5kbGVyKTtcblx0XHRcdFx0XHRcdFx0XHRkZXBlbmRlbmNpZXNGb3JDYWxsYmFja3MucHVzaChkZXBlbmRlbmN5KTtcblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0Zm9yICh2YXIgayA9IDA7IGsgPCBjYWxsYmFja3MubGVuZ3RoOyBrKyspIHtcblx0XHRcdFx0XHRcdFx0dHJ5IHtcblx0XHRcdFx0XHRcdFx0XHRjYWxsYmFja3Nba10uY2FsbChudWxsLCBtb2R1bGVPdXRkYXRlZERlcGVuZGVuY2llcyk7XG5cdFx0XHRcdFx0XHRcdH0gY2F0Y2ggKGVycikge1xuXHRcdFx0XHRcdFx0XHRcdGlmICh0eXBlb2YgZXJyb3JIYW5kbGVyc1trXSA9PT0gXCJmdW5jdGlvblwiKSB7XG5cdFx0XHRcdFx0XHRcdFx0XHR0cnkge1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRlcnJvckhhbmRsZXJzW2tdKGVyciwge1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdG1vZHVsZUlkOiBvdXRkYXRlZE1vZHVsZUlkLFxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdGRlcGVuZGVuY3lJZDogZGVwZW5kZW5jaWVzRm9yQ2FsbGJhY2tzW2tdXG5cdFx0XHRcdFx0XHRcdFx0XHRcdH0pO1xuXHRcdFx0XHRcdFx0XHRcdFx0fSBjYXRjaCAoZXJyMikge1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRpZiAob3B0aW9ucy5vbkVycm9yZWQpIHtcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRvcHRpb25zLm9uRXJyb3JlZCh7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHR0eXBlOiBcImFjY2VwdC1lcnJvci1oYW5kbGVyLWVycm9yZWRcIixcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdG1vZHVsZUlkOiBvdXRkYXRlZE1vZHVsZUlkLFxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0ZGVwZW5kZW5jeUlkOiBkZXBlbmRlbmNpZXNGb3JDYWxsYmFja3Nba10sXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRlcnJvcjogZXJyMixcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdG9yaWdpbmFsRXJyb3I6IGVyclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdH0pO1xuXHRcdFx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdFx0XHRcdGlmICghb3B0aW9ucy5pZ25vcmVFcnJvcmVkKSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0cmVwb3J0RXJyb3IoZXJyMik7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0cmVwb3J0RXJyb3IoZXJyKTtcblx0XHRcdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRpZiAob3B0aW9ucy5vbkVycm9yZWQpIHtcblx0XHRcdFx0XHRcdFx0XHRcdFx0b3B0aW9ucy5vbkVycm9yZWQoe1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdHR5cGU6IFwiYWNjZXB0LWVycm9yZWRcIixcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRtb2R1bGVJZDogb3V0ZGF0ZWRNb2R1bGVJZCxcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRkZXBlbmRlbmN5SWQ6IGRlcGVuZGVuY2llc0ZvckNhbGxiYWNrc1trXSxcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRlcnJvcjogZXJyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdH0pO1xuXHRcdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHRcdFx0aWYgKCFvcHRpb25zLmlnbm9yZUVycm9yZWQpIHtcblx0XHRcdFx0XHRcdFx0XHRcdFx0cmVwb3J0RXJyb3IoZXJyKTtcblx0XHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH1cblxuXHRcdFx0Ly8gTG9hZCBzZWxmIGFjY2VwdGVkIG1vZHVsZXNcblx0XHRcdGZvciAodmFyIG8gPSAwOyBvIDwgb3V0ZGF0ZWRTZWxmQWNjZXB0ZWRNb2R1bGVzLmxlbmd0aDsgbysrKSB7XG5cdFx0XHRcdHZhciBpdGVtID0gb3V0ZGF0ZWRTZWxmQWNjZXB0ZWRNb2R1bGVzW29dO1xuXHRcdFx0XHR2YXIgbW9kdWxlSWQgPSBpdGVtLm1vZHVsZTtcblx0XHRcdFx0dHJ5IHtcblx0XHRcdFx0XHRpdGVtLnJlcXVpcmUobW9kdWxlSWQpO1xuXHRcdFx0XHR9IGNhdGNoIChlcnIpIHtcblx0XHRcdFx0XHRpZiAodHlwZW9mIGl0ZW0uZXJyb3JIYW5kbGVyID09PSBcImZ1bmN0aW9uXCIpIHtcblx0XHRcdFx0XHRcdHRyeSB7XG5cdFx0XHRcdFx0XHRcdGl0ZW0uZXJyb3JIYW5kbGVyKGVyciwge1xuXHRcdFx0XHRcdFx0XHRcdG1vZHVsZUlkOiBtb2R1bGVJZCxcblx0XHRcdFx0XHRcdFx0XHRtb2R1bGU6IF9fd2VicGFja19yZXF1aXJlX18uY1ttb2R1bGVJZF1cblx0XHRcdFx0XHRcdFx0fSk7XG5cdFx0XHRcdFx0XHR9IGNhdGNoIChlcnIyKSB7XG5cdFx0XHRcdFx0XHRcdGlmIChvcHRpb25zLm9uRXJyb3JlZCkge1xuXHRcdFx0XHRcdFx0XHRcdG9wdGlvbnMub25FcnJvcmVkKHtcblx0XHRcdFx0XHRcdFx0XHRcdHR5cGU6IFwic2VsZi1hY2NlcHQtZXJyb3ItaGFuZGxlci1lcnJvcmVkXCIsXG5cdFx0XHRcdFx0XHRcdFx0XHRtb2R1bGVJZDogbW9kdWxlSWQsXG5cdFx0XHRcdFx0XHRcdFx0XHRlcnJvcjogZXJyMixcblx0XHRcdFx0XHRcdFx0XHRcdG9yaWdpbmFsRXJyb3I6IGVyclxuXHRcdFx0XHRcdFx0XHRcdH0pO1xuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdGlmICghb3B0aW9ucy5pZ25vcmVFcnJvcmVkKSB7XG5cdFx0XHRcdFx0XHRcdFx0cmVwb3J0RXJyb3IoZXJyMik7XG5cdFx0XHRcdFx0XHRcdFx0cmVwb3J0RXJyb3IoZXJyKTtcblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHRpZiAob3B0aW9ucy5vbkVycm9yZWQpIHtcblx0XHRcdFx0XHRcdFx0b3B0aW9ucy5vbkVycm9yZWQoe1xuXHRcdFx0XHRcdFx0XHRcdHR5cGU6IFwic2VsZi1hY2NlcHQtZXJyb3JlZFwiLFxuXHRcdFx0XHRcdFx0XHRcdG1vZHVsZUlkOiBtb2R1bGVJZCxcblx0XHRcdFx0XHRcdFx0XHRlcnJvcjogZXJyXG5cdFx0XHRcdFx0XHRcdH0pO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0aWYgKCFvcHRpb25zLmlnbm9yZUVycm9yZWQpIHtcblx0XHRcdFx0XHRcdFx0cmVwb3J0RXJyb3IoZXJyKTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH1cblxuXHRcdFx0cmV0dXJuIG91dGRhdGVkTW9kdWxlcztcblx0XHR9XG5cdH07XG59XG5fX3dlYnBhY2tfcmVxdWlyZV9fLmhtckkuanNvbnAgPSBmdW5jdGlvbiAobW9kdWxlSWQsIGFwcGx5SGFuZGxlcnMpIHtcblx0aWYgKCFjdXJyZW50VXBkYXRlKSB7XG5cdFx0Y3VycmVudFVwZGF0ZSA9IHt9O1xuXHRcdGN1cnJlbnRVcGRhdGVSdW50aW1lID0gW107XG5cdFx0Y3VycmVudFVwZGF0ZVJlbW92ZWRDaHVua3MgPSBbXTtcblx0XHRhcHBseUhhbmRsZXJzLnB1c2goYXBwbHlIYW5kbGVyKTtcblx0fVxuXHRpZiAoIV9fd2VicGFja19yZXF1aXJlX18ubyhjdXJyZW50VXBkYXRlLCBtb2R1bGVJZCkpIHtcblx0XHRjdXJyZW50VXBkYXRlW21vZHVsZUlkXSA9IF9fd2VicGFja19yZXF1aXJlX18ubVttb2R1bGVJZF07XG5cdH1cbn07XG5fX3dlYnBhY2tfcmVxdWlyZV9fLmhtckMuanNvbnAgPSBmdW5jdGlvbiAoXG5cdGNodW5rSWRzLFxuXHRyZW1vdmVkQ2h1bmtzLFxuXHRyZW1vdmVkTW9kdWxlcyxcblx0cHJvbWlzZXMsXG5cdGFwcGx5SGFuZGxlcnMsXG5cdHVwZGF0ZWRNb2R1bGVzTGlzdFxuKSB7XG5cdGFwcGx5SGFuZGxlcnMucHVzaChhcHBseUhhbmRsZXIpO1xuXHRjdXJyZW50VXBkYXRlQ2h1bmtzID0ge307XG5cdGN1cnJlbnRVcGRhdGVSZW1vdmVkQ2h1bmtzID0gcmVtb3ZlZENodW5rcztcblx0Y3VycmVudFVwZGF0ZSA9IHJlbW92ZWRNb2R1bGVzLnJlZHVjZShmdW5jdGlvbiAob2JqLCBrZXkpIHtcblx0XHRvYmpba2V5XSA9IGZhbHNlO1xuXHRcdHJldHVybiBvYmo7XG5cdH0sIHt9KTtcblx0Y3VycmVudFVwZGF0ZVJ1bnRpbWUgPSBbXTtcblx0Y2h1bmtJZHMuZm9yRWFjaChmdW5jdGlvbiAoY2h1bmtJZCkge1xuXHRcdGlmIChcblx0XHRcdF9fd2VicGFja19yZXF1aXJlX18ubyhpbnN0YWxsZWRDaHVua3MsIGNodW5rSWQpICYmXG5cdFx0XHRpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF0gIT09IHVuZGVmaW5lZFxuXHRcdCkge1xuXHRcdFx0cHJvbWlzZXMucHVzaChsb2FkVXBkYXRlQ2h1bmsoY2h1bmtJZCwgdXBkYXRlZE1vZHVsZXNMaXN0KSk7XG5cdFx0XHRjdXJyZW50VXBkYXRlQ2h1bmtzW2NodW5rSWRdID0gdHJ1ZTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0Y3VycmVudFVwZGF0ZUNodW5rc1tjaHVua0lkXSA9IGZhbHNlO1xuXHRcdH1cblx0fSk7XG5cdGlmIChfX3dlYnBhY2tfcmVxdWlyZV9fLmYpIHtcblx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmYuanNvbnBIbXIgPSBmdW5jdGlvbiAoY2h1bmtJZCwgcHJvbWlzZXMpIHtcblx0XHRcdGlmIChcblx0XHRcdFx0Y3VycmVudFVwZGF0ZUNodW5rcyAmJlxuXHRcdFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8oY3VycmVudFVwZGF0ZUNodW5rcywgY2h1bmtJZCkgJiZcblx0XHRcdFx0IWN1cnJlbnRVcGRhdGVDaHVua3NbY2h1bmtJZF1cblx0XHRcdCkge1xuXHRcdFx0XHRwcm9taXNlcy5wdXNoKGxvYWRVcGRhdGVDaHVuayhjaHVua0lkKSk7XG5cdFx0XHRcdGN1cnJlbnRVcGRhdGVDaHVua3NbY2h1bmtJZF0gPSB0cnVlO1xuXHRcdFx0fVxuXHRcdH07XG5cdH1cbn07XG5cbl9fd2VicGFja19yZXF1aXJlX18uaG1yTSA9ICgpID0+IHtcblx0aWYgKHR5cGVvZiBmZXRjaCA9PT0gXCJ1bmRlZmluZWRcIikgdGhyb3cgbmV3IEVycm9yKFwiTm8gYnJvd3NlciBzdXBwb3J0OiBuZWVkIGZldGNoIEFQSVwiKTtcblx0cmV0dXJuIGZldGNoKF9fd2VicGFja19yZXF1aXJlX18ucCArIF9fd2VicGFja19yZXF1aXJlX18uaG1yRigpKS50aGVuKChyZXNwb25zZSkgPT4ge1xuXHRcdGlmKHJlc3BvbnNlLnN0YXR1cyA9PT0gNDA0KSByZXR1cm47IC8vIG5vIHVwZGF0ZSBhdmFpbGFibGVcblx0XHRpZighcmVzcG9uc2Uub2spIHRocm93IG5ldyBFcnJvcihcIkZhaWxlZCB0byBmZXRjaCB1cGRhdGUgbWFuaWZlc3QgXCIgKyByZXNwb25zZS5zdGF0dXNUZXh0KTtcblx0XHRyZXR1cm4gcmVzcG9uc2UuanNvbigpO1xuXHR9KTtcbn07XG5cbi8vIG5vIG9uIGNodW5rcyBsb2FkZWRcblxuLy8gbm8ganNvbnAgZnVuY3Rpb24iLCIiLCIvLyBtb2R1bGUgY2FjaGUgYXJlIHVzZWQgc28gZW50cnkgaW5saW5pbmcgaXMgZGlzYWJsZWRcbi8vIHN0YXJ0dXBcbi8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXyhcIi4vbm9kZV9tb2R1bGVzL3dlYnBhY2stZGV2LXNlcnZlci9jbGllbnQvaW5kZXguanM/cHJvdG9jb2w9d3MlM0EmaG9zdG5hbWU9MC4wLjAuMCZwb3J0PTgwODAmcGF0aG5hbWU9JTJGd3MmbG9nZ2luZz1pbmZvJm92ZXJsYXk9dHJ1ZSZyZWNvbm5lY3Q9MTAmaG90PXRydWUmbGl2ZS1yZWxvYWQ9dHJ1ZVwiKTtcbl9fd2VicGFja19yZXF1aXJlX18oXCIuL25vZGVfbW9kdWxlcy93ZWJwYWNrL2hvdC9kZXYtc2VydmVyLmpzXCIpO1xuX193ZWJwYWNrX3JlcXVpcmVfXyhcIi4vc3JjL3NjcmlwdHMvaW5kZXguanNcIik7XG52YXIgX193ZWJwYWNrX2V4cG9ydHNfXyA9IF9fd2VicGFja19yZXF1aXJlX18oXCIuL3NyYy9zdHlsZXMvaW5kZXguY3NzXCIpO1xuIiwiIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9