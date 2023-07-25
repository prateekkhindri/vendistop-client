import { ToastContainer } from "react-toastify";
import { Routers } from "./routes";

function App() {
  return (
    <div className="app">
      <Routers />

      <ToastContainer theme="colored" />
    </div>
  );
}

export default App;
