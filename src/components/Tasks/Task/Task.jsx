import { useLocation, useNavigate } from "react-router-dom";
import { STATE_COLORS } from "../../../constants/common.constants";
import { badgeColor, col } from "../../../styles/global.styles";
import "./Task.css";
import { useEffect, useLayoutEffect, useMemo, useState } from "react";
import { getLatestState } from "../../../helpers/task.helpers";
import taskStore from "../../../store/task";

const Task = () => {
  const [taskState, setTaskState] = useState(taskStore.initialState);

  useLayoutEffect(() => {
    taskStore.subscribe(setTaskState);
    taskStore.init();
  }, []);

  const location = useLocation();
  const navigate = useNavigate();

  const { title, description, dueDate, stateHistory, notes, index } =
    location.state;

  const state = useMemo(
    () => getLatestState(stateHistory).state,
    [stateHistory]
  );

  useEffect(() => {
    if (!location) {
      navigate("/");
    }
  }, [location, navigate]);

  const handleDeleteTask = () => {
    taskStore.deleteTask(index);
    navigate("/");
  };

  const handleUpdateTask = () => {
    navigate("/task/create", {
      state: { ...location.state },
    });
  };

  return (
    <>
      <div className="row">
        <div style={col(4)}>
          <span className="task-title">{title}</span>
        </div>
        <div style={col(2)}>
          <div className="row">
            <button type="submit" className="blue-btn" onClick={handleUpdateTask}>
              Edit
            </button>
            <button
              type="button"
              className="brown-btn"
              onClick={handleDeleteTask}
            >
              Delete
            </button>
          </div>
        </div>
        <div style={col(2)}>
          <span className="badge" style={badgeColor(STATE_COLORS[state])}>
            {state}
          </span>
        </div>
        <div style={col(4)}>
          <span>Due date: {dueDate}</span>
        </div>
      </div>
      <div className="row">
        <div style={col(6)}>
          <h3>Description</h3>
          <p>{description}</p>
        </div>
        <div style={col(6)}>
          <h3>Notes</h3>
          {notes.map((note, index) => (
            <div key={"note-" + index} className="card">
              {note}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Task;
