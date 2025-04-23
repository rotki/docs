import fs from 'node:fs';
import path from 'node:path';
import Papa from 'papaparse';

interface CsvData {
  headers: string[];
  rows: string[][];
}

export default {
  watch: ['public/files/*.csv'], // Watch for changes in CSV files
  async load(watchedFiles: string[]) {
    const data: Record<string, CsvData> = {};

    for (const filePath of watchedFiles) {
      const csvContent = fs.readFileSync(filePath, 'utf-8');
      const parsed = Papa.parse(csvContent);

      // Convert absolute path to public URL path
      const publicPath = `/files/${path.basename(filePath)}`;

      data[publicPath] = {
        headers: parsed.data[0],
        rows: parsed.data.slice(1).filter(row => row.some(cell => cell)), // Filter empty rows
      };
    }

    return data;
  },
};
