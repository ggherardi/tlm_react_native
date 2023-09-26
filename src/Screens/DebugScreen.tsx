import { useEffect, useState } from 'react';
import React, { Button, Image, ScrollView } from 'react-native';
import DocumentScanner, { ResponseType } from 'react-native-document-scanner-plugin'
import { FileManager } from '../lib/FileManager';

// @ts-ignore
const DebugScreen = ({ navigation }) => {
  const [scannedImage, setScannedImage] = useState<string>();

  const scanDocument = async () => {
    // start the document scanner
    try {
      const { scannedImages } = await DocumentScanner.scanDocument({
        responseType: ResponseType.ImageFilePath
      });
      if (scannedImages && scannedImages.length > 0) {
        // set the img src, so we can view the first scanned image
        setScannedImage(scannedImages[0]);
      }
    } catch (err) {
      console.log(err);
    }

    // get back an array with scanned image file paths
    
  }
  console.log("Image: ", scannedImage);
  useEffect(() => {
    // call scanDocument on load
    FileManager.checkCameraPermissions();
  }, []);

  const debug = () => {

  };

  return (
    <ScrollView>
      <Button title={'Debug button'} onPress={scanDocument} />
      {/* <Image
        resizeMode="contain"
        style=
      source=
    /> */}
    </ScrollView>);
}

export default DebugScreen;