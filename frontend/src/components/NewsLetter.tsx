

const NewsLetter = () => {
  return (
    <div>
      <div className="flex flex-col md:flex-row w-full  bg-black mb-[200px]">
        <div className="flex flex-col py-14 px-24 flex-1 text-center text-white">
          <h1 className="font-bold  text-4xl">Join Us</h1>

          <p className="text-xl">On Our New Letter</p>
          <div className="flex gap-8 mt-8 flex-col md:flex-row ">
            <input
              type="text"
              placeholder="email@example.com"
              className="placeholder:text-white
    border-b-2 border-white px-6 py-2 bg-transparent focus:outline-none"
            />
            <button className="rounded-sm bg-white text-black px-6 py-4 flex-1">
              Subscribe
            </button>
          </div>
        </div>

        <div className="flex flex-col p-14 bg-white flex-1 border-2 border-black text-center">
          <h1 className="font-bold  text-4xl">Discover</h1>

          <p className="text-xl">On Our New Letter</p>
          <div className="flex gap-8 mt-8">
            <button className="rounded-sm text-white bg-black px-16 py-4 mx-auto">
              Visit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsLetter;
