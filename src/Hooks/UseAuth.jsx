import { useContext } from "react";
import { AuthContext } from "../Provider/AuthPRovider";

const useAuth = () => {
 const auth = useContext(AuthContext)
 return auth
};

export default useAuth;