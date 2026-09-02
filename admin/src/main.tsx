import React from 'react';
import { createRoot } from 'react-dom/client';
import '../../src/index.css';
import './admin.css';
import AdminApp from './AdminApp';

const root = createRoot(document.getElementById('root')!);
root.render(
  <React.StrictMode>
    <AdminApp />
  </React.StrictMode>
);
