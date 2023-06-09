import { useEffect, useState } from "react"
import "./Events.css"
import { useNavigate } from "react-router-dom"
import { remainingSeats } from "./FindEvent"
/** this component returns two lists of events, one in which the user is the host and another in which the user is a player */
export const MyEvents = ({refreshSwitch}) => {
    const [myEvents, setMyEvents] = useState([])
    const [myPlayerEvents, setMyPlayerEvents] = useState([])
    const [allPlayers, setAllPlayers] = useState([])
    const localKitchenUser = localStorage.getItem("kitchen_user")
    const kitchenUserObject = JSON.parse(localKitchenUser)
    const navigate = useNavigate()
    /** this gets all the events the user is hosting from the database, sorts them by date, and excludes events from past dates */
    const getMyEvents = () => {
        fetch(`http://localhost:8088/events?usersId=${kitchenUserObject.id}&_expand=games&_expand=users`)
            .then(res => res.json())
            .then(data => {
                const sortedData = data.sort((a, b) => a.date.localeCompare(b.date))
                const filteredData = sortedData.filter(event => new Date(event.date) >= new Date())
                setMyEvents(filteredData)
            })

    }
    /**this gets all events from the database in which the user is a player, sorts them by date and excludes events from past dates */
    useEffect(
        () => {
            const eventsPromise = fetch(`http://localhost:8088/events?_expand=games&_expand=users`)
            const playersPromise = fetch(`http://localhost:8088/players?usersId=${kitchenUserObject.id}`)
            Promise.all([eventsPromise, playersPromise])
                .then(([eventsRes, playersRes]) => Promise.all([eventsRes.json(), playersRes.json()]))
                .then(([events, players]) => {
                    const sortedEvents = events.sort((a, b) => a.date.localeCompare(b.date))
                    const matchingPlayerEvents = sortedEvents.filter(event => players.find(player => player.eventsId == event.id))
                    const filteredData = matchingPlayerEvents.filter(event => new Date(event.date) >= new Date())
                    setMyPlayerEvents(filteredData)
                })

        },
        [refreshSwitch]
    )
    /** this gets all the players from the database so we can see which events are full */
    useEffect(
        () => {
            fetch(`http://localhost:8088/players`)
                .then(res => res.json())
                .then(data => {
                    setAllPlayers(data)
                })

        },
        []
    )
    /** this brings up the EventDetails component for the selected event */
    const handleDetailsButton = (event) => {
        navigate(`/findEvent/${event.target.value}`)
    }
    useEffect(
        () => {
            getMyEvents()
        },
        [refreshSwitch]
    )

    return (
        <div className="my--events" key="my-events">
            <h1 className="myEvents__header">My Events</h1>
            <div className="results--box">
                <h3>Hosting</h3>
            {myEvents.length === 0 && (
                <section key="no--hosted--events">No scheduled events</section>
            )}
                {myEvents.map((event) => {
                    const dateString = event.date;
                    const dateObj = new Date(dateString);
                    const options = {
                        weekday: "long",
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                        hour: "numeric",
                        minute: "numeric",
                    };
                    const readableDate = dateObj.toLocaleString("en-US", options);
                    const availableSeats = remainingSeats(event, allPlayers)
                    return (
                        <section
                            className="hosted--event--list--item"
                            key={`host--event--${event.id}`}
                        >
                            {event?.games?.name} at {event?.location} on {readableDate} {availableSeats === 0 && (<p className="full--tag">FULL</p>)}
                            <button
                                key={`details--button--hosted${event.id}`}
                                onClick={(clickEvent) => handleDetailsButton(clickEvent)}
                                className="details--button"
                                value={event.id}
                            >
                                Event Details
                            </button>
                        </section>
                    );
                })}
                <h3>Attending</h3>
                {myPlayerEvents.length === 0 && (
                <section key="no--player--events">No scheduled events</section>
            )}
                {myPlayerEvents.map((event) => {
                    const dateString = event.date;
                    const dateObj = new Date(dateString);
                    const options = {
                        weekday: "long",
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                        hour: "numeric",
                        minute: "numeric",
                    };
                    const readableDate = dateObj.toLocaleString("en-US", options);
                    const availableSeats = remainingSeats(event, allPlayers)
                    return (
                        <section
                            className="player--event--list--item"
                            key={`player--event--${event.id}`}
                        >
                            {event?.games?.name} at {event?.location} on {readableDate} {availableSeats === 0 && (<p className="full--tag">FULL</p>)}
                            <button
                                key={`details--button--player${event.id}`}
                                onClick={(clickEvent) => handleDetailsButton(clickEvent)}
                                className="details--button"
                                value={event.id}
                            >
                                Event Details
                            </button>
                        </section>
                    );
                })}
            </div>
        </div>
    );
}