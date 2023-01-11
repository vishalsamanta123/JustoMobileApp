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
  return (
    <ScrollView>
      <View style={styles.topDetailsView}>
        <View style={styles.topTxtView}>
          <Text style={styles.topTxt}>Visitor Score </Text>
          <Text style={styles.topTxt}>{item?.lead_score}</Text>
        </View>
        <Image
          source={
            item?.qr_code === '' || typeof item?.qr_code === undefined ?
              images.qrCode :
              { uri: item?.qr_code }
          }
          style={styles.qrImg}
        />
      </View>
      <View style={styles.Txtview}>
        <View style={styles.projectContainer}>
          <Text style={styles.projectTxt}>Visitor Name</Text>
        </View>
        <View><Text>:</Text></View>
        <View style={styles.nameContainer}>
          <Text style={styles.nameTxt}>{item?.customer_first_name ? item?.customer_first_name : strings.notfount}</Text>
        </View>
      </View>
      <View style={styles.Txtview}>
        <View style={styles.projectContainer}>
          <Text style={styles.projectTxt}>Budget</Text>
        </View>
        <View><Text>:</Text></View>
        <View style={styles.nameContainer}>
          <Text style={styles.nameTxt}>{
            item?.min_budget || item?.max_budget ?
              `${item?.min_budget} ${item?.min_budget_type} - ${item?.max_budget} ${item?.max_budget_type}`
              : strings.notfount
          }</Text>
        </View>
      </View>
      <View style={styles.Txtview}>
        <View style={styles.projectContainer}>
          <Text style={styles.projectTxt}>When to buy</Text>
        </View>
        <View><Text>:</Text></View>
        <View style={styles.nameContainer}>
          <Text style={styles.nameTxt}>{strings.notfount}</Text>
        </View>
      </View>
      <View style={styles.Txtview}>
        <View style={styles.projectContainer}>
          <Text style={styles.projectTxt}>Configuration</Text>
        </View>
        <View><Text>:</Text></View>
        <View style={styles.nameContainer}>
          <Text style={styles.nameTxt}>{item?.configuration ? item?.configuration : strings.notfount}</Text>
        </View>
      </View>
      <View style={styles.Txtview}>
        <View style={styles.projectContainer}>
          <Text style={styles.projectTxt}>Site Visit Date Time</Text>
        </View>
        <View><Text>:</Text></View>
        <View style={styles.nameContainer}>
          <Text style={styles.nameTxt}>{
            item?.appointment_date || item?.appointment_time ?
              `${moment(item?.appointment_date).format('DD-MM-YYYY')} ${item?.appointment_time}` :
              strings.notfount
          }</Text>
        </View>
      </View>
      <View style={styles.Txtview}>
        <View style={styles.projectContainer}>
          <Text style={styles.projectTxt}>Property</Text>
        </View>
        <View><Text>:</Text></View>
        <View style={styles.nameContainer}>
          <Text style={styles.nameTxt}>{item?.property_title ? item?.property_title : strings.notfount}</Text>
        </View>
      </View>
      <View style={styles.Txtview}>
        <View style={styles.projectContainer}>
          <Text style={styles.projectTxt}>Status</Text>
        </View>
        <View><Text>:</Text></View>
        <View style={styles.nameContainer}>
          <Text style={[styles.nameTxt, {
            color: item.status == 1 || item.status == 5 || item.status == 4 ? 'red' :
              item.status == 2 ? YELLOW_COLOR : BLACK_COLOR
          }]}>{
              // status: {//1= Panding, 2 = Confirm, 3= Compleat, 4 = Appointment cancel, 5= close}
              item.status === 1 ? 'Pending' :
                item.status === 2 ? 'Confirm' :
                  item.status === 3 ? 'Completed' :
                    item.status === 4 ? 'Appointment cancel' :
                      item.status == 5 && 'Close'
            }</Text>
        </View>
      </View>
      <View style={styles.Txtview}>
        <View style={styles.projectContainer}>
          <Text style={styles.projectTxt}>Appointment created by</Text>
        </View>
        <View><Text>:</Text></View>
        <View style={styles.nameContainer}>
          <Text style={styles.nameTxt}>{item?.create_by ? item?.create_by : strings.notfount}</Text>
        </View>
      </View>
      <View style={styles.Txtview}>
        <View style={styles.projectContainer}>
          <Text style={styles.projectTxt}>Pickup</Text>
        </View>
        <View><Text>:</Text></View>
        <View style={styles.nameContainer}>
          <Text style={styles.nameTxt}>{item?.pickup ? item?.pickup : strings.notfount}</Text>
        </View>
      </View>
      {item?.pickup === 'Yes' ?
        (
          <>
            <View style={styles.Txtview}>
              <View style={styles.projectContainer}>
                <Text style={styles.projectTxt}>Pickup Location</Text>
              </View>
              <View><Text>:</Text></View>
              <View style={styles.nameContainer}>
                <Text style={styles.nameTxt}>{item?.pickup_location ? item?.pickup_location : strings.notfount}</Text>
              </View>
            </View>
            <View style={styles.Txtview}>
              <View style={styles.projectContainer}>
                <Text style={styles.projectTxt}>Drop up Location</Text>
              </View>
              <View><Text>:</Text></View>
              <View style={styles.nameContainer}>
                <Text style={styles.nameTxt}>{item?.drop_off_location ? item?.drop_off_location : strings.notfount}</Text>
              </View>
            </View>
            <View style={styles.Txtview}>
              <View style={styles.projectContainer}>
                <Text style={styles.projectTxt}>No. of Guest</Text>
              </View>
              <View><Text>:</Text></View>
              <View style={styles.nameContainer}>
                <Text style={styles.nameTxt}>{item?.number_of_guest ? item?.number_of_guest : strings.notfount}</Text>
              </View>
            </View>
          </>
        )
        : null
      }
      <View style={{
        flexDirection: 'row',
        justifyContent: 'center',
        marginVertical: normalizeSpacing(20)
      }}>
        {
          item.status !== 5 &&
          (<Button
            width={150}
            height={30}
            bgcolor={WHITE_COLOR}
            bordercolor={PRIMARY_THEME_COLOR}
            borderWidth={1}
            btnTxtcolor={PRIMARY_THEME_COLOR}
            buttonText={strings.visitorupdate}
            btnTxtsize={14}
            border={10}
            handleBtnPress={() => props.handleVistorUpdate(item)}
          />)}
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
          handleBtnPress={() => props.handleViewFollowUp(item)}
        />
      </View>
    </ScrollView>
  )
}

export default AppointmentDtailsItem