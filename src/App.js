import { ToastContainer } from "react-toastify";
import { Routers } from "./routes";
import { EmailProvider } from "./context/EmailContext";
import { useState } from "react";

function App() {
  const [email, setEmail] = useState(null);

  return (
    <div className="app">
      <EmailProvider value={{ email, setEmail }}>
        <Routers />
      </EmailProvider>

      <ToastContainer theme="colored" />
    </div>
  );
}

export default App;
