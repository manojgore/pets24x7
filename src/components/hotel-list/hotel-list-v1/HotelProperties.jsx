// import { hotelsData } from "../../../data/hotels";
// import { Swiper, SwiperSlide } from "swiper/react";
// import { Navigation, Pagination } from "swiper";

// import { json, Link } from "react-router-dom";
// import { getSeoFriendlyURL } from "@/utils/DOMUtils";

// const HotelProperties = ({ venues = { data: [] } }) => {
//   return (
//     <>
//       {venues !== null && venues.data.map((venue) => (
//         <div className="col-12" key={venue?.venue_id}>
//           <div className="border-top-light pt-30">
//             <div className="row x-gap-20 y-gap-20">
//               <div className="col-md">
//                 <div className="cardImage rounded-4">
//                   <div className="cardImage__content">
//                     <div className="cardImage-slider rounded-4 custom_inside-slider">
//                       <Swiper
//                         className="mySwiper"
//                         modules={[Pagination, Navigation]}
//                         pagination={{ clickable: true }}
//                         navigation={true}
//                         breakpoints={{
//                           320: { slidesPerView: 1, spaceBetween: 10 },
//                           768: { slidesPerView: 1, spaceBetween: 15 },
//                           1024: { slidesPerView: 1, spaceBetween: 20 },
//                         }}
//                       >
//                         {JSON.parse(venue?.venue_images).length !== 0 ? (
//                           JSON.parse(venue?.venue_images).map((slide, i) => (
//                             <SwiperSlide key={i}>
//                               <img
//                                 className="rounded-4 col-12 js-lazy"
//                                 src={slide}
//                                 alt="image"
//                                 style={{
//                                   height: "100%",
//                                   objectFit: "cover",
//                                   width: "100%",
//                                   objectPosition: "center",
//                                 }}
//                               />
//                             </SwiperSlide>
//                           ))
//                         ) : (
//                           <SwiperSlide>
//                             <img
//                               className="rounded-4 col-12 js-lazy"
//                               src="/img/venue/defaultvenue.jpg"
//                               alt="Default venue image"
//                               style={{
//                                 height: "100%",
//                                 objectFit: "cover",
//                                 width: "100%",
//                                 objectPosition: "center",
//                               }}
//                             />
//                           </SwiperSlide>
//                         )}
//                       </Swiper>
//                     </div>
//                   </div>

//                   {venue?.special_label && (
//                     <div className="cardImage__leftBadge">
//                       <div
//                         className="py-5 px-15 rounded-right-4 text-12 lh-16 fw-500 uppercase bg-dark-1 text-white"
//                         style={{ width: "fit-content" }}
//                       >
//                         {venue?.special_label}
//                       </div>
//                     </div>
//                   )}

//                   <div className="cardImage__wishlist">
//                     <button className="button -blue-1 bg-white size-30 rounded-full shadow-2">
//                       <i className="icon-heart text-12"></i>
//                     </button>
//                   </div>
//                 </div>

//               </div>
//               {/* End .col */}

//               <div className="col-md">
//                 <h3 className="text-18 lh-16 fw-800">
//                   <Link
//                     to={`/venue/${getSeoFriendlyURL(venue.city_name)}/${getSeoFriendlyURL(venue.region_name)}/${getSeoFriendlyURL(venue.venue_name) + "-" + venue.venue_id}`}
//                     className="text-dark-1 hover:underline"
//                   >
//                     {venue?.venue_name}
//                     <div className="row x-gap-10 y-gap-10 items-center pb-10">
//                       <div className="col-auto">
//                         <p className="text-14 fw-600">{venue?.venue_address?.length > 60
//                           ? venue?.venue_address.slice(0, 60) + "..."
//                           : venue?.venue_address} </p>
//                       </div>
//                     </div>
//                   </Link>
//                   <button
//                     data-x-click="mapFilter"
//                     onClick={() => { window.open(venue.venue_map_url, "_blank"); }}
//                     className="d-block text-14 text-blue-1 underline fw-600"
//                   >
//                     Show on map
//                   </button>

//                   {/* <div className="d-inline-block ml-10">
//                     <i className="icon-star text-10 text-yellow-2"></i>
//                     <i className="icon-star text-10 text-yellow-2"></i>
//                     <i className="icon-star text-10 text-yellow-2"></i>
//                     <i className="icon-star text-10 text-yellow-2"></i>
//                     <i className="icon-star text-10 text-yellow-2"></i>
//                   </div> */}
//                 </h3>

//                 <div className="text-14 d-flex text-green-2 lh-15 mt-10">
//                   <div className="fw-700"> Veg. - </div><div className="fw-500"> &nbsp;{` ₹${venue.veg_package_price}`}/Per Plate</div>
//                 </div>
//                 <div className="text-14 d-flex lh-15" style={{ color: "#d13535" }}>
//                   <div className="fw-700"> Non-Veg. - </div><div className="fw-500"> &nbsp;{` ₹${venue.non_veg_package_price}`}/Per Plate</div>
//                 </div>
//                 <div className="row x-gap-10 y-gap-10 pt-20">

//                   {JSON.parse(venue.venue_categories).slice(0, 4).map((category) => (
//                     <div className="col-auto">
//                       <div className={`py-5 px-15 mr-5 mt-5 text-12 lh-16 fw-600 uppercase text-white ${category.category_color_class}`} style={{ backgroundColor: category.category_color_class, width: "fit-content", flex: "0 0 130px", borderRadius: "0 15px 15px 0", }}>
//                         {category.category_name}
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//               {/* End .col-md */}

//               <div className="col-md text-right md:text-left">
//                 <div className="row x-gap-10 y-gap-10 justify-end items-center md:justify-start">
//                   {/* <div className="col-auto">
//                     <div className="d-inline-block ml-10">
//                       <i className="icon-star text-10 text-yellow-2"></i>
//                       <i className="icon-star text-10 text-yellow-2"></i>
//                       <i className="icon-star text-10 text-yellow-2"></i>
//                       <i className="icon-star text-10 text-yellow-2"></i>
//                       <i className="icon-star text-10 text-yellow-2"></i>
//                     </div>
//                     <div className="text-14 lh-14 fw-500">Exceptional</div>
//                     <div className="text-14 lh-14 text-light-1">
//                       3,014 reviews
//                     </div>
//                   </div>
//                   <div className="col-auto">
//                     <div className="flex-center text-white fw-600 text-14 size-40 rounded-4 bg-blue-1">
//                       {"3.7"}
//                     </div>
//                   </div> */}
//                 </div>

//                 <div className="">
//                   <div className="text-14 text-light-1 mt-50 md:mt-20">
//                     Contact: {venue?.venue_phone_no}
//                   </div>
//                   <div className="text-22 lh-12 fw-600 mt-5">
//                     Price - ₹{venue?.venue_rate} /-
//                   </div>
//                   <Link
//                     state={venue}
//                     to={`/venue/${venue.city_name}/${venue.region_name}/${getSeoFriendlyURL(venue.venue_name) + "-" + venue.venue_id}`}
//                     className="button -md -dark-1 bg-blue-1 text-white mt-24"
//                   >
//                     See Availability{" "}
//                     <div className="icon-arrow-top-right ml-5"></div>
//                   </Link>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       ))}
//     </>
//   );
// };

// export default HotelProperties;


// import React from "react";
// import { Link } from "react-router-dom";
// import { Swiper, SwiperSlide } from "swiper/react";
// import { Navigation, Pagination } from "swiper";

// import { getSeoFriendlyURL } from "@/utils/DOMUtils";
// // import hotelsData if needed: import { hotelsData } from "../../../data/hotels";

// const HotelProperties = ({ venues = { data: [] } }) => {
//   return (
//     <div className="row">
//       {venues !== null &&
//         venues.data.map((venue) => {
//           const images = JSON.parse(venue?.venue_images);
//           const categories = JSON.parse(venue?.venue_categories);

//           return (
//             <div
//               className="col-12 col-sm-6 col-md-4 col-lg-4 "
//               key={venue?.venue_id}
//             >
//               <div className="venue-card shadow px-2">
//                 {/* Image Section */}
//                 <div className="cardImage rounded-4">
//                   <div className="cardImage__content">
//                     <div className="cardImage-slider rounded-4 custom_inside-slider">
//                       <Swiper
//                         className="mySwiper"
//                         modules={[Pagination, Navigation]}
//                         pagination={{ clickable: true }}
//                         navigation={true}
//                         breakpoints={{
//                           320: { slidesPerView: 1, spaceBetween: 10 },
//                           768: { slidesPerView: 1, spaceBetween: 15 },
//                           1024: { slidesPerView: 1, spaceBetween: 20 },
//                         }}
//                       >
//                         {images.length !== 0 ? (
//                           images.map((slide, i) => (
//                             <SwiperSlide key={i}>
//                               <img
//                                 className="rounded-4 col-12 js-lazy"
//                                 src={slide}
//                                 alt="Venue slide"
//                                 style={{
//                                   height: "100%",
//                                   objectFit: "cover",
//                                   width: "100%",
//                                   objectPosition: "center",
//                                 }}
//                               />
//                             </SwiperSlide>
//                           ))
//                         ) : (
//                           <SwiperSlide>
//                             <img
//                               className="rounded-4 col-12 js-lazy"
//                               src="/img/venue/defaultvenue.jpg"
//                               alt="Default venue"
//                               style={{
//                                 height: "100%",
//                                 objectFit: "cover",
//                                 width: "100%",
//                                 objectPosition: "center",
//                               }}
//                             />
//                           </SwiperSlide>
//                         )}
//                       </Swiper>
//                     </div>
//                   </div>

//                   {venue?.special_label && (
//                     <div className="cardImage__leftBadge">
//                       <div className="py-4 px-10 rounded-right-4 text-10 lh-14 fw-500 uppercase bg-dark-1 text-white">
//                         {venue?.special_label}
//                       </div>
//                     </div>
//                   )}

//                   <div className="cardImage__wishlist">
//                     <button className="button -blue-1 bg-white size-30 rounded-full shadow-2">
//                       <i className="icon-heart text-12"></i>
//                     </button>
//                   </div>
//                 </div>
//                 {/* End Image Section */}


//                 <Link
//                   to={`/venue/${getSeoFriendlyURL(venue.city_name)}/${getSeoFriendlyURL(
//                     venue.region_name
//                   )}/${getSeoFriendlyURL(venue.venue_name) +
//                   "-" +
//                   venue.venue_id}`}
//                   className="text-dark-1 hover:underline"
//                 >
//                   {/* Data Section (below the image) */}
//                   <div className="venue-card__content">
//                     <h3 className="venue-card__title fw-600">
//                       {venue?.venue_name}
//                     </h3>
//                     <p className="venue-card__address text-muted fw-600">
//                       {venue?.venue_address?.length > 60
//                         ? venue?.venue_address.slice(0, 60) + "..."
//                         : venue?.venue_address}
//                     </p>

//                     {/* <div className="venue-card__categories row">
//                     {categories.slice(0, 4).map((category, index) => (
//                       <div className="col-auto" key={index}>
//                         <div
//                           className="venue-card__category py-1 px-10 text-10 fw-600 uppercase text-white"
//                           style={{
//                             backgroundColor: category.category_color_class,
//                             borderRadius: "0 15px 15px 0",
//                           }}
//                         >
//                           {category.category_name}
//                         </div>
//                       </div>
//                     ))}
//                   </div> */}

//                     <div className="venue-card__pricing d-flex justify-content-between">
//                       <div className="d-flex align-items-center">
//                         <span className="fw-600">Veg:</span>
//                         <span className="fw-500 ml-5">{`₹${venue.veg_package_price}/Plate`}</span>
//                       </div>
//                       <div
//                         className="d-flex align-items-center mt-5"
//                       // style={{ color: "#d13535" }}
//                       >
//                         <span className="fw-600">Non-Veg:</span>
//                         <span className="fw-500 ml-5">{`₹${venue.non_veg_package_price}/Plate`}</span>
//                       </div>
//                     </div>


//                     <div className="d-flex justify-content-between align-items-center">
//                       <p className="contact-info">
//                         <span style={{ color: "#333" }}>Contact:</span> {venue?.venue_phone_no}
//                       </p>
//                       <p className="venue-card__rate ">
//                         <span style={{ color: "#333" }}>Price </span> - ₹{venue?.venue_rate} /-
//                       </p>
//                     </div>
//                     <Link
//                       state={venue}
//                       to={`/venue/${venue.city_name}/${venue.region_name}/${getSeoFriendlyURL(
//                         venue.venue_name
//                       ) +
//                         "-" +
//                         venue.venue_id}`}
//                       className="venue-card__btn button -md -dark-1 bg-blue-1 text-white"
//                     >
//                       See Availability
//                       <div className="icon-arrow-top-right ml-5"></div>
//                     </Link>

//                     <button
//                       data-x-click="mapFilter"
//                       onClick={() => window.open(venue.venue_map_url, "_blank")}
//                       className="venue-card__mapLink text-red-1 underline fw-600 text-10"
//                     >
//                       Show on map
//                     </button>

//                   </div>
//                 </Link>

//                 {/* End Data Section */}
//               </div>
//             </div>
//           );
//         })}
//     </div >
//   );
// };

// export default HotelProperties;

import React from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper";

import { getSeoFriendlyURL } from "@/utils/DOMUtils";
// import hotelsData if needed: import { hotelsData } from "../../../data/hotels";

const HotelProperties = ({ venues = { data: [] } }) => {
  return (
    <div className="row">
      {venues !== null &&
        venues.data.map((venue) => {
          const images = JSON.parse(venue?.venue_images);
          const categories = JSON.parse(venue?.venue_categories);

          return (
            <div
              className="col-12 col-md-6 col-lg-4"
              key={venue?.venue_id}
            >
              <div className="venue-card shadow px-2">
                {/* Image Section */}
                <div className="cardImage rounded-4">
                  <div className="cardImage__content">
                    <div className="cardImage-slider rounded-4 custom_inside-slider">
                      <Swiper
                        className="mySwiper"
                        modules={[Pagination, Navigation]}
                        pagination={{ clickable: true }}
                        navigation={true}
                        breakpoints={{
                          320: { slidesPerView: 1, spaceBetween: 10 },
                          768: { slidesPerView: 1, spaceBetween: 15 },
                          1024: { slidesPerView: 1, spaceBetween: 20 },
                        }}
                      >
                        {images.length !== 0 ? (
                          images.map((slide, i) => (
                            <SwiperSlide key={i}>
                              <img
                                className="rounded-4 col-12 js-lazy"
                                src={slide}
                                alt="Venue slide"
                                style={{
                                  height: "100%",
                                  objectFit: "cover",
                                  width: "100%",
                                  objectPosition: "center",
                                }}
                              />
                            </SwiperSlide>
                          ))
                        ) : (
                          <SwiperSlide>
                            <img
                              className="rounded-4 col-12 js-lazy"
                              src="/img/venue/defaultvenue.jpg"
                              alt="Default venue"
                              style={{
                                height: "100%",
                                objectFit: "cover",
                                width: "100%",
                                objectPosition: "center",
                              }}
                            />
                          </SwiperSlide>
                        )}
                      </Swiper>
                    </div>
                  </div>

                  {venue?.special_label && (
                    <div className="cardImage__leftBadge">
                      <div className="py-4 px-10 rounded-right-4 text-10 lh-14 fw-500 uppercase bg-dark-1 text-white">
                        {venue?.special_label}
                      </div>
                    </div>
                  )}

                  <div className="cardImage__wishlist">
                    <button className="button -blue-1 bg-white size-30 rounded-full shadow-2">
                      <i className="icon-heart text-12"></i>
                    </button>
                  </div>
                </div>
                {/* End Image Section */}

                <Link
                  to={`/venue/${getSeoFriendlyURL(venue.city_name)}/${getSeoFriendlyURL(
                    venue.region_name
                  )}/${getSeoFriendlyURL(venue.venue_name) +
                  "-" +
                  venue.venue_id}`}
                  className="text-dark-1 hover:underline"
                >
                  {/* Data Section */}
                  <div className="venue-card__content">
                    <h3 className="venue-card__title fw-600">
                      {venue?.venue_name}
                    </h3>
                    <p className="venue-card__address text-muted fw-600">
                      {venue?.venue_address?.length > 60
                        ? venue?.venue_address.slice(0, 60) + "..."
                        : venue?.venue_address}
                    </p>

                    <div className="venue-card__pricing d-flex justify-content-between">
                      <div className="d-flex align-items-center">
                        <span className="fw-600">Veg:</span>
                        <span className="fw-600 ml-5" style={{ color: 'grey' }}> {`₹${venue.veg_package_price}/Plate`}</span>
                      </div>
                      <div className="d-flex align-items-center mt-5">
                        <span className="fw-600">Non-Veg:</span>
                        <span className="fw-600 ml-5" style={{ color: 'grey' }}>{`₹${venue.non_veg_package_price}/Plate`}</span>
                      </div>
                    </div>

                    <div className="d-flex justify-content-between align-items-center">
                      <p className="contact-info">
                        <span style={{ color: "#333" }}>Contact:</span> {venue?.venue_phone_no}
                      </p>
                      <p className="venue-card__rate">
                        <span style={{ color: "#333" }}>Price </span> - ₹{venue?.venue_rate}/-
                      </p>
                    </div>
                    <Link
                      state={venue}
                      to={`/venue/${venue.city_name}/${venue.region_name}/${getSeoFriendlyURL(
                        venue.venue_name
                      ) +
                        "-" +
                        venue.venue_id}`}
                      className="venue-card__btn button -md -dark-1 bg-blue-1 text-white"
                    >
                      See Availability
                      <div className="icon-arrow-top-right ml-5"></div>
                    </Link>

                    <button
                      data-x-click="mapFilter"
                      onClick={() => window.open(venue.venue_map_url, "_blank")}
                      className="venue-card__mapLink text-red-1 underline fw-600 text-10"
                    >
                      Show on map
                    </button>
                  </div>
                </Link>
                {/* End Data Section */}
              </div>
            </div >
          );
        })}
    </div >
  );
};

export default HotelProperties;
