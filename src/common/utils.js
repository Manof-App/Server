// My Custom Exceptions //

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

// Password Should contain at least one digit
// & at least one lower case
// & at least one upper case
// & at least 8 from the mentioned characters
const isValidPassword = (userPassword) => {
  // if (userPassword === "") {
  //   const password = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]{8,}$/;
  //   return password.test(userPassword);
  // }
  return true;
};

const convertToDate = (dateToCheck) => {
  const dateForm = dateToCheck;
  const date = dateForm.split("/");
  const form = new Date(date[2], parseInt(date[1]) - 1, parseInt(date[0]) + 1);

  return form;
};

const checkBetweenDates = (roomDates, orderSdate, orderEdate) => {
  const roomStartDate = convertToDate(roomDates.startDate);
  const roomEndDate = convertToDate(roomDates.endDate);
  const orderStartDate = convertToDate(orderSdate);
  const orderEndDate = convertToDate(orderEdate);

  const currDate = new Date();
  console.log(roomDates);
  console.log(orderSdate);
  console.log(orderEdate);

  if (
    orderStartDate.getTime() > roomStartDate.getTime() &&
    orderEndDate.getTime() < roomEndDate.getTime()
  ) {
    return false;
  } else if (orderStartDate.getTime() < currDate.getTime()) {
    return false;
  } else if (orderStartDate.getTime() === roomStartDate.getTime()) {
    return false;
  }
  return true;
};

function convertDateToString(inputFormat) {
  function pad(s) {
    return s < 10 ? "0" + s : s;
  }
  const d = new Date(inputFormat);
  return [pad(d.getDate()), pad(d.getMonth() + 1), d.getFullYear()].join("/");
}

module.exports = {
  isValidId: isValidId,
  isValidName: isValidName,
  isValidPassword: isValidPassword,
  convertToDate: convertToDate,
  checkBetweenDates: checkBetweenDates,
  convertDateToString: convertDateToString,
};
