import type { NextPage } from "next";
import type { Leaders } from "./LeaderBoard";
import styles from "../../../styles/AccountBlock.module.scss";
import { setData } from "../../../stores/userData-store";

interface ILeaderBoardItem {
  item: Leaders;
}

const LeaderBoardItem: NextPage<ILeaderBoardItem> = ({ item }) => {
  const userData = setData((state) => state.data);

  return (
    <div
      className={
        userData?.u_rank === item.place
          ? styles.leaderBoardTable__item_accent
          : styles.leaderBoardTable__item
      }
    >
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
  );
};

export default LeaderBoardItem;
