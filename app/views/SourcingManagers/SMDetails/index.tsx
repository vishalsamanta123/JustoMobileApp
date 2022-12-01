import { useFocusEffect } from '@react-navigation/native';
import { getSourcingManagerDetail } from 'app/Redux/Actions/SourcingManagerActions';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import SMDetailsView from './components/SMDetails';

const SMDetailsScreen = ({ navigation, route }: any) => {
    const data = route?.params || {}
    console.log('data: ', data);
    const dispatch: any = useDispatch()
    const { response = {}, detail = '' } = useSelector((state: any) => state.SourcingManager)
    useFocusEffect(
        React.useCallback(() => {
            dispatch(getSourcingManagerDetail({user_id: data?._id}))
            return () => { };
        }, [navigation, detail])
    );
    const handleBackPress = () => {
        navigation.goBack();
    };
    const handleCpAllocationPress = () => {
        navigation.navigate('AllocateCP')
    };
    return (
        <SMDetailsView
            handleBackPress={handleBackPress}
            handleCpAllocationPress={handleCpAllocationPress}
        />
    )
}
export default SMDetailsScreen