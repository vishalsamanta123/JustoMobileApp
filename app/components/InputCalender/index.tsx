import { View, TextInput, Image, TouchableOpacity, Text } from 'react-native';
import React, { useState } from 'react';
import styles from '../InputField/styles';
import { BLACK_COLOR } from '../utilities/constant';
import images from '../../assets/images';
import { normalizeHeight } from '../scaleFontSize';
import DatePicker from 'react-native-date-picker'
import moment from 'moment';
import { RequiredStart } from '../utilities/GlobalFuncations';

const InputCalender = (props: any) => {
  const minDate: any = moment().subtract(18, "years")
  const [open, setOpen] = useState(false)
  const onConfirmDate = (date: any) => {
    setOpen(false)
    props.setDateshow(date)
    props.dateData(date)
  }

  const {
    inputWidth = '90%',
    editable = true,
    multiline = false,
    inputheight = 50,

  } = props
  const onSubmit = (e: any) => {
    const { text } = e;
  };


  const OpenCalender = () => {
    setOpen(true)
  }
  return (
    <View>
      <View style={styles.inputHeadinView}>
        <Text style={styles.inputHeadingText}>{props.headingText}</Text>
        {props.require ? (<RequiredStart />) : null}
      </View>
      <View style={styles.mainContainer}>
        <TextInput
          style={[styles.input, {
            width: inputWidth,
            height: normalizeHeight(inputheight),
            textAlignVertical: 'top',
            color: BLACK_COLOR
          }]}
          onChangeText={val => props.onChangeText(val)}
          onSubmitEditing={onSubmit}
          placeholder={props.placeholderText === 'Date of Birth' ? "" :
            props.placeholderText}
          placeholderTextColor={BLACK_COLOR}
          secureTextEntry={props.isSecureText}
          autoCapitalize={'none'}
          editable={editable}
          multiline={multiline}
          value={props?.value}
        />
        <TouchableOpacity
          onPress={() => OpenCalender()}
        //disabled={!props.handleInputBtnPress}
        >
          <Image style={styles.rightImage} source={props.leftIcon} />
        </TouchableOpacity>
      </View>
      {props.mode == 'date' ?
        (<DatePicker
          modal={true}
          mode={'date'}
          minimumDate={props?.minimumDate ? props?.minimumDate : ''}
          maximumDate={props.headingText === 'Date of Birth' ||
            props.placeholderText === 'Date of Birth'
            ?
            new Date(moment(minDate).format()) :
            props.maximumDate ? props.maximumDate : ''}
          open={open}
          date={props.headingText === 'Date of Birth' ||
            props.placeholderText === 'Date of Birth'
            ?
            new Date(moment(minDate).format()) :
            new Date()}
          onDateChange={(date) => {
            props.setDateshow(date)
          }}
          onConfirm={(date) => onConfirmDate(date)}
          onCancel={() => {
            setOpen(false)
          }}
        />)
        :
        (<DatePicker
          modal={true}
          mode={'time'}
          open={open}
          date={new Date()}
          onDateChange={(date) => {
            props.setDateshow(date)
          }}
          onConfirm={(date) => {
            onConfirmDate(date)
          }}
          onCancel={() => {
            setOpen(false)
          }}
        />)
      }

    </View>
  );
};

export default InputCalender;
