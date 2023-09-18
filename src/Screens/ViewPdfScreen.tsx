import { NativeBaseProvider, ScrollView } from 'native-base';
import React, { Dimensions, StyleSheet, Text, View } from 'react-native';
import { BusinessEvent } from '../lib/models/BusinessEvent';
import { useCustomHeaderWithButtonAsync } from '../lib/components/CustomHeaderComponent';
import Pdf from 'react-native-pdf';
import { useEffect, useState } from 'react';
import { EmailManager } from '../lib/EmailManager';
import { Attachment } from '../lib/models/Attachment';
import { Utility } from '../lib/Utility';

const ViewPdfScreen = ({ navigation, route }: any) => {
  const event: BusinessEvent = route.params.event;

  useEffect(() => {
    useCustomHeaderWithButtonAsync(navigation, event.name, () => { sendEmail() }, 'paper-plane', 'PDF Nota spese');
  }, []);

  const sendEmail = async () => {
    const attachments = [];
    attachments.push(new Attachment(`nota_spese_${event.name}_${Utility.GetYear(event.startDate)}_nomeTL`, event.fullFilePath));
    // EmailManager.send(["e.campolo@tourleadermanagement.ch", "giamalfred@gmail.com"], `Nota spese ${event.name} del ${Utility.FormatDateDDMMYYYY(event.startDate)}. TL: nome_tl (da implementare)`, "Mail inviata dall'app con pdf generato", attachments);
    EmailManager.send(["giamalfred@gmail.com"], `Nota spese ${event.name} del ${Utility.FormatDateDDMMYYYY(event.startDate)}. TL: nome_tl (da implementare)`, "Mail inviata dall'app con pdf generato dalla stessa app (ancora in fase grafica embrionale)", attachments);
  }

  const [pdfSource, setPdfSource] = useState<any>({ uri: `file:///${event.fullFilePath}`, cache: true });

  return (
    <NativeBaseProvider>
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
    </NativeBaseProvider>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    // marginTop: 25,
  },
  pdf: {
    flex: 1,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    // height: 500,
  }
});

export default ViewPdfScreen;