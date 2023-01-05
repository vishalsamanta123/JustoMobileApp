import { View, Text, ScrollView, TouchableOpacity, Linking } from 'react-native'
import React from 'react'
import styles from './styles'
import Button from '../../../../components/Button'
import { normalize } from '../../../../components/scaleFontSize'
import strings from '../../../../components/utilities/Localization'
import { BLACK_COLOR } from 'app/components/utilities/constant'

const BookingDetailsItem = (props: any) => {
    const item = props?.item[0] || {}
    return (
        <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.topDetailsView}>
                <View style={styles.topTxtView}>
                    <Text style={styles.topTxt}>Visitor Score </Text>
                    <Text style={styles.topTxt}>{item?.leads?.lead_score === '' ||
                        item?.leads?.lead_score === null ||
                        item?.leads?.lead_score === undefined ?
                        strings.notfount : item?.leads?.lead_score}</Text>
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
                <View style={styles.Txtview}>
                    <View style={styles.projectContainer}>
                        <Text style={styles.projectTxt}>Configuration</Text>
                    </View>
                    <View><Text>:</Text></View>
                    <View style={styles.nameContainer}>
                        <Text style={styles.nameTxt}>{item?.coniguration === '' ||
                            item?.coniguration === null ||
                            item?.coniguration === undefined ?
                            strings.notfount : item?.coniguration}</Text>
                    </View>
                </View>
                <View style={styles.Txtview}>
                    <View style={styles.projectContainer}>
                        <Text style={styles.projectTxt}>Area (in sq.ft)</Text>
                    </View>
                    <View><Text>:</Text></View>
                    <View style={styles.nameContainer}>
                        <Text style={styles.nameTxt}>{item?.area === '' ||
                            item?.area === null ||
                            item?.area === undefined ?
                            strings.notfount : item?.area}</Text>
                    </View>
                </View>
                <View style={styles.Txtview}>
                    <View style={styles.projectContainer}>
                        <Text style={styles.projectTxt}>Budget</Text>
                    </View>
                    <View><Text>:</Text></View>
                    <View style={styles.nameContainer}>
                        <Text style={styles.nameTxt}>{
                            item?.leads?.customer?.min_budget || item?.leads?.customer?.max_budget ?
                                `${item?.leads?.customer?.min_budget} ${item?.leads?.customer?.min_budget_type} - ${item?.leads?.customer?.max_budget} ${item?.leads?.customer?.max_budget_type}`
                                : strings.notfount
                        }</Text>
                    </View>
                </View>
                <View style={styles.Txtview}>
                    <View style={styles.projectContainer}>
                        <Text style={styles.projectTxt}>Current Status</Text>
                    </View>
                    <View><Text>:</Text></View>
                    <View style={styles.nameContainer}>
                        {/* booking_status: {//1= Panding, 2 = Confirm, 3= Compleat, 4 =booking cancel} */}
                        <Text style={[styles.nameTxt, {
                            color: item?.booking_status === 1 || item?.booking_status === 4 ? 'red' : BLACK_COLOR
                        }]}>{
                                item?.booking_status === 1 ? 'Pending' :
                                    item?.booking_status === 2 ? 'Confirm' :
                                        item?.booking_status === 3 ? 'Completed' :
                                            item?.booking_status === 4 && 'Booking Cancel'
                            }</Text>
                    </View>
                </View>
            </>
            <View style={styles.Txtview}>
                <View style={styles.projectContainer}>
                    <Text style={styles.projectTxt}>Property Name</Text>
                </View>
                <View><Text>:</Text></View>
                <View style={styles.nameContainer}>
                    <Text style={styles.nameTxt}>{item?.properties?.property_title === '' ||
                        item?.properties?.property_title === null ||
                        item?.properties?.property_title === undefined ?
                        strings.notfount : item?.properties?.property_title}</Text>
                </View>
            </View>
            <View style={styles.Txtview}>
                <View style={styles.projectContainer}>
                    <Text style={styles.projectTxt}>Visitor Name</Text>
                </View>
                <View><Text>:</Text></View>
                <View style={styles.nameContainer}>
                    <Text style={styles.nameTxt}>{item?.leads?.customer?.first_name === '' ||
                        item?.leads?.customer?.first_name === null ||
                        item?.leads?.customer?.first_name === undefined ?
                        strings.notfount : item?.leads?.customer?.first_name}</Text>
                </View>
            </View>
            <View style={styles.Txtview}>
                <View style={styles.projectContainer}>
                    <Text style={styles.projectTxt}>Source</Text>
                </View>
                <View><Text>:</Text></View>
                <View style={styles.nameContainer}>
                    <Text style={styles.nameTxt}>{item?.creaters?.user_name === '' ||
                        item?.creaters?.user_name === null ||
                        item?.creaters?.user_name === undefined ?
                        strings.notfount : item?.creaters?.user_name}</Text>
                </View>
            </View>
            {/* <View style={styles.Txtview}>
                <View style={styles.projectContainer}>
                    <Text style={styles.projectTxt}>Closing Date</Text>
                </View>
                <View><Text>:</Text></View>
                <View style={styles.nameContainer}>
                    <Text style={styles.nameTxt}>nullll</Text>
                </View>
            </View> */}
            {props?.type !== 'readyToBook' ? (
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
                            <Text style={styles.nameTxt}>{item?.booking_amount === '' ||
                                item?.booking_amount === null ||
                                item?.booking_amount === undefined ?
                                strings.notfount : item?.booking_amount}</Text>
                        </View>
                    </View>
                    <View style={styles.Txtview}>
                        <View style={styles.projectContainer}>
                            <Text style={styles.projectTxt}>Cheque No.</Text>
                        </View>
                        <View><Text>:</Text></View>
                        <View style={styles.nameContainer}>
                            <Text style={styles.nameTxt}>{item?.tranjection_upi_cheque_number === '' ||
                                item?.tranjection_upi_cheque_number === null ||
                                item?.tranjection_upi_cheque_number === undefined ?
                                strings.notfount : item?.tranjection_upi_cheque_number}</Text>
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
        </ScrollView>
    )
}

export default BookingDetailsItem