import { createThirdwebClient } from "thirdweb";
import { Alchemy, Network } from "alchemy-sdk";

const ALCHEMY_API_KEY = import.meta.env.VITE_ALCHEMY_API_KEY;

export const client = createThirdwebClient({
  clientId: import.meta.env.VITE_THIRD_WEB_CLIENT_ID,
});

const config = {
  apiKey: ALCHEMY_API_KEY,
  network: Network.ETH_SEPOLIA,
};

export const alchemy = new Alchemy(config);
