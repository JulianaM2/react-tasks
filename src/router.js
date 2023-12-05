import { createBrowserRouter } from "react-router-dom";
import Task from "./components/Tasks/Task/Task";

const router = createBrowserRouter([
  {
    path: '/task/details',
    element: <Task />
  }
]);

export {
  router
}