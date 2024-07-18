"use client";
import type { NextPage } from "next";
import data from "../../../../1.json";
import styles from "../../../../styles/AccountBlock.module.scss";
import { setAddressStore } from "../../../../stores/address-store";
import { setData } from "../../../../stores/userData-store";

const page: NextPage = () => {
  const address = setAddressStore((state) => state.address);
  const userData = setData((state) => state.data);
  return (
    <div className="container">
      <div className={styles.MintNftPage}>
        <div className={styles.userBlock__wrapper + " " + "block-bg"}>
          <div className={styles.userBlock}>
            <div className={styles.userBlock__avatar}>
              <img
                src={`https://api.dicebear.com/6.x/notionists/svg?seed=Felix{$usr.${address}}&backgroundType=gradientLinear,solid&backgroundColor=ffffff,6affb3,45505d&size=126`}
                alt=""
              />
            </div>
            <div className={styles.userBlock__info}>
              <div className={styles.userBlock__info_name}>
                {userData?.u_name}
                {userData?.wls ? (
                  <span>you are in white list</span>
                ) : (
                  <span className={styles.not}>
                    you are not on the white list
                  </span>
                )}
              </div>
              <div className={styles.userBlock__info_address}>{address}</div>
            </div>
          </div>
          <div className={styles.userCount}>
            <span className={styles.userCount__number}>31</span>
            <span className={styles.userCount__label}>
              NFT in <span>your collection</span>
            </span>
          </div>
        </div>
        <div className={styles.MintNft + " " + "block-bg"}>
          <div className={styles.MintNft__image}>
            <div className={styles.image}>
              <span>
                Total Rarity: <span>24%</span>
              </span>
              <img src={data.image} alt={data.name} />
            </div>
          </div>
          <div className={styles.MintNft__text}>
            <div className={styles.text}>
              <div className={styles.text_title}>{data.name}</div>
              <div className={styles.text_info}>
                <h4>Membership card Utility unblock: </h4>
                <p>{data.description}</p>
                <div className={styles.tags}>
                  <span>
                    Face rarity: <span>2%</span>
                  </span>
                  <span>
                    Clothes rarity: <span>21%</span>
                  </span>
                  <span>
                    Hand rarity: <span>11%</span>
                  </span>
                  <span>
                    Skin rarity: <span>63%</span>
                  </span>
                  <span>
                    Back rarity: <span>9%</span>
                  </span>
                </div>
                <span className={styles.price}>0.1123 ETH</span>
                <span className={styles.date}>Minted: 1 may, 2024</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
