import React, { useEffect, useState } from 'react'
import { View, Text } from 'react-native'
import LeadManagementView from './Components/LeadManagementView'
import { useDispatch, useSelector } from 'react-redux'
import { useFocusEffect } from '@react-navigation/native'
import { getAllLeadsList } from 'app/Redux/Actions/LeadsActions'

const LeadManagementScreen = ({ navigation }: any) => {
  const dispatch: any = useDispatch()
  const { response = {}, list = "" } = useSelector((state: any) => state.visitorDataList)
  const moreData = response?.total_data || 0
  const [filterData, setFilterData] = useState({
    startdate: '',
    enddate: '',
    search_by_visisor_name: '',
    search_configuration: '',
    visit_score: ''
  })
  const [visitorList, setVisiitorList] = useState<any>([])
  const [offSET, setOffset] = useState(0)

  useFocusEffect(
    React.useCallback(() => {
      getVisitorsList(0, {})
      return () => { };
    }, [navigation])
  );

  useEffect(() => {
    if (response?.status === 200) {
      if (offSET === 0 || offSET === undefined) {
        setVisiitorList(response?.data)
      } else {
        setVisiitorList([...visitorList, ...response?.data])
      }
    }
  }, [response])

  const getVisitorsList = (offset: any, filterData: any) => {
    setOffset(offset)
    dispatch(getAllLeadsList({
      offset: offset,
      limit: 3,
      start_date: filterData?.startdate ? filterData?.startdate : '',
      end_date: filterData?.enddate ? filterData?.enddate : '',
      search_by_visisor_name: filterData?.search_by_visisor_name ? filterData?.search_by_visisor_name : '',
      search_configuration: filterData?.search_configuration ? filterData?.search_configuration : '',
      visit_score: filterData?.visit_score ? filterData?.visit_score : ''
    }))
  }
  const handleDrawerPress = () => {
    navigation.toggleDrawer();
  };
  return (
    <LeadManagementView
      handleDrawerPress={handleDrawerPress}
      visitorList={visitorList}
      moreData={moreData}
      getVisitorsList={getVisitorsList}
      filterData={filterData}
      setFilterData={setFilterData}
    />
  )
}

export default LeadManagementScreen