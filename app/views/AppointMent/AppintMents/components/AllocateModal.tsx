
import { View, Text, Image, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import Modal from "react-native-modal";
import styles from "./styles";
import images from "../../../../assets/images";
import strings from "../../../../components/utilities/Localization";
import { Dropdown } from "react-native-element-dropdown";
import Button from "../../../../components/Button";
import InputField from "../../../../components/InputField";
import { GRAY_LIGHT_COLOR, WHITE_COLOR } from "../../../../components/utilities/constant";
import DropdownInput from "app/components/DropDown";

const AllocateModal = (props: any) => {
    return (
        <View>
            <Modal isVisible={props.Visible}>
                <View style={styles.bookingModelVw}>
                    <View style={styles.topContainer}>
                        <Text style={styles.topTxt}>{'Allocate'}</Text>
                        <View>
                            <TouchableOpacity onPress={() => props.setIsVisible(false)}>
                                <Image source={images.close} style={styles.closeIcon} />
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={styles.inputWrap}>
                        <DropdownInput
                            placeholder={'Select New Closing Manager'}
                            headingText={'Select New Closing Manager'}
                            data={props?.allProperty}
                            disable={props.type == 'edit' ? true : false}
                            inputWidth={'100%'}
                            paddingLeft={16}
                            maxHeight={300}
                            labelField="property_title"
                            valueField={'_id'}
                            value={props?.formData?.property_id}
                            onChange={(item: any) => {
                                props.setFormData({
                                    ...props.formData,
                                    property_id: item.property_id,
                                })
                            }}
                            newRenderItem={(item: any) => {
                                return (
                                    <>
                                        <View style={{
                                            padding: 17,
                                            flexDirection: "row",
                                            justifyContent: "space-between",
                                            alignItems: "center",
                                        }}>
                                            <Text style={{
                                                flex: 1,
                                                fontSize: 16,
                                                color: GRAY_LIGHT_COLOR
                                            }}>{item.property_title}</Text>
                                        </View>
                                    </>
                                );
                            }}
                        />
                    </View>
                    <View style={{ marginVertical: 20 }}>
                        <Button
                            handleBtnPress={() => props.setIsVisible(false)}
                            buttonText={props.doneBttnTxt ? props.doneBttnTxt : strings.Confirm} />
                    </View>
                </View>
            </Modal>
        </View>
    );
};
export default AllocateModal