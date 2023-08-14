import { auth, provider } from "../services/firebase-config";
import { signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";
// import { AuthContext } from "../App";
// import { useContext } from "react";

export default function Login({ setIsAuth }) {
  // const { isAuth, setIsAuth } = useContext(AuthContext);

  const navigate = useNavigate();

  const signInWithGoogle = () => {
    signInWithPopup(auth, provider).then((result) => {
      localStorage.setItem("isAuth", true);
      setIsAuth(true);
      navigate("/");
    });
  };

  return (
    <div className="flex flex-col my-32 items-center font-dosis font-semibold">
      <p className="w-52 text-center mb-10">
        To make a Post in this blog, you must first log in using your Google
        Account.
      </p>
      <button
        onClick={signInWithGoogle}
        className="px-4 py-2 border flex gap-2 border-slate-200 rounded-lg text-slate-700 hover:border-slate-400 hover:text-slate-900 hover:shadow transition duration-150"
      >
        <img
          className="w-6 h-6"
          src="https://www.svgrepo.com/show/475656/google-color.svg"
          loading="lazy"
          alt="google logo"
        />
        <span>Login with Google</span>
      </button>
    </div>
  );
}
