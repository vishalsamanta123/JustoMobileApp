
import { View, Text, Image, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import Modal from "react-native-modal";
import styles from "./Styles";
import images from "../../../../assets/images";
import strings from "../../../../components/utilities/Localization";
import { Dropdown } from "react-native-element-dropdown";
import Button from "../../../../components/Button";
import InputField from "../../../../components/InputField";
import { DATE_FORMAT, WHITE_COLOR } from "../../../../components/utilities/constant";
import InputCalender from "app/components/InputCalender";
import moment from "moment";
import ErrorMessage from "app/components/ErrorMessage";

const ReadyToBookModal = (props: any) => {
    return (
        <View>
            <Modal isVisible={props.Visible}>
                <View style={styles.bookingModelVw}>
                    <View style={styles.topContainer}>
                        <Text style={styles.topTxt}>{'Booking Confirmation'}</Text>
                        <View>
                            <TouchableOpacity onPress={() => props.setIsVisible(false)}>
                                <Image source={images.close} style={styles.closeIcon} />
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={styles.inputWrap}>
                        <InputCalender
                            mode={'date'}
                            leftIcon={images.event}
                            placeholderText={"Booking Date"}
                            minimumDate={new Date()}
                            editable={false}
                            dateData={(data: any) => {
                                props.setBookingData({
                                    ...props.BookingData,
                                    booking_date: moment(data).format(DATE_FORMAT)
                                })
                            }}
                            setDateshow={(data: any) => {
                                props.setBookingData({
                                    ...props.BookingData,
                                    booking_date: moment(data).format(DATE_FORMAT)
                                })
                            }}
                            value={props.BookingData?.booking_date}
                        />
                    </View>
                    <View style={styles.inputWrap}>
                        <InputField
                            placeholderText={"Comment"}
                            handleInputBtnPress={() => { }}
                            inputheight={80}
                            valueshow={props.BookingData?.description}
                            onChangeText={(val: any) => {
                                props.setBookingData({
                                    ...props.BookingData,
                                    description: val
                                })
                            }}
                        />
                    </View>
                    <View style={{ marginVertical: 20 }}>
                        <Button
                            handleBtnPress={() => {
                                if (props?.BookingData?.booking_date) {
                                    props.setIsVisible(false)
                                    props.handleBooking()
                                } else {
                                    ErrorMessage({
                                        msg: 'Please Enter the Booking Date',
                                        backgroundColor: 'red'
                                    })
                                }
                            }}
                            buttonText={props.doneBttnTxt ? props.doneBttnTxt : strings.Confirm} />
                    </View>
                </View>
            </Modal>
        </View>
    );
};
export default ReadyToBookModal