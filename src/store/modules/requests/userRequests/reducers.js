import {
    CREATE_REQUEST_START,
    CREATE_REQUEST_SUCCESS,
    CREATE_REQUEST_ERROR,
    EDIT_REQUEST_START,
    EDIT_REQUEST_SUCCESS,
    EDIT_REQUEST_ERROR,
    GET_REQUEST_START,
    GET_REQUEST_SUCCESS,
    GET_REQUEST_ERROR,
    GET_ACCOMMODATIONS_START,
    GET_ACCOMMODATIONS_SUCCESS,
    GET_ACCOMMODATIONS_ERROR
} from './actionTypes';

const initialState = {
    requests: [],
    accommodations: [],
    loading: false,
    error: null
 

};

const tripRequestReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case CREATE_REQUEST_START:
            return {
                ...state,
                loading: true,
            };

        case CREATE_REQUEST_SUCCESS:
            return {
                ...state,
                loading: false,
                request: payload,
            };

        case CREATE_REQUEST_ERROR:
            return {
                ...state,
                loading: false,
                error: payload || null,
            };
            case GET_REQUEST_START:
                return {
                    ...state,
                    loading: true,
                };
    
            case GET_REQUEST_SUCCESS:
                return {
                    ...state,
                    loading: false,
                    requests: payload,
                };
    
            case GET_REQUEST_ERROR:
                return {
                    ...state,
                    loading: false,
                    error: payload || null,
                };
    
        case GET_ACCOMMODATIONS_START:
            return {
                ...state,
                loading: true
            };

        case GET_ACCOMMODATIONS_SUCCESS:
            return {
                ...state,
                loading: false,
                accommodations: payload,
            };

        case GET_ACCOMMODATIONS_ERROR:
            return {
                ...state,
                loading: false,
                error: payload || null,
            };
            case EDIT_REQUEST_START:
                return {
                    ...state,
                    loading: true
                };
    
            case EDIT_REQUEST_SUCCESS:
                return {
                    ...state,
                    loading: false,
                    accommodations: payload,
                };
    
            case EDIT_REQUEST_ERROR:
                return {
                    ...state,
                    loading: false,
                    error: payload || null,
                };

        default:
            return state;
    }
};
export default tripRequestReducer;