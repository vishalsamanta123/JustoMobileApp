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
    const getLoginType = useSelector((state: any) => state.login);
    const { userData = {} } = useSelector((state: any) => state.userData);
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
                    item={response?.data?.length ? response?.data[0] : 0}
                    handleViewFollowUp={props.handleViewFollowUp}
                    handleVistorUpdate={props.handleVistorUpdate}
                />
            </View>
            <View style={styles.bntView}>
                <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                    <Button
                        buttonText={'Close Visit'}
                        // handleBtnPress={() => setReadyToBooK(true)}
                        width={150}
                    />
                    <Button
                        buttonText={'rescheduled'}
                        // handleBtnPress={() => props.handleUpdateStatus()}
                        width={150}
                    />
                </View>
                <View style={{ marginVertical: 10 }} />
                <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                    {userData?.data?.role_title === 'Closing Manager' ||
                        getLoginType?.response?.data?.role_title === 'Closing Manager' ?
                        <Button
                            buttonText={'Book Now'}
                            handleBtnPress={() => props.onPressBookNow()}
                            width={150}
                        /> : null
                    }
                    <Button
                        buttonText={strings.readytoBookHeader}
                        handleBtnPress={() => setReadyToBooK(true)}
                        width={150}
                    />
                </View>
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