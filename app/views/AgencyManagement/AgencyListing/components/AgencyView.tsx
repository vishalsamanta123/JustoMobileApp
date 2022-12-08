import { View, Text, StatusBar, FlatList, Alert } from 'react-native';
import React, { useState } from 'react';
import styles from './styles';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import AgencyListItem from './AgencyListItem';
import { useNavigation } from '@react-navigation/native';
import Header from '../../../../components/Header';
import images from '../../../../assets/images';
import strings from '../../../../components/utilities/Localization';
import ConfirmModal from '../../../../components/Modals/ConfirmModal';
import FilterModal from './AgencyFilterModel';
import { PRIMARY_THEME_COLOR_DARK } from '../../../../components/utilities/constant';

import {
  BLACK_COLOR,
  FONT_FAMILY_EXTRABOLD,
  FONT_FAMILY_SEMIBOLD,
  GRAY_COLOR,
  PRIMARY_THEME_COLOR,
  WHITE_COLOR,
} from '../../../../components/utilities/constant';
import { TouchableOpacity } from 'react-native-gesture-handler';
import EmptyListScreen from 'app/components/CommonScreen/EmptyListScreen';


const AgencyView = (props: any) => {
  const loadingref = false
  const [isVisible, setIsVisible] = useState(false)
  const [FilterisVisible, setFilterisVisible] = useState(false)
  const insets = useSafeAreaInsets();
  const navigation: any = useNavigation()
  const onPressView = () => {
    navigation.navigate('AgencyDetails')
  }
  const ShowPendinglist = () => {
    navigation.navigate('PendingAgencyList')
  }
  const onPressAddnewAgency = () => {
    navigation.navigate('AddnewAgency', {type: 'add'})
  }
  const onRefresh = () => {
    props.setFilterData({
      startdate: '',
      enddate: '',
      search_by_name: '',
      search_by_location: '',
      status: ''
    })
    props.getAgencyList(0, {})
  }
  const onReset = () => {
    props.setFilterData({
      startdate: '',
      enddate: '',
      search_by_name: '',
      search_by_location: '',
      status: ''
    })
    props.getAgencyList(0, {})
  }

  return (
    <View style={styles.mainContainer}>
      <Header
        leftImageSrc={images.menu}
        rightFirstImageScr={images.filter}
        rightSecondImageScr={images.notification}
        headerText={strings.agencyHeader}
        handleOnLeftIconPress={props.handleDrawerPress}
        headerStyle={styles.headerStyle}
        RightFirstIconStyle={styles.RightFirstIconStyle}
        handleOnRightFirstIconPress={() => setFilterisVisible(true)}
        barStyle={'light-content'}
        statusBarColor={PRIMARY_THEME_COLOR}
      />
      <View style={styles.propertyListView}>
        <View style={styles.btnView}>
          <TouchableOpacity
            onPress={() => onPressAddnewAgency()}
            style={[styles.button, { borderColor: BLACK_COLOR, backgroundColor: PRIMARY_THEME_COLOR }]} >
            <Text style={[styles.buttonTxt, {
              color: WHITE_COLOR
            }]}>{strings.addnewAgency}</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => ShowPendinglist()}
            style={[styles.button, { borderColor: BLACK_COLOR, backgroundColor: PRIMARY_THEME_COLOR }]} >
            <Text style={[styles.buttonTxt, {
              color: WHITE_COLOR
            }]}>{strings.pendingconfirm}</Text>
          </TouchableOpacity>

        </View>
        <View style={styles.propertyListViewsec}>
        <FlatList
            showsVerticalScrollIndicator={false}
            data={Array.isArray(props?.agentList) ? props?.agentList : []}
            ListEmptyComponent={<EmptyListScreen message={strings.agency} />}
            renderItem={({ item }) =>
              <AgencyListItem items={item} setIsVisible={setIsVisible}
                onPressView={props.onPressView}
                setChangeStatus={props.setChangeStatus}
              />
            }
            onEndReached={() => {
              if (props?.agentList?.length < props?.moreData) {
                props.getAgencyList(props?.agentList?.length > 2 ?
                  props.offSET + 1 : 0, props.filterData)
              }
            }}
            refreshing={loadingref}
            onRefresh={() => onRefresh()}
          />
        </View>
      </View>
      <ConfirmModal
        Visible={isVisible}
        setIsVisible={setIsVisible}
        stringshow={strings.confirmation}
        textshow={strings.deactivconfirmation + ' ' + strings.agencyHeader + '?'}
        confirmtype={'CONFIRMATION'}
      />
      <FilterModal getAgencyList={props.getAgencyList} onReset={onReset} setFilterData={props.setFilterData} filterData={props.filterData}  Visible={FilterisVisible} setIsVisible={setFilterisVisible} />
    </View>
  );
};

export default AgencyView;
