import { DELETE_NOTIFICATION, DELETE_NOTIFICATION_ERROR, GET_NOTIFICATION_LIST, NOTIFICATION_ERROR } from "../types";

const initialStatedetail = {
    response: null,
    list: false,
    loading: true,
  };

const initialState = {
    response: null,
    update: false,
    loading: true,
  };

export function notificationListReducer(state = initialStatedetail, action: any) {

    switch (action.type) {
  
      case GET_NOTIFICATION_LIST:
        return {
          ...state,
          list: true,
          loading: false,
          response: action.payload,
        };
      case NOTIFICATION_ERROR:
        return {
          ...state,
          list: false,
          loading: false,
          response: null,
        };
      default:
        return state;
    }
  }
export function deleteNotificationReducer(state = initialState, action: any) {
    switch (action.type) {
      case DELETE_NOTIFICATION:
        return {
          ...state,
          update: true,
          loading: false,
          response: action.payload,
        };
      case DELETE_NOTIFICATION_ERROR:
        return {
          ...state,
          update: false,
          loading: false,
          response: null,
        };
      default:
        return state;
    }
  }