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

const showTaskList = (
  slicedTasks,
  handleNavigateToTaskDetails,
  handleChangeTaskState
) =>
  slicedTasks.map((task, index) => {
    const latestState = getLatestState(task.stateHistory, index).state;

    return (
      <tr key={"task-" + index}>
        <td onClick={() => handleNavigateToTaskDetails(task, index)}>
          {task.title}
        </td>
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
  const [currentPage, setCurrentPage] = useState(1);
  const [taskState, setTaskState] = useState(taskStore.initialState);
  const navigate = useNavigate();

  useLayoutEffect(() => {
    taskStore.subscribe(setTaskState);
    taskStore.init();
  }, []);

  const slicedTasks = useMemo(
    () => sliceData(taskState.tasks, currentPage, 5),
    [currentPage, taskState.tasks]
  );

  const handleNextPage = () => setCurrentPage(currentPage + 1);
  const handlePreviousPage = () => setCurrentPage(currentPage - 1);

  const handleNavigateToTaskDetails = (task, index) =>
    navigate("/task/details", {
      state: { ...task, index },
    });
  const handleNavigateToAddNote = () => navigate("/task/create");
  
  const handleChangeTaskState = (task, index) => {
    const newState = {
      state: "closed",
      date: getDateFromFullDateTime(new Date()),
    };

    task.stateHistory.push(newState);
    taskStore.updateTask(task, index);
  };

  const isTheLastPage = () =>
    currentPage < Math.ceil(taskState.tasks.length / 5);
  const isTheFirstPage = () => currentPage > 1;

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
        {isTheFirstPage() && (
          <button onClick={handlePreviousPage}>&laquo;</button>
        )}
        <button>{currentPage}</button>
        {isTheLastPage() && <button onClick={handleNextPage}>&raquo;</button>}
      </div>
    </>
  );
};

export default TaskList;
