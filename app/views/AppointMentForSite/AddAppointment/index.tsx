import { View, Text } from 'react-native'
import React from 'react'
import AddAppointmentView from './Components/AddAppointmentView'

const AddAppointmentScreen = ({ navigation, route }: any) => {
  const data = route?.params?.type || null
  const handleBackPress = () => {
    navigation.goBack()
  }
  return (
    <AddAppointmentView
      data={data}
      handleBackPress={handleBackPress} />
  )
}

export default AddAppointmentScreen