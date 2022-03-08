import { createStore } from 'redux';
import { finalReducer } from './reducers';
// 生成store对象
const store = createStore(
  finalReducer,
  process.env.NODE_ENV === 'development'
    // @ts-ignore
    ? window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    : '',
);

export default store;
