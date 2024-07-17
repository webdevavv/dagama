"use client";
import type { NextPage } from "next";
import axios from "axios";
import styles from "../../../styles/AccountBlock.module.scss";
import { useQuery } from "@tanstack/react-query";
import { useAccount } from "wagmi";
import { setJWT } from "../../../stores/setJWT-store";
import ExportedImage from "next-image-export-optimizer";
import LeaderBoard from "../../../components/LeaderBoard/LeaderBoard";
import { setAddressStore } from "../../../stores/address-store";

const path =
  "https://devmy.dagama.world/assets/components/dga/conector_jwt.php";

const handleClipBoardPath = (text: string | undefined) => {
  if (text) {
    navigator.clipboard.writeText(text).then(
      function () {
        console.log("Текст успешно скопирован в буфер обмена");
      },
      function (err) {
        console.error("Произошла ошибка при копировании текста: ", err);
      }
    );
  }
};

const AccountBlock: NextPage = () => {
  const jwt: string = setJWT((state) => state.jwtToken);
  const address = setAddressStore((state) => state.address);

  const fetchUserData = async () => {
    const response = await axios.post(
      path,
      {
        request: "getState",
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
    queryKey: ["user"],
    queryFn: fetchUserData,
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

  // setDatabase(data.data.object);
  const userData = data.data.object;

  return (
    <>
      <div className="container">
        <div className={styles.leaderBoard}>
          <div className={styles.userBlock__wrapper + " " + "block-bg"}>
            <div className={styles.userBlock}>
              <div className={styles.userBlock__avatar}></div>
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
              <span className={styles.userCount__number}>
                {userData.score_user ? parseInt(userData.score_user) : ""}
              </span>
              <span className={styles.userCount__label}>Your points</span>
            </div>
          </div>
          <div className={styles.userRef + " " + "block-bg"}>
            <div className={styles.userRef__text}>
              <h1>
                Invite frends to Earn More Points in over{" "}
                <span>28 000 000 Token’s Pool</span>
              </h1>
              <p>
                Each user joined by your link will get up to 10 points? and you
                will get 10 points for each friend you invited.
              </p>
            </div>
            <div className={styles.userRef__table}>
              <div className={styles.userRef__table_head}>
                <span>Referral Code & Link</span>
                <span className={styles.userRef__table_pointCount}>
                  +25 points
                </span>
              </div>
              <div className={styles.userRef__table_item}>
                <span className={styles.userRef__table_item_name}>Code</span>
                <span className={styles.userRef__table_item_value}>
                  {userData?.refer}
                </span>
                <button className={styles.userRef__table_item_button}></button>
              </div>
              <div className={styles.userRef__table_item}>
                <span className={styles.userRef__table_item_name}>Link</span>
                <span className={styles.userRef__table_item_value}>
                  {userData?.remote_key
                    ? `https://dagama.world/...=${userData.remote_key}`
                    : " "}
                </span>
                <button className={styles.userRef__table_item_button}></button>
              </div>
            </div>
          </div>
          <div className={styles.userRef + " " + "block-bg"}>
            <div className={styles.userRef__text}>
              <h2>Connect your accounts</h2>
              <p>And get more points</p>
            </div>
            <div className={styles.connectors}>
              <div
                className={
                  userData?.btn_list?.tg
                    ? styles.connector_done + " " + "connector"
                    : styles.connector + " " + "connector"
                }
              >
                <div className="connector-info">
                  <div className="connector-social">
                    <ExportedImage
                      width={24}
                      height={24}
                      src="/img/tg.svg"
                      className="connector-social__icon"
                      alt="connector-social__icon"
                    />
                    <div className="connector-socail__name">Telegram</div>
                  </div>
                  <div className="connector-point">
                    <div className="connector-point__text connector-point__text-plus">
                      +
                    </div>
                    <div className="connector-point__text">points</div>
                  </div>
                </div>

                <div className={styles.line}></div>

                {userData?.btn_list?.tg ? (
                  <div className="connector-success">
                    <div className="connector-success__icon">
                      <svg
                        width="16"
                        height="17"
                        viewBox="0 0 16 17"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M10.7933 1.53305H5.20659C2.77992 1.53305 1.33325 2.97972 1.33325 5.40638V10.9864C1.33325 13.4197 2.77992 14.8664 5.20659 14.8664H10.7866C13.2133 14.8664 14.6599 13.4197 14.6599 10.9931V5.40638C14.6666 2.97972 13.2199 1.53305 10.7933 1.53305ZM11.1866 6.66638L7.40659 10.4464C7.31325 10.5397 7.18659 10.5931 7.05325 10.5931C6.91992 10.5931 6.79325 10.5397 6.69992 10.4464L4.81325 8.55972C4.61992 8.36638 4.61992 8.04638 4.81325 7.85305C5.00659 7.65972 5.32659 7.65972 5.51992 7.85305L7.05325 9.38638L10.4799 5.95972C10.6733 5.76638 10.9933 5.76638 11.1866 5.95972C11.3799 6.15305 11.3799 6.46638 11.1866 6.66638Z"
                          fill="#00F87A"
                        />
                      </svg>
                    </div>
                    <div className="connector-success__text">Connected</div>
                  </div>
                ) : (
                  <a
                    href={userData?.discord_link}
                    className="discord_btn button ghost w-button"
                  >
                    Connect
                  </a>
                )}
              </div>
              <div
                className={
                  userData?.btn_list?.xt
                    ? styles.connector_done + " " + "connector"
                    : styles.connector + " " + "connector"
                }
              >
                <div className="connector-info">
                  <div className="connector-social">
                    <ExportedImage
                      width={24}
                      height={24}
                      src="/img/x.svg"
                      className="connector-social__icon"
                      alt="connector-social__icon"
                    />
                    <div className="connector-socail__name">X (Twitter)</div>
                  </div>
                  <div className="connector-point">
                    <div className="connector-point__text connector-point__text-plus">
                      +
                    </div>
                    <div className="connector-point__text">points</div>
                  </div>
                </div>

                <div className={styles.line}></div>

                {userData?.btn_list?.xt ? (
                  <div className="connector-success">
                    <div className="connector-success__icon">
                      <svg
                        width="16"
                        height="17"
                        viewBox="0 0 16 17"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M10.7933 1.53305H5.20659C2.77992 1.53305 1.33325 2.97972 1.33325 5.40638V10.9864C1.33325 13.4197 2.77992 14.8664 5.20659 14.8664H10.7866C13.2133 14.8664 14.6599 13.4197 14.6599 10.9931V5.40638C14.6666 2.97972 13.2199 1.53305 10.7933 1.53305ZM11.1866 6.66638L7.40659 10.4464C7.31325 10.5397 7.18659 10.5931 7.05325 10.5931C6.91992 10.5931 6.79325 10.5397 6.69992 10.4464L4.81325 8.55972C4.61992 8.36638 4.61992 8.04638 4.81325 7.85305C5.00659 7.65972 5.32659 7.65972 5.51992 7.85305L7.05325 9.38638L10.4799 5.95972C10.6733 5.76638 10.9933 5.76638 11.1866 5.95972C11.3799 6.15305 11.3799 6.46638 11.1866 6.66638Z"
                          fill="#00F87A"
                        />
                      </svg>
                    </div>
                    <div className="connector-success__text">Connected</div>
                  </div>
                ) : (
                  <a
                    href={userData?.discord_link}
                    className="discord_btn button ghost w-button"
                  >
                    Connect
                  </a>
                )}
              </div>
              <div
                className={
                  userData?.btn_list?.discord
                    ? styles.connector_done + " " + "connector"
                    : styles.connector + " " + "connector"
                }
              >
                <div className="connector-info">
                  <div className="connector-social">
                    <ExportedImage
                      width={24}
                      height={24}
                      src="/img/discord.svg"
                      className="connector-social__icon"
                      alt="connector-social__icon"
                    />
                    <div className="connector-socail__name">Discord</div>
                  </div>
                  <div className="connector-point">
                    <div className="connector-point__text connector-point__text-plus">
                      +
                    </div>
                    <div className="connector-point__text">points</div>
                  </div>
                </div>

                <div className={styles.line}></div>

                {userData?.btn_list?.discord ? (
                  <div className="connector-success">
                    <div className="connector-success__icon">
                      <svg
                        width="16"
                        height="17"
                        viewBox="0 0 16 17"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M10.7933 1.53305H5.20659C2.77992 1.53305 1.33325 2.97972 1.33325 5.40638V10.9864C1.33325 13.4197 2.77992 14.8664 5.20659 14.8664H10.7866C13.2133 14.8664 14.6599 13.4197 14.6599 10.9931V5.40638C14.6666 2.97972 13.2199 1.53305 10.7933 1.53305ZM11.1866 6.66638L7.40659 10.4464C7.31325 10.5397 7.18659 10.5931 7.05325 10.5931C6.91992 10.5931 6.79325 10.5397 6.69992 10.4464L4.81325 8.55972C4.61992 8.36638 4.61992 8.04638 4.81325 7.85305C5.00659 7.65972 5.32659 7.65972 5.51992 7.85305L7.05325 9.38638L10.4799 5.95972C10.6733 5.76638 10.9933 5.76638 11.1866 5.95972C11.3799 6.15305 11.3799 6.46638 11.1866 6.66638Z"
                          fill="#00F87A"
                        />
                      </svg>
                    </div>
                    <div className="connector-success__text">Connected</div>
                  </div>
                ) : (
                  <a
                    href={userData?.discord_link}
                    className="discord_btn button ghost w-button"
                  >
                    Connect
                  </a>
                )}
              </div>
              <div
                className={
                  userData?.btn_list?.gp
                    ? styles.connector_done + " " + "connector"
                    : styles.connector + " " + "connector"
                }
              >
                <div className="connector-info">
                  <div className="connector-social">
                    <ExportedImage
                      width={24}
                      height={24}
                      src="/img/gitpass.svg"
                      className="connector-social__icon"
                      alt="connector-social__icon"
                    />
                    <div className="connector-socail__name">Gitpassport</div>
                  </div>
                  <div className="connector-point">
                    <div className="connector-point__text connector-point__text-plus">
                      +
                    </div>
                    <div className="connector-point__text"> points</div>
                  </div>
                </div>

                <div className={styles.line}></div>

                {userData?.btn_list?.gp ? (
                  <div className="connector-success">
                    <div className="connector-success__icon">
                      <svg
                        width="16"
                        height="17"
                        viewBox="0 0 16 17"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M10.7933 1.53305H5.20659C2.77992 1.53305 1.33325 2.97972 1.33325 5.40638V10.9864C1.33325 13.4197 2.77992 14.8664 5.20659 14.8664H10.7866C13.2133 14.8664 14.6599 13.4197 14.6599 10.9931V5.40638C14.6666 2.97972 13.2199 1.53305 10.7933 1.53305ZM11.1866 6.66638L7.40659 10.4464C7.31325 10.5397 7.18659 10.5931 7.05325 10.5931C6.91992 10.5931 6.79325 10.5397 6.69992 10.4464L4.81325 8.55972C4.61992 8.36638 4.61992 8.04638 4.81325 7.85305C5.00659 7.65972 5.32659 7.65972 5.51992 7.85305L7.05325 9.38638L10.4799 5.95972C10.6733 5.76638 10.9933 5.76638 11.1866 5.95972C11.3799 6.15305 11.3799 6.46638 11.1866 6.66638Z"
                          fill="#00F87A"
                        />
                      </svg>
                    </div>
                    <div className="connector-success__text">Connected</div>
                  </div>
                ) : (
                  <a
                    href={userData?.discord_link}
                    className="discord_btn button ghost w-button"
                  >
                    Connect
                  </a>
                )}
              </div>
            </div>
          </div>
          <div className={styles.userRefLink}>
            <div className={styles.userRefLink__text}>
              <h2>Leaderboard</h2>
              <p>Invite more people to rank up</p>
              <button
                onClick={() => handleClipBoardPath(userData?.invite_link)}
              >
                <span>
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 39 39"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M25.3665 20.6513V27.31C25.3665 32.8589 23.1469 35.0785 17.598 35.0785H10.9394C5.39046 35.0785 3.1709 32.8589 3.1709 27.31V20.6513C3.1709 15.1024 5.39046 12.8829 10.9394 12.8829H17.598C23.1469 12.8829 25.3665 15.1024 25.3665 20.6513Z"
                      stroke="#00F87A"
                      strokeWidth="1.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M34.8787 11.139V17.7976C34.8787 23.3465 32.6591 25.5661 27.1102 25.5661H25.3663V20.6513C25.3663 15.1024 23.1467 12.8829 17.5978 12.8829H12.6831V11.139C12.6831 5.59006 14.9027 3.3705 20.4516 3.3705H27.1102C32.6591 3.3705 34.8787 5.59006 34.8787 11.139Z"
                      stroke="#00F87A"
                      strokeWidth="1.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
                <span>Copy Invite link</span>
              </button>
            </div>
          </div>
          <div className={styles.leaderBoardTable_wrapper}>
            <LeaderBoard address={address} jwt={jwt} user={userData?.u_name} />
          </div>
        </div>
      </div>
    </>
  );
};

export default AccountBlock;
