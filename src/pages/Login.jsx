import { auth, provider } from "../services/firebase-config";
import { inMemoryPersistence, setPersistence, signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";

export default function Login({ setIsAuth }) {
  const navigate = useNavigate();

  const signInWithGoogle = () => {
    setPersistence(auth, inMemoryPersistence).then(() => {
      signInWithPopup(auth, provider).then((result) => {
        // localStorage.setItem("isAuth", true);
        setIsAuth(true);
        navigate("/createpost");
      })

    })
  };

  return (
    <div className="flex flex-col items-center my-32 font-semibold font-dosis">
      <p className="mb-10 text-center w-52">
        To make a Post in this blog, you must first log in using your Google
        Account.
      </p>
      <button
        onClick={signInWithGoogle}
        className="flex gap-2 px-4 py-2 transition duration-150 border rounded-lg border-slate-200 text-slate-700 hover:border-slate-400 hover:text-slate-900 hover:shadow"
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
