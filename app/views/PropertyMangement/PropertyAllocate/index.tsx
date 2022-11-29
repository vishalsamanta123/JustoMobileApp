import { useFocusEffect } from "@react-navigation/native";
import ErrorMessage from "app/components/ErrorMessage";
import { GREEN_COLOR, RED_COLOR } from "app/components/utilities/constant";
import { allocatePropertyToUser, getManagerList } from "app/Redux/Actions/propertyActions";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AllocateCP from "./components/AllocateCP";

const AllocatePropertyScreen = ({ navigation, route }: any) => {
  const { response = {}, list } =
  useSelector((state: any) => state.propertyData) || [];

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
    setCpList(response?.data);
    setSelected(response?.data?.filter((item: any) => item?.allocate_status?.length > 0))
    /* setSelectedLoginIdCp(
      response?.data?.filter((item: any) =>
       {
        const getid : any =  item?.allocate_status?.length > 0 
        if(getid){
          return item
          //console.log('item?._id: ', item?._id);
        }
        
      }).reduce((obj : any , key : any) => {
      console.log('obj: ', obj);


      }, [])
    ) */

      /*  const names = Object.keys(user)
    .filter((key) => key.includes("Name"))
    .reduce((obj, key) => {
        return Object.assign(obj, {
          [key]: user[key]
        });
  }, {}); */



    if(response.status === 200) {
      // ErrorMessage({
      //   msg: response.message,
      //   backgroundColor: GREEN_COLOR
      // })
    } else {
      ErrorMessage({
        msg: response.message,
        backgroundColor: RED_COLOR
      })
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
    console.log('selectedLoginIdCp: ', selectedLoginIdCp);
    dispatch(
      allocatePropertyToUser({
        user_id: selectedLoginIdCp,
        property_id: route?.params?.property_id,
      })
    );

    navigation.navigate('PropertyScreenView')
  };
  return (
    <AllocateCP
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
      // type={route?.params?.type || ""}
    />
  );
};

export default AllocatePropertyScreen;
