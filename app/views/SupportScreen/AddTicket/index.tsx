import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import AddTicketForm from './Components/AddTicketForm'
import { useFocusEffect } from '@react-navigation/native'
import { useDispatch, useSelector } from 'react-redux'
import { getAllMaster } from 'app/Redux/Actions/MasterActions'

const AddTicketScreen = ({ navigation }: any) => {
    const dispatch: any = useDispatch()
    const [addTicketData, setAddTicketData] = useState({})
    console.log('addTicketData: ', addTicketData);
    const [masterData, setMasterData] = useState([])
    const { response = {} } = useSelector((state: any) => state.masterData)

    useFocusEffect(
        React.useCallback(() => {
            dispatch(getAllMaster({
                type: 11
            }))
            return () => { };
        }, [navigation,])
    );

    useEffect(() => {
        if (response?.status === 200) {
            if (response?.data?.length > 0) {
                setMasterData(response?.data)
            }
        }
    }, [response])

    const validation = () => {
        
    }

    const handleBackPress = () => {
        navigation.goBack()
    }
    return (
        <AddTicketForm
            handleBackPress={handleBackPress}
            addTicketData={addTicketData}
            setAddTicketData={setAddTicketData}
            masterData={masterData}
        />
    )
}

export default AddTicketScreen