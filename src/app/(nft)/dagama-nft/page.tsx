"use client";

import type { NextPage } from "next";
import { ChangeEvent, useState } from "react";
import styles from "../../../styles/Home.module.scss";
import Countdown from "../../../components/Countdown";
import ExportedImage from "next-image-export-optimizer";

const Home: NextPage = () => {
  const [nftCount, setNFTCount] = useState<number>(1);
  const [totalPrice, setTotalPrice] = useState<number>(0.08);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const val = Number(e.target.value);
    setNFTCount(val);
    setTotalPrice(0.08 * val);
  };

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <div className="container">
          <div className="row">
            <div className="col-12 col-md-12 d-flex align-self-center">
              <div className="minting--details block-bg d-flex flex-column align-items-center gap-5">
                <h1 className="text-center">
                  Mint your first NFT <span>now</span>
                </h1>
                <ExportedImage
                  src="/index.png"
                  width={384}
                  height={280}
                  className={styles.mainImg}
                  alt="Mint your first NFT now"
                />
                <div className="counter--slider">
                  <input
                    id="counter"
                    type="range"
                    min={1}
                    max={5}
                    step={1}
                    value={nftCount}
                    onChange={handleInputChange}
                  />
                  <label htmlFor="counter">
                    {nftCount} NFT - Total: {totalPrice.toFixed(3)} ARB + GAS{" "}
                  </label>
                </div>
                <button type="button" className="button-green">
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
        </div>
      </main>
    </div>
  );
};

export default Home;
