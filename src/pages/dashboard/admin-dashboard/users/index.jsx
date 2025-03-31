import React, { useEffect } from "react";

import MetaComponent from "@/components/common/MetaComponent";
import { useNavigate } from "react-router-dom";
import UserTable from "@/components/dashboard/admin-dashboard/users";

const metadata = {
  title: "Users | WedEazzy - Your Dream Wedding Partner",
  description: "WedEazzy - Your Dream Wedding Partner",
};
const allowedUser = ["admin"];

export default function Users() {
  const navigate = useNavigate();
  useEffect(()=>{
    if (!allowedUser.includes(localStorage.getItem("role"))) {
      navigate("/");
    }
  })
  return (
    <>
      <MetaComponent meta={metadata} />
      <UserTable />
    </>
  );
}
