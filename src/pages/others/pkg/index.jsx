import { useState, useEffect } from "react";
import axios from "axios";
import Header1 from "@/components/header/header-1";
import DefaultFooter from "@/components/footer/default";
import CallToActions from "@/components/common/CallToActions";
import MetaComponent from "@/components/common/MetaComponent";
import { api } from "@/utils/apiProvider";
import "@/styles/modals.css";

const metadata = {
  title: "Packages | WedEazzy - Your Dream Wedding Partner",
  description: "Explore our curated wedding packages tailored to your needs.",
};

const Package = () => {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const response = await axios.get(`${api}/api/package/get-packages`);
        if (response.data.success) {
          setPackages(response.data.results);
        } else {
          setError("Failed to fetch packages.");
        }
      } catch (err) {
        setError("An error occurred while fetching packages.");
      } finally {
        setLoading(false);
      }
    };

    fetchPackages();
  }, []);

  return (
    <>
      <MetaComponent meta={metadata} />
      <div className="header-margin"></div>

      <Header1 staticHeader={true} />

      <section className="section-bg">
        <div className="container">
          <div className="row justify-center text-center">
            <div className="col-xl-6 col-lg-8 col-md-10">
              <h1 className="text-40 md:text-25 fw-600 font-dancing-script">
                Our Wedding Packages
              </h1>
              <p className="mt-15">
                Find the perfect wedding package that suits your dream event.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="layout-pt-lg layout-pb-lg">
        <div className="container">
          <div className="row y-gap-30 justify-center">
            {loading ? (
              <p>Loading packages...</p>
            ) : error ? (
              <p className="text-red-1">{error}</p>
            ) : packages.length === 0 ? (
              <p>No packages available.</p>
            ) : (
              packages.map((pkg) => {
                const discount =
                  pkg.original_price && pkg.package_price
                    ? Math.round(
                        ((pkg.original_price - pkg.package_price) /
                          pkg.original_price) *
                          100
                      )
                    : 0;

                return (
                  <div key={pkg.package_id} className="col-lg-4 col-md-6">
                    <div className={`package-card `}>
                      {pkg.is_featured && (
                        <div className="package-card__badge">
                          ⭐ Recommended
                        </div>
                      )}
                      <img
                        src={
                          pkg.package_image
                            ? JSON.parse(pkg.package_image)[0]
                            : "/img/placeholder.jpg"
                        }
                        alt={pkg.package_name}
                        className="package-card__img"
                      />
                      <div className="package-card__content">
                        <h3 className="package-card__title">{pkg.package_name}</h3>
                        {/* Display description with HTML formatting */}
                        <div
                          className="package-card__description"
                          dangerouslySetInnerHTML={{ __html: pkg.package_description }}
                        />
                        <div className="package-card__footer">
                          <div className="package-card__pricing">
                            <span className="package-card__price">₹ {pkg.package_price}</span>
                            {pkg.original_price && (
                              <span className="package-card__original-price">
                                ₹ {pkg.original_price}
                              </span>
                            )}
                            {discount > 0 && (
                              <span className="package-card__discount">
                                {discount}% OFF
                              </span>
                            )}
                          </div>
                          <button className="button bg-blue-1 text-white">
                            Buy Now
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </section>

      <CallToActions />

      <DefaultFooter />
    </>
  );
};

export default Package;
