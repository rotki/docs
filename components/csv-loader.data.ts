import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, URL } from 'node:url';
import Papa from 'papaparse';
import { defineLoader } from 'vitepress';

// Absolute glob so resolution does not depend on cwd or the loader's location
// (VitePress 2 resolves relative watch globs against the loader file's directory).
const csvGlob = fileURLToPath(new URL('../public/files/*.csv', import.meta.url));

export interface CsvData {
  headers: string[];
  rows: string[][];
}

export type CsvDataRecord = Record<string, CsvData>;

declare const data: CsvDataRecord;

export { data };

export default defineLoader({
  watch: [csvGlob],
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
