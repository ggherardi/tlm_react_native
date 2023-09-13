import { NativeBaseProvider, ScrollView } from 'native-base';
import React, { Dimensions, StyleSheet, Text, View } from 'react-native';
import GlobalStyles from '../lib/GlobalStyles';
import { Utility } from '../lib/Utility';
import { BusinessEvent } from '../lib/models/BusinessEvent';
import { GetCurrency } from '../lib/data/Currencies';
import useCustomHeader from '../lib/components/CustomHeaderComponent';
import Pdf from 'react-native-pdf';
import { useState } from 'react';

const ViewPdfScreen = ({ route, navigation }: any) => {
  const event: BusinessEvent = route.params.event;

  const [pdfSource, setPdfSource] = useState<any>({ uri: `file:///${event.fullFilePath}`, cache: true });
    
  return (
    <NativeBaseProvider>
      <ScrollView>
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
    // height: Dimensions.get('window').height,
    height: 500,
  }
});

export default ViewPdfScreen;