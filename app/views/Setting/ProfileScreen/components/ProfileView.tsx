import { View, Text, Image, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import images from "../../../../assets/images";
import { PRIMARY_THEME_COLOR } from "../../../../components/utilities/constant";
import strings from "../../../../components/utilities/Localization";
import styles from "./styles";
import Header from "../../../../components/Header";
import moment from "moment";
import { useSelector } from "react-redux";

const ProfileView = (props: any) => {
  const { data, HandleBackPress, handleEditProfilePress } = props;
  const allDetailsall = useSelector((state: any) => state.agentData);
  const [allDetails, setAllDetails] = useState<any>({});

  useEffect(() => {
    checkprofile();
  }, [allDetailsall]);

  const checkprofile = () => {
    if (allDetailsall?.response?.status === 200) {
      setAllDetails(allDetailsall?.response?.data);
    }
  };
  console.log(
    "allDetails?.profile_picture: ",
    allDetails?.base_url + allDetails?.profile_picture
  );

  return (
    <View style={styles.mainContainer}>
      <Header
        leftImageSrc={images.backArrow}
        headerText={data.heading}
        headerStyle={styles.headerStyle}
        RightFirstIconStyle={styles.leftImageIconStyle}
        leftImageIconStyle={styles.leftImageIconStyle}
        handleOnLeftIconPress={HandleBackPress}
        barStyle={"light-content"}
        statusBarColor={PRIMARY_THEME_COLOR}
      />
      <View style={styles.ProfileView}>
        <View style={styles.roleView}>
          <Text style={styles.CPtext}>
            {strings.userRole} : {allDetails?.role_title}
          </Text>
        </View>
        <View style={styles.userCardView}>
          <View style={styles.usernameWrap}>
            <Image
              style={styles.userImage}
              source={{
                uri: allDetails?.base_url + allDetails?.profile_picture,
              }}
            />
            <Text style={styles.userNameText}>
              {allDetails?.firstname?.toUpperCase() +
                " " +
                allDetails?.lastname?.toUpperCase()}
            </Text>
          </View>
          <TouchableOpacity
            style={styles.editImageWrap}
            onPress={handleEditProfilePress}
          >
            <Image style={styles.editIconImage} source={images.editIcon} />
          </TouchableOpacity>
        </View>
        <View style={styles.InformationView}>
          <View style={styles.fieldView}>
            <View style={styles.keyView}>
              <Text style={styles.keyText}>Name</Text>
            </View>
            <Text style={styles.colon}>:</Text>
            <View style={styles.valueView}>
              <Text style={styles.valueText}>
                {allDetails?.firstname?.toUpperCase() +
                  " " +
                  allDetails?.lastname?.toUpperCase()}
              </Text>
            </View>
          </View>
          <View style={styles.fieldView}>
            <View style={styles.keyView}>
              <Text style={styles.keyText}>Aadhar No.</Text>
            </View>
            <Text style={styles.colon}>:</Text>
            <View style={styles.valueView}>
              <Text style={styles.valueText}>{allDetails?.adhar_no}</Text>
            </View>
          </View>
          <View style={styles.fieldView}>
            <View style={styles.keyView}>
              <Text style={styles.keyText}>Pancard No.</Text>
            </View>
            <Text style={styles.colon}>:</Text>
            <View style={styles.valueView}>
              <Text style={styles.valueText}>{allDetails?.pancard_no} </Text>
            </View>
          </View>
          <View style={styles.fieldView}>
            <View style={styles.keyView}>
              <Text style={styles.keyText}>Gender</Text>
            </View>
            <Text style={styles.colon}>:</Text>
            <View style={styles.valueView}>
              <Text style={styles.valueText}>
                {allDetails?.gender === 1 ? strings.male : strings.female}
              </Text>
            </View>
          </View>
          <View style={styles.fieldView}>
            <View style={styles.keyView}>
              <Text style={styles.keyText}>Date of Birth</Text>
            </View>
            <Text style={styles.colon}>:</Text>
            <View style={styles.valueView}>
              <Text style={styles.valueText}>
                {moment(allDetails?.dateofbirth).format("DD/MM/YYYY")}
              </Text>
            </View>
          </View>
          <View style={styles.fieldView}>
            <View style={styles.keyView}>
              <Text style={styles.keyText}>Mobile No.</Text>
            </View>
            <Text style={styles.colon}>:</Text>
            <View style={styles.valueView}>
              <Text style={styles.valueText}>{allDetails?.mobile}</Text>
            </View>
          </View>
          <View style={styles.fieldView}>
            <View style={styles.keyView}>
              <Text style={styles.keyText}>What'sapp No</Text>
            </View>
            <Text style={styles.colon}>:</Text>
            <View style={styles.valueView}>
              <Text style={styles.valueText}>{allDetails?.whatsapp_no}</Text>
            </View>
          </View>
          <View style={styles.fieldView}>
            <View style={styles.keyView}>
              <Text style={styles.keyText}>Email</Text>
            </View>
            <Text style={styles.colon}>:</Text>
            <View style={styles.valueView}>
              <Text style={styles.valueText}>{allDetails?.email}</Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default ProfileView;
