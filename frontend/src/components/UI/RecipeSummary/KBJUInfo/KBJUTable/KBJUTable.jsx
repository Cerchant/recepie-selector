import styles from "./KBJUTable.module.css";

const KBJUTable = (props) => {
  return (
    <table className={styles["kbju-table"] + " " + props.className}>
      <thead>
        <tr>
          <th className={styles["kbju-table__head"]}>Б</th>
          <th className={styles["kbju-table__head"]}>К</th>
          <th className={styles["kbju-table__head"]}>Ж</th>
          <th className={styles["kbju-table__head"]}>У</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td className={styles["kbju-table__cell"]}>{props.k}</td>
          <td className={styles["kbju-table__cell"]}>{props.b}</td>
          <td className={styles["kbju-table__cell"]}>{props.j}</td>
          <td className={styles["kbju-table__cell"]}>{props.u}</td>
        </tr>
      </tbody>
    </table>
  );
};

export default KBJUTable;
