import DropdownInput from "app/components/DropDown";
import React from "react";
import { View, Text, Image, ScrollView } from 'react-native';
import images from "../../../../assets/images";
import Button from "../../../../components/Button";
import Header from "../../../../components/Header";
import InputField from "../../../../components/InputField";
import PicturePickerModal from "../../../../components/Modals/PicturePicker";
import { normalize } from "../../../../components/scaleFontSize";
import Styles from 'app/components/Modals/styles'
import { PRIMARY_THEME_COLOR } from "../../../../components/utilities/constant";
import strings from "../../../../components/utilities/Localization";
import styles from "./styles";

const BookingView = (props: any) => {
console.log('props?.propertyConfData: ', props?.propertyConfData);
    return (
        <View style={styles.mainContainer}>
            <Header
                leftImageSrc={images.backArrow}
                rightSecondImageScr={images.notification}
                headerText={strings.bookNow}
                headerStyle={styles.headerStyle}
                RightFirstIconStyle={styles.leftImageIconStyle}
                leftImageIconStyle={styles.leftImageIconStyle}
                handleOnLeftIconPress={props.handleBackPress}
                barStyle={'light-content'}
                statusBarColor={PRIMARY_THEME_COLOR}
            />
            <ScrollView keyboardShouldPersistTaps={'handled'}
                contentContainerStyle={{ flexGrow: 1 }}>
                <View style={styles.containerVw}>
                    <View style={styles.inputWrap}>
                        <InputField
                            placeholderText={"Amount"}
                            onChangeText={(data: any) => {
                                props.setBookingData({
                                    ...props.bookingData,
                                    booking_amount: data
                                })
                            }}
                            valueshow={props?.bookingData?.booking_amount}
                            keyboardtype={'number-pad'}
                            headingText={"Booking Amount"}
                        />
                    </View>
                    <View style={styles.inputWrap}>
                        <DropdownInput
                            headingText={"Payment Type"}
                            data={Array.isArray(props?.masterDatas) ? props?.masterDatas : []}
                            inputWidth={'100%'}
                            paddingLeft={16}
                            maxHeight={300}
                            onFocus={() => props.getDropDownData(10)}
                            labelField={"title"}
                            valueField={'title'}
                            placeholder={props?.bookingData?.payment_type ?
                                props?.bookingData?.payment_type : ''}
                            value={props?.bookingData?.payment_type}
                            onChange={(item: any) => {
                                props.setBookingData({
                                    ...props.bookingData,
                                    payment_type: item.title,
                                })
                            }}
                            newRenderItem={(item: any) => {
                                return (
                                    <>
                                        <View style={Styles.item}>
                                            <Text style={Styles.textItem}>{item.title}</Text>
                                        </View>
                                    </>
                                );
                            }}
                        />
                    </View>
                    {props.bookingData?.payment_type === 'Cheque' ?
                        <>
                            <View style={styles.inputWrap}>
                                <InputField
                                    placeholderText={"Number"}
                                    handleInputBtnPress={() => { }}
                                    onChangeText={(data: any) => {
                                        props.setBookingData({
                                            ...props.bookingData,
                                            tranjection_upi_cheque_number: data
                                        })
                                    }}
                                    valueshow={props?.bookingData?.tranjection_upi_cheque_number}
                                    headingText={"Cheque No."}
                                />
                            </View>
                            <View style={styles.straightVw}>
                                <Text style={[styles.titleTxt, {
                                    bottom: typeof props?.bookingData?.cheque_image === 'object' ? 8 : 0
                                }]}>Cheque Photo : </Text>
                                <View>
                                    <Button
                                        width={130}
                                        height={45}
                                        buttonText={strings.browse}
                                        bgcolor={PRIMARY_THEME_COLOR}
                                        border={14}
                                        handleBtnPress={() => props.setBrowse(true)}
                                    />
                                    {typeof props?.bookingData?.cheque_image === 'object' ?
                                        <Text style={{ fontSize: 12, textAlign: "center" }}>{"Cheque Added"}</Text> : null
                                    }
                                </View>
                            </View>
                        </>
                        : null
                    }
                    {/* <View style={styles.inputWrap}>
                    <InputCalender
                        mode={'date'}
                        leftIcon={images.event}
                        placeholderText={"Booking Date"}
                        editable={false}
                        dateData={(data: any) => {
                            props.setBookingData({
                                ...props.booking_date,
                                booking_date: moment(data).format(DATE_FORMAT)
                            })
                        }}
                        setDateshow={(data: any) => {
                            props.setBookingData({
                                ...props.bookingData,
                                booking_date: moment(data).format(DATE_FORMAT)
                            })
                        }}
                        value={props.bookingData?.booking_date}
                    />
                </View> */}
                    <View style={[styles.straightVw, { marginTop: normalize(20) }]}>
                        <View style={{ width: '48%' }}>
                            <DropdownInput
                                headingText={'Configuration'}
                                onFocus={() => props.getDropDownData()}
                                placeholder={props?.bookingData?.coniguration ?
                                    props?.bookingData?.coniguration : 'Configuration'}
                                data={Array.isArray(props?.propertyConfData) ? props?.propertyConfData : []}
                                inputWidth={'100%'}
                                paddingLeft={16}
                                maxHeight={300}
                                labelField={"configuration_title"}
                                valueField={'configuration_id'}
                                value={props?.bookingData?.configuration_id}
                                onChange={(item: any) => {
                                    props.setBookingData({
                                        ...props.bookingData,
                                        coniguration_id: item.configuration_id,
                                        coniguration: item.configuration_title
                                    })
                                }}
                                newRenderItem={(item: any) => {
                                    return (
                                        <>
                                            <View style={Styles.item}>
                                                <Text style={Styles.textItem}>{item.configuration_title}</Text>
                                            </View>
                                        </>
                                    );
                                }}
                            />
                        </View>
                        <View style={{ width: '48%' }}>
                            <InputField
                                placeholderText={"Qty"}
                                handleInputBtnPress={() => { }}
                                headingText={"Qty"}
                                keyboardtype={'number-pad'}
                                onChangeText={(data: any) => {
                                    props.setBookingData({
                                        ...props.bookingData,
                                        quantity: data
                                    })
                                }}
                                valueshow={props?.bookingData?.quantity}
                            />
                        </View>
                    </View>
                    <View style={styles.inputWrap}>
                        <InputField
                            headingText={"Comment"}
                            placeholderText={"Comment"}
                            inputheight={80}
                            onChangeText={(data: any) => {
                                props.setBookingData({
                                    ...props.bookingData,
                                    description: data
                                })
                            }}
                            valueshow={props?.bookingData?.description}
                        />
                    </View>
                    <View style={{ marginVertical: normalize(30) }}>
                        <Button
                            buttonText={strings.bookNow}
                            bgcolor={PRIMARY_THEME_COLOR}
                            border={14}
                            handleBtnPress={() => props.handleBookPress()}
                        />
                    </View>
                </View>
            </ScrollView>
            <PicturePickerModal
                Visible={props.browse}
                setVisible={props.setBrowse}
                imageData={(data: any) => {
                    props.setBookingData({
                        ...props.bookingData,
                        cheque_image: data,
                    });
                }}
            />
        </View>
    )
}
export default BookingView