import { View, Text, Image, TouchableOpacity, StatusBar, Platform } from 'react-native'
import React, { useEffect, useState } from 'react'
import styles from './styles';
import images from '../assets/images';
import strings from '../components/utilities/Localization';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { DrawerContentScrollView, useDrawerStatus } from '@react-navigation/drawer';
import { PRIMARY_THEME_COLOR } from '../components/utilities/constant';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { userLogout } from '../Redux/Actions/AuthActions';
import { useDispatch } from 'react-redux';


const customDrawer = ({ navigation }: any) => {
  const dispatch: any = useDispatch()
  const isDrawerOpen = useDrawerStatus() === 'open';
  const insets = useSafeAreaInsets()
  const [userData, setUserData] = useState<any>([])
  console.log('userData: ', userData);
  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    const data: any = await AsyncStorage.getItem('userData')
    setUserData(JSON.parse(data))
  }
  const toggleDrawer = () => {
    navigation.toggleDrawer();
  }
  const onpressLogout = async () => {
    dispatch(userLogout())
    navigation.navigate('AuthLoading');
  }
  const ProfileSection = () => {
    return (
      <TouchableOpacity style={styles.MainContainer}>
        <View style={styles.ContainerView}>
          <View style={styles.NameContainer}>
            <Image
              style={styles.UserImge}
              resizeMode={'contain'}
              //source={require('../assets/images/buildings.jpeg')}
              source={userData?.base_url ?
                { uri: userData?.base_url + userData?.profile_picture }
                : images.dummyUser
              }
            />
            <View style={styles.UserNameView}>
              <Text
                numberOfLines={1}
                style={[styles.UserNameText, { width: 120 }]}
              >
                {userData?.user_name ? userData?.user_name : `${userData?.firstname} ${userData?.lastname}`}
                {/* Warren Hussen */}
              </Text>
              <Text style={[styles.UserAddress, { width: 140 }]}>
                Florida, US
              </Text>
            </View>
            <TouchableOpacity style={styles.closeDrawerView} onPress={toggleDrawer}>
              {isDrawerOpen && <Image style={styles.closeDrawerImage} source={images.leftArrow} />}
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
  const DrawerTabSection = (props: any) => {
    return (
      <>
        {props?.type?.includes(userData?.role_title) || props?.type == 'all' ?
          <TouchableOpacity style={styles.drawerTouch} onPress={props.handleDrawerNavigation}>
            <Image source={props.iconSource} style={styles.drawerIconStyle} />
            <Text style={styles.drawerText}>{props.tabTitle}</Text>
          </TouchableOpacity>
          : null}
      </>
    )
  }
  return (
    <View style={styles.drawerMain}>
      <View style={{ backgroundColor: PRIMARY_THEME_COLOR, height: insets.top }} />
      <StatusBar barStyle={'light-content'} />
      <ProfileSection />
      <DrawerContentScrollView contentContainerStyle={{ paddingTop: 0, }} >
        <DrawerTabSection
          type={'all'}
          iconSource={images.dashboard}
          tabTitle={strings.dashboardHeader}
          handleDrawerNavigation={() => { navigation.navigate('DashboardScreen') }}
        />
        <DrawerTabSection
          type={'Closing TL'}
          iconSource={images.property}
          tabTitle={strings.closingManagerHeader}
          handleDrawerNavigation={() => { navigation.navigate('ClosingManager') }}
        />
        <DrawerTabSection
          type={'Sourcing TL,Sourcing Manager,Closing TL'}
          iconSource={images.property}
          tabTitle={strings.propertyManagementHeader}
          handleDrawerNavigation={() => { navigation.navigate('PropertyScreenView') }}
        />
        <DrawerTabSection
          type={'closingmanager,Closing TL'}
          iconSource={images.property}
          tabTitle={strings.appointmentHeader}
          handleDrawerNavigation={() => { navigation.navigate('Appointments') }}
        />
        <DrawerTabSection
          type={'postsales,Closing TL,closingmanager'}
          iconSource={images.lead}
          tabTitle={userData?.type === 'Closing TL' || 'closingmanager' ?
            strings.readytoBookHeader : strings.bookingRequestHead}
          handleDrawerNavigation={() => { navigation.navigate('BookingList') }}
        />
        <DrawerTabSection
          type={'postsales'}
          iconSource={images.lead}
          tabTitle={strings.bookingRequestHead}
          handleDrawerNavigation={() => { navigation.navigate('BookingList') }}
        />
        <DrawerTabSection
          type={'Sourcing TL'}
          iconSource={images.property}
          tabTitle={strings.SourcingManagersHeader}
          handleDrawerNavigation={() => { navigation.navigate('SourcingManager') }}
        />
        <DrawerTabSection
          type={'Sourcing TL,Sourcing Manager'}
          iconSource={images.agency}
          tabTitle={strings.agencyHeader}
          handleDrawerNavigation={() => { navigation.navigate('AgencyListing') }}
        />
        <DrawerTabSection
          type={'Sourcing TL,Sourcing Manager'}
          iconSource={images.lead}
          tabTitle={strings.leadManagementHeader}
          handleDrawerNavigation={() => { navigation.navigate('LeadManagementScreen') }}
        />
        <DrawerTabSection
          type={'Sourcing TL,Sourcing Manager,closingmanager,Closing TL'}
          iconSource={images.event}
          tabTitle={strings.followupHeader}
          handleDrawerNavigation={() => { navigation.navigate('FollowUpScreen'); }}
        />
        <DrawerTabSection
          type={'closingmanager,Closing TL'}
          iconSource={images.property}
          tabTitle={strings.recoveryHeader}
        />
        <DrawerTabSection
          type={'Sourcing TL,Sourcing Manager'}
          iconSource={images.event}
          tabTitle={strings.appointmentWithCPHeader}
          handleDrawerNavigation={() => { navigation.navigate('AppointmentScreenCPSM'); }}
        />
        <DrawerTabSection
          type={'Sourcing TL,Sourcing Manager'}
          iconSource={images.event}
          tabTitle={strings.appointmentForVisitHeader}
          handleDrawerNavigation={() => { navigation.navigate('AppointmentForSite'); }}
        />
        <DrawerTabSection
          type={'Sourcing Manager'}
          iconSource={images.event}
          tabTitle={strings.leaderBoardHeader}
          handleDrawerNavigation={() => { navigation.navigate('LeaderBoard'); }}
        />
        <DrawerTabSection
          type={'Sourcing TL,Sourcing Manager'}
          iconSource={images.event}
          tabTitle={strings.PickuprequestHeader}
          handleDrawerNavigation={() => { navigation.navigate('PickupRequest'); }}
        />
        {/* <DrawerTabSection
          type={'Sourcing Manager,closingmanager,Closing TL'}
          iconSource={images.report}
          tabTitle={strings.reportHeader}
        /> */}
        {/*  <DrawerTabSection
          type={'Sourcing Manager,closingmanager,Closing TL'}
          iconSource={images.chat}
          tabTitle={strings.chatHeader}
        />
        <DrawerTabSection
          type={'Sourcing Manager,closingmanager,Closing TL'}
          iconSource={images.support}
          tabTitle={strings.supportForumHeader}
        />
        <DrawerTabSection
          type={'Sourcing Manager,closingmanager'}
          iconSource={images.support}
          tabTitle={strings.supportHeader}
        />
        <DrawerTabSection iconSource={images.report} tabTitle={strings.reportHeader} />
        <DrawerTabSection iconSource={images.chat} tabTitle={strings.chatHeader} />
        <DrawerTabSection
          type={'Closing TL'}
          iconSource={images.support} tabTitle={strings.supportHeader} /> */}
        <DrawerTabSection
          type={'all'}
          iconSource={images.setting} tabTitle={strings.settingHeader} handleDrawerNavigation={() => {
            navigation.navigate('SettingScreen');
          }} />
        <DrawerTabSection
          type={'all'}
          iconSource={images.logout}
          tabTitle={strings.logout}
          handleDrawerNavigation={() => onpressLogout()}
        />
      </DrawerContentScrollView>
      <View style={styles.versionView}>
        <View style={styles.drawerTouch}>
          <Text style={styles.drawerText}>{strings.versionText}{'1.00.00'}</Text>
        </View>
      </View>
    </View>
  )
}

export default customDrawer;
