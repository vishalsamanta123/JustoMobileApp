import { View, Text, ScrollView, TouchableOpacity, Linking } from 'react-native'
import React from 'react'
import styles from './Styles'
import Button from '../../../../components/Button'
import { normalize } from '../../../../components/scaleFontSize'
import strings from '../../../../components/utilities/Localization'
import moment from 'moment'
import { BLACK_COLOR } from 'app/components/utilities/constant'

const LeadDetailsIteam = (props: any) => {
    const item = props?.items || {}
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
                                `tel:${item?.customer_detail?.mobile}`
                            )
                        }}
                    >
                        <Text style={styles.buttonTxt}>Call</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => {
                            Linking?.openURL(
                                `sms:${item?.customer_detail?.mobile}`
                            )
                        }}
                    >
                        <Text style={styles.buttonTxt}>SMS</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => {
                            Linking?.openURL(
                                `https:wa.me/${item?.customer_detail?.whatsapp_no}`
                            )
                        }}
                    >
                        <Text style={[styles.buttonTxt, { fontSize: normalize(10) }]}>WhatsApp</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.Txtview}>
                <View style={styles.projectContainer}>
                    <Text style={styles.projectTxt}>Property Name</Text>
                </View>
                <View><Text>:</Text></View>
                <View style={styles.nameContainer}>
                    <Text style={styles.nameTxt}>{item?.property_title}</Text>
                </View>
            </View>
            <View style={styles.Txtview}>
                <View style={styles.projectContainer}>
                    <Text style={styles.projectTxt}>Last Interacted</Text>
                </View>
                <View><Text>:</Text></View>
                <View style={styles.nameContainer}>
                    <Text style={styles.nameTxt}>{
                        item?.last_interacted_date === '' ||
                            item?.last_interacted_date === undefined || item?.last_interacted_date === "undefined" ?
                            strings.notfount :
                            moment(item?.last_interacted_date).format('llll')
                    }</Text>
                </View>
            </View>
            <View style={styles.Txtview}>
                <View style={styles.projectContainer}>
                    <Text style={styles.projectTxt}>Source</Text>
                </View>
                <View><Text>:</Text></View>
                <View style={styles.nameContainer}>
                    <Text style={styles.nameTxt}>{item?.created_name === '' ||
                        item?.created_name === undefined || item?.created_name === "undefined" ?
                        strings.notfount :
                        item?.created_name}</Text>
                </View>
            </View>
            <View style={styles.Txtview}>
                <View style={styles.projectContainer}>
                    <Text style={styles.projectTxt}>Status</Text>
                </View>
                <View><Text>:</Text></View>
                <View style={styles.nameContainer}>
                    <Text style={[styles.nameTxt, {
                        color: item?.lead_status === 6 ? 'red' : BLACK_COLOR
                    }]}>
                        {item?.lead_status === 1 ? "Lead Created" :
                            item?.lead_status === 2 ? "Follow-up" :
                                item?.lead_status === 3 ? "Appointment" :
                                    item?.lead_status === 4 ? "Booking" :
                                        item?.lead_status === 5 ? "Registration" :
                                            item?.lead_status === 6 ? "Close" :
                                            item?.lead_status === 7 && "Ready To Book" 
                                            
                        }</Text>
                </View>
            </View>
            {/* Property Required */}
            <>
                <View style={styles.headdingView}>
                    <Text style={styles.headdingTxt}>{strings.propertyrequired}</Text>
                </View>
                <View style={styles.Txtview}>
                    <View style={styles.projectContainer}>
                        <Text style={styles.projectTxt}>Configuration</Text>
                    </View>
                    <View><Text>:</Text></View>
                    <View style={styles.nameContainer}>
                        <Text style={styles.nameTxt}>{item?.customer_detail?.configuration === '' ||
                            item?.customer_detail?.configuration === undefined ||
                            item?.customer_detail?.configuration === null ||
                            item?.customer_detail?.configuration === "undefined" ?
                            strings.notfount :
                            item?.customer_detail?.configuration}</Text>
                    </View>
                </View>
                <View style={styles.Txtview}>
                    <View style={styles.projectContainer}>
                        <Text style={styles.projectTxt}>Area (in sq.ft)</Text>
                    </View>
                    <View><Text>:</Text></View>
                    <View style={styles.nameContainer}>
                        <Text style={styles.nameTxt}>{item?.customer_detail?.areain_sqlft === '' ||
                            item?.customer_detail?.areain_sqlft === undefined ||
                            item?.customer_detail?.areain_sqlft === "undefined" ?
                            strings.notfount :
                            item?.customer_detail?.areain_sqlft}</Text>
                    </View>
                </View>
                <View style={styles.Txtview}>
                    <View style={styles.projectContainer}>
                        <Text style={styles.projectTxt}>Budget</Text>
                    </View>
                    <View><Text>:</Text></View>
                    <View style={styles.nameContainer}>
                        <Text style={styles.nameTxt}>{
                            item?.customer_detail?.min_budget || item?.customer_detail?.max_budget ?
                            `${item?.customer_detail?.min_budget} ${item?.customer_detail?.min_budget_type} - ${item?.customer_detail?.max_budget} ${item?.customer_detail?.max_budget_type}`
                            : strings.notfount
                        }</Text>
                    </View>
                </View>
                <View style={styles.Txtview}>
                    <View style={styles.projectContainer}>
                        <Text style={styles.projectTxt}>Nature Of Funding</Text>
                    </View>
                    <View><Text>:</Text></View>
                    <View style={styles.nameContainer}>
                        <Text style={styles.nameTxt}>{item?.customer_detail?.funding_type === '' ||
                            item?.customer_detail?.funding_type === undefined ||
                            item?.customer_detail?.funding_type === "undefined" ?
                            strings.notfount :
                            item?.customer_detail?.funding_type}</Text>
                    </View>
                </View>
                <View style={styles.Txtview}>
                    <View style={styles.projectContainer}>
                        <Text style={styles.projectTxt}>Purpose</Text>
                    </View>
                    <View><Text>:</Text></View>
                    <View style={styles.nameContainer}>
                        <Text style={styles.nameTxt}>{item?.customer_detail?.purpose === '' ||
                            item?.customer_detail?.purpose === undefined ||
                            item?.customer_detail?.purpose === "undefined" ?
                            strings.notfount :
                            item?.customer_detail?.purpose}</Text>
                    </View>
                </View>
            </>
            {/* Customer Details */}
            <>
                <View style={styles.headdingView}>
                    <Text style={styles.headdingTxt}>{strings.Customerdetails}</Text>
                </View>
                <View style={styles.Txtview}>
                    <View style={styles.projectContainer}>
                        <Text style={styles.projectTxt}>Visitor Name</Text>
                    </View>
                    <View><Text>:</Text></View>
                    <View style={styles.nameContainer}>
                        <Text style={styles.nameTxt}>{item?.customer_detail?.first_name === '' ||
                            item?.customer_detail?.first_name === undefined ||
                            item?.customer_detail?.first_name === "undefined"
                            ? strings.notfount :
                            item?.customer_detail?.first_name
                        }</Text>
                    </View>
                </View>
                <View style={styles.Txtview}>
                    <View style={styles.projectContainer}>
                        <Text style={styles.projectTxt}>Location</Text>
                    </View>
                    <View><Text>:</Text></View>
                    <View style={styles.nameContainer}>
                        <Text style={styles.nameTxt}>{item?.customer_detail?.location === '' ||
                            item?.customer_detail?.location === undefined ||
                            item?.customer_detail?.location === "undefined"
                            ? strings.notfount :
                            item?.customer_detail?.location}</Text>
                    </View>
                </View>
                <View style={styles.Txtview}>
                    <View style={styles.projectContainer}>
                        <Text style={styles.projectTxt}>Age</Text>
                    </View>
                    <View><Text>:</Text></View>
                    <View style={styles.nameContainer}>
                        <Text style={styles.nameTxt}>{item?.customer_detail?.age === '' ||
                            item?.customer_detail?.age === undefined ||
                            item?.customer_detail?.age === "undefined" || item?.customer_detail?.age === null
                            ? strings.notfount :
                            item?.customer_detail?.age}</Text>
                    </View>
                </View>
                <View style={styles.Txtview}>
                    <View style={styles.projectContainer}>
                        <Text style={styles.projectTxt}>Gender</Text>
                    </View>
                    <View><Text>:</Text></View>
                    <View style={styles.nameContainer}>
                        <Text style={styles.nameTxt}>{item?.customer_detail?.gender === '' ||
                            item?.customer_detail?.gender === undefined ||
                            item?.customer_detail?.gender === "undefined" || item?.customer_detail?.gender === null
                            ? strings.notfount :
                            item?.customer_detail?.gender === 1 ? "Male" : "Female"}</Text>
                    </View>
                </View>
                <View style={styles.Txtview}>
                    <View style={styles.projectContainer}>
                        <Text style={styles.projectTxt}>Locality</Text>
                    </View>
                    <View><Text>:</Text></View>
                    <View style={styles.nameContainer}>
                        <Text style={styles.nameTxt}>{item?.customer_detail?.city === '' ||
                            item?.customer_detail?.city === undefined ||
                            item?.customer_detail?.city === "undefined" || item?.customer_detail?.city === null
                            ? strings.notfount :
                            item?.customer_detail?.city}</Text>
                    </View>
                </View>
            </>
            {/* Company Details */}
            <>
                <View style={styles.headdingView}>
                    <Text style={styles.headdingTxt}>{strings.ocupacion}</Text>
                </View>
                <View style={styles.Txtview}>
                    <View style={styles.projectContainer}>
                        <Text style={styles.projectTxt}>Nature of Occupation</Text>
                    </View>
                    <View><Text>:</Text></View>
                    <View style={styles.nameContainer}>
                        <Text style={styles.nameTxt}>{item?.customer_detail?.occupation === '' ||
                            item?.customer_detail?.occupation === undefined ||
                            item?.customer_detail?.occupation === "undefined" || item?.customer_detail?.occupation === null
                            ? strings.notfount :
                            item?.customer_detail?.occupation}</Text>
                    </View>
                </View>
                <View style={styles.Txtview}>
                    <View style={styles.projectContainer}>
                        <Text style={styles.projectTxt}>Company Name</Text>
                    </View>
                    <View><Text>:</Text></View>
                    <View style={styles.nameContainer}>
                        <Text style={styles.nameTxt}>{item?.customer_detail?.coumpany_name === '' ||
                            item?.customer_detail?.coumpany_name === undefined ||
                            item?.customer_detail?.coumpany_name === "undefined" || item?.customer_detail?.coumpany_name === null
                            ? strings.notfount :
                            item?.customer_detail?.coumpany_name}</Text>
                    </View>
                </View>
                <View style={styles.Txtview}>
                    <View style={styles.projectContainer}>
                        <Text style={styles.projectTxt}>Designation</Text>
                    </View>
                    <View><Text>:</Text></View>
                    <View style={styles.nameContainer}>
                        <Text style={styles.nameTxt}>{item?.customer_detail?.desigantion === '' ||
                            item?.customer_detail?.desigantion === undefined ||
                            item?.customer_detail?.desigantion === "undefined" || item?.customer_detail?.desigantion === null
                            ? strings.notfount :
                            item?.customer_detail?.desigantion}</Text>
                    </View>
                </View>
                <View style={styles.Txtview}>
                    <View style={styles.projectContainer}>
                        <Text style={styles.projectTxt}>Office Address</Text>
                    </View>
                    <View><Text>:</Text></View>
                    <View style={styles.nameContainer}>
                        <Text style={styles.nameTxt}>{item?.customer_detail?.office_address === '' ||
                            item?.customer_detail?.office_address === undefined ||
                            item?.customer_detail?.office_address === "undefined" || item?.customer_detail?.office_address === null
                            ? strings.notfount :
                            item?.customer_detail?.office_address}</Text>
                    </View>
                </View>
            </>
        </ScrollView>
    )
}

export default LeadDetailsIteam