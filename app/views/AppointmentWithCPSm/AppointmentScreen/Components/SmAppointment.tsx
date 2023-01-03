import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import styles from "./Styles";
import images from "../../../../assets/images";
import strings from "../../../../components/utilities/Localization";
import Button from "../../../../components/Button";
import {
  PURPLE_COLOR,
  CALL_COLOR,
  RED_COLOR,
  GREEN_COLOR,
} from "../../../../components/utilities/constant";
import moment from "moment";

const SmAppointment = (props: any) => {
  return (
    <View style={styles.IteamView}>
      <View style={styles.Txtview}>
        <View style={styles.projectContainer}>
          <Text style={styles.projectTxt}>Date :</Text>
        </View>
        <View style={styles.nameContainer}>
          <Text style={styles.nameTxt}>
            {moment(props.items.appointment_date).format("DD-MM-YYYY")}
          </Text>
        </View>
      </View>
      <View style={styles.Txtview}>
        <View style={styles.projectContainer}>
          <Text style={styles.projectTxt}>Appointment Type :</Text>
        </View>
        <View style={styles.nameContainer}>
          <Text style={styles.nameTxt}>
            {props.items.appointment_type_title}
          </Text>
        </View>
      </View>
      <View style={styles.Txtview}>
        <View style={styles.projectContainer}>
          <Text style={styles.projectTxt}>Time :</Text>
        </View>
        <View style={styles.nameContainer}>
          <Text style={styles.nameTxt}>{props.items.appointment_time}</Text>
        </View>
      </View>
      <View style={styles.Txtview}>
        <View style={styles.projectContainer}>
          <Text style={styles.projectTxt}>Appointment With :</Text>
        </View>
        <View style={styles.nameContainer}>
          <Text style={styles.nameTxt}>{props.items.sender_name}</Text>
        </View>
      </View>
      <View style={styles.Txtview}>
        <View style={styles.projectContainer}>
          <Text style={styles.projectTxt}>Status :</Text>
        </View>
        <View style={styles.nameContainer}>
          <Text style={styles.nameTxt}>
            {props.items.appointment_status == 1
              ? "Pending"
              : props.items.appointment_status == 2
              ? "Confirm"
              : props.items.appointment_status == 3
              ? "Complete"
              : "Appointment cancel"}
          </Text>
        </View>
      </View>
      <View
        style={[
          styles.buttonContainer,
          {
            justifyContent:
              props.items.appointment_status === 3 || props.items.appointment_status ===4
                ? "flex-end"
                : "space-between",
          },
        ]}
      >
        {props.items.appointment_status === 1 ? (
          <Button
            width={80}
            height={30}
            bgcolor={null}
            bordercolor={RED_COLOR}
            borderWidth={1}
            btnTxtcolor={RED_COLOR}
            buttonText={strings.decline}
            btnTxtsize={14}
            border={10}
            handleBtnPress={() => props.handleOptionPress(props.items._id, 4)}
          />
        ) : props.items.appointment_status === 2 ? (
          <Button
            width={80}
            height={30}
            bgcolor={null}
            bordercolor={PURPLE_COLOR}
            borderWidth={1}
            btnTxtcolor={PURPLE_COLOR}
            buttonText={strings.cancel}
            btnTxtsize={14}
            border={10}
            handleBtnPress={() => props.handleOptionPress(props.items._id, 4)}
          />
        ) : null}
        {props.items.appointment_status === 1 ? (
          <Button
            width={80}
            height={30}
            bgcolor={null}
            bordercolor={PURPLE_COLOR}
            borderWidth={1}
            btnTxtcolor={PURPLE_COLOR}
            buttonText={strings.confirm}
            btnTxtsize={14}
            border={10}
            handleBtnPress={() => props.handleOptionPress(props.items._id, 2)}
          />
        ) : props.items.appointment_status === 2 ? (
          <Button
            width={80}
            height={30}
            bgcolor={null}
            bordercolor={PURPLE_COLOR}
            borderWidth={1}
            btnTxtcolor={PURPLE_COLOR}
            buttonText={strings.cancel}
            btnTxtsize={14}
            border={10}
            handleBtnPress={() => props.handleOptionPress(props.items._id, 4)}
          />
        ) : null}
        <TouchableOpacity
          style={styles.Viewbutton}
          onPress={() => props.onPressView(props.items)}
        >
          <Image source={images.forwardArrow} style={styles.arrow} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SmAppointment;
