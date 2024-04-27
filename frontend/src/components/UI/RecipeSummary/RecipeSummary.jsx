import "./RecipeSummary.css";
import MiddleColumn from "./MiddleColumn/MiddleColumn";
import KBJUInfo from "./KBJUInfo/KBJUInfo";

const RecipeSummary = (props) => {
    return <div className="recipe-summary">
        <img width={333} height={242} src={props.imageLink} />
        <MiddleColumn ingridients={props.ingridients} portionMass={props.portionMass}/>
        <KBJUInfo kbju={props.kbju} portionMass={props.portionMass}/>
    </div>;
}

export default RecipeSummary;