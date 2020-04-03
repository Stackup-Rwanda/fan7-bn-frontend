// root reducer codes

const initialState = {
    isLoading: false,
    accommodation: {},
    error: null,
};

const allInitialState = {
    isLoading: false,
    count: 0,
    accommodations: [],
    error: null,
}

export const currentAccommodation = (state = initialState, action) => {
    switch (action.type) {
        case 'CREATE_ACCOMMODATION_START': {
            return {
                ...state,
                isLoading: true,
            };
        }
        case 'CREATE_ACCOMMODATION_SUCCESS': {
            return {
                ...state,
                accommodation: { ...action.payload },
                error: null,
                isLoading: false,
            };
        }
        case 'CREATE_ACCOMMODATION_ERROR': {
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

export const allAccommodations = (state = allInitialState, { type, payload}) => {
    switch (type) {
        case 'ACCOMMODATION_START': {
            return {
                ...state,
                isLoading: true,
            };
        }
        case 'GET_ACCOMMODATION_SUCCESS': {
            return {
                ...state,
                count: payload.count,
                accommodations: payload.rows,
                error: null,
                isLoading: false,
            };
        }
        case 'UPDATE_ON_CREATE_ACCOMMODATION': {
            const { accommodations } = state
            accommodations.pop()
            return {
                ...state,
                accommodations: [payload, ...accommodations],
            };
        }
        case 'CREATE_ACCOMMODATION_ERROR': {
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

 

