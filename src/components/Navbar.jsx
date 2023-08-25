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
    <div className="sticky top-0 z-50 flex items-center justify-between px-5 py-2 text-base font-light text-white font-dosis bg-slate-600 sm:text-xl">
      <Link
        to="/"
        className="mr-3 text-2xl font-bold sm:text-4xl sm:mr-7 font-tsukimi"
      >
        The Blob
      </Link>
      <div>
        <Link to="/" className="mx-2">
          HOME
        </Link>

        {!isAuth ? (
          <Link to="/login" className="mx-2">
            LOGIN
          </Link>
        ) : (
          <>
            <Link to="/createpost" className="mx-2">
              WRITE
            </Link>
            <p
              onClick={() => {
                signUserOut();
              }}
              className="inline-block mx-2 cursor-pointer"
            >
              LOGOUT
            </p>
          </>
        )}
      </div>
      <img
        src={
          (isAuth && auth.currentUser.photoURL) ||
          "https://cdn.icon-icons.com/icons2/2468/PNG/512/user_kids_avatar_user_profile_icon_149314.png"
        }
        alt="User Profile Picture"
        className="w-10 ml-auto text-white border border-white rounded-full hover:cursor-pointer"
        onClick={() => {
          !isAuth && navigate("/login");
        }}
      />
    </div>
  );
}
