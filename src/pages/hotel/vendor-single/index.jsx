import "photoswipe/dist/photoswipe.css";
import { hotelsData } from "@/data/hotels";
import Header1 from "@/components/header/header-1";
import Overview from "@/components/vendor-single/Overview";
import PropertyHighlights from "@/components/vendor-single/PropertyHighlights";
import RatingTag from "@/components/vendor-single/RatingTag";
import StickyHeader from "@/components/vendor-single/StickyHeader";
import SidebarRight from "@/components/vendor-single/SidebarRight";


import Surroundings from "@/components/vendor-single/Surroundings";
import Faq from "@/components/faq/Faq";
import CallToActions from "@/components/common/CallToActions";
import DefaultFooter from "@/components/footer/default";
import GalleryOne from "@/components/vendor-single/GalleryOne";
import { useLocation, useParams } from "react-router-dom";

import MetaComponent from "@/components/common/MetaComponent";
import { useEffect, useState } from "react";
import axios from "axios";
import { api } from "@/utils/apiProvider";
import { showAlert } from "@/utils/isTextMatched";
import { getIDFromURL } from "@/utils/DOMUtils";

const metadata = {
  title: "Vendor | WedEazzy - Your Dream Wedding Partner",
  description: "WedEazzy - Your Dream Wedding Partner",
};

const VendorSingle = () => {
  let params = useParams();
  const id = getIDFromURL(params.id);
  const location = useLocation();
  const { vendor } = location.state || {};
  const hotel = hotelsData.find((item) => item.id == id) || hotelsData[0];
  const [vendorData, setVendorData] = useState(null);
  const [error, setError] = useState('');

  const fetchVendor = async () => {
    if (vendor === null || vendor === undefined) {
      try {
        const response = await axios.get(`${api}/api/vendor/get-vendor/${id}`);
        if (response.data.results === true) {
          setVendorData(response.data.result);
        } else {
          showAlert("Something Went wrong !", "error")
        }
      } catch (err) {
        setError(err.response ? err.response.data.message : 'Error fetching venues');
      }
    } else {
      setVendorData(venue);
    }
  }

  useEffect(() => {
    fetchVendor();
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

      <GalleryOne vendorData={vendorData} />

      {/* End gallery grid wrapper */}

      <section className="pt-30">
        <div className="container">
          <div className="row y-gap-30">
            <div className="col-xl-8">
              <div className="row y-gap-40">
                {/* <div className="col-12">
                  <h3 className="text-22 fw-500">Property highlights</h3>
                  <PropertyHighlights vendorData={vendorData} />
                </div> */}
                <div id="overview" className="col-12">
                  <Overview vendorData={vendorData} />
                </div>
                <div className="col-12">
                  <RatingTag vendorData={vendorData} />
                </div>
              </div>
              {/* End .row */}
            </div>
            {/* End .col-xl-8 */}

            <div className="col-xl-4">
              <SidebarRight vendorData={vendorData} />
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
              <h3 className="text-22 fw-600">{vendorData?.vendor_service} Package Details</h3>
            </div>
          </div>
          {/* End .row */}

          <div className="row x-gap-50 y-gap-30 pt-20">
            <Surroundings vendorData={vendorData} />
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

      {<CallToActions claim data={vendorData} business={"vendor"} disabled={localStorage.getItem("vendor-userId") === vendorData?.user_id} />}
      {/* End Call To Actions Section */}

      <DefaultFooter />
    </>
  );
};

export default VendorSingle;
