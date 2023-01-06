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
import EmptyListScreen from "app/components/CommonScreen/EmptyListScreen";
import AppointmentFilterModal from "./AppointmentFilterModal ";

const AppointmentListView = (props: any) => {
    const [locationModel, setLocationModel] = useState(false)
    const [allocateModel, setAllocateModel] = useState(false)
    const [dropLocation, setDropLocation] = useState({})
    const [appointmentid, setappointmentid] = useState('')
    const dispatch: any = useDispatch()
    const handleDropLocation = (data: any) => {
        if (appointmentid) {
            dispatch(AddDropLocation({
                appointment_id: appointmentid,
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
                    data={Array.isArray(props.DATA) ? props.DATA : []}
                    showsVerticalScrollIndicator={false}
                    ListEmptyComponent={<EmptyListScreen message={strings.appointmentHeader} />}
                    renderItem={({ item }) =>
                        <AppointmentsItem
                            items={item}
                            onPressView={props.onPressView}
                            setappointmentid={setappointmentid}
                            setAllocateModel={setAllocateModel}
                            setLocationModel={setLocationModel}
                            setAllocatedCM={props.setAllocatedCM}
                            allocatedCM={props.allocatedCM}
                        />}
                    refreshing={false}
                    onRefresh={() => {
                        props.getAppointmentList(0, {})
                        props.setFilterData({
                            start_date: '',
                            end_date: '',
                            customer_name: '',
                        })
                        props.setAppointmentList([])
                    }}
                    onEndReached={() => {
                        if (props?.DATA?.length < props?.moreData) {
                            props.getAppointmentList(
                                props?.DATA?.length > 2 ? props.offSET + 1 : 0,
                                props?.filterData
                            );
                        }
                    }}
                />
            </View>
            <AppointmentFilterModal
                Visible={props.filterisVisible}
                setIsVisible={props.setFilterisVisible}
                filterData={props.filterData}
                setFilterData={props.setFilterData}
                getAppointmentList={props.getAppointmentList}
                setAppointmentList={props.setAppointmentList}
            />
            <AllocateModal
                Visible={allocateModel}
                setIsVisible={() => setAllocateModel(false)}
                getCMList={props.getCMList}
                ClosingMList={props.ClosingMList}
                setAllocatedCM={props.setAllocatedCM}
                allocatedCM={props.allocatedCM}
                handleAllocateCM={props.handleAllocateCM}
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