import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import axios from "axios";
import { createDrawerNavigator } from "@react-navigation/drawer";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch, useSelector } from "react-redux";

// Auth model
import SplashScreen from "../views/Authentication/SplashScreen";
import OnboardingScreen from "../views/Authentication/OnboardingScreen";
import LoginScreen from "../views/Authentication/LoginScreen";
import DashboardScreen from "../views/DashboardScreen";
import customDrawer from "./customDrawer";
import PropertyScreen from "../views/PropertyMangement/PropertyScreen";
import PropertyDetails from "../views/PropertyMangement/PropertyDetails";

/**Agency module**/
import AgencyListingScreen from "../views/AgencyManagement/AgencyListing";
import AddnewAgency from "../views/AgencyManagement/AddAgency";
import AgencyBankInfo from "../views/AgencyManagement/AddAgency/components/AgencyBankInfo";
import AgencyDetails from "../views/AgencyManagement/AgencyDetailView";
import PendingAgencyListScreen from "../views/AgencyManagement/PendingAgencyListing";

/**Lead Visitor module**/
import LeadManagementScreen from "../views/LeadManagement/LeadManagementScreen";
import LeadDetails from "../views/LeadManagement/LeadDetails";

/**Souricing  module**/
import SourcingManager from "../views/SourcingManagers/SourcingManagersView";
import AddNewSM from "../views/SourcingManagers/AddNewSm";
import SMDetails from "../views/SourcingManagers/SMDetails";

/**Closing  module**/
import ClosingManager from "../views/ClosingManager/ClosingMangerView";
import AddNewCM from "../views/ClosingManager/AddNewCM";
import CMDetails from "../views/ClosingManager/CMDetails";
//
import FollowUpDetails from "../views/FollowUp/FollowUpDetails";
import EditFollowUp from "../views/FollowUp/FollowUpScreen/Components/EditFollowUp";
import AllFollowUpScreen from "../views/FollowUp/AllFollowUp";
import FollowUpScreen from "../views/FollowUp/FollowUpScreen";
import AppointmentScreenCPSM from "../views/AppointmentWithCPSm/AppointmentScreen";
import AppointmentDetails from "../views/AppointmentWithCPSm/AppointmentDetails";
import AddAppointmentScreen from "../views/AppointmentWithCPSm/AddAppointment";
import PickupRequestScreen from "../views/SourcingManagers/PickupRequest";
import SettingScreen from "../views/Setting/SettingScreen";
import ProfileScreen from "../views/Setting/ProfileScreen";
import EditProfileScreen from "../views/Setting/EditProfileScreen";
import ChangePasswordScreen from "../views/Setting/ChangePassword";
import SeparateLinkScreen from "../views/Setting/SeparateLink";
import BookingListScreen from "../views/BookingManagement/BookingList";
import BookingDetailsScreen from "../views/BookingManagement/BookingDetails";
import AppointmentsScreen from "../views/AppointMent/AppintMents";
import AppointmentDetailsScreen from "../views/AppointMent/AppointmentDetails";
import AppointmentForSiteScreen from "../views/AppointMentForSite/AppointmentScreen";
import AppointmentForSiteDetailScreen from "../views/AppointMentForSite/AppointmentDetails";
import AddAppointmentForSiteScreen from "../views/AppointMentForSite/AddAppointment";
import FollUpAddScreen from "../views/FollowUp/FollowUpAdd";
import VisitorUpdateScreen from "../views/LeadManagement/VisitorUpdate";
import ScanQrScreen from "../views/ScanQr";
import BookingScreen from "../views/BookingManagement/Booking";
import LeaderBoardScreen from "../views/LeaderBoard/LeaderBoardScreen";
import LeaderBoardSearchScreen from "../views/LeaderBoard/LeaderBoardSearch";
import { apiCall, setDefaultHeader } from "../components/utilities/httpClient";
import apiEndPoints from "../components/utilities/apiEndPoints";
import ForgotPassword from "../views/Authentication/ForgotPassword";
import OtpVerificationScreen from "../views/Authentication/OtpVerification";
import ChangePassword from "../views/Authentication/ChangePassword";
import ImageContent from "../views/PropertyMangement/PropertyDetails/components/ImageContent";
import VideoContent from "../views/PropertyMangement/PropertyDetails/components/VideoContent";
import CatalogueContent from "../views/PropertyMangement/PropertyDetails/components/CatalogueContent";
import AllocatePropertyScreen from "../views/PropertyMangement/PropertyAllocate";
import AllocateCPScreen from "app/views/SourcingManagers/CPAllocate";
import ErrorMessage from "app/components/ErrorMessage";
import { RED_COLOR } from "app/components/utilities/constant";
import AddNewVisitorScreen from "app/views/LeadManagement/AddNewVisitor";
import FollowUpAddScreen from "app/views/AppointMent/FollowUpAdd";
import SupportScreen from "app/views/Support";
import SupportForumScreen from "app/views/SupportForum";
import SalesToolsScreen from "app/views/SalesTools";
import ReportScreen from "app/views/Report";
import ChatViewScreen from "app/views/ChatManagement/Chat";
import RecoveryScreen from "app/views/Recovery";
import PropertyChat from "app/views/ChatManagement/PropertyChat";
import ChatScreen from "app/views/ChatManagement/PropertyChat/components/ChatScreen";
import Notification from "app/views/Setting/Notification";
import DeactiveAgencyScreen from "app/views/AgencyManagement/DeactiveAgency";
import auth from "@react-native-firebase/auth";
import { updateFirebase } from "app/Redux/Actions/FirebaseActions";

const Stack = createNativeStackNavigator();
const AppStack = createNativeStackNavigator();
const AuthStack = createNativeStackNavigator();
const AuthLoading = createNativeStackNavigator();
const Drawer = createDrawerNavigator();
const screenOptions = { headerShown: false, gestureEnabled: true };

const DrawerComponent = () => {
  return (
    <Drawer.Navigator
      initialRouteName="Home"
      screenOptions={{ headerShown: false, drawerType: "front" }}
      drawerContent={(props) => customDrawer(props)}
    >
      <Drawer.Screen name="DashboardScreen" component={DashboardScreen} />
      <Drawer.Screen name="PropertyScreenView" component={PropertyScreen} />
      <Drawer.Screen name="AgencyListing" component={AgencyListingScreen} />
      <Drawer.Screen
        name="LeadManagementScreen"
        component={LeadManagementScreen}
      />
      <Drawer.Screen name="SourcingManager" component={SourcingManager} />
      <Drawer.Screen name="ClosingManager" component={ClosingManager} />
      <Drawer.Screen name="FollowUpScreen" component={FollowUpScreen} />
      <Drawer.Screen
        name="AppointmentForSite"
        component={AppointmentForSiteScreen}
      />
      <Drawer.Screen
        name="AppointmentScreenCPSM"
        component={AppointmentScreenCPSM}
      />
      <Drawer.Screen name="SettingScreen" component={SettingScreen} />
      <Drawer.Screen name="Appointments" component={AppointmentsScreen} />
      <Drawer.Screen name="BookingList" component={BookingListScreen} />
      <Drawer.Screen name="PickupRequest" component={PickupRequestScreen} />
      <Drawer.Screen name="LeaderBoard" component={LeaderBoardScreen} />
      <Drawer.Screen name="SupportForum" component={SupportForumScreen} />
      <Drawer.Screen name="Support" component={SupportScreen} />
      <Drawer.Screen name="SalesTools" component={SalesToolsScreen} />
      <Drawer.Screen name="Report" component={ReportScreen} />
      <Drawer.Screen name="Chat" component={ChatViewScreen} />
      <Drawer.Screen name="Recovery" component={RecoveryScreen} />
      {/* <Drawer.Screen name="profile" component={ProfileScreen}  /> */}
    </Drawer.Navigator>
  );
};

const AppComponent = () => {
  return (
    <AppStack.Navigator screenOptions={screenOptions}>
      <AppStack.Screen component={DrawerComponent} name="DashboardScreenView" />
      {/* Property Management Screen */}
      <AppStack.Screen component={PropertyDetails} name="PropertyDetails" />
      <AppStack.Screen
        component={AllocatePropertyScreen}
        name="AllocatePropertyScreen"
      />
      <AppStack.Screen component={ImageContent} name="ImageContent" />
      <AppStack.Screen component={VideoContent} name="VideoContent" />
      <AppStack.Screen component={CatalogueContent} name="CatalogueContent" />
      {/* Agent Management Screen */}

      <AppStack.Screen
        name="PendingAgencyList"
        component={PendingAgencyListScreen}
      />
      <AppStack.Screen name="AgencyDetails" component={AgencyDetails} />
      <AppStack.Screen name="AddnewAgency" component={AddnewAgency} />
      <AppStack.Screen name="AgencyBankInfo" component={AgencyBankInfo} />

      {/* Lead Management Screens */}
      <AppStack.Screen name="LeadDetails" component={LeadDetails} />
      <AppStack.Screen name="AddNewSM" component={AddNewSM} />
      <AppStack.Screen name="AllocateCP" component={AllocateCPScreen} />
      <AppStack.Screen name="SMDetails" component={SMDetails} />
      <AppStack.Screen
        name="AddNewVisitorScreen"
        component={AddNewVisitorScreen}
      />

      {/* Closing Management Screens */}
      <AppStack.Screen name="AddNewCM" component={AddNewCM} />
      <AppStack.Screen name="CMDetails" component={CMDetails} />

      {/* Follow up Screens */}
      <AppStack.Screen name="FollowUpDetails" component={FollowUpDetails} />
      <AppStack.Screen name="EditFollowUp" component={EditFollowUp} />
      <AppStack.Screen name="AllFollowUpScreen" component={AllFollowUpScreen} />
      <AppStack.Screen name="DeactiveAgency" component={DeactiveAgencyScreen} />

      {/* Appointment with CPSM */}
      <AppStack.Screen
        name="AppointmentDetails"
        component={AppointmentDetails}
      />
      <AppStack.Screen
        name="AddAppointmentScreen"
        component={AddAppointmentScreen}
      />

      {/* Appointment for Site */}
      <AppStack.Screen
        name="AppointmentForSiteDetail"
        component={AppointmentForSiteDetailScreen}
      />
      <AppStack.Screen
        name="AddAppointmentForSite"
        component={AddAppointmentForSiteScreen}
      />

      {/* BookingDetails */}
      <AppStack.Screen name="BookingDetails" component={BookingDetailsScreen} />
      <AppStack.Screen name="Booking" component={BookingScreen} />

      {/* Appointment  */}
      <AppStack.Screen
        name="AppointmentDetailMain"
        component={AppointmentDetailsScreen}
      />
      <AppStack.Screen name="FollUpAdd" component={FollUpAddScreen} />
      <AppStack.Screen name="VisitorUpdate" component={VisitorUpdateScreen} />
      <AppStack.Screen name="FollowUpAdd" component={FollowUpAddScreen} />

      {/* Chat  */}
      <AppStack.Screen name="PropertyChat" component={PropertyChat} />
      <AppStack.Screen name="ChatScreen" component={ChatScreen} />

      {/* LeaderBoard  */}
      <AppStack.Screen
        name="LeaderBoardSearch"
        component={LeaderBoardSearchScreen}
      />

      {/* Profile Management */}
      <AppStack.Screen name="ScanQr" component={ScanQrScreen} />
      <AppStack.Screen name="profile" component={ProfileScreen} />
      <AppStack.Screen name="EditProfileScreen" component={EditProfileScreen} />
      <AppStack.Screen name="changePassword" component={ChangePasswordScreen} />
      <AppStack.Screen name="separateLink" component={SeparateLinkScreen} />
      <AppStack.Screen name="notification" component={Notification} />
    </AppStack.Navigator>
  );
};

const AuthComponent = () => {
  return (
    <AuthStack.Navigator screenOptions={screenOptions}>
      {/* <AuthStack.Screen
        component={OnboardingScreen}
        name="OnboardingScreenView"
      /> */}
      <AuthStack.Screen component={LoginScreen} name="LoginScreenView" />
      <AuthStack.Screen component={ForgotPassword} name="ForgotPassword" />
      <AuthStack.Screen
        name="OtpVerificationScreenView"
        component={OtpVerificationScreen}
      />
      <AuthStack.Screen
        name="ChangePasswordScreenView"
        component={ChangePassword}
      />
    </AuthStack.Navigator>
  );
};

const AuthLoadingComponent = () => {
  const { response, authToken = false } = useSelector(
    (state: any) => state.login
  );
  const firebaseData = useSelector((state: any) => state.firebaseData);
  const dispatch: any = useDispatch();
  useEffect(() => {
    checklogin();
  }, [response]);

  const checklogin = async () => {
    if (response && authToken) {
    console.log('response: IN LOGIN ', response);
      if (response.status === 200) {
        if (
          typeof response?.data?.firebase_id === "undefined"
        ) {
          auth()
            .createUserWithEmailAndPassword(response?.data?.email, "123456")
            .then(async (res) => {
              console.log("res: ", res.user.uid);
              console.log("User account created & signed in!");
              await setDefaultHeader("token", response.token);
              await AsyncStorage.setItem("loginData", JSON.stringify(response));
              dispatch(updateFirebase({ firebase_id: res.user.uid }));
              // checklogin()
            });
        } else {
          auth()
            .signInWithEmailAndPassword(response?.data?.email, "123456")
            .then(async (res) => {
              console.log("res: ", res.user.uid);
              console.log("User signed in!");
              await setDefaultHeader("token", response.token);
              await AsyncStorage.setItem("loginData", JSON.stringify(response));
            });
        }
      } else {
        ErrorMessage({
          msg: response?.message,
          backgroundColor: RED_COLOR,
        });
      }
    }
  };
  async function tokenGenrate() {
    try {
      const options = {
        headers: { "content-type": "application/json" },
      };
      const data = await axios
        .get("https://itinformatix.org:3044/api/token/jwtToken", options)
        .then((res) => {
          console.log("res", res.data);
          return res.data;
        })
        .catch((e) => {
          console.log("e", e);
        });
      // const { data } = await apiCall("GET", apiEndPoints.JWTTOKEN, null);
      console.log("data", data);
      if (data?.status === 200) {
        await AsyncStorage.setItem("token", data.token);
        await setDefaultHeader("token", data.token);
      } else {
        ErrorMessage({
          msg: data?.message,
          backgroundColor: RED_COLOR,
        });
      }
    } catch (error) {
      // console.log(error);
    }
  }
  useEffect(() => {
    if (
      response === null ||
      response?.status == 201 ||
      response?.status == 401 ||
      response?.status == 400
    ) {
      console.log("TOKEN GENERATE");
      tokenGenrate();
    } else {
      console.log("SET DEFAULT");
      setDefaultHeader("token", response?.token);
    }
  }, [response]);
  return (
    <AuthLoading.Navigator screenOptions={screenOptions}>
      {!authToken ? (
        <AuthLoading.Screen component={AuthComponent} name="Auth" />
      ) : (
        <AuthLoading.Screen component={AppComponent} name="App" />
      )}
    </AuthLoading.Navigator>
  );
};

const Route = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={screenOptions}>
        <Stack.Screen component={SplashScreen} name="SplashScreenView" />
        <Stack.Screen name="AuthLoading" component={AuthLoadingComponent} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Route;
