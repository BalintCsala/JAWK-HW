import {PostData, PostType} from "./types.ts";

export interface PaginatedPosts {
    first: boolean;
    last: boolean;
    posts: PostData[];
}

export function getPosts(page: number, token?: string) {
    return fetch(`${import.meta.env.VITE_API_URL}/posts/${page}?token=${token ?? ""}`)
        .then(response => response.json())
        .then(data => {
            return {
                first: data.first,
                last: data.last,
                posts: data.content,
            } as PaginatedPosts;
        });
}

export function createPost(token: string, type: PostType, content: string, restricted: boolean) {
    return fetch(`${import.meta.env.VITE_API_URL}/post/new`, {
        method: "POST",
        body: JSON.stringify({token, type, content, restricted}),
        headers: {"Content-Type": "application/json"},
    }).then(response => response.json() as Promise<PostData>);
}