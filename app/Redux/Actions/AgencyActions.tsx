import { handleApiError } from "app/components/ErrorMessage/HandleApiErrors";
import apiEndPoints from "app/components/utilities/apiEndPoints";
import { apiCall } from "app/components/utilities/httpClient";
import {
  AGENCY_CREATE_FORM,
  AGENCY_CREATE_FORM_ERROR,
  AGENT_ERROR,
  AGENT_LIST,
  CREATE_AGENCY,
  CREATE_AGENCY_ERROR,
  EDIT_AGENCY,
  EDIT_AGENT,
  GET_AGENCY_DETAIL,
  GET_AGENT_DETAIL,
  PENDING_AGENCY_LIST,
  PENDING_AGENCY_LIST_ERROR,
  START_LOADING,
  STOP_LOADING,
} from "../types";

export const getAllAgentList = (params: any) => async (dispatch: any) => {
  console.log("params: ", params);
  dispatch({ type: START_LOADING });
  try {
    const res = await apiCall("post", apiEndPoints.AGENTLIST, params);
    console.log("res: ====>>>> AGENTLIST ", res);
    if (res.data.status == 200) {
      dispatch({
        type: AGENT_LIST,
        payload: res.data,
      });
    } else {
      handleApiError(res.data);
      dispatch({
        type: AGENT_LIST,
        payload: [],
      });
    }
  } catch (e) {
    dispatch({
      type: AGENT_ERROR,
      payload: console.log(e),
    });
  } finally {
    dispatch({ type: STOP_LOADING });
  }
};
export const getAllPendingAgentList = (params: any) => async (dispatch: any) => {
  console.log("params: ", params);
  dispatch({ type: START_LOADING });
  try {
    const res = await apiCall("post", apiEndPoints.PENDING_AGENTLIST, params);
    console.log("res: PENDING_AGENT_LIST ", res);
    if (res.data.status == 200) {
      dispatch({
        type: PENDING_AGENCY_LIST,
        payload: res.data,
      });
    } else {
      handleApiError(res.data);
      dispatch({
        type: PENDING_AGENCY_LIST_ERROR,
        payload: [],
      });
    }
  } catch (e) {
    dispatch({
      type: PENDING_AGENCY_LIST_ERROR,
      payload: console.log(e),
    });
  } finally {
    dispatch({ type: STOP_LOADING });
  }
};
export const getAgencyDetail = (params: any) => async (dispatch: any) => {
  console.log("params: ", params);
  dispatch({ type: START_LOADING });
  try {
    const res = await apiCall("post", apiEndPoints.GET_AGENT_DETAIL_, params);
    console.log("res: IN AGENCY DETAIL", res);
    if (res.data.status === 200) {
      dispatch({
        type: GET_AGENCY_DETAIL,
        payload: res.data,
      });

      dispatch({
        type: AGENCY_CREATE_FORM,
        payload: res.data.data[0],
      });
    } else {
      handleApiError(res.data);
      return [];
    }
  } catch (e) {
    dispatch({
      type: AGENT_ERROR,
      payload: console.log(e),
    });
  } finally {
    dispatch({ type: STOP_LOADING });
  }
};
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

export const AgencyCreateFormRemove = () => async (dispatch: any) => {
  try {
    dispatch({
      type: AGENCY_CREATE_FORM,
      payload: null,
    });
  } catch (e) {
    dispatch({
      type: AGENCY_CREATE_FORM_ERROR,
      payload: null,
    });
  }
};

export const createAgency = (item: any) => async (dispatch: any) => {
  console.log("item: PARAMS CREATE AGENCY", item);
  dispatch({ type: START_LOADING });
  try {
    const header = {
      "Content-Type": "multipart/form-data",
      "access-control-allow-origin": "*",
    };
    const res = await apiCall(
      "post",
      apiEndPoints.CREATECHANNELPARTNER,
      item,
      header
    );
    console.log("res CREATECHANNELPARTNER: ", res);
    if (res?.data?.status === 200) {
      console.log("res.data: ", res.data);
      dispatch({
        type: CREATE_AGENCY,
        payload: res.data,
      });
    } else {
      handleApiError(res?.data);
      dispatch({
        type: CREATE_AGENCY_ERROR,
        payload: [],
      });
    }
  } catch (e) {
    console.log("e: ", e);
    dispatch({
      type: CREATE_AGENCY_ERROR,
      payload: console.log(e),
    });
  }
  finally {
    dispatch({ type: STOP_LOADING });
  }
};
export const editAgent = (params: any) => async (dispatch: any) => {
  console.log("params: IN EDIT", params);
  dispatch({ type: START_LOADING });
  try {
    const header = {
      "Content-Type": "multipart/form-data",
      "access-control-allow-origin": "*",
    };
    const res = await apiCall(
      "post",
      apiEndPoints.EDIT_CHANNELPARTNER,
      params,
      header
    );
    console.log("res: in AGENCY EDIT", res);
    if (res.data.status == 200) {
      dispatch({
        type: EDIT_AGENCY,
        payload: res.data,
      });
    } else {
      handleApiError(res.data);
      return [];
    }
  } catch (e) {
    dispatch({
      type: AGENT_ERROR,
      payload: console.log(e),
    });
  } finally {
    dispatch({ type: STOP_LOADING });
  }
};
