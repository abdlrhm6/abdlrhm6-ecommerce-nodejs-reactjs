
const Footer = () => {
  return (
    <div>
      <div className="flex flex-col gap-10 md:gap-0 md:flex-row justify-between py-6 items-center border-b-[1px] border-black p-10">
        <div className="flex gap-8 flex-1 justify-between w-full">
          <span className="font-bold">Home</span>
          <span className="font-bold">Shop</span>
          <span className="font-bold">Blog</span>
        </div>

        <div className="flex-1 text-center">
            <h1 className="text-4xl font-bold">Zarafa.</h1>
        </div>

        <div className="flex gap-8 flex-1 justify-between w-full">
          <span className="font-bold">News</span>
          <span className="font-bold">Terms</span>
          <span className="font-bold">Contact</span>
        </div>
      </div>
      <div className=" text-center py-4 mx-auto font-sm text-gray-400">All Right Reserved</div>
    </div>
  );
};

export default Footer;
