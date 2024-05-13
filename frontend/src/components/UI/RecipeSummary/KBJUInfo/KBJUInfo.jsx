import styles from "./KBJUInfo.module.css";
import KBJUTable from "./KBJUTable/KBJUTable";

const KBJUInfo = (props) => {
  return (
    <div className={styles["kbju-info"] + " " + props.className}>
      <p className={styles["kbju-info__title"]}>КБЖУ на 1 порцию</p>
      <KBJUTable
        className={styles["kbju-info--mb25"]}
        k={props.kbju.k.toFixed(0)}
        b={props.kbju.b.toFixed(0)}
        j={props.kbju.j.toFixed(0)}
        u={props.kbju.u.toFixed(0)}
      />
      <p className={styles["kbju-info__title"]}>КБЖУ на 100 грамм</p>
      <KBJUTable
        k={((props.kbju.k * 100) / props.portionMass).toFixed(0)}
        b={((props.kbju.b * 100) / props.portionMass).toFixed(0)}
        j={((props.kbju.j * 100) / props.portionMass).toFixed(0)}
        u={((props.kbju.u * 100) / props.portionMass).toFixed(0)}
      />
    </div>
  );
};

export default KBJUInfo;
