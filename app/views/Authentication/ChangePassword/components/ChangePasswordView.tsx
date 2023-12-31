import { View, Text, Image, TouchableOpacity, ScrollView } from "react-native";
import React, { useState } from "react";
import styles from "./styles";
import images from "../../../../assets/images";
import InputField from "../../../../components/InputField";
import Button from "../../../../components/Button";
import strings from "../../../../components/utilities/Localization";
// import Logoview from "../../Logoview"

const ChangePasswordView = (props: any) => {
  const [isVisiblePassword, setIsVisiblePassword] = useState(true);
  const handlePasswordBtnPress = () => {
    setIsVisiblePassword(!isVisiblePassword);
  };
  const [isVisiblecPassword, setIsVisiblecPassword] = useState(true);
  const handlecPasswordBtnPress = () => {
    setIsVisiblecPassword(!isVisiblecPassword);
  };
  return (
    <ScrollView style={styles.mainContainer}>
      {/* <View style={styles.logoView}>
        <View style={styles.loginBannerView}>
          <Image style={styles.loginBanner} source={images.loginBanner} />
        </View>
        <View style={styles.bannerLogoView}>
          <Image style={styles.logoImage} source={images.logoWhiteBG} />
        </View>
      </View> */}
      {/* <View style={styles.logoView}>
        <Logoview/>
      </View> */}
      <View style={styles.logoView}>
          <Image style={styles.logoImage} source={images.logoWhiteBG} />
      </View>
      <View style={styles.inputView}>
        <View style={styles.inputWrap}>
          <InputField
            placeholderText={"New Password"}
            headingText={"New Password"}
            rightImgSrc={
              isVisiblePassword ? images.hiddenPassword : images.showPassword
            }
            handleInputBtnPress={handlePasswordBtnPress}
            isSecureText={isVisiblePassword}
            onChangeText={(val: any) => {
              props.setPasswordDate({
                ...props.passwordDate, password:val
              })
            }}
          />
        </View>
        <View style={styles.inputWrap}>
          <InputField
            placeholderText={"Confirm Password"}
            headingText={"Confirm Password"}
            rightImgSrc={
              isVisiblecPassword ? images.hiddenPassword : images.showPassword
            }
            handleInputBtnPress={handlecPasswordBtnPress}
            isSecureText={isVisiblecPassword}
            onChangeText={(val: any) => {
              props.setPasswordDate({
                ...props.passwordDate, cpassword:val
              })
            }}
          />
        </View>
        
        <View style={styles.btnView}>
          <Button
            buttonText={strings.updatepassword}
            handleBtnPress={props.handlechanngePress}
          />
        </View>
        {/* <View style={styles.dontHaveView}>
          <Text style={styles.dontText}>{strings.dontHaveAnAcc}</Text>
          <TouchableOpacity style={styles.registerTouch}>
            <Text style={styles.registerText}>{strings.registerNow}</Text>
          </TouchableOpacity>
        </View> */}
       
      </View>
      <View style={styles.bottomView}>
        <Text style={styles.bottomText}>{strings.byCreating}</Text>
        <TouchableOpacity style={styles.spanTouch}>
          <Text style={styles.spanText}> {strings.termsAndCondition} </Text>
        </TouchableOpacity>
        <Text style={styles.bottomText}> {strings.and} </Text>
        <TouchableOpacity style={styles.spanTouch}>
          <Text style={styles.spanText}> {strings.privacyPolicy} </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default ChangePasswordView;
