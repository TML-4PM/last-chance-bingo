// src/components/ErrorBoundary.tsx
import React, { ErrorInfo } from 'react';

interface Props {
  children: React.ReactNode;
}

interface State {
  hasError: boolean;
}

class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }
  
  static getDerivedStateFromError(error: Error) {
    return { hasError: true };
  }
  
  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("ErrorBoundary caught an error", error, errorInfo);
    // Here you could integrate with Sentry or another error logging service.
  }
  
  render() {
    if (this.state.hasError) {
      return <h1 className="text-center text-red-500">Something went wrong.</h1>;
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
