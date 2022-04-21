import React, { FC } from 'react';
import { Provider } from 'react-redux';
import AuthProvider from './AuthProvider';
import SuperSocketProvider from './SuperSocketProvider';
import store from '../Redux/store';

const MultiProvider: FC = ({ children }) => (
  <Provider store={store}>
    <AuthProvider>
      <SuperSocketProvider>
        {children}
      </SuperSocketProvider>
    </AuthProvider>
  </Provider>
);
export default MultiProvider;
