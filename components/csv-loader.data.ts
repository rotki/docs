import fs from 'node:fs';
import path from 'node:path';
import Papa from 'papaparse';
import { defineLoader } from 'vitepress';

export interface CsvData {
  headers: string[];
  rows: string[][];
}

export type CsvDataRecord = Record<string, CsvData>;

declare const data: CsvDataRecord;

export { data };

export default defineLoader({
  watch: ['public/files/*.csv'],
  async load(watchedFiles): Promise<CsvDataRecord> {
    const data: CsvDataRecord = {};

    for (const filePath of watchedFiles) {
      const csvContent = fs.readFileSync(filePath, 'utf-8');
      const parsed: { data: string[][] } = Papa.parse(csvContent);

      const publicPath = `/files/${path.basename(filePath)}`;

      data[publicPath] = {
        headers: parsed.data[0],
        rows: parsed.data.slice(1).filter((row: string[]) => row.some(cell => cell)),
      };
    }

    return data;
  },
});
