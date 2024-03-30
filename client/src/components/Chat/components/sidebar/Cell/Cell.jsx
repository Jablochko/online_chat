export default function Cell(data, onclick) {
    const [selected, setSelected] = useState(false);

    return (
        <div onclick = {() => onclick(setSelected)}>
            {data}
        </div>
    )
}