import { useFocusEffect } from "@react-navigation/native";
import ErrorMessage from "app/components/ErrorMessage";
import { GREEN_COLOR, RED_COLOR } from "app/components/utilities/constant";
import { getBookingDetail, updateBookingDetailStatus, cancelBooking, removeBooking, addRegistration, getBookingRegisterDetail }
    from "app/Redux/Actions/BookingActions";
import { competitorpropertyReducer } from "app/Redux/Reducers/propertyReducers";
import React, { useEffect, useState } from "react";
import { Alert } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import BookingDetailsView from './components/BookingDetails'

const BookingDetailsScreen = ({ navigation, route }: any) => {
    const { data = {}, type = '' } = route?.params || {}
    const dispatch: any = useDispatch()
    const [cancelBookingModel, setCancelBookingModel] = useState(false)
    const [reAllocateModel, setReAllocateModel] = useState(false)
    const [registerModal, setRegisterModal] = useState(false)
    const [documentBrowse, setDocumentBrowse] = useState(false)
    const [cancelValue, setCancelValue] = useState({
        reason: '',
        property_id: '',
        comment: '',
        property_name: '',
        remark: '',
    });
    const [reAllocateData, setReAllocateData] = useState({
        comment: '',
    });
    const [registerNowData, setRegisterNowData] = useState({
        register_date: '',
        documents: [],
        total_amount: '',
        total_amount_type: 'L',
    });
    const { response = {}, detail = "" } = useSelector(
        (state: any) => state.booking)
    const cancelAddBookingData = useSelector((state: any) => state.cancelAddBooking)
    useFocusEffect(
        React.useCallback(() => {
            if (type === 'register') {
                if (data?._id) {
                    dispatch(
                        getBookingRegisterDetail({
                            registration_id: data?._id
                        })
                    )
                }
            } else {
                if (data?._id) {
                    dispatch(
                        getBookingDetail({
                            booking_id: data?._id
                        })
                    )
                }
            }
            return () => { };
<<<<<<< HEAD
        }, [navigation, detail, cancelAddBookingData])
=======
        }, [navigation, detail, cancelBookingData])
>>>>>>> e31c94185f9a627d78b295bbd530883db38ff3ed
    );
    const handleBackPress = () => {
        navigation.goBack()
    }
    const handleStatusUpdate = () => {
        navigation.navigate('FollUpAdd')
    }

    useEffect(() => {
        if (cancelAddBookingData?.response?.status === 200) {
            ErrorMessage({
                msg: cancelAddBookingData?.response?.message,
                backgroundColor: GREEN_COLOR
            })
            dispatch(removeBooking())
            navigation.goBack()
            setCancelValue({
                reason: '',
                property_id: '',
                comment: '',
                property_name: '',
                remark: '',
            })
            setRegisterNowData({
                register_date: '',
                documents: [],
                total_amount: '',
                total_amount_type: 'L',
            })
        }
    }, [cancelAddBookingData])
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
    const validationRegisterNow = () => {
        let isError = true;
        let errorMessage: any = "";
        if (registerNowData.register_date == undefined ||
            registerNowData.register_date == "") {
            isError = false;
            errorMessage = "Register Date is require. Please select Register Date";
        } else if (registerNowData.total_amount == undefined ||
            registerNowData.total_amount == "") {
            isError = false;
            errorMessage = "Total Amount is require. Please select Total Amount";
        } else if (registerNowData.documents.length === 0) {
            isError = false;
            errorMessage = "Document is require. Please select Document";
        }
        if (errorMessage !== "") {
            ErrorMessage({
                msg: errorMessage,
                backgroundColor: RED_COLOR,
            });
        }
        return isError;
    }
    const registerNowPress = () => {
        if (validationRegisterNow()) {
            setRegisterModal(false)
            const params = {
                module_id: "",
                booking_id: data?._id,
                remark: '',
                lead_id: data?.lead_id,
                property_id: data?.property_id,
                customer_id: data?.customer_id,
                registration_date: registerNowData?.register_date,
                document: JSON.stringify(registerNowData?.documents),
                total_amount: registerNowData?.total_amount,
                total_amount_type: registerNowData?.total_amount_type,
            }
            dispatch(addRegistration(params))
        }
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
                reAllocateModel={reAllocateModel}
                setReAllocateModel={setReAllocateModel}
                registerModal={registerModal}
                setRegisterModal={setRegisterModal}
                reAllocateData={reAllocateData}
                setReAllocateData={setReAllocateData}
                registerNowData={registerNowData}
                setRegisterNowData={setRegisterNowData}
                documentBrowse={documentBrowse}
                setDocumentBrowse={setDocumentBrowse}
                registerNowPress={registerNowPress}
            />
        </>
    )
}
export default BookingDetailsScreen