// import { View, Text } from 'react-native'
// import React from 'react'
// import EditProfileView from './components/EditProfileView'

// const EditProfileScreen = ({navigation,route}: any) => {
//   const onPressBack = () => {
//     navigation.goBack()
//   }
//   return (
//     <EditProfileView onPressBack={onPressBack}/>
//   )
// }

// export default EditProfileScreen

import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import EditProfileView from "./components/EditProfileView";
import { updateUserSettingData } from "app/Redux/Actions/SettingActions";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import ErrorMessage from "app/components/ErrorMessage";
import { GREEN_COLOR } from "app/components/utilities/constant";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { addAgentForm, getAgentDetail } from "app/Redux/Actions/AgentActions";
import { GET_AGENT_DETAIL } from "app/Redux/types";
import { useFocusEffect } from "@react-navigation/native";

const EditProfileScreen = ({ navigation, route }: any) => {
  const allDetails = route?.params;
  const dispatch: any = useDispatch();

  const { response = {}, update = "" } = useSelector(
    (state: any) => state.settingData
    );
  const agentdetail  = useSelector(
    (state: any) => state.addAgentForm
    );

  // useEffect(() => {
  //   getDetail()
  // }, [allDetails])

  useFocusEffect(
    React.useCallback(() => {
      // getAgentList(offSET, [])
      getDetail();
      return () => { };
    }, [navigation, allDetails])
  );

  const getDetail = async () => {
    const userData: any = await AsyncStorage.getItem("loginData");
    if (JSON.parse(userData).data._id) {
      dispatch(
        getAgentDetail({
          user_id: JSON.parse(userData).data?._id,
        })
      );
    }
  };

  const [editData, setEditData] = useState(allDetails?.allDetails);
  
  // const handleNextPress = () => {
  //   dispatch(addAgentForm(editData))
  // }

  const handleResponse=()=>{
    if (update) {
      ErrorMessage({
        msg: response.message,
        backgroundColor: GREEN_COLOR
      })
      navigation.goBack(null)
    }
  }
  
  const handleNextPress = async () => {
    const formData: any = new FormData();
    formData.append("user_id", editData?._id);
    // formData.append("agent_name", editData?.agent_name);
    formData.append("adhar_no", editData?.adhar_no);
    formData.append("lastname", editData?.lastname);
    formData.append("firstname", editData?.firstname);
    formData.append("pancard_no", editData?.pancard_no);
    formData.append("gender", editData?.gender);
    formData.append("dateofbirth", moment(editData?.dateofbirth).format());
    formData.append("mobile", editData?.mobile);
    formData.append("whatsapp_no", editData?.whatsapp_no);
    formData.append("email", editData?.email);
    formData.append("city_id", editData?.city_id);
    formData.append("city", editData?.city);
    
    // formData.append("location", editData?.location);
    // formData.append("latitude", editData?.latitude);
    // formData.append("longitude", editData?.longitude);
    // formData.append("address", editData?.agencies?.address);
    // formData.append("pin_code", editData?.agencies?.pin_code);
    // formData.append("gst", editData?.agencies?.gst);
    // formData.append("working_location", editData?.working_location);
    // formData.append("rera_certificate_no", editData?.rera_certificate_no);
    // formData.append("rera_registration", editData?.agencies?.rera_registration);
    // formData.append("owner_name", editData?.owner_name);
    // editData?.rera_certificate?.uri &&
    // formData.append("rera_certificate", editData?.rera_certificate);
    // editData?.propidership_declaration_letter?.uri &&
    // formData.append("propidership_declaration_letter", editData?.propidership_declaration_letter);
    editData?.profile_picture?.uri &&
    formData.append("profile_picture", editData?.profile_picture);
    dispatch(addAgentForm(editData))
    dispatch(updateUserSettingData(formData));
    await AsyncStorage.setItem('userData', JSON.stringify(formData))
    handleResponse()
  };

  const onPressBack = () => {
    navigation.goBack();
  };
  return (
    <EditProfileView
      onPressBack={onPressBack}
      allDetails={allDetails}
      setEditData={setEditData}
      editData={editData}
      handleNextPress={handleNextPress}
      // handleUpdatePress={handleUpdatePress}
    />
  );
};

export default EditProfileScreen;
