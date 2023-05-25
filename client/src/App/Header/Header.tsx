import style from "./Header.module.css";
import LogoSVG from "./beaver.svg";

function Header() {
    return (
        <header className={style.header}>
            <img src={LogoSVG} alt="" className={style.logo} />
            <a href="/" className={style.title}>Beaver</a>
            <span className={style.motto}>
                Any resemblence to a different social media platform is purely coincidental.
            </span>
        </header>
    );
}

export default Header;