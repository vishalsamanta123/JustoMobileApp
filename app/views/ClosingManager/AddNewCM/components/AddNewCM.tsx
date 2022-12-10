import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import images from '../../../../assets/images';
import Header from '../../../../components/Header';
import InputField from '../../../../components/InputField';
import styles from './styles';
import { RadioButton } from "react-native-paper";
import { BLACK_COLOR, DATE_FORMAT, GRAY_COLOR, PRIMARY_THEME_COLOR, WHITE_COLOR } from '../../../../components/utilities/constant';
import Button from '../../../../components/Button';
import strings from '../../../../components/utilities/Localization';
import PicturePickerModal from '../../../../components/Modals/PicturePicker';
import moment from 'moment';
import InputCalender from 'app/components/InputCalender';
import DropdownInput from 'app/components/DropDown';

const AddNewCMView = (props: any) => {
    const [profile, setProfile] = React.useState(false);

    return (
        <View style={styles.mainContainer}>
            <Header
                headerText={props?.type === 'edit' ? strings.editCM : strings.addNewCM}
                headerStyle={styles.headerStyle}
                headerTextStyle={styles.headerTextStyle}
                leftImageSrc={images.backArrow}
                rightSecondImageScr={images.notification}
                RightSecondIconStyle={{ tintColor: WHITE_COLOR }}
                leftImageIconStyle={{ tintColor: WHITE_COLOR }}
                handleOnLeftIconPress={props.onPressBack}
                barStyle={'light-content'}
                statusBarColor={PRIMARY_THEME_COLOR}
            />
            <ScrollView contentContainerStyle={styles.wrap}>
                <TouchableOpacity
                    onPress={() => setProfile(true)}
                    style={[styles.imageCircle]}
                >
                    {!props.addNewCMData?.profile_picture?.uri ?
                        <Image
                            style={styles.DummyloginBanner}
                            source={images.user}
                            resizeMode="contain"
                        />
                        :
                        <Image
                            style={styles.loginBanner}
                            source={{ uri: props.addNewCMData?.profile_picture?.uri }}
                            resizeMode="contain"
                        />
                    }
                    <View style={styles.editView}>
                        <Image
                            style={styles.editImage}
                            source={images.edit}
                            resizeMode="contain"
                        />
                    </View>
                </TouchableOpacity>
                <View style={styles.inputWrap}>
                    <DropdownInput
                        headingText={'Select Role'}
                        placeholder={'Select Role'}
                        data={props.roleData}
                        inputWidth={'100%'}
                        paddingLeft={16}
                        maxHeight={300}
                        onFocus={() => props.handlegetRoleList()}
                        labelField="role_title"
                        valueField={'_id'}
                        value={props.addNewCMData?.role_id}
                        onChange={(item: any) => {
                            props.setAddNewCMData({
                                ...props.addNewCMData,
                                role_id: item._id
                            })
                        }}
                        newRenderItem={(item: any) => {
                            return (
                                <>
                                    <View style={styles.item}>
                                        <Text style={styles.textItem}>{item.role_title}</Text>
                                    </View>
                                </>
                            );
                        }}
                    />
                </View>
                <View style={styles.inputWrap}>
                    <InputField
                        placeholderText={"First Name"}
                        handleInputBtnPress={() => { }}
                        headingText={"CM First Name"}
                        onChangeText={(val: any) => {
                            props.setAddNewCMData({
                                ...props.addNewCMData, firstname: val
                            })
                        }}
                    />
                </View>
                <View style={styles.inputWrap}>
                    <InputField
                        placeholderText={"Last Name"}
                        handleInputBtnPress={() => { }}
                        headingText={"CM Last Name"}
                        onChangeText={(val: any) => {
                            props.setAddNewCMData({
                                ...props.addNewCMData, lastname: val
                            })
                        }}
                    />
                </View>
                <View style={styles.inputWrap}>
                    <InputField
                        placeholderText={"Adhar No."}
                        handleInputBtnPress={() => { }}
                        headingText={"Adhar No."}
                        onChangeText={(val: any) => {
                            props.setAddNewCMData({
                                ...props.addNewCMData, adhar_no: val
                            })
                        }}
                        maxLength={12}
                        keyboardtype={'number-pad'}
                    />
                </View>
                <View style={styles.inputWrap}>
                    <InputField
                        placeholderText={"Pancard No."}
                        handleInputBtnPress={() => { }}
                        headingText={"Pancard No."}
                        onChangeText={(val: any) => {
                            props.setAddNewCMData({
                                ...props.addNewCMData, pancard_no: val
                            })
                        }}
                        maxLength={10}
                    />
                </View>
                <View style={styles.genderView}>
                    <Text style={styles.genderTxt}>{strings.gender}</Text>
                    <View style={styles.radioView}>
                        <RadioButton.Android
                            value="Male"
                            status={props.addNewCMData?.gender === 1 ? "checked" : "unchecked"}
                            onPress={() => {
                                props.setAddNewCMData({
                                    ...props.addNewCMData, gender: 1
                                })
                            }}
                            color={PRIMARY_THEME_COLOR}
                        />
                        <Text
                            style={[
                                styles.radioTxt,
                                {
                                    color:
                                        props.addNewCMData?.gender === 1 ? PRIMARY_THEME_COLOR : BLACK_COLOR,
                                },
                            ]}
                        >
                            {strings.male}
                        </Text>
                    </View>
                    <View style={styles.radioView}>
                        <RadioButton.Android
                            value="second"
                            status={props.addNewCMData?.gender === 2 ? "checked" : "unchecked"}
                            onPress={() => {
                                props.setAddNewCMData({
                                    ...props.addNewCMData, gender: 2
                                })
                            }}
                            color={PRIMARY_THEME_COLOR}
                        />
                        <Text
                            style={[
                                styles.radioTxt,
                                {
                                    color:
                                        props.addNewCMData?.gender === 2 ? PRIMARY_THEME_COLOR : BLACK_COLOR,
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
                        mode={'date'}
                        maximumDate={new Date()}
                        placeholderText={"Date of Birth"}//can edit
                        editable={false}
                        dateData={(data: any) => {
                            props.setAddNewCMData({
                                ...props.addNewCMData,
                                dateofbirth: moment(data).format(DATE_FORMAT)
                            })
                        }}
                        setDateshow={(data: any) => {
                            props.setAddNewCMData({
                                ...props.addNewCMData,
                                dateofbirth: moment(data).format(DATE_FORMAT)
                            })
                        }}
                        value={props?.addNewCMData?.dateofbirth ?
                            moment(props?.addNewCMData?.dateofbirth).format(DATE_FORMAT)
                            : ''}
                    />
                </View>
                <View style={styles.inputWrap}>
                    <InputField
                        placeholderText={"Mobile No."}
                        handleInputBtnPress={() => { }}
                        headingText={"Mobile No."}
                        onChangeText={(val: any) => {
                            props.setAddNewCMData({
                                ...props.addNewCMData, mobile: val
                            })
                        }}
                        maxLength={10}
                        keyboardtype={'number-pad'}
                    />
                </View>
                <View style={styles.inputWrap}>
                    <InputField
                        placeholderText={"WhatsApp No."}
                        handleInputBtnPress={() => { }}
                        headingText={"WhatsApp No."}
                        onChangeText={(val: any) => {
                            props.setAddNewCMData({
                                ...props.addNewCMData, whatsapp_no: val
                            })
                        }}
                        maxLength={10}
                        keyboardtype={'number-pad'}
                    />
                </View>
                <View style={styles.inputWrap}>
                    <InputField
                        placeholderText={"Email Address"}
                        handleInputBtnPress={() => { }}
                        headingText={"Email Address"}
                        onChangeText={(val: any) => {
                            props.setAddNewCMData({
                                ...props.addNewCMData, email: val
                            })
                        }}
                    />
                </View>
                <View style={styles.inputWrap}>
                    <DropdownInput
                        headingText={strings.city}
                        placeholder={strings.city}
                        data={props.cityData}
                        inputWidth={'100%'}
                        paddingLeft={16}
                        maxHeight={300}
                        onFocus={() => props.handlegetCityList()}
                        labelField="city_name"
                        valueField={'city_id'}
                        value={props.addNewCMData?.city_id}
                        onChange={(item: any) => {
                            props.setAddNewCMData({
                                ...props.addNewCMData,
                                city: item.city_name, city_id: item.city_id
                            })
                        }}
                        newRenderItem={(item: any) => {
                            return (
                                <>
                                    <View style={styles.item}>
                                        <Text style={styles.textItem}>{item.city_name}</Text>
                                    </View>
                                </>
                            );
                        }}
                    />
                </View>
                <View style={styles.inputWrap}>
                    <InputField
                        placeholderText={"Area"}
                        handleInputBtnPress={() => { }}
                        headingText={"Area"}
                        onChangeText={(val: any) => {
                            props.setAddNewCMData({
                                ...props.addNewCMData, area: val
                            })
                        }}
                        keyboardtype={'number-pad'}
                    />
                </View>
                <View style={{ marginVertical: 10, marginBottom: 20 }}>
                    <Button
                        handleBtnPress={() => props.onPressCreate()}
                        textTransform={null}
                        buttonText={props?.type === 'edit' ? strings.updateCM : strings.createCM} />
                </View>
            </ScrollView>
            <PicturePickerModal
                Visible={profile}
                setVisible={setProfile}
                imageData={(data: any) => {
                    props.setAddNewCMData({
                        ...props.addNewCMData, profile_picture: data
                    })
                }}
            />
        </View>
    )
}
export default AddNewCMView