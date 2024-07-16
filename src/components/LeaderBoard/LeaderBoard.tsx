"use client";
import type { NextPage } from "next";
import axios from "axios";
import styles from "../../styles/AccountBlock.module.scss";
import { useQuery } from "@tanstack/react-query";
import { useAccount } from "wagmi";
import { setJWT } from "../../stores/setJWT-store";
import { useEffect, useState } from "react";

interface IWalletAuthProps {
  address: string | undefined;
  jwt: string;
}

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

const path =
  "https://devmy.dagama.world/assets/components/dga/conector_jwt.php";

const LeaderBoard: NextPage<IWalletAuthProps> = ({ address, jwt }) => {
  // const [leaders, setLeaders] = useState<any>([]);
  // const [timer, setTimer] = useState<boolean>(false);

  const fetchUserDataLeaders = async () => {
    const response = await axios.post(
      path,
      {
        request: "getLiders",
        address: address,
        JWT: jwt,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    // setLeaders(response.data.object.list);
    return response;
  };

  // useEffect(() => {
  //   fetchUserDataLeaders();
  //   console.log(leaders);
  // }, [timer]);

  const { isPending, data, error } = useQuery({
    queryKey: ["leaders"],
    queryFn: fetchUserDataLeaders,
    enabled: !!address,
  });

  if (isPending) {
    return (
      <div className="container">
        <span>Loading...</span>
      </div>
    );
  }
  if (error) {
    return (
      <div className="conta">
        <span>Error: {error.message}</span>
      </div>
    );
  }

  const leaders = data.data.object.list;
  // console.log(leaders);
  // const leaders = [
  //   {
  //     place: "001",
  //     username: "vikulov38",
  //     refer: "daGama",
  //     sco: "1157.00",
  //     user_id: 27,
  //     me: 27,
  //   },
  //   {
  //     place: "002",
  //     username: "styapa...abor",
  //     refer: "0xfba0...9070",
  //     sco: "128.00",
  //     user_id: 9,
  //     me: 27,
  //   },
  //   {
  //     place: "003",
  //     username: "0xfba0...9070",
  //     refer: "0xfba0...9070",
  //     sco: "70.75",
  //     user_id: 4,
  //     me: 27,
  //   },
  //   {
  //     place: "004",
  //     username: "0xF4bA...05E3",
  //     refer: "daGama",
  //     sco: "25.00",
  //     user_id: 345,
  //     me: 27,
  //   },
  // ];

  type Leaders = {
    place: "";
    username: "";
    refer: "";
    sco: "";
    user_id: number;
    me: number;
  };

  return (
    <div className={styles.leaderBoardTable}>
      <div className={styles.leaderBoardTable__head}>
        <div
          className={
            styles.leaderBoardTable__head_item +
            " " +
            styles.leaderBoardTable__head_rank
          }
        >
          Rank
        </div>
        <div
          className={
            styles.leaderBoardTable__head_item +
            " " +
            styles.leaderBoardTable__head_name
          }
        >
          Username
        </div>
        <div
          className={
            styles.leaderBoardTable__head_item +
            " " +
            styles.leaderBoardTable__head_inviteBy
          }
        >
          Invided by
        </div>
        <div
          className={
            styles.leaderBoardTable__head_item +
            " " +
            styles.leaderBoardTable__head_point
          }
        >
          Points earned
        </div>
      </div>
      {leaders.map((item: Leaders) => (
        <div className={styles.leaderBoardTable__item} key={item.user_id}>
          <div
            className={
              styles.leaderBoardTable__item_item +
              " " +
              styles.leaderBoardTable__item_rank
            }
          >
            {item.place}
          </div>
          <div
            className={
              styles.leaderBoardTable__item_item +
              " " +
              styles.leaderBoardTable__item_name
            }
          >
            <span></span>
            <span>{item.username}</span>
          </div>
          <div
            className={
              styles.leaderBoardTable__item_item +
              " " +
              styles.leaderBoardTable__item_inviteBy
            }
          >
            {item.refer}
          </div>
          <div
            className={
              styles.leaderBoardTable__item_item +
              " " +
              styles.leaderBoardTable__item_point
            }
          >
            {item.sco}
          </div>
        </div>
      ))}
    </div>
  );
};

export default LeaderBoard;
