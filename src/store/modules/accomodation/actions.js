import Errors from '../../../utils/helpers/errorHandle';
import onSuccess from '../../../utils/helpers/successMsg';
import history from '../../../utils/helpers/history';
import { convertToRaw } from 'draft-js';
import {
    ACCOMMODATION_START,
    CREATE_ACCOMMODATION_START,
    CREATE_ACCOMMODATION_SUCCESS,
    CREATE_ACCOMMODATION_ERROR,
    GET_ACCOMMODATION_SUCCESS,
    GET_ACCOMMODATION_ERROR,
    UPDATE_ON_CREATE_ACCOMMODATION
} from './actionTypes';
import httpService from '../../../utils/HttpService';

export const apiStart = () => ({
    type: ACCOMMODATION_START,
});
export const CreateAccommodationStart = () => ({
    type: CREATE_ACCOMMODATION_START,
});

export const apiAccommodationSuccess = (payload) => ({
    type: CREATE_ACCOMMODATION_SUCCESS,
    payload,
});


export const apiError = (error) => ({
    type: CREATE_ACCOMMODATION_ERROR,
    error,
});


export const apiGetSuccess = (payload) => ({
    type: GET_ACCOMMODATION_SUCCESS,
    payload,
});

export const apiGetError = (error) => ({
    type: GET_ACCOMMODATION_ERROR,
    error,
});

export const updateOnCreate = (payload) => ({
    type: UPDATE_ON_CREATE_ACCOMMODATION,
    payload,
});

export const createAccommodation = (data) => async (dispatch) => {
    dispatch(CreateAccommodationStart());
    try {
        const { services,
            amenities,
            name,
            address,
            geoLocation,
            description,
            files } = data;
        const bodyFormData = new FormData();
        await services.values.forEach(str => bodyFormData.append('services', str));
        await amenities.values.forEach(str => bodyFormData.append('amenities', str));
        await files.forEach(str => bodyFormData.append('image', str));
        bodyFormData.set('name', name);
        bodyFormData.set('address', address);
        bodyFormData.set('geoLocation', geoLocation);
        bodyFormData.set('description', JSON.stringify(convertToRaw(description)));

        const config = { headers: { 'content-type': 'multipart/form-data' } };
        const response = await httpService.post('/accommodations', bodyFormData, config);
        await dispatch(apiAccommodationSuccess(response.data))
        await dispatch(updateOnCreate(response.data));
        return onSuccess.handle('Your accommodation was successfully created');
    } catch (error) {
        console.log(error.response);
        Errors.handle(error);
        return dispatch(apiError(error));
    }
};

export const getAccommodation = (page, limit) => async (dispatch) => {
    dispatch(apiStart())
    try {
        const response = await httpService.get(`/accommodations?page=${page}&numberOfRows=${limit}`);
        return dispatch(apiGetSuccess(response.data));
    } catch (error) {
        console.log(error.response);
        Errors.handle(error);
        return dispatch(apiGetError(error));
    }
}

export const dispatchCurrentAccommodation = (data) => async (dispatch) => {
    dispatch(apiStart());
    try {
        return dispatch(apiAccommodationSuccess(data));
    } catch (error) {
        console.log(error.response);
        Errors.handle(error);
        return dispatch(apiError(error));
    }
};