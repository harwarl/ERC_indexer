import {
  useActiveAccount,
  useActiveWallet,
  useDisconnect,
} from "thirdweb/react";
import { useEffect } from "react";
import PropTypes from "prop-types";
import { Flex, Button } from "@chakra-ui/react";

const Wallet = ({ setUserAddress, setHasQueried }) => {
  const activeAccount = useActiveAccount();
  const wallet = useActiveWallet();
  const { disconnect } = useDisconnect();

  useEffect(() => {
    if (activeAccount?.address) {
      setUserAddress(activeAccount?.address);
    } else {
      setUserAddress(null);
    }

    return () => setUserAddress(null); // clean up
  }, [activeAccount, setUserAddress]);

  return (
    <div>
      <Flex justifyContent={"flex-end"}>
        {!activeAccount ? null : (
          <Button
            onClick={() => {
              disconnect(wallet);
              setHasQueried(false);
            }}
            mr={40}
            py={10}
            px={25}
            bgColor={"#940C3C"}
            color={"#FFFFFF"}
            _hover={"#4CAF50"}
          >
            <b>Disconnect</b>
          </Button>
        )}
      </Flex>
    </div>
  );
};

// PropTypes validation
Wallet.propTypes = {
  setUserAddress: PropTypes.func.isRequired,
  setHasQueried: PropTypes.func.isRequired,
};

export default Wallet;
