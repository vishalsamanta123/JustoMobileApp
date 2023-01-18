
import { View, Text, Image, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import Modal from "react-native-modal";
import styles from "./styles";
import images from "../../../../assets/images";
import strings from "../../../../components/utilities/Localization";
import { Dropdown } from "react-native-element-dropdown";
import Button from "../../../../components/Button";
import InputField from "../../../../components/InputField";
import { GRAY_LIGHT_COLOR, MAP_KEY, PRIMARY_THEME_COLOR_DARK, WHITE_COLOR } from "../../../../components/utilities/constant";
import DropdownInput from "app/components/DropDown";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { normalize, normalizeSpacing, normalizeHeight } from "app/components/scaleFontSize";
import { ScrollView } from "react-native-gesture-handler";

const DropLocationModal = (props: any) => {
    return (
        <View>
            <Modal isVisible={props.Visible}>
                <View style={styles.bookingModelVw}>
                    <View style={styles.topContainer}>
                        <Text style={styles.topTxt}>{'Drop Location'}</Text>
                        <View>
                            <TouchableOpacity onPress={() => props.setIsVisible(false)}>
                                <Image source={images.close} style={styles.closeIcon} />
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={[styles.inputWrap, { marginVertical: 20 }]}>
                        <ScrollView contentContainerStyle={{ flexGrow: 1 }}
                            keyboardShouldPersistTaps={'handled'}>
                            <GooglePlacesAutocomplete
                                fetchDetails={true}
                                placeholder={strings.location}
                                textInputProps={{
                                    placeholderTextColor: PRIMARY_THEME_COLOR_DARK,
                                }}
                                styles={{
                                    textInputContainer: {
                                        borderWidth: 1.5,
                                        borderColor: PRIMARY_THEME_COLOR_DARK,
                                        borderRadius: normalize(8),
                                        paddingVertical: normalizeSpacing(5),
                                    },
                                    textInput: {
                                        height: normalizeHeight(30),
                                        color: PRIMARY_THEME_COLOR_DARK,
                                        fontSize: normalize(14),
                                    },
                                    predefinedPlacesDescription: {
                                        color: '#1faadb',
                                    },
                                }}
                                onPress={(data, details = null) => {
                                    props.setDropLocation(data?.description)
                                }}
                                filterReverseGeocodingByTypes={[
                                    'locality',
                                    'administrative_area_level_1',
                                ]}
                                nearbyPlacesAPI="GooglePlacesSearch"
                                query={{
                                    key: MAP_KEY,
                                    language: 'en',
                                    // types: '(cities)', //<=== use this to only show country cities
                                    components: 'country:in', // <=== use this to restrict to country
                                }}
                            />
                        </ScrollView>
                    </View>
                    <View style={{ marginVertical: 20 }}>
                        <Button
                            handleBtnPress={() => {
                                props.setIsVisible(false)
                                props.handleDropLocation()
                            }}
                            buttonText={props.doneBttnTxt ? props.doneBttnTxt : strings.Confirm} />
                    </View>
                </View>
            </Modal>
        </View>
    );
};
export default DropLocationModal