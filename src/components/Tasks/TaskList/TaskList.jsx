import { useLayoutEffect, useMemo, useState } from "react";
import "./TaskList.css";
import taskStore from "../../../store/task";
import { useNavigate } from "react-router-dom";
import {
  getDateFromFullDateTime,
  getLatestState,
} from "../../../helpers/task.helpers";

const sliceData = (tasks, page, rows) =>
  tasks.slice((page - 1) * rows, page * rows);

const getPagationValues = (paginationStart, setPaginationStart) => {
  const pages = [];

  for (let i = paginationStart; i < paginationStart + 4; i++) {
    pages.push(
      <button
        className={paginationStart === i ? "active-page" : ""}
        onClick={() => {
          setPaginationStart(i);
        }}
        key={"page-" + i}
      >
        {i}
      </button>
    );
  }

  return pages;
};

const showTaskList = (
  slicedTasks,
  handleNavigateToTaskDetails,
  handleChangeTaskState
) =>
  slicedTasks.map((task, index) => {
    const latestState = getLatestState(task.stateHistory, index).state;
    console.log(index, latestState);
    return (
      <tr key={"task-" + index}>
        <td onClick={() => handleNavigateToTaskDetails(task)}>{task.title}</td>
        <td>{task.dueDate}</td>
        <td>{latestState}</td>
        <td>
          {latestState !== "closed" && (
            <button
              onClick={() => handleChangeTaskState(task, index)}
              className="brown-btn"
            >
              Completed
            </button>
          )}
        </td>
      </tr>
    );
  });

const TaskList = () => {
  const [paginationStart, setPaginationStart] = useState(1);
  const [taskState, setTaskState] = useState(taskStore.initialState);
  const navigate = useNavigate();

  useLayoutEffect(() => {
    taskStore.subscribe(setTaskState);
    taskStore.init();
  }, []);

  const slicedTasks = useMemo(
    () => sliceData(taskState.tasks, paginationStart, 5),
    [paginationStart, taskState.tasks]
  );

  const handleNextPage = () => setPaginationStart(paginationStart + 1);
  const handlePreviousPage = () => setPaginationStart(paginationStart - 1);
  const handleNavigateToTaskDetails = (task) =>
    navigate("/task/details", {
      state: { ...task },
    });
  const handleNavigateToAddNote = () => navigate("/task/create");
  const handleChangeTaskState = (task, index) => {
    const newState = {
      state: "closed",
      date: getDateFromFullDateTime(new Date()),
    };
    console.log(newState);
    task.stateHistory.push(newState);
    taskStore.updateTask(task, index);
    console.log(taskState.tasks);
  };

  return (
    <>
      <div className="add-note-div">
        <button className="brown-btn" onClick={handleNavigateToAddNote}>
          Add note
        </button>
      </div>
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Due date</th>
            <th>State</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {showTaskList(
            slicedTasks,
            handleNavigateToTaskDetails,
            handleChangeTaskState
          )}
        </tbody>
      </table>
      <div className="pagination">
        <button disabled={paginationStart === 1} onClick={handlePreviousPage}>
          &laquo;
        </button>
        {getPagationValues(
          paginationStart,
          setPaginationStart,
          taskState.tasks.length
        )}
        <button onClick={handleNextPage}>&raquo;</button>
      </div>
    </>
  );
};

export default TaskList;
