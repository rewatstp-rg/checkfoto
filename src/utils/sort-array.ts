export function sortArray(array: Array<any>, prop: string): Array<any> {
  const sortAr = (a: any, b: any) => (a[prop] - b[prop])
  return array.sort(sortAr);
}