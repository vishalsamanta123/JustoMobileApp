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
import CancelModal from './CancelBooking';

const AppointmentDetailsView = (props: any) => {
    const getLoginType = useSelector((state: any) => state.login);
    const { userData = {} } = useSelector((state: any) => state.userData) || [];
    const insets = useSafeAreaInsets();
    const [readyToBooK, setReadyToBooK] = useState(false)
    const [cancelAppoitment, setCancelAppoitment] = useState(false)
    const { response = {}, detail = '' } = useSelector((state: any) => state.appointment) || []
    const data = response?.data?.length > 0 ? response?.data[0] : []
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
                    item={response?.data?.length > 0 ? response?.data[0] : []}
                    handleViewFollowUp={props.handleViewFollowUp}
                    handleVistorUpdate={props.handleVistorUpdate}
                />
            </View>
            {userData?.data?.role_title === 'Closing Manager' ?
                data?.assign_appoinment ? (
                    <View style={styles.bntView}>
                        {data?.status !== 5 && data?.status !== 4 && data?.status !== 3 ?
                            <>
                                <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                                    <Button
                                        buttonText={'Close Visit'}
                                        handleBtnPress={() => setCancelAppoitment(true)}
                                        width={150}
                                    />
                                    <Button
                                        buttonText={'Update'}
                                        handleBtnPress={() => props.handleUpdateStatus()}
                                        width={150}
                                    />
                                </View>
                                <View style={{ marginVertical: 10 }} />
                                <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                                    {userData?.data?.role_title === 'Closing Manager' || userData?.data?.role_title === 'Closing TL' ||
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
                            </>
                            : null
                        }
                    </View>
                ) : null
                :
                <View style={styles.bntView}>
                    {data?.status !== 5 && data?.status !== 4 && data?.status !== 3 ?
                        <>
                            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                                <Button
                                    buttonText={'Close Visit'}
                                    handleBtnPress={() => setCancelAppoitment(true)}
                                    width={150}
                                />
                                <Button
                                    buttonText={'Update'}
                                    handleBtnPress={() => props.handleUpdateStatus()}
                                    width={150}
                                />
                            </View>
                            <View style={{ marginVertical: 10 }} />
                            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                                {userData?.data?.role_title === 'Closing Manager' || userData?.data?.role_title === 'Closing TL' ||
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
                        </>
                        : null
                    }
                </View>
            }
            <ReadyToBookModal
                Visible={readyToBooK}
                setIsVisible={() => setReadyToBooK(false)}
                setBookingData={props.setBookingData}
                BookingData={props.BookingData}
                handleBooking={props.handleBooking}
            />
            {/* <CancelModal
                Visible={cancelAppoitment}
                setIsVisible={() => setCancelAppoitment(false)}
                data={[{
                    lead_id: response?.data?.length > 0 ? response?.data[0]?.lead_id : [],
                    appointment_id: response?.data?.length > 0 ? response?.data[0]?._id : [],
                    cancle_type: 2,  //1=lead, 2=appoinment
                    resion: '',
                    property_id: response?.data?.length > 0 ? response?.data[0]?.property_id : []
                }]}
            /> */}
            <CancelModal
                cancelDataPress={() => props.onpressCloseVisit({
                    lead_id: response?.data?.length > 0 ? response?.data[0]?.lead_id : [],
                    appointment_id: response?.data?.length > 0 ? response?.data[0]?._id : [],
                    cancle_type: 2,  //1=lead, 2=appoinment
                })}
                Visible={cancelAppoitment}
                setIsVisible={setCancelAppoitment}
                cancelValue={props.cancelValue}
                item={response?.data?.length > 0 ? response?.data : []}
                setCancelValue={props.setCancelValue}
            />
        </View>
    )
}

export default AppointmentDetailsView