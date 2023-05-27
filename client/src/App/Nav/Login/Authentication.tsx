import style from "./Authentication.module.css";
import {useAppDispatch, useAppSelector} from "../../../redux/reduxHooks.ts";
import {useEffect, useState} from "react";
import {checkToken, handleLogin, handleLogout, handleRegister} from "../../../api/authentication.ts";
import {login, logout} from "../../../redux/authentication.ts";
import Button from "../../../components/Button/Button.tsx";

function LoggedIn({username, name}: {username: string, name: string}) {
    const token = useAppSelector(state => state.authentication.token);
    const dispatch = useAppDispatch();
    return (
        <>
            <span>Logged in as {name} ({username})</span>
            <Button text="Logout" onClick={async () => {
                const result = await handleLogout(token ?? "");
                if (!result) {
                    alert("Logout failed!");
                    return;
                }
                dispatch(logout());
            }} />
        </>
    );
}

function LoginOrRegister() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const dispatch = useAppDispatch();

    return (
        <>
            <span>Not logged in</span>
            <h2>Login</h2>
            <input type="text" placeholder="Username" onChange={e => setUsername(e.target.value)} />
            <input type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} />
            <Button text="Login" onClick={async () => {
                const result = await handleLogin(username, password);
                if (!result) {
                    alert("Login failed!");
                    return;
                }

                dispatch(login({username: result.user.username, name: result.user.name, token: result.token}));
            }} />
            <h2>Register</h2>
            <input type="text" placeholder="Username" onChange={e => setUsername(e.target.value)} />
            <input type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} />
            <input type="text" placeholder="Name" onChange={e => setName(e.target.value)} />
            <Button text="Register" onClick={async () => {
                const result = await handleRegister(username, password, name);
                if (!result) {
                    alert("Register failed!");
                    return;
                }

                dispatch(login({username: result.user.username, name: result.user.name, token: result.token}));
            }} />
        </>
    );
}

function Authentication() {
    const {token, username, name} = useAppSelector(state => state.authentication);
    const dispatch = useAppDispatch();

    const loggedIn = token && username && name;

    useEffect(() => {
        if (token) {
            checkToken(token).then(result => {
                if (!result) {
                    dispatch(logout());
                }
            });
        }
    }, [dispatch, token]);

    return (
        <div className={style.authentication}>
            {loggedIn ? (
                <LoggedIn username={username} name={name} />
            ) : (
                <LoginOrRegister />
            )}
        </div>
    );
}

export default Authentication;
