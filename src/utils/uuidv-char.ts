/* eslint-disable */
// ----------------------------------------------------------------------

export default function uuidChar(lengthOfCode: number) {
  let getTime: string = new Date().getTime().toString();
  let possible: string = "ABCDEFGHIJKLMNOPQRSTUVWXYZ" + getTime + "0123456789";
  let text = "";
  for (let i = 0; i < lengthOfCode; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
}
