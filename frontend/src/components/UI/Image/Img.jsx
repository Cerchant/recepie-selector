import styles from "./Img.module.css";

const Img = (props) => {
  return (
    <picture
      style={{
        maxHeight: props.height,
        width: props.width,
        minHeight: props.minHeight,
      }}
      className={styles.img__wrapper + " " + props.className}
    >
      <img
        src={props.src}
        className={styles.img}
        style={{
          borderRadius: `${props.radius}%`,
        }}
      />
    </picture>
  );
};

export default Img;
