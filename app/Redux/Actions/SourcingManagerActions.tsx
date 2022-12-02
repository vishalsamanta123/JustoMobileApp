import { handleApiError } from "app/components/ErrorMessage/HandleApiErrors";
import apiEndPoints from "app/components/utilities/apiEndPoints";
import { apiCall } from "app/components/utilities/httpClient";
import { ASSIGNCP_SM, ASSIGNCP_SM_ERROR, GET_ASSIGNCP_LIST, GET_ASSIGNCP_LIST_ERROR, GET_SOURCINGMANAGER_DETAIL, GET_SOURCINGMANAGER_DETAIL_ERROR, GET_SOURCINGMANAGER_LIST, GET_SOURCINGMANAGER_LIST_ERROR, START_LOADING, STOP_LOADING } from "../types";

export const getSourcingManagerList = () => async (dispatch: any) => {
    dispatch({ type: START_LOADING })
    try {
        const res = await apiCall("post", apiEndPoints.GET_SOURCING_MANAGER_LIST, {});
        if (res?.data?.status === 200) {
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
    finally {
        dispatch({ type: STOP_LOADING })
    }
}
export const getSourcingManagerDetail = (parma: any) => async (dispatch: any) => {
    dispatch({ type: START_LOADING })
    try {
        const res = await apiCall("post", apiEndPoints.GET_SOURCING_MANAGER_DETAIL, parma);
        console.log('res GET_SOURCING_MANAGER_DETAIL: ', res);
        if (res?.data?.status === 200) {
            console.log('res.data: ', res.data);
            dispatch({
                type: GET_SOURCINGMANAGER_DETAIL,
                payload: res.data
            })
        } else {
            handleApiError(res?.data)
            dispatch({
                type: GET_SOURCINGMANAGER_DETAIL_ERROR,
                payload: [],
            })
        }
    }
    catch (e) {
        console.log('e: ', e);
        dispatch({
            type: GET_SOURCINGMANAGER_DETAIL_ERROR,
            payload: console.log(e),
        })
    }
    finally {
        dispatch({ type: STOP_LOADING })
    }
}
export const getAssignCPList = (parma: any) => async (dispatch: any) => {
    console.log('parma: ', parma);
    dispatch({ type: START_LOADING })
    try {
        const res = await apiCall("post", apiEndPoints.GET_ASSIGNCP_LIST, parma);
        console.log('res GET_ASSIGNCP_LIST: ', res);
        if (res?.data?.status === 200) {
            console.log('res.data: ', res.data);
            dispatch({
                type: GET_ASSIGNCP_LIST,
                payload: res.data
            })
        } else {
            handleApiError(res?.data)
            dispatch({
                type: GET_ASSIGNCP_LIST_ERROR,
                payload: [],
            })
        }
    }
    catch (e) {
        console.log('e: ', e);
        dispatch({
            type: GET_ASSIGNCP_LIST_ERROR,
            payload: console.log(e),
        })
    }
    finally {
        dispatch({ type: STOP_LOADING })
    }
}
export const assignCPSM = (parma: any) => async (dispatch: any) => {
    console.log('parma: ', parma);
    dispatch({ type: START_LOADING })
    try {
        const res = await apiCall("post", apiEndPoints.ASSIGNCP_SM, parma);
        console.log('res ASSIGNCP_SM: ', res);
        if (res?.data?.status === 200) {
            console.log('res.data: ', res.data);
            dispatch({
                type: ASSIGNCP_SM,
                payload: res.data
            })
        } else {
            handleApiError(res?.data)
            dispatch({
                type: ASSIGNCP_SM_ERROR,
                payload: [],
            })
        }
    }
    catch (e) {
        console.log('e: ', e);
        dispatch({
            type: ASSIGNCP_SM_ERROR,
            payload: console.log(e),
        })
    }
    finally {
        dispatch({ type: STOP_LOADING })
    }
}