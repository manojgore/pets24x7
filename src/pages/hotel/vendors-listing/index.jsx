import CallToActions from "@/components/common/CallToActions";
import Header1 from "@/components/header/header-1";
import DefaultFooter from "@/components/footer/default";
import MainFilterSearchBox from "@/components/hotel-list/vendor-listing/MainFilterSearchBox";
import TopHeaderFilter from "@/components/hotel-list/vendor-listing/TopHeaderFilter";
import HotelProperties from "@/components/hotel-list/vendor-listing/HotelProperties";
import Pagination from "@/components/hotel-list/common/Pagination";
import Sidebar from "@/components/hotel-list/vendor-listing/Sidebar";

import MetaComponent from "@/components/common/MetaComponent";
import axios from "axios";
import { api } from "@/utils/apiProvider";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { debounce, objectToQueryString, urlSearchParamsToObject } from "@/utils/DOMUtils";

const metadata = {
  title: "Vendors | WedEazzy - Your Dream Wedding Partner",
  description: "WedEazzy - Your Dream Wedding Partner",
};

const VendorsListing = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);

  const [vendors, setVendors] = useState(null);
  const [error, setError] = useState('');

  const [cities, setCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState(null);

  const [regions, setRegions] = useState([]);
  const [selectedRegion, setselectedRegion] = useState(null);

  const [services, setServices] = useState([]);

  const [searchParams, setSearchParams] = useState({
    ...{
      vendor_name: '',
      city_name: '',
      region_name: '',
      vendor_service: '',
      vendor_rate: { min: 1000, max: 90000 },
      page: 1,
      limit: 9,
      venue_categories: []
    }, ...urlSearchParamsToObject(queryParams)
  });



  const onFilterChange = (value, name) => {
    debounce(() => {
      setSearchParams((prev) => ({
        ...prev, [name]: value
      }))
    }
      , 1000)
      (value);
  }

  const fetchCities = async () => {
    try {
      const response = await axios.get(`${api}/api/city/get-city`);
      if (response.data.success) {
        setCities(response.data.results);
      }
    } catch (error) {
      console.log('failed to fetch the user');
      console.error(error);
    }
  };

  const fetchService = async () => {
    try {
      const response = await axios.get(`${api}/api/service/get-services`);
      if (response.data.success) {
        setServices(response.data.results);
      }
    } catch (error) {
      console.log('failed to fetch the user');
      console.error(error);
    }
  };

  const fetchRegions = async (city_id) => {
    if (city_id !== undefined && city_id !== "") {
      try {
        const response = await axios.get(`${api}/api/region/get-regions-by-city-id/${city_id}`);
        if (response.data.success) {
          setRegions(response.data.results);
        }
      } catch (error) {
        console.log('failed to fetch the user');
        console.error(error);
      }
    }
  };

  const fetchVenues = async (params = searchParams) => {
    try {
      const response = await axios.get(`${api}/api/vendor/search-vendors`, { params });
      setVendors(response.data);
      setError('');
    } catch (err) {
      setError(err.response ? err.response.data.message : 'Error fetching venues');
    }
  };

  const handleSearchMainFilterSearch = (selectedCity, selectedRegion, selectedService) => {
    const city_name = selectedCity.city_name || "";
    const region_name = selectedRegion.region_name || "";
    const vendor_service = selectedService || "";

    setSearchParams((prev) => ({ ...prev, city_name: city_name, region_name: region_name, vendor_service: vendor_service }));

    const queryParams = new URLSearchParams({ city_name, region_name, vendor_service }).toString();
    navigate(`?${queryParams}`);
  }

  useEffect(() => {
    fetchRegions(selectedCity?.city_id);
  }, [selectedCity]);

  useEffect(() => {
    const queryString = objectToQueryString(searchParams);
    navigate(`?${queryString}`);
    fetchVenues();
  }, [searchParams]);

  useEffect(() => {
    fetchCities();
    fetchService();
    const params = urlSearchParamsToObject(queryParams);
    setSearchParams((prev) => ({ ...prev, ...params }));
    if (params.city_id != undefined) {
      fetchRegions(params.city_id);
    }
    if (params.city_name != undefined && params.city_id != undefined) {
      setSelectedCity({ city_name: params.city_name, city_id: params.city_id });
    }
    if (params.region_name != undefined && params.region_id != undefined) {
      setselectedRegion({ region_name: params.region_name, region_id: params.region_id });
    }
  }, []);

  return (
    <>
      <MetaComponent meta={metadata} />
      {/* End Page Title */}

      <div className="header-margin"></div>
      {/* header top margin */}

      <Header1 staticHeader={true} />
      {/* End Header 1 */}


      <section className="pt-10 pb-5">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="text-center mb-20">
                <h1 className="text-30 fw-600  text-blue-1 font-dancing-script">Find Your Vendor</h1>
              </div>
              {/* End text-center */}
              <MainFilterSearchBox setSelectedCity={setSelectedCity} selectedCity={selectedCity} selectedRegion={selectedRegion} setselectedRegion={setselectedRegion} searchParams={searchParams} cities={cities} regions={regions} services={services} handleSearchMainFilterSearch={handleSearchMainFilterSearch} />
            </div>
            {/* End col-12 */}
          </div>
        </div>
      </section>
      {/* Top SearchBanner */}

      <section className="layout-pt-sm layout-pb-sm">
        <div className="container">
          <div className="row y-gap-5">
            <div className="col-xl-3">
              <aside className="sidebar y-gap-10 xl:d-none">
                <Sidebar onFilterChange={onFilterChange} searchParams={searchParams} />
              </aside>
              {/* End sidebar for desktop */}

              <div
                className="offcanvas offcanvas-start"
                tabIndex="-1"
                id="listingSidebar"
              >
                <div className="offcanvas-header">
                  <h5 className="offcanvas-title" id="offcanvasLabel">
                    Filter Hotels
                  </h5>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="offcanvas"
                    aria-label="Close"
                  ></button>
                </div>
                {/* End offcanvas header */}

                <div className="offcanvas-body">
                  <aside className="sidebar y-gap-40  xl:d-block">
                    <Sidebar onFilterChange={onFilterChange} searchParams={searchParams} />
                  </aside>
                </div>
                {/* End offcanvas body */}
              </div>
              {/* End mobile menu sidebar */}
            </div>
            {/* End col */}

            <div className="col-xl-9 ">
              <TopHeaderFilter totalResult={vendors?.totalResults || 0} regionName={vendors?.region_name} />
              <div className="mt-10"></div>
              {/* End mt--30 */}
              <div className="row y-gap-10">
                <HotelProperties vendors={vendors} />
              </div>
              {/* End .row */}
              <Pagination totalPages={vendors?.totalPages} setSearchParams={setSearchParams} />
            </div>
            {/* End .col for right content */}
          </div>
          {/* End .row */}
        </div>
        {/* End .container */}
      </section>
      {/* End layout for listing sidebar and content */}

      <CallToActions />
      {/* End Call To Actions Section */}

      <DefaultFooter footerType={"vendor"} />
    </>
  );
};

export default VendorsListing;
