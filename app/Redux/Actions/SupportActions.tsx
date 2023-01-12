import { apiCall } from "app/components/utilities/httpClient";
import { ADD_NEW_TICKET, ADD_NEW_TICKET_ERROR, START_LOADING, STOP_LOADING } from "../types"
import apiEndPoints from "app/components/utilities/apiEndPoints";
import { handleApiError } from "app/components/ErrorMessage/HandleApiErrors";

export const AddNewTicket = (params: any) => async (dispatch: any) => {
    dispatch({ type: START_LOADING })
    try {
        const res = await apiCall("post", apiEndPoints.ADD_TICKET, params);
        if (res?.data?.status === 200) {
            dispatch({
                type: ADD_NEW_TICKET,
                payload: res.data
            })
        } else {
            handleApiError(res?.data)
            dispatch({
                type: ADD_NEW_TICKET_ERROR,
                payload: [],
            })
        }
    }
    catch (e) {
        dispatch({
            type: ADD_NEW_TICKET_ERROR,
            payload: console.log(e),
        })
    }
    finally {
        dispatch({ type: STOP_LOADING })
    }
}