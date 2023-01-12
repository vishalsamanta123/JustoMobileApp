import { View, Text } from 'react-native'
import React from 'react'
import styles from './styles'
import Header from 'app/components/Header'
import images from 'app/assets/images'
import strings from 'app/components/utilities/Localization'
import { PRIMARY_THEME_COLOR } from 'app/components/utilities/constant'
import InputField from 'app/components/InputField'
import DropdownInput from 'app/components/DropDown'
import Button from 'app/components/Button'

const AddTicketForm = (props: any) => {
    return (
        <View style={styles.mainContainer}>
            <Header
                leftImageSrc={images.backArrow}
                rightSecondImageScr={images.notification}
                headerText={strings.addticket}
                handleOnLeftIconPress={props.handleBackPress}
                headerStyle={styles.headerStyle}
                RightFirstIconStyle={styles.RightFirstIconStyle}
                leftImageIconStyle={styles.RightFirstIconStyle}
                statusBarColor={PRIMARY_THEME_COLOR}
                barStyle={'light-content'}
            />
            <View style={styles.topItemsVw}>
                <View style={styles.inputWrap}>
                    <DropdownInput
                        require={true}
                        headingText={'Issue'}
                        placeholder={'Issue'}
                        data={props?.masterData}
                        inputWidth={'100%'}
                        paddingLeft={16}
                        maxHeight={300}
                        labelField="title"
                        valueField={'_id'}
                        value={props?.addTicketData?.reason}
                        onChange={(item: any) => {
                            props.setAddTicketData({
                                ...props.addTicketData,
                                reason: item._id,
                            })
                        }}
                        newRenderItem={(item: any) => {
                            return (
                                <View style={styles.item}>
                                    <Text style={styles.textItem}>{item.title}</Text>
                                </View>
                            );
                        }}
                    />
                </View>
                <View style={styles.inputWrap}>
                    <InputField
                        require={true}
                        headingText={'Title'}
                        placeholderText={"Description"}
                        handleInputBtnPress={() => { }}
                        onChangeText={(val: any) => {
                            props.setAddTicketData({
                                ...props.addTicketData,
                                title: val,
                            })
                        }}
                        multiline={true}
                    />
                </View>
                <View style={styles.inputWrap}>
                    <InputField
                        require={true}
                        headingText={'Description'}
                        placeholderText={"Description"}
                        handleInputBtnPress={() => { }}
                        onChangeText={(val: any) => {
                            props.setAddTicketData({
                                ...props.addTicketData,
                                remark: val,
                            })
                        }}
                        multiline={true}
                        inputheight={100}
                    />
                </View>
            </View>
            <View>
                <Button
                    buttonText={strings.addticket}
                    // handleBtnPress={() => {}}
                />
            </View>
        </View>
    )
}

export default AddTicketForm