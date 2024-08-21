import { Grid, GridItem, Image, Box, Text } from "@chakra-ui/react";
import { Utils } from "alchemy-sdk";
import PropTypes from "prop-types";
import { useMediaQuery } from "@chakra-ui/react";

const Token = ({ data, tokenData }) => {
  const [isSmallScreen] = useMediaQuery("(max-width: 600px)");
  return (
    <Grid
      h={isSmallScreen ? "100px" : "120px"}
      templateRows="repeat(2, 1fr)"
      templateColumns={isSmallScreen ? "60px 1fr" : "80px 1fr"}
      border="1px solid green"
      gap={isSmallScreen ? 0 : 1} // Reduced gap between columns for small screens
      p={isSmallScreen ? 2 : 3} // Added padding for small screens
    >
      <GridItem
        rowSpan={2}
        colSpan={1}
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Image
          src={tokenData.logo || "/eth.png"}
          alt={`${tokenData.symbol} logo`}
          boxSize={isSmallScreen ? "50px" : "60px"} // Reduced image size for small screens
          objectFit="contain"
          borderRadius="full"
          borderColor="gray.300"
        />
      </GridItem>

      <GridItem colSpan={1}>
        <Box
          h="100%"
          display="flex"
          alignItems="center"
          justifyContent="flex-start"
          ml={isSmallScreen ? 1 : 2} // Adjusted margin for small screens
        >
          <Text fontSize={isSmallScreen ? "md" : "lg"} as="b">
            {Utils.formatUnits(data.tokenBalance, tokenData.decimals)}
          </Text>
        </Box>
      </GridItem>
      <GridItem colSpan={1}>
        <Box
          h="100%"
          display="flex"
          alignItems="center"
          justifyContent="flex-start"
          ml={isSmallScreen ? 1 : 2} // Adjusted margin for small screens
        >
          <Text fontSize={isSmallScreen ? "md" : "lg"} as="b">
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
