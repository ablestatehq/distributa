import { useState, useEffect } from "react";
import AuthContext from "../../contexts/Auth";
import { AppwriteService } from "../../services";
import { useLocation, useNavigate } from "react-router-dom";

function Auth({ children }) {
  const location = useLocation();
  const navigate = useNavigate();
  const appwrite = new AppwriteService();
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const redirect = location?.state?.from ?? "/dashboard";
  const login = async (email, password) => {
    try {
      setLoading(true);
      const session = await appwrite.createSession(email, password);
      setLoading(false);
      if (session) navigate(redirect, { replace: true });
    } catch (error) {
      setError(error?.message);
      setLoading(false);
    }
  };

  const logout = async () => {
    const session = await appwrite.deleteCurrentSession();
    return session;
  };

  const signUp = async (email, password) => {
    try {
      setLoading(true);
      const account = await appwrite.createAccount(email, password);
      const session = await appwrite.createSession(email, password);
      setLoading(false);
      if (session) navigate(redirect, { replace: true });
    } catch (error) {
      setError(error?.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    const getUser = async () => {
      const user = await appwrite.getAccount();
      setUser(user);
    };

    getUser();

    appwrite.client.subscribe("account", getUser());

    return () => {
      appwrite.client.unsubscribe();
    };
  }, []);
  const values = {
    user,
    error,
    loading,
    setUser,
    login,
    logout,
    signUp,
    setLoading,
  };

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
}

export default Auth;
