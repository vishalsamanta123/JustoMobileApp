import { useFocusEffect } from "@react-navigation/native";
import { getClosingDetail } from "app/Redux/Actions/ClosingManager";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import UserDetailsView from "./components/UserDetailsView";

const UserDetailsScreen = ({ navigation, route }: any) => {
  const data = route?.params || {};
  const [userDetail, setUserdetail] = useState([]);
  const dispatch: any = useDispatch();
  const { response = {}, detail = "" } = useSelector(
    (state: any) => state.ClosingManager
  );

  useFocusEffect(
    React.useCallback(() => {
      dispatch(getClosingDetail({ user_id: data?._id }));
      return () => {};
    }, [navigation])
  );

  useEffect(() => {
    if (response?.status === 200) {
      setUserdetail(response?.data[0]);
    } else {
      setUserdetail([]);
    }
  }, [response]);
  const handleBackPress = () => {
    navigation.goBack();
  };
  return (
    <UserDetailsView handleBackPress={handleBackPress} userDetail={userDetail} />
  );
};
export default UserDetailsScreen;
