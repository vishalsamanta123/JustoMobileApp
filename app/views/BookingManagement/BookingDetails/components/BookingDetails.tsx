import React from "react";
import { View, Text, Image } from 'react-native';
import images from "../../../../assets/images";
import Button from "../../../../components/Button";
import Header from "../../../../components/Header";
import { PRIMARY_THEME_COLOR, PRIMARY_THEME_COLOR_DARK, WHITE_COLOR } from "../../../../components/utilities/constant";
import strings from "../../../../components/utilities/Localization";
import styles from "./styles";
import BookingDetailsIteam from './BookingDetailsIteam'
import CancelModal from "./CancelBooking";
import { useSelector } from "react-redux";

const BookingDetailsView = (props: any) => {
    const { response = {}, detail = "" } = useSelector(
        (state: any) => state.booking)
    console.log('response: ', response?.data);
    return (
        <View style={styles.mainContainer}>
            <Header
                leftImageSrc={images.backArrow}
                rightSecondImageScr={images.notification}
                headerText={strings.bookingDetails}
                leftImageIconStyle={styles.RightFirstIconStyle}
                handleOnLeftIconPress={props.handleBackPress}
                headerStyle={styles.headerStyle}
                statusBarColor={PRIMARY_THEME_COLOR}
                barStyle={'light-content'}
            />
            <View style={styles.detailsItemView}>
                <BookingDetailsIteam item={response?.data?.length > 0 ? response?.data : []} />
            </View>
            <View style={styles.btnContainer}>
                <Button
                    buttonText={strings.Statusupdate}
                    width={150}
                    height={45}
                    bgcolor={PRIMARY_THEME_COLOR_DARK}
                    btnTxtcolor={WHITE_COLOR}
                    btnTxtsize={12}
                    textTransform={"uppercase"}
                    handleBtnPress={() => props.handleStatusUpdate()}
                />
                <Button
                    buttonText={strings.cancelBooking}
                    width={150}
                    height={45}
                    bgcolor={PRIMARY_THEME_COLOR_DARK}
                    btnTxtcolor={WHITE_COLOR}
                    btnTxtsize={14}
                    textTransform={"uppercase"}
                    handleBtnPress={() => props.setCancelBookingModel(true)}
                />
                <CancelModal
                    cancelDataPress={props.cancelBookingPress}
                    Visible={props.cancelBookingModel}
                    setIsVisible={props.setCancelBookingModel}
                    cancelValue={props.cancelValue}
                    setCancelValue={props.setCancelValue}
                />
            </View>
        </View>
    )
}
export default BookingDetailsView