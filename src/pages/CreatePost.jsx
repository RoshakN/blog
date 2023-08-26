import { useEffect, useState } from "react";
import { addDoc, collection } from "firebase/firestore";
import { dataBase, auth } from "../services/firebase-config";
import { useNavigate } from "react-router-dom";

export default function CreatePost({ isAuth }) {
  const [title, setTitle] = useState("");
  const [postText, setPostText] = useState("");

  let navigate = useNavigate();
  const postsCollection = collection(dataBase, "posts");

  const createPost = async () => {
    await addDoc(postsCollection, {
      title,
      postText,
      author: { name: auth.currentUser.displayName, id: auth.currentUser.uid },
    });
    navigate("/");
  };

  useEffect(() => {
    if (!isAuth) {
      navigate("/login");
    }
  }, []);

  let postContent = title && postText;

  return (
    <div className="flex flex-col items-center justify-center mt-3">
      <img
        src="https://learn.wordpress.org/files/2020/11/catface-header-img.jpg"
        alt="placeholder img"
        className="w-4/5 max-w-4xl rounded-xl drop-shadow-lg"
      />
      <div className="w-4/5 max-w-4xl my-5">
        <input
          type="text"
          placeholder="Title..."
          onChange={(event) => {
            setTitle(event.target.value);
          }}
          className="w-full px-2 text-2xl outline-none sm:text-4xl text-slate-500 focus-within:placeholder-blue-200"
        />
        <textarea
          placeholder="Tell your story..."
          rows={7}
          onChange={(event) => {
            setPostText(event.target.value);
          }}
          className="w-full px-4 my-3 text-base outline-none sm:text-xl text-slate-400 focus-within:placeholder-blue-200"
        />
      </div>
      <button
        onClick={postContent && createPost}
        className={
          postContent
            ? "bg-slate-500 py-2 px-4 rounded-md text-white mb-3 active:bg-slate-300 active:text-black ease-out duration-300"
            : "bg-slate-500 py-2 px-4 rounded-md text-white mb-3 active:bg-slate-300 active:text-black ease-out duration-300 cursor-not-allowed"
        }
      >
        Publish
      </button>
    </div>
  );
}
