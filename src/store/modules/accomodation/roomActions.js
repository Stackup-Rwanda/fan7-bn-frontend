import Errors from '../../../utils/helpers/errorHandle';
import onSuccess from '../../../utils/helpers/successMsg';
import {
  ACCOMMODATION_START,
  CREATE_ROOM_START,
  CREATE_ROOM_SUCCESS,
  CREATE_ROOM_ERROR,
  GET_ROOM_SUCCESS,
  GET_ROOM_ERROR,
} from './actionTypes';
import httpService from '../../../utils/HttpService';

export const apiStart = () => ({
  type: ACCOMMODATION_START,
});
export const createRoomStart = () => ({
  type: CREATE_ROOM_START,
});

export const apiSuccess = (payload) => ({
  type: CREATE_ROOM_SUCCESS,
  payload,
});

export const apiError = (error) => ({
  type: CREATE_ROOM_ERROR,
  error,
});

export const apiGetRoomSuccess = (payload) => ({
  type: GET_ROOM_SUCCESS,
  payload,
});


export const apiGetRoomError = (error) => ({
  type: GET_ROOM_ERROR,
  error,
});

// export const updateOnCreate = (payload) => ({
//   type: UPDATE_ON_CREATE_ROOM,
//   payload,
// });

export const createRoom = (data, accommodationId) => async (dispatch) => {
  dispatch(createRoomStart());
  try {
    const {
      services,
      amenities,
      type,
      cost,
      room_number,
      bedrooms,
      size,
      files,
    } = data;
    const bodyFormData = new FormData();
    await services.values.forEach((str) =>
      bodyFormData.append('services', str)
    );
    await amenities.values.forEach((str) =>
      bodyFormData.append('amenities', str)
    );
    await files.forEach((str) => bodyFormData.append('image', str));
    bodyFormData.set('type', type);
    bodyFormData.set('roomNumber', room_number);
    bodyFormData.set('area', size);
    bodyFormData.set('cost', cost);
    bodyFormData.set('totalBedrooms', bedrooms);

    const config = { headers: { 'content-type': 'multipart/form-data' } };

    const response = await httpService.post(
      `accommodations/${accommodationId}/room`,
      bodyFormData,
      config
    );

    await dispatch(apiSuccess(response.data));
    // await dispatch(updateOnCreate(response.data));
    return onSuccess.handle('Your ROOM was successfully created');
  } catch (error) {
    console.log(error.response);
    Errors.handle(error);
    return dispatch(apiError(error));
  }
};


export const getAllRooms = (page, limit, accommodationId) => async (dispatch) => {
  dispatch(apiStart())
  try {
    const response = await httpService.get(`/accommodations/${accommodationId}/rooms?page=${page}&numberOfRows=${limit}`);
    return dispatch(apiGetRoomSuccess(response.data));
  } catch (error) {
    console.log(error.response);
    Errors.handle(error);
    return dispatch(apiGetRoomError(error));
  }
}
