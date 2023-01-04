import { View, Text, StatusBar } from 'react-native'
import React from 'react'
import { Isios, PRIMARY_THEME_COLOR, PRIMARY_THEME_COLOR_DARK, WHITE_COLOR } from '../../../../components/utilities/constant'
import Header from '../../../../components/Header'
import images from '../../../../assets/images'
import strings from '../../../../components/utilities/Localization'
import styles from './Styles'
import LeadDetailsIteam from './LeadDetailsIteam'
import Button from '../../../../components/Button'

const LeadDetailsView = (props: any) => {
  return (
    <View style={styles.mainContainer}>
      <Header
        leftImageSrc={images.backArrow}
        rightSecondImageScr={images.notification}
        headerText={strings.visitordetails}
        leftImageIconStyle={styles.RightFirstIconStyle}
        handleOnLeftIconPress={props.handleBackPress}
        headerStyle={styles.headerStyle}
        statusBarColor={PRIMARY_THEME_COLOR}
        barStyle={'light-content'}
      />
      <View style={styles.leadDetailsItemView}>
        <LeadDetailsIteam
          items={props?.allDetails}
        />
      </View>
      {props?.allDetails?.lead_status !== 6 ?
        <View style={[styles.btnContainer, { justifyContent: props?.allDetails?.lead_status === 3 ? 'center' : 'space-between' }]}>
          {props?.allDetails?.lead_status !== 3 ?
            (<Button
              buttonText={strings.ScheduleSitevisite}
              width={Isios ? 180 : 150}
              height={45}
              bgcolor={PRIMARY_THEME_COLOR_DARK}
              btnTxtcolor={WHITE_COLOR}
              btnTxtsize={12}
              textTransform={"uppercase"}
              handleBtnPress={() => props.handleScheduleVisit()}
            />) : null}
          <Button
            buttonText={strings.Statusupdate}
            width={150}
            height={45}
            bgcolor={PRIMARY_THEME_COLOR_DARK}
            btnTxtcolor={WHITE_COLOR}
            btnTxtsize={Isios ? 12 : 14}
            textTransform={"uppercase"}
            handleBtnPress={() => props.handleStatusUpdate()}
          />
        </View>
        : null
      }
    </View>
  )
}

export default LeadDetailsView