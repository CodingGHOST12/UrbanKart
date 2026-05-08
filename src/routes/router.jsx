/* eslint-disable react-refresh/only-export-components */
import { createBrowserRouter } from "react-router-dom";

import { lazy, Suspense } from "react";

const App = lazy(() => import("../App"));

const ProductDetail = lazy(
  () => import("../components/ProductDetail/ProductDetail"),
);

const Cart = lazy(() => import("../components/Cart/Cart"));

const Checkout = lazy(() => import("../components/Checkout/Checkout"));

const NotFound = lazy(() => import("../components/NotFound/NotFound"));

const Loader = () => <h1 style={{ padding: "40px" }}>Loading...</h1>;

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Suspense fallback={<Loader />}>
        <App />
      </Suspense>
    ),
  },

  {
    path: "/product/:id",
    element: (
      <Suspense fallback={<Loader />}>
        <ProductDetail />
      </Suspense>
    ),
  },

  {
    path: "/cart",
    element: (
      <Suspense fallback={<Loader />}>
        <Cart />
      </Suspense>
    ),
  },

  {
    path: "/checkout",
    element: (
      <Suspense fallback={<Loader />}>
        <Checkout />
      </Suspense>
    ),
  },

  {
    path: "*",
    element: (
      <Suspense fallback={<Loader />}>
        <NotFound />
      </Suspense>
    ),
  },
]);

export default router;
