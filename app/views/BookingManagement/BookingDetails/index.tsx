import { useFocusEffect } from "@react-navigation/native";
import ErrorMessage from "app/components/ErrorMessage";
import { GREEN_COLOR, RED_COLOR } from "app/components/utilities/constant";
import { getBookingDetail, updateBookingDetailStatus, cancelBooking, removeBooking }
    from "app/Redux/Actions/BookingActions";
import { competitorpropertyReducer } from "app/Redux/Reducers/propertyReducers";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import BookingDetailsView from './components/BookingDetails'

const BookingDetailsScreen = ({ navigation, route }: any) => {
    const { data = {}, type = '' } = route?.params || {}
    const dispatch: any = useDispatch()
    const [cancelBookingModel, setCancelBookingModel] = useState(false)
    const [cancelValue, setCancelValue] = useState({
        reason: '',
        property_id: '',
        comment: '',
        property_name: '',
        remark: '',
    });
    const { response = {}, detail = "" } = useSelector(
        (state: any) => state.booking)
    const cancelBookingData = useSelector((state: any) => state.cancelBooking)
    useFocusEffect(
        React.useCallback(() => {
            dispatch(
                getBookingDetail({
                    booking_id: data?._id
                })
            )
            return () => { };
        }, [navigation, detail])
    );
    const handleBackPress = () => {
        navigation.goBack()
    }
    const handleStatusUpdate = () => {
        navigation.navigate('FollUpAdd')
    }

    useEffect(() => {
        if (cancelBookingData?.response?.status === 200) {
            ErrorMessage({
                msg: cancelBookingData?.response?.message,
                backgroundColor: GREEN_COLOR
            })
            dispatch(removeBooking())
            setCancelValue({
                reason: '',
                property_id: '',
                comment: '',
                property_name: '',
                remark: '',
            })
        }
    }, [cancelBookingData])
    const cancelBookingPress = () => {
        const params = {
            module_id: "",
            booking_id: data?._id,
            booking_status: 4,
            resion: cancelValue.reason,
            competitor_id: cancelValue.property_id,
            competitor_name: cancelValue.property_name,
            remark: cancelValue.remark
        }
        dispatch(cancelBooking(params))
    }
    const onPressBookNow = () => {
        navigation.navigate('Booking', { getBookingData: response?.data?.length > 0 ? response?.data[0] : [], type: 'readyToBook' })
    }
    return (
        <>
            <BookingDetailsView
                handleBackPress={handleBackPress}
                cancelBookingModel={cancelBookingModel}
                setCancelBookingModel={setCancelBookingModel}
                handleStatusUpdate={handleStatusUpdate}
                cancelValue={cancelValue}
                setCancelValue={setCancelValue}
                cancelBookingPress={cancelBookingPress}
                type={type}
                onPressBookNow={onPressBookNow}
            />
        </>
    )
}
export default BookingDetailsScreen