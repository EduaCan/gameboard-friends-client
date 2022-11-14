import { useEffect } from 'react'
import { useState } from 'react'
import { gameDetailsService } from "../services/game.service"


function FavGamesList({gameid}) {

    const [ details, setDetails ] = useState(null)
  const [ isFetching, setIsFetching ] = useState(true)

  useEffect(() => {
    getData()
  }, [])

const getData = async () => {
    try {
        const response = await gameDetailsService(gameid)
        setDetails(response.data)
        setIsFetching(false)

    } catch (error) {
        console.log(error)
    }
}

if (isFetching === true) {
    return <h3>...buscando</h3>
  }

  return (
    <div>
        <img src={details.image_url} alt={details.name} width={50}/>
                <h5>{details.name}</h5>
                <p>juego favorito</p>
    </div>
  )
}

export default FavGamesList