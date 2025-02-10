// pages/admin/index.tsx
import { GetServerSideProps } from 'next';
import { prisma } from '../../src/utils/db';

interface QuoteProps {
  quotes: {
    id: number;
    customerName: string;
    email: string;
    products: string;
    totalPrice: number;
    createdAt: string;
  }[];
}

export default function Admin({ quotes }: QuoteProps) {
  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Admin Dashboard</h1>
      <table className="min-w-full border">
        <thead>
          <tr className="bg-gray-200">
            <th className="border px-4 py-2">ID</th>
            <th className="border px-4 py-2">Customer</th>
            <th className="border px-4 py-2">Email</th>
            <th className="border px-4 py-2">Products</th>
            <th className="border px-4 py-2">Total Price</th>
            <th className="border px-4 py-2">Created At</th>
          </tr>
        </thead>
        <tbody>
          {quotes.map((quote) => (
            <tr key={quote.id}>
              <td className="border px-4 py-2">{quote.id}</td>
              <td className="border px-4 py-2">{quote.customerName}</td>
              <td className="border px-4 py-2">{quote.email}</td>
              <td className="border px-4 py-2">{quote.products}</td>
              <td className="border px-4 py-2">${quote.totalPrice.toFixed(2)}</td>
              <td className="border px-4 py-2">{new Date(quote.createdAt).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  const quotes = await prisma.quote.findMany({ orderBy: { createdAt: 'desc' } });
  return { props: { quotes: JSON.parse(JSON.stringify(quotes)) } };
};
