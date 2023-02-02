import { useFocusEffect } from "@react-navigation/native";
import { getClosingManagerList } from "app/Redux/Actions/ClosingManager";
import { getUsersListForSiteHead } from "app/Redux/Actions/UserManagerActions";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import UserManagementView from "./components/UserManagementView";

const UserManagementScreen = ({ navigation }: any) => {
  const [status, setStatus] = useState(false);
  const [filterisVisible, setFilterisVisible] = useState(false);
  const [usersList, setUsersList] = useState<any>([]);
  const [offSET, setOffset] = useState(0);
  const dispatch: any = useDispatch();
  const { response = {}, list = "" } =
    useSelector((state: any) => state.UserManager) || {};
  console.log('response: UserManager', response);

  const [filterData, setFilterData] = useState({
    start_date: "",
    end_date: "",
    followup_for: "",
  });

  useFocusEffect(
    React.useCallback(() => {
      getUsersList();
      return () => {};
    }, [navigation])
  );
  useEffect(() => {
    if (response?.status === 200) {
      setUsersList(response?.data);
    } else {
      // setUsersList([])
    }
  }, [response]);
  const getUsersList = () => {
    dispatch(getUsersListForSiteHead({}));
  };

  const onRefresh = () => {
    getUsersList();
  };
  const handleFilterApply = () => {
    getUsersList();
  };

  const handleDrawerPress = () => {
    navigation.toggleDrawer();
  };
  const handleAddNewUser = (type: any, data: any) => {
    if (type === "edit") {
      navigation.navigate("AddNewUserScreen", { type, data });
    } else {
      navigation.navigate("AddNewUserScreen");
    }
  };

  const onPressViews = (item: any) => {
    navigation.navigate("UserDetailsScreen", item);
  };

  return (
    <UserManagementView
      handleDrawerPress={handleDrawerPress}
      filterisVisible={filterisVisible}
      setFilterisVisible={setFilterisVisible}
      handleAddNewUser={handleAddNewUser}
      onPressViews={onPressViews}
      status={status}
      setStatus={setStatus}
      usersList={usersList}
      onRefresh={onRefresh}
    />
  );
};

export default UserManagementScreen;
