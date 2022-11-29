import { handleApiError } from "app/components/ErrorMessage/HandleApiErrors";
import apiEndPoints from "app/components/utilities/apiEndPoints";
import { apiCall } from "app/components/utilities/httpClient";
import { GET_CITY_LIST, GET_CITY_LIST_ERROR, GET_ROLE_LIST, GET_ROLE_LIST_ERROR } from "../types";

export const getCityList = (item: any) => async (dispatch: any) => {
    console.log('item: ', item);
    try {
        const res = await apiCall("post", apiEndPoints.GET_CITY_LIST, item);
        console.log('res GET_CITY_LIST: ', res);
        if (res.data.status == 200) {
            dispatch({
                type: GET_CITY_LIST,
                payload: res.data
            })
        } else {
            handleApiError(res?.data)
            dispatch({
                type: GET_CITY_LIST_ERROR,
                payload: []
            })
        }

    }
    catch (e) {
        dispatch({
            type: GET_CITY_LIST_ERROR,
            payload: console.log(e),
        })
    }
}
export const getRolesList = (item: any) => async (dispatch: any) => {
    console.log('item: ', item);
    try {
        const res = await apiCall("post", apiEndPoints.GET_ROLE_LIST, item);
        console.log('res GET_CITY_LIST: ', res);
        if (res.data.status == 200) {
            dispatch({
                type: GET_ROLE_LIST,
                payload: res.data
            })
        } else {
            handleApiError(res?.data)
            dispatch({
                type: GET_ROLE_LIST_ERROR,
                payload: []
            })
        }

    }
    catch (e) {
        dispatch({
            type: GET_ROLE_LIST_ERROR,
            payload: console.log(e),
        })
    }
}