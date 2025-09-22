import { useEffect } from "react";
import "./App.css";
import "./telegram";

const tg = window.Telegram.WebApp;

function App() {
  useEffect(() => {
    tg.ready();
  }, []);

  const onClose = () => {
    tg.close();
  };

  return (
    <div>
      <button onClick={onClose}>Закрыть</button>
    </div>
  );
}

export default App;
