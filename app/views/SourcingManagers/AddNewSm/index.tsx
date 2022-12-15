import { useFocusEffect } from '@react-navigation/native';
import { getAgentDetail } from 'app/Redux/Actions/AgentActions';
import { getCityList, getRolesList } from 'app/Redux/Actions/MasterActions';
import { updateUserSettingData, userRegister } from 'app/Redux/Actions/SettingActions';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AddNewSM from './components/AddNewSM'

const AddNewSMScreen = ({ navigation, route }: any) => {
    const { type, data } = route?.params || ""
    const dispatch: any = useDispatch()
    const [addNewSmData, setAddNewSmData] = useState<any>({})
    const [cityData, setCityData] = useState<any>([])
    const [roleData, setRoleData] = useState<any>([])
    const [isLoading, setIsLoading] = useState(false)
    const { userData = {} } = useSelector((state: any) => state.userData)
    const { response = {}, Roleresponse = {} } = useSelector((state: any) => state.masterData) || {}

    const SMDetails = useSelector((state: any) => state.agentData)
    useFocusEffect(
        React.useCallback(() => {
            if (type === 'edit') {
                dispatch(
                    getAgentDetail({
                        user_id: data?._id,
                    })
                );
            } else {
                console.log('Adddd')
            }
            return () => { };
        }, [navigation, SMDetails?.detail])
    );

    useEffect(() => {
        if (SMDetails?.response) {
        console.log('SMDetails?.response: ', SMDetails?.response);
            setAddNewSmData({
                ...addNewSmData ,
                profile_picture: SMDetails?.response?.data?.base_url + SMDetails?.response?.data?.profile_picture,
                role_id: SMDetails?.response?.data?.role_id,
                firstname: SMDetails?.response?.data?.firstname,
                lastname: SMDetails?.response?.data?.lastname,
                adhar_no: SMDetails?.response?.data?.adhar_no,
                pancard_no: SMDetails?.response?.data?.pancard_no,
                gender: SMDetails?.response?.data?.gender,
                dateofbirth: SMDetails?.response?.data?.dateofbirth,
                mobile: SMDetails?.response?.data?.mobile,
                whatsapp_no: SMDetails?.response?.data?.whatsapp_no,
                email: SMDetails?.response?.data?.email,
                city: SMDetails?.response?.data?.city,
                city_id: SMDetails?.response?.data?.city_id,
                area: SMDetails?.response?.data?.area,
                user_id: SMDetails?.response?.data?._id ?? '' 
            })
            // setAddNewSmData(SMDetails?.response?.data)
        }
    }, [SMDetails?.response])


    const onPressBack = () => {
        navigation.goBack()
    }

    const onPressCreate = (BtnType: any) => {
    // console.log('BtnType: ', BtnType);
        if (type === 'edit') {
            dispatch(updateUserSettingData(addNewSmData))
            navigation.goBack()
        } else {
            dispatch(userRegister(addNewSmData))
            navigation.goBack()
        }
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