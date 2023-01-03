import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import styles from "./Styles";
import strings from "../../../../components/utilities/Localization";
import images from "../../../../assets/images";
import Button from "../../../../components/Button";
import {
  CALL_COLOR,
  GREEN_COLOR,
  PURPLE_COLOR,
} from "../../../../components/utilities/constant";
import moment from "moment";

const MyAppointment = (props: any) => {
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
          <Text style={styles.nameTxt}>{props.items.receiver_name}</Text>
        </View>
      </View>
      {/*  <View style={styles.Txtview}>
        <View style={styles.projectContainer}>
          <Text style={styles.projectTxt}>SM Name :</Text>
        </View>
        <View style={styles.nameContainer}>
          <Text style={styles.nameTxt}>{props.items.smName}</Text>
        </View>
      </View> */}
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

      <View style={styles.buttonContainer}>
        <View
          style={[
            styles.buttonContainer,
            {
              justifyContent:
                props.items.appointment_status == 3 || 4
                  ? "flex-end"
                  : "space-between",
            },
          ]}
        >
          {props.items.appointment_status === 1 ? (
            <>
              <Button
                width={80}
                height={30}
                bgcolor={null}
                bordercolor={PURPLE_COLOR}
                borderWidth={1}
                btnTxtcolor={PURPLE_COLOR}
                buttonText={strings.edit}
                btnTxtsize={14}
                border={10}
                handleBtnPress={() => props.onPressEdit()}
              />
              <Button
                width={80}
                height={30}
                bgcolor={null}
                bordercolor={CALL_COLOR}
                borderWidth={1}
                btnTxtcolor={CALL_COLOR}
                buttonText={strings.cancel}
                btnTxtsize={14}
                border={10}
                handleBtnPress={() =>
                  props.handleOptionPress(props.items._id, 4)
                }
              />
            </>
          ) : props.items.appointment_status === 2 ? (
            <>
              <Button
                width={80}
                height={30}
                bgcolor={null}
                bordercolor={PURPLE_COLOR}
                borderWidth={1}
                btnTxtcolor={PURPLE_COLOR}
                buttonText={strings.edit}
                btnTxtsize={14}
                border={10}
                handleBtnPress={() => props.onPressEdit()}
              />
              <Button
                width={80}
                height={30}
                bgcolor={null}
                bordercolor={CALL_COLOR}
                borderWidth={1}
                btnTxtcolor={CALL_COLOR}
                buttonText={strings.cancel}
                btnTxtsize={14}
                border={10}
                handleBtnPress={() =>
                  props.handleOptionPress(props.items._id, 4)
                }
              />
              <Button
                width={80}
                height={30}
                bgcolor={null}
                bordercolor={GREEN_COLOR}
                borderWidth={1}
                btnTxtcolor={GREEN_COLOR}
                buttonText={strings.done}
                btnTxtsize={14}
                border={10}
                handleBtnPress={() =>
                  props.handleOptionPress(props.items._id, 3)
                }
              />
            </>
          ) : null}
        </View>
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

export default MyAppointment;
