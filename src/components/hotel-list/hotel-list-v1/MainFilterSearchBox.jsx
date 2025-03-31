import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { api } from "@/utils/apiProvider";
import RegionSearch from "@/components/hotel-list/hotel-list-v1/RegionSearch";
import LocationSearch from "@/components/hotel-list/hotel-list-v1/LocationSearch";


const MainFilterSearchBox = ({ cities, regions, selectedCity, setSelectedCity, searchParams, handleCityChange, handleSearchMainFilterSearch }) => {

  const [searchCity, setSearchCity] = useState("");

  const [searchRegion, setSearchRegion] = useState("");
  const [selectedRegion, setselectedRegion] = useState(null);

  useEffect(() => {
    setSearchCity("");
    setSearchRegion("");
    setselectedRegion(null);
  }, [regions])


  return (
    <>
      <div className="mainSearch -col-3-big bg-white px-10 lg:px-10 lg:pt-0 rounded-4 shadow">
        <div className="button-grid">
          <LocationSearch
            cities={cities}
            searchCity={searchCity || searchParams.city_name || ""}
            setSearchCity={setSearchCity}
            selectedCity={selectedCity}
            setSelectedCity={setSelectedCity}
            setSearchRegion={setSearchRegion}
            setselectedRegion={setselectedRegion}
            handleCityChange={handleCityChange}
          />
          <RegionSearch
            regions={regions}
            searchRegion={searchRegion || searchParams.region_name || ""}
            setSearchRegion={setSearchRegion}
            selectedRegion={selectedRegion}
            setselectedRegion={setselectedRegion}
          />
          <div className="button-item h-full">
            <button className="button -dark-1 py-15 fw-600 px-40 h-full col-12 rounded-1 bg-blue-1 text-white"
              onClick={() => handleSearchMainFilterSearch(selectedCity, selectedRegion)}>
              <i className="icon-search text-20 mr-10" />
              Search
            </button>
          </div>
        </div>
      </div>


      {/* <div className="mainSearch -col-3-big bg-white px-10 lg:px-10 lg:pt-5 rounded-4 mt-10 shadow">
        <div className="button-grid items-center d-flex justify-between">
          <LocationSearch
            cities={cities}
            searchCity={searchCity || searchParams.city_name || ""}
            setSearchCity={setSearchCity}
            selectedCity={selectedCity}
            setSelectedCity={setSelectedCity}
            setSearchRegion={setSearchRegion}
            setselectedRegion={setselectedRegion}
            handleCityChange={handleCityChange}
          />
          <RegionSearch
            regions={regions}
            searchRegion={searchRegion || searchParams.region_name || ""}
            setSearchRegion={setSearchRegion}
            selectedRegion={selectedRegion}
            setselectedRegion={setselectedRegion}
          />
          <div className="button-item h-full">
            <button className="button -dark-1 py-15 fw-600 px-40 h-full col-12 rounded-0 bg-blue-1 text-white" onClick={() => { handleSearchMainFilterSearch(selectedCity, selectedRegion) }}>
              <i className="icon-search text-20 mr-10" />
              Search
            </button>
          </div>
        </div>
      </div> */}
    </>
  );
};

export default MainFilterSearchBox;
