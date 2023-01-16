import { View, Text, Image, Share } from "react-native";
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

const SeparateLinkView = (props: any) => {
  const { data, handleBackPress, response } = props;
  console.log("response: ", response);
  let myQRCode: any = useRef();

  const shareQRCode = () => {
    myQRCode.toDataURL((dataURL: any) => {
      console.log(dataURL);
      // let shareImageBase64 = {
      //   title: 'React Native',
      //   url: response?.qrcode,
      //   subject: 'Share Link', //  for email
      // };
      // Share.share(shareImageBase64).catch((error) => console.log(error));
    });
  };
  // let shareImageBase64 = {
  //   title: 'React Native',
  //   url: response?.qrcode,
  //   subject: 'Share Link', //  for email
  // };
  // const options = {
  //   title: 'QR',
  //   url: response?.qrcode,
  //   message: 'Hello',
  // };
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
        {response?.qrcode === "" ? (
          <Image style={styles.qrcodeImage} source={images.qrCode} />
        ) : (
          <Image style={styles.qrcodeImage} source={{ uri: response.qrcode }} />
        )}
      </View>
      <View style={styles.btnCopyLinkView}>
        {response?.qrcode === "" ? (
          <View
            style={{
              alignItems: "center",
            }}
          >
            <Text style={styles.notFoundText}>{strings.qrNotFound}</Text>
          </View>
        ) : (
          // <Button
          //   handleBtnPress={async () => {
          //     // await props.onSharePress();
          //     // shareQRCode();
          //   }}
          //   width={300}
          //   btnTxtcolor={BLACK_COLOR}
          //   btnTxtsize={15}
          //   bgcolor={WHITE_COLOR}
          //   buttonText={strings.shareQr}
          //   textTransform={"uppercase"}
          // />
          <></>
        )}
      </View>
    </View>
  );
};

export default SeparateLinkView;
