import { View, Text, StatusBar } from 'react-native'
import React from 'react'
import { BLACK_COLOR, Isios, PRIMARY_THEME_COLOR, PRIMARY_THEME_COLOR_DARK, WHITE_COLOR } from '../../../../components/utilities/constant'
import Header from '../../../../components/Header'
import images from '../../../../assets/images'
import strings from '../../../../components/utilities/Localization'
import styles from './Styles'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import LeadDetailsIteam from './LeadDetailsIteam'
import Button from '../../../../components/Button'

const LeadDetailsView = (props: any) => {
  const insets = useSafeAreaInsets();
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
      <View style={styles.btnContainer}>
        <Button
          buttonText={strings.ScheduleSitevisite}
          width={Isios ? 180 : 150}
          height={45}
          bgcolor={PRIMARY_THEME_COLOR_DARK}
          btnTxtcolor={WHITE_COLOR}
          btnTxtsize={12}
          textTransform={"uppercase"}
          handleBtnPress={() => props.handleScheduleVisit()}
        />
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
    </View>
  )
}

export default LeadDetailsView