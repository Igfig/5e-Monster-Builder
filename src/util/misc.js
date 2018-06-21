export function callIfFunction(func, value, fallback = func) {
  if (!!func && typeof func === "function") {
    return func(value);
  }
  return fallback;
}
