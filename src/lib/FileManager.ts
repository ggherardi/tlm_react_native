import RNFetchBlob from 'rn-fetch-blob';

export const FileManager = {
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
  }
}