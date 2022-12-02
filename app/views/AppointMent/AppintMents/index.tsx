import React, { useEffect, useState, } from "react";
import AppointmentView from './components/Appointments'
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import { getAllAppointmentList } from "app/Redux/Actions/AppointmentWithCpActions";
import { useDispatch, useSelector } from "react-redux";

const AppointmentsScreen = ({ navigation }: any) => {
    const DATA: any = [
        {
            visitorName: 'ABC',
            siteVisitDate: '11/10/2022,11:00 PM',
            leadNo: 'JUSTO2775',
            pickup: "Yes",
            status: 'confirmatin Pending',
            visitScore: 234,
            assignTo: "Suresh ",
            source: 'DEF',
            location: 'Pune',
            age: '32',
            budget: '50L',
        },
        {
            visitorName: 'ABC',
            siteVisitDate: '11/10/2022,12:00 PM',
            leadNo: 'JUSTO2775899',
            pickup: "Yes",
            status: 'Subscribe',
            visitScore: 234,
            assignTo: "Anil",
            source: 'DESSF',
            location: 'Pune,india',
            age: '32',
            budget: '90L',
        },
        {
            visitorName: 'ABC',
            siteVisitDate: '11/10/2022,03:00 PM',
            leadNo: 'JUSTO2444',
            pickup: "Yes",
            status: 'Unsubscribe',
            visitScore: 234,
            assignTo: 'Harsh ',
            source: 'DESSF',
            location: 'Indore',
            age: '32',
            budget: '5L',
        },
        {
            visitorName: 'ABC',
            siteVisitDate: '11/10/2022,06:00 PM',
            leadNo: 'JUSTO2555',
            pickup: "Yes",
            status: 'confirmatin Pending',
            visitScore: 234,
            assignTo: 'Harsh.S',
            source: 'DEF',
            location: 'Pune',
            age: '32',
            budget: '50L',
        },
    ];
    const [dropLocisVisible, setDropLocisVisible] = useState(false)
    const [filterisVisible, setFilterisVisible] = useState(false)
    const [appointmentList, setAppointmentList] = useState<any>([])
    const [offSET, setOffset] = useState(0)
    const dispatch: any = useDispatch()
    const { response = {}, list = '' } = useSelector((state: any) => state.appointment)
    console.log('response: ', response);
    const [filterData, setFilterData] = useState({
        start_date: '',
        end_date: '',
        customer_name: '',
    })
    useFocusEffect(
        React.useCallback(() => {
            getAppointmentList(offSET)
            return () => { };
        }, [navigation, list])
    );
    useEffect(() => {
        if (list) {
            if (offSET == 0) {
                setAppointmentList(response?.data)
            } else {
                setAppointmentList([...appointmentList, ...response?.data])
            }
        }
    }, [response])
    const getAppointmentList = (offset: any) => {
        setOffset(offset)
        dispatch(getAllAppointmentList({
            offset: offset,
            limit: 3,
            start_date: filterData.start_date,
            end_date: filterData.end_date,
            customer_name: filterData.customer_name,
            appointment_type: 2
        }))
        // toGetDatas(array)
    }
    const handleDrawerPress = () => {
        navigation.toggleDrawer()
    };
    const onPressView = (items: any) => {
        navigation.navigate('AppointmentDetailMain',  items )
    };
    const handleScanQr = (items: any) => {
        navigation.navigate('ScanQr')
    };
    return (
        <>
            <AppointmentView
                filterisVisible={filterisVisible}
                setFilterisVisible={setFilterisVisible}
                handleDrawerPress={handleDrawerPress}
                onPressView={onPressView}
                DATA={appointmentList}
                handleScanQr={handleScanQr}
                dropLocisVisible={dropLocisVisible}
                setDropLocisVisible={setDropLocisVisible}
                getAppointmentList={getAppointmentList}
            />
        </>
    )
}
export default AppointmentsScreen