import React from "react";
import DashboardPage from "../../../../components/dashboard/vendor-dashboard/recovery";

import MetaComponent from "@/components/common/MetaComponent";

const metadata = {
  title: "Vendor Recovery | WedEazzy - Your Dream Wedding Partner",
  description: "WedEazzy - Your Dream Wedding Partner",
};

export default function BDVendorRecovery() {
  return (
    <>
      <MetaComponent meta={metadata} />
      <DashboardPage />
    </>
  );
}
