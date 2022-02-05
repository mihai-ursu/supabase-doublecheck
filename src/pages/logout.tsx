import { useEffect } from "react";
import { supabase } from "../utils/supabase";
import Router from "next/router";

const Logout = () => {
  useEffect(() => {
    const logout = async () => {
      supabase.auth.signOut();
      Router.push("/");
    };
    logout();
  }, []);

  return <div>Logging Out</div>;
};

export default Logout;
