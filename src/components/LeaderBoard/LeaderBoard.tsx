"use client";
import type { NextPage } from "next";
import axios from "axios";
import styles from "../../styles/AccountBlock.module.scss";
import { useQuery } from "@tanstack/react-query";
import { useAccount } from "wagmi";
import { setJWT } from "../../stores/setJWT-store";

const handleClipBoardPath = (text: string) => {
  navigator.clipboard.writeText(text).then(
    function () {
      console.log("Текст успешно скопирован в буфер обмена");
    },
    function (err) {
      console.error("Произошла ошибка при копировании текста: ", err);
    }
  );
};

const path: string = `${
  process.env.NEXT_PUBLIC_REQUEST_SERVER_PATH as string
}/assets/components/dga/conector_jwt.php`;

const LeaderBoard: NextPage = () => {
  const { address } = useAccount();
  const jwt: string = setJWT((state) => state.jwtToken);

  // const fetchUserData = async () => {
  //   const response = await axios.post(
  //     path,
  //     {
  //       request: "getLiders",
  //       address: address,
  //       JWT: jwt,
  //     },
  //     {
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //     }
  //   );

  //   return response;
  // };

  // const { isPending, data, error } = useQuery({
  //   queryKey: ["user"],
  //   queryFn: fetchUserData,
  //   retry: true,
  //   retryDelay: 1000,
  //   refetchInterval: 5000,
  // });

  // if (isPending) {
  //   return (
  //     <div className="container">
  //       <span>Loading...</span>
  //     </div>
  //   );
  // }
  // if (error) {
  //   return (
  //     <div className="conta">
  //       <span>Error: {error.message}</span>
  //     </div>
  //   );
  // }

  // const userData = data.data.object;

  return <div></div>;
};

export default LeaderBoard;
