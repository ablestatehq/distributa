import { useState } from "react";
import AuthContext from "../../contexts/Auth";

function Auth({ children }) {
  const [user, setUser] = useState(null);
  const [session, setSession] = useState(null);
  const values = {
    user,
    session,
    setUser,
    setSession,
  };

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
}

export default Auth;
