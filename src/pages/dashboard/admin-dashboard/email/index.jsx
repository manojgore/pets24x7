import React, { useEffect } from "react";
import MetaComponent from "@/components/common/MetaComponent";
import { useNavigate } from "react-router-dom";
import EmailTable from "../../../../components/dashboard/admin-dashboard//email";

const metadata = {
  title: "Email | WedEazzy - Your Dream Wedding Partner",
  description: "WedEazzy - Your Dream Wedding Partner",
};

export default function Email() {
  const navigate = useNavigate();
  useEffect(()=>{
    if (localStorage.getItem("role") !== "admin") {
      navigate("/")
    }
  })
  return (
    <>
      <MetaComponent meta={metadata} />
      <EmailTable />
    </>
  );
}
