import { HStack, NativeBaseProvider, View } from 'native-base';
import React, { Dimensions, StyleSheet, Text } from 'react-native';
import { GestureHandlerRootView, ScrollView } from 'react-native-gesture-handler';
import useCustomHeader from '../lib/components/CustomHeaderComponent';
import dataContext from '../lib/models/DataContext';
import { useEffect, useState } from 'react';
import { ExpenseDataRowComponent } from '../lib/components/ExpenseDataRowComponent';
import { Utility } from '../lib/Utility';
import { ExpenseReport } from '../lib/models/ExpenseReport';
import GlobalStyles from '../lib/GlobalStyles';
import { BusinessEvent } from '../lib/models/BusinessEvent';
import { EmailManager } from '../lib/EmailManager';
import { InputSideButton } from '../lib/components/InputSideButtonComponent';
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import { Attachment } from '../lib/models/Attachment';
import { Constants } from '../lib/Constants';
import { PDFBuilder } from '../lib/PDFBuilder';

const EventScreen = ({ route, navigation }: any) => {
    const [file, setFile] = useState<RNHTMLtoPDF.Pdf>();
    const [reports, setReports] = useState<ExpenseReport[]>();
    const [event, setEvent] = useState(route.params[0]);

    let totalAmount = reports && reports.length && Utility.CalculateTotalAmount(reports, 'amount');

    useEffect(() => {
        dataContext.setExpenseReportsKey(event.expensesDataContextKey);
    }, []);

    const refreshData = async () => {
        useCustomHeader(navigation.getParent(), event.name, "Tutte le spese");
        let data = dataContext.ExpenseReports.getAllData();
        data.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
        setReports(data);
        setEvent(Utility.GetEvent(event.id));
    };
    Utility.OnFocus({ navigation: navigation, onFocusAction: refreshData });

    const viewPdf = async () => {
        await PDFBuilder.createExpensesPdfAsync(event, event.directoryName, event.reportFileName, reports);
        navigation.navigate(Constants.Navigation.ViewPdf, { event: event });
    }

    const sendEmail = async () => {
        const attachments = [];
        attachments.push(new Attachment(`nota_spese_${event.name}_${Utility.GetYear(event.startDate)}_nomeTL`, event.fullFilePath));
        // GOTTA ADD PICTURES HERE!
        EmailManager.send(["e.campolo@tourleadermanagement.ch", "giamalfred@gmail.com"], `Nota spese ${event.name} del ${Utility.FormatDateDDMMYYYY(event.startDate)}. TL: nome_tl (da implementare)`, "Mail inviata dall'app con pdf generato", attachments);
        // EmailManager.send(["giamalfred@gmail.com"], `Nota spese ${event.name} del ${Utility.FormatDateDDMMYYYY(event.startDate)}. TL: nome_tl (da implementare)`, "Mail inviata dall'app con pdf generato dalla stessa app (ancora in fase grafica embrionale)", attachments);
    }

    return (
        <NativeBaseProvider>
            <GestureHandlerRootView>
                <ScrollView contentContainerStyle={[GlobalStyles.container]}>                    
                    <View style={[GlobalStyles.flexRow, { padding: 10, paddingBottom: 20 }]}>
                        <Text style={{ flex: 5, fontSize: 20 }}>Importo totale:</Text>
                        <Text style={{ flex: 2, fontSize: 20, fontWeight: 'bold' }}>{totalAmount?.toFixed(2)} {event.mainCurrency.symbol}</Text>
                    </View>
                    <HStack style={{ paddingBottom: 20 }}>
                        <InputSideButton icon={'file-pdf'} pressFunction={() => viewPdf()} />
                        <InputSideButton icon={'paper-plane'} pressFunction={() => sendEmail()} />
                    </HStack>
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