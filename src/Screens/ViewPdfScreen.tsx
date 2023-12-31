import { NativeBaseProvider } from 'native-base';
import React, { Dimensions, StyleSheet, View } from 'react-native';
import { BusinessEvent } from '../lib/models/BusinessEvent';
import { useCustomHeaderWithButtonAsync } from '../lib/components/CustomHeaderComponent';
import Pdf from 'react-native-pdf';
import { useEffect, useState } from 'react';
import { EmailManager } from '../lib/EmailManager';
import { Attachment } from '../lib/models/Attachment';
import { Utility } from '../lib/Utility';
import { UserProfile } from '../lib/models/UserProfile';

const ViewPdfScreen = ({ navigation, route }: any) => {
  const event: BusinessEvent = route.params.event;
  const userProfile: UserProfile = Utility.GetUserProfile();

  useEffect(() => {
    useCustomHeaderWithButtonAsync(navigation, event.name, () => { sendEmail() }, 'paper-plane', 'PDF Nota spese');
  }, []);

  const sendEmail = async () => {
    const attachments = [];
    attachments.push(new Attachment(`nota_spese_${event.name}_${Utility.GetYear(event.startDate)}_${userProfile.surname}_${userProfile.name}`, event.fullFilePath));
    const subject = `Nota spese ${event.city} ${event.name} ${Utility.FormatDateDDMMYYYY(event.startDate)} - ${Utility.FormatDateDDMMYYYY(event.endDate)} ${userProfile.surname} ${userProfile.name}`;
    EmailManager.send(["info@tourleadermanagement.ch"], subject, "Mail inviata dall'app", attachments);
    // EmailManager.send(["info@tourleadermanagement.ch", "giamalfred@gmail.com"], subject, "Mail inviata dall'app", attachments);
    // EmailManager.send(["info@tourleadermanagement.ch", "giamalfred@gmail.com", "enricogherardi@hotmail.com"], subject, "Mail inviata dall'app con pdf generato", attachments);
    // EmailManager.send(["giamalfred@gmail.com"], subject, `Mail inviata dall'APP "Nota spese TLM"`, attachments);
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