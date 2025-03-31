import React, { useEffect } from "react";
import AddVendor from "../../../../components/dashboard/admin-dashboard/add-vendor";

import MetaComponent from "@/components/common/MetaComponent";
import { useNavigate } from "react-router-dom";

const metadata = {
  title: "Admin Add Vendor | WedEazzy - Your Dream Wedding Partner",
  description: "WedEazzy - Your Dream Wedding Partner",
};

const allowedUser = ["admin", "vendor-user"];
export default function AdminAddVendor() {
  const navigate = useNavigate();
  useEffect(()=>{
    if (!allowedUser.includes(localStorage.getItem("role"))) {
      navigate("/");
    }
  })
  return (
    <>
      <MetaComponent meta={metadata} />
      <AddVendor />
    </>
  );
}
