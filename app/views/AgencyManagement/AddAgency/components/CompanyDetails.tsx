import {
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import styles from "./styles";
import {
  BLACK_COLOR,
  PRIMARY_THEME_COLOR,
  RED_COLOR,
  WHITE_COLOR,
} from "../../../../components/utilities/constant";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Header from "../../../../components/Header";
import strings from "../../../../components/utilities/Localization";
import InputField from "../../../../components/InputField";
import Button from "../../../../components/Button";
import images from "../../../../assets/images";
import { useSelector } from "react-redux";
import {
  normalizeWidth,
  normalizeHeight,
  normalize,
} from "app/components/scaleFontSize";
import PicturePickerModal from "app/components/Modals/PicturePicker";
import ErrorMessage from "app/components/ErrorMessage";
import { RequiredStart } from "app/components/utilities/GlobalFuncations";

const CompanyDetails = (props: any) => {
  const [visible, setVisible] = useState(false);
  const [panvisible, setpanVisible] = useState(false);
  const [lettervisible, setletterVisible] = useState(false);

  const validation = () => {
    let isError = true;
    let errorMessage: any = "";

    if (errorMessage !== "") {
      ErrorMessage({
        msg: errorMessage,
        backgroundColor: RED_COLOR,
      });
    }
    return isError;
  };

  return (
    <View style={styles.mainContainer}>
      <Header
        headerText={strings.companyDetails}
        headerStyle={styles.headerStyle}
        headerTextStyle={styles.headerTextStyle}
        leftImageSrc={images.backArrow}
        leftImageIconStyle={styles.leftImageIconStyle}
        handleOnLeftIconPress={() => props.setFormType(1)}
        barStyle={"light-content"}
        statusBarColor={PRIMARY_THEME_COLOR}
      />
      <ScrollView keyboardShouldPersistTaps={'handled'}
      contentContainerStyle={styles.wrap}>
        <View style={styles.inputWrap}>
          <InputField
            require={true}
            placeholderText={"Agency Name"}
            handleInputBtnPress={() => { }}
            headingText={"RealeEstate Company"}
            valueshow={props?.agencyData?.agency_name}
            onChangeText={(val: any) => {
              props.setAgencyData({
                ...props?.agencyData,
                agency_name: val,
              });
            }}
          />
        </View>
        <View style={styles.inputWrap}>
          <InputField
            require={true}
            placeholderText={"GST"}
            headingText={"GST"}
            handleInputBtnPress={() => { }}
            valueshow={props?.agencyData?.agencies?.gst}
            onChangeText={(val: any) => {
              props.setAgencyData({
                ...props?.agencyData,
                gst: val,
              });
            }}
          />
        </View>
        <View style={styles.inputWrap}>
          <InputField
            require={true}
            placeholderText={"RERA Registration"}
            headingText={"RERA Registration"}
            handleInputBtnPress={() => { }}
            valueshow={props?.agencyData?.rera_registration}
            onChangeText={(val: any) => {
              props.setAgencyData({
                ...props?.agencyData,
                rera_registration: val,
              });
            }}
          />
        </View>
        <View
          style={[
            styles.inputWrap,
            {
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            },
          ]}
        >
          <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
            <Text style={styles.headingText}>Pancard</Text>
            <RequiredStart />
          </View>
          <View style={{ flex: 0.5 }}>
            <TouchableOpacity
              style={styles.browseVw}
              onPress={() => {
                setpanVisible(true);
                setVisible(true);
              }}
            >
              <Text
                style={{
                  color: props?.agencyData?.pancard
                    ? BLACK_COLOR
                    : PRIMARY_THEME_COLOR,
                  fontSize: normalize(15),
                }}
              >
                {strings.browse}
              </Text>
            </TouchableOpacity>
            {props.agencyData?.pancard === null ||
              props.agencyData?.pancard === "" ||
              props.agencyData?.pancard === undefined ?
              null :
              <Text style={styles.addedTxt}>{"Pancard Added"}</Text>
            }
          </View>
        </View>
        <View
          style={[
            styles.inputWrap,
            {
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            },
          ]}
        >
          <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
            <Text style={styles.headingText}>
              Decalaration Latter of Company
            </Text>
            <RequiredStart />
          </View>
          <View style={{ flex: 0.5 }}>
            <TouchableOpacity
              style={styles.browseVw}
              onPress={() => {
                setletterVisible(true);
                setVisible(true);
              }}
            >
              <Text
                style={{
                  color: props?.agencyData?.declaration_letter_of_company
                    ? BLACK_COLOR
                    : PRIMARY_THEME_COLOR,
                  fontSize: normalize(15),
                }}
              >
                {strings.browse}
              </Text>
            </TouchableOpacity>
            {props.agencyData?.declaration_letter_of_company === null ||
              props.agencyData?.declaration_letter_of_company === "" ||
              props.agencyData?.declaration_letter_of_company === undefined ?
              null :
              <Text style={styles.addedTxt}>{"Decalaration Letter of Company Added"}</Text>
            }
          </View>
        </View>
        <View style={styles.inputWrap}>
          <Text style={styles.headingText}>Bank details</Text>
        </View>
        <View style={styles.inputWrap}>
          <InputField
            require={true}
            placeholderText={"Bank Name"}
            handleInputBtnPress={() => { }}
            headingText={"Bank Name"}
            valueshow={props?.agencyData?.company_bank_name}
            onChangeText={(val: any) => {
              props.setAgencyData({
                ...props?.agencyData,
                company_bank_name: val,
              });
            }}
          />
        </View>
        <View style={styles.inputWrap}>
          <InputField
            require={true}
            placeholderText={"Branch Name"}
            handleInputBtnPress={() => { }}
            headingText={"Branch Name"}
            valueshow={props?.agencyData?.company_branch_name}
            onChangeText={(val: any) => {
              props.setAgencyData({
                ...props?.agencyData,
                company_branch_name: val,
              });
            }}
          />
        </View>
        <View style={styles.inputWrap}>
          <InputField
            require={true}
            placeholderText={"Account No."}
            handleInputBtnPress={() => { }}
            headingText={"Account No."}
            keyboardtype={"number-pad"}
            valueshow={props?.agencyData?.company_account_no}
            onChangeText={(val: any) => {
              props.setAgencyData({
                ...props?.agencyData,
                company_account_no: val,
              });
            }}
          />
        </View>
        <View style={styles.inputWrap}>
          <InputField
            require={true}
            placeholderText={"IFSC Code"}
            handleInputBtnPress={() => { }}
            headingText={"IFSC Code"}
            valueshow={props?.agencyData?.company_ifsc_code}
            onChangeText={(val: any) => {
              props.setAgencyData({
                ...props?.agencyData,
                company_ifsc_code: val,
              });
            }}
          />
        </View>
        <View style={styles.buttonContainer}>
          <Button
            handleBtnPress={() => {
              if (validation()) {
                props.onPressNext(3, props?.agencyData);
              }
            }}
            buttonText={
              props.type === "add"
                ? strings.createnewagency
                : strings.editagency
            }
            textTransform={"uppercase"}
          />
        </View>
      </ScrollView>
      <PicturePickerModal
        Visible={visible}
        setVisible={setVisible}
        imageData={(data: any) => {
          if (panvisible) {
            props.setAgencyData({
              ...props?.agencyData,
              pancard: data,
            });
            setpanVisible(false);
          } else {
            props.setAgencyData({
              ...props?.agencyData,
              declaration_letter_of_company: data,
            });
            setletterVisible(false);
          }
        }}
      />
    </View>
  );
};

export default CompanyDetails;
