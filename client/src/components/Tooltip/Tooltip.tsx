import style from "./Tooltip.module.css";

interface Props {
    text: string;
}

function Tooltip({text}: Props) {
    return (
        <div className={style.container}>
            <span className={style.icon}>i</span>
            <span className={style.tooltip}>{text}</span>
        </div>
    )
}

export default Tooltip;