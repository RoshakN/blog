import { Link, useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../services/firebase-config";

export default function Navbar({ isAuth, setIsAuth }) {
  let navigate = useNavigate();

  const signUserOut = () => {
    signOut(auth).then(() => {
      localStorage.clear();
      setIsAuth(false);
      navigate("/login");
    });
  };
  return (
    <div className="sticky top-0 text-base font-light font-dosis bg-slate-400 text-white flex justify-between items-center px-5 py-2 sm:text-xl">
      <Link
        to="/"
        className="text-2xl mr-3 sm:text-4xl sm:mr-7 font-tsukimi font-bold"
      >
        The Blob
      </Link>
      <div>
        <Link to="/" className="mx-2">
          HOME
        </Link>
        <Link to="/createpost" className="mx-2">
          CREATE POST
        </Link>
        {!isAuth ? (
          <Link to="/login" className="mx-2">
            LOGIN
          </Link>
        ) : (
          <p
            onClick={() => {
              signUserOut();
            }}
            className="cursor-pointer inline-block mx-2"
          >
            LOGOUT
          </p>
        )}
      </div>
      <p className="ml-auto">icon</p>
    </div>
  );
}
