import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RED_COLOR, validateEmail } from '../../../components/utilities/constant';
import LoginView from './components/LoginView';
import { users } from '../../../components/utilities/DemoData';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useToast } from "react-native-toast-notifications";
import strings from '../../../components/utilities/Localization';
import ErrorMessage from '../../../components/ErrorMessage';
import { setDefaultHeader } from '../../../components/utilities/httpClient';
import { userLogin } from '../../../Redux/Actions/AuthActions';

const LoginScreen = ({ navigation }: any) => {
  // const [validEmail, setIsValidEmail] = useState(false);
  // const toast: any = useToast();
  // const [loginData, setLoginData] = useState({
  //   email: '',
  //   pass: '',
  // })
  // const handleEmailChange = (val: any) => {

  //   if (val.length <= 0) {
  //     setIsValidEmail(false);
  //   } else if (validateEmail.test(val) === false) {
  //     setIsValidEmail(false);
  //   } else {
  //     setIsValidEmail(true);
  //   }
  // };
  // const handlePasswordChange = (val: any) => {
  // };
  // const handleLoginPress = async () => {
  //   if (!loginData.email || !loginData.pass) {
  //     toast.show("Email and Password required.", {
  //       type: "danger",
  //       placement: "bottom",
  //       offset: 100,
  //       duration: 4000,
  //       animationType: "slide-in",
  //     });
  //     return;
  //   }
  //   // navigation.navigate('DashboardScreenView');
  //   const finalData = users.find((el: any) => {
  //     return el.email == loginData.email && el.password == loginData.pass
  //   })
  //   if(finalData){
  //     await AsyncStorage.setItem('userData', JSON.stringify(finalData))
  //     navigation.replace('DashboardScreenView');
  //   }else{
  //     toast.show("Email or Password are not valid.", {
  //       type: "danger",
  //       placement: "bottom",
  //       offset: 100,
  //       duration: 4000,
  //       animationType: "slide-in",
  //     });
  //   }
  // };

  const dispatch: any = useDispatch()
  const [validEmail, setIsValidEmail] = useState(false);
  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
    login_type: 1
  })
  const validation = () => {
    let isError = true;
    let errorMessage: any = ''
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
    if (loginData.password == undefined || loginData.password == '' && loginData.email == undefined || loginData.email == '') {
      isError = false;
      errorMessage = strings.usernamepasswordempty
    }
    else if (reg.test(loginData.email) === false) {
      isError = false;
      errorMessage = strings.correctemail
    }
    else if (loginData.email == undefined || loginData.email == '') {
      isError = false;
      errorMessage = strings.usernamerequired
    }
    else if (loginData.password == undefined || loginData.password == '') {
      isError = false;
      errorMessage = strings.passwordrequired
    }

    if (errorMessage !== '') {
      ErrorMessage({
        msg: errorMessage,
        backgroundColor: RED_COLOR
      })
    }
    return isError;
  }
  const handleLoginPress = async () => {
    const localFCM = await AsyncStorage.getItem('fcm');
    if (validation()) {
      const respon = dispatch(userLogin({...loginData, device_id: localFCM}))
    }
  };
  const handleSingupPress = () => {
    navigation.navigate('RegistrationScreenView');
  };
  const handleForgotPress = () => {
    navigation.navigate('ForgotPassword');
  };
  return (
    <>
      <LoginView
        // handleEmailChange={handleEmailChange}
        // handlePasswordChange={handlePasswordChange}
        validEmail={validEmail}
        handleLoginPress={handleLoginPress}
        handleSingupPress={handleSingupPress}
        setLoginData={setLoginData}
        loginData={loginData}
        handleForgotPress={handleForgotPress}
      />
    </>
  );
};

export default LoginScreen;
