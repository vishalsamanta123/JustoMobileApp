import { handleApiError } from "app/components/ErrorMessage/HandleApiErrors";
import apiEndPoints from "app/components/utilities/apiEndPoints";
import { apiCall } from "app/components/utilities/httpClient";
import {
    GET_VISITOR_DETAIL, VISITOR_ERROR, VISITOR_LIST, VISITOR_STATUSUPDATE, ADD_VISITOR,
    ADD_VISITOR_FORM, EDIT_VISITOR, REMOVE_VISITOR, START_LOADING, STOP_LOADING, GET_USERVISIT_LIST, GET_USERVISIT_LIST_ERROR, CLOSEVISIT, CLOSEVISIT_ERROR
} from "../types";

export const getAllLeadsList = (params: any) => async (dispatch: any) => {
    dispatch({ type: START_LOADING })
    try {
        const res = await apiCall("post", apiEndPoints.VISITORLIST, params);
        console.log('res: getAllLeadsList ', res);
        if (res?.data?.status == 200) {
            dispatch({
                type: VISITOR_LIST,
                payload: res.data,
            });
        } else {
            handleApiError(res.data)
            dispatch({
                type: VISITOR_LIST,
                payload: [],
            });
        }
    } catch (e) {
        dispatch({
            type: VISITOR_ERROR,
            payload: console.log(e),
        });
    }
    finally {
        dispatch({ type: STOP_LOADING })
    }
};

export const statusUpdate = (params: any) => async (dispatch: any) => {
    dispatch({ type: START_LOADING })
    try {
        const res = await apiCall("post", apiEndPoints.VISITOR_STATUS_UPDATE, params);
        if (res.data.status == 200) {
            dispatch({
                type: VISITOR_STATUSUPDATE,
                payload: res.data,
            });
        } else {
            handleApiError(res.data)
            dispatch({
                type: VISITOR_ERROR,
                payload: [],
            });
        }
    } catch (e) {
        dispatch({
            type: VISITOR_ERROR,
            payload: console.log(e),
        });
    }
    finally {
        dispatch({ type: STOP_LOADING })
    }
};
export const addVisitor = (params: any) => async (dispatch: any) => {
    dispatch({ type: START_LOADING })
    try {
        const res = await apiCall("post", apiEndPoints.ADD_VISITOR_, params);
        if (res.data.status == 200) {
            dispatch({
                type: ADD_VISITOR,
                payload: res.data,
            });
        } else {
            handleApiError(res.data)
            return [];
        }
    } catch (e) {
        dispatch({
            type: VISITOR_ERROR,
            payload: console.log(e),
        });
    }
    finally {
        dispatch({ type: STOP_LOADING })
    }
};
export const addVisitorRemove = () => async (dispatch: any) => {
    try {
        dispatch({
            type: REMOVE_VISITOR,
            payload: null,
        });
    } catch (e) {
        dispatch({
            type: VISITOR_ERROR,
            payload: console.log(e),
        });
    }
};
export const editVisitor = (params: any) => async (dispatch: any) => {
    dispatch({ type: START_LOADING })
    try {
        const res = await apiCall("post", apiEndPoints.EDIT_VISITOR_, params);
        if (res.data.status == 200) {
            dispatch({
                type: EDIT_VISITOR,
                payload: res.data,
            });
        } else {
            handleApiError(res.data)
            return [];
        }
    } catch (e) {
        dispatch({
            type: VISITOR_ERROR,
            payload: console.log(e),
        });
    }
    finally {
        dispatch({ type: STOP_LOADING })
    }
};

export const getVisitorDetail = (params: any) => async (dispatch: any) => {
    dispatch({ type: START_LOADING })
    try {
        const res = await apiCall("post", apiEndPoints.GET_VISITOR_DETAIL_, params);
        if (res.data.status === 200) {
            dispatch({
                type: GET_VISITOR_DETAIL,
                payload: res.data,
            });
        } else {
            handleApiError(res.data)
            return [];
        }
    } catch (e) {
        dispatch({
            type: VISITOR_ERROR,
            payload: console.log(e),
        });
    }
    finally {
        dispatch({ type: STOP_LOADING })
    }
};
export const getUserVisitList = (params: any) => async (dispatch: any) => {
    dispatch({ type: START_LOADING })
    try {
        const res = await apiCall("post", apiEndPoints.GET_USERVISTLIST, params);
        if (res.data.status === 200) {
            dispatch({
                type: GET_USERVISIT_LIST,
                payload: res.data,
            });
        } else {
            handleApiError(res.data)
            dispatch({
                type: GET_USERVISIT_LIST_ERROR,
                payload: [],
            });
        }
    } catch (e) {
        dispatch({
            type: GET_USERVISIT_LIST_ERROR,
            payload: console.log(e),
        });
    }
    finally {
        dispatch({ type: STOP_LOADING })
    }
};

export const closeVisit = (params: any) => async (dispatch: any) => {
    dispatch({ type: START_LOADING })
    try {
        const res = await apiCall("post", apiEndPoints.CLOSE_VISIT, params);
        console.log('res: CLOSE_VISIT ', res);
        if (res.data.status === 200) {
            dispatch({
                type: CLOSEVISIT,
                payload: res.data,
            });
        } else {
            handleApiError(res.data)
            dispatch({
                type: CLOSEVISIT_ERROR,
                payload: [],
            });
        }
    } catch (e) {
        dispatch({
            type: CLOSEVISIT_ERROR,
            payload: console.log(e),
        });
    }
    finally {
        dispatch({ type: STOP_LOADING })
    }
}