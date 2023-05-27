import style from "./Post.module.css";
import {PostData, PostType} from "../../api/types.ts";

interface Props {
    post: PostData;
}

function Post({post}: Props) {
    // TODO:
    //<img src={post.author.avatar} alt="PFP" className={style.avatar} />
    const randomPFP = "https://robohash.org/${props.author.username}?set=set4&size=200x200";
    return (
        <article className={style.post}>
            <a href={`/user/${post.author.username}`} className={style.profileLink}>
            </a>
            <div className={style.nameRow}>
                <a href={`/user/${post.author.username}`} className={style.profileLink}>
                    <img src={randomPFP} alt="PFP" className={style.avatar} />
                    <span className={style.name}>{post.author.name}</span>
                    <span className={style.username}>${post.author.username}</span>
                </a>
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