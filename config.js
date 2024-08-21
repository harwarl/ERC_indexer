import { createThirdwebClient } from "thirdweb";
import { Alchemy, Network } from "alchemy-sdk";

const ALCHEMY_API_KEY = import.meta.env.VITE_ALCHEMY_API_KEY;

export const client = createThirdwebClient({
  clientId: import.meta.env.VITE_THIRD_WEB_CLIENT_ID,
});

const config = {
  apiKey: ALCHEMY_API_KEY,
  network:
    import.meta.env.VITE_NODE_ENV === "development"
      ? Network.ETH_SEPOLIA
      : Network.ETH_MAINNET,
};

export const alchemy = new Alchemy(config);
