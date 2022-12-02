import { authStore, changePasswordReducer, forgotReducer, loadingReducer, otpVerifyReducer, updatepasswordReducer, userData, userReducer } from "./AuthReducer";
import { agencyCreateFormReducer, agencyReducer } from "./AgencyReducer";
import { SourcingManagerReducer } from "./SourcingManagerReducer";
import { agentReducer } from "./AgentReducer";
import { propertyDetailReducer, propertyReducer } from "./propertyReducers";
import { settingReducer } from "./SettingReducer";
import { appointmentReducer } from "./AppointmentWithCpReducer";
import { followUpReducer } from "./FollowUpReducer";
import { masterDataReducer } from "./MasterReducer";
import { addVisitorReducer, editVisitorReducer, visitorListReducer, visitorReducer } from "./LeadsReducer";
import { ClosingManagerReducer } from "./ClosingManagerReducer";

export default {
    loadingReducer: loadingReducer,
    userData: userData,
    login: authStore,
    userReducer: userReducer,
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
    appointment: appointmentReducer,
    followUp: followUpReducer,
    masterData: masterDataReducer,

    // visit modal
    visitorData: visitorReducer,
    visitorDataList: visitorListReducer,
    editVisitorData: editVisitorReducer,
    addVisitorData: addVisitorReducer,

    //closing model
    ClosingManager: ClosingManagerReducer
}