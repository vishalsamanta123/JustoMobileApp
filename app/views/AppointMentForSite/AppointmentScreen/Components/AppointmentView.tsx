import { View, Text, StatusBar, useWindowDimensions, FlatList } from 'react-native'
import React, { useState } from 'react'
import { PRIMARY_THEME_COLOR_DARK, TABBAR_COLOR } from '../../../../components/utilities/constant';
import Header from '../../../../components/Header';
import images from '../../../../assets/images';
import strings from '../../../../components/utilities/Localization';
import styles from './Styles';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import FilterModal from './AppointmentModal';
import Button from '../../../../components/Button';
import AppointMentForSiteList from './AppointMentForSiteList'
import EmptyListScreen from 'app/components/CommonScreen/EmptyListScreen';

const AppointmentView = (props: any) => {
    const loadingref = false
    const navigation: any = useNavigation()
    const [FilterisVisible, setFilterisVisible] = useState(false)
    const onPressView = (item: any) => {
        navigation.navigate('AppointmentForSiteDetail', item)
    }
    const onPressAddNew = (type: any, item: any) => {
        if (type === 'edit') {
            navigation.navigate('AddAppointmentForSite', { type, item })
        } else {
            navigation.navigate('AddAppointmentForSite')
        }
    }

    return (
        <View style={styles.mainContainer}>
            <Header
                leftImageSrc={images.menu}
                rightFirstImageScr={images.filter}
                rightSecondImageScr={images.notification}
                headerText={strings.appointmentVisitHeader}
                handleOnLeftIconPress={props.handleDrawerPress}
                headerStyle={styles.headerStyle}
                RightFirstIconStyle={styles.RightFirstIconStyle}
                handleOnRightFirstIconPress={() => setFilterisVisible(true)}
            />
            <View style={{ marginVertical: 10, alignItems: 'flex-end' }}>
                <Button
                    width={200}
                    height={30}
                    buttonText={strings.addNewappointment}
                    btnTxtsize={14}
                    handleBtnPress={() => onPressAddNew(null, {})}
                />
            </View>
            <View style={styles.listView}>
                <FlatList
                    data={props.siteAppointments}
                    showsVerticalScrollIndicator={false}
                    renderItem={({ item }) => <AppointMentForSiteList items={item}
                        onPressView={() => onPressView(item)}
                        onEditPress={() => onPressAddNew('edit', item)}
                    />}
                    ListEmptyComponent={
                        <EmptyListScreen message={'Appointment'} />}
                    onRefresh={() => {
                        props.setFilterData({
                            appointment_with: '',
                            status: '',
                            start_date: '',
                            end_date: '',
                            customer_name: '',
                            property_name: ''
                        })
                        props.getAppointmentList(0, {})
                        props.setSiteAppointments([])
                    }}
                    refreshing={loadingref}
                    onEndReached={() => {
                        if (props?.siteAppointments?.length < props?.moreData) {
                            props.getAppointmentList(props?.siteAppointments?.length >= 3 ?
                                props.offSET + 1 : 0, props.filterData)
                        }
                    }}
                />
            </View>
            <FilterModal
                setFilterData={props.setFilterData}
                filterData={props.filterData}
                Visible={FilterisVisible}
                getAppointmentList={props.getAppointmentList}
                setIsVisible={setFilterisVisible}
                onReset={() => {
                    props.setFilterData({
                        appointment_with: '',
                        status: '',
                        start_date: '',
                        end_date: '',
                        customer_name: '',
                        property_name: ''
                    })
                    props.getAppointmentList(0, {})
                    props.setSiteAppointments([])
                }}
                setSiteAppointments={props.setSiteAppointments}
            />
        </View>
    )
}

export default AppointmentView