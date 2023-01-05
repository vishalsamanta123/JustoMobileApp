import React, { useEffect, useState } from "react";
import { useFocusEffect } from "@react-navigation/native";
import PickupRequestView from "./components/PickupRequest";
import { useDispatch, useSelector } from "react-redux";
import { getAllPickupList } from "app/Redux/Actions/PickUpActions";

const PickupRequestScreen = ({ navigation }: any) => {
  const [filterisVisible, setFilterisVisible] = useState(false)
  const [pickupList, setPickupList] = useState([])
  const dispatch: any = useDispatch()
  const { response = {}, list = false } = useSelector((state: any) => state.Pickup) || [];

  useFocusEffect(
    React.useCallback(() => {
      dispatch(getAllPickupList({}))
      return () => { };
    }, [navigation, list])
  );
  useEffect(() => {
    if (response?.status === 200) {
      setPickupList(response?.data);
    }
  }, [response]);

  const onRefresh = () => {
    dispatch(getAllPickupList({}))
  }

  const handleDrawerPress = () => {
    navigation.toggleDrawer();
  };
  return (
    <PickupRequestView
      handleDrawerPress={handleDrawerPress}
      DATA={pickupList}
      filterisVisible={filterisVisible}
      setFilterisVisible={setFilterisVisible}
      onRefresh={onRefresh}
    />
  )
}
export default PickupRequestScreen;