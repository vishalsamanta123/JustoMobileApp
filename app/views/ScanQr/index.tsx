import React from "react";
import ScanQrView from "./components/ScanQr";
import { useDispatch, useSelector } from "react-redux";
import { cpAppointmentCheckIn } from "app/Redux/Actions/MasterActions";
import { ROLE_IDS } from "app/components/utilities/constant";

const ScanQrScreen = ({ navigation }: any) => {
  const dispatch: any = useDispatch();
  const handleBackPress = () => {
    navigation.goBack();
  };
  const getLoginType = useSelector((state: any) => state.login);

  const handleQrScan = (id: any) => {
    dispatch(
      cpAppointmentCheckIn({
        appointment_id: id,
      })
    );
    if (id !== "") {
      if (getLoginType?.response?.data?.role_id === ROLE_IDS.receptionist_id) {
          navigation.navigate("CpChecking");
      } else {
        navigation.navigate("AppointmentDetailMain", { _id: id });
      }
    }
  };
  return (
    <>
      <ScanQrView
        handleBackPress={handleBackPress}
        handleQrScan={handleQrScan}
      />
    </>
  );
};

export default ScanQrScreen;
