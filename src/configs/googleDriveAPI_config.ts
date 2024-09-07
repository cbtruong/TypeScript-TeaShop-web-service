
import * as fs from 'fs';
import { google } from 'googleapis';
import apikeys from '../../tea-shop-432010-05fa8b637a8b.json';

const SCOPE = ['https://www.googleapis.com/auth/drive'];

// Function to authorize Google Drive API access
async function authorize() {
  const jwtClient = new google.auth.JWT(
    apikeys.client_email,
    undefined,
    apikeys.private_key,
    SCOPE
  );

  await jwtClient.authorize();
  return jwtClient;
}

// Function to upload a file to Google Drive
async function upFile(authClient: any, fileName: string, folderId: string, filePath: string, mimeType: string) {
  return new Promise((resolve, reject) => {
    const drive = google.drive({ version: 'v3', auth: authClient });

    const fileMetaData = {
      name: fileName,
      parents: [folderId]
    };

    drive.files.create({
      requestBody: fileMetaData,
      media: {
        body: fs.createReadStream(filePath),
        mimeType: mimeType
      },
      fields: 'id'
    }, (error: Error | null, file: any) => {
      if (error) {
        return reject(error);
      }
      resolve(file);
    });
  });
}

// Combined function to authorize and upload a file
async function uploadToDrive(fileName: string, folderId: string, filePath: string, mimeType: string) {
  try {
    const authClient = await authorize();
    const file = await upFile(authClient, fileName, folderId, filePath, mimeType);
    console.log('File uploaded successfully:');
  } catch (error) {
    console.error('Error uploading file:', error);
  }
}


export {
  uploadToDrive
}
