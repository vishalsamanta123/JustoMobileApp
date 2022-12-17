import { authStore, changePasswordReducer, forgotReducer, loadingReducer, otpVerifyReducer, updatepasswordReducer, userData, userDetailReducer, userReducer } from "./AuthReducer";
import { agencyCreateFormReducer, agencyReducer, agencyStatusReducer } from "./AgencyReducer";
import { SourcingManagerReducer } from "./SourcingManagerReducer";
import { agentReducer } from "./AgentReducer";
import { competitorpropertyReducer, propertyDetailReducer, propertyReducer } from "./propertyReducers";
import { settingReducer } from "./SettingReducer";
import { appointmentReducer, editAddAppointmentReducer } from "./AppointmentWithCpReducer";
import { followUpReducer } from "./FollowUpReducer";
import { masterDataReducer } from "./MasterReducer";
import { addVisitorReducer, editVisitorReducer, visitorListReducer, visitorReducer } from "./LeadsReducer";
import { addBookingReducer, appointmentCLReducer } from "./AppointmentCLReducer";
import { ClosingManagerReducer } from "./ClosingManagerReducer";
import { BookingReducer, cancelBookingReducer } from "./BookingReducer";
import { dashboardReducer, statusUpdateReducer } from "./DashboardReducer";
import { notificationListReducer } from "./NotificationReducer";
import { PickUpReducer } from "./PickUpReducer";
import { transferVisitorReducer, transferVisitReducer } from "./TransferVisitReducer";

export default {
    loadingReducer: loadingReducer,
    userDetail: userDetailReducer,
    userData: userData,
    login: authStore,
    userReducer: userReducer,
    forgotResponce: forgotReducer,
    otpVerifyResponce: otpVerifyReducer,
    updatepasswordResponce: updatepasswordReducer,
    changePasswordResponse: changePasswordReducer,
    agencyForm: agencyCreateFormReducer,
    agency: agencyReducer,
    agencyStatus: agencyStatusReducer,
    SourcingManager: SourcingManagerReducer,
    propertyData: propertyReducer,
    competitorproperty: competitorpropertyReducer,
    propertydetailData: propertyDetailReducer,
    agentData: agentReducer,
    settingData: settingReducer,
    appointment: appointmentReducer,
    editAddAppointment: editAddAppointmentReducer,
    followUp: followUpReducer,
    masterData: masterDataReducer,
    notificationData: notificationListReducer,
    transferVisitData: transferVisitReducer,
    transferVisitorData: transferVisitorReducer,

    //Dashboard
    dashboardData: dashboardReducer,
    statusUpdateData: statusUpdateReducer,

    // Appointment CL
    appointmentCL: appointmentCLReducer,

    // Booking
    booking: BookingReducer,
    cancelBooking: cancelBookingReducer,
    addedBooking: addBookingReducer,

    // visit modal
    visitorData: visitorReducer,
    visitorDataList: visitorListReducer,
    editVisitorData: editVisitorReducer,
    addVisitorData: addVisitorReducer,

    //closing model
    ClosingManager: ClosingManagerReducer,

    //pickUp
    Pickup: PickUpReducer
}