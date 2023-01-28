import {View, Text, TouchableOpacity, Image} from 'react-native';
import React, { useEffect } from 'react';
import styles from './styles';
import strings from '../../../../components/utilities/Localization';
import { BLACK_COLOR, YELLOW_COLOR,GOLDEN_COLOR,GREEN_COLOR,RED_COLOR, ROLE_IDS } from '../../../../components/utilities/constant';
import images from '../../../../assets/images';
import moment from 'moment';
import { useSelector } from 'react-redux';

const PropertyListItem = (props: any) => {
  const getLoginType = useSelector((state: any) => state.login);
  const roleType = getLoginType?.response?.data?.role_id || null;
  return (
    <View style={styles.IteamView}>
      <View style={styles.Txtview} >
        <View style={styles.projectContainer}>
          <Text style={styles.projectTxt}>Project Name :</Text>
        </View>
        <View style={styles.nameContainer}>
          <Text style={styles.nameTxt}>{props.items.property_title}</Text>
        </View>
      </View>
      <View style={styles.Txtview} >
        <View style={styles.projectContainer}>
          <Text style={styles.projectTxt}>Locality :</Text>
        </View>
        <View style={styles.nameContainer}>
        <Text style={styles.nameTxt}>{props.items.location}</Text>
        </View>
      </View>
      <View style={styles.Txtview} >
        <View style={styles.projectContainer}>
          <Text style={styles.projectTxt}>Location :</Text>
        </View>
        <View style={styles.nameContainer}>
        <Text style={styles.nameTxt}>{props.items.area}</Text>
        </View>
      </View>
      <View style={styles.Txtview} >
        <View style={styles.projectContainer}>
          <Text style={styles.projectTxt}>Leads :</Text>
        </View>
        <View style={styles.nameContainer}>
        <Text style={styles.nameTxt}>{props.items.total_visitor}</Text>
        </View>
      </View>
      <View style={styles.Txtview}>
        <View style={styles.projectContainer}>
          <Text style={styles.projectTxt}>Site Visit :</Text>
        </View>
        <View style={styles.nameContainer}>
        <Text style={styles.nameTxt}>{props.items.site_visit}</Text>
        </View>
      </View>
      <View style={styles.Txtview} >
        <View style={styles.projectContainer}>
          <Text style={styles.projectTxt}>Close Visit :</Text>
        </View>
        <View style={styles.nameContainer}>
        <Text style={styles.nameTxt}>{props.items.close_visit}</Text>
        </View>
      </View>
      <View style={styles.Txtview} >
        <View style={styles.projectContainer}>
          <Text style={styles.projectTxt}>Status :</Text>
        </View>
        <View style={styles.nameContainer}>
         <Text style={[styles.nameTxt, {
          color: props.items.status ? GREEN_COLOR : RED_COLOR
         }]}>{(props.items.status) ? 'Active' : 'Inactive'}</Text>
        </View>
      </View>
      <View style={[styles.Txtview,{borderBottomWidth: 0}]} >
        <View style={styles.projectContainer}>
          <Text style={styles.projectTxt}>Create Date :</Text>
        </View>
        <View style={styles.nameContainer}>
        <Text style={styles.nameTxt}>{moment(props.items.createdDate).format('MM/DD/YYYY')}</Text>
        </View>
      </View>
      <View style={[styles.buttonContainer, roleType === ROLE_IDS.sitehead_id ? {
        justifyContent: 'flex-end'
      } : {}]}>
      {roleType === ROLE_IDS.sitehead_id ?
        <></> :
        <TouchableOpacity
         onPress={() => props.handleAllocatePress(props.items)}
         style={[styles.button, {
          borderColor: GREEN_COLOR
        }]} >
          <Text style={[styles.buttonTxt,{
          color: GREEN_COLOR
          }]}>{
            strings.allocate
          }</Text>
        </TouchableOpacity>}
        <TouchableOpacity style={styles.Viewbutton} onPress={() => props.onPressView(props.items)} >
        <Image 
            source={images.forwardArrow}
            style={styles.arrow}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default PropertyListItem;
