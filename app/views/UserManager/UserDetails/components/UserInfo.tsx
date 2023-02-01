import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import styles from "./styles";
import {
  BLACK_COLOR,
  GRAY_COLOR,
  GRAY_LIGHT_COLOR,
} from "../../../../components/utilities/constant";
import { ScrollView } from "react-native-gesture-handler";
import images from "../../../../assets/images";
import strings from "../../../../components/utilities/Localization";

const UserInfoView = (props: any) => {
  const item = props?.items || {};
  return (
    <ScrollView>
      <View style={styles.Txtview}>
        <View style={styles.projectContainer}>
          <Text style={styles.projectTxt}>Agent Name</Text>
        </View>
        <View>
          <Text>:</Text>
        </View>
        <View style={styles.nameContainer}>
          <Text style={styles.nameTxt}>
            {item.user_name === "" ||
            item.user_name === undefined ||
            item.user_name === null
              ? ""
              : item.user_name}
          </Text>
        </View>
      </View>
      <View style={styles.Txtview}>
        <View style={styles.projectContainer}>
          <Text style={styles.projectTxt}>Aadhaar no.</Text>
        </View>
        <View>
          <Text>:</Text>
        </View>
        <View style={styles.nameContainer}>
          <Text style={styles.nameTxt}>
            {item.user_name === "" ||
            item.user_name === undefined ||
            item.user_name === null
              ? ""
              : item.adhar_no}
          </Text>
        </View>
      </View>
      <View style={styles.Txtview}>
        <View style={styles.projectContainer}>
          <Text style={styles.projectTxt}>Pancard no.</Text>
        </View>
        <View>
          <Text>:</Text>
        </View>
        <View style={styles.nameContainer}>
          <Text style={styles.nameTxt}>
            {item.user_name === "" ||
            item.user_name === undefined ||
            item.user_name === null
              ? ""
              : item.pancard_no}
          </Text>
        </View>
      </View>
      <View style={styles.Txtview}>
        <View style={styles.projectContainer}>
          <Text style={styles.projectTxt}>Location</Text>
        </View>
        <View>
          <Text>:</Text>
        </View>
        <View style={styles.nameContainer}>
          <Text style={styles.nameTxt}>
            {item.address === "" ||
            item.address === undefined ||
            item.address === null
              ? ""
              : item.address}
          </Text>
        </View>
      </View>
      <View style={styles.Txtview}>
        <View style={styles.projectContainer}>
          <Text style={styles.projectTxt}>Email</Text>
        </View>
        <View>
          <Text>:</Text>
        </View>
        <View style={styles.nameContainer}>
          <Text style={styles.nameTxt}>
            {item.email === "" ||
            item.email === undefined ||
            item.email === null
              ? ""
              : item.email}
          </Text>
        </View>
      </View>
      <View style={styles.Txtview}>
        <View style={styles.projectContainer}>
          <Text style={styles.projectTxt}>Mobile no</Text>
        </View>
        <View>
          <Text>:</Text>
        </View>
        <View style={styles.nameContainer}>
          <Text style={styles.nameTxt}>
            {item.mobile === "" ||
            item.mobile === undefined ||
            item.mobile === null
              ? ""
              : item.mobile}
          </Text>
        </View>
      </View>
      <View style={styles.Txtview}>
        <View style={styles.projectContainer}>
          <Text style={styles.projectTxt}>Whatsapp no.</Text>
        </View>
        <View>
          <Text>:</Text>
        </View>
        <View style={styles.nameContainer}>
          <Text style={styles.nameTxt}>
            {item.whatsapp_no === "" ||
            item.whatsapp_no === undefined ||
            item.whatsapp_no === null
              ? ""
              : item.whatsapp_no}
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};
export default UserInfoView;
