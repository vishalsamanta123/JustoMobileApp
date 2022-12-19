import moment from "moment";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPropertyConfig } from "app/Redux/Actions/MasterActions";
import BookingView from "./components/Booking";
import { Alert } from "react-native";
import { AddBooking, removeAddBookingData } from "app/Redux/Actions/AppointmentCLAction";
import { GREEN_COLOR, RED_COLOR } from "app/components/utilities/constant";
import ErrorMessage from "app/components/ErrorMessage";
import { updateBookingDetailStatus } from "app/Redux/Actions/BookingActions";

const BookingScreen = ({ navigation, route }: any) => {
    const { getBookingData = {}, type = '' } = route?.params || {}
    const dispatch: any = useDispatch()
    const [bookingData, setBookingData] = useState({
        lead_id: getBookingData?.lead_id ? getBookingData?.lead_id : '',
        property_id: getBookingData?.property_id ? getBookingData?.property_id : "",
        customer_id: getBookingData?.customer_id ? getBookingData?.customer_id : "",
        booking_amount: '',
        tranjection_upi_cheque_number: '',
        payment_type: 2,
        booking_date: moment(new Date()).format(),
        cheque_image: '',
        coniguration: '',
        coniguration_id: "",
        quantity: "",
        description: '',
        booking_id: getBookingData?._id ? getBookingData?._id : ''
    })
    const masterData = useSelector((state: any) => state.masterData) || {}
    const addedBookingData = useSelector((state: any) => state.addedBooking) || {}
    const {response = {}} = useSelector((state: any) => state.booking) || {}
    const [masterDatas, setMasterDatas] = useState<any>([])
    useEffect(() => {
        dispatch(getPropertyConfig({
            module_id: '',
            property_id: getBookingData?.property_id ? getBookingData?.property_id : "",
        }))
    }, [navigation])
    useEffect(() => {
        if (masterData?.response?.status === 200) {
            setMasterDatas(masterData?.response?.data?.length > 0 ? masterData?.response?.data : [])
        }
    }, [masterData])
    useEffect(() => {
        if (addedBookingData?.response?.status === 200) {
            dispatch(removeAddBookingData())
            ErrorMessage({
                msg: addedBookingData?.response?.message,
                backgroundColor: GREEN_COLOR
            })
            handleBackPress()
        }
    }, [addedBookingData])



    const [browse, setBrowse] = useState(false)
    const handleBackPress = () => {
        navigation.goBack(null)
    }
    const validation = () => {
        let isError = true;
        let errorMessage: any = ''
        if (bookingData.booking_amount == undefined || bookingData.booking_amount == '') {
            isError = false;
            errorMessage = "Booking Amount is require. Please enter Booking Amount"
        } else if (bookingData.tranjection_upi_cheque_number == undefined ||
            bookingData.tranjection_upi_cheque_number == '') {
            isError = false;
            errorMessage = "Cheque Number is require. Please enter cheque number"
        } else if (typeof bookingData.cheque_image != 'object' || bookingData.cheque_image == '') {
            isError = false;
            errorMessage = "Cheque Image is require. Please select cheque image"
        } else if (bookingData.coniguration_id == undefined || bookingData.coniguration_id == '') {
            isError = false;
            errorMessage = "Purchase Configuration is require. Please select purchase configuration"
        } else if (bookingData.quantity == undefined || bookingData.quantity == '') {
            isError = false;
            errorMessage = "Quantity is require. Please enter quantity"
        } else if (bookingData.description == undefined || bookingData.description == '') {
            isError = false;
            errorMessage = "Comment is require. Please enter description"
        }
        if (errorMessage !== '') {
            ErrorMessage({
                msg: errorMessage,
                backgroundColor: RED_COLOR
            })
        }
        return isError;
    }
    const handleBookPress = () => {
        if (validation()) {
            const newFormdata = new FormData();
            if (typeof bookingData?.cheque_image === 'object') {
                newFormdata.append("cheque_image", bookingData.cheque_image)
            }
            newFormdata.append("lead_id", bookingData.lead_id)
            newFormdata.append("customer_id", bookingData.customer_id)
            newFormdata.append("property_id", bookingData.property_id)
            newFormdata.append("coniguration", bookingData.coniguration)
            newFormdata.append("coniguration_id", bookingData.coniguration_id)
            newFormdata.append("quantity", bookingData.quantity)
            newFormdata.append("booking_amount", bookingData.booking_amount)
            newFormdata.append("tranjection_upi_cheque_number", bookingData.tranjection_upi_cheque_number)
            newFormdata.append("payment_type", bookingData.payment_type)
            newFormdata.append("booking_date", bookingData.booking_date)
            newFormdata.append("description", bookingData.description)
            newFormdata.append("booking_status", 2)
            if (type === 'readyToBook') {
            newFormdata.append("booking_id", bookingData?.booking_id)
            }
            if (type === 'readyToBook') {
                dispatch(updateBookingDetailStatus(newFormdata))
            }else{
                dispatch(AddBooking(newFormdata))
            }
        }
    }
    return (
        <>
            <BookingView
                handleBackPress={handleBackPress}
                browse={browse}
                setBrowse={setBrowse}
                handleBookPress={handleBookPress}
                setBookingData={setBookingData}
                bookingData={bookingData}
                masterDatas={masterDatas}
            />
        </>
    )
}
export default BookingScreen