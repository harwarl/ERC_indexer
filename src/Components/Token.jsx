import { Grid, GridItem, Image, Box, Text } from "@chakra-ui/react";
import { Utils } from "alchemy-sdk";
import PropTypes from "prop-types";

const Token = ({ data, tokenData }) => {
  return (
    <Grid
      h="200px"
      templateRows={"repeat(2, 1fr)"}
      templateColumns={"repeat(3, 1fr)"}
      gap={10}
    >
      <GridItem
        rowSpan={2}
        colSpan={1}
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Image
          src={tokenData.logo || "../public/eth.png"}
          alt={`${tokenData.symbol} logo`}
          boxSize="100px"
          objectFit="contain"
          borderRadius="full"
          borderColor="gray.300"
        />
      </GridItem>

      <GridItem colSpan={2}>
        <Box
          h="100%"
          display={"flex"}
          alignItems={"center"}
          justifyContent={"center"}
          p={1}
        >
          <Text fontSize="xl" as={"b"}>
            {Utils.formatUnits(data.tokenBalance, tokenData.decimals)}
          </Text>
        </Box>
      </GridItem>
      <GridItem colSpan={2}>
        <Box
          h="100%"
          display={"flex"}
          alignItems={"center"}
          justifyContent={"center"}
          p={2}
        >
          <Text fontSize="xl" as={"b"}>
            {tokenData.symbol}
          </Text>
        </Box>
      </GridItem>
    </Grid>
  );
};

Token.propTypes = {
  data: PropTypes.object.isRequired,
  tokenData: PropTypes.object.isRequired,
};

export default Token;
