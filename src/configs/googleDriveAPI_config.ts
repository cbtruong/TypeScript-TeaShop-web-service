
import * as fs from 'fs';
import { google } from 'googleapis';
import apikeys from '../../tea-shop-432010-c1d3f17076e0.json';
import { resolve } from 'path';
import { version } from 'mongoose';
import { auth } from '@googleapis/drive';

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
      resolve(file.data.id);
    });
  });
}

// Function to upload multiple files to Google Drive
async function uploadMultipleFiles(files: Array<{ fileName: string, filePath: string, mimeType: string }>, folderId: string) {
  try {
    const authClient = await authorize();

    const uploadPromises = files.map(file =>
      upFile(authClient, file.fileName, folderId, file.filePath, file.mimeType)
    );

    const fileIds = await Promise.all(uploadPromises);
    return fileIds;  // Return the IDs of uploaded files
  } catch (error) {
    console.error('Error uploading files:', error);
    throw error;
  }
}

// Function to delete a file from Google Drive by file_id
async function deleteFile(authClient: any, file_id: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const drive = google.drive({ version: 'v3', auth: authClient });

    drive.files.delete({ fileId: file_id }, (err: any, res: any) => {
      if (err) {
        reject(`Error deleting file: ${err}`);
      } else {
        resolve();
      }
    });
  });
}

async function deleteMultipleFiles(fileIds: Array<string>) {
  try {
    const authClient = await authorize();

    const deletePromises = fileIds.map(id =>
      deleteFile(authClient, id)
    );

    await Promise.all(deletePromises);
  } catch (error) {
    console.error('Error uploading files:', error);
    throw error;
  }
}

// Combined function to authorize and upload multiple files
async function uploadToDrive(files: Array<{ fileName: string, filePath: string, mimeType: string }>, folderId: string) {
  try {
    const file_ids = await uploadMultipleFiles(files, folderId);
    return file_ids;
  } catch (error) {
    console.error('Error uploading files:', error);
  }
}

// Function to delete a file from Google Drive
async function deleteOnDrive(fileIds: Array<string>): Promise<void> {
  try {
    await deleteMultipleFiles(fileIds);
    console.log(`File with ID ${fileIds} deleted successfully.`);
  } catch (error) {
    console.error('Error deleting file:', error);
  }
}
const FOLDER_ID = {
  uploads: "12bKnrC5v1TCToklN3QT8bE4hRQLgxJ88"
}

export {
  uploadToDrive, deleteOnDrive, FOLDER_ID
}
