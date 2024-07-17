"use client";
import type { NextPage } from "next";
import axios from "axios";
import styles from "../../../styles/AccountBlock.module.scss";
import { useQuery } from "@tanstack/react-query";
import LeaderBoardItem from "./LeaderBoardItem";

interface IWalletAuthProps {
  address: string | undefined;
  jwt: string;
  user: string;
}

export type Leaders = {
  place: "";
  username: "";
  refer: "";
  sco: "";
  user_id: number;
  me: number;
};

const path =
  "https://devmy.dagama.world/assets/components/dga/conector_jwt.php";

const LeaderBoard: NextPage<IWalletAuthProps> = ({ address, jwt, user }) => {
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
    return response;
  };

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
        <LeaderBoardItem key={item.user_id} item={item} user={user} />
      ))}
    </div>
  );
};

export default LeaderBoard;
