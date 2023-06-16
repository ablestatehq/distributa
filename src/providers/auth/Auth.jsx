import { useState, useEffect } from "react";
import AuthContext from "../../contexts/Auth";
import { AppwriteService } from "../../services";

function Auth({ children }) {
  const appwrite = new AppwriteService();
  const [user, setUser] = useState(null);
  const login = async (email, password) => {
    const session = await appwrite.createSession(email, password);
    return session;
  };

  const logout = async () => {
    const session = await appwrite.deleteCurrentSession();
    return session;
  };

  const signUp = async (email, password) => {
    await appwrite.createAccount(email, password);
    const session = await appwrite.createSession(email, password);
    return session;
  };

  useEffect(() => {
    const getUser = async () => {
      const user = await appwrite.getAccount();
      setUser(user);
    };

    getUser().catch(error => console.log(error));

    appwrite.client.subscribe("account", getUser().catch(error => console.log(error)));

    return () => {
      appwrite.client.unsubscribe();
    };
  }, []);
  const values = {
    user,
    setUser,
    login,
    logout,
    signUp,
  };

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
}

export default Auth;
