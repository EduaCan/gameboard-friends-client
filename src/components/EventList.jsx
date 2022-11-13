import {useState, useEffect} from "react"
import { eventListService } from "../services/event.service"
import {  useNavigate } from "react-router-dom"




function EventList({ gameid }) {
    const [showList, setShowList] = useState(false)
    const [showEventForm, setShowEventForm] = useState(false)

    const [eventList, setEventList] = useState(null)
    const [isFetching, setIsFetching] = useState(true)

    const navigate = useNavigate()



    useEffect(() => {
      getData()
      
    }, [])
    


    const handleEventList = () => {
        setShowList(true)
    }  

    const handleAddEvent = () => {
        setShowEventForm(true)
    }

const getData = async () =>{
    try {
        const response = await eventListService(gameid)
        setEventList(response.data)
        console.log("EVENT LIST RESPONSE:DATA", response.data, "GAMEID", gameid)
        setIsFetching(false)
        
    } catch (error) {
        navigate("/error")
        
    }
}

if (isFetching === true) {
    return <h3>....buscando event list</h3>
  }

  return (
    <div>
        <button onClick={handleEventList}>View Events</button>
        <div >
            {eventList.map((eachEvent)=> {
                return (
                    <div key={eachEvent._id}>
                        <h5>Location: {eachEvent.location}</h5>
                        {eachEvent.players.map((eachPlayer)=> {
                            return (
                                <p key={eachPlayer._id}>Player: {eachPlayer.username}</p>
                            )
                        })}
                    </div>
                )
            })}
            <button onClick={handleAddEvent}>Add Event</button>
            {/* {showEventForm=== true && <} */}
        </div>
    </div>
  )
}

export default EventList