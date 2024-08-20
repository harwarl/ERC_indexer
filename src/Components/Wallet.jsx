import {
  ConnectButton,
  useActiveAccount,
  useActiveWallet,
  useDisconnect,
} from "thirdweb/react";
import { useEffect } from "react";
import { client } from "../../config";
import PropTypes from "prop-types";
import { Flex, Button } from "@chakra-ui/react";

const Wallet = ({ setUserAddress }) => {
  const activeAccount = useActiveAccount();
  const wallet = useActiveWallet();
  const { disconnect } = useDisconnect();

  useEffect(() => {
    if (activeAccount?.address) {
      setUserAddress(activeAccount?.address);
    }
    {
      setUserAddress(null);
    }

    return () => setUserAddress(null); //clean up
  }, [activeAccount, setUserAddress]);

  return (
    <div>
      <>
        <Flex justifyContent={"flex-end"}>
          {!activeAccount ? (
            <ConnectButton
              client={client}
              connectButton={{
                label: "Connect Wallet",
              }}
            />
          ) : (
            <Button onClick={() => disconnect(wallet)}>Disconnect</Button>
          )}
        </Flex>
      </>
    </div>
  );
};

// PropTypes validation
Wallet.propTypes = {
  setUserAddress: PropTypes.func.isRequired,
};

export default Wallet;
