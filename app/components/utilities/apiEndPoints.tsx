export default {
  JWTTOKEN: "token/jwtToken",
  LOGIN: "auth/userLogin",
  // USER REGISTER AND ADD USER API BOTH ARE SAME
  FORGOTPASSWORD: "/auth/forgotPassword",
  OTPVERIFY: "/auth/otpVerify",
  RESENDOTP: "/auth/resentOtp",
  UPDATEPASSWORD: "/auth/updatePassword",
  CHANGEPASSWORD: "/auth/changePassword",
  REGISTERANDADDUSER: "/auth/userRegister",
  GETUSERLIST: "userManage/getUserList",
  GETUSERDETAIL: "/userManage/getUserDetail",
  GETUSERFILTERDATA: "/userManage/getUserFilterData",
  EDITUSER: "/auth/editUserProfile",
  USERSTATUSUPDATE: "/userManage/userStatusUpdate",
  GET_USERPROFILE: '/auth/getUserProfile',

  //Dashboard 
  DASHBOARD_SOURCING: '/dashboard/dashboardDetailSourcing',
  DASHBOARD_CLOSING: '/dashboard/dashboardDetailClosing',
  UPDATE_USER_STATUS: '/auth/userOnlineStatusUpdate',
  // CREATE CHANNEL PARTNER
  CREATECHANNELPARTNER: '/channelPartner/createChannelPartner',
  EDIT_CHANNELPARTNER: '/channelPartner/updateChannelPartner',
  CHECKEMAILMOBILE: '/auth/checkEmailMobile',
  GET_SOURCINGMANAGER: '/channelPartner/getListSourcingManager',

  // MASTERS
  GET_CITY_LIST: '/master/getCityList',
  GET_ROLE_LIST: '/role/getRoles',

  // SOURCING TL
  GET_SOURCING_MANAGER_LIST: '/userManage/getUserSourcingManagerList',
  GET_SOURCING_MANAGER_DETAIL: '/userManage/getUserSourcingManagerDetail',
  GET_ASSIGNCP_LIST: '/userManage/getAssignCPList',
  STATUS_UPDATE_ASSIGN_CP: '/userManage/smUpdateAssignCpStatus',
  ASSIGNCP_SM: '/userManage/cpAssignSorcingManager',


  // property Start
  ADDPROPERTY: "/property/addProperty",
  PROPERTYLIST: "/property/getAllProperty",
  PROPERTYFILTER: "/property/filterProperty",
  EDITPROPERTY: "/property/editProperty",
  GETPROPERTYDETAIL: "/property/getPropertyDetails",
  GETPROPERTYFILTERDETAIL: "/property/filterProperty",
  PROPERTYSTATUSUPDATE: "/property/propertyStatusUpdate",
  PROPERTYSUBSCRIBE: "/property/userSubscribeUnsubscribeProperty",
  PROPERTYALLOCATELIST: "/property/getPropertyAlocateUserList",
  ALLOCATEPROPERTYTOUSER: "/property/propertyAllocateToUsers",
  GET_PROPERTY_COMPETITOR: "/property/getPropertyCompetitorList",



  // MASTER START
  ADDMASTERLIST: "/master/getMasterList",
  CREATEMASTER: "/master/createMaster",
  GETPROPERTYTYPE: "/master/getPropertyType",
  GETCONFIGURATION: "/master/getConfiguration",
  GETAMENITY: "/master/getAmenity",


  //Agent Management
  AGENTLIST: "/channelPartner/getchannelPartnerList",
  PENDING_AGENTLIST: "/channelPartner/getchannelPartnerList",
  GET_AGENT_DETAIL_: "/channelPartner/getChannelPartnersDetails",
  AGENT_STATUS_UPDATE: "/channelPartner/ApproveChannelpartnerbysourcinghead",
  ADD_AGENT_: "/channelPartner/createAgent",
  EDIT_AGENT_: "/channelPartner/editAgent",

  // Appointment
  GET_APPOINTMENT_LIST: '/appointment/getAppointmentList',
  GET_APPOINTMENT_DETAILS: '/appointment/getAppointmentDetails',
  ADD_APPOINTMENT: '/appointment/addAppointment',
  EDIT_APPOINTMENT: '/appointment/editAppointment',
  ADD_DROPLOCATION: '/appointment/addDropOffLocation',
  ALLOCATE_CM: '/appointment/appointmentAlocateClosinManager',
  PICKUP_LIST: 'appointment/getPickupAddressList',
  // BOOKING
  ADD_BOOKING: '/booking/addBooking',
  GET_BOOKINGLIST: '/booking/getBookingList',
  GET_BOOKINGDETAIL: '/booking/getBookingdetails',
  UPDATE_BOOKINGSTATUS: '/booking/updateBooking',
  CANCEL_BOOKING: '/booking/bookingStatusUpdate',

  //Settings
  UPDATECHANNELPARTNER: "/channelPartner/updateChannelPartner",
  NOTIFICATION_LIST: "/notification/getNotificationList",

  // Folloe-Up
  GET_FOLLOWUP_LIST: '/followupStatus/getFollowupList',
  GET_FOLLOWUP_DETAILS: '/followupStatus/getFollowupDetails',
  UPDATE_FOLLOWUP: '/followupStatus/updatefollowup',
  ADD_FOLLOWUP: '/followupStatus/addfollowup',

  //Lead Management
  VISITORLIST: "/visit/getVisiterList",
  GET_VISITOR_DETAIL_: "/visit/getVisitDetails",
  VISITOR_STATUS_UPDATE: "/visit/updateVisitStatus",
  ADD_VISITOR_: "/visit/addVisit",
  EDIT_VISITOR_: "/visit/editVisit",
  GET_USERVISTLIST: '/visit/getUserVisitList',

  //closing head
  GET_CLOSINGMANAGER: "/userManage/getClosingManagerListOnCH",

};
