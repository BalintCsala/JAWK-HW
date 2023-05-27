import {UserData} from "./types.ts";

export function checkToken(token: string) {
    return fetch(`${import.meta.env.VITE_API_URL}/user/token`, {
        method: "POST",
        body: token,
    })
        .then(response => response.json() as Promise<boolean>);
}

interface LoginResult {
    user: UserData;
    token: string;
}

export function handleLogin(username: string, password: string) {
    return fetch(`${import.meta.env.VITE_API_URL}/user/login`, {
        method: "POST",
        body: JSON.stringify({username, password}),
        headers: {"Content-Type": "application/json"},
    })
        .then(response => response.json() as Promise<LoginResult>);
}

export function handleRegister(username: string, password: string, name: string) {
    return fetch(`${import.meta.env.VITE_API_URL}/user/register`, {
        method: "POST",
        body: JSON.stringify({username, password, name}),
        headers: {"Content-Type": "application/json"},
    })
        .then(response => response.json() as Promise<LoginResult>);
}

export function handleLogout(token: string) {
    return fetch(`${import.meta.env.VITE_API_URL}/user/logout`, {
        method: "POST",
        body: token,
    })
        .then(response => response.json() as Promise<boolean>);
}