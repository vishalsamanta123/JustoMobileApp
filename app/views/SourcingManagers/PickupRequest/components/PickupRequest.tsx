import React, { useState } from "react";
import { View, Text, FlatList } from "react-native";
import images from "../../../../assets/images";
import Header from "../../../../components/Header";
import { PRIMARY_THEME_COLOR } from "../../../../components/utilities/constant";
import strings from "../../../../components/utilities/Localization";
import styles from "./styles";
import PickupRequestsList from "./PickupRequestsList";
import FilterModal from "../../../../components/Modals/FilterModal";
import EmptyListScreen from "app/components/CommonScreen/EmptyListScreen";
import UpdateStatusModal from "./UpdateStatusModal";

const PickupRequestView = (props: any) => {
  const [isVisible, setIsVisible] = useState(false);
  return (
    <View style={styles.mainContainer}>
      <Header
        leftImageSrc={images.menu}
        // rightFirstImageScr={images.filter}
        rightSecondImageScr={images.notification}
        headerText={strings.PickuprequestHeader}
        handleOnLeftIconPress={props.handleDrawerPress}
        handleOnRightFirstIconPress={() => props.setFilterisVisible(true)}
        headerStyle={styles.headerStyle}
        RightFirstIconStyle={styles.RightFirstIconStyle}
        barStyle={"light-content"}
        statusBarColor={PRIMARY_THEME_COLOR}
      />
      <View style={styles.propertyListView}>
        <FlatList
          data={props?.DATA}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <PickupRequestsList setIsVisible={setIsVisible} items={item} />
          )}
          onRefresh={() => props.onRefresh()}
          refreshing={false}
          ListEmptyComponent={() => (
            <EmptyListScreen message={strings.PickuprequestHeader} />
          )}
        />
      </View>
      <FilterModal
        Visible={props.filterisVisible}
        setIsVisible={props.setFilterisVisible}
      />
      <UpdateStatusModal
        Visible={isVisible}
        setIsVisible={() => setIsVisible(false)}
        // setDropLocation={setDropLocation}
        // handleDropLocation={handleDropLocation}
      />
    </View>
  );
};
export default PickupRequestView;
