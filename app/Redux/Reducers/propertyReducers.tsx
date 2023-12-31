import {
  PROPERTY_LIST, ADD_PROPERTY, PROPERTY_FORM, PROPERTY_EDIT,
  GETPROPERTY_DETAIL, PROPERTY_FORM_UPDATE, PROPERTY_FILTER_LIST, PROPERTY_STATUS_UPDATE,
  SOURCING_MANAGER_LIST,
  ALLOCATE_PROPERTY_TO_USER,
  PROPERTY_ERROR,
  PROPERTY_COMPETITOR_LIST,
  REMOVE_PROPERTYCOMPETITOR,
  GET_ALLOCATE_REQUEST,
  GET_ALLOCATE_REQUEST_ERROR
} from "../types";

const initialState = {
  response: null,
  detail: false,
  create: false,
  list: false,
  smlist: false,
  allocated: false
};
const initialStatedetail = {
  response: null,
  detail: false,
  create: false,
  loading: true,
  updateStatus: false,
};
const initialStateForm = {
  response: null,
  update: false,
};


export function propertyReducer(state = initialState, action: any) {
  switch (action.type) {
    /*  case ADD_PROPERTY:
       return {
         ...state,
         detail: false,
         create: true,
         response: action.payload,
       };
     case PROPERTY_EDIT:
       return {
         ...state,
         detail: false,
         create: true,
         response: action.payload,
       }; */
    case PROPERTY_FILTER_LIST:
      return {
        ...state,
        create: false,
        detail: false,
        response: action.payload,
      };
    case PROPERTY_LIST:
      return {
        ...state,
        detail: false,
        create: false,
        loading: false,
        list: true,
        response: action.payload,
      };
    case PROPERTY_COMPETITOR_LIST:
      return {
        ...state,
        detail: false,
        create: false,
        loading: false,
        list: true,
        response: action.payload,
      };
    case PROPERTY_ERROR:
      return {
        ...state,
        detail: false,
        create: false,
        loading: false,
        list: true,
        response: action.payload,
      };
    case PROPERTY_STATUS_UPDATE:
      return {
        ...state,
        detail: false,
        create: false,
        response: action.payload,
      };
    case SOURCING_MANAGER_LIST:
      return {
        ...state,
        detail: false,
        create: false,
        smlist: true,
        response: action.payload,
      };
    case ALLOCATE_PROPERTY_TO_USER:
      return {
        ...state,
        detail: false,
        create: true,
        list: false,
        response: action.payload,
        allocated: true
      };
    case GET_ALLOCATE_REQUEST:
      return {
        ...state,
        detail: false,
        create: true,
        list: false,
        response: action.payload,
        allocated: false
      };
    case GET_ALLOCATE_REQUEST_ERROR:
      return {
        ...state,
        detail: false,
        create: false,
        list: false,
        response: action.payload,
        allocated: false
      };
    default:
      return state;
  }
}
export function propertyDetailReducer(state = initialStatedetail, action: any) {

  switch (action.type) {

    case GETPROPERTY_DETAIL:
      return {
        ...state,
        create: false,
        detail: true,
        loading: false,
        response: action.payload,
      };

    case PROPERTY_STATUS_UPDATE:
      return {
        ...state,
        detail: false,
        create: true,
        updateStatus: true,
        response: action.payload,
      };
    default:
      return state;
  }
}

export function propertyFormReducer(state = initialStateForm, action: any) {
  switch (action.type) {
    case PROPERTY_FORM:
      return {
        ...state,
        update: false,
        response: action.payload,
      };
    case PROPERTY_FORM_UPDATE:
      return {
        ...state,
        update: true,
        response: action.payload,
      };
    default:
      return state;
  }
}

export function competitorpropertyReducer(state = initialStateForm, action: any) {
  switch (action.type) {
    case PROPERTY_COMPETITOR_LIST:
      return {
        ...state,
        detail: false,
        create: true,
        response: action.payload,
      };
    case REMOVE_PROPERTYCOMPETITOR:
      return {
        ...state,
        update: true,
        response: action.payload,
      };

    default:
      return state;
  }
}