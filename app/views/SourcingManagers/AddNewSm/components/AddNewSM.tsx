import React, { useState } from "react";
import { View, Text, ScrollView, TouchableOpacity, Image } from "react-native";
import images from "../../../../assets/images";
import Header from "../../../../components/Header";
import InputField from "../../../../components/InputField";
import styles from "./styles";
import { RadioButton } from "react-native-paper";
import {
  BLACK_COLOR,
  DATE_FORMAT,
  GRAY_COLOR,
  PRIMARY_THEME_COLOR,
  WHITE_COLOR,
} from "../../../../components/utilities/constant";
import Button from "../../../../components/Button";
import strings from "../../../../components/utilities/Localization";
import PicturePickerModal from "../../../../components/Modals/PicturePicker";
import moment from "moment";
import InputCalender from "app/components/InputCalender";
import DropdownInput from "app/components/DropDown";

const AddNewSMView = (props: any) => {
  const [gender, setGender] = useState("Male");
  const [checked, setChecked] = React.useState("first");
  const [profile, setProfile] = React.useState(false);

  return (
    <View style={styles.mainContainer}>
      <Header
        headerText={props?.type === "edit" ? strings.editSM : strings.addNewSM}
        headerStyle={styles.headerStyle}
        headerTextStyle={styles.headerTextStyle}
        leftImageSrc={images.backArrow}
        rightSecondImageScr={images.notification}
        RightSecondIconStyle={{ tintColor: WHITE_COLOR }}
        leftImageIconStyle={{ tintColor: WHITE_COLOR }}
        handleOnLeftIconPress={props.onPressBack}
        barStyle={"light-content"}
        statusBarColor={PRIMARY_THEME_COLOR}
      />
      <ScrollView contentContainerStyle={styles.wrap}>
        <TouchableOpacity
          onPress={() => setProfile(true)}
          style={[styles.imageCircle]}
        >
          {!props.addNewSmData?.profile_picture ? (
            <Image
              style={styles.DummyloginBanner}
              source={images.user}
              resizeMode="cover"
            />
          ) : (
            <Image
              style={styles.loginBanner}
              source={{
                uri: props.addNewSmData?.profile_picture?.uri
                  ? props.addNewSmData?.profile_picture?.uri
                  : props.addNewSmData?.profile_picture,
              }}
              resizeMode="cover"
            />
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
          <DropdownInput
            headingText={"Select Role"}
            placeholder={"Select Role"}
            data={props?.roleData}
            inputWidth={"100%"}
            paddingLeft={16}
            maxHeight={300}
            onFocus={() => props.handlegetRoleList()}
            labelField="role_title"
            valueField={"_id"}
            value={props.addNewSmData?.role_id}
            onChange={(item: any) => {
              props.setAddNewSmData({
                ...props.addNewSmData,
                role_id: item._id,
              });
            }}
            newRenderItem={(item: any) => {
              return (
                <>
                  {props.isloading !== false && (
                    <View style={styles.item}>
                      <Text style={styles.textItem}>{item.role_title}</Text>
                    </View>
                  )}
                </>
              );
            }}
          />
        </View>
        <View style={styles.inputWrap}>
          <InputField
            placeholderText={"First Name"}
            handleInputBtnPress={() => { }}
            headingText={"SM First Name"}
            valueshow={props.addNewSmData?.firstname}
            onChangeText={(val: any) => {
              props.setAddNewSmData({
                ...props.addNewSmData,
                firstname: val,
              });
            }}
          />
        </View>
        <View style={styles.inputWrap}>
          <InputField
            placeholderText={"Last Name"}
            handleInputBtnPress={() => { }}
            headingText={"SM Last Name"}
            valueshow={props.addNewSmData?.lastname}
            onChangeText={(val: any) => {
              props.setAddNewSmData({
                ...props.addNewSmData,
                lastname: val,
              });
            }}
          />
        </View>
        <View style={styles.inputWrap}>
          <InputField
            placeholderText={"Adhar No."}
            handleInputBtnPress={() => { }}
            headingText={"Adhar No."}
            keyboardtype={'number-pad'}
            valueshow={props.addNewSmData?.adhar_no}
            onChangeText={(val: any) => {
              props.setAddNewSmData({
                ...props.addNewSmData,
                adhar_no: val,
              });
            }}
          />
        </View>
        <View style={styles.inputWrap}>
          <InputField
            placeholderText={"Pancard No."}
            handleInputBtnPress={() => { }}
            headingText={"Pancard No."}
            valueshow={props.addNewSmData?.pancard_no}
            onChangeText={(val: any) => {
              props.setAddNewSmData({
                ...props.addNewSmData,
                pancard_no: val,
              });
            }}
          />
        </View>
        <View style={styles.genderView}>
          <Text style={styles.genderTxt}>{strings.gender}</Text>
          <View style={styles.radioView}>
            <RadioButton.Android
              value="Male"
              status={
                props.addNewSmData?.gender === 1 ? "checked" : "unchecked"
              }
              onPress={() => {
                props.setAddNewSmData({
                  ...props.addNewSmData,
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
                    props.addNewSmData?.gender === 1
                      ? PRIMARY_THEME_COLOR
                      : BLACK_COLOR,
                },
              ]}
            >
              {strings.male}
            </Text>
          </View>
          <View style={styles.radioView}>
            <RadioButton.Android
              value="Female"
              status={
                props.addNewSmData?.gender === 2 ? "checked" : "unchecked"
              }
              onPress={() => {
                props.setAddNewSmData({
                  ...props.addNewSmData,
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
                    props.addNewSmData?.gender === 2
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
            placeholderText={"Date of Birth"} //can edit
            headingText={"Date of Birth"}
            editable={false}
            dateData={(data: any) => {
              props.setAddNewSmData({
                ...props.addNewSmData,
                dateofbirth: moment(data).format(DATE_FORMAT),
              });
            }}
            setDateshow={(data: any) => {
              props.setAddNewSmData({
                ...props.addNewSmData,
                dateofbirth: moment(data).format(DATE_FORMAT),
              });
            }}
            value={moment(props?.addNewSmData?.dateofbirth).format(
              DATE_FORMAT
            )}
          />
        </View>
        <View style={styles.inputWrap}>
          <InputField
            placeholderText={"Mobile No."}
            handleInputBtnPress={() => { }}
            headingText={"Mobile No."}
            maxLength={10}
            keyboardtype={"number-pad"}
            valueshow={props.addNewSmData?.mobile}
            onChangeText={(val: any) => {
              props.setAddNewSmData({
                ...props.addNewSmData,
                mobile: val,
              });
            }}
          />
        </View>
        <View style={styles.inputWrap}>
          <InputField
            placeholderText={"WhatsApp No."}
            handleInputBtnPress={() => { }}
            headingText={"WhatsApp No."}
            keyboardtype={'number-pad'}
            valueshow={props.addNewSmData?.whatsapp_no}
            onChangeText={(val: any) => {
              props.setAddNewSmData({
                ...props.addNewSmData,
                whatsapp_no: val,
              });
            }}
          />
        </View>
        <View style={styles.inputWrap}>
          <InputField
            placeholderText={"Email Address"}
            handleInputBtnPress={() => { }}
            headingText={"Email Address"}
            valueshow={props.addNewSmData?.email}
            onChangeText={(val: any) => {
              props.setAddNewSmData({
                ...props.addNewSmData,
                email: val,
              });
            }}
          />
        </View>
        <View style={styles.inputWrap}>
          <DropdownInput
            headingText={strings.city}
            placeholder={strings.city}
            data={Array.isArray(props.cityData) ? props.cityData : []}
            inputWidth={"100%"}
            paddingLeft={16}
            maxHeight={300}
            onFocus={() => props.handlegetCityList()}
            labelField="city_name"
            valueField={"city_id"}
            value={props.addNewSmData?.city_id}
            onChange={(item: any) => {
              props.setAddNewSmData({
                ...props.addNewSmData,
                city: item.city_name,
                city_id: item.city_id,
              });
            }}
            newRenderItem={(item: any) => {
              return (
                <>
                  {props.isloading !== false && (
                    <View style={styles.item}>
                      <Text style={styles.textItem}>{item.city_name}</Text>
                    </View>
                  )}
                </>
              );
            }}
          />
        </View>
        <View style={styles.inputWrap}>
          <InputField
            placeholderText={"Area"}
            handleInputBtnPress={() => { }}
            headingText={"Area"}
            valueshow={props.addNewSmData?.area}
            onChangeText={(val: any) => {
              props.setAddNewSmData({
                ...props.addNewSmData,
                area: val,
              });
            }}
          />
        </View>
        <View style={{ marginVertical: 10, marginBottom: 20 }}>
          <Button
            handleBtnPress={() =>
              props?.type === "edit"
                ? props.onPressCreate()
                : props.onPressCreate("edit")
            }
            textTransform={null}
            buttonText={
              props?.type === "edit" ? strings.updateSM : strings.createSM
            }
          />
        </View>
      </ScrollView>
      <PicturePickerModal
        Visible={profile}
        setVisible={setProfile}
        imageData={(data: any) => {
          props.setAddNewSmData({
            ...props.addNewSmData,
            profile_picture: data,
          });
        }}
      />
    </View>
  );
};
export default AddNewSMView;
