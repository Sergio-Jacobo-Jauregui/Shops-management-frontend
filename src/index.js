import React from 'react';
import ReactDOM from 'react-dom/client';
import Home from './Home';
import Shop from './Shop';
import HistorialCompras from './HistorialCompras';
import HistorialVentas from './HistorialVentas';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

const router = createBrowserRouter([
  { 
    path: "/",
    element: <Home />,
  },
  {
    path: "shop/:shop_id",
    element: <Shop />,
  },
  {
    path: "shop/:shop_id/historial_compras",
    element: <HistorialCompras />,
  },
  {
    path: "shop/:shop_id/historial_ventas",
    element: <HistorialVentas />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render( <RouterProvider router={router} />)