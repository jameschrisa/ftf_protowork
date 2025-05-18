import React from "react";
import { Button } from "./ui/button";
import { AlertCircle } from "lucide-react";
import { logger } from "../lib/logger";

interface Props {
  children: React.ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends React.Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // Log error with additional context
    logger.logSystemError(error, 'Uncaught error in component').then(() => {
      // Log additional context
      logger.error('Error context', {
        componentStack: errorInfo.componentStack,
        url: window.location.href,
        path: window.location.pathname,
        userAgent: navigator.userAgent
      });
    });
  }

  private handleReload = () => {
    window.location.reload();
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="flex h-screen flex-col items-center justify-center p-4">
          <div className="flex flex-col items-center space-y-4 text-center">
            <div className="rounded-full bg-destructive/10 p-4">
              <AlertCircle className="h-12 w-12 text-destructive" />
            </div>
            <h1 className="text-4xl font-bold">Something went wrong</h1>
            <p className="max-w-md text-lg text-muted-foreground">
              We apologize for the inconvenience. The application has encountered an unexpected error.
            </p>
            <div className="flex gap-4">
              <Button onClick={this.handleReload}>
                Reload Page
              </Button>
              <Button variant="outline" onClick={() => window.location.href = "/"}>
                Go to Dashboard
              </Button>
            </div>
            {this.state.error && (
              <div className="mt-4 max-w-md rounded-lg bg-muted p-4 text-left">
                <p className="font-medium">Error details:</p>
                <p className="mt-2 text-sm text-muted-foreground break-words">
                  {this.state.error.message}
                </p>
                <p className="mt-2 text-xs text-muted-foreground">
                  Location: {window.location.pathname}
                </p>
              </div>
            )}
            <div className="mt-8 max-w-md text-sm text-muted-foreground">
              <p>If the problem persists:</p>
              <ul className="mt-2 list-disc text-left pl-4">
                <li>Clear your browser cache and cookies</li>
                <li>Check your internet connection</li>
                <li>Contact support if the issue continues</li>
              </ul>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
