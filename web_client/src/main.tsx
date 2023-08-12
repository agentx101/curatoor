import "@rainbow-me/rainbowkit/styles.css";
import { RainbowKitProvider } from "@rainbow-me/rainbowkit";
import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider, createRoutesFromElements, Route } from "react-router-dom"
import { WagmiConfig } from "wagmi";
import Root from "./layouts/root"

import { Home } from "./pages/Home";
import { Collections } from "./pages/Collections";
import { Collection } from "./pages/Collection";
import { chains, config } from "./wagmi";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Root />}>
      <Route index element={<Home />} />
      <Route path="/users/:id" element={<Home />} />
      <Route path="/users/:id/collections/" element={<Collections />} />
      <Route path="/users/:userId/collections/:id" element={<Collection />} />
    </Route>
  ))

/**
 * Root providers and initialization of app
 * @see https://reactjs.org/docs/strict-mode.html
 * @see https://wagmi.sh/react/WagmiConfig
 * @see https://www.rainbowkit.com/docs/installation
 */
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <WagmiConfig config={config}>
      <RainbowKitProvider chains={chains}>
        <RouterProvider router={router} />
      </RainbowKitProvider>
    </WagmiConfig>
  </React.StrictMode>,
);
