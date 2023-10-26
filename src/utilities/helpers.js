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

/**
 * 
 * @param {number} number 
 * @returns 
 */
export const toVND = (number) => {
	return Intl.NumberFormat().format(number) + " VNĐ";
};

export const redirectLogin = ()=>{
  const currentPathName = window.location.pathname;
  return `/signin?next=${encodeURIComponent(currentPathName)}`;
}