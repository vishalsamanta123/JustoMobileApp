import { useFocusEffect } from '@react-navigation/native'
import { getAllAppointmentList } from 'app/Redux/Actions/AppointmentWithCpActions'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import AppointmentView from './Components/AppointmentView'

const AppointmentScreen = ({ navigation }: any) => {
  const dispatch: any = useDispatch()
  const { response = {}, list = '' } = useSelector((state: any) => state.appointment)
  const moreData = response?.total_data || 0
  const [offSET, setOffset] = useState(0)
  const [siteAppointments, setSiteAppointments] = useState<any>([])
  const [filterData, setFilterData] = useState({
    appointment_with: '',
    status: '',
    start_date: '',
    end_date: '',
    customer_name: '',
    property_name: ''
  })
  
  useFocusEffect(
    React.useCallback(() => {
      getAppointmentList(0, {})
      return () => { };
    }, [navigation, list])
  );
  useEffect(() => {
    if (response?.status === 200) {
      if (offSET === 0) {
        setSiteAppointments(response?.data)
      } else {
        setSiteAppointments([...siteAppointments, ...response?.data])
      }
    } else {
      setSiteAppointments([])
    }
  }, [response])

  const getAppointmentList = (offset: any, data: any) => {
    setOffset(offset)
    dispatch(getAllAppointmentList({
      offset: offset,
      limit: 3,
      start_date: data?.start_date ? data?.start_date : '',
      end_date: data?.end_date ? data?.end_date : '',
      customer_name: data?.customer_name ? data?.customer_name : '',
      property_name: data?.property_name ? data?.property_name : '',
      status: data?.status ? data?.status : '',
      appointment_type: 2,
      appointment_with: data?.appointment_with ? data?.appointment_with : '',
    }))
  }

  const handleDrawerPress = () => {
    navigation.toggleDrawer();
  };
  return (
    <AppointmentView
      handleDrawerPress={handleDrawerPress}
      siteAppointments={siteAppointments}
      filterData={filterData}
      setFilterData={setFilterData}
      offSET={offSET}
      moreData={moreData}
      setSiteAppointments={setSiteAppointments}
      getAppointmentList={getAppointmentList}
    />
  )
}

export default AppointmentScreen