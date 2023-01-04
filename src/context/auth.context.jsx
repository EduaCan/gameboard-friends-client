import { createContext, useState, useEffect } from "react";
import { verifyService } from "../services/auth.service";
import DotLoader from "react-spinners/ClipLoader";

const AuthContext = createContext();

function AuthWrapper(props) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [isFetching, setIsFetching] = useState(true);

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

  const dateFormat = (time) => {
    let date = new Date(time)
    let str = "";
    let min = "";
    let sec = "";
    if (date.getMinutes() < 10) {
      min += "0" + date.getMinutes();
    } else {
      min += date.getMinutes();
    }
    if (date.getSeconds() < 10) {
      sec += "0" + date.getSeconds();
    } else {
      sec += date.getSeconds();
    }
    str =
      date.getDate() +
      "-" +
      (date.getMonth() + 1) +
      "-" +
      date.getFullYear() +
      " " +
      date.getHours() +
      ":" +
      min +
      ":" +
      sec;
    return str;
  };

  const createdEdited = (comment) => {
      if (comment.createdAt >= comment.updatedAt) {
        let strDate = dateFormat(comment.createdAt);
        return "created on " + strDate;
      } else {
        let strDate = dateFormat(comment.updatedAt);
        return "edited on " + strDate;
      }
  }

  const passedContext = {
    isLoggedIn,
    user,
    authenticaUser,
    setIsLoggedIn,
    setUser,
    dateFormat,
    createdEdited
  };

  if (isFetching === true) {
    return (
      <div className="App">
        <DotLoader
          color={"grey"}
          loading={true}
          size={150}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      </div>
    );
  }

  return (
    <AuthContext.Provider value={passedContext}>
      {props.children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthWrapper };
