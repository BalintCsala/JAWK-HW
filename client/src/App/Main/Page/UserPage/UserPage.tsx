import Post from "../../../../components/Post/Post.tsx";
import {useEffect, useState} from "react";
import {PostData, UserData} from "../../../../api/types.ts";
import {getUserPosts} from "../../../../api/posts.ts";
import {useAppSelector} from "../../../../redux/reduxHooks.ts";
import {useParams} from "react-router-dom";
import {PageProps} from "../Page.tsx";
import NewPost from "../../../../components/NewPost/NewPost.tsx";
import UserInfo from "./UserInfo/UserInfo.tsx";

function UserPage({page, pagination, setPagination}: PageProps) {
    const {token, username: currUsername} = useAppSelector(state => state.authentication);
    const {username} = useParams<{username: string}>();
    const [user, setUser] = useState<UserData | null>(null);

    useEffect(() => {
        getUserPosts(page, username ?? "", token ?? "").then(pagination => {
            setPagination(pagination);
            setUser(pagination.user);
        }).catch(err => console.log(err));
    }, [page]);

    if (!username) {
        return (
            <span>Invalid username</span>
        );
    }

    return (
        <>
            {pagination && user ? (
                <>
                    <UserInfo user={user} />
                    {username === currUsername && (
                        <NewPost />
                    )}
                    {pagination.posts.map((post: PostData, i) => (
                        <Post key={i} post={post} />
                    ))}
                </>
            ) : (
                <span>Loading...</span>
            )}
        </>
    );
}

export default UserPage;
