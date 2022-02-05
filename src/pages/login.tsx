import { useEffect } from "react";
import { supabase } from "../utils/supabase";

const Login = () => {
  useEffect(() => {
    supabase.auth.signIn({
      provider: "github",
    });
  }, []);

  return <div>Logging In</div>;
};

export default Login;
