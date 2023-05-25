import style from "./Main.module.css";
import Post, {PostData, PostType} from "./Post/Post.tsx";
import NewPost from "./NewPost/NewPost.tsx";

const testData: PostData[] = [
    {
        user: {
            name: "John Doe",
            username: "johndoe",
            avatar: "https://i.pravatar.cc/100",
        },
        type: PostType.Text,
        content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam euismod, nisl eget ultricies ultricies, nunc nisl aliquet nunc, vitae ultricies nisl nunc eget",
    },
    {
        user: {
            name: "Jane Doe",
            username: "janedoe",
            avatar: "https://i.pravatar.cc/120",
        },
        type: PostType.Image,
        content: "https://picsum.photos/512",
    },
];

// TODO: Get user data from API
const canPost = true;

function Main() {
    return (
        <main className={style.main}>
            {canPost && (
                <NewPost />
            )}
            {testData.map((post, i) => (
                <Post key={i} {...post} />
            ))}
        </main>
    );
}

export default Main;