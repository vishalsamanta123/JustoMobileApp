import { View, Text, useWindowDimensions, FlatList } from 'react-native'
import React, { useState } from 'react'
import styles from './styles'
import Header from 'app/components/Header'
import images from 'app/assets/images'
import strings from 'app/components/utilities/Localization'
import { PRIMARY_THEME_COLOR, PRIMARY_THEME_COLOR_DARK, TABBAR_COLOR } from 'app/components/utilities/constant'
import ComingSoonScreen from 'app/components/CommonScreen/ComingSoon'
import Button from 'app/components/Button'
import { SceneMap, TabBar, TabView } from 'react-native-tab-view'
import EmptyListScreen from 'app/components/CommonScreen/EmptyListScreen'
import SupportItem from './SupportItem'
import { useNavigation } from '@react-navigation/native'

const SupportView = (props: any) => {
    const [index, setIndex] = useState(0);
    const layout = useWindowDimensions();
    const navigation: any = useNavigation()

    const routes = [
        { key: "first", title: strings.supportrequest },
        { key: "second", title: strings.myticket },
    ];

    const onPressView = () => {
        navigation.navigate('SupportScreenDetails')
    }

    const renderTabBar = (props: any) => (
        <TabBar
            activeColor={TABBAR_COLOR}
            //inactiveColor={'#F4F4F4'}
            {...props}
            indicatorStyle={{ borderWidth: 2, borderColor: TABBAR_COLOR }}
            style={{ backgroundColor: PRIMARY_THEME_COLOR_DARK }}
        />
    );
    const FirstRoute = () => (
        <FlatList
            data={[
                {
                    ticket: strings.supportrequest,
                    Createby: 'ABC',
                    issue: 'payment',
                    date: '11/01/2023',
                    status: 'Pending'
                }
            ]}
            renderItem={({ item }) => (
                <SupportItem items={item} index={index} onPressView={onPressView} />
            )}
            ListEmptyComponent={
                <EmptyListScreen message={strings.supportrequest} />
            }
            //   onRefresh={() => {
            //     props.setFilterData({
            //       start_date: "",
            //       end_date: "",
            //       customer_name: "",
            //       status: "",
            //     });
            //     props.getAppointmentList(2);
            //   }}
            refreshing={false}
        />
        // <ComingSoonScreen />
    );

    const SecondRoute = () => (
        <FlatList
            data={[
                {
                    ticket: strings.myticket,
                    Createby: 'ABC',
                    issue: 'payment',
                    date: '11/01/2023',
                    status: 'Pending'
                }
            ]}
            renderItem={({ item }) => (
                <SupportItem items={item} index={index} onPressView={onPressView} />
            )}
            ListEmptyComponent={
                <EmptyListScreen message={strings.myticket} />
            }
            //   onRefresh={() => {
            //     props.setFilterData({
            //       start_date: "",
            //       end_date: "",
            //       customer_name: "",
            //       status: "",
            //     });
            //     props.getAppointmentList(props.role === 'TL'? 3 : 1);
            //   }}
            refreshing={false}
        />
        // <ComingSoonScreen />
    );

    const renderScene = SceneMap({
        first: FirstRoute,
        second: SecondRoute,
    });
    return (
        <View style={styles.mainContainer}>
            <Header
                leftImageSrc={images.menu}
                rightFirstImageScr={images.filter}
                rightSecondImageScr={images.notification}
                headerText={strings.supportHeader}
                handleOnLeftIconPress={props.handleDrawerPress}
                headerStyle={styles.headerStyle}
                RightFirstIconStyle={styles.RightFirstIconStyle}
                statusBarColor={PRIMARY_THEME_COLOR}
                barStyle={'light-content'}
            />
            <ComingSoonScreen />
            {/* <View style={{ marginVertical: 10, alignItems: "flex-end" }}>
                <Button
                    width={150}
                    height={30}
                    buttonText={strings.addticket}
                    btnTxtsize={14}
                    handleBtnPress={() => props.handleAddTicket()}
                />
            </View>
            <View style={{ flex: 1 }}>
                <TabView
                    renderTabBar={renderTabBar}
                    navigationState={{ index, routes }}
                    renderScene={renderScene}
                    onIndexChange={setIndex}
                    initialLayout={{ width: layout.width }}
                />
            </View> */}
        </View >
    )
}

export default SupportView