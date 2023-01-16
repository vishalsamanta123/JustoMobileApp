import { View, Text } from "react-native";
import React, { useState } from "react";
import RecoveryDetailView from "./Components/RecoveryDetailView";

const RecoveryDetails = ({ navigation, route }: any) => {
  // const [status, setStatus] = useState(route?.params);
  const data = route?.params;
  const handleBackPress = () => {
    navigation.goBack();
  };
  return <RecoveryDetailView handleBackPress={handleBackPress} data={data} />;
};

export default RecoveryDetails;
