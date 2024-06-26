import styles from "./Images.module.css";
import Img from "../../../../../UI/Image/Img";

const Images = (props) => {
  return (
    <div className={styles["images"]}>
      {props.images.map((imageLink, index) => (
        <Img src={imageLink} key={index} width={"30%"} height={180} />
      ))}
    </div>
  );
};

export default Images;
