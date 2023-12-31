import moment from "moment";
import React from "react";
import { View, Text } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import Button from "../../../../components/Button";
import { normalize } from "../../../../components/scaleFontSize";
import {
  BLACK_COLOR,
  DATE_FORMAT,
} from "../../../../components/utilities/constant";
import strings from "../../../../components/utilities/Localization";
import styles from "./styles";

const StatsView = (props: any) => {
  const item = props?.items || {};
  const current_target =
    props?.item?.current_target?.length > 0
      ? props?.item?.current_target?.[0]
      : {};
  return (
    <ScrollView>
      <View style={styles.Txtview}>
        <View style={styles.projectContainer}>
          <Text style={styles.projectTxt}>No. of site visit</Text>
        </View>
        <View>
          <Text>:</Text>
        </View>
        <View style={styles.nameContainer}>
          <Text style={styles.nameTxt}>{item?.user_states?.total_visit}</Text>
        </View>
      </View>
      <View style={styles.Txtview}>
        <View style={styles.projectContainer}>
          <Text style={styles.projectTxt}>No. of Close visit</Text>
        </View>
        <View>
          <Text>:</Text>
        </View>
        <View style={styles.nameContainer}>
          <Text style={styles.nameTxt}>
            {item?.user_states?.total_closing_lead}
          </Text>
        </View>
      </View>
      <View style={styles.Txtview}>
        <View style={styles.projectContainer}>
          <Text style={styles.projectTxt}>Closing Percentage</Text>
        </View>
        <View>
          <Text>:</Text>
        </View>
        <View style={styles.nameContainer}>
          <Text style={styles.nameTxt}>
            {item?.user_states?.total_closing_percentage}
          </Text>
        </View>
      </View>
      <View style={styles.Txtview}>
        <View style={styles.projectContainer}>
          <Text style={styles.projectTxt}>Last Login</Text>
        </View>
        <View>
          <Text>:</Text>
        </View>
        <View style={styles.nameContainer}>
          <Text style={styles.nameTxt}>
            {item?.user_states?.last_login === "" ||
            item?.user_states?.last_login === null ||
            item?.user_states?.last_login === undefined
              ? ""
              : moment(item?.user_states?.last_login).format(DATE_FORMAT)}
          </Text>
        </View>
      </View>
      <View style={styles.Txtview}>
        <View style={styles.projectContainer}>
          <Text style={styles.projectTxt}>Last Lead Create </Text>
        </View>
        <View>
          <Text>:</Text>
        </View>
        <View style={styles.nameContainer}>
          <Text style={styles.nameTxt}>
            {item?.user_states?.last_visit === null ||
            item?.user_states?.last_visit === "" ||
            item?.user_states?.last_visit === undefined
              ? strings.notfount
              : item?.user_states?.last_visit}
          </Text>
        </View>
      </View>
      <View style={styles.Txtview}>
        <View style={styles.projectContainer}>
          <Text style={styles.projectTxt}>Last site visit</Text>
        </View>
        <View>
          <Text>:</Text>
        </View>
        <View style={styles.nameContainer}>
          <Text style={styles.nameTxt}>
            {item?.user_states?.last_site_visit === null ||
            item?.user_states?.last_site_visit === "" ||
            item?.user_states?.last_site_visit === undefined
              ? strings.notfount
              :item?.user_states?.last_site_visit}
          </Text>
        </View>
      </View>
      <View style={styles.Txtview}>
        <View style={styles.projectContainer}>
          <Text style={styles.projectTxt}>Last close visit</Text>
        </View>
        <View>
          <Text>:</Text>
        </View>
        <View style={styles.nameContainer}>
          <Text style={styles.nameTxt}>
            {item?.user_states?.last_closing_lead === null ||
            item?.user_states?.last_closing_lead === "" ||
            item?.user_states?.last_closing_lead === undefined
              ? strings.notfount
              :item?.user_states?.last_closing_lead}
          </Text>
        </View>
      </View>
      {props?.item?.current_target?.length > 0 ? (
        <>
          <Text style={styles.bigTitlesTxt}>Current Target</Text>
          <View style={[styles.Txtview, { borderTopWidth: 1 }]}>
            <View>
              <Text>:</Text>
            </View>
            <View style={styles.projectContainer}>
              <Text style={styles.projectTxt}>Month</Text>
            </View>
            <View>
              <Text>:</Text>
            </View>
            <View style={styles.nameContainer}>
              <Text style={styles.nameTxt}>{current_target?.month}</Text>
            </View>
          </View>
          <View style={[styles.Txtview, { borderTopWidth: 1 }]}>
            <View style={styles.projectContainer}>
              <Text style={styles.projectTxt}>Start Date</Text>
            </View>
            <View>
              <Text>:</Text>
            </View>
            <View style={styles.nameContainer}>
              <Text style={styles.nameTxt}>
                {current_target?.start_date === "" ||
                current_target?.start_date === null ||
                current_target?.start_date === undefined
                  ? ""
                  : moment(current_target?.start_date).format("DD-MM-YYYY")}
              </Text>
            </View>
          </View>
          <View style={[styles.Txtview, { borderTopWidth: 1 }]}>
            <View style={styles.projectContainer}>
              <Text style={styles.projectTxt}>End Date</Text>
            </View>
            <View>
              <Text>:</Text>
            </View>
            <View style={styles.nameContainer}>
              <Text style={styles.nameTxt}>
                {current_target?.end_date === "" ||
                current_target?.end_date === null ||
                current_target?.end_date === undefined
                  ? ""
                  : moment(current_target?.end_date).format("DD-MM-YYYY")}
              </Text>
            </View>
          </View>
          <View style={[styles.Txtview, { borderTopWidth: 1 }]}>
            <View style={styles.projectContainer}>
              <Text style={styles.projectTxt}>Visit target</Text>
            </View>
            <View>
              <Text>:</Text>
            </View>
            <View style={styles.nameContainer}>
              <Text style={styles.nameTxt}>
                {current_target?.visitTarget
                  ? `${current_target?.visitTarget} / ${current_target?.achieve_visit_target}`
                  : null}
              </Text>
            </View>
          </View>
          <View style={[styles.Txtview, { borderTopWidth: 1 }]}>
            <View style={styles.projectContainer}>
              <Text style={styles.projectTxt}>Site visit target</Text>
            </View>
            <View>
              <Text>:</Text>
            </View>
            <View style={styles.nameContainer}>
              <Text style={styles.nameTxt}>
                {current_target?.site_visit_target
                  ? `${current_target?.site_visit_target} / ${current_target?.achieve_site_visit_target}`
                  : null}
              </Text>
            </View>
          </View>
          <View style={[styles.Txtview, { borderTopWidth: 1 }]}>
            <View style={styles.projectContainer}>
              <Text style={styles.projectTxt}>Close target</Text>
            </View>
            <View>
              <Text>:</Text>
            </View>
            <View style={styles.nameContainer}>
              <Text style={styles.nameTxt}>
                {current_target?.closing_target
                  ? `${current_target?.closing_target} / ${current_target?.achieve_closing_target}`
                  : null}
              </Text>
            </View>
          </View>
        </>
      ) : null}
    </ScrollView>
  );
};
export default StatsView;
