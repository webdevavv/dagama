import type { NextPage } from "next";
import styles from "./NftBlock.module.scss";

type NftData = {
  name: string;
  description: string;
  image: string;
};

interface INftItem {
  data: NftData;
}

const NftBlockItem: NextPage<INftItem> = ({ data }) => {
  return (
    <a href="#" className={styles.nftBlock__grid_item}>
      <div className={styles.image}>
        <span>
          Total Rarity: <span>24%</span>
        </span>
        <img src={data.image} alt={data.name} />
      </div>
      <div className={styles.text}>
        <div className={styles.text_title}>{data.name}</div>
        <div className={styles.text_info}>
          <h4>Membership card Utility unblock: </h4>
          <p>{data.description}</p>
          <span className={styles.date}>Minted: 1 may, 2024</span>
        </div>
      </div>
    </a>
  );
};

export default NftBlockItem;
