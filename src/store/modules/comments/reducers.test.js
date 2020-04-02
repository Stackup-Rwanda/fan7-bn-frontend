import commentReducer from './reducers';

describe('comments Test', () => {
    const initialState = {
        isLoading: false,
        comment: '',
        comments: [],
        request: [],
        error: null
    };
    ('it should return initial state', () => {
       expect(commentReducer(undefined, {})).toEqual(initialState);
    });  
    it('should handle ADD_COMMENT_START', () => {
        const payload = {
            isLoading: true
        }
        const newState = commentReducer(initialState, {
            type: 'ADD_COMMENT_START',
            payload: payload
        });
        expect(newState.isLoading).toBeTruthy();
    });
    it('should handle ADD_COMMENT_SUCCESS', () => {
        const payload = {
            comment: 'Hannah Montana',
            isLoading: false
        };
        const newState = commentReducer(initialState, {
            type: 'ADD_COMMENT_SUCCESS',
            payload: payload
        });
        expect(newState.isLoading).toBeFalsy();
    });
    it('should handle ADD_COMMENT_FAILURE', () => {
        const payload = {
            isLoading: false
        };
        const newState = commentReducer(initialState, {
            type: 'ADD_COMMENT_FAILURE',
            payload: payload
        });
        expect(newState.isLoading).toBeFalsy();
    });
    it('should handle GET_COMMENT_START', () => {
        const payload = {
            isLoading: true,
        };
        const newState = commentReducer(initialState, {
            type: 'GET_COMMENTS_START',
            payload: payload
        });
        expect(newState.isLoading).toBeTruthy();
    });
    it('should handle GET_COMMENTS_SUCCESS', () => {
        const payload = {
            comments: [],
            isLoading: false
        };
        const newState = commentReducer(initialState, {
            type: 'GET_COMMENTS_SUCCESS',
            payload: payload
        });
        expect(newState.isLoading).toBeFalsy();
    });
    it('should handle GET_COMMENTS_FAILURE', () => {
        const payload = {
            isLoading: false
        };
        const newState = commentReducer(initialState, {
            type: 'GET_COMMENTS_FAILURE',
            payload: payload
        });
        expect(newState.isLoading).toBeFalsy();
    });
    it('should handle DELETE_COMMENT_START', () => {
        const payload = {
            isLoading: true
        };
        const newState = commentReducer(initialState, {
            type: 'DELETE_COMMENT_START',
            payload: payload
        });
        expect(newState.isLoading).toBeTruthy();
    });
    it('shoould handle DELETE_COMMENT_SUCCESS', () => {
        const payload = {
            id: 2,
            isLoading: false
        };
        const newState = commentReducer(initialState, {
            type: 'DELETE_COMMENT_SUCCESS',
            payload: payload
        });
        expect(newState.isLoading).toBeFalsy();
    });
    it('should handle DELETE_COMMENT_FAILURE', () => {
        const payload = {
            isLoading: false
        };
        const newState = commentReducer(initialState, {
            type: 'DELETE_COMMENT_FAILURE',
            payload: payload
        });
        expect(newState.isLoading).toBeFalsy();
    });
    it('should handle GET_REQUEST_START', () => {
        const payload = {
            isLoading: true
        };
        const newState = commentReducer(initialState, {
            type: 'GET_REQUEST_START',
            payload: payload
        });
        expect(newState.isLoading).toBeTruthy();
    });
    it('should handle GET_REQUEST_SUCCESS', () => {
        const payload = {
            isLoading: false
        };
        const newState = commentReducer(initialState, {
            type: 'GET_REQUEST_SUCCESS',
            payload: payload
        });
        expect(newState.isLoading).toBeFalsy();
    });
    it('should handle GET_REQUEST_FAILURE', () => {
        const payload = {
            isLoading: false
        };
        const newState = commentReducer(initialState, {
            type: 'GET_REQUEST_FAILURE',
            payload: payload
        });
        expect(newState.isLoading).toBeFalsy();
    });
})