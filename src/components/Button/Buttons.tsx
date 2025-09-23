const Buttons = (props: React.ButtonHTMLAttributes<HTMLButtonElement>) => {
  return (
    <button {...props} className={`button ${props.className}`}>
      Buttons
    </button>
  );
};

export default Buttons;
