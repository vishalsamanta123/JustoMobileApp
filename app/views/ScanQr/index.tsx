import React from "react";
import ScanQrView from './components/ScanQr'
import { useDispatch } from "react-redux";
import { cpAppointmentCheckIn } from "app/Redux/Actions/MasterActions";

const ScanQrScreen = ({ navigation }: any) => {
    const dispatch: any = useDispatch()
    const handleBackPress = () => {
        navigation.goBack()
    }
    const handleQrScan = (id: any) => {
        dispatch(cpAppointmentCheckIn({
            appointment_id: id
        }))
        if (id !== '') {
            navigation.navigate('AppointmentDetailMain', { _id: id })
        }
    }
    return (
        <>
            <ScanQrView
                handleBackPress={handleBackPress}
                handleQrScan={handleQrScan}
            />
        </>
    )
}

export default ScanQrScreen