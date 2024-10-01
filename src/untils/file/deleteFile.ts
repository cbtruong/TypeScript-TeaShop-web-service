
import * as fs from 'fs';
import * as path from 'path';

function deleteMultipleFilesOnLocal(filePaths: string[]): void {
  filePaths.forEach(filePath => {
    const absolutePath = path.resolve(filePath);

    if (fs.existsSync(absolutePath)) {
      fs.unlink(absolutePath, (err) => {
        if (err) {
          console.error(`Error deleting file ${absolutePath}: ${err}`);
        } else {
          console.log(`File ${absolutePath} deleted successfully`);
        }
      });
    } else {
      console.log(`File ${absolutePath} does not exist`);
    }
  });
}

export default deleteMultipleFilesOnLocal;

