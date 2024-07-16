"use client";

import type { NextPage } from "next";

import { setAuthenticated } from "../../stores/authenticated-store";

import StartPage from "../../components/StartPage/StartPage";
import WalletAuth from "../../components/WalletAuth/WalletAuth";
import { useAccount } from "wagmi";
import { setInviteState } from "../../stores/setInviteState-store";
import { setAddressStore } from "../../stores/address-store";
import { useRouter } from "next/navigation";

const Home: NextPage = () => {
  const { isConnected, address } = useAccount();
  const isAuth = setAuthenticated((state) => state.authenticated);
  const invState = setInviteState((state) => state.inviteState);
  const setAddress = setAddressStore((state) => state.setAddress);

  const router = useRouter();
  setAddress(address);

  if (isAuth === "authenticated" && invState === "soc_conect") {
    router.push("/referal-program");
  }

  return (
    <>
      {isAuth === "unauthenticated" && <StartPage />}
      {isAuth === "authenticated" && invState !== "soc_conect" && (
        <WalletAuth isConnected={isConnected} address={address} />
      )}
    </>
  );
};

export default Home;
