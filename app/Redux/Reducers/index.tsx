import { authStore, changePasswordReducer, forgotReducer, loadingReducer, otpVerifyReducer, updatepasswordReducer, userData, userDetailReducer, userReducer } from "./AuthReducer";
import { addEditAgencyReducer, agencyCreateFormReducer, agencyReducer, agencyStatusReducer } from "./AgencyReducer";
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
import { BookingReducer, cancelAddBookingReducer, } from "./BookingReducer";
import { dashboardReducer, statusUpdateReducer } from "./DashboardReducer";
import { deleteNotificationReducer, notificationListReducer } from "./NotificationReducer";
import { PickUpReducer, UpdatePickUpStatusReducer } from "./PickUpReducer";
import { transferVisitorReducer, transferVisitReducer } from "./TransferVisitReducer";
import { firebaseReducer } from "./FirebaseReducer";
import { ChatReducer, getRecentChatList, propertyChatReducer, updateChatStatus } from "./ChatReducer";
import { userAppointmentReducer, userEditAppointmentReducer } from "./AppointmentWithUserReducer";
import { supportForumReducer, supportForumUpdateReducer } from "./SupportForumReducer";
import { CpCheckingReducer } from "./CpCheckingReducer";
import { SupportAddReducer, SupportReducer } from "./SupportReducer";
import { leaderBoardReducer } from "./LearderBoardReducer";
import { UserManagerReducer } from "./UserManagerReducer";

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
    // Agency
    agencyForm: agencyCreateFormReducer,
    agency: agencyReducer,
    agencyStatus: agencyStatusReducer,
    addEditAgency: addEditAgencyReducer,

    SourcingManager: SourcingManagerReducer,
    propertyData: propertyReducer,
    competitorproperty: competitorpropertyReducer,
    propertydetailData: propertyDetailReducer,
    agentData: agentReducer,
    settingData: settingReducer,
    appointment: appointmentReducer,
    CpCheckingData: CpCheckingReducer,
    editAddAppointment: editAddAppointmentReducer,
    followUp: followUpReducer,
    masterData: masterDataReducer,
    notificationData: notificationListReducer,
    deleteNotificationData: deleteNotificationReducer,
    transferVisitData: transferVisitReducer,
    transferVisitorData: transferVisitorReducer,
    firebaseData: firebaseReducer,

    //Dashboard
    dashboardData: dashboardReducer,
    statusUpdateData: statusUpdateReducer,

    // Appointment CL
    appointmentCL: appointmentCLReducer,
    userAppointmentData: userAppointmentReducer,
    userEditAppointmentData: userEditAppointmentReducer,

    // Booking
    booking: BookingReducer,
    cancelAddBooking: cancelAddBookingReducer,
    addedBooking: addBookingReducer,

    // chat
    chatData: ChatReducer,
    chatStatusData: updateChatStatus,
    recentChatListData: getRecentChatList,
    propertyChatListData: propertyChatReducer,

    // visit modal
    visitorData: visitorReducer,
    visitorDataList: visitorListReducer,
    editVisitorData: editVisitorReducer,
    addVisitorData: addVisitorReducer,

    //closing model
    ClosingManager: ClosingManagerReducer,
    
    // user manager 
    UserManager: UserManagerReducer,

    //pickUp
    Pickup: PickUpReducer,
    updatePickUpStatusData: UpdatePickUpStatusReducer,

    //support Forum
    supportForumData: supportForumReducer,
    supportForumUpdateData: supportForumUpdateReducer,

    //ledearboard
    leaderBoard: leaderBoardReducer,
    // Raise Ticket (Support)
    SupportAdd: SupportAddReducer,
    SupportData: SupportReducer
}