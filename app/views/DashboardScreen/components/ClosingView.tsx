import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity, } from "react-native";
import styles from "./styles";
import strings from "../../../components/utilities/Localization";
import { ROLE_IDS } from "app/components/utilities/constant";

const ClosingDashboardView = (props: any) => {
    const targetData = props?.dashboardData?.userTarget || {}
    const achieveTargetData = props?.dashboardData?.achievetargetdata || {}
    const role = props?.getLoginType?.response?.data?.role_id || null
    return (
        <View style={styles.mainContainerWrap}>
            <View style={styles.secondPortion}>
                <View style={styles.thirdCardView}>
                    <View style={styles.cardTextView}>
                        <Text style={styles.cardText}>Closing Target</Text>
                    </View>
                    <View style={styles.numberView}>
                        <Text style={styles.numberText}>{achieveTargetData?.achieve_closing_target}/{targetData?.closing_target}</Text>
                    </View>
                </View>
                <View style={styles.secondCardView}>
                    <View style={styles.cardTextView}>
                        <Text style={styles.cardText}>Booking Target</Text>
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
                            Today Site Visit
                        </Text>
                    </View>
                    <View style={styles.numberView}>
                        <Text style={styles.thirdPortionNumberText}>{props?.dashboardData?.today_site_visit}</Text>
                    </View>
                </View>
                <View style={styles.thirdPortioncardView}>
                    <View style={styles.thirdPortionCardTextView}>
                        <Text style={styles.thirdPortionCardText}>
                            Today Closed Visit
                        </Text>
                    </View>
                    <View style={styles.numberView}>
                        <Text style={styles.thirdPortionNumberText}>{props?.dashboardData?.today_close_visit}</Text>
                    </View>
                </View>
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
                {role === ROLE_IDS.closingtl_id ?
                    <View style={styles.thirdPortioncardView}>
                        <View style={styles.thirdPortionCardTextView}>
                            <Text style={styles.thirdPortionCardText}>{'Active CM'}</Text>
                        </View>
                        <View style={styles.numberView}>
                            <Text style={styles.thirdPortionNumberText}>{props?.dashboardData?.total_closing_manager}</Text>
                        </View>
                    </View> : null
                }
            </View>
        </View>
    );
};

export default ClosingDashboardView;
