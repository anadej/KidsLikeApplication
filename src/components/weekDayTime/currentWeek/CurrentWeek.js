import React, { useContext } from "react";
import * as moment from "moment";
import "moment/locale/ru";
import { getEndOfTheWeek, getStartOfTheWeek } from "../../../redux/additionalInfo/additionalInfoSelectors";
import { CurrentWeekStyled } from "./CurrentWeekStyled";
import { useSelector } from "react-redux";
import { colors } from "../../../general/styles/colors";
import languages from "../../../languages";
import { LanguageContext } from "../../App";

const CurrentWeek = () => {
  const startOfTheWeek = useSelector(getStartOfTheWeek);
  const endOfTheWeek = useSelector(getEndOfTheWeek);
  const { language } = useContext(LanguageContext);

  const start = startOfTheWeek && moment(startOfTheWeek).format("DD");
  const end = endOfTheWeek && moment(endOfTheWeek).format("DD MMMM").split(" ");

  const month = end[1];
  const newEnd = end[0] + " " + languages[language].days[month];
  // + moment(endOfTheWeek).format("MMMM");
  console.log(`end`, end);
  console.log(`start`, start);

  return (
    <CurrentWeekStyled colors={colors}>
      <p className="current-week">
        {languages[language].days["Неделя"]}: {start}-{newEnd}
      </p>
    </CurrentWeekStyled>
  );
};

export default CurrentWeek;
