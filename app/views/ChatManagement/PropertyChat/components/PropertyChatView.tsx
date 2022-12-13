import { View, Text, TouchableOpacity, Image } from "react-native";
import React, { useState } from "react";
import Header from "app/components/Header";
import images from "app/assets/images";
import styles from "./styles";
import { PRIMARY_THEME_COLOR } from "app/components/utilities/constant";
import { FlatList } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import SearchBar from "app/components/SearchBar";
import strings from "app/components/utilities/Localization";
import EmptyListScreen from "app/components/CommonScreen/EmptyListScreen";

const PropertyChatView = (props: any) => {
  const {handleBackPress, chatData} = props
  const navigation: any = useNavigation()
  const [filteredData, setFilteredData] = useState(chatData.userName);
  console.log('chatData: ', chatData);
  const handleChatPress = (item: any) =>{
  console.log('item: in CHAT PRESS ', item);
    console.log('hellooo')
    navigation.navigate('ChatScreen', item)
  }
  const renderPropertyList = (item: any) => {
    console.log("item: ", item);
    return (
        <TouchableOpacity onPress={() => handleChatPress(item)} style={styles.chatListView}>
          <Text style={styles.userText}>{item}</Text>
          <Image
            source={images.rightArrow}
            style={styles.iconStyle}
          />
        </TouchableOpacity>
    );
  };
  const handleChangeText = (val: any) => {
    console.log("val: ", val);
    const final = chatData.userName?.filter(function (el: any) {
      const name = `${el}`;
      return name?.toLowerCase().indexOf(val.toLowerCase()) > -1;
    });
    setFilteredData(final);
  };
  const onSubmit = (val: any) => {
    console.log("onSubmit");
  };
  return (
    <View style={styles.mainContainer}>
      <Header
        leftImageSrc={images.backArrow}
        // rightFirstImageScr={images.filter}
        // rightSecondImageScr={images.notification}
        headerText={chatData.property}
        leftImageIconStyle={styles.leftImageIconStyle}
        handleOnLeftIconPress={handleBackPress}
        headerStyle={styles.headerStyle}
        RightFirstIconStyle={styles.RightFirstIconStyle}
        statusBarColor={PRIMARY_THEME_COLOR}
        barStyle={"light-content"}
      />
      <SearchBar
        placeholderText={strings.searchProperty}
        onChangeText={handleChangeText}
        onSubmit={onSubmit}
      />
      <FlatList
        data={filteredData}
        renderItem={(item) => renderPropertyList(item.item)}
        ListEmptyComponent={<EmptyListScreen message={strings.user} />}

      />
    </View>
  );
};

export default PropertyChatView;
