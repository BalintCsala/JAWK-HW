import style from "./NewPost.module.css";
import {PostType} from "../Post/Post.tsx";
import {useState} from "react";
import Button from "../../../components/Button/Button.tsx";

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
    const [type, setType] = useState(PostType.Text);

    const [file, setFile] = useState<File | null>(null);

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
                        <textarea className={style.textarea}></textarea>
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
                <Button text={"Post"} onClick={() => {
                    console.log("Clicked");
                }} />
            </div>
        </div>
    );
}

export default NewPost;