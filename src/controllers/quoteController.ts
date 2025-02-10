// src/controllers/quoteController.ts
import fs from 'fs';
import path from 'path';
import productList from '../../../public/04_productList.json';
import { prisma } from '../utils/db';
import PDFDocument from 'pdfkit';
import {
  skuMultipliers,
  jobComplexityMultipliers,
  serviceTypeMultipliers,
  environmentMultipliers,
  buildingAccessibilityMultipliers,
} from '../config/pricingConfig';

export interface Quote {
  summary: string;
  totalPrice: number;
  customerEmail: string;
  products: { sku: string; quantity: number }[];
}

interface ServiceAddons {
  networking: boolean;
  imaging: boolean;
  onsiteInstallation: boolean;
}

export interface JobDetails {
  jobComplexity: string;
  serviceType: string;
  environment: string;
  technicianTravel: boolean;
  technicianHours: number;
  travelTime: number; // in minutes
  buildingAccessibility: string;
  emergency: boolean;
  timeSlot: string;
  referralCode?: string;
}

export async function generateQuote(
  email: string,
  selectedProducts: { [sku: string]: number },
  serviceAddons: ServiceAddons,
  jobDetails: JobDetails
): Promise<Quote> {
  let summaryParts: string[] = [];
  let totalPrice = 0;
  let products: { sku: string; quantity: number }[] = [];

  // Build a lookup map from productList
  const productMap: { [sku: string]: { name: string; price: number } } = {};
  productList.forEach((category: any) => {
    category.items.forEach((product: any) => {
      productMap[product.sku] = { name: product.name, price: parseFloat(product.price) };
    });
  });

  // Process selected products with SKU-based multipliers
  for (const sku in selectedProducts) {
    const quantity = Number(selectedProducts[sku]);
    if (productMap[sku]) {
      const product = productMap[sku];
      const prefix = sku.split('-')[0];
      const skuMultiplier = skuMultipliers[prefix] || 1;
      const cost = product.price * quantity * skuMultiplier;
      summaryParts.push(`${product.name} (SKU: ${sku}) x${quantity} - $${cost.toFixed(2)}`);
      totalPrice += cost;
      products.push({ sku, quantity });
    } else {
      summaryParts.push(`Special Order - ${sku} x${quantity}`);
      products.push({ sku, quantity });
    }
  }

  // Process Service Add‑Ons
  if (serviceAddons.networking) {
    summaryParts.push('Extra Networking Setup: +$150');
    totalPrice += 150;
  }
  if (serviceAddons.imaging) {
    for (const sku in selectedProducts) {
      if (sku.startsWith('LAP-')) {
        const quantity = Number(selectedProducts[sku]);
        summaryParts.push(`Software Imaging for ${sku} x${quantity}: +$${(100 * quantity).toFixed(2)}`);
        totalPrice += 100 * quantity;
      }
    }
  }
  if (serviceAddons.onsiteInstallation) {
    summaryParts.push('On‑site Installation (applies 1.2× multiplier)');
    totalPrice *= 1.2;
  }

  // Apply additional job detail multipliers and fees
  const complexityMultiplier = jobComplexityMultipliers[jobDetails.jobComplexity] || 1;
  const serviceMultiplier = serviceTypeMultipliers[jobDetails.serviceType] || 1;
  const envMultiplier = environmentMultipliers[jobDetails.environment] || 1;
  const accessibilityMultiplier = buildingAccessibilityMultipliers[jobDetails.buildingAccessibility] || 1;

  if (jobDetails.technicianTravel) {
    summaryParts.push('Technician Travel Required: +$50');
    totalPrice += 50;
  }
  if (jobDetails.technicianHours > 0) {
    const techCost = jobDetails.technicianHours * 50;
    summaryParts.push(`Technician Hours (${jobDetails.technicianHours}h): +$${techCost.toFixed(2)}`);
    totalPrice += techCost;
  }
  if (jobDetails.travelTime > 30) {
    const extraTravel = jobDetails.travelTime - 30;
    summaryParts.push(`Extra Travel Time (${extraTravel} min): +$${extraTravel.toFixed(2)}`);
    totalPrice += extraTravel;
  }
  if (jobDetails.emergency) {
    summaryParts.push('Emergency Surcharge: +50%');
    totalPrice *= 1.5;
  }

  totalPrice *= complexityMultiplier * serviceMultiplier * envMultiplier * accessibilityMultiplier;

  if (jobDetails.referralCode && jobDetails.referralCode.trim() === 'REF123') {
    summaryParts.push('Referral Discount (10% off)');
    totalPrice *= 0.9;
  }

  summaryParts.push(`Job Complexity (${jobDetails.jobComplexity}): ×${complexityMultiplier}`);
  summaryParts.push(`Service Type (${jobDetails.serviceType}): ×${serviceMultiplier}`);
  summaryParts.push(`Environment (${jobDetails.environment}): ×${envMultiplier}`);
  summaryParts.push(`Building Accessibility (${jobDetails.buildingAccessibility}): ×${accessibilityMultiplier}`);
  if (jobDetails.timeSlot) {
    summaryParts.push(`Scheduled Time Slot: ${new Date(jobDetails.timeSlot).toLocaleString()}`);
  }

  const summary = summaryParts.join('\n');

  // Save the quote to the database
  await prisma.quote.create({
    data: {
      customerName: email,
      email,
      products: JSON.stringify(products),
      totalPrice
    },
  });

  return { summary, totalPrice, customerEmail: email, products };
}

export async function createQuotePDF(quote: Quote): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    const doc = new PDFDocument();
    const buffers: Buffer[] = [];
    doc.on('data', buffers.push.bind(buffers));
    doc.on('end', () => {
      resolve(Buffer.concat(buffers));
    });

    // PDF Branding & Compliance
    doc.fontSize(20).text('Quote', { align: 'center' });
    doc.moveDown();
    doc.fontSize(12).text(`Customer: ${quote.customerEmail}`);
    doc.text('ABN: 123456789 | Company Address: 123 Example St, City, Country');
    doc.moveDown();
    doc.text('Products:');
    quote.products.forEach((p) => {
      doc.text(`- SKU: ${p.sku} x${p.quantity}`);
    });
    doc.moveDown();
    doc.text(`Total Price: $${quote.totalPrice.toFixed(2)}`);
    doc.moveDown();
    doc.text('Summary:');
    doc.text(quote.summary);
    doc.moveDown();
    doc.text('This quote complies with current ATO requirements.');
    doc.end();
  });
}
