import React, { useEffect } from "react";
import CityTable from "../../../../components/dashboard/admin-dashboard/city";

import MetaComponent from "@/components/common/MetaComponent";
import { useNavigate } from "react-router-dom";

const metadata = {
  title: "City | WedEazzy - Your Dream Wedding Partner",
  description: "WedEazzy - Your Dream Wedding Partner",
};

export default function City() {
  const navigate = useNavigate();
  useEffect(()=>{
    if (localStorage.getItem("role") !== "admin") {
      navigate("/")
    }
  })
  return (
    <>
      <MetaComponent meta={metadata} />
      <CityTable />
    </>
  );
}
