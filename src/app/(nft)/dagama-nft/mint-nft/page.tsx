"use client";
import type { NextPage } from "next";

import styles from "../../../../styles/AccountBlock.module.scss";
import { setAddressStore } from "../../../../stores/address-store";

const page: NextPage = () => {
  const address = setAddressStore((state) => state.address);
  return (
    <div className="container">
      <div>
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
                @username
                {false ? (
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
      </div>
    </div>
  );
};

export default page;
