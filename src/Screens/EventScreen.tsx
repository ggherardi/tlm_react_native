import { HStack, NativeBaseProvider, View } from 'native-base';
import React, { Dimensions, Image, StyleSheet, Text } from 'react-native';
import { GestureHandlerRootView, ScrollView } from 'react-native-gesture-handler';
import useCustomHeader, { useCustomHeaderWithButtonAsync } from '../lib/components/CustomHeaderComponent';
import dataContext from '../lib/models/DataContext';
import { useEffect, useState } from 'react';
import { ExpenseDataRowComponent } from '../lib/components/ExpenseDataRowComponent';
import { Utility } from '../lib/Utility';
import { ExpenseReport } from '../lib/models/ExpenseReport';
import GlobalStyles from '../lib/GlobalStyles';
import { Constants } from '../lib/Constants';
import { PDFBuilder } from '../lib/PDFBuilder';
import NavigationHelper from '../lib/NavigationHelper';

const EventScreen = ({ route, navigation }: any) => {
    const [reports, setReports] = useState<ExpenseReport[]>();
    const [event, setEvent] = useState(route.params[0]);

    let totalAmount = reports && reports.length && Utility.CalculateTotalAmount(reports, 'amount');

    useEffect(() => {
        dataContext.setExpenseReportsKey(event.expensesDataContextKey);
        NavigationHelper.setEventTabNavigation(navigation);
    }, []);

    const refreshData = async () => {
        useCustomHeaderWithButtonAsync(navigation.getParent(), event.name, () => viewPdf(), 'file-pdf', 'Nota spese');
        let data = dataContext.ExpenseReports.getAllData();
        Utility.SortByDate(data, 'date', false);
        setReports(data);
        setEvent(Utility.GetEvent(event.id));
    };
    Utility.OnFocus({ navigation: navigation, onFocusAction: refreshData });

    const viewPdf = async () => {        
        await PDFBuilder.createExpensesPdfAsync(event, event.directoryName, event.reportFileName);
        navigation.navigate(Constants.Navigation.ViewPdf, { event: event });
    }

    return (
        <NativeBaseProvider>
            <GestureHandlerRootView>
                <ScrollView contentContainerStyle={[GlobalStyles.container]}>                    
                    <View style={[GlobalStyles.flexRow, { padding: 10, paddingBottom: 20 }]}>                        
                        <Text style={{ flex: 5, fontSize: 20 }}>Importo totale:</Text>
                        <Text style={{ flex: 2, fontSize: 20, fontWeight: 'bold' }}>{totalAmount?.toFixed(2)} {event.mainCurrency.symbol}</Text>
                    </View>                    
                    {reports && reports.length && reports.map ? reports.map((report: ExpenseReport, index: number) => (
                        <View key={`homedatarow_${index}_${Utility.GenerateRandomGuid()}`}>
                            <ExpenseDataRowComponent expense={report} event={event} onDelete={refreshData} navigation={navigation} index={index} />
                        </View>
                    )) : (
                        <Text>Nessuna spesa trovata</Text>)}
                </ScrollView>
            </GestureHandlerRootView>
        </NativeBaseProvider>
    )
}

export default EventScreen;