import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import AppointmentView from './Components/AppointmentView'
import { getAllAppointmentList } from 'app/Redux/Actions/AppointmentWithCpActions'
import { useDispatch, useSelector } from 'react-redux'
import { useFocusEffect } from '@react-navigation/native'

const AppointmentScreenCPSM = ({ navigation }: any) => {
  const [appointmentList, setAppointmentList] = useState<any>([])
  const [offSET, setOffset] = useState(0)
  const dispatch: any = useDispatch()
  const { response = {}, list = '' } = useSelector((state: any) => state.appointment)
  console.log('response: ', response);
  const [filterData, setFilterData] = useState({
    start_date: '',
    end_date: '',
    customer_name: '',
  })
  console.log('filterData: ', filterData);
  useFocusEffect(
    React.useCallback(() => {
      getAppointmentList(offSET, 1)
      return () => { };
    }, [navigation, list])
  );
  useEffect(() => {
    if (list) {
      if (offSET == 0) {
        console.log('offSET == 0: ', offSET == 0);
        setAppointmentList(response?.data)
      } else {
        setAppointmentList([...appointmentList, ...response?.data])
      }
    }
  }, [response])
  const getAppointmentList = (offset: any, type: any) => {
    setOffset(offset)
    dispatch(getAllAppointmentList({
      offset: offset,
      limit: 3,
      start_date: filterData.start_date,
      end_date: filterData.end_date,
      customer_name: filterData.customer_name,
      appointment_type: type ? type : 1
    }))
    // toGetDatas(array)
  }
  const handleDrawerPress = () => {
    navigation.toggleDrawer();
  };
  return (
    <AppointmentView
      handleDrawerPress={handleDrawerPress}
      appointmentList={appointmentList}
      offSET={offSET}
      getAppointmentList={getAppointmentList}
      setFilterData={setFilterData}
      filterData={filterData}
    />
  )
}

export default AppointmentScreenCPSM