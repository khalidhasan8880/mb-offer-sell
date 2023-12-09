
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Carousel = ({children, sliderRef, settings}) => {
 


  return (
    <Slider ref={sliderRef} {...settings} afterChange={(index)=>console.log(index)}>
               
        {
            children
        }
      </Slider>
  );
};

export default Carousel;
