import style from "./Post.module.css";

export interface User {
    name: string,
    username: string,
    avatar: string,
}

export enum PostType {
    Text = "text",
    Image = "image",
}

export interface PostData {
    user: User,
    type: PostType,
    content: string,
}

function Post(props: PostData) {
    return (
        <article className={style.post}>
            <a href={`/user/${props.user.username}`} className={style.profileLink}>
                <img src={props.user.avatar} alt="PFP" className={style.avatar} />
            </a>
            <div className={style.nameRow}>
                <a href={`/user/${props.user.username}`} className={style.profileLink}>
                    <span className={style.name}>{props.user.name}</span>
                    <span className={style.username}>${props.user.username}</span>
                </a>
            </div>
            {props.type === PostType.Text ? (
                <p className={style.postText}>{props.content}</p>
            ) : (
                <img src={props.content} alt="" className={style.postImage} />
            )}
        </article>
    );
}

export default Post;