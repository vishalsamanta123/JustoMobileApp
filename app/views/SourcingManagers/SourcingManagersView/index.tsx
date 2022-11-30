import { useFocusEffect } from '@react-navigation/native';
import Loader from 'app/components/CommonScreen/Loader';
import { getSourcingManagerList } from 'app/Redux/Actions/SourcingManagerActions';
import React, { useEffect, useState } from 'react';
import { View, Text, Image } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import SourcingDetailsView from './components/SourcingManager'

const SourcingDetailScreen = ({ navigation }: any) => {
    const [status, setStatus] = useState(false)
    const [filterisVisible, setFilterisVisible] = useState(false)
    const [isloading, setIsloading] = useState(false)
    const [sourcingManagers, setSourcingManagers] = useState<any>([])
    const [offSET, setOffset] = useState(0)
    const dispatch: any = useDispatch()
    const { response = {}, list = '' } = useSelector((state: any) => state.SourcingManager)
    console.log('response: ', response);
    const [filterData, setFilterData] = useState({
        start_date: '',
        end_date: '',
        followup_for: ''
    })

    useFocusEffect(
        React.useCallback(() => {
            getFollowupList(offSET)
            return () => { };
        }, [navigation, list])
    );
    useEffect(() => {
        if (list || response?.status) {
            setIsloading(false)
            if (offSET == 0) {
                console.log('offSET == 0: ', offSET == 0);
                setSourcingManagers(response?.data)
            } else {
                setSourcingManagers([...sourcingManagers, ...response?.data])
            }
        }
    }, [response])
    const getFollowupList = (offset: any) => {
        setIsloading(true)
        setOffset(offset)
        dispatch(getSourcingManagerList())
        // toGetDatas(array)
    }

    const onRefresh = () => {
        setFilterData({
            start_date: '',
            end_date: '',
            followup_for: ''
        })
        getFollowupList(0)
        // props.setFilter({})
    }
    const handleFilterApply = () => {
        getFollowupList(0)
    }

    const handleDrawerPress = () => {
        navigation.toggleDrawer();
    };
    const handleAddNewSM = (type: any) => {
        if (type === 'edit') {
            navigation.navigate('AddNewSM', { type })
        } else {
            navigation.navigate('AddNewSM')
        }
    };
    const onPressAllocateCp = () => {
        navigation.navigate('AllocateCP')
    }
    const onPressViews = (item: any) => {
        navigation.navigate('SMDetails', item)
    }

    return (
        <>
            {isloading ? <Loader /> : null}
            <SourcingDetailsView
                handleDrawerPress={handleDrawerPress}
                filterisVisible={filterisVisible}
                setFilterisVisible={setFilterisVisible}
                handleAddNewSM={handleAddNewSM}
                onPressAllocateCp={onPressAllocateCp}
                onPressViews={onPressViews}
                status={status}
                setStatus={setStatus}
                sourcingManagers={sourcingManagers}
            />
        </>
    )
}

export default SourcingDetailScreen