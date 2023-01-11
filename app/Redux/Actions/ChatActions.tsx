import apiEndPoints from "app/components/utilities/apiEndPoints";
import { apiCall } from "app/components/utilities/httpClient";
import { CHAT_ERROR, GET_ALL_USER_CHAT_LIST, START_LOADING, STOP_LOADING } from "../types";

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