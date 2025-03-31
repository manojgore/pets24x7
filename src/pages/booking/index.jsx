import CallToActions from "@/components/common/CallToActions";
import Header1 from "@/components/header/header-1";
import DefaultFooter from "@/components/footer/default";
import WhyChoose from "@/components/block/BlockGuide";
import Address from "@/components/block/Address";
import Social from "@/components/common/social/Social";
import MetaComponent from "@/components/common/MetaComponent";
import { useEffect, useState } from "react";
import axios from "axios";
import { api } from "@/utils/apiProvider";
import { getUserId, isLoggedInUser } from "@/utils/DOMUtils";
import { useNavigate } from "react-router-dom";
import BookingTable from "@/components/dashboard/dashboard/db-booking/components/BookingTable";

const metadata = {
  title: "Booking | WedEazzy - Your Dream Wedding Partner",
  description: "WedEazzy - Your Dream Wedding Partner",
};

const Booking = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [filterData, setFilterData] = useState([]);
  const fetchBookingDetails  = async () => {
    try {
      const response = await axios.get(`${api}/api/booking/get-bookings`,{
        headers : {
          user_id: getUserId()
        }
      });
      if (response.status === 200) {
        setFilterData(response.data.filter((item) => { return item.type === tabItems[0].toLowerCase()}));
        setData(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  }

  const tabItems = [
    "Vendor",
    "Venue"
  ];

  useEffect(()=>{
    fetchBookingDetails()
  },[])
  useEffect(()=>{
    if (!isLoggedInUser()) {
      navigate("/")
    }
  })
  return (
    <>
      <MetaComponent meta={metadata} />
      {/* End Page Title */}

      <div className="header-margin"></div>
      {/* header top margin */}

      <Header1 staticHeader={true}/>
      {/* End Header 1 */}

      <section className="layout-pt-md layout-pb-lg">
        <div className="container">
          <div className="row x-gap-80 y-gap-20 justify-between">
            <div className="col-12">
              <div className="text-30 sm:text-24 fw-600">All Bookings</div>
            </div>
            {/* End .col */}
            <BookingTable data={data} tabItems={tabItems} setFilterData={setFilterData} filterData={filterData}/>
          </div>
          {/* End .row */}
        </div>
      </section>
      <section className="layout-pt-md layout-pb-lg">
        <div className="container">
          <div className="row x-gap-80 y-gap-20 justify-between">
            <div className="col-12">
              <div className="text-30 sm:text-24 fw-600">Contact Us</div>
            </div>
            {/* End .col */}

            <Address />
            {/* End address com */}

            <div className="col-auto">
              <div className="text-14 text-light-1">
                Follow us on social media
              </div>
              <div className="d-flex x-gap-20 items-center mt-10">
                <Social />
              </div>
            </div>
            {/* End .col */}
          </div>
          {/* End .row */}
        </div>
      </section>
      {/* End Address Section */}

      <section className="layout-pt-lg layout-pb-lg bg-blue-2">
        <div className="container">
          <div className="row justify-center text-center">
            <div className="col-auto">
              <div className="sectionTitle -md">
                <h2 className="sectionTitle__title">Why Choose Us</h2>
                <p className=" sectionTitle__text mt-5 sm:mt-0">
                  These popular destinations have a lot to offer
                </p>
              </div>
            </div>
          </div>
          {/* End .row */}

          <div className="row y-gap-40 justify-between pt-50">
            <WhyChoose />
          </div>
          {/* End .row */}
        </div>
        {/* End .container */}
      </section>
      {/* End Why Choose Us section */}

      <CallToActions />
      {/* End Call To Actions Section */}

      <DefaultFooter />
      {/* End Call To Actions Section */}
    </>
  );
};

export default Booking;
