import { View, Text, TouchableOpacity, Image, Linking } from "react-native";
import React from "react";
import styles from "./Styles";
import {
  BLACK_COLOR,
  CALL_COLOR,
  PURPLE_COLOR,
  WHITE_COLOR,
  YELLOW_COLOR,
} from "../../../../components/utilities/constant";
import images from "../../../../assets/images";
import Button from "../../../../components/Button";
import strings from "../../../../components/utilities/Localization";
import moment from "moment";

const LeadManagementItem = (props: any) => {
  return (
    <View style={styles.IteamView}>
      <View style={styles.Txtview}>
        <View style={styles.projectContainer}>
          <Text style={styles.projectTxt}>Visitor Name :</Text>
        </View>
        <View style={styles.nameContainer}>
          <Text style={styles.nameTxt}>{
            props?.items.first_name === null ? '' : props.items.first_name}</Text>
        </View>
      </View>
      <View style={styles.Txtview}>
        <View style={styles.projectContainer}>
          <Text style={styles.projectTxt}>Configuration :</Text>
        </View>
        <View style={styles.nameContainer}>
          <Text style={styles.nameTxt}>{props.items.configuration ?
            props.items.configuration : strings.notfount
          }</Text>
        </View>
      </View>
      <View style={styles.Txtview}>
        <View style={styles.projectContainer}>
          <Text style={styles.projectTxt}>Budget :</Text>
        </View>
        <View style={styles.nameContainer}>
          <Text style={styles.nameTxt}>{
            props.items.min_rate || props.items.max_rate ?
              `${props.items.min_rate} ${props.items.min_rate_type} - ${props.items.max_rate} ${props.items.max_rate_type}`
              : strings.notfount
          }</Text>
        </View>
      </View>
      <View style={styles.Txtview}>
        <View style={styles.projectContainer}>
          <Text style={styles.projectTxt}>Last Interested :</Text>
        </View>
        <View style={styles.nameContainer}>
          <Text style={styles.nameTxt}>
            {props.items.last_interacted_date ?
              moment(props.items.last_interacted_date).format('llll') : strings.notfount}
          </Text>
        </View>
      </View>
      <View style={styles.Txtview}>
        <View style={styles.projectContainer}>
          <Text style={styles.projectTxt}>Source :</Text>
        </View>
        <View style={styles.nameContainer}>
          <Text style={styles.nameTxt}>{props.items.created_name ?
            props.items.created_name : strings.notfount}</Text>
        </View>
      </View>
      <View style={styles.Txtview}>
        <View style={styles.projectContainer}>
          <Text style={styles.projectTxt}>Visitor Score :</Text>
        </View>
        <View style={styles.nameContainer}>
          <Text style={styles.nameTxt}>{props.items.lead_score}</Text>
        </View>
      </View>
      <View style={styles.Txtview}>
        <View style={styles.projectContainer}>
          <Text style={styles.projectTxt}>Status :</Text>
        </View>
        <View style={styles.nameContainer}>
          <Text
            style={[
              styles.nameTxt,
              {
                color:
                  props.items.lead_status == 6 ? "red" : BLACK_COLOR
              },
            ]}
          >
            {props.items.lead_status === 1 ? "Create Lead" :
              props.items.lead_status === 2 ? "Follow-up" :
                props.items.lead_status === 3 ? "Appointment" :
                  props.items.lead_status === 4 ? "Booking" :
                    props.items.lead_status === 5 ? "Registration" :
                      props.items.lead_status === 6 ? "Close" :
                        props.items.lead_status === 7 && "Ready To Book"
            }
          </Text>
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <Button
          width={85}
          height={30}
          bgcolor={null}
          bordercolor={CALL_COLOR}
          borderWidth={1}
          btnTxtcolor={CALL_COLOR}
          buttonText={strings.call}
          btnTxtsize={14}
          textTransform={null}
          border={10}
          handleBtnPress={() => {
            Linking?.openURL(
              `tel:${props?.items?.mobile}`
            )
          }}
        />
        {props.items.lead_status === 1 || props.items.lead_status === 2 || props.items.lead_status === 3 ?
          (<Button
            width={85}
            height={30}
            bgcolor={null}
            bordercolor={PURPLE_COLOR}
            borderWidth={1}
            btnTxtcolor={PURPLE_COLOR}
            buttonText={strings.edit}
            btnTxtsize={14}
            textTransform={null}
            border={10}
            handleBtnPress={() => {
              props.handleEdit(props.items)
            }}
          />)
          : null
        }
        <TouchableOpacity style={styles.Viewbutton} onPress={() => props.onPressView(props.items)}>
          <Image
            source={images.forwardArrow}
            style={styles.arrow}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default LeadManagementItem;
