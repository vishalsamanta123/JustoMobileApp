import { useFocusEffect } from '@react-navigation/native';
import { getSourcingManagerList } from 'app/Redux/Actions/SourcingManagerActions';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import SourcingDetailsView from './components/SourcingManager'

const SourcingDetailScreen = ({ navigation }: any) => {
    const [status, setStatus] = useState(false)
    const [filterisVisible, setFilterisVisible] = useState(false)
    const [sourcingManagers, setSourcingManagers] = useState<any>([])
    const [offSET, setOffset] = useState(0)
    const dispatch: any = useDispatch()
    const { response = {}, list = '' } = useSelector((state: any) => state.SourcingManager)
    const [filterData, setFilterData] = useState({
        start_date: '',
        end_date: '',
        followup_for: ''
    })

    useFocusEffect(
        React.useCallback(() => {
            getSMList(offSET)
            return () => { };
        }, [navigation, list])
    );
    useEffect(() => {
        if (list || response?.status) {
            if (offSET == 0) {
                setSourcingManagers(response?.data)
            } else {
                setSourcingManagers([...sourcingManagers, ...response?.data])
            }
        }
    }, [response])
    const getSMList = (offset: any) => {
        setOffset(offset)
        dispatch(getSourcingManagerList({}))
        // toGetDatas(array)
    }

    const onRefresh = () => {
        setFilterData({
            start_date: '',
            end_date: '',
            followup_for: ''
        })
        getSMList(0)
        // props.setFilter({})
    }
    const handleFilterApply = () => {
        getSMList(0)
    }

    const handleDrawerPress = () => {
        navigation.toggleDrawer();
    };
    const handleAddNewSM = (type: any, data: any) => {
        if (type === 'edit') {
            navigation.navigate('AddNewSM', { type : type, data: data })
        } else {
            navigation.navigate('AddNewSM')
        }
    };
    const onPressAllocateCp = (item: any) => {
        navigation.navigate('AllocateCP', item?._id)
    }
    const onPressViews = (item: any) => {
        navigation.navigate('SMDetails', item)
    }

    return (
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
            onRefresh={onRefresh}
        />
    )
}

export default SourcingDetailScreen