import swal from 'sweetalert';
import history from './history';

const selectErrorCode = (error) => {
  if (error && error.response) return Number(error.response.status);

  if (error && error.request) return 500;

  return 500;
};

const selectErrorMessage = (error) => {
  if (error && error.response) return error.response.data.error;

  if (error && error.request) return error.message;
};

export default class Errors {
  static handle(error) {
    if (selectErrorCode(error) === 403) {
      history.push('/403');
      return;
    }

    if (
      selectErrorCode(error) === 400
      || selectErrorCode(error) === 401
      || selectErrorCode(error) === 404
      || selectErrorCode(error) === 422
      || selectErrorCode(error) === 415
    ) {
      swal({
        title: 'Profile error',
        text: `${selectErrorMessage(error)}`,
        icon: 'error',
        buttons: 'Close',
      });
      return;
    }

    history.push('/500');
  }

  static errorCode(error) {
    return selectErrorCode(error);
  }

  static selectMessage(error) {
    return selectErrorMessage(error);
  }
}
