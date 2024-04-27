import "./NarrowOrangeButton.css";

const NarrowOrangeButton = (props) => {
    return <button className="narrow-orange-button" onClick={props.onClick}>{props.text}</button>;
}

export default NarrowOrangeButton;