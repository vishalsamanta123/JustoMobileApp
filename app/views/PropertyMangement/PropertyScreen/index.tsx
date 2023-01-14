import { useFocusEffect } from '@react-navigation/native';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllProperty, statusUpdate } from '../../../Redux/Actions/propertyActions';
import PropertyView from './components/PropertyView';

const PropertyScreen = ({ navigation }: any) => {
  const dispatch: any = useDispatch()
  const [limit, setLimit] = useState(10)
  const [oFFset, setOffset] = useState(0)
  const [currentStatus, setCurrentStatus] = useState(1)
  const [currentProperty, setCurrentProperty] = useState({})
  const [resion, setResion] = useState('')
  const [filterform, setFilterform] = useState({
    start_date: "",
    end_date: "",
    location: "",
    property_name: "",
    property_type: "",
  });
  const propertyData = useSelector((state: any) => state.propertydetailData) || []
  const { response, loading, updateStatus, list } = propertyData;

  useFocusEffect(
    React.useCallback(() => {
      getallproperty(0, {})
      return () => { };
    }, [navigation, list]))

  const handleStatusChange = () => {
    dispatch(statusUpdate({
      property_id: currentProperty,
      approve_status: currentStatus === 1 ? 2 : currentStatus === 2 ? 3 : 2,
      resion_id: resion,
    }))
  }


  const getallproperty = (offset: any, data: any) => {
    setOffset(offset)
    dispatch(getAllProperty({
      offset: offset,
      limit: 3,
      start_date: data?.start_date ? data?.start_date : '',
      end_date: data?.end_date ? data?.end_date : '',
      location: data?.location ? data?.location : '',
      property_name: data?.property_name ? data?.property_name : '',
      property_type: data?.property_type ? data?.property_type : '',
    }))
  }
  const handleDrawerPress = () => {
    navigation.toggleDrawer();
  };
  const handleAllocatePress = (item: any) => {
    // dispatch(getManagerList({
    //   property_id: item._id
    // }))
    navigation.navigate('AllocatePropertyScreen', { id: item?._id })
  }
  return (
    <>
      <PropertyView
        handleDrawerPress={handleDrawerPress}
        getallproperty={getallproperty}
        handleStatusChange={() => handleStatusChange()}
        currentStatus={currentStatus}
        setCurrentStatus={setCurrentStatus}
        setCurrentProperty={setCurrentProperty}
        setResion={setResion}
        resion={resion}
        handleAllocatePress={handleAllocatePress}
        oFFset={oFFset}
        filterform={filterform}
        setFilterform={setFilterform}
      />
    </>
  );
};

export default PropertyScreen;
