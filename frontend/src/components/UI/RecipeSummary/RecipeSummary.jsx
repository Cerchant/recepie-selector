import "./RecipeSummary.css";
import MiddleColumn from "./MiddleColumn/MiddleColumn";
import KBJUInfo from "./KBJUInfo/KBJUInfo";

const RecipeSummary = (props) => {
    return <div>
        

        <img src={props.imageLink} />
        <MiddleColumn ingridients={props.ingridients} portionMass={props.portionMass}/>
        <KBJUInfo kbju={props.kbju} portionMass={props.portionMass}/>
        {/* <p>Список продуктов</p>
        <ul>
            {
                props.ingridients.map((ingridient, index) => (
                    <li key={index}>{ingridient}</li>
                ))
            }
        </ul>
        <p>Масса одной порции:</p>
        <p>{props.portionMass} грам</p>
        <p>КБЖУ на 1 порцию</p>
        <p>К: {props.kbju.k.toFixed(2)}</p>
        <p>Б: {props.kbju.b.toFixed(2)}</p>
        <p>Ж: {props.kbju.j.toFixed(2)}</p>
        <p>У: {props.kbju.u.toFixed(2)}</p>
        <p>КБЖУ на 100 грамм</p>
        <p>К: {(props.kbju.k * 100 / props.portionMass).toFixed(2)}</p>
        <p>Б: {(props.kbju.b * 100 / props.portionMass).toFixed(2)}</p>
        <p>Ж: {(props.kbju.j * 100 / props.portionMass).toFixed(2)}</p>
        <p>У: {(props.kbju.u * 100 / props.portionMass).toFixed(2)}</p> */}

    </div>;
}

export default RecipeSummary;