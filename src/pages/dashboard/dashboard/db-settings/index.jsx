import React from "react";
import DashboardPage from "../../../../components/dashboard/dashboard/db-settings";

import MetaComponent from "@/components/common/MetaComponent";

const metadata = {
  title: "Settings | WedEazzy - Your Dream Wedding Partner",
  description: "WedEazzy - Your Dream Wedding Partner",
};

export default function DBSettings() {
  return (
    <>
      <MetaComponent meta={metadata} />
      <DashboardPage />
    </>
  );
}
