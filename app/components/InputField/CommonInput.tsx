import { View, TextInput, Image, TouchableOpacity, Text } from 'react-native';
import React from 'react';
import styles from './styles';
import { BLACK_COLOR } from '../utilities/constant';
import { normalizeHeight } from '../scaleFontSize';

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
      </View>
      <View style={styles.mainContainer}>
        <TextInput
          style={[styles.input, {
            width: props.inputWidth,
            height: normalizeHeight(props.inputheight),
            textAlignVertical: 'top',
            top: props.topping
          }]}
          onChangeText={val => props.onChangeText(val)}
          onSubmitEditing={onSubmit}
          placeholder={props.placeholderText}
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
