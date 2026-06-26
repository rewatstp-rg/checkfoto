/* eslint-disable */
// ----------------------------------------------------------------------

export default function uuidv4() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var buf = new Uint8Array(1);
    crypto.getRandomValues(buf);
    const math = buf[0];
    const r = (math * 16) | 0,
      v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}
