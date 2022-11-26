import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import SplashScreenVeiw from './components/SplashScreenVeiw';

const SplashScreen = ({navigation}: any) => {
  setTimeout(() => {
    navigation.replace('LoginScreenView');
  }, 3000);
  return <SplashScreenVeiw />;
};

export default SplashScreen;
