import { useFocusEffect } from "@react-navigation/native";
import { getBookingList } from "app/Redux/Actions/BookingActions";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import BookingListView from './components/BookingList'

const BookingListScreen = ({ navigation, route }: any) => {
  const { type = '' } = route?.params || {}
  const [BookingList, setBookingList] = useState<any>([]);
  const [offSET, setOffset] = useState(0);
  const dispatch: any = useDispatch();
  const { response = {}, list = "" } = useSelector(
    (state: any) => state.booking)
  const moreData = response?.total_data
  useFocusEffect(
    React.useCallback(() => {
      getBookingLits(0, []);
      setBookingList([])
      return () => { };
    }, [navigation, list, type])
  );
  useEffect(() => {
    if (response?.status === 200) {
      if (response?.data?.length > 0) {
        if (offSET == 0 || offSET == undefined) {
          setBookingList(response?.data);
        } else {
          setBookingList([...BookingList, ...response?.data]);
        }
      }
    }
  }, [response]);

  const getBookingLits = (offset: any, array: any) => {
    setOffset(offset);
    dispatch(
      getBookingList({
        offset: offset,
        limit: 3,
        booking_status: type === 'readyToBook' ? 1 : 2
      })
    );
  };
  const handleDrawerPress = () => {
    navigation.toggleDrawer()
  };

  const handleView = (data: any) => {
    navigation.navigate('BookingDetails', { data: data, type: type })
  }
  return (
    <>
      <BookingListView
        handleDrawerPress={handleDrawerPress}
        DATA={BookingList}
        handleView={handleView}
        getBookingLits={getBookingLits}
        moreData={moreData}
        offSET={offSET}
        setBookingList={setBookingList}
        type={type}
      />
    </>
  )
}
export default BookingListScreen