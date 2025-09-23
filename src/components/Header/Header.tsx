import { useTelegram } from "../../hooks/useTelegram";
import Button from "../Button/Button";
import "./Header.css";

const Header = () => {
  const { onClose, user } = useTelegram();

  const getUserDisplayName = () => {
    if (user?.first_name && user?.last_name) {
      return `${user.first_name} ${user.last_name}`;
    }
    if (user?.first_name) {
      return user.first_name;
    }
    if (user?.username) {
      return `@${user.username}`;
    }
    return "Пользователь";
  };

  const getInitials = () => {
    if (user?.first_name) {
      return user.first_name.charAt(0).toUpperCase();
    }
    return "U";
  };

  return (
    <header className="header">
      <div className="header-content">
        <div className="app-logo">
          <div className="logo-icon">📱</div>
          <span className="app-name">MyApp</span>
        </div>
        <div className="user-info">
          <div className="user-avatar">
            {user?.photo_url ? (
              <img src={user.photo_url} alt="Avatar" className="avatar-image" />
            ) : (
              <div className="avatar-placeholder">{getInitials()}</div>
            )}
          </div>

          <div className="user-details">
            <div className="user-name">{getUserDisplayName()}</div>
            {user?.username && (
              <div className="user-username">@{user.username}</div>
            )}
          </div>
        </div>

        <Button className="close-button" onClick={onClose} title="Закрыть">
          <svg
            className="close-icon"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </Button>
      </div>
    </header>
  );
};

export default Header;
