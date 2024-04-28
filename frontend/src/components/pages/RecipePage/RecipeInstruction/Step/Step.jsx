import "./Step.css";
import Images from "./Images/Images";

const Step = (props) => {
  return (
    <div className="step">
      <h3>Шаг {props.stepNumber}</h3>
      <p>{props.text}</p>
      <Images images={props.images} />
      {console.log(props.images)}
    </div>
  );
};

export default Step;
