export const checkPasswordValidation = (password) => {
  if (password.length <= 6) {
    return "Password should be greater than 6 characters";
  }
  return null;
};