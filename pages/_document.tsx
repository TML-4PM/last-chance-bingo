// pages/_document.tsx
import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
        {/* <!-- T4H-BRAND-INJECT v1 group=G5 */}
        <link rel="icon" type="image/png" sizes="32x32" href="https://lzfgigiyqpuuxslsygjt.supabase.co/storage/v1/object/public/images/t4h-icon.png" />
        <link rel="icon" type="image/x-icon" href="https://lzfgigiyqpuuxslsygjt.supabase.co/storage/v1/object/public/images/t4h-icon.ico" />
        <link rel="apple-touch-icon" href="https://lzfgigiyqpuuxslsygjt.supabase.co/storage/v1/object/public/images/t4h-icon.png" />
        <meta property="og:image" content="https://lzfgigiyqpuuxslsygjt.supabase.co/storage/v1/object/public/images/t4h-icon.png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:image" content="https://lzfgigiyqpuuxslsygjt.supabase.co/storage/v1/object/public/images/t4h-icon.png" />
        {/* /T4H-BRAND-INJECT */}
          <link rel="manifest" href="/manifest.json" />
          <meta name="theme-color" content="#ffffff" />
          <meta name="description" content="The most well-thought-out IT job pricing calculator!" />
          {/* Open Graph / Facebook */}
          <meta property="og:title" content="Job Pricing Calculator" />
          <meta property="og:description" content="Calculate your IT job pricing with ease." />
          <meta property="og:image" content="/assets/officeworks-logo.png" />
          <meta property="og:url" content="https://your-deployed-app.vercel.app" />
          <meta property="og:type" content="website" />
          {/* Twitter Card */}
          <meta name="twitter:card" content="summary_large_image" />
          {/* Google Analytics (placeholder) */}
          <script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
          <script
            dangerouslySetInnerHTML={{
              __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'GA_MEASUREMENT_ID', { page_path: window.location.pathname });
            `
            }}
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
