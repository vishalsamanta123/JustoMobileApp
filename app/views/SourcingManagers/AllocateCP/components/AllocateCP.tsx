import { View, Text, Image, TextInput, FlatList, TouchableOpacity } from 'react-native';
import images from '../../../../assets/images';
import Header from '../../../../components/Header';
import { Checkbox } from 'react-native-paper';
import { BLACK_COLOR, GRAY_COLOR, GRAY_LIGHT_COLOR, PRIMARY_THEME_COLOR, WHITE_COLOR } from '../../../../components/utilities/constant';
import styles from './styles';
import Button from '../../../../components/Button';
import strings from '../../../../components/utilities/Localization';
import AllocateCPDetails from '../components/AllocateDetails'
import { ScrollView } from 'react-native-gesture-handler';

const AllocateCPView = (props: any) => {
    return (
        <View style={styles.mainContainer}>
            <Header
                headerText={strings.cpAllocation}
                headerStyle={styles.headerStyle}
                headerTextStyle={styles.headerTextStyle}
                leftImageSrc={images.backArrow}
                rightSecondImageScr={images.notification}
                RightSecondIconStyle={{ tintColor: WHITE_COLOR }}
                leftImageIconStyle={{ tintColor: WHITE_COLOR }}
                handleOnLeftIconPress={props.onPressBack}
                barStyle={'light-content'}
                statusBarColor={PRIMARY_THEME_COLOR}
            />
            <ScrollView style={styles.containerVw}>
                <Text style={styles.headerTxt}>{strings.newAllocateTxt}</Text>
                <View style={styles.selectedBox}>
                    {props?.selectedCp?.length > 0 ?
                        <>
                            {props?.selectedCp?.map((item: any, index: any) => {
                                return (
                                    <View style={[styles.innerBoxVw, { justifyContent: 'flex-start' }]}>
                                        <Text style={{color: GRAY_LIGHT_COLOR}}>{item.cpName}</Text>
                                        <TouchableOpacity onPress={() => props.handleDelete(item, index)}>
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
                <TextInput
                    placeholder={strings.search}
                    placeholderTextColor={BLACK_COLOR}
                    style={styles.searchInputVw}
                    onFocus={() => props.setAllList(true)}
                    onChangeText={(text: any) => props.handleSearch(text)}
                />
                {props.allList ?
                    <FlatList
                        data={props.cpList}
                        renderItem={({ item, index }: any) => {
                            const getSelected =
                                props?.selectedCp?.length === 0
                                    ? ""
                                    : props?.selectedCp?.map(({ cpName }: any) => cpName);
                            return (
                                <View
                                    style={styles.innerBoxVwlist}>
                                    <Text style={styles.innerBoxVwlistfont}>{item.cpName}</Text>
                                    <TouchableOpacity onPress={() => !getSelected?.toString()
                                                ?.includes(item.cpName)
                                                ? props.handleSelects(item) : console.log('')}
                                        style={styles.checkBoxVw}>
                                        <Image
                                            style={styles.checksVw}
                                            source={getSelected?.toString()
                                                ?.includes(item.cpName)
                                                ? images.check
                                                : null
                                            }
                                        />
                                    </TouchableOpacity>
                                </View>
                            )
                        }}
                    /> : null
                }

               
            </ScrollView>
              <View style={styles.btncontener}>
                <Button
                    width={150}
                    height={40}
                    btnTxtsize={16}
                    buttonText={strings.cpAllocation}
                    textTransform={null}
                    handleBtnPress={() => props.handleAddTarget()}
                />
            </View>
            <AllocateCPDetails
                Visible={props.CPDetails}
                setIsVisible={props.setCPDetails}
                handleAddTarget={() => props.setCPDetails(false)}
            />
        </View>
    )
}
export default AllocateCPView;