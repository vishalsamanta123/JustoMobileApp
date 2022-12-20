import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import AddAppointmentView from './Components/AddAppointmentView'
import { useDispatch, useSelector } from 'react-redux'
import { getAllLeadsList, getUserVisitList } from 'app/Redux/Actions/LeadsActions'
import ErrorMessage from 'app/components/ErrorMessage'
import { RED_COLOR } from 'app/components/utilities/constant'
import { addAppointment, editAppointment } from 'app/Redux/Actions/AppointmentWithCpActions'
import strings from 'app/components/utilities/Localization'

const AddAppointmentScreen = ({ navigation, route }: any) => {
  const { data, type } = route?.params || {}
  const dispatch: any = useDispatch()
  const { response = {}, list = "" } = useSelector((state: any) => state.visitorData)
  const addAppointmentData = useSelector((state: any) => state.appointment)
  const [visitorList, setVisiitorList] = useState<any>([])
  useEffect(() => {
    if (list) {
      setVisiitorList(response?.data)
    }
  }, [response])

 
  

  const getVisitorsList = (offset: any, array: any) => {
    dispatch(getUserVisitList({
      lead_status: 1
    }))
  }

  const handleAddAppointment = (params: any) => {
    if (type === strings.edit) {
      dispatch(editAppointment(params))
      if (addAppointmentData?.response?.status) {
        navigation.navigate('AppointmentScreenCPSM')
      } else {
        ErrorMessage({
          msg: addAppointmentData?.response?.message,
          backgroundColor: RED_COLOR
        })
      }
    } else {
      dispatch(addAppointment(params))
      if (addAppointmentData?.response?.status) {
        navigation.navigate('AppointmentScreenCPSM')
      } else {
        ErrorMessage({
          msg: addAppointmentData?.response?.message,
          backgroundColor: RED_COLOR
        })
      }
    }
  }
  const handleBackPress = () => {
    navigation.goBack()
  }
  return (
    <AddAppointmentView
      getVisitorsList={getVisitorsList}
      handleBackPress={handleBackPress}
      visitorList={visitorList}
      handleAddAppointment={handleAddAppointment}
      type={type}
      data={data}
    />
  )
}

export default AddAppointmentScreen