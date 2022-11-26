import apiEndPoints from "../../components/utilities/apiEndPoints";
import { apiCall } from "../../components/utilities/httpClient";
import { ALLOCATE_PROPERTY_TO_USER, GETPROPERTY_DETAIL, PROPERTY_ERROR, PROPERTY_LIST, PROPERTY_STATUS_UPDATE, SOURCING_MANAGER_LIST } from "../types";

export const getAllProperty = (params: any) => async (dispatch: any) => {
    try {
        const res = await apiCall("post", apiEndPoints.PROPERTYLIST, params);
        console.log('res: ', res);
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
};
export const getFilterProperty = (params: any) => async (dispatch: any) => {
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
};

export const getPropertyDetail = (params: any) => async (dispatch: any) => {
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
};
export const statusUpdate = (params: any) => async (dispatch: any) => {
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
};
export const getManagerList = (params: any) => async (dispatch: any) => {
    console.log('params: ', params);
    try {
        const res = await apiCall("post", apiEndPoints.PROPERTYALLOCATELIST, params);
        console.log('res: IN MAnAGERS', res);
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
};
export const allocatePropertyToUser = (params: any) => async (dispatch: any) => {
    console.log('params: ', params);
    try {
        const res = await apiCall("post", apiEndPoints.ALLOCATEPROPERTYTOUSER, params);
        console.log('res: IN ALLOCATE', res);
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
};