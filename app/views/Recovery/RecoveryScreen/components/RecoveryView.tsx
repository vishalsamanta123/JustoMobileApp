import { View, Text, FlatList } from "react-native";
import React from "react";
import styles from "./styles";
import Header from "app/components/Header";
import images from "app/assets/images";
import strings from "app/components/utilities/Localization";
import { PRIMARY_THEME_COLOR } from "app/components/utilities/constant";
import ComingSoonScreen from "app/components/CommonScreen/ComingSoon";
import RecoveryListIem from "./RecoveryListIem";
import EmptyListScreen from "app/components/CommonScreen/EmptyListScreen";

const RecoveryView = (props: any) => {
  return (
    <View style={styles.mainContainer}>
      <Header
        leftImageSrc={images.menu}
        // rightFirstImageScr={images.filter}
        // rightSecondImageScr={images.notification}
        headerText={strings.recoveryHeader}
        handleOnLeftIconPress={props.handleDrawerPress}
        headerStyle={styles.headerStyle}
        RightFirstIconStyle={styles.RightFirstIconStyle}
        statusBarColor={PRIMARY_THEME_COLOR}
        barStyle={"light-content"}
      />
      <ComingSoonScreen />
      {/* <View style={styles.listView}>
                <FlatList
                    data={Array.isArray(props.DATA) ? props.DATA : []}
                    showsVerticalScrollIndicator={false}
                    ListEmptyComponent={<EmptyListScreen message={strings.appointmentHeader} />}
                    renderItem={({ item }) =>
                        <RecoveryListIem
                            items={item}
                            onPressView={props.onPressView}
                        />}
                    refreshing={false}
                    onRefresh={() => {
                    }}
                    onEndReached={() => {
                    }}
                />
            </View> */}
    </View>
  );
};

export default RecoveryView;
