import type { NextPage } from "next";
import type { Leaders } from "./LeaderBoard";
import styles from "../../styles/AccountBlock.module.scss";

interface ILeaderBoardItem {
  item: Leaders;
  user: string;
}

const LeaderBoardItem: NextPage<ILeaderBoardItem> = ({ item, user }) => {
  return (
    <div
      className={
        user === item.username
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
