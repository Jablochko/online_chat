import { useState } from "react";
import Cell from "../Cell/Cell";

export default function User({data, onClick}) {
    const [selected, setSelected] = useState(false);

    const onClickHandler = () => {
        onClick(data.id, selected);
        setSelected(!selected);
        console.log(123);
    }

    return <Cell onClick={onClickHandler} data={data} selected={selected}></Cell>
}