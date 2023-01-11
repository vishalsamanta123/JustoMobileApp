import React from "react";
import RecoveryView from "./components/RecoveryView";

const RecoveryScreen = ({ navigation }: any) => {
  const DATA = [
    {
      bookingDate: "12/2/1223",
      customerName: "Alexendra daddario",
      bookingStatus: "Recovery",
      configuration: "1BHK",
      budget: "2 Lac",
      area: "1500",
      propertyName: "Goregaon Lifts",
      visitorName: "Rajeev Kumar",
      source: "XYZ",
      closingDate: "11/02/20019 11:09 AM",
    },
    {
      bookingDate: "12/2/1223",
      customerName: "Alexendra daddario",
      bookingStatus: "Recovery",
      configuration: "1BHK",
      budget: "2 Lac",
      area: "1500",
      propertyName: "Goregaon Lifts",
      visitorName: "Rajeev Kumar",
      source: "XYZ",
      closingDate: "11/02/20019 11:09 AM",
    },
    {
      bookingDate: "12/2/1223",
      customerName: "Alexendra daddario",
      bookingStatus: "Recovery",
      configuration: "1BHK",
      budget: "2 Lac",
      area: "1500",
      propertyName: "Goregaon Lifts",
      visitorName: "Rajeev Kumar",
      source: "XYZ",
      closingDate: "11/02/20019 11:09 AM",
    },
    {
      bookingDate: "12/2/1223",
      customerName: "Alexendra daddario",
      bookingStatus: "Recovery",
      configuration: "1BHK",
      budget: "2 Lac",
      area: "1500",
      propertyName: "Goregaon Lifts",
      visitorName: "Rajeev Kumar",
      source: "XYZ",
      closingDate: "11/02/20019 11:09 AM",
    },
  ];
  const onPressView = (data: any) => {
    console.log("data: ", data);
    navigation.navigate("RecoveryDetails" , data);
  };
  const handleDrawerPress = () => {
    navigation.toggleDrawer();
  };
  return (
    <>
      <RecoveryView
        handleDrawerPress={handleDrawerPress}
        DATA={DATA}
        onPressView={onPressView}
      />
    </>
  );
};

export default RecoveryScreen;
