import { ADD_DROPLOCATION, ADD_DROPLOCATION_ERROR } from "../types";

const initialState = {
    response: null,
};

export function appointmentReducer(state = initialState, action: any) {
    switch (action.type) {
        case ADD_DROPLOCATION:
            return {
                ...state,
                response: action.payload,
            };
        case ADD_DROPLOCATION_ERROR:
            return {
                ...state,
                response: action.payload,
            };
        default:
            return state;
    }
}