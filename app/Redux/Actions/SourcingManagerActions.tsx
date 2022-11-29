import { handleApiError } from "app/components/ErrorMessage/HandleApiErrors";
import apiEndPoints from "app/components/utilities/apiEndPoints";
import { apiCall } from "app/components/utilities/httpClient";
import { GET_SOURCINGMANAGER_LIST, GET_SOURCINGMANAGER_LIST_ERROR } from "../types";

export const getSourcingManagerList = (item: any) => async (dispatch: any) => {
    try {
        console.log('item: ', item);
        const res = await apiCall("post", apiEndPoints.GET_SOURCING_MANAGER_LIST, item);
        console.log('res GET_SOURCING_MANAGER_LIST: ', res);
        if (res?.data?.status === 200) {
            console.log('res.data: ', res.data);
            dispatch({
                type: GET_SOURCINGMANAGER_LIST,
                payload: res.data
            })
        } else {
            handleApiError(res?.data)
            dispatch({
                type: GET_SOURCINGMANAGER_LIST_ERROR,
                payload: [],
            })
        }
    }
    catch (e) {
        console.log('e: ', e);
        dispatch({
            type: GET_SOURCINGMANAGER_LIST_ERROR,
            payload: console.log(e),
        })
    }
}