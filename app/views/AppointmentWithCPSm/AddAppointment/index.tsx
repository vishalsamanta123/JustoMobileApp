import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import AddAppointmentView from './Components/AddAppointmentView'
import { useDispatch, useSelector } from 'react-redux'
import { getAllLeadsList, getUserVisitList } from 'app/Redux/Actions/LeadsActions'
import ErrorMessage from 'app/components/ErrorMessage'
import { RED_COLOR } from 'app/components/utilities/constant'
import { addAppointment, editAppointment } from 'app/Redux/Actions/AppointmentWithCpActions'
import strings from 'app/components/utilities/Localization'
import { getAllMaster } from 'app/Redux/Actions/MasterActions'
import { getAssignCPList, getSourcingManagerList } from 'app/Redux/Actions/SourcingManagerActions'
import { addUserAppointment, editUserAppointment } from 'app/Redux/Actions/AppiontmentWithUserActions'

const AddAppointmentScreen = ({ navigation, route }: any) => {
  const { data, type } = route?.params || {}
  const dispatch: any = useDispatch()
  const { response = {}, list = "" } = useSelector((state: any) => state.visitorData)
  const userAppointmentData = useSelector((state: any) => state.userAppointmentData)
  const userEditAppointmentData = useSelector((state: any) => state.userEditAppointmentData)
  const masterData = useSelector((state: any) => state.masterData) || {}
  const getLoginType = useSelector((state: any) => state.login) || {}
  const SMListData = useSelector((state: any) => state.SourcingManager)
  const [visitorList, setVisiitorList] = useState<any>([])
  const [masterDatas, setMasterDatas] = useState<any>([])
  const [listData, setListData] = useState<any>([])
  const [role, setRole] = useState<any>('')
  console.log('listData: ', listData);


  useEffect(() => {
    if (list) {
      setVisiitorList(response?.data)
    }
  }, [response])

  useEffect(() => {
    console.log('getLoginType?.response?.data?.user_id: ', getLoginType?.response?.data?.user_id);
    console.log('getLoginType?.response: ', getLoginType?.response);

    if (getLoginType?.response?.data?.role_title === 'Sourcing TL') {
      setRole('TL')
      console.log('getLoginType?.response: ', getLoginType?.response);
      dispatch(getSourcingManagerList({}))
    } else {
      if (getLoginType?.response?.data?.role_title === 'Sourcing Manager') {
        setRole('SM')
        dispatch(
          getAssignCPList({
            user_id: getLoginType?.response?.data?.user_id,
          })
        )
      } else {
        setListData([])
      }
    }
  }, [getLoginType])

  useEffect(() => {
    if (masterData?.response?.status === 200) {
        setMasterDatas(masterData?.response?.data?.length > 0 ? masterData?.response?.data : [])
    }
}, [masterData])

useEffect(() => {
  if (getLoginType?.response?.data?.role_title === 'Sourcing TL' || getLoginType?.response?.data?.role_title === 'Sourcing Manager') {
    if (SMListData?.response?.status === 200) {
      setListData(SMListData?.response?.data)
    }
  }
}, [SMListData])

const handleMasterDatas = (data: any) => {
  dispatch(getAllMaster({
      type: data
  }))
}

  const getVisitorsList = (offset: any, array: any) => {
    dispatch(getUserVisitList({
      lead_status: 1
    }))
  }
  
  const handleAddAppointment = (params: any) => {
    if (type === strings.edit) {
      console.log('userEditAppointmentData: ', userEditAppointmentData);
      dispatch(editUserAppointment({...params, appointment_id: data?._id}))
      if (userEditAppointmentData?.response?.status === 200) {
        navigation.goBack()
      }
    } else {
      dispatch(addUserAppointment(params))
      if (userAppointmentData?.response?.status === 200) {
        navigation.goBack()
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
      handleMasterDatas={handleMasterDatas}
      masterDatas={masterDatas}
      listData={listData}
      role={role}
      type={type}
      data={data}
    />
  )
}

export default AddAppointmentScreen