import { NativeBaseProvider, View } from 'native-base';
import React, { Text } from 'react-native';
import { GestureHandlerRootView, ScrollView } from 'react-native-gesture-handler';
import useCustomHeader from '../lib/components/CustomHeaderComponent';
import dataContext from '../lib/models/DataContext';
import { useState } from 'react';

const EventScreen = ({ navigation, route }: any) => {
    const event = route.params.event;
    useCustomHeader(navigation, event.name, event.description);
    dataContext.setExpenseReportsKey(`${event.id}_${event.name}`);
    
    const [reports, setReports] = useState(dataContext.ExpenseReports.getAllData());

    return (
        <GestureHandlerRootView>
            <ScrollView>
                <Text>{event?.name || JSON.stringify(route.params)}</Text>
            </ScrollView>
        </GestureHandlerRootView>
    )
}

export default EventScreen;