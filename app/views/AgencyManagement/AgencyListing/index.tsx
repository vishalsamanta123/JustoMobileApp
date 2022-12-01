import { useFocusEffect } from '@react-navigation/native';
import { AgencyCreateFormRemove, getAllAgentList } from 'app/Redux/Actions/AgencyActions';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AgencyView from './components/AgencyView';

const AgencyListing = ({navigation}: any) => {
  const { response = {}, list = false } = useSelector((state: any) => state.agentData)
  const moreData = response?.total_data || 0
  const [agentList, setAgentList] = useState<any>([])
  const [offSET, setOffset] = useState(0)
  const [filterData, setFilterData] = useState({
    startdate: '',
    enddate: '',
    search_by_name: '',
    search_by_location: '',
    status: ''
  })
  const [changeStatus, setChangeStatus] = useState({ _id: '', status: false })
  const dispatch: any = useDispatch()

  useFocusEffect(
    React.useCallback(() => {
      getAgentList(offSET, {})
      return () => { };
    }, [navigation])
  );

  useEffect(() => {
    if (list) {
      if (offSET === 0) {
        setAgentList(response?.data)
      } else {
        setAgentList([...agentList, ...response?.data])
      }
    }
  }, [response])

  const getAgentList = (offset: any, filterData: any) => {
    setOffset(offset)
    dispatch(getAllAgentList({
      offset: offset,
      limit: 3,
      module_id: '',
      start_date: filterData?.startdate ? filterData?.startdate : '',
      end_date: filterData?.enddate ? filterData?.enddate : '',
      user_type: 2,
      search_by_name: filterData?.search_by_name ? filterData?.search_by_name : '',
      search_by_location: filterData?.search_by_location ? filterData?.search_by_location : '',
      status: filterData?.status ? filterData?.status : '',
    }))
  }

  const handleDrawerPress = () => {
    navigation.toggleDrawer();
  };
  const handleStatusChange = () => {
    // dispatch(statusUpdate({
    //   cp_id: changeStatus?._id,
    //   status: changeStatus?.status ? false : true,
    // }))
    // dispatch(getAllAgentList({
    //   offset: 0,
    //   limit: 3,
    //   module_id: '',
    //   start_date: '',
    //   end_date: '',
    //   user_type: 2,
    //   search_by_name: '',
    //   search_by_location: '',
    //   status: ''
    // }))
    setChangeStatus({ _id: '', status: false })
  }
  const onPressView = (data: any, type: any) => {
    if (type === 'edit') {
      navigation.navigate('AddnewAgency', { type, data })
    } else {
      if (type === 'view') {
        navigation.navigate('AgencyDetails', { data })
      }
    }
  }
  const Onreachedend = (offSet: any) => {
    setOffset(offSet)
    dispatch(getAllAgentList({
      offset: offSet,
      limit: 3,
      module_id: '',
      start_date: filterData.startdate,
      end_date: filterData.enddate,
      user_type: 2,
      search_by_name: filterData.search_by_name,
      search_by_location: filterData.search_by_location,
      status: filterData.status,
    }))
  };
  return <AgencyView
      handleDrawerPress={handleDrawerPress}
      setChangeStatus={setChangeStatus}
      handleStatusChange={handleStatusChange}
      setFilterData={setFilterData}
      filterData={filterData}
      onPressView={onPressView}
      agentList={agentList}
      Onreachedend={Onreachedend}
      offSET={offSET}
      moreData={moreData}
      getAgentList={getAgentList}
      setOffset={setOffset}
      setAgentList={setAgentList} />;
};

export default AgencyListing;
