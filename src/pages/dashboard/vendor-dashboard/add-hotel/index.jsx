import React from "react";
import DashboardPage from "../../../../components/dashboard/vendor-dashboard/add-hotel";

import MetaComponent from "@/components/common/MetaComponent";

const metadata = {
  title: "Vendor Add Hotel | WedEazzy - Your Dream Wedding Partner",
  description: "WedEazzy - Your Dream Wedding Partner",
};

export default function VendorAddHotel() {
  return (
    <>
      <MetaComponent meta={metadata} />
      <DashboardPage />
    </>
  );
}
