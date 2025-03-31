import React from "react";
import DashboardPage from "../../../../components/dashboard/dashboard/db-dashboard";

import MetaComponent from "@/components/common/MetaComponent";

const metadata = {
  title: "Dashboard | WedEazzy - Your Dream Wedding Partner",
  description: "WedEazzy - Your Dream Wedding Partner",
};

export default function DBDashboard() {
  return (
    <>
      <MetaComponent meta={metadata} />
      <DashboardPage />
    </>
  );
}
