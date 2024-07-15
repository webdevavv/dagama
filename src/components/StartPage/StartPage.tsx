"use client";

import type { NextPage } from "next";
import ExportedImage from "next-image-export-optimizer";
import { CustomConnectButton } from "../CustomConnectButtons/CustomConnectButton";

const StartPage: NextPage = () => {
  return (
    <div className="hero-heading-left-2">
      <div className="container-5">
        <ExportedImage
          src="/mainImage.png"
          loading="lazy"
          width="1111"
          height="1071"
          alt=""
          className="frame-1948756955"
        />
        <div className="frame-1948756953">
          <div className="frame-1948756954">
            <div className="header-1">Invite people —collect tokens</div>
            <div className="text-43">
              daGama, your passport to unique experiences! We are transforming
              your exploration journey. With our Impressions Map, AI-Based
              Recommendations, and User Points of Interest, you&#x27;ll uncover
              hidden gems recommended by locals.
            </div>
            <CustomConnectButton />
          </div>
        </div>
      </div>
    </div>
  );
};

export default StartPage;
