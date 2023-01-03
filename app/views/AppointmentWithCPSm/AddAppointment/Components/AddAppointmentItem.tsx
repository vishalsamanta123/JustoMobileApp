import { View, Text, ScrollView } from "react-native";
import React from "react";
import styles from "./Styles";
import InputField from "../../../../components/InputField";
import DropdownInput from "../../../../components/DropDown";
import strings from "../../../../components/utilities/Localization";
import images from "../../../../assets/images";
import {
  GRAY_LIGHT_COLOR,
  DATE_FORMAT,
  TIME_FORMAT,
} from "../../../../components/utilities/constant";
import Button from "../../../../components/Button";
import InputCalender from "app/components/InputCalender";
import moment from "moment";

const AddAppointmentItem = (props: any) => {
  console.log("props.addAppointmentForm: ", props.addAppointmentForm);

  return (
    <ScrollView>
      <View style={styles.wrap}>
        <View style={styles.inputWrap}>
          <InputCalender
            mode={"date"}
            leftIcon={images.event}
            minimumDate={new Date()}
            placeholderText={strings.appointmentDate}
            headingText={strings.appointmentDate}
            editable={false}
            // onChangeText={() => { }}
            dateData={(data: any) => {
              props.setAddAppointmentForm({
                ...props.addAppointmentForm,
                appointment_date: moment(data).format(DATE_FORMAT),
              });
            }}
            setDateshow={(data: any) => {
              props.setAddAppointmentForm({
                ...props.addAppointmentForm,
                appointment_date: moment(data).format(DATE_FORMAT),
              });
            }}
            value={moment(props.addAppointmentForm?.appointment_date).format(
              "DD-MM-YYYY"
            )}
          />
        </View>
        <View style={styles.inputWrap}>
          <InputCalender
            mode={"time"}
            leftIcon={images.timer}
            placeholderText={strings.appointmentTime}
            headingText={strings.appointmentTime}
            editable={false}
            // onChangeText={() => { }}
            dateData={(data: any) => {
              props.setAddAppointmentForm({
                ...props.addAppointmentForm,
                appointment_time: moment(data).format(TIME_FORMAT),
              });
            }}
            setDateshow={(data: any) => {
              props.setAddAppointmentForm({
                ...props.addAppointmentForm,
                appointment_time: moment(data).format(TIME_FORMAT),
              });
            }}
            value={props.addAppointmentForm?.appointment_time}
          />
        </View>
        <View style={styles.inputWrap}>
          <DropdownInput
            headingText={strings.appointmentType}
            placeholder={strings.appointmentType}
            data={props.masterDatas}
            inputWidth={"100%"}
            onFocus={() => props.handleMasterDatas(9)}
            paddingLeft={16}
            maxHeight={300}
            labelField="title"
            valueField={"_id"}
            value={props.addAppointmentForm?.appointment_type}
            onChange={(item: any) => {
              console.log("item: ", item);
              props.setAddAppointmentForm({
                ...props.addAppointmentForm,
                appointment_type: item._id,
              });
            }}
            newRenderItem={(item: any) => {
              return (
                <View
                  style={{
                    padding: 17,
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Text
                    style={{
                      flex: 1,
                      fontSize: 16,
                      color: GRAY_LIGHT_COLOR,
                    }}
                  >
                    {item.title}
                  </Text>
                </View>
              );
            }}
          />
        </View>
        <View style={styles.inputWrap}>
          <DropdownInput
            headingText={strings.appointmentWith}
            placeholder={strings.appointmentWith}
            data={props.listData}
            inputWidth={"100%"}
            paddingLeft={16}
            maxHeight={300}
            onFocus={() => {}}
            labelField={props.role === "TL" ? "user_name" : "agency_name"}
            valueField={props.role === "TL" ? "_id" : "appointment_with"}
            value={
              props.role === "TL"
                ? props.listData._id
                : props.addAppointmentForm?.appointment_with
            }
            onChange={(item: any) => {
              props.setAddAppointmentForm({
                ...props.addAppointmentForm,
                appointment_with: [item._id],
              });
            }}
            newRenderItem={(item: any) => {
              console.log("item: ", item);
              return (
                <View
                  style={{
                    padding: 17,
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Text
                    style={{
                      flex: 1,
                      fontSize: 16,
                      color: GRAY_LIGHT_COLOR,
                    }}
                  >
                    {props.role === "TL" ? item.user_name : item.agency_name}
                  </Text>
                </View>
              );
            }}
          />
        </View>
        <View style={styles.btnView}>
          <Button
            btnTxtsize={16}
            handleBtnPress={() => props.handleBtnPress()}
            buttonText={
              props.type === strings.edit
                ? strings.editNewappointment
                : strings.addNewappointment
            }
          />
        </View>
      </View>
    </ScrollView>
  );
};

export default AddAppointmentItem;
