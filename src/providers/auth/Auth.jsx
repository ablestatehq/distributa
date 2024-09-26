import AuthContext from "../../contexts/Auth";
import { AppwriteService as Appwrite } from "../../services";

const appwrite = new Appwrite();

function Auth({ children }) {
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

  const values = {
    appwrite,
    login,
    logout,
    signUp,
  };

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
}

export default Auth;
