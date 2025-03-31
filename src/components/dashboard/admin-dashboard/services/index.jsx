import Sidebar from "../common/Sidebar";
import Header from "../../../header/dashboard-header";
import Footer from "../common/Footer";
import FilterBox from "./components/filter-box";
import ServiceTable from "./components/ServiceTable";
import { useState } from "react";

const index = () => {
  const [searchParameter, setSearchParameter] = useState ("");
  const [refresh, setRefresh] = useState (false);
  return (
    <>
      {/*  */}
      {/* End Page Title */}

      <div className="header-margin"></div>

      <Header />
      {/* End dashboard-header */}

      <div className="dashboard">
        <div className="dashboard__sidebar bg-white scroll-bar-1">
          <Sidebar />
          {/* End sidebar */}
        </div>
        {/* End dashboard__sidebar */}

        <div className="dashboard__main">
          <div className="dashboard__content bg-light-2">
            <div className="row y-gap-20 justify-between items-end pb-60 lg:pb-40 md:pb-32">
              <div className="col-auto">
                <h1 className="text-30 lh-14 fw-600">All Vendors Services</h1>
                <div className="text-15 text-light-1">
                Add, Edit, or Remove Vendors Services
                </div>
              </div>
              {/* End .col-auto */}

              <div className="col-auto">
                <FilterBox setSearchParameter = {setSearchParameter} setRefresh = {setRefresh} refresh = {refresh}/>
              </div>
            </div>
            {/* End .row */}

            <div className="py-30 px-30 rounded-4 bg-white shadow-3">
              <ServiceTable searchParameter = {searchParameter} refresh = {refresh}/>
              {/* End tabs */}
            </div>

            <Footer />
          </div>
          {/* End .dashboard__content */}
        </div>
        {/* End dashbaord content */}
      </div>
      {/* End dashbaord content */}
    </>
  );
};

export default index;