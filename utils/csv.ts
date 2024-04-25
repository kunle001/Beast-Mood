import * as fs from "fs";
import csvParser from "csv-parser";

interface CSVRow {
  [key: string]: string;
}

export async function csvToJson(csvFilePath: string): Promise<any[]> {
  const jsonArray: any[] = [];

  return new Promise((resolve, reject) => {
    fs.createReadStream(csvFilePath)
      .pipe(csvParser())
      .on("data", (row: CSVRow) => {
        jsonArray.push(row);
      })
      .on("end", () => {
        resolve(jsonArray);
      })
      .on("error", (error: any) => {
        reject(error);
      });
  });
}

// Example usage:
csvToJson("email.csv")
  .then((jsonArray: any[]) => {
    console.log(jsonArray); // Process the JSON array as needed
  })
  .catch((error: any) => {
    console.error("Error converting CSV to JSON:", error);
  });
