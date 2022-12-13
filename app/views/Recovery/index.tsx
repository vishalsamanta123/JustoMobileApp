import React from 'react'
import RecoveryView from './components/RecoveryView'

const RecoveryScreen = ({ navigation }: any) => {
    const handleDrawerPress = () => {
        navigation.toggleDrawer();
    };
    return (
        <>
            <RecoveryView
                handleDrawerPress={handleDrawerPress}
            />
        </>
    )
}

export default RecoveryScreen