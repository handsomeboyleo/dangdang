import React from 'react';
import './App.css';
import CustomRouter from './Router/CustomRouter';
import store from './Redux/store';
import {Provider} from "react-redux";

function App() {
  return (
      <Provider store={store} >
        <CustomRouter/>
      </Provider>
  );
}

export default App;
