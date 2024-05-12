import { useState } from "react";
import styles from "./Button.module.css";

const shadeColor = (color, percent) => {
  var R = parseInt(color.substring(1, 3), 16);
  var G = parseInt(color.substring(3, 5), 16);
  var B = parseInt(color.substring(5, 7), 16);
  R = parseInt((R * (100 + percent)) / 100);
  G = parseInt((G * (100 + percent)) / 100);
  B = parseInt((B * (100 + percent)) / 100);
  R = R < 255 ? R : 255;
  G = G < 255 ? G : 255;
  B = B < 255 ? B : 255;
  R = Math.round(R);
  G = Math.round(G);
  B = Math.round(B);
  var RR = R.toString(16).length == 1 ? "0" + R.toString(16) : R.toString(16);
  var GG = G.toString(16).length == 1 ? "0" + G.toString(16) : G.toString(16);
  var BB = B.toString(16).length == 1 ? "0" + B.toString(16) : B.toString(16);
  return "#" + RR + GG + BB;
};

const Button = (props) => {
  const [isHover, setIsHover] = useState(false);

  const toggleIsHover = () => {
    setIsHover((prev) => !prev);
  };

  return (
    <button
      className={styles.btn + " " + props.className}
      style={{
        backgroundColor: !isHover ? props.color : shadeColor(props.color, -8),
      }}
      type={props.type}
      onMouseEnter={toggleIsHover}
      onMouseLeave={toggleIsHover}
    >
      {props.children}
    </button>
  );
};

export default Button;
