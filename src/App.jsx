import {
  Box,
  Button,
  Center,
  Flex,
  Heading,
  Image,
  // Input,
  SimpleGrid,
  // Text,
} from "@chakra-ui/react";
import { Utils } from "alchemy-sdk";
import { useState } from "react";
import Wallet from "./Components/Wallet";
import { alchemy } from "../config";

function App() {
  const [userAddress, setUserAddress] = useState("");
  const [results, setResults] = useState([]);
  const [hasQueried, setHasQueried] = useState(false);
  const [tokenDataObjects, setTokenDataObjects] = useState([]);

  async function getTokenBalance() {
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
  }

  return (
    <Box w={"100vw"} h={"100vh"} display={"flex"} flexDir={"column"} py={10}>
      <Box mr={30} pt={10}>
        <Wallet setUserAddress={setUserAddress} />
      </Box>
      <Box>
        <Flex
          alignItems="center"
          justifyContent="center"
          flexDirection="column"
        >
          <Heading mb={0} fontSize={36}>
            ERC-20 Token Indexer
          </Heading>
          {/* <Text>
            Plug in an address and this website will return all of its ERC-20
            token balances
          </Text> */}
        </Flex>

        <Flex
          w="100%"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
        >
          <Heading mt={42}>
            Get all the ERC-20 token balances of this address
          </Heading>
          {/* <Input
          onChange={(e) => {
            setUserAddress(e.target.value);
          }}
          color="black"
          w="600px"
          textAlign="center"
          p={4}
          bgColor="white"
          fontSize={24}
        /> */}

          <Button
            fontSize={20}
            onClick={getTokenBalance}
            mt={36}
            bgColor={"blue"}
          >
            Check ERC-20 Token Balances
          </Button>

          <Heading my={36}>ERC-20 token balances:</Heading>

          {hasQueried ? (
            <SimpleGrid w={"90vw"} columns={3} spacing={24}>
              {results.tokenBalances.map((data, i) => {
                return (
                  <Flex
                    flexDir={"column"}
                    color={"white"}
                    border={"red 1px solid"}
                    bg={"blue"}
                    w={"20vw"}
                    p={10}
                    borderRadius={5}
                    key={data.id}
                  >
                    <Box>
                      <b>Symbol:</b> ${tokenDataObjects[i].symbol}&nbsp;
                    </Box>
                    <Box>
                      <b>Balance:</b>&nbsp;
                      {Utils.formatUnits(
                        data.tokenBalance,
                        tokenDataObjects[i].decimals
                      )}
                    </Box>
                    <Image src={tokenDataObjects[i].logo} />
                  </Flex>
                );
              })}
            </SimpleGrid>
          ) : (
            "Please make a query! This may take a few seconds..."
          )}
        </Flex>
      </Box>
    </Box>
  );
}

export default App;
