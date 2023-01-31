import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import styles from "./styles";
import strings from "../../../components/utilities/Localization";
import {
  normalize,
  normalizeHeight,
  normalizeSpacing,
} from "app/components/scaleFontSize";

const SiteHeadView = (props: any) => {
console.log('props: ', props);
  return (
    <View style={styles.mainContainerWrap}>
      <View style={styles.secondPortion}>
        <View style={styles.thirdCardView}>
          <View style={styles.cardTextView}>
            <Text style={styles.cardText}>No. of Walking</Text>
          </View>
          <View style={styles.numberView}>
            <Text style={styles.numberText}>{props?.dashboardData?.total_walking}</Text>
          </View>
        </View>
        <View style={styles.secondCardView}>
          <View style={styles.cardTextView}>
            <Text style={styles.cardText}>No. of Closing</Text>
          </View>
          <View style={styles.numberView}>
            <Text style={styles.numberText}>{props?.dashboardData?.total_closing}</Text>
          </View>
        </View>
      </View>
      {/* Bottom Section */}
      <View style={[styles.thirdPortion, {flex: 3}]}>
        <TouchableOpacity
          onPress={() => props.onpressBooking('request')}
          style={[styles.thirdPortioncardView, {height: normalizeHeight(120)}]}
        >
          <View style={styles.thirdPortionCardTextView}>
            <Text style={styles.thirdPortionCardText}>No. of Booking</Text>
          </View>
          <View style={styles.numberView}>
            <Text style={styles.thirdPortionNumberText}>
              {props?.dashboardData?.total_booking}
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => props.onpressBooking('register')}
          style={[styles.thirdPortioncardView, {height: normalizeHeight(120)}]}
        >
          <View style={styles.thirdPortionCardTextView}>
            <Text style={styles.thirdPortionCardText}>No. of Registration</Text>
          </View>
          <View style={styles.numberView}>
            <Text style={styles.thirdPortionNumberText}>
              {props?.dashboardData?.total_registration}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SiteHeadView;
