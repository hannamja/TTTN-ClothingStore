/**
 * 
 * @param {string | number} initialDate 
 * @returns 
 */
export const dateToString = (initialDate) => {
  const dateValue = new Date(initialDate);
  const arr = dateValue.toLocaleDateString().split(/-|\//);
  return arr[2] + "-" + arr[1] + "-" + arr[0];
};
