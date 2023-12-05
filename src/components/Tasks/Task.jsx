import { STATE_COLORS } from "../../constants/common.constants";
import { badgeColor, col } from "../../styles/global.styles";
import "./Task.css";

const Task = () => {
  const notes = ["Lorem ipsum dolor sit amet, consectetur adipisicing elit"];

  return (
    <>
      <div className="row">
        <div style={col(6)}>
          <span className="task-title">Task 1</span>
        </div>
        <div style={col(2)}>
          <span className="badge" style={badgeColor(STATE_COLORS.closed)}>
            Closed
          </span>
        </div>
        <div style={col(4)}>
          <span>Due date: 08/10/2024</span>
        </div>
      </div>
      <div className="row">
        <div style={col(6)}>
          <h3>Description</h3>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            Temporibus, facere illum. Aliquid beatae unde inventore, aut error
            ad soluta similique mollitia quia aspernatur nulla sapiente tempore
            ut debitis, animi consequuntur!
          </p>
        </div>
        <div style={col(6)}>
          <h3>Notes</h3>
          {notes.map((note) => (
            <div className="card">{note}</div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Task;
