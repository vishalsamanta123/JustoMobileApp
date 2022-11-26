import { useFocusEffect } from "@react-navigation/native";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  allocatePropertyToUser,
  getManagerList,
} from "../../../Redux/Actions/propertyActions";
import AllocateCP from "./components/AllocateCP";

const AllocatePropertyScreen = ({ navigation, route }: any) => {
  console.log("route: ", route.params);
  const { response = {}, list } =
    useSelector((state: any) => state.propertyData) || [];
  console.log("responseeeee: ", response);

  const [cpList, setCpList] = useState<any>([]);
  const dispatch: any = useDispatch();
  const [selectedCp, setSelected] = useState<any>([]);
  const [selectedLoginIdCp, setSelectedLoginIdCp] = useState<any>([]);
  const [allList, setAllList] = useState(true);
  const [CPDetails, setCPDetails] = useState(false);
  const onPressBack = () => {
    navigation.goBack();
  };
  const onPressAllocateCp = () => {
    // navigation.goBack()
  };

  useFocusEffect(
    React.useCallback(() => {
      dispatch(
        getManagerList({
          property_id: route.params?.property_id,
        })
      );
      // const constantArry: any[] = [...response.data];
      return () => {};
    }, [navigation, list])
  );
  useEffect(() => {
    setCpList(response.data);
  }, [response])
  
  const handleSelects = (items: any) => {
    var array: any[] = [...selectedCp];
    var arrayLoginID: any[] = [...selectedLoginIdCp];
    array.push(items);
    arrayLoginID.push({ user_id: items.login_id });
    setSelectedLoginIdCp(arrayLoginID);
    setSelected(array);
    // setCPDetails(true)
  };
  const handleDelete = (items: any, index: any) => {
    var arrays: any[] = [...selectedCp];
    var arrayLoginID: any[] = [...selectedLoginIdCp];
    arrays?.splice(index, 1);
    arrayLoginID.splice(index, 1);
    setSelectedLoginIdCp(arrayLoginID);
    setSelected(arrays);
  };
  const handleSearch = (searchKey: any) => {
    if (searchKey === "") {
      setCpList(cpList);
    } else {
      const lowerCased = searchKey.toLowerCase();
      const searchArray = [...cpList];
      const list = searchArray.filter((item) => {
        return item.user_name.toLowerCase().match(lowerCased);
      });
      setCpList(list);
    }
  };
  const handleAddTarget = () => {
    setCPDetails(false);
    // navigation.goBack()
    console.log("selectedLoginIdCp: ", selectedLoginIdCp);
    console.log("response.property_id: ", response);
    dispatch(
      allocatePropertyToUser({
        user_id: selectedLoginIdCp,
        property_id: route?.params?.property_id,
      })
    );
  };
  return (
    <AllocateCP
      onPressBack={onPressBack}
      cpList={cpList}
      selectedCp={selectedCp}
      allList={allList}
      setAllList={setAllList}
      handleSearch={handleSearch}
      handleSelects={handleSelects}
      handleDelete={handleDelete}
      CPDetails={CPDetails}
      setCPDetails={setCPDetails}
      handleAddTarget={handleAddTarget}
      // onPressCreate={onPressCreate}
      // type={route?.params?.type || ""}
    />
  );
};

export default AllocatePropertyScreen;
