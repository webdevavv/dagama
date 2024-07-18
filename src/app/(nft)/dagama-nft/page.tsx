"use client";

import type { NextPage } from "next";
import { ChangeEvent, useState } from "react";
import styles from "../../../styles/Home.module.scss";
import Countdown from "../../../components/NFT/Countdown";
import ExportedImage from "next-image-export-optimizer";
import NftBlock from "../../../components/NFT/NftBlock/NftBlock";
import { useRouter } from "next/navigation";
import Image from "next/image";
// import Image from "next/image";

const Home: NextPage = () => {
  const router = useRouter();
  const [nftCount, setNFTCount] = useState<number>(1);
  const [totalPrice, setTotalPrice] = useState<number>(0.08);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const val = Number(e.target.value);
    setNFTCount(val);
    setTotalPrice(0.08 * val);
  };
  const handleInputChangeBySpan = (e: number) => {
    const val = e;
    setNFTCount(val);
    setTotalPrice(0.08 * val);
  };

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <div className="container">
          <div className="row gy-4">
            <div className="col-12 col-md-12 d-flex align-self-center">
              <div className="minting--details block-bg d-flex flex-column align-items-center gap-4 gap-sm-5">
                <h1 className="text-center">
                  Mint your first NFT <span>now</span>
                </h1>
                <Image
                  src="/img/index.png"
                  width={384}
                  height={280}
                  className={styles.mainImg}
                  alt="Mint your first NFT now"
                />
                <div className="counter--slider">
                  <div className={styles.inputWrapper}>
                    <input
                      id="counter"
                      type="range"
                      min={1}
                      max={5}
                      step={1}
                      className={styles.rangeInput}
                      value={nftCount}
                      onChange={handleInputChange}
                    />
                    <span
                      className={nftCount >= 2 ? styles.active : ""}
                      onClick={() => handleInputChangeBySpan(2)}
                    ></span>
                    <span
                      className={nftCount >= 3 ? styles.active : ""}
                      onClick={() => handleInputChangeBySpan(3)}
                    ></span>
                    <span
                      className={nftCount >= 4 ? styles.active : ""}
                      onClick={() => handleInputChangeBySpan(4)}
                    ></span>
                    <span
                      className={nftCount >= 5 ? styles.active : ""}
                      onClick={() => handleInputChangeBySpan(5)}
                    ></span>
                    <span
                      className={nftCount >= 1 ? styles.active : ""}
                      onClick={() => handleInputChangeBySpan(1)}
                    ></span>
                  </div>
                  <label htmlFor="counter">
                    {nftCount} NFT - Total: {totalPrice.toFixed(3)} ARB + GAS{" "}
                  </label>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    router.push("/dagama-nft/mint-nft");
                  }}
                  className="button-green"
                >
                  Mint Now
                </button>
                <span className="text-center">maximum 5 token per mint</span>
              </div>
            </div>

            <div className="col-12 col-md-6">
              <div className="block-bg mints-block">
                <h4>Minted NFT</h4>
                <div className="total-counter text-center">
                  <span>{210}</span> / {2500}
                </div>
                <a href="#" target="_blank" rel="noreferrer" className="">
                  View on arbiscan
                </a>
              </div>
            </div>

            <div className="col-12 col-md-6">
              <div className="block-bg mints-block">
                <h4>NFT public sale in</h4>
                <Countdown />
              </div>
            </div>
          </div>
          <NftBlock />
        </div>
      </main>
    </div>
  );
};

export default Home;
