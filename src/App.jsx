import Aos from "aos";
import { useEffect } from "react";
import SrollTop from "./components/common/ScrollTop";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/scrollbar";
import "swiper/css/effect-cards";
import "aos/dist/aos.css";
import "./styles/index.scss";
import { Provider } from "react-redux";
import { store } from "./store/store";

if (typeof window !== "undefined") {
  import("bootstrap");
}
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ScrollTopBehaviour from "./components/common/ScrollTopBehaviour";
import Home from "./pages";
import Home_1 from "./pages/homes/home_1";
import BlogListV1 from "./pages/blogs/blog-list-v1";
import BlogSingleDynamic from "./pages/blogs/blog-details";
import NotFoundPage from "./pages/not-found";
import About from "./pages/others/about";
import BecomeExpert from "./pages/others/become-expert";
import HelpCenter from "./pages/others/help-center";
import LogIn from "./pages/others/login";
import SignUp from "./pages/others/signup";
import Terms from "./pages/others/terms";
import Privacy from "./pages/others/privacy";
import Invoice from "./pages/others/invoice";
import DBDashboard from "./pages/dashboard/dashboard/db-dashboard";
import DBBooking from "./pages/dashboard/dashboard/db-booking";
import DBWishlist from "./pages/dashboard/dashboard/db-wishlist";
import DBSettings from "./pages/dashboard/dashboard/db-settings";
import VendorAddHotel from "./pages/dashboard/vendor-dashboard/add-hotel";
import VendorBooking from "./pages/dashboard/vendor-dashboard/booking";
import BVVendorHotel from "./pages/dashboard/vendor-dashboard/hotels";
import BDVendorRecovery from "./pages/dashboard/vendor-dashboard/recovery";
import VendorDashboard from "./pages/dashboard/vendor-dashboard/dashboard";
import HotelListPage1 from "./pages/hotel/hotel-list-v1";
import HotelSingleV1Dynamic from "./pages/hotel/hotel-single-v1";
import BookingPage from "./pages/hotel/booking-page";
import Contact from "./pages/others/contact";
import Booking from "./pages/booking";
import Destinations from "./pages/others/destinations";
import AdminDashboard from "./pages/dashboard/admin-dashboard/dashboard";
import AdminAddVenue from "./pages/dashboard/admin-dashboard/add-venue";
import AdminBooking from "./pages/dashboard/admin-dashboard/booking";
import BVAdminHotel from "./pages/dashboard/admin-dashboard/hotels";
import BDAdminRecovery from "./pages/dashboard/admin-dashboard/recovery";
import Registration from "./pages/others/registration";
import Business_Login from "./pages/others/business-login";
import City from "./pages/dashboard/admin-dashboard/city";
import Service from "./pages/dashboard/admin-dashboard/services";
import ClaimedBusiness from "./pages/dashboard/admin-dashboard/claim-business";
import Regions from "./pages/dashboard/admin-dashboard/region";
import Category from "./pages/dashboard/admin-dashboard/category";
import Users from "./pages/dashboard/admin-dashboard/users";
import AdminAddUser from "./pages/dashboard/admin-dashboard/add-user";
import Venue from "./pages/dashboard/admin-dashboard/venue";
import AdminAddVendor from "./pages/dashboard/admin-dashboard/add-vendor";
import VendorsListing from "./pages/hotel/vendors-listing";
import VendorSingle from "./pages/hotel/vendor-single";
import Vendors from "./pages/dashboard/admin-dashboard/vendors";
import Packages from "./pages/dashboard/admin-dashboard/packages";
import Package from "./pages/others/pkg";
import Email from "./pages/dashboard/admin-dashboard/email";
import TawkToChat from "./components/twak/TawkToChat";

function App() {
  useEffect(() => {
    Aos.init({
      duration: 1200,
      once: true,
    });
  }, []);

  return (
    <main>
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route path="/">
              <Route index element={<Home />} />
              <Route path="home" element={<Home_1 />} />
              <Route path="tawk" element={<TawkToChat />} />

              <Route path="blog" element={<BlogListV1 />} />
              <Route path="blog-details/:id" element={<BlogSingleDynamic />} />

              <Route path="*" element={<NotFoundPage />} />

              <Route path="about" element={<About />} />
              <Route path="package" element={<Package />} />
              <Route path="become-expert" element={<BecomeExpert />} />
              <Route path="help-center" element={<HelpCenter />} />
              <Route path="signup" element={<SignUp />} />
              <Route path="login" element={<LogIn role={"user"} />} />
              <Route path="admin-login" element={<LogIn role={"admin"} />} />
              <Route path="registration" element={<Registration />} />
              <Route path="business-login" element={<Business_Login />} />
              <Route path="terms" element={<Terms />} />
              <Route path="privacy" element={<Privacy />} />
              <Route path="invoice" element={<Invoice />} />
              <Route path="contact" element={<Contact />} />
              <Route path="booking" element={<Booking />} />
              <Route path="destinations" element={<HotelListPage1 />} />

              <Route path="admin-dashboard">
                <Route path="dashboard" element={<AdminDashboard />} />
                <Route path="categories" element={<Category />} />
                <Route path="city" element={<City />} />
                <Route path="mail" element={<Email />} />
                <Route path="packages" element={<Packages />} />
                <Route path="services" element={<Service />} />
                <Route path="claim-business" element={<ClaimedBusiness />} />
                <Route path="regions" element={<Regions />} />
                <Route path="users" element={<Users />} />
                <Route path="user/:mode" element={<AdminAddUser />} />
                <Route path="venues" element={<Venue />} />
                <Route path="venue/:mode" element={<AdminAddVenue />} />
                <Route path="vendors" element={<Vendors />} />
                <Route path="vendor/:mode" element={<AdminAddVendor />} />
                <Route path="booking" element={<AdminBooking />} />
                <Route path="hotels" element={<BVAdminHotel />} />
                <Route path="recovery" element={<BDAdminRecovery />} />
                <Route path="settings" element={<DBSettings />} />
              </Route>

              <Route path="dashboard">
                <Route path="db-dashboard" element={<DBDashboard />} />
                <Route path="db-booking" element={<DBBooking />} />
                <Route path="db-wishlist" element={<DBWishlist />} />
                <Route path="db-settings" element={<DBSettings />} />
              </Route>

              <Route path="vendor-dashboard">
                <Route path="dashboard" element={<VendorDashboard />} />
                <Route path="add-hotel" element={<VendorAddHotel />} />
                <Route path="booking" element={<VendorBooking />} />
                <Route path="hotels" element={<BVVendorHotel />} />
                <Route path="venues" element={<Venue />} />
                <Route path="recovery" element={<BDVendorRecovery />} />
              </Route>

              <Route path="venues" element={<HotelListPage1 />} />
              <Route path="vendors" element={<VendorsListing />} />

              <Route path="venue/:city/:region/:id" element={<HotelSingleV1Dynamic />} />
              <Route path="vendor/:city/:region/:id" element={<VendorSingle />} />
              <Route path="booking-page" element={<BookingPage />} />

            </Route>
          </Routes>
          <ScrollTopBehaviour />
        </BrowserRouter>

        <SrollTop />
      </Provider>
    </main>
  );
}

export default App;
