import { View, Text, StatusBar } from 'react-native'
import React, { useState } from 'react'
import styles from './Styles'
import { PRIMARY_THEME_COLOR } from '../../../../components/utilities/constant';
import Header from '../../../../components/Header';
import images from '../../../../assets/images';
import strings from '../../../../components/utilities/Localization';
import AddAppointmentItem from './AddAppointmentItem';
import { useNavigation } from '@react-navigation/native';

const AddAppointmentView = (props: any) => {
    const navigation: any = useNavigation()
    const [value, setValue] = useState(null)
    const [addAppointmentForm, setAddAppointmentForm] = useState({});
    const handleBtnPress = () => {
        navigation.navigate('AppointmentScreen')
    }
    return (
        <View style={styles.mainContainer}>
            <Header
                leftImageSrc={images.backArrow}
                rightSecondImageScr={images.notification}
                headerText={strings.addNewappointment}
                leftImageIconStyle={styles.RightFirstIconStyle}
                handleOnLeftIconPress={() => props.handleBackPress()}
                headerStyle={styles.headerStyle}
                barStyle={'light-content'}
                statusBarColor={PRIMARY_THEME_COLOR}
            />
            <View style={styles.AddAppointmentView}>
                <AddAppointmentItem
                    setValue={setValue}
                    value={value}
                    handleBtnPress={handleBtnPress}
                    setAddAppointmentForm={setAddAppointmentForm}
                    addAppointmentForm={addAppointmentForm}
                />
            </View>
        </View>
    )
}

export default AddAppointmentView