import "./MiddleColumn.css";

const MiddleColumn = (props) => {
    return <div>
        <p>Список продуктов</p>
        <ul>
            {
                props.ingridients.map((ingridient, index) => (
                    <li key={index}>{ingridient}</li>
                ))
            }
        </ul>
        <p>Масса одной порции:</p>
        <p>{props.portionMass} грам</p>
    </div>;
}

export default MiddleColumn;