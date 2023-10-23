import React from "react";
import Card from "../Card/Card";
import "./FeaturedProducts.scss";
import OwlCarousel  from "react-owl-carousel"
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
        <OwlCarousel className='owl-theme' {...owlOptions}>
            {dataSet?.map((item) => <Card item={item} key={item.mamh} />)}
        </OwlCarousel>
      </div>
    </div>
  );
};

export default FeaturedProducts;
