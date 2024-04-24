import "./KBJUTable.css";

const KBJUTable = (props) => {
    return <table>
        <tr>
            <th>К</th>
            <th>Б</th>
            <th>Ж</th>
            <th>У</th>
        </tr>
        <tr>
            <td>{props.k}</td>
            <td>{props.b}</td>
            <td>{props.j}</td>
            <td>{props.u}</td>
        </tr>
    </table>;
}

export default KBJUTable;