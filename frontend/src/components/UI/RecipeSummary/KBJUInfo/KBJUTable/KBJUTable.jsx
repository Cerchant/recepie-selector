import styles from "./KBJUTable.module.css";

const KBJUTable = (props) => {
<<<<<<< HEAD
  return (
    <table className={styles["kbju-table"] + " " + props.className}>
      <thead>
        <tr>
          <th className={styles["kbju-table__head"]}>Б</th>
          <th className={styles["kbju-table__head"]}>К</th>
          <th className={styles["kbju-table__head"]}>Ж</th>
          <th className={styles["kbju-table__head"]}>У</th>
=======
    return <table className="kbju-table">
        <tr>
            <th className="kbju-table__head">К</th>
            <th className="kbju-table__head">Б</th>
            <th className="kbju-table__head">Ж</th>
            <th className="kbju-table__head">У</th>
>>>>>>> e50d37de3a026563083c4877786a22fa4933f540
        </tr>
        <tr>
<<<<<<< HEAD
          <td className={styles["kbju-table__cell"]}>{props.k}</td>
          <td className={styles["kbju-table__cell"]}>{props.b}</td>
          <td className={styles["kbju-table__cell"]}>{props.j}</td>
          <td className={styles["kbju-table__cell"]}>{props.u}</td>
=======
            <td className="kbju-table__cell">{props.k}</td>
            <td className="kbju-table__cell">{props.b}</td>
            <td className="kbju-table__cell">{props.j}</td>
            <td className="kbju-table__cell">{props.u}</td>
>>>>>>> e50d37de3a026563083c4877786a22fa4933f540
        </tr>
    </table>;
}

export default KBJUTable;