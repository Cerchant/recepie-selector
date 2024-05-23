import styles from "./ProfileTable.module.css";

const ProfileTable = ({ rows, className }) => {
  return (
    <>
      {rows.length !== 0 && (
        <table className={styles.table + " " + className}>
          <thead className={styles.table__head}>
            <tr>
              <th className={styles.table__th}>Рецепт</th>
              <th className={styles.table__th}>Калории</th>
              <th className={styles.table__th}>Белки</th>
              <th className={styles.table__th}>Жиры</th>
              <th className={styles.table__th}>Углеводы</th>
            </tr>
          </thead>
          <tbody className={styles.table__body}>
            {rows.map((row) => {
              return (
                <tr key={row.id} className={styles.table__row}>
                  <td className={styles.table__td}>{row.name}</td>
                  <td className={styles.table__td}>{row.k}</td>
                  <td className={styles.table__td}>{row.b}</td>
                  <td className={styles.table__td}>{row.j}</td>
                  <td className={styles.table__td}>{row.u}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </>
  );
};

export default ProfileTable;
