import { View, Text } from 'react-native'
import React, { useEffect } from 'react'
import AppointmentDetailsView from './Components/AppointmentDetailsView'
import { useFocusEffect } from '@react-navigation/native'
import { getAppointmentDetail } from 'app/Redux/Actions/AppointmentWithCpActions'
import { useDispatch, useSelector } from 'react-redux'

const AppointmentDetails = ({ navigation, route }: any) => {
  const data = route?.params || {}
  console.log('data: ', data);
  const dispatch: any = useDispatch()
  const { response = {}, detail = '' } = useSelector((state: any) => state.appointment)
  useFocusEffect(
    React.useCallback(() => {
      dispatch(getAppointmentDetail({
        appointment_id: data?._id
      }))
      return () => { };
    }, [navigation, detail])
  );
  const handleBackPress = () => {
    navigation.goBack()
  }
  const handleVistorUpdate = () => {
    navigation.navigate('VisitorUpdate')
  }
  const handleUpdateStatus = () => {
    navigation.navigate('FollowUpAdd')
  }
  return (
    <AppointmentDetailsView
      handleUpdateStatus={handleUpdateStatus}
      handleBackPress={handleBackPress}
      handleVistorUpdate={handleVistorUpdate}
    />
  )
}

export default AppointmentDetails