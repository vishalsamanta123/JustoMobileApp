import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity, } from "react-native";
import Modal from "react-native-modal";
import styles from "./styles";
import images from "../../assets/images";
import strings from "../utilities/Localization";
import ImagePicker from 'react-native-image-crop-picker';
import { handlePermission, openPermissionSetting, } from "../utilities/GlobalFuncations";

const PicturePickerModal = (props: any) => {
    const handleCameraPress = () => {
        ImagePicker.openCamera({
            width: 100,
            height: 100,
            cropping: true,
            multiple: props.multiple ? props.multiple : false,
            compressImageQuality: 0.8,
        }).then((image: any) => {
            props.setVisible(false);
            if (props.multiple && image?.length > 0) {
                const allArray: any = image?.map((itm: any) => {
                    return {
                        uri: itm?.path,
                        type: itm?.mime,
                        name: itm?.path?.substring(
                            itm?.path?.lastIndexOf("/") + 1
                        ),
                    }
                })
                if (props?.value?.length === 0 || typeof props?.value === 'undefined') {
                    props.imageData(allArray)
                } else {
                    var newAdd: any[] = [...props?.value];
                    const getNew = newAdd.concat(allArray);
                    props.imageData(getNew)
                }
            } else {
                if (props?.value?.length === 0 || typeof props?.value === 'undefined') {
                    props.imageData(
                        {
                            uri: image?.path,
                            type: image?.mime,
                            name: image?.path?.substring(
                                image?.path?.lastIndexOf("/") + 1
                            ),
                        }
                    );
                } else {
                    var newAdd: any[] = [...props?.value];
                    const getNew = newAdd.concat({
                        uri: image?.path,
                        type: image?.mime,
                        name: image?.path?.substring(
                            image?.path?.lastIndexOf("/") + 1
                        ),
                    });
                    props.imageData(getNew)
                }
            }
        });
    }
    const handleGalleryPress = () => {
        ImagePicker.openPicker({
            width: 100,
            height: 100,
            cropping: true,
            multiple: props.multiple ? props.multiple : false,
            compressImageQuality: 0.8,
        }).then((image: any) => {
            props.setVisible(false);
            if (props.multiple && image?.length > 0) {
                const allArray: any = image?.map((itm: any) => {
                    return {
                        uri: itm?.path,
                        type: itm?.mime,
                        name: itm?.path?.substring(
                            itm?.path?.lastIndexOf("/") + 1
                        ),
                    }
                })
                if (props?.value?.length === 0 || typeof props?.value === 'undefined') {
                    props.imageData(allArray)
                } else {
                    var newAdd: any[] = [...props?.value];
                    const getNew = newAdd.concat(allArray);
                    props.imageData(getNew)
                }
            } else {
                props.imageData(
                    {
                        uri: image?.path,
                        type: image?.mime,
                        name: image?.path?.substring(
                            image?.path?.lastIndexOf("/") + 1
                        ),
                    }
                )
            }
        });
    }

    return (
        <Modal style={styles.fullContainer} coverScreen={true}
            isVisible={props.Visible}
            backdropOpacity={0.30}>
            <View style={styles.pickerModal}>
                <View style={styles.pickerModalCon}>
                    <View style={styles.cancelModalVw}>
                        <TouchableOpacity onPress={() => props.setVisible(false)}>
                            <Image
                                source={images.close}
                                style={styles.componentsImg}
                            />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.straightVw}>
                        <TouchableOpacity
                            onPress={async () => {
                                const res = await handlePermission(
                                    'gallery',
                                    strings.txt_setting_heading_media,
                                    strings.txt_setting_description_media,
                                );
                                if (res == 'setting1') {
                                    openPermissionSetting(
                                        strings.txt_setting_heading_media,
                                        strings.txt_setting_description_media,
                                    );
                                } else if (res) {
                                    handleGalleryPress()
                                }
                            }}
                            style={styles.componentsVw}>
                            <Image
                                style={styles.componentsImg}
                                resizeMode={'contain'}
                                source={images.gallery}
                            />
                            <Text style={styles.componentsTxt}>{strings.galleryHeader}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.componentsVw}
                            onPress={async () => {

                                const res = await handlePermission(
                                    'camera',
                                    strings.txt_setting_heading_camera,
                                    strings.txt_setting_description_camera,
                                );

                                if (res == 'setting1') {
                                    openPermissionSetting(
                                        strings.txt_setting_heading_camera,
                                        strings.txt_setting_description_camera,
                                    );
                                } else if (res) {
                                    handleCameraPress()
                                }
                            }}
                        >
                            <Image
                                style={styles.componentsImg}
                                resizeMode={'contain'}
                                source={images.camera}
                            />
                            <Text style={styles.componentsTxt}>{strings.cameraHeader}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal >
    );
};

export default PicturePickerModal;
