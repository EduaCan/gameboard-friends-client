import React from 'react'
import {useContext} from 'react'
import {AuthContext} from "../context/auth.context"
import AddComment from './AddComment'
import AddEventForm from './AddEventForm'
import CommentList from './CommentList'
import EventList from './EventList'


function GameDetailsPrivate({gameid}) {
    const { isLoggedIn } = useContext(AuthContext)

    const handleAddGameToFavourites = (gameid) => {
        //setUser remember
    }

    if (isLoggedIn === true) {
        
        return (
        <div>

            <h5>Aqui los comentarios y demas</h5>
            <CommentList gameid={gameid}/>
            <AddComment gameid={gameid}/>
            <EventList gameid={gameid}/>
            <AddEventForm gameid={gameid}/>
            <button onClick={()=>handleAddGameToFavourites(gameid)}>Add game to favourite</button>
        </div>
        )
      } 
}

export default GameDetailsPrivate