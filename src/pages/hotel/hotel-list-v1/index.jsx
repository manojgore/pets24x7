import CallToActions from "@/components/common/CallToActions";
import Header1 from "@/components/header/header-1";
import DefaultFooter from "@/components/footer/default";
import MainFilterSearchBox from "@/components/hotel-list/hotel-list-v1/MainFilterSearchBox";
import TopHeaderFilter from "@/components/hotel-list/hotel-list-v1/TopHeaderFilter";
import HotelProperties from "@/components/hotel-list/hotel-list-v1/HotelProperties";
import Pagination from "@/components/hotel-list/common/Pagination";
import Sidebar from "@/components/hotel-list/hotel-list-v1/Sidebar";

import MetaComponent from "@/components/common/MetaComponent";
import axios from "axios";
import { api } from "@/utils/apiProvider";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { debounce, objectToQueryString, urlSearchParamsToObject } from "@/utils/DOMUtils";

const metadata = {
  title: "Venue | WedEazzy - Your Dream Wedding Partner",
  description: "WedEazzy - Your Dream Wedding Partner",
};

const HotelListPage1 = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);

  let regionChanged = "";

  const [venues, setVenues] = useState(null);
  const [error, setError] = useState('');

  const [cities, setCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState(null);
  const [regions, setRegions] = useState([]);
  const [allCategories, setAllCategories] = useState([]);

  const [searchParams, setSearchParams] = useState({
    ...{
      venue_name: '',
      city_name: '',
      region_name: '',
      venue_rate: { min: 100, max: 1800 },
      veg_package_price: { min: 100, max: 1800 },
      non_veg_package_price: { min: 100, max: 1800 },
      page: 1,
      city_id: '',
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

  const fetchRegions = async (city_id) => {
    if (city_id !== undefined && city_id !== "") {
      try {
        const response = await axios.get(`${api}/api/region/get-regions-by-city-id/${city_id}`);
        if (response.data.success) {
          setRegions(response.data.results);
          regionChanged = response.data.results[0].region_name;
          response.data.results.forEach((e) => {
            if (e.region_name === searchParams.region_name) {
              regionChanged = searchParams.region_name;
            }
          });
        }
      } catch (error) {
        console.log('failed to fetch regions');
        setRegions([]);
        regionChanged = "";
        console.error(error);
      }
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await axios.get(`${api}/api/categories/get-categories`);
      if (response.data.success) {
        setAllCategories(response.data.results);
      }
    } catch (error) {
      console.log('failed to fetch the user');
      console.error(error);
    }
  };

  const fetchVenues = async (params = searchParams) => {
    try {
      const response = await axios.get(`${api}/api/venue/search-venues`, { params });
      setVenues(response.data);
      setError('');
    } catch (err) {
      setError(err.response ? err.response.data.message : 'Error fetching venues');
    }
  };

  const handleCategoryDropDownChange = (category) => {
    const { category_name } = category;
    let new_venue_categories = [];
    if (searchParams.venue_categories.includes(category_name)) {
      new_venue_categories = searchParams.venue_categories.filter((category) => { return category !== category_name })
    } else {
      new_venue_categories = searchParams.venue_categories;
      new_venue_categories.push(category_name);
    }
    setSearchParams((prev) => ({ ...prev, venue_categories: new_venue_categories }));
  }

  const handleCityChange = async (selectedCity) => {
    await fetchRegions(selectedCity.city_id);
    const city_name = selectedCity.city_name || "";
    let region_name = regionChanged || "";

    setSearchParams((prev) => ({ ...prev, city_name: city_name, region_name: region_name }));

    const queryParams = new URLSearchParams({ city_name, region_name }).toString();
    navigate(`?${queryParams}`);
  }

  const handleSearchMainFilterSearch = (selectedCity, selectedRegion) => {
    const city_name = selectedCity.city_name || "";
    const region_name = selectedRegion.region_name || "";

    setSearchParams((prev) => ({ ...prev, city_name: city_name, region_name: region_name }));

    const queryParams = new URLSearchParams({ city_name, region_name }).toString();
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
    fetchCategories();
    const params = urlSearchParamsToObject(queryParams);
    setSearchParams((prev) => ({ ...prev, ...params }));
    if (params.city_id != undefined) {
      fetchRegions(params.city_id);
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


      <section className="pt-10">
        <div className="container">
          <div className="row">
            <div className="col-12 ">
              <div className="text-center mb-20">
                <h1 className="text-30 fw-600 text-blue-1 font-dancing-script">Find Your Dream Venue</h1>
              </div>
              {/* End text-center */}
              <MainFilterSearchBox setSelectedCity={setSelectedCity} selectedCity={selectedCity} searchParams={searchParams} cities={cities}
                regions={regions} handleCityChange={handleCityChange} handleSearchMainFilterSearch={handleSearchMainFilterSearch} />
            </div>
            {/* End col-12 */}
          </div>
        </div>
      </section>
      {/* Top SearchBanner */}

      <section className="layout-pt-sm layout-pb-sm">
        <div className="container">
          <div className="row y-gap-30">
            <div className="col-xl-3">
              <aside className="sidebar y-gap-20 xl:d-none">
                <Sidebar onFilterChange={onFilterChange} searchParams={searchParams} allCategories={allCategories} handleCategoryDropDownChange={handleCategoryDropDownChange} />
              </aside>
              {/* End sidebar for desktop */}

              <div
                className="offcanvas offcanvas-start"
                tabIndex="-1"
                id="listingSidebar"
              >
                <div className="offcanvas-header">
                  <h5 className="offcanvas-title" id="offcanvasLabel">
                    Filter Venues
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
                    <Sidebar onFilterChange={onFilterChange} searchParams={searchParams} allCategories={allCategories} handleCategoryDropDownChange={handleCategoryDropDownChange} />
                  </aside>
                </div>
                {/* End offcanvas body */}
              </div>
              {/* End mobile menu sidebar */}
            </div>
            {/* End col */}

            <div className="col-xl-9 ">
              <TopHeaderFilter totalResult={venues?.totalResults || 0} regionName={venues?.region_name} />
              <div className="mt-0"></div>
              {/* End mt--30 */}
              <div className="row y-gap-5">
                <HotelProperties venues={venues} />
              </div>
              {/* End .row */}
              <Pagination totalPages={venues?.totalPages} setSearchParams={setSearchParams} />
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

      <DefaultFooter footerType={"venue"} />
    </>
  );
};

export default HotelListPage1;
