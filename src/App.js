import "./App.css";
import { RouterProvider } from "react-router-dom";
import { router } from "./router";

function App() {
  return (
    <div className="App">
      <div className="app-body">
        <RouterProvider router={router} />
      </div>
    </div>
  );
}

export default App;
