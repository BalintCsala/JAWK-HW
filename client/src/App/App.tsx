import style from "./App.module.css";
import Header from "./Header/Header.tsx";
import Nav from "./Nav/Nav.tsx";
import Main from "./Main/Main.tsx";
import {HashRouter} from "react-router-dom";

function App() {
    return (
        <HashRouter>
            <div className={style.page}>
                <Header />
                <div className={style.content}>
                    <Nav />
                    <Main />
                </div>
            </div>
        </HashRouter>
    );
}

export default App;
