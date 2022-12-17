import { useFocusEffect } from '@react-navigation/native';
import { getClosingManagerList } from 'app/Redux/Actions/ClosingManager';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ClosingDetailsView from './components/ClosingManger'

const ClosingDetailScreen = ({ navigation }: any) => {
    const [status, setStatus] = useState(false)
    const [filterisVisible, setFilterisVisible] = useState(false)
    const [ClosingManagers, setClosingManagers] = useState<any>([])
    const [offSET, setOffset] = useState(0)
    const dispatch: any = useDispatch()
    const { response = {}, list = '' } = useSelector((state: any) => state.ClosingManager) || {}
    const [filterData, setFilterData] = useState({
        start_date: '',
        end_date: '',
        followup_for: ''
    })

    useFocusEffect(
        React.useCallback(() => {
            getCMList()
            return () => { };
        }, [navigation])
    );
    useEffect(() => {
        if (response?.status === 200) {
            setClosingManagers(response?.data)
        } else {
            // setClosingManagers([])
        }
    }, [response])
    const getCMList = () => {
        dispatch(getClosingManagerList({}))
    }

    const onRefresh = () => {
        getCMList()
    }
    const handleFilterApply = () => {
        getCMList()
    }

    const handleDrawerPress = () => {
        navigation.toggleDrawer();
    };
    const handleAddNewCM = (type: any, data: any) => {
        if (type === 'edit') {
            navigation.navigate('AddNewCM', { type, data })
        } else {
            navigation.navigate('AddNewCM')
        }
    };

    const onPressViews = (item: any) => {
        navigation.navigate('CMDetails', item)
    }

    return (
        <ClosingDetailsView
            handleDrawerPress={handleDrawerPress}
            filterisVisible={filterisVisible}
            setFilterisVisible={setFilterisVisible}
            handleAddNewCM={handleAddNewCM}
            onPressViews={onPressViews}
            status={status}
            setStatus={setStatus}
            ClosingManagers={ClosingManagers}
            onRefresh={onRefresh}
        />
    )
}

export default ClosingDetailScreen