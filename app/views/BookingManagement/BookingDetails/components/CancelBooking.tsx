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
import {
  getAllPropertyCompetitor,
  removePropertyCompetitor,
} from "app/Redux/Actions/propertyActions";
import { normalizeSpacing } from "app/components/scaleFontSize";

const CancelModal = (props: any) => {
  const dispatch: any = useDispatch();
  const [masterDatas, setMasterDatas] = useState<any>();
  const [propertyCompetitor, setPropertyCompetitor] = useState<any>();
  const [propetyInput, setPropetyInput] = useState<any>(false);
  const [reasonSelect, setReasonSelect] = useState<any>(false);
  const masterData = useSelector((state: any) => state.masterData) || {};
  const propertyData =
    useSelector((state: any) => state.competitorproperty) || {};
  console.log("propertyData: ", propertyData);

  const handleMasterDatas = (data: any) => {
    dispatch(
      getAllMaster({
        type: data,
      })
    );
  };

  const handleCompetitorProperty = () => {
    console.log("props +++=++++", props.item[0].property_id);
    dispatch(
      getAllPropertyCompetitor({
        property_id: props?.item[0]?.property_id
          ? props?.item[0]?.property_id
          : "",
      })
    );
  };
  useEffect(() => {
    if (propertyData?.response?.status === 200) {
      setPropertyCompetitor(propertyData?.response?.data);
    } else {
      if (
        propertyData?.response?.status === 201 ||
        propertyData?.response?.data?.length > 0
      ) {
        setPropetyInput(true);
        setPropertyCompetitor([]);
        dispatch(removePropertyCompetitor());
      }
    }
  }, [propertyData]);
  useEffect(() => {
    if (masterData?.response?.status === 200) {
      setMasterDatas(
        masterData?.response?.data?.length > 0 ? masterData?.response?.data : []
      );
    }
  }, [masterData]);

  const handleCancel = () => {
    if (props?.cancelValue?.reason != "") {
      props.cancelDataPress();
      props.setIsVisible(false);
      setPropetyInput(false);
      setReasonSelect(false);
    } else {
      // props.setIsVisible(false)
      // setPropetyInput(false)
      setReasonSelect(true);
    }
  };
  return (
    <Modal isVisible={props.Visible}>
      <ScrollView keyboardShouldPersistTaps={'handled'}
        contentContainerStyle={{ flexGrow: 1, justifyContent: "center" }}
      >
        <View style={styles.mainContainer}>
          <View style={styles.topContainer}>
            <Text style={styles.topTxt}>
              {strings.cancel + " " + strings.bookingRequestHead}
            </Text>
            <View>
              <TouchableOpacity
                onPress={() => {
                  props.setIsVisible(false);
                  setPropetyInput(false);
                  props.setCancelValue({
                    reason: '',
                    property_id: '',
                    comment: '',
                    property_name: '',
                    remark: '',
                })
                }}
              >
                <Image source={images.close} style={styles.closeIcon} />
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.borderView} />
          <View style={{ marginHorizontal: 10 }}>
            <View style={styles.inputWrap}>
              <Text style={styles.titleTxt}>{strings.reason}</Text>
              <DropdownInput
                placeholder={strings.reason}
                data={masterDatas}
                inputWidth={"100%"}
                paddingLeft={16}
                maxHeight={300}
                onFocus={() => handleMasterDatas(8)}
                labelField="title"
                valueField={"_id"}
                value={props?.cancelValue?.reason}
                onChange={(item: any) => {
                  console.log("item._id: ", item._id);

                  setReasonSelect(false);
                  props.setCancelValue({
                    ...props.cancelValue,
                    reason: item._id,
                  });
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
            {reasonSelect ? (
              <View>
                <Text style={styles.errorTxt}>
                  Select Reason to cancel booking
                </Text>
              </View>
            ) : null}
            {props?.cancelValue?.reason === "639d691c9f37df12d3ea64e2" ? (
              <View style={styles.inputWrap}>
                <View style={styles.propertyVw}>
                  <Text style={styles.titleTxt}>
                    {propetyInput ? "Property Name" : strings.selectproperty}
                  </Text>
                  {(!propetyInput && props?.cancelValue?.property_id === "") ||
                  props?.cancelValue?.property_id === undefined ? (
                    <View style={styles.addNewBttn}>
                      <Button
                        width={80}
                        height={25}
                        btnTxtsize={12}
                        buttonText={"Add New"}
                        handleBtnPress={() => setPropetyInput(true)}
                      />
                    </View>
                  ) : null}
                </View>
                {propetyInput ? (
                  <InputField
                    placeholderText={"Property Name"}
                    headingText={"Property Name"}
                    handleInputBtnPress={() => {}}
                    valueshow={props?.cancelValue?.property_name}
                    onChangeText={(val: any) => {
                      props.setCancelValue({
                        ...props.cancelValue,
                        property_name: val,
                      });
                    }}
                  />
                ) : (
                  <DropdownInput
                    placeholder={strings.selectproperty}
                    data={propertyCompetitor}
                    inputWidth={"100%"}
                    paddingLeft={16}
                    maxHeight={300}
                    onFocus={() => handleCompetitorProperty()}
                    labelField="competitor_name"
                    valueField={"property_id"}
                    value={props?.cancelValue?.property_id}
                    onChange={(item: any) => {
                      props.setCancelValue({
                        ...props.cancelValue,
                        property_id: item.property_id,
                      });
                    }}
                    newRenderItem={(item: any) => {
                      return (
                        <>
                          <View style={styles.item}>
                            <Text style={styles.textItem}>
                              {item.competitor_name}
                            </Text>
                          </View>
                        </>
                      );
                    }}
                  />
                )}
              </View>
            ) : null}
            <View style={styles.inputWrap}>
              <Text style={styles.titleTxt}>{"Comment"}</Text>
              <InputField
                placeholderText={"Comment"}
                handleInputBtnPress={() => {}}
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
              buttonText={strings.cancelBooking}
            />
          </View>
        </View>
      </ScrollView>
    </Modal>
  );
};

export default CancelModal;
