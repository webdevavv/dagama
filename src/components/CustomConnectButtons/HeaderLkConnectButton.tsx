import { ConnectButton } from "@rainbow-me/rainbowkit";
import { HeaderConnectButton } from "./HeaderConnectButton";
import styles from "./Button.module.scss";
export const HeaderLkConnectButton = () => {
  return (
    <ConnectButton.Custom>
      {({
        account,
        chain,
        openAccountModal,
        openChainModal,
        openConnectModal,
        authenticationStatus,
        mounted,
      }) => {
        // Note: If your app doesn't use authentication, you
        // can remove all 'authenticationStatus' checks
        const ready = mounted && authenticationStatus !== "loading";
        const connected =
          ready &&
          account &&
          chain &&
          (!authenticationStatus || authenticationStatus === "authenticated");
        return (
          <div
            {...(!ready && {
              "aria-hidden": true,
              style: {
                opacity: 0,
                pointerEvents: "none",
                userSelect: "none",
              },
            })}
          >
            {(() => {
              if (!connected) {
                return <HeaderConnectButton />;
              }
              if (chain.unsupported) {
                // TODO: need to get info about this peace of code
                return (
                  <button onClick={openChainModal} type="button">
                    Wrong network
                  </button>
                );
              }
              return (
                <div className={styles.buttonWrap}>
                  <button
                    onClick={openChainModal}
                    style={{ display: "flex", alignItems: "center" }}
                    type="button"
                    className={styles.chainName}
                  >
                    {chain.name}
                  </button>
                  <div className={styles.line}></div>
                  <button
                    onClick={openAccountModal}
                    type="button"
                    className={styles.accountName}
                  >
                    {account.displayName}
                  </button>
                </div>
              );
            })()}
          </div>
        );
      }}
    </ConnectButton.Custom>
  );
};
