import { ErrorPage } from "pages/ErrorsPages";
import React, { ErrorInfo, ReactNode, Suspense } from "react";

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
  errorMessage: string;
}

class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null, errorMessage: "" };
  }

  static getDerivedStateFromError(error: Error | null) {
    // Update state so the next render will show the fallback UI.
    if (error != null) {
      return { hasError: true, errorMessage: error.toString() || "" };
    }

    return null; // No error
  }

  componentDidCatch(error: Error | null, errorInfo: ErrorInfo) {
    if (error != null) {
      // Log error to an error reporting service like Sentry
      console.log("ErrorBoundary caught error", { error, errorInfo });
      this.setState({ error });
      // if to API logErrorToMyService(error, errorInfo);
    }
  }

  render() {
    const { hasError, error } = this.state;
    const { children } = this.props;

    if (hasError) {
      // You can render any custom fallback UI
      return (
        <Suspense fallback="">
          <ErrorPage error={error} />
        </Suspense>
      );
    }

    return children;
  }
}

export default ErrorBoundary;
