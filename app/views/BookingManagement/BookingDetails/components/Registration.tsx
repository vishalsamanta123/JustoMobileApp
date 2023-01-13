
import { View, Text, Image, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import Modal from "react-native-modal";
import styles from "app/components/Modals/styles";
import Styles from './styles'
import images from "app/assets/images";
import strings from "app/components/utilities/Localization";
import Button from "app/components/Button";
import { AMOUNT_TYPE, DATE_FORMAT, Isios, PRIMARY_THEME_COLOR, WHITE_COLOR } from "app/components/utilities/constant";
import InputCalender from "app/components/InputCalender";
import moment from "moment";
import { normalizeSpacing } from "app/components/scaleFontSize";
import PicturePickerModal from "app/components/Modals/PicturePicker";
import InputField from "app/components/InputField";
import DropdownInput from "app/components/DropDown";

const RegistrationModal = (props: any) => {
    const handleDelete = (item: any, index: any) => {
        var array: any[] = [...props?.registerNowData?.documents];
        array?.splice(index, 1);
        props?.setRegisterNowData({
            ...props?.registerNowData,
            documents: array,
        });
    };
    const handleRegisterNow = () => {
        props.registerNowPress()
    }
    return (
        <Modal isVisible={props.Visible}>
            <View style={Styles.bookingModelVw}>
                <View style={styles.topContainer}>
                    <Text style={styles.topTxt}>{'Registration'}</Text>
                    <View>
                        <TouchableOpacity onPress={() => props.setIsVisible(false)}>
                            <Image source={images.close} style={styles.closeIcon} />
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={[styles.inputWrap, { top: normalizeSpacing(5) }]}>
                    <InputCalender
                        mode={'date'}
                        leftIcon={images.event}
                        placeholderText={"Registration Date"}
                        headingText={"Registration Date"}
                        minimumDate={new Date()}
                        editable={false}
                        dateData={(data: any) => {
                            props.setRegisterNowData({
                                ...props.registerNowData,
                                register_date: moment(data).format(DATE_FORMAT)
                            })
                        }}
                        setDateshow={(data: any) => {
                            props.setRegisterNowData({
                                ...props.registerNowData,
                                register_date: moment(data).format(DATE_FORMAT)
                            })
                        }}
                        value={props.registerNowData?.register_date}
                    />
                </View>
                <View style={[styles.inputWrap, Styles.straightVw]}>
                    <InputField
                        inputWidth={'70%'}
                        headingText={"Total Amount"}
                        handleInputBtnPress={() => { }}
                        onChangeText={(data: any) => {
                            props.setRegisterNowData({
                                ...props.registerNowData,
                                total_amount: data,
                            })
                        }}
                        valueshow={props?.registerNowData?.total_amount}
                        keyboardtype={'number-pad'}
                    />
                    <DropdownInput
                        inputWidth={Isios ? 45 : 49}
                        inputheight={Isios ? 20 : 45}
                        paddingLeft={10}
                        itemContainerStyle={{ width: 100 }}
                        iconStyle={{ width: 15, height: 15 }}
                        data={AMOUNT_TYPE}
                        itemTextStyle={{ fontSize: 8 }}
                        labelField="value"
                        valueField={'value'}
                        placeholder={props?.registerNowData?.total_amount_type}
                        value={props?.registerNowData?.total_amount_type}
                        onChange={(item: any) => {
                            props.setRegisterNowData({
                                ...props.registerNowData,
                                total_amount_type: item.value,
                            })
                        }}
                        newRenderItem={(item: any) => {
                            return (
                                <>
                                    <View style={Styles.item}>
                                        <Text style={Styles.textItem}>{item.value}</Text>
                                    </View>
                                </>
                            );
                        }}
                    />
                </View>
                <View style={[styles.inputWrap, Styles.straightVw]}>
                    <Text style={Styles.inputHeadingText}>{strings.document} :</Text>
                    <Button
                        width={110}
                        height={32}
                        buttonText={strings.browse}
                        bgcolor={PRIMARY_THEME_COLOR}
                        border={10}
                        handleBtnPress={() => props.setDocumentBrowse(true)}
                    />
                </View>
                {props.registerNowData?.documents?.length > 0 ?
                    props.registerNowData?.documents?.map((item: any, index: any) => {
                        return (
                            <View style={Styles.documentVw}>
                                <Text style={Styles.documentTxt}>{strings.document} {index + 1}</Text>
                                {/* <Image source={{ uri: item.uri }}
                                    style={Styles.documentIcon}
                                /> */}
                                <TouchableOpacity onPress={() => handleDelete(item, index)}>
                                    <Image source={images.close} style={Styles.documentIcon} />
                                </TouchableOpacity>
                            </View>
                        )
                    })
                    : null
                }
                <View style={{ marginVertical: 20 }}>
                    <Button
                        handleBtnPress={() => handleRegisterNow()}
                        buttonText={strings.registerNow} />
                </View>
            </View>
            <PicturePickerModal
                Visible={props.documentBrowse}
                setVisible={props.setDocumentBrowse}
                value={props?.registerNowData?.documents}
                imageData={(data: any) => {
                    props.setRegisterNowData({
                        ...props.registerNowData,
                        documents: data,
                    });
                }}
                multiple={true}
            />
        </Modal>
    );
};
export default RegistrationModal