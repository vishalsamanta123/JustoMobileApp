import React from "react";
import { View, Text, TouchableOpacity, Image } from 'react-native';
import styles from "./styles";
import { BLACK_COLOR, GRAY_COLOR, GRAY_LIGHT_COLOR } from "../../../../components/utilities/constant";
import { ScrollView } from "react-native-gesture-handler";
import images from "../../../../assets/images";
import strings from "../../../../components/utilities/Localization";

const SMInfoView = (props: any) => {
    const item = props?.items || {}
    const allocate_cp = item?.allocate_cp?.length > 0 ? item?.allocate_cp : []
    return (
        <ScrollView>
            <View style={styles.Txtview}>
                <View style={styles.projectContainer}>
                    <Text style={styles.projectTxt}>Agent Name</Text>
                </View>
                <View><Text>:</Text></View>
                <View style={styles.nameContainer}>
                    <Text style={styles.nameTxt}>{item.user_name}</Text>
                </View>
            </View>
            <View style={styles.Txtview}>
                <View style={styles.projectContainer}>
                    <Text style={styles.projectTxt}>Aadhar no.</Text>
                </View>
                <View><Text>:</Text></View>
                <View style={styles.nameContainer}>
                    <Text style={styles.nameTxt}>{item.adhar_no}</Text>
                </View>
            </View>
            <View style={styles.Txtview}>
                <View style={styles.projectContainer}>
                    <Text style={styles.projectTxt}>Pan Card no.</Text>
                </View>
                <View><Text>:</Text></View>
                <View style={styles.nameContainer}>
                    <Text style={styles.nameTxt}>{item.pancard_no}</Text>
                </View>
            </View>
            <View style={styles.Txtview}>
                <View style={styles.projectContainer}>
                    <Text style={styles.projectTxt}>Location</Text>
                </View>
                <View><Text>:</Text></View>
                <View style={styles.nameContainer}>
                    <Text style={styles.nameTxt}>{item.area}</Text>
                </View>
            </View>
            <View style={styles.Txtview}>
                <View style={styles.projectContainer}>
                    <Text style={styles.projectTxt}>Email</Text>
                </View>
                <View><Text>:</Text></View>
                <View style={styles.nameContainer}>
                    <Text style={styles.nameTxt}>{item.email}</Text>
                </View>
            </View>
            <View style={styles.Txtview}>
                <View style={styles.projectContainer}>
                    <Text style={styles.projectTxt}>Mobile no</Text>
                </View>
                <View><Text>:</Text></View>
                <View style={styles.nameContainer}>
                    <Text style={styles.nameTxt}>{item.mobile}</Text>
                </View>
            </View>
            <View style={styles.Txtview}>
                <View style={styles.projectContainer}>
                    <Text style={styles.projectTxt}>Whatsapp no.</Text>
                </View>
                <View><Text>:</Text></View>
                <View style={styles.nameContainer}>
                    <Text style={styles.nameTxt}>{item.whatsapp_no}</Text>
                </View>
            </View>
            <View style={[styles.Txtview, styles.allocatsVw]}>
                <Text style={[styles.projectTxt, { color: BLACK_COLOR }]}>Allocated CP</Text>
            </View>
            <View style={styles.allocatsBox}>
                {allocate_cp?.length > 0 ?
                    <>
                        {allocate_cp?.map((item: any, index: any) => {
                            return (
                                <View style={styles.innerBoxVw}>
                                    <Text style={{color: GRAY_LIGHT_COLOR}}>{item.user_name}</Text>
                                    <TouchableOpacity>
                                        <Image
                                            source={images.close}
                                            style={styles.crossVw}
                                        />
                                    </TouchableOpacity>
                                </View>
                            )
                        })}
                    </> : <Text style={styles.noSelectedTxt}>{strings.noCpSelected}</Text>
                }
            </View>
        </ScrollView>
    )
}
export default SMInfoView