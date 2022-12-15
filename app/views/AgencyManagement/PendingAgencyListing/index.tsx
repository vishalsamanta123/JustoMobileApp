import { useFocusEffect } from '@react-navigation/native';
import { getAllPendingAgentList } from 'app/Redux/Actions/AgencyActions';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PendingAgencyView from './components/PendingAgencyView';

const PendingAgencyListing = ({ navigation }: any) => {

  const [pendingAgencyList, setPendingAgency] = useState<any>([])
  const [offSET, setOffset] = useState(0)
  const dispatch: any = useDispatch()
  const { response = {}, } = useSelector((state: any) => state.agency) || {}
  const [filterData, setFilterData] = useState({
    start_date: '',
    end_date: '',
    followup_for: ''
  })

  useFocusEffect(
    React.useCallback(() => {
      getPendingList()
      return () => { };
    }, [navigation])
  );
  useEffect(() => {
    if (response?.status) {
      setPendingAgency(response?.data)
    }
  }, [response])
  const getPendingList = () => {
    dispatch(getAllPendingAgentList({}))
  }

  const handleBackPress = () => {
    navigation.goBack();
  };
  return <PendingAgencyView
    pendingAgencyList={pendingAgencyList}
    handleBackPress={handleBackPress} />;
};

export default PendingAgencyListing;
