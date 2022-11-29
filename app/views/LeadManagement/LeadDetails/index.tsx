import { View, Text } from 'react-native'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import LeadDetailsView from './Components/LeadDetailsView'
import { useDispatch, useSelector } from 'react-redux'
import { getVisitorDetail } from 'app/Redux/Actions/LeadsActions'

const LeadDetails = ({ navigation, route }: any) => {
  const dispatch: any = useDispatch()
  const { response = {}, detail = "" } = useSelector((state: any) => state.visitorData)
  const [allDetails, setAllDetails] = useState({})

  useLayoutEffect(() => {
    const data = route?.params
    if (data._id) {
      dispatch(getVisitorDetail({
        lead_id: data._id
      }))
    }
  }, [detail])

  useEffect(() => {
    if (response?.status === 200) {
      setAllDetails(response?.data[0])
    }
  }, [response])
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
      handleBackPress={handleBackPress} 
      allDetails={allDetails}
      />
  )
}

export default LeadDetails