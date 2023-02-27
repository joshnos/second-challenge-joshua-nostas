import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { store } from './app/store'
import { Provider } from 'react-redux'
import { retrievePosts } from "./features/posts/postsSlice"

const root = ReactDOM.createRoot(document.getElementById('root'));
store.dispatch(retrievePosts());
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
