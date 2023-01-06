import React, { useRef } from "react";
import { View, Text, Image, TouchableOpacity, ImageBackground } from 'react-native';
import images from "../../../assets/images";
import Header from "../../../components/Header";
import { PRIMARY_THEME_COLOR } from "../../../components/utilities/constant";
import strings from "../../../components/utilities/Localization";
import styles from "./styels";
import { RNCamera } from 'react-native-camera';

const ScanQrView = (props: any) => {
    const cameraRef: any = useRef()
    return (
        <View style={styles.mainContainer}>
            <Header
                leftImageSrc={images.backArrow}
                rightSecondImageScr={images.notification}
                headerText={strings.scanQrCode}
                leftImageIconStyle={styles.RightFirstIconStyle}
                handleOnLeftIconPress={props.handleBackPress}
                headerStyle={styles.headerStyle}
                barStyle={'light-content'}
                statusBarColor={PRIMARY_THEME_COLOR}
            />
            {/* <TouchableOpacity>
                <Image
                    source={images.qrCode}
                    style={{ width: '80%', height: '80%', alignSelf: 'center' }}
                    resizeMode={'contain'}
                />
            </TouchableOpacity> */}
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <RNCamera
                    ref={cameraRef}
                    style={{
                        flex: 1,
                        width: '100%',
                    }}
                    type={RNCamera.Constants.Type.back}
                    onGoogleVisionBarcodesDetected={({ barcodes }: any) => {
                        console.log(barcodes);
                        if(barcodes?.length > 0){
                            props.handleQrScan(barcodes[0]?.data)
                        }
                    }}
                    captureAudio={false}
                >


                </RNCamera>
            </View>
        </View>
    )
}
export default ScanQrView