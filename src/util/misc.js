export function callIfFunction(func, value, fallback=func) {
  if (!!func && "function" === typeof func) {
    return func(value);
  }
  return fallback;
}