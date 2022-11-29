import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import AddAppointmentView from './Components/AddAppointmentView'
import { useDispatch, useSelector } from 'react-redux'

const AddAppointmentScreen = ({ navigation }: any) => {
  const dispatch: any = useDispatch()
  const { response = {}, list = "" } = useSelector((state: any) => state.visitorDataList)
  const addAppointmentData = useSelector((state: any) => state.appointment)
  const [visitorList, setVisiitorList] = useState<any>([])
  useEffect(() => {
    if (list) {
      setVisiitorList(response?.data)
    }
  }, [response])

  const getVisitorsList = (offset: any, array: any) => {
    dispatch(getAllLeadsList({
      offset: offset,
      limit: 10,
      lead_status: 1
    }))
    // toGetDatas(array)
  }
  const handleBackPress = () => {
    navigation.goBack()
  }
  return (
    <AddAppointmentView handleBackPress={handleBackPress} />
  )
}

export default AddAppointmentScreen