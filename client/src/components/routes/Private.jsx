import { useState, useEffect } from "react";
import { useAuth } from "../../context/Auth";
import { Outlet } from "react-router-dom";
import axios from "axios";
import Spinner from "./Spinner";

export default function PrivateRoute() {
  const API_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8080';
  const [ok, setOk] = useState(false);
  const [auth, setAuth] = useAuth();
  let agree=false;

  useEffect(() => {
    const authCheck = async () => {
        const res = await fetch(`${API_URL}/api/v1/auth/test`, {
            method: "GET",
            headers: {
              "Authorization": `${auth?.token}`
            }
          });
      if (res.ok) {
          setOk((f)=> !f);
          agree=true;
          setOk(agree);
          console.log(ok);
        console.log(auth?.token);

      } else {
        setOk(false);
      }
    };
    if (auth?.token) authCheck();
  }, [auth?.token]);

  return ok ? <Outlet /> : <Spinner/>;
}