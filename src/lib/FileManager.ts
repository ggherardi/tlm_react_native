import RNFetchBlob from 'rn-fetch-blob';

export const FileManager = {
  deleteFolder: (path: string) => {
    console.log("Path is: ", path);
    RNFetchBlob.fs.unlink(path)
      .then((v) => console.log(`Folder ${path} deleted (${v})`))
      .catch((err) => console.log(`Error deleting path ${path} (${err})`))
  }
}