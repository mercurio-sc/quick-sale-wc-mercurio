import { Component, ReactNode } from "react";

export interface ErrorBoundaryProps {
  fallback?: ReactNode;
  message?: string;
  children?: ReactNode;
}

export interface ErrorBoundaryState {
  hasError: boolean;
}

export class ErrorBoundary extends Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error) {
    // eslint-disable-next-line no-console
    console.error(error);
  }

  render() {
    if (this.state.hasError) {
      if (typeof this.props.fallback !== "undefined")
        return this.props.fallback;

      return (
        <div className="flex items-center rounded-lg border border-danger bg-danger-50 p-4 text-danger">
          <i className="fa-regular fa-hexagon-exclamation mr-2"></i>
          <span>
            {this.props.message ?? "Hubo un error. Inténtalo más tarde."}
          </span>
        </div>
      );
    }

    return this.props.children;
  }
}
