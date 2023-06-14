import { useCallback, useEffect, useState } from "react";
import useAuth from "./useAuth";

export default function useAuthorization() {
  const { user } = useAuth();
  const [ roles, setRoles ] = useState(null)


  if(!user) {
    console.log("User does not exist")
  } 

  const checkAccess = useCallback(
    ({ allowedRoles}) => {
        if ( allowedRoles && allowedRoles?.length > 0) {
            // if (allowedRoles.includes(user.role)) {
            //     return true;
            // }
            console.log("Allowed roles: ", allowedRoles)
            console.log("Member roles: ", roles)
        }
    }, [ user, roles ]
  )

  useEffect(() => {
    // Fetch the user's roles
    // Fetch from the teams api and get the roles
    if (user) {

    }
  }, [user.id]);
  return { checkAccess, roles };
}
