import { handleApiError } from "app/components/ErrorMessage/HandleApiErrors";
import apiEndPoints from "app/components/utilities/apiEndPoints";
import { apiCall } from "app/components/utilities/httpClient";
import { AGENCY_CREATE_FORM, AGENCY_CREATE_FORM_ERROR, CREATE_AGENCY, CREATE_AGENCY_ERROR } from "../types";

export const AgencyCreateForm = (item: any) => async (dispatch: any) => {
  try {
    dispatch({
      type: AGENCY_CREATE_FORM,
      payload: item,
    });
  } catch (e) {
    dispatch({
      type: AGENCY_CREATE_FORM_ERROR,
      payload: console.log(e),
    });
  }
};

export const createAgency = (item: any) => async (dispatch: any) => {
  try {
    console.log('item: ', item);
    const res = await apiCall("post", apiEndPoints.CREATECHANNELPARTNER, item);
    console.log('res CREATECHANNELPARTNER: ', res);
    if (res?.data?.status === 200) {
      console.log('res.data: ', res.data);
      dispatch({
        type: CREATE_AGENCY,
        payload: res.data
      })
    } else {
      handleApiError(res?.data)
      dispatch({
        type: CREATE_AGENCY_ERROR,
        payload: [],
      })
    }
  }
  catch (e) {
    console.log('e: ', e);
    dispatch({
      type: CREATE_AGENCY_ERROR,
      payload: console.log(e),
    })
  }
}