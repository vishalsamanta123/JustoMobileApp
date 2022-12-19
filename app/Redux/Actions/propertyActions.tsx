import apiEndPoints from "../../components/utilities/apiEndPoints";
import { apiCall } from "../../components/utilities/httpClient";
import { ALLOCATE_PROPERTY_TO_USER, GETPROPERTY_DETAIL, PROPERTY_COMPETITOR_LIST, PROPERTY_ERROR, PROPERTY_LIST, PROPERTY_STATUS_UPDATE, REMOVE_PROPERTYCOMPETITOR, SOURCING_MANAGER_LIST, START_LOADING, STOP_LOADING } from "../types";

export const getAllProperty = (params: any) => async (dispatch: any) => {
    dispatch({ type: START_LOADING })
    try {
        const res = await apiCall("post", apiEndPoints.PROPERTYLIST, params);
        if (res.data.status == 200) {
            dispatch({
                type: PROPERTY_LIST,
                payload: res.data,
            });
        } else {
            dispatch({
                type: PROPERTY_ERROR,
                payload: [],
            });
        }
    } catch (e) {

        dispatch({
            type: PROPERTY_ERROR,
            payload: console.log(e),
        });
    }
    finally {
        dispatch({ type: STOP_LOADING })
    }
};
export const getAllPropertyCompetitor = (params: any) => async (dispatch: any) => {
    dispatch({ type: START_LOADING })
    try {
        const res = await apiCall("post", apiEndPoints.GET_PROPERTY_COMPETITOR, {});
        if (res.data.status == 200) {
            dispatch({
                type: PROPERTY_COMPETITOR_LIST,
                payload: res.data,
            });
        } if (res.data.status == 201) {
            dispatch({
                type: PROPERTY_COMPETITOR_LIST,
                payload: res.data,
            });
        } else {
            dispatch({
                type: PROPERTY_ERROR,
                payload: [],
            });
        }
    } catch (e) {

        dispatch({
            type: PROPERTY_ERROR,
            payload: console.log(e),
        });
    }
    finally {
        dispatch({ type: STOP_LOADING })
    }
};
export const getFilterProperty = (params: any) => async (dispatch: any) => {
    dispatch({ type: START_LOADING })
    try {
        const res = await apiCall("post", apiEndPoints.PROPERTYFILTER, params);
        if (res.data.status == 200) {
            dispatch({
                type: PROPERTY_LIST,
                payload: res.data,
            });
        } else {
            dispatch({
                type: PROPERTY_LIST,
                payload: [],
            });
        }
    } catch (e) {
        dispatch({
            type: PROPERTY_ERROR,
            payload: console.log(e),
        });
    }
    finally {
        dispatch({ type: STOP_LOADING })
    }
};

export const getPropertyDetail = (params: any) => async (dispatch: any) => {
    dispatch({ type: START_LOADING });
    try {
        const res = await apiCall("post", apiEndPoints.GETPROPERTYDETAIL, params);

        if (res.data.status == 200) {
            dispatch({
                type: GETPROPERTY_DETAIL,
                payload: res.data,
            });
        } else {
            dispatch({
                type: GETPROPERTY_DETAIL,
                payload: [],
            });
        }
    } catch (e) {
        dispatch({
            type: PROPERTY_ERROR,
            payload: console.log(e),
        });
    }
    finally {
        dispatch({ type: STOP_LOADING });
    }
};
export const statusUpdate = (params: any) => async (dispatch: any) => {
    dispatch({ type: START_LOADING });
    try {
        const res = await apiCall("post", apiEndPoints.PROPERTYSUBSCRIBE, params);
        if (res.data.status == 200) {
            dispatch({
                type: PROPERTY_STATUS_UPDATE,
                payload: res.data,
            });
        } else {
            dispatch({
                type: PROPERTY_ERROR,
                payload: [],
            });
        }
    } catch (e) {
        dispatch({
            type: PROPERTY_ERROR,
            payload: console.log(e),
        });
    }
    finally {
        dispatch({ type: STOP_LOADING });
    }
};
export const getManagerList = (params: any) => async (dispatch: any) => {
    dispatch({ type: START_LOADING })
    try {
        const res = await apiCall("post", apiEndPoints.PROPERTYALLOCATELIST, params);
        if (res.data.status == 200) {
            dispatch({
                type: SOURCING_MANAGER_LIST,
                payload: res.data,
            });
        } else {
            dispatch({
                type: PROPERTY_ERROR,
                payload: [],
            });
        }
    } catch (e) {
        dispatch({
            type: PROPERTY_ERROR,
            payload: console.log(e),
        });
    }
    finally {
        dispatch({ type: STOP_LOADING })
    }
};
export const allocatePropertyToUser = (params: any) => async (dispatch: any) => {
    dispatch({ type: START_LOADING });
    try {
        const res = await apiCall("post", apiEndPoints.ALLOCATEPROPERTYTOUSER, params);
        if (res?.data?.status == 200) {
            dispatch({
                type: ALLOCATE_PROPERTY_TO_USER,
                payload: res.data,
            });
        } else {
            dispatch({
                type: PROPERTY_ERROR,
                payload: [],
            });
        }
    } catch (e) {
        dispatch({
            type: PROPERTY_ERROR,
            payload: console.log(e),
        });
    }
    finally {
        dispatch({ type: STOP_LOADING });
    }
};
export const removePropertyCompetitor = () => async (dispatch: any) => {
    try {
        dispatch({
            type: REMOVE_PROPERTYCOMPETITOR,
            payload: null,
        });
    } catch (e) {
        dispatch({
            type: PROPERTY_ERROR,
            payload: console.log(e),
        });
    }
}

