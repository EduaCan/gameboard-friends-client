import { useState } from "react";
// import { useContext } from "react"
// import { AuthContext } from "../context/auth.context";
import { addEventService } from "../services/event.service";


function AddEventForm({gameid}) {

    const [location, setLocation] = useState("");

    // const { user } = useContext(AuthContext)  

    const handleLocationChange = (event) => setLocation(event.target.value);

    const handleComfirmEvent = async (event) => {
        event.preventDefault()

        const newEvent = {
            location: location
        }

        try {
            await addEventService(gameid, newEvent)
        } catch (error) {
            console.log(error)
        }
    }

  return (
    <div>
        <form onSubmit={handleComfirmEvent}>
            <label >Location: </label>
            <input type="text" name="location" value={location} onChange={handleLocationChange}/>

            <button typr="submit">Comfirm Event</button>
        </form>
    </div>
  )
}

export default AddEventForm