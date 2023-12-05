import { createBrowserRouter } from "react-router-dom";
import Task from "./components/Tasks/Task/Task";
import TaskList from "./components/Tasks/TaskList/TaskList";

const router = createBrowserRouter([
  {
    path: '/',
    element: <TaskList />
  },
  {
    path: '/task/details',
    element: <Task />
  }
]);

export {
  router
}