import React, { useState } from "react";
import { View, Text, ScrollView, Image, FlatList, TouchableOpacity, } from "react-native";
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Switch } from 'react-native-switch';
import Header from "../../../components/Header";
import images from "../../../assets/images";
import styles from "./styles";
import strings from "../../../components/utilities/Localization";
import { GREEN_COLOR, RED_COLOR, WHITE_COLOR } from "../../../components/utilities/constant";

const DashboardView = (props: any) => {
  const targetData = props?.dashboardData?.target || {}
  const achieveTargetData = props?.dashboardData?.achievetarget || {}
  const insets = useSafeAreaInsets();
  const role = props?.getLoginType?.response?.data?.role_title || {}
  const renderItem = ({ item }: any) => {
    return (
      <TouchableOpacity style={styles.headingView}>
        <Text style={styles.itemText}>{props?.getLoginType?.response?.data?.role_title === 'Sourcing TL' ?
          item.user_name : props.getLoginType?.response?.data?.role_title === 'Sourcing Manager'
            ? item.agent_name : strings.notfount}</Text>
        <Text style={styles.itemText}>{item.total_visit}</Text>
        <Text style={styles.itemText}>{item.total_site_visit}</Text>
        <Text style={styles.itemText}>{item.total_closing_lead}</Text>
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
          handleOnLeftIconPress={props.handleDrawerPress}
          headerStyle={styles.headerStyle}
        />
        <ScrollView showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.dashboardScroll} bounces={false}>
          <View style={styles.dashboardWrap}>
            <View style={styles.nameView}>
              <View style={styles.statusView}>
                <Text style={styles.statusText}>Status</Text>
                <View style={styles.switchView}>
                  <Switch
                    value={props?.isEnabled === 1 ? true : false}
                    onValueChange={(val) => props.updateStatusPress(props?.isEnabled)}
                    //disabled={false}
                    backgroundActive={GREEN_COLOR}
                    backgroundInactive={RED_COLOR}
                    circleActiveColor={WHITE_COLOR}
                    circleInActiveColor={WHITE_COLOR}
                    circleSize={25}
                    activeText={''}
                    inActiveText={''}
                    // barHeight={1}
                    circleBorderWidth={2}
                  />


                </View>
              </View>
              <View style={styles.welcomeView}>
                <Text style={styles.welcomeToText}>Welcome to</Text>
                <Text style={styles.welcomeNameText}>{props?.dashboardData?.user_name}</Text>
              </View>
            </View>
            <View style={styles.qrCodeView}>
              {props?.dashboardData?.qrcode != "" || props?.dashboardData?.qr_code ?
                <Image source={{ uri: props?.dashboardData?.qrcode || props?.dashboardData?.qr_code }}
                  style={styles.qrCodeImage} />
                :
                <Image source={images.qrCode} style={styles.qrCodeImage} />
              }
              <TouchableOpacity style={styles.linkImageView}>
                <Image source={images.link} style={styles.linkImage} />
              </TouchableOpacity>
            </View>
          </View>
          {/* Top Section */}
          {role === 'Sourcing TL' || role === 'Sourcing Manager' ?
            <>
              <View style={styles.secondPortion}>
                <View style={styles.firstCardView}>
                  <View style={styles.cardTextView}>
                    <Text style={styles.cardText}>Visit Target</Text>
                  </View>
                  <View style={styles.numberView}>
                    <Text style={styles.numberText}>{achieveTargetData?.achieve_visit_target}/{targetData?.booking_target}</Text>
                  </View>
                </View>
                <View style={styles.secondCardView}>
                  <View style={styles.cardTextView}>
                    <Text style={styles.cardText}>Site Visit Target</Text>
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
                    <Text style={styles.thirdPortionCardText}>Today Visit</Text>
                  </View>
                  <View style={styles.numberView}>
                    <Text style={styles.thirdPortionNumberText}>{props?.dashboardData?.today_visit}</Text>
                  </View>
                </View>
                <View style={styles.thirdPortioncardView}>
                  <View style={styles.thirdPortionCardTextView}>
                    <Text style={styles.thirdPortionCardText} numberOfLines={2}>
                      Today Site Visit
                    </Text>
                  </View>
                  <View style={styles.numberView}>
                    <Text style={styles.thirdPortionNumberText}>{props?.dashboardData?.today_site_visit}</Text>
                  </View>
                </View>
                <View style={styles.thirdPortioncardView}>
                  <View style={styles.thirdPortionCardTextView}>
                    <Text style={styles.thirdPortionCardText}>{props?.getLoginType?.response?.data?.role_title === 'Sourcing TL' ? 'Active SM' : 'Active CP'}</Text>
                  </View>
                  <View style={styles.numberView}>
                    <Text style={styles.thirdPortionNumberText}>{
                      role === 'Sourcing TL' ? props?.dashboardData?.total_sorcing_manager : props?.dashboardData?.active_cp
                    }</Text>
                  </View>
                </View>
              </View>
            </>
            :
            <>
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
                {role === 'Closing TL' ?
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
            </>
          }
          <View style={styles.bottomSection}>
            <View style={styles.headingView}>
              {props?.getLoginType?.response?.data?.role_title === 'Sourcing TL' ?
                <>
                  <Text style={styles.headingText}>SM NAME</Text>
                  <Text style={styles.headingText}>VISITOR</Text>
                  <Text style={styles.headingText}>SITE VISIT</Text>
                  <Text style={styles.headingText}>CLOSE LEAD</Text>
                </>
                :
                <>
                  {props?.getLoginType?.response?.data?.role_title === 'Sourcing Manager' &&
                    <>
                      <Text style={styles.headingText}>CP NAME</Text>
                      <Text style={styles.headingText}>VISITOR</Text>
                      <Text style={styles.headingText}>SITE VISIT</Text>
                      <Text style={styles.headingText}>CLOSE LEAD</Text>
                    </>
                  }
                </>
              }
            </View>
            <FlatList
              data={props?.listData}
              renderItem={renderItem} />
            {props?.getLoginType?.response?.data?.role_title === 'Sourcing TL' ||
              props?.getLoginType?.response?.data?.role_title === 'Sourcing Manager' && props?.listData?.length > 5 ?
              <TouchableOpacity style={styles.headingView}>
                <Text style={[styles.headingText, styles.knowMoreText]}>
                  Know More
                </Text>
              </TouchableOpacity> : null
            }
          </View>
        </ScrollView>
      </View>
    </>
  );
};

export default DashboardView;
