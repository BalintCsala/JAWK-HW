import Post from "../../../../components/Post/Post.tsx";
import NewPost from "../../../../components/NewPost/NewPost.tsx";
import {useEffect} from "react";
import {PostData} from "../../../../api/types.ts";
import {getPosts} from "../../../../api/posts.ts";
import {useAppSelector} from "../../../../redux/reduxHooks.ts";
import {PageProps} from "../Page.tsx";

function ExplorePage({page, pagination, setPagination} : PageProps) {
    const token = useAppSelector(state => state.authentication.token);

    useEffect(() => {
        getPosts(page, token ?? "").then(pagination => {
            setPagination(pagination);
        }).catch(err => console.log(err));
    }, [page]);

    return (
        <>
            <NewPost />
            {pagination ? (
                <>
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

export default ExplorePage;