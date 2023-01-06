import React, { useEffect, useState, } from "react";
import AppointmentView from './components/Appointments'
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import { getAllAppointmentList } from "app/Redux/Actions/AppointmentWithCpActions";
import { useDispatch, useSelector } from "react-redux";
import { getClosingManagerList } from "app/Redux/Actions/ClosingManager";
import { AllocateCM } from "app/Redux/Actions/AppointmentCLAction";
import { getAllPickupList } from "app/Redux/Actions/PickUpActions";
import { handlePermission, openPermissionSetting } from "app/components/utilities/GlobalFuncations";
import strings from "app/components/utilities/Localization";

const AppointmentsScreen = ({ navigation }: any) => {
    const [dropLocisVisible, setDropLocisVisible] = useState(false)
    const [filterisVisible, setFilterisVisible] = useState(false)
    const [appointmentList, setAppointmentList] = useState<any>([])
    const [ClosingMList, setClosingMList] = useState<any>([])
    const [allocatedCM, setAllocatedCM] = useState({})
    const [offSET, setOffset] = useState(0)
    const dispatch: any = useDispatch()
    const { response = {}, list = '' } = useSelector((state: any) => state.appointment) || [];
    const CMList = useSelector((state: any) => state.ClosingManager) || {}
    const appointMentList = useSelector((state: any) => state.Pickup) || {}
    const getLoginType = useSelector((state: any) => state.login);

    const [filterData, setFilterData] = useState({
        start_date: '',
        end_date: '',
        customer_name: '',
    })
    useFocusEffect(
        React.useCallback(() => {
            setAppointmentList([])
            getAppointmentList(0, {})
            return () => { };
        }, [navigation, list, getLoginType])
    );
    useEffect(() => {
        if (getLoginType?.response?.data?.role_title === 'Closing Manager') {
            if (appointMentList?.response?.status === 200) {
                if (offSET == 0) {
                    setAppointmentList(appointMentList?.response?.data)
                } else {
                    setAppointmentList([...appointmentList,
                    ...appointMentList?.response?.data])
                }
            } else {
                setAppointmentList([])
            }
        } else {
            if (response?.status === 200) {
                if (response?.data?.length > 0) {
                    if (offSET == 0) {
                        setAppointmentList(response?.data)
                    } else {
                        setAppointmentList([...appointmentList, ...response?.data])
                    }
                }
            } else {
                setAppointmentList([])
            }
        }
    }, [response, appointMentList, getLoginType])
    useEffect(() => {
        if (CMList?.response === 200) {
            setClosingMList(CMList?.response?.data)
        } else {
            setClosingMList([])
        }
    }, [CMList])

    const getAppointmentList = (offset: any, data: any) => {
        if (getLoginType?.response?.data?.role_title === 'Closing Manager') {
            setOffset(offset)
            dispatch(getAllPickupList({
                offset: offset,
                limit: 3,
                start_date: data?.start_date ? data?.start_date : '',
                end_date: data?.end_date ? data?.end_date : '',
                customer_name: data?.customer_name ? data?.customer_name : '',
                appointment_type: 2
            }))
        } else {
            setOffset(offset)
            dispatch(getAllAppointmentList({
                offset: offset,
                limit: 3,
                start_date: data?.start_date ? data?.start_date : '',
                end_date: data?.end_date ? data?.end_date : '',
                customer_name: data?.customer_name ? data?.customer_name : '',
                appointment_type: 2
            }))
        }

    }
    const handleDrawerPress = () => {
        navigation.toggleDrawer()
    };
    const onPressView = (items: any) => {
        navigation.navigate('AppointmentDetailMain', items)
    };
    const handleScanQr = async (items: any) => {
        const res = await handlePermission(
            'camera',
            strings.txt_setting_heading_camera,
            strings.txt_setting_description_camera,
        );
        console.log('res', res)

        if (res == 'setting1') {
            openPermissionSetting(
                strings.txt_setting_heading_camera,
                strings.txt_setting_description_camera,
            );
        } else if (res) {
            navigation.navigate('ScanQr')
        }
    };

    const getCMList = () => {
        dispatch(getClosingManagerList({}))
    }

    const handleAllocateCM = () => {
        dispatch(AllocateCM(allocatedCM))
    }
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
                getCMList={getCMList}
                ClosingMList={ClosingMList}
                setAllocatedCM={setAllocatedCM}
                allocatedCM={allocatedCM}
                handleAllocateCM={handleAllocateCM}
                offSET={offSET}
                moreData={getLoginType?.response?.data?.role_title === 'Closing Manager'? appointMentList?.response?.total_data : response?.total_data}
                filterData={filterData}
                setFilterData={setFilterData}
                setAppointmentList={setAppointmentList}
            />
        </>
    )
}
export default AppointmentsScreen