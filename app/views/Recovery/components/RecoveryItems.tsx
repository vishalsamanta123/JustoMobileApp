import { View, Text, TouchableOpacity, Image, Linking } from 'react-native';
import React from 'react';
import styles from './styles';
import strings from 'app/components/utilities/Localization';
import { BLACK_COLOR, PURPLE_COLOR, RED_COLOR, WHITE_COLOR, } from 'app/components/utilities/constant';
import images from 'app/assets/images';
import Button from 'app/components/Button';
import moment from 'moment';

const RecoveryItems = (props: any) => {
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
            {/* {(props.type === 'request' ?
                <>
                    <View style={styles.Txtview} >
                        <View style={styles.projectContainer}>
                            <Text style={styles.projectTxt}>Configuration :</Text>
                        </View>
                        <View style={styles.nameContainer}>
                            <Text style={styles.nameTxt}>{
                                props.items.configuration_title?.length > 0 ?
                                    props.items.configuration_title[0] : ''}</Text>
                        </View>
                    </View>
                    <View style={styles.Txtview}>
                        <View style={styles.projectContainer}>
                            <Text style={styles.projectTxt}>Budget :</Text>
                        </View>
                        <View style={styles.nameContainer}>
                            <Text style={styles.nameTxt}>{
                                props.items.min_budget || props.items.max_budget ?
                                    `${props.items.min_budget}${props.items.min_budget_type} - ${props.items.max_budget}${props.items.max_budget_type}`
                                    : null
                            }</Text>
                        </View>
                    </View>
                    <View style={styles.Txtview} >
                        <View style={styles.projectContainer}>
                            <Text style={styles.projectTxt}>Booking Amount :</Text>
                        </View>
                        <View style={styles.nameContainer}>
                            <Text style={styles.nameTxt}>{props.items.booking_amount}</Text>
                        </View>
                    </View>
                </>
                : null
            )} */}
            <View style={[styles.Txtview, { borderBottomWidth: 0 }]} >
                <View style={styles.projectContainer}>
                    <Text style={styles.projectTxt}>Booking Status :</Text>
                </View>
                <View style={styles.nameContainer}>
                    {/* booking_status: {//1= Panding, 2 = Confirm, 3= Compleat, 4 =booking cancel} */}
                    <Text style={[styles.nameTxt, {
                        color: RED_COLOR
                    }]}>{props?.items?.booking_status && 'Booking Cancel'}</Text>
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

export default RecoveryItems;
