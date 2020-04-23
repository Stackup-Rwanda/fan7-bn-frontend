import {
  GET_ALL_ACCOMMODATIONS_START,
  GET_ALL_ACCOMMODATIONS_SUCCESS,
  GET_ALL_ACCOMMODATIONS_ERROR,
  GET_SINGLE_ACCOMMODATION_START,
  GET_SINGLE_ACCOMMODATION_SUCCESS,
  GET_SINGLE_ACCOMMODATION_ERROR,
  FILTER_ACCOMMODATIONS,
} from './types';
import HttpService from '../../../utils/HttpService';
import Errors from '../../../utils/helpers/errors';

export const getAllAccommodations = () => async (dispatch) => {
  dispatch({ type: GET_ALL_ACCOMMODATIONS_START });
  try {
    const res = await HttpService.get('/accommodations');
    dispatch({ type: GET_ALL_ACCOMMODATIONS_SUCCESS, payload: res.data });
  } catch (error) {
    dispatch({ type: GET_ALL_ACCOMMODATIONS_ERROR, payload: Errors.selectMessage(error) });
  }
};

export const getSingleAccommodation = (id) => async (dispatch) => {
  dispatch({ type: GET_SINGLE_ACCOMMODATION_START });
  try {
    const res = await HttpService.get(`/accommodations/${id}`);
    dispatch({ type: GET_SINGLE_ACCOMMODATION_SUCCESS, payload: res.data });
  } catch (error) {
    dispatch({ type: GET_SINGLE_ACCOMMODATION_ERROR, payload: Errors.selectMessage(error) });
  }
};

export const filterAccommodations = (address) => async (dispatch) => {
  dispatch({ type: GET_ALL_ACCOMMODATIONS_START });
  try {
    const res = await HttpService.get('/accommodations');
    dispatch({
      type: FILTER_ACCOMMODATIONS,
      payload: res.data.filter(
        (accommodation) => accommodation.address.toLowerCase() === address.toLowerCase()
      ),
    });
  } catch (error) {
    dispatch({ type: GET_ALL_ACCOMMODATIONS_ERROR, payload: Errors.selectMessage(error) });
  }
};
