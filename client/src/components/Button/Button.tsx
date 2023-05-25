import style from "./Button.module.css";

export enum ButtonSize {
    Small,
    Medium,
    Large,
}

interface Props {
    text: string;
    onClick: () => void;
    size?: ButtonSize;
}

function Button({text, onClick, size}: Props) {
    const buttonStyle = {
        [ButtonSize.Small]: style.small,
        [ButtonSize.Medium]: style.medium,
        [ButtonSize.Large]: style.large,
    }[size ?? ButtonSize.Medium];
    return (
        <button onClick={onClick} className={style.button + " " + buttonStyle}>
            {text}
        </button>
    );
}

export default Button;