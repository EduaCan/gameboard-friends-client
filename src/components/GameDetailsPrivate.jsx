import React from 'react'
import {useContext} from 'react'
import {AuthContext} from "../context/auth.context"
import AddEventForm from './AddEventForm'
import CommentList from './CommentList'
import EventList from './EventList'


function GameDetailsPrivate({gameid}) {
    const { isLoggedIn } = useContext(AuthContext)
    if (isLoggedIn === true) {
        
        return (
        <div>

            <h5>Aqui los comentarios y demas</h5>
            <CommentList gameid={gameid}/>
            <EventList gameid={gameid}/>
            <AddEventForm gameid={gameid}/>
        </div>
        )
      } 
}

export default GameDetailsPrivate