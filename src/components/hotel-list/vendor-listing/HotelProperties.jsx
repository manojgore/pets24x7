import React from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper";

import { getSeoFriendlyURL } from "@/utils/DOMUtils";

const HotelProperties = ({ vendors = { data: [] } }) => {
  return (
    <div className="row">
      {vendors !== null &&
        vendors.data.map((vendor) => {
          const images = JSON.parse(vendor?.portfolio);

          return (
            <div className="col-12 col-md-6 col-lg-4" key={vendor?.vendor_id}>
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
                                alt="Vendor portfolio"
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
                              src="/img/vendor/defaultvendor.jpg"
                              alt="Default vendor"
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

                  {vendor?.special_label && (
                    <div className="cardImage__leftBadge">
                      <div className="py-4 px-10 rounded-right-4 text-10 lh-14 fw-500 uppercase bg-dark-1 text-white">
                        {vendor?.special_label}
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
                  to={`/vendor/${getSeoFriendlyURL(vendor.city_name)}/${getSeoFriendlyURL(
                    vendor.region_name
                  )}/${getSeoFriendlyURL(vendor.vendor_name) + "-" + vendor.service_reg_id}`}
                  className="text-dark-1 hover:underline"
                >
                  {/* Data Section */}
                  <div className="venue-card__content">
                    <h3 className="venue-card__title fw-600">
                      {vendor?.vendor_name}
                    </h3>
                    <p className="venue-card__address text-muted fw-600">
                      {vendor?.vendor_address?.length > 60
                        ? vendor?.vendor_address.slice(0, 60) + "..."
                        : vendor?.vendor_address}
                    </p>

                    <div className="venue-card__pricing d-flex justify-content-between">
                      <p className="contact-info">
                        <span style={{ color: "#333" }}>Contact:</span> {vendor?.contact_number}
                      </p>
                      <p className="venue-card__rate">
                        <span style={{ color: "#333" }}>Price </span> - ₹{vendor?.vendor_rate}/-
                      </p>
                    </div>
                    <Link
                      state={vendor}
                      to={`/vendor/${getSeoFriendlyURL(vendor.city_name)}/${getSeoFriendlyURL(
                        vendor.region_name
                      )}/${getSeoFriendlyURL(vendor.vendor_name) + "-" + vendor.service_reg_id}`}
                      className="venue-card__btn button -md -dark-1 bg-blue-1 text-white"
                    >
                      Send Enquiry
                      <div className="icon-arrow-top-right ml-5"></div>
                    </Link>

                    <button
                      data-x-click="mapFilter"
                      onClick={() => window.open(vendor.maplink, "_blank")}
                      className="venue-card__mapLink text-red-1 underline fw-600 text-10"
                    >
                      Show on map
                    </button>
                  </div>
                </Link>
                {/* End Data Section */}
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default HotelProperties;