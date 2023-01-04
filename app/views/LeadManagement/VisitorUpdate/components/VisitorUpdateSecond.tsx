import React from "react";
import { View, Text, Image, TouchableOpacity, ScrollView } from 'react-native';
import styles from "./styles";
import TopScreensViewer from './TopScreensViewer'
import Header from "../../../../components/Header";
import images from "../../../../assets/images";
import strings from "../../../../components/utilities/Localization";
import { BLACK_COLOR, DATE_FORMAT, PRIMARY_THEME_COLOR } from "../../../../components/utilities/constant";
import InputField from "../../../../components/InputField";
import { RadioButton } from "react-native-paper";
import Button from "../../../../components/Button";
import { normalize, normalizeSpacing } from "../../../../components/scaleFontSize";
import InputCalender from "app/components/InputCalender";
import moment from "moment";
import { TextInput } from "react-native-gesture-handler";
import DropdownInput from "app/components/DropDown";
import Styles from '../../../../components/Modals/styles'

const VisitorUpdateView = (props: any) => {
    return (
        <View style={styles.mainContainer}>
            <Header
                leftImageSrc={images.backArrow}
                rightSecondImageScr={images.notification}
                headerText={strings.visitor + " " + strings.update}
                headerStyle={styles.headerStyle}
                RightFirstIconStyle={styles.leftImageIconStyle}
                leftImageIconStyle={styles.leftImageIconStyle}
                handleOnLeftIconPress={() => props.setScreenType(0)}
                barStyle={'light-content'}
                statusBarColor={PRIMARY_THEME_COLOR}
            />
            <View style={styles.noMoveVw}>
                {/* <TopScreensViewer type={props.screenType} /> */}
            </View>
            <ScrollView contentContainerStyle={styles.wrap}>
                <View style={styles.typeVw}>
                    <Text style={styles.typeTxt}>Property Required</Text>
                    <View style={styles.typeBorders} />
                </View>
                <View style={[styles.inputWrap, { marginTop: normalizeSpacing(16) }]}>
                    <DropdownInput
                        headingText={'Configuration'}
                        placeholder={props.updateForm?.configuration ?
                            props.updateForm?.configuration : 'Configuration'}
                        data={props?.masterDatas}
                        inputWidth={'100%'}
                        paddingLeft={16}
                        maxHeight={300}
                        labelField={"title"}
                        valueField={'_id'}
                        value={props?.updateForm?.configuration_id}
                        onChange={(item: any) => {
                            props.setUpdateForm({
                                ...props.updateForm,
                                configuration_id: item._id,
                                configuration: item.title
                            })
                        }}
                        newRenderItem={(item: any) => {
                            return (
                                <>
                                    <View style={Styles.item}>
                                        <Text style={Styles.textItem}>{item.title}</Text>
                                    </View>
                                </>
                            );
                        }}
                    />
                </View>
                <View style={styles.inputWrap}>
                    <InputCalender
                        leftIcon={images.event}
                        mode={"date"}
                        placeholderText={"Expected Possession Date"}
                        headingText={"Expected Possession Date"}
                        editable={false}
                        dateData={(data: any) => {
                            props.setUpdateForm({
                                ...props.updateForm,
                                expected_possession_date: moment(data).format(DATE_FORMAT),
                            });
                        }}
                        setDateshow={(data: any) => {
                            props.setUpdateForm({
                                ...props.updateForm,
                                expected_possession_date: moment(data).format(DATE_FORMAT),
                            });
                        }}
                        value={props?.updateForm?.expected_possession_date != "" ||
                            props?.updateForm?.expected_possession_date != undefined
                            ? moment(props?.updateForm?.expected_possession_date).format(DATE_FORMAT) :
                            ''
                        }
                    />
                </View>
                <View style={styles.inputWrap}>
                    <InputField
                        placeholderText={"Area(Sq ft.)"}
                        handleInputBtnPress={() => { }}
                        onChangeText={(text: any) => {
                            props.setUpdateForm({
                                ...props.updateForm,
                                areain_sqlft: text
                            })
                        }}
                        valueshow={props?.updateForm?.areain_sqlft?.toString()}
                        headingText={"Area(Sq ft.)"}
                        keyboardtype={'number-pad'}
                    />
                </View>
                <View style={styles.smallCont}>
                    <Text style={[styles.headingsTxt, { width: '55%' }]}>Min Budget</Text>
                    <Text style={[styles.headingsTxt, { width: '50%' }]}>Max Budget</Text>
                </View>
                <View style={styles.inputContVw}>
                    <TextInput
                        value={props?.updateForm?.min_budget?.toString()}
                        onChangeText={(data: any) => {
                            props.setUpdateForm({
                                ...props.updateForm,
                                min_budget: data
                            })
                        }}
                        keyboardType={'number-pad'}
                        placeholder='Min Budget'
                        style={styles.budgetInput} />
                    <TouchableOpacity
                        onPress={() => props.setUpdateForm({
                            ...props.formData,
                            min_budget_type: props?.updateForm?.min_budget_type === 'C' ? "L" : "C",
                        })}
                        style={styles.smallBox}>
                        <Text style={{ color: BLACK_COLOR }}>{props?.updateForm?.min_budget_type}</Text>
                    </TouchableOpacity>
                    <TextInput
                        value={props?.updateForm?.max_budget?.toString()}
                        onChangeText={(data: any) => {
                            props.setUpdateForm({
                                ...props.updateForm,
                                max_budget: data
                            })
                        }}
                        keyboardType={'number-pad'}
                        placeholder='Max Budget'
                        style={[styles.budgetInput, { marginLeft: 20 }]} />
                    <TouchableOpacity
                        onPress={() => props.setUpdateForm({
                            ...props.updateForm,
                            max_budget_type: props?.updateForm?.max_budget_type === "C" ? "L" : "C",
                        })}
                        style={styles.smallBox}>
                        <Text style={{ color: BLACK_COLOR }}>{props?.updateForm?.max_budget_type}</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.selectsView}>
                    <Text style={styles.selectsTxt}>{"Nature Of Fuding"}</Text>
                </View>
                <View style={styles.straightVw}>
                    <View style={[styles.radioView, { marginHorizontal: 0 }]}>
                        <RadioButton.Android
                            value={props.updateForm?.funding_type}
                            status={props.updateForm.funding_type === "loan" ? "checked" : "unchecked"}
                            onPress={() => props.setUpdateForm({
                                ...props.updateForm,
                                funding_type: 'loan'
                            })}
                            color={PRIMARY_THEME_COLOR}
                        />
                        <Text style={styles.checkTxt}>{'Loan'}</Text>
                    </View>
                    <View style={[styles.radioView, { marginHorizontal: 0 }]}>
                        <RadioButton.Android
                            value={props.updateForm?.funding_type}
                            status={props.updateForm.funding_type === "self" ? "checked" : "unchecked"}
                            onPress={() => props.setUpdateForm({
                                ...props.updateForm,
                                funding_type: 'self'
                            })}
                            color={PRIMARY_THEME_COLOR}
                        />
                        <Text style={styles.checkTxt}>{'Self Funding'}</Text>
                    </View>
                    <View style={[styles.radioView, { marginHorizontal: 0 }]}>
                        <RadioButton.Android
                            value={props.updateForm?.funding_type}
                            status={props.updateForm.funding_type === "both" ? "checked" : "unchecked"}
                            onPress={() => props.setUpdateForm({
                                ...props.updateForm,
                                funding_type: 'both'
                            })}
                            color={PRIMARY_THEME_COLOR}
                        />
                        <Text style={styles.checkTxt}>{'Both'}</Text>
                    </View>
                </View>
                <View style={styles.selectsView}>
                    <Text style={styles.selectsTxt}>{"Purpose"}</Text>
                </View>
                <View style={[styles.straightVw, { width: '80%' }]}>
                    <View style={[styles.radioView, { marginHorizontal: 0 }]}>
                        <RadioButton.Android
                            value={props.updateForm?.purpose}
                            status={props.updateForm.purpose === "end user" ? "checked" : "unchecked"}
                            onPress={() => props.setUpdateForm({
                                ...props.updateForm,
                                purpose: 'end user'
                            })}
                            color={PRIMARY_THEME_COLOR}
                        />
                        <Text style={styles.checkTxt}>{'End User'}</Text>
                    </View>
                    <View style={[styles.radioView, { marginHorizontal: 0 }]}>
                        <RadioButton.Android
                            value={props.updateForm?.purpose}
                            status={props.updateForm.purpose === "invest" ? "checked" : "unchecked"}
                            onPress={() => props.setUpdateForm({
                                ...props.updateForm,
                                purpose: 'invest'
                            })}
                            color={PRIMARY_THEME_COLOR}
                        />
                        <Text style={styles.checkTxt}>{'Investment'}</Text>
                    </View>
                </View>
            </ScrollView>
            <View style={styles.noMoveVw}>
                <Button
                    handleBtnPress={(type: any) => props.onPressNext(2)}
                    rightImage={images.forwardArrow}
                    buttonText={strings.next}
                    textTransform={"uppercase"}
                />
            </View>
        </View>
    )
}
export default VisitorUpdateView