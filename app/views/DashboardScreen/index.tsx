import AsyncStorage from '@react-native-async-storage/async-storage';
import ErrorMessage from 'app/components/ErrorMessage';
import { GREEN_COLOR } from 'app/components/utilities/constant';
import { getAllAgentList } from 'app/Redux/Actions/AgencyActions';
import { dashboardClosingData, dashboardSourcingData, userStatusUpdateData, userStatusUpdater } from 'app/Redux/Actions/Dashboard';
import { getAssignCPList, getSourcingManagerList } from 'app/Redux/Actions/SourcingManagerActions';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import DashboardView from './components/DashboardView';

const DashboardScreen = ({ navigation }: any) => {
  const dispatch: any = useDispatch()
  const getLoginType = useSelector((state: any) => state.login);
  const statusData = useSelector((state: any) => state.statusUpdateData) || {}
  const { response = {}, } = useSelector((state: any) => state.dashboardData);
  const SMListData = useSelector((state: any) => state.SourcingManager)
  // const CPListData = useSelector((state: any) => state.agentData)
  const [dashboardData, setDashboardData] = useState({})
  const [listData, setListData] = useState<any>([])
  const [isEnabled, setIsEnabled] = useState<any>();

  useEffect(() => {
    getDashboard()
    if (getLoginType?.response?.data?.role_title === 'Sourcing TL') {
      dispatch(getSourcingManagerList({}))
    } else {
      if (getLoginType?.response?.data?.role_title === 'Sourcing Manager') {
        dispatch(
          getAssignCPList({
            user_id: getLoginType?.response?.data?.user_id,
          })
        )
      } else {
        setListData([])
      }
    }
  }, [isEnabled, getLoginType])
  useEffect(() => {
    if (response?.status === 200) {
      setDashboardData(response?.data)
      setIsEnabled(response?.data?.online_status)
    }
    if (getLoginType?.response?.data?.role_title === 'Sourcing TL' || getLoginType?.response?.data?.role_title === 'Sourcing Manager') {
      if (SMListData?.response?.status === 200) {
        setListData(SMListData?.response?.data)
      }
    }
  }, [response, SMListData])
  const getDashboard = async () => {
    const userData: any = await AsyncStorage.getItem("loginData");
    if (
      JSON.parse(userData)?.data?.role_title === 'Sourcing TL' ||
      getLoginType?.response?.data?.role_title === 'Sourcing TL' ||
      JSON.parse(userData)?.data?.role_title === 'Sourcing Manager' ||
      getLoginType?.response?.data?.role_title === 'Sourcing Manager') {
      dispatch(dashboardSourcingData({}))
    } else {
      if (
        JSON.parse(userData)?.data?.role_title === 'Closing TL' ||
        getLoginType?.response?.data?.role_title === 'Closing TL' ||
        JSON.parse(userData)?.data?.role_title === 'Closing Manager' ||
        getLoginType?.response?.data?.role_title === 'Closing Manager') {
        dispatch(dashboardClosingData({}))
      } else {
        setDashboardData({})
      }
    }
  }
  const updateStatusPress = (data: any) => {
    dispatch(userStatusUpdateData({
      online_status: data === 1 ? 2 : 1
    }))
  }
  useEffect(() => {
    if (statusData?.data && statusData?.response?.status === 200) {
      setIsEnabled(isEnabled === 1 ? 2 : 1)
      dispatch(userStatusUpdater())
      ErrorMessage({
        msg: statusData?.response?.message,
        backgroundColor: GREEN_COLOR
      })
    }
  }, [statusData])
  const handleDrawerPress = () => {
    navigation.toggleDrawer()
  };
  return <DashboardView
    dashboardData={dashboardData}
    handleDrawerPress={handleDrawerPress}
    updateStatusPress={updateStatusPress}
    isEnabled={isEnabled}
    listData={listData}
    getLoginType={getLoginType}
  />;
};

export default DashboardScreen;
