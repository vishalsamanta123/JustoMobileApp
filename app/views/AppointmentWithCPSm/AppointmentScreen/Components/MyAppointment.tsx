import { View, Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import styles from './Styles'
import strings from '../../../../components/utilities/Localization'
import images from '../../../../assets/images'
import Button from '../../../../components/Button'
import { CALL_COLOR, PURPLE_COLOR } from '../../../../components/utilities/constant'

const MyAppointment = (props: any) => {
  return (


    <View style={styles.IteamView}>
      <View style={styles.Txtview}>
        <View style={styles.projectContainer}>
          <Text style={styles.projectTxt}>Date :</Text>
        </View>
        <View style={styles.nameContainer}>
          <Text style={styles.nameTxt}>{props.items.date}</Text>
        </View>
      </View>
      <View style={styles.Txtview}>
        <View style={styles.projectContainer}>
          <Text style={styles.projectTxt}>Appointment Type :</Text>
        </View>
        <View style={styles.nameContainer}>
          <Text style={styles.nameTxt}>{props.items.appointmentType}</Text>
        </View>
      </View>
      <View style={styles.Txtview}>
        <View style={styles.projectContainer}>
          <Text style={styles.projectTxt}>Time :</Text>
        </View>
        <View style={styles.nameContainer}>
          <Text style={styles.nameTxt}>{props.items.time}</Text>
        </View>
      </View>
      <View style={styles.Txtview}>
        <View style={styles.projectContainer}>
          <Text style={styles.projectTxt}>Appointment With :</Text>
        </View>
        <View style={styles.nameContainer}>
          <Text style={styles.nameTxt}>{props.items.appointmentWith}</Text>
        </View>
      </View>
     {/*  <View style={styles.Txtview}>
        <View style={styles.projectContainer}>
          <Text style={styles.projectTxt}>SM Name :</Text>
        </View>
        <View style={styles.nameContainer}>
          <Text style={styles.nameTxt}>{props.items.smName}</Text>
        </View>
      </View> */}
      <View style={styles.Txtview}>
        <View style={styles.projectContainer}>
          <Text style={styles.projectTxt}>Status :</Text>
        </View>
        <View style={styles.nameContainer}>
          <Text style={styles.nameTxt}>{props.items.status}</Text>
        </View>
      </View>


      <View style={styles.buttonContainer}>

        <Button
          width={80}
          height={30}
          bgcolor={null}
          bordercolor={PURPLE_COLOR}
          borderWidth={1}
          btnTxtcolor={PURPLE_COLOR}
          buttonText={strings.edit}
          btnTxtsize={14}
          border={10}
        // handleBtnPress={() => props.onPressEdit()}
        />


        <Button
          width={80}
          height={30}
          bgcolor={null}
          bordercolor={CALL_COLOR}
          borderWidth={1}
          btnTxtcolor={CALL_COLOR}
          buttonText={strings.call}
          btnTxtsize={14}
          border={10}
        // handleBtnPress={() => props.onPressAllFollowUp()}
        />
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

export default MyAppointment