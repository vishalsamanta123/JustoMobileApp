import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  Image,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Switch } from "react-native-switch";
import Header from "../../../components/Header";
import images from "../../../assets/images";
import styles from "./styles";
import strings from "../../../components/utilities/Localization";
import {
  GREEN_COLOR,
  RED_COLOR,
  ROLE_IDS,
  WHITE_COLOR,
} from "../../../components/utilities/constant";
import SourcingDashboardView from "./SourcingView";
import ClosingDashboardView from "./ClosingView";
import ComingSoonScreen from "app/components/CommonScreen/ComingSoon";
import PostSaleDashboardView from "./PostSalesView";
import ReceiptionistDashboardView from "./ReceptionistView";
import SiteHeadView from "./SiteHeadView";

const DashboardView = (props: any) => {
  const roleType = props?.getLoginType?.response?.data?.role_id || null;
  const renderItem = ({ item }: any) => {
    return (
      <TouchableOpacity
        onPress={() => {
          roleType === ROLE_IDS.sourcingtl_id
            ? props.onPressSMList("details", item)
            : props.onPressCPList("details", item);
        }}
        style={styles.headingView}
      >
        <Text style={styles.itemText}>
          {roleType === ROLE_IDS.sourcingtl_id
            ? item.user_name
            : roleType === ROLE_IDS.sourcingmanager_id
            ? item.agent_name
            : strings.notfount}
        </Text>
        <Text style={styles.itemText}>{item.total_visit}</Text>
        <Text style={styles.itemText}>{item.total_site_visit}</Text>
        {/* <Text style={styles.itemText}>{item.total_closing_lead}</Text> */}
        <Image source={images.rightArrow} style={styles.rightArrowImage} />
      </TouchableOpacity>
    );
  };
  return (
    <>
      <View style={styles.mainContainerWrap}>
        <Header
          leftImageSrc={images.menu}
          rightImageScr={images.notification}
          headerText={strings.dashboardHeader}
          rightSecondImageScr={images.notification}
          handleOnLeftIconPress={props.handleDrawerPress}
          headerStyle={styles.headerStyle}
        />
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.dashboardScroll}
          bounces={false}
        >
          <View style={styles.dashboardWrap}>
            <View style={styles.nameView}>
              <View style={styles.statusView}>
                <Text style={styles.statusText}>Status</Text>
                <View style={styles.switchView}>
                  <Switch
                    value={props?.isEnabled === 1 ? true : false}
                    onValueChange={(val) =>
                      props.updateStatusPress(props?.isEnabled)
                    }
                    //disabled={false}
                    backgroundActive={GREEN_COLOR}
                    backgroundInactive={RED_COLOR}
                    circleActiveColor={WHITE_COLOR}
                    circleInActiveColor={WHITE_COLOR}
                    circleSize={25}
                    activeText={""}
                    inActiveText={""}
                    // barHeight={1}
                    circleBorderWidth={2}
                  />
                </View>
              </View>
              <View style={styles.welcomeView}>
                <Text style={styles.welcomeToText}>Welcome</Text>
                <Text style={styles.welcomeNameText}>
                  {props?.dashboardData?.user_name}
                </Text>
              </View>
            </View>
            {roleType === ROLE_IDS.postsales_id ? (
              <></>
            ) : (
              <View style={styles.qrCodeView}>
                {props?.dashboardData?.qrcode != "" ||
                props?.dashboardData?.qr_code ? (
                  <Image
                    source={{
                      uri:
                        props?.dashboardData?.qrcode ||
                        props?.dashboardData?.qr_code,
                    }}
                    style={styles.qrCodeImage}
                  />
                ) : (
                  <Image source={images.qrCode} style={styles.qrCodeImage} />
                )}
                {/* <TouchableOpacity style={styles.linkImageView}>
                <Image source={images.link} style={styles.linkImage} />
              </TouchableOpacity> */}
              </View>
            )}
          </View>
          {roleType === ROLE_IDS.sourcingtl_id ||
          roleType === ROLE_IDS.sourcingmanager_id ? (
            <SourcingDashboardView
              dashboardData={props?.dashboardData}
              getLoginType={props.getLoginType}
              onPressTodayVisit={props.onPressTodayVisit}
              onPressSiteVisit={props.onPressSiteVisit}
              onPressSMList={props.onPressSMList}
              onPressCPList={props.onPressCPList}
            />
          ) : (
            <>
              {roleType === ROLE_IDS.closingtl_id ||
              roleType === ROLE_IDS.closingmanager_id ? (
                <ClosingDashboardView
                  dashboardData={props?.dashboardData}
                  getLoginType={props.getLoginType}
                  onPressSiteVisit={props.onPressSiteVisit}
                  onpressBooking={props.onpressBooking}
                  onpressSMList={props.onpressSMList}
                />
              ) : (
                <>
                  {roleType === ROLE_IDS.postsales_id ? (
                    <PostSaleDashboardView
                      dashboardData={props?.dashboardData}
                      getLoginType={props.getLoginType}
                      onpressBooking={props.onpressBooking}
                    />
                  ) : (
                    <>
                      {roleType === ROLE_IDS.receptionist_id ? (
                        <ReceiptionistDashboardView
                          dashboardData={props?.dashboardData}
                        />
                      ) : (
                        <>
                          {roleType === ROLE_IDS.sitehead_id ? (
                            <SiteHeadView dashboardData={props?.dashboardData} onpressBooking={props.onpressBooking}/>
                          ) : (
                            <View style={styles.secondPortion}>
                              <ComingSoonScreen />
                            </View>
                          )}
                        </>
                      )}
                    </>
                  )}
                </>
              )}
            </>
          )}
          {props?.listData?.length > 0 ? (
            <View style={styles.bottomSection}>
              <View style={styles.headingView}>
                {roleType === ROLE_IDS.sourcingtl_id ? (
                  <>
                    <Text style={styles.headingText}>SM NAME</Text>
                    <Text style={styles.headingText}>VISITOR</Text>
                    <Text style={styles.headingText}>SITE VISIT</Text>
                    {/* <Text style={styles.headingText}>CLOSE LEAD</Text> */}
                  </>
                ) : (
                  <>
                    {roleType === ROLE_IDS.sourcingmanager_id && (
                      <>
                        <Text style={styles.headingText}>CP NAME</Text>
                        <Text style={styles.headingText}>VISITOR</Text>
                        <Text style={styles.headingText}>SITE VISIT</Text>
                        {/* <Text style={styles.headingText}>CLOSE LEAD</Text> */}
                      </>
                    )}
                  </>
                )}
              </View>
              <FlatList data={props?.listData} renderItem={renderItem} />
              {roleType === ROLE_IDS.sourcingtl_id ||
              (roleType === ROLE_IDS.sourcingmanager_id &&
                props?.listData?.length > 5) ? (
                <TouchableOpacity
                  style={styles.headingView}
                  onPress={() => {
                    roleType === ROLE_IDS.sourcingtl_id
                      ? props.onPressSMList()
                      : props.onPressCPList();
                  }}
                >
                  <Text style={[styles.headingText, styles.knowMoreText]}>
                    Know More
                  </Text>
                </TouchableOpacity>
              ) : null}
            </View>
          ) : null}
        </ScrollView>
      </View>
    </>
  );
};

export default DashboardView;
