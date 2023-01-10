import { View, Text, StatusBar } from "react-native";
import React, { useEffect, useState } from "react";
import styles from "./Styles";
import { PRIMARY_THEME_COLOR } from "../../../../components/utilities/constant";
import Header from "../../../../components/Header";
import images from "../../../../assets/images";
import strings from "../../../../components/utilities/Localization";
import AddAppointmentItem from "./AddAppointmentItem";
import { useNavigation } from "@react-navigation/native";

const AddAppointmentView = (props: any) => {
  const navigation: any = useNavigation();
  const [value, setValue] = useState(null);
  const [addAppointmentForm, setAddAppointmentForm] = useState({
    appointment_with: props?.data?.appointment_with,
    appointment_date: props?.data?.appointment_date,
    appointment_time: props?.data?.appointment_time,
    appointment_type: props?.data?.appointment_type,
  });
  const validation = () => {
    if (
      typeof addAppointmentForm.appointment_with !== 'undefined' ||
      typeof addAppointmentForm.appointment_date !== 'undefined' ||
      typeof addAppointmentForm.appointment_time !== 'undefined' ||
      typeof addAppointmentForm.appointment_type !== 'undefined'
    ) {
      return true;
    } else {
      return false;
    }
  };
  const handleBtnPress = () => {
    if (validation()) {

      props.handleAddAppointment(addAppointmentForm);
    }
  };
  return (
    <View style={styles.mainContainer}>
      <Header
        leftImageSrc={images.backArrow}
        rightSecondImageScr={images.notification}
        headerText={
          props.type === strings.edit
            ? strings.editNewappointment
            : strings.addNewappointment
        }
        leftImageIconStyle={styles.RightFirstIconStyle}
        handleOnLeftIconPress={() => props.handleBackPress()}
        headerStyle={styles.headerStyle}
        barStyle={"light-content"}
        statusBarColor={PRIMARY_THEME_COLOR}
      />
      <View style={styles.AddAppointmentView}>
        <AddAppointmentItem
          setValue={setValue}
          value={value}
          handleBtnPress={handleBtnPress}
          setAddAppointmentForm={setAddAppointmentForm}
          addAppointmentForm={addAppointmentForm}
          getVisitorsList={props.getVisitorsList}
          visitorList={props.visitorList}
          type={props.type}
          handleMasterDatas={props.handleMasterDatas}
          masterDatas={props.masterDatas}
          listData={props.listData}
          role={props.role}
        />
      </View>
    </View>
  );
};

export default AddAppointmentView;
