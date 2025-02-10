// pages/api/products.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import productList from '../../public/04_productList.json';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  res.status(200).json(productList);
}
