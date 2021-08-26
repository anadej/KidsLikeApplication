import { useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import languages from "../../../languages";
import { data } from "../../../languages/new";
import { getSelectedDateId } from "../../../redux/planningTasks/planningTasksSelector";
import { setDaysSingleTaskOperation, toggleTaskOperation } from "../../../redux/tasks/tasksOperations";
import { LanguageContext } from "../../App";
import TaskAddIcon from "../../taskAddIcon/TaskAddIcon";
import TaskStatusIcon from "../../taskStatusIcon/TaskStatusIcon";
import TaskToggle from "../../taskToggle/TaskToggle";
import { CardItemStyled } from "./CardStyled";

const Card = ({ task, currentDateId, selectedDate, previousDay, presentDay }) => {
  const dispatch = useDispatch();
  const location = useLocation().pathname;
  const { language } = useContext(LanguageContext);
  const selectedDropdownDate = useSelector(getSelectedDateId);

  function declOfNum(n, text) {
    n = Math.abs(n) % 100;
    const n1 = n % 10;
    if (n > 10 && n < 20) {
      return text[2];
    }
    if (n1 > 1 && n1 < 5) {
      return text[1];
    }
    if (n1 === 1) {
      return text[0];
    }
    return text[2];
  }

  const onTaskToggle = (taskId) => {
    const date = { date: task.days[currentDateId].date };

    dispatch(toggleTaskOperation({ taskId, date }));
  };

  const isExactDate = () => {
    return selectedDropdownDate !== "default";
  };

  const selectedDateStatus = () => {
    if (!isExactDate(selectedDropdownDate)) return 0;
    return selectedDropdownDate;
  };

  const taskStatusRequest = (taskId) => {
    let dataInitial = task.days.map((day) => day.isActive);
    const previousValue = task.days[selectedDropdownDate].isActive;
    dataInitial.splice(selectedDropdownDate, 1, !previousValue);

    const daysOfTask = { days: dataInitial };

    dispatch(setDaysSingleTaskOperation(taskId, daysOfTask));
  };

  return (
    <CardItemStyled location={location}>
      <div className="card">
        <img className="card__image" src={task.imageUrl} alt={task.title} />
        <div className="card__footer">
          <div className="card__info">
            <h3 className="card__taskName">{languages[language].tasks[task.title]}</h3>
            <span className="card__rewardTag">{`${task.reward} ${declOfNum(task.reward, [
              languages[language].tasks["балл"],
              languages[language].tasks["балла"],
              languages[language].tasks["баллов"],
            ])}`}</span>
          </div>
          {location === "/" && presentDay && (
            <TaskToggle
              taskId={task._id}
              isChecked={task.days[currentDateId].isCompleted}
              onTaskToggle={onTaskToggle}
            />
          )}
          {location === "/" && previousDay && <TaskStatusIcon completionStatus={task.days[selectedDate].isCompleted} />}
          {location === "/planning" ? (
            <TaskAddIcon
              task={task}
              taskId={task._id}
              exactDate={isExactDate()}
              isTaskScheduled={task.days[selectedDateStatus()].isActive}
              taskStatusRequest={taskStatusRequest}
            />
          ) : null}
        </div>
      </div>
    </CardItemStyled>
  );
};

export default Card;
