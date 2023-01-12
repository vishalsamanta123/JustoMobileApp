import { useFocusEffect } from '@react-navigation/native';
import { getBookingList } from 'app/Redux/Actions/BookingActions';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import CancelBookingView from './components/CancelBookingView'

const CancelBookingScreen = ({ navigation }: any) => {
    // const [BookingList, setBookingList] = useState<any>([]);
    // const [offSET, setOffset] = useState(0);
    // const dispatch: any = useDispatch();
    // const { response = {}, list = "" } = useSelector(
    //     (state: any) => state.booking)
    // const moreData = response?.total_data
    // useFocusEffect(
    //     React.useCallback(() => {
    //         getBookingLits(0, []);
    //         setBookingList([])
    //         return () => { };
    //     }, [navigation, list,])
    // );
    // useEffect(() => {
    //     if (response?.status === 200) {
    //         if (response?.data?.length > 0) {
    //             if (offSET === 0) {
    //                 setBookingList(response?.data);
    //             } else {
    //                 setBookingList([...BookingList, ...response?.data]);
    //             }
    //         }
    //     }
    // }, [response]);

    // const getBookingLits = (offset: any, array: any) => {
    //     setOffset(offset);
    //     dispatch(
    //         getBookingList({
    //             offset: offset,
    //             limit: 3,
    //             booking_status: 4
    //         })
    //     );
    // };
    const handleDrawerPress = () => {
        navigation.toggleDrawer();
    };
    const handleView = (data: any) => {
        navigation.navigate('BookingDetails', { data: data, type: '' })
    }
    return (
        <>
            <CancelBookingView
                handleDrawerPress={handleDrawerPress}
                // DATA={BookingList}
                // handleView={handleView}
                // getBookingLits={getBookingLits}
                // moreData={moreData}
                // offSET={offSET}
                // setBookingList={setBookingList}
            />
        </>
    )
}

export default CancelBookingScreen