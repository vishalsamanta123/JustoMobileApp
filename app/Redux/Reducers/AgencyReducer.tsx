import { AGENCY_CREATE_FORM, AGENCY_CREATE_FORM_ERROR, CREATE_AGENCY, CREATE_AGENCY_ERROR } from "../types";

const initialStateForm = {
    response: null,
    update: false,
    create: false
};
const initialState = {
    response: null,
    update: false,
    create: false
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