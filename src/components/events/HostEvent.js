import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { IncompleteForm } from "../modals/IncompleteForm"
import "./Events.css"
/** this function allows the user to input all the details of an upcoming event and then send it to the databas. they are automatically the host. */
export const HostEvent = () => {

    const navigate = useNavigate()
    const localKitchenUser = localStorage.getItem("kitchen_user")
    const kitchenUserObject = JSON.parse(localKitchenUser)
    const [ownedGames, setOwnedGames] = useState([])
    const [incompleteForm, setIncompleteForm] = useState(false)
    const [newEvent, setNewEvent] = useState({
        usersId: kitchenUserObject.id,
        date: "",
        location: "",
        gamesId: ""
    })
   
    const newEventObject ={
        usersId: newEvent.usersId,
        date: newEvent.date,
        location: newEvent.location,
        gamesId : newEvent.gamesId

    }
    /** gets the users game collection so they can only host events to play games that they own*/
    useEffect(
        () => {
            fetch(`http://localhost:8088/usersGames?usersId=${kitchenUserObject.id}&_expand=games`)
                .then(res => res.json())
                .then(data => {
                    const sortedData = data.sort((a, b) => a.games.name.localeCompare(b.games.name))
                    setOwnedGames(sortedData)
                })

        },
        []
    )
    /** sends the newly created event to the database and navigates the user to the FindEvents page. If the form is incomplete it displays an error message*/
    const handleSaveButtonClick = (event) => {
        event.preventDefault()
        if(newEvent.date === "" || newEvent.location === "" || newEvent.gamesId === ""){
            setIncompleteForm(true)
        }
        else{
        return fetch(`http://localhost:8088/events`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newEventObject)
        })
            .then(response => response.json())
            .then(() => {
                navigate("/findEvent")

            })}
    }
    return (
        <form className="eventForm">
            <h2 className="eventForm__title">Host a new event</h2>
            <fieldset>
                <div className="form-group">
                    <h3>Date and time</h3>
                    <input
                        required autoFocus
                        type="datetime-local"
                        className="form-control"
                        placeholder="Date and time"
                        value={newEvent.date}
                        onChange={
                            (evt) => {                             
                                const copy = { ...newEvent }
                                copy.date = evt.target.value
                                setNewEvent(copy)
                            }
                        } />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <h3>Location</h3>
                    <input
                        required autoFocus
                        type="text"
                        className="form-control"
                        placeholder="The address where you are meeting"
                        value={newEvent.location}
                        onChange={
                            (evt) => {
                                const copy = { ...newEvent }
                                copy.location = evt.target.value
                                setNewEvent(copy)
                            }
                        } />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <h3>Game</h3>
                    <select
                        className="form-control"
                        onChange={(evt) => {
                            const copy = { ...newEvent }
                            copy.gamesId = parseInt(evt.target.value)
                            setNewEvent(copy)
                        }
                        }>  <option defaultValue="0" >Which game are you playing?</option>
                        {
                            ownedGames.map((game) => {
                                return <option key={`game--${game.id}`} value={game?.games?.id}>{game?.games?.name}</option>
                            }
                            )
                        }

                    </select>
                </div>
            </fieldset>
            <button
                onClick={(clickEvent) => handleSaveButtonClick(clickEvent)}
                className="btn btn-primary">
                Host This Event
            </button>
            {incompleteForm && <IncompleteForm setIncompleteForm={setIncompleteForm}/>}
        </form>
    )
}