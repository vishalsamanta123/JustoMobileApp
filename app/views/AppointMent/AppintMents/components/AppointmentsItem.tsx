import { View, Text, TouchableOpacity, Image, Linking } from 'react-native';
import React from 'react';
import styles from './styles';
import strings from '../../../../components/utilities/Localization';
import { BLACK_COLOR, CALL_COLOR, GRAY_COLOR, GRAY_LIGHT_COLOR, GREEN_COLOR, PRIMARY_THEME_COLOR, BG_MAIN_COLOUR, WHITE_COLOR, WHITE_COLOR_LIGHT, YELLOW_COLOR } from '../../../../components/utilities/constant';
import images from '../../../../assets/images';
import Button from '../../../../components/Button';
import moment from 'moment';
import { useSelector } from 'react-redux';

const AppointmentItem = (props: any) => {
    const { userData = {} } = useSelector((state: any) => state.userData)
    return (
        <View style={styles.IteamView}>
            <View style={styles.Txtview} >
                <View style={styles.projectContainer}>
                    <Text style={styles.projectTxt}>Visitor Name :</Text>
                </View>
                <View style={styles.nameContainer}>
                    <Text style={styles.nameTxt}>{props.items.customer_first_name}</Text>
                </View>
            </View>
            <View style={styles.Txtview} >
                <View style={styles.projectContainer}>
                    <Text style={styles.projectTxt}>Date & Time :</Text>
                </View>
                <View style={styles.nameContainer}>
                    <Text style={styles.nameTxt}>{
                        `${moment(props.items.appointment_date).format('DD-MM-YYYY')} ${props.items.appointment_time}`
                    }</Text>
                </View>
            </View>
            <View style={styles.Txtview} >
                <View style={styles.projectContainer}>
                    <Text style={styles.projectTxt}>Lead No. :</Text>
                </View>
                <View style={styles.nameContainer}>
                    <Text style={styles.nameTxt}>{props.items.lead_no}</Text>
                </View>
            </View>
            <View style={styles.Txtview}>
                <View style={styles.projectContainer}>
                    <Text style={styles.projectTxt}>Pickup :</Text>
                </View>
                <View style={styles.nameContainer}>
                    <Text style={styles.nameTxt}>{props.items.pickup}</Text>
                </View>
            </View>
            <View style={styles.Txtview} >
                <View style={styles.projectContainer}>
                    <Text style={styles.projectTxt}>Visit Score :</Text>
                </View>
                <View style={styles.nameContainer}>
                    <Text style={styles.nameTxt}>{props.items.lead_score}</Text>
                </View>
            </View>
            <View style={styles.Txtview} >
                <View style={styles.projectContainer}>
                    <Text style={styles.projectTxt}>Status :</Text>
                </View>
                <View style={styles.nameContainer}>
                    <Text style={[styles.nameTxt, {
                        color: props.items.status == 1 || props.items.status == 5 || props.items.status == 4 ? 'red' :
                            props.items.status == 2 ? YELLOW_COLOR : BLACK_COLOR
                    }]}>{
                            // status: {//1= Panding, 2 = Confirm, 3= Compleat, 4 = Appointment cancel, 5= close}
                            props.items.status === 1 ? 'Pending' :
                                props.items.status === 2 ? 'Confirm' :
                                    props.items.status === 3 ? 'Completed' :
                                        props.items.status === 4 ? 'Appointment cancel' :
                                            props.items.status == 5 && 'Close'
                        }</Text>
                </View>
            </View>
            <View style={[styles.Txtview, { borderBottomWidth: 0 }]} >
                <View style={styles.projectContainer}>
                    <Text style={styles.projectTxt}>Assign to :</Text>
                </View>
                <View style={styles.nameContainer}>
                    <Text style={styles.nameTxt}>{
                        props.items.assign_appointment?.[0]?.user_name
                    }</Text>
                </View>
            </View>
            <View style={styles.buttonContainer}>
                {props.items.status === 1 || props.items.status === 2 ?
                    (<Button
                        width={80}
                        height={30}
                        bgcolor={WHITE_COLOR}
                        bordercolor={CALL_COLOR}
                        borderWidth={1}
                        btnTxtcolor={CALL_COLOR}
                        buttonText={strings.call}
                        btnTxtsize={14}
                        border={10}
                        handleBtnPress={() => {
                            Linking.openURL(
                                `tel:${props.items?.mobile}`
                            )
                        }}
                    />) : <View></View>}
                <TouchableOpacity style={styles.Viewbutton}
                    onPress={() => props.onPressView(props.items)}
                >
                    <Image
                        source={images.forwardArrow}
                        style={styles.arrow}
                    />
                </TouchableOpacity>
            </View>
            {
                userData?.data?.role_title === 'Closing TL' && props.items.status === 1 ?
                    (
                        <View style={[styles.buttonContainer, { justifyContent: 'center' }]}>
                            {props.items.pickup === 'Yes' &&

                                <Button
                                    width={150}
                                    height={30}
                                    bgcolor={WHITE_COLOR}
                                    bordercolor={PRIMARY_THEME_COLOR}
                                    borderWidth={1}
                                    btnTxtcolor={PRIMARY_THEME_COLOR}
                                    buttonText={strings.dropLocation}
                                    btnTxtsize={14}
                                    border={10}
                                    handleBtnPress={() => {
                                        props.setappointmentid(props?.items?._id)
                                        props.setLocationModel(true)
                                    }}
                                    textTransform={'uppercase'}
                                />
                            }
                            <Button
                                width={100}
                                height={30}
                                bgcolor={WHITE_COLOR}
                                bordercolor={PRIMARY_THEME_COLOR}
                                borderWidth={1}
                                btnTxtcolor={PRIMARY_THEME_COLOR}
                                buttonText={strings.allocate}
                                btnTxtsize={14}
                                border={10}
                                handleBtnPress={() => {
                                    props.setAllocatedCM({
                                        ...props.allocatedCM, appointment_id: props.items?._id
                                    })
                                    props.setAllocateModel(true)
                                }}
                                textTransform={'uppercase'}
                            />
                        </View>)
                    : null
            }
        </View>
    );
};

export default AppointmentItem;
