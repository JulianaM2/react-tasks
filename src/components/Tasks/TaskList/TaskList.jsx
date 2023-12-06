import { useEffect, useLayoutEffect, useMemo, useState } from "react";
import "./TaskList.css";
import taskStore from "../../../store/task";
import { useNavigate } from "react-router-dom";
import { getLatestState } from "../../../helpers/task.helpers";

const sliceData = (tasks, page, rows, setSlicedTask) => {
  setSlicedTask(tasks.slice((page - 1) * rows, page * rows));
};

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

const TaskList = () => {
  const [paginationStart, setPaginationStart] = useState(1);
  const [taskState, setTaskState] = useState(taskStore.initialState);
  const [tasks, setTasks] = useState([]);
  const [slicedTasks, setSlicedTasks] = useState([]);
  const navigate = useNavigate();

  useMemo(
    () => sliceData(tasks, paginationStart, 5, setSlicedTasks),
    [paginationStart, tasks]
  );


  const handleNextPage = () => setPaginationStart(paginationStart + 1);
  const handlePreviousPage = () => setPaginationStart(paginationStart - 1);
  const handleNavigateToTaskDetails = (task) =>
    navigate("/task/details", {
      state: { ...task },
    });

  useLayoutEffect(() => {
    taskStore.subscribe(setTaskState);
    taskStore.init();
  }, []);

  useEffect(() => {
    setTasks(taskState.tasks);
    sliceData(taskState.tasks, paginationStart, 5, setSlicedTasks);
  }, [paginationStart, taskState.tasks]);

  return (
    <>
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Due date</th>
            <th>State</th>
          </tr>
        </thead>
        <tbody>
          {slicedTasks.map((task, index) => (
            <tr key={"task-" + index}>
              <td onClick={() => handleNavigateToTaskDetails(task)}>
                {task.title}
              </td>
              <td>{task.dueDate}</td>
              <td>{getLatestState(task.stateHistory).state}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pagination">
        <button disabled={paginationStart === 1} onClick={handlePreviousPage}>
          &laquo;
        </button>
        {getPagationValues(paginationStart, setPaginationStart, tasks.length)}
        <button onClick={handleNextPage}>&raquo;</button>
      </div>
    </>
  );
};

export default TaskList;
