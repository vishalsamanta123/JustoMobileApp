import React, { useState } from 'react'
import AppointmentView from './Components/AppointmentView'

const AppointmentScreen = ({ navigation }: any) => {
  const [filterData, setFilterData] = useState({
    appointWith: '',
    status: ''
  })
  const Data: any = [
    {
      site_date: '15/10/2022',
      visitor_name: 'Meett',
      time: '11:00 AM',
      leadNo: 'JUSTO230',
      pickup: 'Yes',
      status: 'Pending',
      visit_score: '200'
    },
    {
      site_date: '15/10/2022',
      visitor_name: 'ABC',
      time: '11:00 AM',
      leadNo: 'JUSTOWW230',
      pickup: 'No',
      status: 'Done',
      visit_score: '200'
    },
    {
      site_date: '15/10/2022',
      visitor_name: 'SD SM',
      time: '11:00 AM',
      leadNo: 'JUSTO23330',
      pickup: 'Yes',
      status: 'Pending',
      visit_score: '200'
    },
  ]
  const handleDrawerPress = () => {
    navigation.toggleDrawer();
  };
  return (
    <AppointmentView
      Data={Data}
      handleDrawerPress={handleDrawerPress}
      filterData={filterData}
      setFilterData={setFilterData}
    />
  )
}

export default AppointmentScreen