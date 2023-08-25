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
import GlobalStyles from '../lib/GlobalStyles';

const EventScreen = ({ route, navigation }: any) => {
    const event = route.params[0];

    useEffect(() => {
        useCustomHeader(navigation.getParent(), event.name, event.description);
        dataContext.setExpenseReportsKey(`${event?.id}_${event?.name}`);    
        navigation.getParent().setOptions
        // setFeedback(JSON.stringify(reports));
    }, []);

    const [feedback, setFeedback] = useState('Feedback original state');
    const [reports, setReports] = useState<ExpenseReport[]>();

    const refreshData = async () => {
        console.log("Focused");
        setReports(dataContext.ExpenseReports.getAllData());
    };
    Utility.OnFocus({ navigation: navigation, onFocusAction: refreshData });

    console.log(reports?.length)

    return (
        <NativeBaseProvider>
            <GestureHandlerRootView>
                <ScrollView contentContainerStyle={[GlobalStyles.container]}>
                    {reports && reports.length && reports.map ? reports.map((report: ExpenseReport, index: number) => (
                        <View key={`homedatarow_${index}_${Utility.GenerateRandomGuid()}`}>
                            <ExpenseDataRowComponent expense={report} onDelete={refreshData} navigation={navigation} index={index} />
                        </View>
                    )) : (
                        <Text>Nessuna spesa trovata</Text>)}
                    <Text>
                        {/* {feedback} */}
                    </Text>
                </ScrollView>
            </GestureHandlerRootView>
        </NativeBaseProvider>
    )
}

export default EventScreen;