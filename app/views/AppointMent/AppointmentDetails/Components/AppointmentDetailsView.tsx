import { View, Text, StatusBar } from 'react-native'
import React, { useState } from 'react'
import styles from './Styles'
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { PRIMARY_THEME_COLOR_DARK } from '../../../../components/utilities/constant';
import Header from '../../../../components/Header';
import images from '../../../../assets/images';
import strings from '../../../../components/utilities/Localization';
import AppointmentDtailsItem from './AppointmentDtailsItem';
import Button from '../../../../components/Button';
import { useSelector } from 'react-redux';
import ReadyToBookModal from './ReadyToBookModal';

const AppointmentDetailsView = (props: any) => {
    const insets = useSafeAreaInsets();
    const [readyToBooK, setReadyToBooK] = useState(false)
    const { response = {}, detail = '' } = useSelector((state: any) => state.appointment)
    return (
        <View style={styles.mainContainer}>
            <Header
                leftImageSrc={images.backArrow}
                rightSecondImageScr={images.notification}
                headerText={strings.appointmnetdetail}
                leftImageIconStyle={styles.RightFirstIconStyle}
                handleOnLeftIconPress={props.handleBackPress}
                headerStyle={styles.headerStyle}
            />
            <View style={styles.propertyListView}>
                <AppointmentDtailsItem
                    item={response?.data}
                    handleUpdateStatus={props.handleUpdateStatus}
                    handleVistorUpdate={props.handleVistorUpdate}
                />
            </View>
            <View style={styles.bntView}>
                <Button buttonText={strings.updatestatus} handleBtnPress={() => props.handleUpdateStatus()} />
                <View style={{ marginVertical: 10 }} />
                <Button buttonText={strings.readytoBookHeader} handleBtnPress={() => setReadyToBooK(true)} />
            </View>
            <ReadyToBookModal
                Visible={readyToBooK}
                setIsVisible={() => setReadyToBooK(false)}
                setBookingData={props.setBookingData}
                BookingData={props.BookingData}
                handleBooking={props.handleBooking}
            />
        </View>
    )
}

export default AppointmentDetailsView