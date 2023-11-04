import React, { memo } from "react";
import Card from "../Card/Card";
import "./FeaturedProducts.scss";
import OwlCarousel from "react-owl-carousel"
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
// import useFetch from "../../hooks/useFetch";

const owlOptions = {
  items: 3,
  loop: true,
  margin: 10,
  autoplay: true,
  autoplayTimeout: 2000,
}

const FeaturedProducts = ({ type, dataSet }) => {
  // const { data, loading, error } = useFetch(
  //   `/products?populate=*&[filters][type][$eq]=${type}`
  // );
<<<<<<< HEAD

=======
  console.log("dataSet", dataSet);
>>>>>>> 915300c098a127bea5d715084635170d484a9a8b
  return (
    <div className="featuredProducts">
      <div className="top">
        <h1>{type} products</h1>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum
          suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan
          lacus vel facilisis labore et dolore magna aliqua. Quis ipsum
          suspendisse ultrices gravida. Risus commodo viverra maecenas.
        </p>
      </div>
      <div className="bottom">
        {
          dataSet.length <= 2 ? dataSet?.map((item) => <Card item={item} key={item.mamh} />)
            : <OwlCarousel className='owl-theme' {...owlOptions}>
              {dataSet?.map((item) => <Card item={item} key={item.mamh} />)}
            </OwlCarousel>
        }

      </div>
    </div>
  );
};

export default memo(FeaturedProducts);
