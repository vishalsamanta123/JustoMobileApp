import ErrorMessage from 'app/components/ErrorMessage';
import { RED_COLOR } from 'app/components/utilities/constant';
import { AgencyCreateForm, createAgency } from 'app/Redux/Actions/AgencyActions';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PicturePickerModal from '../../../components/Modals/PicturePicker';
import AgentBankInfo from './components/AgencyBankInfo';
import AgentBasicInfoView from './components/AgentBasicInfoView';
import CompanyDetails from './components/CompanyDetails';

const AgentBasicInfo = ({ navigation }: any) => {
  const dispatch: any = useDispatch()
  const [formType, setFormType] = useState(0)
  const { userData = {} } = useSelector((state: any) => state.userData)
  
  const [agencyData, setAgencyData] = useState({
    profile_picture: {},
    owner_name: '',
    adhar_no: '',
    pancard_no: '',
    gender: '',
    date_of_birth: '',
    primary_mobile: '',
    whatsapp_number: '',
    email: '',
    working_location: [],
  })
  console.log('agencyData: ', agencyData);
  const [imagePicker, setImagePicker] = useState(false)
  const [locationModel, setLocationModel] = useState(false)

  const registrationData = useSelector((state: any) => state.agencyForm)
  const {response={}} = useSelector((state: any) => state.agency)
  console.log('registrationData: ', registrationData);
  useEffect(() => {
    setAgencyData({ ...registrationData.response, sourcing_manager: userData?.data?._id })
  }, [registrationData])
  const validation = () => {
    let isError = true;
    let errorMessage: any = ''
    if (agencyData.owner_name == undefined || agencyData.owner_name == '') {
      isError = false;
      errorMessage = "Agent Name is require. Please enter Agent Name"
    }
    else if (agencyData.adhar_no == undefined || agencyData.adhar_no == '') {
      isError = false;
      errorMessage = "Adhar No. is require. Please enter Adhar No."
    }
    else if (agencyData.pancard_no == undefined || agencyData.pancard_no == '') {
      isError = false;
      errorMessage = "Pancard No. is require. Please enter Pancard No."
    }
    else if (agencyData.gender == undefined || agencyData.gender == '') {
      isError = false;
      errorMessage = "Gender is require. Please enter Gender"
    }
    else if (agencyData.date_of_birth == undefined || agencyData.date_of_birth == '') {
      isError = false;
      errorMessage = "Date of Birth is require. Please enter Date of Birth"
    }
    else if (agencyData.primary_mobile == undefined || agencyData.primary_mobile == '') {
      isError = false;
      errorMessage = "Mobile No. is require. Please enter Mobile No."
    }
    else if (agencyData.whatsapp_number == undefined || agencyData.whatsapp_number == '') {
      isError = false;
      errorMessage = "WhatsaApp No. is require. Please enter WhatsaApp No."
    }
    else if (agencyData.email == undefined || agencyData.email == '') {
      isError = false;
      errorMessage = "Email is require. Please enter Email"
    }
    else if (agencyData.working_location.length === 0 || agencyData.working_location === undefined) {
      isError = false;
      errorMessage = "Working Location is require. Please enter Working Location"
    }

    if (errorMessage !== '') {
      ErrorMessage({
        msg: errorMessage,
        backgroundColor: RED_COLOR
      })
    }
    // console.log('isError: ', isError);
    return isError;
  }



  const onPressNext = (type: any, data: any) => {
    console.log("onPressNext -> type", type)
    if (type > 2) {
      // navigation.navigate('OtpVerificationScreenView')
      
      const params = {
        ...agencyData,
        working_location: JSON.stringify(agencyData.working_location)
      }
      dispatch(AgencyCreateForm({...agencyData, ...data}))
      dispatch(createAgency(params))
      if(response?.status){
        navigation.navigate('AgencyListing')
      }
    } else {
      if (validation()) {
        dispatch(AgencyCreateForm({...agencyData, ...data}))
        setFormType(type)
      }
    }
    // navigation.navigate('AgencyListing')
  }
  const onPressBack = () => {
    navigation.goBack()
  }
  return (
    <>
      {formType === 0 ?
        <AgentBasicInfoView
          imagePicker={imagePicker}
          setImagePicker={setImagePicker}
          onPressBack={onPressBack}
          onPressNext={onPressNext}
          agencyData={agencyData}
          setAgencyData={setAgencyData}
          setLocationModel={setLocationModel}
          locationModel={locationModel}
        /> :
        <>
          {formType == 1 ?
            <AgentBankInfo
              onPressNext={onPressNext}
            /> :
            <CompanyDetails
              onPressNext={onPressNext} />
          }
        </>
      }
      <PicturePickerModal
        Visible={imagePicker}
        setVisible={setImagePicker}
        imageData={(data: any) => {
          setAgencyData({
            ...agencyData, profile_picture: data
          })
        }}
      />
    </>

  )
};

export default AgentBasicInfo;
