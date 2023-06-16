import { Outlet } from "react-router-dom";
import { PrivateNav, PublicNav } from "../components";
import { useEffect } from "react";
import { useAuth } from "../../hooks";
import { useState } from "react";

const Main = () => {
  const { appwrite, user, setUser, session } = useAuth();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(true);
    appwrite
      .getAccount()
      .then((user) => {
        console.log("User from Main: ", user);
        setUser(user ?? null);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
      });
  }, [session]);
  return (
    !loading && (
      <>
        {user ? <PrivateNav /> : <PublicNav />}
        <div className="w-screen">
            <Outlet />
        </div>
      </>
    )
  );
};

export default Main;
