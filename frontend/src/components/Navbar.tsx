import { Link } from "react-router-dom"
import { useStore } from "../store";

const Navbar = () => {
  const user = useStore((state) => state.user)
  const logout = useStore((state) => state.logout)

  return (
    <div className="border-b-[1px] border-b-gray-600">
      <div className="w-full mx-auto px-4 md:px-20 lg:px-30">
        <div className="flex items-center justify-between py-4">
          <div className="font-bold text-2xl">
            <Link to="/">
              Zarafa.
            </Link>
          </div>
          
          <div className=" hidden lg:flex gap-10  items-center justify-between">
            
            {user ? (
              <>
                <div className="flex gap-2 items-center">
                  <img
                    alt="search icon"
                    src="/images/shopping-bag.png"
                    width={20}
                    height={15}
                  />
                  <span>
                    <Link to="/cart">
                      Cart</Link>
                  </span>
                </div>

                {user.role ==='admin'  ? (
                   <div className="flex gap-2 items-center">
                   <img
                     alt="search icon"
                     src="/images/shopping-bag.png"
                     width={20}
                     height={15}
                   />
                   <span>
                     <Link to="/admin">
                       Dashboard</Link>
                   </span>
                 </div>
                ): null}

                <div className="flex gap-2 items-center">
                  <img
                    alt="search icon"
                    src="/images/shopping-bag.png"
                    width={20}
                    height={15}
                  />
                  <span>
                    <button onClick={logout}>
                      Logout</button>
                  </span>
                </div>
              </>
            ) : (

              <>

                <div className="flex gap-2 items-center">
                  <img
                    alt="search icon"
                    src="/images/shopping-bag.png"
                    width={20}
                    height={15}
                  />
                  <span>
                    <Link to="/register">
                      Register</Link>
                  </span>
                </div>

                <div className="flex gap-2 items-center">
                  <img
                    alt="search icon"
                    src="/images/shopping-bag.png"
                    width={20}
                    height={15}
                  />
                  <span>
                    <Link to="/login">
                      Login</Link>
                  </span>
                </div>
              </>
            )}

            <div className="shop">
              <Link to="/store">
                Shop</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
