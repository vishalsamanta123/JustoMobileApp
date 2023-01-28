import { View, Text, TouchableOpacity, Image, Linking } from "react-native";
import React from "react";
import styles from "./styles";
import strings from "../../../../components/utilities/Localization";
import {
  BLACK_COLOR,
  CALL_COLOR,
  GREEN_COLOR,
  WHITE_COLOR,
  YELLOW_COLOR,
} from "../../../../components/utilities/constant";
import images from "../../../../assets/images";
import moment from "moment";
import Button from "app/components/Button";

const PickupRequestsList = (props: any) => {
  const item = props?.items || {};
  return (
    <View style={styles.IteamView}>
      <View style={styles.Txtview}>
        <View style={styles.projectContainer}>
          <Text style={styles.projectTxt}>Date Time :</Text>
        </View>
        <View style={styles.nameContainer}>
          <Text style={styles.nameTxt}>
            {moment(item?.appointment_date).format("DD-MM-YYYY") +
              " " +
              item?.appointment_time}
          </Text>
        </View>
      </View>
      <View style={styles.Txtview}>
        <View style={styles.projectContainer}>
          <Text style={styles.projectTxt}>Visitors Name :</Text>
        </View>
        <View style={styles.nameContainer}>
          <Text style={styles.nameTxt}>{item?.customer_name}</Text>
        </View>
      </View>
      {/* <View style={styles.Txtview} >
        <View style={styles.projectContainer}>
          <Text style={styles.projectTxt}>Mobile :</Text>
        </View>
        <View style={styles.nameContainer}>
          <Text style={styles.nameTxt}>{item?.mobile}</Text>
        </View>
      </View> */}
      <View style={styles.Txtview}>
        <View style={styles.projectContainer}>
          <Text style={styles.projectTxt}>Pickup Location :</Text>
        </View>
        <View style={styles.nameContainer}>
          <Text style={styles.nameTxt}>{item?.pickup_location}</Text>
        </View>
      </View>
      <View style={styles.Txtview}>
        <View style={styles.projectContainer}>
          <Text style={styles.projectTxt}>Drop-up Location :</Text>
        </View>
        <View style={styles.nameContainer}>
          <Text style={styles.nameTxt}>{item?.drop_off_location}</Text>
        </View>
      </View>
      <View style={styles.Txtview}>
        <View style={styles.projectContainer}>
          <Text style={styles.projectTxt}>Number of Guest :</Text>
        </View>
        <View style={styles.nameContainer}>
          <Text style={styles.nameTxt}>{item?.number_of_guest}</Text>
        </View>
      </View>
      <View style={styles.Txtview}>
        <View style={styles.projectContainer}>
          <Text style={styles.projectTxt}>Visiting Score :</Text>
        </View>
        <View style={styles.nameContainer}>
          <Text style={styles.nameTxt}>{item?.lead_score}</Text>
        </View>
      </View>
      <View style={[styles.Txtview, { borderBottomWidth: 0 }]}>
        <View style={styles.projectContainer}>
          <Text style={styles.projectTxt}>Status :</Text>
        </View>
        <View style={styles.nameContainer}>
          {/* <Text style={styles.nameTxt}>{item?.status}</Text> */}
          <Text style={styles.nameTxt}>
            {item?.status == 1
              ? "Pending"
              : item?.status == 2
              ? "Confirm"
              : item?.status == 3
              ? "Complete"
              : "Appointment cancel"}
          </Text>
        </View>
      </View>
      <View style={styles.buttonContainer}>
        {props.items.status === 1 || props.items.status === 2 ? (
          <Button
            width={80}
            height={30}
            bgcolor={WHITE_COLOR}
            bordercolor={CALL_COLOR}
            borderWidth={1}
            btnTxtcolor={CALL_COLOR}
            buttonText={strings.call}
            btnTxtsize={14}
            border={10}
            handleBtnPress={() => {
              Linking.openURL(`tel:${props.items?.mobile}`);
            }}
          />
        ) : (
          <View></View>
        )}
        {props.items.status === 1 || props.items.status === 2 ? (
          <Button
            width={120}
            height={30}
            bgcolor={WHITE_COLOR}
            bordercolor={GREEN_COLOR}
            borderWidth={1}
            btnTxtcolor={GREEN_COLOR}
            buttonText={strings.updatestatus}
            btnTxtsize={14}
            border={10}
            handleBtnPress={() => {
              props.setIsVisible(true)
            }}
          />
        ) : (
          <View></View>
        )}
      </View>
    </View>
  );
};

export default PickupRequestsList;
