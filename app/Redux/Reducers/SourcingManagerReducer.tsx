import { GET_SOURCINGMANAGER_DETAIL, GET_SOURCINGMANAGER_DETAIL_ERROR, GET_SOURCINGMANAGER_LIST, GET_SOURCINGMANAGER_LIST_ERROR } from "../types";

const initialState = {
    response: null,
    list: false,
    detail: false
};

export function SourcingManagerReducer(state = initialState, action: any) {
    switch (action.type) {
        case GET_SOURCINGMANAGER_LIST:
            return {
                ...state,
                list: true,
                detail: false,
                response: action.payload,
            };
        case GET_SOURCINGMANAGER_LIST_ERROR:
            return {
                ...state,
                list: true,
                detail: false,
                response: action.payload,
            };
        case GET_SOURCINGMANAGER_DETAIL:
            return {
                ...state,
                list: false,
                detail: true,
                response: action.payload,
            };
        case GET_SOURCINGMANAGER_DETAIL_ERROR:
            return {
                ...state,
                list: false,
                detail: true,
                response: action.payload,
            };

        default:
            return state;
    }
}