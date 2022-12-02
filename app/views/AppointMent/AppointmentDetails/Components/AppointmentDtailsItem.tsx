import { View, Text, ScrollView, Image } from 'react-native'
import React from 'react'
import styles from './Styles'
import images from '../../../../assets/images'
import moment from 'moment'
import { YELLOW_COLOR, BLACK_COLOR, PRIMARY_THEME_COLOR, WHITE_COLOR } from 'app/components/utilities/constant'
import strings from 'app/components/utilities/Localization'
import Button from 'app/components/Button'
import { normalizeSpacing } from 'app/components/scaleFontSize'

const AppointmentDtailsItem = (props: any) => {
  const item = props?.item || {}
  console.log('item: ', item);
  return (
    <ScrollView>
      <View style={styles.topDetailsView}>
        <View style={styles.topTxtView}>
          <Text style={styles.topTxt}>Visitor Score </Text>
          <Text style={styles.topTxt}>{item?.lead_score}</Text>
        </View>
        <Image
          source={images.qrCode}
          style={styles.qrImg}
        />
      </View>
      <View style={styles.Txtview}>
        <View style={styles.projectContainer}>
          <Text style={styles.projectTxt}>Visitor Name</Text>
        </View>
        <View><Text>:</Text></View>
        <View style={styles.nameContainer}>
          <Text style={styles.nameTxt}>{item?.customer_first_name}</Text>
        </View>
      </View>
      <View style={styles.Txtview}>
        <View style={styles.projectContainer}>
          <Text style={styles.projectTxt}>Budget</Text>
        </View>
        <View><Text>:</Text></View>
        <View style={styles.nameContainer}>
          <Text style={styles.nameTxt}>{
            `${item?.min_budget} ${item?.min_budget_type} - ${item?.max_budget} ${item?.max_budget_type}`
          }</Text>
        </View>
      </View>
      <View style={styles.Txtview}>
        <View style={styles.projectContainer}>
          <Text style={styles.projectTxt}>When to buy</Text>
        </View>
        <View><Text>:</Text></View>
        <View style={styles.nameContainer}>
          <Text style={styles.nameTxt}></Text>
        </View>
      </View>
      <View style={styles.Txtview}>
        <View style={styles.projectContainer}>
          <Text style={styles.projectTxt}>Configratiohn</Text>
        </View>
        <View><Text>:</Text></View>
        <View style={styles.nameContainer}>
          <Text style={styles.nameTxt}>{item?.configuration}</Text>
        </View>
      </View>
      <View style={styles.Txtview}>
        <View style={styles.projectContainer}>
          <Text style={styles.projectTxt}>Site Visit Date Time</Text>
        </View>
        <View><Text>:</Text></View>
        <View style={styles.nameContainer}>
          <Text style={styles.nameTxt}>{
            `${moment(item?.appointment_date).format('DD-MM-YYYY')} ${item?.appointment_time}`
          }</Text>
        </View>
      </View>
      <View style={styles.Txtview}>
        <View style={styles.projectContainer}>
          <Text style={styles.projectTxt}>Property</Text>
        </View>
        <View><Text>:</Text></View>
        <View style={styles.nameContainer}>
          <Text style={styles.nameTxt}>{item?.property_title}</Text>
        </View>
      </View>
      <View style={styles.Txtview}>
        <View style={styles.projectContainer}>
          <Text style={styles.projectTxt}>Status</Text>
        </View>
        <View><Text>:</Text></View>
        <View style={styles.nameContainer}>
          <Text style={[styles.nameTxt, {
            color: item.status == 1 ? 'red' :
              item.status == 2 ? YELLOW_COLOR : BLACK_COLOR
          }]}>{
              item.status === 1 ? 'Pending' :
                item.status === 2 ? 'Confirm' : 'Completed'
            }</Text>
        </View>
      </View>
      <View style={styles.Txtview}>
        <View style={styles.projectContainer}>
          <Text style={styles.projectTxt}>Appointment Craete by</Text>
        </View>
        <View><Text>:</Text></View>
        <View style={styles.nameContainer}>
          <Text style={styles.nameTxt}>{item?.create_by}</Text>
        </View>
      </View>
      <View style={styles.Txtview}>
        <View style={styles.projectContainer}>
          <Text style={styles.projectTxt}>Pickup</Text>
        </View>
        <View><Text>:</Text></View>
        <View style={styles.nameContainer}>
          <Text style={styles.nameTxt}>{item?.pickup}</Text>
        </View>
      </View>
      <View style={styles.Txtview}>
        <View style={styles.projectContainer}>
          <Text style={styles.projectTxt}>Pickup Location</Text>
        </View>
        <View><Text>:</Text></View>
        <View style={styles.nameContainer}>
          <Text style={styles.nameTxt}>{item?.pickup_location}</Text>
        </View>
      </View>
      <View style={styles.Txtview}>
        <View style={styles.projectContainer}>
          <Text style={styles.projectTxt}>Drop up Location</Text>
        </View>
        <View><Text>:</Text></View>
        <View style={styles.nameContainer}>
          <Text style={styles.nameTxt}>{item?.drop_off_location}</Text>
        </View>
      </View>
      <View style={styles.Txtview}>
        <View style={styles.projectContainer}>
          <Text style={styles.projectTxt}>No. of Guest</Text>
        </View>
        <View><Text>:</Text></View>
        <View style={styles.nameContainer}>
          <Text style={styles.nameTxt}>{item?.number_of_guest}</Text>
        </View>
      </View>
      <View style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: normalizeSpacing(20)
      }}>
        <Button
          width={150}
          height={30}
          bgcolor={WHITE_COLOR}
          bordercolor={PRIMARY_THEME_COLOR}
          borderWidth={1}
          btnTxtcolor={PRIMARY_THEME_COLOR}
          buttonText={strings.visitorupdate}
          btnTxtsize={14}
          border={10}
          handleBtnPress={() => props.handleVistorUpdate()}
        />
        <Button
          width={150}
          height={30}
          bgcolor={WHITE_COLOR}
          bordercolor={PRIMARY_THEME_COLOR}
          borderWidth={1}
          btnTxtcolor={PRIMARY_THEME_COLOR}
          buttonText={strings.viewfollowup}
          btnTxtsize={14}
          border={10}
          handleBtnPress={() => props.handleUpdateStatus()}
        />
      </View>
    </ScrollView>
  )
}

export default AppointmentDtailsItem