import {
    ADD_COMMENT_START,
    ADD_COMMENT_SUCCESS,
    ADD_COMMENT_FAILURE,
    GET_COMMENTS_START,
    GET_COMMENTS_SUCCESS, 
    GET_COMMENTS_FAILURE,
    DELETE_COMMENT_START,
    DELETE_COMMENT_SUCCESS,
    DELETE_COMMENT_FAILURE,
    GET_REQUEST_START,
    GET_REQUEST_SUCCESS,
    GET_REQUEST_FAILURE
    } from './actionTypes';
    import HttpService from '../../../utils/HttpService';
    import successMsg from '../../../utils/helpers/successMsg';
    import Errors from '../../../utils/helpers/errorHandle';

    export const apiStart = () => ({
        type: ADD_COMMENT_START
    });
    
    export const apiSuccess = (payload) => ({
        type: ADD_COMMENT_SUCCESS,
        payload
    });
    
    export const apiFailure = (error) => ({
        type: ADD_COMMENT_FAILURE,
        error
    });

    export const getStart = () => ({
        type: GET_COMMENTS_START,
    });
    export const getSuccess = (payload) => ({
        type: GET_COMMENTS_SUCCESS,
        payload
    });
    export const getFailure = (error) => ({
        type: GET_COMMENTS_FAILURE,
        error
    });

    export const deleteStart = () => ({
        type: DELETE_COMMENT_START,
    });
    export const deleteSuccess = (payload) => ({
        type: DELETE_COMMENT_SUCCESS,
        payload
    });
    export const deleteFailure = (error) => ({
        type: DELETE_COMMENT_FAILURE,
        error
    });

    export const getRequestStart = () => ({
        type: GET_REQUEST_START
    });
    export const getRequestSuccess = (payload) => ({
        type: GET_REQUEST_SUCCESS,
        payload
    });
    export const getRequestFailure = (error) => ({
        type: GET_REQUEST_FAILURE,
        error
    });
    export const addComment = (data) => async (dispatch) => {
    dispatch(apiStart());
    try {
        const comment = {
            comment : data.comment.comment,
        }
        const response = await HttpService.post(`/requests/1/comment`, comment);
        successMsg.handle(response.message);
        return dispatch(apiSuccess(response.data.data));
        } 
        catch (error) {
            Errors.handle(error)
            return dispatch(apiFailure(error.response.data));
        }
    };

    export const viewComments = () => async (dispatch) => {
        dispatch(getStart());
        try {
            const response = await HttpService.get(`/requests/1/comments`);
            return dispatch(getSuccess(response.data));
        } catch (error) {
            return dispatch(getFailure(error.response.data));
        }
    };

    export const deleteComment = (id) => async (dispatch) => {
        dispatch(deleteStart());
        try {
            const response = await HttpService.delete(`/requests/comment/${id}`);
            successMsg.handle(response.message);
            return dispatch(deleteSuccess(response));
        } catch (error) {
            Errors.handle(error)
            return dispatch(deleteFailure(error.response));
        }
    };

    export const viewRequest = () => async (dispatch) => {
        dispatch(getRequestStart());
        try {
            const response = await HttpService.get(`/requests/1`);
            return dispatch(getRequestSuccess(response.data));
        } catch (error) {
            Errors.handle(error)
            return dispatch(getRequestFailure(error.response.data));
        }
    };