import "./RecipeInstruction.css";
import Step from "./Step/Step";

const RecipeInstruction = (props) => {
  return (
    <div className="recipe-instruction">
      {props.instruction.map((step, index) => (
        <Step
          text={step.text}
          key={index + 1}
          stepNumber={index + 1}
          images={step.images}
        />
      ))}
    </div>
  );
};

export default RecipeInstruction;
