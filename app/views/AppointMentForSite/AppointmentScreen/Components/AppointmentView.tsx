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

const AppointmentView = (props: any) => {
    const navigation: any = useNavigation()
    const [FilterisVisible, setFilterisVisible] = useState(false)
    const onPressView = () => {
        navigation.navigate('AppointmentForSiteDetail')
    }
    const onPressAddNew = (type: any) => {
        if (type === 'edit') {
            navigation.navigate('AddAppointmentForSite', { type })
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
                    handleBtnPress={() => onPressAddNew(null)}
                />
            </View>
            <View style={styles.listView}>
                <FlatList
                    data={props.Data}
                    showsVerticalScrollIndicator={false}
                    renderItem={({ item }) => <AppointMentForSiteList items={item}
                        onPressView={() => onPressView()}
                        onEditPress={() => onPressAddNew('edit')}
                    />}
                />
            </View>
            <FilterModal
                setFilterData={props.setFilterData}
                filterData={props.filterData}
                Visible={FilterisVisible} setIsVisible={setFilterisVisible} />
        </View>
    )
}

export default AppointmentView