import { View, Text, Image, TouchableOpacity, ScrollView } from "react-native";
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
import { normalizeSpacing } from "app/components/scaleFontSize";

const CancelModal = (props: any) => {
    const dispatch: any = useDispatch()
    const [masterDatas, setMasterDatas] = useState<any>()
    const [propertyCompetitor, setPropertyCompetitor] = useState<any>()
    const [propetyInput, setPropetyInput] = useState<any>(false)
    const masterData = useSelector((state: any) => state.masterData) || {}
    const propertyData = useSelector((state: any) => state.competitorproperty) || {}

    const handleMasterDatas = (data: any) => {
        dispatch(getAllMaster({
            type: data
        }))
    }

    const handleCompetitorProperty = () => {
        dispatch(getAllPropertyCompetitor({}))
    }
    useEffect(() => {
        if (propertyData?.response?.status === 200) {
            setPropertyCompetitor(propertyData?.response?.data)
        } else {
            if (propertyData?.response?.status === 201 ||
                propertyData?.response?.data?.length > 0) {
                setPropetyInput(true)
                setPropertyCompetitor([])
                dispatch(removePropertyCompetitor())
            }
        }
    }, [propertyData])
    useEffect(() => {
        if (masterData?.response?.status === 200) {
            setMasterDatas(masterData?.response?.data?.length > 0 ? masterData?.response?.data : [])
        }
    }, [masterData])

    const handleCancel = () => {
        props.setIsVisible(false)
        setPropetyInput(false)
        if (props?.cancelValue?.reason != '') {
            props.cancelDataPress()
        }
    }
    return (
        <Modal isVisible={props.Visible}>
            <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}>
                <View style={styles.mainContainer}>
                    <View style={styles.topContainer}>
                        <Text style={styles.topTxt}>{strings.cancel + " " + strings.bookingRequestHead}</Text>
                        <View>
                            <TouchableOpacity onPress={() => {
                                props.setIsVisible(false)
                                setPropetyInput(false)
                            }}>
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
                                onFocus={() => handleMasterDatas(8)}
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
                            <View style={styles.propertyVw}>
                                <Text style={styles.titleTxt}>{propetyInput ? "Property Name" :
                                    strings.selectproperty}</Text>
                                {!propetyInput && props?.cancelValue?.property_id === '' ||
                                    props?.cancelValue?.property_id === undefined
                                    ?
                                    <View style={styles.addNewBttn}>
                                        <Button
                                            width={80}
                                            height={25}
                                            btnTxtsize={12}
                                            buttonText={'Add New'}
                                            handleBtnPress={() => setPropetyInput(true)}
                                        />
                                    </View> : null
                                }
                            </View>
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
            </ScrollView>
        </Modal>
    );
};

export default CancelModal;
