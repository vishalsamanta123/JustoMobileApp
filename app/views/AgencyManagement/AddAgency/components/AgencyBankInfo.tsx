import {
  View,
  Text,
  ScrollView,
  StatusBar,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import images from "../../../../assets/images";
import InputField from "../../../../components/InputField";
import { BLACK_COLOR, PRIMARY_THEME_COLOR, RED_COLOR, WHITE_COLOR } from "../../../../components/utilities/constant";
import strings from "../../../../components/utilities/Localization";
import styles from "./styles";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Button from "../../../../components/Button";
import Header from "../../../../components/Header";
import { useDispatch, useSelector } from "react-redux";
import PicturePickerModal from "app/components/Modals/PicturePicker";
import { normalizeWidth, normalizeHeight, normalize } from "app/components/scaleFontSize";
import { AgencyCreateForm } from "app/Redux/Actions/AgencyActions";
import ErrorMessage from "app/components/ErrorMessage";

const AgentBankInfo = (props: any) => {
  const dispatch: any = useDispatch()
  const [formData, setFormData] = useState<any>({})
  console.log('formData: ', formData);
  const [reravisible, setreraVisible] = useState(false)
  const [lettervisible, setletterVisible] = useState(false)
  const [cheaquevisible, setcheaqueVisible] = useState(false)
  const [visible, setVisible] = useState(false)
  const registrationData = useSelector((state: any) => state.agencyForm)
  console.log('registrationData: ', registrationData);
  useEffect(() => {
    setFormData({ ...registrationData.response })
  }, [registrationData])

  const validation = () => {
    let isError = true;
    let errorMessage: any = ''
    if (formData.rera_certificate_no == '' || formData.rera_certificate_no == undefined) {
      isError = false;
      errorMessage = "Rera Certificate No. is require. Please enter Rera Certificate No."
    }
    else if (formData.rera_certificate == '' || formData.rera_certificate == undefined) {
      isError = false;
      errorMessage = "Rera Certificate Image is require. Please Choose Rera Certificate Image"
    }
    else if (formData.propidership_declaration_letter == '' || formData.propidership_declaration_letter == undefined) {
      isError = false;
      errorMessage = "Propidership Declaration Letter Image is require. Please Choose Propidership Declaration Letter Image"
    }
    else if (formData.cancel_cheaque == '' || formData.cancel_cheaque == undefined) {
      isError = false;
      errorMessage = "Cancel Cheaque Image is require. Please Choose Cancel Cheaque Image"
    }
    else if (formData.bank_name == '' || formData.bank_name == undefined) {
      isError = false;
      errorMessage = "Bank Name is require. Please enter Bank Name"
    }
    else if (formData.branch_name == '' || formData.branch_name == undefined) {
      isError = false;
      errorMessage = "Branch Name is require. Please enter Branch Name"
    }
    else if (formData.account_no == '' || formData.account_no == undefined) {
      isError = false;
      errorMessage = "Account No. is require. Please enter Account No."
    }
    else if (formData.ifsc_code == '' || formData.ifsc_code == undefined) {
      isError = false;
      errorMessage = "IFSC Code is require. Please enter IFSC Code"
    }

    if (errorMessage !== '') {
      ErrorMessage({
        msg: errorMessage,
        backgroundColor: RED_COLOR
      })
    }
    // console.log('isError: ', isError);
    return isError;
  }
  return (
    <View style={styles.mainContainer}>
      <Header
        headerText={strings.userbankinfo}
        headerStyle={styles.headerStyle}
        headerTextStyle={styles.headerTextStyle}
        leftImageIconStyle={styles.leftImageIconStyle}
        leftImageSrc={images.backArrow}
        handleOnLeftIconPress={() => props.onPressNext(0)}
        barStyle={'light-content'}
        statusBarColor={PRIMARY_THEME_COLOR}
      />
      <ScrollView contentContainerStyle={styles.wrap}>
        <View style={styles.inputWrap}>
          <InputField
            placeholderText={"RERA Certificate No."}
            handleInputBtnPress={() => { }}
            headingText={"RERA Certificate No."}
            valueshow={formData?.rera_certificate_no}
            onChangeText={(val: any) => {
              setFormData({
                ...formData, rera_certificate_no: val
              })
            }}
          />
        </View>
        <View style={[styles.inputWrap, { flexDirection: "row", alignItems: 'center', justifyContent: 'space-between' }]}>
          <View style={{ flex: 1 }}>
            <Text style={styles.headingText}>RERA Certificate</Text>
          </View>
          <View>
            <TouchableOpacity
              style={{
                width: normalizeWidth(120),
                height: normalizeHeight(50),
                backgroundColor: WHITE_COLOR,
                alignItems: "center",
                justifyContent: "center",
                marginLeft: 10,
                borderRadius: 10,
              }}
              onPress={() => {
                setreraVisible(true)
                setVisible(true)
              }}
            >
              <Text style={{ color: formData?.rera_certificate ? BLACK_COLOR : PRIMARY_THEME_COLOR, fontSize: normalize(15) }}>{strings.browse}</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={[styles.inputWrap, { flexDirection: "row", alignItems: 'center' }]}>
          <View style={{ flex: 1 }}>
            <Text style={styles.headingText}>Propidership Declaration Letter</Text>
          </View>
          <View>
            <TouchableOpacity
              style={{
                width: normalizeWidth(120),
                height: normalizeHeight(50),
                backgroundColor: WHITE_COLOR,
                alignItems: "center",
                justifyContent: "center",
                marginLeft: 10,
                borderRadius: 10,
              }}
              onPress={() => {
                setletterVisible(true)
                setVisible(true)
              }}
            >
              <Text style={{ color: formData?.propidership_declaration_letter ? BLACK_COLOR : PRIMARY_THEME_COLOR, fontSize: normalize(15) }}>{strings.browse}</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.inputWrap}>
          <Text style={styles.headingText}>Bank details</Text>
        </View>
        <View style={styles.inputWrap}>
          <InputField
            placeholderText={"Bank Name"}
            handleInputBtnPress={() => { }}
            headingText={"Bank Name"}
            valueshow={formData?.bank_name}
            onChangeText={(val: any) => {
              setFormData({
                ...formData, bank_name: val
              })
            }}
          />
        </View>
        <View style={styles.inputWrap}>
          <InputField
            placeholderText={"Branch Name"}
            handleInputBtnPress={() => { }}
            headingText={"Branch Name"}
            valueshow={formData?.branch_name}
            onChangeText={(val: any) => {
              setFormData({
                ...formData, branch_name: val
              })
            }}
          />
        </View>
        <View style={styles.inputWrap}>
          <InputField
            placeholderText={"Account No."}
            handleInputBtnPress={() => { }}
            headingText={"Account No."}
            keyboardtype={'number-pad'}
            valueshow={formData?.account_no}
            onChangeText={(val: any) => {
              setFormData({
                ...formData, account_no: val
              })
            }}
          />
        </View>
        <View style={styles.inputWrap}>
          <InputField
            placeholderText={"IFSC Code"}
            handleInputBtnPress={() => { }}
            headingText={"IFSC Code"}
            valueshow={formData?.ifsc_code}
            onChangeText={(val: any) => {
              setFormData({
                ...formData, ifsc_code: val
              })
            }}
          />
        </View>
        <View style={[styles.inputWrap, { flexDirection: "row", alignItems: 'center' }]}>
          <View style={{ flex: 1, justifyContent: 'flex-end' }}>
            <Text style={styles.headingText}>Cancel Cheaque</Text>
          </View>
          <View>
            <TouchableOpacity
              style={{
                width: normalizeWidth(120),
                height: normalizeHeight(50),
                backgroundColor: WHITE_COLOR,
                alignItems: "center",
                justifyContent: "center",
                marginLeft: 10,
                borderRadius: 10,
              }}
              onPress={() => {
                setcheaqueVisible(true)
                setVisible(true)
              }}
            >
              <Text style={{ color: formData?.cancel_cheaque ? BLACK_COLOR : PRIMARY_THEME_COLOR, fontSize: normalize(15) }}>{strings.browse}</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.buttonContainer}>
          <Button
            handleBtnPress={(type: any) => {
              if (validation()) {
                props.onPressNext(2, formData)
              }
            }}
            rightImage={images.forwardArrow}
            buttonText={strings.next}
            textTransform={"uppercase"}
          />
        </View>
      </ScrollView>
      <PicturePickerModal
        Visible={visible}
        setVisible={setVisible}
        imageData={(data: any) => {
          if (reravisible) {
            setFormData({
              ...formData, rera_certificate: data
            })
            setreraVisible(false)
          }
          else if (lettervisible) {
            setFormData({
              ...formData, propidership_declaration_letter: data
            })
            setletterVisible(false)
          }
          else {
            setFormData({
              ...formData, cancel_cheaque: data
            })
            setcheaqueVisible(false)
          }
        }}
      />
    </View>
  );
};

export default AgentBankInfo;
