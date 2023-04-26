import { useEffect, useState } from "react"
import { useParams, useNavigate, useOutletContext } from "react-router-dom"
import { GameDetails } from "../modals/GameDetails"

export const EventDetails = () => {
    const [refreshSwitch, setRefreshSwitch] = useOutletContext(false)
    const { eventId } = useParams()
    const [selectedEvent, setSelectedEvent] = useState({})
    const [gameDetails, setGameDetails] = useState(false)
    const [playerList, setPlayerList] = useState([])
    const localKitchenUser = localStorage.getItem("kitchen_user")
    const kitchenUserObject = JSON.parse(localKitchenUser)
    const newPlayer = {
        usersId: kitchenUserObject.id,
        eventsId: parseInt(eventId)
    }
    const playerCount = playerList.length + 1
    const neededToPlay = selectedEvent?.games?.minPlayers
    const availableSeats = selectedEvent?.games?.maxPlayers - playerCount
    const navigate = useNavigate()
    let readableDate = "";
    if (selectedEvent.date) {
    const dateObj = new Date(selectedEvent.date);
    const options = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
    };
    readableDate = dateObj.toLocaleString("en-US", options);
}
    const getPlayers = () => {
        fetch(`http://localhost:8088/players?eventsId=${eventId}&_expand=users`)
            .then(response => response.json())
            .then((matchingPlayers) => {
                setPlayerList(matchingPlayers)
            })
    }
    useEffect(
        () => {
            fetch(`http://localhost:8088/events/${eventId}?_expand=games&_expand=users`)
            .then(response => response.json())
            .then((data) => {
                setSelectedEvent(data)
            })

        },
        [refreshSwitch, eventId]
    )
    useEffect(
        () => {
            getPlayers()
        },
        [refreshSwitch, eventId]
    )
    const handleDeleteButtonClick = (event) => {
        event.preventDefault()
        fetch(`http://localhost:8088/events/${eventId}`, {
            method: "DELETE"
        }).then(() => {
            navigate("/findEvent")
           if(refreshSwitch){
            setRefreshSwitch(false)
           } else {
            setRefreshSwitch(true)
           }
        })
    }
    const handleJoinButton = (event) => {
        event.preventDefault()
        fetch(`http://localhost:8088/players`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newPlayer)
        })
            .then(response => response.json())
            .then(() => {
                if(refreshSwitch){
                    setRefreshSwitch(false)
                   } else {
                    setRefreshSwitch(true)
                   }
            })

    }
    const handleLeaveButton = (event) => {
        event.preventDefault()
        const removedPlayer = playerList.find(player => player.usersId === kitchenUserObject.id)
        fetch(`http://localhost:8088/players/${removedPlayer.id}`, {
            method: "DELETE"
        }).then(() => {
            if(refreshSwitch){
                setRefreshSwitch(false)
               } else {
                setRefreshSwitch(true)
               }
        })
    }
    const handleDismissButton = (event) => {
        event.preventDefault()
        navigate("/findEvent")

    }
    const handleImageClick = () =>{
        setGameDetails(true)
    }
    return (<div className="event--details">
        <h1>Event Details</h1>
        <div className="results--box">
            <div className="results--box--no--buttons">
            <div className="results--box--host">
            <h3>Host</h3>
            <section>{selectedEvent?.users?.name}</section>
            <h3>Game</h3>
            <section>{selectedEvent?.games?.name}</section>
            <img onClick={handleImageClick} className="event--details--image" alt="picture of game box" src={selectedEvent?.games?.image}/>
            <h3>Time and Place</h3>
            <section>{selectedEvent?.location}</section>
            <section>{readableDate}</section>
            </div>
            <div className="results--box--players">
            <h3>Players</h3>
            <section> {selectedEvent?.users?.name}
                {
                    playerList.map(player => <section className="player--list--item"
                        key={`player--${player.id}`}>
                        {player?.users?.name}
                    </section>
                    )
                }
            </section>
            <h3>Seats</h3>
            <section>{neededToPlay} required to play</section>
            <section>{availableSeats} seat(s) available
            </section>
            </div>
            </div>
            <div className="details--buttons--container">
            <button className="dismiss--button" onClick={(clickEvent) => handleDismissButton(clickEvent)}>
                Hide Details
            </button>
            {kitchenUserObject.id === selectedEvent.usersId && (
                <button className="cancel--button" onClick={(clickEvent) => handleDeleteButtonClick(clickEvent)}>Cancel Event</button>
            )}
            {playerList.find(player => player.usersId === kitchenUserObject.id) && (
                <button className="leave--button" onClick={(clickEvent) => handleLeaveButton(clickEvent)}>Leave Game</button>
            )}
            {!playerList.find(player => player.usersId === kitchenUserObject.id) && !(kitchenUserObject.id === selectedEvent.usersId) && (availableSeats > 0) && (
                <button className="join--button" onClick={(clickEvent) => handleJoinButton(clickEvent)}>Join Game</button>
            )}
            </div>
        </div>
        {gameDetails && <GameDetails setGameDetails={setGameDetails} gameId={selectedEvent?.games?.id}/>}
    </div>)

}