import "./KBJUInfo.css";
import KBJUTable from "./KBJUTable/KBJUTable";

const KBJUInfo = (props) => {
    return <div className="kbju-info">
        <p>КБЖУ на 1 порцию</p>
        <KBJUTable 
            k={props.kbju.k.toFixed(2)} 
            b={props.kbju.b.toFixed(2)} 
            j={props.kbju.j.toFixed(2)} 
            u={props.kbju.u.toFixed(2)}
        />
        <p>КБЖУ на 100 грамм</p>
        <KBJUTable
            k={(props.kbju.k * 100 / props.portionMass).toFixed(2)} 
            b={(props.kbju.b * 100 / props.portionMass).toFixed(2)} 
            j={(props.kbju.j * 100 / props.portionMass).toFixed(2)} 
            u={(props.kbju.u * 100 / props.portionMass).toFixed(2)}
        />
    </div>;
}

export default KBJUInfo;