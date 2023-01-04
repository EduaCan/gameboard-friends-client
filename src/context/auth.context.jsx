import { createContext, useState, useEffect } from "react";
import { verifyService } from "../services/auth.service";
import { useFormHook } from "../hooks/useFormHook";

const AuthContext = createContext();

function AuthWrapper(props) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [isFetching, setIsFetching] = useState(true);
  const { fetchingLoader } = useFormHook()

  useEffect(() => {
    authenticaUser();
  }, []);

  const authenticaUser = async () => {
    setIsFetching(true);
    try {
      const response = await verifyService();
      setIsLoggedIn(true);
      setUser(response.data);
      setIsFetching(false);
    } catch (error) {
      setIsLoggedIn(false);
      setUser(null);
      setIsFetching(false);
    }
  };

  const passedContext = {
    isLoggedIn,
    user,
    authenticaUser,
    setIsLoggedIn,
    setUser
  };

  if (isFetching) {
    return (
      fetchingLoader()
    );
  }

  return (
    <AuthContext.Provider value={passedContext}>
      {props.children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthWrapper };
