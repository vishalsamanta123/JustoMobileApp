import React from "react";
import { View, Text, Image, FlatList } from 'react-native';
import images from "../../../../assets/images";
import Header from "../../../../components/Header";
import strings from "../../../../components/utilities/Localization";
import styles from "./styles";
import BookingListItem from './BookingListItem'
import EmptyListScreen from "app/components/CommonScreen/EmptyListScreen";

const BookingListView = (props: any) => {
    return (
        <View style={styles.mainContainer}>
            <Header
                leftImageSrc={images.menu}
                headerText={strings.bookingListHeader}
                handleOnLeftIconPress={props.handleDrawerPress}
                headerStyle={styles.headerStyle}
            />
            <View style={styles.listView}>
                <FlatList
                    data={Array.isArray(props.DATA) ? props.DATA : []}
                    showsVerticalScrollIndicator={false}
                    ListEmptyComponent={<EmptyListScreen message={strings.bookingListHeader} />}
                    renderItem={({ item }) => <BookingListItem items={item} type={props?.type}
                        onPressView={() => props.handleView(item)}
                    />}
                    onEndReached={() => {
                        if (props?.DATA?.length < props?.moreData) {
                            props.getBookingLits(
                                props?.DATA?.length > 2 ? props.offSET + 1 : 0,
                                props?.filterData
                            );
                        }
                    }}
                    refreshing={false}
                    onRefresh={() => {
                        props.getBookingLits(0)
                        props.setBookingList([])
                    }}
                />
            </View>
        </View>
    )
}
export default BookingListView