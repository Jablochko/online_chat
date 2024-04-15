import { useState } from "react";
import style from './Cell.module.css'

export default function Cell({data, onClick, selected = false}) {

    return (
        <div key={data.id}
            className={style.cell + " " + ((selected) ? style.accept : "")} 
            onClick={() => onClick(data.id)}>{data.name}</div>
        );
}