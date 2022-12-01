import Loader from 'app/components/CommonScreen/Loader';
import { userRegister } from 'app/Redux/Actions/AuthActions';
import { getCityList, getRolesList } from 'app/Redux/Actions/MasterActions';
import React, { useEffect, useState } from 'react';
import { View, Text, Image } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import AddNewSM from './components/AddNewSM'

const AddNewSMScreen = ({ navigation, route }: any) => {
    const dispatch: any = useDispatch()
    const [addNewSmData, setAddNewSmData] = useState<any>({})
    const [cityData, setCityData] = useState<any>([])
    const [roleData, setRoleData] = useState<any>([])
    const [isLoading, setIsLoading] = useState(false)
    const { userData = {} } = useSelector((state: any) => state.userData)
    console.log('userData: ', userData);
    const { response = {}, Roleresponse = {} } = useSelector((state: any) => state.MasterData) || {}
    console.log('Roleresponse: ', Roleresponse);
    console.log('response: ', response);
    console.log('addNewSmData: ', addNewSmData);


    const onPressBack = () => {
        navigation.goBack()
    }


    const onPressCreate = () => {
        dispatch(userRegister(addNewSmData))
        console.log('addNewSmData: ', addNewSmData);
        // navigation.goBack()
    }
    const handlegetCityList = () => {
        setIsLoading(true)
        dispatch(getCityList({}))
        if (response?.status) {
            setIsLoading(false)
            setCityData(response?.data)
        }
    }
    const handlegetRoleList = () => {
        setIsLoading(true)
        dispatch(getRolesList({}))
        if (response?.status) {
            setIsLoading(false)

           const final =  Roleresponse?.data.filter((el: any) => {
             return  userData?.data?.role_title !== el.role_title
            })
            console.log('final: ', final);
            setRoleData(final)
        }
    }
    return (
        <>
            {isLoading ? <Loader /> : null}
            <AddNewSM
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

export default AddNewSMScreen;