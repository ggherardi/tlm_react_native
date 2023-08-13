import { NativeBaseProvider, View } from 'native-base';
import React, { Text } from 'react-native';
import { GestureHandlerRootView, ScrollView } from 'react-native-gesture-handler';
import useCustomHeader from '../lib/components/CustomHeaderComponent';

const EventScreen = ({ navigation, route }: any) => {
    const event = route.params.event;
    useCustomHeader(navigation, event.name, event.description);
    return (
        <GestureHandlerRootView>
            <ScrollView>
                <Text>{event?.name || JSON.stringify(route.params)}</Text>
            </ScrollView>
        </GestureHandlerRootView>
    )
}

export default EventScreen;