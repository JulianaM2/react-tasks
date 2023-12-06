import { Subject } from "rxjs";
import data from "../db.json";

const subject = new Subject();

const initialState = {
  tasks: data.tasks || [],
  taskStates: data.states || [],
};

let state = initialState;

const taskStore = {
  init: () => {
    state = { ...state };
    subject.next(state);
  },
  subscribe: (setState) => subject.subscribe(setState),
  addNote: (task) => {
    state = {
      ...state,
      tasks: [...state.tasks, task],
    };

    subject.next(state);
  },
  initialState,
};

export default taskStore;
