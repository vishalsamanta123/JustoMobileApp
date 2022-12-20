import { View, Text, FlatList, TouchableOpacity, Image } from "react-native";
import React, { useState } from "react";
import styles from "./styles";
import Header from "app/components/Header";
import images from "app/assets/images";
import strings from "app/components/utilities/Localization";
import { PRIMARY_THEME_COLOR } from "app/components/utilities/constant";
import { useNavigation } from "@react-navigation/native";
import SearchBar from "app/components/SearchBar";
import EmptyListScreen from "app/components/CommonScreen/EmptyListScreen";
import FastImages from "app/components/FastImage";
import ComingSoonScreen from "app/components/CommonScreen/ComingSoon";

const ChatViewView = (props: any) => {
  const { DATA } = props;
  const [filteredData, setFilteredData] = useState(DATA);
  const navigation: any = useNavigation();
  const handleChatPress = (item: any) => {
    navigation.navigate("PropertyChat", item);
  };
  const handleChangeText = (val: any) => {
    const final = DATA?.filter(function (el: any) {
      const name = `${el.property}`;
      return name?.toLowerCase().indexOf(val.toLowerCase()) > -1;
    });
    setFilteredData(final);
  };
  const onSubmit = (val: any) => {
  };
  const renderPropertyList = (item: any) => {
    return (
      <TouchableOpacity
        onPress={() => handleChatPress(item)}
        style={styles.chatListView}
      >
        <View style={styles.straight}>
          <FastImages
            source={{ uri: item.image }}
            style={styles.profileImage}
          />
          <Text style={styles.propertyText}>{item.property}</Text>
        </View>
        <Image source={images.rightArrow} style={styles.iconStyle} />
      </TouchableOpacity>
    );
  };
  return (
    <View style={styles.mainContainer}>
      <Header
        leftImageSrc={images.menu}
        // rightFirstImageScr={images.filter}
        rightSecondImageScr={images.notification}
        headerText={strings.chatHeader}
        handleOnLeftIconPress={props.handleDrawerPress}
        headerStyle={styles.headerStyle}
        RightFirstIconStyle={styles.RightFirstIconStyle}
        statusBarColor={PRIMARY_THEME_COLOR}
        barStyle={"light-content"}
      />
      <ComingSoonScreen />
      {/* <SearchBar
        placeholderText={strings.searchProperty}
        onChangeText={handleChangeText}
        onSubmit={onSubmit}
      />
      <FlatList
        data={filteredData}
        renderItem={(item) => renderPropertyList(item.item)}
        ListEmptyComponent={<EmptyListScreen message={strings.propertyChat} />}
        keyboardShouldPersistTaps
      /> */}
    </View>
  );
};

export default ChatViewView;
