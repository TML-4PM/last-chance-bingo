// pages/api/quotes-csv.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  // Construct the path to the CSV file located at project-root/logs/quotes.csv
  const csvPath = path.join(process.cwd(), 'logs', 'quotes.csv');

  // Read the CSV file from the filesystem
  fs.readFile(csvPath, 'utf8', (err, data) => {
    if (err) {
      console.error("Error reading CSV file:", err);
      res.status(500).json({ error: "Failed to read CSV file" });
      return;
    }
    res.setHeader('Content-Type', 'text/csv');
    res.status(200).send(data);
  });
}
