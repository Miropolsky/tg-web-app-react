import { useTelegram } from "../../hooks/useTelegram";
import Buttons from "../Button/Buttons";
import "./Header.css";

const Header = () => {
  const { onClose, user } = useTelegram();

  return (
    <div className="header">
      <Buttons onClick={onClose}>Закрыть</Buttons>
      <span className="username">{user?.username}</span>
    </div>
  );
};

export default Header;
