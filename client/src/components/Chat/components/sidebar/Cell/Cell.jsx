import { useState } from "react";
import style from './Cell.module.css'

export default function Cell({data, onclick}) {
    const [selected, setSelected] = useState(false);

    const onClickHandler = () => {
        onclick(data.id);
        setSelected(!selected);
    }

    return (
        <div key={data.id}
            className={style.cell + " " + ((selected) ? style.accept : "")} 
            onClick={onClickHandler}>{data.name}</div>
        );
}