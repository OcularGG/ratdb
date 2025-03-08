// Instead of lodash.isEqual, use native comparison
export function deepEqual(obj1, obj2) {
  return require('node:util').isDeepStrictEqual(obj1, obj2);
}