
import {AuthContext} from "../context/auth.context"
import {useContext} from 'react'
import FavGamesList from "../components/FavGamesList"
import JoinedEvents from "../components/JoinedEvents"


function Profile() {
  const { user } = useContext(AuthContext) 
  console.log(user)

  return (
    <div>

    <h2>Hello {user.user.username}</h2>
        <h3>Fav Games:</h3>
        <FavGamesList />
    {/* {user.user.favGames.map((eachFavGameId) => {
      return (

        <div>

        <FavGamesList gameid={eachFavGameId}/>
        <p>Algo--{eachFavGameId}--</p>
        </div>
      )
    })} */}
    <h3>Joined Events:</h3>
    <JoinedEvents />
    
    </div>
  )
}

export default Profile