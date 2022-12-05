import { BOOKING_CANCEL, BOOKING_DETAIL, BOOKING_DETAIL_ERROR, BOOKING_LIST, BOOKING_LIST_ERROR, BOOKING_STATUS_UPDATE, BOOKING_STATUS_UPDATE_ERROR, REMOVE_BOOKING } from "../types";

const initialState = {
    response: null,
    list: false,
    detail: true,
};
const initialStateForm = {
    response: null,
    loading: true,
    changepassword: false,
    error: false
}

export function BookingReducer(state = initialState, action: any) {
    switch (action.type) {
        case BOOKING_LIST:
            return {
                ...state,
                response: action.payload,
                list: true,
                detail: false,
            };
        case BOOKING_LIST_ERROR:
            return {
                ...state,
                response: action.payload,
                list: true,
                detail: false,
            };
        case BOOKING_DETAIL:
            return {
                ...state,
                response: action.payload,
                list: false,
                detail: true,
            };
        case BOOKING_DETAIL_ERROR:
            return {
                ...state,
                response: action.payload,
                list: false,
                detail: true,
            };
        case BOOKING_STATUS_UPDATE:
            return {
                ...state,
                response: action.payload,
                list: false,
                detail: false,
            };
        case BOOKING_STATUS_UPDATE_ERROR:
            return {
                ...state,
                response: action.payload,
                list: false,
                detail: false,
            };
        default:
            return state;
    }
}
export function cancelBookingReducer(state = initialStateForm, action: any) {
    switch (action.type) {
        case BOOKING_CANCEL:
            return {
                ...state,
                create: false,
                response: action.payload,
            };
        case REMOVE_BOOKING:
            return {
                ...state,
                create: false,
                response: action.payload,
            };
        default:
            return state;
    }
}

