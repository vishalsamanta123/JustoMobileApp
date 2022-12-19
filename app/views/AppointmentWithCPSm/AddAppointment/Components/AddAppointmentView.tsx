import { View, Text, StatusBar } from 'react-native'
import React, { useEffect, useState } from 'react'
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
    const [addAppointmentForm, setAddAppointmentForm] = useState({
        lead_id: props?.data?.lead_id,
        appointment_date: props?.data?.appointment_date,
        appointment_time: props?.data?.appointment_time,
        appointment_id: props?.data?._id,
        type: props?.data?.type,
    });
    const handleBtnPress = () => {
        props.handleAddAppointment(addAppointmentForm)
        // navigation.navigate('AppointmentScreen')
    }
    // useEffect(() => {
    //     setAddAppointmentForm(props.data)
    //     return () => {}
    //   }, [props.data])
    return (
        <View style={styles.mainContainer}>
            <Header
                leftImageSrc={images.backArrow}
                rightSecondImageScr={images.notification}
                headerText={props.type === strings.edit ? strings.editNewappointment : strings.addNewappointment}
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
                    getVisitorsList={props.getVisitorsList}
                    visitorList={props.visitorList}
                    type={props.type}
                />
            </View>
        </View>
    )
}

export default AddAppointmentView