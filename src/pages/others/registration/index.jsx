import CallToActions from "@/components/common/CallToActions";
import DefaultFooter from "@/components/footer/default";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import MetaComponent from "@/components/common/MetaComponent";
import Header1 from "@/components/header/header-1";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { api } from "@/utils/apiProvider";
import { showAlert } from "@/utils/isTextMatched";
import EmailVerify from "@/components/email-verify/EmailVerify";

const metadata = {
  title: "Registration | WedEazzy - Your Dream Wedding Partner",
  description: "WedEazzy - Your Dream Wedding Partner",
};

const cardTabs = [
  { id: 1, name: "Venue Registration" },
  { id: 2, name: "Vendor Registration" },
];

const Registration = () => {
  const [itemsTabs, setItemsTabs] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    role: "user",
    password: "",
    service_name: "Service",
    city_name: "City",
    confirmPassword: ""
  });
  const navigate = useNavigate();
  const [passwordsMatch, setPasswordsMatch] = useState(true);
  const [condtion, setCondtion] = useState(false);
  const [cities, setCities] = useState([]);
  const [service, setService] = useState([]);
  const [isOtpVerified, setIsOtpVerified] = useState(false);

  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;

    if (name === "password") {
      if (value === formData.confirmPassword) {
        setPasswordsMatch(true);  // Passwords match
      } else {
        setPasswordsMatch(false); // Passwords don't match
      }
    }

    if (name === "confirmPassword") {
      if (value === formData.password) {
        setPasswordsMatch(true);  // Passwords match
      } else {
        setPasswordsMatch(false); // Passwords don't match
      }
    }

    if (name === "email" && isOtpVerified) {
      setIsOtpVerified(false);
    }

    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${api}/api/user/create-users`, {
        ...formData,
        role: itemsTabs === 1 ? "venue-user" : "vendor-user"
      });
      if (response.data.result !== 0) {
        setFormData({
          name: "",
          email: "",
          mobile: "",
          password: ""
        });
        showAlert("you have been registered !", "success");
        navigate("/business-login");
      } else {
        showAlert("Something went wrong", "danger");
      }
    } catch (error) {
      showAlert(error.response.data.error, "danger");
      console.error('Error:', error);
    }
  };

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

  const fetchServices = async () => {
    try {
      const response = await axios.get(`${api}/api/service/get-services`);
      if (response.data.success) {
        setService(response.data.results);
      }
    } catch (error) {
      console.log('failed to fetch the user');
      console.error(error);
    }
  };

  useEffect(() => {
    fetchCities();
    fetchServices();
  }, []);

  const handleDropDownChange = ({ name, value }) => {
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <>
      <MetaComponent meta={metadata} />
      <div className="header-margin"></div>

      <Header1 staticHeader={true} />

      <section className="layout-pt-lg layout-pb-lg bg-blue-2">
        <div className="container">
          <div className="row justify-center">
            <div className="col-xl-8 col-lg-7 col-md-9">
              <div className="px-50 py-50 sm:px-20 sm:py-20 bg-white shadow-4 rounded-4">
                <h1 className="text-22 fw-500">Join us, to make your wealth !</h1>
                <p className="mt-10">
                  Already have an account yet?{" "}
                  <Link to="/business-login" className="text-blue-1">
                    Login here
                  </Link>
                </p>
                <br></br>

                <Tabs>
                  <TabList className="row y-gap-20 x-gap-20">
                    {cardTabs.map((item) => (
                      <Tab
                        className="col-auto"
                        onClick={() => setItemsTabs(item.id)}
                        key={item.id}
                      >
                        <button
                          className={
                            itemsTabs === item.id
                              ? "button -dark-1 bg-blue-1 text-white px-20 py-15"
                              : "button -blue-1 bg-light-2 px-20 py-15"
                          }
                        >
                          {item.name}
                        </button>
                      </Tab>
                    ))}
                  </TabList>

                  <TabPanel>
				  <form className="row y-gap-20">
                    <div className="col-12">
                      <div className="form-input">
                        <input
                          type="text"
                          name="business_name"
                          onChange={handleChange}
                          required
                          value={formData.business_name}
                        />
                        <label className="lh-1 text-14 text-light-1">Business Name</label>
                      </div>
                    </div>

                    <div className="col-12">
                      <div className="form-input">
                        <input
                          type="text"
                          name="name"
                          onChange={handleChange}
                          required
                          value={formData.name}
                        />
                        <label className="lh-1 text-14 text-light-1">Full Name</label>
                      </div>
                    </div>

                    <EmailVerify
                      handleChange={handleChange}
                      formData={formData}
                      setIsOtpVerified={setIsOtpVerified}
                    />

                    <div className="col-12">
                      <div className="form-input">
                        <input
                          type="text"
                          name="mobile"
                          onChange={handleChange}
                          required
                          value={formData.mobile}
                        />
                        <label className="lh-1 text-14 text-light-1">Mobile No</label>
                      </div>
                    </div>

                    <div className="col-12">
                      <div className="form-input">
                        <input
                          type="password"
                          onChange={handleChange}
                          name="password"
                          value={formData.password}
                          required
                        />
                        <label className="lh-1 text-14 text-light-1">Password</label>
                      </div>
                    </div>

                    <div className="col-12">
                      <div className="form-input">
                        <input
                          type="password"
                          onChange={handleChange}
                          name="confirmPassword"
                          value={formData.confirmPassword}
                          required
                        />
                        <label className="lh-1 text-14 text-light-1">Confirm Password</label>
                      </div>
                      {!passwordsMatch && (
                        <div className="text-15 lh-15 text-light-1 ml-10">
                          Password must be same.
                        </div>
                      )}
                    </div>

                    <div className="col-12">
                      <div className="d-flex">
                        <div className="form-checkbox mt-5">
                          <input
                            type="checkbox"
                            onChange={(e) => { setCondtion(e.target.checked); }}
                            name="condition"
                            value={condtion}
                          />
                          <div className="form-checkbox__mark">
                            <div className="form-checkbox__icon icon-check" />
                          </div>
                        </div>
                        <div className="text-15 lh-15 text-light-1 ml-10">
                          Email me exclusive Agoda promotions. I can opt out later as stated
                          in the Privacy Policy.
                        </div>
                      </div>
                    </div>

                    <div className="col-12">
                      <button
                        type="submit"
                        disabled={!(passwordsMatch && condtion && isOtpVerified)}
                        className="button py-20 -dark-1 bg-blue-1 text-white w-100"
                        onClick={handleSubmit}
                      >
                        Sign Up <div className="icon-arrow-top-right ml-15" />
                      </button>
                    </div>
					</form>
                  </TabPanel>

                  <TabPanel>
                    <form className="row y-gap-20">
                      <div className="col-12">
                        <div className="form-input">
                          <input
                            type="text"
                            name="business_name"
                            onChange={handleChange}
                            required
                            value={formData.business_name}
                          />
                          <label className="lh-1 text-14 text-light-1">Business Name</label>
                        </div>
                      </div>

                      <div className="col-12">
                        <div className="form-input">
                          <input
                            type="text"
                            name="name"
                            onChange={handleChange}
                            required
                            value={formData.name}
                          />
                          <label className="lh-1 text-14 text-light-1">Full Name</label>
                        </div>
                      </div>

                      <EmailVerify
                        handleChange={handleChange}
                        formData={formData}
                        setIsOtpVerified={setIsOtpVerified}
                      />

                      <div className="col-12">
                        <div className="form-input">
                          <input
                            type="text"
                            name="mobile"
                            onChange={handleChange}
                            required
                            value={formData.mobile}
                          />
                          <label className="lh-1 text-14 text-light-1">Mobile No</label>
                        </div>
                      </div>

                      <div className="col-12">
                        <div className="form-input" style={{ border: "1px solid #ccc", borderRadius: "4px", padding: "8px" }}>
                          <div className="dropdown js-dropdown js-services-active w-100">
                            <div
                              className="dropdown__button d-flex items-center justify-between bg-white rounded-4 w-100 text-14 px-20 h-50 text-14"
                              data-bs-toggle="dropdown"
                              data-bs-auto-close="true"
                              aria-expanded="false"
                              data-bs-offset="0,10"
                            >
                              <span className="js-dropdown-title">{formData.city_name}</span>
                              <i className="icon icon-chevron-sm-down text-7 ml-10" />
                            </div>
                            <div className="toggle-element -dropdown w-100 dropdown-menu">
                              <div className="text-14 y-gap-15 js-dropdown-list">
                                {cities.map((option, index) => (
                                  <div
                                    key={index}
                                    name="city_name"
                                    className={`${
                                      formData.city_name === option.city_name ? "text-blue-1" : ""
                                    } js-dropdown-link`}
                                    onClick={(event) => { handleDropDownChange({ name: "city_name", value: event.target.textContent }); }}
                                  >
                                    {option.city_name}
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="col-12">
                        <div className="form-input" style={{ border: "1px solid #ccc", borderRadius: "4px", padding: "8px" }}>
                          <div className="dropdown js-dropdown js-services-active w-100">
                            <div
                              className="dropdown__button d-flex items-center justify-between bg-white rounded-4 w-100 text-14 px-20 h-50 text-14"
                              data-bs-toggle="dropdown"
                              data-bs-auto-close="true"
                              aria-expanded="false"
                              data-bs-offset="0,10"
                            >
                              <span className="js-dropdown-title">{formData.service_name}</span>
                              <i className="icon icon-chevron-sm-down text-7 ml-10" />
                            </div>
                            <div className="toggle-element -dropdown w-100 dropdown-menu">
                              <div className="text-14 y-gap-15 js-dropdown-list">
                                {service.map((option, index) => (
                                  <div
                                    key={index}
                                    name="service_name"
                                    className={`${
                                      formData.service_name === option.name ? "text-blue-1" : ""
                                    } js-dropdown-link`}
                                    onClick={(event) => { handleDropDownChange({ name: "service_name", value: event.target.textContent }); }}
                                  >
                                    {option.name}
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="col-12">
                        <button
                          type="submit"
                          disabled={!(passwordsMatch && condtion && isOtpVerified)}
                          className="button py-20 -dark-1 bg-blue-1 text-white w-100"
                          onClick={handleSubmit}
                        >
                          Sign Up <div className="icon-arrow-top-right ml-15" />
                        </button>
                      </div>
                    </form>
                  </TabPanel>
                </Tabs>
              </div>
            </div>
          </div>
        </div>
      </section>

      <CallToActions />
      <DefaultFooter />
    </>
  );
};

export default Registration;
