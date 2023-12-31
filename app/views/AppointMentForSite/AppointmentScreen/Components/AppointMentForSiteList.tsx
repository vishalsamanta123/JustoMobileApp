import { View, Text, Image, TouchableOpacity, Linking } from 'react-native'
import React from 'react'
import styles from './Styles'
import images from '../../../../assets/images'
import strings from '../../../../components/utilities/Localization'
import { PURPLE_COLOR, CALL_COLOR, WHITE_COLOR, DATE_FORMAT, TIME_FORMAT, BLACK_COLOR, DATE_BY_DAY, GREEN_COLOR, YELLOW_COLOR, DATE_TIME_FORMAT } from '../../../../components/utilities/constant'
import Button from '../../../../components/Button'
import moment from 'moment'

const AppointMentForSiteList = (props: any) => {
  const currentDate = moment(new Date).format('YYYY-MM-DD, h:mm A')
  const appointmentdateTime = `${moment(props.items.appointment_date).format('YYYY-MM-DD')}, ${props.items.appointment_time}`
  console.log('props?.items?.status: ', props?.items?.status);

  return (
    <View style={styles.IteamView}>
      <View style={styles.Txtview}>
        <View style={styles.projectContainer}>
          <Text style={styles.projectTxt}>Site Visit Date</Text>
        </View>
        <View><Text>:</Text></View>
        <View style={styles.nameContainer}>
          <Text style={styles.nameTxt}>{
            props?.items?.appointment_date === '' || props?.items?.appointment_date === undefined ?
              strings.notfount : moment(props?.items?.appointment_date).format(DATE_BY_DAY)
          }<Text style={styles.nameTxt}>
              {props?.items?.appointment_time === '' || props?.items?.appointment_time === undefined ?
                strings.notfount : " " + props?.items?.appointment_time}
            </Text>
          </Text>
        </View>
      </View>
      <View style={styles.Txtview}>
        <View style={styles.projectContainer}>
          <Text style={styles.projectTxt}>Visitor Name</Text>
        </View>
        <View><Text>:</Text></View>
        <View style={styles.nameContainer}>
          <Text style={styles.nameTxt}>{props?.items?.customer_first_name}</Text>
        </View>
      </View>
      <View style={styles.Txtview}>
        <View style={styles.projectContainer}>
          <Text style={styles.projectTxt}>Lead No.</Text>
        </View>
        <View><Text>:</Text></View>
        <View style={styles.nameContainer}>
          <Text style={styles.nameTxt}>{props?.items?.lead_no}</Text>
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
          <Text
            style={[
              styles.nameTxt,
              {
                color:
                  props?.items?.status == 1
                    ? currentDate >= appointmentdateTime ? 'red' : 'red'
                    : props?.items?.status === 2
                      ? currentDate >= appointmentdateTime ? 'red' : YELLOW_COLOR
                      : props?.items?.status == 3
                        ? GREEN_COLOR
                        : props?.items?.status == 5
                          ? "red"
                          : props?.items?.status === 4 ? "red" : BLACK_COLOR
              },
            ]}
          >
            {
              props?.items?.status == 1
                ? currentDate >= appointmentdateTime ? 'Missed' : "Upcoming"
                : props?.items?.status === 2
                  ? currentDate >= appointmentdateTime ? 'Missed' : "Upcoming"
                  : props?.items?.status == 3
                    ? "Completed"
                    : props?.items?.status == 5
                      ? "Canceled"
                      : props?.items?.status === 4 && "Canceled"}
          </Text>
        </View>
      </View>
      <View style={styles.Txtview}>
        <View style={styles.projectContainer}>
          <Text style={styles.projectTxt}>Visit Score</Text>
        </View>
        <View><Text>:</Text></View>
        <View style={styles.nameContainer}>
          <Text style={styles.nameTxt}>{props?.items?.lead_score}</Text>
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <View style={{ flexDirection: 'row', alignItems: 'center', top: 8 }}>
          {props?.items?.status === 1 || props?.items?.status === 2 ?
            (<Button
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
            />)
            : null
          }
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
            handleBtnPress={() => {
              Linking?.openURL(
                `tel:${props.items?.mobile}`
              )
            }}
          />
        </View>
        <TouchableOpacity style={styles.Viewbutton}
          onPress={() => props.onPressView()}
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

export default AppointMentForSiteList