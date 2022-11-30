import { View, Text, Image, TouchableOpacity, KeyboardAvoidingView, ScrollView } from "react-native";
import React, { useState } from "react";
import styles from "./styles";
import images from "../../../../assets/images";
import InputField from "../../../../components/InputField";
import Button from "../../../../components/Button";
import strings from "../../../../components/utilities/Localization";

const LoginView = (props: any) => {
  const [isVisiblePassword, setIsVisiblePassword] = useState(true);
  const handlePasswordBtnPress = () => {
    setIsVisiblePassword(!isVisiblePassword);
  };
  return (
    <ScrollView keyboardShouldPersistTaps={'handled'}
      contentContainerStyle={styles.mainContainer}>
        <View style={styles.logoView}>
          <Image style={styles.logoImage} source={images.logoWhiteBG} />
      </View>
      <View style={styles.inputView}>
        <View style={styles.inputWrap}>
          <InputField
            placeholderText={"Email Address"}
            rightImgSrc={props.validEmail ? images.check : images.emailIcon}
            isSecureText={false}
            onChangeText={(val: any) => {
              props.setLoginData({
                ...props.loginData, email: val
              })
            }}
          />
        </View>
        <View style={styles.inputWrap}>
          <InputField
            placeholderText={"Password"}
            rightImgSrc={
              isVisiblePassword ? images.showPassword : images.hiddenPassword
            }
            handleInputBtnPress={handlePasswordBtnPress}
            isSecureText={isVisiblePassword}
            onChangeText={(val: any) => {
              props.setLoginData({
                ...props.loginData, password: val
              })
            }}
          />
        </View>
        <TouchableOpacity style={styles.forgotTouch} onPress={()=> props.handleForgotPress()}>
          <Text style={styles.forgotText}>{strings.forgotPassword}</Text>
        </TouchableOpacity>
        <View style={styles.btnView}>
          <Button
            buttonText={strings.signInText}
            handleBtnPress={props.handleLoginPress}
          />
        </View>
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

export default LoginView;
