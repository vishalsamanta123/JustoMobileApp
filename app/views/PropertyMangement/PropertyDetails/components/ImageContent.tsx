import { View, Text, StatusBar, FlatList, Image, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import styles from "./styles";
import { PRIMARY_THEME_COLOR_DARK, WHITE_COLOR } from "../../../../components/utilities/constant";
import images from "../../../../assets/images";
import strings from "../../../../components/utilities/Localization";
import Header from "../../../../components/Header";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { normalizeHeight, normalizeSpacing, normalizeWidth } from "../../../../components/scaleFontSize";
import Modal from "react-native-modal";
import FastImages from "app/components/FastImage";


const ImageContent = ({ navigation, route }: any) => {
  const insets = useSafeAreaInsets();
  const { array, base_url } = route?.params || []
  const [isVisable, setIsVisable] = useState(false)
  const [onPressData, setOnPressData] = useState<any>({})

  const handleBackPress = () => {
    navigation.goBack();
  };
  return (
    <View style={styles.mainContainer}>
      <View
        style={{
          backgroundColor: PRIMARY_THEME_COLOR_DARK,
          height: insets.top,
        }}
      />
      <StatusBar barStyle={"light-content"} />
      <Header
        leftImageSrc={images.backArrow}
        rightSecondImageScr={images.notification}
        headerText={strings.imagecontentHeader}
        headerStyle={styles.headerStyle}
        RightFirstIconStyle={styles.leftImageIconStyle}
        leftImageIconStyle={styles.leftImageIconStyle}
        handleOnLeftIconPress={handleBackPress}
      />
      <View>
        {typeof array === 'string' ?
          <View style={{ padding: normalizeSpacing(10) }}>

            <Image
              source={{ uri: array }}

              style={{
                width: '100%',
                height: normalizeHeight(300),
                alignItems: 'center',
                justifyContent: 'center'
              }}
            />
          </View> :
          <FlatList data={array}
            numColumns={1}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
            }}
            renderItem={({ item }) => (
              <View style={{ padding: normalizeSpacing(10) }}>
                <TouchableOpacity onPress={() => {
                  setIsVisable(true)
                  setOnPressData(item)
                }}>
                  <FastImages
                    source={{ uri: base_url + item.document }}

                    style={{
                      width: '100%',
                      height: normalizeHeight(300),
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  />
                </TouchableOpacity>
              </View>
            )}
            ListFooterComponent={() => (
              <View style={{ height: normalizeHeight(100) }} />
            )}
          />}
      </View>
      <Modal
        isVisible={isVisable}
        onBackdropPress={() => setIsVisable(false)}
        onBackButtonPress={() => setIsVisable(false)}
      >
        <View>
          <FastImages
            source={{ uri: base_url + onPressData?.document }}
            style={{
              width: '100%',
              height: normalizeHeight(300),
              alignItems: 'center',
              justifyContent: 'center'
            }}
          />
        </View>
      </Modal>
    </View>
  );
};

export default ImageContent;
