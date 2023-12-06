import "./App.css";
import { RouterProvider } from "react-router-dom";
import { router } from "./router";
import { col } from "./styles/global.styles";
import Navbar from "./components/Navbar/Navbar";

function App() {
  return (
    <div className="App">
      <div className="row app-row">
        <div className="app-col" style={col(2)}>
          <Navbar />
        </div>
        <div className="app-col" style={col(10)}>
          <div className="app-body">
            <RouterProvider router={router} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
