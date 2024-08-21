import {
  Box,
  Button,
  Center,
  Heading,
  SimpleGrid,
  Spinner,
  // Text,
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

  async function getTokenBalance() {
    setIsLoading(true);
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
    <Box w={"100vw"} h={"100vh"} display={"flex"} flexDir={"column"} py={10}>
      <Box mr={30} pt={10}>
        <Wallet setUserAddress={setUserAddress} setHasQueried={setHasQueried} />
      </Box>
      <Center flexDir={"column"}>
        <Heading mb={0} fontSize={36}>
          ERC-20 Token Indexer
        </Heading>

        <Heading mt={42}>
          Get all the ERC-20 token balances of this address
        </Heading>

        {activeAccount ? (
          <Button
            fontSize={20}
            onClick={getTokenBalance}
            mt={36}
            bgColor={"#045C14"}
            color={"#ffffff"}
          >
            Check ERC-20 Token Balances
          </Button>
        ) : (
          <ConnectButton
            client={client}
            appMetadata={{
              logoUrl: "../../public/eth.png",
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
          <Heading my={20}>ERC-20 token balances</Heading>
        )}

        {!hasQueried && isLoading && (
          <Spinner my={40} thickness="4px" color="blue.500" size="xl" />
        )}

        {hasQueried && !isLoading && results.tokenBalances.length === 0 && (
          <Center mt={6}>
            <Heading fontSize="lg">No tokens found for this address.</Heading>
          </Center>
        )}

        {/* ERC token Balances */}
        {hasQueried && !isLoading && results.tokenBalances.length > 0 && (
          <SimpleGrid w="90vw" spacing={6} minChildWidth="250px">
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
