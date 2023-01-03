import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
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
  console.log('getLoginType: ', getLoginType);
  const statusData = useSelector((state: any) => state.statusUpdateData) || {}
  const { response = {}, } = useSelector((state: any) => state.dashboardData);
  console.log('response: dashboardData', response);
  const SMListData = useSelector((state: any) => state.SourcingManager)
  console.log('SMListData: ', SMListData);
  // const CPListData = useSelector((state: any) => state.agentData)
  const [dashboardData, setDashboardData] = useState({})
  const [listData, setListData] = useState<any>([])
  const [isEnabled, setIsEnabled] = useState<any>();

  useFocusEffect(
    React.useCallback(() => {
      getDashboard()
      return () => { };
    }, [navigation, isEnabled, getLoginType])
  );
  useEffect(() => {
    if (response?.status === 200) {
      setDashboardData(response?.data)
      setIsEnabled(response?.data?.online_status)
    }
    if (getLoginType?.response?.data?.role_title === 'Sourcing TL' ||
      getLoginType?.response?.data?.role_title === 'Sourcing Manager') {
      if (SMListData?.response?.status === 200) {
        setListData(SMListData?.response?.data)
      }
    }
  }, [response, SMListData])
  const getDashboard = async () => {
    if (
      getLoginType?.response?.data?.role_title === 'Sourcing TL' ||
      getLoginType?.response?.data?.role_title === 'Sourcing Manager') {
      dispatch(dashboardSourcingData({}))
      if (getLoginType?.response?.data?.role_title === 'Sourcing TL') {
        dispatch(getSourcingManagerList({}))
      } else {
        if (getLoginType?.response?.data?.role_title === 'Sourcing Manager') {
          dispatch(getAssignCPList({
            user_id: getLoginType?.response?.data?.user_id,
          }))
        } else {
          setListData([])
        }
      }
    } else {
      if (getLoginType?.response?.data?.role_title === 'Closing TL' ||
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
