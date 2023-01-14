import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import CpCheckingView from "./components/CpCheckingView";
import {
  handlePermission,
  openPermissionSetting,
} from "app/components/utilities/GlobalFuncations";
import strings from "app/components/utilities/Localization";
import { useDispatch, useSelector } from "react-redux";
import { getCpCheckingList } from "app/Redux/Actions/CpCheckingActions";
import { useFocusEffect } from "@react-navigation/native";

const CpChecking = ({ navigation }: any) => {
  const { response = {}, list = false } = useSelector(
    (state: any) => state.CpCheckingData
  );
  const dispatch: any = useDispatch();
  const [cpCheckingList, setCpCheckingList] = useState([]);
  useFocusEffect(
    React.useCallback(() => {
      handleGetCpCheckingList()
      return () => {};
    }, [navigation, list])
  );
  useEffect(() => {
    if (response?.status === 200) {
      setCpCheckingList(response?.data);
    } else {
      setCpCheckingList([]);
    }
  }, [response]);
  const handleGetCpCheckingList = () => {
    dispatch(getCpCheckingList({}));
  }
  const handleDrawerPress = () => {
    navigation.toggleDrawer();
  };
  const handleScanQr = async (items: any) => {
    const res = await handlePermission(
      "camera",
      strings.txt_setting_heading_camera,
      strings.txt_setting_description_camera
    );

    if (res == "setting1") {
      openPermissionSetting(
        strings.txt_setting_heading_camera,
        strings.txt_setting_description_camera
      );
    } else if (res) {
      navigation.navigate("ScanQr");
    }
  };
  return (
    <CpCheckingView
      handleDrawerPress={handleDrawerPress}
      handleScanQr={handleScanQr}
      cpCheckingList={cpCheckingList}
      handleGetCpCheckingList={handleGetCpCheckingList}
    />
  );
};

export default CpChecking;
