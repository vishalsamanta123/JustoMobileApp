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
import Button from "app/components/Button";

const LeadManagementView = (props: any) => {
  console.log('props?.visitorList: ', props?.visitorList);
  const loadingref = false
  const navigation: any = useNavigation()
  const [FilterisVisible, setFilterisVisible] = useState(false)

  const onRefresh = () => {
    props.setFilterData({
      startdate: '',
      enddate: '',
      search_by_name: '',
      search_by_location: '',
      status: '',
      property_id: '',
      visit_score: '',
      property_type_title: '',
      property_title: ''
    })
    props.getVisitorsList(0, {})
    props.setVisiitorList([])
  }
  const onPressView = (data: any) => {
    navigation.navigate('LeadDetails', data)
  }
  const handleEdit = (data: any) => {
    navigation.navigate('VisitorUpdate', data)
  }
  const onPressCreatevisit = () => {
    navigation.navigate('AddNewVisitorScreen')
  };
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
        <View style={{ alignItems: 'flex-end' }}>
          <Button
            height={30}
            width={160}
            buttonText={'Add New Visit'}
            handleBtnPress={() => onPressCreatevisit()}
          />
        </View>
        <FlatList
          data={props?.visitorList}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) =>
            <LeadManagementItem items={item}
              onPressView={onPressView}
              handleEdit={handleEdit}
            />
          }
          ListEmptyComponent={() => (
            <EmptyListScreen message={strings.visitor} />
          )}
          onEndReached={() => {
            if (props?.visitorList?.length < props?.moreData) {
              props.getVisitorsList(props?.visitorList?.length >= 3 ?
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
