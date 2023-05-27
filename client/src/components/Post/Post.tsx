import style from "./Post.module.css";
import {PostData, PostType} from "../../api/types.ts";
import LockSVG from "./lock-solid.svg";
import {Link} from "react-router-dom";

interface Props {
    post: PostData;
}

function Post({post}: Props) {
    return (
        <article className={style.post}>
            <a href={`/user/${post.author.username}`} className={style.profileLink}>
            </a>
            <div className={style.nameRow}>
                <Link to={`/user/${post.author.username}`} className={style.profileLink}>
                    <img src={post.author.avatar} alt="PFP" className={style.avatar} />
                    <span className={style.name}>{post.author.name}</span>
                    <span className={style.username}>${post.author.username}</span>
                </Link>
                {post.restricted && (
                    <img src={LockSVG} alt="restricted" className={style.restrictedIcon} />
                )}
            </div>
            {post.type === PostType.Text ? (
                <p className={style.postText}>{post.content}</p>
            ) : (
                <img src={post.content} alt="" className={style.postImage} />
            )}
        </article>
    );
}

export default Post;