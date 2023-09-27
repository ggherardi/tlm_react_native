import { useEffect, useState } from 'react';
import React, { Button, Image, ScrollView } from 'react-native';
import DocumentScanner, { ResponseType } from 'react-native-document-scanner-plugin'
import { FileManager } from '../lib/FileManager';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import ml from '@react-native-firebase/ml';
import TextRecognition from '@react-native-ml-kit/text-recognition';
import MlkitOcr from 'react-native-mlkit-ocr';

// @ts-ignore
const DebugScreen = ({ navigation }) => {
  const [scannedImage, setScannedImage] = useState<string>();
  const [photo, setPhoto] = useState<any>();

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

  const imagePickerCommonOptions = { mediaType: "photo", maxWidth: 800, maxHeight: 600, includeBase64: true };
  const onSelectImagePress = async () => {
    let hasPermissions: boolean = false;
    try {
      const permissions = await FileManager.checkStorageReadPermissions();
      hasPermissions = permissions.success;
    } catch (err) {
      hasPermissions = false;
    }
    if (!hasPermissions) {
      return;
    }
    // @ts-ignore
    launchImageLibrary(imagePickerCommonOptions, onImageSelect);
  }

  const onImageSelect = async (media: any) => {
    if (!media.didCancel && media.assets[0]) {
        const photo = media.assets[0];
        setPhoto(photo);       
        const resultFromUri = await MlkitOcr.detectFromUri(photo.uri); 
        console.log(resultFromUri);
    }
};

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
      <Button title={'Pick image'} onPress={onSelectImagePress} />
      {/* <Image
        resizeMode="contain"
        style=
      source=
    /> */}
    </ScrollView>);
}

export default DebugScreen;