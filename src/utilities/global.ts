export const splitString = (
  value: string,
  isNumber: boolean = false,
  separator: string = '-'
) => {
  const [first, second] = value.split(separator);

  return isNumber ? [Number(first), Number(second)] : [first, second];
};
