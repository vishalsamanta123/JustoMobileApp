import ErrorMessage from 'app/components/ErrorMessage';
import { GREEN_COLOR } from 'app/components/utilities/constant';
import { dashboardClosingData, dashboardSourcingData, userStatusUpdateData, userStatusUpdater } from 'app/Redux/Actions/Dashboard';
import React, { useEffect, useLayoutEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import DashboardView from './components/DashboardView';

const DashboardScreen = ({ navigation }: any) => {
  const dispatch: any = useDispatch()
  const getLoginType = useSelector((state: any) => state.login);
  const statusData = useSelector((state: any) => state.statusUpdateData) || {}
  const { response = {}, } = useSelector((state: any) => state.dashboardData);
  console.log('response: ', response);
  const [dashboardData, setDashboardData] = useState({})
  const [isEnabled, setIsEnabled] = useState<any>();

  useEffect(() => {
    getDashboard()
  }, [isEnabled])
  useEffect(() => {
    if (response?.status === 200) {
      setDashboardData(response?.data)
      setIsEnabled(response?.data?.online_status)
    }
  }, [response])
  const getDashboard = () => {
    if (getLoginType?.response?.data?.role_title === 'Sourcing TL' ||
      getLoginType?.response?.data?.role_title === 'Sourcing Manager') {
      dispatch(dashboardSourcingData({}))
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
      online_status: data === 0 ? 1 : 0
    }))
  }
  useEffect(() => {
    if (statusData?.data && statusData?.response?.status === 200) {
      setIsEnabled(isEnabled === 0 ? 1 : 0)
      dispatch(userStatusUpdater())
      ErrorMessage({
        msg: response?.message,
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
  />;
};

export default DashboardScreen;
