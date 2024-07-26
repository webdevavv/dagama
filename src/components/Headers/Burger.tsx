import type { NextPage } from "next";
import styles from "../../styles/Home.module.scss";
import { HeaderLkConnectButton } from "../CustomConnectButtons/HeaderLkConnectButton";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

interface IBurger {
  isOpen: boolean;
}

const Burger: NextPage<IBurger> = ({ isOpen }) => {
  const pathname = usePathname();

  return (
    <div
      className={
        isOpen
          ? styles.BurgerMenu_wrapper
          : styles.BurgerMenu_wrapper + " " + styles.BurgerMenu_wrapper_close
      }
    >
      <div className={styles.BurgerMenu}>
        <nav className={styles.nav}>
          <Link
            href="/referal-program"
            className={
              pathname === "/referal-program" ? "header-active-link" : " "
            }
          >
            <p>referal program</p>
          </Link>
          <Link
            href="/dagama-nft"
            className={
              pathname === "/dagama-nft" || pathname === "/dagama-nft/mint-nft"
                ? "header-active-link"
                : " "
            }
          >
            <p>dagama NFT</p>
          </Link>
        </nav>
        <div className={styles.LkButton}>
          <HeaderLkConnectButton />
        </div>
      </div>
    </div>
  );
};

export default Burger;
