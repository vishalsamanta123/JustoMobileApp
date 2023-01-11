import { View, Text } from 'react-native'
import React from 'react'
import SupportDetailsView from './Components/SupportDetailsView'

const SupportScreenDetails = ({ navigation }: any) => {
    const handleBackPress = () => {
        navigation.goBack()
    }
    return (
        <SupportDetailsView
            handleBackPress={handleBackPress}
        />
    )
}

export default SupportScreenDetails