import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import AppointmentView from "./Components/AppointmentView";
import { getAllAppointmentList } from "app/Redux/Actions/AppointmentWithCpActions";
import { useDispatch, useSelector } from "react-redux";
import { useFocusEffect } from "@react-navigation/native";
import { getUserAppointmentList } from "app/Redux/Actions/AppiontmentWithUserActions";

const AppointmentScreenCPSM = ({ navigation }: any) => {
  const [appointmentList, setAppointmentList] = useState<any>([]);
  const [offSET, setOffset] = useState(0);
  const [role, setRole] = useState("");
  const dispatch: any = useDispatch();
  const getLoginType = useSelector((state: any) => state.login) || {};
  const {
    response = {},
    list = "",
    edit = false,
  } = useSelector((state: any) => state.userAppointmentData);
  const [filterData, setFilterData] = useState({
    start_date: "",
    end_date: "",
    customer_name: "",
  });
  useFocusEffect(
    React.useCallback(() => {
      getAppointmentList(2);
      return () => {};
    }, [navigation, list, edit])
  );
  useEffect(() => {
    if (response?.status === 200) {
      if(response?.data?.length > 0) {
        setAppointmentList(response?.data);
        console.log("response?.data: ", response?.data);
      }
    }
  }, [response, list, edit]);
  useEffect(() => {
    if (edit) {
      getAppointmentList(2);
    }
  }, [edit]);
  useEffect(() => {
    console.log(
      "getLoginType?.response?.data?.user_id: ",
      getLoginType?.response?.data?.user_id
    );
    console.log("getLoginType?.response: ", getLoginType?.response);
    if (getLoginType?.response?.data?.role_title === "Sourcing TL") {
      setRole("TL");
      console.log("getLoginType?.response: ", getLoginType?.response);
    } else if (
      getLoginType?.response?.data?.role_title === "Sourcing Manager"
    ) {
      setRole("SM");
    }
  }, [getLoginType]);
  const getAppointmentList = (type: any) => {
    console.log("type: ", type);
    dispatch(
      getUserAppointmentList({
        appoiment: type ? type : 1,
      })
    );
    // toGetDatas(array)
  };
  const handleDrawerPress = () => {
    navigation.toggleDrawer();
  };
  return (
    <AppointmentView
      handleDrawerPress={handleDrawerPress}
      appointmentList={appointmentList}
      offSET={offSET}
      getAppointmentList={getAppointmentList}
      setFilterData={setFilterData}
      filterData={filterData}
      role={role}
    />
  );
};

export default AppointmentScreenCPSM;
