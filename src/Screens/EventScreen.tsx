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
import { BusinessEvent } from '../lib/models/BusinessEvent';

const EventScreen = ({ route, navigation }: any) => {
    const event: BusinessEvent = route.params[0];

    useEffect(() => {
        dataContext.setExpenseReportsKey(`${event?.id}_${event?.name}`);
    }, []);

    const [feedback, setFeedback] = useState('Feedback original state');
    const [reports, setReports] = useState<ExpenseReport[]>();

    const refreshData = async () => {
        useCustomHeader(navigation.getParent(), event.name, "Tutte le spese");
        let data = dataContext.ExpenseReports.getAllData();
        data.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
        setReports(data);
    };
    Utility.OnFocus({ navigation: navigation, onFocusAction: refreshData });

    console.log(reports?.length)

    return (
        <NativeBaseProvider>
            <GestureHandlerRootView>
                <ScrollView contentContainerStyle={[GlobalStyles.container]}>
                    <View style={[GlobalStyles.flexRow, { padding: 10 }]}>
                        <Text style={{ flex: 5, fontSize: 20 }}>Importo totale:</Text>
                        <Text style={{ flex: 2, fontSize: 20 }}>{event.mainCurrency.symbol} {reports && reports.length && reports.map(r => r.amount).reduce((p, c) => Number(p) + Number(c))}</Text>
                    </View>
                    {reports && reports.length && reports.map ? reports.map((report: ExpenseReport, index: number) => (
                        <View key={`homedatarow_${index}_${Utility.GenerateRandomGuid()}`}>
                            <ExpenseDataRowComponent expense={report} event={event} onDelete={refreshData} navigation={navigation} index={index} />
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