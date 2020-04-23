import swal from 'sweetalert';
import { BOOKING_START, BOOKING_SUCCESS, BOOKING_ERROR } from './types';
import HttpService from '../../../utils/HttpService';
import Errors from '../../../utils/helpers/errors';

export const bookRoom = (checkin, checkout, roomId, accommodationId) => async (dispatch) => {
  dispatch({ type: BOOKING_START });
  try {
    const res = await HttpService.post(`/accommodations/${accommodationId}/book/${roomId}`, {
      checkin,
      checkout,
    });
    dispatch({ type: BOOKING_SUCCESS, payload: res.data });
    swal({
      title: 'Success',
      text: 'Room booked successfully',
      icon: 'success',
      timer: 3000,
      buttons: 'Close',
    });
  } catch (error) {
    Errors.handle(error);
    dispatch({ type: BOOKING_ERROR, payload: Errors.selectMessage(error) });
  }
};
