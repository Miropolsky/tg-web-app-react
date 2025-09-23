import "./Button.css";

const Button = (props: React.ButtonHTMLAttributes<HTMLButtonElement>) => {
  return <button {...props} className={`button ${props.className}`} />;
};

export default Button;
