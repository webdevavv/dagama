import { ConnectButton } from "@rainbow-me/rainbowkit";
export const CustomConnectButton = () => {
  return (
    <ConnectButton.Custom>
      {({ openConnectModal }) => {
        return (
          <button
            onClick={openConnectModal}
            type="button"
            className="custom-btn w-button"
          >
            Join early access
          </button>
        );
      }}
    </ConnectButton.Custom>
  );
};
