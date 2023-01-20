import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import ErrorMessage from "app/components/ErrorMessage";
import { GREEN_COLOR, ROLE_IDS } from "app/components/utilities/constant";
import { getAllAgentList } from "app/Redux/Actions/AgencyActions";
import {
  dashboardClosingData,
  dashboardPostSaleData,
  dashboardReceptionistData,
  dashboardSourcingData,
  userStatusUpdateData,
  userStatusUpdater,
} from "app/Redux/Actions/Dashboard";
import {
  getAssignCPList,
  getSourcingManagerList,
} from "app/Redux/Actions/SourcingManagerActions";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import DashboardView from "./components/DashboardView";

const DashboardScreen = ({ navigation }: any) => {
  const dispatch: any = useDispatch();
  const getLoginType = useSelector((state: any) => state.login);
  const statusData = useSelector((state: any) => state.statusUpdateData) || {};
  const { response = {} } = useSelector((state: any) => state.dashboardData);
  const SMListData = useSelector((state: any) => state.SourcingManager);
  const [dashboardData, setDashboardData] = useState({});
  const [listData, setListData] = useState<any>([]);
  const [isEnabled, setIsEnabled] = useState<any>();

  useFocusEffect(
    React.useCallback(() => {
      getDashboard();
      return () => {};
    }, [navigation, isEnabled, getLoginType])
  );
  useEffect(() => {
    if (response?.status === 200) {
      setDashboardData(response?.data);
      setIsEnabled(response?.data?.online_status);
    } else {
      setDashboardData({});
      setIsEnabled(null);
    }
    if (
      getLoginType?.response?.data?.role_id === ROLE_IDS.sourcingtl_id ||
      getLoginType?.response?.data?.role_id === ROLE_IDS.sourcingmanager_id
    ) {
      if (SMListData?.response?.status === 200) {
        setListData(SMListData?.response?.data);
      } else {
        setListData([]);
      }
    }
  }, [response, SMListData]);
  const getDashboard = async () => {
    if (
      getLoginType?.response?.data?.role_id === ROLE_IDS.sourcingtl_id ||
      getLoginType?.response?.data?.role_id === ROLE_IDS.sourcingmanager_id
    ) {
      dispatch(dashboardSourcingData({}));
      if (getLoginType?.response?.data?.role_id === ROLE_IDS.sourcingtl_id) {
        dispatch(getSourcingManagerList({}));
      } else if (
        getLoginType?.response?.data?.role_id === ROLE_IDS.sourcingmanager_id
      ) {
        dispatch(
          getAssignCPList({
            user_id: getLoginType?.response?.data?.user_id,
          })
        );
      } else {
        setListData([]);
      }
    } else if (
      getLoginType?.response?.data?.role_id === ROLE_IDS.closingtl_id ||
      getLoginType?.response?.data?.role_id === ROLE_IDS.closingmanager_id
    ) {
      dispatch(dashboardClosingData({}));
    } else if (
      getLoginType?.response?.data?.role_id === ROLE_IDS.postsales_id
    ) {
      dispatch(dashboardPostSaleData({}));
    } else if (
      getLoginType?.response?.data?.role_id === ROLE_IDS.receptionist_id
    ) {
      dispatch(dashboardReceptionistData({}));
    } else {
      setDashboardData({});
      setIsEnabled(null);
    }
  };
  const updateStatusPress = (data: any) => {
    dispatch(
      userStatusUpdateData({
        online_status: data === 1 ? 2 : 1,
      })
    );
  };
  useEffect(() => {
    if (statusData?.data && statusData?.response?.status === 200) {
      setIsEnabled(isEnabled === 1 ? 2 : 1);
      dispatch(userStatusUpdater());
      ErrorMessage({
        msg: statusData?.response?.message,
        backgroundColor: GREEN_COLOR,
      });
    }
  }, [statusData]);
  const handleDrawerPress = () => {
    navigation.toggleDrawer();
  };

  const onPressTodayVisit = () => {
    navigation.navigate('LeadManagementScreen')
  }
  const onPressSiteVisit = () => {
    if (getLoginType?.response?.data?.role_id === ROLE_IDS.closingtl_id || getLoginType?.response?.data?.role_id === ROLE_IDS.closingmanager_id) {
      navigation.navigate('Appointments')
    } else {
      navigation.navigate('AppointmentForSite')
    }
  }
  const onPressSMList = (data: any) => {
    if (data?._id !== '') {
      navigation.navigate('SMDetails', data)
    } else {
      navigation.navigate('SourcingManager')
    }
  }
  const onPressCPList = (data: any) => {
    if (data?._id !== '') {
      navigation.navigate('AgencyDetails', { data })
    } else {
      navigation.navigate('AgencyListing')
    }
  }

  const onpressBooking = (type: any) => {
    if (type === 'request') {
      navigation.navigate("BookingList", { type: "request" });
    } else if (type === 'register') {
      navigation.navigate("BookingList", { type: "register" });
    } else {
      navigation.navigate("BookingList", { type: "readyToBook" });
    }
  }
  const onpressSMList = () => {
    navigation.navigate('ClosingManager')
  }







  return <DashboardView
    dashboardData={dashboardData}
    handleDrawerPress={handleDrawerPress}
    updateStatusPress={updateStatusPress}
    isEnabled={isEnabled}
    listData={listData}
    getLoginType={getLoginType}
    onPressTodayVisit={onPressTodayVisit}
    onPressSiteVisit={onPressSiteVisit}
    onPressSMList={onPressSMList}
    onPressCPList={onPressCPList}
    onpressBooking={onpressBooking}
    onpressSMList={onpressSMList}
  />;
};

export default DashboardScreen;
