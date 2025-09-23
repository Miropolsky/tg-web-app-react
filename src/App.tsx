import { useEffect } from "react";
import "./App.css";
import Header from "./components/Header/Header";
import { useTelegram } from "./hooks/useTelegram";

function App() {
  const { tg, onToggleButton } = useTelegram();

  useEffect(() => {
    tg.ready();
    onToggleButton();
  }, []);

  return (
    <div className="app">
      <Header />
      <button onClick={onToggleButton}>Toggle Button</button>
    </div>
  );
}

export default App;
