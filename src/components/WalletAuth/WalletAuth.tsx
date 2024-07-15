import type { NextPage } from "next";
import { useState } from "react";
import { setJWT } from "../../stores/setJWT-store";

import { useRouter } from "next/navigation";

interface IWalletAuthProps {
  isConnected: boolean;
  address: string | undefined;
}

const WalletAuth: NextPage<IWalletAuthProps> = ({ isConnected, address }) => {
  const [code, setCode] = useState("");
  const [codeStatus, setCodeStatus] = useState<boolean>(true);
  const [messageErr, setMessageErr] = useState<null | string>(null);
  const jwt = setJWT((state) => state.jwtToken);

  const router = useRouter();
  const path = `${
    process.env.NEXT_PUBLIC_REQUEST_SERVER_PATH as string
  }/assets/components/dga/conector_jwt.php`;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCode(code + e.target.value);
    e.target.addEventListener("keyup", (key: any) => {
      if (key.key && key.key != "Backspace") {
        let input = document.querySelectorAll(".w-input");
        let inputNumber: number = parseInt(e.target.name);
        for (let i = 0; i < input.length; i++) {
          if (input[inputNumber + 1]) {
            (input[inputNumber + 1] as HTMLElement).focus();
          }
        }
      } else if (key.key == "Backspace") {
        let input = document.querySelectorAll(".w-input");
        let inputNumber: number = parseInt(e.target.name);
        for (let i = 0; i < input.length; i++) {
          if (input[inputNumber - 1]) {
            (input[inputNumber - 1] as HTMLElement).focus();
            setCode(code.slice(0, -1));
          }
          if (inputNumber === 0) {
            setCode("");
          }
        }
      }
    });
  };

  const handleBtnAuth = () => {
    if (isConnected && address) {
      if (code.length < 6) {
        setMessageErr(
          "Code you’ve entered is incomplete. Please enter remaining symbols. "
        );
        setCodeStatus(false);
        console.log("btn push", codeStatus, messageErr);

        return false;
      }
      if (code.length === 0) {
        setMessageErr(
          "Code you’ve entered is incomplete. Please enter remaining symbols. "
        );
        setCodeStatus(false);
        console.log("btn push", codeStatus);
        return false;
      }
      sendAddInvite(address);
      setCode("");
    }
  };

  const sendAddInvite = async (walletAddress: string) => {
    const response = await fetch(path, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        request: "addInvite",
        invite_code: code,
        address: walletAddress,
        JWT: jwt,
      }),
    });
    const responseData = await response.json();

    if (!responseData.success) {
      setCodeStatus(false);
      throw new Error("Failed to send wallet address");
    }
    console.log(responseData);

    setCodeStatus(true);
    router.push("/referal-program");
  };

  return (
    <div className="hero-stack">
      <div className="container">
        <div className="header-1 center">Early access airdrop</div>
        <div className="desc desc-center">
          Enter your invite code to claim your drop
        </div>
        <div className="form-block w-form">
          <div id="invite_code_form" className="form">
            <div className="fields">
              <input
                className="input w-input"
                data-number-code-input="0"
                maxLength={1}
                name="0"
                placeholder="•"
                type="text"
                onChange={(e) => handleChange(e)}
              />
              <input
                className="input w-input"
                data-number-code-input="1"
                maxLength={1}
                name="1"
                placeholder="•"
                type="text"
                onChange={(e) => handleChange(e)}
              />
              <input
                className="input w-input"
                data-number-code-input="2"
                maxLength={1}
                name="2"
                placeholder="•"
                type="text"
                onChange={(e) => handleChange(e)}
              />
              <input
                className="input w-input"
                data-number-code-input="3"
                maxLength={1}
                name="3"
                placeholder="•"
                type="text"
                onChange={(e) => handleChange(e)}
              />
              <input
                className="input w-input"
                data-number-code-input="4"
                maxLength={1}
                name="4"
                placeholder="•"
                type="text"
                onChange={(e) => handleChange(e)}
              />
              <input
                className="input w-input"
                data-number-code-input="5"
                maxLength={1}
                name="5"
                placeholder="•"
                type="text"
                onChange={(e) => handleChange(e)}
              />
            </div>

            {codeStatus === false ? (
              <div className="form-code__res w-form-fail">
                <div>{messageErr}</div>
              </div>
            ) : null}

            <div className="div-block-6">
              <button
                data-wait="Please wait..."
                className="button-green w-button send_invite"
                onClick={() => handleBtnAuth()}
              >
                {" "}
                Enter invite code
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WalletAuth;
