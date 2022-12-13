import { View, Text } from "react-native";
import React from "react";
import PropertyChatView from "./components/PropertyChatView";

const PropertyChat = ({ navigation, route }: any) => {
  const { property, userName } = route.params;
  console.log("route: ", route);
  const handleBackPress = () => {
    navigation.goBack();
  };
  return (
    <PropertyChatView
      chatData={route.params}
      handleBackPress={handleBackPress}
    />
  );
};

export default PropertyChat;
