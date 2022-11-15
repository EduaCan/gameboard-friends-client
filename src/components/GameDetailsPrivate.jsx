import React from 'react'
import {useContext} from 'react'
import {AuthContext} from "../context/auth.context"
import AddComment from './AddComment'
import CommentList from './CommentList'
import AddEventForm from './AddEventForm'
import EventList from './EventList'
import { addGameToFavouritesService } from '../services/user.service'


function GameDetailsPrivate({gameid}) {
    const { isLoggedIn } = useContext(AuthContext)

    const handleAddGameToFavourites = (gameid) => {
        addGameToFavouritesService(gameid)
        //setUser remember
    }

    if (isLoggedIn === true) {
        
        return (
        <div>

            <h5>Aqui los comentarios y demas</h5>
            <CommentList elementId={gameid}/>
            <AddComment elementId={gameid}/>
            <EventList gameid={gameid}/>
            <AddEventForm gameid={gameid}/>
            <button onClick={()=>handleAddGameToFavourites(gameid)}>Add game to favourite</button>
        </div>
        )
      } 
}

export default GameDetailsPrivate