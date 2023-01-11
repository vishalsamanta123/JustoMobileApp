import React from "react";
import { View, Text, Image, TouchableOpacity, ScrollView } from 'react-native';
import styles from "./styles";
import TopScreensViewer from './TopScreensViewer'
import Header from "../../../../components/Header";
import images from "../../../../assets/images";
import strings from "../../../../components/utilities/Localization";
import { BLACK_COLOR, DATE_FORMAT, PRIMARY_THEME_COLOR } from "../../../../components/utilities/constant";
import InputField from "../../../../components/InputField";
import { RadioButton } from "react-native-paper";
import Button from "../../../../components/Button";
import { normalize } from "../../../../components/scaleFontSize";
import moment from "moment";
import InputCalender from "app/components/InputCalender";

const VisitorUpdateView = (props: any) => {
    return (
        <View style={styles.mainContainer}>
            <Header
                leftImageSrc={images.backArrow}
                rightSecondImageScr={images.notification}
                headerText={strings.visitor + " " + strings.update}
                headerStyle={styles.headerStyle}
                RightFirstIconStyle={styles.leftImageIconStyle}
                leftImageIconStyle={styles.leftImageIconStyle}
                handleOnLeftIconPress={props.handleBackPress}
                barStyle={'light-content'}
                statusBarColor={PRIMARY_THEME_COLOR}
            />
            <View style={styles.noMoveVw}>
                {/* <TopScreensViewer type={props.screenType} /> */}
            </View>
            <ScrollView keyboardShouldPersistTaps={'handled'}
                contentContainerStyle={styles.wrap}>
                <View style={styles.inputWrap}>
                    <InputField
                        placeholderText={"Name"}
                        editable={false}
                        handleInputBtnPress={() => { }}
                        onChangeText={(text: any) => {
                            props.setUpdateForm({
                                ...props.updateForm,
                                property_title: text
                            })
                        }}
                        valueshow={props?.updateForm?.property_title}
                        headingText={"Property Name"}
                    />
                </View>
                <View style={styles.typeVw}>
                    <Text style={styles.typeTxt}>Visitor Details</Text>
                    <View style={styles.typeBorders} />
                </View>
                <View style={styles.inputWrap}>
                    <InputField
                        placeholderText={"Name"}
                        handleInputBtnPress={() => { }}
                        onChangeText={(text: any) => {
                            props.setUpdateForm({
                                ...props.updateForm,
                                first_name: text
                            })
                        }}
                        valueshow={props?.updateForm?.first_name}
                        headingText={"Visitor Name"}
                    />
                </View>
                <View style={styles.inputWrap}>
                    <InputField
                        placeholderText={"Mobile No."}
                        handleInputBtnPress={() => { }}
                        onChangeText={(text: any) => {
                            props.setUpdateForm({
                                ...props.updateForm,
                                mobile: text
                            })
                        }}
                        valueshow={props?.updateForm?.mobile?.toString()}
                        headingText={"Mobile No."}
                        keyboardtype={'number-pad'}
                        maxLength={10}
                    />
                </View>
                <View style={styles.inputWrap}>
                    <InputField
                        placeholderText={"3675 9834 6012"}
                        handleInputBtnPress={() => { }}
                        onChangeText={(text: any) => {
                            props.setUpdateForm({
                                ...props.updateForm,
                                adhar_no: text
                            })
                        }}
                        valueshow={props?.updateForm?.adhar_no?.toString()}
                        headingText={"Aadhaar No."}
                        maxLength={12}
                    />
                </View>
                <View style={styles.inputWrap}>
                    <InputField
                        placeholderText={"BNZAA2318JM"}
                        handleInputBtnPress={() => { }}
                        onChangeText={(text: any) => {
                            props.setUpdateForm({
                                ...props.updateForm,
                                pancard_no: text
                            })
                        }}
                        valueshow={props?.updateForm?.pancard_no?.toString()}
                        headingText={"Pancard No."}
                        maxLength={10}
                    />
                </View>
                <View style={styles.selectsView}>
                    <Text style={styles.selectsTxt}>{strings.gender}</Text>
                    <View style={styles.radioView}>
                        <RadioButton.Android
                            value="1"
                            status={props.updateForm.gender === 1 ? "checked" : "unchecked"}
                            onPress={() => props.setUpdateForm({
                                ...props.updateForm,
                                gender: 1
                            })}
                            color={PRIMARY_THEME_COLOR}
                        />
                        <Text
                            style={[
                                styles.radioTxt,
                                {
                                    color:
                                        props.updateForm.gender === 1 ? PRIMARY_THEME_COLOR : BLACK_COLOR,
                                },
                            ]}
                        >
                            {strings.male}
                        </Text>
                    </View>
                    <View style={styles.radioView}>
                        <RadioButton.Android
                            value="2"
                            status={props.updateForm.gender === 2 ? "checked" : "unchecked"}
                            onPress={() => props.setUpdateForm({
                                ...props.updateForm,
                                gender: 2
                            })}
                            color={PRIMARY_THEME_COLOR}
                        />
                        <Text
                            style={[
                                styles.radioTxt,
                                {
                                    color:
                                        props.updateForm.gender === 2 ? PRIMARY_THEME_COLOR : BLACK_COLOR,
                                },
                            ]}
                        >
                            {strings.female}
                        </Text>
                    </View>
                </View>
                <View style={styles.inputWrap}>
                    <InputCalender
                        leftIcon={images.event}
                        mode={"date"}
                        placeholderText={"Date of Birth"}
                        headingText={"Date of Birth"}
                        editable={false}
                        dateData={(data: any) => {
                            props.setUpdateForm({
                                ...props.updateForm,
                                birth_date: moment(data).format(DATE_FORMAT),
                            });
                        }}
                        setDateshow={(data: any) => {
                            props.setUpdateForm({
                                ...props.updateForm,
                                birth_date: moment(data).format(DATE_FORMAT),
                            });
                        }}
                        value={props?.updateForm?.birth_date === '' ||
                            props?.updateForm?.birth_date === undefined ||
                            props?.updateForm?.birth_date === null ?
                            "" :
                            moment(props?.updateForm?.birth_date).format(DATE_FORMAT)
                        }
                    />
                </View>
                <View style={styles.inputWrap}>
                    <InputField
                        placeholderText={"WhatsApp No."}
                        handleInputBtnPress={() => { }}
                        onChangeText={(text: any) => {
                            props.setUpdateForm({
                                ...props.updateForm,
                                whatsapp_no: text
                            })
                        }}
                        valueshow={props?.updateForm?.whatsapp_no?.toString()}
                        headingText={"WhatsApp No."}
                        keyboardtype={'number-pad'}
                        maxLength={10}
                    />
                </View>
                <View style={styles.inputWrap}>
                    <InputField
                        placeholderText={"Email Address"}
                        handleInputBtnPress={() => { }}
                        onChangeText={(text: any) => {
                            props.setUpdateForm({
                                ...props.updateForm,
                                email: text
                            })
                        }}
                        valueshow={props?.updateForm?.email}
                        headingText={"Email Address"}
                    />
                </View>
                <View style={[styles.inputWrap, { marginBottom: normalize(10) }]}>
                    <InputField
                        inputType={'location'}
                        placeholderText={"Location"}
                        headingText={"Location"}
                        valueshow={props?.updateForm?.location}
                        onChangeText={(data: any) => {
                            props.setUpdateForm({
                                ...props.updateForm,
                                location: data ? data : props?.updateForm?.location,
                            })
                        }}
                        onPressSelect={(data: any, detail: any) => {
                            props.setUpdateForm({
                                ...props.updateForm,
                                location: data?.description,
                                latitude: detail?.geometry?.location?.lat,
                                longitude: detail?.geometry?.location?.lng,
                            })
                        }}
                    />
                </View>
            </ScrollView>
            <View style={styles.noMoveVw}>
                <Button
                    handleBtnPress={(type: any) => props.onPressNext(1)}
                    rightImage={images.forwardArrow}
                    buttonText={strings.next}
                    textTransform={"uppercase"}
                />
            </View>
        </View>
    )
}
export default VisitorUpdateView