import { NativeBaseProvider, View } from 'native-base';
import React, { Text } from 'react-native';
import { GestureHandlerRootView, ScrollView } from 'react-native-gesture-handler';
import useCustomHeader from '../lib/components/CustomHeaderComponent';
import dataContext from '../lib/models/DataContext';
import { useEffect, useState } from 'react';

const EventScreen = ({ route, navigation }: any) => {
    const event = route.params[0];

    useEffect(() => {
        useCustomHeader(navigation.getParent(), event.name, event.description);
    }, []);

    dataContext.setExpenseReportsKey(`${event?.id}_${event?.name}`);

    const [reports, setReports] = useState(dataContext.ExpenseReports.getAllData());

    return (
        <GestureHandlerRootView>
            <ScrollView>
                <Text>test</Text>
                {/* <Text>{event?.name || JSON.stringify(route.params.params.event.name)}</Text> */}
                {/* <Text>{JSON.stringify(Object.keys(route.params[0].params))}</Text> */}
            </ScrollView>
        </GestureHandlerRootView>
    )
}

export default EventScreen;