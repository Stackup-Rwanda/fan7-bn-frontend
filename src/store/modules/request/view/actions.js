import {
  GET_TRIP_REQUEST_START,
  GET_TRIP_REQUEST_SUCCESS,
  GET_TRIP_REQUEST_ERROR,
  // HANDLE_PAGE_CHANGE,
  // HANDLE_ROWS_PER_PAGE_CHANGE,
} from './types';
import HttpService from '../../../../utils/HttpService';
import Errors from '../../../../utils/helpers/errors';

export const getTripRequests = () => async dispatch => {
  dispatch({ type: GET_TRIP_REQUEST_START });
  try {
    // const params = { page: state.page, numberOfRows: state.numberOfRows };
    const res = await HttpService.get('/requests');

    dispatch({ type: GET_TRIP_REQUEST_SUCCESS, payload: res.data });
  } catch (error) {
    dispatch({ type: GET_TRIP_REQUEST_ERROR, payload: Errors.selectMessage(error) });
  }
};

// export const handleChangeRowsPerPage = (numberOfRows, page) => ({
//   type: HANDLE_ROWS_PER_PAGE_CHANGE,
//   payload: { numberOfRows, page },
// });

// export const handleChangePage = page => ({
//   type: HANDLE_PAGE_CHANGE,
//   payload: page,
// });

