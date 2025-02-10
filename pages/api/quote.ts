// pages/api/quote.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { generateQuote } from '../../src/controllers/quoteController';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { email, selectedProducts, serviceAddons, jobDetails } = req.body;
    try {
      const quote = await generateQuote(email, selectedProducts, serviceAddons, jobDetails);
      res.status(200).json(quote);
    } catch (error) {
      console.error('Quote generation error:', error);
      res.status(500).json({ error: 'Failed to generate quote.' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
