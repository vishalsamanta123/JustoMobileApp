import { View, Text, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import AppointmentDetailsView from './Components/AppointmentDetailsView'
import { useFocusEffect } from '@react-navigation/native'
import { getAppointmentDetail } from 'app/Redux/Actions/AppointmentWithCpActions'
import { useDispatch, useSelector } from 'react-redux'
import { AddBooking, removeAddBookingData } from 'app/Redux/Actions/AppointmentCLAction'
import ErrorMessage from 'app/components/ErrorMessage'
import { GREEN_COLOR } from 'app/components/utilities/constant'
import { closeVisit } from 'app/Redux/Actions/LeadsActions'

const AppointmentDetails = ({ navigation, route }: any) => {
  const data = route?.params || {}
  const [BookingData, setBookingData] = useState<any>({})
  const [cancelValue, setCancelValue] = useState({
    lead_id: '',
    appointment_id: '',
    cancle_type: '',  //1=lead, 2=appoinment
    reason: '',
    remark: '',
    property_id: '',
    property_name: '',
  });
  const dispatch: any = useDispatch()
  const { response = {}, detail = '' } = useSelector((state: any) => state.appointment)
  const addedBookingData = useSelector((state: any) => state.addedBooking) || {}

  useFocusEffect(
    React.useCallback(() => {
      dispatch(getAppointmentDetail({
        appointment_id: data?._id
      }))
      return () => { };
    }, [navigation, detail])
  );

  useEffect(() => {
    setBookingData({
      lead_id: data?.lead_id,
      property_id: data?.property_id,
      customer_id: data?.customer_id
    })
  }, [data])


  useEffect(() => {
    if (addedBookingData?.response?.status === 200) {
      dispatch(removeAddBookingData())
      ErrorMessage({
        msg: addedBookingData?.response?.message,
        backgroundColor: GREEN_COLOR
      })
      navigation.navigate("BookingList", { type: "readyToBook" });
    }
  }, [addedBookingData])

  const handleBackPress = () => {
    navigation.goBack()
  }
  const handleVistorUpdate = (data: any) => {
    navigation.navigate('VisitorUpdate', data)
  }
  const onPressBookNow = () => {
    navigation.navigate('Booking', { getBookingData: response?.data?.length > 0 ? response?.data[0] : [] })
  }
  const handleViewFollowUp = (data: any) => {
    navigation.navigate('AllFollowUpScreen', data)
  }
  const handleUpdateStatus = (data: any) => {
    navigation.navigate('AddAppointmentForSite', { item: response?.data[0], type: 'reSheduled' })
  }
  const handleBooking = () => {
    dispatch(AddBooking({ ...BookingData, booking_status: 1 }))
  }

  const onpressCloseVisit = (data: any) => {
    const params = {
      lead_id: data?.lead_id,
      appointment_id: data?.appointment_id,
      cancle_type: data?.cancle_type,  //1=lead, 2=appoinment
      resion: cancelValue?.reason,
      comment: cancelValue?.remark,
      property_id: cancelValue?.property_id,
      property_name: cancelValue?.property_name,
    }
    dispatch(closeVisit(params))
    console.log('params: ', params);
  }
  return (
    <AppointmentDetailsView
      handleUpdateStatus={handleUpdateStatus}
      handleViewFollowUp={handleViewFollowUp}
      handleBackPress={handleBackPress}
      handleVistorUpdate={handleVistorUpdate}
      setBookingData={setBookingData}
      BookingData={BookingData}
      handleBooking={handleBooking}
      onPressBookNow={onPressBookNow}
      onpressCloseVisit={onpressCloseVisit}
      cancelValue={cancelValue}
      setCancelValue={setCancelValue}
    />
  )
}

export default AppointmentDetails