import React from 'react';
import ReactDOM from 'react-dom/client';
import { Theme } from "@radix-ui/themes";

import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <Theme
      accentColor="blue"
      grayColor="gray"
      panelBackground="solid"
      scaling="100%"
      radius="full"
      appearance="dark"
    >
      <App />
    </Theme>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
