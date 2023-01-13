import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity, } from "react-native";
import styles from "./styles";
import strings from "../../../components/utilities/Localization";
import { normalizeHeight, normalizeSpacing } from "app/components/scaleFontSize";

const ReceiptionistDashboardView = (props: any) => {
    const targetData = props?.dashboardData?.target || {}
    const achieveTargetData = props?.dashboardData?.achievetargetdata || {}
    return (
        <View style={styles.mainContainerWrap}>
            <View style={[styles.secondPortion, {
                flexDirection: 'column',
            }]}>
                <View style={[styles.thirdCardView, {
                    maxHeight: normalizeHeight(160)
                }]}>
                    <View style={styles.cardTextView}>
                        <Text style={styles.cardText}>No. of Appointment</Text>
                    </View>
                    <View style={styles.numberView}>
                        <Text style={styles.numberText}>{achieveTargetData?.achieve_closing_target}/{targetData?.registration_target}</Text>
                    </View>
                </View>
                <View style={[styles.secondCardView, {
                    maxHeight: normalizeHeight(160)
                }]}>
                    <View style={styles.cardTextView}>
                        <Text style={styles.cardText}>No. of Walking</Text>
                    </View>
                    <View style={styles.numberView}>
                        <Text style={styles.numberText}>{achieveTargetData?.achieve_booking_target}/{targetData?.booking_target}</Text>
                    </View>
                </View>
            </View>
        </View>
    );
};

export default ReceiptionistDashboardView;
