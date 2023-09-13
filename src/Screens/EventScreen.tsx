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
import Pdf from 'react-native-pdf';
import { PDFBuilder } from '../lib/PDFBuilder';
import { Attachment } from '../lib/models/Attachment';

const EventScreen = ({ route, navigation }: any) => {
    const [pdfSource, setPdfSource] = useState<any>({ uri: 'file:///storage/emulated/0/Android/data/com.tlm/files/Documents/test.pdf', cache: true });
    const [file, setFile] = useState<RNHTMLtoPDF.Pdf>();    
    const [feedback, setFeedback] = useState('Feedback original state');
    const [reports, setReports] = useState<ExpenseReport[]>();

    const event: BusinessEvent = route.params[0];    
    let totalAmount = reports && reports.length && reports.map(r => r.amount).reduce((p, c) => Number(p) + Number(c));

    useEffect(() => {
        dataContext.setExpenseReportsKey(`${event?.id}_${event?.name}`);
    }, []);        

    const refreshData = async () => {
        useCustomHeader(navigation.getParent(), event.name, "Tutte le spese");
        let data = dataContext.ExpenseReports.getAllData();
        data.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
        setReports(data);
    };
    Utility.OnFocus({ navigation: navigation, onFocusAction: refreshData });
    
    const createPdf = async () => {
        let options = {
            html: PDFBuilder.generateHtml(event, reports as ExpenseReport[], totalAmount),
            fileName: 'test',
            directory: '/data/user/0/com.tlm/test1',
        };

        let file = await RNHTMLtoPDF.convert(options);        
        const source = { uri: `file:///${file.filePath}` };
        setFile(file);
        setPdfSource(source);
        console.log(file.filePath);
    }
    
    const sendEmail = async () => {
        const attachments = [];
        attachments.push(new Attachment(`nota_spese_${event.name}_${Utility.GetYear(event.startDate)}_nomeTL`, file?.filePath));
        // GOTTA ADD PICTURES HERE!
        EmailManager.send(["e.campolo@tourleadermanagement.ch", "giamalfred@gmail.com"], `Nota spese ${event.name} del ${Utility.FormatDateDDMMYYYY(event.startDate)}. TL: nome_tl (da implementare)`, "Mail inviata dall'app con pdf generato dalla stessa app (ancora in fase grafica embrionale)", attachments);
        // EmailManager.send(["giamalfred@gmail.com"], `Nota spese ${event.name} del ${Utility.FormatDateDDMMYYYY(event.startDate)}. TL: nome_tl (da implementare)`, "Mail inviata dall'app con pdf generato dalla stessa app (ancora in fase grafica embrionale)", attachments);
    }

    return (
        <NativeBaseProvider>
            <GestureHandlerRootView>
                <ScrollView contentContainerStyle={[GlobalStyles.container]}>
                    <InputSideButton icon={'cog'} pressFunction={() => Utility.storageTest()} />
                    <View style={[GlobalStyles.flexRow, { padding: 10 }]}>
                        <Text style={{ flex: 5, fontSize: 20 }}>Importo totale:</Text>
                        <Text style={{ flex: 2, fontSize: 20 }}>{event.mainCurrency.symbol} {totalAmount}</Text>                        
                    </View>
                    <HStack>
                        <InputSideButton icon={'file-pdf'} pressFunction={() => createPdf()} />
                        <InputSideButton icon={'paper-plane'} pressFunction={() => sendEmail()} />
                    </HStack>
                    {reports && reports.length && reports.map ? reports.map((report: ExpenseReport, index: number) => (
                        <View key={`homedatarow_${index}_${Utility.GenerateRandomGuid()}`}>
                            <ExpenseDataRowComponent expense={report} event={event} onDelete={refreshData} navigation={navigation} index={index} />
                        </View>
                    )) : (
                        <Text>Nessuna spesa trovata</Text>)}
                    <Text>
                        {/* {feedback} */}
                    </Text>
                    <View style={styles.container}>
                        {pdfSource != undefined && pdfSource != null && (
                            <Pdf
                                trustAllCerts={false}
                                source={pdfSource}
                                onLoadComplete={(numberOfPages, filePath) => {
                                    console.log(`Number of pages: ${numberOfPages}`);
                                }}
                                onPageChanged={(page, numberOfPages) => {
                                    console.log(`Current page: ${page}`);
                                }}
                                onError={(error) => {
                                    console.log(error);
                                }}
                                onPressLink={(uri) => {
                                    console.log(`Link pressed: ${uri}`);
                                }}
                                style={styles.pdf} />
                        )}
                    </View>
                </ScrollView>
            </GestureHandlerRootView>
        </NativeBaseProvider>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginTop: 25,
    },
    pdf: {
        flex: 1,
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    }
});

export default EventScreen;