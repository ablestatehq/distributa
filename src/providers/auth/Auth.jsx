import { useState, useEffect } from "react";
import AuthContext from "../../contexts/Auth";
import { AppwriteService } from "../../services";

function Auth({ children }) {
  const appwrite = new AppwriteService();
  const [user, setUser] = useState();
  const [session, setSession] = useState();
  const [loading, setLoading] = useState(true);

  const login = async (email, password) => {
    const session = await appwrite.createSession(email, password);
    setSession(() => session);
    setLoading(false)
    return session;
  };

  const logout = async () => {
    const session = await appwrite.deleteCurrentSession();
    setSession(() => session);
    setUser(() => null);
  };

  const signUp = async (email, password) => {
    await appwrite.createAccount(email, password);
    const session = await appwrite.createSession(email, password);
    setLoading(false)
    setSession(() => session);
    return session;
  };

  useEffect(() => {
    appwrite.client.subscribe("account", async (response) => {
      try {
        const user = await appwrite.getAccount();
        console.log("Current user: ", user);
        setUser(() => user ?? null);
        setLoading(false);
      } catch (error) {
        console.log("Error: ", error);
      }
    });

    const getUser = async () => {
      try {
        const user = await appwrite.getAccount();
        setUser(user ?? null);
      } catch (error) {
        console.log("Error:", error);
      }
    };

    getUser();
    // return () => {
    //   appwrite.client.unsubscribe();
    // };
  }, []);
  const values = {
    user,
    session,
    appwrite,
    loading,
    setLoading,
    setSession,
    setUser,
    login,
    logout,
    signUp,
  };

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
}

export default Auth;
