import { NativeBaseProvider, View } from 'native-base';
import React, { Text } from 'react-native';
import { GestureHandlerRootView, ScrollView } from 'react-native-gesture-handler';
import useCustomHeader from '../lib/components/CustomHeaderComponent';
import dataContext from '../lib/models/DataContext';
import { useEffect, useState } from 'react';
import { ExpenseDataRowComponent } from '../lib/components/ExpenseDataRowComponent';
import { Utility } from '../lib/Utility';
import { ExpenseReport } from '../lib/models/ExpenseReport';
import { useIsFocused } from '@react-navigation/native';

const EventScreen = ({ route, navigation }: any) => {
    const event = route.params[0];
    dataContext.setExpenseReportsKey(`${event?.id}_${event?.name}`);
    const [feedback, setFeedback] = useState('Feedback original state');
    const [reports, setReports] = useState(dataContext.ExpenseReports.getAllData());
    const isFocused = useIsFocused();
    useEffect(() => {
        useCustomHeader(navigation.getParent(), event.name, event.description);
        navigation.getParent().setOptions
        setFeedback(JSON.stringify(reports));
    }, []);

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            refreshData();
        });
        return unsubscribe;
    }, [navigation]);

    const refreshData = () => {
        setReports(dataContext.ExpenseReports.getAllData());
    };

    console.log("Reports: ", JSON.stringify(reports));
    return (
        <NativeBaseProvider>
            <GestureHandlerRootView>
                <ScrollView>
                    {reports && reports.length && reports.map ? reports.map((report: ExpenseReport, index: number) => (
                        <ExpenseDataRowComponent key={`homedatarow_${index}`} expense={report} onDelete={refreshData} navigation={navigation} index={index} />
                    )) : (
                        <Text>Nessuna spesa trovata</Text>)}
                    <Text>
                        {feedback}
                    </Text>
                </ScrollView>
            </GestureHandlerRootView>
        </NativeBaseProvider>
    )
}

export default EventScreen;