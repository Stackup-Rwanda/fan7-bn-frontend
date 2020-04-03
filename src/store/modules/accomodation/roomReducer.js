// root reducer codes

const initialState = {
    isLoading: false,
    room: {},
    error: null,
};

const allInitialState = {
    isLoading: false,
    count: 0,
    rooms: [],
    error: null,
}

export const currentRoom = (state = initialState, action) => {
    switch (action.type) {
        case 'CREATE_ROOM_START': {
            return {
                ...state,
                isLoading: true,
            };
        }
        case 'CREATE_ROOM_SUCCESS': {
            return {
                ...state,
                room: { ...action.payload },
                error: null,
                isLoading: false,
            };
        }
        case 'CREATE_ROOM_ERROR': {
            return {
                ...state,
                error: action.error,
                isLoading: false,
            };
        }
        default: {
            return state;
        }
    }
};

export const allAccommodationRooms = (state = allInitialState, { type, payload }) => {
    switch (type) {
        case 'ACCOMMODATION_START': {
            return {
                ...state,
                isLoading: true,
            };
        }
        case 'GET_ROOM_SUCCESS': {
            return {
                ...state,
                count: 0,
                rooms: payload,
                error: null,
                isLoading: false,
            };
        }
        // case 'UPDATE_ON_CREATE_ROOM': {
        //     const {  } = state
        //     accommodations.pop()
        //     return {
        //         ...state,
        //         accommodations: [payload, ...accommodations],
        //     };
        // }
        case 'GET_ROOM_ERROR': {
            return {
                ...state,
                error: payload,
                isLoading: false,
            };
        }
        default: {
            return state;
        }
    }
};