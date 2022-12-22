import apiEndPoints from "app/components/utilities/apiEndPoints";
import { apiCall } from "app/components/utilities/httpClient";
import { CHAT_ERROR, GET_ALL_USER_CHAT_LIST, START_LOADING, STOP_LOADING } from "../types";

export const getAllUserChatList = (params: any) => async (dispatch: any) => {
    console.log("params: in GET_ALL_USER_CHAT_LIST ", params);
    dispatch({ type: START_LOADING });
    try {
      const res = await apiCall("post", apiEndPoints.GET_ALL_USER_CHAT_LIST, params);
      // console.log('res: GET_ALL_USER_CHAT_LIST', res);
      if (res.data.status === 200) {
        /*  await AsyncStorage.setItem("AuthToken", res?.data?.token);   */
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