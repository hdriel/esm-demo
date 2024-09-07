// module.exports = function every(array) {
export function every(array) {
  if (!array.length) {
    return true;
  }

  return !!array[0] && every(array.slice(1));
}

console.log("is all true ? ", every([true, false, true]));
