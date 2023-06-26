export const POLICIES = {
    "user:add": (role) => {
      return role === "admin" || role === "owner" ? true : false;
    },
    "user:delete": (role) => { 
        return role === "admin" || role === "owner" ? true : false;
    },
    "user:update": (role) => {  
        return role === "admin" || role === "owner" ? true : false;
    },
};