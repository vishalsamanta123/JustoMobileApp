import { useFocusEffect } from '@react-navigation/native';
import Loader from 'app/components/CommonScreen/Loader';
import { userRegister } from 'app/Redux/Actions/AuthActions';
import { getCityList, getRolesList } from 'app/Redux/Actions/MasterActions';
import { getSourcingManagerDetail } from 'app/Redux/Actions/SourcingManagerActions';
import React, { useEffect, useState } from 'react';
import { View, Text, Image } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import AddNewSM from './components/AddNewSM'

const AddNewSMScreen = ({ navigation, route }: any) => {
    console.log('route: ', route?.params);
    const { type, data } = route?.params || ""
    const dispatch: any = useDispatch()
    const [addNewSmData, setAddNewSmData] = useState<any>({})
    const [cityData, setCityData] = useState<any>([])
    const [roleData, setRoleData] = useState<any>([])
    const [isLoading, setIsLoading] = useState(false)
    const { userData = {} } = useSelector((state: any) => state.userData)
    const { response = {}, Roleresponse = {} } = useSelector((state: any) => state.masterData) || {}

    const SMDetails = useSelector((state: any) => state.SourcingManager)
    useFocusEffect(
        React.useCallback(() => {
            dispatch(getSourcingManagerDetail({ user_id: data?._id }))
            return () => { };
        }, [navigation, SMDetails?.detail])
    );

    useEffect(() => {
        if (SMDetails?.response?.data[0]?.length > 0) {
            setAddNewSmData({
                profile_picture: '',
                role_id: '',
                firstname: '',
                lastname: '',
                adhar_no: '',
                pancard_no: '',
                gender: '',
                dateofbirth: '',
                mobile: '',
                whatsapp_no: '',
                email: '',
                city: '',
                city_id: '',
                area: '',
            })
        }
    }, [SMDetails?.response])


    const onPressBack = () => {
        navigation.goBack()
    }

    const onPressCreate = () => {
        dispatch(userRegister(addNewSmData))
        // navigation.goBack()
    }
    const handlegetCityList = () => {
        dispatch(getCityList({}))
        if (response?.status) {
            setCityData(response?.data)
        }
    }
    const handlegetRoleList = () => {
        dispatch(getRolesList({}))
        if (Roleresponse?.status === 200) {
            if (Roleresponse?.data?.length > 0) {
                const final = Roleresponse?.data?.filter((el: any) => {
                    return userData?.data?.role_title !== el.role_title
                })
                setRoleData(final)
            }

        }
    }
    return (
        <>
            {/* {isLoading ? <Loader /> : null} */}
            <AddNewSM
                onPressBack={onPressBack}
                onPressCreate={onPressCreate}
                type={type}
                addNewSmData={addNewSmData}
                setAddNewSmData={setAddNewSmData}
                handlegetCityList={handlegetCityList}
                cityData={cityData}
                handlegetRoleList={handlegetRoleList}
                roleData={roleData}
            />
        </>
    )
}

export default AddNewSMScreen;