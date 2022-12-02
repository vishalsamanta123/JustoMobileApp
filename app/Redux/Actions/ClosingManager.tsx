import apiEndPoints from "app/components/utilities/apiEndPoints";
import { apiCall } from "app/components/utilities/httpClient";
import {
    GET_CLOSINGMANAGER_LIST, GET_CLOSINGMANAGER_LIST_ERROR, GET_CLOSINGMANAGER_DETAIL, GET_CLOSINGMANAGER_DETAIL_ERROR
} from "../types";

export const getClosingManagerList = (params: any) => async (dispatch: any) => {
    try {
        const res = await apiCall("post", apiEndPoints.GET_CLOSINGMANAGER, {});
        if (res.data.status == 200) {
            dispatch({
                type: GET_CLOSINGMANAGER_LIST,
                payload: res.data,
            });
        } else {
            return [];
        }
    } catch (e) {
        dispatch({
            type: GET_CLOSINGMANAGER_LIST_ERROR,
            payload: console.log(e),
        });
    }
};

export const getClosingDetail = (params: any) => async (dispatch: any) => {
    try {
        const res = await apiCall("post", apiEndPoints.GETUSERDETAIL, params);
        if (res.data.status === 200) {
            dispatch({
                type: GET_CLOSINGMANAGER_DETAIL,
                payload: res.data,
            });

            dispatch({
                type: GET_CLOSINGMANAGER_DETAIL_ERROR,
                payload: res.data.data[0],
            });

        } else {
            return [];
        }
    } catch (e) {
        dispatch({
            type: GET_CLOSINGMANAGER_DETAIL_ERROR,
            payload: console.log(e),
        });
    }
};