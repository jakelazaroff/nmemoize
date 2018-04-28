"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.memoize = memoize;
function _memoize(fn) {
  var cache = new Map();

  return function (first) {
    for (var _len = arguments.length, rest = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      rest[_key - 1] = arguments[_key];
    }

    var hit = cache.get(first);

    if (hit) {
      if (rest.length) {
        return hit.apply(undefined, rest);
      } else {
        return hit;
      }
    } else {
      if (rest.length) {
        var next = _memoize(function () {
          for (var _len2 = arguments.length, rest = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
            rest[_key2] = arguments[_key2];
          }

          return fn.apply(undefined, [first].concat(rest));
        });
        cache.set(first, next);
        return next.apply(undefined, rest);
      } else {
        var result = fn(first);
        cache.set(first, result);
        return result;
      }
    }
  };
}

function memoize(fn) {
  var memoized = _memoize(function (length) {
    for (var _len3 = arguments.length, args = Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
      args[_key3 - 1] = arguments[_key3];
    }

    return fn.apply(undefined, args);
  });
  return function () {
    for (var _len4 = arguments.length, args = Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
      args[_key4] = arguments[_key4];
    }

    return memoized.apply(undefined, [args.length].concat(args));
  };
}