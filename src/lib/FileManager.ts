import { PermissionsAndroid } from 'react-native';
import RNFetchBlob from 'rn-fetch-blob';
import { PromiseResult } from './models/PromiseResult';

export const FileManager = {
  checkStoragePermissions: async (): Promise<PromiseResult> => {
    return new Promise<PromiseResult>(async (resolve, reject) => {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            title: "Consenso utilizzo memoria",
            message: "Per consentire il funzionamento dell'applicazione, è necessario garantire permessi di scrittura e lettura sulla memoria del dispositivo",
            buttonPositive: "Ok"
          },
        );

        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          resolve(new PromiseResult(true, 'Permissions granted'));
        } else {
          reject(new PromiseResult(false, 'Permissions not granted'));
        }
      } catch (err) {
        reject(new PromiseResult(false, 'Exception'));
      }
    });
  },

  checkCameraPermissions: async (): Promise<PromiseResult> => {
    return new Promise<PromiseResult>(async (resolve, reject) => {
      try {
        const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.CAMERA);

        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          resolve(new PromiseResult(true, 'Permissions granted'));
        } else {
          reject(new PromiseResult(false, 'Permissions not granted'));
        }
      } catch (err) {
        reject(new PromiseResult(false, 'Exception'));
      }
    });
  },

  checkStorageReadPermissions: async(): Promise<PromiseResult> => {
    return new Promise<PromiseResult>(async (resolve, reject) => {
      try {
        const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE);

        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          resolve(new PromiseResult(true, 'Permissions granted'));
        } else {
          reject(new PromiseResult(false, 'Permissions not granted'));
        }
      } catch (err) {
        reject(new PromiseResult(false, 'Exception'));
      }
    });
  },

  checkCameraAndStoragePermissions: async (): Promise<PromiseResult> => {
    return new Promise<PromiseResult>(async (resolve, reject) => {
      try {
        const checkStoragePermissionsResult = await FileManager.checkStoragePermissions();
        const checkCameraPermissionsResult = await FileManager.checkCameraPermissions();
        
        if (checkStoragePermissionsResult.success && checkCameraPermissionsResult.success) {
          resolve(new PromiseResult(true, 'Permissions granted'));
        } else {
          reject(new PromiseResult(false, 'Permissions not granted'));
        }
      } catch (err) {
        reject(new PromiseResult(false, 'Permissions not granted'));
      }
    });
  },

  deleteFileOrFolder: (path: string) => {
    console.log("Path is: ", path);
    RNFetchBlob.fs.unlink(path)
      .then((v) => console.log(`Folder ${path} deleted (${v})`))
      .catch((err) => console.log(`Error deleting path ${path} (${err})`))
  },

  saveFromBase64: async (path: string, base64: string): Promise<boolean> => {
    return new Promise<boolean>((resolve, reject) => {
      RNFetchBlob.fs.writeFile(path, base64, 'base64')
        .then(v => {
          console.log(`Photo succesfully saved in path ${path} (${v})`);
          resolve(true);
        })
        .catch(err => {
          console.log(`Error while saving photo in path ${path} (${err})`)
          reject(false);
        })
    });
  },

  resizeImage: async () => {
    // ImageResizer
  }
}