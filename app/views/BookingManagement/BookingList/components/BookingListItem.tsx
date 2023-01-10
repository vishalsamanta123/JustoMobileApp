import { View, Text, TouchableOpacity, Image, Linking } from 'react-native';
import React from 'react';
import styles from './styles';
import strings from '../../../../components/utilities/Localization';
import { BLACK_COLOR, GREEN_COLOR, PURPLE_COLOR, ROLE_IDS, WHITE_COLOR, YELLOW_COLOR } from '../../../../components/utilities/constant';
import images from '../../../../assets/images';
import Button from '../../../../components/Button';
import moment from 'moment';
import { useSelector } from 'react-redux';

const BookingListItem = (props: any) => {
console.log('props: ', props.items);
    const getLoginType = useSelector((state: any) => state.login);
    return (
        <View style={styles.IteamView}>
            <View style={styles.Txtview} >
                <View style={styles.projectContainer}>
                    <Text style={styles.projectTxt}>Booking Date :</Text>
                </View>
                <View style={styles.nameContainer}>
                    <Text style={styles.nameTxt}>{moment(props.items.booking_date).format('DD-MM-YYYY')}</Text>
                </View>
            </View>
            <View style={styles.Txtview} >
                <View style={styles.projectContainer}>
                    <Text style={styles.projectTxt}>Customer Name :</Text>
                </View>
                <View style={styles.nameContainer}>
                    <Text style={styles.nameTxt}>{props.items.customer_first_name}</Text>
                </View>
            </View>
            {/* <View style={styles.Txtview} >
                <View style={styles.projectContainer}>
                    <Text style={styles.projectTxt}>Booking Status :</Text>
                </View>
                <View style={styles.nameContainer}>
                    <Text style={styles.nameTxt}>{props.items.booking_status}</Text>
                </View>
            </View> */}
            {getLoginType?.response?.data?.role_id === ROLE_IDS.postsales_id
                && props?.type !== 'readyToBook' ?
                <>
                    <View style={styles.Txtview} >
                        <View style={styles.projectContainer}>
                            <Text style={styles.projectTxt}>Booking No :</Text>
                        </View>
                        <View style={styles.nameContainer}>
                            <Text style={styles.nameTxt}>{
                                props.items.booking_no ?
                                    props.items.booking_no : strings.notfount}</Text>
                        </View>
                    </View>
                    <View style={styles.Txtview} >
                        <View style={styles.projectContainer}>
                            <Text style={styles.projectTxt}>Cheque No :</Text>
                        </View>
                        <View style={styles.nameContainer}>
                            <Text style={styles.nameTxt}>{
                                props.items.tranjection_upi_cheque_number ?
                                    props.items.tranjection_upi_cheque_number : strings.notfount}</Text>
                        </View>
                    </View>
                    <View style={styles.Txtview} >
                        <View style={styles.projectContainer}>
                            <Text style={styles.projectTxt}>Payment Mode :</Text>
                        </View>
                        <View style={styles.nameContainer}>
                            <Text style={styles.nameTxt}>{
                                props.items.payment_type ?
                                    props.items.payment_type : strings.notfount}</Text>
                        </View>
                    </View>
                </> : null
            }
            {(props.type === 'request' ||
                getLoginType?.response?.data?.role_id === ROLE_IDS.postsales_id ?
                <>
                    <View style={styles.Txtview} >
                        <View style={styles.projectContainer}>
                            <Text style={styles.projectTxt}>Configuration :</Text>
                        </View>
                        <View style={styles.nameContainer}>
                            <Text style={styles.nameTxt}>{
                                props.items.configuration ?
                                    props.items.configuration : strings.notfount}</Text>
                        </View>
                    </View>
                    {props.type === 'register' ?
                        null :
                        <View style={styles.Txtview}>
                            <View style={styles.projectContainer}>
                                <Text style={styles.projectTxt}>Budget :</Text>
                            </View>
                            <View style={styles.nameContainer}>
                                <Text style={styles.nameTxt}>{
                                    props.items.min_budget && props.items.max_budget ?
                                        `${props.items.min_budget}${props.items.min_budget_type} - ${props.items.max_budget}${props.items.max_budget_type}`
                                        : strings.notfount
                                }</Text>
                            </View>
                        </View>
                    }
                    {props.type === 'request' ?
                        <View style={styles.Txtview} >
                            <View style={styles.projectContainer}>
                                <Text style={styles.projectTxt}>Booking Amount :</Text>
                            </View>
                            <View style={styles.nameContainer}>
                                <Text style={styles.nameTxt}>{props.items.booking_amount ?
                                    props.items.booking_amount : strings.notfount}</Text>
                            </View>
                        </View> : null
                    }
                </>
                : null
            )}
            <View style={[styles.Txtview, { borderBottomWidth: 0 }]} >
                <View style={styles.projectContainer}>
                    <Text style={styles.projectTxt}>{
                        props.type === 'register' ?
                            "Register Status " : "Booking Status "
                    }
                        :</Text>
                </View>
                <View style={styles.nameContainer}>
                    {/* booking_status: {//1= Panding, 2 = Confirm, 3= Compleat, 4 =booking cancel} */}
                    <Text style={[styles.nameTxt, {
                        color: props?.items?.booking_status === 1 || props?.items?.booking_status === 4 ? 'red' : BLACK_COLOR
                    }]}>{props?.items?.lead_status === 5 ||
                        props.type === 'register' ?
                        "Registered" :
                        props?.items?.booking_status === 1 ? 'Pending' :
                            props?.items?.booking_status === 2 ? 'Confirm' :
                                props?.items?.booking_status === 3 ? 'Completed' :
                                    props?.items?.booking_status === 4 && 'Booking Cancel'
                        }</Text>
                </View>
            </View>
            <View style={styles.buttonContainer}>
                <Button
                    width={90}
                    height={30}
                    bgcolor={WHITE_COLOR}
                    bordercolor={PURPLE_COLOR}
                    borderWidth={1}
                    btnTxtcolor={PURPLE_COLOR}
                    buttonText={strings.call}
                    btnTxtsize={14}
                    border={10}
                    handleBtnPress={() => {
                        Linking?.openURL(
                            `tel:${props.items?.mobile}`
                        )
                    }}
                />
                <TouchableOpacity style={styles.Viewbutton}
                    onPress={() => props.onPressView(props.items)}
                >
                    <Image
                        source={images.forwardArrow}
                        style={styles.arrow}
                    />
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default BookingListItem;
