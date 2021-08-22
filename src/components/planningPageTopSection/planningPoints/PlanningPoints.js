import { useSelector } from "react-redux";
import {
  getEndWeekDate,
  getRewardsPlanned,
  getStartWeekDate,
} from "../../../redux/tasks/tasksSelector";
import { PlanningPointsStyled } from "./PlanningPointsStyled";

const PlanningPoints = ({ isMobile }) => {
  const startWeekDate = useSelector(getStartWeekDate);
  const endWeekDate = useSelector(getEndWeekDate);
  const rewardsPlanned = useSelector(getRewardsPlanned);

  const configuredStartingDate = () => {
    const date = new Date(startWeekDate);
    const day = date.getDate();
    return day;
  };

  const startingDate = configuredStartingDate();

  const configuredEndingDate = () => {
    const date = new Date(endWeekDate);
    const day = date.getDate();
    let month = date.getMonth() + 1;
    const year = date.getFullYear();

    if (month.toString().length === 1) {
      month = "0" + month;
    }

    return `${day}.${month}.${year}`;
  };

  const endingDate = configuredEndingDate();

  return (
    <PlanningPointsStyled>
      <p className="weekPlansText">
        План на неделю:
        {!isMobile ? (
          <span className="weekPlansDate">{`${configuredStartingDate()} - ${configuredEndingDate()}`}</span>
        ) : (
          <select name="date" id="date">
            <option value="default">{`${startingDate} - ${endingDate}`}</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
          </select>
        )}
      </p>

      {!isMobile && (
        <p className="totalWeekPlans">
          Определены задач на
          <span className="totalWeekPlansNumber">{rewardsPlanned}</span> баллов
        </p>
      )}
    </PlanningPointsStyled>
  );
};

export default PlanningPoints;
