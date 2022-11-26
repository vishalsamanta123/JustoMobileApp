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

  // CREATE CHANNEL PARTNER
  CREATECHANNELPARTNER: '/channelPartner/createChannelPartner',
  CHECKEMAILMOBILE: '/auth/checkEmailMobile',
  GET_SOURCINGMANAGER: '/channelPartner/getListSourcingManager',

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
   
   

    // MASTER START
    ADDMASTERLIST: "/master/getMasterList",
    CREATEMASTER: "/master/createMaster",
    GETPROPERTYTYPE: "/master/getPropertyType",
    GETCONFIGURATION: "/master/getConfiguration",
    GETAMENITY: "/master/getAmenity",
};
