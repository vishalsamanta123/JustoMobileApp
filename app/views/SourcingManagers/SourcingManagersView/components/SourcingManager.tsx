import { FlatList, Text, View } from 'react-native';
import images from '../../../../assets/images';
import Button from '../../../../components/Button';
import Header from '../../../../components/Header';
import { PRIMARY_THEME_COLOR } from '../../../../components/utilities/constant';
import styles from './styles';
import SourcingManagersItem from './SourcingManagersItem'
import strings from '../../../../components/utilities/Localization';
import ConfirmModal from '../../../../components/Modals/ConfirmModal';
import FilterModal from '../../../../components/Modals/FilterModal';
import EmptyListScreen from 'app/components/CommonScreen/EmptyListScreen';

const SourcingDetailsView = (props: any) => {
    const loadingref = false
    return (
        <View style={styles.mainContainer}>
            <Header
                leftImageSrc={images.menu}
                // rightFirstImageScr={images.filter}
                rightSecondImageScr={images.notification}
                headerText={strings.SourcingManagersHeader}
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
                    buttonText={strings.addNewSM}
                    textTransform={null}
                    btnTxtsize={15}
                    handleBtnPress={() => props.handleAddNewSM()}
                />
            </View>
            <View style={styles.listViewsec}>
                <FlatList
                    showsVerticalScrollIndicator={false}
                    data={props?.sourcingManagers}
                    renderItem={({ item }) => <SourcingManagersItem items={item}
                        // setIsVisible={setIsVisible} onPressView={onPressView}
                        onPressEditSM={() => props.handleAddNewSM('edit',item )}
                        onPressAllocate={() => props.onPressAllocateCp(item)}
                        onPressView={() => props.onPressViews(item)}
                        onPressStatus={() => props.setStatus(true)}
                    />}
                    refreshing={loadingref}
                    onRefresh={() => props.onRefresh()}
                    ListEmptyComponent={<EmptyListScreen message={strings.SourcingManagersHeader} />}
                />
            </View>
            <ConfirmModal
                Visible={props.status}
                setIsVisible={props.setStatus}
                stringshow={strings.selectSM}
                middleTxt={strings.selectSM + ' ' + strings.transferToAllVisitor + ' SM Name ?'}
                confirmtype={''}
            />
            <FilterModal
                Visible={props.filterisVisible}
                setIsVisible={props.setFilterisVisible} />
        </View>
    )
}
export default SourcingDetailsView;