import "./KBJUTable.css";

const KBJUTable = (props) => {
    return <table className="kbju-table">
        <tr>
            <th className="kbju-table__head">К</th>
            <th className="kbju-table__head">Б</th>
            <th className="kbju-table__head">Ж</th>
            <th className="kbju-table__head">У</th>
        </tr>
        <tr>
            <td className="kbju-table__cell">{props.k}</td>
            <td className="kbju-table__cell">{props.b}</td>
            <td className="kbju-table__cell">{props.j}</td>
            <td className="kbju-table__cell">{props.u}</td>
        </tr>
    </table>;
}

export default KBJUTable;