export const isValidInstituteCode = (code) => {
  return /^[a-z0-9]{4,10}$/.test(code);
};

export const isValidMobile = (mobile) => {
  return /^[6-9]\d{9}$/.test(mobile);
};

export const isStrongPassword = (password) => {
  return /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/.test(password);
};
