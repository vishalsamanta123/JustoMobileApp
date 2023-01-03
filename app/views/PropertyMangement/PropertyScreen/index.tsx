import { useFocusEffect } from '@react-navigation/native';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllProperty, statusUpdate } from '../../../Redux/Actions/propertyActions';
import PropertyView from './components/PropertyView';

const PropertyScreen = ({ navigation }: any) => {
  const dispatch: any = useDispatch()
  const [limit, setLimit] = useState(10)
  const [offset, setOffset] = useState(0)
  const [currentStatus, setCurrentStatus] = useState(1)
  const [currentProperty, setCurrentProperty] = useState({})
  const [resion, setResion] = useState('')
  const propertyData = useSelector((state: any) => state.propertydetailData) || []
  const { response, loading, updateStatus, list } = propertyData;

  useFocusEffect(
    React.useCallback(() => {
      getallproperty(0)
      return () => { };
    }, [navigation, list]))

  const handleStatusChange = () => {
    dispatch(statusUpdate({
      property_id: currentProperty,
      approve_status: currentStatus === 1 ? 2 : currentStatus === 2 ? 3 : 2,
      resion_id: resion,
    }))
  }


  const getallproperty = (OFFset: any) => {
    console.log('Offset ======', OFFset)
    setOffset(OFFset)
    dispatch(getAllProperty({
      offset: OFFset,
      limit: 3,
    }))
  }
  const handleDrawerPress = () => {
    navigation.toggleDrawer();
  };
  // const Onreachedend = () => {
  //   //  setOffset(offset + 1)
  //   dispatch(getAllProperty({
  //     offset: offset + 1,
  //     limit: limit,
  //   }))
  // };
  const handleAllocatePress = (item: any) => {
    // dispatch(getManagerList({
    //   property_id: item._id
    // }))
    navigation.navigate('AllocatePropertyScreen', {id: item?._id})
  }
  return (
    <>
      <PropertyView
        handleDrawerPress={handleDrawerPress}
        // Onreachedend={Onreachedend}
        getallproperty={getallproperty}
        handleStatusChange={() => handleStatusChange()}
        currentStatus={currentStatus}
        setCurrentStatus={setCurrentStatus}
        setCurrentProperty={setCurrentProperty}
        setResion={setResion}
        resion={resion}
        handleAllocatePress={handleAllocatePress}
        oFFset={offset}
      />
    </>
  );
};

export default PropertyScreen;
