export const isEmptyObject = (obj) => (!Object.keys(obj).length);

export const fetchNumbersFromString = (str) => {
  let newStr = '';
  // eslint-disable-next-line no-restricted-globals
  str.split('').map((s) => { if (!isNaN(parseInt(s, 10))) { newStr = newStr.concat(s); } return s; });
  return newStr;
};
