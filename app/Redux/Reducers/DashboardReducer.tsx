import { GET_DASHBOARD_SOURCING, DASHBOARD_SOURCING_ERROR, USER_STATUS_UPDATE, STATUS_UPDATE_DATA, GET_DASHBOARD_CLOSING, DASHBOARD_CLOSING_ERROR } from "../types";
const initialStateForm = {
    response: null,
    update: false,
};

export function dashboardReducer(state = initialStateForm, action: any) {
    switch (action.type) {
        case GET_DASHBOARD_SOURCING:
            return {
                ...state,
                data: true,
                response: action.payload,
            };
        case DASHBOARD_SOURCING_ERROR:
            return {
                ...state,
                update: false,
                response: action.payload,
            };
        case GET_DASHBOARD_CLOSING:
            return {
                ...state,
                data: true,
                response: action.payload,
            };
        case DASHBOARD_CLOSING_ERROR:
            return {
                ...state,
                update: false,
                response: action.payload,
            };
        default:
            return state;
    }
}

export function statusUpdateReducer(state = initialStateForm, action: any) {
    switch (action.type) {
        case USER_STATUS_UPDATE:
            return {
                ...state,
                data: true,
                response: action.payload,
            };
        case STATUS_UPDATE_DATA:
            return {
                ...state,
                data: false,
                response: action.payload,
            };
        default:
            return state;
    }
}