import moment from "moment";
import React from "react";
import { View, Text } from 'react-native';
import { ScrollView } from "react-native-gesture-handler";
import { DATE_FORMAT, DATE_TIME_FORMAT } from "../../../../components/utilities/constant";
import strings from "../../../../components/utilities/Localization";
import styles from "./styles";

const StatsView = (props: any) => {
    const item = props?.items || {}
    const current_target = item?.current_target?.length > 0 ? item?.current_target?.[0] : []
    return (
        <ScrollView>
            <View style={styles.Txtview}>
                <View style={styles.projectContainer}>
                    <Text style={styles.projectTxt}>No. of visit</Text>
                </View>
                <View><Text>:</Text></View>
                <View style={styles.nameContainer}>
                    <Text style={styles.nameTxt}>{item?.user_states?.total_visit}</Text>
                </View>
            </View>
            <View style={styles.Txtview}>
                <View style={styles.projectContainer}>
                    <Text style={styles.projectTxt}>No. of site visit</Text>
                </View>
                <View><Text>:</Text></View>
                <View style={styles.nameContainer}>
                    <Text style={styles.nameTxt}>{item?.user_states?.total_visit}</Text>
                </View>
            </View>
            <View style={styles.Txtview}>
                <View style={styles.projectContainer}>
                    <Text style={styles.projectTxt}>No. of Close visit</Text>
                </View>
                <View><Text>:</Text></View>
                <View style={styles.nameContainer}>
                    <Text style={styles.nameTxt}>{item?.user_states?.total_closing_lead}</Text>
                </View>
            </View>
            <View style={styles.Txtview}>
                <View style={styles.projectContainer}>
                    <Text style={styles.projectTxt}>Closing Percentage</Text>
                </View>
                <View><Text>:</Text></View>
                <View style={styles.nameContainer}>
                    <Text style={styles.nameTxt}>{item?.user_states?.total_closing_percentage}</Text>
                </View>
            </View>
            <View style={styles.Txtview}>
                <View style={styles.projectContainer}>
                    <Text style={styles.projectTxt}>Last Login</Text>
                </View>
                <View><Text>:</Text></View>
                <View style={styles.nameContainer}>
                    <Text style={styles.nameTxt}>{moment(item?.user_states?.last_login).format(DATE_FORMAT)}</Text>
                </View>
            </View>
            <View style={styles.Txtview}>
                <View style={styles.projectContainer}>
                    <Text style={styles.projectTxt}>Last Lead Create </Text>
                </View>
                <View><Text>:</Text></View>
                <View style={styles.nameContainer}>
                    <Text style={styles.nameTxt}>{item?.user_states?.last_visit ?
                        moment(item?.user_states?.last_visit).format(DATE_TIME_FORMAT)
                        : strings.notfount}</Text>
                </View>
            </View>
            <View style={styles.Txtview}>
                <View style={styles.projectContainer}>
                    <Text style={styles.projectTxt}>Last site visit</Text>
                </View>
                <View><Text>:</Text></View>
                <View style={styles.nameContainer}>
                    <Text style={styles.nameTxt}>{item?.user_states?.last_site_visit ?
                        moment(item?.user_states?.last_site_visit).format(DATE_TIME_FORMAT) :
                        strings.notfount}</Text>
                </View>
            </View>
            <View style={styles.Txtview}>
                <View style={styles.projectContainer}>
                    <Text style={styles.projectTxt}>Last close visit</Text>
                </View>
                <View><Text>:</Text></View>
                <View style={styles.nameContainer}>
                    <Text style={styles.nameTxt}>{
                    item?.user_states?.last_closing_lead ?
                    moment(item?.user_states?.last_closing_lead).format(DATE_TIME_FORMAT) :
                    strings.notfount
                }</Text>
                </View>
            </View>
            <Text style={styles.bigTitlesTxt}>Current Target</Text>
            <View style={[styles.Txtview, { borderTopWidth: 1 }]}>
                <View style={styles.projectContainer}>
                    <Text style={styles.projectTxt}>Month</Text>
                </View>
                <View><Text>:</Text></View>
                <View style={styles.nameContainer}>
                    <Text style={styles.nameTxt}>
                        {
                            current_target?.month
                        }
                    </Text>
                </View>
            </View>
            <View style={[styles.Txtview, { borderTopWidth: 1 }]}>
                <View style={styles.projectContainer}>
                    <Text style={styles.projectTxt}>Start Date</Text>
                </View>
                <View><Text>:</Text></View>
                <View style={styles.nameContainer}>
                    <Text style={styles.nameTxt}>{moment(current_target?.start_date).format('DD-MM-YYYY')}</Text>
                </View>
            </View>
            <View style={[styles.Txtview, { borderTopWidth: 1 }]}>
                <View style={styles.projectContainer}>
                    <Text style={styles.projectTxt}>End Date</Text>
                </View>
                <View><Text>:</Text></View>
                <View style={styles.nameContainer}>
                    <Text style={styles.nameTxt}>{moment(current_target?.end_date).format('DD-MM-YYYY')}</Text>
                </View>
            </View>
            <View style={[styles.Txtview, { borderTopWidth: 1 }]}>
                <View style={styles.projectContainer}>
                    <Text style={styles.projectTxt}>Visit target</Text>
                </View>
                <View><Text>:</Text></View>
                <View style={styles.nameContainer}>
                    <Text style={styles.nameTxt}>
                        {current_target?.visitTarget ?

                            `${current_target?.visitTarget} / ${current_target?.achieve_visit_target}`
                            : null
                        }
                    </Text>
                </View>
            </View>
            <View style={[styles.Txtview, { borderTopWidth: 1 }]}>
                <View style={styles.projectContainer}>
                    <Text style={styles.projectTxt}>Site visit target</Text>
                </View>
                <View><Text>:</Text></View>
                <View style={styles.nameContainer}>
                    <Text style={styles.nameTxt}>
                        {current_target?.site_visit_target ?

                            `${current_target?.site_visit_target} / ${current_target?.achieve_site_visit_target}`
                            : null
                        }
                    </Text>
                </View>
            </View>
            <View style={[styles.Txtview, { borderTopWidth: 1 }]}>
                <View style={styles.projectContainer}>
                    <Text style={styles.projectTxt}>Close target</Text>
                </View>
                <View><Text>:</Text></View>
                <View style={styles.nameContainer}>
                    <Text style={styles.nameTxt}>
                        {current_target?.closing_target ?

                            `${current_target?.closing_target} / ${current_target?.achieve_closing_target}`
                            : null
                        }
                    </Text>
                </View>
            </View>
        </ScrollView>
    )
}
export default StatsView