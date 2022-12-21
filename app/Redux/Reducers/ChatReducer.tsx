import { CHAT_ERROR, GET_ALL_USER_CHAT_LIST } from "../types";

const initialState = {
    response: null,
    list: false,
};

export function ChatReducer(state = initialState, action: any) {
    switch (action.type) {
        case GET_ALL_USER_CHAT_LIST:
            return {
                ...state,
                list: true,
                response: action.payload,
            };
        case CHAT_ERROR:
            return {
                ...state,
                list: false,
                response: action.payload,
            };
        default:
            return state;
    }
}