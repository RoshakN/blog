import { useEffect, useState } from "react";
import { getDocs, collection, deleteDoc, doc } from "firebase/firestore";
import { auth, dataBase } from "../services/firebase-config";
import { Link } from "react-router-dom";
import { CrossCircle } from "react-flaticons";

export default function Home({ isAuth }) {
  const [posts, setPosts] = useState([]);

  const [showHeader, setShowHeader] = useState(true);

  const postsCollection = collection(dataBase, "posts");

  useEffect(() => {
    const getPosts = async () => {
      const data = await getDocs(postsCollection);
      setPosts(
        data.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
          creationTime: new Date(
            doc._document.createTime.timestamp.seconds * 1000
          ).toLocaleString(),
        }))
      );
      console.log(data);
    };
    getPosts();
  }, []);

  const deletePost = async (id) => {
    const postDoc = doc(dataBase, "posts", id);
    await deleteDoc(postDoc);
  };

  return (
    <div>
      {showHeader && (
        <div className="relative">
          <p className="py-4 text-xl text-center shadow-md font-tsukimi bg-gradient-to-br from from-slate-500 to to-slate-400 shadow-gray-400 text-neutral-50 md:text-2xl">
            This is a public blog, so YOU can make a post too! Just head on over
            to
            <Link to={!isAuth ? "./login" : "./createpost"}>
              <span className="cursor-pointer text-cyan-200"> this page </span>
            </Link>
            and start telling your story :)
          </p>
          <CrossCircle
            size={14}
            onClick={() => {
              setShowHeader(!showHeader);
            }}
            className="absolute text-white hover:scale-125 hover:cursor-pointer right-2 top-2"
          />
        </div>
      )}

      {posts.map((post) => {
        return (
          <div
            key={post.id}
            className="flex flex-col max-w-xs mx-auto my-4 rounded-md shadow-md sm:max-w-sm md:max-w-screen-md lg:max-w-screen-lg h-96 bg-gradient-to-br from from-slate-500 to to-slate-400 shadow-gray-400 text-neutral-50"
          >
            <div className="flex items-start justify-between px-3 py-2 bg-black rounded-t-sm bg-opacity-30">
              <div className="flex flex-col mx-4">
                <h1 className="my-2 text-2xl font-bold font-tsukimi">
                  {post.title}
                </h1>
                <div className="text-sm font-light">
                  by: {post.author.name} at: {post.creationTime}
                </div>
              </div>
              {isAuth && post.author.id === auth.currentUser.uid && (
                <div className="ml-auto">
                  {/* Functionality will be added later
                  <button className="mr-2 text-xs font-extralight hover:font-normal">
                    Edit Post
                  </button> */}
                  <button
                    onClick={() => {
                      deletePost(post.id);
                    }}
                    className="text-xs font-extralight hover:font-normal"
                  >
                    Delete Post
                  </button>
                </div>
              )}
            </div>
            <p
              name="Post Text"
              id={post.id}
              className="p-5 overflow-y-auto text-lg text-justify bg-transparent border-none outline-none resize-none indent-4 first-letter:text-4xl first-letter:font-bold first-letter:mr-1"
              disabled
            >
              {post.postText}
            </p>
          </div>
        );
      })}
    </div>
  );
}
