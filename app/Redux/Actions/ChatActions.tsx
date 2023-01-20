import apiEndPoints from "app/components/utilities/apiEndPoints";
import { apiCall } from "app/components/utilities/httpClient";
import { CHAT_ERROR, GET_ALL_USER_CHAT_LIST, GET_RECENT_CHAT_LIST, GET_RECENT_CHAT_LIST_ERROR, START_LOADING, STOP_LOADING, UPDATE_CHAT_STATUS, UPDATE_CHAT_STATUS_ERROR } from "../types";

export const getAllUserChatList = (params: any) => async (dispatch: any) => {
    dispatch({ type: START_LOADING });
    try {
      const res = await apiCall("post", apiEndPoints.GET_ALL_USER_CHAT_LIST, params);
      if (res.data.status === 200) {
        dispatch({
          type: GET_ALL_USER_CHAT_LIST,
          payload: res.data,
        });
      } else {
        dispatch({
          type: CHAT_ERROR,
          payload: [],
        });
      }
    } catch (e) {
      dispatch({
        type: CHAT_ERROR,
        payload: [],
      });
    } finally {
      dispatch({ type: STOP_LOADING });
    }
  };
export const chatStatusUpdate = (params: any) => async (dispatch: any) => {
    dispatch({ type: START_LOADING });
    try {
      const res = await apiCall("post", apiEndPoints.UPDATE_CHAT_STATUS, params);
      console.log('res: chatStatusUpdate', res);
      if (res.data.status === 200) {
        dispatch({
          type: UPDATE_CHAT_STATUS,
          payload: res.data,
        });
      } else {
        dispatch({
          type: UPDATE_CHAT_STATUS_ERROR,
          payload: [],
        });
      }
    } catch (e) {
      dispatch({
        type: UPDATE_CHAT_STATUS_ERROR,
        payload: [],
      });
    } finally {
      dispatch({ type: STOP_LOADING });
    }
  };

export const getRecentChatList = (params: any) => async (dispatch: any) => {
console.log('params: getRecentChat', params);
    dispatch({ type: START_LOADING });
    try {
      const res = await apiCall("post", apiEndPoints.GET_RECENT_CHAT_LIST, params);
      console.log('res: getRecentChatList', res);
      if (res.data.status === 200) {
        dispatch({
          type: GET_RECENT_CHAT_LIST,
          payload: res.data,
        });
      } else {
        dispatch({
          type: GET_RECENT_CHAT_LIST_ERROR,
          payload: [],
        });
      }
    } catch (e) {
      dispatch({
        type: GET_RECENT_CHAT_LIST_ERROR,
        payload: [],
      });
    } finally {
      dispatch({ type: STOP_LOADING });
    }
  };