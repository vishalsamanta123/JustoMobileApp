import { agencyCreateFormReducer, agencyReducer } from "./AgencyReducer";
import { authStore, changePasswordReducer, forgotReducer, otpVerifyReducer, updatepasswordReducer, userData } from "./AuthReducer";
import { MasterReducer } from "./MasterReducer";
import { SourcingManagerReducer } from "./SourcingManagerReducer";

export default {
    userData: userData,
    login: authStore,
    forgotResponce: forgotReducer,
    otpVerifyResponce: otpVerifyReducer,
    updatepasswordResponce: updatepasswordReducer,
    changePasswordResponse: changePasswordReducer,
    MasterReducer: MasterReducer,
    agencyForm: agencyCreateFormReducer,
    agency: agencyReducer,
    SourcingManager: SourcingManagerReducer
}