import { useSDK } from "@metamask/sdk-react";

const { sdk, connected, connecting, provider, chainId } = useSDK();

const connectAndSign = async () => {
    try {
      const signResult = await sdk?.connectAndSign({
        msg: "Connect + Sign message",
      })
      setResponse(signResult);
    } catch (err) {
      console.warn("failed to connect..", err);
    }
}

// Idk yet if this is the best way to do this or even what I want to do