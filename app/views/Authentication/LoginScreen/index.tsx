import React, {useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {RED_COLOR, validateEmail} from '../../../components/utilities/constant';
import LoginView from './components/LoginView';
import { users } from '../../../components/utilities/DemoData';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useToast } from "react-native-toast-notifications";
import strings from '../../../components/utilities/Localization';
import ErrorMessage from '../../../components/ErrorMessage';
import { setDefaultHeader } from '../../../components/utilities/httpClient';
import { userLogin } from '../../../Redux/Actions/AuthActions';
import Loader from '../../../components/CommonScreen/Loader';

const LoginScreen = ({navigation}: any) => {
  // const [validEmail, setIsValidEmail] = useState(false);
  // const toast: any = useToast();
  // console.log('validEmail: ', validEmail);
  // const [loginData, setLoginData] = useState({
  //   email: '',
  //   pass: '',
  // })
  // console.log('loginData: ', loginData);
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
  //   console.log('val', val);
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
  //   console.log('finalData: ', finalData);
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
  const [isloading, setIsloading] = useState(false)
  const [validEmail, setIsValidEmail] = useState(false);
  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
    login_type: 1
  })
  const loginSelector = useSelector((state: any) => state.login);
  useEffect(() => {
    checklogin()
  }, [loginSelector])

  const checklogin = async () => {
    const authval = await AsyncStorage.getItem("AuthToken");
    console.log('authval: ', authval);
    if (loginSelector.response && loginSelector.authToken) {
    console.log('loginSelector.response: ', loginSelector.response);
    
      setIsloading(loginSelector.loading)
      // console.log("checklogin -> loginSelector.response.status", loginSelector.response.status)
      if (loginSelector.response.status === 200) {
        await setDefaultHeader("token", loginSelector.response.token);
        await AsyncStorage.setItem('loginData', JSON.stringify(loginSelector.response))
        navigation.navigate('DashboardScreenView');
      } else {

        ErrorMessage({
          msg: loginSelector?.response?.message,
          backgroundColor: RED_COLOR
        })
      }
    } else {
      setIsloading(loginSelector.loading)
      if (authval != null) {
        console.log('authval: =========', authval);
        await setDefaultHeader("token", authval);
        navigation.navigate('DashboardScreenView');
      } else {
        if (loginSelector?.response?.message) {
          ErrorMessage({
            msg: loginSelector?.response?.message,
            backgroundColor: RED_COLOR
          })
        }

      }

      /*   await setDefaultHeader("token", authval);
        navigation.navigate('DashboardScreenView'); */

    }
  }
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
    //console.log('isError: ', isError);
    return isError;
  }
  const handleLoginPress = () => {
    if (validation()) {
      setIsloading(true)
      const respon = dispatch(userLogin(loginData))
      console.log('loginData: IN LOGIN PRESS', loginData);
      // console.log("handleLoginPress -> respon", respon)
      //navigation.navigate('DashboardScreenView');
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
      {isloading ? <Loader /> : null}
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
