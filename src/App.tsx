import React, {useEffect} from 'react';
import './App.css';
import CustomRouter from './Router/CustomRouter';
import store from './Redux/store';
import {Provider} from "react-redux";
import ErrorBoundary from "./Router/ErrorBoundary";

function App() {
    const height = window.innerHeight
    useEffect(()=>{
        const content = document.getElementById('root')
        if(content){
            content.style.height = height+'px'
        }
    },[height])
      return <ErrorBoundary>
          <Provider store={store} >
              <CustomRouter/>
          </Provider>
      </ErrorBoundary>

}

export default App;
