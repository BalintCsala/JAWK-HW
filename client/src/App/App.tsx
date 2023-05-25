import style from "./App.module.css";
import Header from "./Header/Header.tsx";
import Nav from "./Nav/Nav.tsx";
import Main from "./Main/Main.tsx";

function App() {
    return (
        <div className={style.page}>
            <Header />
            <div className={style.content}>
                <Nav />
                <Main />
            </div>
        </div>
    );
}

export default App;
