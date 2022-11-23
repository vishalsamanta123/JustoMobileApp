import { View, Text } from 'react-native'
import React from 'react'
import LeadDetailsView from './Components/LeadDetailsView'

const LeadDetails = ({ navigation }: any) => {
  const handleBackPress = () => {
    navigation.goBack()
  }
  const handleStatusUpdate = () => {
    navigation.navigate('FollUpAdd')
  }
  const handleScheduleVisit = () => {
    navigation.navigate('AddAppointmentForSite')
  }
  return (
    <LeadDetailsView
      handleStatusUpdate={handleStatusUpdate}
      handleScheduleVisit={handleScheduleVisit}
      handleBackPress={handleBackPress} />
  )
}

export default LeadDetails