function _memoize (fn) {
  const cache = new Map();

  return (first, ...rest) => {
    const hit = cache.get(first);

    if (hit) {
      return rest.length ? hit(...rest) : hit;
    } else {
      if (rest.length) {
        const next = _memoize((...rest) => fn(first, ...rest));
        cache.set(first, next);
        return next(...rest);
      } else {
        const result = fn(first);
        cache.set(first, result);
        return result;
      }
    }
  };
}

export function memoize (fn) {
  const memoized = _memoize((length, ...args) => fn(...args));
  return (...args) => memoized(args.length, ...args);
}
