import "./NarrowOrangeButton.css";

const NarrowOrangeButton = (props) => {
  return (
    <button
      className={"narrow-orange-button " + props.className}
      onClick={props.onClick}
    >
      {props.children}
    </button>
  );
};

export default NarrowOrangeButton;
