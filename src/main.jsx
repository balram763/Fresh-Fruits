// import React from 'react'
// import ReactDOM from 'react-dom/client'
// import App from './App.jsx'
// import './index.css'
// import { Provider } from './providers/ShoppingContext.jsx'
// import { Toaster } from 'react-hot-toast';

// ReactDOM.createRoot(document.getElementById('root')).render(
  

//   <Provider>
    
//     <App />
//     <Toaster />
//   </Provider>,
// )


import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Provider } from './providers/ShoppingContext.jsx'
import { Toaster } from 'react-hot-toast';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')).render(
  <QueryClientProvider client={queryClient}>
    <Provider>
      <App />
      <Toaster />
    </Provider>
  </QueryClientProvider>
);
