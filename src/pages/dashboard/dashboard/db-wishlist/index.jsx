import React from "react";
import DashboardPage from "../../../../components/dashboard/dashboard/db-wishlist";

import MetaComponent from "@/components/common/MetaComponent";

const metadata = {
  title: "Wishlist | WedEazzy - Your Dream Wedding Partner",
  description: "WedEazzy - Your Dream Wedding Partner",
};

export default function DBWishlist() {
  return (
    <>
      <MetaComponent meta={metadata} />
      <DashboardPage />
    </>
  );
}
