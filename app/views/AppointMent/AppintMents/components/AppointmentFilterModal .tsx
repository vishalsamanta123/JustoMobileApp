import { View, Text, Image, TouchableOpacity, ScrollView } from "react-native";
import React, { useState } from "react";
import Modal from "react-native-modal";
import styles from "../../../../components/Modals/styles";
import images from "../../../../assets/images";
import strings from "../../../../components/utilities/Localization";
import Button from "../../../../components/Button";
import InputField from "../../../../components/InputField";
import DropdownInput from "../../../../components/DropDown";
import InputCalender from "app/components/InputCalender";
import moment from "moment";
import { DATE_FORMAT } from "app/components/utilities/constant";
import { normalize, normalizeSpacing } from "app/components/scaleFontSize";

const AppointmentFilterModal = (props: any) => {
  const appointmentWith = [
    { type_name: 'Site lead visit', value: 1 },
    { type_name: 'Client visit', value: 2 }]
  const statusData = [
    { type_name: 'Pending', value: 1 },
    { type_name: 'Confirm', value: 2 },
    { type_name: 'Complete', value: 3 }
  ]
  const handleApply = () => {
    props.setIsVisible(false)
    props?.getAppointmentList(0, props.filterData)
    props.setAppointmentList([])
  }
  return (
    <Modal isVisible={props.Visible}>
      <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}>
        <View style={styles.mainContainer}>
          <View style={styles.topContainer}>
            <Text style={styles.topTxt}>{strings.searchappointment}</Text>
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
                mode={"date"}
                leftIcon={images.event}
                placeholderText={"Start Date"}
                editable={false}
                dateData={(data: any) => {
                  props.setFilterData({
                    ...props.filterData,
                    start_date: moment(data).format(DATE_FORMAT),
                  });
                }}
                setDateshow={(data: any) => {
                  props.setFilterData({
                    ...props.filterData,
                    start_date: moment(data).format(DATE_FORMAT),
                  });
                }}
                value={props?.filterData?.start_date}
              />
            </View>
            <View style={styles.inputWrap}>
              <InputCalender
                mode={"date"}
                leftIcon={images.event}
                placeholderText={"End Date"}
                editable={false}
                dateData={(data: any) => {
                  props.setFilterData({
                    ...props.filterData,
                    end_date: moment(data).format(DATE_FORMAT),
                  });
                }}
                setDateshow={(data: any) => {
                  props.setFilterData({
                    ...props.filterData,
                    end_date: moment(data).format(DATE_FORMAT),
                  });
                }}
                value={props?.filterData?.end_date}
              />
            </View>
            <View style={[styles.inputWrap, { top: normalizeSpacing(10) }]}>
              <InputField
                headingText={"By Cutomer Name"}
                handleInputBtnPress={() => { }}
                valueshow={props.filterData?.customer_name}
                onChangeText={(data: any) => {
                  props.setFilterData({
                    ...props.filterData,
                    customer_name: data,
                  });
                }}
              />
            </View>
          </View>
          <View style={{
            flexDirection: 'row',
            justifyContent: 'center', marginVertical: 30
          }}>
            <Button
              handleBtnPress={() => {
                props.setIsVisible(false)
                props.getAppointmentList(0, {})
                props.setFilterData({
                  start_date: '',
                  end_date: '',
                  customer_name: '',
                })
              }}
              buttonText={strings.reset}
              width={150}
            />
            <Button
              handleBtnPress={() => handleApply()}
              buttonText={strings.apply}
              width={150}
            />
          </View>
        </View>
      </ScrollView>
    </Modal>
  );
};

export default AppointmentFilterModal;
