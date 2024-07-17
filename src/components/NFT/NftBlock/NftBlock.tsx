import type { NextPage } from "next";
import styles from "./NftBlock.module.scss";
import Image from "next/image";
import data from "../../../1.json";
import NftBlockItem from "./NftBlockItem";

const NftBlock: NextPage = () => {
  return (
    <div className={styles.nftBlock}>
      <h3>
        In your colletion <span>31 NFT</span>
      </h3>
      <div className={styles.nftBlock__grid}>
        <NftBlockItem data={data} />
        <NftBlockItem data={data} />
        <NftBlockItem data={data} />
        <NftBlockItem data={data} />
        <NftBlockItem data={data} />
        <NftBlockItem data={data} />
      </div>
      <div className={styles.button}>
        <button>Load more</button>
      </div>
    </div>
  );
};

export default NftBlock;
