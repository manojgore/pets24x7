import { isAdminLoggedIn } from "@/utils/DOMUtils";

const data = [
  {
    title: "Pending Bookings",
    dataKey: "Pending",
    description: "",
    icon: "/img/dashboard/icons/1.svg",
  },
  {
    title: "In-Progress Bookings",
    dataKey: "In Progress",
    description: "",
    icon: "/img/dashboard/icons/4.svg",
  },
  {
    title: "Confirmed Bookings",
    dataKey: "Confirmed",
    description: "",
    icon: "/img/dashboard/icons/3.svg",
  },
  {
    title: "Cancelled Bookings",
    dataKey: "Cancelled",
    description: "",
    icon: "/img/dashboard/icons/2.svg",
  },
];

const adminCard = [{
  title: "Venues",
  dataKey: "venues",
  description: "",
  icon: "/img/dashboard/icons/2.svg",
},
{
  title: "Vendors",
  dataKey: "vendors",
  description: "",
  icon: "/img/dashboard/icons/2.svg",
},
{
  title: "Services",
  dataKey: "services",
  description: "",
  icon: "/img/dashboard/icons/2.svg",
},
{
  title: "Users",
  dataKey: "user",
  description: "",
  icon: "/img/dashboard/icons/2.svg",
},
{
  title: "Business Claims",
  dataKey: "business_claims",
  description: "",
  icon: "/img/dashboard/icons/2.svg",
},
{
  title: "Services",
  dataKey: "services",
  description: "",
  icon: "/img/dashboard/icons/2.svg",
},
{
  title: "Regions",
  dataKey: "region",
  description: "",
  icon: "/img/dashboard/icons/2.svg",
},
{
  title: "Cities",
  dataKey: "city",
  description: "",
  icon: "/img/dashboard/icons/2.svg",
}
];

const getCount = (item,stateCount) => {
  const foundObject = stateCount.find((state)=>{ return state.status === item.dataKey });
  return  foundObject?.count || "0";
}

const getAdminCardCount = (item,adminCardData) => {
  return adminCardData[item.dataKey] || "0";
}

const DashboardCard = ({stateCount=[], adminCardData}) => {
  return (
    <div className="row y-gap-30">
      {data.map((item, index) => (
        <div key={index} className="col-xl-3 col-md-6">
          <div className="py-30 px-30 rounded-4 bg-white shadow-3">
            <div className="row y-gap-20 justify-between items-center">
              <div className="col-auto">
                <div className="fw-500 lh-14">{item.title}</div>
                <div className="text-26 lh-16 fw-600 mt-5">{getCount(item,stateCount)}</div>
                <div className="text-15 lh-14 text-light-1 mt-5">
                  {item.description}
                </div>
              </div>
              
            </div>
          </div>
        </div>
      ))}
      {isAdminLoggedIn() && adminCard.map((item, index) => (
        <div key={index} className="col-xl-3 col-md-6">
          <div className="py-30 px-30 rounded-4 bg-white shadow-3">
            <div className="row y-gap-20 justify-between items-center">
              <div className="col-auto">
                <div className="fw-500 lh-14">{item.title}</div>
                <div className="text-26 lh-16 fw-600 mt-5">{getAdminCardCount(item,adminCardData)}</div>
                <div className="text-15 lh-14 text-light-1 mt-5">
                  {item.description}
                </div>
              </div>
              
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DashboardCard;
