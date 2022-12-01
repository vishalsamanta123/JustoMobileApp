import {
  Image,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { RadioButton } from "react-native-paper";
import Header from "../../../../components/Header";
import strings from "../../../../components/utilities/Localization";
import styles from "./styles";
import {
  BLACK_COLOR,
  GRAY_COLOR,
  PRIMARY_THEME_COLOR,
} from "../../../../components/utilities/constant";
import InputField from "../../../../components/InputField";
import images from "../../../../assets/images";
import Button from "../../../../components/Button";
import InputCalender from "app/components/InputCalender";
import moment from "moment";
import MultiLocation from "app/components/MultiLocation";

const AgentBasicInfoView = (props: any) => {
  console.log("props: ", props?.agencyData?.date_of_birth);
  const handleDelete = (item: any, index: any) => {
    var array: any[] = [...props?.agencyData?.working_location];
    array?.splice(index, 1);
    props?.setAgencyData({
      ...props?.agencyData,
      working_location: array,
    });
  };
  return (
    <View style={styles.mainContainer}>
      <Header
        headerText={strings.basicInfoText}
        headerStyle={styles.headerStyle}
        headerTextStyle={styles.headerTextStyle}
        leftImageIconStyle={styles.leftImageIconStyle}
        leftImageSrc={images.backArrow}
        handleOnLeftIconPress={props.onPressBack}
        barStyle={"light-content"}
        statusBarColor={PRIMARY_THEME_COLOR}
      />
      <ScrollView
        keyboardShouldPersistTaps={"handled"}
        contentContainerStyle={styles.wrap}
      >
        <TouchableOpacity
          onPress={() => props.setImagePicker(true)}
          style={[styles.imageCircle, { backgroundColor: GRAY_COLOR }]}
        >
          {props.type == "edit" ? (
            props?.agencyData?.profile_picture === ""
          ) : props?.agencyData?.profile_picture?.uri === "" ? (
            <Image
              style={styles.DummyloginBanner}
              source={images.user}
              resizeMode="contain"
            />
          ) : (
            <View style={styles.imageCircle}>
              <Image
                style={styles.loginBanner}
                source={{
                  uri: props.agencyData?.profile_picture?.uri
                    ? props.agencyData?.profile_picture?.uri
                    : props.agencyData?.profile_picture,
                }}
                resizeMode="contain"
              />
            </View>
          )}
          <View style={styles.editView}>
            <Image
              style={styles.editImage}
              source={images.edit}
              resizeMode="contain"
            />
          </View>
        </TouchableOpacity>
        <View style={styles.inputWrap}>
          <InputField
            placeholderText={"Name"}
            handleInputBtnPress={() => {}}
            headingText={"Agent Name"}
            valueshow={props.agencyData?.owner_name}
            onChangeText={(val: any) => {
              props.setAgencyData({
                ...props.agencyData,
                owner_name: val,
              });
            }}
          />
        </View>
        <View style={styles.inputWrap}>
          <InputField
            placeholderText={"Adhar No."}
            handleInputBtnPress={() => {}}
            headingText={"Adhar No."}
            valueshow={props.agencyData?.adhar_no}
            onChangeText={(val: any) => {
              props.setAgencyData({
                ...props.agencyData,
                adhar_no: val,
              });
            }}
          />
        </View>
        <View style={styles.inputWrap}>
          <InputField
            placeholderText={"Pancard No."}
            handleInputBtnPress={() => {}}
            headingText={"Pancard No."}
            valueshow={props.agencyData?.pancard_no}
            onChangeText={(val: any) => {
              props.setAgencyData({
                ...props.agencyData,
                pancard_no: val,
              });
            }}
          />
        </View>
        <View style={styles.genderView}>
          <Text style={styles.genderTxt}>{strings.gender}</Text>
          <View style={styles.radioView}>
            <RadioButton
              value={props.agencyData?.gender}
              status={props.agencyData.gender === 1 ? "checked" : "unchecked"}
              onPress={() => {
                props.setAgencyData({
                  ...props.agencyData,
                  gender: 1,
                });
              }}
              color={PRIMARY_THEME_COLOR}
            />
            <Text
              style={[
                styles.radioTxt,
                {
                  color:
                    props.agencyData.gender === 1
                      ? PRIMARY_THEME_COLOR
                      : BLACK_COLOR,
                },
              ]}
            >
              {strings.male}
            </Text>
          </View>
          <View style={styles.radioView}>
            <RadioButton
              value={props.agencyData?.gender}
              status={props.agencyData.gender === 2 ? "checked" : "unchecked"}
              onPress={() => {
                props.setAgencyData({
                  ...props.agencyData,
                  gender: 2,
                });
              }}
              color={PRIMARY_THEME_COLOR}
            />
            <Text
              style={[
                styles.radioTxt,
                {
                  color:
                    props.agencyData.gender === 2
                      ? PRIMARY_THEME_COLOR
                      : BLACK_COLOR,
                },
              ]}
            >
              {strings.female}
            </Text>
          </View>
        </View>
        <View style={styles.inputWrap}>
          <InputCalender
            leftIcon={images.event}
            mode={"date"}
            placeholderText={"Date of Birth"}
            headingText={"Date of Birth"}
            editable={false}
            dateData={(data: any) => {
              props.setAgencyData({
                ...props.agencyData,
                date_of_birth: moment(data).format("YYYY-MM-DD"),
              });
            }}
            setDateshow={(data: any) => {
              props.setAgencyData({
                ...props.agencyData,
                date_of_birth: moment(data).format("YYYY-MM-DD"),
              });
            }}
            value={
              props?.agencyData?.date_of_birth !== ""
                ? moment(props?.agencyData?.date_of_birth).format("DD-MM-YYYY")
                : null
            }
          />
        </View>
        <View style={styles.inputWrap}>
          <InputField
            placeholderText={"Mobile No."}
            handleInputBtnPress={() => {}}
            headingText={"Mobile No."}
            valueshow={props.agencyData?.primary_mobile?.toString()}
            onChangeText={(val: any) => {
              props.setAgencyData({
                ...props.agencyData,
                primary_mobile: val,
              });
            }}
          />
        </View>
        <View style={styles.inputWrap}>
          <InputField
            placeholderText={"WhatsApp No."}
            handleInputBtnPress={() => {}}
            headingText={"WhatsApp No."}
            valueshow={props.agencyData?.whatsapp_number?.toString()}
            onChangeText={(val: any) => {
              props.setAgencyData({
                ...props.agencyData,
                whatsapp_number: val,
              });
            }}
          />
        </View>
        <View style={styles.inputWrap}>
          <InputField
            placeholderText={"Email Address"}
            handleInputBtnPress={() => {}}
            headingText={"Email Address"}
            valueshow={props.agencyData?.email}
            onChangeText={(val: any) => {
              props.setAgencyData({
                ...props.agencyData,
                email: val,
              });
            }}
          />
        </View>
        {/*  <View style={styles.inputWrap}>
          <InputField
            placeholderText={"Sourcing Manager"}
            handleInputBtnPress={() => {}}
            onChangeText={() => {}}
            headingText={"Sourcing Manager"}
          />
        </View> */}
        <View style={styles.workingView}>
          <View
            style={{
              top: props.agencyData?.working_location?.length > 0 ? 5 : 0,
            }}
          >
            <Text style={styles.workTxt}>Working Location</Text>
          </View>
          <TouchableOpacity
            onPress={() => props.setLocationModel(true)}
            style={styles.addBtn}
          >
            <Text style={styles.addTxt}>+ Add location</Text>
          </TouchableOpacity>
        </View>
        {props.agencyData?.working_location?.length > 0 ? (
          <View style={styles.inputBoxVw}>
            {props.agencyData?.working_location?.map(
              (item: any, index: any) => {
                return (
                  <View
                    style={[
                      styles.inputBoxItmVw,
                      {
                        borderBottomWidth:
                          props?.agencyData?.working_location?.length - 1 ===
                          index
                            ? 0
                            : 0.6,
                      },
                    ]}
                  >
                    <Text style={styles.inputBoxItmTxt}>{item.location}</Text>
                    <TouchableOpacity onPress={() => handleDelete(item, index)}>
                      <Image source={images.close} style={styles.crossVw} />
                    </TouchableOpacity>
                  </View>
                );
              }
            )}
          </View>
        ) : null}

        <View style={styles.buttonContainer}>
          <Button
            handleBtnPress={(type: any) => props.onPressNext(1)}
            rightImage={images.forwardArrow}
            buttonText={strings.next}
            textTransform={"uppercase"}
          />
        </View>
        <MultiLocation
          Visible={props.locationModel}
          setVisible={() => props.setLocationModel(false)}
          value={
            props?.agencyData?.working_location
              ? props?.agencyData?.working_location
              : []
          }
          handleAddTarget={(data: any) => {
            if (data?.length > 0) {
              props.setAgencyData({
                ...props.agencyData,
                working_location: data,
              });
            }
          }}
        />
      </ScrollView>
    </View>
  );
};

export default AgentBasicInfoView;
