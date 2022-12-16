import {
  AGENCY_CREATE_FORM,
  AGENCY_CREATE_FORM_ERROR,
  CREATE_AGENCY,
  CREATE_AGENCY_ERROR,
  GET_AGENCY_DETAIL,
  REMOVE_UPDATE_ASSIGN_CP,
  UPDATE_ASSIGN_CP_STATUS,
} from "../types";

const initialStateForm = {
  response: null,
  update: false,
  create: false,
};
const initialState = {
  response: null,
  update: false,
  create: false,
  detail: false,
};

export function agencyCreateFormReducer(state = initialStateForm, action: any) {
  switch (action.type) {
    case AGENCY_CREATE_FORM:
      return {
        ...state,
        update: false,
        create: false,
        response: action.payload,
      };
    case AGENCY_CREATE_FORM_ERROR:
      return {
        ...state,
        update: false,
        create: false,
        response: action.payload,
      };

    default:
      return state;
  }
}
export function agencyReducer(state = initialState, action: any) {
  switch (action.type) {
    case CREATE_AGENCY:
      return {
        ...state,
        update: false,
        create: true,
        response: action.payload,
      };
    case GET_AGENCY_DETAIL:
      return {
        ...state,
        update: true,
        create: false,
        detail: true,
        response: action.payload,
      };
    case CREATE_AGENCY_ERROR:
      return {
        ...state,
        update: false,
        create: true,
        response: action.payload,
      };

    default:
      return state;
  }
}
export function agencyStatusReducer(state = initialStateForm, action: any) {
  switch (action.type) {
    case UPDATE_ASSIGN_CP_STATUS:
      return {
        ...state,
        detail: false,
        create: true,
        response: action.payload,
      };
    case REMOVE_UPDATE_ASSIGN_CP:
      return {
        ...state,
        create: false,
        response: action.payload,
      };
    default:
      return state;
  }
}

