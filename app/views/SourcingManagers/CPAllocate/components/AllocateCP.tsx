import { View, Text, Image, TextInput, FlatList, TouchableOpacity } from 'react-native';
import images from '../../../../assets/images';
import Header from '../../../../components/Header';
import { Checkbox } from 'react-native-paper';
import { BLACK_COLOR, GRAY_COLOR, GREEN_COLOR, PRIMARY_THEME_COLOR, RED_COLOR, WHITE_COLOR } from '../../../../components/utilities/constant';
import styles from './styles';
import Button from '../../../../components/Button';
import strings from '../../../../components/utilities/Localization';
import AllocateCPDetails from './AllocateDetails'
import { ScrollView } from 'react-native-gesture-handler';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import ErrorMessage from 'app/components/ErrorMessage';
import { useNavigation } from '@react-navigation/native';

const AllocateCPView = (props: any) => {





    const navigation: any = useNavigation();
    const { response = {}, allocated } =
    useSelector((state: any) => state.propertyData) || [];
    // useEffect(() => {
    //     if(response.status === 200) {
    //       ErrorMessage({
    //         msg: response.message,
    //         backgroundColor: GREEN_COLOR
    //       })
    //     } else {
    //       ErrorMessage({
    //         msg: response.message,
    //         backgroundColor: RED_COLOR
    //       })
    //     }
    //   }, [allocated])

      useEffect(() => {
        let ordersData = props?.selectedCp?.map((data : any) => {
        
          return data?._id
         }
        );

        console.log('ordersData: ', ordersData);
        props.setSelectedLoginIdCp(ordersData)
    
      }, [props.selectedCp]);

    return (
        <View style={styles.mainContainer}>
            <Header
                headerText={strings.allocation}
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
            <View style={styles.containerVw}>
                <Text style={styles.headerTxt}>{strings.newAllocateTxt}</Text>
                <View style={styles.selectedBox}>
                    {props?.selectedCp?.length > 0 ?
                        <>

                                                        
                            {props?.selectedCp?.map((item: any, index: any) => {
                            console.log('item: ', item._id);
                            
                        /*    var arrayLoginID: any[] = [...props.selectedLoginIdCp];
                            
                            console.log('arrayLoginID: ', arrayLoginID);
                            arrayLoginID.push(item?._id);
                            props.setSelectedLoginIdCp(arrayLoginID);  */
                              
                              //props.setSelectedLoginIdCp([...props.selectedLoginIdCp,item._id])

                                return (
                                    <View style={[styles.innerBoxVw, { justifyContent: 'flex-start' }]}>
                                        <Text>{item.agent_name}</Text>
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
                                    : props?.selectedCp?.map(({ agent_name }: any) => agent_name);
                            return (
                                <View
                                    style={styles.innerBoxVwlist}>
                                    <Text style={styles.innerBoxVwlistfont}>{item.agent_name}</Text>
                                    <TouchableOpacity onPress={() => !getSelected?.toString()
                                                ?.includes(item.agent_name)
                                                ? props.handleSelects(item) : console.log('')}
                                        style={styles.checkBoxVw}>
                                        <Image
                                            style={styles.checksVw}
                                            source={getSelected?.toString()
                                                ?.includes(item.agent_name)
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
               
            </View>
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