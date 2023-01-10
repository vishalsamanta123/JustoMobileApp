import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity, } from "react-native";
import styles from "./styles";
import strings from "../../../components/utilities/Localization";
import { normalizeSpacing } from "app/components/scaleFontSize";

const PostSaleDashboardView = (props: any) => {
    const targetData = props?.dashboardData?.userTarget ||
        props?.dashboardData?.target || {}
    const achieveTargetData = props?.dashboardData?.achievetargetdata ||
        props?.dashboardData?.achievetarget || {}
    return (
        <View style={styles.mainContainerWrap}>
            <Text style={styles.subTitleTxt}>This Month Incentive   {'3000'}</Text>
            <View style={styles.secondPortion}>
                <View style={styles.thirdCardView}>
                    <View style={styles.cardTextView}>
                        <Text style={styles.cardText}>Registration Target</Text>
                    </View>
                    <View style={styles.numberView}>
                        <Text style={styles.numberText}>{achieveTargetData?.achieve_closing_target}/{targetData?.closing_target}</Text>
                    </View>
                </View>
                <View style={styles.secondCardView}>
                    <View style={styles.cardTextView}>
                        <Text style={[styles.cardText, {
                            marginHorizontal: normalizeSpacing(16)
                        }]}>Booking Target</Text>
                    </View>
                    <View style={styles.numberView}>
                        <Text style={styles.numberText}>{achieveTargetData?.achieve_site_visit_target}/{targetData?.site_visit_target}</Text>
                    </View>
                </View>
            </View>
            {/* Bottom Section */}
            <View style={styles.thirdPortion}>
                <View style={styles.thirdPortioncardView}>
                    <View style={styles.thirdPortionCardTextView}>
                        <Text style={styles.thirdPortionCardText}>
                            Today Booking
                        </Text>
                    </View>
                    <View style={styles.numberView}>
                        <Text style={styles.thirdPortionNumberText}>{props?.dashboardData?.today_booking}</Text>
                    </View>
                </View>
                <View style={styles.thirdPortioncardView}>
                    <View style={styles.thirdPortionCardTextView}>
                        <Text style={styles.thirdPortionCardText}>
                            Today Registration
                        </Text>
                    </View>
                    <View style={styles.numberView}>
                        <Text style={styles.thirdPortionNumberText}>{props?.dashboardData?.today_booking}</Text>
                    </View>
                </View>
                <View style={styles.thirdPortioncardView}>
                    <View style={styles.thirdPortionCardTextView}>
                        <Text style={styles.thirdPortionCardText}>Ready to Book</Text>
                    </View>
                    <View style={styles.numberView}>
                        <Text style={styles.thirdPortionNumberText}>
                            {props?.dashboardData?.total_ready_booking}</Text>
                    </View>
                </View>
                <View style={styles.thirdPortioncardView}>
                    <View style={styles.thirdPortionCardTextView}>
                        <Text style={styles.thirdPortionCardText}>{'Cancel Booking'}</Text>
                    </View>
                    <View style={styles.numberView}>
                        <Text style={styles.thirdPortionNumberText}>{props?.dashboardData?.total_closing_manager}</Text>
                    </View>
                </View>
            </View>
        </View>
    );
};

export default PostSaleDashboardView;
