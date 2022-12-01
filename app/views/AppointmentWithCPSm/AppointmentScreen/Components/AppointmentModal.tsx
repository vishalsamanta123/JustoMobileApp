import { View, Text, Image, TouchableOpacity } from "react-native";
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
import { GRAY_LIGHT_COLOR } from "app/components/utilities/constant";

const FilterModal = (props: any) => {
  return (
    <View>
      <Modal isVisible={props.Visible}>
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
                mode={'date'}
                leftIcon={images.event}
                placeholderText={strings.startDate}
                editable={false}
                dateData={(data: any) => {
                  props.setFilterData({
                    ...props.filterData,
                    start_date: moment(data).format('YYYY-MM-DD')
                  })
                }}
                setDateshow={(data: any) => {
                  props.setFilterData({
                    ...props.filterData,
                    start_date: moment(data).format('YYYY-MM-DD')
                  })
                }}
                value={moment(props.filterData?.start_date).format('DD-MM-YYYY')}
              />
            </View>
            <View style={styles.inputWrap}>
              <InputCalender
                mode={'date'}
                leftIcon={images.event}
                placeholderText={strings.endDate}
                editable={false}
                dateData={(data: any) => {
                  props.setFilterData({
                    ...props.filterData,
                    appointment_date: moment(data).format('YYYY-MM-DD')
                  })
                }}
                setDateshow={(data: any) => {
                  props.setFilterData({
                    ...props.filterData,
                    appointment_date: moment(data).format('YYYY-MM-DD')
                  })
                }}
                value={moment(props.filterData?.appointment_date).format('DD-MM-YYYY')}
              />
            </View>
            <View style={styles.inputWrap}>
              <DropdownInput
                placeholder={strings.appointmentWith}
                headingText={strings.appointmentWith}
                data={props.visitorList}
                inputWidth={'100%'}
                paddingLeft={16}
                maxHeight={300}
                onFocus={() => props.getVisitorsList()}
                labelField="lead_name"
                valueField={props.filterData?.lead_name}
                value={props.filterData?.lead_name}
                onChange={(item: any) => {
                  props.setFilterData({
                    ...props.filterData,
                    lead_id: item._id, lead_name: item.first_name
                  })
                }}
                newRenderItem={(item: any) => {
                  return (
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
                      }}>{item.customer_first_name}</Text>
                    </View>
                  );
                }}
              />
            </View>
          </View>
          <View style={{ marginVertical: 20 }}>
            <Button handleBtnPress={() => props.setIsVisible(false)} buttonText={strings.search} />
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default FilterModal;
