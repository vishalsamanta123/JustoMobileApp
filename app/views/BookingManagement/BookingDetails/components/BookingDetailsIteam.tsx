import { View, Text, ScrollView, TouchableOpacity, Linking } from 'react-native'
import React from 'react'
import styles from './styles'
import Button from '../../../../components/Button'
import { normalize } from '../../../../components/scaleFontSize'
import strings from '../../../../components/utilities/Localization'
import { BLACK_COLOR, DATE_BY_DAY, ROLE_IDS } from 'app/components/utilities/constant'
import { useSelector } from 'react-redux'
import moment from 'moment'

const BookingDetailsItem = (props: any) => {
    const getLoginType = useSelector((state: any) => state.login);
    const item = props?.item[0] || {}
    console.log('item: ', item);
    return (
        <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.topDetailsView}>
                <View style={styles.topTxtView}>
                    <Text style={styles.topTxt}>Visitor Score </Text>
                    <Text style={styles.topTxt}>{item?.lead_score}</Text>
                </View>
                <View style={styles.topBtnView}>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => {
                            Linking?.openURL(
                                `tel:${item?.leads?.customer?.mobile}`
                            )
                        }}
                    >
                        <Text style={styles.buttonTxt}>Call</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => {
                            Linking?.openURL(
                                `sms:${item?.leads?.customer?.mobile}`
                            )
                        }}
                    >
                        <Text style={styles.buttonTxt}>SMS</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => {
                            Linking?.openURL(
                                `https:wa.me/${item?.leads?.customer?.whatsapp_no}`
                            )
                        }}
                    >
                        <Text style={[styles.buttonTxt, { fontSize: normalize(10) }]}>WhatsApp</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <>
                {props?.type === 'readyToBook' ?
                    <>
                        <View style={styles.Txtview}>
                            <View style={styles.projectContainer}>
                                <Text style={styles.projectTxt}>Book Date</Text>
                            </View>
                            <View><Text>:</Text></View>
                            <View style={styles.nameContainer}>
                                <Text style={styles.nameTxt}>{item?.booking_date === '' ||
                                    item?.booking_date === undefined ||
                                    item?.booking_date === null ?
                                    strings.notfount : moment(item?.booking_date).format(DATE_BY_DAY)
                                }</Text>
                            </View>
                        </View>
                        <View style={styles.Txtview}>
                            <View style={styles.projectContainer}>
                                <Text style={styles.projectTxt}>Other Details</Text>
                            </View>
                            <View><Text>:</Text></View>
                            <View style={styles.nameContainer}>
                                <Text style={styles.nameTxt}>{item?.description ?
                                    item?.description : strings.notfount}</Text>
                            </View>
                        </View>
                    </> : null
                }
                {getLoginType?.response?.data?.role_id === ROLE_IDS.postsales_id
                    && props?.type === 'readyToBook' ?
                    <>
                        <View style={styles.Txtview}>
                            <View style={styles.projectContainer}>
                                <Text style={styles.projectTxt}>User Name</Text>
                            </View>
                            <View><Text>:</Text></View>
                            <View style={styles.nameContainer}>
                                <Text style={styles.nameTxt}>{item?.leads?.customer?.first_name ?
                                    item?.leads?.customer?.first_name : strings.notfount}</Text>
                            </View>
                        </View>
                        <View style={styles.Txtview}>
                            <View style={styles.projectContainer}>
                                <Text style={styles.projectTxt}>Lead By</Text>
                            </View>
                            <View><Text>:</Text></View>
                            <View style={styles.nameContainer}>
                                <Text style={styles.nameTxt}>{item?.visit_create_by?.role_title}</Text>
                            </View>
                        </View>
                        <View style={styles.Txtview}>
                            <View style={styles.projectContainer}>
                                <Text style={styles.projectTxt}>Lead Username</Text>
                            </View>
                            <View><Text>:</Text></View>
                            <View style={styles.nameContainer}>
                                <Text style={styles.nameTxt}>{item?.visit_create_by?.user_name}</Text>
                            </View>
                        </View>
                        <View style={[styles.Txtview, { alignItems: 'flex-start', }]}>
                            <View style={styles.projectContainer}>
                                <Text style={styles.projectTxt}>Location</Text>
                            </View>
                            <View><Text>:</Text></View>
                            <View style={styles.nameContainer}>
                                <Text style={styles.nameTxt}>{item?.properties?.area}</Text>
                            </View>
                        </View>
                    </> : null
                }
                <View style={styles.Txtview}>
                    <View style={styles.projectContainer}>
                        <Text style={styles.projectTxt}>Configuration</Text>
                    </View>
                    <View><Text>:</Text></View>
                    <View style={styles.nameContainer}>
                        <Text style={styles.nameTxt}>{item?.configuration ?
                            item?.configuration : strings.notfount}</Text>
                    </View>
                </View>
                <View style={styles.Txtview}>
                    <View style={styles.projectContainer}>
                        <Text style={styles.projectTxt}>Area (in sq.ft)</Text>
                    </View>
                    <View><Text>:</Text></View>
                    <View style={styles.nameContainer}>
                        <Text style={styles.nameTxt}>{item?.area ?
                            item?.area : strings.notfount}</Text>
                    </View>
                </View>
                {getLoginType?.response?.data?.role_id !== ROLE_IDS.postsales_id ?
                    <View style={styles.Txtview}>
                        <View style={styles.projectContainer}>
                            <Text style={styles.projectTxt}>Budget</Text>
                        </View>
                        <View><Text>:</Text></View>
                        <View style={styles.nameContainer}>
                            <Text style={styles.nameTxt}>{item?.leads?.customer?.budget}</Text>
                        </View>
                    </View> : null
                }
                <View style={styles.Txtview}>
                    <View style={styles.projectContainer}>
                        <Text style={styles.projectTxt}>Current Status</Text>
                    </View>
                    <View><Text>:</Text></View>
                    <View style={styles.nameContainer}>
                        {/* booking_status: {//1= Panding, 2 = Confirm, 3= Compleat, 4 =booking cancel} */}
                        <Text style={[styles.nameTxt, {
                            color: item?.booking_status === 1 || item?.booking_status === 4 ? 'red' : BLACK_COLOR
                        }]}>{item?.leads?.lead_status === 5 &&
                            props?.type === 'register' ? "Registered" :
                            item?.booking_status === 1 ? 'Pending' :
                                item?.booking_status === 2 ? 'Confirm' :
                                    item?.booking_status === 3 ? 'Completed' :
                                        item?.booking_status === 4 && 'Booking Cancel'
                            }</Text>
                    </View>
                </View>
            </>
            {getLoginType?.response?.data?.role_id !== ROLE_IDS.postsales_id ?
                <>
                    <View style={styles.Txtview}>
                        <View style={styles.projectContainer}>
                            <Text style={styles.projectTxt}>Property Name</Text>
                        </View>
                        <View><Text>:</Text></View>
                        <View style={styles.nameContainer}>
                            <Text style={styles.nameTxt}>{item?.properties?.property_title}</Text>
                        </View>
                    </View>
                    <View style={styles.Txtview}>
                        <View style={styles.projectContainer}>
                            <Text style={styles.projectTxt}>Visitor Name</Text>
                        </View>
                        <View><Text>:</Text></View>
                        <View style={styles.nameContainer}>
                            <Text style={styles.nameTxt}>{item?.leads?.customer?.first_name}</Text>
                        </View>
                    </View>
                    <View style={styles.Txtview}>
                        <View style={styles.projectContainer}>
                            <Text style={styles.projectTxt}>Source</Text>
                        </View>
                        <View><Text>:</Text></View>
                        <View style={styles.nameContainer}>
                            <Text style={styles.nameTxt}>{item?.creaters?.user_name}</Text>
                        </View>
                    </View>
                </> : null
            }
            {getLoginType?.response?.data?.role_id === ROLE_IDS.postsales_id
                && props?.type === 'readyToBook' ?
                <View style={styles.Txtview}>
                    <View style={styles.projectContainer}>
                        <Text style={styles.projectTxt}>Close By</Text>
                    </View>
                    <View><Text>:</Text></View>
                    <View style={styles.nameContainer}>
                        <Text style={styles.nameTxt}>{item?.visit_create_by?.role_title}</Text>
                    </View>
                </View> : null
            }
            {/* <View style={styles.Txtview}>
                <View style={styles.projectContainer}>
                    <Text style={styles.projectTxt}>Closing Date</Text>
                </View>
                <View><Text>:</Text></View>
                <View style={styles.nameContainer}>
                    <Text style={styles.nameTxt}>nullll</Text>
                </View>
            </View> */}
            {props?.type !== 'readyToBook' && props?.type !== 'register' ? (
                <>
                    <View style={styles.headdingView}>
                        <Text style={styles.headdingTxt}>{strings.bookingDetails}</Text>
                    </View>
                    <View style={styles.Txtview}>
                        <View style={styles.projectContainer}>
                            <Text style={styles.projectTxt}>Booking Amount</Text>
                        </View>
                        <View><Text>:</Text></View>
                        <View style={styles.nameContainer}>
                            <Text style={styles.nameTxt}>{item?.booking_amount}</Text>
                        </View>
                    </View>
                    <View style={styles.Txtview}>
                        <View style={styles.projectContainer}>
                            <Text style={styles.projectTxt}>Booking No.</Text>
                        </View>
                        <View><Text>:</Text></View>
                        <View style={styles.nameContainer}>
                            <Text style={styles.nameTxt}>{item?.booking_no}</Text>
                        </View>
                    </View>
                    {getLoginType?.response?.data?.role_id === ROLE_IDS.postsales_id ?
                        <View style={styles.Txtview}>
                            <View style={styles.projectContainer}>
                                <Text style={styles.projectTxt}>Booking By</Text>
                            </View>
                            <View><Text>:</Text></View>
                            <View style={styles.nameContainer}>
                                <Text style={styles.nameTxt}>{item?.booking_by_name}</Text>
                            </View>
                        </View> : null
                    }
                    <View style={styles.Txtview}>
                        <View style={styles.projectContainer}>
                            <Text style={styles.projectTxt}>Cheque No.</Text>
                        </View>
                        <View><Text>:</Text></View>
                        <View style={styles.nameContainer}>
                            <Text style={styles.nameTxt}>{item?.tranjection_upi_cheque_number}</Text>
                        </View>
                    </View>
                    <View style={styles.Txtview}>
                        <View style={styles.projectContainer}>
                            <Text style={styles.projectTxt}>Cheque Status</Text>
                        </View>
                        <View><Text>:</Text></View>
                        <View style={styles.nameContainer}>
                            <Text style={styles.nameTxt}></Text>
                        </View>
                    </View>
                    <View style={styles.Txtview}>
                        <View style={styles.projectContainer}>
                            <Text style={styles.projectTxt}>Payment Type</Text>
                        </View>
                        <View><Text>:</Text></View>
                        <View style={styles.nameContainer}>
                            <Text style={styles.nameTxt}>{
                                item?.payment_type === "1" ? 'Cash' :
                                    item?.payment_type === "2" ? 'Cheque' : item?.payment_type
                            }</Text>
                        </View>
                    </View>
                    <View style={styles.Txtview}>
                        <View style={styles.projectContainer}>
                            <Text style={styles.projectTxt}>Configuration Qty</Text>
                        </View>
                        <View><Text>:</Text></View>
                        <View style={styles.nameContainer}>
                            <Text style={styles.nameTxt}>
                                {item?.coniguration && item?.quantity ?
                                    `${item?.coniguration} / ${item?.quantity}` : null}</Text>
                        </View>
                    </View>
                </>)
                : null
            }
            {props?.type === 'register' ?
                <>
                    <View style={styles.headdingView}>
                        <Text style={styles.headdingTxt}>{'Registration Details'}</Text>
                    </View>
                    <View style={styles.Txtview}>
                        <View style={styles.projectContainer}>
                            <Text style={styles.projectTxt}>Register Amount</Text>
                        </View>
                        <View><Text>:</Text></View>
                        <View style={styles.nameContainer}>
                            <Text style={styles.nameTxt}>
                                {item?.total_amount && item?.total_amount_type ?
                                    item?.total_amount + " " + item?.total_amount_type :
                                    null}</Text>
                        </View>
                    </View>
                    <View style={styles.Txtview}>
                        <View style={styles.projectContainer}>
                            <Text style={styles.projectTxt}>Register No.</Text>
                        </View>
                        <View><Text>:</Text></View>
                        <View style={styles.nameContainer}>
                            <Text style={styles.nameTxt}>
                                {item?.booking_no ?
                                    item?.booking_no : strings.notfount}</Text>
                        </View>
                    </View>
                    <View style={styles.Txtview}>
                        <View style={styles.projectContainer}>
                            <Text style={styles.projectTxt}>Register By</Text>
                        </View>
                        <View><Text>:</Text></View>
                        <View style={styles.nameContainer}>
                            <Text style={styles.nameTxt}>
                                {item?.register_by_name ?
                                    item?.register_by_name : null}</Text>
                        </View>
                    </View>
                    <View style={styles.Txtview}>
                        <View style={styles.projectContainer}>
                            <Text style={styles.projectTxt}>Configuration Qty</Text>
                        </View>
                        <View><Text>:</Text></View>
                        <View style={styles.nameContainer}>
                            <Text style={styles.nameTxt}>
                                {item?.configuration && item?.quantity ?
                                    `${item?.configuration} / ${item?.quantity}` : strings.notfount}</Text>
                        </View>
                    </View>
                </> : null
            }
        </ScrollView>
    )
}

export default BookingDetailsItem