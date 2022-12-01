import Loader from 'app/components/CommonScreen/Loader';
import { userRegister } from 'app/Redux/Actions/AuthActions';
import { getCityList, getRolesList } from 'app/Redux/Actions/MasterActions';
import React, { useEffect, useState } from 'react';
import { View, Text, Image } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import AddNewCM from './components/AddNewCM'

const AddNewCMScreen = ({ navigation, route }: any) => {
    const dispatch: any = useDispatch()
    const [addNewSmData, setAddNewSmData] = useState<any>({})
    const [cityData, setCityData] = useState<any>([])
    const [roleData, setRoleData] = useState<any>([])
    const { userData = {} } = useSelector((state: any) => state.userData)
    const { response = {}, Roleresponse = {} } = useSelector((state: any) => state.masterData) || {}

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
        if (response?.status === 200) {
            const final = Roleresponse?.data.filter((el: any) => {
                return userData?.data?.role_title !== el.role_title
            })
            setRoleData(final)
        }
    }
    return (
        <>
            <AddNewCM
                onPressBack={onPressBack}
                onPressCreate={onPressCreate}
                type={route?.params?.type || ""}
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

export default AddNewCMScreen;