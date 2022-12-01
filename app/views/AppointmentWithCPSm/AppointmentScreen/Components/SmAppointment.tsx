import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import styles from './Styles'
import images from '../../../../assets/images'
import strings from '../../../../components/utilities/Localization'
import Button from '../../../../components/Button'
import { PURPLE_COLOR, CALL_COLOR } from '../../../../components/utilities/constant'
import moment from 'moment'

const SmAppointment = (props: any) => {
  return (
    <View style={styles.IteamView}>
      <View style={styles.Txtview}>
        <View style={styles.projectContainer}>
          <Text style={styles.projectTxt}>Date :</Text>
        </View>
        <View style={styles.nameContainer}>
          <Text style={styles.nameTxt}>{moment(props.items.appointment_date).format('DD-MM-YYYY')}</Text>
        </View>
      </View>
      <View style={styles.Txtview}>
        <View style={styles.projectContainer}>
          <Text style={styles.projectTxt}>Appointment Type :</Text>
        </View>
        <View style={styles.nameContainer}>
          <Text style={styles.nameTxt}>{props.items.lead_source}</Text>
        </View>
      </View>
      <View style={styles.Txtview}>
        <View style={styles.projectContainer}>
          <Text style={styles.projectTxt}>Time :</Text>
        </View>
        <View style={styles.nameContainer}>
          <Text style={styles.nameTxt}>{props.items.appointment_time}</Text>
        </View>
      </View>
      <View style={styles.Txtview}>
        <View style={styles.projectContainer}>
          <Text style={styles.projectTxt}>Appointment With :</Text>
        </View>
        <View style={styles.nameContainer}>
          <Text style={styles.nameTxt}>{props.items.customer_first_name}</Text>
        </View>
      </View>
      <View style={styles.Txtview}>
        <View style={styles.projectContainer}>
          <Text style={styles.projectTxt}>Status :</Text>
        </View>
        <View style={styles.nameContainer}>
          <Text style={styles.nameTxt}>{
            props.items.status == 1 ? 'Pending' :
              props.items.status == 2 ? 'Confirm' :
                props.items.status == 3 ? 'Compleat' : 'Appoiment cancel'
          }</Text>
        </View>
      </View>

      <View style={[styles.buttonContainer, { justifyContent: props.items.Status !== 'Pending' ? 'flex-end' : 'space-between' }]}>

        {props.items.Status === 'Pending' ?
          (
            <Button
              width={80}
              height={30}
              bgcolor={null}
              bordercolor={PURPLE_COLOR}
              borderWidth={1}
              btnTxtcolor={PURPLE_COLOR}
              buttonText={strings.confirm}
              btnTxtsize={14}
              border={10}
            // handleBtnPress={() => props.onPressEdit()}
            />
          )
          : null
        }
        <TouchableOpacity style={styles.Viewbutton} onPress={() => props.onPressView(props.items)}>
          <Image
            source={images.forwardArrow}
            style={styles.arrow}
          />
        </TouchableOpacity>
      </View>

    </View>

  )
}

export default SmAppointment