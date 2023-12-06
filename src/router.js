import { createBrowserRouter } from "react-router-dom";
import Task from "./components/Tasks/Task/Task";
import TaskList from "./components/Tasks/TaskList/TaskList";
import TaskForm from "./components/Tasks/TaskForm/TaskForm";

const router = createBrowserRouter([
  {
    path: '/',
    element: <TaskList />
  },
  {
    path: '/task/details',
    element: <Task />
  },
  {
    path: '/task/create',
    element: <TaskForm />
  }
]);

export {
  router
}