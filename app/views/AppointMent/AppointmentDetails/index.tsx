import { View, Text, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import AppointmentDetailsView from './Components/AppointmentDetailsView'
import { useFocusEffect } from '@react-navigation/native'
import { getAppointmentDetail } from 'app/Redux/Actions/AppointmentWithCpActions'
import { useDispatch, useSelector } from 'react-redux'
import { AddBooking } from 'app/Redux/Actions/AppointmentCLAction'

const AppointmentDetails = ({ navigation, route }: any) => {
  const data = route?.params || {}
  const [BookingData, setBookingData] = useState({})
  const dispatch: any = useDispatch()
  const { response = {}, detail = '' } = useSelector((state: any) => state.appointment)
  // useFocusEffect(
  //   React.useCallback(() => {
  //     dispatch(getAppointmentDetail({
  //       appointment_id: data?._id
  //     }))
  //     return () => { };
  //   }, [navigation, detail])
  // );
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

  const handleBackPress = () => {
    navigation.goBack()
  }
  const handleVistorUpdate = (data: any) => {
    navigation.navigate('VisitorUpdate', data)
  }
  const onPressBookNow = () => {
    navigation.navigate('Booking', {getBookingData : response?.data?.length > 0 ?  response?.data[0] : [], type: ''})
  }
  const handleViewFollowUp = (data: any) => {
    navigation.navigate('AllFollowUpScreen', data)
  }
  const handleUpdateStatus = (data: any) => {
    navigation.navigate('AddAppointmentForSite', {item : response?.data[0]})
  }
  const handleBooking = () => {
    dispatch(AddBooking({...BookingData, booking_status: 1}))
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
    />
  )
}

export default AppointmentDetails