import {
  Box,
  Button,
  Center,
  Heading,
  SimpleGrid,
  Spinner,
  useMediaQuery,
} from "@chakra-ui/react";
import { useState } from "react";
import Wallet from "./Components/Wallet";
import { ConnectButton, useActiveAccount } from "thirdweb/react";
import { alchemy, client } from "../config";
import Token from "./Components/Token";

function App() {
  const activeAccount = useActiveAccount();
  const [userAddress, setUserAddress] = useState("");
  const [results, setResults] = useState([]);
  const [hasQueried, setHasQueried] = useState(false);
  const [tokenDataObjects, setTokenDataObjects] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSmallScreen] = useMediaQuery("(max-width: 600px)");

  async function getTokenBalance() {
    setIsLoading(true);
    setHasQueried(false);
    try {
      const data = await alchemy.core.getTokenBalances(userAddress);
      setResults(data);
      const tokenDataPromises = [];
      for (let i = 0; i < data.tokenBalances.length; i++) {
        const tokenData = alchemy.core.getTokenMetadata(
          data.tokenBalances[i].contractAddress
        );
        tokenDataPromises.push(tokenData);
      }
      setTokenDataObjects(await Promise.all(tokenDataPromises));
      setHasQueried(true);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Box w="100vw" h="100vh" display="flex" flexDir="column" py={10}>
      <Box mr={isSmallScreen ? 0 : 30} pt={10} px={isSmallScreen ? 4 : 0}>
        <Wallet setUserAddress={setUserAddress} setHasQueried={setHasQueried} />
      </Box>
      <Center flexDir="column" textAlign="center" px={isSmallScreen ? 4 : 0}>
        <Heading mb={0} fontSize={isSmallScreen ? 28 : 36}>
          ERC-20 Token Indexer
        </Heading>

        <Heading mt={6} fontSize={isSmallScreen ? 18 : 24}>
          Get all the ERC-20 token balances of this address
        </Heading>

        {activeAccount ? (
          <Button
            fontSize={isSmallScreen ? 16 : 20}
            onClick={getTokenBalance}
            mt={8}
            bgColor="#045C14"
            color="#ffffff"
          >
            Get Balances
          </Button>
        ) : (
          <ConnectButton
            client={client}
            appMetadata={{
              logoUrl: "/eth.png",
            }}
            connectButton={{
              label: "Connect Wallet",
            }}
            theme={{
              colors: {
                primaryButtonBg: "#4CAF50",
                primaryButtonText: "#FFFFFF",
              },
            }}
          />
        )}

        {hasQueried && !isLoading && results.tokenBalances.length > 0 && (
          <Heading my={10} fontSize={isSmallScreen ? 20 : 24}>
            ERC-20 token balances
          </Heading>
        )}

        {!hasQueried && isLoading && (
          <Spinner my={10} thickness="4px" color="green" size="xl" />
        )}

        {hasQueried && !isLoading && results.tokenBalances.length === 0 && (
          <Center mt={6}>
            <Heading fontSize={isSmallScreen ? 16 : 20}>
              No tokens found for this address.
            </Heading>
          </Center>
        )}

        {/* ERC token Balances */}
        {hasQueried && !isLoading && results.tokenBalances.length > 0 && (
          <SimpleGrid
            w="90vw"
            spacing={6}
            minChildWidth={isSmallScreen ? "200px" : "250px"}
          >
            {results.tokenBalances.map((data, i) => {
              return (
                <Token key={i} tokenData={tokenDataObjects[i]} data={data} />
              );
            })}
          </SimpleGrid>
        )}
      </Center>
    </Box>
  );
}

export default App;
