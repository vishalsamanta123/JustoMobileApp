import React, { useEffect, useState } from 'react';
import { View, Text, useWindowDimensions, Image } from 'react-native';
import images from '../../../../assets/images';
import Header from '../../../../components/Header';
import { PRIMARY_THEME_COLOR, PRIMARY_THEME_COLOR_DARK, TABBAR_COLOR } from '../../../../components/utilities/constant';
import strings from '../../../../components/utilities/Localization';
import styles from './styles';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import CMInfoView from './CMInfo';
import StatsView from './StatsViews';
import Button from '../../../../components/Button';
import { useSelector } from 'react-redux';

const CMDetailsView = (props: any) => {
    const layout = useWindowDimensions();
    const [index, setIndex] = useState(0);
    const [routes] = useState([
        { key: 'first', title: 'Stats' },
        { key: 'second', title: 'CM Info' },
    ]);

    const renderTabBar = (props: any) => (
        <TabBar
            activeColor={TABBAR_COLOR}
            {...props}
            indicatorStyle={{ borderWidth: 2, borderColor: TABBAR_COLOR }}
            style={{ backgroundColor: PRIMARY_THEME_COLOR_DARK }} />
    );
    const FirstRoute = () => (
        <StatsView items={props?.CMdetail} />
    );
    const SecondRoute = () => (
        <CMInfoView items={props?.CMdetail} />
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
                headerText={strings.CMDetails}
                headerStyle={styles.headerStyle}
                RightFirstIconStyle={styles.leftImageIconStyle}
                leftImageIconStyle={styles.leftImageIconStyle}
                handleOnLeftIconPress={props.handleBackPress}
                statusBarColor={PRIMARY_THEME_COLOR}
                barStyle={'light-content'}
            />
            <View style={styles.topItemVw}>
                <Image
                    source={images.chat}
                    style={styles.topItemSty}
                />
                <Image
                    source={images.chat}
                    style={styles.topItemSty}
                />
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
        </View>
    )
}
export default CMDetailsView