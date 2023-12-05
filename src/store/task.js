import { Subject } from "rxjs";
import data from "../db.json";

const subject = new Subject();

const initialState = {
  tasks: data.tasks || [],
  taskStates: data.states || [],
};

let state = initialState;

const taskStore = {
  init: () => subject.next(state),
  subscribe: (setState) => subject.subscribe(setState),
  getTasks: () => {
    return state.tasks;
  },
  initialState,
};

export default taskStore;
