import { AuthContext } from "../contexts";
import { useContext } from "react";


function useAuth() {
  return useContext(AuthContext);
}

export default useAuth;
