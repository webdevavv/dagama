import React, { useState, useEffect, useRef, Suspense } from "react";
import { setJWT } from "../../stores/setJWT-store";
import { setInviteState } from "../../stores/setInviteState-store";
import { useRouter } from "next/navigation";

interface Props {
  initialCode?: string | null; // Corrected type
  isConnected: boolean;
  address: string | undefined;
}

const CodeInput: React.FC<Props> = ({ initialCode, isConnected, address }) => {
  const [code, setCode] = useState("");
  const [codeStatus, setCodeStatus] = useState<boolean>(true);
  const [messageErr, setMessageErr] = useState<null | string>(null);
  const jwt = setJWT((state) => state.jwtToken);
  const setInviteStatus = setInviteState((state) => state.setInviteState);
  const inputRefs = useRef<HTMLInputElement[]>([]); // Corrected type

  const handleInputChange = (index: number, value: string) => {
    setCode(code.substring(0, index) + value + code.substring(index + 1));

    if (value && index < 5) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleBackspace = (index: number) => {
    if (index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  useEffect(() => {
    if (initialCode) {
      setCode(initialCode.substring(0, 6));
    }
  }, [initialCode]);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    const allowedChars = /^[0-9a-zA-Z]+$/;
    if (!allowedChars.test(event.key as string)) {
      // Corrected type
      event.preventDefault();
    }
  };

  const router = useRouter();

  const path = process.env.NEXT_PUBLIC_REQUEST_SERVER_PATH as string;

  // const path =
  //   "https://devmy.dagama.world/assets/components/dga/conector_jwt.php";

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
      setInviteStatus("soc_conect");
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
    <>
      <Suspense fallback={<div className="container">Getting code...</div>}>
        <div className="code-input">
          <div className="hero-stack">
            <div className="container">
              <div className="header-1 center">Early access airdrop</div>
              <div className="desc desc-center">
                Enter your invite code to claim your drop
              </div>
              <div className="form-block w-form">
                <div id="invite_code_form" className="form">
                  <div className="fields">
                    {Array.from({ length: 6 }, (_, i) => (
                      <input
                        key={i}
                        type="text"
                        className="input w-input"
                        maxLength={1}
                        // @ts-ignore
                        ref={(el) => (inputRefs.current[i] = el)}
                        value={code[i] || ""}
                        onChange={(e) => handleInputChange(i, e.target.value)}
                        onKeyDown={handleKeyDown}
                        onKeyUp={(e) => {
                          if (e.key === "Backspace") {
                            handleBackspace(i);
                          }
                        }}
                      />
                    ))}
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
        </div>
      </Suspense>
    </>
  );
};

export default CodeInput;
