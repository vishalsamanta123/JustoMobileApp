import { authStore, changePasswordReducer, forgotReducer, loadingReducer, otpVerifyReducer, updatepasswordReducer } from "./AuthReducer";
import { propertyDetailReducer, propertyReducer } from "./propertyReducers";

export default {
    loadingReducer: loadingReducer,
    login: authStore,
    forgotResponce: forgotReducer,
    otpVerifyResponce: otpVerifyReducer,
    updatepasswordResponce: updatepasswordReducer,
    changePasswordResponse: changePasswordReducer,
    propertyData: propertyReducer,
    propertydetailData: propertyDetailReducer,
}