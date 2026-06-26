export function checkArrayLength(array: Array<any>): boolean {
  if (array?.length > 0) {
    return true
  }
  return false;
}