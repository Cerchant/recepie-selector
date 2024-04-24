import "./Step.css";

const Step = (props) => {
    return <div>
        <h2>Шаг {props.stepNumber}</h2>
        <p>{props.text}</p>
        {
            props.images.map((image, index) =>
                <img src={image.imageLink} key={index}/>
            )
        }
    </div>;
}

export default Step;