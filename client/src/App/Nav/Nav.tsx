import style from "./Nav.module.css";
import {useState} from "react";
import Authentication from "./Login/Authentication.tsx";
import {Link} from "react-router-dom";
import {useAppSelector} from "../../redux/reduxHooks.ts";

function Nav() {
    const [active, setActive] = useState(false);
    const username = useAppSelector(state => state.authentication.username);

    return (
        <>
            <button className={style.burger + " " + (active ? style.active : "")} onClick={() => setActive(!active)}>
            </button>
            <aside className={style.sidebar + " " + (active ? style.active : "")}>
                <nav className={style.nav}>
                    <Link className={style.navLink} to="/">Explore</Link>
                    <Link className={style.navLink} to={`/user/${username}`}>Profile</Link>
                    <Authentication />
                </nav>
            </aside>
        </>
    );
}

export default Nav;