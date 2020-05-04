import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';
import axios from 'axios';
import moxios from 'moxios';
import { addComment, viewComments, deleteComment, viewRequest } from './actions';
import {
    ADD_COMMENT_START,
    ADD_COMMENT_SUCCESS,
    ADD_COMMENT_FAILURE,
    GET_COMMENTS_START,
    GET_COMMENTS_SUCCESS, 
    GET_COMMENTS_FAILURE,
    DELETE_COMMENT_START,
    DELETE_COMMENT_SUCCESS,
    GET_REQUEST_START,
    GET_REQUEST_SUCCESS
    } from './actionTypes';

    const middlewares = [thunk];
    const mockStore = configureStore(middlewares);

    const onSuccess = response => {
        console.debug('Request Successful!', response);
        return response.data;
      };
      const onError = error => {
        console.error('Request Failed:', error.config);
        return error;
      };

      describe('it should dispatch the right action', () => {
        let axiosInstance;
        beforeEach(() => {
          axiosInstance = axios.create();
          moxios.install(axiosInstance);
        });
        afterEach(() => {
          moxios.uninstall(axiosInstance);
        });
        it('should dispatch add comment action', (done) => {
            const mockData = {
                status: 201,
                message: 'comment sucessfully created',
                data: {
                    comment: 'Hannah Montana'
                },
            };
            moxios.stubRequest('https://localhost:5000/api/requests/1/comment', {
                status: 200,
                response: mockData,
              }); 
            const data = {
                comment: 'Hannah Montana'
            };
            const expectedActions = [
                { type: ADD_COMMENT_START },
                {
                  type: ADD_COMMENT_SUCCESS,
                  payload: data,
                },
              ];
    const store = mockStore({});
    return store
      .dispatch(addComment())
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      })
      .finally(done());
  });
  it('should dispatch add comment failure action', (done) => {
    const errorResponse = {
        status: 404,
        response: { status: 404, error: 'Request is not found to add a comment' },
      };
      const error = 'Request is not found to add a comment';
      
    moxios.stubRequest('https://localhost:5000/api/requests/100/comments', {
        status: 404,
        response: errorResponse,
      });
      const expectedActions = [
        { type: ADD_COMMENT_START },
        {
          type: ADD_COMMENT_FAILURE,
          payload: error,
        },
      ];
  
      const store = mockStore({});
  
      return store
        .dispatch(addComment())
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        })
        .finally(done());
  });
  it('should dispatch view comments action', (done) => {
      const mockData = {
          status: 200,
          message: 'Comments fetched successfully',
          data: {
              comments: []
          },
      };
      moxios.stubRequest('https://localhost:5000/api/requests/1/comments', {
        status: 200,
        response: mockData,
      });
      const data = {
          comments: []
      };
      const expectedActions = [
        { type: GET_COMMENTS_START },
        {
          type: GET_COMMENTS_SUCCESS,
          payload: data,
        },
      ];
      const store = mockStore({});
      return store
        .dispatch(viewComments())
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        })
        .finally(done());
  });
  it('should dispatch delete comment action', (done) => {
    const mockData = {
        status: 200,
        message: 'Comment sucessfully deleted',
    };
    moxios.stubRequest('https://localhost:5000/api/requests/comment/1', {
      status: 200,
      response: mockData,
    });
    const data = {
        id: 4
    };
    const expectedActions = [
      { type: DELETE_COMMENT_START },
      {
        type: DELETE_COMMENT_SUCCESS,
        payload: data,
      },
    ];
    const store = mockStore({});
    return store
      .dispatch(deleteComment())
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      })
      .finally(done());
  });
  it('should dispatch view request trip action', (done) => {
    const mockData = {
        status: 200,
        message: 'Request data',
        data: {
            request: []
        },
    };
    moxios.stubRequest('https://localhost:5000/api/requests/1', {
      status: 200,
      response: mockData,
    });
    const data = {
        request: []
    };
    const expectedActions = [
      { type: GET_REQUEST_START },
      {
        type: GET_REQUEST_SUCCESS,
        payload: data,
      },
    ];
    const store = mockStore({});
    return store
      .dispatch(viewRequest())
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      })
      .finally(done());
  });
 });