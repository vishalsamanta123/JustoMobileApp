import { View, Text, Image, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import Modal from "react-native-modal";
import styles from "../../../../components/Modals/styles";
import images from "../../../../assets/images";
import strings from "../../../../components/utilities/Localization";
import Button from "../../../../components/Button";
import InputField from "../../../../components/InputField";
import { Dropdown } from "react-native-element-dropdown";
import { dropdownData } from "../../../../components/utilities/DemoData";
import InputCalender from "app/components/InputCalender";
import moment from "moment";
const FilterModal = (props: any) => {
  const [value, setValue] = useState(null);
  console.log('props?.filterData?.enddate: ', props?.filterData?.enddate);

  useEffect(() => {
    props.setFilterData({
      startdate: "",
      enddate: "",
      search_by_visisor_name: "",
      search_configuration: "",
      visit_score: "",
    })
  }, [])

  const renderItem = (item: any) => {
    return (
      <View style={styles.item}>
        <Text style={styles.textItem}>{item.label}</Text>
      </View>
    );
  };
  return (
    <View>
      <Modal isVisible={props.Visible}>
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
                placeholderText={"Start Date"} //can edit
                editable={false}
                dateData={(data: any) => {
                  props.setFilterData({
                    ...props.filterData,
                    startdate: moment(data).format("YYYY-MM-DD"),
                  });
                }}
                setDateshow={(data: any) => {
                  props.setFilterData({
                    ...props.filterData,
                    startdate: moment(data).format("YYYY-MM-DD"),
                  });
                }}
                value={props?.filterData?.startdate != '' ? moment(props?.filterData?.startdate).format(
                  "DD-MM-YYYY"
                ) : 'Start Date'}
              />
            </View>
            <View style={styles.inputWrap}>
            <InputCalender
                leftIcon={images.event}
                mode={"date"}
                placeholderText={"End Date"} //can edit
                editable={false}
                dateData={(data: any) => {
                  props.setFilterData({
                    ...props.filterData,
                    enddate: moment(data).format("YYYY-MM-DD"),
                  });
                }}
                setDateshow={(data: any) => {
                  props.setFilterData({
                    ...props.filterData,
                    enddate: moment(data).format("YYYY-MM-DD"),
                  });
                }}
                value={props?.filterData?.enddate != '' ? moment(props?.filterData?.enddate).format(
                  "DD-MM-YYYY"
                ) : 'End Date'}
              />
            </View>
            <View style={styles.inputWrap}>
              <Dropdown
                style={styles.dropdown}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                iconStyle={styles.iconStyle}
                data={dropdownData}
                maxHeight={300}
                labelField="label"
                valueField="value"
                placeholder="Search by Type"
                value={value}
                onChange={(item) => {
                  setValue(item.value);
                }}
                renderItem={renderItem}
              />
            </View>
          </View>
          <View style={{ marginVertical: 20 }}>
            <Button
              handleBtnPress={() => props.setIsVisible(false)}
              buttonText={strings.apply}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default FilterModal;
