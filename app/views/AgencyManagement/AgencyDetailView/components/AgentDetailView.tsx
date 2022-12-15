import { View, Text, StatusBar, Image, useWindowDimensions } from 'react-native'
import React, { useState } from 'react'
import Header from '../../../../components/Header'
import { PRIMARY_THEME_COLOR, PRIMARY_THEME_COLOR_DARK, TABBAR_COLOR, WHITE_COLOR } from '../../../../components/utilities/constant'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import images from '../../../../assets/images'
import strings from '../../../../components/utilities/Localization'
import { normalizeSpacing } from "../../../../components/scaleFontSize";
import styles from './styles'
import AgentDetailInfo from './AgentDetailInfo'
import AgentDetailStats from './AgentDetailStats'
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import moment from 'moment'


const PropertyDetailView = (props: any) => {
  const data = props?.allDetails || {};

  const layout = useWindowDimensions();

  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: 'first', title: 'Agency Info' },
    { key: 'second', title: 'Agency Stats' },
  ]);


  const DATAINFO: any =
  {
    status: data?.status ? data?.status : '',
    AgentName: data?.owner_name ? data?.owner_name : '',
    Mobileno: data?.primary_mobile ? data?.primary_mobile : '',
    Email: data?.email ? data?.email : '',
    whatsappno: data?.whatsapp_number ? data?.whatsapp_number : '',
    rerano: data?.rera_certificate_no ? data?.rera_certificate_no : '',
    aadharno: data?.adhar_no ? data?.adhar_no : '',
    pancardno: data?.pancard_no ? data?.pancard_no : '',
    location: data?.location ? data?.location : '',
    workingfrom: data?.createdDate ? moment(data?.createdDate).format('MMM Do YYYY') : '',
    workinglocation: data?.working_location ? data?.working_location : '',
  };
  const DATASTATS: any =
  {
    closingper: data?.agent_stats?.total_closing_percentage,
    visitor: data?.agent_stats?.total_visit,
    siteVisit: data?.agent_stats?.total_site_visit,
    closeVisit: data?.agent_stats?.lastclosevisit ?
      moment(data?.agent_stats?.lastclosevisit).format('llll') : '',
    lastlogin: data?.agent_stats?.last_login ?
      moment(data?.agent_stats?.last_login).format('llll') : '',
    lastvisit: data?.agent_stats?.last_lead_crate ?
      moment(data?.agent_stats?.last_lead_crate).format('llll') : '',
    lastsitevisit: data?.agent_stats?.last_site_visit ?
      moment(data?.agent_stats?.last_site_visit).format('llll') : '',
    lastclosevisit: data?.agent_stats?.last_closing_lead ?
      moment(data?.agent_stats?.last_closing_lead).format('llll') : '',
  };
  const FirstRoute = () => (
    <AgentDetailInfo items={DATAINFO} />
  );

  const SecondRoute = () => (
    <AgentDetailStats items={DATASTATS} />
  );

  const renderScene = SceneMap({
    first: FirstRoute,
    second: SecondRoute,
  });


  /*   const renderTabBar = props => {
      return (
        <TabBar
          {...props}
          renderLabel={({ focused, route }) => {
            return (
              <TextView
                size={20}
                category="Medium"
                color={focused ? 'BLACK' : 'GRAY3'}>
                {route.title}
              </TextView>
            );
          }}
          indicatorStyle={styles.indicatorStyle}
          style={styles.tabBar}
        />
      );
    }; */

  const renderTabBar = (props: any) => (

    <TabBar
      activeColor={TABBAR_COLOR}
      //inactiveColor={'#F4F4F4'} 
      {...props}
      indicatorStyle={{ borderWidth: 2, borderColor: TABBAR_COLOR }}
      style={{ backgroundColor: PRIMARY_THEME_COLOR_DARK }} />

  );



  return (
    <View style={styles.mainContainer}>
      <Header
        leftImageSrc={images.backArrow}
        rightSecondImageScr={images.notification}
        headerText={strings.Agencydetail}
        headerStyle={styles.headerStyle}
        RightFirstIconStyle={styles.leftImageIconStyle}
        leftImageIconStyle={styles.leftImageIconStyle}
        handleOnLeftIconPress={props.handleBackPress}
        statusBarColor={PRIMARY_THEME_COLOR}
        barStyle={'light-content'}
      />
      <View style={styles.propertyListView}>

        <TabView
          renderTabBar={renderTabBar}
          navigationState={{ index, routes }}
          renderScene={renderScene}
          onIndexChange={setIndex}
          initialLayout={{ width: layout.width }}
        //pagerStyle={{backgroundColor:'red'}}

        />

        {/* <AgentDetailInfo items={DATAINFO} /> */}
      </View>
    </View>
  )
}

export default PropertyDetailView