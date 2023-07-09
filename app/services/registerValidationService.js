export const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
  
  export const validateName = (name) => {
    return name.length > 0;
  };
  
  export const validatePassword = (password) => {
    // Au moins 8 caractères, une majuscule et un caractère spécial
    const passwordRegex = /^(?=.*[A-Z])(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
  };