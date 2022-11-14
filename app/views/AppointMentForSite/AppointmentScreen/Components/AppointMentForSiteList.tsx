import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import styles from './Styles'
import images from '../../../../assets/images'
import strings from '../../../../components/utilities/Localization'
import { PURPLE_COLOR, CALL_COLOR, WHITE_COLOR } from '../../../../components/utilities/constant'
import Button from '../../../../components/Button'

const AppointMentForSiteList = (props: any) => {
  return (
    <View style={styles.IteamView}>
      <View style={styles.Txtview}>
        <View style={styles.projectContainer}>
          <Text style={styles.projectTxt}>Site Visit Date</Text>
        </View>
        <View><Text>:</Text></View>
        <View style={styles.nameContainer}>
          <Text style={styles.nameTxt}>{props?.items?.site_date + " " + props?.items?.time}</Text>
        </View>
      </View>
      <View style={styles.Txtview}>
        <View style={styles.projectContainer}>
          <Text style={styles.projectTxt}>Visitor Name</Text>
        </View>
        <View><Text>:</Text></View>
        <View style={styles.nameContainer}>
          <Text style={styles.nameTxt}>{props?.items?.visitor_name}</Text>
        </View>
      </View>
      <View style={styles.Txtview}>
        <View style={styles.projectContainer}>
          <Text style={styles.projectTxt}>Lead No.</Text>
        </View>
        <View><Text>:</Text></View>
        <View style={styles.nameContainer}>
          <Text style={styles.nameTxt}>{props?.items?.leadNo}</Text>
        </View>
      </View>
      <View style={styles.Txtview}>
        <View style={styles.projectContainer}>
          <Text style={styles.projectTxt}>Pickup</Text>
        </View>
        <View><Text>:</Text></View>
        <View style={styles.nameContainer}>
          <Text style={styles.nameTxt}>{props?.items?.pickup}</Text>
        </View>
      </View>
      <View style={styles.Txtview}>
        <View style={styles.projectContainer}>
          <Text style={styles.projectTxt}>Status</Text>
        </View>
        <View><Text>:</Text></View>
        <View style={styles.nameContainer}>
          <Text style={styles.nameTxt}>{props?.items?.status}</Text>
        </View>
      </View>
      <View style={styles.Txtview}>
        <View style={styles.projectContainer}>
          <Text style={styles.projectTxt}>Visit Score</Text>
        </View>
        <View><Text>:</Text></View>
        <View style={styles.nameContainer}>
          <Text style={styles.nameTxt}>{props?.items?.visit_score}</Text>
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Button
            width={80}
            height={30}
            bgcolor={WHITE_COLOR}
            bordercolor={PURPLE_COLOR}
            borderWidth={1}
            btnTxtcolor={PURPLE_COLOR}
            buttonText={strings.edit}
            btnTxtsize={14}
            border={10}
            handleBtnPress={() => props.onEditPress()}
          />
          <Button
            width={80}
            height={30}
            bgcolor={WHITE_COLOR}
            bordercolor={CALL_COLOR}
            borderWidth={1}
            btnTxtcolor={CALL_COLOR}
            buttonText={strings.call}
            btnTxtsize={14}
            border={10}
          />
        </View>
        <TouchableOpacity style={styles.Viewbutton} onPress={() => props.onPressView(props?.items)}>
          <Image
            source={images.forwardArrow}
            style={styles.arrow}
          />
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default AppointMentForSiteList