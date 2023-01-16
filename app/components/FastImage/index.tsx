import { View, Text, ActivityIndicator } from "react-native";
import React, { useState } from "react";
import FastImage from "react-native-fast-image";
import images from "app/assets/images";
import { normalizeHeight, normalizeWidth } from "../scaleFontSize";

const FastImages = (props: any) => {
  const {
    source = '',
    width = normalizeWidth(70),
    height = normalizeHeight(70), 
  } = props;
    const [isLoading, setisLoading] = useState(false);
    
  return (
    <>
      <View
        style={[
          {
            height: height,
            width: width,
            borderRadius: 40,
            backgroundColor: 'gray',
            alignItems: 'center',
            justifyContent: 'center'
          },
          isLoading ? { alignItems: 'center', justifyContent: 'center' } : {},
        ]}>
        {isLoading && (
          <View
            style={{
              position: 'absolute',
              zIndex: 999,
            }}>
            <ActivityIndicator
              animating={isLoading}
              style={{
                height: 50,
                width: 50,
              }}
              color={'#fff'}
            />
          </View>
        )}
        {source && source != 'null' && typeof source !== 'number' ? (
          <FastImage
            source={{uri: source}}
            style={{
              height: height,
              width: width,
              borderRadius: 40,
            }}
            resizeMode={FastImage.resizeMode.cover}
            onLoadStart={() => setisLoading(true)}
            onLoadEnd={() => setisLoading(false)}
          />
        ) : (
          <FastImage
            source={images?.user}
            style={{
              height: height,
              width: width,
              borderRadius: 2,
            }}
            resizeMode={FastImage.resizeMode.cover}
            onLoadStart={() => setisLoading(true)}
            onLoadEnd={() => setisLoading(false)}
          />
        )}
      </View>
    </>
  );
};

export default FastImages;
