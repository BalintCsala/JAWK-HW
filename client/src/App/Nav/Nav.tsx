import style from "./Nav.module.css";
import {useState} from "react";
import Authentication from "./Login/Authentication.tsx";

// TODO: Get user data from API
const user = "balint";

function Nav() {
    const [active, setActive] = useState(false);

    return (
        <>
            <button className={style.burger + " " + (active ? style.active : "")} onClick={() => setActive(!active)}>
            </button>
            <aside className={style.sidebar + " " + (active ? style.active : "")}>
                <nav className={style.nav}>
                    <a className={style.navLink} href="/">Home</a>
                    <a className={style.navLink} href="/explore">Explore</a>
                    <a className={style.navLink} href={`/user/${user}`}>Profile</a>
                    <Authentication />
                </nav>
            </aside>
        </>
    );
}

export default Nav;