"use client";

import type { NextPage } from "next";
import ExportedImage from "next-image-export-optimizer";
import { CustomConnectButton } from "../CustomConnectButtons/CustomConnectButton";
import styles from "./StartPage.module.scss";

const StartPage: NextPage = () => {
  return (
    <>
      <div className="container">
        <div className={styles.startPage}>
          <div className={styles.startPage__image}>
            <ExportedImage
              src="/img/mainImage.png"
              width="1111"
              height="1071"
              alt=""
            />
          </div>
          <div className={styles.startPage__info}>
            <div className="frame-1948756954">
              <h1 className="header-1">Invite people —collect tokens</h1>
              <div className="text-43">
                daGama, your passport to unique experiences! We are transforming
                your exploration journey. With our Impressions Map, AI-Based
                Recommendations, and User Points of Interest, you&#x27;ll
                uncover hidden gems recommended by locals.
              </div>
              <CustomConnectButton />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default StartPage;
