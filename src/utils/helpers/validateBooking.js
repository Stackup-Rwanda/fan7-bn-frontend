const validationSchema = {
    arrivalDate: {
      validate: (date) => new Date(date).getTime() >= new Date().setHours(0, 0, 0, 0),
      errorMessage: 'Check In date must be today or a day in the future',
    },
    leavingDate: {
      validate: (date, arrivalDate) => new Date(date).getTime() > new Date(arrivalDate),
      errorMessage: 'Check Out date must not be before or be the same as arrival date',
    },
    submit: {
      validate: (arrivalDate, leavingDate) => {
        if (!!arrivalDate && !!leavingDate) return true;
      },
      errorMessage: 'Check In and Check Out date must be provided',
    },
  };

export default (event, checkin, checkout) => {
  const { name, value } = event.target;
  let validInput = false;
  let errorMessage = null;

  // eslint-disable-next-line default-case

  switch (name) {
    case 'checkin':
      validInput = validationSchema.arrivalDate.validate(value);

      if (!validInput) {
        errorMessage = validationSchema.arrivalDate.errorMessage;
      }
      break;

    case 'checkout':
      validInput = validationSchema.leavingDate.validate(value, checkin);

      if (!validInput) {
        errorMessage = validationSchema.leavingDate.errorMessage;
      }
      break;
  }

  return errorMessage;
};
