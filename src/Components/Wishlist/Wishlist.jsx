import { useQuery } from "@tanstack/react-query";
import axiosConfig from "../AxiosConfig/axiosConfig";
import { IoBagRemove } from "react-icons/io5";
import { ThreeDots } from "react-loader-spinner";
import { useContext } from "react";
import { WishlistContext } from "../../Context/WishlistContext";
import { ProductContext } from "../../Context/productContext";
import Swal from "sweetalert2";
import Loading from "../Loading/Loading";
import { useNavigate } from "react-router-dom";

const Wishlist = () => {
  let navigate = useNavigate();

  let { data, refetch, isFetching } = useQuery({
    queryKey: ["getWishlist"],
    queryFn: () => axiosConfig.get(`/api/v1/wishlist`),
    retry: 0,
  });

  let {
    deleteWishlist,
    successDeleteWishlist,
    LoadingDeleteWishlist,
    setSuccessDeleteWishlist,
  } = useContext(WishlistContext);

  let wishlists = data?.data.data;

  let { addProduct, isLoadingAddProduct, successAddProduct, getCart } =
    useContext(ProductContext);

  if (successDeleteWishlist) {
    setSuccessDeleteWishlist(false);
    refetch();
  }

  if (successAddProduct) {
    Swal.fire({
      position: "center",
      icon: "success",
      title: "Your work has been saved",
      showConfirmButton: false,
      timer: 1500,
    });
  }

  return (
    <>
      {isFetching ? (
        <Loading />
      ) : (
        <div className={`${wishlists.length == 0 ? "h-screen" : ""} mb-20`}>
          <div
            className={`${
              wishlists?.length == 0 ? "border-b border-black" : ""
            } bg-[#d3d3d3] mx-auto w-[70%] rounded-md mt-16 p-10`}
          >
            <h2 className="text-xl font-bold">My wish List </h2>

            {wishlists?.map((wishlist) => (
              <div key={wishlist._id} className="mt-16 flex items-center">
                <img
                  className="w-[15%] rounded-md"
                  src={wishlist.imageCover}
                  alt={wishlist.title}
                />
                <div className="ms-10 me-auto">
                  <h4 className="text-[20px] font-medium">{wishlist.title}</h4>
                  <h4 className="text-[16px] font-medium">
                    {wishlist.price} EGP
                  </h4>

                  {LoadingDeleteWishlist ? (
                    <div className="mt-1 ms-3">
                      <ThreeDots
                        visible={true}
                        height="28"
                        width="35"
                        color="#4fa94d"
                        radius="9"
                        ariaLabel="three-dots-loading"
                        wrapperStyle={{}}
                        wrapperClass=""
                      />
                    </div>
                  ) : (
                    <button
                      onClick={() => {
                        deleteWishlist(wishlist._id);
                      }}
                      className="flex items-center mt-2 text-redColor"
                    >
                      <IoBagRemove className="me-1" />
                      Remove
                    </button>
                  )}
                </div>

                {isLoadingAddProduct ? (
                  <button
                    disabled="false"
                    className="font-normal bg-gradient-to-r from-[#F2F2F2] via-[#dbdada] to-[#EAEAEA] shadow-lg shadow-[#7b7a76] pt-1 pb-1 ps-12 pe-12 rounded-lg me-10 "
                  >
                    <ThreeDots
                      visible={true}
                      height="24"
                      width="29"
                      color="#4fa94d"
                      radius="9"
                      ariaLabel="three-dots-loading"
                      wrapperStyle={{}}
                      wrapperClass=""
                    />
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      if (localStorage.getItem("token")) {
                        addProduct(wishlist._id);
                        setInterval(() => {
                          getCart();
                        }, 500);
                      } else {
                        navigate("/login");
                      }
                    }}
                    className="font-normal bg-gradient-to-r from-[#F2F2F2] via-[#dbdada] to-[#EAEAEA] shadow-lg shadow-[#7b7a76] pt-1 pb-1 ps-12 pe-12 rounded-lg me-10 "
                  >
                    Add
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default Wishlist;
