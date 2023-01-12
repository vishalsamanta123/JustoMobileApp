
import { View, Text, Image, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import Modal from "react-native-modal";
import styles from "app/components/Modals/styles";
import Styles from './styles'
import images from "app/assets/images";
import strings from "app/components/utilities/Localization";
import Button from "app/components/Button";
import InputField from "app/components/InputField";
import { normalizeSpacing } from "app/components/scaleFontSize";

const ReAllocateModal = (props: any) => {
    return (
        <Modal isVisible={props.Visible}>
            <View style={Styles.bookingModelVw}>
                <View style={styles.topContainer}>
                    <Text style={styles.topTxt}>{'Re-Allocate to Closing Manager'}</Text>
                    <View>
                        <TouchableOpacity onPress={() => props.setIsVisible(false)}>
                            <Image source={images.close} style={styles.closeIcon} />
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={[styles.inputWrap, { top: normalizeSpacing(5) }]}>
                    <InputField
                        placeholderText={"Comment"}
                        headingText={"Comment"}
                        handleInputBtnPress={() => { }}
                        inputheight={80}
                        multiline={true}
                        valueshow={props?.reAllocateData?.comment}
                        onChangeText={(val: any) => {
                            props.setReAllocateData({
                                ...props.reAllocateData,
                                comment: val
                            })
                        }}
                    />
                </View>
                <View style={{ marginVertical: 20 }}>
                    <Button
                        handleBtnPress={() => {
                            // if (props?.BookingData?.booking_date) {
                            props.setIsVisible(false)
                            //     props.handleBooking()
                            // } else {
                            //     ErrorMessage({
                            //         msg: 'Please Enter the Booking Date',
                            //         backgroundColor: 'red'
                            //     })
                            // }
                        }}
                        buttonText={strings.reAllocate} />
                </View>
            </View>
        </Modal>
    );
};
export default ReAllocateModal