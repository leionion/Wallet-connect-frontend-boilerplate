import React from 'react';
import ReactDOM from 'react-dom/client';
import { Route } from 'wouter';

import Home from '@/pages/index';

import '@/styles/global.css'

const Router = () => {
  return (
    <>
      <Route path="/" component={Home} />
    </>
  )
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Router />
  </React.StrictMode>,
)
