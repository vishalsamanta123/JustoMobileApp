import React from 'react'
import SupportView from './components/SupportView';

const SupportScreen = ({ navigation }: any) => {
    const handleDrawerPress = () => {
        navigation.toggleDrawer();
    };
    const handleAddTicket = () => {
        navigation.navigate('AddTicket');
    };
    return (
        <>
            <SupportView
                handleDrawerPress={handleDrawerPress}
                handleAddTicket={handleAddTicket}
            />
        </>
    )
}

export default SupportScreen