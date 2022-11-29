import { GET_CITY_LIST, GET_CITY_LIST_ERROR, GET_ROLE_LIST, GET_ROLE_LIST_ERROR } from "../types";

const initialState = {
    response: null,
    loading: true,
    Roleresponse: null
}

export function MasterReducer(state = initialState, action: any) {
    switch (action.type) {
        case GET_CITY_LIST:
            return {
                ...state,
                response: action.payload,
                loading: false,
            }
        case GET_CITY_LIST_ERROR:
            return {
                ...state,
                response: action.payload,
                loading: false,
            }
        case GET_ROLE_LIST:
            return {
                ...state,
                Roleresponse: action.payload,
                loading: false,
            }
        case GET_ROLE_LIST_ERROR:
            return {
                ...state,
                Roleresponse: action.payload,
                loading: false,
            }

        default: return state
    }

}