import React, {ComponentClass, FC} from 'react';

type ReactComponent<T> = FC<T> | ComponentClass<T>;

export type LoadComponent<T> = () => Promise<ReactComponent<T> | { default: ReactComponent<T> }>;

type AsyncComponentState<T> = {
  isMounted: boolean;
  Component: ReactComponent<T> | null;
};

export const asyncComponent = <T extends {}>(loadComponent: LoadComponent<T>) => class AsyncComponent extends React.Component<T, AsyncComponentState<T>> {
  constructor(props: any) {
    super(props);
    this.state = {
      isMounted: false,
      Component: null,
    };
  }

  async componentDidMount() {
    const module = await loadComponent();
    if ('default' in module) {
      this.setState({isMounted: true, Component: module.default});
    } else {
      this.setState({isMounted: true, Component: module});
    }
  }

  componentWillUnmount() {
    this.setState({isMounted: false});
  }

  render() {
    const {Component, isMounted} = this.state;

    return <>{isMounted && Component && <Component {...this.props} />}</>;
  }
};
