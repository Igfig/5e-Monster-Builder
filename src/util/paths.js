export function pathToArray(path) {
  return path.split("/");
}

export function arrayToPath(arr) {
  return arr.join("/"); // TODO maybe skip any empty elements
}
