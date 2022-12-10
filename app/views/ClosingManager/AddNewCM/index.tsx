import ErrorMessage from 'app/components/ErrorMessage';
import { GREEN_COLOR } from 'app/components/utilities/constant';
import { removeAuthUser, userRegister } from 'app/Redux/Actions/AuthActions';
import { getCityList, getRolesList } from 'app/Redux/Actions/MasterActions';
import React, { useEffect, useState } from 'react';
import { View, Text, Image, Alert } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import AddNewCM from './components/AddNewCM'

const AddNewCMScreen = ({ navigation, route }: any) => {
    const dispatch: any = useDispatch()
    const [addNewCMData, setAddNewCMData] = useState<any>({
        module_id: '',
        address: "indore12",
        latitude: "21",
        longitude: '31',
    })
    const [cityData, setCityData] = useState<any>([])
    const [roleData, setRoleData] = useState<any>([])
    const { userData = {} } = useSelector((state: any) => state.userData)
    const userDataSucess = useSelector((state: any) => state.userReducer)
    const { response = {}, Roleresponse = {} } = useSelector((state: any) => state.masterData) || {}

    useEffect(() => {
        if (userDataSucess?.response?.status === 200 && userDataSucess?.create) {
            dispatch(removeAuthUser())
            navigation.goBack()
            ErrorMessage({
                msg: userDataSucess?.response?.message,
                backgroundColor: GREEN_COLOR
            })
        }
    }, [userDataSucess])
    const onPressBack = () => {
        navigation.goBack()
    }

    const onPressCreate = () => {
        // if (validation()) {
        dispatch(userRegister(addNewCMData))
        // }
        // navigation.goBack()
    }
    const handlegetCityList = () => {
        dispatch(getCityList({}))
        if (response?.status === 200) {
            setCityData(response?.data)
        }
    }
    useEffect(() => {
        if (response?.status === 200) {
            const final = Roleresponse?.data?.filter((el: any) => {
                return userData?.data?.role_title !== el.role_title
            })
            setRoleData(final)
        }
    }, [response])
    const handlegetRoleList = () => {
        dispatch(getRolesList({}))
    }
    return (
        <>
            <AddNewCM
                onPressBack={onPressBack}
                onPressCreate={onPressCreate}
                type={route?.params?.type || ""}
                addNewCMData={addNewCMData}
                setAddNewCMData={setAddNewCMData}
                handlegetCityList={handlegetCityList}
                cityData={cityData}
                handlegetRoleList={handlegetRoleList}
                roleData={roleData}
            />
        </>
    )
}

export default AddNewCMScreen;