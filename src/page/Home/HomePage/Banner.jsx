// import React from "react";
// import Slider from "react-slick";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";

// const sliderData = [
//   {
//     userName: "John Doe",
//     email: "john.doe@example.com",
//     statistics: "1,234 views | 567 likes",
//     textColor: "text-white",
//   },
//   {
//     userName: "Jane Smith",
//     email: "jane.smith@example.com",
//     statistics: "2,345 views | 789 likes",
//     textColor: "text-white",
//   },
//   {
//     userName: "Bob Johnson",
//     email: "bob.johnson@example.com",
//     statistics: "3,456 views | 890 likes",
//     textColor: "text-white",
//   },
// ];

// const Banner = () => {
//   const settings = {
//     dots: true,
//     infinite: true,
//     speed: 500,
//     slidesToShow: 1,
//     slidesToScroll: 1,
//     adaptiveHeight: true,
//   };

//   return (
//     <section>
//       <Slider {...settings}>
//         {sliderData.map((slide, index) => (
//           <div
//             key={index}
//             className={`relative  w-screen  ${slide.background} ${slide.textColor}`}>
//                <div className="flex flex-col md:flex-row bg-gray-100 overflow-hidden">
//       <div className="md:w-4/12 relative">
//         <div
//           className="absolute inset-0 z-0 bg-cover bg-center "
//           style={{
//             backgroundImage:
//               'url("https://th.bing.com/th/id/OIP.4rfX1GcixwFduUuoxZwc1QHaHa?pid=ImgDet&rs=1")',
//             filter: "blur(80px)",
//             opacity: "0.7",
//             transform: "scale(1.2)"
//           }}></div>

//         <div className="w-full h-full p-4 md:p-8 relative z-10 flex items-center">
//           <img
//             src="https://th.bing.com/th/id/OIP.4rfX1GcixwFduUuoxZwc1QHaHa?pid=ImgDet&rs=1"
//             alt="Profile Image"
//             className="mx-auto w-32 h-32 md:w-48 md:h-48 object-cover  border-4 "
//           />
//         </div>
//       </div>

//       <div className="md:w-6/12 p-4 md:p-8 flex flex-col justify-center">
//         <h2 className="text-3xl font-bold mb-4">Your Title</h2>
//         <p className="text-gray-700 text-lg">
//           Your bio goes here. You can add some information about yourself or
//           your project in this section. Make sure to keep it concise and
//           engaging.
//         </p>
//       </div>
//     </div>
          
//           </div>
//         ))}
//       </Slider>
//     </section>
//   );
// };

// export default Banner;
