// Custom Exceptions //

// ID number Should be 9 digits only
const isValidId = (userId) => {
  const id = /^\d{9}$/;
  return id.test(userId);
};

// First or last name should be at least 2 character long.
const isValidName = (username) => {
  const name = /.[a-zA-Z]{1}.*/;
  return name.test(username);
};

// Phone number should be in the form of '05-XXX-XXXX'
const isValidPhoneNumber = (userPhone) => {
  const pattern = /^[0][5][0|2|3|4|5|9]{1}[-]{0,1}[0-9]{3}[-]{0,1}[0-9]{4}/;
  return pattern.test(userPhone);
};

// Password Should contain at least one digit
// & at least one lower case
// & at least one upper case
// & at least 8 from the mentioned characters
const isValidPassword = (userPassword) => {
  const password = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]{8,}$/;
  return password.test(userPassword);
};

const generatePassword = () => {
  let charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789',
    retVal;

  while (!isValidPassword(retVal)) {
    retVal = '';
    for (let i = 0; i < 8; ++i) {
      retVal += charset.charAt(Math.floor(Math.random() * charset.length));
    }
  }
  return retVal;
};

module.exports = {
  isValidId: isValidId,
  isValidName: isValidName,
  isValidPassword: isValidPassword,
  generatePassword: generatePassword,
  isValidPhoneNumber: isValidPhoneNumber,
};
