export function lowerBound<T>(arr: T[], condition: (r: T) => boolean) {
  let start = 0;
  let end = arr.length;

  while (start < end) {
    let pivot = Math.floor((end + start) / 2);
    if (condition(arr[pivot])) {
      end = pivot;
    } else {
      start = pivot + 1;
    }
  }

  return start;
}
