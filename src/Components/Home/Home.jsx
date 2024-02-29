import { useQuery } from "@tanstack/react-query";
import Products from "../Products/Products";
import axiosConfig from "../AxiosConfig/axiosConfig";
import Slider from "react-slick";
import Loading from "../Loading/Loading";

const Home = () => {
  let { data, isLoading } = useQuery({
    queryKey: ["categories"],
    queryFn: () => axiosConfig.get("/api/v1/categories"),
  });

  let categories = data?.data.data;

  let settings = {
    dots: false,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 3000,
    speed: 1000,
    swipe: false,
    slidesToShow: 6,
    slidesToScroll: 1,
    arrows: false,
    className: "mt-16 rounded-lg",
  };

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <div>
          <div>
            <Slider {...settings}>
              {categories.map((categorie) => (
                <div key={categorie._id} className="h-[300px]  ">
                  <img
                    className="w-[90%] h-[300px] rounded-lg shadow-md shadow-[#434343] "
                    src={categorie.image}
                    alt=""
                  />
                </div>
              ))}
            </Slider>
          </div>
          <div>
            <Products />
          </div>
        </div>
      )}
    </>
  );
};

export default Home;
