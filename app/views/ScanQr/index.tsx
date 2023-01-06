import React from "react";
import ScanQrView from './components/ScanQr'

const ScanQrScreen = ({ navigation }: any) => {
    const handleBackPress = () => {
        navigation.goBack()
    }
    const handleQrScan = (id: any) => {
    console.log('id: ', id);
        if(id !== ''){
            navigation.navigate('AppointmentDetailMain', {_id: id})
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