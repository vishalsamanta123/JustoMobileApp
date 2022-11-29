import { handleApiError } from "app/components/ErrorMessage/HandleApiErrors";
import apiEndPoints from "app/components/utilities/apiEndPoints";
import { apiCall } from "app/components/utilities/httpClient";
import { GET_APPOINTMENT_LIST, GET_APPOINTMENT_LIST_ERROR, START_LOADING, STOP_LOADING } from "../types";
export const getAllAppointmentList = (params: any) => async (dispatch: any) => {
    // dispatch({ type: START_LOADING })
    try {
        const res = await apiCall("post", apiEndPoints.GET_APPOINTMENT_LIST, params);
        console.log('res GET_APPOINTMENT_LIST: ', res);
        if (res.data.status == 200) {
            dispatch({
                type: GET_APPOINTMENT_LIST,
                payload: res.data,
            });
        } else {
            handleApiError(res.data)
            dispatch({
                type: GET_APPOINTMENT_LIST_ERROR,
                payload: [],
            });
        }
    } catch (e) {
        dispatch({
            type: GET_APPOINTMENT_LIST_ERROR,
            payload: console.log(e),
        });
    }
    // finally {
    //     dispatch({ type: STOP_LOADING })
    // }
};