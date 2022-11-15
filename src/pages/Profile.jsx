import { AuthContext } from "../context/auth.context";
import { useContext } from "react";
import FavGamesList from "../components/FavGamesList";
import JoinedEvents from "../components/JoinedEvents";

//Muestra la info personal del usuario
function Profile() {
  const { user } = useContext(AuthContext);
  console.log(user);

  return (
    <div>
      <h2>Hello {user.user.username}</h2>
      <h3>Fav Games:</h3>
      <FavGamesList />
      <h3>Joined Events:</h3>
      <JoinedEvents />
    </div>
  );
}

export default Profile;
