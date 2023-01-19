import React, { useEffect, useState } from 'react';
import { View, Text, useWindowDimensions, Image, TouchableOpacity, Linking } from 'react-native';
import images from '../../../../assets/images';
import Header from '../../../../components/Header';
import { PRIMARY_THEME_COLOR, PRIMARY_THEME_COLOR_DARK, TABBAR_COLOR } from '../../../../components/utilities/constant';
import strings from '../../../../components/utilities/Localization';
import styles from './styles';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import SmInfoView from './SMInfo';
import StatsView from './StatsViews';
import Button from '../../../../components/Button';
import { useSelector } from 'react-redux';

const SMDetailsView = (props: any) => {
    const [SMdetail, setSMdetail] = useState([])
    const { response = {}, detail = '' } = useSelector((state: any) => state.SourcingManager)
    useEffect(() => {
        if (response && response?.status === 200) {
            if (response?.data?.length > 0) {
                setSMdetail(response?.data[0] ? response?.data[0] : []);
            }

        } else {
            setSMdetail([]);
            //errorToast(response.message);
        }
    }, [response])

    const layout = useWindowDimensions();

    const [index, setIndex] = useState(0);
    const [routes] = useState([
        { key: 'first', title: 'Stats' },
        { key: 'second', title: 'SM Info' },
    ]);

    const renderTabBar = (props: any) => (
        <TabBar
            activeColor={TABBAR_COLOR}
            //inactiveColor={'#F4F4F4'} 
            {...props}
            indicatorStyle={{ borderWidth: 2, borderColor: TABBAR_COLOR }}
            style={{ backgroundColor: PRIMARY_THEME_COLOR_DARK }} />
    );
    const FirstRoute = () => (
        <StatsView items={SMdetail} handleCpAllocation={props.handleCpAllocationPress} />
    );

    const SecondRoute = () => (
        <SmInfoView items={SMdetail} handleCpAllocation={props.handleCpAllocationPress} />
    );
    const renderScene = SceneMap({
        first: FirstRoute,
        second: SecondRoute,
    });
    return (
        <View style={styles.mainContainer}>
            <Header
                leftImageSrc={images.backArrow}
                rightSecondImageScr={images.notification}
                headerText={strings.SMDetails}
                headerStyle={styles.headerStyle}
                RightFirstIconStyle={styles.leftImageIconStyle}
                leftImageIconStyle={styles.leftImageIconStyle}
                handleOnLeftIconPress={props.handleBackPress}
                statusBarColor={PRIMARY_THEME_COLOR}
                barStyle={'light-content'}
            />
            <View style={styles.topItemVw}>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => {
                        Linking?.openURL(
                            `tel:${props?.SMdetail?.mobile}`
                        )
                    }}
                >
                    <Text style={styles.buttonTxt}>Call</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => {
                        Linking?.openURL(
                            `sms:${props?.SMdetail?.mobile}`
                        )
                    }}
                >
                    <Text style={styles.buttonTxt}>SMS</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.propertyListView}>
                <TabView
                    renderTabBar={renderTabBar}
                    navigationState={{ index, routes }}
                    renderScene={renderScene}
                    onIndexChange={setIndex}
                    initialLayout={{ width: layout.width }}
                />
            </View>
            <View style={{ marginVertical: 12, alignItems: 'center', }}>
                <Button
                    width={150}
                    height={40}
                    btnTxtsize={16}
                    textTransform={null}
                    buttonText={strings.cpAllocation}
                    handleBtnPress={() => props.handleCpAllocationPress(SMdetail)}
                />
            </View>
        </View>
    )
}
export default SMDetailsView