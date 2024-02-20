import NewsLetter from "../components/NewsLetter";
import {Link} from "react-router-dom"
export default  function Home() {
  return (
    <>
      <div className="grid  grid-cols-1 md:grid-cols-3 min-h-screen mb-[100px] md:mb-[300px]">
        <div className="flex flex-col">
          <img src="/images/hero-2.png" alt="hero-image" className="w-full" />
          <div className="mx-auto text-center p-10">
            <h1 className="text-4xl">Step into</h1>
            <span className="text-8xl font-bold">Style</span>
          </div>
        </div>

        <div className="flex flex-col">
          <img
            src="/images/hero-1.png"
            alt="hero-image"
            className="w-full md:mt-48"
          />
        </div>

        <div className="flex flex-col sm:mt-10 md:mt-64 p-10">
          <span className=" text-3xl md:text-6xl font-bold ">Elegance</span>
          <span className="text-5xl md:text-9xl font-bold ">Sense</span>

          <h1 className="font-bold text-xl my-2">
            Save time and money while picking.
          </h1>
          <p className="text-sm text-gray-600 my-2">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius iusto,
            libero ducimus adipisci labore exercitationem provident sunt, fuga
            esse fugiat qui atque.
          </p>
          <button className="w-full p-4 bg-black text-white text-center my-4">
            <Link to="/store">
              SHOP NOW
            </Link>

          </button>
          <p className="text-sm  my-2 underline font-bold">Latest Discounts</p>
        </div>
      </div>

      <div className="relative mb-[300px] ">
        <img src="/images/rated.png" alt="hi" className="hidden md:block" />
        <div className="w-full bg-gray-200  hidden md:absolute md:bottom-3 -z-50 md:flex md:px-20 py-10">
          <div className="flex w-full items-center flex-col md:flex-row gap-32 justify-between">
            <div className="p-10 md:p-0">
              <h1 className="font-bold md:text-xl">Happy customers choice</h1>
              <p className="text-sm text-gray-600  w-[200px] md:w-[400px] my-2">
                Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                Nostrum dolorum, iusto repudiandae fugiat inventore aut ut
                ratione! Natus corporis non hic aliquid!
              </p>
              <span className="block text-bold text-sm underline">
                total reveiews 566 (4.6)
              </span>
              <span className="block font-bold md:text-6xl my-2">
                Hoodie w/b
              </span>
            </div>

            <div className="">
              <h1 className="block font-bold text-7xl my-2">81 $</h1>
              <button className="w-full p-4 bg-black text-white text-center my-4">
                <Link to="/store" className="z-50">
                  Browse More</Link>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-[200px]">
          <div className="flex justify-center flex-col text-center">
            <h1 className="font-bold text-6xl">Explore</h1>
            <span className="font-bold text-3xl">new</span>
            <span className="font-bold text-3xl">Collections</span>
            <p>Lorem ipsum dolor sit amet consectetur.</p>
          </div>
          <div className="">
            <img src="images/c1.jpg" alt="" />
          </div>
          <div className="">
            <img src="images/c2.png" alt="" />
          </div>
          <div className="">
            <img src="images/c3.jpg" alt="" />
          </div>
          <div className="">
            <img src="images/c4.jpg" alt="" />
          </div>
          <div className="flex flex-col justify-end">
            <p className="text-sm  my-2 underline font-bold">
              <Link to="/store">
                See More
              </Link></p>
          </div>
        </div>
      </div>

      
      <div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-[200px]">
          <div className="">
            <img src="images/b1.png" alt="" />
          </div>
          <div className="">
            <img src="images/b2.png" alt="" />
          </div>
          <div className="flex justify-center flex-col text-center">
            <h1 className="font-bold text-6xl">Satisfied</h1>
            <span className="font-bold text-3xl">Happy</span>
            <span className="font-bold text-3xl">Clients</span>
            <p>Lorem ipsum dolor sit amet consectetur.</p>
          </div>
          <div className="flex flex-col justify-end">
            <p className="text-sm  my-2 underline font-bold">See More</p>
          </div>
          <div className="">
            <img src="images/b3.png" alt="" />
          </div>
          <div className="">
            <img src="images/b4.png" alt="" />
          </div>
        </div>
      </div>




      <NewsLetter />

    </>
  );
}
