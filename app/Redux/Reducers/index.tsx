import { agencyCreateFormReducer, agencyReducer } from "./AgencyReducer";
import { authStore, changePasswordReducer, forgotReducer, otpVerifyReducer, updatepasswordReducer, userData } from "./AuthReducer";
import { MasterReducer } from "./MasterReducer";
import { SourcingManagerReducer } from "./SourcingManagerReducer";
import { agentReducer } from "./AgentReducer";
import { propertyDetailReducer, propertyReducer } from "./propertyReducers";
import { settingReducer } from "./SettingReducer";

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
    SourcingManager: SourcingManagerReducer,
    propertyData: propertyReducer,
    propertydetailData: propertyDetailReducer,
    agentData: agentReducer,
    settingData: settingReducer,

}