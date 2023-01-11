import { View, Text, Image, Linking, TouchableOpacity } from 'react-native'
import React from 'react'
import styles from './styles'
import Button from 'app/components/Button'
import strings from 'app/components/utilities/Localization'
import { WHITE_COLOR, PRIMARY_THEME_COLOR, CALL_COLOR, PURPLE_COLOR, BLUE_COLOR, BLACK_COLOR } from 'app/components/utilities/constant'
import images from 'app/assets/images'

const SupportItem = (props: any) => {
  return (
    <View style={styles.IteamView}>
      <View style={styles.Txtview}>
        <View style={styles.projectContainer}>
          <Text style={styles.projectTxt}>Ticket :</Text>
        </View>
        <View style={styles.nameContainer}>
          <Text style={styles.nameTxt}>
            {props.items.ticket}
          </Text>
        </View>
      </View>
      <View style={styles.Txtview}>
        <View style={styles.projectContainer}>
          <Text style={styles.projectTxt}>Create By :</Text>
        </View>
        <View style={styles.nameContainer}>
          <Text style={styles.nameTxt}>
            {props.items.Createby}
            {/* {moment(props.items.appointment_date).format("DD-MM-YYYY")} */}
          </Text>
        </View>
      </View>
      <View style={styles.Txtview}>
        <View style={styles.projectContainer}>
          <Text style={styles.projectTxt}>Issue :</Text>
        </View>
        <View style={styles.nameContainer}>
          <Text style={styles.nameTxt}>
            {props.items.issue}
          </Text>
        </View>
      </View>
      <View style={styles.Txtview}>
        <View style={styles.projectContainer}>
          <Text style={styles.projectTxt}>Date :</Text>
        </View>
        <View style={styles.nameContainer}>
          <Text style={styles.nameTxt}>
            {props.items.date}
          </Text>
        </View>
      </View>
      <View style={styles.Txtview}>
        <View style={styles.projectContainer}>
          <Text style={styles.projectTxt}>Status :</Text>
        </View>
        <View style={styles.nameContainer}>
          <Text style={styles.nameTxt}>
            {props.items.status}
          </Text>
        </View>
      </View>
      <View style={styles.buttonContainer}>
        {props.index === 0 ? (
          <>
            <Button
              width={120}
              height={30}
              bgcolor={WHITE_COLOR}
              bordercolor={BLUE_COLOR}
              borderWidth={1}
              btnTxtcolor={BLUE_COLOR}
              buttonText={strings.updatestatus}
              btnTxtsize={14}
              border={10}
            // handleBtnPress={() => {}}
            />
            <Button
              width={120}
              height={30}
              bgcolor={WHITE_COLOR}
              bordercolor={BLACK_COLOR}
              borderWidth={1}
              btnTxtcolor={BLACK_COLOR}
              buttonText={strings.escalate}
              btnTxtsize={14}
              border={10}
            // handleBtnPress={() => {}}
            />
          </>
        )
          :
          (
            <Button
              width={120}
              height={30}
              bgcolor={WHITE_COLOR}
              bordercolor={PURPLE_COLOR}
              borderWidth={1}
              btnTxtcolor={PURPLE_COLOR}
              buttonText={strings.edit}
              btnTxtsize={14}
              border={10}
              handleBtnPress={() => {
                Linking.openURL(
                  `tel:${props.items?.mobile}`
                )
              }}
            />
          )
        }
        <TouchableOpacity style={styles.Viewbutton}
          onPress={() => props.onPressView(props.items)}
        >
          <Image
            source={images.forwardArrow}
            style={styles.arrow}
          />
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default SupportItem