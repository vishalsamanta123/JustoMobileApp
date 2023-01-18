import { View, Text, Image } from "react-native";
import React, { useRef } from "react";
import Header from "../../../../components/Header";
import images from "../../../../assets/images";
import {
  BLACK_COLOR,
  PRIMARY_THEME_COLOR,
  WHITE_COLOR,
} from "../../../../components/utilities/constant";
import styles from "./styles";
import Button from "../../../../components/Button";
import strings from "../../../../components/utilities/Localization";
import Share from "react-native-share";

const SeparateLinkView = (props: any) => {
  const { data, handleBackPress, response } = props;
  console.log("response: ", response);

  const shareQRCode = async () => {
    const options = {
      message: "HEllO",
      url: response.qr_code,
    };
    const shareResponse = await Share.open(options);
  };
  return (
    <View style={styles.mainContainer}>
      <Header
        leftImageSrc={images.backArrow}
        rightSecondImageScr={images.notification}
        headerText={data.heading}
        headerStyle={styles.headerStyle}
        RightFirstIconStyle={styles.leftImageIconStyle}
        leftImageIconStyle={styles.leftImageIconStyle}
        handleOnLeftIconPress={handleBackPress}
        barStyle={"light-content"}
        statusBarColor={PRIMARY_THEME_COLOR}
      />
      <View style={styles.warp}>
        {response?.qr_code === "" ? (
          <Image style={styles.qrcodeImage} source={images.qrCode} />
        ) : (
          <Image style={styles.qrcodeImage} source={{ uri: response.qr_code }} />
        )}
      </View>
      <View style={styles.btnCopyLinkView}>
        {response?.qr_code === "" ? (
          <View
            style={{
              alignItems: "center",
            }}
          >
            <Text style={styles.notFoundText}>{strings.qrNotFound}</Text>
          </View>
        ) : (
          <Button
            handleBtnPress={() => {
              shareQRCode();
            }}
            width={300}
            btnTxtcolor={BLACK_COLOR}
            btnTxtsize={15}
            bgcolor={WHITE_COLOR}
            buttonText={strings.shareQr}
            textTransform={"uppercase"}
          />
        )}
      </View>
    </View>
  );
};

export default SeparateLinkView;
