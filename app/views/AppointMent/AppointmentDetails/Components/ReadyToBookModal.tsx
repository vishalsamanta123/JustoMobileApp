
import { View, Text, Image, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import Modal from "react-native-modal";
import styles from "./Styles";
import images from "../../../../assets/images";
import strings from "../../../../components/utilities/Localization";
import { Dropdown } from "react-native-element-dropdown";
import Button from "../../../../components/Button";
import InputField from "../../../../components/InputField";
import { WHITE_COLOR } from "../../../../components/utilities/constant";
import InputCalender from "app/components/InputCalender";
import moment from "moment";

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
                            editable={false}
                            dateData={(data: any) => {
                                props.setBookingData({
                                    ...props.BookingData,
                                    booking_date: moment(data).format('YYYY-MM-DD')
                                })
                            }}
                            setDateshow={(data: any) => {
                                props.setBookingData({
                                    ...props.BookingData,
                                    booking_date: moment(data).format('YYYY-MM-DD')
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
                                props.setIsVisible(false)
                                props.handleBooking()
                            }}
                            buttonText={props.doneBttnTxt ? props.doneBttnTxt : strings.Confirm} />
                    </View>
                </View>
            </Modal>
        </View>
    );
};
export default ReadyToBookModal