import {
  View,
  TextInput,
  Image,
  TouchableOpacity,
  Text,
  ScrollView,
} from "react-native";
import React from "react";
import styles from "./styles";
import {
  BLACK_COLOR,
  GRAY_COLOR,
  GRAY_LIGHT_COLOR,
  PRIMARY_THEME_COLOR_DARK,
} from "../utilities/constant";
import images from "../../assets/images";
import { normalizeHeight } from "../scaleFontSize";
import CommonInput from "./CommonInput";
import LocationInput from "./Location";

const InputField = (props: any) => {
  const {
    inputWidth = "90%",
    editable = true,
    multiline = false,
    inputheight = 50,
    keyboardtype = "default",
    topping = 2,
    inputType = "normal",
  } = props;
  const onSubmit = (e: any) => {
    const { text } = e;
  };

  return (
    <View>
      {inputType === "location" ? (
        <LocationInput
          editable={editable}
          headingText={props.headingText}
          headingTextWidth={props.headingTextWidth}
          onPressSelect={props.onPressSelect}
          placeholderText={props.placeholderText}
          valueshow={props.valueshow}
          onBlur={props.onBlur}
          textInputProps={props.textInputProps ? props.textInputProps : {
            placeholderTextColor: BLACK_COLOR,
            onChangeText: (val: any) => props.onChangeText(val),
            value: props.valueshow,
          }}
          handleInputBtnPress={props.handleInputBtnPress}
          rightImgSrc={props.rightImgSrc}
        />
      ) : (
        <CommonInput
          editable={editable}
          inputWidth={inputWidth}
          multiline={multiline}
          inputheight={inputheight}
          keyboardtype={keyboardtype}
          topping={topping}
          headingText={props.headingText}
          headingTextWidth={props.headingTextWidth}
          onChangeText={props.onChangeText}
          placeholderText={props.placeholderText}
          isSecureText={props.isSecureText}
          autoCapitalize={"none"}
          valueshow={props.valueshow}
          maxLength={props.maxLength}
          onBlur={props.onBlur}
          handleInputBtnPress={props.handleInputBtnPress}
          rightImgSrc={props.rightImgSrc}
        />
      )}
      {/* <View style={styles.inputHeadinView}>
        <Text style={styles.inputHeadingText}>{props.headingText}</Text>
      </View>
      <View style={styles.mainContainer}>
        <TextInput
          style={[styles.input, {
            width: inputWidth,
            height: normalizeHeight(inputheight),
            textAlignVertical: 'top',
            top: topping,
            color: GRAY_LIGHT_COLOR
          }]}
          onChangeText={val => props.onChangeText(val)}
          onSubmitEditing={onSubmit}
          placeholder={props.placeholderText}
          placeholderTextColor={BLACK_COLOR}
          secureTextEntry={props.isSecureText}
          autoCapitalize={'none'}
          editable={editable}
          multiline={multiline}
          keyboardType={keyboardtype}
          value={props.valueshow}
          maxLength={props.maxLength}
          onBlur={props.onBlur}
        />
        <TouchableOpacity
          onPress={props.handleInputBtnPress}
          disabled={!props.handleInputBtnPress}>
          <Image style={styles.rightImage} source={props.rightImgSrc} />
        </TouchableOpacity>
      </View> */}
    </View>
  );
};

export default InputField;
