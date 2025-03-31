const PropertyHighlights2 = ({ venue }) => {
  return (
    <div className="row y-gap-10 pt-20">
      <div className="col-lg-3 col-6">
        <div className="text-center">
          <i className={`icon-city text-24 text-blue-1`} />
          <div className="text-15 lh-1 mt-10 fw-600">{"Venue Price - " + "₹" + venue?.venue_rate}</div>
        </div>
      </div>
      <div className="col-lg-3 col-6">
        <div className="text-center">
          <i className={`icon-bell-ring text-24 text-blue-1`} />
          <div className="text-15 lh-1 mt-10 fw-600"> {" Vegetarian - " + "₹" + venue?.veg_package_price}</div>
        </div>
      </div>
      <div className="col-lg-3 col-6">
        <div className="text-center">
          <i className={`icon-bell-ring text-24 text-blue-1`} />
          <div className="text-15 lh-1 mt-10 fw-600"> {" Non Vegetarian - " + "₹" + venue?.non_veg_package_price}</div>
        </div>
      </div>
    </div>
  );
};

export default PropertyHighlights2;
