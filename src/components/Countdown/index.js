import { useState, useEffect } from "react";
import classes from "./Countdown.module.scss";

const Countdown = () => {
  const [timerDays, setTimerDays] = useState(0);
  const [timerHours, setTimerHours] = useState(0);
  const [timerMinutes, setTimerMinutes] = useState(0);
  const [timerSeconds, setTimerSeconds] = useState(0);

  useEffect(() => {
    let countDownDate = new Date(Date.UTC(2024, 7, 23, 20, 0, 0)).getTime();

    let interval = setInterval(function () {
      let now = new Date().getTime();
      let distance = countDownDate - now;

      let days = Math.floor(distance / (1000 * 60 * 60 * 24));
      let hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      let seconds = Math.floor((distance % (1000 * 60)) / 1000);

      setTimerDays(days);
      setTimerHours(hours);
      setTimerMinutes(minutes);
      setTimerSeconds(seconds);
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div className={classes.orange_sec}>
      <div className={classes.countdown}>
        <ul className={`d-flex flex-wrap ${classes.countdown_timer}`}>
          <li>
            <h5 className={classes.num}>{timerDays}</h5>
            <span className={classes.countdown_title}>days</span>
          </li>
          <li>
            <h5 className={classes.num}>{timerHours}</h5>
            <span className={classes.countdown_title}>hrs</span>
          </li>
          <li>
            <h5 className={classes.num}>{timerMinutes}</h5>
            <span className={classes.countdown_title}>min</span>
          </li>
          <li>
            <h5 className={classes.num}>{timerSeconds}</h5>
            <span className={classes.countdown_title}>sec</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Countdown;
