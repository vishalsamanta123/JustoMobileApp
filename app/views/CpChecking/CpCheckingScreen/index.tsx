import { View, Text } from "react-native";
import React from "react";
import CpCheckingView from "./components/CpCheckingView";
import {
  handlePermission,
  openPermissionSetting,
} from "app/components/utilities/GlobalFuncations";
import strings from "app/components/utilities/Localization";

const CpChecking = ({ navigation }: any) => {
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
    />
  );
};

export default CpChecking;
