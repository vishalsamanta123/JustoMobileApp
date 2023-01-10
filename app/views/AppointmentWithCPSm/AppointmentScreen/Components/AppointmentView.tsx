import { View, useWindowDimensions, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import {
  PRIMARY_THEME_COLOR,
  PRIMARY_THEME_COLOR_DARK,
  TABBAR_COLOR,
} from "../../../../components/utilities/constant";
import Header from "../../../../components/Header";
import images from "../../../../assets/images";
import strings from "../../../../components/utilities/Localization";
import styles from "./Styles";
import { SceneMap, TabBar, TabView } from "react-native-tab-view";
import SmAppointment from "./SmAppointment";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import AppointmentModal from "./AppointmentModal";
import Button from "../../../../components/Button";
import MyAppointment from "./MyAppointment";
import { useDispatch, useSelector } from "react-redux";
import EmptyListScreen from "app/components/CommonScreen/EmptyListScreen";
import { getUserVisitList } from "app/Redux/Actions/LeadsActions";
import ComingSoonScreen from "app/components/CommonScreen/ComingSoon";
import { updateUserAppointmentStatus } from "app/Redux/Actions/AppiontmentWithUserActions";
import ConfirmModal from "app/components/Modals/ConfirmModal";

const AppointmentView = (props: any) => {
  const dispatch: any = useDispatch();
  const loadingref = false;
  const layout = useWindowDimensions();
  const navigation: any = useNavigation();
  const [index, setIndex] = useState(0);
  const [FilterisVisible, setFilterisVisible] = useState(false);
  const { response = {}, list = "" } = useSelector(
    (state: any) => state.appointment
  );
  const userEditAppointmentData = useSelector(
    (state: any) => state.userEditAppointmentData
  );

  const [routes] = useState([
    { key: "first", title: props.role === 'TL'? "My Appointment" :"My Appointment with CP" },
    { key: "second", title: props.role === 'TL'? "SM Appointment With CP" : "Appointment with TL"},
  ]);
  const [visitorList, setVisiitorList] = useState<any>([]);
  const [isVisible, setIsVisible] = useState<any>(false);
  const [params, setParams] = useState({
    appointment_id: "",
    appointment_status: "",
    remark: "",
  });
  useEffect(() => {
    if (list) {
      setVisiitorList(response?.data);
    }
  }, [response]);

  useEffect(() => {
    if (index == 1) {
      props.getAppointmentList(props.role === 'TL'? 3 : 1);
    } else {
      props.getAppointmentList(2);
    }
  }, [userEditAppointmentData]);

  useEffect(() => {
    if (index == 1) {
      props.getAppointmentList(props.role === 'TL'? 3 : 1);
    } else {
      props.getAppointmentList(2);
    }
  }, [index]);
  useFocusEffect(
    React.useCallback(() => {
      setIndex(0)
      props.getAppointmentList(2);
      return () => { };
    }, [navigation])
  );
  const handleOptionPress = (id: any, status: any) => {
    setParams({
      ...params,
      appointment_id: id,
      appointment_status: status,
    });
    setIsVisible(true);
  };
  const handleOnPressYesInModal = () => {
    dispatch(
      updateUserAppointmentStatus(params)
    );
    setIsVisible(false);
  };
  const getVisitorsList = (offset: any, array: any) => {
    dispatch(
      getUserVisitList({
        lead_status: 1,
      })
    );
  };

  const renderTabBar = (props: any) => (
    <TabBar
      activeColor={TABBAR_COLOR}
      //inactiveColor={'#F4F4F4'}
      {...props}
      indicatorStyle={{ borderWidth: 2, borderColor: TABBAR_COLOR }}
      style={{ backgroundColor: PRIMARY_THEME_COLOR_DARK }}
    />
  );
  const onPressView = (items: any) => {
    navigation.navigate("AppointmentDetails", items);
  };
  const onPressEdit = (items: any) => {
    navigation.navigate("AddAppointmentScreen", {
      data: items,
      type: strings.edit,
    });
  };
  const onPressAddNew = () => {
    navigation.navigate("AddAppointmentScreen", { type: strings.add });
  };
  const FirstRoute = () => (
    <FlatList
      data={props.appointmentList}
      renderItem={({ item }) => (
        <MyAppointment
          items={item}
          onPressView={(items: any) => onPressView(item)}
          onPressEdit={(items: any) => onPressEdit(item)}
          handleOptionPress={handleOptionPress}
        />
      )}
      ListEmptyComponent={
        <EmptyListScreen message={"My Appointment with CP"} />
      }
      onRefresh={() => {
        props.setFilterData({
          start_date: "",
          end_date: "",
          customer_name: "",
          status: "",
        });
        props.getAppointmentList(2);
      }}
      refreshing={loadingref}
      // onEndReached={() => {
      //     if (props.appointmentList?.length < response?.total_data) {
      //         props.getAppointmentList(2)
      //     }
      // }}
    />
  );

  const SecondRoute = () => (
    <FlatList
      data={props.appointmentList}
      renderItem={({ item }) => (
        <SmAppointment
          items={item}
          onPressView={onPressView}
          handleOptionPress={handleOptionPress}
          role={props.role}
        />
      )}
      ListEmptyComponent={
        <EmptyListScreen message={"SM Appointment With CP"} />
      }
      onRefresh={() => {
        props.setFilterData({
          start_date: "",
          end_date: "",
          customer_name: "",
          status: "",
        });
        props.getAppointmentList(props.role === 'TL'? 3 : 1);
      }}
      refreshing={loadingref}
      // onEndReached={() => {
      //     if (props.appointmentList?.length < response?.total_data) {
      //         props.getAppointmentList(1)
      //     }
      // }}
    />
  );
  const renderScene = SceneMap({
    first: FirstRoute,
    second: SecondRoute,
  });

  return (
    <View style={styles.mainContainer}>
      <Header
        leftImageSrc={images.menu}
        // rightFirstImageScr={images.filter}
        rightSecondImageScr={images.notification}
        headerText={props.role === 'TL'? strings.appointmentWithSMHeader : strings.appointmentWithCPHeader}
        handleOnLeftIconPress={props.handleDrawerPress}
        headerStyle={styles.headerStyle}
        RightFirstIconStyle={styles.RightFirstIconStyle}
        handleOnRightFirstIconPress={() => setFilterisVisible(true)}
        barStyle={"light-content"}
        statusBarColor={PRIMARY_THEME_COLOR}
      />
      {/* <ComingSoonScreen /> */}
      <View style={{ marginVertical: 10, alignItems: "flex-end" }}>
        <Button
          width={200}
          height={30}
          buttonText={strings.addNewappointment}
          btnTxtsize={14}
          handleBtnPress={() => onPressAddNew()}
        />
      </View>
      <View style={styles.propertyListView}>
        <TabView
          renderTabBar={renderTabBar}
          navigationState={{ index, routes }}
          renderScene={renderScene}
          onIndexChange={setIndex}
          initialLayout={{ width: layout.width }}
        />
      </View>
      <AppointmentModal
        Visible={isVisible}
        setIsVisible={setIsVisible}
        params={params}
        setParams={setParams}
        handleOnPressYesInModal={handleOnPressYesInModal}
      />
    </View>
  );
};

export default AppointmentView;
