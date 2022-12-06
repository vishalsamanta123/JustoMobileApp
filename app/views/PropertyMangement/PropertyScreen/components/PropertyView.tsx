import { View, Text, StatusBar, FlatList, ActivityIndicator } from 'react-native';
import React, { useState, useEffect } from 'react';
import styles from './styles';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import PropertyListItem from './PropertyListItem';
import { useNavigation } from '@react-navigation/native';
import Header from '../../../../components/Header';
import images from '../../../../assets/images';
import strings from '../../../../components/utilities/Localization';
import ConfirmModal from '../../../../components/Modals/ConfirmModal';
import { PRIMARY_THEME_COLOR_DARK, PRIMARY_THEME_COLOR, GREEN_COLOR, RED_COLOR } from '../../../../components/utilities/constant';
import FilterModal from './FilterModel';
import { useSelector, useDispatch } from 'react-redux';
import { getAllMaster } from '../../../../Redux/Actions/MasterActions';
import ErrorMessage from 'app/components/ErrorMessage';
import EmptyListScreen from 'app/components/CommonScreen/EmptyListScreen';


const PropertyView = (props: any) => {
  const dispatch: any = useDispatch()
  const [isVisible, setIsVisible] = useState(false)
  const [masterDataShow, setMasterDataShow] = useState([])
  
  
  const [FilterisVisible, setFilterisVisible] = useState(false)
  const [propertyList, setPropertyList] = useState([])
  const insets = useSafeAreaInsets();
  const propertyData = useSelector((state: any) => state.propertyData) || {}
  const masterData = useSelector((state: any) => state.masterData) || {}
  const navigation: any = useNavigation()
  const [loadingref, setLoadingref] = useState(false);

  const [filterform, setFilterform] = useState({
    start_date: "",
    end_date: "",
    location: "",
    property_name: "",
    property_type: "",
  });


  useEffect(() => {
    if (propertyData?.response) {
      const { response, loading ,list} = propertyData;
     if(list){
      if (response?.status === 200 ) {
        setPropertyList(response?.data);
        props.setIsloading(loading);
       /*  ErrorMessage({
          msg: response.message,
          backgroundColor: GREEN_COLOR
        }) */
      } else {
        setPropertyList([]);
        //errorToast(response.message);
        ErrorMessage({
          msg: response.message,
          backgroundColor: RED_COLOR
        })
      }
     }
    }
  }, [propertyData]);

  useEffect(() => {
    if (masterData?.response) {
      const { response } = masterData;
      if (response?.status === 200) {
        setMasterDataShow(response?.data);
        //props.setIsloading(loading);
      } else {
        setMasterDataShow([]);
        //errorToast(response.message);
      }
    }
  }, [masterData]);





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
      status: 'confirmatin Pending ',
      createddate: '11/10/2022'
    },
  ];

  const onPressView = (items: any) => {
    navigation.navigate('PropertyDetails', items)
  }
  const onRefresh = () => {
    props.getallproperty()
  }
  const confirmStatus = (items : any ) => {
    if(items.approve_status === 2) {
      dispatch(getAllMaster({
        type: 7
      }))  
    }  
    setIsVisible(true)
    props.setCurrentStatus(items.approve_status)
    props.setCurrentProperty(items?.property_id)
    
  }

  const renderFooter = () => {
    return (
      // Footer View with Loader
      <View style={styles.footer}>
        {loadingref ? (
          <ActivityIndicator
            color="black"
            style={{ margin: 15 }} />
        ) : null}
      </View>
    );
  };

  return (
    <View style={styles.mainContainer}>
      <View
        style={{
          backgroundColor: PRIMARY_THEME_COLOR,
          height: insets.top,
        }}
      />
      <StatusBar barStyle={'light-content'} />

      <Header
        leftImageSrc={images.menu}
        rightFirstImageScr={images.filter}
        rightSecondImageScr={images.notification}
        headerText={strings.propertyHeader}
        handleOnLeftIconPress={props.handleDrawerPress}
        headerStyle={styles.headerStyle}
        RightFirstIconStyle={styles.RightFirstIconStyle}
        handleOnRightFirstIconPress={() => setFilterisVisible(true)}
      />
      <View style={styles.propertyListView}>
        <FlatList
          data={propertyList}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={<EmptyListScreen message={strings.propertyHeader} />}
          renderItem={({ item, index }) => <PropertyListItem handleAllocatePress={props.handleAllocatePress} items={item} setIsVisible={setIsVisible} onPressView={onPressView} 
          confirmStatus={(items : any ) => confirmStatus(items)} />}
          /*   onEndReached={({ distanceFromEnd }) => {
              props.Onreachedend()
            }} 
            onEndReachedThreshold={0.5} */
          //ListFooterComponent={renderFooter}
          onRefresh={() => onRefresh()}
          refreshing={loadingref}
        />
      </View>
      {/* <ConfirmModal Visible={isVisible} setIsVisible={setIsVisible} /> */}
     {/* <ConfirmModal
        Visible={isVisible}
        setIsVisible={setIsVisible}
        handleNoPress={() => {
          //props.setChangeStatus({ _id: '', status: false })
          setIsVisible(false)
        }}
        handleYesPress={() => {
          setIsVisible(false)
          props.handleStatusChange()
        }}
        handleConfirmPress={() => {
          setIsVisible(false)
          props.handleStatusChange()
        }}
        setResion={props.setResion}
        resion={props.resion}
        masterDataShow={masterDataShow}
        stringshow={strings.confirmation}
        textshow={strings.deactivconfirmation + ' ' + strings.agencyHeader + '?'}
       
        confirmtype={props.currentStatus === 2 ? '' :  'CONFIRMATION'}
      /> */}


      <FilterModal
        Visible={FilterisVisible}
        setIsVisible={setFilterisVisible}
        filterform={filterform}
        setFilterform={setFilterform}
        
      />
    </View>
  );
};

export default PropertyView;
