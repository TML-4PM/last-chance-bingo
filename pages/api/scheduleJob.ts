// pages/api/scheduleJob.ts
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { email, scheduleDate } = req.body;
    try {
      // In a production system, store scheduling details in your database.
      res.status(200).json({ message: `Job scheduled on ${scheduleDate} for ${email}` });
    } catch (error) {
      res.status(500).json({ error: 'Failed to schedule job.' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
