import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import styles from './Styles'
import InputField from '../../../../components/InputField'
import DropdownInput from '../../../../components/DropDown'
import strings from '../../../../components/utilities/Localization'
import images from '../../../../assets/images'
import { RadioButton } from 'react-native-paper'
import { PRIMARY_THEME_COLOR, BLACK_COLOR, GRAY_LIGHT_COLOR } from '../../../../components/utilities/constant'
import Button from '../../../../components/Button'
import InputCalender from 'app/components/InputCalender'
import moment from 'moment'

const AddAppointmentItem = (props: any) => {
    return (
        <ScrollView>
            <View style={styles.wrap}>
                <View style={styles.inputWrap}>
                    <InputCalender
                        mode={'date'}
                        leftIcon={images.event}
                        minimumDate={new Date()}
                        placeholderText={strings.appointmentDate}
                        headingText={strings.appointmentDate}
                        editable={false}
                        // onChangeText={() => { }}
                        dateData={(data: any) => {
                            props.setAddAppointmentForm({
                                ...props.addAppointmentForm,
                                appointment_date: moment(data).format('YYYY-MM-DD')
                            })
                        }}
                        setDateshow={(data: any) => {
                            props.setAddAppointmentForm({
                                ...props.addAppointmentForm,
                                appointment_date: moment(data).format('YYYY-MM-DD')
                            })
                        }}
                        value={moment(props.addAppointmentForm?.appointment_date).format('DD-MM-YYYY')}
                    />
                </View>
                <View style={styles.inputWrap}>
                    <InputCalender
                        mode={'time'}
                        leftIcon={images.timer}
                        placeholderText={strings.appointmentTime}
                        headingText={strings.appointmentTime}
                        editable={false}
                        // onChangeText={() => { }}
                        dateData={(data: any) => {
                            props.setAddAppointmentForm({
                                ...props.addAppointmentForm,
                                appointment_time: moment(data).format('LT')
                            })
                        }}
                        setDateshow={(data: any) => {
                            props.setAddAppointmentForm({
                                ...props.addAppointmentForm,
                                appointment_time: moment(data).format('LT')
                            })
                        }}
                        value={props.addAppointmentForm?.appointment_time}
                    />
                </View>
                <View style={styles.inputWrap}>
                    <DropdownInput
                        headingText={strings.appointmentType}
                        placeholder={strings.appointmentType}
                        data={[
                            { label: "Site lead visit", value: "1" },
                            { label: "Client visit", value: "2" },
                        ]}
                        inputWidth={'100%'}
                        paddingLeft={16}
                        maxHeight={300}
                        labelField="label"
                        valueField={'value'}
                        value={props.addAppointmentForm?.type}
                        onChange={(item: any) => {
                            props.setAddAppointmentForm({
                                ...props.addAppointmentForm,
                                type: item.value
                            })
                        }}
                        newRenderItem={(item: any) => {
                            return (
                                <View style={{
                                    padding: 17,
                                    flexDirection: "row",
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                }}>
                                    <Text style={{
                                        flex: 1,
                                        fontSize: 16,
                                        color: GRAY_LIGHT_COLOR
                                    }}>{item.label}</Text>
                                </View>
                            );
                        }}
                    />
                </View>
                <View style={styles.inputWrap}>
                    <DropdownInput
                        headingText={strings.appointmentWith}
                        placeholder={strings.appointmentWith}
                        data={props.visitorList}
                        inputWidth={'100%'}
                        paddingLeft={16}
                        maxHeight={300}
                        onFocus={() => props.getVisitorsList()}
                        labelField="first_name"
                        valueField={'_id'}
                        value={props.addAppointmentForm?.lead_name}
                        onChange={(item: any) => {
                            props.setAddAppointmentForm({
                                ...props.addAppointmentForm,
                                lead_id: item._id, lead_name: item.first_name
                            })
                        }}
                        newRenderItem={(item: any) => {
                            return (
                                <View style={{
                                    padding: 17,
                                    flexDirection: "row",
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                }}>
                                    <Text style={{
                                        flex: 1,
                                        fontSize: 16,
                                        color: GRAY_LIGHT_COLOR
                                    }}>{item.first_name}</Text>
                                </View>
                            );
                        }}
                    />
                </View>
                <View style={styles.btnView}>
                    <Button
                        btnTxtsize={16}
                        handleBtnPress={() => props.handleBtnPress()}
                        buttonText={props.type === strings.edit ? strings.editNewappointment :  strings.addNewappointment}
                    />
                </View>
            </View>
        </ScrollView>
    )
}

export default AddAppointmentItem