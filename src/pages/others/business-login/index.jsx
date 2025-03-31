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

const metadata = {
  title: "Business Login | WedEazzy - Your Dream Wedding Partner",
  description: "WedEazzy - Your Dream Wedding Partner",
};

const cardTabs = [
	{ id: 1, name: "Venue Login" },
	{ id: 2, name: "Vendor Login" },
];
const Business_Login = () => {
	const [itemsTabs, setItemsTabs] = useState(1);
	const [formData, setFormData] = useState({
    email:"",
    password:"",
  });
  const navigate = useNavigate();
  const [condtion, setCondtion] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevState) => ({
        ...prevState,
        [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const response = await axios.post(`${api}/api/auth/login`, {
          ...formData,
          role: itemsTabs==1 ? "venue-user" : "vendor-user"
        });  
        if (response.status === 200) {
            // showAlert('expenses added');
            setFormData({
              password:"",
              email:"",
            });
            itemsTabs==1 ? localStorage.setItem("venue-userId",response.data.userDate.user_id) : localStorage.setItem("vendor-userId",response.data.userDate.user_id)
            localStorage.setItem("role",response.data.userDate.role);
            showAlert("Welcome to Dashboard","success");
            navigate("/admin-dashboard/dashboard");
        } else {
          showAlert(response.data.error,"danger");
          // showAlert('something went wrong');
        }
    } catch (error) {
        showAlert(error?.response?.data?.error,"danger");
        console.error('Error:', error);
    }
  }; 

  return (
    <>
    <MetaComponent meta={metadata} />
    {/* End Page Title */}

    <div className="header-margin"></div>
    {/* header top margin */}

    <Header1 staticHeader={true}/>
    {/* End Header 1 */}

    <section className="layout-pt-lg layout-pb-lg bg-blue-2">
    <div className="container">
        <div className="row justify-center">
          <div className="col-xl-6 col-lg-7 col-md-9">
            <div className="px-50 py-50 sm:px-20 sm:py-20 bg-white shadow-4 rounded-4">
            <h1 className="text-22 fw-500">Welcome back</h1>
            <p className="mt-10">
              Don&apos;t have an account yet?{" "}
              <Link to="/registration" className="text-blue-1">
                Sign up for free
              </Link>
            </p><br></br>
             
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
              {/* End tablist */}

              <TabPanel><br></br>
                <form className="row y-gap-20" onSubmit={handleSubmit}>
                  <div className="col-12">
                    <div className="form-input ">
                      <input type="text" name="email" onChange={handleChange} required value={formData.email}/>
                      <label className="lh-1 text-14 text-light-1">Email</label>
                    </div>
                  </div>
                  {/* End .col */}

                  <div className="col-12">
                    <div className="form-input ">
                      <input type="password" onChange={handleChange} name="password" value={formData.password} required />
                      <label className="lh-1 text-14 text-light-1">Password</label>
                    </div>
                  </div>
                  {/* End .col */}

                  <div className="col-12">
                    <a href="#" className="text-14 fw-500 text-blue-1 underline">
                      Forgot your password?
                    </a>
                  </div>
                  {/* End .col */}

                  <div className="col-12">
                    <button
                      type="submit"
                      href="#"
                      className="button py-20 -dark-1 bg-blue-1 text-white w-100"
                    >
                      Login <div className="icon-arrow-top-right ml-15" />
                    </button>
                  </div>
                  {/* End .col */}
                </form>
              </TabPanel>
              {/* credit debit info */}

              <TabPanel><br></br>
              <form className="row y-gap-20" onSubmit={handleSubmit}>
                  <div className="col-12">
                    <div className="form-input ">
                      <input type="text" name="email" onChange={handleChange} required value={formData.email}/>
                      <label className="lh-1 text-14 text-light-1">Email</label>
                    </div>
                  </div>
                  {/* End .col */}
    
                  <div className="col-12">
                    <div className="form-input ">
                      <input type="password" onChange={handleChange} name="password" value={formData.password} required />
                      <label className="lh-1 text-14 text-light-1">Password</label>
                    </div>
                  </div>
                  {/* End .col */}

                  <div className="col-12">
                    <a href="#" className="text-14 fw-500 text-blue-1 underline">
                      Forgot your password?
                    </a>
                  </div>
                  {/* End .col */}

                  <div className="col-12">
                    <button
                      type="submit"
                      href="#"
                      className="button py-20 -dark-1 bg-blue-1 text-white w-100"
                    >
                      Login <div className="icon-arrow-top-right ml-15" />
                    </button>
                  </div>
                  {/* End .col */}
                </form>
                {/* End mt60 */}
              </TabPanel>
              {/* End digital payment */}
            </Tabs>
              {/* End .row */}
            </div>
          </div>
        </div>
      </div>
      
    </section>
    {/* End login section */}

    <CallToActions />
    {/* End Call To Actions Section */}

    <DefaultFooter />
    {/* End Call To Actions Section */}
  </>
);
};

export default Business_Login;

