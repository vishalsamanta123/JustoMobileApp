import { View, Text } from 'react-native'
import React, { useState } from 'react'
import AppointmentDetailsView from './Components/AppointmentDetailsView'

const AppointmentDetails = ({navigation,route}: any) => {
 
  const [status , setStatus] = useState(route?.params)
  const handleBackPress = () => {
    navigation.goBack()
  }
  return (
   <AppointmentDetailsView handleBackPress={handleBackPress} status={status} />
  )
}

export default AppointmentDetails