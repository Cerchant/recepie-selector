import "./Images.css";

const Images = (props) => {
    return <div className="images">
        {
            props.images.map((image, index) =>
                <img src={image.imageLink} key={index}/>
            )
        }
    </div>;
}

export default Images;