import style from "./NewPost.module.css";
import {useState} from "react";
import Button from "../Button/Button.tsx";
import {PostType} from "../../api/types.ts";
import {useAppSelector} from "../../redux/reduxHooks.ts";
import {createPost} from "../../api/posts.ts";
import Tooltip from "../Tooltip/Tooltip.tsx";

function showImageSelector(): Promise<File> {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.click();
    return new Promise((resolve, reject) => {
        input.onchange = () => {
            if (input.files && input.files[0]) {
                resolve(input.files[0]);
            } else {
                reject();
            }
        };
    });
}

function NewPost() {
    const token = useAppSelector(state => state.authentication.token);

    const [type, setType] = useState(PostType.Text);
    const [text, setText] = useState("");
    const [file, setFile] = useState<File | null>(null);
    const [privatePost, setPrivatePost] = useState(false);

    if (!token) {
        return (
            <div></div>
        );
    }

    return (
        <div className={style.newPost}>
            <div className={style.selector}>
                <button
                    className={style.selectorButton + (type === PostType.Text ? " " + style.selected : "")}
                    onClick={() => setType(PostType.Text)}>Text
                </button>
                <button
                    className={style.selectorButton + (type === PostType.Image ? " " + style.selected : "")}
                    onClick={() => setType(PostType.Image)}>Image
                </button>
            </div>
            <div className={style.content}>
                {type === PostType.Text ? (
                    <>
                        <span className={style.title}>Write something new</span>
                        <textarea className={style.textarea} onChange={e => setText(e.target.value)}></textarea>
                    </>
                ) : (
                    <>
                        <span className={style.title}>Post an image</span>
                        <div className={style.imageSelect} onClick={() => {
                            showImageSelector().then((file: File) => setFile(file));
                        }}>
                            <span className={style.plusIcon}>+</span>
                            {file ? (
                                <span>{file.name}</span>
                            ) : (
                                <span>Nothing selected</span>
                            )}
                        </div>
                    </>
                )}
                <div>
                    <br/>
                    <div>
                        <label htmlFor="private">Set to private: </label>
                        <input id="private" type="checkbox" onChange={e => setPrivatePost(e.target.checked)} />
                        <span> </span>
                        <Tooltip text="Private posts are only visible to people you follow" />
                    </div>
                    <Button text={"Post"} onClick={async () => {
                        if (!token) {
                            alert("You must be logged in to post!");
                            return;
                        }

                        if (type === PostType.Text) {
                            createPost(token, type, text, privatePost).then(() => {
                                window.location.reload();
                            });
                        } else {
                            if (!file) {
                                alert("You must select a file to post!");
                                return;
                            }

                            const reader = new FileReader();
                            reader.onload = () => {
                                if (!reader.result) return;
                                const base64 = `data:${file.type};base64,` + reader.result.toString().split(",")[1];
                                createPost(token, type, base64, privatePost).then(() => {
                                    window.location.reload();
                                });
                            };
                            reader.readAsDataURL(file);
                        }
                    }} />
                </div>
            </div>
        </div>
    );
}

export default NewPost;