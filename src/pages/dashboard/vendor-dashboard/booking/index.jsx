import React from "react";
import DashboardPage from "../../../../components/dashboard/vendor-dashboard/booking";

import MetaComponent from "@/components/common/MetaComponent";

const metadata = {
  title: "Vendor History | WedEazzy - Your Dream Wedding Partner",
  description: "WedEazzy - Your Dream Wedding Partner",
};

export default function VendorBooking() {
  return (
    <>
      <MetaComponent meta={metadata} />
      <DashboardPage />
    </>
  );
}
