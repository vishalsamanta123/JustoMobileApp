import { ADD_NEW_TICKET, ADD_NEW_TICKET_ERROR } from "../types";

const initialState = {
    response: null,
    list: false,
    detail: false
};

export function SupportReducer(state = initialState, action: any) {
    switch (action.type) {
        case ADD_NEW_TICKET:
            return {
                ...state,
                response: action.payload
            }
        case ADD_NEW_TICKET_ERROR:
            return {
                ...state,
                response: action.payload
            }

        default: return state
    }
}