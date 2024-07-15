import { ConnectButton } from "@rainbow-me/rainbowkit";
import styles from "./Button.module.scss";
export const HeaderConnectButton = () => {
  return (
    <ConnectButton.Custom>
      {({ openConnectModal }) => {
        return (
          <button
            onClick={openConnectModal}
            type="button"
            className={styles.headerBtnStatus}
          >
            CONNECT WALLET
          </button>
        );
      }}
    </ConnectButton.Custom>
  );
};
