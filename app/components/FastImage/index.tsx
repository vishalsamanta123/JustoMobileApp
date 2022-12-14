import { View, Text } from "react-native";
import React from "react";
import FastImage from "react-native-fast-image";

const FastImages = (props: any) => {
  const { source = {
    uri: "https://unsplash.it/400/400?image=1",
    headers: { Authorization: "someAuthToken" },
    priority: FastImage.priority.normal,
  }, style } = props;
  return (
    <>
      <FastImage
        style={style}
        source={source}
      />
    </>
  );
};

export default FastImages;
