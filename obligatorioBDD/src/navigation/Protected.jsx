import { Navigate, Outlet } from "react-router-dom";

const Protected = () => {
  //const token = localStorage.getItem("token");

  return false ? <Outlet /> : <Navigate to="/" />;
};

export default Protected;
