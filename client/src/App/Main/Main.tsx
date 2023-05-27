import style from "./Main.module.css";
import Page from "./Page/Page.tsx";

function Main() {
    return (
        <main className={style.main}>
            <Page />
        </main>
    );
}

export default Main;