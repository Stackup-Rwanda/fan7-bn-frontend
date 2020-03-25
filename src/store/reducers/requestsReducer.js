import { SUCCESS_GET_REQUESTS } from "../actions/types"

const initState = {
  requests: [],
  message: null,
  error: null,
}

export default (state = initState, { type, payload }) => {
  switch (type) {
    case SUCCESS_GET_REQUESTS:
      return {
        ...state,
        requests: payload,
        message: 'Success retreived',
      }   
  
    default:
      return state
  }
}