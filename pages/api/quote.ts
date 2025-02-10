// pages/api/quote.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { generateQuote } from '../../src/controllers/quoteController';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
    return;
  }
  try {
    const { email, selectedProducts, serviceAddons, jobDetails } = req.body;
    const quote = await generateQuote(email, selectedProducts, serviceAddons, jobDetails);
    res.status(200).json(quote);
  } catch (error: any) {
    console.error("Error generating quote:", error);
    res.status(500).json({ error: "Something went wrong: " + error.message });
  }
}
