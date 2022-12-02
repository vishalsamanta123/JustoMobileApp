import { handleApiError } from "app/components/ErrorMessage/HandleApiErrors";
import apiEndPoints from "app/components/utilities/apiEndPoints";
import { apiCall } from "app/components/utilities/httpClient";
import { START_LOADING, STOP_LOADING, ADD_DROPLOCATION_ERROR, ADD_DROPLOCATION } from "../types";

export const AddDropLocation = (params: any) => async (dispatch: any) => {
    console.log('params: ', params);
    dispatch({ type: START_LOADING })
    try {
        const res = await apiCall("post", apiEndPoints.ADD_DROPLOCATION, params);
        console.log('res ADD_DROPLOCATION: ', res);
        if (res.data.status == 200) {
            dispatch({
                type: ADD_DROPLOCATION,
                payload: res.data,
            });
        } else {
            handleApiError(res.data)
            dispatch({
                type: ADD_DROPLOCATION_ERROR,
                payload: [],
            });
        }
    } catch (e) {
        dispatch({
            type: ADD_DROPLOCATION_ERROR,
            payload: console.log(e),
        });
    }
    finally {
        dispatch({ type: STOP_LOADING })
    }
};