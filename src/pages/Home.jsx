import React, { useEffect, useState } from "react";
import { getDocs, collection } from "firebase/firestore";
import { dataBase } from "../services/firebase-config";
import { Link } from "react-router-dom";

export default function Home({isAuth}) {
  const [posts, setPosts] = useState([]);

  const postsCollection = collection(dataBase, "posts");

  useEffect(() => {
    const getPosts = async () => {
      const data = await getDocs(postsCollection);
      setPosts(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getPosts();
  }, []);
  return (
    <div>
      <p className="my-4 text-xl text-center font-tsukimi">This is a public blog, so YOU can make a post too! Just head on over to <Link to={!isAuth ? "./login" : "./createpost"}><span className="cursor-pointer text-slate-500">this page</span></Link> and start telling your story :)</p>
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
                <div className="text-sm font-light">by: {post.author.name}</div>
              </div>
              <button className="text-xs font-extralight hover:font-normal">
                Edit Post
              </button>
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
