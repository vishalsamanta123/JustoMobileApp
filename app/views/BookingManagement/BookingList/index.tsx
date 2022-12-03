import { useFocusEffect } from "@react-navigation/native";
import { getBookingList } from "app/Redux/Actions/BookingActions";
import { getAllFollowUpList } from "app/Redux/Actions/FollowUpActions";
import React, { useEffect, useState } from "react";
import { Alert } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import BookingListView from './components/BookingList'

const BookingListScreen = ({ navigation }: any) => {
    const [BookingList, setBookingList] = useState<any>([]);
    const [offSET, setOffset] = useState(0);
    const dispatch: any = useDispatch();
    const { response = {}, list = "" } = useSelector(
      (state: any) => state.booking)
    const DATA: any = [
        {
            customerName: 'ABC',
            Location: 'Indore',
            configure: "12 BHK",
            booking_status: 'Pending',
            siteVisit: 234,
            closeVisit: 600,
            status: 'confirmatin Pending',
            createddate: '11/10/2022',
            budget: '20 L',
            booking_amt: '30 L'
        },
        {
            customerName: 'ABC',
            Location: 'Indore',
            configure: "12 BHK",
            booking_status: 'Pending',
            siteVisit: 234,
            closeVisit: 600,
            status: 'Pending',
            createddate: '11/10/2022',
            budget: '30 L',
            booking_amt: '80 L'
        },
        {
            customerName: 'ABC',
            Location: 'Indore',
            configure: "12 BHK",
            booking_status: 'Pending',
            siteVisit: 234,
            closeVisit: 600,
            status: 'Pending',
            createddate: '11/10/2022',
            budget: '20 L',
            booking_amt: '20 L'
        },
        {
            customerName: 'ABC',
            Location: 'Indore',
            configure: "12 BHK",
            booking_status: 'Pending',
            siteVisit: 234,
            closeVisit: 600,
            status: 'confirmatin Pending',
            createddate: '11/10/2022',
            budget: '50 L',
            booking_amt: '10 L'
        },
    ];
    useFocusEffect(
        React.useCallback(() => {
          getFollowupList(offSET, []);
          return () => {};
        }, [navigation, list])
      );
      useEffect(() => {
        if (list) {
          if (offSET == 0 || offSET == undefined) {
            setBookingList(response?.data);
          } else {
            setBookingList([...BookingList, ...response?.data]);
          }
        }
      }, [response]);
    
      const getFollowupList = (offset: any, array: any) => {
        setOffset(offset);
        dispatch(
            getBookingList({
            offset: offset,
            limit: 3,
          })
        );
        // toGetDatas(array)
      };
    const handleDrawerPress = () => {
        navigation.toggleDrawer()
    };

    const handleView = (data: any) => {
        navigation.navigate('BookingDetails', data)
    }
    return (
        <>
            <BookingListView
                handleDrawerPress={handleDrawerPress}
                DATA={BookingList}
                handleView={handleView}
            />
        </>
    )
}
export default BookingListScreen