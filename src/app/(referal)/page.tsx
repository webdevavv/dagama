"use client";

import type { NextPage } from "next";

import { setAuthenticated } from "../../stores/authenticated-store";

import StartPage from "../../components/StartPage/StartPage";
import { useAccount } from "wagmi";
import { setInviteState } from "../../stores/setInviteState-store";
import { setAddressStore } from "../../stores/address-store";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import CodeInput from "../../components/WalletAuth/CodeInput";

const Home: NextPage = () => {
  const { isConnected, address } = useAccount();
  const isAuth = setAuthenticated((state) => state.authenticated);
  const invState = setInviteState((state) => state.inviteState);
  const setAddress = setAddressStore((state) => state.setAddress);
  const [enteredCode, setEnteredCode] = useState("");

  const handleCodeChange = (code: string) => {
    setEnteredCode(code);
  };

  const router = useRouter();

  const searchParams = useSearchParams();

  const ref = searchParams.get("ref");

  console.log(ref);

  // const ref = window.location.search;
  // const parameters = new URLSearchParams(ref);
  // const value = parameters.get("ref");
  // console.log(value);

  setAddress(address);

  if (isAuth === "authenticated" && invState === "soc_conect") {
    router.push("/referal-program");
  }

  return (
    <>
      {isAuth === "unauthenticated" && <StartPage />}
      {isAuth === "authenticated" && invState !== "soc_conect" && (
        <CodeInput
          initialCode={ref}
          isConnected={isConnected}
          address={address}
        />
      )}
    </>
  );
};

export default Home;
