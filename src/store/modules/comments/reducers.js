const initialState = {
    isLoading: false,
    comment: '',
    comments: [],
    request: [],
    error: null
};

const postComment = (state = initialState, action) => {
    switch(action.type) {
        case 'ADD_COMMENT_START': {
            return {
                ...state,
                isLoading: true
            };
        }
        case 'ADD_COMMENT_SUCCESS': {
            return {
                ...state,
                comment: action.payload,
                isLoading: false,
                error: null
            };
        }
        case 'ADD_COMMENT_FAILURE': {
            return {
                ...state,
                error: action.error,
                isLoading: false
            };
        }

        case 'GET_COMMENTS_START': {
            return {
            ...state,
            isLoading: true
            };
        }
        case 'GET_COMMENTS_SUCCESS': {
            return {
            ...state,
            comments: action.payload,
            error: null,
            isLoading: false
            };
        }
        case 'GET_COMMENTS_FAILURE': {
            return {
            ...state,
            error: action.payload,
            isLoading: false
            };
        }
        case 'DELETE_COMMENT_START': {
            return {
                ...state,
                 isLoading: true
            };
        }
        case 'DELETE_COMMENT_SUCCESS': {
            return {
                ...state,
                error: null,
                isLoading: false
            };
        }
        case 'DELETE_COMMENT_FAILURE': {
            return {
                ...state,
                error: action.payload,
                isLoading: false
            };
        }
        case 'GET_REQUEST_START': {
            return{
                ...state,
                isLoading: true
            };
        }
        case 'GET_REQUEST_SUCCESS': {
            return{
                ...state,
                request: action.payload,
                isLoading: false
            };
        }
        case 'GET_REQUEST_FAILURE': {
            return{
                ...state,
                error: action.payload,
                isLoading: false
            };
        }
        default: {
            return state;
        }
    }
};
export default postComment;
