import { View, Text } from 'react-native'
import React from 'react'
import { Dropdown } from 'react-native-element-dropdown';
import styles from './styles';
import { dropdownData } from '../utilities/DemoData';
import { normalize, normalizeHeight } from '../scaleFontSize';
import { RequiredStart } from '../utilities/GlobalFuncations';

const DropdownInput = (props: any) => {
    const {
        inputWidth = '100%',
        inputheight = 50,
        paddingLeft = 0,
        require = false
    } = props
    const renderItem = (item: any) => {
        return (
            <View style={styles.item}>
                <Text style={styles.textItem}>{item.label}</Text>
            </View>
        );
    };
    return (
        <View>
            <View style={styles.inputHeadinView}>
                <Text numberOfLines={1} style={styles.inputHeadingText}>{props.headingText}</Text>
                {require ? (<RequiredStart />) : null}
            </View>
            <View style={styles.mainContainer}>
                <Dropdown
                    style={[styles.dropdown, {
                        width: inputWidth,
                        height: normalizeHeight(inputheight),
                        paddingLeft: normalize(paddingLeft),
                    }]}
                    itemTextStyle={{ fontSize: 10 }}
                    itemContainerStyle={props.itemContainerStyle}
                    placeholderStyle={styles.placeholderStyle}
                    selectedTextStyle={props.selectedTextStyle ? props.selectedTextStyle : styles.selectedTextStyle}
                    iconStyle={styles.iconStyle}
                    data={props.data ? props.data : dropdownData}
                    maxHeight={props.maxHeight ? props.maxHeight : 300}
                    labelField={props.labelField ? props.labelField : "label"}
                    valueField={props.valueField ? props.valueField : "value"}
                    placeholder={props.placeholder}
                    disable={props.disable}
                    value={props.value}
                    onChange={(item) => {
                        props.onChange(item);
                    }}
                    onFocus={props.onFocus}
                    renderItem={props.newRenderItem ? props.newRenderItem : renderItem}
                />
            </View>
        </View>
    )
}

export default DropdownInput