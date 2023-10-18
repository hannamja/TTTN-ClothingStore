/**
 * object[fieldName] = "Error message!"
 * @param {object} errors
 * @param {any} value
 * @param {string} fieldName
 * @param {string} errorMessage
 */
export const validateNotNull = (
  errors,
  value,
  fieldName,
  errorMessage = "Không được để trống!"
) => {
  if (!value) {
    errors[fieldName] = errorMessage;
  }
};

/**
 * object[fieldName] = "Error message!"
 * @param {object} errors
 * @param {string} value
 * @param {string} fieldName
 */
export const validateEmail = (errors, value, fieldName = "email") => {
  if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
    errors[fieldName] = "Email không đúng định dạng!";
  }
};

/**
 * object[fieldName] = "Error message!"
 * @param {object} errors
 * @param {string} value
 * @param {string} fieldName
 */
export const validatePassword = (errors, value, fieldName = "password") => {
  if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{4,45}$/.test(value)) {
    errors[fieldName] = "Mật khẩu từ 3-45 ký tự! gồm 0-9A-Za-z";
  }
};

/**
 * object[fieldName] = "Error message!"
 * @param {object} errors
 * @param {string} value
 * @param {string} fieldName
 */
export const validatePhone = (errors, value, fieldName = "sdt") => {
  const phoneRegex = /^0[1-9]{1}[0-9]{8,9}$/;
  if (!phoneRegex.test(value)) {
    errors[fieldName] = "Số điện thoại không đúng định dạng! Ví dụ: 0234242524";
  }
};

/**
 * object[fieldName] = "Error message!"
 * @param {object} errors
 * @param {string} value
 * @param {string} fieldName
 */
export const validateCmnd = (errors, value, fieldName = "cmnd") => {
  const cmndRegex = /^[0-9]{12}$/;
  if (!cmndRegex.test(value)) {
    errors[fieldName] = "CMND không hợp lệ!";
  }
};
