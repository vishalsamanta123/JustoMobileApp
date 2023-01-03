import { View, FlatList, } from "react-native";
import React, { useState } from "react";
import styles from "./Styles";
import images from "../../../../assets/images";
import { PRIMARY_THEME_COLOR, } from "../../../../components/utilities/constant";
import strings from "../../../../components/utilities/Localization";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Header from "../../../../components/Header";
import LeadManagementItem from "./LeadManagementItem";
import { useNavigation } from "@react-navigation/native";
import FilterModal from "./LeadManagementModal";
import EmptyListScreen from "app/components/CommonScreen/EmptyListScreen";
const DATA: any = [
  {
    Projectname: 'ABC',
    Location: 'Indore',
    visitor: 123,
    siteVisit: 234,
    closeVisit: 600,
    status: 'confirmatin Pending',
    createddate: '11/10/2022'
  },
  {
    Projectname: 'ABC',
    Location: 'Indore',
    visitor: 123,
    siteVisit: 234,
    closeVisit: 600,
    status: 'Subscribe',
    createddate: '11/10/2022'
  },
  {
    Projectname: 'ABC',
    Location: 'Indore',
    visitor: 123,
    siteVisit: 234,
    closeVisit: 600,
    status: 'Unsubscribe',
    createddate: '11/10/2022'
  },
  {
    Projectname: 'ABC',
    Location: 'Indore',
    visitor: 123,
    siteVisit: 234,
    closeVisit: 600,
    status: 'confirmatin Pending',
    createddate: '11/10/2022'
  },
];

const LeadManagementView = (props: any) => {
  const loadingref = false
  const insets = useSafeAreaInsets();
  const navigation: any = useNavigation()
  const [FilterisVisible, setFilterisVisible] = useState(false)

  const onRefresh = () => {
    props.setFilterData({
      startdate: '',
      enddate: '',
      search_by_name: '',
      search_by_location: '',
      status: ''
    })
    props.getVisitorsList(0, {})
    props.setVisiitorList([])
  }
  const onPressView = (data: any) => {
    navigation.navigate('LeadDetails', data)
  }
  return (
    <View style={styles.mainContainer}>
      <Header
        leftImageSrc={images.menu}
        rightFirstImageScr={images.filter}
        rightSecondImageScr={images.notification}
        headerText={strings.visitor}
        handleOnLeftIconPress={props.handleDrawerPress}
        headerStyle={styles.headerStyle}
        RightFirstIconStyle={styles.RightFirstIconStyle}
        handleOnRightFirstIconPress={() => setFilterisVisible(true)}
        statusBarColor={PRIMARY_THEME_COLOR}
        barStyle={'light-content'}
      />
      <View style={styles.propertyListView}>
        <FlatList
          data={props?.visitorList}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) =>
            <LeadManagementItem items={item}
              onPressView={onPressView} />
          }
          ListEmptyComponent={() => (
            <EmptyListScreen message={strings.visitor} />
          )}
          onEndReached={() => {
            if (props?.visitorList?.length < props?.moreData) {
              props.getVisitorsList(props?.visitorList?.length > 2 ?
                props.offSET + 1 : 0, props.filterData)
            }
          }}
          onRefresh={() => onRefresh()}
          refreshing={loadingref}
        />
      </View>
      {/* <ConfirmModal Visible={isVisible} setIsVisible={setIsVisible} /> */}
      <FilterModal
        Visible={FilterisVisible}
        setIsVisible={setFilterisVisible}
        setFilterData={props.setFilterData}
        filterData={props.filterData}
        setVisiitorList={props?.setVisiitorList}
        getVisitorsListApi={props.getVisitorsList}
        getVisitorsList={() => props.getVisitorsList(0, props.filterData)}
      />
    </View>
  );
};

export default LeadManagementView;
