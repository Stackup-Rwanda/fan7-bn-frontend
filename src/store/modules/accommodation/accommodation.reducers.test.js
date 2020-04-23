import reducer from './reducers';
import {
  GET_ALL_ACCOMMODATIONS_START,
  GET_ALL_ACCOMMODATIONS_SUCCESS,
  GET_ALL_ACCOMMODATIONS_ERROR,
  GET_SINGLE_ACCOMMODATION_START,
  GET_SINGLE_ACCOMMODATION_SUCCESS,
  GET_SINGLE_ACCOMMODATION_ERROR,
  FILTER_ACCOMMODATIONS
} from './types';

describe('Reducers test', () => {
  it('should return the initial state', () => {
    const expectedAction = {
      acoommodations: [],
      accommodation: null,
      loading: false,
      error: null,
    };

    expect(reducer(undefined, {})).toEqual(expectedAction);
  });

  it('should handle GET_ALL_ACCOMMODATIONS_START', () => {
    const action = {
      type: GET_ALL_ACCOMMODATIONS_START,
    };
    const expectedAction = {
      loading: true,
    };

    expect(reducer({}, action)).toEqual(expectedAction);
  });

  it('should handle GET_ALL_ACCOMMODATIONS_SUCCESS', () => {
    const action = {
      type: GET_ALL_ACCOMMODATIONS_SUCCESS,
      payload: [
        {
          id: 1,
          name: 'John Doe',
          address: 'rwanda, kigali',
          amenities: ['WIFI', 'WIFI'],
          services: ['conference hall', 'entertainment'],
          description: 'Good',
          image: ['uiqwgriqw.png', 'kgywd.png'],
          geo_location: '10.84854, 20.234708',
          status: 'Pending',
          room_count: '4',
          feedbacks: [
            {
              id: 1,
              user_id: 1,
              accommodation_id: 1,
              feedback: 'Provide better breakfast',
              createdAt: '2020-05-03T13:27:38.705Z',
              updatedAt: '2020-05-03T13:27:38.705Z',
            },
          ],
          ratings: [],
        },
      ],
    };

    const expectedAction = {
      loading: false,
      accommodations: [
        {
          id: 1,
          name: 'John Doe',
          address: 'rwanda, kigali',
          amenities: ['WIFI', 'WIFI'],
          services: ['conference hall', 'entertainment'],
          description: 'Good',
          image: ['uiqwgriqw.png', 'kgywd.png'],
          geo_location: '10.84854, 20.234708',
          status: 'Pending',
          room_count: '4',
          feedbacks: [
            {
              id: 1,
              user_id: 1,
              accommodation_id: 1,
              feedback: 'Provide better breakfast',
              createdAt: '2020-05-03T13:27:38.705Z',
              updatedAt: '2020-05-03T13:27:38.705Z',
            },
          ],
          ratings: [],
        },
      ],
    };

    expect(reducer({}, action)).toEqual(expectedAction);
  });

  it('should handle GET_ALL_ACCOMMODATIONS_ERROR', () => {
    const action = {
      type: GET_ALL_ACCOMMODATIONS_ERROR,
      payload: 'Not Found',
    };
    const expectedAction = {
      error: 'Not Found',
      loading: false,
    };

    expect(reducer({}, action)).toEqual(expectedAction);
  });

  it('should handle GET_SINGLE_ACCOMMODATION_START', () => {
    const action = {
      type: GET_SINGLE_ACCOMMODATION_START,
    };
    const expectedAction = {
      loading: true,
    };

    expect(reducer({}, action)).toEqual(expectedAction);
  });

  it('should handle GET_SINGLE_ACCOMMODATION_SUCCESS', () => {
    const action = {
      type: GET_SINGLE_ACCOMMODATION_SUCCESS,
      payload: {
        id: 2,
        user_id: 14,
        name: 'serena hotel',
        address: 'rwanda, kigali',
        description: 'Good',
        image: ['uiqwgriqw.png', 'kgywd.png'],
        geo_location: '10.84854, 20.234708',
        services: ['conference hall', 'entertainment'],
        amenities: ['WIFI', 'WIFI'],
        status: 'Approved',
        createdAt: '2020-05-03T13:27:38.475Z',
        updatedAt: '2020-05-03T13:27:38.475Z',
        rooms: [],
        feedbacks: [
          {
            id: 2,
            user_id: 1,
            accommodation_id: 2,
            feedback: 'wifi working slow',
            createdAt: '2020-05-03T13:27:38.705Z',
            updatedAt: '2020-05-03T13:27:38.705Z',
          },
        ],
        ratings: [],
      },
    };

    const expectedAction = {
      loading: false,
      accommodation: {
        id: 2,
        user_id: 14,
        name: 'serena hotel',
        address: 'rwanda, kigali',
        description: 'Good',
        image: ['uiqwgriqw.png', 'kgywd.png'],
        geo_location: '10.84854, 20.234708',
        services: ['conference hall', 'entertainment'],
        amenities: ['WIFI', 'WIFI'],
        status: 'Approved',
        createdAt: '2020-05-03T13:27:38.475Z',
        updatedAt: '2020-05-03T13:27:38.475Z',
        rooms: [],
        feedbacks: [
          {
            id: 2,
            user_id: 1,
            accommodation_id: 2,
            feedback: 'wifi working slow',
            createdAt: '2020-05-03T13:27:38.705Z',
            updatedAt: '2020-05-03T13:27:38.705Z',
          },
        ],
        ratings: [],
      },
    };

    expect(reducer({}, action)).toEqual(expectedAction);
  });

  it('should handle GET_SINGLE_ACCOMMODATION_ERROR', () => {
    const action = {
      type: GET_SINGLE_ACCOMMODATION_ERROR,
      payload: 'Not Found',
    };
    const expectedAction = {
      error: 'Not Found',
      loading: false,
    };

    expect(reducer({}, action)).toEqual(expectedAction);
  });

  it('should handle FILTER_ACCOMMODATIONS', () => {
    const action = {
      type: FILTER_ACCOMMODATIONS,
      payload: [
        {
          id: 1,
          name: 'John Doe',
          address: 'rwanda, kigali',
          amenities: ['WIFI', 'WIFI'],
          services: ['conference hall', 'entertainment'],
          description: 'Good',
          image: ['uiqwgriqw.png', 'kgywd.png'],
          geo_location: '10.84854, 20.234708',
          status: 'Pending',
          room_count: '4',
          feedbacks: [
            {
              id: 1,
              user_id: 1,
              accommodation_id: 1,
              feedback: 'Provide better breakfast',
              createdAt: '2020-05-03T13:27:38.705Z',
              updatedAt: '2020-05-03T13:27:38.705Z',
            },
          ],
          ratings: [],
        },
      ],
    };

    const expectedAction = {
      loading: false,
      accommodations: [
        {
          id: 1,
          name: 'John Doe',
          address: 'rwanda, kigali',
          amenities: ['WIFI', 'WIFI'],
          services: ['conference hall', 'entertainment'],
          description: 'Good',
          image: ['uiqwgriqw.png', 'kgywd.png'],
          geo_location: '10.84854, 20.234708',
          status: 'Pending',
          room_count: '4',
          feedbacks: [
            {
              id: 1,
              user_id: 1,
              accommodation_id: 1,
              feedback: 'Provide better breakfast',
              createdAt: '2020-05-03T13:27:38.705Z',
              updatedAt: '2020-05-03T13:27:38.705Z',
            },
          ],
          ratings: [],
        },
      ],
    };

    expect(reducer({}, action)).toEqual(expectedAction);
  });
});
