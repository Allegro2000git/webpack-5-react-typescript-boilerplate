import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import {App} from "./app/App";
import './app/styles/index.css';
import 'antd/dist/antd.css';

const queryClient = new QueryClient();

ReactDOM.render(
  <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <App/>
      </QueryClientProvider>
  </BrowserRouter>,
  document.getElementById("root")
);
