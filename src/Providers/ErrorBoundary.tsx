import React from 'react';

class ErrorBoundary extends React.Component {
  // @ts-ignore
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error: any, errorInfo: any) {
    // You can also log the error to an error reporting service
    // eslint-disable-next-line no-use-before-define
    logErrorToMyService(error, errorInfo);
  }

  render() {
    // @ts-ignore
    // eslint-disable-next-line react/destructuring-assignment
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return <h1>Something went wrong.</h1>;
    }

    // eslint-disable-next-line react/destructuring-assignment,react/prop-types
    return this.props.children;
  }
}

export default ErrorBoundary;

function logErrorToMyService(error: any, errorInfo: any) {
  throw new Error(`Function not implemented.${error}${errorInfo}`);
}
