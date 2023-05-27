import style from "./UserInfo.module.css";
import {UserData} from "../../../../../api/types.ts";
import {useAppSelector} from "../../../../../redux/reduxHooks.ts";
import {showImageSelector} from "../../../../../utils.ts";
import {changeAvatar, changeBio, follow} from "../../../../../api/user.ts";
import Button, {ButtonSize} from "../../../../../components/Button/Button.tsx";
import {useMemo, useState} from "react";

interface Props {
    user: UserData;
}

function UserInfo({user}: Props) {
    const {token, username} = useAppSelector(state => state.authentication);
    const isCurr = username === user.username;
    const [avatar, setAvatar] = useState(user.avatar);
    const [bio, setBio] = useState(user.bio);
    const [saved, setSaved] = useState(false);
    const [followers, setFollowers] = useState(user.followers);
    const followerCount = followers.length;

    const following = useMemo(() => followers.findIndex(follower => follower.username === username) !== -1, [followers]);

    return (
        <div className={style.userInfo}>
            <div className={style.avatar + " " + (isCurr ? style.changeable : "")} onClick={async () => {
                if (!isCurr) return;
                if (!token) {
                    alert("You must be logged in to change your avatar.");
                    return;
                }

                const file = await showImageSelector();
                const reader = new FileReader();
                reader.onload = e => {
                    const canvas = document.createElement("canvas");
                    canvas.width = 120;
                    canvas.height = 120;
                    const ctx = canvas.getContext("2d");
                    if (!ctx) return;
                    const img = new Image();
                    img.onload = async () => {
                        ctx.drawImage(img, 0, 0, 120, 120);
                        const data = canvas.toDataURL("image/png");
                        const result = await changeAvatar(token, data);
                        if (result) {
                            setAvatar(data);
                        } else {
                            alert("An error occurred while uploading your avatar.");
                        }
                    };
                    img.src = e.target?.result as string;
                };
                reader.readAsDataURL(file);
            }}>
                <img src={avatar} alt="PFP" className={style.avatarImg} />
                <span className={style.changeAvatar}>Change</span>
            </div>
            <div className={style.content}>
                <div className={style.nameRow}>
                    <h1 className={style.name}>{user.name}</h1>
                    <h2 className={style.username}>${user.username}</h2>
                </div>
                <div className={style.followers}>
                    <span>{followerCount} follower{followerCount !== 1 ? "s" : ""}</span>
                    <span> </span>
                    {!isCurr && !following && (
                        <button onClick={async () => {
                            if (!token) {
                                alert("You must be logged in to follow someone.");
                                return;
                            }

                            const result = await follow(token, user.username);
                            if (result) {
                                setFollowers([...followers, {username} as UserData]);
                            } else {
                                alert("An error occurred while following this user.");
                            }
                        }}>+</button>
                    )}
                </div>
                {isCurr && token ? (
                    <div className={style.bioArea}>
                        <textarea className={style.bioTextarea + " " + (saved ? style.saved : "")}
                                  placeholder="Write a bio..." value={bio}
                                  onChange={e => {
                                      setSaved(false);
                                      setBio(e.target.value);
                                  }} />
                        <Button text="Save" size={ButtonSize.Small} onClick={async () => {
                            const result = changeBio(token, bio);
                            if (!result) {
                                setBio(user.bio);
                                alert("An error occurred while saving your bio.");
                            } else {
                                setSaved(true);
                            }
                        }} />
                    </div>
                ) : (
                    <p className={style.bio}>{bio}</p>
                )}
            </div>
        </div>
    );
}

export default UserInfo;