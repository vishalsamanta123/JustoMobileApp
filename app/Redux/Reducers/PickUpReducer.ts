import { GET_PICKUP_LIST, GET_PICKUP_LIST_ERROR } from "../types";

const initialState = {
    response: null,
    list: false
  };
  
  
  
  export function PickUpReducer(state = initialState, action: any) {
    switch (action.type) {
  
      case GET_PICKUP_LIST:
        return {
          ...state,
          list: true,
          response: action.payload,
        };
      case GET_PICKUP_LIST_ERROR:
        return {
          ...state,
          list: true,
          response: action.payload,
        };
  
      default:
        return state;
    }
  }