import React, { useState, useEffect, useContext } from "react";
import moment from "moment";
import { useLocation } from "react-router";
import CurrentWeek from "../currentWeek/CurrentWeek";
import { CurrentDayStyled } from "./CurrentDayStyled";
import { colors } from "../../../general/styles/colors";
import { useSelector } from "react-redux";
import { getStartOfTheWeek } from "../../../redux/additionalInfo/additionalInfoSelectors";
import languages from "../../../languages";
import { LanguageContext } from "../../App";

const initialState = {
  width: window.innerWidth,
  breakPoint: 767,
};

const CurrentDay = ({ selectedDate }) => {
  const [state, setState] = useState(initialState);
  const location = useLocation();
  const { language } = useContext(LanguageContext);

  const startOfTheWeek = useSelector(getStartOfTheWeek);

  const start = startOfTheWeek && moment(startOfTheWeek).format("DD");
  const monthYear = startOfTheWeek && moment(startOfTheWeek).format("MM-YYYY");

  const daysArray = [
    {
      day: "Monday",
      date: +start,
      russianDay: languages[language].days["Понедельник"],
    },
    {
      day: "Tuesday",
      date: +start + 1,
      russianDay: languages[language].days["Вторник"],
    },
    {
      day: "Wednesday",
      date: +start + 2,
      russianDay: languages[language].days["Среда"],
    },
    {
      day: "Thursday",
      date: +start + 3,
      russianDay: languages[language].days["Четверг"],
    },
    {
      day: "Friday",
      date: +start + 4,
      russianDay: languages[language].days["Пятница"],
    },
    {
      day: "Saturday",
      date: +start + 5,
      russianDay: languages[language].days["Суббота"],
    },
    {
      day: "Sunday",
      date: +start + 6,
      russianDay: languages[language].days["Воскресенье"],
    },
  ];

  const dateNumber = daysArray
    .filter(({ day }) => day === selectedDate)
    .map(({ russianDay, date }) => `${russianDay}, ${date}`)
    .join("");

  const newDate = `${dateNumber}-${monthYear}`;

  useEffect(() => {
    window.addEventListener("resize", handleResizeWindow);
    return () => {
      window.removeEventListener("resize", handleResizeWindow);
    };
  }, [location]);

  const handleResizeWindow = () => {
    setState((prev) => ({ ...prev, width: window.innerWidth }));
  };

  const todayDate = moment().format("DD-MM-YYYY");
  const todayDayRaw = moment().format("dddd");
  const todayDay = todayDayRaw[0].toUpperCase() + todayDayRaw.slice(1);

  return (
    <>
      {state.width < state.breakPoint && <CurrentWeek />}

      <CurrentDayStyled colors={colors}>
        {state.width >= 1280 && <CurrentWeek />}
        {state.width >= 1280 && (
          <div>
            <span className="current-tasks">{languages[language].tasks.tasks}</span>
            <span className="current-day">{dateNumber ? newDate : `${todayDay}, ${todayDate}`}</span>
          </div>
        )}
        {state.width < 1280 && (
          <>
            <span className="current-tasks">{languages[language].tasks.tasks}</span>
            <span className="current-day">{dateNumber ? newDate : `${todayDay}, ${todayDate}`}</span>
          </>
        )}
      </CurrentDayStyled>
    </>
  );
};

export default CurrentDay;
