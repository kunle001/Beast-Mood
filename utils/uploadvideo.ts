import https from "https"
import fs from "fs"

const REGION = 'Europe'; // If German region, set this to an empty string: ''
const BASE_HOSTNAME = 'storage.bunnycdn.com';
const HOSTNAME = REGION ? `${REGION}.${BASE_HOSTNAME}` : BASE_HOSTNAME;
const STORAGE_ZONE_NAME = 'Falkenstein';
const FILENAME_TO_UPLOAD = 'filenameyouwishtouse.txt';
const FILE_PATH = '/path/to/your/file/upload.txt';
const ACCESS_KEY = '7c6698fe-675e-4896-a97e46781eaf-ed28-4076';

const uploadFile = async () => {
  const readStream = fs.createReadStream(FILE_PATH);

  const options = {
    method: 'PUT',
    host: HOSTNAME,
    path: `/${STORAGE_ZONE_NAME}/${FILENAME_TO_UPLOAD}`,
    headers: {
      AccessKey: ACCESS_KEY,
      'Content-Type': 'application/octet-stream',
    },
  };

  const req = https.request(options, (res) => {
    res.on('data', (chunk) => {
      console.log(chunk.toString('utf8'));
    });
  });

  req.on('error', (error) => {
    console.error(error);
  });

  readStream.pipe(req);
};

const main = async () => {
  await uploadFile();
};

main();
