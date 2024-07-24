import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { MetaMaskProvider } from "@metamask/sdk-react"; // does not export MetaMaskProvider? Smh docs

const root = ReactDOM.createRoot(
  document.getElementById("root")
);

root.render(
  <React.StrictMode>
    <MetaMaskProvider
      debug={false}
      sdkOptions={{
        dappMetadata: {
          name: "Auction Dapp",
          url: window.location.href,
        },
        infuraAPIKey: process.env.INFURA_API_KEY,
        // Other options
      }}
    >
      <App />
    </MetaMaskProvider>
  </React.StrictMode>
);

// Will I even use this??