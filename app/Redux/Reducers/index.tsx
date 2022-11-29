import { authStore, changePasswordReducer, forgotReducer, loadingReducer, otpVerifyReducer, updatepasswordReducer, userData } from "./AuthReducer";
import { agencyCreateFormReducer, agencyReducer } from "./AgencyReducer";
import { SourcingManagerReducer } from "./SourcingManagerReducer";
import { agentReducer } from "./AgentReducer";
import { propertyDetailReducer, propertyReducer } from "./propertyReducers";
import { settingReducer } from "./SettingReducer";
import { followUpReducer } from "./FollowUpReducer";
import { masterDataReducer } from "./MasterReducer";

export default {
    loadingReducer: loadingReducer,
    userData: userData,
    login: authStore,
    forgotResponce: forgotReducer,
    otpVerifyResponce: otpVerifyReducer,
    updatepasswordResponce: updatepasswordReducer,
    changePasswordResponse: changePasswordReducer,
    agencyForm: agencyCreateFormReducer,
    agency: agencyReducer,
    SourcingManager: SourcingManagerReducer,
    propertyData: propertyReducer,
    propertydetailData: propertyDetailReducer,
    agentData: agentReducer,
    settingData: settingReducer,
    followUp: followUpReducer,
    masterData: masterDataReducer,
}