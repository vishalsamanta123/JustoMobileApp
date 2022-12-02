import React, { useState } from "react";
import { View, FlatList } from 'react-native';
import images from "../../../../assets/images";
import Header from "../../../../components/Header";
import strings from "../../../../components/utilities/Localization";
import styles from "./styles";
import AppointmentsItem from './AppointmentsItem'
import FilterModal from "../../../../components/Modals/FilterModal";
import Button from "../../../../components/Button";
import AllocateModal from "./AllocateModal";
import DropLocationModal from "./DropLocationModal";
import { useDispatch } from "react-redux";
import { AddDropLocation } from "app/Redux/Actions/AppointmentCLAction";

const AppointmentListView = (props: any) => {
    const [locationModel, setLocationModel] = useState(false)
    const [allocateModel, setAllocateModel] = useState(false)
    const [dropLocation, setDropLocation] = useState({})
    const dispatch: any = useDispatch()
    console.log('dropLocation: ', dropLocation);
    const handleDropLocation = (data: any) => {
        if (locationModel === false) {
            dispatch(AddDropLocation({
                appointment_id: data?._id,
                drop_off_location: dropLocation
            }))
        }
    }
    return (
        <View style={styles.mainContainer}>
            <Header
                leftImageSrc={images.menu}
                headerText={strings.appointmentHeader}
                rightSecondImageScr={images.notification}
                rightFirstImageScr={images.filter}
                RightFirstIconStyle={styles.RightFirstIconStyle}
                handleOnLeftIconPress={props.handleDrawerPress}
                headerStyle={styles.headerStyle}
                handleOnRightFirstIconPress={() => props.setFilterisVisible(true)}
            />
            <View style={{ alignItems: 'flex-end', paddingVertical: 6 }}>
                <Button
                    height={30}
                    width={120}
                    buttonText={strings.scanQrCode}
                    textTransform={null}
                    btnTxtsize={15}
                    handleBtnPress={() => props.handleScanQr()}
                />
            </View>
            <View style={styles.listView}>
                <FlatList
                    data={props.DATA}
                    showsVerticalScrollIndicator={false}
                    renderItem={({ item }) =>
                        <AppointmentsItem
                            items={item}
                            onPressView={props.onPressView}
                            handleDropLocation={handleDropLocation}
                            setAllocateModel={setAllocateModel}
                            setLocationModel={setLocationModel}
                        />}
                    refreshing={false}
                    onRefresh={() => {
                        props.getAppointmentList(0)
                    }}
                />
            </View>
            <FilterModal
                Visible={props.filterisVisible}
                setIsVisible={props.setFilterisVisible}
            />
            <AllocateModal
                Visible={allocateModel}
                setIsVisible={() => setAllocateModel(false)}
            />
            <DropLocationModal
                Visible={locationModel}
                setIsVisible={() => setLocationModel(false)}
                setDropLocation={setDropLocation}
                handleDropLocation={handleDropLocation}
            />
        </View>
    )
}
export default AppointmentListView