"use client";
import { useState, useEffect } from "react";
import { ethers } from "ethers";
import { setData } from "../../stores/userData-store";
import styles from "../../styles/AccountBlock.module.scss";
import Image from "next/image";
import { setJWT } from "../../stores/setJWT-store";

const API_KEY = process.env.NEXT_PUBLIC_GC_API_KEY;
const SCORER_ID = process.env.NEXT_PUBLIC_GC_SCORER_ID;
const path = process.env.NEXT_PUBLIC_REQUEST_SERVER_PATH as string;

// endpoint for submitting passport
const SUBMIT_PASSPORT_URI =
  "https://api.scorer.gitcoin.co/registry/submit-passport";
// endpoint for getting the signing message
const SIGNING_MESSAGE_URI =
  "https://api.scorer.gitcoin.co/registry/signing-message";
// score needed to see hidden message
const THRESHOLD_NUMBER = 20;

const headers = API_KEY
  ? {
      "Content-Type": "application/json",
      "X-API-Key": API_KEY,
    }
  : undefined;

declare global {
  interface Window {
    ethereum?: any;
  }
}

export default function GPassport() {
  // here we deal with any local state we need to manage
  const [address, setAddress] = useState<string>("");
  const [connected, setConnected] = useState<boolean>(false);
  const [score, setScore] = useState<string>("");
  const [noScoreMessage, setNoScoreMessage] = useState<string>("");
  const userData = setData((state) => state.data);
  const jwt = setJWT((state) => state.jwtToken);

  useEffect(() => {
    checkConnection();
    async function checkConnection() {
      try {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const accounts = await provider.listAccounts();
        // if the user is connected, set their account and fetch their score
        if (accounts && accounts[0]) {
          setConnected(true);
          setAddress(accounts[0].address);
          checkPassport(accounts[0].address);
        }
      } catch (err) {
        console.log("not connected...");
      }
    }
  }, []);

  async function getSigningMessage() {
    try {
      const response = await fetch(SIGNING_MESSAGE_URI, {
        headers,
      });
      const json = await response.json();
      return json;
    } catch (err) {
      console.log("error: ", err);
    }
  }

  async function submitPassport() {
    setNoScoreMessage("");
    try {
      // call the API to get the signing message and the nonce
      const { message, nonce } = await getSigningMessage();
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      // ask the user to sign the message
      const signature = await signer.signMessage(message);

      // call the API, sending the signing message, the signature, and the nonce
      const response = await fetch(path, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          request: "getGP",
          JWT: jwt,
          signature,
          nonce,
        }),
      });

      const data = await response.json();
      console.log("data:", data);
    } catch (err) {
      console.log("error: ", err);
    }
  }

  async function connect() {
    try {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      setAddress(accounts[0]);
      setConnected(true);
      checkPassport(accounts[0]);
    } catch (err) {
      console.log("error connecting...");
    }
  }

  async function checkPassport(currentAddress = address) {
    setScore("");
    setNoScoreMessage("");
    //
    const GET_PASSPORT_SCORE_URI = `https://api.scorer.gitcoin.co/registry/score/${SCORER_ID}/${currentAddress}`;
    try {
      const response = await fetch(GET_PASSPORT_SCORE_URI, {
        headers,
      });
      const passportData = await response.json();
      if (passportData.score) {
        // if the user has a score, round it and set it in the local state
        const roundedScore = Math.round(passportData.score * 100) / 100;
        setScore(roundedScore.toString());
      } else {
        // if the user has no score, display a message letting them know to submit thier passporta
        console.log(
          "No score available, please add stamps to your passport and then resubmit."
        );
        setNoScoreMessage(
          "No score available, please submit your passport after you have added some stamps."
        );
      }
    } catch (err) {
      console.log("error: ", err);
    }
  }

  return (
    /* this is the UI for the app */
    <>
      <div
        className={
          userData?.btn_list?.gp
            ? styles.connector_done + " " + "connector"
            : styles.connector + " " + "connector"
        }
      >
        <div className="connector-info">
          <div className="connector-social">
            <Image
              width={24}
              height={24}
              src="/img/gitpass.svg"
              className="connector-social__icon"
              alt="connector-social__icon"
            />
            <div className="connector-socail__name">Gitpassport</div>
          </div>
          <div className="connector-point">
            <div className="connector-point__text connector-point__text-plus">
              + {userData?.def_score.score_gp}
            </div>
            <div className="connector-point__text"> points</div>
          </div>
        </div>

        <div className={styles.line}></div>

        {userData?.btn_list?.gp ? (
          <div className="connector-success">
            <div className="connector-success__icon">
              <svg
                width="16"
                height="17"
                viewBox="0 0 16 17"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M10.7933 1.53305H5.20659C2.77992 1.53305 1.33325 2.97972 1.33325 5.40638V10.9864C1.33325 13.4197 2.77992 14.8664 5.20659 14.8664H10.7866C13.2133 14.8664 14.6599 13.4197 14.6599 10.9931V5.40638C14.6666 2.97972 13.2199 1.53305 10.7933 1.53305ZM11.1866 6.66638L7.40659 10.4464C7.31325 10.5397 7.18659 10.5931 7.05325 10.5931C6.91992 10.5931 6.79325 10.5397 6.69992 10.4464L4.81325 8.55972C4.61992 8.36638 4.61992 8.04638 4.81325 7.85305C5.00659 7.65972 5.32659 7.65972 5.51992 7.85305L7.05325 9.38638L10.4799 5.95972C10.6733 5.76638 10.9933 5.76638 11.1866 5.95972C11.3799 6.15305 11.3799 6.46638 11.1866 6.66638Z"
                  fill="#00F87A"
                />
              </svg>
            </div>
            <div className="connector-success__text">Connected</div>
          </div>
        ) : (
          <button
            onClick={submitPassport}
            className="discord_btn button ghost w-button"
          >
            Connect
          </button>
        )}
      </div>
      {/* <div style={styles2.main}>
        <div style={styles2.buttonContainer}>
          {!connected && (
            <button style={styles2.buttonStyle} onClick={connect}>
              Connect Wallet
            </button>
          )}
          {score && (
            <div>
              <h1>Your passport score is {score} 🎉</h1>
              <div style={styles2.hiddenMessageContainer}>
                {Number(score) >= THRESHOLD_NUMBER && (
                  <h2>Congratulations, you can view this secret message!</h2>
                )}
                {Number(score) < THRESHOLD_NUMBER && (
                  <h2>
                    Sorry, your score is not high enough to view the secret
                    message.
                  </h2>
                )}
              </div>
            </div>
          )}
          {connected && (
            <div style={styles2.buttonContainer}>
              <button style={styles2.buttonStyle} onClick={submitPassport}>
                Submit Passport
              </button>
            </div>
          )}
          {noScoreMessage && (
            <p style={styles2.noScoreMessage}>{noScoreMessage}</p>
          )}
        </div>
      </div> */}
    </>
  );
}

const styles2 = {
  main: {
    width: "900px",
    margin: "0 auto",
    paddingTop: 90,
  },
  heading: {
    fontSize: 60,
  },
  intro: {
    fontSize: 18,
    color: "rgba(0, 0, 0, .55)",
  },
  configurePassport: {
    marginTop: 20,
  },
  linkStyle: {
    color: "#008aff",
  },
  buttonContainer: {
    marginTop: 20,
  },
  buttonStyle: {
    padding: "10px 30px",
    outline: "none",
    border: "none",
    cursor: "pointer",
    marginRight: "10px",
    borderRadius: 30,
    borderBottom: "2px solid rgba(0, 0, 0, .2)",
    borderRight: "2px solid rgba(0, 0, 0, .2)",
  },
  hiddenMessageContainer: {
    marginTop: 15,
  },
  noScoreMessage: {
    marginTop: 20,
  },
};
