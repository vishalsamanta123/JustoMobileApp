import { View, Text, ScrollView, Image } from 'react-native'
import React from 'react'
import styles from './Styles'
import images from '../../../../assets/images'
import { DATE_FORMAT } from 'app/components/utilities/constant'
import moment from 'moment'
import strings from 'app/components/utilities/Localization'

const AppointmentDtailsItem = (props: any) => {
  console.log('props: ', props.detail);
  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <View style={styles.topTxtView}>
        <Text style={styles.topTxt}>Visitor Score </Text>
        <Text style={styles.topTxt}>{props?.detail?.lead_score != '' || props?.detail?.lead_score != undefined
          ? props?.detail?.lead_score :
          strings.notfount}</Text>
      </View>
      <View style={styles.Txtview}>
        <View style={styles.projectContainer}>
          <Text style={styles.projectTxt}>Visitor Name</Text>
        </View>
        <View><Text>:</Text></View>
        <View style={styles.nameContainer}>
          <Text style={styles.nameTxt}>{
            props?.detail?.customer_first_name === '' ||
              props?.detail?.customer_first_name === undefined || props?.detail?.customer_first_name === null ?
              strings.notfount : props?.detail?.customer_first_name}</Text>
        </View>
      </View>
      <View style={styles.Txtview}>
        <View style={styles.projectContainer}>
          <Text style={styles.projectTxt}>Budget</Text>
        </View>
        <View><Text>:</Text></View>
        <View style={styles.nameContainer}>
          <Text style={styles.nameTxt}>{props?.detail?.budget === '' ||
            props?.detail?.budget === undefined || props?.detail?.budget === null ?
            strings.notfount : props?.detail?.budget}</Text>
        </View>
      </View>
      <View style={styles.Txtview}>
        <View style={styles.projectContainer}>
          <Text style={styles.projectTxt}>When to buy</Text>
        </View>
        <View><Text>:</Text></View>
        <View style={styles.nameContainer}>
          <Text style={styles.nameTxt}>{props?.detail?.appointment_date === '' ||
            props?.detail?.appointment_date === undefined || props?.detail?.appointment_date === null ?
            strings.notfount :
            moment(props?.detail?.appointment_date).format(DATE_FORMAT)}</Text>
        </View>
      </View>
      <View style={styles.Txtview}>
        <View style={styles.projectContainer}>
          <Text style={styles.projectTxt}>Configuration</Text>
        </View>
        <View><Text>:</Text></View>
        <View style={styles.nameContainer}>
          <Text style={styles.nameTxt}>{props?.detail?.configuration === '' ||
            props?.detail?.configuration === undefined || props?.detail?.configuration === null ?
            strings.notfount : props?.detail?.configuration}</Text>
        </View>
      </View>
      <View style={styles.Txtview}>
        <View style={styles.projectContainer}>
          <Text style={styles.projectTxt}>Site Visit Date Time</Text>
        </View>
        <View><Text>:</Text></View>
        <View style={styles.nameContainer}>
          <Text style={styles.nameTxt}>{props?.detail?.appointment_date === '' || props?.detail?.appointment_date === undefined ?
            strings.notfount : moment(props?.detail?.appointment_date).format(DATE_FORMAT)}
            <Text style={styles.nameTxt}>
              {props?.detail?.appointment_time === '' || props?.detail?.appointment_time === undefined ?
                strings.notfount : " " + props?.detail?.appointment_time}
            </Text>
          </Text>
        </View>
      </View>
      <View style={styles.Txtview}>
        <View style={styles.projectContainer}>
          <Text style={styles.projectTxt}>Property</Text>
        </View>
        <View><Text>:</Text></View>
        <View style={styles.nameContainer}>
          <Text style={styles.nameTxt}>{props?.detail?.property_title === '' ||
            props?.detail?.property_title === undefined || props?.detail?.property_title === null ?
            strings.notfount : props?.detail?.property_title}</Text>
        </View>
      </View>
      <View style={styles.Txtview}>
        <View style={styles.projectContainer}>
          <Text style={styles.projectTxt}>Status</Text>
        </View>
        <View><Text>:</Text></View>
        <View style={styles.nameContainer}>
          <Text style={styles.nameTxt}>{props?.detail?.status === 1 ? 'Pending' :
            props?.detail?.status === 2 ? 'Confirm' :
              props?.detail?.status === 3 ? 'Complete' : 'Appointment cancel'}</Text>
        </View>
      </View>
      <View style={styles.Txtview}>
        <View style={styles.projectContainer}>
          <Text style={styles.projectTxt}>Appointment Create by</Text>
        </View>
        <View><Text>:</Text></View>
        <View style={styles.nameContainer}>
          <Text style={styles.nameTxt}>{props?.detail?.create_by === '' ||
            props?.detail?.create_by === undefined || props?.detail?.create_by === null ?
            strings.notfount : props?.detail?.create_by}</Text>
        </View>
      </View>
      <View style={styles.Txtview}>
        <View style={styles.projectContainer}>
          <Text style={styles.projectTxt}>Pickup</Text>
        </View>
        <View><Text>:</Text></View>
        <View style={styles.nameContainer}>
          <Text style={styles.nameTxt}>{props?.detail?.pickup === '' ||
            props?.detail?.pickup === undefined || props?.detail?.pickup === null ?
            strings.notfount : props?.detail?.pickup}</Text>
        </View>
      </View>
      <View style={styles.Txtview}>
        <View style={styles.projectContainer}>
          <Text style={styles.projectTxt}>Pickup Location</Text>
        </View>
        <View><Text>:</Text></View>
        <View style={styles.nameContainer}>
          <Text style={styles.nameTxt}>{props?.detail?.pickup_location === '' ||
            props?.detail?.pickup_location === undefined || props?.detail?.pickup_location === null ?
            strings.notfount : props?.detail?.pickup_location}</Text>
        </View>
      </View>
      <View style={styles.Txtview}>
        <View style={styles.projectContainer}>
          <Text style={styles.projectTxt}>Drop up Location</Text>
        </View>
        <View><Text>:</Text></View>
        <View style={styles.nameContainer}>
          <Text style={styles.nameTxt}>{props?.detail?.drop_off_location === '' ||
            props?.detail?.drop_off_location === undefined || props?.detail?.drop_off_location === null ?
            strings.notfount : props?.detail?.drop_off_location}</Text>
        </View>
      </View>
      <View style={styles.Txtview}>
        <View style={styles.projectContainer}>
          <Text style={styles.projectTxt}>No. of Guest</Text>
        </View>
        <View><Text>:</Text></View>
        <View style={styles.nameContainer}>
          <Text style={styles.nameTxt}>{props?.detail?.number_of_guest === '' ||
            props?.detail?.number_of_guest === undefined || props?.detail?.number_of_guest === null ?
            strings.notfount :
            props?.detail?.number_of_guest}</Text>
        </View>
      </View>
    </ScrollView>
  )
}

export default AppointmentDtailsItem