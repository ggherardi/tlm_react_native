import { HStack, NativeBaseProvider, View } from 'native-base';
import React from 'react';
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
import { Images } from '../assets/Images';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { Dimensions, Image, StyleSheet, Text } from 'react-native';

const EventScreen = ({ route, navigation }: any) => {
    const [reports, setReports] = useState<ExpenseReport[]>();
    const [event, setEvent] = useState(route.params[0]);
    const [appHeight, setAppHeight] = useState(Dimensions.get('window').height);

    // @ts-ignore
    const Context = React.createContext();
    let totalAmount = reports && reports.length && Utility.CalculateTotalAmount(reports, 'amount');

    useEffect(() => {
        dataContext.setExpenseReportsKey(event.expensesDataContextKey);
        NavigationHelper.setEventTabNavigation(navigation);
    }, []);

    const refreshData = async () => {
        useCustomHeaderWithButtonAsync(navigation.getParent(), Utility.GetEventHeaderTitle(event), () => viewPdf(), 'file-pdf', 'Nota spese');
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
            {/* <GestureHandlerRootView> */}
            {reports && reports.length ? (
                <GestureHandlerRootView>
                    <ScrollView contentContainerStyle={[GlobalStyles.container]}>
                        <View style={[GlobalStyles.flexRow, { padding: 10, paddingBottom: 20 }]}>
                            <Text style={{ flex: 5, fontSize: 20 }}>Importo totale:</Text>
                            <Text style={{ flex: 2, fontSize: 20, fontWeight: 'bold' }}>{totalAmount?.toFixed(2)} {event.mainCurrency.symbol}</Text>
                        </View>
                        {reports != undefined && reports.length > 0 && reports.map((report: ExpenseReport, index: number) => (
                            <ExpenseDataRowComponent expense={report} event={event} onDelete={refreshData} navigation={navigation} index={index} />
                        ))}
                    </ScrollView>
                </GestureHandlerRootView>
            ) : (
                <Context.Provider value={appHeight}>
                    <View style={{ flex: 1, padding: 10 }} onLayout={(e) => setAppHeight(e.nativeEvent.layout.height)}>
                        <Image source={Images.empty_list_2.rnSource} style={{ alignSelf: 'center', height: 200, resizeMode: 'contain' }} />
                        <Text style={[styles.text]}>Non sono state trovate spese per l'evento!</Text>
                    </View>
                    <View style={{ justifyContent: 'flex-end' }}>
                        <Text style={[styles.text]}>Inserisci una nuova spesa</Text>
                        <FontAwesomeIcon icon={'arrow-down-long'} size={50} color={"gray"} style={{ alignSelf: 'center', marginVertical: 10 }} />
                    </View>
                </Context.Provider>
            )}
            {/* </GestureHandlerRootView> */}
        </NativeBaseProvider >
    )
}

const styles = StyleSheet.create({
    text: {
        verticalAlign: 'middle',
        textAlign: 'center',
        fontSize: 15,
    },
});

export default EventScreen;