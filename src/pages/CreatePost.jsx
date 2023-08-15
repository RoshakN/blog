export default function CreatePost() {
  return (
    <div className="flex flex-col items-center justify-center mt-3">
      <img
        src="https://learn.wordpress.org/files/2020/11/catface-header-img.jpg"
        alt="placeholder img"
        className="w-4/5 max-w-4xl rounded-xl drop-shadow-lg"
      />
      <div className="my-5 w-4/5 max-w-4xl">
        <input
          type="text"
          placeholder="Title..."
          className="px-2 w-full outline-none text-2xl sm:text-4xl text-slate-500 focus-within:placeholder-blue-200"
        />
        <textarea
          placeholder="Tell your story..."
          rows={7}
          className="outline-none px-4 my-3 w-full text-base sm:text-xl text-slate-400 focus-within:placeholder-blue-200"
        />
      </div>
      <button className="bg-slate-500 py-2 px-4 rounded-md text-white mb-3 active:bg-slate-300 active:text-black ease-out duration-300">
        Publish
      </button>
    </div>
  );
}
