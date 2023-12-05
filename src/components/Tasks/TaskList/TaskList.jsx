import { useEffect, useLayoutEffect, useMemo, useState } from "react";
import "./TaskList.css";
import taskStore from "../../../store/task";

const sliceData = (tasks, page, rows, setSlicedTask) => {
  setSlicedTask(tasks.slice((page - 1) * rows, page * rows));
};


const getPagationValues = (paginationStart, setPaginationStart, tasksLength) => {
  const pages = [];

  for (
    let i = paginationStart;
    i < paginationStart + 4;
    i++
  ) {
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

  useMemo(
    () => sliceData(tasks, paginationStart, 5, setSlicedTasks),
    [paginationStart, tasks]
  );

  const handleNextPage = () => setPaginationStart(paginationStart + 1);
  const handlePreviousPage = () => setPaginationStart(paginationStart - 1);

  useLayoutEffect(() => {
    taskStore.subscribe();
    taskStore.init();
  }, []);

  useEffect(() => {
    const data = taskStore.getTasks();

    setTasks(data);
    sliceData(data, paginationStart, 5, setSlicedTasks);
  }, [paginationStart]);


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
              <td>{task.title}</td>
              <td>{task.dueDate}</td>
              <td>{task.state}</td>
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