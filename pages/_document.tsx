// pages/_document.tsx
import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
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
