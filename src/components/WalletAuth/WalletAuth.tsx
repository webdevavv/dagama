import type { NextPage } from "next";
import { useState } from "react";
import { setJWT } from "../../stores/setJWT-store";

import { useRouter } from "next/navigation";

interface IWalletAuthProps {
  isConnected: boolean;
  address: string | undefined;
}

const forbList = [
  "а",
  "б",
  "в",
  "г",
  "д",
  "е",
  "ё",
  "ж",
  "з",
  "и",
  "й",
  "к",
  "л",
  "м",
  "н",
  "о",
  "п",
  "р",
  "с",
  "т",
  "у",
  "ф",
  "х",
  "ц",
  "ч",
  "ш",
  "щ",
  "ъ",
  "ы",
  "ь",
  "э",
  "ю",
  "я",
  "А",
  "Б",
  "В",
  "Г",
  "Д",
  "Е",
  "Ë",
  "Ж",
  "З",
  "И",
  "К",
  "Л",
  "М",
  "Н",
  "О",
  "П",
  "Р",
  "С",
  "Т",
  "У",
  "Ф",
  "Х",
  "Ц",
  "Ч",
  "Ш",
  "Щ",
  "Ъ",
  "Ы",
  "Ь",
  "Э",
  "Ю",
  "Я",
];

const abs = [
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "0",
  "A",
  "a",
  "B",
  "b",
  "C",
  "c",
  "D",
  "d",
  "E",
  "e",
  "F",
  "f",
  "G",
  "g",
  "H",
  "h",
  "I",
  "i",
  "J",
  "j",
  "K",
  "k",
  "L",
  "l",
  "M",
  "m",
  "N",
  "n",
  "O",
  "o",
  "P",
  "p",
  "Q",
  "q",
  "R",
  "r",
  "S",
  "s",
  "T",
  "t",
  "U",
  "u",
  "V",
  "v",
  "W",
  "w",
  "X",
  "x",
  "Y",
  "y",
  "Z",
  "z",
];

const WalletAuth: NextPage<IWalletAuthProps> = ({ isConnected, address }) => {
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const [codeStatus, setCodeStatus] = useState<boolean>(true);
  const [messageErr, setMessageErr] = useState<null | string>(null);
  const jwt = setJWT((state) => state.jwtToken);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newInputValues = [...code];
    newInputValues[parseInt(e.target.name)] = e.target.value;
    setCode(newInputValues);
  };

  const router = useRouter();
  const path =
    "https://devmy.dagama.world/assets/components/dga/conector_jwt.php";

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.target.addEventListener("keyup", (key: any) => {
      if (!forbList.includes(key.key)) {
        if (key.key && key.key != "Backspace" && abs.includes(key.key)) {
          handleInputChange(e);

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
              handleInputChange(e);
            }
            if (inputNumber === 0) {
              setCode(["", "", "", "", "", ""]);
              e.target.value = "";
            }
          }
        }
      } else {
        // document.getElementById("firstInput")?.focus();
        setCode(["", "", "", "", "", ""]);
        return false;
      }
    });
  };

  const handleBtnAuth = () => {
    if (isConnected && address) {
      if (code.join("").length < 6) {
        setMessageErr(
          "Code you’ve entered is incomplete. Please enter remaining symbols. "
        );
        setCodeStatus(false);
        console.log("btn push", codeStatus, messageErr);

        return false;
      }
      if (code.join("").length === 0) {
        setMessageErr(
          "Code you’ve entered is incomplete. Please enter remaining symbols. "
        );
        setCodeStatus(false);
        console.log("btn push", codeStatus);
        return false;
      }
      sendAddInvite(address);
      setCode(["", "", "", "", "", ""]);
    }
  };

  const sendAddInvite = async (walletAddress: string) => {
    const response = await fetch(path, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        request: "addInvite",
        invite_code: code.join(""),
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
                id="firstInput"
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
