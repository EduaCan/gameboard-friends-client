import { useEffect, useState } from "react"
import {getAnEventInfoService} from "../services/event.service"
import { useParams, useNavigate } from "react-router-dom"



function EventDetails() {
    const {eventid} = useParams()
    const navigate = useNavigate()


    const [details, setDetails] = useState(null)
    const [ isFetching, setIsFetching ] = useState(true)


    
    useEffect(() => {
      getData()
    }, [])
    
    const getData = async () => {
        try {
            const response = await getAnEventInfoService(eventid)
            console.log("EVENT DETAILS",response.data)
            setDetails(response.data)
            setIsFetching(false)
        } catch (error) {
            navigate(error)
        }
    }

  return (
    <div>
        <h3>{details.location}</h3>
        <h2>Aqui faltan unos pequeños detalles del game</h2>
        {details.players.map((eachPlayer) => {
           return <p>Player: {eachPlayer.username}</p>
        })}
    </div>
  )
}

export default EventDetails