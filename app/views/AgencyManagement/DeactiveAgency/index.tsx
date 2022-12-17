import React, { useEffect, useState } from 'react'
import { View, Text } from 'react-native'
import LeadManagementView from './Components/LeadManagementView'
import { useDispatch, useSelector } from 'react-redux'
import { useFocusEffect } from '@react-navigation/native'
import { getAllLeadsList } from 'app/Redux/Actions/LeadsActions'
import { getCpActiveLead } from 'app/Redux/Actions/TransferVisitAction'

const DeactiveAgency = ({ navigation, route }: any) => {
  const dispatch: any = useDispatch()
  const {data} = route?.params || {}
  const { response = {}, list = "" } = useSelector((state: any) => state.transferVisitData)
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
    if (list) {
      if (offSET === 0 || offSET === undefined) {
        setVisiitorList(response?.data)
      } else {
        setVisiitorList([...visitorList, ...response?.data])
      }
    }
  }, [response])

  const getVisitorsList = (offset: any, filterData: any) => {
    setOffset(offset)
    dispatch(getCpActiveLead({
      user_id: data?._id
    }))
  }
  const handleBackPress = () => {
    navigation.goBack();
  };
  return (
    <LeadManagementView
      handleBackPress={handleBackPress}
      visitorList={visitorList}
      moreData={moreData}
      getVisitorsList={getVisitorsList}
      smData={data}
    />
  )
}

export default DeactiveAgency