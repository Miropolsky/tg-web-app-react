import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import { Form } from "./components/Form/Form";
import Header from "./components/Header/Header";
import { ProductList } from "./components/ProductList/ProductList";
import { useTelegram } from "./hooks/useTelegram";

function App() {
  const { tg, onToggleButton } = useTelegram();

  useEffect(() => {
    tg.ready();
    onToggleButton();
  }, [onToggleButton, tg]);

  return (
    <div className="app">
      <Header />
      <div className="app-content">
        <main className="main-content">
          <div className="form-wrapper">
            <Routes>
              <Route index element={<ProductList />} />
              <Route path="/form" element={<Form />} />
            </Routes>
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;
