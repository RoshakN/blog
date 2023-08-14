import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <div className="text-base font-light font-dosis bg-slate-400 text-white sticky flex justify-between items-center px-5 py-2 sm:text-xl">
      <h1 className="text-4xl font-tsukimi font-bold mr-7">The Blob</h1>
      <div>
        <Link to="/" className="mx-2">
          HOME
        </Link>
        <Link to="/createpost" className="mx-2">
          CREATE POST
        </Link>
        {<Link to="/login" className="mx-2">
          LOGIN
        </Link>}
      </div>
      <p className="ml-auto">icon</p>
    </div>
  );
}
