import { GET_SOURCINGMANAGER_LIST, GET_SOURCINGMANAGER_LIST_ERROR } from "../types";

const initialState = {
    response: null,
    list: false
};

export function SourcingManagerReducer(state = initialState, action: any) {
    switch (action.type) {
        case GET_SOURCINGMANAGER_LIST:
            return {
                ...state,
                list: true,
                response: action.payload,
            };
        case GET_SOURCINGMANAGER_LIST_ERROR:
            return {
                ...state,
                list: true,
                response: action.payload,
            };

        default:
            return state;
    }
}