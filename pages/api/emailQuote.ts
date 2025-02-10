// pages/api/emailQuote.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import nodemailer from 'nodemailer';
import { generateQuote, createQuotePDF } from '../../src/controllers/quoteController';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { email, selectedProducts, serviceAddons, jobDetails } = req.body;
    try {
      const quote = await generateQuote(email, selectedProducts, serviceAddons, jobDetails);
      const pdfBuffer = await createQuotePDF(quote);

      const transporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        auth: {
          user: process.env.ETHEREAL_USER || '',
          pass: process.env.ETHEREAL_PASS || ''
        }
      });

      const mailOptions = {
        from: '"Geeks2U" <no-reply@geek2u.com.au>',
        to: 'troy.latter@unisys.com',
        subject: 'Your Quote',
        text: 'Please find attached your quote.',
        attachments: [
          {
            filename: 'quote.pdf',
            content: pdfBuffer,
            contentType: 'application/pdf'
          }
        ]
      };

      let sent = false;
      let attempt = 0;
      let info;
      while (!sent && attempt < 2) {
        try {
          info = await transporter.sendMail(mailOptions);
          sent = true;
        } catch (err) {
          attempt++;
          if (attempt >= 2) throw err;
        }
      }

      res.status(200).json({ message: 'Email sent successfully!', info });
    } catch (error) {
      console.error('Email quote error:', error);
      res.status(500).json({ error: 'Failed to send email.' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
