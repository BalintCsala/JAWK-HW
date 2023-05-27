import Post from "../../../components/Post/Post.tsx";
import NewPost from "../../../components/NewPost/NewPost.tsx";
import {useEffect, useState} from "react";
import {PostData} from "../../../api/types.ts";
import {getPosts, PaginatedPosts} from "../../../api/posts.ts";
import Button, {ButtonSize} from "../../../components/Button/Button.tsx";
import {useAppSelector} from "../../../redux/reduxHooks.ts";

// TODO: Get user data from API
const canPost = true;

function ExplorePage() {
    const token = useAppSelector(state => state.authentication.token);
    const [page, setPage] = useState(0);
    const [loading, setLoading] = useState(true);

    const [pagination, setPagination] = useState<PaginatedPosts | null>(null);

    useEffect(() => {
        setLoading(true);
        getPosts(page, token ?? "").then(pagination => {
            setPagination(pagination);
            setLoading(false);
        }).catch(err => console.log(err));
    }, [page]);

    return (
        <>
            {canPost && (
                <NewPost />
            )}
            {pagination && !loading ? (
                <>
                    {pagination.posts.map((post: PostData, i) => (
                        <Post key={i} post={post} />
                    ))}
                </>
            ) : (
                <span>Loading...</span>
            )}
            <div>
                {!pagination?.first && (
                    <Button text="Prev" onClick={() => setPage(page - 1)} size={ButtonSize.Small} />
                )}
                {!(pagination?.first && pagination?.last) && (
                    <span>{page + 1}</span>
                )}
                {!pagination?.last && (
                    <Button text="Next" onClick={() => setPage(page + 1)} size={ButtonSize.Small} />
                )}
            </div>
        </>
    );
}

export default ExplorePage;