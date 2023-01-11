import { View, TextInput, Image, TouchableOpacity, Text } from 'react-native';
import React from 'react';
import styles from './styles';
import { BLACK_COLOR, GRAY_LIGHT_COLOR } from '../utilities/constant';
import { normalizeHeight } from '../scaleFontSize';
import { RequiredStart } from '../utilities/GlobalFuncations';

const CommonInput = (props: any) => {
  const onSubmit = (e: any) => {
    const { text } = e;
  };

  return (
    <View>
      <View style={styles.inputHeadinView}>
        <Text style={[styles.inputHeadingText, {
          width: props.headingTextWidth
        }]}>{props.headingText}</Text>
        {props.require ? (<RequiredStart />) : null}
      </View>
      <View style={styles.mainContainer}>
        <TextInput
          style={[styles.input, {
            width: props.inputWidth,
            height: normalizeHeight(props.inputheight),
            textAlignVertical: 'top',
            top: props.topping,
            color: GRAY_LIGHT_COLOR
          }]}
          onChangeText={val => props.onChangeText(val)}
          onSubmitEditing={onSubmit}
          placeholder={
            props.placeholderText === '3675 9834 6012' || props.placeholderText === 'BNZAA2318JM' ?
            props.placeholderText : null}
          placeholderTextColor={BLACK_COLOR}
          secureTextEntry={props.isSecureText}
          autoCapitalize={'none'}
          editable={props.editable}
          multiline={props.multiline}
          keyboardType={props.keyboardtype}
          value={props.valueshow}
          maxLength={props.maxLength}
          onBlur={props.onBlur}
        />
        <TouchableOpacity
          onPress={props.handleInputBtnPress}
          disabled={!props.handleInputBtnPress}>
          <Image style={styles.rightImage} source={props.rightImgSrc} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CommonInput;
