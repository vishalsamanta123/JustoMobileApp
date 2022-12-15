import { useFocusEffect } from '@react-navigation/native';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllProperty, statusUpdate } from '../../../Redux/Actions/propertyActions';
import PropertyView from './components/PropertyView';

const PropertyScreen = ({ navigation }: any) => {
  const dispatch: any = useDispatch()
  const [limit, setLimit] = useState(10)
  const [offset, setOffset] = useState(0)
  const [isloading, setIsloading] = useState(false)
  const [currentStatus, setCurrentStatus] = useState(1)
  const [currentProperty, setCurrentProperty] = useState({})
  const [resion, setResion] = useState('')


  const propertyData = useSelector((state: any) => state.propertydetailData) || []
  const { response, loading, updateStatus, list } = propertyData;
  console.log('response: ', response);

  useFocusEffect(
    React.useCallback(() => {
      getallproperty()
      return () => { };
    }, [navigation, list]))

  const handleStatusChange = () => {
    setIsloading(true)
    dispatch(statusUpdate({
      property_id: currentProperty,
      approve_status: currentStatus === 1 ? 2 : currentStatus === 2 ? 3 : 2,
      resion_id: resion,
    }))
  }


  const getallproperty = () => {
    dispatch(getAllProperty({
      offset: 0,
      limit: limit,

    }))
  }
  const handleDrawerPress = () => {
    navigation.toggleDrawer();
  };
  const Onreachedend = () => {
    //  setOffset(offset + 1)
    dispatch(getAllProperty({
      offset: offset + 1,
      limit: limit,
    }))
  };
  const handleAllocatePress = (item: any) => {
  console.log('item: ', item);
    // console.log('item: ', item.property_id);
    // dispatch(getManagerList({
    //   property_id: item._id
    // }))
    navigation.navigate('AllocatePropertyScreen', {id: item?._id})
  }
  return (
    <>
      <PropertyView
        handleDrawerPress={handleDrawerPress}
        Onreachedend={Onreachedend}
        getallproperty={getallproperty}
        setIsloading={setIsloading}
        handleStatusChange={() => handleStatusChange()}
        currentStatus={currentStatus}
        setCurrentStatus={setCurrentStatus}
        setCurrentProperty={setCurrentProperty}
        setResion={setResion}
        resion={resion}
        handleAllocatePress={handleAllocatePress}
      />
    </>
  );
};

export default PropertyScreen;
