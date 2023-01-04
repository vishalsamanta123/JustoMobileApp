import { View, Text, Alert, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import AddAppointmentView from './Components/AddAppointmentView'
import { useDispatch, useSelector } from 'react-redux'
import { addAppointment, editAppointment, getAppointmentDetail, removeEditUser } from 'app/Redux/Actions/AppointmentWithCpActions'
import { getAllLeadsList } from 'app/Redux/Actions/LeadsActions'
import { getAllProperty } from 'app/Redux/Actions/propertyActions'
import ErrorMessage from 'app/components/ErrorMessage'
import { GREEN_COLOR, RED_COLOR } from 'app/components/utilities/constant'

const AddAppointmentScreen = ({ navigation, route }: any) => {
  const { type = "", item = {} } = route?.params || {}
  console.log('type: ', type);
  console.log('item: ', item);
  const dispatch: any = useDispatch()
  const { response = {}, detail = '' } = useSelector((state: any) => state.appointment)
  const leadData = useSelector((state: any) => state.visitorDataList) || {}
  const propertyData = useSelector((state: any) => state.propertyData) || {}
  const editAppointmentData = useSelector((state: any) => state.editAddAppointment) || {}
  const [leadList, setLeadList] = useState<any>([])
  const [propertyList, setPropertyList] = useState<any>([])
  const [appointMentForm, setAppointMentForm] = useState<any>({
    module_id: "",
    lead_id: '',
    property_id: '',
    appointment_date: '',
    appointment_time: '',
    pickup: 'No',
    type: '',
    pickup_address: '',
    pickup_location: '',
    pickup_latitude: '',
    pickup_longitude: '',
    number_of_guest: '',
    property_title: '',
    first_name: '',
    update_type: ''
  })
  useEffect(() => {
    if (type === 'edit' || type === 'reSheduled') {
      getUserDetails()
    } else {
      if (type === 'Add') {
        setAppointMentForm({
          ...appointMentForm,
          lead_id: item?._id,
          first_name: item?.customer_first_name,
          property_id: item?.property_id,
          property_title: item?.property_title,
          pickup: 'Yes',
          update_type: ''
        })
      }
    }
  }, [type])
  useEffect(() => {
    if (editAppointmentData?.response?.status === 200) {
      if (type !== 'reSheduled') {
        navigation.navigate('AppointmentForSite')
      } else {
        navigation.navigate('Appointments')
      }
      dispatch(removeEditUser())
      ErrorMessage({
        msg: editAppointmentData?.response?.message,
        backgroundColor: GREEN_COLOR,
      })
      setAppointMentForm({
        module_id: "",
        lead_id: '',
        property_id: '',
        appointment_date: '',
        appointment_time: '',
        pickup: 'No',
        type: '',
        pickup_address: '',
        pickup_location: '',
        pickup_latitude: '',
        pickup_longitude: '',
        number_of_guest: '',
        property_title: '',
        first_name: '',
        update_type: ''
      })
    }
  }, [editAppointmentData])
  useEffect(() => {
    if (leadData?.response?.status === 200) {
      setLeadList(leadData?.response?.data)
    } else {
      setLeadList([])
    }
    if (propertyData?.response?.status === 200) {
      setPropertyList(propertyData?.response?.data)
    } else {
      setPropertyList([])
    }
  }, [leadData, propertyData])
  const getLeadList = () => {
    dispatch(getAllLeadsList({
      offset: 0,
      limit: 100,
    }))
  }
  const getPropertyList = () => {
    dispatch(getAllProperty({
      offset: 0,
      limit: 100,
    }))
  }
  const validation = () => {
    let isError = true;
    let errorMessage: any = ''
    if (type !== 'edit') {
      if (appointMentForm.update_type == undefined || appointMentForm.update_type == '') {
        isError = false;
        errorMessage = "Update Type is require. Please Select the Update Type"
      }
      else if (appointMentForm.appointment_date == undefined || appointMentForm.appointment_date == '') {
        isError = false;
        errorMessage = "Date is require. Please Select the Date"
      }
      else if (appointMentForm.appointment_time == undefined || appointMentForm.appointment_time == '') {
        isError = false;
        errorMessage = "Time is require. Please Select the Time"
      }
      if (appointMentForm.pickup === 'Yes') {
        if (appointMentForm.pickup_location == undefined || appointMentForm.pickup_location == '') {
          isError = false;
          errorMessage = "Location is require. Please Enter the Location"
        }
        else if (appointMentForm.number_of_guest == undefined || appointMentForm.number_of_guest == '') {
          isError = false;
          errorMessage = "Number of guest is require. Please Enter the Number of guest"
        }
      }
    }
    if (errorMessage !== '') {
      ErrorMessage({
        msg: errorMessage,
        backgroundColor: RED_COLOR
      })
    }
    return isError;
  }
  useEffect(() => {
    if (type === 'edit' && response?.status === 200) {
      setAppointMentForm({
        module_id: "",
        lead_id: response?.data[0]?.lead_id,
        first_name: response?.data[0]?.customer_first_name,
        property_id: response?.data[0]?.property_id,
        property_title: response?.data[0]?.property_title,
        appointment_date: response?.data[0]?.appointment_date,
        appointment_time: response?.data[0]?.appointment_time,
        pickup: response?.data[0]?.pickup,
        type: response?.data[0]?.type,
        pickup_address: response?.data[0]?.pickup_address,
        pickup_location: response?.data[0]?.pickup_location,
        pickup_latitude: response?.data[0]?.pickup_latitude,
        pickup_longitude: response?.data[0]?.pickup_longitude,
        number_of_guest: response?.data[0]?.number_of_guest,
      })
    } else if (type === 'reSheduled' && response?.status === 200) {
      setAppointMentForm({
        lead_id: response?.data[0]?.lead_id,
        first_name: response?.data[0]?.customer_first_name,
        property_id: response?.data[0]?.property_id,
        property_title: response?.data[0]?.property_title,
        pickup: response?.data[0]?.pickup,
        type: response?.data[0]?.type,
      })
    }
  }, [response])
  const getUserDetails = () => {
    dispatch(getAppointmentDetail({
      appointment_id: item?._id ? item?._id : ''
    }))
  }
  const handleBackPress = () => {
    navigation.goBack()
  }

  const onPressAddEdit = () => {
    const params = {
      module_id: "",
      lead_id: appointMentForm?.lead_id,
      property_id: appointMentForm?.property_id,
      appointment_date: appointMentForm?.appointment_date,
      appointment_time: appointMentForm?.appointment_time,
      pickup: appointMentForm?.pickup,
      pickup_address: appointMentForm?.pickup_address,
      pickup_location: appointMentForm?.pickup_location,
      pickup_latitude: appointMentForm?.pickup_latitude,
      pickup_longitude: appointMentForm?.pickup_longitude,
      number_of_guest: appointMentForm?.number_of_guest,
      type: 1,
      drop_off_location: appointMentForm?.pickup_address,
      update_type: appointMentForm?.update_type,
    }
    if (type === 'edit') {
      dispatch(editAppointment({ ...params, appointment_id: item?._id }))
    } else {
      if (validation()) {
        dispatch(addAppointment(params))
        console.log('params: ', params);
      }
    }
  }
  return (
    <AddAppointmentView
      type={type}
      setAppointMentForm={setAppointMentForm}
      appointMentForm={appointMentForm}
      handleBackPress={handleBackPress}
      getLeadList={getLeadList}
      getPropertyList={getPropertyList}
      leadList={leadList}
      propertyList={propertyList}
      onPressAddEdit={onPressAddEdit}
    />
  )
}

export default AddAppointmentScreen