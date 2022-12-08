import { dashboardClosingData, dashboardSourcingData } from 'app/Redux/Actions/Dashboard';
import React, { useEffect, useLayoutEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import DashboardView from './components/DashboardView';

const DashboardScreen = ({ navigation }: any) => {
  const dispatch: any = useDispatch()
  const getLoginType = useSelector((state: any) => state.login);
  const { response = {}, } = useSelector((state: any) => state.dashboardData);
  const [dashboardData, setDashboardData] = useState({})
  useLayoutEffect(() => {
    getDashboard()
  }, [])
  useEffect(() => {
    if (response?.status === 200) {
      setDashboardData(response?.data)
    }
  }, [response,])
  const getDashboard = () => {
    if (getLoginType?.response?.data?.role_title === 'Sourcing TL') {
      dispatch(dashboardSourcingData({}))
    } else {
      if (getLoginType?.response?.data?.role_title === 'Closing TL') {
        dispatch(dashboardClosingData({}))
      }
    }
  }
  const handleDrawerPress = () => {
    navigation.toggleDrawer()
  };
  return <DashboardView
    dashboardData={dashboardData}
    handleDrawerPress={handleDrawerPress}
  />;
};

export default DashboardScreen;
