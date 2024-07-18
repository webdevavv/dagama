import { ConnectButton } from "@rainbow-me/rainbowkit";
import styles from "./Button.module.scss";
import { useEffect } from "react";
export const HeaderConnectButton = () => {
  useEffect(() => {
    const btn = document.getElementById("connect-btn");
    setTimeout(() => {
      if (btn) {
        btn.click();
      }
    }, 1000);
  }, []);

  return (
    <ConnectButton.Custom>
      {({ openConnectModal }) => {
        return (
          <button
            onClick={openConnectModal}
            type="button"
            id="connect-btn"
            className={styles.headerBtnStatus}
          >
            CONNECT WALLET
          </button>
        );
      }}
    </ConnectButton.Custom>
  );
};
