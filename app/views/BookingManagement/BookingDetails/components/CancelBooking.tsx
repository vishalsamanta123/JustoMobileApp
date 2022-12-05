import { View, Text, Image, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import Modal from "react-native-modal";
import styles from "../../../../components/Modals/styles";
import images from "../../../../assets/images";
import strings from "../../../../components/utilities/Localization";
import Button from "../../../../components/Button";
import InputField from "../../../../components/InputField";
import DropdownInput from "../../../../components/DropDown";
import { useDispatch, useSelector } from "react-redux";
import { getAllMaster } from "app/Redux/Actions/MasterActions";
import { getAllPropertyCompetitor, removePropertyCompetitor } from "app/Redux/Actions/propertyActions";

const CancelModal = (props: any) => {
    const dispatch: any = useDispatch()
    const [masterDatas, setMasterDatas] = useState<any>()
    const [propertyCompetitor, setPropertyCompetitor] = useState<any>()
    const [propetyInput, setPropetyInput] = useState<any>(false)
    const masterData = useSelector((state: any) => state.masterData) || {}
    const propertData = useSelector((state: any) => state.propertyData) || {}
    const handleMasterDatas = (data: any) => {
        dispatch(getAllMaster({
            type: data
        }))
    }

    const handleCompetitorProperty = () => {
        dispatch(getAllPropertyCompetitor({}))
        if (propertData?.response) {
            getPropertyList()
        }
    }
    const getPropertyList = () => {
        if (propertData?.response?.status === 200) {
            setPropertyCompetitor(propertData?.response?.data)
            dispatch(removePropertyCompetitor())
        } else {
            if (propertData?.response?.status === 201) {
                setPropetyInput(true)
                setPropertyCompetitor([])
                dispatch(removePropertyCompetitor())
            }
        }
    }

    useEffect(() => {
        if (masterData?.response?.status === 200) {
            setMasterDatas(masterData?.response?.data?.length > 0 ? masterData?.response?.data : [])
        }
    }, [masterData])

    const handleCancel = () => {
        props.setIsVisible(false)
        if (props?.cancelValue?.reason != '') {
            props.cancelDataPress()
        }
    }
    return (
        <View>
            <Modal isVisible={props.Visible}>
                <View style={styles.mainContainer}>
                    <View style={styles.topContainer}>
                        <Text style={styles.topTxt}>{strings.cancel + " " + strings.bookingRequestHead}</Text>
                        <View>
                            <TouchableOpacity onPress={() => props.setIsVisible(false)}>
                                <Image source={images.close} style={styles.closeIcon} />
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={styles.borderView} />
                    <View style={{ marginHorizontal: 10, }}>
                        <View style={styles.inputWrap}>
                            <Text style={styles.titleTxt}>{strings.reason}</Text>
                            <DropdownInput
                                placeholder={strings.reason}
                                data={masterDatas}
                                inputWidth={'100%'}
                                paddingLeft={16}
                                maxHeight={300}
                                onFocus={() => handleMasterDatas(7)}
                                labelField="title"
                                valueField={'_id'}
                                value={props?.cancelValue?.reason}
                                onChange={(item: any) => {
                                    props.setCancelValue({
                                        ...props.cancelValue,
                                        reason: item._id,
                                    })
                                }}
                                newRenderItem={(item: any) => {
                                    return (
                                        <>
                                            <View style={styles.item}>
                                                <Text style={styles.textItem}>{item.title}</Text>
                                            </View>
                                        </>
                                    );
                                }}
                            />
                        </View>
                        <View style={styles.inputWrap}>
                            <Text style={styles.titleTxt}>{strings.selectproperty}</Text>
                            {propetyInput ?
                                <InputField
                                    placeholderText={"Property Name"}
                                    handleInputBtnPress={() => { }}
                                    valueshow={props?.cancelValue?.property_name}
                                    onChangeText={(val: any) => {
                                        props.setCancelValue({
                                            ...props.cancelValue,
                                            property_name: val,
                                        });
                                    }}

                                />
                                :
                                <DropdownInput
                                    placeholder={strings.selectproperty}
                                    data={propertyCompetitor}
                                    inputWidth={'100%'}
                                    paddingLeft={16}
                                    maxHeight={300}
                                    onFocus={() => handleCompetitorProperty()}
                                    labelField="title"
                                    valueField={'_id'}
                                    value={props?.cancelValue?.property_id}
                                    onChange={(item: any) => {
                                        props.setCancelValue({
                                            ...props.cancelValue,
                                            property_id: item._id,
                                        })
                                    }}
                                    newRenderItem={(item: any) => {
                                        return (
                                            <>
                                                <View style={styles.item}>
                                                    <Text style={styles.textItem}>{item.title}</Text>
                                                </View>
                                            </>
                                        );
                                    }}
                                />
                            }

                        </View>
                        <View style={styles.inputWrap}>
                            <Text style={styles.titleTxt}>{"Comment"}</Text>
                            <InputField
                                placeholderText={"Comment"}
                                handleInputBtnPress={() => { }}
                                inputheight={80}
                                valueshow={props?.cancelValue?.remark}
                                onChangeText={(val: any) => {
                                    props.setCancelValue({
                                        ...props.cancelValue,
                                        remark: val,
                                    });
                                }}
                            />
                        </View>
                    </View>
                    <View style={{ marginVertical: 20 }}>
                        <Button
                            handleBtnPress={() => handleCancel()}
                            buttonText={strings.cancelBooking} />
                    </View>
                </View>
            </Modal>
        </View>
    );
};

export default CancelModal;
