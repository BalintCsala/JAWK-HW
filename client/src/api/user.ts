export function changeAvatar(token: string, avatar: string) {
    return fetch(`${import.meta.env.VITE_API_URL}/user/avatar`, {
        method: "PUT",
        body: JSON.stringify({token, avatar}),
        headers: {"Content-Type": "application/json"},
    });
}

export function changeBio(token: string, bio: string) {
    return fetch(`${import.meta.env.VITE_API_URL}/user/bio`, {
        method: "PUT",
        body: JSON.stringify({token, bio}),
        headers: {"Content-Type": "application/json"},
    });
}

export function follow(token: string, username: string) {
    return fetch(`${import.meta.env.VITE_API_URL}/user/follow`, {
        method: "POST",
        body: JSON.stringify({token, username}),
        headers: {"Content-Type": "application/json"},
    });
}