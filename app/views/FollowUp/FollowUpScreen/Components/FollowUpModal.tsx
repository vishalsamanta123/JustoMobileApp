import { View, Text, Image, TouchableOpacity, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import Modal from "react-native-modal";
import styles from "../../../../components/Modals/styles";
import images from "../../../../assets/images";
import strings from "../../../../components/utilities/Localization";
import Button from "../../../../components/Button";
import InputCalender from "app/components/InputCalender";
import moment from "moment";
import { DATE_FORMAT } from "app/components/utilities/constant";
import DropdownInput from "app/components/DropDown";
import { useDispatch, useSelector } from "react-redux";
import { getUserVisitList } from "app/Redux/Actions/LeadsActions";
const FilterModal = (props: any) => {
  const dispatch: any = useDispatch()
  const { response = {}, list = "" } = useSelector((state: any) => state.visitorData) || []
  const [visitorList, setVisiitorList] = useState<any>([])

  useEffect(() => {
    if (props.Visible) {
      dispatch(getUserVisitList({}))
    }
  }, [props.Visible])

  useEffect(() => {
    if (response?.status === 200) {
      if (response?.data?.length > 0) {
        setVisiitorList(response?.data)
      }
    }
  }, [response])

  const followupforData = [
    { label: 'Lead', value: 1 },
    { label: 'Site Visit', value: 2 },
    { label: 'Booking', value: 3 },
    { label: 'Registration', value: 4 },
  ]

  const renderItem = (item: any) => {
    return (
      <View style={styles.item}>
        <Text style={styles.textItem}>{item.label}</Text>
      </View>
    );
  };
  return (
    <Modal isVisible={props.Visible}>
      <ScrollView keyboardShouldPersistTaps={'handled'}
        contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}>
        <View style={styles.mainContainer}>
          <View style={styles.topContainer}>
            <Text style={styles.topTxt}>{strings.searchfollowup}</Text>
            <View>
              <TouchableOpacity onPress={() => props.setIsVisible(false)}>
                <Image source={images.close} style={styles.closeIcon} />
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.borderView} />
          <View style={{ marginHorizontal: 10 }}>
            <View style={styles.inputWrap}>
              <InputCalender
                leftIcon={images.event}
                mode={"date"}
                placeholderText={"Start Date"}
                editable={false}
                dateData={(data: any) => {
                  props.setFilterData({
                    ...props.filterData,
                    startdate: moment(data).format(DATE_FORMAT),
                  });
                }}
                setDateshow={(data: any) => {
                  props.setFilterData({
                    ...props.filterData,
                    startdate: moment(data).format(DATE_FORMAT),
                  });
                }}
                value={props?.filterData?.startdate === '' ||
                  props?.filterData?.startdate === undefined ?
                  'Start Date' : moment(props?.filterData?.startdate).format(DATE_FORMAT)}
              />
            </View>
            <View style={styles.inputWrap}>
              <InputCalender
                leftIcon={images.event}
                mode={"date"}
                placeholderText={"End Date"}
                editable={false}
                dateData={(data: any) => {
                  props.setFilterData({
                    ...props.filterData,
                    enddate: moment(data).format(DATE_FORMAT),
                  });
                }}
                setDateshow={(data: any) => {
                  props.setFilterData({
                    ...props.filterData,
                    enddate: moment(data).format(DATE_FORMAT),
                  });
                }}
                value={props?.filterData?.enddate === '' ||
                  props?.filterData?.enddate === undefined ?
                  ""
                  : moment(props?.filterData?.enddate).format(DATE_FORMAT)}
              />
            </View>
            <View style={styles.inputWrap}>
              <DropdownInput
                style={styles.dropdown}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                iconStyle={styles.iconStyle}
                data={followupforData}
                maxHeight={300}
                labelField="label"
                valueField={'value'}
                placeholder="Search by Type"
                value={props.filterData.followup_for}
                onChange={(item: any) => {
                  props.setFilterData({
                    ...props.filterData,
                    followup_for: item.value
                  })
                }}
                newRenderItem={renderItem}
              />
            </View>
            <View style={styles.inputWrap}>
              <DropdownInput
                style={styles.dropdown}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                iconStyle={styles.iconStyle}
                data={visitorList}
                maxHeight={300}
                labelField="first_name"
                valueField={'_id'}
                placeholder="Search by Lead"
                value={props.filterData.lead_id}
                onChange={(item: any) => {
                  props.setFilterData({
                    ...props.filterData,
                    lead_id: item._id
                  })
                }}
                newRenderItem={(item: any) => {
                  return (
                    <View style={styles.item}>
                      <Text style={styles.textItem}>{item.first_name}</Text>
                    </View>
                  );
                }}
              />
            </View>
          </View>
          <View style={{ marginVertical: 20, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
            <Button
              handleBtnPress={() => {
                props.setIsVisible(false)
                props.onRefresh()
              }}
              buttonText={strings.reset}
              width={135}
            />
            <Button
              handleBtnPress={() => {
                props.setIsVisible(false)
                props.getFollowupList(0, props.filterData)
                props.setFollowUpList([])
              }}
              buttonText={strings.apply}
              width={135}
            />
          </View>
        </View>
      </ScrollView>
    </Modal>
  );
};

export default FilterModal;
