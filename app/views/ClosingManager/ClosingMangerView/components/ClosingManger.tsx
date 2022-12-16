import { FlatList, Text, View } from 'react-native';
import images from '../../../../assets/images';
import Button from '../../../../components/Button';
import Header from '../../../../components/Header';
import { PRIMARY_THEME_COLOR } from '../../../../components/utilities/constant';
import styles from './styles';
import ClosingManagersItem from './ClosingMangerItem'
import strings from '../../../../components/utilities/Localization';
import ConfirmModal from '../../../../components/Modals/ConfirmModal';
import FilterModal from '../../../../components/Modals/FilterModal';

const ClosingDetailsView = (props: any) => {
    const loadingref = false
    return (
        <View style={styles.mainContainer}>
            <Header
                leftImageSrc={images.menu}
                // rightFirstImageScr={images.filter}
                rightSecondImageScr={images.notification}
                headerText={strings.closingManagerHeader}
                handleOnLeftIconPress={props.handleDrawerPress}
                headerStyle={styles.headerStyle}
                RightFirstIconStyle={styles.RightFirstIconStyle}
                // handleOnRightFirstIconPress={() => props.setFilterisVisible(true)}
                statusBarColor={PRIMARY_THEME_COLOR}
                barStyle={'light-content'}
            />
            <View style={{ alignItems: 'flex-end', paddingVertical: 10 }}>
                <Button
                    height={30}
                    width={150}
                    buttonText={strings.addNewCM}
                    textTransform={null}
                    btnTxtsize={15}
                    handleBtnPress={() => props.handleAddNewCM('add', {})}
                />
            </View>
            <View style={styles.listViewsec}>
                <FlatList
                    showsVerticalScrollIndicator={false}
                    data={props?.ClosingManagers}
                    renderItem={({ item }) => <ClosingManagersItem items={item}
                        onPressEditCM={() => props.handleAddNewCM('edit', item)}
                        onPressView={() => props.onPressViews(item)}
                    />}
                    refreshing={loadingref}
                    onRefresh={() => props.onRefresh()}
                />
            </View>
            <ConfirmModal
                Visible={props.status}
                setIsVisible={props.setStatus}
                stringshow={strings.selectCM}
                middleTxt={strings.selectCM + ' ' + strings.transferToAllVisitor + ' CM Name ?'}
                confirmtype={''}
            />
            <FilterModal
                Visible={props.filterisVisible}
                setIsVisible={props.setFilterisVisible} />
        </View>
    )
}
export default ClosingDetailsView;