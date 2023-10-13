import  { useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Carousel = ({children, sliderRef}) => {
 
  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    swipe:false,    
  };

  return (
    <>
      <Slider ref={sliderRef} {...settings} className="container mx-auto p-4 relative max-w-md">
               
        {
            children
        }
      </Slider>

    </>
  );
};

export default Carousel;
