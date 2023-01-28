import { View, Text, FlatList, Image, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import images from "app/assets/images";
import EmptyListScreen from "app/components/CommonScreen/EmptyListScreen";
import FastImages from "app/components/FastImage";
import { PRIMARY_THEME_COLOR } from "app/components/utilities/constant";
import strings from "app/components/utilities/Localization";
import styles from "./styles";
import Header from "app/components/Header";
import SearchBar from "app/components/SearchBar";

const AddChatView = (props: any) => {
    const [filteredData, setFilteredData] = useState([]);
    useEffect(() => {
      setFilteredData(props.chatlist)
    }, [props.chatlist])
    const navigation: any = useNavigation();
    const handleChatPress = (item: any) => {
      navigation.navigate("ChatScreen", item);
    };
    const handleChangeText = (val: any) => {
      const final = props?.chatlist?.filter(function (el: any) {
        const name = `${el.user_name}`;
        return name?.toLowerCase().indexOf(val.toLowerCase()) > -1;
      });
      setFilteredData(final);
    };
    const onSubmit = (val: any) => {};
    const renderChatList = (item: any) => {
      const role =
        item?.roles === "Sourcing TL"
          ? "TL"
          : item?.roles === "Sourcing Manager"
          ? "SM"
          : item?.roles === "Closing Manager"
          ? "CM"
          : item?.roles === "Closing TL"
          ? "CTL"
          : "Agent";
      return (
        <TouchableOpacity
          onPress={() => handleChatPress(item)}
          style={styles.chatListView}
        >
          <View style={styles.straight}>
            <FastImages
              source={{ uri: item.base_url + item.profile_picture }}
              style={styles.profileImage}
            />
            <Text style={styles.propertyText}>{`${item.user_name} (${role})`}</Text>
          </View>
          <Image source={images.rightArrow} style={styles.iconStyle} />
        </TouchableOpacity>
      );
    };
    return (
      <View style={styles.mainContainer}>
        <Header
          leftImageSrc={images.backArrow}
          rightSecondImageScr={images.notification}
          headerText={strings.addChatHeader}
          leftImageIconStyle={styles.RightFirstIconStyle}
          handleOnLeftIconPress={props.handleBackPress}
          headerStyle={styles.headerStyle}
          RightFirstIconStyle={styles.RightFirstIconStyle}
          statusBarColor={PRIMARY_THEME_COLOR}
          barStyle={"light-content"}
        />
        {/* <ComingSoonScreen /> */}
        <SearchBar
          placeholderText={strings.searchChat}
          onChangeText={handleChangeText}
          onSubmit={onSubmit}
        />
        <FlatList
          data={filteredData}
          renderItem={(item) => renderChatList(item.item)}
          ListEmptyComponent={<EmptyListScreen message={strings.chat} />}
          keyboardShouldPersistTaps
        />
      </View>
    );
};

export default AddChatView;
