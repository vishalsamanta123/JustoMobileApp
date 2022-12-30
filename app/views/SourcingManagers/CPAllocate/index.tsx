import { useFocusEffect } from "@react-navigation/native";
import ErrorMessage from "app/components/ErrorMessage";
import { GREEN_COLOR, RED_COLOR } from "app/components/utilities/constant";
import { getAllAgentList } from "app/Redux/Actions/AgencyActions";
import { allocatePropertyToUser, getManagerList } from "app/Redux/Actions/propertyActions";
import { assignCPSM, getAssignCPList } from "app/Redux/Actions/SourcingManagerActions";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AllocateCPView from "./components/AllocateCP";

const AllocateCPScreen = ({ navigation, route }: any) => {
  const id = route?.params || {}
  const { response = {}, list } = useSelector((state: any) => state.SourcingManager) || [];

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
      setCpList([])
      dispatch(
        getAssignCPList({
          user_id: id
        })
      );
      // const constantArry: any[] = [...response.data];
      return () => { };
    }, [navigation, list])
  );
  useEffect(() => {
    if (response?.data?.length > 0) {
      setCpList(response?.data);
      setSelected(response?.data?.filter((item: any) => item?.parent_id === id))
    }
  }, [response])

  const handleSelects = (items: any) => {


    var array: any[] = [...selectedCp];
    var arrayLoginID: any[] = [...selectedLoginIdCp];
    array.push(items);
    arrayLoginID.push(items.login_id);
    setSelectedLoginIdCp(arrayLoginID);
    setSelected(array);
    // setCPDetails(true)
  };
  const handleDelete = (items: any, index: any) => {
    var arrays: any[] = [...selectedCp];
    var arrayLoginID: any[] = [...selectedLoginIdCp];
    arrays?.splice(index, 1);
    arrayLoginID?.splice(index, 1);
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
    dispatch(
      assignCPSM({
        user_id: id,
        cp_id: selectedLoginIdCp
      })
    );

    navigation.navigate('SourcingManager')
  };
  return (
    <AllocateCPView
      setSelectedLoginIdCp={setSelectedLoginIdCp}
      selectedLoginIdCp={selectedLoginIdCp}
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
    />
  );
};

export default AllocateCPScreen;
