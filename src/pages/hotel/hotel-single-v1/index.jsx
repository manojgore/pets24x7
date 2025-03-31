import "photoswipe/dist/photoswipe.css";
import { hotelsData } from "@/data/hotels";
import Header1 from "@/components/header/header-1";
import Overview from "@/components/hotel-single/Overview";
import PopularFacilities from "@/components/hotel-single/PopularFacilities";
import PropertyHighlights from "@/components/hotel-single/PropertyHighlights";
import RatingTag from "@/components/hotel-single/RatingTag";
import StickyHeader from "@/components/hotel-single/StickyHeader";
import TopBreadCrumb from "@/components/hotel-single/TopBreadCrumb";
import SidebarRight from "@/components/hotel-single/SidebarRight";
import AvailableRooms from "@/components/hotel-single/AvailableRooms";
import ReviewProgress from "@/components/hotel-single/guest-reviews/ReviewProgress";
import DetailsReview from "@/components/hotel-single/guest-reviews/DetailsReview";
import ReplyForm from "@/components/hotel-single/ReplyForm";
import ReplyFormReview from "@/components/hotel-single/ReplyFormReview";
import Facilities from "@/components/hotel-single/Facilities";

import Surroundings from "@/components/hotel-single/Surroundings";
import HelpfulFacts from "@/components/hotel-single/HelpfulFacts";
import Faq from "@/components/faq/Faq";
import Hotels2 from "@/components/hotels/Hotels2";
import CallToActions from "@/components/common/CallToActions";
import DefaultFooter from "@/components/footer/default";
import GalleryOne from "@/components/hotel-single/GalleryOne";
import { useLocation, useParams } from "react-router-dom";

import MetaComponent from "@/components/common/MetaComponent";
import { useEffect, useState } from "react";
import axios from "axios";
import { api } from "@/utils/apiProvider";
import { getIDFromURL } from "@/utils/DOMUtils";

const metadata = {
  title: "Venue | WedEazzy - Your Dream Wedding Partner",
  description: "WedEazzy - Your Dream Wedding Partner",
};

const HotelSingleV1Dynamic = () => {
  let params = useParams();
  const id = getIDFromURL(params.id);
  const location = useLocation();
  const { venue } = location.state || {};
  const hotel = hotelsData.find((item) => item.id == id) || hotelsData[0];
  const [venueData, setVenueData] = useState(null);
  const [error, setError] = useState('');

  const fetchVenue = async () => {
    if (venue === null || venue === undefined) {
      try {
        const response = await axios.get(`${api}/api/venue/get-venue/${id}`);
        setVenueData(response.data);
      } catch (err) {
        setError(err.response ? err.response.data.message : 'Error fetching venues');
      }
    } else {
      setVenueData(venue);
    }
  }

  useEffect(() => {
    fetchVenue();
  }, []);

  return (
    <>
      <MetaComponent meta={metadata} />
      {/* End Page Title */}

      <div className="header-margin"></div>
      {/* header top margin */}

      <Header1 staticHeader={true} />
      {/* End Header 1 */}

      <StickyHeader hotel={hotel} />
      {/* sticky single header for hotel single */}

      <GalleryOne venueData={venueData} />

      {/* End gallery grid wrapper */}

      <section className="pt-30">
        <div className="container">
          <div className="row y-gap-30">
            <div className="col-xl-8">
              <div className="row y-gap-20">
                <div className="col-12">
                  <h3 className="text-24 fw-600">Property highlights</h3>
                  <PropertyHighlights venue={venueData} />
                </div>
                <div id="overview" className="col-12">
                  <Overview venue={venueData} />
                </div>
                <div className="col-12">
                  <RatingTag venue={venueData} />
                </div>
              </div>
              {/* End .row */}
            </div>
            {/* End .col-xl-8 */}

            <div className="col-xl-4">
              <SidebarRight mode="venue" id={venueData?.venue_id} />
            </div>
            {/* End .col-xl-4 */}
          </div>
          {/* End .row */}
        </div>
        {/* End container */}
      </section>
      <section className="pt-40" id="buffet">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <h3 className="text-22 fw-600">Food Packages</h3>
            </div>
          </div>
          {/* End .row */}

          <div className="row x-gap-50 y-gap-30 pt-20">
            <Surroundings venue={venueData} />
          </div>
          {/* End .row */}
        </div>
        {/* End .container */}
      </section>
      {/* End hotel surroundings */}

      <section id="faq" className="pt-40 layout-pb-md">
        <div className="container">
          <div className="pt-40 border-top-light">
            <div className="row y-gap-20">
              <div className="col-lg-4">
                <h2 className="text-22 fw-600">
                  FAQs
                </h2>
              </div>
              {/* End .row */}

              <div className="col-lg-8">
                <div className="accordion -simple row y-gap-20 js-accordion">
                  <Faq />
                </div>
              </div>
              {/* End .col */}
            </div>
            {/* End .row */}
          </div>
          {/* End .pt-40 */}
        </div>
        {/* End .container */}
      </section>
      {/* End Faq about sections */}
      {/* End similar hotel */}

      {<CallToActions claim data={venueData} business="venue" disabled={localStorage.getItem("venue-userId") === venueData?.user_id} />}
      {/* End Call To Actions Section */}

      <DefaultFooter />
    </>
  );
};

export default HotelSingleV1Dynamic;
