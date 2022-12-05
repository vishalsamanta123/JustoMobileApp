import { View, Text, ScrollView, TouchableOpacity } from 'react-native'
import React from 'react'
import styles from './styles'
import Button from '../../../../components/Button'
import { normalize } from '../../../../components/scaleFontSize'
import strings from '../../../../components/utilities/Localization'

const BookingDetailsItem = (props: any) => {
    const item = props?.item[0] || {}
    console.log('item: ', item);
    return (
        <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.topDetailsView}>
                <View style={styles.topTxtView}>
                    <Text style={styles.topTxt}>Visitor Score </Text>
                    <Text style={styles.topTxt}>{item?.leads?.lead_score}</Text>
                </View>
                <View style={styles.topBtnView}>
                    <TouchableOpacity
                        style={styles.button} >
                        <Text style={styles.buttonTxt}>Call</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.button} >
                        <Text style={styles.buttonTxt}>SMS</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.button} >
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
                        <Text style={styles.nameTxt}>{item?.leads?.customer?.configuration}</Text>
                    </View>
                </View>
                <View style={styles.Txtview}>
                    <View style={styles.projectContainer}>
                        <Text style={styles.projectTxt}>Area (in sq.ft)</Text>
                    </View>
                    <View><Text>:</Text></View>
                    <View style={styles.nameContainer}>
                        <Text style={styles.nameTxt}>{item?.leads?.customer?.area}</Text>
                    </View>
                </View>
                <View style={styles.Txtview}>
                    <View style={styles.projectContainer}>
                        <Text style={styles.projectTxt}>Budget</Text>
                    </View>
                    <View><Text>:</Text></View>
                    <View style={styles.nameContainer}>
                        <Text style={styles.nameTxt}>{item?.leads?.customer?.budget}</Text>
                    </View>
                </View>
                <View style={styles.Txtview}>
                    <View style={styles.projectContainer}>
                        <Text style={styles.projectTxt}>Current Status</Text>
                    </View>
                    <View><Text>:</Text></View>
                    <View style={styles.nameContainer}>
                        <Text style={styles.nameTxt}>{
                            item?.booking_status === 1 ? 'Pending' :
                                item?.booking_status === 2 ? 'Confirm' :
                                    item?.booking_status === 3 ? 'Completed' : 'Booking Cancel'
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
            <View style={styles.Txtview}>
                <View style={styles.projectContainer}>
                    <Text style={styles.projectTxt}>Closing Date</Text>
                </View>
                <View><Text>:</Text></View>
                <View style={styles.nameContainer}>
                    <Text style={styles.nameTxt}>nullll</Text>
                </View>
            </View>
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
                        <Text style={styles.nameTxt}>nulllll</Text>
                    </View>
                </View>
                <View style={styles.Txtview}>
                    <View style={styles.projectContainer}>
                        <Text style={styles.projectTxt}>Payment Type</Text>
                    </View>
                    <View><Text>:</Text></View>
                    <View style={styles.nameContainer}>
                        <Text style={styles.nameTxt}>{
                            item?.payment_type === 1 ? 'Cash' :
                                item?.payment_type === 2 ? 'cheque' : 'upi/online'
                        }</Text>
                    </View>
                </View>
                <View style={styles.Txtview}>
                    <View style={styles.projectContainer}>
                        <Text style={styles.projectTxt}>Configuration Qty</Text>
                    </View>
                    <View><Text>:</Text></View>
                    <View style={styles.nameContainer}>
                        <Text style={styles.nameTxt}>{'nullllll'}</Text>
                    </View>
                </View>
            </>
        </ScrollView>
    )
}

export default BookingDetailsItem