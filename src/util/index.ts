export const enumStringValues = (myEnum: any) => {
  return Object.keys(myEnum).map((key) => myEnum[key]);
};
export const removeFromArray = (arr: Array<any>, value: any) => {
  var index = arr.indexOf(value);
  console.log(index);

  if (index > -1) {
    arr.splice(index, 1);
  }
  return arr;
};

export const arrayToEvalString = (array: Array<any>): string => {
  const doubleQuotes = JSON.stringify(array).replace(/"/g, "'");
  let s = `${doubleQuotes}`;
  console.log(s);
  return s;
};
