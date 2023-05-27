import style from "./Main.module.css";
import ExplorePage from "./ExplorePage/ExplorePage.tsx";

function Main() {
    return (
        <main className={style.main}>
            <ExplorePage />
        </main>
    );
}

export default Main;