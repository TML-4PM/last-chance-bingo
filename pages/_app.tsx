// pages/_app.tsx
import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { ThemeProvider } from 'next-themes';
import ErrorBoundary from '../src/components/ErrorBoundary';
import Layout from '../src/components/Layout';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Sentry and Google Analytics initialization placeholders:
if (process.env.NEXT_PUBLIC_SENTRY_DSN) {
  // Example: import * as Sentry from '@sentry/nextjs';
  // Sentry.init({ dsn: process.env.NEXT_PUBLIC_SENTRY_DSN });
}

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider attribute="class">
      <ErrorBoundary>
        <Layout>
          <Component {...pageProps} />
        </Layout>
        <ToastContainer position="top-right" autoClose={5000} />
      </ErrorBoundary>
    </ThemeProvider>
  );
}

export default MyApp;
