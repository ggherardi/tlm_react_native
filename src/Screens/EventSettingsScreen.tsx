import { NativeBaseProvider, ScrollView } from 'native-base';
import React, { Text } from 'react-native';
import GlobalStyles from '../lib/GlobalStyles';

const EventSettingsScreen = ({ navigation, event }: any) => {
    return (
        <NativeBaseProvider>
            <ScrollView contentContainerStyle={[GlobalStyles.container]}>
                <Text>Impostazioni</Text>
            </ScrollView>            
        </NativeBaseProvider>        
    )
};

export default EventSettingsScreen;