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
import { RequiredStart } from "app/components/utilities/GlobalFuncations";

const AgentBankInfo = (props: any) => {
  const [reravisible, setreraVisible] = useState(false)
  const [lettervisible, setletterVisible] = useState(false)
  const [cheaquevisible, setcheaqueVisible] = useState(false)
  const [visible, setVisible] = useState(false)
  return (
    <View style={styles.mainContainer}>
      <Header
        headerText={strings.userbankinfo}
        headerStyle={styles.headerStyle}
        headerTextStyle={styles.headerTextStyle}
        leftImageIconStyle={styles.leftImageIconStyle}
        leftImageSrc={images.backArrow}
        handleOnLeftIconPress={() => props.setFormType(0)}
        barStyle={'light-content'}
        statusBarColor={PRIMARY_THEME_COLOR}
      />
      <ScrollView contentContainerStyle={styles.wrap}>
        <View style={styles.inputWrap}>
          <InputField
            require={true}
            placeholderText={"RERA Certificate No."}
            handleInputBtnPress={() => { }}
            headingText={"RERA Certificate No."}
            valueshow={props.agencyData?.rera_certificate_no}
            onChangeText={(val: any) => {
              props.setAgencyData({
                ...props.agencyData, rera_certificate_no: val
              })
            }}
          />
        </View>
        <View style={[styles.inputWrap, { flexDirection: "row", alignItems: 'center', justifyContent: 'space-between' }]}>
          <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
            <Text style={styles.headingText}>RERA Certificate</Text>
            <RequiredStart />
          </View>
          <View style={{ flex: 0.5 }}>
            <TouchableOpacity
              style={styles.browseVw}
              onPress={() => {
                setreraVisible(true)
                setVisible(true)
              }}
            >
              <Text style={{ color: props.agencyData?.rera_certificate ? BLACK_COLOR : PRIMARY_THEME_COLOR, fontSize: normalize(15) }}>{strings.browse}</Text>
            </TouchableOpacity>
            {props.agencyData?.rera_certificate === null ||
              props.agencyData?.rera_certificate === "" ||
              props.agencyData?.rera_certificate === undefined ?
              null :
              <Text style={styles.addedTxt}>{"RERA Certificate Added"}</Text>
            }
          </View>
        </View>
        <View style={[styles.inputWrap, { flexDirection: "row", alignItems: 'center' }]}>
          <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
            <Text style={styles.headingText}>Proprietorship Declaration Letter</Text>
            <RequiredStart />
          </View>
          <View style={{ flex: 0.5 }}>
            <TouchableOpacity
              style={styles.browseVw}
              onPress={() => {
                setletterVisible(true)
                setVisible(true)
              }}
            >
              <Text style={{ color: props.agencyData?.propidership_declaration_letter ? BLACK_COLOR : PRIMARY_THEME_COLOR, fontSize: normalize(15) }}>{strings.browse}</Text>
            </TouchableOpacity>
            {props.agencyData?.propidership_declaration_letter === null ||
              props.agencyData?.propidership_declaration_letter === "" ||
              props.agencyData?.propidership_declaration_letter === undefined ?
              null :
              <Text style={styles.addedTxt}>{"Proprietorship Declaration Letter Added"}</Text>
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
            valueshow={props.agencyData?.bank_name}
            onChangeText={(val: any) => {
              props.setAgencyData({
                ...props.agencyData, bank_name: val
              })
            }}
          />
        </View>
        <View style={styles.inputWrap}>
          <InputField
            require={true}
            placeholderText={"Branch Name"}
            handleInputBtnPress={() => { }}
            headingText={"Branch Name"}
            valueshow={props.agencyData?.branch_name}
            onChangeText={(val: any) => {
              props.setAgencyData({
                ...props.agencyData, branch_name: val
              })
            }}
          />
        </View>
        <View style={styles.inputWrap}>
          <InputField
            require={true}
            placeholderText={"Account No."}
            handleInputBtnPress={() => { }}
            headingText={"Account No."}
            keyboardtype={'number-pad'}
            valueshow={props.agencyData?.account_no}
            onChangeText={(val: any) => {
              props.setAgencyData({
                ...props.agencyData, account_no: val
              })
            }}
          />
        </View>
        <View style={styles.inputWrap}>
          <InputField
            require={true}
            placeholderText={"IFSC Code"}
            handleInputBtnPress={() => { }}
            headingText={"IFSC Code"}
            valueshow={props.agencyData?.ifsc_code}
            maxLength={11}
            onChangeText={(val: any) => {
              props.setAgencyData({
                ...props.agencyData, ifsc_code: val
              })
            }}
          />
        </View>
        <View style={[styles.inputWrap, { flexDirection: "row", alignItems: 'center' }]}>
          <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
            <Text style={styles.headingText}>Cancel Cheaque</Text>
            <RequiredStart />
          </View>
          <View style={{ flex: 0.5 }}>
            <TouchableOpacity
              style={[styles.browseVw, {
                top: props.agencyData?.cancel_cheaque === null ||
                  props.agencyData?.cancel_cheaque === "" ||
                  props.agencyData?.cancel_cheaque === undefined ?
                  normalize(0) : normalize(8),
              }]}
              onPress={() => {
                setcheaqueVisible(true)
                setVisible(true)
              }}
            >
              <Text style={{
                color: props.agencyData?.cancel_cheaque === "" ?
                  BLACK_COLOR : PRIMARY_THEME_COLOR, fontSize: normalize(15)
              }}>{strings.browse}</Text>
            </TouchableOpacity>
            {props.agencyData?.cancel_cheaque === null ||
              props.agencyData?.cancel_cheaque === "" ||
              props.agencyData?.cancel_cheaque === undefined ?
              null :
              <Text style={styles.addedTxt}>{"Proprietorship Declaration Letter Added"}</Text>
            }
          </View>
        </View>
        <View style={styles.buttonContainer}>
          <Button
            handleBtnPress={(type: any) => {
              props.onPressNext(2, props.agencyData)
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
            props.setAgencyData({
              ...props.agencyData, rera_certificate: data
            })
            setreraVisible(false)
          }
          else if (lettervisible) {
            props.setAgencyData({
              ...props.agencyData, propidership_declaration_letter: data
            })
            setletterVisible(false)
          }
          else {
            props.setAgencyData({
              ...props.agencyData, cancel_cheaque: data
            })
            setcheaqueVisible(false)
          }
        }}
      />
    </View>
  );
};

export default AgentBankInfo;
