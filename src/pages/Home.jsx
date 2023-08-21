import React, { useEffect, useState } from "react";
import { getDocs, collection } from "firebase/firestore";
import { dataBase } from "../services/firebase-config";

export default function Home() {
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
      {posts.map((post) => {
        return (
          <div
            key={post.id}
            className="mx-auto max-w-xs sm:max-w-sm md:max-w-screen-md lg:max-w-screen-lg h-96 my-4 bg-gradient-to-br from from-slate-500 to to-slate-400 shadow-md shadow-gray-400 text-neutral-50 flex flex-col rounded-md"
          >
            <div className="bg-white bg-opacity-30 py-2 px-3 flex items-start justify-between rounded-t-sm">
              <div className="flex flex-col">
                <h1 className="font-tsukimi font-bold text-2xl">
                  {post.title}
                </h1>
                <div className="font-light text-sm">by: {post.author.name}</div>
              </div>
              <button className="font-extralight text-xs hover:font-normal">
                Edit Post
              </button>
            </div>
            <p
              name="Post Text"
              id={post.id}
              className="p-5 resize-none bg-transparent overflow-y-auto border-none outline-none text-justify indent-4 first-letter:text-4xl first-letter:font-bold first-letter:mr-1"
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
