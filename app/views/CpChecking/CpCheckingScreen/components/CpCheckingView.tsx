import { View, Text, FlatList, TouchableOpacity } from "react-native";
import React from "react";
import Header from "app/components/Header";
import images from "app/assets/images";
import strings from "app/components/utilities/Localization";
import styles from "./styles";
import { PRIMARY_THEME_COLOR } from "app/components/utilities/constant";
import Button from "app/components/Button";
import moment from "moment";

const CpCheckingView = (props: any) => {
  const DATA = [
    {
      cpName: "Rahul",
      visitor: "2",
      siteVisit: "20",
      checkin: "2",
    },
    {
      cpName: "Farooq",
      visitor: "2",
      siteVisit: "20",
      checkin: "2",
    },
    {
      cpName: "Mahendra",
      visitor: "2",
      siteVisit: "20",
      checkin: "2",
    },
    {
      cpName: "Rishabh",
      visitor: "2",
      siteVisit: "20",
      checkin: "2",
    },
    {
      cpName: "Rishabh",
      visitor: "2",
      siteVisit: "20",
      checkin: "2",
    },
    {
      cpName: "Rishabh",
      visitor: "2",
      siteVisit: "20",
      checkin: "2",
    },
    {
      cpName: "Rishabh",
      visitor: "2",
      siteVisit: "20",
      checkin: "2",
    },
    {
      cpName: "Rishabh",
      visitor: "2",
      siteVisit: "20",
      checkin: "2",
    },
    {
      cpName: "Rishabh",
      visitor: "2",
      siteVisit: "20",
      checkin: "2",
    },
    {
      cpName: "Rishabh",
      visitor: "2",
      siteVisit: "20",
      checkin: "2",
    },
    {
      cpName: "Rishabh",
      visitor: "2",
      siteVisit: "20",
      checkin: "2",
    },
    {
      cpName: "Rishabh",
      visitor: "2",
      siteVisit: "20",
      checkin: "2",
    },
    {
      cpName: "Rishabh",
      visitor: "2",
      siteVisit: "20",
      checkin: "2",
    },
    {
      cpName: "Rishabh",
      visitor: "2",
      siteVisit: "20",
      checkin: "2",
    },
  ];
  const loadingref = false
  const renderItem = (item: any) => {

    return (
      <View style={styles.dataView}>
        <Text style={styles.dataTxt}>{item?.user_name}</Text>
        <Text style={styles.dataTxt}>{item?.customer_name}</Text>
        {/* <Text style={styles.dataTxt}>{item?.total_site_visit}</Text> */}
        <Text style={styles.dataTxt}>{moment(item.created_date).fromNow()}</Text>
      </View>
    );
  };
  return (
    <View style={styles.mainContainer}>
      <Header
        leftImageSrc={images.menu}
        // rightFirstImageScr={images.filter}
        rightSecondImageScr={images.notification}
        headerText={strings.cpChecking}
        handleOnLeftIconPress={props.handleDrawerPress}
        headerStyle={styles.headerStyle}
        RightFirstIconStyle={styles.RightFirstIconStyle}
        statusBarColor={PRIMARY_THEME_COLOR}
        barStyle={"light-content"}
      />
      <View style={{ alignItems: "flex-end", paddingVertical: 6 }}>
        <Button
          height={30}
          width={120}
          buttonText={strings.scanQrCode}
          textTransform={null}
          btnTxtsize={15}
          handleBtnPress={() => props.handleScanQr()}
        />
      </View>
      <View style={styles.bottomSection}>
        <View style={styles.headingView}>
          <>
            <Text style={styles.headingText}>Cp Name</Text>
            <Text style={styles.headingText}>Visitor</Text>
            {/* <Text style={styles.headingText}>Site Visit</Text> */}
            <Text style={styles.headingText}>Check In</Text>
          </>
        </View>
        <FlatList
          data={props.cpCheckingList}
          renderItem={({ item, index }: any) => renderItem(item)}
          style={styles.listView}
          refreshing={loadingref}
          onRefresh={props.handleGetCpCheckingList}
        />
      </View>
    </View>
  );
};

export default CpCheckingView;
