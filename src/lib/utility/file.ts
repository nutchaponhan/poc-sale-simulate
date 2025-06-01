import * as fs from 'fs';
import * as path from 'path';

function read(filePath: string): any {
  try {
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const data = JSON.parse(fileContent);
    return data;
  } catch (error) {
    console.error(`Error load file from path:`, filePath);
    throw new Error(error);
  }
}

export function readRiderRateFile(rateFile: string): any {
  const filePath = path.join(process.cwd(), 'data', 'rider-rate', rateFile);
  const data = read(filePath);
  return data;
}
