import { authStore, changePasswordReducer, forgotReducer, otpVerifyReducer, updatepasswordReducer } from "./AuthReducer";
import { propertyDetailReducer, propertyReducer } from "./propertyReducers";

export default {
    login: authStore,
    forgotResponce: forgotReducer,
    otpVerifyResponce: otpVerifyReducer,
    updatepasswordResponce: updatepasswordReducer,
    changePasswordResponse: changePasswordReducer,
    propertyData: propertyReducer,
    propertydetailData: propertyDetailReducer,
}