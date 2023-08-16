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
          <div key={post.id} className="post">
            <div className="postHeader">
              <h1 className="postTitle">{post.title}</h1>
              <button>Edit Post</button>
            </div>
          </div>
        );
      })}
    </div>
  );
}
