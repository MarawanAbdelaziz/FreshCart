import { Footer, Navbar } from "flowbite-react";

import Logo from "../../assets/images/freshcart-logo.svg";
import {
  BsCart3,
  BsFacebook,
  BsInstagram,
  BsLinkedin,
  BsTiktok,
  BsTwitter,
  BsYoutube,
} from "react-icons/bs";

import { Link, useLocation, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../../Context/UserContext";
import { ProductContext } from "../../Context/productContext";

const NavbarPage = () => {
  let { token, setToken } = useContext(UserContext);
  let { setSuccess, cartItems } = useContext(ProductContext);
  let navigate = useNavigate();

  function logout() {
    localStorage.removeItem("token");
    setToken(null);
    navigate("login");
  }

  let location = useLocation();
  if (location.pathname != "/productdetails/:id") {
    setSuccess(false);
  }

  return (
    <>
      <Navbar className="bg-[#d3d3d3]">
        <div className="w-screen flex items-center justify-between mx-auto p-4">
          <div className="flex justify-between items-center">
            <Link
              to={"/"}
              className="flex items-center space-x-3 rtl:space-x-reverse pe-8"
            >
              <img src={Logo} alt="FreshCart Logo" />
            </Link>
            <Navbar.Collapse className=" ">
              <ul className="mt-4 flex flex-col md:mt-0 md:flex-row md:space-x-4 md:text-sm md:font-medium">
                <Link
                  className={`${
                    location.pathname == "/"
                      ? "font-bold text-[15px] text-gray-500 border-b-2 border-gray-500 "
                      : "text-gray-500"
                  } `}
                  to={"/"}
                >
                  Home
                </Link>
                <Link
                  className={`${
                    location.pathname == "/products"
                      ? "font-bold text-[15px] text-gray-500 border-b-2 border-gray-500"
                      : "text-gray-500"
                  } `}
                  to={"/products"}
                >
                  Products
                </Link>
                <Link
                  className={`${
                    location.pathname == "/categories"
                      ? "font-bold text-[15px] text-gray-500 border-b-2 border-gray-500"
                      : "text-gray-500"
                  } `}
                  to={"/categories"}
                >
                  Categories
                </Link>
                <Link
                  className={`${
                    location.pathname == "/brands"
                      ? "font-bold text-[15px] text-gray-500 border-b-2 border-gray-500"
                      : "text-gray-500"
                  } `}
                  to={"/brands"}
                >
                  Brands
                </Link>
                <Link
                  className={`${
                    location.pathname == "/cart"
                      ? "font-bold text-[15px] text-gray-500 border-b-2 border-gray-500"
                      : "text-gray-500"
                  } `}
                  to={"/cart"}
                >
                  Cart
                </Link>
                <Link
                  className={`${
                    location.pathname == "/wishlist"
                      ? "font-bold text-[15px] text-gray-500 border-b-2 border-gray-500"
                      : "text-gray-500"
                  } `}
                  to={"/wishlist"}
                >
                  Wishlist
                </Link>
              </ul>
            </Navbar.Collapse>
          </div>

          <div className=" flex space-x-6  justify-center items-center">
            <div className="hidden lg:flex space-x-6 items-center">
              <Footer.Icon className="text-black" href="#" icon={BsFacebook} />
              <Footer.Icon className="text-black" href="#" icon={BsTwitter} />
              <Footer.Icon className="text-black" href="#" icon={BsInstagram} />
              <Footer.Icon className="text-black" href="#" icon={BsTiktok} />
              <Footer.Icon className="text-black" href="#" icon={BsLinkedin} />
              <Footer.Icon className="text-black" href="#" icon={BsYoutube} />
            </div>
            <Link to={"/cart"} className="text-black relative hidden md:block">
              <Footer.Icon icon={BsCart3} />
              <div className="absolute -top-3 -right-3 p-3 rounded-full bg-greenColor">
                <p className="absolute inset-0 mt-[2px] text-center text-white text-[12px]">
                  {cartItems}
                </p>
              </div>
            </Link>

            {token ? (
              <div>
                <button
                  onClick={logout}
                  className="text-gray-400 text-xl font-medium"
                >
                  Logout
                </button>
              </div>
            ) : (
              <button
                onClick={() => navigate("/login")}
                className="text-gray-400 text-xl font-medium"
              >
                Login
              </button>
            )}
            <Navbar.Toggle />
          </div>
        </div>
      </Navbar>
    </>
  );
};

export default NavbarPage;
