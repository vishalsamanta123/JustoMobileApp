import { useFocusEffect } from '@react-navigation/native';
import Loader from 'app/components/CommonScreen/Loader';
import { getSourcingManagerList } from 'app/Redux/Actions/SourcingManagerActions';
import React, { useEffect, useState } from 'react';
import { View, Text, Image } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import ClosingDetailsView from './components/ClosingManger'

const ClosingDetailScreen = ({ navigation }: any) => {
    const [status, setStatus] = useState(false)
    const [filterisVisible, setFilterisVisible] = useState(false)
    const [ClosingManagers, setClosingManagers] = useState<any>([])
    const [offSET, setOffset] = useState(0)
    const dispatch: any = useDispatch()
    const { response = {}, list = '' } = useSelector((state: any) => state.SourcingManager) || {}
    const [filterData, setFilterData] = useState({
        start_date: '',
        end_date: '',
        followup_for: ''
    })

    useFocusEffect(
        React.useCallback(() => {
            getCMList(offSET)
            return () => { };
        }, [navigation, list])
    );
    useEffect(() => {
        if (list || response?.status) {
            if (offSET === 0) {
                setClosingManagers(response?.data)
            } else {
                setClosingManagers([...ClosingManagers, ...response?.data])
            }
        }
    }, [response])
    const getCMList = (offset: any) => {
        setOffset(offset)
        dispatch(getSourcingManagerList())
    }

    const onRefresh = () => {
        setFilterData({
            start_date: '',
            end_date: '',
            followup_for: ''
        })
        getCMList(0)
        // props.setFilter({})
    }
    const handleFilterApply = () => {
        getCMList(0)
    }

    const handleDrawerPress = () => {
        navigation.toggleDrawer();
    };
    const handleAddNewCM = (type: any) => {
        if (type === 'edit') {
            navigation.navigate('AddNewCM', { type })
        } else {
            navigation.navigate('AddNewCM')
        }
    };
    const onPressAllocateCp = (item: any) => {
        // navigation.navigate('AllocateCP', item?._id)
    }
    const onPressViews = (item: any) => {
        navigation.navigate('CMDetails', item)
    }

    return (
        <ClosingDetailsView
            handleDrawerPress={handleDrawerPress}
            filterisVisible={filterisVisible}
            setFilterisVisible={setFilterisVisible}
            handleAddNewCM={handleAddNewCM}
            onPressAllocateCp={onPressAllocateCp}
            onPressViews={onPressViews}
            status={status}
            setStatus={setStatus}
            ClosingManagers={ClosingManagers}
            onRefresh={onRefresh}
        />
    )
}

export default ClosingDetailScreen