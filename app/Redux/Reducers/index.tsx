import { authStore, changePasswordReducer, forgotReducer, otpVerifyReducer, updatepasswordReducer } from "./AuthReducer";

export default {
    login: authStore,
    forgotResponce: forgotReducer,
    otpVerifyResponce: otpVerifyReducer,
    updatepasswordResponce: updatepasswordReducer,
    changePasswordResponse: changePasswordReducer,
}