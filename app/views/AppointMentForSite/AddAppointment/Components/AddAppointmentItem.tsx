import { View, Text, ScrollView } from 'react-native'
import React, { useState } from 'react'
import styles from './Styles'
import Styles from 'app/components/DropDown/styles'
import InputField from '../../../../components/InputField'
import DropdownInput from '../../../../components/DropDown'
import strings from '../../../../components/utilities/Localization'
import images from '../../../../assets/images'
import { RadioButton } from 'react-native-paper'
import { PRIMARY_THEME_COLOR, BLACK_COLOR, DATE_FORMAT, TIME_FORMAT } from '../../../../components/utilities/constant'
import Button from '../../../../components/Button'
import InputCalender from 'app/components/InputCalender'
import moment from 'moment'

const AddAppointmentItem = (props: any) => {
    const [pickUp, setpickUp] = useState('')
    return (
        <ScrollView keyboardShouldPersistTaps={'handled'}>
            <View style={styles.wrap}>
                <View style={styles.inputWrap}>
                    <DropdownInput
                        headingText={strings.selectLead}
                        placeholder={props?.appointMentForm?.first_name != "" ?
                            props?.appointMentForm?.first_name :
                            strings.selectLead}
                        disable={props.type === 'edit' ? true : false}
                        data={props?.leadList}
                        paddingLeft={16}
                        maxHeight={300}
                        onFocus={() => props.getLeadList()}
                        labelField="first_name"
                        valueField={'lead_id'}
                        value={props?.appointMentForm?.lead_id}
                        onChange={(item: any) => {
                            console.log('item ====: ', item);
                            setpickUp(item?.pickup)
                            props.setAppointMentForm({
                                ...props.appointMentForm,
                                lead_id: item.lead_id,
                                first_name: item.first_name
                            })
                        }}
                        newRenderItem={(item: any) => {
                            return (
                                <>
                                    <View style={Styles.item}>
                                        <Text style={Styles.textItem}>{item.first_name}</Text>
                                    </View>
                                </>
                            );
                        }}
                    />
                </View>
                <View style={styles.inputWrap}>
                    <DropdownInput
                        headingText={strings.selectproperty}
                        placeholder={props?.appointMentForm?.property_title != "" ?
                            props?.appointMentForm?.property_title :
                            strings.selectproperty}
                        data={props?.propertyList}
                        disable={props.type === 'edit' ? true : false}
                        paddingLeft={16}
                        maxHeight={300}
                        onFocus={() => props.getPropertyList()}
                        labelField="property_title"
                        valueField={'property_id'}
                        value={props?.appointMentForm?.property_id}
                        onChange={(item: any) => {
                            props.setAppointMentForm({
                                ...props.appointMentForm,
                                property_id: item.property_id,
                                type: item.property_type,
                            })
                        }}
                        newRenderItem={(item: any) => {
                            return (
                                <>
                                    <View style={Styles.item}>
                                        <Text style={Styles.textItem}>{item.property_title}</Text>
                                    </View>
                                </>
                            );
                        }}
                    />
                </View>
                <View style={styles.inputWrap}>
                    <InputCalender
                        leftIcon={images.event}
                        mode={"date"}
                        minimumDate={new Date()}
                        placeholderText={strings.appointmentDate}
                        headingText={strings.appointmentDate}
                        editable={false}
                        dateData={(data: any) => {
                            props.setAppointMentForm({
                                ...props.appointMentForm,
                                appointment_date: moment(data).format(DATE_FORMAT),
                            });
                        }}
                        setDateshow={(data: any) => {
                            props.setAppointMentForm({
                                ...props.appointMentForm,
                                appointment_date: moment(data).format(DATE_FORMAT),
                            });
                        }}
                        value={
                            props?.appointMentForm?.appointment_date !== ""
                                ? moment(props?.appointMentForm?.appointment_date).format(DATE_FORMAT)
                                : null
                        }
                    />
                </View>
                <View style={styles.inputWrap}>
                    <InputCalender
                        leftIcon={images.timer}
                        mode={"time"}
                        placeholderText={strings.appointmentTime}
                        headingText={strings.appointmentTime}
                        editable={false}
                        dateData={(data: any) => {
                            props.setAppointMentForm({
                                ...props.appointMentForm,
                                appointment_time: moment(data).format(TIME_FORMAT),
                            });
                        }}
                        setDateshow={(data: any) => {
                            props.setAppointMentForm({
                                ...props.appointMentForm,
                                appointment_time: moment(data).format(TIME_FORMAT),
                            });
                        }}
                        value={
                            props?.appointMentForm?.appointment_time !== ""
                                ? props?.appointMentForm?.appointment_time
                                : null
                        }
                    />
                </View>
                {pickUp === 'Yes' ?
                    <>
                        <View style={styles.inputWrap}>
                            <Text style={styles.genderTxt}>{strings.pickupAppointment}</Text>
                        </View>
                        <View style={styles.genderView}>
                            <View style={styles.radioView}>
                                <RadioButton.Android
                                    value="Yes"
                                    status={props.appointMentForm?.pickup === "Yes" ? "checked" : "unchecked"}
                                    onPress={() => props.setAppointMentForm({
                                        ...props.appointMentForm,
                                        pickup: 'Yes'
                                    })}
                                    color={PRIMARY_THEME_COLOR}
                                />
                                <Text
                                    style={[
                                        styles.radioTxt,
                                        {
                                            color:
                                                props.appointMentForm?.pickup === "Yes" ? PRIMARY_THEME_COLOR : BLACK_COLOR,
                                        },
                                    ]}
                                >
                                    {strings.yes}
                                </Text>
                            </View>
                            <View style={styles.radioView}>
                                <RadioButton.Android
                                    value="No"
                                    status={props.appointMentForm?.pickup === "No" ? "checked" : "unchecked"}
                                    onPress={() => props.setAppointMentForm({
                                        ...props.appointMentForm,
                                        pickup: 'No'
                                    })}
                                    color={PRIMARY_THEME_COLOR}
                                />
                                <Text
                                    style={[
                                        styles.radioTxt,
                                        {
                                            color:
                                                props.appointMentForm?.pickup === "No" ? PRIMARY_THEME_COLOR : BLACK_COLOR,
                                        },
                                    ]}
                                >
                                    {strings.no}
                                </Text>
                            </View>
                        </View>
                        {props.appointMentForm?.pickup === 'Yes' ?
                            <>
                                <View style={styles.inputWrap}>
                                    <InputField
                                        headingText={strings.location}
                                        valueshow={props?.appointMentForm?.pickup_location}
                                        inputType={'location'}
                                        onPressSelect={(data: any, detail: any) => {
                                            props.setAppointMentForm({
                                                ...props.appointMentForm,
                                                pickup_location: data?.description,
                                                pickup_latitude: detail?.geometry?.location?.lat,
                                                pickup_longitude: detail?.geometry?.location?.lng
                                            })
                                        }}
                                        onChangeText={(data: any) => {
                                            props.setAppointMentForm({
                                                ...props.appointMentForm,
                                                pickup_location: data,
                                            })
                                        }}
                                    />
                                </View>
                                <View style={styles.inputWrap}>
                                    <InputField
                                        placeholderText={strings.noofguest}
                                        handleInputBtnPress={() => { }}
                                        onChangeText={(data: any) => {
                                            props.setAppointMentForm({
                                                ...props.appointMentForm,
                                                number_of_guest: data,
                                            })
                                        }}
                                        valueshow={props?.appointMentForm?.number_of_guest?.toString()}
                                        keyboardtype={'number-pad'}
                                        headingText={strings.noofguest}
                                    />
                                </View>
                            </>
                            : null
                        }
                    </>
                    : null
                }
                <View style={styles.btnView}>
                    <Button
                        handleBtnPress={() => props.onPressAddEdit()}
                        buttonText={props.type === 'edit' ? strings.update :
                            strings.addNewappointment} />
                </View>
            </View>
        </ScrollView>
    )
}

export default AddAppointmentItem