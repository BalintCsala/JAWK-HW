export enum PostType {
    Text = "text",
    Image = "image",
}

export interface UserData {
    name: string;
    username: string;
    admin: boolean;
    followers: UserData[];
    followedUsers: UserData[];
}

export interface PostData {
    id: number;
    type: PostType;
    content: string;
    author: UserData;
}