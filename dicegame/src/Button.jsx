import "./Button.css";
import classNames from "classnames";

const Button = ({ children, onClick, color, className }) => {
  const style = color === "red" ? "redStyle" : "blueStyle";
  return (
    <button className={classNames(style, className)} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;